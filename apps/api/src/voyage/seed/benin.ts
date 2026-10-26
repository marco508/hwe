/**
 * Contenu de départ du guide Bénin (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const BENIN_GUIDE: SeedGuide = {
  country: "BJ",
  intro:
    "Berceau du vodun, terre des royaumes d'Abomey et de Porto-Novo, le Bénin offre en quelques heures de route des plages de cocotiers, des cités lacustres, des palais royaux classés à l'UNESCO et, au nord, les savanes et les parcs nationaux parmi les mieux préservés d'Afrique de l'Ouest.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; il se demande en ligne (e-visa) sur le portail officiel du gouvernement béninois. Les ressortissants de la CEDEAO en sont dispensés. Vérifiez toujours les conditions à jour auprès des sources officielles avant le départ : passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Buvez de l'eau en bouteille.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les espèces restent indispensables hors des grandes villes ; le paiement mobile (mobile money) est très répandu. Les cartes bancaires sont acceptées dans les hôtels et commerces importants de Cotonou.",
    },
    {
      title: "Quand partir",
      body: "Le sud connaît deux saisons des pluies (environ avril–juillet, puis septembre–octobre) ; le nord, une seule (environ mai–octobre). La période la plus agréable va de novembre à mars, saison sèche, avec l'harmattan (vent sec et poussiéreux) de décembre à février. Les parcs du nord se visitent surtout en saison sèche.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue officielle ; le fon, le yoruba, le bariba et le dendi, entre autres, sont parlés au quotidien. Saluer avant toute demande est essentiel. Dans les lieux sacrés (temples, forêts sacrées, couvents), suivez les consignes du guide et demandez avant de photographier une personne ou une cérémonie.",
    },
    {
      title: "Se déplacer",
      body: "Les taxis-motos (zémidjans, reconnaissables à leur chemise jaune à Cotonou) sont le moyen le plus courant en ville ; exigez un casque. Entre les villes, taxis collectifs, bus et voitures avec chauffeur. Pour le nord et les parcs, une voiture avec chauffeur-guide est vivement conseillée.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C et E (prises européennes). Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money.",
    },
    {
      title: "Sécurité",
      body: "Le sud et le centre du pays se visitent avec une vigilance ordinaire : attention aux vols dans les marchés et la nuit à Cotonou, prudence sur la route (évitez de rouler de nuit). Le nord est en revanche exposé au risque terroriste : les autorités françaises et britanniques déconseillent formellement les parcs de la Pendjari et du W, leurs abords et les zones frontalières du Burkina Faso et du Niger, et déconseillent, sauf raison impérative, le reste des départements de l'Atacora et de l'Alibori ainsi que l'est du pays entre l'axe Tchaourou–Malanville et la frontière du Nigeria. Consultez les conseils aux voyageurs de votre pays (France Diplomatie, FCDO…) juste avant de partir et signalez votre séjour à votre ambassade.",
    },
  ],
  en: {
    intro:
      "Cradle of vodun, land of the kingdoms of Abomey and Porto-Novo, Benin packs palm-fringed beaches, lake villages, UNESCO-listed royal palaces and, in the north, some of West Africa's best-preserved savannahs and national parks into a few hours' drive.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa, applied for online (e-visa) on the Beninese government's official portal. ECOWAS nationals are exempt. Always check current requirements with official sources before leaving: passport valid for several months after your return, return ticket, accommodation address.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). Drink bottled water.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). Cash remains essential outside the big cities; mobile money is widely used. Bank cards are accepted in hotels and larger shops in Cotonou.",
      },
      {
        title: "When to go",
        body: "The south has two rainy seasons (roughly April–July, then September–October); the north has one (roughly May–October). The most pleasant period is November to March, the dry season, with the harmattan (a dry, dusty wind) from December to February. The northern parks are best visited in the dry season.",
      },
      {
        title: "Languages and customs",
        body: "French is the official language; Fon, Yoruba, Bariba and Dendi, among others, are spoken daily. Greeting people before asking anything is essential. In sacred places (temples, sacred forests, convents), follow your guide's instructions and ask before photographing a person or a ceremony.",
      },
      {
        title: "Getting around",
        body: "Motorbike taxis (zemidjans, recognisable in Cotonou by their yellow shirts) are the most common way to get around town; insist on a helmet. Between cities: shared taxis, buses and cars with drivers. For the north and the parks, a car with a driver-guide is strongly recommended.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C and E plugs (European sockets). A local SIM card (ID required) gives access to mobile internet and mobile money.",
      },
      {
        title: "Safety and security",
        body: "The south and centre of the country can be visited with ordinary caution: watch out for theft in markets and at night in Cotonou, and take care on the roads (avoid driving after dark). The north, however, is exposed to the threat of terrorism: the French and British authorities advise against all travel to the Pendjari and W national parks, their surroundings and the areas bordering Burkina Faso and Niger, and against all but essential travel to the rest of the Atacora and Alibori departments and to the east of the country between the Tchaourou–Malanville road and the Nigerian border. Check your own government's travel advice (FCDO, France Diplomatie…) just before leaving and register your trip with your embassy.",
      },
    ],
  },
};

export const BENIN_DESTINATIONS: SeedDestination[] = [
  {
    slug: "cotonou",
    name: "Cotonou",
    region: "Littoral",
    summary: "Capitale économique animée, entre lagune et océan : marchés, art contemporain et vie nocturne.",
    description:
      "Plus grande ville du pays, Cotonou est le point d'arrivée de la plupart des voyageurs. On y vient pour l'énergie de ses marchés, à commencer par Dantokpa, l'un des plus grands d'Afrique de l'Ouest, pour ses galeries et lieux d'art contemporain, ses maquis où goûter la cuisine béninoise et ses plages urbaines. C'est aussi une base pratique pour rayonner vers Ganvié, Ouidah et Porto-Novo.",
    lat: 6.3654,
    lng: 2.4183,
    cover: "/images/voyage/cotonou",
    en: {
      region: "Littoral",
      summary: "Lively economic capital between lagoon and ocean: markets, contemporary art and nightlife.",
      description:
        "The country's largest city, Cotonou is where most travellers arrive. People come for the energy of its markets, starting with Dantokpa, one of the largest in West Africa, for its galleries and contemporary art venues, its maquis (local eateries) serving Beninese food, and its city beaches. It is also a handy base for trips to Ganvié, Ouidah and Porto-Novo.",
    },
    places: [
      {
        slug: "marche-dantokpa",
        category: "MARKET",
        name: "Marché Dantokpa",
        summary: "Immense marché au bord de la lagune : tissus, épices, artisanat, et le marché aux fétiches.",
        description:
          "Dantokpa (ou « Tokpa ») s'étend sur plusieurs hectares au bord de la lagune de Cotonou. On y trouve de tout : pagnes et wax, épices, produits frais, quincaillerie, artisanat et, dans une section dédiée, les objets et ingrédients utilisés dans les pratiques vodun. Une plongée saisissante dans la vie économique du pays.",
        tips: "Venez le matin, gardez vos affaires près de vous et, pour une première visite, faites-vous accompagner. Demandez avant de photographier.",
        visitMinutes: 120,
        lat: 6.3726,
        lng: 2.4339,
        cover: "/images/voyage/lieu-marche-dantokpa",
        en: {
          name: "Dantokpa Market",
          summary: "Huge lagoon-side market: fabrics, spices, crafts and the fetish market.",
          description:
            "Dantokpa (or “Tokpa”) covers several hectares on the shore of the Cotonou lagoon. You will find everything there: wax prints and fabrics, spices, fresh produce, hardware, crafts and, in a dedicated section, the objects and ingredients used in vodun practices. A striking dive into the country's economic life.",
          tips: "Come in the morning, keep your belongings close and, for a first visit, go with a guide. Ask before taking photos.",
        },
      },
      {
        slug: "place-de-l-amazone",
        category: "CULTURE",
        name: "Place de l'Amazone",
        summary: "Monumentale statue rendant hommage aux guerrières du royaume du Danhomè.",
        description:
          "Érigée sur le front de mer, la statue de l'Amazone célèbre les Agojié, le corps de guerrières du royaume du Danhomè (Abomey). Le site, aménagé en esplanade, est devenu l'un des symboles du Cotonou d'aujourd'hui et un lieu de promenade en fin de journée.",
        visitMinutes: 45,
        lat: 6.349,
        lng: 2.4076,
        cover: "/images/voyage/lieu-place-de-l-amazone",
        en: {
          name: "Amazon Square",
          summary: "Monumental statue honouring the women warriors of the Kingdom of Dahomey.",
          description:
            "Standing on the seafront, the Amazon statue celebrates the Agojie, the corps of women warriors of the Kingdom of Danhomè (Abomey). The site, laid out as an esplanade, has become one of the symbols of today's Cotonou and a popular place for an evening stroll.",
        },
      },
      {
        slug: "plage-de-fidjrosse",
        category: "BEACH",
        name: "Plage de Fidjrossè",
        summary: "Longue plage urbaine bordée de buvettes, très animée le week-end.",
        description:
          "À l'ouest de la ville, la plage de Fidjrossè est le rendez-vous des Cotonois le week-end : buvettes, poisson grillé, musique et couchers de soleil sur l'océan. La baignade y est dangereuse (forts courants, rouleaux) : on y vient surtout pour l'ambiance.",
        tips: "Ne vous baignez pas : les courants de la côte béninoise sont très forts.",
        visitMinutes: 120,
        lat: 6.3561,
        lng: 2.3655,
        cover: "/images/voyage/lieu-plage-de-fidjrosse",
        en: {
          name: "Fidjrossè Beach",
          summary: "Long city beach lined with bars, very lively at weekends.",
          description:
            "West of the city, Fidjrossè beach is where Cotonou residents gather at weekends: drinks stalls, grilled fish, music and sunsets over the ocean. Swimming is dangerous (strong currents, big waves): people come mainly for the atmosphere.",
          tips: "Do not swim: the currents along Benin's coast are very strong.",
        },
      },
      {
        slug: "centre-artisanal-cotonou",
        category: "MARKET",
        name: "Centre de promotion de l'artisanat",
        summary: "Ateliers et boutiques d'artisans : bronzes, tentures appliquées, masques, bijoux.",
        description:
          "Regroupant de nombreux artisans, le centre de promotion de l'artisanat permet d'acheter sculptures, bronzes, tentures appliquées inspirées des bas-reliefs d'Abomey, masques, vannerie et bijoux, souvent en voyant les artisans travailler. Le marchandage fait partie de l'échange.",
        visitMinutes: 60,
        lat: 6.3595,
        lng: 2.419,
        cover: "/images/voyage/lieu-centre-artisanal-cotonou",
        en: {
          name: "Crafts Promotion Centre",
          summary: "Artisans' workshops and shops: bronzes, appliqué hangings, masks, jewellery.",
          description:
            "Bringing many artisans together, the crafts centre is the place to buy sculptures, bronzes, appliqué hangings inspired by the Abomey bas-reliefs, masks, basketry and jewellery, often while watching the artisans at work. Bargaining is part of the exchange.",
        },
      },
      {
        slug: "cathedrale-notre-dame-de-misericorde-cotonou",
        category: "RELIGION",
        name: "Cathédrale Notre-Dame-de-Miséricorde",
        summary: "La cathédrale de Cotonou, reconnaissable à ses rayures bordeaux et blanches.",
        description:
          "Siège de l'archidiocèse de Cotonou, la cathédrale Notre-Dame-de-Miséricorde se dresse dans le quartier ancien de Ganhi, près de l'ancien pont sur la lagune. Ses façades rayées de bordeaux et de blanc en font l'un des édifices les plus photographiés de la ville. Commencée en 1912, elle reste un lieu de culte très fréquenté, notamment pour les messes dominicales et les fêtes de Noël et de Pâques.",
        tips: "Tenue correcte exigée ; visitez en dehors des offices et restez discret pendant les célébrations.",
        visitMinutes: 30,
        lat: 6.3564,
        lng: 2.4392,
        cover: "/images/voyage/lieu-cathedrale-notre-dame-de-misericorde-cotonou",
        en: {
          name: "Cathedral of Our Lady of Mercy",
          summary: "Cotonou's cathedral, recognisable by its burgundy and white stripes.",
          description:
            "Seat of the Archdiocese of Cotonou, the Cathedral of Notre-Dame-de-Miséricorde stands in the old Ganhi district, near the old bridge over the lagoon. Its burgundy-and-white striped facades make it one of the most photographed buildings in the city. Begun in 1912, it is still a busy place of worship, especially for Sunday masses and at Christmas and Easter.",
          tips: "Dress respectfully; visit outside services and stay discreet during celebrations.",
        },
      },
      {
        slug: "place-de-l-etoile-rouge-cotonou",
        category: "HISTORY",
        name: "Place de l'Étoile rouge",
        summary: "Grand carrefour et monument hérité de la période révolutionnaire des années 1970.",
        description:
          "Au cœur de Cotonou, la place de l'Étoile rouge a été aménagée sous le régime du général Mathieu Kérékou, après l'adoption du marxisme-léninisme comme doctrine officielle en 1974, pour accueillir défilés et rassemblements. Son monument central, une haute colonne surmontée d'une statue, reste l'un des grands repères de la ville, au croisement d'axes majeurs. La place est illuminée lors des fêtes de fin d'année.",
        tips: "Carrefour très fréquenté : admirez le monument depuis les abords, sans traverser n'importe où.",
        visitMinutes: 20,
        lat: 6.3715,
        lng: 2.4098,
        cover: "/images/voyage/lieu-place-de-l-etoile-rouge-cotonou",
        en: {
          name: "Red Star Square",
          summary: "Major junction and monument inherited from the revolutionary period of the 1970s.",
          description:
            "In the heart of Cotonou, Red Star Square was laid out under the regime of General Mathieu Kérékou, after Marxism-Leninism was adopted as official doctrine in 1974, to host parades and rallies. Its central monument, a tall column topped by a statue, remains one of the city's great landmarks, at the crossroads of major roads. The square is lit up for the end-of-year holidays.",
          tips: "A very busy junction: admire the monument from the edges and cross only where it is safe.",
        },
      },
      {
        slug: "quartier-haie-vive-cotonou",
        category: "LEISURE",
        name: "Cotonou le soir : Haie Vive et Jonquet",
        summary: "Les quartiers où sortir le soir : restaurants, terrasses, bars et musique.",
        description:
          "Le soir venu, la Haie Vive, quartier résidentiel proche de l'aéroport et des ambassades, concentre restaurants de toutes cuisines, terrasses et bars, dans une ambiance plutôt détendue. Les noctambules poursuivent souvent vers Jonquet, au centre-ville, réputé pour ses bars et ses boîtes ouverts tard. Le week-end, les buvettes de la plage de Fidjrossè et les maquis de quartier complètent le tableau, avec poisson braisé et musique.",
        tips: "La nuit, préférez un taxi ou un chauffeur de confiance au zémidjan, gardez peu d'objets de valeur sur vous et restez vigilant à Jonquet, quartier réputé pour la petite délinquance.",
        bestPeriod: "Du jeudi au samedi soir ; décembre et janvier pour l'effervescence des fêtes",
        visitMinutes: 180,
        lat: 6.3552,
        lng: 2.3976,
        cover: "/images/voyage/lieu-quartier-haie-vive-cotonou",
        en: {
          name: "Cotonou by night: Haie Vive and Jonquet",
          summary: "Where to go out at night: restaurants, terraces, bars and music.",
          description:
            "When evening comes, Haie Vive, a residential district near the airport and the embassies, is packed with restaurants serving every kind of cuisine, terraces and bars, in a fairly relaxed atmosphere. Night owls often carry on to Jonquet, in the city centre, known for its bars and clubs that stay open late. At weekends, the drinks stalls on Fidjrossè beach and neighbourhood maquis complete the picture, with grilled fish and music.",
          tips: "At night, take a taxi or a trusted driver rather than a motorbike taxi, carry few valuables and stay alert in Jonquet, an area known for petty crime.",
          bestPeriod: "Thursday to Saturday evenings; December and January for the festive buzz",
        },
      },
    ],
  },
  {
    slug: "ganvie",
    name: "Ganvié",
    region: "Atlantique",
    summary: "La « Venise de l'Afrique » : un village entier sur pilotis au milieu du lac Nokoué.",
    description:
      "À une vingtaine de kilomètres au nord de Cotonou, Ganvié est l'une des plus grandes cités lacustres d'Afrique. Ses habitants, d'origine tofinu, s'y seraient installés il y a plusieurs siècles pour échapper aux razzias. Maisons sur pilotis, écoles, marché flottant : tout se fait en pirogue. Une excursion d'une demi-journée au départ de l'embarcadère d'Abomey-Calavi.",
    lat: 6.4677,
    lng: 2.3913,
    cover: "/images/voyage/ganvie",
    en: {
      region: "Atlantique",
      summary: "The “Venice of Africa”: a whole village on stilts in the middle of Lake Nokoué.",
      description:
        "Some twenty kilometres north of Cotonou, Ganvié is one of Africa's largest lake villages. Its Tofinu inhabitants are said to have settled there several centuries ago to escape slave raids. Stilt houses, schools, a floating market: everything is done by pirogue. A half-day trip from the Abomey-Calavi landing stage.",
    },
    places: [
      {
        slug: "cite-lacustre-de-ganvie",
        category: "CULTURE",
        name: "Cité lacustre de Ganvié",
        summary: "Balade en pirogue entre les maisons sur pilotis et le marché flottant.",
        description:
          "La visite se fait en pirogue motorisée ou à la pagaie depuis l'embarcadère de Calavi. On glisse entre les maisons sur pilotis, les enclos de pêche (acadjas), l'école et le marché flottant où les femmes vendent depuis leurs barques. Les habitants vivent ici au quotidien : la discrétion est de mise.",
        tips: "Négociez le prix de la pirogue à l'embarcadère officiel. Demandez toujours avant de photographier les habitants.",
        visitMinutes: 180,
        lat: 6.4677,
        lng: 2.3913,
        cover: "/images/voyage/lieu-cite-lacustre-de-ganvie",
        en: {
          name: "Ganvié lake village",
          summary: "Pirogue trip among the stilt houses and the floating market.",
          description:
            "The visit is made by motorised or paddled pirogue from the Calavi landing stage. You glide between stilt houses, fishing enclosures (acadjas), the school and the floating market where women sell from their boats. People live here day to day: be discreet.",
          tips: "Agree the boat price at the official landing stage. Always ask before photographing residents.",
        },
      },
    ],
  },
  {
    slug: "ouidah",
    name: "Ouidah",
    region: "Atlantique",
    summary: "Ville de mémoire de la traite et capitale spirituelle du vodun.",
    description:
      "Ancien grand port de la traite négrière, Ouidah conserve la mémoire de cette tragédie le long de la Route des Esclaves, qui mène jusqu'à la Porte du Non-Retour sur la plage. C'est aussi la capitale spirituelle du vodun : Temple des Pythons face à la basilique, forêt sacrée de Kpassè, et chaque mois de janvier les grandes célébrations des Vodun Days. Une étape essentielle à 40 km de Cotonou.",
    lat: 6.3631,
    lng: 2.0851,
    cover: "/images/voyage/ouidah",
    en: {
      region: "Atlantique",
      summary: "A town of remembrance of the slave trade and the spiritual capital of vodun.",
      description:
        "Formerly a major slave-trading port, Ouidah preserves the memory of this tragedy along the Slave Route, which leads to the Door of No Return on the beach. It is also the spiritual capital of vodun: the Python Temple facing the basilica, the Kpassè sacred forest and, every January, the great Vodun Days celebrations. An essential stop 40 km from Cotonou.",
    },
    places: [
      {
        slug: "route-des-esclaves",
        category: "HISTORY",
        name: "Route des Esclaves",
        summary: "Parcours de mémoire de 4 km entre la ville et la plage, jalonné de monuments.",
        description:
          "La Route des Esclaves retrace le dernier trajet des captifs, de la place des enchères jusqu'à la plage où ils étaient embarqués. Le long des quatre kilomètres, des statues et monuments évoquent les étapes de ce chemin : l'arbre de l'oubli, la case Zomaï, le mémorial. Un parcours bouleversant, à faire de préférence avec un guide.",
        tips: "Faites-le à pied ou à vélo tôt le matin, avec de l'eau : il fait chaud et il y a peu d'ombre.",
        visitMinutes: 150,
        lat: 6.3497,
        lng: 2.0866,
        cover: "/images/voyage/lieu-route-des-esclaves",
        en: {
          name: "Slave Route",
          summary: "A 4 km memorial trail between the town and the beach, lined with monuments.",
          description:
            "The Slave Route retraces the captives' last journey, from the auction square to the beach where they were shipped. Along its four kilometres, statues and monuments mark the stages of this path: the tree of forgetting, the Zomaï hut, the memorial. A deeply moving trail, best walked with a guide.",
          tips: "Walk or cycle it early in the morning, with water: it is hot and there is little shade.",
        },
      },
      {
        slug: "porte-du-non-retour",
        category: "HISTORY",
        name: "Porte du Non-Retour",
        summary: "Mémorial face à l'océan, à l'endroit où les captifs étaient embarqués.",
        description:
          "Au bout de la Route des Esclaves, l'arche monumentale de la Porte du Non-Retour se dresse face à l'Atlantique. Inaugurée dans les années 1990 dans le cadre du projet « La Route de l'esclave » de l'UNESCO, elle rend hommage aux millions d'Africains déportés vers les Amériques. Un lieu de recueillement autant qu'un symbole.",
        visitMinutes: 45,
        lat: 6.323,
        lng: 2.0878,
        cover: "/images/voyage/lieu-porte-du-non-retour",
        en: {
          name: "Door of No Return",
          summary: "Memorial facing the ocean, where captives were shipped.",
          description:
            "At the end of the Slave Route, the monumental arch of the Door of No Return stands facing the Atlantic. Inaugurated in the 1990s as part of UNESCO's “Slave Route” project, it honours the millions of Africans deported to the Americas. A place of reflection as much as a symbol.",
        },
      },
      {
        slug: "temple-des-pythons",
        category: "RELIGION",
        name: "Temple des Pythons",
        summary: "Temple vodun dédié au dieu Dangbé, où vivent des pythons sacrés.",
        description:
          "Face à la basilique de l'Immaculée Conception, le Temple des Pythons est consacré à Dangbé, divinité protectrice représentée par le python royal. Les serpents, inoffensifs pour l'homme, y sont vénérés ; la visite guidée explique les fondements du vodun et son rôle dans la société béninoise. Le face-à-face entre temple et basilique illustre la cohabitation des cultes à Ouidah.",
        visitMinutes: 45,
        lat: 6.36,
        lng: 2.085,
        cover: "/images/voyage/lieu-temple-des-pythons",
        en: {
          name: "Python Temple",
          summary: "Vodun temple dedicated to the god Dangbé, home to sacred pythons.",
          description:
            "Facing the Basilica of the Immaculate Conception, the Python Temple is dedicated to Dangbé, a protective deity represented by the royal python. The snakes, harmless to humans, are venerated there; the guided visit explains the foundations of vodun and its role in Beninese society. The temple and basilica facing each other illustrate how faiths coexist in Ouidah.",
        },
      },
      {
        slug: "basilique-de-ouidah",
        category: "RELIGION",
        name: "Basilique de l'Immaculée Conception",
        summary: "Grande église du début du XXe siècle, face au Temple des Pythons.",
        description:
          "Ouidah fut l'une des premières villes de la région évangélisées. Sa basilique, construite au début du XXe siècle, domine la place principale face au Temple des Pythons. Son architecture coloniale et ses vitraux en font une étape du parcours dans le centre historique.",
        visitMinutes: 30,
        lat: 6.3606,
        lng: 2.0849,
        cover: "/images/voyage/lieu-basilique-de-ouidah",
        en: {
          name: "Basilica of the Immaculate Conception",
          summary: "Large early 20th-century church opposite the Python Temple.",
          description:
            "Ouidah was one of the first towns in the region to be evangelised. Its basilica, built in the early 20th century, dominates the main square opposite the Python Temple. Its colonial architecture and stained glass make it a stop on any walk through the historic centre.",
        },
      },
      {
        slug: "foret-sacree-de-kpasse",
        category: "NATURE",
        name: "Forêt sacrée de Kpassè",
        summary: "Bois sacré peuplé de sculptures vodun, lié à la légende du roi Kpassè.",
        description:
          "Selon la tradition, le roi Kpassè, fondateur de Ouidah, s'y serait transformé en arbre pour échapper à ses ennemis. La forêt sacrée abrite cet arbre vénéré et de nombreuses sculptures, dont certaines réalisées pour le festival Ouidah 92, représentant les divinités du vodun. Un lieu ombragé et paisible au cœur de la ville.",
        visitMinutes: 60,
        lat: 6.3648,
        lng: 2.0964,
        cover: "/images/voyage/lieu-foret-sacree-de-kpasse",
        en: {
          name: "Kpassè Sacred Forest",
          summary: "Sacred grove filled with vodun sculptures, linked to the legend of King Kpassè.",
          description:
            "According to tradition, King Kpassè, founder of Ouidah, turned into a tree there to escape his enemies. The sacred forest shelters this revered tree and many sculptures, some made for the Ouidah 92 festival, depicting vodun deities. A shady, peaceful spot in the heart of town.",
        },
      },
      {
        slug: "musee-d-histoire-de-ouidah",
        category: "MUSEUM",
        name: "Musée d'histoire de Ouidah",
        summary: "Installé dans l'ancien fort portugais, il retrace l'histoire de la traite et du royaume.",
        description:
          "Aménagé dans le fort portugais São João Baptista de Ajudá, le musée retrace l'histoire de Ouidah : le commerce européen sur la côte, la traite négrière, les liens avec le Brésil et les Caraïbes, et le royaume du Danhomè. Un bon point de départ pour comprendre la ville avant de suivre la Route des Esclaves.",
        tips: "Le fort fait l'objet d'importants travaux pour accueillir le futur Musée international de la mémoire et de l'esclavage (MIME) : renseignez-vous sur les espaces ouverts avant de venir.",
        visitMinutes: 75,
        lat: 6.3589,
        lng: 2.0902,
        cover: "/images/voyage/lieu-musee-d-histoire-de-ouidah",
        en: {
          name: "Ouidah History Museum",
          summary: "Housed in the old Portuguese fort, it tells the story of the slave trade and the kingdom.",
          description:
            "Set in the Portuguese fort of São João Baptista de Ajudá, the museum traces Ouidah's history: European trade on the coast, the slave trade, links with Brazil and the Caribbean, and the Kingdom of Danhomè. A good starting point for understanding the town before walking the Slave Route.",
          tips: "The fort is undergoing major works to house the future International Museum of Memory and Slavery (MIME): check which areas are open before you go.",
        },
      },
      {
        slug: "vodun-days",
        category: "FESTIVAL",
        name: "Fête du Vodun (Vodun Days)",
        summary: "Chaque mois de janvier, cérémonies, danses et défilés célèbrent les cultes vodun.",
        description:
          "Longtemps célébrée le 10 janvier, la fête annuelle des religions traditionnelles a lieu depuis la loi de 2024 le deuxième vendredi de janvier, le jeudi qui précède étant lui aussi férié. À Ouidah, les célébrations prennent l'ampleur d'un grand festival, les Vodun Days : cérémonies, danses de masques (dont les Egungun et les Zangbeto), musique et rassemblement sur la plage, devant la Porte du Non-Retour. Une période très prisée : réservez votre logement longtemps à l'avance.",
        tips: "Les dates précises et le programme sont publiés chaque année par les organisateurs : vérifiez-les avant de réserver.",
        bestPeriod: "Début janvier (jeudi et deuxième vendredi de janvier)",
        visitMinutes: 480,
        lat: 6.323,
        lng: 2.0878,
        cover: "/images/voyage/lieu-vodun-days",
        en: {
          name: "Vodun Festival (Vodun Days)",
          summary: "Every January, ceremonies, dances and parades celebrate vodun.",
          description:
            "Long celebrated on 10 January, the annual festival of traditional religions has, since a 2024 law, been held on the second Friday of January, with the preceding Thursday also a public holiday. In Ouidah the celebrations take on the scale of a major festival, the Vodun Days: ceremonies, masked dances (including Egungun and Zangbeto), music and a gathering on the beach in front of the Door of No Return. A very popular time: book your accommodation well in advance.",
          tips: "Exact dates and the programme are published every year by the organisers: check them before booking.",
          bestPeriod: "Early January (Thursday and second Friday of January)",
        },
      },
    ],
  },
  {
    slug: "porto-novo",
    name: "Porto-Novo",
    region: "Ouémé",
    summary: "Capitale officielle, ville royale aux maisons afro-brésiliennes et aux musées remarquables.",
    description:
      "Capitale administrative du Bénin, Porto-Novo est plus calme que Cotonou et riche d'un patrimoine singulier : palais royal du roi Toffa transformé en musée, Grande Mosquée de style afro-brésilien, maisons coloniales, jardin des plantes et le Centre Songhaï, vitrine de l'agriculture durable. À 30 km de Cotonou.",
    lat: 6.4969,
    lng: 2.6289,
    cover: "/images/voyage/porto-novo",
    en: {
      region: "Ouémé",
      summary: "The official capital, a royal city of Afro-Brazilian houses and remarkable museums.",
      description:
        "Benin's administrative capital, Porto-Novo is calmer than Cotonou and has a distinctive heritage: King Toffa's royal palace turned museum, an Afro-Brazilian-style Great Mosque, colonial houses, a botanical garden and the Songhaï Centre, a showcase for sustainable farming. 30 km from Cotonou.",
    },
    places: [
      {
        slug: "musee-honme",
        category: "MUSEUM",
        name: "Musée Honmè (palais du roi Toffa)",
        summary: "L'ancien palais royal de Porto-Novo, ses cours et ses objets de cour.",
        description:
          "Le musée Honmè occupe l'ancienne résidence des rois de Hogbonou (Porto-Novo), dont le roi Toffa. La visite des cours successives fait découvrir l'organisation de la vie royale, les appartements des reines, les objets de culte et de pouvoir. Un témoignage rare d'architecture palatiale.",
        visitMinutes: 60,
        lat: 6.4693,
        lng: 2.6252,
        cover: "/images/voyage/lieu-musee-honme",
        en: {
          name: "Honmè Museum (King Toffa's palace)",
          summary: "Porto-Novo's former royal palace, its courtyards and court objects.",
          description:
            "The Honmè museum occupies the former residence of the kings of Hogbonou (Porto-Novo), including King Toffa. Walking through its successive courtyards reveals how royal life was organised, the queens' quarters, and objects of worship and power. A rare example of palace architecture.",
        },
      },
      {
        slug: "grande-mosquee-porto-novo",
        category: "RELIGION",
        name: "Grande Mosquée de Porto-Novo",
        summary: "Façade colorée de style afro-brésilien, inspirée des églises de Bahia.",
        description:
          "Construite au début du XXe siècle par des « Agoudas », descendants d'anciens esclaves revenus du Brésil, la Grande Mosquée reprend l'architecture des églises baroques de Bahia, avec sa façade colorée. Elle illustre l'héritage afro-brésilien de la ville. Visite extérieure ; l'intérieur se visite selon les règles de la communauté.",
        tips: "Tenue couvrante ; ne visitez pas pendant les prières.",
        visitMinutes: 30,
        lat: 6.4717,
        lng: 2.6281,
        cover: "/images/voyage/lieu-grande-mosquee-porto-novo",
        en: {
          name: "Great Mosque of Porto-Novo",
          summary: "Colourful Afro-Brazilian facade inspired by the churches of Bahia.",
          description:
            "Built in the early 20th century by the “Agoudas”, descendants of former slaves who returned from Brazil, the Great Mosque borrows the architecture of Bahia's baroque churches, with its colourful facade. It illustrates the city's Afro-Brazilian heritage. Viewed from outside; the interior may be visited according to the community's rules.",
          tips: "Wear covering clothes; do not visit during prayers.",
        },
      },
      {
        slug: "musee-da-silva",
        category: "MUSEUM",
        name: "Musée da Silva",
        summary: "Maison afro-brésilienne consacrée à l'histoire des retours du Brésil.",
        description:
          "Installé dans une belle demeure de style afro-brésilien, le musée da Silva évoque l'histoire des familles revenues du Brésil au XIXe siècle et leur influence sur l'architecture, la cuisine et la culture de la côte béninoise. Objets, photographies et mobilier d'époque.",
        visitMinutes: 60,
        lat: 6.4707,
        lng: 2.6203,
        cover: "/images/voyage/lieu-musee-da-silva",
        en: {
          name: "Da Silva Museum",
          summary: "Afro-Brazilian house devoted to the history of returnees from Brazil.",
          description:
            "Housed in a fine Afro-Brazilian-style mansion, the Da Silva museum tells the story of the families who returned from Brazil in the 19th century and their influence on the architecture, food and culture of the Beninese coast. Period objects, photographs and furniture.",
        },
      },
      {
        slug: "centre-songhai",
        category: "LEISURE",
        name: "Centre Songhaï",
        summary: "Ferme-école pionnière de l'agriculture durable, avec boutique et restaurant.",
        description:
          "Fondé à Porto-Novo dans les années 1980, le Centre Songhaï forme des jeunes agriculteurs et expérimente une agriculture intégrée (cultures, élevage, pisciculture, transformation) devenue un modèle en Afrique. La visite guidée montre les installations ; on peut ensuite déjeuner au restaurant et acheter les produits de la ferme.",
        visitMinutes: 120,
        lat: 6.4775,
        lng: 2.6206,
        cover: "/images/voyage/lieu-centre-songhai",
        en: {
          name: "Songhaï Centre",
          summary: "Pioneering sustainable-farming school with a shop and restaurant.",
          description:
            "Founded in Porto-Novo in the 1980s, the Songhaï Centre trains young farmers and experiments with integrated agriculture (crops, livestock, fish farming, processing) that has become a model across Africa. The guided tour shows the facilities; afterwards you can eat at the restaurant and buy farm produce.",
        },
      },
      {
        slug: "jardin-des-plantes-porto-novo",
        category: "NATURE",
        name: "Jardin des plantes et de la nature",
        summary: "Parc ombragé au cœur de la ville, avec une forêt sacrée et des singes.",
        description:
          "Au centre de Porto-Novo, ce jardin préserve un morceau de forêt où vivent des singes et des oiseaux, ainsi qu'une petite forêt sacrée. Une pause verte et fraîche entre deux visites.",
        visitMinutes: 45,
        lat: 6.4745,
        lng: 2.6152,
        cover: "/images/voyage/lieu-jardin-des-plantes-porto-novo",
        en: {
          name: "Botanical and Nature Garden",
          summary: "Shady park in the centre of town, with a sacred grove and monkeys.",
          description:
            "In the centre of Porto-Novo, this garden preserves a patch of forest home to monkeys and birds, as well as a small sacred grove. A cool green break between visits.",
        },
      },
    ],
  },
  {
    slug: "abomey",
    name: "Abomey",
    region: "Zou",
    summary: "Ancienne capitale du royaume du Danhomè et ses palais royaux classés à l'UNESCO.",
    description:
      "Du XVIIe au XIXe siècle, douze rois se sont succédé à Abomey, capitale du puissant royaume du Danhomè. Chacun fit bâtir son palais : l'ensemble des palais royaux, aux murs ornés de bas-reliefs racontant l'histoire du royaume, est inscrit au patrimoine mondial de l'UNESCO. Abomey est aussi réputée pour ses tentures appliquées et son artisanat. À environ 2 h 30 de route de Cotonou.",
    lat: 7.1829,
    lng: 1.9912,
    cover: "/images/voyage/abomey",
    en: {
      region: "Zou",
      summary: "Former capital of the Kingdom of Dahomey and its UNESCO-listed royal palaces.",
      description:
        "From the 17th to the 19th century, twelve kings succeeded one another in Abomey, capital of the powerful Kingdom of Danhomè. Each built his own palace: the royal palaces, whose walls are decorated with bas-reliefs telling the kingdom's history, are a UNESCO World Heritage Site. Abomey is also famous for its appliqué hangings and crafts. About 2 h 30 by road from Cotonou.",
    },
    places: [
      {
        slug: "palais-royaux-d-abomey",
        category: "HISTORY",
        name: "Palais royaux d'Abomey",
        summary: "Ensemble de palais royaux inscrit au patrimoine mondial de l'UNESCO.",
        description:
          "Les palais royaux d'Abomey couvrent un vaste domaine entouré de murs de terre. Les bas-reliefs polychromes de leurs façades racontent les hauts faits des rois du Danhomè et constituent un véritable livre d'histoire. Le site est inscrit au patrimoine mondial de l'UNESCO depuis 1985 et fait l'objet de grands travaux de valorisation.",
        tips: "Des travaux de rénovation et un nouveau musée sont en cours : renseignez-vous sur les parties ouvertes avant de venir.",
        visitMinutes: 120,
        lat: 7.1865,
        lng: 1.994,
        cover: "/images/voyage/lieu-palais-royaux-d-abomey",
        en: {
          name: "Royal Palaces of Abomey",
          summary: "Royal palace complex listed as a UNESCO World Heritage Site.",
          description:
            "The Royal Palaces of Abomey cover a vast estate surrounded by earthen walls. The polychrome bas-reliefs on their facades recount the deeds of the kings of Danhomè and form a true history book. The site has been a UNESCO World Heritage Site since 1985 and is undergoing major restoration.",
          tips: "Restoration work and a new museum are under way: check which parts are open before you go.",
        },
      },
      {
        slug: "artisans-d-abomey",
        category: "CULTURE",
        name: "Artisans d'Abomey",
        summary: "Tentures appliquées, bronzes et forgerons, héritiers des corporations royales.",
        description:
          "Les familles d'artisans d'Abomey perpétuent des savoir-faire autrefois au service des rois : tentures appliquées aux motifs symboliques, fonte du bronze à la cire perdue, forge. Plusieurs ateliers se visitent et vendent directement leurs créations.",
        visitMinutes: 60,
        cover: "/images/voyage/lieu-artisans-d-abomey",
        en: {
          name: "Abomey artisans",
          summary: "Appliqué hangings, bronzes and blacksmiths, heirs of the royal guilds.",
          description:
            "Abomey's artisan families carry on skills that once served the kings: appliqué hangings with symbolic motifs, lost-wax bronze casting, blacksmithing. Several workshops welcome visitors and sell their work directly.",
        },
      },
      {
        slug: "place-goho-abomey",
        category: "HISTORY",
        name: "Place Goho et statue de Béhanzin",
        summary: "Place historique dominée par la statue du roi Béhanzin, figure de la résistance à la conquête coloniale.",
        description:
          "À l'est du centre, sur la route de Bohicon, la place Goho rend hommage à Béhanzin, dernier roi indépendant du Danhomè, qui mena la résistance contre les troupes françaises de 1890 à 1894 avant d'être exilé en Martinique puis en Algérie. Sa statue, dressée sous un portique, porte une inscription rappelant son refus de céder l'indépendance du royaume. Les murs de la place sont ornés des emblèmes des rois d'Abomey : un bon point de départ avant la visite des palais.",
        visitMinutes: 30,
        lat: 7.1844,
        lng: 2.0076,
        cover: "/images/voyage/lieu-place-goho-abomey",
        en: {
          name: "Goho Square and Béhanzin statue",
          summary: "Historic square dominated by the statue of King Béhanzin, a figure of resistance to colonial conquest.",
          description:
            "East of the centre, on the road to Bohicon, Goho Square honours Béhanzin, the last independent king of Danhomè, who led the resistance against French troops from 1890 to 1894 before being exiled to Martinique and then Algeria. His statue, standing beneath a portico, bears an inscription recalling his refusal to give up the kingdom's independence. The walls of the square are decorated with the emblems of the kings of Abomey: a good starting point before visiting the palaces.",
        },
      },
      {
        slug: "village-souterrain-d-agongointo",
        category: "HISTORY",
        name: "Village souterrain d'Agongointo-Zoungoudo",
        summary: "Réseau d'habitations creusées sous terre, découvert en 1998 près de Bohicon.",
        description:
          "Mis au jour en 1998 lors de travaux routiers près de Bohicon, à une dizaine de kilomètres d'Abomey, ce site rassemble des dizaines de cavités creusées à une dizaine de mètres sous la surface, dans la terre rouge du plateau : pièces d'habitation, cuisines, puits et refuges de guerriers. Selon la tradition, elles remonteraient à l'époque des premiers rois du Danhomè, au XVIIe siècle. Le site figure sur la liste indicative du Bénin au patrimoine mondial de l'UNESCO, et la visite guidée permet de descendre dans un abri aménagé.",
        tips: "Accès par des puits étroits et pentus : déconseillé aux personnes claustrophobes ou à mobilité réduite ; prévoyez des chaussures fermées.",
        visitMinutes: 60,
        lat: 7.1891,
        lng: 2.084,
        cover: "/images/voyage/lieu-village-souterrain-d-agongointo",
        en: {
          name: "Agongointo-Zoungoudo underground village",
          summary: "A network of dwellings dug underground, discovered in 1998 near Bohicon.",
          description:
            "Uncovered in 1998 during roadworks near Bohicon, about ten kilometres from Abomey, this site brings together dozens of cavities dug some ten metres below the surface in the plateau's red earth: living rooms, kitchens, wells and warriors' refuges. According to tradition, they date back to the time of the first kings of Danhomè, in the 17th century. The site is on Benin's UNESCO World Heritage tentative list, and the guided tour lets you go down into a fitted-out shelter.",
          tips: "Access is through narrow, steep shafts: not advisable for claustrophobic people or those with reduced mobility; wear closed shoes.",
        },
      },
    ],
  },
  {
    slug: "grand-popo",
    name: "Grand-Popo",
    region: "Mono",
    summary: "Plages de sable bordées de cocotiers et embouchure du fleuve Mono.",
    description:
      "À l'ouest de Ouidah, près de la frontière togolaise, Grand-Popo est le rendez-vous balnéaire du Bénin : longues plages de sable, cocoteraies, petits hôtels et maquis de poisson grillé. Non loin, la Bouche du Roy, où le fleuve Mono rejoint l'océan, se découvre en pirogue. Attention : la mer est dangereuse pour la baignade.",
    lat: 6.2833,
    lng: 1.8333,
    cover: "/images/voyage/grand-popo",
    en: {
      region: "Mono",
      summary: "Palm-fringed sandy beaches and the mouth of the Mono river.",
      description:
        "West of Ouidah, near the Togolese border, Grand-Popo is Benin's seaside getaway: long sandy beaches, coconut groves, small hotels and grilled-fish maquis. Nearby, the Bouche du Roy, where the Mono river meets the ocean, can be explored by pirogue. Note: the sea is dangerous for swimming.",
    },
    places: [
      {
        slug: "plage-de-grand-popo",
        category: "BEACH",
        name: "Plage de Grand-Popo",
        summary: "Grande plage sauvage, idéale pour se reposer à l'ombre des cocotiers.",
        description:
          "La plage de Grand-Popo s'étend sur des kilomètres entre océan et lagune. On y vient pour le calme, les couchers de soleil et le poisson grillé. Les hôtels et campements en bord de plage permettent de profiter du lieu sur plusieurs jours.",
        tips: "Baignade fortement déconseillée (rouleaux et courants violents).",
        visitMinutes: 240,
        lat: 6.2789,
        lng: 1.8238,
        cover: "/images/voyage/lieu-plage-de-grand-popo",
        en: {
          name: "Grand-Popo Beach",
          summary: "Long, wild beach, ideal for relaxing in the shade of the palms.",
          description:
            "Grand-Popo beach stretches for kilometres between ocean and lagoon. People come for the calm, the sunsets and the grilled fish. Beachfront hotels and camps let you enjoy the place over several days.",
          tips: "Swimming is strongly discouraged (big waves and violent currents).",
        },
      },
      {
        slug: "bouche-du-roy",
        category: "NATURE",
        name: "Bouche du Roy",
        summary: "Embouchure du Mono, mangroves et villages de pêcheurs, à découvrir en pirogue.",
        description:
          "La Bouche du Roy est l'embouchure du fleuve Mono dans l'océan. Une excursion en pirogue traverse mangroves et chenaux jusqu'aux villages de pêcheurs et aux bancs de sable. La zone fait partie d'une réserve de biosphère transfrontalière avec le Togo (delta du Mono).",
        visitMinutes: 180,
        lat: 6.2586,
        lng: 1.9128,
        cover: "/images/voyage/lieu-bouche-du-roy",
        en: {
          name: "Bouche du Roy",
          summary: "Mouth of the Mono river, mangroves and fishing villages, explored by pirogue.",
          description:
            "The Bouche du Roy is where the Mono river flows into the ocean. A pirogue trip crosses mangroves and channels to fishing villages and sandbanks. The area is part of a cross-border biosphere reserve with Togo (Mono delta).",
        },
      },
    ],
  },
  {
    slug: "possotome",
    name: "Possotomè et le lac Ahémé",
    region: "Mono",
    summary: "Villages de pêcheurs au bord du lac Ahémé, réputés pour leurs sources d'eau minérale.",
    description:
      "Sur la rive ouest du lac Ahémé, Possotomè est connu pour ses sources d'eau minérale et ses campements tranquilles. On y découvre la pêche traditionnelle en pirogue, les plantes médicinales, les villages voisins et des balades à vélo dans la campagne. Une étape reposante entre Ouidah et Abomey.",
    lat: 6.5167,
    lng: 1.9833,
    cover: "/images/voyage/possotome",
    en: {
      name: "Possotomè and Lake Ahémé",
      region: "Mono",
      summary: "Fishing villages on the shores of Lake Ahémé, known for their mineral springs.",
      description:
        "On the western shore of Lake Ahémé, Possotomè is known for its mineral springs and peaceful lodges. You can discover traditional pirogue fishing, medicinal plants and neighbouring villages, and cycle through the countryside. A relaxing stop between Ouidah and Abomey.",
    },
    places: [
      {
        slug: "lac-aheme",
        category: "NATURE",
        name: "Lac Ahémé",
        summary: "Grand lac paisible : sorties en pirogue avec les pêcheurs, villages lacustres.",
        description:
          "Le lac Ahémé, long d'une vingtaine de kilomètres, fait vivre de nombreux villages de pêcheurs. Les campements proposent des sorties en pirogue à l'aube pour découvrir la pêche à l'épervier et les acadjas, ainsi que des marches vers les villages voisins.",
        visitMinutes: 180,
        lat: 6.5,
        lng: 1.97,
        cover: "/images/voyage/lieu-lac-aheme",
        en: {
          name: "Lake Ahémé",
          summary: "Large, peaceful lake: pirogue outings with fishermen, lakeside villages.",
          description:
            "Lake Ahémé, some twenty kilometres long, supports many fishing villages. Lodges offer dawn pirogue trips to see cast-net fishing and acadjas (fish enclosures), as well as walks to nearby villages.",
        },
      },
    ],
  },
  {
    slug: "dassa-zoume",
    name: "Dassa-Zoumè",
    region: "Collines",
    summary: "La ville aux 41 collines et l'un des grands lieux de pèlerinage d'Afrique de l'Ouest.",
    description:
      "Au centre du pays, Dassa-Zoumè est entourée de collines granitiques que l'on peut gravir pour de beaux panoramas. La grotte mariale d'Arigbo y attire chaque année, en août, des foules de pèlerins venus de toute la sous-région. Une étape naturelle sur la route du nord.",
    lat: 7.75,
    lng: 2.1833,
    cover: "/images/voyage/dassa-zoume",
    en: {
      region: "Collines",
      summary: "The town of 41 hills and one of West Africa's great pilgrimage sites.",
      description:
        "In the centre of the country, Dassa-Zoumè is surrounded by granite hills that can be climbed for fine views. Every August, the Marian grotto of Arigbo draws crowds of pilgrims from across the region. A natural stop on the road north.",
    },
    places: [
      {
        slug: "grotte-notre-dame-d-arigbo",
        category: "RELIGION",
        name: "Grotte Notre-Dame d'Arigbo",
        summary: "Sanctuaire marial au pied des collines, grand pèlerinage chaque mois d'août.",
        description:
          "Le sanctuaire marial d'Arigbo s'est développé autour d'une grotte au pied des collines, devenue lieu de pèlerinage en 1954. Le pèlerinage marial national, un week-end de la seconde moitié d'août, rassemble des centaines de milliers de fidèles venus de tous les diocèses du Bénin et des pays voisins. Le reste de l'année, le site est calme et se visite librement.",
        bestPeriod: "Pèlerinage national un week-end de la seconde moitié d'août ; site calme le reste de l'année",
        visitMinutes: 60,
        lat: 7.7738,
        lng: 2.1839,
        cover: "/images/voyage/lieu-grotte-notre-dame-d-arigbo",
        en: {
          name: "Our Lady of Arigbo Grotto",
          summary: "Marian shrine at the foot of the hills, with a major pilgrimage every August.",
          description:
            "The Marian shrine of Arigbo grew up around a grotto at the foot of the hills, which became a place of pilgrimage in 1954. The national Marian pilgrimage, held over a weekend in the second half of August, gathers hundreds of thousands of faithful from all of Benin's dioceses and from neighbouring countries. The rest of the year the site is quiet and open to visitors.",
          bestPeriod: "National pilgrimage over a weekend in the second half of August; quiet the rest of the year",
        },
      },
      {
        slug: "collines-de-dassa",
        category: "NATURE",
        name: "Collines de Dassa",
        summary: "Randonnées sur les collines granitiques et panoramas sur la région.",
        description:
          "Les collines rocheuses qui entourent Dassa-Zoumè se prêtent à de courtes randonnées. Certaines abritent des sites sacrés et d'anciens refuges des populations locales. Partez tôt le matin avec un guide local, de bonnes chaussures et de l'eau.",
        visitMinutes: 150,
        cover: "/images/voyage/lieu-collines-de-dassa",
        en: {
          name: "Dassa hills",
          summary: "Hikes on the granite hills and views over the region.",
          description:
            "The rocky hills around Dassa-Zoumè are ideal for short hikes. Some shelter sacred sites and old refuges of the local people. Set off early in the morning with a local guide, good shoes and water.",
        },
      },
    ],
  },
  {
    slug: "natitingou",
    name: "Natitingou et l'Atacora",
    region: "Atacora",
    summary: "Montagnes de l'Atacora, cascades et maisons-forteresses Tata Somba.",
    description:
      "Capitale du nord-ouest, Natitingou est la porte de l'Atacora, région de reliefs et de vallées où vivent notamment les Batammariba. Leurs maisons-forteresses à tourelles, les Tata Somba, comptent parmi les architectures de terre les plus étonnantes d'Afrique, et cascades, marchés et randonnées complètent la découverte. Le département de l'Atacora fait toutefois aujourd'hui l'objet d'avertissements officiels liés au risque terroriste (voir la rubrique Sécurité) : renseignez-vous avant tout projet.",
    lat: 10.3042,
    lng: 1.3796,
    cover: "/images/voyage/natitingou",
    en: {
      name: "Natitingou and the Atacora",
      region: "Atacora",
      summary: "The Atacora mountains, waterfalls and Tata Somba fortress houses.",
      description:
        "The capital of the north-west, Natitingou is the gateway to the Atacora, a region of hills and valleys home to the Batammariba among others. Their turreted fortress houses, the Tata Somba, are among the most astonishing earthen architecture in Africa, and waterfalls, markets and hikes round off the visit. The Atacora department is, however, currently subject to official warnings because of the terrorist threat (see Safety and security): check before planning anything.",
    },
    places: [
      {
        slug: "tata-somba",
        category: "CULTURE",
        name: "Tata Somba",
        summary: "Maisons-forteresses de terre à tourelles, dans la région de Boukoumbé.",
        description:
          "Les tata (ou takienta) sont les habitations traditionnelles des Batammariba : de véritables petits châteaux de terre à étages et tourelles, qui abritent hommes, réserves et animaux. On en visite dans la région de Boukoumbé et autour de Natitingou, accompagné d'un guide qui explique leur symbolique. Le paysage culturel voisin du Koutammakou, côté togolais, est inscrit à l'UNESCO.",
        tips: "Une participation est généralement demandée par la famille qui vous reçoit ; passez par un guide local.",
        visitMinutes: 180,
        lat: 10.18,
        lng: 1.1,
        cover: "/images/voyage/lieu-tata-somba",
        en: {
          summary: "Turreted earthen fortress houses, in the Boukoumbé area.",
          description:
            "Tata (or takienta) are the traditional homes of the Batammariba: real little earthen castles with storeys and turrets, housing people, food stores and animals. You can visit some around Boukoumbé and Natitingou with a guide who explains their symbolism. The neighbouring cultural landscape of Koutammakou, on the Togolese side, is a UNESCO World Heritage Site.",
          tips: "The family hosting you usually asks for a contribution; go through a local guide.",
        },
      },
      {
        slug: "cascade-de-kota",
        category: "NATURE",
        name: "Cascade de Kota",
        summary: "Chute d'eau et bassin naturel à une quinzaine de kilomètres de Natitingou.",
        description:
          "Nichée dans une vallée verdoyante près de Natitingou, la cascade de Kota tombe dans un bassin naturel. Un lieu prisé pour une balade et un pique-nique, plus spectaculaire pendant et juste après la saison des pluies.",
        bestPeriod: "Août à novembre (débit plus fort)",
        visitMinutes: 120,
        lat: 10.2,
        lng: 1.45,
        cover: "/images/voyage/lieu-cascade-de-kota",
        en: {
          name: "Kota Waterfall",
          summary: "Waterfall and natural pool some fifteen kilometres from Natitingou.",
          description:
            "Tucked in a green valley near Natitingou, Kota waterfall drops into a natural pool. A popular spot for a walk and a picnic, most spectacular during and just after the rainy season.",
          bestPeriod: "August to November (stronger flow)",
        },
      },
      {
        slug: "musee-regional-natitingou",
        category: "MUSEUM",
        name: "Musée régional de Natitingou",
        summary: "Introduction aux peuples et à l'architecture du nord-ouest du Bénin.",
        description:
          "Le musée régional présente les cultures de l'Atacora : habitat traditionnel (dont des maquettes de tata), objets du quotidien, instruments de musique, parures. Une bonne introduction avant de partir à la rencontre des villages.",
        visitMinutes: 60,
        cover: "/images/voyage/lieu-musee-regional-natitingou",
        en: {
          name: "Natitingou Regional Museum",
          summary: "An introduction to the peoples and architecture of north-west Benin.",
          description:
            "The regional museum presents the cultures of the Atacora: traditional housing (including models of tata), everyday objects, musical instruments, ornaments. A good introduction before heading out to the villages.",
        },
      },
    ],
  },
  {
    slug: "pendjari",
    name: "Parc national de la Pendjari",
    region: "Atacora",
    summary: "L'un des derniers grands refuges de faune d'Afrique de l'Ouest : éléphants, lions, buffles.",
    description:
      "Au nord-ouest du pays, le parc national de la Pendjari fait partie du complexe W-Arly-Pendjari, inscrit au patrimoine mondial de l'UNESCO. Savanes, forêts galeries et mares y abritent éléphants, buffles, hippopotames, antilopes et, plus discrets, lions et autres grands félins. Le parc et ses abords sont actuellement formellement déconseillés par plusieurs gouvernements en raison du risque terroriste : cette fiche présente le site pour le jour où les conditions permettront à nouveau de le visiter.",
    lat: 11.1,
    lng: 1.5,
    cover: "/images/voyage/pendjari",
    en: {
      name: "Pendjari National Park",
      region: "Atacora",
      summary: "One of West Africa's last great wildlife refuges: elephants, lions, buffalo.",
      description:
        "In the north-west of the country, Pendjari National Park is part of the W-Arly-Pendjari complex, a UNESCO World Heritage Site. Its savannahs, gallery forests and waterholes are home to elephants, buffalo, hippos, antelopes and, more elusive, lions and other big cats. Several governments currently advise against all travel to the park and its surroundings because of the terrorist threat: this page presents the site for the day when conditions allow it to be visited again.",
    },
    places: [
      {
        slug: "safari-pendjari",
        category: "NATURE",
        name: "Safari dans la Pendjari",
        summary: "Observation de la faune en véhicule, autour des mares et le long de la rivière.",
        description:
          "Les pistes du parc mènent aux mares où les animaux viennent boire, surtout en fin de saison sèche. Partez à l'aube ou en fin d'après-midi, moments les plus favorables à l'observation. L'entrée et les circuits se font selon les règles fixées par le gestionnaire du parc : renseignez-vous sur les conditions de visite et de sécurité avant de partir.",
        tips: "Visite actuellement formellement déconseillée (risque terroriste) : consultez les conseils aux voyageurs officiels avant tout projet.",
        bestPeriod: "Décembre à mai (saison sèche)",
        visitMinutes: 480,
        lat: 11.1,
        lng: 1.5,
        cover: "/images/voyage/lieu-safari-pendjari",
        en: {
          name: "Pendjari safari",
          summary: "Wildlife viewing by vehicle, around the waterholes and along the river.",
          description:
            "The park's tracks lead to waterholes where animals come to drink, especially at the end of the dry season. Set out at dawn or in late afternoon, the best times for viewing. Entry and routes follow the rules set by the park's managers: check visiting and safety conditions before you go.",
          tips: "Several governments currently advise against all travel here (terrorist threat): check official travel advice before planning anything.",
          bestPeriod: "December to May (dry season)",
        },
      },
      {
        slug: "cascades-de-tanougou",
        category: "NATURE",
        name: "Cascades de Tanougou",
        summary: "Chutes d'eau et bassins au pied de la chaîne de l'Atacora, près du parc.",
        description:
          "Sur la route de la Pendjari, les cascades de Tanougou dévalent les falaises de l'Atacora en plusieurs bassins où l'on peut se rafraîchir. Une halte agréable avant ou après le safari.",
        tips: "Visite actuellement formellement déconseillée (risque terroriste) : consultez les conseils aux voyageurs officiels avant tout projet.",
        visitMinutes: 120,
        lat: 10.8,
        lng: 1.43,
        cover: "/images/voyage/lieu-cascades-de-tanougou",
        en: {
          name: "Tanougou Falls",
          summary: "Waterfalls and pools at the foot of the Atacora range, near the park.",
          description:
            "On the road to Pendjari, the Tanougou falls tumble down the Atacora cliffs into several pools where you can cool off. A pleasant stop before or after a safari.",
          tips: "Several governments currently advise against all travel here (terrorist threat): check official travel advice before planning anything.",
        },
      },
    ],
  },
];

export const BENIN_CIRCUITS: SeedCircuit[] = [
  {
    slug: "benin-essentiel-7-jours",
    title: "Le Bénin essentiel en 7 jours",
    summary:
      "Une semaine dans le sud : Cotonou et ses marchés, la cité lacustre de Ganvié, Porto-Novo, la mémoire de Ouidah, les plages de Grand-Popo, le lac Ahémé et les palais royaux d'Abomey.",
    days: 7,
    cover: "/images/voyage/ganvie",
    en: {
      title: "Essential Benin in 7 days",
      summary:
        "A week in the south: Cotonou and its markets, the lake village of Ganvié, Porto-Novo, the memory of Ouidah, the beaches of Grand-Popo, Lake Ahémé and the royal palaces of Abomey.",
    },
    steps: [
      { day: 1, place: "marche-dantokpa", note: "Arrivée, installation et premier contact avec la ville.", noteEn: "Arrival, check-in and a first feel for the city." },
      { day: 1, place: "place-de-l-amazone" },
      { day: 2, place: "cite-lacustre-de-ganvie", note: "Matinée en pirogue sur le lac Nokoué.", noteEn: "Morning by pirogue on Lake Nokoué." },
      { day: 2, place: "musee-honme", note: "Après-midi à Porto-Novo.", noteEn: "Afternoon in Porto-Novo." },
      { day: 2, place: "grande-mosquee-porto-novo" },
      { day: 3, place: "musee-d-histoire-de-ouidah" },
      { day: 3, place: "temple-des-pythons" },
      { day: 3, place: "route-des-esclaves" },
      { day: 3, place: "porte-du-non-retour" },
      { day: 4, place: "plage-de-grand-popo", note: "Route vers l'ouest et repos en bord de mer.", noteEn: "Drive west and rest by the sea." },
      { day: 4, place: "bouche-du-roy" },
      { day: 5, place: "lac-aheme", note: "Sortie en pirogue au lever du jour, puis route vers Abomey.", noteEn: "Dawn pirogue trip, then drive to Abomey." },
      { day: 6, place: "palais-royaux-d-abomey" },
      { day: 6, place: "artisans-d-abomey" },
      { day: 7, destination: "cotonou", note: "Retour à Cotonou, derniers achats au centre artisanal.", noteEn: "Back to Cotonou, last shopping at the crafts centre." },
      { day: 7, place: "centre-artisanal-cotonou" },
    ],
  },
];
