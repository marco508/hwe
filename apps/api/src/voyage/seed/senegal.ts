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
    cover: "/images/voyage/dakar",
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
        lat: 14.6775,
        lng: -17.4351,
        cover: "/images/voyage/lieu-musee-des-civilisations-noires",
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
        cover: "/images/voyage/lieu-monument-de-la-renaissance-africaine",
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
        lat: 14.6704,
        lng: -17.4289,
        cover: "/images/voyage/lieu-marche-kermel-dakar",
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
        lat: 14.7157,
        lng: -17.4905,
        cover: "/images/voyage/lieu-mosquee-de-la-divinite-ouakam",
        en: {
          name: "Mosque of the Divinity",
          summary: "White mosque with two minarets, facing the ocean on the Ouakam corniche.",
          description:
            "Built on the Atlantic shore at the foot of the Ouakam cliffs, the Mosque of the Divinity is one of Dakar's most photographed sights, its two white minarets standing out against the ocean. The Ouakam district, an old Lebou fishing village, keeps a village atmosphere within the capital.",
          tips: "Admire it from outside or ask permission to enter, wearing covering clothes and outside prayer times.",
        },
      },
      {
        slug: "musee-theodore-monod-dakar",
        category: "MUSEUM",
        name: "Musée Théodore-Monod d'art africain",
        summary: "Le musée de l'IFAN, place Soweto : masques, statuaire et objets du quotidien d'Afrique de l'Ouest.",
        description:
          "Installé place Soweto, à côté de l'Assemblée nationale, dans un bâtiment de 1931 de style néo-soudanais, le musée de l'IFAN (Institut fondamental d'Afrique noire) est l'un des plus anciens musées d'Afrique de l'Ouest. Ses collections, riches de plusieurs milliers de pièces, présentent masques, statuettes, instruments de musique, textiles et objets de la vie quotidienne de toute la région. Rebaptisé en 2007 en hommage au naturaliste Théodore Monod, il accueille aussi des expositions de la Biennale de Dakar.",
        tips: "Combinez la visite avec le Plateau voisin (place de l'Indépendance, cathédrale, marché Kermel).",
        visitMinutes: 90,
        lat: 14.6633,
        lng: -17.4381,
        cover: "/images/voyage/lieu-musee-theodore-monod-dakar",
        en: {
          name: "Théodore Monod Museum of African Art",
          summary: "The IFAN museum on Place Soweto: masks, statues and everyday objects from West Africa.",
          description:
            "Set on Place Soweto, next to the National Assembly, in a 1931 neo-Sudanese-style building, the IFAN (Fundamental Institute of Black Africa) museum is one of the oldest museums in West Africa. Its collections, numbering several thousand pieces, display masks, statuettes, musical instruments, textiles and everyday objects from across the region. Renamed in 2007 in honour of the naturalist Théodore Monod, it also hosts exhibitions during the Dakar Biennale.",
          tips: "Combine the visit with the nearby Plateau (Place de l'Indépendance, the cathedral, Kermel market).",
        },
      },
      {
        slug: "musee-leopold-sedar-senghor-dakar",
        category: "MUSEUM",
        name: "Musée Léopold-Sédar-Senghor",
        summary: "L'ancienne résidence dakaroise du poète-président, ouverte au public comme maison-musée.",
        description:
          "Dans le quartier résidentiel de Fann, la maison où Léopold Sédar Senghor, premier président du Sénégal et poète de la négritude, a vécu à Dakar est devenue un musée. On y découvre son cadre de vie, son mobilier, sa bibliothèque, des souvenirs de sa carrière politique et littéraire et des œuvres d'art qu'il affectionnait. Une visite intime, complémentaire du Musée des Civilisations noires.",
        visitMinutes: 60,
        lat: 14.6963,
        lng: -17.4713,
        en: {
          name: "Léopold Sédar Senghor Museum",
          summary: "The poet-president's former Dakar residence, open to the public as a house museum.",
          description:
            "In the residential district of Fann, the house where Léopold Sédar Senghor, Senegal's first president and poet of Négritude, lived in Dakar has become a museum. Visitors discover his living space, furniture and library, mementoes of his political and literary career and works of art he loved. An intimate visit that complements the Museum of Black Civilisations.",
        },
      },
      {
        slug: "ile-de-ngor",
        category: "BEACH",
        name: "Île de Ngor",
        summary: "Petite île à quelques minutes de pirogue de la pointe des Almadies : criques, baignade et surf.",
        description:
          "À environ 400 mètres du village lébou de Ngor, sur la pointe des Almadies, cette petite île volcanique se rejoint en quelques minutes de pirogue depuis la plage de Ngor. Sans voitures, elle offre des criques abritées pour la baignade, des sentiers entre maisons et rochers et, côté océan, des vagues réputées chez les surfeurs depuis le film The Endless Summer (1964). Une échappée très appréciée des Dakarois le week-end.",
        tips: "Les pirogues partent de la plage de Ngor : convenez du prix aller-retour et de l'heure de retour avant d'embarquer. Le week-end, l'île est très fréquentée.",
        bestPeriod: "Toute l'année ; mer plus calme côté plage",
        visitMinutes: 240,
        lat: 14.7561,
        lng: -17.5144,
        cover: "/images/voyage/lieu-ile-de-ngor",
        en: {
          name: "Ngor Island",
          summary: "Small island a few minutes by pirogue from the Pointe des Almadies: coves, swimming and surfing.",
          description:
            "Some 400 metres from the Lebou village of Ngor, on the Pointe des Almadies, this small volcanic island is reached in a few minutes by pirogue from Ngor beach. Car-free, it offers sheltered coves for swimming, paths between houses and rocks and, on the ocean side, waves popular with surfers since the film The Endless Summer (1964). A favourite weekend escape for Dakar residents.",
          tips: "Pirogues leave from Ngor beach: agree on the return fare and the time of the return trip before boarding. The island is very busy at weekends.",
          bestPeriod: "All year round; calmer sea on the beach side",
        },
      },
      {
        slug: "parc-national-iles-de-la-madeleine",
        category: "NATURE",
        name: "Parc national des îles de la Madeleine",
        summary: "Petit archipel volcanique au large de Dakar, refuge d'oiseaux marins, accessible en pirogue.",
        description:
          "À quelques kilomètres au large de la corniche, les îles de la Madeleine forment l'un des plus petits parcs nationaux du monde (environ 45 hectares), protégé depuis 1976. Ces îlots volcaniques inhabités, aux falaises abruptes et à la végétation de steppe, abritent des oiseaux marins comme le phaéton à bec rouge et des baobabs nains. La visite se fait avec les agents du parc, au départ de la côte dakaroise, quand la mer le permet.",
        tips: "Les sorties dépendent de l'état de la mer : renseignez-vous auprès du service des parcs nationaux. Chaussures fermées, eau et chapeau indispensables.",
        bestPeriod: "Saison sèche, par mer calme",
        visitMinutes: 180,
        cover: "/images/voyage/lieu-parc-national-iles-de-la-madeleine",
        en: {
          name: "Îles de la Madeleine National Park",
          summary: "Small volcanic archipelago off Dakar, a seabird refuge reached by pirogue.",
          description:
            "A few kilometres off the Corniche, the Îles de la Madeleine form one of the world's smallest national parks (about 45 hectares), protected since 1976. These uninhabited volcanic islets, with steep cliffs and steppe vegetation, shelter seabirds such as the red-billed tropicbird, as well as dwarf baobabs. Visits are made with park staff, leaving from the Dakar coast, when the sea allows.",
          tips: "Trips depend on sea conditions: check with the national parks service. Closed shoes, water and a hat are essential.",
          bestPeriod: "Dry season, in calm seas",
        },
      },
      {
        slug: "pointe-des-almadies",
        category: "LEISURE",
        name: "Pointe et quartier des Almadies",
        summary: "La pointe la plus occidentale du continent africain, et l'un des quartiers les plus animés de Dakar le soir.",
        description:
          "Au nord-ouest de la presqu'île du Cap-Vert, la pointe des Almadies est l'extrémité occidentale du continent africain : rochers noirs battus par l'océan, couchers de soleil et vue sur l'île de Ngor. Autour, les Almadies et Ngor concentrent restaurants de poissons et fruits de mer, bars de plage, cafés et salles de concert, ce qui en fait, avec le Plateau et le Point E, l'un des pôles de la vie nocturne dakaroise, surtout du jeudi au samedi.",
        tips: "Déplacez-vous en taxi la nuit plutôt qu'à pied le long des routes côtières. La mer est dangereuse au pied des rochers : ne vous y baignez pas.",
        visitMinutes: 120,
        lat: 14.7411,
        lng: -17.5298,
        cover: "/images/voyage/lieu-pointe-des-almadies",
        en: {
          name: "Pointe and district of Les Almadies",
          summary: "The westernmost point of mainland Africa, and one of Dakar's liveliest districts at night.",
          description:
            "In the north-west of the Cap-Vert peninsula, the Pointe des Almadies is the westernmost tip of mainland Africa: black rocks pounded by the ocean, sunsets and views of Ngor Island. Around it, Les Almadies and Ngor are packed with fish and seafood restaurants, beach bars, cafés and music venues, making the area, together with the Plateau and Point E, one of the hubs of Dakar nightlife, especially from Thursday to Saturday.",
          tips: "Take a taxi at night rather than walking along the coastal roads. The sea is dangerous at the foot of the rocks: do not swim there.",
        },
      },
      {
        slug: "phare-des-mamelles",
        category: "HISTORY",
        name: "Phare des Mamelles",
        summary: "Phare de 1864 au sommet d'une colline volcanique, avec un panorama sur toute la presqu'île.",
        description:
          "Achevé en 1864 sur la plus occidentale des deux collines volcaniques des Mamelles, ce phare blanc est le plus ancien de Dakar et l'un des plus puissants de la côte africaine. On y monte à pied par un chemin raide pour découvrir un panorama à 360° sur les Almadies, l'océan, le monument de la Renaissance africaine et la ville. Le site accueille parfois des événements en soirée.",
        tips: "Montez en fin d'après-midi pour la lumière du couchant ; prévoyez de bonnes chaussures.",
        visitMinutes: 60,
        lat: 14.7238,
        lng: -17.5018,
        cover: "/images/voyage/lieu-phare-des-mamelles",
        en: {
          name: "Les Mamelles Lighthouse",
          summary: "An 1864 lighthouse on top of a volcanic hill, with views over the whole peninsula.",
          description:
            "Completed in 1864 on the westernmost of the two volcanic hills known as Les Mamelles, this white lighthouse is the oldest in Dakar and one of the most powerful on the African coast. A steep path leads up on foot to a 360° panorama over Les Almadies, the ocean, the African Renaissance Monument and the city. The site sometimes hosts evening events.",
          tips: "Go up in the late afternoon for the sunset light; wear good shoes.",
        },
      },
      {
        slug: "village-artisanal-soumbedioune",
        category: "MARKET",
        name: "Village artisanal et baie de Soumbédioune",
        summary: "Ateliers d'artisans sur la corniche et retour des pirogues de pêche en fin d'après-midi.",
        description:
          "Sur la corniche ouest, le village artisanal de Soumbédioune rassemble des dizaines d'échoppes : sculpteurs sur bois, bijoutiers, maroquiniers, tisserands et peintres sous verre. Juste à côté, la petite baie de Soumbédioune s'anime en fin d'après-midi au retour des pirogues colorées, quand le poisson est vendu directement sur la plage. Une bonne adresse pour des souvenirs faits à la main et une scène de vie dakaroise.",
        tips: "Faites le tour des boutiques avant d'acheter et négociez calmement. Demandez avant de photographier les pêcheurs.",
        visitMinutes: 90,
        lat: 14.6769,
        lng: -17.4578,
        cover: "/images/voyage/lieu-village-artisanal-soumbedioune",
        en: {
          name: "Soumbédioune craft village and bay",
          summary: "Craft workshops on the Corniche and the return of the fishing pirogues in the late afternoon.",
          description:
            "On the western Corniche, the Soumbédioune craft village brings together dozens of stalls: woodcarvers, jewellers, leatherworkers, weavers and reverse-glass painters. Right next door, the small bay of Soumbédioune comes alive in the late afternoon when the colourful pirogues return and fish is sold straight on the beach. A good place for handmade souvenirs and a slice of Dakar life.",
          tips: "Look around all the shops before buying and bargain calmly. Ask before photographing the fishermen.",
        },
      },
      {
        slug: "grande-mosquee-de-dakar",
        category: "RELIGION",
        name: "Grande Mosquée de Dakar",
        summary: "Mosquée de style hispano-mauresque inaugurée en 1964, au minaret de 67 mètres.",
        description:
          "Construite par des architectes français et marocains et inaugurée en 1964 en présence du roi Hassan II et du président Senghor, la Grande Mosquée de Dakar se distingue par son minaret de 67 mètres et ses décors d'inspiration arabo-andalouse. Elle abrite aussi l'Institut islamique de Dakar. Le quartier de la Médina, tout autour, est l'un des plus vivants et populaires de la ville.",
        tips: "L'intérieur n'est pas toujours ouvert aux non-musulmans : renseignez-vous sur place, en tenue couvrante et hors des heures de prière.",
        visitMinutes: 30,
        lat: 14.6782,
        lng: -17.4422,
        cover: "/images/voyage/lieu-grande-mosquee-de-dakar",
        en: {
          name: "Great Mosque of Dakar",
          summary: "Hispano-Moorish-style mosque inaugurated in 1964, with a 67-metre minaret.",
          description:
            "Built by French and Moroccan architects and inaugurated in 1964 in the presence of King Hassan II and President Senghor, the Great Mosque of Dakar stands out for its 67-metre minaret and Arab-Andalusian decoration. It also houses the Islamic Institute of Dakar. The surrounding Médina district is one of the liveliest working-class neighbourhoods in the city.",
          tips: "The interior is not always open to non-Muslims: ask on site, wearing covering clothes and outside prayer times.",
        },
      },
      {
        slug: "cathedrale-souvenir-africain-dakar",
        category: "RELIGION",
        name: "Cathédrale du Souvenir africain",
        summary: "Cathédrale Notre-Dame-des-Victoires, consacrée en 1936 sur le boulevard de la République.",
        description:
          "Plus grande église de Dakar et siège de l'archevêché, la cathédrale Notre-Dame-des-Victoires, dite du Souvenir africain, a été consacrée en 1936 sur le boulevard de la République, au Plateau. Sa façade à colonnes et sa coupole mêlent influences néo-byzantines et soudanaises. Les obsèques du président Senghor y ont été célébrées en 2001. Les messes du dimanche, très chantées, valent le détour.",
        tips: "Tenue correcte exigée ; restez discret pendant les offices.",
        visitMinutes: 30,
        lat: 14.6653,
        lng: -17.4378,
        cover: "/images/voyage/lieu-cathedrale-souvenir-africain-dakar",
        en: {
          name: "Cathedral of African Remembrance",
          summary: "Our Lady of Victories Cathedral, consecrated in 1936 on the Boulevard de la République.",
          description:
            "Dakar's largest church and the seat of the archdiocese, Our Lady of Victories Cathedral, known as the Cathedral of African Remembrance, was consecrated in 1936 on the Boulevard de la République in the Plateau. Its columned façade and dome blend neo-Byzantine and Sudanese influences. President Senghor's funeral was held there in 2001. The Sunday masses, full of singing, are worth attending.",
          tips: "Dress respectfully and stay discreet during services.",
        },
      },
      {
        slug: "mausolee-limamou-laye-yoff",
        category: "RELIGION",
        name: "Mosquée et mausolée de Seydina Limamou Laye (Yoff)",
        summary: "Haut lieu de la confrérie layène, face à l'océan, dans l'ancien village lébou de Yoff.",
        description:
          "À Yoff, ancien village de pêcheurs lébous aujourd'hui intégré à Dakar, le mausolée de Seydina Limamou Laye, fondateur de la confrérie soufie des Layènes mort en 1909, est un lieu de pèlerinage très révéré, tourné vers l'océan. Les fidèles, souvent vêtus de blanc, y viennent prier, notamment lors de l'anniversaire de l'Appel. Le quartier de Yoff Layène, avec ses plages de pirogues, garde une forte identité communautaire.",
        tips: "Tenue couvrante et attitude discrète ; demandez l'autorisation avant toute photo et ne pénétrez pas dans les espaces de prière sans y être invité.",
        visitMinutes: 45,
        lat: 14.7612,
        lng: -17.469,
        cover: "/images/voyage/lieu-mausolee-limamou-laye-yoff",
        en: {
          name: "Mosque and mausoleum of Seydina Limamou Laye (Yoff)",
          summary: "A major site of the Layene brotherhood, facing the ocean in the old Lebou village of Yoff.",
          description:
            "In Yoff, a former Lebou fishing village now part of Dakar, the mausoleum of Seydina Limamou Laye, founder of the Layene Sufi brotherhood, who died in 1909, is a highly revered place of pilgrimage facing the ocean. The faithful, often dressed in white, come to pray here, particularly for the anniversary of the Call. The Yoff Layène district, with its pirogue beaches, retains a strong community identity.",
          tips: "Wear covering clothes and be discreet; ask permission before taking any photos and do not enter prayer areas unless invited.",
        },
      },
      {
        slug: "arene-nationale-de-lutte-pikine",
        category: "LEISURE",
        name: "Arène nationale de lutte",
        summary: "Le temple de la lutte sénégalaise avec frappe : combats, tambours et rituels des lutteurs.",
        description:
          "À Pikine, en banlieue de Dakar, l'Arène nationale, d'une capacité d'environ 20 000 places, accueille les grands combats de lutte avec frappe (laamb), le sport national. Bien avant le combat, l'ambiance monte : tambours, chants des griots, danses et rituels mystiques des lutteurs entourés de leurs marabouts. Les grandes affiches, annoncées des semaines à l'avance, déplacent les foules et sont retransmises à la télévision.",
        tips: "Achetez vos billets à l'avance pour les grandes affiches, arrivez tôt et allez-y accompagné d'un connaisseur. Foule très dense : gardez vos affaires près de vous.",
        bestPeriod: "Saison des combats, surtout en saison sèche",
        visitMinutes: 240,
        lat: 14.7612,
        lng: -17.3989,
        cover: "/images/voyage/lieu-arene-nationale-de-lutte-pikine",
        en: {
          name: "National Wrestling Arena",
          summary: "The temple of Senegalese wrestling with punches: bouts, drums and wrestlers' rituals.",
          description:
            "In Pikine, in the Dakar suburbs, the National Arena, with room for about 20,000 spectators, hosts the big bouts of wrestling with punches (laamb), the national sport. Long before the fight the atmosphere builds: drums, griots' songs, dancing and the wrestlers' mystical rituals, surrounded by their marabouts. The big fights, announced weeks in advance, draw huge crowds and are broadcast on television.",
          tips: "Buy tickets in advance for the big fights, arrive early and go with someone who knows the sport. Very dense crowds: keep your belongings close.",
          bestPeriod: "Fight season, mostly in the dry season",
        },
      },
      {
        slug: "place-de-l-independance-dakar",
        category: "HISTORY",
        name: "Place de l'Indépendance et Plateau",
        summary: "Le cœur administratif de Dakar : grande place, immeubles coloniaux, palais présidentiel et gare restaurée.",
        description:
          "Vaste esplanade du Plateau, la place de l'Indépendance est bordée d'immeubles des XIXe et XXe siècles, dont la Chambre de commerce. Une courte promenade mène au palais de la République, aux jardins blancs, à la cathédrale du Souvenir africain et au marché Kermel, puis à la gare de Dakar, bâtiment de 1914 restauré qui sert aujourd'hui de terminus au TER. Un bon parcours pour lire l'histoire de la ville, de la capitale de l'AOF à aujourd'hui.",
        tips: "Ne photographiez pas le palais présidentiel ni les militaires en faction. Le Plateau se visite de préférence en semaine, de jour.",
        visitMinutes: 120,
        lat: 14.6695,
        lng: -17.4321,
        cover: "/images/voyage/lieu-place-de-l-independance-dakar",
        en: {
          name: "Place de l'Indépendance and the Plateau",
          summary: "Dakar's administrative heart: a large square, colonial buildings, the presidential palace and a restored station.",
          description:
            "A vast esplanade in the Plateau, Place de l'Indépendance is lined with 19th- and 20th-century buildings, including the Chamber of Commerce. A short walk leads to the Palace of the Republic with its white gardens, the Cathedral of African Remembrance and Kermel market, then to Dakar station, a restored 1914 building that is now the terminus of the TER train. A good route for reading the city's history, from capital of French West Africa to the present day.",
          tips: "Do not photograph the presidential palace or soldiers on guard. The Plateau is best visited on weekdays, by day.",
        },
      },
      {
        slug: "village-des-arts-dakar",
        category: "CULTURE",
        name: "Village des Arts de Dakar",
        summary: "Ateliers et galeries d'artistes contemporains, près du stade Léopold-Sédar-Senghor.",
        description:
          "Sur la route de l'aéroport, près du stade Léopold-Sédar-Senghor, le Village des Arts réunit dans un même enclos des dizaines d'ateliers de peintres, sculpteurs, céramistes et plasticiens, ainsi qu'une galerie. On peut y rencontrer les artistes au travail, découvrir la création contemporaine sénégalaise et acheter directement des œuvres. Le lieu participe au « off » de la Biennale de Dakar.",
        tips: "Les artistes ne sont pas tous présents chaque jour : préférez une visite en semaine, en fin de matinée.",
        visitMinutes: 90,
        lat: 14.7464,
        lng: -17.4573,
        cover: "/images/voyage/lieu-village-des-arts-dakar",
        en: {
          name: "Dakar Village des Arts",
          summary: "Studios and galleries of contemporary artists, near the Léopold Sédar Senghor stadium.",
          description:
            "On the airport road, near the Léopold Sédar Senghor stadium, the Village des Arts gathers dozens of studios of painters, sculptors, ceramicists and visual artists within a single compound, along with a gallery. You can meet artists at work, discover contemporary Senegalese art and buy works directly. The site takes part in the Dakar Biennale's fringe programme.",
          tips: "Not all artists are present every day: visit on a weekday, in the late morning.",
        },
      },
      {
        slug: "marche-hlm-dakar",
        category: "MARKET",
        name: "Marché HLM",
        summary: "Le grand marché des tissus de Dakar : wax, bazin, broderies et couturiers à la chaîne.",
        description:
          "Dans le quartier des HLM, ce marché est l'adresse dakaroise des tissus : piles de wax imprimé, bazin teint et lustré, voiles, dentelles et fils à broder. Tout autour, des tailleurs confectionnent en quelques jours boubous, chemises ou robes sur mesure. Très animé à l'approche des grandes fêtes (Korité, Tabaski), quand chacun fait faire sa tenue neuve.",
        tips: "Venez le matin, plus calme ; prévoyez du temps pour négocier et pour les essayages si vous commandez une tenue.",
        visitMinutes: 120,
        lat: 14.706,
        lng: -17.4445,
        en: {
          name: "HLM Market",
          summary: "Dakar's big fabric market: wax prints, bazin, embroidery and busy tailors.",
          description:
            "In the HLM district, this market is Dakar's go-to place for fabrics: piles of printed wax, dyed and polished bazin, voiles, lace and embroidery thread. All around, tailors make made-to-measure boubous, shirts and dresses in a few days. It is especially busy in the run-up to the major festivals (Korité, Tabaski), when everyone has a new outfit made.",
          tips: "Come in the morning, when it is calmer; allow time to bargain and for fittings if you order an outfit.",
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
        lat: 14.6678,
        lng: -17.3972,
        cover: "/images/voyage/lieu-maison-des-esclaves-goree",
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
        lat: 14.6708,
        lng: -17.3996,
        cover: "/images/voyage/lieu-musee-historique-goree",
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
        lat: 14.6672,
        lng: -17.3985,
        cover: "/images/voyage/lieu-castel-de-goree",
        en: {
          name: "The Castel",
          summary: "Rocky plateau in the south of the island, old gun batteries and views of Dakar.",
          description:
            "The Castel, the island's highest point, is a rocky plateau that still holds old fortifications and artillery pieces. Artists and craftspeople often display their work there. You climb up through lanes and steps to enjoy the view over the island, the ocean and Dakar's skyline.",
        },
      },
      {
        slug: "eglise-saint-charles-borromee-goree",
        category: "RELIGION",
        name: "Église Saint-Charles-Borromée",
        summary: "Église de 1830 aux murs ocre, l'un des plus anciens édifices catholiques du pays.",
        description:
          "Achevée en 1830, deux ans après la cathédrale de Saint-Louis, l'église Saint-Charles-Borromée est l'un des plus anciens lieux de culte catholiques d'Afrique de l'Ouest. Sa façade néoclassique aux tons ocre et son petit clocher se dressent près de l'embarcadère, au milieu des maisons coloniales. Elle rappelle la présence ancienne d'une communauté chrétienne, notamment métisse, sur l'île.",
        tips: "Tenue correcte ; l'église n'est pas toujours ouverte en dehors des offices.",
        visitMinutes: 20,
        lat: 14.667,
        lng: -17.3979,
        cover: "/images/voyage/lieu-eglise-saint-charles-borromee-goree",
        en: {
          name: "Saint Charles Borromeo Church",
          summary: "An 1830 church with ochre walls, one of the oldest Catholic buildings in the country.",
          description:
            "Completed in 1830, two years after the cathedral of Saint-Louis, the Church of Saint Charles Borromeo is one of the oldest Catholic places of worship in West Africa. Its ochre neoclassical façade and small bell tower stand near the jetty, among the colonial houses. It recalls the long-standing presence of a Christian community, notably of mixed descent, on the island.",
          tips: "Dress respectfully; the church is not always open outside services.",
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
        lat: 14.8386,
        lng: -17.2306,
        cover: "/images/voyage/lieu-lac-retba",
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
        cover: "/images/voyage/lieu-dunes-du-lac-rose",
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
        cover: "/images/voyage/lieu-ile-de-saint-louis",
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
        cover: "/images/voyage/lieu-thieboudienne-saint-louis",
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
        cover: "/images/voyage/lieu-parc-national-langue-de-barbarie",
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
        cover: "/images/voyage/lieu-parc-national-oiseaux-djoudj",
        en: {
          name: "Djoudj National Bird Sanctuary",
          summary: "UNESCO-listed wetland, one of the great migratory-bird sanctuaries south of the Sahara.",
          description:
            "Some 60 km north of Saint-Louis, in the Senegal river delta, Djoudj park has been a UNESCO World Heritage Site since 1981. Every winter its lakes, creeks and reed beds host hundreds of thousands of birds from Europe, as well as large colonies of great white pelicans and flamingos. A pirogue trip among the pelicans is the highlight of the visit.",
          tips: "Come early in the morning with binoculars and sun protection; check the state of the track after the rainy season.",
          bestPeriod: "November to April (migratory birds)",
        },
      },
      {
        slug: "cathedrale-saint-louis-du-senegal",
        category: "RELIGION",
        name: "Cathédrale de Saint-Louis",
        summary: "Consacrée en 1828, la plus ancienne église d'Afrique de l'Ouest, rouverte après restauration.",
        description:
          "Sur la place d'Armes, au sud de l'île, la cathédrale Saint-Louis a été consacrée en 1828, ce qui en fait la plus ancienne église d'Afrique de l'Ouest. Sa façade à fronton et colonnes, encadrée de deux clochers, domine le quartier sud. Fermée en 2005 car menaçant ruine, elle a été entièrement restaurée et a rouvert ses portes fin 2020.",
        tips: "Tenue correcte ; visites en dehors des offices.",
        visitMinutes: 30,
        lat: 16.0248,
        lng: -16.5045,
        cover: "/images/voyage/lieu-cathedrale-saint-louis-du-senegal",
        en: {
          name: "Saint-Louis Cathedral",
          summary: "Consecrated in 1828, West Africa's oldest church, reopened after restoration.",
          description:
            "On the Place d'Armes, in the south of the island, Saint-Louis cathedral was consecrated in 1828, making it the oldest church in West Africa. Its pedimented, columned façade framed by two bell towers dominates the southern district. Closed in 2005 because it was in danger of collapse, it was fully restored and reopened at the end of 2020.",
          tips: "Dress respectfully; visit outside services.",
        },
      },
      {
        slug: "grande-mosquee-saint-louis-senegal",
        category: "RELIGION",
        name: "Grande Mosquée de Saint-Louis",
        summary: "Mosquée du XIXe siècle au nord de l'île, reconnaissable à son horloge.",
        description:
          "Au nord de l'île de Saint-Louis, face au petit bras du fleuve, la Grande Mosquée est l'un des plus anciens lieux de culte musulmans de la ville coloniale ; sa façade associe minarets et une horloge, singularité architecturale qui intrigue les visiteurs. Elle fait face au quartier de pêcheurs de Guet Ndar et rappelle la place de l'islam dans l'histoire de la ville.",
        tips: "Admirez-la de l'extérieur ; pour entrer, demandez l'autorisation, en tenue couvrante et hors des heures de prière.",
        visitMinutes: 20,
        lat: 16.0317,
        lng: -16.5037,
        cover: "/images/voyage/lieu-grande-mosquee-saint-louis-senegal",
        en: {
          name: "Great Mosque of Saint-Louis",
          summary: "A 19th-century mosque in the north of the island, recognisable by its clock.",
          description:
            "In the north of Saint-Louis island, facing the small arm of the river, the Great Mosque is one of the oldest Muslim places of worship in the colonial town; its façade combines minarets with a clock, an architectural oddity that intrigues visitors. It looks across to the fishing district of Guet Ndar and recalls the place of Islam in the town's history.",
          tips: "Admire it from outside; to enter, ask permission, wear covering clothes and avoid prayer times.",
        },
      },
      {
        slug: "reserve-de-guembeul",
        category: "NATURE",
        name: "Réserve spéciale de faune de Guembeul",
        summary: "Lagune et savane clôturées au sud de Saint-Louis : gazelles dama, tortues sillonnées et oiseaux d'eau.",
        description:
          "À environ 5 km au sud de Saint-Louis, sur la route de Gandiol, la réserve de Guembeul (environ 720 hectares, site Ramsar) protège une lagune salée entourée de savane sahélienne. Elle sert de centre de réintroduction pour des espèces menacées du Sahel, comme la gazelle dama, la gazelle dorcas, l'oryx algazelle et la tortue sillonnée, et accueille de nombreux oiseaux d'eau. Une visite facile à combiner avec la Langue de Barbarie.",
        tips: "Visite à pied ou en véhicule avec un guide de la réserve ; venez tôt le matin ou en fin d'après-midi, avec des jumelles.",
        bestPeriod: "Novembre à avril",
        visitMinutes: 120,
        lat: 15.9178,
        lng: -16.4612,
        cover: "/images/voyage/lieu-reserve-de-guembeul",
        en: {
          name: "Guembeul Special Wildlife Reserve",
          summary: "Fenced lagoon and savannah south of Saint-Louis: dama gazelles, spurred tortoises and waterbirds.",
          description:
            "About 5 km south of Saint-Louis, on the Gandiol road, the Guembeul reserve (about 720 hectares, a Ramsar site) protects a salt lagoon surrounded by Sahelian savannah. It serves as a reintroduction centre for threatened Sahel species such as the dama gazelle, dorcas gazelle, scimitar-horned oryx and African spurred tortoise, and hosts many waterbirds. An easy visit to combine with the Langue de Barbarie.",
          tips: "Visit on foot or by vehicle with a reserve guide; come early in the morning or late in the afternoon, with binoculars.",
          bestPeriod: "November to April",
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
        lat: 14.8631,
        lng: -15.8756,
        cover: "/images/voyage/lieu-grande-mosquee-touba",
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
        lat: 14.8631,
        lng: -15.8756,
        cover: "/images/voyage/lieu-grand-magal-de-touba",
        en: {
          name: "Grand Magal of Touba",
          summary: "The country's largest pilgrimage, commemorating Cheikh Ahmadou Bamba's departure into exile.",
          description:
            "Every year, on the 18th of the month of Safar in the Islamic calendar, the Grand Magal commemorates the departure into exile of Cheikh Ahmadou Bamba, deported to Gabon by the colonial administration in 1895. Millions of pilgrims converge on Touba to pray, reflect and share free meals. The date moves about eleven days earlier each year in the Gregorian calendar.",
          tips: "An impressive but very crowded experience: roads are jammed and accommodation impossible to find. For a first visit to Touba, choose another time.",
          bestPeriod: "18 Safar (date varies with the lunar calendar)",
        },
      },
      {
        slug: "cafe-touba",
        category: "GASTRONOMY",
        name: "Le café Touba",
        summary: "Café épicé au poivre de Guinée (djar), boisson emblématique liée à la ville sainte.",
        description:
          "Le café Touba est un café torréfié avec du djar, le poivre de Guinée (graines de Xylopia), qui lui donne un goût poivré et légèrement camphré. La tradition l'associe à Cheikh Ahmadou Bamba et à la ville de Touba, d'où son nom. Servi très sucré dans de petits gobelets, il se boit à toute heure, vendu par des marchands ambulants et dans les kiosques de tout le pays.",
        tips: "Goûtez-le auprès d'un vendeur de rue, le matin, avec un morceau de pain : c'est le petit-déjeuner de nombreux Sénégalais.",
        visitMinutes: 15,
        cover: "/images/voyage/lieu-cafe-touba",
        en: {
          name: "Café Touba",
          summary: "Coffee spiced with Guinea pepper (djar), an emblematic drink linked to the holy city.",
          description:
            "Café Touba is coffee roasted with djar, Guinea pepper (Xylopia seeds), which gives it a peppery, slightly camphor-like taste. Tradition links it to Cheikh Ahmadou Bamba and the city of Touba, hence its name. Served very sweet in small cups, it is drunk at any time of day, sold by street vendors and kiosks all over the country.",
          tips: "Try it from a street vendor in the morning with a piece of bread: it is breakfast for many Senegalese.",
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
    cover: "/images/voyage/petite-cote",
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
        cover: "/images/voyage/lieu-plage-de-saly",
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
        lat: 14.5886,
        lng: -16.9552,
        cover: "/images/voyage/lieu-reserve-de-bandia",
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
        cover: "/images/voyage/lieu-ile-de-fadiouth",
        en: {
          name: "Fadiouth Island",
          summary: "Island made of shells, linked to Joal by a footbridge, with its shared cemetery.",
          description:
            "Linked to Joal by a long wooden footbridge, Fadiouth is an island whose ground is made of shells accumulated over the centuries. Car-free lanes, millet granaries on stilts and, on a neighbouring island, a cemetery where Christians and Muslims lie side by side, a symbol of Senegal's religious coexistence. Joal is also the birthplace of the poet and president Léopold Sédar Senghor.",
          tips: "Use the official guides at the start of the footbridge; a contribution is usually requested.",
        },
      },
      {
        slug: "sanctuaire-marial-popenguine",
        category: "RELIGION",
        name: "Sanctuaire marial de Popenguine",
        summary: "Basilique Notre-Dame-de-la-Délivrande et grand sanctuaire national, lieu du pèlerinage de Pentecôte.",
        description:
          "Fondé à la fin du XIXe siècle par des missionnaires spiritains, le sanctuaire de Popenguine abrite une Vierge noire dans la basilique Notre-Dame-de-la-Délivrande, érigée en basilique mineure par Jean-Paul II avant sa visite de 1992. Un vaste ensemble, inauguré en décembre 2023 comme sanctuaire national, comprend une reproduction de la grotte de Lourdes et un grand édifice de plusieurs dizaines de milliers de places. Chaque lundi de Pentecôte, il accueille le plus grand pèlerinage catholique du pays.",
        tips: "En dehors du pèlerinage, le lieu est calme ; tenue correcte. Le week-end de Pentecôte, la route et le village sont saturés.",
        visitMinutes: 60,
        lat: 14.5546,
        lng: -17.1116,
        cover: "/images/voyage/lieu-sanctuaire-marial-popenguine",
        en: {
          name: "Popenguine Marian Shrine",
          summary: "The Basilica of Our Lady of La Délivrande and a large national shrine, site of the Pentecost pilgrimage.",
          description:
            "Founded in the late 19th century by Spiritan missionaries, the Popenguine shrine houses a Black Madonna in the Basilica of Our Lady of La Délivrande, made a minor basilica by John Paul II ahead of his 1992 visit. A vast complex, inaugurated in December 2023 as a national shrine, includes a replica of the Lourdes grotto and a large building with tens of thousands of seats. Every Whit Monday it hosts the country's largest Catholic pilgrimage.",
          tips: "Outside the pilgrimage the site is quiet; dress respectfully. On Pentecost weekend the road and village are packed.",
        },
      },
      {
        slug: "reserve-naturelle-popenguine",
        category: "NATURE",
        name: "Réserve naturelle de Popenguine",
        summary: "Falaises, savane restaurée et vue sur la Petite Côte, gérées avec les femmes du village.",
        description:
          "Créée en 1986 sur environ 1 000 hectares, la réserve naturelle de Popenguine protège des collines et des falaises dominant l'océan, dont le cap de Naze, point culminant de la Petite Côte. Ce milieu, très dégradé par le déboisement et les sécheresses, a été restauré avec l'appui d'une association de femmes du village créée en 1988, exemple souvent cité de conservation communautaire. Sentiers, oiseaux, anciens ouvrages militaires et panoramas sur la côte.",
        tips: "Partez marcher tôt le matin avec de l'eau et un chapeau ; demandez un guide à l'entrée de la réserve.",
        visitMinutes: 150,
        lat: 14.5467,
        lng: -17.0903,
        cover: "/images/voyage/lieu-reserve-naturelle-popenguine",
        en: {
          name: "Popenguine Nature Reserve",
          summary: "Cliffs, restored savannah and views of the Petite Côte, managed with the village women.",
          description:
            "Created in 1986 over some 1,000 hectares, the Popenguine nature reserve protects hills and cliffs overlooking the ocean, including Cap de Naze, the highest point on the Petite Côte. This environment, badly degraded by deforestation and droughts, was restored with the help of a village women's association founded in 1988, an often-cited example of community conservation. Trails, birds, old military structures and views along the coast.",
          tips: "Set off early in the morning with water and a hat; ask for a guide at the reserve entrance.",
        },
      },
      {
        slug: "plage-des-pecheurs-mbour",
        category: "MARKET",
        name: "Plage des pêcheurs de Mbour",
        summary: "L'un des grands ports de pêche artisanale du pays : retour des pirogues et marché au poisson.",
        description:
          "Mbour, principale ville de la Petite Côte, vit au rythme de la pêche artisanale. En fin d'après-midi, des centaines de pirogues peintes reviennent sur la plage : le poisson est débarqué à dos d'homme, trié, vendu à la criée, puis fumé ou séché sur place. Un spectacle saisissant, bruyant et très photogénique, à quelques minutes de Saly.",
        tips: "Sol glissant et odeurs fortes : chaussures fermées conseillées. Demandez avant de photographier et restez à l'écart des zones de déchargement.",
        visitMinutes: 60,
        lat: 14.4117,
        lng: -16.9658,
        cover: "/images/voyage/lieu-plage-des-pecheurs-mbour",
        en: {
          name: "Mbour fishermen's beach",
          summary: "One of the country's big artisanal fishing ports: pirogues coming in and a fish market.",
          description:
            "Mbour, the main town of the Petite Côte, lives to the rhythm of artisanal fishing. In the late afternoon hundreds of painted pirogues return to the beach: fish is carried ashore on men's backs, sorted, auctioned, then smoked or dried on the spot. A striking, noisy and very photogenic scene, a few minutes from Saly.",
          tips: "Slippery ground and strong smells: closed shoes recommended. Ask before taking photos and keep clear of the unloading areas.",
        },
      },
      {
        slug: "toubab-dialaw",
        category: "CULTURE",
        name: "Toubab Dialaw",
        summary: "Village de pêcheurs au pied des falaises ocre, repaire d'artistes et de danseurs.",
        description:
          "Au nord de la Petite Côte, à une heure environ de Dakar, Toubab Dialaw est un village de pêcheurs adossé à des falaises de latérite rouge, au bord d'une plage où s'alignent les pirogues. Il attire depuis longtemps artistes, musiciens et danseurs : on y trouve des lieux de création et de formation à la danse africaine contemporaine. Une étape paisible, loin des grandes stations.",
        tips: "La baignade y est possible par mer calme, mais renseignez-vous sur les courants ; respectez la tranquillité du village.",
        visitMinutes: 180,
        lat: 14.6061,
        lng: -17.1503,
        cover: "/images/voyage/lieu-toubab-dialaw",
        en: {
          name: "Toubab Dialaw",
          summary: "A fishing village below ochre cliffs, a haunt of artists and dancers.",
          description:
            "At the northern end of the Petite Côte, about an hour from Dakar, Toubab Dialaw is a fishing village backed by red laterite cliffs, on a beach lined with pirogues. It has long attracted artists, musicians and dancers, and has venues for creation and training in contemporary African dance. A peaceful stop, away from the big resorts.",
          tips: "Swimming is possible when the sea is calm, but ask about currents; respect the quiet of the village.",
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
    cover: "/images/voyage/sine-saloum",
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
        lat: 13.8353,
        lng: -16.4986,
        cover: "/images/voyage/lieu-bolongs-du-saloum",
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
        lat: 13.6533,
        lng: -16.4628,
        cover: "/images/voyage/lieu-reserve-de-fathala",
        en: {
          name: "Fathala Reserve",
          summary: "Wildlife reserve in dry forest near Toubakouta: giraffes, rhinos, Derby elands.",
          description:
            "South of the delta, near Toubakouta, the Fathala reserve covers part of the Fathala forest, attached to the Saloum Delta National Park. By vehicle and with a guide you can see giraffes, rhinos, buffalo, monkeys and several antelopes, including the rare Derby eland. A good complement to pirogue trips.",
        },
      },
      {
        slug: "ile-de-mar-lodj",
        category: "CULTURE",
        name: "Île de Mar Lodj",
        summary: "Île sans voitures du Saloum, entre rôniers, mangrove et villages sérères, face à Ndangane.",
        description:
          "Accessible en quelques minutes de pirogue depuis l'embarcadère de Ndangane, l'île de Mar abrite les villages de Mar Lodj, Mar Fafaco et Mar Soulou, peuplés d'environ 5 000 habitants. Pistes de sable bordées de rôniers, de fromagers et de manguiers, mangrove, puits et champs : on y découvre la vie des îles du Saloum à pied, à vélo ou en charrette. Musulmans et chrétiens y cohabitent, avec cimetières et lieux de culte voisins.",
        tips: "Organisez la traversée avec votre campement ou un piroguier de Ndangane ; emportez une lampe, l'éclairage public est limité.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 360,
        lat: 14.043,
        lng: -16.6789,
        cover: "/images/voyage/lieu-ile-de-mar-lodj",
        en: {
          name: "Mar Lodj Island",
          summary: "A car-free island in the Saloum among palmyra palms, mangroves and Serer villages, opposite Ndangane.",
          description:
            "A few minutes by pirogue from the Ndangane landing, the island of Mar is home to the villages of Mar Lodj, Mar Fafaco and Mar Soulou, with about 5,000 inhabitants. Sandy tracks lined with palmyra palms, kapok and mango trees, mangroves, wells and fields: you discover island life in the Saloum on foot, by bike or by cart. Muslims and Christians live side by side, with neighbouring cemeteries and places of worship.",
          tips: "Arrange the crossing through your lodge or a boatman in Ndangane; bring a torch, as street lighting is limited.",
          bestPeriod: "November to May",
        },
      },
      {
        slug: "palmarin-saloum",
        category: "NATURE",
        name: "Palmarin et ses lagunes",
        summary: "Villages sérères entre océan, palmeraies et tannes salés, à l'entrée de la pointe de Sangomar.",
        description:
          "Au nord du delta, Palmarin aligne plusieurs villages sérères sur une étroite bande de terre entre l'océan et les lagunes, au début de la pointe de Sangomar. Palmeraies, mangrove, tannes (étendues salées) et salines artisanales forment des paysages ouverts où l'on observe de nombreux oiseaux. Une base tranquille pour explorer le Saloum en pirogue ou à vélo.",
        tips: "Les campements organisent sorties en pirogue et balades ; respectez les sites sacrés signalés par les habitants.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 240,
        lat: 14.0131,
        lng: -16.7645,
        cover: "/images/voyage/lieu-palmarin-saloum",
        en: {
          name: "Palmarin and its lagoons",
          summary: "Serer villages between ocean, palm groves and salt flats, at the start of the Sangomar spit.",
          description:
            "In the north of the delta, Palmarin strings several Serer villages along a narrow strip of land between the ocean and the lagoons, at the start of the Sangomar spit. Palm groves, mangroves, tannes (salt flats) and artisanal salt pans create open landscapes full of birds. A quiet base for exploring the Saloum by pirogue or bike.",
          tips: "Lodges organise pirogue trips and walks; respect the sacred sites pointed out by local people.",
          bestPeriod: "November to May",
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
    cover: "/images/voyage/basse-casamance",
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
        cover: "/images/voyage/lieu-plage-de-cap-skirring",
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
        cover: "/images/voyage/lieu-ile-de-carabane",
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
        lat: 12.5117,
        lng: -16.4489,
        cover: "/images/voyage/lieu-case-a-impluvium-enampore",
        en: {
          name: "Enampore impluvium house",
          summary: "Large Jola earthen house whose roof collects rainwater in the centre.",
          description:
            "A traditional Jola dwelling, the impluvium house is a vast circular mud-brick house whose funnel-shaped thatched roof collects rainwater in a central basin. Several families once lived around this inner courtyard. In Enampore, between Ziguinchor and Oussouye, one house is open to visitors and sometimes hosts travellers. A fine introduction to Jola culture.",
          tips: "Go by day from the main Ziguinchor–Oussouye road, with a local guide or driver.",
        },
      },
      {
        slug: "vieille-ville-ziguinchor",
        category: "HISTORY",
        name: "Ziguinchor, ville coloniale et quais du fleuve",
        summary: "La capitale de la Casamance : quartiers coloniaux, port fluvial et marchés animés.",
        description:
          "Fondée par les Portugais au XVIIe siècle et cédée à la France en 1886, Ziguinchor s'étend sur la rive sud du fleuve Casamance. Le centre conserve des bâtiments coloniaux aux façades colorées, des rues ombragées de manguiers et des quais d'où partent pirogues et bateau de Dakar. Marchés, ateliers d'artisans et petite restauration en font une étape vivante avant de partir vers Oussouye ou Cap Skirring.",
        tips: "Ville de vigilance renforcée selon France Diplomatie : circulez de jour, sur les axes principaux, et évitez les zones forestières en périphérie (forêt de Bayot notamment).",
        visitMinutes: 180,
        lat: 12.5611,
        lng: -16.2833,
        cover: "/images/voyage/lieu-vieille-ville-ziguinchor",
        en: {
          name: "Ziguinchor, colonial town and river quays",
          summary: "The capital of Casamance: colonial districts, a river port and busy markets.",
          description:
            "Founded by the Portuguese in the 17th century and ceded to France in 1886, Ziguinchor spreads along the south bank of the Casamance river. The centre keeps colonial buildings with colourful façades, streets shaded by mango trees and quays from which pirogues and the Dakar boat depart. Markets, craft workshops and street food make it a lively stop before heading to Oussouye or Cap Skirring.",
          tips: "An area of heightened vigilance according to France Diplomatie: travel by day, on main roads, and avoid forested areas on the outskirts (notably the Bayot forest).",
        },
      },
      {
        slug: "royaume-d-oussouye",
        category: "CULTURE",
        name: "Oussouye et son royaume diola",
        summary: "Petite ville au cœur d'un royaume diola traditionnel, avec son roi, ses forêts sacrées et ses rizières.",
        description:
          "Oussouye est le centre d'un royaume diola dont le roi joue un rôle spirituel et social : gardien des traditions, des forêts sacrées et de la paix entre les villages, il ne possède pas de pouvoir politique. Autour de la ville, rizières, fromagers géants et villages aux cases de banco composent l'un des plus beaux paysages de Casamance. Avec un guide local, il est parfois possible d'être reçu à la cour royale, dans le respect des usages.",
        tips: "Une visite au roi ne s'improvise pas : passez par un guide d'Oussouye, renseignez-vous sur le protocole et ne photographiez pas sans accord. N'entrez jamais dans un bois sacré.",
        visitMinutes: 180,
        lat: 12.4886,
        lng: -16.5449,
        cover: "/images/voyage/lieu-royaume-d-oussouye",
        en: {
          name: "Oussouye and its Jola kingdom",
          summary: "A small town at the heart of a traditional Jola kingdom, with its king, sacred forests and rice paddies.",
          description:
            "Oussouye is the centre of a Jola kingdom whose king plays a spiritual and social role: guardian of traditions, sacred forests and peace between villages, he holds no political power. Around the town, rice paddies, giant kapok trees and villages of mud-brick houses make up one of the most beautiful landscapes in Casamance. With a local guide it is sometimes possible to be received at the royal court, respecting customs.",
          tips: "A visit to the king cannot be improvised: go through a guide from Oussouye, ask about protocol and do not take photos without agreement. Never enter a sacred grove.",
        },
      },
      {
        slug: "cases-a-etage-mlomp",
        category: "CULTURE",
        name: "Cases à étage de Mlomp",
        summary: "Rares maisons diola en banco à étage, sous d'immenses fromagers, entre Oussouye et Elinkine.",
        description:
          "Le village de Mlomp, sur la route d'Oussouye à Elinkine, est connu pour ses cases à étage, grandes maisons en banco (terre crue) dotées d'un étage, rares en Afrique de l'Ouest, ainsi que pour ses fromagers monumentaux. Certaines maisons peuvent être visitées avec leurs habitants, qui expliquent les techniques de construction et la vie diola. Un arrêt facile sur la route de Carabane.",
        tips: "Une petite contribution est généralement demandée pour la visite ; restez sur l'axe principal et voyagez de jour.",
        visitMinutes: 60,
        lat: 12.5531,
        lng: -16.5942,
        cover: "/images/voyage/lieu-cases-a-etage-mlomp",
        en: {
          name: "Mlomp two-storey houses",
          summary: "Rare two-storey Jola mud houses beneath huge kapok trees, between Oussouye and Elinkine.",
          description:
            "The village of Mlomp, on the road from Oussouye to Elinkine, is known for its two-storey houses, large banco (raw earth) dwellings with an upper floor, rare in West Africa, as well as for its monumental kapok trees. Some houses can be visited with their owners, who explain building techniques and Jola life. An easy stop on the way to Carabane.",
          tips: "A small contribution is usually requested for the visit; stay on the main road and travel by day.",
        },
      },
      {
        slug: "poulet-yassa-casamance",
        category: "GASTRONOMY",
        name: "Le yassa, plat né en Casamance",
        summary: "Poulet ou poisson mariné au citron et fondu d'oignons, servi avec du riz blanc.",
        description:
          "Originaire de Casamance, le yassa est devenu l'un des plats les plus populaires du Sénégal : du poulet (ou du poisson) mariné dans le jus de citron, grillé, puis mijoté dans une sauce d'oignons longuement fondus, relevée de moutarde et de piment, servi avec du riz blanc. En Casamance, on le décline aussi avec des huîtres de palétuvier.",
        tips: "Demandez « yassa poulet » ou « yassa poisson » dans les gargotes ; le piment est souvent servi à part.",
        visitMinutes: 60,
        cover: "/images/voyage/lieu-poulet-yassa-casamance",
        en: {
          name: "Yassa, a dish born in Casamance",
          summary: "Chicken or fish marinated in lemon with melted onions, served with white rice.",
          description:
            "Originally from Casamance, yassa has become one of Senegal's most popular dishes: chicken (or fish) marinated in lemon juice, grilled, then simmered in a sauce of slowly cooked onions, spiced with mustard and chilli, and served with white rice. In Casamance it is also made with mangrove oysters.",
          tips: "Ask for “yassa poulet” or “yassa poisson” in local eateries; chilli is often served on the side.",
        },
      },
    ],
  },
  {
    slug: "thies-grande-cote",
    name: "Thiès, Tivaouane et la Grande Côte",
    region: "Thiès",
    summary: "Ville des tapisseries, cité sainte des Tidjanes, abbaye musicale, pêche à Kayar et dunes de Lompoul.",
    description:
      "À une heure de Dakar par l'autoroute, Thiès, carrefour ferroviaire historique, est connue pour ses manufactures de tapisseries d'art. Au nord, Tivaouane est la capitale de la confrérie tidjane et accueille chaque année le Gamou, tandis que l'abbaye de Keur Moussa fait résonner la kora dans sa liturgie. Sur la Grande Côte, Kayar est l'un des plus grands ports de pêche artisanale du pays, et plus au nord, entre Dakar et Saint-Louis, les dunes ocre de Lompoul offrent un avant-goût du Sahara. Attention : la mer est très dangereuse sur toute la Grande Côte.",
    lat: 14.7906,
    lng: -16.9247,
    cover: "/images/voyage/thies-grande-cote",
    en: {
      name: "Thiès, Tivaouane and the Grande Côte",
      region: "Thiès",
      summary: "City of tapestries, holy city of the Tijaniyya, a musical abbey, fishing at Kayar and the Lompoul dunes.",
      description:
        "An hour from Dakar by motorway, Thiès, a historic railway junction, is known for its art tapestry workshops. To the north, Tivaouane is the capital of the Tijani brotherhood and hosts the Gamou every year, while Keur Moussa abbey sets the kora ringing in its liturgy. On the Grande Côte, Kayar is one of the country's biggest artisanal fishing ports, and further north, between Dakar and Saint-Louis, the ochre dunes of Lompoul offer a foretaste of the Sahara. Note that the sea is very dangerous all along the Grande Côte.",
    },
    places: [
      {
        slug: "manufactures-arts-decoratifs-thies",
        category: "CULTURE",
        name: "Manufactures sénégalaises des arts décoratifs (MSAD)",
        summary: "Atelier de tapisserie d'art créé en 1966 à l'initiative de Senghor : métiers à tisser et œuvres monumentales.",
        description:
          "Fondées en 1966 à Thiès à l'initiative de Léopold Sédar Senghor, dans l'élan de l'École de Dakar, les Manufactures sénégalaises des arts décoratifs tissent à la main des tapisseries d'après des cartons d'artistes sénégalais. Les premiers lissiers avaient été formés à la manufacture des Gobelins, à Paris. Une salle d'exposition présente des œuvres aux couleurs vives, et il est souvent possible d'observer les lissiers au travail.",
        tips: "Renseignez-vous à l'avance sur les possibilités de visite des ateliers ; les tapisseries sont vendues sur commande.",
        visitMinutes: 60,
        lat: 14.7945,
        lng: -16.9343,
        cover: "/images/voyage/lieu-manufactures-arts-decoratifs-thies",
        en: {
          name: "Senegalese Decorative Arts Workshops (MSAD)",
          summary: "Art tapestry workshop founded in 1966 on Senghor's initiative: looms and monumental works.",
          description:
            "Founded in Thiès in 1966 on the initiative of Léopold Sédar Senghor, in the spirit of the Dakar School, the Senegalese Decorative Arts Workshops hand-weave tapestries from designs by Senegalese artists. The first weavers were trained at the Gobelins manufactory in Paris. A showroom displays brightly coloured works, and it is often possible to watch the weavers at work.",
          tips: "Ask in advance about visiting the workshops; tapestries are sold to order.",
        },
      },
      {
        slug: "grande-mosquee-tivaouane",
        category: "RELIGION",
        name: "Grande Mosquée et cité religieuse de Tivaouane",
        summary: "Capitale spirituelle de la Tidjaniya au Sénégal, autour des mausolées d'El Hadji Malick Sy.",
        description:
          "Tivaouane est le grand foyer de la confrérie soufie tidjane au Sénégal depuis qu'El Hadji Malick Sy s'y est installé au début du XXe siècle. Autour de la Grande Mosquée s'élèvent les mausolées de ses descendants et les demeures de la famille religieuse. Chaque année, la ville accueille le Gamou, la célébration de la naissance du Prophète, qui rassemble des foules immenses.",
        tips: "Tenue couvrante, foulard pour les femmes ; venez en dehors du Gamou pour une visite tranquille, accompagné d'une personne de la communauté.",
        visitMinutes: 60,
        lat: 14.9526,
        lng: -16.8124,
        cover: "/images/voyage/lieu-grande-mosquee-tivaouane",
        en: {
          name: "Great Mosque and religious city of Tivaouane",
          summary: "The spiritual capital of the Tijaniyya in Senegal, around the mausoleums of El Hadji Malick Sy.",
          description:
            "Tivaouane has been the main centre of the Tijani Sufi brotherhood in Senegal since El Hadji Malick Sy settled there in the early 20th century. Around the Great Mosque stand the mausoleums of his descendants and the homes of the religious family. Every year the town hosts the Gamou, the celebration of the Prophet's birth, which draws immense crowds.",
          tips: "Wear covering clothes, with a headscarf for women; come outside the Gamou for a quiet visit, accompanied by a member of the community.",
        },
      },
      {
        slug: "abbaye-de-keur-moussa",
        category: "RELIGION",
        name: "Abbaye de Keur Moussa",
        summary: "Monastère bénédictin célèbre pour sa liturgie accompagnée à la kora.",
        description:
          "Fondée en 1961 par des moines venus de l'abbaye de Solesmes et inaugurée en 1963, l'abbaye bénédictine de Keur Moussa, entre Dakar et Thiès, est connue pour avoir adapté la liturgie aux instruments et aux mélodies d'Afrique de l'Ouest : les offices y sont chantés au son de la kora et du balafon. Les moines fabriquent aussi des koras et vendent à la boutique des produits de leur verger, comme des confitures.",
        tips: "La messe dominicale, très fréquentée, est le meilleur moment pour entendre la kora ; arrivez en avance et restez discret pendant les offices.",
        visitMinutes: 120,
        lat: 14.7783,
        lng: -17.1242,
        cover: "/images/voyage/lieu-abbaye-de-keur-moussa",
        en: {
          name: "Keur Moussa Abbey",
          summary: "A Benedictine monastery famous for its kora-accompanied liturgy.",
          description:
            "Founded in 1961 by monks from Solesmes Abbey and inaugurated in 1963, the Benedictine abbey of Keur Moussa, between Dakar and Thiès, is known for adapting the liturgy to West African instruments and melodies: services are sung to the sound of the kora and balafon. The monks also make koras and sell produce from their orchard, such as jams, in the shop.",
          tips: "Sunday mass, which is very popular, is the best time to hear the kora; arrive early and stay discreet during services.",
        },
      },
      {
        slug: "plage-de-kayar",
        category: "MARKET",
        name: "Plage des pêcheurs de Kayar",
        summary: "Grand port de pêche artisanale de la Grande Côte : pirogues par centaines et marché au poisson.",
        description:
          "À une soixantaine de kilomètres au nord de Dakar, Kayar est l'un des principaux centres de pêche artisanale du Sénégal. Sur la longue plage, des centaines de pirogues colorées sont tirées sur le sable ; en fin de journée, le débarquement et la vente du poisson donnent lieu à une effervescence spectaculaire. La fosse marine au large, très poissonneuse, explique l'importance du port.",
        tips: "Ne vous baignez pas : la mer est dangereuse sur la Grande Côte. Demandez avant de photographier et restez à l'écart des pirogues lors des manœuvres.",
        visitMinutes: 90,
        lat: 14.9157,
        lng: -17.1238,
        cover: "/images/voyage/lieu-plage-de-kayar",
        en: {
          name: "Kayar fishermen's beach",
          summary: "A big artisanal fishing port on the Grande Côte: hundreds of pirogues and a fish market.",
          description:
            "Some sixty kilometres north of Dakar, Kayar is one of Senegal's main artisanal fishing centres. On the long beach, hundreds of colourful pirogues are hauled up on the sand; at the end of the day, landing and selling the catch creates a spectacular bustle. The deep, fish-rich submarine canyon offshore explains the port's importance.",
          tips: "Do not swim: the sea is dangerous on the Grande Côte. Ask before taking photos and keep clear of the pirogues when they are being manoeuvred.",
        },
      },
      {
        slug: "desert-de-lompoul",
        category: "NATURE",
        name: "Désert de Lompoul",
        summary: "Petit désert de dunes ocre à quelques kilomètres de l'océan, entre Dakar et Saint-Louis.",
        description:
          "Dans la région de Louga, entre Kébémer et Lompoul-sur-Mer, le désert de Lompoul couvre environ 18 km² de dunes de sable fin aux tons ocre et orangés, hautes parfois de plusieurs dizaines de mètres. On y vient pour une nuit sous la tente nomade, une balade à dos de dromadaire et le coucher de soleil sur les dunes. Une étape appréciée sur la route de Saint-Louis.",
        tips: "Prévoyez une veste pour la nuit, fraîche en saison sèche ; réservez votre campement à l'avance et protégez vos appareils du sable.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 720,
        lat: 15.4624,
        lng: -16.688,
        cover: "/images/voyage/lieu-desert-de-lompoul",
        en: {
          name: "Lompoul Desert",
          summary: "A small desert of ochre dunes a few kilometres from the ocean, between Dakar and Saint-Louis.",
          description:
            "In the Louga region, between Kébémer and Lompoul-sur-Mer, the Lompoul desert covers about 18 km² of fine-sand dunes in ochre and orange tones, sometimes several dozen metres high. People come for a night in a nomad tent, a camel ride and sunset over the dunes. A popular stop on the road to Saint-Louis.",
          tips: "Bring a jacket for the night, which is cool in the dry season; book your camp in advance and protect your devices from the sand.",
          bestPeriod: "November to May",
        },
      },
    ],
  },
  {
    slug: "kaolack",
    name: "Kaolack et les cercles mégalithiques",
    region: "Kaolack",
    summary: "Capitale du bassin arachidier, haut lieu de la Tidjaniya niassène et porte des mégalithes classés à l'UNESCO.",
    description:
      "Sur la rive du Saloum, à environ 190 km au sud-est de Dakar, Kaolack est un grand carrefour commercial au cœur du bassin arachidier, avec l'un des grands marchés du pays. Le quartier de Médina Baye, fondé par Cheikh Ibrahima Niass, est un centre spirituel de rayonnement international. À l'est, vers Nioro du Rip et Kaffrine, les cercles mégalithiques de Sine Ngayène et de Wanar, inscrits au patrimoine mondial, comptent parmi les ensembles de pierres dressées les plus remarquables d'Afrique.",
    lat: 14.1667,
    lng: -16.0833,
    cover: "/images/voyage/kaolack",
    en: {
      name: "Kaolack and the stone circles",
      region: "Kaolack",
      summary: "Capital of the groundnut basin, a major Niassene Tijani centre and gateway to UNESCO-listed megaliths.",
      description:
        "On the banks of the Saloum, about 190 km south-east of Dakar, Kaolack is a major trading hub at the heart of the groundnut basin, with one of the country's big markets. The Médina Baye district, founded by Cheikh Ibrahima Niass, is a spiritual centre with an international following. To the east, towards Nioro du Rip and Kaffrine, the stone circles of Sine Ngayène and Wanar, World Heritage sites, are among the most remarkable groups of standing stones in Africa.",
    },
    places: [
      {
        slug: "grande-mosquee-medina-baye-kaolack",
        category: "RELIGION",
        name: "Grande Mosquée de Médina Baye",
        summary: "Le sanctuaire de Cheikh Ibrahima Niass, foyer de la Tidjaniya suivi par des fidèles de toute l'Afrique.",
        description:
          "Dans le quartier de Médina Baye, à Kaolack, la Grande Mosquée abrite le mausolée de Cheikh Ibrahima Niass (1900-1975), dit Baye Niass, figure majeure de la confrérie tidjane dont le mouvement compte des millions de disciples au Nigeria, au Ghana, au Niger et au-delà. Le quartier vit au rythme des prières, des enseignements coraniques et des visiteurs venus de toute l'Afrique de l'Ouest, particulièrement lors du Gamou.",
        tips: "Tenue couvrante, foulard pour les femmes ; demandez à être accompagné par une personne de la communauté et évitez les heures de prière.",
        visitMinutes: 60,
        lat: 14.1609,
        lng: -16.0629,
        en: {
          name: "Great Mosque of Médina Baye",
          summary: "The shrine of Cheikh Ibrahima Niass, a Tijani centre followed by believers from all over Africa.",
          description:
            "In the Médina Baye district of Kaolack, the Great Mosque houses the mausoleum of Cheikh Ibrahima Niass (1900-1975), known as Baye Niass, a major figure of the Tijani brotherhood whose movement has millions of followers in Nigeria, Ghana, Niger and beyond. The district lives to the rhythm of prayers, Koranic teaching and visitors from all over West Africa, especially during the Gamou.",
          tips: "Wear covering clothes, with a headscarf for women; ask to be accompanied by a member of the community and avoid prayer times.",
        },
      },
      {
        slug: "cercles-megalithiques-sine-ngayene",
        category: "HISTORY",
        name: "Cercles mégalithiques de Sine Ngayène et Wanar",
        summary: "Des dizaines de cercles de pierres dressées vieux de plus de mille ans, inscrits au patrimoine mondial.",
        description:
          "Les cercles mégalithiques de Sénégambie, inscrits au patrimoine mondial de l'UNESCO en 2006, regroupent plus de mille monuments le long du fleuve Gambie. Côté sénégalais, Sine Ngayène (52 cercles, près de Nioro du Rip) et Wanar (21 cercles, près de Kaffrine) alignent des pierres de latérite taillées, hautes d'environ deux mètres, élevées au-dessus de sépultures entre le VIIe et le XVe siècle environ.",
        tips: "Les sites sont isolés : venez de jour avec un chauffeur, de l'eau et un chapeau. Ne déplacez ni ne grimpez sur les pierres.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 90,
        lat: 13.6953,
        lng: -15.5353,
        cover: "/images/voyage/lieu-cercles-megalithiques-sine-ngayene",
        en: {
          name: "Sine Ngayène and Wanar stone circles",
          summary: "Dozens of circles of standing stones over a thousand years old, on the World Heritage List.",
          description:
            "The Senegambian stone circles, inscribed on the UNESCO World Heritage List in 2006, comprise over a thousand monuments along the Gambia river. On the Senegalese side, Sine Ngayène (52 circles, near Nioro du Rip) and Wanar (21 circles, near Kaffrine) line up dressed laterite stones about two metres high, raised over burials roughly between the 7th and 15th centuries.",
          tips: "The sites are isolated: come by day with a driver, water and a hat. Do not move or climb on the stones.",
          bestPeriod: "November to May",
        },
      },
    ],
  },
  {
    slug: "senegal-oriental",
    name: "Sénégal oriental : Kédougou et Niokolo-Koba",
    region: "Kédougou / Tambacounda",
    summary: "Collines, cascades, pays Bassari classé à l'UNESCO et grand parc national de savane, à l'extrême sud-est.",
    description:
      "À plus de 650 km de Dakar, le sud-est du pays tranche avec le reste du Sénégal : collines boisées, rivières, cascade de Dindéfelo et villages bassari, bédik et peuls perchés sur les contreforts du Fouta-Djalon, ensemble inscrit au patrimoine mondial en 2012. Plus au nord, le parc national du Niokolo-Koba protège une vaste savane traversée par le fleuve Gambie. Kédougou sert de base. France Diplomatie déconseille, sauf raison impérative, les zones frontalières avec le Mali, à l'est : restez sur les itinéraires vers l'ouest et le sud de Kédougou, de jour, avec un guide local.",
    lat: 12.5556,
    lng: -12.1808,
    cover: "/images/voyage/senegal-oriental",
    en: {
      name: "Eastern Senegal: Kédougou and Niokolo-Koba",
      region: "Kédougou / Tambacounda",
      summary: "Hills, waterfalls, UNESCO-listed Bassari country and a large savannah national park, in the far south-east.",
      description:
        "More than 650 km from Dakar, the south-east contrasts with the rest of Senegal: wooded hills, rivers, the Dindéfelo waterfall and Bassari, Bedik and Fula villages perched on the foothills of the Fouta Djallon, a landscape inscribed on the World Heritage List in 2012. Further north, Niokolo-Koba National Park protects a vast savannah crossed by the Gambia river. Kédougou serves as a base. France Diplomatie advises against all but essential travel to the border areas with Mali, to the east: stick to routes west and south of Kédougou, by day, with a local guide.",
    },
    places: [
      {
        slug: "pays-bassari-kedougou",
        category: "CULTURE",
        name: "Pays Bassari : paysages culturels bassari, peul et bédik",
        summary: "Villages perchés, terrasses et rites d'initiation vivants, inscrits au patrimoine mondial de l'UNESCO.",
        description:
          "Autour de Bandafassi, Salémata et Éthiolo, les Bassari, les Bédik et les Peuls ont façonné des paysages de collines ponctués de villages de cases rondes au toit de chaume, de champs en terrasses et de sites sacrés. Ces paysages culturels, où se maintiennent des rites d'initiation et des cérémonies masquées, sont inscrits au patrimoine mondial depuis 2012. Le village bédik d'Iwol, perché sur une colline et dominé par un fromager géant, est l'une des visites les plus courues.",
        tips: "Partez avec un guide de Kédougou ou de Bandafassi, demandez toujours l'autorisation du chef de village et avant chaque photo ; prévoyez de bonnes chaussures pour les montées.",
        bestPeriod: "Novembre à mai",
        visitMinutes: 360,
        lat: 12.5933,
        lng: -12.8458,
        cover: "/images/voyage/lieu-pays-bassari-kedougou",
        en: {
          name: "Bassari Country: Bassari, Fula and Bedik cultural landscapes",
          summary: "Hilltop villages, terraces and living initiation rites, on the UNESCO World Heritage List.",
          description:
            "Around Bandafassi, Salémata and Ethiolo, the Bassari, Bedik and Fula peoples have shaped hilly landscapes dotted with villages of round thatched huts, terraced fields and sacred sites. These cultural landscapes, where initiation rites and masked ceremonies are still practised, have been on the World Heritage List since 2012. The Bedik village of Iwol, perched on a hill and overlooked by a giant kapok tree, is one of the most popular visits.",
          tips: "Go with a guide from Kédougou or Bandafassi, always ask the village chief's permission and ask before every photo; wear good shoes for the climbs.",
          bestPeriod: "November to May",
        },
      },
      {
        slug: "cascade-de-dindefelo",
        category: "NATURE",
        name: "Cascade de Dindéfelo",
        summary: "Chute d'eau d'une centaine de mètres au fond d'une gorge boisée, près de la frontière guinéenne.",
        description:
          "Près du village de Dindéfelo, au sud de Kédougou, une courte marche dans une forêt-galerie mène à une chute d'environ 100 mètres qui tombe dans un bassin où l'on peut se baigner. Le site, classé et géré par la communauté villageoise, abrite aussi une population de chimpanzés suivie par des programmes de conservation.",
        tips: "Le débit est le plus spectaculaire en fin de saison des pluies (septembre-novembre), quand les pistes peuvent être difficiles. Un droit d'entrée communautaire est demandé.",
        bestPeriod: "Octobre à janvier",
        visitMinutes: 240,
        lat: 12.3972,
        lng: -12.3117,
        cover: "/images/voyage/lieu-cascade-de-dindefelo",
        en: {
          name: "Dindéfelo waterfall",
          summary: "A waterfall of about a hundred metres in a wooded gorge, near the Guinean border.",
          description:
            "Near the village of Dindéfelo, south of Kédougou, a short walk through gallery forest leads to a fall of about 100 metres dropping into a pool where you can swim. The site, listed and managed by the village community, is also home to a chimpanzee population monitored by conservation programmes.",
          tips: "The flow is most spectacular at the end of the rainy season (September to November), when tracks can be difficult. A community entrance fee is charged.",
          bestPeriod: "October to January",
        },
      },
      {
        slug: "parc-national-niokolo-koba",
        category: "NATURE",
        name: "Parc national du Niokolo-Koba",
        summary: "Le plus grand parc du pays, classé à l'UNESCO : savane, forêts-galeries et fleuve Gambie.",
        description:
          "Parc national depuis 1954 et inscrit au patrimoine mondial et réserve de biosphère depuis 1981, le Niokolo-Koba couvre près d'un million d'hectares de savanes, de forêts-galeries et de mares le long du fleuve Gambie. On peut y observer antilopes, phacochères, singes, hippopotames, crocodiles et de nombreux oiseaux ; les grands prédateurs sont rares et discrets. Inscrit sur la liste du patrimoine en péril en 2007, il en a été retiré en 2024 grâce à l'amélioration de sa conservation.",
        tips: "Visite en 4x4 avec un guide agréé, au départ de Tambacounda ou de Kédougou ; la plupart des pistes sont impraticables en saison des pluies.",
        bestPeriod: "Décembre à mai",
        visitMinutes: 600,
        lat: 13.0667,
        lng: -12.7167,
        cover: "/images/voyage/lieu-parc-national-niokolo-koba",
        en: {
          name: "Niokolo-Koba National Park",
          summary: "The country's largest park, UNESCO-listed: savannah, gallery forests and the Gambia river.",
          description:
            "A national park since 1954 and a World Heritage Site and biosphere reserve since 1981, Niokolo-Koba covers nearly a million hectares of savannah, gallery forest and pools along the Gambia river. Antelopes, warthogs, monkeys, hippos, crocodiles and many birds can be seen; large predators are rare and elusive. Placed on the List of World Heritage in Danger in 2007, it was removed in 2024 thanks to improved conservation.",
          tips: "Visit by 4x4 with an approved guide, leaving from Tambacounda or Kédougou; most tracks are impassable in the rainy season.",
          bestPeriod: "December to May",
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
