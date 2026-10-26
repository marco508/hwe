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
    "thies-grande-cote": {
      name: "Thiès, Tivaouane y la Grande Côte",
      region: "Thiès",
      summary: "Ciudad de los tapices, ciudad santa de los tiyanis, abadía musical, pesca en Kayar y dunas de Lompoul.",
      description:
        "A una hora de Dakar por la autopista, Thiès, histórico nudo ferroviario, es conocida por sus talleres de tapices artísticos. Al norte, Tivaouane es la capital de la cofradía tiyani y acoge cada año el Gamou, mientras que la abadía de Keur Moussa hace sonar la kora en su liturgia. En la Grande Côte, Kayar es uno de los mayores puertos de pesca artesanal del país y, más al norte, entre Dakar y Saint-Louis, las dunas ocres de Lompoul ofrecen un anticipo del Sáhara. Atención: el mar es muy peligroso en toda la Grande Côte.",
    },
    kaolack: {
      name: "Kaolack y los círculos megalíticos",
      region: "Kaolack",
      summary: "Capital de la cuenca del cacahuete, gran centro de la Tiyaniya niasena y puerta de megalitos inscritos por la UNESCO.",
      description:
        "A orillas del Saloum, a unos 190 km al sureste de Dakar, Kaolack es un gran cruce comercial en el corazón de la cuenca del cacahuete, con uno de los grandes mercados del país. El barrio de Médina Baye, fundado por Cheikh Ibrahima Niass, es un centro espiritual de proyección internacional. Al este, hacia Nioro du Rip y Kaffrine, los círculos megalíticos de Sine Ngayène y Wanar, Patrimonio Mundial, figuran entre los conjuntos de piedras erguidas más notables de África.",
    },
    "senegal-oriental": {
      name: "Senegal oriental: Kédougou y Niokolo-Koba",
      region: "Kédougou / Tambacounda",
      summary: "Colinas, cascadas, el país bassari inscrito por la UNESCO y un gran parque nacional de sabana, en el extremo sureste.",
      description:
        "A más de 650 km de Dakar, el sureste contrasta con el resto de Senegal: colinas boscosas, ríos, la cascada de Dindéfelo y pueblos bassari, bedik y fulani encaramados en las estribaciones del Futa Yallon, un paisaje inscrito en el Patrimonio Mundial en 2012. Más al norte, el Parque Nacional de Niokolo-Koba protege una vasta sabana atravesada por el río Gambia. Kédougou sirve de base. France Diplomatie desaconseja, salvo motivo imperativo, las zonas fronterizas con Malí, al este: limítese a los itinerarios al oeste y al sur de Kédougou, de día y con un guía local.",
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
    "musee-theodore-monod-dakar": {
      name: "Museo Théodore Monod de Arte Africano",
      summary: "El museo del IFAN, en la plaza Soweto: máscaras, estatuaria y objetos cotidianos de África Occidental.",
      description:
        "Situado en la plaza Soweto, junto a la Asamblea Nacional, en un edificio de 1931 de estilo neosudanés, el museo del IFAN (Instituto Fundamental de África Negra) es uno de los museos más antiguos de África Occidental. Sus colecciones, de varios miles de piezas, muestran máscaras, estatuillas, instrumentos musicales, textiles y objetos de la vida cotidiana de toda la región. Rebautizado en 2007 en homenaje al naturalista Théodore Monod, acoge también exposiciones de la Bienal de Dakar.",
      tips: "Combine la visita con el cercano Plateau (plaza de la Independencia, catedral, mercado Kermel).",
    },
    "musee-leopold-sedar-senghor-dakar": {
      name: "Museo Léopold Sédar Senghor",
      summary: "La antigua residencia en Dakar del poeta-presidente, abierta al público como casa museo.",
      description:
        "En el barrio residencial de Fann, la casa donde vivió en Dakar Léopold Sédar Senghor, primer presidente de Senegal y poeta de la negritud, se ha convertido en museo. Se descubren su entorno, su mobiliario, su biblioteca, recuerdos de su carrera política y literaria y obras de arte que apreciaba. Una visita íntima, complementaria del Museo de las Civilizaciones Negras.",
    },
    "ile-de-ngor": {
      name: "Isla de Ngor",
      summary: "Pequeña isla a pocos minutos en piragua de la punta de Almadies: calas, baño y surf.",
      description:
        "A unos 400 metros del pueblo lebu de Ngor, en la punta de Almadies, esta pequeña isla volcánica se alcanza en pocos minutos en piragua desde la playa de Ngor. Sin coches, ofrece calas resguardadas para bañarse, senderos entre casas y rocas y, del lado del océano, olas apreciadas por los surfistas desde la película The Endless Summer (1964). Una escapada muy popular entre los dakarenses el fin de semana.",
      tips: "Las piraguas salen de la playa de Ngor: acuerde el precio de ida y vuelta y la hora de regreso antes de embarcar. El fin de semana la isla está muy concurrida.",
      bestPeriod: "Todo el año; mar más tranquilo del lado de la playa",
    },
    "parc-national-iles-de-la-madeleine": {
      name: "Parque Nacional de las Islas de la Madeleine",
      summary: "Pequeño archipiélago volcánico frente a Dakar, refugio de aves marinas, accesible en piragua.",
      description:
        "A pocos kilómetros de la Corniche, las islas de la Madeleine forman uno de los parques nacionales más pequeños del mundo (unas 45 hectáreas), protegido desde 1976. Estos islotes volcánicos deshabitados, de acantilados abruptos y vegetación esteparia, albergan aves marinas como el rabijunco etéreo y baobabs enanos. La visita se hace con los agentes del parque, desde la costa de Dakar, cuando el mar lo permite.",
      tips: "Las salidas dependen del estado del mar: infórmese en el servicio de parques nacionales. Calzado cerrado, agua y sombrero imprescindibles.",
      bestPeriod: "Estación seca, con mar en calma",
    },
    "pointe-des-almadies": {
      name: "Punta y barrio de Almadies",
      summary: "El punto más occidental del continente africano y uno de los barrios más animados de Dakar por la noche.",
      description:
        "Al noroeste de la península de Cabo Verde, la punta de Almadies es el extremo occidental del continente africano: rocas negras azotadas por el océano, puestas de sol y vistas a la isla de Ngor. A su alrededor, Almadies y Ngor concentran restaurantes de pescado y marisco, bares de playa, cafés y salas de conciertos, lo que convierte la zona, junto con el Plateau y el Point E, en uno de los polos de la vida nocturna de Dakar, sobre todo de jueves a sábado.",
      tips: "Por la noche desplácese en taxi en lugar de caminar por las carreteras costeras. El mar es peligroso al pie de las rocas: no se bañe allí.",
    },
    "phare-des-mamelles": {
      name: "Faro de Les Mamelles",
      summary: "Faro de 1864 en lo alto de una colina volcánica, con panorámica sobre toda la península.",
      description:
        "Terminado en 1864 en la más occidental de las dos colinas volcánicas de Les Mamelles, este faro blanco es el más antiguo de Dakar y uno de los más potentes de la costa africana. Se sube a pie por un camino empinado para descubrir una panorámica de 360° sobre Almadies, el océano, el Monumento del Renacimiento Africano y la ciudad. El lugar acoge a veces eventos por la noche.",
      tips: "Suba al final de la tarde para disfrutar de la luz del atardecer; lleve buen calzado.",
    },
    "village-artisanal-soumbedioune": {
      name: "Pueblo artesanal y bahía de Soumbédioune",
      summary: "Talleres de artesanos en la Corniche y regreso de las piraguas de pesca al final de la tarde.",
      description:
        "En la Corniche oeste, el pueblo artesanal de Soumbédioune reúne decenas de puestos: tallistas de madera, joyeros, marroquineros, tejedores y pintores bajo vidrio. Justo al lado, la pequeña bahía de Soumbédioune se anima al final de la tarde con el regreso de las coloridas piraguas, cuando el pescado se vende directamente en la playa. Un buen lugar para recuerdos hechos a mano y una escena de la vida de Dakar.",
      tips: "Recorra las tiendas antes de comprar y regatee con calma. Pida permiso antes de fotografiar a los pescadores.",
    },
    "grande-mosquee-de-dakar": {
      name: "Gran Mezquita de Dakar",
      summary: "Mezquita de estilo hispano-morisco inaugurada en 1964, con un minarete de 67 metros.",
      description:
        "Construida por arquitectos franceses y marroquíes e inaugurada en 1964 en presencia del rey Hassán II y del presidente Senghor, la Gran Mezquita de Dakar destaca por su minarete de 67 metros y su decoración de inspiración arábigo-andalusí. Alberga también el Instituto Islámico de Dakar. El barrio de la Médina, a su alrededor, es uno de los más vivos y populares de la ciudad.",
      tips: "El interior no siempre está abierto a los no musulmanes: infórmese allí mismo, con ropa que cubra y fuera de las horas de oración.",
    },
    "cathedrale-souvenir-africain-dakar": {
      name: "Catedral del Recuerdo Africano",
      summary: "Catedral de Nuestra Señora de las Victorias, consagrada en 1936 en el bulevar de la República.",
      description:
        "La iglesia más grande de Dakar y sede del arzobispado, la catedral de Nuestra Señora de las Victorias, llamada del Recuerdo Africano, fue consagrada en 1936 en el bulevar de la República, en el Plateau. Su fachada con columnas y su cúpula mezclan influencias neobizantinas y sudanesas. Allí se celebraron en 2001 los funerales del presidente Senghor. Las misas del domingo, muy cantadas, merecen la pena.",
      tips: "Se exige vestimenta correcta; manténgase discreto durante los oficios.",
    },
    "mausolee-limamou-laye-yoff": {
      name: "Mezquita y mausoleo de Seydina Limamou Laye (Yoff)",
      summary: "Lugar central de la cofradía layene, frente al océano, en el antiguo pueblo lebu de Yoff.",
      description:
        "En Yoff, antiguo pueblo de pescadores lebu hoy integrado en Dakar, el mausoleo de Seydina Limamou Laye, fundador de la cofradía sufí layene fallecido en 1909, es un lugar de peregrinación muy venerado, orientado hacia el océano. Los fieles, a menudo vestidos de blanco, vienen a rezar, sobre todo con motivo del aniversario de la Llamada. El barrio de Yoff Layène, con sus playas de piraguas, conserva una fuerte identidad comunitaria.",
      tips: "Ropa que cubra y actitud discreta; pida permiso antes de cualquier foto y no entre en los espacios de oración sin ser invitado.",
    },
    "arene-nationale-de-lutte-pikine": {
      name: "Arena Nacional de Lucha",
      summary: "El templo de la lucha senegalesa con golpes: combates, tambores y rituales de los luchadores.",
      description:
        "En Pikine, en las afueras de Dakar, la Arena Nacional, con capacidad para unas 20 000 personas, acoge los grandes combates de lucha con golpes (laamb), el deporte nacional. Mucho antes del combate el ambiente se caldea: tambores, cantos de los griots, danzas y rituales místicos de los luchadores rodeados de sus marabouts. Los grandes carteles, anunciados con semanas de antelación, atraen multitudes y se retransmiten por televisión.",
      tips: "Compre las entradas con antelación para los grandes combates, llegue temprano y vaya con un conocedor. Multitud muy densa: mantenga sus pertenencias cerca.",
      bestPeriod: "Temporada de combates, sobre todo en la estación seca",
    },
    "place-de-l-independance-dakar": {
      name: "Plaza de la Independencia y el Plateau",
      summary: "El corazón administrativo de Dakar: gran plaza, edificios coloniales, palacio presidencial y estación restaurada.",
      description:
        "Amplia explanada del Plateau, la plaza de la Independencia está rodeada de edificios de los siglos XIX y XX, entre ellos la Cámara de Comercio. Un corto paseo lleva al palacio de la República y sus jardines blancos, a la catedral del Recuerdo Africano y al mercado Kermel, y luego a la estación de Dakar, edificio de 1914 restaurado que hoy es la terminal del TER. Un buen recorrido para leer la historia de la ciudad, de capital del África Occidental Francesa hasta hoy.",
      tips: "No fotografíe el palacio presidencial ni a los militares de guardia. El Plateau se visita preferentemente entre semana y de día.",
    },
    "village-des-arts-dakar": {
      name: "Village des Arts de Dakar",
      summary: "Talleres y galerías de artistas contemporáneos, cerca del estadio Léopold Sédar Senghor.",
      description:
        "En la carretera del aeropuerto, cerca del estadio Léopold Sédar Senghor, el Village des Arts reúne en un mismo recinto decenas de talleres de pintores, escultores, ceramistas y artistas plásticos, además de una galería. Se puede ver a los artistas trabajando, descubrir la creación contemporánea senegalesa y comprar obras directamente. El lugar participa en el programa paralelo de la Bienal de Dakar.",
      tips: "No todos los artistas están presentes cada día: prefiera una visita entre semana, al final de la mañana.",
    },
    "marche-hlm-dakar": {
      name: "Mercado HLM",
      summary: "El gran mercado de telas de Dakar: wax, bazin, bordados y sastres a pleno rendimiento.",
      description:
        "En el barrio de los HLM, este mercado es la referencia de Dakar para las telas: montones de wax estampado, bazin teñido y abrillantado, gasas, encajes e hilos de bordar. Alrededor, los sastres confeccionan en pocos días bubús, camisas o vestidos a medida. Muy animado antes de las grandes fiestas (Korité, Tabaski), cuando todo el mundo encarga su traje nuevo.",
      tips: "Venga por la mañana, más tranquila; prevea tiempo para regatear y para las pruebas si encarga una prenda.",
    },
    "eglise-saint-charles-borromee-goree": {
      name: "Iglesia de San Carlos Borromeo",
      summary: "Iglesia de 1830 de muros ocres, uno de los edificios católicos más antiguos del país.",
      description:
        "Terminada en 1830, dos años después de la catedral de Saint-Louis, la iglesia de San Carlos Borromeo es uno de los lugares de culto católicos más antiguos de África Occidental. Su fachada neoclásica de tonos ocres y su pequeño campanario se alzan cerca del embarcadero, entre las casas coloniales. Recuerda la antigua presencia en la isla de una comunidad cristiana, en particular mestiza.",
      tips: "Vestimenta correcta; la iglesia no siempre está abierta fuera de los oficios.",
    },
    "cathedrale-saint-louis-du-senegal": {
      name: "Catedral de Saint-Louis",
      summary: "Consagrada en 1828, la iglesia más antigua de África Occidental, reabierta tras su restauración.",
      description:
        "En la plaza de Armas, al sur de la isla, la catedral de Saint-Louis fue consagrada en 1828, lo que la convierte en la iglesia más antigua de África Occidental. Su fachada con frontón y columnas, flanqueada por dos campanarios, domina el barrio sur. Cerrada en 2005 por amenaza de ruina, fue restaurada por completo y reabrió sus puertas a finales de 2020.",
      tips: "Vestimenta correcta; visitas fuera de los oficios.",
    },
    "grande-mosquee-saint-louis-senegal": {
      name: "Gran Mezquita de Saint-Louis",
      summary: "Mezquita del siglo XIX en el norte de la isla, reconocible por su reloj.",
      description:
        "En el norte de la isla de Saint-Louis, frente al brazo pequeño del río, la Gran Mezquita es uno de los lugares de culto musulmanes más antiguos de la ciudad colonial; su fachada combina minaretes y un reloj, singularidad arquitectónica que intriga a los visitantes. Mira hacia el barrio de pescadores de Guet Ndar y recuerda el lugar del islam en la historia de la ciudad.",
      tips: "Admírela desde fuera; para entrar, pida permiso, con ropa que cubra y fuera de las horas de oración.",
    },
    "reserve-de-guembeul": {
      name: "Reserva Especial de Fauna de Guembeul",
      summary: "Laguna y sabana valladas al sur de Saint-Louis: gacelas dama, tortugas de espolones y aves acuáticas.",
      description:
        "A unos 5 km al sur de Saint-Louis, en la carretera de Gandiol, la reserva de Guembeul (unas 720 hectáreas, sitio Ramsar) protege una laguna salada rodeada de sabana saheliana. Sirve de centro de reintroducción de especies amenazadas del Sahel, como la gacela dama, la gacela dorcas, el órix de cimitarra y la tortuga de espolones, y acoge numerosas aves acuáticas. Una visita fácil de combinar con la Langue de Barbarie.",
      tips: "Visita a pie o en vehículo con un guía de la reserva; venga temprano por la mañana o al final de la tarde, con prismáticos.",
      bestPeriod: "De noviembre a abril",
    },
    "cafe-touba": {
      name: "El café Touba",
      summary: "Café especiado con pimienta de Guinea (djar), bebida emblemática ligada a la ciudad santa.",
      description:
        "El café Touba es un café tostado con djar, la pimienta de Guinea (semillas de Xylopia), que le da un sabor picante y ligeramente alcanforado. La tradición lo asocia a Cheikh Ahmadou Bamba y a la ciudad de Touba, de ahí su nombre. Servido muy dulce en vasitos, se bebe a cualquier hora, vendido por vendedores ambulantes y en quioscos de todo el país.",
      tips: "Pruébelo a un vendedor callejero por la mañana, con un trozo de pan: es el desayuno de muchos senegaleses.",
    },
    "sanctuaire-marial-popenguine": {
      name: "Santuario mariano de Popenguine",
      summary: "Basílica de Nuestra Señora de la Délivrande y gran santuario nacional, escenario de la peregrinación de Pentecostés.",
      description:
        "Fundado a finales del siglo XIX por misioneros espiritanos, el santuario de Popenguine alberga una Virgen negra en la basílica de Nuestra Señora de la Délivrande, elevada a basílica menor por Juan Pablo II antes de su visita de 1992. Un amplio conjunto, inaugurado en diciembre de 2023 como santuario nacional, incluye una réplica de la gruta de Lourdes y un gran edificio con decenas de miles de plazas. Cada lunes de Pentecostés acoge la mayor peregrinación católica del país.",
      tips: "Fuera de la peregrinación el lugar es tranquilo; vestimenta correcta. El fin de semana de Pentecostés la carretera y el pueblo están saturados.",
    },
    "reserve-naturelle-popenguine": {
      name: "Reserva Natural de Popenguine",
      summary: "Acantilados, sabana restaurada y vistas a la Petite Côte, gestionados con las mujeres del pueblo.",
      description:
        "Creada en 1986 sobre unas 1000 hectáreas, la reserva natural de Popenguine protege colinas y acantilados que dominan el océano, entre ellos el cabo de Naze, punto culminante de la Petite Côte. Este medio, muy degradado por la deforestación y las sequías, se restauró con el apoyo de una asociación de mujeres del pueblo creada en 1988, ejemplo citado a menudo de conservación comunitaria. Senderos, aves, antiguas obras militares y panorámicas sobre la costa.",
      tips: "Salga a caminar temprano por la mañana con agua y sombrero; pida un guía en la entrada de la reserva.",
    },
    "plage-des-pecheurs-mbour": {
      name: "Playa de los pescadores de Mbour",
      summary: "Uno de los grandes puertos de pesca artesanal del país: regreso de las piraguas y mercado de pescado.",
      description:
        "Mbour, principal ciudad de la Petite Côte, vive al ritmo de la pesca artesanal. Al final de la tarde, cientos de piraguas pintadas regresan a la playa: el pescado se descarga a hombros, se clasifica, se subasta y luego se ahúma o se seca allí mismo. Un espectáculo impresionante, ruidoso y muy fotogénico, a pocos minutos de Saly.",
      tips: "Suelo resbaladizo y olores fuertes: se recomienda calzado cerrado. Pida permiso antes de fotografiar y manténgase alejado de las zonas de descarga.",
    },
    "toubab-dialaw": {
      name: "Toubab Dialaw",
      summary: "Pueblo de pescadores al pie de acantilados ocres, refugio de artistas y bailarines.",
      description:
        "En el extremo norte de la Petite Côte, a una hora aproximadamente de Dakar, Toubab Dialaw es un pueblo de pescadores apoyado en acantilados de laterita roja, junto a una playa llena de piraguas. Atrae desde hace tiempo a artistas, músicos y bailarines: hay lugares de creación y de formación en danza africana contemporánea. Una etapa tranquila, lejos de las grandes estaciones.",
      tips: "El baño es posible con mar en calma, pero infórmese sobre las corrientes; respete la tranquilidad del pueblo.",
    },
    "ile-de-mar-lodj": {
      name: "Isla de Mar Lodj",
      summary: "Isla sin coches del Saloum, entre palmeras de rônier, manglar y pueblos serer, frente a Ndangane.",
      description:
        "Accesible en pocos minutos en piragua desde el embarcadero de Ndangane, la isla de Mar alberga los pueblos de Mar Lodj, Mar Fafaco y Mar Soulou, con unos 5000 habitantes. Pistas de arena bordeadas de palmeras de rônier, ceibas y mangos, manglar, pozos y campos: se descubre la vida de las islas del Saloum a pie, en bicicleta o en carreta. Musulmanes y cristianos conviven, con cementerios y lugares de culto vecinos.",
      tips: "Organice la travesía con su campamento o con un piraguero de Ndangane; lleve una linterna, el alumbrado público es limitado.",
      bestPeriod: "De noviembre a mayo",
    },
    "palmarin-saloum": {
      name: "Palmarin y sus lagunas",
      summary: "Pueblos serer entre el océano, palmerales y llanuras saladas, a la entrada de la punta de Sangomar.",
      description:
        "Al norte del delta, Palmarin alinea varios pueblos serer en una estrecha franja de tierra entre el océano y las lagunas, al comienzo de la punta de Sangomar. Palmerales, manglar, tannes (llanuras saladas) y salinas artesanales forman paisajes abiertos donde se observan numerosas aves. Una base tranquila para explorar el Saloum en piragua o en bicicleta.",
      tips: "Los campamentos organizan salidas en piragua y paseos; respete los lugares sagrados que indiquen los habitantes.",
      bestPeriod: "De noviembre a mayo",
    },
    "vieille-ville-ziguinchor": {
      name: "Ziguinchor, ciudad colonial y muelles del río",
      summary: "La capital de Casamance: barrios coloniales, puerto fluvial y mercados animados.",
      description:
        "Fundada por los portugueses en el siglo XVII y cedida a Francia en 1886, Ziguinchor se extiende por la orilla sur del río Casamance. El centro conserva edificios coloniales de fachadas coloridas, calles a la sombra de mangos y muelles de donde salen piraguas y el barco de Dakar. Mercados, talleres artesanos y comida callejera la convierten en una etapa animada antes de salir hacia Oussouye o Cap Skirring.",
      tips: "Zona de vigilancia reforzada según France Diplomatie: circule de día, por los ejes principales, y evite las zonas forestales de la periferia (en particular el bosque de Bayot).",
    },
    "royaume-d-oussouye": {
      name: "Oussouye y su reino diola",
      summary: "Pequeña ciudad en el corazón de un reino diola tradicional, con su rey, sus bosques sagrados y sus arrozales.",
      description:
        "Oussouye es el centro de un reino diola cuyo rey desempeña un papel espiritual y social: guardián de las tradiciones, de los bosques sagrados y de la paz entre los pueblos, no tiene poder político. Alrededor de la ciudad, arrozales, ceibas gigantes y pueblos de casas de adobe componen uno de los paisajes más bellos de Casamance. Con un guía local, a veces es posible ser recibido en la corte real, respetando los usos.",
      tips: "Una visita al rey no se improvisa: recurra a un guía de Oussouye, infórmese sobre el protocolo y no haga fotos sin permiso. No entre nunca en un bosque sagrado.",
    },
    "cases-a-etage-mlomp": {
      name: "Casas de dos plantas de Mlomp",
      summary: "Raras casas diola de adobe con piso superior, bajo enormes ceibas, entre Oussouye y Elinkine.",
      description:
        "El pueblo de Mlomp, en la carretera de Oussouye a Elinkine, es conocido por sus casas de dos plantas, grandes viviendas de banco (tierra cruda) con un piso superior, raras en África Occidental, así como por sus ceibas monumentales. Algunas casas pueden visitarse con sus habitantes, que explican las técnicas de construcción y la vida diola. Una parada fácil en el camino a Carabane.",
      tips: "Suele pedirse una pequeña contribución por la visita; quédese en el eje principal y viaje de día.",
    },
    "poulet-yassa-casamance": {
      name: "El yassa, plato nacido en Casamance",
      summary: "Pollo o pescado marinado con limón y cebolla pochada, servido con arroz blanco.",
      description:
        "Originario de Casamance, el yassa se ha convertido en uno de los platos más populares de Senegal: pollo (o pescado) marinado en zumo de limón, asado y luego cocido a fuego lento en una salsa de cebollas largamente pochadas, sazonada con mostaza y guindilla, y servido con arroz blanco. En Casamance también se prepara con ostras de manglar.",
      tips: "Pida «yassa poulet» o «yassa poisson» en los comedores populares; la guindilla suele servirse aparte.",
    },
    "manufactures-arts-decoratifs-thies": {
      name: "Manufacturas Senegalesas de Artes Decorativas (MSAD)",
      summary: "Taller de tapices artísticos creado en 1966 por iniciativa de Senghor: telares y obras monumentales.",
      description:
        "Fundadas en Thiès en 1966 por iniciativa de Léopold Sédar Senghor, en el impulso de la Escuela de Dakar, las Manufacturas Senegalesas de Artes Decorativas tejen a mano tapices a partir de cartones de artistas senegaleses. Los primeros tejedores se formaron en la manufactura de los Gobelinos, en París. Una sala de exposición presenta obras de colores vivos y a menudo es posible observar a los tejedores trabajando.",
      tips: "Infórmese con antelación sobre las posibilidades de visitar los talleres; los tapices se venden por encargo.",
    },
    "grande-mosquee-tivaouane": {
      name: "Gran Mezquita y ciudad religiosa de Tivaouane",
      summary: "Capital espiritual de la Tiyaniya en Senegal, en torno a los mausoleos de El Hadji Malick Sy.",
      description:
        "Tivaouane es el gran centro de la cofradía sufí tiyani en Senegal desde que El Hadji Malick Sy se instaló allí a principios del siglo XX. Alrededor de la Gran Mezquita se alzan los mausoleos de sus descendientes y las residencias de la familia religiosa. Cada año la ciudad acoge el Gamou, la celebración del nacimiento del Profeta, que reúne multitudes inmensas.",
      tips: "Ropa que cubra y pañuelo para las mujeres; venga fuera del Gamou para una visita tranquila, acompañado de una persona de la comunidad.",
    },
    "abbaye-de-keur-moussa": {
      name: "Abadía de Keur Moussa",
      summary: "Monasterio benedictino célebre por su liturgia acompañada con kora.",
      description:
        "Fundada en 1961 por monjes procedentes de la abadía de Solesmes e inaugurada en 1963, la abadía benedictina de Keur Moussa, entre Dakar y Thiès, es conocida por haber adaptado la liturgia a los instrumentos y melodías de África Occidental: los oficios se cantan al son de la kora y el balafón. Los monjes fabrican también koras y venden en la tienda productos de su huerto, como mermeladas.",
      tips: "La misa dominical, muy concurrida, es el mejor momento para escuchar la kora; llegue con antelación y manténgase discreto durante los oficios.",
    },
    "plage-de-kayar": {
      name: "Playa de los pescadores de Kayar",
      summary: "Gran puerto de pesca artesanal de la Grande Côte: cientos de piraguas y mercado de pescado.",
      description:
        "A unos sesenta kilómetros al norte de Dakar, Kayar es uno de los principales centros de pesca artesanal de Senegal. En la larga playa, cientos de piraguas de colores se arrastran sobre la arena; al final del día, el desembarco y la venta del pescado generan una efervescencia espectacular. El cañón submarino frente a la costa, muy rico en peces, explica la importancia del puerto.",
      tips: "No se bañe: el mar es peligroso en la Grande Côte. Pida permiso antes de fotografiar y manténgase alejado de las piraguas durante las maniobras.",
    },
    "desert-de-lompoul": {
      name: "Desierto de Lompoul",
      summary: "Pequeño desierto de dunas ocres a pocos kilómetros del océano, entre Dakar y Saint-Louis.",
      description:
        "En la región de Louga, entre Kébémer y Lompoul-sur-Mer, el desierto de Lompoul cubre unos 18 km² de dunas de arena fina en tonos ocres y anaranjados, a veces de varias decenas de metros de altura. Se viene a pasar una noche en tienda nómada, a dar un paseo en dromedario y a ver la puesta de sol sobre las dunas. Una etapa apreciada en la carretera de Saint-Louis.",
      tips: "Lleve una chaqueta para la noche, fresca en la estación seca; reserve su campamento con antelación y proteja sus aparatos de la arena.",
      bestPeriod: "De noviembre a mayo",
    },
    "grande-mosquee-medina-baye-kaolack": {
      name: "Gran Mezquita de Médina Baye",
      summary: "El santuario de Cheikh Ibrahima Niass, centro de la Tiyaniya seguido por fieles de toda África.",
      description:
        "En el barrio de Médina Baye, en Kaolack, la Gran Mezquita alberga el mausoleo de Cheikh Ibrahima Niass (1900-1975), llamado Baye Niass, figura mayor de la cofradía tiyani cuyo movimiento cuenta con millones de discípulos en Nigeria, Ghana, Níger y más allá. El barrio vive al ritmo de las oraciones, la enseñanza coránica y los visitantes llegados de toda África Occidental, sobre todo durante el Gamou.",
      tips: "Ropa que cubra y pañuelo para las mujeres; pida ir acompañado de una persona de la comunidad y evite las horas de oración.",
    },
    "cercles-megalithiques-sine-ngayene": {
      name: "Círculos megalíticos de Sine Ngayène y Wanar",
      summary: "Decenas de círculos de piedras erguidas de más de mil años, inscritos en el Patrimonio Mundial.",
      description:
        "Los círculos megalíticos de Senegambia, inscritos en el Patrimonio Mundial de la UNESCO en 2006, agrupan más de mil monumentos a lo largo del río Gambia. Del lado senegalés, Sine Ngayène (52 círculos, cerca de Nioro du Rip) y Wanar (21 círculos, cerca de Kaffrine) alinean piedras de laterita talladas de unos dos metros de altura, erigidas sobre sepulturas aproximadamente entre los siglos VII y XV.",
      tips: "Los sitios están aislados: venga de día con conductor, agua y sombrero. No mueva las piedras ni se suba a ellas.",
      bestPeriod: "De noviembre a mayo",
    },
    "pays-bassari-kedougou": {
      name: "País Bassari: paisajes culturales bassari, fulani y bedik",
      summary: "Pueblos encaramados, terrazas y ritos de iniciación vivos, inscritos en el Patrimonio Mundial de la UNESCO.",
      description:
        "En torno a Bandafassi, Salémata y Éthiolo, los bassari, los bedik y los fulani han modelado paisajes de colinas salpicados de pueblos de chozas redondas con techo de paja, campos en terrazas y lugares sagrados. Estos paisajes culturales, donde se mantienen ritos de iniciación y ceremonias de máscaras, están inscritos en el Patrimonio Mundial desde 2012. El pueblo bedik de Iwol, encaramado en una colina y dominado por una ceiba gigante, es una de las visitas más populares.",
      tips: "Vaya con un guía de Kédougou o de Bandafassi, pida siempre permiso al jefe del pueblo y antes de cada foto; lleve buen calzado para las subidas.",
      bestPeriod: "De noviembre a mayo",
    },
    "cascade-de-dindefelo": {
      name: "Cascada de Dindéfelo",
      summary: "Salto de agua de un centenar de metros al fondo de una garganta boscosa, cerca de la frontera guineana.",
      description:
        "Cerca del pueblo de Dindéfelo, al sur de Kédougou, un corto paseo por un bosque de galería lleva a una caída de unos 100 metros que se precipita en una poza donde es posible bañarse. El sitio, protegido y gestionado por la comunidad del pueblo, alberga también una población de chimpancés seguida por programas de conservación.",
      tips: "El caudal es más espectacular al final de la estación de lluvias (septiembre-noviembre), cuando las pistas pueden ser difíciles. Se cobra una entrada comunitaria.",
      bestPeriod: "De octubre a enero",
    },
    "parc-national-niokolo-koba": {
      name: "Parque Nacional de Niokolo-Koba",
      summary: "El mayor parque del país, inscrito por la UNESCO: sabana, bosques de galería y río Gambia.",
      description:
        "Parque nacional desde 1954 y Patrimonio Mundial y reserva de la biosfera desde 1981, Niokolo-Koba cubre cerca de un millón de hectáreas de sabanas, bosques de galería y charcas a lo largo del río Gambia. Se pueden observar antílopes, facóqueros, monos, hipopótamos, cocodrilos y numerosas aves; los grandes depredadores son escasos y discretos. Inscrito en la lista del Patrimonio en peligro en 2007, salió de ella en 2024 gracias a la mejora de su conservación.",
      tips: "Visita en 4x4 con un guía autorizado, desde Tambacounda o Kédougou; la mayoría de las pistas son impracticables en la estación de lluvias.",
      bestPeriod: "De diciembre a mayo",
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
    "thies-grande-cote": {
      name: "Thiès, Tivaouane e a Grande Côte",
      region: "Thiès",
      summary: "Cidade das tapeçarias, cidade santa dos tijanis, abadia musical, pesca em Kayar e dunas de Lompoul.",
      description:
        "A uma hora de Dacar pela autoestrada, Thiès, histórico entroncamento ferroviário, é conhecida pelas suas oficinas de tapeçaria artística. A norte, Tivaouane é a capital da confraria tijani e acolhe todos os anos o Gamou, enquanto a abadia de Keur Moussa faz soar a kora na sua liturgia. Na Grande Côte, Kayar é um dos maiores portos de pesca artesanal do país e, mais a norte, entre Dacar e Saint-Louis, as dunas ocre de Lompoul dão um antegosto do Sara. Atenção: o mar é muito perigoso em toda a Grande Côte.",
    },
    kaolack: {
      name: "Kaolack e os círculos megalíticos",
      region: "Kaolack",
      summary: "Capital da bacia do amendoim, grande centro da Tijaniyya niassena e porta de megálitos classificados pela UNESCO.",
      description:
        "Nas margens do Saloum, a cerca de 190 km a sudeste de Dacar, Kaolack é um grande cruzamento comercial no coração da bacia do amendoim, com um dos grandes mercados do país. O bairro de Médina Baye, fundado por Cheikh Ibrahima Niass, é um centro espiritual com projeção internacional. A leste, em direção a Nioro du Rip e Kaffrine, os círculos megalíticos de Sine Ngayène e Wanar, Património Mundial, contam-se entre os conjuntos de pedras erguidas mais notáveis de África.",
    },
    "senegal-oriental": {
      name: "Senegal oriental: Kédougou e Niokolo-Koba",
      region: "Kédougou / Tambacounda",
      summary: "Colinas, cascatas, o país bassari classificado pela UNESCO e um grande parque nacional de savana, no extremo sudeste.",
      description:
        "A mais de 650 km de Dacar, o sudeste contrasta com o resto do Senegal: colinas arborizadas, rios, a cascata de Dindéfelo e aldeias bassari, bedik e fulas empoleiradas nos contrafortes do Futa Jalom, uma paisagem inscrita no Património Mundial em 2012. Mais a norte, o Parque Nacional de Niokolo-Koba protege uma vasta savana atravessada pelo rio Gâmbia. Kédougou serve de base. A France Diplomatie desaconselha, salvo motivo imperativo, as zonas fronteiriças com o Mali, a leste: mantenha-se nos itinerários a oeste e a sul de Kédougou, de dia e com um guia local.",
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
    "musee-theodore-monod-dakar": {
      name: "Museu Théodore Monod de Arte Africana",
      summary: "O museu do IFAN, na praça Soweto: máscaras, estatuária e objetos do quotidiano da África Ocidental.",
      description:
        "Instalado na praça Soweto, junto à Assembleia Nacional, num edifício de 1931 de estilo neossudanês, o museu do IFAN (Instituto Fundamental da África Negra) é um dos museus mais antigos da África Ocidental. As suas coleções, com vários milhares de peças, apresentam máscaras, estatuetas, instrumentos musicais, têxteis e objetos da vida quotidiana de toda a região. Rebatizado em 2007 em homenagem ao naturalista Théodore Monod, acolhe também exposições da Bienal de Dacar.",
      tips: "Combine a visita com o vizinho Plateau (praça da Independência, catedral, mercado Kermel).",
    },
    "musee-leopold-sedar-senghor-dakar": {
      name: "Museu Léopold Sédar Senghor",
      summary: "A antiga residência em Dacar do poeta-presidente, aberta ao público como casa-museu.",
      description:
        "No bairro residencial de Fann, a casa onde viveu em Dacar Léopold Sédar Senghor, primeiro presidente do Senegal e poeta da negritude, tornou-se um museu. Descobre-se o seu ambiente, o mobiliário, a biblioteca, recordações da carreira política e literária e obras de arte que apreciava. Uma visita intimista, complementar ao Museu das Civilizações Negras.",
    },
    "ile-de-ngor": {
      name: "Ilha de Ngor",
      summary: "Pequena ilha a poucos minutos de piroga da ponta das Almadies: enseadas, banhos e surf.",
      description:
        "A cerca de 400 metros da aldeia lebu de Ngor, na ponta das Almadies, esta pequena ilha vulcânica alcança-se em poucos minutos de piroga a partir da praia de Ngor. Sem carros, oferece enseadas abrigadas para banhos, caminhos entre casas e rochedos e, do lado do oceano, ondas apreciadas pelos surfistas desde o filme The Endless Summer (1964). Uma escapadela muito apreciada pelos habitantes de Dacar ao fim de semana.",
      tips: "As pirogas partem da praia de Ngor: combine o preço de ida e volta e a hora do regresso antes de embarcar. Ao fim de semana a ilha está muito movimentada.",
      bestPeriod: "Todo o ano; mar mais calmo do lado da praia",
    },
    "parc-national-iles-de-la-madeleine": {
      name: "Parque Nacional das Ilhas da Madeleine",
      summary: "Pequeno arquipélago vulcânico ao largo de Dacar, refúgio de aves marinhas, acessível de piroga.",
      description:
        "A poucos quilómetros da Corniche, as ilhas da Madeleine formam um dos mais pequenos parques nacionais do mundo (cerca de 45 hectares), protegido desde 1976. Estes ilhéus vulcânicos desabitados, de falésias abruptas e vegetação de estepe, abrigam aves marinhas como o rabo-de-palha-de-bico-vermelho e embondeiros anões. A visita faz-se com os agentes do parque, a partir da costa de Dacar, quando o mar o permite.",
      tips: "As saídas dependem do estado do mar: informe-se junto do serviço de parques nacionais. Calçado fechado, água e chapéu indispensáveis.",
      bestPeriod: "Estação seca, com mar calmo",
    },
    "pointe-des-almadies": {
      name: "Ponta e bairro das Almadies",
      summary: "O ponto mais ocidental do continente africano e um dos bairros mais animados de Dacar à noite.",
      description:
        "No noroeste da península de Cabo Verde, a ponta das Almadies é a extremidade ocidental do continente africano: rochas negras fustigadas pelo oceano, pores do sol e vista para a ilha de Ngor. À volta, as Almadies e Ngor concentram restaurantes de peixe e marisco, bares de praia, cafés e salas de concerto, o que faz da zona, a par do Plateau e do Point E, um dos polos da vida noturna de Dacar, sobretudo de quinta a sábado.",
      tips: "À noite desloque-se de táxi em vez de caminhar pelas estradas costeiras. O mar é perigoso junto às rochas: não tome banho ali.",
    },
    "phare-des-mamelles": {
      name: "Farol das Mamelles",
      summary: "Farol de 1864 no cimo de uma colina vulcânica, com panorama sobre toda a península.",
      description:
        "Concluído em 1864 na mais ocidental das duas colinas vulcânicas das Mamelles, este farol branco é o mais antigo de Dacar e um dos mais potentes da costa africana. Sobe-se a pé por um caminho íngreme até um panorama de 360° sobre as Almadies, o oceano, o Monumento do Renascimento Africano e a cidade. O local acolhe por vezes eventos ao fim do dia.",
      tips: "Suba ao fim da tarde para apanhar a luz do pôr do sol; leve bom calçado.",
    },
    "village-artisanal-soumbedioune": {
      name: "Aldeia artesanal e baía de Soumbédioune",
      summary: "Oficinas de artesãos na Corniche e regresso das pirogas de pesca ao fim da tarde.",
      description:
        "Na Corniche oeste, a aldeia artesanal de Soumbédioune reúne dezenas de bancas: escultores em madeira, joalheiros, artesãos do couro, tecelões e pintores de vidro. Mesmo ao lado, a pequena baía de Soumbédioune anima-se ao fim da tarde com o regresso das pirogas coloridas, quando o peixe é vendido diretamente na praia. Um bom sítio para lembranças feitas à mão e uma cena da vida de Dacar.",
      tips: "Percorra as lojas antes de comprar e negoceie com calma. Peça autorização antes de fotografar os pescadores.",
    },
    "grande-mosquee-de-dakar": {
      name: "Grande Mesquita de Dacar",
      summary: "Mesquita de estilo hispano-mourisco inaugurada em 1964, com um minarete de 67 metros.",
      description:
        "Construída por arquitetos franceses e marroquinos e inaugurada em 1964 na presença do rei Hassan II e do presidente Senghor, a Grande Mesquita de Dacar destaca-se pelo minarete de 67 metros e pela decoração de inspiração árabe-andaluza. Alberga também o Instituto Islâmico de Dacar. O bairro da Médina, em redor, é um dos mais vivos e populares da cidade.",
      tips: "O interior nem sempre está aberto a não muçulmanos: informe-se no local, com roupa que cubra e fora das horas de oração.",
    },
    "cathedrale-souvenir-africain-dakar": {
      name: "Catedral da Memória Africana",
      summary: "Catedral de Nossa Senhora das Vitórias, consagrada em 1936 no boulevard de la République.",
      description:
        "A maior igreja de Dacar e sede da arquidiocese, a catedral de Nossa Senhora das Vitórias, dita da Memória Africana, foi consagrada em 1936 no boulevard de la République, no Plateau. A fachada com colunas e a cúpula misturam influências neobizantinas e sudanesas. Ali se celebraram em 2001 as exéquias do presidente Senghor. As missas de domingo, muito cantadas, merecem a visita.",
      tips: "Exige-se vestuário adequado; mantenha-se discreto durante as celebrações.",
    },
    "mausolee-limamou-laye-yoff": {
      name: "Mesquita e mausoléu de Seydina Limamou Laye (Yoff)",
      summary: "Lugar central da confraria layène, virado para o oceano, na antiga aldeia lebu de Yoff.",
      description:
        "Em Yoff, antiga aldeia de pescadores lebu hoje integrada em Dacar, o mausoléu de Seydina Limamou Laye, fundador da confraria sufi layène falecido em 1909, é um local de peregrinação muito venerado, virado para o oceano. Os fiéis, muitas vezes vestidos de branco, vêm aqui rezar, sobretudo no aniversário do Apelo. O bairro de Yoff Layène, com as suas praias de pirogas, mantém uma forte identidade comunitária.",
      tips: "Roupa que cubra e atitude discreta; peça autorização antes de qualquer fotografia e não entre nos espaços de oração sem ser convidado.",
    },
    "arene-nationale-de-lutte-pikine": {
      name: "Arena Nacional de Luta",
      summary: "O templo da luta senegalesa com golpes: combates, tambores e rituais dos lutadores.",
      description:
        "Em Pikine, nos subúrbios de Dacar, a Arena Nacional, com capacidade para cerca de 20 000 pessoas, acolhe os grandes combates de luta com golpes (laamb), o desporto nacional. Muito antes do combate o ambiente aquece: tambores, cantos dos griôs, danças e rituais místicos dos lutadores rodeados pelos seus marabus. Os grandes cartazes, anunciados com semanas de antecedência, atraem multidões e são transmitidos na televisão.",
      tips: "Compre os bilhetes com antecedência para os grandes combates, chegue cedo e vá com um conhecedor. Multidão muito densa: mantenha os seus pertences por perto.",
      bestPeriod: "Época de combates, sobretudo na estação seca",
    },
    "place-de-l-independance-dakar": {
      name: "Praça da Independência e o Plateau",
      summary: "O coração administrativo de Dacar: grande praça, edifícios coloniais, palácio presidencial e estação restaurada.",
      description:
        "Vasta esplanada do Plateau, a praça da Independência é ladeada por edifícios dos séculos XIX e XX, entre eles a Câmara de Comércio. Um curto passeio leva ao palácio da República e aos seus jardins brancos, à catedral da Memória Africana e ao mercado Kermel, e depois à estação de Dacar, edifício de 1914 restaurado que é hoje o terminal do TER. Um bom percurso para ler a história da cidade, de capital da África Ocidental Francesa até aos nossos dias.",
      tips: "Não fotografe o palácio presidencial nem os militares de guarda. O Plateau visita-se de preferência nos dias úteis, de dia.",
    },
    "village-des-arts-dakar": {
      name: "Village des Arts de Dacar",
      summary: "Ateliês e galerias de artistas contemporâneos, perto do estádio Léopold Sédar Senghor.",
      description:
        "Na estrada do aeroporto, perto do estádio Léopold Sédar Senghor, o Village des Arts reúne num mesmo recinto dezenas de ateliês de pintores, escultores, ceramistas e artistas plásticos, além de uma galeria. Pode ver os artistas a trabalhar, descobrir a criação contemporânea senegalesa e comprar obras diretamente. O espaço participa no programa paralelo da Bienal de Dacar.",
      tips: "Nem todos os artistas estão presentes todos os dias: prefira uma visita num dia útil, ao fim da manhã.",
    },
    "marche-hlm-dakar": {
      name: "Mercado HLM",
      summary: "O grande mercado de tecidos de Dacar: wax, bazin, bordados e alfaiates a todo o vapor.",
      description:
        "No bairro dos HLM, este mercado é a referência de Dacar para tecidos: pilhas de wax estampado, bazin tingido e lustrado, voiles, rendas e linhas de bordar. Em redor, os alfaiates confecionam em poucos dias bubus, camisas ou vestidos por medida. Muito animado antes das grandes festas (Korité, Tabaski), quando todos mandam fazer a sua roupa nova.",
      tips: "Venha de manhã, mais calma; reserve tempo para negociar e para as provas se encomendar uma peça.",
    },
    "eglise-saint-charles-borromee-goree": {
      name: "Igreja de São Carlos Borromeu",
      summary: "Igreja de 1830 de paredes ocre, um dos edifícios católicos mais antigos do país.",
      description:
        "Concluída em 1830, dois anos depois da catedral de Saint-Louis, a igreja de São Carlos Borromeu é um dos mais antigos locais de culto católicos da África Ocidental. A fachada neoclássica de tons ocre e o pequeno campanário erguem-se perto do cais, entre as casas coloniais. Recorda a antiga presença na ilha de uma comunidade cristã, nomeadamente mestiça.",
      tips: "Vestuário adequado; a igreja nem sempre está aberta fora das celebrações.",
    },
    "cathedrale-saint-louis-du-senegal": {
      name: "Catedral de Saint-Louis",
      summary: "Consagrada em 1828, a igreja mais antiga da África Ocidental, reaberta após restauro.",
      description:
        "Na praça de Armas, no sul da ilha, a catedral de Saint-Louis foi consagrada em 1828, o que faz dela a igreja mais antiga da África Ocidental. A fachada com frontão e colunas, ladeada por duas torres sineiras, domina o bairro sul. Encerrada em 2005 por ameaçar ruína, foi integralmente restaurada e reabriu as portas no final de 2020.",
      tips: "Vestuário adequado; visitas fora das celebrações.",
    },
    "grande-mosquee-saint-louis-senegal": {
      name: "Grande Mesquita de Saint-Louis",
      summary: "Mesquita do século XIX no norte da ilha, reconhecível pelo seu relógio.",
      description:
        "No norte da ilha de Saint-Louis, em frente ao braço pequeno do rio, a Grande Mesquita é um dos mais antigos locais de culto muçulmanos da cidade colonial; a fachada combina minaretes e um relógio, singularidade arquitetónica que intriga os visitantes. Está virada para o bairro de pescadores de Guet Ndar e lembra o lugar do islão na história da cidade.",
      tips: "Admire-a do exterior; para entrar, peça autorização, com roupa que cubra e fora das horas de oração.",
    },
    "reserve-de-guembeul": {
      name: "Reserva Especial de Fauna de Guembeul",
      summary: "Lagoa e savana vedadas a sul de Saint-Louis: gazelas-dama, tartarugas-de-esporas e aves aquáticas.",
      description:
        "A cerca de 5 km a sul de Saint-Louis, na estrada de Gandiol, a reserva de Guembeul (cerca de 720 hectares, sítio Ramsar) protege uma lagoa salgada rodeada de savana saheliana. Serve de centro de reintrodução de espécies ameaçadas do Sahel, como a gazela-dama, a gazela-dorcas, o órix-cimitarra e a tartaruga-de-esporas, e acolhe numerosas aves aquáticas. Uma visita fácil de combinar com a Langue de Barbarie.",
      tips: "Visita a pé ou de viatura com um guia da reserva; venha cedo de manhã ou ao fim da tarde, com binóculos.",
      bestPeriod: "De novembro a abril",
    },
    "cafe-touba": {
      name: "O café Touba",
      summary: "Café condimentado com pimenta-da-guiné (djar), bebida emblemática ligada à cidade santa.",
      description:
        "O café Touba é um café torrado com djar, a pimenta-da-guiné (sementes de Xylopia), que lhe dá um sabor apimentado e ligeiramente canforado. A tradição associa-o a Cheikh Ahmadou Bamba e à cidade de Touba, daí o nome. Servido muito doce em copinhos, bebe-se a qualquer hora, vendido por vendedores ambulantes e em quiosques por todo o país.",
      tips: "Prove-o num vendedor de rua, de manhã, com um pedaço de pão: é o pequeno-almoço de muitos senegaleses.",
    },
    "sanctuaire-marial-popenguine": {
      name: "Santuário mariano de Popenguine",
      summary: "Basílica de Nossa Senhora da Délivrande e grande santuário nacional, palco da peregrinação de Pentecostes.",
      description:
        "Fundado no final do século XIX por missionários espiritanos, o santuário de Popenguine alberga uma Virgem negra na basílica de Nossa Senhora da Délivrande, elevada a basílica menor por João Paulo II antes da sua visita de 1992. Um vasto conjunto, inaugurado em dezembro de 2023 como santuário nacional, inclui uma réplica da gruta de Lourdes e um grande edifício com dezenas de milhares de lugares. Todas as segundas-feiras de Pentecostes acolhe a maior peregrinação católica do país.",
      tips: "Fora da peregrinação o local é calmo; vestuário adequado. No fim de semana de Pentecostes a estrada e a aldeia ficam saturadas.",
    },
    "reserve-naturelle-popenguine": {
      name: "Reserva Natural de Popenguine",
      summary: "Falésias, savana restaurada e vista sobre a Petite Côte, geridas com as mulheres da aldeia.",
      description:
        "Criada em 1986 em cerca de 1000 hectares, a reserva natural de Popenguine protege colinas e falésias sobre o oceano, entre elas o cabo de Naze, ponto culminante da Petite Côte. Este meio, muito degradado pela desflorestação e pelas secas, foi restaurado com o apoio de uma associação de mulheres da aldeia criada em 1988, exemplo muitas vezes citado de conservação comunitária. Trilhos, aves, antigas obras militares e panoramas sobre a costa.",
      tips: "Comece a caminhar cedo de manhã com água e chapéu; peça um guia à entrada da reserva.",
    },
    "plage-des-pecheurs-mbour": {
      name: "Praia dos pescadores de Mbour",
      summary: "Um dos grandes portos de pesca artesanal do país: regresso das pirogas e mercado de peixe.",
      description:
        "Mbour, principal cidade da Petite Côte, vive ao ritmo da pesca artesanal. Ao fim da tarde, centenas de pirogas pintadas regressam à praia: o peixe é descarregado às costas, separado, leiloado e depois fumado ou seco no local. Um espetáculo impressionante, ruidoso e muito fotogénico, a poucos minutos de Saly.",
      tips: "Chão escorregadio e cheiros fortes: recomenda-se calçado fechado. Peça autorização antes de fotografar e afaste-se das zonas de descarga.",
    },
    "toubab-dialaw": {
      name: "Toubab Dialaw",
      summary: "Aldeia de pescadores ao pé de falésias ocre, refúgio de artistas e bailarinos.",
      description:
        "No extremo norte da Petite Côte, a cerca de uma hora de Dacar, Toubab Dialaw é uma aldeia de pescadores encostada a falésias de laterite vermelha, junto a uma praia cheia de pirogas. Atrai há muito artistas, músicos e bailarinos: há espaços de criação e de formação em dança africana contemporânea. Uma etapa tranquila, longe das grandes estâncias.",
      tips: "É possível tomar banho com mar calmo, mas informe-se sobre as correntes; respeite a tranquilidade da aldeia.",
    },
    "ile-de-mar-lodj": {
      name: "Ilha de Mar Lodj",
      summary: "Ilha sem carros do Saloum, entre palmeiras-rônier, mangal e aldeias serer, em frente a Ndangane.",
      description:
        "Acessível em poucos minutos de piroga a partir do cais de Ndangane, a ilha de Mar alberga as aldeias de Mar Lodj, Mar Fafaco e Mar Soulou, com cerca de 5000 habitantes. Caminhos de areia ladeados de palmeiras-rônier, poilões e mangueiras, mangal, poços e campos: descobre-se a vida das ilhas do Saloum a pé, de bicicleta ou de carroça. Muçulmanos e cristãos convivem, com cemitérios e locais de culto vizinhos.",
      tips: "Organize a travessia com o seu acampamento ou com um piroguista de Ndangane; leve uma lanterna, a iluminação pública é limitada.",
      bestPeriod: "De novembro a maio",
    },
    "palmarin-saloum": {
      name: "Palmarin e as suas lagoas",
      summary: "Aldeias serer entre o oceano, palmares e planícies salgadas, à entrada da ponta de Sangomar.",
      description:
        "No norte do delta, Palmarin alinha várias aldeias serer numa estreita faixa de terra entre o oceano e as lagoas, no início da ponta de Sangomar. Palmares, mangal, tannes (planícies salgadas) e salinas artesanais formam paisagens abertas onde se observam muitas aves. Uma base tranquila para explorar o Saloum de piroga ou de bicicleta.",
      tips: "Os acampamentos organizam saídas de piroga e passeios; respeite os locais sagrados indicados pelos habitantes.",
      bestPeriod: "De novembro a maio",
    },
    "vieille-ville-ziguinchor": {
      name: "Ziguinchor, cidade colonial e cais do rio",
      summary: "A capital de Casamança: bairros coloniais, porto fluvial e mercados animados.",
      description:
        "Fundada pelos portugueses no século XVII e cedida à França em 1886, Ziguinchor estende-se pela margem sul do rio Casamança. O centro conserva edifícios coloniais de fachadas coloridas, ruas à sombra de mangueiras e cais de onde partem pirogas e o barco de Dacar. Mercados, oficinas de artesãos e comida de rua fazem dela uma etapa animada antes de seguir para Oussouye ou Cap Skirring.",
      tips: "Zona de vigilância reforçada segundo a France Diplomatie: circule de dia, pelos eixos principais, e evite as zonas florestais da periferia (nomeadamente a floresta de Bayot).",
    },
    "royaume-d-oussouye": {
      name: "Oussouye e o seu reino diola",
      summary: "Pequena cidade no coração de um reino diola tradicional, com o seu rei, florestas sagradas e arrozais.",
      description:
        "Oussouye é o centro de um reino diola cujo rei desempenha um papel espiritual e social: guardião das tradições, das florestas sagradas e da paz entre as aldeias, não detém poder político. Em redor da cidade, arrozais, poilões gigantes e aldeias de casas de adobe compõem uma das mais belas paisagens de Casamança. Com um guia local, é por vezes possível ser recebido na corte real, respeitando os usos.",
      tips: "Uma visita ao rei não se improvisa: recorra a um guia de Oussouye, informe-se sobre o protocolo e não fotografe sem acordo. Nunca entre num bosque sagrado.",
    },
    "cases-a-etage-mlomp": {
      name: "Casas de andar de Mlomp",
      summary: "Raras casas diola de adobe com andar, sob enormes poilões, entre Oussouye e Elinkine.",
      description:
        "A aldeia de Mlomp, na estrada de Oussouye para Elinkine, é conhecida pelas suas casas de andar, grandes habitações de banco (terra crua) com um piso superior, raras na África Ocidental, e pelos seus poilões monumentais. Algumas casas podem ser visitadas com os seus moradores, que explicam as técnicas de construção e a vida diola. Uma paragem fácil a caminho de Carabane.",
      tips: "Costuma pedir-se uma pequena contribuição pela visita; mantenha-se no eixo principal e viaje de dia.",
    },
    "poulet-yassa-casamance": {
      name: "O yassa, prato nascido em Casamança",
      summary: "Frango ou peixe marinado em limão com cebola estufada, servido com arroz branco.",
      description:
        "Originário de Casamança, o yassa tornou-se um dos pratos mais populares do Senegal: frango (ou peixe) marinado em sumo de limão, grelhado e depois cozinhado lentamente num molho de cebolas longamente estufadas, temperado com mostarda e malagueta, e servido com arroz branco. Em Casamança também se prepara com ostras do mangal.",
      tips: "Peça «yassa poulet» ou «yassa poisson» nas casas de pasto; a malagueta é muitas vezes servida à parte.",
    },
    "manufactures-arts-decoratifs-thies": {
      name: "Manufaturas Senegalesas de Artes Decorativas (MSAD)",
      summary: "Oficina de tapeçaria artística criada em 1966 por iniciativa de Senghor: teares e obras monumentais.",
      description:
        "Fundadas em Thiès em 1966 por iniciativa de Léopold Sédar Senghor, no impulso da Escola de Dacar, as Manufaturas Senegalesas de Artes Decorativas tecem à mão tapeçarias a partir de cartões de artistas senegaleses. Os primeiros tecelões foram formados na manufatura dos Gobelins, em Paris. Uma sala de exposição apresenta obras de cores vivas e é muitas vezes possível observar os tecelões a trabalhar.",
      tips: "Informe-se com antecedência sobre as possibilidades de visitar as oficinas; as tapeçarias são vendidas por encomenda.",
    },
    "grande-mosquee-tivaouane": {
      name: "Grande Mesquita e cidade religiosa de Tivaouane",
      summary: "Capital espiritual da Tijaniyya no Senegal, em torno dos mausoléus de El Hadji Malick Sy.",
      description:
        "Tivaouane é o grande centro da confraria sufi tijani no Senegal desde que El Hadji Malick Sy ali se instalou no início do século XX. Em redor da Grande Mesquita erguem-se os mausoléus dos seus descendentes e as residências da família religiosa. Todos os anos a cidade acolhe o Gamou, a celebração do nascimento do Profeta, que reúne multidões imensas.",
      tips: "Roupa que cubra e lenço para as mulheres; venha fora do Gamou para uma visita tranquila, acompanhado por alguém da comunidade.",
    },
    "abbaye-de-keur-moussa": {
      name: "Abadia de Keur Moussa",
      summary: "Mosteiro beneditino célebre pela sua liturgia acompanhada à kora.",
      description:
        "Fundada em 1961 por monges vindos da abadia de Solesmes e inaugurada em 1963, a abadia beneditina de Keur Moussa, entre Dacar e Thiès, é conhecida por ter adaptado a liturgia aos instrumentos e melodias da África Ocidental: os ofícios são cantados ao som da kora e do balafon. Os monges fabricam também koras e vendem na loja produtos do seu pomar, como compotas.",
      tips: "A missa de domingo, muito concorrida, é o melhor momento para ouvir a kora; chegue cedo e mantenha-se discreto durante os ofícios.",
    },
    "plage-de-kayar": {
      name: "Praia dos pescadores de Kayar",
      summary: "Grande porto de pesca artesanal da Grande Côte: centenas de pirogas e mercado de peixe.",
      description:
        "A cerca de sessenta quilómetros a norte de Dacar, Kayar é um dos principais centros de pesca artesanal do Senegal. Na longa praia, centenas de pirogas coloridas são puxadas para a areia; ao fim do dia, o desembarque e a venda do peixe geram uma efervescência espetacular. O canhão submarino ao largo, muito rico em peixe, explica a importância do porto.",
      tips: "Não tome banho: o mar é perigoso na Grande Côte. Peça autorização antes de fotografar e afaste-se das pirogas durante as manobras.",
    },
    "desert-de-lompoul": {
      name: "Deserto de Lompoul",
      summary: "Pequeno deserto de dunas ocre a poucos quilómetros do oceano, entre Dacar e Saint-Louis.",
      description:
        "Na região de Louga, entre Kébémer e Lompoul-sur-Mer, o deserto de Lompoul cobre cerca de 18 km² de dunas de areia fina em tons ocre e alaranjados, por vezes com várias dezenas de metros de altura. Vem-se para uma noite em tenda nómada, um passeio de dromedário e o pôr do sol sobre as dunas. Uma etapa apreciada na estrada para Saint-Louis.",
      tips: "Leve um casaco para a noite, fresca na estação seca; reserve o acampamento com antecedência e proteja os seus aparelhos da areia.",
      bestPeriod: "De novembro a maio",
    },
    "grande-mosquee-medina-baye-kaolack": {
      name: "Grande Mesquita de Médina Baye",
      summary: "O santuário de Cheikh Ibrahima Niass, centro da Tijaniyya seguido por fiéis de toda a África.",
      description:
        "No bairro de Médina Baye, em Kaolack, a Grande Mesquita alberga o mausoléu de Cheikh Ibrahima Niass (1900-1975), dito Baye Niass, figura maior da confraria tijani cujo movimento conta milhões de discípulos na Nigéria, no Gana, no Níger e mais além. O bairro vive ao ritmo das orações, do ensino corânico e dos visitantes vindos de toda a África Ocidental, sobretudo durante o Gamou.",
      tips: "Roupa que cubra e lenço para as mulheres; peça para ser acompanhado por alguém da comunidade e evite as horas de oração.",
    },
    "cercles-megalithiques-sine-ngayene": {
      name: "Círculos megalíticos de Sine Ngayène e Wanar",
      summary: "Dezenas de círculos de pedras erguidas com mais de mil anos, inscritos no Património Mundial.",
      description:
        "Os círculos megalíticos da Senegâmbia, inscritos no Património Mundial da UNESCO em 2006, reúnem mais de mil monumentos ao longo do rio Gâmbia. Do lado senegalês, Sine Ngayène (52 círculos, perto de Nioro du Rip) e Wanar (21 círculos, perto de Kaffrine) alinham pedras de laterite talhadas com cerca de dois metros de altura, erguidas sobre sepulturas aproximadamente entre os séculos VII e XV.",
      tips: "Os sítios são isolados: venha de dia com motorista, água e chapéu. Não desloque as pedras nem suba para elas.",
      bestPeriod: "De novembro a maio",
    },
    "pays-bassari-kedougou": {
      name: "País Bassari: paisagens culturais bassari, fula e bedik",
      summary: "Aldeias empoleiradas, socalcos e ritos de iniciação vivos, inscritos no Património Mundial da UNESCO.",
      description:
        "Em torno de Bandafassi, Salémata e Éthiolo, os bassari, os bedik e os fulas moldaram paisagens de colinas pontuadas por aldeias de cabanas redondas com telhado de colmo, campos em socalcos e locais sagrados. Estas paisagens culturais, onde se mantêm ritos de iniciação e cerimónias de máscaras, estão inscritas no Património Mundial desde 2012. A aldeia bedik de Iwol, empoleirada numa colina e dominada por um poilão gigante, é uma das visitas mais procuradas.",
      tips: "Vá com um guia de Kédougou ou de Bandafassi, peça sempre autorização ao chefe da aldeia e antes de cada fotografia; leve bom calçado para as subidas.",
      bestPeriod: "De novembro a maio",
    },
    "cascade-de-dindefelo": {
      name: "Cascata de Dindéfelo",
      summary: "Queda de água com cerca de cem metros no fundo de um desfiladeiro arborizado, perto da fronteira guineense.",
      description:
        "Perto da aldeia de Dindéfelo, a sul de Kédougou, uma curta caminhada por uma floresta-galeria leva a uma queda de cerca de 100 metros que cai numa bacia onde se pode tomar banho. O sítio, classificado e gerido pela comunidade da aldeia, abriga também uma população de chimpanzés acompanhada por programas de conservação.",
      tips: "O caudal é mais espetacular no final da estação das chuvas (setembro-novembro), quando as pistas podem ser difíceis. É cobrada uma entrada comunitária.",
      bestPeriod: "De outubro a janeiro",
    },
    "parc-national-niokolo-koba": {
      name: "Parque Nacional de Niokolo-Koba",
      summary: "O maior parque do país, classificado pela UNESCO: savana, florestas-galeria e rio Gâmbia.",
      description:
        "Parque nacional desde 1954 e Património Mundial e reserva da biosfera desde 1981, o Niokolo-Koba cobre cerca de um milhão de hectares de savanas, florestas-galeria e charcos ao longo do rio Gâmbia. Podem observar-se antílopes, javalis-africanos, macacos, hipopótamos, crocodilos e muitas aves; os grandes predadores são raros e discretos. Inscrito na lista do Património em Perigo em 2007, foi retirado dela em 2024 graças à melhoria da sua conservação.",
      tips: "Visita em 4x4 com um guia credenciado, a partir de Tambacounda ou Kédougou; a maioria das pistas fica intransitável na estação das chuvas.",
      bestPeriod: "De dezembro a maio",
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
    "thies-grande-cote": {
      name: "تييس وتيفاوان والساحل الكبير",
      region: "تييس",
      summary: "مدينة السجاد الفني، والمدينة المقدسة للتيجانيين، ودير موسيقي، والصيد في كايار، وكثبان لومبول.",
      description:
        "على بعد ساعة من داكار عبر الطريق السريع، تشتهر تييس، ملتقى السكك الحديدية التاريخي، بورشها للسجاد الفني. وإلى الشمال تقع تيفاوان، عاصمة الطريقة التيجانية التي تستضيف كل عام احتفال المولد (الغامو)، فيما يُسمع صوت آلة الكورا في طقوس دير كير موسى. وعلى الساحل الكبير، تُعدّ كايار من أكبر موانئ الصيد التقليدي في البلاد، وإلى الشمال، بين داكار وسان لوي، تقدّم كثبان لومبول المغرة لمحة عن الصحراء الكبرى. تنبيه: البحر خطير جدًا على امتداد الساحل الكبير.",
    },
    kaolack: {
      name: "كاولاك والدوائر الحجرية",
      region: "كاولاك",
      summary: "عاصمة حوض الفول السوداني، ومركز كبير للتيجانية النياسية، وبوابة إلى مواقع حجرية مدرجة في قائمة اليونسكو.",
      description:
        "على ضفة نهر سالوم، على بعد نحو 190 كم جنوب شرق داكار، تُعدّ كاولاك ملتقى تجاريًا كبيرًا في قلب حوض الفول السوداني، وفيها أحد الأسواق الكبرى في البلاد. وحيّ مدينة باي، الذي أسسه الشيخ إبراهيم نياس، مركز روحي ذو إشعاع دولي. وإلى الشرق، نحو نيورو دو ريب وكافرين، تُعدّ الدوائر الحجرية في سين نغايين وونار، المدرجة في قائمة التراث العالمي، من أبرز مجموعات الحجارة المنتصبة في أفريقيا.",
    },
    "senegal-oriental": {
      name: "شرق السنغال: كيدوغو ونيوكولو كوبا",
      region: "كيدوغو / تامباكوندا",
      summary: "تلال وشلالات وبلاد الباساري المدرجة في قائمة اليونسكو ومتنزه وطني كبير من السافانا، في أقصى الجنوب الشرقي.",
      description:
        "على بعد أكثر من 650 كم من داكار، يختلف الجنوب الشرقي عن بقية السنغال: تلال مشجّرة وأنهار وشلال ديندفيلو وقرى الباساري والبيديك والفولاني المعلّقة على سفوح فوتا جالون، وهي مناظر مدرجة في قائمة التراث العالمي منذ 2012. وإلى الشمال، يحمي متنزه نيوكولو كوبا الوطني سافانا شاسعة يعبرها نهر غامبيا. تُعدّ كيدوغو قاعدة للانطلاق. توصي وزارة الخارجية الفرنسية بعدم التوجّه إلى المناطق الحدودية مع مالي في الشرق إلا لسبب قاهر: التزم بالمسارات الواقعة غرب كيدوغو وجنوبها، نهارًا ومع مرشد محلي.",
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
    "musee-theodore-monod-dakar": {
      name: "متحف تيودور مونو للفن الأفريقي",
      summary: "متحف المعهد الأساسي لأفريقيا السوداء في ساحة سويتو: أقنعة وتماثيل وأدوات الحياة اليومية في غرب أفريقيا.",
      description:
        "يقع متحف المعهد الأساسي لأفريقيا السوداء (إيفان) في ساحة سويتو، بجوار الجمعية الوطنية، في مبنى شُيّد عام 1931 على الطراز السوداني الجديد، وهو من أقدم المتاحف في غرب أفريقيا. تعرض مجموعاته، التي تضم آلاف القطع، أقنعة وتماثيل صغيرة وآلات موسيقية ومنسوجات وأدوات من الحياة اليومية في المنطقة كلها. أُعيدت تسميته عام 2007 تكريمًا لعالم الطبيعة تيودور مونو، ويستضيف أيضًا معارض بينالي داكار.",
      tips: "اجمع الزيارة مع حيّ البلاتو المجاور (ساحة الاستقلال والكاتدرائية وسوق كيرميل).",
    },
    "musee-leopold-sedar-senghor-dakar": {
      name: "متحف ليوبولد سيدار سنغور",
      summary: "المسكن السابق للشاعر الرئيس في داكار، مفتوح للجمهور بيتًا متحفًا.",
      description:
        "في حيّ فان السكني، تحوّل البيت الذي عاش فيه ليوبولد سيدار سنغور في داكار، أول رئيس للسنغال وشاعر حركة الزنوجة، إلى متحف. يكتشف الزائر فيه محيط حياته وأثاثه ومكتبته وتذكارات من مسيرته السياسية والأدبية وأعمالًا فنية كان يحبها. زيارة حميمة تكمّل زيارة متحف الحضارات السوداء.",
    },
    "ile-de-ngor": {
      name: "جزيرة نغور",
      summary: "جزيرة صغيرة على بعد دقائق بالقارب من رأس ألماديز: خلجان وسباحة وركوب أمواج.",
      description:
        "على بعد نحو 400 متر من قرية نغور التابعة لشعب الليبو، عند رأس ألماديز، تُبلغ هذه الجزيرة البركانية الصغيرة في دقائق بالقارب الخشبي من شاطئ نغور. وهي خالية من السيارات، وتضم خلجانًا محمية للسباحة وممرات بين البيوت والصخور، وعلى جانب المحيط أمواجًا يقصدها راكبو الأمواج منذ فيلم «الصيف الذي لا ينتهي» (1964). وجهة مفضّلة لسكان داكار في عطلة نهاية الأسبوع.",
      tips: "تنطلق القوارب من شاطئ نغور: اتفق على سعر الذهاب والإياب وموعد العودة قبل الصعود. الجزيرة مزدحمة جدًا في عطلة نهاية الأسبوع.",
      bestPeriod: "طوال العام؛ البحر أهدأ من جهة الشاطئ",
    },
    "parc-national-iles-de-la-madeleine": {
      name: "متنزه جزر مادلين الوطني",
      summary: "أرخبيل بركاني صغير قبالة داكار، ملاذ للطيور البحرية، يُبلغ بالقارب.",
      description:
        "على بعد بضعة كيلومترات من الكورنيش، تشكّل جزر مادلين أحد أصغر المتنزهات الوطنية في العالم (نحو 45 هكتارًا)، وهي محمية منذ 1976. تأوي هذه الجزر البركانية غير المأهولة، ذات المنحدرات الشديدة والنباتات السهبية، طيورًا بحرية مثل طائر الاستوائيات أحمر المنقار، وأشجار باوباب قزمة. تتم الزيارة برفقة موظفي المتنزه انطلاقًا من ساحل داكار عندما يسمح البحر.",
      tips: "تتوقف الرحلات على حالة البحر: استعلم لدى مصلحة المتنزهات الوطنية. الأحذية المغلقة والماء والقبعة ضرورية.",
      bestPeriod: "موسم الجفاف، حين يكون البحر هادئًا",
    },
    "pointe-des-almadies": {
      name: "رأس ألماديز وحيّها",
      summary: "أقصى نقطة غربية في القارة الأفريقية، ومن أكثر أحياء داكار حيوية في المساء.",
      description:
        "في شمال غرب شبه جزيرة الرأس الأخضر، يمثّل رأس ألماديز الطرف الغربي للقارة الأفريقية: صخور سوداء تضربها أمواج المحيط، وغروب الشمس، وإطلالة على جزيرة نغور. وحوله يتركّز في ألماديز ونغور كثير من مطاعم السمك وثمار البحر وحانات الشاطئ والمقاهي وقاعات الحفلات، مما يجعل المنطقة، مع حيّي البلاتو وبوان إي، من أبرز مراكز الحياة الليلية في داكار، لا سيما من الخميس إلى السبت.",
      tips: "تنقّل ليلًا بسيارة أجرة بدل السير على الطرق الساحلية. البحر خطير عند أسفل الصخور: لا تسبح هناك.",
    },
    "phare-des-mamelles": {
      name: "منارة مامِل",
      summary: "منارة تعود إلى 1864 على قمة تلّ بركاني، تطلّ على شبه الجزيرة كلها.",
      description:
        "اكتمل بناء هذه المنارة البيضاء عام 1864 على التلة الغربية من تلّتي مامِل البركانيتين، وهي أقدم منارة في داكار ومن أقوى منارات الساحل الأفريقي. يُصعد إليها مشيًا عبر درب شديد الانحدار لاكتشاف إطلالة شاملة على ألماديز والمحيط ونصب النهضة الأفريقية والمدينة. ويستضيف الموقع أحيانًا فعاليات مسائية.",
      tips: "اصعد في آخر العصر للاستمتاع بضوء الغروب؛ وارتدِ حذاءً مناسبًا.",
    },
    "village-artisanal-soumbedioune": {
      name: "قرية سومبيديون الحرفية وخليجها",
      summary: "ورش الحرفيين على الكورنيش وعودة قوارب الصيد في آخر النهار.",
      description:
        "على الكورنيش الغربي، تضم قرية سومبيديون الحرفية عشرات المحلات: نحّاتو الخشب وصائغو الحلي وصانعو الجلود والنسّاجون ورسّامو الزجاج. وبجوارها مباشرة، ينبض خليج سومبيديون الصغير بالحياة في آخر النهار مع عودة القوارب الملوّنة، حين يُباع السمك مباشرة على الشاطئ. عنوان جيد للتذكارات المصنوعة يدويًا ولمشهد من حياة داكار.",
      tips: "تجوّل في المحلات قبل الشراء وفاوض بهدوء. استأذن قبل تصوير الصيادين.",
    },
    "grande-mosquee-de-dakar": {
      name: "الجامع الكبير في داكار",
      summary: "مسجد على الطراز الأندلسي المغربي افتُتح عام 1964، بمئذنة ارتفاعها 67 مترًا.",
      description:
        "بناه معماريون فرنسيون ومغاربة وافتُتح عام 1964 بحضور الملك الحسن الثاني والرئيس سنغور، ويتميّز الجامع الكبير في داكار بمئذنته البالغ ارتفاعها 67 مترًا وزخارفه ذات الإلهام العربي الأندلسي. ويضم أيضًا المعهد الإسلامي في داكار. أما حيّ المدينة المحيط به فهو من أكثر أحياء المدينة حيوية وشعبية.",
      tips: "لا يكون الداخل مفتوحًا دائمًا لغير المسلمين: استعلم في المكان، بملابس محتشمة وخارج أوقات الصلاة.",
    },
    "cathedrale-souvenir-africain-dakar": {
      name: "كاتدرائية الذكرى الأفريقية",
      summary: "كاتدرائية سيدة الانتصارات، كُرّست عام 1936 في جادة الجمهورية.",
      description:
        "كاتدرائية سيدة الانتصارات، المعروفة بكاتدرائية الذكرى الأفريقية، هي أكبر كنيسة في داكار ومقرّ رئاسة الأساقفة، وقد كُرّست عام 1936 في جادة الجمهورية بحيّ البلاتو. تمزج واجهتها ذات الأعمدة وقبّتها بين التأثيرات البيزنطية الجديدة والسودانية. أُقيمت فيها جنازة الرئيس سنغور عام 2001. وقدّاسات الأحد، الغنية بالتراتيل، تستحق الحضور.",
      tips: "يُشترط لباس لائق؛ والتزم الهدوء أثناء الصلوات.",
    },
    "mausolee-limamou-laye-yoff": {
      name: "مسجد سيدينا ليمامو لاي وضريحه (يوف)",
      summary: "معلم بارز للطريقة اللايينية، يواجه المحيط في قرية يوف القديمة لشعب الليبو.",
      description:
        "في يوف، قرية الصيادين القديمة لشعب الليبو التي صارت اليوم جزءًا من داكار، يُعدّ ضريح سيدينا ليمامو لاي، مؤسس الطريقة الصوفية اللايينية المتوفى عام 1909، مكان زيارة عظيم التبجيل يطلّ على المحيط. يأتي إليه المريدون، وكثيرًا ما يرتدون الأبيض، للصلاة، ولا سيما في ذكرى «النداء». ويحتفظ حيّ يوف لايين، بشواطئ قواربه، بهوية جماعية قوية.",
      tips: "ملابس محتشمة وسلوك هادئ؛ استأذن قبل أي تصوير ولا تدخل أماكن الصلاة دون دعوة.",
    },
    "arene-nationale-de-lutte-pikine": {
      name: "الحلبة الوطنية للمصارعة",
      summary: "معبد المصارعة السنغالية بالضرب: نزالات وطبول وطقوس المصارعين.",
      description:
        "في بيكين، في ضواحي داكار، تستضيف الحلبة الوطنية، التي تتسع لنحو 20 ألف متفرج، كبرى نزالات المصارعة بالضرب (لامب)، الرياضة الوطنية. وقبل النزال بوقت طويل تتصاعد الأجواء: طبول وأغاني الغريو ورقصات وطقوس روحية يؤديها المصارعون محاطين بمرابطيهم. وتجذب النزالات الكبرى، المعلنة قبل أسابيع، حشودًا ضخمة وتُبثّ على التلفزيون.",
      tips: "اشترِ التذاكر مسبقًا للنزالات الكبرى، واحضر مبكرًا برفقة شخص يعرف هذه الرياضة. الحشود كثيفة جدًا: أبقِ أغراضك قريبة منك.",
      bestPeriod: "موسم النزالات، خاصة في موسم الجفاف",
    },
    "place-de-l-independance-dakar": {
      name: "ساحة الاستقلال وحيّ البلاتو",
      summary: "القلب الإداري لداكار: ساحة كبيرة ومبانٍ استعمارية وقصر رئاسي ومحطة قطار مرمَّمة.",
      description:
        "ساحة الاستقلال باحة واسعة في حيّ البلاتو تحفّ بها مبانٍ من القرنين التاسع عشر والعشرين، منها غرفة التجارة. وتقود جولة قصيرة إلى قصر الجمهورية وحدائقه البيضاء وكاتدرائية الذكرى الأفريقية وسوق كيرميل، ثم إلى محطة داكار، وهي مبنى من عام 1914 رُمّم وأصبح اليوم المحطة النهائية لقطار «تير» الإقليمي السريع. مسار جيد لقراءة تاريخ المدينة منذ أن كانت عاصمة أفريقيا الغربية الفرنسية حتى اليوم.",
      tips: "لا تصوّر القصر الرئاسي ولا الجنود الحرّاس. يُفضَّل زيارة البلاتو في أيام الأسبوع ونهارًا.",
    },
    "village-des-arts-dakar": {
      name: "قرية الفنون في داكار",
      summary: "مراسم وصالات عرض لفنانين معاصرين، قرب ملعب ليوبولد سيدار سنغور.",
      description:
        "على طريق المطار، قرب ملعب ليوبولد سيدار سنغور، تجمع قرية الفنون في حرم واحد عشرات المراسم لرسّامين ونحّاتين وخزّافين وفنانين تشكيليين، إضافة إلى صالة عرض. يمكن لقاء الفنانين أثناء عملهم، واكتشاف الإبداع السنغالي المعاصر، وشراء الأعمال مباشرة. ويشارك المكان في البرنامج الموازي لبينالي داكار.",
      tips: "لا يحضر جميع الفنانين كل يوم: فضّل الزيارة في أيام الأسبوع، في أواخر الصباح.",
    },
    "marche-hlm-dakar": {
      name: "سوق إتش إل إم",
      summary: "سوق الأقمشة الكبير في داكار: الشمع المطبوع والبازان والتطريز والخيّاطون المنهمكون.",
      description:
        "في حيّ إتش إل إم، يُعدّ هذا السوق عنوان داكار للأقمشة: أكوام من قماش الشمع المطبوع، والبازان المصبوغ اللامع، والأقمشة الخفيفة والدانتيل وخيوط التطريز. ومن حوله يخيط الخيّاطون في أيام قليلة الجلابيب (البوبو) والقمصان والفساتين حسب المقاس. ويزدحم كثيرًا قبيل الأعياد الكبرى (عيد الفطر وعيد الأضحى)، حين يفصّل كل واحد ثيابه الجديدة.",
      tips: "تعال صباحًا حين يكون أهدأ؛ وخصّص وقتًا للمساومة وللقياسات إن طلبت تفصيل ثوب.",
    },
    "eglise-saint-charles-borromee-goree": {
      name: "كنيسة القديس شارل بوروميو",
      summary: "كنيسة تعود إلى 1830 بجدران مغرة، من أقدم المباني الكاثوليكية في البلاد.",
      description:
        "اكتمل بناء كنيسة القديس شارل بوروميو عام 1830، بعد عامين من كاتدرائية سان لوي، وهي من أقدم أماكن العبادة الكاثوليكية في غرب أفريقيا. تنتصب واجهتها الكلاسيكية الجديدة ذات الألوان المغرة وبرج أجراسها الصغير قرب المرسى، بين البيوت الاستعمارية. وهي تذكّر بالحضور القديم لجماعة مسيحية في الجزيرة، ولا سيما من ذوي الأصول المختلطة.",
      tips: "لباس لائق؛ ولا تكون الكنيسة مفتوحة دائمًا خارج أوقات الصلوات.",
    },
    "cathedrale-saint-louis-du-senegal": {
      name: "كاتدرائية سان لوي",
      summary: "كُرّست عام 1828، وهي أقدم كنيسة في غرب أفريقيا، وأُعيد فتحها بعد الترميم.",
      description:
        "في ساحة السلاح، جنوب الجزيرة، كُرّست كاتدرائية سان لوي عام 1828، مما يجعلها أقدم كنيسة في غرب أفريقيا. تهيمن واجهتها ذات الجبهة المثلثة والأعمدة، المحاطة ببرجي أجراس، على الحيّ الجنوبي. أُغلقت عام 2005 لأنها كانت مهدّدة بالانهيار، ثم رُمّمت بالكامل وأُعيد فتحها في أواخر 2020.",
      tips: "لباس لائق؛ والزيارة خارج أوقات الصلوات.",
    },
    "grande-mosquee-saint-louis-senegal": {
      name: "الجامع الكبير في سان لوي",
      summary: "مسجد من القرن التاسع عشر في شمال الجزيرة، يُعرف بساعته.",
      description:
        "في شمال جزيرة سان لوي، قبالة الفرع الصغير للنهر، يُعدّ الجامع الكبير من أقدم أماكن العبادة الإسلامية في المدينة الاستعمارية؛ وتجمع واجهته بين المآذن وساعة، وهي خصوصية معمارية تثير فضول الزوار. ويقابل حيّ الصيادين غيت ندار، ويذكّر بمكانة الإسلام في تاريخ المدينة.",
      tips: "تأمّله من الخارج؛ وللدخول استأذن، بملابس محتشمة وخارج أوقات الصلاة.",
    },
    "reserve-de-guembeul": {
      name: "محمية غيمبول الخاصة للحياة البرية",
      summary: "بحيرة وسافانا مسيّجتان جنوب سان لوي: غزلان الداما والسلاحف المهمازية والطيور المائية.",
      description:
        "على بعد نحو 5 كم جنوب سان لوي، على طريق غانديول، تحمي محمية غيمبول (نحو 720 هكتارًا، موقع رامسار) بحيرة مالحة تحيط بها سافانا ساحلية. وهي مركز لإعادة توطين أنواع مهدّدة من منطقة الساحل، مثل غزال الداما وغزال الدوركاس والمها أبو حراب والسلحفاة المهمازية، وتستقبل طيورًا مائية كثيرة. زيارة يسهل جمعها مع لانغ دو باربري.",
      tips: "الزيارة مشيًا أو بالسيارة مع مرشد المحمية؛ تعال باكرًا صباحًا أو في آخر العصر، ومعك منظار.",
      bestPeriod: "من نوفمبر إلى أبريل",
    },
    "cafe-touba": {
      name: "قهوة طوبى",
      summary: "قهوة متبّلة بفلفل غينيا (الجار)، مشروب رمزي مرتبط بالمدينة المقدسة.",
      description:
        "قهوة طوبى قهوة تُحمَّص مع «الجار»، أي فلفل غينيا (بذور الزيلوبيا)، الذي يمنحها طعمًا حارًا مع لمسة كافورية خفيفة. وتربطها التقاليد بالشيخ أحمدو بامبا وبمدينة طوبى، ومن هنا اسمها. تُقدَّم شديدة الحلاوة في أكواب صغيرة، وتُشرب في أي وقت، ويبيعها الباعة الجوّالون والأكشاك في أنحاء البلاد.",
      tips: "تذوّقها لدى بائع في الشارع صباحًا مع قطعة خبز: إنها فطور كثير من السنغاليين.",
    },
    "sanctuaire-marial-popenguine": {
      name: "المزار المريمي في بوبينغين",
      summary: "بازيليك سيدة لا ديليفراند ومزار وطني كبير، مقصد حجّ عيد العنصرة.",
      description:
        "أسّسه مبشّرون من رهبنة الروح القدس في أواخر القرن التاسع عشر، ويضم مزار بوبينغين تمثالًا لعذراء سوداء في بازيليك سيدة لا ديليفراند، التي رفعها البابا يوحنا بولس الثاني إلى مرتبة بازيليك صغرى قبيل زيارته عام 1992. ويشمل مجمّع واسع افتُتح في ديسمبر 2023 مزارًا وطنيًا نسخة من مغارة لورد ومبنى كبيرًا يتسع لعشرات الآلاف. وفي كل اثنين العنصرة يستقبل أكبر حجّ كاثوليكي في البلاد.",
      tips: "المكان هادئ خارج موسم الحجّ؛ ولباس لائق. وفي عطلة العنصرة يكتظّ الطريق والقرية.",
    },
    "reserve-naturelle-popenguine": {
      name: "محمية بوبينغين الطبيعية",
      summary: "جروف وسافانا مستصلحة وإطلالة على الساحل الصغير، تُدار مع نساء القرية.",
      description:
        "أُنشئت محمية بوبينغين الطبيعية عام 1986 على نحو 1000 هكتار، وهي تحمي تلالًا وجروفًا تطلّ على المحيط، منها رأس ناز، أعلى نقطة في الساحل الصغير. وقد استُصلحت هذه البيئة، التي أنهكها قطع الأشجار والجفاف، بدعم من جمعية لنساء القرية تأسست عام 1988، وهي مثال يُستشهد به كثيرًا على الحماية المجتمعية للطبيعة. ممرات وطيور ومنشآت عسكرية قديمة وإطلالات على الساحل.",
      tips: "انطلق للمشي باكرًا صباحًا مع الماء وقبعة؛ واطلب مرشدًا عند مدخل المحمية.",
    },
    "plage-des-pecheurs-mbour": {
      name: "شاطئ الصيادين في مبور",
      summary: "أحد أكبر موانئ الصيد التقليدي في البلاد: عودة القوارب وسوق السمك.",
      description:
        "تعيش مبور، كبرى مدن الساحل الصغير، على إيقاع الصيد التقليدي. ففي آخر العصر تعود مئات القوارب المزخرفة إلى الشاطئ: يُنزل السمك على الأكتاف ويُفرز ويُباع بالمزاد ثم يُدخَّن أو يُجفَّف في المكان. مشهد مدهش وصاخب وجذاب للتصوير، على بعد دقائق من سالي.",
      tips: "الأرض زلقة والروائح قوية: يُنصح بأحذية مغلقة. استأذن قبل التصوير وابقَ بعيدًا عن مناطق التفريغ.",
    },
    "toubab-dialaw": {
      name: "توباب ديالاو",
      summary: "قرية صيادين عند سفح جروف مغرة، ملتقى للفنانين والراقصين.",
      description:
        "في الطرف الشمالي من الساحل الصغير، على بعد ساعة تقريبًا من داكار، تستند قرية الصيادين توباب ديالاو إلى جروف من اللاتيريت الأحمر، على شاطئ تصطف عليه القوارب. وهي تجذب منذ زمن طويل الفنانين والموسيقيين والراقصين، وفيها أماكن للإبداع والتدريب على الرقص الأفريقي المعاصر. محطة هادئة بعيدًا عن المنتجعات الكبرى.",
      tips: "السباحة ممكنة حين يكون البحر هادئًا، لكن استعلم عن التيارات؛ واحترم هدوء القرية.",
    },
    "ile-de-mar-lodj": {
      name: "جزيرة مار لودج",
      summary: "جزيرة خالية من السيارات في سالوم، بين نخيل الروني والمانغروف وقرى السيرير، قبالة ندانغان.",
      description:
        "تُبلغ جزيرة مار في دقائق بالقارب من مرسى ندانغان، وتضم قرى مار لودج ومار فافاكو ومار سولو، ويسكنها نحو 5000 نسمة. دروب رملية تحفّها أشجار نخيل الروني والقطن الحريري والمانجو، ومانغروف وآبار وحقول: يكتشف الزائر حياة جزر سالوم مشيًا أو بالدراجة أو بالعربة. ويتعايش فيها المسلمون والمسيحيون، بمقابر وأماكن عبادة متجاورة.",
      tips: "رتّب العبور مع مخيّمك أو مع صاحب قارب من ندانغان؛ واحمل مصباحًا لأن الإنارة العامة محدودة.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "palmarin-saloum": {
      name: "بالمارين وبحيراتها",
      summary: "قرى السيرير بين المحيط وبساتين النخيل والسبخات المالحة، عند مدخل لسان سانغومار.",
      description:
        "في شمال الدلتا، تصطف عدة قرى للسيرير في بالمارين على شريط ضيق من الأرض بين المحيط والبحيرات، عند بداية لسان سانغومار. وتشكّل بساتين النخيل والمانغروف والسبخات المالحة (التان) والملّاحات التقليدية مناظر مفتوحة تُشاهد فيها طيور كثيرة. قاعدة هادئة لاستكشاف سالوم بالقارب أو بالدراجة.",
      tips: "تنظّم المخيّمات رحلات بالقارب ونزهات؛ واحترم المواقع المقدسة التي يشير إليها السكان.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "vieille-ville-ziguinchor": {
      name: "زيغينشور، المدينة الاستعمارية وأرصفة النهر",
      summary: "عاصمة كازامانس: أحياء استعمارية وميناء نهري وأسواق نابضة.",
      description:
        "أسسها البرتغاليون في القرن السابع عشر وتنازلوا عنها لفرنسا عام 1886، وتمتد زيغينشور على الضفة الجنوبية لنهر كازامانس. يحتفظ وسطها بمبانٍ استعمارية ذات واجهات ملوّنة وشوارع تظلّلها أشجار المانجو وأرصفة تنطلق منها القوارب وسفينة داكار. وتجعل منها الأسواق وورش الحرفيين ومأكولات الشارع محطة حيّة قبل التوجه إلى أوسويي أو كاب سكيرينغ.",
      tips: "منطقة يقظة مشدّدة بحسب وزارة الخارجية الفرنسية: تنقّل نهارًا وعلى المحاور الرئيسية، وتجنّب المناطق الحرجية في الأطراف (لا سيما غابة بايوت).",
    },
    "royaume-d-oussouye": {
      name: "أوسويي ومملكتها الديولية",
      summary: "بلدة صغيرة في قلب مملكة ديولية تقليدية، بملكها وغاباتها المقدسة وحقول الأرز.",
      description:
        "أوسويي مركز مملكة ديولية يؤدي ملكها دورًا روحيًا واجتماعيًا: فهو حارس التقاليد والغابات المقدسة والسلام بين القرى، ولا يملك سلطة سياسية. وحول البلدة تشكّل حقول الأرز وأشجار القطن الحريري العملاقة والقرى ذات البيوت الطينية واحدًا من أجمل مناظر كازامانس. ومع مرشد محلي يمكن أحيانًا أن يُستقبل الزائر في البلاط الملكي، مع احترام الأعراف.",
      tips: "زيارة الملك لا تُرتجل: استعن بمرشد من أوسويي، واستعلم عن البروتوكول، ولا تصوّر دون موافقة. ولا تدخل أبدًا غابة مقدسة.",
    },
    "cases-a-etage-mlomp": {
      name: "البيوت ذات الطابقين في ملومب",
      summary: "بيوت ديولية نادرة من الطين بطابقين، تحت أشجار قطن حريري ضخمة، بين أوسويي وإلينكين.",
      description:
        "تشتهر قرية ملومب، على الطريق من أوسويي إلى إلينكين، ببيوتها ذات الطابقين، وهي مساكن كبيرة من الطين النيء (البانكو) تعلوها طبقة ثانية، وهو أمر نادر في غرب أفريقيا، وكذلك بأشجار القطن الحريري الضخمة. ويمكن زيارة بعض البيوت مع سكانها الذين يشرحون تقنيات البناء وحياة الديولا. توقف سهل في الطريق إلى كارابان.",
      tips: "تُطلب عادةً مساهمة صغيرة مقابل الزيارة؛ والتزم بالمحور الرئيسي وسافر نهارًا.",
    },
    "poulet-yassa-casamance": {
      name: "الياسا، طبق وُلد في كازامانس",
      summary: "دجاج أو سمك متبّل بالليمون مع بصل مطهوّ طويلًا، يُقدَّم مع الأرز الأبيض.",
      description:
        "أصبح طبق الياسا، الذي يعود أصله إلى كازامانس، من أكثر الأطباق شعبية في السنغال: دجاج (أو سمك) يُتبّل بعصير الليمون ويُشوى ثم يُطهى على نار هادئة في صلصة من البصل المطهوّ طويلًا، مع الخردل والفلفل الحار، ويُقدَّم مع الأرز الأبيض. وفي كازامانس يُحضَّر أيضًا بمحار المانغروف.",
      tips: "اطلب «ياسا بوليه» أو «ياسا بواسون» في المطاعم الشعبية؛ وغالبًا ما يُقدَّم الفلفل الحار على حدة.",
    },
    "manufactures-arts-decoratifs-thies": {
      name: "المصانع السنغالية للفنون الزخرفية",
      summary: "ورشة للسجاد الفني أُنشئت عام 1966 بمبادرة من سنغور: أنوال وأعمال ضخمة.",
      description:
        "أُسّست المصانع السنغالية للفنون الزخرفية في تييس عام 1966 بمبادرة من ليوبولد سيدار سنغور، في سياق حركة «مدرسة داكار»، وهي تنسج يدويًا سجادًا جداريًا انطلاقًا من تصاميم فنانين سنغاليين. وقد تدرّب أوائل النسّاجين في مصنع غوبلان في باريس. وتعرض قاعة العرض أعمالًا زاهية الألوان، وكثيرًا ما يمكن مشاهدة النسّاجين أثناء عملهم.",
      tips: "استعلم مسبقًا عن إمكانية زيارة الورش؛ ويُباع السجاد بالطلب.",
    },
    "grande-mosquee-tivaouane": {
      name: "الجامع الكبير ومدينة تيفاوان الدينية",
      summary: "العاصمة الروحية للتيجانية في السنغال، حول أضرحة الحاج مالك سي.",
      description:
        "تيفاوان هي المركز الكبير للطريقة الصوفية التيجانية في السنغال منذ أن استقر فيها الحاج مالك سي في مطلع القرن العشرين. وحول الجامع الكبير ترتفع أضرحة أحفاده ومساكن الأسرة الدينية. وتستضيف المدينة كل عام «الغامو»، أي الاحتفال بالمولد النبوي، الذي يجمع حشودًا هائلة.",
      tips: "ملابس محتشمة وغطاء رأس للنساء؛ تعال خارج فترة الغامو لزيارة هادئة، برفقة أحد أفراد الجماعة.",
    },
    "abbaye-de-keur-moussa": {
      name: "دير كير موسى",
      summary: "دير بندكتي يشتهر بطقوسه المصحوبة بآلة الكورا.",
      description:
        "أسّسه عام 1961 رهبان قدموا من دير سوليم، وافتُتح عام 1963، ويشتهر دير كير موسى البندكتي، بين داكار وتييس، بتكييف طقوسه مع آلات غرب أفريقيا وألحانها: إذ تُرتَّل الصلوات على أنغام الكورا والبالافون. ويصنع الرهبان أيضًا آلات الكورا ويبيعون في متجرهم منتجات بستانهم، مثل المربّيات.",
      tips: "قدّاس الأحد، المزدحم كثيرًا، هو أفضل وقت لسماع الكورا؛ احضر مبكرًا والتزم الهدوء أثناء الصلوات.",
    },
    "plage-de-kayar": {
      name: "شاطئ الصيادين في كايار",
      summary: "ميناء كبير للصيد التقليدي على الساحل الكبير: مئات القوارب وسوق للسمك.",
      description:
        "على بعد نحو ستين كيلومترًا شمال داكار، تُعدّ كايار من أهم مراكز الصيد التقليدي في السنغال. على شاطئها الطويل تُسحب مئات القوارب الملوّنة إلى الرمل، وفي آخر النهار يثير إنزال السمك وبيعه حركة مدهشة. ويفسّر الأخدود البحري الغني بالأسماك قبالة الساحل أهمية هذا الميناء.",
      tips: "لا تسبح: البحر خطير على الساحل الكبير. استأذن قبل التصوير وابتعد عن القوارب أثناء المناورات.",
    },
    "desert-de-lompoul": {
      name: "صحراء لومبول",
      summary: "صحراء صغيرة من الكثبان المغرة على بعد كيلومترات من المحيط، بين داكار وسان لوي.",
      description:
        "في منطقة لوغا، بين كيبيمير ولومبول سور مير، تغطي صحراء لومبول نحو 18 كم² من كثبان الرمل الناعم بألوان مغرة وبرتقالية، يبلغ ارتفاع بعضها عشرات الأمتار. يأتيها الزوار لقضاء ليلة في خيمة بدوية وركوب الجمال ومشاهدة الغروب فوق الكثبان. محطة محبوبة على طريق سان لوي.",
      tips: "احمل سترة لليل الذي يكون باردًا في موسم الجفاف؛ واحجز مخيّمك مسبقًا واحمِ أجهزتك من الرمل.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "grande-mosquee-medina-baye-kaolack": {
      name: "الجامع الكبير في مدينة باي",
      summary: "مزار الشيخ إبراهيم نياس، مركز للتيجانية يقصده مريدون من أنحاء أفريقيا.",
      description:
        "في حيّ مدينة باي في كاولاك، يضم الجامع الكبير ضريح الشيخ إبراهيم نياس (1900-1975)، المعروف بباي نياس، وهو من كبار أعلام الطريقة التيجانية، ولحركته ملايين المريدين في نيجيريا وغانا والنيجر وغيرها. ويعيش الحيّ على إيقاع الصلوات وتعليم القرآن والزوار القادمين من أنحاء غرب أفريقيا، ولا سيما في أثناء الغامو.",
      tips: "ملابس محتشمة وغطاء رأس للنساء؛ اطلب مرافقة أحد أفراد الجماعة وتجنّب أوقات الصلاة.",
    },
    "cercles-megalithiques-sine-ngayene": {
      name: "الدوائر الحجرية في سين نغايين وونار",
      summary: "عشرات الدوائر من الحجارة المنتصبة يزيد عمرها على ألف عام، مدرجة في قائمة التراث العالمي.",
      description:
        "تضم الدوائر الحجرية في سينيغامبيا، المدرجة في قائمة التراث العالمي لليونسكو عام 2006، أكثر من ألف معلم على امتداد نهر غامبيا. وعلى الجانب السنغالي، تصطف في سين نغايين (52 دائرة، قرب نيورو دو ريب) وونار (21 دائرة، قرب كافرين) حجارة منحوتة من اللاتيريت يبلغ ارتفاعها نحو مترين، أُقيمت فوق مدافن تقريبًا بين القرنين السابع والخامس عشر.",
      tips: "المواقع منعزلة: تعال نهارًا مع سائق وماء وقبعة. لا تحرّك الحجارة ولا تتسلّقها.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "pays-bassari-kedougou": {
      name: "بلاد الباساري: المناظر الثقافية للباساري والفولاني والبيديك",
      summary: "قرى معلّقة ومدرّجات زراعية وطقوس تكريس حيّة، مدرجة في قائمة التراث العالمي لليونسكو.",
      description:
        "حول بندافاسي وساليماتا وإتيولو، شكّل الباساري والبيديك والفولاني مناظر من التلال تتخللها قرى من الأكواخ المستديرة ذات السقوف القشية وحقول مدرّجة ومواقع مقدسة. وهذه المناظر الثقافية، التي ما زالت تُمارس فيها طقوس التكريس والاحتفالات المقنّعة، مدرجة في قائمة التراث العالمي منذ 2012. وقرية إيوول التابعة للبيديك، المعلّقة على تلّة تعلوها شجرة قطن حريري عملاقة، من أكثر الزيارات إقبالًا.",
      tips: "اذهب مع مرشد من كيدوغو أو بندافاسي، واستأذن دائمًا زعيم القرية وقبل كل صورة؛ وارتدِ حذاءً جيدًا للصعود.",
      bestPeriod: "من نوفمبر إلى مايو",
    },
    "cascade-de-dindefelo": {
      name: "شلال ديندفيلو",
      summary: "شلال ارتفاعه نحو مئة متر في قاع وادٍ مشجّر، قرب الحدود الغينية.",
      description:
        "قرب قرية ديندفيلو، جنوب كيدوغو، يقود مشي قصير عبر غابة نهرية إلى شلال يبلغ ارتفاعه نحو 100 متر يصبّ في حوض تمكن السباحة فيه. والموقع، المصنّف الذي يديره مجتمع القرية، يأوي أيضًا جماعة من الشمبانزي تتابعها برامج للحماية.",
      tips: "يكون تدفّق المياه في أروع حالاته في نهاية موسم الأمطار (من سبتمبر إلى نوفمبر)، حين قد تكون المسالك صعبة. تُفرض رسوم دخول مجتمعية.",
      bestPeriod: "من أكتوبر إلى يناير",
    },
    "parc-national-niokolo-koba": {
      name: "متنزه نيوكولو كوبا الوطني",
      summary: "أكبر متنزه في البلاد، مدرج في قائمة اليونسكو: سافانا وغابات نهرية ونهر غامبيا.",
      description:
        "متنزه وطني منذ 1954، ومدرج في قائمة التراث العالمي ومحمية للمحيط الحيوي منذ 1981، يغطي نيوكولو كوبا قرابة مليون هكتار من السافانا والغابات النهرية والبرك على امتداد نهر غامبيا. يمكن مشاهدة الظباء والخنازير الثؤلولية والقردة وأفراس النهر والتماسيح وطيور كثيرة، أما الضواري الكبيرة فنادرة ومتخفية. أُدرج في قائمة التراث المهدد بالخطر عام 2007، ثم سُحب منها عام 2024 بفضل تحسّن صونه.",
      tips: "الزيارة بسيارة دفع رباعي مع مرشد معتمد انطلاقًا من تامباكوندا أو كيدوغو؛ ومعظم المسالك غير صالحة للسير في موسم الأمطار.",
      bestPeriod: "من ديسمبر إلى مايو",
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
