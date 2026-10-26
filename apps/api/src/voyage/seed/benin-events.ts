/**
 * Fêtes, jours fériés, festivals et temps forts saisonniers (benin).
 * Voir SeedEvent (./types). Contenu non relu : `reviewed = false`.
 *
 * Base légale des jours fériés : loi n° 90-019 du 27 juillet 1990 fixant les fêtes légales
 * en République du Bénin (modifiée), et loi n° 2024-32 du 2 septembre 2024 fixant la fête annuelle
 * des religions traditionnelles (deuxième vendredi de janvier + jeudi qui précède). Les fêtes
 * musulmanes sont déclarées chaque année par communiqué du ministère du Travail et de la Fonction
 * publique ; un férié tombant un dimanche n'est pas reporté (pas de règle de report en vigueur).
 */

import type { SeedEvent } from "./types";

const LOI_FERIES = [
  "https://lepetitjournal.com/cotonou/jours-feries-benin-295464",
  "https://en.wikipedia.org/wiki/Public_holidays_in_Benin",
  "https://beninwebtv.bj/benin-la-journee-du-lundi-9-juin-2025-declaree-feriee-chomee-et-payee/",
];

export const BENIN_EVENTS: SeedEvent[] = [
  // ───────────── Jours fériés légaux ─────────────
  {
    slug: "nouvel-an-benin",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 1, day: 1 },
    sources: LOI_FERIES,
    name: "Jour de l'An",
    summary: "Premier jour de l'année, férié et chômé dans tout le pays.",
    description:
      "Le 1er janvier clôt la grande saison des fêtes de fin d'année : la nuit de la Saint-Sylvestre est très animée à Cotonou, dans les églises (veillées de prière), les maquis et sur les plages. Le jour même, on rend visite à la famille et aux aînés pour présenter ses vœux. C'est aussi le début d'une période chargée pour les voyageurs, quelques jours avant les Vodun Days de Ouidah.",
    tips: "Administrations, banques et de nombreux commerces sont fermés ; prévoyez des espèces la veille. Les transports sont très sollicités autour du 31 décembre.",
    where: "Dans tout le pays",
    dateNote: "Chaque année le 1er janvier (loi n° 90-019 du 27 juillet 1990).",
    en: {
      name: "New Year's Day",
      summary: "The first day of the year, a public holiday nationwide.",
      description:
        "1 January closes the long end-of-year festive season: New Year's Eve is very lively in Cotonou, in churches (prayer vigils), in maquis and on the beaches. On the day itself, people visit family and elders to offer their wishes. It is also the start of a busy period for travellers, a few days before Ouidah's Vodun Days.",
      tips: "Government offices, banks and many shops are closed; get cash the day before. Transport is in high demand around 31 December.",
      where: "Nationwide",
      dateNote: "Every year on 1 January (Law No. 90-019 of 27 July 1990).",
    },
    i18n: {
      es: {
        name: "Año Nuevo",
        summary: "Primer día del año, festivo en todo el país.",
        description:
          "El 1 de enero cierra la gran temporada de fiestas de fin de año: la Nochevieja es muy animada en Cotonou, en las iglesias (vigilias de oración), en los maquis y en las playas. Ese día se visita a la familia y a los mayores para felicitarles el año. También empieza un periodo de mucha afluencia para los viajeros, pocos días antes de los Vodun Days de Ouidah.",
        tips: "Administraciones, bancos y muchos comercios cierran; saque efectivo la víspera. El transporte está muy solicitado en torno al 31 de diciembre.",
        where: "En todo el país",
        dateNote: "Cada año el 1 de enero (ley n.º 90-019 de 27 de julio de 1990).",
      },
      pt: {
        name: "Dia de Ano Novo",
        summary: "Primeiro dia do ano, feriado em todo o país.",
        description:
          "O 1 de janeiro encerra a grande época de festas de fim de ano: a noite de passagem de ano é muito animada em Cotonou, nas igrejas (vigílias de oração), nos maquis e nas praias. No próprio dia, visita-se a família e os mais velhos para apresentar votos. É também o início de um período muito procurado pelos viajantes, poucos dias antes dos Vodun Days de Ouidah.",
        tips: "Serviços públicos, bancos e muitas lojas estão fechados; levante dinheiro na véspera. Os transportes estão muito procurados por volta de 31 de dezembro.",
        where: "Em todo o país",
        dateNote: "Todos os anos a 1 de janeiro (lei n.º 90-019 de 27 de julho de 1990).",
      },
      ar: {
        name: "رأس السنة الميلادية",
        summary: "أول أيام السنة، عطلة رسمية في جميع أنحاء البلاد.",
        description:
          "يختتم الأول من يناير موسم أعياد نهاية السنة الطويل: فليلة رأس السنة صاخبة جدًا في كوتونو، في الكنائس (سهرات الصلاة) والمطاعم الشعبية (الماكي) وعلى الشواطئ. وفي اليوم نفسه يزور الناس العائلة وكبار السن لتقديم التهاني. وهو أيضًا بداية فترة مزدحمة للمسافرين، قبل أيام قليلة من «أيام الفودون» في ويدا.",
        tips: "تُغلق الإدارات والمصارف وكثير من المتاجر؛ جهّز النقود في اليوم السابق. ويشتد الطلب على وسائل النقل حول 31 ديسمبر.",
        where: "في جميع أنحاء البلاد",
        dateNote: "كل عام في الأول من يناير (القانون رقم 90-019 المؤرخ 27 يوليو 1990).",
      },
    },
  },
  {
    slug: "fete-religions-traditionnelles-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    destination: "ouidah",
    rule: { type: "nth-weekday", month: 1, weekday: 5, nth: 2 },
    cover: "/images/voyage/fete-fete-religions-traditionnelles-benin",
    sources: [
      "https://lanouvelletribune.info/2026/01/fete-du-vodun-au-benin-de-la-journee-unique-a-un-format-elargi/",
      "https://beninwebtv.bj/benin-les-deputes-votent-une-nouvelle-date-de-celebration-de-la-fete-du-vodoun/",
      "https://en.wikipedia.org/wiki/Public_holidays_in_Benin",
      "https://lepetitjournal.com/cotonou/jours-feries-benin-295464",
    ],
    name: "Fête des religions traditionnelles (fête du vodun)",
    summary: "La grande fête nationale du vodun et des cultes endogènes, deux jours fériés en janvier.",
    description:
      "Le Bénin est l'un des rares pays à consacrer un jour férié à ses religions traditionnelles. Longtemps célébrée le 10 janvier, la fête a été déplacée par la loi n° 2024-32 au deuxième vendredi de janvier, le jeudi qui précède étant lui aussi férié, chômé et payé. Dans tout le sud, couvents, temples et places vodun s'animent : libations, sacrifices, danses, sorties de masques Egungun et Zangbeto. Le cœur des célébrations est Ouidah, où se tiennent les Vodun Days, mais Porto-Novo, Abomey, Allada ou Grand-Popo ont aussi leurs cérémonies.",
    tips: "Demandez toujours l'autorisation avant de photographier un adepte ou une cérémonie, ne touchez ni les masques ni les autels, et suivez les consignes des dignitaires. Administrations et nombreux commerces sont fermés les deux jours.",
    dateNote: "Deuxième vendredi de janvier, et le jeudi qui le précède, également férié (loi n° 2024-32 du 2 septembre 2024). Jusqu'en 2024 : le 10 janvier. En 2026 : jeudi 8 et vendredi 9 janvier.",
    en: {
      name: "Traditional Religions Day (Vodun Festival)",
      summary: "The great national festival of vodun and indigenous faiths, with two public holidays in January.",
      description:
        "Benin is one of the few countries to dedicate a public holiday to its traditional religions. Long celebrated on 10 January, the festival was moved by Law No. 2024-32 to the second Friday of January, with the preceding Thursday also a paid public holiday. Across the south, convents, temples and vodun squares come alive: libations, sacrifices, dances, and Egungun and Zangbeto masks coming out. The heart of the celebrations is Ouidah, home to the Vodun Days, but Porto-Novo, Abomey, Allada and Grand-Popo also hold their own ceremonies.",
      tips: "Always ask permission before photographing a devotee or a ceremony, never touch masks or altars, and follow the dignitaries' instructions. Government offices and many shops are closed on both days.",
      dateNote: "Second Friday of January, plus the preceding Thursday, also a public holiday (Law No. 2024-32 of 2 September 2024). Until 2024: 10 January. In 2026: Thursday 8 and Friday 9 January.",
    },
    i18n: {
      es: {
        name: "Fiesta de las religiones tradicionales (fiesta del vudú)",
        summary: "La gran fiesta nacional del vudú y de los cultos endógenos, con dos días festivos en enero.",
        description:
          "Benín es uno de los pocos países que dedica un día festivo a sus religiones tradicionales. Celebrada durante mucho tiempo el 10 de enero, la fiesta se trasladó por la ley n.º 2024-32 al segundo viernes de enero, y el jueves anterior también es festivo y retribuido. En todo el sur, conventos, templos y plazas vudú se animan: libaciones, sacrificios, danzas y salidas de las máscaras Egungun y Zangbeto. El corazón de las celebraciones es Ouidah, sede de los Vodun Days, pero Porto-Novo, Abomey, Allada o Grand-Popo también tienen sus ceremonias.",
        tips: "Pida siempre permiso antes de fotografiar a un adepto o una ceremonia, no toque las máscaras ni los altares y siga las indicaciones de los dignatarios. Las administraciones y muchos comercios cierran ambos días.",
        dateNote: "Segundo viernes de enero y el jueves anterior, también festivo (ley n.º 2024-32 de 2 de septiembre de 2024). Hasta 2024: el 10 de enero. En 2026: jueves 8 y viernes 9 de enero.",
      },
      pt: {
        name: "Festa das religiões tradicionais (festa do vodu)",
        summary: "A grande festa nacional do vodu e dos cultos endógenos, com dois feriados em janeiro.",
        description:
          "O Benim é um dos raros países a dedicar um feriado às suas religiões tradicionais. Celebrada durante muito tempo a 10 de janeiro, a festa passou, com a lei n.º 2024-32, para a segunda sexta-feira de janeiro, sendo a quinta-feira anterior também feriado pago. Em todo o sul, conventos, templos e praças vodu ganham vida: libações, sacrifícios, danças e saídas das máscaras Egungun e Zangbeto. O coração das celebrações é Ouidah, onde decorrem os Vodun Days, mas Porto-Novo, Abomey, Allada ou Grand-Popo também têm as suas cerimónias.",
        tips: "Peça sempre autorização antes de fotografar um adepto ou uma cerimónia, não toque nas máscaras nem nos altares e siga as instruções dos dignitários. Serviços públicos e muitas lojas fecham nos dois dias.",
        dateNote: "Segunda sexta-feira de janeiro e a quinta-feira anterior, também feriado (lei n.º 2024-32 de 2 de setembro de 2024). Até 2024: 10 de janeiro. Em 2026: quinta 8 e sexta 9 de janeiro.",
      },
      ar: {
        name: "عيد الديانات التقليدية (عيد الفودون)",
        summary: "العيد الوطني الكبير للفودون والعبادات المحلية، مع يومي عطلة رسمية في يناير.",
        description:
          "بنين من الدول القليلة التي تخصص عطلة رسمية لدياناتها التقليدية. ظل العيد يُحتفل به طويلًا في العاشر من يناير، ثم نقله القانون رقم 2024-32 إلى يوم الجمعة الثاني من يناير، مع جعل يوم الخميس الذي يسبقه عطلة مدفوعة الأجر أيضًا. وفي أنحاء الجنوب كله تدبّ الحياة في الأديرة والمعابد وساحات الفودون: سكب القرابين والذبائح والرقصات وخروج أقنعة الإيغونغون والزانغبيتو. وقلب الاحتفالات هو ويدا حيث تُقام «أيام الفودون»، لكن بورتو نوفو وأبومي وألادا وغران بوبو تقيم أيضًا طقوسها الخاصة.",
        tips: "استأذن دائمًا قبل تصوير أحد الأتباع أو أي طقس، ولا تلمس الأقنعة أو المذابح، واتبع تعليمات الوجهاء. تُغلق الإدارات وكثير من المتاجر في اليومين.",
        dateNote: "يوم الجمعة الثاني من يناير، والخميس الذي يسبقه عطلة أيضًا (القانون رقم 2024-32 المؤرخ 2 سبتمبر 2024). حتى عام 2024: العاشر من يناير. في 2026: الخميس 8 والجمعة 9 يناير.",
      },
    },
  },
  {
    slug: "lundi-de-paques-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 1 },
    sources: LOI_FERIES,
    name: "Lundi de Pâques",
    summary: "Le lendemain de Pâques, férié, prolonge les fêtes de la Semaine sainte.",
    description:
      "Les chrétiens représentent une part importante de la population béninoise, et Pâques est l'une des grandes fêtes de l'année : offices de la Semaine sainte, chemins de croix, veillée pascale le samedi soir et messes très suivies le dimanche, notamment à la cathédrale de Cotonou, à la basilique de Ouidah ou au sanctuaire d'Arigbo à Dassa-Zoumè. Le lundi, férié, est consacré aux repas de famille et aux sorties, souvent à la plage.",
    tips: "Les églises sont combles : arrivez tôt et adoptez une tenue correcte. Plages et lieux de loisirs sont très fréquentés le lundi.",
    where: "Dans tout le pays",
    dateNote: "Lendemain du dimanche de Pâques (date mobile, entre fin mars et fin avril).",
    en: {
      name: "Easter Monday",
      summary: "The day after Easter, a public holiday that extends the Holy Week celebrations.",
      description:
        "Christians make up a large share of Benin's population, and Easter is one of the year's great festivals: Holy Week services, Stations of the Cross, the Easter Vigil on Saturday night and packed masses on Sunday, notably at Cotonou cathedral, Ouidah basilica or the Arigbo shrine in Dassa-Zoumè. Monday, a public holiday, is given over to family meals and outings, often to the beach.",
      tips: "Churches are packed: arrive early and dress respectfully. Beaches and leisure spots are very busy on the Monday.",
      where: "Nationwide",
      dateNote: "The day after Easter Sunday (movable date, between late March and late April).",
    },
    i18n: {
      es: {
        name: "Lunes de Pascua",
        summary: "El día siguiente a Pascua, festivo, prolonga las celebraciones de Semana Santa.",
        description:
          "Los cristianos representan una parte importante de la población de Benín, y la Pascua es una de las grandes fiestas del año: oficios de Semana Santa, vía crucis, vigilia pascual el sábado por la noche y misas muy concurridas el domingo, sobre todo en la catedral de Cotonou, la basílica de Ouidah o el santuario de Arigbo en Dassa-Zoumè. El lunes, festivo, se dedica a las comidas familiares y a las salidas, a menudo a la playa.",
        tips: "Las iglesias se llenan: llegue temprano y vista de forma adecuada. Playas y lugares de ocio están muy concurridos el lunes.",
        where: "En todo el país",
        dateNote: "Día siguiente al domingo de Pascua (fecha móvil, entre finales de marzo y finales de abril).",
      },
      pt: {
        name: "Segunda-feira de Páscoa",
        summary: "O dia seguinte à Páscoa, feriado, prolonga as celebrações da Semana Santa.",
        description:
          "Os cristãos representam uma parte importante da população do Benim, e a Páscoa é uma das grandes festas do ano: ofícios da Semana Santa, via-sacra, vigília pascal no sábado à noite e missas muito concorridas no domingo, nomeadamente na catedral de Cotonou, na basílica de Ouidah ou no santuário de Arigbo, em Dassa-Zoumè. A segunda-feira, feriado, é dedicada às refeições em família e aos passeios, muitas vezes à praia.",
        tips: "As igrejas enchem: chegue cedo e use vestuário adequado. Praias e locais de lazer ficam muito concorridos na segunda-feira.",
        where: "Em todo o país",
        dateNote: "Dia seguinte ao domingo de Páscoa (data móvel, entre o fim de março e o fim de abril).",
      },
      ar: {
        name: "اثنين الفصح",
        summary: "اليوم التالي لعيد الفصح، عطلة رسمية تمدّد احتفالات أسبوع الآلام.",
        description:
          "يشكّل المسيحيون نسبة كبيرة من سكان بنين، والفصح من أكبر أعياد السنة: صلوات أسبوع الآلام ودرب الصليب وسهرة الفصح ليلة السبت وقداديس مكتظة يوم الأحد، ولا سيما في كاتدرائية كوتونو وبازيليك ويدا ومزار أريغبو في داسا-زومي. أما يوم الاثنين، وهو عطلة رسمية، فمخصص للولائم العائلية والنزهات، وغالبًا إلى الشاطئ.",
        tips: "تمتلئ الكنائس: احضر باكرًا وارتدِ لباسًا محتشمًا. وتكون الشواطئ وأماكن الترفيه مزدحمة جدًا يوم الاثنين.",
        where: "في جميع أنحاء البلاد",
        dateNote: "اليوم التالي لأحد الفصح (تاريخ متغير بين أواخر مارس وأواخر أبريل).",
      },
    },
  },
  {
    slug: "fete-du-travail-benin",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 1 },
    sources: LOI_FERIES,
    name: "Fête du Travail",
    summary: "Journée internationale des travailleurs, fériée et chômée.",
    description:
      "Le 1er mai est marqué par les rassemblements et les déclarations des centrales syndicales, notamment à Cotonou et Porto-Novo, et par la remise traditionnelle des cahiers de revendications au gouvernement. Pour la plupart des Béninois, c'est surtout un jour de repos en famille.",
    tips: "Administrations et banques fermées ; certains marchés tournent au ralenti.",
    where: "Dans tout le pays",
    dateNote: "Chaque année le 1er mai.",
    en: {
      name: "Labour Day",
      summary: "International Workers' Day, a public holiday.",
      description:
        "1 May is marked by trade-union rallies and statements, notably in Cotonou and Porto-Novo, and by the traditional handing of workers' demands to the government. For most Beninese, it is above all a day of rest with the family.",
      tips: "Government offices and banks are closed; some markets are quieter than usual.",
      where: "Nationwide",
      dateNote: "Every year on 1 May.",
    },
    i18n: {
      es: {
        name: "Día del Trabajo",
        summary: "Día Internacional de los Trabajadores, festivo.",
        description:
          "El 1 de mayo está marcado por las concentraciones y declaraciones de las centrales sindicales, sobre todo en Cotonou y Porto-Novo, y por la entrega tradicional de las reivindicaciones al Gobierno. Para la mayoría de los beninenses es, ante todo, un día de descanso en familia.",
        tips: "Administraciones y bancos cerrados; algunos mercados funcionan a medio gas.",
        where: "En todo el país",
        dateNote: "Cada año el 1 de mayo.",
      },
      pt: {
        name: "Dia do Trabalhador",
        summary: "Dia Internacional dos Trabalhadores, feriado.",
        description:
          "O 1.º de Maio é marcado pelas concentrações e declarações das centrais sindicais, nomeadamente em Cotonou e Porto-Novo, e pela tradicional entrega do caderno reivindicativo ao Governo. Para a maioria dos beninenses, é sobretudo um dia de descanso em família.",
        tips: "Serviços públicos e bancos fechados; alguns mercados funcionam a meio gás.",
        where: "Em todo o país",
        dateNote: "Todos os anos a 1 de maio.",
      },
      ar: {
        name: "عيد العمال",
        summary: "اليوم العالمي للعمال، عطلة رسمية.",
        description:
          "يتميّز الأول من مايو بتجمعات النقابات العمالية وبياناتها، لا سيما في كوتونو وبورتو نوفو، وبالتسليم التقليدي لقائمة مطالب العمال إلى الحكومة. وهو بالنسبة إلى معظم البنينيين قبل كل شيء يوم راحة مع العائلة.",
        tips: "تُغلق الإدارات والمصارف، وتعمل بعض الأسواق بوتيرة أبطأ.",
        where: "في جميع أنحاء البلاد",
        dateNote: "كل عام في الأول من مايو.",
      },
    },
  },
  {
    slug: "ascension-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 39 },
    sources: LOI_FERIES,
    name: "Ascension",
    summary: "Fête chrétienne célébrée quarante jours après Pâques, jour férié.",
    description:
      "L'Ascension commémore la montée du Christ au ciel, quarante jours après Pâques. Les paroisses catholiques et protestantes célèbrent des messes et cultes solennels ; le reste de la journée est un jour de repos, souvent l'occasion d'une sortie en famille.",
    tips: "Jeudi férié : administrations et banques fermées, certains en profitent pour faire le pont.",
    where: "Dans tout le pays",
    dateNote: "Jeudi, 39 jours après le dimanche de Pâques (entre fin avril et début juin).",
    en: {
      name: "Ascension Day",
      summary: "Christian feast held forty days after Easter, a public holiday.",
      description:
        "Ascension Day commemorates Christ's ascent into heaven forty days after Easter. Catholic and Protestant parishes hold solemn masses and services; the rest of the day is a day off, often an occasion for a family outing.",
      tips: "A Thursday holiday: government offices and banks are closed, and some people take the Friday off too.",
      where: "Nationwide",
      dateNote: "Thursday, 39 days after Easter Sunday (between late April and early June).",
    },
    i18n: {
      es: {
        name: "Ascensión",
        summary: "Fiesta cristiana celebrada cuarenta días después de Pascua, festivo.",
        description:
          "La Ascensión conmemora la subida de Cristo al cielo, cuarenta días después de Pascua. Las parroquias católicas y protestantes celebran misas y cultos solemnes; el resto del día es de descanso, a menudo ocasión para una salida en familia.",
        tips: "Jueves festivo: administraciones y bancos cerrados; algunos hacen puente.",
        where: "En todo el país",
        dateNote: "Jueves, 39 días después del domingo de Pascua (entre finales de abril y principios de junio).",
      },
      pt: {
        name: "Ascensão",
        summary: "Festa cristã celebrada quarenta dias depois da Páscoa, feriado.",
        description:
          "A Ascensão comemora a subida de Cristo ao céu, quarenta dias depois da Páscoa. As paróquias católicas e protestantes celebram missas e cultos solenes; o resto do dia é de descanso, muitas vezes ocasião para um passeio em família.",
        tips: "Quinta-feira feriado: serviços públicos e bancos fechados; há quem faça ponte.",
        where: "Em todo o país",
        dateNote: "Quinta-feira, 39 dias depois do domingo de Páscoa (entre o fim de abril e o início de junho).",
      },
      ar: {
        name: "عيد الصعود",
        summary: "عيد مسيحي يُحتفل به بعد أربعين يومًا من الفصح، عطلة رسمية.",
        description:
          "يحيي عيد الصعود ذكرى صعود المسيح إلى السماء بعد أربعين يومًا من الفصح. وتقيم الرعايا الكاثوليكية والبروتستانتية قداديس وصلوات احتفالية، ويكون باقي اليوم يوم راحة، وغالبًا مناسبة لنزهة عائلية.",
        tips: "عطلة يوم خميس: تُغلق الإدارات والمصارف، ويمدّد البعض العطلة إلى الجمعة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "يوم خميس، بعد 39 يومًا من أحد الفصح (بين أواخر أبريل وأوائل يونيو).",
      },
    },
  },
  {
    slug: "lundi-de-pentecote-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 50 },
    sources: LOI_FERIES,
    name: "Lundi de Pentecôte",
    summary: "Lendemain de la Pentecôte, férié ; c'est aussi le week-end de la Nonvitcha à Grand-Popo.",
    description:
      "La Pentecôte, cinquante jours après Pâques, célèbre la descente de l'Esprit saint sur les apôtres. Le lundi qui suit est férié au Bénin. Ce long week-end est l'un des plus festifs de la côte : à Grand-Popo, les communautés xwla et xwéla s'y retrouvent depuis 1921 pour la Nonvitcha, avec messe solennelle, compétitions et festivités en bord de mer.",
    tips: "Week-end très chargé sur la route Cotonou–Ouidah–Grand-Popo ; réservez tôt si vous visez la côte.",
    where: "Dans tout le pays",
    dateNote: "Lendemain du dimanche de Pentecôte, 50 jours après Pâques (entre mi-mai et mi-juin). En 2025 : lundi 9 juin.",
    en: {
      name: "Whit Monday",
      summary: "The day after Pentecost, a public holiday; also the weekend of the Nonvitcha in Grand-Popo.",
      description:
        "Pentecost, fifty days after Easter, celebrates the descent of the Holy Spirit upon the apostles. The following Monday is a public holiday in Benin. This long weekend is one of the most festive on the coast: in Grand-Popo, the Xwla and Xwela communities have gathered since 1921 for the Nonvitcha, with a solemn mass, competitions and seaside festivities.",
      tips: "A very busy weekend on the Cotonou–Ouidah–Grand-Popo road; book early if you are heading for the coast.",
      where: "Nationwide",
      dateNote: "The day after Pentecost Sunday, 50 days after Easter (between mid-May and mid-June). In 2025: Monday 9 June.",
    },
    i18n: {
      es: {
        name: "Lunes de Pentecostés",
        summary: "Día siguiente a Pentecostés, festivo; también es el fin de semana de la Nonvitcha en Grand-Popo.",
        description:
          "Pentecostés, cincuenta días después de Pascua, celebra la venida del Espíritu Santo sobre los apóstoles. El lunes siguiente es festivo en Benín. Este puente es uno de los más festivos de la costa: en Grand-Popo, las comunidades xwla y xwela se reúnen desde 1921 para la Nonvitcha, con misa solemne, competiciones y fiestas junto al mar.",
        tips: "Fin de semana con mucho tráfico en la carretera Cotonou–Ouidah–Grand-Popo; reserve pronto si va a la costa.",
        where: "En todo el país",
        dateNote: "Día siguiente al domingo de Pentecostés, 50 días después de Pascua (entre mediados de mayo y mediados de junio). En 2025: lunes 9 de junio.",
      },
      pt: {
        name: "Segunda-feira de Pentecostes",
        summary: "Dia seguinte ao Pentecostes, feriado; é também o fim de semana da Nonvitcha em Grand-Popo.",
        description:
          "O Pentecostes, cinquenta dias depois da Páscoa, celebra a descida do Espírito Santo sobre os apóstolos. A segunda-feira seguinte é feriado no Benim. Este fim de semana prolongado é um dos mais festivos da costa: em Grand-Popo, as comunidades xwla e xwela reúnem-se desde 1921 para a Nonvitcha, com missa solene, competições e festejos à beira-mar.",
        tips: "Fim de semana com muito movimento na estrada Cotonou–Ouidah–Grand-Popo; reserve cedo se for para a costa.",
        where: "Em todo o país",
        dateNote: "Dia seguinte ao domingo de Pentecostes, 50 dias depois da Páscoa (entre meados de maio e meados de junho). Em 2025: segunda-feira, 9 de junho.",
      },
      ar: {
        name: "اثنين العنصرة",
        summary: "اليوم التالي لعيد العنصرة، عطلة رسمية؛ وهو أيضًا عطلة نهاية أسبوع «نونفيتشا» في غران بوبو.",
        description:
          "يحتفل عيد العنصرة، بعد خمسين يومًا من الفصح، بحلول الروح القدس على الرسل. ويوم الاثنين الذي يليه عطلة رسمية في بنين. وتُعد هذه العطلة الطويلة من أكثر عطلات الساحل احتفالًا: ففي غران بوبو تلتقي مجتمعات الشوْلا والشويلا منذ عام 1921 في مهرجان «نونفيتشا»، مع قداس احتفالي ومسابقات واحتفالات على شاطئ البحر.",
        tips: "عطلة نهاية أسبوع شديدة الازدحام على طريق كوتونو–ويدا–غران بوبو؛ احجز مبكرًا إن كنت متجهًا إلى الساحل.",
        where: "في جميع أنحاء البلاد",
        dateNote: "اليوم التالي لأحد العنصرة، بعد 50 يومًا من الفصح (بين منتصف مايو ومنتصف يونيو). في 2025: الاثنين 9 يونيو.",
      },
    },
  },
  {
    slug: "fete-nationale-benin",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 8, day: 1 },
    sources: LOI_FERIES,
    name: "Fête nationale (fête de l'Indépendance)",
    summary: "Anniversaire de l'indépendance du 1er août 1960, principale fête civile du pays.",
    description:
      "Le 1er août commémore l'accession à l'indépendance, en 1960, de la République du Dahomey, devenue Bénin en 1975. La journée est marquée par les cérémonies officielles, le message à la nation, les prises d'armes et les défilés, ainsi que par des manifestations culturelles dans les communes. Elle ouvre aussi la saison des vacances scolaires et des festivités d'été, comme les animations de l'esplanade de l'Amazone à Cotonou.",
    tips: "Certaines artères de Cotonou et Porto-Novo peuvent être fermées pour les cérémonies ; administrations et banques sont fermées.",
    where: "Dans tout le pays",
    dateNote: "Chaque année le 1er août.",
    en: {
      name: "National Day (Independence Day)",
      summary: "Anniversary of independence on 1 August 1960, the country's main civic holiday.",
      description:
        "1 August commemorates the independence, in 1960, of the Republic of Dahomey, which became Benin in 1975. The day is marked by official ceremonies, the address to the nation, military reviews and parades, as well as cultural events in towns across the country. It also opens the school holidays and the summer festivities, such as the events on Cotonou's Amazon esplanade.",
      tips: "Some main roads in Cotonou and Porto-Novo may be closed for the ceremonies; government offices and banks are closed.",
      where: "Nationwide",
      dateNote: "Every year on 1 August.",
    },
    i18n: {
      es: {
        name: "Fiesta nacional (Día de la Independencia)",
        summary: "Aniversario de la independencia del 1 de agosto de 1960, principal fiesta civil del país.",
        description:
          "El 1 de agosto conmemora la independencia, en 1960, de la República de Dahomey, que pasó a llamarse Benín en 1975. La jornada está marcada por las ceremonias oficiales, el mensaje a la nación, revistas militares y desfiles, así como por actos culturales en los municipios. También abre la temporada de vacaciones escolares y de fiestas de verano, como las animaciones de la explanada de la Amazona en Cotonou.",
        tips: "Algunas avenidas de Cotonou y Porto-Novo pueden cerrarse por las ceremonias; administraciones y bancos cierran.",
        where: "En todo el país",
        dateNote: "Cada año el 1 de agosto.",
      },
      pt: {
        name: "Festa nacional (Dia da Independência)",
        summary: "Aniversário da independência de 1 de agosto de 1960, principal festa cívica do país.",
        description:
          "O 1 de agosto comemora a independência, em 1960, da República do Daomé, que passou a chamar-se Benim em 1975. O dia é marcado pelas cerimónias oficiais, pela mensagem à nação, por paradas militares e desfiles, bem como por eventos culturais nos municípios. Abre também a época das férias escolares e das festas de verão, como as animações da esplanada da Amazona, em Cotonou.",
        tips: "Algumas avenidas de Cotonou e Porto-Novo podem ser fechadas para as cerimónias; serviços públicos e bancos fecham.",
        where: "Em todo o país",
        dateNote: "Todos os anos a 1 de agosto.",
      },
      ar: {
        name: "العيد الوطني (عيد الاستقلال)",
        summary: "ذكرى الاستقلال في الأول من أغسطس 1960، أهم الأعياد المدنية في البلاد.",
        description:
          "يحيي الأول من أغسطس ذكرى استقلال جمهورية داهومي عام 1960، التي أصبحت بنين عام 1975. ويتميز اليوم بالمراسم الرسمية وخطاب الأمة والاستعراضات العسكرية والمسيرات، إلى جانب فعاليات ثقافية في البلديات. كما يفتتح موسم العطلة المدرسية واحتفالات الصيف، مثل أنشطة ساحة الأمازون في كوتونو.",
        tips: "قد تُغلق بعض الشوارع الرئيسية في كوتونو وبورتو نوفو بسبب المراسم؛ وتُغلق الإدارات والمصارف.",
        where: "في جميع أنحاء البلاد",
        dateNote: "كل عام في الأول من أغسطس.",
      },
    },
  },
  {
    slug: "assomption-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 8, day: 15 },
    sources: [...LOI_FERIES, "https://www.vaticannews.va/fr/afrique/news/2022-08/cloture-de-la-68e-edition-du-pelerinage-marial-national-du-benin.html"],
    name: "Assomption",
    summary: "Fête de la Vierge Marie, fériée ; un temps fort de la dévotion mariale et de la fête de l'igname à Savalou.",
    description:
      "Le 15 août, les catholiques célèbrent l'entrée de la Vierge Marie au ciel. Au Bénin, où la dévotion mariale est très vivante, la date ouvre la période du grand pèlerinage national au sanctuaire d'Arigbo, à Dassa-Zoumè, qui se tient un week-end de la seconde moitié d'août. Le même jour, Savalou célèbre la fête de l'igname nouvelle, qui attire foule et personnalités.",
    tips: "Routes chargées vers le centre du pays (Dassa, Savalou) autour du 15 août ; administrations et banques fermées.",
    where: "Dans tout le pays",
    dateNote: "Chaque année le 15 août.",
    en: {
      name: "Assumption Day",
      summary: "Feast of the Virgin Mary, a public holiday; a high point of Marian devotion and of the yam festival in Savalou.",
      description:
        "On 15 August, Catholics celebrate the Virgin Mary's assumption into heaven. In Benin, where Marian devotion is very strong, the date opens the period of the great national pilgrimage to the Arigbo shrine in Dassa-Zoumè, held over a weekend in the second half of August. On the same day, Savalou celebrates the new yam festival, which draws crowds and dignitaries.",
      tips: "Busy roads towards the centre of the country (Dassa, Savalou) around 15 August; government offices and banks are closed.",
      where: "Nationwide",
      dateNote: "Every year on 15 August.",
    },
    i18n: {
      es: {
        name: "Asunción",
        summary: "Fiesta de la Virgen María, festivo; un momento destacado de la devoción mariana y de la fiesta del ñame en Savalou.",
        description:
          "El 15 de agosto, los católicos celebran la subida de la Virgen María al cielo. En Benín, donde la devoción mariana está muy viva, la fecha abre el periodo de la gran peregrinación nacional al santuario de Arigbo, en Dassa-Zoumè, que se celebra un fin de semana de la segunda quincena de agosto. Ese mismo día, Savalou celebra la fiesta del ñame nuevo, que atrae a multitudes y personalidades.",
        tips: "Carreteras cargadas hacia el centro del país (Dassa, Savalou) en torno al 15 de agosto; administraciones y bancos cerrados.",
        where: "En todo el país",
        dateNote: "Cada año el 15 de agosto.",
      },
      pt: {
        name: "Assunção",
        summary: "Festa da Virgem Maria, feriado; um ponto alto da devoção mariana e da festa do inhame em Savalou.",
        description:
          "A 15 de agosto, os católicos celebram a elevação da Virgem Maria ao céu. No Benim, onde a devoção mariana é muito viva, a data abre o período da grande peregrinação nacional ao santuário de Arigbo, em Dassa-Zoumè, que decorre num fim de semana da segunda quinzena de agosto. No mesmo dia, Savalou celebra a festa do inhame novo, que atrai multidões e personalidades.",
        tips: "Estradas carregadas em direção ao centro do país (Dassa, Savalou) por volta de 15 de agosto; serviços públicos e bancos fechados.",
        where: "Em todo o país",
        dateNote: "Todos os anos a 15 de agosto.",
      },
      ar: {
        name: "عيد انتقال العذراء",
        summary: "عيد السيدة العذراء، عطلة رسمية؛ ذروة التعبّد المريمي وعيد اليام في سافالو.",
        description:
          "في 15 أغسطس يحتفل الكاثوليك بانتقال السيدة العذراء إلى السماء. وفي بنين، حيث التعبّد المريمي حيّ جدًا، يفتتح هذا التاريخ فترة الحج الوطني الكبير إلى مزار أريغبو في داسا-زومي، الذي يُقام في عطلة نهاية أسبوع من النصف الثاني من أغسطس. وفي اليوم نفسه تحتفل سافالو بعيد اليام الجديد الذي يستقطب الحشود والشخصيات.",
        tips: "ازدحام على الطرق المؤدية إلى وسط البلاد (داسا وسافالو) حول 15 أغسطس؛ وتُغلق الإدارات والمصارف.",
        where: "في جميع أنحاء البلاد",
        dateNote: "كل عام في 15 أغسطس.",
      },
    },
  },
  {
    slug: "toussaint-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 11, day: 1 },
    sources: LOI_FERIES,
    name: "Toussaint",
    summary: "Fête de tous les saints, fériée, suivie du jour des défunts.",
    description:
      "Le 1er novembre, les catholiques honorent l'ensemble des saints ; le lendemain, jour des défunts, de nombreuses familles nettoient et fleurissent les tombes de leurs proches et font célébrer des messes. Ce moment de mémoire fait écho à l'importance du culte des ancêtres dans la culture béninoise.",
    tips: "Administrations fermées le 1er novembre ; restez discret dans les cimetières.",
    where: "Dans tout le pays",
    dateNote: "Chaque année le 1er novembre ; pas de report lorsqu'il tombe un dimanche (comme en 2026).",
    en: {
      name: "All Saints' Day",
      summary: "Feast of all the saints, a public holiday, followed by All Souls' Day.",
      description:
        "On 1 November, Catholics honour all the saints; the next day, All Souls' Day, many families clean and decorate the graves of their loved ones and have masses said. This time of remembrance echoes the importance of ancestor veneration in Beninese culture.",
      tips: "Government offices are closed on 1 November; be discreet in cemeteries.",
      where: "Nationwide",
      dateNote: "Every year on 1 November; not moved when it falls on a Sunday (as in 2026).",
    },
    i18n: {
      es: {
        name: "Todos los Santos",
        summary: "Fiesta de todos los santos, festivo, seguida del día de los difuntos.",
        description:
          "El 1 de noviembre, los católicos honran a todos los santos; al día siguiente, día de los difuntos, muchas familias limpian y adornan con flores las tumbas de sus seres queridos y encargan misas. Este momento de memoria refleja la importancia del culto a los antepasados en la cultura beninesa.",
        tips: "Administraciones cerradas el 1 de noviembre; sea discreto en los cementerios.",
        where: "En todo el país",
        dateNote: "Cada año el 1 de noviembre; no se traslada si cae en domingo (como en 2026).",
      },
      pt: {
        name: "Dia de Todos os Santos",
        summary: "Festa de todos os santos, feriado, seguida do dia dos fiéis defuntos.",
        description:
          "A 1 de novembro, os católicos honram todos os santos; no dia seguinte, dia dos fiéis defuntos, muitas famílias limpam e enfeitam com flores as campas dos seus entes queridos e mandam celebrar missas. Este momento de memória ecoa a importância do culto dos antepassados na cultura beninense.",
        tips: "Serviços públicos fechados a 1 de novembro; seja discreto nos cemitérios.",
        where: "Em todo o país",
        dateNote: "Todos os anos a 1 de novembro; não é transferido quando calha a um domingo (como em 2026).",
      },
      ar: {
        name: "عيد جميع القديسين",
        summary: "عيد جميع القديسين، عطلة رسمية، يليه يوم الموتى.",
        description:
          "في الأول من نوفمبر يكرّم الكاثوليك جميع القديسين، وفي اليوم التالي، يوم الموتى، تنظّف عائلات كثيرة قبور ذويها وتزيّنها بالزهور وتطلب إقامة القداديس. وتعكس هذه المناسبة التذكارية أهمية تكريم الأسلاف في الثقافة البنينية.",
        tips: "تُغلق الإدارات في الأول من نوفمبر؛ التزم الهدوء في المقابر.",
        where: "في جميع أنحاء البلاد",
        dateNote: "كل عام في الأول من نوفمبر؛ ولا يُنقل إذا صادف يوم أحد (كما في 2026).",
      },
    },
  },
  {
    slug: "noel-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 12, day: 25 },
    sources: [...LOI_FERIES, "https://www.afrik.com/kaleta-les-masques-beninois-qui-reveillent-l-esprit-de-noel"],
    name: "Noël",
    summary: "Fête de la Nativité, fériée, au cœur de la saison des fêtes de fin d'année.",
    description:
      "Noël est célébré avec ferveur par les chrétiens du Bénin : messes de minuit très suivies, crèches, chorales et repas de famille. Dans les rues des villes du sud, les jeunes masques Kaléta dansent de maison en maison à l'approche des fêtes. C'est aussi le moment où la diaspora rentre au pays et où Cotonou vit au rythme des concerts et des sorties nocturnes.",
    tips: "Messes de minuit bondées : arrivez tôt. Les vols et hébergements de fin décembre se réservent longtemps à l'avance.",
    where: "Dans tout le pays",
    dateNote: "Chaque année le 25 décembre.",
    en: {
      name: "Christmas Day",
      summary: "The feast of the Nativity, a public holiday at the heart of the end-of-year festive season.",
      description:
        "Christmas is celebrated fervently by Benin's Christians: packed midnight masses, nativity scenes, choirs and family meals. In the streets of the southern towns, young Kaléta masqueraders dance from house to house as the holidays approach. It is also when the diaspora comes home and Cotonou lives to the rhythm of concerts and nights out.",
      tips: "Midnight masses are crowded: arrive early. Flights and accommodation for late December must be booked well ahead.",
      where: "Nationwide",
      dateNote: "Every year on 25 December.",
    },
    i18n: {
      es: {
        name: "Navidad",
        summary: "Fiesta de la Natividad, festivo, en pleno corazón de la temporada de fiestas de fin de año.",
        description:
          "Los cristianos de Benín celebran la Navidad con fervor: misas del gallo muy concurridas, belenes, coros y comidas familiares. En las calles de las ciudades del sur, las jóvenes máscaras Kaléta bailan de casa en casa a medida que se acercan las fiestas. También es el momento en que la diáspora vuelve al país y Cotonou vive al ritmo de los conciertos y las salidas nocturnas.",
        tips: "Las misas del gallo se llenan: llegue temprano. Los vuelos y alojamientos de finales de diciembre se reservan con mucha antelación.",
        where: "En todo el país",
        dateNote: "Cada año el 25 de diciembre.",
      },
      pt: {
        name: "Natal",
        summary: "Festa da Natividade, feriado, no coração da época de festas de fim de ano.",
        description:
          "O Natal é celebrado com fervor pelos cristãos do Benim: missas do galo muito concorridas, presépios, coros e refeições em família. Nas ruas das cidades do sul, as jovens máscaras Kaléta dançam de casa em casa à medida que as festas se aproximam. É também o momento em que a diáspora regressa ao país e em que Cotonou vive ao ritmo dos concertos e das saídas noturnas.",
        tips: "As missas do galo enchem: chegue cedo. Voos e alojamento para o fim de dezembro reservam-se com muita antecedência.",
        where: "Em todo o país",
        dateNote: "Todos os anos a 25 de dezembro.",
      },
      ar: {
        name: "عيد الميلاد",
        summary: "عيد ميلاد المسيح، عطلة رسمية في قلب موسم أعياد نهاية السنة.",
        description:
          "يحتفل مسيحيو بنين بعيد الميلاد بحماسة: قداديس منتصف الليل المكتظة، ومغارات الميلاد، والجوقات، والولائم العائلية. وفي شوارع مدن الجنوب يرقص الفتيان المقنّعون «كاليتا» من بيت إلى بيت مع اقتراب الأعياد. وهو أيضًا وقت عودة المغتربين إلى البلاد، حين تعيش كوتونو على إيقاع الحفلات الموسيقية والسهرات.",
        tips: "تكتظ قداديس منتصف الليل: احضر باكرًا. وتُحجز الرحلات وأماكن الإقامة لأواخر ديسمبر قبل وقت طويل.",
        where: "في جميع أنحاء البلاد",
        dateNote: "كل عام في 25 ديسمبر.",
      },
    },
  },
  {
    slug: "korite-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 10, day: 1 },
    sources: LOI_FERIES,
    name: "Korité (Aïd el-Fitr)",
    summary: "Fête de la fin du ramadan, fériée et chômée.",
    description:
      "La Korité marque la fin du mois de jeûne du ramadan. Les fidèles se rassemblent le matin pour la grande prière, dans les mosquées et sur les esplanades, notamment à Porto-Novo, Cotonou, Parakou ou Djougou, puis la journée est consacrée aux visites familiales, au partage des repas et aux tenues neuves. La fête est aussi célébrée par de nombreux non-musulmans invités par leurs voisins.",
    tips: "Ne gênez pas les prières en plein air ; c'est un bon jour pour accepter une invitation et goûter la cuisine de fête.",
    where: "Dans tout le pays",
    dateNote: "1er chawwal du calendrier musulman ; la date exacte dépend de l'observation de la lune et le jour férié est confirmé chaque année par communiqué du ministère du Travail (20 mars en 2026).",
    en: {
      name: "Korité (Eid al-Fitr)",
      summary: "The festival marking the end of Ramadan, a public holiday.",
      description:
        "Korité marks the end of the fasting month of Ramadan. The faithful gather in the morning for the great prayer, in mosques and on open grounds, notably in Porto-Novo, Cotonou, Parakou and Djougou, then the day is given over to family visits, shared meals and new clothes. Many non-Muslims also join in, invited by their neighbours.",
      tips: "Do not disturb open-air prayers; it is a good day to accept an invitation and taste festive food.",
      where: "Nationwide",
      dateNote: "1 Shawwal in the Islamic calendar; the exact date depends on the sighting of the moon and the holiday is confirmed every year by a Ministry of Labour statement (20 March in 2026).",
    },
    i18n: {
      es: {
        name: "Korité (Aíd al-Fitr)",
        summary: "Fiesta del final del ramadán, festivo.",
        description:
          "La Korité marca el final del mes de ayuno del ramadán. Los fieles se reúnen por la mañana para la gran oración, en las mezquitas y en explanadas, sobre todo en Porto-Novo, Cotonou, Parakou o Djougou, y después el día se dedica a las visitas familiares, a compartir comidas y a estrenar ropa. Muchos no musulmanes también participan, invitados por sus vecinos.",
        tips: "No moleste durante las oraciones al aire libre; es un buen día para aceptar una invitación y probar la cocina de fiesta.",
        where: "En todo el país",
        dateNote: "1 de chawal del calendario musulmán; la fecha exacta depende de la observación de la luna y el festivo lo confirma cada año un comunicado del Ministerio de Trabajo (20 de marzo en 2026).",
      },
      pt: {
        name: "Korité (Aid al-Fitr)",
        summary: "Festa do fim do Ramadão, feriado.",
        description:
          "A Korité assinala o fim do mês de jejum do Ramadão. Os fiéis reúnem-se de manhã para a grande oração, nas mesquitas e em esplanadas, nomeadamente em Porto-Novo, Cotonou, Parakou ou Djougou, e o resto do dia é dedicado às visitas à família, às refeições partilhadas e à roupa nova. Muitos não muçulmanos também participam, convidados pelos vizinhos.",
        tips: "Não perturbe as orações ao ar livre; é um bom dia para aceitar um convite e provar a cozinha de festa.",
        where: "Em todo o país",
        dateNote: "1 de chawwal do calendário muçulmano; a data exata depende da observação da lua e o feriado é confirmado todos os anos por comunicado do Ministério do Trabalho (20 de março em 2026).",
      },
      ar: {
        name: "عيد الفطر (الكوريتي)",
        summary: "عيد نهاية شهر رمضان، عطلة رسمية.",
        description:
          "يُعلن عيد الفطر نهاية شهر الصيام. يجتمع المصلّون صباحًا لأداء صلاة العيد في المساجد والمصليات المفتوحة، ولا سيما في بورتو نوفو وكوتونو وباراكو وجوغو، ثم يُخصَّص اليوم لزيارة الأهل وتقاسم الطعام وارتداء الملابس الجديدة. ويشارك فيه أيضًا كثير من غير المسلمين بدعوة من جيرانهم.",
        tips: "لا تُزعج المصلّين في الصلوات المقامة في الهواء الطلق؛ وهو يوم مناسب لقبول دعوة وتذوّق أطباق العيد.",
        where: "في جميع أنحاء البلاد",
        dateNote: "الأول من شوال في التقويم الهجري؛ يتوقف التاريخ الدقيق على رؤية الهلال، وتؤكد وزارة العمل العطلة كل عام ببيان رسمي (20 مارس في 2026).",
      },
    },
  },
  {
    slug: "tabaski-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 12, day: 10 },
    sources: [
      "https://beninwebtv.bj/benin-la-journee-du-vendredi-06-juin-2025-declaree-feriee-chomee-et-payee/",
      "https://beninwebtv.bj/tabaski-2026-la-journee-du-27-mai-declaree-feriee-et-payee-au-benin/",
      "https://lepetitjournal.com/cotonou/jours-feries-benin-295464",
    ],
    name: "Tabaski (Aïd el-Kébir)",
    summary: "La fête du Sacrifice, l'une des plus grandes fêtes musulmanes, fériée et chômée.",
    description:
      "La Tabaski commémore le sacrifice d'Abraham. Après la prière collective du matin, chaque famille qui le peut sacrifie un mouton, dont la viande est partagée avec les proches, les voisins et les plus démunis. Les jours qui précèdent, les marchés au bétail et les tailleurs sont en pleine effervescence, en particulier dans le nord et dans les quartiers musulmans de Porto-Novo et Cotonou.",
    tips: "Les jours précédents, la circulation et les prix montent autour des marchés au bétail ; le jour même, la plupart des commerces tenus par des musulmans sont fermés.",
    where: "Dans tout le pays",
    dateNote: "10 dhou al-hijja du calendrier musulman ; date fixée selon l'observation de la lune et confirmée chaque année par communiqué du ministère du Travail (6 juin en 2025, 27 mai en 2026).",
    en: {
      name: "Tabaski (Eid al-Adha)",
      summary: "The Feast of the Sacrifice, one of the greatest Muslim festivals, a public holiday.",
      description:
        "Tabaski commemorates Abraham's sacrifice. After the communal morning prayer, every family that can afford it sacrifices a sheep, whose meat is shared with relatives, neighbours and the poor. In the days before, livestock markets and tailors are in a frenzy, especially in the north and in the Muslim neighbourhoods of Porto-Novo and Cotonou.",
      tips: "In the days before, traffic and prices rise around the livestock markets; on the day itself, most Muslim-run shops are closed.",
      where: "Nationwide",
      dateNote: "10 Dhu al-Hijjah in the Islamic calendar; set by moon sighting and confirmed every year by a Ministry of Labour statement (6 June in 2025, 27 May in 2026).",
    },
    i18n: {
      es: {
        name: "Tabaski (Aíd al-Adha)",
        summary: "La fiesta del Sacrificio, una de las mayores fiestas musulmanas, festivo.",
        description:
          "La Tabaski conmemora el sacrificio de Abraham. Tras la oración colectiva de la mañana, cada familia que puede sacrifica un cordero, cuya carne se comparte con los allegados, los vecinos y los más necesitados. En los días previos, los mercados de ganado y los sastres están en plena efervescencia, sobre todo en el norte y en los barrios musulmanes de Porto-Novo y Cotonou.",
        tips: "En los días previos aumentan el tráfico y los precios en torno a los mercados de ganado; ese día, la mayoría de los comercios regentados por musulmanes cierran.",
        where: "En todo el país",
        dateNote: "10 de dulhiyya del calendario musulmán; fecha fijada según la observación de la luna y confirmada cada año por comunicado del Ministerio de Trabajo (6 de junio en 2025, 27 de mayo en 2026).",
      },
      pt: {
        name: "Tabaski (Aid al-Adha)",
        summary: "A festa do Sacrifício, uma das maiores festas muçulmanas, feriado.",
        description:
          "A Tabaski comemora o sacrifício de Abraão. Depois da oração coletiva da manhã, cada família que pode sacrifica um carneiro, cuja carne é partilhada com familiares, vizinhos e os mais necessitados. Nos dias anteriores, os mercados de gado e os alfaiates estão em plena efervescência, sobretudo no norte e nos bairros muçulmanos de Porto-Novo e Cotonou.",
        tips: "Nos dias anteriores, o trânsito e os preços sobem em torno dos mercados de gado; no próprio dia, a maioria das lojas de proprietários muçulmanos está fechada.",
        where: "Em todo o país",
        dateNote: "10 de dhul-hijja do calendário muçulmano; data fixada segundo a observação da lua e confirmada todos os anos por comunicado do Ministério do Trabalho (6 de junho em 2025, 27 de maio em 2026).",
      },
      ar: {
        name: "عيد الأضحى (التاباسكي)",
        summary: "عيد الأضحى، من أكبر الأعياد الإسلامية، عطلة رسمية.",
        description:
          "يحيي عيد الأضحى ذكرى فداء إبراهيم. فبعد صلاة العيد صباحًا، تضحّي كل أسرة مستطيعة بكبش يُقسَّم لحمه بين الأقارب والجيران والمحتاجين. وفي الأيام السابقة تعجّ أسواق الماشية ومحلات الخياطة بالحركة، ولا سيما في الشمال وفي الأحياء المسلمة من بورتو نوفو وكوتونو.",
        tips: "في الأيام السابقة تزداد حركة المرور والأسعار حول أسواق الماشية، وفي يوم العيد تُغلق معظم المتاجر التي يديرها مسلمون.",
        where: "في جميع أنحاء البلاد",
        dateNote: "العاشر من ذي الحجة في التقويم الهجري؛ يُحدَّد برؤية الهلال وتؤكده وزارة العمل كل عام ببيان (6 يونيو في 2025، و27 مايو في 2026).",
      },
    },
  },
  {
    slug: "maouloud-benin",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 3, day: 12 },
    sources: [
      "https://beninwebtv.bj/benin-le-jeudi-4-septembre-2025-declare-chome-et-ferie/",
      "https://lanouvelletribune.info/2026/08/benin-le-mardi-25-aout-declare-ferie-chome-et-paye-pour-le-maouloud/",
      "https://en.wikipedia.org/wiki/Public_holidays_in_Benin",
    ],
    name: "Maouloud (naissance du Prophète)",
    summary: "Anniversaire de la naissance du prophète Mahomet, férié et chômé.",
    description:
      "Le Maouloud célèbre la naissance du Prophète par des veillées de prières, des lectures et des chants religieux dans les mosquées et les cours des familles. Dans le Borgou, la fête se confond avec la Gaani, grande fête royale des Baatonou de Nikki, qui en est une adaptation ancienne.",
    tips: "Les veillées ont lieu la nuit précédente ; tenue couvrante si vous êtes invité dans une mosquée.",
    where: "Dans tout le pays",
    dateNote: "12 rabi al-awwal du calendrier musulman ; date déclarée chaque année par communiqué du ministère du Travail (jeudi 4 septembre en 2025, mardi 25 août en 2026).",
    en: {
      name: "Mawlid (Prophet's Birthday)",
      summary: "Anniversary of the birth of the Prophet Muhammad, a public holiday.",
      description:
        "Mawlid celebrates the Prophet's birth with night prayer vigils, readings and religious songs in mosques and family compounds. In Borgou, the festival merges with the Gaani, the great royal festival of the Baatonu of Nikki, which is an old local adaptation of it.",
      tips: "Vigils are held the night before; wear covering clothes if you are invited into a mosque.",
      where: "Nationwide",
      dateNote: "12 Rabi' al-Awwal in the Islamic calendar; the date is declared every year by a Ministry of Labour statement (Thursday 4 September in 2025, Tuesday 25 August in 2026).",
    },
    i18n: {
      es: {
        name: "Mawlid (nacimiento del Profeta)",
        summary: "Aniversario del nacimiento del profeta Mahoma, festivo.",
        description:
          "El Mawlid celebra el nacimiento del Profeta con vigilias de oración, lecturas y cantos religiosos en las mezquitas y en los patios familiares. En el Borgou, la fiesta se confunde con la Gaani, gran fiesta real de los baatonu de Nikki, que es una antigua adaptación local de ella.",
        tips: "Las vigilias se celebran la noche anterior; vista ropa que cubra si le invitan a una mezquita.",
        where: "En todo el país",
        dateNote: "12 de rabi al-awal del calendario musulmán; fecha declarada cada año por comunicado del Ministerio de Trabajo (jueves 4 de septiembre en 2025, martes 25 de agosto en 2026).",
      },
      pt: {
        name: "Mawlid (nascimento do Profeta)",
        summary: "Aniversário do nascimento do profeta Maomé, feriado.",
        description:
          "O Mawlid celebra o nascimento do Profeta com vigílias de oração, leituras e cânticos religiosos nas mesquitas e nos pátios das famílias. No Borgou, a festa confunde-se com a Gaani, grande festa real dos baatonu de Nikki, que é uma antiga adaptação local da mesma.",
        tips: "As vigílias realizam-se na noite anterior; use roupa que cubra o corpo se for convidado a entrar numa mesquita.",
        where: "Em todo o país",
        dateNote: "12 de rabi al-awwal do calendário muçulmano; data declarada todos os anos por comunicado do Ministério do Trabalho (quinta-feira, 4 de setembro em 2025; terça-feira, 25 de agosto em 2026).",
      },
      ar: {
        name: "المولد النبوي الشريف",
        summary: "ذكرى مولد النبي محمد ﷺ، عطلة رسمية.",
        description:
          "يُحتفل بالمولد النبوي بسهرات الصلاة وقراءة السيرة والأناشيد الدينية في المساجد وباحات البيوت. وفي منطقة بورغو يتداخل العيد مع «الغاني»، العيد الملكي الكبير لشعب الباتونو في نيكي، الذي نشأ تكييفًا محليًا قديمًا له.",
        tips: "تُقام السهرات في الليلة السابقة؛ ارتدِ لباسًا ساترًا إذا دُعيت إلى مسجد.",
        where: "في جميع أنحاء البلاد",
        dateNote: "الثاني عشر من ربيع الأول في التقويم الهجري؛ تعلن وزارة العمل التاريخ كل عام ببيان (الخميس 4 سبتمبر في 2025، والثلاثاء 25 أغسطس في 2026).",
      },
    },
  },
  // ───────────── Fêtes religieuses et traditionnelles ─────────────
  {
    slug: "vodun-days-ouidah",
    kind: "FESTIVAL",
    publicHoliday: false,
    place: "vodun-days",
    rule: { type: "period", from: 1, to: 1 },
    cover: "/images/voyage/fete-vodun-days-ouidah",
    sources: [
      "https://www.gouv.bj/article/3397/vodun-days-2026-ouidah-embellit-accueillir-evenement-dans-ferveur-populaire/",
      "https://lanouvelletribune.info/2025/11/vodun-days-2026-lapercu-du-programme-des-8-9-et-10-janvier-devoile/",
      "https://www.gouv.bj/article/2954/record-absolu-vodun-days-2025-accueillent-plus-participants-ouidah/",
      "https://fr.allafrica.com/stories/202512180482.html",
    ],
    name: "Vodun Days de Ouidah",
    summary: "Trois jours de cérémonies, de masques et de concerts à Ouidah, capitale spirituelle du vodun.",
    description:
      "Lancés en 2024 par le gouvernement autour de la fête des religions traditionnelles, les Vodun Days ont fait de Ouidah le grand rendez-vous culturel de janvier : plus de 435 000 participants ont été recensés en 2025. Le programme mêle grande cérémonie vodun, sorties de masques Egungun et Zangbeto dans l'arène de Ouidah, animations dans les places et couvents, village artisanal et gastronomique, et concerts géants le soir sur la plage, devant la Porte du Non-Retour. Une occasion unique de voir le vodun vivant, entre spiritualité et fête populaire.",
    tips: "Réservez votre hébergement à Ouidah ou Cotonou des mois à l'avance ; venez tôt pour les cérémonies, prévoyez chapeau et eau sur la plage, et demandez toujours avant de photographier les adeptes.",
    dateNote: "Trois jours autour du deuxième vendredi de janvier (8, 9 et 10 janvier en 2026) ; dates et programme publiés chaque année par le gouvernement fin novembre ou en décembre.",
    en: {
      name: "Ouidah Vodun Days",
      summary: "Three days of ceremonies, masquerades and concerts in Ouidah, the spiritual capital of vodun.",
      description:
        "Launched by the government in 2024 around the traditional religions holiday, the Vodun Days have made Ouidah January's great cultural gathering: more than 435,000 participants were counted in 2025. The programme combines the great vodun ceremony, Egungun and Zangbeto masquerades in the Ouidah arena, events in the squares and convents, a crafts and food village, and huge evening concerts on the beach in front of the Door of No Return. A unique chance to see living vodun, between spirituality and popular celebration.",
      tips: "Book accommodation in Ouidah or Cotonou months ahead; arrive early for ceremonies, bring a hat and water on the beach, and always ask before photographing devotees.",
      dateNote: "Three days around the second Friday of January (8, 9 and 10 January in 2026); dates and programme are published every year by the government in late November or December.",
    },
    i18n: {
      es: {
        name: "Vodun Days de Ouidah",
        summary: "Tres días de ceremonias, máscaras y conciertos en Ouidah, capital espiritual del vudú.",
        description:
          "Lanzados en 2024 por el Gobierno en torno a la fiesta de las religiones tradicionales, los Vodun Days han convertido Ouidah en la gran cita cultural de enero: en 2025 se contabilizaron más de 435 000 participantes. El programa combina la gran ceremonia vudú, salidas de máscaras Egungun y Zangbeto en la arena de Ouidah, animaciones en las plazas y conventos, un pueblo artesanal y gastronómico y grandes conciertos nocturnos en la playa, frente a la Puerta del No Retorno. Una ocasión única para ver el vudú vivo, entre espiritualidad y fiesta popular.",
        tips: "Reserve su alojamiento en Ouidah o Cotonou con meses de antelación; llegue pronto a las ceremonias, lleve sombrero y agua a la playa y pida siempre permiso antes de fotografiar a los adeptos.",
        dateNote: "Tres días en torno al segundo viernes de enero (8, 9 y 10 de enero en 2026); fechas y programa publicados cada año por el Gobierno a finales de noviembre o en diciembre.",
      },
      pt: {
        name: "Vodun Days de Ouidah",
        summary: "Três dias de cerimónias, máscaras e concertos em Ouidah, capital espiritual do vodu.",
        description:
          "Lançados em 2024 pelo Governo em torno da festa das religiões tradicionais, os Vodun Days fizeram de Ouidah o grande encontro cultural de janeiro: em 2025 foram contabilizados mais de 435 000 participantes. O programa junta a grande cerimónia vodu, saídas das máscaras Egungun e Zangbeto na arena de Ouidah, animações nas praças e conventos, uma aldeia de artesanato e gastronomia e grandes concertos noturnos na praia, diante da Porta do Não Retorno. Uma ocasião única para ver o vodu vivo, entre espiritualidade e festa popular.",
        tips: "Reserve alojamento em Ouidah ou Cotonou com meses de antecedência; chegue cedo às cerimónias, leve chapéu e água para a praia e peça sempre autorização antes de fotografar os adeptos.",
        dateNote: "Três dias em torno da segunda sexta-feira de janeiro (8, 9 e 10 de janeiro em 2026); datas e programa publicados todos os anos pelo Governo no fim de novembro ou em dezembro.",
      },
      ar: {
        name: "أيام الفودون في ويدا",
        summary: "ثلاثة أيام من الطقوس والأقنعة والحفلات في ويدا، العاصمة الروحية للفودون.",
        description:
          "أطلقت الحكومة «أيام الفودون» عام 2024 حول عيد الديانات التقليدية، فجعلت من ويدا الموعد الثقافي الأكبر في يناير: إذ أُحصي أكثر من 435 ألف مشارك في 2025. ويجمع البرنامج بين الطقس الفودوني الكبير، وخروج أقنعة الإيغونغون والزانغبيتو في ساحة ويدا، وأنشطة في الساحات والأديرة، وقرية للحرف والمأكولات، وحفلات ضخمة مساءً على الشاطئ أمام بوابة اللاعودة. فرصة فريدة لرؤية الفودون حيًّا بين الروحانية والاحتفال الشعبي.",
        tips: "احجز إقامتك في ويدا أو كوتونو قبل أشهر؛ واحضر الطقوس باكرًا، واحمل قبعة وماء على الشاطئ، واستأذن دائمًا قبل تصوير الأتباع.",
        dateNote: "ثلاثة أيام حول يوم الجمعة الثاني من يناير (8 و9 و10 يناير في 2026)؛ تنشر الحكومة التواريخ والبرنامج كل عام في أواخر نوفمبر أو في ديسمبر.",
      },
    },
  },
  {
    slug: "ramadan-benin",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 1, days: 30 },
    sources: ["https://www.routard.com/fr/agenda/p/benin", "https://lepetitjournal.com/cotonou/jours-feries-benin-295464"],
    name: "Ramadan",
    summary: "Le mois de jeûne des musulmans, qui s'achève par la Korité.",
    description:
      "Pendant le ramadan, les musulmans jeûnent de l'aube au coucher du soleil. La vie quotidienne continue normalement dans le sud, mais le rythme change dans les quartiers musulmans et dans le nord : rues animées à la rupture du jeûne, vendeurs de bouillies, de beignets et de jus en fin de journée, prières nocturnes dans les mosquées. Le mois se termine par la Korité, jour férié.",
    tips: "Évitez de manger, boire ou fumer ostensiblement en public dans les quartiers musulmans en journée ; la fin d'après-midi est un bon moment pour goûter les spécialités de la rupture du jeûne.",
    where: "Dans tout le pays, surtout dans le nord et les quartiers musulmans",
    dateNote: "Mois de ramadan (9e mois du calendrier musulman), environ 29 à 30 jours ; début et fin fixés selon l'observation de la lune.",
    en: {
      name: "Ramadan",
      summary: "The Muslim month of fasting, ending with Korité.",
      description:
        "During Ramadan, Muslims fast from dawn to sunset. Daily life carries on as usual in the south, but the pace changes in Muslim neighbourhoods and in the north: streets come alive when the fast is broken, vendors sell porridge, fritters and juices at the end of the day, and night prayers fill the mosques. The month ends with Korité, a public holiday.",
      tips: "Avoid eating, drinking or smoking conspicuously in public in Muslim areas during the day; late afternoon is a good time to taste the dishes served to break the fast.",
      where: "Nationwide, especially in the north and in Muslim neighbourhoods",
      dateNote: "Month of Ramadan (9th month of the Islamic calendar), about 29 to 30 days; start and end set by moon sighting.",
    },
    i18n: {
      es: {
        name: "Ramadán",
        summary: "El mes de ayuno de los musulmanes, que termina con la Korité.",
        description:
          "Durante el ramadán, los musulmanes ayunan desde el alba hasta la puesta del sol. La vida cotidiana sigue con normalidad en el sur, pero el ritmo cambia en los barrios musulmanes y en el norte: calles animadas a la hora de romper el ayuno, vendedores de gachas, buñuelos y zumos al final del día y oraciones nocturnas en las mezquitas. El mes termina con la Korité, día festivo.",
        tips: "Evite comer, beber o fumar ostensiblemente en público durante el día en los barrios musulmanes; el final de la tarde es buen momento para probar las especialidades de la ruptura del ayuno.",
        where: "En todo el país, sobre todo en el norte y en los barrios musulmanes",
        dateNote: "Mes de ramadán (9.º mes del calendario musulmán), unos 29 a 30 días; inicio y fin fijados según la observación de la luna.",
      },
      pt: {
        name: "Ramadão",
        summary: "O mês de jejum dos muçulmanos, que termina com a Korité.",
        description:
          "Durante o Ramadão, os muçulmanos jejuam do amanhecer ao pôr do sol. A vida quotidiana continua normalmente no sul, mas o ritmo muda nos bairros muçulmanos e no norte: ruas animadas à hora da quebra do jejum, vendedores de papas, bolinhos fritos e sumos ao fim do dia e orações noturnas nas mesquitas. O mês termina com a Korité, feriado.",
        tips: "Evite comer, beber ou fumar ostensivamente em público durante o dia nos bairros muçulmanos; o fim da tarde é um bom momento para provar as especialidades da quebra do jejum.",
        where: "Em todo o país, sobretudo no norte e nos bairros muçulmanos",
        dateNote: "Mês do Ramadão (9.º mês do calendário muçulmano), cerca de 29 a 30 dias; início e fim fixados segundo a observação da lua.",
      },
      ar: {
        name: "رمضان",
        summary: "شهر صيام المسلمين، الذي يُختتم بعيد الفطر.",
        description:
          "يصوم المسلمون في رمضان من الفجر حتى غروب الشمس. وتستمر الحياة اليومية كالمعتاد في الجنوب، لكن الإيقاع يتغير في الأحياء المسلمة وفي الشمال: شوارع تنبض بالحياة عند الإفطار، وباعة العصائد والفطائر المقلية والعصائر في آخر النهار، وصلوات التراويح في المساجد. ويُختتم الشهر بعيد الفطر، وهو عطلة رسمية.",
        tips: "تجنّب الأكل أو الشرب أو التدخين علنًا في النهار في الأحياء المسلمة؛ وآخر العصر وقت مناسب لتذوّق أطباق الإفطار.",
        where: "في جميع أنحاء البلاد، ولا سيما في الشمال والأحياء المسلمة",
        dateNote: "شهر رمضان (الشهر التاسع من التقويم الهجري)، نحو 29 إلى 30 يومًا؛ يُحدَّد بدايته ونهايته برؤية الهلال.",
      },
    },
  },
  {
    slug: "gaani-nikki",
    kind: "TRADITIONAL",
    publicHoliday: false,
    caution: true,
    rule: { type: "hijri", month: 3, day: 12, days: 3 },
    cover: "/images/voyage/fete-gaani-nikki",
    sources: [
      "https://beninwebtv.bj/benin-voici-les-dates-officielles-de-la-gaani-2026/",
      "https://www.gouv.bj/article/405/a-la-decouverte-de-la-gaani-richesse-culturelle-et-touristique-du-benin-bientot-revalorisee-par-le-gouvernement/",
      "https://www.afrik.com/la-gaani-fete-identitaire-des-baatombus-au-benin",
      "https://www.gov.uk/foreign-travel-advice/benin",
    ],
    name: "Gaani de Nikki",
    summary: "La grande fête royale et identitaire des Baatonou, avec parades de cavaliers autour du roi de Nikki.",
    description:
      "La Gaani est la fête majeure des Baatonou (Bariba) et des Boo du nord-est, célébrée à Nikki autour du Sinaboko, le roi de Nikki. Née d'une adaptation locale de la fête du Maouloud introduite par des commerçants dendi, elle célèbre aussi la victoire des ancêtres et l'entrée dans une nouvelle année lunaire. Sortie des tambours sacrés, parcours rituel du roi à cheval vêtu d'habits brodés, hommages des chefs et parades spectaculaires des cavaliers wassangari, au son des trompes royales : c'est l'un des plus beaux spectacles équestres d'Afrique de l'Ouest.",
    tips: "Nikki se trouve à l'est de l'axe Tchaourou–Malanville, zone déconseillée sauf raison impérative par le FCDO britannique : consultez la rubrique Sécurité et les conseils officiels avant tout projet. Sur place, ne photographiez pas le roi ou les rites sans autorisation.",
    where: "Nikki (Borgou)",
    dateNote: "Calée sur le calendrier lunaire, au moment du Maouloud ; dates officielles annoncées chaque année par la cour impériale de Nikki (25 au 27 août 2026, jour principal le 26).",
    en: {
      name: "Gaani of Nikki",
      summary: "The great royal and identity festival of the Baatonu, with horsemen parading around the king of Nikki.",
      description:
        "The Gaani is the major festival of the Baatonu (Bariba) and Boo peoples of the north-east, celebrated in Nikki around the Sinaboko, the king of Nikki. Born of a local adaptation of the Mawlid festival introduced by Dendi traders, it also celebrates the ancestors' victory and the start of a new lunar year. The sacred drums come out, the king rides in embroidered robes along a ritual route, chiefs pay homage and Wassangari horsemen put on spectacular parades to the sound of royal trumpets: one of the finest equestrian spectacles in West Africa.",
      tips: "Nikki lies east of the Tchaourou–Malanville road, an area where the British FCDO advises against all but essential travel: read the Safety section and official advice before planning anything. On site, do not photograph the king or the rites without permission.",
      where: "Nikki (Borgou)",
      dateNote: "Set by the lunar calendar, around Mawlid; official dates are announced each year by the imperial court of Nikki (25 to 27 August 2026, main day on the 26th).",
    },
    i18n: {
      es: {
        name: "Gaani de Nikki",
        summary: "La gran fiesta real e identitaria de los baatonu, con desfiles de jinetes en torno al rey de Nikki.",
        description:
          "La Gaani es la fiesta principal de los baatonu (bariba) y los boo del noreste, celebrada en Nikki en torno al Sinaboko, el rey de Nikki. Nacida de una adaptación local de la fiesta del Mawlid introducida por comerciantes dendi, celebra también la victoria de los antepasados y la entrada en un nuevo año lunar. Salida de los tambores sagrados, recorrido ritual del rey a caballo con ropajes bordados, homenajes de los jefes y espectaculares desfiles de los jinetes wassangari al son de las trompas reales: uno de los espectáculos ecuestres más bellos de África Occidental.",
        tips: "Nikki está al este del eje Tchaourou–Malanville, zona que el FCDO británico desaconseja salvo por motivo imperativo: consulte la sección Seguridad y las recomendaciones oficiales antes de cualquier proyecto. Allí, no fotografíe al rey ni los ritos sin autorización.",
        where: "Nikki (Borgou)",
        dateNote: "Ligada al calendario lunar, en torno al Mawlid; las fechas oficiales las anuncia cada año la corte imperial de Nikki (del 25 al 27 de agosto de 2026, día principal el 26).",
      },
      pt: {
        name: "Gaani de Nikki",
        summary: "A grande festa real e identitária dos baatonu, com desfiles de cavaleiros em torno do rei de Nikki.",
        description:
          "A Gaani é a principal festa dos baatonu (bariba) e dos boo do nordeste, celebrada em Nikki em torno do Sinaboko, o rei de Nikki. Nascida de uma adaptação local da festa do Mawlid introduzida por comerciantes dendi, celebra também a vitória dos antepassados e a entrada num novo ano lunar. Saída dos tambores sagrados, percurso ritual do rei a cavalo com vestes bordadas, homenagens dos chefes e desfiles espetaculares dos cavaleiros wassangari ao som das trompas reais: um dos mais belos espetáculos equestres da África Ocidental.",
        tips: "Nikki fica a leste do eixo Tchaourou–Malanville, zona desaconselhada pelo FCDO britânico salvo motivo imperativo: consulte a secção Segurança e os conselhos oficiais antes de qualquer projeto. No local, não fotografe o rei nem os ritos sem autorização.",
        where: "Nikki (Borgou)",
        dateNote: "Ligada ao calendário lunar, por altura do Mawlid; as datas oficiais são anunciadas todos os anos pela corte imperial de Nikki (de 25 a 27 de agosto de 2026, dia principal a 26).",
      },
      ar: {
        name: "عيد الغاني في نيكي",
        summary: "العيد الملكي والهوياتي الكبير لشعب الباتونو، مع استعراضات الفرسان حول ملك نيكي.",
        description:
          "الغاني هو العيد الأهم لشعبَي الباتونو (البارِيبا) والبو في الشمال الشرقي، ويُحتفل به في نيكي حول «السينابوكو» ملك نيكي. نشأ تكييفًا محليًا لعيد المولد النبوي أدخله تجار من شعب الدندي، ويحتفي أيضًا بانتصار الأسلاف وبدخول سنة قمرية جديدة. خروج الطبول المقدسة، وجولة الملك الطقسية على صهوة جواده بثياب مطرّزة، وتحيات الزعماء، واستعراضات مذهلة لفرسان الواسنغاري على أنغام الأبواق الملكية: من أجمل عروض الفروسية في غرب أفريقيا.",
        tips: "تقع نيكي شرق محور تشاورو–مالانفيل، وهي منطقة تنصح وزارة الخارجية البريطانية بعدم السفر إليها إلا للضرورة القصوى: راجع قسم الأمن والنصائح الرسمية قبل أي مشروع. وفي المكان لا تصوّر الملك أو الطقوس دون إذن.",
        where: "نيكي (بورغو)",
        dateNote: "مرتبط بالتقويم القمري في وقت المولد النبوي؛ يعلن البلاط الإمبراطوري في نيكي التواريخ الرسمية كل عام (من 25 إلى 27 أغسطس 2026، واليوم الرئيسي في 26).",
      },
    },
  },
  {
    slug: "nonvitcha-grand-popo",
    kind: "TRADITIONAL",
    publicHoliday: false,
    destination: "grand-popo",
    rule: { type: "easter", offset: 47, days: 4 },
    cover: "/images/voyage/fete-nonvitcha-grand-popo",
    sources: [
      "https://lanouvelletribune.info/2025/06/nonvitcha-2025-entre-tradition-foi-et-ambition-nationale/",
      "https://lanouvelletribune.info/2025/06/nonvitcha-2025-au-benin-la-jeunesse-a-lhonneur-pour-la-104e-edition/",
      "https://lanouvelletribune.info/2011/06/nonvitcha-la-plus-vieille-association-festive-du-benin/",
    ],
    name: "Nonvitcha de Grand-Popo",
    summary: "Depuis 1921, la grande fête de fraternité des peuples xwla et xwéla, chaque week-end de Pentecôte.",
    description:
      "« Nonvitcha » signifie « frères unis » en langue mina. Fondée en 1921, cette association festive, l'une des plus anciennes du Bénin, réunit chaque Pentecôte à Grand-Popo les communautés xwla et xwéla de la côte et leur diaspora. Le programme mêle messe solennelle, compétitions sportives, actions sociales, hommages aux aînés, soirées culturelles et jeux sur la plage. Une plongée chaleureuse dans la vie de la côte, à quelques kilomètres de la frontière togolaise.",
    tips: "Réservez tôt à Grand-Popo, où l'affluence est forte ce week-end-là ; ne vous baignez pas, les courants sont très dangereux.",
    dateNote: "Week-end de la Pentecôte, du vendredi au lundi (6 au 9 juin en 2025) ; programme annoncé par l'association chaque année.",
    en: {
      name: "Nonvitcha of Grand-Popo",
      summary: "Since 1921, the great brotherhood festival of the Xwla and Xwela peoples, every Pentecost weekend.",
      description:
        "“Nonvitcha” means “united brothers” in the Mina language. Founded in 1921, this festive association, one of the oldest in Benin, brings together the coastal Xwla and Xwela communities and their diaspora in Grand-Popo every Pentecost. The programme combines a solemn mass, sports competitions, social initiatives, tributes to elders, cultural evenings and games on the beach. A warm dive into coastal life, a few kilometres from the Togolese border.",
      tips: "Book early in Grand-Popo, which gets very busy that weekend; do not swim, the currents are very dangerous.",
      dateNote: "Pentecost weekend, Friday to Monday (6 to 9 June in 2025); programme announced by the association every year.",
    },
    i18n: {
      es: {
        name: "Nonvitcha de Grand-Popo",
        summary: "Desde 1921, la gran fiesta de fraternidad de los pueblos xwla y xwela, cada fin de semana de Pentecostés.",
        description:
          "«Nonvitcha» significa «hermanos unidos» en lengua mina. Fundada en 1921, esta asociación festiva, una de las más antiguas de Benín, reúne cada Pentecostés en Grand-Popo a las comunidades xwla y xwela de la costa y a su diáspora. El programa combina misa solemne, competiciones deportivas, acciones sociales, homenajes a los mayores, veladas culturales y juegos en la playa. Una cálida inmersión en la vida de la costa, a pocos kilómetros de la frontera con Togo.",
        tips: "Reserve pronto en Grand-Popo, que se llena ese fin de semana; no se bañe, las corrientes son muy peligrosas.",
        dateNote: "Fin de semana de Pentecostés, de viernes a lunes (del 6 al 9 de junio en 2025); programa anunciado cada año por la asociación.",
      },
      pt: {
        name: "Nonvitcha de Grand-Popo",
        summary: "Desde 1921, a grande festa de fraternidade dos povos xwla e xwela, em cada fim de semana de Pentecostes.",
        description:
          "«Nonvitcha» significa «irmãos unidos» na língua mina. Fundada em 1921, esta associação festiva, uma das mais antigas do Benim, reúne em cada Pentecostes, em Grand-Popo, as comunidades xwla e xwela da costa e a sua diáspora. O programa junta missa solene, competições desportivas, ações sociais, homenagens aos mais velhos, serões culturais e jogos na praia. Um mergulho caloroso na vida da costa, a poucos quilómetros da fronteira com o Togo.",
        tips: "Reserve cedo em Grand-Popo, que fica muito concorrida nesse fim de semana; não tome banho, as correntes são muito perigosas.",
        dateNote: "Fim de semana de Pentecostes, de sexta a segunda-feira (de 6 a 9 de junho em 2025); programa anunciado todos os anos pela associação.",
      },
      ar: {
        name: "نونفيتشا غران بوبو",
        summary: "منذ عام 1921، عيد الأخوّة الكبير لشعبَي الشوْلا والشويلا في كل عطلة عيد العنصرة.",
        description:
          "تعني «نونفيتشا» «الإخوة المتحدون» بلغة المينا. تأسست هذه الجمعية الاحتفالية عام 1921، وهي من أقدم الجمعيات في بنين، وتجمع في كل عيد عنصرة في غران بوبو مجتمعات الشوْلا والشويلا الساحلية ومغتربيها. ويجمع البرنامج بين قداس احتفالي ومسابقات رياضية وأعمال اجتماعية وتكريم للمسنين وأمسيات ثقافية وألعاب على الشاطئ. غوص دافئ في حياة الساحل على بُعد كيلومترات قليلة من الحدود التوغولية.",
        tips: "احجز مبكرًا في غران بوبو التي تشهد إقبالًا كبيرًا في تلك العطلة؛ ولا تسبح، فالتيارات خطيرة جدًا.",
        dateNote: "عطلة نهاية أسبوع العنصرة، من الجمعة إلى الاثنين (من 6 إلى 9 يونيو في 2025)؛ تعلن الجمعية البرنامج كل عام.",
      },
    },
  },
  {
    slug: "fete-igname-savalou",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "fixed", month: 8, day: 15 },
    sources: [
      "https://www.afrik.com/benin-la-fete-de-l-igname-un-pilier-culturel-et-moteur-touristique-celebre-avec-faste",
      "https://lanouvelletribune.info/2026/08/benin-ce-que-revele-loracle-apres-les-consultations-pour-la-fete-de-ligname/",
      "https://lanouvelletribune.info/2021/03/enquete-ligname-a-savalou-au-dela-de-la-fete-une-culture-et-une-histoire/",
    ],
    name: "Fête de l'igname de Savalou",
    summary: "Chaque 15 août, Savalou célèbre la nouvelle récolte d'igname autour de son roi.",
    description:
      "L'igname est l'aliment roi du centre du Bénin, et Savalou, au pied de ses collines, en a fait sa grande fête. Le 15 août, jour de rassemblement de la ville depuis les années 1950, la consommation de la nouvelle igname est ouverte après la consultation de l'oracle Fâ par la royauté, un volet rituel ajouté en 2006 par le roi Tossoh Gbaguidi XIII. Cérémonies traditionnelles, défilés, danses, foire et pilé d'igname partagé attirent une foule venue de tout le pays et de la diaspora. D'autres villes du centre et du nord, comme Dassa-Zoumè ou Bassila, célèbrent elles aussi l'igname nouvelle à cette période.",
    tips: "Goûtez l'igname pilée accompagnée de sauce ; demandez l'autorisation avant de photographier les cérémonies royales et les rites.",
    where: "Savalou (Collines)",
    dateNote: "Chaque année le 15 août, précédé de la consultation de l'oracle les jours d'avant.",
    en: {
      name: "Savalou Yam Festival",
      summary: "Every 15 August, Savalou celebrates the new yam harvest around its king.",
      description:
        "Yam is the king of foods in central Benin, and Savalou, at the foot of its hills, has made it its great festival. On 15 August, the town's gathering day since the 1950s, eating of the new yam is opened after the royal court consults the Fa oracle, a ritual element added in 2006 by King Tossoh Gbaguidi XIII. Traditional ceremonies, parades, dances, a fair and shared pounded yam draw crowds from all over the country and the diaspora. Other towns in the centre and north, such as Dassa-Zoumè and Bassila, also celebrate the new yam at this time.",
      tips: "Try pounded yam with sauce; ask permission before photographing royal ceremonies and rites.",
      where: "Savalou (Collines)",
      dateNote: "Every year on 15 August, preceded by the oracle consultation in the days before.",
    },
    i18n: {
      es: {
        name: "Fiesta del ñame de Savalou",
        summary: "Cada 15 de agosto, Savalou celebra la nueva cosecha de ñame en torno a su rey.",
        description:
          "El ñame es el alimento rey del centro de Benín, y Savalou, al pie de sus colinas, lo ha convertido en su gran fiesta. El 15 de agosto, día de reunión de la ciudad desde los años cincuenta, se abre el consumo del ñame nuevo tras la consulta del oráculo Fa por la realeza, un componente ritual añadido en 2006 por el rey Tossoh Gbaguidi XIII. Ceremonias tradicionales, desfiles, danzas, feria y ñame machacado compartido atraen a una multitud llegada de todo el país y de la diáspora. Otras ciudades del centro y del norte, como Dassa-Zoumè o Bassila, también celebran el ñame nuevo en esa época.",
        tips: "Pruebe el ñame machacado con salsa; pida permiso antes de fotografiar las ceremonias reales y los ritos.",
        where: "Savalou (Collines)",
        dateNote: "Cada año el 15 de agosto, precedido de la consulta del oráculo los días anteriores.",
      },
      pt: {
        name: "Festa do inhame de Savalou",
        summary: "Todos os anos a 15 de agosto, Savalou celebra a nova colheita de inhame em torno do seu rei.",
        description:
          "O inhame é o alimento rei do centro do Benim, e Savalou, no sopé das suas colinas, fez dele a sua grande festa. A 15 de agosto, dia de reunião da cidade desde os anos 1950, o consumo do inhame novo é aberto depois da consulta do oráculo Fá pela realeza, uma componente ritual acrescentada em 2006 pelo rei Tossoh Gbaguidi XIII. Cerimónias tradicionais, desfiles, danças, feira e inhame pilado partilhado atraem uma multidão vinda de todo o país e da diáspora. Outras cidades do centro e do norte, como Dassa-Zoumè ou Bassila, também celebram o inhame novo nesta altura.",
        tips: "Prove o inhame pilado com molho; peça autorização antes de fotografar as cerimónias reais e os ritos.",
        where: "Savalou (Collines)",
        dateNote: "Todos os anos a 15 de agosto, precedido da consulta do oráculo nos dias anteriores.",
      },
      ar: {
        name: "عيد اليام في سافالو",
        summary: "في 15 أغسطس من كل عام تحتفل سافالو بمحصول اليام الجديد حول ملكها.",
        description:
          "اليام سيّد الأطعمة في وسط بنين، وقد جعلت منه سافالو، الواقعة عند سفح تلالها، عيدها الكبير. ففي 15 أغسطس، وهو يوم تجمّع المدينة منذ خمسينيات القرن الماضي، يُفتتح أكل اليام الجديد بعد أن تستشير الأسرة الملكية عرّافة «الفا»، وهو جانب طقسي أضافه الملك توسو غباغيدي الثالث عشر عام 2006. وتجذب المراسم التقليدية والمسيرات والرقصات والمعرض وطبق اليام المدقوق المشترك حشودًا من أنحاء البلاد ومن المغتربين. وتحتفل مدن أخرى في الوسط والشمال، مثل داسا-زومي وباسيلا، باليام الجديد في الفترة نفسها.",
        tips: "تذوّق اليام المدقوق مع الصلصة؛ واستأذن قبل تصوير المراسم الملكية والطقوس.",
        where: "سافالو (التلال)",
        dateNote: "كل عام في 15 أغسطس، وتسبقه استشارة العرّافة في الأيام السابقة.",
      },
    },
  },
  {
    slug: "pelerinage-marial-arigbo",
    kind: "RELIGIOUS",
    publicHoliday: false,
    place: "grotte-notre-dame-d-arigbo",
    rule: { type: "period", from: 8, to: 8 },
    cover: "/images/voyage/fete-pelerinage-marial-arigbo",
    sources: [
      "https://www.vaticannews.va/fr/eglise/news/2025-08/benin-mgr-ruiz-mainardi-appelle-a-sortir-de-notre-zone-de-con.html",
      "https://www.vaticannews.va/fr/afrique/news/2022-08/cloture-de-la-68e-edition-du-pelerinage-marial-national-du-benin.html",
    ],
    name: "Pèlerinage marial national d'Arigbo",
    summary: "Chaque mois d'août, des centaines de milliers de pèlerins convergent vers la grotte d'Arigbo à Dassa-Zoumè.",
    description:
      "Né en 1954 à l'initiative de Mgr Louis Parisot, le pèlerinage marial national de l'Église du Bénin réunit chaque année les fidèles des dix diocèses du pays au sanctuaire Notre-Dame d'Arigbo, au pied des collines de Dassa-Zoumè. Pendant trois jours, processions, chemin de croix, veillées, confessions et grandes messes en plein air se succèdent ; le recteur du sanctuaire a estimé à plus de 700 000 le nombre de pèlerins en 2025. Une ferveur impressionnante, à découvrir dans le respect du recueillement.",
    tips: "Hébergement quasi introuvable à Dassa ces jours-là : logez à Bohicon ou Abomey, ou venez à la journée. Prévoyez eau, chapeau et chaussures confortables.",
    dateNote: "Un week-end (vendredi au dimanche) de la seconde moitié d'août : 22 au 24 août 2025, 19 au 21 août 2022 ; dates annoncées par la Conférence épiscopale du Bénin.",
    en: {
      name: "Arigbo National Marian Pilgrimage",
      summary: "Every August, hundreds of thousands of pilgrims converge on the Arigbo grotto in Dassa-Zoumè.",
      description:
        "Started in 1954 at the initiative of Bishop Louis Parisot, the national Marian pilgrimage of the Church in Benin brings together every year the faithful of the country's ten dioceses at the shrine of Our Lady of Arigbo, at the foot of the Dassa-Zoumè hills. Over three days, processions, Stations of the Cross, vigils, confessions and huge open-air masses follow one another; the shrine's rector estimated the number of pilgrims at more than 700,000 in 2025. An impressive display of fervour, to be experienced with respect for the prayerful atmosphere.",
      tips: "Accommodation in Dassa is almost impossible to find at this time: stay in Bohicon or Abomey, or come for the day. Bring water, a hat and comfortable shoes.",
      dateNote: "A weekend (Friday to Sunday) in the second half of August: 22 to 24 August 2025, 19 to 21 August 2022; dates announced by the Bishops' Conference of Benin.",
    },
    i18n: {
      es: {
        name: "Peregrinación mariana nacional de Arigbo",
        summary: "Cada agosto, cientos de miles de peregrinos convergen en la gruta de Arigbo, en Dassa-Zoumè.",
        description:
          "Iniciada en 1954 por monseñor Louis Parisot, la peregrinación mariana nacional de la Iglesia de Benín reúne cada año a los fieles de las diez diócesis del país en el santuario de Nuestra Señora de Arigbo, al pie de las colinas de Dassa-Zoumè. Durante tres días se suceden procesiones, vía crucis, vigilias, confesiones y grandes misas al aire libre; el rector del santuario estimó en más de 700 000 los peregrinos en 2025. Un fervor impresionante, que se vive respetando el recogimiento.",
        tips: "Es casi imposible encontrar alojamiento en Dassa esos días: alójese en Bohicon o Abomey, o vaya en el día. Lleve agua, sombrero y calzado cómodo.",
        dateNote: "Un fin de semana (de viernes a domingo) de la segunda quincena de agosto: del 22 al 24 de agosto de 2025, del 19 al 21 de agosto de 2022; fechas anunciadas por la Conferencia Episcopal de Benín.",
      },
      pt: {
        name: "Peregrinação mariana nacional de Arigbo",
        summary: "Todos os anos em agosto, centenas de milhares de peregrinos convergem para a gruta de Arigbo, em Dassa-Zoumè.",
        description:
          "Iniciada em 1954 por D. Louis Parisot, a peregrinação mariana nacional da Igreja do Benim reúne todos os anos os fiéis das dez dioceses do país no santuário de Nossa Senhora de Arigbo, no sopé das colinas de Dassa-Zoumè. Durante três dias sucedem-se procissões, via-sacra, vigílias, confissões e grandes missas ao ar livre; o reitor do santuário estimou em mais de 700 000 o número de peregrinos em 2025. Um fervor impressionante, a viver com respeito pelo recolhimento.",
        tips: "É quase impossível encontrar alojamento em Dassa nesses dias: fique em Bohicon ou Abomey, ou vá só por um dia. Leve água, chapéu e calçado confortável.",
        dateNote: "Um fim de semana (de sexta a domingo) da segunda quinzena de agosto: de 22 a 24 de agosto de 2025, de 19 a 21 de agosto de 2022; datas anunciadas pela Conferência Episcopal do Benim.",
      },
      ar: {
        name: "الحج المريمي الوطني إلى أريغبو",
        summary: "في أغسطس من كل عام يتوافد مئات الآلاف من الحجاج إلى مغارة أريغبو في داسا-زومي.",
        description:
          "بدأ الحج المريمي الوطني للكنيسة في بنين عام 1954 بمبادرة من المطران لويس باريزو، ويجمع كل عام مؤمني أبرشيات البلاد العشر في مزار سيدة أريغبو عند سفح تلال داسا-زومي. وعلى مدى ثلاثة أيام تتوالى المواكب ودرب الصليب والسهرات والاعترافات والقداديس الكبرى في الهواء الطلق؛ وقد قدّر رئيس المزار عدد الحجاج بأكثر من 700 ألف في 2025. حماسة مؤثرة تُعاش مع احترام أجواء الخشوع.",
        tips: "يكاد يستحيل إيجاد مكان إقامة في داسا في تلك الأيام: انزل في بوهيكون أو أبومي أو تعالَ ليوم واحد. واحمل الماء وقبعة وحذاءً مريحًا.",
        dateNote: "عطلة نهاية أسبوع (من الجمعة إلى الأحد) في النصف الثاني من أغسطس: من 22 إلى 24 أغسطس 2025، ومن 19 إلى 21 أغسطس 2022؛ يعلن مؤتمر أساقفة بنين التواريخ.",
      },
    },
  },
  {
    slug: "jistna-ouidah",
    kind: "NATIONAL",
    publicHoliday: false,
    destination: "ouidah",
    rule: { type: "fixed", month: 8, day: 23 },
    sources: [
      "https://lanouvelletribune.info/2026/08/traite-negriere-le-benin-ouvre-la-porte-du-retour-a-ouidah-les-22-et-23-aout/",
      "https://www.gouv.bj/article/3214/commemoration-jistna-2025-benin-reaffirme-engagement-concilier-memoire-avenir/",
    ],
    name: "Journée du souvenir de la traite négrière (Ouidah)",
    summary: "Chaque 23 août, Ouidah commémore la traite négrière et son abolition, de la Route des Esclaves à la plage.",
    description:
      "Instituée par l'UNESCO en souvenir de l'insurrection de Saint-Domingue de 1791, la Journée internationale du souvenir de la traite négrière et de son abolition est commémorée chaque année à Ouidah, ancien grand port de la traite. Marche silencieuse ou marche du souvenir, conférences, débats, spectacles et cérémonies se tiennent entre l'arène culturelle, le fort portugais, la Route des Esclaves et la plage de la Porte du Non-Retour. Des Afro-descendants y participent, et le Bénin y remet désormais des documents de nationalité à ceux qui l'ont obtenue.",
    tips: "Moment de recueillement : adoptez une tenue sobre et une attitude respectueuse lors de la marche et des cérémonies.",
    dateNote: "Chaque année le 23 août, avec parfois des activités dès la veille (22 et 23 août en 2026).",
    en: {
      name: "Slave Trade Remembrance Day (Ouidah)",
      summary: "Every 23 August, Ouidah commemorates the slave trade and its abolition, from the Slave Route to the beach.",
      description:
        "Established by UNESCO in memory of the 1791 uprising in Saint-Domingue, the International Day for the Remembrance of the Slave Trade and its Abolition is commemorated every year in Ouidah, once a major slave-trading port. A silent or remembrance march, lectures, debates, performances and ceremonies take place between the cultural arena, the Portuguese fort, the Slave Route and the beach at the Door of No Return. People of African descent take part, and Benin now hands nationality documents to those who have obtained Beninese citizenship.",
      tips: "A time of remembrance: dress soberly and be respectful during the march and ceremonies.",
      dateNote: "Every year on 23 August, sometimes with events starting the day before (22 and 23 August in 2026).",
    },
    i18n: {
      es: {
        name: "Día del recuerdo de la trata de esclavos (Ouidah)",
        summary: "Cada 23 de agosto, Ouidah conmemora la trata de esclavos y su abolición, de la Ruta de los Esclavos a la playa.",
        description:
          "Instituido por la UNESCO en recuerdo de la insurrección de Santo Domingo de 1791, el Día Internacional del Recuerdo de la Trata de Esclavos y de su Abolición se conmemora cada año en Ouidah, antiguo gran puerto de la trata. Marcha silenciosa o marcha del recuerdo, conferencias, debates, espectáculos y ceremonias se celebran entre la arena cultural, el fuerte portugués, la Ruta de los Esclavos y la playa de la Puerta del No Retorno. Participan afrodescendientes, y Benín entrega ahora documentos de nacionalidad a quienes la han obtenido.",
        tips: "Momento de recogimiento: vista con sobriedad y mantenga una actitud respetuosa durante la marcha y las ceremonias.",
        dateNote: "Cada año el 23 de agosto, a veces con actividades desde la víspera (22 y 23 de agosto en 2026).",
      },
      pt: {
        name: "Dia da memória do tráfico de escravos (Ouidah)",
        summary: "Todos os anos a 23 de agosto, Ouidah comemora o tráfico de escravos e a sua abolição, da Rota dos Escravos à praia.",
        description:
          "Instituído pela UNESCO em memória da insurreição de São Domingos de 1791, o Dia Internacional da Memória do Tráfico de Escravos e da sua Abolição é comemorado todos os anos em Ouidah, antigo grande porto do tráfico. Marcha silenciosa ou marcha da memória, conferências, debates, espetáculos e cerimónias decorrem entre a arena cultural, o forte português, a Rota dos Escravos e a praia da Porta do Não Retorno. Participam afrodescendentes, e o Benim entrega agora documentos de nacionalidade aos que a obtiveram.",
        tips: "Momento de recolhimento: use vestuário sóbrio e mantenha uma atitude respeitosa durante a marcha e as cerimónias.",
        dateNote: "Todos os anos a 23 de agosto, por vezes com atividades a partir da véspera (22 e 23 de agosto em 2026).",
      },
      ar: {
        name: "يوم إحياء ذكرى تجارة الرقيق (ويدا)",
        summary: "في 23 أغسطس من كل عام تحيي ويدا ذكرى تجارة الرقيق وإلغائها، من طريق العبيد إلى الشاطئ.",
        description:
          "أقرّت اليونسكو اليوم الدولي لإحياء ذكرى تجارة الرقيق وإلغائها تخليدًا لانتفاضة سان دومينغ عام 1791، ويُحيا كل عام في ويدا، الميناء الكبير القديم لتجارة الرقيق. وتُقام مسيرة صامتة أو مسيرة للذكرى ومحاضرات ونقاشات وعروض ومراسم بين الساحة الثقافية والحصن البرتغالي وطريق العبيد وشاطئ بوابة اللاعودة. ويشارك فيها أبناء الشتات الأفريقي، وتسلّم بنين فيها الآن وثائق الجنسية لمن حصلوا عليها منهم.",
        tips: "مناسبة للتأمل والخشوع: ارتدِ لباسًا رصينًا والتزم الاحترام أثناء المسيرة والمراسم.",
        dateNote: "كل عام في 23 أغسطس، وأحيانًا تبدأ الأنشطة في اليوم السابق (22 و23 أغسطس في 2026).",
      },
    },
  },
  // ───────────── Festivals culturels ─────────────
  {
    slug: "festival-des-masques-porto-novo",
    kind: "FESTIVAL",
    publicHoliday: false,
    destination: "porto-novo",
    rule: { type: "period", from: 7, to: 8 },
    cover: "/images/voyage/fete-festival-des-masques-porto-novo",
    sources: [
      "https://benin.bj/en/news/the-2026-mask-festival-in-porto-novo-a-look-back-at-a-memorable-edition",
      "https://www.gouv.bj/article/2715/festival-masques-porto-novo-grande-effervescence-differents-sites-depuis-vendredi/",
      "https://fr.allafrica.com/stories/202507210743.html",
    ],
    name: "Festival des masques de Porto-Novo",
    summary: "Le grand rendez-vous estival des masques sacrés et profanes dans les places historiques de la capitale.",
    description:
      "Créé en 2024, le Festival des masques fait de Porto-Novo une scène à ciel ouvert : Zangbeto, Egungun, Gèlèdè (patrimoine immatériel de l'UNESCO), Gounouko et masques vodun se produisent sur les places historiques reliées par un parcours culturel, aux côtés de troupes venues d'Afrique de l'Ouest et d'ailleurs. Le programme comprend un village du festival (artisanat, cuisine, ateliers pour enfants), un colloque international, des concerts en soirée sur le boulevard lagunaire et une grande procession des masques en clôture.",
    tips: "La grande procession est gratuite : placez-vous tôt le long du parcours. Ne touchez pas les masques et respectez les interdits signalés par les organisateurs.",
    dateNote: "Fin juillet ou début août, sur deux à trois jours (2–4 août 2024, 2–3 août 2025, 25–26 juillet 2026) ; dates annoncées par le gouvernement quelques semaines avant.",
    en: {
      name: "Porto-Novo Mask Festival",
      summary: "The big summer gathering of sacred and secular masks in the capital's historic squares.",
      description:
        "Created in 2024, the Mask Festival turns Porto-Novo into an open-air stage: Zangbeto, Egungun, Gelede (UNESCO intangible heritage), Gounouko and vodun masks perform in the historic squares linked by a cultural trail, alongside troupes from West Africa and beyond. The programme includes a festival village (crafts, food, children's workshops), an international symposium, evening concerts on the lagoon boulevard and a grand mask procession to close.",
      tips: "The grand procession is free: get a spot early along the route. Do not touch the masks and respect the taboos indicated by the organisers.",
      dateNote: "Late July or early August, over two to three days (2–4 August 2024, 2–3 August 2025, 25–26 July 2026); dates announced by the government a few weeks before.",
    },
    i18n: {
      es: {
        name: "Festival de las máscaras de Porto-Novo",
        summary: "La gran cita veraniega de las máscaras sagradas y profanas en las plazas históricas de la capital.",
        description:
          "Creado en 2024, el Festival de las máscaras convierte Porto-Novo en un escenario al aire libre: Zangbeto, Egungun, Gelede (patrimonio inmaterial de la UNESCO), Gounouko y máscaras vudú actúan en las plazas históricas unidas por un recorrido cultural, junto a compañías llegadas de África Occidental y de otros lugares. El programa incluye un pueblo del festival (artesanía, cocina, talleres infantiles), un coloquio internacional, conciertos nocturnos en el bulevar de la laguna y una gran procesión de máscaras como cierre.",
        tips: "La gran procesión es gratuita: colóquese pronto a lo largo del recorrido. No toque las máscaras y respete las prohibiciones indicadas por los organizadores.",
        dateNote: "Finales de julio o principios de agosto, durante dos o tres días (2–4 de agosto de 2024, 2–3 de agosto de 2025, 25–26 de julio de 2026); fechas anunciadas por el Gobierno unas semanas antes.",
      },
      pt: {
        name: "Festival das máscaras de Porto-Novo",
        summary: "O grande encontro de verão das máscaras sagradas e profanas nas praças históricas da capital.",
        description:
          "Criado em 2024, o Festival das máscaras transforma Porto-Novo num palco a céu aberto: Zangbeto, Egungun, Gelede (património imaterial da UNESCO), Gounouko e máscaras vodu atuam nas praças históricas ligadas por um percurso cultural, ao lado de companhias vindas da África Ocidental e de outros lugares. O programa inclui uma aldeia do festival (artesanato, cozinha, oficinas para crianças), um colóquio internacional, concertos noturnos no boulevard da lagoa e uma grande procissão de máscaras no encerramento.",
        tips: "A grande procissão é gratuita: arranje lugar cedo ao longo do percurso. Não toque nas máscaras e respeite as interdições indicadas pelos organizadores.",
        dateNote: "Fim de julho ou início de agosto, durante dois a três dias (2–4 de agosto de 2024, 2–3 de agosto de 2025, 25–26 de julho de 2026); datas anunciadas pelo Governo algumas semanas antes.",
      },
      ar: {
        name: "مهرجان الأقنعة في بورتو نوفو",
        summary: "الموعد الصيفي الكبير للأقنعة المقدسة والدنيوية في الساحات التاريخية للعاصمة.",
        description:
          "أُنشئ مهرجان الأقنعة عام 2024، وهو يحوّل بورتو نوفو إلى مسرح مفتوح: تؤدي أقنعة الزانغبيتو والإيغونغون والغيليدي (التراث غير المادي لليونسكو) والغونونكو وأقنعة الفودون عروضها في الساحات التاريخية المتصلة بمسار ثقافي، إلى جانب فرق قادمة من غرب أفريقيا وخارجها. ويضم البرنامج قرية للمهرجان (حرف ومأكولات وورش للأطفال) وندوة دولية وحفلات مسائية على جادة البحيرة وموكبًا كبيرًا للأقنعة في الختام.",
        tips: "الموكب الكبير مجاني: اتخذ مكانك باكرًا على طول المسار. ولا تلمس الأقنعة واحترم المحظورات التي يعلنها المنظمون.",
        dateNote: "أواخر يوليو أو أوائل أغسطس، على مدى يومين إلى ثلاثة أيام (2–4 أغسطس 2024، 2–3 أغسطس 2025، 25–26 يوليو 2026)؛ تعلن الحكومة التواريخ قبل بضعة أسابيع.",
      },
    },
  },
  {
    slug: "finab-cotonou",
    kind: "FESTIVAL",
    publicHoliday: false,
    destination: "cotonou",
    rule: { type: "period", from: 2, to: 3 },
    sources: [
      "https://lanouvelletribune.info/2026/02/benin-le-finab-2026-officiellement-lance-a-family-beach/",
      "https://www.financialafrik.com/2025/02/16/finab-2025-cotonou-sillumine-au-rythme-de-la-creativite-africaine/",
      "https://lanouvelletribune.info/2026/02/benin-ulrich-adjovi-et-son-equipe-presentent-le-finab-2026/",
    ],
    name: "FInAB – Festival international des arts du Bénin",
    summary: "Dix jours de musique, théâtre, danse, cinéma, mode et arts visuels à Cotonou, fin février.",
    description:
      "Lancé en 2023, le Festival international des arts du Bénin s'est imposé comme l'un des grands festivals pluridisciplinaires d'Afrique de l'Ouest : concerts, spectacles de théâtre et de danse, projections et prix de cinéma, défilés d'une Fashion Week, littérature et expositions, avec des artistes venus d'une vingtaine de pays. Le site principal se trouve en bord de mer à Cotonou, avec des événements associés à Porto-Novo et Ouidah selon les éditions.",
    tips: "Programme et billetterie publiés quelques semaines avant ; les grands concerts du soir sont très courus, achetez vos billets à l'avance.",
    dateNote: "Dix jours entre fin février et début mars (21 février–2 mars 2025, 20 février–1er mars 2026) ; dates annoncées par les organisateurs chaque année.",
    en: {
      name: "FInAB – International Festival of the Arts of Benin",
      summary: "Ten days of music, theatre, dance, film, fashion and visual arts in Cotonou in late February.",
      description:
        "Launched in 2023, the International Festival of the Arts of Benin has become one of West Africa's major multidisciplinary festivals: concerts, theatre and dance performances, film screenings and awards, Fashion Week shows, literature and exhibitions, with artists from around twenty countries. The main site is by the sea in Cotonou, with related events in Porto-Novo and Ouidah depending on the edition.",
      tips: "The programme and ticketing are published a few weeks ahead; the big evening concerts are very popular, so buy tickets in advance.",
      dateNote: "Ten days between late February and early March (21 February–2 March 2025, 20 February–1 March 2026); dates announced by the organisers every year.",
    },
    i18n: {
      es: {
        name: "FInAB – Festival Internacional de las Artes de Benín",
        summary: "Diez días de música, teatro, danza, cine, moda y artes visuales en Cotonou, a finales de febrero.",
        description:
          "Lanzado en 2023, el Festival Internacional de las Artes de Benín se ha consolidado como uno de los grandes festivales multidisciplinares de África Occidental: conciertos, espectáculos de teatro y danza, proyecciones y premios de cine, desfiles de una Fashion Week, literatura y exposiciones, con artistas de una veintena de países. El recinto principal está junto al mar en Cotonou, con actividades asociadas en Porto-Novo y Ouidah según la edición.",
        tips: "El programa y la venta de entradas se publican unas semanas antes; los grandes conciertos nocturnos son muy solicitados, compre las entradas con antelación.",
        dateNote: "Diez días entre finales de febrero y principios de marzo (21 de febrero–2 de marzo de 2025, 20 de febrero–1 de marzo de 2026); fechas anunciadas cada año por los organizadores.",
      },
      pt: {
        name: "FInAB – Festival Internacional das Artes do Benim",
        summary: "Dez dias de música, teatro, dança, cinema, moda e artes visuais em Cotonou, no fim de fevereiro.",
        description:
          "Lançado em 2023, o Festival Internacional das Artes do Benim impôs-se como um dos grandes festivais multidisciplinares da África Ocidental: concertos, espetáculos de teatro e dança, projeções e prémios de cinema, desfiles de uma Fashion Week, literatura e exposições, com artistas de cerca de vinte países. O recinto principal fica à beira-mar em Cotonou, com eventos associados em Porto-Novo e Ouidah conforme a edição.",
        tips: "O programa e a bilheteira são publicados algumas semanas antes; os grandes concertos noturnos são muito procurados, compre os bilhetes com antecedência.",
        dateNote: "Dez dias entre o fim de fevereiro e o início de março (21 de fevereiro–2 de março de 2025, 20 de fevereiro–1 de março de 2026); datas anunciadas todos os anos pelos organizadores.",
      },
      ar: {
        name: "فيناب – المهرجان الدولي لفنون بنين",
        summary: "عشرة أيام من الموسيقى والمسرح والرقص والسينما والأزياء والفنون البصرية في كوتونو أواخر فبراير.",
        description:
          "انطلق المهرجان الدولي لفنون بنين عام 2023، وأصبح من أكبر المهرجانات متعددة التخصصات في غرب أفريقيا: حفلات موسيقية وعروض مسرحية وراقصة وعروض أفلام وجوائز سينمائية وعروض أسبوع للموضة وأدب ومعارض، بمشاركة فنانين من نحو عشرين بلدًا. ويقع الموقع الرئيسي على شاطئ البحر في كوتونو، مع فعاليات مرافقة في بورتو نوفو وويدا بحسب الدورات.",
        tips: "يُنشر البرنامج ونظام التذاكر قبل بضعة أسابيع؛ والحفلات المسائية الكبرى تشهد إقبالًا كبيرًا، فاشترِ تذاكرك مسبقًا.",
        dateNote: "عشرة أيام بين أواخر فبراير وأوائل مارس (21 فبراير–2 مارس 2025، و20 فبراير–1 مارس 2026)؛ يعلن المنظمون التواريخ كل عام.",
      },
    },
  },
  {
    slug: "fete-de-la-musique-benin",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "fixed", month: 6, day: 21 },
    cover: "/images/voyage/fete-fete-de-la-musique-benin",
    sources: [
      "https://www.gouv.bj/article/3122/le-gouvernement-benin-annonce-fete-musique-edition-2025/",
      "https://www.gouv.bj/article/3131/fete-musique-2025-benin-vibre-unisson-quatre-grandes-scenes-nationales/",
    ],
    name: "Fête de la musique",
    summary: "Concerts gratuits dans plusieurs grandes villes autour du 21 juin.",
    description:
      "Organisée par l'Agence de développement des arts et de la culture pour le compte du ministère de la Culture, la Fête de la musique propose des concerts gratuits d'artistes béninois de toutes générations, du tradi-moderne à l'afrobeat. En 2025, quatre scènes ont été montées à Cotonou (Palais des congrès), Porto-Novo, Bohicon et Parakou, sur trois jours.",
    tips: "Entrée libre mais places limitées dans les salles : arrivez tôt. Le programme est annoncé quelques jours avant par le gouvernement.",
    where: "Cotonou, Porto-Novo, Bohicon et Parakou (selon les éditions)",
    dateNote: "Autour du 21 juin (20 au 22 juin en 2025) ; villes et programme annoncés chaque année.",
    en: {
      name: "Fête de la Musique",
      summary: "Free concerts in several major cities around 21 June.",
      description:
        "Organised by the Agency for the Development of Arts and Culture on behalf of the Ministry of Culture, the Fête de la Musique offers free concerts by Beninese artists of every generation, from traditional-modern styles to afrobeat. In 2025, four stages were set up in Cotonou (Palais des Congrès), Porto-Novo, Bohicon and Parakou over three days.",
      tips: "Free entry but limited space in the venues: arrive early. The programme is announced a few days ahead by the government.",
      where: "Cotonou, Porto-Novo, Bohicon and Parakou (depending on the year)",
      dateNote: "Around 21 June (20 to 22 June in 2025); cities and programme announced every year.",
    },
    i18n: {
      es: {
        name: "Fiesta de la Música",
        summary: "Conciertos gratuitos en varias grandes ciudades en torno al 21 de junio.",
        description:
          "Organizada por la Agencia de Desarrollo de las Artes y la Cultura por encargo del Ministerio de Cultura, la Fiesta de la Música ofrece conciertos gratuitos de artistas beninenses de todas las generaciones, de la música tradicional moderna al afrobeat. En 2025 se montaron cuatro escenarios en Cotonou (Palacio de Congresos), Porto-Novo, Bohicon y Parakou durante tres días.",
        tips: "Entrada libre pero aforo limitado en las salas: llegue pronto. El programa lo anuncia el Gobierno unos días antes.",
        where: "Cotonou, Porto-Novo, Bohicon y Parakou (según la edición)",
        dateNote: "En torno al 21 de junio (del 20 al 22 de junio en 2025); ciudades y programa anunciados cada año.",
      },
      pt: {
        name: "Festa da Música",
        summary: "Concertos gratuitos em várias grandes cidades por volta de 21 de junho.",
        description:
          "Organizada pela Agência de Desenvolvimento das Artes e da Cultura por conta do Ministério da Cultura, a Festa da Música propõe concertos gratuitos de artistas beninenses de todas as gerações, do tradicional-moderno ao afrobeat. Em 2025, foram montados quatro palcos em Cotonou (Palácio dos Congressos), Porto-Novo, Bohicon e Parakou, durante três dias.",
        tips: "Entrada livre, mas lugares limitados nas salas: chegue cedo. O programa é anunciado pelo Governo alguns dias antes.",
        where: "Cotonou, Porto-Novo, Bohicon e Parakou (conforme a edição)",
        dateNote: "Por volta de 21 de junho (20 a 22 de junho em 2025); cidades e programa anunciados todos os anos.",
      },
      ar: {
        name: "عيد الموسيقى",
        summary: "حفلات مجانية في عدة مدن كبرى حول 21 يونيو.",
        description:
          "تنظّم وكالة تنمية الفنون والثقافة عيد الموسيقى لحساب وزارة الثقافة، ويقدّم حفلات مجانية لفنانين بنينيين من جميع الأجيال، من الموسيقى التقليدية العصرية إلى الأفروبيت. وفي 2025 أُقيمت أربع منصات في كوتونو (قصر المؤتمرات) وبورتو نوفو وبوهيكون وباراكو على مدى ثلاثة أيام.",
        tips: "الدخول مجاني لكن الأماكن محدودة في القاعات: احضر باكرًا. تعلن الحكومة البرنامج قبل أيام قليلة.",
        where: "كوتونو وبورتو نوفو وبوهيكون وباراكو (بحسب الدورات)",
        dateNote: "حول 21 يونيو (من 20 إلى 22 يونيو في 2025)؛ تُعلن المدن والبرنامج كل عام.",
      },
    },
  },
  {
    slug: "nuits-artistiques-cotonou",
    kind: "FESTIVAL",
    publicHoliday: false,
    destination: "cotonou",
    rule: { type: "period", from: 6, to: 7 },
    sources: [
      "https://www.gouv.bj/article/3135/nuits-artistiques-culturelles-cotonou-5eme-edition-ouvre-juin-2025-palais-congres/",
      "https://www.gouv.bj/article/3153/nuits-artistiques-culturelles-cotonou-nacc-2025-engouement-constant-temoin-succes-pertinence-initiative/",
    ],
    name: "Nuits artistiques et culturelles de Cotonou (NACC)",
    summary: "Une semaine de soirées gratuites de théâtre, musique, danse, humour et slam au Palais des congrès.",
    description:
      "Initiées par le gouvernement en 2021, les Nuits artistiques et culturelles de Cotonou offrent chaque soir des spectacles gratuits mettant en valeur les talents béninois : théâtre, concerts, danse, slam, humour, cirque et arts visuels. D'abord programmées en fin d'année, elles ont été déplacées en début d'été à partir de la 5e édition (27 juin–5 juillet 2025), principalement au Palais des congrès.",
    tips: "Entrée gratuite dans la limite des places : arrivez en avance pour les spectacles les plus attendus.",
    dateNote: "Fin juin–début juillet depuis 2025 (auparavant en décembre) ; dates annoncées par le ministère et l'ADAC, à vérifier chaque année.",
    en: {
      name: "Cotonou Arts and Culture Nights (NACC)",
      summary: "A week of free evening shows — theatre, music, dance, comedy and slam — at the Palais des Congrès.",
      description:
        "Launched by the government in 2021, the Cotonou Arts and Culture Nights offer free shows every evening showcasing Beninese talent: theatre, concerts, dance, slam, comedy, circus and visual arts. First held at the end of the year, they moved to early summer from the 5th edition (27 June–5 July 2025), mainly at the Palais des Congrès.",
      tips: "Free entry while seats last: arrive early for the most popular shows.",
      dateNote: "Late June–early July since 2025 (previously in December); dates announced by the ministry and ADAC, to be checked each year.",
    },
    i18n: {
      es: {
        name: "Noches artísticas y culturales de Cotonou (NACC)",
        summary: "Una semana de veladas gratuitas de teatro, música, danza, humor y slam en el Palacio de Congresos.",
        description:
          "Iniciadas por el Gobierno en 2021, las Noches artísticas y culturales de Cotonou ofrecen cada noche espectáculos gratuitos que ponen en valor el talento beninés: teatro, conciertos, danza, slam, humor, circo y artes visuales. Programadas al principio a final de año, se trasladaron a principios del verano a partir de la 5.ª edición (27 de junio–5 de julio de 2025), sobre todo en el Palacio de Congresos.",
        tips: "Entrada gratuita hasta completar aforo: llegue con antelación a los espectáculos más esperados.",
        dateNote: "Finales de junio–principios de julio desde 2025 (antes en diciembre); fechas anunciadas por el ministerio y la ADAC, a comprobar cada año.",
      },
      pt: {
        name: "Noites artísticas e culturais de Cotonou (NACC)",
        summary: "Uma semana de serões gratuitos de teatro, música, dança, humor e slam no Palácio dos Congressos.",
        description:
          "Lançadas pelo Governo em 2021, as Noites artísticas e culturais de Cotonou oferecem todas as noites espetáculos gratuitos que valorizam os talentos beninenses: teatro, concertos, dança, slam, humor, circo e artes visuais. Primeiro programadas no fim do ano, passaram para o início do verão a partir da 5.ª edição (27 de junho–5 de julho de 2025), sobretudo no Palácio dos Congressos.",
        tips: "Entrada gratuita até ao limite de lugares: chegue cedo aos espetáculos mais esperados.",
        dateNote: "Fim de junho–início de julho desde 2025 (antes em dezembro); datas anunciadas pelo ministério e pela ADAC, a confirmar todos os anos.",
      },
      ar: {
        name: "الليالي الفنية والثقافية في كوتونو",
        summary: "أسبوع من الأمسيات المجانية للمسرح والموسيقى والرقص والكوميديا والسلام في قصر المؤتمرات.",
        description:
          "أطلقت الحكومة الليالي الفنية والثقافية في كوتونو عام 2021، وهي تقدّم كل مساء عروضًا مجانية تُبرز المواهب البنينية: مسرح وحفلات موسيقية ورقص وشعر السلام وكوميديا وسيرك وفنون بصرية. وبعد أن كانت تُبرمج في نهاية السنة، نُقلت إلى بداية الصيف ابتداءً من الدورة الخامسة (27 يونيو–5 يوليو 2025)، وأغلبها في قصر المؤتمرات.",
        tips: "الدخول مجاني في حدود الأماكن المتاحة: احضر مبكرًا للعروض الأكثر انتظارًا.",
        dateNote: "أواخر يونيو–أوائل يوليو منذ 2025 (وقبل ذلك في ديسمبر)؛ تعلن الوزارة ووكالة تنمية الفنون والثقافة التواريخ، ويجب التحقق منها كل عام.",
      },
    },
  },
  {
    slug: "chante-et-danse-avec-l-amazone",
    kind: "SEASONAL",
    publicHoliday: false,
    place: "place-de-l-amazone",
    rule: { type: "period", from: 8, to: 9 },
    sources: [
      "https://www.gouv.bj/article/3196/3eme-edition-chante-danse-avec-amazone-parti-/",
      "https://www.gouv.bj/article/2727/-chante-danse-avec-amazone-2024-jours-moments-conviviaux-pied-amazone-animation-acoustique-gratuite-tous-soirs-/",
    ],
    name: "« Chante et danse avec l'Amazone »",
    summary: "Un mois d'animations musicales gratuites chaque fin d'après-midi au pied de la statue de l'Amazone.",
    description:
      "Pendant les grandes vacances, l'esplanade de l'Amazone, sur le front de mer de Cotonou, devient un lieu de détente et de spectacle : chaque jour en fin d'après-midi, un artiste, un orchestre ou une compagnie de danse s'y produit gratuitement. Familles, jeunes et vacanciers de la diaspora s'y retrouvent pour profiter de la brise marine et des couchers de soleil, dans une ambiance conviviale.",
    tips: "Les prestations ont lieu en fin de journée : venez vers 17 h et prolongez par une promenade sur l'esplanade.",
    dateNote: "Environ un mois entre début août et début septembre (8 août–8 septembre 2024, 5 août–7 septembre 2025) ; dates annoncées par l'ADAC.",
    en: {
      name: "“Sing and Dance with the Amazon”",
      summary: "A month of free music every late afternoon at the foot of the Amazon statue.",
      description:
        "During the summer holidays, the Amazon esplanade on Cotonou's seafront becomes a place to relax and enjoy a show: every day in the late afternoon, a singer, band or dance company performs there for free. Families, young people and holidaying members of the diaspora gather to enjoy the sea breeze and the sunsets in a friendly atmosphere.",
      tips: "Performances take place at the end of the day: come around 5 pm and stay on for a stroll along the esplanade.",
      dateNote: "About one month between early August and early September (8 August–8 September 2024, 5 August–7 September 2025); dates announced by ADAC.",
    },
    i18n: {
      es: {
        name: "«Canta y baila con la Amazona»",
        summary: "Un mes de animaciones musicales gratuitas cada final de tarde al pie de la estatua de la Amazona.",
        description:
          "Durante las vacaciones de verano, la explanada de la Amazona, en el paseo marítimo de Cotonou, se convierte en un lugar de descanso y espectáculo: cada día al final de la tarde actúa gratis un artista, una orquesta o una compañía de danza. Familias, jóvenes y veraneantes de la diáspora se reúnen para disfrutar de la brisa marina y de las puestas de sol en un ambiente cordial.",
        tips: "Las actuaciones son al final del día: vaya hacia las 17 h y alárguelo con un paseo por la explanada.",
        dateNote: "Alrededor de un mes entre principios de agosto y principios de septiembre (8 de agosto–8 de septiembre de 2024, 5 de agosto–7 de septiembre de 2025); fechas anunciadas por la ADAC.",
      },
      pt: {
        name: "«Canta e dança com a Amazona»",
        summary: "Um mês de animações musicais gratuitas ao fim da tarde, aos pés da estátua da Amazona.",
        description:
          "Durante as férias grandes, a esplanada da Amazona, na marginal de Cotonou, torna-se um lugar de descontração e espetáculo: todos os dias ao fim da tarde, um artista, uma orquestra ou uma companhia de dança atua gratuitamente. Famílias, jovens e veraneantes da diáspora encontram-se ali para aproveitar a brisa do mar e o pôr do sol num ambiente convivial.",
        tips: "As atuações decorrem ao fim do dia: chegue por volta das 17h e prolongue com um passeio pela esplanada.",
        dateNote: "Cerca de um mês entre o início de agosto e o início de setembro (8 de agosto–8 de setembro de 2024, 5 de agosto–7 de setembro de 2025); datas anunciadas pela ADAC.",
      },
      ar: {
        name: "«غنِّ وارقص مع الأمازون»",
        summary: "شهر من العروض الموسيقية المجانية كل عصر عند سفح تمثال الأمازون.",
        description:
          "خلال العطلة الصيفية تتحول ساحة الأمازون على الواجهة البحرية لكوتونو إلى مكان للاسترخاء والفرجة: ففي آخر النهار من كل يوم يقدّم فنان أو فرقة موسيقية أو فرقة رقص عرضًا مجانيًا. وتلتقي العائلات والشباب والمغتربون العائدون في العطلة للاستمتاع بنسيم البحر وغروب الشمس في أجواء ودية.",
        tips: "تُقدَّم العروض في آخر النهار: احضر نحو الساعة الخامسة مساءً وأكمل بنزهة في الساحة.",
        dateNote: "نحو شهر بين أوائل أغسطس وأوائل سبتمبر (8 أغسطس–8 سبتمبر 2024، و5 أغسطس–7 سبتمبر 2025)؛ تعلن وكالة تنمية الفنون والثقافة التواريخ.",
      },
    },
  },
  {
    slug: "weloveya-cotonou",
    kind: "FESTIVAL",
    publicHoliday: false,
    place: "place-de-l-amazone",
    rule: { type: "period", from: 12, to: 12 },
    sources: [
      "https://lanouvelletribune.info/2025/12/weloveya-2025-cotonou-rassemble-les-foules-et-les-grandes-voix-de-lafrobeat/",
      "https://beninwebtv.bj/tourisme-vols-paris-cotonou-a-prix-speciaux-le-benin-deroule-le-tapis-rouge-pour-les-fetes/",
    ],
    name: "Festival WeLovEya",
    summary: "Le grand festival afro-urbain de fin d'année à Cotonou, avec les stars de l'afrobeat.",
    description:
      "Rendez-vous phare des fêtes de fin d'année, le festival WeLovEya réunit sur la place de l'Amazone, face à l'océan, des têtes d'affiche internationales de l'afrobeat et des musiques urbaines aux côtés d'artistes béninois et de la sous-région. Sa 4e édition, en décembre 2025, a attiré des milliers de festivaliers. Les recettes de la billetterie financent des centres communautaires de formation et de création pour la jeunesse (EYA Centers).",
    tips: "Billetterie payante, souvent prise d'assaut : achetez vos billets dès l'annonce et prévoyez votre retour de nuit en taxi.",
    dateNote: "Fin décembre, sur deux jours (27 et 28 décembre en 2025) ; dates et programmation annoncées quelques semaines avant.",
    en: {
      name: "WeLovEya Festival",
      summary: "Cotonou's big end-of-year Afro-urban festival, with afrobeat stars.",
      description:
        "A highlight of the end-of-year holidays, the WeLovEya festival brings international afrobeat and urban music headliners together with Beninese and regional artists on Amazon Square, facing the ocean. Its 4th edition, in December 2025, drew thousands of festival-goers. Ticket revenue funds community training and creative centres for young people (EYA Centers).",
      tips: "Tickets are paid and often sell fast: buy as soon as they are announced and plan a taxi home at night.",
      dateNote: "Late December, over two days (27 and 28 December in 2025); dates and line-up announced a few weeks ahead.",
    },
    i18n: {
      es: {
        name: "Festival WeLovEya",
        summary: "El gran festival afrourbano de fin de año en Cotonou, con las estrellas del afrobeat.",
        description:
          "Cita destacada de las fiestas de fin de año, el festival WeLovEya reúne en la plaza de la Amazona, frente al océano, a cabezas de cartel internacionales del afrobeat y las músicas urbanas junto a artistas beninenses y de la subregión. Su 4.ª edición, en diciembre de 2025, atrajo a miles de asistentes. La recaudación de las entradas financia centros comunitarios de formación y creación para los jóvenes (EYA Centers).",
        tips: "Entradas de pago y muy solicitadas: cómprelas en cuanto se anuncien y prevea un taxi para volver de noche.",
        dateNote: "Finales de diciembre, durante dos días (27 y 28 de diciembre en 2025); fechas y cartel anunciados unas semanas antes.",
      },
      pt: {
        name: "Festival WeLovEya",
        summary: "O grande festival afro-urbano de fim de ano em Cotonou, com as estrelas do afrobeat.",
        description:
          "Ponto alto das festas de fim de ano, o festival WeLovEya reúne na praça da Amazona, de frente para o oceano, cabeças de cartaz internacionais do afrobeat e das músicas urbanas ao lado de artistas beninenses e da sub-região. A 4.ª edição, em dezembro de 2025, atraiu milhares de festivaleiros. As receitas da bilheteira financiam centros comunitários de formação e criação para os jovens (EYA Centers).",
        tips: "Bilhetes pagos e muito procurados: compre-os assim que forem anunciados e preveja um táxi para regressar à noite.",
        dateNote: "Fim de dezembro, durante dois dias (27 e 28 de dezembro em 2025); datas e cartaz anunciados algumas semanas antes.",
      },
      ar: {
        name: "مهرجان «وي لوف إيا»",
        summary: "مهرجان الموسيقى الأفريقية الحضرية الكبير في نهاية السنة بكوتونو، بمشاركة نجوم الأفروبيت.",
        description:
          "يُعد مهرجان «وي لوف إيا» من أبرز مواعيد أعياد نهاية السنة، إذ يجمع في ساحة الأمازون، قبالة المحيط، نجومًا عالميين في الأفروبيت والموسيقى الحضرية إلى جانب فنانين من بنين والمنطقة. واستقطبت دورته الرابعة في ديسمبر 2025 آلاف الحضور. وتموّل عائدات التذاكر مراكز مجتمعية للتدريب والإبداع لفائدة الشباب (EYA Centers).",
        tips: "التذاكر مدفوعة وتنفد بسرعة: اشترِها فور الإعلان عنها وخطط للعودة ليلًا بسيارة أجرة.",
        dateNote: "أواخر ديسمبر على مدى يومين (27 و28 ديسمبر في 2025)؛ تُعلن التواريخ وقائمة الفنانين قبل بضعة أسابيع.",
      },
    },
  },
  // ───────────── Saison des fêtes ─────────────
  {
    slug: "fetes-de-fin-d-annee-benin",
    kind: "SEASONAL",
    publicHoliday: false,
    destination: "cotonou",
    rule: { type: "period", from: 12, to: 1 },
    cover: "/images/voyage/fete-fetes-de-fin-d-annee-benin",
    sources: [
      "https://www.afrik.com/kaleta-les-masques-beninois-qui-reveillent-l-esprit-de-noel",
      "https://beninwebtv.bj/tourisme-vols-paris-cotonou-a-prix-speciaux-le-benin-deroule-le-tapis-rouge-pour-les-fetes/",
      "https://www.gouv.bj/article/1623/eclairage-decoratif-fetes-annee-place-etoile-rouge-illuminee/",
    ],
    name: "Saison des fêtes de fin d'année",
    summary: "De mi-décembre à mi-janvier, le sud du Bénin vit sa période la plus festive : Noël, Saint-Sylvestre, concerts, plages et Vodun Days.",
    description:
      "La saison sèche de fin d'année est le grand moment de la vie sociale béninoise. La diaspora rentre au pays, Cotonou s'illumine (la place de l'Étoile rouge est décorée), les masques Kaléta des enfants dansent dans les rues à l'approche de Noël et les maquis, bars de la Haie Vive et de Jonquet et buvettes de Fidjrossè ne désemplissent pas. Les concerts s'enchaînent, avec le festival WeLovEya fin décembre, avant la nuit de la Saint-Sylvestre, puis les Vodun Days de Ouidah début janvier qui clôturent la saison en apothéose.",
    tips: "Haute saison : réservez vols, voitures et hébergements très tôt. La nuit, privilégiez taxis et chauffeurs de confiance, et gardez un œil sur vos affaires dans la foule.",
    dateNote: "Environ de mi-décembre à la mi-janvier, avec les temps forts de Noël (25 décembre), du Nouvel An et des Vodun Days (deuxième semaine de janvier).",
    en: {
      name: "End-of-year festive season",
      summary: "From mid-December to mid-January, southern Benin enjoys its most festive time: Christmas, New Year's Eve, concerts, beaches and Vodun Days.",
      description:
        "The end-of-year dry season is the high point of Beninese social life. The diaspora comes home, Cotonou is lit up (Red Star Square is decorated), children's Kaléta masks dance in the streets as Christmas approaches, and the maquis, the bars of Haie Vive and Jonquet and the drinks stalls of Fidjrossè are packed. Concerts follow one another, with the WeLovEya festival in late December, then New Year's Eve, and finally Ouidah's Vodun Days in early January bring the season to a climax.",
      tips: "Peak season: book flights, cars and accommodation very early. At night, use taxis and trusted drivers, and keep an eye on your belongings in crowds.",
      dateNote: "Roughly mid-December to mid-January, with highlights at Christmas (25 December), New Year and the Vodun Days (second week of January).",
    },
    i18n: {
      es: {
        name: "Temporada de fiestas de fin de año",
        summary: "De mediados de diciembre a mediados de enero, el sur de Benín vive su época más festiva: Navidad, Nochevieja, conciertos, playas y Vodun Days.",
        description:
          "La estación seca de fin de año es el gran momento de la vida social beninesa. La diáspora vuelve al país, Cotonou se ilumina (la plaza de la Estrella Roja se decora), las máscaras Kaléta de los niños bailan por las calles al acercarse la Navidad y los maquis, los bares de Haie Vive y Jonquet y los chiringuitos de Fidjrossè están llenos. Los conciertos se suceden, con el festival WeLovEya a finales de diciembre, luego la Nochevieja y, a principios de enero, los Vodun Days de Ouidah cierran la temporada por todo lo alto.",
        tips: "Temporada alta: reserve vuelos, coches y alojamiento con mucha antelación. De noche, use taxis y conductores de confianza y vigile sus pertenencias entre la multitud.",
        dateNote: "Aproximadamente de mediados de diciembre a mediados de enero, con los momentos clave de Navidad (25 de diciembre), Año Nuevo y los Vodun Days (segunda semana de enero).",
      },
      pt: {
        name: "Época das festas de fim de ano",
        summary: "De meados de dezembro a meados de janeiro, o sul do Benim vive o seu período mais festivo: Natal, passagem de ano, concertos, praias e Vodun Days.",
        description:
          "A estação seca de fim de ano é o grande momento da vida social beninense. A diáspora regressa ao país, Cotonou ilumina-se (a praça da Estrela Vermelha é decorada), as máscaras Kaléta das crianças dançam nas ruas à medida que o Natal se aproxima e os maquis, os bares de Haie Vive e Jonquet e as barracas de Fidjrossè estão sempre cheios. Os concertos sucedem-se, com o festival WeLovEya no fim de dezembro, depois a passagem de ano e, no início de janeiro, os Vodun Days de Ouidah encerram a época em apoteose.",
        tips: "Época alta: reserve voos, carros e alojamento muito cedo. À noite, prefira táxis e motoristas de confiança e vigie os seus pertences no meio da multidão.",
        dateNote: "Aproximadamente de meados de dezembro a meados de janeiro, com os pontos altos do Natal (25 de dezembro), do Ano Novo e dos Vodun Days (segunda semana de janeiro).",
      },
      ar: {
        name: "موسم أعياد نهاية السنة",
        summary: "من منتصف ديسمبر إلى منتصف يناير يعيش جنوب بنين أكثر فتراته احتفالًا: الميلاد ورأس السنة والحفلات والشواطئ وأيام الفودون.",
        description:
          "موسم الجفاف في نهاية السنة هو ذروة الحياة الاجتماعية في بنين. يعود المغتربون إلى البلاد، وتتلألأ كوتونو بالأضواء (تُزيَّن ساحة النجمة الحمراء)، ويرقص الأطفال بأقنعة «كاليتا» في الشوارع مع اقتراب الميلاد، وتمتلئ المطاعم الشعبية وحانات هاي فيف وجونكيه وأكشاك فيدجروسيه. وتتوالى الحفلات، ومنها مهرجان «وي لوف إيا» أواخر ديسمبر، ثم ليلة رأس السنة، وأخيرًا تختتم «أيام الفودون» في ويدا الموسمَ بأبهى صورة مطلع يناير.",
        tips: "موسم الذروة: احجز الرحلات والسيارات وأماكن الإقامة مبكرًا جدًا. وفي الليل استخدم سيارات الأجرة والسائقين الموثوقين، وانتبه لأغراضك وسط الزحام.",
        dateNote: "تقريبًا من منتصف ديسمبر إلى منتصف يناير، وأبرز محطاته عيد الميلاد (25 ديسمبر) ورأس السنة وأيام الفودون (الأسبوع الثاني من يناير).",
      },
    },
  },
];
