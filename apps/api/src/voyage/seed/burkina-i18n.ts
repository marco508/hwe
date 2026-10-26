/**
 * Traductions du contenu de départ du guide Burkina Faso (voir ./burkina.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de burkina.ts. Contenu non relu : à vérifier comme le reste du seed.
 * Aucun circuit (pays formellement déconseillé) : `circuits` et `stepNotes` vides.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES_SECU =
  "Actualmente se desaconseja formalmente viajar a todo Burkina Faso: este lugar se presenta para preparar un viaje futuro, cuando los consejos oficiales lo permitan.";
const PT_SECU =
  "Atualmente, todo o Burkina Faso está formalmente desaconselhado aos viajantes: este local é apresentado para preparar uma viagem futura, quando os conselhos oficiais o permitirem.";
const AR_SECU =
  "يُنصح حاليًا بشدة بعدم السفر إلى أي منطقة من بوركينا فاسو: يُعرض هذا المكان للتحضير لرحلة مستقبلية حين تسمح بذلك التوصيات الرسمية.";

const ES: SeedI18n = {
  guide: {
    intro:
      "Francia y el Reino Unido desaconsejan hoy formalmente todo viaje a Burkina Faso por la amenaza terrorista y el riesgo de secuestro: esta guía presenta el patrimonio del «país de los hombres íntegros» para preparar un viaje cuando las condiciones lo permitan. La mezquita de tierra de Bobo-Dioulasso, las ruinas de Loropéni inscritas en la UNESCO, las casas pintadas de Tiébélé, las cascadas y los picos de arenisca de la región de Banfora y, en Uagadugú, el FESPACO, gran cita del cine africano: el país posee uno de los patrimonios culturales más ricos de África Occidental.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado; los ciudadanos de varios países de África Occidental están exentos. Los requisitos (visado en línea, documentos) cambian: compruébelos con las autoridades burkinesas y en los consejos de viaje de su país antes de cualquier proyecto. Tenga en cuenta que Francia ya no tiene embajada ni consulado abiertos en Uagadugú.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos (repelente, mosquitera). El país se encuentra en el «cinturón de la meningitis»: pregunte a su médico por las vacunas recomendadas. Beba agua embotellada y protéjase bien del calor.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA). El efectivo es imprescindible; el pago por móvil (mobile money) está muy extendido. Las tarjetas bancarias solo se aceptan en algunos hoteles y comercios de las grandes ciudades.",
      },
      {
        title: "Cuándo ir",
        body: "La estación seca y relativamente fresca, de noviembre a febrero, es la más agradable, con el harmattan (viento seco y polvoriento procedente del Sáhara). De marzo a mayo el calor se vuelve muy intenso. La estación de lluvias va aproximadamente de junio a septiembre, más larga en el suroeste y más corta en el Sahel, al norte.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua de la administración y la más utilizada por los viajeros; en el día a día se hablan, entre otras, el mooré, el diula y el fulfulde. Los saludos, largos y cuidadosos, son fundamentales antes de pedir cualquier cosa. Las tradiciones (jefaturas, máscaras, lugares sagrados) siguen muy vivas: respete las indicaciones y pida siempre permiso antes de fotografiar a una persona, un lugar sagrado o una ceremonia.",
      },
      {
        title: "Desplazarse",
        body: "En las ciudades se circula en taxi o en vehículos de dos ruedas; entre ciudades, compañías de autocares unen las principales localidades. Sin embargo, las carreteras interurbanas están especialmente expuestas a ataques y secuestros: no planifique ningún desplazamiento sin consultar los consejos oficiales actualizados, que hoy desaconsejan todo viaje al país.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo C y E (enchufes europeos). Los cortes de electricidad son frecuentes. Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al mobile money.",
      },
      {
        title: "Seguridad",
        body: "En la fecha de redacción, France Diplomatie («Conseils aux voyageurs») desaconseja formalmente todo desplazamiento a Burkina Faso, en todo el territorio, incluida Uagadugú, y el Ministerio de Asuntos Exteriores británico (FCDO) desaconseja todo viaje al país. Estas recomendaciones se deben a la presencia de grupos armados, la amenaza terrorista, el riesgo de secuestro y una situación política inestable; además, las relaciones diplomáticas con Francia están rotas, lo que limita mucho la asistencia consular. Es posible que los seguros de viaje no cubran una estancia en una zona desaconsejada. Esta guía no pretende organizar un viaje hoy: consulte France Diplomatie, el FCDO o los consejos de su propio país y espere a que sus recomendaciones cambien.",
      },
    ],
  },
  destinations: {
    ouagadougou: {
      name: "Uagadugú",
      region: "Kadiogo (antiguo Centre)",
      summary: "Capital del país y de los mossi, ciudad del FESPACO y de la artesanía.",
      description:
        "Sede del Mogho Naaba, rey de los mossi de Uagadugú, la capital es también la capital cultural del país: FESPACO, Salón Internacional de la Artesanía, Museo Nacional, una animada escena musical y teatral, y maquis (restaurantes populares) donde se sirve pollo a la parrilla. Como el resto del país, la ciudad está hoy formalmente desaconsejada a los viajeros por las autoridades francesas y británicas.",
    },
    "bobo-dioulasso": {
      region: "Guiriko (antiguo Hauts-Bassins)",
      summary: "Segunda ciudad del país, famosa por su gran mezquita de tierra y su vida musical.",
      description:
        "Capital económica histórica del oeste, Bobo-Dioulasso conserva un corazón antiguo, el barrio de Dioulassoba, y una gran mezquita de tierra convertida en emblema del país. Ciudad de música (balafón, yembé), de máscaras y de cabarés donde se sirve dolo, acoge la Semana Nacional de la Cultura. Zona hoy formalmente desaconsejada a los viajeros, como todo el país.",
    },
    banfora: {
      name: "Banfora y la región de las Cascadas",
      region: "Tannounyan (antigua Cascades)",
      summary: "Cascadas, un lago con hipopótamos y espectaculares formaciones de arenisca.",
      description:
        "En el suroeste del país, la región de Banfora es la más verde de Burkina Faso: campos de caña de azúcar, huertos de mangos, las cascadas de Karfiguéla, las cúpulas de Fabédougou, el lago de Tengréla y, más al oeste, los sorprendentes picos de Sindou. Un patrimonio natural notable, en una zona hoy formalmente desaconsejada a los viajeros como el resto del país.",
    },
    loropeni: {
      name: "Loropéni y el país lobi",
      region: "Djôrô (antiguo Sud-Ouest)",
      summary: "Las milenarias ruinas de piedra de Loropéni, primer sitio UNESCO del país.",
      description:
        "En el suroeste, entre Gaoua y la frontera marfileña, el país lobi conserva las ruinas de Loropéni, primer sitio de Burkina Faso inscrito en el Patrimonio Mundial de la UNESCO (2009), así como una arquitectura y unas tradiciones singulares. Como todo el país, la región está hoy formalmente desaconsejada a los viajeros.",
    },
    tiebele: {
      name: "Tiébélé y el país kassena",
      region: "Nazinon (antiguo Centre-Sud)",
      summary: "La corte real de casas pintadas de los kassena, cerca de la frontera con Ghana.",
      description:
        "En el sur del país, cerca de Ghana, Tiébélé es famosa por su corte real, cuyas casas de tierra están cubiertas de pinturas geométricas realizadas por las mujeres kassena. No muy lejos, el rancho de caza de Nazinga protege elefantes y antílopes. Una región de patrimonio excepcional, hoy formalmente desaconsejada a los viajeros como el resto del país.",
    },
    "gorom-gorom": {
      name: "Gorom-Gorom y el Sahel",
      region: "Liptako (antiguo Sahel)",
      summary: "Mercado saheliano y dunas del Oudalan: un patrimonio hoy inaccesible.",
      description:
        "En los confines de Malí y Níger, el Sahel burkinés era famoso por el gran mercado de Gorom-Gorom, encrucijada de tuaregs, peules, bellas y songhay, y por las dunas y la laguna de Oursi. Esta región es una de las más afectadas por la violencia armada y es objeto de las recomendaciones más estrictas: solo se presenta aquí como patrimonio.",
    },
    "koudougou": {
      name: "Koudougou y el Centro-Oeste",
      region: "Nando (antiguo Centre-Ouest)",
      summary: "Ciudad de las Nuits atypiques, cerca de los cocodrilos sagrados de Sabou.",
      description: "A unos cien kilómetros al oeste de Uagadugú, Koudougou es conocida por su festival de las Nuits atypiques, uno de los festivales de música más antiguos del país. Unos veinte kilómetros al sur, en la carretera de Bobo-Dioulasso, la charca de los cocodrilos sagrados de Sabou era una de las paradas clásicas del país. Región hoy formalmente desaconsejada a los viajeros, como todo Burkina Faso.",
    },
    "dedougou": {
      name: "Dédougou y el Bucle del Mouhoun",
      region: "Bankui (antiguo Boucle du Mouhoun)",
      summary: "Tierra de las máscaras bwaba, del FESTIMA y de la antigua metalurgia del hierro.",
      description: "En el oeste del país, dentro del gran bucle del río Mouhoun (Volta Negro), Dédougou acoge cada dos años el Festival Internacional de las Máscaras y las Artes (FESTIMA). Cerca, en Douroula, se encuentra uno de los cinco sitios de metalurgia antigua del hierro inscritos en el Patrimonio Mundial de la UNESCO en 2019. Región hoy formalmente desaconsejada a los viajeros, como todo el país.",
    },
    "parcs-w-arly": {
      name: "Parques del W y de Arly",
      region: "Este (provincia de Tapoa)",
      summary: "La parte burkinesa del complejo W-Arly-Pendjari, gran sitio natural de la UNESCO.",
      description: "En el extremo este del país, en las fronteras de Níger y Benín, los parques del W y de Arly forman con la Pendjari beninesa el complejo W-Arly-Pendjari, inscrito en el Patrimonio Mundial de la UNESCO (ampliación de 2017): el mayor conjunto de sabanas protegidas de África Occidental, refugio de elefantes, leones, búfalos y antílopes. Esta región es una de las más afectadas por la violencia armada y es objeto de las recomendaciones más estrictas: solo se presenta aquí como patrimonio.",
    },
  },
  places: {
    "musee-national-burkina-faso": {
      name: "Museo Nacional de Burkina Faso",
      summary: "Máscaras, estatuaria, trajes y objetos de los numerosos pueblos del país.",
      description:
        "El Museo Nacional presenta la diversidad cultural de Burkina Faso a través de sus colecciones de máscaras, estatuas, trajes, joyas y objetos cotidianos. Una valiosa introducción a las tradiciones de los mossi, bobo, lobi, gurunsi, peules y demás pueblos del país.",
      tips: ES_SECU,
    },
    "ceremonie-du-moro-naba": {
      name: "Ceremonia del Moro-Naba",
      summary: "Ritual semanal de la corte del rey de los mossi, llamado de la «falsa partida».",
      description:
        "Cada viernes, delante del palacio del Mogho Naaba (o Moro-Naba), rey de los mossi de Uagadugú, tiene lugar una breve ceremonia tradicional llamada de la «falsa partida»: según la tradición, el rey, listo para marcharse, es retenido por sus dignatarios. Un ritual que muestra la importancia que sigue teniendo la jefatura mossi.",
      tips: "Vestimenta correcta, discreción y respeto estricto de las indicaciones, sobre todo en cuanto a las fotos. " + ES_SECU,
    },
    fespaco: {
      summary: "El Festival Panafricano de Cine y Televisión de Uagadugú, cada dos años.",
      description:
        "Creado en 1969, el FESPACO es el mayor festival de cine del continente africano. Cada dos años, Uagadugú acoge proyecciones, encuentros profesionales y un mercado del cine; el gran premio, el Semental de Oro de Yennenga, lleva el nombre de la princesa legendaria, madre fundadora del pueblo mossi.",
      tips: "Los organizadores publican las fechas y el programa en cada edición. " + ES_SECU,
      bestPeriod: "Años impares, generalmente en febrero o a principios de marzo",
    },
    "siao-ouagadougou": {
      name: "Salón Internacional de la Artesanía de Uagadugú (SIAO)",
      summary: "Gran salón bienal de la artesanía africana: bronces, textiles, cuero, cestería.",
      description:
        "Organizado cada dos años en Uagadugú desde finales de los años ochenta, el SIAO reúne a artesanos de Burkina Faso y de numerosos países africanos: bronces fundidos a la cera perdida, textiles tejidos (entre ellos el Faso Dan Fani, la tela nacional), marroquinería, cerámica y cestería. Un escaparate de saberes del que el país está muy orgulloso.",
      tips: "Los organizadores publican las fechas en cada edición. " + ES_SECU,
    },
    "grande-mosquee-bobo-dioulasso": {
      name: "Gran Mezquita de Bobo-Dioulasso",
      summary: "Obra maestra de la arquitectura de tierra sudano-saheliana, erizada de estacas de madera.",
      description:
        "Construida a finales del siglo XIX en el barrio de Dioulassoba, la Gran Mezquita es uno de los mejores ejemplos de arquitectura sudano-saheliana: muros de banco (adobe) blanqueados con revoque, contrafuertes cónicos y vigas de madera salientes que sirven de andamio durante las restauraciones. Figura en la Lista Indicativa del Patrimonio Mundial de la UNESCO.",
      tips: "Ropa que cubra; visita según las normas de la comunidad, nunca durante las oraciones. " + ES_SECU,
    },
    "quartier-de-dioulassoba": {
      name: "Barrio antiguo de Dioulassoba",
      summary: "El núcleo antiguo de la ciudad, con callejuelas de tierra y barrios de herreros y griots.",
      description:
        "Dioulassoba es el barrio histórico de Bobo-Dioulasso, fundado por los bobo. Sus callejuelas de casas de adobe albergan familias de herreros, griots y artesanos, así como lugares sagrados; el arroyo Houet, que lo bordea, es conocido por sus siluros, considerados sagrados. La visita se hace tradicionalmente con un guía del barrio.",
      tips: "Respete las prohibiciones que indique el guía (fotos, lugares sagrados). " + ES_SECU,
    },
    "semaine-nationale-de-la-culture": {
      name: "Semana Nacional de la Cultura (SNC)",
      summary: "Gran bienal cultural: música, danzas, máscaras, teatro y concursos.",
      description:
        "Cada dos años, Bobo-Dioulasso acoge la Semana Nacional de la Cultura, que reúne a grupos y artistas de todas las regiones del país: músicas y danzas tradicionales, salidas de máscaras, teatro, artes plásticas, gastronomía, concursos y grandes conciertos. Una ocasión única para descubrir la diversidad cultural burkinesa.",
      tips: "Los organizadores publican las fechas en cada edición. " + ES_SECU,
    },
    "dolo-et-cuisine-bobo-dioulasso": {
      name: "Dolo y cocina burkinesa",
      summary: "Cerveza de mijo de los cabarés, tô, riz gras y pollo a la parrilla.",
      description:
        "El dolo, cerveza de mijo elaborada por las mujeres (las dolotières) y servida en calabazas, se bebe en los cabarés de barrio, auténticos lugares de convivencia. En el plato: el tô (pasta de mijo o maíz servida con salsa), el riz gras (arroz cocinado en una salsa sabrosa), las brochetas y el pollo a la parrilla, sin olvidar el zumo de bissap (hibisco) o de jengibre.",
      tips: ES_SECU,
    },
    "cascades-de-karfiguela": {
      name: "Cascadas de Karfiguéla",
      summary: "Sucesión de saltos de agua sobre losas de arenisca, en medio de una vegetación exuberante.",
      description:
        "A pocos kilómetros al noroeste de Banfora, el río Comoé desciende por una serie de escalones de arenisca en cascadas y pozas naturales, rodeadas de grandes árboles. El sitio, uno de los más conocidos del país, es más espectacular durante la estación de lluvias y justo después.",
      tips: ES_SECU,
      bestPeriod: "Final de la estación de lluvias (septiembre a noviembre)",
    },
    "domes-de-fabedougou": {
      name: "Cúpulas de Fabédougou",
      summary: "Curiosas formaciones redondeadas de arenisca esculpidas por la erosión.",
      description:
        "No lejos de las cascadas de Karfiguéla, las cúpulas de Fabédougou forman un conjunto de rocas de arenisca de formas redondeadas, modeladas por la erosión. Un paisaje sorprendente, ideal para caminar y fotografiar, sobre todo al final del día.",
      tips: ES_SECU,
    },
    "lac-de-tengrela": {
      name: "Lago de Tengréla",
      summary: "Lago tranquilo donde viven hipopótamos, para descubrir en piragua.",
      description:
        "Al oeste de Banfora, el lago de Tengréla alberga una población de hipopótamos que los pescadores del pueblo vecino muestran en piragua. Nenúfares, aves y la luz del atardecer componen una escena muy apacible.",
      tips: "Mantenga siempre una distancia respetuosa con los hipopótamos. " + ES_SECU,
    },
    "pics-de-sindou": {
      name: "Picos de Sindou",
      summary: "Cadena de agujas de arenisca cinceladas por la erosión, lugar emblemático del país senufo.",
      description:
        "Al oeste de Banfora, cerca de Sindou, una larga cresta de arenisca ha sido recortada por la erosión en agujas, chimeneas y arcos. Este paisaje espectacular es también un lugar cargado de significado para los senufo de la región, que tienen allí sitios sagrados. Se recorre a pie con un guía local.",
      tips: "Algunos sitios son sagrados: siga las indicaciones del guía. " + ES_SECU,
    },
    "ruines-de-loropeni": {
      name: "Ruinas de Loropéni",
      summary: "Altas murallas de laterita de una fortaleza de al menos mil años de antigüedad.",
      description:
        "Las ruinas de Loropéni son los vestigios mejor conservados de un conjunto de fortificaciones de piedra de la región: un recinto de muros de laterita que alcanzan varios metros de altura. Con al menos mil años de antigüedad según la UNESCO, están asociadas al comercio transahariano del oro; sus constructores y su función exacta siguen siendo objeto de investigación. Inscritas en el Patrimonio Mundial en 2009.",
      tips: ES_SECU,
    },
    "musee-de-gaoua": {
      name: "Museo de las Civilizaciones del Suroeste (Gaoua)",
      summary: "Las culturas lobi, gan, dagara y vecinas: estatuaria, objetos rituales, vivienda.",
      description:
        "En Gaoua, capital de la región, el museo presenta a los pueblos del suroeste de Burkina Faso, en particular a los lobi: estatuillas rituales, objetos cotidianos, adornos y maquetas de viviendas. Una clave indispensable para comprender la región y sus ruinas.",
      tips: ES_SECU,
    },
    "habitat-lobi": {
      name: "Vivienda tradicional lobi",
      summary: "Recintos fortificados de tierra, de muros gruesos y pocas aberturas.",
      description:
        "Los lobi viven tradicionalmente en recintos de tierra dispersos por el campo, de muros gruesos y escasas aberturas: auténticas pequeñas fortalezas familiares. Altares y estatuillas dan testimonio de una rica vida religiosa. Estas casas están habitadas: solo se visitan con el consentimiento de las familias, a través de un guía local.",
      tips: ES_SECU,
    },
    "cour-royale-de-tiebele": {
      name: "Corte real de Tiébélé",
      summary: "Casas de tierra adornadas con motivos geométricos pintados por las mujeres.",
      description:
        "La corte real de Tiébélé reúne viviendas kassena de tierra, de formas distintas según sus ocupantes, cuyos muros están decorados con motivos geométricos y simbólicos en negro, blanco y ocre rojo. Estas pinturas, realizadas y renovadas periódicamente por las mujeres con pigmentos naturales, hacen del conjunto una de las joyas arquitectónicas de África Occidental, inscrita en la Lista del Patrimonio Mundial de la UNESCO en 2024.",
      tips: "Lugar habitado: visita guiada según las normas de la corte; pida permiso antes de fotografiar a las personas. " + ES_SECU,
    },
    "ranch-de-nazinga": {
      name: "Rancho de caza de Nazinga",
      summary: "Reserva de sabana arbolada conocida por sus elefantes y antílopes.",
      description:
        "Entre Pô y la frontera con Ghana, el rancho de caza de Nazinga protege una amplia zona de sabana arbolada y charcas. Tradicionalmente se observaban elefantes, antílopes, monos, cocodrilos y numerosas aves, sobre todo en la estación seca, cuando los animales se reúnen en torno a los puntos de agua.",
      tips: ES_SECU,
      bestPeriod: "Estación seca (diciembre a abril)",
    },
    "marche-de-gorom-gorom": {
      name: "Mercado de Gorom-Gorom",
      summary: "Gran mercado semanal saheliano, punto de encuentro de ganaderos y caravanas.",
      description:
        "El mercado semanal de Gorom-Gorom era uno de los más célebres del Sahel: ganado, camellos, cuero, joyas, esteras y productos del desierto se intercambiaban en una mezcla de pueblos y vestimentas. Sigue siendo un símbolo de las culturas nómadas y pastoriles del norte del país.",
      tips: "Una de las zonas más peligrosas del país, formalmente desaconsejada: se presenta solo como patrimonio. " + ES_SECU,
    },
    "mare-et-dunes-d-oursi": {
      name: "Laguna y dunas de Oursi",
      summary: "Humedal saheliano protegido y cordones de dunas de arena.",
      description:
        "Al noroeste de Gorom-Gorom, la laguna de Oursi es un humedal de importancia internacional (sitio Ramsar) que atrae a numerosas aves acuáticas y a los rebaños de los ganaderos. Está bordeada de dunas de arena anaranjada, uno de los paisajes más emblemáticos del Sahel burkinés.",
      tips: "Una de las zonas más peligrosas del país, formalmente desaconsejada: se presenta solo como patrimonio. " + ES_SECU,
    },
    "maison-du-peuple-ouagadougou": {
      name: "Casa del Pueblo (Maison du peuple)",
      summary: "Gran sala de espectáculos y mítines de los años sesenta, con el techo erizado de linternas.",
      description: "Terminada en 1965 según los planos del arquitecto René Faublée, la Casa del Pueblo es uno de los edificios emblemáticos del centro de Uagadugú: un gran volumen de fachadas ocres coronado por linternas en forma de chozas. Ha acogido congresos, mítines, conciertos y grandes ceremonias de la historia del país. Burkina Faso la inscribió en 2026 en su Lista Indicativa del Patrimonio Mundial de la UNESCO como ejemplo de arquitectura moderna.",
      tips: "Edificio público: el interior solo se visita con motivo de eventos. " + ES_SECU,
    },
    "memorial-thomas-sankara": {
      name: "Memorial y mausoleo Thomas Sankara",
      summary: "El lugar de memoria del presidente Thomas Sankara, en el sitio donde fue asesinado en 1987.",
      description: "El memorial se levanta en el recinto del Conseil de l'Entente, donde el presidente Thomas Sankara y doce de sus compañeros fueron asesinados el 15 de octubre de 1987. Comprende una gran estatua del «padre de la revolución», la sala donde ocurrió el drama y, desde mayo de 2025, un mausoleo diseñado por el arquitecto burkinés Francis Kéré, premio Pritzker, donde reposan las trece víctimas. Un lugar de recogimiento muy visitado, sobre todo en torno al 15 de octubre.",
      tips: "Lugar de memoria: vestimenta correcta y actitud respetuosa; infórmese en el lugar sobre las fotos. " + ES_SECU,
    },
    "cathedrale-de-ouagadougou": {
      name: "Catedral de la Inmaculada Concepción",
      summary: "La gran catedral de ladrillo ocre del centro, construida en los años treinta.",
      description: "Construida en los años treinta con ladrillos de tierra, la catedral de la Inmaculada Concepción es uno de los grandes edificios religiosos del país y un punto de referencia del centro de Uagadugú. Su maciza fachada de dos torres, sus arcos y sus óculos azules destacan sobre una amplia explanada. Las grandes misas de Navidad y de Pascua reúnen a una multitud considerable.",
      tips: "Vestimenta correcta; no se visita durante los oficios. " + ES_SECU,
    },
    "musee-de-la-musique-ouagadougou": {
      name: "Museo de la Música Georges Ouédraogo",
      summary: "Balafones, tambores, arpas-laúd y flautas de las tradiciones musicales del país.",
      description: "Fundado en 1999 en el centro de Uagadugú, el Museo de la Música presenta unos trescientos instrumentos tradicionales de Burkina Faso, clasificados por familias: tambores, balafones, flautas, arpas-laúd, sanzas… Fotografías y explicaciones sitúan cada instrumento en su uso social, de la comunicación en las aldeas a las ceremonias. La visita es guiada.",
      tips: ES_SECU,
    },
    "grand-marche-rood-woko": {
      name: "Gran mercado Rood Woko",
      summary: "El gran mercado central de la capital, reconstruido tras el incendio de 2003.",
      description: "Rood Woko («gran mercado» en mooré) es el corazón comercial de Uagadugú desde los años sesenta. Destruido por un incendio en 2003, fue reconstruido y reabierto en 2009 en un edificio de ladrillo con amplios tejados. Telas y pagnes, especias, ferretería y productos cotidianos: una inmersión en el bullicio de la capital.",
      tips: "Mucha afluencia: vigile sus pertenencias y regatee con una sonrisa. " + ES_SECU,
    },
    "village-artisanal-de-ouagadougou": {
      name: "Aldea artesanal de Uagadugú",
      summary: "Cientos de artesanos trabajando: bronce, cuero, tejido, escultura, bogolan.",
      description: "Abierta en 2000, la Aldea artesanal de Uagadugú reúne alrededor de un patio central talleres y tiendas donde trabajan, según la época, entre 400 y 500 artesanos de más de veinticinco oficios: fundidores de bronce, marroquineros, tejedores, alfareros, escultores, tintoreros y fabricantes de instrumentos musicales. Se puede ver cómo nacen los objetos antes de comprarlos.",
      tips: ES_SECU,
    },
    "parc-urbain-bangr-weoogo": {
      name: "Parque urbano Bangr-Weoogo",
      summary: "El «bosque del saber», pulmón verde de 240 hectáreas en pleno centro.",
      description: "Antiguo bosque sagrado de los jefes mossi, el parque Bangr-Weoogo («bosque del saber» en mooré) protege 240 hectáreas de bosque en plena ciudad. Senderos para pasear y hacer deporte, charcas, aves, algunos animales y un pequeño museo de fauna lo convierten en el lugar de descanso preferido de los habitantes, sobre todo temprano por la mañana y al final de la tarde.",
      tips: ES_SECU,
    },
    "site-de-sculpture-de-laongo": {
      name: "Sitio de escultura en granito de Laongo",
      summary: "Un museo al aire libre: bloques de granito esculpidos por artistas de todo el mundo.",
      description: "A unos 35 km al noreste de Uagadugú, cerca de Ziniaré, un campo de bloques de granito se ha convertido desde 1989 en un museo de escultura al aire libre. En sucesivos simposios impulsados por el escultor burkinés Ky Siriki, artistas de numerosos países tallaron la piedra in situ, a veces combinándola con metal. Decenas de obras se descubren paseando entre las rocas.",
      tips: "Lleve sombrero y agua, el sitio tiene poca sombra. " + ES_SECU,
    },
    "crocodiles-sacres-de-bazoule": {
      name: "Charca de los cocodrilos sagrados de Bazoulé",
      summary: "Cocodrilos venerados y protegidos por los aldeanos, a 30 km de la capital.",
      description: "Según la tradición oral, un cocodrilo guio antaño a los habitantes de Bazoulé, azotados por la sequía, hasta un manantial: desde entonces, los cocodrilos de la charca del pueblo son venerados y protegidos. Acostumbrados a la presencia humana, se dejan acercar cuando los guardianes los alimentan, lo que ha convertido Bazoulé en una de las excursiones clásicas desde Uagadugú.",
      tips: "Son animales salvajes: siga estrictamente las indicaciones de los guardianes y respete el carácter sagrado del lugar. " + ES_SECU,
    },
    "maquis-et-soirees-de-ouagadougou": {
      name: "Maquis y noches de Uagadugú",
      summary: "El maquis, restaurante popular al aire libre, corazón de la vida social y nocturna.",
      description: "En Uagadugú, la vida nocturna transcurre en los maquis, restaurantes-bar populares al aire libre que se encuentran en todos los barrios. Allí se comparte pollo a la parrilla o «poulet bicyclette» (pollo de corral), pescado a la brasa, brochetas y bebidas frías, a menudo con música, y se arregla el mundo entre amigos. Durante el FESPACO, las Récréâtrales o las fiestas de fin de año, la ciudad trasnocha aún más.",
      tips: "Pida consejo a los habitantes para elegir un maquis animado y seguro. " + ES_SECU,
    },
    "gare-de-bobo-dioulasso": {
      name: "Estación de Bobo-Dioulasso",
      summary: "La estación de los años treinta de estilo neosudanés, en la línea Abiyán–Uagadugú.",
      description: "Abierta al tráfico en 1933-1934, cuando Bobo-Dioulasso se convirtió en la terminal provisional del ferrocarril procedente de Abiyán, la estación es uno de los edificios coloniales más fotografiados del país. Su fachada almenada, erizada de piezas de madera salientes, retoma los códigos de la arquitectura sudanesa de las mezquitas de tierra. Se encuentra muy cerca del centro.",
      tips: ES_SECU,
    },
    "village-de-koumi": {
      name: "Aldea de Koumi",
      summary: "Aldea bobo de casas de tierra adosadas a un escarpe rocoso.",
      description: "A unos 16 km de Bobo-Dioulasso, Koumi es una aldea bobo cuyos habitantes se vinculan al núcleo original de la ciudad, Sya. Sus casas de tierra, construidas contra un escarpe rocoso, reflejan la organización social y las creencias de la comunidad, que ha sabido preservar su arquitectura frente a la urbanización. Burkina Faso la inscribió en 2026 en su Lista Indicativa del Patrimonio Mundial.",
      tips: "Aldea habitada: visita con un guía local y el consentimiento de los habitantes. " + ES_SECU,
    },
    "village-de-koro": {
      name: "Aldea encaramada de Koro",
      summary: "Una aldea de tierra encaramada en una colina, a una docena de kilómetros de Bobo.",
      description: "A 12 km al este de Bobo-Dioulasso, la aldea de Koro ocupa la cima de una colina rocosa, en el extremo noreste del acantilado de Banfora. Según la tradición, sus habitantes se instalaron allí en la época de las guerras de Samory para ver llegar al enemigo. Sus casas de tierra aferradas a las rocas ofrecen una amplia vista sobre la llanura.",
      tips: "Aldea habitada: visita con un guía local; pida permiso antes de fotografiar. " + ES_SECU,
    },
    "mare-aux-hippopotames-bala": {
      name: "Charca de los hipopótamos de Bala",
      summary: "Reserva de biosfera de la UNESCO donde viven unos sesenta hipopótamos.",
      description: "A unos sesenta kilómetros al noreste de Bobo-Dioulasso, este bosque protegido desde 1937 rodea una charca alimentada por el Mouhoun (Volta Negro), donde viven unos sesenta hipopótamos. Reserva de biosfera de la UNESCO desde 1986 y sitio Ramsar, está gestionada por una asociación de aldeanos y figura desde 2026 en la Lista Indicativa del Patrimonio Mundial. Las salidas se hacían tradicionalmente en piragua con los pescadores.",
      tips: "Mantenga una gran distancia con los hipopótamos. " + ES_SECU,
      bestPeriod: "Estación seca (de diciembre a abril)",
    },
    "parc-national-kabore-tambi": {
      name: "Parque nacional Kaboré Tambi",
      summary: "Sabanas y bosques de galería a lo largo del Volta Rojo, entre Pô y Uagadugú.",
      description: "Creado en 1976 con el nombre de parque nacional de Pô, el parque Kaboré Tambi lleva el nombre de un guarda asesinado por cazadores furtivos en 1991. Sus 2427 km² de sabanas y bosques de galería, atravesados por el Volta Rojo, albergan elefantes, antílopes, monos, facóqueros y numerosas aves. Se extiende al norte de Pô, a ambos lados de la carretera Uagadugú–Pô.",
      tips: ES_SECU,
      bestPeriod: "Estación seca (de diciembre a abril)",
    },
    "mosquees-de-bani": {
      name: "Mezquitas de Bani",
      summary: "La «ciudad de las siete mezquitas» de tierra, obra maestra de la arquitectura saheliana.",
      description: "Al sur de Dori, la pequeña ciudad de Bani, apodada «la ciudad de las siete mezquitas», es famosa por sus mezquitas de tierra de altas torres afiladas, construidas en la colina y a sus pies, entre ellas la gran mezquita peul. Estos edificios figuran entre los mejores ejemplos de arquitectura de tierra del Sahel burkinés.",
      tips: "Una de las zonas más peligrosas del país, formalmente desaconsejada: se presenta solo como patrimonio. " + ES_SECU,
    },
    "crocodiles-sacres-de-sabou": {
      name: "Charca de los cocodrilos sagrados de Sabou",
      summary: "La charca de cocodrilos sagrados más célebre del país, en la carretera de Bobo-Dioulasso.",
      description: "A unos veinte kilómetros al sur de Koudougou, en la carretera nacional 1, Sabou es famosa por su charca de cocodrilos sagrados. La familia Kaboré, custodia del lugar, considera a estos animales como antepasados; están protegidos y son alimentados bajo el control de los guardianes, que permiten a los visitantes acercarse a ellos.",
      tips: "Animales salvajes: siga estrictamente las indicaciones de los guardianes. " + ES_SECU,
    },
    "festima-dedougou": {
      name: "FESTIMA, Festival Internacional de las Máscaras y las Artes",
      summary: "El gran encuentro de las sociedades de máscaras de África Occidental, en Dédougou.",
      description: "Creado en 1996, el FESTIMA reúne en Dédougou, en principio cada dos años, sociedades de máscaras de toda la región y de países vecinos: máscaras de hojas, fibras o madera de los bwaba, bobo, marka, mossi y otros pueblos, que bailan al son de tambores y flautas. El festival se acompaña de un coloquio y de exposiciones sobre el patrimonio de las máscaras.",
      tips: "Las máscaras son sagradas: siga las indicaciones de los organizadores y de los iniciados, sobre todo para las fotos. " + ES_SECU,
      bestPeriod: "Años pares, de febrero a mayo según la edición",
    },
    "site-metallurgique-de-douroula": {
      name: "Sitio de metalurgia antigua del hierro de Douroula",
      summary: "Los vestigios de producción de hierro más antiguos del país, inscritos en la UNESCO.",
      description: "Cerca de la aldea de Douroula, no lejos del Mouhoun, restos de hornos y escorias atestiguan una producción de hierro muy antigua, que la UNESCO remonta al siglo VIII antes de nuestra era. Douroula es uno de los cinco componentes de los «Sitios de metalurgia antigua del hierro de Burkina Faso», inscritos en el Patrimonio Mundial en 2019 junto con Tiwêga, Yamané, Kindibo y Békuy, donde también se conservan hornos en pie.",
      tips: ES_SECU,
    },
    "parc-national-d-arly": {
      name: "Parque nacional de Arly",
      summary: "Sabanas, colinas de arenisca y ríos de la reserva de Arly, en la frontera con Benín.",
      description: "Creada en 1954, la reserva total de fauna de Arly, a menudo llamada parque nacional de Arly, se extiende a lo largo del río Arly, en la frontera con la Pendjari beninesa. Colinas de arenisca, bosques de galería y humedales (sitio Ramsar desde 2009) albergaban una de las faunas más ricas del país. Forma parte del complejo W-Arly-Pendjari, inscrito en el Patrimonio Mundial.",
      tips: "Una de las zonas más peligrosas del país, formalmente desaconsejada: se presenta solo como patrimonio. " + ES_SECU,
    },
  },
  circuits: {},
  stepNotes: {},
};

const PT: SeedI18n = {
  guide: {
    intro:
      "A França e o Reino Unido desaconselham hoje formalmente qualquer viagem ao Burkina Faso, devido à ameaça terrorista e ao risco de rapto: este guia apresenta o património do «país dos homens íntegros» para preparar uma viagem quando as condições o permitirem. A mesquita de terra de Bobo-Dioulasso, as ruínas de Loropéni inscritas na UNESCO, as casas pintadas de Tiébélé, as cascatas e os picos de arenito da região de Banfora e, em Uagadugu, o FESPACO, grande encontro do cinema africano: o país possui um dos patrimónios culturais mais ricos da África Ocidental.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto; os cidadãos de vários países da África Ocidental estão isentos. As condições (visto online, documentos exigidos) mudam: confirme-as junto das autoridades burquinenses e nos conselhos aos viajantes do seu país antes de qualquer projeto. Note que a França já não tem embaixada nem consulado abertos em Uagadugu.",
      },
      {
        title: "Saúde",
        body: "O certificado de vacinação contra a febre-amarela é exigido à entrada. O paludismo está presente em todo o país: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos (repelente, mosquiteiro). O país situa-se na «cintura da meningite»: pergunte ao seu médico pelas vacinas recomendadas. Beba água engarrafada e proteja-se bem do calor.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa com o euro (1 € = 655,957 francos CFA). O dinheiro em numerário é indispensável; o pagamento por telemóvel (mobile money) está muito difundido. Os cartões bancários só são aceites em alguns hotéis e lojas das grandes cidades.",
      },
      {
        title: "Quando ir",
        body: "A estação seca e relativamente fresca, de novembro a fevereiro, é a mais agradável, com o harmatão (vento seco e poeirento vindo do Sara). De março a maio o calor torna-se muito intenso. A estação das chuvas vai aproximadamente de junho a setembro, mais longa no sudoeste e mais curta no Sahel, a norte.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua da administração e a mais utilizada pelos viajantes; no dia a dia falam-se, entre outras, o mooré, o diúla e o fula. Os cumprimentos, longos e cuidados, são essenciais antes de qualquer pedido. As tradições (chefaturas, máscaras, lugares sagrados) continuam muito vivas: siga as indicações e peça sempre autorização antes de fotografar uma pessoa, um lugar sagrado ou uma cerimónia.",
      },
      {
        title: "Deslocações",
        body: "Nas cidades circula-se de táxi ou de veículo de duas rodas; entre cidades, companhias de autocarros ligam as principais localidades. As estradas interurbanas estão, contudo, particularmente expostas a ataques e raptos: não planeie nenhuma deslocação sem consultar os conselhos oficiais atualizados, que hoje desaconselham qualquer viagem ao país.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas de tipo C e E (tomadas europeias). Os cortes de eletricidade são frequentes. Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao mobile money.",
      },
      {
        title: "Segurança",
        body: "À data de redação, o France Diplomatie («Conseils aux voyageurs») desaconselha formalmente qualquer deslocação ao Burkina Faso, em todo o território, incluindo Uagadugu, e o Ministério dos Negócios Estrangeiros britânico (FCDO) desaconselha qualquer viagem ao país. Estes avisos devem-se à presença de grupos armados, à ameaça terrorista, ao risco de rapto e a uma situação política instável; além disso, as relações diplomáticas com a França estão cortadas, o que limita fortemente a assistência consular. Os seguros de viagem podem não cobrir uma estadia numa zona desaconselhada. Este guia não se destina a organizar uma viagem hoje: consulte o France Diplomatie, o FCDO ou os conselhos do seu próprio país e aguarde que as suas recomendações mudem.",
      },
    ],
  },
  destinations: {
    ouagadougou: {
      name: "Uagadugu",
      region: "Kadiogo (antigo Centre)",
      summary: "Capital do país e dos mossi, cidade do FESPACO e do artesanato.",
      description:
        "Sede do Mogho Naaba, rei dos mossi de Uagadugu, a capital é também a capital cultural do país: FESPACO, Salão Internacional do Artesanato, Museu Nacional, uma animada cena musical e teatral, e maquis (restaurantes populares) onde se serve frango grelhado. Tal como o resto do país, a cidade está hoje formalmente desaconselhada aos viajantes pelas autoridades francesas e britânicas.",
    },
    "bobo-dioulasso": {
      region: "Guiriko (antiga Hauts-Bassins)",
      summary: "Segunda cidade do país, célebre pela sua grande mesquita de terra e pela vida musical.",
      description:
        "Capital económica histórica do oeste, Bobo-Dioulasso conservou um coração antigo, o bairro de Dioulassoba, e uma grande mesquita de terra que se tornou o emblema do país. Cidade de música (balafon, djembé), de máscaras e de cabarés onde se serve dolo, acolhe a Semana Nacional da Cultura. Zona hoje formalmente desaconselhada aos viajantes, como todo o país.",
    },
    banfora: {
      name: "Banfora e a região das Cascatas",
      region: "Tannounyan (antiga Cascades)",
      summary: "Cascatas, um lago com hipopótamos e espetaculares formações de arenito.",
      description:
        "No sudoeste do país, a região de Banfora é a mais verde do Burkina Faso: campos de cana-de-açúcar, pomares de mangueiras, as cascatas de Karfiguéla, as cúpulas de Fabédougou, o lago de Tengréla e, mais a oeste, os surpreendentes picos de Sindou. Um património natural notável, numa zona hoje formalmente desaconselhada aos viajantes, como o resto do país.",
    },
    loropeni: {
      name: "Loropéni e o país lobi",
      region: "Djôrô (antiga Sud-Ouest)",
      summary: "As ruínas de pedra milenares de Loropéni, primeiro sítio UNESCO do país.",
      description:
        "No sudoeste, entre Gaoua e a fronteira com a Costa do Marfim, o país lobi conserva as ruínas de Loropéni, primeiro sítio do Burkina Faso inscrito no Património Mundial da UNESCO (2009), bem como uma arquitetura e tradições singulares. Como todo o país, a região está hoje formalmente desaconselhada aos viajantes.",
    },
    tiebele: {
      name: "Tiébélé e o país kassena",
      region: "Nazinon (antiga Centre-Sud)",
      summary: "A corte real de casas pintadas dos kassena, perto da fronteira com o Gana.",
      description:
        "No sul do país, perto do Gana, Tiébélé é famosa pela sua corte real, cujas casas de terra estão cobertas de pinturas geométricas feitas pelas mulheres kassena. Não muito longe, o rancho de caça de Nazinga protege elefantes e antílopes. Uma região de património excecional, hoje formalmente desaconselhada aos viajantes, como o resto do país.",
    },
    "gorom-gorom": {
      name: "Gorom-Gorom e o Sahel",
      region: "Liptako (antigo Sahel)",
      summary: "Mercado saheliano e dunas do Oudalan: um património hoje inacessível.",
      description:
        "Nos confins do Mali e do Níger, o Sahel burquinense era outrora famoso pelo grande mercado de Gorom-Gorom, encruzilhada de tuaregues, fulas, bellas e songhai, e pelas dunas e pela lagoa de Oursi. Esta região é uma das mais afetadas pela violência armada e é objeto das recomendações mais estritas: é apresentada aqui apenas a título de património.",
    },
    "koudougou": {
      name: "Koudougou e o Centro-Oeste",
      region: "Nando (antigo Centre-Ouest)",
      summary: "Cidade das Nuits atypiques, perto dos crocodilos sagrados de Sabou.",
      description: "A cerca de cem quilómetros a oeste de Ouagadougou, Koudougou é conhecida pelo festival das Nuits atypiques, um dos festivais de música mais antigos do país. Cerca de vinte quilómetros a sul, na estrada para Bobo-Dioulasso, a lagoa dos crocodilos sagrados de Sabou era uma das paragens clássicas do país. Região hoje formalmente desaconselhada aos viajantes, como todo o Burkina Faso.",
    },
    "dedougou": {
      name: "Dédougou e a Curva do Mouhoun",
      region: "Bankui (antiga Boucle du Mouhoun)",
      summary: "Terra das máscaras bwaba, do FESTIMA e da antiga metalurgia do ferro.",
      description: "No oeste do país, dentro da grande curva do rio Mouhoun (Volta Negro), Dédougou acolhe de dois em dois anos o Festival Internacional das Máscaras e das Artes (FESTIMA). Perto, em Douroula, encontra-se um dos cinco sítios de metalurgia antiga do ferro inscritos no Património Mundial da UNESCO em 2019. Região hoje formalmente desaconselhada aos viajantes, como todo o país.",
    },
    "parcs-w-arly": {
      name: "Parques do W e de Arly",
      region: "Leste (província de Tapoa)",
      summary: "A parte burquinense do complexo W-Arly-Pendjari, grande sítio natural da UNESCO.",
      description: "No extremo leste do país, nas fronteiras com o Níger e o Benim, os parques do W e de Arly formam com a Pendjari beninense o complexo W-Arly-Pendjari, inscrito no Património Mundial da UNESCO (extensão de 2017): o maior conjunto de savanas protegidas da África Ocidental, refúgio de elefantes, leões, búfalos e antílopes. Esta região é uma das mais afetadas pela violência armada e é objeto das recomendações mais estritas: é apresentada aqui apenas como património.",
    },
  },
  places: {
    "musee-national-burkina-faso": {
      name: "Museu Nacional do Burkina Faso",
      summary: "Máscaras, estatuária, trajes e objetos dos numerosos povos do país.",
      description:
        "O Museu Nacional apresenta a diversidade cultural do Burkina Faso através das suas coleções de máscaras, estátuas, trajes, joias e objetos do quotidiano. Uma preciosa introdução às tradições dos mossi, bobo, lobi, gurunsi, fulas e dos outros povos do país.",
      tips: PT_SECU,
    },
    "ceremonie-du-moro-naba": {
      name: "Cerimónia do Moro-Naba",
      summary: "Ritual semanal da corte do rei dos mossi, dito da «falsa partida».",
      description:
        "Todas as sextas-feiras, diante do palácio do Mogho Naaba (ou Moro-Naba), rei dos mossi de Uagadugu, realiza-se uma breve cerimónia tradicional dita da «falsa partida»: segundo a tradição, o rei, pronto a partir, é retido pelos seus dignitários. Um ritual que mostra a importância que a chefatura mossi continua a ter.",
      tips: "Vestuário adequado, discrição e respeito estrito das indicações, sobretudo quanto às fotografias. " + PT_SECU,
    },
    fespaco: {
      summary: "O Festival Pan-Africano de Cinema e Televisão de Uagadugu, de dois em dois anos.",
      description:
        "Criado em 1969, o FESPACO é o maior festival de cinema do continente africano. De dois em dois anos, Uagadugu acolhe projeções, encontros profissionais e um mercado do filme; o grande prémio, o Garanhão de Ouro de Yennenga, tem o nome da princesa lendária, mãe fundadora do povo mossi.",
      tips: "As datas e o programa são publicados pelos organizadores em cada edição. " + PT_SECU,
      bestPeriod: "Anos ímpares, geralmente em fevereiro ou no início de março",
    },
    "siao-ouagadougou": {
      name: "Salão Internacional do Artesanato de Uagadugu (SIAO)",
      summary: "Grande salão bienal do artesanato africano: bronzes, têxteis, couro, cestaria.",
      description:
        "Organizado de dois em dois anos em Uagadugu desde o final dos anos 1980, o SIAO reúne artesãos do Burkina Faso e de numerosos países africanos: bronzes fundidos pela técnica da cera perdida, têxteis tecidos (entre eles o Faso Dan Fani, o pano nacional), marroquinaria, olaria e cestaria. Uma montra de saberes de que o país muito se orgulha.",
      tips: "As datas são publicadas pelos organizadores em cada edição. " + PT_SECU,
    },
    "grande-mosquee-bobo-dioulasso": {
      name: "Grande Mesquita de Bobo-Dioulasso",
      summary: "Obra-prima da arquitetura de terra sudano-saheliana, eriçada de estacas de madeira.",
      description:
        "Construída no final do século XIX no bairro de Dioulassoba, a Grande Mesquita é um dos mais belos exemplos de arquitetura sudano-saheliana: paredes de banco (adobe) branqueadas pelo reboco, contrafortes cónicos e peças de madeira salientes que servem de andaime durante as reparações. Consta da Lista Indicativa do Património Mundial da UNESCO.",
      tips: "Roupa que cubra o corpo; visita segundo as regras da comunidade, nunca durante as orações. " + PT_SECU,
    },
    "quartier-de-dioulassoba": {
      name: "Bairro antigo de Dioulassoba",
      summary: "O núcleo antigo da cidade, com ruelas de terra e bairros de ferreiros e griots.",
      description:
        "Dioulassoba é o bairro histórico de Bobo-Dioulasso, fundado pelos bobo. As suas ruelas de casas de adobe abrigam famílias de ferreiros, griots e artesãos, bem como lugares sagrados; o riacho Houet, que o ladeia, é conhecido pelos seus peixes-gato, considerados sagrados. A visita faz-se tradicionalmente com um guia do bairro.",
      tips: "Respeite as interdições indicadas pelo guia (fotografias, lugares sagrados). " + PT_SECU,
    },
    "semaine-nationale-de-la-culture": {
      name: "Semana Nacional da Cultura (SNC)",
      summary: "Grande bienal cultural: música, danças, máscaras, teatro e concursos.",
      description:
        "De dois em dois anos, Bobo-Dioulasso acolhe a Semana Nacional da Cultura, que reúne grupos e artistas de todas as regiões do país: músicas e danças tradicionais, saídas de máscaras, teatro, artes plásticas, gastronomia, concursos e grandes concertos. Uma ocasião única para descobrir a diversidade cultural burquinense.",
      tips: "As datas são publicadas pelos organizadores em cada edição. " + PT_SECU,
    },
    "dolo-et-cuisine-bobo-dioulasso": {
      name: "Dolo e cozinha burquinense",
      summary: "Cerveja de milho-miúdo dos cabarés, tô, riz gras e frango grelhado.",
      description:
        "O dolo, cerveja de milho-miúdo feita pelas mulheres (as dolotières) e servida em cabaças, bebe-se nos cabarés de bairro, verdadeiros locais de convívio. No prato: o tô (pasta de milho-miúdo ou de milho servida com molho), o riz gras (arroz cozinhado num molho rico), as espetadas e o frango grelhado, sem esquecer o sumo de bissap (hibisco) ou de gengibre.",
      tips: PT_SECU,
    },
    "cascades-de-karfiguela": {
      name: "Cascatas de Karfiguéla",
      summary: "Sucessão de quedas de água sobre lajes de arenito, no meio de uma vegetação luxuriante.",
      description:
        "A poucos quilómetros a noroeste de Banfora, o rio Comoé desce por uma série de degraus de arenito em cascatas e piscinas naturais, rodeadas de grandes árvores. O local, um dos mais conhecidos do país, é mais espetacular durante e logo após a estação das chuvas.",
      tips: PT_SECU,
      bestPeriod: "Fim da estação das chuvas (setembro a novembro)",
    },
    "domes-de-fabedougou": {
      name: "Cúpulas de Fabédougou",
      summary: "Curiosas formações arredondadas de arenito esculpidas pela erosão.",
      description:
        "Não longe das cascatas de Karfiguéla, as cúpulas de Fabédougou formam um conjunto de rochedos de arenito de formas arredondadas, moldados pela erosão. Uma paisagem surpreendente, ideal para caminhar e fotografar, sobretudo ao fim do dia.",
      tips: PT_SECU,
    },
    "lac-de-tengrela": {
      name: "Lago de Tengréla",
      summary: "Lago tranquilo onde vivem hipopótamos, a descobrir de piroga.",
      description:
        "A oeste de Banfora, o lago de Tengréla abriga uma população de hipopótamos que os pescadores da aldeia vizinha dão a conhecer de piroga. Nenúfares, aves e a luz do fim da tarde compõem um quadro muito tranquilo.",
      tips: "Mantenha sempre uma distância respeitosa dos hipopótamos. " + PT_SECU,
    },
    "pics-de-sindou": {
      name: "Picos de Sindou",
      summary: "Cadeia de agulhas de arenito cinzeladas pela erosão, lugar marcante do país senufo.",
      description:
        "A oeste de Banfora, perto de Sindou, uma longa crista de arenito foi recortada pela erosão em agulhas, chaminés e arcos. Esta paisagem espetacular é também um lugar carregado de sentido para os senufo da região, que ali têm sítios sagrados. A descoberta faz-se a pé com um guia local.",
      tips: "Alguns locais são sagrados: siga as indicações do guia. " + PT_SECU,
    },
    "ruines-de-loropeni": {
      name: "Ruínas de Loropéni",
      summary: "Altas muralhas de laterite de uma fortaleza com pelo menos mil anos.",
      description:
        "As ruínas de Loropéni são os vestígios mais bem conservados de um conjunto de fortificações de pedra da região: um recinto de muros de laterite que chegam a vários metros de altura. Com pelo menos mil anos segundo a UNESCO, estão associadas ao comércio transariano do ouro; os seus construtores e a sua função exata continuam a ser estudados. Inscritas no Património Mundial em 2009.",
      tips: PT_SECU,
    },
    "musee-de-gaoua": {
      name: "Museu das Civilizações do Sudoeste (Gaoua)",
      summary: "As culturas lobi, gan, dagara e vizinhas: estatuária, objetos rituais, habitação.",
      description:
        "Em Gaoua, capital da região, o museu apresenta os povos do sudoeste do Burkina Faso, em particular os lobi: estatuetas rituais, objetos do quotidiano, adornos e maquetas de habitações. Uma chave indispensável para compreender a região e as suas ruínas.",
      tips: PT_SECU,
    },
    "habitat-lobi": {
      name: "Habitação tradicional lobi",
      summary: "Recintos fortificados de terra, com paredes espessas e poucas aberturas.",
      description:
        "Os lobi vivem tradicionalmente em recintos de terra dispersos pelo campo, com paredes espessas e raras aberturas: verdadeiras pequenas fortalezas familiares. Altares e estatuetas testemunham uma rica vida religiosa. Estas casas são habitadas: só se visitam com o acordo das famílias, por intermédio de um guia local.",
      tips: PT_SECU,
    },
    "cour-royale-de-tiebele": {
      name: "Corte real de Tiébélé",
      summary: "Casas de terra ornamentadas com motivos geométricos pintados pelas mulheres.",
      description:
        "A corte real de Tiébélé reúne habitações kassena de terra, de formas diferentes consoante os seus ocupantes, cujas paredes estão decoradas com motivos geométricos e simbólicos em preto, branco e ocre vermelho. Estas pinturas, feitas e renovadas regularmente pelas mulheres com pigmentos naturais, fazem do conjunto uma das joias arquitetónicas da África Ocidental, inscrita na Lista do Património Mundial da UNESCO em 2024.",
      tips: "Local habitado: visita guiada segundo as regras da corte; peça autorização antes de fotografar as pessoas. " + PT_SECU,
    },
    "ranch-de-nazinga": {
      name: "Rancho de caça de Nazinga",
      summary: "Reserva de savana arborizada conhecida pelos seus elefantes e antílopes.",
      description:
        "Entre Pô e a fronteira com o Gana, o rancho de caça de Nazinga protege uma vasta área de savana arborizada e charcos. Tradicionalmente observavam-se elefantes, antílopes, macacos, crocodilos e muitas aves, sobretudo na estação seca, quando os animais se juntam em torno dos pontos de água.",
      tips: PT_SECU,
      bestPeriod: "Estação seca (dezembro a abril)",
    },
    "marche-de-gorom-gorom": {
      name: "Mercado de Gorom-Gorom",
      summary: "Grande mercado semanal saheliano, ponto de encontro de criadores de gado e caravanas.",
      description:
        "O mercado semanal de Gorom-Gorom era um dos mais célebres do Sahel: gado, camelos, couro, joias, esteiras e produtos do deserto trocavam-se numa mistura de povos e trajes. Continua a ser um símbolo das culturas nómadas e pastoris do norte do país.",
      tips: "Uma das zonas mais perigosas do país, formalmente desaconselhada: apresentada apenas a título de património. " + PT_SECU,
    },
    "mare-et-dunes-d-oursi": {
      name: "Lagoa e dunas de Oursi",
      summary: "Zona húmida saheliana protegida e cordões de dunas de areia.",
      description:
        "A noroeste de Gorom-Gorom, a lagoa de Oursi é uma zona húmida de importância internacional (sítio Ramsar) que atrai numerosas aves aquáticas e os rebanhos dos criadores. É ladeada por dunas de areia alaranjada, uma das paisagens mais emblemáticas do Sahel burquinense.",
      tips: "Uma das zonas mais perigosas do país, formalmente desaconselhada: apresentada apenas a título de património. " + PT_SECU,
    },
    "maison-du-peuple-ouagadougou": {
      name: "Casa do Povo (Maison du peuple)",
      summary: "Grande sala de espetáculos e comícios dos anos 1960, com o telhado eriçado de lanternins.",
      description: "Concluída em 1965 segundo os planos do arquiteto René Faublée, a Casa do Povo é um dos edifícios emblemáticos do centro de Ouagadougou: um vasto volume de fachadas ocre coroado por lanternins em forma de palhotas. Acolheu congressos, comícios, concertos e grandes cerimónias da história do país. O Burkina Faso inscreveu-a em 2026 na sua Lista Indicativa do Património Mundial da UNESCO, como exemplo de arquitetura moderna.",
      tips: "Edifício público: o interior só se visita por ocasião de eventos. " + PT_SECU,
    },
    "memorial-thomas-sankara": {
      name: "Memorial e mausoléu Thomas Sankara",
      summary: "O lugar de memória do presidente Thomas Sankara, no local onde foi assassinado em 1987.",
      description: "O memorial ergue-se no recinto do Conseil de l'Entente, onde o presidente Thomas Sankara e doze dos seus companheiros foram assassinados a 15 de outubro de 1987. Inclui uma grande estátua do «pai da revolução», a sala onde ocorreu o drama e, desde maio de 2025, um mausoléu concebido pelo arquiteto burquinense Francis Kéré, vencedor do prémio Pritzker, onde repousam as treze vítimas. Um lugar de recolhimento muito frequentado, sobretudo à volta de 15 de outubro.",
      tips: "Lugar de memória: vestuário adequado e atitude respeitosa; informe-se no local sobre as fotografias. " + PT_SECU,
    },
    "cathedrale-de-ouagadougou": {
      name: "Catedral da Imaculada Conceição",
      summary: "A grande catedral de tijolo ocre do centro, construída nos anos 1930.",
      description: "Construída nos anos 1930 em tijolos de terra, a catedral da Imaculada Conceição é um dos grandes edifícios religiosos do país e uma referência do centro de Ouagadougou. A sua fachada maciça de duas torres, os arcos e os óculos azuis destacam-se sobre um vasto adro. As grandes missas de Natal e de Páscoa reúnem uma multidão considerável.",
      tips: "Vestuário adequado; sem visitas durante as celebrações. " + PT_SECU,
    },
    "musee-de-la-musique-ouagadougou": {
      name: "Museu da Música Georges Ouédraogo",
      summary: "Balafons, tambores, harpas-alaúde e flautas das tradições musicais do país.",
      description: "Fundado em 1999 no centro de Ouagadougou, o Museu da Música apresenta cerca de trezentos instrumentos tradicionais do Burkina Faso, organizados por famílias: tambores, balafons, flautas, harpas-alaúde, sanzas… Fotografias e explicações situam cada instrumento no seu uso social, da comunicação nas aldeias às cerimónias. A visita é guiada.",
      tips: PT_SECU,
    },
    "grand-marche-rood-woko": {
      name: "Grande mercado Rood Woko",
      summary: "O grande mercado central da capital, reconstruído após o incêndio de 2003.",
      description: "Rood Woko («grande mercado» em mooré) é o coração comercial de Ouagadougou desde os anos 1960. Destruído por um incêndio em 2003, foi reconstruído e reaberto em 2009 num edifício de tijolo com amplos telhados. Tecidos e panos, especiarias, ferragens e artigos do dia a dia: uma imersão na animação da capital.",
      tips: "Muita afluência: vigie os seus pertences e negoceie com um sorriso. " + PT_SECU,
    },
    "village-artisanal-de-ouagadougou": {
      name: "Aldeia artesanal de Ouagadougou",
      summary: "Centenas de artesãos a trabalhar: bronze, couro, tecelagem, escultura, bogolan.",
      description: "Aberta em 2000, a Aldeia artesanal de Ouagadougou reúne, à volta de um pátio central, oficinas e lojas onde trabalham, consoante a época, 400 a 500 artesãos de mais de vinte e cinco ofícios: fundidores de bronze, marroquineiros, tecelões, oleiros, escultores, tintureiros e fabricantes de instrumentos musicais. Pode ver-se os objetos a nascer antes de os comprar.",
      tips: PT_SECU,
    },
    "parc-urbain-bangr-weoogo": {
      name: "Parque urbano Bangr-Weoogo",
      summary: "A «floresta do saber», pulmão verde de 240 hectares no coração da cidade.",
      description: "Antigo bosque sagrado dos chefes mossi, o parque Bangr-Weoogo («floresta do saber» em mooré) protege 240 hectares de floresta em plena cidade. Trilhos para passear e fazer desporto, lagoas, aves, alguns animais e um pequeno museu de fauna fazem dele o local de descanso preferido dos habitantes, sobretudo de manhã cedo e ao fim da tarde.",
      tips: PT_SECU,
    },
    "site-de-sculpture-de-laongo": {
      name: "Sítio de escultura em granito de Laongo",
      summary: "Um museu ao ar livre: blocos de granito esculpidos por artistas de todo o mundo.",
      description: "A cerca de 35 km a nordeste de Ouagadougou, perto de Ziniaré, um campo de blocos de granito tornou-se desde 1989 um museu de escultura ao ar livre. Em sucessivos simpósios lançados pelo escultor burquinense Ky Siriki, artistas de muitos países talharam a pedra no local, por vezes associando-a ao metal. Dezenas de obras descobrem-se num passeio entre as rochas.",
      tips: "Leve chapéu e água, o local tem pouca sombra. " + PT_SECU,
    },
    "crocodiles-sacres-de-bazoule": {
      name: "Lagoa dos crocodilos sagrados de Bazoulé",
      summary: "Crocodilos venerados e protegidos pelos aldeões, a 30 km da capital.",
      description: "Segundo a tradição oral, um crocodilo terá outrora guiado os habitantes de Bazoulé, atingidos pela seca, até uma nascente: desde então, os crocodilos da lagoa da aldeia são venerados e protegidos. Habituados à presença humana, deixam-se aproximar quando os guardiães os alimentam, o que fez de Bazoulé uma das excursões clássicas a partir de Ouagadougou.",
      tips: "São animais selvagens: siga rigorosamente as instruções dos guardiães e respeite o caráter sagrado do local. " + PT_SECU,
    },
    "maquis-et-soirees-de-ouagadougou": {
      name: "Maquis e noites de Ouagadougou",
      summary: "O maquis, restaurante popular ao ar livre, coração da vida social e noturna.",
      description: "Em Ouagadougou, a vida noturna passa-se nos maquis, restaurantes-bar populares ao ar livre que se encontram em todos os bairros. Partilha-se frango grelhado ou «poulet bicyclette» (frango do campo), peixe na brasa, espetadas e bebidas frescas, muitas vezes ao som de música, e discute-se o mundo entre amigos. Durante o FESPACO, as Récréâtrales ou as festas de fim de ano, a cidade deita-se ainda mais tarde.",
      tips: "Peça conselho aos habitantes para escolher um maquis animado e seguro. " + PT_SECU,
    },
    "gare-de-bobo-dioulasso": {
      name: "Estação de Bobo-Dioulasso",
      summary: "A estação dos anos 1930 em estilo neossudanês, na linha Abidjan–Ouagadougou.",
      description: "Aberta ao tráfego em 1933-1934, quando Bobo-Dioulasso se tornou o terminal provisório do caminho de ferro vindo de Abidjan, a estação é um dos edifícios coloniais mais fotografados do país. A sua fachada ameiada, eriçada de peças de madeira salientes, retoma os códigos da arquitetura sudanesa das mesquitas de terra. Fica muito perto do centro.",
      tips: PT_SECU,
    },
    "village-de-koumi": {
      name: "Aldeia de Koumi",
      summary: "Aldeia bobo de casas de terra encostadas a uma escarpa rochosa.",
      description: "A cerca de 16 km de Bobo-Dioulasso, Koumi é uma aldeia bobo cujos habitantes se ligam ao núcleo original da cidade, Sya. As suas casas de terra, construídas contra uma escarpa rochosa, refletem a organização social e as crenças da comunidade, que soube preservar a sua arquitetura face à urbanização. O Burkina Faso inscreveu-a em 2026 na sua Lista Indicativa do Património Mundial.",
      tips: "Aldeia habitada: visita com um guia local e o acordo dos habitantes. " + PT_SECU,
    },
    "village-de-koro": {
      name: "Aldeia empoleirada de Koro",
      summary: "Uma aldeia de terra empoleirada numa colina, a uma dúzia de quilómetros de Bobo.",
      description: "A 12 km a leste de Bobo-Dioulasso, a aldeia de Koro ocupa o cimo de uma colina rochosa, na extremidade nordeste da falésia de Banfora. Segundo a tradição, os seus habitantes instalaram-se ali no tempo das guerras de Samory para verem chegar o inimigo. As suas casas de terra agarradas às rochas oferecem uma ampla vista sobre a planície.",
      tips: "Aldeia habitada: visita com um guia local; peça autorização antes de fotografar. " + PT_SECU,
    },
    "mare-aux-hippopotames-bala": {
      name: "Lagoa dos hipopótamos de Bala",
      summary: "Reserva da biosfera da UNESCO onde vivem cerca de sessenta hipopótamos.",
      description: "A cerca de sessenta quilómetros a nordeste de Bobo-Dioulasso, esta floresta protegida desde 1937 rodeia uma lagoa alimentada pelo Mouhoun (Volta Negro), onde vivem cerca de sessenta hipopótamos. Reserva da biosfera da UNESCO desde 1986 e sítio Ramsar, é gerida por uma associação de aldeões e consta desde 2026 da Lista Indicativa do Património Mundial. As saídas faziam-se tradicionalmente de piroga com os pescadores.",
      tips: "Mantenha uma grande distância dos hipopótamos. " + PT_SECU,
      bestPeriod: "Estação seca (dezembro a abril)",
    },
    "parc-national-kabore-tambi": {
      name: "Parque nacional Kaboré Tambi",
      summary: "Savanas e florestas-galeria ao longo do Volta Vermelho, entre Pô e Ouagadougou.",
      description: "Criado em 1976 com o nome de parque nacional de Pô, o parque Kaboré Tambi tem o nome de um guarda morto por caçadores furtivos em 1991. Os seus 2427 km² de savanas e florestas-galeria, atravessados pelo Volta Vermelho, abrigam elefantes, antílopes, macacos, facoqueros e numerosas aves. Estende-se a norte de Pô, de ambos os lados da estrada Ouagadougou–Pô.",
      tips: PT_SECU,
      bestPeriod: "Estação seca (dezembro a abril)",
    },
    "mosquees-de-bani": {
      name: "Mesquitas de Bani",
      summary: "A «cidade das sete mesquitas» de terra, obra-prima da arquitetura saheliana.",
      description: "A sul de Dori, a pequena cidade de Bani, apelidada «a cidade das sete mesquitas», é famosa pelas suas mesquitas de terra com altas torres afiladas, construídas na colina e no sopé, entre as quais a grande mesquita fula. Estes edifícios estão entre os mais belos exemplos de arquitetura de terra do Sahel burquinense.",
      tips: "Uma das zonas mais perigosas do país, formalmente desaconselhada: apresentada apenas como património. " + PT_SECU,
    },
    "crocodiles-sacres-de-sabou": {
      name: "Lagoa dos crocodilos sagrados de Sabou",
      summary: "A mais célebre lagoa de crocodilos sagrados do país, na estrada de Bobo-Dioulasso.",
      description: "A cerca de vinte quilómetros a sul de Koudougou, na estrada nacional 1, Sabou é famosa pela sua lagoa de crocodilos sagrados. A família Kaboré, guardiã do local, considera estes animais como antepassados; são protegidos e alimentados sob o controlo dos guardiães, que permitem aos visitantes aproximar-se.",
      tips: "Animais selvagens: siga rigorosamente as instruções dos guardiães. " + PT_SECU,
    },
    "festima-dedougou": {
      name: "FESTIMA, Festival Internacional das Máscaras e das Artes",
      summary: "O grande encontro das sociedades de máscaras da África Ocidental, em Dédougou.",
      description: "Criado em 1996, o FESTIMA reúne em Dédougou, em princípio de dois em dois anos, sociedades de máscaras de toda a região e de países vizinhos: máscaras de folhas, fibras ou madeira dos bwaba, bobo, marka, mossi e outros povos, que dançam ao som de tambores e flautas. O festival inclui também um colóquio e exposições sobre o património das máscaras.",
      tips: "As máscaras são sagradas: siga as instruções dos organizadores e dos iniciados, sobretudo quanto às fotografias. " + PT_SECU,
      bestPeriod: "Anos pares, de fevereiro a maio consoante a edição",
    },
    "site-metallurgique-de-douroula": {
      name: "Sítio de metalurgia antiga do ferro de Douroula",
      summary: "Os mais antigos vestígios de produção de ferro do país, inscritos na UNESCO.",
      description: "Perto da aldeia de Douroula, não longe do Mouhoun, restos de fornos e escórias testemunham uma produção de ferro muito antiga, que a UNESCO faz remontar ao século VIII antes da nossa era. Douroula é uma das cinco componentes dos «Sítios de metalurgia antiga do ferro do Burkina Faso», inscritos no Património Mundial em 2019 juntamente com Tiwêga, Yamané, Kindibo e Békuy, onde subsistem também fornos de pé.",
      tips: PT_SECU,
    },
    "parc-national-d-arly": {
      name: "Parque nacional de Arly",
      summary: "Savanas, colinas de arenito e rios da reserva de Arly, na fronteira com o Benim.",
      description: "Criada em 1954, a reserva total de fauna de Arly, muitas vezes chamada parque nacional de Arly, estende-se ao longo do rio Arly, na fronteira com a Pendjari beninense. Colinas de arenito, florestas-galeria e zonas húmidas (sítio Ramsar desde 2009) abrigavam uma das faunas mais ricas do país. Faz parte do complexo W-Arly-Pendjari, inscrito no Património Mundial.",
      tips: "Uma das zonas mais perigosas do país, formalmente desaconselhada: apresentada apenas como património. " + PT_SECU,
    },
  },
  circuits: {},
  stepNotes: {},
};

const AR: SeedI18n = {
  guide: {
    intro:
      "تنصح فرنسا والمملكة المتحدة اليوم بشدة بعدم السفر إطلاقًا إلى بوركينا فاسو بسبب التهديد الإرهابي وخطر الاختطاف: يعرض هذا الدليل تراث «بلد الرجال النزهاء» للتحضير لرحلة حين تسمح الظروف بذلك. المسجد الطيني في بوبو ديولاسو، وأطلال لوروبيني المدرجة في قائمة اليونسكو، والبيوت المزخرفة في تيبيليه، والشلالات وقمم الحجر الرملي في منطقة بانفورا، وفي واغادوغو مهرجان «فيسباكو»، الموعد الكبير للسينما الأفريقية: تمتلك البلاد واحدًا من أغنى التراثات الثقافية في غرب أفريقيا.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين إلى تأشيرة، ويُعفى منها مواطنو عدد من دول غرب أفريقيا. تتغير الشروط (التأشيرة الإلكترونية والوثائق المطلوبة): تحقق منها لدى سلطات بوركينا فاسو وفي نصائح السفر الصادرة عن بلدك قبل أي مشروع. لاحظ أن فرنسا لم تعد لديها سفارة ولا قنصلية مفتوحة في واغادوغو.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمى الصفراء عند الدخول. الملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن العلاج الوقائي، واحمِ نفسك من البعوض (طارد للحشرات، ناموسية). تقع البلاد ضمن «حزام التهاب السحايا»: اسأل طبيبك عن اللقاحات الموصى بها. اشرب المياه المعبأة واحمِ نفسك جيدًا من الحر.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي فرنك الاتحاد المالي الأفريقي (XOF)، المرتبط بسعر ثابت باليورو (1 يورو = 655.957 فرنكًا). النقد ضروري، والدفع عبر الهاتف المحمول (mobile money) واسع الانتشار. لا تُقبل البطاقات المصرفية إلا في بعض الفنادق والمتاجر في المدن الكبرى.",
      },
      {
        title: "متى تسافر",
        body: "الموسم الجاف والمعتدل نسبيًا، من نوفمبر إلى فبراير، هو الأكثر راحة، وتهب فيه رياح الهرمتان (رياح جافة محمّلة بالغبار قادمة من الصحراء الكبرى). ومن مارس إلى مايو تشتد الحرارة كثيرًا. ويمتد موسم الأمطار تقريبًا من يونيو إلى سبتمبر، وهو أطول في الجنوب الغربي وأقصر في منطقة الساحل شمالًا.",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي لغة الإدارة والأكثر استخدامًا لدى المسافرين، وتُستعمل في الحياة اليومية لغات منها الموريه والديولا والفولفولدي. التحيات، الطويلة والمتأنية، ضرورية قبل أي طلب. لا تزال التقاليد (المشيخات والأقنعة والأماكن المقدسة) حية جدًا: اتبع التعليمات، واستأذن دائمًا قبل تصوير شخص أو مكان مقدس أو طقس.",
      },
      {
        title: "التنقل",
        body: "داخل المدن يتنقل الناس بسيارات الأجرة أو بالدراجات النارية، وبين المدن تربط شركات الحافلات بين المراكز الرئيسية. غير أن الطرق بين المدن معرضة بشكل خاص للهجمات وعمليات الاختطاف: لا تخطط لأي تنقل دون الاطلاع على النصائح الرسمية المحدّثة، التي تنصح حاليًا بعدم السفر إلى البلاد إطلاقًا.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار الكهربائي 220 فولت، والمقابس من النوعين C وE (مقابس أوروبية). انقطاع الكهرباء متكرر. تتيح شريحة اتصال محلية (يُطلب إثبات الهوية) الوصول إلى الإنترنت عبر الهاتف وإلى خدمة mobile money.",
      },
      {
        title: "الأمن",
        body: "في تاريخ تحرير هذا الدليل، تنصح الخارجية الفرنسية (France Diplomatie، «Conseils aux voyageurs») بشدة بعدم التوجه إلى بوركينا فاسو في كامل أراضيها بما فيها واغادوغو، وتنصح وزارة الخارجية البريطانية (FCDO) بعدم السفر إلى البلاد إطلاقًا. وتعود هذه التوصيات إلى وجود جماعات مسلحة والتهديد الإرهابي وخطر الاختطاف وعدم استقرار الوضع السياسي، كما أن العلاقات الدبلوماسية مع فرنسا مقطوعة، مما يحدّ كثيرًا من المساعدة القنصلية. وقد لا يغطي تأمين السفر الإقامة في منطقة يُنصح بعدم زيارتها. لا يهدف هذا الدليل إلى تنظيم رحلة اليوم: راجع France Diplomatie أو FCDO أو نصائح بلدك، وانتظر أن تتغير توصياتها.",
      },
    ],
  },
  destinations: {
    ouagadougou: {
      name: "واغادوغو",
      region: "كادِيوغو (الوسط سابقًا)",
      summary: "عاصمة البلاد وعاصمة شعب الموسي، مدينة مهرجان فيسباكو والحِرف اليدوية.",
      description:
        "مقر الموغو نابا، ملك الموسي في واغادوغو، والعاصمة هي أيضًا العاصمة الثقافية للبلاد: مهرجان فيسباكو، والمعرض الدولي للحِرف اليدوية، والمتحف الوطني، وحياة موسيقية ومسرحية نابضة، و«الماكي» (مطاعم شعبية) تقدم الدجاج المشوي. وكسائر البلاد، تنصح السلطات الفرنسية والبريطانية حاليًا بشدة بعدم زيارة المدينة.",
    },
    "bobo-dioulasso": {
      name: "بوبو ديولاسو",
      region: "غيريكو (الأحواض العليا سابقًا)",
      summary: "ثاني مدن البلاد، الشهيرة بمسجدها الطيني الكبير وحياتها الموسيقية.",
      description:
        "العاصمة الاقتصادية التاريخية للغرب، حافظت بوبو ديولاسو على قلب قديم هو حي ديولاسوبا، وعلى مسجد طيني كبير أصبح رمزًا للبلاد. مدينة الموسيقى (البالافون والجمبي) والأقنعة والحانات الشعبية التي يُقدَّم فيها «الدولو»، وتستضيف الأسبوع الوطني للثقافة. منطقة يُنصح حاليًا بشدة بعدم زيارتها، كسائر البلاد.",
    },
    banfora: {
      name: "بانفورا ومنطقة الشلالات",
      region: "تانونيان (الشلالات سابقًا)",
      summary: "شلالات وبحيرة لأفراس النهر وتكوينات مذهلة من الحجر الرملي.",
      description:
        "في جنوب غرب البلاد، منطقة بانفورا هي الأكثر خضرة في بوركينا فاسو: حقول قصب السكر وبساتين المانغو وشلالات كارفيغيلا وقباب فابيدوغو وبحيرة تنغريلا، وإلى الغرب قمم سيندو المدهشة. تراث طبيعي لافت في منطقة يُنصح حاليًا بشدة بعدم زيارتها كسائر البلاد.",
    },
    loropeni: {
      name: "لوروبيني وبلاد اللوبي",
      region: "دجورو (الجنوب الغربي سابقًا)",
      summary: "أطلال لوروبيني الحجرية الألفية، أول موقع في البلاد مدرج في قائمة اليونسكو.",
      description:
        "في الجنوب الغربي، بين غاوا وحدود ساحل العاج، تحتفظ بلاد اللوبي بأطلال لوروبيني، أول موقع في بوركينا فاسو أُدرج في قائمة التراث العالمي لليونسكو (2009)، إلى جانب عمارة وتقاليد فريدة. وكسائر البلاد، يُنصح حاليًا بشدة بعدم زيارة المنطقة.",
    },
    tiebele: {
      name: "تيبيليه وبلاد الكاسينا",
      region: "نازينون (الوسط الجنوبي سابقًا)",
      summary: "البلاط الملكي ببيوته المزخرفة لدى شعب الكاسينا، قرب الحدود مع غانا.",
      description:
        "في جنوب البلاد، قرب غانا، تشتهر تيبيليه ببلاطها الملكي الذي تغطي جدرانَ بيوته الطينية رسومٌ هندسية تنجزها نساء الكاسينا. وعلى مقربة منها، تحمي محمية نازينغا للطرائد الفيلة والظباء. منطقة ذات تراث استثنائي يُنصح حاليًا بشدة بعدم زيارتها كسائر البلاد.",
    },
    "gorom-gorom": {
      name: "غوروم غوروم والساحل",
      region: "ليبتاكو (الساحل سابقًا)",
      summary: "سوق ساحلية وكثبان أودالان: تراث يتعذر الوصول إليه اليوم.",
      description:
        "على تخوم مالي والنيجر، اشتهر الساحل البوركيني قديمًا بسوق غوروم غوروم الكبيرة، ملتقى الطوارق والفولاني والبيلا والسونغاي، وبكثبان أورسي وبركتها. هذه المنطقة من أكثر المناطق تضررًا من العنف المسلح وتخضع لأشد التوصيات صرامة: تُعرض هنا بوصفها تراثًا فقط.",
    },
    "koudougou": {
      name: "كودوغو والوسط الغربي",
      region: "ناندو (الوسط الغربي سابقًا)",
      summary: "مدينة مهرجان «الليالي غير المألوفة»، قرب تماسيح سابو المقدسة.",
      description: "على بعد نحو مئة كيلومتر غرب واغادوغو، تشتهر كودوغو بمهرجان «الليالي غير المألوفة» (Nuits atypiques)، وهو من أقدم مهرجانات الموسيقى في البلاد. وعلى بعد نحو عشرين كيلومترًا جنوبًا، على طريق بوبو ديولاسو، كانت بركة التماسيح المقدسة في سابو إحدى المحطات الكلاسيكية في البلاد. يُنصح حاليًا بشدة بعدم السفر إلى هذه المنطقة، شأنها شأن بوركينا فاسو كلها.",
    },
    "dedougou": {
      name: "ديدوغو ومنعطف نهر موهون",
      region: "بانكوي (منعطف موهون سابقًا)",
      summary: "أرض أقنعة البوابا ومهرجان فستيما وتعدين الحديد القديم.",
      description: "في غرب البلاد، داخل المنعطف الكبير لنهر موهون (الفولتا السوداء)، تستضيف ديدوغو كل عامين المهرجان الدولي للأقنعة والفنون (فستيما). وعلى مقربة منها، في دورولا، يقع أحد المواقع الخمسة لتعدين الحديد القديم المدرجة في قائمة التراث العالمي لليونسكو عام 2019. يُنصح حاليًا بشدة بعدم السفر إلى هذه المنطقة، شأنها شأن البلاد كلها.",
    },
    "parcs-w-arly": {
      name: "منتزها W وأرلي",
      region: "الشرق (مقاطعة تابوا)",
      summary: "الجزء البوركيني من مجمع W-أرلي-بنجاري، أحد المواقع الطبيعية الكبرى لليونسكو.",
      description: "في أقصى شرق البلاد، على حدود النيجر وبنين، يشكّل منتزها W وأرلي مع منتزه بنجاري في بنين مجمع W-أرلي-بنجاري المدرج في قائمة التراث العالمي لليونسكو (توسعة عام 2017): أكبر مساحة من السافانا المحمية في غرب أفريقيا، وملاذ للفيلة والأسود والجواميس والظباء. هذه المنطقة من أكثر المناطق تضررًا من العنف المسلح وتخضع لأشد التوصيات صرامة: تُعرض هنا بوصفها تراثًا فقط.",
    },
  },
  places: {
    "musee-national-burkina-faso": {
      name: "المتحف الوطني لبوركينا فاسو",
      summary: "أقنعة وتماثيل وأزياء وأدوات من شعوب البلاد العديدة.",
      description:
        "يعرض المتحف الوطني التنوع الثقافي لبوركينا فاسو من خلال مجموعاته من الأقنعة والتماثيل والأزياء والحلي وأدوات الحياة اليومية. مدخل قيّم إلى تقاليد الموسي والبوبو واللوبي والغورونسي والفولاني وسائر شعوب البلاد.",
      tips: AR_SECU,
    },
    "ceremonie-du-moro-naba": {
      name: "طقس الموغو نابا",
      summary: "طقس أسبوعي في بلاط ملك الموسي يُعرف بـ«الرحيل الزائف».",
      description:
        "كل يوم جمعة، أمام قصر الموغو نابا (أو مورو نابا)، ملك الموسي في واغادوغو، يُقام طقس تقليدي قصير يُعرف بـ«الرحيل الزائف»: بحسب التقاليد، يستعد الملك للرحيل فيستبقيه أعيانه. طقس يشهد على المكانة التي لا تزال مشيخة الموسي تحتلها.",
      tips: "ارتدِ لباسًا لائقًا والتزم التحفظ واتبع التعليمات بدقة، لا سيما بشأن التصوير. " + AR_SECU,
    },
    fespaco: {
      name: "مهرجان فيسباكو",
      summary: "المهرجان الأفريقي للسينما والتلفزيون في واغادوغو، يُقام كل عامين.",
      description:
        "تأسس مهرجان فيسباكو عام 1969، وهو أكبر مهرجان سينمائي في القارة الأفريقية. كل عامين تستضيف واغادوغو عروضًا ولقاءات مهنية وسوقًا للأفلام، وتحمل جائزته الكبرى، «حصان ينينغا الذهبي»، اسم الأميرة الأسطورية التي تُعد الأم المؤسِّسة لشعب الموسي.",
      tips: "ينشر المنظمون المواعيد والبرنامج في كل دورة. " + AR_SECU,
      bestPeriod: "في الأعوام الفردية، عادة في فبراير أو أوائل مارس",
    },
    "siao-ouagadougou": {
      name: "المعرض الدولي للحِرف اليدوية في واغادوغو (SIAO)",
      summary: "معرض كبير يُقام كل عامين للحِرف الأفريقية: البرونز والنسيج والجلد والسلال.",
      description:
        "يُنظَّم معرض SIAO كل عامين في واغادوغو منذ أواخر ثمانينيات القرن العشرين، ويجمع حرفيين من بوركينا فاسو ومن بلدان أفريقية عديدة: برونز مصبوب بتقنية الشمع المفقود، ومنسوجات (منها «فاسو دان فاني»، القماش الوطني)، ومصنوعات جلدية وفخار وسلال. واجهة لمهارات تفخر بها البلاد كثيرًا.",
      tips: "ينشر المنظمون المواعيد في كل دورة. " + AR_SECU,
    },
    "grande-mosquee-bobo-dioulasso": {
      name: "المسجد الكبير في بوبو ديولاسو",
      summary: "تحفة من عمارة الطين السودانية الساحلية، تبرز منها أوتاد خشبية.",
      description:
        "بُني المسجد الكبير في أواخر القرن التاسع عشر في حي ديولاسوبا، وهو من أجمل نماذج العمارة السودانية الساحلية: جدران من الطوب الطيني مطلية بالجص الأبيض، ودعامات مخروطية، وعوارض خشبية بارزة تُستخدم سقالاتٍ عند إعادة الطلاء. وهو مدرج في القائمة التمهيدية للتراث العالمي لليونسكو.",
      tips: "ارتدِ لباسًا ساترًا، وتكون الزيارة وفق قواعد الجماعة ولا تكون أبدًا أثناء الصلاة. " + AR_SECU,
    },
    "quartier-de-dioulassoba": {
      name: "حي ديولاسوبا القديم",
      summary: "النواة القديمة للمدينة بأزقتها الطينية وأحياء الحدادين والغريو.",
      description:
        "ديولاسوبا هو الحي التاريخي لبوبو ديولاسو، أسسه شعب البوبو. تضم أزقته ذات البيوت الطينية عائلات من الحدادين والغريو (رواة ومنشدين تقليديين) والحرفيين، إضافة إلى أماكن مقدسة، ويشتهر جدول هويت المحاذي له بأسماك السلّور التي تُعد مقدسة. تجري الزيارة تقليديًا برفقة مرشد من الحي.",
      tips: "احترم المحظورات التي يشير إليها المرشد (التصوير، الأماكن المقدسة). " + AR_SECU,
    },
    "semaine-nationale-de-la-culture": {
      name: "الأسبوع الوطني للثقافة (SNC)",
      summary: "تظاهرة ثقافية كبرى كل عامين: موسيقى ورقص وأقنعة ومسرح ومسابقات.",
      description:
        "كل عامين تستضيف بوبو ديولاسو الأسبوع الوطني للثقافة، الذي يجمع فرقًا وفنانين من كل مناطق البلاد: موسيقى ورقصات تقليدية، وعروض أقنعة، ومسرح، وفنون تشكيلية، وطهي، ومسابقات، وحفلات كبرى. فرصة فريدة لاكتشاف التنوع الثقافي البوركيني.",
      tips: "ينشر المنظمون المواعيد في كل دورة. " + AR_SECU,
    },
    "dolo-et-cuisine-bobo-dioulasso": {
      name: "الدولو والمطبخ البوركيني",
      summary: "جعة الدخن في الحانات الشعبية، والتو، والأرز الدسم، والدجاج المشوي.",
      description:
        "«الدولو» جعة من الدخن تصنعها النساء وتُقدَّم في أوعية من القرع، وتُشرب في الحانات الشعبية في الأحياء، وهي أماكن حقيقية للتلاقي. أما على المائدة فهناك «التو» (عجينة من الدخن أو الذرة تُقدَّم مع صلصة)، و«الأرز الدسم» المطبوخ في صلصة غنية، والأسياخ والدجاج المشوي، إضافة إلى عصير البيساب (الكركديه) أو الزنجبيل.",
      tips: AR_SECU,
    },
    "cascades-de-karfiguela": {
      name: "شلالات كارفيغيلا",
      summary: "سلسلة من الشلالات فوق ألواح من الحجر الرملي وسط نباتات كثيفة.",
      description:
        "على بعد بضعة كيلومترات شمال غرب بانفورا، ينحدر نهر كومويه عبر سلسلة من درجات الحجر الرملي في شلالات وأحواض طبيعية تحيط بها أشجار كبيرة. الموقع من أشهر مواقع البلاد، ويكون أكثر روعة خلال موسم الأمطار وبعده مباشرة.",
      tips: AR_SECU,
      bestPeriod: "نهاية موسم الأمطار (من سبتمبر إلى نوفمبر)",
    },
    "domes-de-fabedougou": {
      name: "قباب فابيدوغو",
      summary: "تكوينات غريبة مستديرة من الحجر الرملي نحتتها عوامل التعرية.",
      description:
        "على مقربة من شلالات كارفيغيلا، تشكّل قباب فابيدوغو مجموعة من صخور الحجر الرملي ذات الأشكال المستديرة التي شكّلتها التعرية. منظر طبيعي مدهش، مناسب للمشي والتصوير، لا سيما في آخر النهار.",
      tips: AR_SECU,
    },
    "lac-de-tengrela": {
      name: "بحيرة تنغريلا",
      summary: "بحيرة هادئة تعيش فيها أفراس النهر، تُكتشف بالقارب.",
      description:
        "غرب بانفورا، تؤوي بحيرة تنغريلا مجموعة من أفراس النهر يُطلع صيادو القرية المجاورة الزوارَ عليها على متن قوارب البيروغ. زنابق الماء والطيور وضوء المساء ترسم مشهدًا شديد الهدوء.",
      tips: "حافظ دائمًا على مسافة آمنة من أفراس النهر. " + AR_SECU,
    },
    "pics-de-sindou": {
      name: "قمم سيندو",
      summary: "سلسلة من الإبر الصخرية من الحجر الرملي نحتتها التعرية، من أبرز معالم بلاد السينوفو.",
      description:
        "غرب بانفورا، قرب سيندو، قطّعت التعرية حافة طويلة من الحجر الرملي إلى إبر ومداخن وأقواس. هذا المشهد المذهل مكان ذو دلالة أيضًا لشعب السينوفو في المنطقة، الذي يملك فيه مواقع مقدسة. يُكتشف سيرًا على الأقدام برفقة مرشد محلي.",
      tips: "بعض المواقع مقدسة: اتبع تعليمات المرشد. " + AR_SECU,
    },
    "ruines-de-loropeni": {
      name: "أطلال لوروبيني",
      summary: "أسوار عالية من حجر اللاتيريت لحصن يعود إلى ألف عام على الأقل.",
      description:
        "أطلال لوروبيني هي أفضل البقايا حفظًا ضمن مجموعة من التحصينات الحجرية في المنطقة: سياج من جدران اللاتيريت يبلغ ارتفاعها عدة أمتار. يعود عمرها إلى ألف عام على الأقل بحسب اليونسكو، وترتبط بتجارة الذهب عبر الصحراء، ولا يزال بُناتها ووظيفتها الدقيقة موضع بحث. أُدرجت في قائمة التراث العالمي عام 2009.",
      tips: AR_SECU,
    },
    "musee-de-gaoua": {
      name: "متحف حضارات الجنوب الغربي (غاوا)",
      summary: "ثقافات اللوبي والغان والداغارا وجيرانهم: تماثيل وأدوات طقسية وعمارة سكنية.",
      description:
        "في غاوا، عاصمة المنطقة، يعرض المتحف شعوب جنوب غرب بوركينا فاسو، ولا سيما اللوبي: تماثيل طقسية صغيرة وأدوات الحياة اليومية والحلي ونماذج مصغرة للمساكن. مفتاح لا غنى عنه لفهم المنطقة وأطلالها.",
      tips: AR_SECU,
    },
    "habitat-lobi": {
      name: "المسكن التقليدي لدى اللوبي",
      summary: "مجمعات طينية محصنة بجدران سميكة وفتحات قليلة.",
      description:
        "يعيش اللوبي تقليديًا في مجمعات طينية متفرقة في الريف، ذات جدران سميكة وفتحات نادرة، وهي حصون عائلية صغيرة حقيقية. وتشهد المذابح والتماثيل الصغيرة على حياة دينية غنية. هذه البيوت مأهولة: لا تُزار إلا بموافقة العائلات وعن طريق مرشد محلي.",
      tips: AR_SECU,
    },
    "cour-royale-de-tiebele": {
      name: "البلاط الملكي في تيبيليه",
      summary: "بيوت طينية مزينة بزخارف هندسية ترسمها النساء.",
      description:
        "يضم البلاط الملكي في تيبيليه مساكن طينية لشعب الكاسينا تختلف أشكالها باختلاف ساكنيها، وتزين جدرانها زخارف هندسية ورمزية بالأسود والأبيض والمغرة الحمراء. هذه الرسوم، التي تنجزها النساء وتجددها بانتظام بأصباغ طبيعية، تجعل من المجموعة إحدى جواهر العمارة في غرب أفريقيا، وقد أُدرجت في قائمة التراث العالمي لليونسكو عام 2024.",
      tips: "مكان مأهول: زيارة بمرشد وفق قواعد البلاط، واستأذن قبل تصوير الأشخاص. " + AR_SECU,
    },
    "ranch-de-nazinga": {
      name: "محمية نازينغا للطرائد",
      summary: "محمية سافانا مشجرة معروفة بفيلتها وظبائها.",
      description:
        "بين بو والحدود مع غانا، تحمي محمية نازينغا للطرائد مساحة واسعة من السافانا المشجرة والبرك. وكان الزوار يشاهدون فيها تقليديًا الفيلة والظباء والقرود والتماسيح وطيورًا كثيرة، لا سيما في الموسم الجاف حين تتجمع الحيوانات حول نقاط المياه.",
      tips: AR_SECU,
      bestPeriod: "الموسم الجاف (من ديسمبر إلى أبريل)",
    },
    "marche-de-gorom-gorom": {
      name: "سوق غوروم غوروم",
      summary: "سوق ساحلية أسبوعية كبرى، ملتقى للرعاة والقوافل.",
      description:
        "كانت سوق غوروم غوروم الأسبوعية من أشهر أسواق الساحل: تُتبادل فيها الماشية والإبل والجلود والحلي والحصر ومنتجات الصحراء وسط تمازج من الشعوب والأزياء. ولا تزال رمزًا لثقافات البدو والرعاة في شمال البلاد.",
      tips: "من أخطر مناطق البلاد ويُنصح بشدة بعدم زيارتها: تُعرض هنا بوصفها تراثًا فقط. " + AR_SECU,
    },
    "mare-et-dunes-d-oursi": {
      name: "بركة أورسي وكثبانها",
      summary: "منطقة رطبة ساحلية محمية وسلاسل من الكثبان الرملية.",
      description:
        "شمال غرب غوروم غوروم، تُعد بركة أورسي منطقة رطبة ذات أهمية دولية (موقع رامسار) تجتذب الكثير من الطيور المائية وقطعان الرعاة. وتحيط بها كثبان رملية برتقالية اللون، وهي من أكثر مناظر الساحل البوركيني رمزية.",
      tips: "من أخطر مناطق البلاد ويُنصح بشدة بعدم زيارتها: تُعرض هنا بوصفها تراثًا فقط. " + AR_SECU,
    },
    "maison-du-peuple-ouagadougou": {
      name: "دار الشعب",
      summary: "قاعة كبرى للعروض والتجمعات من ستينيات القرن العشرين، يعلو سقفَها عددٌ من المناور.",
      description: "اكتمل بناء دار الشعب عام 1965 وفق تصاميم المهندس المعماري رينيه فوبليه، وهي من المباني الرمزية في وسط واغادوغو: كتلة ضخمة بواجهات مغرية اللون تعلوها مناور على شكل أكواخ تقليدية. احتضنت مؤتمرات وتجمعات وحفلات موسيقية واحتفالات كبرى في تاريخ البلاد. وقد أدرجتها بوركينا فاسو عام 2026 في قائمتها التمهيدية للتراث العالمي لليونسكو مثالًا على العمارة الحديثة.",
      tips: "مبنى عام: لا تمكن زيارة الداخل إلا خلال الفعاليات. " + AR_SECU,
    },
    "memorial-thomas-sankara": {
      name: "نصب توماس سانكارا التذكاري وضريحه",
      summary: "مكان تخليد ذكرى الرئيس توماس سانكارا، في الموقع الذي اغتيل فيه عام 1987.",
      description: "أقيم النصب التذكاري في موقع «مجلس الوفاق» حيث اغتيل الرئيس توماس سانكارا واثنا عشر من رفاقه في 15 أكتوبر 1987. ويضم تمثالًا كبيرًا لـ«أبي الثورة»، والقاعة التي وقعت فيها المأساة، ومنذ مايو 2025 ضريحًا صممه المعماري البوركيني فرانسيس كيري الحائز جائزة بريتزكر، يرقد فيه الضحايا الثلاثة عشر. مكان للتأمل يرتاده كثيرون، لا سيما في 15 أكتوبر وما حوله.",
      tips: "مكان للذكرى: لباس لائق وسلوك يتسم بالاحترام؛ استفسر في الموقع بشأن التصوير. " + AR_SECU,
    },
    "cathedrale-de-ouagadougou": {
      name: "كاتدرائية الحبل بلا دنس",
      summary: "الكاتدرائية الكبيرة المبنية بالطوب المغري في وسط المدينة، شُيّدت في ثلاثينيات القرن العشرين.",
      description: "شُيّدت كاتدرائية الحبل بلا دنس في ثلاثينيات القرن العشرين بالطوب الطيني، وهي من أكبر المباني الدينية في البلاد ومعلم من معالم وسط واغادوغو. تبرز واجهتها الضخمة ذات البرجين وأقواسها ونوافذها الدائرية الزرقاء فوق ساحة واسعة. وتجمع قداديس عيد الميلاد وعيد الفصح الكبرى حشودًا غفيرة.",
      tips: "لباس لائق؛ لا زيارات أثناء الصلوات. " + AR_SECU,
    },
    "musee-de-la-musique-ouagadougou": {
      name: "متحف الموسيقى جورج ويدراوغو",
      summary: "بالافونات وطبول وقيثارات-أعواد ومزامير من التقاليد الموسيقية في البلاد.",
      description: "تأسس متحف الموسيقى عام 1999 في وسط واغادوغو، ويعرض نحو ثلاثمئة آلة موسيقية تقليدية من بوركينا فاسو مصنفة حسب فئاتها: طبول وبالافونات ومزامير وقيثارات-أعواد وسانزات… وتضع الصور والشروح كل آلة في سياق استخدامها الاجتماعي، من التواصل في القرى إلى الاحتفالات. الزيارة مصحوبة بمرشد.",
      tips: AR_SECU,
    },
    "grand-marche-rood-woko": {
      name: "السوق الكبير رود ووكو",
      summary: "السوق المركزي الكبير في العاصمة، أعيد بناؤه بعد حريق عام 2003.",
      description: "رود ووكو («السوق الكبير» بلغة الموري) هو القلب التجاري لواغادوغو منذ ستينيات القرن العشرين. دمّره حريق عام 2003، ثم أعيد بناؤه وافتُتح مجددًا عام 2009 في مبنى من الطوب ذي أسقف واسعة. أقمشة وبهارات وأدوات ومنتجات يومية: انغماس في صخب العاصمة.",
      tips: "ازدحام شديد: انتبه لأغراضك وفاوض بابتسامة. " + AR_SECU,
    },
    "village-artisanal-de-ouagadougou": {
      name: "القرية الحرفية في واغادوغو",
      summary: "مئات الحرفيين في العمل: البرونز والجلد والنسيج والنحت والبوغولان.",
      description: "افتُتحت القرية الحرفية في واغادوغو عام 2000، وتضم حول فناء مركزي ورشًا ومتاجر يعمل فيها، بحسب الفترات، ما بين 400 و500 حرفي من أكثر من خمس وعشرين حرفة: سبّاكو البرونز، وصنّاع الجلود، والنسّاجون، والخزّافون، والنحّاتون، والصبّاغون، وصانعو الآلات الموسيقية. ويمكن مشاهدة القطع وهي تُصنع قبل شرائها.",
      tips: AR_SECU,
    },
    "parc-urbain-bangr-weoogo": {
      name: "المنتزه الحضري بانغر ويوغو",
      summary: "«غابة المعرفة»، رئة خضراء مساحتها 240 هكتارًا في قلب المدينة.",
      description: "كان منتزه بانغر ويوغو («غابة المعرفة» بلغة الموري) في الماضي غابة مقدسة لزعماء الموسي، وهو يحمي اليوم 240 هكتارًا من الغابات وسط المدينة. مسارات للتنزه والرياضة، وبرك، وطيور، وبعض الحيوانات، ومتحف صغير للحياة البرية تجعله مكان الاسترخاء المفضل لسكان العاصمة، خاصة في الصباح الباكر وآخر النهار.",
      tips: AR_SECU,
    },
    "site-de-sculpture-de-laongo": {
      name: "موقع النحت على الغرانيت في لاونغو",
      summary: "متحف في الهواء الطلق: كتل غرانيتية نحتها فنانون من أنحاء العالم.",
      description: "على بعد نحو 35 كيلومترًا شمال شرق واغادوغو، قرب زينياريه، تحوّل حقل من الكتل الغرانيتية منذ عام 1989 إلى متحف للنحت في الهواء الطلق. وخلال ملتقيات متتالية أطلقها النحات البوركيني كي سيريكي، نحت فنانون من بلدان كثيرة الحجر في مكانه، ومزجوه أحيانًا بالمعدن. وتُكتشف عشرات الأعمال خلال نزهة بين الصخور.",
      tips: "احمل قبعة وماء، فالظل قليل في الموقع. " + AR_SECU,
    },
    "crocodiles-sacres-de-bazoule": {
      name: "بركة التماسيح المقدسة في بازوليه",
      summary: "تماسيح يقدّسها القرويون ويحمونها، على بعد 30 كيلومترًا من العاصمة.",
      description: "تروي الرواية الشفوية أن تمساحًا قاد قديمًا سكان بازوليه، وقد أصابهم الجفاف، إلى نبع ماء: ومنذ ذلك الحين تحظى تماسيح بركة القرية بالتقديس والحماية. وقد اعتادت وجود البشر فيمكن الاقتراب منها حين يطعمها الحراس، ما جعل بازوليه إحدى الرحلات الكلاسيكية انطلاقًا من واغادوغو.",
      tips: "إنها حيوانات برية: اتبع تعليمات الحراس بدقة واحترم قدسية المكان. " + AR_SECU,
    },
    "maquis-et-soirees-de-ouagadougou": {
      name: "الماكي وسهرات واغادوغو",
      summary: "الماكي، المطعم الشعبي في الهواء الطلق، قلب الحياة الاجتماعية والليلية.",
      description: "في واغادوغو، تدور الحياة المسائية في «الماكي»، وهي مطاعم ومشارب شعبية في الهواء الطلق توجد في كل الأحياء. يتشارك الناس فيها الدجاج المشوي أو «دجاج الدراجة» (الدجاج البلدي)، والسمك المشوي، والأسياخ، والمشروبات الباردة، غالبًا على أنغام الموسيقى، ويتبادلون الأحاديث بين الأصدقاء. وخلال فيسباكو أو مهرجان ريكرياترال أو أعياد نهاية السنة، تسهر المدينة إلى وقت أطول.",
      tips: "اطلب نصيحة السكان لاختيار ماكي حيوي وآمن. " + AR_SECU,
    },
    "gare-de-bobo-dioulasso": {
      name: "محطة قطار بوبو ديولاسو",
      summary: "محطة من ثلاثينيات القرن العشرين على الطراز السوداني الجديد، على خط أبيدجان–واغادوغو.",
      description: "افتُتحت المحطة للحركة في 1933-1934، حين أصبحت بوبو ديولاسو المحطة النهائية المؤقتة لسكة الحديد القادمة من أبيدجان، وهي من أكثر المباني الاستعمارية تصويرًا في البلاد. تستعيد واجهتها المسننة، المزروعة بقطع خشبية بارزة، عناصر العمارة السودانية للمساجد الطينية. وتقع قرب وسط المدينة.",
      tips: AR_SECU,
    },
    "village-de-koumi": {
      name: "قرية كومي",
      summary: "قرية لشعب البوبو ذات بيوت طينية مستندة إلى جرف صخري.",
      description: "على بعد نحو 16 كيلومترًا من بوبو ديولاسو، كومي قرية لشعب البوبو ينتسب سكانها إلى النواة الأصلية للمدينة، «سيا». تعكس بيوتها الطينية المبنية على جرف صخري التنظيم الاجتماعي للجماعة ومعتقداتها، وقد حافظت القرية على عمارتها في وجه التمدن. وأدرجتها بوركينا فاسو عام 2026 في قائمتها التمهيدية للتراث العالمي.",
      tips: "قرية مأهولة: الزيارة برفقة مرشد محلي وبموافقة السكان. " + AR_SECU,
    },
    "village-de-koro": {
      name: "قرية كورو المعلّقة",
      summary: "قرية طينية فوق تلة، على بعد اثني عشر كيلومترًا تقريبًا من بوبو.",
      description: "على بعد 12 كيلومترًا شرق بوبو ديولاسو، تحتل قرية كورو قمة تلة صخرية عند الطرف الشمالي الشرقي لجرف بانفورا. وتقول الرواية إن سكانها استقروا هناك في زمن حروب ساموري ليروا العدو قادمًا من بعيد. وتطل بيوتها الطينية المتشبثة بالصخور على السهل في مشهد واسع.",
      tips: "قرية مأهولة: الزيارة برفقة مرشد محلي، واستأذن قبل التصوير. " + AR_SECU,
    },
    "mare-aux-hippopotames-bala": {
      name: "بركة أفراس النهر في بالا",
      summary: "محمية محيط حيوي لليونسكو يعيش فيها نحو ستين فرس نهر.",
      description: "على بعد نحو ستين كيلومترًا شمال شرق بوبو ديولاسو، تحيط هذه الغابة المصنفة منذ عام 1937 ببركة يغذيها نهر موهون (الفولتا السوداء) ويعيش فيها نحو ستين فرس نهر. وهي محمية محيط حيوي لليونسكو منذ 1986 وموقع رامسار، وتديرها جمعية قروية، كما أُدرجت منذ 2026 في القائمة التمهيدية للتراث العالمي. وكانت الجولات تُنظَّم تقليديًا بالزوارق مع الصيادين.",
      tips: "ابقَ على مسافة بعيدة من أفراس النهر. " + AR_SECU,
      bestPeriod: "موسم الجفاف (من ديسمبر إلى أبريل)",
    },
    "parc-national-kabore-tambi": {
      name: "منتزه كابوريه تامبي الوطني",
      summary: "سافانا وغابات رواقية على امتداد الفولتا الحمراء، بين بو وواغادوغو.",
      description: "أُنشئ المنتزه عام 1976 باسم منتزه بو الوطني، ويحمل اسم حارس قتله صيادون غير شرعيين عام 1991. تؤوي مساحته البالغة 2427 كيلومترًا مربعًا من السافانا والغابات الرواقية، التي تعبرها الفولتا الحمراء، الفيلة والظباء والقردة والخنازير الثؤلولية وطيورًا كثيرة. ويمتد شمال بو على جانبي طريق واغادوغو–بو.",
      tips: AR_SECU,
      bestPeriod: "موسم الجفاف (من ديسمبر إلى أبريل)",
    },
    "mosquees-de-bani": {
      name: "مساجد باني",
      summary: "«مدينة المساجد السبعة» الطينية، تحفة العمارة الساحلية.",
      description: "جنوب دوري، تشتهر بلدة باني الصغيرة الملقبة بـ«مدينة المساجد السبعة» بمساجدها الطينية ذات الأبراج العالية المدببة، المبنية على التلة وأسفلها، ومنها المسجد الكبير للفولاني. وتُعد هذه المباني من أجمل نماذج العمارة الطينية في الساحل البوركيني.",
      tips: "من أخطر مناطق البلاد ويُنصح بشدة بعدم زيارتها: تُعرض هنا بوصفها تراثًا فقط. " + AR_SECU,
    },
    "crocodiles-sacres-de-sabou": {
      name: "بركة التماسيح المقدسة في سابو",
      summary: "أشهر بركة للتماسيح المقدسة في البلاد، على طريق بوبو ديولاسو.",
      description: "على بعد نحو عشرين كيلومترًا جنوب كودوغو، على الطريق الوطني رقم 1، تشتهر سابو ببركة التماسيح المقدسة. وتعدّ عائلة كابوريه، القيّمة على المكان، هذه الحيوانات أسلافًا؛ فهي محمية وتُطعَم تحت إشراف الحراس الذين يسمحون للزوار بالاقتراب منها.",
      tips: "حيوانات برية: اتبع تعليمات الحراس بدقة. " + AR_SECU,
    },
    "festima-dedougou": {
      name: "فستيما، المهرجان الدولي للأقنعة والفنون",
      summary: "الملتقى الكبير لجمعيات الأقنعة في غرب أفريقيا، في ديدوغو.",
      description: "أُنشئ مهرجان فستيما عام 1996، ويجمع في ديدوغو، مبدئيًا كل عامين، جمعيات أقنعة من المنطقة كلها ومن البلدان المجاورة: أقنعة من الأوراق والألياف والخشب لشعوب البوابا والبوبو والماركا والموسي وغيرها، ترقص على إيقاع الطبول والمزامير. ويرافق المهرجان ندوة علمية ومعارض حول تراث الأقنعة.",
      tips: "الأقنعة مقدسة: اتبع تعليمات المنظمين والمُلقَّنين، خاصة بشأن التصوير. " + AR_SECU,
      bestPeriod: "السنوات الزوجية، من فبراير إلى مايو بحسب الدورة",
    },
    "site-metallurgique-de-douroula": {
      name: "موقع تعدين الحديد القديم في دورولا",
      summary: "أقدم آثار إنتاج الحديد في البلاد، المدرجة في قائمة اليونسكو.",
      description: "قرب قرية دورولا، غير بعيد عن نهر موهون، تشهد بقايا أفران وخبث على إنتاج قديم جدًا للحديد تعيده اليونسكو إلى القرن الثامن قبل الميلاد. ودورولا أحد المكونات الخمسة لـ«مواقع تعدين الحديد القديم في بوركينا فاسو» المدرجة في قائمة التراث العالمي عام 2019، إلى جانب تيويغا وياماني وكينديبو وبيكوي، حيث لا تزال أفران قائمة.",
      tips: AR_SECU,
    },
    "parc-national-d-arly": {
      name: "منتزه أرلي الوطني",
      summary: "سافانا وتلال من الحجر الرملي وأنهار في محمية أرلي، على حدود بنين.",
      description: "أُنشئت محمية أرلي الكاملة للحياة البرية عام 1954، وكثيرًا ما تسمى منتزه أرلي الوطني، وتمتد على طول نهر أرلي على الحدود مع منتزه بنجاري في بنين. وكانت تلال الحجر الرملي والغابات الرواقية والأراضي الرطبة (موقع رامسار منذ 2009) تؤوي إحدى أغنى الحيوانات البرية في البلاد. وهي جزء من مجمع W-أرلي-بنجاري المدرج في قائمة التراث العالمي.",
      tips: "من أخطر مناطق البلاد ويُنصح بشدة بعدم زيارتها: تُعرض هنا بوصفها تراثًا فقط. " + AR_SECU,
    },
  },
  circuits: {},
  stepNotes: {},
};

export const BURKINA_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
