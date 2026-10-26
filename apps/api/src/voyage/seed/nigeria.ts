/**
 * Contenu de départ du guide Nigeria (fr + en). Rédigé à partir de
 * connaissances générales et des conseils aux voyageurs officiels (France
 * Diplomatie, UK FCDO) consultés en octobre 2026 : `reviewed = false` partout
 * → affiché « à relire » dans l'admin tant qu'une personne ne l'a pas vérifié.
 * Volontairement sans horaires ni tarifs (qui changent). Le circuit se limite
 * aux zones de vigilance renforcée (Lagos, Abeokuta, Ibadan) ; Osogbo, Benin
 * City et Calabar sont présentés comme patrimoine, en zone déconseillée sauf
 * raison impérative, et signalés comme tels.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const NIGERIA_GUIDE: SeedGuide = {
  country: "NG",
  intro:
    "Pays le plus peuplé d'Afrique, le Nigeria est une puissance culturelle : terre des Yoruba, des Igbo, des Haoussa et de centaines d'autres peuples, des terres cuites de Nok et des bronzes de Benin, il fait aujourd'hui vibrer le continent avec l'afrobeats, Nollywood et l'énergie de Lagos. La situation sécuritaire y limite toutefois fortement les déplacements : les sources officielles déconseillent une grande partie du pays. Ce guide se concentre donc sur Lagos, Abuja, Ibadan et Abeokuta, et présente à part, en le signalant, quelques hauts lieux du patrimoine situés en zones déconseillées.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; la demande se fait en ligne sur le portail du service d'immigration nigérian (Nigeria Immigration Service), avec selon les cas un dépôt du dossier dans un centre de traitement. Une carte d'arrivée électronique est également à remplir en ligne avant le départ. Les ressortissants de la CEDEAO sont dispensés de visa. Les règles évoluent : vérifiez-les auprès de l'ambassade du Nigeria et des sources officielles de votre pays (passeport valide au moins six mois après le retour, billet retour, adresse d'hébergement).",
    },
    {
      title: "Santé",
      body: "La vaccination contre la fièvre jaune est très fortement recommandée et le carnet de vaccination international peut être demandé à l'arrivée. Le paludisme est présent dans tout le pays : consultez un médecin ou un centre de vaccinations internationales pour un traitement préventif et protégez-vous des moustiques. Des alertes épidémiques (fièvre de Lassa, choléra, Ebola…) peuvent être en cours : consultez-les avant le départ. Hors de Lagos et d'Abuja, l'accès à des soins d'urgence de qualité est incertain : une assurance couvrant les frais médicaux et le rapatriement est indispensable. Buvez de l'eau en bouteille.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le naira (NGN), dont le cours fluctue fortement. Les paiements par virement, terminal de paiement (POS) ou application sont très répandus en ville, mais gardez des espèces pour les petits achats. Les autorités françaises recommandent d'éviter d'utiliser sa carte bancaire internationale en raison des fraudes : privilégiez les grands hôtels et établissements de confiance, et ne changez de l'argent qu'auprès de bureaux officiels.",
    },
    {
      title: "Quand partir",
      body: "Dans le sud, la saison des pluies s'étend en gros d'avril à octobre, avec une accalmie relative en août ; dans le nord, elle est plus courte (environ de juin à septembre). La période la plus agréable va de novembre à mars, en saison sèche, avec l'harmattan (vent sec et poussiéreux venu du Sahara) de décembre à février. Décembre est aussi le mois des grandes fêtes et du retour de la diaspora : les vols et hôtels de Lagos sont alors très demandés.",
    },
    {
      title: "Langues et usages",
      body: "L'anglais est la langue officielle ; le yoruba, le haoussa et l'igbo sont les langues les plus parlées, parmi plus de cinq cents, et le pidgin nigérian sert de langue commune dans la rue. Les salutations et le respect des aînés sont très importants. Le pays est partagé entre christianisme, islam et religions traditionnelles : tenue correcte dans les lieux de culte, et demandez toujours avant de photographier une personne ou une cérémonie.",
    },
    {
      title: "Se déplacer",
      body: "Les vols intérieurs relient les grandes villes (Lagos, Abuja, Port Harcourt, Calabar, Benin City…) et évitent de longs trajets routiers. Les sources officielles recommandent de ne pas utiliser les transports en commun, de circuler avec un chauffeur de confiance, vitres fermées et portières verrouillées, et de ne jamais rouler de nuit entre les villes. À Lagos, la circulation est très dense : prévoyez de larges marges. Faites-vous accueillir à l'aéroport par une personne ou une société connue.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 230 V, prises de type G (britanniques) et D. Les coupures sont fréquentes et beaucoup d'établissements fonctionnent avec des groupes électrogènes. Une carte SIM locale (enregistrement obligatoire, passeport demandé) donne accès à l'internet mobile et aux applications de transport et de paiement.",
    },
    {
      title: "Sécurité",
      body: "Le Nigeria connaît une situation sécuritaire difficile : terrorisme dans le nord-est et le nord-ouest, enlèvements contre rançon sur une grande partie du territoire, criminalité et piraterie dans le delta du Niger et au large des côtes. France Diplomatie déconseille formellement de nombreux États (nord-est, nord-ouest, États du delta, nord-ouest de l'État d'Oyo, frontière camerounaise…), déconseille sauf raison impérative la plupart des autres, dont Osun, Edo, Cross River et la campagne d'Ogun et d'Oyo, et ne place en vigilance renforcée que l'État de Lagos, la ville d'Abuja, Ibadan, Abeokuta et les autoroutes qui relient Lagos, Abeokuta et Ibadan. Le Foreign Office britannique (FCDO) déconseille lui aussi tout voyage dans plusieurs États du nord et dans les zones fluviales du delta. Avant tout projet, consultez les « Conseils aux voyageurs » de France Diplomatie et le « Travel advice » du FCDO, inscrivez-vous sur Ariane (pour les Français), faites-vous accueillir dès l'aéroport, évitez de vous déplacer à pied, la nuit et dans les foules, et restez discret sur vos biens.",
    },
  ],
  en: {
    intro:
      "Africa's most populous country, Nigeria is a cultural powerhouse: home to the Yoruba, Igbo, Hausa and hundreds of other peoples, to the Nok terracottas and the Benin bronzes, it now sets the whole continent moving with Afrobeats, Nollywood and the energy of Lagos. The security situation, however, severely limits travel: official sources advise against visiting much of the country. This guide therefore focuses on Lagos, Abuja, Ibadan and Abeokuta, and presents separately, clearly flagged, a few major heritage sites located in areas travel is advised against.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa; applications are made online on the Nigeria Immigration Service portal, in some cases followed by submitting the file at a processing centre. An electronic arrival card must also be completed online before departure. ECOWAS nationals are visa-exempt. Rules change: check them with the Nigerian embassy and your own country's official sources (passport valid for at least six months after your return, return ticket, accommodation address).",
      },
      {
        title: "Health",
        body: "Yellow fever vaccination is very strongly recommended and the international vaccination certificate may be requested on arrival. Malaria is present throughout the country: see a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes. Epidemic alerts (Lassa fever, cholera, Ebola…) may be in force: check them before you leave. Outside Lagos and Abuja, access to good emergency care is uncertain: insurance covering medical costs and repatriation is essential. Drink bottled water.",
      },
      {
        title: "Money and payments",
        body: "The currency is the naira (NGN), whose exchange rate fluctuates sharply. Bank transfers, card terminals (POS) and payment apps are widely used in cities, but keep some cash for small purchases. The French authorities advise against using international bank cards because of fraud: stick to large hotels and trusted businesses, and only change money at official bureaux.",
      },
      {
        title: "When to go",
        body: "In the south, the rainy season runs roughly from April to October, with a relative lull in August; in the north it is shorter (roughly June to September). The most pleasant period is November to March, the dry season, with the harmattan (a dry, dusty wind from the Sahara) from December to February. December is also the season of big celebrations and of the diaspora coming home: flights and hotels in Lagos are then in high demand.",
      },
      {
        title: "Languages and customs",
        body: "English is the official language; Yoruba, Hausa and Igbo are the most widely spoken of more than five hundred languages, and Nigerian Pidgin is the common tongue on the street. Greetings and respect for elders matter a great deal. The country is shared between Christianity, Islam and traditional religions: dress modestly in places of worship, and always ask before photographing a person or a ceremony.",
      },
      {
        title: "Getting around",
        body: "Domestic flights link the main cities (Lagos, Abuja, Port Harcourt, Calabar, Benin City…) and avoid long road journeys. Official sources advise against public transport, recommend travelling with a trusted driver, windows up and doors locked, and never driving between cities at night. Lagos traffic is extremely heavy: allow plenty of time. Arrange to be met at the airport by a person or company you know.",
      },
      {
        title: "Electricity and phone",
        body: "230 V, type G (British) and D plugs. Power cuts are frequent and many businesses run on generators. A local SIM card (registration compulsory, passport required) gives access to mobile internet and to ride-hailing and payment apps.",
      },
      {
        title: "Safety",
        body: "Nigeria faces a difficult security situation: terrorism in the north-east and north-west, kidnapping for ransom across much of the country, crime and piracy in the Niger Delta and off the coast. France Diplomatie advises against all travel to many states (north-east, north-west, the Delta states, north-western Oyo State, the Cameroon border…), against all but essential travel to most others, including Osun, Edo, Cross River and rural Ogun and Oyo, and only rates Lagos State, the city of Abuja, Ibadan, Abeokuta and the motorways linking Lagos, Abeokuta and Ibadan as “heightened vigilance” areas. The UK Foreign Office (FCDO) also advises against all travel to several northern states and to the riverine areas of the Delta. Before making any plans, read France Diplomatie's “Conseils aux voyageurs” and the FCDO's travel advice, register with your embassy, arrange to be met at the airport, avoid walking around, travelling at night and crowds, and keep valuables out of sight.",
      },
    ],
  },
};

export const NIGERIA_DESTINATIONS: SeedDestination[] = [
  {
    slug: "lagos",
    name: "Lagos",
    region: "État de Lagos",
    summary: "Mégapole bouillonnante entre lagune et océan : art contemporain, musique, musées et vie nocturne.",
    description:
      "Plus grande ville du pays et l'une des plus grandes d'Afrique, Lagos est le cœur économique et culturel du Nigeria. On y vient pour ses galeries et sa scène artistique, la musique (afrobeats, héritage de Fela Kuti), ses restaurants et sa vie nocturne, mais aussi pour le Musée national et les traces de son histoire coloniale sur Lagos Island. Victoria Island, Ikoyi et Lekki sont les quartiers les plus pratiques pour séjourner. L'État de Lagos est classé en vigilance renforcée par France Diplomatie, qui recommande une prudence particulière sur la partie continentale, notamment sur la route de l'aéroport.",
    lat: 6.4561,
    lng: 3.3936,
    cover: "/images/voyage/lagos",
    en: {
      region: "Lagos State",
      summary: "Teeming megacity between lagoon and ocean: contemporary art, music, museums and nightlife.",
      description:
        "The country's largest city and one of Africa's biggest, Lagos is Nigeria's economic and cultural heart. People come for its galleries and art scene, its music (Afrobeats, the legacy of Fela Kuti), its restaurants and nightlife, but also for the National Museum and the traces of its colonial history on Lagos Island. Victoria Island, Ikoyi and Lekki are the most convenient districts to stay in. France Diplomatie rates Lagos State as a “heightened vigilance” area and advises particular caution on the mainland, especially on the airport road.",
    },
    places: [
      {
        slug: "musee-national-lagos",
        cover: "/images/voyage/lieu-musee-national-lagos",
        category: "MUSEUM",
        name: "Musée national du Nigeria",
        summary: "Le grand musée du pays, à Onikan : terres cuites de Nok, bronzes d'Ife et de Benin, art des peuples du Nigeria.",
        description:
          "Installé à Onikan, sur Lagos Island, le Musée national présente un large panorama de l'histoire et des arts du Nigeria : terres cuites de la culture Nok, têtes d'Ife, bronzes du royaume de Benin, masques, textiles et objets du quotidien des différents peuples du pays. Une bonne introduction avant de découvrir le reste du sud-ouest.",
        tips: "Venez avec un chauffeur et prévoyez large pour la circulation entre Lagos Island et Victoria Island ou Lekki.",
        visitMinutes: 90,
        lat: 6.4444,
        lng: 3.4033,
        en: {
          name: "National Museum of Nigeria",
          summary: "The country's main museum, in Onikan: Nok terracottas, Ife and Benin bronzes, art of Nigeria's peoples.",
          description:
            "Located in Onikan on Lagos Island, the National Museum offers a broad overview of Nigeria's history and arts: terracottas of the Nok culture, Ife heads, bronzes from the Kingdom of Benin, masks, textiles and everyday objects of the country's many peoples. A good introduction before exploring the rest of the south-west.",
          tips: "Go with a driver and allow plenty of time for traffic between Lagos Island and Victoria Island or Lekki.",
        },
      },
      {
        slug: "freedom-park-lagos",
        cover: "/images/voyage/lieu-freedom-park-lagos",
        category: "CULTURE",
        name: "Freedom Park",
        summary: "Ancienne prison coloniale de Broad Street devenue parc de mémoire et lieu culturel.",
        description:
          "Au cœur de Lagos Island, Freedom Park occupe le site de l'ancienne prison coloniale de Broad Street, où furent détenus des militants de l'indépendance. Réaménagé en parc de mémoire pour le cinquantenaire de l'indépendance, il accueille aujourd'hui concerts, spectacles, expositions et festivals, dans un cadre verdoyant au milieu des tours.",
        tips: "Renseignez-vous sur la programmation : le lieu est particulièrement vivant lors des concerts et festivals du week-end.",
        visitMinutes: 60,
        lat: 6.4489,
        lng: 3.3965,
        en: {
          summary: "Former colonial Broad Street prison turned memorial park and cultural venue.",
          description:
            "In the heart of Lagos Island, Freedom Park stands on the site of the former colonial Broad Street prison, where independence activists were held. Redeveloped as a memorial park for the fiftieth anniversary of independence, it now hosts concerts, shows, exhibitions and festivals in a green setting among the towers.",
          tips: "Check what's on: the venue is at its liveliest during weekend concerts and festivals.",
        },
      },
      {
        slug: "nike-art-gallery-lagos",
        cover: "/images/voyage/lieu-nike-art-gallery-lagos",
        category: "CULTURE",
        name: "Nike Art Gallery",
        summary: "Immense galerie sur plusieurs étages consacrée à l'art nigérian, à Lekki.",
        description:
          "Fondée par l'artiste textile Nike Davies-Okundaye, cette galerie de Lekki présente sur plusieurs étages des milliers d'œuvres d'artistes nigérians : peintures, sculptures, perles, tissus adire teints à l'indigo. Un lieu étonnant pour découvrir la création contemporaine du pays et ses racines yoruba.",
        visitMinutes: 90,
        lat: 6.4315,
        lng: 3.4819,
        en: {
          summary: "Vast multi-storey gallery devoted to Nigerian art, in Lekki.",
          description:
            "Founded by textile artist Nike Davies-Okundaye, this Lekki gallery displays thousands of works by Nigerian artists over several floors: paintings, sculptures, beadwork, indigo-dyed adire cloth. A remarkable place to discover the country's contemporary art and its Yoruba roots.",
        },
      },
      {
        slug: "lekki-conservation-centre",
        cover: "/images/voyage/lieu-lekki-conservation-centre",
        category: "NATURE",
        name: "Lekki Conservation Centre",
        summary: "Réserve naturelle de mangrove et de forêt avec une longue passerelle dans la canopée.",
        description:
          "Géré par la Nigerian Conservation Foundation, ce site protégé conserve un morceau de forêt marécageuse et de savane au milieu de l'urbanisation de Lekki. Des sentiers et caillebotis permettent d'observer oiseaux, singes et reptiles, et sa passerelle suspendue dans la canopée, l'une des plus longues d'Afrique, offre une belle vue sur la végétation.",
        tips: "Venez tôt le matin, quand il fait moins chaud et que les animaux sont plus actifs. Prévoyez de l'antimoustique.",
        visitMinutes: 150,
        lat: 6.4364,
        lng: 3.5356,
        en: {
          summary: "Mangrove and forest nature reserve with a long canopy walkway.",
          description:
            "Run by the Nigerian Conservation Foundation, this protected site preserves a patch of swamp forest and savannah amid the urban sprawl of Lekki. Trails and boardwalks let you spot birds, monkeys and reptiles, and its canopy walkway, one of the longest in Africa, gives a fine view over the vegetation.",
          tips: "Come early in the morning, when it is cooler and the wildlife more active. Bring mosquito repellent.",
        },
      },
      {
        slug: "kalakuta-museum-lagos",
        category: "MUSEUM",
        name: "Kalakuta Museum",
        summary: "La dernière maison de Fela Kuti, à Ikeja, devenue musée en 2012.",
        description:
          "Dans le quartier d'Ikeja, la maison de trois étages où Fela Anikulapo-Kuti a vécu jusqu'à sa mort en 1997 a été transformée en musée en 2012, avec le soutien de l'État de Lagos. On y découvre ses costumes de scène, ses chaussures, des pochettes de disques et sa chambre restée en l'état ; la tombe du musicien se trouve dans l'enceinte. La maison a succédé à la première « Kalakuta Republic », incendiée par l'armée en 1977.",
        tips: "Combinez la visite avec la New Afrika Shrine, également à Ikeja. Ikeja est sur la partie continentale, loin des îles : prévoyez de larges marges pour la circulation.",
        visitMinutes: 60,
        lat: 6.6031,
        lng: 3.3486,
        en: {
          name: "Kalakuta Museum",
          summary: "Fela Kuti's last home, in Ikeja, turned into a museum in 2012.",
          description:
            "In the Ikeja district, the three-storey house where Fela Anikulapo-Kuti lived until his death in 1997 was turned into a museum in 2012, with support from Lagos State. It displays his stage costumes, shoes and album covers, and his bedroom has been left as it was; the musician's grave lies within the compound. The house succeeded the first “Kalakuta Republic”, burnt down by the army in 1977.",
          tips: "Combine it with the New Afrika Shrine, also in Ikeja. Ikeja is on the mainland, far from the islands: allow plenty of time for traffic.",
        },
      },
      {
        slug: "new-afrika-shrine-lagos",
        category: "LEISURE",
        name: "New Afrika Shrine",
        summary: "La salle de concert de la famille Kuti à Ikeja, temple de l'afrobeat.",
        description:
          "Héritière de l'Afrika Shrine créée par Fela en 1970 et détruite en 1977, la New Afrika Shrine est un vaste espace de spectacle ouvert, à Ikeja, géré par Femi Kuti et Yeni Anikulapo-Kuti. Photos et peintures de Fela couvrent les murs, et Femi ou Seun Kuti y jouent régulièrement. Le lieu est aussi le cœur de la Felabration, chaque mois d'octobre.",
        tips: "Les concerts commencent tard et finissent dans la nuit : prévoyez l'aller et le retour avec un chauffeur de confiance. Renseignez-vous sur la programmation avant de venir.",
        bestPeriod: "Octobre, pendant la Felabration",
        visitMinutes: 180,
        lat: 6.6228,
        lng: 3.3569,
        cover: "/images/voyage/lieu-new-afrika-shrine-lagos",
        en: {
          name: "New Afrika Shrine",
          summary: "The Kuti family's music venue in Ikeja, temple of Afrobeat.",
          description:
            "Successor to the Afrika Shrine founded by Fela in 1970 and destroyed in 1977, the New Afrika Shrine is a large open-sided performance venue in Ikeja run by Femi Kuti and Yeni Anikulapo-Kuti. Photos and paintings of Fela cover the walls, and Femi or Seun Kuti play there regularly. It is also the heart of Felabration every October.",
          tips: "Concerts start late and end in the small hours: arrange a trusted driver both ways. Check the programme before you go.",
          bestPeriod: "October, during Felabration",
        },
      },
      {
        slug: "tafawa-balewa-square-lagos",
        category: "HISTORY",
        name: "Tafawa Balewa Square",
        summary: "Vaste place cérémonielle de Lagos Island, sur l'ancien champ de courses de l'indépendance.",
        description:
          "Tafawa Balewa Square (TBS) a été aménagée en 1972 sur l'ancien champ de courses de Lagos, où furent célébrées en 1960 l'indépendance du pays et la descente du drapeau britannique. Cette esplanade de 14,5 hectares bordée de tribunes est reconnaissable à son entrée surmontée de chevaux blancs et d'aigles rouges, symboles tirés des armoiries nationales. Elle accueille défilés, grands rassemblements et le festival Eyo.",
        tips: "Le lieu prend vie lors des événements ; sinon, on le voit en passant, en se rendant au Musée national et au centre John Randle tout proches.",
        visitMinutes: 30,
        lat: 6.4471,
        lng: 3.4015,
        cover: "/images/voyage/lieu-tafawa-balewa-square-lagos",
        en: {
          name: "Tafawa Balewa Square",
          summary: "Vast ceremonial ground on Lagos Island, on the former racecourse of independence.",
          description:
            "Tafawa Balewa Square (TBS) was laid out in 1972 on the former Lagos racecourse, where the country's independence and the lowering of the British flag were celebrated in 1960. This 14.5-hectare ground lined with grandstands is recognisable by its entrance topped with white horses and red eagles, symbols taken from the national coat of arms. It hosts parades, large gatherings and the Eyo festival.",
          tips: "It comes alive during events; otherwise you will see it in passing on the way to the nearby National Museum and John Randle Centre.",
        },
      },
      {
        slug: "cathedrale-christ-church-lagos",
        category: "RELIGION",
        name: "Cathedral Church of Christ",
        summary: "La plus ancienne cathédrale anglicane du Nigeria, édifice néogothique de la Marina.",
        description:
          "Fondée en 1869, la cathédrale anglicane de la Marina occupe un bâtiment néogothique commencé en 1924 et achevé en 1946, avec sa tour d'horloge et ses pinacles. Elle abrite un cénotaphe à la mémoire de Samuel Ajayi Crowther, ancien esclave yoruba devenu le premier évêque africain de l'Église anglicane, dont les restes y ont été transférés en 1976.",
        tips: "Tenue correcte ; évitez les heures d'office du dimanche, sauf pour y assister.",
        visitMinutes: 30,
        lat: 6.4509,
        lng: 3.3902,
        cover: "/images/voyage/lieu-cathedrale-christ-church-lagos",
        en: {
          name: "Cathedral Church of Christ",
          summary: "Nigeria's oldest Anglican cathedral, a neo-Gothic landmark on the Marina.",
          description:
            "Founded in 1869, the Anglican cathedral on the Marina occupies a neo-Gothic building begun in 1924 and completed in 1946, with a clock tower and pinnacles. It houses a cenotaph to Samuel Ajayi Crowther, a formerly enslaved Yoruba man who became the first African bishop of the Anglican Church, whose remains were moved here in 1976.",
          tips: "Dress modestly; avoid Sunday service times unless you wish to attend.",
        },
      },
      {
        slug: "mosquee-centrale-lagos",
        category: "RELIGION",
        name: "Mosquée centrale de Lagos",
        summary: "Grande mosquée à coupole dorée et quatre minarets, au cœur de Lagos Island.",
        description:
          "Sur la très commerçante rue Nnamdi Azikiwe, la mosquée centrale est la mosquée du vendredi de l'imam en chef de Lagos. Le bâtiment actuel, ouvert en 1988, a remplacé une mosquée construite entre 1908 et 1913 ; sa coupole dorée et ses minarets dominent les toits de l'île.",
        tips: "Les non-musulmans la découvrent surtout de l'extérieur : renseignez-vous sur place avant d'entrer, en tenue couvrante et hors des heures de prière. Le quartier est très encombré : gardez vos affaires près de vous.",
        visitMinutes: 20,
        lat: 6.4574,
        lng: 3.3881,
        cover: "/images/voyage/lieu-mosquee-centrale-lagos",
        en: {
          name: "Lagos Central Mosque",
          summary: "Great mosque with a golden dome and four minarets, in the heart of Lagos Island.",
          description:
            "On busy Nnamdi Azikiwe Street, the Central Mosque is the Friday mosque of the Chief Imam of Lagos. The current building, opened in 1988, replaced a mosque built between 1908 and 1913; its golden dome and minarets rise above the island's rooftops.",
          tips: "Non-Muslims mostly see it from outside: ask on site before entering, dress modestly and avoid prayer times. The area is very crowded: keep your belongings close.",
        },
      },
      {
        slug: "centre-john-randle-lagos",
        category: "MUSEUM",
        name: "Centre John Randle pour la culture et l'histoire yoruba",
        summary: "Musée moderne et interactif consacré à la culture yoruba, à Onikan.",
        description:
          "Installé sur le site de la salle et de la piscine publique J. K. Randle de 1928, la première du pays, et rénové par l'État de Lagos, ce centre présente la culture et l'histoire yoruba à l'aide de dispositifs numériques et interactifs. Son bâtiment courbe, dessiné par l'architecte Seun Oduwole (studio SI.SA), a été primé. Il voisine avec le Musée national et Tafawa Balewa Square, formant avec eux un petit quartier culturel.",
        tips: "Associez-le au Musée national, à quelques pas : les deux visites se complètent bien.",
        visitMinutes: 90,
        lat: 6.4432,
        lng: 3.403,
        en: {
          name: "John Randle Centre for Yoruba Culture and History",
          summary: "Modern, interactive museum devoted to Yoruba culture, in Onikan.",
          description:
            "Built on the site of the 1928 J. K. Randle hall and public swimming pool, the country's first, and renovated by Lagos State, this centre presents Yoruba culture and history through digital and interactive displays. Its curved building, designed by architect Seun Oduwole (SI.SA studio), has won an award. It stands next to the National Museum and Tafawa Balewa Square, forming a small cultural quarter with them.",
          tips: "Pair it with the National Museum, a short walk away: the two visits complement each other well.",
        },
      },
      {
        slug: "theatre-national-lagos",
        category: "CULTURE",
        name: "Théâtre national (Wole Soyinka Centre)",
        summary: "Monumental centre des arts d'Iganmu, construit pour le FESTAC 77.",
        description:
          "Achevé en 1976 pour le Festival mondial des arts et de la culture noirs et africains (FESTAC 77), le Théâtre national d'Iganmu est l'édifice emblématique de la scène culturelle nigériane, dont la silhouette évoque une casquette militaire. Il a été renommé en 2024 en l'honneur du prix Nobel de littérature Wole Soyinka (Wole Soyinka Centre for Culture and Creative Arts). Ses salles et ses abords accueillent spectacles, projections et expositions.",
        tips: "Vérifiez la programmation avant de vous déplacer : le site, sur la partie continentale près de Surulere, se rejoint en voiture.",
        visitMinutes: 60,
        lat: 6.4764,
        lng: 3.3694,
        cover: "/images/voyage/lieu-theatre-national-lagos",
        en: {
          name: "National Theatre (Wole Soyinka Centre)",
          summary: "Monumental arts centre in Iganmu, built for FESTAC 77.",
          description:
            "Completed in 1976 for the Second World Black and African Festival of Arts and Culture (FESTAC 77), the National Theatre in Iganmu is the emblem of Nigeria's cultural scene, its silhouette recalling a military cap. In 2024 it was renamed in honour of Nobel laureate Wole Soyinka (Wole Soyinka Centre for Culture and Creative Arts). Its halls and grounds host shows, screenings and exhibitions.",
          tips: "Check what's on before you go: the site, on the mainland near Surulere, is reached by car.",
        },
      },
      {
        slug: "marche-balogun-lagos",
        category: "MARKET",
        name: "Marché de Balogun",
        summary: "L'immense marché de Lagos Island : tissus wax, dentelles, aso-oke, chaussures et mille autres choses.",
        description:
          "Sans adresse précise tant il s'étend sur de nombreuses rues de Lagos Island, Balogun est le grand marché aux tissus de Lagos : ankara (wax), dentelles, aso-oke tissé, mais aussi chaussures, sacs et articles de toutes sortes. L'ambiance y est intense et la foule très dense, surtout avant les fêtes.",
        tips: "Venez avec une personne qui connaît le marché, peu d'objets de valeur et de l'argent en petites coupures. Marchandez. Évitez les heures de pointe et les jours qui précèdent les fêtes.",
        visitMinutes: 120,
        lat: 6.4554,
        lng: 3.3835,
        cover: "/images/voyage/lieu-marche-balogun-lagos",
        en: {
          name: "Balogun Market",
          summary: "Lagos Island's vast market: wax prints, lace, aso-oke, shoes and much more.",
          description:
            "With no precise address because it sprawls across many streets of Lagos Island, Balogun is Lagos's great fabric market: ankara (wax prints), lace, hand-woven aso-oke, as well as shoes, bags and goods of every kind. The atmosphere is intense and the crowds very dense, especially before holidays.",
          tips: "Go with someone who knows the market, carry few valuables and cash in small notes. Bargain. Avoid rush hours and the days just before holidays.",
        },
      },
      {
        slug: "marche-artisanal-lekki",
        category: "MARKET",
        name: "Marché d'artisanat de Lekki",
        summary: "Le marché d'artisanat des voyageurs : sculptures, tissus, perles et objets d'art de tout le pays.",
        description:
          "Dans le quartier de Jakande, à Lekki, ce marché d'artisans et de marchands rassemble des objets de tout le Nigeria et d'Afrique de l'Ouest : sculptures, masques, bronzes, tissus adire et aso-oke, perles, cuir et peintures. C'est l'endroit le plus pratique de Lagos pour acheter de l'artisanat.",
        tips: "Faites le tour avant d'acheter et marchandez. Pour une pièce présentée comme ancienne, sachez que l'exportation d'antiquités est soumise à autorisation : demandez un justificatif.",
        visitMinutes: 90,
        lat: 6.4343,
        lng: 3.5054,
        cover: "/images/voyage/lieu-marche-artisanal-lekki",
        en: {
          name: "Lekki Arts and Crafts Market",
          summary: "The travellers' craft market: carvings, fabrics, beads and art from all over the country.",
          description:
            "In the Jakande area of Lekki, this market of craftspeople and traders gathers objects from all over Nigeria and West Africa: carvings, masks, bronzes, adire and aso-oke cloth, beads, leather and paintings. It is the most convenient place in Lagos to buy crafts.",
          tips: "Look around before buying and bargain. If a piece is sold as old, remember that exporting antiquities requires a permit: ask for documentation.",
        },
      },
      {
        slug: "plage-tarkwa-bay-lagos",
        category: "BEACH",
        name: "Plage de Tarkwa Bay",
        summary: "Plage abritée près de l'entrée du port, accessible seulement en bateau.",
        description:
          "Formée à l'abri des digues qui protègent l'entrée du port de Lagos, Tarkwa Bay est une plage de sable accessible uniquement en bateau-taxi depuis Victoria Island ou Ikoyi. Ses eaux plus calmes que celles de l'océan ouvert en font un lieu prisé des baigneurs et des surfeurs le week-end.",
        tips: "Embarquez à un ponton reconnu, avec gilets de sauvetage. Renseignez-vous sur l'état de la mer et la propreté de la plage, parfois polluée, et ne vous baignez que là où l'eau est calme.",
        visitMinutes: 240,
        lat: 6.4015,
        lng: 3.3953,
        cover: "/images/voyage/lieu-plage-tarkwa-bay-lagos",
        en: {
          name: "Tarkwa Bay Beach",
          summary: "Sheltered beach near the harbour entrance, reachable only by boat.",
          description:
            "Formed in the shelter of the breakwaters guarding the entrance to Lagos harbour, Tarkwa Bay is a sandy beach reachable only by water taxi from Victoria Island or Ikoyi. Its waters, calmer than the open ocean, make it popular with swimmers and surfers at weekends.",
          tips: "Board at a recognised jetty, with life jackets. Check sea conditions and how clean the beach is, as it is sometimes polluted, and only swim where the water is calm.",
        },
      },
      {
        slug: "quartier-bresilien-lagos",
        category: "HISTORY",
        name: "Quartier brésilien (Popo Aguda)",
        summary: "Le quartier des Agudas, anciens esclaves revenus du Brésil et de Cuba au XIXe siècle.",
        description:
          "Autour de Campos Square et des rues Tokunbo, Bamgbose et Kakawa, le quartier de Popo Aguda a été bâti au XIXe siècle par des Afro-Brésiliens et des Afro-Cubains affranchis revenus en Afrique de l'Ouest, les Agudas. Ils y ont apporté une architecture aux façades ornées dont subsistent quelques témoins, comme la Water House. Un pan méconnu de l'histoire de Lagos, à découvrir avec un guide local.",
        tips: "Beaucoup de maisons sont privées ou dégradées : regardez-les de l'extérieur et demandez avant de photographier. Allez-y de jour, accompagné.",
        visitMinutes: 60,
        lat: 6.4526,
        lng: 3.391,
        cover: "/images/voyage/lieu-quartier-bresilien-lagos",
        en: {
          name: "Brazilian Quarter (Popo Aguda)",
          summary: "The quarter of the Agudas, formerly enslaved people who returned from Brazil and Cuba in the 19th century.",
          description:
            "Around Campos Square and Tokunbo, Bamgbose and Kakawa streets, the Popo Aguda quarter was built in the 19th century by freed Afro-Brazilians and Afro-Cubans who returned to West Africa, the Agudas. They brought an architecture of ornate façades, of which a few examples survive, such as the Water House. A little-known chapter of Lagos history, best explored with a local guide.",
          tips: "Many houses are private or run-down: view them from outside and ask before taking photos. Go by day, accompanied.",
        },
      },
      {
        slug: "iga-idunganran-lagos",
        category: "HISTORY",
        name: "Iga Idunganran, palais de l'Oba de Lagos",
        summary: "La résidence officielle de l'Oba de Lagos, dans le vieux quartier d'Isale Eko.",
        description:
          "Résidence officielle de l'Oba de Lagos, sur Lagos Island, le palais d'Iga Idunganran remonte à un premier édifice construit en 1670 pour l'Oba Gabaro, plusieurs fois agrandi et rénové ; sa partie moderne a été inaugurée le 1er octobre 1960. Son nom évoque le champ de piment qui occupait autrefois le site. Le palais a été un centre administratif et un marché, et il est associé au festival Eyo.",
        tips: "C'est une résidence royale en activité : la visite n'est pas garantie et se fait sur autorisation. Restez respectueux et demandez avant toute photo.",
        visitMinutes: 30,
        en: {
          name: "Iga Idunganran, Palace of the Oba of Lagos",
          summary: "The official residence of the Oba of Lagos, in the old Isale Eko quarter.",
          description:
            "The official residence of the Oba of Lagos, on Lagos Island, Iga Idunganran dates back to a first building erected in 1670 for Oba Gabaro, enlarged and renovated several times; its modern section was opened on 1 October 1960. Its name recalls the pepper farm that once occupied the site. The palace has served as an administrative centre and a market, and is associated with the Eyo festival.",
          tips: "It is a working royal residence: visits are not guaranteed and require permission. Be respectful and ask before taking any photos.",
        },
      },
      {
        slug: "vie-nocturne-lagos",
      cover: "/images/voyage/lieu-vie-nocturne-lagos",
        category: "LEISURE",
        name: "Vie nocturne de Victoria Island, Ikoyi et Lekki",
        summary: "Restaurants, bars, clubs et concerts : Lagos vit la nuit, surtout en décembre.",
        description:
          "Lagos a l'une des vies nocturnes les plus intenses d'Afrique. Victoria Island, Ikoyi et Lekki concentrent restaurants, lounges, bars sur les toits, clubs et salles de concert, tandis qu'Ikeja, sur le continent, a ses propres adresses, dont la New Afrika Shrine. Les soirées commencent tard, et la saison de décembre, le « Detty December », multiplie concerts et fêtes.",
        tips: "Ne circulez jamais à pied la nuit : réservez un chauffeur de confiance pour l'aller et le retour. Gardez sur vous le strict minimum, surveillez votre verre et demandez conseil à votre hébergement sur les lieux du moment.",
        bestPeriod: "Toute l'année, surtout en décembre",
        visitMinutes: 180,
        lat: 6.4306,
        lng: 3.4222,
        en: {
          name: "Victoria Island, Ikoyi and Lekki nightlife",
          summary: "Restaurants, bars, clubs and gigs: Lagos lives at night, especially in December.",
          description:
            "Lagos has one of the most intense nightlife scenes in Africa. Victoria Island, Ikoyi and Lekki are packed with restaurants, lounges, rooftop bars, clubs and live-music venues, while Ikeja, on the mainland, has its own spots, including the New Afrika Shrine. Nights start late, and the December season, “Detty December”, brings a flurry of concerts and parties.",
          tips: "Never walk around at night: book a trusted driver both ways. Carry the bare minimum, watch your drink and ask your accommodation for the current places to go.",
          bestPeriod: "All year, especially in December",
        },
      },
      {
        slug: "suya-lagos",
        category: "GASTRONOMY",
        name: "Suya et cuisine de rue",
        summary: "Lamelles de bœuf épicées grillées sur la braise, star des soirées nigérianes.",
        description:
          "Venu du nord haoussa, le suya est une viande, le plus souvent du bœuf, coupée en fines lamelles, enrobée d'un mélange d'épices à base d'arachide (yaji), grillée sur la braise et servie avec oignon cru et tomate. On l'achète le soir auprès des grillardins de rue, dans tout le pays. Lagos se goûte aussi à travers le riz jollof, la pepper soup, les beignets d'akara et les bananes plantains frites (dodo).",
        tips: "Choisissez un vendeur fréquenté et une viande grillée devant vous. Le yaji est très pimenté : demandez-en moins si besoin.",
        visitMinutes: 30,
        cover: "/images/voyage/lieu-suya-lagos",
        en: {
          name: "Suya and street food",
          summary: "Spicy strips of beef grilled over embers, the star of Nigerian evenings.",
          description:
            "Originating in the Hausa north, suya is meat, usually beef, cut into thin strips, coated in a peanut-based spice mix (yaji), grilled over embers and served with raw onion and tomato. It is bought in the evening from street grillers all over the country. Lagos is also tasted through jollof rice, pepper soup, akara fritters and fried plantain (dodo).",
          tips: "Choose a busy vendor and meat grilled in front of you. Yaji is very hot: ask for less if needed.",
        },
      },
    ],
  },
  {
    slug: "badagry",
    name: "Badagry",
    region: "État de Lagos",
    summary: "Ancien port de la traite au bord de la lagune, haut lieu de mémoire près de la frontière béninoise.",
    description:
      "À l'ouest de Lagos, près de la frontière avec le Bénin, Badagry fut l'un des ports de la traite négrière sur la côte des Esclaves. La ville conserve plusieurs lieux de mémoire, des musées consacrés à cette histoire et le premier immeuble à étage du pays, construit par des missionnaires au XIXe siècle. Elle se visite dans la journée depuis Lagos ; elle se trouve dans l'État de Lagos, classé en vigilance renforcée.",
    lat: 6.4167,
    lng: 2.8833,
    cover: "/images/voyage/badagry",
    en: {
      region: "Lagos State",
      summary: "Former slave-trading port on the lagoon, a major site of remembrance near the Benin border.",
      description:
        "West of Lagos, near the border with Benin, Badagry was one of the slave-trading ports of the Slave Coast. The town preserves several memorial sites, museums devoted to this history and the country's first storey building, built by missionaries in the 19th century. It can be visited as a day trip from Lagos; it lies within Lagos State, rated a “heightened vigilance” area.",
    },
    places: [
      {
        slug: "premier-immeuble-a-etage-badagry",
        lat: 6.4121,
        lng: 2.8866,
        cover: "/images/voyage/lieu-premier-immeuble-a-etage-badagry",
        category: "HISTORY",
        name: "Premier immeuble à étage du Nigeria",
        summary: "Maison de mission de 1845, considérée comme le premier bâtiment à étage du pays.",
        description:
          "Construite en 1845 par le révérend Henry Townsend de la Church Missionary Society, cette maison blanche au toit de tôle est présentée comme le premier bâtiment à étage du Nigeria. Elle rappelle le rôle de Badagry comme porte d'entrée des missions chrétiennes dans la région, et abrite une petite exposition sur cette période.",
        visitMinutes: 45,
        en: {
          name: "First Storey Building in Nigeria",
          summary: "Mission house from 1845, considered the country's first storey building.",
          description:
            "Built in 1845 by the Reverend Henry Townsend of the Church Missionary Society, this white house with its tin roof is presented as Nigeria's first storey building. It recalls Badagry's role as the gateway for Christian missions into the region, and houses a small exhibition about that period.",
        },
      },
      {
        slug: "musee-heritage-badagry",
        cover: "/images/voyage/lieu-musee-heritage-badagry",
        category: "MUSEUM",
        name: "Musée du patrimoine de Badagry",
        summary: "Musée consacré à la traite négrière, dans un bâtiment colonial du XIXe siècle.",
        description:
          "Installé dans un ancien bâtiment administratif de l'époque coloniale, le musée du patrimoine de Badagry retrace l'histoire de la traite transatlantique : capture, marches forcées, conditions de détention, embarquement et abolition. Les salles présentent chaînes, entraves et documents d'époque. Une visite éprouvante mais essentielle pour comprendre le passé de la côte.",
        visitMinutes: 60,
        lat: 6.4183,
        lng: 2.8901,
        en: {
          name: "Badagry Heritage Museum",
          summary: "Museum devoted to the slave trade, in a 19th-century colonial building.",
          description:
            "Housed in a former colonial-era administrative building, the Badagry Heritage Museum traces the history of the transatlantic slave trade: capture, forced marches, conditions of detention, shipment and abolition. Its rooms display chains, shackles and period documents. A harrowing but essential visit to understand the coast's past.",
        },
      },
      {
        slug: "point-of-no-return-badagry",
        cover: "/images/voyage/lieu-point-of-no-return-badagry",
        category: "HISTORY",
        name: "Point de non-retour",
        summary: "Sur l'île de Gberefu, le chemin des captifs jusqu'à la plage où ils étaient embarqués.",
        description:
          "Après une courte traversée de la lagune, un chemin traverse l'île de Gberefu jusqu'à l'océan, en suivant le dernier trajet des captifs avant leur embarquement vers les Amériques. Au bout, un mémorial marque le « point de non-retour ». Un lieu de recueillement, à faire de préférence avec un guide local.",
        tips: "Partez avec un guide connu de votre hébergement ; prévoyez de l'eau et un chapeau, le chemin est peu ombragé. Ne vous baignez pas : les courants sont dangereux.",
        visitMinutes: 120,
        en: {
          name: "Point of No Return",
          summary: "On Gberefu Island, the captives' path to the beach where they were shipped.",
          description:
            "After a short crossing of the lagoon, a path leads across Gberefu Island to the ocean, following the captives' last journey before they were shipped to the Americas. At its end, a memorial marks the “point of no return”. A place of reflection, best visited with a local guide.",
          tips: "Go with a guide known to your accommodation; bring water and a hat, as there is little shade. Do not swim: the currents are dangerous.",
        },
      },
      {
        slug: "musee-mobee-badagry",
        category: "MUSEUM",
        name: "Musée Mobee des reliques de l'esclavage",
        summary: "Petit musée familial présentant chaînes, entraves et objets de la traite.",
        description:
          "Tenu par des descendants d'une famille de chefs traditionnels de Badagry, ce musée privé expose des reliques de la traite : menottes et entraves, dont certaines liaient les jambes de deux captifs, et un fer de marquage de la fin du XVIIIe siècle ayant appartenu au marchand d'esclaves Sunbu Mobee, dont la tombe se trouve sur place. Deux canons du XVIIIe siècle sont exposés à l'extérieur. Une visite brève mais saisissante.",
        tips: "Les explications sont données par des membres de la famille : prenez le temps de les écouter.",
        visitMinutes: 45,
        lat: 6.4123,
        lng: 2.8845,
        cover: "/images/voyage/lieu-musee-mobee-badagry",
        en: {
          name: "Mobee Royal Family Slave Relics Museum",
          summary: "Small family museum displaying chains, shackles and objects of the slave trade.",
          description:
            "Run by descendants of a family of traditional rulers of Badagry, this private museum displays relics of the slave trade: handcuffs and shackles, some of which bound the legs of two captives together, and a late 18th-century branding iron that belonged to the slave merchant Sunbu Mobee, whose grave is on site. Two 18th-century cannons stand outside. A short but striking visit.",
          tips: "Explanations are given by family members: take the time to listen.",
        },
      },
      {
        slug: "marche-esclaves-vlekete-badagry",
        category: "HISTORY",
        name: "Marché aux esclaves de Vlekete",
        summary: "Ancien marché de la traite, du nom de la divinité Vlekete, devenu lieu de mémoire.",
        description:
          "Établi selon la tradition en 1502 et nommé d'après la divinité Vlekete, ce marché de Badagry fut l'un des lieux où des intermédiaires africains vendaient des captifs aux négriers européens. Le site, doté d'un petit musée et de statues commémoratives, rappelle le rôle du port dans la traite atlantique.",
        tips: "Visitez-le avec un guide de Badagry, qui fait le lien avec le musée du patrimoine, le musée Mobee et le Point de non-retour.",
        visitMinutes: 45,
        lat: 6.4166,
        lng: 2.8808,
        cover: "/images/voyage/lieu-marche-esclaves-vlekete-badagry",
        en: {
          name: "Vlekete Slave Market",
          summary: "Former slave-trading market named after the Vlekete deity, now a memorial site.",
          description:
            "Established according to tradition in 1502 and named after the Vlekete deity, this Badagry market was one of the places where African middlemen sold captives to European slave traders. The site, with a small museum and memorial statues, recalls the port's role in the Atlantic slave trade.",
          tips: "Visit with a Badagry guide, who will link it with the Heritage Museum, the Mobee museum and the Point of No Return.",
        },
      },
    ],
  },
  {
    slug: "abeokuta",
    name: "Abeokuta",
    region: "État d'Ogun",
    summary: "La ville du rocher Olumo, berceau des Egba et capitale du tissu adire.",
    description:
      "Capitale de l'État d'Ogun, à une centaine de kilomètres au nord de Lagos, Abeokuta (« sous le rocher » en yoruba) s'est développée au XIXe siècle autour du rocher Olumo, qui servit de refuge aux Egba pendant les guerres. La ville est aussi réputée pour l'adire, tissu teint à l'indigo selon des techniques de réserve. La ville d'Abeokuta et l'autoroute qui la relie à Lagos sont classées en vigilance renforcée ; la campagne environnante est déconseillée sauf raison impérative.",
    lat: 7.1608,
    lng: 3.3483,
    cover: "/images/voyage/abeokuta",
    en: {
      region: "Ogun State",
      summary: "City of Olumo Rock, cradle of the Egba people and capital of adire cloth.",
      description:
        "Capital of Ogun State, about a hundred kilometres north of Lagos, Abeokuta (“under the rock” in Yoruba) grew up in the 19th century around Olumo Rock, which served as a refuge for the Egba during the wars. The city is also known for adire, cloth dyed with indigo using resist techniques. The city of Abeokuta and the motorway linking it to Lagos are rated “heightened vigilance” areas; the surrounding countryside is advised against except for essential travel.",
    },
    places: [
      {
        slug: "rocher-olumo",
        lat: 7.1672,
        lng: 3.3426,
        cover: "/images/voyage/lieu-rocher-olumo",
        category: "NATURE",
        name: "Rocher Olumo",
        summary: "Affleurement granitique sacré offrant une vue sur toute la ville.",
        description:
          "Symbole d'Abeokuta, le rocher Olumo servit de refuge et de forteresse naturelle aux Egba au XIXe siècle. La montée, par des marches taillées dans la roche ou par un ascenseur, passe par des sanctuaires, d'anciennes cachettes et des arbres vénérés, jusqu'à un sommet d'où l'on embrasse la ville et ses toits de tôle. Un guide raconte l'histoire du site.",
        tips: "Portez de bonnes chaussures et montez de préférence le matin. Respectez les sanctuaires et demandez avant de photographier.",
        visitMinutes: 120,
        en: {
          name: "Olumo Rock",
          summary: "Sacred granite outcrop with a view over the whole city.",
          description:
            "The symbol of Abeokuta, Olumo Rock served as a refuge and natural fortress for the Egba in the 19th century. The climb, by steps cut into the rock or by lift, passes shrines, old hiding places and venerated trees on the way to a summit overlooking the city and its tin roofs. A guide tells the story of the site.",
          tips: "Wear good shoes and climb preferably in the morning. Respect the shrines and ask before taking photos.",
        },
      },
      {
        slug: "marche-itoku-abeokuta",
        cover: "/images/voyage/lieu-marche-itoku-abeokuta",
        category: "MARKET",
        name: "Marché d'Itoku",
        summary: "Le marché de l'adire : pagnes teints à l'indigo et motifs yoruba.",
        description:
          "Au pied du rocher Olumo, le marché d'Itoku est le grand marché de l'adire, l'étoffe teinte à l'indigo dont Abeokuta est la capitale. Les étals débordent de tissus aux motifs réalisés à la cire, au fil ou à la pâte de manioc, et l'on peut parfois voir des teinturières au travail. L'endroit idéal pour rapporter un tissu authentique.",
        tips: "Venez accompagné d'une personne de confiance, gardez vos affaires près de vous et marchandez avec le sourire.",
        visitMinutes: 90,
        en: {
          name: "Itoku Market",
          summary: "The adire market: indigo-dyed cloth and Yoruba patterns.",
          description:
            "At the foot of Olumo Rock, Itoku market is the great market for adire, the indigo-dyed cloth of which Abeokuta is the capital. Stalls overflow with fabrics patterned with wax, thread or cassava paste, and you can sometimes watch dyers at work. The ideal place to buy authentic cloth.",
          tips: "Go with someone you trust, keep your belongings close and bargain with a smile.",
        },
      },
      {
        slug: "centenary-hall-abeokuta",
        category: "HISTORY",
        name: "Centenary Hall",
        summary: "Édifice colonial de 1930 près du palais de l'Alake, dans le quartier d'Ake.",
        description:
          "Inaugurée en 1930 pour commémorer le centenaire de l'installation des Egba à Abeokuta, la Centenary Hall se dresse dans le quartier d'Ake, près du palais de l'Alake, le roi des Egba. Avec ses arcades et sa façade claire, c'est l'un des principaux monuments historiques de la ville.",
        tips: "Le quartier d'Ake et le palais de l'Alake se découvrent avec un guide local, de jour.",
        visitMinutes: 30,
        cover: "/images/voyage/lieu-centenary-hall-abeokuta",
        en: {
          name: "Centenary Hall",
          summary: "1930 colonial building near the Alake's palace, in the Ake quarter.",
          description:
            "Opened in 1930 to mark the centenary of the Egba settlement of Abeokuta, Centenary Hall stands in the Ake quarter, near the palace of the Alake, king of the Egba. With its arcades and pale façade, it is one of the city's main historic landmarks.",
          tips: "Explore the Ake quarter and the Alake's palace with a local guide, by day.",
        },
      },
      {
        slug: "bibliotheque-obasanjo-abeokuta",
        category: "MUSEUM",
        name: "Bibliothèque présidentielle Olusegun Obasanjo",
        summary: "Archives et espaces d'exposition consacrés à un ancien président, à Oke Mosan.",
        description:
          "Inspirée du modèle des bibliothèques présidentielles américaines, cette institution du quartier d'Oke Mosan conserve les documents et souvenirs de l'ancien président Olusegun Obasanjo, originaire de la région, et retrace à travers eux l'histoire politique récente du Nigeria. Le vaste complexe accueille aussi des expositions et des événements.",
        tips: "Renseignez-vous à l'avance sur les espaces ouverts à la visite.",
        visitMinutes: 90,
        cover: "/images/voyage/lieu-bibliotheque-obasanjo-abeokuta",
        en: {
          name: "Olusegun Obasanjo Presidential Library",
          summary: "Archives and exhibition spaces devoted to a former president, in Oke Mosan.",
          description:
            "Modelled on American presidential libraries, this institution in the Oke Mosan district preserves the papers and memorabilia of former president Olusegun Obasanjo, a native of the region, and uses them to trace Nigeria's recent political history. The large complex also hosts exhibitions and events.",
          tips: "Check in advance which areas are open to visitors.",
        },
      },
    ],
  },
  {
    slug: "ibadan",
    name: "Ibadan",
    region: "État d'Oyo",
    summary: "Immense ville yoruba aux collines couvertes de toits de tôle, ville universitaire et capitale de l'amala.",
    description:
      "Capitale de l'État d'Oyo, Ibadan s'étend sur des collines à perte de vue. Ancienne capitale de la Région Ouest, elle abrite la plus ancienne université du pays, la Cocoa House, premier gratte-ciel du pays construit grâce aux revenus du cacao, et des points de vue comme la tour Bower. C'est aussi une ville de bonne table yoruba. La ville d'Ibadan et l'autoroute Lagos-Ibadan sont classées en vigilance renforcée ; le reste de l'État d'Oyo est déconseillé, et son nord-ouest formellement.",
    lat: 7.3964,
    lng: 3.9167,
    cover: "/images/voyage/ibadan",
    en: {
      region: "Oyo State",
      summary: "Vast Yoruba city of tin-roofed hills, a university town and the capital of amala.",
      description:
        "Capital of Oyo State, Ibadan sprawls over hills as far as the eye can see. Former capital of the Western Region, it is home to the country's oldest university, Cocoa House, the country's first skyscraper, built with cocoa revenues, and viewpoints such as Bower's Tower. It is also a great city for Yoruba food. The city of Ibadan and the Lagos–Ibadan motorway are rated “heightened vigilance” areas; the rest of Oyo State is advised against, and its north-west entirely.",
    },
    places: [
      {
        slug: "cocoa-house-ibadan",
        cover: "/images/voyage/lieu-cocoa-house-ibadan",
        category: "HISTORY",
        name: "Cocoa House",
        summary: "Tour achevée en 1965, symbole de la prospérité cacaoyère de l'Ouest nigérian.",
        description:
          "Achevée en 1965 et financée par les revenus du cacao de l'ancienne Région Ouest, la Cocoa House fut longtemps le plus haut immeuble du Nigeria et est considérée comme le premier gratte-ciel d'Afrique de l'Ouest. Elle domine le quartier commerçant de Dugbe et reste un repère de l'histoire économique du pays.",
        visitMinutes: 30,
        lat: 7.3879,
        lng: 3.8793,
        en: {
          summary: "Tower completed in 1965, symbol of Western Nigeria's cocoa wealth.",
          description:
            "Completed in 1965 and funded by the cocoa revenues of the former Western Region, Cocoa House was long Nigeria's tallest building and is considered West Africa's first skyscraper. It towers over the Dugbe business district and remains a landmark of the country's economic history.",
        },
      },
      {
        slug: "tour-bower-ibadan",
        cover: "/images/voyage/lieu-tour-bower-ibadan",
        category: "CULTURE",
        name: "Tour Bower",
        summary: "Tour d'observation des années 1930 au sommet d'une colline, avec un panorama sur la ville.",
        description:
          "Perchée sur une colline du quartier d'Oke Aare, la tour Bower fut édifiée dans les années 1930 en mémoire du capitaine Robert Bower, premier résident britannique d'Ibadan. Depuis son sommet, la vue sur l'océan de toits de tôle brune qui recouvre les collines d'Ibadan est saisissante.",
        tips: "Montez-y avec un chauffeur et un guide local, de préférence en fin d'après-midi pour la lumière.",
        visitMinutes: 60,
        lat: 7.3923,
        lng: 3.8967,
        en: {
          name: "Bower's Tower",
          summary: "1930s hilltop observation tower with a panorama over the city.",
          description:
            "Perched on a hill in the Oke Aare district, Bower's Tower was built in the 1930s in memory of Captain Robert Bower, the first British resident of Ibadan. From the top, the view over the sea of brown tin roofs covering Ibadan's hills is striking.",
          tips: "Go up with a driver and a local guide, ideally in late afternoon for the light.",
        },
      },
      {
        slug: "jardins-agodi-ibadan",
        cover: "/images/voyage/lieu-jardins-agodi-ibadan",
        category: "LEISURE",
        name: "Jardins d'Agodi",
        summary: "Parc de loisirs verdoyant, prisé des familles d'Ibadan.",
        description:
          "Aux Jardins d'Agodi, pelouses, plans d'eau, aires de jeux et coins ombragés offrent une respiration au cœur de la ville. C'est un lieu de promenade et de pique-nique apprécié des familles, surtout le week-end.",
        visitMinutes: 90,
        lat: 7.4069,
        lng: 3.8992,
        en: {
          name: "Agodi Gardens",
          summary: "Green leisure park popular with Ibadan families.",
          description:
            "At Agodi Gardens, lawns, ponds, play areas and shady spots offer a breather in the heart of the city. It is a favourite place for walks and picnics with families, especially at weekends.",
        },
      },
      {
        slug: "amala-ibadan",
        cover: "/images/voyage/lieu-amala-ibadan",
        category: "GASTRONOMY",
        name: "Amala, gbegiri et ewedu",
        summary: "Le plat emblématique d'Ibadan, à goûter dans une « buka » populaire.",
        description:
          "Ibadan est la capitale de l'amala, une pâte brune à base de farine d'igname séchée, servie avec du gbegiri (soupe de haricots) et de l'ewedu (soupe de feuilles de corète), souvent accompagnés d'une sauce tomate pimentée et de viande. On le mange à la main dans les bukas, gargotes populaires où l'on se sert au comptoir.",
        tips: "Demandez conseil à votre hébergement ou à votre chauffeur pour une buka réputée et propre ; on mange de la main droite.",
        visitMinutes: 60,
        en: {
          name: "Amala, gbegiri and ewedu",
          summary: "Ibadan's signature dish, best tried in a popular buka.",
          description:
            "Ibadan is the capital of amala, a brown swallow made from dried yam flour, served with gbegiri (bean soup) and ewedu (jute-leaf soup), often with a spicy tomato stew and meat. It is eaten by hand in bukas, popular eateries where you order at the counter.",
          tips: "Ask your accommodation or driver for a well-known, clean buka; eat with your right hand.",
        },
      },
      {
        slug: "mapo-hall-ibadan",
        category: "HISTORY",
        name: "Mapo Hall",
        summary: "Hôtel de ville néoclassique des années 1920, au sommet de la colline de Mapo.",
        description:
          "Construit de 1925 à 1929 sous l'administration coloniale, Mapo Hall, l'hôtel de ville d'Ibadan, coiffe la colline de Mapo de sa colonnade néoclassique. Visible de nombreux points de la ville, il offre en retour une vue étendue sur la vieille ville et ses toits de tôle rouillée.",
        tips: "Le quartier de Mapo est très animé et encombré : venez avec un chauffeur et un guide local.",
        visitMinutes: 45,
        lat: 7.376,
        lng: 3.897,
        cover: "/images/voyage/lieu-mapo-hall-ibadan",
        en: {
          name: "Mapo Hall",
          summary: "1920s neoclassical city hall on top of Mapo Hill.",
          description:
            "Built between 1925 and 1929 under the colonial administration, Mapo Hall, Ibadan's city hall, crowns Mapo Hill with its neoclassical colonnade. Visible from many parts of the city, it offers in return a wide view over the old town and its rusty tin roofs.",
          tips: "The Mapo area is busy and congested: come with a driver and a local guide.",
        },
      },
      {
        slug: "universite-ibadan",
        category: "CULTURE",
        name: "Université d'Ibadan",
        summary: "La plus ancienne université du pays, fondée en 1948, sur un vaste campus arboré.",
        description:
          "Fondée en 1948 comme University College rattaché à l'université de Londres, devenue indépendante en 1962, l'université d'Ibadan est la plus ancienne institution universitaire du Nigeria ; Wole Soyinka et bien d'autres figures du pays y ont étudié. Son grand campus verdoyant, avec la bibliothèque Kenneth Dike, se prête à une promenade.",
        tips: "L'accès au campus peut être contrôlé : munissez-vous d'une pièce d'identité et respectez les règles de l'université.",
        visitMinutes: 120,
        lat: 7.4417,
        lng: 3.9,
        cover: "/images/voyage/lieu-universite-ibadan",
        en: {
          name: "University of Ibadan",
          summary: "The country's oldest university, founded in 1948, on a vast leafy campus.",
          description:
            "Founded in 1948 as a University College affiliated to the University of London and independent since 1962, the University of Ibadan is Nigeria's oldest university; Wole Soyinka and many other national figures studied here. Its large green campus, with the Kenneth Dike Library, is pleasant to stroll around.",
          tips: "Access to the campus may be checked: carry ID and follow university rules.",
        },
      },
    ],
  },
  {
    slug: "abuja",
    name: "Abuja",
    region: "Territoire de la capitale fédérale",
    summary: "Capitale fédérale planifiée au centre du pays, au pied de l'Aso Rock.",
    description:
      "Devenue capitale du Nigeria à la place de Lagos en 1991, Abuja est une ville nouvelle aux larges avenues, construite au centre du pays au pied de l'Aso Rock, un imposant monolithe de granite. Plus calme et aérée que Lagos, elle se découvre à travers ses grands édifices religieux et officiels et ses parcs. La ville d'Abuja est classée en vigilance renforcée, mais le reste du Territoire de la capitale fédérale est déconseillé sauf raison impérative, tout comme les routes qui en partent : on y arrive en avion.",
    lat: 9.0667,
    lng: 7.4833,
    cover: "/images/voyage/abuja",
    en: {
      region: "Federal Capital Territory",
      summary: "Planned federal capital in the centre of the country, at the foot of Aso Rock.",
      description:
        "Abuja replaced Lagos as Nigeria's capital in 1991. It is a new town of wide avenues, built in the centre of the country at the foot of Aso Rock, an imposing granite monolith. Calmer and more spacious than Lagos, it is best discovered through its great religious and official buildings and its parks. The city of Abuja is rated a “heightened vigilance” area, but the rest of the Federal Capital Territory is advised against except for essential travel, as are the roads leading out of it: arrive by air.",
    },
    places: [
      {
        slug: "mosquee-nationale-abuja",
        lat: 9.0602,
        lng: 7.4897,
        cover: "/images/voyage/lieu-mosquee-nationale-abuja",
        category: "RELIGION",
        name: "Mosquée nationale",
        summary: "Grande mosquée à coupole dorée et quatre minarets, sur l'avenue de l'Indépendance.",
        description:
          "Avec sa coupole dorée et ses quatre hauts minarets, la Mosquée nationale du Nigeria est l'un des monuments les plus reconnaissables de la capitale. Construite dans les années 1980, elle comprend aussi un centre d'enseignement et une bibliothèque. Sa silhouette se photographie très bien depuis l'avenue.",
        tips: "Renseignez-vous sur place sur les conditions de visite pour les non-musulmans ; tenue couvrante exigée et pas de visite pendant les prières.",
        visitMinutes: 45,
        en: {
          name: "National Mosque",
          summary: "Great mosque with a golden dome and four minarets, on Independence Avenue.",
          description:
            "With its golden dome and four tall minarets, the National Mosque of Nigeria is one of the capital's most recognisable landmarks. Built in the 1980s, it also includes a teaching centre and a library. Its silhouette is best photographed from the avenue.",
          tips: "Ask on site about visiting conditions for non-Muslims; modest dress required and no visits during prayers.",
        },
      },
      {
        slug: "centre-chretien-national-abuja",
        cover: "/images/voyage/lieu-centre-chretien-national-abuja",
        category: "RELIGION",
        name: "Centre chrétien national",
        summary: "Vaste édifice œcuménique aux allures de cathédrale, face à la Mosquée nationale.",
        description:
          "Le Centre chrétien national (National Christian Centre), grand édifice blanc et gris aux lignes néogothiques, se dresse non loin de la Mosquée nationale. Ensemble, les deux bâtiments illustrent la place des deux grandes religions dans la vie du pays et l'ambition architecturale de la capitale.",
        tips: "Une visite extérieure suffit le plus souvent ; tenue correcte si vous entrez lors d'un office.",
        visitMinutes: 30,
        lat: 9.0519,
        lng: 7.4944,
        en: {
          name: "National Christian Centre",
          summary: "Vast cathedral-like ecumenical building, facing the National Mosque.",
          description:
            "The National Christian Centre, a large white and grey building with neo-Gothic lines, stands not far from the National Mosque. Together, the two buildings illustrate the place of the country's two main religions in national life and the capital's architectural ambition.",
          tips: "An exterior visit is usually enough; dress modestly if you go in during a service.",
        },
      },
      {
        slug: "parc-millennium-abuja",
        lat: 9.0716,
        lng: 7.4995,
        cover: "/images/voyage/lieu-parc-millennium-abuja",
        category: "LEISURE",
        name: "Millennium Park",
        summary: "Le plus grand parc de la capitale : pelouses, fontaines et vue sur l'Aso Rock.",
        description:
          "Dans le quartier de Maitama, Millennium Park déroule ses pelouses, ses bassins et ses allées plantées jusqu'au pied des collines, avec l'Aso Rock en toile de fond. C'est le lieu de promenade favori des habitants d'Abuja, très animé le week-end.",
        visitMinutes: 90,
        en: {
          summary: "The capital's largest park: lawns, fountains and views of Aso Rock.",
          description:
            "In the Maitama district, Millennium Park unfolds its lawns, pools and tree-lined paths to the foot of the hills, with Aso Rock as a backdrop. It is Abuja residents' favourite place for a stroll, and very lively at weekends.",
        },
      },
      {
        slug: "aso-rock-abuja",
        category: "NATURE",
        name: "Aso Rock",
        summary: "Monolithe de granite culminant à 936 m, symbole de la capitale.",
        description:
          "Culminant à 936 mètres, soit environ 400 mètres au-dessus des environs, l'Aso Rock est le symbole d'Abuja. À son pied se trouvent la présidence (Aso Rock Villa), l'Assemblée nationale et la Cour suprême. On l'admire de loin, depuis Millennium Park ou les grandes avenues, en particulier au coucher du soleil.",
        tips: "Le rocher se trouve dans une zone officielle très sécurisée : pas d'ascension, et aucune photo des bâtiments officiels ni des forces de sécurité.",
        visitMinutes: 30,
        lat: 9.0804,
        lng: 7.536,
        cover: "/images/voyage/lieu-aso-rock-abuja",
        en: {
          name: "Aso Rock",
          summary: "Granite monolith rising to 936 m, the symbol of the capital.",
          description:
            "Rising to 936 metres, about 400 metres above the surrounding land, Aso Rock is the symbol of Abuja. At its foot stand the presidency (Aso Rock Villa), the National Assembly and the Supreme Court. It is admired from a distance, from Millennium Park or the main avenues, especially at sunset.",
          tips: "The rock lies in a high-security government zone: no climbing, and no photos of official buildings or security forces.",
        },
      },
      {
        slug: "fontaine-unite-abuja",
        category: "LEISURE",
        name: "Fontaine de l'Unité",
        summary: "Fontaine monumentale portant les noms des États de la fédération.",
        description:
          "Dans le quartier de Maitama, la fontaine de l'Unité associe bassins, colonnes et un mur où figurent les noms des États du Nigeria, symbole de l'unité de la fédération. Le lieu sert aussi de point de rassemblement et de commémoration pour les habitants de la capitale.",
        tips: "Des rassemblements s'y tiennent régulièrement : évitez le lieu en cas de manifestation.",
        visitMinutes: 20,
        lat: 9.073,
        lng: 7.4962,
        cover: "/images/voyage/lieu-fontaine-unite-abuja",
        en: {
          name: "Unity Fountain",
          summary: "Monumental fountain bearing the names of the federation's states.",
          description:
            "In the Maitama district, Unity Fountain combines pools, columns and a wall bearing the names of Nigeria's states, a symbol of the unity of the federation. It also serves as a gathering and memorial place for the capital's residents.",
          tips: "Gatherings are held here regularly: stay away during demonstrations.",
        },
      },
      {
        slug: "marche-wuse-abuja",
        category: "MARKET",
        name: "Marché de Wuse",
        summary: "Le grand marché de la capitale : produits frais, poisson fumé, épices, tissus.",
        description:
          "Le marché de Wuse est le principal marché d'Abuja : fruits et légumes, poisson fumé, épices, tissus et produits venus de toutes les régions du pays s'y côtoient. Une immersion dans la vie quotidienne de la capitale.",
        tips: "Allez-y accompagné, de jour, et gardez vos affaires près de vous. Marchandez avec le sourire.",
        visitMinutes: 90,
        lat: 9.0686,
        lng: 7.4659,
        cover: "/images/voyage/lieu-marche-wuse-abuja",
        en: {
          name: "Wuse Market",
          summary: "The capital's main market: fresh produce, smoked fish, spices, fabrics.",
          description:
            "Wuse Market is Abuja's main market, where fruit and vegetables, smoked fish, spices, fabrics and produce from every region of the country sit side by side. A dive into everyday life in the capital.",
          tips: "Go accompanied, by day, and keep your belongings close. Bargain with a smile.",
        },
      },
    ],
  },
  {
    slug: "osogbo",
    name: "Osogbo",
    region: "État d'Osun",
    summary: "La forêt sacrée d'Osun-Osogbo, classée à l'UNESCO, et son grand festival annuel. Zone déconseillée sauf raison impérative.",
    description:
      "Capitale de l'État d'Osun, Osogbo est célèbre pour sa forêt sacrée dédiée à Osun, divinité yoruba de la rivière et de la fertilité, inscrite au patrimoine mondial de l'UNESCO. La ville a aussi été un foyer de l'art moderne nigérian. Attention : l'État d'Osun est classé par France Diplomatie en zone « déconseillée sauf raison impérative », en raison notamment du risque d'enlèvement. Ce site est présenté pour sa valeur patrimoniale, pour préparer un voyage quand les conditions le permettront ; il ne figure dans aucun circuit.",
    lat: 7.7667,
    lng: 4.5667,
    cover: "/images/voyage/osogbo",
    en: {
      region: "Osun State",
      summary: "The UNESCO-listed Osun-Osogbo Sacred Grove and its great annual festival. Advised against except for essential travel.",
      description:
        "Capital of Osun State, Osogbo is famous for its sacred grove dedicated to Osun, the Yoruba goddess of the river and fertility, a UNESCO World Heritage Site. The town was also a centre of modern Nigerian art. Warning: France Diplomatie advises against all but essential travel to Osun State, notably because of the kidnapping risk. This site is presented for its heritage value, to help plan a trip when conditions allow; it is not part of any itinerary.",
    },
    places: [
      {
        slug: "foret-sacree-osun-osogbo",
        cover: "/images/voyage/lieu-foret-sacree-osun-osogbo",
        category: "RELIGION",
        name: "Forêt sacrée d'Osun-Osogbo",
        summary: "Forêt primaire sacrée le long de la rivière Osun, peuplée de sanctuaires et de sculptures.",
        description:
          "L'une des dernières forêts sacrées qui bordaient autrefois les villes yoruba. Le long de la rivière Osun, elle abrite sanctuaires, autels et sculptures monumentales réalisées à partir des années 1950 par l'artiste autrichienne Susanne Wenger et les artistes du mouvement du « Nouvel art sacré ». Elle est inscrite au patrimoine mondial de l'UNESCO depuis 2005.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Sur place, visite avec un guide et respect des lieux de culte.",
        visitMinutes: 120,
        lat: 7.7556,
        lng: 4.5522,
        en: {
          name: "Osun-Osogbo Sacred Grove",
          summary: "Sacred primary forest along the Osun River, filled with shrines and sculptures.",
          description:
            "One of the last of the sacred forests that once bordered Yoruba towns. Along the Osun River, it shelters shrines, altars and monumental sculptures created from the 1950s onwards by the Austrian artist Susanne Wenger and the artists of the “New Sacred Art” movement. It has been a UNESCO World Heritage Site since 2005.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans. On site, visit with a guide and respect places of worship.",
        },
      },
      {
        slug: "festival-osun-osogbo",
        cover: "/images/voyage/lieu-festival-osun-osogbo",
        category: "FESTIVAL",
        name: "Festival d'Osun-Osogbo",
        summary: "Grande célébration annuelle en l'honneur de la déesse Osun, vers le mois d'août.",
        description:
          "Chaque année, généralement en août, le festival d'Osun-Osogbo rassemble fidèles, habitants et visiteurs venus de tout le Nigeria et de la diaspora. Les festivités, sur plusieurs jours, culminent avec une grande procession jusqu'à la rivière, menée par une jeune femme portant les offrandes à Osun.",
        tips: "Très grande affluence ; les sources officielles recommandent d'éviter les rassemblements. Zone déconseillée sauf raison impérative : vérifiez les conseils aux voyageurs.",
        bestPeriod: "Généralement en août",
        visitMinutes: 240,
        en: {
          name: "Osun-Osogbo Festival",
          summary: "Great annual celebration in honour of the goddess Osun, around August.",
          description:
            "Every year, usually in August, the Osun-Osogbo festival brings together worshippers, residents and visitors from all over Nigeria and the diaspora. The festivities last several days and culminate in a great procession to the river, led by a young woman carrying the offerings to Osun.",
          tips: "Very large crowds; official sources advise avoiding gatherings. Area advised against except for essential travel: check travel advice.",
          bestPeriod: "Usually in August",
        },
      },
      {
        slug: "maison-susanne-wenger-osogbo",
        category: "CULTURE",
        name: "Maison de Susanne Wenger",
        summary: "La demeure ornée de sculptures de l'artiste et prêtresse Adunni Olorisha.",
        description:
          "Au cœur d'Osogbo, la maison de l'artiste autrichienne Susanne Wenger (1915-2009), devenue prêtresse yoruba sous le nom d'Adunni Olorisha, est couverte de sculptures et d'ornements. Avec les artistes du mouvement du « Nouvel art sacré », elle a œuvré à la protection de la forêt sacrée d'Osun, classée monument national en 1965 puis inscrite au patrimoine mondial.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. La maison reste une résidence : renseignez-vous sur les conditions de visite.",
        visitMinutes: 45,
        lat: 7.7667,
        lng: 4.5608,
        cover: "/images/voyage/lieu-maison-susanne-wenger-osogbo",
        en: {
          name: "Susanne Wenger House",
          summary: "The sculpture-covered home of the artist and priestess Adunni Olorisha.",
          description:
            "In the heart of Osogbo, the house of Austrian artist Susanne Wenger (1915-2009), who became a Yoruba priestess under the name Adunni Olorisha, is covered with sculptures and ornaments. With the artists of the “New Sacred Art” movement, she worked to protect the Osun sacred grove, declared a national monument in 1965 and later a World Heritage Site.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans. The house is still a residence: ask about visiting arrangements.",
        },
      },
    ],
  },
  {
    slug: "benin-city",
    name: "Benin City",
    region: "État d'Edo",
    summary: "Capitale de l'ancien royaume de Benin et de ses célèbres bronzes. Zone déconseillée sauf raison impérative.",
    description:
      "Capitale de l'État d'Edo, Benin City fut le centre du royaume de Benin, dont les rois (Oba) régnaient depuis un palais célèbre et dont les artistes ont produit les fameux bronzes et ivoires, pillés en 1897 lors d'une expédition britannique. La ville, où réside toujours l'Oba, reste le foyer vivant de cet art. Attention : l'État d'Edo est classé par France Diplomatie en zone « déconseillée sauf raison impérative ». Destination présentée pour sa valeur patrimoniale ; elle ne figure dans aucun circuit.",
    lat: 6.3333,
    lng: 5.6222,
    cover: "/images/voyage/benin-city",
    en: {
      region: "Edo State",
      summary: "Capital of the old Kingdom of Benin and its famous bronzes. Advised against except for essential travel.",
      description:
        "Capital of Edo State, Benin City was the centre of the Kingdom of Benin, whose kings (Oba) ruled from a famous palace and whose artists produced the renowned bronzes and ivories, looted in 1897 during a British expedition. The city, where the Oba still resides, remains the living home of this art. Warning: France Diplomatie advises against all but essential travel to Edo State. This destination is presented for its heritage value; it is not part of any itinerary.",
    },
    places: [
      {
        slug: "musee-national-benin-city",
        lat: 6.3329,
        lng: 5.6221,
        cover: "/images/voyage/lieu-musee-national-benin-city",
        category: "MUSEUM",
        name: "Musée national de Benin City",
        summary: "Musée circulaire au cœur de la ville, consacré à l'art et à l'histoire du royaume de Benin.",
        description:
          "Situé sur la grande place centrale (King's Square), le Musée national présente des pièces de l'art de cour du royaume de Benin : bronzes, terres cuites, objets rituels et royaux, ainsi que des collections sur l'histoire de la région. Une étape pour comprendre l'importance de ce royaume et de son art.",
        tips: "Zone déconseillée sauf raison impérative : consultez les conseils aux voyageurs avant tout projet.",
        visitMinutes: 60,
        en: {
          name: "Benin City National Museum",
          summary: "Circular museum in the heart of the city, devoted to the art and history of the Kingdom of Benin.",
          description:
            "Standing on the large central square (King's Square), the National Museum displays court art from the Kingdom of Benin: bronzes, terracottas, ritual and royal objects, as well as collections on the region's history. A stop to understand the importance of this kingdom and its art.",
          tips: "Area advised against except for essential travel: check travel advice before making any plans.",
        },
      },
      {
        slug: "rue-igun-benin-city",
        lat: 6.3368,
        lng: 5.6294,
        category: "CULTURE",
        name: "Rue Igun",
        summary: "La rue des fondeurs de bronze, héritiers de la guilde royale.",
        description:
          "Dans la rue Igun, les membres de la guilde des fondeurs de bronze perpétuent la technique de la fonte à la cire perdue au service de l'Oba depuis des siècles. Ateliers et boutiques s'alignent le long de la rue : on peut y voir les artisans au travail et acheter des pièces.",
        tips: "Zone déconseillée sauf raison impérative : consultez les conseils aux voyageurs. Demandez avant de photographier les artisans.",
        visitMinutes: 60,
        en: {
          name: "Igun Street",
          summary: "The street of the bronze casters, heirs to the royal guild.",
          description:
            "On Igun Street, members of the bronze casters' guild have carried on the lost-wax casting technique in the service of the Oba for centuries. Workshops and shops line the street: you can watch the craftsmen at work and buy pieces.",
          tips: "Area advised against except for essential travel: check travel advice. Ask before photographing the craftsmen.",
        },
      },
      {
        slug: "palais-oba-benin-city",
        category: "HISTORY",
        name: "Palais royal de l'Oba de Benin",
        summary: "Résidence de l'Oba de Benin, rebâtie après l'expédition britannique de 1897.",
        description:
          "Le palais d'origine, fondé selon la tradition au XIIIe siècle par l'Oba Ewedo, se trouvait au cœur de l'ancienne Benin City et abritait les célèbres bronzes. Détruit en 1897 lors de l'expédition britannique, il a été reconstruit sous l'Oba Eweka II (1914-1932). Il reste la résidence de l'Oba et le centre de la vie cérémonielle du royaume, notamment lors de l'Igue en décembre.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Résidence royale en activité : visite sur autorisation, tenue correcte et photos seulement si elles sont permises.",
        visitMinutes: 45,
        lat: 6.332,
        lng: 5.6201,
        en: {
          name: "Royal Palace of the Oba of Benin",
          summary: "Residence of the Oba of Benin, rebuilt after the British expedition of 1897.",
          description:
            "The original palace, founded according to tradition in the 13th century by Oba Ewedo, stood at the heart of old Benin City and housed the famous bronzes. Destroyed in 1897 during the British expedition, it was rebuilt under Oba Eweka II (1914-1932). It remains the Oba's residence and the centre of the kingdom's ceremonial life, notably during Igue in December.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans. A working royal residence: visits by permission only, modest dress, and photos only where allowed.",
        },
      },
    ],
  },
  {
    slug: "calabar",
    name: "Calabar",
    region: "État de Cross River",
    summary: "Ville coloniale et port historique du sud-est, célèbre pour son carnaval de décembre. Zone déconseillée sauf raison impérative.",
    description:
      "Capitale de l'État de Cross River, Calabar fut l'un des grands ports de la côte et le siège de l'administration britannique du protectorat de la côte du Niger. Réputée pour sa propreté, sa cuisine efik et son carnaval de décembre, elle conserve un riche patrimoine colonial. Attention : l'État de Cross River est classé par France Diplomatie en zone « déconseillée sauf raison impérative », et ses zones fluviales sont formellement déconseillées par le FCDO britannique. Destination présentée pour sa valeur patrimoniale ; elle ne figure dans aucun circuit.",
    lat: 4.9767,
    lng: 8.3383,
    cover: "/images/voyage/calabar",
    en: {
      region: "Cross River State",
      summary: "Colonial town and historic port of the south-east, famous for its December carnival. Advised against except for essential travel.",
      description:
        "Capital of Cross River State, Calabar was one of the coast's great ports and the seat of the British administration of the Niger Coast Protectorate. Known for its cleanliness, its Efik cuisine and its December carnival, it preserves a rich colonial heritage. Warning: France Diplomatie advises against all but essential travel to Cross River State, and the UK FCDO advises against all travel to its riverine areas. This destination is presented for its heritage value; it is not part of any itinerary.",
    },
    places: [
      {
        slug: "musee-national-calabar",
        cover: "/images/voyage/lieu-musee-national-calabar",
        category: "MUSEUM",
        name: "Musée national de l'Old Residency",
        summary: "Ancienne résidence coloniale préfabriquée, devenue musée de l'histoire de Calabar.",
        description:
          "Dominant le fleuve, l'Old Residency est une grande maison coloniale en bois, préfabriquée en Grande-Bretagne et montée à Calabar à la fin du XIXe siècle pour loger l'administration britannique. Devenue musée national, elle retrace l'histoire de la région : royaumes efik, commerce de l'huile de palme, traite négrière et période coloniale.",
        tips: "Zone déconseillée sauf raison impérative : consultez les conseils aux voyageurs avant tout projet.",
        visitMinutes: 75,
        lat: 4.9757,
        lng: 8.3417,
        en: {
          name: "Old Residency National Museum",
          summary: "Former prefabricated colonial residence, now a museum of Calabar's history.",
          description:
            "Overlooking the river, the Old Residency is a large wooden colonial house, prefabricated in Britain and assembled in Calabar in the late 19th century to house the British administration. Now a national museum, it traces the region's history: Efik kingdoms, the palm-oil trade, the slave trade and the colonial period.",
          tips: "Area advised against except for essential travel: check travel advice before making any plans.",
        },
      },
      {
        slug: "carnaval-de-calabar",
        cover: "/images/voyage/lieu-carnaval-de-calabar",
        category: "FESTIVAL",
        name: "Carnaval de Calabar",
        summary: "Grand carnaval de rue en décembre : défilés, costumes et musique.",
        description:
          "Chaque mois de décembre, le carnaval de Calabar transforme la ville en immense fête de rue : défilés de troupes costumées, chars, danse et concerts, au fil de festivités qui culminent fin décembre avec la grande parade des « bandes ». Il attire des visiteurs de tout le pays et de l'étranger.",
        tips: "Très grande affluence ; les sources officielles recommandent d'éviter les rassemblements. Zone déconseillée sauf raison impérative.",
        bestPeriod: "Décembre",
        visitMinutes: 240,
        en: {
          name: "Calabar Carnival",
          summary: "Big street carnival in December: parades, costumes and music.",
          description:
            "Every December, the Calabar Carnival turns the city into a huge street party: parades of costumed troupes, floats, dancing and concerts, in festivities that culminate in late December with the great parade of the “bands”. It draws visitors from all over the country and abroad.",
          tips: "Very large crowds; official sources advise avoiding gatherings. Area advised against except for essential travel.",
          bestPeriod: "December",
        },
      },
      {
        slug: "cuisine-efik-calabar",
        cover: "/images/voyage/lieu-cuisine-efik-calabar",
        category: "GASTRONOMY",
        name: "Cuisine efik",
        summary: "Soupes edikang ikong et afang, fierté culinaire de Calabar.",
        description:
          "Calabar a la réputation de servir parmi les meilleures cuisines du Nigeria. Les spécialités efik reposent sur des soupes épaisses de légumes-feuilles : l'edikang ikong, riche en légumes, et l'afang, à base de feuilles d'afang et de waterleaf, servies avec de la viande ou du poisson et une pâte de manioc ou d'igname.",
        tips: "Zone déconseillée sauf raison impérative. Ces plats se trouvent aussi dans des restaurants du sud-est à Lagos et Abuja.",
        visitMinutes: 60,
        en: {
          name: "Efik cuisine",
          summary: "Edikang ikong and afang soups, Calabar's culinary pride.",
          description:
            "Calabar is reputed to serve some of Nigeria's finest food. Efik specialities are based on thick leafy-vegetable soups: edikang ikong, packed with greens, and afang, made with afang leaves and waterleaf, served with meat or fish and a cassava or yam swallow.",
          tips: "Area advised against except for essential travel. These dishes can also be found in south-eastern restaurants in Lagos and Abuja.",
        },
      },
      {
        slug: "musee-histoire-esclavage-calabar",
        category: "MUSEUM",
        name: "Musée de l'histoire de l'esclavage",
        summary: "Musée de la traite à Marina Resort, sur le site d'un ancien entrepôt d'esclaves.",
        description:
          "Ouvert en 2011 au bord de l'eau, à Marina Resort, sur le site d'un ancien entrepôt de la traite, ce musée géré par la Commission nationale des musées et monuments raconte l'histoire d'un port d'où quelque 200 000 Africains furent vendus comme esclaves entre 1662 et 1863. Il évoque les marchés aux esclaves de l'arrière-pays, les chaînes et entraves et les parcours de victimes comme de négriers.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet.",
        visitMinutes: 60,
        lat: 4.9663,
        lng: 8.3184,
        en: {
          name: "Slave History Museum",
          summary: "Slave-trade museum at Marina Resort, on the site of a former slave warehouse.",
          description:
            "Opened in 2011 on the waterfront at Marina Resort, on the site of a former slave-trading warehouse, this museum run by the National Commission for Museums and Monuments tells the story of a port from which some 200,000 Africans were sold into slavery between 1662 and 1863. It covers the slave markets of the hinterland, chains and shackles, and the lives of victims as well as slavers.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans.",
        },
      },
    ],
  },
  {
    slug: "ile-ife",
    name: "Ile-Ife",
    region: "État d'Osun",
    summary: "Ville sacrée, berceau mythique des Yoruba et foyer des célèbres têtes d'Ife. Zone déconseillée sauf raison impérative.",
    description:
      "Selon la tradition yoruba, c'est à Ile-Ife que le monde fut créé et que régna Oduduwa, ancêtre des dynasties yoruba ; l'Ooni d'Ife y réside toujours. Entre le XIIe et le XVe siècle environ, ses artistes ont produit des têtes en terre cuite et en alliage de cuivre d'un naturalisme saisissant, dont une partie est exposée au musée national. Ville universitaire (université Obafemi Awolowo), elle célèbre chaque année le festival Olojo. Attention : l'État d'Osun est classé par France Diplomatie en zone « déconseillée sauf raison impérative ». Destination présentée pour sa valeur patrimoniale ; elle ne figure dans aucun circuit.",
    lat: 7.4833,
    lng: 4.5592,
    cover: "/images/voyage/ile-ife",
    en: {
      region: "Osun State",
      summary: "Sacred city, mythical cradle of the Yoruba and home of the famous Ife heads. Advised against except for essential travel.",
      description:
        "According to Yoruba tradition, Ile-Ife is where the world was created and where Oduduwa, ancestor of the Yoruba dynasties, reigned; the Ooni of Ife still lives here. Between roughly the 12th and 15th centuries, its artists produced strikingly naturalistic terracotta and copper-alloy heads, some of which are displayed in the national museum. A university town (Obafemi Awolowo University), it celebrates the Olojo festival every year. Warning: France Diplomatie advises against all but essential travel to Osun State. This destination is presented for its heritage value; it is not part of any itinerary.",
    },
    places: [
      {
        slug: "musee-national-ife",
        category: "MUSEUM",
        name: "Musée national d'Ife",
        summary: "Le musée des antiquités d'Ife : têtes en terre cuite et en bronze, sculptures en pierre.",
        description:
          "Ouvert en 1954 dans un bâtiment circulaire de 1948, non loin du palais de l'Ooni, le musée national d'Ife présente les trouvailles archéologiques de l'ancienne cité : têtes et figures en terre cuite, objets en alliage de cuivre, sculptures de pierre, ainsi que des objets ethnographiques. Plusieurs têtes volées au début des années 1990 ont été retrouvées en France et restituées en 1996.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet.",
        visitMinutes: 60,
        lat: 7.4827,
        lng: 4.5599,
        cover: "/images/voyage/lieu-musee-national-ife",
        en: {
          name: "Ife National Museum",
          summary: "The museum of Ife antiquities: terracotta and bronze heads, stone sculptures.",
          description:
            "Opened in 1954 in a circular building dating from 1948, close to the Ooni's palace, the Ife National Museum displays archaeological finds from the ancient city: terracotta heads and figures, copper-alloy objects and stone sculptures, as well as ethnographic items. Several heads stolen in the early 1990s were recovered in France and returned in 1996.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans.",
        },
      },
      {
        slug: "palais-ooni-ile-ife",
        category: "HISTORY",
        name: "Palais de l'Ooni d'Ife",
        summary: "La résidence de l'Ooni, l'un des plus prestigieux souverains traditionnels yoruba.",
        description:
          "L'Ooni d'Ife, considéré comme le descendant d'Oduduwa, occupe une place à part parmi les rois yoruba ; le souverain actuel, Oba Adeyeye Enitan Ogunwusi (Ojaja II), règne depuis 2015. Le palais, au centre de la ville, est le cœur des grandes cérémonies comme l'Olojo, lorsque l'Ooni apparaît coiffé de la couronne Are et se rend en procession au sanctuaire d'Oke Mogun.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Résidence royale en activité : visite sur autorisation et photos seulement si elles sont permises.",
        visitMinutes: 45,
        cover: "/images/voyage/lieu-palais-ooni-ile-ife",
        en: {
          name: "Palace of the Ooni of Ife",
          summary: "The residence of the Ooni, one of the most prestigious Yoruba traditional rulers.",
          description:
            "The Ooni of Ife, regarded as the descendant of Oduduwa, holds a special place among Yoruba kings; the current ruler, Oba Adeyeye Enitan Ogunwusi (Ojaja II), has reigned since 2015. The palace, in the city centre, is the heart of great ceremonies such as Olojo, when the Ooni appears wearing the Are crown and processes to the Oke Mogun shrine.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans. A working royal residence: visits by permission only, and photos only where allowed.",
        },
      },
      {
        slug: "opa-oranmiyan-ile-ife",
        category: "HISTORY",
        name: "Bâton d'Oranmiyan (Opa Oranmiyan)",
        summary: "Monolithe de granite de 5,5 m associé au héros fondateur Oranmiyan.",
        description:
          "Dans un bosquet sacré du quartier de Mopa, ce monolithe haut d'environ 5,5 mètres est, selon la tradition, le bâton du prince Oranmiyan, fondateur légendaire des royaumes d'Oyo et de Benin. Une tempête en a brisé le sommet en 1884 et il a été plusieurs fois redressé ; des datations au carbone 14 suggèrent qu'il est bien plus ancien que la dynastie à laquelle on l'associe.",
        tips: "Zone déconseillée sauf raison impérative par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Le site est sacré : suivez les indications des gardiens.",
        visitMinutes: 30,
        lat: 7.4761,
        lng: 4.5574,
        cover: "/images/voyage/lieu-opa-oranmiyan-ile-ife",
        en: {
          name: "Staff of Oranmiyan (Opa Oranmiyan)",
          summary: "5.5 m granite monolith linked to the founding hero Oranmiyan.",
          description:
            "In a sacred grove in the Mopa quarter, this monolith about 5.5 metres tall is, according to tradition, the staff of Prince Oranmiyan, legendary founder of the kingdoms of Oyo and Benin. A storm broke off its top in 1884 and it has been re-erected several times; radiocarbon dating suggests it is much older than the dynasty it is associated with.",
          tips: "France Diplomatie advises against all but essential travel to this area: check travel advice before making any plans. The site is sacred: follow the custodians' instructions.",
        },
      },
    ],
  },
  {
    slug: "kano",
    name: "Kano",
    region: "État de Kano",
    summary: "Vieille cité haoussa : murailles, palais de l'émir, teintureries à l'indigo et grands marchés. Zone déconseillée sauf raison impérative.",
    description:
      "Grande ville du Nord, Kano fut pendant des siècles l'un des principaux carrefours du commerce transsaharien, capitale d'un royaume haoussa puis d'un émirat. Sa vieille ville, née autour de la colline de Dala et ceinte de murailles en terre en partie conservées (inscrites avec les sites associés sur la liste indicative de l'UNESCO), garde le palais de l'émir, le marché de Kurmi et les teintureries de Kofar Mata. Attention : France Diplomatie déconseille formellement l'État de Kano et classe la ville elle-même en zone « déconseillée sauf raison impérative » ; le FCDO britannique déconseille tout voyage non essentiel dans l'État, et la route Abuja-Kaduna-Kano est jugée à haut risque. Destination présentée pour sa valeur patrimoniale ; elle ne figure dans aucun circuit.",
    lat: 12.0,
    lng: 8.5167,
    cover: "/images/voyage/kano",
    en: {
      region: "Kano State",
      summary: "Old Hausa city: walls, emir's palace, indigo dye pits and great markets. Advised against except for essential travel.",
      description:
        "A great city of the north, Kano was for centuries one of the main crossroads of trans-Saharan trade, capital of a Hausa kingdom and later of an emirate. Its old town, which grew up around Dala Hill and is enclosed by partly preserved earthen walls (on UNESCO's tentative list with associated sites), retains the emir's palace, Kurmi Market and the Kofar Mata dye pits. Warning: France Diplomatie advises against all travel to Kano State and against all but essential travel to the city itself; the UK FCDO advises against all but essential travel to the state, and the Abuja–Kaduna–Kano road is considered high-risk. This destination is presented for its heritage value; it is not part of any itinerary.",
    },
    places: [
      {
        slug: "gidan-makama-kano",
        category: "MUSEUM",
        name: "Musée Gidan Makama",
        summary: "Le musée de Kano, dans un édifice du XVe siècle aux murs de terre ornés.",
        description:
          "Construit au XVe siècle pour Muhammad Rumfa, alors titulaire du titre de Makama avant de devenir roi de Kano, ce bâtiment aux murs de terre décorés de motifs en relief est classé monument national. Il abrite le musée de Kano, dont les galeries présentent les murailles et plans de la ville, l'histoire de l'État, le XIXe siècle, l'économie, l'artisanat et la musique.",
        tips: "Ville de Kano déconseillée sauf raison impérative, dans un État formellement déconseillé par France Diplomatie : consultez les conseils aux voyageurs avant tout projet.",
        visitMinutes: 75,
        lat: 11.9888,
        lng: 8.5211,
        cover: "/images/voyage/lieu-gidan-makama-kano",
        en: {
          name: "Gidan Makama Museum",
          summary: "Kano's museum, in a 15th-century building with decorated earthen walls.",
          description:
            "Built in the 15th century for Muhammad Rumfa, then holder of the title of Makama before he became king of Kano, this building with earthen walls decorated in relief is a national monument. It houses the Kano museum, whose galleries cover the city walls and maps, the history of the state, the 19th century, the economy, crafts and music.",
          tips: "France Diplomatie advises against all but essential travel to Kano city, in a state where it advises against all travel: check travel advice before making any plans.",
        },
      },
      {
        slug: "palais-emir-kano",
        category: "HISTORY",
        name: "Palais de l'émir (Gidan Rumfa)",
        summary: "Palais de la fin du XVe siècle, toujours résidence de l'autorité traditionnelle de Kano.",
        description:
          "Édifié à la fin du XVe siècle par Muhammad Rumfa, le Gidan Rumfa est depuis lors la résidence de l'autorité traditionnelle de Kano, y compris après la prise du pouvoir par les jihadistes peuls au début du XIXe siècle. Ses quelque 13 hectares entourés de hauts murs réunissent cours, jardins, mosquée et bâtiments ornés, avec la porte sud, Kofar Kudu, pour entrée monumentale. C'est de là que partent et que reviennent les cavaliers du durbar de Sallah.",
        tips: "Ville de Kano déconseillée sauf raison impérative, dans un État formellement déconseillé par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Résidence en activité : on la découvre surtout de l'extérieur. La succession de l'émirat fait l'objet d'un différend devant les tribunaux : évitez tout attroupement.",
        visitMinutes: 45,
        lat: 11.9901,
        lng: 8.5207,
        cover: "/images/voyage/lieu-palais-emir-kano",
        en: {
          name: "Emir's Palace (Gidan Rumfa)",
          summary: "Late 15th-century palace, still the residence of Kano's traditional authority.",
          description:
            "Built in the late 15th century by Muhammad Rumfa, Gidan Rumfa has been the residence of Kano's traditional authority ever since, including after the Fulani jihadists took power in the early 19th century. Its roughly 13 hectares, enclosed by high walls, take in courtyards, gardens, a mosque and decorated buildings, with the southern gate, Kofar Kudu, as its monumental entrance. The horsemen of the Sallah durbar ride out from and back to it.",
          tips: "France Diplomatie advises against all but essential travel to Kano city, in a state where it advises against all travel: check travel advice before making any plans. A working residence, mostly seen from outside. The succession to the emirate is disputed in the courts: avoid any crowds.",
        },
      },
      {
        slug: "marche-kurmi-kano",
        category: "MARKET",
        name: "Marché de Kurmi",
        summary: "Grand marché fondé au XVe siècle par le roi Muhammad Rumfa.",
        description:
          "Créé au XVe siècle par le roi Muhammad Rumfa dans le quartier de Jakara pour accueillir le commerce régional et transsaharien, le marché de Kurmi a fait la richesse de Kano. Ses allées, organisées par spécialités, proposent tissus, calebasses, cuir, herbes médicinales, encens et objets artisanaux.",
        tips: "Ville de Kano déconseillée sauf raison impérative, dans un État formellement déconseillé par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Sur place, allez-y accompagné, de jour, et gardez vos affaires près de vous.",
        visitMinutes: 90,
        cover: "/images/voyage/lieu-marche-kurmi-kano",
        en: {
          name: "Kurmi Market",
          summary: "Great market founded in the 15th century by King Muhammad Rumfa.",
          description:
            "Established in the 15th century by King Muhammad Rumfa in the Jakara quarter to serve regional and trans-Saharan trade, Kurmi Market built Kano's wealth. Its lanes, organised by speciality, offer fabrics, calabashes, leather, medicinal herbs, incense and crafts.",
          tips: "France Diplomatie advises against all but essential travel to Kano city, in a state where it advises against all travel: check travel advice before making any plans. On site, go accompanied, by day, and keep your belongings close.",
        },
      },
      {
        slug: "teintureries-kofar-mata-kano",
        category: "CULTURE",
        name: "Teintureries de Kofar Mata",
        summary: "Fosses de teinture à l'indigo en activité depuis plus de cinq siècles, près d'une porte des remparts.",
        description:
          "Près de la porte Kofar Mata des anciennes murailles, des dizaines de fosses creusées dans le sol servent depuis plus de cinq siècles, selon la tradition depuis 1498, à teindre les étoffes à l'indigo naturel. C'est l'un des plus anciens centres de teinture encore actifs en Afrique de l'Ouest : les teinturiers y plongent les tissus, puis les battent pour leur donner leur lustre, et l'on peut acheter des pièces sur place.",
        tips: "Ville de Kano déconseillée sauf raison impérative, dans un État formellement déconseillé par France Diplomatie : consultez les conseils aux voyageurs avant tout projet. Demandez avant de photographier les teinturiers.",
        visitMinutes: 45,
        lat: 12.0008,
        lng: 8.5264,
        cover: "/images/voyage/lieu-teintureries-kofar-mata-kano",
        en: {
          name: "Kofar Mata Dye Pits",
          summary: "Indigo dye pits in use for over five centuries, near a gate in the city walls.",
          description:
            "Near the Kofar Mata gate of the old city walls, dozens of pits dug into the ground have been used for more than five centuries, since 1498 according to tradition, to dye cloth with natural indigo. It is one of the oldest dyeing centres still active in West Africa: the dyers steep the fabrics, then beat them to give them their sheen, and pieces can be bought on site.",
          tips: "France Diplomatie advises against all but essential travel to Kano city, in a state where it advises against all travel: check travel advice before making any plans. Ask before photographing the dyers.",
        },
      },
    ],
  },
];

export const NIGERIA_CIRCUITS: SeedCircuit[] = [
  {
    slug: "nigeria-lagos-sud-ouest-6-jours",
    title: "Lagos et le sud-ouest yoruba en 6 jours",
    summary:
      "Une semaine courte limitée aux zones de vigilance renforcée : musées et art de Lagos, mémoire de la traite à Badagry, rocher Olumo et adire d'Abeokuta, puis Ibadan. Trajets de jour uniquement, avec un chauffeur de confiance.",
    days: 6,
    cover: "/images/voyage/lagos",
    en: {
      title: "Lagos and the Yoruba south-west in 6 days",
      summary:
        "A short week limited to “heightened vigilance” areas: Lagos's museums and art, the memory of the slave trade in Badagry, Olumo Rock and the adire of Abeokuta, then Ibadan. Daytime travel only, with a trusted driver.",
    },
    steps: [
      { day: 1, place: "musee-national-lagos", note: "Arrivée, accueil à l'aéroport par une personne connue, puis découverte de Lagos Island.", noteEn: "Arrival, met at the airport by someone you know, then a first look at Lagos Island." },
      { day: 1, place: "freedom-park-lagos" },
      { day: 2, place: "lekki-conservation-centre", note: "Journée à Lekki : nature le matin, art l'après-midi.", noteEn: "A day in Lekki: nature in the morning, art in the afternoon." },
      { day: 2, place: "nike-art-gallery-lagos" },
      { day: 3, place: "musee-heritage-badagry", note: "Excursion à la journée à Badagry, retour à Lagos avant la nuit.", noteEn: "Day trip to Badagry, back in Lagos before dark." },
      { day: 3, place: "premier-immeuble-a-etage-badagry" },
      { day: 3, place: "point-of-no-return-badagry" },
      { day: 4, place: "rocher-olumo", note: "Aller-retour à Abeokuta par l'autoroute, de jour.", noteEn: "Return trip to Abeokuta on the motorway, by day." },
      { day: 4, place: "marche-itoku-abeokuta" },
      { day: 5, place: "cocoa-house-ibadan", note: "Route vers Ibadan par l'autoroute Lagos-Ibadan ; nuit à Ibadan.", noteEn: "Drive to Ibadan on the Lagos–Ibadan motorway; night in Ibadan." },
      { day: 5, place: "tour-bower-ibadan" },
      { day: 6, place: "jardins-agodi-ibadan" },
      { day: 6, place: "amala-ibadan", note: "Déjeuner d'amala avant de reprendre la route.", noteEn: "Amala lunch before hitting the road." },
      { day: 6, destination: "lagos", note: "Retour à Lagos avant la tombée de la nuit.", noteEn: "Back to Lagos before nightfall." },
    ],
  },
];
