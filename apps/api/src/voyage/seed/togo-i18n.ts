/**
 * Traductions du contenu de départ du guide Togo (voir ./togo.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de togo.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "Estrecha franja de tierra entre Ghana y Benín, Togo reúne a pocas horas de carretera la energía de Lomé y sus mercados, el lago Togo y la historia de Togoville, las colinas boscosas y las cascadas de Kpalimé y, más al norte, las grandes fiestas tradicionales de Sokodé y Kara y las casas-fortaleza del Koutammakou, declaradas Patrimonio Mundial de la UNESCO.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado, que se solicita en línea (e-visa) en el portal oficial del Gobierno togolés, unos días antes de la salida. Los ciudadanos de la CEDEAO están exentos. También puede exigirse un registro en línea a la llegada y a la salida. Compruebe siempre los requisitos actualizados en las fuentes oficiales antes de salir: pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos (repelente, mosquitera). Compruebe que sus vacunas habituales, incluida la del sarampión, están al día. Beba agua embotellada.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA), la misma que en Benín, Burkina Faso o Costa de Marfil. El efectivo sigue siendo imprescindible fuera de Lomé; el pago por móvil (mobile money) está muy extendido. Las tarjetas bancarias se aceptan en los hoteles y los comercios importantes de la capital.",
      },
      {
        title: "Cuándo ir",
        body: "El sur tiene dos estaciones de lluvias (aproximadamente de abril a julio y de septiembre a octubre); el norte, una sola (aproximadamente de mayo a octubre). La época más agradable va de noviembre a marzo, la estación seca, con el harmattan (viento seco y polvoriento) de diciembre a febrero. Las cascadas de la región de Kpalimé lucen más durante las lluvias y justo después, aunque entonces las pistas pueden volverse difíciles.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua oficial; el ewe (sobre todo en el sur) y el kabiyé (en el norte) son las principales lenguas nacionales, junto con muchas otras. Saludar antes de pedir cualquier cosa es fundamental. En los lugares sagrados (conventos, bosques sagrados, mercados de fetiches) y durante las ceremonias, siga las indicaciones de su guía y pida siempre permiso antes de fotografiar a una persona.",
      },
      {
        title: "Desplazarse",
        body: "En la ciudad, los mototaxis (zemidjans) son muy utilizados, pero las autoridades francesas los desaconsejan por los accidentes: es preferible tomar taxis o un coche con conductor. Entre ciudades: taxis colectivos, autobuses y coches con conductor. La carretera nacional 1 une Lomé con el norte del país: cuente con una larga jornada para llegar a Kara. Evite circular de noche y, en la estación de lluvias, prevea un 4x4 para las pistas.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo europeo. Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al mobile money.",
      },
      {
        title: "Seguridad",
        body: "El sur y el centro del país se visitan con una vigilancia normal, pero el extremo norte se ve afectado por la amenaza terrorista procedente del Sahel. Francia desaconseja formalmente la zona de la triple frontera con Burkina Faso, Benín y Ghana, y desaconseja salvo motivo imperativo toda la región de las Savanes, Dapaong incluida; el Reino Unido también desaconseja las inmediaciones de la frontera con Burkina Faso y el resto de esa región. Por eso esta guía no propone ningún itinerario en la región de las Savanes. En el resto del país, las precauciones son las de cualquier gran ciudad: en Lomé, evite caminar de noche, sobre todo por la playa y el paseo marítimo después de la puesta de sol, y no circule de noche fuera de la capital. El baño es peligroso en toda la costa (fuertes corrientes). Consulte antes y durante el viaje los «Conseils aux voyageurs» de France Diplomatie y la página «Foreign travel advice» del Gobierno británico (FCDO), que se actualizan con regularidad.",
      },
    ],
  },
  destinations: {
    lome: {
      summary: "Capital frente al océano: gran mercado, mercado de fetiches y patrimonio de la independencia.",
      description:
        "Capital y principal puerto del país, Lomé se extiende a lo largo del Atlántico, pegada a la frontera con Ghana. Se viene por la animación del Gran Mercado y sus comerciantes, por el mercado de fetiches de Akodessewa, por el monumento de la Independencia y por el antiguo palacio de los gobernadores convertido en centro de arte. Es el punto de llegada de la mayoría de los viajeros y una base práctica para recorrer el lago Togo, Aného y Kpalimé.",
    },
    "lac-togo": {
      name: "Lago Togo y Togoville",
      summary: "Laguna tranquila, travesía en piragua y Togoville, cuna histórica que dio su nombre al país.",
      description:
        "A unos cuarenta kilómetros al este de Lomé, el lago Togo es una gran laguna separada del océano por un cordón de arena. En la orilla sur, Agbodrafo (la antigua Porto Seguro) conserva una casa vinculada a la trata de esclavos; enfrente, se llega en piragua a Togoville, donde en 1884 se firmó el tratado de protectorado con Alemania y que dio su nombre al país. Una excursión de un día desde Lomé o una etapa relajante junto al agua.",
    },
    aneho: {
      summary: "Antigua capital colonial entre laguna y océano, gran centro de la cultura guin.",
      description:
        "Cerca de la frontera con Benín, Aného creció entre el océano y la laguna, en la desembocadura del lago Togo. Antigua factoría comercial y una de las primeras capitales de la colonia alemana antes de Lomé, conserva casas coloniales y afrobrasileñas algo desgastadas que le dan su encanto. Es también la tierra de los guin (gen): cada año, la fiesta de Epe Ekpe reúne a multitudes en el pueblo vecino de Glidji.",
    },
    kpalime: {
      summary: "Colinas boscosas, cascadas, plantaciones de café y cacao y una artesanía reputada.",
      description:
        "A unos 120 km al noroeste de Lomé, cerca de la frontera con Ghana, Kpalimé es la ciudad verde de Togo. Está rodeada de colinas cubiertas de bosque, entre ellas el monte Agou, el punto más alto del país, de cascadas y de plantaciones de café y cacao. Su ritmo tranquilo, su mercado y su centro de artesanía la convierten en una base ideal para unos días de senderismo.",
    },
    sokode: {
      summary: "Gran ciudad del centro, famosa por la fiesta de los cuchillos (Adossa), y puerta del parque de Fazao-Malfakassa.",
      description:
        "En el centro de Togo, en la carretera nacional 1, Sokodé es la principal ciudad del pueblo tem (kotokoli), mayoritariamente musulmán. Se la conoce sobre todo por la Adossa, o fiesta de los cuchillos, una de las grandes fiestas tradicionales del país. Es también una etapa en la ruta hacia el norte y una puerta de acceso al Parque Nacional de Fazao-Malfakassa.",
    },
    kara: {
      summary: "Capital del país kabyé, famosa por las luchas iniciáticas de los Evala.",
      description:
        "Gran ciudad del norte, Kara es la capital de la región del mismo nombre y del país kabyé, con sus colinas cultivadas en terrazas. Ciudad moderna y espaciosa, se la conoce sobre todo por los Evala, ritos iniciáticos centrados en la lucha tradicional que atraen cada verano a multitudes de espectadores. Es la base natural para descubrir el Koutammakou.",
    },
    koutammakou: {
      name: "Koutammakou, el país de los batammariba",
      summary: "Paisaje cultural declarado Patrimonio de la UNESCO, famoso por sus casas-fortaleza de tierra, las takienta.",
      description:
        "Al noreste de Kara, a lo largo de la frontera con Benín, el Koutammakou es el país de los batammariba. Sus casas-fortaleza de varios pisos con torrecillas, las takienta, dispersas en un paisaje de colinas y campos, forman un paisaje cultural vivo inscrito en el Patrimonio Mundial de la UNESCO desde 2004. Desde 2023, el bien inscrito se extiende también a la vecina Benín, al país de las Tata Somba. Se encuentra justo al sur de la región de las Savanes, desaconsejada: permanezca en el Koutammakou y consulte las recomendaciones de viaje antes de salir.",
    },
    notse: {
      summary: "Cuna histórica de los ewe, ciudad de las murallas de Agbogbo y de la gran fiesta de Agbogbo-za.",
      description:
        "A unos 90 km al norte de Lomé, capital de la prefectura de Haho, Notsé está considerada la cuna tradicional de los ewe, cuyos antepasados se dispersaron desde aquí hacia el sur de Togo y de Ghana. Se pueden ver los últimos vestigios de las murallas de Agbogbo y un monumento dedicado a la «cuna del pueblo ewe». A principios de septiembre, la fiesta de Agbogbo-za reúne a ewe de Togo, Ghana, Benín y la diáspora.",
    },
    badou: {
      summary: "Pequeña ciudad de las colinas de Wawa, entre bosques, plantaciones de café y cacao y la cascada de Akloa.",
      description:
        "Capital de la prefectura de Wawa, cerca de la frontera con Ghana, Badou está rodeada de colinas boscosas donde se cultivan café y cacao. Se viene sobre todo por la cascada de Akloa, una de las más conocidas del país, al final de una caminata por el bosque. Una etapa de naturaleza fuera de los circuitos habituales, más al norte que Kpalimé, en la misma región de las Plateaux.",
    },
    bassar: {
      summary: "Ciudad del país bassar, en el corazón de una región de metalurgia antigua del hierro inscrita en la lista indicativa de la UNESCO.",
      description:
        "Al oeste de Kara, Bassar es la capital de una prefectura de colinas y sabanas arboladas. Su región es uno de los grandes focos antiguos de la metalurgia del hierro en África Occidental: hornos, montones de escoria y antiguas minas salpican los alrededores, sobre todo en torno a Bandjéli. Tierra de ñame, celebra también la fiesta de la cosecha D'pontr, que marca el año nuevo de los bassar y los konkomba. Consulte las recomendaciones de viaje antes de salir: la región de las Savanes, más al norte, está desaconsejada.",
    },
  },
  places: {
    "grand-marche-lome": {
      name: "Gran Mercado de Lomé",
      summary: "El corazón comercial de la ciudad, reino de los tejidos y de las famosas «Nana Benz».",
      description:
        "En el centro de Lomé, el Gran Mercado (o mercado de Assigamé) y las calles que lo rodean forman el corazón comercial de la ciudad: telas, productos frescos, especias, utensilios, artesanía. Está asociado a las «Nana Benz», las comerciantes de telas wax que se hicieron famosas por su éxito a partir de los años sesenta y setenta. Una inmersión viva en la economía de la capital.",
      tips: "Venga por la mañana, mantenga sus pertenencias cerca y pida permiso antes de hacer fotos. El regateo forma parte del intercambio.",
    },
    "marche-des-feticheurs-akodessewa": {
      name: "Mercado de fetiches de Akodessewa",
      summary: "Mercado dedicado a los objetos e ingredientes de las prácticas vudú y de la medicina tradicional.",
      description:
        "En el barrio de Akodessewa, al este del centro, este mercado reúne puestos de ingredientes, estatuillas y objetos utilizados en las prácticas vudú y la medicina tradicional. Los vendedores y curanderos explican de buen grado su uso. El espectáculo puede sorprender (sobre todo por los animales disecados), pero ilustra el lugar del vudú en la vida cotidiana de la costa.",
      tips: "La visita suele hacerse con un guía del mercado; se pide una contribución, a menudo con un suplemento por las fotos: acuérdelo antes.",
    },
    "monument-de-l-independance-lome": {
      name: "Monumento de la Independencia",
      summary: "Símbolo de la independencia de Togo, proclamada el 27 de abril de 1960.",
      description:
        "En el centro de la plaza de la Independencia, este monumento conmemora el acceso de Togo a la independencia, el 27 de abril de 1960. Su alta silueta esculpida es uno de los emblemas de la capital; la plaza que lo rodea acoge las grandes celebraciones nacionales. Una parada breve pero imprescindible en cualquier visita a Lomé.",
    },
    "palais-de-lome": {
      name: "Palacio de Lomé",
      summary: "El antiguo palacio de los gobernadores, rehabilitado como centro de arte y cultura con un gran parque.",
      description:
        "Construido a principios del siglo XX para los gobernadores del Togo alemán y ocupado después por la administración francesa y por la presidencia tras la independencia, el palacio estuvo mucho tiempo abandonado. Restaurado, reabrió en 2019 como centro de arte y cultura: exposiciones de arte contemporáneo y de patrimonio, y un amplio parque arbolado frente al océano, un remanso de calma en pleno centro.",
    },
    "musee-national-togo": {
      name: "Museo Nacional de Togo",
      summary: "Colecciones de objetos tradicionales y de historia, en el Palacio de Congresos.",
      description:
        "Instalado en el Palacio de Congresos, el Museo Nacional presenta objetos procedentes de las distintas regiones del país: adornos, instrumentos musicales, objetos rituales y de uso cotidiano, así como piezas relacionadas con la historia de Togo. Una introducción útil a la diversidad de las culturas togolesas antes de partir hacia el interior.",
    },
    "maison-des-esclaves-agbodrafo": {
      name: "Casa de los esclavos de Agbodrafo",
      summary: "Casa del siglo XIX cuyo sótano servía para esconder cautivos tras la abolición de la trata.",
      description:
        "En Agbodrafo, la «Casa de los esclavos» (o casa Wood) fue construida en el siglo XIX por un comerciante. Tras la prohibición oficial de la trata, se cuenta que en su sótano se hacinaba a cautivos, lejos de las miradas, antes de embarcarlos clandestinamente. La visita guiada de este lugar de memoria, con el descenso al sótano, es un momento intenso.",
    },
    "traversee-du-lac-togo": {
      name: "Travesía del lago Togo en piragua",
      summary: "Deslizarse por la laguna entre pescadores y pueblos, de Agbodrafo a Togoville.",
      description:
        "Desde la orilla de Agbodrafo, los piragüeros ofrecen la travesía hasta Togoville. El trayecto, a vela, con pértiga o a motor, ofrece una bonita vista de la laguna, sus pescadores y los pueblos ribereños. Algunos alojamientos a orillas del lago proponen también salidas más largas.",
      tips: "Negocie el precio y la duración del trayecto de ida y vuelta antes de embarcar, y pida un chaleco salvavidas.",
    },
    "sanctuaire-notre-dame-togoville": {
      name: "Santuario de Nuestra Señora de Togoville",
      summary: "Iglesia y lugar de peregrinación mariana, visitado por el papa Juan Pablo II en 1985.",
      description:
        "Togoville fue uno de los primeros centros misioneros de la región. Su iglesia de Nuestra Señora, con coloridas pinturas interiores, se ha convertido en un lugar de peregrinación mariana, reforzado por la visita del papa Juan Pablo II en 1985. En la pequeña ciudad, iglesias y santuarios vudú conviven, como suele ocurrir en la costa.",
      tips: "Vista con decoro; no visite durante los oficios.",
    },
    "monument-du-centenaire-togoville": {
      name: "Togoville, ciudad del tratado de 1884",
      summary: "Monumento del centenario y recuerdo del rey Mlapa III, firmante del tratado con Alemania.",
      description:
        "En julio de 1884, el rey Mlapa III de Togoville firmó con el explorador alemán Gustav Nachtigal el tratado que convirtió la región en un protectorado alemán: el nombre de la ciudad, «Togo», pasó después a todo el país. Un monumento erigido en el centenario del tratado, estatuas y la casa de la familia real recuerdan este episodio fundacional, que conviene descubrir con un guía local.",
    },
    "vieille-ville-aneho": {
      name: "Casco antiguo de Aného",
      summary: "Paseo entre casas coloniales, iglesias antiguas y orillas de la laguna.",
      description:
        "El centro de Aného se descubre a pie: fachadas con galerías de la época colonial, casas de familias afrobrasileñas, iglesias antiguas y vistas a la laguna y al puente que cruza su desembocadura. Un paseo tranquilo, idealmente con un guía local que cuente el pasado comercial de la ciudad.",
    },
    "epe-ekpe-glidji": {
      name: "Fiesta de Epe Ekpe en Glidji",
      summary: "Año nuevo tradicional de los guin, marcado por la «toma de la piedra sagrada».",
      description:
        "Cada año, generalmente en septiembre, los guin celebran en Glidji, muy cerca de Aného, su año nuevo tradicional, Epe Ekpe. El momento culminante es la «toma de la piedra sagrada» en el bosque sagrado: su color se interpreta como un presagio para el año que empieza. Ceremonias, desfiles y reencuentros familiares marcan los festejos.",
      tips: "Las fechas cambian cada año: infórmese ante las autoridades locales o en su alojamiento. Respete las indicaciones, ya que algunas ceremonias no están abiertas al público.",
      bestPeriod: "Generalmente en septiembre",
    },
    "mont-agou": {
      name: "Monte Agou",
      summary: "El punto más alto de Togo (986 m), cubierto de bosques y pueblos ewe.",
      description:
        "Entre Kpalimé y Amoussoukopé, el monte Agou alcanza 986 m, el punto más alto del país. Sus laderas boscosas están salpicadas de pueblos ewe y cultivos; los senderos ofrecen bonitas vistas sobre la llanura. En la cima hay una instalación militar: se camina por las laderas hasta los miradores permitidos.",
      tips: "Salga temprano con un guía local, buen calzado y agua. Durante el harmattan, la bruma limita la vista.",
    },
    "cascade-de-wome": {
      name: "Cascada de Womé",
      summary: "Cascada en el bosque, al final de una pista y de un breve descenso a pie.",
      description:
        "En las colinas cercanas a Kpalimé, la cascada de Womé cae en una poza rodeada de vegetación exuberante. Se llega por una pista y luego por un sendero de bajada a través del bosque. Una excursión refrescante, fácil de combinar con los pueblos y plantaciones de los alrededores.",
      tips: "El sendero puede resbalar: lleve calzado adecuado. El pueblo que gestiona el lugar pide una contribución.",
      bestPeriod: "De julio a noviembre (mayor caudal)",
    },
    "centre-artisanal-kpalime": {
      name: "Centro de artesanía de Kpalimé",
      summary: "Talleres de escultores, tejedores, alfareros y pintores, con venta directa.",
      description:
        "Kpalimé es conocida por su artesanía. En el centro de artesanía se puede ver trabajar a escultores en madera, tejedores de kente, alfareros, cesteros y pintores, y comprar directamente sus creaciones. Una buena ocasión para llevarse un recuerdo hecho en el lugar.",
    },
    "cafe-cacao-kpalime": {
      name: "Café y cacao de la región de Kpalimé",
      summary: "Visita de plantaciones y degustación en la principal región cafetera del país.",
      description:
        "Las colinas que rodean Kpalimé son la principal región productora de café y cacao de Togo. Caminatas guiadas recorren las plantaciones a la sombra de grandes árboles y explican el camino desde la cereza de café o la mazorca de cacao hasta la taza o la tableta. Algunas cooperativas y pequeñas chocolaterías locales ofrecen degustación y venta.",
    },
    "adossa-sokode": {
      name: "Adossa, la fiesta de los cuchillos",
      summary: "Gran fiesta tem de danzas y demostraciones de valentía, hoy asociada a la fiesta de la cosecha Gadao.",
      description:
        "Gran fiesta de los tem de Sokodé, la Adossa está tradicionalmente ligada a Gaani, el mes lunar del nacimiento del Profeta (3.er mes del calendario musulmán). Es una fiesta de purificación y cohesión: bailarines y músicos desfilan por la ciudad, y el momento más espectacular es la danza de los cuchillos, en la que los participantes manejan hojas como demostración de valor. Ahora se celebra junto con Gadao, la fiesta de la cosecha de los tem, en una gran edición «Adossa-Gadao» que en los últimos años ha tenido lugar en enero y atrae a una multitud de todo el país y de la diáspora.",
      tips: "Las fechas las fijan cada año los organizadores en Sokodé (durante mucho tiempo siguieron el calendario musulmán): compruébelas antes de salir.",
      bestPeriod: "En los últimos años, en enero (fechas anunciadas cada año)",
    },
    "parc-national-fazao-malfakassa": {
      name: "Parque Nacional de Fazao-Malfakassa",
      summary: "El parque más extenso de Togo: colinas, bosques, sabanas y cascadas.",
      description:
        "Entre Sokodé y Bassar, el Parque Nacional de Fazao-Malfakassa es la mayor área protegida del país. Sus relieves, acantilados, bosques de galería y sabanas albergan una fauna discreta (antílopes, monos, numerosas aves). Las infraestructuras turísticas son limitadas: se viene más por el senderismo y la naturaleza que por un safari, con guía y organizándose con antelación.",
      tips: "Infórmese sobre las condiciones de acceso ante los gestores del parque y reserve un guía antes de ir; se necesita un vehículo adecuado.",
      bestPeriod: "De noviembre a marzo (estación seca)",
    },
    "evala-kara": {
      name: "Los Evala",
      summary: "Ritos iniciáticos kabyé marcados por combates de lucha tradicional.",
      description:
        "Los Evala marcan el paso a la edad adulta de los jóvenes kabyé. Durante varios días, los iniciados se enfrentan en combates de lucha tradicional, al son de los tambores y animados por sus pueblos, en Kara y en los cantones vecinos. Más allá del espectáculo, es un rito importante de la vida social kabyé.",
      tips: "El programa se fija localmente cada año: infórmese sobre los lugares y días de los combates. Permanezca en la zona reservada a los espectadores.",
      bestPeriod: "Julio",
    },
    "tchoukoutou-kara": {
      name: "Tchoukoutou y cocina del norte",
      summary: "Cerveza artesanal de mijo y platos de pasta y salsa, en los cabarets y maquis de Kara.",
      description:
        "En el norte de Togo, el tchoukoutou, cerveza de mijo (sorgo) elaborada por las mujeres, se comparte en los cabarets de barrio, a menudo servida en calabazas. Se acompaña de platos de pasta (de maíz, mijo o ñame) y de salsas de verduras, cacahuete u okra, que se pueden probar en los maquis (restaurantes populares) de Kara.",
    },
    "paysage-culturel-koutammakou": {
      name: "Paisaje cultural del Koutammakou",
      summary: "Un paisaje vivo donde las viviendas, los campos y los lugares sagrados reflejan la cultura batammariba.",
      description:
        "El Koutammakou no es un monumento sino un territorio habitado: casas-torre, campos, bosques y rocas sagrados y lugares de iniciación componen un paisaje modelado por los batammariba y su relación con la naturaleza. Se descubre con un guía local por las pistas que unen las aldeas, lo que permite comprender la organización social y espiritual de la región.",
      tips: "Recurra a un guía de la zona; algunos lugares sagrados no se visitan. Evite circular de noche y no se adentre hacia el norte, en la región de las Savanes.",
      bestPeriod: "De noviembre a febrero (estación seca, pistas transitables)",
    },
    "takienta-nadoba": {
      name: "Takienta de Nadoba",
      summary: "Visita de una casa-fortaleza batammariba, del patio de entrada a los graneros del piso superior.",
      description:
        "En torno al pueblo de Nadoba, principal punto de acogida de los visitantes, algunas familias abren su takienta. Construida en tierra, esta casa-fortaleza reúne en la planta baja el espacio de los animales y los altares y, en el piso superior, una terraza, los dormitorios y los graneros con torrecillas. El guía explica el simbolismo de cada parte y las técnicas de construcción, transmitidas de generación en generación.",
      tips: "La familia que lo recibe suele pedir una contribución; pida siempre permiso antes de hacer fotos.",
    },
    "cathedrale-sacre-coeur-lome": {
      name: "Catedral del Sagrado Corazón de Lomé",
      summary: "Iglesia neogótica de la época alemana, consagrada en 1902, a dos pasos del Gran Mercado.",
      description:
        "Construida en poco más de un año, de abril de 1901 a septiembre de 1902, bajo la administración colonial alemana, la catedral del Sagrado Corazón fue consagrada el 21 de septiembre de 1902. Con sus dos agujas y su fachada roja y blanca de estilo neogótico, domina el barrio del Gran Mercado y sigue siendo uno de los monumentos emblemáticos de la capital. Convertida en catedral de la archidiócesis de Lomé en 1955, acogió una misa del papa Juan Pablo II en agosto de 1985.",
      tips: "Vista con decoro; evite visitarla durante los oficios y pida permiso antes de fotografiar a los fieles.",
    },
    "plage-de-lome": {
      name: "Playa de Lomé",
      summary: "Larga franja de arena bordeada de cocoteros, lugar de paseo de los habitantes al final del día y los fines de semana.",
      description:
        "Lomé se extiende a lo largo de una playa de arena bordeada de cocoteros, desde la frontera con Ghana hasta el puerto. El paseo marítimo, frente al palacio de Lomé y al centro de la ciudad, es un lugar de paseo y descanso para los habitantes, sobre todo al final de la tarde, los fines de semana y en días de fiesta. Las olas y las corrientes son fuertes: se viene por el aire marino, el paseo y la puesta de sol más que para bañarse.",
      tips: "No se bañe (fuertes corrientes) y abandone la playa antes del anochecer, como recomiendan las autoridades francesas. Lleve pocos objetos de valor.",
      bestPeriod: "De noviembre a marzo (estación seca), al final de la tarde",
    },
    "chateau-viale": {
      name: "Castillo Viale",
      summary: "Castillo de piedra de los años cuarenta, encaramado en el bosque en las alturas de Kpalimé.",
      description:
        "En las alturas boscosas al noroeste de Kpalimé, en la carretera de Kouma, el castillo Viale fue construido entre 1940 y 1944 por el francés Raymond Viale, cautivado por el paisaje. Propiedad del Estado togolés, ha servido de residencia presidencial y ha acogido a invitados ilustres. Con sus muros de piedra y su torre redonda que emerge del bosque, es una curiosidad arquitectónica y un buen punto de partida para pasear por las colinas del Kloto.",
      tips: "El acceso al interior depende de los permisos del momento: infórmese en el lugar o a través de su guía.",
    },
    "cascade-de-kpime": {
      name: "Cascada de Kpimé",
      summary: "Alta cascada que cae en varios saltos por un acantilado boscoso, al norte de Kpalimé.",
      description:
        "A unos diez kilómetros al norte de Kpalimé, la cascada de Kpimé se precipita en varios saltos por un acantilado cubierto de bosque. El lugar está ligado a la presa hidroeléctrica de Kpimé, construida en 1962 para abastecer de electricidad a Kpalimé: el caudal varía mucho según la estación y el uso del agua. Una excursión que se combina bien con la cascada de Womé y los pueblos de las colinas.",
      tips: "El caudal es escaso en la estación seca. Las rocas al pie de la cascada resbalan: lleve calzado adecuado.",
      bestPeriod: "Durante la estación de lluvias y justo después",
    },
    "faille-d-aledjo": {
      name: "Falla de Alédjo",
      summary: "Espectacular paso de la carretera nacional 1 a través del acantilado, entre Sokodé y Kara.",
      description:
        "En la carretera nacional 1, en la prefectura de Assoli, la ruta hacia el norte atraviesa la escarpa de Alédjo por un estrecho corte en la roca: es la falla de Alédjo, uno de los paisajes de carretera más fotografiados del país. Sus paredes de arenisca cubiertas de vegetación y la vista sobre los valles circundantes la convierten en una parada apreciada a medio camino entre Sokodé y Kara, no lejos de Bafilo.",
      tips: "Estacione con seguridad fuera de la calzada: el tráfico de camiones es intenso en este eje. Evite circular por aquí de noche.",
    },
    "murailles-agbogbo-notse": {
      name: "Murallas de Agbogbo",
      summary: "Vestigios de las murallas de tierra del antiguo reino de Notsé, cuna de los ewe.",
      description:
        "Según la tradición, el rey Agokoli, cuyo reinado se sitúa en el siglo XVII o a principios del XVIII según las fuentes, hizo levantar alrededor de Notsé murallas de arcilla amasada, el Agbogbo. Su dureza habría empujado a parte de la población a huir: es este éxodo fundador lo que conmemora cada año la fiesta de Agbogbo-za. Solo quedan algunos fragmentos de las murallas, protegidos de la erosión por cobertizos, así como antiguos pavimentos sacados a la luz por las excavaciones arqueológicas.",
      tips: "Visítelas con un guía local o presentándose ante la jefatura tradicional; algunos lugares cercanos son sagrados.",
    },
    "cascade-d-akloa": {
      name: "Cascada de Akloa",
      summary: "Alta cascada en pleno bosque, a la que se llega por un sendero desde el pueblo de Akloa.",
      description:
        "Cerca de Badou, la cascada de Akloa (o Akrowa) cae desde una alta pared rocosa en un entorno de bosque denso. Se llega a pie por un sendero que sale del pueblo de Akloa y cruza arroyos y plantaciones: la caminata forma parte del placer. La poza y las rocas al pie de la cascada ofrecen una pausa refrescante.",
      tips: "Vaya con un guía del pueblo, buen calzado y agua; el sendero resbala después de la lluvia.",
      bestPeriod: "Durante y después de la estación de lluvias (mayor caudal)",
    },
    "sites-metallurgiques-bassar": {
      name: "Sitios de la metalurgia antigua del hierro de Bassar",
      summary: "Hornos, escorias y antiguas minas de un centro siderúrgico activo durante más de dos milenios.",
      description:
        "En torno a Bassar, sobre todo en Bandjéli, Nangbani, Bitchabé o Kabou, se conservan los vestigios de una metalurgia del hierro cuyas huellas más antiguas se remontan, según la UNESCO, al siglo V antes de nuestra era, y que se mantuvo hasta mediados del siglo XX: altos hornos de tierra, bases de hornos, montones de escoria, minas y forjas. Estos sitios figuran desde 2021 en la lista indicativa del Patrimonio Mundial. La visita, todavía poco organizada, se prepara con un guía local.",
      tips: "Infórmese en Bassar o ante la jefatura de Bandjéli. No recoja escorias ni fragmentos: forman parte del patrimonio arqueológico.",
      bestPeriod: "De noviembre a marzo (estación seca)",
    },
  },
  circuits: {
    "togo-sud-6-jours": {
      title: "El sur de Togo en 6 días",
      summary:
        "Lomé y sus mercados, la memoria de Agbodrafo, la travesía del lago Togo hasta Togoville, el casco antiguo de Aného y después las colinas, cascadas y plantaciones de Kpalimé.",
    },
    "togo-centre-nord-6-jours": {
      title: "El centro y el norte de Togo en 6 días",
      summary:
        "De Sokodé al Koutammakou: el parque de Fazao-Malfakassa, el país kabyé en torno a Kara y las takienta de los batammariba, declaradas Patrimonio de la UNESCO. Se recomienda viajar en coche con conductor-guía; la región de las Savanes, desaconsejada, no está incluida.",
    },
  },
  stepNotes: {
    "togo-sud-6-jours:0": "Llegada, instalación y primer contacto con la ciudad.",
    "togo-sud-6-jours:5": "Ruta hacia el este a lo largo de la costa (alrededor de 1 h).",
    "togo-sud-6-jours:9": "Mañana en Aného y después ruta hacia Kpalimé pasando por Lomé (medio día).",
    "togo-sud-6-jours:10": "Caminata matinal con un guía.",
    "togo-sud-6-jours:14": "Regreso a Lomé (unas 2 h 30 de carretera).",
    "togo-centre-nord-6-jours:0": "Largo trayecto desde Lomé por la nacional 1: salga temprano para llegar antes de que anochezca.",
    "togo-centre-nord-6-jours:1": "Jornada de naturaleza, organizada con antelación con un guía.",
    "togo-centre-nord-6-jours:2": "Ruta hacia Kara (alrededor de 1 h 30) y descubrimiento de la ciudad.",
    "togo-centre-nord-6-jours:4": "Jornada en el país batammariba con un guía local, regreso a Kara antes de que anochezca.",
    "togo-centre-nord-6-jours:6": "Largo trayecto de regreso hacia el sur, hasta las colinas de Kpalimé.",
    "togo-centre-nord-6-jours:8": "Regreso a Lomé (unas 2 h 30 de carretera).",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Estreita faixa de terra entre o Gana e o Benim, o Togo reúne a poucas horas de estrada a energia de Lomé e dos seus mercados, o lago Togo e a história de Togoville, as colinas arborizadas e as cascatas de Kpalimé e, mais a norte, as grandes festas tradicionais de Sokodé e de Kara e as casas-fortaleza do Koutammakou, classificadas como Património Mundial da UNESCO.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto, que se pede online (e-visa) no portal oficial do Governo togolês, alguns dias antes da partida. Os cidadãos da CEDEAO estão isentos. Pode também ser exigido um registo online à chegada e à partida. Confirme sempre as condições atualizadas junto das fontes oficiais antes de partir: passaporte válido vários meses após o regresso, bilhete de volta, morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "O certificado de vacinação contra a febre-amarela é exigido à entrada. O paludismo está presente em todo o país: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos (repelente, mosquiteiro). Verifique se as suas vacinas habituais, incluindo a do sarampo, estão em dia. Beba água engarrafada.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa com o euro (1 € = 655,957 francos CFA), a mesma do Benim, do Burkina Faso ou da Costa do Marfim. O dinheiro vivo continua a ser indispensável fora de Lomé; o pagamento por telemóvel (mobile money) está muito difundido. Os cartões bancários são aceites nos hotéis e no comércio mais importante da capital.",
      },
      {
        title: "Quando ir",
        body: "O sul tem duas estações das chuvas (aproximadamente de abril a julho e de setembro a outubro); o norte, apenas uma (aproximadamente de maio a outubro). A época mais agradável vai de novembro a março, a estação seca, com o harmatão (vento seco e poeirento) de dezembro a fevereiro. As cascatas da região de Kpalimé são mais impressionantes durante as chuvas e logo a seguir, quando, no entanto, as pistas podem tornar-se difíceis.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua oficial; o ewe (sobretudo no sul) e o kabiyé (no norte) são as principais línguas nacionais, a par de muitas outras. Cumprimentar antes de qualquer pedido é essencial. Nos lugares sagrados (conventos, florestas sagradas, mercados de feitiços) e durante as cerimónias, siga as indicações do seu guia e peça sempre autorização antes de fotografar uma pessoa.",
      },
      {
        title: "Deslocar-se",
        body: "Na cidade, os mototáxis (zemidjans) são muito usados, mas as autoridades francesas desaconselham-nos por causa dos acidentes: prefira táxis ou um carro com motorista. Entre cidades: táxis coletivos, autocarros e carros com motorista. A estrada nacional 1 liga Lomé ao norte do país: conte com um longo dia para chegar a Kara. Evite conduzir de noite e, na estação das chuvas, preveja um 4x4 para as pistas.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas de tipo europeu. Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao mobile money.",
      },
      {
        title: "Segurança",
        body: "O sul e o centro do país visitam-se com uma vigilância normal, mas o extremo norte é afetado pela ameaça terrorista vinda do Sahel. A França desaconselha formalmente a zona da tripla fronteira com o Burkina Faso, o Benim e o Gana, e desaconselha, salvo motivo imperioso, toda a região das Savanes, incluindo Dapaong; o Reino Unido também desaconselha as imediações da fronteira com o Burkina Faso e o resto dessa região. Por isso, este guia não propõe nenhum itinerário na região das Savanes. No resto do país, as precauções são as de qualquer grande cidade: em Lomé, evite andar a pé à noite, sobretudo na praia e na marginal depois do pôr do sol, e não circule de noite fora da capital. Os banhos de mar são perigosos em toda a costa (correntes fortes). Consulte antes e durante a viagem os «Conseils aux voyageurs» da France Diplomatie e a página «Foreign travel advice» do Governo britânico (FCDO), atualizados regularmente.",
      },
    ],
  },
  destinations: {
    lome: {
      summary: "Capital à beira do oceano: grande mercado, mercado de feitiços e património da independência.",
      description:
        "Capital e principal porto do país, Lomé estende-se ao longo do Atlântico, encostada à fronteira com o Gana. Vem-se pela animação do Grande Mercado e das suas comerciantes, pelo mercado de feitiços de Akodessewa, pelo monumento da Independência e pelo antigo palácio dos governadores transformado em centro de arte. É o ponto de chegada da maioria dos viajantes e uma base prática para partir à descoberta do lago Togo, de Aného e de Kpalimé.",
    },
    "lac-togo": {
      name: "Lago Togo e Togoville",
      summary: "Laguna tranquila, travessia de piroga e Togoville, berço histórico que deu nome ao país.",
      description:
        "A cerca de quarenta quilómetros a leste de Lomé, o lago Togo é uma grande laguna separada do oceano por um cordão de areia. Na margem sul, Agbodrafo (a antiga Porto Seguro) conserva uma casa ligada ao tráfico de escravos; em frente, chega-se de piroga a Togoville, onde em 1884 foi assinado o tratado de protetorado com a Alemanha e que deu o nome ao país. Uma excursão de um dia a partir de Lomé ou uma etapa repousante à beira da água.",
    },
    aneho: {
      summary: "Antiga capital colonial entre laguna e oceano, grande centro da cultura guin.",
      description:
        "Perto da fronteira com o Benim, Aného cresceu entre o oceano e a laguna, na foz do lago Togo. Antigo entreposto comercial e uma das primeiras capitais da colónia alemã antes de Lomé, conserva casas coloniais e afro-brasileiras um pouco gastas que lhe dão encanto. É também a terra dos guin (gen): todos os anos, a festa de Epe Ekpe reúne multidões na aldeia vizinha de Glidji.",
    },
    kpalime: {
      summary: "Colinas arborizadas, cascatas, plantações de café e cacau e um artesanato reputado.",
      description:
        "A cerca de 120 km a noroeste de Lomé, perto da fronteira com o Gana, Kpalimé é a cidade verde do Togo. Está rodeada de colinas cobertas de floresta, entre as quais o monte Agou, o ponto mais alto do país, de cascatas e de plantações de café e cacau. O seu ritmo calmo, o mercado e o centro de artesanato fazem dela uma base ideal para alguns dias de caminhadas.",
    },
    sokode: {
      summary: "Grande cidade do centro, famosa pela festa das facas (Adossa), e porta do parque de Fazao-Malfakassa.",
      description:
        "No centro do Togo, na estrada nacional 1, Sokodé é a principal cidade do povo tem (kotokoli), maioritariamente muçulmano. É sobretudo conhecida pela Adossa, ou festa das facas, uma das grandes festas tradicionais do país. É também uma etapa na estrada para norte e uma porta de acesso ao Parque Nacional de Fazao-Malfakassa.",
    },
    kara: {
      summary: "Capital do país kabiyé, famosa pelas lutas iniciáticas dos Evala.",
      description:
        "Grande cidade do norte, Kara é a capital da região com o mesmo nome e do país kabiyé, com as suas colinas cultivadas em socalcos. Cidade moderna e espaçosa, é sobretudo conhecida pelos Evala, ritos iniciáticos centrados na luta tradicional que atraem todos os verões multidões de espectadores. É a base natural para descobrir o Koutammakou.",
    },
    koutammakou: {
      name: "Koutammakou, a terra dos batammariba",
      summary: "Paisagem cultural classificada pela UNESCO, famosa pelas suas casas-fortaleza de terra, as takienta.",
      description:
        "A nordeste de Kara, ao longo da fronteira com o Benim, o Koutammakou é a terra dos batammariba. As suas casas-fortaleza de vários pisos com torreões, as takienta, dispersas numa paisagem de colinas e campos, formam uma paisagem cultural viva inscrita no Património Mundial da UNESCO desde 2004. Desde 2023, o bem inscrito estende-se também ao vizinho Benim, à terra das Tata Somba. Situa-se logo a sul da região das Savanes, desaconselhada: permaneça no Koutammakou e consulte os conselhos aos viajantes antes de partir.",
    },
    notse: {
      summary: "Berço histórico dos ewe, cidade das muralhas de Agbogbo e da grande festa de Agbogbo-za.",
      description:
        "A cerca de 90 km a norte de Lomé, sede da prefeitura de Haho, Notsé é considerada o berço tradicional dos ewe, cujos antepassados se dispersaram daqui para o sul do Togo e do Gana. Podem ver-se os últimos vestígios das muralhas de Agbogbo e um monumento dedicado ao «berço do povo ewe». No início de setembro, a festa de Agbogbo-za reúne ewe do Togo, do Gana, do Benim e da diáspora.",
    },
    badou: {
      summary: "Pequena cidade das colinas de Wawa, entre florestas, plantações de café e cacau e a cascata de Akloa.",
      description:
        "Sede da prefeitura de Wawa, perto da fronteira com o Gana, Badou está rodeada de colinas arborizadas onde se cultivam café e cacau. Vem-se sobretudo pela cascata de Akloa, uma das mais conhecidas do país, no fim de uma caminhada pela floresta. Uma etapa de natureza fora dos roteiros habituais, mais a norte do que Kpalimé, na mesma região dos Planaltos.",
    },
    bassar: {
      summary: "Cidade da terra bassar, no coração de uma região de metalurgia antiga do ferro inscrita na lista indicativa da UNESCO.",
      description:
        "A oeste de Kara, Bassar é a sede de uma prefeitura de colinas e savanas arborizadas. A sua região é um dos grandes centros antigos da metalurgia do ferro na África Ocidental: fornos, montes de escória e antigas minas pontuam os arredores, sobretudo em torno de Bandjéli. Terra de inhame, celebra também a festa das colheitas D'pontr, que marca o ano novo dos bassar e dos konkomba. Consulte os conselhos aos viajantes antes de partir: a região das Savanes, mais a norte, é desaconselhada.",
    },
  },
  places: {
    "grand-marche-lome": {
      name: "Grande Mercado de Lomé",
      summary: "O coração comercial da cidade, reino dos panos e das famosas «Nana Benz».",
      description:
        "No centro de Lomé, o Grande Mercado (ou mercado de Assigamé) e as ruas à sua volta formam o coração comercial da cidade: tecidos, produtos frescos, especiarias, utensílios, artesanato. Está associado às «Nana Benz», as comerciantes de panos wax que se tornaram famosas pelo seu sucesso a partir dos anos 1960 e 1970. Uma imersão viva na economia da capital.",
      tips: "Venha de manhã, mantenha os seus pertences por perto e peça autorização antes de fotografar. Regatear faz parte da troca.",
    },
    "marche-des-feticheurs-akodessewa": {
      name: "Mercado de feitiços de Akodessewa",
      summary: "Mercado dedicado aos objetos e ingredientes das práticas vodu e da medicina tradicional.",
      description:
        "No bairro de Akodessewa, a leste do centro, este mercado reúne bancas de ingredientes, estatuetas e objetos usados nas práticas vodu e na medicina tradicional. Vendedores e curandeiros explicam de bom grado a sua utilização. O espetáculo pode surpreender (sobretudo os animais secos), mas mostra o lugar do vodu no quotidiano da costa.",
      tips: "A visita faz-se geralmente com um guia do mercado; é pedida uma contribuição, muitas vezes com um suplemento para fotografias: combine-o antes.",
    },
    "monument-de-l-independance-lome": {
      name: "Monumento da Independência",
      summary: "Símbolo da independência do Togo, proclamada a 27 de abril de 1960.",
      description:
        "No centro da praça da Independência, este monumento comemora a independência do Togo, a 27 de abril de 1960. A sua alta silhueta esculpida é um dos emblemas da capital; a praça à sua volta acolhe as grandes celebrações nacionais. Uma paragem curta mas obrigatória em qualquer visita a Lomé.",
    },
    "palais-de-lome": {
      name: "Palácio de Lomé",
      summary: "O antigo palácio dos governadores, recuperado como centro de arte e cultura com um grande parque.",
      description:
        "Construído no início do século XX para os governadores do Togo alemão, depois ocupado pela administração francesa e pela presidência após a independência, o palácio esteve muito tempo ao abandono. Restaurado, reabriu em 2019 como centro de arte e cultura: exposições de arte contemporânea e de património, e um vasto parque arborizado de frente para o oceano, um refúgio de calma no coração da cidade.",
    },
    "musee-national-togo": {
      name: "Museu Nacional do Togo",
      summary: "Coleções de objetos tradicionais e de história, no Palácio dos Congressos.",
      description:
        "Instalado no Palácio dos Congressos, o Museu Nacional apresenta objetos vindos das diferentes regiões do país: adornos, instrumentos musicais, objetos rituais e do quotidiano, bem como peças ligadas à história do Togo. Uma introdução útil à diversidade das culturas togolesas antes de partir para o interior.",
    },
    "maison-des-esclaves-agbodrafo": {
      name: "Casa dos escravos de Agbodrafo",
      summary: "Casa do século XIX cuja cave servia para esconder cativos depois da abolição do tráfico.",
      description:
        "Em Agbodrafo, a «Casa dos escravos» (ou casa Wood) foi construída no século XIX por um negociante. Depois da proibição oficial do tráfico, terão sido amontoados cativos na sua cave, longe dos olhares, antes de serem embarcados clandestinamente. A visita guiada deste lugar de memória, com a descida à cave, é um momento marcante.",
    },
    "traversee-du-lac-togo": {
      name: "Travessia do lago Togo de piroga",
      summary: "Deslizar pela laguna entre pescadores e aldeias, de Agbodrafo a Togoville.",
      description:
        "A partir da margem de Agbodrafo, barqueiros propõem a travessia até Togoville. O percurso, à vela, à vara ou a motor, oferece uma bela vista da laguna, dos seus pescadores e das aldeias ribeirinhas. Alguns alojamentos à beira do lago propõem também saídas mais longas.",
      tips: "Negoceie o preço e a duração da ida e volta antes de embarcar e peça um colete salva-vidas.",
    },
    "sanctuaire-notre-dame-togoville": {
      name: "Santuário de Nossa Senhora de Togoville",
      summary: "Igreja e local de peregrinação mariana, visitado pelo papa João Paulo II em 1985.",
      description:
        "Togoville foi um dos primeiros centros missionários da região. A sua igreja de Nossa Senhora, com pinturas interiores coloridas, tornou-se um local de peregrinação mariana, reforçado pela visita do papa João Paulo II em 1985. Na pequena cidade, igrejas e santuários vodu coexistem, como acontece muitas vezes na costa.",
      tips: "Vista-se de forma adequada; não visite durante as celebrações.",
    },
    "monument-du-centenaire-togoville": {
      name: "Togoville, cidade do tratado de 1884",
      summary: "Monumento do centenário e memória do rei Mlapa III, signatário do tratado com a Alemanha.",
      description:
        "Em julho de 1884, o rei Mlapa III de Togoville assinou com o explorador alemão Gustav Nachtigal o tratado que fez da região um protetorado alemão: o nome da cidade, «Togo», passou depois para todo o país. Um monumento erguido no centenário do tratado, estátuas e a casa da família real recordam este episódio fundador, a descobrir com um guia local.",
    },
    "vieille-ville-aneho": {
      name: "Centro histórico de Aného",
      summary: "Passeio entre casas coloniais, igrejas antigas e margens da laguna.",
      description:
        "O centro de Aného descobre-se a pé: fachadas com varandas da época colonial, casas de famílias afro-brasileiras, igrejas antigas e vistas para a laguna e para a ponte que atravessa a sua foz. Um passeio tranquilo, idealmente com um guia local que conte o passado comercial da cidade.",
    },
    "epe-ekpe-glidji": {
      name: "Festa de Epe Ekpe em Glidji",
      summary: "Ano novo tradicional dos guin, marcado pela «tomada da pedra sagrada».",
      description:
        "Todos os anos, geralmente em setembro, os guin celebram em Glidji, muito perto de Aného, o seu ano novo tradicional, Epe Ekpe. O ponto alto é a «tomada da pedra sagrada» na floresta sagrada: a sua cor é interpretada como um presságio para o ano que começa. Cerimónias, desfiles e reencontros de famílias marcam os festejos.",
      tips: "As datas variam todos os anos: informe-se junto das autoridades locais ou do seu alojamento. Respeite as indicações, pois algumas cerimónias não estão abertas ao público.",
      bestPeriod: "Geralmente em setembro",
    },
    "mont-agou": {
      name: "Monte Agou",
      summary: "O ponto mais alto do Togo (986 m), coberto de florestas e aldeias ewe.",
      description:
        "Entre Kpalimé e Amoussoukopé, o monte Agou atinge 986 m, o ponto mais alto do país. As suas encostas arborizadas estão salpicadas de aldeias ewe e de culturas; os trilhos oferecem belas vistas sobre a planície. O cume alberga uma instalação militar: caminha-se pelas encostas até aos miradouros autorizados.",
      tips: "Parta cedo com um guia local, bom calçado e água. Durante o harmatão, a bruma limita a vista.",
    },
    "cascade-de-wome": {
      name: "Cascata de Womé",
      summary: "Queda de água na floresta, no fim de uma pista e de uma curta descida a pé.",
      description:
        "Nas colinas perto de Kpalimé, a cascata de Womé cai numa bacia rodeada de vegetação luxuriante. Chega-se por uma pista e depois por um trilho a descer pela floresta. Uma excursão refrescante, fácil de combinar com as aldeias e plantações dos arredores.",
      tips: "O trilho pode estar escorregadio: use calçado adequado. A aldeia que gere o local pede uma contribuição.",
      bestPeriod: "De julho a novembro (maior caudal)",
    },
    "centre-artisanal-kpalime": {
      name: "Centro de artesanato de Kpalimé",
      summary: "Oficinas de escultores, tecelões, oleiros e pintores, com venda direta.",
      description:
        "Kpalimé é conhecida pelo seu artesanato. No centro de artesanato pode ver-se escultores em madeira, tecelões de kente, oleiros, cesteiros e pintores a trabalhar, e comprar diretamente as suas criações. Uma boa ocasião para levar uma recordação feita no local.",
    },
    "cafe-cacao-kpalime": {
      name: "Café e cacau da região de Kpalimé",
      summary: "Visita a plantações e prova, na principal região cafeeira do país.",
      description:
        "As colinas à volta de Kpalimé são a principal região produtora de café e cacau do Togo. Caminhadas guiadas atravessam as plantações à sombra de grandes árvores e explicam o percurso da cereja de café ou do fruto do cacau até à chávena ou à tablete. Algumas cooperativas e pequenas chocolatarias locais propõem provas e venda.",
    },
    "adossa-sokode": {
      name: "Adossa, a festa das facas",
      summary: "Grande festa tem de danças e demonstrações de bravura, hoje associada à festa das colheitas Gadao.",
      description:
        "Grande festa dos tem de Sokodé, a Adossa está tradicionalmente ligada a Gaani, o mês lunar do nascimento do Profeta (3.º mês do calendário muçulmano). É uma festa de purificação e de coesão: bailarinos e músicos desfilam pela cidade, e o momento mais espetacular é a dança das facas, em que os participantes manejam lâminas em demonstração de coragem. É agora celebrada em conjunto com Gadao, a festa das colheitas dos tem, numa grande edição «Adossa-Gadao» que nos últimos anos se realizou em janeiro e atrai uma multidão de todo o país e da diáspora.",
      tips: "As datas são fixadas todos os anos pelos organizadores em Sokodé (durante muito tempo seguiram o calendário muçulmano): confirme-as antes de partir.",
      bestPeriod: "Nos últimos anos, em janeiro (datas anunciadas todos os anos)",
    },
    "parc-national-fazao-malfakassa": {
      name: "Parque Nacional de Fazao-Malfakassa",
      summary: "O maior parque do Togo: colinas, florestas, savanas e cascatas.",
      description:
        "Entre Sokodé e Bassar, o Parque Nacional de Fazao-Malfakassa é a maior área protegida do país. Os seus relevos, falésias, florestas-galeria e savanas abrigam uma fauna discreta (antílopes, macacos, numerosas aves). As infraestruturas turísticas são limitadas: vem-se mais pelas caminhadas e pela natureza do que por um safari, com guia e com organização prévia.",
      tips: "Informe-se sobre as condições de acesso junto dos gestores do parque e reserve um guia antes de ir; é necessário um veículo adequado.",
      bestPeriod: "De novembro a março (estação seca)",
    },
    "evala-kara": {
      name: "Os Evala",
      summary: "Ritos iniciáticos kabiyé marcados por combates de luta tradicional.",
      description:
        "Os Evala marcam a passagem à idade adulta dos jovens kabiyé. Durante vários dias, os iniciados enfrentam-se em combates de luta tradicional, ao som dos tambores e incentivados pelas suas aldeias, em Kara e nos cantões vizinhos. Para além do espetáculo, é um rito importante da vida social kabiyé.",
      tips: "O programa é fixado localmente todos os anos: informe-se sobre os locais e os dias dos combates. Fique na zona reservada aos espectadores.",
      bestPeriod: "Julho",
    },
    "tchoukoutou-kara": {
      name: "Tchoukoutou e cozinha do norte",
      summary: "Cerveja artesanal de milho-miúdo e pratos de massa e molho, nos cabarés e maquis de Kara.",
      description:
        "No norte do Togo, o tchoukoutou, cerveja de milho-miúdo (sorgo) fabricada pelas mulheres, partilha-se nos cabarés de bairro, muitas vezes servida em cabaças. Acompanha-se de pratos de massa (de milho, milho-miúdo ou inhame) e de molhos de legumes, de amendoim ou de quiabo, que se provam nos maquis (restaurantes populares) de Kara.",
    },
    "paysage-culturel-koutammakou": {
      name: "Paisagem cultural do Koutammakou",
      summary: "Uma paisagem viva onde as habitações, os campos e os lugares sagrados refletem a cultura batammariba.",
      description:
        "O Koutammakou não é um monumento, mas um território habitado: casas-torre, campos, florestas e rochedos sagrados e lugares de iniciação compõem uma paisagem moldada pelos batammariba e pela sua relação com a natureza. Descobre-se com um guia local, pelas pistas que ligam os povoados, o que permite compreender a organização social e espiritual da região.",
      tips: "Recorra a um guia da região; alguns lugares sagrados não se visitam. Evite circular de noite e não se aventure para norte, na região das Savanes.",
      bestPeriod: "De novembro a fevereiro (estação seca, pistas transitáveis)",
    },
    "takienta-nadoba": {
      name: "Takienta de Nadoba",
      summary: "Visita a uma casa-fortaleza batammariba, do pátio de entrada aos celeiros do andar superior.",
      description:
        "À volta da aldeia de Nadoba, principal ponto de acolhimento dos visitantes, algumas famílias abrem a sua takienta. Construída em terra, esta casa-fortaleza reúne no rés-do-chão o espaço dos animais e os altares e, no andar superior, um terraço, os quartos e os celeiros com torreões. O guia explica o simbolismo de cada parte e as técnicas de construção, transmitidas de geração em geração.",
      tips: "A família que o recebe costuma pedir uma contribuição; peça sempre autorização antes de fotografar.",
    },
    "cathedrale-sacre-coeur-lome": {
      name: "Catedral do Sagrado Coração de Lomé",
      summary: "Igreja neogótica da época alemã, consagrada em 1902, a dois passos do Grande Mercado.",
      description:
        "Construída em pouco mais de um ano, de abril de 1901 a setembro de 1902, sob a administração colonial alemã, a catedral do Sagrado Coração foi consagrada a 21 de setembro de 1902. Com as suas duas flechas e a fachada vermelha e branca de estilo neogótico, domina o bairro do Grande Mercado e continua a ser um dos monumentos emblemáticos da capital. Tornou-se catedral da arquidiocese de Lomé em 1955 e acolheu uma missa do papa João Paulo II em agosto de 1985.",
      tips: "Vista-se com decoro; evite visitar durante as celebrações e peça autorização antes de fotografar os fiéis.",
    },
    "plage-de-lome": {
      name: "Praia de Lomé",
      summary: "Longa faixa de areia ladeada de coqueiros, local de passeio dos habitantes ao fim do dia e aos fins de semana.",
      description:
        "Lomé estende-se ao longo de uma praia de areia ladeada de coqueiros, da fronteira com o Gana até ao porto. A marginal, em frente ao palácio de Lomé e ao centro da cidade, é um local de passeio e descontração para os habitantes, sobretudo ao fim da tarde, aos fins de semana e nos dias de festa. As ondas e as correntes são fortes: vem-se pelo ar do mar, pelo passeio e pelo pôr do sol, mais do que para tomar banho.",
      tips: "Não tome banho (correntes fortes) e saia da praia antes do anoitecer, como recomendam as autoridades francesas. Leve poucos objetos de valor.",
      bestPeriod: "De novembro a março (estação seca), ao fim da tarde",
    },
    "chateau-viale": {
      name: "Castelo Viale",
      summary: "Castelo de pedra dos anos 1940, empoleirado na floresta nas alturas de Kpalimé.",
      description:
        "Nas alturas arborizadas a noroeste de Kpalimé, na estrada de Kouma, o castelo Viale foi construído entre 1940 e 1944 pelo francês Raymond Viale, encantado com a paisagem. Propriedade do Estado togolês, serviu de residência presidencial e acolheu convidados ilustres. Com as suas paredes de pedra e a torre redonda a emergir da floresta, é uma curiosidade arquitetónica e um bom ponto de partida para passeios pelas colinas do Kloto.",
      tips: "O acesso ao interior depende das autorizações do momento: informe-se no local ou junto do seu guia.",
    },
    "cascade-de-kpime": {
      name: "Cascata de Kpimé",
      summary: "Alta queda de água em vários degraus numa falésia arborizada, a norte de Kpalimé.",
      description:
        "A cerca de dez quilómetros a norte de Kpalimé, a cascata de Kpimé desce em várias quedas uma falésia coberta de floresta. O local está ligado à barragem hidroelétrica de Kpimé, construída em 1962 para abastecer Kpalimé de eletricidade: o caudal varia muito consoante as estações e a utilização da água. Uma excursão a combinar com a cascata de Womé e as aldeias das colinas.",
      tips: "O caudal é fraco na estação seca. As rochas ao pé da queda são escorregadias: leve calçado adequado.",
      bestPeriod: "Durante e logo após a estação das chuvas",
    },
    "faille-d-aledjo": {
      name: "Falha de Alédjo",
      summary: "Espetacular passagem da estrada nacional 1 através da falésia, entre Sokodé e Kara.",
      description:
        "Na estrada nacional 1, na prefeitura de Assoli, a estrada para norte atravessa a escarpa de Alédjo por um estreito corte na rocha: é a falha de Alédjo, uma das paisagens rodoviárias mais fotografadas do país. As paredes de arenito cobertas de vegetação e a vista sobre os vales em redor fazem dela uma paragem apreciada a meio caminho entre Sokodé e Kara, não longe de Bafilo.",
      tips: "Estacione em segurança fora da faixa de rodagem: o tráfego de camiões é intenso neste eixo. Evite circular aqui de noite.",
    },
    "murailles-agbogbo-notse": {
      name: "Muralhas de Agbogbo",
      summary: "Vestígios das muralhas de terra do antigo reino de Notsé, berço dos ewe.",
      description:
        "Segundo a tradição, o rei Agokoli, cujo reinado é situado no século XVII ou no início do século XVIII consoante as fontes, mandou erguer à volta de Notsé muralhas de argila amassada, o Agbogbo. A sua dureza terá levado parte da população a fugir: é esse êxodo fundador que a festa de Agbogbo-za comemora todos os anos. Restam apenas alguns fragmentos das muralhas, protegidos da erosão por abrigos, bem como antigos pavimentos postos a descoberto pelas escavações arqueológicas.",
      tips: "Visite com um guia local ou apresentando-se à chefatura tradicional; alguns locais vizinhos são sagrados.",
    },
    "cascade-d-akloa": {
      name: "Cascata de Akloa",
      summary: "Alta cascata no coração da floresta, alcançada por um trilho a partir da aldeia de Akloa.",
      description:
        "Perto de Badou, a cascata de Akloa (ou Akrowa) cai de uma alta parede rochosa num cenário de floresta densa. Chega-se a pé por um trilho que parte da aldeia de Akloa e atravessa ribeiros e plantações: a caminhada faz parte do prazer. A lagoa e as rochas ao pé da queda oferecem uma pausa refrescante.",
      tips: "Vá com um guia da aldeia, bom calçado e água; o trilho é escorregadio depois da chuva.",
      bestPeriod: "Durante e depois da estação das chuvas (caudal mais forte)",
    },
    "sites-metallurgiques-bassar": {
      name: "Sítios da metalurgia antiga do ferro de Bassar",
      summary: "Fornos, escórias e antigas minas de um centro siderúrgico ativo durante mais de dois milénios.",
      description:
        "Em redor de Bassar, nomeadamente em Bandjéli, Nangbani, Bitchabé ou Kabou, subsistem os vestígios de uma metalurgia do ferro cujos vestígios mais antigos remontam, segundo a UNESCO, ao século V antes da nossa era, e que se manteve até meados do século XX: altos-fornos de terra, bases de fornos, montes de escória, minas e forjas. Estes sítios constam desde 2021 da lista indicativa do Património Mundial. A visita, ainda pouco organizada, prepara-se com um guia local.",
      tips: "Informe-se em Bassar ou junto da chefatura de Bandjéli. Não apanhe escórias nem fragmentos: fazem parte do património arqueológico.",
      bestPeriod: "De novembro a março (estação seca)",
    },
  },
  circuits: {
    "togo-sud-6-jours": {
      title: "O sul do Togo em 6 dias",
      summary:
        "Lomé e os seus mercados, a memória de Agbodrafo, a travessia do lago Togo até Togoville, o centro histórico de Aného e depois as colinas, cascatas e plantações de Kpalimé.",
    },
    "togo-centre-nord-6-jours": {
      title: "O centro e o norte do Togo em 6 dias",
      summary:
        "De Sokodé ao Koutammakou: o parque de Fazao-Malfakassa, o país kabiyé à volta de Kara e as takienta dos batammariba, classificadas pela UNESCO. Recomenda-se viajar de carro com motorista-guia; a região das Savanes, desaconselhada, não está incluída.",
    },
  },
  stepNotes: {
    "togo-sud-6-jours:0": "Chegada, instalação e primeiro contacto com a cidade.",
    "togo-sud-6-jours:5": "Estrada para leste ao longo da costa (cerca de 1 h).",
    "togo-sud-6-jours:9": "Manhã em Aného e depois estrada para Kpalimé passando por Lomé (meio dia).",
    "togo-sud-6-jours:10": "Caminhada matinal com um guia.",
    "togo-sud-6-jours:14": "Regresso a Lomé (cerca de 2 h 30 de estrada).",
    "togo-centre-nord-6-jours:0": "Longa viagem desde Lomé pela nacional 1: parta cedo para chegar antes do anoitecer.",
    "togo-centre-nord-6-jours:1": "Dia de natureza, organizado com antecedência com um guia.",
    "togo-centre-nord-6-jours:2": "Estrada para Kara (cerca de 1 h 30) e descoberta da cidade.",
    "togo-centre-nord-6-jours:4": "Dia na terra dos batammariba com um guia local, regresso a Kara antes do anoitecer.",
    "togo-centre-nord-6-jours:6": "Longa viagem de regresso para sul, até às colinas de Kpalimé.",
    "togo-centre-nord-6-jours:8": "Regresso a Lomé (cerca de 2 h 30 de estrada).",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "توغو شريط ضيّق من الأرض بين غانا وبنين، يجمع على بُعد ساعات قليلة بالسيارة حيوية لومي وأسواقها، وبحيرة توغو وتاريخ توغوفيل، والتلال المكسوّة بالغابات وشلالات كباليمي، ثم في الشمال المهرجانات التقليدية الكبرى في سوكوديه وكارا، والمنازل الحصينة في كوتاماكو المدرجة في قائمة التراث العالمي لليونسكو.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين إلى تأشيرة تُطلب إلكترونيًا (تأشيرة إلكترونية) عبر البوابة الرسمية للحكومة التوغولية قبل السفر ببضعة أيام. ويُعفى منها مواطنو الجماعة الاقتصادية لدول غرب أفريقيا (إكواس). وقد يُطلب أيضًا تسجيل إلكتروني عند الوصول والمغادرة. تحقّق دائمًا من الشروط المحدَّثة لدى المصادر الرسمية قبل السفر: جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان الإقامة.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمى الصفراء عند الدخول. الملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن علاج وقائي، واحمِ نفسك من البعوض (طارد للحشرات، ناموسية). تأكّد من أن تطعيماتك المعتادة، ومنها لقاح الحصبة، محدَّثة. اشرب المياه المعبأة.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي الفرنك الأفريقي (XOF)، وسعر صرفه ثابت مقابل اليورو (1 يورو = 655.957 فرنكًا أفريقيًا)، وهي العملة نفسها المتداولة في بنين وبوركينا فاسو وساحل العاج. يبقى النقد ضروريًا خارج لومي، والدفع عبر الهاتف المحمول (mobile money) واسع الانتشار. تُقبل البطاقات المصرفية في الفنادق والمتاجر الكبرى في العاصمة.",
      },
      {
        title: "متى تسافر",
        body: "يعرف الجنوب موسمين للأمطار (تقريبًا من أبريل إلى يوليو، ثم من سبتمبر إلى أكتوبر)، والشمال موسمًا واحدًا (تقريبًا من مايو إلى أكتوبر). أنسب فترة تمتد من نوفمبر إلى مارس، وهي موسم الجفاف، مع رياح الهرمتان (رياح جافة محمّلة بالغبار) من ديسمبر إلى فبراير. تكون شلالات منطقة كباليمي في أبهى حالاتها خلال موسم الأمطار وبعده مباشرة، حين قد تصبح الطرق الترابية صعبة.",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي اللغة الرسمية، والإيوي (في الجنوب خاصة) والكابيي (في الشمال) هما أهم اللغات الوطنية إلى جانب لغات أخرى كثيرة. التحية قبل أي طلب أمر أساسي. وفي الأماكن المقدسة (الأديرة، الغابات المقدسة، أسواق التمائم) وخلال الطقوس، اتبع تعليمات مرشدك واستأذن دائمًا قبل تصوير أي شخص.",
      },
      {
        title: "التنقل",
        body: "في المدن تُستخدم سيارات الأجرة النارية (الزيميدجان) على نطاق واسع، لكن السلطات الفرنسية تنصح بتجنّبها بسبب الحوادث: فضّل سيارات الأجرة أو سيارة مع سائق. وبين المدن: سيارات أجرة جماعية وحافلات وسيارات مع سائق. يربط الطريق الوطني رقم 1 لومي بشمال البلاد: احسب يومًا طويلًا للوصول إلى كارا. تجنّب القيادة ليلًا، وفي موسم الأمطار خطّط لسيارة رباعية الدفع للطرق الترابية.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار الكهربائي 220 فولت، والمقابس من الطراز الأوروبي. تتيح شريحة اتصال محلية (يُطلب إثبات الهوية) الوصول إلى الإنترنت عبر الهاتف المحمول وإلى خدمة mobile money.",
      },
      {
        title: "الأمن",
        body: "يمكن زيارة الجنوب والوسط بيقظة عادية، لكن أقصى الشمال متأثر بالتهديد الإرهابي القادم من منطقة الساحل. تنصح فرنسا بشدة بعدم التوجّه إلى منطقة الحدود الثلاثية مع بوركينا فاسو وبنين وغانا، وتنصح بعدم زيارة منطقة السافانا بأكملها، بما فيها دابونغ، إلا لضرورة قصوى؛ كما تنصح المملكة المتحدة بعدم الاقتراب من الحدود مع بوركينا فاسو وبعدم زيارة بقية تلك المنطقة. لذلك لا يقترح هذا الدليل أي مسار في منطقة السافانا. وفي سائر البلاد، الاحتياطات هي احتياطات أي مدينة كبيرة: في لومي، تجنّب المشي ليلًا، ولا سيما على الشاطئ والواجهة البحرية بعد غروب الشمس، ولا تقُد ليلًا خارج العاصمة. السباحة خطرة على طول الساحل (تيارات قوية). راجع قبل رحلتك وخلالها صفحة «Conseils aux voyageurs» على موقع France Diplomatie وصفحة «Foreign travel advice» للحكومة البريطانية (FCDO)، اللتين تُحدَّثان بانتظام.",
      },
    ],
  },
  destinations: {
    lome: {
      name: "لومي",
      region: "المنطقة البحرية",
      summary: "عاصمة على شاطئ المحيط: سوق كبير وسوق للتمائم وتراث الاستقلال.",
      description:
        "لومي عاصمة البلاد وميناؤها الرئيسي، تمتد على طول المحيط الأطلسي ملاصقة للحدود مع غانا. يقصدها الزوار لحيوية السوق الكبير وتاجراته، ولسوق التمائم في أكوديسيوا، ولنصب الاستقلال، وللقصر القديم للحكّام الذي تحوّل إلى مركز للفنون. وهي نقطة وصول معظم المسافرين وقاعدة عملية للانطلاق نحو بحيرة توغو وأنيهو وكباليمي.",
    },
    "lac-togo": {
      name: "بحيرة توغو وتوغوفيل",
      region: "المنطقة البحرية",
      summary: "بحيرة هادئة وعبور بقارب البيروغ وتوغوفيل، المهد التاريخي الذي منح البلاد اسمها.",
      description:
        "على بُعد نحو أربعين كيلومترًا شرق لومي، بحيرة توغو بحيرة ساحلية كبيرة يفصلها عن المحيط شريط رملي. على ضفتها الجنوبية تحتفظ أغبودرافو (بورتو سيغورو سابقًا) بمنزل مرتبط بتجارة الرقيق، وفي الجهة المقابلة يُوصل قارب البيروغ إلى توغوفيل، حيث وُقّعت عام 1884 معاهدة الحماية مع ألمانيا، ومنها أخذت البلاد اسمها. رحلة ليوم واحد من لومي، أو محطة للراحة على ضفاف الماء.",
    },
    aneho: {
      name: "أنيهو",
      region: "المنطقة البحرية",
      summary: "عاصمة استعمارية سابقة بين البحيرة والمحيط، ومركز بارز لثقافة شعب الغين.",
      description:
        "قرب الحدود مع بنين، نشأت أنيهو بين المحيط والبحيرة عند مصبّ بحيرة توغو. كانت مركزًا تجاريًا قديمًا وإحدى أولى عواصم المستعمرة الألمانية قبل لومي، وما زالت تحتفظ ببيوت استعمارية وأفرو-برازيلية باهتة بعض الشيء تصنع سحرها. وهي أيضًا أرض شعب الغين (الجين): في كل عام يجمع مهرجان إيبي إيكبي الحشود في قرية غليدجي المجاورة.",
    },
    kpalime: {
      name: "كباليمي",
      region: "منطقة الهضاب",
      summary: "تلال مكسوّة بالغابات وشلالات ومزارع بن وكاكاو وحرف يدوية ذائعة الصيت.",
      description:
        "على بُعد نحو 120 كيلومترًا شمال غرب لومي، قرب الحدود مع غانا، كباليمي هي المدينة الخضراء في توغو. تحيط بها تلال تكسوها الغابات، منها جبل أغو أعلى قمة في البلاد، وشلالات ومزارع بن وكاكاو. إيقاع الحياة الهادئ فيها وسوقها ومركزها الحرفي تجعلها قاعدة مثالية لبضعة أيام من المشي في الطبيعة.",
    },
    sokode: {
      name: "سوكوديه",
      region: "المنطقة الوسطى",
      summary: "مدينة كبيرة في الوسط، تشتهر بمهرجان السكاكين (أدوسا)، وبوابة إلى متنزه فازاو-مالفاكاسا.",
      description:
        "في وسط توغو، على الطريق الوطني رقم 1، سوكوديه هي المدينة الرئيسية لشعب التيم (الكوتوكولي) ذي الأغلبية المسلمة. تشتهر خصوصًا بمهرجان أدوسا أو مهرجان السكاكين، وهو من أكبر المهرجانات التقليدية في البلاد. وهي أيضًا محطة على الطريق نحو الشمال وبوابة إلى متنزه فازاو-مالفاكاسا الوطني.",
    },
    kara: {
      name: "كارا",
      region: "منطقة كارا",
      summary: "عاصمة بلاد الكابيي، تشتهر بمصارعات الإيفالا التلقينية.",
      description:
        "كارا مدينة كبيرة في الشمال، وهي عاصمة المنطقة التي تحمل اسمها وعاصمة بلاد الكابيي بتلالها المزروعة على شكل مدرّجات. مدينة حديثة وفسيحة، تشتهر خصوصًا بالإيفالا، وهي طقوس تلقينية تقوم على المصارعة التقليدية وتجذب كل صيف حشودًا من المتفرجين. وهي القاعدة الطبيعية لاكتشاف كوتاماكو.",
    },
    koutammakou: {
      name: "كوتاماكو، بلاد الباتاماريبا",
      region: "منطقة كارا",
      summary: "مشهد ثقافي مدرج في قائمة اليونسكو، يشتهر بمنازله الحصينة المبنية من الطين، التاكيينتا.",
      description:
        "شمال شرق كارا، على امتداد الحدود مع بنين، يقع كوتاماكو، بلاد شعب الباتاماريبا. منازلهم الحصينة ذات الطوابق والأبراج الصغيرة، التاكيينتا، المنتشرة وسط مشهد من التلال والحقول، تشكّل مشهدًا ثقافيًا حيًّا مدرجًا في قائمة التراث العالمي لليونسكو منذ عام 2004. ومنذ عام 2023 امتدّ الموقع المُدرج ليشمل أيضًا بنين المجاورة، بلاد تاتا سومبا. يقع مباشرة جنوب منطقة السافانا التي يُنصح بتجنّبها: ابقَ داخل كوتاماكو وراجع نصائح السفر قبل الانطلاق.",
    },
    notse: {
      name: "نوتسيه",
      summary: "المهد التاريخي لشعب الإيوي، مدينة أسوار أغبوغبو ومهرجان أغبوغبو-زا الكبير.",
      description:
        "على بُعد نحو 90 كم شمال لومي، وهي مركز محافظة هاهو، تُعدّ نوتسيه المهد التقليدي لشعب الإيوي الذي تفرّق أجداده منها نحو جنوب توغو وغانا. يمكن رؤية آخر بقايا أسوار أغبوغبو ونصب مكرّس لـ«مهد شعب الإيوي». وفي مطلع سبتمبر يجمع مهرجان أغبوغبو-زا أبناء الإيوي من توغو وغانا وبنين والمهجر.",
    },
    badou: {
      name: "بادو",
      summary: "بلدة صغيرة في تلال واوا، بين الغابات ومزارع البن والكاكاو وشلال أكلوا.",
      description:
        "بادو مركز محافظة واوا قرب الحدود الغانية، تحيط بها تلال مكسوّة بالغابات يُزرع فيها البن والكاكاو. يأتيها الزوار خصوصًا من أجل شلال أكلوا، أحد أشهر شلالات البلاد، في نهاية مسير عبر الغابة. محطة طبيعية بعيدة عن المسارات المعتادة، إلى الشمال من كباليمي في منطقة الهضاب نفسها.",
    },
    bassar: {
      name: "باسار",
      summary: "مدينة بلاد الباسار، في قلب منطقة لتعدين الحديد القديم مدرجة في القائمة التمهيدية لليونسكو.",
      description:
        "إلى الغرب من كارا، باسار مركز محافظة من التلال والسافانا المشجّرة. وتُعدّ منطقتها من أكبر المراكز القديمة لصناعة الحديد في غرب أفريقيا: أفران وأكوام من الخَبَث ومناجم قديمة تنتشر في الأرجاء، لا سيما حول باندجيلي. وهي أرض اليام، وتحتفل أيضًا بمهرجان الحصاد «دبونتر» الذي يمثّل رأس السنة لدى شعبي الباسار والكونكومبا. راجع نصائح السفر قبل الانطلاق: يُنصح بتجنّب منطقة السافانا الواقعة شمالًا.",
    },
  },
  places: {
    "grand-marche-lome": {
      name: "السوق الكبير في لومي",
      summary: "القلب التجاري للمدينة، مملكة الأقمشة وتاجرات «نانا بنز» الشهيرات.",
      description:
        "في وسط لومي، يشكّل السوق الكبير (أو سوق أسيغامي) والشوارع المحيطة به القلب التجاري للمدينة: أقمشة، منتجات طازجة، توابل، أدوات، حرف يدوية. ويرتبط اسمه بـ«نانا بنز»، تاجرات أقمشة الواكس اللواتي اشتهرن بنجاحهن منذ ستينيات القرن العشرين وسبعينياته. غوص حيّ في اقتصاد العاصمة.",
      tips: "تعال صباحًا، وأبقِ أغراضك قريبة منك، واستأذن قبل التصوير. المساومة جزء من التعامل.",
    },
    "marche-des-feticheurs-akodessewa": {
      name: "سوق التمائم في أكوديسيوا",
      summary: "سوق مخصّص للأدوات والمكوّنات المستخدمة في ممارسات الفودون والطب التقليدي.",
      description:
        "في حي أكوديسيوا شرق وسط المدينة، يضم هذا السوق أكشاكًا للمكوّنات والتماثيل الصغيرة والأدوات المستخدمة في ممارسات الفودون والطب التقليدي. ويشرح الباعة والمعالجون التقليديون استخداماتها عن طيب خاطر. قد يكون المشهد مفاجئًا (ولا سيما الحيوانات المجففة)، لكنه يوضّح مكانة الفودون في الحياة اليومية على الساحل.",
      tips: "تتم الزيارة عادة برفقة مرشد من السوق؛ ويُطلب مقابل مالي، وغالبًا مبلغ إضافي للتصوير: اتفق عليه مسبقًا.",
    },
    "monument-de-l-independance-lome": {
      name: "نصب الاستقلال",
      summary: "رمز استقلال توغو الذي أُعلن في 27 أبريل 1960.",
      description:
        "في وسط ساحة الاستقلال، يخلّد هذا النصب استقلال توغو في 27 أبريل 1960. قامته المنحوتة الشاهقة من رموز العاصمة، وتستضيف الساحة المحيطة به الاحتفالات الوطنية الكبرى. محطة قصيرة لكنها لا غنى عنها في أي زيارة إلى لومي.",
    },
    "palais-de-lome": {
      name: "قصر لومي",
      summary: "القصر القديم للحكّام، أعيد تأهيله مركزًا للفنون والثقافة مع حديقة واسعة.",
      description:
        "بُني القصر في مطلع القرن العشرين لحكّام توغو الألمانية، ثم شغلته الإدارة الفرنسية والرئاسة بعد الاستقلال، قبل أن يُترك مهجورًا طويلًا. وبعد ترميمه أعيد افتتاحه عام 2019 مركزًا للفنون والثقافة: معارض للفن المعاصر وللتراث، وحديقة واسعة مشجّرة مطلّة على المحيط، واحة هدوء في قلب المدينة.",
    },
    "musee-national-togo": {
      name: "المتحف الوطني في توغو",
      summary: "مجموعات من القطع التقليدية والتاريخية، في قصر المؤتمرات.",
      description:
        "يقع المتحف الوطني في قصر المؤتمرات، ويعرض قطعًا من مختلف مناطق البلاد: حُليّ، آلات موسيقية، أدوات طقسية ويومية، إضافة إلى قطع تتصل بتاريخ توغو. مدخل مفيد إلى تنوّع الثقافات التوغولية قبل الانطلاق نحو الداخل.",
    },
    "maison-des-esclaves-agbodrafo": {
      name: "بيت العبيد في أغبودرافو",
      summary: "منزل من القرن التاسع عشر استُخدم قبوه لإخفاء الأسرى بعد إلغاء تجارة الرقيق.",
      description:
        "في أغبودرافو، شيّد أحد التجار «بيت العبيد» (أو بيت وود) في القرن التاسع عشر. وبعد الحظر الرسمي لتجارة الرقيق، يُروى أن الأسرى كانوا يُكدَّسون في قبوه بعيدًا عن الأنظار قبل شحنهم سرًّا. الزيارة المصحوبة بمرشد لهذا المكان من أمكنة الذاكرة، مع النزول إلى القبو، لحظة مؤثرة.",
    },
    "traversee-du-lac-togo": {
      name: "عبور بحيرة توغو بقارب البيروغ",
      summary: "انسياب على البحيرة بين الصيادين والقرى، من أغبودرافو إلى توغوفيل.",
      description:
        "من ضفة أغبودرافو، يعرض أصحاب قوارب البيروغ العبور إلى توغوفيل. الرحلة، بالشراع أو بالعصا أو بالمحرك، تتيح مشهدًا جميلًا للبحيرة وصياديها والقرى الواقعة على ضفافها. وتقترح بعض أماكن الإقامة على ضفاف البحيرة جولات أطول.",
      tips: "اتفق على السعر ومدة الذهاب والإياب قبل الصعود، واطلب سترة نجاة.",
    },
    "sanctuaire-notre-dame-togoville": {
      name: "مزار سيدة توغوفيل",
      summary: "كنيسة ومقصد للحج المريمي، زارها البابا يوحنا بولس الثاني عام 1985.",
      description:
        "كانت توغوفيل من أوائل مراكز الإرساليات في المنطقة. وقد أصبحت كنيستها المكرّسة للسيدة العذراء، بلوحاتها الداخلية الملوّنة، مقصدًا للحج المريمي، وتعزّزت مكانتها بزيارة البابا يوحنا بولس الثاني عام 1985. وفي هذه البلدة الصغيرة تتجاور الكنائس ومزارات الفودون، كما هو الحال غالبًا على الساحل.",
      tips: "ارتدِ ملابس محتشمة، ولا تزر الكنيسة أثناء القداديس.",
    },
    "monument-du-centenaire-togoville": {
      name: "توغوفيل، مدينة معاهدة 1884",
      summary: "نصب المئوية وذكرى الملك ملابا الثالث، الموقّع على المعاهدة مع ألمانيا.",
      description:
        "في يوليو 1884، وقّع الملك ملابا الثالث ملك توغوفيل مع المستكشف الألماني غوستاف ناختيغال المعاهدة التي جعلت المنطقة محمية ألمانية، ثم انتقل اسم المدينة، «توغو»، إلى البلاد كلها. ويستحضر هذه الحلقة التأسيسية نصبٌ أقيم في الذكرى المئوية للمعاهدة وتماثيل وبيت الأسرة الملكية، ويُفضَّل اكتشافها مع مرشد محلي.",
    },
    "vieille-ville-aneho": {
      name: "المدينة القديمة في أنيهو",
      summary: "نزهة بين البيوت الاستعمارية والكنائس القديمة وضفاف البحيرة.",
      description:
        "يُكتشف وسط أنيهو سيرًا على الأقدام: واجهات ذات شرفات من الحقبة الاستعمارية، ومنازل لعائلات أفرو-برازيلية، وكنائس قديمة، ومناظر على البحيرة والجسر الممتد فوق مصبّها. نزهة هادئة، والأفضل أن تكون مع مرشد محلي يروي الماضي التجاري للمدينة.",
    },
    "epe-ekpe-glidji": {
      name: "مهرجان إيبي إيكبي في غليدجي",
      summary: "رأس السنة التقليدية لشعب الغين، ومن أبرز طقوسه «أخذ الحجر المقدّس».",
      description:
        "في كل عام، وغالبًا في سبتمبر، يحتفل شعب الغين في غليدجي، قرب أنيهو، برأس سنتهم التقليدية، إيبي إيكبي. وذروة الاحتفال «أخذ الحجر المقدّس» في الغابة المقدسة، إذ يُفسَّر لونه على أنه فأل للعام المقبل. وتتخلل الاحتفالات طقوس ومواكب ولقاءات عائلية.",
      tips: "تتغيّر المواعيد كل عام: استعلم لدى السلطات المحلية أو مكان إقامتك. واحترم التعليمات، إذ إن بعض الطقوس غير مفتوحة للجمهور.",
      bestPeriod: "غالبًا في سبتمبر",
    },
    "mont-agou": {
      name: "جبل أغو",
      summary: "أعلى قمة في توغو (986 مترًا)، تكسوه الغابات وقرى الإيوي.",
      description:
        "بين كباليمي وأموسوكوبي، يرتفع جبل أغو إلى 986 مترًا، وهو أعلى نقطة في البلاد. تنتشر على منحدراته المشجّرة قرى الإيوي والحقول، وتتيح الممرات مناظر جميلة على السهل. وفي القمة منشأة عسكرية: يُمارس المشي على المنحدرات حتى نقاط المشاهدة المسموح بها.",
      tips: "انطلق باكرًا مع مرشد محلي وحذاء مناسب وماء. وفي موسم الهرمتان يحدّ الضباب من الرؤية.",
    },
    "cascade-de-wome": {
      name: "شلال ووميه",
      summary: "شلال وسط الغابة، في نهاية طريق ترابي ونزول قصير سيرًا على الأقدام.",
      description:
        "في التلال القريبة من كباليمي، ينحدر شلال ووميه في حوض تحيط به نباتات كثيفة. يُوصل إليه عبر طريق ترابي ثم ممر منحدر وسط الغابة. نزهة منعشة يسهل الجمع بينها وبين القرى والمزارع المجاورة.",
      tips: "قد يكون الممر زلقًا: ارتدِ حذاءً مناسبًا. وتطلب القرية التي تدير الموقع مساهمة مالية.",
      bestPeriod: "من يوليو إلى نوفمبر (تدفّق أقوى)",
    },
    "centre-artisanal-kpalime": {
      name: "مركز الحرف اليدوية في كباليمي",
      summary: "ورش للنحاتين والنسّاجين والخزّافين والرسامين، مع بيع مباشر.",
      description:
        "تشتهر كباليمي بحرفها اليدوية. في مركز الحرف يمكن مشاهدة نحّاتي الخشب ونسّاجي الكنتي والخزّافين وصانعي السلال والرسامين أثناء عملهم، وشراء أعمالهم مباشرة. فرصة جيدة لاقتناء تذكار مصنوع محليًا.",
    },
    "cafe-cacao-kpalime": {
      name: "بن وكاكاو منطقة كباليمي",
      summary: "زيارة المزارع والتذوّق في المنطقة الرئيسية لزراعة البن في البلاد.",
      description:
        "التلال المحيطة بكباليمي هي المنطقة الرئيسية لإنتاج البن والكاكاو في توغو. تعبر جولات المشي المصحوبة بمرشد المزارع في ظل الأشجار الكبيرة، وتشرح مسار حبة البن أو ثمرة الكاكاو حتى الفنجان أو لوح الشوكولاتة. وتقترح بعض التعاونيات ومصانع الشوكولاتة المحلية الصغيرة التذوّق والبيع.",
    },
    "adossa-sokode": {
      name: "أدوسا، مهرجان السكاكين",
      summary: "مهرجان كبير لشعب التيم برقصات وعروض للشجاعة، يقترن اليوم بمهرجان الحصاد غاداو.",
      description:
        "أدوسا هو المهرجان الكبير لشعب التيم في سوكوديه، ويرتبط تقليديًا بشهر «غاني»، الشهر القمري لمولد النبي (الشهر الثالث من التقويم الهجري). وهو مهرجان للتطهّر والتلاحم: يجوب الراقصون والموسيقيون المدينة، وأكثر اللحظات إثارة رقصة السكاكين، حيث يتعامل المشاركون مع النصال استعراضًا لشجاعتهم. ويُحتفل به الآن مع غاداو، مهرجان الحصاد لدى التيم، في دورة كبرى باسم «أدوسا-غاداو» أُقيمت في السنوات الأخيرة في يناير، وتجتذب حشودًا من أنحاء البلاد ومن المهجر.",
      tips: "يحدّد المنظّمون في سوكوديه المواعيد كل عام (وقد ظلّت طويلًا تتبع التقويم الهجري): تحقّق منها قبل السفر.",
      bestPeriod: "في السنوات الأخيرة في يناير (تُعلن المواعيد كل عام)",
    },
    "parc-national-fazao-malfakassa": {
      name: "متنزه فازاو-مالفاكاسا الوطني",
      summary: "أكبر متنزه في توغو: تلال وغابات وسافانا وشلالات.",
      description:
        "بين سوكوديه وباسار، متنزه فازاو-مالفاكاسا الوطني هو أكبر منطقة محمية في البلاد. تؤوي تضاريسه وجروفه وغاباته النهرية وسافاناه حياة برية متوارية (ظباء، قرود، طيور كثيرة). البنية السياحية محدودة: يُقصد المتنزه للمشي والطبيعة أكثر منه للسفاري، برفقة مرشد وبعد تنظيم مسبق.",
      tips: "استعلم عن شروط الدخول لدى إدارة المتنزه واحجز مرشدًا قبل التوجّه إليه؛ ولا بد من مركبة مناسبة.",
      bestPeriod: "من نوفمبر إلى مارس (موسم الجفاف)",
    },
    "evala-kara": {
      name: "الإيفالا",
      summary: "طقوس تلقينية لشعب الكابيي تتخللها مباريات في المصارعة التقليدية.",
      description:
        "تمثّل الإيفالا انتقال شبان الكابيي إلى سن الرشد. على مدى عدة أيام، يتواجه المتلقّنون في مباريات مصارعة تقليدية على إيقاع الطبول وتشجيع قراهم، في كارا والكانتونات المجاورة. وأبعد من كونها مشهدًا، فهي طقس مهم في الحياة الاجتماعية لشعب الكابيي.",
      tips: "يُحدَّد البرنامج محليًا كل عام: استعلم عن أماكن المباريات وأيامها. والتزم بالمكان المخصص للمتفرجين.",
      bestPeriod: "يوليو",
    },
    "tchoukoutou-kara": {
      name: "التشوكوتو ومطبخ الشمال",
      summary: "جعة الدخن التقليدية وأطباق العصيدة والصلصات، في حانات كارا ومطاعمها الشعبية.",
      description:
        "في شمال توغو، يُتقاسم التشوكوتو، وهو جعة من الدخن (الذرة الرفيعة) تصنعها النساء، في حانات الأحياء، وغالبًا ما يُقدَّم في أوعية من القرع. ويُرافقه طبق «الباط»، وهو عصيدة كثيفة من الذرة أو الدخن أو اليام، مع صلصات من الخضار أو الفول السوداني أو البامية، يمكن تذوّقها في المطاعم الشعبية (الماكي) في كارا.",
    },
    "paysage-culturel-koutammakou": {
      name: "المشهد الثقافي لكوتاماكو",
      summary: "مشهد حيّ تعكس فيه المساكن والحقول والأماكن المقدسة ثقافة الباتاماريبا.",
      description:
        "ليس كوتاماكو نصبًا بل أرضًا مأهولة: منازل برجية، وحقول، وغابات وصخور مقدسة، وأماكن للتلقين، تؤلّف مشهدًا صاغه الباتاماريبا وعلاقتهم بالطبيعة. يُكتشف برفقة مرشد محلي عبر الطرق الترابية التي تربط القرى الصغيرة، ما يتيح فهم التنظيم الاجتماعي والروحي للمنطقة.",
      tips: "استعن بمرشد من المنطقة؛ فبعض الأماكن المقدسة لا تُزار. تجنّب القيادة ليلًا ولا تتوغّل شمالًا نحو منطقة السافانا.",
      bestPeriod: "من نوفمبر إلى فبراير (موسم الجفاف، طرق ترابية سالكة)",
    },
    "takienta-nadoba": {
      name: "تاكيينتا نادوبا",
      summary: "زيارة منزل حصين للباتاماريبا، من فناء المدخل إلى مخازن الحبوب في الطابق العلوي.",
      description:
        "حول قرية نادوبا، نقطة الاستقبال الرئيسية للزوار، تفتح بعض العائلات أبواب تاكيينتا خاصتها. هذا المنزل الحصين المبني من الطين يضم في الطابق الأرضي مكان الحيوانات والمذابح، وفي الطابق العلوي سطحًا وغرف النوم ومخازن الحبوب ذات الأبراج الصغيرة. ويشرح المرشد رمزية كل جزء ومهارات البناء المتوارثة جيلًا بعد جيل.",
      tips: "تطلب العائلة المضيفة عادة مساهمة مالية؛ واستأذن دائمًا قبل التصوير.",
    },
    "cathedrale-sacre-coeur-lome": {
      name: "كاتدرائية القلب الأقدس في لومي",
      summary: "كنيسة على الطراز القوطي الجديد من الحقبة الألمانية، كُرّست عام 1902، على مقربة من السوق الكبير.",
      description:
        "شُيّدت كاتدرائية القلب الأقدس في ما يزيد قليلًا على عام، من أبريل 1901 إلى سبتمبر 1902، في عهد الإدارة الاستعمارية الألمانية، وكُرّست في 21 سبتمبر 1902. ببرجيها المدبّبين وواجهتها الحمراء والبيضاء على الطراز القوطي الجديد، تهيمن على حيّ السوق الكبير وتبقى من المعالم الرمزية للعاصمة. أصبحت كاتدرائية أبرشية لومي عام 1955، واستضافت قدّاسًا ترأّسه البابا يوحنا بولس الثاني في أغسطس 1985.",
      tips: "ارتدِ لباسًا محتشمًا، وتجنّب الزيارة أثناء الصلوات، واستأذن قبل تصوير المصلّين.",
    },
    "plage-de-lome": {
      name: "شاطئ لومي",
      summary: "شريط رملي طويل تحفّه أشجار جوز الهند، يتنزّه فيه السكان آخر النهار وفي عطلات نهاية الأسبوع.",
      description:
        "تمتدّ لومي على طول شاطئ رملي تحفّه أشجار جوز الهند، من الحدود الغانية حتى الميناء. الواجهة البحرية، قبالة قصر لومي ووسط المدينة، مكان للتنزّه والاسترخاء لدى السكان، ولا سيما في آخر العصر وفي عطلات نهاية الأسبوع والأعياد. الأمواج والتيارات قوية: يأتي الناس للنسيم البحري والتنزّه ومشاهدة الغروب لا للسباحة.",
      tips: "لا تسبح (تيارات قوية)، وغادر الشاطئ قبل حلول الظلام كما توصي السلطات الفرنسية. احمل معك أقل قدر من الأغراض الثمينة.",
      bestPeriod: "من نوفمبر إلى مارس (موسم الجفاف)، في آخر العصر",
    },
    "chateau-viale": {
      name: "قصر فيال",
      summary: "قصر حجري من أربعينيات القرن العشرين، يعلو الغابة على مرتفعات كباليمي.",
      description:
        "على المرتفعات المكسوّة بالغابات شمال غرب كباليمي، على طريق كوما، شيّد الفرنسي رايمون فيال هذا القصر بين عامَي 1940 و1944 بعدما أسره جمال المكان. وهو ملك للدولة التوغولية، وقد استُخدم مقرًّا رئاسيًا واستقبل ضيوفًا بارزين. بجدرانه الحجرية وبرجه المستدير الذي يبرز من بين الأشجار، يُعدّ طرفة معمارية ونقطة انطلاق جيدة للتنزّه في تلال كلوتو.",
      tips: "يتوقّف دخول المبنى على الأذونات المعمول بها: استفسر في المكان أو عبر مرشدك.",
    },
    "cascade-de-kpime": {
      name: "شلال كبيميه",
      summary: "شلال عالٍ ينحدر على عدّة درجات فوق جرف مكسوّ بالغابات، شمال كباليمي.",
      description:
        "على بُعد نحو عشرة كيلومترات شمال كباليمي، ينحدر شلال كبيميه على عدّة مساقط فوق جرف تغطّيه الغابة. ويرتبط الموقع بسدّ كبيميه الكهرومائي الذي بُني عام 1962 لتزويد كباليمي بالكهرباء، لذلك يتفاوت تدفّق المياه كثيرًا بحسب الفصول واستخدام المياه. رحلة يسهل الجمع بينها وبين شلال وومي وقرى التلال.",
      tips: "يضعف تدفّق المياه في موسم الجفاف. الصخور عند أسفل الشلال زلقة: انتعل حذاءً مناسبًا.",
      bestPeriod: "خلال موسم الأمطار وبعده مباشرة",
    },
    "faille-d-aledjo": {
      name: "صدع أليدجو",
      summary: "ممرّ مذهل للطريق الوطني 1 عبر الجرف، بين سوكوديه وكارا.",
      description:
        "على الطريق الوطني 1، في محافظة أسولي، يعبر طريق الشمال جرف أليدجو من خلال شقّ ضيّق في الصخر: إنه صدع أليدجو، من أكثر المناظر على الطرق تصويرًا في البلاد. جدرانه من الحجر الرملي المكسوّة بالنباتات والإطلالة على الأودية المحيطة تجعله محطة محبّبة في منتصف الطريق بين سوكوديه وكارا، غير بعيد عن بافيلو.",
      tips: "توقّف بأمان خارج الطريق، فحركة الشاحنات كثيفة على هذا المحور. تجنّب القيادة هنا ليلًا.",
    },
    "murailles-agbogbo-notse": {
      name: "أسوار أغبوغبو",
      summary: "بقايا الأسوار الطينية لمملكة نوتسيه القديمة، مهد شعب الإيوي.",
      description:
        "تروي التقاليد أن الملك أغوكولي، الذي يُحدَّد حكمه في القرن السابع عشر أو مطلع الثامن عشر بحسب المصادر، أمر ببناء أسوار من الطين المعجون حول نوتسيه تُعرف بـ«أغبوغبو». ويُقال إن قسوته دفعت جزءًا من السكان إلى الفرار، وهذه الهجرة المؤسِّسة هي ما يحييه مهرجان أغبوغبو-زا كل عام. لم يبقَ من الأسوار سوى أجزاء قليلة محميّة من التعرية بمظلّات، إضافة إلى أرضيات قديمة كشفت عنها الحفريات الأثرية.",
      tips: "قم بالزيارة مع مرشد محلي أو بعد التعريف بنفسك لدى الزعامة التقليدية؛ بعض الأماكن المجاورة مقدّسة.",
    },
    "cascade-d-akloa": {
      name: "شلال أكلوا",
      summary: "شلال عالٍ في قلب الغابة، يُبلغ عبر درب ينطلق من قرية أكلوا.",
      description:
        "قرب بادو، ينهمر شلال أكلوا (أو أكروا) من جدار صخري عالٍ وسط غابة كثيفة. يُبلغ سيرًا على درب ينطلق من قرية أكلوا ويعبر جداول ومزارع، والمسير جزء من المتعة. وتوفّر البركة والصخور عند أسفل الشلال استراحة منعشة.",
      tips: "اذهب برفقة مرشد من القرية، مع حذاء جيد وماء؛ الدرب زلق بعد المطر.",
      bestPeriod: "خلال موسم الأمطار وبعده (تدفّق أقوى)",
    },
    "sites-metallurgiques-bassar": {
      name: "مواقع تعدين الحديد القديم في باسار",
      summary: "أفران وخَبَث ومناجم قديمة لمركز لصناعة الحديد ظلّ نشطًا أكثر من ألفي عام.",
      description:
        "حول باسار، ولا سيما في باندجيلي ونانغباني وبيتشابيه وكابو، لا تزال قائمة بقايا صناعة للحديد تعود أقدم آثارها، بحسب اليونسكو، إلى القرن الخامس قبل الميلاد، واستمرّت حتى منتصف القرن العشرين: أفران صهر طينية عالية، وقواعد أفران، وأكوام من الخَبَث، ومناجم وورش حدادة. وقد أُدرجت هذه المواقع منذ عام 2021 في القائمة التمهيدية للتراث العالمي. الزيارة ما زالت قليلة التنظيم، وتُحضَّر مع مرشد محلي.",
      tips: "استفسر في باسار أو لدى زعامة باندجيلي. لا تلتقط الخَبَث أو القطع، فهي جزء من التراث الأثري.",
      bestPeriod: "من نوفمبر إلى مارس (موسم الجفاف)",
    },
  },
  circuits: {
    "togo-sud-6-jours": {
      title: "جنوب توغو في 6 أيام",
      summary:
        "لومي وأسواقها، وذاكرة أغبودرافو، وعبور بحيرة توغو نحو توغوفيل، والمدينة القديمة في أنيهو، ثم تلال كباليمي وشلالاتها ومزارعها.",
    },
    "togo-centre-nord-6-jours": {
      title: "وسط توغو وشمالها في 6 أيام",
      summary:
        "من سوكوديه إلى كوتاماكو: متنزه فازاو-مالفاكاسا، وبلاد الكابيي حول كارا، ومنازل التاكيينتا للباتاماريبا المدرجة في قائمة اليونسكو. يُنصح بالسفر بسيارة مع سائق مرشد؛ ومنطقة السافانا، التي يُنصح بتجنّبها، غير مشمولة.",
    },
  },
  stepNotes: {
    "togo-sud-6-jours:0": "الوصول والاستقرار وأول تعرّف إلى المدينة.",
    "togo-sud-6-jours:5": "الطريق نحو الشرق على طول الساحل (نحو ساعة).",
    "togo-sud-6-jours:9": "صباح في أنيهو، ثم الطريق نحو كباليمي مرورًا بلومي (نصف يوم).",
    "togo-sud-6-jours:10": "مشي صباحي مع مرشد.",
    "togo-sud-6-jours:14": "العودة إلى لومي (نحو ساعتين ونصف بالسيارة).",
    "togo-centre-nord-6-jours:0": "طريق طويل من لومي عبر الطريق الوطني رقم 1: انطلق باكرًا للوصول قبل حلول الليل.",
    "togo-centre-nord-6-jours:1": "يوم في الطبيعة، يُنظَّم مسبقًا مع مرشد.",
    "togo-centre-nord-6-jours:2": "الطريق نحو كارا (نحو ساعة ونصف) واكتشاف المدينة.",
    "togo-centre-nord-6-jours:4": "يوم في بلاد الباتاماريبا مع مرشد محلي، والعودة إلى كارا قبل حلول الليل.",
    "togo-centre-nord-6-jours:6": "طريق طويل للعودة نحو الجنوب حتى تلال كباليمي.",
    "togo-centre-nord-6-jours:8": "العودة إلى لومي (نحو ساعتين ونصف بالسيارة).",
  },
};

export const TOGO_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
