/**
 * Contenu de départ du guide Sénégal (fr + en). Rédigé à partir de
 * connaissances générales et des conseils aux voyageurs officiels (France
 * Diplomatie, FCDO britannique) consultés en octobre 2026 : `reviewed = false`
 * partout → affiché « à relire » dans l'admin tant qu'une personne ne l'a pas
 * vérifié. Volontairement sans horaires ni tarifs (qui changent) : ces champs
 * restent à compléter.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const SENEGAL_GUIDE: SeedGuide = {
  country: "SN",
  intro:
    "Pays de la teranga, l'hospitalité sénégalaise, le Sénégal relie en quelques heures de route une capitale créative tournée vers l'océan, l'île-mémoire de Gorée, la ville coloniale de Saint-Louis, les mangroves du Sine-Saloum et les plages de Casamance, sur fond de musique mbalax, de grandes confréries soufies et de thiéboudienne partagé autour du plat commun.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Les ressortissants de nombreux pays, dont ceux de l'Union européenne et de la CEDEAO, sont actuellement dispensés de visa pour un court séjour ; d'autres nationalités doivent en demander un. Les règles évoluent : vérifiez toujours les conditions à jour auprès de l'ambassade du Sénégal ou des sources officielles avant le départ. Prévoyez un passeport valide plus de six mois, un billet retour et l'adresse de votre hébergement.",
    },
    {
      title: "Santé",
      body: "Depuis mars 2026, les preuves de vaccination ne sont plus exigées à l'entrée pour les voyageurs venant de pays sans épidémie, mais la vaccination contre la fièvre jaune reste fortement recommandée et les vaccins usuels (dont diphtérie et rougeole) doivent être à jour. Le paludisme est présent, surtout pendant et après la saison des pluies et dans le sud et l'est : demandez conseil à un médecin ou à un centre de vaccinations internationales et protégez-vous des moustiques. Buvez de l'eau en bouteille.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les distributeurs sont nombreux à Dakar et dans les villes touristiques ; ailleurs, prévoyez des espèces. Le paiement mobile (Wave, Orange Money) est omniprésent. Les cartes bancaires sont acceptées dans les hôtels et les commerces importants.",
    },
    {
      title: "Quand partir",
      body: "La saison sèche, de novembre à juin environ, est la plus agréable, avec des températures plus douces sur la côte de décembre à mars ; l'harmattan, vent sec et poussiéreux, souffle en hiver dans l'intérieur. La saison des pluies (environ juillet à octobre) apporte chaleur humide, orages et pistes difficiles, surtout dans le sud et l'est. Les oiseaux migrateurs du Djoudj s'observent de novembre à avril.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue officielle ; le wolof est la langue la plus parlée au quotidien, aux côtés du pulaar, du sérère, du diola, du mandingue et du soninké, entre autres. Quelques mots de wolof (« nanga def ? » pour « comment ça va ? », « jërëjëf » pour « merci ») sont toujours appréciés. La grande majorité des Sénégalais sont musulmans, souvent membres de confréries soufies : tenue couvrante dans les lieux religieux et hors des plages, discrétion pendant le ramadan. Demandez avant de photographier quelqu'un ; il est interdit de photographier les bâtiments officiels et militaires.",
    },
    {
      title: "Se déplacer",
      body: "À Dakar, taxis (prix à négocier avant de monter), bus Dakar Dem Dikk, TER (train express régional) et bus rapides BRT. Entre les villes : autoroutes autour de Dakar, bus, « sept-places » (taxis-brousse collectifs) et voitures avec chauffeur. Pour la Casamance, vols intérieurs vers Ziguinchor ou Cap Skirring, ou bateau de nuit Dakar–Ziguinchor. Évitez de rouler de nuit hors des villes : routes non éclairées, piétons et animaux sur la chaussée.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 230 V ; prises de type C, D, E et K : un adaptateur universel est utile. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au paiement mobile ; la couverture est bonne dans les villes et sur les grands axes.",
    },
    {
      title: "Sécurité",
      body: "Le Sénégal est l'un des pays les plus visités d'Afrique de l'Ouest et la plupart des séjours se passent sans encombre, mais quelques précautions s'imposent. France Diplomatie déconseille, sauf raison impérative, les zones frontalières avec le Mali et une partie de la frontière mauritanienne (département de Matam), ainsi que certaines bandes frontalières de la Casamance avec la Gambie et la Guinée-Bissau (hors grands axes) ; ne quittez pas les routes goudronnées dans ces secteurs (mines résiduelles, forêts). Le reste de la Casamance, dont Ziguinchor, Cap Skirring et la zone entre la route et le fleuve, se visite avec une vigilance renforcée, de jour et sur les axes principaux. Les autorités britanniques et françaises signalent aussi une hausse des vols et agressions à Dakar (Corniche le soir notamment) et dans certains sites touristiques, une menace terroriste qui ne peut être exclue, des manifestations parfois tendues et une mer très dangereuse sur la Grande Côte. Consultez avant le départ et pendant le voyage les conseils aux voyageurs de France Diplomatie (diplomatie.gouv.fr) et du FCDO britannique (gov.uk/foreign-travel-advice/senegal), ou ceux de votre pays.",
    },
  ],
  en: {
    intro:
      "Land of teranga, Senegalese hospitality, Senegal links within a few hours' drive a creative ocean-facing capital, the memorial island of Gorée, the colonial city of Saint-Louis, the mangroves of the Sine-Saloum and the beaches of Casamance, to a soundtrack of mbalax music, great Sufi brotherhoods and thieboudienne shared from a common bowl.",
    sections: [
      {
        title: "Entry requirements",
        body: "Nationals of many countries, including the European Union and ECOWAS, are currently exempt from visas for short stays; other nationalities must apply for one. Rules change: always check current requirements with the Senegalese embassy or official sources before leaving. Bring a passport valid for more than six months, a return ticket and your accommodation address.",
      },
      {
        title: "Health",
        body: "Since March 2026, proof of vaccination is no longer required on entry for travellers arriving from countries without an epidemic, but yellow fever vaccination is still strongly recommended and routine vaccines (including diphtheria and measles) should be up to date. Malaria is present, especially during and after the rainy season and in the south and east: ask a doctor or travel clinic for advice and protect yourself from mosquitoes. Drink bottled water.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). ATMs are plentiful in Dakar and the tourist towns; elsewhere, carry cash. Mobile payment (Wave, Orange Money) is everywhere. Bank cards are accepted in hotels and larger shops.",
      },
      {
        title: "When to go",
        body: "The dry season, roughly November to June, is the most pleasant, with milder temperatures on the coast from December to March; the harmattan, a dry, dusty wind, blows inland in winter. The rainy season (roughly July to October) brings humid heat, storms and difficult tracks, especially in the south and east. Migratory birds can be seen at Djoudj from November to April.",
      },
      {
        title: "Languages and customs",
        body: "French is the official language; Wolof is the most widely spoken language day to day, alongside Pulaar, Serer, Jola, Mandinka and Soninke, among others. A few words of Wolof (“nanga def?” for “how are you?”, “jërëjëf” for “thank you”) are always appreciated. The great majority of Senegalese are Muslim, often members of Sufi brotherhoods: wear covering clothes in religious places and away from the beach, and be discreet during Ramadan. Ask before photographing anyone; photographing official and military buildings is forbidden.",
      },
      {
        title: "Getting around",
        body: "In Dakar: taxis (agree the fare before getting in), Dakar Dem Dikk buses, the TER (regional express train) and BRT rapid buses. Between cities: motorways around Dakar, buses, “sept-places” (shared bush taxis) and cars with drivers. For Casamance, domestic flights to Ziguinchor or Cap Skirring, or the overnight boat from Dakar to Ziguinchor. Avoid driving at night outside towns: roads are unlit, with pedestrians and animals on the carriageway.",
      },
      {
        title: "Electricity and phone",
        body: "230 V; type C, D, E and K sockets: a universal adapter is useful. A local SIM card (ID required) gives access to mobile internet and mobile payment; coverage is good in towns and along main roads.",
      },
      {
        title: "Safety",
        body: "Senegal is one of the most visited countries in West Africa and most trips go smoothly, but a few precautions are needed. France Diplomatie advises against all but essential travel to the border areas with Mali and part of the Mauritanian border (Matam department), and to certain border strips of Casamance with The Gambia and Guinea-Bissau (away from main roads); do not leave paved roads in these areas (residual landmines, forests). The rest of Casamance, including Ziguinchor, Cap Skirring and the area between the road and the river, can be visited with heightened vigilance, by day and on main roads. British and French authorities also report rising theft and assaults in Dakar (notably on the Corniche at night) and at some tourist sites, a terrorist threat that cannot be ruled out, demonstrations that can turn tense, and a very dangerous sea along the Grande Côte. Before and during your trip, check the travel advice of France Diplomatie (diplomatie.gouv.fr) and the UK FCDO (gov.uk/foreign-travel-advice/senegal), or that of your own country.",
      },
    ],
  },
};

export const SENEGAL_DESTINATIONS: SeedDestination[] = [
  {
    slug: "dakar",
    name: "Dakar",
    region: "Dakar",
    summary: "Capitale vibrante à la pointe ouest de l'Afrique : musées, marchés, corniche et scène musicale.",
    description:
      "Posée sur la presqu'île du Cap-Vert, la pointe la plus occidentale du continent, Dakar est une capitale énergique et créative. On y vient pour ses musées, ses marchés, sa corniche face à l'océan, ses galeries et la Biennale de l'art africain contemporain (Dak'Art), sa scène musicale et ses restaurants où goûter yassa, mafé et thiéboudienne. C'est aussi le point de départ pour Gorée, le lac Rose et la Petite Côte.",
    lat: 14.6928,
    lng: -17.4467,
    en: {
      region: "Dakar",
      summary: "Vibrant capital on Africa's western tip: museums, markets, the Corniche and a music scene.",
      description:
        "Set on the Cap-Vert peninsula, the westernmost point of the continent, Dakar is an energetic, creative capital. People come for its museums, markets, ocean-facing Corniche, galleries and the Biennale of Contemporary African Art (Dak'Art), its music scene and its restaurants serving yassa, mafé and thieboudienne. It is also the starting point for Gorée, Lac Rose and the Petite Côte.",
    },
    places: [
      {
        slug: "musee-des-civilisations-noires",
        category: "MUSEUM",
        name: "Musée des Civilisations noires",
        summary: "Grand musée inauguré en 2018, consacré aux cultures de l'Afrique et de ses diasporas.",
        description:
          "Imaginé dès l'époque de Léopold Sédar Senghor et du Festival mondial des arts nègres de 1966, le Musée des Civilisations noires a ouvert ses portes en décembre 2018 dans un vaste bâtiment circulaire du centre de Dakar. Ses salles présentent les civilisations africaines, des origines de l'humanité aux créations contemporaines, ainsi que les liens avec les diasporas des Amériques et des Caraïbes.",
        visitMinutes: 120,
        en: {
          name: "Museum of Black Civilisations",
          summary: "Major museum opened in 2018, devoted to the cultures of Africa and its diasporas.",
          description:
            "First imagined in the days of Léopold Sédar Senghor and the 1966 World Festival of Black Arts, the Museum of Black Civilisations opened in December 2018 in a vast circular building in central Dakar. Its galleries present African civilisations from the origins of humankind to contemporary creations, as well as their links with the diasporas of the Americas and the Caribbean.",
        },
      },
      {
        slug: "monument-de-la-renaissance-africaine",
        category: "CULTURE",
        name: "Monument de la Renaissance africaine",
        summary: "Statue monumentale en bronze dominant la ville depuis l'une des collines des Mamelles.",
        description:
          "Inauguré en 2010 pour le cinquantenaire de l'indépendance, ce groupe de bronze d'une cinquantaine de mètres représente un homme, une femme et un enfant tournés vers l'océan. Controversé lors de sa construction, il est devenu l'un des repères de Dakar. Les marches qui y mènent offrent une belle vue sur la presqu'île et la côte, surtout en fin de journée.",
        visitMinutes: 60,
        lat: 14.7222,
        lng: -17.495,
        en: {
          name: "African Renaissance Monument",
          summary: "Monumental bronze statue overlooking the city from one of the Mamelles hills.",
          description:
            "Unveiled in 2010 for the fiftieth anniversary of independence, this bronze group, some fifty metres high, depicts a man, a woman and a child facing the ocean. Controversial when it was built, it has become one of Dakar's landmarks. The steps leading up to it offer a fine view of the peninsula and the coast, especially late in the day.",
        },
      },
      {
        slug: "marche-kermel-dakar",
        category: "MARKET",
        name: "Marché Kermel",
        summary: "Halle coloniale du Plateau : poissons, fruits, fleurs et artisanat.",
        description:
          "Au cœur du Plateau, le quartier d'affaires, le marché Kermel occupe une élégante halle circulaire de l'époque coloniale, reconstruite à l'identique après un incendie dans les années 1990. On y trouve poissons, fruits, légumes et fleurs, et, aux alentours, des étals d'artisanat, de paniers et de tissus. Plus calme que les grands marchés populaires comme Sandaga, c'est une bonne première approche.",
        tips: "Marchandez avec le sourire et méfiez-vous des rabatteurs trop insistants aux abords du marché.",
        visitMinutes: 60,
        en: {
          name: "Kermel Market",
          summary: "Colonial market hall in the Plateau: fish, fruit, flowers and crafts.",
          description:
            "In the heart of the Plateau, the business district, Kermel market occupies an elegant colonial-era circular hall, rebuilt identically after a fire in the 1990s. You will find fish, fruit, vegetables and flowers and, around it, stalls selling crafts, baskets and fabrics. Calmer than the big popular markets such as Sandaga, it makes a good first introduction.",
          tips: "Bargain with a smile and be wary of over-insistent touts around the market.",
        },
      },
      {
        slug: "mosquee-de-la-divinite-ouakam",
        category: "RELIGION",
        name: "Mosquée de la Divinité",
        summary: "Mosquée blanche aux deux minarets, posée face à l'océan sur la corniche de Ouakam.",
        description:
          "Bâtie au bord de l'Atlantique, au pied des falaises de Ouakam, la mosquée de la Divinité est l'une des images les plus photographiées de Dakar, avec ses deux minarets blancs se détachant sur l'océan. Le quartier de Ouakam, ancien village lébou de pêcheurs, garde une atmosphère de village au sein de la capitale.",
        tips: "Admirez-la de l'extérieur ou demandez l'autorisation d'entrer, en tenue couvrante et en dehors des heures de prière.",
        visitMinutes: 30,
        en: {
          name: "Mosque of the Divinity",
          summary: "White mosque with two minarets, facing the ocean on the Ouakam corniche.",
          description:
            "Built on the Atlantic shore at the foot of the Ouakam cliffs, the Mosque of the Divinity is one of Dakar's most photographed sights, its two white minarets standing out against the ocean. The Ouakam district, an old Lebou fishing village, keeps a village atmosphere within the capital.",
          tips: "Admire it from outside or ask permission to enter, wearing covering clothes and outside prayer times.",
        },
      },
    ],
  },
  {
    slug: "goree",
    name: "Île de Gorée",
    region: "Dakar",
    summary: "Petite île sans voitures face à Dakar, lieu de mémoire de la traite inscrit à l'UNESCO.",
    description:
      "À une vingtaine de minutes de chaloupe du port de Dakar, l'île de Gorée est l'un des premiers sites inscrits au patrimoine mondial de l'UNESCO (1978). Ruelles de sable, maisons coloniales aux façades ocre et bougainvillées contrastent avec l'histoire qu'elle incarne : celle de la traite atlantique, dont la Maison des Esclaves est devenue le symbole mondial. Sans voitures, l'île se parcourt à pied en une journée.",
    lat: 14.6672,
    lng: -17.3983,
    cover: "/images/voyage/goree",
    en: {
      name: "Gorée Island",
      region: "Dakar",
      summary: "Small car-free island off Dakar, a UNESCO-listed place of remembrance of the slave trade.",
      description:
        "Some twenty minutes by ferry from Dakar harbour, Gorée Island was one of the first sites inscribed on the UNESCO World Heritage List (1978). Sandy lanes, ochre colonial houses and bougainvillea contrast with the history it embodies: that of the Atlantic slave trade, of which the House of Slaves has become a worldwide symbol. Car-free, the island can be explored on foot in a day.",
    },
    places: [
      {
        slug: "maison-des-esclaves-goree",
        category: "HISTORY",
        name: "Maison des Esclaves",
        summary: "Demeure de la fin du XVIIIe siècle devenue mémorial de la traite, avec sa « porte du voyage sans retour ».",
        description:
          "Construite à la fin du XVIIIe siècle, la Maison des Esclaves présente, au rez-de-chaussée, des cellules sombres et un couloir ouvrant sur l'océan, la « porte du voyage sans retour ». Le rôle exact de cette maison dans la traite fait débat parmi les historiens, mais elle est devenue un lieu de mémoire universel, visité par de nombreux chefs d'État et des visiteurs du monde entier. Un moment de recueillement intense.",
        tips: "Venez tôt pour éviter l'affluence des groupes ; un guide local aide à replacer le lieu dans l'histoire de la traite.",
        visitMinutes: 60,
        en: {
          name: "House of Slaves",
          summary: "Late 18th-century house turned memorial to the slave trade, with its “door of no return”.",
          description:
            "Built in the late 18th century, the House of Slaves has dark cells on the ground floor and a corridor opening onto the ocean, the “door of no return”. The exact role of this house in the slave trade is debated among historians, but it has become a universal place of remembrance, visited by many heads of state and visitors from around the world. A moment of intense reflection.",
          tips: "Come early to avoid the tour groups; a local guide helps place the site within the history of the slave trade.",
        },
      },
      {
        slug: "musee-historique-goree",
        category: "MUSEUM",
        name: "Musée historique du Sénégal à Gorée",
        summary: "Installé dans le fort d'Estrées, il retrace l'histoire du pays de la préhistoire à l'indépendance.",
        description:
          "À la pointe nord de l'île, le fort d'Estrées, bâti au XIXe siècle, abrite le musée historique rattaché à l'IFAN (Institut fondamental d'Afrique noire). Ses salles parcourent l'histoire du territoire sénégalais : préhistoire, grands royaumes, islam, traite, colonisation et indépendance. Un bon complément à la visite de la Maison des Esclaves.",
        visitMinutes: 60,
        en: {
          name: "Historical Museum of Senegal in Gorée",
          summary: "Housed in Fort d'Estrées, it traces the country's history from prehistory to independence.",
          description:
            "At the northern tip of the island, Fort d'Estrées, built in the 19th century, houses the historical museum run by IFAN (Fundamental Institute of Black Africa). Its rooms cover the history of Senegalese territory: prehistory, great kingdoms, Islam, the slave trade, colonisation and independence. A good complement to the House of Slaves.",
        },
      },
      {
        slug: "castel-de-goree",
        category: "NATURE",
        name: "Le Castel",
        summary: "Plateau rocheux au sud de l'île, anciennes batteries d'artillerie et vue sur Dakar.",
        description:
          "Le Castel, point culminant de l'île, est un plateau rocheux qui conserve d'anciennes fortifications et pièces d'artillerie. Artistes et artisans y exposent souvent leurs œuvres. On y monte par des ruelles et des escaliers pour profiter de la vue sur l'île, l'océan et les tours de Dakar.",
        visitMinutes: 45,
        en: {
          name: "The Castel",
          summary: "Rocky plateau in the south of the island, old gun batteries and views of Dakar.",
          description:
            "The Castel, the island's highest point, is a rocky plateau that still holds old fortifications and artillery pieces. Artists and craftspeople often display their work there. You climb up through lanes and steps to enjoy the view over the island, the ocean and Dakar's skyline.",
        },
      },
    ],
  },
  {
    slug: "lac-rose",
    name: "Lac Rose (lac Retba)",
    region: "Dakar",
    summary: "Lagune salée aux reflets roses, récolte artisanale du sel et dunes au bord de l'océan.",
    description:
      "À une trentaine de kilomètres au nord-est de Dakar, le lac Retba, dit lac Rose, doit sa couleur à une micro-algue qui prospère dans ses eaux très salées ; la teinte est la plus marquée en saison sèche, sous le soleil. Ancienne arrivée du rallye Paris-Dakar, le site est connu pour ses récolteurs de sel et ses dunes qui le séparent de l'océan.",
    lat: 14.8386,
    lng: -17.2341,
    cover: "/images/voyage/lac-rose",
    en: {
      name: "Lac Rose (Lake Retba)",
      region: "Dakar",
      summary: "Salty lagoon with pink hues, traditional salt harvesting and dunes by the ocean.",
      description:
        "Some thirty kilometres north-east of Dakar, Lake Retba, known as Lac Rose (the Pink Lake), owes its colour to a micro-alga that thrives in its very salty water; the hue is strongest in the dry season, in full sun. Once the finish line of the Paris-Dakar rally, the site is known for its salt harvesters and the dunes separating it from the ocean.",
    },
    places: [
      {
        slug: "lac-retba",
        category: "NATURE",
        name: "Lac Retba et la récolte du sel",
        summary: "Observer les récolteurs de sel en pirogue et les monticules blancs au bord du lac.",
        description:
          "Sur le lac, des hommes et des femmes extraient le sel à la main depuis des pirogues, puis le stockent en monticules sur la rive ; ils s'enduisent la peau de beurre de karité pour se protéger de la salinité. Un tour en pirogue permet de voir ce travail de près et de mesurer la densité de l'eau.",
        tips: "La couleur est la plus nette vers la mi-journée en saison sèche. France Diplomatie signale des agressions sur ce site : évitez les coins isolés et ne vous y attardez pas à la nuit tombée.",
        bestPeriod: "Saison sèche (novembre à juin)",
        visitMinutes: 120,
        en: {
          name: "Lake Retba and salt harvesting",
          summary: "Watch the salt harvesters in their pirogues and the white mounds along the shore.",
          description:
            "On the lake, men and women extract salt by hand from pirogues, then pile it into mounds on the shore; they coat their skin with shea butter to protect it from the salt. A pirogue trip lets you watch this work up close and feel how dense the water is.",
          tips: "The colour is clearest around midday in the dry season. France Diplomatie reports assaults at this site: avoid isolated spots and do not linger after dark.",
          bestPeriod: "Dry season (November to June)",
        },
      },
      {
        slug: "dunes-du-lac-rose",
        category: "LEISURE",
        name: "Dunes du lac Rose",
        summary: "Balade en 4x4, quad ou dromadaire dans les dunes, jusqu'à la plage de l'océan.",
        description:
          "Entre le lac et l'Atlantique s'étend un cordon de dunes que l'on traverse en 4x4, en quad, à cheval ou à dos de dromadaire, jusqu'à la longue plage de la Grande Côte. Une sortie ludique, appréciée en famille, à combiner avec la visite des récolteurs de sel.",
        tips: "Ne vous baignez pas : sur la Grande Côte, la mer est dangereuse et rarement surveillée. Choisissez un prestataire sérieux et exigez casque et équipement pour le quad.",
        visitMinutes: 120,
        en: {
          name: "Lac Rose dunes",
          summary: "4x4, quad or camel ride through the dunes to the ocean beach.",
          description:
            "Between the lake and the Atlantic lies a belt of dunes that you can cross by 4x4, quad bike, on horseback or by camel, all the way to the long beach of the Grande Côte. A fun outing, popular with families, to combine with a visit to the salt harvesters.",
          tips: "Do not swim: along the Grande Côte the sea is dangerous and rarely supervised. Choose a reputable operator and insist on a helmet and gear for quad biking.",
        },
      },
    ],
  },
  {
    slug: "saint-louis",
    name: "Saint-Louis",
    region: "Saint-Louis",
    summary: "Ancienne capitale coloniale sur une île du fleuve Sénégal, classée à l'UNESCO.",
    description:
      "Fondée au XVIIe siècle sur une île de l'embouchure du fleuve Sénégal, Saint-Louis fut la capitale de la colonie du Sénégal et un temps de l'Afrique-Occidentale française. Son île, reliée au continent par le pont Faidherbe, est inscrite au patrimoine mondial de l'UNESCO pour ses maisons à balcons et son plan régulier. Ville de musique, de pêche et de mémoire, elle est aussi la porte des parcs du Djoudj et de la Langue de Barbarie. À environ 4 h de route de Dakar.",
    lat: 16.0179,
    lng: -16.4896,
    cover: "/images/voyage/saint-louis",
    en: {
      region: "Saint-Louis",
      summary: "Former colonial capital on an island in the Senegal river, a UNESCO World Heritage Site.",
      description:
        "Founded in the 17th century on an island at the mouth of the Senegal river, Saint-Louis was the capital of the colony of Senegal and for a time of French West Africa. Its island, linked to the mainland by the Faidherbe bridge, is a UNESCO World Heritage Site for its balconied houses and regular street plan. A city of music, fishing and memory, it is also the gateway to the Djoudj and Langue de Barbarie parks. About 4 hours' drive from Dakar.",
    },
    places: [
      {
        slug: "ile-de-saint-louis",
        category: "HISTORY",
        name: "Île de Saint-Louis et pont Faidherbe",
        summary: "Promenade dans la ville historique aux maisons à balcons, de part et d'autre du pont Faidherbe.",
        description:
          "Le pont Faidherbe, structure métallique de la fin du XIXe siècle longue d'environ 500 mètres, mène à l'île classée. On y flâne entre maisons coloniales à balcons de bois et cours intérieures, places ombragées, cathédrale et mosquée, et quais sur le fleuve. En face, sur la Langue de Barbarie, le quartier de pêcheurs de Guet Ndar offre un spectacle saisissant de pirogues peintes. Le tour en calèche est une façon classique de découvrir la ville.",
        tips: "Demandez avant de photographier à Guet Ndar, quartier de vie et de travail très animé.",
        visitMinutes: 180,
        lat: 16.0244,
        lng: -16.5046,
        en: {
          name: "Saint-Louis Island and Faidherbe Bridge",
          summary: "A stroll through the historic town of balconied houses, on either side of the Faidherbe bridge.",
          description:
            "The Faidherbe bridge, a late 19th-century metal structure some 500 metres long, leads onto the listed island. You wander among colonial houses with wooden balconies and inner courtyards, shady squares, the cathedral and the mosque, and quays along the river. Opposite, on the Langue de Barbarie, the fishing district of Guet Ndar offers a striking display of painted pirogues. A horse-drawn carriage tour is a classic way to discover the town.",
          tips: "Ask before taking photos in Guet Ndar, a very busy place where people live and work.",
        },
      },
      {
        slug: "thieboudienne-saint-louis",
        category: "GASTRONOMY",
        name: "Le thiéboudienne de Saint-Louis",
        summary: "Le plat national, riz au poisson et aux légumes, dont Saint-Louis revendique la paternité.",
        description:
          "Riz cuit dans un bouillon de poisson et de tomate, servi avec poisson farci, légumes (manioc, chou, carotte, aubergine) et sauces, le thiéboudienne (ceebu jën en wolof) est le plat emblématique du Sénégal ; il a été inscrit en 2021 au patrimoine culturel immatériel de l'UNESCO. La tradition en attribue l'invention à Saint-Louis. On le déguste à midi, souvent partagé dans un grand plat commun.",
        tips: "Le thiéboudienne se mange surtout au déjeuner : de nombreux restaurants n'en préparent plus le soir.",
        visitMinutes: 90,
        en: {
          name: "Saint-Louis thieboudienne",
          summary: "The national dish of rice with fish and vegetables, which Saint-Louis claims as its own.",
          description:
            "Rice cooked in a fish and tomato broth, served with stuffed fish, vegetables (cassava, cabbage, carrot, aubergine) and sauces, thieboudienne (ceebu jën in Wolof) is Senegal's signature dish; it was added to UNESCO's Intangible Cultural Heritage list in 2021. Tradition credits Saint-Louis with its invention. It is eaten at lunchtime, often shared from a large common bowl.",
          tips: "Thieboudienne is mostly a lunchtime dish: many restaurants no longer serve it in the evening.",
        },
      },
      {
        slug: "parc-national-langue-de-barbarie",
        category: "NATURE",
        name: "Parc national de la Langue de Barbarie",
        summary: "Flèche de sable entre fleuve et océan, refuge d'oiseaux à découvrir en pirogue.",
        description:
          "Au sud de Saint-Louis, la Langue de Barbarie est une étroite bande de sable entre l'embouchure du fleuve Sénégal et l'Atlantique. Le parc national protège des colonies d'oiseaux (sternes, goélands, pélicans, cormorans) et des sites de ponte de tortues marines. Les excursions en pirogue partent généralement de Gandiol. Le cordon dunaire a été profondément modifié par l'ouverture d'une brèche en 2003, et l'érosion y est forte.",
        bestPeriod: "Novembre à juin",
        visitMinutes: 180,
        lat: 15.9,
        lng: -16.5,
        en: {
          name: "Langue de Barbarie National Park",
          summary: "Sand spit between river and ocean, a bird refuge explored by pirogue.",
          description:
            "South of Saint-Louis, the Langue de Barbarie is a narrow strip of sand between the mouth of the Senegal river and the Atlantic. The national park protects bird colonies (terns, gulls, pelicans, cormorants) and sea-turtle nesting sites. Pirogue trips usually leave from Gandiol. The spit was profoundly altered when a breach was opened in 2003, and erosion is severe.",
          bestPeriod: "November to June",
        },
      },
      {
        slug: "parc-national-oiseaux-djoudj",
        category: "NATURE",
        name: "Parc national des oiseaux du Djoudj",
        summary: "Zone humide classée à l'UNESCO, l'un des grands sanctuaires d'oiseaux migrateurs au sud du Sahara.",
        description:
          "À environ 60 km au nord de Saint-Louis, dans le delta du fleuve Sénégal, le parc du Djoudj est inscrit au patrimoine mondial de l'UNESCO depuis 1981. Ses lacs, marigots et roselières accueillent chaque hiver des centaines de milliers d'oiseaux venus d'Europe, ainsi que de grandes colonies de pélicans blancs et de flamants. La sortie en pirogue au milieu des pélicans est le moment fort de la visite.",
        tips: "Venez tôt le matin avec jumelles et protection solaire ; renseignez-vous sur l'état de la piste après la saison des pluies.",
        bestPeriod: "Novembre à avril (oiseaux migrateurs)",
        visitMinutes: 240,
        lat: 16.36,
        lng: -16.27,
        en: {
          name: "Djoudj National Bird Sanctuary",
          summary: "UNESCO-listed wetland, one of the great migratory-bird sanctuaries south of the Sahara.",
          description:
            "Some 60 km north of Saint-Louis, in the Senegal river delta, Djoudj park has been a UNESCO World Heritage Site since 1981. Every winter its lakes, creeks and reed beds host hundreds of thousands of birds from Europe, as well as large colonies of great white pelicans and flamingos. A pirogue trip among the pelicans is the highlight of the visit.",
          tips: "Come early in the morning with binoculars and sun protection; check the state of the track after the rainy season.",
          bestPeriod: "November to April (migratory birds)",
        },
      },
    ],
  },
  {
    slug: "touba",
    name: "Touba",
    region: "Diourbel",
    summary: "Ville sainte du mouridisme, autour de l'une des plus grandes mosquées d'Afrique de l'Ouest.",
    description:
      "Fondée à la fin du XIXe siècle par Cheikh Ahmadou Bamba, fondateur de la confrérie soufie des Mourides, Touba est la deuxième ville du pays et un haut lieu spirituel. Elle bénéficie d'un statut particulier : l'alcool et le tabac y sont interdits. Sa Grande Mosquée attire des visiteurs toute l'année et, lors du Grand Magal, des foules immenses de pèlerins. À environ 3 h de route de Dakar.",
    lat: 14.85,
    lng: -15.8833,
    cover: "/images/voyage/touba",
    en: {
      region: "Diourbel",
      summary: "Holy city of the Mouride brotherhood, around one of West Africa's largest mosques.",
      description:
        "Founded in the late 19th century by Cheikh Ahmadou Bamba, founder of the Mouride Sufi brotherhood, Touba is the country's second city and a major spiritual centre. It has a special status: alcohol and tobacco are banned there. Its Great Mosque draws visitors all year round and, during the Grand Magal, immense crowds of pilgrims. About 3 hours' drive from Dakar.",
    },
    places: [
      {
        slug: "grande-mosquee-touba",
        category: "RELIGION",
        name: "Grande Mosquée de Touba",
        summary: "Immense mosquée au haut minaret, abritant le mausolée de Cheikh Ahmadou Bamba.",
        description:
          "Inaugurée en 1963 et agrandie depuis, la Grande Mosquée de Touba, avec ses coupoles, ses marbres et son haut minaret central, abrite le mausolée de Cheikh Ahmadou Bamba. Les visiteurs non musulmans peuvent généralement la visiter, accompagnés d'un guide de la communauté, en respectant strictement les règles du lieu.",
        tips: "Tenue couvrante (bras et jambes), foulard pour les femmes ; pas d'alcool ni de cigarettes dans la ville. Passez par un guide présent sur place et évitez les heures de prière.",
        visitMinutes: 90,
        en: {
          name: "Great Mosque of Touba",
          summary: "Huge mosque with a tall minaret, housing the mausoleum of Cheikh Ahmadou Bamba.",
          description:
            "Inaugurated in 1963 and enlarged since, the Great Mosque of Touba, with its domes, marble and tall central minaret, houses the mausoleum of Cheikh Ahmadou Bamba. Non-Muslim visitors can usually visit, accompanied by a guide from the community, while strictly respecting the rules of the place.",
          tips: "Covering clothes (arms and legs), headscarf for women; no alcohol or cigarettes in the city. Go with one of the guides on site and avoid prayer times.",
        },
      },
      {
        slug: "grand-magal-de-touba",
        category: "FESTIVAL",
        name: "Grand Magal de Touba",
        summary: "Le plus grand pèlerinage du pays, en souvenir du départ en exil de Cheikh Ahmadou Bamba.",
        description:
          "Chaque année, le 18 du mois de safar du calendrier musulman, le Grand Magal commémore le départ en exil de Cheikh Ahmadou Bamba, déporté par l'administration coloniale au Gabon en 1895. Des millions de pèlerins convergent vers Touba pour prier, se recueillir et partager des repas offerts. La date avance d'environ onze jours chaque année par rapport au calendrier grégorien.",
        tips: "Une expérience impressionnante mais très dense : routes saturées et hébergement introuvable. Pour une première visite de Touba, préférez une autre période.",
        bestPeriod: "18 safar (date variable selon le calendrier lunaire)",
        visitMinutes: 480,
        en: {
          name: "Grand Magal of Touba",
          summary: "The country's largest pilgrimage, commemorating Cheikh Ahmadou Bamba's departure into exile.",
          description:
            "Every year, on the 18th of the month of Safar in the Islamic calendar, the Grand Magal commemorates the departure into exile of Cheikh Ahmadou Bamba, deported to Gabon by the colonial administration in 1895. Millions of pilgrims converge on Touba to pray, reflect and share free meals. The date moves about eleven days earlier each year in the Gregorian calendar.",
          tips: "An impressive but very crowded experience: roads are jammed and accommodation impossible to find. For a first visit to Touba, choose another time.",
          bestPeriod: "18 Safar (date varies with the lunar calendar)",
        },
      },
    ],
  },
  {
    slug: "petite-cote",
    name: "La Petite Côte",
    region: "Thiès",
    summary: "Le littoral balnéaire au sud de Dakar : plages, villages de pêcheurs et l'île aux coquillages de Fadiouth.",
    description:
      "Entre Dakar et le delta du Saloum, la Petite Côte aligne stations balnéaires (Saly, Somone), villages de pêcheurs et lagunes. La mer y est plus calme que sur la Grande Côte, au nord. On y vient pour se reposer, mais aussi pour la réserve de Bandia et pour Joal-Fadiouth, ville natale de Léopold Sédar Senghor. Proche de l'aéroport international Blaise-Diagne, c'est une étape pratique en début ou fin de séjour.",
    lat: 14.4469,
    lng: -17.0122,
    en: {
      name: "The Petite Côte",
      region: "Thiès",
      summary: "The seaside coast south of Dakar: beaches, fishing villages and the shell island of Fadiouth.",
      description:
        "Between Dakar and the Saloum delta, the Petite Côte strings together resorts (Saly, Somone), fishing villages and lagoons. The sea is calmer here than on the Grande Côte to the north. People come to relax, but also for the Bandia reserve and for Joal-Fadiouth, birthplace of Léopold Sédar Senghor. Close to Blaise Diagne International Airport, it is a handy stop at the start or end of a trip.",
    },
    places: [
      {
        slug: "plage-de-saly",
        category: "BEACH",
        name: "Plage de Saly",
        summary: "La grande station balnéaire du pays : hôtels, restaurants et activités nautiques.",
        description:
          "Saly concentre une grande partie de l'offre balnéaire du Sénégal : hôtels en bord de plage, restaurants, golf et activités nautiques. Au nord, la lagune de la Somone, avec sa mangrove et ses oiseaux, offre une alternative plus paisible, à découvrir en pirogue.",
        tips: "France Diplomatie appelle à la prudence sur la côte de la Somone et de Saly à Joal (agressions, cambriolages de villas de location) : choisissez un hébergement gardé et évitez la plage isolée la nuit.",
        visitMinutes: 240,
        lat: 14.4469,
        lng: -17.0122,
        en: {
          name: "Saly Beach",
          summary: "The country's main seaside resort: hotels, restaurants and water sports.",
          description:
            "Saly concentrates much of Senegal's beach tourism: beachfront hotels, restaurants, golf and water sports. To the north, the Somone lagoon, with its mangrove and birds, offers a quieter alternative to explore by pirogue.",
          tips: "France Diplomatie urges caution along the coast from Somone and Saly to Joal (assaults, burglaries of rental villas): choose guarded accommodation and avoid isolated beaches at night.",
        },
      },
      {
        slug: "reserve-de-bandia",
        category: "LEISURE",
        name: "Réserve de Bandia",
        summary: "Réserve animalière parmi les baobabs : girafes, rhinocéros, buffles et antilopes.",
        description:
          "Près de Sindia, à environ une heure de Dakar, la réserve privée de Bandia a réintroduit dans une savane plantée de baobabs des espèces disparues de la région ou venues d'autres pays d'Afrique : girafes, rhinocéros, buffles, zèbres et plusieurs antilopes, aux côtés de singes et de tortues. Le safari se fait en véhicule avec un guide. Une bonne découverte de la faune, accessible en demi-journée.",
        visitMinutes: 180,
        en: {
          name: "Bandia Reserve",
          summary: "Wildlife reserve among baobabs: giraffes, rhinos, buffalo and antelopes.",
          description:
            "Near Sindia, about an hour from Dakar, the private Bandia reserve has reintroduced species that had vanished from the region or come from other African countries into a savannah dotted with baobabs: giraffes, rhinos, buffalo, zebras and several antelopes, alongside monkeys and tortoises. The safari is done by vehicle with a guide. A good wildlife introduction, easily done in half a day.",
        },
      },
      {
        slug: "ile-de-fadiouth",
        category: "CULTURE",
        name: "Île de Fadiouth",
        summary: "Île faite de coquillages, reliée à Joal par une passerelle, avec son cimetière mixte.",
        description:
          "Reliée à Joal par une longue passerelle en bois, Fadiouth est une île dont le sol est formé de coquillages accumulés au fil des siècles. Ruelles sans voitures, greniers à mil sur pilotis et, sur une île voisine, un cimetière où chrétiens et musulmans reposent côte à côte, symbole de la coexistence religieuse sénégalaise. Joal est aussi la ville natale du poète et président Léopold Sédar Senghor.",
        tips: "Passez par les guides officiels à l'entrée de la passerelle ; une contribution est généralement demandée.",
        visitMinutes: 120,
        lat: 14.1508,
        lng: -16.8253,
        en: {
          name: "Fadiouth Island",
          summary: "Island made of shells, linked to Joal by a footbridge, with its shared cemetery.",
          description:
            "Linked to Joal by a long wooden footbridge, Fadiouth is an island whose ground is made of shells accumulated over the centuries. Car-free lanes, millet granaries on stilts and, on a neighbouring island, a cemetery where Christians and Muslims lie side by side, a symbol of Senegal's religious coexistence. Joal is also the birthplace of the poet and president Léopold Sédar Senghor.",
          tips: "Use the official guides at the start of the footbridge; a contribution is usually requested.",
        },
      },
    ],
  },
  {
    slug: "sine-saloum",
    name: "Delta du Sine-Saloum",
    region: "Fatick",
    summary: "Labyrinthe de mangroves, d'îles et de bolongs, classé à l'UNESCO, à explorer en pirogue.",
    description:
      "Là où les fleuves Sine et Saloum rejoignent l'océan, le delta forme un dédale de bras de mer (bolongs), de mangroves et d'îles habitées par des pêcheurs sérères et niominkas. Réserve de biosphère, il est inscrit au patrimoine mondial de l'UNESCO pour ses amas coquilliers et tumulus funéraires laissés par des générations d'habitants. Campements à Palmarin, Ndangane, Foundiougne ou Toubakouta servent de base pour les sorties en pirogue.",
    lat: 14.1333,
    lng: -16.4667,
    en: {
      name: "Sine-Saloum Delta",
      region: "Fatick",
      summary: "A UNESCO-listed maze of mangroves, islands and bolongs, explored by pirogue.",
      description:
        "Where the Sine and Saloum rivers meet the ocean, the delta forms a maze of tidal channels (bolongs), mangroves and islands inhabited by Serer and Niominka fishing communities. A biosphere reserve, it is a UNESCO World Heritage Site for the shell middens and burial mounds left by generations of inhabitants. Lodges at Palmarin, Ndangane, Foundiougne or Toubakouta serve as bases for pirogue trips.",
    },
    places: [
      {
        slug: "bolongs-du-saloum",
        category: "NATURE",
        name: "Bolongs et îles du Saloum",
        summary: "Sortie en pirogue dans la mangrove, entre villages insulaires, oiseaux et amas de coquillages.",
        description:
          "Une journée en pirogue mène à travers les bolongs bordés de palétuviers jusqu'aux villages des îles, aux bancs de sable et aux amas coquilliers. On y observe hérons, aigrettes, pélicans et, avec un peu de chance, des dauphins à l'embouchure. La récolte des huîtres de palétuvier et la pêche rythment la vie des habitants.",
        tips: "Partez avec un piroguier recommandé par votre campement, avec gilets de sauvetage, chapeau et eau.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 360,
        en: {
          name: "Saloum bolongs and islands",
          summary: "Pirogue trip through the mangroves, among island villages, birds and shell middens.",
          description:
            "A day by pirogue takes you through mangrove-lined bolongs to island villages, sandbanks and shell middens. You can spot herons, egrets, pelicans and, with luck, dolphins at the river mouth. Harvesting mangrove oysters and fishing set the pace of life for the inhabitants.",
          tips: "Go with a boatman recommended by your lodge, with life jackets, a hat and water.",
          bestPeriod: "November to May",
        },
      },
      {
        slug: "reserve-de-fathala",
        category: "NATURE",
        name: "Réserve de Fathala",
        summary: "Réserve de faune en forêt sèche, près de Toubakouta : girafes, rhinocéros, élands de Derby.",
        description:
          "Au sud du delta, près de Toubakouta, la réserve de Fathala occupe une partie de la forêt de Fathala, rattachée au parc national du Delta du Saloum. On y observe en véhicule, avec un guide, girafes, rhinocéros, buffles, singes et plusieurs antilopes, dont le rare élan de Derby. Une belle sortie complémentaire aux balades en pirogue.",
        visitMinutes: 180,
        en: {
          name: "Fathala Reserve",
          summary: "Wildlife reserve in dry forest near Toubakouta: giraffes, rhinos, Derby elands.",
          description:
            "South of the delta, near Toubakouta, the Fathala reserve covers part of the Fathala forest, attached to the Saloum Delta National Park. By vehicle and with a guide you can see giraffes, rhinos, buffalo, monkeys and several antelopes, including the rare Derby eland. A good complement to pirogue trips.",
        },
      },
    ],
  },
  {
    slug: "basse-casamance",
    name: "Basse-Casamance",
    region: "Ziguinchor",
    summary: "Rizières, forêts, villages diola et plages de Cap Skirring, au sud de la Gambie.",
    description:
      "Séparée du nord du pays par la Gambie, la Basse-Casamance est la région la plus verte du Sénégal : fleuve bordé de mangroves, rizières, fromagers géants et villages diola aux traditions vivaces (royaume d'Oussouye, cases à impluvium). Ziguinchor, sa capitale, est reliée à Dakar par avion et par bateau ; Cap Skirring est la grande station balnéaire du sud. La région se visite avec une vigilance renforcée et certaines zones frontalières sont déconseillées : restez sur les axes principaux et suivez les conseils aux voyageurs.",
    lat: 12.5833,
    lng: -16.2719,
    en: {
      name: "Lower Casamance",
      region: "Ziguinchor",
      summary: "Rice paddies, forests, Jola villages and the beaches of Cap Skirring, south of The Gambia.",
      description:
        "Separated from the north of the country by The Gambia, Lower Casamance is Senegal's greenest region: a river lined with mangroves, rice paddies, giant kapok trees and Jola villages with living traditions (the kingdom of Oussouye, impluvium houses). Ziguinchor, its capital, is linked to Dakar by air and boat; Cap Skirring is the south's main beach resort. The region should be visited with heightened vigilance and some border areas are advised against: stay on main roads and follow travel advice.",
    },
    places: [
      {
        slug: "plage-de-cap-skirring",
        category: "BEACH",
        name: "Plage de Cap Skirring",
        summary: "Longues plages de sable fin bordées de cocotiers, au bout de la route de Ziguinchor.",
        description:
          "À l'extrémité sud-ouest du pays, Cap Skirring offre de longues plages de sable clair, des cocoteraies et des villages de pêcheurs. Hôtels et campements permettent d'y séjourner plusieurs jours, entre baignade, balades à vélo vers les villages voisins et poisson grillé. France Diplomatie indique que la zone hôtelière de Cap Skirring ne présente pas de danger particulier.",
        tips: "Baignez-vous près des zones fréquentées et renseignez-vous sur les courants avant d'aller à l'eau.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 240,
        lat: 12.3925,
        lng: -16.7461,
        en: {
          name: "Cap Skirring Beach",
          summary: "Long fine-sand beaches lined with palms, at the end of the road from Ziguinchor.",
          description:
            "At the country's south-western tip, Cap Skirring offers long pale-sand beaches, coconut groves and fishing villages. Hotels and lodges make it easy to stay several days, swimming, cycling to nearby villages and eating grilled fish. France Diplomatie states that the Cap Skirring hotel area presents no particular danger.",
          tips: "Swim near busy areas and ask about currents before going in.",
          bestPeriod: "November to May",
        },
      },
      {
        slug: "ile-de-carabane",
        category: "HISTORY",
        name: "Île de Carabane",
        summary: "Ancien comptoir français à l'embouchure du fleuve Casamance, accessible en pirogue.",
        description:
          "À l'embouchure de la Casamance, l'île de Carabane fut un comptoir français à partir du XIXe siècle. On y découvre les vestiges de cette époque (ancienne mission catholique, église, cimetière), un village paisible sans voitures et des plages bordées de palmiers. On y accède en pirogue, notamment depuis Elinkine ou Ziguinchor.",
        visitMinutes: 300,
        lat: 12.5367,
        lng: -16.7006,
        en: {
          name: "Carabane Island",
          summary: "Former French trading post at the mouth of the Casamance river, reached by pirogue.",
          description:
            "At the mouth of the Casamance, Carabane Island was a French trading post from the 19th century. You can discover relics of that era (former Catholic mission, church, cemetery), a peaceful car-free village and palm-fringed beaches. It is reached by pirogue, notably from Elinkine or Ziguinchor.",
        },
      },
      {
        slug: "case-a-impluvium-enampore",
        category: "CULTURE",
        name: "Case à impluvium d'Enampore",
        summary: "Grande maison diola en terre dont le toit recueille l'eau de pluie au centre.",
        description:
          "Habitat traditionnel diola, la case à impluvium est une vaste maison circulaire en banco dont le toit de chaume, en entonnoir, recueille l'eau de pluie dans un bassin central. Plusieurs familles y vivaient autour de cette cour intérieure. À Enampore, entre Ziguinchor et Oussouye, une case se visite et accueille parfois les voyageurs. Une belle introduction à la culture diola.",
        tips: "Venez de jour depuis la route principale Ziguinchor–Oussouye, avec un guide ou un chauffeur local.",
        visitMinutes: 90,
        en: {
          name: "Enampore impluvium house",
          summary: "Large Jola earthen house whose roof collects rainwater in the centre.",
          description:
            "A traditional Jola dwelling, the impluvium house is a vast circular mud-brick house whose funnel-shaped thatched roof collects rainwater in a central basin. Several families once lived around this inner courtyard. In Enampore, between Ziguinchor and Oussouye, one house is open to visitors and sometimes hosts travellers. A fine introduction to Jola culture.",
          tips: "Go by day from the main Ziguinchor–Oussouye road, with a local guide or driver.",
        },
      },
    ],
  },
];

export const SENEGAL_CIRCUITS: SeedCircuit[] = [
  {
    slug: "senegal-essentiel-8-jours",
    title: "Le Sénégal essentiel en 8 jours",
    summary:
      "De Dakar et Gorée au lac Rose, de Saint-Louis et des oiseaux du Djoudj à la ville sainte de Touba, puis repos sur la Petite Côte, près de l'aéroport.",
    days: 8,
    cover: "/images/voyage/goree",
    en: {
      title: "Essential Senegal in 8 days",
      summary:
        "From Dakar and Gorée to Lac Rose, from Saint-Louis and the birds of Djoudj to the holy city of Touba, then rest on the Petite Côte, close to the airport.",
    },
    steps: [
      { day: 1, place: "musee-des-civilisations-noires", note: "Arrivée, installation et premier contact avec Dakar.", noteEn: "Arrival, check-in and a first feel for Dakar." },
      { day: 1, place: "marche-kermel-dakar" },
      { day: 1, place: "monument-de-la-renaissance-africaine", note: "Coucher de soleil sur la presqu'île.", noteEn: "Sunset over the peninsula." },
      { day: 2, place: "maison-des-esclaves-goree", note: "Chaloupe du matin vers Gorée, journée sur l'île.", noteEn: "Morning ferry to Gorée, a day on the island." },
      { day: 2, place: "musee-historique-goree" },
      { day: 2, place: "castel-de-goree" },
      { day: 3, place: "lac-retba", note: "Matinée au lac Rose, puis route vers Saint-Louis (environ 4 h).", noteEn: "Morning at Lac Rose, then drive to Saint-Louis (about 4 hours)." },
      { day: 4, place: "ile-de-saint-louis" },
      { day: 4, place: "thieboudienne-saint-louis" },
      { day: 5, place: "parc-national-oiseaux-djoudj", note: "Départ à l'aube pour le Djoudj, retour à Saint-Louis l'après-midi.", noteEn: "Dawn departure for Djoudj, back in Saint-Louis in the afternoon." },
      { day: 6, place: "parc-national-langue-de-barbarie", note: "Pirogue le matin depuis Gandiol, puis route vers Touba (environ 4 h).", noteEn: "Morning pirogue from Gandiol, then drive to Touba (about 4 hours)." },
      { day: 7, place: "grande-mosquee-touba", note: "Visite matinale, puis route vers la Petite Côte (environ 3 h).", noteEn: "Morning visit, then drive to the Petite Côte (about 3 hours)." },
      { day: 7, place: "plage-de-saly" },
      { day: 8, place: "reserve-de-bandia", note: "Safari du matin, puis transfert vers l'aéroport Blaise-Diagne, tout proche.", noteEn: "Morning safari, then transfer to nearby Blaise Diagne airport." },
    ],
  },
  {
    slug: "senegal-saloum-casamance-6-jours",
    title: "Sine-Saloum et Casamance en 6 jours",
    summary:
      "Fadiouth et les mangroves du Saloum, puis la Basse-Casamance : Ziguinchor, villages diola, Carabane et plages de Cap Skirring. Trajets de jour, sur les axes principaux, en zone de vigilance renforcée.",
    days: 6,
    en: {
      title: "Sine-Saloum and Casamance in 6 days",
      summary:
        "Fadiouth and the Saloum mangroves, then Lower Casamance: Ziguinchor, Jola villages, Carabane and the beaches of Cap Skirring. Daytime journeys on main roads, in an area of heightened vigilance.",
    },
    steps: [
      { day: 1, place: "ile-de-fadiouth", note: "Route de Dakar vers Joal (environ 2 h 30), puis vers le delta.", noteEn: "Drive from Dakar to Joal (about 2.5 hours), then on to the delta." },
      { day: 2, place: "bolongs-du-saloum", note: "Journée en pirogue dans le delta.", noteEn: "A day by pirogue in the delta." },
      { day: 3, place: "reserve-de-fathala", note: "Safari du matin, puis retour vers Dakar pour le vol ou le bateau de nuit vers Ziguinchor.", noteEn: "Morning safari, then back towards Dakar for the flight or overnight boat to Ziguinchor." },
      { day: 4, destination: "basse-casamance", note: "Arrivée à Ziguinchor, puis route vers Cap Skirring par Enampore et Oussouye.", noteEn: "Arrival in Ziguinchor, then drive to Cap Skirring via Enampore and Oussouye." },
      { day: 4, place: "case-a-impluvium-enampore" },
      { day: 5, place: "ile-de-carabane", note: "Pirogue depuis Elinkine pour la journée.", noteEn: "Pirogue from Elinkine for the day." },
      { day: 6, place: "plage-de-cap-skirring", note: "Matinée à la plage, puis vol retour vers Dakar.", noteEn: "Morning on the beach, then flight back to Dakar." },
    ],
  },
];
