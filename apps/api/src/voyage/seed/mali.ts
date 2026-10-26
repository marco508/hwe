/**
 * Contenu de départ du guide Mali (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 *
 * Situation sécuritaire : à la rédaction (octobre 2026), France Diplomatie
 * déconseille formellement tout déplacement au Mali, quel que soit le motif,
 * et le FCDO britannique déconseille tout voyage dans l'ensemble du pays.
 * Ce guide est donc un guide de patrimoine « pour préparer un voyage quand
 * les conditions le permettront » : aucun circuit (MALI_CIRCUITS = []) et un
 * rappel dans les `tips` de chaque lieu. À réévaluer avant toute mise à jour.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

const AVERT =
  "Voyage formellement déconseillé à ce jour (France Diplomatie, FCDO) : lieu présenté pour préparer un voyage futur, quand les conditions le permettront.";
const AVERT_EN =
  "Travel is currently advised against (France Diplomatie, UK FCDO): this place is presented to help plan a future trip, once conditions allow.";

export const MALI_GUIDE: SeedGuide = {
  country: "ML",
  intro:
    "À ce jour, tout voyage au Mali est formellement déconseillé par les autorités françaises et britanniques : ce guide présente son patrimoine pour préparer un séjour quand les conditions le permettront. Héritier des empires du Ghana, du Mali et songhaï, le pays du fleuve Niger compte parmi les plus riches d'Afrique de l'Ouest : architecture de terre de Djenné et de Tombouctou, falaise de Bandiagara et pays dogon, tombeau des Askia à Gao, et une scène musicale qui a fait le tour du monde depuis Bamako.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs non africains. Le Mali a quitté la CEDEAO en 2025 et forme avec le Burkina Faso et le Niger l'Alliance des États du Sahel (AES) : les règles d'entrée ont pu évoluer et peuvent encore changer. Vérifiez toujours les conditions à jour auprès de l'ambassade du Mali et des sources officielles de votre pays avant tout projet : passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays, surtout pendant et après la saison des pluies : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques. Le pays se situe dans la « ceinture de la méningite » : renseignez-vous sur la vaccination. Buvez de l'eau en bouteille et prévoyez une bonne protection contre la chaleur. Hors de Bamako, l'offre de soins est très limitée.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les espèces sont indispensables ; les cartes bancaires ne sont acceptées que dans quelques grands hôtels et commerces de Bamako, et les distributeurs sont rares ailleurs. Le paiement mobile (mobile money) est très répandu.",
    },
    {
      title: "Quand partir",
      body: "La meilleure période va de novembre à février : saison sèche et températures plus supportables, avec l'harmattan (vent sec et poussiéreux). De mars à mai, la chaleur devient écrasante, souvent au-delà de 40 °C. La saison des pluies s'étend en gros de juin à septembre, plus longue et plus arrosée au sud ; c'est aussi la période de la crue du Niger, qui inonde le delta intérieur jusqu'au début de la saison sèche.",
    },
    {
      title: "Langues et usages",
      body: "La Constitution de 2023 a fait des langues nationales (bambara, peul, soninké, songhaï, tamasheq, langues dogon, entre autres) les langues officielles du pays ; le français y est désormais langue de travail et reste très utilisé dans l'administration et en ville. Le bambara (bamanankan) sert de langue commune dans une grande partie du pays. Les salutations, longues et codifiées, sont essentielles avant toute demande. Le Mali est majoritairement musulman : tenue couvrante, discrétion pendant les prières et le ramadan. Demandez toujours avant de photographier une personne, une cérémonie ou un lieu sacré.",
    },
    {
      title: "Se déplacer",
      body: "Traditionnellement, on circulait entre les villes en bus et taxis-brousse, et sur le Niger en pinasse ou en bateau pendant les hautes eaux. Aujourd'hui, selon les autorités britanniques, les grands axes routiers font l'objet d'attaques et de blocus, notamment sur les convois de carburant, et les déplacements par la route sont très dangereux. Ce guide ne donne donc aucun itinéraire : renseignez-vous auprès des sources officielles avant tout projet.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C et E (prises européennes). Les coupures de courant (délestages) sont fréquentes, y compris à Bamako. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money ; la couverture est inégale hors des villes.",
    },
    {
      title: "Sécurité",
      body: "La situation sécuritaire est très dégradée. À la date de rédaction (octobre 2026), France Diplomatie déconseille formellement de se rendre au Mali, quel que soit le motif, et recommande aux Français présents de quitter temporairement le pays par les vols commerciaux encore disponibles. Le FCDO britannique déconseille tout voyage dans l'ensemble du pays : il signale un risque terroriste élevé, un risque élevé d'enlèvement, y compris à Bamako, et des blocus routiers par des groupes armés. L'aide consulaire y est très limitée. Consultez les « Conseils aux voyageurs » de France Diplomatie, les conseils du FCDO (gov.uk) ou ceux de votre pays avant tout projet : ce guide est un guide de patrimoine, à utiliser quand ces sources ne déconseilleront plus le voyage.",
    },
  ],
  en: {
    intro:
      "At present, all travel to Mali is advised against by the French and British authorities: this guide presents its heritage to help plan a trip once conditions allow. Heir to the Ghana, Mali and Songhai empires, the country of the Niger river is one of the richest in West Africa: the earthen architecture of Djenné and Timbuktu, the Bandiagara cliff and Dogon country, the Tomb of Askia in Gao, and a music scene that has travelled the world from Bamako.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most non-African travellers need a visa. Mali left ECOWAS in 2025 and, with Burkina Faso and Niger, forms the Alliance of Sahel States (AES): entry rules may have changed and may change again. Always check current requirements with the Malian embassy and your own country's official sources before making any plans: passport valid for several months after your return, return ticket, accommodation address.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country, especially during and after the rainy season: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes. The country lies in the “meningitis belt”: ask about vaccination. Drink bottled water and protect yourself well from the heat. Outside Bamako, healthcare is very limited.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). Cash is essential; bank cards are only accepted in a few large hotels and shops in Bamako, and cash machines are rare elsewhere. Mobile money is widely used.",
      },
      {
        title: "When to go",
        body: "The best period is November to February: dry season and more bearable temperatures, with the harmattan (a dry, dusty wind). From March to May the heat becomes overwhelming, often above 40 °C. The rainy season runs roughly from June to September, longer and wetter in the south; it is also when the Niger floods, filling the inner delta until the start of the dry season.",
      },
      {
        title: "Languages and customs",
        body: "The 2023 Constitution made the national languages (Bambara, Fula, Soninke, Songhai, Tamasheq and the Dogon languages, among others) the country's official languages; French is now a working language and remains widely used in government and in towns. Bambara (Bamanankan) is the common language across much of the country. Greetings, long and codified, are essential before asking anything. Mali is mainly Muslim: wear covering clothes and be discreet during prayers and Ramadan. Always ask before photographing a person, a ceremony or a sacred place.",
      },
      {
        title: "Getting around",
        body: "Traditionally, people travelled between towns by bus and bush taxi, and on the Niger by pinasse (river boat) or larger boats at high water. Today, according to the British authorities, the main highways are subject to attacks and blockades, notably targeting fuel convoys, and road travel is very dangerous. This guide therefore gives no itineraries: check official sources before making any plans.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C and E plugs (European sockets). Power cuts are frequent, including in Bamako. A local SIM card (ID required) gives access to mobile internet and mobile money; coverage is patchy outside towns.",
      },
      {
        title: "Safety and security",
        body: "The security situation is very poor. At the time of writing (October 2026), France Diplomatie formally advises against travelling to Mali for any reason and recommends that French nationals there leave temporarily on the commercial flights still available. The UK FCDO advises against all travel to the whole country: it reports a high threat of terrorism, a high threat of kidnapping, including in Bamako, and road blockades by armed groups. Consular help is very limited. Check France Diplomatie's travel advice, the FCDO's advice (gov.uk) or your own country's advice before making any plans: this is a heritage guide, to be used once these sources no longer advise against travel.",
      },
    ],
  },
};

export const MALI_DESTINATIONS: SeedDestination[] = [
  {
    slug: "bamako",
    name: "Bamako",
    region: "District de Bamako",
    summary: "Capitale au bord du Niger, ville de musique, de marchés et du Musée national.",
    description:
      "Étalée sur les deux rives du Niger, Bamako est la capitale et de loin la plus grande ville du pays. Elle est réputée pour sa scène musicale, berceau de nombreux artistes connus dans le monde entier, pour ses marchés foisonnants et pour son Musée national, l'un des plus beaux d'Afrique de l'Ouest. La ville accueille aussi les Rencontres de Bamako, biennale consacrée à la photographie africaine. Comme le reste du pays, elle est à ce jour formellement déconseillée aux voyageurs.",
    lat: 12.6392,
    lng: -8.0029,
    cover: "/images/voyage/bamako",
    en: {
      region: "Bamako District",
      summary: "A capital on the Niger, a city of music, markets and the National Museum.",
      description:
        "Spread across both banks of the Niger, Bamako is the capital and by far the country's largest city. It is famous for its music scene, the birthplace of many internationally known artists, for its teeming markets and for its National Museum, one of the finest in West Africa. The city also hosts the Rencontres de Bamako, a biennial devoted to African photography. Like the rest of the country, it is currently formally advised against for travellers.",
    },
    places: [
      {
        slug: "musee-national-du-mali",
        category: "MUSEUM",
        name: "Musée national du Mali",
        summary: "Grand musée consacré à l'archéologie, aux textiles et aux masques du pays.",
        description:
          "Installé dans un bâtiment d'inspiration soudanaise, le Musée national du Mali présente les grandes collections du pays : objets archéologiques (dont des terres cuites de la région de Djenné), textiles comme le bogolan, masques et statuaire des différents peuples, objets rituels. Ses expositions temporaires et son jardin en font l'un des lieux culturels majeurs de Bamako.",
        tips: `${AVERT} Le musée est voisin du parc national de Bamako : les deux se visitent ensemble.`,
        visitMinutes: 120,
        lat: 12.6586,
        lng: -7.9993,
        en: {
          name: "National Museum of Mali",
          summary: "A major museum devoted to the country's archaeology, textiles and masks.",
          description:
            "Housed in a Sudanese-inspired building, the National Museum of Mali displays the country's great collections: archaeological finds (including terracottas from the Djenné area), textiles such as bogolan (mud cloth), masks and statuary of the different peoples, ritual objects. Its temporary exhibitions and garden make it one of Bamako's leading cultural venues.",
          tips: `${AVERT_EN} The museum is next to Bamako's national park: the two are visited together.`,
        },
      },
      {
        slug: "parc-national-bamako",
        category: "NATURE",
        name: "Parc national du Mali",
        summary: "Grand parc urbain aménagé sur les collines, avec sentiers et jardins.",
        description:
          "Au pied des collines qui dominent la ville, à côté du Musée national, ce parc urbain aménagé à la fin des années 2000 offre des sentiers ombragés, des jardins de plantes locales et des espaces de détente. Une respiration verte très appréciée des habitants de Bamako.",
        tips: `${AVERT} Prévoir de l'eau et venir tôt le matin, quand il fait plus frais.`,
        visitMinutes: 90,
        cover: "/images/voyage/lieu-parc-national-bamako",
        en: {
          name: "National Park of Mali",
          summary: "Large urban park laid out on the hills, with trails and gardens.",
          description:
            "At the foot of the hills overlooking the city, next to the National Museum, this urban park laid out in the late 2000s offers shady trails, gardens of local plants and places to relax. A green breathing space much loved by Bamako residents.",
          tips: `${AVERT_EN} Bring water and come early in the morning, when it is cooler.`,
        },
      },
      {
        slug: "grand-marche-bamako",
        category: "MARKET",
        name: "Grand marché de Bamako",
        summary: "Le cœur commerçant de la ville, autour du bâtiment du « marché rose ».",
        description:
          "Au centre-ville, le grand marché et ses rues voisines forment un immense quartier commerçant : tissus et bazin, bogolan, épices, bijoux, cuir, objets du quotidien. Le bâtiment de style néo-soudanais surnommé « marché rose » en est le repère. Une plongée dans l'activité de la capitale.",
        tips: `${AVERT} Dans les marchés, gardez vos affaires près de vous et demandez avant de photographier.`,
        visitMinutes: 120,
        cover: "/images/voyage/lieu-grand-marche-bamako",
        en: {
          name: "Bamako Grand Market",
          summary: "The city's commercial heart, around the “pink market” building.",
          description:
            "In the city centre, the grand market and its surrounding streets form a huge trading district: fabrics and bazin, bogolan, spices, jewellery, leather, everyday goods. The neo-Sudanese-style building nicknamed the “pink market” is its landmark. A plunge into the capital's bustle.",
          tips: `${AVERT_EN} In markets, keep your belongings close and ask before taking photos.`,
        },
      },
      {
        slug: "grande-mosquee-bamako",
        category: "RELIGION",
        name: "Grande Mosquée de Bamako",
        summary: "Mosquée aux deux grands minarets, repère du centre-ville.",
        description:
          "Construite dans la seconde moitié du XXe siècle, la Grande Mosquée de Bamako domine le centre-ville de ses minarets, non loin du grand marché. C'est l'un des principaux lieux de prière de la capitale, très fréquenté le vendredi. Se visite de l'extérieur.",
        tips: `${AVERT} Tenue couvrante ; ne pas visiter pendant les prières.`,
        visitMinutes: 30,
        lat: 12.6469,
        lng: -7.9931,
        cover: "/images/voyage/lieu-grande-mosquee-bamako",
        en: {
          name: "Great Mosque of Bamako",
          summary: "A mosque with two tall minarets, a downtown landmark.",
          description:
            "Built in the second half of the 20th century, the Great Mosque of Bamako dominates the city centre with its minarets, close to the grand market. It is one of the capital's main places of prayer, very busy on Fridays. Viewed from outside.",
          tips: `${AVERT_EN} Wear covering clothes; do not visit during prayers.`,
        },
      },
      {
        slug: "cathedrale-sacre-coeur-bamako",
        category: "RELIGION",
        name: "Cathédrale du Sacré-Cœur de Bamako",
        summary: "Cathédrale catholique du centre-ville, achevée en 1936.",
        description:
          "Au cœur de Bamako, la cathédrale du Sacré-Cœur est le siège de l'archidiocèse de Bamako. Sa première pierre fut posée en 1925 ; ouverte au culte deux ans plus tard, elle fut achevée en 1936 et resta jusqu'en 1957 le seul lieu de culte catholique officiel de la ville. Elle figure depuis 2017 sur la liste indicative du Mali pour le patrimoine mondial de l'UNESCO, témoin de la présence chrétienne dans un pays très majoritairement musulman.",
        tips: `${AVERT} Lieu de culte : tenue correcte et discrétion pendant les offices.`,
        visitMinutes: 30,
        lat: 12.6435,
        lng: -7.9996,
        cover: "/images/voyage/lieu-cathedrale-sacre-coeur-bamako",
        en: {
          name: "Sacred Heart Cathedral, Bamako",
          summary: "The downtown Catholic cathedral, completed in 1936.",
          description:
            "In the heart of Bamako, the Sacred Heart Cathedral is the seat of the Archdiocese of Bamako. Its foundation stone was laid in 1925; opened for worship two years later, it was completed in 1936 and remained the city's only official Catholic place of worship until 1957. Since 2017 it has been on Mali's UNESCO World Heritage Tentative List, a witness to the Christian presence in an overwhelmingly Muslim country.",
          tips: `${AVERT_EN} A place of worship: dress appropriately and be discreet during services.`,
        },
      },
      {
        slug: "kamablon-kangaba",
        category: "CULTURE",
        name: "Case sacrée de Kangaba (Kamablon)",
        summary: "Case sacrée du Manden, dont le toit de chaume est refait tous les sept ans.",
        description:
          "À Kangaba, au sud-ouest de Bamako, le Kamablon (« vestibule de la parole ») est une case ronde en banco coiffée de chaume, édifiée selon la tradition en 1653 et considérée comme la dernière de ce type dans l'aire culturelle du Manden, berceau de l'empire du Mali. Tous les sept ans, la réfection de son toit donne lieu à une cérémonie de plusieurs jours menée par les Keïta, descendants de Soundiata, et les griots Diabaté, qui y récitent l'histoire du Manden ; ce rituel est inscrit depuis 2009 au patrimoine culturel immatériel de l'UNESCO. Les sites historiques du Manden figurent aussi sur la liste indicative du Mali.",
        tips: `${AVERT} Lieu sacré : on ne s'en approche qu'avec l'accord des autorités coutumières et selon leurs règles.`,
        visitMinutes: 60,
        lat: 11.9419,
        lng: -8.4103,
        en: {
          name: "Sacred hut of Kangaba (Kamablon)",
          summary: "The sacred hut of the Manden, whose thatched roof is renewed every seven years.",
          description:
            "In Kangaba, south-west of Bamako, the Kamablon (“vestibule of speech”) is a round banco hut with a thatched roof, built according to tradition in 1653 and regarded as the last of its kind in the Manden cultural area, the cradle of the Mali Empire. Every seven years the renewal of its roof is the occasion for a ceremony lasting several days, led by the Keita, descendants of Sundiata, and the Diabaté griots, who recite the history of the Manden there; this ritual has been on UNESCO's Intangible Cultural Heritage list since 2009. The historic sites of the Manden are also on Mali's Tentative List.",
          tips: `${AVERT_EN} A sacred place: approach it only with the consent of the customary authorities and according to their rules.`,
        },
      },
    ],
  },
  {
    slug: "segou",
    name: "Ségou",
    region: "Ségou",
    summary: "Ancienne capitale du royaume bambara, sur les rives du Niger.",
    description:
      "Au bord du Niger, Ségou fut au XVIIIe siècle la capitale du royaume bambara fondé par Biton Coulibaly. La ville a gardé des quais animés, des bâtiments d'époque coloniale et une tradition artisanale vivante, du bogolan à la poterie. Elle accueille depuis le milieu des années 2000 le Festival sur le Niger, l'un des grands rendez-vous culturels du pays. À ce jour, comme le reste du Mali, elle est formellement déconseillée aux voyageurs.",
    lat: 13.4317,
    lng: -6.2633,
    cover: "/images/voyage/segou",
    en: {
      region: "Ségou",
      summary: "Former capital of the Bambara kingdom, on the banks of the Niger.",
      description:
        "On the Niger, Ségou was the capital of the Bambara kingdom founded by Biton Coulibaly in the 18th century. The town has kept lively riverbanks, colonial-era buildings and a living craft tradition, from bogolan to pottery. Since the mid-2000s it has hosted the Festival sur le Niger, one of the country's major cultural events. At present, like the rest of Mali, it is formally advised against for travellers.",
    },
    places: [
      {
        slug: "festival-sur-le-niger-segou",
        category: "FESTIVAL",
        name: "Festival sur le Niger",
        summary: "Musique, arts et culture sur les berges du fleuve, généralement en février.",
        description:
          "Créé au milieu des années 2000, le Festival sur le Niger réunit chaque année sur les berges de Ségou des musiciens maliens et africains, des expositions d'art, des marionnettes et des rencontres autour des cultures du fleuve. Il est devenu l'un des événements culturels phares du pays.",
        tips: `${AVERT} Les dates et la tenue même du festival dépendent du contexte : consultez les annonces officielles des organisateurs.`,
        bestPeriod: "Généralement en février",
        visitMinutes: 480,
        cover: "/images/voyage/lieu-festival-sur-le-niger-segou",
        en: {
          name: "Festival on the Niger",
          summary: "Music, arts and culture on the riverbanks, usually in February.",
          description:
            "Founded in the mid-2000s, the Festival on the Niger brings together Malian and African musicians, art exhibitions, puppetry and talks about the river's cultures every year on the banks at Ségou. It has become one of the country's flagship cultural events.",
          tips: `${AVERT_EN} The dates, and whether the festival takes place at all, depend on the situation: check the organisers' official announcements.`,
          bestPeriod: "Usually in February",
        },
      },
      {
        slug: "segou-koro",
        category: "HISTORY",
        name: "Ségou-Koro",
        summary: "Village historique de Biton Coulibaly, avec ses mosquées de terre.",
        description:
          "À quelques kilomètres de Ségou, au bord du fleuve, Ségou-Koro (« le vieux Ségou ») est le berceau du royaume bambara. Le village conserve des mosquées en banco et le lieu de mémoire de Biton Coulibaly, fondateur du royaume. Une visite qui se fait avec un guide local et dans le respect des usages du village.",
        tips: `${AVERT} Saluez le chef de village ou ses représentants avant la visite, comme le veut l'usage.`,
        visitMinutes: 90,
        cover: "/images/voyage/lieu-segou-koro",
        en: {
          name: "Ségou-Koro",
          summary: "Historic village of Biton Coulibaly, with its earthen mosques.",
          description:
            "A few kilometres from Ségou, on the river, Ségou-Koro (“old Ségou”) is the cradle of the Bambara kingdom. The village has kept banco (mud-brick) mosques and the memorial site of Biton Coulibaly, the kingdom's founder. A visit made with a local guide and with respect for village customs.",
          tips: `${AVERT_EN} Greet the village chief or his representatives before visiting, as custom requires.`,
        },
      },
      {
        slug: "poteries-de-kalabougou",
        category: "CULTURE",
        name: "Potières de Kalabougou",
        summary: "Village de potières sur l'autre rive du Niger, face à Ségou.",
        description:
          "Sur la rive opposée du Niger, le village de Kalabougou est réputé pour ses potières, qui façonnent à la main jarres et canaris puis les cuisent en plein air, selon des techniques transmises de génération en génération. Une rencontre avec un savoir-faire ancestral.",
        tips: `${AVERT} Demandez toujours avant de photographier ; acheter une pièce est la meilleure façon de soutenir les artisanes.`,
        visitMinutes: 120,
        lat: 13.4394,
        lng: -6.3358,
        cover: "/images/voyage/lieu-poteries-de-kalabougou",
        en: {
          name: "Kalabougou potters",
          summary: "A village of women potters on the far bank of the Niger, opposite Ségou.",
          description:
            "On the opposite bank of the Niger, the village of Kalabougou is known for its women potters, who shape jars and water pots by hand and fire them in the open air, using techniques passed down through generations. An encounter with an ancestral craft.",
          tips: `${AVERT_EN} Always ask before taking photos; buying a piece is the best way to support the potters.`,
        },
      },
    ],
  },
  {
    slug: "djenne",
    name: "Djenné",
    region: "Mopti",
    summary: "Ville de terre classée à l'UNESCO, dominée par la plus célèbre mosquée en banco du monde.",
    description:
      "Sur une île du delta intérieur du Niger, Djenné est l'une des plus anciennes villes d'Afrique subsaharienne. Ses maisons en banco, sa Grande Mosquée et le site archéologique voisin de Djenné-Djeno forment les « Villes anciennes de Djenné », inscrites au patrimoine mondial de l'UNESCO en 1988 et sur la liste du patrimoine en péril depuis 2016. Chaque année, le crépissage collectif de la mosquée et le grand marché du lundi rythment la vie de la ville. Région formellement déconseillée à ce jour.",
    lat: 13.9061,
    lng: -4.5533,
    cover: "/images/voyage/djenne",
    en: {
      region: "Mopti",
      summary: "A UNESCO-listed earthen town, dominated by the world's most famous mud-brick mosque.",
      description:
        "On an island in the Niger's inner delta, Djenné is one of the oldest towns in sub-Saharan Africa. Its banco houses, its Great Mosque and the nearby archaeological site of Djenné-Djeno make up the “Old Towns of Djenné”, a UNESCO World Heritage Site since 1988 and on the List of World Heritage in Danger since 2016. Every year, the collective replastering of the mosque and the great Monday market set the rhythm of town life. The region is currently formally advised against.",
    },
    places: [
      {
        slug: "grande-mosquee-djenne",
        category: "RELIGION",
        name: "Grande Mosquée de Djenné",
        summary: "Chef-d'œuvre de l'architecture soudano-sahélienne, le plus grand édifice en terre crue du monde.",
        description:
          "Reconstruite en 1907 à l'emplacement d'une mosquée bien plus ancienne, la Grande Mosquée de Djenné est l'emblème du Mali. Ses murs de banco hérissés de pièces de bois (les « terrons »), ses trois tours de façade et ses contreforts en font le symbole de l'architecture soudano-sahélienne. Elle domine la place du marché. L'intérieur est réservé aux fidèles musulmans.",
        tips: `${AVERT} Bâtiment religieux : observez-le depuis la place et respectez les temps de prière.`,
        visitMinutes: 60,
        lat: 13.9053,
        lng: -4.5556,
        cover: "/images/voyage/lieu-grande-mosquee-djenne",
        en: {
          name: "Great Mosque of Djenné",
          summary: "A masterpiece of Sudano-Sahelian architecture, the world's largest mud-brick building.",
          description:
            "Rebuilt in 1907 on the site of a much older mosque, the Great Mosque of Djenné is Mali's emblem. Its banco walls bristling with wooden beams (toron), its three facade towers and its buttresses make it the symbol of Sudano-Sahelian architecture. It towers over the market square. The interior is reserved for Muslim worshippers.",
          tips: `${AVERT_EN} A religious building: view it from the square and respect prayer times.`,
        },
      },
      {
        slug: "crepissage-mosquee-djenne",
        category: "FESTIVAL",
        name: "Crépissage de la Grande Mosquée",
        summary: "Chaque année, toute la ville se mobilise pour recouvrir la mosquée d'un enduit neuf.",
        description:
          "Les pluies abîment les murs de terre : chaque année, avant l'hivernage, les habitants de Djenné préparent un mélange de banco et se relaient dans une grande fête collective pour recrépir la mosquée. Les quartiers rivalisent d'ardeur, au son des tambours. Une tradition vivante qui assure la survie du monument.",
        tips: `${AVERT} La date est fixée localement chaque année.`,
        bestPeriod: "Une fois par an, avant la saison des pluies (date fixée localement)",
        visitMinutes: 240,
        lat: 13.9053,
        lng: -4.5556,
        cover: "/images/voyage/lieu-crepissage-mosquee-djenne",
        en: {
          name: "Replastering of the Great Mosque",
          summary: "Every year the whole town turns out to give the mosque a fresh coat of mud.",
          description:
            "The rains damage the earthen walls: every year, before the rainy season, Djenné's residents prepare a banco mixture and take turns in a great collective festival to replaster the mosque. Neighbourhoods compete with each other to the sound of drums. A living tradition that keeps the monument standing.",
          tips: `${AVERT_EN} The date is set locally each year.`,
          bestPeriod: "Once a year, before the rainy season (date set locally)",
        },
      },
      {
        slug: "marche-du-lundi-djenne",
        category: "MARKET",
        name: "Marché du lundi",
        summary: "Grand marché hebdomadaire au pied de la mosquée, qui attire toute la région.",
        description:
          "Chaque lundi, la place devant la Grande Mosquée se couvre d'étals : commerçants, éleveurs et cultivateurs des villages du delta viennent y vendre céréales, poisson séché, épices, tissus, poteries et bétail. Le spectacle du marché devant la façade de la mosquée est l'une des images les plus célèbres du Mali.",
        tips: `${AVERT} Demandez avant de photographier les commerçants.`,
        bestPeriod: "Le lundi",
        visitMinutes: 120,
        lat: 13.9053,
        lng: -4.5556,
        cover: "/images/voyage/lieu-marche-du-lundi-djenne",
        en: {
          name: "Monday Market",
          summary: "A big weekly market at the foot of the mosque, drawing the whole region.",
          description:
            "Every Monday the square in front of the Great Mosque fills with stalls: traders, herders and farmers from the delta villages come to sell grain, dried fish, spices, fabrics, pottery and livestock. The sight of the market before the mosque's facade is one of Mali's most famous images.",
          tips: `${AVERT_EN} Ask before photographing traders.`,
          bestPeriod: "Mondays",
        },
      },
      {
        slug: "djenne-djeno",
        category: "HISTORY",
        name: "Djenné-Djeno",
        summary: "Site archéologique de l'ancienne cité, l'une des plus vieilles d'Afrique de l'Ouest.",
        description:
          "À quelques kilomètres de la ville actuelle, la butte de Djenné-Djeno (« le vieux Djenné ») conserve les vestiges d'une cité habitée dès les derniers siècles avant notre ère. Les fouilles ont révélé une agglomération urbaine et marchande très ancienne, ainsi que des statuettes en terre cuite devenues célèbres. Le site, fragile et protégé, fait partie du bien UNESCO.",
        tips: `${AVERT} Site archéologique protégé : ne ramassez rien, le pillage des terres cuites est un fléau.`,
        visitMinutes: 60,
        en: {
          name: "Djenné-Djeno",
          summary: "Archaeological site of the ancient city, one of the oldest in West Africa.",
          description:
            "A few kilometres from today's town, the mound of Djenné-Djeno (“old Djenné”) holds the remains of a city inhabited from the last centuries BC. Excavations have revealed a very early urban and trading town, as well as terracotta figurines that have become famous. The fragile, protected site is part of the UNESCO property.",
          tips: `${AVERT_EN} A protected archaeological site: pick nothing up, the looting of terracottas is a scourge.`,
        },
      },
    ],
  },
  {
    slug: "pays-dogon",
    name: "Falaise de Bandiagara (pays dogon)",
    region: "Bandiagara",
    summary: "Une falaise de grès longue de plus de 150 km, villages dogon et greniers accrochés à la roche.",
    description:
      "Le long de la falaise de Bandiagara, les Dogon ont bâti des villages de terre et de pierre au pied et au flanc de l'escarpement, au-dessus des anciennes habitations troglodytes attribuées aux Tellem. Paysages grandioses, architecture, masques et cosmogonie font de la « Falaise de Bandiagara (pays dogon) » un bien mixte, culturel et naturel, inscrit au patrimoine mondial de l'UNESCO en 1989 et placé sur la liste du patrimoine en péril en 2023. La région est touchée par les violences armées et formellement déconseillée.",
    lat: 14.3489,
    lng: -3.6106,
    cover: "/images/voyage/pays-dogon",
    en: {
      name: "Cliff of Bandiagara (Land of the Dogons)",
      region: "Bandiagara",
      summary: "A sandstone cliff over 150 km long, Dogon villages and granaries clinging to the rock.",
      description:
        "Along the Bandiagara cliff, the Dogon built villages of earth and stone at the foot and on the face of the escarpment, below the ancient cliff dwellings attributed to the Tellem. Grand landscapes, architecture, masks and cosmology make the “Cliff of Bandiagara (Land of the Dogons)” a mixed cultural and natural UNESCO World Heritage Site, listed in 1989 and placed on the List of World Heritage in Danger in 2023. The region is affected by armed violence and is formally advised against.",
    },
    places: [
      {
        slug: "falaise-de-bandiagara",
        category: "NATURE",
        name: "Falaise de Bandiagara",
        summary: "Escarpement spectaculaire dominant la plaine du Séno.",
        description:
          "Sur plus de 150 kilomètres, la falaise de grès sépare le plateau de Bandiagara de la plaine du Séno. Éboulis, gorges, sources et végétation accrochée aux parois composent un paysage saisissant, longtemps parcouru à pied de village en village par les randonneurs.",
        tips: `${AVERT} La région est touchée par les violences armées : ne pas s'y rendre tant que les sources officielles le déconseillent.`,
        bestPeriod: "Novembre à février (saison sèche et fraîche)",
        visitMinutes: 480,
        lat: 14.4167,
        lng: -3.3167,
        cover: "/images/voyage/lieu-falaise-de-bandiagara",
        en: {
          name: "Bandiagara cliff",
          summary: "A spectacular escarpment overlooking the Séno plain.",
          description:
            "For more than 150 kilometres, the sandstone cliff separates the Bandiagara plateau from the Séno plain. Scree, gorges, springs and vegetation clinging to the rock walls make up a striking landscape, long explored on foot from village to village by hikers.",
          tips: `${AVERT_EN} The region is affected by armed violence: do not go there while official sources advise against it.`,
          bestPeriod: "November to February (cool dry season)",
        },
      },
      {
        slug: "villages-dogon",
        category: "CULTURE",
        name: "Villages dogon",
        summary: "Maisons de terre, greniers à toit de chaume et togu na, la case à palabres.",
        description:
          "Les villages dogon s'organisent autour de la togu na, abri bas au toit épais de tiges de mil où se réunissent les hommes, de la maison du hogon (chef religieux) et d'innombrables greniers coiffés de chaume. Au-dessus, dans la paroi, subsistent les anciennes habitations et greniers attribués aux Tellem. Une architecture indissociable de la cosmogonie dogon.",
        tips: `${AVERT} Les lieux sacrés des villages sont interdits aux visiteurs : la visite se fait toujours avec un guide du village.`,
        visitMinutes: 240,
        cover: "/images/voyage/lieu-villages-dogon",
        en: {
          name: "Dogon villages",
          summary: "Earthen houses, thatched granaries and the toguna, the meeting shelter.",
          description:
            "Dogon villages are organised around the toguna, a low shelter with a thick roof of millet stalks where the men meet, the house of the hogon (religious leader) and countless thatch-capped granaries. Above, in the cliff face, survive the ancient dwellings and granaries attributed to the Tellem. An architecture inseparable from Dogon cosmology.",
          tips: `${AVERT_EN} Sacred places in the villages are off-limits to visitors: visits are always made with a village guide.`,
        },
      },
      {
        slug: "masques-dogon",
        category: "FESTIVAL",
        name: "Masques dogon",
        summary: "Danses de masques liées aux rites funéraires et aux grandes cérémonies.",
        description:
          "Les masques dogon, dont le célèbre kanaga, sortent lors des cérémonies funéraires du dama, qui accompagnent les défunts vers le monde des ancêtres, et lors des grands rites collectifs. Leur danse, au son des tambours, est l'une des expressions les plus fortes de la culture dogon. Le calendrier des cérémonies est fixé par les communautés elles-mêmes.",
        tips: `${AVERT} Les cérémonies sont des rites, pas des spectacles : n'y assistez que sur invitation et selon les règles fixées par le village.`,
        visitMinutes: 180,
        cover: "/images/voyage/lieu-masques-dogon",
        en: {
          name: "Dogon masks",
          summary: "Masked dances tied to funeral rites and major ceremonies.",
          description:
            "Dogon masks, including the famous kanaga, come out during the dama funeral ceremonies, which guide the dead to the world of the ancestors, and during major collective rites. Their dance, to the sound of drums, is one of the strongest expressions of Dogon culture. The ceremony calendar is set by the communities themselves.",
          tips: `${AVERT_EN} Ceremonies are rites, not shows: attend only by invitation and according to the village's rules.`,
        },
      },
      {
        slug: "sangha-pays-dogon",
        category: "CULTURE",
        name: "Sangha",
        summary: "Bourg au bord du plateau, considéré comme la capitale culturelle du pays dogon.",
        description:
          "Au bord du plateau de Bandiagara, Sangha regroupe une dizaine de villages rapprochés, dont Ogol-du-haut et Ogol-du-bas, et passe pour la capitale culturelle du pays dogon. L'ethnologue Marcel Griaule y mena ses recherches dans les années 1930, et le cinéaste Souleymane Cissé y tourna une partie de son film Yeelen. De là, des sentiers descendaient la falaise vers des villages comme Ireli, Banani ou Tireli.",
        tips: `${AVERT} La région est touchée par les violences armées : ne pas s'y rendre tant que les sources officielles le déconseillent.`,
        visitMinutes: 240,
        lat: 14.465,
        lng: -3.3061,
        cover: "/images/voyage/lieu-sangha-pays-dogon",
        en: {
          summary: "A small town on the edge of the plateau, regarded as the cultural capital of Dogon country.",
          description:
            "On the edge of the Bandiagara plateau, Sangha groups some ten closely spaced villages, including Upper and Lower Ogol, and is regarded as the cultural capital of Dogon country. The ethnologist Marcel Griaule carried out his research there in the 1930s, and the film-maker Souleymane Cissé shot part of his film Yeelen there. From Sangha, paths led down the cliff to villages such as Ireli, Banani and Tireli.",
          tips: `${AVERT_EN} The region is affected by armed violence: do not go there while official sources advise against it.`,
        },
      },
    ],
  },
  {
    slug: "tombouctou",
    name: "Tombouctou",
    region: "Tombouctou",
    summary: "Cité légendaire aux portes du Sahara, ses mosquées de terre et ses manuscrits.",
    description:
      "Fondée au bord du Sahara, près du fleuve Niger, Tombouctou devint aux XVe et XVIe siècles un grand carrefour du commerce transsaharien et un foyer intellectuel de l'islam. Ses trois grandes mosquées, Djingareyber, Sankoré et Sidi Yahia, et ses mausolées de saints sont inscrits au patrimoine mondial de l'UNESCO depuis 1988 et sur la liste du patrimoine en péril. En 2012, des mausolées furent détruits par des groupes armés ; ils ont été reconstruits par des maçons locaux avec le soutien de l'UNESCO. Zone formellement déconseillée.",
    lat: 16.7735,
    lng: -3.0074,
    cover: "/images/voyage/tombouctou",
    en: {
      name: "Timbuktu",
      region: "Timbuktu",
      summary: "A legendary city on the edge of the Sahara, with earthen mosques and manuscripts.",
      description:
        "Founded on the edge of the Sahara, near the Niger, Timbuktu became a great hub of trans-Saharan trade and a centre of Islamic learning in the 15th and 16th centuries. Its three great mosques, Djingareyber, Sankoré and Sidi Yahia, and its saints' mausoleums have been a UNESCO World Heritage Site since 1988 and are on the List of World Heritage in Danger. In 2012 mausoleums were destroyed by armed groups; they were rebuilt by local masons with UNESCO's support. The area is formally advised against.",
    },
    places: [
      {
        slug: "mosquee-djingareyber",
        category: "RELIGION",
        name: "Mosquée Djingareyber",
        summary: "La grande mosquée de terre du XIVe siècle, liée à l'empereur Kankou Moussa.",
        description:
          "Construite au XIVe siècle, au retour du pèlerinage à La Mecque de l'empereur du Mali Kankou Moussa, et attribuée à l'architecte andalou Abou Ishaq es-Sahéli, Djingareyber est la plus ancienne des grandes mosquées de Tombouctou. Ses murs de banco, son minaret conique et ses pièces de bois saillantes illustrent l'architecture de terre sahélienne ; elle est régulièrement entretenue par les maçons de la ville.",
        tips: `${AVERT} La région de Tombouctou est formellement déconseillée.`,
        visitMinutes: 60,
        lat: 16.7713,
        lng: -3.01,
        cover: "/images/voyage/lieu-mosquee-djingareyber",
        en: {
          name: "Djingareyber Mosque",
          summary: "The great 14th-century earthen mosque, linked to Emperor Mansa Musa.",
          description:
            "Built in the 14th century, after Mali's emperor Mansa Musa (Kankou Moussa) returned from his pilgrimage to Mecca, and attributed to the Andalusian architect Abu Ishaq es-Saheli, Djingareyber is the oldest of Timbuktu's great mosques. Its banco walls, conical minaret and projecting wooden beams illustrate Sahelian earthen architecture; it is regularly maintained by the town's masons.",
          tips: `${AVERT_EN} The Timbuktu region is formally advised against.`,
        },
      },
      {
        slug: "mosquee-sankore",
        category: "RELIGION",
        name: "Mosquée Sankoré",
        summary: "Mosquée et ancien foyer d'enseignement, symbole du rayonnement intellectuel de la ville.",
        description:
          "Au nord de la ville, la mosquée Sankoré fut aux XVe et XVIe siècles l'un des grands centres d'enseignement de Tombouctou, où des savants enseignaient le droit, la théologie, la grammaire ou l'astronomie. Sa silhouette en pyramide à degrés est l'une des images de la ville.",
        tips: `${AVERT} La région de Tombouctou est formellement déconseillée.`,
        visitMinutes: 45,
        lat: 16.7758,
        lng: -3.0056,
        cover: "/images/voyage/lieu-mosquee-sankore",
        en: {
          name: "Sankoré Mosque",
          summary: "A mosque and former seat of learning, symbol of the city's intellectual influence.",
          description:
            "In the north of the town, Sankoré mosque was one of Timbuktu's great centres of learning in the 15th and 16th centuries, where scholars taught law, theology, grammar and astronomy. Its stepped pyramid silhouette is one of the town's emblems.",
          tips: `${AVERT_EN} The Timbuktu region is formally advised against.`,
        },
      },
      {
        slug: "manuscrits-de-tombouctou",
        category: "MUSEUM",
        name: "Manuscrits de Tombouctou",
        summary: "Des centaines de milliers de manuscrits conservés par l'Institut Ahmed Baba et les bibliothèques familiales.",
        description:
          "Tombouctou a conservé un patrimoine écrit exceptionnel : des manuscrits en arabe et en langues africaines transcrites, traitant de religion, de droit, de sciences, de médecine ou de commerce. Une partie est conservée par l'Institut des hautes études et de recherche islamique Ahmed Baba (IHERI-AB), le reste dans des bibliothèques familiales. En 2012-2013, une grande partie des manuscrits a été mise à l'abri à Bamako ; certains ont été détruits.",
        tips: `${AVERT} Les collections ont été en partie déplacées : renseignez-vous sur ce qui est consultable et où.`,
        visitMinutes: 90,
        lat: 16.7768,
        lng: -3.0058,
        cover: "/images/voyage/lieu-manuscrits-de-tombouctou",
        en: {
          name: "Timbuktu manuscripts",
          summary: "Hundreds of thousands of manuscripts kept by the Ahmed Baba Institute and family libraries.",
          description:
            "Timbuktu has preserved an exceptional written heritage: manuscripts in Arabic and in African languages written in Arabic script, covering religion, law, science, medicine and trade. Some are held by the Ahmed Baba Institute of Higher Islamic Studies and Research (IHERI-AB), the rest in family libraries. In 2012–2013 a large share of the manuscripts was moved to safety in Bamako; some were destroyed.",
          tips: `${AVERT_EN} The collections have been partly moved: check what can be consulted and where.`,
        },
      },
      {
        slug: "mosquee-sidi-yahia",
        category: "RELIGION",
        name: "Mosquée Sidi Yahia",
        summary: "Mosquée du XVe siècle, la troisième des grandes mosquées de Tombouctou.",
        description:
          "Commencée vers 1400 et achevée vers 1440, la mosquée Sidi Yahia porte le nom de son premier imam, Sidi Yahia al-Tadelsi, vénéré comme un saint et inhumé dans l'édifice. Avec Djingareyber et Sankoré, elle forme l'ensemble des grandes mosquées qui firent le rayonnement intellectuel de la ville et qui sont inscrites au patrimoine mondial. Fortement remaniée en 1939, elle fut endommagée par des groupes armés en juillet 2012, puis restaurée sous la conduite de l'UNESCO.",
        tips: `${AVERT} La région de Tombouctou est formellement déconseillée.`,
        visitMinutes: 45,
        lat: 16.7723,
        lng: -3.0072,
        cover: "/images/voyage/lieu-mosquee-sidi-yahia",
        en: {
          name: "Sidi Yahia Mosque",
          summary: "A 15th-century mosque, the third of Timbuktu's great mosques.",
          description:
            "Begun around 1400 and completed around 1440, the Sidi Yahia Mosque is named after its first imam, Sidi Yahia al-Tadelsi, venerated as a saint and buried in the building. With Djingareyber and Sankoré, it forms the group of great mosques behind the city's intellectual fame, all listed as World Heritage. Heavily remodelled in 1939, it was damaged by armed groups in July 2012 and later restored under UNESCO's direction.",
          tips: `${AVERT_EN} The Timbuktu region is formally advised against.`,
        },
      },
    ],
  },
  {
    slug: "gao",
    name: "Gao",
    region: "Gao",
    summary: "Ancienne capitale de l'empire songhaï, sur la boucle du Niger.",
    description:
      "Sur la rive gauche du Niger, Gao fut la capitale de l'empire songhaï, qui domina une grande partie de l'Afrique de l'Ouest aux XVe et XVIe siècles. Elle conserve le tombeau des Askia, pyramide de terre inscrite au patrimoine mondial de l'UNESCO en 2004 et sur la liste du patrimoine en péril depuis 2012. Face à la ville, la dune rose se reflète dans le fleuve. Zone formellement déconseillée.",
    lat: 16.2666,
    lng: -0.04,
    cover: "/images/voyage/gao",
    en: {
      region: "Gao",
      summary: "Former capital of the Songhai Empire, on the bend of the Niger.",
      description:
        "On the left bank of the Niger, Gao was the capital of the Songhai Empire, which dominated much of West Africa in the 15th and 16th centuries. It preserves the Tomb of Askia, an earthen pyramid listed as a UNESCO World Heritage Site in 2004 and on the List of World Heritage in Danger since 2012. Opposite the town, the pink dune is reflected in the river. The area is formally advised against.",
    },
    places: [
      {
        slug: "tombeau-des-askia",
        category: "HISTORY",
        name: "Tombeau des Askia",
        summary: "Pyramide de terre de la fin du XVe siècle, sépulture de l'empereur Askia Mohammed.",
        description:
          "Élevé à la fin du XVe siècle par l'empereur songhaï Askia Mohammed à son retour de La Mecque, le tombeau est une imposante pyramide de banco hérissée de pièces de bois, l'un des plus grands monuments de terre de la région. L'ensemble comprend aussi deux mosquées à toit plat, un cimetière et une esplanade de prière. Il témoigne de la puissance de l'empire et de la diffusion de l'architecture de terre sahélienne.",
        tips: `${AVERT} La région de Gao est formellement déconseillée.`,
        visitMinutes: 60,
        lat: 16.2897,
        lng: -0.0444,
        cover: "/images/voyage/lieu-tombeau-des-askia",
        en: {
          name: "Tomb of Askia",
          summary: "A late 15th-century earthen pyramid, burial place of Emperor Askia Mohammed.",
          description:
            "Built at the end of the 15th century by the Songhai emperor Askia Mohammed on his return from Mecca, the tomb is an imposing banco pyramid bristling with wooden beams, one of the largest earthen monuments in the region. The complex also includes two flat-roofed mosques, a cemetery and an open-air prayer ground. It bears witness to the empire's power and the spread of Sahelian earthen architecture.",
          tips: `${AVERT_EN} The Gao region is formally advised against.`,
        },
      },
      {
        slug: "dune-rose-gao",
        category: "NATURE",
        name: "Dune rose",
        summary: "Grande dune de sable aux reflets roses, sur la rive opposée du Niger.",
        description:
          "Sur la rive droite du fleuve, face à Gao, une grande dune de sable prend des teintes rosées au lever et au coucher du soleil. Du sommet, la vue embrasse le Niger et la ville. Un lieu de promenade traditionnel pour les habitants de Gao.",
        tips: `${AVERT} La région de Gao est formellement déconseillée.`,
        visitMinutes: 120,
        cover: "/images/voyage/lieu-dune-rose-gao",
        en: {
          name: "Pink Dune",
          summary: "A large sand dune with pink hues, on the far bank of the Niger.",
          description:
            "On the right bank of the river, opposite Gao, a large sand dune turns pinkish at sunrise and sunset. From the top, the view takes in the Niger and the town. A traditional outing for Gao residents.",
          tips: `${AVERT_EN} The Gao region is formally advised against.`,
        },
      },
    ],
  },
  {
    slug: "mopti",
    name: "Mopti",
    region: "Mopti",
    summary: "La « Venise du Mali », port fluvial au confluent du Niger et du Bani.",
    description:
      "Bâtie sur la rive droite du Bani, tout près de son confluent avec le Niger, Mopti est surnommée la « Venise du Mali » : pendant la crue, d'août à décembre environ, la ville devient un ensemble d'îlots reliés par des digues. Simple village de pêcheurs bozo devenu un grand carrefour commercial à l'époque coloniale, elle réunit Bozo, Peuls, Bambara, Dogon et Songhaï autour de son port, de ses chantiers de pirogues et de sa grande mosquée en banco. Elle était la porte d'entrée vers Djenné et le pays dogon. Région formellement déconseillée à ce jour.",
    lat: 14.4898,
    lng: -4.18,
    cover: "/images/voyage/mopti",
    en: {
      region: "Mopti",
      summary: "The “Venice of Mali”, a river port where the Niger meets the Bani.",
      description:
        "Built on the right bank of the Bani, close to its confluence with the Niger, Mopti is nicknamed the “Venice of Mali”: during the flood, roughly from August to December, the town becomes a cluster of islands linked by causeways. Once a simple Bozo fishing village that grew into a major trading hub in colonial times, it brings together Bozo, Fulani, Bambara, Dogon and Songhai around its port, its boatyards and its great mud-brick mosque. It used to be the gateway to Djenné and Dogon country. The region is currently formally advised against.",
    },
    places: [
      {
        slug: "mosquee-komoguel-mopti",
        category: "RELIGION",
        name: "Grande Mosquée de Mopti (Komoguel)",
        summary: "Mosquée en banco de style soudanais des années 1930, restaurée selon les techniques traditionnelles.",
        description:
          "Inspirée de la Grande Mosquée de Djenné, la mosquée du quartier de Komoguel a été bâtie en banco dans les années 1930, à l'emplacement d'une mosquée de 1908. Recouverte de ciment en 1978 puis en 2003, elle se dégradait ; une restauration menée de 2004 à 2006 avec le Trust Aga Khan pour la culture lui a rendu son enduit de terre et ses savoir-faire traditionnels. Classée au patrimoine national depuis 2005, elle figure sur la liste indicative du Mali pour le patrimoine mondial de l'UNESCO.",
        tips: `${AVERT} L'intérieur est réservé aux fidèles : observez la mosquée de l'extérieur et respectez les temps de prière.`,
        visitMinutes: 30,
        lat: 14.4939,
        lng: -4.1967,
        cover: "/images/voyage/lieu-mosquee-komoguel-mopti",
        en: {
          name: "Great Mosque of Mopti (Komoguel)",
          summary: "A 1930s Sudanese-style mud-brick mosque, restored using traditional techniques.",
          description:
            "Inspired by the Great Mosque of Djenné, the mosque in the Komoguel district was built of banco in the 1930s on the site of a 1908 mosque. Covered with cement in 1978 and again in 2003, it was deteriorating; a restoration carried out from 2004 to 2006 with the Aga Khan Trust for Culture gave it back its earthen render and traditional craftsmanship. Listed as national heritage since 2005, it is on Mali's UNESCO World Heritage Tentative List.",
          tips: `${AVERT_EN} The interior is reserved for worshippers: view the mosque from outside and respect prayer times.`,
        },
      },
      {
        slug: "port-de-mopti",
        category: "MARKET",
        name: "Port de Mopti",
        summary: "Port fluvial animé, où accostent pinasses et pirogues.",
        description:
          "Sur le Bani, le port est le cœur battant de Mopti : pinasses chargées de marchandises et de passagers, pirogues de pêcheurs bozo, chantiers où l'on construit les embarcations à la main. Les plaques de sel venues de Taoudéni par le fleuve y étaient débarquées et vendues au détail. Un spectacle permanent au bord de l'eau, surtout en fin de journée.",
        tips: `${AVERT} Demandez avant de photographier les gens ; gardez vos affaires près de vous dans la foule.`,
        visitMinutes: 90,
        cover: "/images/voyage/lieu-port-de-mopti",
        en: {
          name: "Mopti harbour",
          summary: "A bustling river port where pinasses and pirogues tie up.",
          description:
            "On the Bani, the harbour is the beating heart of Mopti: pinasses (large river boats) loaded with goods and passengers, Bozo fishermen's pirogues, boatyards where vessels are built by hand. Slabs of salt from Taoudenni, brought down the river, used to be unloaded and sold here. A constant spectacle on the waterfront, especially in the late afternoon.",
          tips: `${AVERT_EN} Ask before photographing people; keep your belongings close in the crowd.`,
        },
      },
      {
        slug: "hamdallahi",
        category: "HISTORY",
        name: "Hamdallahi",
        summary: "Vestiges de la capitale de l'empire peul du Macina, fondée en 1818.",
        description:
          "À une quarantaine de kilomètres au sud de Mopti, Hamdallahi (« louange à Dieu ») fut fondée en 1818 par Sékou Amadou pour être la capitale de l'empire peul du Macina. La ville, ceinte d'un rempart de plus de cinq kilomètres, comptait une grande mosquée et de très nombreuses écoles coraniques. Conquise en 1862 par El Hadj Oumar Tall, elle fut ensuite ruinée. La cité historique est classée au patrimoine national et figure sur la liste indicative du Mali pour l'UNESCO ; le mausolée de Sékou Amadou a été endommagé par des groupes armés pendant le conflit.",
        tips: `${AVERT} La région du centre du Mali est touchée par les violences armées.`,
        visitMinutes: 60,
        lat: 14.3311,
        lng: -4.0958,
        en: {
          name: "Hamdallahi",
          summary: "Remains of the capital of the Fulani empire of Macina, founded in 1818.",
          description:
            "Some forty kilometres south of Mopti, Hamdallahi (“praise be to God”) was founded in 1818 by Sékou Amadou as the capital of the Fulani empire of Macina. Enclosed by a rampart over five kilometres long, the city had a great mosque and a great many Koranic schools. Conquered in 1862 by El Hadj Umar Tall, it was later ruined. The historic city is listed as national heritage and is on Mali's UNESCO Tentative List; the mausoleum of Sékou Amadou was damaged by armed groups during the conflict.",
          tips: `${AVERT_EN} Central Mali is affected by armed violence.`,
        },
      },
    ],
  },
  {
    slug: "kayes",
    name: "Kayes",
    region: "Kayes",
    summary: "Ancienne capitale coloniale sur le fleuve Sénégal, porte du fort de Médine et des chutes.",
    description:
      "À l'ouest du pays, sur le fleuve Sénégal, Kayes fut à la fin du XIXe siècle le chef-lieu de la colonie du Soudan français, avant le transfert de la capitale à Bamako au début du XXe siècle. Elle est le point de départ vers le fort de Médine, témoin des débuts de la colonisation, et vers les chutes du Félou et de Gouina, où le fleuve franchit des seuils rocheux. Comme le reste du pays, la région est à ce jour formellement déconseillée aux voyageurs.",
    lat: 14.4497,
    lng: -11.4368,
    cover: "/images/voyage/kayes",
    en: {
      region: "Kayes",
      summary: "A former colonial capital on the Senegal river, gateway to Fort Médine and the falls.",
      description:
        "In the west of the country, on the Senegal river, Kayes was the seat of the colony of French Sudan in the late 19th century, before the capital moved to Bamako in the early 20th century. It is the starting point for Fort Médine, a witness to the beginnings of colonisation, and for the Félou and Gouina falls, where the river crosses rocky sills. Like the rest of the country, the region is currently formally advised against for travellers.",
    },
    places: [
      {
        slug: "fort-de-medine",
        category: "HISTORY",
        name: "Fort de Médine",
        summary: "Fort colonial de 1855, assiégé 97 jours en 1857 par El Hadj Oumar Tall.",
        description:
          "À une douzaine de kilomètres de Kayes, sur la rive gauche du Sénégal, Médine fut la capitale du royaume du Khasso. En 1855, le gouverneur Faidherbe y fit construire un fort avec l'accord du roi Diouka Sambala ; en 1857, El Hadj Oumar Tall l'assiégea pendant 97 jours, jusqu'à l'arrivée des troupes françaises. Médine devint ensuite chef-lieu de cercle avant d'être éclipsée par Kayes. Le fort figure sur la liste indicative du Mali pour le patrimoine mondial de l'UNESCO.",
        tips: `${AVERT} Les murs sont fragiles : ne montez pas sur les ruines.`,
        visitMinutes: 90,
        lat: 14.3761,
        lng: -11.3683,
        cover: "/images/voyage/lieu-fort-de-medine",
        en: {
          name: "Fort Médine",
          summary: "An 1855 colonial fort, besieged for 97 days in 1857 by El Hadj Umar Tall.",
          description:
            "About twelve kilometres from Kayes, on the left bank of the Senegal, Médine was the capital of the kingdom of Khasso. In 1855 Governor Faidherbe had a fort built there with the agreement of King Diouka Sambala; in 1857 El Hadj Umar Tall besieged it for 97 days, until French troops arrived. Médine then became a district seat before being eclipsed by Kayes. The fort is on Mali's UNESCO World Heritage Tentative List.",
          tips: `${AVERT_EN} The walls are fragile: do not climb on the ruins.`,
        },
      },
      {
        slug: "chutes-du-felou",
        category: "NATURE",
        name: "Chutes du Félou",
        summary: "Rapides et rochers sculptés par le fleuve Sénégal, à 16 km de Kayes.",
        description:
          "À environ 16 kilomètres au sud-est de Kayes, le fleuve Sénégal, large de plus d'un kilomètre en amont, se resserre et descend d'environ 14 mètres à travers un chaos de roches polies par l'eau. Le débit varie énormément : quelques mètres cubes par seconde en fin de saison sèche, plusieurs milliers au plus fort de la crue, en octobre. Une centrale hydroélectrique est installée au bord d'un canal de dérivation.",
        tips: `${AVERT} Ne vous baignez pas près des rapides : le courant est dangereux, surtout en crue.`,
        bestPeriod: "Septembre à novembre, quand le fleuve est haut",
        visitMinutes: 120,
        lat: 14.3564,
        lng: -11.3453,
        cover: "/images/voyage/lieu-chutes-du-felou",
        en: {
          name: "Félou Falls",
          summary: "Rapids and water-sculpted rocks on the Senegal river, 16 km from Kayes.",
          description:
            "About 16 kilometres south-east of Kayes, the Senegal river, more than a kilometre wide upstream, narrows and drops some 14 metres through a jumble of water-polished rocks. The flow varies enormously: a few cubic metres per second at the end of the dry season, several thousand at the height of the flood in October. A hydroelectric plant stands beside a diversion canal.",
          tips: `${AVERT_EN} Do not swim near the rapids: the current is dangerous, especially in flood.`,
          bestPeriod: "September to November, when the river is high",
        },
      },
      {
        slug: "chutes-de-gouina",
        category: "NATURE",
        name: "Chutes de Gouina",
        summary: "Large rideau d'eau du fleuve Sénégal, à 80 km de Kayes.",
        description:
          "À environ 80 kilomètres au sud-est de Kayes, en direction de Bafoulabé, le fleuve Sénégal, large de plusieurs centaines de mètres, tombe de plus d'une quinzaine de mètres en un large rideau d'eau. L'Organisation pour la mise en valeur du fleuve Sénégal (OMVS) y a engagé fin 2013 la construction d'un barrage hydroélectrique, qui modifie le site.",
        tips: `${AVERT} Le site est isolé : renseignez-vous sur l'état de la piste et l'accès au chantier du barrage.`,
        bestPeriod: "Septembre à novembre, quand le fleuve est haut",
        visitMinutes: 120,
        lat: 14.015,
        lng: -11.1025,
        cover: "/images/voyage/lieu-chutes-de-gouina",
        en: {
          name: "Gouina Falls",
          summary: "A broad curtain of water on the Senegal river, 80 km from Kayes.",
          description:
            "About 80 kilometres south-east of Kayes, towards Bafoulabé, the Senegal river, several hundred metres wide, drops more than fifteen metres in a broad curtain of water. The Senegal River Basin Development Organisation (OMVS) began building a hydroelectric dam there at the end of 2013, which alters the site.",
          tips: `${AVERT_EN} The site is remote: check the state of the track and access around the dam works.`,
          bestPeriod: "September to November, when the river is high",
        },
      },
    ],
  },
  {
    slug: "sikasso",
    name: "Sikasso",
    region: "Sikasso",
    summary: "Capitale du royaume du Kénédougou, au cœur du sud verdoyant.",
    description:
      "Dans le sud du pays, plus arrosé et plus vert, Sikasso fut la capitale du royaume du Kénédougou. Ses rois Tiéba puis Babemba Traoré l'entourèrent d'une puissante muraille, le tata, qui résista au siège de Samory Touré avant la prise de la ville par les troupes coloniales françaises en 1898. Aujourd'hui l'une des villes les plus peuplées du pays, elle est aussi un grand marché agricole de fruits et de légumes. Comme le reste du pays, la région est à ce jour formellement déconseillée.",
    lat: 11.3167,
    lng: -5.6667,
    cover: "/images/voyage/sikasso",
    en: {
      region: "Sikasso",
      summary: "Capital of the kingdom of Kénédougou, in the heart of the green south.",
      description:
        "In the wetter, greener south of the country, Sikasso was the capital of the kingdom of Kénédougou. Its kings Tiéba and then Babemba Traoré surrounded it with a mighty wall, the tata, which withstood Samori Ture's siege before the town was taken by French colonial troops in 1898. Today one of the country's most populous cities, it is also a major market for fruit and vegetables. Like the rest of the country, the region is currently formally advised against.",
    },
    places: [
      {
        slug: "mamelon-de-sikasso",
        category: "HISTORY",
        name: "Mamelon de Sikasso",
        summary: "Colline artificielle des rois du Kénédougou, au centre de la ville.",
        description:
          "Au cœur de Sikasso, le Mamelon est une colline artificielle d'une trentaine de mètres de haut, élevée dans les années 1880 par le roi Tiéba Traoré pour que les souverains du Kénédougou y siègent. À son sommet se dresse la réplique d'une bâtisse fortifiée à étage qui servait de lieu de travail et de tribunal traditionnel, détruite lors de la prise de la ville par les Français. Du haut, la vue embrasse la ville.",
        tips: `${AVERT} Prévoyez de bonnes chaussures pour la montée.`,
        visitMinutes: 45,
        lat: 11.315,
        lng: -5.6663,
        cover: "/images/voyage/lieu-mamelon-de-sikasso",
        en: {
          name: "Sikasso Mamelon",
          summary: "An artificial hill of the kings of Kénédougou, in the town centre.",
          description:
            "In the heart of Sikasso, the Mamelon is an artificial hill about thirty metres high, raised in the 1880s by King Tiéba Traoré as the seat of the rulers of Kénédougou. On top stands a replica of the two-storey fortified building that served as a workplace and traditional court, destroyed when the French took the town. From the top, the view takes in the whole town.",
          tips: `${AVERT_EN} Wear good shoes for the climb.`,
        },
      },
      {
        slug: "tata-de-sikasso",
        category: "HISTORY",
        name: "Tata de Sikasso",
        summary: "Vestiges des murailles en terre du royaume du Kénédougou (fin du XIXe siècle).",
        description:
          "Construit entre 1877 et 1897 sous les règnes de Tiéba puis de Babemba Traoré pour résister aux attaques de Samory Touré, le tata de Sikasso comptait à son apogée trois enceintes, dont une muraille extérieure d'environ 9 kilomètres, épaisse de 6 mètres à la base et haute de 4 à 6 mètres. Des pans de murs subsistent dans plusieurs quartiers de la ville, comme Mancourani, Médine ou Wayerma. Le tata figure sur la liste indicative du Mali pour le patrimoine mondial de l'UNESCO.",
        tips: `${AVERT} Les vestiges sont dispersés dans la ville : un guide local aide à les trouver.`,
        visitMinutes: 90,
        lat: 11.3182,
        lng: -5.6819,
        en: {
          name: "Tata of Sikasso",
          summary: "Remains of the earthen walls of the kingdom of Kénédougou (late 19th century).",
          description:
            "Built between 1877 and 1897 under Tiéba and then Babemba Traoré to resist Samori Ture's attacks, the tata of Sikasso had three enclosures at its height, including an outer wall about 9 kilometres long, 6 metres thick at the base and 4 to 6 metres high. Sections of wall survive in several districts of the town, such as Mancourani, Médine and Wayerma. The tata is on Mali's UNESCO World Heritage Tentative List.",
          tips: `${AVERT_EN} The remains are scattered around town: a local guide helps to find them.`,
        },
      },
      {
        slug: "grottes-de-missirikoro",
        category: "RELIGION",
        name: "Grottes de Missirikoro",
        summary: "Rocher creusé de grottes, à la fois mosquée et lieu de culte traditionnel.",
        description:
          "À une dizaine de kilomètres au sud-ouest de Sikasso, près du village du même nom, Missirikoro est un monticule de grès d'environ 80 mètres de haut creusé de grottes. Le lieu est à la fois une mosquée et un lieu de culte animiste, d'où son nom qui signifie « vieille mosquée » en bambara. Les grottes abritent plusieurs espèces de chauves-souris.",
        tips: `${AVERT} Lieu de culte : tenue correcte, demandez l'autorisation avant d'entrer ou de photographier.`,
        visitMinutes: 90,
        lat: 11.2669,
        lng: -5.7501,
        en: {
          name: "Missirikoro caves",
          summary: "A cave-riddled rock that is both a mosque and a traditional place of worship.",
          description:
            "About ten kilometres south-west of Sikasso, near the village of the same name, Missirikoro is a sandstone mound some 80 metres high riddled with caves. The site is both a mosque and an animist place of worship, hence its name, which means “old mosque” in Bambara. The caves are home to several species of bats.",
          tips: `${AVERT_EN} A place of worship: dress appropriately and ask permission before entering or taking photos.`,
        },
      },
    ],
  },
  {
    slug: "hombori",
    name: "Hombori",
    region: "Douentza",
    summary: "Tables et aiguilles de grès dominant la plaine du Gourma, avec le point culminant du Mali.",
    description:
      "Sur la route entre Mopti et Gao, le bourg d'Hombori, aux maisons de pierre et aux ruelles étroites, est dominé par les monts Hombori, prolongement de la falaise de Bandiagara. Le Hombori Tondo y culmine à environ 1 155 mètres, point le plus haut du pays, et des reliefs voisins comme la Main de Fatma ou les aiguilles de Gami attiraient les grimpeurs. La région du Gourma abrite aussi des éléphants, parmi les derniers du Sahel. Zone formellement déconseillée à ce jour.",
    lat: 15.2833,
    lng: -1.7,
    cover: "/images/voyage/hombori",
    en: {
      region: "Douentza",
      summary: "Sandstone mesas and needles above the Gourma plain, including Mali's highest point.",
      description:
        "On the road between Mopti and Gao, the small town of Hombori, with its stone houses and narrow alleys, lies below the Hombori mountains, an extension of the Bandiagara escarpment. Hombori Tondo rises to about 1,155 metres there, the country's highest point, and nearby formations such as the Hand of Fatima and the Gami needles used to draw climbers. The Gourma region is also home to elephants, among the last in the Sahel. The area is currently formally advised against.",
    },
    places: [
      {
        slug: "hombori-tondo",
        category: "NATURE",
        name: "Hombori Tondo",
        summary: "Table de grès aux parois verticales, point culminant du Mali.",
        description:
          "Haute d'environ 1 155 mètres, cette table de grès aux falaises abruptes domine le bourg d'Hombori et la plaine du Gourma : c'est le point culminant du Mali. Les monts Hombori sont aussi un site archéologique, dont plusieurs grottes auraient été habitées il y a environ deux mille ans.",
        tips: `${AVERT} Zone formellement déconseillée : ne pas s'y rendre tant que les sources officielles le déconseillent.`,
        visitMinutes: 240,
        lat: 15.2572,
        lng: -1.6689,
        cover: "/images/voyage/lieu-hombori-tondo",
        en: {
          summary: "A sheer-sided sandstone mesa, Mali's highest point.",
          description:
            "Rising to about 1,155 metres, this sandstone mesa with sheer cliffs towers over the small town of Hombori and the Gourma plain: it is Mali's highest point. The Hombori mountains are also an archaeological site, where several caves are thought to have been inhabited some two thousand years ago.",
          tips: `${AVERT_EN} A formally advised-against area: do not go there while official sources advise against it.`,
        },
      },
      {
        slug: "main-de-fatma-hombori",
        category: "NATURE",
        name: "Main de Fatma",
        summary: "Pitons de grès dressés au-dessus de la plaine, comme les doigts d'une main.",
        description:
          "Près d'Hombori, en bordure de la route nationale vers Gao, un massif de grès se découpe en plusieurs pitons qui évoquent les doigts d'une main : c'est la « Main de Fatma ». Visible de très loin dans la plaine du Gourma, ce relief spectaculaire était l'un des hauts lieux de l'escalade en Afrique de l'Ouest et reste l'une des images emblématiques du Sahel malien.",
        tips: `${AVERT} Zone formellement déconseillée : ne pas s'y rendre tant que les sources officielles le déconseillent.`,
        visitMinutes: 120,
        cover: "/images/voyage/lieu-main-de-fatma-hombori",
        en: {
          name: "Hand of Fatima",
          summary: "Sandstone pinnacles rising above the plain like the fingers of a hand.",
          description:
            "Near Hombori, beside the main road to Gao, a sandstone massif splits into several pinnacles that look like the fingers of a hand: the “Hand of Fatima”. Visible from far across the Gourma plain, this spectacular formation was one of West Africa's great climbing sites and remains one of the iconic images of the Malian Sahel.",
          tips: `${AVERT_EN} A formally advised-against area: do not go there while official sources advise against it.`,
        },
      },
    ],
  },
];

/**
 * Aucun circuit : l'ensemble du pays est formellement déconseillé par
 * France Diplomatie et le FCDO à la date de rédaction (octobre 2026).
 */
export const MALI_CIRCUITS: SeedCircuit[] = [];
