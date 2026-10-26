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
        lat: 13.5120,
        lng: 2.1082,
        cover: "/images/voyage/lieu-musee-national-boubou-hama",
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
        lat: 13.5164,
        lng: 2.1174,
        cover: "/images/voyage/lieu-grand-marche-niamey",
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
        lat: 13.5221,
        lng: 2.1329,
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
        lat: 13.5053,
        lng: 2.1046,
        cover: "/images/voyage/lieu-fleuve-niger-niamey",
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
        cover: "/images/voyage/lieu-cuisine-nigerienne-niamey",
        en: {
          name: "Nigerien food",
          summary: "Kilichi, kebabs, millet balls, dambou and mint tea: the flavours of the Sahel.",
          description:
            "Nigerien cooking is based on millet, sorghum, rice and meat. Try kilichi (thin strips of spiced dried meat), grilled kebabs, the millet “boule” served with okra or leaf sauces, dambou (millet or maize couscous with moringa leaves) and drinks such as fura. Mint tea, served in three glasses, ends the meal.",
          tips: TIP_EN,
        },
      },
      {
        slug: "cathedrale-niamey",
        category: "RELIGION",
        name: "Cathédrale Notre-Dame-du-Perpétuel-Secours",
        summary: "La cathédrale de Niamey, siège de l'archidiocèse, à l'architecture moderne en béton et grandes croix.",
        description:
          "Principal lieu de culte catholique du pays, la cathédrale Notre-Dame-du-Perpétuel-Secours est le siège de l'archidiocèse de Niamey (diocèse en 1961, archidiocèse en 2007). Son édifice moderne, précédé d'une haute croix, rassemble la communauté chrétienne, minoritaire au Niger, notamment à Noël et à Pâques.",
        tips: `Lieu de culte : tenue correcte et discrétion pendant les offices. ${TIP_FR}`,
        visitMinutes: 30,
        lat: 13.5178,
        lng: 2.1106,
        cover: "/images/voyage/lieu-cathedrale-niamey",
        en: {
          name: "Our Lady of Perpetual Help Cathedral",
          summary: "Niamey's cathedral, seat of the archdiocese, a modern concrete building with tall crosses.",
          description:
            "The country's main Catholic place of worship, Our Lady of Perpetual Help Cathedral is the seat of the Archdiocese of Niamey (a diocese from 1961, an archdiocese since 2007). Its modern building, fronted by a tall cross, brings together Niger's Christian minority, especially at Christmas and Easter.",
          tips: `A place of worship: dress appropriately and be discreet during services. ${TIP_EN}`,
        },
      },
      {
        slug: "centre-culturel-oumarou-ganda",
        category: "CULTURE",
        name: "Centre culturel Oumarou Ganda",
        summary: "Le grand complexe culturel public de Niamey : salle de spectacle, bibliothèque, concerts et projections.",
        description:
          "Baptisé en 1981 en hommage au cinéaste nigérien Oumarou Ganda (Cabascabo, Le Wazzou polygame), ce complexe culturel réunit un espace de spectacle et une bibliothèque. Il accueille concerts, théâtre, projections et manifestations culturelles, et constitue l'un des lieux de sortie culturelle de la capitale.",
        tips: `Programmation annoncée localement (presse, réseaux sociaux). ${TIP_FR}`,
        visitMinutes: 90,
        lat: 13.5212,
        lng: 2.1374,
        cover: "/images/voyage/lieu-centre-culturel-oumarou-ganda",
        en: {
          name: "Oumarou Ganda Cultural Centre",
          summary: "Niamey's large public cultural complex: performance hall, library, concerts and screenings.",
          description:
            "Named in 1981 after the Nigerien filmmaker Oumarou Ganda (Cabascabo, Le Wazzou polygame), this cultural complex combines a performance space and a library. It hosts concerts, theatre, screenings and cultural events, and is one of the capital's cultural venues for a night out.",
          tips: `Programmes are announced locally (press, social media). ${TIP_EN}`,
        },
      },
      {
        slug: "village-artisanal-wadata",
        category: "MARKET",
        name: "Village artisanal de Wadata",
        summary: "Le village des artisans de Niamey : cuir, vannerie, bijoux, tissage, à acheter directement aux créateurs.",
        description:
          "Dans le quartier de Wadata, le village artisanal regroupe des ateliers et boutiques d'artisans : maroquinerie et poufs en cuir, vannerie, bijoux et croix touarègues en argent, tissages, sculptures. On y voit les artisans au travail et l'on achète directement aux créateurs, dans une ambiance plus calme que celle des grands marchés.",
        tips: `Le marchandage est d'usage ; demandez avant de photographier les artisans. ${TIP_FR}`,
        visitMinutes: 90,
        lat: 13.5129,
        lng: 2.1445,
        cover: "/images/voyage/lieu-village-artisanal-wadata",
        en: {
          name: "Wadata Crafts Village",
          summary: "Niamey's crafts village: leather, basketry, jewellery and weaving, bought directly from the makers.",
          description:
            "In the Wadata district, the crafts village brings together artisans' workshops and shops: leather goods and poufs, basketry, silver jewellery and Tuareg crosses, weaving and carvings. You can watch craftspeople at work and buy directly from them, in a calmer atmosphere than the big markets.",
          tips: `Bargaining is customary; ask before photographing craftspeople. ${TIP_EN}`,
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
        lat: 13.3109,
        lng: 2.5756,
        cover: "/images/voyage/lieu-girafes-de-koure",
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
    cover: "/images/voyage/parc-w-niger-pays",
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
        lat: 12.5253,
        lng: 2.6633,
        cover: "/images/voyage/lieu-faune-parc-w-niger-pays",
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
        cover: "/images/voyage/lieu-meandres-du-w-niger-pays",
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
        lat: 16.9742,
        lng: 7.9884,
        cover: "/images/voyage/lieu-grande-mosquee-agadez",
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
        lat: 16.9744,
        lng: 7.9896,
        cover: "/images/voyage/lieu-centre-historique-agadez",
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
        lat: 16.9705,
        lng: 7.9832,
        cover: "/images/voyage/lieu-artisans-agadez",
        en: {
          name: "Agadez silversmiths and craftspeople",
          summary: "Silver Agadez crosses, worked leather and camel saddles: Tuareg craftsmanship.",
          description:
            "The Tuareg smith-jewellers of Agadez carry on a craft renowned throughout the Sahel, starting with the Agadez cross, a silver pendant that has become an emblem. Leatherworkers and makers of camel saddles and decorated leather boxes complete these crafts, long geared towards travellers.",
          tips: TIP_EN,
        },
      },
      {
        slug: "palais-du-sultan-agadez",
        category: "HISTORY",
        name: "Palais du sultan de l'Aïr",
        summary: "La résidence du sultan d'Agadez, gardien des traditions de l'Aïr, au pied de la grande mosquée.",
        description:
          "Au cœur de la vieille ville, à deux pas de la grande mosquée, le palais en banco est la résidence du sultan de l'Aïr, autorité traditionnelle et religieuse toujours respectée. Ses épais murs de terre hérissés de bois rappellent l'architecture du minaret. C'est dans sa cour que se conclut chaque année la fête du Bianou.",
        tips: `Bâtiment habité : on l'admire de l'extérieur, la cour ne se visite qu'avec autorisation. ${TIP_FR}`,
        visitMinutes: 30,
        lat: 16.9749,
        lng: 7.9886,
        cover: "/images/voyage/lieu-palais-du-sultan-agadez",
        en: {
          name: "Palace of the Sultan of Aïr",
          summary: "The residence of the Sultan of Agadez, guardian of Aïr traditions, at the foot of the great mosque.",
          description:
            "In the heart of the old town, a stone's throw from the great mosque, the mud-brick palace is the residence of the Sultan of Aïr, a traditional and religious authority who is still highly respected. Its thick earthen walls bristling with wood echo the architecture of the minaret. The Bianou festival ends in its courtyard every year.",
          tips: `An inhabited building: admire it from outside; the courtyard can only be visited with permission. ${TIP_EN}`,
        },
      },
      {
        slug: "maison-heinrich-barth-agadez",
        category: "HISTORY",
        name: "Maison d'Heinrich Barth",
        summary: "La maison en banco où séjourna en 1850 l'explorateur allemand Heinrich Barth, premier Européen à Agadez.",
        description:
          "En octobre 1850, l'explorateur allemand Heinrich Barth, en route de Tripoli vers Kano, séjourna près d'un mois à Agadez ; une plaque posée en 1966 rappelle qu'il fut le premier Européen à y pénétrer. Sa maison en terre, dans la vieille ville, se visite encore et ses récits restent une source précieuse sur l'histoire de la ville et du Sahel.",
        tips: TIP_FR,
        visitMinutes: 30,
        lat: 16.9737,
        lng: 7.9946,
        cover: "/images/voyage/lieu-maison-heinrich-barth-agadez",
        en: {
          name: "Heinrich Barth's House",
          summary: "The mud-brick house where German explorer Heinrich Barth, the first European in Agadez, stayed in 1850.",
          description:
            "In October 1850 the German explorer Heinrich Barth, travelling from Tripoli to Kano, spent almost a month in Agadez; a plaque put up in 1966 records that he was the first European to enter the town. His earthen house in the old town can still be visited, and his writings remain a valuable source on the history of the town and the Sahel.",
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
    cover: "/images/voyage/air-et-tenere",
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
        lat: 19.0000,
        lng: 8.5000,
        cover: "/images/voyage/lieu-massif-de-l-air",
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
        lat: 20.0000,
        lng: 12.0000,
        cover: "/images/voyage/lieu-desert-du-tenere",
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
        lat: 18.0303,
        lng: 7.5806,
        cover: "/images/voyage/lieu-girafes-de-dabous",
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
        bestPeriod: "Fin de la saison des pluies (fin septembre ou début octobre)",
        lat: 16.7862,
        lng: 6.9323,
        cover: "/images/voyage/lieu-cure-salee-ingall",
        en: {
          name: "In-Gall Cure Salée",
          summary: "The great annual gathering of Tuareg and Fula herders at the end of the rainy season.",
          description:
            "Every year at the end of the rainy season, Tuareg and Fula herders drive their herds to the salty lands and springs around In-Gall. The Cure Salée (“salt cure”) comes with festivities: camel races, music, dancing and, among the Wodaabe Fula, the Gerewol, a famous male beauty contest.",
          tips: TIP_EN,
          bestPeriod: "End of the rainy season (late September or early October)",
        },
      },
      {
        slug: "oasis-de-timia",
        category: "NATURE",
        name: "Oasis de Timia",
        summary: "Village-oasis au cœur de l'Aïr : jardins, agrumes et palmiers, guelta et cascade saisonnière.",
        description:
          "À environ 220 km au nord-est d'Agadez, Timia est souvent présentée comme la plus belle oasis de l'Aïr. Ses jardins irrigués produisent légumes, céréales, agrumes et dattes au pied de montagnes sombres. Dans la vallée, une guelta (vasque d'eau permanente) et une cascade qui coule après les pluies, ainsi que le fort Massu construit en 1951, complètent le paysage.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        lat: 18.1148,
        lng: 8.7792,
        cover: "/images/voyage/lieu-oasis-de-timia",
        en: {
          name: "Timia Oasis",
          summary: "An oasis village in the heart of the Aïr: gardens, citrus and palms, a guelta and a seasonal waterfall.",
          description:
            "About 220 km north-east of Agadez, Timia is often described as the most beautiful oasis in the Aïr. Its irrigated gardens grow vegetables, cereals, citrus fruit and dates beneath dark mountains. In the valley, a guelta (permanent pool) and a waterfall that flows after the rains, as well as Fort Massu built in 1951, complete the scene.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
      {
        slug: "iferouane",
        category: "CULTURE",
        name: "Iférouane",
        summary: "Oasis touarègue du nord de l'Aïr, au pied des Montagnes Bleues, berceau du Festival de l'Aïr.",
        description:
          "Dans la vallée de l'Ighazar, au nord du massif, Iférouane est une oasis de jardins et de palmiers longtemps restée un foyer majeur de la culture touarègue. Elle est connue pour le Festival de l'Aïr, organisé depuis 2001, et pour les paysages qui l'entourent : les Montagnes Bleues aux roches marbrées, le mont Tamgak et de nombreux sites de gravures rupestres.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        lat: 19.0643,
        lng: 8.4102,
        cover: "/images/voyage/lieu-iferouane",
        en: {
          name: "Iférouane",
          summary: "A Tuareg oasis in the northern Aïr, below the Blue Mountains, home of the Aïr Festival.",
          description:
            "In the Ighazar valley north of the massif, Iférouane is an oasis of gardens and palms that long remained a major centre of Tuareg culture. It is known for the Aïr Festival, held since 2001, and for the surrounding landscapes: the marbled rocks of the Blue Mountains, Mount Tamgak and many rock-engraving sites.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
      {
        slug: "monument-arbre-du-tenere",
        category: "HISTORY",
        name: "Monument de l'Arbre du Ténéré",
        summary: "Une sculpture de métal marque, en plein désert, l'emplacement de l'acacia solitaire disparu en 1973.",
        description:
          "Pendant des siècles, un acacia isolé, dont les racines atteignaient la nappe à plus de 30 mètres, servit de repère aux caravanes traversant le Ténéré, à quelque 235 km au nord-est d'Agadez. Renversé par un camion en 1973, il fut transporté au musée national de Niamey ; un arbre stylisé en métal, installé en 1975, marque depuis son emplacement près d'un puits, comme un phare au milieu du sable.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        lat: 17.7442,
        lng: 10.0826,
        cover: "/images/voyage/lieu-monument-arbre-du-tenere",
        en: {
          name: "Tree of Ténéré Monument",
          summary: "A metal sculpture marks the desert site of the solitary acacia that disappeared in 1973.",
          description:
            "For centuries an isolated acacia, whose roots reached groundwater more than 30 metres down, served as a landmark for caravans crossing the Ténéré, some 235 km north-east of Agadez. Knocked down by a truck in 1973, it was taken to the national museum in Niamey; since 1975 a stylised metal tree has marked the spot near a well, like a lighthouse in a sea of sand.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
      {
        slug: "ruines-d-assode",
        category: "HISTORY",
        name: "Ruines d'Assodé",
        summary: "Les vestiges en pierre de l'ancienne capitale des Touaregs de l'Aïr, au cœur du massif.",
        description:
          "Fondée selon la tradition vers la fin du IXe siècle, Assodé fut sans doute la première capitale des Touaregs de l'Aïr avant que le pouvoir ne se déplace vers Agadez. Ses habitants l'ont progressivement abandonnée ; il en reste un ensemble de maisons en pierre volcanique et une mosquée rectangulaire d'une trentaine de mètres. Un puits pastoral voisin attire toujours dromadaires et ânes des éleveurs.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        lat: 18.4552,
        lng: 8.6011,
        cover: "/images/voyage/lieu-ruines-d-assode",
        en: {
          name: "Ruins of Assodé",
          summary: "The stone remains of the former capital of the Aïr Tuareg, in the heart of the massif.",
          description:
            "Founded, according to tradition, towards the end of the 9th century, Assodé was probably the first capital of the Aïr Tuareg before power moved to Agadez. Its inhabitants gradually abandoned it; what remains is a group of houses built of volcanic stone and a rectangular mosque about thirty metres long. A nearby pastoral well still draws herders' camels and donkeys.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
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
        lat: 13.7939,
        lng: 9.0020,
        cover: "/images/voyage/lieu-palais-du-sultan-zinder",
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
        lat: 13.7941,
        lng: 9.0013,
        cover: "/images/voyage/lieu-birni-zinder",
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
        lat: 13.8082,
        lng: 8.9940,
        cover: "/images/voyage/lieu-grand-marche-zinder",
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
  {
    slug: "dosso",
    name: "Dosso",
    region: "Dosso",
    summary: "Capitale historique du royaume zarma : palais du Zarmakoye, musée régional et tradition de la lutte.",
    description:
      "À environ 140 km au sud-est de Niamey, Dosso fut la capitale du royaume zarma fondé au XVIIIe siècle, dont la dynastie des Zarmakoye (ou Djermakoye) règne toujours sur le plan coutumier. La ville conserve le palais du Zarmakoye, bâti en 1904 et inscrit avec d'autres sites sur la liste indicative du Niger au patrimoine mondial, un musée régional et une arène de lutte traditionnelle. Comme tout le pays, elle se trouve en zone formellement déconseillée.",
    lat: 13.0485,
    lng: 3.1952,
    cover: "/images/voyage/dosso",
    en: {
      region: "Dosso",
      summary: "Historic capital of the Zarma kingdom: the Zarmakoye's palace, a regional museum and a wrestling tradition.",
      description:
        "Some 140 km south-east of Niamey, Dosso was the capital of the Zarma kingdom founded in the 18th century, whose Zarmakoye (or Djermakoye) dynasty still reigns as a customary authority. The town preserves the Zarmakoye's palace, built in 1904 and included with other sites on Niger's World Heritage Tentative List, a regional museum and a traditional wrestling arena. Like the whole country, it is covered by advice against all travel.",
    },
    places: [
      {
        slug: "palais-du-zarmakoye-dosso",
        category: "HISTORY",
        name: "Palais du Zarmakoye",
        summary: "Le palais des souverains zarma de Dosso, aux façades blanches ornées de motifs bleus.",
        description:
          "Construit en 1904, le palais est la résidence du Zarmakoye, chef traditionnel de Dosso. Ses longues façades aux décors géométriques, son portail monumental et sa fada (salle d'audience) témoignent de l'architecture des cours royales du Sahel. Il figure sur la liste indicative du Niger au patrimoine mondial de l'UNESCO et reste le cadre des grandes cérémonies coutumières.",
        tips: `Résidence habitée : la visite de l'intérieur nécessite l'autorisation de la chefferie. ${TIP_FR}`,
        visitMinutes: 45,
        lat: 13.0477,
        lng: 3.1969,
        cover: "/images/voyage/lieu-palais-du-zarmakoye-dosso",
        en: {
          name: "Zarmakoye's Palace",
          summary: "The palace of the Zarma rulers of Dosso, its white façades decorated with blue patterns.",
          description:
            "Built in 1904, the palace is the residence of the Zarmakoye, the traditional ruler of Dosso. Its long façades with geometric decoration, its monumental gateway and its fada (audience hall) illustrate the architecture of Sahelian royal courts. It is on Niger's UNESCO World Heritage Tentative List and still hosts major customary ceremonies.",
          tips: `An inhabited residence: visiting the interior requires permission from the chieftaincy. ${TIP_EN}`,
        },
      },
      {
        slug: "musee-regional-djermakoye-dosso",
        category: "MUSEUM",
        name: "Musée régional Djermakoye",
        summary: "Le musée de Dosso : histoire du royaume zarma, armes anciennes, instruments et centre artisanal.",
        description:
          "Le musée régional Djermakoye présente l'histoire du royaume de Dosso et de ses souverains : portraits, armes anciennes, instruments de musique de cour comme le kakaki, objets de la vie quotidienne. Son enceinte abrite aussi un centre artisanal où l'on trouve tissages, cuirs et poteries de la région.",
        tips: TIP_FR,
        visitMinutes: 60,
        lat: 13.0429,
        lng: 3.1992,
        cover: "/images/voyage/lieu-musee-regional-djermakoye-dosso",
        en: {
          name: "Djermakoye Regional Museum",
          summary: "Dosso's museum: history of the Zarma kingdom, old weapons, instruments and a crafts centre.",
          description:
            "The Djermakoye Regional Museum tells the story of the kingdom of Dosso and its rulers: portraits, historic weapons, court instruments such as the kakaki trumpet and everyday objects. Its grounds also include a crafts centre selling weaving, leatherwork and pottery from the region.",
          tips: TIP_EN,
        },
      },
    ],
  },
  {
    slug: "ayorou",
    name: "Ayorou",
    region: "Tillabéri",
    summary: "Bourgade du fleuve Niger près de la frontière malienne, célèbre pour son grand marché du dimanche.",
    description:
      "À environ 200 km au nord-ouest de Niamey, Ayorou s'étend sur la rive gauche du fleuve Niger et sur une île du même nom. Ancien refuge du souverain songhaï Sonni Baro à la fin du XVe siècle, la ville était connue des voyageurs pour son marché hebdomadaire et pour les paysages du fleuve, où vivent hippopotames et nombreux oiseaux. La zone, proche de la frontière malienne, a connu des attaques meurtrières et se trouve en secteur formellement déconseillé.",
    lat: 14.7346,
    lng: 0.9201,
    cover: "/images/voyage/ayorou",
    en: {
      region: "Tillabéri",
      summary: "A Niger River town near the Malian border, famous for its big Sunday market.",
      description:
        "About 200 km north-west of Niamey, Ayorou spreads along the left bank of the Niger River and onto an island of the same name. A refuge of the Songhai ruler Sonni Baro in the late 15th century, the town was known to travellers for its weekly market and its river scenery, home to hippos and many birds. The area, close to the Malian border, has suffered deadly attacks and is covered by advice against all travel.",
    },
    places: [
      {
        slug: "marche-d-ayorou",
        category: "MARKET",
        name: "Marché d'Ayorou",
        summary: "Le grand marché du dimanche, où convergent pirogues, troupeaux et commerçants de plusieurs pays.",
        description:
          "Le dimanche, le marché envahit une grande partie de la ville et attire des milliers de commerçants et d'éleveurs venus du Niger, du Mali, du Burkina Faso et du Nigeria. Bétail, céréales, poisson du fleuve, nattes, poteries et tissus s'y échangent, tandis que les pirogues amènent marchandises et habitants des îles voisines.",
        tips: `Secteur particulièrement exposé, proche de la frontière malienne. ${TIP_FR}`,
        visitMinutes: 120,
        lat: 14.7346,
        lng: 0.9201,
        cover: "/images/voyage/lieu-marche-d-ayorou",
        en: {
          name: "Ayorou Market",
          summary: "The big Sunday market, where pirogues, herds and traders from several countries converge.",
          description:
            "On Sundays the market spreads across much of the town, drawing thousands of traders and herders from Niger, Mali, Burkina Faso and Nigeria. Livestock, grain, river fish, mats, pottery and fabrics change hands, while pirogues bring goods and people from the neighbouring islands.",
          tips: `A particularly exposed area close to the Malian border. ${TIP_EN}`,
        },
      },
    ],
  },
  {
    slug: "yaama",
    name: "Yaama",
    region: "Tahoua",
    summary: "Village haoussa de la région de Tahoua, célèbre pour sa mosquée en terre primée par le prix Aga Khan.",
    description:
      "Dans la région de Tahoua, le village de Yaama doit sa renommée à sa mosquée du vendredi, chef-d'œuvre d'architecture de terre construit collectivement par les villageois. Les mosquées en terre de la région de Tahoua figurent sur la liste indicative du Niger au patrimoine mondial. Comme tout le pays, la zone est formellement déconseillée.",
    lat: 14.3590,
    lng: 5.4956,
    en: {
      region: "Tahoua",
      summary: "A Hausa village in the Tahoua region, famous for its Aga Khan Award-winning earthen mosque.",
      description:
        "In the Tahoua region, the village of Yaama owes its fame to its Friday mosque, a masterpiece of earthen architecture built collectively by the villagers. The earthen mosques of the Tahoua region are on Niger's World Heritage Tentative List. Like the whole country, the area is covered by advice against all travel.",
    },
    places: [
      {
        slug: "mosquee-de-yaama",
        category: "RELIGION",
        name: "Mosquée de Yaama",
        summary: "Mosquée en banco de style haoussa, coiffée d'un dôme et de quatre minarets, prix Aga Khan 1986.",
        description:
          "Construite à partir de 1962, la mosquée de Yaama a été bâtie par toute la communauté : don du terrain, fabrication des briques de terre, transport de l'eau et du bois. Agrandie au fil des années d'un dôme central et de quatre minarets d'angle, elle illustre le style soudano-sahélien dans sa variante haoussa et a reçu le prix Aga Khan d'architecture en 1986.",
        tips: `Lieu de culte : visite uniquement avec autorisation, en tenue couvrante. ${TIP_FR}`,
        visitMinutes: 45,
        lat: 14.3596,
        lng: 5.4993,
        en: {
          name: "Yaama Mosque",
          summary: "A Hausa-style mud-brick mosque crowned by a dome and four minarets, Aga Khan Award 1986.",
          description:
            "Begun in 1962, Yaama Mosque was built by the whole community: the land was donated, and villagers made the mud bricks and carried water and wood. Enlarged over the years with a central dome and four corner minarets, it illustrates the Sudano-Sahelian style in its Hausa variant and won the Aga Khan Award for Architecture in 1986.",
          tips: `A place of worship: visit only with permission, in covering clothes. ${TIP_EN}`,
        },
      },
    ],
  },
  {
    slug: "kawar-djado",
    name: "Kawar et Djado",
    region: "Agadez",
    summary: "Oasis du Sahara oriental : salines de Bilma, falaises du Kawar et ksars abandonnés du plateau du Djado.",
    description:
      "À l'extrême nord-est du pays, à plus de 500 km d'Agadez, la falaise du Kawar abrite un chapelet d'oasis dont Bilma, célèbre pour ses salines, terminus des caravanes de sel (azalaï) venues de l'Aïr à travers le Ténéré. Plus au nord, le plateau du Djado conserve des gravures rupestres et les ruines de ksars abandonnés, inscrits sur la liste indicative du Niger au patrimoine mondial. Région très isolée, formellement déconseillée.",
    lat: 18.6867,
    lng: 12.9200,
    cover: "/images/voyage/kawar-djado",
    en: {
      name: "Kawar and Djado",
      region: "Agadez",
      summary: "Oases of the eastern Sahara: the Bilma salt pans, the Kawar cliffs and the abandoned ksars of the Djado plateau.",
      description:
        "In the far north-east of the country, more than 500 km from Agadez, the Kawar escarpment shelters a string of oases including Bilma, famous for its salt pans and the end point of the salt caravans (azalai) that came from the Aïr across the Ténéré. Further north, the Djado plateau preserves rock engravings and the ruins of abandoned ksars, on Niger's World Heritage Tentative List. A very remote region covered by advice against all travel.",
    },
    places: [
      {
        slug: "salines-de-kalala-bilma",
        category: "CULTURE",
        name: "Salines de Kalala",
        summary: "Des centaines de bassins creusés à la main où le sel est extrait comme depuis des siècles.",
        description:
          "Aux portes de Bilma, les salines de Kalala alignent des centaines de bassins creusés à la main : l'eau saumâtre qui remonte du sous-sol y dépose le sel, moulé ensuite en pains ou en cônes. Ce sel, échangé pendant des siècles contre le mil des caravaniers touaregs, part aujourd'hui surtout en camion. Le « maï », autorité traditionnelle, attribue les parcelles et fixe les prix.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        lat: 18.6935,
        lng: 12.8925,
        cover: "/images/voyage/lieu-salines-de-kalala-bilma",
        en: {
          name: "Kalala Salt Pans",
          summary: "Hundreds of hand-dug pits where salt is extracted as it has been for centuries.",
          description:
            "On the edge of Bilma, the Kalala salt pans line up hundreds of hand-dug pits: brackish water rising from underground deposits salt, which is then moulded into loaves or cones. Traded for centuries for the millet brought by Tuareg caravanners, the salt now mostly leaves by truck. The \"mai\", a traditional authority, allocates the plots and sets prices.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
      {
        slug: "ksar-de-djado",
        category: "HISTORY",
        name: "Ksar de Djado",
        summary: "Une cité fortifiée en ruine dressée au-dessus d'une palmeraie, au sud du plateau du Djado.",
        description:
          "Au sud du plateau du Djado, dans une petite oasis d'eau saumâtre, les ruines d'une ville fortifiée en terre et en pierre dominent une palmeraie entretenue par des nomades toubou. La cité, abandonnée depuis longtemps, aurait été fondée par les Kanouri. Le plateau alentour est réputé pour ses gravures et peintures rupestres représentant une faune disparue de la région.",
        tips: TIP_FR,
        bestPeriod: "Saison fraîche (novembre à février)",
        lat: 21.0159,
        lng: 12.3084,
        cover: "/images/voyage/lieu-ksar-de-djado",
        en: {
          name: "Djado Ksar",
          summary: "A ruined fortified town rising above a palm grove at the southern end of the Djado plateau.",
          description:
            "At the southern end of the Djado plateau, in a small brackish-water oasis, the ruins of a fortified town of earth and stone tower over a palm grove tended by Toubou nomads. Long abandoned, the town is thought to have been founded by the Kanuri. The surrounding plateau is famous for rock engravings and paintings depicting wildlife long gone from the area.",
          tips: TIP_EN,
          bestPeriod: "Cool season (November to February)",
        },
      },
    ],
  },
];

/** Aucun circuit : l'ensemble du pays est formellement déconseillé (octobre 2026). */
export const NIGER_CIRCUITS: SeedCircuit[] = [];
