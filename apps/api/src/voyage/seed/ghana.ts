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
    cover: "/images/voyage/accra",
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
        cover: "/images/voyage/lieu-parc-memorial-kwame-nkrumah",
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
        cover: "/images/voyage/lieu-jamestown-accra",
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
        cover: "/images/voyage/lieu-marche-de-makola",
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
        cover: "/images/voyage/lieu-osu-accra",
        en: {
          name: "Osu and street food",
          summary: "A lively district to taste jollof, waakye, kelewele and grilled fish.",
          description:
            "Around Oxford Street, the Osu district is packed with restaurants, bars and street vendors. It is the ideal place to discover Ghanaian food: jollof rice, waakye (rice and beans), kelewele (spicy fried plantain), fufu or banku with soups, grilled fish and tilapia. In the evening, the music takes over.",
          tips: "“Chop bars” serve traditional dishes at low prices; choose busy stalls where food turns over quickly.",
        },
      },
      {
        slug: "place-de-l-independance-accra",
        category: "HISTORY",
        name: "Place de l'Indépendance (Black Star Square)",
        summary: "Immense esplanade face à l'océan, avec l'arche de l'Indépendance et l'Étoile noire.",
        description:
          "Aménagée au début des années 1960, sous la présidence de Kwame Nkrumah, cette vaste place de parade borde l'océan à quelques minutes du parc mémorial. L'arche de l'Indépendance, l'Étoile noire symbole du pays et la flamme du soldat inconnu y rappellent la naissance de la nation. C'est là que se déroulent les grands défilés officiels, notamment celui de la fête de l'Indépendance, le 6 mars.",
        tips: "Le site est entouré de bâtiments officiels : demandez avant de photographier les militaires et les gardes, et évitez les heures les plus chaudes.",
        visitMinutes: 45,
        lat: 5.5476,
        lng: -0.1926,
        cover: "/images/voyage/lieu-place-de-l-independance-accra",
        en: {
          name: "Independence Square (Black Star Square)",
          summary: "A huge parade ground facing the ocean, with the Independence Arch and the Black Star.",
          description:
            "Laid out in the early 1960s under President Kwame Nkrumah, this vast parade ground lies along the ocean a few minutes from the Memorial Park. The Independence Arch, the Black Star that symbolises the country and the eternal flame of the unknown soldier recall the birth of the nation. The main official parades are held here, especially the Independence Day parade on 6 March.",
          tips: "The site is surrounded by official buildings: ask before photographing soldiers and guards, and avoid the hottest hours.",
        },
      },
      {
        slug: "musee-national-du-ghana",
        category: "MUSEUM",
        name: "Musée national du Ghana",
        summary: "Archéologie, ethnographie et arts du Ghana, dans un musée rénové du quartier d'Adabraka.",
        description:
          "Ouvert en 1957, l'année de l'indépendance, le musée national est géré par le Ghana Museums and Monuments Board. Fermé plusieurs années pour travaux, il a rouvert en 2022 après une rénovation complète. Ses collections présentent l'archéologie, les objets de cour, les instruments de musique, les textiles et l'art du pays : une bonne introduction avant de partir vers Kumasi ou la côte.",
        tips: "Renseignez-vous sur les conditions de visite avant de vous déplacer ; la photographie peut être réglementée dans les salles.",
        visitMinutes: 90,
        lat: 5.5604,
        lng: -0.2064,
        cover: "/images/voyage/lieu-musee-national-du-ghana",
        en: {
          name: "National Museum of Ghana",
          summary: "Archaeology, ethnography and art of Ghana, in a renovated museum in the Adabraka district.",
          description:
            "Opened in 1957, the year of independence, the National Museum is run by the Ghana Museums and Monuments Board. Closed for several years for works, it reopened in 2022 after a complete renovation. Its collections cover archaeology, court regalia, musical instruments, textiles and the country's art: a good introduction before heading to Kumasi or the coast.",
          tips: "Check visiting conditions before you go; photography may be restricted in the galleries.",
        },
      },
      {
        slug: "centre-national-de-culture-accra",
        category: "MARKET",
        name: "Centre national de culture (Arts Centre)",
        summary: "Le grand marché artisanal d'Accra : kente, masques, tambours, perles et sculptures.",
        description:
          "Près du front de mer, entre Jamestown et la place de l'Indépendance, le Centre national de culture, que tout le monde appelle « Arts Centre », réunit des dizaines d'échoppes d'artisans et de revendeurs. On y trouve étoffes kente et adinkra, perles, tambours, masques, sculptures et paniers venus de tout le pays. Un passage pratique pour les achats de fin de séjour.",
        tips: "Les premiers prix annoncés sont élevés : comparez plusieurs boutiques et négociez avec le sourire. Restez ferme face aux vendeurs trop insistants.",
        visitMinutes: 90,
        lat: 5.5458,
        lng: -0.202,
        cover: "/images/voyage/lieu-centre-national-de-culture-accra",
        en: {
          name: "Centre for National Culture (Arts Centre)",
          summary: "Accra's big crafts market: kente, masks, drums, beads and carvings.",
          description:
            "Near the seafront, between Jamestown and Independence Square, the Centre for National Culture, known to everyone as the “Arts Centre”, brings together dozens of craftspeople's and traders' stalls. Here you will find kente and adinkra cloth, beads, drums, masks, carvings and baskets from all over the country. A handy stop for end-of-trip shopping.",
          tips: "Opening prices are high: compare several stalls and bargain with a smile. Stay firm with over-insistent sellers.",
        },
      },
      {
        slug: "plage-de-labadi",
        category: "LEISURE",
        name: "Plage de Labadi (La Pleasure Beach)",
        summary: "La plage la plus animée d'Accra : musique, danse, balades à cheval et soirées de week-end.",
        description:
          "À l'est du centre, la plage de Labadi, ou La Pleasure Beach, est le rendez-vous des Accréens le week-end et les jours fériés. Sur le sable se succèdent sonos, percussionnistes, acrobates, cavaliers et vendeurs de noix de coco ou de poisson grillé, et l'animation se prolonge en soirée, surtout en décembre et à Pâques. Une immersion dans les loisirs de la capitale plus qu'une plage de baignade.",
        tips: "La baignade est dangereuse (fortes vagues et courants) : restez au bord. Gardez peu d'objets de valeur sur vous et repartez avant la nuit noire si vous êtes seul.",
        visitMinutes: 180,
        lat: 5.5639,
        lng: -0.1406,
        cover: "/images/voyage/lieu-plage-de-labadi",
        en: {
          name: "Labadi Beach (La Pleasure Beach)",
          summary: "Accra's liveliest beach: music, dancing, horse rides and weekend parties.",
          description:
            "East of the centre, Labadi Beach, or La Pleasure Beach, is where Accra residents gather at weekends and on public holidays. Sound systems, drummers, acrobats, horse riders and sellers of coconuts or grilled fish line the sand, and the fun carries on into the evening, especially in December and at Easter. More an immersion in the capital's leisure life than a swimming beach.",
          tips: "Swimming is dangerous (big waves and currents): stay at the water's edge. Carry few valuables and leave before full dark if you are alone.",
        },
      },
      {
        slug: "plage-de-kokrobite",
        category: "BEACH",
        name: "Plage de Kokrobite",
        summary: "Village de pêcheurs et longue plage à l'ouest d'Accra, escapade prisée le week-end.",
        description:
          "À une trentaine de kilomètres à l'ouest du centre d'Accra, Kokrobite est un village de pêcheurs ga dont la longue plage, bordée de pirogues et de cocotiers, attire citadins et voyageurs en quête de calme. On y vient pour flâner au bord de l'eau, regarder le retour des pêcheurs et profiter d'une ambiance détendue, souvent rythmée par la musique et les percussions.",
        tips: "Courants dangereux : renseignez-vous avant de vous baigner. Ne vous isolez pas sur la plage, surtout le soir, et prévoyez un transport fiable pour le retour.",
        visitMinutes: 240,
        lat: 5.4977,
        lng: -0.3649,
        cover: "/images/voyage/lieu-plage-de-kokrobite",
        en: {
          name: "Kokrobite Beach",
          summary: "A fishing village and long beach west of Accra, a popular weekend escape.",
          description:
            "Some thirty kilometres west of central Accra, Kokrobite is a Ga fishing village whose long beach, lined with canoes and palm trees, draws city dwellers and travellers looking for some calm. People come to stroll along the shore, watch the fishermen return and enjoy a relaxed atmosphere, often set to music and drumming.",
          tips: "Dangerous currents: ask before swimming. Do not wander off alone on the beach, especially in the evening, and arrange reliable transport back.",
        },
      },
      {
        slug: "jardins-botaniques-d-aburi",
        category: "NATURE",
        name: "Jardins botaniques d'Aburi",
        summary: "Jardin créé en 1890 sur les collines de l'Akuapem, à l'air frais, à une heure d'Accra.",
        description:
          "Perchés sur la crête de l'Akuapem, au nord d'Accra, les jardins botaniques d'Aburi ont été ouverts en 1890. Allées de palmiers royaux, arbres géants, plantes médicinales et pelouses ombragées en font un lieu de promenade apprécié, à la fraîcheur bienvenue. La route qui y monte est bordée d'ateliers de sculpteurs sur bois, et la ville voisine d'Akropong accueille chaque automne la fête de l'Odwira.",
        tips: "Venez en semaine pour plus de calme ; prévoyez une petite laine en saison des pluies, les collines sont plus fraîches que la côte.",
        visitMinutes: 150,
        lat: 5.8536,
        lng: -0.1758,
        cover: "/images/voyage/lieu-jardins-botaniques-d-aburi",
        en: {
          name: "Aburi Botanical Gardens",
          summary: "A garden founded in 1890 in the cool Akuapem hills, an hour from Accra.",
          description:
            "Perched on the Akuapem ridge north of Accra, the Aburi Botanical Gardens opened in 1890. Avenues of royal palms, giant trees, medicinal plants and shady lawns make them a popular place for a walk, with a welcome coolness. The road up is lined with woodcarvers' workshops, and the nearby town of Akropong hosts the Odwira festival every autumn.",
          tips: "Come on a weekday for more peace; bring a light layer in the rainy season, as the hills are cooler than the coast.",
        },
      },
      {
        slug: "reserve-de-shai-hills",
        category: "NATURE",
        name: "Réserve de Shai Hills",
        summary: "Savane, collines rocheuses, grottes et babouins à une heure à l'est d'Accra.",
        description:
          "Au nord-est d'Accra, la Shai Hills Resource Reserve protège une savane parsemée d'inselbergs, autrefois habités par le peuple shai. Des sentiers et des pistes permettent d'y observer babouins, antilopes et nombreux oiseaux, et de grimper vers des grottes et des points de vue sur les plaines d'Accra. Une sortie nature facile à combiner avec la route d'Akosombo.",
        tips: "Partez tôt le matin, quand les animaux sont actifs et la chaleur supportable. Ne nourrissez pas les babouins et gardez vos sacs fermés.",
        visitMinutes: 180,
        lat: 5.884,
        lng: 0.0386,
        cover: "/images/voyage/lieu-reserve-de-shai-hills",
        en: {
          name: "Shai Hills Resource Reserve",
          summary: "Savannah, rocky hills, caves and baboons an hour east of Accra.",
          description:
            "North-east of Accra, the Shai Hills Resource Reserve protects a savannah dotted with inselbergs once inhabited by the Shai people. Trails and tracks let you see baboons, antelopes and many birds, and climb up to caves and viewpoints over the Accra plains. An easy nature outing to combine with the road to Akosombo.",
          tips: "Set off early in the morning, when the animals are active and the heat bearable. Do not feed the baboons and keep your bags closed.",
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
        cover: "/images/voyage/lieu-chateau-de-cape-coast",
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
        cover: "/images/voyage/lieu-canopee-de-kakum",
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
        lat: 5.5248,
        lng: -1.1688,
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
        cover: "/images/voyage/lieu-fetu-afahye",
        en: {
          name: "Fetu Afahye Festival",
          summary: "Cape Coast's great annual festival: procession of chiefs, drums and costumes.",
          description:
            "Every year, the people of Cape Coast (Oguaa) celebrate Fetu Afahye, a traditional festival that, according to tradition, commemorates the end of an epidemic and marks a time of purification and renewal. The highlight is the colourful procession of chiefs carried in palanquins, accompanied by the asafo companies, drummers and crowds through the streets of the town.",
          tips: "Exact dates are set each year by the traditional authorities: check them before booking.",
          bestPeriod: "Early September",
        },
      },
      {
        slug: "fort-william-anomabo",
        category: "HISTORY",
        name: "Fort William d'Anomabo",
        summary: "Fort britannique du XVIIIe siècle au bord de l'océan, inscrit au patrimoine mondial.",
        description:
          "À une quinzaine de kilomètres à l'est de Cape Coast, le fort William fut construit par les Britanniques au milieu du XVIIIe siècle à Anomabo, alors l'un des principaux ports de traite de la Côte-de-l'Or. Il fait partie des forts et châteaux du Ghana inscrits au patrimoine mondial de l'UNESCO. Moins fréquenté que les châteaux de Cape Coast et d'Elmina, il permet une visite plus intime de ses cours, cachots et remparts face à la mer.",
        tips: "Une halte facile sur la route Accra–Cape Coast ; faites-vous accompagner par le guide du site.",
        visitMinutes: 60,
        lat: 5.1743,
        lng: -1.119,
        cover: "/images/voyage/lieu-fort-william-anomabo",
        en: {
          name: "Fort William, Anomabo",
          summary: "An 18th-century British fort by the ocean, a World Heritage Site.",
          description:
            "Some fifteen kilometres east of Cape Coast, Fort William was built by the British in the mid-18th century at Anomabo, then one of the main slave-trading ports of the Gold Coast. It is one of Ghana's forts and castles on the UNESCO World Heritage List. Less visited than the castles of Cape Coast and Elmina, it offers a more intimate visit of its courtyards, dungeons and ramparts facing the sea.",
          tips: "An easy stop on the Accra–Cape Coast road; go round with the site guide.",
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
        cover: "/images/voyage/lieu-chateau-d-elmina",
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
        cover: "/images/voyage/lieu-fort-saint-jacques-elmina",
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
        cover: "/images/voyage/lieu-port-de-peche-d-elmina",
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
    cover: "/images/voyage/busua",
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
        cover: "/images/voyage/lieu-plage-de-busua",
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
        lat: 4.7932,
        lng: -1.9448,
        cover: "/images/voyage/lieu-fort-metal-cross-dixcove",
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
        cover: "/images/voyage/lieu-cap-des-trois-pointes",
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
    cover: "/images/voyage/kumasi",
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
        cover: "/images/voyage/lieu-musee-du-palais-de-manhyia",
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
        cover: "/images/voyage/lieu-akwasidae-kumasi",
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
        lat: 6.7933,
        lng: -1.4732,
        cover: "/images/voyage/lieu-bonwire-kente",
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
        cover: "/images/voyage/lieu-lac-bosumtwi",
        en: {
          name: "Lake Bosumtwi",
          summary: "A sacred crater lake ringed by wooded hills, some thirty kilometres from Kumasi.",
          description:
            "Formed by a meteorite impact, Lake Bosumtwi fills an almost circular crater surrounded by green hills. Sacred to the Ashanti, it is lined with fishing villages that still use traditional planks for fishing. Walks or bike rides around the lake and stays in lodges make it a peaceful escape from Kumasi.",
        },
      },
      {
        slug: "marche-de-kejetia",
        category: "MARKET",
        name: "Marché de Kejetia (marché central de Kumasi)",
        summary: "L'un des plus grands marchés d'Afrique de l'Ouest, labyrinthe de milliers d'étals.",
        description:
          "Au cœur de Kumasi, le marché central de Kejetia compte des milliers de boutiques et d'étals et passe pour l'un des plus grands marchés d'Afrique de l'Ouest. Tissus, perles, chaussures, ustensiles, ignames, épices, escargots géants et plantes médicinales s'y côtoient dans un dédale d'allées. Une partie du site a été reconstruite à la fin des années 2010 autour d'une nouvelle gare routière.",
        tips: "Venez le matin avec un guide ou un habitant pour ne pas vous perdre ; gardez vos affaires près de vous dans la foule.",
        visitMinutes: 120,
        lat: 6.6958,
        lng: -1.6211,
        cover: "/images/voyage/lieu-marche-de-kejetia",
        en: {
          name: "Kejetia Market (Kumasi Central Market)",
          summary: "One of the largest markets in West Africa, a maze of thousands of stalls.",
          description:
            "In the heart of Kumasi, Kejetia central market has thousands of shops and stalls and is said to be one of the largest markets in West Africa. Cloth, beads, shoes, utensils, yams, spices, giant snails and medicinal plants sit side by side in a maze of alleys. Part of the site was rebuilt in the late 2010s around a new bus terminal.",
          tips: "Come in the morning with a guide or a local so as not to get lost; keep your belongings close in the crowd.",
        },
      },
      {
        slug: "batiments-traditionnels-ashanti",
        category: "HISTORY",
        name: "Bâtiments traditionnels ashanti (sanctuaire de Besease)",
        summary: "Sanctuaires aux bas-reliefs sculptés, derniers témoins de l'architecture ashanti, classés par l'UNESCO.",
        description:
          "Autour de Kumasi subsistent quelques sanctuaires traditionnels, inscrits ensemble au patrimoine mondial de l'UNESCO sous le nom de « Bâtiments traditionnels ashanti ». Construits en terre, en bois et en chaume, ils sont ornés de bas-reliefs aux motifs symboliques. Le sanctuaire de Besease, près d'Ejisu, restauré et doté d'un petit espace d'accueil, est le plus accessible pour comprendre cet art de bâtir et son rôle religieux.",
        tips: "Ce sont des lieux de culte encore respectés : suivez les consignes du gardien et demandez avant de photographier l'intérieur.",
        visitMinutes: 60,
        lat: 6.7236,
        lng: -1.4487,
        cover: "/images/voyage/lieu-batiments-traditionnels-ashanti",
        en: {
          name: "Asante Traditional Buildings (Besease shrine)",
          summary: "Shrines with carved reliefs, the last witnesses of Ashanti architecture, UNESCO-listed.",
          description:
            "Around Kumasi a few traditional shrines survive, listed together as a UNESCO World Heritage Site under the name “Asante Traditional Buildings”. Built of earth, timber and thatch, they are decorated with reliefs bearing symbolic motifs. The Besease shrine near Ejisu, restored and equipped with a small visitor area, is the most accessible place to understand this building tradition and its religious role.",
          tips: "These are still respected places of worship: follow the caretaker's instructions and ask before photographing inside.",
        },
      },
      {
        slug: "ntonso-adinkra",
        category: "CULTURE",
        name: "Ntonso, village de l'adinkra",
        summary: "Les imprimeurs d'étoffes adinkra au travail, avec tampons de calebasse et teinture d'écorce.",
        description:
          "Au nord de Kumasi, le village de Ntonso est réputé pour l'impression des étoffes adinkra. Les artisans y gravent des tampons dans des calebasses et préparent une teinture noire à partir d'écorce d'arbre, puis impriment à la main les symboles adinkra, chacun porteur d'un proverbe ou d'une valeur. On peut assister à la fabrication et parfois s'essayer à l'impression.",
        tips: "Prévoyez du temps pour l'atelier d'impression et achetez directement aux artisans ; combinez la visite avec Bonwire et Ahwiaa.",
        visitMinutes: 90,
        lat: 6.8297,
        lng: -1.52,
        cover: "/images/voyage/lieu-ntonso-adinkra",
        en: {
          name: "Ntonso, the adinkra village",
          summary: "Adinkra cloth printers at work, with calabash stamps and bark dye.",
          description:
            "North of Kumasi, the village of Ntonso is renowned for printing adinkra cloth. Craftspeople carve stamps from calabashes and prepare a black dye from tree bark, then print the adinkra symbols by hand, each carrying a proverb or a value. You can watch the process and sometimes try printing yourself.",
          tips: "Allow time for the printing workshop and buy directly from the craftspeople; combine the visit with Bonwire and Ahwiaa.",
        },
      },
      {
        slug: "ahwiaa-sculpture-sur-bois",
        category: "CULTURE",
        name: "Ahwiaa, village des sculpteurs sur bois",
        summary: "Tabourets, masques et tambours sculptés dans les ateliers d'un village proche de Kumasi.",
        description:
          "Sur la route de Mampong, à quelques kilomètres au nord de Kumasi, le village d'Ahwiaa aligne ateliers et boutiques de sculpteurs sur bois. On y voit façonner les tabourets ashanti, les poupées akuaba, des masques, des statuettes et des djembés, vendus sur place. Une étape facile sur le circuit des villages d'artisans avec Bonwire et Ntonso.",
        tips: "Vérifiez la qualité du bois et des finitions avant d'acheter, et négociez poliment ; les objets anciens ou présentés comme tels doivent être évités.",
        visitMinutes: 60,
        lat: 6.7599,
        lng: -1.5959,
        cover: "/images/voyage/lieu-ahwiaa-sculpture-sur-bois",
        en: {
          name: "Ahwiaa, the woodcarving village",
          summary: "Stools, masks and drums carved in the workshops of a village near Kumasi.",
          description:
            "On the Mampong road, a few kilometres north of Kumasi, the village of Ahwiaa is lined with woodcarvers' workshops and shops. You can watch Ashanti stools, akuaba dolls, masks, figurines and djembe drums being made and buy them on the spot. An easy stop on the craft-village circuit with Bonwire and Ntonso.",
          tips: "Check the quality of the wood and finish before buying, and bargain politely; avoid antiques or items sold as such.",
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
        lat: 7.1058,
        lng: 0.6085,
        cover: "/images/voyage/lieu-cascades-de-wli",
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
        lat: 7.0269,
        lng: 0.6033,
        cover: "/images/voyage/lieu-mont-afadjato",
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
        lat: 6.906,
        lng: 0.3856,
        cover: "/images/voyage/lieu-sanctuaire-des-singes-de-tafi-atome",
        en: {
          name: "Tafi Atome Monkey Sanctuary",
          summary: "A community forest home to mona monkeys, protected by the villagers.",
          description:
            "In Tafi Atome, residents have long protected the mona monkeys living in the village forest, which are considered sacred. A community ecotourism project lets you see them up close on a guided walk and learn about village life.",
          tips: "Follow the guide's instructions and do not feed the monkeys without their agreement.",
        },
      },
      {
        slug: "chutes-de-tagbo",
        category: "NATURE",
        name: "Chutes de Tagbo",
        summary: "Cascade en pleine forêt au pied du mont Afadjato, accessible à pied depuis Liati Wote.",
        description:
          "Au départ du village de Liati Wote, un sentier traverse plantations de cacao et forêt jusqu'aux chutes de Tagbo, qui dévalent une paroi couverte de végétation au pied du mont Afadjato. La marche, d'environ trois quarts d'heure, se combine facilement avec l'ascension du mont dans la même journée, dans le cadre du projet d'écotourisme communautaire du village.",
        tips: "Le sentier peut être boueux et glissant : chaussures fermées indispensables. Passez par le bureau d'accueil du village pour le guide.",
        bestPeriod: "Pendant et après la saison des pluies, quand le débit est fort",
        visitMinutes: 150,
        lat: 7.0131,
        lng: 0.5711,
        cover: "/images/voyage/lieu-chutes-de-tagbo",
        en: {
          name: "Tagbo Falls",
          summary: "A forest waterfall at the foot of Mount Afadjato, reached on foot from Liati Wote.",
          description:
            "From the village of Liati Wote, a trail crosses cocoa plantations and forest to the Tagbo Falls, which tumble down a vegetation-covered rock face at the foot of Mount Afadjato. The walk of about 45 minutes is easily combined with the climb of the mountain on the same day, as part of the village's community ecotourism project.",
          tips: "The trail can be muddy and slippery: closed shoes are essential. Go through the village reception office for a guide.",
          bestPeriod: "During and after the rainy season, when the flow is strong",
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
    cover: "/images/voyage/mole",
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
        cover: "/images/voyage/lieu-safari-a-pied-mole",
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
        cover: "/images/voyage/lieu-mosquee-de-larabanga",
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
  {
    slug: "keta",
    name: "Keta et l'estuaire de la Volta",
    region: "Volta",
    summary: "Lagunes, cordon de sable, fort danois et embouchure de la Volta, au pays des Éwé anlo.",
    description:
      "Tout au sud-est du pays, la côte de la région de la Volta étire un mince cordon de sable entre l'océan et la grande lagune de Keta, riche en oiseaux. La petite ville de Keta garde les ruines du fort danois Prinzenstein, et Anloga, toute proche, accueille chaque novembre le grand festival Hogbetsotso. Plus à l'ouest, Ada Foah marque l'embouchure de la Volta, avec ses bancs de sable et ses balades en pirogue. Une côte paisible, loin de l'agitation d'Accra.",
    lat: 5.9216,
    lng: 0.9911,
    cover: "/images/voyage/keta",
    en: {
      name: "Keta and the Volta estuary",
      region: "Volta",
      summary: "Lagoons, a sand spit, a Danish fort and the mouth of the Volta, in the land of the Anlo Ewe.",
      description:
        "In the far south-east of the country, the Volta Region coast stretches as a thin sand spit between the ocean and the large Keta Lagoon, rich in birdlife. The small town of Keta keeps the ruins of the Danish Fort Prinzenstein, and nearby Anloga hosts the great Hogbetsotso festival every November. Further west, Ada Foah marks the mouth of the Volta, with its sandbanks and canoe trips. A peaceful coast, far from the bustle of Accra.",
    },
    places: [
      {
        slug: "fort-prinzenstein-keta",
        category: "HISTORY",
        name: "Fort Prinzenstein",
        summary: "Ruines d'un fort danois de la fin du XVIIIe siècle, rongé par l'océan.",
        description:
          "Construit par les Danois en 1784 à Keta, le fort Prinzenstein servit de comptoir et de lieu de détention de captifs pendant la traite atlantique. Il fait partie des forts et châteaux du Ghana inscrits au patrimoine mondial de l'UNESCO. L'érosion côtière en a emporté une grande partie : restent des pans de murs, des cellules et des bâtiments ruinés au bord de l'océan, témoins saisissants de l'histoire et de la fragilité de cette côte.",
        tips: "Les ruines sont fragiles : restez sur les zones accessibles et faites-vous accompagner par un guide local.",
        visitMinutes: 45,
        lat: 5.922,
        lng: 0.9936,
        cover: "/images/voyage/lieu-fort-prinzenstein-keta",
        en: {
          name: "Fort Prinzenstein",
          summary: "Ruins of a late 18th-century Danish fort, eaten away by the ocean.",
          description:
            "Built by the Danes in 1784 at Keta, Fort Prinzenstein served as a trading post and a place where captives were held during the Atlantic slave trade. It is one of Ghana's forts and castles on the UNESCO World Heritage List. Coastal erosion has carried much of it away: sections of wall, cells and ruined buildings remain by the ocean, striking witnesses to the history and fragility of this coast.",
          tips: "The ruins are fragile: stay in the accessible areas and go with a local guide.",
        },
      },
      {
        slug: "lagune-de-keta",
        category: "NATURE",
        name: "Lagune de Keta",
        summary: "La plus grande lagune du Ghana, zone humide protégée riche en oiseaux d'eau.",
        description:
          "Séparée de l'océan par un étroit cordon de sable, la lagune de Keta est la plus vaste du pays. Classée zone humide d'importance internationale (site Ramsar), elle accueille de nombreux oiseaux d'eau, résidents ou migrateurs, et fait vivre pêcheurs et producteurs de sel. On la découvre depuis la route du cordon, au fil des villages, ou lors d'une sortie en pirogue avec des pêcheurs.",
        tips: "Les matins et fins d'après-midi sont les meilleurs moments pour les oiseaux ; emportez des jumelles et de la protection solaire.",
        bestPeriod: "D'octobre à mars pour les oiseaux migrateurs",
        visitMinutes: 120,
        lat: 5.9198,
        lng: 0.9384,
        cover: "/images/voyage/lieu-lagune-de-keta",
        en: {
          name: "Keta Lagoon",
          summary: "Ghana's largest lagoon, a protected wetland rich in waterbirds.",
          description:
            "Separated from the ocean by a narrow sand spit, Keta Lagoon is the largest in the country. Designated a wetland of international importance (Ramsar site), it hosts many resident and migratory waterbirds and supports fishermen and salt producers. You can discover it from the road along the spit, village by village, or on a canoe trip with fishermen.",
          tips: "Mornings and late afternoons are best for birds; bring binoculars and sun protection.",
          bestPeriod: "October to March for migratory birds",
        },
      },
      {
        slug: "estuaire-de-la-volta-ada",
        category: "BEACH",
        name: "Ada Foah et l'estuaire de la Volta",
        summary: "Là où la Volta rejoint l'océan : bancs de sable, îles, pirogues et plages.",
        description:
          "À Ada Foah, le fleuve Volta achève sa course dans l'océan en formant un estuaire parsemé d'îles et de bancs de sable. Les balades en pirogue y font découvrir villages de pêcheurs, mangroves et plages isolées entre fleuve et mer. Le lieu est très prisé des habitants d'Accra le week-end et lors de l'Asafotufiam, la grande fête d'Ada au début du mois d'août.",
        tips: "Ne vous baignez qu'aux endroits indiqués par les habitants : les courants de l'embouchure et de l'océan sont dangereux. Exigez des gilets de sauvetage en pirogue.",
        visitMinutes: 240,
        lat: 5.7833,
        lng: 0.6333,
        cover: "/images/voyage/lieu-estuaire-de-la-volta-ada",
        en: {
          name: "Ada Foah and the Volta estuary",
          summary: "Where the Volta meets the ocean: sandbanks, islands, canoes and beaches.",
          description:
            "At Ada Foah, the Volta River ends its course in the ocean, forming an estuary dotted with islands and sandbanks. Canoe trips take you to fishing villages, mangroves and secluded beaches between river and sea. The place is very popular with Accra residents at weekends and during Asafotufiam, Ada's great festival in early August.",
          tips: "Only swim where locals advise: the currents of the river mouth and the ocean are dangerous. Insist on life jackets in canoes.",
        },
      },
    ],
  },
  {
    slug: "akosombo",
    name: "Akosombo et le lac Volta",
    region: "Est",
    summary: "Le grand barrage, le lac Volta, le pont d'Adomi et le pays krobo des perles de verre.",
    description:
      "À environ deux heures au nord-est d'Accra, Akosombo est la porte du lac Volta, immense retenue créée par le barrage achevé en 1965. Les collines boisées qui encadrent le fleuve, le pont d'Adomi et les croisières sur le lac font de la région une escapade appréciée depuis la capitale. Tout près, le pays krobo, autour d'Odumase et de Somanya, perpétue l'art des perles de verre et célèbre chaque automne le Ngmayem.",
    lat: 6.3,
    lng: 0.05,
    cover: "/images/voyage/akosombo",
    en: {
      name: "Akosombo and Lake Volta",
      region: "Eastern",
      summary: "The great dam, Lake Volta, the Adomi Bridge and the Krobo country of glass beads.",
      description:
        "About two hours north-east of Accra, Akosombo is the gateway to Lake Volta, the immense reservoir created by the dam completed in 1965. The wooded hills framing the river, the Adomi Bridge and cruises on the lake make the area a popular escape from the capital. Close by, the Krobo country around Odumase and Somanya keeps up the art of glass beads and celebrates Ngmayem every autumn.",
    },
    places: [
      {
        slug: "barrage-d-akosombo",
        category: "LEISURE",
        name: "Barrage d'Akosombo et lac Volta",
        summary: "Le barrage hydroélectrique qui a créé le lac Volta, l'un des plus grands lacs artificiels du monde.",
        description:
          "Achevé en 1965, le barrage d'Akosombo retient les eaux de la Volta et a donné naissance au lac Volta, qui s'étend sur des centaines de kilomètres vers le nord et compte parmi les plus grands lacs artificiels du monde par sa superficie. Le barrage, symbole de l'industrialisation voulue par Kwame Nkrumah, fournit une grande part de l'électricité du pays. Depuis les environs, on profite de vues sur le lac et ses collines, et des sorties en bateau sont proposées sur la retenue.",
        tips: "L'ouvrage est un site sensible : ne photographiez que là où c'est autorisé et renseignez-vous sur place sur les conditions de visite.",
        visitMinutes: 120,
        lat: 6.2997,
        lng: 0.0594,
        cover: "/images/voyage/lieu-barrage-d-akosombo",
        en: {
          name: "Akosombo Dam and Lake Volta",
          summary: "The hydroelectric dam that created Lake Volta, one of the world's largest artificial lakes.",
          description:
            "Completed in 1965, the Akosombo Dam holds back the waters of the Volta and created Lake Volta, which stretches hundreds of kilometres north and ranks among the largest artificial lakes in the world by surface area. The dam, a symbol of the industrialisation championed by Kwame Nkrumah, supplies a large share of the country's electricity. From the surroundings you get views over the lake and its hills, and boat trips are offered on the reservoir.",
          tips: "The dam is a sensitive site: only take photos where permitted and ask locally about visiting conditions.",
        },
      },
      {
        slug: "pont-d-adomi",
        category: "HISTORY",
        name: "Pont d'Adomi",
        summary: "Élégant pont en arc métallique enjambant la Volta à Atimpoku.",
        description:
          "En aval du barrage, le pont d'Adomi franchit la Volta d'une seule arche d'acier, au milieu des collines boisées. Ouvert à la fin des années 1950, il relie Accra à la région de la Volta et reste l'une des images les plus connues du pays. Les berges d'Atimpoku, au pied du pont, sont animées par les vendeuses de crevettes et de poisson du fleuve.",
        tips: "Arrêtez-vous de jour sur les berges pour la vue ; ne stationnez pas sur le pont lui-même.",
        visitMinutes: 30,
        lat: 6.2394,
        lng: 0.0956,
        cover: "/images/voyage/lieu-pont-d-adomi",
        en: {
          name: "Adomi Bridge",
          summary: "An elegant steel arch bridge across the Volta at Atimpoku.",
          description:
            "Downstream of the dam, the Adomi Bridge crosses the Volta in a single steel arch among wooded hills. Opened in the late 1950s, it links Accra with the Volta Region and remains one of the country's best-known sights. The riverbanks at Atimpoku, at the foot of the bridge, are busy with women selling river shrimps and fish.",
          tips: "Stop on the banks by day for the view; do not park on the bridge itself.",
        },
      },
      {
        slug: "perles-de-krobo",
        category: "CULTURE",
        name: "Perles de verre krobo (Odumase-Krobo)",
        summary: "Le pays krobo, berceau des perles de verre recyclé, portées lors des grandes cérémonies.",
        description:
          "Autour d'Odumase-Krobo et de Somanya, les Krobo fabriquent depuis des générations des perles en verre recyclé, broyé puis cuit dans des moules d'argile et décoré à la main. Ces perles, portées notamment lors du Dipo, rite de passage des jeunes filles, et du Ngmayem, sont vendues dans les ateliers et sur les marchés de la région, dont celui de Koforidua. Une visite d'atelier permet de suivre toutes les étapes de fabrication.",
        tips: "Les perles anciennes atteignent des prix élevés : demandez conseil et méfiez-vous des imitations. Achetez de préférence directement aux artisans.",
        visitMinutes: 120,
        lat: 6.1361,
        lng: 0.0053,
        cover: "/images/voyage/lieu-perles-de-krobo",
        en: {
          name: "Krobo glass beads (Odumase-Krobo)",
          summary: "Krobo country, home of recycled glass beads worn at major ceremonies.",
          description:
            "Around Odumase-Krobo and Somanya, the Krobo people have for generations made beads from recycled glass, ground and fired in clay moulds and decorated by hand. These beads, worn especially during Dipo, the girls' rite of passage, and Ngmayem, are sold in workshops and in the region's markets, including Koforidua's. A workshop visit lets you follow every step of the process.",
          tips: "Old beads fetch high prices: ask for advice and beware of imitations. Preferably buy directly from the craftspeople.",
        },
      },
    ],
  },
  {
    slug: "koforidua-kwahu",
    name: "Koforidua, Boti et le plateau de Kwahu",
    region: "Est",
    summary: "Cascades jumelles, rochers étonnants et falaises du Kwahu, haut lieu du parapente à Pâques.",
    description:
      "Capitale de la région de l'Est, Koforidua est entourée de collines forestières où se cachent les chutes jumelles de Boti et l'étonnant Umbrella Rock. Plus au nord-ouest, le plateau de Kwahu dresse ses falaises au-dessus de la plaine : ses villes perchées, comme Abetifi et Mpraeso, s'animent surtout à Pâques, quand la diaspora kwahu revient au pays et que le festival de parapente d'Odweanoma attire des milliers de visiteurs.",
    lat: 6.0833,
    lng: -0.25,
    cover: "/images/voyage/koforidua-kwahu",
    en: {
      name: "Koforidua, Boti and the Kwahu plateau",
      region: "Eastern",
      summary: "Twin waterfalls, striking rocks and the Kwahu cliffs, Ghana's paragliding hotspot at Easter.",
      description:
        "Capital of the Eastern Region, Koforidua is surrounded by forested hills hiding the twin Boti Falls and the remarkable Umbrella Rock. Further north-west, the Kwahu plateau raises its cliffs above the plain: its hilltop towns, such as Abetifi and Mpraeso, come alive above all at Easter, when the Kwahu diaspora returns home and the Odweanoma paragliding festival draws thousands of visitors.",
    },
    places: [
      {
        slug: "chutes-de-boti",
        category: "NATURE",
        name: "Chutes de Boti",
        summary: "Deux cascades jumelles plongeant dans un amphithéâtre rocheux en forêt.",
        description:
          "À une vingtaine de kilomètres de Koforidua, les chutes de Boti tombent en deux bras parallèles, que la tradition locale dit « mâle » et « femelle », dans un cirque de roche au milieu de la forêt. Un long escalier descend jusqu'au bassin. Le site fait partie d'une réserve forestière où des sentiers mènent aussi à Umbrella Rock et à un palmier à trois têtes.",
        tips: "L'escalier est raide et glissant par temps humide ; prévoyez de bonnes chaussures et de l'eau.",
        bestPeriod: "Pendant et juste après la saison des pluies (débit plus fort)",
        visitMinutes: 120,
        lat: 6.1929,
        lng: -0.2164,
        cover: "/images/voyage/lieu-chutes-de-boti",
        en: {
          name: "Boti Falls",
          summary: "Twin waterfalls plunging into a rocky amphitheatre in the forest.",
          description:
            "About twenty kilometres from Koforidua, the Boti Falls drop in two parallel streams, called “male” and “female” in local tradition, into a rock bowl in the middle of the forest. A long staircase leads down to the pool. The site is part of a forest reserve where trails also lead to Umbrella Rock and a three-headed palm tree.",
          tips: "The staircase is steep and slippery in wet weather; bring good shoes and water.",
          bestPeriod: "During and just after the rainy season (stronger flow)",
        },
      },
      {
        slug: "umbrella-rock-boti",
        category: "NATURE",
        name: "Umbrella Rock",
        summary: "Un énorme rocher en forme de parasol posé sur un socle, avec vue sur la forêt.",
        description:
          "À une courte marche des chutes de Boti, Umbrella Rock est un gros bloc de grès en surplomb, posé sur un socle rocheux comme un parasol géant. On peut grimper à son sommet par une échelle pour une vue étendue sur les collines boisées. Le sentier passe par des plantations et des villages, et se combine facilement avec la visite des chutes.",
        tips: "Faites-vous accompagner par un guide du site ; l'ascension par l'échelle est déconseillée par temps de pluie.",
        visitMinutes: 90,
        lat: 6.1823,
        lng: -0.2218,
        cover: "/images/voyage/lieu-umbrella-rock-boti",
        en: {
          name: "Umbrella Rock",
          summary: "A huge parasol-shaped rock perched on a base, with views over the forest.",
          description:
            "A short walk from the Boti Falls, Umbrella Rock is a large overhanging block of sandstone sitting on a rocky base like a giant parasol. You can climb to the top by ladder for a wide view over the wooded hills. The trail passes through plantations and villages and is easily combined with a visit to the falls.",
          tips: "Go with a site guide; climbing the ladder is not advisable in the rain.",
        },
      },
      {
        slug: "plateau-de-kwahu",
        category: "NATURE",
        name: "Plateau de Kwahu et mont Odweanoma",
        summary: "Falaises spectaculaires, villes perchées et, à Pâques, le festival de parapente.",
        description:
          "Le plateau de Kwahu domine la plaine de ses escarpements boisés, au nord de Nkawkaw. Le mont Odweanoma, près d'Atibie et de Mpraeso, sert de décollage au festival de parapente organisé chaque week-end de Pâques par l'Office du tourisme ghanéen, avec vols en tandem pour le public. Le reste de l'année, la fraîcheur des hauteurs, les points de vue et les villages comme Abetifi, l'une des villes les plus élevées du pays, invitent à la balade.",
        tips: "À Pâques, l'affluence est considérable : réservez votre hébergement très tôt et prévoyez des embouteillages sur la route de Nkawkaw.",
        bestPeriod: "Le week-end de Pâques pour l'ambiance ; la saison sèche pour les vues",
        visitMinutes: 240,
        lat: 6.5774,
        lng: -0.7603,
        cover: "/images/voyage/lieu-plateau-de-kwahu",
        en: {
          name: "Kwahu plateau and Mount Odweanoma",
          summary: "Dramatic cliffs, hilltop towns and, at Easter, the paragliding festival.",
          description:
            "The Kwahu plateau towers over the plain with its wooded escarpments, north of Nkawkaw. Mount Odweanoma, near Atibie and Mpraeso, is the take-off point for the paragliding festival held every Easter weekend by the Ghana Tourism Authority, with tandem flights for the public. The rest of the year, the cool heights, the viewpoints and villages such as Abetifi, one of the highest towns in the country, are an invitation to explore.",
          tips: "At Easter the crowds are huge: book accommodation very early and expect traffic jams on the Nkawkaw road.",
          bestPeriod: "Easter weekend for the atmosphere; the dry season for the views",
        },
      },
    ],
  },
  {
    slug: "kintampo",
    name: "Kintampo et le Bono oriental",
    region: "Bono oriental",
    summary: "Cascades étagées et forêt sacrée aux singes, à mi-chemin entre Kumasi et Tamale.",
    description:
      "Sur la grande route qui relie Kumasi à Tamale, la région du Bono oriental marque la transition entre forêt et savane. Les chutes de Kintampo, en gradins sur la rivière Pumpum, offrent une halte rafraîchissante, et le sanctuaire de Boabeng-Fiema, près de Nkoranza, protège des singes considérés comme sacrés par les villageois. Techiman, grand marché agricole, est la ville principale de la région voisine.",
    lat: 8.0537,
    lng: -1.7289,
    cover: "/images/voyage/kintampo",
    en: {
      name: "Kintampo and Bono East",
      region: "Bono East",
      summary: "Tiered waterfalls and a sacred monkey forest, halfway between Kumasi and Tamale.",
      description:
        "On the main road linking Kumasi and Tamale, the Bono East Region marks the transition between forest and savannah. The tiered Kintampo Falls on the Pumpum River make a refreshing stop, and the Boabeng-Fiema sanctuary near Nkoranza protects monkeys considered sacred by the villagers. Techiman, a major farm market, is the main town nearby.",
    },
    places: [
      {
        slug: "chutes-de-kintampo",
        category: "NATURE",
        name: "Chutes de Kintampo",
        summary: "Une cascade en gradins au milieu de la forêt, halte classique sur la route du nord.",
        description:
          "Juste au nord de la ville de Kintampo, la rivière Pumpum dévale une succession de marches rocheuses avant de plonger dans un bassin entouré de forêt. Un escalier mène au pied des chutes, où l'on peut se rafraîchir, et une passerelle dans les arbres a été aménagée sur le site. C'est l'une des haltes les plus populaires entre Kumasi et Tamale.",
        tips: "Le site est très fréquenté le week-end et les jours fériés ; venez tôt. Les rochers sont glissants près de l'eau.",
        bestPeriod: "Pendant et juste après la saison des pluies",
        visitMinutes: 90,
        lat: 8.0896,
        lng: -1.698,
        cover: "/images/voyage/lieu-chutes-de-kintampo",
        en: {
          name: "Kintampo Falls",
          summary: "A tiered waterfall in the forest, a classic stop on the road north.",
          description:
            "Just north of the town of Kintampo, the Pumpum River tumbles down a series of rock steps before plunging into a forest-ringed pool. A staircase leads to the foot of the falls, where you can cool off, and a treetop walkway has been built on the site. It is one of the most popular stops between Kumasi and Tamale.",
          tips: "The site is very busy at weekends and on public holidays; come early. The rocks near the water are slippery.",
          bestPeriod: "During and just after the rainy season",
        },
      },
      {
        slug: "sanctuaire-de-boabeng-fiema",
        category: "NATURE",
        name: "Sanctuaire des singes de Boabeng-Fiema",
        summary: "Forêt sacrée où colobes noir et blanc et singes mones vivent sous la protection des villageois.",
        description:
          "Entre les villages jumeaux de Boabeng et Fiema, près de Nkoranza, une forêt abrite des colobes noir et blanc et des singes mones que les habitants considèrent comme sacrés : la tradition interdit de les chasser, et l'on enterre même les singes morts dans un cimetière qui leur est réservé. Le sanctuaire, géré avec la communauté, se visite avec un guide qui raconte ces croyances et aide à repérer les animaux.",
        tips: "Respectez les règles locales et les consignes du guide ; ne nourrissez pas les singes et gardez le silence pour les observer.",
        bestPeriod: "Tôt le matin ou en fin d'après-midi",
        visitMinutes: 120,
        lat: 7.7189,
        lng: -1.7236,
        cover: "/images/voyage/lieu-sanctuaire-de-boabeng-fiema",
        en: {
          name: "Boabeng-Fiema Monkey Sanctuary",
          summary: "A sacred forest where black-and-white colobus and mona monkeys live under the villagers' protection.",
          description:
            "Between the twin villages of Boabeng and Fiema, near Nkoranza, a forest is home to black-and-white colobus and mona monkeys that the residents consider sacred: tradition forbids hunting them, and dead monkeys are even buried in a cemetery of their own. The sanctuary, run with the community, is visited with a guide who explains these beliefs and helps you spot the animals.",
          tips: "Respect local rules and the guide's instructions; do not feed the monkeys and keep quiet to watch them.",
          bestPeriod: "Early morning or late afternoon",
        },
      },
    ],
  },
  {
    slug: "tamale",
    name: "Tamale",
    region: "Nord",
    summary: "La grande ville du nord, porte du parc de Mole et cœur du royaume dagomba.",
    description:
      "Capitale de la région du Nord, Tamale est la principale ville du nord du Ghana et la porte d'entrée vers le parc national de Mole, desservie par des vols depuis Accra. Ville majoritairement musulmane, aux larges avenues parcourues de motos, elle est le centre culturel des Dagomba : on y croise les tuniques tissées en bandes (« smocks » ou « fugu ») et l'on peut y assister au Damba ou à la fête du feu (Bugum). Les quartiers proches de la frontière nord sont à éviter, mais Tamale elle-même n'est pas en zone déconseillée : vérifiez néanmoins les conseils aux voyageurs.",
    lat: 9.4075,
    lng: -0.8533,
    cover: "/images/voyage/tamale",
    en: {
      name: "Tamale",
      region: "Northern",
      summary: "The great city of the north, gateway to Mole National Park and heart of the Dagomba kingdom.",
      description:
        "Capital of the Northern Region, Tamale is the main city of northern Ghana and the gateway to Mole National Park, served by flights from Accra. A predominantly Muslim city of wide avenues buzzing with motorbikes, it is the cultural centre of the Dagomba: you will see the strip-woven tunics (“smocks” or “fugu”) and may attend Damba or the fire festival (Bugum). The areas near the northern border are to be avoided, but Tamale itself is not in an advised-against area: still, check the travel advice.",
    },
    places: [
      {
        slug: "mosquee-centrale-de-tamale",
        category: "RELIGION",
        name: "Mosquée centrale de Tamale",
        summary: "La grande mosquée du centre-ville, repère de la vie religieuse de Tamale.",
        description:
          "Au cœur de Tamale, près du marché central, la mosquée centrale dresse ses minarets au-dessus des rues commerçantes. C'est l'un des principaux lieux de prière de la ville, très fréquenté le vendredi et lors des grandes fêtes musulmanes, quand les fidèles débordent sur les rues alentour. Elle se découvre de l'extérieur, en respectant les heures de prière.",
        tips: "Lieu de culte actif : tenue couvrante, pas de visite pendant les prières, et demandez l'autorisation avant d'entrer ou de photographier les fidèles.",
        visitMinutes: 30,
        lat: 9.4018,
        lng: -0.8411,
        cover: "/images/voyage/lieu-mosquee-centrale-de-tamale",
        en: {
          name: "Tamale Central Mosque",
          summary: "The great mosque in the city centre, a landmark of Tamale's religious life.",
          description:
            "In the heart of Tamale, near the central market, the Central Mosque raises its minarets above the busy shopping streets. It is one of the city's main places of prayer, crowded on Fridays and during the major Muslim festivals, when worshippers spill out into the surrounding streets. It is seen from outside, respecting prayer times.",
          tips: "An active place of worship: wear covering clothes, do not visit during prayers, and ask permission before entering or photographing worshippers.",
        },
      },
    ],
  },
  {
    slug: "beyin-nzulezo",
    name: "Beyin, Nzulezo et Ankasa",
    region: "Ouest",
    summary: "Village sur pilotis, fort britannique au bord de l'océan et forêt tropicale primaire, à l'extrême ouest.",
    description:
      "À l'extrémité ouest de la côte, près de la Côte d'Ivoire, le pays nzema réserve une étape hors des sentiers battus. Depuis Beyin, dominé par le fort Apollonia, une pirogue remonte les marais de raphia jusqu'à Nzulezo, village entièrement bâti sur pilotis au milieu du lac Amansuri. Plus au nord, l'aire de conservation d'Ankasa protège l'une des forêts tropicales humides les plus riches du pays. Les routes sont longues : prévoyez au moins deux jours depuis Busua ou Takoradi.",
    lat: 4.9874,
    lng: -2.5895,
    cover: "/images/voyage/beyin-nzulezo",
    en: {
      name: "Beyin, Nzulezo and Ankasa",
      region: "Western",
      summary: "A stilt village, a British fort by the ocean and primary rainforest in the far west.",
      description:
        "At the western end of the coast, near Côte d'Ivoire, Nzema country offers an off-the-beaten-track stop. From Beyin, overlooked by Fort Apollonia, a canoe heads up through raffia swamps to Nzulezo, a village built entirely on stilts in the middle of Lake Amansuri. Further north, the Ankasa Conservation Area protects one of the country's richest tropical rainforests. Roads are long: allow at least two days from Busua or Takoradi.",
    },
    places: [
      {
        slug: "village-sur-pilotis-de-nzulezo",
        category: "CULTURE",
        name: "Village sur pilotis de Nzulezo",
        summary: "Un village entièrement bâti sur pilotis au milieu du lac Amansuri, atteint en pirogue.",
        description:
          "Au terme d'une traversée en pirogue à travers marais de raphia et chenaux, Nzulezo apparaît au milieu du lac Amansuri : maisons, école et église y sont toutes construites sur pilotis et reliées par une longue passerelle de bois. Selon la tradition, les ancêtres des habitants seraient venus de l'ouest, guidés par un escargot. Le village figure sur la liste indicative du Ghana pour le patrimoine mondial de l'UNESCO.",
        tips: "Réservez la pirogue et le guide au bureau d'accueil de Beyin, prévoyez une demi-journée, de l'eau et de la protection solaire. Demandez avant de photographier les habitants.",
        visitMinutes: 240,
        lat: 5.0206,
        lng: -2.5978,
        cover: "/images/voyage/lieu-village-sur-pilotis-de-nzulezo",
        en: {
          name: "Nzulezo stilt village",
          summary: "A village built entirely on stilts in the middle of Lake Amansuri, reached by canoe.",
          description:
            "At the end of a canoe ride through raffia swamps and channels, Nzulezo appears in the middle of Lake Amansuri: houses, school and church are all built on stilts and linked by a long wooden walkway. According to tradition, the inhabitants' ancestors came from the west, guided by a snail. The village is on Ghana's tentative list for UNESCO World Heritage.",
          tips: "Book the canoe and guide at the Beyin reception office, allow half a day and bring water and sun protection. Ask before photographing residents.",
        },
      },
      {
        slug: "fort-apollonia-beyin",
        category: "HISTORY",
        name: "Fort Apollonia",
        summary: "Fort britannique de la fin du XVIIIe siècle face à l'océan, inscrit au patrimoine mondial.",
        description:
          "Construit par les Britanniques à Beyin entre 1768 et 1770, le fort Apollonia est le plus occidental des forts du Ghana inscrits au patrimoine mondial de l'UNESCO. Restauré, il domine la plage et les cocotiers et accueille les visiteurs venus découvrir l'histoire de la côte nzema avant de partir vers Nzulezo.",
        tips: "Visite guidée sur place ; combinez-la avec l'excursion à Nzulezo, qui part du même village.",
        visitMinutes: 60,
        lat: 4.9871,
        lng: -2.5901,
        cover: "/images/voyage/lieu-fort-apollonia-beyin",
        en: {
          name: "Fort Apollonia",
          summary: "A late 18th-century British fort facing the ocean, a World Heritage Site.",
          description:
            "Built by the British at Beyin between 1768 and 1770, Fort Apollonia is the westernmost of Ghana's forts on the UNESCO World Heritage List. Restored, it overlooks the beach and palm trees and welcomes visitors who come to learn about the history of the Nzema coast before heading to Nzulezo.",
          tips: "Guided tour on site; combine it with the Nzulezo excursion, which leaves from the same village.",
        },
      },
      {
        slug: "aire-de-conservation-d-ankasa",
        category: "NATURE",
        name: "Aire de conservation d'Ankasa",
        summary: "Forêt tropicale humide sempervirente parmi les plus riches du Ghana, pour randonneurs et ornithologues.",
        description:
          "Dans l'extrême sud-ouest du pays, l'aire de conservation d'Ankasa, qui réunit la réserve d'Ankasa et le parc national de Nini-Suhien, protège une forêt tropicale humide sempervirente d'une biodiversité exceptionnelle pour le Ghana. Des sentiers mènent à des cours d'eau et des bassins naturels sous les grands arbres ; on y observe surtout oiseaux, papillons et plantes, les mammifères restant très discrets.",
        tips: "Accès par une piste parfois difficile en saison des pluies : véhicule adapté et guide indispensables. Emportez répulsif et vêtements longs.",
        bestPeriod: "Saison sèche, de décembre à mars",
        visitMinutes: 360,
        lat: 5.2833,
        lng: -2.65,
        cover: "/images/voyage/lieu-aire-de-conservation-d-ankasa",
        en: {
          name: "Ankasa Conservation Area",
          summary: "Evergreen tropical rainforest among the richest in Ghana, for hikers and birdwatchers.",
          description:
            "In the far south-west of the country, the Ankasa Conservation Area, which combines the Ankasa reserve and Nini-Suhien National Park, protects a wet evergreen rainforest of exceptional biodiversity for Ghana. Trails lead to streams and natural pools beneath tall trees; birds, butterflies and plants are the main sightings, as mammals remain very elusive.",
          tips: "Access is by a track that can be difficult in the rainy season: a suitable vehicle and a guide are essential. Bring repellent and long clothes.",
          bestPeriod: "Dry season, December to March",
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
