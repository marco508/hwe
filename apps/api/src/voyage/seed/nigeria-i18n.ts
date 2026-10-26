/**
 * Traductions du contenu de départ du guide Nigeria (voir ./nigeria.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de nigeria.ts. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const ES: SeedI18n = {
  guide: {
    intro:
      "País más poblado de África, Nigeria es una potencia cultural: tierra de los yoruba, los igbo, los hausa y de cientos de otros pueblos, de las terracotas de Nok y los bronces de Benín, hoy hace vibrar a todo el continente con el afrobeats, Nollywood y la energía de Lagos. Sin embargo, la situación de seguridad limita mucho los desplazamientos: las fuentes oficiales desaconsejan viajar a gran parte del país. Por eso esta guía se centra en Lagos, Abuya, Ibadán y Abeokuta, y presenta aparte, señalándolo, algunos grandes lugares del patrimonio situados en zonas desaconsejadas.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros necesita un visado; la solicitud se hace en línea en el portal del servicio de inmigración nigeriano (Nigeria Immigration Service) y, según el caso, se entrega después el expediente en un centro de tramitación. También hay que rellenar en línea una tarjeta electrónica de llegada antes de salir. Los ciudadanos de la CEDEAO están exentos de visado. Las normas cambian: compruébelas en la embajada de Nigeria y en las fuentes oficiales de su país (pasaporte válido al menos seis meses después del regreso, billete de vuelta, dirección del alojamiento).",
      },
      {
        title: "Salud",
        body: "Se recomienda encarecidamente la vacuna contra la fiebre amarilla y el certificado internacional de vacunación puede pedirse a la llegada. El paludismo está presente en todo el país: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos. Puede haber alertas epidémicas en curso (fiebre de Lassa, cólera, ébola…): consúltelas antes de salir. Fuera de Lagos y Abuya, el acceso a una atención de urgencia de calidad es incierto: es imprescindible un seguro que cubra los gastos médicos y la repatriación. Beba agua embotellada.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el naira (NGN), cuyo tipo de cambio fluctúa mucho. Las transferencias, los terminales de pago (POS) y las aplicaciones de pago están muy extendidos en las ciudades, pero conserve algo de efectivo para las compras pequeñas. Las autoridades francesas recomiendan evitar el uso de tarjetas bancarias internacionales por el riesgo de fraude: limítese a grandes hoteles y establecimientos de confianza, y cambie dinero solo en oficinas oficiales.",
      },
      {
        title: "Cuándo ir",
        body: "En el sur, la estación de lluvias va aproximadamente de abril a octubre, con una pausa relativa en agosto; en el norte es más corta (aproximadamente de junio a septiembre). La época más agradable va de noviembre a marzo, en la estación seca, con el harmattan (viento seco y polvoriento procedente del Sáhara) de diciembre a febrero. Diciembre es también el mes de las grandes fiestas y del regreso de la diáspora: los vuelos y hoteles de Lagos tienen entonces mucha demanda.",
      },
      {
        title: "Idiomas y costumbres",
        body: "El inglés es la lengua oficial; el yoruba, el hausa y el igbo son las más habladas de más de quinientas lenguas, y el pidgin nigeriano es la lengua común de la calle. Los saludos y el respeto a los mayores son muy importantes. El país se reparte entre cristianismo, islam y religiones tradicionales: vista con decoro en los lugares de culto y pida siempre permiso antes de fotografiar a una persona o una ceremonia.",
      },
      {
        title: "Desplazarse",
        body: "Los vuelos nacionales unen las grandes ciudades (Lagos, Abuya, Port Harcourt, Calabar, Benin City…) y evitan largos trayectos por carretera. Las fuentes oficiales desaconsejan el transporte público y recomiendan desplazarse con un conductor de confianza, con las ventanillas cerradas y las puertas bloqueadas, y no circular nunca de noche entre ciudades. En Lagos el tráfico es muy denso: prevea amplios márgenes. Haga que le reciba en el aeropuerto una persona o empresa conocida.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 230 V, enchufes de tipo G (británicos) y D. Los cortes son frecuentes y muchos establecimientos funcionan con generadores. Una tarjeta SIM local (registro obligatorio, se pide el pasaporte) da acceso a internet móvil y a las aplicaciones de transporte y de pago.",
      },
      {
        title: "Seguridad",
        body: "Nigeria vive una situación de seguridad difícil: terrorismo en el noreste y el noroeste, secuestros con rescate en gran parte del territorio, delincuencia y piratería en el delta del Níger y frente a la costa. France Diplomatie desaconseja formalmente numerosos estados (noreste, noroeste, estados del delta, noroeste del estado de Oyo, frontera con Camerún…), desaconseja salvo motivo imperativo la mayoría de los demás, entre ellos Osun, Edo, Cross River y las zonas rurales de Ogun y Oyo, y solo clasifica en vigilancia reforzada el estado de Lagos, la ciudad de Abuya, Ibadán, Abeokuta y las autopistas que unen Lagos, Abeokuta e Ibadán. El Foreign Office británico (FCDO) también desaconseja todo viaje a varios estados del norte y a las zonas fluviales del delta. Antes de cualquier proyecto, consulte los «Conseils aux voyageurs» de France Diplomatie, el «Travel advice» del FCDO y las recomendaciones de su propio país, regístrese ante su embajada, haga que le reciban en el aeropuerto, evite caminar por la calle, desplazarse de noche y las aglomeraciones, y no muestre objetos de valor.",
      },
    ],
  },
  destinations: {
    lagos: {
      region: "Estado de Lagos",
      summary: "Bulliciosa megaciudad entre laguna y océano: arte contemporáneo, música, museos y vida nocturna.",
      description:
        "La ciudad más grande del país y una de las mayores de África, Lagos es el corazón económico y cultural de Nigeria. Se viene por sus galerías y su escena artística, la música (afrobeats, legado de Fela Kuti), sus restaurantes y su vida nocturna, pero también por el Museo Nacional y las huellas de su historia colonial en Lagos Island. Victoria Island, Ikoyi y Lekki son los barrios más prácticos para alojarse. France Diplomatie clasifica el estado de Lagos en vigilancia reforzada y recomienda especial prudencia en la parte continental, sobre todo en la carretera del aeropuerto.",
    },
    badagry: {
      region: "Estado de Lagos",
      summary: "Antiguo puerto de la trata a orillas de la laguna, gran lugar de memoria cerca de la frontera con Benín.",
      description:
        "Al oeste de Lagos, cerca de la frontera con Benín, Badagry fue uno de los puertos de la trata de esclavos en la Costa de los Esclavos. La ciudad conserva varios lugares de memoria, museos dedicados a esta historia y el primer edificio de dos plantas del país, construido por misioneros en el siglo XIX. Se visita en el día desde Lagos; está en el estado de Lagos, clasificado en vigilancia reforzada.",
    },
    abeokuta: {
      region: "Estado de Ogun",
      summary: "La ciudad de la roca Olumo, cuna de los egba y capital de la tela adire.",
      description:
        "Capital del estado de Ogun, a unos cien kilómetros al norte de Lagos, Abeokuta («bajo la roca» en yoruba) creció en el siglo XIX alrededor de la roca Olumo, que sirvió de refugio a los egba durante las guerras. La ciudad es famosa también por el adire, tela teñida con índigo mediante técnicas de reserva. La ciudad de Abeokuta y la autopista que la une a Lagos están clasificadas en vigilancia reforzada; el campo de los alrededores está desaconsejado salvo motivo imperativo.",
    },
    ibadan: {
      name: "Ibadán",
      region: "Estado de Oyo",
      summary: "Inmensa ciudad yoruba de colinas cubiertas de tejados de chapa, ciudad universitaria y capital del amala.",
      description:
        "Capital del estado de Oyo, Ibadán se extiende sobre colinas hasta donde alcanza la vista. Antigua capital de la Región Occidental, alberga la universidad más antigua del país, la Cocoa House, primer rascacielos del país construido con los ingresos del cacao, y miradores como la torre Bower. Es también una ciudad de buena cocina yoruba. La ciudad de Ibadán y la autopista Lagos-Ibadán están clasificadas en vigilancia reforzada; el resto del estado de Oyo está desaconsejado, y su noroeste, formalmente.",
    },
    abuja: {
      name: "Abuya",
      region: "Territorio de la Capital Federal",
      summary: "Capital federal planificada en el centro del país, al pie del Aso Rock.",
      description:
        "Abuya sustituyó a Lagos como capital de Nigeria en 1991. Es una ciudad nueva de grandes avenidas, construida en el centro del país al pie del Aso Rock, un imponente monolito de granito. Más tranquila y espaciosa que Lagos, se descubre a través de sus grandes edificios religiosos y oficiales y de sus parques. La ciudad de Abuya está clasificada en vigilancia reforzada, pero el resto del Territorio de la Capital Federal está desaconsejado salvo motivo imperativo, al igual que las carreteras que salen de ella: se llega en avión.",
    },
    osogbo: {
      region: "Estado de Osun",
      summary: "El bosque sagrado de Osun-Osogbo, Patrimonio de la UNESCO, y su gran festival anual. Zona desaconsejada salvo motivo imperativo.",
      description:
        "Capital del estado de Osun, Osogbo es célebre por su bosque sagrado dedicado a Osun, divinidad yoruba del río y de la fertilidad, inscrito en el Patrimonio Mundial de la UNESCO. La ciudad fue también un foco del arte moderno nigeriano. Atención: France Diplomatie clasifica el estado de Osun como zona «desaconsejada salvo motivo imperativo», sobre todo por el riesgo de secuestro. Este lugar se presenta por su valor patrimonial, para preparar un viaje cuando las condiciones lo permitan; no figura en ningún circuito.",
    },
    "benin-city": {
      region: "Estado de Edo",
      summary: "Capital del antiguo reino de Benín y de sus célebres bronces. Zona desaconsejada salvo motivo imperativo.",
      description:
        "Capital del estado de Edo, Benin City fue el centro del reino de Benín, cuyos reyes (Oba) reinaban desde un célebre palacio y cuyos artistas produjeron los famosos bronces y marfiles, saqueados en 1897 durante una expedición británica. La ciudad, donde sigue residiendo el Oba, continúa siendo el hogar vivo de este arte. Atención: France Diplomatie clasifica el estado de Edo como zona «desaconsejada salvo motivo imperativo». Destino presentado por su valor patrimonial; no figura en ningún circuito.",
    },
    calabar: {
      region: "Estado de Cross River",
      summary: "Ciudad colonial y puerto histórico del sureste, famosa por su carnaval de diciembre. Zona desaconsejada salvo motivo imperativo.",
      description:
        "Capital del estado de Cross River, Calabar fue uno de los grandes puertos de la costa y sede de la administración británica del protectorado de la Costa del Níger. Conocida por su limpieza, su cocina efik y su carnaval de diciembre, conserva un rico patrimonio colonial. Atención: France Diplomatie clasifica el estado de Cross River como zona «desaconsejada salvo motivo imperativo», y el FCDO británico desaconseja todo viaje a sus zonas fluviales. Destino presentado por su valor patrimonial; no figura en ningún circuito.",
    },
  },
  places: {
    "musee-national-lagos": {
      name: "Museo Nacional de Nigeria",
      summary: "El gran museo del país, en Onikan: terracotas de Nok, bronces de Ife y de Benín, arte de los pueblos de Nigeria.",
      description:
        "Situado en Onikan, en Lagos Island, el Museo Nacional ofrece un amplio panorama de la historia y las artes de Nigeria: terracotas de la cultura Nok, cabezas de Ife, bronces del reino de Benín, máscaras, textiles y objetos cotidianos de los distintos pueblos del país. Una buena introducción antes de descubrir el resto del suroeste.",
      tips: "Vaya con conductor y prevea tiempo de sobra por el tráfico entre Lagos Island y Victoria Island o Lekki.",
    },
    "freedom-park-lagos": {
      summary: "Antigua prisión colonial de Broad Street convertida en parque de la memoria y espacio cultural.",
      description:
        "En pleno Lagos Island, Freedom Park ocupa el lugar de la antigua prisión colonial de Broad Street, donde estuvieron detenidos militantes de la independencia. Reacondicionado como parque de la memoria para el cincuentenario de la independencia, hoy acoge conciertos, espectáculos, exposiciones y festivales en un entorno verde entre las torres.",
      tips: "Infórmese de la programación: el lugar está especialmente animado durante los conciertos y festivales del fin de semana.",
    },
    "nike-art-gallery-lagos": {
      summary: "Inmensa galería de varias plantas dedicada al arte nigeriano, en Lekki.",
      description:
        "Fundada por la artista textil Nike Davies-Okundaye, esta galería de Lekki presenta en varias plantas miles de obras de artistas nigerianos: pinturas, esculturas, abalorios, telas adire teñidas con índigo. Un lugar sorprendente para descubrir la creación contemporánea del país y sus raíces yoruba.",
    },
    "lekki-conservation-centre": {
      summary: "Reserva natural de manglar y bosque con una larga pasarela por el dosel arbóreo.",
      description:
        "Gestionado por la Nigerian Conservation Foundation, este espacio protegido conserva un fragmento de bosque pantanoso y sabana en medio de la urbanización de Lekki. Senderos y pasarelas permiten observar aves, monos y reptiles, y su pasarela colgante en las copas de los árboles, una de las más largas de África, ofrece una bonita vista sobre la vegetación.",
      tips: "Vaya temprano por la mañana, cuando hace menos calor y los animales están más activos. Lleve repelente de mosquitos.",
    },
    "premier-immeuble-a-etage-badagry": {
      name: "Primer edificio de dos plantas de Nigeria",
      summary: "Casa misionera de 1845, considerada el primer edificio de dos plantas del país.",
      description:
        "Construida en 1845 por el reverendo Henry Townsend de la Church Missionary Society, esta casa blanca con tejado de chapa se presenta como el primer edificio de dos plantas de Nigeria. Recuerda el papel de Badagry como puerta de entrada de las misiones cristianas en la región y alberga una pequeña exposición sobre ese periodo.",
    },
    "musee-heritage-badagry": {
      name: "Museo del Patrimonio de Badagry",
      summary: "Museo dedicado a la trata de esclavos, en un edificio colonial del siglo XIX.",
      description:
        "Instalado en un antiguo edificio administrativo de la época colonial, el Museo del Patrimonio de Badagry recorre la historia de la trata transatlántica: captura, marchas forzadas, condiciones de detención, embarque y abolición. Las salas exhiben cadenas, grilletes y documentos de la época. Una visita dura pero esencial para comprender el pasado de la costa.",
    },
    "point-of-no-return-badagry": {
      name: "Punto de No Retorno",
      summary: "En la isla de Gberefu, el camino de los cautivos hasta la playa donde eran embarcados.",
      description:
        "Tras una breve travesía de la laguna, un camino atraviesa la isla de Gberefu hasta el océano, siguiendo el último trayecto de los cautivos antes de ser embarcados hacia América. Al final, un memorial marca el «punto de no retorno». Un lugar de recogimiento, mejor con un guía local.",
      tips: "Vaya con un guía conocido por su alojamiento; lleve agua y sombrero, el camino tiene poca sombra. No se bañe: las corrientes son peligrosas.",
    },
    "rocher-olumo": {
      name: "Roca Olumo",
      summary: "Afloramiento granítico sagrado con vistas sobre toda la ciudad.",
      description:
        "Símbolo de Abeokuta, la roca Olumo sirvió de refugio y fortaleza natural a los egba en el siglo XIX. La subida, por escalones tallados en la roca o en ascensor, pasa por santuarios, antiguos escondites y árboles venerados hasta una cima desde la que se domina la ciudad y sus tejados de chapa. Un guía cuenta la historia del lugar.",
      tips: "Lleve buen calzado y suba preferiblemente por la mañana. Respete los santuarios y pida permiso antes de hacer fotos.",
    },
    "marche-itoku-abeokuta": {
      name: "Mercado de Itoku",
      summary: "El mercado del adire: telas teñidas con índigo y motivos yoruba.",
      description:
        "Al pie de la roca Olumo, el mercado de Itoku es el gran mercado del adire, la tela teñida con índigo de la que Abeokuta es la capital. Los puestos rebosan de tejidos con motivos realizados con cera, hilo o pasta de mandioca, y a veces se puede ver a las tintoreras trabajando. El lugar ideal para llevarse una tela auténtica.",
      tips: "Vaya acompañado de una persona de confianza, mantenga sus pertenencias cerca y regatee con una sonrisa.",
    },
    "cocoa-house-ibadan": {
      summary: "Torre terminada en 1965, símbolo de la prosperidad cacaotera del oeste de Nigeria.",
      description:
        "Terminada en 1965 y financiada con los ingresos del cacao de la antigua Región Occidental, la Cocoa House fue durante mucho tiempo el edificio más alto de Nigeria y se considera el primer rascacielos de África Occidental. Domina el barrio comercial de Dugbe y sigue siendo un hito de la historia económica del país.",
    },
    "tour-bower-ibadan": {
      name: "Torre Bower",
      summary: "Torre de observación de los años treinta en lo alto de una colina, con panorámica sobre la ciudad.",
      description:
        "Encaramada en una colina del barrio de Oke Aare, la torre Bower se construyó en los años treinta en memoria del capitán Robert Bower, primer residente británico de Ibadán. Desde lo alto, la vista sobre el océano de tejados de chapa marrón que cubre las colinas de Ibadán es impresionante.",
      tips: "Suba con un conductor y un guía local, preferiblemente al final de la tarde por la luz.",
    },
    "jardins-agodi-ibadan": {
      name: "Jardines de Agodi",
      summary: "Parque de ocio verde, muy apreciado por las familias de Ibadán.",
      description:
        "En los Jardines de Agodi, céspedes, estanques, zonas de juegos y rincones sombreados ofrecen un respiro en pleno centro de la ciudad. Es un lugar de paseo y de pícnic muy apreciado por las familias, sobre todo los fines de semana.",
    },
    "amala-ibadan": {
      name: "Amala, gbegiri y ewedu",
      summary: "El plato emblemático de Ibadán, para probar en una «buka» popular.",
      description:
        "Ibadán es la capital del amala, una masa marrón hecha con harina de ñame seco, que se sirve con gbegiri (sopa de alubias) y ewedu (sopa de hojas de yute), a menudo con una salsa de tomate picante y carne. Se come con la mano en las bukas, casas de comidas populares donde uno se sirve en el mostrador.",
      tips: "Pida consejo a su alojamiento o a su conductor sobre una buka conocida y limpia; se come con la mano derecha.",
    },
    "mosquee-nationale-abuja": {
      name: "Mezquita Nacional",
      summary: "Gran mezquita de cúpula dorada y cuatro minaretes, en la avenida de la Independencia.",
      description:
        "Con su cúpula dorada y sus cuatro altos minaretes, la Mezquita Nacional de Nigeria es uno de los monumentos más reconocibles de la capital. Construida en los años ochenta, incluye también un centro de enseñanza y una biblioteca. Su silueta se fotografía muy bien desde la avenida.",
      tips: "Infórmese en el lugar sobre las condiciones de visita para los no musulmanes; se exige ropa que cubra y no se visita durante las oraciones.",
    },
    "centre-chretien-national-abuja": {
      name: "Centro Cristiano Nacional",
      summary: "Gran edificio ecuménico con aire de catedral, frente a la Mezquita Nacional.",
      description:
        "El Centro Cristiano Nacional (National Christian Centre), gran edificio blanco y gris de líneas neogóticas, se alza no lejos de la Mezquita Nacional. Juntos, ambos edificios ilustran el lugar de las dos grandes religiones en la vida del país y la ambición arquitectónica de la capital.",
      tips: "Normalmente basta con una visita exterior; vista con decoro si entra durante un oficio.",
    },
    "parc-millennium-abuja": {
      summary: "El mayor parque de la capital: céspedes, fuentes y vistas al Aso Rock.",
      description:
        "En el barrio de Maitama, Millennium Park despliega sus céspedes, estanques y paseos arbolados hasta el pie de las colinas, con el Aso Rock como telón de fondo. Es el lugar de paseo favorito de los habitantes de Abuya, muy animado los fines de semana.",
    },
    "foret-sacree-osun-osogbo": {
      name: "Bosque sagrado de Osun-Osogbo",
      summary: "Bosque primario sagrado a lo largo del río Osun, lleno de santuarios y esculturas.",
      description:
        "Uno de los últimos bosques sagrados que antaño rodeaban las ciudades yoruba. A lo largo del río Osun, alberga santuarios, altares y esculturas monumentales realizadas desde los años cincuenta por la artista austriaca Susanne Wenger y los artistas del movimiento del «Nuevo Arte Sacro». Está inscrito en el Patrimonio Mundial de la UNESCO desde 2005.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. En el lugar, visita con guía y respeto por los lugares de culto.",
    },
    "festival-osun-osogbo": {
      name: "Festival de Osun-Osogbo",
      summary: "Gran celebración anual en honor de la diosa Osun, hacia el mes de agosto.",
      description:
        "Cada año, generalmente en agosto, el festival de Osun-Osogbo reúne a fieles, habitantes y visitantes llegados de toda Nigeria y de la diáspora. Las celebraciones, de varios días, culminan con una gran procesión hasta el río, encabezada por una joven que lleva las ofrendas a Osun.",
      tips: "Gran afluencia; las fuentes oficiales recomiendan evitar las aglomeraciones. Zona desaconsejada salvo motivo imperativo: consulte las recomendaciones de viaje.",
      bestPeriod: "Generalmente en agosto",
    },
    "musee-national-benin-city": {
      name: "Museo Nacional de Benin City",
      summary: "Museo circular en el centro de la ciudad, dedicado al arte y la historia del reino de Benín.",
      description:
        "Situado en la gran plaza central (King's Square), el Museo Nacional presenta piezas del arte cortesano del reino de Benín: bronces, terracotas, objetos rituales y reales, así como colecciones sobre la historia de la región. Una etapa para comprender la importancia de este reino y de su arte.",
      tips: "Zona desaconsejada salvo motivo imperativo: consulte las recomendaciones de viaje antes de cualquier proyecto.",
    },
    "rue-igun-benin-city": {
      name: "Calle Igun",
      summary: "La calle de los fundidores de bronce, herederos del gremio real.",
      description:
        "En la calle Igun, los miembros del gremio de fundidores de bronce perpetúan desde hace siglos la técnica de la fundición a la cera perdida al servicio del Oba. Talleres y tiendas se suceden a lo largo de la calle: se puede ver a los artesanos trabajando y comprar piezas.",
      tips: "Zona desaconsejada salvo motivo imperativo: consulte las recomendaciones de viaje. Pida permiso antes de fotografiar a los artesanos.",
    },
    "musee-national-calabar": {
      name: "Museo Nacional de la Old Residency",
      summary: "Antigua residencia colonial prefabricada, convertida en museo de la historia de Calabar.",
      description:
        "Dominando el río, la Old Residency es una gran casa colonial de madera, prefabricada en Gran Bretaña y montada en Calabar a finales del siglo XIX para alojar a la administración británica. Convertida en museo nacional, recorre la historia de la región: reinos efik, comercio del aceite de palma, trata de esclavos y periodo colonial.",
      tips: "Zona desaconsejada salvo motivo imperativo: consulte las recomendaciones de viaje antes de cualquier proyecto.",
    },
    "carnaval-de-calabar": {
      name: "Carnaval de Calabar",
      summary: "Gran carnaval callejero en diciembre: desfiles, disfraces y música.",
      description:
        "Cada mes de diciembre, el carnaval de Calabar convierte la ciudad en una inmensa fiesta callejera: desfiles de comparsas disfrazadas, carrozas, baile y conciertos, en el marco de un festival que dura todo el mes. Atrae a visitantes de todo el país y del extranjero.",
      tips: "Gran afluencia; las fuentes oficiales recomiendan evitar las aglomeraciones. Zona desaconsejada salvo motivo imperativo.",
      bestPeriod: "Diciembre",
    },
    "cuisine-efik-calabar": {
      name: "Cocina efik",
      summary: "Sopas edikang ikong y afang, orgullo culinario de Calabar.",
      description:
        "Calabar tiene fama de servir algunas de las mejores cocinas de Nigeria. Las especialidades efik se basan en sopas espesas de verduras de hoja: el edikang ikong, rico en verduras, y el afang, a base de hojas de afang y de waterleaf, servidas con carne o pescado y una masa de mandioca o de ñame.",
      tips: "Zona desaconsejada salvo motivo imperativo. Estos platos también se encuentran en restaurantes del sureste en Lagos y Abuya.",
    },
  },
  circuits: {
    "nigeria-lagos-sud-ouest-6-jours": {
      title: "Lagos y el suroeste yoruba en 6 días",
      summary:
        "Una semana corta limitada a las zonas de vigilancia reforzada: museos y arte de Lagos, memoria de la trata en Badagry, la roca Olumo y el adire de Abeokuta, y después Ibadán. Trayectos solo de día, con un conductor de confianza.",
    },
  },
  stepNotes: {
    "nigeria-lagos-sud-ouest-6-jours:0": "Llegada, recibimiento en el aeropuerto por una persona conocida y primer contacto con Lagos Island.",
    "nigeria-lagos-sud-ouest-6-jours:2": "Un día en Lekki: naturaleza por la mañana, arte por la tarde.",
    "nigeria-lagos-sud-ouest-6-jours:4": "Excursión de un día a Badagry, regreso a Lagos antes de que anochezca.",
    "nigeria-lagos-sud-ouest-6-jours:7": "Ida y vuelta a Abeokuta por la autopista, de día.",
    "nigeria-lagos-sud-ouest-6-jours:9": "Ruta hacia Ibadán por la autopista Lagos-Ibadán; noche en Ibadán.",
    "nigeria-lagos-sud-ouest-6-jours:12": "Almuerzo de amala antes de volver a la carretera.",
    "nigeria-lagos-sud-ouest-6-jours:13": "Regreso a Lagos antes del anochecer.",
  },
};

const PT: SeedI18n = {
  guide: {
    intro:
      "País mais populoso de África, a Nigéria é uma potência cultural: terra dos iorubás, dos igbos, dos hauçás e de centenas de outros povos, das terracotas de Nok e dos bronzes do Benim, faz hoje vibrar todo o continente com o afrobeats, Nollywood e a energia de Lagos. A situação de segurança limita, no entanto, fortemente as deslocações: as fontes oficiais desaconselham grande parte do país. Por isso, este guia concentra-se em Lagos, Abuja, Ibadan e Abeokuta, e apresenta à parte, com a devida indicação, alguns grandes locais de património situados em zonas desaconselhadas.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes precisa de visto; o pedido faz-se online no portal do serviço de imigração nigeriano (Nigeria Immigration Service) e, consoante o caso, o processo é depois entregue num centro de tratamento. É também necessário preencher online um cartão eletrónico de chegada antes da partida. Os cidadãos da CEDEAO estão isentos de visto. As regras mudam: confirme-as junto da embaixada da Nigéria e das fontes oficiais do seu país (passaporte válido pelo menos seis meses após o regresso, bilhete de regresso, morada do alojamento).",
      },
      {
        title: "Saúde",
        body: "A vacina contra a febre-amarela é fortemente recomendada e o certificado internacional de vacinação pode ser pedido à chegada. O paludismo está presente em todo o país: consulte um médico ou uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos. Podem estar em curso alertas epidémicos (febre de Lassa, cólera, ébola…): consulte-os antes de partir. Fora de Lagos e de Abuja, o acesso a cuidados de urgência de qualidade é incerto: é indispensável um seguro que cubra as despesas médicas e o repatriamento. Beba água engarrafada.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é a naira (NGN), cuja taxa de câmbio oscila muito. As transferências, os terminais de pagamento (POS) e as aplicações de pagamento são muito comuns nas cidades, mas guarde algum dinheiro em numerário para pequenas compras. As autoridades francesas recomendam evitar usar cartões bancários internacionais devido às fraudes: prefira os grandes hotéis e estabelecimentos de confiança, e só troque dinheiro em casas de câmbio oficiais.",
      },
      {
        title: "Quando ir",
        body: "No sul, a estação das chuvas vai aproximadamente de abril a outubro, com uma pausa relativa em agosto; no norte é mais curta (aproximadamente de junho a setembro). A época mais agradável vai de novembro a março, na estação seca, com o harmatão (vento seco e poeirento vindo do Sara) de dezembro a fevereiro. Dezembro é também o mês das grandes festas e do regresso da diáspora: os voos e hotéis de Lagos têm então muita procura.",
      },
      {
        title: "Línguas e costumes",
        body: "O inglês é a língua oficial; o iorubá, o hauçá e o igbo são as mais faladas de mais de quinhentas línguas, e o pidgin nigeriano é a língua comum da rua. Os cumprimentos e o respeito pelos mais velhos são muito importantes. O país divide-se entre cristianismo, islão e religiões tradicionais: vista-se com recato nos locais de culto e peça sempre autorização antes de fotografar uma pessoa ou uma cerimónia.",
      },
      {
        title: "Deslocações",
        body: "Os voos domésticos ligam as grandes cidades (Lagos, Abuja, Port Harcourt, Calabar, Benin City…) e evitam longos trajetos por estrada. As fontes oficiais desaconselham os transportes públicos e recomendam circular com um motorista de confiança, com os vidros fechados e as portas trancadas, e nunca viajar de noite entre cidades. Em Lagos, o trânsito é muito intenso: preveja margens largas. Combine ser recebido no aeroporto por uma pessoa ou empresa conhecida.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 230 V, tomadas de tipo G (britânicas) e D. Os cortes de energia são frequentes e muitos estabelecimentos funcionam com geradores. Um cartão SIM local (registo obrigatório, é pedido o passaporte) dá acesso à internet móvel e às aplicações de transporte e de pagamento.",
      },
      {
        title: "Segurança",
        body: "A Nigéria enfrenta uma situação de segurança difícil: terrorismo no nordeste e no noroeste, raptos para resgate em grande parte do território, criminalidade e pirataria no delta do Níger e ao largo da costa. A France Diplomatie desaconselha formalmente numerosos estados (nordeste, noroeste, estados do delta, noroeste do estado de Oyo, fronteira com os Camarões…), desaconselha salvo motivo imperativo a maioria dos outros, entre eles Osun, Edo, Cross River e as zonas rurais de Ogun e Oyo, e só classifica em vigilância reforçada o estado de Lagos, a cidade de Abuja, Ibadan, Abeokuta e as autoestradas que ligam Lagos, Abeokuta e Ibadan. O Foreign Office britânico (FCDO) também desaconselha qualquer viagem a vários estados do norte e às zonas fluviais do delta. Antes de qualquer projeto, consulte os «Conseils aux voyageurs» da France Diplomatie, o «Travel advice» do FCDO e os conselhos do seu próprio país, registe-se junto da sua embaixada, combine ser recebido no aeroporto, evite andar a pé, circular à noite e as multidões, e não exiba objetos de valor.",
      },
    ],
  },
  destinations: {
    lagos: {
      region: "Estado de Lagos",
      summary: "Megacidade fervilhante entre laguna e oceano: arte contemporânea, música, museus e vida noturna.",
      description:
        "A maior cidade do país e uma das maiores de África, Lagos é o coração económico e cultural da Nigéria. Vem-se pelas galerias e pela cena artística, pela música (afrobeats, legado de Fela Kuti), pelos restaurantes e pela vida noturna, mas também pelo Museu Nacional e pelos vestígios da história colonial em Lagos Island. Victoria Island, Ikoyi e Lekki são os bairros mais práticos para ficar. A France Diplomatie classifica o estado de Lagos em vigilância reforçada e recomenda especial prudência na parte continental, sobretudo na estrada do aeroporto.",
    },
    badagry: {
      region: "Estado de Lagos",
      summary: "Antigo porto do tráfico à beira da laguna, grande lugar de memória perto da fronteira com o Benim.",
      description:
        "A oeste de Lagos, perto da fronteira com o Benim, Badagry foi um dos portos do tráfico de escravos na Costa dos Escravos. A cidade conserva vários lugares de memória, museus dedicados a esta história e o primeiro edifício de dois pisos do país, construído por missionários no século XIX. Visita-se num dia a partir de Lagos; fica no estado de Lagos, classificado em vigilância reforçada.",
    },
    abeokuta: {
      region: "Estado de Ogun",
      summary: "A cidade do rochedo Olumo, berço dos egbas e capital do tecido adire.",
      description:
        "Capital do estado de Ogun, a cerca de cem quilómetros a norte de Lagos, Abeokuta («debaixo do rochedo» em iorubá) cresceu no século XIX em torno do rochedo Olumo, que serviu de refúgio aos egbas durante as guerras. A cidade é também famosa pelo adire, tecido tingido com índigo através de técnicas de reserva. A cidade de Abeokuta e a autoestrada que a liga a Lagos estão classificadas em vigilância reforçada; o campo à volta é desaconselhado salvo motivo imperativo.",
    },
    ibadan: {
      region: "Estado de Oyo",
      summary: "Imensa cidade iorubá de colinas cobertas de telhados de chapa, cidade universitária e capital do amala.",
      description:
        "Capital do estado de Oyo, Ibadan estende-se por colinas a perder de vista. Antiga capital da Região Ocidental, alberga a universidade mais antiga do país, a Cocoa House, primeiro arranha-céus do país construído com as receitas do cacau, e miradouros como a torre Bower. É também uma cidade de boa cozinha iorubá. A cidade de Ibadan e a autoestrada Lagos-Ibadan estão classificadas em vigilância reforçada; o resto do estado de Oyo é desaconselhado, e o seu noroeste formalmente.",
    },
    abuja: {
      region: "Território da Capital Federal",
      summary: "Capital federal planeada no centro do país, aos pés do Aso Rock.",
      description:
        "Abuja substituiu Lagos como capital da Nigéria em 1991. É uma cidade nova de grandes avenidas, construída no centro do país aos pés do Aso Rock, um imponente monólito de granito. Mais calma e arejada do que Lagos, descobre-se através dos seus grandes edifícios religiosos e oficiais e dos seus parques. A cidade de Abuja está classificada em vigilância reforçada, mas o resto do Território da Capital Federal é desaconselhado salvo motivo imperativo, tal como as estradas que dela saem: chega-se de avião.",
    },
    osogbo: {
      region: "Estado de Osun",
      summary: "O bosque sagrado de Osun-Osogbo, Património da UNESCO, e o seu grande festival anual. Zona desaconselhada salvo motivo imperativo.",
      description:
        "Capital do estado de Osun, Osogbo é célebre pelo seu bosque sagrado dedicado a Osun, divindade iorubá do rio e da fertilidade, inscrito no Património Mundial da UNESCO. A cidade foi também um foco da arte moderna nigeriana. Atenção: a France Diplomatie classifica o estado de Osun como zona «desaconselhada salvo motivo imperativo», nomeadamente pelo risco de rapto. Este local é apresentado pelo seu valor patrimonial, para preparar uma viagem quando as condições o permitirem; não faz parte de nenhum circuito.",
    },
    "benin-city": {
      region: "Estado de Edo",
      summary: "Capital do antigo reino do Benim e dos seus célebres bronzes. Zona desaconselhada salvo motivo imperativo.",
      description:
        "Capital do estado de Edo, Benin City foi o centro do reino do Benim, cujos reis (Oba) reinavam a partir de um célebre palácio e cujos artistas produziram os famosos bronzes e marfins, saqueados em 1897 durante uma expedição britânica. A cidade, onde o Oba continua a residir, permanece o lar vivo desta arte. Atenção: a France Diplomatie classifica o estado de Edo como zona «desaconselhada salvo motivo imperativo». Destino apresentado pelo seu valor patrimonial; não faz parte de nenhum circuito.",
    },
    calabar: {
      region: "Estado de Cross River",
      summary: "Cidade colonial e porto histórico do sudeste, famosa pelo carnaval de dezembro. Zona desaconselhada salvo motivo imperativo.",
      description:
        "Capital do estado de Cross River, Calabar foi um dos grandes portos da costa e sede da administração britânica do protetorado da Costa do Níger. Conhecida pela limpeza, pela cozinha efik e pelo carnaval de dezembro, conserva um rico património colonial. Atenção: a France Diplomatie classifica o estado de Cross River como zona «desaconselhada salvo motivo imperativo», e o FCDO britânico desaconselha qualquer viagem às suas zonas fluviais. Destino apresentado pelo seu valor patrimonial; não faz parte de nenhum circuito.",
    },
  },
  places: {
    "musee-national-lagos": {
      name: "Museu Nacional da Nigéria",
      summary: "O grande museu do país, em Onikan: terracotas de Nok, bronzes de Ife e do Benim, arte dos povos da Nigéria.",
      description:
        "Situado em Onikan, em Lagos Island, o Museu Nacional oferece um amplo panorama da história e das artes da Nigéria: terracotas da cultura Nok, cabeças de Ife, bronzes do reino do Benim, máscaras, têxteis e objetos do quotidiano dos diferentes povos do país. Uma boa introdução antes de descobrir o resto do sudoeste.",
      tips: "Vá com motorista e preveja bastante tempo para o trânsito entre Lagos Island e Victoria Island ou Lekki.",
    },
    "freedom-park-lagos": {
      summary: "Antiga prisão colonial de Broad Street transformada em parque de memória e espaço cultural.",
      description:
        "No coração de Lagos Island, o Freedom Park ocupa o local da antiga prisão colonial de Broad Street, onde estiveram detidos militantes da independência. Reconvertido em parque de memória para o cinquentenário da independência, acolhe hoje concertos, espetáculos, exposições e festivais num cenário verdejante entre as torres.",
      tips: "Informe-se sobre a programação: o espaço fica especialmente animado durante os concertos e festivais de fim de semana.",
    },
    "nike-art-gallery-lagos": {
      summary: "Imensa galeria de vários pisos dedicada à arte nigeriana, em Lekki.",
      description:
        "Fundada pela artista têxtil Nike Davies-Okundaye, esta galeria de Lekki apresenta em vários pisos milhares de obras de artistas nigerianos: pinturas, esculturas, missangas, tecidos adire tingidos com índigo. Um lugar surpreendente para descobrir a criação contemporânea do país e as suas raízes iorubás.",
    },
    "lekki-conservation-centre": {
      summary: "Reserva natural de mangal e floresta com um longo passadiço suspenso na copa das árvores.",
      description:
        "Gerido pela Nigerian Conservation Foundation, este espaço protegido conserva um pedaço de floresta pantanosa e de savana no meio da urbanização de Lekki. Trilhos e passadiços permitem observar aves, macacos e répteis, e o seu passadiço suspenso na copa das árvores, um dos mais longos de África, oferece uma bela vista sobre a vegetação.",
      tips: "Vá cedo de manhã, quando está menos calor e os animais estão mais ativos. Leve repelente de mosquitos.",
    },
    "premier-immeuble-a-etage-badagry": {
      name: "Primeiro edifício de dois pisos da Nigéria",
      summary: "Casa missionária de 1845, considerada o primeiro edifício de dois pisos do país.",
      description:
        "Construída em 1845 pelo reverendo Henry Townsend da Church Missionary Society, esta casa branca de telhado de chapa é apresentada como o primeiro edifício de dois pisos da Nigéria. Recorda o papel de Badagry como porta de entrada das missões cristãs na região e alberga uma pequena exposição sobre esse período.",
    },
    "musee-heritage-badagry": {
      name: "Museu do Património de Badagry",
      summary: "Museu dedicado ao tráfico de escravos, num edifício colonial do século XIX.",
      description:
        "Instalado num antigo edifício administrativo da época colonial, o Museu do Património de Badagry retrata a história do tráfico transatlântico: captura, marchas forçadas, condições de detenção, embarque e abolição. As salas expõem correntes, grilhetas e documentos da época. Uma visita dura mas essencial para compreender o passado da costa.",
    },
    "point-of-no-return-badagry": {
      name: "Ponto de Não Retorno",
      summary: "Na ilha de Gberefu, o caminho dos cativos até à praia onde eram embarcados.",
      description:
        "Depois de uma curta travessia da laguna, um caminho atravessa a ilha de Gberefu até ao oceano, seguindo o último trajeto dos cativos antes de serem embarcados para as Américas. No fim, um memorial assinala o «ponto de não retorno». Um lugar de recolhimento, de preferência com um guia local.",
      tips: "Vá com um guia conhecido do seu alojamento; leve água e chapéu, o caminho tem pouca sombra. Não tome banho: as correntes são perigosas.",
    },
    "rocher-olumo": {
      name: "Rochedo Olumo",
      summary: "Afloramento granítico sagrado com vista sobre toda a cidade.",
      description:
        "Símbolo de Abeokuta, o rochedo Olumo serviu de refúgio e fortaleza natural aos egbas no século XIX. A subida, por degraus talhados na rocha ou de elevador, passa por santuários, antigos esconderijos e árvores veneradas até um cume de onde se avista a cidade e os seus telhados de chapa. Um guia conta a história do local.",
      tips: "Use bom calçado e suba de preferência de manhã. Respeite os santuários e peça autorização antes de fotografar.",
    },
    "marche-itoku-abeokuta": {
      name: "Mercado de Itoku",
      summary: "O mercado do adire: tecidos tingidos com índigo e padrões iorubás.",
      description:
        "Aos pés do rochedo Olumo, o mercado de Itoku é o grande mercado do adire, o tecido tingido com índigo de que Abeokuta é a capital. As bancas transbordam de tecidos com padrões feitos com cera, linha ou pasta de mandioca, e por vezes é possível ver as tintureiras a trabalhar. O lugar ideal para trazer um tecido autêntico.",
      tips: "Vá acompanhado de uma pessoa de confiança, mantenha os seus pertences perto de si e regateie com um sorriso.",
    },
    "cocoa-house-ibadan": {
      summary: "Torre concluída em 1965, símbolo da prosperidade do cacau no oeste da Nigéria.",
      description:
        "Concluída em 1965 e financiada pelas receitas do cacau da antiga Região Ocidental, a Cocoa House foi durante muito tempo o edifício mais alto da Nigéria e é considerada o primeiro arranha-céus da África Ocidental. Domina o bairro comercial de Dugbe e continua a ser um marco da história económica do país.",
    },
    "tour-bower-ibadan": {
      name: "Torre Bower",
      summary: "Torre de observação dos anos 1930 no alto de uma colina, com panorama sobre a cidade.",
      description:
        "Empoleirada numa colina do bairro de Oke Aare, a torre Bower foi construída nos anos 1930 em memória do capitão Robert Bower, primeiro residente britânico de Ibadan. Do topo, a vista sobre o oceano de telhados de chapa castanha que cobre as colinas de Ibadan é impressionante.",
      tips: "Suba com um motorista e um guia local, de preferência ao fim da tarde, por causa da luz.",
    },
    "jardins-agodi-ibadan": {
      name: "Jardins de Agodi",
      summary: "Parque de lazer verdejante, muito apreciado pelas famílias de Ibadan.",
      description:
        "Nos Jardins de Agodi, relvados, lagos, parques infantis e recantos à sombra oferecem uma pausa no coração da cidade. É um local de passeio e piquenique muito apreciado pelas famílias, sobretudo ao fim de semana.",
    },
    "amala-ibadan": {
      name: "Amala, gbegiri e ewedu",
      summary: "O prato emblemático de Ibadan, para provar numa «buka» popular.",
      description:
        "Ibadan é a capital do amala, uma massa castanha feita de farinha de inhame seco, servida com gbegiri (sopa de feijão) e ewedu (sopa de folhas de juta), muitas vezes com um molho de tomate picante e carne. Come-se à mão nas bukas, casas de pasto populares onde se escolhe ao balcão.",
      tips: "Peça conselho ao seu alojamento ou ao motorista sobre uma buka conhecida e limpa; come-se com a mão direita.",
    },
    "mosquee-nationale-abuja": {
      name: "Mesquita Nacional",
      summary: "Grande mesquita de cúpula dourada e quatro minaretes, na avenida da Independência.",
      description:
        "Com a sua cúpula dourada e os seus quatro altos minaretes, a Mesquita Nacional da Nigéria é um dos monumentos mais reconhecíveis da capital. Construída nos anos 1980, inclui também um centro de ensino e uma biblioteca. A sua silhueta fotografa-se muito bem a partir da avenida.",
      tips: "Informe-se no local sobre as condições de visita para não muçulmanos; é exigida roupa que cubra o corpo e não há visitas durante as orações.",
    },
    "centre-chretien-national-abuja": {
      name: "Centro Cristão Nacional",
      summary: "Vasto edifício ecuménico com ar de catedral, em frente à Mesquita Nacional.",
      description:
        "O Centro Cristão Nacional (National Christian Centre), grande edifício branco e cinzento de linhas neogóticas, ergue-se não muito longe da Mesquita Nacional. Juntos, os dois edifícios ilustram o lugar das duas grandes religiões na vida do país e a ambição arquitetónica da capital.",
      tips: "Normalmente basta uma visita exterior; vista-se com recato se entrar durante uma celebração.",
    },
    "parc-millennium-abuja": {
      summary: "O maior parque da capital: relvados, fontes e vista para o Aso Rock.",
      description:
        "No bairro de Maitama, o Millennium Park estende os seus relvados, lagos e alamedas arborizadas até ao sopé das colinas, com o Aso Rock como pano de fundo. É o local de passeio preferido dos habitantes de Abuja, muito animado ao fim de semana.",
    },
    "foret-sacree-osun-osogbo": {
      name: "Bosque sagrado de Osun-Osogbo",
      summary: "Floresta primária sagrada ao longo do rio Osun, repleta de santuários e esculturas.",
      description:
        "Uma das últimas florestas sagradas que outrora rodeavam as cidades iorubás. Ao longo do rio Osun, abriga santuários, altares e esculturas monumentais criadas a partir dos anos 1950 pela artista austríaca Susanne Wenger e pelos artistas do movimento da «Nova Arte Sacra». Está inscrita no Património Mundial da UNESCO desde 2005.",
      tips: "Zona desaconselhada salvo motivo imperativo pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. No local, visita com guia e respeito pelos locais de culto.",
    },
    "festival-osun-osogbo": {
      name: "Festival de Osun-Osogbo",
      summary: "Grande celebração anual em honra da deusa Osun, por volta de agosto.",
      description:
        "Todos os anos, geralmente em agosto, o festival de Osun-Osogbo reúne fiéis, habitantes e visitantes vindos de toda a Nigéria e da diáspora. As festividades, ao longo de vários dias, culminam numa grande procissão até ao rio, conduzida por uma jovem que leva as oferendas a Osun.",
      tips: "Grande afluência; as fontes oficiais recomendam evitar ajuntamentos. Zona desaconselhada salvo motivo imperativo: consulte os conselhos aos viajantes.",
      bestPeriod: "Geralmente em agosto",
    },
    "musee-national-benin-city": {
      name: "Museu Nacional de Benin City",
      summary: "Museu circular no centro da cidade, dedicado à arte e à história do reino do Benim.",
      description:
        "Situado na grande praça central (King's Square), o Museu Nacional apresenta peças da arte de corte do reino do Benim: bronzes, terracotas, objetos rituais e reais, bem como coleções sobre a história da região. Uma etapa para compreender a importância deste reino e da sua arte.",
      tips: "Zona desaconselhada salvo motivo imperativo: consulte os conselhos aos viajantes antes de qualquer projeto.",
    },
    "rue-igun-benin-city": {
      name: "Rua Igun",
      summary: "A rua dos fundidores de bronze, herdeiros da guilda real.",
      description:
        "Na rua Igun, os membros da guilda dos fundidores de bronze perpetuam há séculos a técnica da fundição por cera perdida ao serviço do Oba. Oficinas e lojas alinham-se ao longo da rua: é possível ver os artesãos a trabalhar e comprar peças.",
      tips: "Zona desaconselhada salvo motivo imperativo: consulte os conselhos aos viajantes. Peça autorização antes de fotografar os artesãos.",
    },
    "musee-national-calabar": {
      name: "Museu Nacional da Old Residency",
      summary: "Antiga residência colonial pré-fabricada, transformada em museu da história de Calabar.",
      description:
        "Dominando o rio, a Old Residency é uma grande casa colonial de madeira, pré-fabricada na Grã-Bretanha e montada em Calabar no final do século XIX para alojar a administração britânica. Transformada em museu nacional, retrata a história da região: reinos efik, comércio do óleo de palma, tráfico de escravos e período colonial.",
      tips: "Zona desaconselhada salvo motivo imperativo: consulte os conselhos aos viajantes antes de qualquer projeto.",
    },
    "carnaval-de-calabar": {
      name: "Carnaval de Calabar",
      summary: "Grande carnaval de rua em dezembro: desfiles, fantasias e música.",
      description:
        "Todos os anos em dezembro, o carnaval de Calabar transforma a cidade numa imensa festa de rua: desfiles de grupos mascarados, carros alegóricos, dança e concertos, no âmbito de um festival que dura todo o mês. Atrai visitantes de todo o país e do estrangeiro.",
      tips: "Grande afluência; as fontes oficiais recomendam evitar ajuntamentos. Zona desaconselhada salvo motivo imperativo.",
      bestPeriod: "Dezembro",
    },
    "cuisine-efik-calabar": {
      name: "Cozinha efik",
      summary: "Sopas edikang ikong e afang, orgulho culinário de Calabar.",
      description:
        "Calabar tem fama de servir algumas das melhores cozinhas da Nigéria. As especialidades efik assentam em sopas espessas de legumes de folha: o edikang ikong, rico em verduras, e o afang, à base de folhas de afang e de waterleaf, servidas com carne ou peixe e uma massa de mandioca ou de inhame.",
      tips: "Zona desaconselhada salvo motivo imperativo. Estes pratos também se encontram em restaurantes do sudeste em Lagos e Abuja.",
    },
  },
  circuits: {
    "nigeria-lagos-sud-ouest-6-jours": {
      title: "Lagos e o sudoeste iorubá em 6 dias",
      summary:
        "Uma semana curta limitada às zonas de vigilância reforçada: museus e arte de Lagos, memória do tráfico em Badagry, o rochedo Olumo e o adire de Abeokuta, e depois Ibadan. Trajetos apenas de dia, com um motorista de confiança.",
    },
  },
  stepNotes: {
    "nigeria-lagos-sud-ouest-6-jours:0": "Chegada, receção no aeroporto por uma pessoa conhecida e primeiro contacto com Lagos Island.",
    "nigeria-lagos-sud-ouest-6-jours:2": "Um dia em Lekki: natureza de manhã, arte à tarde.",
    "nigeria-lagos-sud-ouest-6-jours:4": "Excursão de um dia a Badagry, regresso a Lagos antes do anoitecer.",
    "nigeria-lagos-sud-ouest-6-jours:7": "Ida e volta a Abeokuta pela autoestrada, de dia.",
    "nigeria-lagos-sud-ouest-6-jours:9": "Estrada para Ibadan pela autoestrada Lagos-Ibadan; noite em Ibadan.",
    "nigeria-lagos-sud-ouest-6-jours:12": "Almoço de amala antes de voltar à estrada.",
    "nigeria-lagos-sud-ouest-6-jours:13": "Regresso a Lagos antes do cair da noite.",
  },
};

const AR: SeedI18n = {
  guide: {
    intro:
      "نيجيريا، أكثر بلدان أفريقيا سكانًا، قوة ثقافية حقيقية: فهي أرض اليوروبا والإيغبو والهوسا ومئات الشعوب الأخرى، وموطن تماثيل نوك الفخارية وبرونزيات بنين، وهي اليوم تُلهب القارة كلها بموسيقى الأفروبيتس وسينما نوليوود وحيوية لاغوس. غير أن الوضع الأمني يقيّد التنقل بشدة: إذ تنصح المصادر الرسمية بتجنّب جزء كبير من البلاد. لذلك يركّز هذا الدليل على لاغوس وأبوجا وإبادان وأبيوكوتا، ويعرض على حدة، مع التنبيه إلى ذلك، بعض أبرز مواقع التراث الواقعة في مناطق لا يُنصح بالسفر إليها.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين إلى تأشيرة؛ ويُقدَّم الطلب إلكترونيًا عبر بوابة دائرة الهجرة النيجيرية (Nigeria Immigration Service)، ثم يُسلَّم الملف في بعض الحالات إلى مركز معالجة. كما يجب ملء بطاقة وصول إلكترونية عبر الإنترنت قبل السفر. ويُعفى مواطنو المجموعة الاقتصادية لدول غرب أفريقيا (إكواس) من التأشيرة. القواعد تتغير: تحقّق منها لدى سفارة نيجيريا والمصادر الرسمية في بلدك (جواز سفر صالح لستة أشهر على الأقل بعد العودة، تذكرة عودة، عنوان الإقامة).",
      },
      {
        title: "الصحة",
        body: "يُوصى بشدة بالتطعيم ضد الحمى الصفراء، وقد تُطلب شهادة التطعيم الدولية عند الوصول. الملاريا منتشرة في جميع أنحاء البلاد: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن العلاج الوقائي، واحمِ نفسك من البعوض. قد تكون هناك تنبيهات وبائية سارية (حمى لاسا، الكوليرا، الإيبولا…): اطّلع عليها قبل السفر. خارج لاغوس وأبوجا، يبقى الحصول على رعاية طارئة جيدة غير مضمون: لذا لا غنى عن تأمين يغطي النفقات الطبية والإعادة إلى الوطن. اشرب المياه المعبأة.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي النايرا (NGN)، ويتقلب سعر صرفها كثيرًا. التحويلات المصرفية وأجهزة الدفع (POS) وتطبيقات الدفع منتشرة جدًا في المدن، لكن احتفظ ببعض النقود للمشتريات الصغيرة. وتنصح السلطات الفرنسية بتجنّب استخدام البطاقات المصرفية الدولية بسبب الاحتيال: اقتصر على الفنادق الكبرى والمؤسسات الموثوقة، ولا تصرف العملات إلا في مكاتب صرافة رسمية.",
      },
      {
        title: "متى تسافر",
        body: "في الجنوب، يمتد موسم الأمطار تقريبًا من أبريل إلى أكتوبر، مع هدوء نسبي في أغسطس؛ أما في الشمال فهو أقصر (تقريبًا من يونيو إلى سبتمبر). أنسب فترة هي من نوفمبر إلى مارس، في موسم الجفاف، مع رياح الهرمتان (رياح جافة محمّلة بالغبار قادمة من الصحراء الكبرى) من ديسمبر إلى فبراير. وديسمبر أيضًا شهر الاحتفالات الكبرى وعودة المغتربين: فيكثر الطلب حينها على رحلات لاغوس وفنادقها.",
      },
      {
        title: "اللغات والعادات",
        body: "الإنجليزية هي اللغة الرسمية؛ واليوروبا والهوسا والإيغبو هي الأكثر انتشارًا من بين أكثر من خمسمئة لغة، فيما تُعدّ البيجين النيجيرية لغة التواصل المشتركة في الشارع. للتحية واحترام كبار السن أهمية كبيرة. وتتوزع البلاد بين المسيحية والإسلام والديانات التقليدية: ارتدِ ملابس محتشمة في أماكن العبادة، واستأذن دائمًا قبل تصوير شخص أو مراسم.",
      },
      {
        title: "التنقل",
        body: "تربط الرحلات الداخلية بين المدن الكبرى (لاغوس، أبوجا، بورت هاركورت، كالابار، بنين سيتي…) وتُغني عن رحلات برية طويلة. وتنصح المصادر الرسمية بعدم استخدام وسائل النقل العام، وبالتنقل مع سائق موثوق، والنوافذ مغلقة والأبواب مقفلة، وبعدم السفر ليلًا بين المدن أبدًا. حركة المرور في لاغوس كثيفة جدًا: خصّص وقتًا إضافيًا واسعًا. ورتّب أن يستقبلك في المطار شخص أو شركة تعرفها.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار 230 فولت، والمقابس من النوع G (البريطاني) وD. انقطاعات الكهرباء متكررة وتعمل مؤسسات كثيرة بالمولدات. تتيح شريحة اتصال محلية (التسجيل إلزامي ويُطلب جواز السفر) الوصول إلى الإنترنت عبر الهاتف وإلى تطبيقات النقل والدفع.",
      },
      {
        title: "الأمن",
        body: "تواجه نيجيريا وضعًا أمنيًا صعبًا: إرهاب في الشمال الشرقي والشمال الغربي، وعمليات خطف مقابل فدية في جزء كبير من البلاد، وجريمة وقرصنة في دلتا النيجر وقبالة السواحل. وتنصح وزارة الخارجية الفرنسية (France Diplomatie) بعدم السفر مطلقًا إلى ولايات عديدة (الشمال الشرقي، الشمال الغربي، ولايات الدلتا، شمال غرب ولاية أويو، الحدود مع الكاميرون…)، وبعدم السفر إلى معظم الولايات الأخرى إلا لضرورة قصوى، ومنها أوسون وإيدو وكروس ريفر وأرياف أوغون وأويو، ولا تصنّف في خانة «اليقظة المشددة» إلا ولاية لاغوس ومدينة أبوجا وإبادان وأبيوكوتا والطرق السريعة التي تربط لاغوس وأبيوكوتا وإبادان. كما تنصح وزارة الخارجية البريطانية (FCDO) بعدم السفر مطلقًا إلى عدة ولايات شمالية وإلى المناطق النهرية في الدلتا. قبل أي مشروع سفر، راجع «Conseils aux voyageurs» على موقع France Diplomatie و«Travel advice» الصادرة عن FCDO وتوصيات بلدك، وسجّل لدى سفارتك، ورتّب استقبالك من المطار، وتجنّب التنقل سيرًا على الأقدام والتنقل ليلًا والتجمعات، ولا تُظهر مقتنياتك الثمينة.",
      },
    ],
  },
  destinations: {
    lagos: {
      name: "لاغوس",
      region: "ولاية لاغوس",
      summary: "مدينة عملاقة نابضة بالحياة بين البحيرة والمحيط: فن معاصر وموسيقى ومتاحف وحياة ليلية.",
      description:
        "لاغوس أكبر مدن البلاد وإحدى أكبر مدن أفريقيا، وهي القلب الاقتصادي والثقافي لنيجيريا. يقصدها الزوار لمعارضها ومشهدها الفني، ولموسيقاها (الأفروبيتس وإرث فيلا كوتي)، ومطاعمها وحياتها الليلية، وكذلك للمتحف الوطني ولآثار تاريخها الاستعماري في جزيرة لاغوس. وتُعدّ فيكتوريا آيلاند وإيكويي وليكي أنسب الأحياء للإقامة. تصنّف France Diplomatie ولاية لاغوس في خانة «اليقظة المشددة» وتوصي بحذر خاص في الجزء القاري، ولا سيما على طريق المطار.",
    },
    badagry: {
      name: "باداغري",
      region: "ولاية لاغوس",
      summary: "ميناء قديم لتجارة الرقيق على ضفاف البحيرة، ومكان بارز للذاكرة قرب الحدود مع بنين.",
      description:
        "تقع باداغري غرب لاغوس قرب الحدود مع بنين، وكانت أحد موانئ تجارة الرقيق على «ساحل العبيد». وتحتفظ المدينة بعدة أماكن للذاكرة ومتاحف مكرّسة لهذا التاريخ، وبأول مبنى من طابقين في البلاد، شيّده مبشّرون في القرن التاسع عشر. يمكن زيارتها في رحلة يوم واحد من لاغوس، وهي تقع ضمن ولاية لاغوس المصنّفة في خانة «اليقظة المشددة».",
    },
    abeokuta: {
      name: "أبيوكوتا",
      region: "ولاية أوغون",
      summary: "مدينة صخرة أولومو، مهد شعب الإيغبا وعاصمة قماش الأديري.",
      description:
        "أبيوكوتا عاصمة ولاية أوغون، على بُعد نحو مئة كيلومتر شمال لاغوس، واسمها يعني «تحت الصخرة» بلغة اليوروبا. نمت في القرن التاسع عشر حول صخرة أولومو التي كانت ملجأً لشعب الإيغبا خلال الحروب. وتشتهر المدينة أيضًا بالأديري، وهو قماش يُصبغ بالنيلة بتقنيات العزل. مدينة أبيوكوتا والطريق السريع الذي يربطها بلاغوس مصنّفان في خانة «اليقظة المشددة»، أما الريف المحيط فلا يُنصح به إلا لضرورة قصوى.",
    },
    ibadan: {
      name: "إبادان",
      region: "ولاية أويو",
      summary: "مدينة يوروبية شاسعة بتلال مكسوّة بأسطح الصفيح، ومدينة جامعية وعاصمة طبق الأمالا.",
      description:
        "إبادان عاصمة ولاية أويو، وتمتد على تلال على مدّ البصر. كانت عاصمة الإقليم الغربي سابقًا، وتضم أقدم جامعة في البلاد، و«كوكوا هاوس»، أول ناطحة سحاب في البلاد شُيّدت بعائدات الكاكاو، ونقاط إطلالة مثل برج باور. وهي أيضًا مدينة المطبخ اليوروبي الطيّب. مدينة إبادان والطريق السريع لاغوس-إبادان مصنّفان في خانة «اليقظة المشددة»، أما بقية ولاية أويو فلا يُنصح بها، وشمالها الغربي لا يُنصح به مطلقًا.",
    },
    abuja: {
      name: "أبوجا",
      region: "إقليم العاصمة الاتحادية",
      summary: "عاصمة اتحادية مخطّطة في وسط البلاد، عند سفح صخرة آسو.",
      description:
        "حلّت أبوجا محل لاغوس عاصمةً لنيجيريا عام 1991. وهي مدينة حديثة ذات جادات واسعة، بُنيت في وسط البلاد عند سفح صخرة آسو، وهي كتلة غرانيتية ضخمة. أهدأ وأرحب من لاغوس، وتُكتشف من خلال مبانيها الدينية والرسمية الكبرى وحدائقها. مدينة أبوجا مصنّفة في خانة «اليقظة المشددة»، لكن بقية إقليم العاصمة الاتحادية لا يُنصح به إلا لضرورة قصوى، وكذلك الطرق الخارجة منها: لذا يُوصَل إليها بالطائرة.",
    },
    osogbo: {
      name: "أوسوغبو",
      region: "ولاية أوسون",
      summary: "غابة أوسون-أوسوغبو المقدسة المدرجة في قائمة اليونسكو، ومهرجانها السنوي الكبير. منطقة لا يُنصح بها إلا لضرورة قصوى.",
      description:
        "أوسوغبو عاصمة ولاية أوسون، وتشتهر بغابتها المقدسة المكرّسة لأوسون، إلهة النهر والخصوبة لدى اليوروبا، والمدرجة في قائمة التراث العالمي لليونسكو. وكانت المدينة أيضًا مركزًا للفن النيجيري الحديث. تنبيه: تصنّف France Diplomatie ولاية أوسون منطقةً «لا يُنصح بالسفر إليها إلا لضرورة قصوى»، ولا سيما بسبب خطر الخطف. يُعرض هذا الموقع لقيمته التراثية، للتحضير لرحلة حين تسمح الظروف؛ وهو غير مدرج في أي مسار.",
    },
    "benin-city": {
      name: "بنين سيتي",
      region: "ولاية إيدو",
      summary: "عاصمة مملكة بنين القديمة وبرونزياتها الشهيرة. منطقة لا يُنصح بها إلا لضرورة قصوى.",
      description:
        "بنين سيتي عاصمة ولاية إيدو، وكانت مركز مملكة بنين التي حكم ملوكها (الأوبا) من قصر شهير، وأبدع فنانوها البرونزيات والعاجيات الشهيرة التي نُهبت عام 1897 خلال حملة بريطانية. ولا تزال المدينة، حيث يقيم الأوبا حتى اليوم، الموطن الحي لهذا الفن. تنبيه: تصنّف France Diplomatie ولاية إيدو منطقةً «لا يُنصح بالسفر إليها إلا لضرورة قصوى». وجهة معروضة لقيمتها التراثية، وهي غير مدرجة في أي مسار.",
    },
    calabar: {
      name: "كالابار",
      region: "ولاية كروس ريفر",
      summary: "مدينة استعمارية وميناء تاريخي في الجنوب الشرقي، تشتهر بكرنفال ديسمبر. منطقة لا يُنصح بها إلا لضرورة قصوى.",
      description:
        "كالابار عاصمة ولاية كروس ريفر، وكانت أحد أكبر موانئ الساحل ومقر الإدارة البريطانية لمحمية ساحل النيجر. تشتهر بنظافتها ومطبخ الإفيك وكرنفالها في ديسمبر، وتحتفظ بتراث استعماري غني. تنبيه: تصنّف France Diplomatie ولاية كروس ريفر منطقةً «لا يُنصح بالسفر إليها إلا لضرورة قصوى»، وتنصح FCDO البريطانية بعدم السفر مطلقًا إلى مناطقها النهرية. وجهة معروضة لقيمتها التراثية، وهي غير مدرجة في أي مسار.",
    },
  },
  places: {
    "musee-national-lagos": {
      name: "المتحف الوطني النيجيري",
      summary: "أكبر متاحف البلاد في أونيكان: تماثيل نوك الفخارية، وبرونزيات إيفي وبنين، وفنون شعوب نيجيريا.",
      description:
        "يقع المتحف الوطني في أونيكان بجزيرة لاغوس، ويقدّم بانوراما واسعة لتاريخ نيجيريا وفنونها: تماثيل فخارية من حضارة نوك، ورؤوس إيفي، وبرونزيات مملكة بنين، وأقنعة ومنسوجات وأدوات الحياة اليومية لشعوب البلاد المختلفة. مدخل جيد قبل اكتشاف بقية الجنوب الغربي.",
      tips: "اذهب مع سائق وخصّص وقتًا كافيًا لحركة المرور بين جزيرة لاغوس وفيكتوريا آيلاند أو ليكي.",
    },
    "freedom-park-lagos": {
      name: "حديقة الحرية (فريدم بارك)",
      summary: "سجن برود ستريت الاستعماري السابق، وقد تحوّل إلى حديقة للذاكرة وفضاء ثقافي.",
      description:
        "في قلب جزيرة لاغوس، تشغل حديقة الحرية موقع سجن برود ستريت الاستعماري السابق، حيث احتُجز مناضلون من أجل الاستقلال. أُعيد تأهيلها حديقةً للذاكرة بمناسبة الذكرى الخمسين للاستقلال، وتستضيف اليوم حفلات موسيقية وعروضًا ومعارض ومهرجانات في إطار أخضر وسط الأبراج.",
      tips: "اطّلع على البرنامج: يكون المكان في أوج حيويته خلال حفلات ومهرجانات نهاية الأسبوع.",
    },
    "nike-art-gallery-lagos": {
      name: "معرض نايكي للفنون",
      summary: "معرض ضخم من عدة طوابق مخصّص للفن النيجيري في ليكي.",
      description:
        "أسّست هذا المعرض في ليكي فنانةُ النسيج نايكي ديفيز-أوكوندايي، ويعرض على عدة طوابق آلاف الأعمال لفنانين نيجيريين: لوحات ومنحوتات وأعمال خرز وأقمشة أديري مصبوغة بالنيلة. مكان مدهش لاكتشاف الإبداع المعاصر في البلاد وجذوره اليوروبية.",
    },
    "lekki-conservation-centre": {
      name: "مركز ليكي لحماية الطبيعة",
      summary: "محمية طبيعية من المانغروف والغابات مع ممشى معلّق طويل بين قمم الأشجار.",
      description:
        "تديره المؤسسة النيجيرية لحماية الطبيعة (Nigerian Conservation Foundation)، ويحفظ هذا الموقع المحمي قطعة من الغابات المستنقعية والسافانا وسط التوسع العمراني في ليكي. تتيح المسارات والممرات الخشبية مشاهدة الطيور والقرود والزواحف، ويوفّر ممشاه المعلّق بين قمم الأشجار، وهو من أطول الممرات في أفريقيا، إطلالة جميلة على الغطاء النباتي.",
      tips: "تعال في الصباح الباكر، حين يكون الجو أقل حرارة والحيوانات أكثر نشاطًا. أحضر طاردًا للبعوض.",
    },
    "premier-immeuble-a-etage-badagry": {
      name: "أول مبنى من طابقين في نيجيريا",
      summary: "بيت تبشيري يعود إلى عام 1845، يُعدّ أول مبنى من طابقين في البلاد.",
      description:
        "شيّد هذا البيت الأبيض ذو السقف المعدني القسُّ هنري تاونسند من جمعية الكنيسة التبشيرية عام 1845، ويُقدَّم على أنه أول مبنى من طابقين في نيجيريا. ويذكّر بدور باداغري بوابةً لدخول البعثات المسيحية إلى المنطقة، ويضم معرضًا صغيرًا عن تلك الحقبة.",
    },
    "musee-heritage-badagry": {
      name: "متحف التراث في باداغري",
      summary: "متحف مكرّس لتجارة الرقيق، في مبنى استعماري من القرن التاسع عشر.",
      description:
        "يقع متحف التراث في باداغري في مبنى إداري قديم من الحقبة الاستعمارية، ويستعرض تاريخ تجارة الرقيق عبر الأطلسي: الأسر، والمسيرات القسرية، وظروف الاحتجاز، والترحيل، ثم الإلغاء. وتعرض قاعاته سلاسل وقيودًا ووثائق من تلك الحقبة. زيارة مؤلمة لكنها ضرورية لفهم ماضي الساحل.",
    },
    "point-of-no-return-badagry": {
      name: "نقطة اللاعودة",
      summary: "في جزيرة غبيريفو، درب الأسرى حتى الشاطئ الذي كانوا يُرحَّلون منه.",
      description:
        "بعد عبور قصير للبحيرة، يمتد درب عبر جزيرة غبيريفو حتى المحيط، متتبعًا آخر طريق سلكه الأسرى قبل ترحيلهم إلى الأمريكيتين. وفي نهايته نُصب تذكاري يحدّد «نقطة اللاعودة». مكان للتأمل، ويُفضَّل زيارته مع مرشد محلي.",
      tips: "اذهب مع مرشد يعرفه مكان إقامتك؛ أحضر الماء وقبعة، فالدرب قليل الظل. لا تسبح: التيارات خطرة.",
    },
    "rocher-olumo": {
      name: "صخرة أولومو",
      summary: "نتوء غرانيتي مقدس يطل على المدينة بأكملها.",
      description:
        "صخرة أولومو رمز أبيوكوتا، وكانت ملجأً وحصنًا طبيعيًا لشعب الإيغبا في القرن التاسع عشر. يمرّ الصعود، عبر درجات منحوتة في الصخر أو بالمصعد، بمزارات ومخابئ قديمة وأشجار مبجّلة، وصولًا إلى قمة تُشرف على المدينة وأسطحها المعدنية. ويروي مرشد تاريخ المكان.",
      tips: "انتعل حذاءً مريحًا واصعد صباحًا إن أمكن. احترم المزارات واستأذن قبل التصوير.",
    },
    "marche-itoku-abeokuta": {
      name: "سوق إيتوكو",
      summary: "سوق الأديري: أقمشة مصبوغة بالنيلة ونقوش يوروبية.",
      description:
        "عند سفح صخرة أولومو، تُعدّ سوق إيتوكو السوق الكبرى للأديري، القماش المصبوغ بالنيلة الذي تُعدّ أبيوكوتا عاصمته. تفيض البسطات بأقمشة ذات نقوش منفّذة بالشمع أو الخيط أو عجينة الكسافا، ويمكن أحيانًا مشاهدة الصبّاغات أثناء العمل. المكان الأمثل لاقتناء قماش أصيل.",
      tips: "اذهب برفقة شخص موثوق، وأبقِ أغراضك قريبة منك، وفاوض بابتسامة.",
    },
    "cocoa-house-ibadan": {
      name: "كوكوا هاوس",
      summary: "برج اكتمل عام 1965، رمز ازدهار الكاكاو في غرب نيجيريا.",
      description:
        "اكتمل بناء كوكوا هاوس عام 1965 بتمويل من عائدات الكاكاو في الإقليم الغربي السابق، وظلّ طويلًا أعلى مبنى في نيجيريا، ويُعدّ أول ناطحة سحاب في غرب أفريقيا. يهيمن على حي دوغبي التجاري ولا يزال معلمًا من معالم التاريخ الاقتصادي للبلاد.",
    },
    "tour-bower-ibadan": {
      name: "برج باور",
      summary: "برج مراقبة من ثلاثينيات القرن العشرين على قمة تلة، بإطلالة بانورامية على المدينة.",
      description:
        "يقع برج باور على تلة في حي أوكي آري، وقد شُيّد في ثلاثينيات القرن العشرين تخليدًا لذكرى النقيب روبرت باور، أول مقيم بريطاني في إبادان. ومن أعلاه، يبدو منظر بحر الأسطح المعدنية البنية التي تكسو تلال إبادان مذهلًا.",
      tips: "اصعد إليه مع سائق ومرشد محلي، ويُفضَّل في آخر العصر من أجل الضوء.",
    },
    "jardins-agodi-ibadan": {
      name: "حدائق أغودي",
      summary: "منتزه ترفيهي أخضر تحبّه عائلات إبادان.",
      description:
        "في حدائق أغودي، توفّر المروج والبرك ومناطق اللعب والزوايا الظليلة متنفسًا في قلب المدينة. وهي مكان محبّب للتنزه والنزهات العائلية، ولا سيما في نهاية الأسبوع.",
    },
    "amala-ibadan": {
      name: "أمالا مع غبيغيري وإويدو",
      summary: "الطبق الرمزي لإبادان، يُتذوَّق في «بوكا» شعبية.",
      description:
        "إبادان عاصمة الأمالا، وهي عجينة بنية اللون تُحضَّر من دقيق اليام المجفف، وتُقدَّم مع الغبيغيري (حساء الفاصوليا) والإويدو (حساء أوراق الجوت)، وغالبًا مع صلصة طماطم حارة ولحم. وتؤكل باليد في «البوكا»، وهي مطاعم شعبية يختار فيها الزبون طعامه من عند المنضدة.",
      tips: "اطلب من مكان إقامتك أو سائقك ترشيح بوكا معروفة ونظيفة؛ ويُؤكل باليد اليمنى.",
    },
    "mosquee-nationale-abuja": {
      name: "المسجد الوطني",
      summary: "مسجد كبير ذو قبة ذهبية وأربع مآذن، في جادة الاستقلال.",
      description:
        "بقبته الذهبية ومآذنه الأربع الشاهقة، يُعدّ المسجد الوطني النيجيري من أبرز معالم العاصمة. بُني في ثمانينيات القرن العشرين، ويضم أيضًا مركزًا تعليميًا ومكتبة. ويمكن تصوير هيئته بشكل رائع من الجادة.",
      tips: "استفسر في المكان عن شروط الزيارة لغير المسلمين؛ يُشترط لباس ساتر ولا زيارة أثناء الصلوات.",
    },
    "centre-chretien-national-abuja": {
      name: "المركز المسيحي الوطني",
      summary: "مبنى مسكوني واسع يشبه الكاتدرائية، قبالة المسجد الوطني.",
      description:
        "المركز المسيحي الوطني (National Christian Centre) مبنى كبير أبيض ورمادي ذو خطوط قوطية جديدة، يقوم على مقربة من المسجد الوطني. ويجسّد المبنيان معًا مكانة الديانتين الكبيرتين في حياة البلاد والطموح المعماري للعاصمة.",
      tips: "تكفي غالبًا زيارة من الخارج؛ ارتدِ ملابس محتشمة إن دخلت أثناء قدّاس.",
    },
    "parc-millennium-abuja": {
      name: "حديقة الألفية",
      summary: "أكبر حدائق العاصمة: مروج ونوافير وإطلالة على صخرة آسو.",
      description:
        "في حي مايتاما، تمتد حديقة الألفية بمروجها وأحواضها وممراتها المشجّرة حتى سفح التلال، وصخرة آسو في الخلفية. وهي المتنزه المفضّل لسكان أبوجا، وتعجّ بالحياة في نهاية الأسبوع.",
    },
    "foret-sacree-osun-osogbo": {
      name: "غابة أوسون-أوسوغبو المقدسة",
      summary: "غابة بكر مقدسة على امتداد نهر أوسون، تزخر بالمزارات والمنحوتات.",
      description:
        "واحدة من آخر الغابات المقدسة التي كانت تحيط قديمًا بمدن اليوروبا. وعلى امتداد نهر أوسون، تضم مزارات ومذابح ومنحوتات ضخمة أبدعتها منذ خمسينيات القرن العشرين الفنانة النمساوية سوزان فينغر وفنانو حركة «الفن المقدس الجديد». وهي مدرجة في قائمة التراث العالمي لليونسكو منذ عام 2005.",
      tips: "منطقة لا تنصح France Diplomatie بالسفر إليها إلا لضرورة قصوى: راجع إرشادات السفر قبل أي مشروع. وفي المكان، تكون الزيارة مع مرشد مع احترام أماكن العبادة.",
    },
    "festival-osun-osogbo": {
      name: "مهرجان أوسون-أوسوغبو",
      summary: "احتفال سنوي كبير تكريمًا للإلهة أوسون، في شهر أغسطس تقريبًا.",
      description:
        "كل عام، وعادةً في أغسطس، يجمع مهرجان أوسون-أوسوغبو المؤمنين والسكان والزوار القادمين من أنحاء نيجيريا ومن المهجر. وتستمر الاحتفالات عدة أيام، وتبلغ ذروتها بموكب كبير نحو النهر تتقدّمه فتاة تحمل القرابين إلى أوسون.",
      tips: "إقبال كثيف جدًا؛ وتوصي المصادر الرسمية بتجنّب التجمعات. منطقة لا يُنصح بها إلا لضرورة قصوى: راجع إرشادات السفر.",
      bestPeriod: "عادةً في أغسطس",
    },
    "musee-national-benin-city": {
      name: "المتحف الوطني في بنين سيتي",
      summary: "متحف دائري في قلب المدينة، مكرّس لفن مملكة بنين وتاريخها.",
      description:
        "يقع المتحف الوطني في الساحة المركزية الكبرى (كينغز سكوير)، ويعرض قطعًا من فن البلاط في مملكة بنين: برونزيات وفخاريات وأدوات طقسية وملكية، إضافة إلى مجموعات عن تاريخ المنطقة. محطة لفهم أهمية هذه المملكة وفنها.",
      tips: "منطقة لا يُنصح بها إلا لضرورة قصوى: راجع إرشادات السفر قبل أي مشروع.",
    },
    "rue-igun-benin-city": {
      name: "شارع إيغون",
      summary: "شارع صبّاكي البرونز، ورثة النقابة الملكية.",
      description:
        "في شارع إيغون، يواصل أعضاء نقابة صبّاكي البرونز منذ قرون تقنية الصبّ بالشمع المفقود في خدمة الأوبا. وتصطف الورش والمتاجر على طول الشارع: يمكن مشاهدة الحرفيين أثناء العمل وشراء القطع.",
      tips: "منطقة لا يُنصح بها إلا لضرورة قصوى: راجع إرشادات السفر. استأذن قبل تصوير الحرفيين.",
    },
    "musee-national-calabar": {
      name: "المتحف الوطني في «أولد ريزيدنسي»",
      summary: "مقرّ إقامة استعماري سابق مسبق الصنع، تحوّل إلى متحف لتاريخ كالابار.",
      description:
        "يطل «أولد ريزيدنسي» على النهر، وهو منزل استعماري خشبي كبير صُنع مسبقًا في بريطانيا وجُمّع في كالابار أواخر القرن التاسع عشر لإيواء الإدارة البريطانية. وقد صار متحفًا وطنيًا يستعرض تاريخ المنطقة: ممالك الإفيك، وتجارة زيت النخيل، وتجارة الرقيق، والحقبة الاستعمارية.",
      tips: "منطقة لا يُنصح بها إلا لضرورة قصوى: راجع إرشادات السفر قبل أي مشروع.",
    },
    "carnaval-de-calabar": {
      name: "كرنفال كالابار",
      summary: "كرنفال شوارع كبير في ديسمبر: مواكب وأزياء وموسيقى.",
      description:
        "في كل ديسمبر، يحوّل كرنفال كالابار المدينة إلى احتفال شوارع ضخم: مواكب فرق بأزياء تنكرية، وعربات مزيّنة، ورقص وحفلات موسيقية، ضمن مهرجان يستمر طوال الشهر. ويجتذب زوارًا من أنحاء البلاد ومن الخارج.",
      tips: "إقبال كثيف جدًا؛ وتوصي المصادر الرسمية بتجنّب التجمعات. منطقة لا يُنصح بها إلا لضرورة قصوى.",
      bestPeriod: "ديسمبر",
    },
    "cuisine-efik-calabar": {
      name: "مطبخ الإفيك",
      summary: "حساءا إيديكانغ إيكونغ وأفانغ، مفخرة كالابار في فن الطهي.",
      description:
        "تشتهر كالابار بتقديم بعض أفضل المأكولات في نيجيريا. وتقوم أطباق الإفيك على حساءات كثيفة من الخضار الورقية: إيديكانغ إيكونغ الغني بالخضار، وأفانغ المحضَّر من أوراق الأفانغ وورق «ووترليف»، ويُقدَّمان مع اللحم أو السمك وعجينة من الكسافا أو اليام.",
      tips: "منطقة لا يُنصح بها إلا لضرورة قصوى. تتوفر هذه الأطباق أيضًا في مطاعم الجنوب الشرقي في لاغوس وأبوجا.",
    },
  },
  circuits: {
    "nigeria-lagos-sud-ouest-6-jours": {
      title: "لاغوس والجنوب الغربي اليوروبي في 6 أيام",
      summary:
        "أسبوع قصير يقتصر على مناطق «اليقظة المشددة»: متاحف لاغوس وفنونها، وذاكرة تجارة الرقيق في باداغري، وصخرة أولومو وأديري أبيوكوتا، ثم إبادان. التنقل نهارًا فقط، مع سائق موثوق.",
    },
  },
  stepNotes: {
    "nigeria-lagos-sud-ouest-6-jours:0": "الوصول، والاستقبال في المطار من قبل شخص معروف، ثم أول تعرّف إلى جزيرة لاغوس.",
    "nigeria-lagos-sud-ouest-6-jours:2": "يوم في ليكي: الطبيعة صباحًا والفن بعد الظهر.",
    "nigeria-lagos-sud-ouest-6-jours:4": "رحلة يوم إلى باداغري، والعودة إلى لاغوس قبل حلول الظلام.",
    "nigeria-lagos-sud-ouest-6-jours:7": "ذهاب وإياب إلى أبيوكوتا عبر الطريق السريع، نهارًا.",
    "nigeria-lagos-sud-ouest-6-jours:9": "الطريق إلى إبادان عبر الطريق السريع لاغوس-إبادان؛ المبيت في إبادان.",
    "nigeria-lagos-sud-ouest-6-jours:12": "غداء أمالا قبل استئناف الطريق.",
    "nigeria-lagos-sud-ouest-6-jours:13": "العودة إلى لاغوس قبل حلول الليل.",
  },
};

export const NIGERIA_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
