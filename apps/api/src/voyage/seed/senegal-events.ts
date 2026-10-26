/**
 * Fêtes, jours fériés, festivals et temps forts saisonniers (senegal).
 * Voir SeedEvent (./types). Contenu non relu : `reviewed = false`.
 *
 * Jours fériés : loi n° 74-52 du 4 novembre 1974 relative à la fête nationale et aux
 * fêtes légales, modifiée (notamment par la loi n° 2013-06 qui ajoute le Grand Magal
 * de Touba). Lorsque la Korité ou la Tabaski tombe un dimanche, le lundi suivant est
 * férié ; tout autre jour chômé supplémentaire fait l'objet d'un décret présidentiel.
 * Les dates des fêtes musulmanes sont fixées chaque année selon l'observation du
 * croissant lunaire (elles peuvent différer d'un jour du calendrier Umm al-Qura).
 */

import type { SeedEvent } from "./types";

const LOI_FERIES = [
  "https://www.tambacounda.info/2020/08/30/dimanche-lundi-fetes-legales-et-jours-feries-tout-ce-quil-faut-savoir/",
  "https://www.seneweb.com/fr/news/Societe/ce-que-dit-la-loi-sur-les-jours-feries_n_113705.html",
  "https://lepetitjournal.com/dakar/jours-feries-senegal-295473",
  "https://botschaft-senegal.de/2023/08/jours-feries/",
];

export const SENEGAL_EVENTS: SeedEvent[] = [
  {
    slug: "jour-de-l-an-senegal",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 1, day: 1 },
    name: "Jour de l'An",
    summary: "Premier jour de l'année civile, férié dans tout le pays.",
    description:
      "Le 1er janvier est une fête légale au Sénégal. La nuit de la Saint-Sylvestre se fête surtout à Dakar et dans les stations balnéaires, avec concerts, soirées et feux d'artifice, puis la journée est consacrée au repos et aux visites en famille. Administrations, banques et la plupart des commerces sont fermés.",
    tips: "Réservez à l'avance hébergements et tables pour la nuit du 31 décembre ; prévoyez taxis et retours tardifs avec soin.",
    where: "Dans tout le pays",
    sources: LOI_FERIES,
    en: {
      name: "New Year's Day",
      summary: "The first day of the calendar year, a public holiday nationwide.",
      description:
        "1 January is a legal holiday in Senegal. New Year's Eve is celebrated mainly in Dakar and the seaside resorts, with concerts, parties and fireworks, and the day itself is given over to rest and family visits. Government offices, banks and most shops are closed.",
      tips: "Book accommodation and restaurant tables well ahead for the night of 31 December; plan taxis and late journeys home carefully.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Año Nuevo",
        summary: "Primer día del año civil, festivo en todo el país.",
        description:
          "El 1 de enero es fiesta legal en Senegal. La Nochevieja se celebra sobre todo en Dakar y en las estaciones balnearias, con conciertos, fiestas y fuegos artificiales, y el día se dedica al descanso y a las visitas familiares. Administraciones, bancos y la mayoría de los comercios cierran.",
        tips: "Reserve con antelación alojamiento y mesa para la noche del 31 de diciembre; organice bien los taxis y los regresos tardíos.",
        where: "En todo el país",
      },
      pt: {
        name: "Dia de Ano Novo",
        summary: "Primeiro dia do ano civil, feriado em todo o país.",
        description:
          "O dia 1 de janeiro é feriado legal no Senegal. A passagem de ano festeja-se sobretudo em Dacar e nas estâncias balneares, com concertos, festas e fogo de artifício, e o dia é dedicado ao descanso e às visitas à família. Serviços públicos, bancos e a maioria do comércio estão fechados.",
        tips: "Reserve com antecedência alojamento e mesa para a noite de 31 de dezembro; planeie bem os táxis e os regressos tardios.",
        where: "Em todo o país",
      },
      ar: {
        name: "رأس السنة الميلادية",
        summary: "اليوم الأول من السنة الميلادية، عطلة رسمية في جميع أنحاء البلاد.",
        description:
          "الأول من يناير عيد قانوني في السنغال. تُحتفل ليلة رأس السنة خاصة في داكار والمنتجعات الساحلية بالحفلات الموسيقية والسهرات والألعاب النارية، ويُخصَّص اليوم نفسه للراحة والزيارات العائلية. تُغلق الإدارات والمصارف ومعظم المحلات.",
        tips: "احجز الإقامة والطاولات مسبقًا لليلة 31 ديسمبر، ونظّم سيارات الأجرة والعودة المتأخرة بعناية.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "lundi-de-paques-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 1 },
    name: "Lundi de Pâques",
    summary: "Lendemain de Pâques, férié pour tous les Sénégalais.",
    description:
      "Bien que les chrétiens représentent une minorité de la population, Pâques est une fête vécue au-delà de la communauté catholique : il est courant que des familles chrétiennes offrent le « ngalax », une bouillie de mil à la pâte d'arachide et au pain de singe (fruit du baobab), à leurs voisins musulmans. Les messes de la Vigile et du dimanche sont très fréquentées, à Dakar, Ziguinchor, Joal-Fadiouth ou Popenguine. Le lundi est chômé.",
    tips: "Si l'on vous offre du ngalax, acceptez-le : c'est un geste de partage entre communautés.",
    where: "Dans tout le pays",
    dateNote: "Lendemain du dimanche de Pâques (calendrier grégorien), en mars ou en avril.",
    sources: LOI_FERIES,
    en: {
      name: "Easter Monday",
      summary: "The day after Easter, a holiday for all Senegalese.",
      description:
        "Although Christians are a minority of the population, Easter is celebrated well beyond the Catholic community: Christian families commonly offer “ngalax”, a millet porridge with peanut paste and monkey bread (baobab fruit), to their Muslim neighbours. The Easter Vigil and Sunday masses are packed in Dakar, Ziguinchor, Joal-Fadiouth and Popenguine. The Monday is a day off.",
      tips: "If you are offered ngalax, accept it: it is a gesture of sharing between communities.",
      where: "Nationwide",
      dateNote: "The day after Easter Sunday (Gregorian calendar), in March or April.",
    },
    i18n: {
      es: {
        name: "Lunes de Pascua",
        summary: "Día siguiente a la Pascua, festivo para todos los senegaleses.",
        description:
          "Aunque los cristianos son una minoría de la población, la Pascua se vive más allá de la comunidad católica: es habitual que las familias cristianas ofrezcan a sus vecinos musulmanes el «ngalax», una papilla de mijo con pasta de cacahuete y pan de mono (fruto del baobab). Las misas de la Vigilia y del domingo están muy concurridas en Dakar, Ziguinchor, Joal-Fadiouth o Popenguine. El lunes es festivo.",
        tips: "Si le ofrecen ngalax, acéptelo: es un gesto de convivencia entre comunidades.",
        where: "En todo el país",
        dateNote: "Día siguiente al domingo de Pascua (calendario gregoriano), en marzo o abril.",
      },
      pt: {
        name: "Segunda-feira de Páscoa",
        summary: "Dia seguinte à Páscoa, feriado para todos os senegaleses.",
        description:
          "Embora os cristãos sejam uma minoria da população, a Páscoa é vivida para além da comunidade católica: é habitual as famílias cristãs oferecerem aos vizinhos muçulmanos o «ngalax», uma papa de milho-miúdo com pasta de amendoim e pão-de-macaco (fruto do embondeiro). As missas da Vigília e de domingo enchem-se em Dacar, Ziguinchor, Joal-Fadiouth ou Popenguine. A segunda-feira é feriado.",
        tips: "Se lhe oferecerem ngalax, aceite: é um gesto de partilha entre comunidades.",
        where: "Em todo o país",
        dateNote: "Dia seguinte ao domingo de Páscoa (calendário gregoriano), em março ou abril.",
      },
      ar: {
        name: "اثنين الفصح",
        summary: "اليوم التالي لعيد الفصح، عطلة لجميع السنغاليين.",
        description:
          "مع أن المسيحيين أقلية في السكان، فإن عيد الفصح يُعاش خارج نطاق الجماعة الكاثوليكية: إذ تعتاد الأسر المسيحية تقديم «نغالاخ»، وهو عصيدة من الدخن بمعجون الفول السوداني وثمر الباوباب، لجيرانها المسلمين. وتمتلئ قداديس السهرانية والأحد في داكار وزيغينشور وجوال فاديوث وبوبينغين. ويوم الاثنين عطلة.",
        tips: "إن قُدِّم إليك النغالاخ فاقبله: إنه بادرة تقاسم بين الجماعات.",
        where: "في جميع أنحاء البلاد",
        dateNote: "اليوم التالي لأحد الفصح (التقويم الميلادي)، في مارس أو أبريل.",
      },
    },
  },
  {
    slug: "fete-de-l-independance-senegal",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 4, day: 4 },
    destination: "dakar",
    cover: "/images/voyage/fete-fete-de-l-independance-senegal",
    name: "Fête de l'Indépendance (4 avril)",
    summary: "La fête nationale, anniversaire de l'indépendance proclamée le 4 avril 1960.",
    description:
      "Le 4 avril, le Sénégal célèbre son accession à l'indépendance en 1960. La journée est marquée par un défilé civil et militaire devant le chef de l'État à Dakar, retransmis à la télévision, et par des cérémonies dans les chefs-lieux de région. Drapeaux vert-jaune-rouge, tenues aux couleurs nationales et rassemblements festifs animent les quartiers.",
    tips: "Le centre de Dakar est bouclé pendant le défilé : évitez de circuler en voiture le matin. Ne photographiez pas les militaires ni les officiels de près sans autorisation.",
    where: "Dakar (défilé) et chefs-lieux de région",
    sources: LOI_FERIES,
    en: {
      name: "Independence Day (4 April)",
      summary: "The national holiday, anniversary of independence proclaimed on 4 April 1960.",
      description:
        "On 4 April Senegal celebrates its independence in 1960. The day is marked by a civil and military parade before the head of state in Dakar, broadcast on television, and by ceremonies in the regional capitals. Green, yellow and red flags, outfits in the national colours and festive gatherings liven up the neighbourhoods.",
      tips: "Central Dakar is closed off during the parade: avoid driving in the morning. Do not photograph soldiers or officials at close range without permission.",
      where: "Dakar (parade) and regional capitals",
    },
    i18n: {
      es: {
        name: "Fiesta de la Independencia (4 de abril)",
        summary: "La fiesta nacional, aniversario de la independencia proclamada el 4 de abril de 1960.",
        description:
          "El 4 de abril Senegal celebra su independencia de 1960. La jornada está marcada por un desfile civil y militar ante el jefe del Estado en Dakar, retransmitido por televisión, y por ceremonias en las capitales regionales. Banderas verde, amarillo y rojo, trajes con los colores nacionales y reuniones festivas animan los barrios.",
        tips: "El centro de Dakar se cierra durante el desfile: evite circular en coche por la mañana. No fotografíe de cerca a militares ni autoridades sin permiso.",
        where: "Dakar (desfile) y capitales regionales",
      },
      pt: {
        name: "Dia da Independência (4 de abril)",
        summary: "A festa nacional, aniversário da independência proclamada a 4 de abril de 1960.",
        description:
          "A 4 de abril o Senegal celebra a sua independência, em 1960. O dia é marcado por um desfile civil e militar perante o chefe de Estado em Dacar, transmitido pela televisão, e por cerimónias nas capitais regionais. Bandeiras verde, amarela e vermelha, trajes com as cores nacionais e ajuntamentos festivos animam os bairros.",
        tips: "O centro de Dacar é vedado durante o desfile: evite circular de carro de manhã. Não fotografe militares nem autoridades de perto sem autorização.",
        where: "Dacar (desfile) e capitais regionais",
      },
      ar: {
        name: "عيد الاستقلال (4 أبريل)",
        summary: "العيد الوطني، ذكرى الاستقلال المعلن في 4 أبريل 1960.",
        description:
          "في 4 أبريل تحتفل السنغال بنيل استقلالها عام 1960. ويتميّز اليوم بعرض مدني وعسكري أمام رئيس الدولة في داكار يُبثّ على التلفزيون، وباحتفالات في عواصم الأقاليم. وتُضفي الأعلام الخضراء والصفراء والحمراء والملابس بالألوان الوطنية والتجمعات الاحتفالية الحيوية على الأحياء.",
        tips: "يُغلق وسط داكار أثناء العرض: تجنّب التنقل بالسيارة صباحًا. ولا تصوّر العسكريين أو المسؤولين عن قرب دون إذن.",
        where: "داكار (العرض) وعواصم الأقاليم",
      },
    },
  },
  {
    slug: "fete-du-travail-senegal",
    kind: "NATIONAL",
    publicHoliday: true,
    rule: { type: "fixed", month: 5, day: 1 },
    name: "Fête du Travail",
    summary: "Journée des travailleurs, marquée par les défilés syndicaux et la remise des cahiers de doléances.",
    description:
      "Le 1er mai, les centrales syndicales défilent à Dakar et dans les grandes villes, puis remettent traditionnellement leurs revendications au chef de l'État. Pour le voyageur, c'est surtout un jour férié : administrations, banques et nombreux commerces sont fermés.",
    tips: "Anticipez vos démarches (change, banque) la veille ; certains cortèges perturbent la circulation dans le centre de Dakar.",
    where: "Dans tout le pays",
    sources: LOI_FERIES,
    en: {
      name: "Labour Day",
      summary: "Workers' day, marked by union marches and the handing over of grievances.",
      description:
        "On 1 May, the trade union federations march in Dakar and the major towns, then traditionally present their demands to the head of state. For travellers, it is above all a public holiday: government offices, banks and many shops are closed.",
      tips: "Get errands (currency exchange, bank) done the day before; some marches disrupt traffic in central Dakar.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Día del Trabajo",
        summary: "Jornada de los trabajadores, marcada por los desfiles sindicales y la entrega de reivindicaciones.",
        description:
          "El 1 de mayo, las centrales sindicales desfilan en Dakar y en las grandes ciudades y luego entregan tradicionalmente sus reivindicaciones al jefe del Estado. Para el viajero es sobre todo un día festivo: administraciones, bancos y muchos comercios cierran.",
        tips: "Adelante sus trámites (cambio, banco) a la víspera; algunos cortejos perturban la circulación en el centro de Dakar.",
        where: "En todo el país",
      },
      pt: {
        name: "Dia do Trabalhador",
        summary: "Dia dos trabalhadores, marcado pelos desfiles sindicais e pela entrega de reivindicações.",
        description:
          "No 1.º de maio, as centrais sindicais desfilam em Dacar e nas grandes cidades e entregam tradicionalmente as suas reivindicações ao chefe de Estado. Para o viajante é sobretudo um feriado: serviços públicos, bancos e muitas lojas estão fechados.",
        tips: "Trate de câmbio e bancos na véspera; alguns cortejos perturbam o trânsito no centro de Dacar.",
        where: "Em todo o país",
      },
      ar: {
        name: "عيد العمال",
        summary: "يوم العمال، تميّزه مسيرات النقابات وتسليم المطالب.",
        description:
          "في الأول من مايو تسير الاتحادات النقابية في داكار والمدن الكبرى، ثم تسلّم مطالبها تقليديًا إلى رئيس الدولة. وهو بالنسبة إلى المسافر قبل كل شيء يوم عطلة: تُغلق الإدارات والمصارف ومحلات كثيرة.",
        tips: "أنجز معاملاتك (الصرف والمصرف) في اليوم السابق؛ فبعض المسيرات تعرقل حركة المرور في وسط داكار.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "ascension-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 39 },
    name: "Ascension",
    summary: "Fête chrétienne célébrée quarante jours après Pâques, jour férié.",
    description:
      "Le jeudi de l'Ascension, qui commémore la montée au ciel du Christ, est une fête légale au Sénégal. Les paroisses catholiques organisent des messes solennelles ; pour le reste de la population, c'est un jour de repos, avec fermeture des administrations et des banques.",
    where: "Dans tout le pays",
    dateNote: "Jeudi, 39 jours après le dimanche de Pâques (avril à juin).",
    sources: LOI_FERIES,
    en: {
      name: "Ascension Day",
      summary: "A Christian feast held forty days after Easter, a public holiday.",
      description:
        "Ascension Thursday, which commemorates Christ's ascent into heaven, is a legal holiday in Senegal. Catholic parishes hold solemn masses; for the rest of the population it is a day of rest, with government offices and banks closed.",
      where: "Nationwide",
      dateNote: "Thursday, 39 days after Easter Sunday (April to June).",
    },
    i18n: {
      es: {
        name: "Ascensión",
        summary: "Fiesta cristiana celebrada cuarenta días después de Pascua, día festivo.",
        description:
          "El jueves de la Ascensión, que conmemora la subida de Cristo al cielo, es fiesta legal en Senegal. Las parroquias católicas celebran misas solemnes; para el resto de la población es un día de descanso, con administraciones y bancos cerrados.",
        where: "En todo el país",
        dateNote: "Jueves, 39 días después del domingo de Pascua (de abril a junio).",
      },
      pt: {
        name: "Ascensão",
        summary: "Festa cristã celebrada quarenta dias depois da Páscoa, feriado.",
        description:
          "A quinta-feira da Ascensão, que comemora a subida de Cristo ao céu, é feriado legal no Senegal. As paróquias católicas celebram missas solenes; para o resto da população é dia de descanso, com serviços públicos e bancos fechados.",
        where: "Em todo o país",
        dateNote: "Quinta-feira, 39 dias depois do domingo de Páscoa (de abril a junho).",
      },
      ar: {
        name: "عيد الصعود",
        summary: "عيد مسيحي يُحتفل به بعد أربعين يومًا من الفصح، يوم عطلة.",
        description:
          "خميس الصعود، الذي يُحيي ذكرى صعود المسيح إلى السماء، عيد قانوني في السنغال. تقيم الرعايا الكاثوليكية قداديس احتفالية، أما لبقية السكان فهو يوم راحة تُغلق فيه الإدارات والمصارف.",
        where: "في جميع أنحاء البلاد",
        dateNote: "يوم خميس، بعد 39 يومًا من أحد الفصح (من أبريل إلى يونيو).",
      },
    },
  },
  {
    slug: "lundi-de-pentecote-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "easter", offset: 50 },
    place: "sanctuaire-marial-popenguine",
    name: "Lundi de Pentecôte",
    summary: "Jour férié, temps fort du pèlerinage marial national de Popenguine.",
    description:
      "Le lundi de Pentecôte est une fête légale. Il coïncide avec le grand pèlerinage catholique de Popenguine, sur la Petite Côte, où des dizaines de milliers de fidèles venus de tout le pays et des pays voisins convergent vers le sanctuaire marial, beaucoup à pied depuis Dakar. La messe de clôture du lundi rassemble la foule la plus nombreuse. Ailleurs, la journée est chômée.",
    tips: "Évitez la route Dakar–Popenguine le week-end de Pentecôte si vous ne participez pas au pèlerinage : circulation très dense.",
    where: "Dans tout le pays ; pèlerinage à Popenguine",
    dateNote: "Lendemain du dimanche de Pentecôte, 50 jours après Pâques (mai ou juin).",
    sources: [...LOI_FERIES, "https://fr.wikipedia.org/wiki/Basilique_Notre-Dame-de-la-D%C3%A9livrande_de_Popenguine"],
    en: {
      name: "Whit Monday",
      summary: "A public holiday and the high point of the national Marian pilgrimage to Popenguine.",
      description:
        "Whit Monday is a legal holiday. It coincides with the great Catholic pilgrimage to Popenguine on the Petite Côte, where tens of thousands of faithful from across the country and neighbouring states converge on the Marian shrine, many on foot from Dakar. The closing mass on Monday draws the biggest crowd. Elsewhere the day is a day off.",
      tips: "Avoid the Dakar–Popenguine road on Pentecost weekend unless you are joining the pilgrimage: traffic is very heavy.",
      where: "Nationwide; pilgrimage at Popenguine",
      dateNote: "The day after Pentecost Sunday, 50 days after Easter (May or June).",
    },
    i18n: {
      es: {
        name: "Lunes de Pentecostés",
        summary: "Día festivo y momento culminante de la peregrinación mariana nacional de Popenguine.",
        description:
          "El lunes de Pentecostés es fiesta legal. Coincide con la gran peregrinación católica de Popenguine, en la Petite Côte, donde decenas de miles de fieles de todo el país y de los países vecinos convergen hacia el santuario mariano, muchos a pie desde Dakar. La misa de clausura del lunes reúne a la mayor multitud. En el resto del país es día no laborable.",
        tips: "Evite la carretera Dakar–Popenguine el fin de semana de Pentecostés si no participa en la peregrinación: tráfico muy denso.",
        where: "En todo el país; peregrinación en Popenguine",
        dateNote: "Día siguiente al domingo de Pentecostés, 50 días después de Pascua (mayo o junio).",
      },
      pt: {
        name: "Segunda-feira de Pentecostes",
        summary: "Feriado e ponto alto da peregrinação mariana nacional de Popenguine.",
        description:
          "A segunda-feira de Pentecostes é feriado legal. Coincide com a grande peregrinação católica de Popenguine, na Petite Côte, onde dezenas de milhares de fiéis de todo o país e dos países vizinhos convergem para o santuário mariano, muitos a pé desde Dacar. A missa de encerramento de segunda-feira reúne a maior multidão. No resto do país é dia de descanso.",
        tips: "Evite a estrada Dacar–Popenguine no fim de semana de Pentecostes se não participar na peregrinação: trânsito muito intenso.",
        where: "Em todo o país; peregrinação em Popenguine",
        dateNote: "Dia seguinte ao domingo de Pentecostes, 50 dias depois da Páscoa (maio ou junho).",
      },
      ar: {
        name: "اثنين العنصرة",
        summary: "يوم عطلة وذروة الحجّ المريمي الوطني إلى بوبينغين.",
        description:
          "اثنين العنصرة عيد قانوني. ويتزامن مع الحجّ الكاثوليكي الكبير إلى بوبينغين على الساحل الصغير، حيث يتوافد عشرات الآلاف من المؤمنين من أنحاء البلاد والدول المجاورة إلى المزار المريمي، وكثير منهم سيرًا على الأقدام من داكار. ويجمع قدّاس الختام يوم الاثنين أكبر حشد. وفي سائر البلاد يكون اليوم عطلة.",
        tips: "تجنّب طريق داكار–بوبينغين في عطلة العنصرة إن لم تكن مشاركًا في الحجّ: حركة المرور كثيفة جدًا.",
        where: "في جميع أنحاء البلاد؛ الحجّ في بوبينغين",
        dateNote: "اليوم التالي لأحد العنصرة، بعد 50 يومًا من الفصح (مايو أو يونيو).",
      },
    },
  },
  {
    slug: "assomption-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 8, day: 15 },
    name: "Assomption",
    summary: "Fête de la Vierge Marie, jour férié, en pleine saison des pluies.",
    description:
      "Le 15 août, les catholiques célèbrent l'Assomption de la Vierge Marie par des messes et des processions, notamment dans les paroisses de Dakar, de la Petite Côte, du Sine et de Casamance. C'est un jour férié pour tous, en pleine saison des pluies et des vacances scolaires.",
    where: "Dans tout le pays",
    sources: LOI_FERIES,
    en: {
      name: "Assumption Day",
      summary: "The feast of the Virgin Mary, a public holiday in the middle of the rainy season.",
      description:
        "On 15 August Catholics celebrate the Assumption of the Virgin Mary with masses and processions, notably in the parishes of Dakar, the Petite Côte, the Sine and Casamance. It is a public holiday for everyone, in the middle of the rainy season and the school holidays.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Asunción",
        summary: "Fiesta de la Virgen María, día festivo en plena estación de lluvias.",
        description:
          "El 15 de agosto los católicos celebran la Asunción de la Virgen María con misas y procesiones, sobre todo en las parroquias de Dakar, la Petite Côte, el Sine y Casamance. Es festivo para todos, en plena estación de lluvias y vacaciones escolares.",
        where: "En todo el país",
      },
      pt: {
        name: "Assunção",
        summary: "Festa da Virgem Maria, feriado em plena estação das chuvas.",
        description:
          "A 15 de agosto os católicos celebram a Assunção da Virgem Maria com missas e procissões, sobretudo nas paróquias de Dacar, da Petite Côte, do Sine e de Casamança. É feriado para todos, em plena estação das chuvas e férias escolares.",
        where: "Em todo o país",
      },
      ar: {
        name: "عيد انتقال العذراء",
        summary: "عيد مريم العذراء، يوم عطلة في قلب موسم الأمطار.",
        description:
          "في 15 أغسطس يحتفل الكاثوليك بانتقال مريم العذراء بالقداديس والمسيرات الدينية، لا سيما في رعايا داكار والساحل الصغير والسين وكازامانس. وهو يوم عطلة للجميع في قلب موسم الأمطار والعطلة المدرسية.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "toussaint-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 11, day: 1 },
    name: "Toussaint",
    summary: "Fête de tous les saints, jour férié et moment de recueillement dans les cimetières.",
    description:
      "Le 1er novembre, les catholiques célèbrent la Toussaint et se rendent dans les cimetières pour fleurir et nettoyer les tombes de leurs proches, comme au cimetière mixte de Fadiouth où reposent côte à côte chrétiens et musulmans. La journée est fériée dans tout le pays.",
    where: "Dans tout le pays",
    sources: LOI_FERIES,
    en: {
      name: "All Saints' Day",
      summary: "The feast of all saints, a public holiday and a time of remembrance in cemeteries.",
      description:
        "On 1 November Catholics celebrate All Saints' Day and visit cemeteries to clean and decorate their relatives' graves, as in the shared cemetery of Fadiouth, where Christians and Muslims lie side by side. The day is a public holiday nationwide.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Todos los Santos",
        summary: "Fiesta de todos los santos, día festivo y momento de recogimiento en los cementerios.",
        description:
          "El 1 de noviembre los católicos celebran Todos los Santos y acuden a los cementerios para limpiar y adornar con flores las tumbas de sus seres queridos, como en el cementerio mixto de Fadiouth, donde reposan juntos cristianos y musulmanes. El día es festivo en todo el país.",
        where: "En todo el país",
      },
      pt: {
        name: "Dia de Todos os Santos",
        summary: "Festa de todos os santos, feriado e momento de recolhimento nos cemitérios.",
        description:
          "A 1 de novembro os católicos celebram o Dia de Todos os Santos e vão aos cemitérios limpar e enfeitar com flores as campas dos seus entes queridos, como no cemitério misto de Fadiouth, onde cristãos e muçulmanos repousam lado a lado. O dia é feriado em todo o país.",
        where: "Em todo o país",
      },
      ar: {
        name: "عيد جميع القديسين",
        summary: "عيد جميع القديسين، يوم عطلة ووقت للتأمل في المقابر.",
        description:
          "في الأول من نوفمبر يحتفل الكاثوليك بعيد جميع القديسين ويزورون المقابر لتنظيف قبور ذويهم وتزيينها بالزهور، كما في مقبرة فاديوث المختلطة حيث يرقد المسيحيون والمسلمون جنبًا إلى جنب. واليوم عطلة في جميع أنحاء البلاد.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "noel-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "fixed", month: 12, day: 25 },
    name: "Noël",
    summary: "Fête de la Nativité, célébrée par les chrétiens et partagée bien au-delà, jour férié.",
    description:
      "Noël est férié au Sénégal et se vit comme une fête de partage entre communautés : messes de minuit très suivies, rues décorées à Dakar, crèches et repas en famille. À Saint-Louis, la tradition des fanals, défilés de grandes lanternes, est liée aux fêtes de fin d'année. Les jours qui précèdent, marchés et centres commerciaux sont bondés.",
    tips: "Arrivez tôt pour la messe de minuit à la cathédrale de Dakar ; réservez vos transports pour la période des fêtes.",
    where: "Dans tout le pays",
    sources: LOI_FERIES,
    en: {
      name: "Christmas Day",
      summary: "The feast of the Nativity, celebrated by Christians and shared far beyond, a public holiday.",
      description:
        "Christmas is a public holiday in Senegal and is experienced as a festival shared between communities: well-attended midnight masses, decorated streets in Dakar, nativity scenes and family meals. In Saint-Louis, the tradition of the fanals, parades of large lanterns, is linked to the year-end festivities. In the days before, markets and shopping centres are packed.",
      tips: "Arrive early for midnight mass at Dakar cathedral; book your transport for the holiday period.",
      where: "Nationwide",
    },
    i18n: {
      es: {
        name: "Navidad",
        summary: "Fiesta de la Natividad, celebrada por los cristianos y compartida mucho más allá, día festivo.",
        description:
          "La Navidad es festiva en Senegal y se vive como una fiesta compartida entre comunidades: misas del gallo muy concurridas, calles decoradas en Dakar, belenes y comidas familiares. En Saint-Louis, la tradición de los fanals, desfiles de grandes faroles, está ligada a las fiestas de fin de año. Los días previos, mercados y centros comerciales están abarrotados.",
        tips: "Llegue pronto a la misa del gallo en la catedral de Dakar; reserve sus transportes para el periodo de fiestas.",
        where: "En todo el país",
      },
      pt: {
        name: "Natal",
        summary: "Festa da Natividade, celebrada pelos cristãos e partilhada muito para além deles, feriado.",
        description:
          "O Natal é feriado no Senegal e vive-se como uma festa partilhada entre comunidades: missas do galo muito concorridas, ruas decoradas em Dacar, presépios e refeições em família. Em Saint-Louis, a tradição dos fanals, desfiles de grandes lanternas, está ligada às festas de fim de ano. Nos dias anteriores, mercados e centros comerciais ficam a abarrotar.",
        tips: "Chegue cedo à missa do galo na catedral de Dacar; reserve os transportes para o período das festas.",
        where: "Em todo o país",
      },
      ar: {
        name: "عيد الميلاد",
        summary: "عيد ميلاد المسيح، يحتفل به المسيحيون ويشاركهم فيه كثيرون، يوم عطلة.",
        description:
          "عيد الميلاد عطلة رسمية في السنغال ويُعاش كعيد مشترك بين الجماعات: قداديس منتصف الليل المزدحمة، وشوارع مزيّنة في داكار، ومغارات الميلاد والوجبات العائلية. وفي سان لوي ترتبط تقاليد «الفانال»، أي مواكب الفوانيس الكبيرة، باحتفالات آخر السنة. وفي الأيام السابقة تكتظّ الأسواق والمراكز التجارية.",
        tips: "احضر مبكرًا إلى قدّاس منتصف الليل في كاتدرائية داكار، واحجز وسائل النقل لفترة الأعياد.",
        where: "في جميع أنحاء البلاد",
      },
    },
  },
  {
    slug: "korite-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 10, day: 1 },
    name: "Korité (Aïd el-Fitr)",
    summary: "La fête de fin du ramadan : prière collective, tenues neuves, visites et demandes de pardon.",
    description:
      "La Korité marque la fin du mois de jeûne du ramadan. Le matin, les fidèles en boubous neufs se rendent à la grande prière collective dans les mosquées et sur les esplanades, puis les familles partagent un repas de fête et rendent visite aux proches et aux voisins en se demandant mutuellement pardon (« baal ma aq »). Les jours précédents, marchés de tissus et tailleurs tournent à plein régime. C'est un jour férié dans tout le pays.",
    tips: "Beaucoup de commerces et de transports sont à l'arrêt le jour même et les gares routières saturées la veille : anticipez vos déplacements. France Diplomatie signale une hausse des vols et agressions à l'approche des grandes fêtes.",
    where: "Dans tout le pays",
    dateNote: "1er chawwal du calendrier musulman ; date annoncée la veille au soir après l'observation du croissant lunaire (elle peut différer d'un jour selon les communautés). Si la Korité tombe un dimanche, le lundi suivant est férié.",
    sources: [...LOI_FERIES, "https://senego.com/le-lendemain-du-grand-magal-de-touba-est-il-un-jour-ferie_1989063.html", "https://www.diplomatie.gouv.fr/fr/information-par-pays/senegal/conseils-aux-voyageurs-securite"],
    en: {
      name: "Korité (Eid al-Fitr)",
      summary: "The end-of-Ramadan festival: communal prayer, new clothes, visits and asking for forgiveness.",
      description:
        "Korité marks the end of the Ramadan month of fasting. In the morning the faithful, in new boubous, attend the great communal prayer in mosques and on open grounds, then families share a festive meal and visit relatives and neighbours, asking each other for forgiveness (“baal ma aq”). In the days before, fabric markets and tailors work flat out. It is a public holiday nationwide.",
      tips: "Many shops and transport services stop on the day itself and bus stations are packed the day before: plan your travel ahead. France Diplomatie reports more theft and assaults in the run-up to major festivals.",
      where: "Nationwide",
      dateNote: "1 Shawwal in the Islamic calendar; the date is announced the evening before after sighting of the crescent moon (it may differ by a day between communities). If Korité falls on a Sunday, the following Monday is a holiday.",
    },
    i18n: {
      es: {
        name: "Korité (Aíd al-Fitr)",
        summary: "La fiesta del fin del ramadán: oración colectiva, ropa nueva, visitas y petición de perdón.",
        description:
          "La Korité marca el final del mes de ayuno del ramadán. Por la mañana, los fieles con bubús nuevos acuden a la gran oración colectiva en las mezquitas y explanadas; después, las familias comparten una comida festiva y visitan a parientes y vecinos pidiéndose perdón mutuamente («baal ma aq»). Los días anteriores, los mercados de telas y los sastres trabajan sin descanso. Es festivo en todo el país.",
        tips: "Muchos comercios y transportes paran ese día y las estaciones de autobuses se saturan la víspera: anticipe sus desplazamientos. France Diplomatie señala un aumento de robos y agresiones antes de las grandes fiestas.",
        where: "En todo el país",
        dateNote: "1 de shawwal del calendario musulmán; la fecha se anuncia la víspera por la noche tras la observación de la luna creciente (puede variar un día según las comunidades). Si la Korité cae en domingo, el lunes siguiente es festivo.",
      },
      pt: {
        name: "Korité (Eid al-Fitr)",
        summary: "A festa do fim do ramadão: oração coletiva, roupa nova, visitas e pedidos de perdão.",
        description:
          "A Korité assinala o fim do mês de jejum do ramadão. De manhã, os fiéis de bubu novo vão à grande oração coletiva nas mesquitas e nos largos; depois, as famílias partilham uma refeição festiva e visitam parentes e vizinhos, pedindo perdão uns aos outros («baal ma aq»). Nos dias anteriores, os mercados de tecidos e os alfaiates trabalham sem parar. É feriado em todo o país.",
        tips: "Muitas lojas e transportes param nesse dia e as estações rodoviárias enchem na véspera: antecipe as suas deslocações. A France Diplomatie assinala um aumento de roubos e agressões antes das grandes festas.",
        where: "Em todo o país",
        dateNote: "1 de chawwal do calendário muçulmano; a data é anunciada na véspera à noite após a observação do crescente lunar (pode variar um dia entre comunidades). Se a Korité calhar a um domingo, a segunda-feira seguinte é feriado.",
      },
      ar: {
        name: "الكوريتي (عيد الفطر)",
        summary: "عيد نهاية رمضان: صلاة جماعية وملابس جديدة وزيارات وطلب المسامحة.",
        description:
          "يُعلن عيد الكوريتي نهاية شهر صيام رمضان. في الصباح يتوجّه المؤمنون بجلابيبهم الجديدة إلى صلاة العيد الجماعية في المساجد والساحات، ثم تتقاسم الأسر وجبة العيد وتزور الأقارب والجيران طالبين المسامحة بعضهم من بعض («بال ما آق»). وفي الأيام السابقة تعمل أسواق الأقمشة والخيّاطون بلا توقف. وهو يوم عطلة في جميع أنحاء البلاد.",
        tips: "تتوقف محلات ووسائل نقل كثيرة يوم العيد، وتكتظّ محطات الحافلات في اليوم السابق: خطّط لتنقلاتك مسبقًا. وتشير وزارة الخارجية الفرنسية إلى ازدياد السرقات والاعتداءات قبيل الأعياد الكبرى.",
        where: "في جميع أنحاء البلاد",
        dateNote: "الأول من شوال في التقويم الهجري؛ يُعلن الموعد مساء اليوم السابق بعد رؤية الهلال (وقد يختلف يومًا بين الجماعات). وإذا وافق العيد يوم أحد يكون الاثنين التالي عطلة.",
      },
    },
  },
  {
    slug: "tabaski-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 12, day: 10 },
    cover: "/images/voyage/fete-tabaski-senegal",
    name: "Tabaski (Aïd el-Kébir)",
    summary: "La grande fête du sacrifice, la plus importante de l'année pour les familles sénégalaises.",
    description:
      "La Tabaski commémore le sacrifice d'Abraham. Des semaines à l'avance, des marchés aux moutons s'installent partout, jusque sur les trottoirs et les plages de Dakar, et le prix du bélier est un sujet de conversation national. Le jour J, après la prière collective du matin, chaque famille sacrifie un mouton, partage la viande avec les proches et les plus démunis, puis enchaîne visites, grillades et tenues de fête. Beaucoup de citadins rentrent au village : c'est le plus grand mouvement de population de l'année.",
    tips: "Routes, bus et sept-places sont saturés les jours précédents, et l'activité tourne au ralenti pendant plusieurs jours : évitez de prévoir des trajets ou des démarches à ce moment-là. Restez discret lors des sacrifices et demandez avant de photographier. Vigilance accrue contre les vols à l'approche de la fête.",
    where: "Dans tout le pays",
    dateNote: "10 dhou al-hijja du calendrier musulman ; date fixée selon l'observation du croissant lunaire et annoncée quelques jours avant. Si la Tabaski tombe un dimanche, le lundi suivant est férié ; le gouvernement décrète souvent un jour chômé supplémentaire.",
    sources: [...LOI_FERIES, "https://senego.com/le-lendemain-du-grand-magal-de-touba-est-il-un-jour-ferie_1989063.html", "https://www.diplomatie.gouv.fr/fr/information-par-pays/senegal/conseils-aux-voyageurs-securite"],
    en: {
      name: "Tabaski (Eid al-Adha)",
      summary: "The great feast of sacrifice, the most important of the year for Senegalese families.",
      description:
        "Tabaski commemorates Abraham's sacrifice. Weeks in advance, sheep markets spring up everywhere, even on Dakar's pavements and beaches, and the price of a ram becomes a national talking point. On the day, after the communal morning prayer, each family sacrifices a sheep, shares the meat with relatives and the needy, then moves on to visits, grilled meat and festive outfits. Many city dwellers return to their home villages: it is the biggest movement of people of the year.",
      tips: "Roads, buses and sept-places are packed in the days before, and activity slows for several days: avoid planning journeys or errands at that time. Be discreet during the sacrifices and ask before taking photos. Be extra careful about theft as the festival approaches.",
      where: "Nationwide",
      dateNote: "10 Dhu al-Hijjah in the Islamic calendar; the date depends on the sighting of the crescent moon and is announced a few days ahead. If Tabaski falls on a Sunday, the following Monday is a holiday; the government often decrees an extra day off.",
    },
    i18n: {
      es: {
        name: "Tabaski (Aíd al-Adha)",
        summary: "La gran fiesta del sacrificio, la más importante del año para las familias senegalesas.",
        description:
          "La Tabaski conmemora el sacrificio de Abraham. Semanas antes, los mercados de corderos se instalan por todas partes, hasta en las aceras y playas de Dakar, y el precio del carnero se convierte en tema de conversación nacional. El día de la fiesta, tras la oración colectiva de la mañana, cada familia sacrifica un cordero, comparte la carne con sus allegados y los más necesitados y encadena visitas, parrilladas y trajes de fiesta. Muchos habitantes de las ciudades vuelven a su pueblo: es el mayor movimiento de población del año.",
        tips: "Carreteras, autobuses y sept-places se saturan los días previos y la actividad se ralentiza durante varios días: evite prever trayectos o trámites en esas fechas. Sea discreto durante los sacrificios y pida permiso antes de fotografiar. Extreme la vigilancia contra los robos antes de la fiesta.",
        where: "En todo el país",
        dateNote: "10 de dhu al-hiyya del calendario musulmán; la fecha depende de la observación de la luna creciente y se anuncia unos días antes. Si la Tabaski cae en domingo, el lunes siguiente es festivo; el Gobierno decreta a menudo un día no laborable adicional.",
      },
      pt: {
        name: "Tabaski (Eid al-Adha)",
        summary: "A grande festa do sacrifício, a mais importante do ano para as famílias senegalesas.",
        description:
          "A Tabaski comemora o sacrifício de Abraão. Semanas antes, mercados de carneiros instalam-se por todo o lado, até nos passeios e praias de Dacar, e o preço do carneiro torna-se tema de conversa nacional. No dia, após a oração coletiva da manhã, cada família sacrifica um carneiro, partilha a carne com os próximos e os mais necessitados e segue-se uma sucessão de visitas, grelhados e trajes de festa. Muitos habitantes das cidades regressam à aldeia: é a maior deslocação de população do ano.",
        tips: "Estradas, autocarros e sept-places ficam saturados nos dias anteriores e a atividade abranda durante vários dias: evite planear viagens ou tratar de assuntos nessa altura. Seja discreto durante os sacrifícios e peça autorização antes de fotografar. Redobre a atenção aos roubos antes da festa.",
        where: "Em todo o país",
        dateNote: "10 de dhu al-hijja do calendário muçulmano; a data depende da observação do crescente lunar e é anunciada alguns dias antes. Se a Tabaski calhar a um domingo, a segunda-feira seguinte é feriado; o governo decreta muitas vezes um dia de descanso adicional.",
      },
      ar: {
        name: "التاباسكي (عيد الأضحى)",
        summary: "عيد الأضحى الكبير، أهم أعياد السنة لدى الأسر السنغالية.",
        description:
          "يُحيي عيد التاباسكي ذكرى فداء إبراهيم. وقبل أسابيع تنتشر أسواق الأغنام في كل مكان، حتى على أرصفة داكار وشواطئها، ويصبح سعر الكبش حديث البلاد. وفي يوم العيد، بعد صلاة الصباح الجماعية، تذبح كل أسرة أضحيتها وتتقاسم اللحم مع الأقارب والمحتاجين، ثم تتوالى الزيارات والمشويات وملابس العيد. ويعود كثير من سكان المدن إلى قراهم: إنها أكبر حركة تنقّل للسكان في السنة.",
        tips: "تكتظّ الطرق والحافلات وسيارات الأجرة الجماعية في الأيام السابقة، ويتباطأ النشاط عدة أيام: تجنّب برمجة رحلات أو معاملات في تلك الفترة. التزم التحفّظ أثناء الذبح واستأذن قبل التصوير. وكن أكثر حذرًا من السرقات مع اقتراب العيد.",
        where: "في جميع أنحاء البلاد",
        dateNote: "العاشر من ذي الحجة في التقويم الهجري؛ يتحدد الموعد برؤية الهلال ويُعلن قبل أيام. وإذا وافق العيد يوم أحد يكون الاثنين التالي عطلة، وكثيرًا ما تقرّر الحكومة يوم عطلة إضافيًا.",
      },
    },
  },
  {
    slug: "tamkharit-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 1, day: 10 },
    name: "Tamkharit (Achoura) et Tadjabone",
    summary: "Dixième jour de la nouvelle année musulmane : couscous du soir et carnaval nocturne des enfants.",
    description:
      "Le Tamkharit, nom sénégalais de l'Achoura, tombe le dixième jour du premier mois de l'année musulmane. Le soir, les familles se retrouvent autour d'un copieux couscous de mil (thiéré) à la viande et aux légumes, censé assurer l'abondance pour l'année. Ensuite vient le Tadjabone : enfants et jeunes, garçons déguisés en filles et inversement, le visage maquillé, parcourent les rues en chantant et en dansant pour réclamer de petites étrennes. Le jour du Tamkharit est férié.",
    tips: "Prévoyez quelques pièces pour les groupes d'enfants du Tadjabone. Le lendemain n'est pas férié.",
    where: "Dans tout le pays",
    dateNote: "10 mouharram du calendrier musulman, date fixée selon l'observation du croissant lunaire ; le repas et le Tadjabone ont lieu le soir.",
    sources: [...LOI_FERIES, "https://fr.wikipedia.org/wiki/Tadjabone"],
    en: {
      name: "Tamkharit (Ashura) and Tadjabone",
      summary: "The tenth day of the Islamic New Year: an evening couscous and a children's night-time carnival.",
      description:
        "Tamkharit, the Senegalese name for Ashura, falls on the tenth day of the first month of the Islamic year. In the evening, families gather around a generous millet couscous (thiéré) with meat and vegetables, believed to ensure plenty for the year. Then comes Tadjabone: children and young people, boys dressed as girls and vice versa, faces painted, go through the streets singing and dancing to ask for small gifts of money. Tamkharit day is a public holiday.",
      tips: "Keep a few coins handy for the Tadjabone groups of children. The following day is not a holiday.",
      where: "Nationwide",
      dateNote: "10 Muharram in the Islamic calendar, set by sighting of the crescent moon; the meal and Tadjabone take place in the evening.",
    },
    i18n: {
      es: {
        name: "Tamkharit (Achura) y Tadjabone",
        summary: "Décimo día del año nuevo musulmán: cuscús de la noche y carnaval nocturno de los niños.",
        description:
          "El Tamkharit, nombre senegalés de la Achura, cae el décimo día del primer mes del año musulmán. Por la noche, las familias se reúnen en torno a un abundante cuscús de mijo (thiéré) con carne y verduras, que debe asegurar la abundancia durante el año. Después llega el Tadjabone: niños y jóvenes, chicos disfrazados de chicas y viceversa, con la cara maquillada, recorren las calles cantando y bailando para pedir pequeños aguinaldos. El día del Tamkharit es festivo.",
        tips: "Lleve algunas monedas para los grupos de niños del Tadjabone. El día siguiente no es festivo.",
        where: "En todo el país",
        dateNote: "10 de muharram del calendario musulmán, fecha fijada según la observación de la luna creciente; la cena y el Tadjabone tienen lugar por la noche.",
      },
      pt: {
        name: "Tamkharit (Achura) e Tadjabone",
        summary: "Décimo dia do ano novo muçulmano: cuscuz da noite e carnaval noturno das crianças.",
        description:
          "O Tamkharit, nome senegalês da Achura, calha no décimo dia do primeiro mês do ano muçulmano. À noite, as famílias reúnem-se em torno de um farto cuscuz de milho-miúdo (thiéré) com carne e legumes, que deve garantir a abundância durante o ano. Segue-se o Tadjabone: crianças e jovens, rapazes vestidos de raparigas e vice-versa, de rosto pintado, percorrem as ruas a cantar e a dançar para pedir pequenas ofertas em dinheiro. O dia do Tamkharit é feriado.",
        tips: "Tenha algumas moedas para os grupos de crianças do Tadjabone. O dia seguinte não é feriado.",
        where: "Em todo o país",
        dateNote: "10 de muharram do calendário muçulmano, data fixada segundo a observação do crescente lunar; a refeição e o Tadjabone decorrem à noite.",
      },
      ar: {
        name: "التامخاريت (عاشوراء) والتاجابون",
        summary: "اليوم العاشر من السنة الهجرية الجديدة: كسكسي المساء وكرنفال الأطفال الليلي.",
        description:
          "التامخاريت هو الاسم السنغالي لعاشوراء، ويوافق اليوم العاشر من الشهر الأول في السنة الهجرية. في المساء تجتمع الأسر حول طبق وافر من كسكسي الدخن (تييري) باللحم والخضار، يُعتقد أنه يجلب الخير طوال العام. ثم يأتي «التاجابون»: أطفال وشباب، يتنكّر فيه الفتيان في زيّ الفتيات والعكس، بوجوه مزيّنة، يجوبون الشوارع مغنّين راقصين لطلب هدايا نقدية صغيرة. ويوم التامخاريت عطلة رسمية.",
        tips: "احتفظ ببعض القطع النقدية لمجموعات أطفال التاجابون. واليوم التالي ليس عطلة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "العاشر من محرّم في التقويم الهجري، ويتحدد برؤية الهلال؛ وتُقام الوجبة والتاجابون في المساء.",
      },
    },
  },
  {
    slug: "maouloud-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 3, day: 12 },
    name: "Maouloud (Gamou)",
    summary: "La naissance du Prophète, célébrée par des nuits de prières et de chants dans tout le pays.",
    description:
      "Le Maouloud, appelé Gamou au Sénégal, célèbre la naissance du prophète Mohammed. Dans la nuit, les fidèles se rassemblent dans les mosquées, les grandes cités religieuses et les quartiers pour réciter des poèmes et des chants religieux jusqu'à l'aube ; les plus grands rassemblements ont lieu à Tivaouane, chez les Tidjanes, mais aussi à Médina Baye (Kaolack), Ndiassane, Touba et dans toutes les villes. La journée du Maouloud est fériée.",
    tips: "Les routes vers Tivaouane et Kaolack sont saturées : évitez-les ces jours-là si vous ne participez pas aux célébrations.",
    where: "Dans tout le pays, principalement Tivaouane et Kaolack",
    dateNote: "12 rabi' al-awwal du calendrier musulman ; la veillée a lieu dans la nuit précédant la journée fériée. Date annoncée selon l'observation du croissant lunaire.",
    sources: [...LOI_FERIES, "https://fr.wikipedia.org/wiki/Gamou"],
    en: {
      name: "Maouloud (Gamou)",
      summary: "The Prophet's birthday, celebrated with nights of prayer and song throughout the country.",
      description:
        "Maouloud, called Gamou in Senegal, celebrates the birth of the Prophet Muhammad. During the night, the faithful gather in mosques, the great religious towns and neighbourhoods to recite poems and religious songs until dawn; the biggest gatherings take place in Tivaouane, among the Tijanis, but also in Médina Baye (Kaolack), Ndiassane, Touba and every town. Maouloud day is a public holiday.",
      tips: "Roads to Tivaouane and Kaolack are packed: avoid them on those days unless you are taking part in the celebrations.",
      where: "Nationwide, mainly Tivaouane and Kaolack",
      dateNote: "12 Rabi' al-Awwal in the Islamic calendar; the vigil takes place during the night before the holiday. The date is announced after sighting of the crescent moon.",
    },
    i18n: {
      es: {
        name: "Maouloud (Gamou)",
        summary: "El nacimiento del Profeta, celebrado con noches de oración y cantos en todo el país.",
        description:
          "El Maouloud, llamado Gamou en Senegal, celebra el nacimiento del profeta Mahoma. Durante la noche, los fieles se reúnen en las mezquitas, en las grandes ciudades religiosas y en los barrios para recitar poemas y cantos religiosos hasta el amanecer; las mayores concentraciones tienen lugar en Tivaouane, entre los tiyanis, pero también en Médina Baye (Kaolack), Ndiassane, Touba y en todas las ciudades. El día del Maouloud es festivo.",
        tips: "Las carreteras hacia Tivaouane y Kaolack se saturan: evítelas esos días si no participa en las celebraciones.",
        where: "En todo el país, principalmente Tivaouane y Kaolack",
        dateNote: "12 de rabi al-awwal del calendario musulmán; la vigilia tiene lugar la noche anterior al día festivo. Fecha anunciada según la observación de la luna creciente.",
      },
      pt: {
        name: "Maouloud (Gamou)",
        summary: "O nascimento do Profeta, celebrado com noites de oração e cânticos em todo o país.",
        description:
          "O Maouloud, chamado Gamou no Senegal, celebra o nascimento do profeta Maomé. Durante a noite, os fiéis reúnem-se nas mesquitas, nas grandes cidades religiosas e nos bairros para recitar poemas e cânticos religiosos até de madrugada; os maiores ajuntamentos realizam-se em Tivaouane, entre os tijanis, mas também em Médina Baye (Kaolack), Ndiassane, Touba e em todas as cidades. O dia do Maouloud é feriado.",
        tips: "As estradas para Tivaouane e Kaolack ficam saturadas: evite-as nesses dias se não participar nas celebrações.",
        where: "Em todo o país, sobretudo Tivaouane e Kaolack",
        dateNote: "12 de rabi al-awwal do calendário muçulmano; a vigília decorre na noite anterior ao feriado. Data anunciada segundo a observação do crescente lunar.",
      },
      ar: {
        name: "المولد النبوي (الغامو)",
        summary: "ذكرى مولد النبي، يُحتفل بها بليالٍ من الذكر والإنشاد في جميع أنحاء البلاد.",
        description:
          "يحتفل المولد، المعروف في السنغال باسم «الغامو»، بمولد النبي محمد. وفي الليل يجتمع المؤمنون في المساجد والمدن الدينية الكبرى والأحياء لإنشاد القصائد والأناشيد الدينية حتى الفجر؛ وتُقام أكبر التجمعات في تيفاوان لدى التيجانيين، وكذلك في مدينة باي (كاولاك) وندياسان وطوبى وفي كل المدن. ويوم المولد عطلة رسمية.",
        tips: "تكتظّ الطرق المؤدية إلى تيفاوان وكاولاك: تجنّبها في تلك الأيام إن لم تكن مشاركًا في الاحتفالات.",
        where: "في جميع أنحاء البلاد، ولا سيما تيفاوان وكاولاك",
        dateNote: "الثاني عشر من ربيع الأول في التقويم الهجري؛ وتُقام السهرة في الليلة السابقة ليوم العطلة. ويُعلن الموعد بعد رؤية الهلال.",
      },
    },
  },
  {
    slug: "magal-de-touba-senegal",
    kind: "RELIGIOUS",
    publicHoliday: true,
    rule: { type: "hijri", month: 2, day: 18 },
    destination: "touba",
    place: "grand-magal-de-touba",
    cover: "/images/voyage/fete-magal-de-touba-senegal",
    name: "Grand Magal de Touba",
    summary: "Le plus grand rassemblement du pays : des millions de pèlerins mourides à Touba, jour férié depuis 2013.",
    description:
      "Le Grand Magal commémore le départ en exil au Gabon, en 1895, de Cheikh Ahmadou Bamba, fondateur de la confrérie mouride ; il est célébré à Touba depuis 1928. Des millions de pèlerins venus de tout le pays et de la diaspora affluent pour prier à la Grande Mosquée et au mausolée du Cheikh, visiter les guides religieux, réciter ses poèmes (khassaïdes) et partager les repas offerts par les familles d'accueil. D'abord décrété chômé en 2012, le Magal est devenu fête légale par la loi de 2013.",
    tips: "Expérience impressionnante mais extrêmement dense : routes embouteillées, accidents fréquents, hébergement quasi impossible à trouver. Tenue très couverte ; ni alcool ni tabac à Touba. Pour une première découverte de la ville, choisissez une autre période.",
    where: "Touba (région de Diourbel)",
    dateNote: "18 safar du calendrier musulman, date fixée par les autorités mourides selon l'observation du croissant lunaire ; les festivités s'étalent sur plusieurs jours. Le lendemain n'est férié que sur décret présidentiel.",
    sources: [...LOI_FERIES, "https://senego.com/le-lendemain-du-grand-magal-de-touba-est-il-un-jour-ferie_1989063.html", "https://en.wikipedia.org/wiki/Grand_Magal_of_Touba", "https://fr.wikipedia.org/wiki/Magal_de_Touba"],
    en: {
      name: "Grand Magal of Touba",
      summary: "The country's largest gathering: millions of Mouride pilgrims in Touba, a public holiday since 2013.",
      description:
        "The Grand Magal commemorates the departure into exile in Gabon, in 1895, of Cheikh Ahmadou Bamba, founder of the Mouride brotherhood; it has been held in Touba since 1928. Millions of pilgrims from all over the country and the diaspora pour in to pray at the Great Mosque and the Cheikh's mausoleum, visit religious guides, recite his poems (khassaides) and share meals offered by host families. First declared a day off by decree in 2012, the Magal became a legal holiday under a 2013 law.",
      tips: "An impressive but extremely crowded experience: congested roads, frequent accidents and accommodation almost impossible to find. Wear very covering clothes; no alcohol or tobacco in Touba. For a first discovery of the city, choose another time.",
      where: "Touba (Diourbel region)",
      dateNote: "18 Safar in the Islamic calendar, set by the Mouride authorities after sighting of the crescent moon; festivities spread over several days. The following day is a holiday only by presidential decree.",
    },
    i18n: {
      es: {
        name: "Gran Magal de Touba",
        summary: "La mayor concentración del país: millones de peregrinos muridíes en Touba, festivo desde 2013.",
        description:
          "El Gran Magal conmemora la partida al exilio en Gabón, en 1895, de Cheikh Ahmadou Bamba, fundador de la cofradía muridí; se celebra en Touba desde 1928. Millones de peregrinos de todo el país y de la diáspora acuden a rezar en la Gran Mezquita y en el mausoleo del Cheikh, visitar a los guías religiosos, recitar sus poemas (khassaides) y compartir las comidas ofrecidas por las familias anfitrionas. Declarado primero día no laborable por decreto en 2012, el Magal se convirtió en fiesta legal por la ley de 2013.",
        tips: "Experiencia impresionante pero extremadamente multitudinaria: carreteras colapsadas, accidentes frecuentes y alojamiento casi imposible de encontrar. Ropa muy cubierta; ni alcohol ni tabaco en Touba. Para descubrir la ciudad por primera vez, elija otra época.",
        where: "Touba (región de Diourbel)",
        dateNote: "18 de safar del calendario musulmán, fecha fijada por las autoridades muridíes según la observación de la luna creciente; las celebraciones se extienden varios días. El día siguiente solo es festivo por decreto presidencial.",
      },
      pt: {
        name: "Grande Magal de Touba",
        summary: "A maior concentração do país: milhões de peregrinos murides em Touba, feriado desde 2013.",
        description:
          "O Grande Magal comemora a partida para o exílio no Gabão, em 1895, de Cheikh Ahmadou Bamba, fundador da confraria muride; celebra-se em Touba desde 1928. Milhões de peregrinos de todo o país e da diáspora acorrem para rezar na Grande Mesquita e no mausoléu do Cheikh, visitar os guias religiosos, recitar os seus poemas (khassaides) e partilhar as refeições oferecidas pelas famílias de acolhimento. Primeiro declarado dia de descanso por decreto em 2012, o Magal tornou-se feriado legal pela lei de 2013.",
        tips: "Experiência impressionante mas extremamente concorrida: estradas congestionadas, acidentes frequentes e alojamento quase impossível de encontrar. Roupa muito coberta; nem álcool nem tabaco em Touba. Para uma primeira descoberta da cidade, escolha outra altura.",
        where: "Touba (região de Diourbel)",
        dateNote: "18 de safar do calendário muçulmano, data fixada pelas autoridades murides segundo a observação do crescente lunar; as festividades estendem-se por vários dias. O dia seguinte só é feriado por decreto presidencial.",
      },
      ar: {
        name: "الماغال الكبير في طوبى",
        summary: "أكبر تجمّع في البلاد: ملايين الحجاج المريدين في طوبى، يوم عطلة منذ 2013.",
        description:
          "يُحيي الماغال الكبير ذكرى نفي الشيخ أحمدو بامبا، مؤسس الطريقة المريدية، إلى الغابون عام 1895، ويُحتفل به في طوبى منذ 1928. يتوافد ملايين الحجاج من أنحاء البلاد ومن المهجر للصلاة في الجامع الكبير وعند ضريح الشيخ، وزيارة المرشدين الدينيين، وإنشاد قصائده (الخصائد)، وتقاسم الوجبات التي تقدّمها الأسر المضيفة. أُعلن الماغال أولًا يوم عطلة بمرسوم عام 2012، ثم أصبح عيدًا قانونيًا بموجب قانون 2013.",
        tips: "تجربة مذهلة لكنها مزدحمة للغاية: طرق مختنقة وحوادث متكررة وإقامة يكاد يستحيل إيجادها. ارتدِ ملابس ساترة جدًا؛ ولا كحول ولا تبغ في طوبى. ولاكتشاف المدينة أول مرة، اختر وقتًا آخر.",
        where: "طوبى (إقليم ديوربل)",
        dateNote: "الثامن عشر من صفر في التقويم الهجري، وتحدّده السلطات المريدية بعد رؤية الهلال؛ وتمتد الاحتفالات عدة أيام. ولا يكون اليوم التالي عطلة إلا بمرسوم رئاسي.",
      },
    },
  },
  {
    slug: "ramadan-senegal",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 1, days: 30 },
    cover: "/images/voyage/fete-ramadan-senegal",
    name: "Ramadan (Koor)",
    summary: "Le mois de jeûne, qui change le rythme du pays : journées calmes et soirées animées autour du « ndogou ».",
    description:
      "Pendant le ramadan, appelé « koor » en wolof, la majorité musulmane jeûne de l'aube au coucher du soleil. Les journées sont plus calmes et les horaires de travail souvent aménagés ; au coucher du soleil, la rupture du jeûne (« ndogou ») réunit familles et voisins autour de dattes, de café Touba, de bouillies et de pain, et des vendeurs proposent ces collations au bord des routes. Les soirées sont animées, les mosquées pleines pour les prières nocturnes. Le mois s'achève par la Korité.",
    tips: "Évitez de manger, boire ou fumer ostensiblement en public dans la journée, surtout hors des zones touristiques. Les transports sont désorganisés à l'heure du ndogou : ne prévoyez pas de trajet au coucher du soleil.",
    where: "Dans tout le pays",
    dateNote: "Mois de ramadan (9e mois du calendrier musulman), environ 29 ou 30 jours ; début et fin annoncés selon l'observation du croissant lunaire. Non férié.",
    sources: ["https://lepetitjournal.com/dakar/jours-feries-senegal-295473", "https://fr.wikipedia.org/wiki/A%C3%AFd_el-Fitr"],
    en: {
      name: "Ramadan (Koor)",
      summary: "The month of fasting, which changes the country's rhythm: quiet days and lively evenings around the “ndogou”.",
      description:
        "During Ramadan, called “koor” in Wolof, the Muslim majority fasts from dawn to sunset. Days are quieter and working hours are often adjusted; at sunset, the breaking of the fast (“ndogou”) brings families and neighbours together over dates, café Touba, porridges and bread, and vendors sell these snacks by the roadside. Evenings are lively and mosques are full for night prayers. The month ends with Korité.",
      tips: "Avoid conspicuously eating, drinking or smoking in public during the day, especially outside tourist areas. Transport is disrupted at ndogou time: do not plan a journey at sunset.",
      where: "Nationwide",
      dateNote: "Month of Ramadan (9th month of the Islamic calendar), about 29 or 30 days; start and end announced after sighting of the crescent moon. Not a public holiday.",
    },
    i18n: {
      es: {
        name: "Ramadán (Koor)",
        summary: "El mes de ayuno, que cambia el ritmo del país: días tranquilos y noches animadas en torno al «ndogou».",
        description:
          "Durante el ramadán, llamado «koor» en wolof, la mayoría musulmana ayuna desde el alba hasta la puesta del sol. Los días son más tranquilos y los horarios laborales suelen adaptarse; al ponerse el sol, la ruptura del ayuno («ndogou») reúne a familias y vecinos en torno a dátiles, café Touba, papillas y pan, y los vendedores ofrecen estos tentempiés al borde de las carreteras. Las noches son animadas y las mezquitas se llenan para las oraciones nocturnas. El mes termina con la Korité.",
        tips: "Evite comer, beber o fumar ostensiblemente en público durante el día, sobre todo fuera de las zonas turísticas. Los transportes se desorganizan a la hora del ndogou: no prevea trayectos al atardecer.",
        where: "En todo el país",
        dateNote: "Mes de ramadán (9.º mes del calendario musulmán), unos 29 o 30 días; inicio y fin anunciados según la observación de la luna creciente. No festivo.",
      },
      pt: {
        name: "Ramadão (Koor)",
        summary: "O mês de jejum, que muda o ritmo do país: dias calmos e noites animadas em torno do «ndogou».",
        description:
          "Durante o ramadão, chamado «koor» em wolof, a maioria muçulmana jejua da alvorada ao pôr do sol. Os dias são mais calmos e os horários de trabalho muitas vezes ajustados; ao pôr do sol, a quebra do jejum («ndogou») reúne famílias e vizinhos em torno de tâmaras, café Touba, papas e pão, e há vendedores destes petiscos à beira das estradas. As noites são animadas e as mesquitas enchem-se para as orações noturnas. O mês termina com a Korité.",
        tips: "Evite comer, beber ou fumar ostensivamente em público durante o dia, sobretudo fora das zonas turísticas. Os transportes ficam desorganizados à hora do ndogou: não planeie viagens ao pôr do sol.",
        where: "Em todo o país",
        dateNote: "Mês do ramadão (9.º mês do calendário muçulmano), cerca de 29 ou 30 dias; início e fim anunciados segundo a observação do crescente lunar. Não é feriado.",
      },
      ar: {
        name: "رمضان (كور)",
        summary: "شهر الصيام الذي يغيّر إيقاع البلاد: أيام هادئة وأمسيات نابضة حول «الندوغو».",
        description:
          "خلال رمضان، المسمّى «كور» بالولوفية، تصوم الأغلبية المسلمة من الفجر حتى غروب الشمس. تكون الأيام أهدأ وكثيرًا ما تُعدَّل ساعات العمل؛ وعند الغروب يجمع الإفطار («الندوغو») الأسر والجيران حول التمر وقهوة طوبى والعصائد والخبز، ويبيع الباعة هذه الوجبات الخفيفة على جوانب الطرق. وتكون الأمسيات حيّة والمساجد ممتلئة لصلوات الليل. وينتهي الشهر بعيد الكوريتي.",
        tips: "تجنّب الأكل أو الشرب أو التدخين علنًا أثناء النهار، لا سيما خارج المناطق السياحية. ويضطرب النقل وقت الإفطار: لا تبرمج رحلة عند الغروب.",
        where: "في جميع أنحاء البلاد",
        dateNote: "شهر رمضان (الشهر التاسع في التقويم الهجري)، نحو 29 أو 30 يومًا؛ ويُعلن بدؤه ونهايته برؤية الهلال. ليس يوم عطلة.",
      },
    },
  },
  {
    slug: "laylatoul-qadr-senegal",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 9, day: 27 },
    name: "Leylatoul Qadr (Nuit du Destin)",
    summary: "La nuit la plus sacrée du ramadan, veillée de prières dans les mosquées et les foyers religieux.",
    description:
      "Les musulmans sénégalais célèbrent généralement la Nuit du Destin, qui commémore la révélation du Coran, dans la nuit du 26 au 27 du mois de ramadan. Mosquées et foyers religieux restent ouverts toute la nuit pour des prières, des récitations du Coran et des chants ; beaucoup de fidèles distribuent des aumônes. Ambiance de grande ferveur, notamment dans les grandes mosquées de Dakar et dans les cités religieuses.",
    tips: "Si vous logez près d'une mosquée, attendez-vous à une nuit animée. Restez discret et en tenue couverte à proximité des lieux de prière.",
    where: "Dans tout le pays",
    dateNote: "Nuit du 26 au 27 ramadan selon l'usage le plus courant ; date dépendant de l'observation du croissant lunaire. Non férié.",
    sources: ["https://lepetitjournal.com/dakar/jours-feries-senegal-295473", "https://fr.wikipedia.org/wiki/A%C3%AFd_el-Fitr"],
    en: {
      name: "Leylatoul Qadr (Night of Destiny)",
      summary: "The holiest night of Ramadan, a prayer vigil in mosques and religious centres.",
      description:
        "Senegalese Muslims usually celebrate the Night of Destiny, which commemorates the revelation of the Koran, during the night of the 26th to the 27th of Ramadan. Mosques and religious centres stay open all night for prayers, Koran recitations and chants; many of the faithful give alms. There is a great fervour, especially in Dakar's big mosques and in the religious towns.",
      tips: "If you are staying near a mosque, expect a lively night. Be discreet and dress modestly near places of prayer.",
      where: "Nationwide",
      dateNote: "Night of 26 to 27 Ramadan according to the most common practice; date depends on sighting of the crescent moon. Not a public holiday.",
    },
    i18n: {
      es: {
        name: "Leylatoul Qadr (Noche del Destino)",
        summary: "La noche más sagrada del ramadán, vigilia de oración en las mezquitas y centros religiosos.",
        description:
          "Los musulmanes senegaleses celebran generalmente la Noche del Destino, que conmemora la revelación del Corán, en la noche del 26 al 27 de ramadán. Mezquitas y centros religiosos permanecen abiertos toda la noche para oraciones, recitaciones del Corán y cantos; muchos fieles reparten limosnas. Ambiente de gran fervor, sobre todo en las grandes mezquitas de Dakar y en las ciudades religiosas.",
        tips: "Si se aloja cerca de una mezquita, espere una noche animada. Sea discreto y vista ropa que cubra cerca de los lugares de oración.",
        where: "En todo el país",
        dateNote: "Noche del 26 al 27 de ramadán según el uso más extendido; fecha dependiente de la observación de la luna creciente. No festivo.",
      },
      pt: {
        name: "Leylatoul Qadr (Noite do Destino)",
        summary: "A noite mais sagrada do ramadão, vigília de oração nas mesquitas e centros religiosos.",
        description:
          "Os muçulmanos senegaleses celebram geralmente a Noite do Destino, que comemora a revelação do Corão, na noite de 26 para 27 do ramadão. Mesquitas e centros religiosos ficam abertos toda a noite para orações, recitações do Corão e cânticos; muitos fiéis distribuem esmolas. Ambiente de grande fervor, sobretudo nas grandes mesquitas de Dacar e nas cidades religiosas.",
        tips: "Se ficar perto de uma mesquita, conte com uma noite animada. Seja discreto e use roupa que cubra perto dos locais de oração.",
        where: "Em todo o país",
        dateNote: "Noite de 26 para 27 do ramadão segundo o uso mais comum; data dependente da observação do crescente lunar. Não é feriado.",
      },
      ar: {
        name: "ليلة القدر",
        summary: "أقدس ليالي رمضان، سهرة صلاة في المساجد والمراكز الدينية.",
        description:
          "يحتفل المسلمون السنغاليون عادةً بليلة القدر، التي تُحيي ذكرى نزول القرآن، في ليلة السادس والعشرين إلى السابع والعشرين من رمضان. وتبقى المساجد والمراكز الدينية مفتوحة طوال الليل للصلاة وتلاوة القرآن والإنشاد، ويوزّع كثير من المؤمنين الصدقات. أجواء من الخشوع الكبير، لا سيما في المساجد الكبرى في داكار وفي المدن الدينية.",
        tips: "إن كنت تقيم قرب مسجد فتوقّع ليلة حافلة. التزم التحفّظ والملابس المحتشمة قرب أماكن الصلاة.",
        where: "في جميع أنحاء البلاد",
        dateNote: "ليلة 26 إلى 27 رمضان بحسب العرف الأكثر شيوعًا؛ ويتوقف الموعد على رؤية الهلال. ليست يوم عطلة.",
      },
    },
  },
  {
    slug: "gamou-de-tivaouane",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 3, day: 12 },
    destination: "thies-grande-cote",
    place: "grande-mosquee-tivaouane",
    name: "Gamou de Tivaouane",
    summary: "Le grand rassemblement tidjane du Maouloud, célébré à Tivaouane depuis 1902.",
    description:
      "Institué en 1902 par El Hadji Malick Sy, le Gamou de Tivaouane est le plus grand rassemblement de la confrérie tidjane et l'un des événements religieux les plus suivis du pays. Pendant plusieurs jours, la ville accueille des foules immenses venues écouter conférences religieuses et chants, culminant avec la grande veillée de la nuit du Maouloud (le « burd »), retransmise par les radios et télévisions. Le lendemain, jour du Maouloud, est férié dans tout le pays.",
    tips: "Hébergement très rare et routes saturées : si vous souhaitez y assister, faites-vous accompagner par un membre de la communauté. Tenue couvrante obligatoire.",
    where: "Tivaouane (région de Thiès)",
    dateNote: "Nuit du 11 au 12 rabi' al-awwal (veillée du Maouloud), précédée de plusieurs jours de manifestations ; date fixée selon l'observation du croissant lunaire.",
    sources: ["https://fr.wikipedia.org/wiki/Gamou", "https://fr.wikipedia.org/wiki/Tivaouane"],
    en: {
      name: "Gamou of Tivaouane",
      summary: "The great Tijani Maouloud gathering, held in Tivaouane since 1902.",
      description:
        "Instituted in 1902 by El Hadji Malick Sy, the Gamou of Tivaouane is the largest gathering of the Tijani brotherhood and one of the country's most followed religious events. For several days the town welcomes immense crowds who come to hear religious lectures and chants, culminating in the great vigil on the night of Maouloud (the “burd”), broadcast on radio and television. The following day, Maouloud day, is a public holiday nationwide.",
      tips: "Accommodation is very scarce and roads are jammed: if you want to attend, go with a member of the community. Covering clothes are compulsory.",
      where: "Tivaouane (Thiès region)",
      dateNote: "Night of 11 to 12 Rabi' al-Awwal (Maouloud vigil), preceded by several days of events; date set after sighting of the crescent moon.",
    },
    i18n: {
      es: {
        name: "Gamou de Tivaouane",
        summary: "La gran concentración tiyani del Maouloud, celebrada en Tivaouane desde 1902.",
        description:
          "Instituido en 1902 por El Hadji Malick Sy, el Gamou de Tivaouane es la mayor concentración de la cofradía tiyani y uno de los acontecimientos religiosos más seguidos del país. Durante varios días la ciudad acoge multitudes inmensas que acuden a escuchar conferencias religiosas y cantos, y culmina con la gran vigilia de la noche del Maouloud (el «burd»), retransmitida por radio y televisión. El día siguiente, día del Maouloud, es festivo en todo el país.",
        tips: "Alojamiento muy escaso y carreteras saturadas: si desea asistir, vaya acompañado de un miembro de la comunidad. Ropa que cubra obligatoria.",
        where: "Tivaouane (región de Thiès)",
        dateNote: "Noche del 11 al 12 de rabi al-awwal (vigilia del Maouloud), precedida de varios días de actos; fecha fijada según la observación de la luna creciente.",
      },
      pt: {
        name: "Gamou de Tivaouane",
        summary: "A grande concentração tijani do Maouloud, celebrada em Tivaouane desde 1902.",
        description:
          "Instituído em 1902 por El Hadji Malick Sy, o Gamou de Tivaouane é a maior concentração da confraria tijani e um dos acontecimentos religiosos mais seguidos do país. Durante vários dias a cidade acolhe multidões imensas que vêm ouvir conferências religiosas e cânticos, culminando na grande vigília da noite do Maouloud (o «burd»), transmitida pela rádio e pela televisão. O dia seguinte, dia do Maouloud, é feriado em todo o país.",
        tips: "Alojamento muito escasso e estradas saturadas: se quiser assistir, faça-se acompanhar por um membro da comunidade. Roupa que cubra obrigatória.",
        where: "Tivaouane (região de Thiès)",
        dateNote: "Noite de 11 para 12 de rabi al-awwal (vigília do Maouloud), precedida de vários dias de eventos; data fixada segundo a observação do crescente lunar.",
      },
      ar: {
        name: "غامو تيفاوان",
        summary: "التجمّع التيجاني الكبير للمولد النبوي، يُقام في تيفاوان منذ 1902.",
        description:
          "أسّسه الحاج مالك سي عام 1902، ويُعدّ غامو تيفاوان أكبر تجمّع للطريقة التيجانية ومن أكثر المناسبات الدينية متابعة في البلاد. وعلى مدى أيام تستقبل المدينة حشودًا هائلة تأتي للاستماع إلى المحاضرات الدينية والأناشيد، وتبلغ ذروتها في السهرة الكبرى ليلة المولد («البردة») التي تبثّها الإذاعات والتلفزيونات. واليوم التالي، يوم المولد، عطلة في جميع أنحاء البلاد.",
        tips: "الإقامة نادرة جدًا والطرق مكتظّة: إن رغبت في الحضور فاصطحب أحد أفراد الجماعة. الملابس الساترة إلزامية.",
        where: "تيفاوان (إقليم تييس)",
        dateNote: "ليلة 11 إلى 12 ربيع الأول (سهرة المولد)، تسبقها أيام من الفعاليات؛ ويتحدد الموعد برؤية الهلال.",
      },
    },
  },
  {
    slug: "magal-kazu-rajab-touba",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 7, day: 27 },
    destination: "touba",
    name: "Magal de Kazu Rajab",
    summary: "À Touba, la célébration de la naissance de Serigne Fallou Mbacké, deuxième khalife des Mourides.",
    description:
      "Le Kazu Rajab célèbre la naissance de Serigne Fallou Mbacké, fils de Cheikh Ahmadou Bamba et khalife général des Mourides de 1945 à 1968, sous la direction duquel la Grande Mosquée de Touba fut achevée. Né selon la tradition un 27 rajab, jour commémoratif de l'ascension du Prophète, il est honoré par des milliers de fidèles qui se rassemblent autour de la Grande Mosquée et de son mausolée, puis rendent visite à ses descendants. Un rassemblement plus intime que le Grand Magal.",
    tips: "Mêmes règles qu'à Touba toute l'année : tenue très couverte, ni alcool ni tabac.",
    where: "Touba (région de Diourbel)",
    dateNote: "Autour du 27 rajab du calendrier musulman (le 16 janvier en 2026) ; date fixée par les autorités mourides selon le calendrier lunaire. Non férié.",
    sources: ["https://fr.allafrica.com/stories/202601160557.html", "https://fr.wikipedia.org/wiki/Fallou_Mback%C3%A9"],
    en: {
      name: "Magal of Kazu Rajab",
      summary: "In Touba, the celebration of the birth of Serigne Fallou Mbacké, second caliph of the Mourides.",
      description:
        "Kazu Rajab celebrates the birth of Serigne Fallou Mbacké, son of Cheikh Ahmadou Bamba and caliph-general of the Mourides from 1945 to 1968, under whose leadership the Great Mosque of Touba was completed. Born, according to tradition, on a 27 Rajab, the day commemorating the Prophet's ascension, he is honoured by thousands of faithful who gather around the Great Mosque and his mausoleum, then visit his descendants. A more intimate gathering than the Grand Magal.",
      tips: "The same rules as in Touba all year round: very covering clothes, no alcohol or tobacco.",
      where: "Touba (Diourbel region)",
      dateNote: "Around 27 Rajab in the Islamic calendar (16 January in 2026); date set by the Mouride authorities according to the lunar calendar. Not a public holiday.",
    },
    i18n: {
      es: {
        name: "Magal de Kazu Rajab",
        summary: "En Touba, la celebración del nacimiento de Serigne Fallou Mbacké, segundo califa de los muridíes.",
        description:
          "El Kazu Rajab celebra el nacimiento de Serigne Fallou Mbacké, hijo de Cheikh Ahmadou Bamba y califa general de los muridíes de 1945 a 1968, bajo cuya dirección se terminó la Gran Mezquita de Touba. Nacido según la tradición un 27 de rajab, día que conmemora la ascensión del Profeta, es honrado por miles de fieles que se reúnen en torno a la Gran Mezquita y a su mausoleo y visitan después a sus descendientes. Una concentración más íntima que el Gran Magal.",
        tips: "Las mismas normas que en Touba todo el año: ropa muy cubierta, ni alcohol ni tabaco.",
        where: "Touba (región de Diourbel)",
        dateNote: "En torno al 27 de rajab del calendario musulmán (el 16 de enero en 2026); fecha fijada por las autoridades muridíes según el calendario lunar. No festivo.",
      },
      pt: {
        name: "Magal de Kazu Rajab",
        summary: "Em Touba, a celebração do nascimento de Serigne Fallou Mbacké, segundo califa dos murides.",
        description:
          "O Kazu Rajab celebra o nascimento de Serigne Fallou Mbacké, filho de Cheikh Ahmadou Bamba e califa-geral dos murides de 1945 a 1968, sob cuja direção a Grande Mesquita de Touba foi concluída. Nascido, segundo a tradição, num 27 de rajab, dia que comemora a ascensão do Profeta, é homenageado por milhares de fiéis que se reúnem em torno da Grande Mesquita e do seu mausoléu e visitam depois os seus descendentes. Uma concentração mais intimista do que o Grande Magal.",
        tips: "As mesmas regras que em Touba durante todo o ano: roupa muito coberta, nem álcool nem tabaco.",
        where: "Touba (região de Diourbel)",
        dateNote: "Por volta de 27 de rajab do calendário muçulmano (16 de janeiro em 2026); data fixada pelas autoridades murides segundo o calendário lunar. Não é feriado.",
      },
      ar: {
        name: "ماغال كازو رجب",
        summary: "في طوبى، الاحتفال بمولد سرين فالو امباكي، الخليفة الثاني للمريدين.",
        description:
          "يحتفل «كازو رجب» بمولد سرين فالو امباكي، نجل الشيخ أحمدو بامبا والخليفة العام للمريدين من 1945 إلى 1968، الذي اكتمل في عهده بناء الجامع الكبير في طوبى. وبحسب التقاليد وُلد في السابع والعشرين من رجب، يوم ذكرى الإسراء والمعراج، ويكرّمه آلاف المؤمنين الذين يجتمعون حول الجامع الكبير وضريحه ثم يزورون أحفاده. تجمّع أكثر حميمية من الماغال الكبير.",
        tips: "القواعد نفسها المعمول بها في طوبى طوال العام: ملابس ساترة جدًا، ولا كحول ولا تبغ.",
        where: "طوبى (إقليم ديوربل)",
        dateNote: "نحو السابع والعشرين من رجب في التقويم الهجري (16 يناير في 2026)؛ وتحدّده السلطات المريدية وفق التقويم القمري. ليس يوم عطلة.",
      },
    },
  },
  {
    slug: "appel-limamou-laye-yoff",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "hijri", month: 8, day: 1 },
    destination: "dakar",
    place: "mausolee-limamou-laye-yoff",
    name: "Appel de Seydina Limamou Laye",
    summary: "La grande célébration annuelle de la confrérie layène, à Yoff et Cambérène.",
    description:
      "Chaque année, les Layènes commémorent l'« Appel » lancé en 1883 à Yoff par Seydina Limamou Laye, qui se déclara alors le Mahdi et fonda leur communauté. Pendant plusieurs jours, des fidèles vêtus de blanc venus de tout le pays se rassemblent à Yoff, autour de la mosquée et du mausolée du fondateur face à l'océan, et à Cambérène, pour des prières, des chants religieux et des conférences. Une occasion rare de découvrir cette confrérie née chez les Lébous de la presqu'île du Cap-Vert.",
    tips: "Vêtements couvrants, de préférence clairs ; restez à l'écart des espaces de prière et demandez toujours avant de photographier. Circulation très difficile à Yoff ces jours-là.",
    where: "Yoff et Cambérène (Dakar)",
    dateNote: "Célébrée selon le calendrier musulman, au mois de chaabane d'après les sources consultées ; la date exacte est annoncée chaque année par le khalifat layène (à vérifier). Non férié.",
    sources: ["https://fr.wikipedia.org/wiki/Layeniyya", "https://en.wikipedia.org/wiki/Layene", "https://fr.wikipedia.org/wiki/Yoff"],
    en: {
      name: "Call of Seydina Limamou Laye",
      summary: "The great annual celebration of the Layene brotherhood, in Yoff and Cambérène.",
      description:
        "Every year the Layenes commemorate the “Call” made in Yoff in 1883 by Seydina Limamou Laye, who then declared himself the Mahdi and founded their community. For several days, faithful dressed in white from all over the country gather in Yoff, around the founder's mosque and mausoleum facing the ocean, and in Cambérène, for prayers, religious chants and lectures. A rare chance to learn about this brotherhood born among the Lebou of the Cap-Vert peninsula.",
      tips: "Wear covering clothes, preferably light-coloured; keep away from prayer areas and always ask before taking photos. Traffic in Yoff is very difficult on those days.",
      where: "Yoff and Cambérène (Dakar)",
      dateNote: "Held according to the Islamic calendar, in the month of Sha'ban according to the sources consulted; the exact date is announced each year by the Layene caliphate (to be confirmed). Not a public holiday.",
    },
    i18n: {
      es: {
        name: "Llamada de Seydina Limamou Laye",
        summary: "La gran celebración anual de la cofradía layene, en Yoff y Cambérène.",
        description:
          "Cada año los layenes conmemoran la «Llamada» lanzada en Yoff en 1883 por Seydina Limamou Laye, que se declaró entonces el Mahdi y fundó su comunidad. Durante varios días, fieles vestidos de blanco llegados de todo el país se reúnen en Yoff, en torno a la mezquita y el mausoleo del fundador frente al océano, y en Cambérène, para oraciones, cantos religiosos y conferencias. Una ocasión excepcional para conocer esta cofradía nacida entre los lebu de la península de Cabo Verde.",
        tips: "Ropa que cubra, preferiblemente clara; manténgase al margen de los espacios de oración y pida siempre permiso antes de fotografiar. Circulación muy difícil en Yoff esos días.",
        where: "Yoff y Cambérène (Dakar)",
        dateNote: "Se celebra según el calendario musulmán, en el mes de shabán según las fuentes consultadas; la fecha exacta la anuncia cada año el califato layene (por confirmar). No festivo.",
      },
      pt: {
        name: "Apelo de Seydina Limamou Laye",
        summary: "A grande celebração anual da confraria layène, em Yoff e Cambérène.",
        description:
          "Todos os anos os layènes comemoram o «Apelo» lançado em Yoff em 1883 por Seydina Limamou Laye, que então se declarou o Mahdi e fundou a sua comunidade. Durante vários dias, fiéis vestidos de branco vindos de todo o país reúnem-se em Yoff, em torno da mesquita e do mausoléu do fundador virados para o oceano, e em Cambérène, para orações, cânticos religiosos e conferências. Uma ocasião rara para conhecer esta confraria nascida entre os lebu da península de Cabo Verde.",
        tips: "Roupa que cubra, de preferência clara; mantenha-se afastado dos espaços de oração e peça sempre autorização antes de fotografar. Trânsito muito difícil em Yoff nesses dias.",
        where: "Yoff e Cambérène (Dacar)",
        dateNote: "Celebrado segundo o calendário muçulmano, no mês de chaabane segundo as fontes consultadas; a data exata é anunciada todos os anos pelo califado layène (a confirmar). Não é feriado.",
      },
      ar: {
        name: "نداء سيدينا ليمامو لاي",
        summary: "الاحتفال السنوي الكبير للطريقة اللايينية، في يوف وكامبيرين.",
        description:
          "يُحيي اللايينيون كل عام ذكرى «النداء» الذي أطلقه سيدينا ليمامو لاي في يوف عام 1883، حين أعلن أنه المهدي وأسّس جماعتهم. وعلى مدى أيام يجتمع مريدون يرتدون الأبيض، قادمون من أنحاء البلاد، في يوف حول مسجد المؤسس وضريحه المطلّين على المحيط، وفي كامبيرين، للصلاة والإنشاد الديني والمحاضرات. فرصة نادرة للتعرّف إلى هذه الطريقة التي نشأت لدى شعب الليبو في شبه جزيرة الرأس الأخضر.",
        tips: "ارتدِ ملابس ساترة، ويُفضَّل أن تكون فاتحة اللون؛ وابقَ بعيدًا عن أماكن الصلاة واستأذن دائمًا قبل التصوير. حركة المرور صعبة جدًا في يوف في تلك الأيام.",
        where: "يوف وكامبيرين (داكار)",
        dateNote: "يُحتفل به وفق التقويم الهجري، في شهر شعبان بحسب المصادر المطّلع عليها؛ وتعلن الخلافة اللايينية الموعد الدقيق كل عام (يحتاج إلى تأكيد). ليس يوم عطلة.",
      },
    },
  },
  {
    slug: "pelerinage-marial-popenguine",
    kind: "RELIGIOUS",
    publicHoliday: false,
    rule: { type: "easter", offset: 48, days: 3 },
    destination: "petite-cote",
    place: "sanctuaire-marial-popenguine",
    name: "Pèlerinage marial de Popenguine",
    summary: "Le grand pèlerinage catholique national, chaque week-end de Pentecôte, au sanctuaire de la Vierge noire.",
    description:
      "Depuis la fin du XIXe siècle, le sanctuaire Notre-Dame-de-la-Délivrande de Popenguine attire chaque année, le week-end de Pentecôte, des dizaines de milliers de pèlerins du Sénégal et des pays voisins. Beaucoup de jeunes s'y rendent à pied depuis Dakar et les paroisses voisines, en marchant plusieurs jours ; veillées, confessions, chemins de croix et chants animent le site jusqu'à la grande messe de clôture du lundi de Pentecôte, présidée par les évêques.",
    tips: "Logement introuvable sur place : venez pour la journée ou réservez très tôt sur la Petite Côte. Chapeau, eau et chaussures confortables ; foule très dense.",
    where: "Popenguine (Petite Côte)",
    dateNote: "Du samedi au lundi de Pentecôte ; programme publié par le comité national du pèlerinage.",
    sources: ["https://fr.wikipedia.org/wiki/Basilique_Notre-Dame-de-la-D%C3%A9livrande_de_Popenguine", "https://fr.wikipedia.org/wiki/Sanctuaire_Notre-Dame-de-la-D%C3%A9livrande_de_Popenguine", "https://fr.wikipedia.org/wiki/Popenguine-Ndayane"],
    en: {
      name: "Popenguine Marian pilgrimage",
      summary: "The great national Catholic pilgrimage, every Pentecost weekend, to the shrine of the Black Madonna.",
      description:
        "Since the late 19th century, the shrine of Our Lady of La Délivrande in Popenguine has drawn tens of thousands of pilgrims from Senegal and neighbouring countries every Pentecost weekend. Many young people walk there from Dakar and nearby parishes over several days; vigils, confessions, Stations of the Cross and singing fill the site until the great closing mass on Whit Monday, presided over by the bishops.",
      tips: "Accommodation on site is impossible to find: come for the day or book very early on the Petite Côte. Bring a hat, water and comfortable shoes; crowds are very dense.",
      where: "Popenguine (Petite Côte)",
      dateNote: "From Saturday to Whit Monday; programme published by the national pilgrimage committee.",
    },
    i18n: {
      es: {
        name: "Peregrinación mariana de Popenguine",
        summary: "La gran peregrinación católica nacional, cada fin de semana de Pentecostés, al santuario de la Virgen negra.",
        description:
          "Desde finales del siglo XIX, el santuario de Nuestra Señora de la Délivrande de Popenguine atrae cada año, el fin de semana de Pentecostés, a decenas de miles de peregrinos de Senegal y de los países vecinos. Muchos jóvenes llegan a pie desde Dakar y las parroquias cercanas, caminando varios días; vigilias, confesiones, viacrucis y cantos animan el lugar hasta la gran misa de clausura del lunes de Pentecostés, presidida por los obispos.",
        tips: "Es imposible encontrar alojamiento allí: venga por el día o reserve muy pronto en la Petite Côte. Sombrero, agua y calzado cómodo; multitud muy densa.",
        where: "Popenguine (Petite Côte)",
        dateNote: "Del sábado al lunes de Pentecostés; programa publicado por el comité nacional de la peregrinación.",
      },
      pt: {
        name: "Peregrinação mariana de Popenguine",
        summary: "A grande peregrinação católica nacional, em cada fim de semana de Pentecostes, ao santuário da Virgem negra.",
        description:
          "Desde o final do século XIX, o santuário de Nossa Senhora da Délivrande de Popenguine atrai todos os anos, no fim de semana de Pentecostes, dezenas de milhares de peregrinos do Senegal e dos países vizinhos. Muitos jovens vão a pé desde Dacar e das paróquias vizinhas, caminhando vários dias; vigílias, confissões, vias-sacras e cânticos animam o local até à grande missa de encerramento da segunda-feira de Pentecostes, presidida pelos bispos.",
        tips: "É impossível encontrar alojamento no local: venha passar o dia ou reserve muito cedo na Petite Côte. Chapéu, água e calçado confortável; multidão muito densa.",
        where: "Popenguine (Petite Côte)",
        dateNote: "De sábado a segunda-feira de Pentecostes; programa publicado pelo comité nacional da peregrinação.",
      },
      ar: {
        name: "الحجّ المريمي إلى بوبينغين",
        summary: "الحجّ الكاثوليكي الوطني الكبير، في كل عطلة عنصرة، إلى مزار العذراء السوداء.",
        description:
          "منذ أواخر القرن التاسع عشر يجتذب مزار سيدة لا ديليفراند في بوبينغين كل عام، في عطلة العنصرة، عشرات الآلاف من الحجاج من السنغال والدول المجاورة. ويأتي كثير من الشباب سيرًا على الأقدام من داكار والرعايا القريبة مشيًا لعدة أيام؛ وتملأ السهرات والاعترافات ودرب الصليب والتراتيل المكان حتى قدّاس الختام الكبير يوم اثنين العنصرة برئاسة الأساقفة.",
        tips: "يستحيل إيجاد إقامة في المكان: تعال ليوم واحد أو احجز مبكرًا جدًا على الساحل الصغير. قبعة وماء وأحذية مريحة؛ والحشود كثيفة جدًا.",
        where: "بوبينغين (الساحل الصغير)",
        dateNote: "من السبت إلى اثنين العنصرة؛ وتنشر اللجنة الوطنية للحجّ البرنامج.",
      },
    },
  },
  {
    slug: "kankourang-mbour",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "period", from: 8, to: 10 },
    destination: "petite-cote",
    cover: "/images/voyage/fete-kankourang-mbour",
    name: "Kankourang (Mbour et Casamance)",
    summary: "Le masque d'initiation mandingue couvert de fibres rouges, patrimoine immatériel de l'humanité.",
    description:
      "Le kankourang est à la fois un masque et un rituel qui accompagne la circoncision et l'initiation des jeunes garçons chez les Mandingues, en Casamance et à Mbour, où vit une importante communauté mandingue. Personnage couvert de fibres d'écorce rouges, armé de coupe-coupe, il parcourt les rues, surtout le soir et les dimanches, pour protéger les initiés et rappeler l'ordre social ; sa sortie déclenche la course des passants. Le rituel, qui dure environ un mois, a été proclamé patrimoine culturel immatériel par l'UNESCO en 2005.",
    tips: "Gardez vos distances : le kankourang est craint et peut se montrer menaçant. Ne le photographiez pas sans l'accord des organisateurs et ne suivez jamais le cortège en zone d'initiation.",
    where: "Mbour (Petite Côte) et Casamance",
    dateNote: "Période variable selon les années et les communautés, liée au calendrier des initiations (souvent pendant les vacances scolaires, de la fin de l'été à l'automne) ; dates fixées localement par les responsables du rite.",
    sources: ["https://fr.wikipedia.org/wiki/Kankourang"],
    en: {
      name: "Kankurang (Mbour and Casamance)",
      summary: "The Mandinka initiation mask covered in red fibres, part of the intangible heritage of humanity.",
      description:
        "The kankurang is both a mask and a ritual accompanying the circumcision and initiation of young boys among the Mandinka, in Casamance and in Mbour, home to a large Mandinka community. A figure covered in red bark fibres and armed with machetes, it roams the streets, especially in the evening and on Sundays, to protect the initiates and uphold social order; its appearance sends passers-by running. The ritual, which lasts about a month, was proclaimed intangible cultural heritage by UNESCO in 2005.",
      tips: "Keep your distance: the kankurang is feared and can be threatening. Do not photograph it without the organisers' consent and never follow the procession into initiation areas.",
      where: "Mbour (Petite Côte) and Casamance",
      dateNote: "Period varies by year and community, linked to the initiation calendar (often during the school holidays, from late summer to autumn); dates set locally by those in charge of the rite.",
    },
    i18n: {
      es: {
        name: "Kankurang (Mbour y Casamance)",
        summary: "La máscara de iniciación mandinga cubierta de fibras rojas, patrimonio inmaterial de la humanidad.",
        description:
          "El kankurang es a la vez una máscara y un ritual que acompaña la circuncisión y la iniciación de los muchachos entre los mandingas, en Casamance y en Mbour, donde vive una importante comunidad mandinga. Personaje cubierto de fibras rojas de corteza y armado con machetes, recorre las calles, sobre todo por la noche y los domingos, para proteger a los iniciados y recordar el orden social; su aparición hace correr a los transeúntes. El ritual, que dura alrededor de un mes, fue proclamado patrimonio cultural inmaterial por la UNESCO en 2005.",
        tips: "Mantenga la distancia: el kankurang es temido y puede mostrarse amenazante. No lo fotografíe sin el acuerdo de los organizadores y no siga nunca al cortejo en zona de iniciación.",
        where: "Mbour (Petite Côte) y Casamance",
        dateNote: "Periodo variable según los años y las comunidades, ligado al calendario de las iniciaciones (a menudo durante las vacaciones escolares, de finales del verano al otoño); fechas fijadas localmente por los responsables del rito.",
      },
      pt: {
        name: "Kankurang (Mbour e Casamança)",
        summary: "A máscara de iniciação mandinga coberta de fibras vermelhas, património imaterial da humanidade.",
        description:
          "O kankurang é simultaneamente uma máscara e um ritual que acompanha a circuncisão e a iniciação dos rapazes entre os mandingas, em Casamança e em Mbour, onde vive uma importante comunidade mandinga. Personagem coberta de fibras vermelhas de casca de árvore e armada de catanas, percorre as ruas, sobretudo à noite e aos domingos, para proteger os iniciados e lembrar a ordem social; a sua aparição põe os transeuntes a correr. O ritual, que dura cerca de um mês, foi proclamado património cultural imaterial pela UNESCO em 2005.",
        tips: "Mantenha a distância: o kankurang é temido e pode mostrar-se ameaçador. Não o fotografe sem o acordo dos organizadores e nunca siga o cortejo em zona de iniciação.",
        where: "Mbour (Petite Côte) e Casamança",
        dateNote: "Período variável consoante os anos e as comunidades, ligado ao calendário das iniciações (muitas vezes durante as férias escolares, do fim do verão ao outono); datas fixadas localmente pelos responsáveis do rito.",
      },
      ar: {
        name: "الكانكورانغ (مبور وكازامانس)",
        summary: "قناع التكريس لدى الماندينغ المغطّى بألياف حمراء، من التراث الثقافي غير المادي للبشرية.",
        description:
          "الكانكورانغ قناع وطقس في آن واحد يرافق ختان الفتيان وتكريسهم لدى شعب الماندينغ في كازامانس وفي مبور، حيث تعيش جماعة ماندينغية كبيرة. وهو شخصية مغطّاة بألياف لحاء حمراء ومسلّحة بالسواطير، يجوب الشوارع، خاصة في المساء وأيام الأحد، لحماية المكرَّسين وتذكير الناس بالنظام الاجتماعي، فيفرّ المارة عند ظهوره. ويستمر الطقس نحو شهر، وقد أعلنته اليونسكو عام 2005 تراثًا ثقافيًا غير مادي.",
        tips: "حافظ على المسافة: الكانكورانغ مَهيب وقد يبدو مهدِّدًا. لا تصوّره دون موافقة المنظّمين ولا تتبع الموكب أبدًا إلى مناطق التكريس.",
        where: "مبور (الساحل الصغير) وكازامانس",
        dateNote: "فترة متغيّرة بحسب السنوات والجماعات، مرتبطة بتقويم طقوس التكريس (غالبًا في العطلة المدرسية، من أواخر الصيف إلى الخريف)؛ ويحدّد القائمون على الطقس المواعيد محليًا.",
      },
    },
  },
  {
    slug: "xooy-fatick",
    kind: "TRADITIONAL",
    publicHoliday: false,
    rule: { type: "period", from: 5, to: 7 },
    destination: "sine-saloum",
    name: "Xooy, la nuit des saltigués",
    summary: "La grande cérémonie divinatoire sérère, où les prêtres saltigués prédisent la saison des pluies.",
    description:
      "Le Xooy (ou Xoy) est l'événement majeur du calendrier religieux sérère. Avant l'hivernage, les saltigués, prêtres et prêtresses héritiers de lignées anciennes, se réunissent en public, généralement dans la région de Fatick, au cœur de l'ancien royaume du Sine. Au fil d'une longue nuit rythmée par les tambours et les chants, chacun entre en transe et livre ses prédictions sur les pluies, les récoltes, la santé et la vie du pays. La cérémonie attire un large public, sérère et au-delà.",
    tips: "Renseignez-vous localement sur la date et le lieu, annoncés peu de temps à l'avance. Prévoyez de veiller toute la nuit, restez respectueux et demandez avant de photographier.",
    where: "Région de Fatick (pays sérère)",
    dateNote: "Une nuit avant la saison des pluies, le plus souvent entre mai et juillet ; date et lieu fixés chaque année par les saltigués et les autorités coutumières (à confirmer localement).",
    sources: ["https://fr.wikipedia.org/wiki/Saltigu%C3%A9"],
    en: {
      name: "Xooy, the night of the saltigués",
      summary: "The great Serer divination ceremony, where saltigué priests foretell the rainy season.",
      description:
        "The Xooy (or Xoy) is the major event in the Serer religious calendar. Before the rainy season, the saltigués, priests and priestesses heir to ancient lineages, gather in public, usually in the Fatick region, at the heart of the former kingdom of Sine. Through a long night driven by drums and songs, each enters a trance and delivers predictions about the rains, the harvests, health and the life of the country. The ceremony draws a large audience, Serer and beyond.",
      tips: "Ask locally about the date and place, announced at short notice. Be ready to stay up all night, be respectful and ask before taking photos.",
      where: "Fatick region (Serer country)",
      dateNote: "One night before the rainy season, usually between May and July; date and place set each year by the saltigués and customary authorities (to be confirmed locally).",
    },
    i18n: {
      es: {
        name: "Xooy, la noche de los saltigués",
        summary: "La gran ceremonia adivinatoria serer, en la que los sacerdotes saltigués predicen la estación de lluvias.",
        description:
          "El Xooy (o Xoy) es el acontecimiento principal del calendario religioso serer. Antes de la estación de lluvias, los saltigués, sacerdotes y sacerdotisas herederos de antiguos linajes, se reúnen en público, generalmente en la región de Fatick, en el corazón del antiguo reino del Sine. A lo largo de una larga noche al ritmo de tambores y cantos, cada uno entra en trance y anuncia sus predicciones sobre las lluvias, las cosechas, la salud y la vida del país. La ceremonia atrae a un amplio público, serer y no serer.",
        tips: "Infórmese localmente sobre la fecha y el lugar, anunciados con poca antelación. Prepárese para pasar la noche en vela, sea respetuoso y pida permiso antes de fotografiar.",
        where: "Región de Fatick (país serer)",
        dateNote: "Una noche antes de la estación de lluvias, casi siempre entre mayo y julio; fecha y lugar fijados cada año por los saltigués y las autoridades tradicionales (por confirmar localmente).",
      },
      pt: {
        name: "Xooy, a noite dos saltigués",
        summary: "A grande cerimónia divinatória serer, em que os sacerdotes saltigués predizem a estação das chuvas.",
        description:
          "O Xooy (ou Xoy) é o acontecimento principal do calendário religioso serer. Antes da estação das chuvas, os saltigués, sacerdotes e sacerdotisas herdeiros de linhagens antigas, reúnem-se em público, geralmente na região de Fatick, no coração do antigo reino do Sine. Ao longo de uma longa noite ao ritmo de tambores e cânticos, cada um entra em transe e faz as suas previsões sobre as chuvas, as colheitas, a saúde e a vida do país. A cerimónia atrai um público vasto, serer e não só.",
        tips: "Informe-se localmente sobre a data e o local, anunciados com pouca antecedência. Prepare-se para passar a noite em claro, seja respeitoso e peça autorização antes de fotografar.",
        where: "Região de Fatick (país serer)",
        dateNote: "Uma noite antes da estação das chuvas, quase sempre entre maio e julho; data e local fixados todos os anos pelos saltigués e pelas autoridades tradicionais (a confirmar localmente).",
      },
      ar: {
        name: "الخوي، ليلة السالتيغي",
        summary: "الطقس السيريري الكبير للعرافة، حيث يتنبأ الكهنة السالتيغي بموسم الأمطار.",
        description:
          "الخوي (أو خوي) هو الحدث الأبرز في التقويم الديني لشعب السيرير. فقبل موسم الأمطار يجتمع السالتيغي، وهم كهنة وكاهنات يتوارثون سلالات قديمة، علنًا، في إقليم فاتيك عادةً، في قلب مملكة السين القديمة. وخلال ليلة طويلة على إيقاع الطبول والأناشيد يدخل كلّ منهم في حالة وجد ويُعلن تنبؤاته بشأن الأمطار والمحاصيل والصحة وحياة البلاد. ويجتذب الطقس جمهورًا واسعًا من السيرير وغيرهم.",
        tips: "استعلم محليًا عن الموعد والمكان، إذ يُعلنان قبل وقت قصير. واستعد للسهر طوال الليل، والتزم الاحترام واستأذن قبل التصوير.",
        where: "إقليم فاتيك (بلاد السيرير)",
        dateNote: "ليلة واحدة قبل موسم الأمطار، غالبًا بين مايو ويوليو؛ ويحدد السالتيغي والسلطات العرفية الموعد والمكان كل عام (يُستحسن التأكد محليًا).",
      },
    },
  },
  {
    slug: "festival-jazz-saint-louis",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 5, to: 6 },
    destination: "saint-louis",
    cover: "/images/voyage/fete-festival-jazz-saint-louis",
    name: "Festival international de jazz de Saint-Louis",
    summary: "L'un des grands festivals de jazz d'Afrique, depuis 1993, sur l'île classée de Saint-Louis.",
    description:
      "Né en 1993 dans une ville où le jazz s'est implanté dès les années 1940, le Saint-Louis Jazz Festival réunit chaque printemps musiciens africains, européens et américains. Pendant environ cinq jours, concerts sur la grande scène de la place Baya, jam sessions dans les cafés et les hôtels, scènes « off » et animations de rue font vibrer toute l'île. La 34e édition s'est tenue du 13 au 17 mai 2026 et la 35e est annoncée du 4 au 8 mai 2027.",
    tips: "Réservez votre hébergement à Saint-Louis plusieurs mois à l'avance. Gardez un œil sur vos affaires dans la foule le soir.",
    where: "Île de Saint-Louis",
    dateNote: "Cinq jours en mai ou début juin (longtemps autour de la Pentecôte) ; dates annoncées plusieurs mois à l'avance par les organisateurs (saintlouisjazz.org).",
    sources: ["https://au-senegal.com/festival-international-de-jazz-de-saint-louis-2026,18119.html", "https://www.au-senegal.com/festival-international-de-jazz-de-saint-louis-35e-edition,18523.html", "https://fr.wikipedia.org/wiki/Festival_international_de_jazz_de_Saint-Louis"],
    en: {
      name: "Saint-Louis International Jazz Festival",
      summary: "One of Africa's great jazz festivals, since 1993, on the World Heritage island of Saint-Louis.",
      description:
        "Born in 1993 in a town where jazz took root in the 1940s, the Saint-Louis Jazz Festival brings together African, European and American musicians every spring. For about five days, concerts on the main stage on Place Baya, jam sessions in cafés and hotels, fringe stages and street events set the whole island buzzing. The 34th edition took place from 13 to 17 May 2026 and the 35th is announced for 4 to 8 May 2027.",
      tips: "Book accommodation in Saint-Louis several months ahead. Keep an eye on your belongings in the evening crowds.",
      where: "Saint-Louis island",
      dateNote: "Five days in May or early June (long held around Pentecost); dates announced several months ahead by the organisers (saintlouisjazz.org).",
    },
    i18n: {
      es: {
        name: "Festival Internacional de Jazz de Saint-Louis",
        summary: "Uno de los grandes festivales de jazz de África, desde 1993, en la isla patrimonio de Saint-Louis.",
        description:
          "Nacido en 1993 en una ciudad donde el jazz arraigó desde los años 1940, el Saint-Louis Jazz Festival reúne cada primavera a músicos africanos, europeos y americanos. Durante unos cinco días, conciertos en el gran escenario de la plaza Baya, jam sessions en cafés y hoteles, escenarios alternativos y animaciones callejeras hacen vibrar toda la isla. La 34.ª edición se celebró del 13 al 17 de mayo de 2026 y la 35.ª está anunciada del 4 al 8 de mayo de 2027.",
        tips: "Reserve su alojamiento en Saint-Louis con varios meses de antelación. Vigile sus pertenencias entre la multitud por la noche.",
        where: "Isla de Saint-Louis",
        dateNote: "Cinco días en mayo o principios de junio (durante mucho tiempo en torno a Pentecostés); fechas anunciadas con varios meses de antelación por los organizadores (saintlouisjazz.org).",
      },
      pt: {
        name: "Festival Internacional de Jazz de Saint-Louis",
        summary: "Um dos grandes festivais de jazz de África, desde 1993, na ilha de Saint-Louis, Património Mundial.",
        description:
          "Nascido em 1993 numa cidade onde o jazz se implantou desde os anos 1940, o Saint-Louis Jazz Festival reúne todas as primaveras músicos africanos, europeus e americanos. Durante cerca de cinco dias, concertos no grande palco da praça Baya, jam sessions em cafés e hotéis, palcos «off» e animação de rua fazem vibrar toda a ilha. A 34.ª edição decorreu de 13 a 17 de maio de 2026 e a 35.ª está anunciada de 4 a 8 de maio de 2027.",
        tips: "Reserve o alojamento em Saint-Louis com vários meses de antecedência. Esteja atento aos seus pertences no meio da multidão à noite.",
        where: "Ilha de Saint-Louis",
        dateNote: "Cinco dias em maio ou início de junho (durante muito tempo por volta do Pentecostes); datas anunciadas com vários meses de antecedência pelos organizadores (saintlouisjazz.org).",
      },
      ar: {
        name: "مهرجان سان لوي الدولي للجاز",
        summary: "من أكبر مهرجانات الجاز في أفريقيا، منذ 1993، في جزيرة سان لوي المدرجة في التراث العالمي.",
        description:
          "وُلد مهرجان سان لوي للجاز عام 1993 في مدينة ترسّخ فيها الجاز منذ أربعينيات القرن العشرين، ويجمع كل ربيع موسيقيين من أفريقيا وأوروبا وأمريكا. وعلى مدى نحو خمسة أيام، تُحيي الحفلات على المنصة الكبرى في ساحة بايا وجلسات الارتجال في المقاهي والفنادق والعروض الموازية وفعاليات الشارع الجزيرةَ بأكملها. أُقيمت الدورة الرابعة والثلاثون من 13 إلى 17 مايو 2026، ومن المعلن أن تُقام الخامسة والثلاثون من 4 إلى 8 مايو 2027.",
        tips: "احجز إقامتك في سان لوي قبل عدة أشهر. وانتبه إلى أغراضك وسط الحشود في المساء.",
        where: "جزيرة سان لوي",
        dateNote: "خمسة أيام في مايو أو أوائل يونيو (وكان طويلًا حول عيد العنصرة)؛ ويعلن المنظمون المواعيد قبل عدة أشهر (saintlouisjazz.org).",
      },
    },
  },
  {
    slug: "biennale-dakart",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 11, to: 12 },
    destination: "dakar",
    cover: "/images/voyage/fete-biennale-dakart",
    name: "Dak'Art, Biennale de l'art africain contemporain",
    summary: "La plus ancienne biennale d'art contemporain d'Afrique, tous les deux ans dans tout Dakar.",
    description:
      "Créée par l'État sénégalais et consacrée depuis 1996 à la création africaine contemporaine, Dak'Art est le grand rendez-vous des artistes du continent et de la diaspora. Pendant environ un mois, l'exposition internationale, les expositions invitées et des centaines d'expositions « off » investissent musées, galeries, ateliers, l'ancien palais de justice, le musée Théodore-Monod et les quartiers de Dakar, avec rencontres, performances et soirées. La 16e édition est programmée du 19 novembre au 19 décembre 2026.",
    tips: "Procurez-vous le programme du « off », souvent le plus vivant : de nombreuses expositions sont gratuites. Réservez votre hébergement tôt pour la semaine d'ouverture.",
    where: "Dakar (musées, galeries et lieux du « off »)",
    dateNote: "Les années paires, pendant environ un mois ; les dernières éditions se sont tenues en novembre-décembre (2024, 2026), d'autres auparavant en mai-juin. Dates annoncées par le secrétariat de la Biennale (biennaledakar.org).",
    sources: ["https://www.au-senegal.com/biennale-de-l-art-africain-contemporain-dak-art-2026,18120.html", "https://www.au-senegal.com/spip.php?rubrique144", "https://fr.wikipedia.org/wiki/Biennale_de_Dakar", "https://en.wikipedia.org/wiki/Dakar_Biennale"],
    en: {
      name: "Dak'Art, Biennale of Contemporary African Art",
      summary: "Africa's oldest contemporary art biennale, every two years across Dakar.",
      description:
        "Created by the Senegalese state and devoted since 1996 to contemporary African art, Dak'Art is the major meeting point for artists from the continent and the diaspora. For about a month, the international exhibition, guest exhibitions and hundreds of fringe (“off”) shows take over museums, galleries, studios, the former law courts, the Théodore Monod museum and Dakar's neighbourhoods, with talks, performances and parties. The 16th edition is scheduled from 19 November to 19 December 2026.",
      tips: "Get hold of the “off” programme, often the liveliest part: many exhibitions are free. Book accommodation early for the opening week.",
      where: "Dakar (museums, galleries and fringe venues)",
      dateNote: "Even years, for about a month; recent editions were held in November–December (2024, 2026), earlier ones in May–June. Dates announced by the Biennale secretariat (biennaledakar.org).",
    },
    i18n: {
      es: {
        name: "Dak'Art, Bienal de Arte Africano Contemporáneo",
        summary: "La bienal de arte contemporáneo más antigua de África, cada dos años en todo Dakar.",
        description:
          "Creada por el Estado senegalés y dedicada desde 1996 a la creación africana contemporánea, Dak'Art es la gran cita de los artistas del continente y de la diáspora. Durante un mes aproximadamente, la exposición internacional, las exposiciones invitadas y cientos de exposiciones «off» ocupan museos, galerías, talleres, el antiguo palacio de justicia, el museo Théodore Monod y los barrios de Dakar, con encuentros, performances y fiestas. La 16.ª edición está programada del 19 de noviembre al 19 de diciembre de 2026.",
        tips: "Consiga el programa del «off», a menudo el más vivo: muchas exposiciones son gratuitas. Reserve el alojamiento con antelación para la semana de inauguración.",
        where: "Dakar (museos, galerías y espacios del «off»)",
        dateNote: "Los años pares, durante un mes aproximadamente; las últimas ediciones se celebraron en noviembre-diciembre (2024, 2026) y otras anteriores en mayo-junio. Fechas anunciadas por la secretaría de la Bienal (biennaledakar.org).",
      },
      pt: {
        name: "Dak'Art, Bienal de Arte Africana Contemporânea",
        summary: "A mais antiga bienal de arte contemporânea de África, de dois em dois anos por toda Dacar.",
        description:
          "Criada pelo Estado senegalês e dedicada desde 1996 à criação africana contemporânea, a Dak'Art é o grande encontro dos artistas do continente e da diáspora. Durante cerca de um mês, a exposição internacional, as exposições convidadas e centenas de exposições «off» ocupam museus, galerias, ateliês, o antigo palácio da justiça, o museu Théodore Monod e os bairros de Dacar, com encontros, performances e festas. A 16.ª edição está programada de 19 de novembro a 19 de dezembro de 2026.",
        tips: "Arranje o programa do «off», muitas vezes o mais vivo: muitas exposições são gratuitas. Reserve alojamento cedo para a semana de abertura.",
        where: "Dacar (museus, galerias e espaços do «off»)",
        dateNote: "Nos anos pares, durante cerca de um mês; as últimas edições realizaram-se em novembro-dezembro (2024, 2026) e outras anteriores em maio-junho. Datas anunciadas pelo secretariado da Bienal (biennaledakar.org).",
      },
      ar: {
        name: "داك آرت، بينالي الفن الأفريقي المعاصر",
        summary: "أقدم بينالي للفن المعاصر في أفريقيا، كل عامين في أرجاء داكار.",
        description:
          "أنشأته الدولة السنغالية وكرّسته منذ 1996 للإبداع الأفريقي المعاصر، ويُعدّ داك آرت الموعد الكبير لفناني القارة والمهجر. وعلى مدى شهر تقريبًا، يحتل المعرض الدولي والمعارض المدعوّة ومئات المعارض الموازية («أوف») المتاحف وصالات العرض والمراسم وقصر العدل القديم ومتحف تيودور مونو وأحياء داكار، مع لقاءات وعروض أداء وسهرات. ومن المقرر أن تُقام الدورة السادسة عشرة من 19 نوفمبر إلى 19 ديسمبر 2026.",
        tips: "احصل على برنامج المعارض الموازية، فهو غالبًا الأكثر حيوية، وكثير من المعارض مجاني. واحجز إقامتك مبكرًا لأسبوع الافتتاح.",
        where: "داكار (متاحف وصالات عرض وأماكن البرنامج الموازي)",
        dateNote: "في السنوات الزوجية، لنحو شهر؛ وأُقيمت الدورات الأخيرة في نوفمبر وديسمبر (2024 و2026)، وأخرى سابقة في مايو ويونيو. وتعلن أمانة البينالي المواعيد (biennaledakar.org).",
      },
    },
  },
  {
    slug: "carnaval-kafountine",
    kind: "FESTIVAL",
    publicHoliday: false,
    rule: { type: "period", from: 1, to: 2 },
    destination: "basse-casamance",
    caution: true,
    name: "Carnaval du Sud de Kafountine",
    summary: "Masques, percussions et ballets traditionnels de Casamance dans un village de pêcheurs.",
    description:
      "Arrivé à sa 29e édition, ce carnaval de Kafountine, grand village de pêcheurs de Basse-Casamance, met à l'honneur les traditions de la région : défilés de masques, troupes de danse et de percussion, chants, ballets, théâtre et concerts, avec la participation des habitants. L'édition 2027 est annoncée du 22 au 30 janvier. Kafountine se situe au nord de la Casamance, non loin de la frontière gambienne.",
    tips: "Avant de partir, vérifiez les conseils aux voyageurs : les zones frontalières de Casamance hors grands axes sont déconseillées sauf raison impérative. Voyagez de jour, par la route principale via Diouloulou, et ne vous écartez pas des axes goudronnés.",
    where: "Kafountine (département de Bignona, Basse-Casamance)",
    dateNote: "Une semaine environ en janvier ou février ; dates annoncées par les organisateurs quelques mois à l'avance.",
    sources: ["https://www.au-senegal.com/carnaval-du-sud-de-kafountine-29e-edition,18548.html", "https://www.diplomatie.gouv.fr/fr/information-par-pays/senegal/conseils-aux-voyageurs-securite"],
    en: {
      name: "Southern Carnival of Kafountine",
      summary: "Masks, drumming and traditional Casamance ballets in a fishing village.",
      description:
        "Now in its 29th edition, this carnival in Kafountine, a large fishing village in Lower Casamance, celebrates the region's traditions: mask parades, dance and percussion troupes, songs, ballets, theatre and concerts, with local residents taking part. The 2027 edition is announced for 22 to 30 January. Kafountine lies in the north of Casamance, not far from the Gambian border.",
      tips: "Check travel advice before leaving: border areas of Casamance away from main roads are advised against except for essential travel. Travel by day, on the main road via Diouloulou, and do not leave paved roads.",
      where: "Kafountine (Bignona department, Lower Casamance)",
      dateNote: "About a week in January or February; dates announced by the organisers a few months ahead.",
    },
    i18n: {
      es: {
        name: "Carnaval del Sur de Kafountine",
        summary: "Máscaras, percusiones y ballets tradicionales de Casamance en un pueblo de pescadores.",
        description:
          "Llegado a su 29.ª edición, este carnaval de Kafountine, gran pueblo de pescadores de la Baja Casamance, honra las tradiciones de la región: desfiles de máscaras, grupos de danza y percusión, cantos, ballets, teatro y conciertos, con la participación de los habitantes. La edición de 2027 está anunciada del 22 al 30 de enero. Kafountine se encuentra al norte de Casamance, no lejos de la frontera gambiana.",
        tips: "Antes de salir, consulte las recomendaciones de viaje: las zonas fronterizas de Casamance fuera de los grandes ejes están desaconsejadas salvo motivo imperativo. Viaje de día, por la carretera principal vía Diouloulou, y no se aleje de las vías asfaltadas.",
        where: "Kafountine (departamento de Bignona, Baja Casamance)",
        dateNote: "Una semana aproximadamente en enero o febrero; fechas anunciadas por los organizadores con unos meses de antelación.",
      },
      pt: {
        name: "Carnaval do Sul de Kafountine",
        summary: "Máscaras, percussões e bailados tradicionais de Casamança numa aldeia de pescadores.",
        description:
          "Chegado à sua 29.ª edição, este carnaval de Kafountine, grande aldeia de pescadores da Baixa Casamança, homenageia as tradições da região: desfiles de máscaras, grupos de dança e percussão, cânticos, bailados, teatro e concertos, com a participação dos habitantes. A edição de 2027 está anunciada de 22 a 30 de janeiro. Kafountine fica no norte de Casamança, não longe da fronteira gambiana.",
        tips: "Antes de partir, consulte os conselhos aos viajantes: as zonas fronteiriças de Casamança fora dos grandes eixos são desaconselhadas salvo motivo imperativo. Viaje de dia, pela estrada principal via Diouloulou, e não saia das vias asfaltadas.",
        where: "Kafountine (departamento de Bignona, Baixa Casamança)",
        dateNote: "Cerca de uma semana em janeiro ou fevereiro; datas anunciadas pelos organizadores com alguns meses de antecedência.",
      },
      ar: {
        name: "كرنفال الجنوب في كافونتين",
        summary: "أقنعة وإيقاعات وعروض راقصة تقليدية من كازامانس في قرية صيادين.",
        description:
          "بلغ هذا الكرنفال في كافونتين، قرية الصيادين الكبيرة في كازامانس السفلى، دورته التاسعة والعشرين، وهو يحتفي بتقاليد المنطقة: مواكب الأقنعة وفرق الرقص والإيقاع والأغاني والعروض الراقصة والمسرح والحفلات، بمشاركة السكان. ومن المعلن أن تُقام دورة 2027 من 22 إلى 30 يناير. وتقع كافونتين في شمال كازامانس، غير بعيدة عن الحدود الغامبية.",
        tips: "قبل السفر راجع توصيات السفر: يُنصح بعدم التوجه إلى المناطق الحدودية في كازامانس خارج المحاور الرئيسية إلا لسبب قاهر. سافر نهارًا عبر الطريق الرئيسي مرورًا بديولولو، ولا تبتعد عن الطرق المعبّدة.",
        where: "كافونتين (مقاطعة بينيونا، كازامانس السفلى)",
        dateNote: "نحو أسبوع في يناير أو فبراير؛ ويعلن المنظمون المواعيد قبل بضعة أشهر.",
      },
    },
  },
  {
    slug: "fanal-saint-louis",
    kind: "SEASONAL",
    publicHoliday: false,
    rule: { type: "period", from: 12, to: 12 },
    destination: "saint-louis",
    name: "Fanal de Saint-Louis",
    summary: "Défilé nocturne de grandes lanternes illuminées, tradition saint-louisienne des fêtes de fin d'année.",
    description:
      "Le fanal trouverait son origine au XVIIIe siècle, quand les signares, riches femmes métisses de Saint-Louis, se rendaient à la messe de minuit de Noël escortées de serviteurs portant des lanternes. La coutume est devenue une fête populaire : les quartiers rivalisent de créativité pour construire d'immenses lanternes de bois et de papier reproduisant bateaux, mosquée, cathédrale ou pont Faidherbe, promenées de nuit dans les rues de l'île au son des tambours. Organisé selon les années, le fanal est aujourd'hui l'un des symboles de l'identité saint-louisienne.",
    tips: "Renseignez-vous sur place ou auprès de l'office du tourisme : le défilé n'a pas lieu chaque année à date fixe.",
    where: "Île de Saint-Louis",
    dateNote: "Pendant les fêtes de fin d'année, autour de Noël, lorsque le défilé est organisé ; dates communiquées localement.",
    sources: ["https://fr.wikipedia.org/wiki/Fanal_de_Saint-Louis_du_S%C3%A9n%C3%A9gal"],
    en: {
      name: "Saint-Louis Fanal",
      summary: "A night parade of huge illuminated lanterns, a Saint-Louis year-end tradition.",
      description:
        "The fanal is said to date back to the 18th century, when the signares, wealthy women of mixed descent in Saint-Louis, went to Christmas midnight mass escorted by servants carrying lanterns. The custom became a popular festival: neighbourhoods compete in creativity to build huge wood-and-paper lanterns depicting boats, the mosque, the cathedral or the Faidherbe bridge, paraded at night through the island's streets to the sound of drums. Held in some years, the fanal is now a symbol of Saint-Louis identity.",
      tips: "Ask locally or at the tourist office: the parade does not take place every year on a fixed date.",
      where: "Saint-Louis island",
      dateNote: "During the year-end festivities, around Christmas, when the parade is organised; dates announced locally.",
    },
    i18n: {
      es: {
        name: "Fanal de Saint-Louis",
        summary: "Desfile nocturno de grandes faroles iluminados, tradición de Saint-Louis en las fiestas de fin de año.",
        description:
          "El fanal tendría su origen en el siglo XVIII, cuando las signares, ricas mujeres mestizas de Saint-Louis, acudían a la misa del gallo escoltadas por sirvientes que llevaban faroles. La costumbre se convirtió en fiesta popular: los barrios compiten en creatividad para construir enormes faroles de madera y papel que reproducen barcos, la mezquita, la catedral o el puente Faidherbe, paseados de noche por las calles de la isla al son de los tambores. Organizado según los años, el fanal es hoy uno de los símbolos de la identidad de Saint-Louis.",
        tips: "Infórmese allí o en la oficina de turismo: el desfile no se celebra cada año en fecha fija.",
        where: "Isla de Saint-Louis",
        dateNote: "Durante las fiestas de fin de año, en torno a Navidad, cuando se organiza el desfile; fechas comunicadas localmente.",
      },
      pt: {
        name: "Fanal de Saint-Louis",
        summary: "Desfile noturno de grandes lanternas iluminadas, tradição de Saint-Louis nas festas de fim de ano.",
        description:
          "O fanal teria origem no século XVIII, quando as signares, ricas mulheres mestiças de Saint-Louis, iam à missa do galo escoltadas por criados que levavam lanternas. O costume tornou-se uma festa popular: os bairros competem em criatividade para construir enormes lanternas de madeira e papel que reproduzem barcos, a mesquita, a catedral ou a ponte Faidherbe, passeadas à noite pelas ruas da ilha ao som dos tambores. Organizado consoante os anos, o fanal é hoje um dos símbolos da identidade de Saint-Louis.",
        tips: "Informe-se no local ou no posto de turismo: o desfile não se realiza todos os anos em data fixa.",
        where: "Ilha de Saint-Louis",
        dateNote: "Durante as festas de fim de ano, por volta do Natal, quando o desfile é organizado; datas comunicadas localmente.",
      },
      ar: {
        name: "فانال سان لوي",
        summary: "موكب ليلي لفوانيس كبيرة مضيئة، تقليد من تقاليد سان لوي في احتفالات آخر السنة.",
        description:
          "يُقال إن الفانال يعود إلى القرن الثامن عشر، حين كانت «السينيار»، وهن نساء ثريات من ذوات الأصول المختلطة في سان لوي، يذهبن إلى قدّاس منتصف ليلة الميلاد برفقة خدم يحملون الفوانيس. ثم صارت العادة عيدًا شعبيًا تتنافس فيه الأحياء إبداعًا في صنع فوانيس ضخمة من الخشب والورق تجسّد السفن والمسجد والكاتدرائية وجسر فيدرب، وتُطاف بها ليلًا في شوارع الجزيرة على إيقاع الطبول. ويُنظَّم الفانال في بعض السنوات، وهو اليوم من رموز هوية سان لوي.",
        tips: "استعلم في المكان أو لدى مكتب السياحة: فالموكب لا يُقام كل عام في موعد ثابت.",
        where: "جزيرة سان لوي",
        dateNote: "خلال احتفالات آخر السنة، حول عيد الميلاد، حين يُنظَّم الموكب؛ وتُعلن المواعيد محليًا.",
      },
    },
  },
  {
    slug: "navetanes-senegal",
    kind: "SEASONAL",
    publicHoliday: false,
    rule: { type: "period", from: 7, to: 10 },
    name: "Saison des navétanes",
    summary: "Les championnats de football de quartier de la saison des pluies, véritable fièvre populaire.",
    description:
      "Apparus dans les années 1950, les navétanes (de « nawet », la saison des pluies en wolof) sont des championnats de football disputés par les associations sportives et culturelles des quartiers et des villages, en marge des fédérations, pendant les vacances scolaires. Les matchs, très suivis, s'accompagnent de tambours, de chants, de danses et de soirées culturelles ; certaines grandes vedettes du football sénégalais y ont fait leurs débuts. Une plongée dans la vie de quartier, surtout en fin d'après-midi.",
    tips: "Les rencontres décisives peuvent être tendues : suivez-les accompagné de supporters locaux et quittez le stade avant la foule si l'ambiance se crispe.",
    where: "Dans tout le pays (stades municipaux et terrains de quartier)",
    dateNote: "Pendant la saison des pluies et les vacances scolaires, environ de juillet à octobre ; calendrier fixé chaque année par les organismes de navétanes.",
    sources: ["https://fr.wikipedia.org/wiki/Nav%C3%A9tanes_(sport)"],
    en: {
      name: "Navétanes season",
      summary: "Rainy-season neighbourhood football championships, a true popular fever.",
      description:
        "Dating from the 1950s, the navétanes (from “nawet”, the rainy season in Wolof) are football championships played by neighbourhood and village sports and cultural associations, outside the official federations, during the school holidays. The hugely popular matches come with drums, songs, dancing and cultural evenings; some big names in Senegalese football started out here. A dive into neighbourhood life, especially in the late afternoon.",
      tips: "Decisive matches can get tense: watch them with local supporters and leave the ground before the crowd if the atmosphere turns sour.",
      where: "Nationwide (municipal stadiums and neighbourhood pitches)",
      dateNote: "During the rainy season and school holidays, roughly July to October; the calendar is set each year by the navétanes bodies.",
    },
    i18n: {
      es: {
        name: "Temporada de los navétanes",
        summary: "Los campeonatos de fútbol de barrio de la estación de lluvias, una auténtica fiebre popular.",
        description:
          "Surgidos en los años 1950, los navétanes (de «nawet», la estación de lluvias en wolof) son campeonatos de fútbol disputados por las asociaciones deportivas y culturales de barrios y pueblos, al margen de las federaciones, durante las vacaciones escolares. Los partidos, muy seguidos, van acompañados de tambores, cantos, bailes y veladas culturales; algunas grandes estrellas del fútbol senegalés empezaron aquí. Una inmersión en la vida de barrio, sobre todo al final de la tarde.",
        tips: "Los partidos decisivos pueden ser tensos: sígalos acompañado de aficionados locales y salga del estadio antes que la multitud si el ambiente se crispa.",
        where: "En todo el país (estadios municipales y campos de barrio)",
        dateNote: "Durante la estación de lluvias y las vacaciones escolares, aproximadamente de julio a octubre; calendario fijado cada año por los organismos de navétanes.",
      },
      pt: {
        name: "Época dos navétanes",
        summary: "Os campeonatos de futebol de bairro da estação das chuvas, uma verdadeira febre popular.",
        description:
          "Surgidos nos anos 1950, os navétanes (de «nawet», a estação das chuvas em wolof) são campeonatos de futebol disputados pelas associações desportivas e culturais dos bairros e aldeias, à margem das federações, durante as férias escolares. Os jogos, muito seguidos, são acompanhados de tambores, cânticos, danças e serões culturais; algumas grandes estrelas do futebol senegalês começaram aqui. Um mergulho na vida de bairro, sobretudo ao fim da tarde.",
        tips: "Os jogos decisivos podem ser tensos: assista acompanhado de adeptos locais e saia do estádio antes da multidão se o ambiente azedar.",
        where: "Em todo o país (estádios municipais e campos de bairro)",
        dateNote: "Durante a estação das chuvas e as férias escolares, aproximadamente de julho a outubro; calendário fixado todos os anos pelos organismos dos navétanes.",
      },
      ar: {
        name: "موسم النافيتان",
        summary: "بطولات كرة القدم بين الأحياء في موسم الأمطار، حمّى شعبية حقيقية.",
        description:
          "ظهرت «النافيتان» (من «ناوت»، أي موسم الأمطار بالولوفية) في خمسينيات القرن العشرين، وهي بطولات لكرة القدم تتنافس فيها الجمعيات الرياضية والثقافية للأحياء والقرى خارج إطار الاتحادات الرسمية، خلال العطلة المدرسية. وتصاحب المباريات، التي تحظى بمتابعة كبيرة، الطبولُ والأغاني والرقصات والسهرات الثقافية، وقد بدأ فيها بعض كبار نجوم الكرة السنغالية مسيرتهم. فرصة للانغماس في حياة الأحياء، لا سيما في أواخر العصر.",
        tips: "قد تكون المباريات الحاسمة متوترة: تابعها برفقة مشجعين محليين وغادر الملعب قبل الحشود إن توترت الأجواء.",
        where: "في جميع أنحاء البلاد (الملاعب البلدية وملاعب الأحياء)",
        dateNote: "خلال موسم الأمطار والعطلة المدرسية، من يوليو إلى أكتوبر تقريبًا؛ وتحدد هيئات النافيتان الجدول كل عام.",
      },
    },
  },
  {
    slug: "saison-de-lutte-senegal",
    kind: "SEASONAL",
    publicHoliday: false,
    rule: { type: "period", from: 11, to: 7 },
    place: "arene-nationale-de-lutte-pikine",
    cover: "/images/voyage/fete-saison-de-lutte-senegal",
    name: "Saison de la lutte sénégalaise",
    summary: "Les grands combats de « laamb », le sport national, entre rituels, griots et foules en délire.",
    description:
      "La lutte avec frappe (laamb en wolof), héritée des traditions sérères, est le sport national. Les grandes affiches entre champions, préparées pendant des mois, se disputent surtout à l'Arène nationale de Pikine, devant des dizaines de milliers de spectateurs, avec bàkk (chants de bravoure), tambours, danses et rituels mystiques. En dehors des grands combats professionnels, des tournois villageois (mbapatt) se tiennent traditionnellement après les récoltes, notamment dans le Sine-Saloum et en Casamance, et des combats s'improvisent sur les plages.",
    tips: "Les grandes affiches sont annoncées des semaines à l'avance : achetez vos billets tôt et allez-y avec un habitué. Foule très dense et tendue en fin de combat : surveillez vos affaires.",
    where: "Dakar (Arène nationale de Pikine) et régions",
    dateNote: "Grands combats principalement en saison sèche, d'environ novembre à juillet ; tournois villageois après les récoltes. Calendrier publié par le Comité national de gestion de la lutte et les promoteurs.",
    sources: ["https://fr.wikipedia.org/wiki/Lutte_s%C3%A9n%C3%A9galaise", "https://en.wikipedia.org/wiki/Senegalese_wrestling"],
    en: {
      name: "Senegalese wrestling season",
      summary: "The big bouts of “laamb”, the national sport, amid rituals, griots and ecstatic crowds.",
      description:
        "Wrestling with punches (laamb in Wolof), inherited from Serer traditions, is the national sport. The big fights between champions, prepared for months, are mostly held at the National Arena in Pikine, in front of tens of thousands of spectators, with bàkk (boasting songs), drums, dancing and mystical rituals. Beyond the big professional bouts, village tournaments (mbapatt) are traditionally held after the harvest, notably in the Sine-Saloum and Casamance, and impromptu bouts take place on the beaches.",
      tips: "Big fights are announced weeks in advance: buy tickets early and go with a regular. The crowd is very dense and tense at the end of a bout: watch your belongings.",
      where: "Dakar (National Arena, Pikine) and the regions",
      dateNote: "Big bouts mainly in the dry season, roughly November to July; village tournaments after the harvest. Calendar published by the national wrestling management committee and promoters.",
    },
    i18n: {
      es: {
        name: "Temporada de lucha senegalesa",
        summary: "Los grandes combates de «laamb», el deporte nacional, entre rituales, griots y multitudes enfervorizadas.",
        description:
          "La lucha con golpes (laamb en wolof), heredera de las tradiciones serer, es el deporte nacional. Los grandes combates entre campeones, preparados durante meses, se disputan sobre todo en la Arena Nacional de Pikine, ante decenas de miles de espectadores, con bàkk (cantos de bravura), tambores, danzas y rituales místicos. Además de los grandes combates profesionales, se celebran tradicionalmente torneos de pueblo (mbapatt) después de las cosechas, sobre todo en el Sine-Saloum y en Casamance, y se improvisan combates en las playas.",
        tips: "Los grandes combates se anuncian con semanas de antelación: compre las entradas pronto y vaya con un habitual. Multitud muy densa y tensa al final del combate: vigile sus pertenencias.",
        where: "Dakar (Arena Nacional de Pikine) y regiones",
        dateNote: "Grandes combates principalmente en la estación seca, aproximadamente de noviembre a julio; torneos de pueblo después de las cosechas. Calendario publicado por el comité nacional de gestión de la lucha y los promotores.",
      },
      pt: {
        name: "Época da luta senegalesa",
        summary: "Os grandes combates de «laamb», o desporto nacional, entre rituais, griôs e multidões em delírio.",
        description:
          "A luta com golpes (laamb em wolof), herdeira das tradições serer, é o desporto nacional. Os grandes combates entre campeões, preparados durante meses, disputam-se sobretudo na Arena Nacional de Pikine, perante dezenas de milhares de espectadores, com bàkk (cânticos de bravura), tambores, danças e rituais místicos. Para além dos grandes combates profissionais, realizam-se tradicionalmente torneios de aldeia (mbapatt) depois das colheitas, sobretudo no Sine-Saloum e em Casamança, e improvisam-se combates nas praias.",
        tips: "Os grandes combates são anunciados com semanas de antecedência: compre os bilhetes cedo e vá com um habitué. Multidão muito densa e tensa no fim do combate: vigie os seus pertences.",
        where: "Dacar (Arena Nacional de Pikine) e regiões",
        dateNote: "Grandes combates sobretudo na estação seca, aproximadamente de novembro a julho; torneios de aldeia depois das colheitas. Calendário publicado pelo comité nacional de gestão da luta e pelos promotores.",
      },
      ar: {
        name: "موسم المصارعة السنغالية",
        summary: "نزالات «لامب» الكبرى، الرياضة الوطنية، بين الطقوس والغريو والحشود المتحمسة.",
        description:
          "المصارعة بالضرب («لامب» بالولوفية)، الموروثة من تقاليد السيرير، هي الرياضة الوطنية. وتُقام النزالات الكبرى بين الأبطال، التي يُستعدّ لها شهورًا، خاصة في الحلبة الوطنية في بيكين أمام عشرات الآلاف من المتفرجين، مع «الباك» (أناشيد التفاخر) والطبول والرقص والطقوس الروحية. وإلى جانب النزالات الاحترافية الكبرى، تُقام تقليديًا بطولات قروية («مباپات») بعد الحصاد، لا سيما في سين سالوم وكازامانس، كما تُرتجل نزالات على الشواطئ.",
        tips: "تُعلن النزالات الكبرى قبل أسابيع: اشترِ التذاكر مبكرًا واذهب برفقة شخص معتاد عليها. الحشود كثيفة جدًا ومتوترة في نهاية النزال: انتبه إلى أغراضك.",
        where: "داكار (الحلبة الوطنية في بيكين) والأقاليم",
        dateNote: "تُقام النزالات الكبرى أساسًا في موسم الجفاف، من نوفمبر إلى يوليو تقريبًا؛ والبطولات القروية بعد الحصاد. وتنشر اللجنة الوطنية لإدارة المصارعة والمنظمون الجدول.",
      },
    },
  },
  {
    slug: "fetes-de-fin-d-annee-dakar",
    kind: "SEASONAL",
    publicHoliday: false,
    rule: { type: "period", from: 12, to: 1 },
    destination: "dakar",
    name: "Fêtes de fin d'année à Dakar",
    summary: "Concerts, soirées et retour de la diaspora : la haute saison festive de la capitale.",
    description:
      "De mi-décembre au début de janvier, Dakar vit sa saison la plus festive : la diaspora rentre au pays, les grandes vedettes du mbalax et des musiques urbaines multiplient les concerts, les clubs et bars des Almadies, de Ngor, du Point E et du Plateau affichent complet, et la Saint-Sylvestre se fête sur les plages et les rooftops. Cette période coïncide souvent avec la Biennale les années paires et avec la haute saison touristique, au climat sec et agréable.",
    tips: "Réservez vols, hébergements et tables très tôt ; les prix montent fortement. Déplacez-vous en taxi la nuit et évitez de marcher seul sur la Corniche après la tombée du jour (agressions signalées par France Diplomatie).",
    where: "Dakar (Almadies, Ngor, Point E, Plateau) et stations de la Petite Côte",
    dateNote: "De mi-décembre à début janvier ; programmes des concerts annoncés quelques semaines à l'avance.",
    sources: ["https://www.au-senegal.com/spip.php?rubrique144", "https://www.diplomatie.gouv.fr/fr/information-par-pays/senegal/conseils-aux-voyageurs-securite"],
    en: {
      name: "Year-end festivities in Dakar",
      summary: "Concerts, parties and the diaspora coming home: the capital's festive high season.",
      description:
        "From mid-December to early January Dakar enjoys its most festive season: the diaspora returns home, the big stars of mbalax and urban music play concert after concert, the clubs and bars of Les Almadies, Ngor, Point E and the Plateau are full, and New Year's Eve is celebrated on beaches and rooftops. This period often coincides with the Biennale in even years and with the tourist high season, with dry and pleasant weather.",
      tips: "Book flights, accommodation and tables very early; prices rise sharply. Take taxis at night and avoid walking alone on the Corniche after dark (assaults reported by France Diplomatie).",
      where: "Dakar (Les Almadies, Ngor, Point E, Plateau) and the Petite Côte resorts",
      dateNote: "From mid-December to early January; concert programmes announced a few weeks ahead.",
    },
    i18n: {
      es: {
        name: "Fiestas de fin de año en Dakar",
        summary: "Conciertos, fiestas y regreso de la diáspora: la temporada alta festiva de la capital.",
        description:
          "De mediados de diciembre a principios de enero, Dakar vive su temporada más festiva: la diáspora vuelve al país, las grandes estrellas del mbalax y de las músicas urbanas multiplican los conciertos, los clubes y bares de Almadies, Ngor, el Point E y el Plateau se llenan, y la Nochevieja se celebra en playas y azoteas. Este periodo coincide a menudo con la Bienal los años pares y con la temporada alta turística, de clima seco y agradable.",
        tips: "Reserve vuelos, alojamiento y mesas muy pronto; los precios suben mucho. Desplácese en taxi por la noche y evite caminar solo por la Corniche tras la puesta del sol (agresiones señaladas por France Diplomatie).",
        where: "Dakar (Almadies, Ngor, Point E, Plateau) y estaciones de la Petite Côte",
        dateNote: "De mediados de diciembre a principios de enero; programas de conciertos anunciados con unas semanas de antelación.",
      },
      pt: {
        name: "Festas de fim de ano em Dacar",
        summary: "Concertos, festas e regresso da diáspora: a época alta festiva da capital.",
        description:
          "De meados de dezembro ao início de janeiro, Dacar vive a sua época mais festiva: a diáspora regressa ao país, as grandes estrelas do mbalax e das músicas urbanas multiplicam os concertos, os clubes e bares das Almadies, de Ngor, do Point E e do Plateau enchem-se, e a passagem de ano festeja-se nas praias e nos terraços. Este período coincide muitas vezes com a Bienal nos anos pares e com a época alta turística, de clima seco e agradável.",
        tips: "Reserve voos, alojamento e mesas muito cedo; os preços sobem bastante. Desloque-se de táxi à noite e evite caminhar sozinho na Corniche depois do anoitecer (agressões assinaladas pela France Diplomatie).",
        where: "Dacar (Almadies, Ngor, Point E, Plateau) e estâncias da Petite Côte",
        dateNote: "De meados de dezembro ao início de janeiro; programas de concertos anunciados com algumas semanas de antecedência.",
      },
      ar: {
        name: "احتفالات آخر السنة في داكار",
        summary: "حفلات موسيقية وسهرات وعودة المغتربين: موسم الذروة الاحتفالي في العاصمة.",
        description:
          "من منتصف ديسمبر إلى أوائل يناير تعيش داكار أكثر مواسمها احتفالًا: يعود المغتربون إلى البلاد، ويُكثر كبار نجوم «المبالاخ» والموسيقى الحضرية من الحفلات، وتمتلئ النوادي والحانات في ألماديز ونغور وبوان إي والبلاتو، ويُحتفل برأس السنة على الشواطئ وأسطح المباني. وكثيرًا ما تتزامن هذه الفترة مع البينالي في السنوات الزوجية ومع ذروة الموسم السياحي، بطقس جاف ولطيف.",
        tips: "احجز الرحلات والإقامة والطاولات مبكرًا جدًا، فالأسعار ترتفع كثيرًا. تنقّل بسيارة أجرة ليلًا وتجنّب السير وحيدًا على الكورنيش بعد حلول الظلام (اعتداءات تشير إليها وزارة الخارجية الفرنسية).",
        where: "داكار (ألماديز ونغور وبوان إي والبلاتو) ومنتجعات الساحل الصغير",
        dateNote: "من منتصف ديسمبر إلى أوائل يناير؛ وتُعلن برامج الحفلات قبل بضعة أسابيع.",
      },
    },
  },
];
