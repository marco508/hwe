/**
 * Traductions du contenu de départ du guide Ghana (voir ./ghana.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de ghana.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "Primer país del África subsahariana en alcanzar la independencia, en 1957, Ghana recibe a sus visitantes con un cálido «Akwaaba» (bienvenido): fuertes y castillos de la costa, testigos de la trata atlántica, playas bordeadas de cocoteros, la selva tropical de Kakum, la viva cultura ashanti de Kumasi, las cascadas de la región del Volta y, más al norte, las sabanas del parque de Mole.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado, que se obtiene en las representaciones diplomáticas de Ghana o mediante los procedimientos en línea vigentes. Los ciudadanos de la CEDEAO están exentos, y las normas están cambiando para otros países africanos. Compruebe siempre los requisitos actualizados en las fuentes oficiales antes de salir: pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos (repelente, mosquitera). Beba agua embotellada y evite bañarse en agua dulce estancada sin consejo local.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el cedi ghanés (GHS), cuyo tipo de cambio varía notablemente: infórmese en el momento de salir. El pago por móvil (mobile money, «MoMo») está en todas partes, incluso en los pequeños comercios. Las tarjetas bancarias se aceptan en los hoteles y grandes comercios de Accra y Kumasi; hay cajeros en las ciudades, pero lleve efectivo para las zonas rurales.",
      },
      {
        title: "Cuándo ir",
        body: "El sur tiene dos estaciones de lluvias (la principal, aproximadamente de abril a junio, y otra más corta hacia septiembre–octubre); el norte, una sola (aproximadamente de mayo a octubre). La época más agradable va de noviembre a marzo, la estación seca, con el harmattan (viento seco y polvoriento) de diciembre a febrero. El parque de Mole se visita preferentemente en la estación seca, cuando la fauna se concentra en torno a los puntos de agua.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El inglés es la lengua oficial; en el día a día se hablan, entre otras, el twi (akan), el ewe, el ga, el fante y el dagbani. Los saludos son muy importantes: tómese tiempo para saludar antes de pedir cualquier cosa y use la mano derecha para dar, recibir o comer. Vista con decoro fuera de la playa. Pida permiso antes de fotografiar a una persona, una ceremonia o un jefe tradicional; está prohibido fotografiar instalaciones militares y los alrededores del aeropuerto.",
      },
      {
        title: "Desplazarse",
        body: "Los tro-tros (minibuses colectivos) y los taxis compartidos son los transportes más habituales; varias compañías de autocares unen las grandes ciudades y hay vuelos internos desde Accra, entre otros a Kumasi y Tamale. En Accra, las aplicaciones de vehículos con conductor están muy extendidas. Fuera de las grandes ciudades, opte por un coche con conductor reservado a través de un proveedor serio y evite circular de noche.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 230 V, enchufes de tipo G (modelo británico de tres clavijas rectangulares): lleve un adaptador. Una tarjeta SIM local, registrada con su pasaporte, da acceso a internet móvil y al mobile money.",
      },
      {
        title: "Seguridad",
        body: "Ghana es uno de los destinos más visitados de África Occidental y la mayoría de los lugares turísticos del sur se visitan en buenas condiciones, con una vigilancia normal. Las autoridades francesas desaconsejan formalmente la franja fronteriza norte con Burkina Faso (incluidas Tumu, Navrongo y Bawku) y desaconsejan, salvo motivo imperioso, otras zonas fronterizas del norte (parque de Gbele, frontera occidental con Burkina Faso, noroeste de la frontera con Costa de Marfil, sectores del noreste de la frontera con Togo); el Reino Unido desaconseja todo viaje no esencial al municipio de Bawku. Puede haber toques de queda locales en el norte. En el resto del país, la delincuencia (tirones, robos en viviendas, a veces con violencia) afecta sobre todo a Accra, Kumasi, Takoradi y las playas: evite caminar solo de noche e ir solo a playas aisladas. El baño es peligroso en la costa (corrientes fuertes, playas sin vigilancia) y conviene no conducir de noche. Consulte antes y durante el viaje las recomendaciones de viaje de France Diplomatie y del Foreign Office británico (FCDO), que se actualizan con regularidad.",
      },
    ],
  },
  destinations: {
    accra: {
      region: "Gran Acra",
      summary: "Vibrante capital en el golfo de Guinea: memoria de la independencia, barrios antiguos, mercados y vida nocturna.",
      description:
        "Punto de llegada de la mayoría de los viajeros, Accra mezcla modernos distritos de negocios, viejos barrios de pescadores y mercados rebosantes. Allí se descubren el parque conmemorativo Kwame Nkrumah, las callejuelas de Jamestown y su faro, el bullicio del mercado de Makola y la animación de Osu, con sus restaurantes y su comida callejera. La escena artística y musical (highlife, afrobeats) es especialmente viva.",
    },
    "cape-coast": {
      region: "Central",
      summary: "Antigua capital de la Costa de Oro, su castillo declarado Patrimonio de la UNESCO y el cercano bosque de Kakum.",
      description:
        "Ciudad universitaria y antigua capital colonial, Cape Coast está dominada por su castillo, uno de los principales lugares de memoria de la trata atlántica, inscrito junto con los demás fuertes y castillos de la costa en el Patrimonio Mundial de la UNESCO. Al norte, el parque nacional de Kakum y su pasarela entre las copas de los árboles ofrecen un contraste sorprendente. Una base ideal para explorar la costa central, a unas tres horas por carretera de Accra.",
    },
    elmina: {
      region: "Central",
      summary: "El castillo europeo más antiguo del África subsahariana y un colorido puerto pesquero.",
      description:
        "A unos quince kilómetros al oeste de Cape Coast, Elmina fue uno de los primeros puntos de contacto entre europeos y africanos en la costa: los portugueses construyeron allí en 1482 el castillo de San Jorge de la Mina, tomado después por los neerlandeses. Hoy el castillo y el fuerte de Santiago dominan un puerto pesquero muy animado, repleto de cientos de piraguas pintadas.",
    },
    busua: {
      name: "Busua y el cabo de las Tres Puntas",
      region: "Occidental",
      summary: "Una bahía de arena, surf, fuertes olvidados y el cabo más meridional del país.",
      description:
        "En la costa oeste, Busua es un pequeño pueblo de playa apreciado por su playa en forma de arco, sus escuelas de surf y su ambiente relajado. Los alrededores esconden calas bordeadas de cocoteros, el pueblo pesquero de Dixcove y su fuerte británico, y el cabo de las Tres Puntas, extremo sur de Ghana. Una etapa de descanso tras las visitas de la costa central.",
    },
    kumasi: {
      region: "Ashanti",
      summary: "Capital del reino ashanti: palacio real, kente, festivales y mercados gigantescos.",
      description:
        "Segunda ciudad del país, Kumasi es el corazón del reino ashanti, cuyo rey, el Asantehene, conserva un papel tradicional de primer orden. Se visita el museo del palacio de Manhyia, uno se pierde en el inmenso mercado de Kejetia y se hacen excursiones a los pueblos de tejedores de kente y al lago Bosumtwi. Asistir a una fiesta de Akwasidae es un momento destacado. A unas cuatro o cinco horas por carretera de Accra, o una hora de vuelo.",
    },
    "hohoe-volta": {
      name: "Hohoe y las montañas del Volta",
      region: "Volta",
      summary: "Colinas verdes, las cascadas más altas del país y santuarios de monos.",
      description:
        "Al este del país, cerca de la frontera con Togo, la región del Volta despliega colinas cubiertas de bosque, pueblos ewe y lugares gestionados por las comunidades: las cascadas de Wli, el monte Afadjato y el santuario de monos de Tafi Atome. Hohoe es la base práctica para recorrerla. Una región ideal para el senderismo, como complemento de la costa.",
    },
    mole: {
      name: "Parque nacional de Mole",
      region: "Savannah",
      summary: "El mayor parque de Ghana: safaris a pie entre elefantes en la sabana del norte.",
      description:
        "La mayor área protegida del país, el parque nacional de Mole abarca sabanas arboladas donde viven elefantes, antílopes, facóqueros, babuinos y numerosas aves. Es famoso por sus safaris a pie acompañados de guardas armados, que a menudo permiten acercarse a los elefantes. Se llega desde Tamale, con vuelos desde Accra. El parque no está en una zona desaconsejada por las autoridades francesas o británicas, pero el norte del país exige una vigilancia reforzada: consulte las recomendaciones de viaje antes de salir.",
    },
    keta: {
      name: "Keta y el estuario del Volta",
      region: "Volta",
      summary: "Lagunas, cordón de arena, fuerte danés y desembocadura del Volta, en el país de los ewe anlo.",
      description:
        "En el extremo sureste del país, la costa de la región del Volta extiende un estrecho cordón de arena entre el océano y la gran laguna de Keta, rica en aves. La pequeña ciudad de Keta conserva las ruinas del fuerte danés Prinzenstein, y la cercana Anloga acoge cada noviembre el gran festival Hogbetsotso. Más al oeste, Ada Foah marca la desembocadura del Volta, con sus bancos de arena y sus paseos en piragua. Una costa tranquila, lejos del ajetreo de Accra.",
    },
    akosombo: {
      name: "Akosombo y el lago Volta",
      region: "Oriental",
      summary: "La gran presa, el lago Volta, el puente de Adomi y el país krobo de las cuentas de vidrio.",
      description:
        "A unas dos horas al noreste de Accra, Akosombo es la puerta del lago Volta, el inmenso embalse creado por la presa terminada en 1965. Las colinas boscosas que enmarcan el río, el puente de Adomi y los cruceros por el lago hacen de la zona una escapada apreciada desde la capital. Muy cerca, el país krobo, en torno a Odumase y Somanya, perpetúa el arte de las cuentas de vidrio y celebra cada otoño el Ngmayem.",
    },
    "koforidua-kwahu": {
      name: "Koforidua, Boti y la meseta de Kwahu",
      region: "Oriental",
      summary: "Cascadas gemelas, rocas sorprendentes y acantilados del Kwahu, meca del parapente en Semana Santa.",
      description:
        "Capital de la región Oriental, Koforidua está rodeada de colinas boscosas donde se esconden las cataratas gemelas de Boti y la sorprendente Umbrella Rock. Más al noroeste, la meseta de Kwahu alza sus acantilados sobre la llanura: sus ciudades encaramadas, como Abetifi y Mpraeso, se animan sobre todo en Semana Santa, cuando la diáspora kwahu vuelve a casa y el festival de parapente de Odweanoma atrae a miles de visitantes.",
    },
    kintampo: {
      name: "Kintampo y Bono Oriental",
      region: "Bono Oriental",
      summary: "Cascadas escalonadas y un bosque sagrado de monos, a medio camino entre Kumasi y Tamale.",
      description:
        "En la gran carretera que une Kumasi con Tamale, la región de Bono Oriental marca la transición entre selva y sabana. Las cataratas de Kintampo, escalonadas sobre el río Pumpum, ofrecen una parada refrescante, y el santuario de Boabeng-Fiema, cerca de Nkoranza, protege monos considerados sagrados por los aldeanos. Techiman, gran mercado agrícola, es la ciudad principal de la zona.",
    },
    tamale: {
      name: "Tamale",
      region: "Norte",
      summary: "La gran ciudad del norte, puerta del parque de Mole y corazón del reino dagomba.",
      description:
        "Capital de la región Norte, Tamale es la principal ciudad del norte de Ghana y la puerta de entrada al parque nacional de Mole, con vuelos desde Accra. Ciudad mayoritariamente musulmana, de amplias avenidas recorridas por motos, es el centro cultural de los dagomba: se ven las túnicas tejidas en tiras («smocks» o «fugu») y se puede asistir al Damba o a la fiesta del fuego (Bugum). Las zonas cercanas a la frontera norte deben evitarse, pero Tamale no está en una zona desaconsejada: consulte de todos modos las recomendaciones de viaje.",
    },
    "beyin-nzulezo": {
      name: "Beyin, Nzulezo y Ankasa",
      region: "Occidental",
      summary: "Un pueblo sobre pilotes, un fuerte británico junto al océano y selva tropical primaria en el extremo oeste.",
      description:
        "En el extremo occidental de la costa, cerca de Costa de Marfil, el país nzema ofrece una etapa fuera de los caminos trillados. Desde Beyin, dominado por el fuerte Apollonia, una piragua remonta los pantanos de rafia hasta Nzulezo, un pueblo construido íntegramente sobre pilotes en medio del lago Amansuri. Más al norte, el área de conservación de Ankasa protege una de las selvas tropicales húmedas más ricas del país. Las carreteras son largas: cuente al menos dos días desde Busua o Takoradi.",
    },
  },
  places: {
    "parc-memorial-kwame-nkrumah": {
      name: "Parque conmemorativo Kwame Nkrumah",
      summary: "Mausoleo y museo del padre de la independencia, donde fue proclamada en 1957.",
      description:
        "Construido en el antiguo campo de polo donde Kwame Nkrumah proclamó la independencia de Ghana el 6 de marzo de 1957, el parque alberga el mausoleo del primer presidente y de su esposa, así como un museo que recorre su vida y el movimiento panafricano. Un lugar esencial para comprender la historia del país y su papel en las independencias africanas.",
    },
    "jamestown-accra": {
      name: "Jamestown y su faro",
      summary: "El viejo barrio de pescadores ga, sus fuertes coloniales y su faro a rayas.",
      description:
        "Cuna histórica de Accra, Jamestown creció en torno a fuertes europeos, como el fuerte James británico y el fuerte Ussher, de origen neerlandés. Se pasea entre piraguas de colores, boxeadores entrenando y casas antiguas, antes de subir al faro para contemplar la costa. Cada año, el festival de arte urbano Chale Wote llena sus callejuelas de murales, performances y música.",
      tips: "Visítelo de día, preferiblemente con un guía del barrio, y pida permiso antes de fotografiar a los vecinos.",
    },
    "marche-de-makola": {
      name: "Mercado de Makola",
      summary: "El gran mercado del centro de Accra: telas wax, cuentas, especias y productos frescos.",
      description:
        "En pleno centro, Makola es el mercado más famoso de Accra, gestionado en gran parte por mujeres comerciantes. Sus pasillos rebosan de telas wax, cuentas, utensilios, especias y productos frescos. Una inmersión ruidosa y colorida en el comercio ghanés.",
      tips: "Vaya por la mañana, mantenga sus pertenencias cerca y cuidado con los carteristas entre la multitud.",
    },
    "osu-accra": {
      name: "Osu y la comida callejera",
      summary: "Un barrio animado para probar jollof, waakye, kelewele y pescado a la parrilla.",
      description:
        "En torno a Oxford Street, el barrio de Osu concentra restaurantes, bares y vendedores ambulantes. Es el lugar ideal para descubrir la cocina ghanesa: arroz jollof, waakye (arroz con alubias), kelewele (plátano macho especiado y frito), fufu o banku con sopas, pescado a la parrilla y tilapia. Por la noche, la música toma el relevo.",
      tips: "Los «chop bars» sirven platos tradicionales a buen precio; elija puestos concurridos, donde la comida se renueva rápido.",
    },
    "chateau-de-cape-coast": {
      name: "Castillo de Cape Coast",
      summary: "Fortaleza blanca frente al océano, sus mazmorras y su «Puerta del No Retorno».",
      description:
        "Fundado en el siglo XVII y ampliado después por los británicos, el castillo de Cape Coast fue uno de los grandes centros de la trata atlántica. La visita guiada lleva a las mazmorras donde se hacinaba a los cautivos antes de embarcarlos por la «Puerta del No Retorno». Un museo recorre la historia de la región y de la trata. Una visita sobrecogedora, convertida en lugar de peregrinación para los descendientes de la diáspora africana.",
    },
    "canopee-de-kakum": {
      name: "Parque nacional de Kakum y su pasarela de copas",
      summary: "Pasarelas colgantes en las copas de los árboles de una selva tropical preservada.",
      description:
        "A unos treinta kilómetros al norte de Cape Coast, el parque nacional de Kakum protege una vasta selva tropical húmeda. Su famosa pasarela, una serie de puentes colgantes entre los árboles a varias decenas de metros del suelo, permite observar la selva desde arriba. Los paseos guiados a pie dan a conocer plantas medicinales, aves y mariposas; los grandes mamíferos, como los elefantes de bosque, son muy esquivos.",
      tips: "Vaya temprano por la mañana para evitar las multitudes y disfrutar de las aves. Desaconsejado para quienes sufren vértigo.",
    },
    "assin-manso": {
      name: "Río de los esclavos de Assin Manso",
      summary: "Lugar de memoria donde los cautivos tomaban su último baño antes de llegar a la costa.",
      description:
        "Al norte de Cape Coast, Assin Manso fue una etapa importante en la ruta de los cautivos hacia los fuertes de la costa. En el río, llamado Donkor Nsuo, tomaban su último baño antes de la marcha final. El lugar, acondicionado como parque conmemorativo, acoge ceremonias de recogimiento, sobre todo para visitantes de la diáspora africana.",
    },
    "fetu-afahye": {
      name: "Festival Fetu Afahye",
      summary: "La gran fiesta anual de Cape Coast: procesión de jefes, tambores y trajes.",
      description:
        "Cada año, la población de Cape Coast (Oguaa) celebra el Fetu Afahye, fiesta tradicional que, según la tradición, conmemora el fin de una epidemia y marca un tiempo de purificación y renovación. El momento culminante es la colorida procesión de los jefes en palanquín, acompañados por las compañías asafo, los tambores y la multitud, por las calles de la ciudad.",
      tips: "Las fechas exactas las fijan cada año las autoridades tradicionales: compruébelas antes de reservar.",
      bestPeriod: "Principios de septiembre",
    },
    "chateau-d-elmina": {
      name: "Castillo de Elmina",
      summary: "Construido por los portugueses en 1482, inscrito en el Patrimonio Mundial de la UNESCO.",
      description:
        "Construido a partir de 1482 para el comercio del oro, el castillo de San Jorge de la Mina se considera el edificio europeo más antiguo del África subsahariana. En manos neerlandesas desde el siglo XVII, fue un lugar central de la trata atlántica. La visita guiada recorre patios, mazmorras, aposentos del gobernador y la «Puerta del No Retorno».",
    },
    "fort-saint-jacques-elmina": {
      name: "Fuerte de Santiago (Fort St. Jago)",
      summary: "Pequeño fuerte neerlandés en la colina, con vistas al castillo y al puerto.",
      description:
        "Encaramado en la colina frente al castillo, el fuerte de Santiago (Fort St. Jago, o Coenraadsburg) fue fortificado por los neerlandeses para proteger el castillo de Elmina. Se viene sobre todo por la vista excepcional sobre el castillo, la laguna y el puerto pesquero.",
    },
    "port-de-peche-d-elmina": {
      name: "Puerto pesquero y mercado de pescado de Elmina",
      summary: "Piraguas pintadas, regreso de la pesca y subasta al pie del castillo.",
      description:
        "Al pie del castillo, la laguna de Benya alberga uno de los puertos de pesca artesanal más activos del país. Por la mañana, las piraguas decoradas con banderas y lemas regresan cargadas; el pescado se vende, se ahúma o se procesa en el acto por las mujeres del mercado. Un impresionante espectáculo de vida cotidiana.",
      tips: "Vaya por la mañana. Sea discreto y pida permiso antes de hacer fotos; algunos pescadores piden una pequeña contribución.",
    },
    "plage-de-busua": {
      name: "Playa de Busua",
      summary: "Amplia playa en una bahía, conocido spot de surf para principiantes.",
      description:
        "La playa de Busua se extiende a lo largo de una bahía resguardada, bordeada de cocoteros, pequeños hoteles y restaurantes de pescado y marisco. Sus olas regulares la han convertido en uno de los spots de surf más conocidos de Ghana, con escuelas que alquilan tablas y acompañan a los principiantes.",
      tips: "Infórmese en el lugar sobre las corrientes antes de bañarse o surfear, y no vaya solo a playas aisladas.",
    },
    "fort-metal-cross-dixcove": {
      name: "Fuerte Metal Cross de Dixcove",
      summary: "Fuerte británico que domina un puerto pesquero natural, a pocos kilómetros de Busua.",
      description:
        "Construido por los británicos a finales del siglo XVII, el fuerte de Dixcove, llamado Fort Metal Cross, domina una cala natural donde se resguardan las piraguas de los pescadores. Forma parte de los fuertes y castillos de Ghana inscritos en el Patrimonio Mundial de la UNESCO. Se llega a pie desde Busua por un sendero costero o por carretera.",
      tips: "Para el sendero costero entre Busua y Dixcove, vaya acompañado de un guía local.",
    },
    "cap-des-trois-pointes": {
      name: "Cabo de las Tres Puntas",
      summary: "El extremo sur de Ghana, con faro, bosque y playas salvajes.",
      description:
        "El cabo de las Tres Puntas (Cape Three Points) marca el extremo meridional del país. Allí se encuentran un faro que domina el océano, playas casi desiertas y restos de bosque de una reserva forestal cercana. Suele presentarse como la tierra firme más cercana al punto donde el ecuador cruza el meridiano de Greenwich.",
    },
    "musee-du-palais-de-manhyia": {
      name: "Museo del palacio de Manhyia",
      summary: "El antiguo palacio de los reyes ashanti y la historia de la confederación ashanti.",
      description:
        "Instalado en el antiguo palacio real de Manhyia, el museo muestra mobiliario, objetos de la corte, efigies y recuerdos de los soberanos ashanti, así como la historia de la confederación, sus guerras con los británicos y el exilio del rey Prempeh I. El palacio actual del Asantehene se encuentra muy cerca.",
    },
    "akwasidae-kumasi": {
      name: "Fiesta de Akwasidae",
      summary: "Cada seis semanas, el Asantehene recibe a jefes y público con un fasto espectacular.",
      description:
        "Según el calendario tradicional akan, el Akwasidae se celebra aproximadamente cada seis semanas, en domingo. En Kumasi, el Asantehene honra a los antepasados y después recibe en público a jefes y dignatarios: sombrillas gigantes, ornamentos de oro, tambores parlantes y cuernos de marfil componen uno de los espectáculos más impresionantes de África Occidental.",
      tips: "Pregunte por el calendario en su alojamiento o en el centro cultural; pida siempre permiso antes de fotografiar a los jefes.",
      bestPeriod: "Aproximadamente cada seis semanas, en domingo",
    },
    "bonwire-kente": {
      name: "Bonwire, el pueblo del kente",
      summary: "Los tejedores de kente trabajando en sus telares de bandas estrechas.",
      description:
        "Al noreste de Kumasi, el pueblo de Bonwire es conocido como una de las cunas del kente, la tela tejida en bandas estrechas con motivos cargados de simbolismo, antaño reservada a la realeza ashanti. Se puede observar a los tejedores trabajando y comprar directamente bandas y piezas tejidas.",
      tips: "Las telas de calidad requieren mucho trabajo: tómese tiempo para comparar y regatee con cortesía.",
    },
    "lac-bosumtwi": {
      name: "Lago Bosumtwi",
      summary: "Lago de cráter sagrado rodeado de colinas boscosas, a unos treinta kilómetros de Kumasi.",
      description:
        "Nacido del impacto de un meteorito, el lago Bosumtwi ocupa un cráter casi circular rodeado de colinas verdes. Sagrado para los ashanti, está bordeado de pueblos pesqueros que aún utilizan tablones tradicionales para pescar. Paseos a pie o en bicicleta alrededor del lago y estancias en lodges lo convierten en una escapada tranquila desde Kumasi.",
    },
    "cascades-de-wli": {
      name: "Cascadas de Wli",
      summary: "Espectaculares saltos de agua en plena selva, entre los más altos de África Occidental.",
      description:
        "Al fondo de un valle boscoso de la reserva de Agumatsa, las cascadas de Wli caen desde un alto acantilado a una poza donde uno puede refrescarse. Un paseo por el bosque lleva a la cascada inferior; un sendero más exigente sube hasta la cascada superior. Colonias de murciélagos frugívoros anidan en el acantilado.",
      tips: "El sendero hacia la cascada superior es empinado y resbaladizo: se recomiendan buen calzado y un guía local.",
      bestPeriod: "Durante la estación de lluvias y justo después (mayor caudal)",
    },
    "mont-afadjato": {
      name: "Monte Afadjato",
      summary: "Una ascensión corta y empinada a una de las cumbres más altas del país.",
      description:
        "Presentado a menudo como el punto más alto de Ghana, el monte Afadjato se sube en una ascensión corta pero empinada a través del bosque desde el pueblo de Liati Wote. Desde la cima, la vista abarca las colinas del Volta hasta el vecino Togo. Otros senderos llevan a cascadas cercanas.",
      tips: "Salga temprano con un guía del proyecto de ecoturismo local, agua y buen calzado.",
    },
    "sanctuaire-des-singes-de-tafi-atome": {
      name: "Santuario de monos de Tafi Atome",
      summary: "Un bosque comunitario donde viven monos mona, protegidos por los vecinos.",
      description:
        "En Tafi Atome, los habitantes protegen desde hace mucho tiempo a los monos mona que viven en el bosque del pueblo, considerados sagrados. Un proyecto de ecoturismo comunitario permite observarlos de cerca durante un paseo guiado y conocer la vida del pueblo.",
      tips: "Siga las indicaciones del guía y no alimente a los monos sin su permiso.",
    },
    "safari-a-pied-mole": {
      name: "Safari a pie y en vehículo en Mole",
      summary: "Elefantes, antílopes y babuinos observados a pie con un guarda.",
      description:
        "Los safaris salen del centro de visitantes del parque, situado en un escarpe que domina los puntos de agua donde los elefantes suelen acudir a beber. A pie con un guarda armado o en vehículo, se observan elefantes, cobos, búbalos, facóqueros y babuinos, además de una avifauna muy rica. El amanecer y el final de la tarde son los mejores momentos.",
      tips: "Respete estrictamente las indicaciones de los guardas y mantenga la distancia con los animales. Consulte las recomendaciones de viaje para el norte de Ghana y evite la carretera de noche.",
      bestPeriod: "De diciembre a abril (estación seca)",
    },
    "mosquee-de-larabanga": {
      name: "Mezquita de Larabanga",
      summary: "Mezquita de barro de estilo sudano-saheliano, entre las más antiguas del país.",
      description:
        "A pocos kilómetros de la entrada del parque, el pueblo de Larabanga alberga una pequeña mezquita blanca de adobe erizada de vigas de madera, de estilo sudano-saheliano. La tradición la remonta a varios siglos atrás, lo que la convierte en una de las mezquitas más antiguas de Ghana. Se contempla desde el exterior, acompañado de un guía del pueblo.",
      tips: "Lugar de culto activo: ropa que cubra, visita exterior y no acuda durante las oraciones. Recurra al guía oficial del pueblo.",
    },
    "place-de-l-independance-accra": {
      name: "Plaza de la Independencia (Black Star Square)",
      summary: "Inmensa explanada frente al océano, con el arco de la Independencia y la Estrella Negra.",
      description:
        "Construida a principios de los años sesenta, bajo la presidencia de Kwame Nkrumah, esta vasta plaza de desfiles bordea el océano a pocos minutos del parque conmemorativo. El arco de la Independencia, la Estrella Negra que simboliza el país y la llama del soldado desconocido recuerdan el nacimiento de la nación. Allí se celebran los grandes desfiles oficiales, en particular el de la fiesta de la Independencia, el 6 de marzo.",
      tips: "El lugar está rodeado de edificios oficiales: pida permiso antes de fotografiar a militares y guardias, y evite las horas de más calor.",
    },
    "musee-national-du-ghana": {
      name: "Museo Nacional de Ghana",
      summary: "Arqueología, etnografía y artes de Ghana en un museo renovado del barrio de Adabraka.",
      description:
        "Inaugurado en 1957, el año de la independencia, el museo nacional depende del Ghana Museums and Monuments Board. Cerrado durante varios años por obras, reabrió en 2022 tras una renovación completa. Sus colecciones presentan la arqueología, los objetos de corte, los instrumentos musicales, los textiles y el arte del país: una buena introducción antes de partir hacia Kumasi o la costa.",
      tips: "Infórmese sobre las condiciones de visita antes de desplazarse; la fotografía puede estar regulada en las salas.",
    },
    "centre-national-de-culture-accra": {
      name: "Centro Nacional de Cultura (Arts Centre)",
      summary: "El gran mercado artesanal de Accra: kente, máscaras, tambores, cuentas y tallas.",
      description:
        "Cerca del paseo marítimo, entre Jamestown y la plaza de la Independencia, el Centro Nacional de Cultura, al que todos llaman «Arts Centre», reúne decenas de puestos de artesanos y revendedores. Allí se encuentran telas kente y adinkra, cuentas, tambores, máscaras, tallas y cestas de todo el país. Una parada práctica para las compras de final de viaje.",
      tips: "Los primeros precios son altos: compare varios puestos y regatee con una sonrisa. Muéstrese firme ante los vendedores demasiado insistentes.",
    },
    "plage-de-labadi": {
      name: "Playa de Labadi (La Pleasure Beach)",
      summary: "La playa más animada de Accra: música, baile, paseos a caballo y fiestas de fin de semana.",
      description:
        "Al este del centro, la playa de Labadi, o La Pleasure Beach, es el punto de encuentro de los acrenses los fines de semana y días festivos. En la arena se suceden equipos de sonido, percusionistas, acróbatas, jinetes y vendedores de cocos o pescado a la parrilla, y la animación se prolonga por la noche, sobre todo en diciembre y en Semana Santa. Más una inmersión en el ocio de la capital que una playa para bañarse.",
      tips: "El baño es peligroso (grandes olas y corrientes): quédese en la orilla. Lleve pocos objetos de valor y márchese antes de que anochezca del todo si va solo.",
    },
    "plage-de-kokrobite": {
      name: "Playa de Kokrobite",
      summary: "Pueblo de pescadores y larga playa al oeste de Accra, escapada apreciada los fines de semana.",
      description:
        "A unos treinta kilómetros al oeste del centro de Accra, Kokrobite es un pueblo de pescadores ga cuya larga playa, bordeada de piraguas y cocoteros, atrae a urbanitas y viajeros en busca de calma. Se viene a pasear junto al agua, ver el regreso de los pescadores y disfrutar de un ambiente relajado, a menudo acompañado de música y percusión.",
      tips: "Corrientes peligrosas: infórmese antes de bañarse. No se aísle en la playa, sobre todo por la noche, y prevea un transporte fiable para el regreso.",
    },
    "jardins-botaniques-d-aburi": {
      name: "Jardines botánicos de Aburi",
      summary: "Jardín creado en 1890 en las frescas colinas del Akuapem, a una hora de Accra.",
      description:
        "Encaramados en la cresta del Akuapem, al norte de Accra, los jardines botánicos de Aburi se abrieron en 1890. Avenidas de palmeras reales, árboles gigantes, plantas medicinales y céspedes sombreados los convierten en un lugar de paseo muy apreciado, de agradable frescor. La carretera de subida está bordeada de talleres de tallistas de madera, y la cercana ciudad de Akropong acoge cada otoño la fiesta del Odwira.",
      tips: "Venga entre semana para disfrutar de más calma; lleve una prenda de abrigo ligera en la estación de lluvias, ya que las colinas son más frescas que la costa.",
    },
    "reserve-de-shai-hills": {
      name: "Reserva de Shai Hills",
      summary: "Sabana, colinas rocosas, cuevas y babuinos a una hora al este de Accra.",
      description:
        "Al noreste de Accra, la Shai Hills Resource Reserve protege una sabana salpicada de inselbergs, antaño habitados por el pueblo shai. Senderos y pistas permiten observar babuinos, antílopes y numerosas aves, y subir hasta cuevas y miradores sobre las llanuras de Accra. Una salida de naturaleza fácil de combinar con la carretera de Akosombo.",
      tips: "Salga temprano por la mañana, cuando los animales están activos y el calor es soportable. No alimente a los babuinos y mantenga las bolsas cerradas.",
    },
    "fort-william-anomabo": {
      name: "Fuerte William de Anomabo",
      summary: "Fuerte británico del siglo XVIII junto al océano, Patrimonio Mundial.",
      description:
        "A unos quince kilómetros al este de Cape Coast, el fuerte William fue construido por los británicos a mediados del siglo XVIII en Anomabo, entonces uno de los principales puertos de trata de la Costa de Oro. Forma parte de los fuertes y castillos de Ghana inscritos en el Patrimonio Mundial de la UNESCO. Menos visitado que los castillos de Cape Coast y Elmina, permite una visita más íntima de sus patios, mazmorras y murallas frente al mar.",
      tips: "Una parada fácil en la carretera Accra–Cape Coast; hágase acompañar por el guía del lugar.",
    },
    "marche-de-kejetia": {
      name: "Mercado de Kejetia (mercado central de Kumasi)",
      summary: "Uno de los mayores mercados de África Occidental, un laberinto de miles de puestos.",
      description:
        "En el corazón de Kumasi, el mercado central de Kejetia cuenta con miles de tiendas y puestos y está considerado uno de los mayores mercados de África Occidental. Telas, cuentas, zapatos, utensilios, ñames, especias, caracoles gigantes y plantas medicinales se codean en un dédalo de callejuelas. Parte del recinto se reconstruyó a finales de la década de 2010 en torno a una nueva estación de autobuses.",
      tips: "Venga por la mañana con un guía o un vecino para no perderse; mantenga sus cosas cerca entre la multitud.",
    },
    "batiments-traditionnels-ashanti": {
      name: "Edificios tradicionales ashanti (santuario de Besease)",
      summary: "Santuarios con bajorrelieves tallados, últimos testigos de la arquitectura ashanti, inscritos por la UNESCO.",
      description:
        "En torno a Kumasi subsisten algunos santuarios tradicionales, inscritos en conjunto en el Patrimonio Mundial de la UNESCO con el nombre de «Edificios tradicionales ashanti». Construidos con tierra, madera y paja, están decorados con bajorrelieves de motivos simbólicos. El santuario de Besease, cerca de Ejisu, restaurado y dotado de un pequeño espacio de acogida, es el más accesible para comprender este arte de construir y su papel religioso.",
      tips: "Son lugares de culto todavía respetados: siga las indicaciones del guarda y pida permiso antes de fotografiar el interior.",
    },
    "ntonso-adinkra": {
      name: "Ntonso, el pueblo del adinkra",
      summary: "Los impresores de telas adinkra trabajando, con sellos de calabaza y tinte de corteza.",
      description:
        "Al norte de Kumasi, el pueblo de Ntonso es famoso por la estampación de las telas adinkra. Los artesanos tallan sellos en calabazas y preparan un tinte negro a partir de corteza de árbol, y después estampan a mano los símbolos adinkra, cada uno portador de un proverbio o un valor. Se puede asistir a la fabricación y a veces probar a estampar.",
      tips: "Reserve tiempo para el taller de estampación y compre directamente a los artesanos; combine la visita con Bonwire y Ahwiaa.",
    },
    "ahwiaa-sculpture-sur-bois": {
      name: "Ahwiaa, el pueblo de los tallistas de madera",
      summary: "Taburetes, máscaras y tambores tallados en los talleres de un pueblo cercano a Kumasi.",
      description:
        "En la carretera de Mampong, a pocos kilómetros al norte de Kumasi, el pueblo de Ahwiaa alinea talleres y tiendas de tallistas de madera. Allí se ve dar forma a los taburetes ashanti, las muñecas akuaba, máscaras, estatuillas y yembés, que se venden en el lugar. Una etapa fácil en el circuito de los pueblos artesanos con Bonwire y Ntonso.",
      tips: "Compruebe la calidad de la madera y de los acabados antes de comprar, y regatee con cortesía; evite los objetos antiguos o presentados como tales.",
    },
    "chutes-de-tagbo": {
      name: "Cataratas de Tagbo",
      summary: "Cascada en plena selva al pie del monte Afadjato, accesible a pie desde Liati Wote.",
      description:
        "Desde el pueblo de Liati Wote, un sendero atraviesa plantaciones de cacao y bosque hasta las cataratas de Tagbo, que caen por una pared cubierta de vegetación al pie del monte Afadjato. La caminata, de unos tres cuartos de hora, se combina fácilmente con la ascensión del monte en el mismo día, dentro del proyecto de ecoturismo comunitario del pueblo.",
      tips: "El sendero puede estar embarrado y resbaladizo: calzado cerrado imprescindible. Pase por la oficina de acogida del pueblo para el guía.",
      bestPeriod: "Durante y después de la estación de lluvias, cuando el caudal es fuerte",
    },
    "fort-prinzenstein-keta": {
      name: "Fuerte Prinzenstein",
      summary: "Ruinas de un fuerte danés de finales del siglo XVIII, carcomido por el océano.",
      description:
        "Construido por los daneses en 1784 en Keta, el fuerte Prinzenstein sirvió de factoría y de lugar de detención de cautivos durante la trata atlántica. Forma parte de los fuertes y castillos de Ghana inscritos en el Patrimonio Mundial de la UNESCO. La erosión costera se ha llevado gran parte de él: quedan lienzos de muro, celdas y edificios en ruinas junto al océano, testigos impactantes de la historia y de la fragilidad de esta costa.",
      tips: "Las ruinas son frágiles: permanezca en las zonas accesibles y hágase acompañar por un guía local.",
    },
    "lagune-de-keta": {
      name: "Laguna de Keta",
      summary: "La mayor laguna de Ghana, humedal protegido rico en aves acuáticas.",
      description:
        "Separada del océano por un estrecho cordón de arena, la laguna de Keta es la más extensa del país. Declarada humedal de importancia internacional (sitio Ramsar), acoge numerosas aves acuáticas, residentes o migratorias, y da sustento a pescadores y productores de sal. Se descubre desde la carretera del cordón, de pueblo en pueblo, o en una salida en piragua con pescadores.",
      tips: "Las mañanas y los finales de la tarde son los mejores momentos para las aves; lleve prismáticos y protección solar.",
      bestPeriod: "De octubre a marzo para las aves migratorias",
    },
    "estuaire-de-la-volta-ada": {
      name: "Ada Foah y el estuario del Volta",
      summary: "Donde el Volta se une al océano: bancos de arena, islas, piraguas y playas.",
      description:
        "En Ada Foah, el río Volta termina su curso en el océano formando un estuario salpicado de islas y bancos de arena. Los paseos en piragua permiten descubrir pueblos de pescadores, manglares y playas aisladas entre río y mar. El lugar es muy apreciado por los habitantes de Accra los fines de semana y durante el Asafotufiam, la gran fiesta de Ada a principios de agosto.",
      tips: "Báñese solo donde le indiquen los lugareños: las corrientes de la desembocadura y del océano son peligrosas. Exija chalecos salvavidas en las piraguas.",
    },
    "barrage-d-akosombo": {
      name: "Presa de Akosombo y lago Volta",
      summary: "La presa hidroeléctrica que creó el lago Volta, uno de los mayores lagos artificiales del mundo.",
      description:
        "Terminada en 1965, la presa de Akosombo retiene las aguas del Volta y dio origen al lago Volta, que se extiende cientos de kilómetros hacia el norte y figura entre los mayores lagos artificiales del mundo por su superficie. La presa, símbolo de la industrialización impulsada por Kwame Nkrumah, suministra gran parte de la electricidad del país. Desde los alrededores se disfruta de vistas sobre el lago y sus colinas, y se ofrecen salidas en barco por el embalse.",
      tips: "La presa es un lugar sensible: fotografíe solo donde esté permitido e infórmese en el lugar sobre las condiciones de visita.",
    },
    "pont-d-adomi": {
      name: "Puente de Adomi",
      summary: "Elegante puente de arco metálico sobre el Volta en Atimpoku.",
      description:
        "Aguas abajo de la presa, el puente de Adomi cruza el Volta con un solo arco de acero, entre colinas boscosas. Abierto a finales de los años cincuenta, une Accra con la región del Volta y sigue siendo una de las imágenes más conocidas del país. Las orillas de Atimpoku, al pie del puente, están animadas por las vendedoras de gambas y pescado del río.",
      tips: "Deténgase de día en las orillas para disfrutar de la vista; no estacione en el propio puente.",
    },
    "perles-de-krobo": {
      name: "Cuentas de vidrio krobo (Odumase-Krobo)",
      summary: "El país krobo, cuna de las cuentas de vidrio reciclado, lucidas en las grandes ceremonias.",
      description:
        "En torno a Odumase-Krobo y Somanya, los krobo fabrican desde hace generaciones cuentas de vidrio reciclado, triturado y cocido en moldes de arcilla y decorado a mano. Estas cuentas, que se lucen sobre todo durante el Dipo, rito de paso de las muchachas, y el Ngmayem, se venden en los talleres y en los mercados de la región, entre ellos el de Koforidua. Una visita a un taller permite seguir todas las etapas de fabricación.",
      tips: "Las cuentas antiguas alcanzan precios elevados: pida consejo y desconfíe de las imitaciones. Compre preferentemente a los artesanos.",
    },
    "chutes-de-boti": {
      name: "Cataratas de Boti",
      summary: "Dos cascadas gemelas que caen en un anfiteatro rocoso en plena selva.",
      description:
        "A unos veinte kilómetros de Koforidua, las cataratas de Boti caen en dos brazos paralelos, que la tradición local llama «macho» y «hembra», en un circo de roca en medio del bosque. Una larga escalera baja hasta la poza. El lugar forma parte de una reserva forestal donde los senderos llevan también a Umbrella Rock y a una palmera de tres cabezas.",
      tips: "La escalera es empinada y resbaladiza cuando hay humedad; lleve buen calzado y agua.",
      bestPeriod: "Durante y justo después de la estación de lluvias (más caudal)",
    },
    "umbrella-rock-boti": {
      name: "Umbrella Rock",
      summary: "Una enorme roca en forma de sombrilla sobre un pedestal, con vistas sobre el bosque.",
      description:
        "A un corto paseo de las cataratas de Boti, Umbrella Rock es un gran bloque de arenisca en voladizo, apoyado sobre una base rocosa como una sombrilla gigante. Se puede subir a la cima por una escalera para disfrutar de una amplia vista sobre las colinas boscosas. El sendero pasa por plantaciones y pueblos y se combina fácilmente con la visita a las cataratas.",
      tips: "Hágase acompañar por un guía del lugar; no se recomienda subir por la escalera cuando llueve.",
    },
    "plateau-de-kwahu": {
      name: "Meseta de Kwahu y monte Odweanoma",
      summary: "Acantilados espectaculares, ciudades encaramadas y, en Semana Santa, el festival de parapente.",
      description:
        "La meseta de Kwahu domina la llanura con sus escarpes boscosos, al norte de Nkawkaw. El monte Odweanoma, cerca de Atibie y Mpraeso, sirve de despegue al festival de parapente que organiza cada fin de semana de Pascua la Autoridad de Turismo de Ghana, con vuelos en tándem para el público. El resto del año, el frescor de las alturas, los miradores y pueblos como Abetifi, una de las ciudades más altas del país, invitan al paseo.",
      tips: "En Semana Santa la afluencia es enorme: reserve el alojamiento con mucha antelación y prevea atascos en la carretera de Nkawkaw.",
      bestPeriod: "El fin de semana de Pascua por el ambiente; la estación seca por las vistas",
    },
    "chutes-de-kintampo": {
      name: "Cataratas de Kintampo",
      summary: "Una cascada escalonada en medio del bosque, parada clásica en la ruta del norte.",
      description:
        "Justo al norte de la ciudad de Kintampo, el río Pumpum desciende por una sucesión de escalones rocosos antes de caer en una poza rodeada de bosque. Una escalera lleva al pie de las cataratas, donde uno puede refrescarse, y en el lugar se ha instalado una pasarela entre los árboles. Es una de las paradas más populares entre Kumasi y Tamale.",
      tips: "El lugar está muy concurrido los fines de semana y festivos; venga temprano. Las rocas junto al agua resbalan.",
      bestPeriod: "Durante y justo después de la estación de lluvias",
    },
    "sanctuaire-de-boabeng-fiema": {
      name: "Santuario de monos de Boabeng-Fiema",
      summary: "Bosque sagrado donde colobos blanquinegros y monos mona viven bajo la protección de los aldeanos.",
      description:
        "Entre los pueblos gemelos de Boabeng y Fiema, cerca de Nkoranza, un bosque alberga colobos blanquinegros y monos mona que los habitantes consideran sagrados: la tradición prohíbe cazarlos, e incluso se entierra a los monos muertos en un cementerio reservado para ellos. El santuario, gestionado con la comunidad, se visita con un guía que cuenta estas creencias y ayuda a localizar a los animales.",
      tips: "Respete las normas locales y las indicaciones del guía; no alimente a los monos y guarde silencio para observarlos.",
      bestPeriod: "A primera hora de la mañana o al final de la tarde",
    },
    "mosquee-centrale-de-tamale": {
      name: "Mezquita central de Tamale",
      summary: "La gran mezquita del centro, referente de la vida religiosa de Tamale.",
      description:
        "En el corazón de Tamale, cerca del mercado central, la mezquita central alza sus minaretes sobre las calles comerciales. Es uno de los principales lugares de oración de la ciudad, muy concurrido los viernes y durante las grandes fiestas musulmanas, cuando los fieles desbordan a las calles cercanas. Se contempla desde el exterior, respetando las horas de oración.",
      tips: "Lugar de culto activo: ropa que cubra, ninguna visita durante las oraciones, y pida permiso antes de entrar o fotografiar a los fieles.",
    },
    "village-sur-pilotis-de-nzulezo": {
      name: "Pueblo sobre pilotes de Nzulezo",
      summary: "Un pueblo construido íntegramente sobre pilotes en medio del lago Amansuri, al que se llega en piragua.",
      description:
        "Al final de una travesía en piragua por pantanos de rafia y canales, Nzulezo aparece en medio del lago Amansuri: casas, escuela e iglesia están todas construidas sobre pilotes y unidas por una larga pasarela de madera. Según la tradición, los antepasados de sus habitantes llegaron del oeste guiados por un caracol. El pueblo figura en la lista indicativa de Ghana para el Patrimonio Mundial de la UNESCO.",
      tips: "Reserve la piragua y el guía en la oficina de acogida de Beyin, cuente con media jornada y lleve agua y protección solar. Pida permiso antes de fotografiar a los habitantes.",
    },
    "fort-apollonia-beyin": {
      name: "Fuerte Apollonia",
      summary: "Fuerte británico de finales del siglo XVIII frente al océano, Patrimonio Mundial.",
      description:
        "Construido por los británicos en Beyin entre 1768 y 1770, el fuerte Apollonia es el más occidental de los fuertes de Ghana inscritos en el Patrimonio Mundial de la UNESCO. Restaurado, domina la playa y los cocoteros y recibe a los visitantes que vienen a descubrir la historia de la costa nzema antes de partir hacia Nzulezo.",
      tips: "Visita guiada en el lugar; combínela con la excursión a Nzulezo, que sale del mismo pueblo.",
    },
    "aire-de-conservation-d-ankasa": {
      name: "Área de conservación de Ankasa",
      summary: "Selva tropical húmeda siempreverde entre las más ricas de Ghana, para senderistas y ornitólogos.",
      description:
        "En el extremo suroeste del país, el área de conservación de Ankasa, que reúne la reserva de Ankasa y el parque nacional de Nini-Suhien, protege una selva tropical húmeda siempreverde de una biodiversidad excepcional para Ghana. Los senderos llevan a arroyos y pozas naturales bajo los grandes árboles; se observan sobre todo aves, mariposas y plantas, ya que los mamíferos son muy discretos.",
      tips: "Acceso por una pista a veces difícil en la estación de lluvias: vehículo adecuado y guía imprescindibles. Lleve repelente y ropa larga.",
      bestPeriod: "Estación seca, de diciembre a marzo",
    },
  },
  circuits: {
    "ghana-essentiel-8-jours": {
      title: "Lo esencial de Ghana en 8 días",
      summary:
        "Accra y su historia, los castillos de Cape Coast y Elmina, la pasarela de Kakum, las playas de Busua y después Kumasi, corazón del reino ashanti, y el lago Bosumtwi.",
    },
  },
  stepNotes: {
    "ghana-essentiel-8-jours:0": "Llegada a Accra, primeras visitas en el centro.",
    "ghana-essentiel-8-jours:3": "Mañana en el mercado y después ruta hacia Cape Coast (unas 3 h).",
    "ghana-essentiel-8-jours:5": "Salida temprano hacia Kakum, regreso por Assin Manso.",
    "ghana-essentiel-8-jours:7": "Mañana en Elmina y después ruta hacia Busua.",
    "ghana-essentiel-8-jours:10": "Un día de descanso junto al mar.",
    "ghana-essentiel-8-jours:12": "Largo trayecto hasta Kumasi (cuente con todo el día, sin circular de noche).",
    "ghana-essentiel-8-jours:15": "Mañana en el lago y regreso a Accra por carretera o en avión.",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Primeiro país da África subsariana a alcançar a independência, em 1957, o Gana recebe os visitantes com um caloroso «Akwaaba» (bem-vindo): fortes e castelos da costa, testemunhas do tráfico atlântico de escravos, praias ladeadas de coqueiros, a floresta tropical de Kakum, a cultura axanti bem viva em Kumasi, as cascatas da região do Volta e, mais a norte, as savanas do parque de Mole.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto, obtido junto das representações diplomáticas do Gana ou através dos procedimentos em linha em vigor. Os cidadãos da CEDEAO estão isentos, e as regras estão a mudar para outros países africanos. Confirme sempre as condições atualizadas junto das fontes oficiais antes de partir: passaporte válido vários meses após o regresso, bilhete de regresso, morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "O certificado de vacinação contra a febre-amarela é exigido à entrada. O paludismo está presente em todo o país: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos (repelente, mosquiteiro). Beba água engarrafada e evite tomar banho em água doce parada sem conselho local.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o cedi ganês (GHS), cuja taxa de câmbio varia bastante: informe-se no momento da partida. O pagamento por telemóvel (mobile money, «MoMo») está em todo o lado, mesmo nos pequenos comerciantes. Os cartões bancários são aceites nos hotéis e grandes lojas de Acra e Kumasi; há caixas automáticas nas cidades, mas leve numerário para as zonas rurais.",
      },
      {
        title: "Quando ir",
        body: "O sul tem duas estações das chuvas (a principal, aproximadamente de abril a junho, e outra mais curta por volta de setembro–outubro); o norte, uma só (aproximadamente de maio a outubro). O período mais agradável vai de novembro a março, a estação seca, com o harmatão (vento seco e poeirento) de dezembro a fevereiro. O parque de Mole visita-se de preferência na estação seca, quando a fauna se concentra junto aos pontos de água.",
      },
      {
        title: "Línguas e costumes",
        body: "O inglês é a língua oficial; no dia a dia falam-se, entre outras, o twi (akan), o ewe, o ga, o fante e o dagbani. Os cumprimentos são muito importantes: dedique tempo a cumprimentar antes de pedir o que quer que seja e use a mão direita para dar, receber ou comer. Vista-se com recato fora da praia. Peça autorização antes de fotografar uma pessoa, uma cerimónia ou um chefe tradicional; é proibido fotografar instalações militares e as imediações do aeroporto.",
      },
      {
        title: "Deslocações",
        body: "Os tro-tros (minibus coletivos) e os táxis partilhados são os transportes mais comuns; várias companhias de autocarros ligam as grandes cidades e há voos domésticos a partir de Acra, nomeadamente para Kumasi e Tamale. Em Acra, as aplicações de transporte com motorista estão muito difundidas. Fora das grandes cidades, prefira um carro com motorista reservado através de um prestador de confiança e evite circular à noite.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 230 V, tomadas de tipo G (modelo britânico de três pinos retangulares): leve um adaptador. Um cartão SIM local, registado com o seu passaporte, dá acesso à internet móvel e ao mobile money.",
      },
      {
        title: "Segurança",
        body: "O Gana é um dos destinos mais visitados da África Ocidental e a maioria dos locais turísticos do sul visita-se em boas condições, com uma vigilância normal. As autoridades francesas desaconselham formalmente a faixa fronteiriça norte com o Burquina Faso (incluindo Tumu, Navrongo e Bawku) e desaconselham, salvo motivo imperioso, outras zonas fronteiriças do norte (parque de Gbele, fronteira ocidental com o Burquina Faso, noroeste da fronteira com a Costa do Marfim, setores do nordeste da fronteira com o Togo); o Reino Unido desaconselha todas as viagens não essenciais ao município de Bawku. Podem vigorar recolheres obrigatórios locais no norte. No resto do país, a criminalidade (esticões, assaltos a residências, por vezes com violência) afeta sobretudo Acra, Kumasi, Takoradi e as praias: evite andar sozinho à noite e ir sozinho a praias isoladas. Tomar banho no mar é perigoso na costa (correntes fortes, praias sem vigilância) e deve evitar-se conduzir à noite. Consulte antes e durante a viagem os conselhos aos viajantes da France Diplomatie e do Foreign Office britânico (FCDO), atualizados com regularidade.",
      },
    ],
  },
  destinations: {
    accra: {
      name: "Acra",
      region: "Grande Acra",
      summary: "Capital vibrante no golfo da Guiné: memória da independência, bairros antigos, mercados e vida noturna.",
      description:
        "Ponto de chegada da maioria dos viajantes, Acra mistura modernos bairros de negócios, velhos bairros de pescadores e mercados fervilhantes. Aí se descobrem o parque memorial Kwame Nkrumah, as ruelas de Jamestown e o seu farol, a agitação do mercado de Makola e a animação de Osu, com os seus restaurantes e comida de rua. A cena artística e musical (highlife, afrobeats) é particularmente viva.",
    },
    "cape-coast": {
      region: "Central",
      summary: "Antiga capital da Costa do Ouro, o seu castelo classificado pela UNESCO e a vizinha floresta de Kakum.",
      description:
        "Cidade universitária e antiga capital colonial, Cape Coast é dominada pelo seu castelo, um dos principais lugares de memória do tráfico atlântico, inscrito com os outros fortes e castelos da costa no Património Mundial da UNESCO. A norte, o parque nacional de Kakum e o seu passadiço suspenso nas copas oferecem um contraste impressionante. Uma base ideal para explorar a costa central, a cerca de três horas de estrada de Acra.",
    },
    elmina: {
      region: "Central",
      summary: "O mais antigo castelo europeu da África subsariana e um porto de pesca cheio de cor.",
      description:
        "A cerca de quinze quilómetros a oeste de Cape Coast, Elmina foi um dos primeiros pontos de contacto entre europeus e africanos na costa: os portugueses construíram aqui, em 1482, o castelo de São Jorge da Mina, mais tarde tomado pelos neerlandeses. Hoje, o castelo e o forte de São Tiago dominam um porto de pesca muito animado, repleto de centenas de pirogas pintadas.",
    },
    busua: {
      name: "Busua e o cabo das Três Pontas",
      region: "Ocidental",
      summary: "Uma baía de areia, surf, fortes esquecidos e o cabo mais a sul do país.",
      description:
        "Na costa oeste, Busua é uma pequena estância balnear apreciada pela sua praia em arco, pelas escolas de surf e pelo ambiente descontraído. Nos arredores há enseadas ladeadas de coqueiros, a aldeia piscatória de Dixcove e o seu forte britânico, e o cabo das Três Pontas, extremo sul do Gana. Uma etapa de descanso depois das visitas à costa central.",
    },
    kumasi: {
      region: "Axanti",
      summary: "Capital do reino axanti: palácio real, kente, festivais e mercados gigantescos.",
      description:
        "Segunda cidade do país, Kumasi é o coração do reino axanti, cujo rei, o Asantehene, mantém um papel tradicional de primeiro plano. Visita-se o museu do palácio de Manhyia, perde-se no imenso mercado de Kejetia e parte-se à descoberta das aldeias de tecelões de kente e do lago Bosumtwi. Assistir a uma festa de Akwasidae é um momento alto. A cerca de quatro a cinco horas de estrada de Acra, ou uma hora de avião.",
    },
    "hohoe-volta": {
      name: "Hohoe e as montanhas do Volta",
      region: "Volta",
      summary: "Colinas verdejantes, as cascatas mais altas do país e santuários de macacos.",
      description:
        "No leste do país, perto da fronteira com o Togo, a região do Volta estende colinas cobertas de floresta, aldeias ewe e locais geridos pelas comunidades: as cascatas de Wli, o monte Afadjato e o santuário de macacos de Tafi Atome. Hohoe é a base prática para explorar a região. Uma região ideal para caminhadas, em complemento da costa.",
    },
    mole: {
      name: "Parque nacional de Mole",
      region: "Savannah",
      summary: "O maior parque do Gana: safaris a pé entre elefantes na savana do norte.",
      description:
        "A maior área protegida do país, o parque nacional de Mole abrange savanas arborizadas onde vivem elefantes, antílopes, javalis-africanos, babuínos e muitas aves. É famoso pelos safaris a pé acompanhados por guardas armados, que muitas vezes permitem aproximar-se dos elefantes. Chega-se a partir de Tamale, servida por voos desde Acra. O parque não se situa numa zona desaconselhada pelas autoridades francesas ou britânicas, mas o norte do país exige vigilância reforçada: consulte os conselhos aos viajantes antes de partir.",
    },
    keta: {
      name: "Keta e o estuário do Volta",
      region: "Volta",
      summary: "Lagoas, cordão de areia, forte dinamarquês e foz do Volta, na terra dos ewe anlo.",
      description:
        "No extremo sudeste do país, a costa da região do Volta estende um estreito cordão de areia entre o oceano e a grande lagoa de Keta, rica em aves. A pequena cidade de Keta guarda as ruínas do forte dinamarquês Prinzenstein, e a vizinha Anloga acolhe todos os novembros o grande festival Hogbetsotso. Mais a oeste, Ada Foah marca a foz do Volta, com os seus bancos de areia e passeios de piroga. Uma costa tranquila, longe da agitação de Acra.",
    },
    akosombo: {
      name: "Akosombo e o lago Volta",
      region: "Oriental",
      summary: "A grande barragem, o lago Volta, a ponte de Adomi e a terra krobo das contas de vidro.",
      description:
        "A cerca de duas horas a nordeste de Acra, Akosombo é a porta do lago Volta, a imensa albufeira criada pela barragem concluída em 1965. As colinas arborizadas que enquadram o rio, a ponte de Adomi e os cruzeiros no lago fazem da região uma escapadinha apreciada a partir da capital. Muito perto, a terra krobo, em torno de Odumase e Somanya, perpetua a arte das contas de vidro e celebra todos os outonos o Ngmayem.",
    },
    "koforidua-kwahu": {
      name: "Koforidua, Boti e o planalto de Kwahu",
      region: "Oriental",
      summary: "Cascatas gémeas, rochas surpreendentes e falésias do Kwahu, meca do parapente na Páscoa.",
      description:
        "Capital da região Oriental, Koforidua está rodeada de colinas florestadas onde se escondem as cascatas gémeas de Boti e a surpreendente Umbrella Rock. Mais a noroeste, o planalto de Kwahu ergue as suas falésias acima da planície: as suas cidades empoleiradas, como Abetifi e Mpraeso, animam-se sobretudo na Páscoa, quando a diáspora kwahu regressa à terra e o festival de parapente de Odweanoma atrai milhares de visitantes.",
    },
    kintampo: {
      name: "Kintampo e Bono Oriental",
      region: "Bono Oriental",
      summary: "Cascatas em degraus e uma floresta sagrada de macacos, a meio caminho entre Kumasi e Tamale.",
      description:
        "Na grande estrada que liga Kumasi a Tamale, a região de Bono Oriental marca a transição entre a floresta e a savana. As cascatas de Kintampo, em degraus sobre o rio Pumpum, oferecem uma paragem refrescante, e o santuário de Boabeng-Fiema, perto de Nkoranza, protege macacos considerados sagrados pelos aldeões. Techiman, grande mercado agrícola, é a principal cidade da zona.",
    },
    tamale: {
      name: "Tamale",
      region: "Norte",
      summary: "A grande cidade do norte, porta do parque de Mole e coração do reino dagomba.",
      description:
        "Capital da região Norte, Tamale é a principal cidade do norte do Gana e a porta de entrada para o parque nacional de Mole, servida por voos a partir de Acra. Cidade maioritariamente muçulmana, de largas avenidas percorridas por motas, é o centro cultural dos dagomba: veem-se as túnicas tecidas em tiras («smocks» ou «fugu») e é possível assistir ao Damba ou à festa do fogo (Bugum). As zonas próximas da fronteira norte devem ser evitadas, mas Tamale não fica numa zona desaconselhada: consulte ainda assim os conselhos aos viajantes.",
    },
    "beyin-nzulezo": {
      name: "Beyin, Nzulezo e Ankasa",
      region: "Ocidental",
      summary: "Uma aldeia sobre estacas, um forte britânico à beira do oceano e floresta tropical primária no extremo oeste.",
      description:
        "No extremo ocidental da costa, perto da Costa do Marfim, a terra nzema oferece uma etapa fora dos circuitos habituais. A partir de Beyin, dominada pelo forte Apollonia, uma piroga sobe pelos pântanos de ráfia até Nzulezo, aldeia inteiramente construída sobre estacas no meio do lago Amansuri. Mais a norte, a área de conservação de Ankasa protege uma das florestas tropicais húmidas mais ricas do país. As estradas são longas: conte com pelo menos dois dias a partir de Busua ou Takoradi.",
    },
  },
  places: {
    "parc-memorial-kwame-nkrumah": {
      name: "Parque memorial Kwame Nkrumah",
      summary: "Mausoléu e museu do pai da independência, onde esta foi proclamada em 1957.",
      description:
        "Construído no antigo campo de polo onde Kwame Nkrumah proclamou a independência do Gana a 6 de março de 1957, o parque alberga o mausoléu do primeiro presidente e da sua mulher, bem como um museu que retrata a sua vida e o movimento pan-africano. Um local essencial para compreender a história do país e o seu lugar nas independências africanas.",
    },
    "jamestown-accra": {
      name: "Jamestown e o seu farol",
      summary: "O velho bairro de pescadores ga, os seus fortes coloniais e o farol às riscas.",
      description:
        "Berço histórico de Acra, Jamestown cresceu em torno de fortes europeus, como o forte James britânico e o forte Ussher, de origem neerlandesa. Passeia-se entre pirogas coloridas, pugilistas a treinar e casas antigas, antes de subir ao farol para apreciar a costa. Todos os anos, o festival de arte urbana Chale Wote invade as ruelas com murais, performances e música.",
      tips: "Visite de dia, de preferência com um guia do bairro, e peça autorização antes de fotografar os moradores.",
    },
    "marche-de-makola": {
      name: "Mercado de Makola",
      summary: "O grande mercado do centro de Acra: tecidos wax, missangas, especiarias e produtos frescos.",
      description:
        "Em pleno centro, Makola é o mercado mais famoso de Acra, gerido em grande parte por comerciantes mulheres. Os seus corredores transbordam de tecidos wax, missangas, utensílios, especiarias e produtos frescos. Uma imersão ruidosa e colorida no comércio ganês.",
      tips: "Vá de manhã, mantenha os seus pertences por perto e cuidado com os carteiristas no meio da multidão.",
    },
    "osu-accra": {
      name: "Osu e a comida de rua",
      summary: "Um bairro animado para provar jollof, waakye, kelewele e peixe grelhado.",
      description:
        "Em torno da Oxford Street, o bairro de Osu concentra restaurantes, bares e vendedores de rua. É o local ideal para descobrir a cozinha ganesa: arroz jollof, waakye (arroz com feijão), kelewele (banana-pão condimentada e frita), fufu ou banku com sopas, peixe grelhado e tilápia. À noite, a música toma conta do bairro.",
      tips: "Os «chop bars» servem pratos tradicionais a preços baixos; escolha bancas movimentadas, onde a comida se renova depressa.",
    },
    "chateau-de-cape-coast": {
      name: "Castelo de Cape Coast",
      summary: "Fortaleza branca virada para o oceano, as suas masmorras e a «Porta do Não Retorno».",
      description:
        "Fundado no século XVII e depois ampliado pelos britânicos, o castelo de Cape Coast foi um dos grandes centros do tráfico atlântico. A visita guiada conduz às masmorras onde os cativos eram amontoados antes de serem embarcados pela «Porta do Não Retorno». Um museu retrata a história da região e do tráfico. Uma visita comovente, que se tornou local de peregrinação para os descendentes da diáspora africana.",
    },
    "canopee-de-kakum": {
      name: "Parque nacional de Kakum e o passadiço nas copas",
      summary: "Passadiços suspensos no cimo das árvores de uma floresta tropical preservada.",
      description:
        "A cerca de trinta quilómetros a norte de Cape Coast, o parque nacional de Kakum protege uma vasta floresta tropical húmida. O seu célebre passadiço, uma série de pontes suspensas entre as árvores a várias dezenas de metros do solo, permite observar a floresta de cima. Passeios guiados a pé dão a conhecer plantas medicinais, aves e borboletas; os grandes mamíferos, como os elefantes-da-floresta, são muito discretos.",
      tips: "Vá cedo de manhã para evitar as multidões e apreciar as aves. Desaconselhado a quem sofre de vertigens.",
    },
    "assin-manso": {
      name: "Rio dos escravos de Assin Manso",
      summary: "Lugar de memória onde os cativos tomavam o último banho antes de chegarem à costa.",
      description:
        "A norte de Cape Coast, Assin Manso foi uma etapa importante na rota dos cativos rumo aos fortes da costa. No rio, chamado Donkor Nsuo, tomavam o último banho antes da marcha final. O local, transformado em parque memorial, acolhe cerimónias de homenagem, sobretudo para visitantes da diáspora africana.",
    },
    "fetu-afahye": {
      name: "Festival Fetu Afahye",
      summary: "A grande festa anual de Cape Coast: procissão de chefes, tambores e trajes.",
      description:
        "Todos os anos, a população de Cape Coast (Oguaa) celebra o Fetu Afahye, festa tradicional que, segundo a tradição, comemora o fim de uma epidemia e marca um tempo de purificação e renovação. O ponto alto é a colorida procissão dos chefes em palanquim, acompanhados pelas companhias asafo, pelos tambores e pela multidão, pelas ruas da cidade.",
      tips: "As datas exatas são fixadas todos os anos pelas autoridades tradicionais: confirme-as antes de reservar.",
      bestPeriod: "Início de setembro",
    },
    "chateau-d-elmina": {
      name: "Castelo de Elmina",
      summary: "Construído pelos portugueses em 1482, inscrito no Património Mundial da UNESCO.",
      description:
        "Construído a partir de 1482 para o comércio do ouro, o castelo de São Jorge da Mina é considerado o edifício europeu mais antigo da África subsariana. Neerlandês a partir do século XVII, foi um local central do tráfico atlântico. A visita guiada percorre pátios, masmorras, aposentos do governador e a «Porta do Não Retorno».",
    },
    "fort-saint-jacques-elmina": {
      name: "Forte de São Tiago (Fort St. Jago)",
      summary: "Pequeno forte neerlandês na colina, com vista para o castelo e o porto.",
      description:
        "Empoleirado na colina em frente ao castelo, o forte de São Tiago (Fort St. Jago, ou Coenraadsburg) foi fortificado pelos neerlandeses para proteger o castelo de Elmina. Vem-se sobretudo pelo panorama excecional sobre o castelo, a lagoa e o porto de pesca.",
    },
    "port-de-peche-d-elmina": {
      name: "Porto de pesca e mercado do peixe de Elmina",
      summary: "Pirogas pintadas, regresso da pesca e lota ao pé do castelo.",
      description:
        "Ao pé do castelo, a lagoa de Benya acolhe um dos portos de pesca artesanal mais ativos do país. De manhã, as pirogas decoradas com bandeiras e divisas regressam carregadas; o peixe é logo vendido, fumado ou transformado pelas mulheres do mercado. Um espetáculo impressionante da vida quotidiana.",
      tips: "Vá de manhã. Seja discreto e peça autorização antes de fotografar; alguns pescadores pedem uma pequena contribuição.",
    },
    "plage-de-busua": {
      name: "Praia de Busua",
      summary: "Grande praia numa baía, spot de surf conhecido para principiantes.",
      description:
        "A praia de Busua estende-se ao longo de uma baía abrigada, ladeada de coqueiros, pequenos hotéis e restaurantes de peixe e marisco. As ondas regulares fizeram dela um dos spots de surf mais conhecidos do Gana, com escolas que alugam pranchas e acompanham os principiantes.",
      tips: "Informe-se no local sobre as correntes antes de nadar ou surfar, e não vá sozinho a praias isoladas.",
    },
    "fort-metal-cross-dixcove": {
      name: "Forte Metal Cross de Dixcove",
      summary: "Forte britânico sobre um porto de pesca natural, a poucos quilómetros de Busua.",
      description:
        "Construído pelos britânicos no final do século XVII, o forte de Dixcove, conhecido como Fort Metal Cross, domina uma enseada natural onde se abrigam as pirogas dos pescadores. Faz parte dos fortes e castelos do Gana inscritos no Património Mundial da UNESCO. Chega-se a pé a partir de Busua por um trilho costeiro ou por estrada.",
      tips: "Para o trilho costeiro entre Busua e Dixcove, faça-se acompanhar por um guia local.",
    },
    "cap-des-trois-pointes": {
      name: "Cabo das Três Pontas",
      summary: "O extremo sul do Gana, com farol, floresta e praias selvagens.",
      description:
        "O cabo das Três Pontas (Cape Three Points) marca o extremo meridional do país. Aí se encontram um farol sobranceiro ao oceano, praias quase desertas e restos de floresta de uma reserva florestal vizinha. É muitas vezes apresentado como a terra firme mais próxima do ponto onde o equador cruza o meridiano de Greenwich.",
    },
    "musee-du-palais-de-manhyia": {
      name: "Museu do palácio de Manhyia",
      summary: "O antigo palácio dos reis axantis e a história da confederação axanti.",
      description:
        "Instalado no antigo palácio real de Manhyia, o museu apresenta mobiliário, objetos da corte, efígies e recordações dos soberanos axantis, bem como a história da confederação, das suas guerras com os britânicos e do exílio do rei Prempeh I. O palácio atual do Asantehene fica nas proximidades.",
    },
    "akwasidae-kumasi": {
      name: "Festa de Akwasidae",
      summary: "De seis em seis semanas, o Asantehene recebe chefes e público com um fausto espetacular.",
      description:
        "Segundo o calendário tradicional akan, o Akwasidae repete-se aproximadamente de seis em seis semanas, a um domingo. Em Kumasi, o Asantehene honra os antepassados e recebe depois em público os chefes e dignitários: guarda-sóis gigantes, ornamentos de ouro, tambores falantes e cornos de marfim compõem um dos espetáculos mais impressionantes da África Ocidental.",
      tips: "Informe-se sobre o calendário no seu alojamento ou no centro cultural; peça sempre autorização antes de fotografar os chefes.",
      bestPeriod: "Aproximadamente de seis em seis semanas, a um domingo",
    },
    "bonwire-kente": {
      name: "Bonwire, a aldeia do kente",
      summary: "Os tecelões de kente a trabalhar nos seus teares de faixas estreitas.",
      description:
        "A nordeste de Kumasi, a aldeia de Bonwire é reconhecida como um dos berços do kente, o tecido tecido em faixas estreitas com padrões carregados de simbolismo, outrora reservado à realeza axanti. Pode observar os tecelões a trabalhar e comprar diretamente faixas e peças tecidas.",
      tips: "Os tecidos de qualidade exigem muito trabalho: dedique tempo a comparar e negoceie com cortesia.",
    },
    "lac-bosumtwi": {
      name: "Lago Bosumtwi",
      summary: "Lago de cratera sagrado rodeado de colinas arborizadas, a cerca de trinta quilómetros de Kumasi.",
      description:
        "Nascido do impacto de um meteorito, o lago Bosumtwi ocupa uma cratera quase circular rodeada de colinas verdejantes. Sagrado para os axantis, é ladeado por aldeias piscatórias que ainda usam pranchas tradicionais para pescar. Passeios a pé ou de bicicleta à volta do lago e estadias em lodges tornam-no uma escapadela tranquila a partir de Kumasi.",
    },
    "cascades-de-wli": {
      name: "Cascatas de Wli",
      summary: "Quedas de água espetaculares em plena floresta, entre as mais altas da África Ocidental.",
      description:
        "No fundo de um vale arborizado da reserva de Agumatsa, as cascatas de Wli caem de uma alta falésia para uma lagoa onde é possível refrescar-se. Uma caminhada pela floresta leva à queda inferior; um trilho mais exigente sobe até à queda superior. Colónias de morcegos frugívoros abrigam-se na falésia.",
      tips: "O trilho para a queda superior é íngreme e escorregadio: recomendam-se bom calçado e um guia local.",
      bestPeriod: "Durante e logo após a estação das chuvas (maior caudal)",
    },
    "mont-afadjato": {
      name: "Monte Afadjato",
      summary: "Uma subida curta e íngreme a um dos cumes mais altos do país.",
      description:
        "Muitas vezes apresentado como o ponto mais alto do Gana, o monte Afadjato sobe-se numa ascensão curta mas íngreme através da floresta, a partir da aldeia de Liati Wote. Do cume, a vista abrange as colinas do Volta até ao vizinho Togo. Outros trilhos conduzem a cascatas próximas.",
      tips: "Parta cedo com um guia do projeto de ecoturismo local, água e bom calçado.",
    },
    "sanctuaire-des-singes-de-tafi-atome": {
      name: "Santuário de macacos de Tafi Atome",
      summary: "Uma floresta comunitária onde vivem macacos-mona, protegidos pelos aldeões.",
      description:
        "Em Tafi Atome, os habitantes protegem há muito os macacos-mona que vivem na floresta da aldeia, considerados sagrados. Um projeto de ecoturismo comunitário permite observá-los de perto durante um passeio guiado e conhecer a vida da aldeia.",
      tips: "Siga as instruções do guia e não alimente os macacos sem o seu acordo.",
    },
    "safari-a-pied-mole": {
      name: "Safari a pé e de viatura em Mole",
      summary: "Elefantes, antílopes e babuínos observados a pé com um guarda.",
      description:
        "Os safaris partem do centro de visitantes do parque, situado numa escarpa sobranceira aos pontos de água onde os elefantes vêm muitas vezes beber. A pé com um guarda armado ou de viatura, observam-se elefantes, cobos, búbalos, javalis-africanos e babuínos, bem como uma avifauna muito rica. O amanhecer e o fim da tarde são os melhores momentos.",
      tips: "Respeite escrupulosamente as instruções dos guardas e mantenha distância dos animais. Consulte os conselhos aos viajantes para o norte do Gana e evite a estrada à noite.",
      bestPeriod: "De dezembro a abril (estação seca)",
    },
    "mosquee-de-larabanga": {
      name: "Mesquita de Larabanga",
      summary: "Mesquita de terra de estilo sudano-saheliano, entre as mais antigas do país.",
      description:
        "A poucos quilómetros da entrada do parque, a aldeia de Larabanga alberga uma pequena mesquita branca de adobe eriçada de vigas de madeira, de estilo sudano-saheliano. A tradição fá-la remontar a vários séculos, o que a torna uma das mesquitas mais antigas do Gana. Visita-se pelo exterior, acompanhado por um guia da aldeia.",
      tips: "Local de culto ativo: roupa que cubra o corpo, visita exterior e não vá durante as orações. Recorra ao guia oficial da aldeia.",
    },
    "place-de-l-independance-accra": {
      name: "Praça da Independência (Black Star Square)",
      summary: "Imensa esplanada virada para o oceano, com o arco da Independência e a Estrela Negra.",
      description:
        "Construída no início dos anos 1960, sob a presidência de Kwame Nkrumah, esta vasta praça de desfiles ladeia o oceano a poucos minutos do parque memorial. O arco da Independência, a Estrela Negra que simboliza o país e a chama do soldado desconhecido evocam o nascimento da nação. É aqui que se realizam os grandes desfiles oficiais, nomeadamente o do Dia da Independência, a 6 de março.",
      tips: "O local está rodeado de edifícios oficiais: peça autorização antes de fotografar militares e guardas, e evite as horas de maior calor.",
    },
    "musee-national-du-ghana": {
      name: "Museu Nacional do Gana",
      summary: "Arqueologia, etnografia e artes do Gana, num museu renovado do bairro de Adabraka.",
      description:
        "Inaugurado em 1957, o ano da independência, o museu nacional é gerido pelo Ghana Museums and Monuments Board. Encerrado durante vários anos para obras, reabriu em 2022 após uma renovação completa. As suas coleções apresentam a arqueologia, os objetos de corte, os instrumentos musicais, os têxteis e a arte do país: uma boa introdução antes de partir para Kumasi ou para a costa.",
      tips: "Informe-se sobre as condições de visita antes de se deslocar; a fotografia pode ser restringida nas salas.",
    },
    "centre-national-de-culture-accra": {
      name: "Centro Nacional de Cultura (Arts Centre)",
      summary: "O grande mercado de artesanato de Acra: kente, máscaras, tambores, contas e esculturas.",
      description:
        "Perto da marginal, entre Jamestown e a praça da Independência, o Centro Nacional de Cultura, a que todos chamam «Arts Centre», reúne dezenas de bancas de artesãos e revendedores. Encontram-se aqui panos kente e adinkra, contas, tambores, máscaras, esculturas e cestos de todo o país. Uma paragem prática para as compras de fim de viagem.",
      tips: "Os primeiros preços anunciados são altos: compare várias bancas e negoceie com um sorriso. Seja firme com os vendedores demasiado insistentes.",
    },
    "plage-de-labadi": {
      name: "Praia de Labadi (La Pleasure Beach)",
      summary: "A praia mais animada de Acra: música, dança, passeios a cavalo e festas de fim de semana.",
      description:
        "A leste do centro, a praia de Labadi, ou La Pleasure Beach, é o ponto de encontro dos habitantes de Acra aos fins de semana e feriados. Na areia sucedem-se aparelhagens de som, percussionistas, acrobatas, cavaleiros e vendedores de cocos ou peixe grelhado, e a animação prolonga-se pela noite, sobretudo em dezembro e na Páscoa. Mais uma imersão nos lazeres da capital do que uma praia para banhos.",
      tips: "Os banhos são perigosos (ondas fortes e correntes): fique à beira-mar. Leve poucos objetos de valor e saia antes de anoitecer por completo se estiver sozinho.",
    },
    "plage-de-kokrobite": {
      name: "Praia de Kokrobite",
      summary: "Aldeia de pescadores e longa praia a oeste de Acra, escapadinha apreciada ao fim de semana.",
      description:
        "A cerca de trinta quilómetros a oeste do centro de Acra, Kokrobite é uma aldeia de pescadores ga cuja longa praia, ladeada de pirogas e coqueiros, atrai citadinos e viajantes em busca de sossego. Vem-se aqui passear à beira-mar, ver o regresso dos pescadores e aproveitar um ambiente descontraído, muitas vezes ao ritmo da música e da percussão.",
      tips: "Correntes perigosas: informe-se antes de tomar banho. Não se isole na praia, sobretudo à noite, e garanta um transporte fiável para o regresso.",
    },
    "jardins-botaniques-d-aburi": {
      name: "Jardins botânicos de Aburi",
      summary: "Jardim criado em 1890 nas frescas colinas do Akuapem, a uma hora de Acra.",
      description:
        "Empoleirados na cumeada do Akuapem, a norte de Acra, os jardins botânicos de Aburi foram abertos em 1890. Alamedas de palmeiras-reais, árvores gigantes, plantas medicinais e relvados à sombra fazem deles um local de passeio apreciado, de uma frescura bem-vinda. A estrada que sobe até lá está ladeada de oficinas de escultores em madeira, e a vizinha cidade de Akropong acolhe todos os outonos a festa do Odwira.",
      tips: "Venha durante a semana para ter mais sossego; leve um agasalho leve na época das chuvas, pois as colinas são mais frescas do que a costa.",
    },
    "reserve-de-shai-hills": {
      name: "Reserva de Shai Hills",
      summary: "Savana, colinas rochosas, grutas e babuínos a uma hora a leste de Acra.",
      description:
        "A nordeste de Acra, a Shai Hills Resource Reserve protege uma savana salpicada de inselbergs, outrora habitados pelo povo shai. Trilhos e pistas permitem observar babuínos, antílopes e muitas aves, e subir até grutas e miradouros sobre as planícies de Acra. Uma saída na natureza fácil de combinar com a estrada para Akosombo.",
      tips: "Parta cedo de manhã, quando os animais estão ativos e o calor é suportável. Não alimente os babuínos e mantenha os sacos fechados.",
    },
    "fort-william-anomabo": {
      name: "Forte William de Anomabo",
      summary: "Forte britânico do século XVIII à beira do oceano, Património Mundial.",
      description:
        "A cerca de quinze quilómetros a leste de Cape Coast, o forte William foi construído pelos britânicos em meados do século XVIII em Anomabo, então um dos principais portos de tráfico da Costa do Ouro. Faz parte dos fortes e castelos do Gana inscritos no Património Mundial da UNESCO. Menos visitado do que os castelos de Cape Coast e Elmina, permite uma visita mais intimista dos seus pátios, masmorras e muralhas viradas para o mar.",
      tips: "Uma paragem fácil na estrada Acra–Cape Coast; faça a visita com o guia do local.",
    },
    "marche-de-kejetia": {
      name: "Mercado de Kejetia (mercado central de Kumasi)",
      summary: "Um dos maiores mercados da África Ocidental, um labirinto de milhares de bancas.",
      description:
        "No coração de Kumasi, o mercado central de Kejetia conta com milhares de lojas e bancas e é tido como um dos maiores mercados da África Ocidental. Tecidos, contas, sapatos, utensílios, inhames, especiarias, caracóis gigantes e plantas medicinais convivem num dédalo de corredores. Parte do recinto foi reconstruída no final da década de 2010 em torno de um novo terminal rodoviário.",
      tips: "Venha de manhã com um guia ou um habitante para não se perder; mantenha os seus pertences por perto no meio da multidão.",
    },
    "batiments-traditionnels-ashanti": {
      name: "Edifícios tradicionais axantis (santuário de Besease)",
      summary: "Santuários com baixos-relevos esculpidos, últimos testemunhos da arquitetura axanti, classificados pela UNESCO.",
      description:
        "Em redor de Kumasi subsistem alguns santuários tradicionais, inscritos em conjunto no Património Mundial da UNESCO com o nome de «Edifícios tradicionais axantis». Construídos em terra, madeira e colmo, estão ornamentados com baixos-relevos de motivos simbólicos. O santuário de Besease, perto de Ejisu, restaurado e dotado de um pequeno espaço de acolhimento, é o mais acessível para compreender esta arte de construir e o seu papel religioso.",
      tips: "São locais de culto ainda respeitados: siga as indicações do guarda e peça autorização antes de fotografar o interior.",
    },
    "ntonso-adinkra": {
      name: "Ntonso, a aldeia do adinkra",
      summary: "Os estampadores de panos adinkra ao trabalho, com carimbos de cabaça e tinta de casca de árvore.",
      description:
        "A norte de Kumasi, a aldeia de Ntonso é conhecida pela estampagem dos panos adinkra. Os artesãos gravam carimbos em cabaças e preparam uma tinta negra a partir de casca de árvore, imprimindo depois à mão os símbolos adinkra, cada um portador de um provérbio ou de um valor. É possível assistir ao fabrico e por vezes experimentar a estampagem.",
      tips: "Reserve tempo para a oficina de estampagem e compre diretamente aos artesãos; combine a visita com Bonwire e Ahwiaa.",
    },
    "ahwiaa-sculpture-sur-bois": {
      name: "Ahwiaa, a aldeia dos escultores em madeira",
      summary: "Bancos, máscaras e tambores esculpidos nas oficinas de uma aldeia perto de Kumasi.",
      description:
        "Na estrada de Mampong, a poucos quilómetros a norte de Kumasi, a aldeia de Ahwiaa alinha oficinas e lojas de escultores em madeira. Aqui vê-se moldar os bancos axantis, as bonecas akuaba, máscaras, estatuetas e djembés, vendidos no local. Uma etapa fácil no circuito das aldeias de artesãos com Bonwire e Ntonso.",
      tips: "Verifique a qualidade da madeira e dos acabamentos antes de comprar, e negoceie com cortesia; evite objetos antigos ou apresentados como tal.",
    },
    "chutes-de-tagbo": {
      name: "Cascatas de Tagbo",
      summary: "Cascata em plena floresta no sopé do monte Afadjato, acessível a pé a partir de Liati Wote.",
      description:
        "A partir da aldeia de Liati Wote, um trilho atravessa plantações de cacau e floresta até às cascatas de Tagbo, que se precipitam por uma parede coberta de vegetação no sopé do monte Afadjato. A caminhada, de cerca de três quartos de hora, combina-se facilmente com a subida ao monte no mesmo dia, no âmbito do projeto de ecoturismo comunitário da aldeia.",
      tips: "O trilho pode estar enlameado e escorregadio: calçado fechado indispensável. Passe pelo posto de acolhimento da aldeia para obter um guia.",
      bestPeriod: "Durante e após a época das chuvas, quando o caudal é forte",
    },
    "fort-prinzenstein-keta": {
      name: "Forte Prinzenstein",
      summary: "Ruínas de um forte dinamarquês do final do século XVIII, corroído pelo oceano.",
      description:
        "Construído pelos dinamarqueses em 1784 em Keta, o forte Prinzenstein serviu de entreposto e de local de detenção de cativos durante o tráfico atlântico. Faz parte dos fortes e castelos do Gana inscritos no Património Mundial da UNESCO. A erosão costeira levou grande parte dele: restam panos de muralha, celas e edifícios em ruínas à beira do oceano, testemunhos impressionantes da história e da fragilidade desta costa.",
      tips: "As ruínas são frágeis: mantenha-se nas zonas acessíveis e faça-se acompanhar por um guia local.",
    },
    "lagune-de-keta": {
      name: "Lagoa de Keta",
      summary: "A maior lagoa do Gana, zona húmida protegida rica em aves aquáticas.",
      description:
        "Separada do oceano por um estreito cordão de areia, a lagoa de Keta é a maior do país. Classificada como zona húmida de importância internacional (sítio Ramsar), acolhe muitas aves aquáticas, residentes ou migratórias, e faz viver pescadores e produtores de sal. Descobre-se a partir da estrada do cordão, de aldeia em aldeia, ou num passeio de piroga com pescadores.",
      tips: "As manhãs e os fins de tarde são os melhores momentos para as aves; leve binóculos e proteção solar.",
      bestPeriod: "De outubro a março para as aves migratórias",
    },
    "estuaire-de-la-volta-ada": {
      name: "Ada Foah e o estuário do Volta",
      summary: "Onde o Volta encontra o oceano: bancos de areia, ilhas, pirogas e praias.",
      description:
        "Em Ada Foah, o rio Volta termina o seu curso no oceano formando um estuário salpicado de ilhas e bancos de areia. Os passeios de piroga dão a conhecer aldeias de pescadores, mangais e praias isoladas entre o rio e o mar. O local é muito apreciado pelos habitantes de Acra ao fim de semana e durante o Asafotufiam, a grande festa de Ada no início de agosto.",
      tips: "Só tome banho nos locais indicados pelos habitantes: as correntes da foz e do oceano são perigosas. Exija coletes salva-vidas nas pirogas.",
    },
    "barrage-d-akosombo": {
      name: "Barragem de Akosombo e lago Volta",
      summary: "A barragem hidroelétrica que criou o lago Volta, um dos maiores lagos artificiais do mundo.",
      description:
        "Concluída em 1965, a barragem de Akosombo retém as águas do Volta e deu origem ao lago Volta, que se estende por centenas de quilómetros para norte e figura entre os maiores lagos artificiais do mundo em superfície. A barragem, símbolo da industrialização desejada por Kwame Nkrumah, fornece grande parte da eletricidade do país. Dos arredores desfruta-se de vistas sobre o lago e as suas colinas, e há passeios de barco na albufeira.",
      tips: "A barragem é um local sensível: fotografe apenas onde for permitido e informe-se no local sobre as condições de visita.",
    },
    "pont-d-adomi": {
      name: "Ponte de Adomi",
      summary: "Elegante ponte em arco metálico sobre o Volta em Atimpoku.",
      description:
        "A jusante da barragem, a ponte de Adomi atravessa o Volta com um único arco de aço, no meio de colinas arborizadas. Aberta no final dos anos 1950, liga Acra à região do Volta e continua a ser uma das imagens mais conhecidas do país. As margens de Atimpoku, ao pé da ponte, são animadas pelas vendedoras de camarão e peixe do rio.",
      tips: "Pare de dia nas margens para apreciar a vista; não estacione na própria ponte.",
    },
    "perles-de-krobo": {
      name: "Contas de vidro krobo (Odumase-Krobo)",
      summary: "A terra krobo, berço das contas de vidro reciclado, usadas nas grandes cerimónias.",
      description:
        "Em redor de Odumase-Krobo e Somanya, os krobo fabricam há gerações contas de vidro reciclado, moído e cozido em moldes de barro e decorado à mão. Estas contas, usadas sobretudo durante o Dipo, rito de passagem das raparigas, e o Ngmayem, vendem-se nas oficinas e nos mercados da região, entre eles o de Koforidua. Uma visita a uma oficina permite acompanhar todas as etapas do fabrico.",
      tips: "As contas antigas atingem preços elevados: peça conselho e desconfie das imitações. Compre de preferência diretamente aos artesãos.",
    },
    "chutes-de-boti": {
      name: "Cascatas de Boti",
      summary: "Duas cascatas gémeas que mergulham num anfiteatro rochoso no meio da floresta.",
      description:
        "A cerca de vinte quilómetros de Koforidua, as cascatas de Boti caem em dois braços paralelos, que a tradição local chama «macho» e «fêmea», num circo de rocha no meio da floresta. Uma longa escadaria desce até ao lago. O local faz parte de uma reserva florestal onde trilhos levam também à Umbrella Rock e a uma palmeira de três cabeças.",
      tips: "A escadaria é íngreme e escorregadia com tempo húmido; leve bom calçado e água.",
      bestPeriod: "Durante e logo após a época das chuvas (caudal mais forte)",
    },
    "umbrella-rock-boti": {
      name: "Umbrella Rock",
      summary: "Uma enorme rocha em forma de guarda-sol pousada num pedestal, com vista sobre a floresta.",
      description:
        "A uma curta caminhada das cascatas de Boti, a Umbrella Rock é um grande bloco de arenito em consola, pousado sobre uma base rochosa como um guarda-sol gigante. Pode subir-se ao topo por uma escada para uma vista ampla sobre as colinas arborizadas. O trilho passa por plantações e aldeias e combina-se facilmente com a visita às cascatas.",
      tips: "Faça-se acompanhar por um guia do local; a subida pela escada é desaconselhada com chuva.",
    },
    "plateau-de-kwahu": {
      name: "Planalto de Kwahu e monte Odweanoma",
      summary: "Falésias espetaculares, cidades empoleiradas e, na Páscoa, o festival de parapente.",
      description:
        "O planalto de Kwahu domina a planície com as suas escarpas arborizadas, a norte de Nkawkaw. O monte Odweanoma, perto de Atibie e Mpraeso, serve de descolagem ao festival de parapente organizado todos os fins de semana de Páscoa pela Autoridade de Turismo do Gana, com voos em tandem para o público. No resto do ano, a frescura das alturas, os miradouros e aldeias como Abetifi, uma das cidades mais altas do país, convidam ao passeio.",
      tips: "Na Páscoa a afluência é enorme: reserve o alojamento muito cedo e conte com engarrafamentos na estrada de Nkawkaw.",
      bestPeriod: "O fim de semana da Páscoa pelo ambiente; a época seca pelas vistas",
    },
    "chutes-de-kintampo": {
      name: "Cascatas de Kintampo",
      summary: "Uma cascata em degraus no meio da floresta, paragem clássica na estrada para norte.",
      description:
        "Logo a norte da cidade de Kintampo, o rio Pumpum desce uma sucessão de degraus rochosos antes de mergulhar num lago rodeado de floresta. Uma escadaria leva ao pé das cascatas, onde é possível refrescar-se, e foi instalado no local um passadiço entre as árvores. É uma das paragens mais populares entre Kumasi e Tamale.",
      tips: "O local é muito frequentado aos fins de semana e feriados; venha cedo. As rochas junto à água são escorregadias.",
      bestPeriod: "Durante e logo após a época das chuvas",
    },
    "sanctuaire-de-boabeng-fiema": {
      name: "Santuário de macacos de Boabeng-Fiema",
      summary: "Floresta sagrada onde colobos preto e branco e macacos-mona vivem sob a proteção dos aldeões.",
      description:
        "Entre as aldeias gémeas de Boabeng e Fiema, perto de Nkoranza, uma floresta abriga colobos preto e branco e macacos-mona que os habitantes consideram sagrados: a tradição proíbe caçá-los, e os macacos mortos são até enterrados num cemitério que lhes é reservado. O santuário, gerido com a comunidade, visita-se com um guia que conta estas crenças e ajuda a localizar os animais.",
      tips: "Respeite as regras locais e as indicações do guia; não alimente os macacos e faça silêncio para os observar.",
      bestPeriod: "De manhã cedo ou ao fim da tarde",
    },
    "mosquee-centrale-de-tamale": {
      name: "Mesquita central de Tamale",
      summary: "A grande mesquita do centro, referência da vida religiosa de Tamale.",
      description:
        "No coração de Tamale, perto do mercado central, a mesquita central ergue os seus minaretes acima das ruas comerciais. É um dos principais locais de oração da cidade, muito frequentado à sexta-feira e durante as grandes festas muçulmanas, quando os fiéis transbordam para as ruas vizinhas. Aprecia-se do exterior, respeitando as horas de oração.",
      tips: "Local de culto ativo: roupa que cubra, nenhuma visita durante as orações, e peça autorização antes de entrar ou fotografar os fiéis.",
    },
    "village-sur-pilotis-de-nzulezo": {
      name: "Aldeia sobre estacas de Nzulezo",
      summary: "Uma aldeia inteiramente construída sobre estacas no meio do lago Amansuri, acessível de piroga.",
      description:
        "No fim de uma travessia de piroga por pântanos de ráfia e canais, Nzulezo surge no meio do lago Amansuri: casas, escola e igreja estão todas construídas sobre estacas e ligadas por um longo passadiço de madeira. Segundo a tradição, os antepassados dos habitantes terão vindo do oeste, guiados por um caracol. A aldeia consta da lista indicativa do Gana para o Património Mundial da UNESCO.",
      tips: "Reserve a piroga e o guia no posto de acolhimento de Beyin, conte com meio dia e leve água e proteção solar. Peça autorização antes de fotografar os habitantes.",
    },
    "fort-apollonia-beyin": {
      name: "Forte Apollonia",
      summary: "Forte britânico do final do século XVIII virado para o oceano, Património Mundial.",
      description:
        "Construído pelos britânicos em Beyin entre 1768 e 1770, o forte Apollonia é o mais ocidental dos fortes do Gana inscritos no Património Mundial da UNESCO. Restaurado, domina a praia e os coqueiros e acolhe os visitantes que vêm conhecer a história da costa nzema antes de partirem para Nzulezo.",
      tips: "Visita guiada no local; combine-a com a excursão a Nzulezo, que parte da mesma aldeia.",
    },
    "aire-de-conservation-d-ankasa": {
      name: "Área de conservação de Ankasa",
      summary: "Floresta tropical húmida sempre-verde entre as mais ricas do Gana, para caminhantes e observadores de aves.",
      description:
        "No extremo sudoeste do país, a área de conservação de Ankasa, que reúne a reserva de Ankasa e o parque nacional de Nini-Suhien, protege uma floresta tropical húmida sempre-verde de uma biodiversidade excecional para o Gana. Trilhos levam a ribeiros e piscinas naturais sob as grandes árvores; observam-se sobretudo aves, borboletas e plantas, pois os mamíferos são muito discretos.",
      tips: "Acesso por uma pista por vezes difícil na época das chuvas: veículo adequado e guia indispensáveis. Leve repelente e roupa comprida.",
      bestPeriod: "Época seca, de dezembro a março",
    },
  },
  circuits: {
    "ghana-essentiel-8-jours": {
      title: "O essencial do Gana em 8 dias",
      summary:
        "Acra e a sua história, os castelos de Cape Coast e Elmina, o passadiço de Kakum, as praias de Busua e depois Kumasi, coração do reino axanti, e o lago Bosumtwi.",
    },
  },
  stepNotes: {
    "ghana-essentiel-8-jours:0": "Chegada a Acra, primeiras visitas no centro.",
    "ghana-essentiel-8-jours:3": "Manhã no mercado e depois estrada para Cape Coast (cerca de 3 h).",
    "ghana-essentiel-8-jours:5": "Partida cedo para Kakum, regresso por Assin Manso.",
    "ghana-essentiel-8-jours:7": "Manhã em Elmina e depois estrada para Busua.",
    "ghana-essentiel-8-jours:10": "Um dia de descanso à beira-mar.",
    "ghana-essentiel-8-jours:12": "Longa viagem até Kumasi (conte com o dia inteiro, sem circular à noite).",
    "ghana-essentiel-8-jours:15": "Manhã no lago e regresso a Acra por estrada ou de avião.",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "أول بلد في أفريقيا جنوب الصحراء ينال استقلاله، عام 1957، تستقبل غانا زوّارها بتحية «أكوابا» (أهلًا وسهلًا) الدافئة: حصون وقلاع ساحلية شاهدة على تجارة الرقيق عبر الأطلسي، وشواطئ تحفّها أشجار جوز الهند، وغابة كاكوم المطيرة، وثقافة أشانتي حيّة في كوماسي، وشلالات منطقة الفولتا، وإلى الشمال سافانا حديقة مولي.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين إلى تأشيرة تُستخرج من البعثات الدبلوماسية لغانا أو عبر الإجراءات الإلكترونية المعمول بها. يُعفى منها مواطنو دول الإيكواس، والقواعد تتغيّر بالنسبة إلى دول أفريقية أخرى. تحقّق دائمًا من الشروط المحدّثة لدى المصادر الرسمية قبل السفر: جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان الإقامة.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمّى الصفراء عند الدخول. الملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن علاج وقائي، واحمِ نفسك من البعوض (طارد للحشرات، ناموسية). اشرب المياه المعبأة وتجنّب السباحة في المياه العذبة الراكدة دون استشارة محلية.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي السيدي الغاني (GHS)، ويتغيّر سعر صرفه بشكل ملحوظ: استعلم عنه عند السفر. الدفع عبر الهاتف المحمول («موبايل موني» أو «MoMo») منتشر في كل مكان، حتى لدى صغار التجار. تُقبل البطاقات المصرفية في الفنادق والمتاجر الكبرى في أكرا وكوماسي، وتتوفر أجهزة الصراف الآلي في المدن، لكن احتفظ بنقود للمناطق الريفية.",
      },
      {
        title: "متى تسافر",
        body: "يشهد الجنوب موسمين للأمطار (الموسم الرئيسي تقريبًا من أبريل إلى يونيو، وموسم أقصر نحو سبتمبر–أكتوبر)، أما الشمال فموسم واحد (تقريبًا من مايو إلى أكتوبر). أنسب فترة من نوفمبر إلى مارس، وهي الموسم الجاف، مع رياح الهرمتان (رياح جافة محمّلة بالغبار) من ديسمبر إلى فبراير. يُفضّل زيارة حديقة مولي في الموسم الجاف حين تتجمّع الحيوانات حول نقاط الماء.",
      },
      {
        title: "اللغات والعادات",
        body: "الإنجليزية هي اللغة الرسمية، ويتحدث الناس يوميًا لغات منها التوي (الأكان) والإيوي والغا والفانتي والداغباني. للتحية أهمية كبيرة: خذ وقتك في إلقاء التحية قبل أي طلب، واستخدم يدك اليمنى للإعطاء والأخذ والأكل. ارتدِ ملابس محتشمة بعيدًا عن الشاطئ. استأذن قبل تصوير شخص أو مراسم أو زعيم تقليدي، ويُمنع تصوير المواقع العسكرية ومحيط المطار.",
      },
      {
        title: "التنقّل",
        body: "حافلات «تْرو-تْرو» الصغيرة الجماعية وسيارات الأجرة المشتركة هي أكثر وسائل النقل شيوعًا، وتربط شركات حافلات بين المدن الكبرى، وتنطلق رحلات داخلية من أكرا إلى مدن منها كوماسي وتامالي. في أكرا تنتشر تطبيقات سيارات الأجرة على نطاق واسع. خارج المدن الكبرى، فضّل سيارة مع سائق تحجزها لدى جهة موثوقة، وتجنّب السفر برًّا ليلًا.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار 230 فولت، والمقابس من النوع G (الطراز البريطاني بثلاثة أسنان مستطيلة): احمل محوّلًا. تتيح شريحة اتصال محلية، تُسجَّل بجواز سفرك، الوصول إلى الإنترنت عبر الهاتف وخدمة الدفع بالهاتف المحمول.",
      },
      {
        title: "الأمن",
        body: "غانا من أكثر الوجهات زيارةً في غرب أفريقيا، ويمكن زيارة معظم المواقع السياحية في الجنوب في ظروف جيدة مع يقظة عادية. توصي السلطات الفرنسية بشدة بعدم التوجّه إلى الشريط الحدودي الشمالي مع بوركينا فاسو (بما فيه تومو ونافرونغو وباوكو)، وتنصح بعدم السفر، إلا لضرورة قصوى، إلى مناطق حدودية أخرى في الشمال (حديقة غبيلي، والحدود الغربية مع بوركينا فاسو، والجزء الشمالي الغربي من الحدود مع كوت ديفوار، وقطاعات من شمال شرق الحدود مع توغو)، وتنصح المملكة المتحدة بعدم السفر غير الضروري إلى بلدية باوكو. قد يُفرض حظر تجوّل محلي في الشمال. في بقية البلاد تطال الجرائم (خطف الحقائب، والسطو على المنازل، وأحيانًا مع العنف) أكرا وكوماسي وتاكورادي والشواطئ خصوصًا: تجنّب المشي وحدك ليلًا أو الذهاب وحدك إلى شواطئ معزولة. السباحة خطرة على طول الساحل (تيارات قوية وشواطئ بلا حراسة)، ويجب تجنّب القيادة ليلًا. راجع قبل رحلتك وخلالها نصائح السفر الصادرة عن وزارة الخارجية الفرنسية (France Diplomatie) ووزارة الخارجية البريطانية (FCDO)، إذ تُحدَّث بانتظام.",
      },
    ],
  },
  destinations: {
    accra: {
      name: "أكرا",
      region: "أكرا الكبرى",
      summary: "عاصمة نابضة بالحياة على خليج غينيا: ذاكرة الاستقلال، أحياء عريقة، أسواق وحياة ليلية.",
      description:
        "تمثّل أكرا نقطة وصول معظم المسافرين، وتمزج بين أحياء أعمال حديثة وأحياء صيادين قديمة وأسواق تعجّ بالحركة. يكتشف الزائر فيها حديقة كوامي نكروما التذكارية، وأزقّة جيمس تاون ومنارتها، وصخب سوق ماكولا، وحيوية حي أوسو بمطاعمه وأكشاك طعام الشارع. والمشهد الفني والموسيقي (الهايلايف والأفروبيتس) فيها حيّ بشكل خاص.",
    },
    "cape-coast": {
      name: "كيب كوست",
      region: "الوسطى",
      summary: "العاصمة السابقة لساحل الذهب، وقلعتها المدرجة لدى اليونسكو، وغابة كاكوم القريبة.",
      description:
        "كيب كوست مدينة جامعية وعاصمة استعمارية سابقة، تهيمن عليها قلعتها، أحد أبرز أماكن ذاكرة تجارة الرقيق عبر الأطلسي، والمدرجة مع سائر حصون الساحل وقلاعه في قائمة التراث العالمي لليونسكو. وإلى الشمال تقدّم حديقة كاكوم الوطنية وممرّها المعلّق بين قمم الأشجار تباينًا لافتًا. قاعدة مثالية لاستكشاف الساحل الأوسط، على بعد نحو ثلاث ساعات بالسيارة من أكرا.",
    },
    elmina: {
      name: "إلمينا",
      region: "الوسطى",
      summary: "أقدم قلعة أوروبية في أفريقيا جنوب الصحراء وميناء صيد زاخر بالألوان.",
      description:
        "على بعد نحو خمسة عشر كيلومترًا غرب كيب كوست، كانت إلمينا من أوائل نقاط الالتقاء بين الأوروبيين والأفارقة على الساحل: فقد شيّد البرتغاليون فيها عام 1482 قلعة ساو جورجي دا مينا، التي استولى عليها الهولنديون لاحقًا. واليوم تطلّ القلعة وحصن سانت ياغو على ميناء صيد شديد الحيوية تزدحم فيه مئات الزوارق الملوّنة.",
    },
    busua: {
      name: "بوسوا ورأس النقاط الثلاث",
      region: "الغربية",
      summary: "خليج رملي، وركوب الأمواج، وحصون منسية، وأقصى رأس في جنوب البلاد.",
      description:
        "على الساحل الغربي، بوسوا منتجع شاطئي صغير محبوب لشاطئه المقوّس ومدارس ركوب الأمواج وأجوائه الهادئة. وتضم المنطقة المحيطة خلجانًا صغيرة تحفّها أشجار جوز الهند، وقرية الصيادين ديكسكوف وحصنها البريطاني، ورأس النقاط الثلاث، أقصى نقطة في جنوب غانا. محطة استراحة بعد زيارة الساحل الأوسط.",
    },
    kumasi: {
      name: "كوماسي",
      region: "أشانتي",
      summary: "عاصمة مملكة أشانتي: القصر الملكي، والكِنتي، والمهرجانات، والأسواق الضخمة.",
      description:
        "كوماسي ثاني مدن البلاد وقلب مملكة أشانتي، التي لا يزال ملكها، الأسانتيهيني، يؤدي دورًا تقليديًا بارزًا. يزور المرء فيها متحف قصر مانهيا، ويضيع في سوق كيجيتيا الهائل، وينطلق إلى قرى نسّاجي الكِنتي وبحيرة بوسومتوي. وحضور احتفال الأكواسيداي لحظة استثنائية. على بعد نحو أربع إلى خمس ساعات بالسيارة من أكرا، أو ساعة بالطائرة.",
    },
    "hohoe-volta": {
      name: "هوهوي وجبال الفولتا",
      region: "الفولتا",
      summary: "تلال خضراء، وأعلى شلالات البلاد، ومحميات للقرود.",
      description:
        "في شرق البلاد، قرب الحدود مع توغو، تمتد منطقة الفولتا بتلال تكسوها الغابات وقرى الإيوي ومواقع تديرها المجتمعات المحلية: شلالات وْلي، وجبل أفادجاتو، ومحمية القرود في تافي أتومي. وتُعدّ هوهوي قاعدة عملية للتنقّل في المنطقة. منطقة مثالية للمشي لمسافات طويلة، مكمّلة لزيارة الساحل.",
    },
    mole: {
      name: "حديقة مولي الوطنية",
      region: "سافانا",
      summary: "أكبر حديقة في غانا: رحلات سفاري سيرًا على الأقدام بين الفيلة في سافانا الشمال.",
      description:
        "حديقة مولي الوطنية أوسع منطقة محمية في البلاد، وتغطي سافانا مشجّرة تعيش فيها الفيلة والظباء والخنازير الثؤلولية وقرود البابون وطيور كثيرة. وتشتهر برحلات السفاري سيرًا على الأقدام برفقة حرّاس مسلّحين، تتيح غالبًا الاقتراب من الفيلة. يُوصل إليها من تامالي التي تخدمها رحلات جوية من أكرا. لا تقع الحديقة في منطقة تنصح السلطات الفرنسية أو البريطانية بتجنّبها، لكن شمال البلاد يستدعي يقظة مشدّدة: راجع نصائح السفر قبل الانطلاق.",
    },
    keta: {
      name: "كيتا ومصب نهر الفولتا",
      region: "فولتا",
      summary: "بحيرات ساحلية وشريط رملي وحصن دنماركي ومصب نهر الفولتا، في موطن شعب إيوي أنلو.",
      description:
        "في أقصى جنوب شرق البلاد، يمتد ساحل إقليم فولتا شريطًا رمليًا ضيقًا بين المحيط وبحيرة كيتا الكبيرة الغنية بالطيور. وتحتفظ بلدة كيتا الصغيرة بأطلال حصن برينزنشتاين الدنماركي، وتستضيف أنلوغا القريبة كل نوفمبر مهرجان هوغبيتسوتسو الكبير. وإلى الغرب، تقع أدا فوا عند مصب نهر الفولتا بضفافها الرملية ونزهات القوارب. إنه ساحل هادئ بعيد عن صخب أكرا.",
    },
    akosombo: {
      name: "أكوسومبو وبحيرة فولتا",
      region: "الإقليم الشرقي",
      summary: "السد الكبير وبحيرة فولتا وجسر أدومي وبلاد الكروبو موطن الخرز الزجاجي.",
      description:
        "على بعد نحو ساعتين شمال شرق أكرا، تُعد أكوسومبو بوابة بحيرة فولتا، الخزان الهائل الذي أنشأه السد المكتمل عام 1965. وتجعل التلال المكسوة بالغابات المحيطة بالنهر وجسر أدومي والرحلات البحرية في البحيرة من المنطقة وجهة مفضلة للهروب من العاصمة. وعلى مقربة منها، تحافظ بلاد الكروبو حول أودوماسي وسومانيا على فن الخرز الزجاجي وتحتفل كل خريف بمهرجان نغمايم.",
    },
    "koforidua-kwahu": {
      name: "كوفوريدوا وبوتي وهضبة كواهو",
      region: "الإقليم الشرقي",
      summary: "شلالات توأم وصخور مدهشة ومنحدرات كواهو، وجهة الطيران الشراعي في عيد الفصح.",
      description:
        "تحيط بكوفوريدوا، عاصمة الإقليم الشرقي، تلال مكسوة بالغابات تختبئ فيها شلالات بوتي التوأم وصخرة المظلة المدهشة. وإلى الشمال الغربي، ترفع هضبة كواهو منحدراتها فوق السهل، وتدب الحياة في بلداتها المرتفعة مثل أبيتيفي ومبرايسو خاصة في عيد الفصح، حين يعود أبناء كواهو المغتربون إلى ديارهم ويجذب مهرجان الطيران الشراعي في أودويانوما آلاف الزوار.",
    },
    kintampo: {
      name: "كينتامبو وبونو الشرقية",
      region: "بونو الشرقية",
      summary: "شلالات متدرجة وغابة مقدسة للقرود، في منتصف الطريق بين كوماسي وتامالي.",
      description:
        "على الطريق الرئيسي الذي يربط كوماسي بتامالي، يمثل إقليم بونو الشرقية منطقة الانتقال بين الغابة والسافانا. وتوفر شلالات كينتامبو المتدرجة على نهر بومبوم محطة منعشة، فيما يحمي ملاذ بوابينغ-فييما قرب نكورانزا قرودًا يعدّها القرويون مقدسة. وتُعد تيشيمان، بسوقها الزراعي الكبير، المدينة الرئيسية في المنطقة.",
    },
    tamale: {
      name: "تامالي",
      region: "الإقليم الشمالي",
      summary: "المدينة الكبرى في الشمال، بوابة حديقة مول وقلب مملكة الداغومبا.",
      description:
        "تامالي عاصمة الإقليم الشمالي وأكبر مدن شمال غانا، وهي بوابة الدخول إلى حديقة مول الوطنية، وتربطها رحلات جوية بأكرا. وهي مدينة غالبية سكانها من المسلمين، ذات شوارع واسعة تجوبها الدراجات النارية، وتُعد المركز الثقافي لشعب الداغومبا: فترى فيها السترات المنسوجة على شرائط («سموك» أو «فوغو»)، ويمكن حضور مهرجان الدامبا أو عيد النار (بوغوم). ويجب تجنب المناطق القريبة من الحدود الشمالية، لكن تامالي نفسها ليست في منطقة يُنصح بعدم زيارتها؛ ومع ذلك راجع نصائح السفر.",
    },
    "beyin-nzulezo": {
      name: "بيين ونزوليزو وأنكاسا",
      region: "الإقليم الغربي",
      summary: "قرية على ركائز وحصن بريطاني على المحيط وغابة استوائية بكر في أقصى الغرب.",
      description:
        "في الطرف الغربي من الساحل، قرب كوت ديفوار، تقدم بلاد النزيما محطة بعيدة عن المسارات المعتادة. فمن بيين، التي يشرف عليها حصن أبولونيا، يصعد قارب عبر مستنقعات نخيل الرافيا حتى نزوليزو، القرية المبنية بالكامل على ركائز وسط بحيرة أمانسوري. وإلى الشمال، تحمي منطقة أنكاسا للحفاظ على الطبيعة واحدة من أغنى الغابات الاستوائية المطيرة في البلاد. والطرق طويلة: خصص يومين على الأقل انطلاقًا من بوسوا أو تاكورادي.",
    },
  },
  places: {
    "parc-memorial-kwame-nkrumah": {
      name: "حديقة كوامي نكروما التذكارية",
      summary: "ضريح ومتحف أبي الاستقلال، في المكان الذي أُعلن فيه عام 1957.",
      description:
        "أُقيمت الحديقة على ملعب البولو القديم حيث أعلن كوامي نكروما استقلال غانا في 6 مارس 1957، وتضم ضريح أول رئيس للبلاد وزوجته، ومتحفًا يروي سيرته والحركة الأفريقية الجامعة. مكان أساسي لفهم تاريخ البلاد ومكانتها في حركات الاستقلال الأفريقية.",
    },
    "jamestown-accra": {
      name: "جيمس تاون ومنارتها",
      summary: "حي صيادي الغا القديم، بحصونه الاستعمارية ومنارته المخطّطة.",
      description:
        "جيمس تاون مهد أكرا التاريخي، نشأت حول حصون أوروبية منها حصن جيمس البريطاني وحصن أوشر ذو الأصل الهولندي. يتجوّل الزائر بين الزوارق الملوّنة والملاكمين في أثناء تدريبهم والبيوت القديمة، ثم يصعد إلى المنارة للاستمتاع بإطلالة على الساحل. وفي كل عام يملأ مهرجان «تشالي ووتي» لفنون الشارع أزقّتها بالجداريات والعروض والموسيقى.",
      tips: "قم بالزيارة نهارًا، ويُفضّل برفقة مرشد من الحي، واستأذن قبل تصوير السكان.",
    },
    "marche-de-makola": {
      name: "سوق ماكولا",
      summary: "السوق الكبير في وسط أكرا: أقمشة الواكس، والخرز، والتوابل، والمنتجات الطازجة.",
      description:
        "في قلب وسط المدينة، ماكولا أشهر أسواق أكرا، وتديره في معظمه تاجرات. تفيض ممرّاته بأقمشة الواكس والخرز والأواني والتوابل والمنتجات الطازجة. انغماس صاخب وملوّن في التجارة الغانية.",
      tips: "تعال صباحًا، وأبقِ أغراضك قريبة منك، واحذر النشّالين وسط الزحام.",
    },
    "osu-accra": {
      name: "أوسو وطعام الشارع",
      summary: "حي نابض لتذوّق الجولوف والواكي والكيليويلي والسمك المشوي.",
      description:
        "حول شارع أكسفورد، يجمع حي أوسو المطاعم والحانات وباعة الشارع. إنه المكان المثالي لاكتشاف المطبخ الغاني: أرز الجولوف، والواكي (أرز مع فاصولياء)، والكيليويلي (موز الجنة المتبّل والمقلي)، والفوفو أو البانكو مع الحساء، والسمك المشوي والبلطي. وفي المساء تتسلّم الموسيقى زمام الأجواء.",
      tips: "تقدّم مطاعم «تشوب بار» الأطباق التقليدية بأسعار زهيدة؛ اختر الأكشاك المزدحمة حيث يتجدّد الطعام بسرعة.",
    },
    "chateau-de-cape-coast": {
      name: "قلعة كيب كوست",
      summary: "حصن أبيض قبالة المحيط، بزنازينه و«باب اللاعودة».",
      description:
        "أُسّست قلعة كيب كوست في القرن السابع عشر ثم وسّعها البريطانيون، وكانت من أكبر مراكز تجارة الرقيق عبر الأطلسي. تقود الجولة المصحوبة بمرشد إلى الزنازين التي كان الأسرى يُكدَّسون فيها قبل ترحيلهم عبر «باب اللاعودة». ويروي متحف داخلها تاريخ المنطقة وتجارة الرقيق. زيارة مؤثّرة للغاية، أصبحت مكان حجّ لأحفاد الشتات الأفريقي.",
    },
    "canopee-de-kakum": {
      name: "حديقة كاكوم الوطنية وممرّها المعلّق",
      summary: "ممرات معلّقة بين قمم أشجار غابة مطيرة محمية.",
      description:
        "على بعد نحو ثلاثين كيلومترًا شمال كيب كوست، تحمي حديقة كاكوم الوطنية غابة استوائية مطيرة شاسعة. ويتيح ممرّها الشهير، وهو سلسلة من الجسور المعلّقة بين الأشجار على ارتفاع عشرات الأمتار عن الأرض، مشاهدة الغابة من الأعلى. وتعرّف الجولات المصحوبة بمرشد على الأرض بالنباتات الطبية والطيور والفراشات، أما الثدييات الكبيرة كفيلة الغابات فنادرًا ما تُرى.",
      tips: "تعال باكرًا صباحًا لتجنّب الزحام والاستمتاع بالطيور. لا يُنصح به لمن يعانون من الدوار.",
    },
    "assin-manso": {
      name: "نهر العبيد في آسين مانسو",
      summary: "موقع للذاكرة كان الأسرى يغتسلون فيه للمرة الأخيرة قبل بلوغ الساحل.",
      description:
        "شمال كيب كوست، كانت آسين مانسو محطة رئيسية على طريق الأسرى نحو حصون الساحل. ففي النهر المسمّى دونكور نسوو كانوا يغتسلون للمرة الأخيرة قبل المسيرة النهائية. ويستضيف الموقع، الذي حُوّل إلى حديقة تذكارية، مراسم للتأمّل والتذكّر، خصوصًا لزوّار الشتات الأفريقي.",
    },
    "fetu-afahye": {
      name: "مهرجان فيتو أفاهيي",
      summary: "الاحتفال السنوي الكبير في كيب كوست: موكب الزعماء والطبول والأزياء.",
      description:
        "يحتفل سكان كيب كوست (أوغوا) كل عام بمهرجان فيتو أفاهيي، وهو احتفال تقليدي يُخلّد، بحسب الموروث، نهاية وباء، ويمثّل وقتًا للتطهّر والتجدّد. وذروته موكب الزعماء الملوّن المحمولين على هوادج، ترافقهم فرق الأسافو والطبول والحشود في شوارع المدينة.",
      tips: "تحدّد السلطات التقليدية المواعيد الدقيقة كل عام: تحقّق منها قبل الحجز.",
      bestPeriod: "أوائل سبتمبر",
    },
    "chateau-d-elmina": {
      name: "قلعة إلمينا",
      summary: "شيّدها البرتغاليون عام 1482، ومدرجة في قائمة التراث العالمي لليونسكو.",
      description:
        "بُنيت قلعة ساو جورجي دا مينا ابتداءً من عام 1482 لتجارة الذهب، وتُعدّ أقدم مبنى أوروبي في أفريقيا جنوب الصحراء. وبعد انتقالها إلى الهولنديين في القرن السابع عشر، صارت موقعًا محوريًا في تجارة الرقيق عبر الأطلسي. تمرّ الجولة المصحوبة بمرشد بالساحات والزنازين وجناح الحاكم و«باب اللاعودة».",
    },
    "fort-saint-jacques-elmina": {
      name: "حصن سانت ياغو",
      summary: "حصن هولندي صغير على التلّ، يطلّ على القلعة والميناء.",
      description:
        "يقع حصن سانت ياغو (أو كونرادسبورغ) على التلّ المقابل للقلعة، وقد حصّنه الهولنديون لحماية قلعة إلمينا. يأتيه الزوّار خصوصًا للإطلالة الاستثنائية على القلعة والبحيرة الشاطئية وميناء الصيد.",
    },
    "port-de-peche-d-elmina": {
      name: "ميناء الصيد وسوق السمك في إلمينا",
      summary: "زوارق ملوّنة، وعودة الصيادين، ومزاد السمك عند سفح القلعة.",
      description:
        "عند سفح القلعة، تحتضن بحيرة بينيا الشاطئية واحدًا من أنشط موانئ الصيد التقليدي في البلاد. في الصباح تعود الزوارق المزيّنة بالأعلام والشعارات محمّلة بالسمك، فتبيعه نساء السوق أو يدخّنّه أو يعالجنه في الحال. مشهد آسر من الحياة اليومية.",
      tips: "تعال صباحًا. كن متحفّظًا واستأذن قبل التصوير، فبعض الصيادين يطلبون مساهمة صغيرة.",
    },
    "plage-de-busua": {
      name: "شاطئ بوسوا",
      summary: "شاطئ واسع في خليج، ومكان معروف لركوب الأمواج للمبتدئين.",
      description:
        "يمتد شاطئ بوسوا على طول خليج محمي تحفّه أشجار جوز الهند والفنادق الصغيرة ومطاعم الأسماك والمأكولات البحرية. وجعلت أمواجه المنتظمة منه أحد أشهر أماكن ركوب الأمواج في غانا، مع مدارس تؤجّر الألواح وترافق المبتدئين.",
      tips: "استعلم محليًا عن التيارات قبل السباحة أو ركوب الأمواج، ولا تذهب وحدك إلى الشواطئ المعزولة.",
    },
    "fort-metal-cross-dixcove": {
      name: "حصن ميتال كروس في ديكسكوف",
      summary: "حصن بريطاني يطلّ على مرفأ صيد طبيعي، على بعد بضعة كيلومترات من بوسوا.",
      description:
        "شيّد البريطانيون حصن ديكسكوف، المعروف بحصن ميتال كروس، في أواخر القرن السابع عشر، ويطلّ على خليج صغير طبيعي تحتمي فيه زوارق الصيادين. وهو من حصون غانا وقلاعها المدرجة في قائمة التراث العالمي لليونسكو. يمكن بلوغه سيرًا من بوسوا عبر درب ساحلي أو بالسيارة.",
      tips: "اسلك الدرب الساحلي بين بوسوا وديكسكوف برفقة مرشد محلي.",
    },
    "cap-des-trois-pointes": {
      name: "رأس النقاط الثلاث",
      summary: "أقصى جنوب غانا، بمنارته وغابته وشواطئه البرية.",
      description:
        "يمثّل رأس النقاط الثلاث (كيب ثري بوينتس) أقصى نقطة في جنوب البلاد. وفيه منارة تطلّ على المحيط، وشواطئ شبه خالية، وبقايا غابة من محمية غابية مجاورة. وكثيرًا ما يُقدَّم على أنه أقرب يابسة إلى النقطة التي يتقاطع فيها خط الاستواء مع خط غرينتش.",
    },
    "musee-du-palais-de-manhyia": {
      name: "متحف قصر مانهيا",
      summary: "القصر السابق لملوك أشانتي وتاريخ اتحاد أشانتي.",
      description:
        "يقع المتحف في قصر مانهيا الملكي القديم، ويعرض أثاثًا وأدوات بلاطية وتماثيل وتذكارات لملوك أشانتي، إضافة إلى تاريخ الاتحاد وحروبه مع البريطانيين ونفي الملك بريمبيه الأول. ويقع القصر الحالي للأسانتيهيني على مقربة منه.",
    },
    "akwasidae-kumasi": {
      name: "احتفال الأكواسيداي",
      summary: "كل ستة أسابيع، يستقبل الأسانتيهيني الزعماء والجمهور في أبهة مذهلة.",
      description:
        "وفق التقويم التقليدي لشعب الأكان، يتكرّر الأكواسيداي نحو كل ستة أسابيع، في يوم أحد. وفي كوماسي يكرّم الأسانتيهيني الأسلاف ثم يستقبل علنًا الزعماء والأعيان: مظلات عملاقة، وحليّ ذهبية، وطبول ناطقة، وأبواق من العاج تجعل منه أحد أكثر المشاهد إبهارًا في غرب أفريقيا.",
      tips: "استعلم عن المواعيد في مكان إقامتك أو في المركز الثقافي، واستأذن دائمًا قبل تصوير الزعماء.",
      bestPeriod: "نحو كل ستة أسابيع، في يوم أحد",
    },
    "bonwire-kente": {
      name: "بونواير، قرية الكِنتي",
      summary: "نسّاجو الكِنتي يعملون على أنوالهم ذات الأشرطة الضيّقة.",
      description:
        "شمال شرق كوماسي، تشتهر قرية بونواير بأنها أحد مهود الكِنتي، القماش المنسوج في أشرطة ضيقة بزخارف مثقلة بالرموز، وكان في الماضي حكرًا على ملوك أشانتي. يمكن مشاهدة النسّاجين وهم يعملون، وشراء الأشرطة والقطع المنسوجة مباشرة منهم.",
      tips: "تتطلّب الأقمشة الجيدة عملًا طويلًا: خذ وقتك في المقارنة وفاوض بلطف.",
    },
    "lac-bosumtwi": {
      name: "بحيرة بوسومتوي",
      summary: "بحيرة فوهة مقدّسة تحيط بها تلال مشجّرة، على بعد نحو ثلاثين كيلومترًا من كوماسي.",
      description:
        "نشأت بحيرة بوسومتوي من اصطدام نيزك، وتملأ فوهة شبه دائرية تحيط بها تلال خضراء. وهي مقدّسة لدى الأشانتي، وتنتشر على ضفافها قرى صيادين لا تزال تستخدم ألواحًا خشبية تقليدية في الصيد. وتجعل منها جولات المشي أو الدراجة حول البحيرة والإقامة في النُّزل ملاذًا هادئًا قريبًا من كوماسي.",
    },
    "cascades-de-wli": {
      name: "شلالات وْلي",
      summary: "شلالات مذهلة في قلب الغابة، من بين الأعلى في غرب أفريقيا.",
      description:
        "في عمق وادٍ مشجّر في محمية أغوماتسا، تنحدر شلالات وْلي من جرف عالٍ إلى حوض يمكن الانتعاش فيه. يقود ممشى عبر الغابة إلى الشلال السفلي، فيما يصعد درب أكثر مشقّة إلى الشلال العلوي. وتأوي الجرفَ مستعمراتٌ من الخفافيش آكلة الفاكهة.",
      tips: "الدرب المؤدي إلى الشلال العلوي شديد الانحدار وزلق: يُنصح بأحذية جيدة ومرشد محلي.",
      bestPeriod: "خلال موسم الأمطار وبعده مباشرة (تدفّق أقوى)",
    },
    "mont-afadjato": {
      name: "جبل أفادجاتو",
      summary: "صعود قصير وشديد الانحدار إلى إحدى أعلى قمم البلاد.",
      description:
        "كثيرًا ما يُقدَّم جبل أفادجاتو على أنه أعلى نقطة في غانا، ويُصعد إليه في تسلّق قصير لكنه شديد الانحدار عبر الغابة انطلاقًا من قرية لياتي ووتي. ومن القمة تمتد الإطلالة على تلال الفولتا حتى توغو المجاورة. وتقود دروب أخرى إلى شلالات قريبة.",
      tips: "انطلق باكرًا برفقة مرشد من مشروع السياحة البيئية المحلي، مع الماء وأحذية جيدة.",
    },
    "sanctuaire-des-singes-de-tafi-atome": {
      name: "محمية القرود في تافي أتومي",
      summary: "غابة مجتمعية تعيش فيها قرود المونا، يحميها القرويون.",
      description:
        "في تافي أتومي، يحمي السكان منذ زمن طويل قرود المونا التي تعيش في غابة القرية ويعدّونها مقدّسة. ويتيح مشروع للسياحة البيئية المجتمعية مشاهدتها عن قرب خلال جولة مصحوبة بمرشد، والتعرّف على حياة القرية.",
      tips: "اتّبع تعليمات المرشد ولا تُطعم القرود دون موافقته.",
    },
    "safari-a-pied-mole": {
      name: "سفاري سيرًا وبالسيارة في مولي",
      summary: "مشاهدة الفيلة والظباء والبابون سيرًا على الأقدام برفقة حارس.",
      description:
        "تنطلق رحلات السفاري من مركز الزوّار في الحديقة، القائم على جرف يطلّ على نقاط ماء تأتي الفيلة كثيرًا للشرب منها. سيرًا برفقة حارس مسلّح أو بالسيارة، يمكن مشاهدة الفيلة وظباء الكوب والظباء الأيلية والخنازير الثؤلولية وقرود البابون، إلى جانب طيور غنية جدًا. الفجر وآخر النهار أفضل الأوقات.",
      tips: "التزم بدقة بتعليمات الحرّاس وحافظ على مسافة من الحيوانات. راجع نصائح السفر الخاصة بشمال غانا وتجنّب الطريق ليلًا.",
      bestPeriod: "من ديسمبر إلى أبريل (الموسم الجاف)",
    },
    "mosquee-de-larabanga": {
      name: "مسجد لارابانغا",
      summary: "مسجد طيني على الطراز السوداني الساحلي، من أقدم مساجد البلاد.",
      description:
        "على بعد بضعة كيلومترات من مدخل الحديقة، تضم قرية لارابانغا مسجدًا أبيض صغيرًا من الطين تبرز منه عوارض خشبية، على الطراز السوداني الساحلي. ويُرجع الموروث تاريخه إلى عدة قرون، ما يجعله من أقدم المساجد في غانا. يُشاهَد من الخارج برفقة مرشد من القرية.",
      tips: "مكان عبادة قائم: ارتدِ ملابس ساترة، واكتفِ بالزيارة من الخارج، ولا تأتِ في أوقات الصلاة. استعن بالمرشد الرسمي للقرية.",
    },
    "place-de-l-independance-accra": {
      name: "ساحة الاستقلال (ساحة النجمة السوداء)",
      summary: "ساحة فسيحة مطلة على المحيط، تضم قوس الاستقلال والنجمة السوداء.",
      description:
        "أُنشئت هذه الساحة الواسعة للاستعراضات في مطلع ستينيات القرن العشرين في عهد الرئيس كوامي نكروما، وهي تمتد على طول المحيط على بعد دقائق من الحديقة التذكارية. ويُذكّر قوس الاستقلال والنجمة السوداء رمز البلاد وشعلة الجندي المجهول بميلاد الأمة. وتُقام فيها الاستعراضات الرسمية الكبرى، ولا سيما استعراض عيد الاستقلال في 6 مارس.",
      tips: "يحيط بالموقع عدد من المباني الرسمية: استأذن قبل تصوير العسكريين والحراس، وتجنّب ساعات الحر الشديد.",
    },
    "musee-national-du-ghana": {
      name: "المتحف الوطني الغاني",
      summary: "آثار وإثنوغرافيا وفنون غانا في متحف مُجدَّد بحي أدابراكا.",
      description:
        "افتُتح المتحف الوطني عام 1957، عام الاستقلال، وتديره هيئة المتاحف والمعالم الغانية. وقد أُغلق عدة سنوات للأشغال ثم أُعيد افتتاحه عام 2022 بعد تجديد شامل. وتعرض مجموعاته الآثار وأدوات البلاط والآلات الموسيقية والمنسوجات وفنون البلاد، فهو مدخل جيد قبل التوجه إلى كوماسي أو الساحل.",
      tips: "استعلم عن شروط الزيارة قبل الذهاب، فقد يكون التصوير مقيَّدًا في القاعات.",
    },
    "centre-national-de-culture-accra": {
      name: "المركز الوطني للثقافة (مركز الفنون)",
      summary: "سوق الحرف الكبير في أكرا: أقمشة الكنتي والأقنعة والطبول والخرز والمنحوتات.",
      description:
        "بالقرب من الواجهة البحرية، بين جيمستاون وساحة الاستقلال، يضم المركز الوطني للثقافة، الذي يسميه الجميع «مركز الفنون»، عشرات الأكشاك للحرفيين والباعة. وتجد فيه أقمشة الكنتي والأدينكرا والخرز والطبول والأقنعة والمنحوتات والسلال القادمة من أنحاء البلاد كافة. وهو محطة عملية لشراء الهدايا في نهاية الرحلة.",
      tips: "الأسعار الأولى مرتفعة: قارن بين عدة أكشاك وفاوض بابتسامة، وكن حازمًا مع الباعة الملحّين.",
    },
    "plage-de-labadi": {
      name: "شاطئ لاباديه (لا بلجر بيتش)",
      summary: "أكثر شواطئ أكرا حيوية: موسيقى ورقص وجولات على الخيل وسهرات نهاية الأسبوع.",
      description:
        "شرق وسط المدينة، يُعد شاطئ لاباديه، أو «لا بلجر بيتش»، ملتقى سكان أكرا في عطلات نهاية الأسبوع والأعياد. وتتوالى على الرمال مكبرات الصوت وقارعو الطبول والبهلوانيون والفرسان وباعة جوز الهند والسمك المشوي، ويمتد الصخب إلى المساء، ولا سيما في ديسمبر وعيد الفصح. إنه انغماس في أجواء الترفيه في العاصمة أكثر منه شاطئًا للسباحة.",
      tips: "السباحة خطرة بسبب الأمواج العالية والتيارات: ابقَ على حافة الماء. لا تحمل كثيرًا من الأغراض الثمينة، وغادر قبل حلول الظلام التام إن كنت وحدك.",
    },
    "plage-de-kokrobite": {
      name: "شاطئ كوكروبايت",
      summary: "قرية صيادين وشاطئ طويل غرب أكرا، ووجهة مفضلة في عطلات نهاية الأسبوع.",
      description:
        "على بعد نحو ثلاثين كيلومترًا غرب وسط أكرا، تقع كوكروبايت، وهي قرية صيادين من شعب الغا يجذب شاطئها الطويل، المحفوف بالقوارب وأشجار جوز الهند، سكان المدينة والمسافرين الباحثين عن الهدوء. ويأتيها الزوار للتنزه على حافة الماء ومشاهدة عودة الصيادين والاستمتاع بأجواء مسترخية تصاحبها غالبًا الموسيقى والطبول.",
      tips: "التيارات خطرة: استعلم قبل السباحة. لا تنفرد بنفسك على الشاطئ، خاصة في المساء، ورتّب وسيلة نقل موثوقة للعودة.",
    },
    "jardins-botaniques-d-aburi": {
      name: "حدائق أبوري النباتية",
      summary: "حديقة أُنشئت عام 1890 على تلال أكوابيم المنعشة، على بعد ساعة من أكرا.",
      description:
        "على قمة سلسلة أكوابيم شمال أكرا، افتُتحت حدائق أبوري النباتية عام 1890. وتجعل منها ممرات النخيل الملكي والأشجار العملاقة والنباتات الطبية والمروج الظليلة مكانًا محببًا للتنزه، بنسماته المنعشة. ويصطف على الطريق الصاعد إليها عدد من ورش النحت على الخشب، وتستضيف مدينة أكروبونغ المجاورة كل خريف مهرجان أودويرا.",
      tips: "تعال في أيام الأسبوع لمزيد من الهدوء، واصطحب سترة خفيفة في موسم الأمطار لأن التلال أبرد من الساحل.",
    },
    "reserve-de-shai-hills": {
      name: "محمية تلال شاي",
      summary: "سافانا وتلال صخرية وكهوف وقرود البابون على بعد ساعة شرق أكرا.",
      description:
        "شمال شرق أكرا، تحمي محمية تلال شاي سافانا تتخللها تلال صخرية منعزلة سكنها قديمًا شعب الشاي. وتتيح الممرات والمسالك مشاهدة قرود البابون والظباء والطيور الكثيرة، والصعود إلى كهوف ونقاط مطلة على سهول أكرا. وهي نزهة طبيعية سهلة يمكن الجمع بينها وبين طريق أكوسومبو.",
      tips: "انطلق في الصباح الباكر حين تكون الحيوانات نشطة والحر محتملًا. لا تطعم قرود البابون وأبقِ حقائبك مغلقة.",
    },
    "fort-william-anomabo": {
      name: "حصن ويليام في أنومابو",
      summary: "حصن بريطاني من القرن الثامن عشر على شاطئ المحيط، مدرج في قائمة التراث العالمي.",
      description:
        "على بعد نحو خمسة عشر كيلومترًا شرق كيب كوست، شيّد البريطانيون حصن ويليام في منتصف القرن الثامن عشر في أنومابو، التي كانت آنذاك من أهم موانئ تجارة الرقيق على ساحل الذهب. وهو من حصون غانا وقلاعها المدرجة في قائمة اليونسكو للتراث العالمي. وهو أقل ازدحامًا من قلعتي كيب كوست وإلمينا، فيتيح زيارة أكثر هدوءًا لساحاته وزنازينه وأسواره المطلة على البحر.",
      tips: "محطة سهلة على طريق أكرا–كيب كوست؛ قم بالزيارة برفقة مرشد الموقع.",
    },
    "marche-de-kejetia": {
      name: "سوق كيجيتيا (السوق المركزي في كوماسي)",
      summary: "من أكبر أسواق غرب أفريقيا، متاهة من آلاف الأكشاك.",
      description:
        "في قلب كوماسي، يضم سوق كيجيتيا المركزي آلاف المتاجر والأكشاك، ويُعد من أكبر أسواق غرب أفريقيا. وتتجاور فيه الأقمشة والخرز والأحذية والأواني والبطاطا الحلوة (اليام) والتوابل والحلزون العملاق والنباتات الطبية في متاهة من الممرات. وقد أُعيد بناء جزء من الموقع في أواخر العقد الثاني من القرن الحادي والعشرين حول محطة حافلات جديدة.",
      tips: "تعال صباحًا برفقة مرشد أو أحد السكان حتى لا تضل طريقك، وأبقِ أغراضك قريبة منك وسط الزحام.",
    },
    "batiments-traditionnels-ashanti": {
      name: "المباني الأشانتية التقليدية (مزار بيسياسي)",
      summary: "مزارات مزينة بنقوش بارزة، هي آخر شواهد العمارة الأشانتية، مدرجة لدى اليونسكو.",
      description:
        "حول كوماسي ما تزال بعض المزارات التقليدية قائمة، وقد أُدرجت معًا في قائمة اليونسكو للتراث العالمي باسم «المباني الأشانتية التقليدية». وهي مبنية من الطين والخشب والقش، ومزينة بنقوش بارزة ذات زخارف رمزية. ويُعد مزار بيسياسي قرب إيجيسو، الذي رُمّم وزُوّد بمساحة صغيرة لاستقبال الزوار، أيسرها لفهم فن البناء هذا ودوره الديني.",
      tips: "ما تزال هذه الأماكن مواقع عبادة محترمة: اتبع تعليمات الحارس واستأذن قبل تصوير الداخل.",
    },
    "ntonso-adinkra": {
      name: "نتونسو، قرية الأدينكرا",
      summary: "طابعو أقمشة الأدينكرا أثناء العمل، بأختام من القرع وصبغة من لحاء الأشجار.",
      description:
        "شمال كوماسي، تشتهر قرية نتونسو بطباعة أقمشة الأدينكرا. إذ ينحت الحرفيون أختامًا من ثمار القرع ويحضّرون صبغة سوداء من لحاء الأشجار، ثم يطبعون يدويًا رموز الأدينكرا التي يحمل كل منها مثلًا أو قيمة. ويمكن مشاهدة مراحل الصنع، بل وتجربة الطباعة أحيانًا.",
      tips: "خصص وقتًا لورشة الطباعة واشترِ مباشرة من الحرفيين، واجمع بين هذه الزيارة وزيارة بونواير وأهوييا.",
    },
    "ahwiaa-sculpture-sur-bois": {
      name: "أهوييا، قرية النحت على الخشب",
      summary: "مقاعد وأقنعة وطبول منحوتة في ورش قرية قريبة من كوماسي.",
      description:
        "على طريق مامبونغ، على بعد بضعة كيلومترات شمال كوماسي، تصطف في قرية أهوييا ورش النحاتين على الخشب ومتاجرهم. ويمكن مشاهدة صنع المقاعد الأشانتية ودمى الأكوابا والأقنعة والتماثيل الصغيرة وطبول الجيمبي التي تُباع في المكان. وهي محطة سهلة في جولة قرى الحرفيين مع بونواير ونتونسو.",
      tips: "تحقق من جودة الخشب والتشطيب قبل الشراء وفاوض بلباقة، وتجنب القطع الأثرية أو ما يُعرض على أنه كذلك.",
    },
    "chutes-de-tagbo": {
      name: "شلالات تاغبو",
      summary: "شلال وسط الغابة عند سفح جبل أفادجاتو، يُبلغ سيرًا على الأقدام من ليياتي ووتي.",
      description:
        "انطلاقًا من قرية ليياتي ووتي، يعبر درب مزارع الكاكاو والغابة حتى شلالات تاغبو التي تنحدر على جدار صخري مكسو بالنباتات عند سفح جبل أفادجاتو. ويمكن بسهولة الجمع بين هذه المسيرة، التي تستغرق نحو ثلاثة أرباع الساعة، وصعود الجبل في اليوم نفسه، في إطار مشروع السياحة البيئية المجتمعية في القرية.",
      tips: "قد يكون الدرب موحلًا وزلقًا: الأحذية المغلقة ضرورية. مرّ بمكتب الاستقبال في القرية للحصول على مرشد.",
      bestPeriod: "أثناء موسم الأمطار وبعده، حين يكون تدفق المياه قويًا",
    },
    "fort-prinzenstein-keta": {
      name: "حصن برينزنشتاين",
      summary: "أطلال حصن دنماركي من أواخر القرن الثامن عشر نخرها المحيط.",
      description:
        "شيّد الدنماركيون حصن برينزنشتاين عام 1784 في كيتا، واستُخدم مركزًا تجاريًا ومكانًا لاحتجاز الأسرى خلال تجارة الرقيق عبر الأطلسي. وهو من حصون غانا وقلاعها المدرجة في قائمة اليونسكو للتراث العالمي. وقد جرف التآكل الساحلي جزءًا كبيرًا منه، ولم يبقَ إلا أجزاء من الأسوار وزنازين ومبانٍ متهدمة على حافة المحيط، شاهدة على تاريخ هذا الساحل وهشاشته.",
      tips: "الأطلال هشة: ابقَ في المناطق المتاحة للزوار واصطحب مرشدًا محليًا.",
    },
    "lagune-de-keta": {
      name: "بحيرة كيتا",
      summary: "أكبر بحيرة ساحلية في غانا، وأرض رطبة محمية غنية بالطيور المائية.",
      description:
        "تفصل بحيرة كيتا عن المحيط شريط رملي ضيق، وهي أكبر بحيرة ساحلية في البلاد. وقد صُنّفت أرضًا رطبة ذات أهمية دولية (موقع رامسار)، وتستقبل طيورًا مائية كثيرة مقيمة ومهاجرة، ويعيش منها الصيادون ومنتجو الملح. ويمكن اكتشافها من الطريق الممتد على الشريط الرملي، من قرية إلى أخرى، أو في نزهة بالقارب مع الصيادين.",
      tips: "الصباح وآخر العصر أفضل الأوقات لمشاهدة الطيور؛ احمل منظارًا ووسائل الوقاية من الشمس.",
      bestPeriod: "من أكتوبر إلى مارس لمشاهدة الطيور المهاجرة",
    },
    "estuaire-de-la-volta-ada": {
      name: "أدا فوا ومصب نهر الفولتا",
      summary: "حيث يلتقي نهر الفولتا بالمحيط: ضفاف رملية وجزر وقوارب وشواطئ.",
      description:
        "في أدا فوا، يُنهي نهر الفولتا مجراه في المحيط مكوّنًا مصبًا تتناثر فيه الجزر والضفاف الرملية. وتتيح نزهات القوارب اكتشاف قرى الصيادين وأشجار المانغروف والشواطئ المنعزلة بين النهر والبحر. ويحظى المكان بإقبال كبير من سكان أكرا في عطلات نهاية الأسبوع وخلال مهرجان أسافوتوفيام، عيد أدا الكبير في مطلع أغسطس.",
      tips: "لا تسبح إلا في الأماكن التي يشير إليها السكان، فتيارات المصب والمحيط خطرة. واطلب سترات النجاة في القوارب.",
    },
    "barrage-d-akosombo": {
      name: "سد أكوسومبو وبحيرة فولتا",
      summary: "السد الكهرومائي الذي أنشأ بحيرة فولتا، إحدى أكبر البحيرات الاصطناعية في العالم.",
      description:
        "اكتمل سد أكوسومبو عام 1965، وهو يحجز مياه نهر الفولتا، ومنه نشأت بحيرة فولتا الممتدة مئات الكيلومترات نحو الشمال، وهي من أكبر البحيرات الاصطناعية في العالم مساحةً. ويوفر السد، رمز التصنيع الذي سعى إليه كوامي نكروما، جزءًا كبيرًا من كهرباء البلاد. ومن محيطه يمكن الاستمتاع بإطلالات على البحيرة وتلالها، وتُنظَّم رحلات بالقوارب في الخزان.",
      tips: "السد موقع حساس: لا تصوّر إلا حيث يُسمح بذلك، واستعلم في المكان عن شروط الزيارة.",
    },
    "pont-d-adomi": {
      name: "جسر أدومي",
      summary: "جسر أنيق بقوس فولاذي يعبر نهر الفولتا عند أتيمبوكو.",
      description:
        "أسفل السد، يعبر جسر أدومي نهر الفولتا بقوس فولاذي واحد وسط تلال مكسوة بالغابات. وقد افتُتح في أواخر خمسينيات القرن العشرين، ويربط أكرا بإقليم فولتا، وما يزال من أشهر المناظر في البلاد. وتعجّ ضفاف أتيمبوكو عند أسفل الجسر ببائعات الروبيان وأسماك النهر.",
      tips: "توقف نهارًا على الضفاف للاستمتاع بالمنظر، ولا تركن سيارتك على الجسر نفسه.",
    },
    "perles-de-krobo": {
      name: "خرز الكروبو الزجاجي (أودوماسي كروبو)",
      summary: "بلاد الكروبو، مهد الخرز المصنوع من الزجاج المعاد تدويره والذي يُلبس في المناسبات الكبرى.",
      description:
        "حول أودوماسي كروبو وسومانيا، يصنع شعب الكروبو منذ أجيال خرزًا من الزجاج المعاد تدويره، يُطحن ثم يُحمى في قوالب من الطين ويُزخرف يدويًا. ويُلبس هذا الخرز خصوصًا في طقس «ديبو» لعبور الفتيات إلى سن البلوغ وفي مهرجان نغمايم، ويُباع في الورش وأسواق المنطقة، ومنها سوق كوفوريدوا. وتتيح زيارة إحدى الورش متابعة جميع مراحل الصنع.",
      tips: "يبلغ الخرز القديم أسعارًا مرتفعة: اطلب النصيحة واحذر التقليد، ويُفضَّل الشراء مباشرة من الحرفيين.",
    },
    "chutes-de-boti": {
      name: "شلالات بوتي",
      summary: "شلالان توأمان ينحدران في مدرج صخري وسط الغابة.",
      description:
        "على بعد نحو عشرين كيلومترًا من كوفوريدوا، تنحدر شلالات بوتي في فرعين متوازيين يسميهما التقليد المحلي «الذكر» و«الأنثى»، داخل حوض صخري وسط الغابة. ويهبط درج طويل حتى البركة. والموقع جزء من محمية غابية تقود فيها الممرات أيضًا إلى صخرة المظلة وإلى نخلة ذات ثلاثة رؤوس.",
      tips: "الدرج شديد الانحدار وزلق في الطقس الرطب؛ احمل حذاءً جيدًا وماءً.",
      bestPeriod: "أثناء موسم الأمطار وبعده مباشرة (تدفق أقوى)",
    },
    "umbrella-rock-boti": {
      name: "صخرة المظلة",
      summary: "صخرة ضخمة على شكل مظلة فوق قاعدة، تطل على الغابة.",
      description:
        "على مسافة قصيرة سيرًا من شلالات بوتي، تقع صخرة المظلة، وهي كتلة ضخمة من الحجر الرملي البارز ترتكز على قاعدة صخرية كمظلة عملاقة. ويمكن الصعود إلى قمتها بسلّم للتمتع بإطلالة واسعة على التلال المكسوة بالغابات. ويمر الدرب بالمزارع والقرى، ويسهل الجمع بينه وبين زيارة الشلالات.",
      tips: "اصطحب مرشدًا من الموقع، ولا يُنصح بالصعود على السلّم أثناء المطر.",
    },
    "plateau-de-kwahu": {
      name: "هضبة كواهو وجبل أودويانوما",
      summary: "منحدرات مذهلة وبلدات مرتفعة، ومهرجان الطيران الشراعي في عيد الفصح.",
      description:
        "تشرف هضبة كواهو بمنحدراتها المكسوة بالغابات على السهل شمال نكاوكاو. ويُعد جبل أودويانوما، قرب أتيبي ومبرايسو، نقطة انطلاق مهرجان الطيران الشراعي الذي تنظمه هيئة السياحة الغانية في كل عطلة نهاية أسبوع لعيد الفصح، مع رحلات طيران مزدوجة للجمهور. وفي بقية العام، تدعو برودة المرتفعات والمطلات والقرى مثل أبيتيفي، إحدى أعلى المدن في البلاد، إلى التجوال.",
      tips: "في عيد الفصح يكون الإقبال هائلًا: احجز مكان إقامتك مبكرًا جدًا وتوقّع ازدحامًا على طريق نكاوكاو.",
      bestPeriod: "عطلة عيد الفصح للأجواء، والموسم الجاف للمناظر",
    },
    "chutes-de-kintampo": {
      name: "شلالات كينتامبو",
      summary: "شلال متدرج وسط الغابة، ومحطة تقليدية على طريق الشمال.",
      description:
        "شمال مدينة كينتامبو مباشرة، ينحدر نهر بومبوم على سلسلة من الدرجات الصخرية قبل أن يسقط في بركة تحيط بها الغابة. ويقود درج إلى أسفل الشلالات حيث يمكن الانتعاش، وقد أُقيم في الموقع ممر معلّق بين الأشجار. وهو من أكثر المحطات شعبية بين كوماسي وتامالي.",
      tips: "يزدحم الموقع كثيرًا في عطلات نهاية الأسبوع والأعياد، فتعال مبكرًا. والصخور زلقة قرب الماء.",
      bestPeriod: "أثناء موسم الأمطار وبعده مباشرة",
    },
    "sanctuaire-de-boabeng-fiema": {
      name: "ملاذ قرود بوابينغ-فييما",
      summary: "غابة مقدسة تعيش فيها قرود الكولوبس السوداء والبيضاء وقرود المونا تحت حماية القرويين.",
      description:
        "بين القريتين التوأمين بوابينغ وفييما، قرب نكورانزا، تأوي غابة قرود الكولوبس السوداء والبيضاء وقرود المونا التي يعدّها السكان مقدسة؛ إذ يحرّم التقليد صيدها، بل تُدفن القرود النافقة في مقبرة خاصة بها. ويُزار الملاذ، الذي يُدار بالتعاون مع المجتمع المحلي، برفقة مرشد يروي هذه المعتقدات ويساعد على رصد الحيوانات.",
      tips: "احترم القواعد المحلية وتعليمات المرشد، ولا تطعم القرود، والزم الهدوء لمراقبتها.",
      bestPeriod: "في الصباح الباكر أو آخر العصر",
    },
    "mosquee-centrale-de-tamale": {
      name: "المسجد المركزي في تامالي",
      summary: "المسجد الكبير في وسط المدينة، معلم الحياة الدينية في تامالي.",
      description:
        "في قلب تامالي، قرب السوق المركزي، يرفع المسجد المركزي مآذنه فوق الشوارع التجارية. وهو من أهم أماكن الصلاة في المدينة، ويكتظ بالمصلين أيام الجمعة وفي الأعياد الإسلامية الكبرى حين يمتد المصلون إلى الشوارع المجاورة. ويُشاهَد من الخارج مع احترام أوقات الصلاة.",
      tips: "مكان عبادة نشط: ارتدِ ملابس محتشمة، ولا تزره أثناء الصلاة، واستأذن قبل الدخول أو تصوير المصلين.",
    },
    "village-sur-pilotis-de-nzulezo": {
      name: "قرية نزوليزو على الركائز",
      summary: "قرية مبنية بالكامل على ركائز وسط بحيرة أمانسوري، يُوصل إليها بالقارب.",
      description:
        "في نهاية رحلة بالقارب عبر مستنقعات نخيل الرافيا والقنوات، تظهر نزوليزو وسط بحيرة أمانسوري، وقد شُيدت منازلها ومدرستها وكنيستها كلها على ركائز وتربطها ممشى خشبي طويل. وتقول الرواية التقليدية إن أجداد السكان قدموا من الغرب يهديهم حلزون. والقرية مدرجة في القائمة التمهيدية لغانا لمواقع التراث العالمي لدى اليونسكو.",
      tips: "احجز القارب والمرشد في مكتب الاستقبال في بيين، وخصص نصف يوم، واحمل الماء ووسائل الوقاية من الشمس. استأذن قبل تصوير السكان.",
    },
    "fort-apollonia-beyin": {
      name: "حصن أبولونيا",
      summary: "حصن بريطاني من أواخر القرن الثامن عشر مطل على المحيط، مدرج في قائمة التراث العالمي.",
      description:
        "شيّد البريطانيون حصن أبولونيا في بيين بين عامي 1768 و1770، وهو أقصى حصون غانا المدرجة في قائمة اليونسكو للتراث العالمي غربًا. وقد رُمّم، وهو يطل على الشاطئ وأشجار جوز الهند، ويستقبل الزوار الذين يأتون للتعرف إلى تاريخ ساحل النزيما قبل التوجه إلى نزوليزو.",
      tips: "الزيارة بمرشد في الموقع؛ اجمع بينها وبين رحلة نزوليزو التي تنطلق من القرية نفسها.",
    },
    "aire-de-conservation-d-ankasa": {
      name: "منطقة أنكاسا للحفاظ على الطبيعة",
      summary: "غابة استوائية مطيرة دائمة الخضرة من أغنى غابات غانا، للمتنزهين ومراقبي الطيور.",
      description:
        "في أقصى جنوب غرب البلاد، تحمي منطقة أنكاسا للحفاظ على الطبيعة، التي تضم محمية أنكاسا وحديقة نيني-سوهيين الوطنية، غابة استوائية مطيرة دائمة الخضرة ذات تنوع حيوي استثنائي في غانا. وتقود الممرات إلى جداول وبرك طبيعية تحت الأشجار الشاهقة، وأكثر ما يُشاهد فيها الطيور والفراشات والنباتات، إذ تبقى الثدييات متوارية جدًا.",
      tips: "الوصول عبر مسلك قد يصعب في موسم الأمطار: لا غنى عن مركبة مناسبة ومرشد. احمل طاردًا للحشرات وملابس طويلة.",
      bestPeriod: "الموسم الجاف، من ديسمبر إلى مارس",
    },
  },
  circuits: {
    "ghana-essentiel-8-jours": {
      title: "أساسيات غانا في 8 أيام",
      summary:
        "أكرا وتاريخها، وقلعتا كيب كوست وإلمينا، وممرّ كاكوم المعلّق، وشواطئ بوسوا، ثم كوماسي قلب مملكة أشانتي، وبحيرة بوسومتوي.",
    },
  },
  stepNotes: {
    "ghana-essentiel-8-jours:0": "الوصول إلى أكرا، وأولى الزيارات في وسط المدينة.",
    "ghana-essentiel-8-jours:3": "صباح في السوق، ثم الطريق إلى كيب كوست (نحو 3 ساعات).",
    "ghana-essentiel-8-jours:5": "انطلاق باكر إلى كاكوم، والعودة عبر آسين مانسو.",
    "ghana-essentiel-8-jours:7": "صباح في إلمينا، ثم الطريق إلى بوسوا.",
    "ghana-essentiel-8-jours:10": "يوم استراحة على شاطئ البحر.",
    "ghana-essentiel-8-jours:12": "رحلة طويلة إلى كوماسي (خصّص اليوم كاملًا، دون القيادة ليلًا).",
    "ghana-essentiel-8-jours:15": "صباح عند البحيرة، ثم العودة إلى أكرا برًّا أو جوًّا.",
  },
};

export const GHANA_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
