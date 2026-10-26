/**
 * Contenu de départ du guide Côte d'Ivoire (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 * Sécurité : conseils France Diplomatie et FCDO consultés en octobre 2026
 * (nord du Zanzan, est des Savanes, parc de la Comoé et frontières avec le Mali
 * et le Burkina Faso formellement déconseillés ; frontière libérienne
 * déconseillée sauf raison impérative) → aucun circuit dans ces zones.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const COTE_IVOIRE_GUIDE: SeedGuide = {
  country: "CI",
  intro:
    "Des tours du Plateau d'Abidjan aux maisons coloniales de Grand-Bassam, des plages bordées de cocotiers d'Assinie à la basilique monumentale de Yamoussoukro et aux montagnes de Man, la Côte d'Ivoire mêle énergie urbaine, patrimoine, forêts et une scène musicale et culinaire qui rayonne dans toute l'Afrique de l'Ouest.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs qui ne sont pas ressortissants de la CEDEAO ; une procédure en ligne existe sur le portail officiel des autorités ivoiriennes. Les modalités évoluent régulièrement : vérifiez toujours les conditions à jour auprès des sources officielles (ambassade, site gouvernemental) avant le départ : passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Buvez de l'eau en bouteille. Des contrôles sanitaires renforcés peuvent être mis en place aux frontières selon la situation épidémique régionale : renseignez-vous avant le départ.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les espèces restent indispensables hors d'Abidjan ; le paiement mobile (mobile money) est omniprésent, y compris chez les petits commerçants. Les cartes bancaires sont acceptées dans les hôtels, supermarchés et restaurants importants d'Abidjan, et les distributeurs y sont nombreux.",
    },
    {
      title: "Quand partir",
      body: "Le sud connaît une grande saison des pluies (environ avril–juillet) et une petite (environ octobre–novembre) ; le centre et le nord ont un climat plus contrasté, avec une seule saison des pluies. La période la plus agréable va de décembre à mars, saison sèche, avec l'harmattan (vent sec et poussiéreux) surtout dans le centre et le nord. Il fait chaud et humide toute l'année sur la côte.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue officielle ; le dioula sert de langue véhiculaire, et le baoulé, le bété, le sénoufo, le dan (yacouba) et des dizaines d'autres langues sont parlés au quotidien. À Abidjan, vous entendrez le nouchi, l'argot urbain. Saluer avant toute demande est essentiel. Dans les lieux sacrés et lors des fêtes traditionnelles, suivez les consignes de vos hôtes et demandez avant de photographier une personne ou une cérémonie.",
    },
    {
      title: "Se déplacer",
      body: "À Abidjan, on circule en taxi compteur (taxis orange), en « wôrô-wôrô » (taxis collectifs à itinéraire fixe), en gbaka (minibus) ou en bateau-bus sur la lagune. Entre les villes, des compagnies d'autocars desservent tout le pays ; l'autoroute du Nord relie Abidjan à Yamoussoukro. Pour l'intérieur et l'ouest, une voiture avec chauffeur est conseillée. Évitez de rouler de nuit.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C et E (prises européennes). Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money ; la couverture est bonne dans les villes et le long des grands axes.",
    },
    {
      title: "Sécurité",
      body: "L'essentiel du pays, dont Abidjan, le littoral, Yamoussoukro et la région de Man, se visite avec une vigilance renforcée. En revanche, la France et le Royaume-Uni déconseillent formellement de se rendre dans les zones frontalières du Mali et du Burkina Faso, le nord du district du Zanzan, l'est du district des Savanes et le parc national de la Comoé (risque terroriste et d'enlèvement) ; les abords de la frontière libérienne (régions de Tabou, Taï et Grabo) sont déconseillés sauf raison impérative. À Abidjan, la petite délinquance existe : évitez de circuler seul la nuit dans certaines communes populaires, ne montrez pas d'objets de valeur et soyez attentif près des distributeurs. La mer et les lagunes sont dangereuses (courants, rouleaux, plages peu surveillées) : les noyades sont fréquentes. Consultez avant et pendant le voyage les conseils aux voyageurs de France Diplomatie et du FCDO britannique, qui évoluent.",
    },
  ],
  en: {
    intro:
      "From the towers of Abidjan's Plateau to the colonial houses of Grand-Bassam, from the palm-lined beaches of Assinie to Yamoussoukro's monumental basilica and the mountains of Man, Côte d'Ivoire blends urban energy, heritage, forests and a music and food scene that shines across West Africa.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers who are not ECOWAS nationals need a visa; an online procedure is available on the Ivorian authorities' official portal. Arrangements change regularly: always check current requirements with official sources (embassy, government website) before leaving: passport valid for several months after your return, return ticket, accommodation address.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). Drink bottled water. Enhanced health screening may be in place at borders depending on the regional epidemic situation: check before you go.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). Cash remains essential outside Abidjan; mobile money is everywhere, even with small traders. Bank cards are accepted in hotels, supermarkets and larger restaurants in Abidjan, where cash machines are plentiful.",
      },
      {
        title: "When to go",
        body: "The south has a long rainy season (roughly April–July) and a short one (roughly October–November); the centre and north have a more contrasting climate with a single rainy season. The most pleasant period is December to March, the dry season, with the harmattan (a dry, dusty wind) mainly in the centre and north. The coast is hot and humid all year round.",
      },
      {
        title: "Languages and customs",
        body: "French is the official language; Dioula is the lingua franca, and Baoulé, Bété, Senufo, Dan (Yacouba) and dozens of other languages are spoken daily. In Abidjan you will hear Nouchi, the city's slang. Greeting people before asking anything is essential. In sacred places and at traditional festivals, follow your hosts' instructions and ask before photographing a person or a ceremony.",
      },
      {
        title: "Getting around",
        body: "In Abidjan you get around by metered taxi (orange taxis), “woro-woro” (shared taxis on fixed routes), gbaka (minibuses) or water bus on the lagoon. Between cities, coach companies serve the whole country; the northern motorway links Abidjan to Yamoussoukro. For the interior and the west, a car with a driver is recommended. Avoid driving at night.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C and E plugs (European sockets). A local SIM card (ID required) gives access to mobile internet and mobile money; coverage is good in towns and along the main roads.",
      },
      {
        title: "Safety",
        body: "Most of the country, including Abidjan, the coast, Yamoussoukro and the Man region, can be visited with heightened vigilance. However, France and the United Kingdom advise against all travel to the border areas with Mali and Burkina Faso, the north of the Zanzan district, the east of the Savanes district and Comoé National Park (risk of terrorism and kidnapping); the areas near the Liberian border (Tabou, Taï and Grabo) are advised against except for essential travel. Petty crime exists in Abidjan: avoid walking alone at night in some working-class districts, keep valuables out of sight and be careful near cash machines. The sea and lagoons are dangerous (currents, big waves, rarely supervised beaches): drownings are frequent. Check the travel advice of France Diplomatie and the UK FCDO before and during your trip, as it changes.",
      },
    ],
  },
};

export const COTE_IVOIRE_DESTINATIONS: SeedDestination[] = [
  {
    slug: "abidjan",
    name: "Abidjan",
    region: "District autonome d'Abidjan",
    summary: "Métropole lagunaire trépidante : gratte-ciel du Plateau, forêt urbaine, maquis et musique.",
    description:
      "Capitale économique et plus grande ville du pays, Abidjan s'étire autour de la lagune Ébrié. Le Plateau, quartier d'affaires aux tours modernes, fait face aux communes populaires de Treichville et d'Adjamé et aux quartiers résidentiels de Cocody. On y vient pour l'énergie de la ville, ses musées, sa forêt primaire en pleine agglomération, ses maquis où goûter l'attiéké et le poisson braisé, et une scène musicale foisonnante (coupé-décalé, zouglou), célébrée notamment chaque année par le FEMUA. C'est la base idéale pour rayonner vers Grand-Bassam et Assinie.",
    lat: 5.36,
    lng: -4.0083,
    cover: "/images/voyage/abidjan",
    en: {
      region: "Abidjan Autonomous District",
      summary: "Bustling lagoon metropolis: Plateau skyscrapers, an urban forest, maquis and music.",
      description:
        "The economic capital and largest city in the country, Abidjan stretches around the Ébrié lagoon. The Plateau, a business district of modern towers, faces the working-class districts of Treichville and Adjamé and the residential neighbourhoods of Cocody. People come for the city's energy, its museums, a primary forest right inside the urban area, its maquis (local eateries) serving attiéké and grilled fish, and a thriving music scene (coupé-décalé, zouglou), celebrated every year at the FEMUA festival among others. It is the ideal base for trips to Grand-Bassam and Assinie.",
    },
    places: [
      {
        slug: "cathedrale-saint-paul-abidjan",
        category: "RELIGION",
        name: "Cathédrale Saint-Paul",
        summary: "Cathédrale à l'architecture audacieuse, dressée au bord de la lagune au Plateau.",
        description:
          "Œuvre de l'architecte italien Aldo Spirito, la cathédrale Saint-Paul d'Abidjan est reconnaissable à sa haute flèche inclinée, évoquant la silhouette de l'apôtre, d'où partent des haubans qui soutiennent la nef. Consacrée par le pape Jean-Paul II dans les années 1980, elle abrite de grands vitraux colorés mêlant scènes bibliques et motifs africains. Belle vue sur la lagune et le Plateau.",
        tips: "Tenue correcte ; évitez les visites pendant les offices.",
        visitMinutes: 45,
        en: {
          name: "St Paul's Cathedral",
          summary: "Daringly designed cathedral standing on the lagoon shore in the Plateau.",
          description:
            "Designed by the Italian architect Aldo Spirito, Abidjan's St Paul's Cathedral is recognisable by its tall, slanting spire, evoking the figure of the apostle, from which cables run to support the nave. Consecrated by Pope John Paul II in the 1980s, it has large colourful stained-glass windows combining biblical scenes and African motifs. Fine views over the lagoon and the Plateau.",
          tips: "Dress respectfully; avoid visiting during services.",
        },
      },
      {
        slug: "musee-des-civilisations-de-cote-d-ivoire",
        category: "MUSEUM",
        name: "Musée des civilisations de Côte d'Ivoire",
        summary: "Le grand musée national : masques, statuaire, objets rituels et du quotidien.",
        description:
          "Installé au Plateau, le musée des civilisations de Côte d'Ivoire présente l'une des plus riches collections d'art et d'ethnographie du pays : masques et statues des peuples dan, baoulé, sénoufo, gouro ou akan, objets en or, instruments de musique, textiles. Une excellente introduction à la diversité culturelle ivoirienne avant de partir vers l'intérieur.",
        visitMinutes: 90,
        en: {
          name: "Museum of Civilisations of Côte d'Ivoire",
          summary: "The great national museum: masks, statuary, ritual and everyday objects.",
          description:
            "Located in the Plateau, the Museum of Civilisations of Côte d'Ivoire holds one of the country's richest art and ethnographic collections: masks and statues of the Dan, Baoulé, Senufo, Guro and Akan peoples, gold objects, musical instruments and textiles. An excellent introduction to Ivorian cultural diversity before heading inland.",
        },
      },
      {
        slug: "parc-national-du-banco",
        category: "NATURE",
        name: "Parc national du Banco",
        summary: "Forêt primaire protégée en pleine ville, parcourue de sentiers.",
        description:
          "Enclavé dans l'agglomération d'Abidjan, le parc national du Banco protège une forêt tropicale ancienne aux arbres géants, traversée par la rivière Banco. Des sentiers permettent de se promener à l'ombre, d'observer oiseaux et petits mammifères et de prendre la mesure de la forêt qui couvrait autrefois tout le sud du pays. À sa lisière, les fanicos, blanchisseurs traditionnels, lavent le linge à la main dans la rivière.",
        tips: "Venez tôt le matin, avec de bonnes chaussures et un guide du parc ; ne vous aventurez pas seul hors des sentiers.",
        visitMinutes: 150,
        lat: 5.39,
        lng: -4.05,
        en: {
          name: "Banco National Park",
          summary: "Protected primary forest in the middle of the city, crossed by trails.",
          description:
            "Hemmed in by greater Abidjan, Banco National Park protects an old tropical forest of giant trees, crossed by the Banco river. Trails let you walk in the shade, watch birds and small mammals, and get a sense of the forest that once covered the whole south of the country. On its edge, the fanicos, traditional launderers, wash clothes by hand in the river.",
          tips: "Come early in the morning, with good shoes and a park guide; do not wander off the trails alone.",
        },
      },
      {
        slug: "maquis-et-attieke-abidjan",
        category: "GASTRONOMY",
        name: "Maquis et attiéké",
        summary: "Poisson braisé, alloco et attiéké dans les maquis, cœur de la vie abidjanaise.",
        description:
          "Le maquis, restaurant populaire souvent en plein air, est une institution ivoirienne. On y mange du poisson ou du poulet braisé avec de l'attiéké (semoule de manioc fermentée), de l'alloco (banane plantain frite), de la sauce graine ou du kédjénou (ragoût mijoté en canari), accompagnés de jus de bissap ou de gnamankoudji (gingembre). Le garba, attiéké au thon frit, est le plat de rue par excellence. Les maquis animés de Treichville, de Marcory ou de la rue Princesse à Yopougon sont aussi des lieux de musique.",
        tips: "Le soir, déplacez-vous en taxi plutôt qu'à pied, surtout dans les communes populaires.",
        visitMinutes: 120,
        en: {
          name: "Maquis and attiéké",
          summary: "Grilled fish, alloco and attiéké in the maquis, the heart of Abidjan life.",
          description:
            "The maquis, a popular, often open-air restaurant, is an Ivorian institution. You eat grilled fish or chicken with attiéké (fermented cassava couscous), alloco (fried plantain), sauce graine (palm-nut sauce) or kedjenou (a stew slow-cooked in a clay pot), washed down with bissap or gnamankoudji (ginger) juice. Garba, attiéké with fried tuna, is the quintessential street dish. The lively maquis of Treichville, Marcory or Rue Princesse in Yopougon are also music venues.",
          tips: "In the evening, take a taxi rather than walking, especially in working-class districts.",
        },
      },
    ],
  },
  {
    slug: "grand-bassam",
    name: "Grand-Bassam",
    region: "Sud-Comoé",
    summary: "Première capitale coloniale, au quartier historique classé à l'UNESCO, entre lagune et océan.",
    description:
      "À une quarantaine de kilomètres à l'est d'Abidjan, Grand-Bassam fut la première capitale de la colonie à la fin du XIXe siècle. Son quartier France, inscrit au patrimoine mondial de l'UNESCO en 2012 sous le nom de « Ville historique de Grand-Bassam », conserve des bâtiments coloniaux aux balcons de fer et aux façades délavées, entre la lagune Ouladine et l'océan. Le quartier Impérial et le village N'zima complètent la ville, connue aussi pour ses plages du week-end, ses artisans et sa grande fête de l'Abissa.",
    lat: 5.2118,
    lng: -3.7388,
    en: {
      region: "Sud-Comoé",
      summary: "The first colonial capital, with a UNESCO-listed historic quarter between lagoon and ocean.",
      description:
        "Some forty kilometres east of Abidjan, Grand-Bassam was the colony's first capital at the end of the 19th century. Its Quartier France, inscribed on the UNESCO World Heritage List in 2012 as the “Historic Town of Grand-Bassam”, preserves colonial buildings with iron balconies and faded facades between the Ouladine lagoon and the ocean. The Quartier Impérial and the N'zima village complete the town, also known for its weekend beaches, its artisans and its great Abissa festival.",
    },
    places: [
      {
        slug: "quartier-france-grand-bassam",
        category: "HISTORY",
        name: "Quartier France",
        summary: "Ancien centre administratif et commercial colonial, inscrit au patrimoine mondial.",
        description:
          "Coincé entre lagune et océan, le quartier France rassemble les anciens bâtiments administratifs, maisons de commerce et demeures coloniales qui firent de Grand-Bassam le premier port et la première capitale du pays. Certains ont été restaurés, d'autres tombent en ruine, ce qui donne au lieu son atmosphère singulière. Une balade à pied, idéalement avec un guide, permet de comprendre l'organisation de la ville coloniale et la cohabitation avec le village N'zima voisin.",
        tips: "Promenez-vous le matin ou en fin d'après-midi, quand la lumière est douce et la chaleur moins forte.",
        visitMinutes: 120,
        lat: 5.1975,
        lng: -3.7364,
        en: {
          name: "Quartier France",
          summary: "Former colonial administrative and trading centre, a World Heritage Site.",
          description:
            "Squeezed between lagoon and ocean, the Quartier France brings together the old administrative buildings, trading houses and colonial mansions that made Grand-Bassam the country's first port and first capital. Some have been restored, others are crumbling, which gives the place its unique atmosphere. A walk, ideally with a guide, explains how the colonial town was organised and how it coexisted with the neighbouring N'zima village.",
          tips: "Walk in the morning or late afternoon, when the light is soft and the heat less intense.",
        },
      },
      {
        slug: "musee-national-du-costume-grand-bassam",
        category: "MUSEUM",
        name: "Musée national du costume",
        summary: "Dans l'ancien palais des gouverneurs, costumes, parures et coiffures des peuples ivoiriens.",
        description:
          "Installé dans l'ancien palais des gouverneurs, bâtiment colonial emblématique du quartier France, le musée national du costume présente vêtements traditionnels, parures, coiffures et objets de cérémonie des différentes régions du pays, ainsi que des photographies anciennes et des maquettes d'habitat. Une visite courte et très instructive.",
        visitMinutes: 60,
        en: {
          name: "National Costume Museum",
          summary: "In the former governors' palace: costumes, ornaments and hairstyles of Ivorian peoples.",
          description:
            "Housed in the former governors' palace, an emblematic colonial building in the Quartier France, the National Costume Museum displays traditional clothing, ornaments, hairstyles and ceremonial objects from the country's different regions, along with old photographs and models of traditional housing. A short and very informative visit.",
        },
      },
      {
        slug: "plage-de-grand-bassam",
        category: "BEACH",
        name: "Plage de Grand-Bassam",
        summary: "Longue plage de sable bordée de cocotiers et de paillotes, rendez-vous des Abidjanais.",
        description:
          "Le front de mer de Grand-Bassam attire, le week-end, de nombreux habitants d'Abidjan qui viennent profiter des paillotes, des restaurants de poisson et de l'air marin. En semaine, la plage est beaucoup plus calme. On y vient pour se détendre et regarder la mer plutôt que pour se baigner : les courants y sont très dangereux.",
        tips: "Baignade fortement déconseillée (rouleaux et courants violents, plages rarement surveillées).",
        visitMinutes: 180,
        en: {
          name: "Grand-Bassam Beach",
          summary: "Long sandy beach lined with palms and straw huts, a favourite of Abidjan residents.",
          description:
            "At weekends Grand-Bassam's seafront draws many Abidjan residents who come to enjoy the beach huts, fish restaurants and sea air. On weekdays the beach is much quieter. People come to relax and watch the sea rather than to swim: the currents are very dangerous.",
          tips: "Swimming is strongly discouraged (big waves and violent currents, rarely supervised beaches).",
        },
      },
      {
        slug: "fete-de-l-abissa",
        category: "FESTIVAL",
        name: "Fête de l'Abissa",
        summary: "Grande fête annuelle du peuple N'zima : tambours, danses et parole libérée.",
        description:
          "Chaque année, à l'automne, le peuple N'zima de Grand-Bassam célèbre l'Abissa, à la fois fête du renouveau et rite de purification. Pendant plusieurs jours, au son des tambours sacrés, la communauté danse autour du roi, et chacun peut, le temps de la fête, critiquer publiquement les autres, y compris les autorités, sans crainte de représailles. Un moment de grande ferveur qui attire de nombreux visiteurs.",
        tips: "Les dates sont fixées chaque année par les autorités coutumières : renseignez-vous avant de réserver. Demandez avant de photographier.",
        bestPeriod: "Fin octobre – début novembre (dates variables)",
        visitMinutes: 240,
        en: {
          name: "Abissa Festival",
          summary: "The N'zima people's great annual festival: drums, dancing and free speech.",
          description:
            "Every year in the autumn, the N'zima people of Grand-Bassam celebrate Abissa, both a festival of renewal and a purification rite. For several days, to the sound of sacred drums, the community dances around the king, and for the duration of the festival anyone may publicly criticise others, including the authorities, without fear of reprisal. A time of great fervour that draws many visitors.",
          tips: "Dates are set each year by the customary authorities: check before booking. Ask before taking photos.",
          bestPeriod: "Late October – early November (dates vary)",
        },
      },
    ],
  },
  {
    slug: "assinie",
    name: "Assinie",
    region: "Sud-Comoé",
    summary: "Longue langue de sable entre lagune et océan, la station balnéaire la plus prisée du pays.",
    description:
      "À l'est de Grand-Bassam, près de la frontière ghanéenne, Assinie s'étire sur une étroite bande de sable entre l'océan Atlantique et la lagune Aby. Cocotiers, hôtels et résidences de week-end, sports nautiques sur la lagune et balades en pirogue vers les îles et villages de pêcheurs : c'est l'escapade balnéaire préférée des Abidjanais, à environ deux heures de route.",
    lat: 5.135,
    lng: -3.29,
    cover: "/images/voyage/assinie",
    en: {
      region: "Sud-Comoé",
      summary: "A long strip of sand between lagoon and ocean, the country's most popular seaside resort.",
      description:
        "East of Grand-Bassam, near the Ghanaian border, Assinie stretches along a narrow strip of sand between the Atlantic Ocean and the Aby lagoon. Coconut palms, hotels and weekend homes, water sports on the lagoon and pirogue trips to islands and fishing villages: it is Abidjan residents' favourite seaside getaway, about two hours' drive away.",
    },
    places: [
      {
        slug: "plage-d-assinie",
        category: "BEACH",
        name: "Plage d'Assinie",
        summary: "Des kilomètres de sable blond bordés de cocotiers, côté océan.",
        description:
          "Côté océan, Assinie offre une plage de sable presque continue, ponctuée d'hôtels, de restaurants de bord de mer et de cocoteraies. Couchers de soleil, longues marches et poisson grillé rythment le séjour. Comme partout sur la côte ivoirienne, l'océan est puissant : on profite de la plage, mais on se baigne plutôt côté lagune.",
        tips: "Ne vous baignez pas dans l'océan : les courants (la « barre ») sont violents.",
        visitMinutes: 240,
        en: {
          name: "Assinie Beach",
          summary: "Miles of golden sand lined with coconut palms on the ocean side.",
          description:
            "On the ocean side, Assinie has an almost continuous sandy beach dotted with hotels, beachfront restaurants and coconut groves. Sunsets, long walks and grilled fish set the pace of your stay. As everywhere along the Ivorian coast, the ocean is powerful: enjoy the beach, but swim on the lagoon side instead.",
          tips: "Do not swim in the ocean: the currents (the “barre”) are violent.",
        },
      },
      {
        slug: "lagune-aby-assinie",
        category: "NATURE",
        name: "Lagune Aby",
        summary: "Balades en pirogue et activités nautiques sur une vaste lagune aux îles boisées.",
        description:
          "Derrière le cordon de sable d'Assinie s'étend la lagune Aby, l'une des plus grandes du pays. Ses eaux calmes se prêtent aux balades en pirogue ou en bateau vers les îlots boisés et les villages de pêcheurs, ainsi qu'aux sports nautiques proposés par les hôtels. Une autre facette, plus paisible, d'Assinie.",
        tips: "Choisissez une embarcation équipée de gilets de sauvetage et convenez du prix avant de partir.",
        visitMinutes: 180,
        en: {
          name: "Aby Lagoon",
          summary: "Pirogue trips and water sports on a vast lagoon with wooded islands.",
          description:
            "Behind Assinie's sand bar lies the Aby lagoon, one of the largest in the country. Its calm waters are ideal for pirogue or boat trips to wooded islets and fishing villages, and for the water sports offered by hotels. Another, more peaceful side of Assinie.",
          tips: "Choose a boat with life jackets and agree on the price before setting off.",
        },
      },
    ],
  },
  {
    slug: "yamoussoukro",
    name: "Yamoussoukro",
    region: "District autonome de Yamoussoukro",
    summary: "Capitale politique aux larges avenues, célèbre pour sa basilique monumentale.",
    description:
      "Village natal de Félix Houphouët-Boigny, premier président du pays, Yamoussoukro est devenue capitale politique en 1983. La ville surprend par ses larges avenues, ses lacs et ses édifices démesurés, au premier rang desquels la basilique Notre-Dame de la Paix, l'une des plus grandes églises du monde. Une étape d'une journée sur la route du centre et de l'ouest, à environ trois heures d'Abidjan par l'autoroute.",
    lat: 6.8276,
    lng: -5.2893,
    cover: "/images/voyage/yamoussoukro",
    en: {
      region: "Yamoussoukro Autonomous District",
      summary: "The political capital with broad avenues, famous for its monumental basilica.",
      description:
        "The birthplace of Félix Houphouët-Boigny, the country's first president, Yamoussoukro became the political capital in 1983. The town surprises with its broad avenues, lakes and outsized buildings, first among them the Basilica of Our Lady of Peace, one of the largest churches in the world. A one-day stop on the road to the centre and the west, about three hours from Abidjan by motorway.",
    },
    places: [
      {
        slug: "basilique-notre-dame-de-la-paix",
        category: "RELIGION",
        name: "Basilique Notre-Dame de la Paix",
        summary: "Immense basilique inspirée de Saint-Pierre de Rome, aux vitraux spectaculaires.",
        description:
          "Construite à la fin des années 1980 et consacrée par le pape Jean-Paul II en 1990, la basilique Notre-Dame de la Paix s'inspire de Saint-Pierre de Rome : coupole monumentale, colonnade encadrant une vaste esplanade. Son intérieur est baigné par la lumière de milliers de mètres carrés de vitraux. Qu'on la trouve grandiose ou démesurée, c'est l'un des monuments les plus saisissants d'Afrique de l'Ouest.",
        tips: "Tenue couvrante exigée (épaules et jambes) ; la visite se fait en général avec un guide du site.",
        visitMinutes: 90,
        lat: 6.8117,
        lng: -5.2967,
        en: {
          name: "Basilica of Our Lady of Peace",
          summary: "Vast basilica inspired by St Peter's in Rome, with spectacular stained glass.",
          description:
            "Built in the late 1980s and consecrated by Pope John Paul II in 1990, the Basilica of Our Lady of Peace is modelled on St Peter's in Rome: a monumental dome and a colonnade framing a vast esplanade. Its interior is bathed in light from thousands of square metres of stained glass. Whether you find it grandiose or excessive, it is one of the most striking monuments in West Africa.",
          tips: "Covering clothes required (shoulders and legs); visits are generally made with a site guide.",
        },
      },
      {
        slug: "lac-aux-caimans-yamoussoukro",
        category: "NATURE",
        name: "Lac aux caïmans",
        summary: "Lac bordant l'ancienne résidence présidentielle, peuplé de crocodiles sacrés.",
        description:
          "Le lac qui entoure l'ancienne résidence de Félix Houphouët-Boigny abrite des crocodiles, symbole de pouvoir dans la tradition locale. Le nourrissage des animaux, en fin de journée, attire curieux et visiteurs depuis des décennies. On les observe depuis la rive, à bonne distance.",
        tips: "Restez derrière les barrières et à distance de l'eau : ce sont des animaux sauvages et dangereux.",
        visitMinutes: 45,
        en: {
          name: "Crocodile Lake",
          summary: "Lake beside the former presidential residence, home to sacred crocodiles.",
          description:
            "The lake surrounding Félix Houphouët-Boigny's former residence is home to crocodiles, a symbol of power in local tradition. The feeding of the animals at the end of the day has drawn onlookers and visitors for decades. They are watched from the bank, at a safe distance.",
          tips: "Stay behind the barriers and away from the water: these are wild, dangerous animals.",
        },
      },
      {
        slug: "fondation-houphouet-boigny-yamoussoukro",
        category: "CULTURE",
        name: "Fondation Félix Houphouët-Boigny pour la recherche de la paix",
        summary: "Vaste édifice dédié à la paix, emblème de l'architecture monumentale de la ville.",
        description:
          "Ce grand bâtiment aux toits de cuivre, posé au bord d'un plan d'eau, accueille la fondation créée pour promouvoir la paix et le dialogue, ainsi que des conférences internationales. Il illustre, avec la basilique et l'hôtel Président, l'ambition architecturale qui a façonné Yamoussoukro.",
        tips: "Les conditions de visite de l'intérieur varient : renseignez-vous sur place.",
        visitMinutes: 45,
        en: {
          name: "Félix Houphouët-Boigny Foundation for Peace Research",
          summary: "A vast building devoted to peace, emblematic of the town's monumental architecture.",
          description:
            "This large copper-roofed building beside a lake houses the foundation set up to promote peace and dialogue, and hosts international conferences. Together with the basilica and the Hôtel Président, it illustrates the architectural ambition that shaped Yamoussoukro.",
          tips: "Conditions for visiting the interior vary: ask on site.",
        },
      },
    ],
  },
  {
    slug: "man",
    name: "Man et la région des montagnes",
    region: "Tonkpi",
    summary: "« La ville aux dix-huit montagnes » : sommets boisés, cascades et ponts de lianes.",
    description:
      "Dans l'ouest du pays, Man est nichée au milieu de reliefs verdoyants qui lui valent le surnom de « ville aux dix-huit montagnes ». La région, terre du peuple dan (yacouba), est réputée pour ses masques et ses danseurs, ses cascades, la silhouette caractéristique de la Dent de Man et les ponts de lianes des villages voisins. Le climat y est plus frais qu'à Abidjan. Comptez une longue journée de route depuis Abidjan, ou une étape à Yamoussoukro.",
    lat: 7.4125,
    lng: -7.5539,
    en: {
      name: "Man and the mountain region",
      region: "Tonkpi",
      summary: "“The town of eighteen mountains”: wooded peaks, waterfalls and liana bridges.",
      description:
        "In the west of the country, Man nestles among green hills that earned it the nickname “town of eighteen mountains”. The region, home of the Dan (Yacouba) people, is renowned for its masks and dancers, its waterfalls, the distinctive outline of the Dent de Man and the liana bridges of nearby villages. The climate is cooler than in Abidjan. Allow a long day's drive from Abidjan, or a stop in Yamoussoukro.",
    },
    places: [
      {
        slug: "dent-de-man",
        category: "NATURE",
        name: "Dent de Man",
        summary: "Sommet en forme de dent qui domine la ville, pour une randonnée panoramique.",
        description:
          "Avec sa forme de molaire reconnaissable de loin, la Dent de Man est le symbole de la ville. Son ascension, raide par endroits, se fait en une demi-journée depuis les villages au pied du massif, à travers champs et forêt. Au sommet, la vue s'étend sur les montagnes et les vallées de la région.",
        tips: "Partez tôt avec un guide local, de bonnes chaussures et beaucoup d'eau ; évitez les jours de forte pluie (sentier glissant).",
        bestPeriod: "Novembre à mars (saison sèche)",
        visitMinutes: 300,
        en: {
          name: "Dent de Man",
          summary: "A tooth-shaped peak overlooking the town, for a hike with panoramic views.",
          description:
            "With its molar shape, recognisable from afar, the Dent de Man (“Man's Tooth”) is the symbol of the town. The climb, steep in places, takes half a day from the villages at the foot of the massif, through fields and forest. From the top, the view stretches over the region's mountains and valleys.",
          tips: "Set off early with a local guide, good shoes and plenty of water; avoid days of heavy rain (slippery trail).",
          bestPeriod: "November to March (dry season)",
        },
      },
      {
        slug: "cascade-de-man",
        category: "NATURE",
        name: "Cascade de Man",
        summary: "Chute d'eau en forêt aux portes de la ville, accessible par un court sentier.",
        description:
          "À quelques kilomètres du centre, la cascade de Man dévale des rochers au milieu d'une forêt dense. Un sentier aménagé et un petit pont permettent de s'en approcher. Un lieu frais et apprécié des familles, plus spectaculaire pendant et après la saison des pluies.",
        bestPeriod: "Août à novembre (débit plus fort)",
        visitMinutes: 90,
        en: {
          name: "Man Waterfall",
          summary: "A forest waterfall on the edge of town, reached by a short trail.",
          description:
            "A few kilometres from the centre, Man waterfall tumbles over rocks in the middle of dense forest. A path and a small bridge let you get close to it. A cool spot popular with families, most spectacular during and after the rainy season.",
          bestPeriod: "August to November (stronger flow)",
        },
      },
      {
        slug: "ponts-de-lianes-region-de-man",
        category: "CULTURE",
        name: "Ponts de lianes",
        summary: "Passerelles tressées de lianes au-dessus des rivières, entourées de secret.",
        description:
          "Dans certains villages de la région de Man et de Danané, des ponts suspendus faits de lianes tressées enjambent les rivières. Selon la tradition, ils sont l'œuvre d'initiés et seraient reconstruits en une nuit, à l'abri des regards. Leur visite se fait avec les autorités du village, dans le respect des interdits locaux.",
        tips: "Certains villages sont proches des frontières libérienne et guinéenne : vérifiez la carte de vigilance des conseils aux voyageurs avant d'y aller, et passez par un guide local. Une contribution est généralement demandée par le village.",
        visitMinutes: 120,
        en: {
          name: "Liana bridges",
          summary: "Footbridges woven from lianas over the rivers, shrouded in secrecy.",
          description:
            "In some villages of the Man and Danané area, suspension bridges made of woven lianas span the rivers. According to tradition, they are built by initiates and are said to be rebuilt in a single night, away from prying eyes. Visits are arranged with the village authorities, respecting local taboos.",
          tips: "Some villages are close to the Liberian and Guinean borders: check the travel-advice vigilance map before going, and use a local guide. The village usually asks for a contribution.",
        },
      },
    ],
  },
  {
    slug: "sassandra",
    name: "Sassandra",
    region: "Gbôklé",
    summary: "Ancien port colonial à l'embouchure d'un fleuve, entouré de criques et de plages sauvages.",
    description:
      "Sur la côte ouest, Sassandra s'est développée à l'embouchure du fleuve du même nom, autrefois l'un des ports actifs de la colonie. La ville, plus calme aujourd'hui, garde quelques vestiges de cette époque, un port de pêche animé où accostent les grandes pirogues peintes, et des plages et criques bordées de rochers et de cocotiers parmi les plus belles du pays. Une destination pour ceux qui ont du temps, à plusieurs heures de route d'Abidjan.",
    lat: 4.9511,
    lng: -6.0833,
    en: {
      region: "Gbôklé",
      summary: "A former colonial port at a river mouth, surrounded by coves and wild beaches.",
      description:
        "On the west coast, Sassandra grew up at the mouth of the river of the same name, once one of the colony's busy ports. The town, quieter today, keeps a few remains from that era, a lively fishing port where large painted pirogues land, and some of the country's most beautiful beaches and coves, lined with rocks and coconut palms. A destination for those with time, several hours' drive from Abidjan.",
    },
    places: [
      {
        slug: "port-de-peche-de-sassandra",
        category: "CULTURE",
        name: "Port de pêche de Sassandra",
        summary: "Retour des grandes pirogues peintes et marché au poisson sur la plage.",
        description:
          "Chaque jour, les grandes pirogues colorées des pêcheurs, dont beaucoup sont d'origine ghanéenne, reviennent s'échouer sur la plage du port. Le déchargement, le tri et la vente du poisson, puis le fumage dans les fours voisins, offrent un spectacle haut en couleur de la vie côtière.",
        tips: "Venez au retour de la pêche, en matinée ; demandez avant de photographier les pêcheurs et les vendeuses.",
        visitMinutes: 60,
        en: {
          name: "Sassandra fishing port",
          summary: "Large painted pirogues coming in and a fish market on the beach.",
          description:
            "Every day the fishermen's large colourful pirogues, many of them crewed by men of Ghanaian origin, run aground on the port's beach. Unloading, sorting and selling the fish, then smoking it in nearby ovens, make for a vivid picture of coastal life.",
          tips: "Come when the boats return, in the morning; ask before photographing fishermen and fish sellers.",
        },
      },
      {
        slug: "embouchure-du-sassandra",
        category: "NATURE",
        name: "Embouchure du fleuve Sassandra",
        summary: "Le fleuve rejoint l'océan entre mangroves et bancs de sable, à découvrir en pirogue.",
        description:
          "À la sortie de la ville, le fleuve Sassandra se jette dans l'océan. Une sortie en pirogue permet de remonter le cours d'eau entre mangroves et villages riverains, d'observer les oiseaux et de rejoindre les bancs de sable de l'embouchure.",
        tips: "Partez avec un piroguier recommandé par votre hébergement et exigez des gilets de sauvetage.",
        visitMinutes: 150,
        en: {
          name: "Sassandra river mouth",
          summary: "The river meets the ocean between mangroves and sandbanks, explored by pirogue.",
          description:
            "Just outside town, the Sassandra river flows into the ocean. A pirogue trip takes you upriver between mangroves and riverside villages, birdwatching along the way, and out to the sandbanks at the river mouth.",
          tips: "Go with a boatman recommended by your accommodation and insist on life jackets.",
        },
      },
      {
        slug: "plages-de-sassandra",
        category: "BEACH",
        name: "Plages de Sassandra",
        summary: "Criques rocheuses et plages de sable ourlées de cocotiers, de part et d'autre de la ville.",
        description:
          "De part et d'autre de Sassandra, la côte alterne caps rocheux, petites criques et longues plages bordées de cocotiers et de villages de pêcheurs. Quelques campements et hôtels permettent d'y séjourner au calme, loin de l'agitation d'Abidjan.",
        tips: "Renseignez-vous localement sur les endroits où la baignade est possible : les courants sont souvent forts.",
        visitMinutes: 240,
        en: {
          name: "Sassandra beaches",
          summary: "Rocky coves and palm-fringed sandy beaches on either side of the town.",
          description:
            "On either side of Sassandra, the coast alternates between rocky headlands, small coves and long beaches lined with coconut palms and fishing villages. A few lodges and hotels let you stay in peace, far from the bustle of Abidjan.",
          tips: "Ask locally where swimming is possible: the currents are often strong.",
        },
      },
    ],
  },
  {
    slug: "korhogo",
    name: "Korhogo",
    region: "Poro",
    summary: "Capitale du pays sénoufo, réputée pour ses toiles peintes et ses tisserands.",
    description:
      "Grande ville du nord, Korhogo est le cœur culturel du pays sénoufo. Les villages alentour perpétuent des savoir-faire réputés : toiles peintes de Fakaha, tissage de Waraniéné, forge, sculpture et vannerie. La société sénoufo est aussi connue pour le poro, son institution initiatique, et ses masques. Attention : Korhogo se trouve dans le district des Savanes, dont l'est et les zones frontalières du Mali et du Burkina Faso sont formellement déconseillés par la France et le Royaume-Uni ; consultez la carte de vigilance à jour avant tout déplacement dans le nord et ne vous écartez pas des zones autorisées.",
    lat: 9.458,
    lng: -5.6296,
    en: {
      region: "Poro",
      summary: "Capital of Senufo country, renowned for its painted cloths and weavers.",
      description:
        "A major northern town, Korhogo is the cultural heart of Senufo country. The surrounding villages keep alive renowned crafts: painted cloths from Fakaha, weaving in Waraniéné, blacksmithing, sculpture and basketry. Senufo society is also known for the poro, its initiation institution, and for its masks. Note: Korhogo lies in the Savanes district, whose eastern part and border areas with Mali and Burkina Faso are subject to advice against all travel by France and the UK; check the latest vigilance map before any trip to the north and do not stray outside permitted areas.",
    },
    places: [
      {
        slug: "toiles-de-fakaha",
        category: "CULTURE",
        name: "Toiles peintes de Fakaha",
        summary: "Village d'artistes où naissent les célèbres « toiles de Korhogo ».",
        description:
          "Dans le village de Fakaha, des artistes peignent à la main, sur des cotonnades tissées localement, les motifs d'animaux, de masques et de personnages qui ont fait connaître les « toiles de Korhogo » dans le monde entier. On peut les regarder travailler et acheter directement leurs créations.",
        tips: "Vérifiez la carte de vigilance pour le nord avant de vous y rendre et passez par un guide de Korhogo.",
        visitMinutes: 90,
        en: {
          name: "Fakaha painted cloths",
          summary: "A village of artists where the famous “Korhogo cloths” are made.",
          description:
            "In the village of Fakaha, artists hand-paint locally woven cotton cloth with the animals, masks and figures that made “Korhogo cloths” famous around the world. You can watch them at work and buy directly from them.",
          tips: "Check the vigilance map for the north before going and use a guide from Korhogo.",
        },
      },
      {
        slug: "tisserands-de-waraniene",
        category: "CULTURE",
        name: "Tisserands de Waraniéné",
        summary: "Village de tisserands travaillant sur des métiers traditionnels en bandes étroites.",
        description:
          "Aux portes de Korhogo, le village de Waraniéné est connu pour ses tisserands, qui produisent sur des métiers traditionnels de longues bandes de coton ensuite cousues en pagnes, nappes ou vêtements. Une coopérative permet de découvrir les étapes du travail et d'acheter sur place.",
        tips: "Vérifiez la carte de vigilance pour le nord avant de vous y rendre.",
        visitMinutes: 60,
        en: {
          name: "Waraniéné weavers",
          summary: "A weavers' village working traditional narrow-strip looms.",
          description:
            "On the outskirts of Korhogo, the village of Waraniéné is known for its weavers, who produce long strips of cotton on traditional looms, later sewn into wraps, tablecloths or clothing. A cooperative shows the stages of the work and sells on site.",
          tips: "Check the vigilance map for the north before going.",
        },
      },
    ],
  },
  {
    slug: "comoe",
    name: "Parc national de la Comoé",
    region: "Zanzan",
    summary: "Immense parc de savanes classé à l'UNESCO, aujourd'hui en zone formellement déconseillée.",
    description:
      "Dans le nord-est du pays, le parc national de la Comoé est l'une des plus vastes aires protégées d'Afrique de l'Ouest, inscrite au patrimoine mondial de l'UNESCO. Traversé par le fleuve Comoé, il mêle savanes, forêts galeries et îlots de forêt dense, et abrite éléphants, hippopotames, buffles, antilopes, chimpanzés et de nombreux oiseaux. Important : la France et le Royaume-Uni déconseillent actuellement formellement de s'y rendre, quel que soit le motif (risque terroriste et d'enlèvement). Il est présenté ici pour préparer une visite quand les conditions le permettront.",
    lat: 8.75,
    lng: -3.8,
    en: {
      name: "Comoé National Park",
      region: "Zanzan",
      summary: "A huge UNESCO-listed savannah park, currently in an area where all travel is advised against.",
      description:
        "In the north-east of the country, Comoé National Park is one of the largest protected areas in West Africa and a UNESCO World Heritage Site. Crossed by the Comoé river, it combines savannah, gallery forests and patches of dense forest, and is home to elephants, hippos, buffalo, antelopes, chimpanzees and many birds. Important: France and the UK currently advise against all travel there, whatever the reason (risk of terrorism and kidnapping). It is presented here so you can plan a visit once conditions allow.",
    },
    places: [
      {
        slug: "faune-de-la-comoe",
        category: "NATURE",
        name: "Faune et paysages de la Comoé",
        summary: "Savanes, forêts galeries et grands mammifères le long du fleuve Comoé.",
        description:
          "Le parc doit sa richesse à la diversité de ses milieux, qui font la transition entre forêt et savane. Le fleuve Comoé et ses affluents en sont l'axe vital, fréquenté par les hippopotames et de nombreux oiseaux. Après des années de braconnage, les efforts de protection ont permis son retrait de la liste du patrimoine mondial en péril en 2017. À ce jour, la zone est formellement déconseillée par les conseils aux voyageurs français et britanniques.",
        tips: "Ne vous y rendez pas tant que les conseils aux voyageurs officiels la déconseillent formellement ; consultez-les régulièrement.",
        bestPeriod: "Saison sèche (décembre à avril), quand les conditions de sécurité le permettront",
        visitMinutes: 480,
        en: {
          name: "Wildlife and landscapes of the Comoé",
          summary: "Savannahs, gallery forests and large mammals along the Comoé river.",
          description:
            "The park owes its richness to the variety of its habitats, which form a transition between forest and savannah. The Comoé river and its tributaries are its lifeline, frequented by hippos and many birds. After years of poaching, conservation efforts led to its removal from the List of World Heritage in Danger in 2017. At present, the area is subject to advice against all travel from the French and British authorities.",
          tips: "Do not go there while official travel advice advises against all travel; check it regularly.",
          bestPeriod: "Dry season (December to April), once security conditions allow",
        },
      },
    ],
  },
];

export const COTE_IVOIRE_CIRCUITS: SeedCircuit[] = [
  {
    slug: "cote-d-ivoire-essentiel-8-jours",
    title: "La Côte d'Ivoire essentielle en 8 jours",
    summary:
      "Abidjan et ses maquis, la forêt du Banco, la ville historique de Grand-Bassam, les plages et la lagune d'Assinie, puis la basilique de Yamoussoukro.",
    days: 8,
    cover: "/images/voyage/assinie",
    en: {
      title: "Essential Côte d'Ivoire in 8 days",
      summary:
        "Abidjan and its maquis, the Banco forest, the historic town of Grand-Bassam, the beaches and lagoon of Assinie, then the basilica of Yamoussoukro.",
    },
    steps: [
      { day: 1, place: "cathedrale-saint-paul-abidjan", note: "Arrivée et découverte du Plateau.", noteEn: "Arrival and a first look at the Plateau." },
      { day: 1, place: "musee-des-civilisations-de-cote-d-ivoire" },
      { day: 2, place: "parc-national-du-banco", note: "Matinée en forêt, soirée dans un maquis.", noteEn: "Morning in the forest, evening in a maquis." },
      { day: 2, place: "maquis-et-attieke-abidjan" },
      { day: 3, place: "quartier-france-grand-bassam", note: "Route vers Grand-Bassam (environ une heure selon la circulation).", noteEn: "Drive to Grand-Bassam (about an hour, depending on traffic)." },
      { day: 3, place: "musee-national-du-costume-grand-bassam" },
      { day: 3, place: "plage-de-grand-bassam" },
      { day: 4, place: "plage-d-assinie", note: "Route vers Assinie et après-midi au bord de l'océan.", noteEn: "Drive to Assinie and an afternoon by the ocean." },
      { day: 5, place: "lagune-aby-assinie", note: "Journée de détente entre lagune et plage.", noteEn: "A relaxing day between lagoon and beach." },
      { day: 6, destination: "yamoussoukro", note: "Retour vers Abidjan puis autoroute du Nord jusqu'à Yamoussoukro : longue journée de route.", noteEn: "Back towards Abidjan, then the northern motorway to Yamoussoukro: a long day on the road." },
      { day: 6, place: "lac-aux-caimans-yamoussoukro" },
      { day: 7, place: "basilique-notre-dame-de-la-paix" },
      { day: 7, place: "fondation-houphouet-boigny-yamoussoukro" },
      { day: 8, destination: "abidjan", note: "Retour à Abidjan par l'autoroute.", noteEn: "Back to Abidjan by motorway." },
    ],
  },
  {
    slug: "cote-d-ivoire-montagnes-de-man-6-jours",
    title: "Yamoussoukro et les montagnes de Man en 6 jours",
    summary:
      "Du centre à l'ouest : la basilique de Yamoussoukro, puis les sommets, cascades et villages de la région de Man. Voyage en voiture avec chauffeur conseillé.",
    days: 6,
    cover: "/images/voyage/yamoussoukro",
    en: {
      title: "Yamoussoukro and the Man mountains in 6 days",
      summary:
        "From the centre to the west: Yamoussoukro's basilica, then the peaks, waterfalls and villages of the Man region. Travelling by car with a driver is recommended.",
    },
    steps: [
      { day: 1, place: "basilique-notre-dame-de-la-paix", note: "Départ tôt d'Abidjan par l'autoroute du Nord.", noteEn: "Early departure from Abidjan on the northern motorway." },
      { day: 1, place: "lac-aux-caimans-yamoussoukro" },
      { day: 2, destination: "man", note: "Longue route vers l'ouest jusqu'à Man ; ne roulez pas de nuit.", noteEn: "Long drive west to Man; do not drive after dark." },
      { day: 3, place: "dent-de-man", note: "Ascension matinale avec un guide local.", noteEn: "Morning climb with a local guide." },
      { day: 4, place: "cascade-de-man", note: "Journée plus calme : cascade et rencontre avec les artisans de la ville.", noteEn: "A quieter day: the waterfall and meeting the town's artisans." },
      { day: 5, destination: "yamoussoukro", note: "Retour vers Yamoussoukro pour couper la route.", noteEn: "Drive back to Yamoussoukro to break the journey." },
      { day: 6, destination: "abidjan", note: "Retour à Abidjan.", noteEn: "Return to Abidjan." },
    ],
  },
];
