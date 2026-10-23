import { Global, Module } from "@nestjs/common";
import { PropertyAccessService } from "../common/property-access";
import { FeesService } from "./fees.service";

/**
 * Services transverses du module Professionnels, disponibles partout :
 * permissions sur un bien (PropertyAccessService) et honoraires (FeesService).
 */
@Global()
@Module({
  providers: [PropertyAccessService, FeesService],
  exports: [PropertyAccessService, FeesService],
})
export class AgencyCoreModule {}
