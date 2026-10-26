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
