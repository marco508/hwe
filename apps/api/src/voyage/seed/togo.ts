/**
 * Contenu de départ du guide Togo (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 * Sécurité : d'après France Diplomatie et UK FCDO (consultés en octobre 2026),
 * la région des Savanes (extrême nord) est déconseillée ; elle ne figure dans
 * aucun circuit.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

export const TOGO_GUIDE: SeedGuide = {
  country: "TG",
  intro:
    "Étroite bande de terre entre le Ghana et le Bénin, le Togo réunit en quelques heures de route l'énergie de Lomé et de ses marchés, le lac Togo et la mémoire de Togoville, les collines boisées et les cascades de Kpalimé et, plus au nord, les grandes fêtes traditionnelles de Sokodé et de Kara et les maisons-forteresses du Koutammakou, inscrites au patrimoine mondial de l'UNESCO.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; il se demande en ligne (e-visa) sur le portail officiel du gouvernement togolais, quelques jours avant le départ. Les ressortissants de la CEDEAO en sont dispensés. Une formalité d'enregistrement en ligne peut aussi être exigée à l'arrivée et au départ. Vérifiez toujours les conditions à jour auprès des sources officielles avant le départ : passeport valide plusieurs mois après le retour, billet retour, adresse d'hébergement.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Vérifiez que vos vaccinations courantes, dont la rougeole, sont à jour. Buvez de l'eau en bouteille.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA), le même qu'au Bénin, au Burkina Faso ou en Côte d'Ivoire. Les espèces restent indispensables hors de Lomé ; le paiement mobile (mobile money) est très répandu. Les cartes bancaires sont acceptées dans les hôtels et les commerces importants de la capitale.",
    },
    {
      title: "Quand partir",
      body: "Le sud connaît deux saisons des pluies (environ avril–juillet, puis septembre–octobre) ; le nord, une seule (environ mai–octobre). La période la plus agréable va de novembre à mars, saison sèche, avec l'harmattan (vent sec et poussiéreux) de décembre à février. Les cascades de la région de Kpalimé sont plus spectaculaires pendant et juste après les pluies, quand les pistes peuvent toutefois devenir difficiles.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue officielle ; l'éwé (surtout dans le sud) et le kabiyè (dans le nord) sont les principales langues nationales, aux côtés de nombreuses autres langues. Saluer avant toute demande est essentiel. Dans les lieux sacrés (couvents, forêts sacrées, marchés de fétiches) et lors des cérémonies, suivez les consignes de votre guide et demandez toujours avant de photographier une personne.",
    },
    {
      title: "Se déplacer",
      body: "En ville, les taxis-motos (zémidjans) sont très utilisés, mais les autorités françaises les déconseillent en raison des accidents : préférez les taxis ou une voiture avec chauffeur. Entre les villes, taxis collectifs, bus et voitures avec chauffeur. La route nationale 1 relie Lomé au nord du pays : comptez une longue journée pour rejoindre Kara. Évitez de rouler de nuit et, en saison des pluies, prévoyez un 4x4 pour les pistes.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type européen. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money.",
    },
    {
      title: "Sécurité",
      body: "Le sud et le centre du pays se visitent avec une vigilance normale, mais l'extrême nord est concerné par la menace terroriste venue du Sahel. La France déconseille formellement la zone des trois frontières avec le Burkina Faso, le Bénin et le Ghana, et déconseille sauf raison impérative toute la région des Savanes, Dapaong compris ; le Royaume-Uni déconseille lui aussi les abords de la frontière burkinabè et le reste de cette région. Ce guide ne propose donc aucun itinéraire dans la région des Savanes. Ailleurs, les précautions sont celles d'une grande ville : à Lomé, évitez de marcher la nuit, notamment sur la plage et le front de mer après le coucher du soleil, et ne roulez pas de nuit hors de la capitale. La baignade est dangereuse sur toute la côte (forts courants). Consultez avant et pendant votre voyage les « Conseils aux voyageurs » de France Diplomatie et la page « Foreign travel advice » du gouvernement britannique (FCDO), régulièrement mises à jour.",
    },
  ],
  en: {
    intro:
      "A narrow strip of land between Ghana and Benin, Togo packs into a few hours' drive the energy of Lomé and its markets, Lake Togo and the history of Togoville, the wooded hills and waterfalls around Kpalimé and, further north, the great traditional festivals of Sokodé and Kara and the fortress houses of Koutammakou, a UNESCO World Heritage Site.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa, applied for online (e-visa) on the Togolese government's official portal a few days before departure. ECOWAS nationals are exempt. An online registration may also be required on arrival and departure. Always check current requirements with official sources before leaving: passport valid for several months after your return, return ticket, accommodation address.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). Make sure your routine vaccinations, including measles, are up to date. Drink bottled water.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs), the same as in Benin, Burkina Faso and Côte d'Ivoire. Cash remains essential outside Lomé; mobile money is widely used. Bank cards are accepted in hotels and larger shops in the capital.",
      },
      {
        title: "When to go",
        body: "The south has two rainy seasons (roughly April–July, then September–October); the north has one (roughly May–October). The most pleasant period is November to March, the dry season, with the harmattan (a dry, dusty wind) from December to February. The waterfalls around Kpalimé are at their best during and just after the rains, when tracks can however become difficult.",
      },
      {
        title: "Languages and customs",
        body: "French is the official language; Ewe (mainly in the south) and Kabiye (in the north) are the main national languages, alongside many others. Greeting people before asking anything is essential. In sacred places (convents, sacred forests, fetish markets) and during ceremonies, follow your guide's instructions and always ask before photographing a person.",
      },
      {
        title: "Getting around",
        body: "In town, motorbike taxis (zemidjans) are widely used, but the French authorities advise against them because of accidents: prefer taxis or a car with a driver. Between cities: shared taxis, buses and cars with drivers. National Road 1 links Lomé to the north of the country: allow a long day to reach Kara. Avoid driving at night and, in the rainy season, plan on a 4x4 for dirt tracks.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, European-type plugs. A local SIM card (ID required) gives access to mobile internet and mobile money.",
      },
      {
        title: "Safety",
        body: "The south and centre of the country can be visited with normal vigilance, but the far north is affected by the terrorist threat spreading from the Sahel. France advises against all travel to the tri-border areas with Burkina Faso, Benin and Ghana, and against all but essential travel to the whole Savanes region, including Dapaong; the United Kingdom also advises against travel near the Burkina Faso border and to the rest of that region. This guide therefore suggests no itinerary in the Savanes region. Elsewhere, the precautions are those of any big city: in Lomé, avoid walking at night, especially on the beach and seafront after sunset, and do not drive at night outside the capital. Swimming is dangerous all along the coast (strong currents). Before and during your trip, check France Diplomatie's “Conseils aux voyageurs” and the UK government's (FCDO) “Foreign travel advice” pages, which are updated regularly.",
      },
    ],
  },
};

export const TOGO_DESTINATIONS: SeedDestination[] = [
  {
    slug: "lome",
    name: "Lomé",
    region: "Maritime",
    summary: "Capitale en bord d'océan : grand marché, marché des féticheurs et patrimoine de l'indépendance.",
    description:
      "Capitale et premier port du pays, Lomé s'étire le long de l'Atlantique, tout contre la frontière ghanéenne. On y vient pour l'animation du Grand Marché et de ses commerçantes, pour le marché des féticheurs d'Akodessewa, pour le monument de l'Indépendance et pour l'ancien palais des gouverneurs devenu centre d'art. C'est le point d'arrivée de la plupart des voyageurs et une base pratique pour rayonner vers le lac Togo, Aného et Kpalimé.",
    lat: 6.1333,
    lng: 1.2167,
    cover: "/images/voyage/lome",
    en: {
      region: "Maritime",
      summary: "Oceanfront capital: a great market, the fetish market and the heritage of independence.",
      description:
        "Togo's capital and main port, Lomé stretches along the Atlantic right next to the Ghanaian border. People come for the bustle of the Grand Market and its traders, the Akodessewa fetish market, the Independence Monument and the former governors' palace now turned into an arts centre. It is where most travellers arrive and a handy base for trips to Lake Togo, Aného and Kpalimé.",
    },
    places: [
      {
        slug: "grand-marche-lome",
        category: "MARKET",
        name: "Grand Marché de Lomé",
        summary: "Le cœur commerçant de la ville, royaume des pagnes et des célèbres « Nana Benz ».",
        description:
          "Au centre de Lomé, le Grand Marché (ou marché d'Assigamé) et les rues qui l'entourent forment le cœur commerçant de la ville : tissus, produits frais, épices, ustensiles, artisanat. Il est associé aux « Nana Benz », ces commerçantes de pagnes wax devenues célèbres pour leur réussite à partir des années 1960-1970. Une immersion vivante dans l'économie de la capitale.",
        tips: "Venez le matin, gardez vos affaires près de vous et demandez avant de photographier. Le marchandage fait partie de l'échange.",
        visitMinutes: 120,
        lat: 6.1260,
        lng: 1.2273,
        cover: "/images/voyage/lieu-grand-marche-lome",
        en: {
          name: "Lomé Grand Market",
          summary: "The city's commercial heart, home of wax prints and the famous “Nana Benz”.",
          description:
            "In central Lomé, the Grand Market (or Assigamé market) and the surrounding streets form the city's commercial heart: fabrics, fresh produce, spices, utensils, crafts. It is associated with the “Nana Benz”, the wax-print traders who became famous for their success from the 1960s and 1970s onwards. A lively dive into the capital's economy.",
          tips: "Come in the morning, keep your belongings close and ask before taking photos. Bargaining is part of the exchange.",
        },
      },
      {
        slug: "marche-des-feticheurs-akodessewa",
        category: "MARKET",
        name: "Marché des féticheurs d'Akodessewa",
        summary: "Marché consacré aux objets et ingrédients des pratiques vodun et de la médecine traditionnelle.",
        description:
          "Dans le quartier d'Akodessewa, à l'est du centre, ce marché réunit les étals des ingrédients, statuettes et objets utilisés dans les pratiques vodun et la médecine traditionnelle. Les vendeurs et tradipraticiens expliquent volontiers leur usage. Le spectacle peut surprendre (animaux séchés notamment), mais il éclaire la place du vodun dans la vie quotidienne de la côte.",
        tips: "La visite se fait généralement avec un guide du marché ; une participation est demandée, et souvent un supplément pour les photos : convenez-en avant.",
        visitMinutes: 60,
        lat: 6.1534,
        lng: 1.2682,
        cover: "/images/voyage/lieu-marche-des-feticheurs-akodessewa",
        en: {
          name: "Akodessewa Fetish Market",
          summary: "A market devoted to the objects and ingredients of vodun practice and traditional medicine.",
          description:
            "In the Akodessewa district, east of the centre, this market brings together stalls of ingredients, statuettes and objects used in vodun practice and traditional medicine. Vendors and healers readily explain their uses. The sight can be surprising (dried animals, in particular), but it sheds light on the place of vodun in everyday life on the coast.",
          tips: "Visits are usually made with a market guide; a fee is asked, often with an extra charge for photos: agree on it beforehand.",
        },
      },
      {
        slug: "monument-de-l-independance-lome",
        category: "HISTORY",
        name: "Monument de l'Indépendance",
        summary: "Symbole de l'indépendance du Togo, proclamée le 27 avril 1960.",
        description:
          "Au centre de la place de l'Indépendance, ce monument commémore l'accession du Togo à l'indépendance, le 27 avril 1960. Sa haute silhouette sculptée est l'un des emblèmes de la capitale ; la place qui l'entoure accueille les grandes célébrations nationales. Une étape courte mais incontournable d'une découverte de Lomé.",
        visitMinutes: 30,
        lat: 6.1300,
        lng: 1.2160,
        cover: "/images/voyage/lieu-monument-de-l-independance-lome",
        en: {
          name: "Independence Monument",
          summary: "Symbol of Togo's independence, proclaimed on 27 April 1960.",
          description:
            "In the middle of Independence Square, this monument commemorates Togo's independence on 27 April 1960. Its tall sculpted silhouette is one of the capital's emblems; the surrounding square hosts the major national celebrations. A short but essential stop on any visit to Lomé.",
        },
      },
      {
        slug: "palais-de-lome",
        category: "CULTURE",
        name: "Palais de Lomé",
        summary: "L'ancien palais des gouverneurs, rénové en centre d'art et de culture avec un grand parc.",
        description:
          "Construit au début du XXe siècle pour les gouverneurs du Togo allemand, puis occupé par l'administration française et par la présidence après l'indépendance, le palais a longtemps été laissé à l'abandon. Restauré, il a rouvert en 2019 comme centre d'art et de culture : expositions d'art contemporain et de patrimoine, et un vaste parc arboré face à l'océan, havre de calme au cœur de la ville.",
        visitMinutes: 90,
        lat: 6.1204,
        lng: 1.2121,
        cover: "/images/voyage/lieu-palais-de-lome",
        en: {
          name: "Palais de Lomé",
          summary: "The former governors' palace, restored as an arts and culture centre with a large park.",
          description:
            "Built in the early 20th century for the governors of German Togoland, then used by the French administration and by the presidency after independence, the palace was long left abandoned. Restored, it reopened in 2019 as an arts and culture centre: contemporary art and heritage exhibitions, and a vast wooded park facing the ocean, a haven of calm in the heart of the city.",
        },
      },
      {
        slug: "musee-national-togo",
        category: "MUSEUM",
        name: "Musée national du Togo",
        summary: "Collections d'objets traditionnels et d'histoire, au palais des Congrès.",
        description:
          "Installé au palais des Congrès, le Musée national présente des objets venus des différentes régions du pays : parures, instruments de musique, objets rituels et du quotidien, ainsi que des pièces évoquant l'histoire du Togo. Une introduction utile à la diversité des cultures togolaises avant de partir vers l'intérieur.",
        visitMinutes: 60,
        lat: 6.1305,
        lng: 1.2175,
        cover: "/images/voyage/lieu-musee-national-togo",
        en: {
          name: "National Museum of Togo",
          summary: "Collections of traditional objects and history, in the Palais des Congrès.",
          description:
            "Housed in the Palais des Congrès, the National Museum displays objects from the country's different regions: ornaments, musical instruments, ritual and everyday objects, as well as items relating to Togo's history. A useful introduction to the diversity of Togolese cultures before heading inland.",
        },
      },
      {
        slug: "cathedrale-sacre-coeur-lome",
        category: "RELIGION",
        name: "Cathédrale du Sacré-Cœur de Lomé",
        summary: "Église néogothique de l'époque allemande, consacrée en 1902, à deux pas du Grand Marché.",
        description:
          "Bâtie en un peu plus d'un an, d'avril 1901 à septembre 1902, sous l'administration coloniale allemande, la cathédrale du Sacré-Cœur a été consacrée le 21 septembre 1902. Avec ses deux flèches et sa façade rouge et blanche de style néogothique, elle domine le quartier du Grand Marché et reste l'un des monuments emblématiques de la capitale. Devenue cathédrale de l'archidiocèse de Lomé en 1955, elle a accueilli une messe du pape Jean-Paul II en août 1985.",
        tips: "Tenue correcte ; évitez de visiter pendant les offices et demandez avant de photographier les fidèles.",
        visitMinutes: 30,
        lat: 6.1250,
        lng: 1.2263,
        cover: "/images/voyage/lieu-cathedrale-sacre-coeur-lome",
        en: {
          name: "Sacred Heart Cathedral, Lomé",
          summary: "A German-era neo-Gothic church, consecrated in 1902, a stone's throw from the Grand Market.",
          description:
            "Built in just over a year, from April 1901 to September 1902, under the German colonial administration, the Sacred Heart Cathedral was consecrated on 21 September 1902. With its twin spires and red-and-white neo-Gothic facade, it towers over the Grand Market district and remains one of the capital's landmark buildings. It became the cathedral of the Archdiocese of Lomé in 1955 and hosted a Mass celebrated by Pope John Paul II in August 1985.",
          tips: "Dress respectfully; avoid visiting during services and ask before photographing worshippers.",
        },
      },
      {
        slug: "plage-de-lome",
        category: "BEACH",
        name: "Plage de Lomé",
        summary: "Long ruban de sable bordé de cocotiers, lieu de promenade des Loméens en fin de journée et le week-end.",
        description:
          "Lomé s'étire le long d'une plage de sable bordée de cocotiers, de la frontière ghanéenne jusqu'au port. Le front de mer, face au palais de Lomé et au centre-ville, est un lieu de promenade et de détente pour les habitants, surtout en fin d'après-midi, le week-end et pendant les fêtes. Les vagues et les courants y sont puissants : on y vient pour l'air marin, la promenade et le coucher du soleil plutôt que pour la baignade.",
        tips: "Ne vous baignez pas (forts courants) et quittez la plage avant la tombée de la nuit, comme le recommandent les autorités françaises. Gardez peu d'objets de valeur sur vous.",
        bestPeriod: "Novembre à mars (saison sèche), en fin d'après-midi",
        visitMinutes: 90,
        cover: "/images/voyage/lieu-plage-de-lome",
        en: {
          name: "Lomé beach",
          summary: "A long ribbon of palm-fringed sand, where Lomé residents stroll in the late afternoon and at weekends.",
          description:
            "Lomé stretches along a palm-fringed sandy beach from the Ghanaian border to the port. The seafront, opposite the Palais de Lomé and the city centre, is a place for residents to stroll and relax, especially in the late afternoon, at weekends and during the holidays. The waves and currents are powerful: people come for the sea air, a walk and the sunset rather than for a swim.",
          tips: "Do not swim (strong currents) and leave the beach before nightfall, as the French authorities advise. Carry few valuables.",
          bestPeriod: "November to March (dry season), in the late afternoon",
        },
      },
    ],
  },
  {
    slug: "lac-togo",
    name: "Lac Togo et Togoville",
    region: "Maritime",
    summary: "Lagune paisible, traversée en pirogue et Togoville, berceau historique qui a donné son nom au pays.",
    description:
      "À une quarantaine de kilomètres à l'est de Lomé, le lac Togo est une grande lagune séparée de l'océan par un cordon de sable. Sur la rive sud, Agbodrafo (l'ancienne Porto Seguro) conserve une maison liée à la traite négrière ; en face, on rejoint en pirogue Togoville, où fut signé en 1884 le traité de protectorat avec l'Allemagne et qui a donné son nom au pays. Une excursion d'une journée au départ de Lomé, ou une étape reposante au bord de l'eau.",
    lat: 6.2333,
    lng: 1.4833,
    cover: "/images/voyage/lac-togo",
    en: {
      name: "Lake Togo and Togoville",
      region: "Maritime",
      summary: "A peaceful lagoon, a pirogue crossing and Togoville, the historic town that gave the country its name.",
      description:
        "Some forty kilometres east of Lomé, Lake Togo is a large lagoon separated from the ocean by a strip of sand. On the southern shore, Agbodrafo (formerly Porto Seguro) preserves a house linked to the slave trade; across the water, a pirogue takes you to Togoville, where the protectorate treaty with Germany was signed in 1884 and which gave the country its name. A day trip from Lomé, or a relaxing stop by the water.",
    },
    places: [
      {
        slug: "maison-des-esclaves-agbodrafo",
        category: "HISTORY",
        name: "Maison des esclaves d'Agbodrafo",
        summary: "Demeure du XIXe siècle dont la cave servait à cacher des captifs après l'abolition de la traite.",
        description:
          "À Agbodrafo, la « Maison des esclaves » (ou maison Wood) a été construite au XIXe siècle par un négociant. Après l'interdiction officielle de la traite, des captifs auraient été entassés dans sa cave, à l'abri des regards, avant d'être embarqués clandestinement. La visite guidée de ce lieu de mémoire, avec la descente dans la cave, est un moment fort.",
        visitMinutes: 45,
        lat: 6.2038,
        lng: 1.4768,
        cover: "/images/voyage/lieu-maison-des-esclaves-agbodrafo",
        en: {
          name: "Agbodrafo Slave House",
          summary: "A 19th-century house whose cellar was used to hide captives after the slave trade was abolished.",
          description:
            "In Agbodrafo, the “Slave House” (or Wood house) was built in the 19th century by a trader. After the slave trade was officially banned, captives are said to have been crammed into its cellar, out of sight, before being shipped clandestinely. The guided visit of this place of remembrance, including the descent into the cellar, is a powerful moment.",
        },
      },
      {
        slug: "traversee-du-lac-togo",
        category: "NATURE",
        name: "Traversée du lac Togo en pirogue",
        summary: "Glisser sur la lagune entre pêcheurs et villages, d'Agbodrafo à Togoville.",
        description:
          "Depuis la rive d'Agbodrafo, des piroguiers proposent la traversée vers Togoville. Le trajet, à la voile, à la perche ou au moteur, offre une belle vue sur la lagune, ses pêcheurs et les villages des rives. Certains hébergements au bord du lac proposent aussi des sorties plus longues.",
        tips: "Négociez le prix et la durée de l'aller-retour avant d'embarquer, et demandez un gilet de sauvetage.",
        visitMinutes: 90,
        cover: "/images/voyage/lieu-traversee-du-lac-togo",
        en: {
          name: "Lake Togo pirogue crossing",
          summary: "Gliding across the lagoon past fishermen and villages, from Agbodrafo to Togoville.",
          description:
            "From the Agbodrafo shore, boatmen offer the crossing to Togoville. The trip, by sail, pole or motor, gives a fine view of the lagoon, its fishermen and the lakeside villages. Some lakeside lodges also offer longer outings.",
          tips: "Agree the price and length of the round trip before boarding, and ask for a life jacket.",
        },
      },
      {
        slug: "sanctuaire-notre-dame-togoville",
        category: "RELIGION",
        name: "Sanctuaire Notre-Dame de Togoville",
        summary: "Église et lieu de pèlerinage marial, visité par le pape Jean-Paul II en 1985.",
        description:
          "Togoville fut l'un des premiers foyers missionnaires de la région. Son église Notre-Dame, aux peintures intérieures colorées, est devenue un lieu de pèlerinage marial, renforcé par la visite du pape Jean-Paul II en 1985. Dans la petite ville, églises et sanctuaires vodun se côtoient, comme souvent sur la côte.",
        tips: "Tenue correcte ; ne visitez pas pendant les offices.",
        visitMinutes: 45,
        lat: 6.2323,
        lng: 1.4776,
        cover: "/images/voyage/lieu-sanctuaire-notre-dame-togoville",
        en: {
          name: "Our Lady of Togoville Shrine",
          summary: "A church and Marian pilgrimage site, visited by Pope John Paul II in 1985.",
          description:
            "Togoville was one of the region's earliest mission centres. Its church of Our Lady, with colourful interior paintings, has become a Marian pilgrimage site, a role strengthened by Pope John Paul II's visit in 1985. In the small town, churches and vodun shrines stand side by side, as they often do on the coast.",
          tips: "Dress respectfully; do not visit during services.",
        },
      },
      {
        slug: "monument-du-centenaire-togoville",
        category: "HISTORY",
        name: "Togoville, ville du traité de 1884",
        summary: "Monument du centenaire et souvenir du roi Mlapa III, signataire du traité avec l'Allemagne.",
        description:
          "En juillet 1884, le roi Mlapa III de Togoville signa avec l'explorateur allemand Gustav Nachtigal le traité qui fit de la région un protectorat allemand : le nom de la ville, « Togo », passa ensuite à tout le pays. Un monument érigé pour le centenaire du traité, des statues et la maison de la famille royale rappellent cet épisode fondateur, à découvrir avec un guide local.",
        visitMinutes: 60,
        cover: "/images/voyage/lieu-monument-du-centenaire-togoville",
        en: {
          name: "Togoville, town of the 1884 treaty",
          summary: "Centenary monument and the memory of King Mlapa III, who signed the treaty with Germany.",
          description:
            "In July 1884, King Mlapa III of Togoville signed the treaty with the German explorer Gustav Nachtigal that made the region a German protectorate: the town's name, “Togo”, later passed to the whole country. A monument built for the treaty's centenary, statues and the royal family's house recall this founding episode, best explored with a local guide.",
        },
      },
    ],
  },
  {
    slug: "aneho",
    name: "Aného",
    region: "Maritime",
    summary: "Ancienne capitale coloniale entre lagune et océan, haut lieu de la culture guin.",
    description:
      "Près de la frontière béninoise, Aného s'est développée entre l'océan et la lagune, à l'embouchure du lac Togo. Ancien comptoir commercial et l'une des premières capitales de la colonie allemande avant Lomé, elle garde des maisons coloniales et afro-brésiliennes un peu décrépites qui font son charme. C'est aussi le pays des Guin (Gen) : chaque année, la fête d'Epe Ekpe rassemble les foules dans le village voisin de Glidji.",
    lat: 6.2333,
    lng: 1.6,
    cover: "/images/voyage/aneho",
    en: {
      region: "Maritime",
      summary: "A former colonial capital between lagoon and ocean, heartland of Guin culture.",
      description:
        "Near the Beninese border, Aného grew up between the ocean and the lagoon, at the mouth of Lake Togo. A former trading post and one of the first capitals of the German colony before Lomé, it keeps slightly faded colonial and Afro-Brazilian houses that give it its charm. It is also the land of the Guin (Gen) people: every year, the Epe Ekpe festival draws crowds to the neighbouring village of Glidji.",
    },
    places: [
      {
        slug: "vieille-ville-aneho",
        category: "HISTORY",
        name: "Vieille ville d'Aného",
        summary: "Promenade entre maisons coloniales, églises anciennes et bords de lagune.",
        description:
          "Le centre d'Aného se découvre à pied : façades à vérandas de l'époque coloniale, demeures de familles afro-brésiliennes, anciennes églises et vue sur la lagune et le pont qui enjambe l'embouchure. Une balade tranquille, idéalement avec un guide local qui raconte l'histoire commerçante de la ville.",
        visitMinutes: 90,
        lat: 6.2289,
        lng: 1.5931,
        cover: "/images/voyage/lieu-vieille-ville-aneho",
        en: {
          name: "Aného old town",
          summary: "A stroll among colonial houses, old churches and the lagoon shore.",
          description:
            "Aného's centre is best explored on foot: colonial-era facades with verandas, homes of Afro-Brazilian families, old churches and views of the lagoon and the bridge over its mouth. A quiet walk, ideally with a local guide who tells the story of the town's trading past.",
        },
      },
      {
        slug: "epe-ekpe-glidji",
        category: "FESTIVAL",
        name: "Fête d'Epe Ekpe à Glidji",
        summary: "Nouvel an traditionnel des Guin, marqué par la « prise de la pierre sacrée ».",
        description:
          "Chaque année, généralement en septembre, les Guin célèbrent à Glidji, tout près d'Aného, leur nouvel an traditionnel, Epe Ekpe. Le temps fort est la « prise de la pierre sacrée » dans la forêt sacrée : sa couleur est interprétée comme un présage pour l'année à venir. Cérémonies, défilés et retrouvailles des familles rythment les festivités.",
        tips: "Les dates varient chaque année : renseignez-vous auprès des autorités locales ou de votre hébergement. Respectez les consignes, certaines cérémonies n'étant pas ouvertes au public.",
        bestPeriod: "En général en septembre",
        visitMinutes: 360,
        lat: 6.2512,
        lng: 1.6015,
        cover: "/images/voyage/lieu-epe-ekpe-glidji",
        en: {
          name: "Epe Ekpe festival in Glidji",
          summary: "The Guin traditional new year, marked by the “taking of the sacred stone”.",
          description:
            "Every year, usually in September, the Guin people celebrate their traditional new year, Epe Ekpe, in Glidji, right next to Aného. The highlight is the “taking of the sacred stone” in the sacred forest: its colour is read as an omen for the year ahead. Ceremonies, parades and family reunions mark the festivities.",
          tips: "Dates vary every year: ask the local authorities or your accommodation. Follow instructions, as some ceremonies are not open to the public.",
          bestPeriod: "Usually in September",
        },
      },
    ],
  },
  {
    slug: "kpalime",
    name: "Kpalimé",
    region: "Plateaux",
    summary: "Collines boisées, cascades, plantations de café et de cacao et un artisanat réputé.",
    description:
      "À environ 120 km au nord-ouest de Lomé, près de la frontière ghanéenne, Kpalimé est la ville verte du Togo. Elle est entourée de collines couvertes de forêts, dont le mont Agou, point culminant du pays, de cascades et de plantations de café et de cacao. Sa douceur de vivre, son marché et son centre artisanal en font une base idéale pour des randonnées de quelques jours.",
    lat: 6.9,
    lng: 0.6333,
    cover: "/images/voyage/kpalime",
    en: {
      region: "Plateaux",
      summary: "Wooded hills, waterfalls, coffee and cocoa plantations and renowned crafts.",
      description:
        "Some 120 km north-west of Lomé, near the Ghanaian border, Kpalimé is Togo's green town. It is surrounded by forested hills, including Mount Agou, the country's highest point, waterfalls and coffee and cocoa plantations. Its easy-going pace, market and crafts centre make it an ideal base for a few days of hiking.",
    },
    places: [
      {
        slug: "mont-agou",
        category: "NATURE",
        name: "Mont Agou",
        summary: "Le point culminant du Togo (986 m), couvert de forêts et de villages éwés.",
        description:
          "Entre Kpalimé et Amoussoukopé, le mont Agou culmine à 986 m, le point le plus élevé du pays. Ses pentes boisées sont parsemées de villages éwés et de cultures ; les sentiers offrent de beaux panoramas sur la plaine. Le sommet abrite une installation militaire : on randonne sur les pentes et jusqu'aux points de vue autorisés.",
        tips: "Partez tôt avec un guide local, de bonnes chaussures et de l'eau. En harmattan, la brume limite la vue.",
        visitMinutes: 300,
        lat: 6.8731,
        lng: 0.7492,
        cover: "/images/voyage/lieu-mont-agou",
        en: {
          name: "Mount Agou",
          summary: "Togo's highest point (986 m), covered in forest and Ewe villages.",
          description:
            "Between Kpalimé and Amoussoukopé, Mount Agou rises to 986 m, the country's highest point. Its wooded slopes are dotted with Ewe villages and farms; the trails give fine views over the plain. The summit houses a military installation: hikes follow the slopes up to the permitted viewpoints.",
          tips: "Set off early with a local guide, good shoes and water. During the harmattan, haze limits the view.",
        },
      },
      {
        slug: "cascade-de-wome",
        category: "NATURE",
        name: "Cascade de Womé",
        summary: "Chute d'eau dans la forêt, au bout d'une piste et d'une courte descente à pied.",
        description:
          "Dans les collines proches de Kpalimé, la cascade de Womé tombe dans un bassin au cœur d'une végétation luxuriante. On y accède par une piste puis un sentier en descente à travers la forêt. Une excursion rafraîchissante, à combiner avec la découverte des villages et des plantations environnants.",
        tips: "Le sentier peut être glissant : prévoyez des chaussures adaptées. Une participation est demandée par le village gestionnaire du site.",
        bestPeriod: "Juillet à novembre (débit plus fort)",
        visitMinutes: 180,
        lat: 6.8583,
        lng: 0.5546,
        cover: "/images/voyage/lieu-cascade-de-wome",
        en: {
          name: "Womé Waterfall",
          summary: "A forest waterfall reached by a dirt track and a short walk down.",
          description:
            "In the hills near Kpalimé, Womé waterfall drops into a pool surrounded by lush vegetation. It is reached by a dirt track and then a downhill path through the forest. A refreshing outing, easily combined with the surrounding villages and plantations.",
          tips: "The path can be slippery: wear suitable shoes. The village that manages the site asks for a contribution.",
          bestPeriod: "July to November (stronger flow)",
        },
      },
      {
        slug: "centre-artisanal-kpalime",
        category: "MARKET",
        name: "Centre artisanal de Kpalimé",
        summary: "Ateliers de sculpteurs, tisserands, potiers et peintres, avec vente directe.",
        description:
          "Kpalimé est réputée pour son artisanat. Au centre artisanal, on voit travailler sculpteurs sur bois, tisserands de kente, potiers, vanniers et peintres, et l'on peut acheter directement leurs créations. Une bonne occasion de rapporter un souvenir fabriqué sur place.",
        visitMinutes: 60,
        lat: 6.9239,
        lng: 0.6178,
        en: {
          name: "Kpalimé Crafts Centre",
          summary: "Workshops of carvers, weavers, potters and painters, with direct sales.",
          description:
            "Kpalimé is known for its crafts. At the crafts centre you can watch woodcarvers, kente weavers, potters, basket makers and painters at work, and buy their creations directly. A good opportunity to take home a locally made souvenir.",
        },
      },
      {
        slug: "cafe-cacao-kpalime",
        category: "GASTRONOMY",
        name: "Café et cacao de la région de Kpalimé",
        summary: "Visite de plantations et dégustation, au cœur de la principale région caféière du pays.",
        description:
          "Les collines autour de Kpalimé sont la principale région de production de café et de cacao du Togo. Des randonnées accompagnées traversent les plantations, à l'ombre des grands arbres, et expliquent le chemin de la cerise de café ou de la cabosse jusqu'à la tasse ou la tablette. Certaines coopératives et petites chocolateries locales proposent dégustations et vente.",
        visitMinutes: 150,
        cover: "/images/voyage/lieu-cafe-cacao-kpalime",
        en: {
          name: "Coffee and cocoa of the Kpalimé region",
          summary: "Plantation visits and tastings in the country's main coffee-growing region.",
          description:
            "The hills around Kpalimé are Togo's main coffee- and cocoa-producing region. Guided walks cross the plantations in the shade of tall trees and explain the journey from coffee cherry or cocoa pod to cup or bar. Some cooperatives and small local chocolate makers offer tastings and sales.",
        },
      },
      {
        slug: "chateau-viale",
        category: "HISTORY",
        name: "Château Viale",
        summary: "Château de pierre des années 1940, perché dans la forêt sur les hauteurs de Kpalimé.",
        description:
          "Sur les hauteurs boisées au nord-ouest de Kpalimé, sur la route de Kouma, le château Viale a été construit de 1940 à 1944 par le Français Raymond Viale, séduit par le paysage. Propriété de l'État togolais, il a servi de résidence présidentielle et accueilli des hôtes de marque. Avec ses murs de pierre et sa tour ronde émergeant de la forêt, c'est une curiosité architecturale et un bon point de départ pour se promener dans les collines du Kloto.",
        tips: "L'accès à l'intérieur dépend des autorisations du moment : renseignez-vous sur place ou auprès de votre guide.",
        visitMinutes: 60,
        lat: 6.9520,
        lng: 0.5822,
        cover: "/images/voyage/lieu-chateau-viale",
        en: {
          name: "Château Viale",
          summary: "A 1940s stone castle perched in the forest on the heights above Kpalimé.",
          description:
            "On the wooded heights north-west of Kpalimé, on the road to Kouma, Château Viale was built between 1940 and 1944 by Frenchman Raymond Viale, who had fallen for the landscape. Owned by the Togolese state, it has served as a presidential residence and hosted distinguished guests. With its stone walls and round tower rising out of the forest, it is an architectural curiosity and a good starting point for walks in the Kloto hills.",
          tips: "Access to the interior depends on current permissions: ask on site or through your guide.",
        },
      },
      {
        slug: "cascade-de-kpime",
        category: "NATURE",
        name: "Cascade de Kpimé",
        summary: "Haute chute d'eau en plusieurs ressauts sur une falaise boisée, au nord de Kpalimé.",
        description:
          "À une dizaine de kilomètres au nord de Kpalimé, la cascade de Kpimé dévale en plusieurs chutes une falaise couverte de forêt. Le site est lié au barrage hydroélectrique de Kpimé, construit en 1962 pour alimenter Kpalimé en électricité : le débit varie fortement selon les saisons et l'usage de l'eau. Une excursion à combiner avec la cascade de Womé et les villages des collines.",
        tips: "Le débit est faible en saison sèche. Les rochers au pied de la chute sont glissants : prévoyez des chaussures adaptées.",
        bestPeriod: "Pendant et juste après la saison des pluies",
        visitMinutes: 120,
        lat: 7.0084,
        lng: 0.6456,
        cover: "/images/voyage/lieu-cascade-de-kpime",
        en: {
          name: "Kpimé Waterfall",
          summary: "A tall waterfall tumbling down a wooded cliff in several steps, north of Kpalimé.",
          description:
            "About ten kilometres north of Kpalimé, Kpimé waterfall tumbles down a forested cliff in several drops. The site is linked to the Kpimé hydroelectric dam, built in 1962 to supply Kpalimé with electricity: the flow varies greatly with the seasons and with water use. An outing easily combined with Womé waterfall and the hill villages.",
          tips: "The flow is low in the dry season. The rocks at the foot of the falls are slippery: wear suitable shoes.",
          bestPeriod: "During and just after the rainy season",
        },
      },
    ],
  },
  {
    slug: "sokode",
    name: "Sokodé",
    region: "Centrale",
    summary: "Grande ville du centre, célèbre pour la fête des couteaux (Adossa), et porte du parc de Fazao-Malfakassa.",
    description:
      "Au centre du Togo, sur la route nationale 1, Sokodé est la grande ville du pays tem (kotokoli), majoritairement musulman. Elle est surtout connue pour l'Adossa, ou fête des couteaux, l'une des grandes fêtes traditionnelles du pays. C'est aussi une étape sur la route du nord et une porte d'accès au parc national de Fazao-Malfakassa.",
    lat: 8.9833,
    lng: 1.1333,
    cover: "/images/voyage/sokode",
    en: {
      region: "Centrale",
      summary: "A major town in the centre, famous for the knife festival (Adossa), and gateway to Fazao-Malfakassa park.",
      description:
        "In the centre of Togo, on National Road 1, Sokodé is the main town of the mostly Muslim Tem (Kotokoli) people. It is best known for Adossa, the knife festival, one of the country's great traditional celebrations. It is also a stop on the road north and a gateway to Fazao-Malfakassa National Park.",
    },
    places: [
      {
        slug: "adossa-sokode",
        category: "FESTIVAL",
        name: "Adossa, la fête des couteaux",
        summary: "Grande fête tem faite de danses et de démonstrations de bravoure, aujourd'hui associée à la fête des récoltes Gadao.",
        description:
          "Grande fête des Tem de Sokodé, l'Adossa est traditionnellement liée à Gaani, le mois lunaire de la naissance du Prophète (3e mois du calendrier musulman). C'est une fête de purification et de cohésion : danseurs et musiciens défilent dans la ville, et le moment le plus spectaculaire est la danse des couteaux, où les participants manient des lames en démonstration de courage. Elle est désormais associée à Gadao, la fête des récoltes des Tem, lors d'une grande édition « Adossa-Gadao » qui s'est tenue ces dernières années en janvier et attire une foule venue de tout le pays et de la diaspora.",
        tips: "Les dates sont fixées chaque année par les organisateurs de Sokodé (elles ont longtemps suivi le calendrier musulman) : vérifiez-les avant de partir.",
        bestPeriod: "Ces dernières années en janvier (dates annoncées chaque année)",
        visitMinutes: 300,
        lat: 8.9834,
        lng: 1.1438,
        cover: "/images/voyage/lieu-adossa-sokode",
        en: {
          name: "Adossa, the knife festival",
          summary: "A major Tem festival with dances and displays of bravery, now held together with the Gadao harvest festival.",
          description:
            "The great festival of the Tem people of Sokodé, Adossa is traditionally linked to Gaani, the lunar month of the Prophet's birth (the 3rd month of the Islamic calendar). It is a festival of purification and unity: dancers and musicians parade through the town, and the most spectacular moment is the knife dance, in which participants handle blades as a display of courage. It is now combined with Gadao, the Tem harvest festival, in a major “Adossa-Gadao” edition that in recent years has been held in January and draws crowds from all over the country and the diaspora.",
          tips: "The dates are set every year by the organisers in Sokodé (they long followed the Islamic calendar): check them before leaving.",
          bestPeriod: "In recent years, January (dates announced each year)",
        },
      },
      {
        slug: "parc-national-fazao-malfakassa",
        category: "NATURE",
        name: "Parc national de Fazao-Malfakassa",
        summary: "Le plus vaste parc du Togo : collines, forêts, savanes et cascades.",
        description:
          "Entre Sokodé et Bassar, le parc national de Fazao-Malfakassa est la plus grande aire protégée du pays. Ses reliefs, falaises, forêts galeries et savanes abritent une faune discrète (antilopes, singes, nombreux oiseaux). Les infrastructures touristiques sont limitées : on y vient pour la randonnée et la nature plus que pour un safari, avec un guide et en s'organisant à l'avance.",
        tips: "Renseignez-vous sur les conditions d'accès auprès des gestionnaires du parc et réservez un guide avant de vous y rendre ; un véhicule adapté est nécessaire.",
        bestPeriod: "Novembre à mars (saison sèche)",
        visitMinutes: 480,
        lat: 8.7657,
        lng: 0.7609,
        cover: "/images/voyage/lieu-parc-national-fazao-malfakassa",
        en: {
          name: "Fazao-Malfakassa National Park",
          summary: "Togo's largest park: hills, forests, savannahs and waterfalls.",
          description:
            "Between Sokodé and Bassar, Fazao-Malfakassa National Park is the country's largest protected area. Its hills, cliffs, gallery forests and savannahs shelter elusive wildlife (antelopes, monkeys, many birds). Tourist facilities are limited: people come for hiking and nature rather than for a safari, with a guide and after planning ahead.",
          tips: "Check access conditions with the park managers and book a guide before going; a suitable vehicle is required.",
          bestPeriod: "November to March (dry season)",
        },
      },
      {
        slug: "faille-d-aledjo",
        category: "NATURE",
        name: "Faille d'Alédjo",
        summary: "Spectaculaire passage de la route nationale 1 à travers la falaise, entre Sokodé et Kara.",
        description:
          "Sur la route nationale 1, dans la préfecture d'Assoli, la route du nord franchit l'escarpement d'Alédjo par une étroite entaille dans la roche : c'est la faille d'Alédjo, l'un des paysages routiers les plus photographiés du pays. Les parois de grès couvertes de végétation et la vue sur les vallées alentour en font une halte appréciée à mi-chemin entre Sokodé et Kara, non loin de Bafilo.",
        tips: "Garez-vous en sécurité hors de la chaussée : le trafic de camions est dense sur cet axe. Évitez d'y rouler de nuit.",
        visitMinutes: 30,
        lat: 9.2749,
        lng: 1.2214,
        cover: "/images/voyage/lieu-faille-d-aledjo",
        en: {
          name: "Alédjo Gap",
          summary: "A spectacular passage of National Road 1 through the cliff, between Sokodé and Kara.",
          description:
            "On National Road 1, in the Assoli prefecture, the road north crosses the Alédjo escarpment through a narrow cut in the rock: this is the Alédjo gap (faille d'Alédjo), one of the most photographed road landscapes in the country. Its vegetation-covered sandstone walls and the view over the surrounding valleys make it a popular stop halfway between Sokodé and Kara, not far from Bafilo.",
          tips: "Park safely off the road: lorry traffic is heavy on this route. Avoid driving here at night.",
        },
      },
    ],
  },
  {
    slug: "kara",
    name: "Kara",
    region: "Kara",
    summary: "Capitale du pays kabyè, réputée pour les luttes initiatiques des Evala.",
    description:
      "Grande ville du nord, Kara est la capitale de la région du même nom et du pays kabyè, aux collines cultivées en terrasses. Ville moderne et aérée, elle est surtout connue pour les Evala, rites initiatiques marqués par la lutte traditionnelle, qui attirent chaque été des foules de spectateurs. C'est la base naturelle pour découvrir le Koutammakou.",
    lat: 9.55,
    lng: 1.1833,
    cover: "/images/voyage/kara",
    en: {
      region: "Kara",
      summary: "Capital of Kabye country, famous for the Evala initiation wrestling.",
      description:
        "A major town of the north, Kara is the capital of the region of the same name and of Kabye country, with its terraced hills. A modern, spacious town, it is best known for the Evala, initiation rites centred on traditional wrestling that draw crowds of spectators every summer. It is the natural base for exploring Koutammakou.",
    },
    places: [
      {
        slug: "evala-kara",
        category: "FESTIVAL",
        name: "Les Evala",
        summary: "Rites initiatiques kabyè rythmés par des combats de lutte traditionnelle.",
        description:
          "Les Evala marquent le passage à l'âge adulte des jeunes hommes kabyè. Pendant plusieurs jours, les initiés s'affrontent dans des combats de lutte traditionnelle, au son des tambours et sous les encouragements des villages, à Kara et dans les cantons voisins. Au-delà du spectacle, c'est un rite important de la vie sociale kabyè.",
        tips: "Le programme est fixé localement chaque année : renseignez-vous sur les lieux et les jours des combats. Restez à la place indiquée aux spectateurs.",
        bestPeriod: "Juillet",
        visitMinutes: 240,
        cover: "/images/voyage/lieu-evala-kara",
        en: {
          name: "The Evala",
          summary: "Kabye initiation rites marked by traditional wrestling bouts.",
          description:
            "The Evala mark the passage to adulthood for young Kabye men. Over several days, the initiates face each other in traditional wrestling bouts, to the sound of drums and cheered on by their villages, in Kara and the neighbouring cantons. Beyond the spectacle, it is an important rite of Kabye social life.",
          tips: "The programme is set locally every year: ask where and when the bouts take place. Stay in the area set aside for spectators.",
          bestPeriod: "July",
        },
      },
      {
        slug: "tchoukoutou-kara",
        category: "GASTRONOMY",
        name: "Tchoukoutou et cuisine du nord",
        summary: "Bière de mil artisanale et plats de pâte et de sauce, dans les cabarets et maquis de Kara.",
        description:
          "Dans le nord du Togo, le tchoukoutou, bière de mil (sorgho) brassée par les femmes, se partage dans les cabarets de quartier, souvent servie dans des calebasses. On l'accompagne de plats de pâte (de maïs, de mil ou d'igname) et de sauces aux légumes, à l'arachide ou au gombo, que l'on goûte dans les maquis de Kara.",
        visitMinutes: 90,
        cover: "/images/voyage/lieu-tchoukoutou-kara",
        en: {
          name: "Tchoukoutou and northern cuisine",
          summary: "Home-brewed millet beer and dishes of pâte and sauce, in Kara's cabarets and maquis.",
          description:
            "In northern Togo, tchoukoutou, a millet (sorghum) beer brewed by women, is shared in neighbourhood cabarets, often served in calabashes. It goes with pâte (a stiff porridge of maize, millet or yam) and vegetable, groundnut or okra sauces, which you can try in Kara's maquis (local eateries).",
        },
      },
    ],
  },
  {
    slug: "koutammakou",
    name: "Koutammakou, le pays des Batammariba",
    region: "Kara",
    summary: "Paysage culturel inscrit à l'UNESCO, célèbre pour ses maisons-forteresses de terre, les takienta.",
    description:
      "Au nord-est de Kara, le long de la frontière béninoise, le Koutammakou est le pays des Batammariba. Leurs maisons-forteresses à étages et tourelles, les takienta, dispersées dans un paysage de collines et de champs, forment un paysage culturel vivant inscrit au patrimoine mondial de l'UNESCO depuis 2004. Depuis 2023, le bien inscrit s'étend aussi au Bénin voisin, au pays des Tata Somba. Il se situe juste au sud de la région des Savanes, déconseillée : restez dans le Koutammakou et vérifiez les conseils aux voyageurs avant de partir.",
    lat: 10.0667,
    lng: 1.1333,
    cover: "/images/voyage/koutammakou",
    en: {
      name: "Koutammakou, land of the Batammariba",
      region: "Kara",
      summary: "A UNESCO-listed cultural landscape famous for its earthen fortress houses, the takienta.",
      description:
        "North-east of Kara, along the Beninese border, Koutammakou is the land of the Batammariba. Their multi-storey, turreted fortress houses, the takienta, scattered across a landscape of hills and fields, form a living cultural landscape listed as a UNESCO World Heritage Site since 2004. Since 2023, the listed property has also extended into neighbouring Benin, the land of the Tata Somba. It lies just south of the Savanes region, which travellers are advised to avoid: stay within Koutammakou and check travel advice before you go.",
    },
    places: [
      {
        slug: "paysage-culturel-koutammakou",
        category: "HISTORY",
        name: "Paysage culturel du Koutammakou",
        summary: "Un paysage vivant où l'habitat, les champs et les lieux sacrés reflètent la culture batammariba.",
        description:
          "Le Koutammakou n'est pas un monument mais un territoire habité : maisons-tours, champs, forêts et rochers sacrés, lieux d'initiation composent un paysage façonné par les Batammariba et leur rapport à la nature. La découverte se fait avec un guide local, par les pistes qui relient les hameaux, et permet de comprendre l'organisation sociale et spirituelle de la région.",
        tips: "Passez par un guide de la région ; certains lieux sacrés ne se visitent pas. Évitez la route de nuit et ne vous aventurez pas au nord, vers la région des Savanes.",
        bestPeriod: "Novembre à février (saison sèche, pistes praticables)",
        visitMinutes: 360,
        lat: 10.0669,
        lng: 1.1331,
        cover: "/images/voyage/lieu-paysage-culturel-koutammakou",
        en: {
          name: "Koutammakou cultural landscape",
          summary: "A living landscape where homes, fields and sacred sites reflect Batammariba culture.",
          description:
            "Koutammakou is not a monument but an inhabited territory: tower houses, fields, sacred forests and rocks, and initiation sites make up a landscape shaped by the Batammariba and their relationship with nature. It is explored with a local guide along the tracks linking the hamlets, giving insight into the region's social and spiritual organisation.",
          tips: "Go with a guide from the area; some sacred places cannot be visited. Avoid driving at night and do not venture north into the Savanes region.",
          bestPeriod: "November to February (dry season, passable tracks)",
        },
      },
      {
        slug: "takienta-nadoba",
        category: "CULTURE",
        name: "Takienta de Nadoba",
        summary: "Visite d'une maison-forteresse batammariba, de la cour d'entrée aux greniers à l'étage.",
        description:
          "Autour du village de Nadoba, principal point d'accueil des visiteurs, des familles ouvrent leur takienta. Bâtie en terre, cette maison-forteresse réunit au rez-de-chaussée l'espace des animaux et des autels, et à l'étage une terrasse, les chambres et les greniers à tourelles. Le guide explique la symbolique de chaque partie et les savoir-faire de construction, transmis de génération en génération.",
        tips: "Une participation est généralement demandée par la famille qui vous reçoit ; demandez toujours avant de photographier.",
        visitMinutes: 120,
        lat: 10.1385,
        lng: 1.0806,
        cover: "/images/voyage/lieu-takienta-nadoba",
        en: {
          name: "Takienta of Nadoba",
          summary: "Visiting a Batammariba fortress house, from the entrance yard to the upstairs granaries.",
          description:
            "Around the village of Nadoba, the main welcome point for visitors, families open their takienta to guests. Built of earth, this fortress house brings together the animals' quarters and altars on the ground floor and, upstairs, a terrace, bedrooms and turreted granaries. The guide explains the symbolism of each part and the building skills passed down from generation to generation.",
          tips: "The family hosting you usually asks for a contribution; always ask before taking photos.",
        },
      },
    ],
  },
  {
    slug: "notse",
    name: "Notsé",
    region: "Plateaux",
    summary: "Berceau historique des Éwé, ville des murailles d'Agbogbo et de la grande fête d'Agbogbo-za.",
    description:
      "À environ 90 km au nord de Lomé, chef-lieu de la préfecture du Haho, Notsé est considérée comme le berceau traditionnel des Éwé, dont les ancêtres se sont dispersés d'ici vers le sud du Togo et du Ghana. On y voit les derniers vestiges des remparts d'Agbogbo et un monument dédié au « berceau du peuple éwé ». Début septembre, la fête d'Agbogbo-za y rassemble des Éwé du Togo, du Ghana, du Bénin et de la diaspora.",
    lat: 6.9480,
    lng: 1.1703,
    cover: "/images/voyage/notse",
    en: {
      region: "Plateaux",
      summary: "The historic cradle of the Ewe people, home of the Agbogbo walls and the great Agbogbo-za festival.",
      description:
        "About 90 km north of Lomé, the seat of Haho prefecture, Notsé is regarded as the traditional cradle of the Ewe people, whose ancestors dispersed from here towards southern Togo and Ghana. You can see the last remains of the Agbogbo ramparts and a monument dedicated to the “cradle of the Ewe people”. In early September, the Agbogbo-za festival brings together Ewe people from Togo, Ghana, Benin and the diaspora.",
    },
    places: [
      {
        slug: "murailles-agbogbo-notse",
        category: "HISTORY",
        name: "Murailles d'Agbogbo",
        summary: "Vestiges des remparts de terre de l'ancien royaume de Notsé, berceau des Éwé.",
        description:
          "Selon la tradition, le roi Agokoli, dont le règne est situé au XVIIe ou au début du XVIIIe siècle selon les sources, fit élever autour de Notsé des remparts en argile pétrie, l'Agbogbo. Sa dureté aurait poussé une partie de la population à fuir : c'est cet exode fondateur que commémore chaque année la fête d'Agbogbo-za. Il ne subsiste que quelques fragments des murailles, protégés de l'érosion par des abris, ainsi que des pavements anciens mis au jour par les fouilles archéologiques.",
        tips: "Visitez avec un guide local ou en vous présentant à la chefferie ; certains lieux voisins sont sacrés.",
        visitMinutes: 60,
        cover: "/images/voyage/lieu-murailles-agbogbo-notse",
        en: {
          name: "Agbogbo walls",
          summary: "Remains of the earthen ramparts of the old kingdom of Notsé, cradle of the Ewe people.",
          description:
            "According to tradition, King Agokoli, whose reign is placed in the 17th or early 18th century depending on the source, had ramparts of kneaded clay, the Agbogbo, built around Notsé. His harshness is said to have driven part of the population to flee: this founding exodus is commemorated every year by the Agbogbo-za festival. Only a few fragments of the walls remain, protected from erosion by shelters, along with ancient pavements uncovered by archaeological digs.",
          tips: "Visit with a local guide or by introducing yourself to the traditional chiefs; some nearby places are sacred.",
        },
      },
    ],
  },
  {
    slug: "badou",
    name: "Badou",
    region: "Plateaux",
    summary: "Petite ville des collines du Wawa, entre forêts, plantations de café et de cacao et cascade d'Akloa.",
    description:
      "Chef-lieu de la préfecture de Wawa, près de la frontière ghanéenne, Badou est entourée de collines boisées où l'on cultive le café et le cacao. On y vient surtout pour la cascade d'Akloa, l'une des chutes les plus réputées du pays, au bout d'une marche en forêt. Une étape nature hors des sentiers battus, plus au nord que Kpalimé, dans la même région des Plateaux.",
    lat: 7.5833,
    lng: 0.6074,
    cover: "/images/voyage/badou",
    en: {
      region: "Plateaux",
      summary: "A small town in the Wawa hills, among forests, coffee and cocoa plantations and Akloa waterfall.",
      description:
        "The seat of Wawa prefecture, near the Ghanaian border, Badou is surrounded by wooded hills where coffee and cocoa are grown. People come mainly for Akloa waterfall, one of the country's best-known falls, reached by a walk through the forest. An off-the-beaten-track nature stop, further north than Kpalimé in the same Plateaux region.",
    },
    places: [
      {
        slug: "cascade-d-akloa",
        category: "NATURE",
        name: "Cascade d'Akloa",
        summary: "Haute cascade au cœur de la forêt, atteinte par un sentier depuis le village d'Akloa.",
        description:
          "Près de Badou, la cascade d'Akloa (ou Akrowa) tombe d'une haute paroi rocheuse dans un cadre de forêt dense. On l'atteint à pied par un sentier qui part du village d'Akloa et traverse ruisseaux et plantations : la marche fait partie du plaisir. Le bassin et les rochers au pied de la chute offrent une pause rafraîchissante.",
        tips: "Partez avec un guide du village, de bonnes chaussures et de l'eau ; le sentier est glissant après la pluie.",
        bestPeriod: "Pendant et après la saison des pluies (débit plus fort)",
        visitMinutes: 180,
        cover: "/images/voyage/lieu-cascade-d-akloa",
        en: {
          name: "Akloa Waterfall",
          summary: "A tall waterfall deep in the forest, reached by a path from Akloa village.",
          description:
            "Near Badou, Akloa (or Akrowa) waterfall drops from a high rock face in a setting of dense forest. It is reached on foot by a path that starts from Akloa village and crosses streams and plantations: the walk is part of the pleasure. The pool and rocks at the foot of the falls offer a refreshing break.",
          tips: "Go with a guide from the village, good shoes and water; the path is slippery after rain.",
          bestPeriod: "During and after the rainy season (stronger flow)",
        },
      },
    ],
  },
  {
    slug: "bassar",
    name: "Bassar",
    region: "Kara",
    summary: "Ville du pays bassar, au cœur d'une région de métallurgie ancienne du fer inscrite sur la liste indicative de l'UNESCO.",
    description:
      "À l'ouest de Kara, Bassar est le chef-lieu d'une préfecture de collines et de savanes arborées. Sa région est l'un des grands foyers anciens de la métallurgie du fer en Afrique de l'Ouest : fourneaux, amas de scories et anciennes mines jalonnent les environs, notamment autour de Bandjéli. Pays d'igname, elle célèbre aussi la fête des récoltes D'pontr, qui marque le nouvel an des Bassar et des Konkomba. Vérifiez les conseils aux voyageurs avant de partir : la région des Savanes, plus au nord, est déconseillée.",
    lat: 9.2609,
    lng: 0.7800,
    en: {
      region: "Kara",
      summary: "A town in Bassar country, at the heart of an ancient iron-working region on UNESCO's Tentative List.",
      description:
        "West of Kara, Bassar is the seat of a prefecture of hills and wooded savannah. Its region is one of the great ancient centres of iron-working in West Africa: furnaces, slag heaps and old mines dot the surroundings, especially around Bandjéli. Yam country, it also celebrates the D'pontr harvest festival, which marks the new year of the Bassar and Konkomba peoples. Check travel advice before you go: the Savanes region, further north, is to be avoided.",
    },
    places: [
      {
        slug: "sites-metallurgiques-bassar",
        category: "HISTORY",
        name: "Sites de la métallurgie ancienne du fer de Bassar",
        summary: "Fourneaux, scories et anciennes mines d'un foyer sidérurgique actif pendant plus de deux millénaires.",
        description:
          "Autour de Bassar, à Bandjéli, Nangbani, Bitchabé ou Kabou notamment, subsistent les vestiges d'une métallurgie du fer dont les plus anciennes traces remontent, selon l'UNESCO, au Ve siècle avant notre ère, et qui s'est poursuivie jusqu'au milieu du XXe siècle : hauts fourneaux en terre, bases de fourneaux, amas de scories, mines et forges. Ces sites figurent depuis 2021 sur la liste indicative du patrimoine mondial. La visite, encore peu organisée, se prépare avec un guide local.",
        tips: "Renseignez-vous à Bassar ou auprès de la chefferie de Bandjéli. Ne ramassez ni scories ni fragments : ils font partie du patrimoine archéologique.",
        bestPeriod: "Novembre à mars (saison sèche)",
        visitMinutes: 180,
        cover: "/images/voyage/lieu-sites-metallurgiques-bassar",
        en: {
          name: "Ancient iron-working sites of Bassar",
          summary: "Furnaces, slag and old mines from an iron-making centre active for more than two millennia.",
          description:
            "Around Bassar, notably in Bandjéli, Nangbani, Bitchabé and Kabou, survive the remains of an iron industry whose oldest traces date back, according to UNESCO, to the 5th century BCE, and which continued until the mid-20th century: earthen blast furnaces, furnace bases, slag heaps, mines and forges. These sites have been on the World Heritage Tentative List since 2021. Visits, still little organised, are best arranged with a local guide.",
          tips: "Ask in Bassar or at the chief's compound in Bandjéli. Do not pick up slag or fragments: they are part of the archaeological heritage.",
          bestPeriod: "November to March (dry season)",
        },
      },
    ],
  },
];

export const TOGO_CIRCUITS: SeedCircuit[] = [
  {
    slug: "togo-sud-6-jours",
    title: "Le sud du Togo en 6 jours",
    summary:
      "Lomé et ses marchés, la mémoire d'Agbodrafo, la traversée du lac Togo vers Togoville, la vieille ville d'Aného puis les collines, cascades et plantations de Kpalimé.",
    days: 6,
    cover: "/images/voyage/lac-togo",
    en: {
      title: "Southern Togo in 6 days",
      summary:
        "Lomé and its markets, the memory of Agbodrafo, the Lake Togo crossing to Togoville, Aného's old town, then the hills, waterfalls and plantations of Kpalimé.",
    },
    steps: [
      { day: 1, place: "grand-marche-lome", note: "Arrivée, installation et premier contact avec la ville.", noteEn: "Arrival, check-in and a first feel for the city." },
      { day: 1, place: "monument-de-l-independance-lome" },
      { day: 1, place: "palais-de-lome" },
      { day: 2, place: "musee-national-togo" },
      { day: 2, place: "marche-des-feticheurs-akodessewa" },
      { day: 3, place: "maison-des-esclaves-agbodrafo", note: "Route vers l'est le long de la côte (environ 1 h).", noteEn: "Drive east along the coast (about 1 hour)." },
      { day: 3, place: "traversee-du-lac-togo" },
      { day: 3, place: "sanctuaire-notre-dame-togoville" },
      { day: 3, place: "monument-du-centenaire-togoville" },
      { day: 4, place: "vieille-ville-aneho", note: "Matinée à Aného, puis route vers Kpalimé via Lomé (une demi-journée).", noteEn: "Morning in Aného, then drive to Kpalimé via Lomé (half a day)." },
      { day: 5, place: "mont-agou", note: "Randonnée matinale avec un guide.", noteEn: "Morning hike with a guide." },
      { day: 5, place: "cafe-cacao-kpalime" },
      { day: 6, place: "cascade-de-wome" },
      { day: 6, place: "centre-artisanal-kpalime" },
      { day: 6, destination: "lome", note: "Retour à Lomé (environ 2 h 30 de route).", noteEn: "Back to Lomé (about 2 h 30 by road)." },
    ],
  },
  {
    slug: "togo-centre-nord-6-jours",
    title: "Le centre et le nord du Togo en 6 jours",
    summary:
      "De Sokodé au Koutammakou : le parc de Fazao-Malfakassa, le pays kabyè autour de Kara et les takienta des Batammariba, inscrites à l'UNESCO. Voyage en voiture avec chauffeur-guide conseillé ; la région des Savanes, déconseillée, n'est pas incluse.",
    days: 6,
    cover: "/images/voyage/koutammakou",
    en: {
      title: "Central and northern Togo in 6 days",
      summary:
        "From Sokodé to Koutammakou: Fazao-Malfakassa park, Kabye country around Kara and the UNESCO-listed takienta of the Batammariba. Travelling by car with a driver-guide is recommended; the Savanes region, which travellers are advised to avoid, is not included.",
    },
    steps: [
      { day: 1, destination: "sokode", note: "Longue route depuis Lomé par la nationale 1 : départ tôt pour arriver avant la nuit.", noteEn: "Long drive from Lomé on National Road 1: leave early to arrive before dark." },
      { day: 2, place: "parc-national-fazao-malfakassa", note: "Journée nature, organisée à l'avance avec un guide.", noteEn: "Nature day, arranged in advance with a guide." },
      { day: 3, destination: "kara", note: "Route vers Kara (environ 1 h 30) et découverte de la ville.", noteEn: "Drive to Kara (about 1 h 30) and explore the town." },
      { day: 3, place: "tchoukoutou-kara" },
      { day: 4, place: "paysage-culturel-koutammakou", note: "Journée en pays batammariba avec un guide local, retour à Kara avant la nuit.", noteEn: "Day in Batammariba country with a local guide, back in Kara before dark." },
      { day: 4, place: "takienta-nadoba" },
      { day: 5, destination: "kpalime", note: "Longue route de retour vers le sud, jusqu'aux collines de Kpalimé.", noteEn: "Long drive back south to the hills of Kpalimé." },
      { day: 6, place: "centre-artisanal-kpalime" },
      { day: 6, destination: "lome", note: "Retour à Lomé (environ 2 h 30 de route).", noteEn: "Back to Lomé (about 2 h 30 by road)." },
    ],
  },
];
