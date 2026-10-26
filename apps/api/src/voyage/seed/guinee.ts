/**
 * Contenu de départ du guide Guinée (fr + en). Rédigé à partir de
 * connaissances générales et des conseils aux voyageurs officiels consultés en
 * octobre 2026 (France Diplomatie, UK FCDO) : `reviewed = false` partout →
 * affiché « à relire » dans l'admin tant qu'une personne ne l'a pas vérifié.
 * Volontairement sans horaires ni tarifs (qui changent) : ces champs restent à
 * compléter.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const GUINEE_GUIDE: SeedGuide = {
  country: "GN",
  intro:
    "Château d'eau de l'Afrique de l'Ouest, où naissent le Niger, le Sénégal et la Gambie, la Guinée se découvre loin du tourisme de masse : la capitale Conakry face aux îles de Loos, les cascades de la région de Kindia, puis les plateaux frais du Fouta-Djallon, leurs chutes vertigineuses et la culture peule de Labé, jusqu'aux forêts du mont Nimba à l'extrême sud-est. Un pays exigeant, aux routes lentes, qui récompense les voyageurs curieux.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; il se demande en ligne (e-visa) sur le portail officiel des autorités guinéennes, quelques jours au moins avant le départ, et le récépissé est présenté à l'arrivée. Les ressortissants de la CEDEAO en sont dispensés. Les conditions évoluent : vérifiez-les toujours auprès des sources officielles avant de partir (passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement, certificat de vaccination).",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est demandé (il fait notamment partie des pièces du dossier d'e-visa) : faites-vous vacciner avant le départ. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Le pays a connu des épidémies de fièvre hémorragique (Ebola) : consultez les informations sanitaires à jour. Buvez de l'eau en bouteille ; les structures de soins sont limitées hors de Conakry, une assurance couvrant le rapatriement est indispensable.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc guinéen (GNF), non convertible : on ne peut s'en procurer qu'une fois sur place et la sortie de devises comme de francs guinéens est plafonnée. Emportez des euros ou des dollars en espèces et changez-les dans les banques ou les bureaux de change agréés : le change dans la rue est illégal. Les espèces sont indispensables partout ; les distributeurs se trouvent surtout à Conakry et dans les grandes villes, et les cartes bancaires ne sont acceptées que dans quelques grands hôtels. Le paiement mobile (mobile money) est très répandu.",
    },
    {
      title: "Quand partir",
      body: "La saison sèche, de novembre à avril environ, est la meilleure période ; l'harmattan (vent sec et poussiéreux) souffle surtout de décembre à février. La saison des pluies, d'environ mai-juin à octobre, est très marquée sur la côte : Conakry compte parmi les capitales les plus arrosées du monde, avec des pluies torrentielles en juillet et août, et de nombreuses pistes deviennent alors impraticables. En altitude, le Fouta-Djallon reste plus frais ; ses chutes sont les plus belles en fin de saison des pluies.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue officielle ; au quotidien on parle notamment le soussou sur la côte, le pular (peul) au Fouta-Djallon, le malinké en Haute-Guinée et le kpèlè, le kissi ou le toma en Guinée forestière. La population est majoritairement musulmane : tenue couvrante dans les villages et les lieux de culte, discrétion pendant le ramadan. Saluer longuement avant toute demande est essentiel. Ne photographiez jamais les sites militaires, administratifs ou stratégiques (aéroport, ponts, port) et demandez avant de photographier une personne.",
    },
    {
      title: "Se déplacer",
      body: "Les routes sont souvent en mauvais état et les trajets très longs, surtout en saison des pluies où un 4x4 devient indispensable. Les autorités françaises et britanniques déconseillent les taxis-motos et les transports collectifs, souvent surchargés et mal entretenus : privilégiez une voiture avec chauffeur connaissant la région. Ne roulez que de jour et prévoyez du carburant pour les longues étapes. À Conakry, la circulation est très dense ; si vous arrivez de nuit, organisez votre transfert depuis l'aéroport à l'avance.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C, F et K (les prises européennes conviennent en général). Les coupures de courant sont fréquentes : les hôtels s'équipent de groupes électrogènes, emportez une batterie externe et une lampe. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money ; la couverture est bonne dans les villes, plus irrégulière en brousse.",
    },
    {
      title: "Sécurité",
      body: "À la date de rédaction, les autorités françaises classent l'essentiel du pays en « vigilance renforcée » et déconseillent, sauf raison impérative, les zones frontalières avec le Mali et la Côte d'Ivoire (dont Siguiri, Mandiana et la réserve naturelle de Kankan) ; le Royaume-Uni signale des tensions dans les zones frontalières. Les manifestations, souvent liées à la situation politique ou aux coupures d'électricité, peuvent dégénérer : tenez-vous à l'écart des rassemblements. La criminalité (vols, agressions, braquages de véhicules la nuit) est réelle à Conakry et sur certains axes routiers : évitez de circuler de nuit et de marcher seul dans les lieux isolés, et ne changez de l'argent qu'aux guichets agréés. Avant et pendant le voyage, consultez les « Conseils aux voyageurs » de France Diplomatie (et inscrivez-vous sur Ariane) ou le « Foreign travel advice » du FCDO britannique, qui font foi.",
    },
  ],
  en: {
    intro:
      "The water tower of West Africa, where the Niger, Senegal and Gambia rivers rise, Guinea is far from mass tourism: the capital Conakry facing the Loos Islands, the waterfalls around Kindia, then the cool plateaus of the Fouta Djallon with their dizzying falls and the Fula culture of Labé, all the way to the forests of Mount Nimba in the far south-east. A demanding country with slow roads that rewards curious travellers.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa, applied for online (e-visa) on the Guinean authorities' official portal at least a few days before departure; the receipt is shown on arrival. ECOWAS nationals are exempt. Requirements change: always check them with official sources before leaving (passport valid for several months after your return, return ticket, accommodation address, vaccination certificate).",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required (it is part of the e-visa application, among other things): get vaccinated before you go. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). The country has experienced outbreaks of haemorrhagic fever (Ebola): check up-to-date health information. Drink bottled water; healthcare is limited outside Conakry, so insurance covering repatriation is essential.",
      },
      {
        title: "Money and payments",
        body: "The currency is the Guinean franc (GNF), which is not convertible: you can only obtain it once there, and the amount of foreign currency or Guinean francs you can take out is capped. Bring euros or dollars in cash and change them at banks or licensed bureaux de change: changing money on the street is illegal. Cash is essential everywhere; ATMs are mainly found in Conakry and the larger towns, and bank cards are only accepted in a few big hotels. Mobile money is widely used.",
      },
      {
        title: "When to go",
        body: "The dry season, roughly November to April, is the best time to visit; the harmattan (a dry, dusty wind) blows mainly from December to February. The rainy season, from about May–June to October, is very pronounced on the coast: Conakry is one of the wettest capitals in the world, with torrential rain in July and August, when many tracks become impassable. At altitude the Fouta Djallon stays cooler; its waterfalls are at their best at the end of the rainy season.",
      },
      {
        title: "Languages and customs",
        body: "French is the official language; day to day people speak Susu on the coast, Pular (Fula) in the Fouta Djallon, Malinke in Upper Guinea and Kpelle, Kissi or Toma in the Forest Region, among others. Most of the population is Muslim: dress modestly in villages and places of worship, and be discreet during Ramadan. Taking time to greet people before asking anything is essential. Never photograph military, government or strategic sites (airport, bridges, port) and ask before photographing anyone.",
      },
      {
        title: "Getting around",
        body: "Roads are often in poor condition and journeys very long, especially in the rainy season when a 4x4 becomes essential. French and British authorities advise against motorbike taxis and shared transport, which are often overloaded and poorly maintained: opt for a car with a driver who knows the region. Only drive in daylight and carry fuel for long stretches. Traffic in Conakry is very heavy; if you arrive at night, arrange your airport transfer in advance.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C, F and K plugs (European plugs usually fit). Power cuts are frequent: hotels have generators, so bring a power bank and a torch. A local SIM card (ID required) gives access to mobile internet and mobile money; coverage is good in towns and patchier in the countryside.",
      },
      {
        title: "Safety",
        body: "At the time of writing, the French authorities place most of the country under “heightened vigilance” and advise against all but essential travel to the border areas with Mali and Côte d'Ivoire (including Siguiri, Mandiana and the Kankan nature reserve); the UK notes tensions in border areas. Demonstrations, often linked to the political situation or power cuts, can turn violent: stay away from gatherings. Crime (theft, muggings, vehicle hold-ups at night) is a real risk in Conakry and on some roads: avoid travelling after dark and walking alone in isolated places, and only change money at licensed counters. Before and during your trip, check France Diplomatie's “Conseils aux voyageurs” or the UK FCDO's “Foreign travel advice”, which are authoritative.",
      },
    ],
  },
};

export const GUINEE_DESTINATIONS: SeedDestination[] = [
  {
    slug: "conakry",
    name: "Conakry",
    region: "Conakry",
    summary: "Capitale bouillonnante étirée sur une presqu'île, entre marchés, musée national et grande mosquée.",
    description:
      "Construite sur la presqu'île de Kaloum et l'île de Tombo, puis étendue loin vers l'intérieur des terres, Conakry concentre près d'un habitant du pays sur six. C'est le point d'arrivée de presque tous les voyageurs : on y découvre la vie trépidante des marchés, le musée national, l'imposante Grande Mosquée Fayçal et le jardin botanique de Camayenne, avant de filer vers les îles de Loos ou l'intérieur du pays. La circulation y est très dense : prévoyez large.",
    lat: 9.5092,
    lng: -13.7122,
    cover: "/images/voyage/conakry",
    en: {
      region: "Conakry",
      summary: "A bustling capital stretched along a peninsula, with markets, the national museum and the great mosque.",
      description:
        "Built on the Kaloum peninsula and Tombo island, then spreading far inland, Conakry is home to around one in six of the country's inhabitants. It is where almost all travellers arrive: you can soak up the frantic life of its markets, visit the national museum, the imposing Grand Mosque Faisal and the Camayenne botanical garden, before heading off to the Loos Islands or inland. Traffic is very heavy: allow plenty of time.",
    },
    places: [
      {
        slug: "musee-national-guinee",
        category: "MUSEUM",
        name: "Musée national de Guinée (Sandervalia)",
        summary: "Masques, statues et instruments des peuples de Guinée, dans le quartier de Sandervalia.",
        description:
          "Installé dans le quartier de Sandervalia, à Kaloum, le Musée national présente les cultures des quatre grandes régions du pays : masques et statues de la côte (dont les célèbres figures Nimba des Baga), objets du Fouta-Djallon, de Haute-Guinée et de Guinée forestière, instruments de musique et objets du quotidien. Une introduction utile avant de partir à l'intérieur du pays.",
        tips: "Renseignez-vous sur place sur les salles ouvertes ; une visite guidée aide à comprendre les collections.",
        visitMinutes: 75,
        lat: 9.5047,
        lng: -13.709,
        cover: "/images/voyage/lieu-musee-national-guinee",
        en: {
          name: "National Museum of Guinea (Sandervalia)",
          summary: "Masks, statues and instruments of Guinea's peoples, in the Sandervalia district.",
          description:
            "Located in the Sandervalia district of Kaloum, the National Museum presents the cultures of the country's four main regions: masks and statues from the coast (including the famous Nimba figures of the Baga), objects from the Fouta Djallon, Upper Guinea and the Forest Region, musical instruments and everyday items. A useful introduction before travelling inland.",
          tips: "Ask on site which rooms are open; a guided tour helps make sense of the collections.",
        },
      },
      {
        slug: "grande-mosquee-faycal-conakry",
        category: "RELIGION",
        name: "Grande Mosquée Fayçal",
        summary: "L'une des plus grandes mosquées d'Afrique de l'Ouest, inaugurée au début des années 1980.",
        description:
          "Financée avec l'appui de l'Arabie saoudite et inaugurée au début des années 1980, la Grande Mosquée Fayçal domine le quartier de Camayenne avec ses minarets. Elle peut accueillir des milliers de fidèles. À proximité, le mausolée de Camayenne abrite les tombes de plusieurs grandes figures de l'histoire guinéenne.",
        tips: "Tenue couvrante (épaules et jambes, foulard pour les femmes) ; pas de visite pendant les prières, demandez l'autorisation pour entrer.",
        visitMinutes: 45,
        lat: 9.5332,
        lng: -13.6841,
        cover: "/images/voyage/lieu-grande-mosquee-faycal-conakry",
        en: {
          name: "Grand Mosque Faisal",
          summary: "One of the largest mosques in West Africa, inaugurated in the early 1980s.",
          description:
            "Funded with support from Saudi Arabia and inaugurated in the early 1980s, the Grand Mosque Faisal and its minarets dominate the Camayenne district. It can hold thousands of worshippers. Nearby, the Camayenne mausoleum holds the tombs of several major figures in Guinean history.",
          tips: "Wear covering clothes (shoulders and legs, headscarf for women); do not visit during prayers and ask permission before entering.",
        },
      },
      {
        slug: "marche-madina-conakry",
        category: "MARKET",
        name: "Marché de Madina",
        summary: "Le plus grand marché de la capitale : tissus, épices, fruits, artisanat et tout le reste.",
        description:
          "Immense et labyrinthique, le marché de Madina est le cœur commercial de Conakry. On y trouve des pagnes et des bazins teints, des épices, des fruits du pays, de la vaisselle, des produits venus de toute la sous-région et quelques étals d'artisanat. Une immersion intense dans l'économie du quotidien.",
        tips: "Venez le matin, avec peu d'objets de valeur, et de préférence accompagné d'une personne qui connaît le marché ; les pickpockets y sont actifs. Demandez avant de photographier.",
        visitMinutes: 120,
        lat: 9.5422,
        lng: -13.6672,
        cover: "/images/voyage/lieu-marche-madina-conakry",
        en: {
          name: "Madina Market",
          summary: "The capital's largest market: fabrics, spices, fruit, crafts and everything else.",
          description:
            "Huge and labyrinthine, Madina market is the commercial heart of Conakry. You will find wax prints and dyed bazin cloth, spices, local fruit, kitchenware, goods from across the region and a few craft stalls. An intense immersion in everyday economic life.",
          tips: "Come in the morning with few valuables, ideally with someone who knows the market; pickpockets are active. Ask before taking photos.",
        },
      },
      {
        slug: "jardin-botanique-camayenne",
        category: "NATURE",
        name: "Jardin botanique de Camayenne",
        summary: "Parc ombragé hérité de l'époque coloniale, aux arbres centenaires.",
        description:
          "Créé à l'époque coloniale comme jardin d'essai, le jardin botanique de Camayenne conserve de très grands arbres tropicaux et des allées ombragées en pleine ville. Une pause au calme, loin du bruit de la circulation, idéale en fin de journée.",
        visitMinutes: 60,
        lat: 9.5307,
        lng: -13.6859,
        en: {
          name: "Camayenne Botanical Garden",
          summary: "A shady park dating from colonial times, with century-old trees.",
          description:
            "Created in colonial times as an experimental garden, the Camayenne botanical garden preserves very large tropical trees and shady paths in the middle of the city. A quiet break away from the traffic, ideal in the late afternoon.",
        },
      },
      {
        slug: "monument-22-novembre-conakry",
        category: "HISTORY",
        name: "Monument du 22 Novembre 1970",
        summary: "Monument commémorant l'échec du débarquement portugais de novembre 1970 à Conakry.",
        description:
          "Ce monument rappelle l'opération « Mer Verte » : dans la nuit du 21 au 22 novembre 1970, des troupes portugaises venues de la Guinée portugaise voisine (actuelle Guinée-Bissau), appuyées par des opposants guinéens, débarquèrent à Conakry pour tenter de renverser le régime d'Ahmed Sékou Touré et libérer des prisonniers. L'attaque échoua, mais elle fut suivie d'une vague de répression et d'arrestations. Dressé sur un carrefour du centre de Conakry, le monument, dont la première pierre fut posée en 1971, porte un groupe sculpté de combattants, homme, femme et enfant.",
        tips: "Le monument se trouve au milieu d'un carrefour très fréquenté : photographiez-le depuis le trottoir et restez attentif à la circulation. Évitez de photographier les bâtiments militaires et officiels alentour.",
        visitMinutes: 20,
        lat: 9.5215,
        lng: -13.6905,
        cover: "/images/voyage/lieu-monument-22-novembre-conakry",
        en: {
          name: "22 November 1970 Monument",
          summary: "A monument commemorating the failed Portuguese landing in Conakry in November 1970.",
          description:
            "This monument recalls Operation Green Sea: on the night of 21–22 November 1970, Portuguese troops from neighbouring Portuguese Guinea (now Guinea-Bissau), backed by Guinean opponents, landed in Conakry in an attempt to overthrow Ahmed Sékou Touré's regime and free prisoners. The attack failed, but it was followed by a wave of repression and arrests. Standing at a junction in central Conakry, the monument, whose foundation stone was laid in 1971, bears a sculpted group of fighters: a man, a woman and a child.",
          tips: "The monument stands in the middle of a very busy junction: photograph it from the pavement and watch the traffic. Avoid photographing the military and government buildings nearby.",
        },
      },
      {
        slug: "cathedrale-sainte-marie-conakry",
        category: "RELIGION",
        name: "Cathédrale Sainte-Marie",
        summary: "La cathédrale catholique de Kaloum, siège de l'archidiocèse de Conakry, à la façade ocre et blanche.",
        description:
          "Siège de l'archidiocèse de Conakry, la cathédrale Sainte-Marie se dresse dans le quartier de Kaloum, au cœur de la presqu'île. Sa construction a commencé à la fin des années 1920 (première pierre bénie en 1928) et l'essentiel de l'édifice date des années 1930. Sa façade ocre ornée d'une grande rosace géométrique en fait l'un des bâtiments marquants du centre-ville. C'est un lieu de culte actif, très fréquenté à Pâques et à Noël.",
        tips: "Tenue correcte ; visitez en dehors des offices ou assistez discrètement à une messe, et demandez avant de photographier l'intérieur.",
        visitMinutes: 30,
        lat: 9.5102,
        lng: -13.7149,
        cover: "/images/voyage/lieu-cathedrale-sainte-marie-conakry",
        en: {
          name: "Saint Mary's Cathedral",
          summary: "Kaloum's Catholic cathedral, seat of the Archdiocese of Conakry, with an ochre and white façade.",
          description:
            "The seat of the Archdiocese of Conakry, Saint Mary's Cathedral stands in the Kaloum district, at the heart of the peninsula. Construction began in the late 1920s (the foundation stone was blessed in 1928) and most of the building dates from the 1930s. Its ochre façade with a large geometric rose window makes it one of the landmarks of the city centre. It is an active place of worship, very busy at Easter and Christmas.",
          tips: "Dress respectfully; visit outside services or attend a mass discreetly, and ask before photographing the interior.",
        },
      },
      {
        slug: "soirees-ratoma-conakry",
        category: "LEISURE",
        name: "Soirées de Ratoma (Kipé, Taouyah)",
        summary: "Restaurants, terrasses et clubs des quartiers de Kipé et Taouyah, cœur de la vie nocturne de Conakry.",
        description:
          "Loin du centre administratif de Kaloum, la commune de Ratoma concentre l'essentiel de la vie nocturne de Conakry. À Kipé et Taouyah, restaurants, terrasses, maquis et clubs accueillent le soir une clientèle locale et expatriée, souvent au son de la musique guinéenne, de l'afrobeat ou du coupé-décalé. L'animation culmine le week-end et pendant les fêtes de fin d'année. Les adresses changent vite : demandez conseil à votre hébergement.",
        tips: "France Diplomatie recommande d'éviter le soir les lieux sombres et peu fréquentés et déconseille de résider à l'est de Kipé et Taouyah sans solides précautions : déplacez-vous en voiture avec un chauffeur de confiance, gardez peu d'objets de valeur et ne rentrez pas à pied.",
        bestPeriod: "Week-ends et fin décembre",
        visitMinutes: 180,
        en: {
          name: "Evenings in Ratoma (Kipé, Taouyah)",
          summary: "Restaurants, terraces and clubs in the Kipé and Taouyah districts, the heart of Conakry's nightlife.",
          description:
            "Away from the administrative centre of Kaloum, the Ratoma district is home to most of Conakry's nightlife. In Kipé and Taouyah, restaurants, terraces, maquis (informal eateries) and clubs welcome local and expatriate crowds in the evening, often to the sound of Guinean music, Afrobeats or coupé-décalé. Things peak at weekends and during the year-end festivities. Venues change quickly: ask where you are staying for advice.",
          tips: "France Diplomatie advises avoiding dark, deserted places at night and recommends against living east of Kipé and Taouyah without solid precautions: get around by car with a trusted driver, carry few valuables and do not walk home.",
          bestPeriod: "Weekends and late December",
        },
      },
    ],
  },
  {
    slug: "iles-de-loos",
    name: "Îles de Loos",
    region: "Conakry",
    summary: "Petit archipel au large de Conakry : plages de sable, cocotiers et villages de pêcheurs.",
    description:
      "À quelques kilomètres au large de Conakry, l'archipel des îles de Loos compte trois îles principales, Kassa, Tamara (Fotoba) et Roume, et plusieurs îlots. On y vient le temps d'une journée ou d'un week-end pour leurs plages, leurs cocoteraies et leurs villages de pêcheurs, loin de l'agitation de la capitale. Les traversées se font en bateau au départ de Conakry.",
    lat: 9.4833,
    lng: -13.8,
    cover: "/images/voyage/iles-de-loos",
    en: {
      name: "Loos Islands",
      region: "Conakry",
      summary: "A small archipelago off Conakry: sandy beaches, palm trees and fishing villages.",
      description:
        "A few kilometres off Conakry, the Loos Islands archipelago has three main islands, Kassa, Tamara (Fotoba) and Roume, plus several islets. People come for a day or a weekend to enjoy their beaches, coconut groves and fishing villages, far from the bustle of the capital. Boat crossings leave from Conakry.",
    },
    places: [
      {
        slug: "ile-de-roume",
        category: "BEACH",
        name: "Île de Roume",
        summary: "Île boisée aux criques de sable, qu'une tradition locale associe à « L'Île au trésor ».",
        description:
          "Roume est la plus petite des trois grandes îles de Loos, boisée et bordée de criques de sable fin. Une légende locale veut qu'elle ait inspiré « L'Île au trésor » de Stevenson. On y passe la journée entre baignade dans les criques abritées, poisson grillé et promenade dans la végétation.",
        tips: "Choisissez un bateau sérieux, équipé de gilets de sauvetage, et évitez les traversées par mer agitée ou en saison des pluies. Emportez de l'eau et de l'argent liquide.",
        bestPeriod: "Novembre à avril (saison sèche, mer plus calme)",
        visitMinutes: 360,
        lat: 9.4635,
        lng: -13.7932,
        cover: "/images/voyage/lieu-ile-de-roume",
        en: {
          name: "Roume Island",
          summary: "A wooded island with sandy coves, linked by local tradition to “Treasure Island”.",
          description:
            "Roume is the smallest of the three main Loos Islands, wooded and fringed with fine sandy coves. A local legend has it that it inspired Stevenson's “Treasure Island”. Spend the day swimming in the sheltered coves, eating grilled fish and wandering through the greenery.",
          tips: "Choose a reliable boat with life jackets and avoid crossing in rough seas or during the rainy season. Bring water and cash.",
          bestPeriod: "November to April (dry season, calmer sea)",
        },
      },
      {
        slug: "ile-de-kassa",
        category: "BEACH",
        name: "Île de Kassa",
        summary: "La plus proche de Conakry : plages, villages de pêcheurs et petits hôtels.",
        description:
          "Face à la capitale, Kassa est l'île la plus accessible de l'archipel. Ses plages, ses villages de pêcheurs et ses quelques hébergements en font une escapade appréciée des habitants de Conakry le week-end. L'île a autrefois été exploitée pour la bauxite, dont on devine encore les traces.",
        tips: "Mêmes précautions pour la traversée ; renseignez-vous sur l'état de la mer avant de vous baigner.",
        visitMinutes: 300,
        lat: 9.4744,
        lng: -13.7554,
        cover: "/images/voyage/lieu-ile-de-kassa",
        en: {
          name: "Kassa Island",
          summary: "The closest island to Conakry: beaches, fishing villages and small hotels.",
          description:
            "Facing the capital, Kassa is the most accessible island in the archipelago. Its beaches, fishing villages and handful of places to stay make it a favourite weekend getaway for Conakry residents. The island was once mined for bauxite, traces of which can still be seen.",
          tips: "Take the same precautions for the crossing; check sea conditions before swimming.",
        },
      },
      {
        slug: "ile-de-tamara-fotoba",
        category: "HISTORY",
        name: "Île de Tamara (Fotoba)",
        summary: "La plus occidentale des îles de Loos, avec le village de Fotoba, les vestiges d'un bagne colonial et un phare.",
        description:
          "Longue d'une dizaine de kilomètres, Tamara est la plus occidentale des îles de Loos. Son village principal, Fotoba, a abrité à partir de 1905 un pénitencier colonial qui servit, de 1918 à l'indépendance, de camp pénal pour toute l'Afrique-Occidentale française ; des bâtiments de cellules en subsistent. À l'extrémité sud de l'île, un phare en service depuis 1906 guide toujours les navires vers Conakry. Une escapade plus confidentielle que Roume ou Kassa, entre mémoire coloniale, village de pêcheurs et petites plages.",
        tips: "La traversée est plus longue que vers Kassa : partez tôt avec un bateau équipé de gilets, par mer calme. Les vestiges du bagne ne sont pas aménagés : faites-vous accompagner par une personne du village et demandez l'accord des habitants avant de photographier.",
        bestPeriod: "Novembre à avril (saison sèche, mer plus calme)",
        visitMinutes: 360,
        lat: 9.5086,
        lng: -13.7993,
        cover: "/images/voyage/lieu-ile-de-tamara-fotoba",
        en: {
          name: "Tamara Island (Fotoba)",
          summary: "The westernmost of the Loos Islands, with Fotoba village, the remains of a colonial penal colony and a lighthouse.",
          description:
            "Some ten kilometres long, Tamara is the westernmost of the Loos Islands. Its main village, Fotoba, housed a colonial penitentiary from 1905 which, from 1918 until independence, served as the penal camp for the whole of French West Africa; cell blocks still stand. At the southern tip of the island, a lighthouse in service since 1906 still guides ships towards Conakry. A quieter getaway than Roume or Kassa, combining colonial history, a fishing village and small beaches.",
          tips: "The crossing is longer than to Kassa: leave early on a boat with life jackets, in calm seas. The prison remains are not set up for visitors: go with someone from the village and ask residents before taking photos.",
          bestPeriod: "November to April (dry season, calmer sea)",
        },
      },
    ],
  },
  {
    slug: "dubreka",
    name: "Dubréka",
    region: "Kindia",
    summary: "Cascades et reliefs verdoyants à une cinquantaine de kilomètres de Conakry.",
    description:
      "Au nord-est de la capitale, la préfecture de Dubréka est une échappée verte facile depuis Conakry. On y vient surtout pour les chutes de la Soumba, au pied de falaises couvertes de végétation, et pour les paysages du massif du Kakoulima, qui domine la région côtière.",
    lat: 9.7906,
    lng: -13.5233,
    cover: "/images/voyage/dubreka",
    en: {
      region: "Kindia",
      summary: "Waterfalls and green hills some fifty kilometres from Conakry.",
      description:
        "North-east of the capital, the Dubréka prefecture is an easy green escape from Conakry. People come mainly for the Soumba falls, at the foot of cliffs covered in vegetation, and for the scenery of the Kakoulima massif, which overlooks the coastal region.",
    },
    places: [
      {
        slug: "chutes-de-la-soumba",
        category: "NATURE",
        name: "Chutes de la Soumba",
        summary: "Cascade dans un écrin de verdure, lieu de pique-nique et de baignade prisé.",
        description:
          "Près de Dubréka, la Soumba dévale une paroi rocheuse au milieu d'une végétation luxuriante. Le site est depuis longtemps une sortie dominicale des habitants de Conakry. Les aménagements ont vieilli ces dernières années : renseignez-vous sur leur état avant de venir.",
        tips: "Les rochers sont glissants ; ne vous baignez qu'aux endroits calmes et jamais en période de crue.",
        bestPeriod: "Fin de saison des pluies et début de saison sèche (débit plus fort)",
        visitMinutes: 150,
        cover: "/images/voyage/lieu-chutes-de-la-soumba",
        lat: 9.9114,
        lng: -13.4512,
        en: {
          name: "Soumba Falls",
          summary: "A waterfall set in lush greenery, a popular spot for picnics and swimming.",
          description:
            "Near Dubréka, the Soumba tumbles down a rock face amid lush vegetation. The site has long been a Sunday outing for Conakry residents. Its facilities have deteriorated in recent years: check their condition before you go.",
          tips: "The rocks are slippery; only swim in calm spots and never when the river is in flood.",
          bestPeriod: "End of the rainy season and start of the dry season (stronger flow)",
        },
      },
      {
        slug: "mont-kakoulima",
        category: "NATURE",
        name: "Massif du Kakoulima",
        summary: "Montagne boisée dominant la région de Conakry, pour randonner avec un guide.",
        description:
          "Le Kakoulima est le relief le plus marquant des environs de Conakry. Ses pentes boisées se prêtent à la randonnée et offrent, par temps clair, des vues étendues sur la plaine côtière. Montez avec un guide local qui connaît les sentiers.",
        tips: "Partez tôt avec de l'eau et de bonnes chaussures ; évitez la saison des pluies, quand les sentiers deviennent glissants.",
        visitMinutes: 300,
        lat: 9.7707,
        lng: -13.4477,
        cover: "/images/voyage/lieu-mont-kakoulima",
        en: {
          name: "Kakoulima massif",
          summary: "A wooded mountain overlooking the Conakry region, to hike with a guide.",
          description:
            "Kakoulima is the most striking peak around Conakry. Its wooded slopes are good for hiking and, on clear days, offer wide views over the coastal plain. Climb with a local guide who knows the trails.",
          tips: "Set off early with water and good shoes; avoid the rainy season, when trails become slippery.",
        },
      },
    ],
  },
  {
    slug: "kindia",
    name: "Kindia",
    region: "Kindia",
    summary: "Porte de l'intérieur réputée pour ses fruits, ses cascades et le mont Gangan.",
    description:
      "À environ 135 km au nord-est de Conakry, Kindia est la première grande ville sur la route du Fouta-Djallon. Entourée de collines et de vergers, elle est réputée pour ses fruits (mangues, ananas, bananes, agrumes) que l'on retrouve sur son marché. Dans les environs, le Voile de la Mariée et le mont Gangan, chargé de légendes, justifient une halte.",
    lat: 10.0569,
    lng: -12.8658,
    cover: "/images/voyage/kindia",
    en: {
      region: "Kindia",
      summary: "Gateway to the interior, known for its fruit, waterfalls and Mount Gangan.",
      description:
        "About 135 km north-east of Conakry, Kindia is the first major town on the road to the Fouta Djallon. Surrounded by hills and orchards, it is known for its fruit (mangoes, pineapples, bananas, citrus), found in abundance at its market. Nearby, the Bridal Veil falls and the legend-laden Mount Gangan are worth a stop.",
    },
    places: [
      {
        slug: "voile-de-la-mariee-kindia",
        category: "NATURE",
        name: "Voile de la Mariée",
        summary: "Cascade en fins filets d'eau sur une falaise, emblème de la région de Kindia.",
        description:
          "Le Voile de la Mariée doit son nom à l'eau qui s'étale en un fin rideau blanc le long d'une falaise, rappelant un voile de mariée. C'est l'une des cascades les plus connues du pays, dans un cadre de forêt et de rochers aux environs de Kindia.",
        tips: "En saison sèche avancée, le débit peut être faible ; les rochers sont glissants près de la chute.",
        bestPeriod: "Septembre à décembre (après les pluies)",
        visitMinutes: 120,
        lat: 9.9825,
        lng: -12.7964,
        cover: "/images/voyage/lieu-voile-de-la-mariee-kindia",
        en: {
          name: "Bridal Veil Falls (Voile de la Mariée)",
          summary: "A waterfall spreading in fine threads down a cliff, emblem of the Kindia region.",
          description:
            "The Voile de la Mariée owes its name to the water fanning out into a thin white curtain down a cliff, like a bridal veil. It is one of the country's best-known waterfalls, set among forest and rocks near Kindia.",
          tips: "Late in the dry season the flow can be weak; the rocks near the falls are slippery.",
          bestPeriod: "September to December (after the rains)",
        },
      },
      {
        slug: "mont-gangan",
        category: "NATURE",
        name: "Mont Gangan",
        summary: "Montagne tutélaire de Kindia, entourée de légendes, pour une randonnée panoramique.",
        description:
          "Le mont Gangan domine Kindia et occupe une place importante dans les traditions locales, qui lui prêtent de nombreuses légendes. Son ascension, avec un guide, offre de beaux panoramas sur la ville et les collines environnantes.",
        tips: "Faites-vous accompagner par un guide local et respectez les consignes liées aux lieux sacrés.",
        visitMinutes: 240,
        lat: 10.0725,
        lng: -12.9002,
        cover: "/images/voyage/lieu-mont-gangan",
        en: {
          name: "Mount Gangan",
          summary: "Kindia's guardian mountain, steeped in legend, for a hike with views.",
          description:
            "Mount Gangan overlooks Kindia and holds an important place in local tradition, which attaches many legends to it. Climbing it with a guide offers fine views over the town and the surrounding hills.",
          tips: "Go with a local guide and respect the rules attached to sacred places.",
        },
      },
      {
        slug: "marche-de-kindia",
        category: "MARKET",
        name: "Marché de Kindia",
        summary: "Marché animé où s'empilent les fruits de la région.",
        description:
          "Le marché de Kindia reflète la richesse agricole de la région : montagnes de mangues et d'ananas selon la saison, bananes, agrumes, légumes, épices et produits du quotidien. Un bon endroit pour goûter les fruits locaux avant de reprendre la route.",
        tips: "Gardez vos affaires près de vous et demandez avant de photographier les vendeuses.",
        visitMinutes: 60,
        lat: 10.0486,
        lng: -12.8563,
        cover: "/images/voyage/lieu-marche-de-kindia",
        en: {
          name: "Kindia Market",
          summary: "A lively market piled high with the region's fruit.",
          description:
            "Kindia's market reflects the region's farming wealth: heaps of mangoes and pineapples in season, bananas, citrus, vegetables, spices and everyday goods. A good place to taste local fruit before getting back on the road.",
          tips: "Keep your belongings close and ask before photographing stallholders.",
        },
      },
    ],
  },
  {
    slug: "dalaba",
    name: "Dalaba",
    region: "Mamou",
    summary: "Station d'altitude du Fouta-Djallon, au climat frais, entre pins, cascades et souvenirs de Miriam Makeba.",
    description:
      "Perchée à plus de 1 000 mètres d'altitude, Dalaba était déjà à l'époque coloniale une station de repos appréciée pour sa fraîcheur. Ses collines plantées de pins, ses villages peuls et ses panoramas sur les plateaux du Fouta-Djallon invitent à la randonnée. La chanteuse sud-africaine Miriam Makeba, exilée en Guinée, y possédait une maison. Non loin, les chutes de Ditinn comptent parmi les plus spectaculaires du pays.",
    lat: 10.6886,
    lng: -12.2497,
    cover: "/images/voyage/dalaba",
    en: {
      region: "Mamou",
      summary: "A hill station in the Fouta Djallon with a cool climate, pine trees, waterfalls and memories of Miriam Makeba.",
      description:
        "Perched at over 1,000 metres, Dalaba was already a popular retreat in colonial times thanks to its cool climate. Its pine-covered hills, Fula villages and views over the Fouta Djallon plateaus are made for hiking. The South African singer Miriam Makeba, exiled in Guinea, owned a house here. Nearby, the Ditinn falls are among the most spectacular in the country.",
    },
    places: [
      {
        slug: "chutes-de-ditinn",
        category: "NATURE",
        name: "Chutes de Ditinn",
        summary: "L'une des plus hautes chutes de Guinée, plongeant d'une falaise dans un cirque boisé.",
        description:
          "Dans les environs de Dalaba, les chutes de Ditinn tombent d'une haute falaise dans un cirque de verdure. Elles comptent parmi les plus hautes du pays. L'accès se fait par piste puis à pied, à travers la campagne du Fouta-Djallon.",
        tips: "Piste difficile en saison des pluies : un 4x4 et un guide local sont recommandés. Prévoyez de bonnes chaussures.",
        bestPeriod: "Septembre à décembre (débit important, pistes praticables)",
        visitMinutes: 240,
        lat: 10.8162,
        lng: -12.1859,
        cover: "/images/voyage/lieu-chutes-de-ditinn",
        en: {
          name: "Ditinn Falls",
          summary: "One of Guinea's highest waterfalls, plunging from a cliff into a wooded amphitheatre.",
          description:
            "Near Dalaba, the Ditinn falls drop from a high cliff into a green amphitheatre. They are among the highest in the country. Access is by track and then on foot through the Fouta Djallon countryside.",
          tips: "The track is difficult in the rainy season: a 4x4 and a local guide are recommended. Bring good shoes.",
          bestPeriod: "September to December (strong flow, passable tracks)",
        },
      },
      {
        slug: "maison-miriam-makeba-dalaba",
        category: "CULTURE",
        name: "Maison de Miriam Makeba",
        summary: "La demeure guinéenne de « Mama Africa », offerte pendant son exil.",
        description:
          "Exilée d'Afrique du Sud, la chanteuse Miriam Makeba a vécu en Guinée à partir de la fin des années 1960. À Dalaba, elle disposait d'une maison de style local, où elle recevait artistes et personnalités. La bâtisse s'est dégradée et un projet de restauration a été annoncé : l'état du site et les conditions de visite sont à vérifier sur place.",
        tips: "Renseignez-vous à Dalaba sur la possibilité de visite et passez par un guide local.",
        visitMinutes: 45,
        cover: "/images/voyage/lieu-maison-miriam-makeba-dalaba",
        en: {
          name: "Miriam Makeba's house",
          summary: "The Guinean home of “Mama Africa”, given to her during her exile.",
          description:
            "Exiled from South Africa, the singer Miriam Makeba lived in Guinea from the late 1960s. In Dalaba she had a house in the local style where she received artists and public figures. The building has deteriorated and a restoration project has been announced: check the state of the site and visiting arrangements locally.",
          tips: "Ask in Dalaba whether visits are possible and go with a local guide.",
        },
      },
      {
        slug: "collines-de-dalaba",
        category: "NATURE",
        name: "Collines et pinèdes de Dalaba",
        summary: "Randonnées au frais entre pins, villages peuls et points de vue sur le Fouta-Djallon.",
        description:
          "Autour de la ville, des sentiers relient pinèdes, cultures en terrasses et villages peuls aux cases rondes. Le climat d'altitude rend la marche agréable, et les crêtes offrent de larges vues sur les plateaux et les vallées du Fouta-Djallon.",
        tips: "Les nuits peuvent être fraîches en saison sèche : prévoyez une petite laine. Un guide local facilite les échanges dans les villages.",
        visitMinutes: 180,
        cover: "/images/voyage/lieu-collines-de-dalaba",
        en: {
          name: "Dalaba hills and pine woods",
          summary: "Cool hikes through pine woods and Fula villages, with views over the Fouta Djallon.",
          description:
            "Around the town, paths link pine woods, terraced fields and Fula villages of round huts. The highland climate makes walking pleasant, and the ridges offer sweeping views over the plateaus and valleys of the Fouta Djallon.",
          tips: "Nights can be chilly in the dry season: bring a jumper. A local guide makes contact with villagers easier.",
        },
      },
    ],
  },
  {
    slug: "pita",
    name: "Pita",
    region: "Labé",
    summary: "Petite ville du Fouta-Djallon, point de départ vers les chutes de Kambadaga et de Kinkon.",
    description:
      "Entre Dalaba et Labé, Pita est une ville tranquille au cœur du Fouta-Djallon. Elle sert de base pour découvrir deux des sites naturels les plus impressionnants de la région : les chutes de Kambadaga, une série de cascades spectaculaires, et les chutes de Kinkon, liées à un barrage hydroélectrique.",
    lat: 11.0547,
    lng: -12.3964,
    cover: "/images/voyage/pita",
    en: {
      region: "Labé",
      summary: "A small Fouta Djallon town, the starting point for the Kambadaga and Kinkon falls.",
      description:
        "Between Dalaba and Labé, Pita is a quiet town in the heart of the Fouta Djallon. It is a base for two of the region's most impressive natural sites: the Kambadaga falls, a series of spectacular cascades, and the Kinkon falls, linked to a hydroelectric dam.",
    },
    places: [
      {
        slug: "chutes-de-kambadaga",
        category: "NATURE",
        name: "Chutes de Kambadaga",
        summary: "Succession de puissantes cascades dans un paysage sauvage, à l'ouest de Pita.",
        description:
          "À plusieurs dizaines de kilomètres de Pita, les chutes de Kambadaga se succèdent en plusieurs cascades puissantes, parmi les plus belles du Fouta-Djallon. On y accède par une piste puis par une descente à pied assez raide. Le site, riche en plantes rares, est concerné par des projets d'aménagement hydroélectrique.",
        tips: "Véhicule tout-terrain et guide conseillés ; la descente est raide et glissante. Prévoyez la journée.",
        bestPeriod: "Septembre à décembre (débit maximal)",
        visitMinutes: 300,
        lat: 10.9941,
        lng: -12.493,
        cover: "/images/voyage/lieu-chutes-de-kambadaga",
        en: {
          name: "Kambadaga Falls",
          summary: "A succession of powerful cascades in wild scenery, west of Pita.",
          description:
            "Several dozen kilometres from Pita, the Kambadaga falls follow one another in several powerful cascades, among the finest in the Fouta Djallon. Access is by track and then a fairly steep walk down. The site, rich in rare plants, is affected by hydroelectric development plans.",
          tips: "An off-road vehicle and a guide are recommended; the path down is steep and slippery. Allow a full day.",
          bestPeriod: "September to December (maximum flow)",
        },
      },
      {
        slug: "chutes-de-kinkon",
        category: "NATURE",
        name: "Chutes de Kinkon",
        summary: "Cascades et retenue d'eau près de Pita, liées au barrage de Kinkon.",
        description:
          "Près de Pita, la rivière franchit une série de chutes à proximité du barrage hydroélectrique de Kinkon. Le site, plus facile d'accès que Kambadaga, offre une jolie promenade dans les paysages du Fouta-Djallon.",
        tips: "Ne photographiez pas les installations du barrage sans autorisation.",
        visitMinutes: 120,
        lat: 11.0562,
        lng: -12.454,
        cover: "/images/voyage/lieu-chutes-de-kinkon",
        en: {
          name: "Kinkon Falls",
          summary: "Waterfalls and a reservoir near Pita, linked to the Kinkon dam.",
          description:
            "Near Pita, the river runs over a series of falls close to the Kinkon hydroelectric dam. Easier to reach than Kambadaga, the site makes a pleasant walk through Fouta Djallon scenery.",
          tips: "Do not photograph the dam installations without permission.",
        },
      },
    ],
  },
  {
    slug: "labe",
    name: "Labé",
    region: "Labé",
    summary: "Capitale du Fouta-Djallon, ville de la culture peule, de l'islam savant et du bon lait caillé.",
    description:
      "Grande ville du nord du Fouta-Djallon, Labé fut le chef-lieu de l'une des principales provinces de l'État théocratique peul fondé au XVIIIe siècle. Elle reste un centre religieux et culturel majeur de la culture peule, avec sa grande mosquée, son marché animé et ses spécialités culinaires. Une bonne base pour rayonner dans les villages et les paysages du nord du Fouta.",
    lat: 11.3182,
    lng: -12.2833,
    cover: "/images/voyage/labe",
    en: {
      region: "Labé",
      summary: "Capital of the Fouta Djallon, a city of Fula culture, Islamic scholarship and good curdled milk.",
      description:
        "The main city of the northern Fouta Djallon, Labé was the seat of one of the leading provinces of the Fula theocratic state founded in the 18th century. It remains a major religious and cultural centre of Fula culture, with its great mosque, lively market and culinary specialities. A good base for exploring the villages and landscapes of the northern Fouta.",
    },
    places: [
      {
        slug: "grande-mosquee-labe",
        category: "RELIGION",
        name: "Grande Mosquée de Labé (Karamoko Alfa mo Labé)",
        summary: "La grande mosquée de la ville, portant le nom du fondateur de la province de Labé.",
        description:
          "Portant le nom de Karamoko Alfa mo Labé, figure fondatrice de la province de Labé, la grande mosquée est au cœur de la vie religieuse de la ville et de tout le Fouta-Djallon. Elle a fait l'objet d'importants travaux de rénovation ces dernières années.",
        tips: "Tenue couvrante ; ne visitez pas pendant les prières et demandez l'autorisation avant d'entrer ou de photographier.",
        visitMinutes: 30,
        cover: "/images/voyage/lieu-grande-mosquee-labe",
        lat: 11.3185,
        lng: -12.2774,
        en: {
          name: "Great Mosque of Labé (Karamoko Alfa mo Labé)",
          summary: "The city's great mosque, named after the founder of the Labé province.",
          description:
            "Named after Karamoko Alfa mo Labé, the founding figure of the Labé province, the great mosque is at the heart of religious life in the city and the whole Fouta Djallon. It has undergone major renovation work in recent years.",
          tips: "Wear covering clothes; do not visit during prayers and ask permission before entering or taking photos.",
        },
      },
      {
        slug: "marche-central-labe",
        category: "MARKET",
        name: "Marché central de Labé",
        summary: "Grand marché régional : tissus teints, produits des villages, artisanat peul.",
        description:
          "Le marché de Labé rassemble les productions de tout le nord du Fouta-Djallon : légumes, fonio, beurre de karité, tissus teints, vannerie, cuirs et objets du quotidien. Un lieu idéal pour observer la vie de la région et rapporter un tissu ou une vannerie.",
        tips: "Venez le matin ; marchandez avec le sourire et demandez avant de photographier.",
        visitMinutes: 90,
        lat: 11.3157,
        lng: -12.2772,
        en: {
          name: "Labé Central Market",
          summary: "A large regional market: dyed fabrics, village produce, Fula crafts.",
          description:
            "Labé's market brings together produce from across the northern Fouta Djallon: vegetables, fonio, shea butter, dyed fabrics, basketry, leather goods and everyday items. An ideal place to watch regional life go by and to pick up some cloth or basketry.",
          tips: "Come in the morning; bargain with a smile and ask before taking photos.",
        },
      },
      {
        slug: "cuisine-du-fouta-labe",
        category: "GASTRONOMY",
        name: "Saveurs du Fouta-Djallon",
        summary: "Fonio, lait caillé et sauces aux feuilles : la cuisine peule à goûter à Labé.",
        description:
          "Le Fouta-Djallon est le pays du fonio, petite céréale cultivée depuis des siècles, servie avec des sauces à base de feuilles ou d'arachide. Le lait caillé, issu des troupeaux peuls, accompagne de nombreux repas et se déguste aussi sucré. Les gargotes et restaurants de Labé sont l'endroit idéal pour découvrir cette cuisine simple et généreuse.",
        tips: "Demandez conseil à votre hébergement pour trouver une bonne adresse ; privilégiez les plats bien cuits et l'eau en bouteille.",
        visitMinutes: 90,
        cover: "/images/voyage/lieu-cuisine-du-fouta-labe",
        en: {
          name: "Flavours of the Fouta Djallon",
          summary: "Fonio, curdled milk and leaf sauces: Fula cuisine to taste in Labé.",
          description:
            "The Fouta Djallon is the land of fonio, a tiny grain grown for centuries and served with leaf- or groundnut-based sauces. Curdled milk from Fula herds accompanies many meals and is also enjoyed sweetened. Labé's eateries and restaurants are the ideal place to discover this simple, generous cuisine.",
          tips: "Ask where you are staying for a good address; choose well-cooked dishes and bottled water.",
        },
      },
      {
        slug: "dame-de-mali",
        category: "NATURE",
        name: "Dame de Mali (mont Loura)",
        summary: "Rocher en forme de profil féminin sur le mont Loura, point culminant du Fouta-Djallon, près de la ville de Mali.",
        description:
          "À environ 120 km au nord de Labé, près de la ville de Mali (chef-lieu de préfecture, à ne pas confondre avec le pays voisin), le mont Loura culmine à 1 515 m, au point le plus haut du Fouta-Djallon. Sur l'une de ses falaises, l'érosion a façonné un rocher qui évoque un visage de femme de profil : la « Dame de Mali », autour de laquelle circulent de nombreuses légendes. Depuis le plateau, la vue s'étend sur les falaises et les vallées boisées. La préfecture, isolée, recense de nombreux autres sites naturels.",
        tips: "Longue route et piste difficile depuis Labé : prévoyez un 4x4, un chauffeur expérimenté et une journée complète, voire une nuit sur place. Le bord des falaises n'est pas sécurisé ; partez avec un guide local.",
        bestPeriod: "Novembre à février (saison sèche, air plus frais ; l'harmattan peut voiler la vue)",
        visitMinutes: 240,
        lat: 12.1119,
        lng: -12.2631,
        cover: "/images/voyage/lieu-dame-de-mali",
        en: {
          name: "Lady of Mali (Mount Loura)",
          summary: "A rock shaped like a woman's profile on Mount Loura, the highest point of the Fouta Djallon, near the town of Mali.",
          description:
            "About 120 km north of Labé, near the town of Mali (a prefecture capital, not to be confused with the neighbouring country), Mount Loura rises to 1,515 m, the highest point of the Fouta Djallon. On one of its cliffs, erosion has shaped a rock that looks like a woman's face in profile: the \"Lady of Mali\", the subject of many legends. From the plateau, the view stretches over cliffs and wooded valleys. The remote prefecture has many other natural sites on record.",
          tips: "A long drive and a rough track from Labé: plan on a 4x4, an experienced driver and a full day, or even a night there. The cliff edges are unprotected; go with a local guide.",
          bestPeriod: "November to February (dry season, cooler air; the harmattan can haze the view)",
        },
      },
    ],
  },
  {
    slug: "boke",
    name: "Boké",
    region: "Boké",
    summary: "Ville historique du Rio Nunez, au nord-ouest, connue pour son fortin colonial devenu musée.",
    description:
      "À environ 250 km au nord-ouest de Conakry par une route goudronnée, Boké s'étend au bord du Rio Nunez, dans une région peuplée notamment de Landouma et de Nalou. Porte d'entrée ancienne du commerce européen puis de la colonisation, la ville conserve un fortin de 1878 transformé en musée régional, qui retrace l'histoire de la région et de ses résistants. Boké est aussi le cœur de l'exploitation de la bauxite guinéenne : attendez-vous à une importante circulation de camions sur les routes de la région.",
    lat: 10.9314,
    lng: -14.2892,
    cover: "/images/voyage/boke",
    en: {
      region: "Boké",
      summary: "A historic town on the Rio Nunez in the north-west, known for its colonial fort turned museum.",
      description:
        "About 250 km north-west of Conakry by paved road, Boké lies on the banks of the Rio Nunez, in a region home notably to the Landuma and Nalu peoples. Long a gateway for European trade and then colonisation, the town keeps an 1878 fort turned regional museum, which traces the history of the region and its resistance fighters. Boké is also the heart of Guinea's bauxite mining: expect heavy truck traffic on the region's roads.",
    },
    places: [
      {
        slug: "musee-fortin-boke",
        category: "MUSEUM",
        name: "Musée régional de Boké (fortin)",
        summary: "Fortin colonial de 1878 où furent détenus Alfa Yaya et Dinah Salifou, devenu musée régional.",
        description:
          "Construit en 1878 au-dessus du Rio Nunez, le fortin de Boké servit de poste à l'administration coloniale française. Deux souverains qui s'opposèrent à la colonisation y furent incarcérés : l'almamy Alfa Yaya Diallo, roi du Labé, et Dinah Salifou Camara, roi des Nalou. Transformé en musée en 1971 puis restauré au début des années 1980, il présente des objets des différents peuples de la région, dont des masques, ainsi que les traces de la période coloniale, comme ses salles souterraines.",
        tips: "Renseignez-vous sur place sur les salles ouvertes ; la visite guidée par le personnel du musée aide à comprendre l'histoire du site.",
        visitMinutes: 60,
        lat: 10.9332,
        lng: -14.2957,
        cover: "/images/voyage/lieu-musee-fortin-boke",
        en: {
          name: "Boké Regional Museum (fort)",
          summary: "An 1878 colonial fort where Alfa Yaya and Dinah Salifou were held, now a regional museum.",
          description:
            "Built in 1878 above the Rio Nunez, the Boké fort was a French colonial administrative post. Two rulers who opposed colonisation were imprisoned here: Almamy Alfa Yaya Diallo, king of Labé, and Dinah Salifou Camara, king of the Nalu. Turned into a museum in 1971 and restored in the early 1980s, it displays objects from the region's various peoples, including masks, as well as traces of the colonial period such as its underground rooms.",
          tips: "Ask on site which rooms are open; a guided tour by museum staff helps make sense of the site's history.",
        },
      },
    ],
  },
  {
    slug: "kankan",
    name: "Kankan",
    region: "Kankan",
    summary: "Grande ville malinké de Haute-Guinée sur les rives du Milo, cité de savoir islamique et berceau de la Mamaya.",
    description:
      "Deuxième ville du pays, à quelque 550 km à l'est de Conakry, Kankan s'étend au bord du Milo, un affluent du Niger. Fondée selon la tradition à la fin du XVIIe siècle, elle devint au XVIIIe siècle un grand centre religieux et marchand, capitale du Batè, reliant la côte, les régions de la kola et la vallée du Niger. Elle reste un foyer de la culture malinké et le berceau de la Mamaya, grande fête dansée célébrée après la Tabaski. La ville est en vigilance renforcée, mais les zones frontalières du Mali toutes proches (Siguiri, Mandiana) sont déconseillées sauf raison impérative par France Diplomatie : vérifiez les conseils aux voyageurs avant de partir et ne poursuivez pas vers le nord ou l'est sans avis à jour.",
    lat: 10.3833,
    lng: -9.3,
    cover: "/images/voyage/kankan",
    en: {
      region: "Kankan",
      summary: "A major Malinke city of Upper Guinea on the banks of the Milo, a centre of Islamic learning and birthplace of the Mamaya.",
      description:
        "The country's second city, some 550 km east of Conakry, Kankan lies on the Milo, a tributary of the Niger. Founded according to tradition in the late 17th century, it became a major religious and trading centre in the 18th century, capital of the Baté, linking the coast, the kola-growing regions and the Niger valley. It remains a stronghold of Malinke culture and the birthplace of the Mamaya, a great dance festival held after Tabaski. The city is under heightened vigilance, but the nearby border areas with Mali (Siguiri, Mandiana) are advised against except for essential travel by France Diplomatie: check travel advice before leaving and do not continue north or east without up-to-date advice.",
    },
    places: [
      {
        slug: "grande-mosquee-kankan",
        category: "RELIGION",
        name: "Grande mosquée de Kankan",
        summary: "Vaste mosquée aux minarets ocre coiffés de coupoles vertes, au cœur de la vie religieuse de la ville.",
        description:
          "Avec ses minarets carrés coiffés de coupoles vertes, la grande mosquée domine le centre de Kankan, ville réputée depuis le XVIIIe siècle pour ses lettrés musulmans. Elle rassemble les fidèles pour la prière du vendredi et pour les grandes fêtes religieuses, quand le parvis déborde de monde. Son architecture aux couleurs ocre et vert d'eau en fait un repère de la ville.",
        tips: "Tenue couvrante (épaules et jambes, foulard pour les femmes) ; pas de visite pendant les prières, demandez l'autorisation pour entrer ou photographier.",
        visitMinutes: 30,
        lat: 10.3771,
        lng: -9.2954,
        cover: "/images/voyage/lieu-grande-mosquee-kankan",
        en: {
          name: "Great Mosque of Kankan",
          summary: "A large mosque with ochre minarets topped by green domes, at the heart of the city's religious life.",
          description:
            "With its square minarets topped by green domes, the great mosque dominates the centre of Kankan, a city renowned since the 18th century for its Muslim scholars. It gathers the faithful for Friday prayers and major religious festivals, when the forecourt overflows. Its ochre and pale-green architecture makes it a city landmark.",
          tips: "Wear covering clothes (shoulders and legs, headscarf for women); do not visit during prayers and ask permission before entering or taking photos.",
        },
      },
      {
        slug: "berges-du-milo-kankan",
        category: "NATURE",
        name: "Berges du Milo",
        summary: "La rivière de Kankan, ses pirogues et ses bancs de sable, à découvrir en fin de journée.",
        description:
          "Le Milo, affluent du Niger, borde Kankan. Sur ses berges s'activent piroguiers, pêcheurs et extracteurs de sable, et l'on vient en fin de journée observer la vie de la rivière. La ville fut longtemps un port fluvial et, à partir de 1914, le terminus du chemin de fer venu de Conakry, dont le trafic est interrompu depuis les années 1990.",
        tips: "Évitez de vous baigner en eau douce (courants, risque de bilharziose) et demandez avant de photographier les travailleurs.",
        bestPeriod: "Saison sèche, en fin d'après-midi",
        visitMinutes: 60,
        cover: "/images/voyage/lieu-berges-du-milo-kankan",
        en: {
          name: "Banks of the Milo",
          summary: "Kankan's river, its pirogues and sandbanks, best seen in the late afternoon.",
          description:
            "The Milo, a tributary of the Niger, runs along Kankan. Boatmen, fishermen and sand diggers are busy on its banks, and people come in the late afternoon to watch river life. The town was long a river port and, from 1914, the terminus of the railway from Conakry, on which traffic has been suspended since the 1990s.",
          tips: "Avoid swimming in fresh water (currents, risk of bilharzia) and ask before photographing workers.",
          bestPeriod: "Dry season, late afternoon",
        },
      },
    ],
  },
  {
    slug: "mont-nimba",
    name: "Monts Nimba",
    region: "N'Zérékoré",
    summary: "Montagne forestière classée à l'UNESCO, à la frontière ivoirienne : zone déconseillée sauf raison impérative.",
    description:
      "À l'extrême sud-est, aux confins de la Côte d'Ivoire et du Liberia, les monts Nimba culminent au point le plus haut du pays. Leur réserve naturelle intégrale, inscrite au patrimoine mondial de l'UNESCO (et sur la liste du patrimoine en péril), abrite une faune et une flore exceptionnelles, dont de nombreuses espèces endémiques. Attention : à la date de rédaction, France Diplomatie déconseille, sauf raison impérative, les zones frontalières avec la Côte d'Ivoire ; ce site est donc présenté à titre de patrimoine, pour préparer un voyage quand les conditions le permettront.",
    lat: 7.6167,
    lng: -8.4167,
    cover: "/images/voyage/mont-nimba",
    en: {
      name: "Nimba Mountains",
      region: "Nzérékoré",
      summary: "A UNESCO-listed forested mountain range on the Ivorian border: advised against except for essential travel.",
      description:
        "In the far south-east, where Guinea meets Côte d'Ivoire and Liberia, the Nimba Mountains rise to the country's highest point. Their strict nature reserve, a UNESCO World Heritage Site (also on the List of World Heritage in Danger), is home to exceptional wildlife and plants, including many endemic species. Note: at the time of writing, France Diplomatie advises against all but essential travel to the border areas with Côte d'Ivoire; this site is therefore presented as heritage, to plan a trip when conditions allow.",
    },
    places: [
      {
        slug: "reserve-des-monts-nimba",
        category: "NATURE",
        name: "Réserve naturelle intégrale des monts Nimba",
        summary: "Forêts, prairies d'altitude et espèces endémiques, sur un site du patrimoine mondial partagé avec la Côte d'Ivoire.",
        description:
          "La réserve couvre les pentes guinéennes et ivoiriennes du massif : forêts denses, forêts galeries et prairies d'altitude abritent des espèces qu'on ne trouve nulle part ailleurs, comme le crapaud vivipare du Nimba. Inscrite au patrimoine mondial dès le début des années 1980, elle figure sur la liste du patrimoine en péril, notamment en raison des pressions minières. Les accès sont réglementés.",
        tips: "Zone frontalière déconseillée sauf raison impérative par France Diplomatie à la date de rédaction : consultez les conseils aux voyageurs à jour avant tout projet. Tout accès à la réserve nécessite une autorisation des autorités gestionnaires.",
        visitMinutes: 480,
        lat: 7.6167,
        lng: -8.4167,
        cover: "/images/voyage/lieu-reserve-des-monts-nimba",
        en: {
          name: "Mount Nimba Strict Nature Reserve",
          summary: "Forests, mountain grasslands and endemic species in a World Heritage Site shared with Côte d'Ivoire.",
          description:
            "The reserve covers the Guinean and Ivorian slopes of the range: dense forest, gallery forest and mountain grasslands are home to species found nowhere else, such as the Nimba viviparous toad. Listed as a World Heritage Site in the early 1980s, it is on the List of World Heritage in Danger, largely because of mining pressure. Access is regulated.",
          tips: "Border area advised against except for essential travel by France Diplomatie at the time of writing: check up-to-date travel advice before making plans. Any access to the reserve requires permission from the managing authorities.",
        },
      },
      {
        slug: "chimpanzes-de-bossou",
        category: "NATURE",
        name: "Chimpanzés de Bossou",
        summary: "Communauté de chimpanzés étudiée depuis des décennies, célèbre pour son usage d'outils en pierre.",
        description:
          "Au pied des monts Nimba, les collines boisées de Bossou abritent une petite communauté de chimpanzés suivie par des chercheurs depuis les années 1970. Elle est connue dans le monde entier pour son usage d'outils, notamment des pierres servant à casser les noix de palme. Les forêts sont sacrées pour les habitants, qui protègent traditionnellement les chimpanzés.",
        tips: "Situé en zone frontalière (Liberia, Côte d'Ivoire) : vérifiez les conseils aux voyageurs à jour. L'observation ne se fait qu'avec les guides et selon les règles de l'institut de recherche local ; gardez vos distances avec les animaux.",
        visitMinutes: 240,
        lat: 7.6487,
        lng: -8.5054,
        cover: "/images/voyage/lieu-chimpanzes-de-bossou",
        en: {
          name: "Bossou chimpanzees",
          summary: "A chimpanzee community studied for decades, famous for using stone tools.",
          description:
            "At the foot of the Nimba Mountains, the wooded hills of Bossou are home to a small chimpanzee community followed by researchers since the 1970s. It is known worldwide for its tool use, notably stones used to crack oil-palm nuts. The forests are sacred to local people, who traditionally protect the chimpanzees.",
          tips: "Located in a border area (Liberia, Côte d'Ivoire): check up-to-date travel advice. Viewing is only possible with guides and under the local research institute's rules; keep your distance from the animals.",
        },
      },
    ],
  },
];

export const GUINEE_CIRCUITS: SeedCircuit[] = [
  {
    slug: "guinee-conakry-fouta-djallon-9-jours",
    title: "De Conakry au Fouta-Djallon en 9 jours",
    summary:
      "Conakry et les îles de Loos, les cascades de Dubréka et de Kindia, puis les plateaux du Fouta-Djallon : Dalaba, les chutes de Ditinn et de Kambadaga, et Labé. Voiture avec chauffeur indispensable, trajets uniquement de jour.",
    days: 9,
    cover: "/images/voyage/dalaba",
    en: {
      title: "From Conakry to the Fouta Djallon in 9 days",
      summary:
        "Conakry and the Loos Islands, the waterfalls of Dubréka and Kindia, then the Fouta Djallon plateaus: Dalaba, the Ditinn and Kambadaga falls, and Labé. A car with a driver is essential; travel in daylight only.",
    },
    steps: [
      { day: 1, place: "musee-national-guinee", note: "Arrivée à Conakry (transfert organisé à l'avance), découverte de la ville.", noteEn: "Arrival in Conakry (transfer arranged in advance), first look at the city." },
      { day: 1, place: "grande-mosquee-faycal-conakry" },
      { day: 1, place: "jardin-botanique-camayenne" },
      { day: 2, place: "ile-de-roume", note: "Journée en bateau sur les îles de Loos, retour avant la nuit.", noteEn: "Day trip by boat to the Loos Islands, back before dark." },
      { day: 3, place: "chutes-de-la-soumba", note: "Matinée aux chutes de la Soumba, puis route vers Kindia.", noteEn: "Morning at the Soumba falls, then drive to Kindia." },
      { day: 3, place: "marche-de-kindia" },
      { day: 4, place: "voile-de-la-mariee-kindia", note: "Cascade le matin, puis longue route vers Dalaba via Mamou, à faire de jour.", noteEn: "Waterfall in the morning, then a long drive to Dalaba via Mamou, in daylight." },
      { day: 4, destination: "dalaba" },
      { day: 5, place: "chutes-de-ditinn", note: "Journée autour de Dalaba, au frais.", noteEn: "A day around Dalaba, in the cool highlands." },
      { day: 5, place: "maison-miriam-makeba-dalaba" },
      { day: 6, place: "chutes-de-kambadaga", note: "Route vers Pita et journée aux chutes, puis nuit à Labé.", noteEn: "Drive to Pita and a day at the falls, then overnight in Labé." },
      { day: 7, place: "grande-mosquee-labe", note: "Journée à Labé.", noteEn: "A day in Labé." },
      { day: 7, place: "marche-central-labe" },
      { day: 7, place: "cuisine-du-fouta-labe" },
      { day: 8, destination: "kindia", note: "Longue journée de route vers le sud, départ tôt pour arriver avant la nuit.", noteEn: "Long day on the road south, leaving early to arrive before dark." },
      { day: 9, place: "marche-madina-conakry", note: "Retour à Conakry, derniers achats.", noteEn: "Back to Conakry, last shopping." },
    ],
  },
];
