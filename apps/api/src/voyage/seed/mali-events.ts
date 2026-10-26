/**
 * Fêtes, jours fériés, festivals et temps forts saisonniers (mali).
 * Voir SeedEvent (./types). Contenu non relu : `reviewed = false`.
 *
 * Jours fériés : loi n° 05-040 du 22 juillet 2005 relative aux fêtes légales en
 * République du Mali ; chaque fête est confirmée par un communiqué du ministère
 * du Travail, de la Fonction publique et du Dialogue social (dates des fêtes
 * musulmanes fixées après observation de la lune). Tout le pays étant
 * formellement déconseillé (France Diplomatie, FCDO), tous les événements ont
 * `caution: true`.
 */

import type { SeedEvent } from "./types";

const LOI = "https://bamada.net/22-septembre-2026-la-fete-de-lindependance-du-mali-declaree-chomee-et-payee-sur-toute-letendue-du-territoire-national";
const OFFICE = "https://www.officeholidays.com/countries/mali/2026";
const WIKI = "https://en.wikipedia.org/wiki/Public_holidays_in_Mali";

export const MALI_EVENTS: SeedEvent[] = [
  {
    slug: "jour-de-l-an-mali",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 1, day: 1 },
    caution: true,
    name: "Jour de l'an",
    summary: "Premier jour de l'année civile, férié dans tout le pays.",
    description:
      "Le 1er janvier est un jour férié chômé et payé au Mali, prévu par la loi de 2005 sur les fêtes légales. La nuit de la Saint-Sylvestre se fête surtout en ville, en famille ou entre amis, et la journée est consacrée aux visites et aux vœux. Administrations, banques et la plupart des bureaux sont fermés.",
    tips: "Administrations et banques fermées : anticipez vos démarches et retraits d'espèces.",
    where: "Dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "New Year's Day",
      summary: "The first day of the calendar year, a public holiday nationwide.",
      description:
        "1 January is a paid public holiday in Mali, provided for by the 2005 law on public holidays. New Year's Eve is celebrated mainly in towns, with family or friends, and the day itself is given over to visits and good wishes. Government offices, banks and most businesses are closed.",
      tips: "Government offices and banks are closed: plan paperwork and cash withdrawals ahead.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Año Nuevo",
        summary: "Primer día del año civil, festivo en todo el país.",
        description:
          "El 1 de enero es un día festivo remunerado en Malí, previsto por la ley de 2005 sobre las fiestas legales. La Nochevieja se celebra sobre todo en las ciudades, en familia o con amigos, y el día se dedica a las visitas y a los buenos deseos. La administración, los bancos y la mayoría de las oficinas cierran.",
        tips: "Administración y bancos cerrados: adelante sus trámites y retiradas de efectivo.",
        where: "En todo el país",
      },
      pt: {
        name: "Dia de Ano Novo",
        summary: "Primeiro dia do ano civil, feriado em todo o país.",
        description:
          "O dia 1 de janeiro é feriado remunerado no Mali, previsto pela lei de 2005 sobre as festas legais. A passagem de ano festeja-se sobretudo nas cidades, em família ou com amigos, e o dia é dedicado às visitas e aos votos de boas festas. Serviços públicos, bancos e a maioria dos escritórios estão fechados.",
        tips: "Serviços públicos e bancos fechados: antecipe as suas diligências e levantamentos de dinheiro.",
        where: "Em todo o país",
      },
      ar: {
        name: "رأس السنة الميلادية",
        summary: "أول أيام السنة الميلادية، عطلة رسمية في جميع أنحاء البلاد.",
        description:
          "الأول من يناير عطلة رسمية مدفوعة الأجر في مالي، ينص عليها قانون 2005 بشأن الأعياد الرسمية. يُحتفل بليلة رأس السنة خصوصًا في المدن، مع العائلة أو الأصدقاء، ويُخصَّص اليوم للزيارات وتبادل التهاني. وتُغلق الإدارات والمصارف ومعظم المكاتب.",
        tips: "الإدارات والمصارف مغلقة: أنجز معاملاتك وسحب النقود مسبقًا.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "souverainete-retrouvee-mali",
    kind: "NATIONAL",
    publicHoliday: false,
    rule: { type: "fixed", month: 1, day: 14 },
    caution: true,
    destination: "bamako",
    name: "Journée nationale de la souveraineté retrouvée",
    summary: "Commémoration de la grande mobilisation du 14 janvier 2022 contre les sanctions de la CEDEAO et de l'UEMOA.",
    description:
      "Le 14 janvier 2022, des foules se sont rassemblées à Bamako et dans tout le pays pour protester contre les sanctions imposées au Mali par la CEDEAO et l'UEMOA. Les autorités de transition en ont fait une journée nationale, déclarée chômée et payée lors du Conseil des ministres du 11 janvier 2023. Chaque année, rassemblements patriotiques, défilés et levers de drapeau sont organisés, avec une grande cérémonie à Bamako (au stade Mamadou-Konaté en 2026) et des manifestations dans les régions.",
    tips: "Rassemblements très fréquentés et forte présence des forces de sécurité : évitez les foules et les sujets politiques.",
    where: "Bamako et dans tout le pays",
    dateNote:
      "Chaque 14 janvier. Déclarée chômée et payée en 2023 ; elle ne figure pas dans la loi de 2005 sur les fêtes légales : vérifiez chaque année le communiqué officiel pour savoir si la journée est chômée.",
    sources: [
      "https://burkina24.com/?p=311973",
      "https://www.sidwaya.info/journee-nationale-de-la-souverainete-retrouvee-du-mali-la-fibre-patriotique-reste-intacte/",
    ],
    en: {
      name: "National Day of Regained Sovereignty",
      summary: "Commemorates the mass mobilisation of 14 January 2022 against ECOWAS and WAEMU sanctions.",
      description:
        "On 14 January 2022, crowds gathered in Bamako and across the country to protest against the sanctions imposed on Mali by ECOWAS and WAEMU. The transitional authorities made it a national day, declared a paid day off at the Council of Ministers of 11 January 2023. Every year there are patriotic rallies, parades and flag-raisings, with a large ceremony in Bamako (at the Mamadou-Konaté stadium in 2026) and events in the regions.",
      tips: "Rallies draw big crowds and a heavy security presence: avoid crowds and political topics.",
      where: "Bamako and nationwide",
      dateNote:
        "Every 14 January. Declared a paid day off in 2023; it is not in the 2005 public holidays law: check the official announcement each year to see whether it is a day off.",
    },
    i18n: {
      es: {
        name: "Jornada Nacional de la Soberanía Recuperada",
        summary: "Conmemora la gran movilización del 14 de enero de 2022 contra las sanciones de la CEDEAO y la UEMOA.",
        description:
          "El 14 de enero de 2022, multitudes se concentraron en Bamako y en todo el país para protestar contra las sanciones impuestas a Malí por la CEDEAO y la UEMOA. Las autoridades de transición la convirtieron en jornada nacional, declarada no laborable y remunerada en el Consejo de Ministros del 11 de enero de 2023. Cada año se organizan concentraciones patrióticas, desfiles e izadas de bandera, con una gran ceremonia en Bamako (en el estadio Mamadou-Konaté en 2026) y actos en las regiones.",
        tips: "Concentraciones muy concurridas y fuerte presencia de las fuerzas de seguridad: evite las multitudes y los temas políticos.",
        where: "Bamako y todo el país",
        dateNote:
          "Cada 14 de enero. Declarada no laborable y remunerada en 2023; no figura en la ley de 2005 sobre las fiestas legales: compruebe cada año el comunicado oficial para saber si es festiva.",
      },
      pt: {
        name: "Dia Nacional da Soberania Recuperada",
        summary: "Comemora a grande mobilização de 14 de janeiro de 2022 contra as sanções da CEDEAO e da UEMOA.",
        description:
          "Em 14 de janeiro de 2022, multidões juntaram-se em Bamako e em todo o país para protestar contra as sanções impostas ao Mali pela CEDEAO e pela UEMOA. As autoridades de transição fizeram dele um dia nacional, declarado feriado remunerado no Conselho de Ministros de 11 de janeiro de 2023. Todos os anos há concentrações patrióticas, desfiles e hastear de bandeira, com uma grande cerimónia em Bamako (no estádio Mamadou-Konaté em 2026) e eventos nas regiões.",
        tips: "Concentrações muito concorridas e forte presença das forças de segurança: evite multidões e temas políticos.",
        where: "Bamako e todo o país",
        dateNote:
          "Todos os anos a 14 de janeiro. Declarado feriado remunerado em 2023; não consta da lei de 2005 sobre as festas legais: confirme todos os anos no comunicado oficial se o dia é feriado.",
      },
      ar: {
        name: "اليوم الوطني للسيادة المستعادة",
        summary: "إحياء ذكرى التعبئة الكبرى في 14 يناير 2022 ضد عقوبات إيكواس والاتحاد الاقتصادي والنقدي لغرب أفريقيا.",
        description:
          "في 14 يناير 2022، احتشدت جموع في باماكو وفي أنحاء البلاد احتجاجًا على العقوبات التي فرضتها إيكواس والاتحاد الاقتصادي والنقدي لغرب أفريقيا على مالي. وجعلت السلطات الانتقالية من هذا التاريخ يومًا وطنيًا أُعلن عطلة مدفوعة الأجر في مجلس الوزراء المنعقد في 11 يناير 2023. وتُنظَّم كل عام تجمعات وطنية واستعراضات ومراسم رفع العلم، مع احتفال كبير في باماكو (في ملعب مامادو كوناتيه عام 2026) وفعاليات في المناطق.",
        tips: "تجمعات حاشدة وحضور أمني كثيف: تجنّب الحشود والمواضيع السياسية.",
        where: "باماكو وجميع أنحاء البلاد",
        dateNote:
          "في 14 يناير من كل عام. أُعلن عطلة مدفوعة الأجر عام 2023، ولا يرد في قانون 2005 بشأن الأعياد الرسمية: تحقّق كل عام من البلاغ الرسمي لمعرفة ما إذا كان يوم عطلة.",
      },
    },
  },
  {
    slug: "fete-de-l-armee-mali",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 1, day: 20 },
    caution: true,
    destination: "bamako",
    name: "Fête de l'Armée",
    summary: "Journée des forces armées maliennes, fériée le 20 janvier.",
    description:
      "Le 20 janvier célèbre les forces armées et de sécurité du Mali. Cérémonies officielles, prises d'armes et dépôts de gerbes ont lieu à Bamako et dans les garnisons. La journée est fériée, chômée et payée selon la loi de 2005 sur les fêtes légales.",
    tips: "Ne photographiez ni militaires, ni installations, ni cérémonies officielles.",
    where: "Bamako et dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Armed Forces Day",
      summary: "Day of the Malian armed forces, a public holiday on 20 January.",
      description:
        "20 January celebrates Mali's armed and security forces. Official ceremonies, military parades and wreath-layings take place in Bamako and in garrison towns. It is a paid public holiday under the 2005 law on public holidays.",
      tips: "Do not photograph soldiers, military installations or official ceremonies.",
      where: "Bamako and nationwide",
    },
    i18n: {
      es: {
        name: "Día del Ejército",
        summary: "Jornada de las fuerzas armadas malienses, festiva el 20 de enero.",
        description:
          "El 20 de enero se celebra a las fuerzas armadas y de seguridad de Malí. Se celebran ceremonias oficiales, revistas militares y ofrendas florales en Bamako y en las guarniciones. Es un día festivo remunerado según la ley de 2005 sobre las fiestas legales.",
        tips: "No fotografíe a militares, instalaciones ni ceremonias oficiales.",
        where: "Bamako y todo el país",
      },
      pt: {
        name: "Dia do Exército",
        summary: "Dia das forças armadas malianas, feriado a 20 de janeiro.",
        description:
          "O dia 20 de janeiro celebra as forças armadas e de segurança do Mali. Realizam-se cerimónias oficiais, paradas militares e deposições de coroas de flores em Bamako e nas guarnições. É feriado remunerado nos termos da lei de 2005 sobre as festas legais.",
        tips: "Não fotografe militares, instalações nem cerimónias oficiais.",
        where: "Bamako e todo o país",
      },
      ar: {
        name: "عيد الجيش",
        summary: "يوم القوات المسلحة المالية، عطلة رسمية في 20 يناير.",
        description:
          "يُحتفى في 20 يناير بالقوات المسلحة وقوات الأمن في مالي. وتُقام مراسم رسمية واستعراضات عسكرية ووضع أكاليل الزهور في باماكو وفي الحاميات. وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005 بشأن الأعياد الرسمية.",
        tips: "لا تصوّر العسكريين أو المنشآت أو المراسم الرسمية.",
        where: "باماكو وجميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "journee-des-martyrs-mali",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 3, day: 26 },
    caution: true,
    destination: "bamako",
    name: "Journée des Martyrs",
    summary: "Hommage aux victimes des événements de mars 1991, qui ouvrirent la voie au multipartisme.",
    description:
      "Le 26 mars rend hommage aux manifestants tués lors du soulèvement populaire de mars 1991 à Bamako, qui aboutit à la chute du régime de Moussa Traoré et à l'instauration du multipartisme ; on l'appelle aussi « fête de la Démocratie ». Dépôts de gerbes, recueillement et cérémonies officielles marquent la journée, fériée selon la loi de 2005.",
    tips: "Journée de recueillement : restez discret près des monuments et des cérémonies.",
    where: "Bamako et dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Martyrs' Day",
      summary: "Tribute to the victims of the March 1991 events, which paved the way for multiparty politics.",
      description:
        "26 March honours the demonstrators killed during the popular uprising of March 1991 in Bamako, which brought down Moussa Traoré's regime and led to multiparty democracy; it is also called “Democracy Day”. Wreath-layings, remembrance and official ceremonies mark the day, a public holiday under the 2005 law.",
      tips: "A day of remembrance: be discreet near monuments and ceremonies.",
      where: "Bamako and nationwide",
    },
    i18n: {
      es: {
        name: "Día de los Mártires",
        summary: "Homenaje a las víctimas de los sucesos de marzo de 1991, que abrieron el camino al multipartidismo.",
        description:
          "El 26 de marzo rinde homenaje a los manifestantes muertos durante el levantamiento popular de marzo de 1991 en Bamako, que provocó la caída del régimen de Moussa Traoré y la instauración del multipartidismo; también se le llama «fiesta de la Democracia». Ofrendas florales, recogimiento y ceremonias oficiales marcan la jornada, festiva según la ley de 2005.",
        tips: "Jornada de recogimiento: sea discreto cerca de los monumentos y las ceremonias.",
        where: "Bamako y todo el país",
      },
      pt: {
        name: "Dia dos Mártires",
        summary: "Homenagem às vítimas dos acontecimentos de março de 1991, que abriram caminho ao multipartidarismo.",
        description:
          "O dia 26 de março homenageia os manifestantes mortos durante a revolta popular de março de 1991 em Bamako, que levou à queda do regime de Moussa Traoré e à instauração do multipartidarismo; é também chamado «festa da Democracia». Deposições de coroas de flores, recolhimento e cerimónias oficiais marcam o dia, feriado nos termos da lei de 2005.",
        tips: "Dia de recolhimento: seja discreto perto dos monumentos e das cerimónias.",
        where: "Bamako e todo o país",
      },
      ar: {
        name: "يوم الشهداء",
        summary: "تكريم ضحايا أحداث مارس 1991 التي مهدت الطريق للتعددية الحزبية.",
        description:
          "يُكرَّم في 26 مارس المتظاهرون الذين قُتلوا خلال الانتفاضة الشعبية في مارس 1991 في باماكو، التي أفضت إلى سقوط نظام موسى تراوري وإرساء التعددية الحزبية، ويُسمّى أيضًا «عيد الديمقراطية». ويتخلل اليوم وضع أكاليل الزهور والوقوف دقائق صمت ومراسم رسمية، وهو عطلة رسمية بموجب قانون 2005.",
        tips: "يوم للذكرى والخشوع: التزم الهدوء قرب النصب التذكارية والمراسم.",
        where: "باماكو وجميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "lundi-de-paques-mali",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 1 },
    caution: true,
    place: "cathedrale-sacre-coeur-bamako",
    name: "Lundi de Pâques",
    summary: "Lendemain de Pâques, seul jour férié lié à Pâques au Mali.",
    description:
      "Les chrétiens du Mali, minoritaires dans un pays très majoritairement musulman, célèbrent Pâques par des offices dans les églises, notamment à la cathédrale du Sacré-Cœur de Bamako, et par des repas en famille. Le lundi de Pâques est férié, chômé et payé selon la loi de 2005 ; le vendredi saint et l'Ascension ne le sont pas.",
    tips: "Offices très suivis le dimanche : tenue correcte, et demandez avant de photographier.",
    where: "Dans tout le pays",
    dateNote: "Lendemain du dimanche de Pâques (calendrier grégorien).",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Easter Monday",
      summary: "The day after Easter, the only Easter-related public holiday in Mali.",
      description:
        "Mali's Christians, a minority in an overwhelmingly Muslim country, celebrate Easter with church services, notably at the Sacred Heart Cathedral in Bamako, and family meals. Easter Monday is a paid public holiday under the 2005 law; Good Friday and Ascension Day are not.",
      tips: "Sunday services are very well attended: dress appropriately and ask before taking photos.",
      where: "Nationwide",
      dateNote: "The day after Easter Sunday (Gregorian calendar).",
    },
    i18n: {
      es: {
        name: "Lunes de Pascua",
        summary: "Día siguiente a Pascua, único festivo vinculado a la Pascua en Malí.",
        description:
          "Los cristianos de Malí, minoritarios en un país mayoritariamente musulmán, celebran la Pascua con oficios en las iglesias, sobre todo en la catedral del Sagrado Corazón de Bamako, y con comidas familiares. El lunes de Pascua es festivo remunerado según la ley de 2005; el Viernes Santo y la Ascensión no lo son.",
        tips: "Oficios muy concurridos el domingo: vestimenta adecuada y pida permiso antes de hacer fotos.",
        where: "En todo el país",
        dateNote: "Día siguiente al domingo de Pascua (calendario gregoriano).",
      },
      pt: {
        name: "Segunda-feira de Páscoa",
        summary: "Dia seguinte à Páscoa, único feriado ligado à Páscoa no Mali.",
        description:
          "Os cristãos do Mali, minoritários num país maioritariamente muçulmano, celebram a Páscoa com celebrações nas igrejas, nomeadamente na catedral do Sagrado Coração de Bamako, e com refeições em família. A segunda-feira de Páscoa é feriado remunerado nos termos da lei de 2005; a Sexta-feira Santa e a Ascensão não o são.",
        tips: "Celebrações muito concorridas ao domingo: vestuário adequado e peça autorização antes de fotografar.",
        where: "Em todo o país",
        dateNote: "Dia seguinte ao domingo de Páscoa (calendário gregoriano).",
      },
      ar: {
        name: "اثنين الفصح",
        summary: "اليوم التالي لعيد الفصح، العطلة الوحيدة المرتبطة بالفصح في مالي.",
        description:
          "يحتفل مسيحيو مالي، وهم أقلية في بلد غالبيته العظمى من المسلمين، بعيد الفصح بقداديس في الكنائس، لا سيما في كاتدرائية القلب الأقدس في باماكو، وبوجبات عائلية. واثنين الفصح عطلة رسمية مدفوعة الأجر بموجب قانون 2005، أما الجمعة العظيمة وعيد الصعود فليسا كذلك.",
        tips: "قداديس يوم الأحد مكتظة: ارتدِ لباسًا لائقًا واستأذن قبل التصوير.",
        where: "في جميع أنحاء البلاد",
        dateNote: "اليوم التالي لأحد الفصح (التقويم الغريغوري).",
      },
    },
  },
  {
    slug: "fete-du-travail-mali",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 1 },
    caution: true,
    name: "Fête du Travail",
    summary: "Journée internationale des travailleurs, fériée le 1er mai.",
    description:
      "Le 1er mai, les centrales syndicales organisent défilés et rassemblements, notamment à Bamako, et remettent leurs cahiers de doléances aux autorités. La journée est fériée, chômée et payée selon la loi de 2005 sur les fêtes légales.",
    tips: "Défilés en centre-ville : prévoyez des perturbations de la circulation.",
    where: "Dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Labour Day",
      summary: "International Workers' Day, a public holiday on 1 May.",
      description:
        "On 1 May the trade union federations hold marches and rallies, notably in Bamako, and present their demands to the authorities. It is a paid public holiday under the 2005 law on public holidays.",
      tips: "Marches in town centres: expect traffic disruption.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Día del Trabajo",
        summary: "Día Internacional de los Trabajadores, festivo el 1 de mayo.",
        description:
          "El 1 de mayo, las centrales sindicales organizan desfiles y concentraciones, sobre todo en Bamako, y entregan sus reivindicaciones a las autoridades. Es un día festivo remunerado según la ley de 2005 sobre las fiestas legales.",
        tips: "Desfiles en el centro: prevea alteraciones del tráfico.",
        where: "En todo el país",
      },
      pt: {
        name: "Dia do Trabalhador",
        summary: "Dia Internacional do Trabalhador, feriado a 1 de maio.",
        description:
          "No 1.º de Maio, as centrais sindicais organizam desfiles e concentrações, nomeadamente em Bamako, e entregam as suas reivindicações às autoridades. É feriado remunerado nos termos da lei de 2005 sobre as festas legais.",
        tips: "Desfiles no centro: conte com perturbações no trânsito.",
        where: "Em todo o país",
      },
      ar: {
        name: "عيد العمال",
        summary: "اليوم العالمي للعمال، عطلة رسمية في الأول من مايو.",
        description:
          "في الأول من مايو، تنظّم المركزيات النقابية مسيرات وتجمعات، لا سيما في باماكو، وتقدّم مطالبها إلى السلطات. وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005 بشأن الأعياد الرسمية.",
        tips: "مسيرات في وسط المدن: توقّع اضطرابًا في حركة المرور.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "journee-de-l-afrique-mali",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 25 },
    caution: true,
    name: "Journée de l'Afrique",
    summary: "Anniversaire de la création de l'Organisation de l'unité africaine, le 25 mai 1963.",
    description:
      "Le 25 mai commémore la fondation de l'Organisation de l'unité africaine (devenue Union africaine) à Addis-Abeba en 1963, dont le Mali de Modibo Keïta fut l'un des membres fondateurs. Conférences, activités culturelles et cérémonies officielles célèbrent l'unité africaine. La journée est fériée, chômée et payée selon la loi de 2005.",
    tips: "Administrations fermées ; quelques manifestations culturelles en ville.",
    where: "Dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Africa Day",
      summary: "Anniversary of the founding of the Organisation of African Unity on 25 May 1963.",
      description:
        "25 May commemorates the founding of the Organisation of African Unity (now the African Union) in Addis Ababa in 1963, of which Modibo Keïta's Mali was one of the founding members. Talks, cultural activities and official ceremonies celebrate African unity. It is a paid public holiday under the 2005 law.",
      tips: "Government offices are closed; a few cultural events in town.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Día de África",
        summary: "Aniversario de la creación de la Organización para la Unidad Africana, el 25 de mayo de 1963.",
        description:
          "El 25 de mayo conmemora la fundación de la Organización para la Unidad Africana (hoy Unión Africana) en Adís Abeba en 1963, de la que el Malí de Modibo Keïta fue uno de los miembros fundadores. Conferencias, actividades culturales y ceremonias oficiales celebran la unidad africana. Es un día festivo remunerado según la ley de 2005.",
        tips: "Administración cerrada; algunas actividades culturales en la ciudad.",
        where: "En todo el país",
      },
      pt: {
        name: "Dia de África",
        summary: "Aniversário da criação da Organização de Unidade Africana, a 25 de maio de 1963.",
        description:
          "O dia 25 de maio comemora a fundação da Organização de Unidade Africana (hoje União Africana) em Adis Abeba, em 1963, da qual o Mali de Modibo Keïta foi um dos membros fundadores. Conferências, atividades culturais e cerimónias oficiais celebram a unidade africana. É feriado remunerado nos termos da lei de 2005.",
        tips: "Serviços públicos fechados; algumas iniciativas culturais na cidade.",
        where: "Em todo o país",
      },
      ar: {
        name: "يوم أفريقيا",
        summary: "ذكرى تأسيس منظمة الوحدة الأفريقية في 25 مايو 1963.",
        description:
          "يُحيي يوم 25 مايو ذكرى تأسيس منظمة الوحدة الأفريقية (الاتحاد الأفريقي حاليًا) في أديس أبابا عام 1963، وكانت مالي في عهد موديبو كيتا من أعضائها المؤسسين. وتحتفي المحاضرات والأنشطة الثقافية والمراسم الرسمية بالوحدة الأفريقية. وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005.",
        tips: "الإدارات مغلقة، وبعض الفعاليات الثقافية في المدينة.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "fete-independance-mali",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 9, day: 22 },
    caution: true,
    destination: "bamako",
    name: "Fête de l'Indépendance",
    summary: "Fête nationale : proclamation de l'indépendance de la République du Mali le 22 septembre 1960.",
    description:
      "Le 22 septembre 1960, après l'éclatement de la Fédération du Mali avec le Sénégal, Modibo Keïta proclama à Bamako l'indépendance de la République du Mali. La fête nationale est marquée par des cérémonies officielles, des levers de couleurs, des défilés et des manifestations culturelles dans tout le pays. La journée est fériée, chômée et payée selon la loi de 2005 (communiqué du ministère du Travail chaque année).",
    tips: "Forte présence des forces de sécurité et routes parfois fermées à Bamako : ne photographiez pas les cérémonies officielles.",
    where: "Bamako et dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Independence Day",
      summary: "National day: proclamation of the independence of the Republic of Mali on 22 September 1960.",
      description:
        "On 22 September 1960, after the break-up of the Mali Federation with Senegal, Modibo Keïta proclaimed the independence of the Republic of Mali in Bamako. The national day is marked by official ceremonies, flag-raisings, parades and cultural events across the country. It is a paid public holiday under the 2005 law (announced each year by the Ministry of Labour).",
      tips: "Heavy security presence and some roads closed in Bamako: do not photograph official ceremonies.",
      where: "Bamako and nationwide",
    },
    i18n: {
      es: {
        name: "Día de la Independencia",
        summary: "Fiesta nacional: proclamación de la independencia de la República de Malí el 22 de septiembre de 1960.",
        description:
          "El 22 de septiembre de 1960, tras la ruptura de la Federación de Malí con Senegal, Modibo Keïta proclamó en Bamako la independencia de la República de Malí. La fiesta nacional se celebra con ceremonias oficiales, izadas de bandera, desfiles y actos culturales en todo el país. Es un día festivo remunerado según la ley de 2005 (comunicado del Ministerio de Trabajo cada año).",
        tips: "Fuerte presencia de las fuerzas de seguridad y calles a veces cortadas en Bamako: no fotografíe las ceremonias oficiales.",
        where: "Bamako y todo el país",
      },
      pt: {
        name: "Dia da Independência",
        summary: "Festa nacional: proclamação da independência da República do Mali a 22 de setembro de 1960.",
        description:
          "Em 22 de setembro de 1960, após a dissolução da Federação do Mali com o Senegal, Modibo Keïta proclamou em Bamako a independência da República do Mali. A festa nacional é marcada por cerimónias oficiais, hastear da bandeira, desfiles e eventos culturais em todo o país. É feriado remunerado nos termos da lei de 2005 (comunicado do Ministério do Trabalho todos os anos).",
        tips: "Forte presença das forças de segurança e estradas por vezes cortadas em Bamako: não fotografe as cerimónias oficiais.",
        where: "Bamako e todo o país",
      },
      ar: {
        name: "عيد الاستقلال",
        summary: "العيد الوطني: إعلان استقلال جمهورية مالي في 22 سبتمبر 1960.",
        description:
          "في 22 سبتمبر 1960، وبعد تفكك اتحاد مالي مع السنغال، أعلن موديبو كيتا في باماكو استقلال جمهورية مالي. ويُحتفل بالعيد الوطني بمراسم رسمية ورفع العلم واستعراضات وفعاليات ثقافية في أنحاء البلاد. وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005 (يصدر بلاغ وزارة العمل كل عام).",
        tips: "حضور أمني كثيف وطرق مغلقة أحيانًا في باماكو: لا تصوّر المراسم الرسمية.",
        where: "باماكو وجميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "noel-mali",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 12, day: 25 },
    caution: true,
    place: "cathedrale-sacre-coeur-bamako",
    name: "Noël",
    summary: "Fête chrétienne de la Nativité, fériée dans tout le pays.",
    description:
      "Noël est célébré par la communauté chrétienne du Mali avec la messe de minuit, notamment à la cathédrale du Sacré-Cœur de Bamako, puis des repas en famille. Comme les grandes fêtes musulmanes, la journée est fériée, chômée et payée pour tous selon la loi de 2005, et les quartiers des grandes villes s'animent pendant toute la période des fêtes de fin d'année.",
    tips: "Messes très fréquentées le 24 au soir : arrivez tôt et ayez une tenue correcte.",
    where: "Dans tout le pays",
    sources: [LOI, OFFICE, WIKI],
    en: {
      name: "Christmas",
      summary: "The Christian feast of the Nativity, a public holiday nationwide.",
      description:
        "Christmas is celebrated by Mali's Christian community with midnight mass, notably at the Sacred Heart Cathedral in Bamako, followed by family meals. Like the major Muslim festivals, it is a paid public holiday for everyone under the 2005 law, and neighbourhoods in the big towns come alive throughout the end-of-year festive season.",
      tips: "Masses are very busy on the evening of the 24th: arrive early and dress appropriately.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Navidad",
        summary: "Fiesta cristiana de la Natividad, festiva en todo el país.",
        description:
          "La comunidad cristiana de Malí celebra la Navidad con la misa del gallo, sobre todo en la catedral del Sagrado Corazón de Bamako, y después con comidas familiares. Como las grandes fiestas musulmanas, es un día festivo remunerado para todos según la ley de 2005, y los barrios de las grandes ciudades se animan durante toda la temporada de fiestas de fin de año.",
        tips: "Misas muy concurridas la noche del 24: llegue temprano y vista de forma adecuada.",
        where: "En todo el país",
      },
      pt: {
        name: "Natal",
        summary: "Festa cristã da Natividade, feriado em todo o país.",
        description:
          "O Natal é celebrado pela comunidade cristã do Mali com a missa do galo, nomeadamente na catedral do Sagrado Coração de Bamako, e depois com refeições em família. Tal como as grandes festas muçulmanas, é feriado remunerado para todos nos termos da lei de 2005, e os bairros das grandes cidades animam-se durante toda a época festiva de fim de ano.",
        tips: "Missas muito concorridas na noite de 24: chegue cedo e use vestuário adequado.",
        where: "Em todo o país",
      },
      ar: {
        name: "عيد الميلاد",
        summary: "عيد الميلاد المسيحي، عطلة رسمية في جميع أنحاء البلاد.",
        description:
          "تحتفل الجماعة المسيحية في مالي بعيد الميلاد بقداس منتصف الليل، لا سيما في كاتدرائية القلب الأقدس في باماكو، ثم بوجبات عائلية. وعلى غرار الأعياد الإسلامية الكبرى، هو عطلة رسمية مدفوعة الأجر للجميع بموجب قانون 2005، وتنبض أحياء المدن الكبرى بالحياة طوال موسم أعياد نهاية السنة.",
        tips: "القداديس مكتظة مساء 24 ديسمبر: احضر مبكرًا وارتدِ لباسًا لائقًا.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "korite-mali",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 10, day: 1 },
    caution: true,
    name: "Korité (Aïd el-Fitr)",
    summary: "Fête de la rupture du jeûne, à la fin du ramadan.",
    description:
      "La Korité (Aïd el-Fitr) marque la fin du mois de ramadan. Le matin, les fidèles se rassemblent pour la grande prière, souvent en plein air, puis les familles partagent des repas de fête ; on porte des vêtements neufs, on rend visite aux proches et on demande pardon. C'est l'une des fêtes les plus importantes du pays, fériée, chômée et payée selon la loi de 2005.",
    tips: "Commerces et transports au ralenti pendant la fête et la veille ; évitez de photographier la prière.",
    where: "Dans tout le pays",
    dateNote:
      "1er chawwal : date annoncée la veille par les autorités religieuses après observation du croissant lunaire (± 1 jour). Le lendemain de la fête est souvent déclaré chômé lui aussi (19 et 20 mars 2026), par communiqué du ministère du Travail.",
    sources: ["https://www.echosmedias.org/mali-les-journees-du-jeudi-19-et-du-vendredi-20-mars-2026-declarees-chomees-et-payees/", OFFICE, WIKI],
    en: {
      name: "Korité (Eid al-Fitr)",
      summary: "The feast of breaking the fast, at the end of Ramadan.",
      description:
        "Korité (Eid al-Fitr) marks the end of the month of Ramadan. In the morning the faithful gather for the great prayer, often in the open air, and then families share festive meals; people wear new clothes, visit relatives and ask for forgiveness. It is one of the country's most important festivals and a paid public holiday under the 2005 law.",
      tips: "Shops and transport slow down on the day and the day before; avoid photographing the prayer.",
      where: "Nationwide",
      dateNote:
        "1 Shawwal: date announced the day before by the religious authorities after sighting the crescent moon (± 1 day). The day after the feast is often declared a day off as well (19 and 20 March 2026), by announcement of the Ministry of Labour.",
    },
    i18n: {
      es: {
        name: "Korité (Aíd al-Fitr)",
        summary: "Fiesta de la ruptura del ayuno, al final del ramadán.",
        description:
          "La Korité (Aíd al-Fitr) marca el final del mes de ramadán. Por la mañana, los fieles se reúnen para la gran oración, a menudo al aire libre, y después las familias comparten comidas festivas; se estrena ropa, se visita a los allegados y se pide perdón. Es una de las fiestas más importantes del país, festiva y remunerada según la ley de 2005.",
        tips: "Comercios y transportes al ralentí durante la fiesta y la víspera; evite fotografiar la oración.",
        where: "En todo el país",
        dateNote:
          "1 de shawwal: fecha anunciada la víspera por las autoridades religiosas tras la observación de la luna creciente (± 1 día). El día siguiente a la fiesta también suele declararse no laborable (19 y 20 de marzo de 2026), mediante comunicado del Ministerio de Trabajo.",
      },
      pt: {
        name: "Korité (Aid al-Fitr)",
        summary: "Festa da quebra do jejum, no fim do ramadão.",
        description:
          "A Korité (Aid al-Fitr) marca o fim do mês do ramadão. De manhã, os fiéis reúnem-se para a grande oração, muitas vezes ao ar livre, e depois as famílias partilham refeições festivas; vestem-se roupas novas, visitam-se os familiares e pede-se perdão. É uma das festas mais importantes do país, feriado remunerado nos termos da lei de 2005.",
        tips: "Comércio e transportes a meio-gás durante a festa e na véspera; evite fotografar a oração.",
        where: "Em todo o país",
        dateNote:
          "1 de chawwal: data anunciada na véspera pelas autoridades religiosas após a observação do crescente lunar (± 1 dia). O dia seguinte à festa é muitas vezes também declarado feriado (19 e 20 de março de 2026), por comunicado do Ministério do Trabalho.",
      },
      ar: {
        name: "عيد الفطر (كوريتيه)",
        summary: "عيد الفطر في ختام شهر رمضان.",
        description:
          "يُعلن عيد الفطر نهاية شهر رمضان. ففي الصباح يجتمع المصلّون لأداء صلاة العيد، غالبًا في الهواء الطلق، ثم تتقاسم العائلات وجبات العيد، ويرتدي الناس ملابس جديدة ويزورون الأقارب ويطلبون الصفح. وهو من أهم أعياد البلاد، وعطلة رسمية مدفوعة الأجر بموجب قانون 2005.",
        tips: "تتباطأ حركة المتاجر ووسائل النقل يوم العيد وعشيته؛ تجنّب تصوير الصلاة.",
        where: "في جميع أنحاء البلاد",
        dateNote:
          "الأول من شوال: تعلن السلطات الدينية الموعد عشية العيد بعد رؤية الهلال (± يوم واحد). وكثيرًا ما يُعلن اليوم التالي للعيد عطلة أيضًا (19 و20 مارس 2026) ببلاغ من وزارة العمل.",
      },
    },
  },
  {
    slug: "tabaski-mali",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 12, day: 10 },
    caution: true,
    name: "Tabaski (Aïd el-Kébir)",
    summary: "Fête du sacrifice, la plus grande fête musulmane de l'année.",
    description:
      "La Tabaski (Aïd el-Adha) commémore le sacrifice d'Abraham. Après la prière collective du matin, chaque famille qui le peut sacrifie un mouton, dont la viande est partagée avec les proches et les plus démunis. Les jours précédents, les marchés à bétail débordent et beaucoup voyagent pour rejoindre leur famille. La fête est fériée, chômée et payée selon la loi de 2005.",
    tips: "Transports saturés avant la fête et prix en hausse ; administrations et commerces fermés le jour J.",
    where: "Dans tout le pays",
    dateNote:
      "10 dhou al-hijja : date fixée par le ministère des Affaires religieuses après observation du croissant (27 mai 2026). Le lendemain peut aussi être déclaré chômé par communiqué.",
    sources: ["https://seneweb.com/en/news/Afrique/mali-la-tabaski-celebree-le-mercredi-27-mai-2026_n_492778.html", OFFICE, WIKI],
    en: {
      name: "Tabaski (Eid al-Adha)",
      summary: "The feast of the sacrifice, the biggest Muslim festival of the year.",
      description:
        "Tabaski (Eid al-Adha) commemorates Abraham's sacrifice. After the communal morning prayer, every family that can afford it sacrifices a sheep, whose meat is shared with relatives and the poor. In the days before, livestock markets overflow and many people travel to join their families. It is a paid public holiday under the 2005 law.",
      tips: "Transport is packed before the festival and prices rise; government offices and shops close on the day.",
      where: "Nationwide",
      dateNote:
        "10 Dhu al-Hijjah: date set by the Ministry of Religious Affairs after sighting the crescent moon (27 May 2026). The following day may also be declared a day off by announcement.",
    },
    i18n: {
      es: {
        name: "Tabaski (Aíd al-Adha)",
        summary: "Fiesta del sacrificio, la mayor fiesta musulmana del año.",
        description:
          "La Tabaski (Aíd al-Adha) conmemora el sacrificio de Abraham. Tras la oración colectiva de la mañana, cada familia que puede sacrifica un cordero, cuya carne se comparte con los allegados y los más necesitados. Los días previos, los mercados de ganado rebosan y muchos viajan para reunirse con su familia. Es festiva y remunerada según la ley de 2005.",
        tips: "Transportes saturados antes de la fiesta y precios al alza; administración y comercios cerrados ese día.",
        where: "En todo el país",
        dateNote:
          "10 de dhu al-hiyya: fecha fijada por el Ministerio de Asuntos Religiosos tras la observación de la luna creciente (27 de mayo de 2026). El día siguiente también puede declararse no laborable por comunicado.",
      },
      pt: {
        name: "Tabaski (Aid al-Adha)",
        summary: "Festa do sacrifício, a maior festa muçulmana do ano.",
        description:
          "A Tabaski (Aid al-Adha) comemora o sacrifício de Abraão. Depois da oração coletiva da manhã, cada família que pode sacrifica um carneiro, cuja carne é partilhada com os familiares e os mais carenciados. Nos dias anteriores, os mercados de gado transbordam e muitos viajam para se juntar à família. É feriado remunerado nos termos da lei de 2005.",
        tips: "Transportes cheios antes da festa e preços em alta; serviços públicos e comércio fechados no próprio dia.",
        where: "Em todo o país",
        dateNote:
          "10 de dhu al-hijja: data fixada pelo Ministério dos Assuntos Religiosos após a observação do crescente (27 de maio de 2026). O dia seguinte pode também ser declarado feriado por comunicado.",
      },
      ar: {
        name: "عيد الأضحى (تاباسكي)",
        summary: "عيد الأضحى، أكبر الأعياد الإسلامية في السنة.",
        description:
          "يُحيي عيد الأضحى ذكرى فداء إبراهيم. فبعد صلاة العيد الجماعية صباحًا، تذبح كل أسرة قادرة أضحية من الخراف، ويُوزَّع لحمها على الأقارب والمحتاجين. وفي الأيام السابقة تكتظ أسواق المواشي ويسافر كثيرون للالتحاق بعائلاتهم. وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005.",
        tips: "وسائل النقل مزدحمة قبل العيد والأسعار مرتفعة؛ الإدارات والمتاجر مغلقة يوم العيد.",
        where: "في جميع أنحاء البلاد",
        dateNote:
          "العاشر من ذي الحجة: تحدد وزارة الشؤون الدينية الموعد بعد رؤية الهلال (27 مايو 2026). وقد يُعلن اليوم التالي عطلة أيضًا ببلاغ رسمي.",
      },
    },
  },
  {
    slug: "maouloud-mali",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 3, day: 12 },
    caution: true,
    name: "Maouloud (naissance du Prophète)",
    summary: "Anniversaire de la naissance du Prophète Mohammed, nuit de prières et de récitations.",
    description:
      "Le Maouloud célèbre la naissance du Prophète Mohammed. La nuit précédente, les fidèles se réunissent dans les mosquées, les zaouïas et les cours familiales pour des prières, des récitations du Coran et des chants religieux qui durent jusqu'à l'aube. Très suivie au Mali, la fête est fériée, chômée et payée selon la loi de 2005 ; une semaine plus tard, le « baptême » du Prophète est également férié.",
    tips: "Veillées tard dans la nuit : tenue couvrante si vous êtes invité, et pas de photos sans permission.",
    where: "Dans tout le pays",
    dateNote: "12 rabi' al-awwal : date confirmée par communiqué du ministère du Travail après observation de la lune (4 septembre 2025 ; 25 août 2026 selon les calendriers).",
    sources: [
      "https://bamada.net/le-ministre-du-travail-annonce-le-28-septembre-2023-comme-jour-ferie-pour-le-maouloud-au-mali",
      "https://www.journaldumali.com/wp-content/uploads/2025/09/JDM-543-light.pdf",
      OFFICE,
    ],
    en: {
      name: "Maouloud (Prophet's Birthday)",
      summary: "The anniversary of the Prophet Muhammad's birth, a night of prayers and recitations.",
      description:
        "Maouloud celebrates the birth of the Prophet Muhammad. On the night before, the faithful gather in mosques, zawiyas and family courtyards for prayers, Koran recitations and religious songs that last until dawn. Widely observed in Mali, it is a paid public holiday under the 2005 law; a week later, the Prophet's “baptism” is also a public holiday.",
      tips: "Vigils go on late into the night: wear covering clothes if invited, and no photos without permission.",
      where: "Nationwide",
      dateNote: "12 Rabi' al-Awwal: date confirmed by announcement of the Ministry of Labour after moon sighting (4 September 2025; 25 August 2026 according to calendars).",
    },
    i18n: {
      es: {
        name: "Maulud (nacimiento del Profeta)",
        summary: "Aniversario del nacimiento del profeta Mahoma, noche de oraciones y recitaciones.",
        description:
          "El Maulud celebra el nacimiento del profeta Mahoma. La noche anterior, los fieles se reúnen en las mezquitas, las zauías y los patios familiares para rezar, recitar el Corán y entonar cantos religiosos hasta el amanecer. Muy seguida en Malí, la fiesta es festiva y remunerada según la ley de 2005; una semana después, el «bautismo» del Profeta también es festivo.",
        tips: "Veladas hasta tarde: ropa que cubra si le invitan, y ninguna foto sin permiso.",
        where: "En todo el país",
        dateNote: "12 de rabi al-awwal: fecha confirmada por comunicado del Ministerio de Trabajo tras la observación de la luna (4 de septiembre de 2025; 25 de agosto de 2026 según los calendarios).",
      },
      pt: {
        name: "Maulid (nascimento do Profeta)",
        summary: "Aniversário do nascimento do Profeta Maomé, noite de orações e recitações.",
        description:
          "O Maulid celebra o nascimento do Profeta Maomé. Na noite anterior, os fiéis reúnem-se nas mesquitas, nas zauias e nos pátios familiares para orações, recitações do Corão e cânticos religiosos que se prolongam até de madrugada. Muito seguido no Mali, é feriado remunerado nos termos da lei de 2005; uma semana depois, o «batismo» do Profeta é também feriado.",
        tips: "Vigílias até tarde: vestuário que cubra se for convidado, e nada de fotografias sem autorização.",
        where: "Em todo o país",
        dateNote: "12 de rabi al-awwal: data confirmada por comunicado do Ministério do Trabalho após a observação da lua (4 de setembro de 2025; 25 de agosto de 2026 segundo os calendários).",
      },
      ar: {
        name: "المولد النبوي",
        summary: "ذكرى مولد النبي محمد، ليلة صلاة وتلاوة.",
        description:
          "يُحتفل في المولد بذكرى مولد النبي محمد. ففي الليلة السابقة يجتمع المؤمنون في المساجد والزوايا وأفنية البيوت للصلاة وتلاوة القرآن والإنشاد الديني حتى الفجر. ويحظى بإقبال كبير في مالي، وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005، وبعد أسبوع يكون «عقيقة» النبي عطلة أيضًا.",
        tips: "السهرات تمتد إلى وقت متأخر من الليل: ارتدِ لباسًا محتشمًا إن دُعيت، ولا تصوّر دون إذن.",
        where: "في جميع أنحاء البلاد",
        dateNote: "12 ربيع الأول: يؤكَّد الموعد ببلاغ من وزارة العمل بعد رؤية الهلال (4 سبتمبر 2025، و25 أغسطس 2026 وفق التقاويم).",
      },
    },
  },
  {
    slug: "bapteme-du-prophete-mali",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 3, day: 19 },
    caution: true,
    name: "Baptême du Prophète",
    summary: "Septième jour après le Maouloud, fête propre au Mali, fériée.",
    description:
      "Une semaine après le Maouloud, le Mali célèbre le « baptême » du Prophète, qui rappelle la cérémonie du nom donnée au septième jour de la naissance. Cette fête, que le Mali est seul à inscrire parmi ses jours fériés, est marquée par des prières, des lectures et des rassemblements dans les mosquées et les familles. Elle est fériée, chômée et payée selon la loi de 2005.",
    tips: "Moments de prière et de recueillement : discrétion et tenue couvrante.",
    where: "Dans tout le pays",
    dateNote:
      "19 rabi' al-awwal (une semaine après le Maouloud), date confirmée par communiqué. En 2025, la fête et son lendemain (11 et 12 septembre) ont été chômés.",
    sources: ["https://www.journaldumali.com/wp-content/uploads/2025/09/JDM-543-light.pdf", OFFICE, WIKI],
    en: {
      name: "Baptism of the Prophet",
      summary: "The seventh day after Maouloud, a festival peculiar to Mali and a public holiday.",
      description:
        "A week after Maouloud, Mali celebrates the Prophet's “baptism”, recalling the naming ceremony held on the seventh day after birth. This festival, which only Mali counts among its public holidays, is marked by prayers, readings and gatherings in mosques and families. It is a paid public holiday under the 2005 law.",
      tips: "A time of prayer and contemplation: be discreet and wear covering clothes.",
      where: "Nationwide",
      dateNote:
        "19 Rabi' al-Awwal (a week after Maouloud), date confirmed by announcement. In 2025 the festival and the following day (11 and 12 September) were days off.",
    },
    i18n: {
      es: {
        name: "Bautismo del Profeta",
        summary: "Séptimo día después del Maulud, fiesta propia de Malí y festiva.",
        description:
          "Una semana después del Maulud, Malí celebra el «bautismo» del Profeta, que recuerda la ceremonia de imposición del nombre al séptimo día del nacimiento. Esta fiesta, que solo Malí incluye entre sus festivos, se celebra con oraciones, lecturas y reuniones en las mezquitas y las familias. Es festiva y remunerada según la ley de 2005.",
        tips: "Momentos de oración y recogimiento: discreción y ropa que cubra.",
        where: "En todo el país",
        dateNote:
          "19 de rabi al-awwal (una semana después del Maulud), fecha confirmada por comunicado. En 2025, la fiesta y el día siguiente (11 y 12 de septiembre) fueron no laborables.",
      },
      pt: {
        name: "Batismo do Profeta",
        summary: "Sétimo dia após o Maulid, festa própria do Mali e feriado.",
        description:
          "Uma semana depois do Maulid, o Mali celebra o «batismo» do Profeta, que recorda a cerimónia de atribuição do nome ao sétimo dia após o nascimento. Esta festa, que só o Mali inclui entre os seus feriados, é marcada por orações, leituras e encontros nas mesquitas e nas famílias. É feriado remunerado nos termos da lei de 2005.",
        tips: "Momentos de oração e recolhimento: discrição e vestuário que cubra.",
        where: "Em todo o país",
        dateNote:
          "19 de rabi al-awwal (uma semana depois do Maulid), data confirmada por comunicado. Em 2025, a festa e o dia seguinte (11 e 12 de setembro) foram feriados.",
      },
      ar: {
        name: "عقيقة النبي",
        summary: "اليوم السابع بعد المولد، عيد خاص بمالي وعطلة رسمية.",
        description:
          "بعد أسبوع من المولد، تحتفل مالي بـ«عقيقة» النبي، التي تستحضر مراسم التسمية في اليوم السابع بعد الولادة. ويتميّز هذا العيد، الذي تنفرد مالي بإدراجه ضمن عطلها الرسمية، بالصلوات والقراءات والتجمعات في المساجد والبيوت. وهو عطلة رسمية مدفوعة الأجر بموجب قانون 2005.",
        tips: "أوقات صلاة وخشوع: التزم الهدوء وارتدِ لباسًا محتشمًا.",
        where: "في جميع أنحاء البلاد",
        dateNote:
          "19 ربيع الأول (بعد أسبوع من المولد)، ويؤكَّد الموعد ببلاغ رسمي. وفي عام 2025 كان يوم العيد واليوم التالي له (11 و12 سبتمبر) عطلة.",
      },
    },
  },
  {
    slug: "ramadan-mali",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 1, days: 30 },
    caution: true,
    name: "Ramadan",
    summary: "Mois de jeûne musulman, qui change le rythme de tout le pays.",
    description:
      "Pendant le ramadan, la grande majorité des Maliens jeûnent du lever au coucher du soleil. Les journées sont plus calmes et les horaires de travail souvent aménagés, puis la ville s'anime à la rupture du jeûne, quand les familles partagent bouillies, dattes et plats du soir. Les mosquées sont très fréquentées, surtout les dix dernières nuits. Le mois s'achève par la Korité.",
    tips: "Évitez de manger, boire ou fumer en public pendant la journée ; prévoyez des services au ralenti l'après-midi.",
    where: "Dans tout le pays",
    dateNote: "Début le 1er ramadan, annoncé après observation du croissant lunaire (± 1 jour) ; durée de 29 ou 30 jours.",
    sources: [WIKI, "https://www.echosmedias.org/mali-les-journees-du-jeudi-19-et-du-vendredi-20-mars-2026-declarees-chomees-et-payees/"],
    en: {
      name: "Ramadan",
      summary: "The Muslim month of fasting, which changes the pace of the whole country.",
      description:
        "During Ramadan the great majority of Malians fast from sunrise to sunset. Days are quieter and working hours are often adjusted, then towns come alive at the breaking of the fast, when families share porridge, dates and evening dishes. Mosques are very busy, especially during the last ten nights. The month ends with Korité.",
      tips: "Avoid eating, drinking or smoking in public during the day; expect slower services in the afternoon.",
      where: "Nationwide",
      dateNote: "Begins on 1 Ramadan, announced after sighting the crescent moon (± 1 day); lasts 29 or 30 days.",
    },
    i18n: {
      es: {
        name: "Ramadán",
        summary: "Mes de ayuno musulmán, que cambia el ritmo de todo el país.",
        description:
          "Durante el ramadán, la gran mayoría de los malienses ayunan desde la salida hasta la puesta del sol. Los días son más tranquilos y los horarios de trabajo suelen adaptarse; después, la ciudad se anima con la ruptura del ayuno, cuando las familias comparten gachas, dátiles y platos de la noche. Las mezquitas están muy concurridas, sobre todo las diez últimas noches. El mes termina con la Korité.",
        tips: "Evite comer, beber o fumar en público durante el día; prevea servicios más lentos por la tarde.",
        where: "En todo el país",
        dateNote: "Comienza el 1 de ramadán, anunciado tras la observación de la luna creciente (± 1 día); dura 29 o 30 días.",
      },
      pt: {
        name: "Ramadão",
        summary: "Mês de jejum muçulmano, que muda o ritmo de todo o país.",
        description:
          "Durante o ramadão, a grande maioria dos malianos jejua do nascer ao pôr do sol. Os dias são mais calmos e os horários de trabalho muitas vezes ajustados; depois, a cidade anima-se com a quebra do jejum, quando as famílias partilham papas, tâmaras e pratos da noite. As mesquitas estão muito concorridas, sobretudo nas dez últimas noites. O mês termina com a Korité.",
        tips: "Evite comer, beber ou fumar em público durante o dia; conte com serviços mais lentos à tarde.",
        where: "Em todo o país",
        dateNote: "Começa a 1 de ramadão, anunciado após a observação do crescente lunar (± 1 dia); dura 29 ou 30 dias.",
      },
      ar: {
        name: "رمضان",
        summary: "شهر الصيام عند المسلمين، الذي يغيّر إيقاع البلاد بأسرها.",
        description:
          "خلال شهر رمضان، يصوم الغالبية العظمى من الماليين من شروق الشمس إلى غروبها. فتكون الأيام أهدأ وكثيرًا ما تُعدَّل ساعات العمل، ثم تدب الحياة في المدن عند الإفطار حين تتقاسم العائلات العصائد والتمور وأطباق المساء. وتكتظ المساجد، لا سيما في الليالي العشر الأواخر. ويُختتم الشهر بعيد الفطر.",
        tips: "تجنّب الأكل والشرب والتدخين علنًا خلال النهار، وتوقّع بطء الخدمات بعد الظهر.",
        where: "في جميع أنحاء البلاد",
        dateNote: "يبدأ في الأول من رمضان، ويُعلن بعد رؤية الهلال (± يوم واحد)، ويدوم 29 أو 30 يومًا.",
      },
    },
  },
  {
    slug: "laylat-al-qadr-mali",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 27 },
    caution: true,
    name: "Nuit du Destin (Laylat al-Qadr)",
    summary: "La nuit la plus sacrée du ramadan, veillée de prières jusqu'à l'aube.",
    description:
      "La Nuit du Destin commémore la révélation du Coran. Au Mali, elle est célébrée la nuit du 26 au 27 ramadan par de longues veillées de prières, de lectures et de récitations dans les mosquées et les zaouïas, souvent jusqu'à l'aube. Elle n'est pas inscrite dans la loi de 2005, mais le gouvernement a déjà déclaré chômée la journée qui suit (28 avril 2022).",
    tips: "Mosquées bondées toute la nuit ; vérifiez si la journée suivante est déclarée chômée.",
    where: "Dans tout le pays",
    dateNote: "Nuit du 26 au 27 ramadan, selon l'observation de la lune ; chômage éventuel annoncé par communiqué.",
    sources: ["https://www.wakatsera.com/ramadan-2022-nuit-du-destin-le-jeudi-28-avril-declare-ferie-au-niger-au-mali-et-en-cote-divoire/", WIKI],
    en: {
      name: "Night of Power (Laylat al-Qadr)",
      summary: "The holiest night of Ramadan, a prayer vigil until dawn.",
      description:
        "The Night of Power commemorates the revelation of the Koran. In Mali it is celebrated on the night of 26 to 27 Ramadan with long vigils of prayers, readings and recitations in mosques and zawiyas, often until dawn. It is not in the 2005 law, but the government has already declared the following day a day off (28 April 2022).",
      tips: "Mosques are packed all night; check whether the following day is declared a day off.",
      where: "Nationwide",
      dateNote: "The night of 26 to 27 Ramadan, depending on the moon; any day off is announced by official statement.",
    },
    i18n: {
      es: {
        name: "Noche del Destino (Laylat al-Qadr)",
        summary: "La noche más sagrada del ramadán, vigilia de oración hasta el amanecer.",
        description:
          "La Noche del Destino conmemora la revelación del Corán. En Malí se celebra la noche del 26 al 27 de ramadán con largas vigilias de oración, lecturas y recitaciones en las mezquitas y las zauías, a menudo hasta el amanecer. No figura en la ley de 2005, pero el Gobierno ya ha declarado no laborable el día siguiente (28 de abril de 2022).",
        tips: "Mezquitas abarrotadas toda la noche; compruebe si el día siguiente se declara no laborable.",
        where: "En todo el país",
        dateNote: "Noche del 26 al 27 de ramadán, según la observación de la luna; posible día no laborable anunciado por comunicado.",
      },
      pt: {
        name: "Noite do Destino (Laylat al-Qadr)",
        summary: "A noite mais sagrada do ramadão, vigília de oração até de madrugada.",
        description:
          "A Noite do Destino comemora a revelação do Corão. No Mali, é celebrada na noite de 26 para 27 de ramadão com longas vigílias de orações, leituras e recitações nas mesquitas e nas zauias, muitas vezes até de madrugada. Não consta da lei de 2005, mas o Governo já declarou feriado o dia seguinte (28 de abril de 2022).",
        tips: "Mesquitas cheias toda a noite; confirme se o dia seguinte é declarado feriado.",
        where: "Em todo o país",
        dateNote: "Noite de 26 para 27 de ramadão, segundo a observação da lua; eventual feriado anunciado por comunicado.",
      },
      ar: {
        name: "ليلة القدر",
        summary: "أقدس ليالي رمضان، سهرة صلاة حتى الفجر.",
        description:
          "تُحيي ليلة القدر ذكرى نزول القرآن. وفي مالي يُحتفل بها ليلة 26 إلى 27 رمضان بسهرات طويلة من الصلاة والقراءة والتلاوة في المساجد والزوايا، غالبًا حتى الفجر. ولا ينص عليها قانون 2005، لكن الحكومة سبق أن أعلنت اليوم التالي لها عطلة (28 أبريل 2022).",
        tips: "المساجد مكتظة طوال الليل؛ تحقّق مما إذا أُعلن اليوم التالي عطلة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "ليلة 26 إلى 27 رمضان حسب رؤية الهلال، وتُعلن العطلة المحتملة ببلاغ رسمي.",
      },
    },
  },
  {
    slug: "crepissage-grande-mosquee-djenne",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "period", from: 3, to: 5 },
    caution: true,
    destination: "djenne",
    place: "crepissage-mosquee-djenne",
    cover: "/images/voyage/fete-crepissage-grande-mosquee-djenne",
    name: "Crépissage de la Grande Mosquée de Djenné",
    summary: "Fête collective annuelle où toute la ville recouvre la mosquée d'un enduit de banco neuf.",
    description:
      "Chaque année, les habitants de Djenné réparent les dégâts causés par les pluies sur le plus grand édifice en banco du monde. Les jours précédents, l'enduit est préparé dans des fosses et brassé régulièrement ; le jour venu, une course ouvre la fête, les jeunes hommes grimpent sur les murs grâce aux pièces de bois et étalent le banco, les femmes apportent l'eau, sous la direction des maîtres maçons et sous le regard des anciens. Musique, tambours et rivalité joyeuse entre quartiers accompagnent ce chantier, élément vivant du bien UNESCO.",
    tips: "Fête communautaire et religieuse : restez en retrait, demandez avant de photographier et ne montez pas sur l'édifice.",
    where: "Djenné (région de Mopti)",
    dateNote:
      "Une fois par an, en saison sèche avant les pluies ; la date est fixée localement par la communauté et les maçons de Djenné et n'est connue que peu avant (fenêtre indicative de mars à mai, à vérifier).",
    sources: ["https://fr.wikipedia.org/wiki/Grande_mosqu%C3%A9e_de_Djenn%C3%A9", "https://en.wikipedia.org/wiki/Great_Mosque_of_Djenn%C3%A9"],
    en: {
      name: "Replastering of the Great Mosque of Djenné",
      summary: "An annual community festival in which the whole town gives the mosque a fresh coat of banco.",
      description:
        "Every year Djenné's residents repair the rain damage to the world's largest mud-brick building. In the preceding days the plaster is prepared in pits and stirred regularly; on the day, a race opens the festival, young men climb the walls using the wooden beams and spread the banco, and women bring water, under the direction of the master masons and the eyes of the elders. Music, drums and good-natured rivalry between neighbourhoods accompany the work, a living part of the UNESCO site.",
      tips: "A community and religious event: stay in the background, ask before taking photos and do not climb on the building.",
      where: "Djenné (Mopti region)",
      dateNote:
        "Once a year, in the dry season before the rains; the date is set locally by Djenné's community and masons and is only known shortly before (indicative window March to May, to be checked).",
    },
    i18n: {
      es: {
        name: "Revoque de la Gran Mezquita de Djenné",
        summary: "Fiesta colectiva anual en la que toda la ciudad cubre la mezquita con un nuevo revoque de banco.",
        description:
          "Cada año, los habitantes de Djenné reparan los daños causados por las lluvias en el mayor edificio de banco del mundo. Los días previos, el revoque se prepara en fosas y se remueve con regularidad; el día señalado, una carrera abre la fiesta, los jóvenes trepan por los muros gracias a las vigas de madera y extienden el banco, y las mujeres llevan el agua, bajo la dirección de los maestros albañiles y la mirada de los ancianos. Música, tambores y una alegre rivalidad entre barrios acompañan la obra, elemento vivo del bien de la UNESCO.",
        tips: "Fiesta comunitaria y religiosa: manténgase al margen, pida permiso antes de hacer fotos y no se suba al edificio.",
        where: "Djenné (región de Mopti)",
        dateNote:
          "Una vez al año, en la estación seca antes de las lluvias; la fecha la fijan localmente la comunidad y los albañiles de Djenné y solo se conoce poco antes (ventana orientativa de marzo a mayo, por confirmar).",
      },
      pt: {
        name: "Reboco da Grande Mesquita de Djenné",
        summary: "Festa coletiva anual em que toda a cidade cobre a mesquita com um novo reboco de banco.",
        description:
          "Todos os anos, os habitantes de Djenné reparam os estragos causados pelas chuvas no maior edifício de banco do mundo. Nos dias anteriores, o reboco é preparado em fossas e mexido regularmente; no dia, uma corrida abre a festa, os rapazes sobem às paredes pelas vigas de madeira e espalham o banco, e as mulheres trazem a água, sob a direção dos mestres pedreiros e o olhar dos anciãos. Música, tambores e uma rivalidade alegre entre bairros acompanham a obra, elemento vivo do bem da UNESCO.",
        tips: "Festa comunitária e religiosa: fique à margem, peça autorização antes de fotografar e não suba ao edifício.",
        where: "Djenné (região de Mopti)",
        dateNote:
          "Uma vez por ano, na estação seca antes das chuvas; a data é fixada localmente pela comunidade e pelos pedreiros de Djenné e só se conhece pouco antes (janela indicativa de março a maio, a confirmar).",
      },
      ar: {
        name: "تجديد طلاء المسجد الكبير في جينيه",
        summary: "احتفال جماعي سنوي تكسو فيه المدينة كلها المسجد بطبقة جديدة من الطين.",
        description:
          "يُصلح سكان جينيه كل عام ما أفسدته الأمطار في أكبر مبنى من الطين في العالم. ففي الأيام السابقة يُحضَّر الملاط في حفر ويُقلَّب بانتظام، وفي اليوم الموعود يفتتح سباقٌ الاحتفال، فيتسلق الشبان الجدران مستعينين بالعوارض الخشبية ويفرشون الطين، وتحمل النساء الماء، بإشراف كبار البنّائين وتحت أنظار الشيوخ. وترافق الموسيقى والطبول والمنافسة المرحة بين الأحياء هذا العمل الذي يُعد جزءًا حيًا من موقع اليونسكو.",
        tips: "احتفال جماعي وديني: ابقَ على مسافة واستأذن قبل التصوير ولا تصعد إلى المبنى.",
        where: "جينيه (منطقة موبتي)",
        dateNote:
          "مرة واحدة في السنة، في موسم الجفاف قبل الأمطار؛ يحدد المجتمع المحلي وبنّاؤو جينيه الموعد ولا يُعرف إلا قبله بوقت قصير (نافذة تقريبية من مارس إلى مايو، يجب التحقق منها).",
      },
    },
  },
  {
    slug: "sanke-mon-san",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "period", from: 5, to: 7 },
    caution: true,
    name: "Sanké mon, pêche collective de San",
    summary: "Rite de pêche collective dans la mare de Sanké, inscrit au patrimoine immatériel de l'UNESCO.",
    description:
      "À San, dans la région de Ségou, le Sanké mon commémore depuis des siècles la fondation de la ville. Il s'ouvre par des offrandes et des sacrifices aux génies de l'eau de la mare de Sanké, puis les participants se lancent dans une pêche collective d'une quinzaine d'heures aux filets ; une danse des masques sur la place publique clôt la fête. Le rite, qui marque aussi le début de la saison des pluies, est inscrit depuis 2009 sur la liste du patrimoine immatériel nécessitant une sauvegarde urgente : l'assèchement de la mare menace sa survie.",
    tips: "Foule très dense au bord de la mare : restez à l'écart des pêcheurs et demandez avant de photographier les rites.",
    where: "San (région de Ségou)",
    dateNote:
      "Le deuxième jeudi du septième mois lunaire du calendrier local, généralement en juin (6 juin 2024) ; date confirmée chaque année par les autorités coutumières de San.",
    sources: [
      "https://ich.unesco.org/fr/RL/le-sank-mon-rite-de-peche-collective-du-sanke-00289",
      "https://fr.allafrica.com/stories/202406060419.html",
    ],
    en: {
      name: "Sanké mon, the collective fishing rite of San",
      summary: "A collective fishing rite in the Sanké pond, on UNESCO's intangible heritage list.",
      description:
        "In San, in the Ségou region, the Sanké mon has commemorated the founding of the town for centuries. It opens with offerings and sacrifices to the water spirits of the Sanké pond, then participants take part in a collective net-fishing session lasting about fifteen hours; a masked dance on the public square closes the festival. The rite, which also marks the start of the rainy season, has been on the list of intangible heritage in need of urgent safeguarding since 2009: the drying-up of the pond threatens its survival.",
      tips: "Very dense crowds around the pond: keep clear of the fishermen and ask before photographing the rites.",
      where: "San (Ségou region)",
      dateNote:
        "The second Thursday of the seventh lunar month of the local calendar, usually in June (6 June 2024); the date is confirmed each year by San's customary authorities.",
    },
    i18n: {
      es: {
        name: "Sanké mon, pesca colectiva de San",
        summary: "Rito de pesca colectiva en la charca de Sanké, inscrito en el patrimonio inmaterial de la UNESCO.",
        description:
          "En San, en la región de Ségou, el Sanké mon conmemora desde hace siglos la fundación de la ciudad. Se abre con ofrendas y sacrificios a los genios del agua de la charca de Sanké; después, los participantes se lanzan a una pesca colectiva con redes de unas quince horas, y una danza de máscaras en la plaza pública cierra la fiesta. El rito, que marca también el comienzo de la estación de lluvias, figura desde 2009 en la lista del patrimonio inmaterial que requiere medidas urgentes de salvaguardia: la desecación de la charca amenaza su supervivencia.",
        tips: "Multitud muy densa en la orilla: manténgase alejado de los pescadores y pida permiso antes de fotografiar los ritos.",
        where: "San (región de Ségou)",
        dateNote:
          "El segundo jueves del séptimo mes lunar del calendario local, por lo general en junio (6 de junio de 2024); la fecha la confirman cada año las autoridades tradicionales de San.",
      },
      pt: {
        name: "Sanké mon, pesca coletiva de San",
        summary: "Rito de pesca coletiva no charco de Sanké, inscrito no património imaterial da UNESCO.",
        description:
          "Em San, na região de Ségou, o Sanké mon comemora há séculos a fundação da cidade. Começa com oferendas e sacrifícios aos génios da água do charco de Sanké; depois, os participantes lançam-se numa pesca coletiva com redes de cerca de quinze horas, e uma dança de máscaras na praça pública encerra a festa. O rito, que marca também o início da estação das chuvas, figura desde 2009 na lista do património imaterial que necessita de salvaguarda urgente: o secar do charco ameaça a sua sobrevivência.",
        tips: "Multidão muito densa junto ao charco: mantenha-se afastado dos pescadores e peça autorização antes de fotografar os ritos.",
        where: "San (região de Ségou)",
        dateNote:
          "A segunda quinta-feira do sétimo mês lunar do calendário local, geralmente em junho (6 de junho de 2024); a data é confirmada todos os anos pelas autoridades tradicionais de San.",
      },
      ar: {
        name: "سانكي مون، الصيد الجماعي في سان",
        summary: "طقس صيد جماعي في بركة سانكي، مدرج في قائمة التراث غير المادي لليونسكو.",
        description:
          "في سان، بمنطقة سيغو، يُحيي «سانكي مون» منذ قرون ذكرى تأسيس المدينة. ويُفتتح بقرابين وأضاحٍ لجنّ الماء في بركة سانكي، ثم ينطلق المشاركون في صيد جماعي بالشباك يدوم نحو خمس عشرة ساعة، ويُختتم الاحتفال برقصة الأقنعة في الساحة العامة. وهذا الطقس الذي يُعلن أيضًا بداية موسم الأمطار مدرج منذ 2009 على قائمة التراث غير المادي الذي يحتاج إلى صون عاجل، إذ يهدد جفاف البركة بقاءه.",
        tips: "حشود كثيفة جدًا حول البركة: ابتعد عن الصيادين واستأذن قبل تصوير الطقوس.",
        where: "سان (منطقة سيغو)",
        dateNote:
          "الخميس الثاني من الشهر القمري السابع في التقويم المحلي، عادةً في يونيو (6 يونيو 2024)، وتؤكد السلطات التقليدية في سان الموعد كل عام.",
      },
    },
  },
  {
    slug: "yaaral-degal-diafarabe",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "period", from: 11, to: 1 },
    caution: true,
    name: "Yaaral et Degal, traversée des troupeaux",
    summary: "Retour des troupeaux peuls dans le delta intérieur du Niger, célébré par la traversée du fleuve à Diafarabé.",
    description:
      "À la décrue du Niger, les éleveurs peuls ramènent leurs troupeaux vers les pâturages du delta intérieur. La fête s'ouvre avec le Yaaral à Diafarabé, où les bœufs traversent le fleuve à la nage sous les encouragements de la foule, et se clôt avec le Degal à Dialloubé : concours du troupeau le mieux paré, danses, musique et poésie pastorale. Les espaces culturels du Yaaral et du Degal ont été proclamés chef-d'œuvre du patrimoine oral et immatériel par l'UNESCO en 2005. Ces dernières années, la fête a parfois été annulée pour raisons de sécurité.",
    tips: "Sa tenue dépend de la crue et de la situation sécuritaire : vérifiez les annonces locales ; restez à distance des animaux lors de la traversée.",
    where: "Diafarabé et Dialloubé (delta intérieur du Niger, région de Mopti)",
    dateNote:
      "Date fixée chaque année par les responsables coutumiers selon le niveau du fleuve et l'état des pâturages, en général entre fin novembre et janvier (un samedi pour la traversée de Diafarabé).",
    sources: [
      "https://www.afrik.com/la-traversee-de-diafarabe-classee-patrimoine-de-l-humanite",
      "https://en.wikipedia.org/wiki/Diafarab%C3%A9",
      "https://globalvoices.org/2017/01/10/is-insecurity-threatening-cultural-growth-in-mali/",
    ],
    en: {
      name: "Yaaral and Degal, the cattle crossing",
      summary: "The return of the Fulani herds to the inner Niger delta, celebrated by the river crossing at Diafarabé.",
      description:
        "As the Niger recedes, Fulani herders bring their herds back to the pastures of the inner delta. The festival opens with the Yaaral at Diafarabé, where cattle swim across the river to the cheers of the crowd, and closes with the Degal at Dialloubé: a contest for the best-decorated herd, dances, music and pastoral poetry. The cultural spaces of the Yaaral and Degal were proclaimed a Masterpiece of the Oral and Intangible Heritage by UNESCO in 2005. In recent years the festival has sometimes been cancelled for security reasons.",
      tips: "Whether it takes place depends on the flood and the security situation: check local announcements; keep your distance from the animals during the crossing.",
      where: "Diafarabé and Dialloubé (inner Niger delta, Mopti region)",
      dateNote:
        "The date is set each year by customary leaders according to the river level and the pastures, usually between late November and January (a Saturday for the Diafarabé crossing).",
    },
    i18n: {
      es: {
        name: "Yaaral y Degal, la travesía de los rebaños",
        summary: "Regreso de los rebaños peul al delta interior del Níger, celebrado con la travesía del río en Diafarabé.",
        description:
          "Cuando baja el Níger, los pastores peul devuelven sus rebaños a los pastos del delta interior. La fiesta comienza con el Yaaral en Diafarabé, donde las reses cruzan el río a nado entre los ánimos de la multitud, y termina con el Degal en Dialloubé: concurso del rebaño mejor engalanado, danzas, música y poesía pastoral. Los espacios culturales del Yaaral y el Degal fueron proclamados Obra Maestra del Patrimonio Oral e Inmaterial por la UNESCO en 2005. En los últimos años, la fiesta se ha cancelado a veces por motivos de seguridad.",
        tips: "Su celebración depende de la crecida y de la situación de seguridad: consulte los anuncios locales; manténgase lejos de los animales durante la travesía.",
        where: "Diafarabé y Dialloubé (delta interior del Níger, región de Mopti)",
        dateNote:
          "Fecha fijada cada año por los responsables tradicionales según el nivel del río y el estado de los pastos, en general entre finales de noviembre y enero (un sábado para la travesía de Diafarabé).",
      },
      pt: {
        name: "Yaaral e Degal, a travessia dos rebanhos",
        summary: "Regresso dos rebanhos fulas ao delta interior do Níger, celebrado com a travessia do rio em Diafarabé.",
        description:
          "Quando o Níger baixa, os pastores fulas trazem os rebanhos de volta às pastagens do delta interior. A festa abre com o Yaaral em Diafarabé, onde os bois atravessam o rio a nado perante o entusiasmo da multidão, e termina com o Degal em Dialloubé: concurso do rebanho mais bem enfeitado, danças, música e poesia pastoral. Os espaços culturais do Yaaral e do Degal foram proclamados Obra-Prima do Património Oral e Imaterial pela UNESCO em 2005. Nos últimos anos, a festa foi por vezes cancelada por razões de segurança.",
        tips: "A sua realização depende da cheia e da situação de segurança: consulte os anúncios locais; mantenha distância dos animais durante a travessia.",
        where: "Diafarabé e Dialloubé (delta interior do Níger, região de Mopti)",
        dateNote:
          "Data fixada todos os anos pelos responsáveis tradicionais segundo o nível do rio e o estado das pastagens, geralmente entre o fim de novembro e janeiro (um sábado para a travessia de Diafarabé).",
      },
      ar: {
        name: "يارال وديغال، عبور القطعان",
        summary: "عودة قطعان الفولاني إلى دلتا النيجر الداخلية، يُحتفى بها بعبور النهر في ديافارابي.",
        description:
          "مع انحسار مياه النيجر، يعيد الرعاة الفولانيون قطعانهم إلى مراعي الدلتا الداخلية. ويُفتتح الاحتفال بـ«يارال» في ديافارابي، حيث تعبر الأبقار النهر سباحةً وسط تشجيع الجموع، ويُختتم بـ«ديغال» في ديالوبي: مسابقة لأجمل قطيع مزيَّن ورقصات وموسيقى وشعر رعوي. وقد أعلنت اليونسكو عام 2005 الفضاءات الثقافية ليارال وديغال من روائع التراث الشفهي وغير المادي. وفي السنوات الأخيرة أُلغي الاحتفال أحيانًا لأسباب أمنية.",
        tips: "يتوقف إقامته على الفيضان والوضع الأمني: تابع الإعلانات المحلية، وابقَ بعيدًا عن الحيوانات أثناء العبور.",
        where: "ديافارابي وديالوبي (دلتا النيجر الداخلية، منطقة موبتي)",
        dateNote:
          "يحدد الزعماء التقليديون الموعد كل عام بحسب منسوب النهر وحالة المراعي، عادةً بين أواخر نوفمبر ويناير (يوم سبت لعبور ديافارابي).",
      },
    },
  },
  {
    slug: "festival-sur-le-niger",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 2, to: 2 },
    caution: true,
    destination: "segou",
    place: "festival-sur-le-niger-segou",
    cover: "/images/voyage/fete-festival-sur-le-niger",
    name: "Ségou'Art – Festival sur le Niger",
    summary: "Une semaine de concerts, d'art contemporain et de rencontres sur les berges de Ségou.",
    description:
      "Créé au milieu des années 2000, le Festival sur le Niger, associé au salon d'art contemporain Ségou'Art, réunit chaque année en février des musiciens maliens et africains, des expositions, des spectacles de marionnettes géantes et des débats sur les berges du fleuve à Ségou. L'édition 2026 s'est tenue du 3 au 8 février, autour du lien entre créativité et éducation. C'est l'un des grands rendez-vous culturels du Mali.",
    tips: "Programme et tenue annoncés par les organisateurs quelques semaines avant ; hébergement rare pendant la semaine du festival.",
    where: "Ségou, berges du Niger",
    dateNote: "Une semaine en février (3-8 février 2026), dates annoncées chaque année par les organisateurs.",
    sources: [
      "https://www.musicinafrica.net/node/358626",
      "https://contemporaryand.com/en/events/16th-segouart-festival-identities-and-migrations",
    ],
    en: {
      name: "Ségou'Art – Festival on the Niger",
      summary: "A week of concerts, contemporary art and talks on the riverbanks at Ségou.",
      description:
        "Founded in the mid-2000s, the Festival on the Niger, linked to the Ségou'Art contemporary art fair, brings together Malian and African musicians, exhibitions, giant puppet shows and debates on the riverbanks at Ségou every February. The 2026 edition was held from 3 to 8 February, around the link between creativity and education. It is one of Mali's major cultural events.",
      tips: "Programme and confirmation are announced by the organisers a few weeks ahead; accommodation is scarce during festival week.",
      where: "Ségou, banks of the Niger",
      dateNote: "One week in February (3–8 February 2026), dates announced each year by the organisers.",
    },
    i18n: {
      es: {
        name: "Ségou'Art – Festival sobre el Níger",
        summary: "Una semana de conciertos, arte contemporáneo y encuentros a orillas del río en Ségou.",
        description:
          "Creado a mediados de los años 2000, el Festival sobre el Níger, asociado a la feria de arte contemporáneo Ségou'Art, reúne cada febrero a músicos malienses y africanos, exposiciones, espectáculos de marionetas gigantes y debates a orillas del río en Ségou. La edición de 2026 se celebró del 3 al 8 de febrero, en torno al vínculo entre creatividad y educación. Es una de las grandes citas culturales de Malí.",
        tips: "Programa y confirmación anunciados por los organizadores unas semanas antes; alojamiento escaso durante la semana del festival.",
        where: "Ségou, orillas del Níger",
        dateNote: "Una semana en febrero (3-8 de febrero de 2026), fechas anunciadas cada año por los organizadores.",
      },
      pt: {
        name: "Ségou'Art – Festival sobre o Níger",
        summary: "Uma semana de concertos, arte contemporânea e encontros nas margens do rio em Ségou.",
        description:
          "Criado em meados dos anos 2000, o Festival sobre o Níger, associado à feira de arte contemporânea Ségou'Art, reúne todos os anos em fevereiro músicos malianos e africanos, exposições, espetáculos de marionetas gigantes e debates nas margens do rio em Ségou. A edição de 2026 decorreu de 3 a 8 de fevereiro, em torno da ligação entre criatividade e educação. É um dos grandes acontecimentos culturais do Mali.",
        tips: "Programa e confirmação anunciados pelos organizadores algumas semanas antes; alojamento escasso durante a semana do festival.",
        where: "Ségou, margens do Níger",
        dateNote: "Uma semana em fevereiro (3-8 de fevereiro de 2026), datas anunciadas todos os anos pelos organizadores.",
      },
      ar: {
        name: "سيغو آرت – مهرجان على النيجر",
        summary: "أسبوع من الحفلات والفن المعاصر واللقاءات على ضفاف النهر في سيغو.",
        description:
          "أُطلق «المهرجان على النيجر» في منتصف العقد الأول من الألفية، وهو مرتبط بمعرض «سيغو آرت» للفن المعاصر، ويجمع كل فبراير موسيقيين ماليين وأفارقة ومعارض وعروض دمى عملاقة وندوات على ضفاف النهر في سيغو. وقد أُقيمت دورة 2026 من 3 إلى 8 فبراير حول العلاقة بين الإبداع والتعليم. وهو من أبرز المواعيد الثقافية في مالي.",
        tips: "يعلن المنظمون البرنامج وتأكيد الموعد قبل بضعة أسابيع، والإقامة نادرة خلال أسبوع المهرجان.",
        where: "سيغو، ضفاف النيجر",
        dateNote: "أسبوع في فبراير (3-8 فبراير 2026)، ويعلن المنظمون المواعيد كل عام.",
      },
    },
  },
  {
    slug: "ogobagna-bamako",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 1, to: 2 },
    caution: true,
    destination: "bamako",
    name: "Festival Ogobagna",
    summary: "Une semaine de culture dogon et des cultures du Mali, place du Cinquantenaire à Bamako.",
    description:
      "Porté depuis 2016 par l'association Ginna Dogon, Ogobagna installe chaque année à Bamako un village éphémère qui recrée des espaces du pays dogon : place du Hogon, toguna, musée, quartiers des communautés invitées. Danses de masques, danses traditionnelles, artisanat, gastronomie, conférences et soirées de cohésion sociale attirent des dizaines de milliers de visiteurs. La 11e édition s'est tenue du 26 janvier au 1er février 2026, avec les communautés bozo comme invitées d'honneur.",
    tips: "Affluence le week-end ; entrée et programme annoncés par l'association organisatrice.",
    where: "Bamako, place du Cinquantenaire",
    dateNote: "Une semaine fin janvier - début février, dates annoncées chaque année par l'association Ginna Dogon.",
    sources: [
      "https://yop.l-frii.com/mali-le-pays-lance-officiellement-la-11e-edition-du/",
      "https://afrique.le360.ma/culture/mali-ogobagna-un-festival-pour-ressouder-les-liens-communautaires_AUVOTHGNPVG6TAMTMDDEARJUHE",
    ],
    en: {
      name: "Ogobagna Festival",
      summary: "A week of Dogon culture and the cultures of Mali, at Place du Cinquantenaire in Bamako.",
      description:
        "Run since 2016 by the Ginna Dogon association, Ogobagna sets up a temporary village in Bamako every year that recreates spaces from Dogon country: the Hogon's square, a toguna, a museum and quarters for guest communities. Mask dances, traditional dances, crafts, food, talks and social-cohesion evenings draw tens of thousands of visitors. The 11th edition was held from 26 January to 1 February 2026, with Bozo communities as guests of honour.",
      tips: "Busy at weekends; admission and programme announced by the organising association.",
      where: "Bamako, Place du Cinquantenaire",
      dateNote: "One week in late January to early February, dates announced each year by the Ginna Dogon association.",
    },
    i18n: {
      es: {
        name: "Festival Ogobagna",
        summary: "Una semana de cultura dogón y de las culturas de Malí, en la plaza del Cincuentenario de Bamako.",
        description:
          "Organizado desde 2016 por la asociación Ginna Dogon, Ogobagna instala cada año en Bamako una aldea efímera que recrea espacios del país dogón: plaza del Hogon, toguna, museo y barrios de las comunidades invitadas. Danzas de máscaras, danzas tradicionales, artesanía, gastronomía, conferencias y veladas de cohesión social atraen a decenas de miles de visitantes. La 11.ª edición se celebró del 26 de enero al 1 de febrero de 2026, con las comunidades bozo como invitadas de honor.",
        tips: "Mucha afluencia el fin de semana; entrada y programa anunciados por la asociación organizadora.",
        where: "Bamako, plaza del Cincuentenario",
        dateNote: "Una semana entre finales de enero y principios de febrero, fechas anunciadas cada año por la asociación Ginna Dogon.",
      },
      pt: {
        name: "Festival Ogobagna",
        summary: "Uma semana de cultura dogon e das culturas do Mali, na praça do Cinquentenário em Bamako.",
        description:
          "Organizado desde 2016 pela associação Ginna Dogon, o Ogobagna instala todos os anos em Bamako uma aldeia efémera que recria espaços do país dogon: praça do Hogon, toguna, museu e bairros das comunidades convidadas. Danças de máscaras, danças tradicionais, artesanato, gastronomia, conferências e serões de coesão social atraem dezenas de milhares de visitantes. A 11.ª edição decorreu de 26 de janeiro a 1 de fevereiro de 2026, com as comunidades bozo como convidadas de honra.",
        tips: "Grande afluência ao fim de semana; entrada e programa anunciados pela associação organizadora.",
        where: "Bamako, praça do Cinquentenário",
        dateNote: "Uma semana entre o fim de janeiro e o início de fevereiro, datas anunciadas todos os anos pela associação Ginna Dogon.",
      },
      ar: {
        name: "مهرجان أوغوبانيا",
        summary: "أسبوع من ثقافة الدوغون وثقافات مالي، في ساحة الخمسينية بباماكو.",
        description:
          "تنظّمه جمعية «جينا دوغون» منذ عام 2016، ويقيم مهرجان أوغوبانيا كل عام في باماكو قرية مؤقتة تحاكي فضاءات بلاد الدوغون: ساحة الهوغون والتوغونا ومتحف وأحياء للمجتمعات المدعوة. وتجتذب رقصات الأقنعة والرقصات التقليدية والحرف اليدوية وفنون الطهي والمحاضرات وسهرات التماسك الاجتماعي عشرات الآلاف من الزوار. وأُقيمت الدورة الحادية عشرة من 26 يناير إلى 1 فبراير 2026، وكانت مجتمعات البوزو ضيفة الشرف.",
        tips: "إقبال كبير في عطلة نهاية الأسبوع، وتعلن الجمعية المنظمة شروط الدخول والبرنامج.",
        where: "باماكو، ساحة الخمسينية",
        dateNote: "أسبوع بين أواخر يناير وأوائل فبراير، وتعلن جمعية جينا دوغون المواعيد كل عام.",
      },
    },
  },
  {
    slug: "rencontres-de-bamako",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 11, to: 1 },
    caution: true,
    destination: "bamako",
    cover: "/images/voyage/fete-rencontres-de-bamako",
    name: "Rencontres de Bamako, biennale africaine de la photographie",
    summary: "La grande biennale de la photographie africaine, avec expositions dans toute la ville.",
    description:
      "Depuis les années 1990, les Rencontres de Bamako présentent le meilleur de la photographie africaine et de sa diaspora, dans l'héritage des maîtres maliens du portrait comme Seydou Keïta et Malick Sidibé. Expositions dans plusieurs lieux de la ville, résidences d'artistes, rencontres professionnelles et projets spéciaux se succèdent pendant deux mois. La 15e édition, sur le thème « Refabulation(s) », est annoncée du 26 novembre 2026 au 26 janvier 2027.",
    tips: "Biennale : vérifiez l'année d'édition et le programme officiel avant de prévoir votre visite.",
    where: "Bamako (plusieurs lieux d'exposition)",
    dateNote: "Biennale (années paires) : environ deux mois de fin novembre à fin janvier ; dates annoncées par les autorités culturelles (26 novembre 2026 - 26 janvier 2027).",
    sources: [
      "https://telquel.ma/instant-t/2026/02/27/mali-bamako-accueillera-la-15%e1%b5%89-biennale-africaine-de-la-photographie-fin-2026-debut-2027_1976809/",
      "https://fr.apanews.net/technologies/mali-la-15%e1%b5%89-biennale-africaine-de-la-photographie-en-fin-2026/",
    ],
    en: {
      name: "Rencontres de Bamako, African Biennale of Photography",
      summary: "The major biennale of African photography, with exhibitions across the city.",
      description:
        "Since the 1990s the Rencontres de Bamako have showcased the best of African and diaspora photography, in the tradition of the Malian portrait masters Seydou Keïta and Malick Sidibé. Exhibitions at several venues around the city, artist residencies, professional meetings and special projects run for two months. The 15th edition, themed “Refabulation(s)”, is announced for 26 November 2026 to 26 January 2027.",
      tips: "A biennale: check the edition year and the official programme before planning your visit.",
      where: "Bamako (several exhibition venues)",
      dateNote: "Biennial (even years): about two months from late November to late January; dates announced by the cultural authorities (26 November 2026 – 26 January 2027).",
    },
    i18n: {
      es: {
        name: "Encuentros de Bamako, bienal africana de la fotografía",
        summary: "La gran bienal de la fotografía africana, con exposiciones por toda la ciudad.",
        description:
          "Desde los años noventa, los Encuentros de Bamako presentan lo mejor de la fotografía africana y de su diáspora, en la herencia de los maestros malienses del retrato como Seydou Keïta y Malick Sidibé. Exposiciones en varios espacios de la ciudad, residencias de artistas, encuentros profesionales y proyectos especiales se suceden durante dos meses. La 15.ª edición, con el tema «Refabulation(s)», está anunciada del 26 de noviembre de 2026 al 26 de enero de 2027.",
        tips: "Bienal: compruebe el año de la edición y el programa oficial antes de planificar su visita.",
        where: "Bamako (varios espacios de exposición)",
        dateNote: "Bienal (años pares): unos dos meses de finales de noviembre a finales de enero; fechas anunciadas por las autoridades culturales (26 de noviembre de 2026 - 26 de enero de 2027).",
      },
      pt: {
        name: "Encontros de Bamako, bienal africana da fotografia",
        summary: "A grande bienal da fotografia africana, com exposições por toda a cidade.",
        description:
          "Desde os anos 1990, os Encontros de Bamako apresentam o melhor da fotografia africana e da sua diáspora, na herança dos mestres malianos do retrato como Seydou Keïta e Malick Sidibé. Exposições em vários locais da cidade, residências artísticas, encontros profissionais e projetos especiais sucedem-se durante dois meses. A 15.ª edição, com o tema «Refabulation(s)», está anunciada de 26 de novembro de 2026 a 26 de janeiro de 2027.",
        tips: "Bienal: confirme o ano da edição e o programa oficial antes de planear a sua visita.",
        where: "Bamako (vários locais de exposição)",
        dateNote: "Bienal (anos pares): cerca de dois meses, do fim de novembro ao fim de janeiro; datas anunciadas pelas autoridades culturais (26 de novembro de 2026 - 26 de janeiro de 2027).",
      },
      ar: {
        name: "لقاءات باماكو، البينالي الأفريقي للتصوير الفوتوغرافي",
        summary: "البينالي الكبير للتصوير الفوتوغرافي الأفريقي، مع معارض في أنحاء المدينة.",
        description:
          "منذ تسعينيات القرن العشرين، تعرض «لقاءات باماكو» أفضل أعمال التصوير الفوتوغرافي الأفريقي وفي الشتات، على خطى أساتذة البورتريه الماليين مثل سيدو كيتا ومالك سيديبي. وتتوالى على مدى شهرين معارض في عدة أماكن من المدينة، وإقامات فنية ولقاءات مهنية ومشاريع خاصة. وأُعلن عن الدورة الخامسة عشرة، تحت شعار «Refabulation(s)»، من 26 نوفمبر 2026 إلى 26 يناير 2027.",
        tips: "بينالي كل عامين: تحقّق من سنة الدورة والبرنامج الرسمي قبل التخطيط لزيارتك.",
        where: "باماكو (عدة أماكن عرض)",
        dateNote: "كل عامين (السنوات الزوجية): نحو شهرين من أواخر نوفمبر إلى أواخر يناير، وتعلن السلطات الثقافية المواعيد (26 نوفمبر 2026 - 26 يناير 2027).",
      },
    },
  },
];
