/**
 * Fêtes, jours fériés, festivals et temps forts saisonniers (niger).
 * Voir SeedEvent (./types). Contenu non relu : `reviewed = false`.
 *
 * Jours fériés : loi n° 97-020 du 20 juin 1997 instituant les fêtes légales, modifiée notamment par
 * l'ordonnance du 22 juillet 2024 (26 juillet) et l'ordonnance n° 2026-12 du 3 mars 2026 (Journée de la
 * Refondation le 26 mars, lendemain de l'Aïd el-Fitr, lendemain du Mouloud, nouvelle dénomination du
 * 3 août). Chaque année, le ministère de la Fonction publique, du Travail et de l'Emploi publie un
 * communiqué déclarant le jour « férié, chômé et payé » ; pour les fêtes musulmanes, la date suit
 * l'observation du croissant lunaire annoncée par les autorités religieuses.
 *
 * Sécurité : France Diplomatie et le FCDO déconseillent formellement tout voyage au Niger (octobre 2026),
 * d'où `caution: true` pour tous les événements.
 */

import type { SeedEvent, SeedEventText, SeedLang } from "./types";

type Lang5 = "fr" | "en" | SeedLang;
type L5 = Record<Lang5, string>;

/** Lieu « dans tout le pays », dans les 5 langues. */
const ALL: L5 = {
  fr: "Dans tout le pays",
  en: "Throughout the country",
  es: "En todo el país",
  pt: "Em todo o país",
  ar: "في جميع أنحاء البلاد",
};

/** Rappel de sécurité ajouté aux conseils. */
const SEC: L5 = {
  fr: "Tout voyage au Niger est actuellement formellement déconseillé par les autorités française et britannique : voir la rubrique Sécurité.",
  en: "French and British authorities currently advise against all travel to Niger: see the Safety section.",
  es: "Las autoridades francesas y británicas desaconsejan actualmente todo viaje a Níger: consulte la sección Seguridad.",
  pt: "As autoridades francesas e britânicas desaconselham atualmente qualquer viagem ao Níger: consulte a secção Segurança.",
  ar: "تنصح السلطات الفرنسية والبريطانية حاليًا بعدم السفر إلى النيجر إطلاقًا: راجِعوا قسم الأمن.",
};

/** Conseils communs aux jours fériés (fermetures). */
const OFF: L5 = {
  fr: "Administrations, banques et la plupart des bureaux sont fermés ; les marchés tournent au ralenti.",
  en: "Government offices, banks and most businesses are closed; markets run at a slower pace.",
  es: "Administraciones, bancos y la mayoría de las oficinas cierran; los mercados funcionan a medio gas.",
  pt: "Serviços públicos, bancos e a maioria dos escritórios fecham; os mercados funcionam a meio gás.",
  ar: "تُغلق الإدارات والمصارف ومعظم المكاتب، وتعمل الأسواق بوتيرة أبطأ.",
};

/** Note de date commune aux jours fériés fixes. */
const FIXED_NOTE: L5 = {
  fr: "Date fixe. Un communiqué du ministère chargé du Travail confirme chaque année le caractère férié, chômé et payé ; aucune règle générale de report au lundi n'est prévue quand la fête tombe un dimanche.",
  en: "Fixed date. A Labour Ministry notice confirms each year that the day is a paid public holiday; there is no general rule moving it to Monday when it falls on a Sunday.",
  es: "Fecha fija. Un comunicado del ministerio de Trabajo confirma cada año su carácter festivo, no laborable y retribuido; no existe una regla general de traslado al lunes cuando cae en domingo.",
  pt: "Data fixa. Um comunicado do ministério do Trabalho confirma todos os anos o caráter de feriado pago; não existe regra geral de passagem para segunda-feira quando calha a um domingo.",
  ar: "تاريخ ثابت. يؤكّد بلاغ من وزارة العمل كل عام أنه يوم عطلة مدفوعة الأجر، ولا توجد قاعدة عامة لنقله إلى الاثنين إذا صادف يوم أحد.",
};

/** Note de date commune aux fêtes musulmanes. */
const MOON_NOTE: L5 = {
  fr: "Date du calendrier musulman : le jour exact est fixé selon l'observation du croissant lunaire et annoncé la veille par les autorités religieuses, puis confirmé par communiqué officiel (écart possible d'un jour avec les calendriers).",
  en: "Islamic calendar date: the exact day depends on the sighting of the new moon and is announced the day before by religious authorities, then confirmed by an official notice (calendars may differ by one day).",
  es: "Fecha del calendario musulmán: el día exacto depende de la observación de la luna creciente y lo anuncian la víspera las autoridades religiosas, antes de confirmarlo un comunicado oficial (posible diferencia de un día con los calendarios).",
  pt: "Data do calendário muçulmano: o dia exato depende da observação do crescente lunar e é anunciado na véspera pelas autoridades religiosas, sendo depois confirmado por comunicado oficial (pode diferir um dia dos calendários).",
  ar: "تاريخ وفق التقويم الهجري: يُحدَّد اليوم بدقة بحسب رؤية الهلال وتعلنه السلطات الدينية عشية المناسبة، ثم يؤكّده بلاغ رسمي (قد يختلف يومًا واحدًا عن التقاويم).",
};

/** Construit les textes en/es/pt/ar à partir d'un objet par langue. */
function tx(t: Record<"en" | SeedLang, SeedEventText>): { en: SeedEventText; i18n: Record<SeedLang, SeedEventText> } {
  return { en: t.en, i18n: { es: t.es, pt: t.pt, ar: t.ar } };
}

/** Conseils = texte propre + rappel des fermetures (jours fériés) + rappel de sécurité. */
const tipsH = (l: Lang5, own: string) => `${own} ${OFF[l]} ${SEC[l]}`;
/** Conseils = texte propre + rappel de sécurité. */
const tipsE = (l: Lang5, own: string) => `${own} ${SEC[l]}`;

const W_LAW = "https://fr.wikipedia.org/wiki/Jours_f%C3%A9ri%C3%A9s_au_Niger";
const W_LAW_EN = "https://en.wikipedia.org/wiki/Public_holidays_in_Niger";
const ORD_2026 =
  "https://anp.ne/fetes-legales-au-niger-laid-el-fitr-ramadan-portee-a-deux-jours-feries-et-le-26-mars-institue-journee-de-la-refondation-conseil-des-ministres/";
const SAHELIEN_2026 = "https://sahelien.com/niger-institution-dune-journee-de-la-refondation-et-jour-ferie-supplementaire-pour-la-fin-de-ramadan/";

export const NIGER_EVENTS: SeedEvent[] = [
  // ───────────── Jours fériés légaux ─────────────
  {
    slug: "jour-de-l-an-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 1, day: 1 },
    caution: true,
    name: "Jour de l'An",
    summary: "Le 1er janvier, premier jour férié de l'année civile, après les veillées de la Saint-Sylvestre.",
    description:
      "Le Nouvel An est une fête légale au Niger. Dans les villes, la nuit du 31 décembre se passe en famille, entre amis ou lors de soirées et concerts organisés dans les salles et espaces culturels. Le 1er janvier, journée chômée, est consacré aux visites et aux vœux. C'est aussi le cœur de la saison fraîche, la plus agréable de l'année.",
    tips: tipsH("fr", "Les sorties de la Saint-Sylvestre se concentrent dans les grandes villes ; prévoyez vos déplacements avant la nuit."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: [W_LAW, W_LAW_EN],
    ...tx({
      en: {
        name: "New Year's Day",
        summary: "1 January, the first public holiday of the calendar year, after New Year's Eve celebrations.",
        description:
          "New Year's Day is a legal holiday in Niger. In towns, the night of 31 December is spent with family and friends or at parties and concerts held in halls and cultural venues. 1 January, a day off, is devoted to visits and good wishes. It falls in the heart of the cool season, the most pleasant time of year.",
        tips: tipsH("en", "New Year's Eve outings are concentrated in the big towns; plan your journeys before nightfall."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Año Nuevo",
        summary: "El 1 de enero, primer festivo del año civil, tras las veladas de Nochevieja.",
        description:
          "El Año Nuevo es fiesta legal en Níger. En las ciudades, la noche del 31 de diciembre se pasa en familia, con amigos o en fiestas y conciertos organizados en salas y espacios culturales. El 1 de enero, día no laborable, se dedica a las visitas y a las felicitaciones. Cae en plena estación fresca, la más agradable del año.",
        tips: tipsH("es", "Las salidas de Nochevieja se concentran en las grandes ciudades; organice sus desplazamientos antes del anochecer."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Dia de Ano Novo",
        summary: "O 1 de janeiro, primeiro feriado do ano civil, depois das festas da passagem de ano.",
        description:
          "O Ano Novo é feriado legal no Níger. Nas cidades, a noite de 31 de dezembro passa-se em família, com amigos ou em festas e concertos organizados em salas e espaços culturais. O 1 de janeiro, dia de descanso, é dedicado às visitas e aos votos. Calha em plena estação fresca, a mais agradável do ano.",
        tips: tipsH("pt", "As saídas da passagem de ano concentram-se nas grandes cidades; organize as deslocações antes do anoitecer."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "رأس السنة الميلادية",
        summary: "الأول من يناير، أول عطلة رسمية في السنة الميلادية، بعد سهرات ليلة رأس السنة.",
        description:
          "رأس السنة عيد قانوني في النيجر. في المدن تُقضى ليلة 31 ديسمبر مع العائلة أو الأصدقاء أو في حفلات وسهرات موسيقية تُقام في القاعات والفضاءات الثقافية. ويُخصَّص الأول من يناير، وهو يوم عطلة، للزيارات وتبادل التهاني. ويقع في قلب الموسم البارد، أطيب فصول السنة.",
        tips: tipsH("ar", "تتركّز سهرات رأس السنة في المدن الكبرى؛ خطّطوا لتنقّلاتكم قبل حلول الليل."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "journee-de-la-refondation-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 3, day: 26 },
    caution: true,
    name: "Journée de la Refondation",
    summary: "Nouvelle fête légale instituée en 2026, en souvenir de la promulgation de la Charte de la Refondation.",
    description:
      "Le 26 mars 2025, les autorités de transition ont promulgué la Charte de la Refondation, qui tient lieu de constitution. L'ordonnance n° 2026-12 du 3 mars 2026 a fait de cette date une fête légale, présentée comme une journée consacrée à la « lutte patriotique » et à l'évaluation des principes de la Refondation. Cérémonies officielles et manifestations se tiennent surtout à Niamey et dans les chefs-lieux de région.",
    tips: tipsH("fr", "Fête récente et à forte portée politique : restez à l'écart des rassemblements et ne photographiez ni cortèges officiels ni forces de sécurité."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: [ORD_2026, SAHELIEN_2026, "https://www.bibliomonde.fr/lalmanach/26-mars-niger-jour-de-la-refondation"],
    ...tx({
      en: {
        name: "Refoundation Day",
        summary: "A new legal holiday created in 2026, marking the promulgation of the Refoundation Charter.",
        description:
          "On 26 March 2025 the transitional authorities promulgated the Refoundation Charter, which serves as the constitution. Ordinance no. 2026-12 of 3 March 2026 made the date a legal holiday, presented as a day devoted to the \"patriotic struggle\" and to assessing the principles of the Refoundation. Official ceremonies and events are held mainly in Niamey and the regional capitals.",
        tips: tipsH("en", "A recent, highly political holiday: keep away from gatherings and do not photograph official processions or security forces."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Día de la Refundación",
        summary: "Nueva fiesta legal instituida en 2026, en recuerdo de la promulgación de la Carta de la Refundación.",
        description:
          "El 26 de marzo de 2025, las autoridades de transición promulgaron la Carta de la Refundación, que hace las veces de constitución. La ordenanza n.º 2026-12 del 3 de marzo de 2026 convirtió esta fecha en fiesta legal, presentada como una jornada dedicada a la «lucha patriótica» y a la evaluación de los principios de la Refundación. Las ceremonias oficiales y los actos se celebran sobre todo en Niamey y en las capitales regionales.",
        tips: tipsH("es", "Fiesta reciente y de fuerte carga política: manténgase alejado de las concentraciones y no fotografíe cortejos oficiales ni fuerzas de seguridad."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Dia da Refundação",
        summary: "Nova festa legal instituída em 2026, em memória da promulgação da Carta da Refundação.",
        description:
          "A 26 de março de 2025, as autoridades de transição promulgaram a Carta da Refundação, que faz as vezes de constituição. A portaria n.º 2026-12 de 3 de março de 2026 fez desta data uma festa legal, apresentada como um dia dedicado à «luta patriótica» e à avaliação dos princípios da Refundação. As cerimónias oficiais e manifestações decorrem sobretudo em Niamey e nas capitais regionais.",
        tips: tipsH("pt", "Festa recente e de forte carga política: mantenha-se afastado dos ajuntamentos e não fotografe cortejos oficiais nem forças de segurança."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "يوم إعادة التأسيس",
        summary: "عيد قانوني جديد أُقرّ عام 2026، إحياءً لذكرى إصدار ميثاق إعادة التأسيس.",
        description:
          "في 26 مارس 2025 أصدرت السلطات الانتقالية ميثاق إعادة التأسيس الذي يقوم مقام الدستور. وجعل الأمر رقم 2026-12 الصادر في 3 مارس 2026 من هذا التاريخ عيدًا قانونيًا، يُقدَّم على أنه يوم مخصّص «للنضال الوطني» ولتقييم مبادئ إعادة التأسيس. وتُقام المراسم الرسمية والفعاليات أساسًا في نيامي وعواصم المناطق.",
        tips: tipsH("ar", "عيد حديث ذو طابع سياسي واضح: ابتعدوا عن التجمّعات ولا تصوّروا المواكب الرسمية أو قوات الأمن."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "lundi-de-paques-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 1 },
    caution: true,
    place: "cathedrale-niamey",
    name: "Lundi de Pâques",
    summary: "Le lendemain de Pâques, seule fête chrétienne mobile fériée au Niger.",
    description:
      "La communauté chrétienne, minoritaire au Niger, célèbre Pâques par les veillées et messes de la nuit et du dimanche, notamment à la cathédrale de Niamey et dans les paroisses de Maradi, Zinder ou Dosso. Le lundi de Pâques est férié, chômé et payé dans tout le pays, pour tous les secteurs. Le Vendredi saint, l'Ascension et la Pentecôte ne sont pas fériés.",
    tips: tipsH("fr", "Tenue correcte pour assister aux offices ; renseignez-vous auprès des paroisses sur les horaires."),
    where: ALL.fr,
    dateNote: "Date mobile (lendemain du dimanche de Pâques), confirmée chaque année par communiqué du ministère chargé du Travail.",
    sources: ["https://www.kaweru.com/politique-societe/2026/04/01/niger-le-lundi-six-avril-2026-declare-ferie-et-paye/", W_LAW, W_LAW_EN],
    ...tx({
      en: {
        name: "Easter Monday",
        summary: "The day after Easter, the only movable Christian holiday that is a public holiday in Niger.",
        description:
          "Niger's Christian minority celebrates Easter with vigils and masses on Saturday night and Sunday, notably at Niamey cathedral and in the parishes of Maradi, Zinder and Dosso. Easter Monday is a paid public holiday throughout the country, for all sectors. Good Friday, Ascension Day and Whit Monday are not public holidays.",
        tips: tipsH("en", "Dress appropriately to attend services; ask parishes for service times."),
        where: ALL.en,
        dateNote: "Movable date (the day after Easter Sunday), confirmed each year by a Labour Ministry notice.",
      },
      es: {
        name: "Lunes de Pascua",
        summary: "El día siguiente a Pascua, única fiesta cristiana móvil festiva en Níger.",
        description:
          "La comunidad cristiana, minoritaria en Níger, celebra la Pascua con vigilias y misas de la noche del sábado y del domingo, en particular en la catedral de Niamey y en las parroquias de Maradi, Zinder o Dosso. El lunes de Pascua es festivo, no laborable y retribuido en todo el país y para todos los sectores. El Viernes Santo, la Ascensión y Pentecostés no son festivos.",
        tips: tipsH("es", "Vestimenta adecuada para asistir a los oficios; consulte los horarios en las parroquias."),
        where: ALL.es,
        dateNote: "Fecha móvil (día siguiente al domingo de Pascua), confirmada cada año por un comunicado del ministerio de Trabajo.",
      },
      pt: {
        name: "Segunda-feira de Páscoa",
        summary: "O dia seguinte à Páscoa, única festa cristã móvel que é feriado no Níger.",
        description:
          "A comunidade cristã, minoritária no Níger, celebra a Páscoa com vigílias e missas na noite de sábado e no domingo, nomeadamente na catedral de Niamey e nas paróquias de Maradi, Zinder ou Dosso. A segunda-feira de Páscoa é feriado pago em todo o país e em todos os setores. A Sexta-feira Santa, a Ascensão e o Pentecostes não são feriados.",
        tips: tipsH("pt", "Vestuário adequado para assistir às celebrações; informe-se nas paróquias sobre os horários."),
        where: ALL.pt,
        dateNote: "Data móvel (dia seguinte ao domingo de Páscoa), confirmada todos os anos por comunicado do ministério do Trabalho.",
      },
      ar: {
        name: "اثنين الفصح",
        summary: "اليوم التالي لعيد الفصح، وهو العيد المسيحي المتنقّل الوحيد الذي يُعدّ عطلة رسمية في النيجر.",
        description:
          "تحتفل الجماعة المسيحية، وهي أقلية في النيجر، بعيد الفصح بسهرات صلاة وقداديس ليلة السبت ويوم الأحد، لا سيما في كاتدرائية نيامي وفي رعايا مارادي وزيندر ودوسو. ويوم اثنين الفصح عطلة مدفوعة الأجر في جميع أنحاء البلاد ولجميع القطاعات. أما الجمعة العظيمة وعيد الصعود والعنصرة فليست أيام عطلة.",
        tips: tipsH("ar", "لباس لائق لحضور القداديس؛ استعلموا عن المواعيد لدى الرعايا."),
        where: ALL.ar,
        dateNote: "تاريخ متنقّل (اليوم التالي لأحد الفصح)، يؤكّده كل عام بلاغ من وزارة العمل.",
      },
    }),
  },
  {
    slug: "journee-concorde-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 4, day: 24 },
    caution: true,
    cover: "/images/voyage/fete-journee-concorde-niger",
    name: "Fête de la Concorde",
    summary: "Le 24 avril célèbre les accords de paix de 1995 qui ont mis fin à la rébellion touarègue des années 1990.",
    description:
      "Le 24 avril 1995, le gouvernement et l'Organisation de la résistance armée signaient un accord de paix mettant fin à la rébellion touarègue du début des années 1990. Cette Fête de la Concorde nationale, fériée, donne lieu à un « Festival de la Concorde » organisé chaque année dans une ville différente : la 26e édition s'est tenue le 24 avril 2026 à Tchintabaraden, sur le thème de la paix et de la cohésion sociale. Danses, musique, courses de chameaux et lutte animent souvent les festivités.",
    tips: tipsH("fr", "La ville hôte change chaque année et est annoncée par le ministère de l'Intérieur quelques jours avant."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: ["https://www.lesahel.org/communique-du-ministere-de-linterieur-de-la-securite-publique-et-de-ladministration-du-territoire-3/", "https://en.wikipedia.org/wiki/Concord_Day", W_LAW],
    ...tx({
      en: {
        name: "Concord Day",
        summary: "24 April celebrates the 1995 peace accords that ended the Tuareg rebellion of the 1990s.",
        description:
          "On 24 April 1995 the government and the Organisation of Armed Resistance signed a peace accord ending the Tuareg rebellion of the early 1990s. This National Concord Day, a public holiday, is marked by a \"Concord Festival\" held each year in a different town: the 26th edition took place on 24 April 2026 in Tchintabaraden, on the theme of peace and social cohesion. Dancing, music, camel races and wrestling often enliven the festivities.",
        tips: tipsH("en", "The host town changes every year and is announced by the Interior Ministry a few days beforehand."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Fiesta de la Concordia",
        summary: "El 24 de abril celebra los acuerdos de paz de 1995 que pusieron fin a la rebelión tuareg de los años noventa.",
        description:
          "El 24 de abril de 1995, el gobierno y la Organización de la Resistencia Armada firmaron un acuerdo de paz que puso fin a la rebelión tuareg de principios de los años noventa. Esta Fiesta de la Concordia nacional, festiva, se acompaña de un «Festival de la Concordia» organizado cada año en una ciudad distinta: la 26.ª edición se celebró el 24 de abril de 2026 en Tchintabaraden, con el tema de la paz y la cohesión social. Danzas, música, carreras de camellos y lucha suelen animar los festejos.",
        tips: tipsH("es", "La ciudad anfitriona cambia cada año y la anuncia el ministerio del Interior unos días antes."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Festa da Concórdia",
        summary: "O 24 de abril celebra os acordos de paz de 1995 que puseram fim à rebelião tuaregue dos anos 1990.",
        description:
          "A 24 de abril de 1995, o governo e a Organização da Resistência Armada assinaram um acordo de paz que pôs fim à rebelião tuaregue do início dos anos 1990. Esta Festa da Concórdia nacional, feriado, é assinalada por um «Festival da Concórdia» organizado todos os anos numa cidade diferente: a 26.ª edição realizou-se a 24 de abril de 2026 em Tchintabaraden, sob o tema da paz e da coesão social. Danças, música, corridas de camelos e luta animam muitas vezes os festejos.",
        tips: tipsH("pt", "A cidade anfitriã muda todos os anos e é anunciada pelo ministério do Interior alguns dias antes."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "عيد الوئام",
        summary: "يحتفي 24 أبريل باتفاقات السلام لعام 1995 التي أنهت تمرّد الطوارق في التسعينيات.",
        description:
          "في 24 أبريل 1995 وقّعت الحكومة ومنظمة المقاومة المسلحة اتفاق سلام أنهى تمرّد الطوارق في مطلع التسعينيات. ويُحتفل بعيد الوئام الوطني، وهو عطلة رسمية، بـ«مهرجان الوئام» الذي يُنظَّم كل عام في مدينة مختلفة: أُقيمت دورته السادسة والعشرون في 24 أبريل 2026 في تشينتابارادن تحت شعار السلام والتماسك الاجتماعي. وكثيرًا ما تُحيي الاحتفالاتِ الرقصاتُ والموسيقى وسباقات الإبل والمصارعة.",
        tips: tipsH("ar", "تتغيّر المدينة المضيفة كل عام، وتعلن عنها وزارة الداخلية قبل أيام قليلة."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "fete-du-travail-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 1 },
    caution: true,
    name: "Fête du Travail",
    summary: "Le 1er mai, journée internationale des travailleurs, marquée par les défilés syndicaux.",
    description:
      "Comme dans la plupart des pays, le 1er mai est férié, chômé et payé au Niger. Les centrales syndicales organisent des défilés et remettent leurs cahiers de doléances aux autorités, principalement à Niamey et dans les chefs-lieux de région. La journée tombe au plus fort de la saison chaude.",
    tips: tipsH("fr", "Évitez les défilés et rassemblements ; prévoyez de l'eau, les températures dépassent souvent 40 °C en mai."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: ["https://kanianews.com/2026/04/29/fete-de-travail-la-journee-du-vendredi-declaree-feriee-chomee-et-payee-sur-tout-le-territoire-national/", W_LAW],
    ...tx({
      en: {
        name: "Labour Day",
        summary: "1 May, International Workers' Day, marked by trade-union marches.",
        description:
          "As in most countries, 1 May is a paid public holiday in Niger. Trade-union federations hold marches and present their demands to the authorities, mainly in Niamey and the regional capitals. The day falls at the height of the hot season.",
        tips: tipsH("en", "Avoid marches and gatherings; carry water, as temperatures often exceed 40 °C in May."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Día del Trabajo",
        summary: "El 1 de mayo, Día Internacional de los Trabajadores, marcado por los desfiles sindicales.",
        description:
          "Como en la mayoría de los países, el 1 de mayo es festivo, no laborable y retribuido en Níger. Las centrales sindicales organizan desfiles y entregan sus reivindicaciones a las autoridades, principalmente en Niamey y en las capitales regionales. La jornada cae en lo más fuerte de la estación cálida.",
        tips: tipsH("es", "Evite desfiles y concentraciones; lleve agua, las temperaturas superan a menudo los 40 °C en mayo."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Dia do Trabalhador",
        summary: "O 1.º de maio, Dia Internacional dos Trabalhadores, marcado pelos desfiles sindicais.",
        description:
          "Como na maioria dos países, o 1.º de maio é feriado pago no Níger. As centrais sindicais organizam desfiles e entregam as suas reivindicações às autoridades, sobretudo em Niamey e nas capitais regionais. O dia calha no pico da estação quente.",
        tips: tipsH("pt", "Evite desfiles e ajuntamentos; leve água, as temperaturas ultrapassam muitas vezes os 40 °C em maio."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "عيد العمال",
        summary: "الأول من مايو، اليوم العالمي للعمال، وتطبعه مسيرات النقابات.",
        description:
          "كما في معظم البلدان، الأول من مايو عطلة رسمية مدفوعة الأجر في النيجر. وتنظّم المركزيات النقابية مسيرات وتسلّم مطالبها إلى السلطات، أساسًا في نيامي وعواصم المناطق. ويصادف هذا اليوم ذروة الموسم الحار.",
        tips: tipsH("ar", "تجنّبوا المسيرات والتجمّعات؛ احملوا الماء، فالحرارة تتجاوز غالبًا 40 درجة مئوية في مايو."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "journee-souverainete-patriotisme-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 7, day: 26 },
    caution: true,
    name: "Journée nationale de la Souveraineté et du Patriotisme",
    summary: "Le 26 juillet, fête légale depuis 2024, commémore l'arrivée au pouvoir du CNSP en 2023.",
    description:
      "Le 26 juillet 2023, des militaires réunis dans le Conseil national pour la sauvegarde de la patrie (CNSP) ont renversé le président élu. Une ordonnance du 22 juillet 2024 a institué cette « journée anniversaire » comme fête légale, fériée, chômée et payée ; elle porte en 2026 le nom de Journée nationale de la Souveraineté et du Patriotisme. Rassemblements, défilés et discours officiels ont lieu, surtout à Niamey.",
    tips: tipsH("fr", "Journée très politique : tenez-vous à l'écart des rassemblements et ne photographiez ni militaires ni bâtiments officiels."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: [
      "https://www.lesahel.org/communique-du-secretariat-general-du-gouvernement-le-president-du-cnsp-signe-une-ordonnance-instituant-la-journee-du-26-juillet-comme-fete-legale/",
      "https://www.lesahel.org/communique-du-ministere-de-la-fonction-publique-du-travail-et-de-lemploi-40/",
      "https://www.afrik.com/niger-le-26-juillet-devient-un-jour-de-fete-legale",
    ],
    ...tx({
      en: {
        name: "National Day of Sovereignty and Patriotism",
        summary: "26 July, a legal holiday since 2024, commemorates the CNSP's takeover in 2023.",
        description:
          "On 26 July 2023, soldiers forming the National Council for the Safeguard of the Homeland (CNSP) overthrew the elected president. An ordinance of 22 July 2024 made this \"anniversary day\" a paid public holiday; in 2026 it was called the National Day of Sovereignty and Patriotism. Rallies, parades and official speeches take place, mainly in Niamey.",
        tips: tipsH("en", "A highly political day: keep away from rallies and do not photograph soldiers or official buildings."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Día Nacional de la Soberanía y el Patriotismo",
        summary: "El 26 de julio, fiesta legal desde 2024, conmemora la llegada al poder del CNSP en 2023.",
        description:
          "El 26 de julio de 2023, militares agrupados en el Consejo Nacional para la Salvaguarda de la Patria (CNSP) derrocaron al presidente electo. Una ordenanza del 22 de julio de 2024 instituyó esta «jornada aniversario» como fiesta legal, festiva, no laborable y retribuida; en 2026 se denominó Día Nacional de la Soberanía y el Patriotismo. Hay concentraciones, desfiles y discursos oficiales, sobre todo en Niamey.",
        tips: tipsH("es", "Jornada muy política: manténgase alejado de las concentraciones y no fotografíe militares ni edificios oficiales."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Dia Nacional da Soberania e do Patriotismo",
        summary: "O 26 de julho, festa legal desde 2024, assinala a chegada ao poder do CNSP em 2023.",
        description:
          "A 26 de julho de 2023, militares reunidos no Conselho Nacional para a Salvaguarda da Pátria (CNSP) derrubaram o presidente eleito. Uma portaria de 22 de julho de 2024 instituiu este «dia de aniversário» como feriado pago; em 2026 designou-se Dia Nacional da Soberania e do Patriotismo. Realizam-se comícios, desfiles e discursos oficiais, sobretudo em Niamey.",
        tips: tipsH("pt", "Dia muito político: mantenha-se afastado dos ajuntamentos e não fotografe militares nem edifícios oficiais."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "اليوم الوطني للسيادة والوطنية",
        summary: "26 يوليو، عيد قانوني منذ 2024، يُحيي ذكرى تولّي المجلس الوطني لحماية الوطن السلطة عام 2023.",
        description:
          "في 26 يوليو 2023 أطاح عسكريون منضوون في المجلس الوطني لحماية الوطن بالرئيس المنتخب. وجعل أمرٌ صادر في 22 يوليو 2024 من «يوم الذكرى» هذا عيدًا قانونيًا وعطلة مدفوعة الأجر، وحمل في 2026 اسم اليوم الوطني للسيادة والوطنية. وتُقام فيه تجمّعات واستعراضات وخطب رسمية، لا سيما في نيامي.",
        tips: tipsH("ar", "يوم ذو طابع سياسي شديد: ابتعدوا عن التجمّعات ولا تصوّروا العسكريين أو المباني الرسمية."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "journee-des-martyrs-3-aout-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 8, day: 3 },
    caution: true,
    name: "3 août : Journée des Martyrs de la colonisation et de la lutte contre la désertification",
    summary: "Anniversaire de l'indépendance du 3 août 1960, associé depuis des décennies à la plantation d'arbres.",
    description:
      "Le Niger a accédé à l'indépendance le 3 août 1960. Ce jour férié, longtemps appelé fête de l'Indépendance et associé à la Fête nationale de l'arbre, a été rebaptisé par l'ordonnance n° 2026-12 « Journée des Martyrs de la colonisation et de la lutte contre la désertification ». Partout dans le pays, autorités, écoles et habitants plantent des arbres ; en 2026, le site national se trouvait dans la forêt classée de Kouroungousaou, près de Maradi.",
    tips: tipsH("fr", "Les plantations collectives sont ouvertes au public ; c'est aussi la pleine saison des pluies, routes parfois coupées."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: [
      "https://www.lesahel.org/communique-ministre-de-la-fonction-publique-du-travail-et-de-lemploi/",
      "https://nigerdiaspora.net/politique/3-aout-au-niger-une-journee-de-memoire-de-souverainete-et-dengagement-pour-la-terre",
      "https://anp.ne/lancement-a-niamey-de-la-journee-nationale-des-martyrs-de-la-colonisation-et-de-la-lutte-contre-la-desertification-au-titre-de-la-region/",
    ],
    ...tx({
      en: {
        name: "3 August: Day of the Martyrs of Colonisation and the Fight against Desertification",
        summary: "Anniversary of independence on 3 August 1960, linked for decades with tree planting.",
        description:
          "Niger became independent on 3 August 1960. This public holiday, long called Independence Day and associated with National Tree Day, was renamed by Ordinance no. 2026-12 the \"Day of the Martyrs of Colonisation and the Fight against Desertification\". Throughout the country, officials, schools and residents plant trees; in 2026 the national site was the Kouroungousaou classified forest near Maradi.",
        tips: tipsH("en", "Community tree plantings are open to the public; it is also the height of the rainy season, and roads may be cut."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "3 de agosto: Día de los Mártires de la colonización y de la lucha contra la desertificación",
        summary: "Aniversario de la independencia del 3 de agosto de 1960, asociado desde hace décadas a la plantación de árboles.",
        description:
          "Níger accedió a la independencia el 3 de agosto de 1960. Este festivo, llamado durante mucho tiempo fiesta de la Independencia y asociado a la Fiesta Nacional del Árbol, fue rebautizado por la ordenanza n.º 2026-12 como «Día de los Mártires de la colonización y de la lucha contra la desertificación». En todo el país, autoridades, escuelas y vecinos plantan árboles; en 2026, el sitio nacional fue el bosque clasificado de Kouroungousaou, cerca de Maradi.",
        tips: tipsH("es", "Las plantaciones colectivas están abiertas al público; también es plena estación de lluvias, con carreteras a veces cortadas."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "3 de agosto: Dia dos Mártires da colonização e da luta contra a desertificação",
        summary: "Aniversário da independência de 3 de agosto de 1960, associado há décadas à plantação de árvores.",
        description:
          "O Níger tornou-se independente a 3 de agosto de 1960. Este feriado, durante muito tempo chamado festa da Independência e associado à Festa Nacional da Árvore, foi rebatizado pela portaria n.º 2026-12 como «Dia dos Mártires da colonização e da luta contra a desertificação». Em todo o país, autoridades, escolas e habitantes plantam árvores; em 2026, o sítio nacional foi a floresta classificada de Kouroungousaou, perto de Maradi.",
        tips: tipsH("pt", "As plantações coletivas estão abertas ao público; é também plena estação das chuvas, com estradas por vezes cortadas."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "3 أغسطس: يوم شهداء الاستعمار ومكافحة التصحّر",
        summary: "ذكرى الاستقلال في 3 أغسطس 1960، المرتبطة منذ عقود بغرس الأشجار.",
        description:
          "نال النيجر استقلاله في 3 أغسطس 1960. وهذه العطلة الرسمية، التي عُرفت طويلًا بعيد الاستقلال وارتبطت بالعيد الوطني للشجرة، أعاد الأمر رقم 2026-12 تسميتها «يوم شهداء الاستعمار ومكافحة التصحّر». وفي أنحاء البلاد يغرس المسؤولون والمدارس والسكان الأشجار؛ وفي عام 2026 كان الموقع الوطني في الغابة المصنَّفة كورونغوساو قرب مارادي.",
        tips: tipsH("ar", "حملات الغرس الجماعية مفتوحة للجمهور؛ وهو أيضًا ذروة موسم الأمطار وقد تنقطع بعض الطرق."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "fete-de-la-republique-niger",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 12, day: 18 },
    caution: true,
    name: "Fête de la République",
    summary: "Le 18 décembre, anniversaire de la proclamation de la République en 1958, fête nationale du Niger.",
    description:
      "Le 18 décembre 1958, le Niger devenait une république au sein de la Communauté française, avant l'indépendance de 1960. Fête nationale fériée, cet anniversaire a longtemps été célébré par une fête tournante organisée chaque année dans un chef-lieu de région différent (Tillabéri, Zinder, Diffa…), avec défilés et spectacles. Les célébrations ont lieu en pleine saison fraîche.",
    tips: tipsH("fr", "La ville hôte et le programme sont annoncés par le gouvernement ; défilés officiels à ne pas photographier sans autorisation."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: ["https://en.wikipedia.org/wiki/Republic_Day_(Niger)", W_LAW, W_LAW_EN],
    ...tx({
      en: {
        name: "Republic Day",
        summary: "18 December, anniversary of the proclamation of the Republic in 1958, Niger's national day.",
        description:
          "On 18 December 1958 Niger became a republic within the French Community, before independence in 1960. A public holiday and the national day, this anniversary has long been celebrated with a rotating festival held each year in a different regional capital (Tillabéri, Zinder, Diffa…), with parades and shows. The celebrations fall in the cool season.",
        tips: tipsH("en", "The host town and programme are announced by the government; do not photograph official parades without permission."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Fiesta de la República",
        summary: "El 18 de diciembre, aniversario de la proclamación de la República en 1958, fiesta nacional de Níger.",
        description:
          "El 18 de diciembre de 1958, Níger se convirtió en república dentro de la Comunidad francesa, antes de la independencia de 1960. Fiesta nacional y festiva, este aniversario se ha celebrado durante mucho tiempo con una fiesta itinerante organizada cada año en una capital regional distinta (Tillabéri, Zinder, Diffa…), con desfiles y espectáculos. Las celebraciones caen en plena estación fresca.",
        tips: tipsH("es", "La ciudad anfitriona y el programa los anuncia el gobierno; no fotografíe los desfiles oficiales sin autorización."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Festa da República",
        summary: "O 18 de dezembro, aniversário da proclamação da República em 1958, festa nacional do Níger.",
        description:
          "A 18 de dezembro de 1958, o Níger tornou-se uma república no seio da Comunidade francesa, antes da independência de 1960. Festa nacional e feriado, este aniversário foi durante muito tempo celebrado com uma festa itinerante organizada todos os anos numa capital regional diferente (Tillabéri, Zinder, Diffa…), com desfiles e espetáculos. As celebrações decorrem em plena estação fresca.",
        tips: tipsH("pt", "A cidade anfitriã e o programa são anunciados pelo governo; não fotografe os desfiles oficiais sem autorização."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "عيد الجمهورية",
        summary: "18 ديسمبر، ذكرى إعلان الجمهورية عام 1958، والعيد الوطني للنيجر.",
        description:
          "في 18 ديسمبر 1958 أصبح النيجر جمهورية ضمن المجموعة الفرنسية، قبل استقلال عام 1960. وهذه الذكرى، وهي العيد الوطني وعطلة رسمية، طالما احتُفل بها في عيد متنقّل يُقام كل عام في عاصمة منطقة مختلفة (تيلابيري، زيندر، ديفا…)، مع استعراضات وعروض. وتجري الاحتفالات في قلب الموسم البارد.",
        tips: tipsH("ar", "تعلن الحكومة المدينة المضيفة والبرنامج؛ لا تصوّروا الاستعراضات الرسمية من دون إذن."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "noel-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 12, day: 25 },
    caution: true,
    place: "cathedrale-niamey",
    name: "Noël",
    summary: "Le 25 décembre, fête de la Nativité, férié dans tout le pays et point d'orgue des fêtes de fin d'année.",
    description:
      "Noël est férié au Niger, bien que les chrétiens n'y soient qu'une petite minorité. La veillée et la messe de minuit rassemblent les fidèles à la cathédrale de Niamey et dans les paroisses du pays, et beaucoup de familles musulmanes partagent l'esprit festif de la fin d'année. Avec le Nouvel An, la période correspond à la saison fraîche, la plus agréable pour les sorties en soirée.",
    tips: tipsH("fr", "Tenue correcte pour les offices ; arrivez tôt à la messe de minuit, souvent très suivie."),
    where: ALL.fr,
    dateNote: FIXED_NOTE.fr,
    sources: [W_LAW, W_LAW_EN],
    ...tx({
      en: {
        name: "Christmas",
        summary: "25 December, the feast of the Nativity, a nationwide public holiday and high point of the year-end festivities.",
        description:
          "Christmas is a public holiday in Niger, even though Christians are only a small minority. The vigil and midnight mass draw worshippers to Niamey cathedral and parishes across the country, and many Muslim families share the festive mood of the year's end. Together with New Year, the period falls in the cool season, the most pleasant for evenings out.",
        tips: tipsH("en", "Dress appropriately for services; arrive early for midnight mass, which is often well attended."),
        where: ALL.en,
        dateNote: FIXED_NOTE.en,
      },
      es: {
        name: "Navidad",
        summary: "El 25 de diciembre, fiesta de la Natividad, festivo en todo el país y punto culminante de las fiestas de fin de año.",
        description:
          "La Navidad es festiva en Níger, aunque los cristianos son solo una pequeña minoría. La vigilia y la misa del gallo reúnen a los fieles en la catedral de Niamey y en las parroquias del país, y muchas familias musulmanas comparten el ambiente festivo de fin de año. Junto con el Año Nuevo, el periodo coincide con la estación fresca, la más agradable para salir por la noche.",
        tips: tipsH("es", "Vestimenta adecuada para los oficios; llegue pronto a la misa del gallo, a menudo muy concurrida."),
        where: ALL.es,
        dateNote: FIXED_NOTE.es,
      },
      pt: {
        name: "Natal",
        summary: "O 25 de dezembro, festa da Natividade, feriado em todo o país e ponto alto das festas de fim de ano.",
        description:
          "O Natal é feriado no Níger, embora os cristãos sejam apenas uma pequena minoria. A vigília e a missa do galo reúnem os fiéis na catedral de Niamey e nas paróquias do país, e muitas famílias muçulmanas partilham o espírito festivo do fim de ano. Com o Ano Novo, o período coincide com a estação fresca, a mais agradável para sair à noite.",
        tips: tipsH("pt", "Vestuário adequado para as celebrações; chegue cedo à missa do galo, muitas vezes muito concorrida."),
        where: ALL.pt,
        dateNote: FIXED_NOTE.pt,
      },
      ar: {
        name: "عيد الميلاد",
        summary: "25 ديسمبر، عيد ميلاد المسيح، عطلة في جميع أنحاء البلاد وذروة احتفالات نهاية العام.",
        description:
          "عيد الميلاد عطلة رسمية في النيجر، مع أن المسيحيين ليسوا سوى أقلية صغيرة. وتجمع سهرة الميلاد وقدّاس منتصف الليل المؤمنين في كاتدرائية نيامي وفي رعايا البلاد، وتشارك عائلات مسلمة كثيرة في الأجواء الاحتفالية لنهاية العام. وتصادف هذه الفترة، مع رأس السنة، الموسمَ البارد الأنسب للسهر.",
        tips: tipsH("ar", "لباس لائق لحضور القداديس؛ احضروا مبكرًا إلى قدّاس منتصف الليل الذي يشهد إقبالًا كبيرًا."),
        where: ALL.ar,
        dateNote: FIXED_NOTE.ar,
      },
    }),
  },
  {
    slug: "laylat-al-qadr-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 9, day: 27 },
    caution: true,
    name: "Laylat al-Qadr (Nuit du Destin)",
    summary: "La nuit la plus sacrée du ramadan, veillée de prières dans les mosquées ; la journée est fériée.",
    description:
      "Laylat al-Qadr commémore la nuit où le Coran a commencé à être révélé au Prophète. Au Niger, elle est célébrée dans la nuit du 26 au 27 ramadan : les mosquées restent pleines jusqu'à l'aube pour les prières, la récitation du Coran et les invocations, et beaucoup de fidèles font l'aumône. La journée correspondante est fériée.",
    tips: tipsH("fr", "Ne pas entrer dans les mosquées pendant la veillée sans y être invité ; restez discret, ne mangez ni ne buvez en public pendant le jeûne."),
    where: ALL.fr,
    dateNote: MOON_NOTE.fr,
    sources: [W_LAW, W_LAW_EN],
    ...tx({
      en: {
        name: "Laylat al-Qadr (Night of Destiny)",
        summary: "The holiest night of Ramadan, a night of prayer in the mosques; the day is a public holiday.",
        description:
          "Laylat al-Qadr commemorates the night when the Qur'an began to be revealed to the Prophet. In Niger it is observed on the night of the 26th to the 27th of Ramadan: mosques stay full until dawn for prayers, Qur'an recitation and supplications, and many worshippers give alms. The corresponding day is a public holiday.",
        tips: tipsH("en", "Do not enter mosques during the vigil unless invited; be discreet, and do not eat or drink in public during the fast."),
        where: ALL.en,
        dateNote: MOON_NOTE.en,
      },
      es: {
        name: "Laylat al-Qadr (Noche del Destino)",
        summary: "La noche más sagrada del ramadán, velada de oración en las mezquitas; el día es festivo.",
        description:
          "Laylat al-Qadr conmemora la noche en que el Corán empezó a ser revelado al Profeta. En Níger se celebra la noche del 26 al 27 de ramadán: las mezquitas permanecen llenas hasta el amanecer para las oraciones, la recitación del Corán y las invocaciones, y muchos fieles dan limosna. El día correspondiente es festivo.",
        tips: tipsH("es", "No entre en las mezquitas durante la velada sin invitación; sea discreto y no coma ni beba en público durante el ayuno."),
        where: ALL.es,
        dateNote: MOON_NOTE.es,
      },
      pt: {
        name: "Laylat al-Qadr (Noite do Destino)",
        summary: "A noite mais sagrada do ramadão, vigília de oração nas mesquitas; o dia é feriado.",
        description:
          "A Laylat al-Qadr comemora a noite em que o Corão começou a ser revelado ao Profeta. No Níger, celebra-se na noite de 26 para 27 do ramadão: as mesquitas ficam cheias até ao amanhecer para as orações, a recitação do Corão e as invocações, e muitos fiéis dão esmola. O dia correspondente é feriado.",
        tips: tipsH("pt", "Não entre nas mesquitas durante a vigília sem convite; seja discreto e não coma nem beba em público durante o jejum."),
        where: ALL.pt,
        dateNote: MOON_NOTE.pt,
      },
      ar: {
        name: "ليلة القدر",
        summary: "أقدس ليالي رمضان، ليلة صلاة في المساجد؛ واليوم الموافق لها عطلة رسمية.",
        description:
          "تُحيي ليلة القدر ذكرى الليلة التي بدأ فيها نزول القرآن على النبي. وفي النيجر يُحتفى بها ليلة السابع والعشرين من رمضان: تبقى المساجد مكتظّة حتى الفجر بالصلاة وتلاوة القرآن والدعاء، ويتصدّق كثير من المؤمنين. واليوم الموافق لها عطلة رسمية.",
        tips: tipsH("ar", "لا تدخلوا المساجد أثناء السهرة دون دعوة؛ التزموا التكتّم ولا تأكلوا أو تشربوا علنًا أثناء الصيام."),
        where: ALL.ar,
        dateNote: MOON_NOTE.ar,
      },
    }),
  },
  {
    slug: "aid-el-fitr-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 10, day: 1, days: 2 },
    caution: true,
    cover: "/images/voyage/fete-aid-el-fitr-niger",
    name: "Aïd el-Fitr (Petite Fête, Salla)",
    summary: "La fin du ramadan : grande prière, habits neufs et visites ; deux jours fériés depuis 2026.",
    description:
      "L'Aïd el-Fitr marque la rupture du jeûne du ramadan. Le matin, les fidèles en habits neufs se rendent à la grande prière, souvent en plein air, puis l'on se rend visite, on partage les repas et l'on offre l'aumône de la fin du jeûne. Dans les cités des sultanats, comme Zinder, des cavaliers en tenue d'apparat accompagnent le souverain lors des festivités. Depuis l'ordonnance du 3 mars 2026, le jour de la fête et son lendemain sont fériés.",
    tips: tipsH("fr", "Les commerces ferment le matin de la prière ; les transports sont très chargés avant et après la fête."),
    where: ALL.fr,
    dateNote: MOON_NOTE.fr,
    sources: [ORD_2026, SAHELIEN_2026, W_LAW],
    ...tx({
      en: {
        name: "Eid al-Fitr (Sallah)",
        summary: "The end of Ramadan: a great prayer, new clothes and visits; two public holidays since 2026.",
        description:
          "Eid al-Fitr marks the end of the Ramadan fast. In the morning, worshippers in new clothes attend the great prayer, often in the open air; then people visit each other, share meals and give the end-of-fast alms. In sultanate towns such as Zinder, horsemen in ceremonial dress escort the ruler during the festivities. Since the ordinance of 3 March 2026, the day of the festival and the following day are public holidays.",
        tips: tipsH("en", "Shops close on the morning of the prayer; transport is very busy before and after the festival."),
        where: ALL.en,
        dateNote: MOON_NOTE.en,
      },
      es: {
        name: "Aid el-Fitr (Pequeña Fiesta, Salla)",
        summary: "El final del ramadán: gran oración, ropa nueva y visitas; dos días festivos desde 2026.",
        description:
          "El Aid el-Fitr marca la ruptura del ayuno del ramadán. Por la mañana, los fieles con ropa nueva acuden a la gran oración, a menudo al aire libre; después se hacen visitas, se comparten comidas y se da la limosna del fin del ayuno. En las ciudades de los sultanatos, como Zinder, jinetes con atuendo de gala acompañan al soberano durante los festejos. Desde la ordenanza del 3 de marzo de 2026, el día de la fiesta y el siguiente son festivos.",
        tips: tipsH("es", "Los comercios cierran la mañana de la oración; los transportes están muy concurridos antes y después de la fiesta."),
        where: ALL.es,
        dateNote: MOON_NOTE.es,
      },
      pt: {
        name: "Aid el-Fitr (Pequena Festa, Salla)",
        summary: "O fim do ramadão: grande oração, roupa nova e visitas; dois dias de feriado desde 2026.",
        description:
          "O Aid el-Fitr assinala o fim do jejum do ramadão. De manhã, os fiéis de roupa nova vão à grande oração, muitas vezes ao ar livre; depois fazem-se visitas, partilham-se refeições e dá-se a esmola do fim do jejum. Nas cidades dos sultanatos, como Zinder, cavaleiros em traje de gala acompanham o soberano durante os festejos. Desde a portaria de 3 de março de 2026, o dia da festa e o seguinte são feriados.",
        tips: tipsH("pt", "O comércio fecha na manhã da oração; os transportes estão muito cheios antes e depois da festa."),
        where: ALL.pt,
        dateNote: MOON_NOTE.pt,
      },
      ar: {
        name: "عيد الفطر",
        summary: "نهاية رمضان: صلاة العيد والملابس الجديدة والزيارات؛ يومان من العطلة منذ 2026.",
        description:
          "يُعلن عيد الفطر نهاية صيام رمضان. في الصباح يتوجّه المصلّون بملابسهم الجديدة إلى صلاة العيد، وغالبًا ما تُقام في الهواء الطلق، ثم يتبادل الناس الزيارات ويتقاسمون الطعام ويُخرجون زكاة الفطر. وفي مدن السلطنات مثل زيندر يرافق فرسانٌ بأزياء الاحتفال الحاكمَ خلال الاحتفالات. ومنذ أمر 3 مارس 2026 أصبح يوم العيد واليوم الذي يليه عطلة رسمية.",
        tips: tipsH("ar", "تُغلق المتاجر صباح الصلاة، وتكون وسائل النقل مزدحمة جدًا قبل العيد وبعده."),
        where: ALL.ar,
        dateNote: MOON_NOTE.ar,
      },
    }),
  },
  {
    slug: "tabaski-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 12, day: 10, days: 2 },
    caution: true,
    name: "Tabaski (Aïd el-Kébir)",
    summary: "La fête du sacrifice, la plus importante de l'année : prière, mouton partagé et visites ; deux jours fériés.",
    description:
      "La Tabaski commémore le sacrifice d'Abraham. Après la grande prière du matin, chaque famille qui le peut sacrifie un mouton, dont la viande est partagée avec les proches et les plus démunis ; les jours suivants sont consacrés aux visites et aux grillades. À Zinder, le sultan du Damagaram se rend à la prière à la tête de son cortège de cavaliers richement harnachés, et une compétition équestre est organisée. Le jour de la fête et son lendemain sont fériés, chômés et payés.",
    tips: tipsH("fr", "Les marchés au bétail sont bondés la semaine précédente ; voyages interurbains très chargés, réservez tôt."),
    where: ALL.fr,
    dateNote: MOON_NOTE.fr,
    sources: [
      "https://www.lesahel.org/communique-du-ministere-de-la-fonction-publique-du-travail-et-de-lemploi-38/",
      "https://nigerdiaspora.net/societe-niger/tabaski-2026-au-niger-les-journees-des-27-et-28-mai-declarees-feriees-chomees-et-payees",
      "https://www.lesahel.org/zinder-la-competition-equestre-de-tabaski-perpetue-la-tradition-et-recompense-les-meilleurs-cavaliers/",
    ],
    ...tx({
      en: {
        name: "Tabaski (Eid al-Adha)",
        summary: "The Feast of the Sacrifice, the biggest festival of the year: prayer, a shared sheep and visits; two public holidays.",
        description:
          "Tabaski commemorates Abraham's sacrifice. After the great morning prayer, every family that can afford it sacrifices a sheep, whose meat is shared with relatives and those in need; the following days are devoted to visits and grilled meat. In Zinder, the Sultan of Damagaram rides to prayer at the head of a procession of richly harnessed horsemen, and a horse race is held. The day of the festival and the following day are paid public holidays.",
        tips: tipsH("en", "Livestock markets are packed the week before; intercity travel is very busy, so book early."),
        where: ALL.en,
        dateNote: MOON_NOTE.en,
      },
      es: {
        name: "Tabaski (Aid el-Kebir)",
        summary: "La fiesta del sacrificio, la más importante del año: oración, cordero compartido y visitas; dos días festivos.",
        description:
          "La Tabaski conmemora el sacrificio de Abraham. Tras la gran oración de la mañana, cada familia que puede sacrifica un cordero, cuya carne se comparte con los allegados y los más necesitados; los días siguientes se dedican a las visitas y a las parrilladas. En Zinder, el sultán de Damagaram acude a la oración al frente de su cortejo de jinetes ricamente enjaezados, y se organiza una competición ecuestre. El día de la fiesta y el siguiente son festivos, no laborables y retribuidos.",
        tips: tipsH("es", "Los mercados de ganado están abarrotados la semana anterior; los viajes interurbanos están muy concurridos, reserve con antelación."),
        where: ALL.es,
        dateNote: MOON_NOTE.es,
      },
      pt: {
        name: "Tabaski (Aid el-Kebir)",
        summary: "A festa do sacrifício, a mais importante do ano: oração, carneiro partilhado e visitas; dois dias de feriado.",
        description:
          "A Tabaski comemora o sacrifício de Abraão. Depois da grande oração da manhã, cada família que pode sacrifica um carneiro, cuja carne é partilhada com os próximos e os mais necessitados; os dias seguintes são dedicados às visitas e aos grelhados. Em Zinder, o sultão do Damagaram vai à oração à frente do seu cortejo de cavaleiros ricamente ajaezados, e realiza-se uma competição equestre. O dia da festa e o seguinte são feriados pagos.",
        tips: tipsH("pt", "Os mercados de gado estão apinhados na semana anterior; as viagens entre cidades estão muito cheias, reserve cedo."),
        where: ALL.pt,
        dateNote: MOON_NOTE.pt,
      },
      ar: {
        name: "عيد الأضحى (التباسكي)",
        summary: "عيد التضحية، أهم أعياد السنة: صلاة وأضحية تُقتسم وزيارات؛ يومان من العطلة.",
        description:
          "يُحيي عيد الأضحى ذكرى تضحية إبراهيم. بعد صلاة العيد صباحًا، تذبح كل عائلة مقتدرة كبشًا يُقتسم لحمه مع الأقارب والمحتاجين، وتُخصَّص الأيام التالية للزيارات والشواء. وفي زيندر يتوجّه سلطان دماغرام إلى الصلاة على رأس موكب من الفرسان بخيول مزيّنة، ويُنظَّم سباق للخيل. ويوم العيد واليوم الذي يليه عطلة رسمية مدفوعة الأجر.",
        tips: tipsH("ar", "تكتظّ أسواق المواشي في الأسبوع السابق للعيد، ويشتدّ الضغط على السفر بين المدن، فاحجزوا مبكرًا."),
        where: ALL.ar,
        dateNote: MOON_NOTE.ar,
      },
    }),
  },
  {
    slug: "nouvel-an-musulman-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 1, day: 1 },
    caution: true,
    name: "Nouvel An musulman (1er Mouharram)",
    summary: "Le premier jour de l'année de l'Hégire, journée fériée de prières et de vœux.",
    description:
      "Le 1er Mouharram ouvre l'année du calendrier musulman, en souvenir de l'émigration (Hégire) du Prophète de La Mecque à Médine. Au Niger, la journée est fériée, chômée et payée ; elle est marquée par des prières et des sermons dans les mosquées et par l'échange de vœux. Dix jours plus tard vient l'Achoura, qui clôt à Agadez la fête du Bianou.",
    tips: tipsH("fr", "Ambiance surtout religieuse et familiale ; pas de grandes festivités publiques."),
    where: ALL.fr,
    dateNote: MOON_NOTE.fr,
    sources: [
      "https://www.lesahel.org/communique-du-ministere-de-la-fonction-publique-du-travail-et-de-lemploi-39/",
      "https://anp.ne/nouvel-an-musulman-la-communaute-musulmane-celebre-ce-mercredi-17-juin-2026-le-1er-muharram-1448-de-lhegire/",
    ],
    ...tx({
      en: {
        name: "Islamic New Year (1 Muharram)",
        summary: "The first day of the Hijri year, a public holiday of prayers and good wishes.",
        description:
          "1 Muharram opens the year of the Islamic calendar, commemorating the Prophet's emigration (Hijra) from Mecca to Medina. In Niger the day is a paid public holiday, marked by prayers and sermons in the mosques and the exchange of good wishes. Ten days later comes Ashura, which closes the Bianou festival in Agadez.",
        tips: tipsH("en", "A mainly religious and family occasion, with no large public festivities."),
        where: ALL.en,
        dateNote: MOON_NOTE.en,
      },
      es: {
        name: "Año Nuevo musulmán (1 de muharram)",
        summary: "El primer día del año de la Hégira, jornada festiva de oraciones y felicitaciones.",
        description:
          "El 1 de muharram abre el año del calendario musulmán, en recuerdo de la emigración (Hégira) del Profeta de La Meca a Medina. En Níger la jornada es festiva, no laborable y retribuida; está marcada por oraciones y sermones en las mezquitas y por el intercambio de felicitaciones. Diez días después llega la Achura, que cierra en Agadez la fiesta del Bianou.",
        tips: tipsH("es", "Ambiente sobre todo religioso y familiar; sin grandes festejos públicos."),
        where: ALL.es,
        dateNote: MOON_NOTE.es,
      },
      pt: {
        name: "Ano Novo muçulmano (1 de muharram)",
        summary: "O primeiro dia do ano da Hégira, feriado de orações e votos.",
        description:
          "O 1 de muharram abre o ano do calendário muçulmano, em memória da emigração (Hégira) do Profeta de Meca para Medina. No Níger, o dia é feriado pago, marcado por orações e sermões nas mesquitas e pela troca de votos. Dez dias depois chega a Achura, que encerra em Agadez a festa do Bianou.",
        tips: tipsH("pt", "Ambiente sobretudo religioso e familiar; sem grandes festejos públicos."),
        where: ALL.pt,
        dateNote: MOON_NOTE.pt,
      },
      ar: {
        name: "رأس السنة الهجرية (1 محرّم)",
        summary: "اليوم الأول من السنة الهجرية، عطلة رسمية للصلاة وتبادل التهاني.",
        description:
          "يفتتح الأول من محرّم السنة في التقويم الهجري، إحياءً لذكرى هجرة النبي من مكة إلى المدينة. وفي النيجر يكون هذا اليوم عطلة رسمية مدفوعة الأجر، تطبعه الصلوات والخطب في المساجد وتبادل التهاني. وبعد عشرة أيام يحلّ عاشوراء الذي يُختتم به احتفال البيانو في أغاديز.",
        tips: tipsH("ar", "أجواء دينية وعائلية في الأساس، دون احتفالات عامة كبيرة."),
        where: ALL.ar,
        dateNote: MOON_NOTE.ar,
      },
    }),
  },
  {
    slug: "mouloud-niger",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 3, day: 12, days: 2 },
    caution: true,
    name: "Mouloud (Maouloud)",
    summary: "L'anniversaire de la naissance du Prophète, veillées de prières et de chants ; deux jours fériés depuis 2026.",
    description:
      "Le Mouloud célèbre la naissance du prophète Mohammed. La nuit est consacrée aux prières, aux récitations et aux chants religieux dans les mosquées et les cours des confréries, et la journée aux visites. Depuis l'ordonnance du 3 mars 2026, le lendemain est également férié, chômé et payé. À Zinder, ce lendemain voit défiler le Hawan Daba, la grande cavalcade du sultan du Damagaram.",
    tips: tipsH("fr", "Veillées ouvertes aux fidèles : tenue couvrante et discrétion ; demandez avant de photographier."),
    where: ALL.fr,
    dateNote: MOON_NOTE.fr,
    sources: ["https://www.lesahel.org/communique-du-ministere-de-la-fonction-publique-du-travail-et-de-lemploi-41/", W_LAW, W_LAW_EN],
    ...tx({
      en: {
        name: "Mawlid (Mouloud)",
        summary: "The Prophet's birthday, with nights of prayer and religious songs; two public holidays since 2026.",
        description:
          "Mawlid celebrates the birth of the Prophet Muhammad. The night is devoted to prayers, recitations and religious songs in mosques and Sufi brotherhood courtyards, and the day to visits. Since the ordinance of 3 March 2026, the following day is also a paid public holiday. In Zinder, that day sees the Hawan Daba, the Sultan of Damagaram's great cavalcade.",
        tips: tipsH("en", "Vigils are open to worshippers: wear covering clothes, be discreet and ask before taking photos."),
        where: ALL.en,
        dateNote: MOON_NOTE.en,
      },
      es: {
        name: "Mawlid (Mulud)",
        summary: "El aniversario del nacimiento del Profeta, veladas de oración y cantos; dos días festivos desde 2026.",
        description:
          "El Mawlid celebra el nacimiento del profeta Mahoma. La noche se dedica a las oraciones, las recitaciones y los cantos religiosos en las mezquitas y en los patios de las cofradías, y el día a las visitas. Desde la ordenanza del 3 de marzo de 2026, el día siguiente también es festivo, no laborable y retribuido. En Zinder, ese día desfila el Hawan Daba, la gran cabalgata del sultán de Damagaram.",
        tips: tipsH("es", "Veladas abiertas a los fieles: ropa que cubra el cuerpo y discreción; pida permiso antes de fotografiar."),
        where: ALL.es,
        dateNote: MOON_NOTE.es,
      },
      pt: {
        name: "Mawlid (Mulude)",
        summary: "O aniversário do nascimento do Profeta, vigílias de oração e cânticos; dois dias de feriado desde 2026.",
        description:
          "O Mawlid celebra o nascimento do profeta Maomé. A noite é dedicada às orações, recitações e cânticos religiosos nas mesquitas e nos pátios das confrarias, e o dia às visitas. Desde a portaria de 3 de março de 2026, o dia seguinte é também feriado pago. Em Zinder, nesse dia desfila o Hawan Daba, a grande cavalgada do sultão do Damagaram.",
        tips: tipsH("pt", "Vigílias abertas aos fiéis: roupa que cubra o corpo e discrição; peça autorização antes de fotografar."),
        where: ALL.pt,
        dateNote: MOON_NOTE.pt,
      },
      ar: {
        name: "المولد النبوي",
        summary: "ذكرى مولد النبي، بسهرات صلاة وإنشاد؛ يومان من العطلة منذ 2026.",
        description:
          "يحتفي المولد بميلاد النبي محمد. تُخصَّص الليلة للصلوات والتلاوات والأناشيد الدينية في المساجد وساحات الطرق الصوفية، والنهار للزيارات. ومنذ أمر 3 مارس 2026 أصبح اليوم التالي أيضًا عطلة رسمية مدفوعة الأجر. وفي زيندر يشهد ذلك اليوم موكب «هاوان دابا»، الاستعراض الكبير لفرسان سلطان دماغرام.",
        tips: tipsH("ar", "السهرات مفتوحة للمصلّين: لباس ساتر وتكتّم، واستأذنوا قبل التصوير."),
        where: ALL.ar,
        dateNote: MOON_NOTE.ar,
      },
    }),
  },

  // ───────────── Temps forts religieux et traditionnels (non fériés) ─────────────
  {
    slug: "ramadan-niger",
    kind: "SEASONAL",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 1, days: 30 },
    caution: true,
    cover: "/images/voyage/fete-ramadan-niger",
    name: "Ramadan et nuits de ramadan",
    summary: "Un mois de jeûne le jour et de vie nocturne animée : ruptures du jeûne, veillées et rues animées.",
    description:
      "Pendant le mois de ramadan, l'immense majorité des Nigériens jeûne de l'aube au coucher du soleil. La journée s'écoule au ralenti, puis la ville s'anime à l'heure de la rupture du jeûne : bouillies, beignets, dattes et boissons fraîches se partagent en famille ou dans la rue. Les soirées se prolongent autour des mosquées, des marchés et des places ; à Niamey, des enfants parcourent les quartiers le soir en chantant. Les dernières nuits culminent avec Laylat al-Qadr, puis l'Aïd el-Fitr.",
    tips: tipsE("fr", "Ne mangez, ne buvez ni ne fumez en public dans la journée ; horaires des administrations réduits ; acceptez volontiers une invitation à rompre le jeûne."),
    where: ALL.fr,
    dateNote:
      "Neuvième mois du calendrier musulman (29 ou 30 jours) : le début et la fin dépendent de l'observation du croissant lunaire, annoncée par les autorités religieuses.",
    sources: ["https://fr.wikipedia.org/wiki/Ramadan", ORD_2026],
    ...tx({
      en: {
        name: "Ramadan and Ramadan nights",
        summary: "A month of daytime fasting and lively nights: fast-breaking meals, vigils and busy streets.",
        description:
          "During Ramadan, the vast majority of Nigeriens fast from dawn to sunset. Days move slowly, then towns come alive at the time of breaking the fast: porridges, fritters, dates and cold drinks are shared with family or in the street. Evenings stretch on around mosques, markets and squares; in Niamey, children go round the neighbourhoods at night singing. The last nights culminate in Laylat al-Qadr, followed by Eid al-Fitr.",
        tips: tipsE("en", "Do not eat, drink or smoke in public during the day; government office hours are shorter; gladly accept an invitation to break the fast."),
        where: ALL.en,
        dateNote: "Ninth month of the Islamic calendar (29 or 30 days): the start and end depend on the sighting of the new moon, announced by religious authorities.",
      },
      es: {
        name: "Ramadán y noches de ramadán",
        summary: "Un mes de ayuno de día y de animada vida nocturna: rupturas del ayuno, veladas y calles llenas.",
        description:
          "Durante el mes de ramadán, la inmensa mayoría de los nigerinos ayuna desde el alba hasta la puesta del sol. El día transcurre a ritmo lento y, a la hora de romper el ayuno, la ciudad se anima: gachas, buñuelos, dátiles y bebidas frescas se comparten en familia o en la calle. Las veladas se prolongan en torno a las mezquitas, los mercados y las plazas; en Niamey, niños recorren los barrios por la noche cantando. Las últimas noches culminan con Laylat al-Qadr y después el Aid el-Fitr.",
        tips: tipsE("es", "No coma, beba ni fume en público durante el día; horarios de la administración reducidos; acepte de buen grado una invitación a romper el ayuno."),
        where: ALL.es,
        dateNote: "Noveno mes del calendario musulmán (29 o 30 días): el comienzo y el final dependen de la observación de la luna creciente, anunciada por las autoridades religiosas.",
      },
      pt: {
        name: "Ramadão e noites de ramadão",
        summary: "Um mês de jejum de dia e de animada vida noturna: quebras do jejum, vigílias e ruas cheias.",
        description:
          "Durante o mês do ramadão, a imensa maioria dos nigerinos jejua do amanhecer ao pôr do sol. O dia decorre em ritmo lento e, à hora da quebra do jejum, a cidade anima-se: papas, filhós, tâmaras e bebidas frescas partilham-se em família ou na rua. Os serões prolongam-se à volta das mesquitas, dos mercados e das praças; em Niamey, crianças percorrem os bairros à noite a cantar. As últimas noites culminam com a Laylat al-Qadr e depois o Aid el-Fitr.",
        tips: tipsE("pt", "Não coma, beba nem fume em público durante o dia; horários da administração reduzidos; aceite de bom grado um convite para quebrar o jejum."),
        where: ALL.pt,
        dateNote: "Nono mês do calendário muçulmano (29 ou 30 dias): o início e o fim dependem da observação do crescente lunar, anunciada pelas autoridades religiosas.",
      },
      ar: {
        name: "رمضان ولياليه",
        summary: "شهر صيام نهارًا وحياة ليلية نابضة: موائد الإفطار والسهرات والشوارع المزدحمة.",
        description:
          "خلال شهر رمضان يصوم الغالبية العظمى من النيجريين من الفجر حتى غروب الشمس. يمضي النهار ببطء، ثم تدبّ الحياة في المدن عند الإفطار: العصائد والفطائر والتمور والمشروبات الباردة تُقتسم مع العائلة أو في الشارع. وتمتد السهرات حول المساجد والأسواق والساحات؛ وفي نيامي يجوب أطفالٌ الأحياءَ ليلًا وهم يغنّون. وتبلغ الليالي الأخيرة ذروتها بليلة القدر ثم عيد الفطر.",
        tips: tipsE("ar", "لا تأكلوا ولا تشربوا ولا تدخّنوا علنًا في النهار؛ ساعات عمل الإدارات مختصرة؛ اقبلوا بسرور دعوة إلى الإفطار."),
        where: ALL.ar,
        dateNote: "الشهر التاسع من التقويم الهجري (29 أو 30 يومًا): تتوقّف بدايته ونهايته على رؤية الهلال التي تعلنها السلطات الدينية.",
      },
    }),
  },
  {
    slug: "bianou-agadez",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "hijri", month: 12, day: 17, days: 24 },
    caution: true,
    destination: "agadez",
    place: "palais-du-sultan-agadez",
    cover: "/images/voyage/fete-bianou-agadez",
    name: "Fête du Bianou",
    summary: "Trois semaines de cortèges, tambours et danses à Agadez, de la semaine suivant la Tabaski jusqu'à l'Achoura.",
    description:
      "Le Bianou est la grande fête traditionnelle d'Agadez, liée au passage à la nouvelle année musulmane. Environ une semaine après la Tabaski, les quartiers de la vieille ville lancent les festivités : cortèges d'hommes en turbans et grands boubous, tambours, chants et danses parcourent les ruelles jusqu'au palais du sultan de l'Aïr. Les célébrations culminent à l'Achoura (10 Mouharram) dans la cour du sultanat ; en 2025, elles ont duré du 13 juin au 7 juillet.",
    tips: tipsE("fr", "Fête de la communauté, pas un spectacle : demandez avant de photographier et suivez les cortèges à distance respectueuse."),
    where: "Agadez (vieille ville et palais du sultan)",
    dateNote:
      "Suit le calendrier musulman : début vers le 17 Dhou al-Hijja (environ une semaine après la Tabaski), apogée et clôture à l'Achoura (10 Mouharram). Dates exactes fixées chaque année par le comité du Bianou et le sultanat.",
    sources: [
      "https://www.anp.ne/agadez-ledition-2025-de-la-fete-du-bianou-prend-fin-dans-la-joie-et-lallegresse/",
      "https://www.lesahel.org/agadez-edition-2025-de-la-fete-de-bianou-des-membres-du-gouvernement-et-ceux-du-cnsp-honorent-de-leur-presence-levenement-culturel/",
      "https://www.studiokalangou.org/136300-agadez-cloture-edition-2025-bianou-apres-27-jours-festivites",
      "https://niger.iom.int/stories/celebrating-bianou-festival-agadez-promoting-social-cohesion-through-culture-and-traditions",
    ],
    ...tx({
      en: {
        name: "Bianou Festival",
        summary: "Three weeks of processions, drums and dancing in Agadez, from the week after Tabaski until Ashura.",
        description:
          "Bianou is Agadez's great traditional festival, linked to the turn of the Islamic new year. About a week after Tabaski, the old town's quarters launch the festivities: processions of men in turbans and flowing robes, drums, songs and dances wind through the lanes to the palace of the Sultan of Aïr. Celebrations culminate on Ashura (10 Muharram) in the sultanate's courtyard; in 2025 they ran from 13 June to 7 July.",
        tips: tipsE("en", "A community festival, not a show: ask before taking photos and follow processions at a respectful distance."),
        where: "Agadez (old town and sultan's palace)",
        dateNote: "Follows the Islamic calendar: starts around 17 Dhu al-Hijjah (about a week after Tabaski), peaks and ends on Ashura (10 Muharram). Exact dates are set each year by the Bianou committee and the sultanate.",
      },
      es: {
        name: "Fiesta del Bianou",
        summary: "Tres semanas de cortejos, tambores y danzas en Agadez, desde la semana posterior a la Tabaski hasta la Achura.",
        description:
          "El Bianou es la gran fiesta tradicional de Agadez, ligada al paso al nuevo año musulmán. Alrededor de una semana después de la Tabaski, los barrios de la ciudad vieja inauguran los festejos: cortejos de hombres con turbantes y amplios bubús, tambores, cantos y danzas recorren las callejuelas hasta el palacio del sultán del Aïr. Las celebraciones culminan en la Achura (10 de muharram) en el patio del sultanato; en 2025 duraron del 13 de junio al 7 de julio.",
        tips: tipsE("es", "Es una fiesta de la comunidad, no un espectáculo: pida permiso antes de fotografiar y siga los cortejos a una distancia respetuosa."),
        where: "Agadez (ciudad vieja y palacio del sultán)",
        dateNote: "Sigue el calendario musulmán: empieza hacia el 17 de dulhiyya (una semana después de la Tabaski) y culmina y termina en la Achura (10 de muharram). Las fechas exactas las fijan cada año el comité del Bianou y el sultanato.",
      },
      pt: {
        name: "Festa do Bianou",
        summary: "Três semanas de cortejos, tambores e danças em Agadez, desde a semana seguinte à Tabaski até à Achura.",
        description:
          "O Bianou é a grande festa tradicional de Agadez, ligada à passagem para o novo ano muçulmano. Cerca de uma semana depois da Tabaski, os bairros da cidade velha dão início aos festejos: cortejos de homens de turbante e amplos bubus, tambores, cânticos e danças percorrem as ruelas até ao palácio do sultão do Aïr. As celebrações culminam na Achura (10 de muharram) no pátio do sultanato; em 2025 decorreram de 13 de junho a 7 de julho.",
        tips: tipsE("pt", "É uma festa da comunidade, não um espetáculo: peça autorização antes de fotografar e siga os cortejos a uma distância respeitosa."),
        where: "Agadez (cidade velha e palácio do sultão)",
        dateNote: "Segue o calendário muçulmano: começa por volta de 17 de dhu al-hijja (cerca de uma semana depois da Tabaski) e culmina e termina na Achura (10 de muharram). As datas exatas são fixadas todos os anos pelo comité do Bianou e pelo sultanato.",
      },
      ar: {
        name: "احتفال البيانو",
        summary: "ثلاثة أسابيع من المواكب والطبول والرقص في أغاديز، من الأسبوع التالي لعيد الأضحى حتى عاشوراء.",
        description:
          "البيانو هو الاحتفال التقليدي الكبير في أغاديز، ويرتبط بحلول السنة الهجرية الجديدة. بعد نحو أسبوع من عيد الأضحى تُطلق أحياء المدينة القديمة الاحتفالات: مواكب من الرجال بالعمائم والجلابيب الفضفاضة، وطبول وأغانٍ ورقصات تجوب الأزقة حتى قصر سلطان آيير. وتبلغ الاحتفالات ذروتها في عاشوراء (10 محرّم) في فناء السلطنة؛ وقد امتدّت في عام 2025 من 13 يونيو إلى 7 يوليو.",
        tips: tipsE("ar", "إنه احتفال للمجتمع لا عرض فُرجة: استأذنوا قبل التصوير وتابعوا المواكب من مسافة لائقة."),
        where: "أغاديز (المدينة القديمة وقصر السلطان)",
        dateNote: "يتبع التقويم الهجري: يبدأ نحو 17 ذي الحجة (قرابة أسبوع بعد عيد الأضحى) ويبلغ ذروته ويُختتم في عاشوراء (10 محرّم). وتحدّد لجنة البيانو والسلطنة المواعيد الدقيقة كل عام.",
      },
    }),
  },
  {
    slug: "hawan-daba-zinder",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "hijri", month: 3, day: 13 },
    caution: true,
    destination: "zinder",
    place: "palais-du-sultan-zinder",
    name: "Hawan Daba de Zinder",
    summary: "Le lendemain du Mouloud, la grande cavalcade du sultan du Damagaram parcourt les rues de Zinder.",
    description:
      "Au lendemain du Mouloud, le sultan du Damagaram sort de son palais, attendu par des chasseurs-guerriers et des cavaliers venus des cantons. Notables en costumes d'apparat et chevaux richement parés se lancent dans une fantasia, puis le cortège suit un itinéraire immuable à travers la ville, sous les acclamations de la foule, avant de revenir au palais où le sultan s'adresse à la population. Ce rituel transmis de génération en génération illustre le lien entre la cour et ses sujets.",
    tips: tipsE("fr", "Gardez vos distances avec les chevaux lancés au galop ; demandez avant de photographier les notables."),
    where: "Zinder (du palais du sultan au marché Dollé)",
    dateNote: "Lendemain du Mouloud (13 Rabi al-awwal), selon l'observation de la lune ; programme annoncé par le sultanat.",
    sources: ["https://nigerdiaspora.net/politique/fete-du-mouloud-a-zinder-le-sultan-du-damagaram-perpetue-la-tradition-ancestrale-du-hawan-daba"],
    ...tx({
      en: {
        name: "Hawan Daba in Zinder",
        summary: "The day after Mawlid, the Sultan of Damagaram's great cavalcade rides through the streets of Zinder.",
        description:
          "On the day after Mawlid, the Sultan of Damagaram leaves his palace, awaited by hunter-warriors and horsemen from the surrounding cantons. Notables in ceremonial dress on richly decorated horses launch into a fantasia, then the procession follows a fixed route through the town to the cheers of the crowd before returning to the palace, where the sultan addresses the people. Handed down through the generations, the ritual expresses the bond between the court and its subjects.",
        tips: tipsE("en", "Keep clear of galloping horses; ask before photographing the notables."),
        where: "Zinder (from the sultan's palace to Dollé market)",
        dateNote: "The day after Mawlid (13 Rabi al-Awwal), depending on the moon sighting; programme announced by the sultanate.",
      },
      es: {
        name: "Hawan Daba de Zinder",
        summary: "El día después del Mawlid, la gran cabalgata del sultán de Damagaram recorre las calles de Zinder.",
        description:
          "El día siguiente al Mawlid, el sultán de Damagaram sale de su palacio, esperado por cazadores-guerreros y jinetes llegados de los cantones. Notables con trajes de gala y caballos ricamente enjaezados se lanzan a una fantasía; después, el cortejo sigue un itinerario inmutable por la ciudad, entre las aclamaciones del público, antes de regresar al palacio, donde el sultán se dirige a la población. Este ritual transmitido de generación en generación ilustra el vínculo entre la corte y sus súbditos.",
        tips: tipsE("es", "Mantenga la distancia con los caballos al galope; pida permiso antes de fotografiar a los notables."),
        where: "Zinder (del palacio del sultán al mercado Dollé)",
        dateNote: "Día siguiente al Mawlid (13 de rabi al-awwal), según la observación de la luna; programa anunciado por el sultanato.",
      },
      pt: {
        name: "Hawan Daba de Zinder",
        summary: "No dia seguinte ao Mawlid, a grande cavalgada do sultão do Damagaram percorre as ruas de Zinder.",
        description:
          "No dia seguinte ao Mawlid, o sultão do Damagaram sai do palácio, aguardado por caçadores-guerreiros e cavaleiros vindos dos cantões. Notáveis em trajes de gala e cavalos ricamente ajaezados lançam-se numa fantasia; depois, o cortejo segue um itinerário imutável pela cidade, sob as aclamações da multidão, antes de regressar ao palácio, onde o sultão se dirige à população. Este ritual transmitido de geração em geração ilustra o laço entre a corte e os seus súbditos.",
        tips: tipsE("pt", "Mantenha distância dos cavalos a galope; peça autorização antes de fotografar os notáveis."),
        where: "Zinder (do palácio do sultão ao mercado Dollé)",
        dateNote: "Dia seguinte ao Mawlid (13 de rabi al-awwal), segundo a observação da lua; programa anunciado pelo sultanato.",
      },
      ar: {
        name: "هاوان دابا في زيندر",
        summary: "في اليوم التالي للمولد يجوب موكب فرسان سلطان دماغرام الكبير شوارع زيندر.",
        description:
          "في اليوم التالي للمولد يخرج سلطان دماغرام من قصره حيث ينتظره صيّادون-محاربون وفرسان قدموا من المقاطعات. وينطلق الأعيان بأزيائهم الاحتفالية على خيول مزيّنة في استعراض للفروسية، ثم يسلك الموكب مسارًا ثابتًا عبر المدينة وسط هتاف الجموع، قبل أن يعود إلى القصر حيث يخاطب السلطان السكان. ويجسّد هذا الطقس المتوارث جيلًا بعد جيل الرابطَ بين البلاط ورعاياه.",
        tips: tipsE("ar", "ابقوا بعيدين عن الخيول المنطلقة عدوًا؛ واستأذنوا قبل تصوير الأعيان."),
        where: "زيندر (من قصر السلطان إلى سوق دولّي)",
        dateNote: "اليوم التالي للمولد (13 ربيع الأول) بحسب رؤية الهلال؛ وتعلن السلطنة البرنامج.",
      },
    }),
  },
  {
    slug: "cure-salee-ingall-niger",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "period", from: 9, to: 10 },
    caution: true,
    place: "cure-salee-ingall",
    cover: "/images/voyage/fete-cure-salee-ingall-niger",
    name: "Cure salée d'In-Gall",
    summary: "Le grand rassemblement des éleveurs touaregs et peuls wodaabé, avec courses de chameaux et Gérewol.",
    description:
      "À la fin de la saison des pluies, les éleveurs conduisent leurs troupeaux vers les pâturages et sources salées d'In-Gall. Depuis les années 1990, l'État en a fait un festival officiel de trois jours : défilés de chameliers, courses de chameaux, exposition de produits pastoraux, musique et danses et, chez les Peuls wodaabé, le Gérewol, célèbre concours de beauté masculine. Après deux années d'interruption, la 58e édition s'est tenue du 4 au 6 octobre 2025 et la 59e du 2 au 4 octobre 2026.",
    tips: tipsE("fr", "Demandez l'accord des personnes avant toute photo, en particulier pendant le Gérewol ; les nuits peuvent être fraîches."),
    where: "In-Gall, région d'Agadez",
    dateNote:
      "Fin septembre ou début octobre, selon la fin de la saison des pluies ; dates fixées chaque année par le gouvernement et annoncées quelques semaines avant.",
    sources: [
      "https://anp.ne/ingall-agadez-le-premier-ministre-lance-officiellement-les-festivites-de-la-cure-salee-edition-2026/",
      "https://nigerdiaspora.net/culture/cure-salee-2026-la-59e-edition-ouverte-a-ingall-par-le-premier-ministre-lamine-zeine",
      "https://wadataradio.com/?p=3759",
      "https://en.wikipedia.org/wiki/Cure_Salee",
    ],
    ...tx({
      en: {
        name: "In-Gall Cure Salée",
        summary: "The great gathering of Tuareg and Wodaabe Fula herders, with camel races and the Gerewol.",
        description:
          "At the end of the rainy season, herders drive their animals to the salty pastures and springs of In-Gall. Since the 1990s the state has made it an official three-day festival: parades of camel riders, camel races, exhibitions of pastoral produce, music and dancing and, among the Wodaabe Fula, the Gerewol, a famous male beauty contest. After a two-year break, the 58th edition was held on 4–6 October 2025 and the 59th on 2–4 October 2026.",
        tips: tipsE("en", "Ask people's consent before any photo, especially during the Gerewol; nights can be cool."),
        where: "In-Gall, Agadez region",
        dateNote: "Late September or early October, depending on the end of the rainy season; dates are set each year by the government and announced a few weeks ahead.",
      },
      es: {
        name: "Cure Salée de In-Gall",
        summary: "La gran concentración de pastores tuaregs y peul wodaabe, con carreras de camellos y Gerewol.",
        description:
          "Al final de la estación de lluvias, los pastores conducen sus rebaños a los pastos y manantiales salados de In-Gall. Desde los años noventa, el Estado lo ha convertido en un festival oficial de tres días: desfiles de camelleros, carreras de camellos, exposición de productos pastorales, música y danzas y, entre los peul wodaabe, el Gerewol, célebre concurso de belleza masculina. Tras dos años de interrupción, la 58.ª edición se celebró del 4 al 6 de octubre de 2025 y la 59.ª del 2 al 4 de octubre de 2026.",
        tips: tipsE("es", "Pida el consentimiento de las personas antes de fotografiarlas, sobre todo durante el Gerewol; las noches pueden ser frescas."),
        where: "In-Gall, región de Agadez",
        dateNote: "Finales de septiembre o principios de octubre, según el final de la estación de lluvias; fechas fijadas cada año por el gobierno y anunciadas unas semanas antes.",
      },
      pt: {
        name: "Cure Salée de In-Gall",
        summary: "A grande concentração de pastores tuaregues e fulas wodaabe, com corridas de camelos e Gerewol.",
        description:
          "No fim da estação das chuvas, os pastores levam os rebanhos para as pastagens e nascentes salgadas de In-Gall. Desde os anos 1990, o Estado fez dela um festival oficial de três dias: desfiles de cameleiros, corridas de camelos, exposição de produtos pastoris, música e danças e, entre os fulas wodaabe, o Gerewol, célebre concurso de beleza masculina. Depois de dois anos de interrupção, a 58.ª edição decorreu de 4 a 6 de outubro de 2025 e a 59.ª de 2 a 4 de outubro de 2026.",
        tips: tipsE("pt", "Peça o consentimento das pessoas antes de qualquer fotografia, sobretudo durante o Gerewol; as noites podem ser frescas."),
        where: "In-Gall, região de Agadez",
        dateNote: "Finais de setembro ou início de outubro, conforme o fim da estação das chuvas; datas fixadas todos os anos pelo governo e anunciadas algumas semanas antes.",
      },
      ar: {
        name: "«الكور ساليه» في إن-غال",
        summary: "التجمّع الكبير لرعاة الطوارق والفولاني الوودابي، مع سباقات الإبل واحتفال الغيريول.",
        description:
          "في نهاية موسم الأمطار يقود الرعاة قطعانهم إلى المراعي والينابيع المالحة في إن-غال. ومنذ التسعينيات جعلت الدولة من ذلك مهرجانًا رسميًا يدوم ثلاثة أيام: استعراضات لراكبي الإبل، وسباقات للهجن، ومعرض للمنتجات الرعوية، وموسيقى ورقصات، وعند الفولاني الوودابي احتفال الغيريول، مسابقة الجمال الرجالي الشهيرة. وبعد انقطاع دام عامين، أُقيمت الدورة الثامنة والخمسون من 4 إلى 6 أكتوبر 2025، والتاسعة والخمسون من 2 إلى 4 أكتوبر 2026.",
        tips: tipsE("ar", "اطلبوا موافقة الأشخاص قبل أي تصوير، لا سيما أثناء الغيريول؛ وقد تكون الليالي باردة."),
        where: "إن-غال، منطقة أغاديز",
        dateNote: "أواخر سبتمبر أو أوائل أكتوبر بحسب نهاية موسم الأمطار؛ تحدّد الحكومة المواعيد كل عام وتعلنها قبل بضعة أسابيع.",
      },
    }),
  },

  // ───────────── Festivals ─────────────
  {
    slug: "festival-de-l-air-niger",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 12, to: 2 },
    caution: true,
    place: "iferouane",
    cover: "/images/voyage/fete-festival-de-l-air-niger",
    name: "Festival de l'Aïr",
    summary: "Le festival de la culture touarègue à Iférouane : défilés de chameaux, tendé, concours et artisanat.",
    description:
      "Organisé depuis 2001, le Festival de l'Aïr réunit à Iférouane les communautés nomades du massif autour de la culture touarègue. Au programme : parades de dromadaires et concours du plus beau chameau, chants et percussions du tendé, concours de beauté, marché d'artisanat et excursions vers les sites voisins. La 17e édition s'est tenue début décembre 2025, sous l'égide du ministère du Tourisme et de l'Artisanat, avec des délégations du Tchad et du Burkina Faso.",
    tips: tipsE("fr", "Les dates changent d'une édition à l'autre ; nuits froides en saison fraîche, prévoyez des vêtements chauds."),
    where: "Iférouane, région d'Agadez",
    dateNote:
      "Pas de date fixe : les éditions récentes ont eu lieu entre décembre et février (début décembre en 2025). Dates annoncées par le ministère du Tourisme quelques semaines avant.",
    sources: [
      "https://voyagesafriq.com/2025/12/08/tuareg-heritage-takes-center-stage-as-the-17th-air-festival-wraps-in-iferouane/",
      "https://voyagesafriq.com/2025/11/20/niger-to-host-the-seventeenth-edition-of-the-festival-of-air-in-december/",
      "https://sahelien.com/en/air-festival-a-melting-pot-of-culture-in-northern-niger/",
    ],
    ...tx({
      en: {
        name: "Aïr Festival",
        summary: "The festival of Tuareg culture in Iférouane: camel parades, tende music, contests and crafts.",
        description:
          "Held since 2001, the Aïr Festival brings the massif's nomadic communities together in Iférouane around Tuareg culture. On the programme: camel parades and a most-beautiful-camel contest, tende songs and drumming, beauty contests, a crafts market and excursions to nearby sites. The 17th edition was held in early December 2025 under the Ministry of Tourism and Crafts, with delegations from Chad and Burkina Faso.",
        tips: tipsE("en", "Dates change from one edition to the next; nights are cold in the cool season, so bring warm clothes."),
        where: "Iférouane, Agadez region",
        dateNote: "No fixed date: recent editions took place between December and February (early December in 2025). Dates are announced by the Ministry of Tourism a few weeks ahead.",
      },
      es: {
        name: "Festival del Aïr",
        summary: "El festival de la cultura tuareg en Iférouane: desfiles de camellos, tendé, concursos y artesanía.",
        description:
          "Organizado desde 2001, el Festival del Aïr reúne en Iférouane a las comunidades nómadas del macizo en torno a la cultura tuareg. En el programa: desfiles de dromedarios y concurso del camello más bello, cantos y percusiones del tendé, concursos de belleza, mercado de artesanía y excursiones a los sitios cercanos. La 17.ª edición se celebró a principios de diciembre de 2025, bajo los auspicios del ministerio de Turismo y Artesanía, con delegaciones de Chad y Burkina Faso.",
        tips: tipsE("es", "Las fechas cambian de una edición a otra; noches frías en la estación fresca, lleve ropa de abrigo."),
        where: "Iférouane, región de Agadez",
        dateNote: "Sin fecha fija: las ediciones recientes se celebraron entre diciembre y febrero (principios de diciembre en 2025). El ministerio de Turismo anuncia las fechas unas semanas antes.",
      },
      pt: {
        name: "Festival do Aïr",
        summary: "O festival da cultura tuaregue em Iférouane: desfiles de camelos, tendé, concursos e artesanato.",
        description:
          "Organizado desde 2001, o Festival do Aïr reúne em Iférouane as comunidades nómadas do maciço em torno da cultura tuaregue. No programa: desfiles de dromedários e concurso do camelo mais belo, cânticos e percussões do tendé, concursos de beleza, mercado de artesanato e excursões aos sítios vizinhos. A 17.ª edição decorreu no início de dezembro de 2025, sob a égide do ministério do Turismo e do Artesanato, com delegações do Chade e do Burkina Faso.",
        tips: tipsE("pt", "As datas mudam de uma edição para outra; noites frias na estação fresca, leve roupa quente."),
        where: "Iférouane, região de Agadez",
        dateNote: "Sem data fixa: as edições recentes decorreram entre dezembro e fevereiro (início de dezembro em 2025). As datas são anunciadas pelo ministério do Turismo algumas semanas antes.",
      },
      ar: {
        name: "مهرجان آيير",
        summary: "مهرجان الثقافة الطوارقية في إيفروان: استعراضات الإبل وموسيقى التِندي والمسابقات والحِرف.",
        description:
          "يُنظَّم مهرجان آيير منذ عام 2001، ويجمع في إيفروان المجتمعات الرحّالة في الكتلة الجبلية حول الثقافة الطوارقية. وفي البرنامج: استعراضات للإبل ومسابقة أجمل جمل، وأغاني التِندي وإيقاعاته، ومسابقات للجمال، وسوق للحِرف، ورحلات إلى المواقع المجاورة. وأُقيمت الدورة السابعة عشرة في أوائل ديسمبر 2025 تحت إشراف وزارة السياحة والصناعة التقليدية، بمشاركة وفود من تشاد وبوركينا فاسو.",
        tips: tipsE("ar", "تتغيّر المواعيد من دورة إلى أخرى؛ والليالي باردة في الموسم البارد، فاحملوا ملابس دافئة."),
        where: "إيفروان، منطقة أغاديز",
        dateNote: "لا موعد ثابتًا: أُقيمت الدورات الأخيرة بين ديسمبر وفبراير (أوائل ديسمبر في 2025). وتعلن وزارة السياحة المواعيد قبل بضعة أسابيع.",
      },
    }),
  },
  {
    slug: "sabre-national-lutte-niger",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 12, to: 1 },
    caution: true,
    cover: "/images/voyage/fete-sabre-national-lutte-niger",
    name: "Sabre national de lutte traditionnelle",
    summary: "Le championnat national de lutte, sport roi du Niger, qui couronne chaque année le « roi des arènes ».",
    description:
      "La lutte traditionnelle est le sport le plus populaire du Niger. Chaque année, les lutteurs des régions s'affrontent pendant une dizaine de jours dans une arène pleine à craquer, au son des tambours et des griots, pour remporter le Sabre national ; le championnat, aussi appelé Kokowa, se tient à tour de rôle dans une ville différente. La 45e édition a eu lieu à Dosso en décembre 2024, la 46e à Tahoua du 19 au 28 décembre 2025.",
    tips: tipsE("fr", "Ambiance de stade très festive ; arrivez tôt pour les finales, souvent prises d'assaut."),
    where: "Ville différente chaque année (Dosso en 2024, Tahoua en 2025)",
    dateNote:
      "Généralement en décembre, parfois jusqu'au début janvier ; la ville hôte et les dates sont fixées chaque année par les autorités sportives.",
    sources: [
      "https://anp.ne/finale-de-la-46eme-edition-du-sabre-national-noura-hassane-de-tahoua-sacre-champion/",
      "https://www.lesahel.org/46e-edition-du-sabre-national-kokowa-a-tahoua-noura-hassan-de-tahoua-remporte-son-premier-sabre/",
      "https://www.sidwaya.info/45e-edition-du-sabre-national-du-niger-le-premier-ministre-jean-emmanuel-ouedraogo-assiste-a-la-finale/",
    ],
    ...tx({
      en: {
        name: "National Traditional Wrestling Sabre",
        summary: "The national wrestling championship, Niger's favourite sport, which crowns the \"king of the arena\" each year.",
        description:
          "Traditional wrestling is Niger's most popular sport. Every year, wrestlers from the regions compete for about ten days in a packed arena, to the sound of drums and griots, to win the National Sabre; the championship, also called Kokowa, moves to a different town each time. The 45th edition was held in Dosso in December 2024 and the 46th in Tahoua on 19–28 December 2025.",
        tips: tipsE("en", "A very festive stadium atmosphere; arrive early for the finals, which are always packed."),
        where: "A different town each year (Dosso in 2024, Tahoua in 2025)",
        dateNote: "Usually in December, sometimes into early January; the host town and dates are set each year by the sports authorities.",
      },
      es: {
        name: "Sable nacional de lucha tradicional",
        summary: "El campeonato nacional de lucha, deporte rey de Níger, que corona cada año al «rey de las arenas».",
        description:
          "La lucha tradicional es el deporte más popular de Níger. Cada año, los luchadores de las regiones se enfrentan durante una decena de días en una arena abarrotada, al son de tambores y griots, para ganar el Sable nacional; el campeonato, también llamado Kokowa, cambia de ciudad cada vez. La 45.ª edición tuvo lugar en Dosso en diciembre de 2024 y la 46.ª en Tahoua del 19 al 28 de diciembre de 2025.",
        tips: tipsE("es", "Ambiente de estadio muy festivo; llegue pronto a las finales, siempre abarrotadas."),
        where: "Una ciudad distinta cada año (Dosso en 2024, Tahoua en 2025)",
        dateNote: "Generalmente en diciembre, a veces hasta principios de enero; las autoridades deportivas fijan cada año la ciudad anfitriona y las fechas.",
      },
      pt: {
        name: "Sabre nacional de luta tradicional",
        summary: "O campeonato nacional de luta, desporto-rei do Níger, que coroa todos os anos o «rei das arenas».",
        description:
          "A luta tradicional é o desporto mais popular do Níger. Todos os anos, os lutadores das regiões defrontam-se durante cerca de dez dias numa arena cheia, ao som de tambores e griôs, para conquistar o Sabre nacional; o campeonato, também chamado Kokowa, muda de cidade a cada edição. A 45.ª edição decorreu em Dosso em dezembro de 2024 e a 46.ª em Tahoua de 19 a 28 de dezembro de 2025.",
        tips: tipsE("pt", "Ambiente de estádio muito festivo; chegue cedo às finais, sempre lotadas."),
        where: "Uma cidade diferente todos os anos (Dosso em 2024, Tahoua em 2025)",
        dateNote: "Geralmente em dezembro, por vezes até ao início de janeiro; a cidade anfitriã e as datas são fixadas todos os anos pelas autoridades desportivas.",
      },
      ar: {
        name: "السيف الوطني للمصارعة التقليدية",
        summary: "البطولة الوطنية للمصارعة، الرياضة الأولى في النيجر، التي تتوّج كل عام «ملك الحلبات».",
        description:
          "المصارعة التقليدية أكثر الرياضات شعبية في النيجر. وكل عام يتنافس مصارعو المناطق نحو عشرة أيام في حلبة مكتظّة، على إيقاع الطبول والمدّاحين (الغريو)، للفوز بالسيف الوطني؛ وتنتقل البطولة، المعروفة أيضًا باسم «كوكوا»، إلى مدينة مختلفة في كل دورة. وقد جرت الدورة الخامسة والأربعون في دوسو في ديسمبر 2024، والسادسة والأربعون في تاهوا من 19 إلى 28 ديسمبر 2025.",
        tips: tipsE("ar", "أجواء ملاعب احتفالية جدًا؛ احضروا مبكرًا إلى المباريات النهائية التي تكتظّ دائمًا."),
        where: "مدينة مختلفة كل عام (دوسو في 2024، تاهوا في 2025)",
        dateNote: "عادةً في ديسمبر، وأحيانًا حتى أوائل يناير؛ وتحدّد السلطات الرياضية المدينة المضيفة والمواعيد كل عام.",
      },
    }),
  },
  {
    slug: "fimauf-niamey",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 5, to: 5 },
    caution: true,
    destination: "niamey",
    name: "FIMAUF – Festival international des musiques afro-urbaines du fleuve Niger",
    summary: "Trois jours de concerts afro-urbains au bord du fleuve à Niamey, avec conférences et caravane de sensibilisation.",
    description:
      "Porté par le label nigérien Muzikina Records, le FIMAUF réunit à Niamey des artistes des musiques afro-urbaines sur les berges du fleuve Niger, notamment la corniche de Yantala. Concerts, formations, conférence-débat, caravane de sensibilisation et balade à vélo composent le programme. Après une 3e édition en 2025, la 4e s'est tenue du 29 au 31 mai 2026.",
    tips: tipsE("fr", "Programme et lieux annoncés par les organisateurs quelques semaines avant ; concerts en soirée, quand la chaleur retombe."),
    where: "Niamey, berges du fleuve Niger",
    dateNote: "Fin mai en 2026 ; les dates de chaque édition sont annoncées par les organisateurs (à vérifier d'une année sur l'autre).",
    sources: [
      "https://planeteafrique.com/Niger/Index.asp?affiche=News_Display.asp&articleid=15783&rub=Actualites",
      "https://fofomag.org/news_print.asp?pcmd=articleprint&articleid=2241",
    ],
    ...tx({
      en: {
        name: "FIMAUF – International Festival of Afro-Urban Music of the Niger River",
        summary: "Three days of Afro-urban concerts by the river in Niamey, with talks and an awareness caravan.",
        description:
          "Run by the Nigerien label Muzikina Records, FIMAUF brings Afro-urban music artists together in Niamey on the banks of the Niger River, including the Yantala corniche. Concerts, workshops, a debate, an awareness caravan and a bike ride make up the programme. After a 3rd edition in 2025, the 4th was held on 29–31 May 2026.",
        tips: tipsE("en", "Programme and venues are announced by the organisers a few weeks ahead; concerts are in the evening, when the heat eases."),
        where: "Niamey, banks of the Niger River",
        dateNote: "Late May in 2026; the dates of each edition are announced by the organisers (check from year to year).",
      },
      es: {
        name: "FIMAUF – Festival internacional de músicas afrourbanas del río Níger",
        summary: "Tres días de conciertos afrourbanos a orillas del río en Niamey, con conferencias y caravana de sensibilización.",
        description:
          "Impulsado por el sello nigerino Muzikina Records, el FIMAUF reúne en Niamey a artistas de músicas afrourbanas a orillas del río Níger, en particular en el paseo de Yantala. Conciertos, talleres, una conferencia-debate, una caravana de sensibilización y un paseo en bicicleta componen el programa. Tras una 3.ª edición en 2025, la 4.ª se celebró del 29 al 31 de mayo de 2026.",
        tips: tipsE("es", "Los organizadores anuncian el programa y los lugares unas semanas antes; conciertos por la noche, cuando baja el calor."),
        where: "Niamey, orillas del río Níger",
        dateNote: "Finales de mayo en 2026; los organizadores anuncian las fechas de cada edición (compruébelas cada año).",
      },
      pt: {
        name: "FIMAUF – Festival internacional das músicas afro-urbanas do rio Níger",
        summary: "Três dias de concertos afro-urbanos à beira do rio em Niamey, com conferências e caravana de sensibilização.",
        description:
          "Promovido pela editora nigerina Muzikina Records, o FIMAUF reúne em Niamey artistas das músicas afro-urbanas nas margens do rio Níger, nomeadamente na marginal de Yantala. Concertos, formações, uma conferência-debate, uma caravana de sensibilização e um passeio de bicicleta compõem o programa. Depois de uma 3.ª edição em 2025, a 4.ª decorreu de 29 a 31 de maio de 2026.",
        tips: tipsE("pt", "Programa e locais anunciados pelos organizadores algumas semanas antes; concertos ao fim do dia, quando o calor abranda."),
        where: "Niamey, margens do rio Níger",
        dateNote: "Fim de maio em 2026; as datas de cada edição são anunciadas pelos organizadores (confirme de ano para ano).",
      },
      ar: {
        name: "FIMAUF – المهرجان الدولي للموسيقى الأفرو-حضرية لنهر النيجر",
        summary: "ثلاثة أيام من الحفلات الأفرو-حضرية على ضفاف النهر في نيامي، مع ندوات وقافلة توعية.",
        description:
          "تنظّم شركة الإنتاج النيجرية «موزيكينا ريكوردز» مهرجان FIMAUF الذي يجمع في نيامي فناني الموسيقى الأفرو-حضرية على ضفاف نهر النيجر، ولا سيما كورنيش يانتالا. ويتضمّن البرنامج حفلات وورش تدريب وندوة نقاش وقافلة توعية وجولة بالدراجات. وبعد دورة ثالثة في 2025، أُقيمت الدورة الرابعة من 29 إلى 31 مايو 2026.",
        tips: tipsE("ar", "يعلن المنظّمون البرنامج والأماكن قبل بضعة أسابيع؛ والحفلات مساءً حين تخفّ الحرارة."),
        where: "نيامي، ضفاف نهر النيجر",
        dateNote: "أواخر مايو في 2026؛ يعلن المنظّمون مواعيد كل دورة (تحقّقوا منها كل عام).",
      },
    }),
  },
];
