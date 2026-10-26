/**
 * Traductions du contenu de départ du guide Côte d'Ivoire (voir ./cote-ivoire.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de cote-ivoire.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "De las torres del Plateau de Abiyán a las casas coloniales de Grand-Bassam, de las playas bordeadas de cocoteros de Assinie a la monumental basílica de Yamusukro y las montañas de Man, Costa de Marfil combina energía urbana, patrimonio, bosques y una escena musical y gastronómica que brilla en toda África Occidental.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros que no son ciudadanos de la CEDEAO necesitan un visado; existe un procedimiento en línea en el portal oficial de las autoridades marfileñas. Las condiciones cambian con frecuencia: compruebe siempre los requisitos actualizados en las fuentes oficiales (embajada, sitio web del Gobierno) antes de salir: pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos (repelente, mosquitera). Beba agua embotellada. Pueden aplicarse controles sanitarios reforzados en las fronteras según la situación epidémica regional: infórmese antes de salir.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA). El efectivo sigue siendo imprescindible fuera de Abiyán; el pago por móvil (mobile money) está en todas partes, incluso en los pequeños comercios. Las tarjetas bancarias se aceptan en hoteles, supermercados y restaurantes importantes de Abiyán, donde abundan los cajeros automáticos.",
      },
      {
        title: "Cuándo ir",
        body: "El sur tiene una estación de lluvias larga (aproximadamente de abril a julio) y una corta (aproximadamente de octubre a noviembre); el centro y el norte tienen un clima más contrastado, con una sola estación de lluvias. La época más agradable va de diciembre a marzo, la estación seca, con el harmattan (viento seco y polvoriento) sobre todo en el centro y el norte. En la costa hace calor y humedad todo el año.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua oficial; el diula sirve de lengua franca, y el baulé, el bété, el senufo, el dan (yacuba) y decenas de otras lenguas se hablan a diario. En Abiyán oirá el nouchi, la jerga urbana. Saludar antes de pedir cualquier cosa es fundamental. En los lugares sagrados y en las fiestas tradicionales, siga las indicaciones de sus anfitriones y pida permiso antes de fotografiar a una persona o una ceremonia.",
      },
      {
        title: "Desplazarse",
        body: "En Abiyán se circula en taxi con taxímetro (taxis naranjas), en «woro-woro» (taxis colectivos de ruta fija), en gbaka (microbuses) o en barco-bus por la laguna. Entre ciudades, compañías de autocares cubren todo el país; la autopista del Norte une Abiyán con Yamusukro. Para el interior y el oeste se recomienda un coche con conductor. Evite conducir de noche.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo C y E (enchufes europeos). Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al mobile money; la cobertura es buena en las ciudades y a lo largo de las carreteras principales.",
      },
      {
        title: "Seguridad",
        body: "La mayor parte del país, incluidos Abiyán, el litoral, Yamusukro y la región de Man, se visita con vigilancia reforzada. En cambio, Francia y el Reino Unido desaconsejan formalmente viajar a las zonas fronterizas con Malí y Burkina Faso, al norte del distrito de Zanzan, al este del distrito de Savanes y al Parque Nacional de Comoé (riesgo terrorista y de secuestro); las inmediaciones de la frontera con Liberia (Tabou, Taï y Grabo) se desaconsejan salvo motivo imperativo. En Abiyán existe la pequeña delincuencia: evite circular solo de noche en algunos barrios populares, no exhiba objetos de valor y tenga cuidado cerca de los cajeros. El mar y las lagunas son peligrosos (corrientes, olas, playas poco vigiladas): los ahogamientos son frecuentes. Consulte antes y durante el viaje las recomendaciones de viaje de France Diplomatie y del FCDO británico, que cambian.",
      },
    ],
  },
  destinations: {
    abidjan: {
      name: "Abiyán",
      region: "Distrito autónomo de Abiyán",
      summary: "Trepidante metrópolis lagunar: rascacielos del Plateau, bosque urbano, maquis y música.",
      description:
        "Capital económica y ciudad más grande del país, Abiyán se extiende alrededor de la laguna Ébrié. El Plateau, barrio de negocios de torres modernas, mira a los barrios populares de Treichville y Adjamé y a los residenciales de Cocody. Se viene por la energía de la ciudad, sus museos, su bosque primario en plena aglomeración, sus maquis (restaurantes populares) donde probar el attiéké y el pescado a la brasa, y una escena musical exuberante (coupé-décalé, zouglou), celebrada cada año en el festival FEMUA, entre otros. Es la base ideal para recorrer Grand-Bassam y Assinie.",
    },
    "grand-bassam": {
      summary: "Primera capital colonial, con un barrio histórico declarado Patrimonio de la UNESCO, entre laguna y océano.",
      description:
        "A unos cuarenta kilómetros al este de Abiyán, Grand-Bassam fue la primera capital de la colonia a finales del siglo XIX. Su Quartier France, inscrito en el Patrimonio Mundial de la UNESCO en 2012 como «Ciudad histórica de Grand-Bassam», conserva edificios coloniales con balcones de hierro y fachadas desvaídas entre la laguna Ouladine y el océano. El Quartier Impérial y el pueblo n'zima completan la ciudad, conocida también por sus playas de fin de semana, sus artesanos y su gran fiesta del Abissa.",
    },
    assinie: {
      summary: "Larga lengua de arena entre laguna y océano, el balneario más apreciado del país.",
      description:
        "Al este de Grand-Bassam, cerca de la frontera con Ghana, Assinie se extiende sobre una estrecha franja de arena entre el océano Atlántico y la laguna Aby. Cocoteros, hoteles y casas de fin de semana, deportes náuticos en la laguna y paseos en piragua hacia islas y pueblos de pescadores: es la escapada de playa preferida de los habitantes de Abiyán, a unas dos horas por carretera.",
    },
    yamoussoukro: {
      name: "Yamusukro",
      region: "Distrito autónomo de Yamusukro",
      summary: "Capital política de amplias avenidas, famosa por su basílica monumental.",
      description:
        "Pueblo natal de Félix Houphouët-Boigny, primer presidente del país, Yamusukro se convirtió en capital política en 1983. La ciudad sorprende por sus amplias avenidas, sus lagos y sus edificios desmesurados, empezando por la basílica de Nuestra Señora de la Paz, una de las iglesias más grandes del mundo. Una etapa de un día en la ruta hacia el centro y el oeste, a unas tres horas de Abiyán por autopista.",
    },
    man: {
      name: "Man y la región de las montañas",
      summary: "«La ciudad de las dieciocho montañas»: cumbres boscosas, cascadas y puentes de lianas.",
      description:
        "En el oeste del país, Man se encuentra entre relieves verdes que le valen el apodo de «ciudad de las dieciocho montañas». La región, tierra del pueblo dan (yacuba), es famosa por sus máscaras y sus bailarines, sus cascadas, la silueta característica de la Dent de Man y los puentes de lianas de los pueblos vecinos. El clima es más fresco que en Abiyán. Cuente con una larga jornada de carretera desde Abiyán, o haga etapa en Yamusukro.",
    },
    sassandra: {
      summary: "Antiguo puerto colonial en la desembocadura de un río, rodeado de calas y playas salvajes.",
      description:
        "En la costa oeste, Sassandra se desarrolló en la desembocadura del río del mismo nombre, antaño uno de los puertos activos de la colonia. La ciudad, hoy más tranquila, conserva algunos vestigios de aquella época, un animado puerto pesquero donde atracan las grandes piraguas pintadas, y playas y calas bordeadas de rocas y cocoteros que figuran entre las más bellas del país. Un destino para quien tiene tiempo, a varias horas de carretera de Abiyán.",
    },
    korhogo: {
      summary: "Capital del país senufo, famosa por sus telas pintadas y sus tejedores.",
      description:
        "Gran ciudad del norte, Korhogo es el corazón cultural del país senufo. Los pueblos de los alrededores mantienen vivos oficios reputados: telas pintadas de Fakaha, tejido de Waraniéné, forja, escultura y cestería. La sociedad senufo es conocida también por el poro, su institución iniciática, y por sus máscaras. Atención: Korhogo se encuentra en el distrito de Savanes, cuyo este y cuyas zonas fronterizas con Malí y Burkina Faso están formalmente desaconsejados por Francia y el Reino Unido; consulte el mapa de vigilancia actualizado antes de cualquier desplazamiento al norte y no salga de las zonas permitidas.",
    },
    comoe: {
      name: "Parque Nacional de Comoé",
      summary: "Inmenso parque de sabanas declarado Patrimonio de la UNESCO, hoy en zona formalmente desaconsejada.",
      description:
        "En el noreste del país, el Parque Nacional de Comoé es una de las mayores áreas protegidas de África Occidental, inscrita en el Patrimonio Mundial de la UNESCO. Atravesado por el río Comoé, combina sabanas, bosques de galería e islotes de selva densa, y alberga elefantes, hipopótamos, búfalos, antílopes, chimpancés y numerosas aves. Importante: Francia y el Reino Unido desaconsejan actualmente de forma formal viajar allí, sea cual sea el motivo (riesgo terrorista y de secuestro). Se presenta aquí para preparar una visita cuando las condiciones lo permitan.",
    },
  },
  places: {
    "cathedrale-saint-paul-abidjan": {
      name: "Catedral de San Pablo",
      summary: "Catedral de arquitectura audaz, alzada a orillas de la laguna en el Plateau.",
      description:
        "Obra del arquitecto italiano Aldo Spirito, la catedral de San Pablo de Abiyán se reconoce por su alta aguja inclinada, que evoca la figura del apóstol, de la que parten tirantes que sostienen la nave. Consagrada por el papa Juan Pablo II en los años ochenta, alberga grandes vidrieras de colores que combinan escenas bíblicas y motivos africanos. Bonitas vistas de la laguna y del Plateau.",
      tips: "Vista con decoro; evite las visitas durante los oficios.",
    },
    "musee-des-civilisations-de-cote-d-ivoire": {
      name: "Museo de las Civilizaciones de Costa de Marfil",
      summary: "El gran museo nacional: máscaras, estatuaria, objetos rituales y cotidianos.",
      description:
        "Situado en el Plateau, el Museo de las Civilizaciones de Costa de Marfil presenta una de las colecciones de arte y etnografía más ricas del país: máscaras y estatuas de los pueblos dan, baulé, senufo, guro o akan, objetos de oro, instrumentos musicales y textiles. Una excelente introducción a la diversidad cultural marfileña antes de partir hacia el interior.",
    },
    "parc-national-du-banco": {
      name: "Parque Nacional del Banco",
      summary: "Bosque primario protegido en plena ciudad, recorrido por senderos.",
      description:
        "Enclavado en la aglomeración de Abiyán, el Parque Nacional del Banco protege un antiguo bosque tropical de árboles gigantes, atravesado por el río Banco. Sus senderos permiten pasear a la sombra, observar aves y pequeños mamíferos y hacerse una idea del bosque que antaño cubría todo el sur del país. En su linde, los fanicos, lavanderos tradicionales, lavan la ropa a mano en el río.",
      tips: "Venga temprano por la mañana, con buen calzado y un guía del parque; no se aleje solo de los senderos.",
    },
    "maquis-et-attieke-abidjan": {
      name: "Maquis y attiéké",
      summary: "Pescado a la brasa, alloco y attiéké en los maquis, corazón de la vida de Abiyán.",
      description:
        "El maquis, restaurante popular a menudo al aire libre, es una institución marfileña. Se come pescado o pollo a la brasa con attiéké (sémola de mandioca fermentada), alloco (plátano macho frito), salsa de semillas de palma o kedjenou (guiso cocido a fuego lento en vasija de barro), acompañados de zumo de bissap o de gnamankoudji (jengibre). El garba, attiéké con atún frito, es el plato callejero por excelencia. Los animados maquis de Treichville, Marcory o la rue Princesse en Yopougon son también lugares de música.",
      tips: "Por la noche, desplácese en taxi en lugar de a pie, sobre todo en los barrios populares.",
    },
    "quartier-france-grand-bassam": {
      name: "Quartier France",
      summary: "Antiguo centro administrativo y comercial colonial, inscrito en el Patrimonio Mundial.",
      description:
        "Encajado entre laguna y océano, el Quartier France reúne los antiguos edificios administrativos, casas de comercio y mansiones coloniales que hicieron de Grand-Bassam el primer puerto y la primera capital del país. Algunos han sido restaurados, otros se están derrumbando, lo que da al lugar su atmósfera singular. Un paseo a pie, idealmente con un guía, permite comprender la organización de la ciudad colonial y su convivencia con el vecino pueblo n'zima.",
      tips: "Pasee por la mañana o al final de la tarde, cuando la luz es suave y el calor menos intenso.",
    },
    "musee-national-du-costume-grand-bassam": {
      name: "Museo Nacional del Traje",
      summary: "En el antiguo palacio de los gobernadores: trajes, adornos y peinados de los pueblos marfileños.",
      description:
        "Instalado en el antiguo palacio de los gobernadores, edificio colonial emblemático del Quartier France, el Museo Nacional del Traje presenta ropa tradicional, adornos, peinados y objetos ceremoniales de las distintas regiones del país, así como fotografías antiguas y maquetas de viviendas. Una visita breve y muy instructiva.",
    },
    "plage-de-grand-bassam": {
      name: "Playa de Grand-Bassam",
      summary: "Larga playa de arena bordeada de cocoteros y chozas de paja, punto de encuentro de los habitantes de Abiyán.",
      description:
        "Los fines de semana, el paseo marítimo de Grand-Bassam atrae a muchos habitantes de Abiyán que vienen a disfrutar de las chozas de playa, los restaurantes de pescado y el aire marino. Entre semana, la playa está mucho más tranquila. Se viene a descansar y mirar el mar más que a bañarse: las corrientes son muy peligrosas.",
      tips: "Baño totalmente desaconsejado (olas y corrientes violentas, playas rara vez vigiladas).",
    },
    "fete-de-l-abissa": {
      name: "Fiesta del Abissa",
      summary: "La gran fiesta anual del pueblo n'zima: tambores, danzas y palabra libre.",
      description:
        "Cada año, en otoño, el pueblo n'zima de Grand-Bassam celebra el Abissa, a la vez fiesta de renovación y rito de purificación. Durante varios días, al son de los tambores sagrados, la comunidad baila alrededor del rey, y mientras dura la fiesta cualquiera puede criticar públicamente a los demás, incluidas las autoridades, sin temor a represalias. Un momento de gran fervor que atrae a numerosos visitantes.",
      tips: "Las fechas las fijan cada año las autoridades tradicionales: infórmese antes de reservar. Pida permiso antes de hacer fotos.",
      bestPeriod: "Finales de octubre – principios de noviembre (fechas variables)",
    },
    "plage-d-assinie": {
      name: "Playa de Assinie",
      summary: "Kilómetros de arena dorada bordeados de cocoteros, del lado del océano.",
      description:
        "Del lado del océano, Assinie ofrece una playa de arena casi continua, salpicada de hoteles, restaurantes a pie de playa y cocotales. Puestas de sol, largos paseos y pescado a la parrilla marcan el ritmo de la estancia. Como en toda la costa marfileña, el océano es poderoso: se disfruta de la playa, pero conviene bañarse del lado de la laguna.",
      tips: "No se bañe en el océano: las corrientes (la «barre») son violentas.",
    },
    "lagune-aby-assinie": {
      name: "Laguna Aby",
      summary: "Paseos en piragua y actividades náuticas en una amplia laguna de islas boscosas.",
      description:
        "Detrás del cordón de arena de Assinie se extiende la laguna Aby, una de las más grandes del país. Sus aguas tranquilas se prestan a paseos en piragua o en barco hacia islotes boscosos y pueblos de pescadores, así como a los deportes náuticos que ofrecen los hoteles. Otra faceta, más apacible, de Assinie.",
      tips: "Elija una embarcación con chalecos salvavidas y acuerde el precio antes de salir.",
    },
    "basilique-notre-dame-de-la-paix": {
      name: "Basílica de Nuestra Señora de la Paz",
      summary: "Inmensa basílica inspirada en San Pedro de Roma, con vidrieras espectaculares.",
      description:
        "Construida a finales de los años ochenta y consagrada por el papa Juan Pablo II en 1990, la basílica de Nuestra Señora de la Paz se inspira en San Pedro de Roma: cúpula monumental y columnata que enmarca una vasta explanada. Su interior está bañado por la luz de miles de metros cuadrados de vidrieras. Se la considere grandiosa o desmesurada, es uno de los monumentos más impactantes de África Occidental.",
      tips: "Se exige ropa que cubra hombros y piernas; la visita suele hacerse con un guía del lugar.",
    },
    "lac-aux-caimans-yamoussoukro": {
      name: "Lago de los Caimanes",
      summary: "Lago junto a la antigua residencia presidencial, habitado por cocodrilos sagrados.",
      description:
        "El lago que rodea la antigua residencia de Félix Houphouët-Boigny alberga cocodrilos, símbolo de poder en la tradición local. La alimentación de los animales, al final del día, atrae desde hace décadas a curiosos y visitantes. Se observan desde la orilla, a buena distancia.",
      tips: "Permanezca detrás de las barreras y lejos del agua: son animales salvajes y peligrosos.",
    },
    "fondation-houphouet-boigny-yamoussoukro": {
      name: "Fundación Félix Houphouët-Boigny para la Investigación de la Paz",
      summary: "Amplio edificio dedicado a la paz, emblema de la arquitectura monumental de la ciudad.",
      description:
        "Este gran edificio de tejados de cobre, junto a un estanque, alberga la fundación creada para promover la paz y el diálogo, así como conferencias internacionales. Ilustra, junto con la basílica y el hotel Président, la ambición arquitectónica que dio forma a Yamusukro.",
      tips: "Las condiciones para visitar el interior varían: infórmese en el lugar.",
    },
    "dent-de-man": {
      name: "Dent de Man",
      summary: "Cumbre en forma de diente que domina la ciudad, para una caminata panorámica.",
      description:
        "Con su forma de muela reconocible desde lejos, la Dent de Man («Diente de Man») es el símbolo de la ciudad. Su ascensión, empinada en algunos tramos, se hace en media jornada desde los pueblos al pie del macizo, entre campos y bosque. Desde la cima, la vista abarca las montañas y los valles de la región.",
      tips: "Salga temprano con un guía local, buen calzado y mucha agua; evite los días de lluvia intensa (sendero resbaladizo).",
      bestPeriod: "De noviembre a marzo (estación seca)",
    },
    "cascade-de-man": {
      name: "Cascada de Man",
      summary: "Salto de agua en el bosque a las puertas de la ciudad, accesible por un sendero corto.",
      description:
        "A pocos kilómetros del centro, la cascada de Man se precipita entre rocas en medio de un bosque denso. Un sendero acondicionado y un pequeño puente permiten acercarse. Un lugar fresco y apreciado por las familias, más espectacular durante y después de la estación de lluvias.",
      bestPeriod: "De agosto a noviembre (mayor caudal)",
    },
    "ponts-de-lianes-region-de-man": {
      name: "Puentes de lianas",
      summary: "Pasarelas trenzadas con lianas sobre los ríos, rodeadas de secreto.",
      description:
        "En algunos pueblos de la región de Man y Danané, puentes colgantes hechos de lianas trenzadas cruzan los ríos. Según la tradición, son obra de iniciados y se reconstruirían en una sola noche, lejos de las miradas. La visita se organiza con las autoridades del pueblo, respetando las prohibiciones locales.",
      tips: "Algunos pueblos están cerca de las fronteras con Liberia y Guinea: consulte el mapa de vigilancia de las recomendaciones de viaje antes de ir y recurra a un guía local. El pueblo suele pedir una contribución.",
    },
    "port-de-peche-de-sassandra": {
      name: "Puerto pesquero de Sassandra",
      summary: "Llegada de las grandes piraguas pintadas y mercado de pescado en la playa.",
      description:
        "Cada día, las grandes piraguas de colores de los pescadores, muchos de ellos de origen ghanés, vuelven a varar en la playa del puerto. La descarga, la selección y la venta del pescado, y después su ahumado en los hornos cercanos, ofrecen un espectáculo lleno de color de la vida costera.",
      tips: "Venga a la vuelta de la pesca, por la mañana; pida permiso antes de fotografiar a los pescadores y a las vendedoras.",
    },
    "embouchure-du-sassandra": {
      name: "Desembocadura del río Sassandra",
      summary: "El río se une al océano entre manglares y bancos de arena, para descubrir en piragua.",
      description:
        "A la salida de la ciudad, el río Sassandra desemboca en el océano. Un paseo en piragua permite remontar el curso del río entre manglares y pueblos ribereños, observar aves y llegar a los bancos de arena de la desembocadura.",
      tips: "Salga con un piraguero recomendado por su alojamiento y exija chalecos salvavidas.",
    },
    "plages-de-sassandra": {
      name: "Playas de Sassandra",
      summary: "Calas rocosas y playas de arena bordeadas de cocoteros, a ambos lados de la ciudad.",
      description:
        "A ambos lados de Sassandra, la costa alterna cabos rocosos, pequeñas calas y largas playas bordeadas de cocoteros y pueblos de pescadores. Algunos campamentos y hoteles permiten alojarse con tranquilidad, lejos del bullicio de Abiyán.",
      tips: "Infórmese localmente sobre dónde es posible bañarse: las corrientes suelen ser fuertes.",
    },
    "toiles-de-fakaha": {
      name: "Telas pintadas de Fakaha",
      summary: "Pueblo de artistas donde nacen las famosas «telas de Korhogo».",
      description:
        "En el pueblo de Fakaha, los artistas pintan a mano, sobre tejidos de algodón locales, los motivos de animales, máscaras y personajes que han dado fama mundial a las «telas de Korhogo». Se les puede ver trabajar y comprar directamente sus creaciones.",
      tips: "Consulte el mapa de vigilancia para el norte antes de ir y recurra a un guía de Korhogo.",
    },
    "tisserands-de-waraniene": {
      name: "Tejedores de Waraniéné",
      summary: "Pueblo de tejedores que trabajan en telares tradicionales de bandas estrechas.",
      description:
        "A las puertas de Korhogo, el pueblo de Waraniéné es conocido por sus tejedores, que producen en telares tradicionales largas bandas de algodón que después se cosen para hacer pagnes (piezas de tela que se anudan), manteles o prendas. Una cooperativa permite descubrir las etapas del trabajo y comprar allí mismo.",
      tips: "Consulte el mapa de vigilancia para el norte antes de ir.",
    },
    "faune-de-la-comoe": {
      name: "Fauna y paisajes de Comoé",
      summary: "Sabanas, bosques de galería y grandes mamíferos a lo largo del río Comoé.",
      description:
        "El parque debe su riqueza a la diversidad de sus medios, que marcan la transición entre selva y sabana. El río Comoé y sus afluentes son su eje vital, frecuentado por hipopótamos y numerosas aves. Tras años de caza furtiva, los esfuerzos de protección permitieron retirarlo de la Lista del Patrimonio Mundial en Peligro en 2017. Actualmente, la zona está formalmente desaconsejada por las recomendaciones de viaje francesas y británicas.",
      tips: "No vaya mientras las recomendaciones de viaje oficiales lo desaconsejen formalmente; consúltelas con regularidad.",
      bestPeriod: "Estación seca (de diciembre a abril), cuando las condiciones de seguridad lo permitan",
    },
  },
  circuits: {
    "cote-d-ivoire-essentiel-8-jours": {
      title: "Lo esencial de Costa de Marfil en 8 días",
      summary:
        "Abiyán y sus maquis, el bosque del Banco, la ciudad histórica de Grand-Bassam, las playas y la laguna de Assinie y, después, la basílica de Yamusukro.",
    },
    "cote-d-ivoire-montagnes-de-man-6-jours": {
      title: "Yamusukro y las montañas de Man en 6 días",
      summary:
        "Del centro al oeste: la basílica de Yamusukro y luego las cumbres, cascadas y pueblos de la región de Man. Se recomienda viajar en coche con conductor.",
    },
  },
  stepNotes: {
    "cote-d-ivoire-essentiel-8-jours:0": "Llegada y descubrimiento del Plateau.",
    "cote-d-ivoire-essentiel-8-jours:2": "Mañana en el bosque, noche en un maquis.",
    "cote-d-ivoire-essentiel-8-jours:4": "Ruta hacia Grand-Bassam (alrededor de una hora según el tráfico).",
    "cote-d-ivoire-essentiel-8-jours:7": "Ruta hacia Assinie y tarde junto al océano.",
    "cote-d-ivoire-essentiel-8-jours:8": "Jornada de descanso entre laguna y playa.",
    "cote-d-ivoire-essentiel-8-jours:9": "Regreso hacia Abiyán y luego autopista del Norte hasta Yamusukro: larga jornada de carretera.",
    "cote-d-ivoire-essentiel-8-jours:13": "Regreso a Abiyán por la autopista.",
    "cote-d-ivoire-montagnes-de-man-6-jours:0": "Salida temprano de Abiyán por la autopista del Norte.",
    "cote-d-ivoire-montagnes-de-man-6-jours:2": "Larga ruta hacia el oeste hasta Man; no conduzca de noche.",
    "cote-d-ivoire-montagnes-de-man-6-jours:3": "Ascensión matinal con un guía local.",
    "cote-d-ivoire-montagnes-de-man-6-jours:4": "Un día más tranquilo: la cascada y encuentro con los artesanos de la ciudad.",
    "cote-d-ivoire-montagnes-de-man-6-jours:5": "Regreso hacia Yamusukro para dividir el trayecto.",
    "cote-d-ivoire-montagnes-de-man-6-jours:6": "Regreso a Abiyán.",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Das torres do Plateau de Abidjan às casas coloniais de Grand-Bassam, das praias orladas de coqueiros de Assinie à monumental basílica de Yamoussoukro e às montanhas de Man, a Costa do Marfim combina energia urbana, património, florestas e uma cena musical e gastronómica que brilha em toda a África Ocidental.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes que não são cidadãos da CEDEAO precisa de visto; existe um procedimento online no portal oficial das autoridades marfinenses. As condições mudam com frequência: verifique sempre os requisitos atualizados junto das fontes oficiais (embaixada, sítio do Governo) antes de partir: passaporte válido vários meses após o regresso, bilhete de regresso, morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "O certificado de vacinação contra a febre-amarela é exigido à entrada. O paludismo está presente em todo o país: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos (repelente, mosquiteiro). Beba água engarrafada. Podem ser aplicados controlos sanitários reforçados nas fronteiras consoante a situação epidémica regional: informe-se antes de partir.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa com o euro (1 € = 655,957 francos CFA). O dinheiro em numerário continua indispensável fora de Abidjan; o pagamento por telemóvel (mobile money) está em todo o lado, mesmo nos pequenos comerciantes. Os cartões bancários são aceites nos hotéis, supermercados e restaurantes maiores de Abidjan, onde há muitas caixas automáticas.",
      },
      {
        title: "Quando ir",
        body: "O sul tem uma estação das chuvas longa (aproximadamente de abril a julho) e uma curta (aproximadamente de outubro a novembro); o centro e o norte têm um clima mais contrastado, com uma única estação das chuvas. A época mais agradável vai de dezembro a março, a estação seca, com o harmatão (vento seco e poeirento) sobretudo no centro e no norte. No litoral faz calor e humidade todo o ano.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua oficial; o diúla serve de língua franca, e o baulé, o bété, o senufo, o dan (iacuba) e dezenas de outras línguas são faladas no dia a dia. Em Abidjan ouvirá o nouchi, o calão urbano. Cumprimentar antes de pedir o que quer que seja é essencial. Nos locais sagrados e nas festas tradicionais, siga as indicações dos seus anfitriões e peça autorização antes de fotografar uma pessoa ou uma cerimónia.",
      },
      {
        title: "Deslocações",
        body: "Em Abidjan circula-se de táxi com taxímetro (táxis cor de laranja), de «woro-woro» (táxis coletivos com percurso fixo), de gbaka (miniautocarros) ou de barco-autocarro na laguna. Entre cidades, companhias de autocarros servem todo o país; a autoestrada do Norte liga Abidjan a Yamoussoukro. Para o interior e o oeste, recomenda-se um carro com motorista. Evite conduzir de noite.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas de tipo C e E (tomadas europeias). Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao mobile money; a cobertura é boa nas cidades e ao longo das estradas principais.",
      },
      {
        title: "Segurança",
        body: "A maior parte do país, incluindo Abidjan, o litoral, Yamoussoukro e a região de Man, visita-se com vigilância reforçada. Em contrapartida, a França e o Reino Unido desaconselham formalmente as deslocações às zonas fronteiriças com o Mali e o Burkina Faso, ao norte do distrito de Zanzan, ao leste do distrito de Savanes e ao Parque Nacional de Comoé (risco terrorista e de rapto); as imediações da fronteira com a Libéria (Tabou, Taï e Grabo) são desaconselhadas salvo motivo imperioso. Em Abidjan existe pequena criminalidade: evite circular sozinho à noite em alguns bairros populares, não exiba objetos de valor e tenha cuidado junto às caixas automáticas. O mar e as lagunas são perigosos (correntes, ondas, praias pouco vigiadas): os afogamentos são frequentes. Consulte antes e durante a viagem os conselhos aos viajantes da France Diplomatie e do FCDO britânico, que vão mudando.",
      },
    ],
  },
  destinations: {
    abidjan: {
      region: "Distrito Autónomo de Abidjan",
      summary: "Metrópole lagunar trepidante: arranha-céus do Plateau, floresta urbana, maquis e música.",
      description:
        "Capital económica e maior cidade do país, Abidjan estende-se em torno da laguna Ébrié. O Plateau, bairro de negócios de torres modernas, fica em frente aos bairros populares de Treichville e Adjamé e aos bairros residenciais de Cocody. Vem-se pela energia da cidade, pelos seus museus, pela floresta primária em plena aglomeração, pelos maquis (restaurantes populares) onde provar o attiéké e o peixe grelhado, e por uma cena musical fervilhante (coupé-décalé, zouglou), celebrada todos os anos no festival FEMUA, entre outros. É a base ideal para visitar Grand-Bassam e Assinie.",
    },
    "grand-bassam": {
      summary: "Primeira capital colonial, com um bairro histórico classificado pela UNESCO, entre laguna e oceano.",
      description:
        "A cerca de quarenta quilómetros a leste de Abidjan, Grand-Bassam foi a primeira capital da colónia no final do século XIX. O seu Quartier France, inscrito no Património Mundial da UNESCO em 2012 como «Cidade histórica de Grand-Bassam», conserva edifícios coloniais com varandas de ferro e fachadas desbotadas entre a laguna Ouladine e o oceano. O Quartier Impérial e a aldeia n'zima completam a cidade, conhecida também pelas praias de fim de semana, pelos artesãos e pela grande festa do Abissa.",
    },
    assinie: {
      summary: "Longa língua de areia entre laguna e oceano, a estância balnear mais procurada do país.",
      description:
        "A leste de Grand-Bassam, perto da fronteira com o Gana, Assinie estende-se por uma estreita faixa de areia entre o oceano Atlântico e a laguna Aby. Coqueiros, hotéis e casas de fim de semana, desportos náuticos na laguna e passeios de piroga até ilhas e aldeias de pescadores: é a escapadinha balnear preferida dos habitantes de Abidjan, a cerca de duas horas de estrada.",
    },
    yamoussoukro: {
      region: "Distrito Autónomo de Yamoussoukro",
      summary: "Capital política de largas avenidas, célebre pela sua basílica monumental.",
      description:
        "Aldeia natal de Félix Houphouët-Boigny, primeiro presidente do país, Yamoussoukro tornou-se capital política em 1983. A cidade surpreende pelas largas avenidas, pelos lagos e pelos edifícios desmesurados, a começar pela Basílica de Nossa Senhora da Paz, uma das maiores igrejas do mundo. Uma etapa de um dia no caminho para o centro e o oeste, a cerca de três horas de Abidjan pela autoestrada.",
    },
    man: {
      name: "Man e a região das montanhas",
      summary: "«A cidade das dezoito montanhas»: picos arborizados, cascatas e pontes de lianas.",
      description:
        "No oeste do país, Man está aninhada entre relevos verdejantes que lhe valeram a alcunha de «cidade das dezoito montanhas». A região, terra do povo dan (iacuba), é famosa pelas suas máscaras e bailarinos, pelas cascatas, pela silhueta característica da Dent de Man e pelas pontes de lianas das aldeias vizinhas. O clima é mais fresco do que em Abidjan. Conte com um longo dia de estrada a partir de Abidjan, ou faça uma paragem em Yamoussoukro.",
    },
    sassandra: {
      summary: "Antigo porto colonial na foz de um rio, rodeado de enseadas e praias selvagens.",
      description:
        "Na costa oeste, Sassandra desenvolveu-se na foz do rio com o mesmo nome, outrora um dos portos ativos da colónia. A cidade, hoje mais calma, guarda alguns vestígios dessa época, um animado porto de pesca onde chegam as grandes pirogas pintadas, e praias e enseadas orladas de rochas e coqueiros que estão entre as mais bonitas do país. Um destino para quem tem tempo, a várias horas de estrada de Abidjan.",
    },
    korhogo: {
      summary: "Capital do país senufo, famosa pelos seus panos pintados e pelos tecelões.",
      description:
        "Grande cidade do norte, Korhogo é o coração cultural do país senufo. As aldeias em redor mantêm vivos saberes reputados: panos pintados de Fakaha, tecelagem de Waraniéné, forja, escultura e cestaria. A sociedade senufo é também conhecida pelo poro, a sua instituição iniciática, e pelas suas máscaras. Atenção: Korhogo situa-se no distrito de Savanes, cujo leste e cujas zonas fronteiriças com o Mali e o Burkina Faso são formalmente desaconselhados pela França e pelo Reino Unido; consulte o mapa de vigilância atualizado antes de qualquer deslocação ao norte e não saia das zonas permitidas.",
    },
    comoe: {
      name: "Parque Nacional de Comoé",
      summary: "Imenso parque de savanas classificado pela UNESCO, hoje numa zona formalmente desaconselhada.",
      description:
        "No nordeste do país, o Parque Nacional de Comoé é uma das maiores áreas protegidas da África Ocidental, inscrita no Património Mundial da UNESCO. Atravessado pelo rio Comoé, combina savanas, florestas-galeria e manchas de floresta densa, e abriga elefantes, hipopótamos, búfalos, antílopes, chimpanzés e inúmeras aves. Importante: a França e o Reino Unido desaconselham atualmente de forma formal qualquer deslocação ao parque, seja qual for o motivo (risco terrorista e de rapto). É aqui apresentado para preparar uma visita quando as condições o permitirem.",
    },
  },
  places: {
    "cathedrale-saint-paul-abidjan": {
      name: "Catedral de São Paulo",
      summary: "Catedral de arquitetura ousada, erguida à beira da laguna no Plateau.",
      description:
        "Obra do arquiteto italiano Aldo Spirito, a Catedral de São Paulo de Abidjan reconhece-se pela sua alta flecha inclinada, que evoca a figura do apóstolo, de onde partem tirantes que sustentam a nave. Consagrada pelo papa João Paulo II nos anos 1980, possui grandes vitrais coloridos que combinam cenas bíblicas e motivos africanos. Bela vista sobre a laguna e o Plateau.",
      tips: "Vista-se de forma adequada; evite visitar durante as celebrações.",
    },
    "musee-des-civilisations-de-cote-d-ivoire": {
      name: "Museu das Civilizações da Costa do Marfim",
      summary: "O grande museu nacional: máscaras, estatuária, objetos rituais e do quotidiano.",
      description:
        "Situado no Plateau, o Museu das Civilizações da Costa do Marfim apresenta uma das mais ricas coleções de arte e etnografia do país: máscaras e estátuas dos povos dan, baulé, senufo, guro ou akan, objetos em ouro, instrumentos musicais e têxteis. Uma excelente introdução à diversidade cultural marfinense antes de partir para o interior.",
    },
    "parc-national-du-banco": {
      name: "Parque Nacional do Banco",
      summary: "Floresta primária protegida em plena cidade, percorrida por trilhos.",
      description:
        "Encravado na aglomeração de Abidjan, o Parque Nacional do Banco protege uma antiga floresta tropical de árvores gigantes, atravessada pelo rio Banco. Os trilhos permitem passear à sombra, observar aves e pequenos mamíferos e ter uma ideia da floresta que outrora cobria todo o sul do país. Na sua orla, os fanicos, lavadeiros tradicionais, lavam a roupa à mão no rio.",
      tips: "Venha de manhã cedo, com bom calçado e um guia do parque; não se afaste sozinho dos trilhos.",
    },
    "maquis-et-attieke-abidjan": {
      name: "Maquis e attiéké",
      summary: "Peixe grelhado, alloco e attiéké nos maquis, coração da vida de Abidjan.",
      description:
        "O maquis, restaurante popular muitas vezes ao ar livre, é uma instituição marfinense. Come-se peixe ou frango grelhado com attiéké (sêmola de mandioca fermentada), alloco (banana-pão frita), molho de semente de palma ou kedjenou (guisado cozinhado lentamente num pote de barro), acompanhados de sumo de bissap ou de gnamankoudji (gengibre). O garba, attiéké com atum frito, é o prato de rua por excelência. Os animados maquis de Treichville, de Marcory ou da rue Princesse, em Yopougon, são também locais de música.",
      tips: "À noite, desloque-se de táxi em vez de a pé, sobretudo nos bairros populares.",
    },
    "quartier-france-grand-bassam": {
      name: "Quartier France",
      summary: "Antigo centro administrativo e comercial colonial, inscrito no Património Mundial.",
      description:
        "Encaixado entre laguna e oceano, o Quartier France reúne os antigos edifícios administrativos, casas comerciais e moradias coloniais que fizeram de Grand-Bassam o primeiro porto e a primeira capital do país. Alguns foram restaurados, outros estão em ruínas, o que dá ao lugar a sua atmosfera singular. Um passeio a pé, de preferência com guia, ajuda a compreender a organização da cidade colonial e a convivência com a vizinha aldeia n'zima.",
      tips: "Passeie de manhã ou ao fim da tarde, quando a luz é suave e o calor menos intenso.",
    },
    "musee-national-du-costume-grand-bassam": {
      name: "Museu Nacional do Traje",
      summary: "No antigo palácio dos governadores: trajes, adornos e penteados dos povos marfinenses.",
      description:
        "Instalado no antigo palácio dos governadores, edifício colonial emblemático do Quartier France, o Museu Nacional do Traje apresenta vestuário tradicional, adornos, penteados e objetos cerimoniais das diferentes regiões do país, bem como fotografias antigas e maquetas de habitações. Uma visita curta e muito instrutiva.",
    },
    "plage-de-grand-bassam": {
      name: "Praia de Grand-Bassam",
      summary: "Longa praia de areia orlada de coqueiros e palhotas, ponto de encontro dos habitantes de Abidjan.",
      description:
        "Ao fim de semana, a marginal de Grand-Bassam atrai muitos habitantes de Abidjan que vêm aproveitar as palhotas, os restaurantes de peixe e o ar do mar. Durante a semana, a praia é muito mais calma. Vem-se para descansar e olhar o mar, mais do que para nadar: as correntes são muito perigosas.",
      tips: "Banhos fortemente desaconselhados (ondas e correntes violentas, praias raramente vigiadas).",
    },
    "fete-de-l-abissa": {
      name: "Festa do Abissa",
      summary: "A grande festa anual do povo n'zima: tambores, danças e palavra livre.",
      description:
        "Todos os anos, no outono, o povo n'zima de Grand-Bassam celebra o Abissa, simultaneamente festa de renovação e rito de purificação. Durante vários dias, ao som dos tambores sagrados, a comunidade dança à volta do rei e, enquanto dura a festa, qualquer pessoa pode criticar publicamente os outros, incluindo as autoridades, sem medo de represálias. Um momento de grande fervor que atrai muitos visitantes.",
      tips: "As datas são fixadas todos os anos pelas autoridades tradicionais: informe-se antes de reservar. Peça autorização antes de fotografar.",
      bestPeriod: "Final de outubro – início de novembro (datas variáveis)",
    },
    "plage-d-assinie": {
      name: "Praia de Assinie",
      summary: "Quilómetros de areia dourada orlados de coqueiros, do lado do oceano.",
      description:
        "Do lado do oceano, Assinie oferece uma praia de areia quase contínua, pontuada por hotéis, restaurantes à beira-mar e coqueirais. Pores do sol, longas caminhadas e peixe grelhado marcam o ritmo da estadia. Como em toda a costa marfinense, o oceano é poderoso: aproveita-se a praia, mas é preferível nadar do lado da laguna.",
      tips: "Não nade no oceano: as correntes (a «barre») são violentas.",
    },
    "lagune-aby-assinie": {
      name: "Laguna Aby",
      summary: "Passeios de piroga e atividades náuticas numa vasta laguna de ilhas arborizadas.",
      description:
        "Atrás do cordão de areia de Assinie estende-se a laguna Aby, uma das maiores do país. As suas águas calmas prestam-se a passeios de piroga ou de barco até ilhéus arborizados e aldeias de pescadores, bem como aos desportos náuticos propostos pelos hotéis. Outra faceta, mais tranquila, de Assinie.",
      tips: "Escolha uma embarcação com coletes salva-vidas e combine o preço antes de partir.",
    },
    "basilique-notre-dame-de-la-paix": {
      name: "Basílica de Nossa Senhora da Paz",
      summary: "Imensa basílica inspirada em São Pedro de Roma, com vitrais espetaculares.",
      description:
        "Construída no final dos anos 1980 e consagrada pelo papa João Paulo II em 1990, a Basílica de Nossa Senhora da Paz inspira-se em São Pedro de Roma: cúpula monumental e colunata a enquadrar uma vasta esplanada. O interior é banhado pela luz de milhares de metros quadrados de vitrais. Quer se ache grandiosa ou desmesurada, é um dos monumentos mais impressionantes da África Ocidental.",
      tips: "É exigido vestuário que cubra ombros e pernas; a visita faz-se geralmente com um guia do local.",
    },
    "lac-aux-caimans-yamoussoukro": {
      name: "Lago dos Crocodilos",
      summary: "Lago junto à antiga residência presidencial, habitado por crocodilos sagrados.",
      description:
        "O lago que rodeia a antiga residência de Félix Houphouët-Boigny abriga crocodilos, símbolo de poder na tradição local. A alimentação dos animais, ao fim do dia, atrai curiosos e visitantes há décadas. Observam-se a partir da margem, a uma distância segura.",
      tips: "Fique atrás das barreiras e longe da água: são animais selvagens e perigosos.",
    },
    "fondation-houphouet-boigny-yamoussoukro": {
      name: "Fundação Félix Houphouët-Boigny para a Investigação da Paz",
      summary: "Vasto edifício dedicado à paz, emblema da arquitetura monumental da cidade.",
      description:
        "Este grande edifício de telhados de cobre, à beira de um plano de água, acolhe a fundação criada para promover a paz e o diálogo, bem como conferências internacionais. Ilustra, com a basílica e o hotel Président, a ambição arquitetónica que moldou Yamoussoukro.",
      tips: "As condições de visita ao interior variam: informe-se no local.",
    },
    "dent-de-man": {
      name: "Dent de Man",
      summary: "Pico em forma de dente que domina a cidade, para uma caminhada panorâmica.",
      description:
        "Com a sua forma de molar reconhecível ao longe, a Dent de Man («Dente de Man») é o símbolo da cidade. A subida, íngreme em alguns troços, faz-se em meio dia a partir das aldeias no sopé do maciço, entre campos e floresta. Do cimo, a vista estende-se sobre as montanhas e os vales da região.",
      tips: "Parta cedo com um guia local, bom calçado e muita água; evite os dias de chuva forte (trilho escorregadio).",
      bestPeriod: "De novembro a março (estação seca)",
    },
    "cascade-de-man": {
      name: "Cascata de Man",
      summary: "Queda de água na floresta às portas da cidade, acessível por um trilho curto.",
      description:
        "A poucos quilómetros do centro, a cascata de Man despenha-se entre rochas no meio de uma floresta densa. Um trilho arranjado e uma pequena ponte permitem aproximar-se. Um local fresco e apreciado pelas famílias, mais espetacular durante e depois da estação das chuvas.",
      bestPeriod: "De agosto a novembro (maior caudal)",
    },
    "ponts-de-lianes-region-de-man": {
      name: "Pontes de lianas",
      summary: "Passadiços entrançados com lianas sobre os rios, envoltos em segredo.",
      description:
        "Em algumas aldeias da região de Man e de Danané, pontes suspensas feitas de lianas entrançadas atravessam os rios. Segundo a tradição, são obra de iniciados e seriam reconstruídas numa só noite, longe dos olhares. A visita faz-se com as autoridades da aldeia, respeitando as interdições locais.",
      tips: "Algumas aldeias ficam perto das fronteiras com a Libéria e a Guiné: consulte o mapa de vigilância dos conselhos aos viajantes antes de ir e recorra a um guia local. A aldeia pede geralmente uma contribuição.",
    },
    "port-de-peche-de-sassandra": {
      name: "Porto de pesca de Sassandra",
      summary: "Chegada das grandes pirogas pintadas e mercado de peixe na praia.",
      description:
        "Todos os dias, as grandes pirogas coloridas dos pescadores, muitos deles de origem ganesa, voltam a encalhar na praia do porto. A descarga, a triagem e a venda do peixe, e depois a fumagem nos fornos vizinhos, oferecem um espetáculo cheio de cor da vida costeira.",
      tips: "Venha no regresso da pesca, de manhã; peça autorização antes de fotografar os pescadores e as vendedoras.",
    },
    "embouchure-du-sassandra": {
      name: "Foz do rio Sassandra",
      summary: "O rio encontra o oceano entre mangais e bancos de areia, a descobrir de piroga.",
      description:
        "À saída da cidade, o rio Sassandra desagua no oceano. Um passeio de piroga permite subir o rio entre mangais e aldeias ribeirinhas, observar aves e chegar aos bancos de areia da foz.",
      tips: "Vá com um piroguista recomendado pelo seu alojamento e exija coletes salva-vidas.",
    },
    "plages-de-sassandra": {
      name: "Praias de Sassandra",
      summary: "Enseadas rochosas e praias de areia orladas de coqueiros, de um lado e do outro da cidade.",
      description:
        "De um lado e do outro de Sassandra, a costa alterna cabos rochosos, pequenas enseadas e longas praias orladas de coqueiros e aldeias de pescadores. Alguns acampamentos e hotéis permitem ficar com tranquilidade, longe da agitação de Abidjan.",
      tips: "Informe-se localmente sobre os sítios onde é possível nadar: as correntes são muitas vezes fortes.",
    },
    "toiles-de-fakaha": {
      name: "Panos pintados de Fakaha",
      summary: "Aldeia de artistas onde nascem os célebres «panos de Korhogo».",
      description:
        "Na aldeia de Fakaha, artistas pintam à mão, sobre tecidos de algodão tecidos localmente, os motivos de animais, máscaras e personagens que tornaram os «panos de Korhogo» conhecidos em todo o mundo. Pode vê-los trabalhar e comprar diretamente as suas criações.",
      tips: "Consulte o mapa de vigilância para o norte antes de ir e recorra a um guia de Korhogo.",
    },
    "tisserands-de-waraniene": {
      name: "Tecelões de Waraniéné",
      summary: "Aldeia de tecelões que trabalham em teares tradicionais de faixas estreitas.",
      description:
        "Às portas de Korhogo, a aldeia de Waraniéné é conhecida pelos seus tecelões, que produzem em teares tradicionais longas faixas de algodão depois cosidas em panos, toalhas de mesa ou roupas. Uma cooperativa permite descobrir as etapas do trabalho e comprar no local.",
      tips: "Consulte o mapa de vigilância para o norte antes de ir.",
    },
    "faune-de-la-comoe": {
      name: "Fauna e paisagens de Comoé",
      summary: "Savanas, florestas-galeria e grandes mamíferos ao longo do rio Comoé.",
      description:
        "O parque deve a sua riqueza à diversidade dos seus habitats, que fazem a transição entre floresta e savana. O rio Comoé e os seus afluentes são o seu eixo vital, frequentado por hipopótamos e inúmeras aves. Após anos de caça furtiva, os esforços de proteção permitiram retirá-lo da Lista do Património Mundial em Perigo em 2017. Atualmente, a zona é formalmente desaconselhada pelos conselhos aos viajantes franceses e britânicos.",
      tips: "Não vá enquanto os conselhos oficiais aos viajantes o desaconselharem formalmente; consulte-os regularmente.",
      bestPeriod: "Estação seca (de dezembro a abril), quando as condições de segurança o permitirem",
    },
  },
  circuits: {
    "cote-d-ivoire-essentiel-8-jours": {
      title: "O essencial da Costa do Marfim em 8 dias",
      summary:
        "Abidjan e os seus maquis, a floresta do Banco, a cidade histórica de Grand-Bassam, as praias e a laguna de Assinie e, depois, a basílica de Yamoussoukro.",
    },
    "cote-d-ivoire-montagnes-de-man-6-jours": {
      title: "Yamoussoukro e as montanhas de Man em 6 dias",
      summary:
        "Do centro ao oeste: a basílica de Yamoussoukro e depois os picos, cascatas e aldeias da região de Man. Recomenda-se viajar de carro com motorista.",
    },
  },
  stepNotes: {
    "cote-d-ivoire-essentiel-8-jours:0": "Chegada e descoberta do Plateau.",
    "cote-d-ivoire-essentiel-8-jours:2": "Manhã na floresta, noite num maquis.",
    "cote-d-ivoire-essentiel-8-jours:4": "Estrada até Grand-Bassam (cerca de uma hora, consoante o trânsito).",
    "cote-d-ivoire-essentiel-8-jours:7": "Estrada até Assinie e tarde à beira do oceano.",
    "cote-d-ivoire-essentiel-8-jours:8": "Dia de descanso entre laguna e praia.",
    "cote-d-ivoire-essentiel-8-jours:9": "Regresso em direção a Abidjan e depois autoestrada do Norte até Yamoussoukro: longo dia de estrada.",
    "cote-d-ivoire-essentiel-8-jours:13": "Regresso a Abidjan pela autoestrada.",
    "cote-d-ivoire-montagnes-de-man-6-jours:0": "Partida cedo de Abidjan pela autoestrada do Norte.",
    "cote-d-ivoire-montagnes-de-man-6-jours:2": "Longa estrada para oeste até Man; não conduza de noite.",
    "cote-d-ivoire-montagnes-de-man-6-jours:3": "Subida matinal com um guia local.",
    "cote-d-ivoire-montagnes-de-man-6-jours:4": "Um dia mais calmo: a cascata e encontro com os artesãos da cidade.",
    "cote-d-ivoire-montagnes-de-man-6-jours:5": "Regresso a Yamoussoukro para dividir a viagem.",
    "cote-d-ivoire-montagnes-de-man-6-jours:6": "Regresso a Abidjan.",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "من أبراج حيّ بلاتو في أبيدجان إلى البيوت الاستعمارية في غران بسام، ومن شواطئ أسيني المحفوفة بأشجار جوز الهند إلى بازيليك ياموسوكرو الضخمة وجبال مان، تجمع كوت ديفوار بين حيوية المدن والتراث والغابات ومشهد موسيقي ومطبخ يشعّان في أرجاء غرب أفريقيا كلها.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين من غير مواطني المجموعة الاقتصادية لدول غرب أفريقيا (إيكواس) إلى تأشيرة، ويتوفر إجراء عبر الإنترنت على البوابة الرسمية للسلطات الإيفوارية. تتغير الشروط بانتظام: تحقّق دائمًا من الشروط المحدّثة لدى المصادر الرسمية (السفارة، الموقع الحكومي) قبل السفر: جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان الإقامة.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمى الصفراء عند الدخول. الملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن العلاج الوقائي، واحمِ نفسك من البعوض (طارد للحشرات، ناموسية). اشرب المياه المعبأة. وقد تُطبَّق فحوص صحية مشددة على الحدود بحسب الوضع الوبائي الإقليمي: استعلم قبل السفر.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي فرنك الجماعة المالية الأفريقية (XOF)، المرتبط بسعر ثابت باليورو (1 يورو = 655.957 فرنكًا). يبقى النقد ضروريًا خارج أبيدجان، والدفع عبر الهاتف المحمول (mobile money) منتشر في كل مكان حتى لدى صغار التجار. تُقبل البطاقات المصرفية في الفنادق والمتاجر الكبرى والمطاعم المهمة في أبيدجان، حيث تكثر أجهزة الصراف الآلي.",
      },
      {
        title: "متى تسافر",
        body: "يعرف الجنوب موسم أمطار طويلًا (من أبريل إلى يوليو تقريبًا) وآخر قصيرًا (من أكتوبر إلى نوفمبر تقريبًا)، أما الوسط والشمال فمناخهما أكثر تباينًا مع موسم أمطار واحد. أنسب فترة من ديسمبر إلى مارس، وهي موسم الجفاف، مع رياح الهرمتان (رياح جافة محمّلة بالغبار) خاصةً في الوسط والشمال. الجو حار ورطب طوال العام على الساحل.",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي اللغة الرسمية، والديولا لغة التواصل المشتركة، وتُتحدَّث يوميًا لغات الباولي والبيتي والسينوفو والدان (ياكوبا) وعشرات اللغات الأخرى. وفي أبيدجان ستسمع «النوشي»، وهي اللغة العامية الحضرية. التحية قبل أي طلب أمر أساسي. وفي الأماكن المقدسة والاحتفالات التقليدية، اتبع تعليمات مضيفيك واستأذن قبل تصوير أي شخص أو مراسم.",
      },
      {
        title: "التنقل",
        body: "في أبيدجان يُتنقَّل بسيارات الأجرة ذات العدّاد (سيارات الأجرة البرتقالية)، أو بـ«الوورو وورو» (سيارات أجرة جماعية بمسار ثابت)، أو بـ«الغباكا» (حافلات صغيرة)، أو بالحافلات المائية في البحيرة الشاطئية. وبين المدن تغطي شركات الحافلات البلاد كلها، ويربط الطريق السريع الشمالي أبيدجان بياموسوكرو. وللداخل والغرب يُنصح بسيارة مع سائق. تجنّب القيادة ليلًا.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار 220 فولت، والمقابس من النوعين C وE (المقابس الأوروبية). تتيح شريحة اتصال محلية (يُطلب إثبات الهوية) الوصول إلى الإنترنت عبر الهاتف وإلى خدمة الدفع عبر المحمول، والتغطية جيدة في المدن وعلى امتداد الطرق الرئيسية.",
      },
      {
        title: "الأمن",
        body: "يمكن زيارة معظم أنحاء البلاد، ومنها أبيدجان والساحل وياموسوكرو ومنطقة مان، مع يقظة مشددة. في المقابل، تنصح فرنسا والمملكة المتحدة بشدة بعدم التوجه إلى المناطق الحدودية مع مالي وبوركينا فاسو، وشمال مقاطعة زانزان، وشرق مقاطعة السافانا، ومتنزه كومويه الوطني (خطر الإرهاب والاختطاف)، كما لا يُنصح بالتوجه إلى المناطق المحاذية للحدود الليبيرية (تابو وتاي وغرابو) إلا لضرورة قصوى. توجد في أبيدجان جرائم صغيرة: تجنّب التنقل وحدك ليلًا في بعض الأحياء الشعبية، ولا تُظهر الأشياء الثمينة، وكن حذرًا قرب أجهزة الصراف الآلي. البحر والبحيرات الشاطئية خطرة (تيارات وأمواج وشواطئ قلّما تخضع للمراقبة)، وحوادث الغرق متكررة. راجع قبل رحلتك وأثناءها توصيات السفر الصادرة عن وزارة الخارجية الفرنسية (France Diplomatie) ووزارة الخارجية البريطانية (FCDO)، فهي تتغير.",
      },
    ],
  },
  destinations: {
    abidjan: {
      name: "أبيدجان",
      region: "مقاطعة أبيدجان المستقلة",
      summary: "حاضرة صاخبة على البحيرة الشاطئية: ناطحات سحاب حيّ بلاتو، وغابة داخل المدينة، ومطاعم «ماكي» وموسيقى.",
      description:
        "أبيدجان هي العاصمة الاقتصادية وأكبر مدن البلاد، وتمتد حول بحيرة إبريه الشاطئية. يقابل حيُّ بلاتو، حيُّ الأعمال بأبراجه الحديثة، الأحياءَ الشعبية في تريشفيل وأجامي والأحياءَ السكنية في كوكودي. يقصدها الزوار لحيويتها ومتاحفها وغابتها الأصلية الواقعة في قلب التجمع الحضري، ولمطاعم «الماكي» الشعبية حيث يُتذوَّق الأتيكيه والسمك المشوي، ولمشهدها الموسيقي الزاخر (الكوبيه ديكاليه والزوغلو) الذي يُحتفى به كل عام في مهرجان «فيموا» وغيره. وهي القاعدة المثالية لزيارة غران بسام وأسيني.",
    },
    "grand-bassam": {
      name: "غران بسام",
      region: "جنوب كومويه",
      summary: "أول عاصمة استعمارية، بحيّها التاريخي المدرج في قائمة اليونسكو، بين البحيرة والمحيط.",
      description:
        "على بُعد نحو أربعين كيلومترًا شرق أبيدجان، كانت غران بسام أول عاصمة للمستعمرة في أواخر القرن التاسع عشر. ويحتفظ «الحيّ الفرنسي» فيها، المدرج في قائمة التراث العالمي لليونسكو منذ عام 2012 باسم «مدينة غران بسام التاريخية»، بمبانٍ استعمارية ذات شرفات حديدية وواجهات باهتة الألوان بين بحيرة أولادين والمحيط. ويكمل المدينةَ الحيُّ الإمبراطوري وقرية النزيما، وهي معروفة أيضًا بشواطئ عطلة نهاية الأسبوع وحرفييها ومهرجان الأبيسا الكبير.",
    },
    assinie: {
      name: "أسيني",
      region: "جنوب كومويه",
      summary: "لسان رملي طويل بين البحيرة والمحيط، وهو أكثر المنتجعات الساحلية إقبالًا في البلاد.",
      description:
        "شرق غران بسام وقرب الحدود الغانية، تمتد أسيني على شريط رملي ضيق بين المحيط الأطلسي وبحيرة آبي. أشجار جوز الهند والفنادق ومنازل عطلة نهاية الأسبوع، والرياضات المائية على البحيرة، والنزهات بالقوارب نحو الجزر وقرى الصيادين: إنها الوجهة الشاطئية المفضلة لسكان أبيدجان، على بُعد ساعتين تقريبًا بالسيارة.",
    },
    yamoussoukro: {
      name: "ياموسوكرو",
      region: "مقاطعة ياموسوكرو المستقلة",
      summary: "العاصمة السياسية ذات الشوارع الواسعة، الشهيرة ببازيليكها الضخمة.",
      description:
        "ياموسوكرو هي القرية التي وُلد فيها فيليكس هوفويه بوانيي، أول رئيس للبلاد، وقد أصبحت العاصمة السياسية عام 1983. تفاجئ المدينة زائرها بشوارعها الواسعة وبحيراتها ومبانيها الهائلة، وفي مقدمتها بازيليك سيدة السلام، إحدى أكبر الكنائس في العالم. محطة ليوم واحد على الطريق نحو الوسط والغرب، على بُعد نحو ثلاث ساعات من أبيدجان عبر الطريق السريع.",
    },
    man: {
      name: "مان ومنطقة الجبال",
      region: "تونكبي",
      summary: "«مدينة الجبال الثمانية عشر»: قمم مكسوّة بالغابات وشلالات وجسور من النباتات المتسلقة.",
      description:
        "في غرب البلاد، تقع مدينة مان بين تضاريس خضراء أكسبتها لقب «مدينة الجبال الثمانية عشر». المنطقة موطن شعب الدان (الياكوبا)، وهي مشهورة بأقنعتها وراقصيها وشلالاتها، وبالشكل المميز لقمة «سنّ مان»، وبجسور النباتات المتسلقة في القرى المجاورة. والمناخ فيها ألطف منه في أبيدجان. احسب يومًا طويلًا على الطريق من أبيدجان، أو توقف في ياموسوكرو.",
    },
    sassandra: {
      name: "ساساندرا",
      region: "غبوكليه",
      summary: "ميناء استعماري قديم عند مصبّ نهر، تحيط به خلجان صغيرة وشواطئ برية.",
      description:
        "على الساحل الغربي، نشأت ساساندرا عند مصبّ النهر الذي يحمل الاسم نفسه، وكانت في الماضي أحد الموانئ النشطة في المستعمرة. تحتفظ المدينة، الأهدأ اليوم، ببعض آثار تلك الحقبة، وبميناء صيد نابض بالحياة ترسو فيه القوارب الكبيرة الملوّنة، وبشواطئ وخلجان تحفّها الصخور وأشجار جوز الهند تُعدّ من أجمل ما في البلاد. وجهة لمن لديه متسع من الوقت، على بُعد ساعات عدة بالسيارة من أبيدجان.",
    },
    korhogo: {
      name: "كورهوغو",
      region: "بورو",
      summary: "عاصمة بلاد السينوفو، الشهيرة بأقمشتها المرسومة ونسّاجيها.",
      description:
        "كورهوغو مدينة كبيرة في الشمال وهي القلب الثقافي لبلاد السينوفو. تحافظ القرى المحيطة بها على حِرف ذائعة الصيت: الأقمشة المرسومة في فاكاها، والنسيج في وارانييني، والحدادة، والنحت، وصناعة السلال. ويُعرف مجتمع السينوفو أيضًا بـ«البورو»، مؤسسته التلقينية، وبأقنعته. تنبيه: تقع كورهوغو في مقاطعة السافانا، التي تنصح فرنسا والمملكة المتحدة بشدة بعدم التوجه إلى شرقها ومناطقها الحدودية مع مالي وبوركينا فاسو؛ راجع خريطة اليقظة المحدّثة قبل أي تنقل في الشمال ولا تخرج من المناطق المسموح بها.",
    },
    comoe: {
      name: "متنزه كومويه الوطني",
      region: "زانزان",
      summary: "متنزه سافانا شاسع مدرج في قائمة اليونسكو، يقع حاليًا في منطقة يُنصح بشدة بعدم التوجه إليها.",
      description:
        "في شمال شرق البلاد، يُعدّ متنزه كومويه الوطني من أوسع المناطق المحمية في غرب أفريقيا، وهو مدرج في قائمة التراث العالمي لليونسكو. يعبره نهر كومويه، ويجمع بين السافانا والغابات المحاذية للأنهار وجيوب من الغابات الكثيفة، ويؤوي الفيلة وأفراس النهر والجواميس والظباء والشمبانزي وأنواعًا كثيرة من الطيور. مهم: تنصح فرنسا والمملكة المتحدة حاليًا بشدة بعدم التوجه إليه مهما كان السبب (خطر الإرهاب والاختطاف). نعرضه هنا للتحضير لزيارة حين تسمح الظروف بذلك.",
    },
  },
  places: {
    "cathedrale-saint-paul-abidjan": {
      name: "كاتدرائية القديس بولس",
      summary: "كاتدرائية ذات عمارة جريئة، منتصبة على ضفة البحيرة في حيّ بلاتو.",
      description:
        "صمّمها المهندس المعماري الإيطالي ألدو سبيريتو، وتُعرف كاتدرائية القديس بولس في أبيدجان ببرجها العالي المائل الذي يستحضر هيئة الرسول، وتنطلق منه كوابل تحمل صحن الكنيسة. كرّسها البابا يوحنا بولس الثاني في ثمانينيات القرن العشرين، وتضم نوافذ زجاجية ملوّنة كبيرة تمزج بين مشاهد من الكتاب المقدس وزخارف أفريقية. إطلالة جميلة على البحيرة وحيّ بلاتو.",
      tips: "ارتدِ ملابس محتشمة، وتجنّب الزيارة أثناء القداديس.",
    },
    "musee-des-civilisations-de-cote-d-ivoire": {
      name: "متحف حضارات كوت ديفوار",
      summary: "المتحف الوطني الكبير: أقنعة وتماثيل وأدوات طقسية ويومية.",
      description:
        "يقع متحف حضارات كوت ديفوار في حيّ بلاتو، ويعرض واحدة من أغنى مجموعات الفن والإثنوغرافيا في البلاد: أقنعة وتماثيل لشعوب الدان والباولي والسينوفو والغورو والأكان، وقطع ذهبية، وآلات موسيقية، ومنسوجات. مدخل ممتاز إلى التنوع الثقافي الإيفواري قبل الانطلاق نحو الداخل.",
    },
    "parc-national-du-banco": {
      name: "متنزه بانكو الوطني",
      summary: "غابة أصلية محمية في قلب المدينة تتخللها مسارات للمشي.",
      description:
        "يقع متنزه بانكو الوطني داخل التجمع الحضري لأبيدجان، ويحمي غابة استوائية قديمة ذات أشجار عملاقة يعبرها نهر بانكو. تتيح المسارات التنزه في الظل ومراقبة الطيور والثدييات الصغيرة، وتكوين فكرة عن الغابة التي كانت تغطي جنوب البلاد كله في الماضي. وعلى أطرافه يغسل «الفانيكو»، وهم غسّالون تقليديون، الملابس يدويًا في النهر.",
      tips: "تعال في الصباح الباكر بحذاء مناسب ومع مرشد من المتنزه، ولا تبتعد وحدك عن المسارات.",
    },
    "maquis-et-attieke-abidjan": {
      name: "مطاعم الماكي والأتيكيه",
      summary: "سمك مشوي وألوكو وأتيكيه في مطاعم الماكي، قلب الحياة في أبيدجان.",
      description:
        "«الماكي»، أي المطعم الشعبي الذي يكون غالبًا في الهواء الطلق، مؤسسة إيفوارية عريقة. يُؤكل فيه السمك أو الدجاج المشوي مع الأتيكيه (سميد الكسافا المخمّر)، والألوكو (موز الطبخ المقلي)، وصلصة بذور النخيل أو الكيدجينو (يخنة تُطهى ببطء في قدر فخارية)، مع عصير البيساب أو النيامانكودجي (الزنجبيل). أما «الغاربا»، أي الأتيكيه مع التونة المقلية، فهو طبق الشارع بامتياز. ومطاعم الماكي الصاخبة في تريشفيل وماركوري وشارع برانسيس في يوبوغون هي أيضًا أماكن للموسيقى.",
      tips: "في المساء تنقّل بسيارة أجرة بدلًا من المشي، خاصةً في الأحياء الشعبية.",
    },
    "quartier-france-grand-bassam": {
      name: "الحيّ الفرنسي",
      summary: "المركز الإداري والتجاري الاستعماري القديم، المدرج في قائمة التراث العالمي.",
      description:
        "يقع الحيّ الفرنسي محصورًا بين البحيرة والمحيط، ويضم المباني الإدارية القديمة والبيوت التجارية والمنازل الاستعمارية التي جعلت من غران بسام أول ميناء وأول عاصمة للبلاد. رُمّم بعضها وبعضها الآخر آيل للسقوط، وهو ما يمنح المكان أجواءه الفريدة. وتساعد جولة سيرًا على الأقدام، ويُستحسن أن تكون مع مرشد، على فهم تنظيم المدينة الاستعمارية وتعايشها مع قرية النزيما المجاورة.",
      tips: "تجوّل في الصباح أو آخر النهار، حين يكون الضوء ناعمًا والحرّ أخف.",
    },
    "musee-national-du-costume-grand-bassam": {
      name: "المتحف الوطني للأزياء",
      summary: "في قصر الحكّام القديم: أزياء وحُليّ وتسريحات شعوب كوت ديفوار.",
      description:
        "يقع المتحف الوطني للأزياء في قصر الحكّام القديم، وهو مبنى استعماري رمزي في الحيّ الفرنسي، ويعرض الملابس التقليدية والحُليّ والتسريحات وأدوات الاحتفالات من مختلف مناطق البلاد، إضافة إلى صور قديمة ونماذج مصغّرة للمساكن. زيارة قصيرة وغنية بالمعلومات.",
    },
    "plage-de-grand-bassam": {
      name: "شاطئ غران بسام",
      summary: "شاطئ رملي طويل تحفّه أشجار جوز الهند والأكواخ القشية، وملتقى سكان أبيدجان.",
      description:
        "في عطلة نهاية الأسبوع، يجتذب الواجهة البحرية لغران بسام كثيرًا من سكان أبيدجان الذين يأتون للاستمتاع بالأكواخ الشاطئية ومطاعم السمك وهواء البحر. أما في أيام الأسبوع فالشاطئ أهدأ بكثير. يُقصد للاسترخاء ومشاهدة البحر أكثر من السباحة، فالتيارات خطرة جدًا.",
      tips: "لا يُنصح إطلاقًا بالسباحة (أمواج وتيارات عنيفة وشواطئ نادرًا ما تخضع للمراقبة).",
    },
    "fete-de-l-abissa": {
      name: "مهرجان الأبيسا",
      summary: "المهرجان السنوي الكبير لشعب النزيما: طبول ورقص وحرية في الكلام.",
      description:
        "في كل خريف، يحتفل شعب النزيما في غران بسام بالأبيسا، وهو في آنٍ واحد عيد للتجدد وطقس للتطهّر. على مدى أيام عدة، وعلى إيقاع الطبول المقدسة، ترقص الجماعة حول الملك، ويحق لكل فرد طوال مدة المهرجان أن ينتقد الآخرين علنًا، بمن فيهم أصحاب السلطة، دون خوف من العقاب. لحظة حماسة كبيرة تجتذب زوارًا كثيرين.",
      tips: "تحدّد السلطات التقليدية المواعيد كل عام: استعلم عنها قبل الحجز، واستأذن قبل التصوير.",
      bestPeriod: "أواخر أكتوبر – أوائل نوفمبر (تختلف المواعيد)",
    },
    "plage-d-assinie": {
      name: "شاطئ أسيني",
      summary: "كيلومترات من الرمال الذهبية تحفّها أشجار جوز الهند على جهة المحيط.",
      description:
        "على جهة المحيط، تمتد في أسيني شواطئ رملية شبه متصلة تتخللها الفنادق ومطاعم الواجهة البحرية وبساتين جوز الهند. غروب الشمس والنزهات الطويلة والسمك المشوي تحدد إيقاع الإقامة. وكما هو الحال على طول الساحل الإيفواري، المحيط قوي: استمتع بالشاطئ، لكن اسبح على جهة البحيرة.",
      tips: "لا تسبح في المحيط: التيارات (التي تُسمّى محليًا «البار») عنيفة.",
    },
    "lagune-aby-assinie": {
      name: "بحيرة آبي",
      summary: "نزهات بالقوارب وأنشطة مائية على بحيرة واسعة ذات جزر مشجّرة.",
      description:
        "خلف الشريط الرملي لأسيني تمتد بحيرة آبي، إحدى أكبر البحيرات الشاطئية في البلاد. مياهها الهادئة مناسبة للنزهات بالقوارب التقليدية أو الزوارق نحو الجزر المشجّرة وقرى الصيادين، وللرياضات المائية التي تقترحها الفنادق. وجه آخر لأسيني، أكثر هدوءًا.",
      tips: "اختر قاربًا مجهّزًا بسترات نجاة واتفق على السعر قبل الانطلاق.",
    },
    "basilique-notre-dame-de-la-paix": {
      name: "بازيليك سيدة السلام",
      summary: "بازيليك هائلة مستوحاة من كاتدرائية القديس بطرس في روما، بنوافذ زجاجية مذهلة.",
      description:
        "بُنيت بازيليك سيدة السلام في أواخر ثمانينيات القرن العشرين وكرّسها البابا يوحنا بولس الثاني عام 1990، وهي مستوحاة من كاتدرائية القديس بطرس في روما: قبة ضخمة وصفّ أعمدة يحيط بساحة واسعة. ويغمر داخلَها ضوءُ آلاف الأمتار المربعة من النوافذ الزجاجية الملوّنة. سواء رآها المرء مهيبة أو مبالغًا فيها، فهي من أكثر المعالم إثارة للدهشة في غرب أفريقيا.",
      tips: "يُشترط لباس يغطي الكتفين والساقين، وتتم الزيارة عادةً مع مرشد من الموقع.",
    },
    "lac-aux-caimans-yamoussoukro": {
      name: "بحيرة التماسيح",
      summary: "بحيرة بجوار المقر الرئاسي السابق، تسكنها تماسيح مقدسة.",
      description:
        "تؤوي البحيرة المحيطة بالمقر السابق لفيليكس هوفويه بوانيي تماسيح تُعدّ رمزًا للسلطة في التقاليد المحلية. ومنذ عقود يجتذب إطعام هذه الحيوانات في آخر النهار الفضوليين والزوار. تُشاهَد من الضفة وعلى مسافة آمنة.",
      tips: "ابقَ خلف الحواجز وبعيدًا عن الماء: إنها حيوانات برية وخطرة.",
    },
    "fondation-houphouet-boigny-yamoussoukro": {
      name: "مؤسسة فيليكس هوفويه بوانيي للبحث من أجل السلام",
      summary: "مبنى ضخم مكرّس للسلام، ورمز للعمارة الضخمة في المدينة.",
      description:
        "يحتضن هذا المبنى الكبير ذو الأسقف النحاسية، المطلّ على مسطّح مائي، المؤسسةَ التي أُنشئت لتعزيز السلام والحوار، كما يستضيف مؤتمرات دولية. ويجسّد، مع البازيليك وفندق «بريزيدان»، الطموح المعماري الذي شكّل ياموسوكرو.",
      tips: "تختلف شروط زيارة الداخل: استعلم في المكان.",
    },
    "dent-de-man": {
      name: "سنّ مان",
      summary: "قمة على شكل سنّ تطل على المدينة، لرحلة مشي ذات إطلالات بانورامية.",
      description:
        "بشكلها الشبيه بالضرس الذي يُعرف من بعيد، تُعدّ «سنّ مان» رمز المدينة. يستغرق صعودها، الشديد الانحدار في بعض المقاطع، نصف يوم انطلاقًا من القرى الواقعة عند سفح الكتلة الجبلية، عبر الحقول والغابة. ومن القمة يمتد المنظر فوق جبال المنطقة ووديانها.",
      tips: "انطلق باكرًا مع مرشد محلي وحذاء مناسب وكمية وافرة من الماء، وتجنّب أيام الأمطار الغزيرة (المسار زلق).",
      bestPeriod: "من نوفمبر إلى مارس (موسم الجفاف)",
    },
    "cascade-de-man": {
      name: "شلال مان",
      summary: "شلال في الغابة عند أطراف المدينة، يُبلغ عبر مسار قصير.",
      description:
        "على بُعد بضعة كيلومترات من المركز، ينحدر شلال مان بين الصخور وسط غابة كثيفة. ويسمح مسار مهيّأ وجسر صغير بالاقتراب منه. مكان منعش تحبه العائلات، ويكون أروع خلال موسم الأمطار وبعده.",
      bestPeriod: "من أغسطس إلى نوفمبر (تدفّق أقوى)",
    },
    "ponts-de-lianes-region-de-man": {
      name: "جسور النباتات المتسلقة",
      summary: "ممرات مضفورة من النباتات المتسلقة فوق الأنهار، تحيط بها الأسرار.",
      description:
        "في بعض قرى منطقة مان ودانانيه، تعبر الأنهارَ جسورٌ معلّقة مصنوعة من النباتات المتسلقة المضفورة. وبحسب التقاليد، يبنيها المُلقَّنون، ويُقال إنها تُعاد في ليلة واحدة بعيدًا عن الأنظار. تُنظَّم الزيارة مع سلطات القرية، مع احترام المحظورات المحلية.",
      tips: "تقع بعض القرى قرب الحدود الليبيرية والغينية: راجع خريطة اليقظة في توصيات السفر قبل الذهاب واستعن بمرشد محلي. وعادةً ما تطلب القرية مساهمة مالية.",
    },
    "port-de-peche-de-sassandra": {
      name: "ميناء الصيد في ساساندرا",
      summary: "عودة القوارب الكبيرة الملوّنة وسوق السمك على الشاطئ.",
      description:
        "كل يوم تعود قوارب الصيادين الكبيرة الملوّنة، وكثير منهم من أصل غاني، لترسو على شاطئ الميناء. ويقدّم تفريغ السمك وفرزه وبيعه، ثم تدخينه في الأفران المجاورة، مشهدًا زاخرًا بالألوان من حياة الساحل.",
      tips: "تعال عند عودة الصيادين في الصباح، واستأذن قبل تصوير الصيادين والبائعات.",
    },
    "embouchure-du-sassandra": {
      name: "مصبّ نهر ساساندرا",
      summary: "يلتقي النهر بالمحيط بين أشجار المانغروف والكثبان الرملية، ويُكتشف بالقارب.",
      description:
        "عند أطراف المدينة يصبّ نهر ساساندرا في المحيط. وتتيح نزهة بالقارب التقليدي صعود مجرى النهر بين أشجار المانغروف والقرى الواقعة على ضفافه، ومراقبة الطيور، والوصول إلى الضفاف الرملية عند المصبّ.",
      tips: "انطلق مع صاحب قارب يوصي به مكان إقامتك، واطلب سترات النجاة.",
    },
    "plages-de-sassandra": {
      name: "شواطئ ساساندرا",
      summary: "خلجان صخرية وشواطئ رملية تحفّها أشجار جوز الهند على جانبي المدينة.",
      description:
        "على جانبي ساساندرا، يتناوب الساحل بين رؤوس صخرية وخلجان صغيرة وشواطئ طويلة تحفّها أشجار جوز الهند وقرى الصيادين. وتتيح بعض النُّزل والفنادق الإقامة بهدوء بعيدًا عن صخب أبيدجان.",
      tips: "استعلم محليًا عن الأماكن التي تمكن فيها السباحة: التيارات قوية في الغالب.",
    },
    "toiles-de-fakaha": {
      name: "الأقمشة المرسومة في فاكاها",
      summary: "قرية فنانين تُصنع فيها «أقمشة كورهوغو» الشهيرة.",
      description:
        "في قرية فاكاها، يرسم الفنانون يدويًا على أقمشة قطنية منسوجة محليًا زخارف الحيوانات والأقنعة والشخصيات التي جعلت «أقمشة كورهوغو» معروفة في العالم كله. يمكن مشاهدتهم وهم يعملون وشراء أعمالهم منهم مباشرة.",
      tips: "راجع خريطة اليقظة الخاصة بالشمال قبل الذهاب، واستعن بمرشد من كورهوغو.",
    },
    "tisserands-de-waraniene": {
      name: "نسّاجو وارانييني",
      summary: "قرية نسّاجين يعملون على أنوال تقليدية للأشرطة الضيقة.",
      description:
        "عند مشارف كورهوغو، تشتهر قرية وارانييني بنسّاجيها الذين يصنعون على أنوال تقليدية أشرطة طويلة من القطن تُخاط بعد ذلك لتصبح أُزرًا أو مفارش أو ملابس. وتتيح تعاونية التعرّف إلى مراحل العمل والشراء في المكان.",
      tips: "راجع خريطة اليقظة الخاصة بالشمال قبل الذهاب.",
    },
    "faune-de-la-comoe": {
      name: "الحياة البرية والمناظر في كومويه",
      summary: "سافانا وغابات محاذية للأنهار وثدييات كبيرة على امتداد نهر كومويه.",
      description:
        "يدين المتنزه بثرائه لتنوّع بيئاته التي تشكّل انتقالًا بين الغابة والسافانا. ونهر كومويه وروافده هي شريانه الحيوي، تتردد عليها أفراس النهر وطيور كثيرة. وبعد سنوات من الصيد الجائر، أتاحت جهود الحماية شطبه من قائمة التراث العالمي المعرّض للخطر عام 2017. وفي الوقت الحالي، تنصح توصيات السفر الفرنسية والبريطانية بشدة بعدم التوجه إلى المنطقة.",
      tips: "لا تذهب إليه ما دامت توصيات السفر الرسمية تنصح بشدة بعدم التوجه إليه، وراجعها بانتظام.",
      bestPeriod: "موسم الجفاف (من ديسمبر إلى أبريل)، حين تسمح الظروف الأمنية",
    },
  },
  circuits: {
    "cote-d-ivoire-essentiel-8-jours": {
      title: "أساسيات كوت ديفوار في 8 أيام",
      summary:
        "أبيدجان ومطاعم الماكي فيها، وغابة بانكو، ومدينة غران بسام التاريخية، وشواطئ أسيني وبحيرتها، ثم بازيليك ياموسوكرو.",
    },
    "cote-d-ivoire-montagnes-de-man-6-jours": {
      title: "ياموسوكرو وجبال مان في 6 أيام",
      summary:
        "من الوسط إلى الغرب: بازيليك ياموسوكرو، ثم قمم منطقة مان وشلالاتها وقراها. يُنصح بالسفر بسيارة مع سائق.",
    },
  },
  stepNotes: {
    "cote-d-ivoire-essentiel-8-jours:0": "الوصول واكتشاف حيّ بلاتو.",
    "cote-d-ivoire-essentiel-8-jours:2": "صباح في الغابة، وسهرة في أحد مطاعم الماكي.",
    "cote-d-ivoire-essentiel-8-jours:4": "الطريق إلى غران بسام (نحو ساعة بحسب حركة المرور).",
    "cote-d-ivoire-essentiel-8-jours:7": "الطريق إلى أسيني وبعد الظهر على شاطئ المحيط.",
    "cote-d-ivoire-essentiel-8-jours:8": "يوم استرخاء بين البحيرة والشاطئ.",
    "cote-d-ivoire-essentiel-8-jours:9": "العودة نحو أبيدجان ثم الطريق السريع الشمالي حتى ياموسوكرو: يوم طويل على الطريق.",
    "cote-d-ivoire-essentiel-8-jours:13": "العودة إلى أبيدجان عبر الطريق السريع.",
    "cote-d-ivoire-montagnes-de-man-6-jours:0": "انطلاق مبكر من أبيدجان عبر الطريق السريع الشمالي.",
    "cote-d-ivoire-montagnes-de-man-6-jours:2": "طريق طويل نحو الغرب حتى مان؛ لا تقُد ليلًا.",
    "cote-d-ivoire-montagnes-de-man-6-jours:3": "صعود صباحي مع مرشد محلي.",
    "cote-d-ivoire-montagnes-de-man-6-jours:4": "يوم أهدأ: الشلال ولقاء حرفيي المدينة.",
    "cote-d-ivoire-montagnes-de-man-6-jours:5": "العودة نحو ياموسوكرو لتقسيم الرحلة.",
    "cote-d-ivoire-montagnes-de-man-6-jours:6": "العودة إلى أبيدجان.",
  },
};

export const COTE_IVOIRE_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
