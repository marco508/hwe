/**
 * Traductions du contenu de départ du guide Sénégal (voir ./senegal.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de senegal.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "Tierra de la teranga, la hospitalidad senegalesa, Senegal une a pocas horas de carretera una capital creativa abierta al océano, la isla-memoria de Gorée, la ciudad colonial de Saint-Louis, los manglares del Sine-Saloum y las playas de Casamance, al ritmo del mbalax, de las grandes cofradías sufíes y del thieboudienne compartido en una fuente común.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "Los ciudadanos de numerosos países, entre ellos los de la Unión Europea y la CEDEAO, están actualmente exentos de visado para estancias cortas; otras nacionalidades deben solicitarlo. Las normas cambian: compruebe siempre los requisitos actualizados en la embajada de Senegal o en las fuentes oficiales antes de salir. Lleve un pasaporte con validez superior a seis meses, un billete de vuelta y la dirección de su alojamiento.",
      },
      {
        title: "Salud",
        body: "Desde marzo de 2026 ya no se exigen pruebas de vacunación a la entrada a los viajeros procedentes de países sin epidemias, pero la vacuna contra la fiebre amarilla sigue siendo muy recomendable y las vacunas habituales (entre ellas difteria y sarampión) deben estar al día. El paludismo está presente, sobre todo durante y después de la estación de lluvias y en el sur y el este: consulte a un médico o a un centro de vacunación internacional y protéjase de los mosquitos. Beba agua embotellada.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA). Hay muchos cajeros en Dakar y en las ciudades turísticas; en el resto del país, lleve efectivo. El pago por móvil (Wave, Orange Money) está en todas partes. Las tarjetas bancarias se aceptan en hoteles y comercios importantes.",
      },
      {
        title: "Cuándo ir",
        body: "La estación seca, aproximadamente de noviembre a junio, es la más agradable, con temperaturas más suaves en la costa de diciembre a marzo; el harmattan, viento seco y polvoriento, sopla en el interior en invierno. La estación de lluvias (aproximadamente de julio a octubre) trae calor húmedo, tormentas y pistas difíciles, sobre todo en el sur y el este. Las aves migratorias del Djoudj se observan de noviembre a abril.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua oficial; el wolof es la lengua más hablada en el día a día, junto al pulaar, el serer, el diola, el mandinga y el soninké, entre otras. Unas palabras de wolof («nanga def?» para «¿qué tal?», «jërëjëf» para «gracias») siempre se agradecen. La gran mayoría de los senegaleses son musulmanes, a menudo miembros de cofradías sufíes: ropa que cubra en los lugares religiosos y fuera de la playa, y discreción durante el ramadán. Pida permiso antes de fotografiar a alguien; está prohibido fotografiar edificios oficiales y militares.",
      },
      {
        title: "Desplazarse",
        body: "En Dakar: taxis (acuerde el precio antes de subir), autobuses Dakar Dem Dikk, el TER (tren expreso regional) y los autobuses rápidos BRT. Entre ciudades: autopistas alrededor de Dakar, autobuses, «sept-places» (taxis colectivos) y coches con conductor. Para Casamance, vuelos nacionales a Ziguinchor o Cap Skirring, o el barco nocturno Dakar–Ziguinchor. Evite conducir de noche fuera de las ciudades: carreteras sin iluminación, peatones y animales en la calzada.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 230 V; enchufes de tipo C, D, E y K: un adaptador universal resulta útil. Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al pago por móvil; la cobertura es buena en las ciudades y en las grandes carreteras.",
      },
      {
        title: "Seguridad",
        body: "Senegal es uno de los países más visitados de África Occidental y la mayoría de los viajes transcurren sin incidentes, pero conviene tomar algunas precauciones. France Diplomatie desaconseja, salvo motivo imperativo, las zonas fronterizas con Malí y parte de la frontera mauritana (departamento de Matam), así como ciertas franjas fronterizas de Casamance con Gambia y Guinea-Bisáu (fuera de los grandes ejes); no abandone las carreteras asfaltadas en estos sectores (minas residuales, bosques). El resto de Casamance, incluidos Ziguinchor, Cap Skirring y la zona entre la carretera y el río, se visita con una vigilancia reforzada, de día y por los ejes principales. Las autoridades británicas y francesas señalan también un aumento de robos y agresiones en Dakar (sobre todo en la Corniche de noche) y en algunos lugares turísticos, una amenaza terrorista que no puede descartarse, manifestaciones a veces tensas y un mar muy peligroso en la Grande Côte. Consulte antes y durante el viaje las recomendaciones de France Diplomatie (diplomatie.gouv.fr) y del FCDO británico (gov.uk/foreign-travel-advice/senegal), o las de su país.",
      },
    ],
  },
  destinations: {
    dakar: {
      summary: "Capital vibrante en el extremo occidental de África: museos, mercados, la Corniche y una gran escena musical.",
      description:
        "Situada en la península de Cabo Verde, el punto más occidental del continente, Dakar es una capital enérgica y creativa. Se viene por sus museos, sus mercados, su Corniche frente al océano, sus galerías y la Bienal de Arte Africano Contemporáneo (Dak'Art), su escena musical y sus restaurantes donde probar yassa, mafé y thieboudienne. Es también el punto de partida hacia Gorée, el lago Rosa y la Petite Côte.",
    },
    goree: {
      name: "Isla de Gorée",
      summary: "Pequeña isla sin coches frente a Dakar, lugar de memoria de la trata declarado Patrimonio de la UNESCO.",
      description:
        "A unos veinte minutos en barco del puerto de Dakar, la isla de Gorée fue uno de los primeros sitios inscritos en el Patrimonio Mundial de la UNESCO (1978). Callejuelas de arena, casas coloniales de fachadas ocres y buganvillas contrastan con la historia que encarna: la de la trata atlántica, de la que la Casa de los Esclavos se ha convertido en símbolo mundial. Sin coches, la isla se recorre a pie en un día.",
    },
    "lac-rose": {
      name: "Lago Rosa (lago Retba)",
      summary: "Laguna salada de reflejos rosados, recolección artesanal de sal y dunas junto al océano.",
      description:
        "A unos treinta kilómetros al noreste de Dakar, el lago Retba, llamado lago Rosa, debe su color a una microalga que prospera en sus aguas muy saladas; el tono es más intenso en la estación seca, a pleno sol. Antigua meta del rally París-Dakar, el lugar es conocido por sus recolectores de sal y por las dunas que lo separan del océano.",
    },
    "saint-louis": {
      summary: "Antigua capital colonial en una isla del río Senegal, declarada Patrimonio de la UNESCO.",
      description:
        "Fundada en el siglo XVII en una isla de la desembocadura del río Senegal, Saint-Louis fue la capital de la colonia de Senegal y durante un tiempo del África Occidental Francesa. Su isla, unida al continente por el puente Faidherbe, está inscrita en el Patrimonio Mundial de la UNESCO por sus casas con balcones y su trazado regular. Ciudad de música, pesca y memoria, es también la puerta de los parques del Djoudj y de la Langue de Barbarie. A unas 4 horas por carretera de Dakar.",
    },
    touba: {
      summary: "Ciudad santa del muridismo, en torno a una de las mayores mezquitas de África Occidental.",
      description:
        "Fundada a finales del siglo XIX por Cheikh Ahmadou Bamba, fundador de la cofradía sufí de los muridíes, Touba es la segunda ciudad del país y un gran centro espiritual. Tiene un estatus especial: el alcohol y el tabaco están prohibidos. Su Gran Mezquita atrae visitantes todo el año y, durante el Gran Magal, multitudes inmensas de peregrinos. A unas 3 horas por carretera de Dakar.",
    },
    "petite-cote": {
      name: "La Petite Côte",
      summary: "El litoral de playas al sur de Dakar: playas, pueblos de pescadores y la isla de conchas de Fadiouth.",
      description:
        "Entre Dakar y el delta del Saloum, la Petite Côte encadena estaciones balnearias (Saly, Somone), pueblos de pescadores y lagunas. El mar es más tranquilo aquí que en la Grande Côte, al norte. Se viene a descansar, pero también por la reserva de Bandia y por Joal-Fadiouth, ciudad natal de Léopold Sédar Senghor. Cerca del aeropuerto internacional Blaise Diagne, es una etapa práctica al principio o al final del viaje.",
    },
    "sine-saloum": {
      name: "Delta del Sine-Saloum",
      summary: "Laberinto de manglares, islas y bolongs, declarado Patrimonio de la UNESCO, para explorar en piragua.",
      description:
        "Donde los ríos Sine y Saloum se unen al océano, el delta forma un laberinto de brazos de mar (bolongs), manglares e islas habitadas por pescadores serer y niominka. Reserva de la biosfera, está inscrito en el Patrimonio Mundial de la UNESCO por sus concheros y túmulos funerarios dejados por generaciones de habitantes. Los campamentos de Palmarin, Ndangane, Foundiougne o Toubakouta sirven de base para las salidas en piragua.",
    },
    "basse-casamance": {
      name: "Baja Casamance",
      summary: "Arrozales, bosques, pueblos diola y playas de Cap Skirring, al sur de Gambia.",
      description:
        "Separada del norte del país por Gambia, la Baja Casamance es la región más verde de Senegal: un río bordeado de manglares, arrozales, ceibas gigantes y pueblos diola de tradiciones vivas (reino de Oussouye, casas de impluvio). Ziguinchor, su capital, está unida a Dakar por avión y por barco; Cap Skirring es la gran estación balnearia del sur. La región se visita con una vigilancia reforzada y algunas zonas fronterizas están desaconsejadas: permanezca en los ejes principales y siga las recomendaciones de viaje.",
    },
  },
  places: {
    "musee-des-civilisations-noires": {
      name: "Museo de las Civilizaciones Negras",
      summary: "Gran museo inaugurado en 2018, dedicado a las culturas de África y sus diásporas.",
      description:
        "Ideado ya en la época de Léopold Sédar Senghor y del Festival Mundial de las Artes Negras de 1966, el Museo de las Civilizaciones Negras abrió sus puertas en diciembre de 2018 en un amplio edificio circular del centro de Dakar. Sus salas presentan las civilizaciones africanas, desde los orígenes de la humanidad hasta las creaciones contemporáneas, así como los vínculos con las diásporas de América y el Caribe.",
    },
    "monument-de-la-renaissance-africaine": {
      name: "Monumento del Renacimiento Africano",
      summary: "Estatua monumental de bronce que domina la ciudad desde una de las colinas de Les Mamelles.",
      description:
        "Inaugurado en 2010 con motivo del cincuentenario de la independencia, este grupo de bronce de unos cincuenta metros representa a un hombre, una mujer y un niño mirando al océano. Polémico durante su construcción, se ha convertido en uno de los referentes de Dakar. Las escaleras que llevan hasta él ofrecen una bonita vista de la península y la costa, sobre todo al final del día.",
    },
    "marche-kermel-dakar": {
      name: "Mercado Kermel",
      summary: "Mercado colonial del Plateau: pescado, fruta, flores y artesanía.",
      description:
        "En el corazón del Plateau, el barrio de negocios, el mercado Kermel ocupa un elegante edificio circular de época colonial, reconstruido de forma idéntica tras un incendio en los años noventa. Se encuentran pescado, fruta, verduras y flores y, en los alrededores, puestos de artesanía, cestos y telas. Más tranquilo que los grandes mercados populares como Sandaga, es una buena primera toma de contacto.",
      tips: "Regatee con una sonrisa y desconfíe de los intermediarios demasiado insistentes en los alrededores del mercado.",
    },
    "mosquee-de-la-divinite-ouakam": {
      name: "Mezquita de la Divinidad",
      summary: "Mezquita blanca de dos minaretes, frente al océano en la Corniche de Ouakam.",
      description:
        "Construida a orillas del Atlántico, al pie de los acantilados de Ouakam, la Mezquita de la Divinidad es una de las imágenes más fotografiadas de Dakar, con sus dos minaretes blancos recortándose sobre el océano. El barrio de Ouakam, antiguo pueblo de pescadores lebu, conserva un ambiente de pueblo dentro de la capital.",
      tips: "Admírela desde fuera o pida permiso para entrar, con ropa que cubra y fuera de las horas de oración.",
    },
    "maison-des-esclaves-goree": {
      name: "Casa de los Esclavos",
      summary: "Casa de finales del siglo XVIII convertida en memorial de la trata, con su «puerta del viaje sin retorno».",
      description:
        "Construida a finales del siglo XVIII, la Casa de los Esclavos tiene en la planta baja celdas oscuras y un pasillo que se abre al océano, la «puerta del viaje sin retorno». El papel exacto de esta casa en la trata es objeto de debate entre los historiadores, pero se ha convertido en un lugar de memoria universal, visitado por numerosos jefes de Estado y visitantes de todo el mundo. Un momento de intenso recogimiento.",
      tips: "Venga temprano para evitar la afluencia de grupos; un guía local ayuda a situar el lugar en la historia de la trata.",
    },
    "musee-historique-goree": {
      name: "Museo Histórico de Senegal en Gorée",
      summary: "Instalado en el fuerte de Estrées, recorre la historia del país desde la prehistoria hasta la independencia.",
      description:
        "En el extremo norte de la isla, el fuerte de Estrées, construido en el siglo XIX, alberga el museo histórico vinculado al IFAN (Instituto Fundamental del África Negra). Sus salas recorren la historia del territorio senegalés: prehistoria, grandes reinos, islam, trata, colonización e independencia. Un buen complemento a la visita de la Casa de los Esclavos.",
    },
    "castel-de-goree": {
      name: "El Castel",
      summary: "Meseta rocosa en el sur de la isla, antiguas baterías de artillería y vistas de Dakar.",
      description:
        "El Castel, punto más alto de la isla, es una meseta rocosa que conserva antiguas fortificaciones y piezas de artillería. Artistas y artesanos exponen a menudo allí sus obras. Se sube por callejuelas y escaleras para disfrutar de la vista sobre la isla, el océano y los edificios de Dakar.",
    },
    "lac-retba": {
      name: "Lago Retba y la recolección de sal",
      summary: "Observar a los recolectores de sal en piragua y los montículos blancos a orillas del lago.",
      description:
        "En el lago, hombres y mujeres extraen la sal a mano desde piraguas y luego la amontonan en la orilla; se untan la piel con manteca de karité para protegerse de la salinidad. Un paseo en piragua permite ver este trabajo de cerca y comprobar la densidad del agua.",
      tips: "El color es más nítido hacia mediodía en la estación seca. France Diplomatie señala agresiones en este lugar: evite los rincones aislados y no se quede después del anochecer.",
      bestPeriod: "Estación seca (de noviembre a junio)",
    },
    "dunes-du-lac-rose": {
      name: "Dunas del lago Rosa",
      summary: "Paseo en 4x4, quad o dromedario por las dunas, hasta la playa del océano.",
      description:
        "Entre el lago y el Atlántico se extiende un cordón de dunas que se atraviesa en 4x4, en quad, a caballo o a lomos de dromedario, hasta la larga playa de la Grande Côte. Una salida divertida, apreciada en familia, para combinar con la visita a los recolectores de sal.",
      tips: "No se bañe: en la Grande Côte el mar es peligroso y rara vez está vigilado. Elija un proveedor serio y exija casco y equipo para el quad.",
    },
    "ile-de-saint-louis": {
      name: "Isla de Saint-Louis y puente Faidherbe",
      summary: "Paseo por la ciudad histórica de casas con balcones, a ambos lados del puente Faidherbe.",
      description:
        "El puente Faidherbe, estructura metálica de finales del siglo XIX de unos 500 metros de largo, lleva a la isla protegida. Se pasea entre casas coloniales con balcones de madera y patios interiores, plazas sombreadas, la catedral y la mezquita, y muelles sobre el río. Enfrente, en la Langue de Barbarie, el barrio de pescadores de Guet Ndar ofrece un espectáculo impresionante de piraguas pintadas. El paseo en calesa es una forma clásica de descubrir la ciudad.",
      tips: "Pida permiso antes de fotografiar en Guet Ndar, un barrio de vida y trabajo muy animado.",
    },
    "thieboudienne-saint-louis": {
      name: "El thieboudienne de Saint-Louis",
      summary: "El plato nacional, arroz con pescado y verduras, cuya paternidad reivindica Saint-Louis.",
      description:
        "Arroz cocido en un caldo de pescado y tomate, servido con pescado relleno, verduras (yuca, col, zanahoria, berenjena) y salsas, el thieboudienne (ceebu jën en wolof) es el plato emblemático de Senegal; fue inscrito en 2021 en la lista del Patrimonio Cultural Inmaterial de la UNESCO. La tradición atribuye su invención a Saint-Louis. Se come a mediodía, a menudo compartido en una gran fuente común.",
      tips: "El thieboudienne se come sobre todo en el almuerzo: muchos restaurantes ya no lo preparan por la noche.",
    },
    "parc-national-langue-de-barbarie": {
      name: "Parque Nacional de la Langue de Barbarie",
      summary: "Lengua de arena entre río y océano, refugio de aves para descubrir en piragua.",
      description:
        "Al sur de Saint-Louis, la Langue de Barbarie es una estrecha franja de arena entre la desembocadura del río Senegal y el Atlántico. El parque nacional protege colonias de aves (charranes, gaviotas, pelícanos, cormoranes) y zonas de puesta de tortugas marinas. Las excursiones en piragua suelen salir de Gandiol. El cordón de dunas quedó profundamente modificado por la apertura de una brecha en 2003, y la erosión es fuerte.",
      bestPeriod: "De noviembre a junio",
    },
    "parc-national-oiseaux-djoudj": {
      name: "Parque Nacional de Aves del Djoudj",
      summary: "Humedal declarado Patrimonio de la UNESCO, uno de los grandes santuarios de aves migratorias al sur del Sáhara.",
      description:
        "A unos 60 km al norte de Saint-Louis, en el delta del río Senegal, el parque del Djoudj está inscrito en el Patrimonio Mundial de la UNESCO desde 1981. Sus lagos, canales y carrizales acogen cada invierno a cientos de miles de aves llegadas de Europa, así como grandes colonias de pelícanos blancos y flamencos. La salida en piragua entre los pelícanos es el momento culminante de la visita.",
      tips: "Venga temprano por la mañana con prismáticos y protección solar; infórmese del estado de la pista después de la estación de lluvias.",
      bestPeriod: "De noviembre a abril (aves migratorias)",
    },
    "grande-mosquee-touba": {
      name: "Gran Mezquita de Touba",
      summary: "Inmensa mezquita de alto minarete que alberga el mausoleo de Cheikh Ahmadou Bamba.",
      description:
        "Inaugurada en 1963 y ampliada desde entonces, la Gran Mezquita de Touba, con sus cúpulas, sus mármoles y su alto minarete central, alberga el mausoleo de Cheikh Ahmadou Bamba. Los visitantes no musulmanes suelen poder visitarla acompañados de un guía de la comunidad, respetando estrictamente las normas del lugar.",
      tips: "Ropa que cubra brazos y piernas, pañuelo para las mujeres; nada de alcohol ni cigarrillos en la ciudad. Recurra a uno de los guías presentes en el lugar y evite las horas de oración.",
    },
    "grand-magal-de-touba": {
      name: "Gran Magal de Touba",
      summary: "La mayor peregrinación del país, en recuerdo de la partida al exilio de Cheikh Ahmadou Bamba.",
      description:
        "Cada año, el 18 del mes de safar del calendario islámico, el Gran Magal conmemora la partida al exilio de Cheikh Ahmadou Bamba, deportado a Gabón por la administración colonial en 1895. Millones de peregrinos convergen en Touba para rezar, recogerse y compartir comidas ofrecidas. La fecha se adelanta unos once días cada año respecto al calendario gregoriano.",
      tips: "Una experiencia impresionante pero muy multitudinaria: carreteras saturadas y alojamiento imposible de encontrar. Para una primera visita a Touba, elija otra época.",
      bestPeriod: "18 de safar (fecha variable según el calendario lunar)",
    },
    "plage-de-saly": {
      name: "Playa de Saly",
      summary: "La gran estación balnearia del país: hoteles, restaurantes y actividades náuticas.",
      description:
        "Saly concentra gran parte de la oferta de playa de Senegal: hoteles junto al mar, restaurantes, golf y actividades náuticas. Al norte, la laguna de la Somone, con su manglar y sus aves, ofrece una alternativa más tranquila para descubrir en piragua.",
      tips: "France Diplomatie pide prudencia en la costa de la Somone y de Saly a Joal (agresiones, robos en villas de alquiler): elija un alojamiento vigilado y evite las playas aisladas de noche.",
    },
    "reserve-de-bandia": {
      name: "Reserva de Bandia",
      summary: "Reserva de fauna entre baobabs: jirafas, rinocerontes, búfalos y antílopes.",
      description:
        "Cerca de Sindia, a una hora aproximadamente de Dakar, la reserva privada de Bandia ha reintroducido en una sabana poblada de baobabs especies desaparecidas de la región o procedentes de otros países africanos: jirafas, rinocerontes, búfalos, cebras y varios antílopes, junto a monos y tortugas. El safari se hace en vehículo con un guía. Una buena introducción a la fauna, factible en media jornada.",
    },
    "ile-de-fadiouth": {
      name: "Isla de Fadiouth",
      summary: "Isla hecha de conchas, unida a Joal por una pasarela, con su cementerio mixto.",
      description:
        "Unida a Joal por una larga pasarela de madera, Fadiouth es una isla cuyo suelo está formado por conchas acumuladas a lo largo de los siglos. Callejuelas sin coches, graneros de mijo sobre pilotes y, en una isla vecina, un cementerio donde cristianos y musulmanes descansan uno junto a otro, símbolo de la convivencia religiosa senegalesa. Joal es también la ciudad natal del poeta y presidente Léopold Sédar Senghor.",
      tips: "Recurra a los guías oficiales a la entrada de la pasarela; normalmente se pide una contribución.",
    },
    "bolongs-du-saloum": {
      name: "Bolongs e islas del Saloum",
      summary: "Salida en piragua por el manglar, entre pueblos isleños, aves y concheros.",
      description:
        "Un día en piragua lleva a través de los bolongs bordeados de mangles hasta los pueblos de las islas, los bancos de arena y los concheros. Se observan garzas, garcetas, pelícanos y, con un poco de suerte, delfines en la desembocadura. La recolección de ostras de manglar y la pesca marcan el ritmo de vida de los habitantes.",
      tips: "Salga con un piraguero recomendado por su campamento, con chalecos salvavidas, sombrero y agua.",
      bestPeriod: "De noviembre a mayo",
    },
    "reserve-de-fathala": {
      name: "Reserva de Fathala",
      summary: "Reserva de fauna en bosque seco, cerca de Toubakouta: jirafas, rinocerontes, elands de Derby.",
      description:
        "Al sur del delta, cerca de Toubakouta, la reserva de Fathala ocupa una parte del bosque de Fathala, integrado en el Parque Nacional del Delta del Saloum. En vehículo y con guía se observan jirafas, rinocerontes, búfalos, monos y varios antílopes, entre ellos el escaso eland de Derby. Un buen complemento a los paseos en piragua.",
    },
    "plage-de-cap-skirring": {
      name: "Playa de Cap Skirring",
      summary: "Largas playas de arena fina bordeadas de cocoteros, al final de la carretera de Ziguinchor.",
      description:
        "En el extremo suroeste del país, Cap Skirring ofrece largas playas de arena clara, cocoteros y pueblos de pescadores. Hoteles y campamentos permiten alojarse varios días, entre baños, paseos en bicicleta a los pueblos vecinos y pescado a la parrilla. France Diplomatie indica que la zona hotelera de Cap Skirring no presenta un peligro particular.",
      tips: "Báñese cerca de las zonas concurridas e infórmese sobre las corrientes antes de entrar en el agua.",
      bestPeriod: "De noviembre a mayo",
    },
    "ile-de-carabane": {
      name: "Isla de Carabane",
      summary: "Antigua factoría francesa en la desembocadura del río Casamance, accesible en piragua.",
      description:
        "En la desembocadura del Casamance, la isla de Carabane fue una factoría francesa a partir del siglo XIX. Se descubren los vestigios de aquella época (antigua misión católica, iglesia, cementerio), un pueblo tranquilo sin coches y playas bordeadas de palmeras. Se llega en piragua, sobre todo desde Elinkine o Ziguinchor.",
    },
    "case-a-impluvium-enampore": {
      name: "Casa de impluvio de Enampore",
      summary: "Gran casa diola de tierra cuyo tejado recoge el agua de lluvia en el centro.",
      description:
        "Vivienda tradicional diola, la casa de impluvio es una gran casa circular de adobe cuyo tejado de paja, en forma de embudo, recoge el agua de lluvia en un estanque central. Varias familias vivían en torno a este patio interior. En Enampore, entre Ziguinchor y Oussouye, se puede visitar una de estas casas, que a veces acoge viajeros. Una bonita introducción a la cultura diola.",
      tips: "Venga de día desde la carretera principal Ziguinchor–Oussouye, con un guía o un conductor local.",
    },
  },
  circuits: {
    "senegal-essentiel-8-jours": {
      title: "Lo esencial de Senegal en 8 días",
      summary:
        "De Dakar y Gorée al lago Rosa, de Saint-Louis y las aves del Djoudj a la ciudad santa de Touba, y descanso final en la Petite Côte, cerca del aeropuerto.",
    },
    "senegal-saloum-casamance-6-jours": {
      title: "Sine-Saloum y Casamance en 6 días",
      summary:
        "Fadiouth y los manglares del Saloum, luego la Baja Casamance: Ziguinchor, pueblos diola, Carabane y las playas de Cap Skirring. Trayectos de día, por los ejes principales, en zona de vigilancia reforzada.",
    },
  },
  stepNotes: {
    "senegal-essentiel-8-jours:0": "Llegada, instalación y primer contacto con Dakar.",
    "senegal-essentiel-8-jours:2": "Puesta de sol sobre la península.",
    "senegal-essentiel-8-jours:3": "Barco de la mañana hacia Gorée, día en la isla.",
    "senegal-essentiel-8-jours:6": "Mañana en el lago Rosa y luego carretera hacia Saint-Louis (unas 4 horas).",
    "senegal-essentiel-8-jours:9": "Salida al amanecer hacia el Djoudj, regreso a Saint-Louis por la tarde.",
    "senegal-essentiel-8-jours:10": "Piragua por la mañana desde Gandiol y luego carretera hacia Touba (unas 4 horas).",
    "senegal-essentiel-8-jours:11": "Visita matinal y luego carretera hacia la Petite Côte (unas 3 horas).",
    "senegal-essentiel-8-jours:13": "Safari por la mañana y traslado al cercano aeropuerto Blaise Diagne.",
    "senegal-saloum-casamance-6-jours:0": "Carretera de Dakar a Joal (unas 2 h 30) y luego hacia el delta.",
    "senegal-saloum-casamance-6-jours:1": "Un día en piragua por el delta.",
    "senegal-saloum-casamance-6-jours:2": "Safari por la mañana y regreso hacia Dakar para el vuelo o el barco nocturno a Ziguinchor.",
    "senegal-saloum-casamance-6-jours:3": "Llegada a Ziguinchor y carretera hacia Cap Skirring por Enampore y Oussouye.",
    "senegal-saloum-casamance-6-jours:5": "Piragua desde Elinkine para todo el día.",
    "senegal-saloum-casamance-6-jours:6": "Mañana en la playa y vuelo de regreso a Dakar.",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Terra da teranga, a hospitalidade senegalesa, o Senegal liga em poucas horas de estrada uma capital criativa virada para o oceano, a ilha-memória de Gorée, a cidade colonial de Saint-Louis, os mangais do Sine-Saloum e as praias de Casamança, ao som do mbalax, das grandes confrarias sufis e do thieboudienne partilhado num prato comum.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "Os cidadãos de muitos países, incluindo os da União Europeia e da CEDEAO, estão atualmente isentos de visto para estadias curtas; outras nacionalidades têm de o pedir. As regras mudam: confirme sempre as condições atualizadas junto da embaixada do Senegal ou das fontes oficiais antes de partir. Leve um passaporte válido por mais de seis meses, um bilhete de regresso e a morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "Desde março de 2026, deixaram de ser exigidas provas de vacinação à entrada aos viajantes vindos de países sem epidemias, mas a vacina contra a febre-amarela continua fortemente recomendada e as vacinas habituais (incluindo difteria e sarampo) devem estar em dia. O paludismo está presente, sobretudo durante e depois da estação das chuvas e no sul e no leste: consulte um médico ou uma consulta do viajante e proteja-se dos mosquitos. Beba água engarrafada.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa com o euro (1 € = 655,957 francos CFA). Há muitas caixas automáticas em Dakar e nas cidades turísticas; no resto do país, leve dinheiro. O pagamento por telemóvel (Wave, Orange Money) está em todo o lado. Os cartões bancários são aceites nos hotéis e nas lojas maiores.",
      },
      {
        title: "Quando ir",
        body: "A estação seca, aproximadamente de novembro a junho, é a mais agradável, com temperaturas mais amenas na costa de dezembro a março; o harmattan, vento seco e poeirento, sopra no interior no inverno. A estação das chuvas (aproximadamente de julho a outubro) traz calor húmido, trovoadas e pistas difíceis, sobretudo no sul e no leste. As aves migratórias do Djoudj observam-se de novembro a abril.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua oficial; o wolof é a língua mais falada no dia a dia, ao lado do pulaar, do serere, do diola, do mandinga e do soninquê, entre outras. Algumas palavras de wolof («nanga def?» para «como está?», «jërëjëf» para «obrigado») são sempre apreciadas. A grande maioria dos senegaleses é muçulmana, muitas vezes membro de confrarias sufis: roupa que cubra nos locais religiosos e fora da praia, e discrição durante o ramadão. Peça autorização antes de fotografar alguém; é proibido fotografar edifícios oficiais e militares.",
      },
      {
        title: "Deslocações",
        body: "Em Dakar: táxis (combine o preço antes de entrar), autocarros Dakar Dem Dikk, o TER (comboio expresso regional) e os autocarros rápidos BRT. Entre cidades: autoestradas à volta de Dakar, autocarros, «sept-places» (táxis coletivos) e carros com motorista. Para Casamança, voos domésticos para Ziguinchor ou Cap Skirring, ou o barco noturno Dakar–Ziguinchor. Evite conduzir à noite fora das cidades: estradas sem iluminação, peões e animais na faixa de rodagem.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 230 V; tomadas de tipo C, D, E e K: um adaptador universal é útil. Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao pagamento por telemóvel; a cobertura é boa nas cidades e nos grandes eixos.",
      },
      {
        title: "Segurança",
        body: "O Senegal é um dos países mais visitados da África Ocidental e a maioria das viagens decorre sem problemas, mas convém tomar algumas precauções. A France Diplomatie desaconselha, salvo motivo imperativo, as zonas fronteiriças com o Mali e parte da fronteira mauritana (departamento de Matam), bem como certas faixas fronteiriças de Casamança com a Gâmbia e a Guiné-Bissau (fora dos grandes eixos); não abandone as estradas asfaltadas nestes setores (minas residuais, florestas). O resto de Casamança, incluindo Ziguinchor, Cap Skirring e a zona entre a estrada e o rio, visita-se com vigilância reforçada, de dia e pelos eixos principais. As autoridades britânicas e francesas assinalam também um aumento de furtos e agressões em Dakar (sobretudo na Corniche à noite) e em alguns locais turísticos, uma ameaça terrorista que não pode ser excluída, manifestações por vezes tensas e um mar muito perigoso na Grande Côte. Consulte antes e durante a viagem os conselhos aos viajantes da France Diplomatie (diplomatie.gouv.fr) e do FCDO britânico (gov.uk/foreign-travel-advice/senegal), ou os do seu país.",
      },
    ],
  },
  destinations: {
    dakar: {
      summary: "Capital vibrante no extremo ocidental de África: museus, mercados, Corniche e cena musical.",
      description:
        "Situada na península de Cabo Verde, o ponto mais ocidental do continente, Dakar é uma capital enérgica e criativa. Vem-se pelos museus, pelos mercados, pela Corniche virada para o oceano, pelas galerias e pela Bienal de Arte Africana Contemporânea (Dak'Art), pela cena musical e pelos restaurantes onde provar yassa, mafé e thieboudienne. É também o ponto de partida para Gorée, o lago Rosa e a Petite Côte.",
    },
    goree: {
      name: "Ilha de Gorée",
      summary: "Pequena ilha sem carros em frente a Dakar, lugar de memória do tráfico inscrito na UNESCO.",
      description:
        "A cerca de vinte minutos de barco do porto de Dakar, a ilha de Gorée foi um dos primeiros sítios inscritos no Património Mundial da UNESCO (1978). Ruelas de areia, casas coloniais de fachadas ocre e buganvílias contrastam com a história que encarna: a do tráfico atlântico de escravos, de que a Casa dos Escravos se tornou símbolo mundial. Sem carros, a ilha percorre-se a pé num dia.",
    },
    "lac-rose": {
      name: "Lago Rosa (lago Retba)",
      summary: "Laguna salgada de reflexos cor-de-rosa, colheita artesanal de sal e dunas junto ao oceano.",
      description:
        "A cerca de trinta quilómetros a nordeste de Dakar, o lago Retba, chamado lago Rosa, deve a sua cor a uma microalga que prospera nas suas águas muito salgadas; o tom é mais intenso na estação seca, em pleno sol. Antiga meta do rali Paris-Dakar, o local é conhecido pelos apanhadores de sal e pelas dunas que o separam do oceano.",
    },
    "saint-louis": {
      summary: "Antiga capital colonial numa ilha do rio Senegal, Património Mundial da UNESCO.",
      description:
        "Fundada no século XVII numa ilha da foz do rio Senegal, Saint-Louis foi a capital da colónia do Senegal e, durante algum tempo, da África Ocidental Francesa. A sua ilha, ligada ao continente pela ponte Faidherbe, está inscrita no Património Mundial da UNESCO pelas casas com varandas e pelo traçado regular. Cidade de música, pesca e memória, é também a porta dos parques do Djoudj e da Langue de Barbarie. A cerca de 4 horas de estrada de Dakar.",
    },
    touba: {
      summary: "Cidade santa do muridismo, em torno de uma das maiores mesquitas da África Ocidental.",
      description:
        "Fundada no final do século XIX por Cheikh Ahmadou Bamba, fundador da confraria sufi dos Murides, Touba é a segunda cidade do país e um grande centro espiritual. Tem um estatuto especial: o álcool e o tabaco são proibidos. A Grande Mesquita atrai visitantes durante todo o ano e, durante o Grande Magal, multidões imensas de peregrinos. A cerca de 3 horas de estrada de Dakar.",
    },
    "petite-cote": {
      name: "A Petite Côte",
      summary: "O litoral balnear a sul de Dakar: praias, aldeias de pescadores e a ilha de conchas de Fadiouth.",
      description:
        "Entre Dakar e o delta do Saloum, a Petite Côte encadeia estâncias balneares (Saly, Somone), aldeias de pescadores e lagunas. O mar é aqui mais calmo do que na Grande Côte, a norte. Vem-se para descansar, mas também pela reserva de Bandia e por Joal-Fadiouth, terra natal de Léopold Sédar Senghor. Perto do aeroporto internacional Blaise Diagne, é uma etapa prática no início ou no fim da viagem.",
    },
    "sine-saloum": {
      name: "Delta do Sine-Saloum",
      summary: "Labirinto de mangais, ilhas e bolongs, inscrito na UNESCO, para explorar de piroga.",
      description:
        "Onde os rios Sine e Saloum se juntam ao oceano, o delta forma um labirinto de braços de mar (bolongs), mangais e ilhas habitadas por pescadores sereres e niominkas. Reserva da biosfera, está inscrito no Património Mundial da UNESCO pelos concheiros e túmulos funerários deixados por gerações de habitantes. Os acampamentos de Palmarin, Ndangane, Foundiougne ou Toubakouta servem de base para os passeios de piroga.",
    },
    "basse-casamance": {
      name: "Baixa Casamança",
      summary: "Arrozais, florestas, aldeias diolas e praias de Cap Skirring, a sul da Gâmbia.",
      description:
        "Separada do norte do país pela Gâmbia, a Baixa Casamança é a região mais verde do Senegal: um rio ladeado de mangais, arrozais, poilões gigantes e aldeias diolas de tradições vivas (reino de Oussouye, casas de impluvium). Ziguinchor, a sua capital, está ligada a Dakar por avião e por barco; Cap Skirring é a grande estância balnear do sul. A região visita-se com vigilância reforçada e algumas zonas fronteiriças são desaconselhadas: mantenha-se nos eixos principais e siga os conselhos aos viajantes.",
    },
  },
  places: {
    "musee-des-civilisations-noires": {
      name: "Museu das Civilizações Negras",
      summary: "Grande museu inaugurado em 2018, dedicado às culturas de África e das suas diásporas.",
      description:
        "Imaginado desde a época de Léopold Sédar Senghor e do Festival Mundial das Artes Negras de 1966, o Museu das Civilizações Negras abriu as portas em dezembro de 2018 num vasto edifício circular do centro de Dakar. As suas salas apresentam as civilizações africanas, das origens da humanidade às criações contemporâneas, bem como as ligações às diásporas das Américas e das Caraíbas.",
    },
    "monument-de-la-renaissance-africaine": {
      name: "Monumento do Renascimento Africano",
      summary: "Estátua monumental em bronze que domina a cidade a partir de uma das colinas de Les Mamelles.",
      description:
        "Inaugurado em 2010 para o cinquentenário da independência, este grupo de bronze com cerca de cinquenta metros representa um homem, uma mulher e uma criança virados para o oceano. Polémico durante a construção, tornou-se uma das referências de Dakar. As escadas que lá levam oferecem uma bela vista sobre a península e a costa, sobretudo ao fim do dia.",
    },
    "marche-kermel-dakar": {
      name: "Mercado Kermel",
      summary: "Mercado colonial do Plateau: peixe, fruta, flores e artesanato.",
      description:
        "No coração do Plateau, o bairro de negócios, o mercado Kermel ocupa um elegante edifício circular da época colonial, reconstruído de forma idêntica após um incêndio nos anos 1990. Encontra-se peixe, fruta, legumes e flores e, à volta, bancas de artesanato, cestos e tecidos. Mais calmo do que os grandes mercados populares como Sandaga, é um bom primeiro contacto.",
      tips: "Regateie com um sorriso e desconfie dos angariadores demasiado insistentes à volta do mercado.",
    },
    "mosquee-de-la-divinite-ouakam": {
      name: "Mesquita da Divindade",
      summary: "Mesquita branca de dois minaretes, virada para o oceano na Corniche de Ouakam.",
      description:
        "Construída à beira do Atlântico, ao pé das falésias de Ouakam, a Mesquita da Divindade é uma das imagens mais fotografadas de Dakar, com os seus dois minaretes brancos recortados sobre o oceano. O bairro de Ouakam, antiga aldeia de pescadores lebu, conserva um ambiente de aldeia dentro da capital.",
      tips: "Admire-a do exterior ou peça autorização para entrar, com roupa que cubra e fora das horas de oração.",
    },
    "maison-des-esclaves-goree": {
      name: "Casa dos Escravos",
      summary: "Casa do final do século XVIII transformada em memorial do tráfico, com a sua «porta da viagem sem regresso».",
      description:
        "Construída no final do século XVIII, a Casa dos Escravos tem no rés-do-chão celas escuras e um corredor que se abre para o oceano, a «porta da viagem sem regresso». O papel exato desta casa no tráfico é debatido pelos historiadores, mas tornou-se um lugar de memória universal, visitado por muitos chefes de Estado e visitantes de todo o mundo. Um momento de intenso recolhimento.",
      tips: "Venha cedo para evitar a afluência dos grupos; um guia local ajuda a enquadrar o local na história do tráfico.",
    },
    "musee-historique-goree": {
      name: "Museu Histórico do Senegal em Gorée",
      summary: "Instalado no forte d'Estrées, percorre a história do país da pré-história à independência.",
      description:
        "Na ponta norte da ilha, o forte d'Estrées, construído no século XIX, acolhe o museu histórico ligado ao IFAN (Instituto Fundamental da África Negra). As salas percorrem a história do território senegalês: pré-história, grandes reinos, islão, tráfico, colonização e independência. Um bom complemento à visita da Casa dos Escravos.",
    },
    "castel-de-goree": {
      name: "O Castel",
      summary: "Planalto rochoso no sul da ilha, antigas baterias de artilharia e vista sobre Dakar.",
      description:
        "O Castel, ponto mais alto da ilha, é um planalto rochoso que conserva antigas fortificações e peças de artilharia. Artistas e artesãos expõem ali muitas vezes as suas obras. Sobe-se por ruelas e escadas para apreciar a vista sobre a ilha, o oceano e os edifícios de Dakar.",
    },
    "lac-retba": {
      name: "Lago Retba e a colheita do sal",
      summary: "Observar os apanhadores de sal nas pirogas e os montes brancos à beira do lago.",
      description:
        "No lago, homens e mulheres extraem o sal à mão a partir de pirogas e depois amontoam-no na margem; untam a pele com manteiga de karité para se protegerem da salinidade. Um passeio de piroga permite ver este trabalho de perto e sentir a densidade da água.",
      tips: "A cor é mais nítida por volta do meio-dia na estação seca. A France Diplomatie assinala agressões neste local: evite os recantos isolados e não fique depois do anoitecer.",
      bestPeriod: "Estação seca (de novembro a junho)",
    },
    "dunes-du-lac-rose": {
      name: "Dunas do lago Rosa",
      summary: "Passeio de 4x4, moto-quatro ou dromedário pelas dunas, até à praia do oceano.",
      description:
        "Entre o lago e o Atlântico estende-se um cordão de dunas que se atravessa de 4x4, de moto-quatro, a cavalo ou de dromedário, até à longa praia da Grande Côte. Um passeio divertido, apreciado em família, a combinar com a visita aos apanhadores de sal.",
      tips: "Não tome banho: na Grande Côte o mar é perigoso e raramente vigiado. Escolha um operador sério e exija capacete e equipamento para a moto-quatro.",
    },
    "ile-de-saint-louis": {
      name: "Ilha de Saint-Louis e ponte Faidherbe",
      summary: "Passeio pela cidade histórica de casas com varandas, de um e outro lado da ponte Faidherbe.",
      description:
        "A ponte Faidherbe, estrutura metálica do final do século XIX com cerca de 500 metros, leva à ilha classificada. Passeia-se entre casas coloniais com varandas de madeira e pátios interiores, praças sombreadas, a catedral e a mesquita, e cais sobre o rio. Em frente, na Langue de Barbarie, o bairro de pescadores de Guet Ndar oferece um espetáculo impressionante de pirogas pintadas. O passeio de charrete é uma forma clássica de descobrir a cidade.",
      tips: "Peça autorização antes de fotografar em Guet Ndar, um bairro de vida e trabalho muito animado.",
    },
    "thieboudienne-saint-louis": {
      name: "O thieboudienne de Saint-Louis",
      summary: "O prato nacional, arroz com peixe e legumes, cuja paternidade Saint-Louis reivindica.",
      description:
        "Arroz cozido num caldo de peixe e tomate, servido com peixe recheado, legumes (mandioca, couve, cenoura, beringela) e molhos, o thieboudienne (ceebu jën em wolof) é o prato emblemático do Senegal; foi inscrito em 2021 no Património Cultural Imaterial da UNESCO. A tradição atribui a sua invenção a Saint-Louis. Come-se ao almoço, muitas vezes partilhado num grande prato comum.",
      tips: "O thieboudienne come-se sobretudo ao almoço: muitos restaurantes já não o preparam ao jantar.",
    },
    "parc-national-langue-de-barbarie": {
      name: "Parque Nacional da Langue de Barbarie",
      summary: "Restinga de areia entre rio e oceano, refúgio de aves a descobrir de piroga.",
      description:
        "A sul de Saint-Louis, a Langue de Barbarie é uma estreita faixa de areia entre a foz do rio Senegal e o Atlântico. O parque nacional protege colónias de aves (garajaus, gaivotas, pelicanos, corvos-marinhos) e locais de postura de tartarugas marinhas. Os passeios de piroga partem geralmente de Gandiol. O cordão dunar foi profundamente alterado pela abertura de uma brecha em 2003, e a erosão é forte.",
      bestPeriod: "De novembro a junho",
    },
    "parc-national-oiseaux-djoudj": {
      name: "Parque Nacional das Aves do Djoudj",
      summary: "Zona húmida inscrita na UNESCO, um dos grandes santuários de aves migratórias a sul do Sara.",
      description:
        "A cerca de 60 km a norte de Saint-Louis, no delta do rio Senegal, o parque do Djoudj está inscrito no Património Mundial da UNESCO desde 1981. Os seus lagos, canais e caniçais acolhem todos os invernos centenas de milhares de aves vindas da Europa, bem como grandes colónias de pelicanos-brancos e flamingos. O passeio de piroga no meio dos pelicanos é o ponto alto da visita.",
      tips: "Venha cedo de manhã com binóculos e proteção solar; informe-se sobre o estado da pista depois da estação das chuvas.",
      bestPeriod: "De novembro a abril (aves migratórias)",
    },
    "grande-mosquee-touba": {
      name: "Grande Mesquita de Touba",
      summary: "Imensa mesquita de alto minarete que acolhe o mausoléu de Cheikh Ahmadou Bamba.",
      description:
        "Inaugurada em 1963 e ampliada desde então, a Grande Mesquita de Touba, com as suas cúpulas, os seus mármores e o seu alto minarete central, acolhe o mausoléu de Cheikh Ahmadou Bamba. Os visitantes não muçulmanos podem geralmente visitá-la acompanhados por um guia da comunidade, respeitando estritamente as regras do local.",
      tips: "Roupa que cubra braços e pernas, lenço para as mulheres; nada de álcool nem cigarros na cidade. Recorra a um dos guias presentes no local e evite as horas de oração.",
    },
    "grand-magal-de-touba": {
      name: "Grande Magal de Touba",
      summary: "A maior peregrinação do país, em memória da partida para o exílio de Cheikh Ahmadou Bamba.",
      description:
        "Todos os anos, no dia 18 do mês de safar do calendário islâmico, o Grande Magal comemora a partida para o exílio de Cheikh Ahmadou Bamba, deportado para o Gabão pela administração colonial em 1895. Milhões de peregrinos convergem para Touba para rezar, recolher-se e partilhar refeições oferecidas. A data recua cerca de onze dias por ano em relação ao calendário gregoriano.",
      tips: "Uma experiência impressionante mas muito concorrida: estradas saturadas e alojamento impossível de encontrar. Para uma primeira visita a Touba, prefira outra altura.",
      bestPeriod: "18 de safar (data variável segundo o calendário lunar)",
    },
    "plage-de-saly": {
      name: "Praia de Saly",
      summary: "A grande estância balnear do país: hotéis, restaurantes e atividades náuticas.",
      description:
        "Saly concentra grande parte da oferta balnear do Senegal: hotéis à beira-mar, restaurantes, golfe e atividades náuticas. A norte, a laguna da Somone, com o seu mangal e as suas aves, oferece uma alternativa mais tranquila a descobrir de piroga.",
      tips: "A France Diplomatie pede prudência na costa da Somone e de Saly a Joal (agressões, assaltos a moradias de aluguer): escolha um alojamento vigiado e evite as praias isoladas à noite.",
    },
    "reserve-de-bandia": {
      name: "Reserva de Bandia",
      summary: "Reserva de fauna entre embondeiros: girafas, rinocerontes, búfalos e antílopes.",
      description:
        "Perto de Sindia, a cerca de uma hora de Dakar, a reserva privada de Bandia reintroduziu numa savana pontuada de embondeiros espécies desaparecidas da região ou vindas de outros países africanos: girafas, rinocerontes, búfalos, zebras e vários antílopes, ao lado de macacos e tartarugas. O safari faz-se de viatura com guia. Uma boa introdução à fauna, possível em meio dia.",
    },
    "ile-de-fadiouth": {
      name: "Ilha de Fadiouth",
      summary: "Ilha feita de conchas, ligada a Joal por uma ponte pedonal, com o seu cemitério misto.",
      description:
        "Ligada a Joal por uma longa ponte pedonal de madeira, Fadiouth é uma ilha cujo solo é formado por conchas acumuladas ao longo dos séculos. Ruelas sem carros, celeiros de milho-miúdo sobre estacas e, numa ilha vizinha, um cemitério onde cristãos e muçulmanos repousam lado a lado, símbolo da convivência religiosa senegalesa. Joal é também a terra natal do poeta e presidente Léopold Sédar Senghor.",
      tips: "Recorra aos guias oficiais à entrada da ponte; normalmente é pedida uma contribuição.",
    },
    "bolongs-du-saloum": {
      name: "Bolongs e ilhas do Saloum",
      summary: "Passeio de piroga no mangal, entre aldeias insulares, aves e concheiros.",
      description:
        "Um dia de piroga leva através dos bolongs ladeados de mangue até às aldeias das ilhas, aos bancos de areia e aos concheiros. Observam-se garças, garçotas, pelicanos e, com alguma sorte, golfinhos na foz. A apanha de ostras de mangal e a pesca marcam o ritmo de vida dos habitantes.",
      tips: "Parta com um piroguista recomendado pelo seu acampamento, com coletes salva-vidas, chapéu e água.",
      bestPeriod: "De novembro a maio",
    },
    "reserve-de-fathala": {
      name: "Reserva de Fathala",
      summary: "Reserva de fauna em floresta seca, perto de Toubakouta: girafas, rinocerontes, elandes-de-derby.",
      description:
        "A sul do delta, perto de Toubakouta, a reserva de Fathala ocupa uma parte da floresta de Fathala, integrada no Parque Nacional do Delta do Saloum. De viatura e com guia observam-se girafas, rinocerontes, búfalos, macacos e vários antílopes, entre eles o raro elande-de-derby. Um bom complemento aos passeios de piroga.",
    },
    "plage-de-cap-skirring": {
      name: "Praia de Cap Skirring",
      summary: "Longas praias de areia fina ladeadas de coqueiros, no fim da estrada de Ziguinchor.",
      description:
        "No extremo sudoeste do país, Cap Skirring oferece longas praias de areia clara, coqueirais e aldeias de pescadores. Hotéis e acampamentos permitem ficar vários dias, entre banhos, passeios de bicicleta às aldeias vizinhas e peixe grelhado. A France Diplomatie indica que a zona hoteleira de Cap Skirring não apresenta perigo particular.",
      tips: "Tome banho perto das zonas frequentadas e informe-se sobre as correntes antes de entrar na água.",
      bestPeriod: "De novembro a maio",
    },
    "ile-de-carabane": {
      name: "Ilha de Carabane",
      summary: "Antigo entreposto francês na foz do rio Casamança, acessível de piroga.",
      description:
        "Na foz do Casamança, a ilha de Carabane foi um entreposto francês a partir do século XIX. Descobrem-se os vestígios dessa época (antiga missão católica, igreja, cemitério), uma aldeia tranquila sem carros e praias ladeadas de palmeiras. Chega-se de piroga, nomeadamente a partir de Elinkine ou de Ziguinchor.",
    },
    "case-a-impluvium-enampore": {
      name: "Casa de impluvium de Enampore",
      summary: "Grande casa diola de terra cujo telhado recolhe a água da chuva ao centro.",
      description:
        "Habitação tradicional diola, a casa de impluvium é uma vasta casa circular de adobe cujo telhado de colmo, em funil, recolhe a água da chuva numa bacia central. Várias famílias viviam em torno deste pátio interior. Em Enampore, entre Ziguinchor e Oussouye, uma destas casas pode ser visitada e por vezes acolhe viajantes. Uma bela introdução à cultura diola.",
      tips: "Venha de dia a partir da estrada principal Ziguinchor–Oussouye, com um guia ou motorista local.",
    },
  },
  circuits: {
    "senegal-essentiel-8-jours": {
      title: "O essencial do Senegal em 8 dias",
      summary:
        "De Dakar e Gorée ao lago Rosa, de Saint-Louis e das aves do Djoudj à cidade santa de Touba, e descanso final na Petite Côte, perto do aeroporto.",
    },
    "senegal-saloum-casamance-6-jours": {
      title: "Sine-Saloum e Casamança em 6 dias",
      summary:
        "Fadiouth e os mangais do Saloum, depois a Baixa Casamança: Ziguinchor, aldeias diolas, Carabane e as praias de Cap Skirring. Trajetos de dia, pelos eixos principais, em zona de vigilância reforçada.",
    },
  },
  stepNotes: {
    "senegal-essentiel-8-jours:0": "Chegada, instalação e primeiro contacto com Dakar.",
    "senegal-essentiel-8-jours:2": "Pôr do sol sobre a península.",
    "senegal-essentiel-8-jours:3": "Barco da manhã para Gorée, dia na ilha.",
    "senegal-essentiel-8-jours:6": "Manhã no lago Rosa e depois estrada para Saint-Louis (cerca de 4 horas).",
    "senegal-essentiel-8-jours:9": "Partida de madrugada para o Djoudj, regresso a Saint-Louis à tarde.",
    "senegal-essentiel-8-jours:10": "Piroga de manhã a partir de Gandiol e depois estrada para Touba (cerca de 4 horas).",
    "senegal-essentiel-8-jours:11": "Visita matinal e depois estrada para a Petite Côte (cerca de 3 horas).",
    "senegal-essentiel-8-jours:13": "Safari de manhã e transferência para o aeroporto Blaise Diagne, ali perto.",
    "senegal-saloum-casamance-6-jours:0": "Estrada de Dakar para Joal (cerca de 2 h 30) e depois para o delta.",
    "senegal-saloum-casamance-6-jours:1": "Um dia de piroga no delta.",
    "senegal-saloum-casamance-6-jours:2": "Safari de manhã e regresso a Dakar para o voo ou o barco noturno para Ziguinchor.",
    "senegal-saloum-casamance-6-jours:3": "Chegada a Ziguinchor e estrada para Cap Skirring por Enampore e Oussouye.",
    "senegal-saloum-casamance-6-jours:5": "Piroga a partir de Elinkine para o dia inteiro.",
    "senegal-saloum-casamance-6-jours:6": "Manhã na praia e voo de regresso a Dakar.",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "السنغال أرض «التيرانغا»، أي الضيافة السنغالية، وتجمع في ساعات قليلة من الطريق عاصمةً مبدعة مطلّة على المحيط، وجزيرة غوريه الشاهدة على الذاكرة، ومدينة سان لوي الاستعمارية، وغابات المانغروف في سين سالوم، وشواطئ كازامانس، على إيقاع موسيقى المبالاكس والطرق الصوفية الكبرى وطبق «تشيبوجين» الذي يُتقاسم في صحن واحد.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يُعفى حاليًا مواطنو كثير من الدول، ومنها دول الاتحاد الأوروبي والمجموعة الاقتصادية لدول غرب أفريقيا (إيكواس)، من التأشيرة للإقامات القصيرة، بينما يتعيّن على جنسيات أخرى طلبها. القواعد تتغيّر: تحقّق دائمًا من الشروط المحدّثة لدى سفارة السنغال أو المصادر الرسمية قبل السفر. احمل جواز سفر صالحًا لأكثر من ستة أشهر وتذكرة عودة وعنوان مكان إقامتك.",
      },
      {
        title: "الصحة",
        body: "منذ مارس 2026 لم تعد شهادات التطعيم مطلوبة عند الدخول للمسافرين القادمين من بلدان لا تشهد أوبئة، لكن التطعيم ضد الحمى الصفراء يبقى موصى به بشدة، ويجب أن تكون اللقاحات المعتادة (ومنها الدفتيريا والحصبة) محدّثة. الملاريا موجودة، خاصة خلال موسم الأمطار وبعده وفي الجنوب والشرق: استشر طبيبًا أو مركزًا للتطعيمات الدولية واحمِ نفسك من البعوض. اشرب المياه المعبأة.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي الفرنك الأفريقي (XOF)، بسعر صرف ثابت مقابل اليورو (1 يورو = 655.957 فرنكًا أفريقيًا). أجهزة الصرف الآلي كثيرة في داكار والمدن السياحية؛ أما في غيرها فاحمل نقودًا. الدفع عبر الهاتف المحمول (Wave وOrange Money) منتشر في كل مكان. تُقبل البطاقات المصرفية في الفنادق والمتاجر الكبرى.",
      },
      {
        title: "متى تسافر",
        body: "موسم الجفاف، من نوفمبر إلى يونيو تقريبًا، هو الأنسب، مع درجات حرارة أعتدل على الساحل من ديسمبر إلى مارس؛ وتهبّ رياح الهرمتان الجافة المحمّلة بالغبار في الداخل شتاءً. أما موسم الأمطار (من يوليو إلى أكتوبر تقريبًا) فيجلب حرًّا رطبًا وعواصف ومسالك صعبة، خاصة في الجنوب والشرق. تُشاهد الطيور المهاجرة في جودج من نوفمبر إلى أبريل.",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي اللغة الرسمية، والولوف هي اللغة الأكثر تداولًا في الحياة اليومية، إلى جانب البولار والسيرير والديولا والماندينغ والسوننكي وغيرها. بضع كلمات بالولوف («نانغا دِف؟» بمعنى «كيف حالك؟»، و«جيريجيف» بمعنى «شكرًا») تلقى دائمًا الترحيب. الغالبية العظمى من السنغاليين مسلمون، وكثير منهم ينتمون إلى طرق صوفية: ارتدِ ملابس محتشمة في الأماكن الدينية وخارج الشواطئ، والتزم التحفّظ خلال شهر رمضان. استأذن قبل تصوير أي شخص؛ ويُمنع تصوير المباني الرسمية والعسكرية.",
      },
      {
        title: "التنقل",
        body: "في داكار: سيارات الأجرة (اتفق على السعر قبل الركوب)، وحافلات «داكار ديم ديك»، والقطار السريع الإقليمي (TER)، والحافلات السريعة (BRT). بين المدن: طرق سريعة حول داكار، وحافلات، وسيارات «السبعة مقاعد» الجماعية، وسيارات بسائق. للوصول إلى كازامانس: رحلات داخلية إلى زيغينشور أو كاب سكيرينغ، أو العبّارة الليلية بين داكار وزيغينشور. تجنّب القيادة ليلًا خارج المدن: الطرق غير مضاءة والمشاة والحيوانات على الطريق.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار 230 فولت، والمقابس من الأنواع C وD وE وK: يُستحسن حمل محوّل عالمي. تتيح شريحة اتصال محلية (يُطلب إثبات الهوية) الوصول إلى الإنترنت عبر الهاتف والدفع عبر المحمول؛ والتغطية جيدة في المدن وعلى الطرق الرئيسية.",
      },
      {
        title: "الأمن",
        body: "السنغال من أكثر بلدان غرب أفريقيا استقبالًا للزوار، ومعظم الرحلات تمرّ دون مشكلات، لكن بعض الاحتياطات ضرورية. توصي وزارة الخارجية الفرنسية (France Diplomatie) بتجنّب السفر، إلا لسبب قاهر، إلى المناطق الحدودية مع مالي وجزء من الحدود الموريتانية (مقاطعة ماتام)، وإلى بعض الشرائط الحدودية لكازامانس مع غامبيا وغينيا بيساو (خارج المحاور الرئيسية)؛ ولا تغادر الطرق المعبّدة في هذه القطاعات (ألغام متبقية وغابات). أما بقية كازامانس، ومنها زيغينشور وكاب سكيرينغ والمنطقة الواقعة بين الطريق والنهر، فتُزار مع يقظة مشدّدة، نهارًا وعلى المحاور الرئيسية. وتشير السلطات البريطانية والفرنسية أيضًا إلى تزايد السرقات والاعتداءات في داكار (لا سيما على الكورنيش ليلًا) وفي بعض المواقع السياحية، وإلى تهديد إرهابي لا يمكن استبعاده، ومظاهرات قد تتوتّر، وبحر شديد الخطورة على «الساحل الكبير». راجع قبل السفر وأثناءه نصائح المسافرين الصادرة عن France Diplomatie (diplomatie.gouv.fr) ووزارة الخارجية البريطانية FCDO (gov.uk/foreign-travel-advice/senegal)، أو تلك الصادرة عن بلدك.",
      },
    ],
  },
  destinations: {
    dakar: {
      name: "داكار",
      region: "داكار",
      summary: "عاصمة نابضة بالحياة في أقصى غرب أفريقيا: متاحف وأسواق وكورنيش ومشهد موسيقي.",
      description:
        "تقع داكار على شبه جزيرة الرأس الأخضر، أقصى نقطة في غرب القارة، وهي عاصمة مفعمة بالطاقة والإبداع. يقصدها الزوار لمتاحفها وأسواقها وكورنيشها المطلّ على المحيط وصالات العرض فيها وبينالي الفن الأفريقي المعاصر (داك آرت)، ولمشهدها الموسيقي ومطاعمها التي تقدّم الياسا والمافيه والتشيبوجين. وهي أيضًا نقطة الانطلاق إلى غوريه والبحيرة الوردية والساحل الصغير.",
    },
    goree: {
      name: "جزيرة غوريه",
      region: "داكار",
      summary: "جزيرة صغيرة بلا سيارات قبالة داكار، موقع لذاكرة تجارة الرقيق مُدرج في قائمة اليونسكو.",
      description:
        "على بُعد نحو عشرين دقيقة بالعبّارة من ميناء داكار، كانت جزيرة غوريه من أوائل المواقع المدرجة في قائمة التراث العالمي لليونسكو (1978). أزقّة رملية وبيوت استعمارية بواجهات بلون المغرة وأزهار الجهنمية تتناقض مع التاريخ الذي تجسّده: تاريخ تجارة الرقيق عبر الأطلسي، الذي أصبح «بيت العبيد» رمزه العالمي. ولخلوّها من السيارات، يمكن التجوّل فيها سيرًا على الأقدام في يوم واحد.",
    },
    "lac-rose": {
      name: "البحيرة الوردية (بحيرة ريتبا)",
      region: "داكار",
      summary: "بحيرة مالحة بانعكاسات وردية، وجمع تقليدي للملح، وكثبان على حافة المحيط.",
      description:
        "على بُعد نحو ثلاثين كيلومترًا شمال شرق داكار، تدين بحيرة ريتبا، المعروفة بالبحيرة الوردية، بلونها لطحلب مجهري يزدهر في مياهها شديدة الملوحة؛ ويكون اللون أوضح في موسم الجفاف تحت أشعة الشمس. كانت قديمًا خط نهاية رالي باريس-داكار، وتشتهر بجامعي الملح وبالكثبان التي تفصلها عن المحيط.",
    },
    "saint-louis": {
      name: "سان لوي",
      region: "سان لوي",
      summary: "عاصمة استعمارية سابقة على جزيرة في نهر السنغال، مُدرجة في قائمة اليونسكو.",
      description:
        "تأسست سان لوي في القرن السابع عشر على جزيرة عند مصبّ نهر السنغال، وكانت عاصمة مستعمرة السنغال، ولفترة عاصمة غرب أفريقيا الفرنسية. جزيرتها، المتصلة باليابسة عبر جسر فيديرب، مُدرجة في قائمة التراث العالمي لليونسكو بفضل بيوتها ذات الشرفات وتخطيطها المنتظم. وهي مدينة الموسيقى والصيد والذاكرة، وبوابة متنزّهَي جودج ولانغ دو باربري. تبعد نحو 4 ساعات بالسيارة عن داكار.",
    },
    touba: {
      name: "طوبى",
      region: "جوربل",
      summary: "المدينة المقدسة للطريقة المريدية، حول أحد أكبر المساجد في غرب أفريقيا.",
      description:
        "أسّسها في أواخر القرن التاسع عشر الشيخ أحمدو بمبا، مؤسس الطريقة الصوفية المريدية، وطوبى هي ثاني مدن البلاد ومركز روحي كبير. تتمتع بوضع خاص: الكحول والتبغ ممنوعان فيها. يجذب مسجدها الكبير الزوار طوال العام، وخلال «الماغال الكبير» حشودًا هائلة من الحجاج. تبعد نحو 3 ساعات بالسيارة عن داكار.",
    },
    "petite-cote": {
      name: "الساحل الصغير",
      region: "تييس",
      summary: "الساحل الشاطئي جنوب داكار: شواطئ وقرى صيادين وجزيرة الأصداف فاديوث.",
      description:
        "بين داكار ودلتا سالوم، يضم الساحل الصغير منتجعات شاطئية (سالي، سومون) وقرى صيادين وبحيرات ساحلية. البحر هنا أهدأ منه على «الساحل الكبير» شمالًا. يقصده الزوار للراحة، ولكن أيضًا لمحمية بانديا ولجوال-فاديوث، مسقط رأس ليوبولد سيدار سنغور. وبقربه من مطار بليز ديان الدولي، يُعدّ محطة عملية في بداية الرحلة أو نهايتها.",
    },
    "sine-saloum": {
      name: "دلتا سين سالوم",
      region: "فاتيك",
      summary: "متاهة من غابات المانغروف والجزر والقنوات المدّية، مُدرجة في قائمة اليونسكو، تُستكشف بالقارب.",
      description:
        "حيث يلتقي نهرا سين وسالوم بالمحيط، تشكّل الدلتا متاهة من الأذرع البحرية (البولونغ) وغابات المانغروف والجزر التي يسكنها صيادو السيرير والنيومينكا. وهي محمية للمحيط الحيوي، ومُدرجة في قائمة التراث العالمي لليونسكو بفضل تلال الأصداف والمدافن الركامية التي خلّفتها أجيال من السكان. وتُعدّ النُّزُل في بالمارين ونداغان وفونديونغ وتوباكوتا قواعد لرحلات القوارب.",
    },
    "basse-casamance": {
      name: "كازامانس السفلى",
      region: "زيغينشور",
      summary: "حقول أرز وغابات وقرى الديولا وشواطئ كاب سكيرينغ، جنوب غامبيا.",
      description:
        "تفصل غامبيا كازامانس السفلى عن شمال البلاد، وهي أكثر مناطق السنغال اخضرارًا: نهر تحفّه غابات المانغروف، وحقول أرز، وأشجار قطن عملاقة، وقرى للديولا ذات تقاليد حيّة (مملكة أوسويي، والبيوت ذات الفناء المجمِّع لمياه المطر). ترتبط زيغينشور، عاصمتها، بداكار جوًّا وبحرًا، وكاب سكيرينغ هي المنتجع الشاطئي الكبير في الجنوب. تُزار المنطقة مع يقظة مشدّدة، وبعض المناطق الحدودية لا يُنصح بها: التزم بالمحاور الرئيسية واتبع نصائح المسافرين.",
    },
  },
  places: {
    "musee-des-civilisations-noires": {
      name: "متحف الحضارات السوداء",
      summary: "متحف كبير افتُتح عام 2018، مخصّص لثقافات أفريقيا وشتاتها.",
      description:
        "وُلدت فكرته في عهد ليوبولد سيدار سنغور ومهرجان الفنون الزنجية العالمي عام 1966، وافتُتح متحف الحضارات السوداء في ديسمبر 2018 في مبنى دائري واسع وسط داكار. تعرض قاعاته الحضارات الأفريقية من أصول البشرية حتى الإبداعات المعاصرة، إضافة إلى صلاتها بشتات الأمريكتين والكاريبي.",
    },
    "monument-de-la-renaissance-africaine": {
      name: "نصب النهضة الأفريقية",
      summary: "تمثال برونزي ضخم يطلّ على المدينة من إحدى تلال «ليه ماميل».",
      description:
        "دُشّن عام 2010 في الذكرى الخمسين للاستقلال، وهو مجموعة برونزية بارتفاع نحو خمسين مترًا تمثّل رجلًا وامرأة وطفلًا يتّجهون نحو المحيط. أثار الجدل عند بنائه، لكنه أصبح أحد معالم داكار. وتوفّر الدرجات المؤدية إليه إطلالة جميلة على شبه الجزيرة والساحل، خاصة في آخر النهار.",
    },
    "marche-kermel-dakar": {
      name: "سوق كيرمل",
      summary: "سوق مسقوف من الحقبة الاستعمارية في حي «البلاتو»: سمك وفواكه وزهور وحرف يدوية.",
      description:
        "في قلب «البلاتو»، حي الأعمال، يشغل سوق كيرمل مبنى دائريًا أنيقًا من الحقبة الاستعمارية، أُعيد بناؤه على حاله بعد حريق في تسعينيات القرن العشرين. تجد فيه السمك والفواكه والخضار والزهور، وحوله أكشاك للحرف اليدوية والسلال والأقمشة. وهو أهدأ من الأسواق الشعبية الكبرى مثل ساندغا، ما يجعله مدخلًا جيدًا للتعرّف إلى المدينة.",
      tips: "ساوم بابتسامة واحذر من الوسطاء المُلحّين حول السوق.",
    },
    "mosquee-de-la-divinite-ouakam": {
      name: "مسجد الألوهية",
      summary: "مسجد أبيض بمئذنتين، يطلّ على المحيط على كورنيش واكام.",
      description:
        "بُني على شاطئ الأطلسي عند سفح منحدرات واكام، ويُعدّ مسجد الألوهية من أكثر مشاهد داكار تصويرًا، بمئذنتيه البيضاوين البارزتين على خلفية المحيط. ولا يزال حي واكام، القرية القديمة لصيادي الليبو، يحتفظ بأجواء القرية داخل العاصمة.",
      tips: "تأمّله من الخارج أو استأذن للدخول، بملابس محتشمة وخارج أوقات الصلاة.",
    },
    "maison-des-esclaves-goree": {
      name: "بيت العبيد",
      summary: "منزل من أواخر القرن الثامن عشر تحوّل إلى نصب تذكاري لتجارة الرقيق، مع «باب اللاعودة».",
      description:
        "بُني بيت العبيد في أواخر القرن الثامن عشر، ويضم في طابقه الأرضي زنازين مظلمة وممرًّا ينفتح على المحيط هو «باب الرحلة بلا عودة». يختلف المؤرخون حول الدور الدقيق لهذا البيت في تجارة الرقيق، لكنه أصبح مكانًا عالميًا للذاكرة، زاره كثير من رؤساء الدول والزوار من أنحاء العالم. لحظة تأمّل عميقة.",
      tips: "تعال باكرًا لتفادي ازدحام المجموعات؛ ويساعدك مرشد محلي على وضع المكان في سياق تاريخ تجارة الرقيق.",
    },
    "musee-historique-goree": {
      name: "المتحف التاريخي للسنغال في غوريه",
      summary: "يقع في حصن ديستريه، ويستعرض تاريخ البلاد من عصور ما قبل التاريخ إلى الاستقلال.",
      description:
        "في الطرف الشمالي للجزيرة، يضم حصن ديستريه، الذي بُني في القرن التاسع عشر، المتحف التاريخي التابع للمعهد الأساسي لأفريقيا السوداء (IFAN). تستعرض قاعاته تاريخ الأراضي السنغالية: ما قبل التاريخ، والممالك الكبرى، والإسلام، وتجارة الرقيق، والاستعمار، والاستقلال. مكمّل جيد لزيارة بيت العبيد.",
    },
    "castel-de-goree": {
      name: "الكاستيل",
      summary: "هضبة صخرية في جنوب الجزيرة، فيها بطاريات مدفعية قديمة وإطلالة على داكار.",
      description:
        "الكاستيل هو أعلى نقطة في الجزيرة، هضبة صخرية تحتفظ بتحصينات وقطع مدفعية قديمة. وكثيرًا ما يعرض فيها الفنانون والحرفيون أعمالهم. يُصعد إليها عبر الأزقّة والدرجات للاستمتاع بالمنظر على الجزيرة والمحيط وأبراج داكار.",
    },
    "lac-retba": {
      name: "بحيرة ريتبا وجمع الملح",
      summary: "مشاهدة جامعي الملح على قواربهم وأكوام الملح البيضاء على ضفة البحيرة.",
      description:
        "في البحيرة، يستخرج رجال ونساء الملح يدويًا من على قوارب البيروغ، ثم يكدّسونه أكوامًا على الضفة؛ ويدهنون جلودهم بزبدة الشيا لحمايتها من الملوحة. تتيح جولة بالقارب مشاهدة هذا العمل عن قرب والإحساس بكثافة الماء.",
      tips: "يكون اللون أوضح قرابة منتصف النهار في موسم الجفاف. تشير France Diplomatie إلى وقوع اعتداءات في هذا الموقع: تجنّب الأماكن المعزولة ولا تبقَ بعد حلول الظلام.",
      bestPeriod: "موسم الجفاف (من نوفمبر إلى يونيو)",
    },
    "dunes-du-lac-rose": {
      name: "كثبان البحيرة الوردية",
      summary: "جولة بسيارة دفع رباعي أو دراجة رباعية أو على ظهر الجمل عبر الكثبان حتى شاطئ المحيط.",
      description:
        "بين البحيرة والأطلسي يمتدّ شريط من الكثبان يُعبر بسيارة دفع رباعي أو دراجة رباعية أو على ظهر الخيل أو الجمل، حتى الشاطئ الطويل لـ«الساحل الكبير». نزهة ممتعة تحبّها العائلات، يمكن الجمع بينها وبين زيارة جامعي الملح.",
      tips: "لا تسبح: البحر على «الساحل الكبير» خطير ونادرًا ما يخضع للمراقبة. اختر مزوّد خدمة موثوقًا واطلب خوذة ومعدّات للدراجة الرباعية.",
    },
    "ile-de-saint-louis": {
      name: "جزيرة سان لوي وجسر فيديرب",
      summary: "نزهة في المدينة التاريخية ذات البيوت المزيّنة بالشرفات، على جانبي جسر فيديرب.",
      description:
        "يقود جسر فيديرب، وهو منشأة معدنية من أواخر القرن التاسع عشر يبلغ طوله نحو 500 متر، إلى الجزيرة المصنّفة. يتجوّل الزائر بين البيوت الاستعمارية ذات الشرفات الخشبية والأفنية الداخلية، والساحات الظليلة، والكاتدرائية والمسجد، والأرصفة على النهر. وفي الجهة المقابلة، على لسان «لانغ دو باربري»، يقدّم حي الصيادين «غيت ندار» مشهدًا مدهشًا للقوارب الملوّنة. وتُعدّ جولة العربة التي تجرّها الخيول طريقة كلاسيكية لاكتشاف المدينة.",
      tips: "استأذن قبل التصوير في غيت ندار، فهو حي سكني ومكان عمل مزدحم جدًا.",
    },
    "thieboudienne-saint-louis": {
      name: "تشيبوجين سان لوي",
      summary: "الطبق الوطني من الأرز بالسمك والخضار، الذي تنسب سان لوي ابتكاره إليها.",
      description:
        "أرز مطهوّ في مرق السمك والطماطم، يُقدَّم مع سمك محشو وخضار (كسافا وملفوف وجزر وباذنجان) وصلصات: التشيبوجين («تشيبو جين» بالولوف) هو الطبق الرمز في السنغال، وقد أُدرج عام 2021 في قائمة التراث الثقافي غير المادي لليونسكو. وتنسب التقاليد ابتكاره إلى سان لوي. يؤكل عند الظهيرة، وغالبًا ما يُتقاسم في صحن كبير مشترك.",
      tips: "يؤكل التشيبوجين أساسًا على الغداء: كثير من المطاعم لا تحضّره في المساء.",
    },
    "parc-national-langue-de-barbarie": {
      name: "متنزّه لانغ دو باربري الوطني",
      summary: "لسان رملي بين النهر والمحيط، ملاذ للطيور يُكتشف بالقارب.",
      description:
        "جنوب سان لوي، لانغ دو باربري شريط رملي ضيّق بين مصبّ نهر السنغال والأطلسي. يحمي المتنزّه الوطني مستعمرات من الطيور (الخطاف البحري والنوارس والبجع والغاق) ومواقع تعشيش السلاحف البحرية. تنطلق رحلات القوارب عادة من غانديول. وقد تغيّر الشريط الرملي تغيّرًا عميقًا بعد فتح ثغرة فيه عام 2003، والتآكل فيه شديد.",
      bestPeriod: "من نوفمبر إلى يونيو",
    },
    "parc-national-oiseaux-djoudj": {
      name: "متنزّه جودج الوطني للطيور",
      summary: "منطقة رطبة مُدرجة في قائمة اليونسكو، من أكبر ملاذات الطيور المهاجرة جنوب الصحراء الكبرى.",
      description:
        "على بُعد نحو 60 كيلومترًا شمال سان لوي، في دلتا نهر السنغال، أُدرج متنزّه جودج في قائمة التراث العالمي لليونسكو منذ عام 1981. تستقبل بحيراته وقنواته ومستنقعات القصب كل شتاء مئات الآلاف من الطيور القادمة من أوروبا، إضافة إلى مستعمرات كبيرة من البجع الأبيض والنحام. وتُعدّ الجولة بالقارب وسط البجع أبرز لحظات الزيارة.",
      tips: "تعال في الصباح الباكر مع منظار وواقٍ من الشمس؛ واستعلم عن حالة الطريق الترابي بعد موسم الأمطار.",
      bestPeriod: "من نوفمبر إلى أبريل (الطيور المهاجرة)",
    },
    "grande-mosquee-touba": {
      name: "الجامع الكبير في طوبى",
      summary: "مسجد ضخم بمئذنة عالية، يضمّ ضريح الشيخ أحمدو بمبا.",
      description:
        "دُشّن الجامع الكبير في طوبى عام 1963 ووُسّع منذ ذلك الحين، ويضمّ بقبابه ورخامه ومئذنته المركزية العالية ضريح الشيخ أحمدو بمبا. ويُسمح عادة لغير المسلمين بزيارته برفقة مرشد من الجماعة، مع الالتزام الصارم بقواعد المكان.",
      tips: "ملابس تغطي الذراعين والساقين، وغطاء رأس للنساء؛ لا كحول ولا سجائر في المدينة. استعن بأحد المرشدين الموجودين في المكان وتجنّب أوقات الصلاة.",
    },
    "grand-magal-de-touba": {
      name: "الماغال الكبير في طوبى",
      summary: "أكبر حجّ في البلاد، إحياءً لذكرى نفي الشيخ أحمدو بمبا.",
      description:
        "في الثامن عشر من شهر صفر من كل عام هجري، يُحيي الماغال الكبير ذكرى رحيل الشيخ أحمدو بمبا إلى المنفى، بعد أن نفته الإدارة الاستعمارية إلى الغابون عام 1895. يتوافد ملايين الحجاج إلى طوبى للصلاة والتأمّل وتقاسم الوجبات المقدّمة مجانًا. ويتقدّم الموعد نحو أحد عشر يومًا كل عام بالنسبة إلى التقويم الميلادي.",
      tips: "تجربة مؤثّرة لكنها شديدة الازدحام: طرق مكتظّة ومن المستحيل إيجاد مكان للإقامة. لزيارتك الأولى لطوبى، اختر وقتًا آخر.",
      bestPeriod: "18 صفر (يتغيّر الموعد حسب التقويم القمري)",
    },
    "plage-de-saly": {
      name: "شاطئ سالي",
      summary: "المنتجع الشاطئي الأكبر في البلاد: فنادق ومطاعم وأنشطة بحرية.",
      description:
        "تتركّز في سالي نسبة كبيرة من العروض الشاطئية في السنغال: فنادق على البحر ومطاعم وملعب غولف وأنشطة بحرية. وإلى الشمال، تقدّم بحيرة سومون الساحلية، بغابات المانغروف وطيورها، بديلًا أكثر هدوءًا يُكتشف بالقارب.",
      tips: "تدعو France Diplomatie إلى الحذر على الساحل من سومون وسالي حتى جوال (اعتداءات وسطو على الفيلات المؤجّرة): اختر مكان إقامة يتوفّر على حراسة وتجنّب الشواطئ المعزولة ليلًا.",
    },
    "reserve-de-bandia": {
      name: "محمية بانديا",
      summary: "محمية للحياة البرية بين أشجار الباوباب: زرافات ووحيد القرن وجواميس وظباء.",
      description:
        "قرب سينديا، على بُعد ساعة تقريبًا من داكار، أعادت محمية بانديا الخاصة إلى سافانا تنتشر فيها أشجار الباوباب أنواعًا اختفت من المنطقة أو جُلبت من بلدان أفريقية أخرى: الزرافات ووحيد القرن والجواميس والحمر الوحشية وعدّة أنواع من الظباء، إلى جانب القرود والسلاحف. تتمّ جولة السفاري بالسيارة برفقة مرشد. مدخل جيد إلى الحياة البرية يمكن إنجازه في نصف يوم.",
    },
    "ile-de-fadiouth": {
      name: "جزيرة فاديوث",
      summary: "جزيرة من الأصداف، يربطها بجوال جسر للمشاة، وفيها مقبرة مشتركة.",
      description:
        "تتصل فاديوث بجوال عبر جسر خشبي طويل للمشاة، وهي جزيرة تتكوّن أرضها من أصداف تراكمت عبر القرون. أزقّة بلا سيارات، ومخازن للدخن على ركائز، وفي جزيرة مجاورة مقبرة يرقد فيها المسيحيون والمسلمون جنبًا إلى جنب، رمزًا للتعايش الديني في السنغال. وجوال هي أيضًا مسقط رأس الشاعر والرئيس ليوبولد سيدار سنغور.",
      tips: "استعن بالمرشدين الرسميين عند مدخل الجسر؛ وعادة ما تُطلب مساهمة.",
    },
    "bolongs-du-saloum": {
      name: "قنوات وجزر سالوم",
      summary: "رحلة بالقارب في غابات المانغروف، بين قرى الجزر والطيور وتلال الأصداف.",
      description:
        "تقود رحلة يوم كامل بالقارب عبر القنوات المحفوفة بأشجار المانغروف إلى قرى الجزر والضفاف الرملية وتلال الأصداف. تُشاهد مالك الحزين والبلشون والبجع، وإن حالفك الحظ الدلافين عند المصبّ. ويحدّد جمع محار المانغروف والصيد إيقاع حياة السكان.",
      tips: "انطلق مع صاحب قارب يوصي به النُّزُل الذي تقيم فيه، مع سترات النجاة وقبعة وماء.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "reserve-de-fathala": {
      name: "محمية فاتالا",
      summary: "محمية للحياة البرية في غابة جافة قرب توباكوتا: زرافات ووحيد القرن وظباء الإيلاند العملاقة.",
      description:
        "جنوب الدلتا، قرب توباكوتا، تشغل محمية فاتالا جزءًا من غابة فاتالا التابعة لمتنزّه دلتا سالوم الوطني. يمكن بالسيارة وبرفقة مرشد مشاهدة الزرافات ووحيد القرن والجواميس والقرود وعدّة أنواع من الظباء، منها ظبي الإيلاند العملاق (إيلاند ديربي) النادر. مكمّل جيد لرحلات القوارب.",
    },
    "plage-de-cap-skirring": {
      name: "شاطئ كاب سكيرينغ",
      summary: "شواطئ طويلة من الرمل الناعم تحفّها أشجار جوز الهند، في نهاية طريق زيغينشور.",
      description:
        "في أقصى جنوب غرب البلاد، تقدّم كاب سكيرينغ شواطئ طويلة من الرمل الفاتح وبساتين جوز الهند وقرى صيادين. وتتيح الفنادق والنُّزُل الإقامة فيها عدّة أيام، بين السباحة وجولات الدراجة إلى القرى المجاورة والسمك المشوي. وتشير France Diplomatie إلى أن المنطقة الفندقية في كاب سكيرينغ لا تمثّل خطرًا خاصًّا.",
      tips: "اسبح قرب الأماكن المرتادة واستعلم عن التيارات قبل النزول إلى الماء.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "ile-de-carabane": {
      name: "جزيرة كارابان",
      summary: "مركز تجاري فرنسي سابق عند مصبّ نهر كازامانس، يُوصَل إليه بالقارب.",
      description:
        "عند مصبّ نهر كازامانس، كانت جزيرة كارابان مركزًا تجاريًا فرنسيًا منذ القرن التاسع عشر. يكتشف الزائر فيها آثار تلك الحقبة (البعثة الكاثوليكية القديمة والكنيسة والمقبرة)، وقرية هادئة بلا سيارات، وشواطئ تحفّها أشجار النخيل. يُوصَل إليها بالقارب، لا سيما من إلينكين أو زيغينشور.",
    },
    "case-a-impluvium-enampore": {
      name: "بيت الفناء المجمِّع للمطر في إينامبور",
      summary: "بيت كبير من الطين لشعب الديولا، يجمع سقفه مياه الأمطار في وسطه.",
      description:
        "المسكن التقليدي لشعب الديولا، وهو بيت دائري واسع من الطوب الطيني، سقفه من القش على شكل قمع يجمع مياه الأمطار في حوض مركزي. كانت عدّة عائلات تعيش حول هذا الفناء الداخلي. في إينامبور، بين زيغينشور وأوسويي، يمكن زيارة أحد هذه البيوت، وهو يستقبل المسافرين أحيانًا. مدخل جميل إلى ثقافة الديولا.",
      tips: "تعال نهارًا من الطريق الرئيسي بين زيغينشور وأوسويي، برفقة مرشد أو سائق محلي.",
    },
  },
  circuits: {
    "senegal-essentiel-8-jours": {
      title: "أساسيات السنغال في 8 أيام",
      summary:
        "من داكار وغوريه إلى البحيرة الوردية، ومن سان لوي وطيور جودج إلى مدينة طوبى المقدسة، ثم استراحة على الساحل الصغير قرب المطار.",
    },
    "senegal-saloum-casamance-6-jours": {
      title: "سين سالوم وكازامانس في 6 أيام",
      summary:
        "فاديوث وغابات المانغروف في سالوم، ثم كازامانس السفلى: زيغينشور وقرى الديولا وكارابان وشواطئ كاب سكيرينغ. تنقّلات نهارية على المحاور الرئيسية، في منطقة يقظة مشدّدة.",
    },
  },
  stepNotes: {
    "senegal-essentiel-8-jours:0": "الوصول والاستقرار وأول تعرّف إلى داكار.",
    "senegal-essentiel-8-jours:2": "غروب الشمس على شبه الجزيرة.",
    "senegal-essentiel-8-jours:3": "عبّارة الصباح إلى غوريه، ويوم كامل على الجزيرة.",
    "senegal-essentiel-8-jours:6": "صباح عند البحيرة الوردية، ثم الطريق نحو سان لوي (نحو 4 ساعات).",
    "senegal-essentiel-8-jours:9": "انطلاق عند الفجر نحو جودج، والعودة إلى سان لوي بعد الظهر.",
    "senegal-essentiel-8-jours:10": "جولة بالقارب صباحًا من غانديول، ثم الطريق نحو طوبى (نحو 4 ساعات).",
    "senegal-essentiel-8-jours:11": "زيارة صباحية، ثم الطريق نحو الساحل الصغير (نحو 3 ساعات).",
    "senegal-essentiel-8-jours:13": "سفاري صباحي، ثم الانتقال إلى مطار بليز ديان القريب.",
    "senegal-saloum-casamance-6-jours:0": "الطريق من داكار إلى جوال (نحو ساعتين ونصف)، ثم نحو الدلتا.",
    "senegal-saloum-casamance-6-jours:1": "يوم كامل بالقارب في الدلتا.",
    "senegal-saloum-casamance-6-jours:2": "سفاري صباحي، ثم العودة نحو داكار لركوب الطائرة أو العبّارة الليلية إلى زيغينشور.",
    "senegal-saloum-casamance-6-jours:3": "الوصول إلى زيغينشور، ثم الطريق نحو كاب سكيرينغ مرورًا بإينامبور وأوسويي.",
    "senegal-saloum-casamance-6-jours:5": "يوم كامل بالقارب انطلاقًا من إلينكين.",
    "senegal-saloum-casamance-6-jours:6": "صباح على الشاطئ، ثم رحلة العودة جوًّا إلى داكار.",
  },
};

export const SENEGAL_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
