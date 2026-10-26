/**
 * Traductions du contenu de départ du guide Guinée (voir ./guinee.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de guinee.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "Depósito de agua de África Occidental, donde nacen el Níger, el Senegal y el Gambia, Guinea se descubre lejos del turismo de masas: la capital, Conakry, frente a las islas de Los, las cascadas de la región de Kindia, luego las frescas mesetas del Futa Yallon, sus vertiginosas cataratas y la cultura peul de Labé, hasta los bosques del monte Nimba en el extremo sureste. Un país exigente, de carreteras lentas, que recompensa a los viajeros curiosos.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado, que se solicita en línea (e-visa) en el portal oficial de las autoridades guineanas al menos unos días antes de la salida; el justificante se presenta a la llegada. Los ciudadanos de la CEDEAO están exentos. Los requisitos cambian: compruébelos siempre en las fuentes oficiales antes de salir (pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento, certificado de vacunación).",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla (forma parte, entre otras cosas, de la solicitud del e-visa): vacúnese antes de salir. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos (repelente, mosquitera). El país ha sufrido epidemias de fiebre hemorrágica (ébola): consulte la información sanitaria actualizada. Beba agua embotellada; la atención médica es limitada fuera de Conakry, por lo que es imprescindible un seguro que cubra la repatriación.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco guineano (GNF), no convertible: solo se puede obtener una vez en el país y la salida de divisas y de francos guineanos está limitada. Lleve euros o dólares en efectivo y cámbielos en bancos u oficinas de cambio autorizadas: el cambio en la calle es ilegal. El efectivo es imprescindible en todas partes; los cajeros automáticos se encuentran sobre todo en Conakry y en las ciudades grandes, y las tarjetas bancarias solo se aceptan en algunos grandes hoteles. El pago por móvil (mobile money) está muy extendido.",
      },
      {
        title: "Cuándo ir",
        body: "La estación seca, aproximadamente de noviembre a abril, es la mejor época; el harmattan (viento seco y polvoriento) sopla sobre todo de diciembre a febrero. La estación de lluvias, aproximadamente de mayo-junio a octubre, es muy intensa en la costa: Conakry es una de las capitales más lluviosas del mundo, con lluvias torrenciales en julio y agosto, cuando muchas pistas se vuelven intransitables. En altura, el Futa Yallon es más fresco; sus cataratas lucen más al final de la estación de lluvias.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua oficial; en el día a día se hablan, entre otras, el susu en la costa, el pular (peul) en el Futa Yallon, el malinké en la Alta Guinea y el kpelle, el kissi o el toma en la Guinea Forestal. La población es mayoritariamente musulmana: vista con ropa que cubra en los pueblos y lugares de culto, y sea discreto durante el ramadán. Saludar sin prisa antes de pedir cualquier cosa es fundamental. No fotografíe nunca instalaciones militares, administrativas o estratégicas (aeropuerto, puentes, puerto) y pida permiso antes de fotografiar a una persona.",
      },
      {
        title: "Desplazarse",
        body: "Las carreteras suelen estar en mal estado y los trayectos son muy largos, sobre todo en la estación de lluvias, cuando un 4x4 resulta imprescindible. Las autoridades francesas y británicas desaconsejan los mototaxis y el transporte colectivo, a menudo sobrecargados y mal mantenidos: opte por un coche con conductor que conozca la región. Circule solo de día y lleve combustible para las etapas largas. En Conakry el tráfico es muy denso; si llega de noche, organice con antelación el traslado desde el aeropuerto.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo C, F y K (los enchufes europeos suelen servir). Los cortes de luz son frecuentes: los hoteles disponen de generadores; lleve una batería externa y una linterna. Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al mobile money; la cobertura es buena en las ciudades y más irregular en el campo.",
      },
      {
        title: "Seguridad",
        body: "En el momento de redactar este texto, las autoridades francesas sitúan la mayor parte del país en «vigilancia reforzada» y desaconsejan, salvo motivo imperativo, las zonas fronterizas con Malí y Costa de Marfil (incluidas Siguiri, Mandiana y la reserva natural de Kankan); el Reino Unido señala tensiones en las zonas fronterizas. Las manifestaciones, a menudo ligadas a la situación política o a los cortes de electricidad, pueden degenerar: manténgase alejado de las concentraciones. La delincuencia (robos, atracos, asaltos a vehículos de noche) es real en Conakry y en algunas carreteras: evite circular de noche y caminar solo por lugares aislados, y cambie dinero solo en ventanillas autorizadas. Antes y durante el viaje, consulte los «Conseils aux voyageurs» de France Diplomatie, el «Foreign travel advice» del FCDO británico o las recomendaciones de viaje de su propio país, que son la referencia.",
      },
    ],
  },
  destinations: {
    conakry: {
      summary: "Bulliciosa capital extendida sobre una península, entre mercados, museo nacional y gran mezquita.",
      description:
        "Construida sobre la península de Kaloum y la isla de Tombo, y extendida después hacia el interior, Conakry reúne a cerca de uno de cada seis habitantes del país. Es el punto de llegada de casi todos los viajeros: se descubre la vida trepidante de sus mercados, el museo nacional, la imponente Gran Mezquita Faisal y el jardín botánico de Camayenne, antes de partir hacia las islas de Los o el interior. El tráfico es muy denso: calcule tiempo de sobra.",
    },
    "iles-de-loos": {
      name: "Islas de Los",
      summary: "Pequeño archipiélago frente a Conakry: playas de arena, cocoteros y pueblos de pescadores.",
      description:
        "A pocos kilómetros de Conakry, el archipiélago de las islas de Los cuenta con tres islas principales, Kassa, Tamara (Fotoba) y Roume, y varios islotes. Se viene a pasar el día o el fin de semana por sus playas, sus cocoteros y sus pueblos de pescadores, lejos del bullicio de la capital. Las travesías se hacen en barco desde Conakry.",
    },
    dubreka: {
      summary: "Cascadas y relieves verdes a unos cincuenta kilómetros de Conakry.",
      description:
        "Al noreste de la capital, la prefectura de Dubréka es una escapada verde fácil desde Conakry. Se viene sobre todo por las cataratas del Soumba, al pie de acantilados cubiertos de vegetación, y por los paisajes del macizo del Kakoulima, que domina la región costera.",
    },
    kindia: {
      summary: "Puerta del interior, conocida por sus frutas, sus cascadas y el monte Gangan.",
      description:
        "A unos 135 km al noreste de Conakry, Kindia es la primera gran ciudad en la ruta del Futa Yallon. Rodeada de colinas y huertos, es famosa por sus frutas (mangos, piñas, plátanos, cítricos), que abundan en su mercado. En los alrededores, el Velo de la Novia y el monte Gangan, cargado de leyendas, justifican una parada.",
    },
    dalaba: {
      summary: "Estación de altura del Futa Yallon, de clima fresco, entre pinos, cascadas y recuerdos de Miriam Makeba.",
      description:
        "Encaramada a más de 1000 metros de altitud, Dalaba ya era en la época colonial un lugar de descanso apreciado por su frescor. Sus colinas plantadas de pinos, sus pueblos peul y sus vistas sobre las mesetas del Futa Yallon invitan al senderismo. La cantante sudafricana Miriam Makeba, exiliada en Guinea, tenía aquí una casa. Muy cerca, las cataratas de Ditinn se cuentan entre las más espectaculares del país.",
    },
    pita: {
      summary: "Pequeña ciudad del Futa Yallon, punto de partida hacia las cataratas de Kambadaga y de Kinkon.",
      description:
        "Entre Dalaba y Labé, Pita es una ciudad tranquila en el corazón del Futa Yallon. Sirve de base para descubrir dos de los parajes naturales más impresionantes de la región: las cataratas de Kambadaga, una serie de cascadas espectaculares, y las cataratas de Kinkon, ligadas a una presa hidroeléctrica.",
    },
    labe: {
      summary: "Capital del Futa Yallon, ciudad de la cultura peul, del islam erudito y de la buena leche cuajada.",
      description:
        "Gran ciudad del norte del Futa Yallon, Labé fue la capital de una de las principales provincias del Estado teocrático peul fundado en el siglo XVIII. Sigue siendo un gran centro religioso y cultural de la cultura peul, con su gran mezquita, su animado mercado y sus especialidades culinarias. Una buena base para recorrer los pueblos y paisajes del norte del Futa.",
    },
    "mont-nimba": {
      name: "Montes Nimba",
      summary: "Macizo forestal declarado Patrimonio de la UNESCO, en la frontera marfileña: zona desaconsejada salvo motivo imperativo.",
      description:
        "En el extremo sureste, donde Guinea limita con Costa de Marfil y Liberia, los montes Nimba alcanzan el punto más alto del país. Su reserva natural integral, inscrita en el Patrimonio Mundial de la UNESCO (y en la lista del patrimonio en peligro), alberga una fauna y una flora excepcionales, con numerosas especies endémicas. Atención: en el momento de redactar este texto, France Diplomatie desaconseja, salvo motivo imperativo, las zonas fronterizas con Costa de Marfil; por eso este lugar se presenta como patrimonio, para preparar un viaje cuando las condiciones lo permitan.",
    },
  },
  places: {
    "musee-national-guinee": {
      name: "Museo Nacional de Guinea (Sandervalia)",
      summary: "Máscaras, estatuas e instrumentos de los pueblos de Guinea, en el barrio de Sandervalia.",
      description:
        "Situado en el barrio de Sandervalia, en Kaloum, el Museo Nacional presenta las culturas de las cuatro grandes regiones del país: máscaras y estatuas de la costa (entre ellas las célebres figuras Nimba de los baga), objetos del Futa Yallon, de la Alta Guinea y de la Guinea Forestal, instrumentos musicales y objetos cotidianos. Una introducción útil antes de viajar al interior.",
      tips: "Infórmese en el lugar sobre las salas abiertas; una visita guiada ayuda a comprender las colecciones.",
    },
    "grande-mosquee-faycal-conakry": {
      name: "Gran Mezquita Faisal",
      summary: "Una de las mayores mezquitas de África Occidental, inaugurada a principios de los años ochenta.",
      description:
        "Financiada con el apoyo de Arabia Saudí e inaugurada a principios de los años ochenta, la Gran Mezquita Faisal domina con sus minaretes el barrio de Camayenne. Puede acoger a miles de fieles. Muy cerca, el mausoleo de Camayenne alberga las tumbas de varias grandes figuras de la historia guineana.",
      tips: "Ropa que cubra (hombros y piernas, pañuelo para las mujeres); no la visite durante las oraciones y pida permiso para entrar.",
    },
    "marche-madina-conakry": {
      name: "Mercado de Madina",
      summary: "El mayor mercado de la capital: telas, especias, frutas, artesanía y todo lo demás.",
      description:
        "Inmenso y laberíntico, el mercado de Madina es el corazón comercial de Conakry. Allí se encuentran telas estampadas y bazin teñido, especias, frutas del país, menaje, productos de toda la subregión y algunos puestos de artesanía. Una inmersión intensa en la economía cotidiana.",
      tips: "Venga por la mañana, con pocos objetos de valor y preferiblemente con alguien que conozca el mercado; los carteristas son activos. Pida permiso antes de hacer fotos.",
    },
    "jardin-botanique-camayenne": {
      name: "Jardín botánico de Camayenne",
      summary: "Parque sombreado heredado de la época colonial, con árboles centenarios.",
      description:
        "Creado en la época colonial como jardín de ensayo, el jardín botánico de Camayenne conserva árboles tropicales de gran tamaño y paseos sombreados en plena ciudad. Una pausa tranquila lejos del ruido del tráfico, ideal al final del día.",
    },
    "ile-de-roume": {
      name: "Isla de Roume",
      summary: "Isla boscosa de calas de arena, que una tradición local asocia con «La isla del tesoro».",
      description:
        "Roume es la más pequeña de las tres grandes islas de Los, boscosa y bordeada de calas de arena fina. Una leyenda local cuenta que inspiró «La isla del tesoro» de Stevenson. Se pasa el día entre baños en las calas resguardadas, pescado a la parrilla y paseos entre la vegetación.",
      tips: "Elija un barco serio, equipado con chalecos salvavidas, y evite las travesías con mar agitada o en la estación de lluvias. Lleve agua y dinero en efectivo.",
      bestPeriod: "De noviembre a abril (estación seca, mar más tranquilo)",
    },
    "ile-de-kassa": {
      name: "Isla de Kassa",
      summary: "La más cercana a Conakry: playas, pueblos de pescadores y pequeños hoteles.",
      description:
        "Frente a la capital, Kassa es la isla más accesible del archipiélago. Sus playas, sus pueblos de pescadores y sus pocos alojamientos la convierten en una escapada apreciada por los habitantes de Conakry los fines de semana. En otro tiempo se explotó la bauxita en la isla, y aún se adivinan sus huellas.",
      tips: "Las mismas precauciones para la travesía; infórmese del estado del mar antes de bañarse.",
    },
    "chutes-de-la-soumba": {
      name: "Cataratas del Soumba",
      summary: "Cascada en un entorno verde, lugar apreciado para hacer pícnic y bañarse.",
      description:
        "Cerca de Dubréka, el Soumba cae por una pared rocosa en medio de una vegetación exuberante. El lugar es desde hace mucho una excursión dominical de los habitantes de Conakry. Las instalaciones se han deteriorado en los últimos años: infórmese de su estado antes de ir.",
      tips: "Las rocas resbalan; báñese solo en zonas tranquilas y nunca en época de crecida.",
      bestPeriod: "Final de la estación de lluvias y comienzo de la seca (mayor caudal)",
    },
    "mont-kakoulima": {
      name: "Macizo del Kakoulima",
      summary: "Montaña boscosa que domina la región de Conakry, para hacer senderismo con guía.",
      description:
        "El Kakoulima es el relieve más destacado de los alrededores de Conakry. Sus laderas boscosas se prestan al senderismo y, con buen tiempo, ofrecen amplias vistas sobre la llanura costera. Suba con un guía local que conozca los senderos.",
      tips: "Salga temprano con agua y buen calzado; evite la estación de lluvias, cuando los senderos resbalan.",
    },
    "voile-de-la-mariee-kindia": {
      name: "Velo de la Novia (Voile de la Mariée)",
      summary: "Cascada en finos hilos de agua sobre un acantilado, emblema de la región de Kindia.",
      description:
        "El Velo de la Novia debe su nombre al agua que se extiende en una fina cortina blanca a lo largo de un acantilado, como un velo nupcial. Es una de las cascadas más conocidas del país, en un entorno de bosque y rocas en los alrededores de Kindia.",
      tips: "Al final de la estación seca el caudal puede ser escaso; las rocas cercanas a la cascada resbalan.",
      bestPeriod: "De septiembre a diciembre (después de las lluvias)",
    },
    "mont-gangan": {
      name: "Monte Gangan",
      summary: "Montaña tutelar de Kindia, rodeada de leyendas, para una caminata panorámica.",
      description:
        "El monte Gangan domina Kindia y ocupa un lugar importante en las tradiciones locales, que le atribuyen numerosas leyendas. Su ascensión, con un guía, ofrece bonitas vistas sobre la ciudad y las colinas cercanas.",
      tips: "Vaya con un guía local y respete las normas relacionadas con los lugares sagrados.",
    },
    "marche-de-kindia": {
      name: "Mercado de Kindia",
      summary: "Animado mercado donde se amontonan las frutas de la región.",
      description:
        "El mercado de Kindia refleja la riqueza agrícola de la región: montañas de mangos y piñas según la temporada, plátanos, cítricos, verduras, especias y productos cotidianos. Un buen lugar para probar las frutas locales antes de volver a la carretera.",
      tips: "Mantenga sus pertenencias cerca y pida permiso antes de fotografiar a las vendedoras.",
    },
    "chutes-de-ditinn": {
      name: "Cataratas de Ditinn",
      summary: "Una de las cataratas más altas de Guinea, que cae desde un acantilado a un circo boscoso.",
      description:
        "En los alrededores de Dalaba, las cataratas de Ditinn caen desde un alto acantilado a un circo de vegetación. Se cuentan entre las más altas del país. Se llega por pista y luego a pie, a través del campo del Futa Yallon.",
      tips: "Pista difícil en la estación de lluvias: se recomiendan un 4x4 y un guía local. Lleve buen calzado.",
      bestPeriod: "De septiembre a diciembre (gran caudal, pistas transitables)",
    },
    "maison-miriam-makeba-dalaba": {
      name: "Casa de Miriam Makeba",
      summary: "La casa guineana de «Mama Africa», que le fue ofrecida durante su exilio.",
      description:
        "Exiliada de Sudáfrica, la cantante Miriam Makeba vivió en Guinea desde finales de los años sesenta. En Dalaba disponía de una casa de estilo local, donde recibía a artistas y personalidades. El edificio se ha deteriorado y se ha anunciado un proyecto de restauración: compruebe en el lugar su estado y las condiciones de visita.",
      tips: "Pregunte en Dalaba si es posible visitarla y vaya con un guía local.",
    },
    "collines-de-dalaba": {
      name: "Colinas y pinares de Dalaba",
      summary: "Caminatas al fresco entre pinos, pueblos peul y miradores sobre el Futa Yallon.",
      description:
        "Alrededor de la ciudad, los senderos unen pinares, cultivos en terrazas y pueblos peul de chozas redondas. El clima de altura hace agradable la caminata, y las crestas ofrecen amplias vistas sobre las mesetas y los valles del Futa Yallon.",
      tips: "Las noches pueden ser frescas en la estación seca: lleve algo de abrigo. Un guía local facilita el contacto en los pueblos.",
    },
    "chutes-de-kambadaga": {
      name: "Cataratas de Kambadaga",
      summary: "Sucesión de potentes cascadas en un paisaje salvaje, al oeste de Pita.",
      description:
        "A varias decenas de kilómetros de Pita, las cataratas de Kambadaga se suceden en varias cascadas potentes, de las más bellas del Futa Yallon. Se accede por una pista y luego por una bajada a pie bastante empinada. El lugar, rico en plantas raras, está afectado por proyectos hidroeléctricos.",
      tips: "Se recomiendan un vehículo todoterreno y un guía; la bajada es empinada y resbaladiza. Reserve el día entero.",
      bestPeriod: "De septiembre a diciembre (caudal máximo)",
    },
    "chutes-de-kinkon": {
      name: "Cataratas de Kinkon",
      summary: "Cascadas y embalse cerca de Pita, ligados a la presa de Kinkon.",
      description:
        "Cerca de Pita, el río salva una serie de saltos junto a la presa hidroeléctrica de Kinkon. El lugar, de acceso más fácil que Kambadaga, ofrece un bonito paseo por los paisajes del Futa Yallon.",
      tips: "No fotografíe las instalaciones de la presa sin autorización.",
    },
    "grande-mosquee-labe": {
      name: "Gran Mezquita de Labé (Karamoko Alfa mo Labé)",
      summary: "La gran mezquita de la ciudad, que lleva el nombre del fundador de la provincia de Labé.",
      description:
        "Con el nombre de Karamoko Alfa mo Labé, figura fundadora de la provincia de Labé, la gran mezquita está en el corazón de la vida religiosa de la ciudad y de todo el Futa Yallon. En los últimos años ha sido objeto de importantes obras de renovación.",
      tips: "Ropa que cubra; no la visite durante las oraciones y pida permiso antes de entrar o de hacer fotos.",
    },
    "marche-central-labe": {
      name: "Mercado central de Labé",
      summary: "Gran mercado regional: telas teñidas, productos de los pueblos, artesanía peul.",
      description:
        "El mercado de Labé reúne la producción de todo el norte del Futa Yallon: verduras, fonio, manteca de karité, telas teñidas, cestería, artículos de cuero y objetos cotidianos. Un lugar ideal para observar la vida de la región y llevarse una tela o una cesta.",
      tips: "Venga por la mañana; regatee con una sonrisa y pida permiso antes de hacer fotos.",
    },
    "cuisine-du-fouta-labe": {
      name: "Sabores del Futa Yallon",
      summary: "Fonio, leche cuajada y salsas de hojas: la cocina peul para probar en Labé.",
      description:
        "El Futa Yallon es la tierra del fonio, un pequeño cereal cultivado desde hace siglos que se sirve con salsas de hojas o de cacahuete. La leche cuajada, de los rebaños peul, acompaña muchas comidas y también se toma endulzada. Los comedores y restaurantes de Labé son el lugar ideal para descubrir esta cocina sencilla y generosa.",
      tips: "Pida consejo en su alojamiento para encontrar un buen sitio; elija platos bien cocinados y agua embotellada.",
    },
    "reserve-des-monts-nimba": {
      name: "Reserva natural integral de los montes Nimba",
      summary: "Bosques, praderas de altura y especies endémicas en un sitio del Patrimonio Mundial compartido con Costa de Marfil.",
      description:
        "La reserva abarca las laderas guineanas y marfileñas del macizo: bosque denso, bosques de galería y praderas de altura albergan especies que no se encuentran en ningún otro lugar, como el sapo vivíparo del Nimba. Inscrita en el Patrimonio Mundial a principios de los años ochenta, figura en la lista del patrimonio en peligro, sobre todo por la presión minera. El acceso está regulado.",
      tips: "Zona fronteriza desaconsejada salvo motivo imperativo por France Diplomatie en el momento de redactar este texto: consulte las recomendaciones de viaje actualizadas antes de cualquier proyecto. Todo acceso a la reserva requiere autorización de las autoridades gestoras.",
    },
    "chimpanzes-de-bossou": {
      name: "Chimpancés de Bossou",
      summary: "Comunidad de chimpancés estudiada desde hace décadas, célebre por usar herramientas de piedra.",
      description:
        "Al pie de los montes Nimba, las colinas boscosas de Bossou albergan una pequeña comunidad de chimpancés seguida por investigadores desde los años setenta. Es conocida en todo el mundo por su uso de herramientas, en especial piedras para partir nueces de palma. Los bosques son sagrados para los habitantes, que tradicionalmente protegen a los chimpancés.",
      tips: "Situado en zona fronteriza (Liberia, Costa de Marfil): consulte las recomendaciones de viaje actualizadas. La observación solo se hace con guías y según las normas del instituto de investigación local; mantenga la distancia con los animales.",
    },
  },
  circuits: {
    "guinee-conakry-fouta-djallon-9-jours": {
      title: "De Conakry al Futa Yallon en 9 días",
      summary:
        "Conakry y las islas de Los, las cascadas de Dubréka y Kindia, y luego las mesetas del Futa Yallon: Dalaba, las cataratas de Ditinn y Kambadaga, y Labé. Coche con conductor imprescindible; trayectos solo de día.",
    },
  },
  stepNotes: {
    "guinee-conakry-fouta-djallon-9-jours:0": "Llegada a Conakry (traslado organizado con antelación), primer contacto con la ciudad.",
    "guinee-conakry-fouta-djallon-9-jours:3": "Excursión de un día en barco a las islas de Los, regreso antes de que anochezca.",
    "guinee-conakry-fouta-djallon-9-jours:4": "Mañana en las cataratas del Soumba y luego ruta hacia Kindia.",
    "guinee-conakry-fouta-djallon-9-jours:6": "Cascada por la mañana y luego larga ruta hacia Dalaba por Mamou, de día.",
    "guinee-conakry-fouta-djallon-9-jours:8": "Un día por los alrededores de Dalaba, al fresco.",
    "guinee-conakry-fouta-djallon-9-jours:10": "Ruta hacia Pita y día en las cataratas; noche en Labé.",
    "guinee-conakry-fouta-djallon-9-jours:11": "Un día en Labé.",
    "guinee-conakry-fouta-djallon-9-jours:14": "Larga jornada de carretera hacia el sur, saliendo temprano para llegar antes de la noche.",
    "guinee-conakry-fouta-djallon-9-jours:15": "Regreso a Conakry, últimas compras.",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Reservatório de água da África Ocidental, onde nascem o Níger, o Senegal e o Gâmbia, a Guiné descobre-se longe do turismo de massas: a capital, Conacri, de frente para as ilhas de Los, as cascatas da região de Kindia e depois os planaltos frescos do Futa Jalom, as suas quedas de água vertiginosas e a cultura fula de Labé, até às florestas do monte Nimba, no extremo sudeste. Um país exigente, de estradas lentas, que recompensa os viajantes curiosos.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto, pedido em linha (e-visa) no portal oficial das autoridades guineenses, pelo menos alguns dias antes da partida; o comprovativo é apresentado à chegada. Os cidadãos da CEDEAO estão isentos. As condições mudam: confirme-as sempre junto das fontes oficiais antes de partir (passaporte válido vários meses após o regresso, bilhete de regresso, morada do alojamento, certificado de vacinação).",
      },
      {
        title: "Saúde",
        body: "É exigido o certificado de vacinação contra a febre-amarela (faz parte, entre outros, do pedido de e-visa): vacine-se antes de partir. O paludismo está presente em todo o país: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos (repelente, mosquiteiro). O país conheceu epidemias de febre hemorrágica (ébola): consulte informação sanitária atualizada. Beba água engarrafada; os cuidados de saúde são limitados fora de Conacri, pelo que um seguro que cubra o repatriamento é indispensável.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco guineense (GNF), não convertível: só se obtém já no país e a saída de divisas e de francos guineenses está limitada. Leve euros ou dólares em numerário e troque-os em bancos ou casas de câmbio autorizadas: o câmbio na rua é ilegal. O dinheiro vivo é indispensável em todo o lado; as caixas automáticas encontram-se sobretudo em Conacri e nas cidades maiores, e os cartões bancários só são aceites em alguns grandes hotéis. O pagamento por telemóvel (mobile money) está muito difundido.",
      },
      {
        title: "Quando ir",
        body: "A estação seca, de novembro a abril aproximadamente, é a melhor altura; o harmatão (vento seco e poeirento) sopra sobretudo de dezembro a fevereiro. A estação das chuvas, de maio-junho a outubro aproximadamente, é muito marcada no litoral: Conacri é uma das capitais mais chuvosas do mundo, com chuvas torrenciais em julho e agosto, quando muitas picadas ficam intransitáveis. Em altitude, o Futa Jalom é mais fresco; as suas quedas de água estão no auge no fim da estação das chuvas.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua oficial; no dia a dia fala-se, entre outras, o susu no litoral, o pular (fula) no Futa Jalom, o malinké na Alta Guiné e o kpelle, o kissi ou o toma na Guiné Florestal. A população é maioritariamente muçulmana: use roupa que cubra nas aldeias e nos locais de culto e seja discreto durante o ramadão. Cumprimentar sem pressa antes de qualquer pedido é essencial. Nunca fotografe instalações militares, administrativas ou estratégicas (aeroporto, pontes, porto) e peça autorização antes de fotografar alguém.",
      },
      {
        title: "Deslocações",
        body: "As estradas estão muitas vezes em mau estado e os trajetos são muito longos, sobretudo na estação das chuvas, em que um 4x4 se torna indispensável. As autoridades francesas e britânicas desaconselham os mototáxis e os transportes coletivos, frequentemente sobrelotados e mal conservados: prefira um carro com motorista que conheça a região. Circule apenas de dia e leve combustível para as etapas longas. Em Conacri o trânsito é muito intenso; se chegar de noite, combine antecipadamente o transfere a partir do aeroporto.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas de tipo C, F e K (as fichas europeias costumam servir). Os cortes de energia são frequentes: os hotéis têm geradores; leve uma bateria externa e uma lanterna. Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao mobile money; a cobertura é boa nas cidades e mais irregular no interior.",
      },
      {
        title: "Segurança",
        body: "À data da redação, as autoridades francesas colocam a maior parte do país em «vigilância reforçada» e desaconselham, salvo motivo imperativo, as zonas fronteiriças com o Mali e a Costa do Marfim (incluindo Siguiri, Mandiana e a reserva natural de Kankan); o Reino Unido assinala tensões nas zonas fronteiriças. As manifestações, muitas vezes ligadas à situação política ou aos cortes de eletricidade, podem degenerar: mantenha-se afastado dos ajuntamentos. A criminalidade (furtos, assaltos, assaltos a viaturas de noite) é real em Conacri e em alguns eixos rodoviários: evite circular de noite e andar sozinho em locais isolados, e troque dinheiro apenas em balcões autorizados. Antes e durante a viagem, consulte os «Conseils aux voyageurs» da France Diplomatie, o «Foreign travel advice» do FCDO britânico ou os conselhos aos viajantes do seu próprio país, que fazem fé.",
      },
    ],
  },
  destinations: {
    conakry: {
      name: "Conacri",
      summary: "Capital fervilhante estendida numa península, entre mercados, museu nacional e grande mesquita.",
      description:
        "Construída na península de Kaloum e na ilha de Tombo, e depois estendida para o interior, Conacri concentra cerca de um em cada seis habitantes do país. É o ponto de chegada de quase todos os viajantes: descobre-se a vida frenética dos mercados, o museu nacional, a imponente Grande Mesquita Faisal e o jardim botânico de Camayenne, antes de partir para as ilhas de Los ou para o interior. O trânsito é muito intenso: conte com tempo de sobra.",
    },
    "iles-de-loos": {
      name: "Ilhas de Los",
      summary: "Pequeno arquipélago ao largo de Conacri: praias de areia, coqueiros e aldeias de pescadores.",
      description:
        "A poucos quilómetros ao largo de Conacri, o arquipélago das ilhas de Los conta com três ilhas principais, Kassa, Tamara (Fotoba) e Roume, e vários ilhéus. Vem-se passar o dia ou o fim de semana pelas praias, pelos coqueirais e pelas aldeias de pescadores, longe da agitação da capital. As travessias fazem-se de barco a partir de Conacri.",
    },
    dubreka: {
      summary: "Cascatas e relevos verdejantes a cerca de cinquenta quilómetros de Conacri.",
      description:
        "A nordeste da capital, a prefeitura de Dubréka é uma escapadinha verde fácil a partir de Conacri. Vem-se sobretudo pelas quedas de água do Soumba, ao pé de falésias cobertas de vegetação, e pelas paisagens do maciço do Kakoulima, que domina a região costeira.",
    },
    kindia: {
      summary: "Porta do interior, conhecida pela fruta, pelas cascatas e pelo monte Gangan.",
      description:
        "A cerca de 135 km a nordeste de Conacri, Kindia é a primeira grande cidade na estrada para o Futa Jalom. Rodeada de colinas e pomares, é famosa pela sua fruta (mangas, ananases, bananas, citrinos), que abunda no mercado. Nos arredores, o Véu da Noiva e o monte Gangan, carregado de lendas, justificam uma paragem.",
    },
    dalaba: {
      summary: "Estância de altitude do Futa Jalom, de clima fresco, entre pinheiros, cascatas e memórias de Miriam Makeba.",
      description:
        "Empoleirada a mais de 1000 metros de altitude, Dalaba já era na época colonial um local de repouso apreciado pela sua frescura. As colinas plantadas de pinheiros, as aldeias fulas e as vistas sobre os planaltos do Futa Jalom convidam a caminhadas. A cantora sul-africana Miriam Makeba, exilada na Guiné, tinha aqui uma casa. Perto, as quedas de água de Ditinn estão entre as mais espetaculares do país.",
    },
    pita: {
      summary: "Pequena cidade do Futa Jalom, ponto de partida para as quedas de água de Kambadaga e de Kinkon.",
      description:
        "Entre Dalaba e Labé, Pita é uma cidade tranquila no coração do Futa Jalom. Serve de base para descobrir dois dos locais naturais mais impressionantes da região: as quedas de água de Kambadaga, uma série de cascatas espetaculares, e as de Kinkon, ligadas a uma barragem hidroelétrica.",
    },
    labe: {
      summary: "Capital do Futa Jalom, cidade da cultura fula, do islão erudito e do bom leite coalhado.",
      description:
        "Grande cidade do norte do Futa Jalom, Labé foi a sede de uma das principais províncias do Estado teocrático fula fundado no século XVIII. Continua a ser um grande centro religioso e cultural da cultura fula, com a sua grande mesquita, o mercado animado e as especialidades culinárias. Uma boa base para percorrer as aldeias e as paisagens do norte do Futa.",
    },
    "mont-nimba": {
      name: "Montes Nimba",
      summary: "Maciço florestal classificado pela UNESCO, na fronteira marfinense: zona desaconselhada salvo motivo imperativo.",
      description:
        "No extremo sudeste, onde a Guiné faz fronteira com a Costa do Marfim e a Libéria, os montes Nimba atingem o ponto mais alto do país. A sua reserva natural integral, inscrita no Património Mundial da UNESCO (e na lista do património em perigo), abriga uma fauna e uma flora excecionais, com muitas espécies endémicas. Atenção: à data da redação, a France Diplomatie desaconselha, salvo motivo imperativo, as zonas fronteiriças com a Costa do Marfim; este local é, por isso, apresentado como património, para preparar uma viagem quando as condições o permitirem.",
    },
  },
  places: {
    "musee-national-guinee": {
      name: "Museu Nacional da Guiné (Sandervalia)",
      summary: "Máscaras, estátuas e instrumentos dos povos da Guiné, no bairro de Sandervalia.",
      description:
        "Instalado no bairro de Sandervalia, em Kaloum, o Museu Nacional apresenta as culturas das quatro grandes regiões do país: máscaras e estátuas do litoral (entre elas as célebres figuras Nimba dos baga), objetos do Futa Jalom, da Alta Guiné e da Guiné Florestal, instrumentos musicais e objetos do quotidiano. Uma introdução útil antes de partir para o interior.",
      tips: "Informe-se no local sobre as salas abertas; uma visita guiada ajuda a compreender as coleções.",
    },
    "grande-mosquee-faycal-conakry": {
      name: "Grande Mesquita Faisal",
      summary: "Uma das maiores mesquitas da África Ocidental, inaugurada no início dos anos 1980.",
      description:
        "Financiada com o apoio da Arábia Saudita e inaugurada no início dos anos 1980, a Grande Mesquita Faisal domina com os seus minaretes o bairro de Camayenne. Pode acolher milhares de fiéis. Perto, o mausoléu de Camayenne guarda os túmulos de várias grandes figuras da história guineense.",
      tips: "Roupa que cubra (ombros e pernas, lenço para as mulheres); não visite durante as orações e peça autorização para entrar.",
    },
    "marche-madina-conakry": {
      name: "Mercado de Madina",
      summary: "O maior mercado da capital: tecidos, especiarias, fruta, artesanato e tudo o resto.",
      description:
        "Imenso e labiríntico, o mercado de Madina é o coração comercial de Conacri. Encontram-se tecidos estampados e bazin tingido, especiarias, fruta da terra, loiça, produtos de toda a sub-região e algumas bancas de artesanato. Uma imersão intensa na economia do dia a dia.",
      tips: "Venha de manhã, com poucos objetos de valor e de preferência com alguém que conheça o mercado; os carteiristas são ativos. Peça autorização antes de fotografar.",
    },
    "jardin-botanique-camayenne": {
      name: "Jardim Botânico de Camayenne",
      summary: "Parque sombreado herdado da época colonial, com árvores centenárias.",
      description:
        "Criado na época colonial como jardim de ensaio, o jardim botânico de Camayenne conserva árvores tropicais de grande porte e alamedas sombreadas em plena cidade. Uma pausa tranquila longe do ruído do trânsito, ideal ao fim do dia.",
    },
    "ile-de-roume": {
      name: "Ilha de Roume",
      summary: "Ilha arborizada com enseadas de areia, que uma tradição local associa à «Ilha do Tesouro».",
      description:
        "Roume é a mais pequena das três grandes ilhas de Los, arborizada e orlada de enseadas de areia fina. Uma lenda local diz que terá inspirado «A Ilha do Tesouro» de Stevenson. Passa-se o dia entre banhos nas enseadas abrigadas, peixe grelhado e passeios pela vegetação.",
      tips: "Escolha um barco fiável, equipado com coletes salva-vidas, e evite travessias com mar agitado ou na estação das chuvas. Leve água e dinheiro vivo.",
      bestPeriod: "De novembro a abril (estação seca, mar mais calmo)",
    },
    "ile-de-kassa": {
      name: "Ilha de Kassa",
      summary: "A mais próxima de Conacri: praias, aldeias de pescadores e pequenos hotéis.",
      description:
        "Em frente à capital, Kassa é a ilha mais acessível do arquipélago. As praias, as aldeias de pescadores e os poucos alojamentos fazem dela uma escapadinha apreciada pelos habitantes de Conacri ao fim de semana. A ilha foi em tempos explorada para bauxite, cujos vestígios ainda se adivinham.",
      tips: "As mesmas precauções na travessia; informe-se sobre o estado do mar antes de tomar banho.",
    },
    "chutes-de-la-soumba": {
      name: "Quedas de água do Soumba",
      summary: "Cascata num recanto verdejante, local apreciado para piqueniques e banhos.",
      description:
        "Perto de Dubréka, o Soumba despenha-se por uma parede rochosa no meio de uma vegetação luxuriante. O local é há muito um passeio de domingo dos habitantes de Conacri. As infraestruturas degradaram-se nos últimos anos: informe-se sobre o seu estado antes de ir.",
      tips: "As rochas são escorregadias; tome banho apenas em zonas calmas e nunca em período de cheia.",
      bestPeriod: "Fim da estação das chuvas e início da estação seca (maior caudal)",
    },
    "mont-kakoulima": {
      name: "Maciço do Kakoulima",
      summary: "Montanha arborizada que domina a região de Conacri, para caminhar com guia.",
      description:
        "O Kakoulima é o relevo mais marcante dos arredores de Conacri. As encostas arborizadas prestam-se a caminhadas e, com tempo limpo, oferecem vistas amplas sobre a planície costeira. Suba com um guia local que conheça os trilhos.",
      tips: "Parta cedo com água e bom calçado; evite a estação das chuvas, quando os trilhos ficam escorregadios.",
    },
    "voile-de-la-mariee-kindia": {
      name: "Véu da Noiva (Voile de la Mariée)",
      summary: "Cascata em finos fios de água sobre uma falésia, emblema da região de Kindia.",
      description:
        "O Véu da Noiva deve o nome à água que se espalha numa fina cortina branca ao longo de uma falésia, como um véu de noiva. É uma das cascatas mais conhecidas do país, num cenário de floresta e rochas nos arredores de Kindia.",
      tips: "No fim da estação seca o caudal pode ser fraco; as rochas junto à queda são escorregadias.",
      bestPeriod: "De setembro a dezembro (depois das chuvas)",
    },
    "mont-gangan": {
      name: "Monte Gangan",
      summary: "Montanha tutelar de Kindia, envolta em lendas, para uma caminhada panorâmica.",
      description:
        "O monte Gangan domina Kindia e ocupa um lugar importante nas tradições locais, que lhe atribuem muitas lendas. A subida, com um guia, oferece belas vistas sobre a cidade e as colinas em redor.",
      tips: "Vá com um guia local e respeite as regras ligadas aos lugares sagrados.",
    },
    "marche-de-kindia": {
      name: "Mercado de Kindia",
      summary: "Mercado animado onde se amontoa a fruta da região.",
      description:
        "O mercado de Kindia reflete a riqueza agrícola da região: montanhas de mangas e ananases conforme a época, bananas, citrinos, legumes, especiarias e produtos do dia a dia. Um bom sítio para provar a fruta local antes de voltar à estrada.",
      tips: "Mantenha os seus pertences perto de si e peça autorização antes de fotografar as vendedoras.",
    },
    "chutes-de-ditinn": {
      name: "Quedas de água de Ditinn",
      summary: "Uma das quedas de água mais altas da Guiné, a mergulhar de uma falésia num circo arborizado.",
      description:
        "Nos arredores de Dalaba, as quedas de água de Ditinn caem de uma alta falésia num circo de vegetação. Estão entre as mais altas do país. O acesso faz-se por picada e depois a pé, através do campo do Futa Jalom.",
      tips: "Picada difícil na estação das chuvas: recomendam-se um 4x4 e um guia local. Leve bom calçado.",
      bestPeriod: "De setembro a dezembro (grande caudal, picadas transitáveis)",
    },
    "maison-miriam-makeba-dalaba": {
      name: "Casa de Miriam Makeba",
      summary: "A casa guineense de «Mama Africa», oferecida durante o seu exílio.",
      description:
        "Exilada da África do Sul, a cantora Miriam Makeba viveu na Guiné a partir do fim dos anos 1960. Em Dalaba tinha uma casa de estilo local, onde recebia artistas e personalidades. O edifício degradou-se e foi anunciado um projeto de restauro: confirme no local o estado do sítio e as condições de visita.",
      tips: "Pergunte em Dalaba se é possível visitar e vá com um guia local.",
    },
    "collines-de-dalaba": {
      name: "Colinas e pinhais de Dalaba",
      summary: "Caminhadas à fresca entre pinheiros, aldeias fulas e miradouros sobre o Futa Jalom.",
      description:
        "À volta da cidade, os trilhos ligam pinhais, culturas em socalcos e aldeias fulas de cubatas redondas. O clima de altitude torna a caminhada agradável e as cumeadas oferecem vistas amplas sobre os planaltos e os vales do Futa Jalom.",
      tips: "As noites podem ser frescas na estação seca: leve uma camisola. Um guia local facilita o contacto nas aldeias.",
    },
    "chutes-de-kambadaga": {
      name: "Quedas de água de Kambadaga",
      summary: "Sucessão de cascatas poderosas numa paisagem selvagem, a oeste de Pita.",
      description:
        "A várias dezenas de quilómetros de Pita, as quedas de água de Kambadaga sucedem-se em várias cascatas poderosas, das mais belas do Futa Jalom. O acesso faz-se por uma picada e depois por uma descida a pé bastante íngreme. O local, rico em plantas raras, é afetado por projetos hidroelétricos.",
      tips: "Recomendam-se um veículo todo-o-terreno e um guia; a descida é íngreme e escorregadia. Conte com o dia inteiro.",
      bestPeriod: "De setembro a dezembro (caudal máximo)",
    },
    "chutes-de-kinkon": {
      name: "Quedas de água de Kinkon",
      summary: "Cascatas e albufeira perto de Pita, ligadas à barragem de Kinkon.",
      description:
        "Perto de Pita, o rio transpõe uma série de quedas junto à barragem hidroelétrica de Kinkon. De acesso mais fácil do que Kambadaga, o local proporciona um belo passeio pelas paisagens do Futa Jalom.",
      tips: "Não fotografe as instalações da barragem sem autorização.",
    },
    "grande-mosquee-labe": {
      name: "Grande Mesquita de Labé (Karamoko Alfa mo Labé)",
      summary: "A grande mesquita da cidade, com o nome do fundador da província de Labé.",
      description:
        "Com o nome de Karamoko Alfa mo Labé, figura fundadora da província de Labé, a grande mesquita está no centro da vida religiosa da cidade e de todo o Futa Jalom. Foi alvo de importantes obras de renovação nos últimos anos.",
      tips: "Roupa que cubra; não visite durante as orações e peça autorização antes de entrar ou fotografar.",
    },
    "marche-central-labe": {
      name: "Mercado central de Labé",
      summary: "Grande mercado regional: tecidos tingidos, produtos das aldeias, artesanato fula.",
      description:
        "O mercado de Labé reúne a produção de todo o norte do Futa Jalom: legumes, fonio, manteiga de karité, tecidos tingidos, cestaria, artigos de couro e objetos do dia a dia. Um local ideal para observar a vida da região e levar um tecido ou um cesto.",
      tips: "Venha de manhã; regateie com um sorriso e peça autorização antes de fotografar.",
    },
    "cuisine-du-fouta-labe": {
      name: "Sabores do Futa Jalom",
      summary: "Fonio, leite coalhado e molhos de folhas: a cozinha fula para provar em Labé.",
      description:
        "O Futa Jalom é a terra do fonio, um pequeno cereal cultivado há séculos e servido com molhos de folhas ou de amendoim. O leite coalhado, dos rebanhos fulas, acompanha muitas refeições e também se come adoçado. As tascas e os restaurantes de Labé são o sítio ideal para descobrir esta cozinha simples e generosa.",
      tips: "Peça conselho no alojamento para encontrar uma boa morada; prefira pratos bem cozinhados e água engarrafada.",
    },
    "reserve-des-monts-nimba": {
      name: "Reserva natural integral dos montes Nimba",
      summary: "Florestas, prados de altitude e espécies endémicas num sítio do Património Mundial partilhado com a Costa do Marfim.",
      description:
        "A reserva abrange as encostas guineenses e marfinenses do maciço: floresta densa, florestas-galeria e prados de altitude abrigam espécies que não existem em mais lado nenhum, como o sapo vivíparo do Nimba. Inscrita no Património Mundial no início dos anos 1980, figura na lista do património em perigo, sobretudo devido à pressão mineira. O acesso é regulamentado.",
      tips: "Zona fronteiriça desaconselhada salvo motivo imperativo pela France Diplomatie à data da redação: consulte os conselhos aos viajantes atualizados antes de qualquer projeto. Qualquer acesso à reserva exige autorização das autoridades gestoras.",
    },
    "chimpanzes-de-bossou": {
      name: "Chimpanzés de Bossou",
      summary: "Comunidade de chimpanzés estudada há décadas, célebre pelo uso de ferramentas de pedra.",
      description:
        "Ao pé dos montes Nimba, as colinas arborizadas de Bossou abrigam uma pequena comunidade de chimpanzés acompanhada por investigadores desde os anos 1970. É conhecida no mundo inteiro pelo uso de ferramentas, em especial pedras para partir nozes de palmeira. As florestas são sagradas para os habitantes, que tradicionalmente protegem os chimpanzés.",
      tips: "Situado em zona fronteiriça (Libéria, Costa do Marfim): consulte os conselhos aos viajantes atualizados. A observação só se faz com guias e segundo as regras do instituto de investigação local; mantenha distância dos animais.",
    },
  },
  circuits: {
    "guinee-conakry-fouta-djallon-9-jours": {
      title: "De Conacri ao Futa Jalom em 9 dias",
      summary:
        "Conacri e as ilhas de Los, as cascatas de Dubréka e de Kindia e depois os planaltos do Futa Jalom: Dalaba, as quedas de água de Ditinn e de Kambadaga, e Labé. Carro com motorista indispensável; trajetos apenas de dia.",
    },
  },
  stepNotes: {
    "guinee-conakry-fouta-djallon-9-jours:0": "Chegada a Conacri (transfere combinado com antecedência), primeiro contacto com a cidade.",
    "guinee-conakry-fouta-djallon-9-jours:3": "Dia de barco nas ilhas de Los, regresso antes do anoitecer.",
    "guinee-conakry-fouta-djallon-9-jours:4": "Manhã nas quedas de água do Soumba e depois estrada para Kindia.",
    "guinee-conakry-fouta-djallon-9-jours:6": "Cascata de manhã e depois longa viagem até Dalaba, por Mamou, de dia.",
    "guinee-conakry-fouta-djallon-9-jours:8": "Um dia nos arredores de Dalaba, à fresca.",
    "guinee-conakry-fouta-djallon-9-jours:10": "Estrada para Pita e dia nas quedas de água; noite em Labé.",
    "guinee-conakry-fouta-djallon-9-jours:11": "Um dia em Labé.",
    "guinee-conakry-fouta-djallon-9-jours:14": "Longo dia de estrada para sul, com partida cedo para chegar antes do anoitecer.",
    "guinee-conakry-fouta-djallon-9-jours:15": "Regresso a Conacri, últimas compras.",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "خزّان مياه غرب أفريقيا، حيث تنبع أنهار النيجر والسنغال وغامبيا، تُكتشف غينيا بعيدًا عن السياحة الجماعية: العاصمة كوناكري قبالة جزر لوس، وشلالات منطقة كينديا، ثم هضاب فوتا جالون المعتدلة بشلالاتها الشاهقة وثقافة الفولاني في لابي، وصولًا إلى غابات جبل نيمبا في أقصى الجنوب الشرقي. بلد متطلّب، طرقه بطيئة، لكنه يكافئ المسافرين الفضوليين.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين إلى تأشيرة تُطلب عبر الإنترنت (تأشيرة إلكترونية) على البوابة الرسمية للسلطات الغينية قبل السفر ببضعة أيام على الأقل، ويُقدَّم الإيصال عند الوصول. ويُعفى منها مواطنو المجموعة الاقتصادية لدول غرب أفريقيا (إيكواس). الشروط تتغيّر: تحقّق منها دائمًا لدى المصادر الرسمية قبل السفر (جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان مكان الإقامة، وشهادة التطعيم).",
      },
      {
        title: "الصحة",
        body: "تُطلب شهادة التطعيم ضد الحمى الصفراء (وهي من مستندات طلب التأشيرة الإلكترونية أيضًا): احصل على اللقاح قبل السفر. والملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن علاج وقائي، واحمِ نفسك من البعوض (طارد للحشرات، ناموسية). وقد شهدت البلاد أوبئة حمّى نزفية (إيبولا): راجع المعلومات الصحية المحدّثة. اشرب المياه المعبّأة؛ والرعاية الطبية محدودة خارج كوناكري، لذا لا غنى عن تأمين يغطي الإعادة إلى الوطن.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي الفرنك الغيني (GNF)، وهو غير قابل للتحويل: لا يمكن الحصول عليه إلا داخل البلاد، وإخراج العملات الأجنبية والفرنكات الغينية محدود بسقف. احمل يوروهات أو دولارات نقدًا وصرّفها في المصارف أو مكاتب الصرافة المرخّصة: الصرف في الشارع غير قانوني. النقد ضروري في كل مكان؛ وتوجد أجهزة الصرف الآلي أساسًا في كوناكري والمدن الكبرى، ولا تُقبل البطاقات المصرفية إلا في بعض الفنادق الكبرى. والدفع عبر الهاتف المحمول (mobile money) واسع الانتشار.",
      },
      {
        title: "متى تسافر",
        body: "موسم الجفاف، من نوفمبر إلى أبريل تقريبًا، هو أفضل فترة للزيارة؛ وتهبّ رياح الهرمتان (ريح جافة محمّلة بالغبار) خاصةً من ديسمبر إلى فبراير. أما موسم الأمطار، من مايو-يونيو تقريبًا إلى أكتوبر، فشديد على الساحل: كوناكري من أكثر العواصم مطرًا في العالم، مع أمطار غزيرة في يوليو وأغسطس تصبح فيها كثير من المسالك غير صالحة للسير. وفي المرتفعات تبقى فوتا جالون أكثر اعتدالًا، وتكون شلالاتها في أبهى حالاتها في نهاية موسم الأمطار.",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي اللغة الرسمية، ويُتحدَّث يوميًا بلغات منها السوسو على الساحل، والبولار (الفولانية) في فوتا جالون، والمالينكي في غينيا العليا، والكبيلي والكيسي والتوما في منطقة الغابات. أغلب السكان مسلمون: ارتدِ ملابس محتشمة في القرى وأماكن العبادة، وكن متحفّظًا خلال شهر رمضان. والتحية المتأنّية قبل أي طلب أمر أساسي. لا تصوّر أبدًا المواقع العسكرية أو الإدارية أو الاستراتيجية (المطار، الجسور، الميناء)، واستأذن قبل تصوير أي شخص.",
      },
      {
        title: "التنقل",
        body: "كثيرًا ما تكون الطرق في حالة سيئة والرحلات طويلة جدًا، لا سيما في موسم الأمطار حيث تصبح سيارة الدفع الرباعي ضرورية. وتنصح السلطات الفرنسية والبريطانية بتجنّب سيارات الأجرة النارية ووسائل النقل الجماعي، التي غالبًا ما تكون مكتظة وسيئة الصيانة: فضّل سيارة مع سائق يعرف المنطقة. لا تتنقّل إلا نهارًا، واحمل وقودًا للمراحل الطويلة. وحركة المرور في كوناكري كثيفة جدًا؛ وإذا وصلت ليلًا فرتّب انتقالك من المطار مسبقًا.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار 220 فولت، والمقابس من النوع C وF وK (المقابس الأوروبية تناسب عادةً). انقطاعات الكهرباء متكررة: تتوفّر في الفنادق مولّدات، فاحمل بطارية خارجية ومصباحًا يدويًا. وتتيح شريحة اتصال محلية (يُطلب إثبات هوية) الوصول إلى الإنترنت عبر الهاتف وإلى خدمة mobile money؛ والتغطية جيدة في المدن وأقل انتظامًا في الأرياف.",
      },
      {
        title: "الأمن",
        body: "حتى تاريخ كتابة هذا النص، تصنّف السلطات الفرنسية معظم البلاد ضمن «اليقظة المعزّزة»، وتنصح بعدم التوجّه، إلا لسبب قاهر، إلى المناطق الحدودية مع مالي وكوت ديفوار (ومنها سيغيري ومانديانا ومحمية كانكان الطبيعية)؛ وتشير المملكة المتحدة إلى توترات في المناطق الحدودية. قد تتحوّل المظاهرات، المرتبطة غالبًا بالوضع السياسي أو بانقطاع الكهرباء، إلى أعمال عنف: ابقَ بعيدًا عن التجمعات. والجريمة (السرقة، والاعتداءات، وسلب المركبات ليلًا) خطر حقيقي في كوناكري وعلى بعض الطرق: تجنّب التنقل ليلًا والمشي وحيدًا في الأماكن المعزولة، ولا تصرّف المال إلا في الشبابيك المرخّصة. قبل الرحلة وخلالها، راجع «نصائح للمسافرين» على موقع وزارة الخارجية الفرنسية (France Diplomatie) أو «Foreign travel advice» لوزارة الخارجية البريطانية (FCDO) أو توصيات السفر في بلدك، فهي المرجع المعتمد.",
      },
    ],
  },
  destinations: {
    conakry: {
      name: "كوناكري",
      region: "كوناكري",
      summary: "عاصمة صاخبة ممتدة على شبه جزيرة، بين الأسواق والمتحف الوطني والمسجد الكبير.",
      description:
        "بُنيت كوناكري على شبه جزيرة كالوم وجزيرة تومبو ثم امتدت بعيدًا نحو الداخل، ويقطنها نحو واحد من كل ستة من سكان البلاد. إنها نقطة وصول جميع المسافرين تقريبًا: تُكتشف فيها حياة الأسواق المحمومة، والمتحف الوطني، ومسجد الملك فيصل الكبير المهيب، وحديقة كامايين النباتية، قبل الانطلاق نحو جزر لوس أو داخل البلاد. حركة المرور كثيفة جدًا: خصّص وقتًا كافيًا.",
    },
    "iles-de-loos": {
      name: "جزر لوس",
      region: "كوناكري",
      summary: "أرخبيل صغير قبالة كوناكري: شواطئ رملية وأشجار جوز الهند وقرى صيادين.",
      description:
        "على بُعد بضعة كيلومترات من كوناكري، يضم أرخبيل جزر لوس ثلاث جزر رئيسية هي كاسا وتامارا (فوتوبا) وروم، إلى جانب عدة جزر صغيرة. يقصدها الزوار ليوم أو لعطلة نهاية الأسبوع للاستمتاع بشواطئها وبساتين جوز الهند وقرى الصيادين، بعيدًا عن صخب العاصمة. تنطلق رحلات العبور بالقارب من كوناكري.",
    },
    dubreka: {
      name: "دوبريكا",
      region: "كينديا",
      summary: "شلالات وتلال خضراء على بُعد نحو خمسين كيلومترًا من كوناكري.",
      description:
        "إلى الشمال الشرقي من العاصمة، تُعدّ محافظة دوبريكا متنفسًا أخضر يسهل بلوغه من كوناكري. يأتيها الزوار خاصةً من أجل شلالات سومبا عند سفح منحدرات صخرية تكسوها النباتات، ومن أجل مناظر كتلة كاكوليما الجبلية التي تطلّ على المنطقة الساحلية.",
    },
    kindia: {
      name: "كينديا",
      region: "كينديا",
      summary: "بوابة الداخل، المشهورة بفواكهها وشلالاتها وجبل غانغان.",
      description:
        "على بُعد نحو 135 كيلومترًا شمال شرق كوناكري، كينديا هي أول مدينة كبيرة على طريق فوتا جالون. تحيط بها التلال والبساتين، وتشتهر بفواكهها (المانجو والأناناس والموز والحمضيات) التي تملأ سوقها. وفي الجوار، يستحق شلال «طرحة العروس» وجبل غانغان، المحاط بالأساطير، التوقف عندهما.",
    },
    dalaba: {
      name: "دالابا",
      region: "مامو",
      summary: "مصيف جبلي في فوتا جالون بمناخ معتدل، بين أشجار الصنوبر والشلالات وذكريات ميريام ماكيبا.",
      description:
        "تقع دالابا على ارتفاع يزيد على 1000 متر، وكانت منذ الحقبة الاستعمارية مكانًا للاستجمام يُقصد لاعتدال مناخه. تدعو تلالها المزروعة بالصنوبر وقرى الفولاني والمناظر المطلة على هضاب فوتا جالون إلى المشي. وكانت المغنية الجنوب أفريقية ميريام ماكيبا، التي عاشت منفية في غينيا، تملك منزلًا فيها. وعلى مقربة منها، تُعدّ شلالات ديتين من أروع شلالات البلاد.",
    },
    pita: {
      name: "بيتا",
      region: "لابي",
      summary: "مدينة صغيرة في فوتا جالون، ونقطة انطلاق نحو شلالات كامباداغا وكينكون.",
      description:
        "بين دالابا ولابي، بيتا مدينة هادئة في قلب فوتا جالون. وهي قاعدة لاكتشاف اثنين من أروع المواقع الطبيعية في المنطقة: شلالات كامباداغا، وهي سلسلة من الشلالات المذهلة، وشلالات كينكون المرتبطة بسدّ لتوليد الكهرباء.",
    },
    labe: {
      name: "لابي",
      region: "لابي",
      summary: "عاصمة فوتا جالون، مدينة الثقافة الفولانية والعلم الإسلامي واللبن الرائب الشهي.",
      description:
        "لابي هي المدينة الكبرى في شمال فوتا جالون، وكانت مقرّ إحدى أهم ولايات الدولة الثيوقراطية الفولانية التي تأسست في القرن الثامن عشر. ولا تزال مركزًا دينيًا وثقافيًا رئيسيًا للثقافة الفولانية، بمسجدها الكبير وسوقها النابض بالحياة وأطباقها المميزة. وهي قاعدة جيدة لاستكشاف قرى شمال فوتا ومناظره.",
    },
    "mont-nimba": {
      name: "جبال نيمبا",
      region: "نزيريكوري",
      summary: "كتلة جبلية حرجية مدرجة في قائمة اليونسكو على الحدود الإيفوارية: منطقة لا يُنصح بزيارتها إلا لسبب قاهر.",
      description:
        "في أقصى الجنوب الشرقي، حيث تلتقي غينيا بكوت ديفوار وليبيريا، ترتفع جبال نيمبا إلى أعلى نقطة في البلاد. ومحميتها الطبيعية المتكاملة، المدرجة في قائمة التراث العالمي لليونسكو (وفي قائمة التراث المعرّض للخطر)، تأوي حيوانات ونباتات استثنائية، منها أنواع كثيرة متوطّنة. تنبيه: حتى تاريخ كتابة هذا النص، تنصح وزارة الخارجية الفرنسية بعدم التوجّه إلى المناطق الحدودية مع كوت ديفوار إلا لسبب قاهر؛ لذا يُقدَّم هذا الموقع بوصفه تراثًا، للتحضير لرحلة حين تسمح الظروف بذلك.",
    },
  },
  places: {
    "musee-national-guinee": {
      name: "المتحف الوطني الغيني (ساندرفاليا)",
      summary: "أقنعة وتماثيل وآلات موسيقية لشعوب غينيا، في حي ساندرفاليا.",
      description:
        "يقع المتحف الوطني في حي ساندرفاليا في كالوم، ويعرض ثقافات المناطق الكبرى الأربع في البلاد: أقنعة وتماثيل من الساحل (منها تماثيل نيمبا الشهيرة لشعب الباغا)، وقطع من فوتا جالون وغينيا العليا ومنطقة الغابات، وآلات موسيقية وأدوات من الحياة اليومية. مدخل مفيد قبل التوجّه إلى داخل البلاد.",
      tips: "استفسر في المكان عن القاعات المفتوحة؛ فالجولة المصحوبة بمرشد تساعد على فهم المجموعات.",
    },
    "grande-mosquee-faycal-conakry": {
      name: "مسجد الملك فيصل الكبير",
      summary: "من أكبر المساجد في غرب أفريقيا، افتُتح في مطلع ثمانينيات القرن العشرين.",
      description:
        "شُيّد مسجد الملك فيصل الكبير بدعم من المملكة العربية السعودية وافتُتح في مطلع الثمانينيات، وتهيمن مآذنه على حي كامايين. ويتّسع لآلاف المصلين. وعلى مقربة منه، يضم ضريح كامايين قبور عدد من كبار الشخصيات في تاريخ غينيا.",
      tips: "ملابس محتشمة (تغطي الكتفين والساقين، وغطاء رأس للنساء)؛ لا تزره في أوقات الصلاة واستأذن قبل الدخول.",
    },
    "marche-madina-conakry": {
      name: "سوق مدينا",
      summary: "أكبر أسواق العاصمة: أقمشة وتوابل وفواكه وحِرف يدوية وكل شيء آخر.",
      description:
        "سوق مدينا الشاسع المتشعّب هو القلب التجاري لكوناكري. تجد فيه الأقمشة المطبوعة وقماش البازان المصبوغ، والتوابل، والفواكه المحلية، والأواني، وبضائع من أنحاء المنطقة، وبعض أكشاك الحرف اليدوية. انغماس مكثّف في الاقتصاد اليومي.",
      tips: "تعال صباحًا ومعك القليل من الأغراض الثمينة، ويُفضَّل برفقة شخص يعرف السوق؛ فالنشّالون ناشطون. استأذن قبل التصوير.",
    },
    "jardin-botanique-camayenne": {
      name: "حديقة كامايين النباتية",
      summary: "حديقة ظليلة موروثة من الحقبة الاستعمارية، بأشجار معمّرة.",
      description:
        "أُنشئت حديقة كامايين النباتية في الحقبة الاستعمارية كحديقة تجارب، ولا تزال تضم أشجارًا استوائية ضخمة وممرات ظليلة في قلب المدينة. استراحة هادئة بعيدًا عن ضجيج المرور، مثالية في آخر النهار.",
    },
    "ile-de-roume": {
      name: "جزيرة روم",
      summary: "جزيرة مشجّرة ذات خلجان رملية، يربطها تقليد محلي برواية «جزيرة الكنز».",
      description:
        "روم هي أصغر الجزر الثلاث الكبرى في أرخبيل لوس، مشجّرة وتحفّها خلجان من الرمل الناعم. وتقول أسطورة محلية إنها ألهمت رواية «جزيرة الكنز» لستيفنسون. يُقضى فيها اليوم بين السباحة في الخلجان المحمية والسمك المشوي والتنزّه بين النباتات.",
      tips: "اختر قاربًا موثوقًا مجهّزًا بسترات نجاة، وتجنّب العبور حين يكون البحر هائجًا أو في موسم الأمطار. احمل الماء والنقود.",
      bestPeriod: "من نوفمبر إلى أبريل (موسم الجفاف، بحر أهدأ)",
    },
    "ile-de-kassa": {
      name: "جزيرة كاسا",
      summary: "الأقرب إلى كوناكري: شواطئ وقرى صيادين وفنادق صغيرة.",
      description:
        "قبالة العاصمة، كاسا هي أسهل جزر الأرخبيل وصولًا. تجعل منها شواطئها وقرى صياديها وأماكن الإقامة القليلة فيها وجهةً محبّبة لسكان كوناكري في عطلات نهاية الأسبوع. وقد استُغلّت الجزيرة قديمًا لاستخراج البوكسيت، ولا تزال آثاره ظاهرة.",
      tips: "الاحتياطات نفسها عند العبور؛ واستفسر عن حالة البحر قبل السباحة.",
    },
    "chutes-de-la-soumba": {
      name: "شلالات سومبا",
      summary: "شلال وسط الخضرة، مكان مفضّل للنزهات والسباحة.",
      description:
        "قرب دوبريكا، ينحدر نهر سومبا على جدار صخري وسط نباتات كثيفة. والموقع منذ زمن طويل وجهة نزهة يوم الأحد لسكان كوناكري. وقد تدهورت مرافقه في السنوات الأخيرة: استفسر عن حالتها قبل الذهاب.",
      tips: "الصخور زلقة؛ لا تسبح إلا في المواضع الهادئة، وأبدًا في أوقات الفيضان.",
      bestPeriod: "نهاية موسم الأمطار وبداية موسم الجفاف (تدفّق أقوى)",
    },
    "mont-kakoulima": {
      name: "كتلة كاكوليما الجبلية",
      summary: "جبل حرجي يطلّ على منطقة كوناكري، للمشي برفقة مرشد.",
      description:
        "كاكوليما هو أبرز المرتفعات حول كوناكري. منحدراته الحرجية مناسبة للمشي، وتوفّر في الأيام الصافية إطلالات واسعة على السهل الساحلي. اصعد برفقة مرشد محلي يعرف المسالك.",
      tips: "انطلق باكرًا ومعك الماء وحذاء جيد؛ وتجنّب موسم الأمطار حين تصبح المسالك زلقة.",
    },
    "voile-de-la-mariee-kindia": {
      name: "شلال طرحة العروس (Voile de la Mariée)",
      summary: "شلال ينساب خيوطًا رفيعة على جرف صخري، رمز منطقة كينديا.",
      description:
        "يدين شلال «طرحة العروس» باسمه للماء الذي ينبسط ستارًا أبيض رقيقًا على طول جرف صخري، كأنه طرحة عروس. وهو من أشهر شلالات البلاد، في إطار من الغابات والصخور بضواحي كينديا.",
      tips: "قد يضعف التدفّق في أواخر موسم الجفاف؛ والصخور القريبة من الشلال زلقة.",
      bestPeriod: "من سبتمبر إلى ديسمبر (بعد الأمطار)",
    },
    "mont-gangan": {
      name: "جبل غانغان",
      summary: "الجبل الحارس لكينديا، تحيط به الأساطير، لنزهة مشي ذات إطلالات بانورامية.",
      description:
        "يطلّ جبل غانغان على كينديا ويحتلّ مكانة مهمة في التقاليد المحلية التي تنسج حوله أساطير كثيرة. ويتيح صعوده برفقة مرشد إطلالات جميلة على المدينة والتلال المحيطة.",
      tips: "اصطحب مرشدًا محليًا واحترم القواعد المتعلقة بالأماكن المقدسة.",
    },
    "marche-de-kindia": {
      name: "سوق كينديا",
      summary: "سوق نابض بالحياة تتكدّس فيه فواكه المنطقة.",
      description:
        "يعكس سوق كينديا الثراء الزراعي للمنطقة: أكوام من المانجو والأناناس بحسب الموسم، والموز والحمضيات والخضروات والتوابل ومستلزمات الحياة اليومية. مكان جيد لتذوّق الفواكه المحلية قبل استئناف الطريق.",
      tips: "أبقِ أغراضك قريبة منك واستأذن قبل تصوير البائعات.",
    },
    "chutes-de-ditinn": {
      name: "شلالات ديتين",
      summary: "من أعلى شلالات غينيا، يهوي من جرف إلى حوض تكسوه الأشجار.",
      description:
        "بضواحي دالابا، تهوي شلالات ديتين من جرف عالٍ إلى حوض من الخضرة. وهي من أعلى شلالات البلاد. يُوصَل إليها عبر مسلك ترابي ثم سيرًا على الأقدام في أرياف فوتا جالون.",
      tips: "المسلك صعب في موسم الأمطار: يُنصح بسيارة دفع رباعي ومرشد محلي. احمل حذاءً جيدًا.",
      bestPeriod: "من سبتمبر إلى ديسمبر (تدفّق قوي، ومسالك سالكة)",
    },
    "maison-miriam-makeba-dalaba": {
      name: "منزل ميريام ماكيبا",
      summary: "المنزل الغيني لـ«ماما أفريكا»، الذي أُهدي إليها خلال منفاها.",
      description:
        "عاشت المغنية ميريام ماكيبا، المنفية من جنوب أفريقيا، في غينيا منذ أواخر الستينيات. وكان لها في دالابا منزل على الطراز المحلي تستقبل فيه الفنانين والشخصيات. وقد تدهور المبنى وأُعلن عن مشروع لترميمه: تحقّق في المكان من حالة الموقع وشروط الزيارة.",
      tips: "اسأل في دالابا عن إمكانية الزيارة واصطحب مرشدًا محليًا.",
    },
    "collines-de-dalaba": {
      name: "تلال دالابا وغابات الصنوبر",
      summary: "نزهات مشي في الأجواء المعتدلة بين الصنوبر وقرى الفولاني ونقاط مطلّة على فوتا جالون.",
      description:
        "حول المدينة، تربط المسالك بين غابات الصنوبر والمدرّجات الزراعية وقرى الفولاني ذات الأكواخ المستديرة. ويجعل مناخ المرتفعات المشي ممتعًا، فيما توفّر القمم إطلالات واسعة على هضاب فوتا جالون ووديانها.",
      tips: "قد تكون الليالي باردة في موسم الجفاف: احمل سترة خفيفة. والمرشد المحلي يسهّل التواصل في القرى.",
    },
    "chutes-de-kambadaga": {
      name: "شلالات كامباداغا",
      summary: "سلسلة من الشلالات القوية وسط طبيعة برية، غرب بيتا.",
      description:
        "على بُعد عشرات الكيلومترات من بيتا، تتوالى شلالات كامباداغا في عدة مساقط قوية، من أجمل شلالات فوتا جالون. يُوصَل إليها عبر مسلك ترابي ثم نزولًا سيرًا على الأقدام في منحدر شديد نسبيًا. والموقع الغني بالنباتات النادرة معنيّ بمشاريع لتوليد الطاقة الكهرومائية.",
      tips: "يُنصح بسيارة رباعية الدفع ومرشد؛ فالنزول شديد الانحدار وزلق. خصّص يومًا كاملًا.",
      bestPeriod: "من سبتمبر إلى ديسمبر (أقصى تدفّق)",
    },
    "chutes-de-kinkon": {
      name: "شلالات كينكون",
      summary: "شلالات وبحيرة سدّ قرب بيتا، مرتبطة بسدّ كينكون.",
      description:
        "قرب بيتا، يجتاز النهر سلسلة من المساقط بجوار سدّ كينكون لتوليد الكهرباء. والموقع أسهل وصولًا من كامباداغا، ويتيح نزهة جميلة في مناظر فوتا جالون.",
      tips: "لا تصوّر منشآت السدّ دون إذن.",
    },
    "grande-mosquee-labe": {
      name: "المسجد الكبير في لابي (كاراموكو ألفا مو لابي)",
      summary: "المسجد الكبير في المدينة، ويحمل اسم مؤسس ولاية لابي.",
      description:
        "يحمل المسجد الكبير اسم كاراموكو ألفا مو لابي، الشخصية المؤسِّسة لولاية لابي، وهو في قلب الحياة الدينية للمدينة ولفوتا جالون كلها. وقد خضع لأعمال ترميم كبيرة في السنوات الأخيرة.",
      tips: "ملابس محتشمة؛ لا تزره في أوقات الصلاة واستأذن قبل الدخول أو التصوير.",
    },
    "marche-central-labe": {
      name: "السوق المركزي في لابي",
      summary: "سوق إقليمي كبير: أقمشة مصبوغة ومنتجات القرى وحِرف فولانية.",
      description:
        "يجمع سوق لابي منتجات شمال فوتا جالون كله: الخضروات، والفونيو، وزبدة الشيا، والأقمشة المصبوغة، والسلال، والمصنوعات الجلدية، ومستلزمات الحياة اليومية. مكان مثالي لمراقبة حياة المنطقة واقتناء قطعة قماش أو سلّة.",
      tips: "تعال صباحًا؛ فاوِض بابتسامة واستأذن قبل التصوير.",
    },
    "cuisine-du-fouta-labe": {
      name: "نكهات فوتا جالون",
      summary: "الفونيو واللبن الرائب وصلصات الأوراق: المطبخ الفولاني للتذوّق في لابي.",
      description:
        "فوتا جالون هي أرض الفونيو، وهو حبوب صغيرة تُزرع منذ قرون وتُقدَّم مع صلصات من الأوراق أو الفول السوداني. ويرافق اللبن الرائب، من قطعان الفولاني، كثيرًا من الوجبات، ويؤكل أيضًا محلّى. ومطاعم لابي الشعبية وغيرها هي المكان المثالي لاكتشاف هذا المطبخ البسيط والسخي.",
      tips: "اطلب نصيحة مكان إقامتك لإيجاد عنوان جيد؛ وفضّل الأطباق المطهوّة جيدًا والمياه المعبّأة.",
    },
    "reserve-des-monts-nimba": {
      name: "محمية جبال نيمبا الطبيعية المتكاملة",
      summary: "غابات ومروج جبلية وأنواع متوطّنة في موقع تراث عالمي مشترك مع كوت ديفوار.",
      description:
        "تغطي المحمية المنحدرات الغينية والإيفوارية للكتلة الجبلية: غابات كثيفة وغابات نهرية ومروج مرتفعة تأوي أنواعًا لا توجد في أي مكان آخر، مثل ضفدع نيمبا الولود. أُدرجت في قائمة التراث العالمي في مطلع الثمانينيات، وهي مدرجة في قائمة التراث المعرّض للخطر، لا سيما بسبب ضغوط التعدين. والدخول إليها منظّم.",
      tips: "منطقة حدودية تنصح وزارة الخارجية الفرنسية، حتى تاريخ كتابة هذا النص، بعدم التوجّه إليها إلا لسبب قاهر: راجع توصيات السفر المحدّثة قبل أي مشروع. ويتطلب أي دخول إلى المحمية إذنًا من السلطات المسؤولة عن إدارتها.",
    },
    "chimpanzes-de-bossou": {
      name: "شمبانزي بوسو",
      summary: "مجموعة شمبانزي تُدرس منذ عقود، تشتهر باستخدام أدوات حجرية.",
      description:
        "عند سفح جبال نيمبا، تأوي تلال بوسو الحرجية مجموعة صغيرة من الشمبانزي يتابعها الباحثون منذ السبعينيات. وهي معروفة عالميًا باستخدامها الأدوات، ولا سيما الحجارة لكسر جوز النخيل. والغابات مقدسة لدى السكان الذين يحمون الشمبانزي تقليديًا.",
      tips: "يقع في منطقة حدودية (ليبيريا، كوت ديفوار): راجع توصيات السفر المحدّثة. ولا تتم المشاهدة إلا برفقة المرشدين ووفق قواعد معهد البحث المحلي؛ وحافظ على مسافة من الحيوانات.",
    },
  },
  circuits: {
    "guinee-conakry-fouta-djallon-9-jours": {
      title: "من كوناكري إلى فوتا جالون في 9 أيام",
      summary:
        "كوناكري وجزر لوس، وشلالات دوبريكا وكينديا، ثم هضاب فوتا جالون: دالابا، وشلالات ديتين وكامباداغا، ولابي. السيارة مع سائق ضرورية، والتنقل نهارًا فقط.",
    },
  },
  stepNotes: {
    "guinee-conakry-fouta-djallon-9-jours:0": "الوصول إلى كوناكري (مع ترتيب الانتقال من المطار مسبقًا)، وأول تعرّف على المدينة.",
    "guinee-conakry-fouta-djallon-9-jours:3": "يوم بالقارب في جزر لوس، والعودة قبل حلول الظلام.",
    "guinee-conakry-fouta-djallon-9-jours:4": "صباح عند شلالات سومبا، ثم الطريق إلى كينديا.",
    "guinee-conakry-fouta-djallon-9-jours:6": "الشلال صباحًا، ثم طريق طويل إلى دالابا مرورًا بمامو، نهارًا.",
    "guinee-conakry-fouta-djallon-9-jours:8": "يوم في ضواحي دالابا، في الأجواء المعتدلة.",
    "guinee-conakry-fouta-djallon-9-jours:10": "الطريق إلى بيتا ويوم عند الشلالات، ثم المبيت في لابي.",
    "guinee-conakry-fouta-djallon-9-jours:11": "يوم في لابي.",
    "guinee-conakry-fouta-djallon-9-jours:14": "يوم طويل على الطريق نحو الجنوب، مع انطلاق مبكر للوصول قبل حلول الظلام.",
    "guinee-conakry-fouta-djallon-9-jours:15": "العودة إلى كوناكري، وآخر المشتريات.",
  },
};

export const GUINEE_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
