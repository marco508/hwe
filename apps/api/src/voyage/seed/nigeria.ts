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
    en: {
      region: "Ogun State",
      summary: "City of Olumo Rock, cradle of the Egba people and capital of adire cloth.",
      description:
        "Capital of Ogun State, about a hundred kilometres north of Lagos, Abeokuta (“under the rock” in Yoruba) grew up in the 19th century around Olumo Rock, which served as a refuge for the Egba during the wars. The city is also known for adire, cloth dyed with indigo using resist techniques. The city of Abeokuta and the motorway linking it to Lagos are rated “heightened vigilance” areas; the surrounding countryside is advised against except for essential travel.",
    },
    places: [
      {
        slug: "rocher-olumo",
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
    en: {
      region: "Oyo State",
      summary: "Vast Yoruba city of tin-roofed hills, a university town and the capital of amala.",
      description:
        "Capital of Oyo State, Ibadan sprawls over hills as far as the eye can see. Former capital of the Western Region, it is home to the country's oldest university, Cocoa House, the country's first skyscraper, built with cocoa revenues, and viewpoints such as Bower's Tower. It is also a great city for Yoruba food. The city of Ibadan and the Lagos–Ibadan motorway are rated “heightened vigilance” areas; the rest of Oyo State is advised against, and its north-west entirely.",
    },
    places: [
      {
        slug: "cocoa-house-ibadan",
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
    en: {
      region: "Edo State",
      summary: "Capital of the old Kingdom of Benin and its famous bronzes. Advised against except for essential travel.",
      description:
        "Capital of Edo State, Benin City was the centre of the Kingdom of Benin, whose kings (Oba) ruled from a famous palace and whose artists produced the renowned bronzes and ivories, looted in 1897 during a British expedition. The city, where the Oba still resides, remains the living home of this art. Warning: France Diplomatie advises against all but essential travel to Edo State. This destination is presented for its heritage value; it is not part of any itinerary.",
    },
    places: [
      {
        slug: "musee-national-benin-city",
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
        category: "FESTIVAL",
        name: "Carnaval de Calabar",
        summary: "Grand carnaval de rue en décembre : défilés, costumes et musique.",
        description:
          "Chaque mois de décembre, le carnaval de Calabar transforme la ville en immense fête de rue : défilés de troupes costumées, chars, danse et concerts, dans le cadre d'un festival qui dure tout le mois. Il attire des visiteurs de tout le pays et de l'étranger.",
        tips: "Très grande affluence ; les sources officielles recommandent d'éviter les rassemblements. Zone déconseillée sauf raison impérative.",
        bestPeriod: "Décembre",
        visitMinutes: 240,
        en: {
          name: "Calabar Carnival",
          summary: "Big street carnival in December: parades, costumes and music.",
          description:
            "Every December, the Calabar Carnival turns the city into a huge street party: parades of costumed troupes, floats, dancing and concerts, as part of a festival lasting the whole month. It draws visitors from all over the country and abroad.",
          tips: "Very large crowds; official sources advise avoiding gatherings. Area advised against except for essential travel.",
          bestPeriod: "December",
        },
      },
      {
        slug: "cuisine-efik-calabar",
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
