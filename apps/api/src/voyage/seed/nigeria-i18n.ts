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
    "ile-ife": {
      name: "Ile-Ife",
      region: "Estado de Osun",
      summary: "Ciudad sagrada, cuna mítica de los yoruba y hogar de las célebres cabezas de Ife. Zona desaconsejada salvo motivo imperativo.",
      description:
        "Según la tradición yoruba, en Ile-Ife se creó el mundo y reinó Oduduwa, antepasado de las dinastías yoruba; el Ooni de Ife sigue residiendo allí. Aproximadamente entre los siglos XII y XV, sus artistas produjeron cabezas de terracota y de aleación de cobre de un naturalismo asombroso, parte de las cuales se exponen en el museo nacional. Ciudad universitaria (Universidad Obafemi Awolowo), celebra cada año el festival Olojo. Atención: France Diplomatie clasifica el estado de Osun como zona «desaconsejada salvo motivo imperativo». Destino presentado por su valor patrimonial; no figura en ningún circuito.",
    },
    "kano": {
      name: "Kano",
      region: "Estado de Kano",
      summary: "Vieja ciudad hausa: murallas, palacio del emir, tintorerías de índigo y grandes mercados. Zona desaconsejada salvo motivo imperativo.",
      description:
        "Gran ciudad del norte, Kano fue durante siglos una de las principales encrucijadas del comercio transahariano, capital de un reino hausa y después de un emirato. Su casco antiguo, nacido en torno a la colina de Dala y rodeado de murallas de tierra en parte conservadas (en la lista indicativa de la UNESCO con sus sitios asociados), conserva el palacio del emir, el mercado de Kurmi y las tintorerías de Kofar Mata. Atención: France Diplomatie desaconseja formalmente el estado de Kano y clasifica la propia ciudad como zona «desaconsejada salvo motivo imperativo»; el FCDO británico desaconseja todo viaje no esencial al estado, y la carretera Abuya-Kaduna-Kano se considera de alto riesgo. Destino presentado por su valor patrimonial; no figura en ningún circuito.",
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
        "Cada mes de diciembre, el carnaval de Calabar convierte la ciudad en una inmensa fiesta callejera: desfiles de comparsas disfrazadas, carrozas, baile y conciertos, en unas fiestas que culminan a finales de diciembre con el gran desfile de las «bandas». Atrae a visitantes de todo el país y del extranjero.",
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
    "kalakuta-museum-lagos": {
      name: "Kalakuta Museum",
      summary: "La última casa de Fela Kuti, en Ikeja, convertida en museo en 2012.",
      description:
        "En el barrio de Ikeja, la casa de tres plantas donde Fela Anikulapo-Kuti vivió hasta su muerte en 1997 se convirtió en museo en 2012, con el apoyo del estado de Lagos. Se pueden ver sus trajes de escena, sus zapatos, portadas de discos y su dormitorio tal como lo dejó; la tumba del músico se encuentra en el recinto. La casa sucedió a la primera «Kalakuta Republic», incendiada por el ejército en 1977.",
      tips: "Combine la visita con la New Afrika Shrine, también en Ikeja. Ikeja está en la parte continental, lejos de las islas: prevea mucho margen por el tráfico.",
    },
    "new-afrika-shrine-lagos": {
      name: "New Afrika Shrine",
      summary: "La sala de conciertos de la familia Kuti en Ikeja, templo del afrobeat.",
      description:
        "Heredera de la Afrika Shrine creada por Fela en 1970 y destruida en 1977, la New Afrika Shrine es un amplio espacio de espectáculos abierto en Ikeja, gestionado por Femi Kuti y Yeni Anikulapo-Kuti. Fotos y pinturas de Fela cubren las paredes, y Femi o Seun Kuti tocan allí con regularidad. Es también el corazón de la Felabration cada mes de octubre.",
      tips: "Los conciertos empiezan tarde y terminan de madrugada: organice la ida y la vuelta con un conductor de confianza. Infórmese de la programación antes de ir.",
      bestPeriod: "Octubre, durante la Felabration",
    },
    "tafawa-balewa-square-lagos": {
      name: "Tafawa Balewa Square",
      summary: "Gran explanada ceremonial de Lagos Island, en el antiguo hipódromo de la independencia.",
      description:
        "Tafawa Balewa Square (TBS) se construyó en 1972 sobre el antiguo hipódromo de Lagos, donde en 1960 se celebraron la independencia del país y el arriado de la bandera británica. Esta explanada de 14,5 hectáreas rodeada de tribunas se reconoce por su entrada coronada por caballos blancos y águilas rojas, símbolos tomados del escudo nacional. Acoge desfiles, grandes concentraciones y el festival Eyo.",
      tips: "El lugar cobra vida durante los eventos; si no, se ve de paso camino del Museo Nacional y del centro John Randle, muy cercanos.",
    },
    "cathedrale-christ-church-lagos": {
      name: "Cathedral Church of Christ",
      summary: "La catedral anglicana más antigua de Nigeria, edificio neogótico de la Marina.",
      description:
        "Fundada en 1869, la catedral anglicana de la Marina ocupa un edificio neogótico iniciado en 1924 y terminado en 1946, con su torre del reloj y sus pináculos. Alberga un cenotafio en memoria de Samuel Ajayi Crowther, antiguo esclavo yoruba que llegó a ser el primer obispo africano de la Iglesia anglicana, cuyos restos se trasladaron aquí en 1976.",
      tips: "Vista con decoro; evite las horas de culto del domingo, salvo para asistir a ellas.",
    },
    "mosquee-centrale-lagos": {
      name: "Mezquita Central de Lagos",
      summary: "Gran mezquita de cúpula dorada y cuatro minaretes, en el corazón de Lagos Island.",
      description:
        "En la muy comercial calle Nnamdi Azikiwe, la mezquita central es la mezquita del viernes del imán principal de Lagos. El edificio actual, abierto en 1988, sustituyó a una mezquita construida entre 1908 y 1913; su cúpula dorada y sus minaretes dominan los tejados de la isla.",
      tips: "Los no musulmanes la conocen sobre todo desde fuera: pregunte en el lugar antes de entrar, con ropa que cubra y fuera de las horas de oración. El barrio está muy concurrido: mantenga sus pertenencias cerca.",
    },
    "centre-john-randle-lagos": {
      name: "Centro John Randle de Cultura e Historia Yoruba",
      summary: "Museo moderno e interactivo dedicado a la cultura yoruba, en Onikan.",
      description:
        "Situado en el lugar de la sala y la piscina pública J. K. Randle de 1928, la primera del país, y renovado por el estado de Lagos, este centro presenta la cultura y la historia yoruba mediante dispositivos digitales e interactivos. Su edificio curvo, diseñado por el arquitecto Seun Oduwole (estudio SI.SA), ha sido premiado. Está junto al Museo Nacional y a Tafawa Balewa Square, con los que forma un pequeño barrio cultural.",
      tips: "Combínelo con el Museo Nacional, a pocos pasos: las dos visitas se complementan bien.",
    },
    "theatre-national-lagos": {
      name: "Teatro Nacional (Wole Soyinka Centre)",
      summary: "Monumental centro de las artes de Iganmu, construido para el FESTAC 77.",
      description:
        "Terminado en 1976 para el Festival Mundial de las Artes y la Cultura Negras y Africanas (FESTAC 77), el Teatro Nacional de Iganmu es el edificio emblemático de la escena cultural nigeriana, con una silueta que recuerda una gorra militar. En 2024 se rebautizó en honor del premio Nobel de Literatura Wole Soyinka (Wole Soyinka Centre for Culture and Creative Arts). Sus salas y alrededores acogen espectáculos, proyecciones y exposiciones.",
      tips: "Consulte la programación antes de desplazarse: el lugar, en la parte continental cerca de Surulere, se alcanza en coche.",
    },
    "marche-balogun-lagos": {
      name: "Mercado de Balogun",
      summary: "El inmenso mercado de Lagos Island: telas wax, encajes, aso-oke, zapatos y mil cosas más.",
      description:
        "Sin dirección precisa porque se extiende por numerosas calles de Lagos Island, Balogun es el gran mercado de telas de Lagos: ankara (wax), encajes, aso-oke tejido, pero también zapatos, bolsos y artículos de todo tipo. El ambiente es intenso y la multitud muy densa, sobre todo antes de las fiestas.",
      tips: "Vaya con alguien que conozca el mercado, con pocos objetos de valor y dinero en billetes pequeños. Regatee. Evite las horas punta y los días previos a las fiestas.",
    },
    "marche-artisanal-lekki": {
      name: "Mercado de artesanía de Lekki",
      summary: "El mercado de artesanía de los viajeros: esculturas, telas, abalorios y arte de todo el país.",
      description:
        "En el barrio de Jakande, en Lekki, este mercado de artesanos y comerciantes reúne objetos de toda Nigeria y de África Occidental: esculturas, máscaras, bronces, telas adire y aso-oke, abalorios, cuero y pinturas. Es el lugar más práctico de Lagos para comprar artesanía.",
      tips: "Dé una vuelta antes de comprar y regatee. Si una pieza se presenta como antigua, sepa que la exportación de antigüedades requiere autorización: pida un justificante.",
    },
    "plage-tarkwa-bay-lagos": {
      name: "Playa de Tarkwa Bay",
      summary: "Playa resguardada junto a la entrada del puerto, accesible solo en barco.",
      description:
        "Formada al abrigo de los diques que protegen la entrada del puerto de Lagos, Tarkwa Bay es una playa de arena a la que solo se llega en taxi acuático desde Victoria Island o Ikoyi. Sus aguas, más tranquilas que las del océano abierto, la hacen popular entre bañistas y surfistas los fines de semana.",
      tips: "Embarque en un muelle reconocido, con chalecos salvavidas. Infórmese del estado del mar y de la limpieza de la playa, a veces contaminada, y báñese solo donde el agua esté tranquila.",
    },
    "quartier-bresilien-lagos": {
      name: "Barrio brasileño (Popo Aguda)",
      summary: "El barrio de los agudás, antiguos esclavos regresados de Brasil y Cuba en el siglo XIX.",
      description:
        "En torno a Campos Square y a las calles Tokunbo, Bamgbose y Kakawa, el barrio de Popo Aguda fue construido en el siglo XIX por afrobrasileños y afrocubanos libertos que regresaron a África Occidental, los agudás. Trajeron una arquitectura de fachadas ornamentadas de la que quedan algunos ejemplos, como la Water House. Un capítulo poco conocido de la historia de Lagos, para descubrir con un guía local.",
      tips: "Muchas casas son privadas o están deterioradas: mírelas desde fuera y pida permiso antes de fotografiar. Vaya de día y acompañado.",
    },
    "iga-idunganran-lagos": {
      name: "Iga Idunganran, palacio del Oba de Lagos",
      summary: "La residencia oficial del Oba de Lagos, en el viejo barrio de Isale Eko.",
      description:
        "Residencia oficial del Oba de Lagos, en Lagos Island, el palacio de Iga Idunganran se remonta a un primer edificio construido en 1670 para el Oba Gabaro, ampliado y renovado varias veces; su parte moderna se inauguró el 1 de octubre de 1960. Su nombre evoca el campo de pimientos que ocupaba antaño el lugar. El palacio ha sido centro administrativo y mercado, y está asociado al festival Eyo.",
      tips: "Es una residencia real en funcionamiento: la visita no está garantizada y requiere autorización. Sea respetuoso y pida permiso antes de cualquier foto.",
    },
    "vie-nocturne-lagos": {
      name: "Vida nocturna de Victoria Island, Ikoyi y Lekki",
      summary: "Restaurantes, bares, clubes y conciertos: Lagos vive de noche, sobre todo en diciembre.",
      description:
        "Lagos tiene una de las vidas nocturnas más intensas de África. Victoria Island, Ikoyi y Lekki concentran restaurantes, lounges, bares en azoteas, clubes y salas de conciertos, mientras que Ikeja, en el continente, tiene sus propios lugares, entre ellos la New Afrika Shrine. Las noches empiezan tarde, y la temporada de diciembre, el «Detty December», multiplica conciertos y fiestas.",
      tips: "No camine nunca de noche: reserve un conductor de confianza para la ida y la vuelta. Lleve lo mínimo, vigile su bebida y pida consejo en su alojamiento sobre los lugares del momento.",
      bestPeriod: "Todo el año, sobre todo en diciembre",
    },
    "suya-lagos": {
      name: "Suya y comida callejera",
      summary: "Tiras de carne de vaca especiadas asadas a la brasa, estrella de las noches nigerianas.",
      description:
        "Originario del norte hausa, el suya es carne, casi siempre de vaca, cortada en tiras finas, rebozada en una mezcla de especias a base de cacahuete (yaji), asada a la brasa y servida con cebolla cruda y tomate. Se compra por la noche a los parrilleros callejeros de todo el país. Lagos se saborea también con el arroz jollof, la pepper soup, los buñuelos de akara y los plátanos macho fritos (dodo).",
      tips: "Elija un vendedor concurrido y carne asada delante de usted. El yaji es muy picante: pida menos si lo necesita.",
    },
    "musee-mobee-badagry": {
      name: "Museo Mobee de reliquias de la esclavitud",
      summary: "Pequeño museo familiar con cadenas, grilletes y objetos de la trata.",
      description:
        "Dirigido por descendientes de una familia de jefes tradicionales de Badagry, este museo privado expone reliquias de la trata: esposas y grilletes, algunos de los cuales unían las piernas de dos cautivos, y un hierro de marcar de finales del siglo XVIII que perteneció al tratante de esclavos Sunbu Mobee, cuya tumba se encuentra allí. Fuera se exponen dos cañones del siglo XVIII. Una visita breve pero impactante.",
      tips: "Las explicaciones las dan miembros de la familia: tómese tiempo para escucharlas.",
    },
    "marche-esclaves-vlekete-badagry": {
      name: "Mercado de esclavos de Vlekete",
      summary: "Antiguo mercado de la trata, con el nombre de la divinidad Vlekete, hoy lugar de memoria.",
      description:
        "Fundado según la tradición en 1502 y llamado así por la divinidad Vlekete, este mercado de Badagry fue uno de los lugares donde intermediarios africanos vendían cautivos a los negreros europeos. El sitio, con un pequeño museo y estatuas conmemorativas, recuerda el papel del puerto en la trata atlántica.",
      tips: "Visítelo con un guía de Badagry, que lo relacionará con el museo del patrimonio, el museo Mobee y el Punto de no retorno.",
    },
    "centenary-hall-abeokuta": {
      name: "Centenary Hall",
      summary: "Edificio colonial de 1930 junto al palacio del Alake, en el barrio de Ake.",
      description:
        "Inaugurado en 1930 para conmemorar el centenario del asentamiento de los egba en Abeokuta, el Centenary Hall se alza en el barrio de Ake, cerca del palacio del Alake, rey de los egba. Con sus arcadas y su fachada clara, es uno de los principales monumentos históricos de la ciudad.",
      tips: "El barrio de Ake y el palacio del Alake se descubren con un guía local, de día.",
    },
    "bibliotheque-obasanjo-abeokuta": {
      name: "Biblioteca presidencial Olusegun Obasanjo",
      summary: "Archivos y espacios de exposición dedicados a un expresidente, en Oke Mosan.",
      description:
        "Inspirada en el modelo de las bibliotecas presidenciales estadounidenses, esta institución del barrio de Oke Mosan conserva los documentos y recuerdos del expresidente Olusegun Obasanjo, originario de la región, y recorre a través de ellos la historia política reciente de Nigeria. El amplio complejo acoge también exposiciones y eventos.",
      tips: "Infórmese con antelación sobre los espacios abiertos a la visita.",
    },
    "mapo-hall-ibadan": {
      name: "Mapo Hall",
      summary: "Ayuntamiento neoclásico de los años 1920, en lo alto de la colina de Mapo.",
      description:
        "Construido entre 1925 y 1929 bajo la administración colonial, Mapo Hall, el ayuntamiento de Ibadán, corona la colina de Mapo con su columnata neoclásica. Visible desde muchos puntos de la ciudad, ofrece a su vez una amplia vista sobre el casco antiguo y sus tejados de chapa oxidada.",
      tips: "El barrio de Mapo es muy animado y congestionado: vaya con conductor y un guía local.",
    },
    "universite-ibadan": {
      name: "Universidad de Ibadán",
      summary: "La universidad más antigua del país, fundada en 1948, en un amplio campus arbolado.",
      description:
        "Fundada en 1948 como University College vinculado a la Universidad de Londres e independiente desde 1962, la Universidad de Ibadán es la institución universitaria más antigua de Nigeria; Wole Soyinka y muchas otras figuras del país estudiaron en ella. Su gran campus verde, con la biblioteca Kenneth Dike, invita al paseo.",
      tips: "El acceso al campus puede estar controlado: lleve un documento de identidad y respete las normas de la universidad.",
    },
    "aso-rock-abuja": {
      name: "Aso Rock",
      summary: "Monolito de granito que culmina a 936 m, símbolo de la capital.",
      description:
        "Con 936 metros de altitud, unos 400 metros por encima de los alrededores, el Aso Rock es el símbolo de Abuya. A sus pies se encuentran la presidencia (Aso Rock Villa), la Asamblea Nacional y el Tribunal Supremo. Se admira de lejos, desde Millennium Park o las grandes avenidas, sobre todo al atardecer.",
      tips: "La roca está en una zona oficial de alta seguridad: no se puede escalar, y no fotografíe edificios oficiales ni fuerzas de seguridad.",
    },
    "fontaine-unite-abuja": {
      name: "Fuente de la Unidad",
      summary: "Fuente monumental con los nombres de los estados de la federación.",
      description:
        "En el barrio de Maitama, la Fuente de la Unidad combina estanques, columnas y un muro con los nombres de los estados de Nigeria, símbolo de la unidad de la federación. El lugar sirve también de punto de reunión y de conmemoración para los habitantes de la capital.",
      tips: "Aquí se celebran concentraciones con regularidad: evite el lugar durante las manifestaciones.",
    },
    "marche-wuse-abuja": {
      name: "Mercado de Wuse",
      summary: "El gran mercado de la capital: productos frescos, pescado ahumado, especias, telas.",
      description:
        "El mercado de Wuse es el principal mercado de Abuya: frutas y verduras, pescado ahumado, especias, telas y productos de todas las regiones del país conviven en él. Una inmersión en la vida cotidiana de la capital.",
      tips: "Vaya acompañado, de día, y mantenga sus pertenencias cerca. Regatee con una sonrisa.",
    },
    "maison-susanne-wenger-osogbo": {
      name: "Casa de Susanne Wenger",
      summary: "La casa cubierta de esculturas de la artista y sacerdotisa Adunni Olorisha.",
      description:
        "En el centro de Osogbo, la casa de la artista austriaca Susanne Wenger (1915-2009), convertida en sacerdotisa yoruba con el nombre de Adunni Olorisha, está cubierta de esculturas y ornamentos. Junto a los artistas del movimiento del «Nuevo arte sacro», trabajó por la protección del bosque sagrado de Osun, declarado monumento nacional en 1965 y después patrimonio mundial.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. La casa sigue siendo una residencia: infórmese sobre las condiciones de visita.",
    },
    "palais-oba-benin-city": {
      name: "Palacio real del Oba de Benín",
      summary: "Residencia del Oba de Benín, reconstruida tras la expedición británica de 1897.",
      description:
        "El palacio original, fundado según la tradición en el siglo XIII por el Oba Ewedo, se encontraba en el corazón de la antigua Benin City y albergaba los célebres bronces. Destruido en 1897 durante la expedición británica, fue reconstruido bajo el Oba Eweka II (1914-1932). Sigue siendo la residencia del Oba y el centro de la vida ceremonial del reino, sobre todo durante el Igue en diciembre.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. Residencia real en funcionamiento: visita con autorización, ropa decorosa y fotos solo si están permitidas.",
    },
    "musee-histoire-esclavage-calabar": {
      name: "Museo de la historia de la esclavitud",
      summary: "Museo de la trata en Marina Resort, en el lugar de un antiguo almacén de esclavos.",
      description:
        "Abierto en 2011 junto al agua, en Marina Resort, en el lugar de un antiguo almacén de la trata, este museo gestionado por la Comisión Nacional de Museos y Monumentos cuenta la historia de un puerto desde el que unos 200 000 africanos fueron vendidos como esclavos entre 1662 y 1863. Evoca los mercados de esclavos del interior, las cadenas y grilletes y las trayectorias tanto de víctimas como de negreros.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto.",
    },
    "musee-national-ife": {
      name: "Museo Nacional de Ife",
      summary: "El museo de las antigüedades de Ife: cabezas de terracota y bronce, esculturas de piedra.",
      description:
        "Abierto en 1954 en un edificio circular de 1948, no lejos del palacio del Ooni, el Museo Nacional de Ife presenta los hallazgos arqueológicos de la antigua ciudad: cabezas y figuras de terracota, objetos de aleación de cobre y esculturas de piedra, además de objetos etnográficos. Varias cabezas robadas a principios de los años noventa se recuperaron en Francia y se devolvieron en 1996.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto.",
    },
    "palais-ooni-ile-ife": {
      name: "Palacio del Ooni de Ife",
      summary: "La residencia del Ooni, uno de los soberanos tradicionales yoruba más prestigiosos.",
      description:
        "El Ooni de Ife, considerado descendiente de Oduduwa, ocupa un lugar aparte entre los reyes yoruba; el soberano actual, Oba Adeyeye Enitan Ogunwusi (Ojaja II), reina desde 2015. El palacio, en el centro de la ciudad, es el corazón de grandes ceremonias como el Olojo, cuando el Ooni aparece con la corona Are y se dirige en procesión al santuario de Oke Mogun.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. Residencia real en funcionamiento: visita con autorización y fotos solo si están permitidas.",
    },
    "opa-oranmiyan-ile-ife": {
      name: "Bastón de Oranmiyan (Opa Oranmiyan)",
      summary: "Monolito de granito de 5,5 m asociado al héroe fundador Oranmiyan.",
      description:
        "En un bosquecillo sagrado del barrio de Mopa, este monolito de unos 5,5 metros de altura es, según la tradición, el bastón del príncipe Oranmiyan, fundador legendario de los reinos de Oyo y de Benín. Una tormenta le rompió la parte superior en 1884 y ha sido enderezado varias veces; las dataciones por carbono 14 sugieren que es mucho más antiguo que la dinastía a la que se asocia.",
      tips: "Zona desaconsejada salvo motivo imperativo por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. El lugar es sagrado: siga las indicaciones de los guardianes.",
    },
    "gidan-makama-kano": {
      name: "Museo Gidan Makama",
      summary: "El museo de Kano, en un edificio del siglo XV de muros de tierra decorados.",
      description:
        "Construido en el siglo XV para Muhammad Rumfa, entonces titular del título de Makama antes de convertirse en rey de Kano, este edificio de muros de tierra decorados con motivos en relieve es monumento nacional. Alberga el museo de Kano, cuyas salas presentan las murallas y planos de la ciudad, la historia del estado, el siglo XIX, la economía, la artesanía y la música.",
      tips: "Ciudad de Kano desaconsejada salvo motivo imperativo, en un estado formalmente desaconsejado por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto.",
    },
    "palais-emir-kano": {
      name: "Palacio del emir (Gidan Rumfa)",
      summary: "Palacio de finales del siglo XV, aún residencia de la autoridad tradicional de Kano.",
      description:
        "Construido a finales del siglo XV por Muhammad Rumfa, el Gidan Rumfa es desde entonces la residencia de la autoridad tradicional de Kano, incluso después de la toma del poder por los yihadistas fulani a principios del siglo XIX. Sus unas 13 hectáreas rodeadas de altos muros reúnen patios, jardines, mezquita y edificios decorados, con la puerta sur, Kofar Kudu, como entrada monumental. De aquí salen y aquí vuelven los jinetes del durbar de Sallah.",
      tips: "Ciudad de Kano desaconsejada salvo motivo imperativo, en un estado formalmente desaconsejado por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. Residencia en funcionamiento: se ve sobre todo desde fuera. La sucesión del emirato está en litigio ante los tribunales: evite cualquier aglomeración.",
    },
    "marche-kurmi-kano": {
      name: "Mercado de Kurmi",
      summary: "Gran mercado fundado en el siglo XV por el rey Muhammad Rumfa.",
      description:
        "Creado en el siglo XV por el rey Muhammad Rumfa en el barrio de Jakara para acoger el comercio regional y transahariano, el mercado de Kurmi hizo la riqueza de Kano. Sus pasillos, organizados por especialidades, ofrecen telas, calabazas, cuero, hierbas medicinales, incienso y objetos de artesanía.",
      tips: "Ciudad de Kano desaconsejada salvo motivo imperativo, en un estado formalmente desaconsejado por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. Una vez allí, vaya acompañado, de día, y mantenga sus pertenencias cerca.",
    },
    "teintureries-kofar-mata-kano": {
      name: "Tintorerías de Kofar Mata",
      summary: "Fosas de tinte de índigo en uso desde hace más de cinco siglos, junto a una puerta de la muralla.",
      description:
        "Cerca de la puerta Kofar Mata de las antiguas murallas, decenas de fosas excavadas en el suelo sirven desde hace más de cinco siglos, según la tradición desde 1498, para teñir telas con índigo natural. Es uno de los centros de tintura más antiguos aún activos de África Occidental: los tintoreros sumergen las telas y luego las golpean para darles brillo, y se pueden comprar piezas allí mismo.",
      tips: "Ciudad de Kano desaconsejada salvo motivo imperativo, en un estado formalmente desaconsejado por France Diplomatie: consulte las recomendaciones de viaje antes de cualquier proyecto. Pida permiso antes de fotografiar a los tintoreros.",
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
    "ile-ife": {
      name: "Ile-Ife",
      region: "Estado de Osun",
      summary: "Cidade sagrada, berço mítico dos iorubás e lar das célebres cabeças de Ife. Zona desaconselhada salvo motivo imperioso.",
      description:
        "Segundo a tradição iorubá, foi em Ile-Ife que o mundo foi criado e que reinou Oduduwa, antepassado das dinastias iorubás; o Ooni de Ife continua a residir ali. Aproximadamente entre os séculos XII e XV, os seus artistas produziram cabeças de terracota e de liga de cobre de um naturalismo impressionante, parte das quais está exposta no museu nacional. Cidade universitária (Universidade Obafemi Awolowo), celebra todos os anos o festival Olojo. Atenção: a France Diplomatie classifica o estado de Osun como zona «desaconselhada salvo motivo imperioso». Destino apresentado pelo seu valor patrimonial; não faz parte de nenhum circuito.",
    },
    "kano": {
      name: "Kano",
      region: "Estado de Kano",
      summary: "Velha cidade haúça: muralhas, palácio do emir, tinturarias de índigo e grandes mercados. Zona desaconselhada salvo motivo imperioso.",
      description:
        "Grande cidade do norte, Kano foi durante séculos uma das principais encruzilhadas do comércio transariano, capital de um reino haúça e depois de um emirado. A sua cidade velha, nascida em torno da colina de Dala e cercada por muralhas de terra em parte conservadas (na lista indicativa da UNESCO com os sítios associados), conserva o palácio do emir, o mercado de Kurmi e as tinturarias de Kofar Mata. Atenção: a France Diplomatie desaconselha formalmente o estado de Kano e classifica a própria cidade como zona «desaconselhada salvo motivo imperioso»; o FCDO britânico desaconselha qualquer viagem não essencial ao estado, e a estrada Abuja-Kaduna-Kano é considerada de alto risco. Destino apresentado pelo seu valor patrimonial; não faz parte de nenhum circuito.",
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
        "Todos os anos em dezembro, o carnaval de Calabar transforma a cidade numa imensa festa de rua: desfiles de grupos mascarados, carros alegóricos, dança e concertos, em festividades que culminam no fim de dezembro com o grande desfile dos «grupos». Atrai visitantes de todo o país e do estrangeiro.",
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
    "kalakuta-museum-lagos": {
      name: "Kalakuta Museum",
      summary: "A última casa de Fela Kuti, em Ikeja, transformada em museu em 2012.",
      description:
        "No bairro de Ikeja, a casa de três pisos onde Fela Anikulapo-Kuti viveu até morrer, em 1997, foi transformada em museu em 2012, com o apoio do estado de Lagos. Podem ver-se os seus trajes de palco, sapatos, capas de discos e o quarto tal como o deixou; o túmulo do músico encontra-se no recinto. A casa sucedeu à primeira «Kalakuta Republic», incendiada pelo exército em 1977.",
      tips: "Combine a visita com a New Afrika Shrine, também em Ikeja. Ikeja fica na parte continental, longe das ilhas: preveja muita margem para o trânsito.",
    },
    "new-afrika-shrine-lagos": {
      name: "New Afrika Shrine",
      summary: "A sala de concertos da família Kuti em Ikeja, templo do afrobeat.",
      description:
        "Herdeira da Afrika Shrine criada por Fela em 1970 e destruída em 1977, a New Afrika Shrine é um amplo espaço de espetáculos aberto em Ikeja, gerido por Femi Kuti e Yeni Anikulapo-Kuti. Fotografias e pinturas de Fela cobrem as paredes, e Femi ou Seun Kuti atuam ali com regularidade. É também o coração da Felabration, todos os anos em outubro.",
      tips: "Os concertos começam tarde e acabam de madrugada: organize a ida e o regresso com um motorista de confiança. Informe-se sobre a programação antes de ir.",
      bestPeriod: "Outubro, durante a Felabration",
    },
    "tafawa-balewa-square-lagos": {
      name: "Tafawa Balewa Square",
      summary: "Grande praça cerimonial de Lagos Island, no antigo hipódromo da independência.",
      description:
        "A Tafawa Balewa Square (TBS) foi construída em 1972 no antigo hipódromo de Lagos, onde em 1960 se celebraram a independência do país e o arriar da bandeira britânica. Esta esplanada de 14,5 hectares rodeada de bancadas reconhece-se pela entrada encimada por cavalos brancos e águias vermelhas, símbolos retirados do brasão nacional. Acolhe desfiles, grandes concentrações e o festival Eyo.",
      tips: "O lugar ganha vida durante os eventos; caso contrário, vê-se de passagem a caminho do Museu Nacional e do centro John Randle, muito próximos.",
    },
    "cathedrale-christ-church-lagos": {
      name: "Cathedral Church of Christ",
      summary: "A mais antiga catedral anglicana da Nigéria, edifício neogótico da Marina.",
      description:
        "Fundada em 1869, a catedral anglicana da Marina ocupa um edifício neogótico iniciado em 1924 e concluído em 1946, com a sua torre do relógio e pináculos. Alberga um cenotáfio em memória de Samuel Ajayi Crowther, antigo escravo iorubá que se tornou o primeiro bispo africano da Igreja anglicana, cujos restos foram para ali trasladados em 1976.",
      tips: "Vista-se com decoro; evite as horas de culto de domingo, a não ser para assistir.",
    },
    "mosquee-centrale-lagos": {
      name: "Mesquita Central de Lagos",
      summary: "Grande mesquita de cúpula dourada e quatro minaretes, no coração de Lagos Island.",
      description:
        "Na muito comercial rua Nnamdi Azikiwe, a mesquita central é a mesquita de sexta-feira do imã principal de Lagos. O edifício atual, aberto em 1988, substituiu uma mesquita construída entre 1908 e 1913; a cúpula dourada e os minaretes dominam os telhados da ilha.",
      tips: "Os não muçulmanos conhecem-na sobretudo do exterior: informe-se no local antes de entrar, com roupa que cubra e fora das horas de oração. O bairro está muito movimentado: mantenha os seus pertences perto de si.",
    },
    "centre-john-randle-lagos": {
      name: "Centro John Randle de Cultura e História Iorubá",
      summary: "Museu moderno e interativo dedicado à cultura iorubá, em Onikan.",
      description:
        "Instalado no local do salão e da piscina pública J. K. Randle de 1928, a primeira do país, e renovado pelo estado de Lagos, este centro apresenta a cultura e a história iorubá através de dispositivos digitais e interativos. O seu edifício curvo, desenhado pelo arquiteto Seun Oduwole (estúdio SI.SA), foi premiado. Fica junto ao Museu Nacional e à Tafawa Balewa Square, formando com eles um pequeno bairro cultural.",
      tips: "Junte-o ao Museu Nacional, a poucos passos: as duas visitas complementam-se bem.",
    },
    "theatre-national-lagos": {
      name: "Teatro Nacional (Wole Soyinka Centre)",
      summary: "Monumental centro das artes de Iganmu, construído para o FESTAC 77.",
      description:
        "Concluído em 1976 para o Festival Mundial de Artes e Cultura Negras e Africanas (FESTAC 77), o Teatro Nacional de Iganmu é o edifício emblemático da cena cultural nigeriana, com uma silhueta que lembra um boné militar. Em 2024 foi rebatizado em honra do Nobel da Literatura Wole Soyinka (Wole Soyinka Centre for Culture and Creative Arts). As suas salas e envolvente acolhem espetáculos, projeções e exposições.",
      tips: "Consulte a programação antes de se deslocar: o local, na parte continental perto de Surulere, alcança-se de carro.",
    },
    "marche-balogun-lagos": {
      name: "Mercado de Balogun",
      summary: "O imenso mercado de Lagos Island: tecidos wax, rendas, aso-oke, sapatos e mil outras coisas.",
      description:
        "Sem morada precisa porque se estende por muitas ruas de Lagos Island, Balogun é o grande mercado de tecidos de Lagos: ankara (wax), rendas, aso-oke tecido à mão, mas também sapatos, malas e artigos de todo o tipo. O ambiente é intenso e a multidão muito densa, sobretudo antes das festas.",
      tips: "Vá com alguém que conheça o mercado, com poucos objetos de valor e dinheiro em notas pequenas. Regateie. Evite as horas de ponta e os dias que antecedem as festas.",
    },
    "marche-artisanal-lekki": {
      name: "Mercado de artesanato de Lekki",
      summary: "O mercado de artesanato dos viajantes: esculturas, tecidos, missangas e arte de todo o país.",
      description:
        "No bairro de Jakande, em Lekki, este mercado de artesãos e comerciantes reúne objetos de toda a Nigéria e da África Ocidental: esculturas, máscaras, bronzes, tecidos adire e aso-oke, missangas, couro e pinturas. É o local mais prático de Lagos para comprar artesanato.",
      tips: "Dê uma volta antes de comprar e regateie. Se uma peça for apresentada como antiga, saiba que a exportação de antiguidades exige autorização: peça um comprovativo.",
    },
    "plage-tarkwa-bay-lagos": {
      name: "Praia de Tarkwa Bay",
      summary: "Praia abrigada junto à entrada do porto, acessível apenas de barco.",
      description:
        "Formada ao abrigo dos molhes que protegem a entrada do porto de Lagos, Tarkwa Bay é uma praia de areia a que só se chega de táxi aquático a partir de Victoria Island ou Ikoyi. As suas águas, mais calmas do que as do oceano aberto, tornam-na popular entre banhistas e surfistas ao fim de semana.",
      tips: "Embarque num cais reconhecido, com coletes salva-vidas. Informe-se sobre o estado do mar e a limpeza da praia, por vezes poluída, e só tome banho onde a água estiver calma.",
    },
    "quartier-bresilien-lagos": {
      name: "Bairro brasileiro (Popo Aguda)",
      summary: "O bairro dos agudás, antigos escravizados regressados do Brasil e de Cuba no século XIX.",
      description:
        "Em torno da Campos Square e das ruas Tokunbo, Bamgbose e Kakawa, o bairro de Popo Aguda foi construído no século XIX por afro-brasileiros e afro-cubanos libertos que regressaram à África Ocidental, os agudás. Trouxeram uma arquitetura de fachadas ornamentadas de que restam alguns testemunhos, como a Water House. Um capítulo pouco conhecido da história de Lagos, a descobrir com um guia local.",
      tips: "Muitas casas são privadas ou estão degradadas: observe-as do exterior e peça autorização antes de fotografar. Vá de dia e acompanhado.",
    },
    "iga-idunganran-lagos": {
      name: "Iga Idunganran, palácio do Oba de Lagos",
      summary: "A residência oficial do Oba de Lagos, no velho bairro de Isale Eko.",
      description:
        "Residência oficial do Oba de Lagos, em Lagos Island, o palácio de Iga Idunganran remonta a um primeiro edifício construído em 1670 para o Oba Gabaro, várias vezes ampliado e renovado; a sua parte moderna foi inaugurada a 1 de outubro de 1960. O nome evoca o campo de malaguetas que outrora ocupava o local. O palácio foi centro administrativo e mercado, e está associado ao festival Eyo.",
      tips: "É uma residência real em funcionamento: a visita não é garantida e requer autorização. Seja respeitoso e peça licença antes de qualquer fotografia.",
    },
    "vie-nocturne-lagos": {
      name: "Vida noturna de Victoria Island, Ikoyi e Lekki",
      summary: "Restaurantes, bares, discotecas e concertos: Lagos vive à noite, sobretudo em dezembro.",
      description:
        "Lagos tem uma das vidas noturnas mais intensas de África. Victoria Island, Ikoyi e Lekki concentram restaurantes, lounges, bares em terraços, discotecas e salas de concertos, enquanto Ikeja, no continente, tem os seus próprios locais, entre eles a New Afrika Shrine. As noites começam tarde, e a época de dezembro, o «Detty December», multiplica concertos e festas.",
      tips: "Nunca ande a pé à noite: reserve um motorista de confiança para a ida e o regresso. Leve o mínimo, vigie a sua bebida e peça conselho no alojamento sobre os locais do momento.",
      bestPeriod: "Todo o ano, sobretudo em dezembro",
    },
    "suya-lagos": {
      name: "Suya e comida de rua",
      summary: "Tiras de carne de vaca condimentadas grelhadas na brasa, estrela das noites nigerianas.",
      description:
        "Originário do norte haúça, o suya é carne, quase sempre de vaca, cortada em tiras finas, envolvida numa mistura de especiarias à base de amendoim (yaji), grelhada na brasa e servida com cebola crua e tomate. Compra-se à noite aos grelhadores de rua de todo o país. Lagos saboreia-se também com o arroz jollof, a pepper soup, os bolinhos de akara e a banana-pão frita (dodo).",
      tips: "Escolha um vendedor movimentado e carne grelhada à sua frente. O yaji é muito picante: peça menos, se necessário.",
    },
    "musee-mobee-badagry": {
      name: "Museu Mobee das relíquias da escravatura",
      summary: "Pequeno museu familiar com correntes, grilhetas e objetos do tráfico de escravos.",
      description:
        "Gerido por descendentes de uma família de chefes tradicionais de Badagry, este museu privado expõe relíquias do tráfico: algemas e grilhetas, algumas das quais prendiam as pernas de dois cativos, e um ferro de marcar do final do século XVIII que pertenceu ao negreiro Sunbu Mobee, cujo túmulo se encontra no local. No exterior estão expostos dois canhões do século XVIII. Uma visita breve mas impressionante.",
      tips: "As explicações são dadas por membros da família: reserve tempo para as ouvir.",
    },
    "marche-esclaves-vlekete-badagry": {
      name: "Mercado de escravos de Vlekete",
      summary: "Antigo mercado do tráfico, com o nome da divindade Vlekete, hoje lugar de memória.",
      description:
        "Criado segundo a tradição em 1502 e com o nome da divindade Vlekete, este mercado de Badagry foi um dos locais onde intermediários africanos vendiam cativos aos negreiros europeus. O sítio, com um pequeno museu e estátuas comemorativas, recorda o papel do porto no tráfico atlântico.",
      tips: "Visite-o com um guia de Badagry, que o relacionará com o museu do património, o museu Mobee e o Ponto de não retorno.",
    },
    "centenary-hall-abeokuta": {
      name: "Centenary Hall",
      summary: "Edifício colonial de 1930 junto ao palácio do Alake, no bairro de Ake.",
      description:
        "Inaugurado em 1930 para comemorar o centenário da fixação dos egba em Abeokuta, o Centenary Hall ergue-se no bairro de Ake, perto do palácio do Alake, rei dos egba. Com as suas arcadas e fachada clara, é um dos principais monumentos históricos da cidade.",
      tips: "O bairro de Ake e o palácio do Alake descobrem-se com um guia local, de dia.",
    },
    "bibliotheque-obasanjo-abeokuta": {
      name: "Biblioteca presidencial Olusegun Obasanjo",
      summary: "Arquivos e espaços de exposição dedicados a um antigo presidente, em Oke Mosan.",
      description:
        "Inspirada no modelo das bibliotecas presidenciais americanas, esta instituição do bairro de Oke Mosan conserva os documentos e recordações do antigo presidente Olusegun Obasanjo, natural da região, e percorre através deles a história política recente da Nigéria. O vasto complexo acolhe também exposições e eventos.",
      tips: "Informe-se com antecedência sobre os espaços abertos a visitas.",
    },
    "mapo-hall-ibadan": {
      name: "Mapo Hall",
      summary: "Câmara municipal neoclássica dos anos 1920, no alto da colina de Mapo.",
      description:
        "Construído entre 1925 e 1929 sob a administração colonial, o Mapo Hall, a câmara municipal de Ibadan, coroa a colina de Mapo com a sua colunata neoclássica. Visível de muitos pontos da cidade, oferece por sua vez uma vista ampla sobre a cidade velha e os seus telhados de chapa enferrujada.",
      tips: "O bairro de Mapo é muito animado e congestionado: vá com motorista e um guia local.",
    },
    "universite-ibadan": {
      name: "Universidade de Ibadan",
      summary: "A mais antiga universidade do país, fundada em 1948, num vasto campus arborizado.",
      description:
        "Fundada em 1948 como University College ligado à Universidade de Londres e independente desde 1962, a Universidade de Ibadan é a mais antiga instituição universitária da Nigéria; Wole Soyinka e muitas outras figuras do país estudaram ali. O seu grande campus verde, com a biblioteca Kenneth Dike, convida a um passeio.",
      tips: "O acesso ao campus pode ser controlado: leve um documento de identificação e respeite as regras da universidade.",
    },
    "aso-rock-abuja": {
      name: "Aso Rock",
      summary: "Monólito de granito que culmina a 936 m, símbolo da capital.",
      description:
        "Com 936 metros de altitude, cerca de 400 metros acima da envolvente, o Aso Rock é o símbolo de Abuja. No seu sopé encontram-se a presidência (Aso Rock Villa), a Assembleia Nacional e o Supremo Tribunal. Admira-se ao longe, a partir do Millennium Park ou das grandes avenidas, sobretudo ao pôr do sol.",
      tips: "O rochedo fica numa zona oficial de alta segurança: não é permitido subir, nem fotografar edifícios oficiais ou forças de segurança.",
    },
    "fontaine-unite-abuja": {
      name: "Fonte da Unidade",
      summary: "Fonte monumental com os nomes dos estados da federação.",
      description:
        "No bairro de Maitama, a Fonte da Unidade combina lagos, colunas e um muro com os nomes dos estados da Nigéria, símbolo da unidade da federação. O local serve também de ponto de encontro e de homenagem para os habitantes da capital.",
      tips: "Realizam-se aqui concentrações com regularidade: evite o local durante manifestações.",
    },
    "marche-wuse-abuja": {
      name: "Mercado de Wuse",
      summary: "O grande mercado da capital: produtos frescos, peixe fumado, especiarias, tecidos.",
      description:
        "O mercado de Wuse é o principal mercado de Abuja: fruta e legumes, peixe fumado, especiarias, tecidos e produtos de todas as regiões do país convivem lado a lado. Uma imersão no quotidiano da capital.",
      tips: "Vá acompanhado, de dia, e mantenha os seus pertences perto de si. Regateie com um sorriso.",
    },
    "maison-susanne-wenger-osogbo": {
      name: "Casa de Susanne Wenger",
      summary: "A casa coberta de esculturas da artista e sacerdotisa Adunni Olorisha.",
      description:
        "No centro de Osogbo, a casa da artista austríaca Susanne Wenger (1915-2009), que se tornou sacerdotisa iorubá com o nome de Adunni Olorisha, está coberta de esculturas e ornamentos. Com os artistas do movimento da «Nova arte sacra», trabalhou pela proteção da floresta sagrada de Osun, classificada monumento nacional em 1965 e depois património mundial.",
      tips: "Zona desaconselhada salvo motivo imperioso pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. A casa continua a ser uma residência: informe-se sobre as condições de visita.",
    },
    "palais-oba-benin-city": {
      name: "Palácio real do Oba do Benim",
      summary: "Residência do Oba do Benim, reconstruída após a expedição britânica de 1897.",
      description:
        "O palácio original, fundado segundo a tradição no século XIII pelo Oba Ewedo, ficava no coração da antiga Benin City e albergava os célebres bronzes. Destruído em 1897 durante a expedição britânica, foi reconstruído sob o Oba Eweka II (1914-1932). Continua a ser a residência do Oba e o centro da vida cerimonial do reino, nomeadamente durante o Igue, em dezembro.",
      tips: "Zona desaconselhada salvo motivo imperioso pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. Residência real em funcionamento: visita mediante autorização, roupa decorosa e fotografias só se forem permitidas.",
    },
    "musee-histoire-esclavage-calabar": {
      name: "Museu da história da escravatura",
      summary: "Museu do tráfico de escravos em Marina Resort, no local de um antigo armazém de escravos.",
      description:
        "Aberto em 2011 junto à água, em Marina Resort, no local de um antigo armazém do tráfico, este museu gerido pela Comissão Nacional de Museus e Monumentos conta a história de um porto de onde cerca de 200 000 africanos foram vendidos como escravos entre 1662 e 1863. Evoca os mercados de escravos do interior, as correntes e grilhetas e os percursos tanto de vítimas como de negreiros.",
      tips: "Zona desaconselhada salvo motivo imperioso pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto.",
    },
    "musee-national-ife": {
      name: "Museu Nacional de Ife",
      summary: "O museu das antiguidades de Ife: cabeças de terracota e de bronze, esculturas de pedra.",
      description:
        "Aberto em 1954 num edifício circular de 1948, perto do palácio do Ooni, o Museu Nacional de Ife apresenta os achados arqueológicos da antiga cidade: cabeças e figuras de terracota, objetos em liga de cobre e esculturas de pedra, além de objetos etnográficos. Várias cabeças roubadas no início dos anos 1990 foram recuperadas em França e devolvidas em 1996.",
      tips: "Zona desaconselhada salvo motivo imperioso pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto.",
    },
    "palais-ooni-ile-ife": {
      name: "Palácio do Ooni de Ife",
      summary: "A residência do Ooni, um dos mais prestigiados soberanos tradicionais iorubás.",
      description:
        "O Ooni de Ife, considerado descendente de Oduduwa, ocupa um lugar à parte entre os reis iorubás; o soberano atual, Oba Adeyeye Enitan Ogunwusi (Ojaja II), reina desde 2015. O palácio, no centro da cidade, é o coração de grandes cerimónias como o Olojo, quando o Ooni surge com a coroa Are e segue em procissão até ao santuário de Oke Mogun.",
      tips: "Zona desaconselhada salvo motivo imperioso pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. Residência real em funcionamento: visita mediante autorização e fotografias só se forem permitidas.",
    },
    "opa-oranmiyan-ile-ife": {
      name: "Bastão de Oranmiyan (Opa Oranmiyan)",
      summary: "Monólito de granito de 5,5 m associado ao herói fundador Oranmiyan.",
      description:
        "Num bosque sagrado do bairro de Mopa, este monólito com cerca de 5,5 metros de altura é, segundo a tradição, o bastão do príncipe Oranmiyan, fundador lendário dos reinos de Oyo e do Benim. Uma tempestade partiu-lhe o topo em 1884 e foi várias vezes reerguido; as datações por carbono 14 sugerem que é muito mais antigo do que a dinastia a que está associado.",
      tips: "Zona desaconselhada salvo motivo imperioso pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. O local é sagrado: siga as indicações dos guardiães.",
    },
    "gidan-makama-kano": {
      name: "Museu Gidan Makama",
      summary: "O museu de Kano, num edifício do século XV com paredes de terra decoradas.",
      description:
        "Construído no século XV para Muhammad Rumfa, então titular do título de Makama antes de se tornar rei de Kano, este edifício de paredes de terra decoradas com motivos em relevo é monumento nacional. Alberga o museu de Kano, cujas galerias apresentam as muralhas e plantas da cidade, a história do estado, o século XIX, a economia, o artesanato e a música.",
      tips: "Cidade de Kano desaconselhada salvo motivo imperioso, num estado formalmente desaconselhado pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto.",
    },
    "palais-emir-kano": {
      name: "Palácio do emir (Gidan Rumfa)",
      summary: "Palácio do final do século XV, ainda residência da autoridade tradicional de Kano.",
      description:
        "Construído no final do século XV por Muhammad Rumfa, o Gidan Rumfa é desde então a residência da autoridade tradicional de Kano, mesmo após a tomada do poder pelos jihadistas fulas no início do século XIX. Os seus cerca de 13 hectares rodeados de muros altos reúnem pátios, jardins, mesquita e edifícios decorados, com a porta sul, Kofar Kudu, como entrada monumental. É daqui que partem e para aqui regressam os cavaleiros do durbar de Sallah.",
      tips: "Cidade de Kano desaconselhada salvo motivo imperioso, num estado formalmente desaconselhado pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. Residência em funcionamento: vê-se sobretudo do exterior. A sucessão do emirado está em litígio nos tribunais: evite ajuntamentos.",
    },
    "marche-kurmi-kano": {
      name: "Mercado de Kurmi",
      summary: "Grande mercado fundado no século XV pelo rei Muhammad Rumfa.",
      description:
        "Criado no século XV pelo rei Muhammad Rumfa no bairro de Jakara para acolher o comércio regional e transariano, o mercado de Kurmi fez a riqueza de Kano. As suas ruelas, organizadas por especialidades, oferecem tecidos, cabaças, couro, ervas medicinais, incenso e artesanato.",
      tips: "Cidade de Kano desaconselhada salvo motivo imperioso, num estado formalmente desaconselhado pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. No local, vá acompanhado, de dia, e mantenha os seus pertences perto de si.",
    },
    "teintureries-kofar-mata-kano": {
      name: "Tinturarias de Kofar Mata",
      summary: "Fossas de tingimento com índigo em uso há mais de cinco séculos, junto a uma porta das muralhas.",
      description:
        "Junto à porta Kofar Mata das antigas muralhas, dezenas de fossas escavadas no chão servem há mais de cinco séculos, segundo a tradição desde 1498, para tingir tecidos com índigo natural. É um dos mais antigos centros de tingimento ainda ativos da África Ocidental: os tintureiros mergulham os tecidos e depois batem-nos para lhes dar brilho, e é possível comprar peças no local.",
      tips: "Cidade de Kano desaconselhada salvo motivo imperioso, num estado formalmente desaconselhado pela France Diplomatie: consulte os conselhos aos viajantes antes de qualquer projeto. Peça autorização antes de fotografar os tintureiros.",
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
    "ile-ife": {
      name: "إيلي-إيفي",
      region: "ولاية أوسون",
      summary: "مدينة مقدسة، المهد الأسطوري لليوروبا وموطن رؤوس إيفي الشهيرة. منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى.",
      description:
        "بحسب تقاليد اليوروبا، في إيلي-إيفي خُلق العالم وحكم أودودوا، جدّ السلالات اليوروبية، ولا يزال أوني إيفي يقيم فيها. وبين القرنين الثاني عشر والخامس عشر تقريبًا، أبدع فنانوها رؤوسًا من الطين المحروق وسبائك النحاس بواقعية مذهلة، يُعرض بعضها في المتحف الوطني. وهي مدينة جامعية (جامعة أوبافيمي أولوو)، وتحتفل كل عام بمهرجان «أولوجو». تنبيه: تصنّف الخارجية الفرنسية ولاية أوسون منطقةً «لا يُنصح بالسفر إليها إلا لضرورة قصوى». نقدّم هذه الوجهة لقيمتها التراثية، ولا تدخل في أي مسار.",
    },
    "kano": {
      name: "كانو",
      region: "ولاية كانو",
      summary: "مدينة هوسا عريقة: أسوار وقصر الأمير ومصابغ النيلة وأسواق كبرى. منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى.",
      description:
        "كانت كانو، المدينة الكبرى في الشمال، لقرون أحد أهم ملتقيات التجارة العابرة للصحراء، وعاصمة مملكة هوسا ثم إمارة. وتحتفظ مدينتها القديمة، التي نشأت حول تلة دالا وتحيط بها أسوار طينية محفوظ بعضها (مدرجة مع المواقع المرتبطة بها على القائمة التمهيدية لليونسكو)، بقصر الأمير وسوق كورمي ومصابغ كوفار ماتا. تنبيه: تنصح الخارجية الفرنسية بعدم السفر إطلاقًا إلى ولاية كانو، وتصنّف المدينة نفسها منطقةً «لا يُنصح بالسفر إليها إلا لضرورة قصوى»، وتنصح وزارة الخارجية البريطانية بعدم السفر إلى الولاية إلا للضرورة، ويُعد طريق أبوجا-كادونا-كانو شديد الخطورة. نقدّم هذه الوجهة لقيمتها التراثية، ولا تدخل في أي مسار.",
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
        "في كل ديسمبر، يحوّل كرنفال كالابار المدينة إلى احتفال شوارع ضخم: مواكب فرق بأزياء تنكرية، وعربات مزيّنة، ورقص وحفلات موسيقية، ضمن احتفالات تبلغ ذروتها في أواخر ديسمبر بالاستعراض الكبير للفرق. ويجتذب زوارًا من أنحاء البلاد ومن الخارج.",
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
    "kalakuta-museum-lagos": {
      name: "متحف كالاكوتا",
      summary: "آخر منزل لفيلا كوتي في إيكيجا، تحوّل إلى متحف عام 2012.",
      description:
        "في حي إيكيجا، تحوّل المنزل المؤلف من ثلاثة طوابق الذي عاش فيه فيلا أنيكولابو-كوتي حتى وفاته عام 1997 إلى متحف عام 2012 بدعم من ولاية لاغوس. يضم أزياءه المسرحية وأحذيته وأغلفة أسطواناته، وغرفة نومه التي بقيت على حالها، ويقع قبر الموسيقي داخل المجمع. وقد خلف هذا المنزل «جمهورية كالاكوتا» الأولى التي أحرقها الجيش عام 1977.",
      tips: "اجمع الزيارة مع «نيو أفريكا شراين» الواقعة أيضًا في إيكيجا. تقع إيكيجا في الجزء القاري بعيدًا عن الجزر: خصص وقتًا واسعًا لزحمة السير.",
    },
    "new-afrika-shrine-lagos": {
      name: "نيو أفريكا شراين",
      summary: "قاعة حفلات عائلة كوتي في إيكيجا، معبد موسيقى الأفروبيت.",
      description:
        "وريثة «أفريكا شراين» التي أسسها فيلا عام 1970 ودُمّرت عام 1977، و«نيو أفريكا شراين» فضاء عروض واسع مفتوح الجوانب في إيكيجا يديره فيمي كوتي ويني أنيكولابو-كوتي. تغطي الجدران صور فيلا ولوحاته، ويعزف فيها فيمي أو سيون كوتي بانتظام. وهي أيضًا قلب مهرجان «فيلابريشن» في أكتوبر من كل عام.",
      tips: "تبدأ الحفلات متأخرة وتنتهي في ساعات الليل: رتّب الذهاب والعودة مع سائق موثوق. اطّلع على البرنامج قبل المجيء.",
      bestPeriod: "أكتوبر، خلال مهرجان فيلابريشن",
    },
    "tafawa-balewa-square-lagos": {
      name: "ساحة تافاوا باليوا",
      summary: "ساحة احتفالية واسعة في جزيرة لاغوس، على مضمار السباق القديم حيث احتُفل بالاستقلال.",
      description:
        "أُنشئت ساحة تافاوا باليوا عام 1972 على مضمار سباق الخيل القديم في لاغوس، حيث احتُفل عام 1960 باستقلال البلاد وإنزال العلم البريطاني. تمتد هذه الساحة على 14.5 هكتارًا تحيط بها المدرجات، ويميزها مدخلها الذي تعلوه خيول بيضاء ونسور حمراء مستوحاة من شعار الدولة. تستضيف العروض والتجمعات الكبرى ومهرجان «إيو».",
      tips: "تنبض الساحة بالحياة خلال المناسبات؛ وإلا فستراها عابرًا في طريقك إلى المتحف الوطني ومركز جون راندل القريبين.",
    },
    "cathedrale-christ-church-lagos": {
      name: "كاتدرائية المسيح",
      summary: "أقدم كاتدرائية أنجليكانية في نيجيريا، صرح قوطي جديد على المارينا.",
      description:
        "تأسست الكاتدرائية الأنجليكانية على المارينا عام 1869، وتشغل مبنى على الطراز القوطي الجديد بدأ بناؤه عام 1924 واكتمل عام 1946، ببرج ساعته وأبراجه الصغيرة المدببة. وتضم نُصبًا تذكاريًا لصموئيل أجايي كراوثر، العبد اليوروبي السابق الذي أصبح أول أسقف أفريقي في الكنيسة الأنجليكانية، ونُقل رفاته إليها عام 1976.",
      tips: "ارتدِ ملابس محتشمة، وتجنّب أوقات قداس الأحد إلا إذا رغبت في حضوره.",
    },
    "mosquee-centrale-lagos": {
      name: "المسجد المركزي في لاغوس",
      summary: "مسجد كبير بقبة ذهبية وأربع مآذن في قلب جزيرة لاغوس.",
      description:
        "في شارع نامدي أزيكيوي التجاري المزدحم، يُعد المسجد المركزي مسجد الجمعة لكبير أئمة لاغوس. افتُتح المبنى الحالي عام 1988 ليحل محل مسجد شُيّد بين عامي 1908 و1913، وتعلو قبته الذهبية ومآذنه أسطح الجزيرة.",
      tips: "يكتفي غير المسلمين غالبًا بمشاهدته من الخارج: استفسر في المكان قبل الدخول، بملابس ساترة وخارج أوقات الصلاة. الحي شديد الازدحام: أبقِ أغراضك قريبة منك.",
    },
    "centre-john-randle-lagos": {
      name: "مركز جون راندل لثقافة اليوروبا وتاريخها",
      summary: "متحف حديث وتفاعلي مخصص لثقافة اليوروبا في أونيكان.",
      description:
        "أُقيم هذا المركز في موقع قاعة ج. ك. راندل ومسبحها العام الذي افتُتح عام 1928، وكان الأول في البلاد، وجددته ولاية لاغوس، ويعرض ثقافة اليوروبا وتاريخها بوسائل رقمية وتفاعلية. وقد نال مبناه المنحني، من تصميم المعماري سيون أودوولي (استوديو SI.SA)، جائزة معمارية. ويجاور المتحف الوطني وساحة تافاوا باليوا، مشكّلًا معهما حيًّا ثقافيًا صغيرًا.",
      tips: "اجمعه مع زيارة المتحف الوطني على بُعد خطوات: الزيارتان تكمّل إحداهما الأخرى.",
    },
    "theatre-national-lagos": {
      name: "المسرح الوطني (مركز وولي سوينكا)",
      summary: "مركز فنون ضخم في إيغانمو، شُيّد لمهرجان «فيستاك 77».",
      description:
        "اكتمل المسرح الوطني في إيغانمو عام 1976 استعدادًا للمهرجان العالمي الثاني للفنون والثقافة السوداء والأفريقية (فيستاك 77)، وهو رمز المشهد الثقافي النيجيري، ويذكّر شكله بقبعة عسكرية. وأُعيدت تسميته عام 2024 تكريمًا للأديب الحائز جائزة نوبل وولي سوينكا. تستضيف قاعاته وساحاته العروض والأفلام والمعارض.",
      tips: "تحقق من البرنامج قبل الذهاب: يقع المكان في الجزء القاري قرب سوروليري ويُصل إليه بالسيارة.",
    },
    "marche-balogun-lagos": {
      name: "سوق بالوغون",
      summary: "السوق الضخمة في جزيرة لاغوس: أقمشة الشمع والدانتيل والأسو-أوكي والأحذية وغيرها الكثير.",
      description:
        "لا عنوان محددًا لسوق بالوغون لأنها تمتد على شوارع عديدة في جزيرة لاغوس، وهي سوق الأقمشة الكبرى في المدينة: أقمشة الأنكارا (الشمع) والدانتيل والأسو-أوكي المنسوج يدويًا، إلى جانب الأحذية والحقائب وشتى السلع. الأجواء صاخبة والزحام شديد، خاصة قبل الأعياد.",
      tips: "اذهب برفقة شخص يعرف السوق، واحمل القليل من الأشياء الثمينة ونقودًا من فئات صغيرة. فاوض على الأسعار، وتجنّب ساعات الذروة والأيام السابقة للأعياد.",
    },
    "marche-artisanal-lekki": {
      name: "سوق ليكي للحرف اليدوية",
      summary: "سوق الحرف المفضلة لدى المسافرين: منحوتات وأقمشة وخرز وتحف من أنحاء البلاد.",
      description:
        "في حي جاكاندي بليكي، تجمع هذه السوق الحرفيين والتجار وتعرض قطعًا من كل أنحاء نيجيريا وغرب أفريقيا: منحوتات وأقنعة وبرونزيات وأقمشة الأديري والأسو-أوكي وخرز وجلود ولوحات. إنها أنسب مكان في لاغوس لشراء المشغولات اليدوية.",
      tips: "تجوّل قبل الشراء وفاوض على السعر. إذا عُرضت عليك قطعة على أنها أثرية، فاعلم أن تصدير الآثار يتطلب ترخيصًا: اطلب مستندًا يثبت ذلك.",
    },
    "plage-tarkwa-bay-lagos": {
      name: "شاطئ خليج تاركوا",
      summary: "شاطئ محمي قرب مدخل الميناء لا يُصل إليه إلا بالقارب.",
      description:
        "تشكّل خليج تاركوا في حماية حواجز الأمواج التي تحرس مدخل ميناء لاغوس، وهو شاطئ رملي لا يُصل إليه إلا بالتاكسي المائي من فيكتوريا آيلاند أو إيكويي. مياهه أهدأ من مياه المحيط المفتوح، ما يجعله مقصدًا للسباحين وراكبي الأمواج في عطلات نهاية الأسبوع.",
      tips: "اركب القارب من رصيف معروف مع سترات النجاة. استفسر عن حالة البحر ونظافة الشاطئ الذي يتلوث أحيانًا، ولا تسبح إلا حيث تكون المياه هادئة.",
    },
    "quartier-bresilien-lagos": {
      name: "الحي البرازيلي (بوبو أغودا)",
      summary: "حي «الأغوداس»، العبيد المحررين العائدين من البرازيل وكوبا في القرن التاسع عشر.",
      description:
        "حول ساحة كامبوس وشوارع توكونبو وبامغبوسي وكاكاوا، شيّد الأفرو-برازيليون والأفرو-كوبيون المحررون العائدون إلى غرب أفريقيا، المعروفون بالأغوداس، حي بوبو أغودا في القرن التاسع عشر. وجلبوا معهم عمارة بواجهات مزخرفة بقيت منها بعض الشواهد، مثل «بيت الماء». فصل غير معروف كثيرًا من تاريخ لاغوس، يُستكشف برفقة دليل محلي.",
      tips: "كثير من البيوت ملكيات خاصة أو متداعية: شاهدها من الخارج واستأذن قبل التصوير. اذهب نهارًا وبرفقة أحد.",
    },
    "iga-idunganran-lagos": {
      name: "إيغا إيدونغانران، قصر أوبا لاغوس",
      summary: "المقر الرسمي لأوبا لاغوس في حي إيسالي إيكو القديم.",
      description:
        "يُعد قصر إيغا إيدونغانران في جزيرة لاغوس المقر الرسمي لأوبا لاغوس، ويعود إلى مبنى أول شُيّد عام 1670 للأوبا غابارو، ثم وُسّع وجُدّد مرات عدة، وافتُتح جزؤه الحديث في الأول من أكتوبر 1960. ويشير اسمه إلى حقل الفلفل الذي كان يشغل الموقع قديمًا. وكان القصر مركزًا إداريًا وسوقًا، ويرتبط بمهرجان «إيو».",
      tips: "إنه مقر ملكي مأهول: الزيارة غير مضمونة وتتطلب إذنًا. التزم الاحترام واستأذن قبل أي تصوير.",
    },
    "vie-nocturne-lagos": {
      name: "الحياة الليلية في فيكتوريا آيلاند وإيكويي وليكي",
      summary: "مطاعم وحانات ونوادٍ وحفلات: لاغوس تحيا ليلًا، خاصة في ديسمبر.",
      description:
        "تتمتع لاغوس بواحدة من أكثر الحياة الليلية صخبًا في أفريقيا. تتركز المطاعم والصالات والحانات على الأسطح والنوادي وقاعات الحفلات في فيكتوريا آيلاند وإيكويي وليكي، بينما لإيكيجا في الجزء القاري أماكنها الخاصة، ومنها «نيو أفريكا شراين». تبدأ السهرات متأخرة، ويشهد موسم ديسمبر المعروف بـ«ديتي ديسمبر» سلسلة من الحفلات والسهرات.",
      tips: "لا تتجول سيرًا على الأقدام ليلًا أبدًا: احجز سائقًا موثوقًا للذهاب والعودة. احمل الحد الأدنى، وراقب مشروبك، واسأل مكان إقامتك عن الأماكن الرائجة.",
      bestPeriod: "طوال العام، وخاصة في ديسمبر",
    },
    "suya-lagos": {
      name: "السويا وأطعمة الشارع",
      summary: "شرائح لحم بقري متبلة مشوية على الجمر، نجمة السهرات النيجيرية.",
      description:
        "السويا طبق قادم من شمال الهوسا: لحم، غالبًا بقري، يُقطّع شرائح رقيقة ويُغطّى بخليط توابل أساسه الفول السوداني (ياجي)، ثم يُشوى على الجمر ويُقدّم مع البصل النيء والطماطم. يُشترى مساءً من باعة الشواء في الشوارع في أنحاء البلاد. وتُتذوق لاغوس أيضًا عبر أرز الجولوف وحساء الفلفل وفطائر الأكارا وموز الجنة المقلي (دودو).",
      tips: "اختر بائعًا مزدحمًا ولحمًا يُشوى أمامك. توابل الياجي حارة جدًا: اطلب كمية أقل إن لزم.",
    },
    "musee-mobee-badagry": {
      name: "متحف موبي لآثار العبودية",
      summary: "متحف عائلي صغير يعرض السلاسل والقيود وأدوات تجارة الرقيق.",
      description:
        "يديره أحفاد عائلة من الزعماء التقليديين في باداغري، ويعرض هذا المتحف الخاص آثارًا من تجارة الرقيق: أصفادًا وقيودًا كان بعضها يربط ساقي أسيرين معًا، ومكواة وسم من أواخر القرن الثامن عشر كانت ملكًا لتاجر الرقيق سونبو موبي المدفون في المكان. ويُعرض في الخارج مدفعان من القرن الثامن عشر. زيارة قصيرة لكنها مؤثرة.",
      tips: "يقدّم أفراد العائلة الشروح: خصص وقتًا للاستماع إليهم.",
    },
    "marche-esclaves-vlekete-badagry": {
      name: "سوق فليكيتي للعبيد",
      summary: "سوق قديمة لتجارة الرقيق تحمل اسم الإلهة فليكيتي، صارت مكانًا للذاكرة.",
      description:
        "بحسب الرواية التقليدية أُنشئت هذه السوق في باداغري عام 1502 وسُميت باسم الإلهة فليكيتي، وكانت من الأماكن التي باع فيها وسطاء أفارقة الأسرى لتجار الرقيق الأوروبيين. ويذكّر الموقع، الذي يضم متحفًا صغيرًا وتماثيل تذكارية، بدور الميناء في تجارة الرقيق عبر الأطلسي.",
      tips: "زره مع دليل من باداغري يربطه بمتحف التراث ومتحف موبي ونقطة اللاعودة.",
    },
    "centenary-hall-abeokuta": {
      name: "قاعة المئوية",
      summary: "مبنى استعماري من عام 1930 قرب قصر الألاكي في حي أكي.",
      description:
        "افتُتحت قاعة المئوية عام 1930 احتفاءً بمرور مئة عام على استقرار شعب الإغبا في أبيوكوتا، وتقع في حي أكي قرب قصر الألاكي، ملك الإغبا. وبأقواسها وواجهتها الفاتحة تُعد من أبرز المعالم التاريخية في المدينة.",
      tips: "يُستكشف حي أكي وقصر الألاكي برفقة دليل محلي نهارًا.",
    },
    "bibliotheque-obasanjo-abeokuta": {
      name: "مكتبة أولوسيغون أوباسانجو الرئاسية",
      summary: "أرشيف وقاعات عرض مخصصة لرئيس سابق في حي أوكي موسان.",
      description:
        "على غرار المكتبات الرئاسية الأمريكية، تحفظ هذه المؤسسة في حي أوكي موسان وثائق الرئيس السابق أولوسيغون أوباسانجو، ابن المنطقة، ومقتنياته، وتروي من خلالها تاريخ نيجيريا السياسي الحديث. ويستضيف المجمع الواسع أيضًا معارض وفعاليات.",
      tips: "استفسر مسبقًا عن الأقسام المفتوحة للزوار.",
    },
    "mapo-hall-ibadan": {
      name: "قاعة مابو",
      summary: "مبنى بلدية على الطراز الكلاسيكي الجديد من عشرينيات القرن الماضي، فوق تلة مابو.",
      description:
        "شُيّدت قاعة مابو، مقر بلدية إبادان، بين عامي 1925 و1929 في عهد الإدارة الاستعمارية، وتتوّج تلة مابو برواق أعمدتها الكلاسيكي الجديد. تُرى من أنحاء كثيرة من المدينة، وتتيح بدورها إطلالة واسعة على المدينة القديمة وأسطحها الصفيحية الصدئة.",
      tips: "حي مابو مزدحم وصاخب: تعال مع سائق ودليل محلي.",
    },
    "universite-ibadan": {
      name: "جامعة إبادان",
      summary: "أقدم جامعة في البلاد، تأسست عام 1948، في حرم واسع تكسوه الأشجار.",
      description:
        "تأسست جامعة إبادان عام 1948 كلية جامعية تابعة لجامعة لندن، واستقلت عام 1962، وهي أقدم مؤسسة جامعية في نيجيريا؛ درس فيها وولي سوينكا وكثير من الشخصيات الوطنية. ويصلح حرمها الأخضر الواسع، بمكتبة كينيث دايك، للتنزه.",
      tips: "قد يخضع الدخول إلى الحرم للتفتيش: احمل وثيقة هوية والتزم بقواعد الجامعة.",
    },
    "aso-rock-abuja": {
      name: "صخرة آسو",
      summary: "كتلة غرانيتية يبلغ ارتفاعها 936 مترًا، رمز العاصمة.",
      description:
        "ترتفع صخرة آسو إلى 936 مترًا، أي نحو 400 متر فوق ما يحيط بها، وهي رمز أبوجا. وعند سفحها تقع الرئاسة (فيلا صخرة آسو) والجمعية الوطنية والمحكمة العليا. يُستمتع بمنظرها من بعيد، من حديقة الألفية أو الشوارع الكبرى، ولا سيما عند الغروب.",
      tips: "تقع الصخرة في منطقة رسمية شديدة الحراسة: يُمنع تسلقها وتصوير المباني الرسمية وقوات الأمن.",
    },
    "fontaine-unite-abuja": {
      name: "نافورة الوحدة",
      summary: "نافورة ضخمة تحمل أسماء ولايات الاتحاد.",
      description:
        "في حي مايتاما، تجمع نافورة الوحدة بين الأحواض والأعمدة وجدار نُقشت عليه أسماء ولايات نيجيريا، رمزًا لوحدة الاتحاد. ويُعد المكان أيضًا نقطة تجمّع وإحياء للذكرى لسكان العاصمة.",
      tips: "تُنظَّم فيه التجمعات بانتظام: ابتعد عنه أثناء المظاهرات.",
    },
    "marche-wuse-abuja": {
      name: "سوق ووسي",
      summary: "السوق الكبرى في العاصمة: منتجات طازجة وسمك مدخن وتوابل وأقمشة.",
      description:
        "سوق ووسي هي السوق الرئيسية في أبوجا، تتجاور فيها الفواكه والخضار والأسماك المدخنة والتوابل والأقمشة ومنتجات جميع مناطق البلاد. غوص في الحياة اليومية للعاصمة.",
      tips: "اذهب برفقة أحد نهارًا وأبقِ أغراضك قريبة منك. فاوض على الأسعار بابتسامة.",
    },
    "maison-susanne-wenger-osogbo": {
      name: "منزل سوزان فينغر",
      summary: "منزل الفنانة والكاهنة أدوني أوليريشا المكسو بالمنحوتات.",
      description:
        "في قلب أوسوغبو، يكسو منزلَ الفنانة النمساوية سوزان فينغر (1915-2009)، التي صارت كاهنة يوروبية باسم أدوني أوليريشا، كثيرٌ من المنحوتات والزخارف. وقد عملت مع فناني حركة «الفن المقدس الجديد» على حماية غابة أوسون المقدسة التي أُعلنت معلمًا وطنيًا عام 1965 ثم أُدرجت في التراث العالمي.",
      tips: "منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى بحسب الخارجية الفرنسية: راجع نصائح السفر قبل أي مشروع. لا يزال المنزل مسكونًا: استفسر عن شروط الزيارة.",
    },
    "palais-oba-benin-city": {
      name: "القصر الملكي لأوبا بنين",
      summary: "مقر أوبا بنين، أُعيد بناؤه بعد الحملة البريطانية عام 1897.",
      description:
        "كان القصر الأصلي، الذي أسسه بحسب الرواية التقليدية الأوبا إيويدو في القرن الثالث عشر، يقع في قلب مدينة بنين القديمة ويضم البرونزيات الشهيرة. دُمّر عام 1897 خلال الحملة البريطانية، ثم أُعيد بناؤه في عهد الأوبا إيويكا الثاني (1914-1932). ولا يزال مقر الأوبا ومركز الحياة الاحتفالية للمملكة، ولا سيما خلال مهرجان «إيغوي» في ديسمبر.",
      tips: "منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى بحسب الخارجية الفرنسية: راجع نصائح السفر قبل أي مشروع. مقر ملكي مأهول: الزيارة بإذن فقط، مع ملابس محتشمة، والتصوير حيث يُسمح به فقط.",
    },
    "musee-histoire-esclavage-calabar": {
      name: "متحف تاريخ العبودية",
      summary: "متحف لتجارة الرقيق في مارينا ريزورت، على موقع مستودع قديم للعبيد.",
      description:
        "افتُتح هذا المتحف عام 2011 على الواجهة المائية في مارينا ريزورت، في موقع مستودع قديم لتجارة الرقيق، وتديره الهيئة الوطنية للمتاحف والآثار. ويروي تاريخ ميناء بيع منه نحو 200 ألف أفريقي عبيدًا بين عامي 1662 و1863، متناولًا أسواق العبيد في الداخل والسلاسل والقيود ومسارات الضحايا والتجار على السواء.",
      tips: "منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى بحسب الخارجية الفرنسية: راجع نصائح السفر قبل أي مشروع.",
    },
    "musee-national-ife": {
      name: "متحف إيفي الوطني",
      summary: "متحف آثار إيفي: رؤوس من الطين المحروق والبرونز ومنحوتات حجرية.",
      description:
        "افتُتح متحف إيفي الوطني عام 1954 في مبنى دائري يعود إلى عام 1948 قرب قصر الأوني، ويعرض مكتشفات المدينة القديمة الأثرية: رؤوسًا وتماثيل من الطين المحروق، وقطعًا من سبائك النحاس، ومنحوتات حجرية، إضافة إلى قطع إثنوغرافية. وقد استُعيدت عدة رؤوس سُرقت في مطلع التسعينيات من فرنسا وأُعيدت عام 1996.",
      tips: "منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى بحسب الخارجية الفرنسية: راجع نصائح السفر قبل أي مشروع.",
    },
    "palais-ooni-ile-ife": {
      name: "قصر أوني إيفي",
      summary: "مقر الأوني، أحد أرفع الملوك التقليديين لدى اليوروبا مكانة.",
      description:
        "يحتل أوني إيفي، الذي يُعد سليل أودودوا، مكانة خاصة بين ملوك اليوروبا، ويحكم الملك الحالي أوبا أدييي إينيتان أوغونويسي (أوجاجا الثاني) منذ عام 2015. ويقع القصر في وسط المدينة، وهو قلب الاحتفالات الكبرى مثل «أولوجو»، حين يظهر الأوني متوّجًا بتاج «آري» ويسير في موكب إلى مزار أوكي موغون.",
      tips: "منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى بحسب الخارجية الفرنسية: راجع نصائح السفر قبل أي مشروع. مقر ملكي مأهول: الزيارة بإذن فقط، والتصوير حيث يُسمح به فقط.",
    },
    "opa-oranmiyan-ile-ife": {
      name: "عصا أورانمييان (أوبا أورانمييان)",
      summary: "مسلة غرانيتية بارتفاع 5.5 متر ترتبط بالبطل المؤسس أورانمييان.",
      description:
        "في بستان مقدس بحي موبا، تُعد هذه المسلة التي يبلغ ارتفاعها نحو 5.5 متر، بحسب التقاليد، عصا الأمير أورانمييان، المؤسس الأسطوري لمملكتي أويو وبنين. حطّمت عاصفة قمتها عام 1884 وأُعيد نصبها مرات عدة، وتشير اختبارات الكربون المشع إلى أنها أقدم بكثير من السلالة التي تُنسب إليها.",
      tips: "منطقة لا يُنصح بالسفر إليها إلا لضرورة قصوى بحسب الخارجية الفرنسية: راجع نصائح السفر قبل أي مشروع. الموقع مقدس: اتبع إرشادات حرّاسه.",
    },
    "gidan-makama-kano": {
      name: "متحف غيدان ماكاما",
      summary: "متحف كانو في مبنى من القرن الخامس عشر بجدران طينية مزخرفة.",
      description:
        "شُيّد هذا المبنى في القرن الخامس عشر لمحمد رومفا حين كان يحمل لقب «ماكاما» قبل أن يصبح ملك كانو، وجدرانه الطينية مزينة بزخارف بارزة، وهو مصنف معلمًا وطنيًا. ويضم متحف كانو الذي تعرض قاعاته أسوار المدينة وخرائطها وتاريخ الولاية والقرن التاسع عشر والاقتصاد والحرف والموسيقى.",
      tips: "لا يُنصح بالسفر إلى مدينة كانو إلا لضرورة قصوى، وهي في ولاية تنصح الخارجية الفرنسية بعدم السفر إليها إطلاقًا: راجع نصائح السفر قبل أي مشروع.",
    },
    "palais-emir-kano": {
      name: "قصر الأمير (غيدان رومفا)",
      summary: "قصر من أواخر القرن الخامس عشر، لا يزال مقر السلطة التقليدية في كانو.",
      description:
        "شيّد محمد رومفا قصر غيدان رومفا في أواخر القرن الخامس عشر، وظل منذ ذلك الحين مقر السلطة التقليدية في كانو، حتى بعد استيلاء المجاهدين الفولانيين على الحكم في مطلع القرن التاسع عشر. وتضم مساحته البالغة نحو 13 هكتارًا داخل أسوار عالية باحات وحدائق ومسجدًا ومباني مزخرفة، ومدخله المهيب البوابة الجنوبية «كوفار كودو». ومنه ينطلق فرسان «دوربار السلّة» وإليه يعودون.",
      tips: "لا يُنصح بالسفر إلى مدينة كانو إلا لضرورة قصوى، وهي في ولاية تنصح الخارجية الفرنسية بعدم السفر إليها إطلاقًا: راجع نصائح السفر قبل أي مشروع. مقر مأهول يُشاهد غالبًا من الخارج. خلافة الإمارة موضع نزاع أمام القضاء: تجنّب أي تجمعات.",
    },
    "marche-kurmi-kano": {
      name: "سوق كورمي",
      summary: "سوق كبرى أسسها الملك محمد رومفا في القرن الخامس عشر.",
      description:
        "أسس الملك محمد رومفا سوق كورمي في القرن الخامس عشر في حي جاكارا لاستقبال التجارة الإقليمية والعابرة للصحراء، فصنعت ثروة كانو. وتعرض ممراتها، المنظمة بحسب التخصص، الأقمشة والقرع والجلود والأعشاب الطبية والبخور والمشغولات اليدوية.",
      tips: "لا يُنصح بالسفر إلى مدينة كانو إلا لضرورة قصوى، وهي في ولاية تنصح الخارجية الفرنسية بعدم السفر إليها إطلاقًا: راجع نصائح السفر قبل أي مشروع. في المكان، اذهب برفقة أحد نهارًا وأبقِ أغراضك قريبة منك.",
    },
    "teintureries-kofar-mata-kano": {
      name: "مصابغ كوفار ماتا",
      summary: "أحواض صباغة بالنيلة قيد الاستعمال منذ أكثر من خمسة قرون قرب إحدى بوابات السور.",
      description:
        "قرب بوابة كوفار ماتا في الأسوار القديمة، تُستخدم عشرات الحفر المحفورة في الأرض منذ أكثر من خمسة قرون، ومنذ عام 1498 بحسب التقاليد، لصباغة الأقمشة بالنيلة الطبيعية. وهي من أقدم مراكز الصباغة التي لا تزال تعمل في غرب أفريقيا: يغمس الصباغون الأقمشة ثم يضربونها لإكسابها لمعانها، ويمكن شراء القطع في المكان.",
      tips: "لا يُنصح بالسفر إلى مدينة كانو إلا لضرورة قصوى، وهي في ولاية تنصح الخارجية الفرنسية بعدم السفر إليها إطلاقًا: راجع نصائح السفر قبل أي مشروع. استأذن قبل تصوير الصبّاغين.",
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
