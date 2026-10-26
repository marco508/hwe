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
  },
  circuits: {},
  stepNotes: {},
};

export const MALI_I18N: Record<SeedLang, SeedI18n> = { es: ES, pt: PT, ar: AR };
