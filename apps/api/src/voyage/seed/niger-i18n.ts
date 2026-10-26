/**
 * Traductions du contenu de départ du guide Niger (voir ./niger.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de niger.ts. Contenu non relu : à vérifier comme le reste du seed.
 * Pas de circuit (pays formellement déconseillé) → `circuits` et `stepNotes` vides.
 */

import type { SeedI18n, SeedLang } from "./types";

const TIP_ES =
  "Las autoridades francesas y británicas desaconsejan actualmente de forma absoluta todo viaje a Níger: consulte sus recomendaciones de viaje antes de plantearse una visita.";
const TIP_PT =
  "As autoridades francesas e britânicas desaconselham atualmente, de forma formal, qualquer viagem ao Níger: consulte os respetivos conselhos aos viajantes antes de ponderar uma visita.";
const TIP_AR =
  "تنصح السلطات الفرنسية والبريطانية حاليًا بعدم السفر إلى النيجر إطلاقًا: راجِعوا إرشادات السفر الصادرة عنهما قبل التفكير في أي زيارة.";

const ES: SeedI18n = {
  guide: {
    intro:
      "Las autoridades francesas y británicas desaconsejan hoy de forma absoluta todo viaje a Níger: esta guía presenta su patrimonio para preparar un viaje el día en que las condiciones lo permitan. Porque el país tiene mucho que ofrecer: el casco antiguo de adobe de Agadez y su minarete, las montañas del Aïr y las dunas del Teneré, las últimas jirafas de África Occidental, los palacios de los sultanes de Zinder y el río Níger, que atraviesa Niamey.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado; las condiciones dependen de la nacionalidad y han cambiado varias veces en los últimos años, en particular desde la salida de Níger de la CEDEAO. Infórmese en una embajada o un consulado de Níger y compruebe los requisitos actualizados en las fuentes oficiales: pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país, sobre todo durante y después de la estación de lluvias: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos. El país se encuentra en el «cinturón de la meningitis»: a menudo se recomienda la vacunación. El fuerte calor obliga a beber mucha agua embotellada. Los centros sanitarios son limitados fuera de Niamey.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA). El efectivo es imprescindible: las tarjetas bancarias solo se aceptan en algunos grandes hoteles de Niamey y los cajeros son escasos fuera de la capital. El pago por móvil (mobile money) está en expansión.",
      },
      {
        title: "Cuándo ir",
        body: "La estación seca y relativamente fresca, de noviembre a febrero, es la más agradable, con el harmattan (viento seco y polvoriento) y noches frías en el desierto. De marzo a mayo el calor se vuelve extremo (a menudo más de 40 °C). La estación de lluvias va aproximadamente de junio a septiembre; reverdece el Sahel y termina, en el norte, con las grandes concentraciones de pastores de la Cure Salée.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua de la administración y de los negocios; el hausa y el zarma (djerma) son las lenguas más habladas, junto con el tamasheq (tuareg), el fulfulde (peul) y el kanuri, entre otras. La gran mayoría de la población es musulmana: ropa que cubra el cuerpo, discreción durante el ramadán y zapatos fuera antes de entrar en una mezquita (con autorización). Saludar largamente antes de pedir cualquier cosa es fundamental. El té a la menta, servido en tres vasos, acompaña cualquier encuentro. Pida siempre permiso antes de fotografiar a una persona; está prohibido fotografiar edificios oficiales y militares.",
      },
      {
        title: "Desplazarse",
        body: "En el contexto de seguridad actual, las fuentes oficiales desaconsejan de forma absoluta los desplazamientos por el país, incluidas las carreteras alrededor de Niamey; por eso esta guía no propone circuitos ni itinerarios. Los vuelos internacionales pueden suspenderse o modificarse sin previo aviso. Llegado el momento, infórmese ante las autoridades de su país y agencias locales reconocidas antes de cualquier desplazamiento.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo C, D, E y F. Los cortes de luz son frecuentes. Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil, con cobertura escasa o nula en el desierto.",
      },
      {
        title: "Seguridad",
        body: "En la fecha de redacción (octubre de 2026), France Diplomatie («Conseils aux voyageurs») y el FCDO británico («Foreign travel advice») desaconsejan de forma absoluta todo viaje a Níger, sea cual sea el motivo, incluida Niamey. Señalan un riesgo terrorista elevado en todo el país, un riesgo de secuestro de ciudadanos extranjeros, una situación política inestable desde el golpe de Estado de julio de 2023 y una asistencia consular muy limitada, o incluso imposible, sobre el terreno. Viajar en contra de estas recomendaciones también puede invalidar su seguro. Consulte estas fuentes (y las de su propio país) antes de cualquier decisión; se actualizan con regularidad.",
      },
    ],
  },
  destinations: {
    niamey: {
      summary: "Una capital tranquila a orillas del río Níger: gran museo al aire libre, mercados y cocina saheliana.",
      description:
        "Capital del país desde 1926, Niamey se extiende a lo largo del río Níger. Su museo nacional, a la vez museo, jardín, zoo y aldea de artesanos, es una de las principales instituciones culturales del Sahel; sus mercados y sus orillas, por donde pasan piraguas y hortelanos, resumen la vida cotidiana nigerina. Como el resto del país, la ciudad es hoy objeto de una recomendación francesa y británica de no viajar en absoluto.",
    },
    koure: {
      summary: "El refugio de las últimas jirafas de África Occidental, a unos sesenta kilómetros de Niamey.",
      description:
        "En la sabana que rodea el pueblo de Kouré, al sureste de Niamey, vive la última población de jirafas de África Occidental (Giraffa camelopardalis peralta). Reducida a una cincuentena de ejemplares en los años noventa, se salvó gracias a la protección de la especie y al compromiso de los aldeanos, que conviven con ella sin vallas. La zona está, como todo el país, en un sector desaconsejado de forma absoluta.",
    },
    "parc-w-niger-pays": {
      name: "Parque Nacional W (Níger)",
      summary: "La parte nigerina de un gran conjunto de sabanas protegidas compartido con Benín y Burkina Faso.",
      description:
        "El parque debe su nombre a los meandros en forma de W que dibuja el río Níger en su límite. Con los parques vecinos de Benín y Burkina Faso forma el complejo W-Arly-Pendjari, declarado Patrimonio Mundial por la UNESCO: sabanas, bosques de galería y humedales donde viven elefantes, búfalos, antílopes, hipopótamos y una avifauna muy rica. La zona es hoy una de las más expuestas a los grupos armados y está desaconsejada de forma absoluta.",
    },
    agadez: {
      summary: "La «puerta del desierto»: casco antiguo de adobe declarado Patrimonio de la UNESCO y un minarete emblemático.",
      description:
        "Encrucijada histórica de las caravanas transaharianas, Agadez es desde hace siglos la sede del sultanato del Aïr y una de las grandes ciudades tuaregs. Su centro histórico, inscrito en el Patrimonio Mundial de la UNESCO, es un laberinto de callejuelas y casas de tierra cruda dominado por el minarete de la gran mezquita. La ciudad es famosa también por sus orfebres y sus artesanos del cuero. Se encuentra en una zona desaconsejada de forma absoluta.",
    },
    "air-et-tenere": {
      name: "Aïr y Teneré",
      summary: "Montañas volcánicas, oasis, grabados rupestres y un océano de dunas en el corazón del Sáhara.",
      description:
        "Al noreste de Agadez, el macizo del Aïr alza sus montañas oscuras sobre el desierto, con sus valles, sus oasis y sus grabados rupestres; al este se extiende el Teneré, uno de los mayores desiertos de arena del Sáhara. Las reservas naturales del Aïr y el Teneré, entre las áreas protegidas más extensas de África, están inscritas en el Patrimonio Mundial de la UNESCO y en la lista del patrimonio en peligro. Región desaconsejada de forma absoluta.",
    },
    zinder: {
      summary: "Antigua capital del sultanato de Damagaram: palacio del sultán y ciudad vieja hausa.",
      description:
        "Segunda ciudad del país, Zinder fue la capital del sultanato de Damagaram y después la primera capital de la colonia de Níger hasta 1926. Su barrio antiguo, el Birni, conserva el palacio del sultán y casas de adobe adornadas con decoraciones en relieve características de la arquitectura hausa. La ciudad es también un gran centro comercial y artesanal (cuero, curtiduría). Se encuentra en una zona desaconsejada de forma absoluta.",
    },
    dosso: {
      summary: "Capital histórica del reino zarma: palacio del Zarmakoye, museo regional y tradición de la lucha.",
      description:
        "A unos 140 km al sureste de Niamey, Dosso fue la capital del reino zarma fundado en el siglo XVIII, cuya dinastía de los Zarmakoye (o Djermakoye) sigue reinando en el plano consuetudinario. La ciudad conserva el palacio del Zarmakoye, construido en 1904 e incluido con otros sitios en la lista indicativa de Níger para el Patrimonio Mundial, un museo regional y una arena de lucha tradicional. Como todo el país, se encuentra en una zona desaconsejada de forma absoluta.",
    },
    ayorou: {
      summary: "Pueblo a orillas del río Níger cerca de la frontera con Malí, célebre por su gran mercado del domingo.",
      description:
        "A unos 200 km al noroeste de Niamey, Ayorou se extiende por la orilla izquierda del río Níger y por una isla del mismo nombre. Refugio del soberano songhai Sonni Baro a finales del siglo XV, la ciudad era conocida por los viajeros por su mercado semanal y por los paisajes del río, donde viven hipopótamos y numerosas aves. La zona, próxima a la frontera con Malí, ha sufrido ataques mortíferos y está desaconsejada de forma absoluta.",
    },
    yaama: {
      summary: "Pueblo hausa de la región de Tahoua, célebre por su mezquita de tierra galardonada con el Premio Aga Khan.",
      description:
        "En la región de Tahoua, el pueblo de Yaama debe su fama a su mezquita del viernes, obra maestra de la arquitectura de tierra construida colectivamente por los aldeanos. Las mezquitas de tierra de la región de Tahoua figuran en la lista indicativa de Níger para el Patrimonio Mundial. Como todo el país, la zona está desaconsejada de forma absoluta.",
    },
    "kawar-djado": {
      name: "Kawar y Djado",
      summary: "Oasis del Sáhara oriental: salinas de Bilma, acantilados del Kawar y ksares abandonados de la meseta del Djado.",
      description:
        "En el extremo noreste del país, a más de 500 km de Agadez, el acantilado del Kawar alberga un rosario de oasis, entre ellos Bilma, célebre por sus salinas y punto final de las caravanas de sal (azalai) que llegaban del Aïr a través del Teneré. Más al norte, la meseta del Djado conserva grabados rupestres y las ruinas de ksares abandonados, incluidos en la lista indicativa de Níger para el Patrimonio Mundial. Región muy aislada y desaconsejada de forma absoluta.",
    },
  },
  places: {
    "musee-national-boubou-hama": {
      name: "Museo Nacional Boubou Hama",
      summary: "Museo al aire libre: pabellones temáticos, viviendas tradicionales, fósiles de dinosaurios y artesanos.",
      description:
        "Fundado a finales de los años cincuenta, el museo nacional lleva el nombre del político y escritor Boubou Hama. En un amplio parque, varios pabellones presentan trajes, instrumentos, armas y objetos de los distintos pueblos del país, reconstrucciones de viviendas tradicionales, fósiles de dinosaurios descubiertos en el desierto y los restos del Árbol del Teneré, la acacia solitaria convertida en leyenda. Un pequeño zoo y un centro de artesanía completan la visita.",
      tips: TIP_ES,
    },
    "grand-marche-niamey": {
      name: "Gran Mercado de Niamey",
      summary: "El principal mercado de la capital: telas, especias, cueros, cerámica y productos del Sahel.",
      description:
        "En el corazón de la ciudad, el gran mercado reúne cientos de puestos: telas wax y basin, especias, cuero trabajado, cerámica, cestería, joyas y productos llegados de todo el país. Una inmersión en el comercio saheliano, donde se cruzan comerciantes hausas, zarmas, tuaregs y peuls.",
      tips: TIP_ES,
    },
    "grande-mosquee-niamey": {
      name: "Gran Mezquita de Niamey",
      summary: "La principal mezquita de la capital, reconocible por su cúpula verde y su alto minarete.",
      description:
        "Principal lugar de culto de la ciudad, la gran mezquita reúne a los fieles en la oración del viernes y en las fiestas religiosas. Su cúpula verde y su minarete se distinguen desde lejos en el paisaje de la capital.",
      tips: `Lugar de oración: visita solo con autorización y con ropa que cubra el cuerpo. ${TIP_ES}`,
    },
    "fleuve-niger-niamey": {
      name: "Orillas del río Níger",
      summary: "El gran río saheliano, sus piraguas, sus huertos y sus puestas de sol.",
      description:
        "El río Níger atraviesa Niamey de noroeste a sureste. En sus orillas, pescadores, piragüeros y hortelanos marcan el ritmo del día, y las puestas de sol sobre el agua figuran entre las imágenes más bellas de la ciudad. En algunos tramos del río, aguas arriba y aguas abajo, viven hipopótamos.",
      tips: TIP_ES,
      bestPeriod: "Después de la estación de lluvias, cuando el río va crecido (final de año)",
    },
    "cuisine-nigerienne-niamey": {
      name: "Cocina nigerina",
      summary: "Kilichi, brochetas, bola de mijo, dambou y té a la menta: los sabores del Sahel.",
      description:
        "La cocina nigerina se basa en el mijo, el sorgo, el arroz y la carne. Se prueban el kilichi (finas tiras de carne seca y especiada), las brochetas a la parrilla, la «bola» de mijo acompañada de salsas de quimbombó o de hojas, el dambou (cuscús de mijo o de maíz con hojas de moringa) y bebidas como la fura. El té a la menta, servido en tres vasos, cierra la comida.",
      tips: TIP_ES,
    },
    "girafes-de-koure": {
      name: "Zona de las jirafas de Kouré",
      summary: "Observar a pie, con un guía del pueblo, jirafas en libertad entre los campos.",
      description:
        "Las jirafas de Kouré viven en libertad en un paisaje de sabana y cultivos compartido con los pueblos. Antes del deterioro de la seguridad, se las observaba a pie con guías locales, una experiencia excepcional. Su población, en aumento, cuenta ya con varios cientos de ejemplares y es objeto de seguimiento científico.",
      tips: `Zona desaconsejada de forma absoluta: en 2020 un ataque costó allí la vida a visitantes y a sus acompañantes. ${TIP_ES}`,
      bestPeriod: "Estación seca (de noviembre a mayo)",
    },
    "faune-parc-w-niger-pays": {
      name: "Fauna y sabanas del W",
      summary: "Elefantes, búfalos, antílopes y grandes rapaces en una de las últimas grandes sabanas de África Occidental.",
      description:
        "El parque alberga una de las faunas más ricas de la región: elefantes, búfalos, antílopes ruanos, cobos, facóqueros, monos, felinos discretos y varios cientos de especies de aves. Antes del deterioro de la situación se recorría en la estación seca, cuando los animales se concentran cerca de los puntos de agua.",
      tips: `Zona desaconsejada de forma absoluta, especialmente expuesta a los grupos armados. ${TIP_ES}`,
      bestPeriod: "Estación seca (de diciembre a mayo)",
    },
    "meandres-du-w-niger-pays": {
      name: "Meandros del río Níger",
      summary: "El río en forma de W que dio nombre al parque, bordeado de bosques de galería.",
      description:
        "En el límite del parque, el río Níger describe una serie de meandros cerrados en forma de W. Sus orillas, cubiertas de bosques de galería, atraen a hipopótamos, cocodrilos y aves acuáticas, y ofrecen algunos de los paisajes más verdes del país.",
      tips: TIP_ES,
    },
    "grande-mosquee-agadez": {
      name: "Gran Mezquita de Agadez",
      summary: "Su minarete piramidal de adobe, erizado de vigas de madera, es el símbolo de la ciudad.",
      description:
        "Con casi treinta metros de altura, el minarete de la gran mezquita es una de las construcciones de tierra cruda más altas del mundo. Su silueta piramidal, erizada de vigas de madera que sirven de andamio durante los revoques periódicos, domina la ciudad vieja y el desierto circundante.",
      tips: `Lugar de culto: visita solo con autorización y con ropa que cubra el cuerpo. ${TIP_ES}`,
    },
    "centre-historique-agadez": {
      name: "Centro histórico de Agadez",
      summary: "Un laberinto de casas de tierra cruda, palacios y callejuelas inscrito en el Patrimonio Mundial.",
      description:
        "Organizado en barrios heredados de la época de las caravanas, el centro histórico conserva su trazado antiguo, sus casas de adobe con fachadas a veces decoradas, el palacio del sultán y numerosas viviendas tradicionales. Inscrito en el Patrimonio Mundial de la UNESCO en 2013, ilustra la arquitectura de tierra saheliana y el papel de Agadez en el comercio transahariano.",
      tips: TIP_ES,
    },
    "artisans-agadez": {
      name: "Orfebres y artesanos de Agadez",
      summary: "Cruces de Agadez de plata, cuero trabajado y sillas de camello: el saber hacer tuareg.",
      description:
        "Los herreros-orfebres tuaregs de Agadez perpetúan una artesanía famosa en todo el Sahel, empezando por la cruz de Agadez, colgante de plata convertido en emblema. Marroquineros y fabricantes de sillas de camello y de cofres de cuero decorados completan esta artesanía, durante mucho tiempo orientada a los viajeros.",
      tips: TIP_ES,
    },
    "massif-de-l-air": {
      name: "Macizo del Aïr",
      summary: "Montañas volcánicas, valles verdes y pueblos-oasis tuaregs.",
      description:
        "El macizo del Aïr es un conjunto de montañas y mesetas de origen volcánico, surcado por valles (koris) donde el agua permite huertos y palmerales. Allí se encuentran pueblos-oasis tuaregs, una flora y una fauna adaptadas al desierto e innumerables yacimientos de grabados rupestres.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    "desert-du-tenere": {
      name: "Desierto del Teneré",
      summary: "Un océano de arena y dunas, recorrido durante siglos por las caravanas de la sal.",
      description:
        "El Teneré, «el desierto» en tamasheq, es una inmensa extensión de arena y dunas al este del Aïr. Durante mucho tiempo lo surcaron las caravanas de dromedarios (azalai) que iban a buscar la sal de Bilma. Su árbol solitario, el Árbol del Teneré, era un punto de referencia para los caravaneros; sus restos se conservan en el museo nacional de Niamey.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    "girafes-de-dabous": {
      name: "Jirafas de Dabous",
      summary: "Dos jirafas grabadas a tamaño natural sobre un afloramiento rocoso, obra maestra del arte rupestre sahariano.",
      description:
        "Sobre un afloramiento de arenisca en el borde del Aïr, dos jirafas grabadas hace varios milenios, la mayor de unos seis metros, figuran entre los grabados rupestres más grandes y hermosos que se conocen. Dan testimonio de una época en la que el Sáhara era una sabana. Se realizó una réplica para dar a conocer el sitio y protegerlo.",
      tips: TIP_ES,
    },
    "cure-salee-ingall": {
      name: "Cure Salée de In-Gall",
      summary: "Gran concentración anual de pastores tuaregs y peuls al final de la estación de lluvias.",
      description:
        "Cada año, al final de la estación de lluvias, los pastores tuaregs y peuls llevan sus rebaños a las tierras y fuentes salinas de la región de In-Gall. La Cure Salée («cura de sal») va acompañada de festejos: carreras de camellos, música, danzas y, entre los peuls wodaabe, el Gerewol, célebre concurso de belleza masculina.",
      tips: TIP_ES,
      bestPeriod: "Final de la estación de lluvias (finales de septiembre o principios de octubre)",
    },
    "palais-du-sultan-zinder": {
      name: "Palacio del sultán de Zinder",
      summary: "La residencia de los sultanes de Damagaram, en el corazón del barrio del Birni.",
      description:
        "Construido en tierra cruda, el palacio del sultán es el corazón histórico y simbólico de Zinder. Residencia de los sultanes de Damagaram, cuya dinastía sigue existiendo, acoge las ceremonias tradicionales y, durante las grandes fiestas, desfiles de jinetes con atuendo de gala.",
      tips: TIP_ES,
    },
    "birni-zinder": {
      name: "Barrio del Birni",
      summary: "La ciudad vieja hausa y sus fachadas de adobe adornadas con motivos en relieve.",
      description:
        "El Birni, antigua ciudad amurallada, es un conjunto de callejuelas y recintos familiares de tierra cruda. Muchas fachadas lucen decoraciones en relieve, geométricas o figurativas, típicas de la arquitectura hausa, que se renuevan con cada revoque. Un paseo por la historia urbana del Sahel.",
      tips: TIP_ES,
    },
    "grand-marche-zinder": {
      name: "Gran Mercado de Zinder",
      summary: "Un gran mercado regional donde se cruzan pastores, artesanos y comerciantes llegados de la vecina Nigeria.",
      description:
        "Encrucijada comercial entre el Sahel y la vecina Nigeria, Zinder cuenta con un gran mercado donde se encuentran ganado, cereales, especias, telas y, sobre todo, los cueros y artículos de marroquinería que dan fama a la ciudad.",
      tips: TIP_ES,
    },
    "cathedrale-niamey": {
      name: "Catedral de Nuestra Señora del Perpetuo Socorro",
      summary: "La catedral de Niamey, sede de la archidiócesis, de arquitectura moderna de hormigón y grandes cruces.",
      description:
        "Principal lugar de culto católico del país, la catedral de Nuestra Señora del Perpetuo Socorro es la sede de la archidiócesis de Niamey (diócesis en 1961, archidiócesis en 2007). Su edificio moderno, precedido de una alta cruz, reúne a la comunidad cristiana, minoritaria en Níger, sobre todo en Navidad y Pascua.",
      tips: `Lugar de culto: vestimenta adecuada y discreción durante los oficios. ${TIP_ES}`,
    },
    "centre-culturel-oumarou-ganda": {
      name: "Centro Cultural Oumarou Ganda",
      summary: "El gran complejo cultural público de Niamey: sala de espectáculos, biblioteca, conciertos y proyecciones.",
      description:
        "Bautizado en 1981 en homenaje al cineasta nigerino Oumarou Ganda (Cabascabo, Le Wazzou polygame), este complejo cultural reúne un espacio escénico y una biblioteca. Acoge conciertos, teatro, proyecciones y actos culturales, y es uno de los lugares de ocio cultural de la capital.",
      tips: `Programación anunciada localmente (prensa, redes sociales). ${TIP_ES}`,
    },
    "village-artisanal-wadata": {
      name: "Aldea artesanal de Wadata",
      summary: "La aldea de los artesanos de Niamey: cuero, cestería, joyas y tejidos, comprados directamente a sus creadores.",
      description:
        "En el barrio de Wadata, la aldea artesanal agrupa talleres y tiendas de artesanos: marroquinería y pufs de cuero, cestería, joyas y cruces tuaregs de plata, tejidos y tallas. Se puede ver a los artesanos trabajando y comprar directamente a los creadores, en un ambiente más tranquilo que el de los grandes mercados.",
      tips: `El regateo es habitual; pida permiso antes de fotografiar a los artesanos. ${TIP_ES}`,
    },
    "palais-du-sultan-agadez": {
      name: "Palacio del sultán del Aïr",
      summary: "La residencia del sultán de Agadez, guardián de las tradiciones del Aïr, al pie de la gran mezquita.",
      description:
        "En el corazón de la ciudad vieja, a dos pasos de la gran mezquita, el palacio de adobe es la residencia del sultán del Aïr, autoridad tradicional y religiosa todavía muy respetada. Sus gruesos muros de tierra erizados de madera recuerdan la arquitectura del minarete. En su patio concluye cada año la fiesta del Bianou.",
      tips: `Edificio habitado: se admira desde el exterior; el patio solo se visita con autorización. ${TIP_ES}`,
    },
    "maison-heinrich-barth-agadez": {
      name: "Casa de Heinrich Barth",
      summary: "La casa de adobe donde se alojó en 1850 el explorador alemán Heinrich Barth, primer europeo en Agadez.",
      description:
        "En octubre de 1850, el explorador alemán Heinrich Barth, en camino de Trípoli a Kano, pasó casi un mes en Agadez; una placa colocada en 1966 recuerda que fue el primer europeo en entrar en la ciudad. Su casa de tierra, en la ciudad vieja, todavía se puede visitar, y sus relatos siguen siendo una fuente valiosa sobre la historia de la ciudad y del Sahel.",
      tips: TIP_ES,
    },
    "oasis-de-timia": {
      name: "Oasis de Timia",
      summary: "Pueblo-oasis en el corazón del Aïr: huertos, cítricos y palmeras, una guelta y una cascada estacional.",
      description:
        "A unos 220 km al noreste de Agadez, Timia se presenta a menudo como el oasis más bello del Aïr. Sus huertos de regadío producen hortalizas, cereales, cítricos y dátiles al pie de montañas oscuras. En el valle, una guelta (poza de agua permanente) y una cascada que corre después de las lluvias, así como el fuerte Massu construido en 1951, completan el paisaje.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    iferouane: {
      name: "Iférouane",
      summary: "Oasis tuareg del norte del Aïr, al pie de las Montañas Azules, cuna del Festival del Aïr.",
      description:
        "En el valle del Ighazar, al norte del macizo, Iférouane es un oasis de huertos y palmeras que fue durante mucho tiempo un foco principal de la cultura tuareg. Es conocido por el Festival del Aïr, organizado desde 2001, y por los paisajes que lo rodean: las Montañas Azules de rocas veteadas, el monte Tamgak y numerosos sitios de grabados rupestres.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    "monument-arbre-du-tenere": {
      name: "Monumento del Árbol del Teneré",
      summary: "Una escultura de metal marca, en pleno desierto, el lugar de la acacia solitaria desaparecida en 1973.",
      description:
        "Durante siglos, una acacia aislada, cuyas raíces alcanzaban el agua subterránea a más de 30 metros, sirvió de referencia a las caravanas que cruzaban el Teneré, a unos 235 km al noreste de Agadez. Derribada por un camión en 1973, fue trasladada al museo nacional de Niamey; desde 1975, un árbol estilizado de metal marca su emplazamiento junto a un pozo, como un faro en medio de la arena.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    "ruines-d-assode": {
      name: "Ruinas de Assodé",
      summary: "Los restos de piedra de la antigua capital de los tuaregs del Aïr, en el corazón del macizo.",
      description:
        "Fundada, según la tradición, hacia finales del siglo IX, Assodé fue probablemente la primera capital de los tuaregs del Aïr antes de que el poder se trasladara a Agadez. Sus habitantes la abandonaron progresivamente; queda un conjunto de casas de piedra volcánica y una mezquita rectangular de unos treinta metros. Un pozo pastoral cercano sigue atrayendo a los dromedarios y asnos de los pastores.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    "palais-du-zarmakoye-dosso": {
      name: "Palacio del Zarmakoye",
      summary: "El palacio de los soberanos zarma de Dosso, de fachadas blancas adornadas con motivos azules.",
      description:
        "Construido en 1904, el palacio es la residencia del Zarmakoye, jefe tradicional de Dosso. Sus largas fachadas con decoración geométrica, su portal monumental y su fada (sala de audiencias) ilustran la arquitectura de las cortes reales del Sahel. Figura en la lista indicativa de Níger para el Patrimonio Mundial de la UNESCO y sigue siendo el escenario de las grandes ceremonias consuetudinarias.",
      tips: `Residencia habitada: la visita del interior requiere la autorización de la jefatura. ${TIP_ES}`,
    },
    "musee-regional-djermakoye-dosso": {
      name: "Museo regional Djermakoye",
      summary: "El museo de Dosso: historia del reino zarma, armas antiguas, instrumentos y centro artesanal.",
      description:
        "El museo regional Djermakoye presenta la historia del reino de Dosso y de sus soberanos: retratos, armas antiguas, instrumentos de música de corte como el kakaki y objetos de la vida cotidiana. Su recinto alberga también un centro artesanal donde se encuentran tejidos, cueros y cerámica de la región.",
      tips: TIP_ES,
    },
    "marche-d-ayorou": {
      name: "Mercado de Ayorou",
      summary: "El gran mercado del domingo, donde confluyen piraguas, rebaños y comerciantes de varios países.",
      description:
        "Los domingos, el mercado invade gran parte de la ciudad y atrae a miles de comerciantes y ganaderos de Níger, Malí, Burkina Faso y Nigeria. Allí se intercambian ganado, cereales, pescado del río, esteras, cerámica y telas, mientras las piraguas traen mercancías y habitantes de las islas vecinas.",
      tips: `Zona especialmente expuesta, próxima a la frontera con Malí. ${TIP_ES}`,
    },
    "mosquee-de-yaama": {
      name: "Mezquita de Yaama",
      summary: "Mezquita de adobe de estilo hausa, coronada por una cúpula y cuatro minaretes, Premio Aga Khan 1986.",
      description:
        "Iniciada en 1962, la mezquita de Yaama fue construida por toda la comunidad: donación del terreno, fabricación de los ladrillos de tierra, transporte del agua y de la madera. Ampliada con los años con una cúpula central y cuatro minaretes en las esquinas, ilustra el estilo sudano-saheliano en su variante hausa y recibió el Premio Aga Khan de Arquitectura en 1986.",
      tips: `Lugar de culto: visita solo con autorización y con ropa que cubra el cuerpo. ${TIP_ES}`,
    },
    "salines-de-kalala-bilma": {
      name: "Salinas de Kalala",
      summary: "Cientos de pozas excavadas a mano donde la sal se extrae como hace siglos.",
      description:
        "A las puertas de Bilma, las salinas de Kalala alinean cientos de pozas excavadas a mano: el agua salobre que sube del subsuelo deposita la sal, que después se moldea en panes o conos. Esta sal, intercambiada durante siglos por el mijo de los caravaneros tuaregs, sale hoy sobre todo en camión. El «mai», autoridad tradicional, asigna las parcelas y fija los precios.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
    "ksar-de-djado": {
      name: "Ksar de Djado",
      summary: "Una ciudad fortificada en ruinas que se alza sobre un palmeral, al sur de la meseta del Djado.",
      description:
        "Al sur de la meseta del Djado, en un pequeño oasis de agua salobre, las ruinas de una ciudad fortificada de tierra y piedra dominan un palmeral cuidado por nómadas tubu. La ciudad, abandonada desde hace mucho tiempo, habría sido fundada por los kanuri. La meseta circundante es famosa por sus grabados y pinturas rupestres que representan una fauna desaparecida de la región.",
      tips: TIP_ES,
      bestPeriod: "Estación fresca (de noviembre a febrero)",
    },
  },
  circuits: {},
  stepNotes: {},
};

const PT: SeedI18n = {
  guide: {
    intro:
      "As autoridades francesas e britânicas desaconselham hoje, de forma formal, qualquer viagem ao Níger: este guia apresenta o seu património para preparar uma viagem no dia em que as condições o permitirem. Porque o país tem muito para oferecer: a cidade velha em adobe de Agadez e o seu minarete, as montanhas do Aïr e as dunas do Ténéré, as últimas girafas da África Ocidental, os palácios dos sultões de Zinder e o rio Níger, que atravessa Niamey.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto; as condições dependem da nacionalidade e mudaram várias vezes nos últimos anos, nomeadamente desde a saída do Níger da CEDEAO. Informe-se junto de uma embaixada ou de um consulado do Níger e confirme as condições atualizadas nas fontes oficiais: passaporte válido vários meses após o regresso, bilhete de regresso, morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "O certificado de vacinação contra a febre-amarela é exigido à entrada. O paludismo está presente em todo o país, sobretudo durante e após a estação das chuvas: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos. O país situa-se na «cintura da meningite»: a vacinação é frequentemente recomendada. O calor intenso obriga a beber muita água engarrafada. As estruturas de saúde são limitadas fora de Niamey.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa face ao euro (1 € = 655,957 francos CFA). O dinheiro em numerário é indispensável: os cartões bancários só são aceites em alguns grandes hotéis de Niamey e as caixas automáticas são raras fora da capital. O pagamento por telemóvel (mobile money) está a crescer.",
      },
      {
        title: "Quando ir",
        body: "A estação seca e relativamente fresca, de novembro a fevereiro, é a mais agradável, com o harmatão (vento seco e poeirento) e noites frias no deserto. De março a maio, o calor torna-se extremo (muitas vezes acima de 40 °C). A estação das chuvas decorre aproximadamente de junho a setembro; faz reverdecer o Sahel e termina, no norte, com as grandes concentrações de pastores da Cure Salée.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua da administração e dos negócios; o hauçá e o zarma (djerma) são as línguas mais faladas, a par do tamasheq (tuaregue), do fula (fulfulde) e do kanuri, entre outras. A grande maioria da população é muçulmana: roupa que cubra o corpo, discrição durante o Ramadão e sapatos descalçados antes de entrar numa mesquita (com autorização). Cumprimentar demoradamente antes de qualquer pedido é essencial. O chá de hortelã, servido em três copos, acompanha qualquer encontro. Peça sempre autorização antes de fotografar uma pessoa; é proibido fotografar edifícios oficiais e militares.",
      },
      {
        title: "Deslocações",
        body: "No contexto de segurança atual, as fontes oficiais desaconselham formalmente as deslocações no país, incluindo nas estradas em redor de Niamey; por isso, este guia não propõe circuitos nem itinerários. Os voos internacionais podem ser suspensos ou alterados sem aviso prévio. Quando chegar o momento, informe-se junto das autoridades do seu país e de agências locais reconhecidas antes de qualquer deslocação.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas dos tipos C, D, E e F. Os cortes de energia são frequentes. Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel, com cobertura fraca ou inexistente no deserto.",
      },
      {
        title: "Segurança",
        body: "À data da redação (outubro de 2026), a France Diplomatie («Conseils aux voyageurs») e o FCDO britânico («Foreign travel advice») desaconselham formalmente qualquer viagem ao Níger, seja qual for o motivo, incluindo Niamey. Referem um risco terrorista elevado em todo o país, um risco de rapto de cidadãos estrangeiros, uma situação política instável desde o golpe de Estado de julho de 2023 e uma assistência consular muito limitada, ou mesmo impossível, no terreno. Viajar contra estes conselhos pode também invalidar o seu seguro. Consulte estas fontes (e as do seu próprio país) antes de qualquer decisão; são atualizadas regularmente.",
      },
    ],
  },
  destinations: {
    niamey: {
      summary: "Uma capital tranquila nas margens do rio Níger: grande museu ao ar livre, mercados e cozinha saheliana.",
      description:
        "Capital do país desde 1926, Niamey estende-se ao longo do rio Níger. O seu museu nacional, ao mesmo tempo museu, jardim, jardim zoológico e aldeia de artesãos, é uma das grandes instituições culturais do Sahel; os seus mercados e as suas margens, por onde passam pirogas e hortelãos, resumem o quotidiano nigerino. Tal como o resto do país, a cidade é hoje objeto de um conselho francês e britânico formalmente desfavorável a qualquer viagem.",
    },
    koure: {
      summary: "O refúgio das últimas girafas da África Ocidental, a cerca de sessenta quilómetros de Niamey.",
      description:
        "Na savana em redor da aldeia de Kouré, a sudeste de Niamey, vive a última população de girafas da África Ocidental (Giraffa camelopardalis peralta). Reduzida a cerca de cinquenta animais nos anos 1990, foi salva graças à proteção da espécie e ao empenho dos aldeões, que convivem com ela sem vedações. A zona encontra-se, como todo o país, num setor formalmente desaconselhado.",
    },
    "parc-w-niger-pays": {
      name: "Parque Nacional do W (Níger)",
      summary: "A parte nigerina de um vasto conjunto de savanas protegidas partilhado com o Benim e o Burquina Faso.",
      description:
        "O parque deve o seu nome aos meandros em forma de W que o rio Níger desenha no seu limite. Com os parques vizinhos do Benim e do Burquina Faso, forma o complexo W-Arly-Pendjari, classificado Património Mundial da UNESCO: savanas, florestas-galeria e zonas húmidas onde vivem elefantes, búfalos, antílopes, hipopótamos e uma avifauna muito rica. A zona é hoje uma das mais expostas a grupos armados e está formalmente desaconselhada.",
    },
    agadez: {
      summary: "A «porta do deserto»: cidade velha em adobe classificada pela UNESCO e um minarete emblemático.",
      description:
        "Encruzilhada histórica das caravanas transarianas, Agadez é há séculos a sede do sultanato do Aïr e uma das grandes cidades tuaregues. O seu centro histórico, inscrito no Património Mundial da UNESCO, é um labirinto de ruelas e casas de terra crua dominado pelo minarete da grande mesquita. A cidade é também famosa pelos seus ourives e artesãos do couro. Situa-se numa zona formalmente desaconselhada.",
    },
    "air-et-tenere": {
      name: "Aïr e Ténéré",
      summary: "Montanhas vulcânicas, oásis, gravuras rupestres e um oceano de dunas no coração do Sara.",
      description:
        "A nordeste de Agadez, o maciço do Aïr ergue as suas montanhas escuras acima do deserto, com vales, oásis e gravuras rupestres; a leste estende-se o Ténéré, um dos maiores desertos de areia do Sara. As reservas naturais do Aïr e do Ténéré, entre as maiores áreas protegidas de África, estão inscritas no Património Mundial da UNESCO e na lista do património em perigo. Região formalmente desaconselhada.",
    },
    zinder: {
      summary: "Antiga capital do sultanato de Damagaram: palácio do sultão e cidade velha hauçá.",
      description:
        "Segunda cidade do país, Zinder foi a capital do sultanato de Damagaram e depois a primeira capital da colónia do Níger até 1926. O seu bairro antigo, o Birni, conserva o palácio do sultão e casas de adobe ornamentadas com decorações em relevo características da arquitetura hauçá. A cidade é também um grande centro comercial e artesanal (couro, curtumes). Situa-se numa zona formalmente desaconselhada.",
    },
    dosso: {
      summary: "Capital histórica do reino zarma: palácio do Zarmakoye, museu regional e tradição da luta.",
      description:
        "A cerca de 140 km a sudeste de Niamey, Dosso foi a capital do reino zarma fundado no século XVIII, cuja dinastia dos Zarmakoye (ou Djermakoye) continua a reinar no plano consuetudinário. A cidade conserva o palácio do Zarmakoye, construído em 1904 e incluído, com outros sítios, na lista indicativa do Níger ao Património Mundial, um museu regional e uma arena de luta tradicional. Como todo o país, situa-se numa zona formalmente desaconselhada.",
    },
    ayorou: {
      summary: "Povoação do rio Níger perto da fronteira com o Mali, célebre pelo seu grande mercado de domingo.",
      description:
        "A cerca de 200 km a noroeste de Niamey, Ayorou estende-se pela margem esquerda do rio Níger e por uma ilha com o mesmo nome. Refúgio do soberano songhai Sonni Baro no final do século XV, a cidade era conhecida dos viajantes pelo mercado semanal e pelas paisagens do rio, onde vivem hipopótamos e muitas aves. A zona, próxima da fronteira com o Mali, sofreu ataques mortíferos e está formalmente desaconselhada.",
    },
    yaama: {
      summary: "Aldeia hauçá da região de Tahoua, célebre pela sua mesquita de terra galardoada com o Prémio Aga Khan.",
      description:
        "Na região de Tahoua, a aldeia de Yaama deve a sua fama à mesquita de sexta-feira, obra-prima da arquitetura de terra construída coletivamente pelos aldeões. As mesquitas de terra da região de Tahoua constam da lista indicativa do Níger ao Património Mundial. Como todo o país, a zona está formalmente desaconselhada.",
    },
    "kawar-djado": {
      name: "Kawar e Djado",
      summary: "Oásis do Sara oriental: salinas de Bilma, falésias do Kawar e ksares abandonados do planalto do Djado.",
      description:
        "No extremo nordeste do país, a mais de 500 km de Agadez, a falésia do Kawar abriga um rosário de oásis, entre os quais Bilma, célebre pelas salinas e ponto final das caravanas do sal (azalai) que vinham do Aïr através do Teneré. Mais a norte, o planalto do Djado conserva gravuras rupestres e as ruínas de ksares abandonados, incluídos na lista indicativa do Níger ao Património Mundial. Região muito isolada e formalmente desaconselhada.",
    },
  },
  places: {
    "musee-national-boubou-hama": {
      name: "Museu Nacional Boubou Hama",
      summary: "Museu ao ar livre: pavilhões temáticos, habitações tradicionais, fósseis de dinossauros e artesãos.",
      description:
        "Fundado no final dos anos 1950, o museu nacional tem o nome do político e escritor Boubou Hama. Num vasto parque, pavilhões apresentam trajes, instrumentos, armas e objetos dos diferentes povos do país, reconstituições de habitações tradicionais, fósseis de dinossauros descobertos no deserto e os restos da Árvore do Ténéré, a acácia solitária que se tornou lendária. Um pequeno jardim zoológico e um centro de artesanato completam a visita.",
      tips: TIP_PT,
    },
    "grand-marche-niamey": {
      name: "Grande Mercado de Niamey",
      summary: "O principal mercado da capital: tecidos, especiarias, couros, olaria e produtos do Sahel.",
      description:
        "No coração da cidade, o grande mercado reúne centenas de bancas: tecidos wax e basin, especiarias, couro trabalhado, olaria, cestaria, joias e produtos vindos de todo o país. Uma imersão no comércio saheliano, onde se cruzam comerciantes hauçás, zarmas, tuaregues e fulas.",
      tips: TIP_PT,
    },
    "grande-mosquee-niamey": {
      name: "Grande Mesquita de Niamey",
      summary: "A principal mesquita da capital, reconhecível pela cúpula verde e pelo alto minarete.",
      description:
        "Principal local de culto da cidade, a grande mesquita reúne os fiéis na oração de sexta-feira e nas festas religiosas. A sua cúpula verde e o seu minarete avistam-se de longe na paisagem da capital.",
      tips: `Local de oração: visita apenas com autorização e com roupa que cubra o corpo. ${TIP_PT}`,
    },
    "fleuve-niger-niamey": {
      name: "Margens do rio Níger",
      summary: "O grande rio saheliano, as suas pirogas, as suas hortas e os seus pores do sol.",
      description:
        "O rio Níger atravessa Niamey de noroeste para sudeste. Nas suas margens, pescadores, barqueiros e hortelãos marcam o ritmo do dia, e os pores do sol sobre a água estão entre as imagens mais belas da cidade. Em alguns troços do rio, a montante e a jusante, vivem hipopótamos.",
      tips: TIP_PT,
      bestPeriod: "Depois da estação das chuvas, quando o rio está cheio (fim do ano)",
    },
    "cuisine-nigerienne-niamey": {
      name: "Cozinha nigerina",
      summary: "Kilichi, espetadas, bola de milho-miúdo, dambou e chá de hortelã: os sabores do Sahel.",
      description:
        "A cozinha nigerina assenta no milho-miúdo, no sorgo, no arroz e na carne. Provam-se o kilichi (tiras finas de carne seca e condimentada), as espetadas grelhadas, a «bola» de milho-miúdo acompanhada de molhos de quiabo ou de folhas, o dambou (cuscuz de milho-miúdo ou de milho com folhas de moringa) e bebidas como a fura. O chá de hortelã, servido em três copos, encerra a refeição.",
      tips: TIP_PT,
    },
    "girafes-de-koure": {
      name: "Zona das girafas de Kouré",
      summary: "Observar a pé, com um guia da aldeia, girafas em liberdade no meio dos campos.",
      description:
        "As girafas de Kouré vivem em liberdade numa paisagem de savana e de culturas partilhada com as aldeias. Antes da degradação da situação de segurança, eram observadas a pé com guias locais, uma experiência rara. A sua população, em crescimento, conta agora várias centenas de animais e é objeto de acompanhamento científico.",
      tips: `Zona formalmente desaconselhada: em 2020, um ataque custou ali a vida a visitantes e aos seus acompanhantes. ${TIP_PT}`,
      bestPeriod: "Estação seca (de novembro a maio)",
    },
    "faune-parc-w-niger-pays": {
      name: "Fauna e savanas do W",
      summary: "Elefantes, búfalos, antílopes e grandes aves de rapina numa das últimas grandes savanas da África Ocidental.",
      description:
        "O parque abriga uma das faunas mais ricas da região: elefantes, búfalos, palancas-ruanas, cobos, javalis-africanos, macacos, felinos discretos e várias centenas de espécies de aves. Antes da degradação da situação, era visitado na estação seca, quando os animais se concentram junto aos pontos de água.",
      tips: `Zona formalmente desaconselhada, particularmente exposta a grupos armados. ${TIP_PT}`,
      bestPeriod: "Estação seca (de dezembro a maio)",
    },
    "meandres-du-w-niger-pays": {
      name: "Meandros do rio Níger",
      summary: "O rio em forma de W que deu nome ao parque, ladeado de florestas-galeria.",
      description:
        "No limite do parque, o rio Níger descreve uma série de meandros apertados em forma de W. As suas margens, cobertas de florestas-galeria, atraem hipopótamos, crocodilos e aves aquáticas, e oferecem algumas das paisagens mais verdejantes do país.",
      tips: TIP_PT,
    },
    "grande-mosquee-agadez": {
      name: "Grande Mesquita de Agadez",
      summary: "O seu minarete piramidal em adobe, eriçado de vigas de madeira, é o símbolo da cidade.",
      description:
        "Com quase trinta metros de altura, o minarete da grande mesquita é uma das construções em terra crua mais altas do mundo. A sua silhueta piramidal, eriçada de vigas de madeira que servem de andaime durante os rebocos periódicos, domina a cidade velha e o deserto em redor.",
      tips: `Local de culto: visita apenas com autorização e com roupa que cubra o corpo. ${TIP_PT}`,
    },
    "centre-historique-agadez": {
      name: "Centro histórico de Agadez",
      summary: "Um labirinto de casas de terra crua, palácios e ruelas inscrito no Património Mundial.",
      description:
        "Organizado em bairros herdados da época das caravanas, o centro histórico conserva o seu traçado antigo, as suas casas de adobe com fachadas por vezes decoradas, o palácio do sultão e numerosas habitações tradicionais. Inscrito no Património Mundial da UNESCO em 2013, ilustra a arquitetura de terra saheliana e o papel de Agadez no comércio transariano.",
      tips: TIP_PT,
    },
    "artisans-agadez": {
      name: "Ourives e artesãos de Agadez",
      summary: "Cruzes de Agadez em prata, couro trabalhado e selas de camelo: o saber-fazer tuaregue.",
      description:
        "Os ferreiros-ourives tuaregues de Agadez perpetuam um artesanato reputado em todo o Sahel, a começar pela cruz de Agadez, pendente de prata que se tornou um emblema. Marroquineiros e fabricantes de selas de camelo e de arcas de couro decoradas completam este artesanato, durante muito tempo voltado para os viajantes.",
      tips: TIP_PT,
    },
    "massif-de-l-air": {
      name: "Maciço do Aïr",
      summary: "Montanhas vulcânicas, vales verdejantes e aldeias-oásis tuaregues.",
      description:
        "O maciço do Aïr é um conjunto de montanhas e planaltos de origem vulcânica, recortado por vales (koris) onde a água permite hortas e palmeirais. Aí se encontram aldeias-oásis tuaregues, uma flora e uma fauna adaptadas ao deserto e inúmeros sítios de gravuras rupestres.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    "desert-du-tenere": {
      name: "Deserto do Ténéré",
      summary: "Um oceano de areia e dunas, durante muito tempo atravessado pelas caravanas do sal.",
      description:
        "O Ténéré, «o deserto» em tamasheq, é uma imensa extensão de areia e dunas a leste do Aïr. Foi durante muito tempo percorrido pelas caravanas de dromedários (azalai) que iam buscar o sal de Bilma. A sua árvore solitária, a Árvore do Ténéré, era um ponto de referência para os caravaneiros; os seus restos estão conservados no museu nacional de Niamey.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    "girafes-de-dabous": {
      name: "Girafas de Dabous",
      summary: "Duas girafas gravadas em tamanho real num afloramento rochoso, obra-prima da arte rupestre sariana.",
      description:
        "Num afloramento de arenito na orla do Aïr, duas girafas gravadas há vários milénios, a maior com cerca de seis metros, contam-se entre as maiores e mais belas gravuras rupestres conhecidas. Testemunham uma época em que o Sara era uma savana. Foi feita uma réplica para dar a conhecer o sítio e protegê-lo.",
      tips: TIP_PT,
    },
    "cure-salee-ingall": {
      name: "Cure Salée de In-Gall",
      summary: "Grande concentração anual de pastores tuaregues e fulas no final da estação das chuvas.",
      description:
        "Todos os anos, no final da estação das chuvas, os pastores tuaregues e fulas conduzem os seus rebanhos para as terras e nascentes salgadas da região de In-Gall. A Cure Salée («cura de sal») é acompanhada de festejos: corridas de camelos, música, danças e, entre os fulas wodaabe, o Gerewol, célebre concurso de beleza masculina.",
      tips: TIP_PT,
      bestPeriod: "Final da estação das chuvas (finais de setembro ou início de outubro)",
    },
    "palais-du-sultan-zinder": {
      name: "Palácio do sultão de Zinder",
      summary: "A residência dos sultões de Damagaram, no coração do bairro do Birni.",
      description:
        "Construído em terra crua, o palácio do sultão é o coração histórico e simbólico de Zinder. Residência dos sultões de Damagaram, cuja dinastia continua a existir, acolhe as cerimónias tradicionais e, nas grandes festas, desfiles de cavaleiros em trajes de gala.",
      tips: TIP_PT,
    },
    "birni-zinder": {
      name: "Bairro do Birni",
      summary: "A cidade velha hauçá e as suas fachadas de adobe ornamentadas com motivos em relevo.",
      description:
        "O Birni, antiga cidade amuralhada, é um conjunto de ruelas e de recintos familiares em terra crua. Muitas fachadas exibem decorações em relevo, geométricas ou figurativas, típicas da arquitetura hauçá, renovadas a cada reboco. Um passeio pela história urbana do Sahel.",
      tips: TIP_PT,
    },
    "grand-marche-zinder": {
      name: "Grande Mercado de Zinder",
      summary: "Um grande mercado regional onde se cruzam pastores, artesãos e comerciantes vindos da vizinha Nigéria.",
      description:
        "Encruzilhada comercial entre o Sahel e a vizinha Nigéria, Zinder tem um grande mercado onde se encontram gado, cereais, especiarias, tecidos e, sobretudo, os couros e artigos de marroquinaria que fazem a fama da cidade.",
      tips: TIP_PT,
    },
    "cathedrale-niamey": {
      name: "Catedral de Nossa Senhora do Perpétuo Socorro",
      summary: "A catedral de Niamey, sede da arquidiocese, de arquitetura moderna em betão e grandes cruzes.",
      description:
        "Principal local de culto católico do país, a catedral de Nossa Senhora do Perpétuo Socorro é a sede da arquidiocese de Niamey (diocese em 1961, arquidiocese em 2007). O seu edifício moderno, precedido de uma alta cruz, reúne a comunidade cristã, minoritária no Níger, sobretudo no Natal e na Páscoa.",
      tips: `Local de culto: vestuário adequado e discrição durante as celebrações. ${TIP_PT}`,
    },
    "centre-culturel-oumarou-ganda": {
      name: "Centro Cultural Oumarou Ganda",
      summary: "O grande complexo cultural público de Niamey: sala de espetáculos, biblioteca, concertos e projeções.",
      description:
        "Batizado em 1981 em homenagem ao cineasta nigerino Oumarou Ganda (Cabascabo, Le Wazzou polygame), este complexo cultural reúne um espaço de espetáculos e uma biblioteca. Acolhe concertos, teatro, projeções e eventos culturais, sendo um dos locais de saída cultural da capital.",
      tips: `Programação anunciada localmente (imprensa, redes sociais). ${TIP_PT}`,
    },
    "village-artisanal-wadata": {
      name: "Aldeia artesanal de Wadata",
      summary: "A aldeia dos artesãos de Niamey: couro, cestaria, joias e tecelagem, comprados diretamente aos criadores.",
      description:
        "No bairro de Wadata, a aldeia artesanal reúne oficinas e lojas de artesãos: marroquinaria e pufes de couro, cestaria, joias e cruzes tuaregues de prata, tecelagem e esculturas. Pode ver os artesãos a trabalhar e comprar diretamente aos criadores, num ambiente mais calmo do que o dos grandes mercados.",
      tips: `Regatear é habitual; peça autorização antes de fotografar os artesãos. ${TIP_PT}`,
    },
    "palais-du-sultan-agadez": {
      name: "Palácio do sultão do Aïr",
      summary: "A residência do sultão de Agadez, guardião das tradições do Aïr, ao pé da grande mesquita.",
      description:
        "No coração da cidade velha, a dois passos da grande mesquita, o palácio de adobe é a residência do sultão do Aïr, autoridade tradicional e religiosa ainda muito respeitada. As suas espessas paredes de terra eriçadas de madeira lembram a arquitetura do minarete. É no seu pátio que termina todos os anos a festa do Bianou.",
      tips: `Edifício habitado: admira-se do exterior; o pátio só se visita com autorização. ${TIP_PT}`,
    },
    "maison-heinrich-barth-agadez": {
      name: "Casa de Heinrich Barth",
      summary: "A casa de adobe onde se hospedou em 1850 o explorador alemão Heinrich Barth, primeiro europeu em Agadez.",
      description:
        "Em outubro de 1850, o explorador alemão Heinrich Barth, a caminho de Trípoli para Kano, passou quase um mês em Agadez; uma placa colocada em 1966 recorda que foi o primeiro europeu a entrar na cidade. A sua casa de terra, na cidade velha, ainda pode ser visitada, e os seus relatos continuam a ser uma fonte preciosa sobre a história da cidade e do Sahel.",
      tips: TIP_PT,
    },
    "oasis-de-timia": {
      name: "Oásis de Timia",
      summary: "Aldeia-oásis no coração do Aïr: hortas, citrinos e palmeiras, uma guelta e uma cascata sazonal.",
      description:
        "A cerca de 220 km a nordeste de Agadez, Timia é muitas vezes apresentada como o mais belo oásis do Aïr. As suas hortas irrigadas produzem legumes, cereais, citrinos e tâmaras ao pé de montanhas escuras. No vale, uma guelta (poço de água permanente) e uma cascata que corre depois das chuvas, bem como o forte Massu construído em 1951, completam a paisagem.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    iferouane: {
      name: "Iférouane",
      summary: "Oásis tuaregue do norte do Aïr, ao pé das Montanhas Azuis, berço do Festival do Aïr.",
      description:
        "No vale do Ighazar, a norte do maciço, Iférouane é um oásis de hortas e palmeiras que foi durante muito tempo um centro importante da cultura tuaregue. É conhecido pelo Festival do Aïr, organizado desde 2001, e pelas paisagens que o rodeiam: as Montanhas Azuis de rochas marmoreadas, o monte Tamgak e numerosos sítios de gravuras rupestres.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    "monument-arbre-du-tenere": {
      name: "Monumento da Árvore do Teneré",
      summary: "Uma escultura de metal marca, em pleno deserto, o local da acácia solitária desaparecida em 1973.",
      description:
        "Durante séculos, uma acácia isolada, cujas raízes chegavam ao lençol freático a mais de 30 metros, serviu de referência às caravanas que atravessavam o Teneré, a cerca de 235 km a nordeste de Agadez. Derrubada por um camião em 1973, foi levada para o museu nacional de Niamey; desde 1975, uma árvore estilizada de metal assinala o seu local junto a um poço, como um farol no meio da areia.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    "ruines-d-assode": {
      name: "Ruínas de Assodé",
      summary: "Os vestígios de pedra da antiga capital dos tuaregues do Aïr, no coração do maciço.",
      description:
        "Fundada, segundo a tradição, por volta do final do século IX, Assodé foi provavelmente a primeira capital dos tuaregues do Aïr antes de o poder se deslocar para Agadez. Os seus habitantes abandonaram-na progressivamente; resta um conjunto de casas de pedra vulcânica e uma mesquita retangular com cerca de trinta metros. Um poço pastoril vizinho continua a atrair os dromedários e burros dos pastores.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    "palais-du-zarmakoye-dosso": {
      name: "Palácio do Zarmakoye",
      summary: "O palácio dos soberanos zarma de Dosso, de fachadas brancas ornadas com motivos azuis.",
      description:
        "Construído em 1904, o palácio é a residência do Zarmakoye, chefe tradicional de Dosso. As suas longas fachadas com decoração geométrica, o portal monumental e a fada (sala de audiências) ilustram a arquitetura das cortes reais do Sahel. Consta da lista indicativa do Níger ao Património Mundial da UNESCO e continua a ser o palco das grandes cerimónias consuetudinárias.",
      tips: `Residência habitada: a visita ao interior exige autorização da chefia. ${TIP_PT}`,
    },
    "musee-regional-djermakoye-dosso": {
      name: "Museu regional Djermakoye",
      summary: "O museu de Dosso: história do reino zarma, armas antigas, instrumentos e centro de artesanato.",
      description:
        "O museu regional Djermakoye apresenta a história do reino de Dosso e dos seus soberanos: retratos, armas antigas, instrumentos de música da corte como o kakaki e objetos do quotidiano. O seu recinto alberga também um centro de artesanato onde se encontram tecidos, couros e cerâmica da região.",
      tips: TIP_PT,
    },
    "marche-d-ayorou": {
      name: "Mercado de Ayorou",
      summary: "O grande mercado de domingo, onde convergem pirogas, rebanhos e comerciantes de vários países.",
      description:
        "Ao domingo, o mercado invade grande parte da cidade e atrai milhares de comerciantes e criadores vindos do Níger, do Mali, do Burkina Faso e da Nigéria. Trocam-se gado, cereais, peixe do rio, esteiras, cerâmica e tecidos, enquanto as pirogas trazem mercadorias e habitantes das ilhas vizinhas.",
      tips: `Zona particularmente exposta, próxima da fronteira com o Mali. ${TIP_PT}`,
    },
    "mosquee-de-yaama": {
      name: "Mesquita de Yaama",
      summary: "Mesquita de adobe de estilo hauçá, coroada por uma cúpula e quatro minaretes, Prémio Aga Khan 1986.",
      description:
        "Iniciada em 1962, a mesquita de Yaama foi construída por toda a comunidade: doação do terreno, fabrico dos tijolos de terra, transporte da água e da madeira. Ampliada ao longo dos anos com uma cúpula central e quatro minaretes de canto, ilustra o estilo sudano-saheliano na sua variante hauçá e recebeu o Prémio Aga Khan de Arquitetura em 1986.",
      tips: `Local de culto: visita apenas com autorização, com roupa que cubra o corpo. ${TIP_PT}`,
    },
    "salines-de-kalala-bilma": {
      name: "Salinas de Kalala",
      summary: "Centenas de poços escavados à mão onde o sal é extraído como há séculos.",
      description:
        "Às portas de Bilma, as salinas de Kalala alinham centenas de poços escavados à mão: a água salobra que sobe do subsolo deposita o sal, depois moldado em pães ou cones. Este sal, trocado durante séculos pelo milho-miúdo dos caravaneiros tuaregues, segue hoje sobretudo de camião. O «mai», autoridade tradicional, atribui as parcelas e fixa os preços.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
    "ksar-de-djado": {
      name: "Ksar de Djado",
      summary: "Uma cidade fortificada em ruínas erguida sobre um palmar, a sul do planalto do Djado.",
      description:
        "A sul do planalto do Djado, num pequeno oásis de água salobra, as ruínas de uma cidade fortificada de terra e pedra dominam um palmar cuidado por nómadas tubu. A cidade, abandonada há muito, teria sido fundada pelos kanuri. O planalto circundante é famoso pelas gravuras e pinturas rupestres que representam uma fauna há muito desaparecida da região.",
      tips: TIP_PT,
      bestPeriod: "Estação fresca (de novembro a fevereiro)",
    },
  },
  circuits: {},
  stepNotes: {},
};

const AR: SeedI18n = {
  guide: {
    intro:
      "تنصح السلطات الفرنسية والبريطانية اليوم بعدم السفر إلى النيجر إطلاقًا: يعرض هذا الدليل تراث البلاد للتحضير لرحلة في اليوم الذي تسمح فيه الظروف بذلك. فالبلد يزخر بالكثير: مدينة أغاديز القديمة المبنية من الطين ومئذنتها، وجبال آيير وكثبان تينيري، وآخر زرافات غرب أفريقيا، وقصور سلاطين زيندر، ونهر النيجر الذي يعبر نيامي.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "تحتاج غالبية المسافرين إلى تأشيرة؛ وتختلف الشروط بحسب الجنسية وقد تغيّرت مرات عدة في السنوات الأخيرة، لا سيما منذ انسحاب النيجر من المجموعة الاقتصادية لدول غرب أفريقيا (إيكواس). استعلموا لدى سفارة النيجر أو قنصليتها وتحققوا من الشروط المحدّثة لدى المصادر الرسمية: جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان الإقامة.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمى الصفراء عند الدخول. الملاريا منتشرة في جميع أنحاء البلاد، ولا سيما خلال موسم الأمطار وبعده: استشيروا طبيبًا أو مركزًا للتطعيمات الدولية بشأن علاج وقائي، واحموا أنفسكم من البعوض. تقع البلاد ضمن «حزام التهاب السحايا»، لذا يُنصح غالبًا بالتطعيم. تستوجب الحرارة الشديدة شرب كميات كبيرة من المياه المعبأة. المرافق الصحية محدودة خارج نيامي.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي الفرنك الأفريقي (XOF)، المرتبط بسعر ثابت باليورو (1 يورو = 655.957 فرنكًا أفريقيًا). النقد ضروري: لا تُقبل البطاقات المصرفية إلا في بعض الفنادق الكبرى في نيامي، وأجهزة الصرف الآلي نادرة خارج العاصمة. الدفع عبر الهاتف المحمول (mobile money) آخذ في الانتشار.",
      },
      {
        title: "متى تسافر",
        body: "الموسم الجاف والمعتدل نسبيًا، من نوفمبر إلى فبراير، هو الأنسب، مع رياح الهرمتان (رياح جافة محمّلة بالغبار) وليالٍ باردة في الصحراء. من مارس إلى مايو تصبح الحرارة شديدة جدًا (تتجاوز غالبًا 40 درجة مئوية). يمتد موسم الأمطار تقريبًا من يونيو إلى سبتمبر؛ فيكسو الساحل بالخضرة، وينتهي في الشمال بتجمّعات الرعاة الكبرى المعروفة بـ«كور ساليه».",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي لغة الإدارة والأعمال؛ والهوسا والزرما (الجرما) هما اللغتان الأكثر تداولًا، إلى جانب التماشق (لغة الطوارق) والفولفولدي (لغة الفولاني) والكانوري وغيرها. غالبية السكان من المسلمين: ارتدوا ملابس محتشمة، والتزموا التحفّظ خلال شهر رمضان، واخلعوا الأحذية قبل دخول المسجد (بعد الاستئذان). التحية المطوّلة قبل أي طلب أمر أساسي. ويرافق الشاي بالنعناع، الذي يُقدَّم في ثلاثة أكواب، كل لقاء. استأذنوا دائمًا قبل تصوير أي شخص؛ ويُمنع تصوير المباني الرسمية والعسكرية.",
      },
      {
        title: "التنقل",
        body: "في ظل الوضع الأمني الراهن، تنصح المصادر الرسمية بعدم التنقل داخل البلاد إطلاقًا، بما في ذلك على الطرق المحيطة بنيامي؛ لذلك لا يقترح هذا الدليل أي جولات أو مسارات. وقد تُعلَّق الرحلات الجوية الدولية أو تُعدَّل دون سابق إنذار. وعندما يحين الوقت، استعلموا لدى سلطات بلدكم ولدى وكالات محلية معروفة قبل أي تنقل.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار الكهربائي 220 فولت، والمقابس من الأنواع C وD وE وF. انقطاع التيار متكرر. تتيح شريحة SIM محلية (يُطلب إبراز وثيقة هوية) الوصول إلى الإنترنت عبر الهاتف المحمول، مع تغطية ضعيفة أو منعدمة في الصحراء.",
      },
      {
        title: "الأمن",
        body: "في تاريخ تحرير هذا الدليل (أكتوبر 2026)، تنصح كلٌّ من وزارة الخارجية الفرنسية («Conseils aux voyageurs») ووزارة الخارجية البريطانية FCDO («Foreign travel advice») بعدم السفر إلى النيجر إطلاقًا، أيًّا كان الدافع، بما في ذلك نيامي. وتشيران إلى خطر إرهابي مرتفع في جميع أنحاء البلاد، وخطر اختطاف الرعايا الأجانب، ووضع سياسي غير مستقر منذ انقلاب يوليو 2023، ومساعدة قنصلية محدودة جدًا أو متعذّرة على الأرض. وقد يؤدي السفر خلافًا لهذه النصائح إلى إبطال تأمينكم. راجِعوا هذه المصادر (ومصادر بلدكم) قبل اتخاذ أي قرار، فهي تُحدَّث بانتظام.",
      },
    ],
  },
  destinations: {
    niamey: {
      name: "نيامي",
      region: "نيامي",
      summary: "عاصمة هادئة على ضفاف نهر النيجر: متحف كبير في الهواء الطلق وأسواق ومطبخ ساحلي.",
      description:
        "نيامي عاصمة البلاد منذ عام 1926، وتمتد على طول نهر النيجر. متحفها الوطني، الذي يجمع بين المتحف والحديقة وحديقة الحيوان وقرية الحرفيين، من أبرز المؤسسات الثقافية في منطقة الساحل؛ أما أسواقها وضفافها، حيث تمرّ القوارب الخشبية ويعمل المزارعون، فتختصر الحياة اليومية في النيجر. وكسائر البلاد، تشمل المدينة اليوم نصيحة فرنسية وبريطانية بعدم السفر إطلاقًا.",
    },
    koure: {
      name: "كوريه",
      region: "تيلابيري",
      summary: "ملاذ آخر زرافات غرب أفريقيا، على بعد نحو ستين كيلومترًا من نيامي.",
      description:
        "في الأحراش المحيطة بقرية كوريه، جنوب شرق نيامي، تعيش آخر مجموعة من زرافات غرب أفريقيا (Giraffa camelopardalis peralta). بعد أن تقلّص عددها إلى نحو خمسين زرافة في تسعينيات القرن الماضي، أُنقذت بفضل حماية النوع والتزام القرويين الذين يتعايشون معها دون أسوار. وتقع المنطقة، كسائر البلاد، ضمن نطاق يُنصح بعدم السفر إليه إطلاقًا.",
    },
    "parc-w-niger-pays": {
      name: "منتزه W الوطني (النيجر)",
      region: "تيلابيري",
      summary: "الجزء النيجري من مجموعة واسعة من السافانا المحمية، يتقاسمها مع بنين وبوركينا فاسو.",
      description:
        "يستمد المنتزه اسمه من منعطفات نهر النيجر على حدوده التي ترسم شكل حرف W. ويشكّل مع المنتزهات المجاورة في بنين وبوركينا فاسو مجمّع W-أرلي-بنجاري المدرج في قائمة التراث العالمي لليونسكو: سافانا وغابات نهرية وأراضٍ رطبة تعيش فيها الفيلة والجواميس والظباء وأفراس النهر وطيور وفيرة. وتُعدّ المنطقة اليوم من أكثر المناطق تعرّضًا للجماعات المسلحة، ويُنصح بعدم السفر إليها إطلاقًا.",
    },
    agadez: {
      name: "أغاديز",
      region: "أغاديز",
      summary: "«بوابة الصحراء»: مدينة قديمة من الطين مدرجة في قائمة اليونسكو ومئذنة رمزية.",
      description:
        "أغاديز ملتقى تاريخي لقوافل التجارة العابرة للصحراء، وهي منذ قرون مقرّ سلطنة آيير وإحدى كبريات مدن الطوارق. ومركزها التاريخي، المدرج في قائمة التراث العالمي لليونسكو، متاهة من الأزقة والبيوت المبنية من الطين تعلوها مئذنة المسجد الكبير. وتشتهر المدينة أيضًا بصاغتها وحرفيي الجلود. وتقع في منطقة يُنصح بعدم السفر إليها إطلاقًا.",
    },
    "air-et-tenere": {
      name: "آيير وتينيري",
      region: "أغاديز",
      summary: "جبال بركانية وواحات ونقوش صخرية ومحيط من الكثبان في قلب الصحراء الكبرى.",
      description:
        "إلى الشمال الشرقي من أغاديز، ترتفع جبال آيير الداكنة فوق الصحراء بأوديتها وواحاتها ونقوشها الصخرية؛ وإلى الشرق تمتد صحراء تينيري، إحدى أكبر الصحارى الرملية في الصحراء الكبرى. ومحميّتا آيير وتينيري الطبيعيتان، من بين أوسع المناطق المحمية في أفريقيا، مدرجتان في قائمة التراث العالمي لليونسكو وفي قائمة التراث المهدَّد بالخطر. منطقة يُنصح بعدم السفر إليها إطلاقًا.",
    },
    zinder: {
      name: "زيندر",
      region: "زيندر",
      summary: "العاصمة السابقة لسلطنة دماغرام: قصر السلطان ومدينة هوسا القديمة.",
      description:
        "زيندر ثانية مدن البلاد، كانت عاصمة سلطنة دماغرام ثم أول عاصمة لمستعمرة النيجر حتى عام 1926. ويحافظ حيّها القديم، البيرني، على قصر السلطان وعلى بيوت من الطين مزيّنة بزخارف بارزة تميّز عمارة الهوسا. والمدينة أيضًا مركز تجاري وحرفي كبير (الجلود والدباغة). وتقع في منطقة يُنصح بعدم السفر إليها إطلاقًا.",
    },
    dosso: {
      name: "دوسو",
      region: "دوسو",
      summary: "العاصمة التاريخية لمملكة الزرما: قصر الزرماكوي ومتحف إقليمي وتقاليد المصارعة.",
      description:
        "على بُعد نحو 140 كيلومترًا جنوب شرق نيامي، كانت دوسو عاصمة مملكة الزرما التي تأسست في القرن الثامن عشر، ولا تزال سلالة الزرماكوي (أو الجرماكوي) تحكم فيها على الصعيد العُرفي. وتحافظ المدينة على قصر الزرماكوي المشيَّد عام 1904 والمدرج مع مواقع أخرى في القائمة التمهيدية للنيجر للتراث العالمي، وعلى متحف إقليمي وحلبة للمصارعة التقليدية. وهي، كسائر البلاد، في منطقة يُنصح بعدم السفر إليها إطلاقًا.",
    },
    ayorou: {
      name: "أيورو",
      region: "تيلابيري",
      summary: "بلدة على نهر النيجر قرب الحدود المالية، تشتهر بسوقها الكبيرة يوم الأحد.",
      description:
        "على بُعد نحو 200 كيلومتر شمال غرب نيامي، تمتد أيورو على الضفة اليسرى لنهر النيجر وعلى جزيرة تحمل الاسم نفسه. كانت ملجأً لحاكم السونغاي سني بارو في أواخر القرن الخامس عشر، وعرفها المسافرون بسوقها الأسبوعية ومناظر النهر حيث تعيش أفراس النهر وطيور كثيرة. والمنطقة القريبة من الحدود المالية شهدت هجمات دامية، ويُنصح بعدم السفر إليها إطلاقًا.",
    },
    yaama: {
      name: "ياما",
      region: "تاهوا",
      summary: "قرية هوساوية في منطقة تاهوا، تشتهر بمسجدها الطيني الحائز جائزة الآغا خان.",
      description:
        "في منطقة تاهوا، تدين قرية ياما بشهرتها لمسجد الجمعة فيها، وهو تحفة من العمارة الطينية بناه القرويون بصورة جماعية. والمساجد الطينية في منطقة تاهوا مدرجة في القائمة التمهيدية للنيجر للتراث العالمي. والمنطقة، كسائر البلاد، يُنصح بعدم السفر إليها إطلاقًا.",
    },
    "kawar-djado": {
      name: "كاوار وجادو",
      region: "أغاديز",
      summary: "واحات الصحراء الكبرى الشرقية: ملاحات بيلما وجروف كاوار وقصور هضبة جادو المهجورة.",
      description:
        "في أقصى شمال شرق البلاد، على بُعد أكثر من 500 كيلومتر من أغاديز، يحتضن جرف كاوار سلسلة من الواحات منها بيلما، الشهيرة بملاحاتها والمحطة الأخيرة لقوافل الملح (أزالاي) القادمة من آيير عبر تينيري. وإلى الشمال تحتفظ هضبة جادو بنقوش صخرية وبأطلال قصور مهجورة مدرجة في القائمة التمهيدية للنيجر للتراث العالمي. منطقة شديدة العزلة يُنصح بعدم السفر إليها إطلاقًا.",
    },
  },
  places: {
    "musee-national-boubou-hama": {
      name: "متحف بوبو هاما الوطني",
      summary: "متحف في الهواء الطلق: أجنحة موضوعية ومساكن تقليدية وأحافير ديناصورات وحرفيون.",
      description:
        "تأسس المتحف الوطني في أواخر خمسينيات القرن الماضي، ويحمل اسم السياسي والكاتب بوبو هاما. في حديقة واسعة، تعرض أجنحة متعددة أزياء وآلات موسيقية وأسلحة وأدوات مختلف شعوب البلاد، ونماذج لمساكن تقليدية، وأحافير ديناصورات اكتُشفت في الصحراء، وبقايا «شجرة تينيري»، شجرة الأكاسيا المنفردة التي صارت أسطورة. وتُكمل الزيارةَ حديقةُ حيوان صغيرة ومركزٌ للحرف اليدوية.",
      tips: TIP_AR,
    },
    "grand-marche-niamey": {
      name: "السوق الكبير في نيامي",
      summary: "السوق الرئيسي في العاصمة: أقمشة وتوابل وجلود وفخار ومنتجات الساحل.",
      description:
        "في قلب المدينة، يضم السوق الكبير مئات الأكشاك: أقمشة الواكس والبازان، وتوابل، وجلود مشغولة، وفخار، وسلال، وحليّ، ومنتجات قادمة من جميع أنحاء البلاد. غوص في التجارة الساحلية حيث يلتقي تجار من الهوسا والزرما والطوارق والفولاني.",
      tips: TIP_AR,
    },
    "grande-mosquee-niamey": {
      name: "المسجد الكبير في نيامي",
      summary: "المسجد الرئيسي في العاصمة، تميّزه قبّته الخضراء ومئذنته العالية.",
      description:
        "المسجد الكبير هو أهم دور العبادة في المدينة، يجتمع فيه المصلّون لصلاة الجمعة وفي الأعياد الدينية. وتُرى قبّته الخضراء ومئذنته من بعيد في مشهد العاصمة.",
      tips: `مكان للصلاة: لا تتم الزيارة إلا بإذن وبملابس محتشمة. ${TIP_AR}`,
    },
    "fleuve-niger-niamey": {
      name: "ضفاف نهر النيجر",
      summary: "نهر الساحل الكبير وقواربه الخشبية وبساتينه وغروب شمسه.",
      description:
        "يعبر نهر النيجر نيامي من الشمال الغربي إلى الجنوب الشرقي. وعلى ضفافه يضبط الصيادون والمراكبيون والمزارعون إيقاع اليوم، ومشاهد غروب الشمس فوق الماء من أجمل صور المدينة. وتعيش أفراس النهر في بعض أجزاء النهر، أعلى المدينة وأسفلها.",
      tips: TIP_AR,
      bestPeriod: "بعد موسم الأمطار، حين يكون منسوب النهر مرتفعًا (أواخر العام)",
    },
    "cuisine-nigerienne-niamey": {
      name: "المطبخ النيجري",
      summary: "الكيليتشي والأسياخ المشوية وكرة الدخن والدامبو والشاي بالنعناع: نكهات الساحل.",
      description:
        "يقوم المطبخ النيجري على الدخن والذرة الرفيعة والأرز واللحم. ومن أطباقه الكيليتشي (شرائح رقيقة من اللحم المجفف المتبّل)، والأسياخ المشوية، و«كرة» الدخن مع صلصات البامية أو الأوراق، والدامبو (كسكس من الدخن أو الذرة بأوراق المورينغا)، ومشروبات مثل الفورا. ويُختتم الطعام بالشاي بالنعناع الذي يُقدَّم في ثلاثة أكواب.",
      tips: TIP_AR,
    },
    "girafes-de-koure": {
      name: "منطقة زرافات كوريه",
      summary: "مشاهدة الزرافات الطليقة بين الحقول سيرًا على الأقدام برفقة دليل من القرية.",
      description:
        "تعيش زرافات كوريه طليقة في مشهد من الأحراش والحقول تتقاسمه مع القرى. وقبل تدهور الوضع الأمني، كان الزوار يقتربون منها سيرًا على الأقدام برفقة أدلّاء محليين، في تجربة نادرة. ويتزايد عددها، إذ بات يبلغ عدة مئات، وتخضع لمتابعة علمية.",
      tips: `منطقة يُنصح بعدم السفر إليها إطلاقًا: في عام 2020 أودى هجوم فيها بحياة زوار ومرافقيهم. ${TIP_AR}`,
      bestPeriod: "الموسم الجاف (من نوفمبر إلى مايو)",
    },
    "faune-parc-w-niger-pays": {
      name: "حيوانات منتزه W وسافاناته",
      summary: "فيلة وجواميس وظباء وجوارح كبيرة في إحدى آخر السافانات الكبرى في غرب أفريقيا.",
      description:
        "يأوي المنتزه واحدة من أغنى الحياة البرية في المنطقة: الفيلة والجواميس والظباء الرّوانية وظباء الكوب والخنازير الثؤلولية والقرود والسنوريات الكبيرة النادرة الظهور وعدة مئات من أنواع الطيور. وقبل تدهور الوضع، كان يُزار في الموسم الجاف حين تتجمع الحيوانات قرب نقاط المياه.",
      tips: `منطقة يُنصح بعدم السفر إليها إطلاقًا، وهي معرّضة بشكل خاص للجماعات المسلحة. ${TIP_AR}`,
      bestPeriod: "الموسم الجاف (من ديسمبر إلى مايو)",
    },
    "meandres-du-w-niger-pays": {
      name: "منعطفات نهر النيجر",
      summary: "النهر الذي يرسم حرف W وأعطى المنتزه اسمه، تحفّه الغابات النهرية.",
      description:
        "على حدود المنتزه، يرسم نهر النيجر سلسلة من المنعطفات الضيقة على شكل حرف W. وتجذب ضفافه، المكسوّة بالغابات النهرية، أفراس النهر والتماسيح والطيور المائية، وتتيح بعضًا من أكثر مناظر البلاد خضرة.",
      tips: TIP_AR,
    },
    "grande-mosquee-agadez": {
      name: "المسجد الكبير في أغاديز",
      summary: "مئذنته الهرمية المبنية من الطين، المكسوّة بعوارض خشبية بارزة، رمز المدينة.",
      description:
        "يبلغ ارتفاع مئذنة المسجد الكبير نحو ثلاثين مترًا، وهي من أعلى المباني الطينية في العالم. وتهيمن صورتها الهرمية، المكسوّة بعوارض خشبية تُستخدم سقالاتٍ أثناء الترميم الدوري للطلاء الطيني، على المدينة القديمة والصحراء المحيطة.",
      tips: `مكان للعبادة: لا تتم الزيارة إلا بإذن وبملابس محتشمة. ${TIP_AR}`,
    },
    "centre-historique-agadez": {
      name: "المركز التاريخي لأغاديز",
      summary: "متاهة من البيوت الطينية والقصور والأزقة مدرجة في قائمة التراث العالمي.",
      description:
        "ينتظم المركز التاريخي في أحياء موروثة من عصر القوافل، ويحافظ على تخطيطه القديم وبيوته الطينية ذات الواجهات المزخرفة أحيانًا وقصر السلطان والعديد من المساكن التقليدية. وقد أُدرج في قائمة التراث العالمي لليونسكو عام 2013، وهو شاهد على عمارة الطين في الساحل وعلى دور أغاديز في التجارة العابرة للصحراء.",
      tips: TIP_AR,
    },
    "artisans-agadez": {
      name: "صاغة أغاديز وحرفيوها",
      summary: "صلبان أغاديز الفضية والجلود المشغولة وسروج الجمال: براعة الطوارق.",
      description:
        "يواصل الحدّادون-الصاغة الطوارق في أغاديز حرفة ذائعة الصيت في أرجاء الساحل، وفي مقدّمتها «صليب أغاديز»، القلادة الفضية التي أصبحت رمزًا. ويُكمل هذه الحرفَ صانعو الجلود وسروج الجمال والصناديق الجلدية المزخرفة، وهي حرف طالما توجّهت إلى المسافرين.",
      tips: TIP_AR,
    },
    "massif-de-l-air": {
      name: "جبال آيير",
      summary: "جبال بركانية ووديان خضراء وقرى-واحات للطوارق.",
      description:
        "كتلة آيير مجموعة من الجبال والهضاب البركانية الأصل، تشقّها أودية (كوري) يتيح فيها الماء قيام البساتين وبساتين النخيل. وفيها قرى-واحات للطوارق، ونباتات وحيوانات متكيّفة مع الصحراء، ومواقع لا تُحصى للنقوش الصخرية.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    "desert-du-tenere": {
      name: "صحراء تينيري",
      summary: "محيط من الرمال والكثبان، عبرته قوافل الملح طويلًا.",
      description:
        "تينيري، أي «الصحراء» بلغة التماشق، امتداد شاسع من الرمال والكثبان شرق آيير. وظلّت طويلًا تعبرها قوافل الإبل (الأزلاي) المتجهة لجلب ملح بلمة. وكانت شجرتها المنفردة، «شجرة تينيري»، علامة يهتدي بها رجال القوافل؛ وتُحفظ بقاياها في المتحف الوطني في نيامي.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    "girafes-de-dabous": {
      name: "زرافات دابوس",
      summary: "زرافتان منقوشتان بالحجم الطبيعي على نتوء صخري، تحفة من فن النقش الصخري في الصحراء الكبرى.",
      description:
        "على نتوء من الحجر الرملي عند أطراف آيير، تُعدّ زرافتان نُقشتا قبل آلاف السنين، يبلغ طول كبراهما نحو ستة أمتار، من أكبر النقوش الصخرية المعروفة وأجملها. وهما شاهدتان على زمن كانت فيه الصحراء الكبرى سافانا. وقد صُنعت نسخة مطابقة للتعريف بالموقع وحمايته.",
      tips: TIP_AR,
    },
    "cure-salee-ingall": {
      name: "«كور ساليه» في إن غال",
      summary: "التجمع السنوي الكبير لرعاة الطوارق والفولاني في نهاية موسم الأمطار.",
      description:
        "في كل عام، مع نهاية موسم الأمطار، يقود رعاة الطوارق والفولاني قطعانهم إلى الأراضي والينابيع المالحة في منطقة إن غال. ويرافق «كور ساليه» («علاج الملح») احتفالات: سباقات الجمال والموسيقى والرقص، ولدى الفولاني الوودابي مهرجان «غيريوول»، مسابقة جمال الرجال الشهيرة.",
      tips: TIP_AR,
      bestPeriod: "نهاية موسم الأمطار (أواخر سبتمبر أو أوائل أكتوبر)",
    },
    "palais-du-sultan-zinder": {
      name: "قصر سلطان زيندر",
      summary: "مقر إقامة سلاطين دماغرام في قلب حي البيرني.",
      description:
        "قصر السلطان، المبني من الطين، هو القلب التاريخي والرمزي لزيندر. وهو مقر إقامة سلاطين دماغرام الذين لا تزال سلالتهم قائمة، ويحتضن المراسم التقليدية، وخلال الأعياد الكبرى استعراضات الفرسان بأزيائهم الاحتفالية.",
      tips: TIP_AR,
    },
    "birni-zinder": {
      name: "حي البيرني",
      summary: "مدينة الهوسا القديمة وواجهاتها الطينية المزيّنة بزخارف بارزة.",
      description:
        "البيرني، المدينة المسوّرة القديمة، شبكة من الأزقة والمساكن العائلية المبنية من الطين. وتحمل واجهات كثيرة زخارف بارزة، هندسية أو تصويرية، تميّز عمارة الهوسا وتتجدّد مع كل ترميم. نزهة في التاريخ العمراني للساحل.",
      tips: TIP_AR,
    },
    "grand-marche-zinder": {
      name: "السوق الكبير في زيندر",
      summary: "سوق إقليمي كبير يلتقي فيه الرعاة والحرفيون والتجار القادمون من نيجيريا المجاورة.",
      description:
        "زيندر ملتقى تجاري بين الساحل ونيجيريا المجاورة، وفيها سوق كبير تُعرض فيه المواشي والحبوب والتوابل والأقمشة، وقبل كل شيء الجلود والمصنوعات الجلدية التي اشتهرت بها المدينة.",
      tips: TIP_AR,
    },
    "cathedrale-niamey": {
      name: "كاتدرائية سيدة المعونة الدائمة",
      summary: "كاتدرائية نيامي ومقرّ رئاسة الأسقفية، بعمارة حديثة من الخرسانة وصلبان كبيرة.",
      description:
        "كاتدرائية سيدة المعونة الدائمة هي أهم مكان للعبادة الكاثوليكية في البلاد ومقرّ رئاسة أسقفية نيامي (أبرشية منذ 1961 ورئاسة أسقفية منذ 2007). ويجمع مبناها الحديث، الذي يتقدّمه صليب عالٍ، الجماعة المسيحية، وهي أقلية في النيجر، لا سيما في عيد الميلاد وعيد الفصح.",
      tips: `مكان عبادة: لباس لائق وتكتّم أثناء القداديس. ${TIP_AR}`,
    },
    "centre-culturel-oumarou-ganda": {
      name: "مركز عمرو غاندا الثقافي",
      summary: "المجمّع الثقافي العام الكبير في نيامي: قاعة عروض ومكتبة وحفلات موسيقية وعروض سينمائية.",
      description:
        "سُمّي هذا المجمّع الثقافي عام 1981 تكريمًا للمخرج النيجري عمرو غاندا (كاباسكابو، وازو متعدّد الزوجات)، ويضم فضاءً للعروض ومكتبة. ويستضيف حفلات موسيقية ومسرحًا وعروضًا سينمائية وفعاليات ثقافية، وهو من أماكن السهر الثقافي في العاصمة.",
      tips: `يُعلَن عن البرنامج محليًا (الصحافة ومواقع التواصل). ${TIP_AR}`,
    },
    "village-artisanal-wadata": {
      name: "قرية وادتا الحرفية",
      summary: "قرية الحرفيين في نيامي: جلود وسلال وحليّ ونسيج تُشترى مباشرة من صانعيها.",
      description:
        "في حي وادتا، تضم القرية الحرفية ورشًا ومتاجر للحرفيين: مصنوعات جلدية ومقاعد جلدية، وسلال، وحليّ وصلبان طوارقية من الفضة، ومنسوجات ومنحوتات. ويمكن مشاهدة الحرفيين أثناء العمل والشراء منهم مباشرة، في جو أهدأ من الأسواق الكبرى.",
      tips: `المساومة متعارف عليها؛ استأذنوا قبل تصوير الحرفيين. ${TIP_AR}`,
    },
    "palais-du-sultan-agadez": {
      name: "قصر سلطان آيير",
      summary: "مقرّ سلطان أغاديز، حارس تقاليد آيير، عند سفح المسجد الكبير.",
      description:
        "في قلب المدينة القديمة، على مقربة من المسجد الكبير، يقوم القصر المبني من الطين مقرًّا لسلطان آيير، وهو سلطة تقليدية ودينية لا تزال تحظى باحترام كبير. وتذكّر جدرانه الطينية السميكة المغروزة بالأخشاب بعمارة المئذنة. وفي فنائه يُختتم احتفال البيانو كل عام.",
      tips: `مبنى مأهول: يُشاهَد من الخارج، ولا يُزار الفناء إلا بإذن. ${TIP_AR}`,
    },
    "maison-heinrich-barth-agadez": {
      name: "بيت هاينريش بارت",
      summary: "البيت الطيني الذي أقام فيه عام 1850 المستكشف الألماني هاينريش بارت، أول أوروبي في أغاديز.",
      description:
        "في أكتوبر 1850، أمضى المستكشف الألماني هاينريش بارت، في طريقه من طرابلس إلى كانو، قرابة شهر في أغاديز؛ وتذكّر لوحة وُضعت عام 1966 بأنه أول أوروبي دخل المدينة. ولا يزال بيته الطيني في المدينة القديمة مفتوحًا للزيارة، وتبقى كتاباته مصدرًا قيّمًا لتاريخ المدينة والساحل.",
      tips: TIP_AR,
    },
    "oasis-de-timia": {
      name: "واحة تيميا",
      summary: "قرية-واحة في قلب آيير: بساتين وحمضيات ونخيل، وغيلتة وشلال موسمي.",
      description:
        "على بُعد نحو 220 كيلومترًا شمال شرق أغاديز، كثيرًا ما توصف تيميا بأنها أجمل واحات آيير. وتنتج بساتينها المرويّة الخضر والحبوب والحمضيات والتمور عند سفح جبال داكنة. وفي الوادي غيلتة (بركة ماء دائمة) وشلال يجري بعد الأمطار، إضافة إلى حصن ماسو المشيَّد عام 1951.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    iferouane: {
      name: "إيفروان",
      summary: "واحة طوارقية في شمال آيير عند سفح الجبال الزرقاء، ومهد مهرجان آيير.",
      description:
        "في وادي إيغازر شمال الكتلة الجبلية، إيفروان واحة من البساتين والنخيل ظلّت طويلًا مركزًا رئيسيًا للثقافة الطوارقية. وتشتهر بمهرجان آيير الذي يُنظَّم منذ عام 2001، وبالمناظر المحيطة بها: الجبال الزرقاء ذات الصخور المعرّقة، وجبل تامغاك، ومواقع عديدة للنقوش الصخرية.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    "monument-arbre-du-tenere": {
      name: "نصب شجرة تينيري",
      summary: "منحوتة معدنية تحدّد، في قلب الصحراء، موضع شجرة الأكاسيا المنعزلة التي اختفت عام 1973.",
      description:
        "طوال قرون، كانت شجرة أكاسيا منعزلة، تبلغ جذورها المياه الجوفية على عمق يزيد على 30 مترًا، علامةً تهتدي بها القوافل العابرة لتينيري، على بُعد نحو 235 كيلومترًا شمال شرق أغاديز. وبعد أن صدمتها شاحنة عام 1973 نُقلت إلى المتحف الوطني في نيامي؛ ومنذ 1975 تحدّد شجرة معدنية مُنمَّقة موضعها قرب بئر، كأنها منارة وسط الرمال.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    "ruines-d-assode": {
      name: "أطلال أسودي",
      summary: "البقايا الحجرية للعاصمة القديمة لطوارق آيير، في قلب الكتلة الجبلية.",
      description:
        "تأسست أسودي، بحسب الرواية المتوارثة، نحو أواخر القرن التاسع، وكانت على الأرجح أول عاصمة لطوارق آيير قبل أن تنتقل السلطة إلى أغاديز. وقد هجرها سكانها تدريجيًا، ولم يبقَ منها سوى مجموعة من البيوت المبنية بالحجر البركاني ومسجد مستطيل طوله نحو ثلاثين مترًا. ولا تزال بئر رعوية قريبة تجتذب إبل الرعاة وحميرهم.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    "palais-du-zarmakoye-dosso": {
      name: "قصر الزرماكوي",
      summary: "قصر حكّام الزرما في دوسو، بواجهاته البيضاء المزيّنة بزخارف زرقاء.",
      description:
        "شُيّد القصر عام 1904، وهو مقرّ الزرماكوي، الزعيم التقليدي لدوسو. وتجسّد واجهاته الطويلة ذات الزخارف الهندسية وبوابته الضخمة و«الفادا» (قاعة الاستقبال) عمارةَ البلاطات الملكية في الساحل. وهو مدرج في القائمة التمهيدية للنيجر للتراث العالمي لليونسكو، ولا يزال مسرحًا للاحتفالات العُرفية الكبرى.",
      tips: `مقرّ مأهول: زيارة الداخل تتطلّب إذن الزعامة التقليدية. ${TIP_AR}`,
    },
    "musee-regional-djermakoye-dosso": {
      name: "متحف الجرماكوي الإقليمي",
      summary: "متحف دوسو: تاريخ مملكة الزرما وأسلحة قديمة وآلات موسيقية ومركز للحِرف.",
      description:
        "يعرض متحف الجرماكوي الإقليمي تاريخ مملكة دوسو وحكّامها: صور شخصية، وأسلحة قديمة، وآلات موسيقى البلاط مثل الكاكاكي، وأدوات من الحياة اليومية. ويضم حرمه أيضًا مركزًا للحِرف تُعرض فيه منسوجات ومصنوعات جلدية وفخاريات من المنطقة.",
      tips: TIP_AR,
    },
    "marche-d-ayorou": {
      name: "سوق أيورو",
      summary: "سوق الأحد الكبيرة، حيث تلتقي الزوارق والقطعان والتجار من بلدان عدة.",
      description:
        "يوم الأحد، تمتد السوق على جزء كبير من البلدة وتجتذب آلاف التجار والرعاة القادمين من النيجر ومالي وبوركينا فاسو ونيجيريا. وتُتبادل فيها المواشي والحبوب وأسماك النهر والحُصر والفخار والأقمشة، فيما تجلب الزوارق البضائع وسكان الجزر المجاورة.",
      tips: `منطقة معرّضة بشكل خاص للخطر، قريبة من الحدود المالية. ${TIP_AR}`,
    },
    "mosquee-de-yaama": {
      name: "مسجد ياما",
      summary: "مسجد من الطين على الطراز الهوساوي، تعلوه قبة وأربع مآذن، حائز جائزة الآغا خان عام 1986.",
      description:
        "بدأ بناء مسجد ياما عام 1962، وشارك فيه المجتمع كله: من التبرّع بالأرض إلى صنع الطوب الطيني ونقل الماء والخشب. وقد وُسّع على مرّ السنين بقبة مركزية وأربع مآذن في الزوايا، فصار مثالًا للطراز السوداني الساحلي في صيغته الهوساوية، ونال جائزة الآغا خان للعمارة عام 1986.",
      tips: `مكان عبادة: الزيارة بإذن فقط وبلباس ساتر. ${TIP_AR}`,
    },
    "salines-de-kalala-bilma": {
      name: "ملاحات كالالا",
      summary: "مئات الأحواض المحفورة يدويًا يُستخرج منها الملح كما منذ قرون.",
      description:
        "على أبواب بيلما، تصطفّ في ملاحات كالالا مئات الأحواض المحفورة يدويًا: يصعد الماء المالح من باطن الأرض فيترسّب الملح، ثم يُقولَب في أرغفة أو مخاريط. وهذا الملح، الذي ظل قرونًا يُقايَض بدُخن قوافل الطوارق، يُنقل اليوم في الغالب بالشاحنات. ويتولّى «الماي»، وهو سلطة تقليدية، توزيع القطع وتحديد الأسعار.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
    "ksar-de-djado": {
      name: "قصر جادو",
      summary: "مدينة محصّنة مهدّمة تعلو بستان نخيل، في جنوب هضبة جادو.",
      description:
        "في جنوب هضبة جادو، في واحة صغيرة ذات مياه مالحة، تعلو أطلالُ مدينة محصّنة من الطين والحجر بستانَ نخيل يعتني به رحّل التبو. ويُعتقد أن الكانوري أسّسوا هذه المدينة المهجورة منذ زمن بعيد. وتشتهر الهضبة المحيطة بنقوشها ورسومها الصخرية التي تصوّر حيوانات اختفت من المنطقة.",
      tips: TIP_AR,
      bestPeriod: "الموسم البارد (من نوفمبر إلى فبراير)",
    },
  },
  circuits: {},
  stepNotes: {},
};

export const NIGER_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
