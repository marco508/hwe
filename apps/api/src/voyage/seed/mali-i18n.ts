/**
 * Traductions du contenu de départ du guide Mali (voir ./mali.ts) en
 * espagnol (es), portugais d'Europe (pt) et arabe standard moderne (ar).
 * Clés = slugs de mali.ts. Pas de circuit (pays formellement déconseillé),
 * donc pas de notes d'étapes. Contenu non relu : à vérifier comme le reste du seed.
 */

import type { SeedI18n, SeedLang } from "./types";

const AV_ES =
  "Viaje formalmente desaconsejado en la actualidad (France Diplomatie, FCDO): lugar presentado para preparar un viaje futuro, cuando las condiciones lo permitan.";
const AV_PT =
  "Viagem formalmente desaconselhada atualmente (France Diplomatie, FCDO): local apresentado para preparar uma viagem futura, quando as condições o permitirem.";
const AV_AR =
  "السفر غير مُستحسن إطلاقًا في الوقت الحالي (وزارة الخارجية الفرنسية، ووزارة الخارجية البريطانية): يُقدَّم هذا المكان للتحضير لرحلة مستقبلية، حين تسمح الظروف بذلك.";

const ES: SeedI18n = {
  guide: {
    intro:
      "En la actualidad, las autoridades francesas y británicas desaconsejan formalmente cualquier viaje a Malí: esta guía presenta su patrimonio para preparar una estancia cuando las condiciones lo permitan. Heredero de los imperios de Ghana, Malí y songhai, el país del río Níger es uno de los más ricos de África Occidental: la arquitectura de tierra de Djenné y Tombuctú, el acantilado de Bandiagara y el país dogón, la tumba de los Askia en Gao y una escena musical que ha dado la vuelta al mundo desde Bamako.",
    sections: [
      {
        title: "Requisitos de entrada",
        body: "La mayoría de los viajeros no africanos necesita un visado. Malí abandonó la CEDEAO en 2025 y forma con Burkina Faso y Níger la Alianza de Estados del Sahel (AES): las normas de entrada pueden haber cambiado y pueden volver a cambiar. Compruebe siempre los requisitos actualizados en la embajada de Malí y en las fuentes oficiales de su país antes de cualquier proyecto: pasaporte válido varios meses después del regreso, billete de vuelta, dirección del alojamiento.",
      },
      {
        title: "Salud",
        body: "Se exige el certificado de vacunación contra la fiebre amarilla a la entrada. El paludismo está presente en todo el país, sobre todo durante y después de la estación de lluvias: consulte a un médico o a un centro de vacunación internacional sobre un tratamiento preventivo y protéjase de los mosquitos. El país se sitúa en el «cinturón de la meningitis»: infórmese sobre la vacunación. Beba agua embotellada y protéjase bien del calor. Fuera de Bamako, la oferta sanitaria es muy limitada.",
      },
      {
        title: "Moneda y pagos",
        body: "La moneda es el franco CFA (XOF), con paridad fija con el euro (1 € = 655,957 francos CFA). El efectivo es imprescindible; las tarjetas bancarias solo se aceptan en algunos grandes hoteles y comercios de Bamako, y los cajeros automáticos escasean en el resto del país. El pago por móvil (mobile money) está muy extendido.",
      },
      {
        title: "Cuándo ir",
        body: "La mejor época va de noviembre a febrero: estación seca y temperaturas más soportables, con el harmattan (viento seco y polvoriento). De marzo a mayo el calor se vuelve agobiante, a menudo por encima de 40 °C. La estación de lluvias va aproximadamente de junio a septiembre, más larga y más lluviosa en el sur; es también la época de la crecida del Níger, que inunda el delta interior hasta el comienzo de la estación seca.",
      },
      {
        title: "Idiomas y costumbres",
        body: "La Constitución de 2023 convirtió las lenguas nacionales (bambara, fula, soninké, songhai, tamasheq y las lenguas dogón, entre otras) en las lenguas oficiales del país; el francés es ahora lengua de trabajo y sigue muy presente en la administración y en las ciudades. El bambara (bamanankan) sirve de lengua común en gran parte del país. Los saludos, largos y codificados, son esenciales antes de cualquier petición. Malí es mayoritariamente musulmán: ropa que cubra, discreción durante las oraciones y el ramadán. Pida siempre permiso antes de fotografiar a una persona, una ceremonia o un lugar sagrado.",
      },
      {
        title: "Desplazarse",
        body: "Tradicionalmente, entre ciudades se viajaba en autobús y taxi-brousse, y por el Níger en pinasse (barca fluvial) o en barco durante las aguas altas. Hoy, según las autoridades británicas, las grandes carreteras sufren ataques y bloqueos, sobre todo contra los convoyes de combustible, y viajar por carretera es muy peligroso. Por eso esta guía no propone ningún itinerario: infórmese en las fuentes oficiales antes de cualquier proyecto.",
      },
      {
        title: "Electricidad y teléfono",
        body: "Corriente de 220 V, enchufes de tipo C y E (enchufes europeos). Los cortes de electricidad son frecuentes, incluso en Bamako. Una tarjeta SIM local (se pide documento de identidad) da acceso a internet móvil y al mobile money; la cobertura es desigual fuera de las ciudades.",
      },
      {
        title: "Seguridad",
        body: "La situación de seguridad es muy grave. A la fecha de redacción (octubre de 2026), France Diplomatie desaconseja formalmente viajar a Malí, sea cual sea el motivo, y recomienda a los franceses presentes salir temporalmente del país en los vuelos comerciales aún disponibles. El FCDO británico desaconseja todo viaje a la totalidad del país: señala una amenaza terrorista elevada, un riesgo elevado de secuestro, también en Bamako, y bloqueos de carreteras por grupos armados. La asistencia consular es muy limitada. Consulte los consejos de viaje de France Diplomatie, los del FCDO (gov.uk) o los de su país antes de cualquier proyecto: esta es una guía de patrimonio, para usar cuando esas fuentes dejen de desaconsejar el viaje.",
      },
    ],
  },
  destinations: {
    bamako: {
      region: "Distrito de Bamako",
      summary: "Capital a orillas del Níger, ciudad de música, mercados y del Museo Nacional.",
      description:
        "Extendida a ambas orillas del Níger, Bamako es la capital y, con diferencia, la ciudad más grande del país. Es famosa por su escena musical, cuna de numerosos artistas conocidos en todo el mundo, por sus mercados rebosantes y por su Museo Nacional, uno de los más bellos de África Occidental. La ciudad acoge también los Rencontres de Bamako, bienal dedicada a la fotografía africana. Como el resto del país, actualmente se desaconseja formalmente a los viajeros.",
    },
    segou: {
      summary: "Antigua capital del reino bambara, a orillas del Níger.",
      description:
        "A orillas del Níger, Ségou fue en el siglo XVIII la capital del reino bambara fundado por Biton Coulibaly. La ciudad conserva animados muelles, edificios de la época colonial y una tradición artesanal viva, del bogolan a la alfarería. Desde mediados de los años 2000 acoge el Festival sobre el Níger, una de las grandes citas culturales del país. Actualmente, como el resto de Malí, se desaconseja formalmente a los viajeros.",
    },
    djenne: {
      summary: "Ciudad de tierra declarada Patrimonio de la UNESCO, dominada por la mezquita de adobe más famosa del mundo.",
      description:
        "En una isla del delta interior del Níger, Djenné es una de las ciudades más antiguas del África subsahariana. Sus casas de banco (adobe), su Gran Mezquita y el yacimiento arqueológico vecino de Djenné-Djeno forman las «Ciudades antiguas de Djenné», inscritas en el Patrimonio Mundial de la UNESCO en 1988 y en la lista del patrimonio en peligro desde 2016. Cada año, el revoque colectivo de la mezquita y el gran mercado del lunes marcan el ritmo de la ciudad. Región formalmente desaconsejada en la actualidad.",
    },
    "pays-dogon": {
      name: "Acantilado de Bandiagara (país dogón)",
      summary: "Un acantilado de arenisca de más de 150 km, aldeas dogón y graneros aferrados a la roca.",
      description:
        "A lo largo del acantilado de Bandiagara, los dogón construyeron aldeas de tierra y piedra al pie y en la ladera del escarpe, bajo las antiguas viviendas trogloditas atribuidas a los tellem. Paisajes grandiosos, arquitectura, máscaras y cosmogonía hacen del «Acantilado de Bandiagara (país dogón)» un bien mixto, cultural y natural, inscrito en el Patrimonio Mundial de la UNESCO en 1989 y en la lista del patrimonio en peligro en 2023. La región sufre violencia armada y está formalmente desaconsejada.",
    },
    tombouctou: {
      name: "Tombuctú",
      region: "Tombuctú",
      summary: "Ciudad legendaria a las puertas del Sáhara, con sus mezquitas de tierra y sus manuscritos.",
      description:
        "Fundada al borde del Sáhara, cerca del río Níger, Tombuctú se convirtió en los siglos XV y XVI en una gran encrucijada del comercio transahariano y en un foco intelectual del islam. Sus tres grandes mezquitas, Djingareyber, Sankoré y Sidi Yahia, y sus mausoleos de santos están inscritos en el Patrimonio Mundial de la UNESCO desde 1988 y en la lista del patrimonio en peligro. En 2012, grupos armados destruyeron varios mausoleos; fueron reconstruidos por albañiles locales con el apoyo de la UNESCO. Zona formalmente desaconsejada.",
    },
    gao: {
      summary: "Antigua capital del Imperio songhai, en el recodo del Níger.",
      description:
        "En la orilla izquierda del Níger, Gao fue la capital del Imperio songhai, que dominó gran parte de África Occidental en los siglos XV y XVI. Conserva la tumba de los Askia, pirámide de tierra inscrita en el Patrimonio Mundial de la UNESCO en 2004 y en la lista del patrimonio en peligro desde 2012. Frente a la ciudad, la duna rosa se refleja en el río. Zona formalmente desaconsejada.",
    },
    mopti: {
      region: "Mopti",
      summary: "La «Venecia de Malí», puerto fluvial en la confluencia del Níger y el Bani.",
      description:
        "Construida en la orilla derecha del Bani, muy cerca de su confluencia con el Níger, Mopti recibe el apodo de «Venecia de Malí»: durante la crecida, aproximadamente de agosto a diciembre, la ciudad se convierte en un conjunto de islotes unidos por diques. Simple aldea de pescadores bozo convertida en gran encrucijada comercial en la época colonial, reúne a bozo, peul, bambara, dogón y songhai en torno a su puerto, sus astilleros de piraguas y su gran mezquita de banco. Era la puerta de entrada a Djenné y al país dogón. Región formalmente desaconsejada en la actualidad.",
    },
    kayes: {
      region: "Kayes",
      summary: "Antigua capital colonial a orillas del río Senegal, puerta del fuerte de Médine y de las cataratas.",
      description:
        "En el oeste del país, a orillas del río Senegal, Kayes fue a finales del siglo XIX la capital de la colonia del Sudán francés, antes del traslado de la capital a Bamako a principios del siglo XX. Es el punto de partida hacia el fuerte de Médine, testigo de los inicios de la colonización, y hacia las cataratas de Félou y Gouina, donde el río salva umbrales rocosos. Como el resto del país, la región está formalmente desaconsejada en la actualidad.",
    },
    sikasso: {
      region: "Sikasso",
      summary: "Capital del reino de Kénédougou, en el corazón del sur verde.",
      description:
        "En el sur del país, más lluvioso y más verde, Sikasso fue la capital del reino de Kénédougou. Sus reyes Tiéba y luego Babemba Traoré la rodearon de una poderosa muralla, el tata, que resistió el asedio de Samory Touré antes de la toma de la ciudad por las tropas coloniales francesas en 1898. Hoy una de las ciudades más pobladas del país, es también un gran mercado agrícola de frutas y verduras. Como el resto del país, la región está formalmente desaconsejada en la actualidad.",
    },
    hombori: {
      region: "Douentza",
      summary: "Mesetas y agujas de arenisca sobre la llanura del Gourma, con el punto más alto de Malí.",
      description:
        "En la carretera entre Mopti y Gao, el pueblo de Hombori, de casas de piedra y callejuelas estrechas, está dominado por los montes Hombori, prolongación del acantilado de Bandiagara. El Hombori Tondo alcanza allí unos 1155 metros, el punto más alto del país, y relieves cercanos como la Mano de Fátima o las agujas de Gami atraían a escaladores. La región del Gourma alberga además elefantes, de los últimos del Sahel. Zona formalmente desaconsejada en la actualidad.",
    },
  },
  places: {
    "musee-national-du-mali": {
      name: "Museo Nacional de Malí",
      summary: "Gran museo dedicado a la arqueología, los tejidos y las máscaras del país.",
      description:
        "Instalado en un edificio de inspiración sudanesa, el Museo Nacional de Malí presenta las grandes colecciones del país: objetos arqueológicos (entre ellos terracotas de la región de Djenné), tejidos como el bogolan, máscaras y estatuaria de los distintos pueblos, objetos rituales. Sus exposiciones temporales y su jardín lo convierten en uno de los principales espacios culturales de Bamako.",
      tips: `${AV_ES} El museo es vecino del parque nacional de Bamako: ambos se visitan juntos.`,
    },
    "parc-national-bamako": {
      name: "Parque Nacional de Malí",
      summary: "Gran parque urbano acondicionado en las colinas, con senderos y jardines.",
      description:
        "Al pie de las colinas que dominan la ciudad, junto al Museo Nacional, este parque urbano acondicionado a finales de los años 2000 ofrece senderos con sombra, jardines de plantas locales y zonas de descanso. Un pulmón verde muy apreciado por los habitantes de Bamako.",
      tips: `${AV_ES} Lleve agua y venga temprano por la mañana, cuando hace más fresco.`,
    },
    "grand-marche-bamako": {
      name: "Gran Mercado de Bamako",
      summary: "El corazón comercial de la ciudad, en torno al edificio del «mercado rosa».",
      description:
        "En el centro, el gran mercado y sus calles vecinas forman un inmenso barrio comercial: telas y bazin, bogolan, especias, joyas, cuero, objetos cotidianos. El edificio de estilo neosudanés apodado «mercado rosa» es su punto de referencia. Una inmersión en la actividad de la capital.",
      tips: `${AV_ES} En los mercados, mantenga sus pertenencias cerca y pida permiso antes de hacer fotos.`,
    },
    "grande-mosquee-bamako": {
      name: "Gran Mezquita de Bamako",
      summary: "Mezquita de dos grandes minaretes, referencia del centro de la ciudad.",
      description:
        "Construida en la segunda mitad del siglo XX, la Gran Mezquita de Bamako domina el centro con sus minaretes, cerca del gran mercado. Es uno de los principales lugares de oración de la capital, muy concurrido los viernes. Se visita desde el exterior.",
      tips: `${AV_ES} Ropa que cubra; no visitar durante las oraciones.`,
    },
    "festival-sur-le-niger-segou": {
      name: "Festival sobre el Níger",
      summary: "Música, artes y cultura a orillas del río, generalmente en febrero.",
      description:
        "Creado a mediados de los años 2000, el Festival sobre el Níger reúne cada año en las orillas de Ségou a músicos malienses y africanos, exposiciones de arte, marionetas y encuentros en torno a las culturas del río. Se ha convertido en uno de los eventos culturales emblemáticos del país.",
      tips: `${AV_ES} Las fechas, e incluso la celebración del festival, dependen del contexto: consulte los anuncios oficiales de los organizadores.`,
      bestPeriod: "Generalmente en febrero",
    },
    "segou-koro": {
      summary: "Aldea histórica de Biton Coulibaly, con sus mezquitas de tierra.",
      description:
        "A pocos kilómetros de Ségou, a orillas del río, Ségou-Koro («el viejo Ségou») es la cuna del reino bambara. La aldea conserva mezquitas de banco y el lugar de memoria de Biton Coulibaly, fundador del reino. Una visita que se hace con un guía local y respetando las costumbres de la aldea.",
      tips: `${AV_ES} Salude al jefe de la aldea o a sus representantes antes de la visita, como manda la costumbre.`,
    },
    "poteries-de-kalabougou": {
      name: "Alfareras de Kalabougou",
      summary: "Aldea de alfareras en la otra orilla del Níger, frente a Ségou.",
      description:
        "En la orilla opuesta del Níger, la aldea de Kalabougou es famosa por sus alfareras, que modelan a mano tinajas y cántaros y los cuecen al aire libre, según técnicas transmitidas de generación en generación. Un encuentro con un saber ancestral.",
      tips: `${AV_ES} Pida siempre permiso antes de fotografiar; comprar una pieza es la mejor manera de apoyar a las artesanas.`,
    },
    "grande-mosquee-djenne": {
      name: "Gran Mezquita de Djenné",
      summary: "Obra maestra de la arquitectura sudano-saheliana, el mayor edificio de adobe del mundo.",
      description:
        "Reconstruida en 1907 en el emplazamiento de una mezquita mucho más antigua, la Gran Mezquita de Djenné es el emblema de Malí. Sus muros de banco erizados de vigas de madera (los toron), sus tres torres de fachada y sus contrafuertes la convierten en el símbolo de la arquitectura sudano-saheliana. Domina la plaza del mercado. El interior está reservado a los fieles musulmanes.",
      tips: `${AV_ES} Edificio religioso: obsérvelo desde la plaza y respete los horarios de oración.`,
    },
    "crepissage-mosquee-djenne": {
      name: "Revoque de la Gran Mezquita",
      summary: "Cada año, toda la ciudad se moviliza para cubrir la mezquita con un nuevo enlucido.",
      description:
        "Las lluvias dañan los muros de tierra: cada año, antes de la estación de lluvias, los habitantes de Djenné preparan una mezcla de banco y se turnan en una gran fiesta colectiva para revocar la mezquita. Los barrios compiten en entusiasmo al son de los tambores. Una tradición viva que asegura la supervivencia del monumento.",
      tips: `${AV_ES} La fecha se fija localmente cada año.`,
      bestPeriod: "Una vez al año, antes de la estación de lluvias (fecha fijada localmente)",
    },
    "marche-du-lundi-djenne": {
      name: "Mercado del lunes",
      summary: "Gran mercado semanal al pie de la mezquita, que atrae a toda la región.",
      description:
        "Cada lunes, la plaza frente a la Gran Mezquita se cubre de puestos: comerciantes, ganaderos y agricultores de las aldeas del delta vienen a vender cereales, pescado seco, especias, telas, cerámica y ganado. El espectáculo del mercado ante la fachada de la mezquita es una de las imágenes más célebres de Malí.",
      tips: `${AV_ES} Pida permiso antes de fotografiar a los comerciantes.`,
      bestPeriod: "Los lunes",
    },
    "djenne-djeno": {
      summary: "Yacimiento arqueológico de la antigua ciudad, una de las más antiguas de África Occidental.",
      description:
        "A pocos kilómetros de la ciudad actual, el montículo de Djenné-Djeno («el viejo Djenné») conserva los restos de una ciudad habitada desde los últimos siglos antes de nuestra era. Las excavaciones han revelado un núcleo urbano y comercial muy antiguo, así como estatuillas de terracota que se han hecho célebres. El yacimiento, frágil y protegido, forma parte del bien de la UNESCO.",
      tips: `${AV_ES} Yacimiento arqueológico protegido: no recoja nada, el saqueo de terracotas es una lacra.`,
    },
    "falaise-de-bandiagara": {
      name: "Acantilado de Bandiagara",
      summary: "Escarpe espectacular que domina la llanura del Séno.",
      description:
        "A lo largo de más de 150 kilómetros, el acantilado de arenisca separa la meseta de Bandiagara de la llanura del Séno. Pedregales, gargantas, manantiales y vegetación aferrada a las paredes componen un paisaje impresionante, recorrido durante mucho tiempo a pie de aldea en aldea por los senderistas.",
      tips: `${AV_ES} La región sufre violencia armada: no vaya mientras las fuentes oficiales lo desaconsejen.`,
      bestPeriod: "De noviembre a febrero (estación seca y fresca)",
    },
    "villages-dogon": {
      name: "Aldeas dogón",
      summary: "Casas de tierra, graneros con techo de paja y toguna, el cobertizo de reunión.",
      description:
        "Las aldeas dogón se organizan en torno a la toguna, refugio bajo de grueso techo de tallos de mijo donde se reúnen los hombres, la casa del hogon (jefe religioso) e innumerables graneros con tejado de paja. Arriba, en la pared rocosa, subsisten las antiguas viviendas y graneros atribuidos a los tellem. Una arquitectura inseparable de la cosmogonía dogón.",
      tips: `${AV_ES} Los lugares sagrados de las aldeas están prohibidos a los visitantes: la visita se hace siempre con un guía de la aldea.`,
    },
    "masques-dogon": {
      name: "Máscaras dogón",
      summary: "Danzas de máscaras ligadas a los ritos funerarios y a las grandes ceremonias.",
      description:
        "Las máscaras dogón, entre ellas la famosa kanaga, salen durante las ceremonias funerarias del dama, que acompañan a los difuntos hacia el mundo de los antepasados, y durante los grandes ritos colectivos. Su danza, al son de los tambores, es una de las expresiones más fuertes de la cultura dogón. El calendario de las ceremonias lo fijan las propias comunidades.",
      tips: `${AV_ES} Las ceremonias son ritos, no espectáculos: asista solo por invitación y según las reglas fijadas por la aldea.`,
    },
    "mosquee-djingareyber": {
      name: "Mezquita de Djingareyber",
      summary: "La gran mezquita de tierra del siglo XIV, vinculada al emperador Mansa Musa.",
      description:
        "Construida en el siglo XIV, a la vuelta de la peregrinación a La Meca del emperador de Malí Mansa Musa (Kankou Moussa), y atribuida al arquitecto andalusí Abu Ishaq es-Saheli, Djingareyber es la más antigua de las grandes mezquitas de Tombuctú. Sus muros de banco, su minarete cónico y sus vigas de madera salientes ilustran la arquitectura de tierra saheliana; los albañiles de la ciudad la mantienen con regularidad.",
      tips: `${AV_ES} La región de Tombuctú está formalmente desaconsejada.`,
    },
    "mosquee-sankore": {
      name: "Mezquita de Sankoré",
      summary: "Mezquita y antiguo centro de enseñanza, símbolo del prestigio intelectual de la ciudad.",
      description:
        "En el norte de la ciudad, la mezquita de Sankoré fue en los siglos XV y XVI uno de los grandes centros de enseñanza de Tombuctú, donde los sabios enseñaban derecho, teología, gramática o astronomía. Su silueta de pirámide escalonada es una de las imágenes de la ciudad.",
      tips: `${AV_ES} La región de Tombuctú está formalmente desaconsejada.`,
    },
    "manuscrits-de-tombouctou": {
      name: "Manuscritos de Tombuctú",
      summary: "Cientos de miles de manuscritos conservados por el Instituto Ahmed Baba y las bibliotecas familiares.",
      description:
        "Tombuctú ha conservado un patrimonio escrito excepcional: manuscritos en árabe y en lenguas africanas escritas con caracteres árabes, que tratan de religión, derecho, ciencias, medicina o comercio. Una parte la conserva el Instituto de Altos Estudios e Investigación Islámica Ahmed Baba (IHERI-AB), el resto bibliotecas familiares. En 2012-2013, gran parte de los manuscritos se puso a salvo en Bamako; algunos fueron destruidos.",
      tips: `${AV_ES} Las colecciones se han trasladado en parte: infórmese sobre qué se puede consultar y dónde.`,
    },
    "tombeau-des-askia": {
      name: "Tumba de los Askia",
      summary: "Pirámide de tierra de finales del siglo XV, sepultura del emperador Askia Mohammed.",
      description:
        "Levantada a finales del siglo XV por el emperador songhai Askia Mohammed a su regreso de La Meca, la tumba es una imponente pirámide de banco erizada de vigas de madera, uno de los mayores monumentos de tierra de la región. El conjunto incluye también dos mezquitas de techo plano, un cementerio y una explanada de oración. Da testimonio del poder del imperio y de la difusión de la arquitectura de tierra saheliana.",
      tips: `${AV_ES} La región de Gao está formalmente desaconsejada.`,
    },
    "dune-rose-gao": {
      name: "Duna Rosa",
      summary: "Gran duna de arena con reflejos rosados, en la orilla opuesta del Níger.",
      description:
        "En la orilla derecha del río, frente a Gao, una gran duna de arena adquiere tonos rosados al amanecer y al atardecer. Desde lo alto, la vista abarca el Níger y la ciudad. Un paseo tradicional para los habitantes de Gao.",
      tips: `${AV_ES} La región de Gao está formalmente desaconsejada.`,
    },
    "cathedrale-sacre-coeur-bamako": {
      name: "Catedral del Sagrado Corazón de Bamako",
      summary: "Catedral católica del centro de la ciudad, terminada en 1936.",
      description:
        "En el corazón de Bamako, la catedral del Sagrado Corazón es la sede de la archidiócesis de Bamako. Su primera piedra se colocó en 1925; abierta al culto dos años después, se terminó en 1936 y fue hasta 1957 el único lugar de culto católico oficial de la ciudad. Figura desde 2017 en la lista indicativa de Malí para el Patrimonio Mundial de la UNESCO, testigo de la presencia cristiana en un país mayoritariamente musulmán.",
      tips: `${AV_ES} Lugar de culto: vestimenta adecuada y discreción durante los oficios.`,
    },
    "kamablon-kangaba": {
      name: "Choza sagrada de Kangaba (Kamablon)",
      summary: "Choza sagrada del Manden, cuyo techo de paja se renueva cada siete años.",
      description:
        "En Kangaba, al suroeste de Bamako, el Kamablon («vestíbulo de la palabra») es una choza redonda de banco cubierta de paja, levantada según la tradición en 1653 y considerada la última de este tipo en el área cultural del Manden, cuna del Imperio de Malí. Cada siete años, la renovación de su techo da lugar a una ceremonia de varios días dirigida por los Keita, descendientes de Sundiata, y los griots Diabaté, que recitan allí la historia del Manden; este ritual figura desde 2009 en el Patrimonio Cultural Inmaterial de la UNESCO. Los sitios históricos del Manden también están en la lista indicativa de Malí.",
      tips: `${AV_ES} Lugar sagrado: solo se puede acercar con el permiso de las autoridades tradicionales y según sus normas.`,
    },
    "sangha-pays-dogon": {
      name: "Sangha",
      summary: "Localidad al borde de la meseta, considerada la capital cultural del país dogón.",
      description:
        "Al borde de la meseta de Bandiagara, Sangha agrupa una decena de aldeas cercanas, entre ellas Ogol de Arriba y Ogol de Abajo, y se considera la capital cultural del país dogón. El etnólogo Marcel Griaule realizó allí sus investigaciones en los años treinta, y el cineasta Souleymane Cissé rodó allí parte de su película Yeelen. Desde Sangha, unos senderos bajaban por el acantilado hacia aldeas como Ireli, Banani o Tireli.",
      tips: `${AV_ES} La región sufre violencia armada: no viaje allí mientras las fuentes oficiales lo desaconsejen.`,
    },
    "mosquee-sidi-yahia": {
      name: "Mezquita de Sidi Yahia",
      summary: "Mezquita del siglo XV, la tercera de las grandes mezquitas de Tombuctú.",
      description:
        "Iniciada hacia 1400 y terminada hacia 1440, la mezquita de Sidi Yahia lleva el nombre de su primer imán, Sidi Yahia al-Tadelsi, venerado como santo y enterrado en el edificio. Junto con Djingareyber y Sankoré, forma el conjunto de grandes mezquitas que dieron fama intelectual a la ciudad, inscritas en el Patrimonio Mundial. Muy remodelada en 1939, fue dañada por grupos armados en julio de 2012 y restaurada después bajo la dirección de la UNESCO.",
      tips: `${AV_ES} La región de Tombuctú está formalmente desaconsejada.`,
    },
    "mosquee-komoguel-mopti": {
      name: "Gran Mezquita de Mopti (Komoguel)",
      summary: "Mezquita de banco de estilo sudanés de los años treinta, restaurada con técnicas tradicionales.",
      description:
        "Inspirada en la Gran Mezquita de Djenné, la mezquita del barrio de Komoguel se construyó en banco en los años treinta, en el lugar de una mezquita de 1908. Recubierta de cemento en 1978 y de nuevo en 2003, se deterioraba; una restauración realizada de 2004 a 2006 con el Aga Khan Trust for Culture le devolvió su revoque de tierra y sus técnicas tradicionales. Protegida como patrimonio nacional desde 2005, figura en la lista indicativa de Malí para el Patrimonio Mundial de la UNESCO.",
      tips: `${AV_ES} El interior está reservado a los fieles: contemple la mezquita desde fuera y respete las horas de oración.`,
    },
    "port-de-mopti": {
      name: "Puerto de Mopti",
      summary: "Animado puerto fluvial donde atracan pinasses y piraguas.",
      description:
        "A orillas del Bani, el puerto es el corazón de Mopti: pinasses (grandes barcas fluviales) cargadas de mercancías y pasajeros, piraguas de pescadores bozo, astilleros donde se construyen las embarcaciones a mano. Las placas de sal llegadas de Taoudeni por el río se desembarcaban y se vendían aquí al por menor. Un espectáculo permanente junto al agua, sobre todo al final del día.",
      tips: `${AV_ES} Pida permiso antes de fotografiar a las personas; mantenga sus pertenencias cerca entre la multitud.`,
    },
    hamdallahi: {
      name: "Hamdallahi",
      summary: "Vestigios de la capital del imperio peul de Macina, fundada en 1818.",
      description:
        "A unos cuarenta kilómetros al sur de Mopti, Hamdallahi («alabado sea Dios») fue fundada en 1818 por Sékou Amadou como capital del imperio peul de Macina. La ciudad, rodeada por una muralla de más de cinco kilómetros, tenía una gran mezquita y numerosísimas escuelas coránicas. Conquistada en 1862 por El Hadj Omar Tall, quedó después en ruinas. La ciudad histórica está protegida como patrimonio nacional y figura en la lista indicativa de Malí para la UNESCO; el mausoleo de Sékou Amadou fue dañado por grupos armados durante el conflicto.",
      tips: `${AV_ES} El centro de Malí sufre violencia armada.`,
    },
    "fort-de-medine": {
      name: "Fuerte de Médine",
      summary: "Fuerte colonial de 1855, asediado 97 días en 1857 por El Hadj Omar Tall.",
      description:
        "A unos doce kilómetros de Kayes, en la orilla izquierda del Senegal, Médine fue la capital del reino de Khasso. En 1855, el gobernador Faidherbe hizo construir allí un fuerte con el acuerdo del rey Diouka Sambala; en 1857, El Hadj Omar Tall lo asedió durante 97 días, hasta la llegada de las tropas francesas. Médine se convirtió después en cabecera de círculo antes de quedar eclipsada por Kayes. El fuerte figura en la lista indicativa de Malí para el Patrimonio Mundial de la UNESCO.",
      tips: `${AV_ES} Los muros son frágiles: no se suba a las ruinas.`,
    },
    "chutes-du-felou": {
      name: "Cataratas de Félou",
      summary: "Rápidos y rocas esculpidas por el río Senegal, a 16 km de Kayes.",
      description:
        "A unos 16 kilómetros al sureste de Kayes, el río Senegal, de más de un kilómetro de ancho aguas arriba, se estrecha y desciende unos 14 metros entre un caos de rocas pulidas por el agua. El caudal varía enormemente: unos pocos metros cúbicos por segundo al final de la estación seca, varios miles en el punto álgido de la crecida, en octubre. Una central hidroeléctrica se encuentra junto a un canal de derivación.",
      tips: `${AV_ES} No se bañe cerca de los rápidos: la corriente es peligrosa, sobre todo en crecida.`,
      bestPeriod: "De septiembre a noviembre, cuando el río está alto",
    },
    "chutes-de-gouina": {
      name: "Cataratas de Gouina",
      summary: "Amplia cortina de agua del río Senegal, a 80 km de Kayes.",
      description:
        "A unos 80 kilómetros al sureste de Kayes, en dirección a Bafoulabé, el río Senegal, de varios cientos de metros de ancho, cae más de quince metros en una amplia cortina de agua. La Organización para el Aprovechamiento del Río Senegal (OMVS) inició allí a finales de 2013 la construcción de una presa hidroeléctrica, que modifica el lugar.",
      tips: `${AV_ES} El lugar está aislado: infórmese sobre el estado de la pista y el acceso a las obras de la presa.`,
      bestPeriod: "De septiembre a noviembre, cuando el río está alto",
    },
    "mamelon-de-sikasso": {
      name: "Mamelon de Sikasso",
      summary: "Colina artificial de los reyes de Kénédougou, en el centro de la ciudad.",
      description:
        "En el corazón de Sikasso, el Mamelon es una colina artificial de unos treinta metros de altura, levantada en la década de 1880 por el rey Tiéba Traoré como sede de los soberanos de Kénédougou. En la cima se alza la réplica de un edificio fortificado de dos plantas que servía de lugar de trabajo y de tribunal tradicional, destruido durante la toma de la ciudad por los franceses. Desde lo alto, la vista abarca toda la ciudad.",
      tips: `${AV_ES} Lleve buen calzado para la subida.`,
    },
    "tata-de-sikasso": {
      name: "Tata de Sikasso",
      summary: "Vestigios de las murallas de tierra del reino de Kénédougou (finales del siglo XIX).",
      description:
        "Construido entre 1877 y 1897 bajo los reinados de Tiéba y luego de Babemba Traoré para resistir los ataques de Samory Touré, el tata de Sikasso contaba en su apogeo con tres recintos, entre ellos una muralla exterior de unos 9 kilómetros, de 6 metros de grosor en la base y de 4 a 6 metros de altura. Quedan lienzos de muralla en varios barrios de la ciudad, como Mancourani, Médine o Wayerma. El tata figura en la lista indicativa de Malí para el Patrimonio Mundial de la UNESCO.",
      tips: `${AV_ES} Los vestigios están dispersos por la ciudad: un guía local ayuda a encontrarlos.`,
    },
    "grottes-de-missirikoro": {
      name: "Cuevas de Missirikoro",
      summary: "Roca horadada de cuevas, a la vez mezquita y lugar de culto tradicional.",
      description:
        "A unos diez kilómetros al suroeste de Sikasso, cerca de la aldea del mismo nombre, Missirikoro es un montículo de arenisca de unos 80 metros de altura horadado por cuevas. El lugar es a la vez una mezquita y un lugar de culto animista, de ahí su nombre, que significa «vieja mezquita» en bambara. Las cuevas albergan varias especies de murciélagos.",
      tips: `${AV_ES} Lugar de culto: vestimenta adecuada; pida permiso antes de entrar o hacer fotos.`,
    },
    "hombori-tondo": {
      name: "Hombori Tondo",
      summary: "Meseta de arenisca de paredes verticales, punto más alto de Malí.",
      description:
        "Con unos 1155 metros de altura, esta meseta de arenisca de acantilados abruptos domina el pueblo de Hombori y la llanura del Gourma: es el punto más alto de Malí. Los montes Hombori son también un sitio arqueológico, donde varias cuevas habrían estado habitadas hace unos dos mil años.",
      tips: `${AV_ES} Zona formalmente desaconsejada: no viaje allí mientras las fuentes oficiales lo desaconsejen.`,
    },
    "main-de-fatma-hombori": {
      name: "Mano de Fátima",
      summary: "Picos de arenisca que se alzan sobre la llanura como los dedos de una mano.",
      description:
        "Cerca de Hombori, junto a la carretera nacional hacia Gao, un macizo de arenisca se divide en varios picos que evocan los dedos de una mano: es la «Mano de Fátima». Visible desde muy lejos en la llanura del Gourma, este relieve espectacular fue uno de los grandes lugares de escalada de África Occidental y sigue siendo una de las imágenes emblemáticas del Sahel maliense.",
      tips: `${AV_ES} Zona formalmente desaconsejada: no viaje allí mientras las fuentes oficiales lo desaconsejen.`,
    },
  },
  circuits: {},
  stepNotes: {},
};

const PT: SeedI18n = {
  guide: {
    intro:
      "Atualmente, as autoridades francesas e britânicas desaconselham formalmente qualquer viagem ao Mali: este guia apresenta o seu património para preparar uma estadia quando as condições o permitirem. Herdeiro dos impérios do Gana, do Mali e songai, o país do rio Níger é um dos mais ricos da África Ocidental: a arquitetura de terra de Djenné e de Tombuctu, a falésia de Bandiagara e o país dogon, o túmulo dos Askia em Gao e uma cena musical que deu a volta ao mundo a partir de Bamaco.",
    sections: [
      {
        title: "Formalidades de entrada",
        body: "A maioria dos viajantes não africanos precisa de visto. O Mali saiu da CEDEAO em 2025 e forma com o Burquina Faso e o Níger a Aliança dos Estados do Sahel (AES): as regras de entrada podem ter mudado e podem voltar a mudar. Confirme sempre as condições atualizadas junto da embaixada do Mali e das fontes oficiais do seu país antes de qualquer projeto: passaporte válido por vários meses após o regresso, bilhete de regresso, morada do alojamento.",
      },
      {
        title: "Saúde",
        body: "É exigido à entrada o certificado de vacinação contra a febre-amarela. A malária está presente em todo o país, sobretudo durante e após a estação das chuvas: peça conselho a um médico ou a uma consulta do viajante sobre um tratamento preventivo e proteja-se dos mosquitos. O país situa-se na «cintura da meningite»: informe-se sobre a vacinação. Beba água engarrafada e proteja-se bem do calor. Fora de Bamaco, a oferta de cuidados de saúde é muito limitada.",
      },
      {
        title: "Moeda e pagamentos",
        body: "A moeda é o franco CFA (XOF), com paridade fixa com o euro (1 € = 655,957 francos CFA). O dinheiro em numerário é indispensável; os cartões bancários só são aceites em alguns grandes hotéis e lojas de Bamaco, e as caixas automáticas são raras no resto do país. O pagamento por telemóvel (mobile money) está muito difundido.",
      },
      {
        title: "Quando ir",
        body: "A melhor época vai de novembro a fevereiro: estação seca e temperaturas mais suportáveis, com o harmatão (vento seco e poeirento). De março a maio, o calor torna-se esmagador, muitas vezes acima dos 40 °C. A estação das chuvas vai, grosso modo, de junho a setembro, mais longa e mais chuvosa no sul; é também a época da cheia do Níger, que inunda o delta interior até ao início da estação seca.",
      },
      {
        title: "Línguas e costumes",
        body: "A Constituição de 2023 fez das línguas nacionais (bambara, fula, soninquê, songai, tamasheq e as línguas dogon, entre outras) as línguas oficiais do país; o francês passou a língua de trabalho e continua muito usado na administração e nas cidades. O bambara (bamanankan) serve de língua comum em grande parte do país. As saudações, longas e codificadas, são essenciais antes de qualquer pedido. O Mali é maioritariamente muçulmano: roupa que cubra, discrição durante as orações e o ramadão. Peça sempre autorização antes de fotografar uma pessoa, uma cerimónia ou um lugar sagrado.",
      },
      {
        title: "Deslocações",
        body: "Tradicionalmente, viajava-se entre cidades de autocarro e táxi-brousse, e no Níger de pinasse (barco fluvial) ou de barco na época das águas altas. Hoje, segundo as autoridades britânicas, as grandes estradas são alvo de ataques e bloqueios, nomeadamente contra comboios de combustível, e as deslocações por estrada são muito perigosas. Por isso, este guia não propõe qualquer itinerário: informe-se junto das fontes oficiais antes de qualquer projeto.",
      },
      {
        title: "Eletricidade e telefone",
        body: "Corrente de 220 V, tomadas de tipo C e E (tomadas europeias). Os cortes de energia são frequentes, inclusive em Bamaco. Um cartão SIM local (é pedido documento de identificação) dá acesso à internet móvel e ao mobile money; a cobertura é irregular fora das cidades.",
      },
      {
        title: "Segurança",
        body: "A situação de segurança é muito grave. À data de redação (outubro de 2026), a France Diplomatie desaconselha formalmente deslocações ao Mali, seja qual for o motivo, e recomenda aos franceses presentes que deixem temporariamente o país nos voos comerciais ainda disponíveis. O FCDO britânico desaconselha qualquer viagem a todo o país: assinala uma ameaça terrorista elevada, um risco elevado de rapto, incluindo em Bamaco, e bloqueios de estradas por grupos armados. A assistência consular é muito limitada. Consulte os conselhos aos viajantes da France Diplomatie, os do FCDO (gov.uk) ou os do seu país antes de qualquer projeto: este é um guia de património, a usar quando essas fontes deixarem de desaconselhar a viagem.",
      },
    ],
  },
  destinations: {
    bamako: {
      name: "Bamaco",
      region: "Distrito de Bamaco",
      summary: "Capital nas margens do Níger, cidade de música, mercados e do Museu Nacional.",
      description:
        "Estendida pelas duas margens do Níger, Bamaco é a capital e, de longe, a maior cidade do país. É famosa pela sua cena musical, berço de muitos artistas conhecidos em todo o mundo, pelos seus mercados fervilhantes e pelo seu Museu Nacional, um dos mais belos da África Ocidental. A cidade acolhe também os Rencontres de Bamako, bienal dedicada à fotografia africana. Tal como o resto do país, é atualmente formalmente desaconselhada aos viajantes.",
    },
    segou: {
      summary: "Antiga capital do reino bambara, nas margens do Níger.",
      description:
        "Nas margens do Níger, Ségou foi no século XVIII a capital do reino bambara fundado por Biton Coulibaly. A cidade conserva cais animados, edifícios da época colonial e uma tradição artesanal viva, do bogolan à olaria. Desde meados dos anos 2000 acolhe o Festival sobre o Níger, um dos grandes acontecimentos culturais do país. Atualmente, tal como o resto do Mali, é formalmente desaconselhada aos viajantes.",
    },
    djenne: {
      summary: "Cidade de terra classificada pela UNESCO, dominada pela mais célebre mesquita de adobe do mundo.",
      description:
        "Numa ilha do delta interior do Níger, Djenné é uma das cidades mais antigas da África subsariana. As suas casas de banco (adobe), a Grande Mesquita e o sítio arqueológico vizinho de Djenné-Djeno formam as «Cidades antigas de Djenné», inscritas no Património Mundial da UNESCO em 1988 e na lista do património em perigo desde 2016. Todos os anos, o reboco coletivo da mesquita e o grande mercado de segunda-feira marcam o ritmo da cidade. Região formalmente desaconselhada atualmente.",
    },
    "pays-dogon": {
      name: "Falésia de Bandiagara (país dogon)",
      summary: "Uma falésia de arenito com mais de 150 km, aldeias dogon e celeiros agarrados à rocha.",
      description:
        "Ao longo da falésia de Bandiagara, os dogon construíram aldeias de terra e pedra no sopé e na encosta da escarpa, por baixo das antigas habitações trogloditas atribuídas aos tellem. Paisagens grandiosas, arquitetura, máscaras e cosmogonia fazem da «Falésia de Bandiagara (país dogon)» um bem misto, cultural e natural, inscrito no Património Mundial da UNESCO em 1989 e na lista do património em perigo em 2023. A região é afetada pela violência armada e está formalmente desaconselhada.",
    },
    tombouctou: {
      name: "Tombuctu",
      region: "Tombuctu",
      summary: "Cidade lendária às portas do Sara, com as suas mesquitas de terra e os seus manuscritos.",
      description:
        "Fundada à beira do Sara, perto do rio Níger, Tombuctu tornou-se nos séculos XV e XVI um grande cruzamento do comércio transariano e um centro intelectual do islão. As suas três grandes mesquitas, Djingareyber, Sankoré e Sidi Yahia, e os seus mausoléus de santos estão inscritos no Património Mundial da UNESCO desde 1988 e na lista do património em perigo. Em 2012, vários mausoléus foram destruídos por grupos armados; foram reconstruídos por pedreiros locais com o apoio da UNESCO. Zona formalmente desaconselhada.",
    },
    gao: {
      summary: "Antiga capital do Império Songai, na curva do Níger.",
      description:
        "Na margem esquerda do Níger, Gao foi a capital do Império Songai, que dominou grande parte da África Ocidental nos séculos XV e XVI. Conserva o túmulo dos Askia, pirâmide de terra inscrita no Património Mundial da UNESCO em 2004 e na lista do património em perigo desde 2012. Em frente à cidade, a duna rosa reflete-se no rio. Zona formalmente desaconselhada.",
    },
    mopti: {
      region: "Mopti",
      summary: "A «Veneza do Mali», porto fluvial na confluência do Níger com o Bani.",
      description:
        "Construída na margem direita do Bani, muito perto da sua confluência com o Níger, Mopti é conhecida como a «Veneza do Mali»: durante a cheia, aproximadamente de agosto a dezembro, a cidade transforma-se num conjunto de ilhéus ligados por diques. Simples aldeia de pescadores bozo que se tornou um grande entreposto comercial na época colonial, reúne bozo, fulas, bambaras, dogons e songhai em torno do seu porto, dos seus estaleiros de pirogas e da sua grande mesquita de banco. Era a porta de entrada para Djenné e para o país dogon. Região formalmente desaconselhada atualmente.",
    },
    kayes: {
      region: "Kayes",
      summary: "Antiga capital colonial junto ao rio Senegal, porta do forte de Médine e das cataratas.",
      description:
        "No oeste do país, junto ao rio Senegal, Kayes foi no final do século XIX a sede da colónia do Sudão Francês, antes da transferência da capital para Bamako no início do século XX. É o ponto de partida para o forte de Médine, testemunho dos primórdios da colonização, e para as cataratas de Félou e de Gouina, onde o rio transpõe soleiras rochosas. Tal como o resto do país, a região está atualmente formalmente desaconselhada.",
    },
    sikasso: {
      region: "Sikasso",
      summary: "Capital do reino de Kénédougou, no coração do sul verdejante.",
      description:
        "No sul do país, mais chuvoso e mais verde, Sikasso foi a capital do reino de Kénédougou. Os seus reis Tiéba e depois Babemba Traoré cercaram-na com uma poderosa muralha, o tata, que resistiu ao cerco de Samory Touré antes da tomada da cidade pelas tropas coloniais francesas em 1898. Hoje uma das cidades mais populosas do país, é também um grande mercado agrícola de fruta e legumes. Tal como o resto do país, a região está atualmente formalmente desaconselhada.",
    },
    hombori: {
      region: "Douentza",
      summary: "Mesetas e agulhas de arenito sobre a planície do Gourma, com o ponto mais alto do Mali.",
      description:
        "Na estrada entre Mopti e Gao, a localidade de Hombori, de casas de pedra e ruelas estreitas, é dominada pelos montes Hombori, prolongamento da falésia de Bandiagara. O Hombori Tondo atinge ali cerca de 1155 metros, o ponto mais alto do país, e relevos vizinhos como a Mão de Fátima ou as agulhas de Gami atraíam escaladores. A região do Gourma abriga ainda elefantes, dos últimos do Sahel. Zona formalmente desaconselhada atualmente.",
    },
  },
  places: {
    "musee-national-du-mali": {
      name: "Museu Nacional do Mali",
      summary: "Grande museu dedicado à arqueologia, aos têxteis e às máscaras do país.",
      description:
        "Instalado num edifício de inspiração sudanesa, o Museu Nacional do Mali apresenta as grandes coleções do país: objetos arqueológicos (entre os quais terracotas da região de Djenné), têxteis como o bogolan, máscaras e estatuária dos diferentes povos, objetos rituais. As exposições temporárias e o jardim fazem dele um dos principais espaços culturais de Bamaco.",
      tips: `${AV_PT} O museu é vizinho do parque nacional de Bamaco: os dois visitam-se em conjunto.`,
    },
    "parc-national-bamako": {
      name: "Parque Nacional do Mali",
      summary: "Grande parque urbano nas colinas, com trilhos e jardins.",
      description:
        "No sopé das colinas que dominam a cidade, ao lado do Museu Nacional, este parque urbano criado no final dos anos 2000 oferece trilhos com sombra, jardins de plantas locais e espaços de descanso. Um pulmão verde muito apreciado pelos habitantes de Bamaco.",
      tips: `${AV_PT} Leve água e venha cedo de manhã, quando está mais fresco.`,
    },
    "grand-marche-bamako": {
      name: "Grande Mercado de Bamaco",
      summary: "O coração comercial da cidade, em torno do edifício do «mercado cor-de-rosa».",
      description:
        "No centro, o grande mercado e as ruas vizinhas formam um imenso bairro comercial: tecidos e bazin, bogolan, especiarias, joias, couro, objetos do dia a dia. O edifício de estilo neossudanês apelidado «mercado cor-de-rosa» é a sua referência. Um mergulho na azáfama da capital.",
      tips: `${AV_PT} Nos mercados, mantenha os seus pertences perto de si e peça autorização antes de fotografar.`,
    },
    "grande-mosquee-bamako": {
      name: "Grande Mesquita de Bamaco",
      summary: "Mesquita de dois grandes minaretes, referência do centro da cidade.",
      description:
        "Construída na segunda metade do século XX, a Grande Mesquita de Bamaco domina o centro com os seus minaretes, perto do grande mercado. É um dos principais locais de oração da capital, muito frequentado à sexta-feira. Visita-se do exterior.",
      tips: `${AV_PT} Roupa que cubra; não visitar durante as orações.`,
    },
    "festival-sur-le-niger-segou": {
      name: "Festival sobre o Níger",
      summary: "Música, artes e cultura nas margens do rio, geralmente em fevereiro.",
      description:
        "Criado em meados dos anos 2000, o Festival sobre o Níger reúne todos os anos nas margens de Ségou músicos malianos e africanos, exposições de arte, marionetas e encontros em torno das culturas do rio. Tornou-se um dos acontecimentos culturais emblemáticos do país.",
      tips: `${AV_PT} As datas, e a própria realização do festival, dependem do contexto: consulte os anúncios oficiais dos organizadores.`,
      bestPeriod: "Geralmente em fevereiro",
    },
    "segou-koro": {
      summary: "Aldeia histórica de Biton Coulibaly, com as suas mesquitas de terra.",
      description:
        "A poucos quilómetros de Ségou, junto ao rio, Ségou-Koro («o velho Ségou») é o berço do reino bambara. A aldeia conserva mesquitas de banco e o local de memória de Biton Coulibaly, fundador do reino. Uma visita a fazer com um guia local e no respeito pelos costumes da aldeia.",
      tips: `${AV_PT} Cumprimente o chefe da aldeia ou os seus representantes antes da visita, como manda o costume.`,
    },
    "poteries-de-kalabougou": {
      name: "Oleiras de Kalabougou",
      summary: "Aldeia de oleiras na outra margem do Níger, em frente a Ségou.",
      description:
        "Na margem oposta do Níger, a aldeia de Kalabougou é conhecida pelas suas oleiras, que moldam à mão jarras e potes e os cozem ao ar livre, segundo técnicas transmitidas de geração em geração. Um encontro com um saber ancestral.",
      tips: `${AV_PT} Peça sempre autorização antes de fotografar; comprar uma peça é a melhor forma de apoiar as artesãs.`,
    },
    "grande-mosquee-djenne": {
      name: "Grande Mesquita de Djenné",
      summary: "Obra-prima da arquitetura sudano-saheliana, o maior edifício de adobe do mundo.",
      description:
        "Reconstruída em 1907 no local de uma mesquita muito mais antiga, a Grande Mesquita de Djenné é o emblema do Mali. As suas paredes de banco eriçadas de traves de madeira (os toron), as três torres da fachada e os contrafortes fazem dela o símbolo da arquitetura sudano-saheliana. Domina a praça do mercado. O interior está reservado aos fiéis muçulmanos.",
      tips: `${AV_PT} Edifício religioso: observe-o a partir da praça e respeite os momentos de oração.`,
    },
    "crepissage-mosquee-djenne": {
      name: "Reboco da Grande Mesquita",
      summary: "Todos os anos, a cidade inteira mobiliza-se para cobrir a mesquita com um novo reboco.",
      description:
        "As chuvas danificam as paredes de terra: todos os anos, antes da estação das chuvas, os habitantes de Djenné preparam uma mistura de banco e revezam-se numa grande festa coletiva para rebocar a mesquita. Os bairros rivalizam em entusiasmo ao som dos tambores. Uma tradição viva que garante a sobrevivência do monumento.",
      tips: `${AV_PT} A data é fixada localmente todos os anos.`,
      bestPeriod: "Uma vez por ano, antes da estação das chuvas (data fixada localmente)",
    },
    "marche-du-lundi-djenne": {
      name: "Mercado de segunda-feira",
      summary: "Grande mercado semanal ao pé da mesquita, que atrai toda a região.",
      description:
        "Todas as segundas-feiras, a praça em frente à Grande Mesquita enche-se de bancas: comerciantes, criadores de gado e agricultores das aldeias do delta vêm vender cereais, peixe seco, especiarias, tecidos, olaria e gado. O espetáculo do mercado diante da fachada da mesquita é uma das imagens mais célebres do Mali.",
      tips: `${AV_PT} Peça autorização antes de fotografar os comerciantes.`,
      bestPeriod: "À segunda-feira",
    },
    "djenne-djeno": {
      summary: "Sítio arqueológico da antiga cidade, uma das mais antigas da África Ocidental.",
      description:
        "A poucos quilómetros da cidade atual, o montículo de Djenné-Djeno («o velho Djenné») conserva os vestígios de uma cidade habitada desde os últimos séculos antes da nossa era. As escavações revelaram um aglomerado urbano e comercial muito antigo, bem como estatuetas de terracota que se tornaram célebres. O sítio, frágil e protegido, faz parte do bem da UNESCO.",
      tips: `${AV_PT} Sítio arqueológico protegido: não apanhe nada, a pilhagem de terracotas é um flagelo.`,
    },
    "falaise-de-bandiagara": {
      name: "Falésia de Bandiagara",
      summary: "Escarpa espetacular sobre a planície do Séno.",
      description:
        "Ao longo de mais de 150 quilómetros, a falésia de arenito separa o planalto de Bandiagara da planície do Séno. Pedregulhos, desfiladeiros, nascentes e vegetação agarrada às paredes compõem uma paisagem impressionante, durante muito tempo percorrida a pé, de aldeia em aldeia, pelos caminhantes.",
      tips: `${AV_PT} A região é afetada pela violência armada: não vá enquanto as fontes oficiais o desaconselharem.`,
      bestPeriod: "De novembro a fevereiro (estação seca e fresca)",
    },
    "villages-dogon": {
      name: "Aldeias dogon",
      summary: "Casas de terra, celeiros com telhado de colmo e toguna, o abrigo de reunião.",
      description:
        "As aldeias dogon organizam-se em torno da toguna, abrigo baixo com um espesso telhado de caules de milho-miúdo onde os homens se reúnem, da casa do hogon (chefe religioso) e de inúmeros celeiros cobertos de colmo. Acima, na parede rochosa, subsistem as antigas habitações e celeiros atribuídos aos tellem. Uma arquitetura indissociável da cosmogonia dogon.",
      tips: `${AV_PT} Os lugares sagrados das aldeias estão vedados aos visitantes: a visita faz-se sempre com um guia da aldeia.`,
    },
    "masques-dogon": {
      name: "Máscaras dogon",
      summary: "Danças de máscaras ligadas aos ritos fúnebres e às grandes cerimónias.",
      description:
        "As máscaras dogon, entre as quais a famosa kanaga, saem durante as cerimónias fúnebres do dama, que acompanham os defuntos para o mundo dos antepassados, e durante os grandes ritos coletivos. A sua dança, ao som dos tambores, é uma das expressões mais fortes da cultura dogon. O calendário das cerimónias é fixado pelas próprias comunidades.",
      tips: `${AV_PT} As cerimónias são ritos, não espetáculos: assista apenas a convite e segundo as regras fixadas pela aldeia.`,
    },
    "mosquee-djingareyber": {
      name: "Mesquita de Djingareyber",
      summary: "A grande mesquita de terra do século XIV, ligada ao imperador Mansa Musa.",
      description:
        "Construída no século XIV, após o regresso da peregrinação a Meca do imperador do Mali Mansa Musa (Kankou Moussa), e atribuída ao arquiteto andaluz Abu Ishaq es-Saheli, Djingareyber é a mais antiga das grandes mesquitas de Tombuctu. As paredes de banco, o minarete cónico e as traves de madeira salientes ilustram a arquitetura de terra saheliana; é regularmente conservada pelos pedreiros da cidade.",
      tips: `${AV_PT} A região de Tombuctu está formalmente desaconselhada.`,
    },
    "mosquee-sankore": {
      name: "Mesquita de Sankoré",
      summary: "Mesquita e antigo centro de ensino, símbolo do prestígio intelectual da cidade.",
      description:
        "No norte da cidade, a mesquita de Sankoré foi nos séculos XV e XVI um dos grandes centros de ensino de Tombuctu, onde os sábios ensinavam direito, teologia, gramática ou astronomia. A sua silhueta de pirâmide escalonada é uma das imagens da cidade.",
      tips: `${AV_PT} A região de Tombuctu está formalmente desaconselhada.`,
    },
    "manuscrits-de-tombouctou": {
      name: "Manuscritos de Tombuctu",
      summary: "Centenas de milhares de manuscritos conservados pelo Instituto Ahmed Baba e pelas bibliotecas familiares.",
      description:
        "Tombuctu conservou um património escrito excecional: manuscritos em árabe e em línguas africanas escritas em caracteres árabes, sobre religião, direito, ciências, medicina ou comércio. Uma parte é conservada pelo Instituto de Altos Estudos e de Investigação Islâmica Ahmed Baba (IHERI-AB), o resto por bibliotecas familiares. Em 2012-2013, grande parte dos manuscritos foi posta a salvo em Bamaco; alguns foram destruídos.",
      tips: `${AV_PT} As coleções foram em parte deslocadas: informe-se sobre o que pode ser consultado e onde.`,
    },
    "tombeau-des-askia": {
      name: "Túmulo dos Askia",
      summary: "Pirâmide de terra do final do século XV, sepultura do imperador Askia Mohammed.",
      description:
        "Erguido no final do século XV pelo imperador songai Askia Mohammed no regresso de Meca, o túmulo é uma imponente pirâmide de banco eriçada de traves de madeira, um dos maiores monumentos de terra da região. O conjunto inclui também duas mesquitas de telhado plano, um cemitério e uma esplanada de oração. Testemunha o poder do império e a difusão da arquitetura de terra saheliana.",
      tips: `${AV_PT} A região de Gao está formalmente desaconselhada.`,
    },
    "dune-rose-gao": {
      name: "Duna Rosa",
      summary: "Grande duna de areia com reflexos rosados, na margem oposta do Níger.",
      description:
        "Na margem direita do rio, em frente a Gao, uma grande duna de areia ganha tons rosados ao nascer e ao pôr do sol. Do cimo, a vista abrange o Níger e a cidade. Um passeio tradicional para os habitantes de Gao.",
      tips: `${AV_PT} A região de Gao está formalmente desaconselhada.`,
    },
    "cathedrale-sacre-coeur-bamako": {
      name: "Catedral do Sagrado Coração de Bamako",
      summary: "Catedral católica do centro da cidade, concluída em 1936.",
      description:
        "No coração de Bamako, a catedral do Sagrado Coração é a sede da arquidiocese de Bamako. A primeira pedra foi lançada em 1925; aberta ao culto dois anos depois, foi concluída em 1936 e foi até 1957 o único local de culto católico oficial da cidade. Figura desde 2017 na lista indicativa do Mali para o Património Mundial da UNESCO, testemunho da presença cristã num país maioritariamente muçulmano.",
      tips: `${AV_PT} Local de culto: vestuário adequado e discrição durante as celebrações.`,
    },
    "kamablon-kangaba": {
      name: "Cabana sagrada de Kangaba (Kamablon)",
      summary: "Cabana sagrada do Manden, cujo telhado de colmo é refeito de sete em sete anos.",
      description:
        "Em Kangaba, a sudoeste de Bamako, o Kamablon («vestíbulo da palavra») é uma cabana redonda de banco coberta de colmo, erguida segundo a tradição em 1653 e considerada a última do seu tipo na área cultural do Manden, berço do Império do Mali. De sete em sete anos, a renovação do telhado dá lugar a uma cerimónia de vários dias conduzida pelos Keita, descendentes de Sundiata, e pelos griots Diabaté, que aí recitam a história do Manden; este ritual figura desde 2009 no Património Cultural Imaterial da UNESCO. Os sítios históricos do Manden constam também da lista indicativa do Mali.",
      tips: `${AV_PT} Local sagrado: só se pode aproximar com o acordo das autoridades tradicionais e segundo as suas regras.`,
    },
    "sangha-pays-dogon": {
      name: "Sangha",
      summary: "Localidade à beira do planalto, considerada a capital cultural do país dogon.",
      description:
        "À beira do planalto de Bandiagara, Sangha agrupa uma dezena de aldeias próximas, entre as quais Ogol de Cima e Ogol de Baixo, e é considerada a capital cultural do país dogon. O etnólogo Marcel Griaule realizou ali as suas pesquisas nos anos 1930 e o cineasta Souleymane Cissé filmou ali parte do seu filme Yeelen. A partir de Sangha, trilhos desciam a falésia em direção a aldeias como Ireli, Banani ou Tireli.",
      tips: `${AV_PT} A região é afetada pela violência armada: não vá enquanto as fontes oficiais o desaconselharem.`,
    },
    "mosquee-sidi-yahia": {
      name: "Mesquita de Sidi Yahia",
      summary: "Mesquita do século XV, a terceira das grandes mesquitas de Tombuctu.",
      description:
        "Iniciada por volta de 1400 e concluída por volta de 1440, a mesquita de Sidi Yahia tem o nome do seu primeiro imã, Sidi Yahia al-Tadelsi, venerado como santo e sepultado no edifício. Com Djingareyber e Sankoré, forma o conjunto das grandes mesquitas que fizeram a fama intelectual da cidade, inscritas no Património Mundial. Muito remodelada em 1939, foi danificada por grupos armados em julho de 2012 e depois restaurada sob a direção da UNESCO.",
      tips: `${AV_PT} A região de Tombuctu está formalmente desaconselhada.`,
    },
    "mosquee-komoguel-mopti": {
      name: "Grande Mesquita de Mopti (Komoguel)",
      summary: "Mesquita de banco de estilo sudanês dos anos 1930, restaurada com técnicas tradicionais.",
      description:
        "Inspirada na Grande Mesquita de Djenné, a mesquita do bairro de Komoguel foi construída em banco nos anos 1930, no local de uma mesquita de 1908. Revestida de cimento em 1978 e novamente em 2003, estava a degradar-se; um restauro realizado de 2004 a 2006 com o Aga Khan Trust for Culture devolveu-lhe o reboco de terra e as técnicas tradicionais. Classificada como património nacional desde 2005, figura na lista indicativa do Mali para o Património Mundial da UNESCO.",
      tips: `${AV_PT} O interior está reservado aos fiéis: observe a mesquita do exterior e respeite as horas de oração.`,
    },
    "port-de-mopti": {
      name: "Porto de Mopti",
      summary: "Porto fluvial animado, onde atracam pinasses e pirogas.",
      description:
        "Junto ao Bani, o porto é o coração de Mopti: pinasses (grandes barcos fluviais) carregadas de mercadorias e passageiros, pirogas de pescadores bozo, estaleiros onde as embarcações são construídas à mão. As placas de sal vindas de Taoudeni pelo rio eram aqui desembarcadas e vendidas a retalho. Um espetáculo permanente à beira da água, sobretudo ao fim do dia.",
      tips: `${AV_PT} Peça autorização antes de fotografar as pessoas; mantenha os seus pertences perto de si no meio da multidão.`,
    },
    hamdallahi: {
      name: "Hamdallahi",
      summary: "Vestígios da capital do império fula de Macina, fundada em 1818.",
      description:
        "A cerca de quarenta quilómetros a sul de Mopti, Hamdallahi («louvado seja Deus») foi fundada em 1818 por Sékou Amadou para ser a capital do império fula de Macina. A cidade, cercada por uma muralha com mais de cinco quilómetros, tinha uma grande mesquita e muitíssimas escolas corânicas. Conquistada em 1862 por El Hadj Omar Tall, ficou depois em ruínas. A cidade histórica está classificada como património nacional e figura na lista indicativa do Mali para a UNESCO; o mausoléu de Sékou Amadou foi danificado por grupos armados durante o conflito.",
      tips: `${AV_PT} O centro do Mali é afetado pela violência armada.`,
    },
    "fort-de-medine": {
      name: "Forte de Médine",
      summary: "Forte colonial de 1855, cercado durante 97 dias em 1857 por El Hadj Omar Tall.",
      description:
        "A cerca de doze quilómetros de Kayes, na margem esquerda do Senegal, Médine foi a capital do reino de Khasso. Em 1855, o governador Faidherbe mandou construir ali um forte com o acordo do rei Diouka Sambala; em 1857, El Hadj Omar Tall cercou-o durante 97 dias, até à chegada das tropas francesas. Médine tornou-se depois sede de círculo antes de ser ofuscada por Kayes. O forte figura na lista indicativa do Mali para o Património Mundial da UNESCO.",
      tips: `${AV_PT} As paredes são frágeis: não suba às ruínas.`,
    },
    "chutes-du-felou": {
      name: "Cataratas de Félou",
      summary: "Rápidos e rochas esculpidas pelo rio Senegal, a 16 km de Kayes.",
      description:
        "A cerca de 16 quilómetros a sudeste de Kayes, o rio Senegal, com mais de um quilómetro de largura a montante, estreita-se e desce cerca de 14 metros por entre um caos de rochas polidas pela água. O caudal varia enormemente: alguns metros cúbicos por segundo no fim da estação seca, vários milhares no auge da cheia, em outubro. Uma central hidroelétrica está instalada junto a um canal de derivação.",
      tips: `${AV_PT} Não tome banho perto dos rápidos: a corrente é perigosa, sobretudo na cheia.`,
      bestPeriod: "De setembro a novembro, quando o rio está cheio",
    },
    "chutes-de-gouina": {
      name: "Cataratas de Gouina",
      summary: "Larga cortina de água do rio Senegal, a 80 km de Kayes.",
      description:
        "A cerca de 80 quilómetros a sudeste de Kayes, em direção a Bafoulabé, o rio Senegal, com várias centenas de metros de largura, cai mais de quinze metros numa larga cortina de água. A Organização para a Valorização do Rio Senegal (OMVS) iniciou ali, no final de 2013, a construção de uma barragem hidroelétrica, que altera o local.",
      tips: `${AV_PT} O local é isolado: informe-se sobre o estado da pista e o acesso às obras da barragem.`,
      bestPeriod: "De setembro a novembro, quando o rio está cheio",
    },
    "mamelon-de-sikasso": {
      name: "Mamelon de Sikasso",
      summary: "Colina artificial dos reis do Kénédougou, no centro da cidade.",
      description:
        "No coração de Sikasso, o Mamelon é uma colina artificial com cerca de trinta metros de altura, erguida na década de 1880 pelo rei Tiéba Traoré para sede dos soberanos do Kénédougou. No topo ergue-se a réplica de um edifício fortificado de dois pisos que servia de local de trabalho e de tribunal tradicional, destruído aquando da tomada da cidade pelos franceses. Lá de cima, a vista abrange toda a cidade.",
      tips: `${AV_PT} Use calçado adequado para a subida.`,
    },
    "tata-de-sikasso": {
      name: "Tata de Sikasso",
      summary: "Vestígios das muralhas de terra do reino do Kénédougou (final do século XIX).",
      description:
        "Construído entre 1877 e 1897 nos reinados de Tiéba e depois de Babemba Traoré para resistir aos ataques de Samory Touré, o tata de Sikasso tinha no seu apogeu três recintos, entre os quais uma muralha exterior com cerca de 9 quilómetros, 6 metros de espessura na base e 4 a 6 metros de altura. Subsistem panos de muralha em vários bairros da cidade, como Mancourani, Médine ou Wayerma. O tata figura na lista indicativa do Mali para o Património Mundial da UNESCO.",
      tips: `${AV_PT} Os vestígios estão dispersos pela cidade: um guia local ajuda a encontrá-los.`,
    },
    "grottes-de-missirikoro": {
      name: "Grutas de Missirikoro",
      summary: "Rochedo escavado de grutas, ao mesmo tempo mesquita e local de culto tradicional.",
      description:
        "A cerca de dez quilómetros a sudoeste de Sikasso, perto da aldeia do mesmo nome, Missirikoro é um monte de arenito com cerca de 80 metros de altura escavado de grutas. O local é ao mesmo tempo uma mesquita e um local de culto animista, daí o seu nome, que significa «velha mesquita» em bambara. As grutas abrigam várias espécies de morcegos.",
      tips: `${AV_PT} Local de culto: vestuário adequado; peça autorização antes de entrar ou fotografar.`,
    },
    "hombori-tondo": {
      name: "Hombori Tondo",
      summary: "Meseta de arenito de paredes verticais, ponto mais alto do Mali.",
      description:
        "Com cerca de 1155 metros de altitude, esta meseta de arenito de falésias abruptas domina a localidade de Hombori e a planície do Gourma: é o ponto mais alto do Mali. Os montes Hombori são também um sítio arqueológico, onde várias grutas terão sido habitadas há cerca de dois mil anos.",
      tips: `${AV_PT} Zona formalmente desaconselhada: não vá enquanto as fontes oficiais o desaconselharem.`,
    },
    "main-de-fatma-hombori": {
      name: "Mão de Fátima",
      summary: "Picos de arenito erguidos sobre a planície como os dedos de uma mão.",
      description:
        "Perto de Hombori, junto à estrada nacional para Gao, um maciço de arenito recorta-se em vários picos que lembram os dedos de uma mão: é a «Mão de Fátima». Visível de muito longe na planície do Gourma, este relevo espetacular foi um dos grandes locais de escalada da África Ocidental e continua a ser uma das imagens emblemáticas do Sahel maliano.",
      tips: `${AV_PT} Zona formalmente desaconselhada: não vá enquanto as fontes oficiais o desaconselharem.`,
    },
  },
  circuits: {},
  stepNotes: {},
};

const AR: SeedI18n = {
  guide: {
    intro:
      "في الوقت الحالي، تنصح السلطات الفرنسية والبريطانية بشكل قاطع بعدم السفر إلى مالي: يقدّم هذا الدليل تراثها للتحضير لإقامة حين تسمح الظروف بذلك. مالي، بلاد نهر النيجر ووريثة إمبراطوريات غانا ومالي والسونغاي، من أغنى بلدان غرب أفريقيا: عمارة جينيه وتمبكتو الطينية، وجرف باندياغارا وبلاد الدوغون، وضريح الأساكي في غاو، ومشهد موسيقي جاب العالم انطلاقًا من باماكو.",
    sections: [
      {
        title: "إجراءات الدخول",
        body: "يحتاج معظم المسافرين من خارج أفريقيا إلى تأشيرة. انسحبت مالي من المجموعة الاقتصادية لدول غرب أفريقيا (إيكواس) عام 2025، وتشكّل مع بوركينا فاسو والنيجر تحالف دول الساحل: ربما تغيّرت قواعد الدخول وقد تتغيّر مجددًا. تحقّق دائمًا من الشروط المحدّثة لدى سفارة مالي والمصادر الرسمية لبلدك قبل أي مشروع سفر: جواز سفر صالح لعدة أشهر بعد العودة، وتذكرة عودة، وعنوان الإقامة.",
      },
      {
        title: "الصحة",
        body: "تُشترط شهادة التطعيم ضد الحمى الصفراء عند الدخول. الملاريا منتشرة في جميع أنحاء البلاد، خصوصًا خلال موسم الأمطار وبعده: استشر طبيبًا أو مركزًا للتطعيمات الدولية بشأن علاج وقائي، واحمِ نفسك من البعوض. تقع البلاد ضمن «حزام التهاب السحايا»: استفسر عن التطعيم. اشرب المياه المعبأة واحمِ نفسك جيدًا من الحر. خارج باماكو، تبقى الخدمات الصحية محدودة جدًا.",
      },
      {
        title: "العملة والدفع",
        body: "العملة هي فرنك الاتحاد المالي الأفريقي (XOF)، المرتبط بسعر ثابت باليورو (1 يورو = 655,957 فرنكًا). النقود ضرورية؛ ولا تُقبل البطاقات المصرفية إلا في بعض الفنادق والمتاجر الكبرى في باماكو، وأجهزة الصراف الآلي نادرة في باقي البلاد. الدفع عبر الهاتف المحمول (موبايل موني) واسع الانتشار.",
      },
      {
        title: "متى تسافر",
        body: "أفضل فترة من نوفمبر إلى فبراير: موسم جاف ودرجات حرارة أكثر احتمالًا، مع رياح الهرمتان (ريح جافة محمّلة بالغبار). من مارس إلى مايو يصبح الحر خانقًا، وكثيرًا ما يتجاوز 40 درجة مئوية. يمتد موسم الأمطار تقريبًا من يونيو إلى سبتمبر، ويكون أطول وأغزر في الجنوب؛ وهو أيضًا موسم فيضان النيجر الذي يغمر الدلتا الداخلية حتى بداية الموسم الجاف.",
      },
      {
        title: "اللغات والعادات",
        body: "جعل دستور 2023 اللغاتِ الوطنية (البامبارا والفولانية والسوننكي والسونغاي والطماشق ولغات الدوغون، وغيرها) اللغاتِ الرسمية للبلاد؛ وأصبحت الفرنسية لغة عمل، ولا تزال مستخدمة على نطاق واسع في الإدارة والمدن. وتُعد البامبارا (بامانانكان) لغة مشتركة في جزء كبير من البلاد. التحيات، الطويلة والمقنّنة، أساسية قبل أي طلب. أغلب سكان مالي مسلمون: ارتدِ ملابس محتشمة، والتزم الهدوء أثناء الصلوات وفي رمضان. استأذن دائمًا قبل تصوير شخص أو مراسم أو مكان مقدّس.",
      },
      {
        title: "التنقل",
        body: "تقليديًا، كان التنقل بين المدن بالحافلات وسيارات الأجرة الريفية، وعلى نهر النيجر بقوارب «البيناس» أو بالسفن في موسم ارتفاع المياه. أما اليوم، فبحسب السلطات البريطانية، تتعرض الطرق الرئيسية لهجمات وحصار، لا سيما قوافل الوقود، والتنقل برًا خطير جدًا. لذلك لا يقترح هذا الدليل أي مسار: استعلم من المصادر الرسمية قبل أي مشروع سفر.",
      },
      {
        title: "الكهرباء والهاتف",
        body: "التيار 220 فولت، والمقابس من النوعين C وE (مقابس أوروبية). انقطاعات الكهرباء متكررة، بما في ذلك في باماكو. تتيح شريحة اتصال محلية (يُطلب إثبات الهوية) الوصول إلى الإنترنت عبر الهاتف وخدمة موبايل موني؛ والتغطية متفاوتة خارج المدن.",
      },
      {
        title: "الأمن",
        body: "الوضع الأمني متدهور جدًا. حتى تاريخ كتابة هذا الدليل (أكتوبر 2026)، تنصح وزارة الخارجية الفرنسية بشكل قاطع بعدم التوجه إلى مالي أيًا كان السبب، وتوصي الفرنسيين الموجودين فيها بمغادرتها مؤقتًا على الرحلات التجارية التي لا تزال متاحة. وتنصح وزارة الخارجية البريطانية بعدم السفر إطلاقًا إلى أي جزء من البلاد: إذ تشير إلى تهديد إرهابي مرتفع وخطر مرتفع للاختطاف، بما في ذلك في باماكو، وإلى حصار الطرق من قبل جماعات مسلحة. والمساعدة القنصلية محدودة جدًا. راجع نصائح السفر الصادرة عن وزارة الخارجية الفرنسية أو البريطانية (gov.uk) أو عن بلدك قبل أي مشروع سفر: هذا دليل للتراث، يُستخدم حين تكفّ هذه المصادر عن التحذير من السفر.",
      },
    ],
  },
  destinations: {
    bamako: {
      name: "باماكو",
      region: "مقاطعة باماكو",
      summary: "عاصمة على ضفاف النيجر، مدينة الموسيقى والأسواق والمتحف الوطني.",
      description:
        "تمتد باماكو على ضفتي نهر النيجر، وهي العاصمة وأكبر مدن البلاد بفارق كبير. تشتهر بمشهدها الموسيقي، مهد كثير من الفنانين المعروفين عالميًا، وبأسواقها المكتظة، وبمتحفها الوطني، أحد أجمل متاحف غرب أفريقيا. وتستضيف المدينة أيضًا «لقاءات باماكو»، البينالي المخصص للتصوير الفوتوغرافي الأفريقي. وكسائر البلاد، يُنصح المسافرون حاليًا بشكل قاطع بعدم التوجه إليها.",
    },
    segou: {
      name: "سيغو",
      region: "سيغو",
      summary: "العاصمة السابقة لمملكة البامبارا، على ضفاف النيجر.",
      description:
        "على ضفاف النيجر، كانت سيغو في القرن الثامن عشر عاصمة مملكة البامبارا التي أسسها بيتون كوليبالي. وتحتفظ المدينة بأرصفة نهرية نابضة بالحياة ومبانٍ من الحقبة الاستعمارية وتقاليد حرفية حية، من قماش البوغولان إلى الفخار. ومنذ منتصف العقد الأول من الألفية الثالثة، تستضيف «مهرجان على النيجر»، أحد أبرز المواعيد الثقافية في البلاد. وكسائر مالي، يُنصح المسافرون حاليًا بشكل قاطع بعدم التوجه إليها.",
    },
    djenne: {
      name: "جينيه",
      region: "موبتي",
      summary: "مدينة طينية مدرجة على قائمة اليونسكو، يعلوها أشهر مسجد من الطوب اللبن في العالم.",
      description:
        "على جزيرة في الدلتا الداخلية لنهر النيجر، تُعد جينيه من أقدم مدن أفريقيا جنوب الصحراء. منازلها من الطوب اللبن (البانكو) ومسجدها الكبير وموقع جينيه-جينو الأثري المجاور تشكّل «مدن جينيه القديمة»، المدرجة على قائمة التراث العالمي لليونسكو عام 1988 وعلى قائمة التراث المعرّض للخطر منذ 2016. وفي كل عام، يضبط تجديد طلاء المسجد الجماعي وسوق الاثنين الكبير إيقاع الحياة في المدينة. المنطقة غير مُستحسن السفر إليها إطلاقًا حاليًا.",
    },
    "pays-dogon": {
      name: "جرف باندياغارا (بلاد الدوغون)",
      region: "باندياغارا",
      summary: "جرف من الحجر الرملي يمتد أكثر من 150 كيلومترًا، وقرى الدوغون ومخازن الحبوب المعلّقة بالصخر.",
      description:
        "على طول جرف باندياغارا، بنى الدوغون قرى من الطين والحجر عند سفح الجرف وعلى منحدره، أسفل المساكن الكهفية القديمة المنسوبة إلى التلّم. المناظر المهيبة والعمارة والأقنعة ونظرية نشأة الكون جعلت من «جرف باندياغارا (بلاد الدوغون)» موقعًا مختلطًا، ثقافيًا وطبيعيًا، أُدرج على قائمة التراث العالمي لليونسكو عام 1989 وعلى قائمة التراث المعرّض للخطر عام 2023. تشهد المنطقة أعمال عنف مسلح، ويُنصح بشكل قاطع بعدم التوجه إليها.",
    },
    tombouctou: {
      name: "تمبكتو",
      region: "تمبكتو",
      summary: "مدينة أسطورية على أبواب الصحراء الكبرى، بمساجدها الطينية ومخطوطاتها.",
      description:
        "تأسست تمبكتو على حافة الصحراء الكبرى قرب نهر النيجر، وأصبحت في القرنين الخامس عشر والسادس عشر ملتقى كبيرًا للتجارة العابرة للصحراء ومركزًا للعلوم الإسلامية. مساجدها الثلاثة الكبرى، جينغاريبر وسنكوري وسيدي يحيى، وأضرحة أوليائها مدرجة على قائمة التراث العالمي لليونسكو منذ 1988 وعلى قائمة التراث المعرّض للخطر. وفي عام 2012 دمّرت جماعات مسلحة عددًا من الأضرحة، ثم أعاد بناءها بنّاؤون محليون بدعم من اليونسكو. منطقة يُنصح بشكل قاطع بعدم التوجه إليها.",
    },
    gao: {
      name: "غاو",
      region: "غاو",
      summary: "العاصمة السابقة لإمبراطورية السونغاي، عند منعطف النيجر.",
      description:
        "على الضفة اليسرى للنيجر، كانت غاو عاصمة إمبراطورية السونغاي التي هيمنت على جزء كبير من غرب أفريقيا في القرنين الخامس عشر والسادس عشر. وتحتفظ بضريح الأساكي، الهرم الطيني المدرج على قائمة التراث العالمي لليونسكو عام 2004 وعلى قائمة التراث المعرّض للخطر منذ 2012. وقبالة المدينة، ينعكس الكثيب الوردي على صفحة النهر. منطقة يُنصح بشكل قاطع بعدم التوجه إليها.",
    },
    mopti: {
      name: "موبتي",
      region: "موبتي",
      summary: "«بندقية مالي»، ميناء نهري عند ملتقى نهري النيجر وباني.",
      description:
        "بُنيت موبتي على الضفة اليمنى لنهر باني، قرب ملتقاه بنهر النيجر، وتُلقَّب بـ«بندقية مالي»: ففي موسم الفيضان، من أغسطس إلى ديسمبر تقريبًا، تتحول المدينة إلى مجموعة من الجزر الصغيرة تربط بينها السدود. كانت قرية بسيطة لصيادي البوزو ثم أصبحت ملتقى تجاريًا كبيرًا في الحقبة الاستعمارية، وتجمع البوزو والفولاني والبامبارا والدوغون والسونغاي حول مينائها وورش صناعة الزوارق ومسجدها الكبير المبني من الطين. وكانت بوابة الوصول إلى جينيه وبلاد الدوغون. المنطقة غير مُستحسن السفر إليها إطلاقًا حاليًا.",
    },
    kayes: {
      name: "كاي",
      region: "كاي",
      summary: "عاصمة استعمارية سابقة على نهر السنغال، وبوابة حصن مدينة والشلالات.",
      description:
        "في غرب البلاد، على نهر السنغال، كانت كاي في أواخر القرن التاسع عشر مقرّ مستعمرة السودان الفرنسي، قبل نقل العاصمة إلى باماكو في أوائل القرن العشرين. وهي نقطة الانطلاق نحو حصن مدينة، الشاهد على بدايات الاستعمار، ونحو شلالات فيلو وغوينا حيث يجتاز النهر عتبات صخرية. وكسائر البلاد، يُنصح حاليًا بشكل قاطع بعدم السفر إلى المنطقة.",
    },
    sikasso: {
      name: "سيكاسو",
      region: "سيكاسو",
      summary: "عاصمة مملكة كينيدوغو، في قلب الجنوب الأخضر.",
      description:
        "في جنوب البلاد الأكثر مطرًا وخضرة، كانت سيكاسو عاصمة مملكة كينيدوغو. أحاطها ملكاها تييبا ثم بابيمبا تراوري بسور منيع يُعرف بالتاتا، صمد أمام حصار ساموري توري قبل أن تستولي القوات الاستعمارية الفرنسية على المدينة عام 1898. وهي اليوم من أكثر مدن البلاد سكانًا، وسوق زراعية كبيرة للفواكه والخضروات. وكسائر البلاد، يُنصح حاليًا بشكل قاطع بعدم السفر إلى المنطقة.",
    },
    hombori: {
      name: "هومبوري",
      region: "دوينتزا",
      summary: "هضاب وإبر من الحجر الرملي تطل على سهل غورما، وفيها أعلى قمة في مالي.",
      description:
        "على الطريق بين موبتي وغاو، تقع بلدة هومبوري ذات البيوت الحجرية والأزقة الضيقة عند سفح جبال هومبوري، امتداد جرف باندياغارا. ويبلغ ارتفاع هومبوري توندو هناك نحو 1155 مترًا، وهو أعلى نقطة في البلاد، وكانت تضاريس مجاورة مثل «يد فاطمة» وإبر غامي تجتذب متسلقي الصخور. وتأوي منطقة غورما أيضًا فيلة من آخر فيلة الساحل. المنطقة غير مُستحسن السفر إليها إطلاقًا حاليًا.",
    },
  },
  places: {
    "musee-national-du-mali": {
      name: "المتحف الوطني لمالي",
      summary: "متحف كبير مخصص لآثار البلاد ومنسوجاتها وأقنعتها.",
      description:
        "يقع المتحف الوطني لمالي في مبنى مستوحى من العمارة السودانية، ويعرض أهم مجموعات البلاد: قطع أثرية (منها تماثيل من الطين المحروق من منطقة جينيه)، ومنسوجات مثل البوغولان، وأقنعة وتماثيل لمختلف الشعوب، وأدوات طقسية. وتجعله معارضه المؤقتة وحديقته من أبرز الأماكن الثقافية في باماكو.",
      tips: `${AV_AR} يجاور المتحف الحديقة الوطنية في باماكو، ويمكن زيارتهما معًا.`,
    },
    "parc-national-bamako": {
      name: "الحديقة الوطنية لمالي",
      summary: "حديقة حضرية واسعة على التلال، بممرات وبساتين.",
      description:
        "عند سفح التلال المطلة على المدينة، بجوار المتحف الوطني، تقدّم هذه الحديقة الحضرية التي أُنشئت في أواخر العقد الأول من الألفية الثالثة ممرات ظليلة وبساتين من النباتات المحلية وأماكن للاستراحة. متنفس أخضر يحبه سكان باماكو كثيرًا.",
      tips: `${AV_AR} احمل معك الماء وتعالَ في الصباح الباكر حين يكون الجو أبرد.`,
    },
    "grand-marche-bamako": {
      name: "السوق الكبير في باماكو",
      summary: "قلب المدينة التجاري، حول مبنى «السوق الوردي».",
      description:
        "في وسط المدينة، يشكّل السوق الكبير والشوارع المحيطة به حيًّا تجاريًا هائلًا: أقمشة وبازان، وبوغولان، وتوابل، ومجوهرات، وجلود، وأغراض يومية. والمبنى ذو الطراز السوداني الجديد الملقّب بـ«السوق الوردي» هو معلمه البارز. غوص في حركة العاصمة.",
      tips: `${AV_AR} في الأسواق، أبقِ أغراضك قريبة منك واستأذن قبل التصوير.`,
    },
    "grande-mosquee-bamako": {
      name: "المسجد الكبير في باماكو",
      summary: "مسجد بمئذنتين كبيرتين، من معالم وسط المدينة.",
      description:
        "بُني المسجد الكبير في باماكو في النصف الثاني من القرن العشرين، ويطل بمئذنتيه على وسط المدينة قرب السوق الكبير. وهو من أهم أماكن الصلاة في العاصمة، ويكتظ بالمصلين يوم الجمعة. يُشاهَد من الخارج.",
      tips: `${AV_AR} ارتدِ ملابس محتشمة؛ ولا تزره أثناء الصلوات.`,
    },
    "festival-sur-le-niger-segou": {
      name: "مهرجان على النيجر",
      summary: "موسيقى وفنون وثقافة على ضفاف النهر، عادةً في فبراير.",
      description:
        "أُطلق «مهرجان على النيجر» في منتصف العقد الأول من الألفية الثالثة، ويجمع كل عام على ضفاف سيغو موسيقيين ماليين وأفارقة ومعارض فنية وعروض دمى ولقاءات حول ثقافات النهر. وقد أصبح من أبرز الفعاليات الثقافية في البلاد.",
      tips: `${AV_AR} تتوقف المواعيد، بل وإقامة المهرجان نفسها، على الظروف: راجع الإعلانات الرسمية للمنظمين.`,
      bestPeriod: "عادةً في فبراير",
    },
    "segou-koro": {
      name: "سيغو-كورو",
      summary: "قرية بيتون كوليبالي التاريخية، بمساجدها الطينية.",
      description:
        "على بعد بضعة كيلومترات من سيغو، على ضفة النهر، تُعد سيغو-كورو («سيغو القديمة») مهد مملكة البامبارا. وتحتفظ القرية بمساجد من الطوب اللبن وبموقع تخليد ذكرى بيتون كوليبالي، مؤسس المملكة. زيارة تتم برفقة مرشد محلي ومع احترام أعراف القرية.",
      tips: `${AV_AR} حيِّ زعيم القرية أو ممثليه قبل الزيارة، كما تقتضي العادة.`,
    },
    "poteries-de-kalabougou": {
      name: "خزّافات كالابوغو",
      summary: "قرية الخزّافات على الضفة الأخرى للنيجر، قبالة سيغو.",
      description:
        "على الضفة المقابلة لنهر النيجر، تشتهر قرية كالابوغو بخزّافاتها اللواتي يشكّلن الجرار والأواني بأيديهن ثم يحرقنها في الهواء الطلق، وفق تقنيات متوارثة جيلًا بعد جيل. لقاء مع مهارة عريقة.",
      tips: `${AV_AR} استأذن دائمًا قبل التصوير؛ وشراء قطعة هو أفضل وسيلة لدعم الحرفيات.`,
    },
    "grande-mosquee-djenne": {
      name: "المسجد الكبير في جينيه",
      summary: "تحفة العمارة السودانية الساحلية، وأكبر مبنى من الطوب اللبن في العالم.",
      description:
        "أُعيد بناء المسجد الكبير في جينيه عام 1907 في موضع مسجد أقدم بكثير، وهو رمز مالي. جدرانه من البانكو المرصّعة بالعوارض الخشبية (التورون)، وأبراج واجهته الثلاثة ودعاماته، تجعل منه رمز العمارة السودانية الساحلية. ويطل على ساحة السوق. الدخول إلى داخله مقصور على المصلين المسلمين.",
      tips: `${AV_AR} مبنى ديني: تأمّله من الساحة واحترم أوقات الصلاة.`,
    },
    "crepissage-mosquee-djenne": {
      name: "تجديد طلاء المسجد الكبير",
      summary: "كل عام، تتجنّد المدينة بأكملها لكسوة المسجد بطبقة طين جديدة.",
      description:
        "تُتلف الأمطار الجدران الطينية: لذا يُعدّ سكان جينيه كل عام، قبل موسم الأمطار، خليطًا من البانكو ويتناوبون في احتفال جماعي كبير على إعادة طلاء المسجد. وتتنافس الأحياء في الحماسة على وقع الطبول. تقليد حي يضمن بقاء المعلم.",
      tips: `${AV_AR} يُحدَّد الموعد محليًا كل عام.`,
      bestPeriod: "مرة في السنة، قبل موسم الأمطار (يُحدَّد الموعد محليًا)",
    },
    "marche-du-lundi-djenne": {
      name: "سوق الاثنين",
      summary: "سوق أسبوعي كبير عند سفح المسجد، يستقطب المنطقة بأسرها.",
      description:
        "كل يوم اثنين، تمتلئ الساحة أمام المسجد الكبير بالبسطات: يأتي التجار والرعاة والمزارعون من قرى الدلتا لبيع الحبوب والسمك المجفف والتوابل والأقمشة والفخار والماشية. ومشهد السوق أمام واجهة المسجد من أشهر صور مالي.",
      tips: `${AV_AR} استأذن قبل تصوير التجار.`,
      bestPeriod: "يوم الاثنين",
    },
    "djenne-djeno": {
      name: "جينيه-جينو",
      summary: "الموقع الأثري للمدينة القديمة، من أقدم مدن غرب أفريقيا.",
      description:
        "على بعد بضعة كيلومترات من المدينة الحالية، يحتفظ تل جينيه-جينو («جينيه القديمة») ببقايا مدينة مأهولة منذ القرون الأخيرة قبل الميلاد. وكشفت الحفريات عن تجمّع حضري وتجاري قديم جدًا، وعن تماثيل صغيرة من الطين المحروق نالت شهرة واسعة. والموقع، الهش والمحمي، جزء من ممتلك اليونسكو.",
      tips: `${AV_AR} موقع أثري محمي: لا تلتقط شيئًا، فنهب التماثيل الطينية آفة حقيقية.`,
    },
    "falaise-de-bandiagara": {
      name: "جرف باندياغارا",
      summary: "جرف مذهل يطل على سهل سينو.",
      description:
        "على امتداد أكثر من 150 كيلومترًا، يفصل الجرف الرملي هضبة باندياغارا عن سهل سينو. ركام صخري وأخاديد وينابيع ونباتات متشبثة بالجدران الصخرية ترسم مشهدًا آسرًا، طالما جابه المتنزهون سيرًا على الأقدام من قرية إلى أخرى.",
      tips: `${AV_AR} تشهد المنطقة أعمال عنف مسلح: لا تتوجه إليها ما دامت المصادر الرسمية تنصح بعدم ذلك.`,
      bestPeriod: "من نوفمبر إلى فبراير (الموسم الجاف والمعتدل)",
    },
    "villages-dogon": {
      name: "قرى الدوغون",
      summary: "منازل طينية، ومخازن حبوب بأسقف من القش، والتوغونا، مظلة الاجتماعات.",
      description:
        "تنتظم قرى الدوغون حول التوغونا، وهي مظلة منخفضة بسقف سميك من سيقان الدخن يجتمع تحتها الرجال، وحول بيت الهوغون (الزعيم الديني) ومخازن حبوب لا تُحصى تعلوها أسقف من القش. وفي الأعلى، داخل الجدار الصخري، لا تزال قائمة المساكن ومخازن الحبوب القديمة المنسوبة إلى التلّم. عمارة لا تنفصل عن نظرية الدوغون في نشأة الكون.",
      tips: `${AV_AR} الأماكن المقدسة في القرى ممنوعة على الزوار: تتم الزيارة دائمًا برفقة مرشد من القرية.`,
    },
    "masques-dogon": {
      name: "أقنعة الدوغون",
      summary: "رقصات الأقنعة المرتبطة بالطقوس الجنائزية والمراسم الكبرى.",
      description:
        "تظهر أقنعة الدوغون، ومنها قناع «الكاناغا» الشهير، خلال مراسم «الداما» الجنائزية التي ترافق الموتى إلى عالم الأسلاف، وخلال الطقوس الجماعية الكبرى. ورقصها على وقع الطبول من أقوى تعبيرات ثقافة الدوغون. وتحدّد المجتمعات نفسها مواعيد المراسم.",
      tips: `${AV_AR} المراسم طقوس وليست عروضًا: لا تحضرها إلا بدعوة ووفق القواعد التي تضعها القرية.`,
    },
    "mosquee-djingareyber": {
      name: "مسجد جينغاريبر",
      summary: "المسجد الطيني الكبير من القرن الرابع عشر، المرتبط بالإمبراطور منسا موسى.",
      description:
        "بُني جينغاريبر في القرن الرابع عشر، بعد عودة إمبراطور مالي منسا موسى (كانكو موسى) من الحج إلى مكة، ويُنسب إلى المعماري الأندلسي أبي إسحاق الساحلي، وهو أقدم المساجد الكبرى في تمبكتو. جدرانه من البانكو ومئذنته المخروطية وعوارضه الخشبية البارزة تجسّد العمارة الطينية الساحلية؛ ويتعهّده بنّاؤو المدينة بالصيانة بانتظام.",
      tips: `${AV_AR} يُنصح بشكل قاطع بعدم التوجه إلى منطقة تمبكتو.`,
    },
    "mosquee-sankore": {
      name: "مسجد سنكوري",
      summary: "مسجد ومركز تعليم قديم، رمز للإشعاع العلمي للمدينة.",
      description:
        "في شمال المدينة، كان مسجد سنكوري في القرنين الخامس عشر والسادس عشر من أكبر مراكز التعليم في تمبكتو، حيث درّس العلماء الفقه وعلوم الدين والنحو والفلك. وهيئته الهرمية المدرّجة من صور المدينة المميزة.",
      tips: `${AV_AR} يُنصح بشكل قاطع بعدم التوجه إلى منطقة تمبكتو.`,
    },
    "manuscrits-de-tombouctou": {
      name: "مخطوطات تمبكتو",
      summary: "مئات آلاف المخطوطات يحفظها معهد أحمد بابا والمكتبات العائلية.",
      description:
        "حافظت تمبكتو على تراث مكتوب استثنائي: مخطوطات بالعربية وبلغات أفريقية مكتوبة بالحرف العربي، تتناول الدين والفقه والعلوم والطب والتجارة. يحفظ جزءًا منها معهد أحمد بابا للدراسات العليا والبحوث الإسلامية، والباقي في مكتبات عائلية. وفي 2012-2013، نُقل جزء كبير من المخطوطات إلى باماكو حفاظًا عليها، فيما أُتلف بعضها.",
      tips: `${AV_AR} نُقلت المجموعات جزئيًا: استعلم عمّا يمكن الاطلاع عليه وأين.`,
    },
    "tombeau-des-askia": {
      name: "ضريح الأساكي",
      summary: "هرم طيني من أواخر القرن الخامس عشر، مدفن الإمبراطور أسكيا محمد.",
      description:
        "شيّد إمبراطور السونغاي أسكيا محمد هذا الضريح في أواخر القرن الخامس عشر بعد عودته من مكة، وهو هرم مهيب من البانكو مرصّع بالعوارض الخشبية، ومن أكبر المعالم الطينية في المنطقة. ويضم المجمع أيضًا مسجدين بسقف مسطح ومقبرة وساحة للصلاة. ويشهد على قوة الإمبراطورية وعلى انتشار العمارة الطينية الساحلية.",
      tips: `${AV_AR} يُنصح بشكل قاطع بعدم التوجه إلى منطقة غاو.`,
    },
    "dune-rose-gao": {
      name: "الكثيب الوردي",
      summary: "كثيب رملي كبير بانعكاسات وردية، على الضفة المقابلة للنيجر.",
      description:
        "على الضفة اليمنى للنهر، قبالة غاو، يكتسي كثيب رملي كبير ألوانًا وردية عند الشروق والغروب. ومن قمته، يمتد المشهد ليشمل النيجر والمدينة. نزهة تقليدية لسكان غاو.",
      tips: `${AV_AR} يُنصح بشكل قاطع بعدم التوجه إلى منطقة غاو.`,
    },
    "cathedrale-sacre-coeur-bamako": {
      name: "كاتدرائية القلب الأقدس في باماكو",
      summary: "كاتدرائية كاثوليكية في وسط المدينة، اكتمل بناؤها عام 1936.",
      description:
        "في قلب باماكو، تُعد كاتدرائية القلب الأقدس مقرّ أبرشية باماكو. وُضع حجر أساسها عام 1925، وفُتحت للعبادة بعد عامين، واكتمل بناؤها عام 1936، وظلت حتى عام 1957 مكان العبادة الكاثوليكي الرسمي الوحيد في المدينة. وهي مدرجة منذ عام 2017 على القائمة التمهيدية لمالي للتراث العالمي لليونسكو، شاهدةً على الحضور المسيحي في بلد غالبيته العظمى من المسلمين.",
      tips: `${AV_AR} مكان عبادة: ارتدِ لباسًا لائقًا والتزم الهدوء أثناء القداديس.`,
    },
    "kamablon-kangaba": {
      name: "الكوخ المقدس في كانغابا (كامابلون)",
      summary: "الكوخ المقدس لمنطقة ماندين، يُجدَّد سقفه من القش كل سبع سنوات.",
      description:
        "في كانغابا، جنوب غرب باماكو، يُعد الكامابلون («دهليز الكلمة») كوخًا دائريًا من الطين مسقوفًا بالقش، شُيّد وفق الرواية التقليدية عام 1653، ويُعتبر آخر كوخ من نوعه في المجال الثقافي لماندين، مهد إمبراطورية مالي. وكل سبع سنوات، يُقام بمناسبة تجديد سقفه احتفال يدوم عدة أيام يقوده آل كيتا، أحفاد سونجاتا، ورواة الغريو من آل دياباتي الذين يتلون فيه تاريخ ماندين، وقد أُدرجت هذه الطقوس عام 2009 في قائمة التراث الثقافي غير المادي لليونسكو. كما أن المواقع التاريخية لماندين مدرجة على القائمة التمهيدية لمالي.",
      tips: `${AV_AR} مكان مقدس: لا يُقترب منه إلا بموافقة السلطات التقليدية ووفق قواعدها.`,
    },
    "sangha-pays-dogon": {
      name: "سانغا",
      summary: "بلدة على حافة الهضبة، تُعد العاصمة الثقافية لبلاد الدوغون.",
      description:
        "على حافة هضبة باندياغارا، تضم سانغا نحو عشر قرى متقاربة، منها أوغول العليا وأوغول السفلى، وتُعتبر العاصمة الثقافية لبلاد الدوغون. أجرى فيها عالم الإثنولوجيا مارسيل غريول أبحاثه في ثلاثينيات القرن العشرين، وصوّر فيها المخرج سليمان سيسي جزءًا من فيلمه «يلين». ومنها كانت المسالك تنحدر على الجرف نحو قرى مثل إيريلي وباناني وتيريلي.",
      tips: `${AV_AR} المنطقة تشهد أعمال عنف مسلح: لا تتوجه إليها ما دامت المصادر الرسمية تنصح بعدم السفر.`,
    },
    "mosquee-sidi-yahia": {
      name: "مسجد سيدي يحيى",
      summary: "مسجد من القرن الخامس عشر، ثالث المساجد الكبرى في تمبكتو.",
      description:
        "بدأ بناء مسجد سيدي يحيى نحو عام 1400 واكتمل نحو عام 1440، ويحمل اسم إمامه الأول سيدي يحيى التادلسي، الذي يُبجَّل وليًّا ودُفن فيه. ويشكّل مع جينغاريبر وسانكوري مجموعة المساجد الكبرى التي صنعت إشعاع المدينة العلمي، وهي مدرجة على قائمة التراث العالمي. أُعيد تشكيله إلى حد كبير عام 1939، وتضرر على أيدي جماعات مسلحة في يوليو 2012، ثم رُمِّم بإشراف اليونسكو.",
      tips: `${AV_AR} يُنصح بشكل قاطع بعدم التوجه إلى منطقة تمبكتو.`,
    },
    "mosquee-komoguel-mopti": {
      name: "المسجد الكبير في موبتي (كوموغيل)",
      summary: "مسجد طيني على الطراز السوداني من ثلاثينيات القرن العشرين، رُمِّم بالتقنيات التقليدية.",
      description:
        "استُلهم مسجد حي كوموغيل من المسجد الكبير في جينيه، وبُني من الطين في ثلاثينيات القرن العشرين مكان مسجد يعود إلى عام 1908. وقد كُسي بالإسمنت عام 1978 ثم عام 2003 فأخذ يتدهور، إلى أن أعاد إليه ترميمٌ أُنجز بين 2004 و2006 بالتعاون مع صندوق الآغا خان للثقافة طلاءه الطيني ومهاراته التقليدية. وهو مصنف تراثًا وطنيًا منذ عام 2005، ومدرج على القائمة التمهيدية لمالي للتراث العالمي لليونسكو.",
      tips: `${AV_AR} الداخل مخصص للمصلين: شاهد المسجد من الخارج واحترم أوقات الصلاة.`,
    },
    "port-de-mopti": {
      name: "ميناء موبتي",
      summary: "ميناء نهري نابض بالحياة ترسو فيه المراكب والزوارق.",
      description:
        "على نهر باني، يُعد الميناء القلب النابض لموبتي: مراكب «البيناس» المحمّلة بالبضائع والركاب، وزوارق صيادي البوزو، وورش تُصنع فيها المراكب يدويًا. وكانت ألواح الملح القادمة من تاوديني عبر النهر تُفرَّغ هنا وتُباع بالتجزئة. مشهد دائم على ضفة الماء، لا سيما في آخر النهار.",
      tips: `${AV_AR} استأذن قبل تصوير الناس، وأبقِ أغراضك قريبة منك وسط الزحام.`,
    },
    hamdallahi: {
      name: "حمد الله",
      summary: "أطلال عاصمة إمبراطورية ماسينا الفولانية، التي أُسست عام 1818.",
      description:
        "على بُعد نحو أربعين كيلومترًا جنوب موبتي، أسس الشيخ أحمدو حمد الله عام 1818 لتكون عاصمة إمبراطورية ماسينا الفولانية. كانت المدينة محاطة بسور يزيد طوله على خمسة كيلومترات، وتضم مسجدًا كبيرًا وعددًا كبيرًا جدًا من المدارس القرآنية. استولى عليها الحاج عمر تال عام 1862، ثم آلت إلى الخراب. والمدينة التاريخية مصنفة تراثًا وطنيًا ومدرجة على القائمة التمهيدية لمالي لدى اليونسكو، وقد تضرر ضريح الشيخ أحمدو على أيدي جماعات مسلحة خلال النزاع.",
      tips: `${AV_AR} وسط مالي يشهد أعمال عنف مسلح.`,
    },
    "fort-de-medine": {
      name: "حصن مدينة",
      summary: "حصن استعماري من عام 1855، حاصره الحاج عمر تال 97 يومًا عام 1857.",
      description:
        "على بُعد نحو اثني عشر كيلومترًا من كاي، على الضفة اليسرى لنهر السنغال، كانت مدينة عاصمة مملكة خاسو. وفي عام 1855 أمر الحاكم فيدرب ببناء حصن فيها بموافقة الملك ديوكا سامبالا، وفي عام 1857 حاصره الحاج عمر تال مدة 97 يومًا حتى وصول القوات الفرنسية. ثم أصبحت مدينة مركز دائرة قبل أن تطغى عليها كاي. والحصن مدرج على القائمة التمهيدية لمالي للتراث العالمي لليونسكو.",
      tips: `${AV_AR} الجدران هشة: لا تتسلق الأطلال.`,
    },
    "chutes-du-felou": {
      name: "شلالات فيلو",
      summary: "منحدرات مائية وصخور نحتها نهر السنغال، على بُعد 16 كم من كاي.",
      description:
        "على بُعد نحو 16 كيلومترًا جنوب شرق كاي، يضيق نهر السنغال الذي يتجاوز عرضه كيلومترًا واحدًا عند المنبع، وينحدر نحو 14 مترًا عبر ركام من الصخور التي صقلتها المياه. ويتفاوت تدفق المياه تفاوتًا كبيرًا: بضعة أمتار مكعبة في الثانية في نهاية موسم الجفاف، وعدة آلاف في ذروة الفيضان في أكتوبر. وتقع محطة كهرومائية على ضفة قناة تحويل.",
      tips: `${AV_AR} لا تسبح قرب المنحدرات: التيار خطير، خاصة في موسم الفيضان.`,
      bestPeriod: "من سبتمبر إلى نوفمبر، حين يكون منسوب النهر مرتفعًا",
    },
    "chutes-de-gouina": {
      name: "شلالات غوينا",
      summary: "ستارة مائية عريضة لنهر السنغال، على بُعد 80 كم من كاي.",
      description:
        "على بُعد نحو 80 كيلومترًا جنوب شرق كاي، في اتجاه بافولابي، يسقط نهر السنغال الذي يبلغ عرضه عدة مئات من الأمتار من ارتفاع يزيد على خمسة عشر مترًا في ستارة مائية عريضة. وقد بدأت منظمة استثمار نهر السنغال في أواخر عام 2013 بناء سد كهرومائي هناك، مما يغيّر معالم الموقع.",
      tips: `${AV_AR} الموقع معزول: استعلم عن حالة الطريق والوصول إلى ورشة السد.`,
      bestPeriod: "من سبتمبر إلى نوفمبر، حين يكون منسوب النهر مرتفعًا",
    },
    "mamelon-de-sikasso": {
      name: "تلة سيكاسو (مامولون)",
      summary: "تلة اصطناعية لملوك كينيدوغو في وسط المدينة.",
      description:
        "في قلب سيكاسو، تُعد «المامولون» تلة اصطناعية يبلغ ارتفاعها نحو ثلاثين مترًا، أقامها الملك تييبا تراوري في ثمانينيات القرن التاسع عشر لتكون مجلس ملوك كينيدوغو. وعلى قمتها نسخة طبق الأصل من مبنى محصّن من طابقين كان مقرًا للعمل ومحكمة تقليدية، دُمّر عند استيلاء الفرنسيين على المدينة. ومن أعلاها يمتد المشهد على المدينة كلها.",
      tips: `${AV_AR} انتعل حذاءً مناسبًا للصعود.`,
    },
    "tata-de-sikasso": {
      name: "تاتا سيكاسو",
      summary: "بقايا الأسوار الطينية لمملكة كينيدوغو (أواخر القرن التاسع عشر).",
      description:
        "بُني تاتا سيكاسو بين عامي 1877 و1897 في عهد تييبا ثم بابيمبا تراوري لصدّ هجمات ساموري توري، وكان يضم في أوج عزه ثلاثة أسوار، منها سور خارجي يبلغ طوله نحو 9 كيلومترات وسماكته 6 أمتار عند القاعدة وارتفاعه من 4 إلى 6 أمتار. ولا تزال أجزاء من الأسوار قائمة في عدة أحياء من المدينة، مثل مانكوراني ومدينة وواييرما. والتاتا مدرج على القائمة التمهيدية لمالي للتراث العالمي لليونسكو.",
      tips: `${AV_AR} البقايا متفرقة في أنحاء المدينة: يساعد مرشد محلي على العثور عليها.`,
    },
    "grottes-de-missirikoro": {
      name: "كهوف ميسيريكورو",
      summary: "صخرة تتخللها كهوف، هي في آن واحد مسجد ومكان عبادة تقليدي.",
      description:
        "على بُعد نحو عشرة كيلومترات جنوب غرب سيكاسو، قرب القرية التي تحمل الاسم نفسه، تُعد ميسيريكورو تلة من الحجر الرملي يبلغ ارتفاعها نحو 80 مترًا وتتخللها الكهوف. والمكان مسجد ومكان عبادة إحيائي في آن واحد، ومن هنا اسمه الذي يعني «المسجد القديم» بلغة البامبارا. وتأوي الكهوف أنواعًا عدة من الخفافيش.",
      tips: `${AV_AR} مكان عبادة: ارتدِ لباسًا لائقًا واستأذن قبل الدخول أو التصوير.`,
    },
    "hombori-tondo": {
      name: "هومبوري توندو",
      summary: "هضبة من الحجر الرملي ذات جدران عمودية، أعلى نقطة في مالي.",
      description:
        "يبلغ ارتفاع هذه الهضبة الرملية ذات الجروف الشاهقة نحو 1155 مترًا، وهي تطل على بلدة هومبوري وسهل غورما، وتُعد أعلى نقطة في مالي. وجبال هومبوري موقع أثري أيضًا، إذ يُرجَّح أن عدة كهوف فيها كانت مأهولة قبل نحو ألفي عام.",
      tips: `${AV_AR} منطقة يُنصح بشكل قاطع بعدم السفر إليها: لا تتوجه إليها ما دامت المصادر الرسمية تنصح بذلك.`,
    },
    "main-de-fatma-hombori": {
      name: "يد فاطمة",
      summary: "قمم من الحجر الرملي ترتفع فوق السهل كأصابع اليد.",
      description:
        "قرب هومبوري، على جانب الطريق الوطني المؤدي إلى غاو، تنقسم كتلة من الحجر الرملي إلى عدة قمم تشبه أصابع اليد: إنها «يد فاطمة». وهذه التضاريس المذهلة التي تُرى من بعيد في سهل غورما كانت من أبرز مواقع تسلق الصخور في غرب أفريقيا، ولا تزال من الصور الرمزية للساحل المالي.",
      tips: `${AV_AR} منطقة يُنصح بشكل قاطع بعدم السفر إليها: لا تتوجه إليها ما دامت المصادر الرسمية تنصح بذلك.`,
    },
  },
  circuits: {},
  stepNotes: {},
};

export const MALI_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
