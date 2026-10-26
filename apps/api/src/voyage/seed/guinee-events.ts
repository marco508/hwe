/**
 * Fêtes, jours fériés, festivals et temps forts saisonniers (guinee).
 * Voir SeedEvent (./types). Contenu non relu : `reviewed = false`.
 *
 * Jours fériés : décret D/250/PRG/SGG du 1er août 1995 relatif aux fêtes
 * légales, modifié par le décret D/2022/0526/PRG/CNRD/SGG du 2 novembre 2022
 * (toujours cité par les communiqués du ministère chargé du Travail en
 * 2024-2026). Chaque année, le ministère confirme par communiqué la date des
 * fêtes musulmanes et les reports.
 */

import type { SeedEvent } from "./types";

const DECRET_2022 = "https://guineenews.org/2022/11/03/fetes-legales-desormais-le-lendemain-de-la-fete-de-tabaski-est-ferie-en-guinee/";
const PLAYROLL = "https://www.playroll.com/compliance-hub/public-holiday-regulations-in-guinea-conakry";

export const GUINEE_EVENTS: SeedEvent[] = [
  {
    slug: "nouvel-an-guinee",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 1, day: 1 },
    where: "Dans tout le pays",
    name: "Jour de l'An",
    summary: "Premier jour de l'année, férié, chômé et payé dans tout le pays.",
    description:
      "Le 1er janvier clôt la saison des fêtes de fin d'année, particulièrement animée à Conakry où la nuit du 31 décembre se fête en famille, entre amis et dans les lieux de sortie. La journée est consacrée aux visites et aux vœux. Administrations, banques et la plupart des commerces sont fermés.",
    tips: "La nuit du 31 décembre est l'une des plus chargées de l'année sur les routes : évitez de circuler de nuit et réservez votre transport à l'avance. Prévoyez des espèces, les banques étant fermées.",
    dateNote: "Fixe. Si le 1er janvier tombe un jour non ouvrable, le premier jour ouvrable suivant est déclaré férié (décret de 2022).",
    sources: [DECRET_2022, "https://kytisa.com/guinee-la-journee-du-1er-janvier-2026-declaree-feriee/"],
    en: {
      name: "New Year's Day",
      summary: "The first day of the year, a paid public holiday throughout the country.",
      description:
        "1 January closes the festive season, which is especially lively in Conakry, where New Year's Eve is celebrated with family, friends and in nightspots. The day itself is devoted to visits and New Year wishes. Government offices, banks and most shops are closed.",
      tips: "New Year's Eve is one of the busiest nights of the year on the roads: avoid travelling after dark and book transport in advance. Carry cash, as banks are closed.",
      where: "Throughout the country",
      dateNote: "Fixed. If 1 January falls on a non-working day, the next working day is declared a holiday (2022 decree).",
    },
    i18n: {
      es: {
        name: "Año Nuevo",
        summary: "Primer día del año, festivo, no laborable y remunerado en todo el país.",
        description:
          "El 1 de enero cierra la temporada de fiestas de fin de año, especialmente animada en Conakry, donde la noche del 31 de diciembre se celebra en familia, con amigos y en los lugares de ocio. El día se dedica a las visitas y a las felicitaciones. Administraciones, bancos y la mayoría de los comercios cierran.",
        tips: "La noche del 31 de diciembre es una de las de más tráfico del año: evite circular de noche y reserve su transporte con antelación. Lleve efectivo, ya que los bancos están cerrados.",
        where: "En todo el país",
        dateNote: "Fija. Si el 1 de enero cae en día no laborable, el siguiente día laborable se declara festivo (decreto de 2022).",
      },
      pt: {
        name: "Dia de Ano Novo",
        summary: "Primeiro dia do ano, feriado pago em todo o país.",
        description:
          "O 1 de janeiro encerra a época festiva de fim de ano, especialmente animada em Conakry, onde a noite de 31 de dezembro se celebra em família, com amigos e nos locais de diversão. O dia é dedicado a visitas e votos de bom ano. Serviços públicos, bancos e a maioria das lojas estão fechados.",
        tips: "A noite de 31 de dezembro é uma das mais movimentadas do ano nas estradas: evite circular de noite e reserve o transporte com antecedência. Leve dinheiro, pois os bancos estão fechados.",
        where: "Em todo o país",
        dateNote: "Fixa. Se o 1 de janeiro calhar num dia não útil, o primeiro dia útil seguinte é declarado feriado (decreto de 2022).",
      },
      ar: {
        name: "رأس السنة الميلادية",
        summary: "أول أيام السنة، عطلة رسمية مدفوعة الأجر في جميع أنحاء البلاد.",
        description:
          "يختتم الأول من يناير موسم أعياد نهاية السنة، الذي يكون حيويًا بشكل خاص في كوناكري حيث تُحتفل ليلة 31 ديسمبر مع العائلة والأصدقاء وفي أماكن السهر. ويُخصَّص اليوم للزيارات وتبادل التهاني. تُغلق الإدارات والمصارف ومعظم المتاجر.",
        tips: "ليلة 31 ديسمبر من أكثر ليالي السنة ازدحامًا على الطرق: تجنّب التنقل ليلًا واحجز وسيلة نقلك مسبقًا. احمل نقودًا لأن المصارف مغلقة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "تاريخ ثابت. إذا صادف الأول من يناير يوم عطلة، يُعلَن أول يوم عمل يليه عطلة رسمية (مرسوم 2022).",
      },
    },
  },
  {
    slug: "lundi-de-paques-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 1 },
    where: "Dans tout le pays",
    name: "Lundi de Pâques",
    summary: "Lendemain de Pâques, jour férié célébré par la communauté chrétienne.",
    description:
      "La communauté chrétienne, minoritaire mais présente surtout à Conakry et en Guinée forestière, célèbre Pâques par des veillées et des messes très suivies, notamment à la cathédrale Sainte-Marie de Conakry. Le lundi de Pâques est férié, chômé et payé pour tous les travailleurs. C'est une journée de visites familiales et de repas partagés.",
    tips: "Pour assister à un office, arrivez tôt et adoptez une tenue correcte. Le vendredi saint n'est pas férié.",
    dateNote: "Variable : lendemain du dimanche de Pâques (calendrier grégorien), confirmé chaque année par communiqué du ministère.",
    sources: [DECRET_2022, "https://guineenews.org/2024/03/29/guinee-le-lundi-1er-avril-declare-ferie-chome-et-paye/"],
    en: {
      name: "Easter Monday",
      summary: "The day after Easter, a public holiday celebrated by the Christian community.",
      description:
        "The Christian community, a minority found mainly in Conakry and the Forest Region, celebrates Easter with vigils and well-attended masses, notably at Conakry's Saint Mary's Cathedral. Easter Monday is a paid public holiday for all workers. It is a day of family visits and shared meals.",
      tips: "To attend a service, arrive early and dress respectfully. Good Friday is not a public holiday.",
      where: "Throughout the country",
      dateNote: "Variable: the day after Easter Sunday (Gregorian calendar), confirmed each year by a ministry statement.",
    },
    i18n: {
      es: {
        name: "Lunes de Pascua",
        summary: "Día siguiente a Pascua, festivo celebrado por la comunidad cristiana.",
        description:
          "La comunidad cristiana, minoritaria y presente sobre todo en Conakry y en la Guinea Forestal, celebra la Pascua con vigilias y misas muy concurridas, en particular en la catedral de Santa María de Conakry. El lunes de Pascua es festivo, no laborable y remunerado para todos los trabajadores. Es un día de visitas familiares y comidas compartidas.",
        tips: "Para asistir a un oficio, llegue temprano y vista de forma adecuada. El Viernes Santo no es festivo.",
        where: "En todo el país",
        dateNote: "Variable: día siguiente al domingo de Pascua (calendario gregoriano), confirmado cada año por comunicado del ministerio.",
      },
      pt: {
        name: "Segunda-feira de Páscoa",
        summary: "Dia seguinte à Páscoa, feriado celebrado pela comunidade cristã.",
        description:
          "A comunidade cristã, minoritária e presente sobretudo em Conakry e na Guiné Florestal, celebra a Páscoa com vigílias e missas muito concorridas, nomeadamente na catedral de Santa Maria de Conakry. A segunda-feira de Páscoa é feriado pago para todos os trabalhadores. É um dia de visitas familiares e refeições partilhadas.",
        tips: "Para assistir a uma celebração, chegue cedo e vista-se de forma adequada. A Sexta-feira Santa não é feriado.",
        where: "Em todo o país",
        dateNote: "Variável: dia seguinte ao domingo de Páscoa (calendário gregoriano), confirmado todos os anos por comunicado do ministério.",
      },
      ar: {
        name: "اثنين الفصح",
        summary: "اليوم التالي لعيد الفصح، عطلة رسمية تحتفل بها الجماعة المسيحية.",
        description:
          "تحتفل الجماعة المسيحية، وهي أقلية تتركز خاصة في كوناكري وغينيا الغابية، بعيد الفصح بسهرات صلاة وقداسات يكثر حضورها، لا سيما في كاتدرائية القديسة مريم في كوناكري. ويُعدّ اثنين الفصح عطلة رسمية مدفوعة الأجر لجميع العاملين. إنه يوم للزيارات العائلية والوجبات المشتركة.",
        tips: "لحضور قداس، احضر مبكرًا والبس لباسًا محتشمًا. الجمعة العظيمة ليست عطلة رسمية.",
        where: "في جميع أنحاء البلاد",
        dateNote: "متغيّر: اليوم التالي لأحد الفصح (التقويم الغريغوري)، ويؤكَّد كل عام ببلاغ من الوزارة.",
      },
    },
  },
  {
    slug: "fete-du-travail-guinee",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 1 },
    where: "Dans tout le pays",
    name: "Fête du Travail",
    summary: "Journée internationale des travailleurs, fériée, chômée et payée.",
    description:
      "Le 1er mai est marqué par les célébrations des centrales syndicales et, certaines années, par des défilés et des cérémonies officielles à Conakry. La journée est fériée pour les secteurs public, privé et mixte. Administrations et banques sont fermées.",
    tips: "Tenez-vous à l'écart des rassemblements à caractère revendicatif et prévoyez vos démarches administratives un autre jour.",
    dateNote: "Fixe.",
    sources: [DECRET_2022, PLAYROLL],
    en: {
      name: "Labour Day",
      summary: "International Workers' Day, a paid public holiday.",
      description:
        "1 May is marked by trade-union celebrations and, in some years, by parades and official ceremonies in Conakry. It is a holiday for the public, private and mixed sectors. Government offices and banks are closed.",
      tips: "Keep away from protest gatherings and plan any administrative errands for another day.",
      where: "Throughout the country",
      dateNote: "Fixed.",
    },
    i18n: {
      es: {
        name: "Día del Trabajo",
        summary: "Día Internacional de los Trabajadores, festivo, no laborable y remunerado.",
        description:
          "El 1 de mayo está marcado por las celebraciones de los sindicatos y, algunos años, por desfiles y ceremonias oficiales en Conakry. Es festivo para los sectores público, privado y mixto. Administraciones y bancos cierran.",
        tips: "Manténgase alejado de las concentraciones reivindicativas y prevea sus trámites administrativos otro día.",
        where: "En todo el país",
        dateNote: "Fija.",
      },
      pt: {
        name: "Dia do Trabalhador",
        summary: "Dia Internacional dos Trabalhadores, feriado pago.",
        description:
          "O 1 de maio é marcado pelas celebrações das centrais sindicais e, em alguns anos, por desfiles e cerimónias oficiais em Conakry. É feriado para os setores público, privado e misto. Serviços públicos e bancos estão fechados.",
        tips: "Mantenha-se afastado de concentrações reivindicativas e planeie as suas diligências administrativas para outro dia.",
        where: "Em todo o país",
        dateNote: "Fixa.",
      },
      ar: {
        name: "عيد العمال",
        summary: "اليوم العالمي للعمال، عطلة رسمية مدفوعة الأجر.",
        description:
          "يتميّز الأول من مايو باحتفالات النقابات العمالية، وفي بعض السنوات باستعراضات ومراسم رسمية في كوناكري. وهو يوم عطلة للقطاعات العامة والخاصة والمختلطة. تُغلق الإدارات والمصارف.",
        tips: "ابتعد عن التجمعات ذات الطابع الاحتجاجي وخطّط لمعاملاتك الإدارية في يوم آخر.",
        where: "في جميع أنحاء البلاد",
        dateNote: "تاريخ ثابت.",
      },
    },
  },
  {
    slug: "journee-de-l-afrique-guinee",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 25 },
    where: "Dans tout le pays",
    name: "Journée de l'Afrique (anniversaire de l'Union africaine)",
    summary: "Anniversaire de la fondation de l'OUA en 1963, jour férié en Guinée.",
    description:
      "Le 25 mai commémore la création, en 1963 à Addis-Abeba, de l'Organisation de l'unité africaine, devenue l'Union africaine. La Guinée, dont le premier président Ahmed Sékou Touré fut l'un des pères fondateurs de l'organisation, en a fait un jour férié, chômé et payé. Conférences, émissions et manifestations culturelles célèbrent l'unité africaine.",
    tips: "Administrations et banques sont fermées : anticipez vos retraits d'espèces.",
    dateNote: "Fixe.",
    sources: [DECRET_2022, "https://guineenews.org/2024/05/24/celebration-de-lunion-africaine-la-journee-du-25-mai-declaree-feriee/"],
    en: {
      name: "Africa Day (African Union anniversary)",
      summary: "Anniversary of the founding of the OAU in 1963, a public holiday in Guinea.",
      description:
        "25 May commemorates the founding in 1963, in Addis Ababa, of the Organisation of African Unity, now the African Union. Guinea, whose first president Ahmed Sékou Touré was one of the organisation's founding fathers, observes it as a paid public holiday. Talks, broadcasts and cultural events celebrate African unity.",
      tips: "Government offices and banks are closed: withdraw cash in advance.",
      where: "Throughout the country",
      dateNote: "Fixed.",
    },
    i18n: {
      es: {
        name: "Día de África (aniversario de la Unión Africana)",
        summary: "Aniversario de la fundación de la OUA en 1963, festivo en Guinea.",
        description:
          "El 25 de mayo conmemora la creación, en 1963 en Adís Abeba, de la Organización para la Unidad Africana, hoy Unión Africana. Guinea, cuyo primer presidente, Ahmed Sékou Touré, fue uno de los padres fundadores de la organización, lo celebra como festivo, no laborable y remunerado. Conferencias, programas y actos culturales celebran la unidad africana.",
        tips: "Administraciones y bancos cierran: saque efectivo con antelación.",
        where: "En todo el país",
        dateNote: "Fija.",
      },
      pt: {
        name: "Dia de África (aniversário da União Africana)",
        summary: "Aniversário da fundação da OUA em 1963, feriado na Guiné.",
        description:
          "O 25 de maio comemora a criação, em 1963 em Adis Abeba, da Organização da Unidade Africana, hoje União Africana. A Guiné, cujo primeiro presidente, Ahmed Sékou Touré, foi um dos pais fundadores da organização, celebra-o como feriado pago. Conferências, emissões e manifestações culturais celebram a unidade africana.",
        tips: "Serviços públicos e bancos estão fechados: levante dinheiro com antecedência.",
        where: "Em todo o país",
        dateNote: "Fixa.",
      },
      ar: {
        name: "يوم أفريقيا (ذكرى تأسيس الاتحاد الأفريقي)",
        summary: "ذكرى تأسيس منظمة الوحدة الأفريقية عام 1963، عطلة رسمية في غينيا.",
        description:
          "يُحيي 25 مايو ذكرى تأسيس منظمة الوحدة الأفريقية عام 1963 في أديس أبابا، التي أصبحت الاتحاد الأفريقي. وتعتبره غينيا، التي كان رئيسها الأول أحمد سيكو توري من الآباء المؤسسين للمنظمة، عطلة رسمية مدفوعة الأجر. وتحتفي المحاضرات والبرامج والفعاليات الثقافية بالوحدة الأفريقية.",
        tips: "تُغلق الإدارات والمصارف: اسحب النقود مسبقًا.",
        where: "في جميع أنحاء البلاد",
        dateNote: "تاريخ ثابت.",
      },
    },
  },
  {
    slug: "ramadan-guinee",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 1, days: 30 },
    where: "Dans tout le pays",
    name: "Mois du ramadan",
    summary: "Mois de jeûne observé par la grande majorité des Guinéens, qui rythme toute la vie du pays.",
    description:
      "La population guinéenne étant très majoritairement musulmane, le ramadan transforme le quotidien : journées plus calmes, horaires de travail aménagés, rues qui s'animent au coucher du soleil pour la rupture du jeûne, mosquées pleines pour les prières du soir. Les nuits les plus importantes sont celles de la fin du mois, dont la Nuit du Destin. Le mois s'achève par la Korité.",
    tips: "Évitez de manger, boire ou fumer ostensiblement en public dans la journée. Prévoyez des délais plus longs pour les démarches et des restaurants parfois fermés le midi hors de Conakry. Acceptez volontiers une invitation à rompre le jeûne.",
    dateNote: "Variable : commence à l'observation du croissant de lune du mois de ramadan, annoncée la veille par les autorités religieuses ; dure 29 ou 30 jours. Date estimée à ±1 jour.",
    sources: ["https://guineenews.org/2026/03/13/guinee-le-lundi-16-mars-declare-ferie/", "https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/guinee/"],
    en: {
      name: "Month of Ramadan",
      summary: "The month of fasting observed by the vast majority of Guineans, setting the rhythm of the whole country.",
      description:
        "With a population that is overwhelmingly Muslim, Ramadan transforms daily life: quieter days, adjusted working hours, streets coming alive at sunset to break the fast, and mosques packed for evening prayers. The most important nights come at the end of the month, including the Night of Destiny. The month ends with Eid al-Fitr (Korité).",
      tips: "Avoid eating, drinking or smoking conspicuously in public during the day. Allow more time for errands and expect some restaurants outside Conakry to close at lunchtime. Gladly accept an invitation to break the fast.",
      where: "Throughout the country",
      dateNote: "Variable: begins with the sighting of the Ramadan crescent moon, announced the evening before by religious authorities; lasts 29 or 30 days. Date estimated to within ±1 day.",
    },
    i18n: {
      es: {
        name: "Mes de ramadán",
        summary: "Mes de ayuno observado por la gran mayoría de los guineanos, que marca el ritmo de todo el país.",
        description:
          "Al ser la población guineana mayoritariamente musulmana, el ramadán transforma la vida diaria: días más tranquilos, horarios de trabajo adaptados, calles que se animan al ponerse el sol para romper el ayuno y mezquitas llenas para las oraciones nocturnas. Las noches más importantes son las del final del mes, entre ellas la Noche del Destino. El mes termina con la Korité.",
        tips: "Evite comer, beber o fumar de forma ostensible en público durante el día. Prevea más tiempo para los trámites y restaurantes a veces cerrados al mediodía fuera de Conakry. Acepte con gusto una invitación a romper el ayuno.",
        where: "En todo el país",
        dateNote: "Variable: comienza con la observación de la luna creciente del mes de ramadán, anunciada la víspera por las autoridades religiosas; dura 29 o 30 días. Fecha estimada con ±1 día.",
      },
      pt: {
        name: "Mês do Ramadão",
        summary: "Mês de jejum observado pela grande maioria dos guineenses, que marca o ritmo de todo o país.",
        description:
          "Sendo a população guineense maioritariamente muçulmana, o Ramadão transforma o quotidiano: dias mais calmos, horários de trabalho ajustados, ruas que se animam ao pôr do sol para a quebra do jejum e mesquitas cheias para as orações da noite. As noites mais importantes são as do fim do mês, entre elas a Noite do Destino. O mês termina com a Korité.",
        tips: "Evite comer, beber ou fumar ostensivamente em público durante o dia. Conte com mais tempo para tratar de assuntos e com restaurantes por vezes fechados ao almoço fora de Conakry. Aceite de bom grado um convite para quebrar o jejum.",
        where: "Em todo o país",
        dateNote: "Variável: começa com a observação do crescente lunar do mês do Ramadão, anunciada na véspera pelas autoridades religiosas; dura 29 ou 30 dias. Data estimada com ±1 dia.",
      },
      ar: {
        name: "شهر رمضان",
        summary: "شهر الصيام الذي يلتزم به معظم الغينيين ويضبط إيقاع الحياة في البلاد كلها.",
        description:
          "بما أن غالبية السكان مسلمون، يغيّر رمضان الحياة اليومية: أيام أهدأ، ومواعيد عمل معدَّلة، وشوارع تنبض بالحياة عند الغروب لموعد الإفطار، ومساجد مكتظة لصلوات الليل. وأهم الليالي هي ليالي آخر الشهر، ومنها ليلة القدر. ويُختتم الشهر بعيد الفطر.",
        tips: "تجنّب الأكل أو الشرب أو التدخين علنًا في النهار. توقّع مهلًا أطول للمعاملات وإغلاق بعض المطاعم ظهرًا خارج كوناكري. واقبل بسرور دعوة إلى الإفطار.",
        where: "في جميع أنحاء البلاد",
        dateNote: "متغيّر: يبدأ برؤية هلال شهر رمضان التي تعلنها السلطات الدينية في الليلة السابقة، ويستمر 29 أو 30 يومًا. التاريخ تقديري بفارق يوم واحد.",
      },
    },
  },
  {
    slug: "lendemain-laylat-al-qadr-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 9, day: 27 },
    where: "Dans tout le pays",
    name: "Lendemain de la Nuit du Destin (Laylat al-Qadr)",
    summary: "Jour férié qui suit la Nuit du Destin, l'une des nuits les plus sacrées du ramadan.",
    description:
      "La Nuit du Destin commémore la révélation des premiers versets du Coran. En Guinée, elle est célébrée lors de la nuit du 27e jour du ramadan par des veillées de prière et de lecture du Coran dans les mosquées et les foyers. Le lendemain est férié, chômé et payé pour permettre aux fidèles de se consacrer aux dévotions.",
    tips: "Les mosquées sont combles toute la nuit : évitez de stationner devant et restez discret. Les administrations sont fermées le lendemain.",
    dateNote: "Variable : jour qui suit la nuit du 27 ramadan, annoncé chaque année par communiqué du ministère chargé du Travail (16 mars en 2026). Date estimée à ±1 jour.",
    sources: [DECRET_2022, "https://guineenews.org/2026/03/13/guinee-le-lundi-16-mars-declare-ferie/"],
    en: {
      name: "Day after the Night of Destiny (Laylat al-Qadr)",
      summary: "The public holiday following the Night of Destiny, one of the holiest nights of Ramadan.",
      description:
        "The Night of Destiny commemorates the revelation of the first verses of the Quran. In Guinea it is observed on the night of the 27th day of Ramadan with prayer vigils and Quran readings in mosques and homes. The following day is a paid public holiday so that the faithful can devote themselves to worship.",
      tips: "Mosques are packed all night: avoid parking in front of them and stay discreet. Government offices are closed the next day.",
      where: "Throughout the country",
      dateNote: "Variable: the day after the night of 27 Ramadan, announced each year by a Labour ministry statement (16 March in 2026). Date estimated to within ±1 day.",
    },
    i18n: {
      es: {
        name: "Día siguiente a la Noche del Destino (Laylat al-Qadr)",
        summary: "Festivo que sigue a la Noche del Destino, una de las noches más sagradas del ramadán.",
        description:
          "La Noche del Destino conmemora la revelación de los primeros versículos del Corán. En Guinea se celebra la noche del día 27 de ramadán con vigilias de oración y lectura del Corán en las mezquitas y los hogares. El día siguiente es festivo, no laborable y remunerado para que los fieles puedan dedicarse a la devoción.",
        tips: "Las mezquitas están llenas toda la noche: evite aparcar delante y sea discreto. Las administraciones cierran al día siguiente.",
        where: "En todo el país",
        dateNote: "Variable: día siguiente a la noche del 27 de ramadán, anunciado cada año por comunicado del ministerio de Trabajo (16 de marzo en 2026). Fecha estimada con ±1 día.",
      },
      pt: {
        name: "Dia seguinte à Noite do Destino (Laylat al-Qadr)",
        summary: "Feriado que se segue à Noite do Destino, uma das noites mais sagradas do Ramadão.",
        description:
          "A Noite do Destino comemora a revelação dos primeiros versículos do Corão. Na Guiné, é celebrada na noite do 27.º dia do Ramadão com vigílias de oração e leitura do Corão nas mesquitas e nas casas. O dia seguinte é feriado pago, para que os fiéis se possam dedicar às devoções.",
        tips: "As mesquitas estão cheias toda a noite: evite estacionar à frente e seja discreto. Os serviços públicos fecham no dia seguinte.",
        where: "Em todo o país",
        dateNote: "Variável: dia seguinte à noite de 27 do Ramadão, anunciado todos os anos por comunicado do ministério do Trabalho (16 de março em 2026). Data estimada com ±1 dia.",
      },
      ar: {
        name: "اليوم التالي لليلة القدر",
        summary: "عطلة رسمية تلي ليلة القدر، إحدى أقدس ليالي رمضان.",
        description:
          "تُحيي ليلة القدر ذكرى نزول أولى آيات القرآن. وفي غينيا تُحيا ليلة السابع والعشرين من رمضان بسهرات صلاة وتلاوة للقرآن في المساجد والبيوت. ويكون اليوم التالي عطلة رسمية مدفوعة الأجر ليتفرغ المؤمنون للعبادة.",
        tips: "تكتظ المساجد طوال الليل: تجنّب الوقوف أمامها والتزم الهدوء. تُغلق الإدارات في اليوم التالي.",
        where: "في جميع أنحاء البلاد",
        dateNote: "متغيّر: اليوم التالي لليلة 27 رمضان، ويُعلَن كل عام ببلاغ من وزارة العمل (16 مارس في 2026). التاريخ تقديري بفارق يوم واحد.",
      },
    },
  },
  {
    slug: "korite-aid-el-fitr-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 10, day: 1 },
    where: "Dans tout le pays",
    name: "Korité (Aïd el-Fitr)",
    summary: "Fête de la fin du ramadan, l'un des jours les plus festifs de l'année.",
    description:
      "Au lendemain de l'apparition du croissant de lune, les fidèles se rassemblent dès le matin pour la grande prière de l'Aïd, dans les mosquées et sur les esplanades ; à Conakry, la cour de la Grande Mosquée Fayçal déborde de monde. Chacun revêt ses plus beaux habits, on rend visite à la famille et aux voisins, on demande pardon et on partage des repas de fête. La journée est fériée, chômée et payée.",
    tips: "Tenue correcte si vous approchez des lieux de prière, et pas de photo sans autorisation. Circulation très difficile autour des grandes mosquées après la prière. Commerces et banques fermés : prévoyez des espèces.",
    dateNote: "Variable : 1er chawwal, fixé selon l'observation de la lune et annoncé la veille au soir ; si la fête tombe un jour non ouvrable, le premier jour ouvrable suivant est férié (décret de 2022). Date estimée à ±1 jour.",
    cover: "/images/voyage/fete-korite-aid-el-fitr-guinee",
    sources: [DECRET_2022, "https://guineenews.org/2024/04/10/fete-de-laid-el-fitr-la-journee-du-10-avril-est-feriee-en-guinee/"],
    en: {
      name: "Korité (Eid al-Fitr)",
      summary: "The festival marking the end of Ramadan, one of the most festive days of the year.",
      description:
        "The day after the new moon is sighted, the faithful gather in the morning for the great Eid prayer in mosques and on open esplanades; in Conakry the courtyard of the Grand Mosque Faisal overflows with worshippers. Everyone wears their finest clothes, visits family and neighbours, asks forgiveness and shares festive meals. It is a paid public holiday.",
      tips: "Dress respectfully near places of prayer and do not take photos without permission. Traffic is very heavy around the big mosques after prayers. Shops and banks are closed: carry cash.",
      where: "Throughout the country",
      dateNote: "Variable: 1 Shawwal, set by the sighting of the moon and announced the evening before; if it falls on a non-working day, the next working day is a holiday (2022 decree). Date estimated to within ±1 day.",
    },
    i18n: {
      es: {
        name: "Korité (Aíd al-Fitr)",
        summary: "Fiesta del final del ramadán, uno de los días más festivos del año.",
        description:
          "Al día siguiente de la aparición de la luna creciente, los fieles se reúnen por la mañana para la gran oración del Aíd en las mezquitas y explanadas; en Conakry, el patio de la Gran Mezquita Faisal se llena de gente. Todos visten sus mejores galas, visitan a la familia y a los vecinos, piden perdón y comparten comidas festivas. Es festivo, no laborable y remunerado.",
        tips: "Vista de forma adecuada cerca de los lugares de oración y no haga fotos sin permiso. Tráfico muy difícil alrededor de las grandes mezquitas tras la oración. Comercios y bancos cerrados: lleve efectivo.",
        where: "En todo el país",
        dateNote: "Variable: 1 de shawwal, fijado según la observación de la luna y anunciado la víspera por la noche; si cae en día no laborable, el siguiente día laborable es festivo (decreto de 2022). Fecha estimada con ±1 día.",
      },
      pt: {
        name: "Korité (Eid al-Fitr)",
        summary: "Festa do fim do Ramadão, um dos dias mais festivos do ano.",
        description:
          "No dia seguinte ao aparecimento do crescente lunar, os fiéis reúnem-se de manhã para a grande oração do Eid, nas mesquitas e em esplanadas; em Conakry, o pátio da Grande Mesquita Faisal enche-se de gente. Todos vestem as suas melhores roupas, visitam a família e os vizinhos, pedem perdão e partilham refeições festivas. É feriado pago.",
        tips: "Vista-se de forma adequada perto dos locais de oração e não fotografe sem autorização. Trânsito muito difícil à volta das grandes mesquitas depois da oração. Lojas e bancos fechados: leve dinheiro.",
        where: "Em todo o país",
        dateNote: "Variável: 1 de chawwal, fixado segundo a observação da lua e anunciado na véspera à noite; se calhar num dia não útil, o primeiro dia útil seguinte é feriado (decreto de 2022). Data estimada com ±1 dia.",
      },
      ar: {
        name: "عيد الفطر (الكوريتي)",
        summary: "عيد نهاية رمضان، من أكثر أيام السنة بهجة.",
        description:
          "في اليوم التالي لرؤية الهلال، يجتمع المؤمنون صباحًا لصلاة العيد في المساجد والساحات؛ وفي كوناكري تفيض ساحة مسجد الملك فيصل الكبير بالمصلين. يرتدي الجميع أجمل ثيابهم، ويزورون الأهل والجيران، ويتبادلون طلب المسامحة والوجبات الاحتفالية. وهو يوم عطلة رسمية مدفوعة الأجر.",
        tips: "البس لباسًا محتشمًا قرب أماكن الصلاة ولا تلتقط صورًا دون إذن. حركة السير صعبة جدًا حول المساجد الكبرى بعد الصلاة. المتاجر والمصارف مغلقة: احمل نقودًا.",
        where: "في جميع أنحاء البلاد",
        dateNote: "متغيّر: الأول من شوال، يُحدَّد برؤية الهلال ويُعلَن مساء اليوم السابق؛ وإذا صادف يوم عطلة يكون أول يوم عمل يليه عطلة رسمية (مرسوم 2022). التاريخ تقديري بفارق يوم واحد.",
      },
    },
  },
  {
    slug: "tabaski-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 12, day: 10, days: 2 },
    where: "Dans tout le pays",
    name: "Tabaski (Aïd el-Kébir)",
    summary: "Grande fête du sacrifice, avec deux jours fériés : le jour de la fête et son lendemain.",
    description:
      "La Tabaski commémore le sacrifice d'Abraham. Après la prière collective du matin, chaque famille qui le peut sacrifie un mouton, dont la viande est partagée avec les proches, les voisins et les plus démunis. C'est la fête familiale par excellence : nombreux sont ceux qui rentrent dans leur ville ou leur village d'origine, et des fêtes traditionnelles comme la Mamaya de Kankan ou le Kania Soli de Kindia l'accompagnent. Depuis 2022, le lendemain de la Tabaski est lui aussi férié, chômé et payé.",
    tips: "Les jours précédents, routes et gares routières sont saturées et les prix des transports augmentent : réservez tôt ou évitez de voyager. Respectez la prière et le rituel du sacrifice ; ne photographiez pas sans autorisation.",
    dateNote: "Variable : 10 dhou al-hijja, selon l'observation de la lune, avec le lendemain férié ; dates confirmées par communiqué du ministère (27 et 28 mai en 2026). Date estimée à ±1 jour.",
    sources: [DECRET_2022, "https://www.africaguinee.com/guinee-tabaski-2026-le-gouvernement-decrete-deux-jours-feries-chomes-et-payes/", "https://guineenews.org/2024/06/14/fete-de-tabaski-la-journee-du-lundi-17-juin-declaree-feriee-officiel/"],
    en: {
      name: "Tabaski (Eid al-Adha)",
      summary: "The great feast of sacrifice, with two public holidays: the feast day and the day after.",
      description:
        "Tabaski commemorates Abraham's sacrifice. After the communal morning prayer, every family that can afford it sacrifices a sheep, whose meat is shared with relatives, neighbours and the poor. It is the family festival par excellence: many people return to their home town or village, and traditional festivities such as the Mamaya in Kankan or the Kania Soli in Kindia go with it. Since 2022 the day after Tabaski has also been a paid public holiday.",
      tips: "In the days before, roads and bus stations are saturated and fares rise: book early or avoid travelling. Respect the prayer and the sacrifice ritual; do not take photos without permission.",
      where: "Throughout the country",
      dateNote: "Variable: 10 Dhu al-Hijjah, set by the sighting of the moon, with the following day also a holiday; dates confirmed by ministry statement (27 and 28 May in 2026). Date estimated to within ±1 day.",
    },
    i18n: {
      es: {
        name: "Tabaski (Aíd al-Adha)",
        summary: "Gran fiesta del sacrificio, con dos días festivos: el día de la fiesta y el siguiente.",
        description:
          "La Tabaski conmemora el sacrificio de Abraham. Tras la oración colectiva de la mañana, cada familia que puede sacrifica un cordero, cuya carne se reparte entre familiares, vecinos y los más necesitados. Es la fiesta familiar por excelencia: muchos regresan a su ciudad o pueblo de origen, y la acompañan fiestas tradicionales como la Mamaya de Kankan o el Kania Soli de Kindia. Desde 2022, el día siguiente a la Tabaski también es festivo, no laborable y remunerado.",
        tips: "Los días previos, carreteras y estaciones de autobuses están saturadas y los precios del transporte suben: reserve pronto o evite viajar. Respete la oración y el ritual del sacrificio; no haga fotos sin permiso.",
        where: "En todo el país",
        dateNote: "Variable: 10 de dhu al-hiyya, según la observación de la luna, con el día siguiente festivo; fechas confirmadas por comunicado del ministerio (27 y 28 de mayo en 2026). Fecha estimada con ±1 día.",
      },
      pt: {
        name: "Tabaski (Eid al-Adha)",
        summary: "Grande festa do sacrifício, com dois feriados: o dia da festa e o dia seguinte.",
        description:
          "A Tabaski comemora o sacrifício de Abraão. Depois da oração coletiva da manhã, cada família que pode sacrifica um carneiro, cuja carne é partilhada com familiares, vizinhos e os mais necessitados. É a festa familiar por excelência: muitos regressam à sua cidade ou aldeia de origem, e festas tradicionais como a Mamaya de Kankan ou o Kania Soli de Kindia acompanham-na. Desde 2022, o dia seguinte à Tabaski é também feriado pago.",
        tips: "Nos dias anteriores, estradas e estações rodoviárias ficam saturadas e os preços dos transportes sobem: reserve cedo ou evite viajar. Respeite a oração e o ritual do sacrifício; não fotografe sem autorização.",
        where: "Em todo o país",
        dateNote: "Variável: 10 de dhu al-hijja, segundo a observação da lua, com o dia seguinte também feriado; datas confirmadas por comunicado do ministério (27 e 28 de maio em 2026). Data estimada com ±1 dia.",
      },
      ar: {
        name: "عيد الأضحى (التباسكي)",
        summary: "عيد الأضحى الكبير، مع يومي عطلة رسمية: يوم العيد واليوم التالي له.",
        description:
          "يُحيي عيد الأضحى ذكرى فداء إبراهيم. بعد صلاة العيد الجماعية صباحًا، تذبح كل أسرة قادرة أضحية يُوزَّع لحمها على الأقارب والجيران والمحتاجين. إنه العيد العائلي بامتياز: يعود كثيرون إلى مدنهم أو قراهم الأصلية، وترافقه احتفالات تقليدية مثل الماماية في كانكان والكانيا سولي في كينديا. ومنذ 2022 أصبح اليوم التالي للعيد أيضًا عطلة رسمية مدفوعة الأجر.",
        tips: "في الأيام السابقة تزدحم الطرق ومحطات النقل وترتفع الأسعار: احجز مبكرًا أو تجنّب السفر. احترم الصلاة وشعيرة الذبح، ولا تلتقط صورًا دون إذن.",
        where: "في جميع أنحاء البلاد",
        dateNote: "متغيّر: العاشر من ذي الحجة حسب رؤية الهلال، مع عطلة في اليوم التالي؛ وتؤكد الوزارة التاريخين ببلاغ (27 و28 مايو في 2026). التاريخ تقديري بفارق يوم واحد.",
      },
    },
  },
  {
    slug: "mamaya-kankan",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "hijri", month: 12, day: 11, days: 3 },
    destination: "kankan",
    where: "Kankan (Haute-Guinée)",
    name: "Mamaya de Kankan",
    summary: "Grande fête dansée malinké de Kankan, célébrée dans les jours qui suivent la Tabaski.",
    description:
      "Née à Kankan dans les années 1930 au sein de la communauté malinké, la Mamaya est une danse collective en cercle, rythmée par les chants et les percussions, où hommes et femmes défilent en tenues traditionnelles coordonnées, canne à la main. Elle rassemble les générations, les associations de quartier et de nombreux ressortissants revenus pour la fête. Inscrite au patrimoine culturel national en 2018 et portée pour une candidature au patrimoine immatériel de l'UNESCO, elle a connu en 2026 sa 86e édition, avec des délégations invitées et des soirées qui se prolongent tard dans la nuit.",
    tips: "Les places sont prises d'assaut : arrivez tôt et restez en périphérie de la foule, les débordements ne sont pas rares. Logement rare à Kankan pendant la fête : réservez longtemps à l'avance. Ne prolongez pas votre route vers les zones frontalières du Mali, déconseillées sauf raison impérative.",
    dateNote: "Variable : commence en général le lendemain de la Tabaski et dure plusieurs jours (lancement le 29 juin 2023 et le 28 mai 2026) ; programme annoncé localement. Date estimée.",
    sources: [
      "https://guineenews.org/2024/09/05/culture-importance-role-et-caracteristiques-de-la-mamaya-dans-le-nabaya/",
      "https://guineenews.org/2026/05/28/kankan-la-86e-edition-de-la-mamaya-officiellement-lancee-sous-le-signe-de-la-renaissance-culturelle/?amp=1",
      "https://guineenews.org/2023/07/01/debuts-chaotiques-de-la-mamaya-arene-exigue-organisation-nulle-le-plaisir-de-doumbouya-gache-a-kankan/",
      "https://www.aip.ci/?p=370851",
    ],
    en: {
      name: "Mamaya of Kankan",
      summary: "Kankan's great Malinke dance festival, held in the days after Tabaski.",
      description:
        "Born in Kankan in the 1930s within the Malinke community, the Mamaya is a collective circle dance set to songs and drums, in which men and women parade in matching traditional outfits, cane in hand. It brings together generations, neighbourhood associations and many people from Kankan returning home for the festival. Listed as national cultural heritage in 2018 and the subject of a planned UNESCO intangible heritage bid, it held its 86th edition in 2026, with guest delegations and evenings that go on late into the night.",
      tips: "Spaces fill up fast: arrive early and stay on the edge of the crowd, as it can get out of hand. Accommodation in Kankan is scarce during the festival: book well ahead. Do not continue on towards the border areas with Mali, which are advised against except for essential travel.",
      where: "Kankan (Upper Guinea)",
      dateNote: "Variable: usually starts the day after Tabaski and lasts several days (launched on 29 June 2023 and 28 May 2026); programme announced locally. Estimated date.",
    },
    i18n: {
      es: {
        name: "Mamaya de Kankan",
        summary: "Gran fiesta bailada malinké de Kankan, celebrada en los días posteriores a la Tabaski.",
        description:
          "Nacida en Kankan en la década de 1930 en el seno de la comunidad malinké, la Mamaya es una danza colectiva en círculo, al ritmo de cantos y percusiones, en la que hombres y mujeres desfilan con trajes tradicionales a juego y bastón en mano. Reúne a varias generaciones, a las asociaciones de barrio y a muchos oriundos que vuelven para la fiesta. Declarada patrimonio cultural nacional en 2018 y objeto de una futura candidatura al patrimonio inmaterial de la UNESCO, celebró en 2026 su 86.ª edición, con delegaciones invitadas y veladas que se prolongan hasta altas horas.",
        tips: "Los sitios se llenan enseguida: llegue temprano y quédese en la periferia del público, los desbordamientos no son raros. El alojamiento escasea en Kankan durante la fiesta: reserve con mucha antelación. No prolongue su ruta hacia las zonas fronterizas con Malí, desaconsejadas salvo motivo imperativo.",
        where: "Kankan (Alta Guinea)",
        dateNote: "Variable: suele empezar el día siguiente a la Tabaski y dura varios días (inauguración el 29 de junio de 2023 y el 28 de mayo de 2026); programa anunciado localmente. Fecha estimada.",
      },
      pt: {
        name: "Mamaya de Kankan",
        summary: "Grande festa dançada malinké de Kankan, celebrada nos dias que se seguem à Tabaski.",
        description:
          "Nascida em Kankan nos anos 1930 no seio da comunidade malinké, a Mamaya é uma dança coletiva em círculo, ao ritmo de cantos e percussões, em que homens e mulheres desfilam com trajes tradicionais combinados e bengala na mão. Reúne gerações, associações de bairro e muitos naturais da cidade que regressam para a festa. Classificada como património cultural nacional em 2018 e objeto de uma futura candidatura ao património imaterial da UNESCO, teve em 2026 a sua 86.ª edição, com delegações convidadas e noites que se prolongam até tarde.",
        tips: "Os lugares esgotam depressa: chegue cedo e fique na periferia da multidão, os excessos não são raros. O alojamento escasseia em Kankan durante a festa: reserve com muita antecedência. Não prolongue a viagem para as zonas fronteiriças com o Mali, desaconselhadas salvo motivo imperioso.",
        where: "Kankan (Alta Guiné)",
        dateNote: "Variável: começa geralmente no dia seguinte à Tabaski e dura vários dias (abertura a 29 de junho de 2023 e a 28 de maio de 2026); programa anunciado localmente. Data estimada.",
      },
      ar: {
        name: "الماماية في كانكان",
        summary: "مهرجان الرقص الكبير لشعب المالينكي في كانكان، يُقام في الأيام التالية لعيد الأضحى.",
        description:
          "وُلدت الماماية في كانكان في ثلاثينيات القرن العشرين داخل مجتمع المالينكي، وهي رقصة جماعية دائرية على إيقاع الأغاني والطبول، يستعرض فيها الرجال والنساء بأزياء تقليدية متناسقة وفي أيديهم العصي. تجمع الأجيال وجمعيات الأحياء وكثيرًا من أبناء المدينة العائدين للاحتفال. أُدرجت ضمن التراث الثقافي الوطني عام 2018 ويُعتزم ترشيحها لقائمة التراث غير المادي لليونسكو، وأُقيمت دورتها السادسة والثمانون عام 2026 بمشاركة وفود ضيفة وسهرات تمتد حتى ساعات متأخرة.",
        tips: "تمتلئ الأماكن بسرعة: احضر مبكرًا وابقَ على أطراف الحشد، فالتدافع ليس نادرًا. الإقامة نادرة في كانكان أثناء المهرجان: احجز قبل وقت طويل. لا تواصل طريقك نحو المناطق الحدودية مع مالي التي يُنصح بعدم السفر إليها إلا للضرورة القصوى.",
        where: "كانكان (غينيا العليا)",
        dateNote: "متغيّر: يبدأ عادةً في اليوم التالي لعيد الأضحى ويستمر عدة أيام (افتُتح في 29 يونيو 2023 و28 مايو 2026)؛ ويُعلَن البرنامج محليًا. تاريخ تقديري.",
      },
    },
  },
  {
    slug: "kania-soli-kindia",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "hijri", month: 12, day: 10, days: 3 },
    destination: "kindia",
    where: "Kindia (Basse-Guinée)",
    name: "Kania Soli",
    summary: "Fête de la danse soli de Kindia, qui rassemble des milliers de personnes autour de la Tabaski.",
    description:
      "Comparable à la Mamaya de Kankan, le Kania Soli célèbre l'identité culturelle de Kindia autour de la danse soli. Porté par l'association Kania Diyé (7e édition en 2026), il réunit sur la place des Martyrs des groupes de quartier en uniformes colorés qui chantent et dansent au son des percussions, jusque tard dans la nuit. Les ressortissants de Kindia reviennent en nombre pour l'occasion, et des défilés, expositions et visites complètent le programme.",
    tips: "Forte affluence sur la place des Martyrs : surveillez vos affaires et repérez une sortie. Ne reprenez pas la route vers Conakry de nuit : des coupeurs de route sont signalés la nuit autour de Kindia.",
    dateNote: "Variable : se tient autour de la Tabaski, sur environ trois jours (« 72 heures »), dates annoncées par les organisateurs. Date estimée.",
    sources: [
      "https://guineenews.org/2023/06/29/kindia-les-activites-de-la-4eme-edition-de-kania-soli-lancees/",
      "https://guineenews.org/2026/05/29/kania-soli-kindia-vibre-au-rythme-dun-patrimoine-culturel-en-pleine-expansion/?amp=1",
      "https://guineenews.org/2026/05/09/kindia-kania-soli-officiellement-lance-sous-le-signe-de-linnovation-et-de-louverture-culturelle/",
    ],
    en: {
      name: "Kania Soli",
      summary: "Kindia's soli dance festival, drawing thousands of people around Tabaski.",
      description:
        "Comparable to the Mamaya in Kankan, Kania Soli celebrates Kindia's cultural identity through the soli dance. Run by the Kania Diyé association (7th edition in 2026), it brings neighbourhood groups in colourful uniforms to the Place des Martyrs to sing and dance to drums late into the night. People from Kindia come home in large numbers for the occasion, and parades, exhibitions and tours round off the programme.",
      tips: "The Place des Martyrs gets very crowded: watch your belongings and note an exit. Do not drive back to Conakry at night: highway robberies are reported at night around Kindia.",
      where: "Kindia (Lower Guinea)",
      dateNote: "Variable: held around Tabaski over about three days (\"72 hours\"), with dates announced by the organisers. Estimated date.",
    },
    i18n: {
      es: {
        name: "Kania Soli",
        summary: "Fiesta de la danza soli de Kindia, que reúne a miles de personas en torno a la Tabaski.",
        description:
          "Comparable a la Mamaya de Kankan, el Kania Soli celebra la identidad cultural de Kindia en torno a la danza soli. Organizado por la asociación Kania Diyé (7.ª edición en 2026), reúne en la plaza de los Mártires a grupos de barrio con uniformes de colores que cantan y bailan al son de las percusiones hasta altas horas. Los oriundos de Kindia vuelven en masa para la ocasión, y desfiles, exposiciones y visitas completan el programa.",
        tips: "Mucha afluencia en la plaza de los Mártires: vigile sus pertenencias y localice una salida. No vuelva a Conakry de noche: se señalan asaltos en carretera de noche en torno a Kindia.",
        where: "Kindia (Baja Guinea)",
        dateNote: "Variable: se celebra en torno a la Tabaski durante unos tres días («72 horas»), con fechas anunciadas por los organizadores. Fecha estimada.",
      },
      pt: {
        name: "Kania Soli",
        summary: "Festa da dança soli de Kindia, que reúne milhares de pessoas em torno da Tabaski.",
        description:
          "Comparável à Mamaya de Kankan, o Kania Soli celebra a identidade cultural de Kindia em torno da dança soli. Organizado pela associação Kania Diyé (7.ª edição em 2026), reúne na praça dos Mártires grupos de bairro com uniformes coloridos que cantam e dançam ao som das percussões até tarde. Os naturais de Kindia regressam em grande número para a ocasião, e desfiles, exposições e visitas completam o programa.",
        tips: "Grande afluência na praça dos Mártires: vigie os seus pertences e localize uma saída. Não regresse a Conakry de noite: são assinalados assaltos na estrada à noite em redor de Kindia.",
        where: "Kindia (Baixa Guiné)",
        dateNote: "Variável: realiza-se em torno da Tabaski durante cerca de três dias («72 horas»), com datas anunciadas pelos organizadores. Data estimada.",
      },
      ar: {
        name: "كانيا سولي",
        summary: "مهرجان رقصة السولي في كينديا، يجمع الآلاف حول عيد الأضحى.",
        description:
          "على غرار الماماية في كانكان، يحتفي مهرجان كانيا سولي بالهوية الثقافية لمدينة كينديا من خلال رقصة السولي. تنظمه جمعية كانيا دييه (الدورة السابعة عام 2026)، ويجمع في ساحة الشهداء فرق الأحياء بأزيائها الملونة لتغني وترقص على إيقاع الطبول حتى ساعات متأخرة. ويعود أبناء كينديا بأعداد كبيرة للمناسبة، وتكمل الاستعراضات والمعارض والجولات البرنامج.",
        tips: "ازدحام شديد في ساحة الشهداء: انتبه لأغراضك وحدّد مخرجًا. لا تعد إلى كوناكري ليلًا، إذ يُبلَّغ عن قطّاع طرق ليلًا حول كينديا.",
        where: "كينديا (غينيا السفلى)",
        dateNote: "متغيّر: يُقام حول عيد الأضحى لمدة ثلاثة أيام تقريبًا («72 ساعة»)، ويعلن المنظمون التواريخ. تاريخ تقديري.",
      },
    },
  },
  {
    slug: "assomption-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 8, day: 15 },
    where: "Dans tout le pays",
    name: "Assomption",
    summary: "Fête catholique de l'Assomption de la Vierge Marie, jour férié en Guinée.",
    description:
      "Le 15 août, les catholiques célèbrent l'Assomption de Marie par des messes et des processions, notamment à Conakry et en Guinée forestière. C'est l'une des fêtes chrétiennes fériées, chômées et payées du pays, au même titre que le lundi de Pâques et Noël. La date tombe en pleine saison des pluies.",
    tips: "Fortes pluies probables en août, surtout sur la côte : prévoyez des marges pour vos déplacements. Administrations et banques fermées.",
    dateNote: "Fixe.",
    sources: [DECRET_2022, "https://fr.allafrica.com/stories/202408150118.html"],
    en: {
      name: "Assumption",
      summary: "The Catholic feast of the Assumption of the Virgin Mary, a public holiday in Guinea.",
      description:
        "On 15 August, Catholics celebrate the Assumption of Mary with masses and processions, notably in Conakry and the Forest Region. It is one of the country's paid Christian public holidays, along with Easter Monday and Christmas. The date falls in the middle of the rainy season.",
      tips: "Heavy rain is likely in August, especially on the coast: allow extra time for journeys. Government offices and banks are closed.",
      where: "Throughout the country",
      dateNote: "Fixed.",
    },
    i18n: {
      es: {
        name: "Asunción",
        summary: "Fiesta católica de la Asunción de la Virgen María, festivo en Guinea.",
        description:
          "El 15 de agosto, los católicos celebran la Asunción de María con misas y procesiones, sobre todo en Conakry y en la Guinea Forestal. Es una de las fiestas cristianas festivas, no laborables y remuneradas del país, junto con el lunes de Pascua y la Navidad. La fecha cae en plena estación de lluvias.",
        tips: "Probables lluvias fuertes en agosto, sobre todo en la costa: prevea margen para sus desplazamientos. Administraciones y bancos cerrados.",
        where: "En todo el país",
        dateNote: "Fija.",
      },
      pt: {
        name: "Assunção",
        summary: "Festa católica da Assunção da Virgem Maria, feriado na Guiné.",
        description:
          "A 15 de agosto, os católicos celebram a Assunção de Maria com missas e procissões, nomeadamente em Conakry e na Guiné Florestal. É um dos feriados cristãos pagos do país, tal como a segunda-feira de Páscoa e o Natal. A data calha em plena estação das chuvas.",
        tips: "Chuvas fortes prováveis em agosto, sobretudo no litoral: conte com margem para as deslocações. Serviços públicos e bancos fechados.",
        where: "Em todo o país",
        dateNote: "Fixa.",
      },
      ar: {
        name: "عيد انتقال العذراء",
        summary: "العيد الكاثوليكي لانتقال السيدة مريم العذراء، عطلة رسمية في غينيا.",
        description:
          "يحتفل الكاثوليك في 15 أغسطس بعيد انتقال العذراء بقداسات ومسيرات دينية، لا سيما في كوناكري وغينيا الغابية. وهو من الأعياد المسيحية التي تُعدّ عطلة رسمية مدفوعة الأجر في البلاد، شأنه شأن اثنين الفصح وعيد الميلاد. ويقع هذا التاريخ في ذروة موسم الأمطار.",
        tips: "يُرجَّح هطول أمطار غزيرة في أغسطس، خاصة على الساحل: خصّص وقتًا إضافيًا لتنقلاتك. الإدارات والمصارف مغلقة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "تاريخ ثابت.",
      },
    },
  },
  {
    slug: "maouloud-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 3, day: 12 },
    where: "Dans tout le pays",
    name: "Maouloud (naissance du Prophète)",
    summary: "Commémoration de la naissance du prophète Mahomet, jour férié après une nuit de veillées.",
    description:
      "Le Maouloud célèbre la naissance du Prophète. La veille au soir, mosquées et associations organisent des veillées de prière, de chants religieux et de récits de la vie du Prophète, qui se prolongent souvent jusqu'à l'aube. Le lendemain de cette nuit est férié, chômé et payé dans tout le pays.",
    tips: "Si vous êtes invité à une veillée, adoptez une tenue couvrante et restez discret. Prévoyez que les administrations soient fermées.",
    dateNote: "Variable : 12 rabi al-awwal (jour qui suit la nuit du Maouloud), annoncé chaque année par communiqué du ministère (25 août en 2026). Date estimée à ±1 jour.",
    sources: [DECRET_2022, "https://guineenews.org/2026/08/24/guinee-le-mardi-25-aout-declare-jour-ferie-chome-et-paye-pour-le-maouloud/"],
    en: {
      name: "Mawlid (Prophet's Birthday)",
      summary: "Commemoration of the birth of the Prophet Muhammad, a public holiday after a night of vigils.",
      description:
        "Mawlid celebrates the birth of the Prophet. On the evening before, mosques and associations hold vigils of prayer, religious songs and accounts of the Prophet's life, often lasting until dawn. The day after this night is a paid public holiday throughout the country.",
      tips: "If you are invited to a vigil, dress modestly and stay discreet. Expect government offices to be closed.",
      where: "Throughout the country",
      dateNote: "Variable: 12 Rabi al-Awwal (the day after the night of Mawlid), announced each year by ministry statement (25 August in 2026). Date estimated to within ±1 day.",
    },
    i18n: {
      es: {
        name: "Maulid (nacimiento del Profeta)",
        summary: "Conmemoración del nacimiento del profeta Mahoma, festivo tras una noche de vigilias.",
        description:
          "El Maulid celebra el nacimiento del Profeta. La víspera por la noche, mezquitas y asociaciones organizan vigilias de oración, cantos religiosos y relatos de la vida del Profeta, que a menudo se prolongan hasta el amanecer. El día siguiente a esa noche es festivo, no laborable y remunerado en todo el país.",
        tips: "Si le invitan a una vigilia, vista ropa que cubra y sea discreto. Cuente con que las administraciones estén cerradas.",
        where: "En todo el país",
        dateNote: "Variable: 12 de rabi al-awwal (día siguiente a la noche del Maulid), anunciado cada año por comunicado del ministerio (25 de agosto en 2026). Fecha estimada con ±1 día.",
      },
      pt: {
        name: "Mawlid (nascimento do Profeta)",
        summary: "Comemoração do nascimento do profeta Maomé, feriado depois de uma noite de vigílias.",
        description:
          "O Mawlid celebra o nascimento do Profeta. Na véspera à noite, mesquitas e associações organizam vigílias de oração, cânticos religiosos e relatos da vida do Profeta, que muitas vezes se prolongam até de madrugada. O dia seguinte a essa noite é feriado pago em todo o país.",
        tips: "Se for convidado para uma vigília, use roupa que cubra e seja discreto. Conte com os serviços públicos fechados.",
        where: "Em todo o país",
        dateNote: "Variável: 12 de rabi al-awwal (dia seguinte à noite do Mawlid), anunciado todos os anos por comunicado do ministério (25 de agosto em 2026). Data estimada com ±1 dia.",
      },
      ar: {
        name: "المولد النبوي",
        summary: "ذكرى مولد النبي محمد، عطلة رسمية بعد ليلة من السهرات الدينية.",
        description:
          "يحتفل المولد بميلاد النبي. ففي الليلة السابقة تنظم المساجد والجمعيات سهرات للصلاة والإنشاد الديني وسرد السيرة النبوية، تمتد غالبًا حتى الفجر. ويكون اليوم التالي لهذه الليلة عطلة رسمية مدفوعة الأجر في جميع أنحاء البلاد.",
        tips: "إذا دُعيت إلى سهرة، فالبس لباسًا ساترًا والتزم الهدوء. توقّع أن تكون الإدارات مغلقة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "متغيّر: 12 ربيع الأول (اليوم التالي لليلة المولد)، ويُعلَن كل عام ببلاغ من الوزارة (25 أغسطس في 2026). التاريخ تقديري بفارق يوم واحد.",
      },
    },
  },
  {
    slug: "fete-independance-guinee",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 10, day: 2 },
    where: "Dans tout le pays",
    name: "Fête de l'Indépendance",
    summary: "Fête nationale : anniversaire de l'indépendance proclamée le 2 octobre 1958.",
    description:
      "Le 28 septembre 1958, la Guinée fut le seul territoire de l'Afrique occidentale française à voter « non » au référendum sur la Communauté proposée par la France ; l'indépendance fut proclamée quatre jours plus tard, le 2 octobre. La fête nationale donne lieu à des cérémonies officielles, parfois à des défilés à Conakry, et à des manifestations culturelles et sportives dans les préfectures. Drapeaux rouge, jaune et vert pavoisent les rues.",
    tips: "Certains axes de Conakry peuvent être fermés lors des cérémonies officielles : renseignez-vous la veille. Ne photographiez pas les militaires ni les installations officielles.",
    dateNote: "Fixe. Si le 2 octobre tombe un jour non ouvrable, le premier jour ouvrable suivant est déclaré férié (décret de 2022).",
    sources: [DECRET_2022, "https://guineenews.org/2023/09/30/fete-de-lindependance-le-lundi-2-octobre-declare-ferie-officiel/"],
    en: {
      name: "Independence Day",
      summary: "National day: the anniversary of independence, proclaimed on 2 October 1958.",
      description:
        "On 28 September 1958, Guinea was the only territory of French West Africa to vote \"no\" in the referendum on the Community proposed by France; independence was proclaimed four days later, on 2 October. The national day is marked by official ceremonies, sometimes parades in Conakry, and cultural and sporting events in the prefectures. Red, yellow and green flags deck the streets.",
      tips: "Some roads in Conakry may be closed during official ceremonies: check the day before. Do not photograph soldiers or official buildings.",
      where: "Throughout the country",
      dateNote: "Fixed. If 2 October falls on a non-working day, the next working day is declared a holiday (2022 decree).",
    },
    i18n: {
      es: {
        name: "Día de la Independencia",
        summary: "Fiesta nacional: aniversario de la independencia proclamada el 2 de octubre de 1958.",
        description:
          "El 28 de septiembre de 1958, Guinea fue el único territorio del África Occidental Francesa que votó «no» en el referéndum sobre la Comunidad propuesta por Francia; la independencia se proclamó cuatro días después, el 2 de octubre. La fiesta nacional da lugar a ceremonias oficiales, a veces a desfiles en Conakry, y a actos culturales y deportivos en las prefecturas. Banderas rojas, amarillas y verdes engalanan las calles.",
        tips: "Algunas vías de Conakry pueden cerrarse durante las ceremonias oficiales: infórmese la víspera. No fotografíe a militares ni instalaciones oficiales.",
        where: "En todo el país",
        dateNote: "Fija. Si el 2 de octubre cae en día no laborable, el siguiente día laborable se declara festivo (decreto de 2022).",
      },
      pt: {
        name: "Dia da Independência",
        summary: "Festa nacional: aniversário da independência proclamada a 2 de outubro de 1958.",
        description:
          "A 28 de setembro de 1958, a Guiné foi o único território da África Ocidental Francesa a votar «não» no referendo sobre a Comunidade proposta pela França; a independência foi proclamada quatro dias depois, a 2 de outubro. A festa nacional é assinalada por cerimónias oficiais, por vezes desfiles em Conakry, e manifestações culturais e desportivas nas prefeituras. Bandeiras vermelhas, amarelas e verdes enfeitam as ruas.",
        tips: "Algumas vias de Conakry podem estar fechadas durante as cerimónias oficiais: informe-se na véspera. Não fotografe militares nem instalações oficiais.",
        where: "Em todo o país",
        dateNote: "Fixa. Se o 2 de outubro calhar num dia não útil, o primeiro dia útil seguinte é declarado feriado (decreto de 2022).",
      },
      ar: {
        name: "عيد الاستقلال",
        summary: "العيد الوطني: ذكرى الاستقلال المعلن في 2 أكتوبر 1958.",
        description:
          "في 28 سبتمبر 1958 كانت غينيا الإقليم الوحيد في غرب أفريقيا الفرنسية الذي صوّت بـ«لا» في الاستفتاء على المجموعة التي اقترحتها فرنسا، وأُعلن الاستقلال بعد أربعة أيام في 2 أكتوبر. ويُحتفل بالعيد الوطني بمراسم رسمية، وأحيانًا باستعراضات في كوناكري، وبفعاليات ثقافية ورياضية في المحافظات. وتزدان الشوارع بالأعلام الحمراء والصفراء والخضراء.",
        tips: "قد تُغلق بعض محاور كوناكري أثناء المراسم الرسمية: استعلم في اليوم السابق. لا تصوّر العسكريين ولا المنشآت الرسمية.",
        where: "في جميع أنحاء البلاد",
        dateNote: "تاريخ ثابت. إذا صادف 2 أكتوبر يوم عطلة، يُعلَن أول يوم عمل يليه عطلة رسمية (مرسوم 2022).",
      },
    },
  },
  {
    slug: "noel-guinee",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 12, day: 25 },
    where: "Dans tout le pays",
    name: "Noël",
    summary: "Fête de la Nativité, jour férié qui ouvre la semaine des fêtes de fin d'année.",
    description:
      "Les chrétiens célèbrent Noël par la messe de minuit et les offices du 25 décembre, très fréquentés à la cathédrale Sainte-Marie de Conakry et dans les paroisses de Guinée forestière. Au-delà de la communauté chrétienne, la période est festive pour beaucoup : écoles et quartiers organisent des fêtes pour les enfants, et Conakry s'anime jusqu'au Nouvel An. Le 25 décembre est férié, chômé et payé.",
    tips: "Pour la messe de minuit, arrivez tôt et organisez votre retour en voiture avec chauffeur plutôt qu'à pied.",
    dateNote: "Fixe.",
    sources: [DECRET_2022, PLAYROLL],
    en: {
      name: "Christmas",
      summary: "The feast of the Nativity, a public holiday that opens the festive week at year's end.",
      description:
        "Christians celebrate Christmas with midnight mass and services on 25 December, well attended at Conakry's Saint Mary's Cathedral and in parishes in the Forest Region. Beyond the Christian community, the season is festive for many: schools and neighbourhoods put on parties for children, and Conakry stays lively until New Year. 25 December is a paid public holiday.",
      tips: "For midnight mass, arrive early and arrange to go home by car with a driver rather than on foot.",
      where: "Throughout the country",
      dateNote: "Fixed.",
    },
    i18n: {
      es: {
        name: "Navidad",
        summary: "Fiesta de la Natividad, festivo que abre la semana de fiestas de fin de año.",
        description:
          "Los cristianos celebran la Navidad con la misa del gallo y los oficios del 25 de diciembre, muy concurridos en la catedral de Santa María de Conakry y en las parroquias de la Guinea Forestal. Más allá de la comunidad cristiana, la época es festiva para muchos: escuelas y barrios organizan fiestas para los niños, y Conakry se anima hasta Año Nuevo. El 25 de diciembre es festivo, no laborable y remunerado.",
        tips: "Para la misa del gallo, llegue temprano y organice la vuelta en coche con conductor en lugar de a pie.",
        where: "En todo el país",
        dateNote: "Fija.",
      },
      pt: {
        name: "Natal",
        summary: "Festa da Natividade, feriado que abre a semana festiva de fim de ano.",
        description:
          "Os cristãos celebram o Natal com a missa do galo e as celebrações de 25 de dezembro, muito concorridas na catedral de Santa Maria de Conakry e nas paróquias da Guiné Florestal. Para além da comunidade cristã, a época é festiva para muitos: escolas e bairros organizam festas para as crianças, e Conakry anima-se até ao Ano Novo. O 25 de dezembro é feriado pago.",
        tips: "Para a missa do galo, chegue cedo e organize o regresso de carro com motorista em vez de a pé.",
        where: "Em todo o país",
        dateNote: "Fixa.",
      },
      ar: {
        name: "عيد الميلاد",
        summary: "عيد ميلاد المسيح، عطلة رسمية تفتتح أسبوع أعياد نهاية السنة.",
        description:
          "يحتفل المسيحيون بعيد الميلاد بقداس منتصف الليل وصلوات 25 ديسمبر، التي يكثر حضورها في كاتدرائية القديسة مريم في كوناكري وفي رعايا غينيا الغابية. وتتجاوز الأجواء الاحتفالية الجماعة المسيحية: إذ تنظم المدارس والأحياء حفلات للأطفال، وتبقى كوناكري نابضة بالحياة حتى رأس السنة. ويُعدّ 25 ديسمبر عطلة رسمية مدفوعة الأجر.",
        tips: "لحضور قداس منتصف الليل، احضر مبكرًا ونظّم عودتك بسيارة مع سائق بدل المشي.",
        where: "في جميع أنحاء البلاد",
        dateNote: "تاريخ ثابت.",
      },
    },
  },
  {
    slug: "72-heures-du-livre-conakry",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 4, to: 4 },
    destination: "conakry",
    where: "Conakry",
    name: "72 heures du livre",
    summary: "Festival littéraire de Conakry autour de la Journée mondiale du livre, en avril.",
    description:
      "Créé en 2009 par l'éditeur Sansy Kaba Diakité, ce festival est devenu le grand rendez-vous du livre en Guinée ; ses organisateurs ont porté le programme « Conakry, capitale mondiale du livre » de l'UNESCO en 2017. Pendant trois jours, auteurs guinéens et étrangers, éditeurs et lecteurs se retrouvent pour des lectures, dédicaces, débats, pièces de théâtre et projections. La 18e édition s'est tenue en avril 2026, avec une ville invitée d'honneur et un thème consacré à la jeunesse et au numérique.",
    tips: "La plupart des activités sont ouvertes au public : consultez le programme diffusé par les organisateurs et la presse guinéenne quelques jours avant. Une bonne occasion d'acheter des livres d'auteurs guinéens introuvables ailleurs.",
    dateNote: "Annuel, sur trois jours autour du 23 avril (Journée mondiale du livre) ; lieux et dates précis annoncés par les organisateurs quelques semaines avant (23-25 avril en 2026).",
    sources: [
      "https://guineenews.org/2026/04/23/conakry-celebre-le-livre-et-le-numerique-lancement-solennel-de-la-18e-edition-des-72-heures-du-livre-au-lac-gbassikolo/?amp=1",
      "https://guineenews.org/2026/04/03/72-heures-du-livre-conakry-lance-une-18e-edition-placee-sous-le-signe-de-la-jeunesse-et-du-numerique/?amp=1",
      "https://internationalpublishers.org/book-fairs-events/72-hour-of-the-book-conakry-2026/",
    ],
    en: {
      name: "72 Hours of the Book",
      summary: "Conakry's literary festival around World Book Day in April.",
      description:
        "Founded in 2009 by publisher Sansy Kaba Diakité, this festival has become Guinea's main book event; its organisers ran UNESCO's \"Conakry, World Book Capital\" programme in 2017. Over three days, Guinean and foreign authors, publishers and readers come together for readings, signings, debates, plays and film screenings. The 18th edition took place in April 2026, with a guest town of honour and a theme devoted to youth and digital technology.",
      tips: "Most activities are open to the public: check the programme published by the organisers and the Guinean press a few days beforehand. A good chance to buy books by Guinean authors that are hard to find elsewhere.",
      where: "Conakry",
      dateNote: "Annual, over three days around 23 April (World Book Day); exact venues and dates announced by the organisers a few weeks ahead (23–25 April in 2026).",
    },
    i18n: {
      es: {
        name: "72 horas del libro",
        summary: "Festival literario de Conakry en torno al Día Mundial del Libro, en abril.",
        description:
          "Creado en 2009 por el editor Sansy Kaba Diakité, este festival se ha convertido en la gran cita del libro en Guinea; sus organizadores llevaron el programa «Conakry, capital mundial del libro» de la UNESCO en 2017. Durante tres días, autores guineanos y extranjeros, editores y lectores se reúnen para lecturas, firmas, debates, obras de teatro y proyecciones. La 18.ª edición se celebró en abril de 2026, con una ciudad invitada de honor y un tema dedicado a la juventud y lo digital.",
        tips: "La mayoría de las actividades están abiertas al público: consulte el programa difundido por los organizadores y la prensa guineana unos días antes. Buena ocasión para comprar libros de autores guineanos difíciles de encontrar en otros lugares.",
        where: "Conakry",
        dateNote: "Anual, durante tres días en torno al 23 de abril (Día Mundial del Libro); lugares y fechas exactos anunciados por los organizadores unas semanas antes (23-25 de abril en 2026).",
      },
      pt: {
        name: "72 horas do livro",
        summary: "Festival literário de Conakry em torno do Dia Mundial do Livro, em abril.",
        description:
          "Criado em 2009 pelo editor Sansy Kaba Diakité, este festival tornou-se o grande encontro do livro na Guiné; os seus organizadores conduziram o programa «Conakry, capital mundial do livro» da UNESCO em 2017. Durante três dias, autores guineenses e estrangeiros, editores e leitores encontram-se para leituras, sessões de autógrafos, debates, peças de teatro e projeções. A 18.ª edição realizou-se em abril de 2026, com uma cidade convidada de honra e um tema dedicado à juventude e ao digital.",
        tips: "A maioria das atividades está aberta ao público: consulte o programa divulgado pelos organizadores e pela imprensa guineense alguns dias antes. Boa ocasião para comprar livros de autores guineenses difíceis de encontrar noutros sítios.",
        where: "Conakry",
        dateNote: "Anual, durante três dias em torno de 23 de abril (Dia Mundial do Livro); locais e datas exatos anunciados pelos organizadores algumas semanas antes (23-25 de abril em 2026).",
      },
      ar: {
        name: "72 ساعة للكتاب",
        summary: "مهرجان كوناكري الأدبي حول اليوم العالمي للكتاب في أبريل.",
        description:
          "أسّسه الناشر سانسي كابا دياكيتي عام 2009، وأصبح الموعد الأبرز للكتاب في غينيا، وتولّى منظموه برنامج «كوناكري عاصمة عالمية للكتاب» التابع لليونسكو عام 2017. وعلى مدى ثلاثة أيام يلتقي كتّاب غينيون وأجانب وناشرون وقرّاء في قراءات وجلسات توقيع ونقاشات وعروض مسرحية وسينمائية. وأُقيمت الدورة الثامنة عشرة في أبريل 2026 بمدينة ضيفة شرف وموضوع مخصص للشباب والرقمنة.",
        tips: "معظم الأنشطة مفتوحة للجمهور: راجع البرنامج الذي ينشره المنظمون والصحافة الغينية قبل أيام. فرصة جيدة لشراء كتب لمؤلفين غينيين يصعب العثور عليها في مكان آخر.",
        where: "كوناكري",
        dateNote: "سنوي، على مدى ثلاثة أيام حول 23 أبريل (اليوم العالمي للكتاب)؛ ويعلن المنظمون الأماكن والتواريخ الدقيقة قبل أسابيع (23-25 أبريل في 2026).",
      },
    },
  },
  {
    slug: "fetes-fin-annee-conakry",
    kind: "SEASONAL",
    publicHoliday: false,
    rule: { type: "fixed", month: 12, day: 24, days: 9 },
    destination: "conakry",
    place: "soirees-ratoma-conakry",
    where: "Conakry",
    name: "Fêtes de fin d'année à Conakry",
    summary: "De Noël au Nouvel An, la capitale vit au rythme des retrouvailles, des soirées et des concerts.",
    description:
      "Entre Noël et le 1er janvier, Conakry connaît l'une des périodes les plus animées de l'année : retours de membres de la diaspora, mariages et fêtes de famille, soirées dans les restaurants et clubs de Ratoma (Kipé, Taouyah), concerts d'artistes guinéens. La nuit du 31 décembre, très festive, est aussi la plus risquée sur les routes, et les autorités renforcent alors la présence policière. Les 25 décembre et 1er janvier sont fériés.",
    tips: "Réservez vols, hébergements et voitures avec chauffeur longtemps à l'avance. Ne circulez pas à pied la nuit, gardez peu d'objets de valeur et organisez votre retour avant de sortir.",
    dateNote: "Du 24 décembre au 1er janvier ; programmes des soirées et concerts annoncés au fil de la saison.",
    sources: [
      "https://guineenews.org/?p=48362",
      "https://afrique.le360.ma/guinee/societe/2017/12/28/17570-guinee-deuxieme-edition-de-conakry-ville-lumiere-17570/",
      "https://www.diplomatie.gouv.fr/fr/information-par-pays/guinee/conseils-aux-voyageurs-securite",
    ],
    en: {
      name: "Year-end festivities in Conakry",
      summary: "From Christmas to New Year, the capital lives to the rhythm of reunions, parties and concerts.",
      description:
        "Between Christmas and 1 January, Conakry goes through one of the liveliest periods of the year: members of the diaspora come home, there are weddings and family celebrations, evenings in the restaurants and clubs of Ratoma (Kipé, Taouyah) and concerts by Guinean artists. New Year's Eve, a very festive night, is also the most dangerous on the roads, and the authorities step up the police presence. 25 December and 1 January are public holidays.",
      tips: "Book flights, accommodation and cars with drivers well in advance. Do not walk around at night, carry few valuables and arrange your ride home before going out.",
      where: "Conakry",
      dateNote: "24 December to 1 January; party and concert programmes announced as the season goes on.",
    },
    i18n: {
      es: {
        name: "Fiestas de fin de año en Conakry",
        summary: "De Navidad a Año Nuevo, la capital vive al ritmo de los reencuentros, las fiestas y los conciertos.",
        description:
          "Entre Navidad y el 1 de enero, Conakry vive uno de los periodos más animados del año: regreso de miembros de la diáspora, bodas y fiestas familiares, veladas en los restaurantes y clubes de Ratoma (Kipé, Taouyah) y conciertos de artistas guineanos. La noche del 31 de diciembre, muy festiva, es también la más arriesgada en las carreteras, y las autoridades refuerzan la presencia policial. El 25 de diciembre y el 1 de enero son festivos.",
        tips: "Reserve vuelos, alojamiento y coches con conductor con mucha antelación. No camine de noche, lleve pocos objetos de valor y organice la vuelta antes de salir.",
        where: "Conakry",
        dateNote: "Del 24 de diciembre al 1 de enero; programas de fiestas y conciertos anunciados a lo largo de la temporada.",
      },
      pt: {
        name: "Festas de fim de ano em Conakry",
        summary: "Do Natal ao Ano Novo, a capital vive ao ritmo dos reencontros, das festas e dos concertos.",
        description:
          "Entre o Natal e o 1 de janeiro, Conakry vive um dos períodos mais animados do ano: regresso de membros da diáspora, casamentos e festas de família, noites nos restaurantes e clubes de Ratoma (Kipé, Taouyah) e concertos de artistas guineenses. A noite de 31 de dezembro, muito festiva, é também a mais arriscada nas estradas, e as autoridades reforçam a presença policial. O 25 de dezembro e o 1 de janeiro são feriados.",
        tips: "Reserve voos, alojamento e carros com motorista com muita antecedência. Não ande a pé à noite, leve poucos objetos de valor e combine o regresso antes de sair.",
        where: "Conakry",
        dateNote: "De 24 de dezembro a 1 de janeiro; programas de festas e concertos anunciados ao longo da época.",
      },
      ar: {
        name: "أعياد نهاية السنة في كوناكري",
        summary: "من عيد الميلاد إلى رأس السنة، تعيش العاصمة على إيقاع لقاءات الأهل والسهرات والحفلات الموسيقية.",
        description:
          "بين عيد الميلاد والأول من يناير تعيش كوناكري إحدى أكثر فترات السنة حيوية: عودة مغتربين، وحفلات الزفاف والمناسبات العائلية، والسهرات في مطاعم ونوادي راتوما (كيبي وتاوويا)، وحفلات لفنانين غينيين. وليلة 31 ديسمبر، الاحتفالية جدًا، هي أيضًا الأخطر على الطرق، فتعزّز السلطات الحضور الأمني. ويُعدّ 25 ديسمبر والأول من يناير عطلتين رسميتين.",
        tips: "احجز الرحلات والإقامة والسيارات مع سائق قبل وقت طويل. لا تمشِ ليلًا، واحمل قليلًا من الأشياء الثمينة، ورتّب عودتك قبل الخروج.",
        where: "كوناكري",
        dateNote: "من 24 ديسمبر إلى الأول من يناير؛ وتُعلَن برامج السهرات والحفلات تباعًا خلال الموسم.",
      },
    },
  },
];
