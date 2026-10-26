/**
 * Contenu de départ du guide Burkina Faso (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 *
 * Sécurité : à la rédaction (octobre 2026), France Diplomatie (mise à jour du
 * 10 septembre 2026) déconseille formellement tout déplacement au Burkina Faso
 * et le FCDO britannique déconseille tout voyage dans le pays. Le guide est donc
 * un guide « patrimoine », sans circuit, pour préparer un voyage quand les
 * conditions le permettront. À réexaminer à chaque évolution de ces conseils.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

const TIP_SECU =
  "Tout le Burkina Faso est actuellement formellement déconseillé aux voyageurs : ce lieu est présenté pour préparer un voyage futur, quand les conseils officiels le permettront.";
const TIP_SECU_EN =
  "All of Burkina Faso is currently advised against for travellers: this place is presented to help plan a future trip, once official advice allows it.";

export const BURKINA_GUIDE: SeedGuide = {
  country: "BF",
  intro:
    "Tout voyage au Burkina Faso est aujourd'hui formellement déconseillé par la France et le Royaume-Uni, en raison de la menace terroriste et du risque d'enlèvement : ce guide présente le patrimoine du « pays des hommes intègres » pour préparer un voyage quand les conditions le permettront. Mosquée de terre de Bobo-Dioulasso, ruines de Loropéni inscrites à l'UNESCO, cases peintes de Tiébélé, cascades et pics de grès de la région de Banfora, et à Ouagadougou le FESPACO, grand rendez-vous du cinéma africain : le pays possède l'un des patrimoines culturels les plus riches d'Afrique de l'Ouest.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; les ressortissants de plusieurs pays d'Afrique de l'Ouest en sont dispensés. Les conditions (visa en ligne, pièces demandées) évoluent : vérifiez-les auprès des autorités burkinabè et des conseils aux voyageurs de votre pays avant tout projet. Notez que la France n'a plus d'ambassade ni de consulat ouverts à Ouagadougou.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Le pays se trouve dans la « ceinture de la méningite » : interrogez votre médecin sur les vaccins recommandés. Buvez de l'eau en bouteille et prévoyez une bonne protection contre la chaleur.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les espèces sont indispensables ; le paiement mobile (mobile money) est très répandu. Les cartes bancaires ne sont acceptées que dans quelques hôtels et commerces des grandes villes.",
    },
    {
      title: "Quand partir",
      body: "La saison sèche et relativement fraîche, de novembre à février, est la plus agréable, avec l'harmattan (vent sec et poussiéreux venu du Sahara). De mars à mai, la chaleur devient très forte. La saison des pluies s'étend environ de juin à septembre, plus longue dans le sud-ouest, plus courte dans le Sahel au nord.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue de l'administration et la plus utilisée par les voyageurs ; le mooré, le dioula et le fulfuldé, entre autres, sont parlés au quotidien. Les salutations, longues et soignées, sont essentielles avant toute demande. Les traditions (chefferies, masques, lieux sacrés) restent très vivantes : suivez les consignes, et demandez toujours avant de photographier une personne, un lieu sacré ou une cérémonie.",
    },
    {
      title: "Se déplacer",
      body: "Dans les villes, on circule en taxi ou en deux-roues ; entre les villes, des compagnies d'autocars relient les principales localités. Les routes interurbaines sont toutefois particulièrement exposées aux attaques et aux enlèvements : ne prévoyez aucun déplacement sans avoir consulté les conseils officiels à jour, qui déconseillent actuellement tout voyage dans le pays.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C et E (prises européennes). Les coupures d'électricité sont fréquentes. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money.",
    },
    {
      title: "Sécurité",
      body: "À la date de rédaction, France Diplomatie (« Conseils aux voyageurs ») déconseille formellement tout déplacement au Burkina Faso, sur l'ensemble du territoire, Ouagadougou comprise, et le ministère britannique des Affaires étrangères (FCDO) déconseille tout voyage dans le pays. Ces avis s'expliquent par la présence de groupes armés, la menace terroriste, le risque d'enlèvement et une situation politique instable ; les relations diplomatiques avec la France sont par ailleurs rompues, ce qui limite fortement l'assistance consulaire. Les assurances voyage peuvent ne pas couvrir un séjour dans une zone déconseillée. Ce guide n'a pas vocation à organiser un voyage aujourd'hui : consultez France Diplomatie, le FCDO ou les conseils de votre propre pays, et attendez que leurs recommandations évoluent.",
    },
  ],
  en: {
    intro:
      "All travel to Burkina Faso is currently advised against by France and the United Kingdom because of the terrorist threat and the risk of kidnapping: this guide presents the heritage of the “land of upright people” to help plan a trip once conditions allow. The earthen mosque of Bobo-Dioulasso, the UNESCO-listed Ruins of Loropéni, the painted houses of Tiébélé, the waterfalls and sandstone peaks around Banfora and, in Ouagadougou, FESPACO, the great showcase of African cinema: the country has one of the richest cultural heritages in West Africa.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa; nationals of several West African countries are exempt. Requirements (online visa, documents) change: check them with the Burkinabè authorities and your country's travel advice before making any plans. Note that France no longer has an open embassy or consulate in Ouagadougou.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). The country lies in the “meningitis belt”: ask your doctor about recommended vaccines. Drink bottled water and protect yourself well against the heat.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). Cash is essential; mobile money is widely used. Bank cards are accepted only in a few hotels and shops in the big cities.",
      },
      {
        title: "When to go",
        body: "The dry, relatively cool season from November to February is the most pleasant, with the harmattan (a dry, dusty wind from the Sahara). From March to May the heat becomes intense. The rainy season runs roughly from June to September, longer in the south-west and shorter in the Sahel in the north.",
      },
      {
        title: "Languages and customs",
        body: "French is the language of administration and the one most used by travellers; Mooré, Dioula and Fulfulde, among others, are spoken daily. Greetings, long and careful, are essential before asking anything. Traditions (chieftaincies, masks, sacred places) remain very much alive: follow instructions, and always ask before photographing a person, a sacred place or a ceremony.",
      },
      {
        title: "Getting around",
        body: "In towns, people get around by taxi or on two wheels; between towns, coach companies link the main centres. Intercity roads are, however, particularly exposed to attacks and kidnappings: do not plan any journey without checking up-to-date official advice, which currently advises against all travel to the country.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C and E plugs (European sockets). Power cuts are frequent. A local SIM card (ID required) gives access to mobile internet and mobile money.",
      },
      {
        title: "Safety",
        body: "At the time of writing, France Diplomatie (“Conseils aux voyageurs”) formally advises against all travel to Burkina Faso, across the whole country including Ouagadougou, and the UK Foreign, Commonwealth & Development Office (FCDO) advises against all travel to the country. This advice reflects the presence of armed groups, the terrorist threat, the risk of kidnapping and an unstable political situation; diplomatic relations with France have also been broken off, which severely limits consular assistance. Travel insurance may not cover a stay in an area that is advised against. This guide is not meant for organising a trip today: check France Diplomatie, the FCDO or your own country's advice, and wait for their recommendations to change.",
      },
    ],
  },
};

export const BURKINA_DESTINATIONS: SeedDestination[] = [
  {
    slug: "ouagadougou",
    name: "Ouagadougou",
    region: "Kadiogo (ex-Centre)",
    summary: "Capitale du pays et des Mossi, ville du FESPACO et de l'artisanat.",
    description:
      "Siège du Mogho Naaba, roi des Mossi de Ouagadougou, la capitale est aussi la capitale culturelle du pays : FESPACO, Salon international de l'artisanat, Musée national, scène musicale et théâtrale animée, maquis où l'on déguste le poulet grillé. Comme le reste du pays, la ville est aujourd'hui formellement déconseillée aux voyageurs par les autorités françaises et britanniques.",
    lat: 12.3714,
    lng: -1.5197,
    en: {
      region: "Kadiogo (formerly Centre)",
      summary: "Capital of the country and of the Mossi, home of FESPACO and of crafts.",
      description:
        "Seat of the Mogho Naaba, king of the Mossi of Ouagadougou, the capital is also the country's cultural capital: FESPACO, the International Crafts Fair, the National Museum, a lively music and theatre scene, and maquis (local eateries) serving grilled chicken. Like the rest of the country, the city is currently advised against for travellers by the French and British authorities.",
    },
    places: [
      {
        slug: "musee-national-burkina-faso",
        category: "MUSEUM",
        name: "Musée national du Burkina Faso",
        summary: "Masques, statuaire, costumes et objets des nombreux peuples du pays.",
        description:
          "Le Musée national présente la diversité culturelle du Burkina Faso à travers ses collections de masques, de statues, de costumes, de bijoux et d'objets du quotidien. Une introduction précieuse aux traditions des Mossi, Bobo, Lobi, Gourounsi, Peuls et des autres peuples du pays.",
        tips: TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "National Museum of Burkina Faso",
          summary: "Masks, statues, costumes and objects from the country's many peoples.",
          description:
            "The National Museum presents Burkina Faso's cultural diversity through its collections of masks, statues, costumes, jewellery and everyday objects. A valuable introduction to the traditions of the Mossi, Bobo, Lobi, Gurunsi, Fulani and the country's other peoples.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "ceremonie-du-moro-naba",
        category: "CULTURE",
        name: "Cérémonie du Moro-Naba",
        summary: "Rituel hebdomadaire de la cour du roi des Mossi, dit du « faux départ ».",
        description:
          "Chaque vendredi, devant le palais du Mogho Naaba (ou Moro-Naba), roi des Mossi de Ouagadougou, se déroule une courte cérémonie coutumière dite du « faux départ » : selon la tradition, le roi, prêt à partir, est retenu par ses dignitaires. Un rituel qui témoigne de la place toujours importante de la chefferie mossi.",
        tips: "Tenue correcte, discrétion et respect strict des consignes, notamment pour les photos. " + TIP_SECU,
        visitMinutes: 45,
        en: {
          name: "Moro-Naba ceremony",
          summary: "Weekly ritual at the court of the king of the Mossi, known as the “false departure”.",
          description:
            "Every Friday, in front of the palace of the Mogho Naaba (or Moro-Naba), king of the Mossi of Ouagadougou, a short customary ceremony known as the “false departure” takes place: according to tradition, the king, ready to leave, is held back by his dignitaries. A ritual that shows the enduring importance of the Mossi chieftaincy.",
          tips: "Dress respectfully, be discreet and strictly follow instructions, especially about photos. " + TIP_SECU_EN,
        },
      },
      {
        slug: "fespaco",
        category: "FESTIVAL",
        name: "FESPACO",
        summary: "Le Festival panafricain du cinéma et de la télévision de Ouagadougou, tous les deux ans.",
        description:
          "Créé en 1969, le FESPACO est le plus grand festival de cinéma du continent africain. Tous les deux ans, Ouagadougou accueille projections, rencontres professionnelles et marché du film ; le grand prix, l'Étalon d'or de Yennenga, porte le nom de la princesse légendaire, mère fondatrice du peuple mossi.",
        tips: "Dates et programme sont publiés par les organisateurs à chaque édition. " + TIP_SECU,
        bestPeriod: "Années impaires, généralement en février ou début mars",
        visitMinutes: 480,
        en: {
          summary: "The Pan-African Film and Television Festival of Ouagadougou, held every two years.",
          description:
            "Founded in 1969, FESPACO is the largest film festival on the African continent. Every two years Ouagadougou hosts screenings, industry meetings and a film market; the top prize, the Golden Stallion of Yennenga, is named after the legendary princess who was the founding mother of the Mossi people.",
          tips: "Dates and the programme are published by the organisers for each edition. " + TIP_SECU_EN,
          bestPeriod: "Odd-numbered years, usually in February or early March",
        },
      },
      {
        slug: "siao-ouagadougou",
        category: "MARKET",
        name: "Salon international de l'artisanat de Ouagadougou (SIAO)",
        summary: "Grand salon biennal de l'artisanat africain : bronzes, textiles, cuir, vannerie.",
        description:
          "Organisé tous les deux ans à Ouagadougou depuis la fin des années 1980, le SIAO réunit des artisans du Burkina Faso et de nombreux pays d'Afrique : bronzes coulés à la cire perdue, textiles tissés (dont le Faso Dan Fani, pagne national), maroquinerie, poterie, vannerie. La vitrine de savoir-faire dont le pays est très fier.",
        tips: "Dates publiées par les organisateurs à chaque édition. " + TIP_SECU,
        visitMinutes: 240,
        en: {
          name: "Ouagadougou International Crafts Fair (SIAO)",
          summary: "Major biennial fair of African crafts: bronzes, textiles, leather, basketry.",
          description:
            "Held every two years in Ouagadougou since the late 1980s, SIAO brings together artisans from Burkina Faso and many African countries: lost-wax bronzes, woven textiles (including Faso Dan Fani, the national cloth), leatherwork, pottery and basketry. A showcase of skills the country is very proud of.",
          tips: "Dates are published by the organisers for each edition. " + TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "bobo-dioulasso",
    name: "Bobo-Dioulasso",
    region: "Guiriko (ex-Hauts-Bassins)",
    summary: "Deuxième ville du pays, célèbre pour sa grande mosquée de terre et sa vie musicale.",
    description:
      "Capitale économique historique de l'ouest, Bobo-Dioulasso a gardé un cœur ancien, le quartier de Dioulassoba, et une grande mosquée de terre devenue l'emblème du pays. Ville de musique (balafon, djembé), de masques et de cabarets où l'on sert le dolo, elle accueille la Semaine nationale de la culture. Zone aujourd'hui formellement déconseillée aux voyageurs, comme tout le pays.",
    lat: 11.1771,
    lng: -4.2979,
    cover: "/images/voyage/bobo-dioulasso",
    en: {
      region: "Guiriko (formerly Hauts-Bassins)",
      summary: "The country's second city, famous for its great earthen mosque and its music.",
      description:
        "The historic economic capital of the west, Bobo-Dioulasso has kept an old heart, the Dioulassoba quarter, and a great earthen mosque that has become the country's emblem. A city of music (balafon, djembe), masks and cabarets serving dolo, it hosts the National Culture Week. Currently advised against for travellers, like the whole country.",
    },
    places: [
      {
        slug: "grande-mosquee-bobo-dioulasso",
        category: "RELIGION",
        name: "Grande Mosquée de Bobo-Dioulasso",
        summary: "Chef-d'œuvre d'architecture de terre soudano-sahélienne, hérissé de pieux de bois.",
        description:
          "Construite à la fin du XIXe siècle dans le quartier de Dioulassoba, la Grande Mosquée est l'un des plus beaux exemples d'architecture soudano-sahélienne : murs de banco blanchis par le crépi, contreforts coniques et pièces de bois saillantes qui servent d'échafaudage lors des réfections. Elle figure sur la liste indicative du patrimoine mondial de l'UNESCO.",
        tips: "Tenue couvrante ; visite selon les règles de la communauté, jamais pendant les prières. " + TIP_SECU,
        visitMinutes: 45,
        lat: 11.1778,
        lng: -4.2959,
        en: {
          name: "Great Mosque of Bobo-Dioulasso",
          summary: "Masterpiece of Sudano-Sahelian earthen architecture, bristling with wooden stakes.",
          description:
            "Built in the late 19th century in the Dioulassoba quarter, the Great Mosque is one of the finest examples of Sudano-Sahelian architecture: banco (mud-brick) walls whitened with render, conical buttresses and protruding wooden beams that serve as scaffolding during re-plastering. It is on UNESCO's World Heritage Tentative List.",
          tips: "Wear covering clothes; visit according to the community's rules, never during prayers. " + TIP_SECU_EN,
        },
      },
      {
        slug: "quartier-de-dioulassoba",
        category: "HISTORY",
        name: "Vieux quartier de Dioulassoba",
        summary: "Le noyau ancien de la ville, ses ruelles de terre et ses quartiers de forgerons et de griots.",
        description:
          "Dioulassoba est le quartier historique de Bobo-Dioulasso, fondé par les Bobo. Ses ruelles de maisons en banco abritent des familles de forgerons, de griots et d'artisans, ainsi que des lieux sacrés ; le marigot du Houet, qui le borde, est connu pour ses silures considérés comme sacrés. La visite se fait traditionnellement avec un guide du quartier.",
        tips: "Respectez les interdits signalés par le guide (photos, lieux sacrés). " + TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "Old Dioulassoba quarter",
          summary: "The city's ancient core, with earthen lanes and quarters of blacksmiths and griots.",
          description:
            "Dioulassoba is Bobo-Dioulasso's historic quarter, founded by the Bobo people. Its lanes of banco houses are home to families of blacksmiths, griots and artisans, as well as sacred sites; the Houet stream that runs alongside is known for its catfish, regarded as sacred. Visits are traditionally made with a guide from the quarter.",
          tips: "Respect the taboos pointed out by your guide (photos, sacred places). " + TIP_SECU_EN,
        },
      },
      {
        slug: "semaine-nationale-de-la-culture",
        category: "FESTIVAL",
        name: "Semaine nationale de la culture (SNC)",
        summary: "Grande biennale culturelle : musique, danses, masques, théâtre et concours.",
        description:
          "Tous les deux ans, Bobo-Dioulasso accueille la Semaine nationale de la culture, qui rassemble des troupes et artistes de toutes les régions du pays : musiques et danses traditionnelles, sorties de masques, théâtre, arts plastiques, cuisine, concours et grands concerts. Une occasion unique de découvrir la diversité culturelle burkinabè.",
        tips: "Dates publiées par les organisateurs à chaque édition. " + TIP_SECU,
        visitMinutes: 480,
        en: {
          name: "National Culture Week (SNC)",
          summary: "Major cultural biennial: music, dance, masks, theatre and competitions.",
          description:
            "Every two years, Bobo-Dioulasso hosts the National Culture Week, bringing together troupes and artists from every region of the country: traditional music and dance, mask performances, theatre, visual arts, food, competitions and big concerts. A unique chance to discover Burkinabè cultural diversity.",
          tips: "Dates are published by the organisers for each edition. " + TIP_SECU_EN,
        },
      },
      {
        slug: "dolo-et-cuisine-bobo-dioulasso",
        category: "GASTRONOMY",
        name: "Dolo et cuisine burkinabè",
        summary: "Bière de mil des cabarets, tô, riz gras et poulet grillé.",
        description:
          "Le dolo, bière de mil brassée par les femmes (les dolotières) et servie dans des calebasses, se boit dans les cabarets de quartier, véritables lieux de sociabilité. Côté assiette, on découvre le tô (pâte de mil ou de maïs servie avec une sauce), le riz gras, les brochettes et le poulet grillé, sans oublier le jus de bissap ou de gingembre.",
        tips: TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "Dolo and Burkinabè food",
          summary: "Millet beer from the cabarets, tô, riz gras and grilled chicken.",
          description:
            "Dolo, a millet beer brewed by women (the dolotières) and served in calabashes, is drunk in neighbourhood cabarets, true social hubs. On the plate: tô (a millet or maize paste served with sauce), riz gras (rice cooked in a rich sauce), skewers and grilled chicken, along with bissap (hibiscus) or ginger juice.",
          tips: TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "banfora",
    name: "Banfora et la région des Cascades",
    region: "Tannounyan (ex-Cascades)",
    summary: "Cascades, lac aux hippopotames et formations de grès spectaculaires.",
    description:
      "Au sud-ouest du pays, la région de Banfora est la plus verte du Burkina Faso : champs de canne à sucre, vergers de manguiers, cascades de Karfiguéla, dômes de Fabédougou, lac de Tengréla et, plus à l'ouest, les étonnants pics de Sindou. Un patrimoine naturel remarquable, dans une zone aujourd'hui formellement déconseillée aux voyageurs comme le reste du pays.",
    lat: 10.6333,
    lng: -4.7667,
    cover: "/images/voyage/banfora",
    en: {
      name: "Banfora and the Cascades region",
      region: "Tannounyan (formerly Cascades)",
      summary: "Waterfalls, a hippo lake and spectacular sandstone formations.",
      description:
        "In the south-west of the country, the Banfora area is Burkina Faso's greenest region: sugar-cane fields, mango orchards, the Karfiguéla falls, the Fabédougou domes, Lake Tengréla and, further west, the astonishing Sindou peaks. Remarkable natural heritage, in an area currently advised against for travellers like the rest of the country.",
    },
    places: [
      {
        slug: "cascades-de-karfiguela",
        category: "NATURE",
        name: "Cascades de Karfiguéla",
        summary: "Succession de chutes d'eau sur des dalles de grès, au milieu d'une végétation luxuriante.",
        description:
          "À quelques kilomètres au nord-ouest de Banfora, la rivière Comoé dévale une série de marches de grès en cascades et bassins naturels, entourés de grands arbres. Le site, l'un des plus connus du pays, est plus spectaculaire pendant et juste après la saison des pluies.",
        tips: TIP_SECU,
        bestPeriod: "Fin de la saison des pluies (septembre à novembre)",
        visitMinutes: 150,
        lat: 10.7242,
        lng: -4.8233,
        en: {
          name: "Karfiguéla Falls",
          summary: "A succession of waterfalls over sandstone slabs, amid lush vegetation.",
          description:
            "A few kilometres north-west of Banfora, the Comoé river tumbles down a series of sandstone steps in waterfalls and natural pools, surrounded by tall trees. The site, one of the best known in the country, is most spectacular during and just after the rainy season.",
          tips: TIP_SECU_EN,
          bestPeriod: "End of the rainy season (September to November)",
        },
      },
      {
        slug: "domes-de-fabedougou",
        category: "NATURE",
        name: "Dômes de Fabédougou",
        summary: "Curieuses formations de grès arrondies, sculptées par l'érosion.",
        description:
          "Non loin des cascades de Karfiguéla, les dômes de Fabédougou forment un ensemble de rochers de grès aux formes arrondies, façonnés par l'érosion. Un paysage étonnant, propice à la marche et à la photographie, surtout en fin de journée.",
        tips: TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "Fabédougou Domes",
          summary: "Curious rounded sandstone formations sculpted by erosion.",
          description:
            "Not far from the Karfiguéla falls, the Fabédougou domes are a group of rounded sandstone rocks shaped by erosion. An astonishing landscape, ideal for walking and photography, especially late in the day.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "lac-de-tengrela",
        category: "NATURE",
        name: "Lac de Tengréla",
        summary: "Lac paisible où vivent des hippopotames, à découvrir en pirogue.",
        description:
          "À l'ouest de Banfora, le lac de Tengréla abrite une population d'hippopotames que les pêcheurs du village voisin font découvrir en pirogue. Nénuphars, oiseaux et lumière du soir composent un tableau très paisible.",
        tips: "Gardez toujours une distance respectueuse avec les hippopotames. " + TIP_SECU,
        visitMinutes: 120,
        lat: 10.6397,
        lng: -4.8086,
        en: {
          name: "Lake Tengréla",
          summary: "Peaceful lake home to hippos, explored by pirogue.",
          description:
            "West of Banfora, Lake Tengréla is home to a population of hippos, which fishermen from the nearby village show visitors by pirogue. Water lilies, birds and the evening light make for a very peaceful scene.",
          tips: "Always keep a respectful distance from the hippos. " + TIP_SECU_EN,
        },
      },
      {
        slug: "pics-de-sindou",
        category: "NATURE",
        name: "Pics de Sindou",
        summary: "Chaîne d'aiguilles de grès ciselées par l'érosion, haut lieu du pays sénoufo.",
        description:
          "À l'ouest de Banfora, près de Sindou, une longue crête de grès a été découpée par l'érosion en aiguilles, cheminées et arches. Ce paysage spectaculaire est aussi un lieu chargé de sens pour les populations sénoufo de la région, qui y possèdent des sites sacrés. La découverte se fait à pied avec un guide local.",
        tips: "Certains sites sont sacrés : suivez les consignes du guide. " + TIP_SECU,
        visitMinutes: 180,
        lat: 10.6542,
        lng: -5.1542,
        en: {
          name: "Sindou Peaks",
          summary: "A range of sandstone needles carved by erosion, a landmark of Senufo country.",
          description:
            "West of Banfora, near Sindou, a long sandstone ridge has been cut by erosion into needles, chimneys and arches. This spectacular landscape is also a meaningful place for the region's Senufo people, who have sacred sites there. It is explored on foot with a local guide.",
          tips: "Some sites are sacred: follow your guide's instructions. " + TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "loropeni",
    name: "Loropéni et le pays lobi",
    region: "Djôrô (ex-Sud-Ouest)",
    summary: "Les ruines de pierre millénaires de Loropéni, premier site UNESCO du pays.",
    description:
      "Au sud-ouest, entre Gaoua et la frontière ivoirienne, le pays lobi conserve les ruines de Loropéni, premier site du Burkina Faso inscrit au patrimoine mondial de l'UNESCO (2009), ainsi qu'une architecture et des traditions singulières. La région est aujourd'hui, comme tout le pays, formellement déconseillée aux voyageurs.",
    lat: 10.3,
    lng: -3.5333,
    cover: "/images/voyage/loropeni",
    en: {
      name: "Loropéni and Lobi country",
      region: "Djôrô (formerly Sud-Ouest)",
      summary: "The ancient stone ruins of Loropéni, the country's first UNESCO site.",
      description:
        "In the south-west, between Gaoua and the Ivorian border, Lobi country preserves the Ruins of Loropéni, Burkina Faso's first UNESCO World Heritage Site (2009), as well as distinctive architecture and traditions. Like the whole country, the region is currently advised against for travellers.",
    },
    places: [
      {
        slug: "ruines-de-loropeni",
        category: "HISTORY",
        name: "Ruines de Loropéni",
        summary: "Hautes murailles de latérite d'une forteresse vieille d'au moins mille ans.",
        description:
          "Les ruines de Loropéni sont les vestiges les mieux conservés d'un ensemble de fortifications en pierre de la région : une enceinte de murs de latérite pouvant atteindre plusieurs mètres de haut. Vieilles d'au moins mille ans selon l'UNESCO, elles sont associées au commerce de l'or transsaharien ; leurs bâtisseurs et leur fonction exacte font encore l'objet de recherches. Inscrites au patrimoine mondial en 2009.",
        tips: TIP_SECU,
        visitMinutes: 90,
        lat: 10.3103,
        lng: -3.5628,
        en: {
          name: "Ruins of Loropéni",
          summary: "High laterite walls of a fortress at least a thousand years old.",
          description:
            "The Ruins of Loropéni are the best preserved of a group of stone fortifications in the region: an enclosure of laterite walls up to several metres high. At least a thousand years old according to UNESCO, they are linked to the trans-Saharan gold trade; their builders and exact function are still being researched. Listed as a World Heritage Site in 2009.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "musee-de-gaoua",
        category: "MUSEUM",
        name: "Musée des civilisations du Sud-Ouest (Gaoua)",
        summary: "Les cultures lobi, gan, dagara et voisines : statuaire, objets rituels, habitat.",
        description:
          "À Gaoua, chef-lieu de la région, le musée présente les peuples du sud-ouest du Burkina Faso, notamment les Lobi : statuettes rituelles, objets du quotidien, parures et maquettes d'habitat. Une clé de lecture indispensable pour comprendre la région et ses ruines.",
        tips: TIP_SECU,
        visitMinutes: 75,
        en: {
          name: "Museum of South-West Civilisations (Gaoua)",
          summary: "Lobi, Gan, Dagara and neighbouring cultures: statues, ritual objects, housing.",
          description:
            "In Gaoua, the regional capital, the museum presents the peoples of south-western Burkina Faso, especially the Lobi: ritual statuettes, everyday objects, ornaments and models of traditional homes. An essential key to understanding the region and its ruins.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "habitat-lobi",
        category: "CULTURE",
        name: "Habitat traditionnel lobi",
        summary: "Concessions fortifiées en terre, aux murs épais et aux rares ouvertures.",
        description:
          "Les Lobi vivent traditionnellement dans des concessions de terre dispersées dans la campagne, aux murs épais et aux ouvertures rares, véritables petites forteresses familiales. Autels et statuettes y témoignent d'une vie religieuse riche. Ces maisons sont habitées : on ne les visite qu'avec l'accord des familles, par l'intermédiaire d'un guide local.",
        tips: TIP_SECU,
        visitMinutes: 120,
        en: {
          name: "Traditional Lobi housing",
          summary: "Fortified earthen compounds with thick walls and few openings.",
          description:
            "The Lobi traditionally live in earthen compounds scattered across the countryside, with thick walls and few openings: true small family fortresses. Altars and statuettes bear witness to a rich religious life. These homes are lived in: they can only be visited with the families' consent, through a local guide.",
          tips: TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "tiebele",
    name: "Tiébélé et le pays kassena",
    region: "Nazinon (ex-Centre-Sud)",
    summary: "La cour royale aux cases peintes des Kassena, près de la frontière ghanéenne.",
    description:
      "Dans le sud du pays, près du Ghana, Tiébélé est réputée pour sa cour royale, dont les cases de terre sont couvertes de peintures géométriques réalisées par les femmes kassena. Non loin, le ranch de gibier de Nazinga protège éléphants et antilopes. Une région au patrimoine exceptionnel, aujourd'hui formellement déconseillée aux voyageurs comme le reste du pays.",
    lat: 11.0956,
    lng: -0.9653,
    cover: "/images/voyage/tiebele",
    en: {
      name: "Tiébélé and Kassena country",
      region: "Nazinon (formerly Centre-Sud)",
      summary: "The royal court of painted Kassena houses, near the Ghanaian border.",
      description:
        "In the south of the country, near Ghana, Tiébélé is famous for its royal court, whose earthen houses are covered in geometric paintings made by Kassena women. Nearby, the Nazinga game ranch protects elephants and antelopes. A region of exceptional heritage, currently advised against for travellers like the rest of the country.",
    },
    places: [
      {
        slug: "cour-royale-de-tiebele",
        category: "CULTURE",
        name: "Cour royale de Tiébélé",
        summary: "Cases de terre ornées de motifs géométriques peints par les femmes.",
        description:
          "La cour royale de Tiébélé regroupe des habitations kassena en terre, de formes variées selon leurs occupants, dont les murs sont décorés de motifs géométriques et symboliques en noir, blanc et ocre rouge. Ces peintures, réalisées et régulièrement renouvelées par les femmes avec des pigments naturels, font de l'ensemble l'un des joyaux architecturaux d'Afrique de l'Ouest ; il figure sur la liste indicative de l'UNESCO.",
        tips: "Lieu habité : visite guidée selon les règles de la cour, demandez avant de photographier les personnes. " + TIP_SECU,
        visitMinutes: 120,
        en: {
          name: "Royal Court of Tiébélé",
          summary: "Earthen houses adorned with geometric patterns painted by the women.",
          description:
            "The royal court of Tiébélé is a group of Kassena earthen dwellings, shaped differently according to who lives in them, whose walls are decorated with geometric and symbolic patterns in black, white and red ochre. These paintings, made and regularly renewed by the women using natural pigments, make the ensemble one of West Africa's architectural gems; it is on UNESCO's Tentative List.",
          tips: "A lived-in place: guided visit according to the court's rules; ask before photographing people. " + TIP_SECU_EN,
        },
      },
      {
        slug: "ranch-de-nazinga",
        category: "NATURE",
        name: "Ranch de gibier de Nazinga",
        summary: "Réserve de savane boisée connue pour ses éléphants et ses antilopes.",
        description:
          "Entre Pô et la frontière ghanéenne, le ranch de gibier de Nazinga protège une vaste zone de savane boisée et de mares. On y observait traditionnellement éléphants, antilopes, singes, crocodiles et de nombreux oiseaux, surtout en saison sèche lorsque les animaux se rassemblent autour des points d'eau.",
        tips: TIP_SECU,
        bestPeriod: "Saison sèche (décembre à avril)",
        visitMinutes: 480,
        lat: 11.185,
        lng: -1.4844,
        en: {
          name: "Nazinga Game Ranch",
          summary: "Wooded savannah reserve known for its elephants and antelopes.",
          description:
            "Between Pô and the Ghanaian border, Nazinga Game Ranch protects a vast area of wooded savannah and waterholes. Visitors traditionally saw elephants, antelopes, monkeys, crocodiles and many birds, especially in the dry season when animals gather around the water points.",
          tips: TIP_SECU_EN,
          bestPeriod: "Dry season (December to April)",
        },
      },
    ],
  },
  {
    slug: "gorom-gorom",
    name: "Gorom-Gorom et le Sahel",
    region: "Liptako (ex-Sahel)",
    summary: "Marché sahélien et dunes de l'Oudalan : un patrimoine aujourd'hui inaccessible.",
    description:
      "Aux confins du Mali et du Niger, le Sahel burkinabè était autrefois réputé pour le grand marché de Gorom-Gorom, carrefour des Touaregs, Peuls, Bellas et Songhaï, et pour les dunes et la mare d'Oursi. Cette région est l'une des plus touchées par les violences armées et fait l'objet des recommandations les plus strictes : elle n'est présentée ici qu'au titre du patrimoine.",
    lat: 14.4446,
    lng: -0.2345,
    en: {
      name: "Gorom-Gorom and the Sahel",
      region: "Liptako (formerly Sahel)",
      summary: "A Sahelian market and the dunes of Oudalan: heritage that is currently out of reach.",
      description:
        "On the borders of Mali and Niger, the Burkinabè Sahel was once famous for the great market of Gorom-Gorom, a meeting point for Tuareg, Fulani, Bella and Songhai peoples, and for the dunes and pool of Oursi. This region is one of the worst affected by armed violence and is subject to the strictest advice: it is presented here as heritage only.",
    },
    places: [
      {
        slug: "marche-de-gorom-gorom",
        category: "MARKET",
        name: "Marché de Gorom-Gorom",
        summary: "Grand marché hebdomadaire sahélien, rendez-vous des éleveurs et des caravanes.",
        description:
          "Le marché hebdomadaire de Gorom-Gorom était l'un des plus célèbres du Sahel : bétail, chameaux, cuir, bijoux, nattes et produits du désert s'y échangeaient dans un brassage de peuples et de costumes. Il reste un symbole des cultures nomades et pastorales du nord du pays.",
        tips: "Zone parmi les plus dangereuses du pays, formellement déconseillée : présentée uniquement au titre du patrimoine. " + TIP_SECU,
        visitMinutes: 180,
        en: {
          name: "Gorom-Gorom market",
          summary: "Great weekly Sahelian market, a meeting place for herders and caravans.",
          description:
            "The weekly market of Gorom-Gorom was one of the most famous in the Sahel: livestock, camels, leather, jewellery, mats and desert produce changed hands amid a mix of peoples and costumes. It remains a symbol of the nomadic and pastoral cultures of the country's north.",
          tips: "One of the most dangerous areas of the country, formally advised against: presented as heritage only. " + TIP_SECU_EN,
        },
      },
      {
        slug: "mare-et-dunes-d-oursi",
        category: "NATURE",
        name: "Mare et dunes d'Oursi",
        summary: "Zone humide sahélienne protégée et cordons de dunes de sable.",
        description:
          "Au nord-ouest de Gorom-Gorom, la mare d'Oursi est une zone humide d'importance internationale (site Ramsar) qui attire de nombreux oiseaux d'eau et les troupeaux des éleveurs. Elle est bordée de dunes de sable orangé, l'un des paysages les plus emblématiques du Sahel burkinabè.",
        tips: "Zone parmi les plus dangereuses du pays, formellement déconseillée : présentée uniquement au titre du patrimoine. " + TIP_SECU,
        visitMinutes: 240,
        en: {
          name: "Oursi pool and dunes",
          summary: "A protected Sahelian wetland and ridges of sand dunes.",
          description:
            "North-west of Gorom-Gorom, the Oursi pool is a wetland of international importance (Ramsar site) that draws many waterbirds and herders' livestock. It is bordered by orange sand dunes, one of the most iconic landscapes of the Burkinabè Sahel.",
          tips: "One of the most dangerous areas of the country, formally advised against: presented as heritage only. " + TIP_SECU_EN,
        },
      },
    ],
  },
];

/** Aucun circuit : l'ensemble du pays est formellement déconseillé (voir l'en-tête). */
export const BURKINA_CIRCUITS: SeedCircuit[] = [];
