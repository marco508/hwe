/**
 * Traductions du contenu de départ du guide Bénin (voir ./benin.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de benin.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "Cuna del vudú, tierra de los reinos de Abomey y Porto-Novo, Benín ofrece a pocas horas de carretera playas de cocoteros, poblados lacustres, palacios reales declarados Patrimonio de la UNESCO y, en el norte, algunas de las sabanas y parques nacionales mejor conservados de África Occidental.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado, que se solicita en línea (e-visa) en el portal oficial del Gobierno de Benín. Los ciudadanos de la CEDEAO están exentos. Compruebe siempre los requisitos actualizados en las fuentes oficiales antes de salir: pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos (repelente, mosquitera). Beba agua embotellada.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA). El efectivo sigue siendo imprescindible fuera de las grandes ciudades; el pago por móvil (mobile money) está muy extendido. Las tarjetas bancarias se aceptan en los hoteles y los comercios importantes de Cotonou.",
      },
      {
        title: "Cuándo ir",
        body: "El sur tiene dos estaciones de lluvias (aproximadamente de abril a julio y de septiembre a octubre); el norte, una sola (aproximadamente de mayo a octubre). La época más agradable va de noviembre a marzo, la estación seca, con el harmattan (viento seco y polvoriento) de diciembre a febrero. Los parques del norte se visitan sobre todo en la estación seca.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El francés es la lengua oficial; en el día a día se hablan, entre otras, el fon, el yoruba, el bariba y el dendi. Saludar antes de pedir cualquier cosa es fundamental. En los lugares sagrados (templos, bosques sagrados, conventos), siga las indicaciones del guía y pida permiso antes de fotografiar a una persona o una ceremonia.",
      },
      {
        title: "Desplazarse",
        body: "Los mototaxis (zemidjans, reconocibles en Cotonou por su camisa amarilla) son el medio más habitual en la ciudad; exija un casco. Entre ciudades: taxis colectivos, autobuses y coches con conductor. Para el norte y los parques, se recomienda encarecidamente un coche con conductor-guía.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo C y E (enchufes europeos). Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al mobile money.",
      },
      {
        title: "Seguridad",
        body: "El sur y el centro del país se visitan con una vigilancia normal: cuidado con los robos en los mercados y de noche en Cotonou, y prudencia en la carretera (evite circular de noche). El norte, en cambio, está expuesto al riesgo terrorista: las autoridades francesas y británicas desaconsejan formalmente los parques de la Pendjari y W, sus alrededores y las zonas fronterizas con Burkina Faso y Níger, y desaconsejan, salvo motivo imperativo, el resto de los departamentos de Atacora y Alibori, así como el este del país entre el eje Tchaourou–Malanville y la frontera con Nigeria. Consulte las recomendaciones de viaje de su país justo antes de salir y registre su viaje en su embajada.",
      },
    ],
  },
  destinations: {
    cotonou: {
      summary: "Animada capital económica entre laguna y océano: mercados, arte contemporáneo y vida nocturna.",
      description:
        "La ciudad más grande del país, Cotonou es el punto de llegada de la mayoría de los viajeros. Se viene por la energía de sus mercados, empezando por Dantokpa, uno de los más grandes de África Occidental, por sus galerías y espacios de arte contemporáneo, sus maquis (restaurantes populares) donde probar la cocina beninesa y sus playas urbanas. También es una base práctica para recorrer Ganvié, Ouidah y Porto-Novo.",
    },
    ganvie: {
      summary: "La «Venecia de África»: un pueblo entero sobre pilotes en medio del lago Nokoué.",
      description:
        "A unos veinte kilómetros al norte de Cotonou, Ganvié es uno de los mayores poblados lacustres de África. Sus habitantes, de origen tofinu, se habrían instalado allí hace varios siglos para escapar de las razias. Casas sobre pilotes, escuelas, mercado flotante: todo se hace en piragua. Una excursión de medio día desde el embarcadero de Abomey-Calavi.",
    },
    ouidah: {
      summary: "Ciudad de memoria de la trata de esclavos y capital espiritual del vudú.",
      description:
        "Antiguo gran puerto de la trata negrera, Ouidah conserva la memoria de esta tragedia a lo largo de la Ruta de los Esclavos, que lleva hasta la Puerta del No Retorno en la playa. Es también la capital espiritual del vudú: el Templo de las Pitones frente a la basílica, el bosque sagrado de Kpassè y, cada mes de enero, las grandes celebraciones de los Vodun Days. Una etapa imprescindible a 40 km de Cotonou.",
    },
    "porto-novo": {
      summary: "Capital oficial, ciudad real de casas afrobrasileñas y museos notables.",
      description:
        "Capital administrativa de Benín, Porto-Novo es más tranquila que Cotonou y posee un patrimonio singular: el palacio real del rey Toffa convertido en museo, la Gran Mezquita de estilo afrobrasileño, casas coloniales, un jardín botánico y el Centro Songhaï, escaparate de la agricultura sostenible. A 30 km de Cotonou.",
    },
    abomey: {
      summary: "Antigua capital del reino de Dahomey y sus palacios reales declarados Patrimonio de la UNESCO.",
      description:
        "Del siglo XVII al XIX, doce reyes se sucedieron en Abomey, capital del poderoso reino de Danhomè. Cada uno mandó construir su palacio: el conjunto de los palacios reales, cuyos muros están adornados con bajorrelieves que narran la historia del reino, está inscrito en el Patrimonio Mundial de la UNESCO. Abomey es famosa también por sus tapices de aplicación y su artesanía. A unas 2 h 30 por carretera desde Cotonou.",
    },
    "grand-popo": {
      summary: "Playas de arena bordeadas de cocoteros y desembocadura del río Mono.",
      description:
        "Al oeste de Ouidah, cerca de la frontera con Togo, Grand-Popo es el destino de playa de Benín: largas playas de arena, cocoteros, pequeños hoteles y maquis de pescado a la parrilla. Muy cerca, la Bouche du Roy, donde el río Mono se une al océano, se descubre en piragua. Atención: el mar es peligroso para el baño.",
    },
    possotome: {
      name: "Possotomè y el lago Ahémé",
      summary: "Pueblos de pescadores a orillas del lago Ahémé, conocidos por sus manantiales de agua mineral.",
      description:
        "En la orilla oeste del lago Ahémé, Possotomè es conocido por sus manantiales de agua mineral y sus tranquilos campamentos. Allí se descubre la pesca tradicional en piragua, las plantas medicinales, los pueblos vecinos y paseos en bicicleta por el campo. Una etapa relajante entre Ouidah y Abomey.",
    },
    "dassa-zoume": {
      summary: "La ciudad de las 41 colinas y uno de los grandes lugares de peregrinación de África Occidental.",
      description:
        "En el centro del país, Dassa-Zoumè está rodeada de colinas graníticas a las que se puede subir para disfrutar de bellas vistas. La gruta mariana de Arigbo atrae cada año, en agosto, a multitudes de peregrinos llegados de toda la subregión. Una etapa natural en la ruta hacia el norte.",
    },
    natitingou: {
      name: "Natitingou y el Atacora",
      summary: "Montañas del Atacora, cascadas y casas-fortaleza Tata Somba.",
      description:
        "Capital del noroeste, Natitingou es la puerta del Atacora, región de relieves y valles donde viven, entre otros, los batammariba. Sus casas-fortaleza con torrecillas, las Tata Somba, se cuentan entre las arquitecturas de tierra más sorprendentes de África, y cascadas, mercados y senderismo completan el descubrimiento. No obstante, el departamento de Atacora es hoy objeto de advertencias oficiales por el riesgo terrorista (véase Seguridad): infórmese antes de cualquier proyecto.",
    },
    pendjari: {
      name: "Parque Nacional de la Pendjari",
      summary: "Uno de los últimos grandes refugios de fauna de África Occidental: elefantes, leones, búfalos.",
      description:
        "En el noroeste del país, el Parque Nacional de la Pendjari forma parte del complejo W-Arly-Pendjari, inscrito en el Patrimonio Mundial de la UNESCO. Sus sabanas, bosques de galería y charcas albergan elefantes, búfalos, hipopótamos, antílopes y, más discretos, leones y otros grandes felinos. Varios gobiernos desaconsejan actualmente de forma rotunda el parque y sus alrededores por el riesgo terrorista: esta ficha presenta el lugar para el día en que las condiciones permitan volver a visitarlo.",
    },
  },
  places: {
    "marche-dantokpa": {
      name: "Mercado de Dantokpa",
      summary: "Inmenso mercado a orillas de la laguna: telas, especias, artesanía y el mercado de fetiches.",
      description:
        "Dantokpa (o «Tokpa») se extiende sobre varias hectáreas a orillas de la laguna de Cotonou. Allí se encuentra de todo: telas y wax, especias, productos frescos, ferretería, artesanía y, en una sección dedicada, los objetos e ingredientes utilizados en las prácticas vudú. Una inmersión impactante en la vida económica del país.",
      tips: "Venga por la mañana, mantenga sus pertenencias cerca y, para una primera visita, vaya acompañado. Pida permiso antes de hacer fotos.",
    },
    "place-de-l-amazone": {
      name: "Plaza de la Amazona",
      summary: "Monumental estatua en homenaje a las guerreras del reino de Dahomey.",
      description:
        "Erigida en el paseo marítimo, la estatua de la Amazona celebra a las Agojié, el cuerpo de guerreras del reino de Danhomè (Abomey). El lugar, acondicionado como explanada, se ha convertido en uno de los símbolos del Cotonou actual y en un lugar de paseo al final del día.",
    },
    "plage-de-fidjrosse": {
      name: "Playa de Fidjrossè",
      summary: "Larga playa urbana bordeada de chiringuitos, muy animada los fines de semana.",
      description:
        "Al oeste de la ciudad, la playa de Fidjrossè es el punto de encuentro de los habitantes de Cotonou los fines de semana: chiringuitos, pescado a la parrilla, música y puestas de sol sobre el océano. El baño es peligroso (fuertes corrientes, grandes olas): se viene sobre todo por el ambiente.",
      tips: "No se bañe: las corrientes de la costa beninesa son muy fuertes.",
    },
    "centre-artisanal-cotonou": {
      name: "Centro de Promoción de la Artesanía",
      summary: "Talleres y tiendas de artesanos: bronces, tapices de aplicación, máscaras, joyas.",
      description:
        "El centro de promoción de la artesanía, que reúne a numerosos artesanos, permite comprar esculturas, bronces, tapices de aplicación inspirados en los bajorrelieves de Abomey, máscaras, cestería y joyas, a menudo viendo trabajar a los artesanos. El regateo forma parte del intercambio.",
    },
    "cite-lacustre-de-ganvie": {
      name: "Poblado lacustre de Ganvié",
      summary: "Paseo en piragua entre las casas sobre pilotes y el mercado flotante.",
      description:
        "La visita se hace en piragua a motor o a remo desde el embarcadero de Calavi. Se navega entre las casas sobre pilotes, los cercados de pesca (acadjas), la escuela y el mercado flotante donde las mujeres venden desde sus barcas. Los habitantes viven aquí su día a día: se impone la discreción.",
      tips: "Negocie el precio de la piragua en el embarcadero oficial. Pida siempre permiso antes de fotografiar a los habitantes.",
    },
    "route-des-esclaves": {
      name: "Ruta de los Esclavos",
      summary: "Recorrido de memoria de 4 km entre la ciudad y la playa, jalonado de monumentos.",
      description:
        "La Ruta de los Esclavos recorre el último trayecto de los cautivos, desde la plaza de las subastas hasta la playa donde eran embarcados. A lo largo de los cuatro kilómetros, estatuas y monumentos evocan las etapas de este camino: el árbol del olvido, la choza Zomaï, el memorial. Un recorrido conmovedor, preferiblemente con un guía.",
      tips: "Hágalo a pie o en bicicleta temprano por la mañana, con agua: hace calor y hay poca sombra.",
    },
    "porte-du-non-retour": {
      name: "Puerta del No Retorno",
      summary: "Memorial frente al océano, en el lugar donde se embarcaba a los cautivos.",
      description:
        "Al final de la Ruta de los Esclavos, el arco monumental de la Puerta del No Retorno se alza frente al Atlántico. Inaugurado en los años noventa en el marco del proyecto «La Ruta del Esclavo» de la UNESCO, rinde homenaje a los millones de africanos deportados a las Américas. Un lugar de recogimiento tanto como un símbolo.",
    },
    "temple-des-pythons": {
      name: "Templo de las Pitones",
      summary: "Templo vudú dedicado al dios Dangbé, donde viven pitones sagradas.",
      description:
        "Frente a la basílica de la Inmaculada Concepción, el Templo de las Pitones está consagrado a Dangbé, divinidad protectora representada por la pitón real. Las serpientes, inofensivas para el ser humano, son veneradas allí; la visita guiada explica los fundamentos del vudú y su papel en la sociedad beninesa. El templo y la basílica, uno frente a otra, ilustran la convivencia de los cultos en Ouidah.",
    },
    "basilique-de-ouidah": {
      name: "Basílica de la Inmaculada Concepción",
      summary: "Gran iglesia de principios del siglo XX, frente al Templo de las Pitones.",
      description:
        "Ouidah fue una de las primeras ciudades de la región en ser evangelizadas. Su basílica, construida a principios del siglo XX, domina la plaza principal frente al Templo de las Pitones. Su arquitectura colonial y sus vidrieras la convierten en una etapa del recorrido por el centro histórico.",
    },
    "foret-sacree-de-kpasse": {
      name: "Bosque sagrado de Kpassè",
      summary: "Bosque sagrado poblado de esculturas vudú, ligado a la leyenda del rey Kpassè.",
      description:
        "Según la tradición, el rey Kpassè, fundador de Ouidah, se habría transformado allí en árbol para escapar de sus enemigos. El bosque sagrado alberga este árbol venerado y numerosas esculturas, algunas realizadas para el festival Ouidah 92, que representan a las divinidades del vudú. Un lugar sombreado y apacible en el corazón de la ciudad.",
    },
    "musee-d-histoire-de-ouidah": {
      name: "Museo de Historia de Ouidah",
      summary: "Instalado en el antiguo fuerte portugués, recorre la historia de la trata y del reino.",
      description:
        "Ubicado en el fuerte portugués de São João Baptista de Ajudá, el museo recorre la historia de Ouidah: el comercio europeo en la costa, la trata negrera, los vínculos con Brasil y el Caribe, y el reino de Danhomè. Un buen punto de partida para comprender la ciudad antes de seguir la Ruta de los Esclavos.",
    },
    "vodun-days": {
      name: "Fiesta del Vudú (Vodun Days)",
      summary: "Cada mes de enero, ceremonias, danzas y desfiles celebran los cultos vudú.",
      description:
        "El 10 de enero es el día nacional de las religiones endógenas en Benín. En Ouidah, las celebraciones adquieren la dimensión de un gran festival, llamado ahora Vodun Days: ceremonias, danzas de máscaras (entre ellas los Egungun y los Zangbeto), música y una concentración en la playa. Una época muy solicitada: reserve su alojamiento con mucha antelación.",
      tips: "Las fechas exactas y el programa los publican cada año los organizadores: compruébelos antes de reservar.",
      bestPeriod: "Principios de enero (en torno al 10 de enero)",
    },
    "musee-honme": {
      name: "Museo Honmè (palacio del rey Toffa)",
      summary: "El antiguo palacio real de Porto-Novo, sus patios y sus objetos de corte.",
      description:
        "El museo Honmè ocupa la antigua residencia de los reyes de Hogbonou (Porto-Novo), entre ellos el rey Toffa. La visita de sus patios sucesivos permite descubrir la organización de la vida real, los aposentos de las reinas y los objetos de culto y de poder. Un testimonio excepcional de arquitectura palaciega.",
    },
    "grande-mosquee-porto-novo": {
      name: "Gran Mezquita de Porto-Novo",
      summary: "Colorida fachada de estilo afrobrasileño, inspirada en las iglesias de Bahía.",
      description:
        "Construida a principios del siglo XX por los «agudás», descendientes de antiguos esclavos regresados de Brasil, la Gran Mezquita retoma la arquitectura de las iglesias barrocas de Bahía, con su colorida fachada. Ilustra la herencia afrobrasileña de la ciudad. Visita exterior; el interior se visita según las normas de la comunidad.",
      tips: "Ropa que cubra el cuerpo; no la visite durante las oraciones.",
    },
    "musee-da-silva": {
      name: "Museo Da Silva",
      summary: "Casa afrobrasileña dedicada a la historia de los retornados de Brasil.",
      description:
        "Instalado en una bella mansión de estilo afrobrasileño, el museo Da Silva evoca la historia de las familias que regresaron de Brasil en el siglo XIX y su influencia en la arquitectura, la cocina y la cultura de la costa beninesa. Objetos, fotografías y mobiliario de época.",
    },
    "centre-songhai": {
      name: "Centro Songhaï",
      summary: "Granja escuela pionera de la agricultura sostenible, con tienda y restaurante.",
      description:
        "Fundado en Porto-Novo en los años ochenta, el Centro Songhaï forma a jóvenes agricultores y experimenta una agricultura integrada (cultivos, ganadería, piscicultura, transformación) que se ha convertido en un modelo en África. La visita guiada muestra las instalaciones; después se puede comer en el restaurante y comprar los productos de la granja.",
    },
    "jardin-des-plantes-porto-novo": {
      name: "Jardín de las Plantas y de la Naturaleza",
      summary: "Parque sombreado en el corazón de la ciudad, con un bosque sagrado y monos.",
      description:
        "En el centro de Porto-Novo, este jardín conserva un fragmento de bosque donde viven monos y aves, así como un pequeño bosque sagrado. Una pausa verde y fresca entre dos visitas.",
    },
    "palais-royaux-d-abomey": {
      name: "Palacios reales de Abomey",
      summary: "Conjunto de palacios reales inscrito en el Patrimonio Mundial de la UNESCO.",
      description:
        "Los palacios reales de Abomey ocupan un vasto recinto rodeado de muros de tierra. Los bajorrelieves policromados de sus fachadas narran las hazañas de los reyes de Danhomè y constituyen un verdadero libro de historia. El sitio está inscrito en el Patrimonio Mundial de la UNESCO desde 1985 y es objeto de grandes obras de puesta en valor.",
      tips: "Hay obras de renovación y un nuevo museo en curso: infórmese sobre las partes abiertas antes de ir.",
    },
    "artisans-d-abomey": {
      name: "Artesanos de Abomey",
      summary: "Tapices de aplicación, bronces y herreros, herederos de los gremios reales.",
      description:
        "Las familias de artesanos de Abomey perpetúan saberes que antaño estaban al servicio de los reyes: tapices de aplicación con motivos simbólicos, fundición de bronce a la cera perdida, forja. Varios talleres se pueden visitar y venden directamente sus creaciones.",
    },
    "plage-de-grand-popo": {
      name: "Playa de Grand-Popo",
      summary: "Gran playa salvaje, ideal para descansar a la sombra de los cocoteros.",
      description:
        "La playa de Grand-Popo se extiende a lo largo de kilómetros entre el océano y la laguna. Se viene por la calma, las puestas de sol y el pescado a la parrilla. Los hoteles y campamentos a pie de playa permiten disfrutar del lugar durante varios días.",
      tips: "Baño totalmente desaconsejado (grandes olas y corrientes violentas).",
    },
    "bouche-du-roy": {
      summary: "Desembocadura del Mono, manglares y pueblos de pescadores, para descubrir en piragua.",
      description:
        "La Bouche du Roy es la desembocadura del río Mono en el océano. Una excursión en piragua atraviesa manglares y canales hasta los pueblos de pescadores y los bancos de arena. La zona forma parte de una reserva de la biosfera transfronteriza con Togo (delta del Mono).",
    },
    "lac-aheme": {
      name: "Lago Ahémé",
      summary: "Gran lago apacible: salidas en piragua con los pescadores, pueblos lacustres.",
      description:
        "El lago Ahémé, de unos veinte kilómetros de largo, da vida a numerosos pueblos de pescadores. Los campamentos proponen salidas en piragua al amanecer para descubrir la pesca con esparavel y los acadjas, así como caminatas hacia los pueblos vecinos.",
    },
    "grotte-notre-dame-d-arigbo": {
      name: "Gruta de Nuestra Señora de Arigbo",
      summary: "Santuario mariano al pie de las colinas, con una gran peregrinación cada mes de agosto.",
      description:
        "El santuario mariano de Arigbo se desarrolló en torno a una gruta al pie de las colinas. La peregrinación anual, a finales de agosto, reúne a decenas de miles de fieles llegados de Benín y de los países vecinos. El resto del año, el lugar está tranquilo y se visita libremente.",
      bestPeriod: "Peregrinación a finales de agosto; lugar tranquilo el resto del año",
    },
    "collines-de-dassa": {
      name: "Colinas de Dassa",
      summary: "Caminatas por las colinas graníticas y vistas panorámicas sobre la región.",
      description:
        "Las colinas rocosas que rodean Dassa-Zoumè se prestan a caminatas cortas. Algunas albergan lugares sagrados y antiguos refugios de la población local. Salga temprano por la mañana con un guía local, buen calzado y agua.",
    },
    "tata-somba": {
      summary: "Casas-fortaleza de tierra con torrecillas, en la región de Boukoumbé.",
      description:
        "Las tata (o takienta) son las viviendas tradicionales de los batammariba: verdaderos pequeños castillos de tierra con pisos y torrecillas, que albergan personas, reservas y animales. Se visitan en la región de Boukoumbé y alrededor de Natitingou, acompañado de un guía que explica su simbolismo. El paisaje cultural vecino de Koutammakou, del lado togolés, está inscrito en la UNESCO.",
      tips: "La familia que le recibe suele pedir una contribución; recurra a un guía local.",
    },
    "cascade-de-kota": {
      name: "Cascada de Kota",
      summary: "Salto de agua y poza natural a unos quince kilómetros de Natitingou.",
      description:
        "Escondida en un valle verde cerca de Natitingou, la cascada de Kota cae en una poza natural. Un lugar apreciado para pasear y hacer un pícnic, más espectacular durante la estación de lluvias y justo después.",
      bestPeriod: "De agosto a noviembre (mayor caudal)",
    },
    "musee-regional-natitingou": {
      name: "Museo Regional de Natitingou",
      summary: "Introducción a los pueblos y a la arquitectura del noroeste de Benín.",
      description:
        "El museo regional presenta las culturas del Atacora: vivienda tradicional (incluidas maquetas de tata), objetos cotidianos, instrumentos musicales, adornos. Una buena introducción antes de salir al encuentro de los pueblos.",
    },
    "safari-pendjari": {
      name: "Safari en la Pendjari",
      summary: "Observación de la fauna en vehículo, alrededor de las charcas y a lo largo del río.",
      description:
        "Las pistas del parque llevan a las charcas donde los animales acuden a beber, sobre todo al final de la estación seca. Salga al amanecer o a última hora de la tarde, los momentos más favorables para la observación. La entrada y los recorridos se rigen por las normas fijadas por el gestor del parque: infórmese sobre las condiciones de visita y de seguridad antes de salir.",
      tips: "Visita actualmente desaconsejada de forma rotunda (riesgo terrorista): consulte las recomendaciones de viaje oficiales antes de cualquier proyecto.",
      bestPeriod: "De diciembre a mayo (estación seca)",
    },
    "cascades-de-tanougou": {
      name: "Cascadas de Tanougou",
      summary: "Saltos de agua y pozas al pie de la cadena del Atacora, cerca del parque.",
      description:
        "En la ruta hacia la Pendjari, las cascadas de Tanougou descienden por los acantilados del Atacora formando varias pozas donde refrescarse. Una parada agradable antes o después del safari.",
      tips: "Visita actualmente desaconsejada de forma rotunda (riesgo terrorista): consulte las recomendaciones de viaje oficiales antes de cualquier proyecto.",
    },
  },
  circuits: {
    "benin-essentiel-7-jours": {
      title: "Lo esencial de Benín en 7 días",
      summary:
        "Una semana en el sur: Cotonou y sus mercados, el poblado lacustre de Ganvié, Porto-Novo, la memoria de Ouidah, las playas de Grand-Popo, el lago Ahémé y los palacios reales de Abomey.",
    },
  },
  stepNotes: {
    "benin-essentiel-7-jours:0": "Llegada, instalación y primer contacto con la ciudad.",
    "benin-essentiel-7-jours:2": "Mañana en piragua por el lago Nokoué.",
    "benin-essentiel-7-jours:3": "Tarde en Porto-Novo.",
    "benin-essentiel-7-jours:9": "Ruta hacia el oeste y descanso junto al mar.",
    "benin-essentiel-7-jours:11": "Salida en piragua al amanecer y después ruta hacia Abomey.",
    "benin-essentiel-7-jours:14": "Regreso a Cotonou, últimas compras en el centro de artesanía.",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Berço do vodu, terra dos reinos de Abomey e de Porto-Novo, o Benim oferece, a poucas horas de estrada, praias de coqueiros, aldeias lacustres, palácios reais classificados pela UNESCO e, no norte, algumas das savanas e parques nacionais mais bem preservados da África Ocidental.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto, que se pede online (e-visa) no portal oficial do Governo do Benim. Os cidadãos da CEDEAO estão isentos. Confirme sempre as condições atualizadas junto das fontes oficiais antes da partida: passaporte válido por vários meses após o regresso, bilhete de regresso, morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "É exigido à entrada o certificado de vacinação contra a febre-amarela. A malária está presente em todo o país: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos (repelente, mosquiteiro). Beba água engarrafada.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa com o euro (1 € = 655,957 francos CFA). O dinheiro em numerário continua a ser indispensável fora das grandes cidades; o pagamento por telemóvel (mobile money) está muito difundido. Os cartões bancários são aceites nos hotéis e nas lojas maiores de Cotonou.",
      },
      {
        title: "Quando ir",
        body: "O sul tem duas estações das chuvas (aproximadamente de abril a julho e de setembro a outubro); o norte, apenas uma (aproximadamente de maio a outubro). O período mais agradável vai de novembro a março, a estação seca, com o harmatão (vento seco e poeirento) de dezembro a fevereiro. Os parques do norte visitam-se sobretudo na estação seca.",
      },
      {
        title: "Línguas e costumes",
        body: "O francês é a língua oficial; no dia a dia falam-se, entre outras, o fon, o iorubá, o bariba e o dendi. Cumprimentar antes de qualquer pedido é essencial. Nos locais sagrados (templos, florestas sagradas, conventos), siga as indicações do guia e peça autorização antes de fotografar uma pessoa ou uma cerimónia.",
      },
      {
        title: "Deslocações",
        body: "Os mototáxis (zemidjans, reconhecíveis em Cotonou pela camisa amarela) são o meio mais comum na cidade; exija um capacete. Entre cidades: táxis coletivos, autocarros e carros com motorista. Para o norte e os parques, recomenda-se vivamente um carro com motorista-guia.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas do tipo C e E (tomadas europeias). Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao mobile money.",
      },
      {
        title: "Segurança",
        body: "O sul e o centro do país visitam-se com a vigilância habitual: atenção aos furtos nos mercados e à noite em Cotonou, e prudência na estrada (evite conduzir de noite). O norte, pelo contrário, está exposto ao risco terrorista: as autoridades francesas e britânicas desaconselham formalmente os parques da Pendjari e do W, as suas imediações e as zonas fronteiriças com o Burkina Faso e o Níger, e desaconselham, salvo motivo imperioso, o resto dos departamentos de Atacora e Alibori, bem como o leste do país entre o eixo Tchaourou–Malanville e a fronteira com a Nigéria. Consulte os conselhos aos viajantes do seu país pouco antes de partir e registe a sua viagem junto da sua embaixada.",
      },
    ],
  },
  destinations: {
    cotonou: {
      summary: "Animada capital económica entre a lagoa e o oceano: mercados, arte contemporânea e vida noturna.",
      description:
        "Maior cidade do país, Cotonou é o ponto de chegada da maioria dos viajantes. Vem-se pela energia dos seus mercados, a começar por Dantokpa, um dos maiores da África Ocidental, pelas galerias e espaços de arte contemporânea, pelos maquis (restaurantes populares) onde provar a cozinha beninense e pelas praias urbanas. É também uma base prática para explorar Ganvié, Ouidah e Porto-Novo.",
    },
    ganvie: {
      summary: "A «Veneza de África»: uma aldeia inteira sobre estacas no meio do lago Nokoué.",
      description:
        "A cerca de vinte quilómetros a norte de Cotonou, Ganvié é uma das maiores aldeias lacustres de África. Os seus habitantes, de origem tofinu, ter-se-ão instalado ali há vários séculos para escapar às razias. Casas sobre estacas, escolas, mercado flutuante: tudo se faz de piroga. Uma excursão de meio dia a partir do cais de embarque de Abomey-Calavi.",
    },
    ouidah: {
      summary: "Cidade de memória do tráfico de escravos e capital espiritual do vodu.",
      description:
        "Antigo grande porto do tráfico negreiro, Ouidah conserva a memória desta tragédia ao longo da Rota dos Escravos, que conduz até à Porta do Não Retorno, na praia. É também a capital espiritual do vodu: o Templo das Pítons em frente à basílica, a floresta sagrada de Kpassè e, todos os anos em janeiro, as grandes celebrações dos Vodun Days. Uma etapa essencial a 40 km de Cotonou.",
    },
    "porto-novo": {
      summary: "Capital oficial, cidade real de casas afro-brasileiras e museus notáveis.",
      description:
        "Capital administrativa do Benim, Porto-Novo é mais calma do que Cotonou e possui um património singular: o palácio real do rei Toffa transformado em museu, a Grande Mesquita de estilo afro-brasileiro, casas coloniais, um jardim botânico e o Centro Songhaï, montra da agricultura sustentável. A 30 km de Cotonou.",
    },
    abomey: {
      summary: "Antiga capital do reino do Daomé e os seus palácios reais classificados pela UNESCO.",
      description:
        "Do século XVII ao XIX, doze reis sucederam-se em Abomey, capital do poderoso reino de Danhomè. Cada um mandou construir o seu palácio: o conjunto dos palácios reais, cujas paredes estão ornamentadas com baixos-relevos que contam a história do reino, está inscrito no Património Mundial da UNESCO. Abomey é também famosa pelas suas tapeçarias de aplicação e pelo seu artesanato. A cerca de 2 h 30 de estrada de Cotonou.",
    },
    "grand-popo": {
      summary: "Praias de areia ladeadas de coqueiros e foz do rio Mono.",
      description:
        "A oeste de Ouidah, perto da fronteira com o Togo, Grand-Popo é o destino de praia do Benim: longas praias de areia, coqueirais, pequenos hotéis e maquis de peixe grelhado. Perto dali, a Bouche du Roy, onde o rio Mono se junta ao oceano, descobre-se de piroga. Atenção: o mar é perigoso para banhos.",
    },
    possotome: {
      name: "Possotomè e o lago Ahémé",
      summary: "Aldeias de pescadores nas margens do lago Ahémé, conhecidas pelas nascentes de água mineral.",
      description:
        "Na margem ocidental do lago Ahémé, Possotomè é conhecida pelas nascentes de água mineral e pelos acampamentos tranquilos. Aqui descobre-se a pesca tradicional de piroga, as plantas medicinais, as aldeias vizinhas e passeios de bicicleta pelo campo. Uma etapa repousante entre Ouidah e Abomey.",
    },
    "dassa-zoume": {
      summary: "A cidade das 41 colinas e um dos grandes locais de peregrinação da África Ocidental.",
      description:
        "No centro do país, Dassa-Zoumè está rodeada de colinas graníticas que se podem subir para apreciar belas vistas. A gruta mariana de Arigbo atrai todos os anos, em agosto, multidões de peregrinos vindos de toda a sub-região. Uma etapa natural na estrada para norte.",
    },
    natitingou: {
      name: "Natitingou e o Atacora",
      summary: "Montanhas do Atacora, cascatas e casas-fortaleza Tata Somba.",
      description:
        "Capital do noroeste, Natitingou é a porta do Atacora, região de relevos e vales onde vivem, entre outros, os Batammariba. As suas casas-fortaleza com torreões, as Tata Somba, contam-se entre as arquiteturas de terra mais surpreendentes de África, e cascatas, mercados e caminhadas completam a descoberta. O departamento de Atacora é, contudo, objeto de avisos oficiais devido ao risco terrorista (ver Segurança): informe-se antes de qualquer projeto.",
    },
    pendjari: {
      name: "Parque Nacional da Pendjari",
      summary: "Um dos últimos grandes refúgios de fauna da África Ocidental: elefantes, leões, búfalos.",
      description:
        "No noroeste do país, o Parque Nacional da Pendjari faz parte do complexo W-Arly-Pendjari, inscrito no Património Mundial da UNESCO. As suas savanas, florestas-galeria e charcos abrigam elefantes, búfalos, hipopótamos, antílopes e, mais discretos, leões e outros grandes felinos. Vários governos desaconselham atualmente de forma formal o parque e as suas imediações devido ao risco terrorista: esta ficha apresenta o local para o dia em que as condições permitam voltar a visitá-lo.",
    },
  },
  places: {
    "marche-dantokpa": {
      name: "Mercado de Dantokpa",
      summary: "Imenso mercado à beira da lagoa: tecidos, especiarias, artesanato e o mercado de feitiços.",
      description:
        "Dantokpa (ou «Tokpa») estende-se por vários hectares à beira da lagoa de Cotonou. Encontra-se de tudo: panos e wax, especiarias, produtos frescos, ferragens, artesanato e, numa secção própria, os objetos e ingredientes usados nas práticas vodu. Um mergulho impressionante na vida económica do país.",
      tips: "Venha de manhã, mantenha os seus pertences junto de si e, numa primeira visita, vá acompanhado. Peça autorização antes de fotografar.",
    },
    "place-de-l-amazone": {
      name: "Praça da Amazona",
      summary: "Estátua monumental em homenagem às guerreiras do reino do Daomé.",
      description:
        "Erguida à beira-mar, a estátua da Amazona celebra as Agojié, o corpo de guerreiras do reino de Danhomè (Abomey). O local, arranjado como esplanada, tornou-se um dos símbolos da Cotonou de hoje e um lugar de passeio ao fim do dia.",
    },
    "plage-de-fidjrosse": {
      name: "Praia de Fidjrossè",
      summary: "Longa praia urbana ladeada de bares, muito animada ao fim de semana.",
      description:
        "A oeste da cidade, a praia de Fidjrossè é o ponto de encontro dos habitantes de Cotonou ao fim de semana: bares de praia, peixe grelhado, música e pores do sol sobre o oceano. Os banhos são perigosos (correntes fortes, ondas grandes): vem-se sobretudo pelo ambiente.",
      tips: "Não tome banho: as correntes da costa beninense são muito fortes.",
    },
    "centre-artisanal-cotonou": {
      name: "Centro de Promoção do Artesanato",
      summary: "Oficinas e lojas de artesãos: bronzes, tapeçarias de aplicação, máscaras, joias.",
      description:
        "Reunindo numerosos artesãos, o centro de promoção do artesanato permite comprar esculturas, bronzes, tapeçarias de aplicação inspiradas nos baixos-relevos de Abomey, máscaras, cestaria e joias, muitas vezes vendo os artesãos a trabalhar. Regatear faz parte da troca.",
    },
    "cite-lacustre-de-ganvie": {
      name: "Aldeia lacustre de Ganvié",
      summary: "Passeio de piroga entre as casas sobre estacas e o mercado flutuante.",
      description:
        "A visita faz-se de piroga a motor ou a remos a partir do cais de Calavi. Desliza-se entre as casas sobre estacas, os cercados de pesca (acadjas), a escola e o mercado flutuante onde as mulheres vendem a partir dos seus barcos. Os habitantes vivem aqui o seu dia a dia: impõe-se a discrição.",
      tips: "Negoceie o preço da piroga no cais oficial. Peça sempre autorização antes de fotografar os habitantes.",
    },
    "route-des-esclaves": {
      name: "Rota dos Escravos",
      summary: "Percurso de memória de 4 km entre a cidade e a praia, marcado por monumentos.",
      description:
        "A Rota dos Escravos refaz o último trajeto dos cativos, desde a praça dos leilões até à praia onde eram embarcados. Ao longo dos quatro quilómetros, estátuas e monumentos evocam as etapas deste caminho: a árvore do esquecimento, a cabana Zomaï, o memorial. Um percurso comovente, de preferência com um guia.",
      tips: "Faça-o a pé ou de bicicleta logo de manhã, com água: está calor e há pouca sombra.",
    },
    "porte-du-non-retour": {
      name: "Porta do Não Retorno",
      summary: "Memorial virado para o oceano, no local onde os cativos eram embarcados.",
      description:
        "No fim da Rota dos Escravos, o arco monumental da Porta do Não Retorno ergue-se de frente para o Atlântico. Inaugurado nos anos 1990 no âmbito do projeto «A Rota do Escravo» da UNESCO, presta homenagem aos milhões de africanos deportados para as Américas. Um lugar de recolhimento tanto quanto um símbolo.",
    },
    "temple-des-pythons": {
      name: "Templo das Pítons",
      summary: "Templo vodu dedicado ao deus Dangbé, onde vivem pítons sagradas.",
      description:
        "Em frente à basílica da Imaculada Conceição, o Templo das Pítons é consagrado a Dangbé, divindade protetora representada pela pitão-real. As serpentes, inofensivas para o ser humano, são ali veneradas; a visita guiada explica os fundamentos do vodu e o seu papel na sociedade beninense. O templo e a basílica, frente a frente, ilustram a coexistência dos cultos em Ouidah.",
    },
    "basilique-de-ouidah": {
      name: "Basílica da Imaculada Conceição",
      summary: "Grande igreja do início do século XX, em frente ao Templo das Pítons.",
      description:
        "Ouidah foi uma das primeiras cidades da região a ser evangelizadas. A sua basílica, construída no início do século XX, domina a praça principal em frente ao Templo das Pítons. A arquitetura colonial e os vitrais fazem dela uma etapa do percurso pelo centro histórico.",
    },
    "foret-sacree-de-kpasse": {
      name: "Floresta sagrada de Kpassè",
      summary: "Bosque sagrado povoado de esculturas vodu, ligado à lenda do rei Kpassè.",
      description:
        "Segundo a tradição, o rei Kpassè, fundador de Ouidah, ter-se-á transformado ali numa árvore para escapar aos inimigos. A floresta sagrada abriga essa árvore venerada e numerosas esculturas, algumas realizadas para o festival Ouidah 92, que representam as divindades do vodu. Um lugar sombreado e tranquilo no coração da cidade.",
    },
    "musee-d-histoire-de-ouidah": {
      name: "Museu de História de Ouidah",
      summary: "Instalado no antigo forte português, retraça a história do tráfico de escravos e do reino.",
      description:
        "Instalado no forte português de São João Baptista de Ajudá, o museu retraça a história de Ouidah: o comércio europeu na costa, o tráfico negreiro, as ligações com o Brasil e as Caraíbas, e o reino de Danhomè. Um bom ponto de partida para compreender a cidade antes de seguir a Rota dos Escravos.",
    },
    "vodun-days": {
      name: "Festa do Vodu (Vodun Days)",
      summary: "Todos os anos em janeiro, cerimónias, danças e desfiles celebram os cultos vodu.",
      description:
        "O dia 10 de janeiro é o dia nacional das religiões endógenas no Benim. Em Ouidah, as celebrações ganham a dimensão de um grande festival, agora chamado Vodun Days: cerimónias, danças de máscaras (entre as quais os Egungun e os Zangbeto), música e uma concentração na praia. Uma época muito procurada: reserve o alojamento com muita antecedência.",
      tips: "As datas exatas e o programa são publicados todos os anos pelos organizadores: confirme-os antes de reservar.",
      bestPeriod: "Início de janeiro (por volta de 10 de janeiro)",
    },
    "musee-honme": {
      name: "Museu Honmè (palácio do rei Toffa)",
      summary: "O antigo palácio real de Porto-Novo, os seus pátios e objetos da corte.",
      description:
        "O museu Honmè ocupa a antiga residência dos reis de Hogbonou (Porto-Novo), entre os quais o rei Toffa. A visita aos sucessivos pátios dá a conhecer a organização da vida real, os aposentos das rainhas e os objetos de culto e de poder. Um testemunho raro de arquitetura palaciana.",
    },
    "grande-mosquee-porto-novo": {
      name: "Grande Mesquita de Porto-Novo",
      summary: "Fachada colorida de estilo afro-brasileiro, inspirada nas igrejas da Baía.",
      description:
        "Construída no início do século XX pelos «agudás», descendentes de antigos escravos regressados do Brasil, a Grande Mesquita retoma a arquitetura das igrejas barrocas da Baía, com a sua fachada colorida. Ilustra a herança afro-brasileira da cidade. Visita exterior; o interior visita-se segundo as regras da comunidade.",
      tips: "Roupa que cubra o corpo; não visite durante as orações.",
    },
    "musee-da-silva": {
      name: "Museu Da Silva",
      summary: "Casa afro-brasileira dedicada à história dos retornados do Brasil.",
      description:
        "Instalado numa bela casa senhorial de estilo afro-brasileiro, o museu Da Silva evoca a história das famílias regressadas do Brasil no século XIX e a sua influência na arquitetura, na cozinha e na cultura da costa beninense. Objetos, fotografias e mobiliário de época.",
    },
    "centre-songhai": {
      name: "Centro Songhaï",
      summary: "Quinta-escola pioneira da agricultura sustentável, com loja e restaurante.",
      description:
        "Fundado em Porto-Novo nos anos 1980, o Centro Songhaï forma jovens agricultores e experimenta uma agricultura integrada (culturas, pecuária, piscicultura, transformação) que se tornou um modelo em África. A visita guiada mostra as instalações; depois pode almoçar no restaurante e comprar os produtos da quinta.",
    },
    "jardin-des-plantes-porto-novo": {
      name: "Jardim das Plantas e da Natureza",
      summary: "Parque sombreado no coração da cidade, com uma floresta sagrada e macacos.",
      description:
        "No centro de Porto-Novo, este jardim preserva um pedaço de floresta onde vivem macacos e aves, bem como uma pequena floresta sagrada. Uma pausa verde e fresca entre duas visitas.",
    },
    "palais-royaux-d-abomey": {
      name: "Palácios reais de Abomey",
      summary: "Conjunto de palácios reais inscrito no Património Mundial da UNESCO.",
      description:
        "Os palácios reais de Abomey ocupam um vasto domínio rodeado de muros de terra. Os baixos-relevos policromos das suas fachadas contam os feitos dos reis de Danhomè e constituem um verdadeiro livro de história. O sítio está inscrito no Património Mundial da UNESCO desde 1985 e é alvo de grandes obras de valorização.",
      tips: "Estão em curso obras de renovação e um novo museu: informe-se sobre as partes abertas antes de ir.",
    },
    "artisans-d-abomey": {
      name: "Artesãos de Abomey",
      summary: "Tapeçarias de aplicação, bronzes e ferreiros, herdeiros das corporações reais.",
      description:
        "As famílias de artesãos de Abomey perpetuam saberes outrora ao serviço dos reis: tapeçarias de aplicação com motivos simbólicos, fundição de bronze pela técnica da cera perdida, forja. Várias oficinas podem ser visitadas e vendem diretamente as suas criações.",
    },
    "plage-de-grand-popo": {
      name: "Praia de Grand-Popo",
      summary: "Grande praia selvagem, ideal para descansar à sombra dos coqueiros.",
      description:
        "A praia de Grand-Popo estende-se por quilómetros entre o oceano e a lagoa. Vem-se pela calma, pelos pores do sol e pelo peixe grelhado. Os hotéis e acampamentos à beira da praia permitem aproveitar o local durante vários dias.",
      tips: "Banhos fortemente desaconselhados (ondas grandes e correntes violentas).",
    },
    "bouche-du-roy": {
      summary: "Foz do Mono, mangais e aldeias de pescadores, a descobrir de piroga.",
      description:
        "A Bouche du Roy é a foz do rio Mono no oceano. Uma excursão de piroga atravessa mangais e canais até às aldeias de pescadores e aos bancos de areia. A zona faz parte de uma reserva da biosfera transfronteiriça com o Togo (delta do Mono).",
    },
    "lac-aheme": {
      name: "Lago Ahémé",
      summary: "Grande lago tranquilo: saídas de piroga com os pescadores, aldeias lacustres.",
      description:
        "O lago Ahémé, com cerca de vinte quilómetros de comprimento, dá sustento a numerosas aldeias de pescadores. Os acampamentos propõem saídas de piroga ao amanhecer para conhecer a pesca com tarrafa e os acadjas, bem como caminhadas até às aldeias vizinhas.",
    },
    "grotte-notre-dame-d-arigbo": {
      name: "Gruta de Nossa Senhora de Arigbo",
      summary: "Santuário mariano no sopé das colinas, com uma grande peregrinação todos os anos em agosto.",
      description:
        "O santuário mariano de Arigbo desenvolveu-se em torno de uma gruta no sopé das colinas. A peregrinação anual, no fim de agosto, reúne dezenas de milhares de fiéis vindos do Benim e dos países vizinhos. No resto do ano, o local é calmo e visita-se livremente.",
      bestPeriod: "Peregrinação no fim de agosto; local calmo no resto do ano",
    },
    "collines-de-dassa": {
      name: "Colinas de Dassa",
      summary: "Caminhadas nas colinas graníticas e panoramas sobre a região.",
      description:
        "As colinas rochosas que rodeiam Dassa-Zoumè prestam-se a caminhadas curtas. Algumas abrigam locais sagrados e antigos refúgios das populações locais. Parta logo de manhã com um guia local, bom calçado e água.",
    },
    "tata-somba": {
      summary: "Casas-fortaleza de terra com torreões, na região de Boukoumbé.",
      description:
        "As tata (ou takienta) são as habitações tradicionais dos Batammariba: verdadeiros pequenos castelos de terra com andares e torreões, que abrigam pessoas, reservas e animais. Visitam-se na região de Boukoumbé e em redor de Natitingou, acompanhado de um guia que explica o seu simbolismo. A paisagem cultural vizinha de Koutammakou, do lado togolês, está inscrita na UNESCO.",
      tips: "A família que o recebe costuma pedir uma contribuição; recorra a um guia local.",
    },
    "cascade-de-kota": {
      name: "Cascata de Kota",
      summary: "Queda de água e piscina natural a cerca de quinze quilómetros de Natitingou.",
      description:
        "Escondida num vale verdejante perto de Natitingou, a cascata de Kota cai numa piscina natural. Um local apreciado para um passeio e um piquenique, mais espetacular durante a estação das chuvas e logo a seguir.",
      bestPeriod: "De agosto a novembro (caudal mais forte)",
    },
    "musee-regional-natitingou": {
      name: "Museu Regional de Natitingou",
      summary: "Introdução aos povos e à arquitetura do noroeste do Benim.",
      description:
        "O museu regional apresenta as culturas do Atacora: habitação tradicional (incluindo maquetas de tata), objetos do quotidiano, instrumentos musicais, adornos. Uma boa introdução antes de partir ao encontro das aldeias.",
    },
    "safari-pendjari": {
      name: "Safari na Pendjari",
      summary: "Observação da fauna de veículo, em redor dos charcos e ao longo do rio.",
      description:
        "As pistas do parque conduzem aos charcos onde os animais vêm beber, sobretudo no fim da estação seca. Parta ao amanhecer ou ao fim da tarde, os momentos mais favoráveis à observação. A entrada e os percursos seguem as regras fixadas pela entidade gestora do parque: informe-se sobre as condições de visita e de segurança antes de partir.",
      tips: "Visita atualmente formalmente desaconselhada (risco terrorista): consulte os conselhos aos viajantes oficiais antes de qualquer projeto.",
      bestPeriod: "De dezembro a maio (estação seca)",
    },
    "cascades-de-tanougou": {
      name: "Cascatas de Tanougou",
      summary: "Quedas de água e piscinas naturais no sopé da cordilheira do Atacora, perto do parque.",
      description:
        "Na estrada para a Pendjari, as cascatas de Tanougou descem as falésias do Atacora em várias piscinas naturais onde se pode refrescar. Uma paragem agradável antes ou depois do safari.",
      tips: "Visita atualmente formalmente desaconselhada (risco terrorista): consulte os conselhos aos viajantes oficiais antes de qualquer projeto.",
    },
  },
  circuits: {
    "benin-essentiel-7-jours": {
      title: "O essencial do Benim em 7 dias",
      summary:
        "Uma semana no sul: Cotonou e os seus mercados, a aldeia lacustre de Ganvié, Porto-Novo, a memória de Ouidah, as praias de Grand-Popo, o lago Ahémé e os palácios reais de Abomey.",
    },
  },
  stepNotes: {
    "benin-essentiel-7-jours:0": "Chegada, instalação e primeiro contacto com a cidade.",
    "benin-essentiel-7-jours:2": "Manhã de piroga no lago Nokoué.",
    "benin-essentiel-7-jours:3": "Tarde em Porto-Novo.",
    "benin-essentiel-7-jours:9": "Estrada para oeste e descanso à beira-mar.",
    "benin-essentiel-7-jours:11": "Saída de piroga ao nascer do dia e depois estrada para Abomey.",
    "benin-essentiel-7-jours:14": "Regresso a Cotonou, últimas compras no centro de artesanato.",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "مهد الفودون وأرض مملكتي أبومي وبورتو نوفو، يقدّم بنين على بُعد ساعات قليلة بالسيارة شواطئ تحفّها أشجار جوز الهند، وقرى بُنيت على البحيرات، وقصورًا ملكية مُدرجة في قائمة اليونسكو، وفي الشمال بعضًا من أفضل السافانا والمتنزهات الوطنية حفاظًا في غرب أفريقيا.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين إلى تأشيرة تُطلب عبر الإنترنت (تأشيرة إلكترونية) على البوابة الرسمية لحكومة بنين. ويُعفى منها مواطنو المجموعة الاقتصادية لدول غرب أفريقيا (إيكواس). تحقّق دائمًا من الشروط المحدّثة لدى المصادر الرسمية قبل السفر: جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان مكان الإقامة.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمى الصفراء عند الدخول. والملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن علاج وقائي، واحمِ نفسك من البعوض (طارد للحشرات، ناموسية). اشرب المياه المعبّأة.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي الفرنك الأفريقي (XOF)، وسعر صرفه ثابت مقابل اليورو (1 يورو = 655,957 فرنكًا أفريقيًا). يبقى النقد ضروريًا خارج المدن الكبرى، والدفع عبر الهاتف المحمول (mobile money) واسع الانتشار. وتُقبل البطاقات المصرفية في الفنادق والمتاجر الكبرى في كوتونو.",
      },
      {
        title: "متى تسافر",
        body: "يعرف الجنوب موسمين للأمطار (تقريبًا من أبريل إلى يوليو، ثم من سبتمبر إلى أكتوبر)، أما الشمال فموسمًا واحدًا (تقريبًا من مايو إلى أكتوبر). أفضل فترة هي من نوفمبر إلى مارس، أي موسم الجفاف، مع رياح الهرمتان (ريح جافة محمّلة بالغبار) من ديسمبر إلى فبراير. وتُزار متنزهات الشمال خاصةً في موسم الجفاف.",
      },
      {
        title: "اللغات والعادات",
        body: "الفرنسية هي اللغة الرسمية، ويُتحدَّث يوميًا بلغات منها الفون واليوروبا والباريبا والديندي. التحية قبل أي طلب أمر أساسي. وفي الأماكن المقدسة (المعابد، الغابات المقدسة، الأديرة)، اتبع تعليمات المرشد واستأذن قبل تصوير أي شخص أو أي طقس.",
      },
      {
        title: "التنقل",
        body: "سيارات الأجرة النارية (الزيميدجان، ويُعرف سائقوها في كوتونو بقمصانهم الصفراء) هي وسيلة التنقل الأكثر شيوعًا في المدينة؛ اطلب خوذة دائمًا. وبين المدن: سيارات أجرة جماعية وحافلات وسيارات مع سائق. وللتوجّه إلى الشمال والمتنزهات، يُنصح بشدة بسيارة مع سائق مرشد.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار الكهربائي 220 فولت، والمقابس من النوعين C وE (مقابس أوروبية). تتيح شريحة اتصال محلية (يُطلب إثبات الهوية) الوصول إلى الإنترنت عبر الهاتف المحمول وإلى خدمة mobile money.",
      },
      {
        title: "الأمن",
        body: "يمكن زيارة جنوب البلاد ووسطها مع الحذر المعتاد: انتبهوا للسرقات في الأسواق وليلًا في كوتونو، واحذروا على الطرق (تجنبوا القيادة ليلًا). أما الشمال فمعرّض لخطر الإرهاب: إذ تنصح السلطات الفرنسية والبريطانية بعدم السفر إطلاقًا إلى متنزهَي بندجاري ودبليو ومحيطهما والمناطق الحدودية مع بوركينا فاسو والنيجر، وبعدم السفر إلا للضرورة القصوى إلى بقية مقاطعتي أتاكورا وأليبوري وإلى شرق البلاد بين محور تشاورو–مالانفيل والحدود النيجيرية. راجعوا نصائح السفر الصادرة عن حكومتكم قبيل المغادرة وسجّلوا رحلتكم لدى سفارتكم.",
      },
    ],
  },
  destinations: {
    cotonou: {
      name: "كوتونو",
      region: "الساحل",
      summary: "عاصمة اقتصادية نابضة بالحياة بين البحيرة والمحيط: أسواق وفن معاصر وحياة ليلية.",
      description:
        "كوتونو أكبر مدن البلاد، وهي نقطة وصول معظم المسافرين. يقصدها الزوار لحيوية أسواقها، وفي مقدمتها سوق دانتوكبا، أحد أكبر الأسواق في غرب أفريقيا، ولمعارضها وفضاءات الفن المعاصر فيها، ولمطاعمها الشعبية (الماكي) حيث يمكن تذوّق المطبخ البنيني، ولشواطئها الحضرية. وهي أيضًا قاعدة عملية للانطلاق نحو غانفيي وويدا وبورتو نوفو.",
    },
    ganvie: {
      name: "غانفيي",
      region: "الأطلسي",
      summary: "«بندقية أفريقيا»: قرية كاملة مبنية على ركائز وسط بحيرة نوكويه.",
      description:
        "على بُعد نحو عشرين كيلومترًا شمال كوتونو، تُعدّ غانفيي من أكبر القرى المائية في أفريقيا. ويُقال إن سكانها، من أصول توفينو، استقرّوا فيها منذ عدة قرون هربًا من غارات صيد العبيد. بيوت على ركائز ومدارس وسوق عائمة: كل شيء يتم بالقوارب الخشبية (البيروغ). رحلة لنصف يوم انطلاقًا من مرسى أبومي-كالافي.",
    },
    ouidah: {
      name: "ويدا",
      region: "الأطلسي",
      summary: "مدينة تحفظ ذاكرة تجارة الرقيق، والعاصمة الروحية للفودون.",
      description:
        "كانت ويدا ميناءً كبيرًا لتجارة الرقيق، وهي تحفظ ذاكرة هذه المأساة على امتداد طريق العبيد الذي يقود إلى باب اللاعودة على الشاطئ. وهي أيضًا العاصمة الروحية للفودون: معبد الثعابين المقابل للبازيليكا، وغابة كباسيه المقدسة، وفي شهر يناير من كل عام الاحتفالات الكبرى لأيام الفودون (Vodun Days). محطة لا غنى عنها على بُعد 40 كم من كوتونو.",
    },
    "porto-novo": {
      name: "بورتو نوفو",
      region: "أويميه",
      summary: "العاصمة الرسمية، مدينة ملكية ذات بيوت أفروبرازيلية ومتاحف مميّزة.",
      description:
        "بورتو نوفو هي العاصمة الإدارية لبنين، وهي أهدأ من كوتونو وتزخر بتراث فريد: القصر الملكي للملك توفا الذي تحوّل إلى متحف، والمسجد الكبير ذو الطراز الأفروبرازيلي، والبيوت الاستعمارية، وحديقة النباتات، ومركز سونغاي، واجهة الزراعة المستدامة. على بُعد 30 كم من كوتونو.",
    },
    abomey: {
      name: "أبومي",
      region: "زو",
      summary: "العاصمة القديمة لمملكة داهومي وقصورها الملكية المُدرجة في قائمة اليونسكو.",
      description:
        "من القرن السابع عشر إلى القرن التاسع عشر، تعاقب اثنا عشر ملكًا على الحكم في أبومي، عاصمة مملكة دانهومي القوية. وقد بنى كلٌّ منهم قصره الخاص: ومجموعة القصور الملكية، التي تزيّن جدرانها نقوش بارزة تروي تاريخ المملكة، مُدرجة في قائمة التراث العالمي لليونسكو. وتشتهر أبومي أيضًا بمنسوجاتها المزخرفة بالقطع المخيطة (الأبليك) وبحرفها اليدوية. على بُعد نحو ساعتين ونصف بالسيارة من كوتونو.",
    },
    "grand-popo": {
      name: "غران بوبو",
      region: "مونو",
      summary: "شواطئ رملية تحفّها أشجار جوز الهند ومصبّ نهر مونو.",
      description:
        "إلى الغرب من ويدا، قرب الحدود مع توغو، تُعدّ غران بوبو الوجهة الشاطئية في بنين: شواطئ رملية طويلة، وبساتين جوز الهند، وفنادق صغيرة، ومطاعم شعبية للسمك المشوي. وعلى مقربة منها، يمكن اكتشاف «بوش دو روا» حيث يلتقي نهر مونو بالمحيط، على متن قارب بيروغ. تنبيه: البحر خطير على السباحة.",
    },
    possotome: {
      name: "بوسوتومي وبحيرة أهيميه",
      region: "مونو",
      summary: "قرى صيادين على ضفاف بحيرة أهيميه، تشتهر بينابيع المياه المعدنية.",
      description:
        "على الضفة الغربية لبحيرة أهيميه، تشتهر بوسوتومي بينابيع المياه المعدنية ومخيماتها الهادئة. يمكن فيها اكتشاف الصيد التقليدي على متن قوارب البيروغ، والنباتات الطبية، والقرى المجاورة، والقيام بجولات بالدراجة في الريف. محطة مريحة بين ويدا وأبومي.",
    },
    "dassa-zoume": {
      name: "داسا زومي",
      region: "التلال",
      summary: "مدينة التلال الإحدى والأربعين وأحد أكبر مواقع الحج في غرب أفريقيا.",
      description:
        "في وسط البلاد، تحيط بداسا زومي تلال من الغرانيت يمكن صعودها للاستمتاع بمناظر بانورامية جميلة. وتجذب مغارة أريغبو المريمية كل عام، في شهر أغسطس، حشودًا من الحجاج القادمين من جميع أنحاء المنطقة. محطة طبيعية على الطريق نحو الشمال.",
    },
    natitingou: {
      name: "ناتيتينغو وأتاكورا",
      region: "أتاكورا",
      summary: "جبال أتاكورا والشلالات والبيوت الحصينة «تاتا سومبا».",
      description:
        "عاصمة الشمال الغربي، ناتيتينغو هي بوابة أتاكورا، منطقة الجبال والوديان التي يعيش فيها شعب الباتاماريبا وغيره. وتُعدّ بيوتهم الحصينة ذات الأبراج، المعروفة بـ«تاتا سومبا»، من أروع العمارة الطينية في أفريقيا، وتكمل الشلالات والأسواق والمسارات الجبلية الاكتشاف. غير أن مقاطعة أتاكورا تخضع حاليًا لتحذيرات رسمية بسبب خطر الإرهاب (انظر قسم الأمن): استعلموا قبل أي مشروع.",
    },
    pendjari: {
      name: "متنزه بندجاري الوطني",
      region: "أتاكورا",
      summary: "أحد آخر الملاذات الكبرى للحياة البرية في غرب أفريقيا: فيلة وأسود وجواميس.",
      description:
        "في شمال غرب البلاد، يشكّل متنزه بندجاري الوطني جزءًا من مجمّع دبليو-آرلي-بندجاري المدرج في قائمة التراث العالمي لليونسكو. تأوي سهوبه وغاباته الشريطية وبركه الفيلة والجواميس وأفراس النهر والظباء، وبشكل أكثر تخفّيًا الأسود وغيرها من السنوريات الكبيرة. وتنصح عدة حكومات حاليًا بعدم السفر إطلاقًا إلى المتنزه ومحيطه بسبب خطر الإرهاب: تعرض هذه الصفحة الموقع لليوم الذي تسمح فيه الظروف بزيارته من جديد.",
    },
  },
  places: {
    "marche-dantokpa": {
      name: "سوق دانتوكبا",
      summary: "سوق ضخمة على ضفة البحيرة: أقمشة وتوابل وحرف يدوية وسوق التمائم.",
      description:
        "تمتد سوق دانتوكبا (أو «توكبا») على عدة هكتارات على ضفة بحيرة كوتونو. وتجد فيها كل شيء: الأقمشة والشمع الأفريقي (الواكس)، والتوابل، والمنتجات الطازجة، والأدوات المعدنية، والحرف اليدوية، وفي قسم مخصّص، الأشياء والمكوّنات المستخدمة في ممارسات الفودون. غوص لافت في الحياة الاقتصادية للبلاد.",
      tips: "تعال في الصباح، وأبقِ أغراضك قريبة منك، وفي الزيارة الأولى اصطحب مرافقًا. استأذن قبل التصوير.",
    },
    "place-de-l-amazone": {
      name: "ساحة الأمازون",
      summary: "تمثال ضخم تكريمًا للمحاربات في مملكة داهومي.",
      description:
        "يحتفي تمثال الأمازون، المنتصب على الواجهة البحرية، بالأغوجيه، فيلق المحاربات في مملكة دانهومي (أبومي). وقد أصبح الموقع، المهيّأ على شكل ساحة واسعة، أحد رموز كوتونو اليوم ومكانًا للتنزّه في آخر النهار.",
    },
    "plage-de-fidjrosse": {
      name: "شاطئ فيدجروسيه",
      summary: "شاطئ حضري طويل تصطف على امتداده الأكشاك، مزدحم جدًا في عطلة نهاية الأسبوع.",
      description:
        "إلى الغرب من المدينة، يُعدّ شاطئ فيدجروسيه ملتقى سكان كوتونو في عطلة نهاية الأسبوع: أكشاك للمشروبات، وسمك مشوي، وموسيقى، وغروب الشمس فوق المحيط. السباحة فيه خطيرة (تيارات قوية وأمواج عالية): يأتيه الناس أساسًا من أجل الأجواء.",
      tips: "لا تسبح: التيارات على امتداد الساحل البنيني قوية جدًا.",
    },
    "centre-artisanal-cotonou": {
      name: "مركز ترويج الحرف اليدوية",
      summary: "ورش ومتاجر للحرفيين: برونزيات، منسوجات بالقطع المخيطة، أقنعة، حُليّ.",
      description:
        "يضم مركز ترويج الحرف اليدوية عددًا كبيرًا من الحرفيين، ويتيح شراء المنحوتات والبرونزيات والمنسوجات بالقطع المخيطة المستوحاة من النقوش البارزة في أبومي، والأقنعة، والسلال، والحُليّ، وكثيرًا ما يكون ذلك أثناء مشاهدة الحرفيين وهم يعملون. والمساومة جزء من التعامل.",
    },
    "cite-lacustre-de-ganvie": {
      name: "قرية غانفيي المائية",
      summary: "جولة بقارب البيروغ بين البيوت المبنية على ركائز والسوق العائمة.",
      description:
        "تتم الزيارة على متن قارب بيروغ بمحرّك أو بالمجداف انطلاقًا من مرسى كالافي. ينساب القارب بين البيوت المبنية على ركائز، وحظائر الصيد (الأكادجا)، والمدرسة، والسوق العائمة حيث تبيع النساء بضائعهن من قواربهن. يعيش السكان هنا حياتهم اليومية: فالتحفّظ واجب.",
      tips: "تفاوض على سعر القارب في المرسى الرسمي. واستأذن دائمًا قبل تصوير السكان.",
    },
    "route-des-esclaves": {
      name: "طريق العبيد",
      summary: "مسار للذاكرة بطول 4 كم بين المدينة والشاطئ، تتخلّله النُّصب التذكارية.",
      description:
        "يقتفي طريق العبيد الرحلة الأخيرة للأسرى، من ساحة المزادات إلى الشاطئ حيث كانوا يُشحنون. وعلى امتداد الكيلومترات الأربعة، تستحضر التماثيل والنُّصب مراحل هذا الطريق: شجرة النسيان، وكوخ زوماي، والنصب التذكاري. مسار مؤثّر للغاية، يُفضَّل القيام به مع مرشد.",
      tips: "اسلكه سيرًا على الأقدام أو بالدراجة في الصباح الباكر، مع ماء: فالجو حار والظل قليل.",
    },
    "porte-du-non-retour": {
      name: "باب اللاعودة",
      summary: "نصب تذكاري مواجه للمحيط، في المكان الذي كان يُشحن منه الأسرى.",
      description:
        "في نهاية طريق العبيد، ينتصب القوس الضخم لباب اللاعودة في مواجهة المحيط الأطلسي. وقد دُشّن في تسعينيات القرن العشرين في إطار مشروع «طريق العبيد» التابع لليونسكو، تكريمًا لملايين الأفارقة الذين رُحّلوا إلى الأمريكتين. مكان للتأمّل والخشوع بقدر ما هو رمز.",
    },
    "temple-des-pythons": {
      name: "معبد الثعابين",
      summary: "معبد فودون مكرّس للإله دانغبي، تعيش فيه ثعابين أصلة مقدسة.",
      description:
        "يقع معبد الثعابين قبالة بازيليكا الحبل بلا دنس، وهو مكرّس لدانغبي، الإله الحامي الذي يرمز إليه الثعبان الملكي (الأصلة الملكية). وتُبجَّل فيه الثعابين، وهي غير مؤذية للإنسان؛ وتشرح الزيارة المصحوبة بمرشد أسس الفودون ودوره في المجتمع البنيني. ويجسّد تقابل المعبد والبازيليكا تعايش الأديان في ويدا.",
    },
    "basilique-de-ouidah": {
      name: "بازيليكا الحبل بلا دنس",
      summary: "كنيسة كبيرة من أوائل القرن العشرين، قبالة معبد الثعابين.",
      description:
        "كانت ويدا من أوائل مدن المنطقة التي وصلها التبشير المسيحي. وتطلّ البازيليكا، التي شُيّدت في أوائل القرن العشرين، على الساحة الرئيسية قبالة معبد الثعابين. وتجعل منها عمارتها الاستعمارية ونوافذها الزجاجية الملوّنة محطة في جولة المركز التاريخي.",
    },
    "foret-sacree-de-kpasse": {
      name: "غابة كباسيه المقدسة",
      summary: "غابة مقدسة تعجّ بمنحوتات الفودون، مرتبطة بأسطورة الملك كباسيه.",
      description:
        "تقول الرواية التقليدية إن الملك كباسيه، مؤسس ويدا، تحوّل فيها إلى شجرة ليفلت من أعدائه. وتحتضن الغابة المقدسة هذه الشجرة المبجّلة وعددًا كبيرًا من المنحوتات التي تمثّل آلهة الفودون، وقد أُنجز بعضها لمهرجان «ويدا 92». مكان ظليل وهادئ في قلب المدينة.",
    },
    "musee-d-histoire-de-ouidah": {
      name: "متحف تاريخ ويدا",
      summary: "يقع في الحصن البرتغالي القديم، ويروي تاريخ تجارة الرقيق والمملكة.",
      description:
        "يقع المتحف في الحصن البرتغالي ساو جواو باتيستا دي أجودا، ويروي تاريخ ويدا: التجارة الأوروبية على الساحل، وتجارة الرقيق، والروابط مع البرازيل ومنطقة الكاريبي، ومملكة دانهومي. نقطة انطلاق جيدة لفهم المدينة قبل سلوك طريق العبيد.",
    },
    "vodun-days": {
      name: "مهرجان الفودون (Vodun Days)",
      summary: "في شهر يناير من كل عام، تحتفي الطقوس والرقصات والمواكب بعبادات الفودون.",
      description:
        "يوافق العاشر من يناير اليوم الوطني للديانات المحلية في بنين. وفي ويدا، تتخذ الاحتفالات حجم مهرجان كبير يُسمّى الآن «أيام الفودون» (Vodun Days): طقوس، ورقصات الأقنعة (ومنها الإيغونغون والزانغبيتو)، وموسيقى، وتجمّع على الشاطئ. فترة مطلوبة جدًا: احجز مكان إقامتك قبل وقت طويل.",
      tips: "ينشر المنظمون كل عام المواعيد الدقيقة والبرنامج: تحقّق منها قبل الحجز.",
      bestPeriod: "أوائل يناير (حوالي العاشر من يناير)",
    },
    "musee-honme": {
      name: "متحف هونميه (قصر الملك توفا)",
      summary: "القصر الملكي القديم في بورتو نوفو، بأفنيته ومقتنيات البلاط.",
      description:
        "يشغل متحف هونميه المقرّ القديم لملوك هوغبونو (بورتو نوفو)، ومنهم الملك توفا. وتكشف زيارة أفنيته المتتالية عن تنظيم الحياة الملكية، وأجنحة الملكات، وأدوات العبادة والسلطة. شاهد نادر على عمارة القصور.",
    },
    "grande-mosquee-porto-novo": {
      name: "المسجد الكبير في بورتو نوفو",
      summary: "واجهة ملوّنة على الطراز الأفروبرازيلي، مستوحاة من كنائس باهيا.",
      description:
        "شُيّد المسجد الكبير في أوائل القرن العشرين على يد «الأغوداس»، أحفاد العبيد السابقين العائدين من البرازيل، وهو يستعير عمارة كنائس باهيا الباروكية بواجهته الملوّنة. ويجسّد الإرث الأفروبرازيلي للمدينة. تُشاهَد واجهته من الخارج، أما الداخل فيُزار وفق قواعد الجماعة.",
      tips: "ارتدِ ملابس محتشمة، ولا تزره في أوقات الصلاة.",
    },
    "musee-da-silva": {
      name: "متحف دا سيلفا",
      summary: "بيت أفروبرازيلي مخصّص لتاريخ العائدين من البرازيل.",
      description:
        "يقع متحف دا سيلفا في دارة جميلة على الطراز الأفروبرازيلي، ويستحضر تاريخ العائلات التي عادت من البرازيل في القرن التاسع عشر وتأثيرها في عمارة الساحل البنيني ومطبخه وثقافته. مقتنيات وصور فوتوغرافية وأثاث من تلك الحقبة.",
    },
    "centre-songhai": {
      name: "مركز سونغاي",
      summary: "مزرعة-مدرسة رائدة في الزراعة المستدامة، فيها متجر ومطعم.",
      description:
        "أُسّس مركز سونغاي في بورتو نوفو في ثمانينيات القرن العشرين، وهو يدرّب المزارعين الشباب ويجرّب زراعة متكاملة (محاصيل، وتربية مواشٍ، واستزراع سمكي، وتحويل المنتجات) أصبحت نموذجًا في أفريقيا. وتعرض الزيارة المصحوبة بمرشد المنشآت، ويمكن بعدها تناول الغداء في المطعم وشراء منتجات المزرعة.",
    },
    "jardin-des-plantes-porto-novo": {
      name: "حديقة النباتات والطبيعة",
      summary: "متنزه ظليل في قلب المدينة، فيه غابة مقدسة وقرود.",
      description:
        "في وسط بورتو نوفو، تحافظ هذه الحديقة على قطعة من الغابة تعيش فيها القرود والطيور، إضافة إلى غابة مقدسة صغيرة. استراحة خضراء منعشة بين زيارتين.",
    },
    "palais-royaux-d-abomey": {
      name: "قصور أبومي الملكية",
      summary: "مجموعة قصور ملكية مُدرجة في قائمة التراث العالمي لليونسكو.",
      description:
        "تمتد قصور أبومي الملكية على مساحة واسعة تحيط بها أسوار من الطين. وتروي النقوش البارزة متعددة الألوان على واجهاتها مآثر ملوك دانهومي، فتشكّل كتاب تاريخ حقيقيًا. والموقع مُدرج في قائمة التراث العالمي لليونسكو منذ عام 1985، ويخضع لأعمال تأهيل كبرى.",
      tips: "أعمال الترميم ومتحف جديد قيد الإنجاز: استعلم عن الأجزاء المفتوحة قبل المجيء.",
    },
    "artisans-d-abomey": {
      name: "حرفيو أبومي",
      summary: "منسوجات بالقطع المخيطة وبرونزيات وحدادون، ورثة الطوائف الحرفية الملكية.",
      description:
        "تواصل عائلات الحرفيين في أبومي مهارات كانت في خدمة الملوك قديمًا: المنسوجات بالقطع المخيطة ذات الزخارف الرمزية، وصبّ البرونز بطريقة الشمع المفقود، والحدادة. ويمكن زيارة عدة ورش تبيع إبداعاتها مباشرة.",
    },
    "plage-de-grand-popo": {
      name: "شاطئ غران بوبو",
      summary: "شاطئ واسع بِكر، مثالي للاسترخاء في ظل أشجار جوز الهند.",
      description:
        "يمتد شاطئ غران بوبو على كيلومترات بين المحيط والبحيرة. ويقصده الناس للهدوء وغروب الشمس والسمك المشوي. وتتيح الفنادق والمخيمات على الشاطئ الاستمتاع بالمكان عدة أيام.",
      tips: "لا يُنصح إطلاقًا بالسباحة (أمواج عالية وتيارات عنيفة).",
    },
    "bouche-du-roy": {
      name: "بوش دو روا",
      summary: "مصبّ نهر مونو، وأشجار المانغروف وقرى الصيادين، تُكتشف على متن قارب بيروغ.",
      description:
        "بوش دو روا هو مصبّ نهر مونو في المحيط. وتعبر رحلة بقارب البيروغ غابات المانغروف والقنوات وصولًا إلى قرى الصيادين والضفاف الرملية. والمنطقة جزء من محمية للمحيط الحيوي عابرة للحدود مع توغو (دلتا مونو).",
    },
    "lac-aheme": {
      name: "بحيرة أهيميه",
      summary: "بحيرة كبيرة هادئة: جولات بالقارب مع الصيادين، وقرى على ضفاف البحيرة.",
      description:
        "تمتد بحيرة أهيميه على نحو عشرين كيلومترًا، وتعيش منها قرى صيد كثيرة. وتقترح المخيمات جولات بقارب البيروغ عند الفجر للتعرّف إلى الصيد بشبكة الرمي والأكادجا (حظائر الأسماك)، إضافة إلى رحلات مشي نحو القرى المجاورة.",
    },
    "grotte-notre-dame-d-arigbo": {
      name: "مغارة سيدة أريغبو",
      summary: "مزار مريمي عند سفح التلال، يشهد حجًا كبيرًا في شهر أغسطس من كل عام.",
      description:
        "نشأ مزار أريغبو المريمي حول مغارة عند سفح التلال. ويجمع الحج السنوي، في أواخر أغسطس، عشرات الآلاف من المؤمنين القادمين من بنين والبلدان المجاورة. وفي بقية أيام السنة، يكون الموقع هادئًا وتُتاح زيارته بحرية.",
      bestPeriod: "الحج في أواخر أغسطس؛ والموقع هادئ في بقية السنة",
    },
    "collines-de-dassa": {
      name: "تلال داسا",
      summary: "رحلات مشي على التلال الغرانيتية ومناظر بانورامية على المنطقة.",
      description:
        "تصلح التلال الصخرية المحيطة بداسا زومي لرحلات مشي قصيرة. ويضمّ بعضها مواقع مقدسة وملاجئ قديمة للسكان المحليين. انطلق في الصباح الباكر مع مرشد محلي، وبحذاء مناسب وماء.",
    },
    "tata-somba": {
      name: "تاتا سومبا",
      summary: "بيوت حصينة من الطين ذات أبراج صغيرة، في منطقة بوكومبيه.",
      description:
        "التاتا (أو التاكيينتا) هي المساكن التقليدية لشعب الباتاماريبا: قلاع صغيرة حقيقية من الطين بطوابق وأبراج، تؤوي الناس والمؤن والحيوانات. ويمكن زيارة بعضها في منطقة بوكومبيه وحول ناتيتينغو برفقة مرشد يشرح رمزيتها. والمشهد الثقافي المجاور في كوتاماكو، على الجانب التوغولي، مُدرج في قائمة اليونسكو.",
      tips: "تطلب العائلة المضيفة عادةً مساهمة مالية؛ استعن بمرشد محلي.",
    },
    "cascade-de-kota": {
      name: "شلال كوتا",
      summary: "شلال وحوض طبيعي على بُعد نحو خمسة عشر كيلومترًا من ناتيتينغو.",
      description:
        "يقع شلال كوتا في وادٍ أخضر قرب ناتيتينغو، وينحدر في حوض طبيعي. مكان مفضّل للتنزّه والنزهات الخلوية، ويكون أكثر روعة خلال موسم الأمطار وبعده مباشرة.",
      bestPeriod: "من أغسطس إلى نوفمبر (تدفّق أقوى)",
    },
    "musee-regional-natitingou": {
      name: "متحف ناتيتينغو الإقليمي",
      summary: "مدخل للتعرّف إلى شعوب شمال غرب بنين وعمارتها.",
      description:
        "يعرض المتحف الإقليمي ثقافات أتاكورا: المسكن التقليدي (ومنه مجسّمات للتاتا)، وأدوات الحياة اليومية، والآلات الموسيقية، والحُليّ. مدخل جيد قبل الانطلاق للقاء القرى.",
    },
    "safari-pendjari": {
      name: "سفاري في بندجاري",
      summary: "مشاهدة الحياة البرية بالسيارة، حول البرك وعلى امتداد النهر.",
      description:
        "تقود مسالك المتنزه إلى البرك التي تأتي الحيوانات لتشرب منها، خاصةً في نهاية موسم الجفاف. انطلق عند الفجر أو في أواخر بعد الظهر، وهما أنسب وقتين للمشاهدة. ويخضع الدخول والمسارات للقواعد التي تحدّدها الجهة المسيّرة للمتنزه: استعلم عن شروط الزيارة والسلامة قبل الانطلاق.",
      tips: "الزيارة غير مستحسنة إطلاقًا حاليًا (خطر الإرهاب): راجعوا نصائح السفر الرسمية قبل أي مشروع.",
      bestPeriod: "من ديسمبر إلى مايو (موسم الجفاف)",
    },
    "cascades-de-tanougou": {
      name: "شلالات تانوغو",
      summary: "شلالات وأحواض عند سفح سلسلة أتاكورا، قرب المتنزه.",
      description:
        "على الطريق إلى بندجاري، تنحدر شلالات تانوغو من منحدرات أتاكورا في عدة أحواض يمكن الانتعاش فيها. محطة لطيفة قبل السفاري أو بعده.",
      tips: "الزيارة غير مستحسنة إطلاقًا حاليًا (خطر الإرهاب): راجعوا نصائح السفر الرسمية قبل أي مشروع.",
    },
  },
  circuits: {
    "benin-essentiel-7-jours": {
      title: "أساسيات بنين في 7 أيام",
      summary:
        "أسبوع في الجنوب: كوتونو وأسواقها، وقرية غانفيي المائية، وبورتو نوفو، وذاكرة ويدا، وشواطئ غران بوبو، وبحيرة أهيميه، وقصور أبومي الملكية.",
    },
  },
  stepNotes: {
    "benin-essentiel-7-jours:0": "الوصول والاستقرار وأول تعرّف إلى المدينة.",
    "benin-essentiel-7-jours:2": "صباح على متن قارب بيروغ في بحيرة نوكويه.",
    "benin-essentiel-7-jours:3": "بعد الظهر في بورتو نوفو.",
    "benin-essentiel-7-jours:9": "الطريق نحو الغرب واستراحة على شاطئ البحر.",
    "benin-essentiel-7-jours:11": "جولة بقارب البيروغ عند شروق الشمس، ثم الطريق نحو أبومي.",
    "benin-essentiel-7-jours:14": "العودة إلى كوتونو، وآخر المشتريات في مركز الحرف اليدوية.",
  },
};

export const BENIN_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
