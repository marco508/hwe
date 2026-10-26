/**
 * Contenu de départ du guide Niger (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 *
 * Sécurité : en octobre 2026, France Diplomatie et le FCDO britannique
 * déconseillent formellement tout voyage au Niger. Ce guide est donc un guide
 * « patrimoine » sans circuit, pour préparer un voyage quand les conditions le
 * permettront ; chaque lieu le rappelle dans `tips`.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

const TIP_FR =
  "Les autorités française et britannique déconseillent actuellement formellement tout voyage au Niger : consultez leurs conseils aux voyageurs avant d'envisager une visite.";
const TIP_EN =
  "French and British authorities currently advise against all travel to Niger: check their travel advice before considering a visit.";

export const NIGER_GUIDE: SeedGuide = {
  country: "NE",
  intro:
    "Les autorités française et britannique déconseillent aujourd'hui formellement tout voyage au Niger : ce guide présente son patrimoine pour préparer un voyage le jour où les conditions le permettront. Car le pays a beaucoup à offrir : la vieille ville en banco d'Agadez et son minaret, les montagnes de l'Aïr et les dunes du Ténéré, les dernières girafes d'Afrique de l'Ouest, les palais des sultans de Zinder et le fleuve Niger qui traverse Niamey.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; les conditions dépendent de la nationalité et ont changé à plusieurs reprises ces dernières années, notamment depuis le retrait du Niger de la CEDEAO. Renseignez-vous auprès d'une ambassade ou d'un consulat du Niger et vérifiez les conditions à jour auprès des sources officielles : passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays, surtout pendant et après la saison des pluies : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif et protégez-vous des moustiques. Le pays se trouve dans la « ceinture de la méningite » : la vaccination est souvent recommandée. Les fortes chaleurs exigent de boire beaucoup d'eau en bouteille. Les structures de soins sont limitées hors de Niamey.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les espèces sont indispensables : les cartes bancaires ne sont acceptées que dans quelques grands hôtels de Niamey et les distributeurs sont rares hors de la capitale. Le paiement mobile (mobile money) se développe.",
    },
    {
      title: "Quand partir",
      body: "La saison sèche et relativement fraîche, de novembre à février, est la plus agréable, avec l'harmattan (vent sec et poussiéreux) et des nuits froides dans le désert. De mars à mai, la chaleur devient extrême (souvent plus de 40 °C). La saison des pluies va environ de juin à septembre ; elle reverdit le Sahel et s'achève, au nord, par les grands rassemblements d'éleveurs de la Cure salée.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue de l'administration et des affaires ; le haoussa et le zarma (djerma) sont les langues les plus parlées, aux côtés du tamasheq (touareg), du peul (fulfulde) et du kanouri, entre autres. La grande majorité de la population est musulmane : tenue couvrante, discrétion pendant le ramadan, chaussures retirées avant d'entrer dans une mosquée (avec autorisation). Saluer longuement avant toute demande est essentiel. Le thé à la menthe, servi en trois verres, accompagne toute rencontre. Demandez toujours avant de photographier une personne ; la photographie de bâtiments officiels et militaires est interdite.",
    },
    {
      title: "Se déplacer",
      body: "Dans le contexte sécuritaire actuel, les sources officielles déconseillent formellement les déplacements dans le pays, y compris sur les routes autour de Niamey ; ce guide ne propose donc ni circuit ni itinéraire. Les liaisons aériennes internationales peuvent être interrompues ou modifiées sans préavis. Le moment venu, informez-vous auprès des autorités de votre pays et d'agences locales reconnues avant tout déplacement.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C, D, E et F. Les coupures sont fréquentes. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile, dont la couverture est faible ou inexistante dans le désert.",
    },
    {
      title: "Sécurité",
      body: "À la date de rédaction (octobre 2026), France Diplomatie (« Conseils aux voyageurs ») et le FCDO britannique (« Foreign travel advice ») déconseillent formellement tout voyage au Niger, quel que soit le motif, y compris à Niamey. Ils évoquent un risque terroriste élevé dans tout le pays, un risque d'enlèvement de ressortissants étrangers, une situation politique instable depuis le coup d'État de juillet 2023 et une assistance consulaire très limitée, voire impossible sur place. Voyager contre ces avis peut aussi invalider votre assurance. Consultez ces sources (et celles de votre propre pays) avant toute décision ; elles sont mises à jour régulièrement.",
    },
  ],
  en: {
    intro:
      "French and British authorities currently advise against all travel to Niger: this guide presents the country's heritage to help you prepare a trip for the day conditions allow. And Niger has a great deal to offer: the mud-brick old town of Agadez and its minaret, the Aïr mountains and the Ténéré dunes, West Africa's last giraffes, the sultans' palaces of Zinder and the Niger River flowing through Niamey.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa; requirements depend on nationality and have changed several times in recent years, notably since Niger left ECOWAS. Ask a Nigerien embassy or consulate and check current requirements with official sources: passport valid for several months after your return, return ticket, accommodation address.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country, especially during and after the rainy season: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes. The country lies in the “meningitis belt”: vaccination is often recommended. The intense heat means drinking plenty of bottled water. Healthcare facilities are limited outside Niamey.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). Cash is essential: bank cards are only accepted in a few large hotels in Niamey and cash machines are rare outside the capital. Mobile money is growing.",
      },
      {
        title: "When to go",
        body: "The dry, relatively cool season from November to February is the most pleasant, with the harmattan (a dry, dusty wind) and cold nights in the desert. From March to May the heat becomes extreme (often above 40 °C). The rainy season runs roughly from June to September; it turns the Sahel green and ends, in the north, with the great herders' gatherings of the Cure Salée.",
      },
      {
        title: "Languages and customs",
        body: "French is the language of government and business; Hausa and Zarma (Djerma) are the most widely spoken languages, alongside Tamasheq (Tuareg), Fulfulde (Fula) and Kanuri, among others. The great majority of the population is Muslim: wear covering clothes, be discreet during Ramadan, and remove your shoes before entering a mosque (with permission). Greeting people at length before asking anything is essential. Mint tea, served in three glasses, accompanies every meeting. Always ask before photographing a person; photographing official and military buildings is forbidden.",
      },
      {
        title: "Getting around",
        body: "Given the current security situation, official sources advise against all travel within the country, including on the roads around Niamey; this guide therefore offers no tours or itineraries. International flights may be suspended or changed without notice. When the time comes, seek information from your own country's authorities and from established local agencies before any journey.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C, D, E and F plugs. Power cuts are frequent. A local SIM card (ID required) gives access to mobile internet, with weak or no coverage in the desert.",
      },
      {
        title: "Safety and security",
        body: "At the time of writing (October 2026), France Diplomatie (“Conseils aux voyageurs”) and the UK FCDO (“Foreign travel advice”) advise against all travel to Niger, for any reason, including Niamey. They cite a high terrorism risk throughout the country, a risk of kidnapping of foreign nationals, an unstable political situation since the July 2023 coup, and very limited — or no — consular assistance on the ground. Travelling against this advice may also invalidate your insurance. Check these sources (and your own country's) before making any decision; they are updated regularly.",
      },
    ],
  },
};

export const NIGER_DESTINATIONS: SeedDestination[] = [
  {
    slug: "niamey",
    name: "Niamey",
    region: "Niamey",
    summary: "Capitale posée sur les rives du fleuve Niger : grand musée en plein air, marchés et cuisine sahélienne.",
    description:
      "Capitale du pays depuis 1926, Niamey s'étire le long du fleuve Niger. Son musée national, à la fois musée, jardin, zoo et village d'artisans, est l'une des institutions culturelles majeures du Sahel ; ses marchés et ses berges, où l'on voit passer pirogues et jardiniers, résument la vie quotidienne nigérienne. Comme le reste du pays, la ville fait aujourd'hui l'objet d'un avis formellement défavorable des autorités française et britannique.",
    lat: 13.5116,
    lng: 2.1254,
    cover: "/images/voyage/niamey",
    en: {
      region: "Niamey",
      summary: "A laid-back capital on the banks of the Niger River: a large open-air museum, markets and Sahelian food.",
      description:
        "The country's capital since 1926, Niamey stretches along the Niger River. Its national museum — museum, garden, zoo and artisans' village all in one — is one of the Sahel's leading cultural institutions; its markets and riverbanks, where pirogues and market gardeners go about their day, sum up everyday life in Niger. Like the rest of the country, the city is currently covered by French and British advice against all travel.",
    },
    places: [
      {
        slug: "musee-national-boubou-hama",
        category: "MUSEUM",
        name: "Musée national Boubou Hama",
        summary: "Musée en plein air : pavillons thématiques, habitats traditionnels, fossiles de dinosaures et artisans.",
        description:
          "Fondé à la fin des années 1950, le musée national porte le nom de l'homme politique et écrivain Boubou Hama. Dans un vaste parc, des pavillons présentent costumes, instruments, armes et objets des différents peuples du pays, des reconstitutions d'habitats traditionnels, des fossiles de dinosaures découverts dans le désert et les restes de l'Arbre du Ténéré, l'acacia solitaire devenu légendaire. Un petit zoo et un centre artisanal complètent la visite.",
        tips: TIP_FR,
        visitMinutes: 150,
        en: {
          name: "Boubou Hama National Museum",
          summary: "Open-air museum: themed pavilions, traditional dwellings, dinosaur fossils and craftspeople.",
          description:
            "Founded in the late 1950s, the national museum is named after the politician and writer Boubou Hama. In a large park, pavilions display costumes, instruments, weapons and objects of the country's different peoples, reconstructions of traditional dwellings, dinosaur fossils found in the desert and the remains of the Tree of Ténéré, the solitary acacia that became a legend. A small zoo and a crafts centre round off the visit.",
          tips: TIP_EN,
        },
      },
      {
        slug: "grand-marche-niamey",
        category: "MARKET",
        name: "Grand marché de Niamey",
        summary: "Le principal marché de la capitale : tissus, épices, cuirs, poteries et produits du Sahel.",
        description:
          "Au cœur de la ville, le grand marché rassemble des centaines d'étals : pagnes et basins, épices, cuirs travaillés, poteries, vannerie, bijoux et produits venus de tout le pays. Une immersion dans le commerce sahélien, où se croisent haoussa, zarma, touareg et peul.",
        tips: TIP_FR,
        visitMinutes: 90,
        en: {
          name: "Niamey Grand Market",
          summary: "The capital's main market: fabrics, spices, leatherwork, pottery and Sahelian produce.",
          description:
            "In the heart of the city, the grand market brings together hundreds of stalls: wax prints and basin cloth, spices, worked leather, pottery, basketry, jewellery and goods from all over the country. An immersion in Sahelian trade, where Hausa, Zarma, Tuareg and Fula traders meet.",
          tips: TIP_EN,
        },
      },
      {
        slug: "grande-mosquee-niamey",
        category: "RELIGION",
        name: "Grande mosquée de Niamey",
        summary: "La principale mosquée de la capitale, reconnaissable à sa coupole verte et à son haut minaret.",
        description:
          "Principal lieu de culte de la ville, la grande mosquée réunit les fidèles lors de la grande prière du vendredi et des fêtes religieuses. Sa coupole verte et son minaret se repèrent de loin dans le paysage de la capitale.",
        tips: `Lieu de prière : visite uniquement avec autorisation, en tenue couvrante. ${TIP_FR}`,
        visitMinutes: 45,
        en: {
          name: "Niamey Grand Mosque",
          summary: "The capital's main mosque, recognisable by its green dome and tall minaret.",
          description:
            "The city's main place of worship, the grand mosque brings worshippers together for Friday prayers and religious festivals. Its green dome and minaret stand out from afar on the capital's skyline.",
          tips: `A place of prayer: visit only with permission, in covering clothes. ${TIP_EN}`,
        },
      },
      {
        slug: "fleuve-niger-niamey",
        category: "NATURE",
        name: "Rives du fleuve Niger",
        summary: "Le grand fleuve sahélien, ses pirogues, ses jardins maraîchers et ses couchers de soleil.",
        description:
          "Le fleuve Niger traverse Niamey du nord-ouest au sud-est. Sur ses rives, pêcheurs, piroguiers et maraîchers rythment la journée, et les couchers de soleil sur l'eau comptent parmi les plus belles images de la ville. Des hippopotames vivent dans certains secteurs du fleuve, en amont comme en aval.",
        tips: TIP_FR,
        bestPeriod: "Après la saison des pluies, quand le fleuve est haut (fin d'année)",
        visitMinutes: 90,
        en: {
          name: "Banks of the Niger River",
          summary: "The great Sahelian river, its pirogues, market gardens and sunsets.",
          description:
            "The Niger River crosses Niamey from north-west to south-east. On its banks, fishermen, boatmen and market gardeners set the rhythm of the day, and sunsets over the water are among the city's finest sights. Hippos live in some stretches of the river, both upstream and downstream.",
          tips: TIP_EN,
          bestPeriod: "After the rainy season, when the river is high (end of the year)",
        },
      },
      {
        slug: "cuisine-nigerienne-niamey",
        category: "GASTRONOMY",
        name: "Cuisine nigérienne",
        summary: "Kilichi, brochettes, boule de mil, dambou et thé à la menthe : les saveurs du Sahel.",
        description:
          "La cuisine nigérienne repose sur le mil, le sorgho, le riz et la viande. On y goûte le kilichi (fines lamelles de viande séchée et épicée), les brochettes grillées, la « boule » de mil accompagnée de sauces au gombo ou aux feuilles, le dambou (couscous de mil ou de maïs aux feuilles de moringa) et des boissons comme la fura. Le thé à la menthe, servi en trois verres, conclut le repas.",
        tips: TIP_FR,
        en: {
          name: "Nigerien food",
          summary: "Kilichi, kebabs, millet balls, dambou and mint tea: the flavours of the Sahel.",
          description:
            "Nigerien cooking is based on millet, sorghum, rice and meat. Try kilichi (thin strips of spiced dried meat), grilled kebabs, the millet “boule” served with okra or leaf sauces, dambou (millet or maize couscous with moringa leaves) and drinks such as fura. Mint tea, served in three glasses, ends the meal.",
          tips: TIP_EN,
        },
      },
    ],
  },
  {
    slug: "koure",
    name: "Kouré",
    region: "Tillabéri",
    summary: "Le refuge des dernières girafes d'Afrique de l'Ouest, à une soixantaine de kilomètres de Niamey.",
    description:
      "Dans la brousse autour du village de Kouré, au sud-est de Niamey, vit la dernière population de girafes d'Afrique de l'Ouest (Giraffa camelopardalis peralta). Réduite à une cinquantaine d'individus dans les années 1990, elle a été sauvée grâce à la protection de l'espèce et à l'engagement des villageois, qui cohabitent avec elle sans clôture. La zone se trouve, comme tout le pays, en secteur formellement déconseillé.",
    lat: 13.3167,
    lng: 2.5833,
    cover: "/images/voyage/koure",
    en: {
      region: "Tillabéri",
      summary: "The refuge of West Africa's last giraffes, some sixty kilometres from Niamey.",
      description:
        "In the bush around the village of Kouré, south-east of Niamey, lives the last population of West African giraffes (Giraffa camelopardalis peralta). Reduced to about fifty animals in the 1990s, it was saved thanks to the protection of the species and the commitment of local villagers, who live alongside the giraffes without fences. Like the whole country, the area is covered by advice against all travel.",
    },
    places: [
      {
        slug: "girafes-de-koure",
        category: "NATURE",
        name: "Zone des girafes de Kouré",
        summary: "Observer à pied, en compagnie d'un guide villageois, des girafes en liberté au milieu des champs.",
        description:
          "Les girafes de Kouré vivent librement dans un paysage de brousse et de cultures, partagé avec les villages. Avant la dégradation de la situation sécuritaire, on les approchait à pied avec des guides locaux, une expérience rare. Leur population, en hausse, compte désormais plusieurs centaines d'individus et fait l'objet d'un suivi scientifique.",
        tips: `Zone formellement déconseillée : en 2020, une attaque y a coûté la vie à des visiteurs et à leurs accompagnateurs. ${TIP_FR}`,
        bestPeriod: "Saison sèche (novembre à mai)",
        visitMinutes: 180,
        en: {
          name: "Kouré giraffe zone",
          summary: "Watching free-roaming giraffes among the fields, on foot with a village guide.",
          description:
            "The Kouré giraffes roam freely through a landscape of bush and farmland shared with the villages. Before the security situation deteriorated, visitors approached them on foot with local guides — a rare experience. Their growing population now numbers several hundred animals and is monitored by scientists.",
          tips: `Advised against: in 2020 an attack there killed visitors and the people accompanying them. ${TIP_EN}`,
          bestPeriod: "Dry season (November to May)",
        },
      },
    ],
  },
  {
    slug: "parc-w-niger-pays",
    name: "Parc national du W (Niger)",
    region: "Tillabéri",
    summary: "La partie nigérienne d'un grand ensemble de savanes protégées, partagé avec le Bénin et le Burkina Faso.",
    description:
      "Le parc doit son nom aux méandres en forme de W que dessine le fleuve Niger à sa lisière. Avec les parcs voisins du Bénin et du Burkina Faso, il forme le complexe W-Arly-Pendjari, inscrit au patrimoine mondial de l'UNESCO : savanes, forêts-galeries et zones humides où vivent éléphants, buffles, antilopes, hippopotames et une avifaune très riche. Le secteur est aujourd'hui l'un des plus exposés aux groupes armés et formellement déconseillé.",
    lat: 12.25,
    lng: 2.4167,
    en: {
      name: "W National Park (Niger)",
      region: "Tillabéri",
      summary: "The Nigerien part of a vast protected savannah area shared with Benin and Burkina Faso.",
      description:
        "The park takes its name from the W-shaped meanders the Niger River traces along its edge. Together with neighbouring parks in Benin and Burkina Faso, it forms the W-Arly-Pendjari complex, a UNESCO World Heritage site: savannahs, gallery forests and wetlands home to elephants, buffalo, antelopes, hippos and very rich birdlife. The area is now one of the most exposed to armed groups and is covered by advice against all travel.",
    },
    places: [
      {
        slug: "faune-parc-w-niger-pays",
        category: "NATURE",
        name: "Faune et savanes du W",
        summary: "Éléphants, buffles, antilopes et grands rapaces dans l'une des dernières grandes savanes d'Afrique de l'Ouest.",
        description:
          "Le parc abrite l'une des faunes les plus riches de la région : éléphants, buffles, hippotragues, cobs, phacochères, singes, félins discrets et plusieurs centaines d'espèces d'oiseaux. Avant la dégradation de la situation, il se découvrait en saison sèche, lorsque les animaux se rassemblent près des points d'eau.",
        tips: `Secteur formellement déconseillé, particulièrement exposé aux groupes armés. ${TIP_FR}`,
        bestPeriod: "Saison sèche (décembre à mai)",
        en: {
          name: "W wildlife and savannahs",
          summary: "Elephants, buffalo, antelopes and large raptors in one of West Africa's last great savannahs.",
          description:
            "The park is home to some of the region's richest wildlife: elephants, buffalo, roan antelopes, kobs, warthogs, monkeys, elusive big cats and several hundred bird species. Before the situation deteriorated, it was explored in the dry season, when animals gather near water holes.",
          tips: `Advised against, and particularly exposed to armed groups. ${TIP_EN}`,
          bestPeriod: "Dry season (December to May)",
        },
      },
      {
        slug: "meandres-du-w-niger-pays",
        category: "NATURE",
        name: "Méandres du fleuve Niger",
        summary: "Le fleuve en forme de W qui a donné son nom au parc, bordé de forêts-galeries.",
        description:
          "À la limite du parc, le fleuve Niger décrit une série de méandres serrés en forme de W. Ses rives, couvertes de forêts-galeries, attirent hippopotames, crocodiles et oiseaux d'eau, et offrent des paysages parmi les plus verdoyants du pays.",
        tips: TIP_FR,
        en: {
          name: "Niger River meanders",
          summary: "The W-shaped river that gave the park its name, lined with gallery forests.",
          description:
            "On the edge of the park, the Niger River forms a series of tight W-shaped meanders. Its banks, covered with gallery forest, attract hippos, crocodiles and waterbirds, and offer some of the greenest landscapes in the country.",
          tips: TIP_EN,
        },
      },
    ],
  },
  {
    slug: "agadez",
    name: "Agadez",
    region: "Agadez",
    summary: "La « porte du désert » : vieille ville en banco classée à l'UNESCO et minaret emblématique.",
    description:
      "Carrefour historique des caravanes transsahariennes, Agadez est depuis des siècles le siège du sultanat de l'Aïr et l'une des grandes villes touarègues. Son centre historique, inscrit au patrimoine mondial de l'UNESCO, forme un dédale de ruelles et de maisons en terre crue dominé par le minaret de la grande mosquée. La ville est aussi réputée pour ses bijoutiers et ses artisans du cuir. Elle se trouve en zone formellement déconseillée.",
    lat: 16.9733,
    lng: 7.9911,
    cover: "/images/voyage/agadez",
    en: {
      region: "Agadez",
      summary: "The “gateway to the desert”: a UNESCO-listed mud-brick old town and an iconic minaret.",
      description:
        "A historic crossroads of trans-Saharan caravans, Agadez has for centuries been the seat of the Sultanate of Aïr and one of the great Tuareg towns. Its historic centre, a UNESCO World Heritage site, is a maze of lanes and earthen houses dominated by the minaret of the great mosque. The town is also famous for its silversmiths and leatherworkers. It lies in an area covered by advice against all travel.",
    },
    places: [
      {
        slug: "grande-mosquee-agadez",
        category: "RELIGION",
        name: "Grande mosquée d'Agadez",
        summary: "Son minaret pyramidal en banco, hérissé de pièces de bois, est le symbole de la ville.",
        description:
          "Haut de près de trente mètres, le minaret de la grande mosquée est l'un des plus hauts édifices en terre crue du monde. Sa silhouette pyramidale, hérissée de poutres de bois qui servent d'échafaudage lors des réfections régulières, domine la vieille ville et le paysage du désert alentour.",
        tips: `Lieu de culte : visite uniquement avec autorisation, en tenue couvrante. ${TIP_FR}`,
        visitMinutes: 60,
        en: {
          name: "Great Mosque of Agadez",
          summary: "Its pyramid-shaped mud-brick minaret, bristling with wooden beams, is the town's symbol.",
          description:
            "Almost thirty metres high, the minaret of the great mosque is one of the tallest earthen structures in the world. Its pyramid-shaped silhouette, bristling with wooden beams used as scaffolding during regular re-plastering, towers over the old town and the surrounding desert.",
          tips: `A place of worship: visit only with permission, in covering clothes. ${TIP_EN}`,
        },
      },
      {
        slug: "centre-historique-agadez",
        category: "HISTORY",
        name: "Centre historique d'Agadez",
        summary: "Un dédale de maisons en terre crue, de palais et de ruelles inscrit au patrimoine mondial.",
        description:
          "Organisé en quartiers hérités de l'époque des caravanes, le centre historique conserve son tracé ancien, ses maisons en banco aux façades parfois décorées, le palais du sultan et de nombreuses demeures traditionnelles. Inscrit au patrimoine mondial de l'UNESCO en 2013, il illustre l'architecture de terre sahélienne et le rôle d'Agadez dans le commerce transsaharien.",
        tips: TIP_FR,
        visitMinutes: 120,
        en: {
          name: "Historic centre of Agadez",
          summary: "A World Heritage maze of earthen houses, palaces and narrow lanes.",
          description:
            "Laid out in quarters inherited from the caravan era, the historic centre keeps its old street plan, its mud-brick houses with sometimes decorated façades, the sultan's palace and many traditional homes. Inscribed as a UNESCO World Heritage site in 2013, it showcases Sahelian earthen architecture and Agadez's role in trans-Saharan trade.",
          tips: TIP_EN,
        },
      },
      {
        slug: "artisans-agadez",
        category: "CULTURE",
        name: "Bijoutiers et artisans d'Agadez",
        summary: "Croix d'Agadez en argent, cuirs travaillés et selles de chameau : le savoir-faire touareg.",
        description:
          "Les forgerons-bijoutiers touaregs d'Agadez perpétuent un artisanat réputé dans tout le Sahel, à commencer par la croix d'Agadez, pendentif en argent devenu un emblème. Maroquiniers, fabricants de selles de chameau et de coffres en cuir décorés complètent cet artisanat, longtemps tourné vers les voyageurs.",
        tips: TIP_FR,
        visitMinutes: 90,
        en: {
          name: "Agadez silversmiths and craftspeople",
          summary: "Silver Agadez crosses, worked leather and camel saddles: Tuareg craftsmanship.",
          description:
            "The Tuareg smith-jewellers of Agadez carry on a craft renowned throughout the Sahel, starting with the Agadez cross, a silver pendant that has become an emblem. Leatherworkers and makers of camel saddles and decorated leather boxes complete these crafts, long geared towards travellers.",
          tips: TIP_EN,
        },
      },
    ],
  },
  {
    slug: "air-et-tenere",
    name: "Aïr et Ténéré",
    region: "Agadez",
    summary: "Montagnes volcaniques, oasis, gravures rupestres et océan de dunes au cœur du Sahara.",
    description:
      "Au nord-est d'Agadez, le massif de l'Aïr dresse ses montagnes sombres au-dessus du désert, avec ses vallées, ses oasis et ses gravures rupestres ; à l'est s'étend le Ténéré, l'un des plus grands déserts de sable du Sahara. Les réserves naturelles de l'Aïr et du Ténéré, parmi les plus vastes aires protégées d'Afrique, sont inscrites au patrimoine mondial de l'UNESCO et sur la liste du patrimoine en péril. Région formellement déconseillée.",
    lat: 18.25,
    lng: 8.75,
    en: {
      name: "Aïr and Ténéré",
      region: "Agadez",
      summary: "Volcanic mountains, oases, rock engravings and a sea of dunes in the heart of the Sahara.",
      description:
        "North-east of Agadez, the Aïr massif raises its dark mountains above the desert, with valleys, oases and rock engravings; to the east stretches the Ténéré, one of the largest sand deserts in the Sahara. The Aïr and Ténéré Natural Reserves, among the largest protected areas in Africa, are a UNESCO World Heritage site on the List of World Heritage in Danger. The region is covered by advice against all travel.",
    },
    places: [
      {
        slug: "massif-de-l-air",
        category: "NATURE",
        name: "Massif de l'Aïr",
        summary: "Montagnes volcaniques, vallées verdoyantes et villages-oasis touaregs.",
        description:
          "Le massif de l'Aïr est un ensemble de montagnes et de plateaux d'origine volcanique, entaillé de vallées (koris) où l'eau permet jardins et palmeraies. On y trouve des villages-oasis touaregs, une flore et une faune adaptées au désert et d'innombrables sites de gravures rupestres.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        en: {
          name: "Aïr Mountains",
          summary: "Volcanic mountains, green valleys and Tuareg oasis villages.",
          description:
            "The Aïr massif is a range of mountains and plateaus of volcanic origin, cut by valleys (koris) where water allows gardens and palm groves. It is home to Tuareg oasis villages, desert-adapted plants and wildlife, and countless rock-engraving sites.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
      {
        slug: "desert-du-tenere",
        category: "NATURE",
        name: "Désert du Ténéré",
        summary: "Un océan de sable et de dunes, longtemps traversé par les caravanes de sel.",
        description:
          "Le Ténéré, « le désert » en tamasheq, est une immense étendue de sable et de dunes à l'est de l'Aïr. Il fut longtemps sillonné par les caravanes de dromadaires (azalaï) qui allaient chercher le sel de Bilma. Son arbre solitaire, l'Arbre du Ténéré, était un repère pour les caravaniers ; ses restes sont conservés au musée national de Niamey.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        en: {
          name: "Ténéré Desert",
          summary: "A sea of sand and dunes, long crossed by salt caravans.",
          description:
            "The Ténéré — “the desert” in Tamasheq — is a vast expanse of sand and dunes east of the Aïr. It was long crossed by camel caravans (azalai) fetching salt from Bilma. Its solitary tree, the Tree of Ténéré, was a landmark for caravanners; its remains are kept at the national museum in Niamey.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
      {
        slug: "girafes-de-dabous",
        category: "HISTORY",
        name: "Girafes de Dabous",
        summary: "Deux girafes gravées grandeur nature sur un affleurement rocheux, chef-d'œuvre de l'art rupestre saharien.",
        description:
          "Sur un affleurement de grès en bordure de l'Aïr, deux girafes gravées il y a plusieurs millénaires, dont la plus grande mesure environ six mètres, comptent parmi les plus grandes et les plus belles gravures rupestres connues. Elles témoignent d'une époque où le Sahara était une savane. Une réplique a été réalisée pour faire connaître le site et le protéger.",
        tips: TIP_FR,
        en: {
          name: "Dabous Giraffes",
          summary: "Two life-size giraffes engraved on a rock outcrop, a masterpiece of Saharan rock art.",
          description:
            "On a sandstone outcrop on the edge of the Aïr, two giraffes engraved several thousand years ago — the larger about six metres tall — are among the largest and finest rock engravings known. They bear witness to a time when the Sahara was savannah. A replica was made to raise awareness of the site and protect it.",
          tips: TIP_EN,
        },
      },
      {
        slug: "cure-salee-ingall",
        category: "FESTIVAL",
        name: "Cure salée d'In-Gall",
        summary: "Grand rassemblement annuel des éleveurs touaregs et peuls à la fin de la saison des pluies.",
        description:
          "Chaque année, à la fin de la saison des pluies, les éleveurs touaregs et peuls conduisent leurs troupeaux vers les terres et sources salées de la région d'In-Gall. La Cure salée s'accompagne de festivités : courses de chameaux, musique, danses et, chez les Peuls wodaabé, le Gérewol, célèbre concours de beauté masculine.",
        tips: TIP_FR,
        bestPeriod: "Fin de la saison des pluies (généralement septembre)",
        en: {
          name: "In-Gall Cure Salée",
          summary: "The great annual gathering of Tuareg and Fula herders at the end of the rainy season.",
          description:
            "Every year at the end of the rainy season, Tuareg and Fula herders drive their herds to the salty lands and springs around In-Gall. The Cure Salée (“salt cure”) comes with festivities: camel races, music, dancing and, among the Wodaabe Fula, the Gerewol, a famous male beauty contest.",
          tips: TIP_EN,
          bestPeriod: "End of the rainy season (usually September)",
        },
      },
    ],
  },
  {
    slug: "zinder",
    name: "Zinder",
    region: "Zinder",
    summary: "Ancienne capitale du sultanat du Damagaram : palais du sultan et vieille ville haoussa.",
    description:
      "Deuxième ville du pays, Zinder fut la capitale du sultanat du Damagaram puis la première capitale de la colonie du Niger jusqu'en 1926. Son quartier ancien, le Birni, conserve le palais du sultan et des maisons en banco ornées de décors en relief caractéristiques de l'architecture haoussa. La ville est aussi un grand centre commercial et artisanal (cuir, tannerie). Elle se trouve en zone formellement déconseillée.",
    lat: 13.8053,
    lng: 8.9883,
    cover: "/images/voyage/zinder",
    en: {
      region: "Zinder",
      summary: "Former capital of the Sultanate of Damagaram: the sultan's palace and an old Hausa town.",
      description:
        "The country's second city, Zinder was the capital of the Sultanate of Damagaram and then the first capital of the colony of Niger until 1926. Its old quarter, the Birni, preserves the sultan's palace and mud-brick houses adorned with relief decoration typical of Hausa architecture. The city is also a major trading and crafts centre (leather, tanning). It lies in an area covered by advice against all travel.",
    },
    places: [
      {
        slug: "palais-du-sultan-zinder",
        category: "HISTORY",
        name: "Palais du sultan de Zinder",
        summary: "La résidence des sultans du Damagaram, au cœur du quartier du Birni.",
        description:
          "Le palais du sultan, en terre crue, est le cœur historique et symbolique de Zinder. Résidence des sultans du Damagaram, dont la dynastie existe toujours, il accueille les cérémonies traditionnelles et, lors des grandes fêtes, des défilés de cavaliers en tenue d'apparat.",
        tips: TIP_FR,
        visitMinutes: 60,
        en: {
          name: "Sultan's Palace of Zinder",
          summary: "The residence of the sultans of Damagaram, in the heart of the Birni quarter.",
          description:
            "Built of earth, the sultan's palace is the historic and symbolic heart of Zinder. The residence of the sultans of Damagaram, whose dynasty still exists, it hosts traditional ceremonies and, during major festivals, parades of horsemen in ceremonial dress.",
          tips: TIP_EN,
        },
      },
      {
        slug: "birni-zinder",
        category: "CULTURE",
        name: "Quartier du Birni",
        summary: "La vieille ville haoussa et ses façades en banco ornées de motifs en relief.",
        description:
          "Le Birni, ancienne cité fortifiée, est un ensemble de ruelles et de concessions en terre crue. Beaucoup de façades portent des décors en relief, géométriques ou figuratifs, typiques de l'architecture haoussa, renouvelés au fil des réfections. Une promenade dans l'histoire urbaine du Sahel.",
        tips: TIP_FR,
        visitMinutes: 90,
        en: {
          name: "Birni quarter",
          summary: "The old Hausa town and its mud-brick façades decorated with relief patterns.",
          description:
            "The Birni, the former walled city, is a network of lanes and earthen compounds. Many façades bear geometric or figurative relief decoration typical of Hausa architecture, renewed as walls are re-plastered. A walk through the urban history of the Sahel.",
          tips: TIP_EN,
        },
      },
      {
        slug: "grand-marche-zinder",
        category: "MARKET",
        name: "Grand marché de Zinder",
        summary: "Un grand marché régional où se croisent éleveurs, artisans et commerçants venus du Nigeria voisin.",
        description:
          "Carrefour commercial entre le Sahel et le Nigeria voisin, Zinder abrite un grand marché où l'on trouve bétail, céréales, épices, tissus et surtout les cuirs et maroquineries qui font la réputation de la ville.",
        tips: TIP_FR,
        visitMinutes: 90,
        en: {
          name: "Zinder Grand Market",
          summary: "A large regional market where herders, craftspeople and traders from neighbouring Nigeria meet.",
          description:
            "A trading crossroads between the Sahel and neighbouring Nigeria, Zinder has a large market selling livestock, grain, spices, fabrics and, above all, the leather goods for which the city is known.",
          tips: TIP_EN,
        },
      },
    ],
  },
];

/** Aucun circuit : l'ensemble du pays est formellement déconseillé (octobre 2026). */
export const NIGER_CIRCUITS: SeedCircuit[] = [];
