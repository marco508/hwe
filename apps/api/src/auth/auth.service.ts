import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException("Email déjà utilisé");

    const password = await bcrypt.hash(dto.password, 10);
    // Défense en profondeur : le rôle est re-restreint ici même si le DTO
    // était contourné — l'inscription publique ne crée JAMAIS d'ADMIN.
    const role = dto.role === "OWNER" ? "OWNER" : "TENANT";
    const user = await this.prisma.user.create({
      data: { ...dto, role, password },
    });
    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException("Identifiants invalides");
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException("Identifiants invalides");
    return this.signToken(user);
  }

  private signToken(user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    const { ...rest } = user;
    return {
      accessToken,
      user: {
        id: rest.id,
        email: rest.email,
        firstName: rest.firstName,
        lastName: rest.lastName,
        phone: rest.phone,
        role: rest.role,
        createdAt: rest.createdAt,
        updatedAt: rest.updatedAt,
      },
    };
  }
}
