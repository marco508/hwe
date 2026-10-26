/**
 * Contenu de départ du guide Ghana (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 * Rubrique Sécurité établie d'après France Diplomatie (mise à jour du
 * 15/09/2026) et le FCDO britannique (mise à jour du 02/07/2026) : à revoir
 * régulièrement.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const GHANA_GUIDE: SeedGuide = {
  country: "GH",
  intro:
    "Premier pays d'Afrique subsaharienne à accéder à l'indépendance, en 1957, le Ghana accueille ses visiteurs d'un chaleureux « Akwaaba » (bienvenue) : forts et châteaux de la côte témoins de la traite atlantique, plages bordées de cocotiers, forêt tropicale de Kakum, culture ashanti vivante à Kumasi, cascades de la Volta et, plus au nord, les savanes du parc de Mole.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; il s'obtient auprès des représentations diplomatiques du Ghana ou selon les procédures en ligne en vigueur. Les ressortissants de la CEDEAO en sont dispensés, et les règles évoluent pour d'autres pays africains. Vérifiez toujours les conditions à jour auprès des sources officielles avant le départ : passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Buvez de l'eau en bouteille et évitez de vous baigner en eau douce stagnante sans avis local.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le cedi ghanéen (GHS), dont le cours varie sensiblement : renseignez-vous au moment du départ. Le paiement mobile (mobile money, « MoMo ») est omniprésent, y compris chez les petits commerçants. Les cartes bancaires sont acceptées dans les hôtels et grands commerces d'Accra et de Kumasi ; on trouve des distributeurs dans les villes, mais gardez des espèces pour les zones rurales.",
    },
    {
      title: "Quand partir",
      body: "Le sud connaît deux saisons des pluies (la grande, environ d'avril à juin, et une plus courte vers septembre–octobre) ; le nord, une seule (environ de mai à octobre). La période la plus agréable va de novembre à mars, saison sèche, avec l'harmattan (vent sec et poussiéreux) de décembre à février. Le parc de Mole se visite de préférence en saison sèche, quand la faune se rassemble autour des points d'eau.",
    },
    {
      title: "Langues et usages",
      body: "L'anglais est la langue officielle ; le twi (akan), l'éwé, le ga, le fante et le dagbani, entre autres, sont parlés au quotidien. Les salutations comptent beaucoup : prenez le temps de saluer avant toute demande, et utilisez la main droite pour donner, recevoir ou manger. Tenue correcte hors des plages. Demandez avant de photographier une personne, une cérémonie ou un chef traditionnel ; il est interdit de photographier les sites militaires et les abords de l'aéroport.",
    },
    {
      title: "Se déplacer",
      body: "Les tro-tros (minibus collectifs) et les taxis partagés sont les transports les plus courants ; des compagnies de cars relient les grandes villes, et des vols intérieurs desservent notamment Kumasi et Tamale depuis Accra. En ville, les applications de VTC sont répandues à Accra. Hors des grandes villes, préférez une voiture avec chauffeur réservée auprès d'un prestataire sérieux, et évitez de rouler la nuit.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 230 V, prises de type G (modèle britannique à trois broches rectangulaires) : prévoyez un adaptateur. Une carte SIM locale, enregistrée avec votre passeport, donne accès à l'internet mobile et au mobile money.",
    },
    {
      title: "Sécurité",
      body: "Le Ghana est l'une des destinations les plus fréquentées d'Afrique de l'Ouest et l'essentiel des sites touristiques du sud se visite dans de bonnes conditions, avec une vigilance normale. Les autorités françaises déconseillent formellement la bande frontalière nord avec le Burkina Faso (dont Tumu, Navrongo et Bawku) et déconseillent, sauf raison impérative, d'autres zones frontalières du nord (parc de Gbele, frontière ouest avec le Burkina Faso, nord-ouest de la frontière ivoirienne, secteurs du nord-est de la frontière togolaise) ; le Royaume-Uni déconseille tout déplacement non essentiel dans la municipalité de Bawku. Des couvre-feux locaux peuvent être en vigueur dans le nord. Ailleurs, la petite et moyenne délinquance (vols à l'arraché, cambriolages, parfois avec violence) concerne surtout Accra, Kumasi, Takoradi et les plages : évitez de marcher seul la nuit et de vous rendre seul sur une plage isolée. La baignade est dangereuse sur la côte (courants violents, plages non surveillées) et la conduite de nuit est à proscrire. Consultez avant et pendant votre voyage les « Conseils aux voyageurs » de France Diplomatie et les conseils du Foreign Office britannique (FCDO), qui évoluent régulièrement.",
    },
  ],
  en: {
    intro:
      "The first country in sub-Saharan Africa to gain independence, in 1957, Ghana welcomes visitors with a warm “Akwaaba” (welcome): coastal forts and castles bearing witness to the Atlantic slave trade, palm-fringed beaches, the Kakum rainforest, the living Ashanti culture of Kumasi, the waterfalls of the Volta region and, further north, the savannahs of Mole National Park.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa, obtained from Ghana's diplomatic missions or through the online procedures in force. ECOWAS nationals are exempt, and the rules are changing for other African countries. Always check current requirements with official sources before leaving: passport valid for several months after your return, return ticket, accommodation address.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). Drink bottled water and avoid swimming in still fresh water without local advice.",
      },
      {
        title: "Money and payments",
        body: "The currency is the Ghanaian cedi (GHS), whose exchange rate fluctuates significantly: check it when you leave. Mobile money (“MoMo”) is everywhere, even with small traders. Bank cards are accepted in hotels and larger shops in Accra and Kumasi; there are ATMs in the towns, but keep cash for rural areas.",
      },
      {
        title: "When to go",
        body: "The south has two rainy seasons (the main one roughly April to June, and a shorter one around September–October); the north has one (roughly May to October). The most pleasant period is November to March, the dry season, with the harmattan (a dry, dusty wind) from December to February. Mole National Park is best visited in the dry season, when wildlife gathers around the waterholes.",
      },
      {
        title: "Languages and customs",
        body: "English is the official language; Twi (Akan), Ewe, Ga, Fante and Dagbani, among others, are spoken daily. Greetings matter a great deal: take time to greet people before asking anything, and use your right hand to give, receive or eat. Dress modestly away from the beach. Ask before photographing a person, a ceremony or a traditional chief; photographing military sites and the airport area is prohibited.",
      },
      {
        title: "Getting around",
        body: "Tro-tros (shared minibuses) and shared taxis are the most common transport; coach companies link the main cities, and domestic flights serve Kumasi and Tamale, among others, from Accra. In town, ride-hailing apps are widely used in Accra. Outside the big cities, prefer a car with a driver booked through a reputable operator, and avoid travelling by road at night.",
      },
      {
        title: "Electricity and phone",
        body: "230 V, type G plugs (British-style, three rectangular pins): bring an adapter. A local SIM card, registered with your passport, gives access to mobile internet and mobile money.",
      },
      {
        title: "Safety",
        body: "Ghana is one of the most visited destinations in West Africa and most tourist sites in the south can be visited without trouble, with normal vigilance. The French authorities advise against all travel to the northern border strip with Burkina Faso (including Tumu, Navrongo and Bawku) and against all but essential travel to other northern border areas (Gbele park, the western border with Burkina Faso, the north-western part of the Ivorian border, sections of the north-eastern Togolese border); the UK advises against all but essential travel to Bawku Municipality. Local curfews may be in force in the north. Elsewhere, petty and more serious crime (bag snatching, burglary, sometimes violent) mainly affects Accra, Kumasi, Takoradi and the beaches: avoid walking alone at night and do not go alone to isolated beaches. Swimming along the coast is dangerous (strong currents, no lifeguards) and driving at night should be avoided. Before and during your trip, check the travel advice of France Diplomatie and the UK Foreign Office (FCDO), which is updated regularly.",
      },
    ],
  },
};

export const GHANA_DESTINATIONS: SeedDestination[] = [
  {
    slug: "accra",
    name: "Accra",
    region: "Grand Accra",
    summary: "Capitale vibrante sur le golfe de Guinée : mémoire de l'indépendance, vieux quartiers, marchés et vie nocturne.",
    description:
      "Point d'arrivée de la plupart des voyageurs, Accra mêle quartiers d'affaires modernes, vieux quartiers de pêcheurs et marchés foisonnants. On y découvre le parc mémorial Kwame Nkrumah, les ruelles de Jamestown et son phare, l'effervescence du marché de Makola et l'animation d'Osu, ses restaurants et ses maquis. La scène artistique et musicale (highlife, afrobeats) y est particulièrement vivante.",
    lat: 5.6037,
    lng: -0.187,
    en: {
      region: "Greater Accra",
      summary: "A vibrant capital on the Gulf of Guinea: independence history, old quarters, markets and nightlife.",
      description:
        "The arrival point for most travellers, Accra mixes modern business districts, old fishing quarters and teeming markets. Highlights include the Kwame Nkrumah Memorial Park, the lanes of Jamestown and its lighthouse, the bustle of Makola market and the buzz of Osu, with its restaurants and street food. The art and music scene (highlife, afrobeats) is particularly lively.",
    },
    places: [
      {
        slug: "parc-memorial-kwame-nkrumah",
        category: "HISTORY",
        name: "Parc mémorial Kwame Nkrumah",
        summary: "Mausolée et musée du père de l'indépendance, là où elle fut proclamée en 1957.",
        description:
          "Aménagé sur l'ancien terrain de polo où Kwame Nkrumah proclama l'indépendance du Ghana le 6 mars 1957, le parc abrite le mausolée du premier président et de son épouse, ainsi qu'un musée retraçant sa vie et le mouvement panafricain. Un lieu essentiel pour comprendre l'histoire du pays et sa place dans les indépendances africaines.",
        visitMinutes: 75,
        lat: 5.5446,
        lng: -0.2017,
        en: {
          name: "Kwame Nkrumah Memorial Park",
          summary: "Mausoleum and museum of the father of independence, where it was declared in 1957.",
          description:
            "Laid out on the former polo ground where Kwame Nkrumah declared Ghana's independence on 6 March 1957, the park holds the mausoleum of the first president and his wife, and a museum tracing his life and the Pan-African movement. An essential stop for understanding the country's history and its place in Africa's independence movements.",
        },
      },
      {
        slug: "jamestown-accra",
        category: "HISTORY",
        name: "Jamestown et son phare",
        summary: "Le vieux quartier de pêcheurs ga, ses forts coloniaux et son phare rayé.",
        description:
          "Berceau historique d'Accra, Jamestown s'est développé autour de forts européens, dont le fort James britannique et le fort Ussher d'origine néerlandaise. On y flâne entre pirogues colorées, boxeurs à l'entraînement et maisons anciennes, avant de monter au phare pour la vue sur la côte. Chaque année, le festival d'art de rue Chale Wote y investit les ruelles avec fresques, performances et musique.",
        tips: "Visitez de jour, avec un guide du quartier de préférence, et demandez avant de photographier les habitants.",
        visitMinutes: 120,
        lat: 5.5333,
        lng: -0.2128,
        en: {
          name: "Jamestown and its lighthouse",
          summary: "The old Ga fishing quarter, its colonial forts and its striped lighthouse.",
          description:
            "The historic cradle of Accra, Jamestown grew up around European forts, including British-built James Fort and Ussher Fort, of Dutch origin. Wander among colourful canoes, boxers in training and old houses, then climb the lighthouse for views along the coast. Every year the Chale Wote street art festival takes over its lanes with murals, performances and music.",
          tips: "Visit by day, ideally with a local guide, and ask before photographing residents.",
        },
      },
      {
        slug: "marche-de-makola",
        category: "MARKET",
        name: "Marché de Makola",
        summary: "Le grand marché du centre d'Accra : tissus wax, perles, épices et produits frais.",
        description:
          "Au cœur du centre-ville, Makola est le marché le plus célèbre d'Accra, tenu en grande partie par des commerçantes. Ses allées débordent de tissus wax, de perles, d'ustensiles, d'épices et de produits frais. Une immersion bruyante et colorée dans le commerce ghanéen.",
        tips: "Venez le matin, gardez vos affaires près de vous et méfiez-vous des pickpockets dans la foule.",
        visitMinutes: 90,
        lat: 5.549,
        lng: -0.2085,
        en: {
          name: "Makola Market",
          summary: "Central Accra's great market: wax fabrics, beads, spices and fresh produce.",
          description:
            "In the heart of downtown, Makola is Accra's best-known market, largely run by women traders. Its aisles overflow with wax prints, beads, utensils, spices and fresh produce. A noisy, colourful immersion in Ghanaian commerce.",
          tips: "Come in the morning, keep your belongings close and watch out for pickpockets in the crowd.",
        },
      },
      {
        slug: "osu-accra",
        category: "GASTRONOMY",
        name: "Osu et la cuisine de rue",
        summary: "Quartier animé pour goûter jollof, waakye, kelewele et poisson grillé.",
        description:
          "Autour d'Oxford Street, le quartier d'Osu concentre restaurants, bars et vendeurs de rue. C'est l'endroit idéal pour découvrir la cuisine ghanéenne : riz jollof, waakye (riz et haricots), kelewele (bananes plantains épicées et frites), fufu ou banku accompagnés de soupes, poisson grillé et tilapia. Le soir, l'ambiance musicale prend le relais.",
        tips: "Les « chop bars » servent les plats traditionnels à prix doux ; choisissez des stands fréquentés, où la nourriture tourne vite.",
        visitMinutes: 120,
        lat: 5.556,
        lng: -0.1823,
        en: {
          name: "Osu and street food",
          summary: "A lively district to taste jollof, waakye, kelewele and grilled fish.",
          description:
            "Around Oxford Street, the Osu district is packed with restaurants, bars and street vendors. It is the ideal place to discover Ghanaian food: jollof rice, waakye (rice and beans), kelewele (spicy fried plantain), fufu or banku with soups, grilled fish and tilapia. In the evening, the music takes over.",
          tips: "“Chop bars” serve traditional dishes at low prices; choose busy stalls where food turns over quickly.",
        },
      },
    ],
  },
  {
    slug: "cape-coast",
    name: "Cape Coast",
    region: "Centre",
    summary: "Ancienne capitale de la Gold Coast, son château classé à l'UNESCO et la forêt de Kakum toute proche.",
    description:
      "Ville universitaire et ancienne capitale coloniale, Cape Coast est dominée par son château, l'un des principaux lieux de mémoire de la traite atlantique, inscrit avec les autres forts et châteaux de la côte au patrimoine mondial de l'UNESCO. Au nord, le parc national de Kakum et sa canopée suspendue offrent un contraste saisissant. Une base idéale pour explorer la côte centrale, à environ trois heures de route d'Accra.",
    lat: 5.1053,
    lng: -1.2466,
    cover: "/images/voyage/cape-coast",
    en: {
      region: "Central",
      summary: "Former capital of the Gold Coast, its UNESCO-listed castle and the nearby Kakum forest.",
      description:
        "A university town and former colonial capital, Cape Coast is dominated by its castle, one of the main memorials of the Atlantic slave trade, listed with the coast's other forts and castles as a UNESCO World Heritage Site. To the north, Kakum National Park and its canopy walkway offer a striking contrast. An ideal base for exploring the central coast, about three hours' drive from Accra.",
    },
    places: [
      {
        slug: "chateau-de-cape-coast",
        category: "HISTORY",
        name: "Château de Cape Coast",
        summary: "Forteresse blanche face à l'océan, ses cachots et sa « Porte du non-retour ».",
        description:
          "Fondé au XVIIe siècle puis agrandi par les Britanniques, le château de Cape Coast fut l'un des grands centres de la traite atlantique. La visite guidée mène dans les cachots où les captifs étaient entassés avant d'être embarqués par la « Porte du non-retour ». Un musée y retrace l'histoire de la région et de la traite. Une visite bouleversante, devenue un lieu de pèlerinage pour les descendants de la diaspora africaine.",
        visitMinutes: 120,
        lat: 5.1034,
        lng: -1.2414,
        en: {
          name: "Cape Coast Castle",
          summary: "White fortress facing the ocean, its dungeons and its “Door of No Return”.",
          description:
            "Founded in the 17th century and later enlarged by the British, Cape Coast Castle was one of the great centres of the Atlantic slave trade. The guided tour leads into the dungeons where captives were crammed before being shipped through the “Door of No Return”. A museum tells the history of the region and the trade. A deeply moving visit that has become a place of pilgrimage for descendants of the African diaspora.",
        },
      },
      {
        slug: "canopee-de-kakum",
        category: "NATURE",
        name: "Parc national de Kakum et sa canopée",
        summary: "Passerelles suspendues à la cime des arbres d'une forêt tropicale préservée.",
        description:
          "À une trentaine de kilomètres au nord de Cape Coast, le parc national de Kakum protège une vaste forêt tropicale humide. Sa célèbre canopée, une série de ponts suspendus entre les arbres à plusieurs dizaines de mètres du sol, permet d'observer la forêt d'en haut. Des promenades guidées au sol font découvrir plantes médicinales, oiseaux et papillons ; les grands mammifères, comme les éléphants de forêt, restent très discrets.",
        tips: "Venez tôt le matin pour éviter la foule et profiter des oiseaux. Déconseillé aux personnes sujettes au vertige.",
        visitMinutes: 180,
        lat: 5.3527,
        lng: -1.3827,
        en: {
          name: "Kakum National Park and its canopy walkway",
          summary: "Suspended walkways in the treetops of a preserved tropical forest.",
          description:
            "Some thirty kilometres north of Cape Coast, Kakum National Park protects a vast tropical rainforest. Its famous canopy walkway, a series of suspension bridges strung between trees several dozen metres above the ground, lets you see the forest from above. Guided walks on the ground introduce medicinal plants, birds and butterflies; large mammals such as forest elephants remain very elusive.",
          tips: "Come early in the morning to avoid the crowds and enjoy the birds. Not recommended for people who suffer from vertigo.",
        },
      },
      {
        slug: "assin-manso",
        category: "HISTORY",
        name: "Rivière des esclaves d'Assin Manso",
        summary: "Lieu de mémoire où les captifs prenaient leur dernier bain avant la côte.",
        description:
          "Au nord de Cape Coast, Assin Manso fut une étape majeure sur la route des captifs vers les forts de la côte. Dans la rivière, appelée Donkor Nsuo, ils prenaient leur dernier bain avant la marche finale. Le site, aménagé en parc de mémoire, accueille des cérémonies de recueillement, notamment pour les visiteurs de la diaspora africaine.",
        visitMinutes: 75,
        en: {
          name: "Assin Manso Slave River",
          summary: "A memorial site where captives took their last bath before reaching the coast.",
          description:
            "North of Cape Coast, Assin Manso was a major stop on the captives' route to the coastal forts. In the river, called Donkor Nsuo, they took their last bath before the final march. The site, laid out as a memorial park, hosts remembrance ceremonies, especially for visitors from the African diaspora.",
        },
      },
      {
        slug: "fetu-afahye",
        category: "FESTIVAL",
        name: "Festival Fetu Afahye",
        summary: "Grande fête annuelle de Cape Coast : procession des chefs, tambours et costumes.",
        description:
          "Chaque année, la population de Cape Coast (Oguaa) célèbre le Fetu Afahye, fête traditionnelle qui commémore, selon la tradition, la fin d'une épidémie et marque un temps de purification et de renouveau. Le point d'orgue est la procession colorée des chefs en palanquin, accompagnés des compagnies asafo, des tambours et de la foule, dans les rues de la ville.",
        tips: "Les dates exactes sont fixées chaque année par les autorités traditionnelles : vérifiez-les avant de réserver.",
        bestPeriod: "Début septembre",
        visitMinutes: 300,
        lat: 5.1053,
        lng: -1.2466,
        en: {
          name: "Fetu Afahye Festival",
          summary: "Cape Coast's great annual festival: procession of chiefs, drums and costumes.",
          description:
            "Every year, the people of Cape Coast (Oguaa) celebrate Fetu Afahye, a traditional festival that, according to tradition, commemorates the end of an epidemic and marks a time of purification and renewal. The highlight is the colourful procession of chiefs carried in palanquins, accompanied by the asafo companies, drummers and crowds through the streets of the town.",
          tips: "Exact dates are set each year by the traditional authorities: check them before booking.",
          bestPeriod: "Early September",
        },
      },
    ],
  },
  {
    slug: "elmina",
    name: "Elmina",
    region: "Centre",
    summary: "Le plus ancien château européen d'Afrique subsaharienne et un port de pêche haut en couleur.",
    description:
      "À une quinzaine de kilomètres à l'ouest de Cape Coast, Elmina fut l'un des premiers points de contact entre Européens et Africains sur la côte : les Portugais y bâtirent dès 1482 le château Saint-Georges de la Mine, pris ensuite par les Néerlandais. Château et fort Saint-Jacques dominent aujourd'hui un port de pêche très animé, où se pressent des centaines de pirogues peintes.",
    lat: 5.0847,
    lng: -1.3509,
    cover: "/images/voyage/elmina",
    en: {
      region: "Central",
      summary: "The oldest European castle in sub-Saharan Africa and a colourful fishing port.",
      description:
        "Some fifteen kilometres west of Cape Coast, Elmina was one of the first points of contact between Europeans and Africans on the coast: the Portuguese built the castle of São Jorge da Mina here in 1482, later taken by the Dutch. Today the castle and Fort St. Jago overlook a bustling fishing port crowded with hundreds of painted canoes.",
    },
    places: [
      {
        slug: "chateau-d-elmina",
        category: "HISTORY",
        name: "Château d'Elmina",
        summary: "Bâti par les Portugais en 1482, inscrit au patrimoine mondial de l'UNESCO.",
        description:
          "Construit à partir de 1482 pour le commerce de l'or, le château Saint-Georges de la Mine est considéré comme le plus ancien bâtiment européen d'Afrique subsaharienne. Devenu néerlandais au XVIIe siècle, il fut un lieu central de la traite atlantique. La visite guidée parcourt cours, cachots, appartements du gouverneur et la « Porte du non-retour ».",
        visitMinutes: 90,
        lat: 5.0826,
        lng: -1.3489,
        en: {
          name: "Elmina Castle",
          summary: "Built by the Portuguese in 1482, a UNESCO World Heritage Site.",
          description:
            "Built from 1482 for the gold trade, the castle of São Jorge da Mina is considered the oldest European building in sub-Saharan Africa. Taken by the Dutch in the 17th century, it was a central site of the Atlantic slave trade. The guided tour takes in the courtyards, dungeons, governor's quarters and the “Door of No Return”.",
        },
      },
      {
        slug: "fort-saint-jacques-elmina",
        category: "HISTORY",
        name: "Fort Saint-Jacques (Fort St. Jago)",
        summary: "Petit fort néerlandais sur la colline, avec vue sur le château et le port.",
        description:
          "Perché sur la colline qui fait face au château, le fort Saint-Jacques (Fort St. Jago, ou Coenraadsburg) fut fortifié par les Néerlandais pour protéger le château d'Elmina. On y vient surtout pour le panorama exceptionnel sur le château, la lagune et le port de pêche.",
        visitMinutes: 45,
        lat: 5.0859,
        lng: -1.3505,
        en: {
          name: "Fort St. Jago",
          summary: "Small Dutch fort on the hill, overlooking the castle and the port.",
          description:
            "Perched on the hill facing the castle, Fort St. Jago (or Coenraadsburg) was fortified by the Dutch to protect Elmina Castle. Most visitors come for the exceptional view over the castle, the lagoon and the fishing port.",
        },
      },
      {
        slug: "port-de-peche-d-elmina",
        category: "MARKET",
        name: "Port de pêche et marché au poisson d'Elmina",
        summary: "Pirogues peintes, retour de pêche et criée au pied du château.",
        description:
          "Au pied du château, la lagune de Benya abrite l'un des ports de pêche artisanale les plus actifs du pays. Le matin, les pirogues décorées de drapeaux et de devises reviennent chargées ; le poisson est aussitôt vendu, fumé ou transformé par les femmes du marché. Un spectacle saisissant de vie quotidienne.",
        tips: "Venez le matin. Restez discret et demandez avant de photographier ; certains pêcheurs demandent une petite contribution.",
        visitMinutes: 60,
        lat: 5.0841,
        lng: -1.3478,
        en: {
          name: "Elmina fishing port and fish market",
          summary: "Painted canoes, returning boats and fish auctions at the foot of the castle.",
          description:
            "At the foot of the castle, the Benya lagoon shelters one of the busiest artisanal fishing ports in the country. In the morning, canoes decorated with flags and slogans come back loaded; the fish is sold, smoked or processed on the spot by the market women. A striking scene of everyday life.",
          tips: "Come in the morning. Be discreet and ask before taking photos; some fishermen ask for a small contribution.",
        },
      },
    ],
  },
  {
    slug: "busua",
    name: "Busua et le cap des Trois Pointes",
    region: "Ouest",
    summary: "Baie de sable, surf, forts oubliés et le cap le plus au sud du pays.",
    description:
      "Sur la côte ouest, Busua est une petite station balnéaire appréciée pour sa plage en arc de cercle, ses écoles de surf et son ambiance détendue. Les environs réservent des criques bordées de cocotiers, le village de pêcheurs de Dixcove et son fort britannique, et le cap des Trois Pointes, extrémité sud du Ghana. Une étape de repos après les visites de la côte centrale.",
    lat: 4.8036,
    lng: -1.9339,
    en: {
      name: "Busua and Cape Three Points",
      region: "Western",
      summary: "A sandy bay, surfing, forgotten forts and the country's southernmost cape.",
      description:
        "On the west coast, Busua is a small beach resort loved for its curving beach, surf schools and laid-back atmosphere. The surroundings hold palm-fringed coves, the fishing village of Dixcove and its British fort, and Cape Three Points, Ghana's southern tip. A restful stop after visiting the central coast.",
    },
    places: [
      {
        slug: "plage-de-busua",
        category: "BEACH",
        name: "Plage de Busua",
        summary: "Grande plage en baie, spot de surf réputé pour débutants.",
        description:
          "La plage de Busua s'étire le long d'une baie abritée, bordée de cocotiers, de petits hôtels et de restaurants de poisson et de fruits de mer. Les vagues régulières en ont fait l'un des spots de surf les plus connus du Ghana, avec des écoles qui louent planches et accompagnent les débutants.",
        tips: "Renseignez-vous sur place sur les courants avant de vous baigner ou de surfer, et ne vous rendez pas seul sur les plages isolées.",
        visitMinutes: 240,
        lat: 4.8028,
        lng: -1.9327,
        en: {
          name: "Busua Beach",
          summary: "A wide bay beach, a well-known spot for beginner surfers.",
          description:
            "Busua beach stretches along a sheltered bay lined with palm trees, small hotels and fish and seafood restaurants. Its regular waves have made it one of Ghana's best-known surf spots, with schools that rent boards and coach beginners.",
          tips: "Ask locally about currents before swimming or surfing, and do not go alone to isolated beaches.",
        },
      },
      {
        slug: "fort-metal-cross-dixcove",
        category: "HISTORY",
        name: "Fort Metal Cross de Dixcove",
        summary: "Fort britannique dominant un port de pêche naturel, à quelques kilomètres de Busua.",
        description:
          "Construit par les Britanniques à la fin du XVIIe siècle, le fort de Dixcove, dit Fort Metal Cross, surplombe une crique naturelle où s'abritent les pirogues des pêcheurs. Il fait partie des forts et châteaux du Ghana inscrits au patrimoine mondial de l'UNESCO. On l'atteint à pied depuis Busua par un sentier côtier ou par la route.",
        tips: "Pour le sentier côtier entre Busua et Dixcove, faites-vous accompagner par un guide local.",
        visitMinutes: 60,
        en: {
          name: "Fort Metal Cross, Dixcove",
          summary: "A British fort overlooking a natural fishing harbour, a few kilometres from Busua.",
          description:
            "Built by the British in the late 17th century, the Dixcove fort, known as Fort Metal Cross, overlooks a natural cove where fishing canoes shelter. It is one of Ghana's forts and castles listed as a UNESCO World Heritage Site. It can be reached from Busua on foot along a coastal path or by road.",
          tips: "For the coastal path between Busua and Dixcove, go with a local guide.",
        },
      },
      {
        slug: "cap-des-trois-pointes",
        category: "NATURE",
        name: "Cap des Trois Pointes",
        summary: "Extrémité sud du Ghana, phare, forêt et plages sauvages.",
        description:
          "Le cap des Trois Pointes (Cape Three Points) marque l'extrémité méridionale du pays. On y découvre un phare surplombant l'océan, des plages quasi désertes et les restes de forêt d'une réserve forestière voisine. Il est souvent présenté comme la terre ferme la plus proche du point où l'équateur croise le méridien de Greenwich.",
        visitMinutes: 180,
        lat: 4.7437,
        lng: -2.0933,
        en: {
          name: "Cape Three Points",
          summary: "Ghana's southern tip, with a lighthouse, forest and wild beaches.",
          description:
            "Cape Three Points marks the country's southernmost point. Here you will find a lighthouse overlooking the ocean, almost deserted beaches and patches of forest from a nearby forest reserve. It is often described as the land closest to the point where the equator meets the Greenwich meridian.",
        },
      },
    ],
  },
  {
    slug: "kumasi",
    name: "Kumasi",
    region: "Ashanti",
    summary: "Capitale du royaume ashanti : palais royal, kente, festivals et marchés gigantesques.",
    description:
      "Deuxième ville du pays, Kumasi est le cœur du royaume ashanti, dont le roi, l'Asantehene, conserve un rôle coutumier majeur. On y visite le musée du palais de Manhyia, on se perd dans l'immense marché de Kejetia et l'on rayonne vers les villages de tisserands de kente et le lac Bosumtwi. Assister à une fête de l'Akwasidae est un moment fort. À environ quatre à cinq heures de route d'Accra, ou une heure de vol.",
    lat: 6.6885,
    lng: -1.6244,
    en: {
      region: "Ashanti",
      summary: "Capital of the Ashanti kingdom: royal palace, kente, festivals and huge markets.",
      description:
        "Ghana's second city, Kumasi is the heart of the Ashanti kingdom, whose king, the Asantehene, still plays a major customary role. Visit the Manhyia Palace Museum, get lost in the immense Kejetia market and head out to the kente-weaving villages and Lake Bosumtwi. Attending an Akwasidae festival is a highlight. About four to five hours by road from Accra, or an hour's flight.",
    },
    places: [
      {
        slug: "musee-du-palais-de-manhyia",
        category: "MUSEUM",
        name: "Musée du palais de Manhyia",
        summary: "L'ancien palais des rois ashanti et l'histoire de la confédération ashanti.",
        description:
          "Installé dans l'ancien palais royal de Manhyia, le musée présente le mobilier, les objets de cour, des effigies et des souvenirs des souverains ashanti, ainsi que l'histoire de la confédération, de ses guerres avec les Britanniques et de l'exil du roi Prempeh Ier. Le palais actuel de l'Asantehene se trouve à proximité.",
        visitMinutes: 60,
        lat: 6.7056,
        lng: -1.618,
        en: {
          name: "Manhyia Palace Museum",
          summary: "The former palace of the Ashanti kings and the history of the Ashanti confederacy.",
          description:
            "Housed in the former Manhyia royal palace, the museum displays furniture, court objects, effigies and memorabilia of the Ashanti rulers, as well as the history of the confederacy, its wars with the British and the exile of King Prempeh I. The Asantehene's current palace stands nearby.",
        },
      },
      {
        slug: "akwasidae-kumasi",
        category: "FESTIVAL",
        name: "Fête de l'Akwasidae",
        summary: "Toutes les six semaines, l'Asantehene reçoit chefs et public dans un faste spectaculaire.",
        description:
          "Selon le calendrier traditionnel akan, l'Akwasidae revient environ toutes les six semaines, un dimanche. À Kumasi, l'Asantehene y honore les ancêtres puis reçoit en public les chefs et les dignitaires : parasols géants, ornements d'or, tambours parlants et cors d'ivoire composent l'un des spectacles les plus impressionnants d'Afrique de l'Ouest.",
        tips: "Renseignez-vous sur le calendrier auprès de votre hébergement ou du centre culturel ; demandez toujours avant de photographier les chefs.",
        bestPeriod: "Environ toutes les six semaines, un dimanche",
        visitMinutes: 240,
        lat: 6.7056,
        lng: -1.618,
        en: {
          name: "Akwasidae Festival",
          summary: "Every six weeks, the Asantehene receives chiefs and the public in spectacular pomp.",
          description:
            "Following the traditional Akan calendar, Akwasidae comes round roughly every six weeks, on a Sunday. In Kumasi the Asantehene honours the ancestors and then receives chiefs and dignitaries in public: giant umbrellas, gold ornaments, talking drums and ivory horns make it one of the most impressive spectacles in West Africa.",
          tips: "Ask your accommodation or the cultural centre about the calendar; always ask before photographing chiefs.",
          bestPeriod: "Roughly every six weeks, on a Sunday",
        },
      },
      {
        slug: "bonwire-kente",
        category: "CULTURE",
        name: "Bonwire, village du kente",
        summary: "Les tisserands de kente au travail, sur leurs métiers à bandes étroites.",
        description:
          "Au nord-est de Kumasi, le village de Bonwire est réputé comme l'un des berceaux du kente, l'étoffe tissée en bandes étroites aux motifs chargés de symboles, autrefois réservée à la royauté ashanti. On y observe les tisserands au travail et l'on peut acheter directement bandes et pièces tissées.",
        tips: "Les tissus de qualité demandent un long travail : prenez le temps de comparer et de négocier poliment.",
        visitMinutes: 90,
        en: {
          name: "Bonwire, the kente village",
          summary: "Kente weavers at work on their narrow-strip looms.",
          description:
            "North-east of Kumasi, the village of Bonwire is renowned as one of the cradles of kente, the narrow-strip woven cloth with symbol-laden patterns once reserved for Ashanti royalty. You can watch the weavers at work and buy strips and woven pieces directly.",
          tips: "Quality cloth takes a long time to weave: take time to compare and bargain politely.",
        },
      },
      {
        slug: "lac-bosumtwi",
        category: "NATURE",
        name: "Lac Bosumtwi",
        summary: "Lac de cratère sacré entouré de collines boisées, à une trentaine de kilomètres de Kumasi.",
        description:
          "Né d'un impact de météorite, le lac Bosumtwi occupe un cratère presque circulaire entouré de collines verdoyantes. Sacré pour les Ashanti, il est bordé de villages de pêcheurs qui utilisent encore des planches traditionnelles pour la pêche. Balades à pied ou à vélo autour du lac et séjours en lodge en font une échappée paisible depuis Kumasi.",
        visitMinutes: 240,
        lat: 6.505,
        lng: -1.413,
        en: {
          name: "Lake Bosumtwi",
          summary: "A sacred crater lake ringed by wooded hills, some thirty kilometres from Kumasi.",
          description:
            "Formed by a meteorite impact, Lake Bosumtwi fills an almost circular crater surrounded by green hills. Sacred to the Ashanti, it is lined with fishing villages that still use traditional planks for fishing. Walks or bike rides around the lake and stays in lodges make it a peaceful escape from Kumasi.",
        },
      },
    ],
  },
  {
    slug: "hohoe-volta",
    name: "Hohoe et les montagnes de la Volta",
    region: "Volta",
    summary: "Collines verdoyantes, plus hautes cascades du pays et sanctuaires de singes.",
    description:
      "À l'est du pays, près de la frontière togolaise, la région de la Volta déroule des collines couvertes de forêt, des villages éwé et des sites gérés par les communautés : cascades de Wli, mont Afadjato, sanctuaire de singes de Tafi Atome. Hohoe est la base pratique pour rayonner. Une région idéale pour la randonnée, en complément de la côte.",
    lat: 7.1519,
    lng: 0.4736,
    cover: "/images/voyage/hohoe-volta",
    en: {
      name: "Hohoe and the Volta mountains",
      region: "Volta",
      summary: "Green hills, the country's highest waterfalls and monkey sanctuaries.",
      description:
        "In the east of the country, near the Togolese border, the Volta region unfolds forested hills, Ewe villages and community-run sites: Wli falls, Mount Afadjato and the Tafi Atome monkey sanctuary. Hohoe is the handy base for exploring. An ideal region for hiking, as a complement to the coast.",
    },
    places: [
      {
        slug: "cascades-de-wli",
        category: "NATURE",
        name: "Cascades de Wli",
        summary: "Spectaculaires chutes d'eau en pleine forêt, parmi les plus hautes d'Afrique de l'Ouest.",
        description:
          "Au fond d'une vallée boisée de la réserve d'Agumatsa, les cascades de Wli tombent d'une haute falaise dans un bassin où l'on peut se rafraîchir. Une marche à travers la forêt mène à la chute inférieure ; un sentier plus sportif grimpe jusqu'à la chute supérieure. Des colonies de chauves-souris frugivores nichent dans la falaise.",
        tips: "Le sentier vers la chute supérieure est raide et glissant : bonnes chaussures et guide local recommandés.",
        bestPeriod: "Pendant et juste après la saison des pluies (débit plus fort)",
        visitMinutes: 180,
        lat: 7.12,
        lng: 0.59,
        en: {
          name: "Wli Waterfalls",
          summary: "Spectacular falls in the heart of the forest, among the highest in West Africa.",
          description:
            "At the end of a wooded valley in the Agumatsa reserve, the Wli falls drop from a high cliff into a pool where you can cool off. A forest walk leads to the lower falls; a more demanding trail climbs to the upper falls. Colonies of fruit bats roost in the cliff.",
          tips: "The trail to the upper falls is steep and slippery: good shoes and a local guide recommended.",
          bestPeriod: "During and just after the rainy season (stronger flow)",
        },
      },
      {
        slug: "mont-afadjato",
        category: "NATURE",
        name: "Mont Afadjato",
        summary: "Courte ascension raide vers l'un des plus hauts sommets du pays.",
        description:
          "Souvent présenté comme le point culminant du Ghana, le mont Afadjato se gravit en une ascension courte mais raide depuis le village de Liati Wote, à travers la forêt. Du sommet, la vue embrasse les collines de la Volta jusqu'au Togo voisin. D'autres sentiers mènent à des cascades proches.",
        tips: "Partez tôt avec un guide de l'écotourisme local, de l'eau et de bonnes chaussures.",
        visitMinutes: 180,
        en: {
          name: "Mount Afadjato",
          summary: "A short, steep climb to one of the country's highest summits.",
          description:
            "Often described as Ghana's highest point, Mount Afadjato is climbed in a short but steep ascent through the forest from the village of Liati Wote. From the top, the view takes in the Volta hills as far as neighbouring Togo. Other trails lead to nearby waterfalls.",
          tips: "Set off early with a guide from the local ecotourism project, with water and good shoes.",
        },
      },
      {
        slug: "sanctuaire-des-singes-de-tafi-atome",
        category: "NATURE",
        name: "Sanctuaire des singes de Tafi Atome",
        summary: "Forêt communautaire où vivent des singes mones, protégés par les villageois.",
        description:
          "À Tafi Atome, les habitants protègent depuis longtemps les singes mones qui vivent dans la forêt du village, considérés comme sacrés. Un projet d'écotourisme communautaire permet de les observer de près lors d'une promenade guidée et de découvrir la vie du village.",
        tips: "Suivez les consignes du guide et ne nourrissez pas les singes sans son accord.",
        visitMinutes: 90,
        en: {
          name: "Tafi Atome Monkey Sanctuary",
          summary: "A community forest home to mona monkeys, protected by the villagers.",
          description:
            "In Tafi Atome, residents have long protected the mona monkeys living in the village forest, which are considered sacred. A community ecotourism project lets you see them up close on a guided walk and learn about village life.",
          tips: "Follow the guide's instructions and do not feed the monkeys without their agreement.",
        },
      },
    ],
  },
  {
    slug: "mole",
    name: "Parc national de Mole",
    region: "Savannah",
    summary: "Le plus grand parc du Ghana : safaris à pied parmi les éléphants, dans la savane du nord.",
    description:
      "Plus vaste aire protégée du pays, le parc national de Mole couvre des savanes boisées où vivent éléphants, antilopes, phacochères, babouins et de nombreux oiseaux. Il est réputé pour ses safaris à pied accompagnés de rangers armés, qui permettent souvent d'approcher les éléphants. On l'atteint depuis Tamale, desservie par avion depuis Accra. Le parc n'est pas situé dans une zone déconseillée par les autorités françaises ou britanniques, mais le nord du pays appelle une vigilance renforcée : vérifiez les conseils aux voyageurs avant de partir.",
    lat: 9.26,
    lng: -1.85,
    en: {
      name: "Mole National Park",
      region: "Savannah",
      summary: "Ghana's largest park: walking safaris among elephants in the northern savannah.",
      description:
        "The country's largest protected area, Mole National Park covers wooded savannahs home to elephants, antelopes, warthogs, baboons and many birds. It is known for its walking safaris with armed rangers, which often allow you to get close to elephants. It is reached from Tamale, served by flights from Accra. The park is not in an area that the French or British authorities advise against, but the north of the country calls for heightened vigilance: check travel advice before you go.",
    },
    places: [
      {
        slug: "safari-a-pied-mole",
        category: "NATURE",
        name: "Safari à pied et en véhicule à Mole",
        summary: "Éléphants, antilopes et babouins observés à pied avec un ranger.",
        description:
          "Les safaris partent du centre d'accueil du parc, perché sur un escarpement qui domine des points d'eau où les éléphants viennent souvent boire. À pied avec un ranger armé ou en véhicule, on observe éléphants, cobs, bubales, phacochères et babouins, ainsi qu'une avifaune très riche. L'aube et la fin d'après-midi sont les moments les plus favorables.",
        tips: "Respectez scrupuleusement les consignes des rangers et gardez vos distances avec les animaux. Vérifiez les conseils aux voyageurs pour le nord du Ghana et évitez la route de nuit.",
        bestPeriod: "Décembre à avril (saison sèche)",
        visitMinutes: 480,
        lat: 9.26,
        lng: -1.85,
        en: {
          name: "Walking and driving safaris in Mole",
          summary: "Elephants, antelopes and baboons seen on foot with a ranger.",
          description:
            "Safaris start from the park's visitor centre, perched on an escarpment overlooking waterholes where elephants often come to drink. On foot with an armed ranger or by vehicle, you can see elephants, kob, hartebeest, warthogs and baboons, along with very rich birdlife. Dawn and late afternoon are the best times.",
          tips: "Follow the rangers' instructions carefully and keep your distance from the animals. Check travel advice for northern Ghana and avoid driving at night.",
          bestPeriod: "December to April (dry season)",
        },
      },
      {
        slug: "mosquee-de-larabanga",
        category: "RELIGION",
        name: "Mosquée de Larabanga",
        summary: "Mosquée de terre de style soudano-sahélien, parmi les plus anciennes du pays.",
        description:
          "À quelques kilomètres de l'entrée du parc, le village de Larabanga abrite une petite mosquée blanche en banco hérissée de pièces de bois, de style soudano-sahélien. La tradition la fait remonter à plusieurs siècles, ce qui en fait l'une des plus anciennes mosquées du Ghana. Elle se découvre de l'extérieur, accompagné d'un guide du village.",
        tips: "Lieu de culte actif : tenue couvrante, visite extérieure, et ne venez pas pendant les prières. Passez par le guide officiel du village.",
        visitMinutes: 45,
        lat: 9.2197,
        lng: -1.8608,
        en: {
          name: "Larabanga Mosque",
          summary: "A Sudano-Sahelian earthen mosque, among the oldest in the country.",
          description:
            "A few kilometres from the park entrance, the village of Larabanga is home to a small white mud-brick mosque bristling with wooden beams, in the Sudano-Sahelian style. Tradition dates it back several centuries, making it one of the oldest mosques in Ghana. It is viewed from outside, accompanied by a village guide.",
          tips: "An active place of worship: wear covering clothes, view from outside and do not come during prayers. Go through the village's official guide.",
        },
      },
    ],
  },
];

export const GHANA_CIRCUITS: SeedCircuit[] = [
  {
    slug: "ghana-essentiel-8-jours",
    title: "Le Ghana essentiel en 8 jours",
    summary:
      "Accra et son histoire, les châteaux de Cape Coast et d'Elmina, la canopée de Kakum, les plages de Busua, puis Kumasi, cœur du royaume ashanti, et le lac Bosumtwi.",
    days: 8,
    cover: "/images/voyage/elmina",
    en: {
      title: "Essential Ghana in 8 days",
      summary:
        "Accra and its history, the castles of Cape Coast and Elmina, the Kakum canopy walkway, the beaches of Busua, then Kumasi, heart of the Ashanti kingdom, and Lake Bosumtwi.",
    },
    steps: [
      { day: 1, place: "parc-memorial-kwame-nkrumah", note: "Arrivée à Accra, premières visites dans le centre.", noteEn: "Arrival in Accra, first visits in the centre." },
      { day: 1, place: "jamestown-accra" },
      { day: 1, place: "osu-accra" },
      { day: 2, place: "marche-de-makola", note: "Matinée au marché puis route vers Cape Coast (environ 3 h).", noteEn: "Morning at the market, then drive to Cape Coast (about 3 h)." },
      { day: 2, place: "chateau-de-cape-coast" },
      { day: 3, place: "canopee-de-kakum", note: "Départ tôt pour Kakum, retour par Assin Manso.", noteEn: "Early start for Kakum, returning via Assin Manso." },
      { day: 3, place: "assin-manso" },
      { day: 4, place: "port-de-peche-d-elmina", note: "Matinée à Elmina, puis route vers Busua.", noteEn: "Morning in Elmina, then drive to Busua." },
      { day: 4, place: "chateau-d-elmina" },
      { day: 4, place: "fort-saint-jacques-elmina" },
      { day: 5, place: "plage-de-busua", note: "Journée de repos au bord de la mer.", noteEn: "A day of rest by the sea." },
      { day: 5, place: "fort-metal-cross-dixcove" },
      { day: 6, destination: "kumasi", note: "Longue route vers Kumasi (prévoir la journée, sans rouler de nuit).", noteEn: "Long drive to Kumasi (allow the whole day, without driving at night)." },
      { day: 7, place: "musee-du-palais-de-manhyia" },
      { day: 7, place: "bonwire-kente" },
      { day: 8, place: "lac-bosumtwi", note: "Matinée au lac, puis retour vers Accra par la route ou en avion.", noteEn: "Morning at the lake, then back to Accra by road or plane." },
    ],
  },
];
