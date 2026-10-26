/**
 * Contenu de départ du guide Burkina Faso (fr + en). Rédigé à partir de
 * connaissances générales : `reviewed = false` partout → affiché « à relire »
 * dans l'admin tant qu'une personne ne l'a pas vérifié. Volontairement sans
 * horaires ni tarifs (qui changent) : ces champs restent à compléter.
 *
 * Sécurité : à la rédaction (octobre 2026), France Diplomatie (mise à jour du
 * 10 septembre 2026) déconseille formellement tout déplacement au Burkina Faso
 * et le FCDO britannique déconseille tout voyage dans le pays. Le guide est donc
 * un guide « patrimoine », sans circuit, pour préparer un voyage quand les
 * conditions le permettront. À réexaminer à chaque évolution de ces conseils.
 */

import type { SeedCircuit, SeedDestination, SeedGuide } from "./types";

const TIP_SECU =
  "Tout le Burkina Faso est actuellement formellement déconseillé aux voyageurs : ce lieu est présenté pour préparer un voyage futur, quand les conseils officiels le permettront.";
const TIP_SECU_EN =
  "All of Burkina Faso is currently advised against for travellers: this place is presented to help plan a future trip, once official advice allows it.";

export const BURKINA_GUIDE: SeedGuide = {
  country: "BF",
  intro:
    "Tout voyage au Burkina Faso est aujourd'hui formellement déconseillé par la France et le Royaume-Uni, en raison de la menace terroriste et du risque d'enlèvement : ce guide présente le patrimoine du « pays des hommes intègres » pour préparer un voyage quand les conditions le permettront. Mosquée de terre de Bobo-Dioulasso, ruines de Loropéni inscrites à l'UNESCO, cases peintes de Tiébélé, cascades et pics de grès de la région de Banfora, et à Ouagadougou le FESPACO, grand rendez-vous du cinéma africain : le pays possède l'un des patrimoines culturels les plus riches d'Afrique de l'Ouest.",
  sections: [
    {
      title: "Formalités d'entrée",
      body: "Un visa est demandé à la plupart des voyageurs ; les ressortissants de plusieurs pays d'Afrique de l'Ouest en sont dispensés. Les conditions (visa en ligne, pièces demandées) évoluent : vérifiez-les auprès des autorités burkinabè et des conseils aux voyageurs de votre pays avant tout projet. Notez que la France n'a plus d'ambassade ni de consulat ouverts à Ouagadougou.",
    },
    {
      title: "Santé",
      body: "Le certificat de vaccination contre la fièvre jaune est exigé à l'entrée. Le paludisme est présent dans tout le pays : demandez conseil à un médecin ou à un centre de vaccinations internationales pour un traitement préventif, et protégez-vous des moustiques (répulsif, moustiquaire). Le pays se trouve dans la « ceinture de la méningite » : interrogez votre médecin sur les vaccins recommandés. Buvez de l'eau en bouteille et prévoyez une bonne protection contre la chaleur.",
    },
    {
      title: "Monnaie et paiements",
      body: "La monnaie est le franc CFA (XOF), à parité fixe avec l'euro (1 € = 655,957 F CFA). Les espèces sont indispensables ; le paiement mobile (mobile money) est très répandu. Les cartes bancaires ne sont acceptées que dans quelques hôtels et commerces des grandes villes.",
    },
    {
      title: "Quand partir",
      body: "La saison sèche et relativement fraîche, de novembre à février, est la plus agréable, avec l'harmattan (vent sec et poussiéreux venu du Sahara). De mars à mai, la chaleur devient très forte. La saison des pluies s'étend environ de juin à septembre, plus longue dans le sud-ouest, plus courte dans le Sahel au nord.",
    },
    {
      title: "Langues et usages",
      body: "Le français est la langue de l'administration et la plus utilisée par les voyageurs ; le mooré, le dioula et le fulfuldé, entre autres, sont parlés au quotidien. Les salutations, longues et soignées, sont essentielles avant toute demande. Les traditions (chefferies, masques, lieux sacrés) restent très vivantes : suivez les consignes, et demandez toujours avant de photographier une personne, un lieu sacré ou une cérémonie.",
    },
    {
      title: "Se déplacer",
      body: "Dans les villes, on circule en taxi ou en deux-roues ; entre les villes, des compagnies d'autocars relient les principales localités. Les routes interurbaines sont toutefois particulièrement exposées aux attaques et aux enlèvements : ne prévoyez aucun déplacement sans avoir consulté les conseils officiels à jour, qui déconseillent actuellement tout voyage dans le pays.",
    },
    {
      title: "Électricité et téléphone",
      body: "Courant 220 V, prises de type C et E (prises européennes). Les coupures d'électricité sont fréquentes. Une carte SIM locale (pièce d'identité demandée) donne accès à l'internet mobile et au mobile money.",
    },
    {
      title: "Sécurité",
      body: "À la date de rédaction, France Diplomatie (« Conseils aux voyageurs ») déconseille formellement tout déplacement au Burkina Faso, sur l'ensemble du territoire, Ouagadougou comprise, et le ministère britannique des Affaires étrangères (FCDO) déconseille tout voyage dans le pays. Ces avis s'expliquent par la présence de groupes armés, la menace terroriste, le risque d'enlèvement et une situation politique instable ; les relations diplomatiques avec la France sont par ailleurs rompues, ce qui limite fortement l'assistance consulaire. Les assurances voyage peuvent ne pas couvrir un séjour dans une zone déconseillée. Ce guide n'a pas vocation à organiser un voyage aujourd'hui : consultez France Diplomatie, le FCDO ou les conseils de votre propre pays, et attendez que leurs recommandations évoluent.",
    },
  ],
  en: {
    intro:
      "All travel to Burkina Faso is currently advised against by France and the United Kingdom because of the terrorist threat and the risk of kidnapping: this guide presents the heritage of the “land of upright people” to help plan a trip once conditions allow. The earthen mosque of Bobo-Dioulasso, the UNESCO-listed Ruins of Loropéni, the painted houses of Tiébélé, the waterfalls and sandstone peaks around Banfora and, in Ouagadougou, FESPACO, the great showcase of African cinema: the country has one of the richest cultural heritages in West Africa.",
    sections: [
      {
        title: "Entry requirements",
        body: "Most travellers need a visa; nationals of several West African countries are exempt. Requirements (online visa, documents) change: check them with the Burkinabè authorities and your country's travel advice before making any plans. Note that France no longer has an open embassy or consulate in Ouagadougou.",
      },
      {
        title: "Health",
        body: "A yellow fever vaccination certificate is required on entry. Malaria is present throughout the country: ask a doctor or travel clinic about preventive treatment and protect yourself from mosquitoes (repellent, net). The country lies in the “meningitis belt”: ask your doctor about recommended vaccines. Drink bottled water and protect yourself well against the heat.",
      },
      {
        title: "Money and payments",
        body: "The currency is the CFA franc (XOF), pegged to the euro (€1 = 655.957 CFA francs). Cash is essential; mobile money is widely used. Bank cards are accepted only in a few hotels and shops in the big cities.",
      },
      {
        title: "When to go",
        body: "The dry, relatively cool season from November to February is the most pleasant, with the harmattan (a dry, dusty wind from the Sahara). From March to May the heat becomes intense. The rainy season runs roughly from June to September, longer in the south-west and shorter in the Sahel in the north.",
      },
      {
        title: "Languages and customs",
        body: "French is the language of administration and the one most used by travellers; Mooré, Dioula and Fulfulde, among others, are spoken daily. Greetings, long and careful, are essential before asking anything. Traditions (chieftaincies, masks, sacred places) remain very much alive: follow instructions, and always ask before photographing a person, a sacred place or a ceremony.",
      },
      {
        title: "Getting around",
        body: "In towns, people get around by taxi or on two wheels; between towns, coach companies link the main centres. Intercity roads are, however, particularly exposed to attacks and kidnappings: do not plan any journey without checking up-to-date official advice, which currently advises against all travel to the country.",
      },
      {
        title: "Electricity and phone",
        body: "220 V, type C and E plugs (European sockets). Power cuts are frequent. A local SIM card (ID required) gives access to mobile internet and mobile money.",
      },
      {
        title: "Safety",
        body: "At the time of writing, France Diplomatie (“Conseils aux voyageurs”) formally advises against all travel to Burkina Faso, across the whole country including Ouagadougou, and the UK Foreign, Commonwealth & Development Office (FCDO) advises against all travel to the country. This advice reflects the presence of armed groups, the terrorist threat, the risk of kidnapping and an unstable political situation; diplomatic relations with France have also been broken off, which severely limits consular assistance. Travel insurance may not cover a stay in an area that is advised against. This guide is not meant for organising a trip today: check France Diplomatie, the FCDO or your own country's advice, and wait for their recommendations to change.",
      },
    ],
  },
};

export const BURKINA_DESTINATIONS: SeedDestination[] = [
  {
    slug: "ouagadougou",
    cover: "/images/voyage/ouagadougou",
    name: "Ouagadougou",
    region: "Kadiogo (ex-Centre)",
    summary: "Capitale du pays et des Mossi, ville du FESPACO et de l'artisanat.",
    description:
      "Siège du Mogho Naaba, roi des Mossi de Ouagadougou, la capitale est aussi la capitale culturelle du pays : FESPACO, Salon international de l'artisanat, Musée national, scène musicale et théâtrale animée, maquis où l'on déguste le poulet grillé. Comme le reste du pays, la ville est aujourd'hui formellement déconseillée aux voyageurs par les autorités françaises et britanniques.",
    lat: 12.3714,
    lng: -1.5197,
    en: {
      region: "Kadiogo (formerly Centre)",
      summary: "Capital of the country and of the Mossi, home of FESPACO and of crafts.",
      description:
        "Seat of the Mogho Naaba, king of the Mossi of Ouagadougou, the capital is also the country's cultural capital: FESPACO, the International Crafts Fair, the National Museum, a lively music and theatre scene, and maquis (local eateries) serving grilled chicken. Like the rest of the country, the city is currently advised against for travellers by the French and British authorities.",
    },
    places: [
      {
        slug: "musee-national-burkina-faso",
        cover: "/images/voyage/lieu-musee-national-burkina-faso",
        lat: 12.3771,
        lng: -1.4726,
        category: "MUSEUM",
        name: "Musée national du Burkina Faso",
        summary: "Masques, statuaire, costumes et objets des nombreux peuples du pays.",
        description:
          "Le Musée national présente la diversité culturelle du Burkina Faso à travers ses collections de masques, de statues, de costumes, de bijoux et d'objets du quotidien. Une introduction précieuse aux traditions des Mossi, Bobo, Lobi, Gourounsi, Peuls et des autres peuples du pays.",
        tips: TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "National Museum of Burkina Faso",
          summary: "Masks, statues, costumes and objects from the country's many peoples.",
          description:
            "The National Museum presents Burkina Faso's cultural diversity through its collections of masks, statues, costumes, jewellery and everyday objects. A valuable introduction to the traditions of the Mossi, Bobo, Lobi, Gurunsi, Fulani and the country's other peoples.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "ceremonie-du-moro-naba",
        cover: "/images/voyage/lieu-ceremonie-du-moro-naba",
        lat: 12.3583,
        lng: -1.5287,
        category: "CULTURE",
        name: "Cérémonie du Moro-Naba",
        summary: "Rituel hebdomadaire de la cour du roi des Mossi, dit du « faux départ ».",
        description:
          "Chaque vendredi, devant le palais du Mogho Naaba (ou Moro-Naba), roi des Mossi de Ouagadougou, se déroule une courte cérémonie coutumière dite du « faux départ » : selon la tradition, le roi, prêt à partir, est retenu par ses dignitaires. Un rituel qui témoigne de la place toujours importante de la chefferie mossi.",
        tips: "Tenue correcte, discrétion et respect strict des consignes, notamment pour les photos. " + TIP_SECU,
        visitMinutes: 45,
        en: {
          name: "Moro-Naba ceremony",
          summary: "Weekly ritual at the court of the king of the Mossi, known as the “false departure”.",
          description:
            "Every Friday, in front of the palace of the Mogho Naaba (or Moro-Naba), king of the Mossi of Ouagadougou, a short customary ceremony known as the “false departure” takes place: according to tradition, the king, ready to leave, is held back by his dignitaries. A ritual that shows the enduring importance of the Mossi chieftaincy.",
          tips: "Dress respectfully, be discreet and strictly follow instructions, especially about photos. " + TIP_SECU_EN,
        },
      },
      {
        slug: "fespaco",
        cover: "/images/voyage/lieu-fespaco",
        category: "FESTIVAL",
        name: "FESPACO",
        summary: "Le Festival panafricain du cinéma et de la télévision de Ouagadougou, tous les deux ans.",
        description:
          "Créé en 1969, le FESPACO est le plus grand festival de cinéma du continent africain. Tous les deux ans, Ouagadougou accueille projections, rencontres professionnelles et marché du film ; le grand prix, l'Étalon d'or de Yennenga, porte le nom de la princesse légendaire, mère fondatrice du peuple mossi.",
        tips: "Dates et programme sont publiés par les organisateurs à chaque édition. " + TIP_SECU,
        bestPeriod: "Années impaires, généralement en février ou début mars",
        visitMinutes: 480,
        en: {
          summary: "The Pan-African Film and Television Festival of Ouagadougou, held every two years.",
          description:
            "Founded in 1969, FESPACO is the largest film festival on the African continent. Every two years Ouagadougou hosts screenings, industry meetings and a film market; the top prize, the Golden Stallion of Yennenga, is named after the legendary princess who was the founding mother of the Mossi people.",
          tips: "Dates and the programme are published by the organisers for each edition. " + TIP_SECU_EN,
          bestPeriod: "Odd-numbered years, usually in February or early March",
        },
      },
      {
        slug: "siao-ouagadougou",
        cover: "/images/voyage/lieu-siao-ouagadougou",
        category: "MARKET",
        name: "Salon international de l'artisanat de Ouagadougou (SIAO)",
        summary: "Grand salon biennal de l'artisanat africain : bronzes, textiles, cuir, vannerie.",
        description:
          "Organisé tous les deux ans à Ouagadougou depuis la fin des années 1980, le SIAO réunit des artisans du Burkina Faso et de nombreux pays d'Afrique : bronzes coulés à la cire perdue, textiles tissés (dont le Faso Dan Fani, pagne national), maroquinerie, poterie, vannerie. La vitrine de savoir-faire dont le pays est très fier.",
        tips: "Dates publiées par les organisateurs à chaque édition. " + TIP_SECU,
        visitMinutes: 240,
        en: {
          name: "Ouagadougou International Crafts Fair (SIAO)",
          summary: "Major biennial fair of African crafts: bronzes, textiles, leather, basketry.",
          description:
            "Held every two years in Ouagadougou since the late 1980s, SIAO brings together artisans from Burkina Faso and many African countries: lost-wax bronzes, woven textiles (including Faso Dan Fani, the national cloth), leatherwork, pottery and basketry. A showcase of skills the country is very proud of.",
          tips: "Dates are published by the organisers for each edition. " + TIP_SECU_EN,
        },
      },
      {
        slug: "maison-du-peuple-ouagadougou",
        category: "HISTORY",
        cover: "/images/voyage/lieu-maison-du-peuple-ouagadougou",
        name: "Maison du peuple",
        summary: "Grande salle de spectacles et de meetings des années 1960, au toit hérissé de lanterneaux.",
        description:
          "Achevée en 1965 sur les plans de l'architecte René Faublée, la Maison du peuple est l'un des édifices emblématiques du centre de Ouagadougou : un vaste volume aux façades ocre, couronné de lanterneaux en forme de cases. Elle a accueilli congrès, meetings, concerts et grandes cérémonies de l'histoire du pays. Le Burkina Faso l'a inscrite en 2026 sur sa liste indicative du patrimoine mondial de l'UNESCO, au titre de l'architecture moderne.",
        tips: "Bâtiment public : l'intérieur ne se visite qu'à l'occasion d'événements. " + TIP_SECU,
        visitMinutes: 30,
        lat: 12.3722,
        lng: -1.5236,
        en: {
          name: "Maison du Peuple (People's House)",
          summary: "A large 1960s hall for shows and rallies, its roof bristling with lantern turrets.",
          description:
            "Completed in 1965 to plans by the architect René Faublée, the Maison du Peuple is one of the landmark buildings of central Ouagadougou: a vast ochre volume topped with lantern turrets shaped like traditional huts. It has hosted congresses, rallies, concerts and many major ceremonies in the country's history. In 2026 Burkina Faso added it to its UNESCO World Heritage Tentative List as an example of modern architecture.",
          tips: "A public building: the interior can only be seen during events. " + TIP_SECU_EN,
        },
      },
      {
        slug: "memorial-thomas-sankara",
        category: "HISTORY",
        cover: "/images/voyage/lieu-memorial-thomas-sankara",
        name: "Mémorial et mausolée Thomas-Sankara",
        summary: "Le lieu de mémoire du président Thomas Sankara, sur le site où il fut assassiné en 1987.",
        description:
          "Le mémorial a été érigé sur le site du Conseil de l'Entente, où le président Thomas Sankara et douze de ses compagnons ont été assassinés le 15 octobre 1987. Il comprend une grande statue du « père de la révolution », la salle où s'est déroulé le drame et, depuis mai 2025, un mausolée conçu par l'architecte burkinabè Francis Kéré, lauréat du prix Pritzker, où reposent les treize victimes. Un lieu de recueillement très fréquenté, notamment autour du 15 octobre.",
        tips: "Lieu de mémoire : tenue correcte et attitude respectueuse ; renseignez-vous sur place pour les photos. " + TIP_SECU,
        visitMinutes: 90,
        lat: 12.3769,
        lng: -1.5083,
        en: {
          name: "Thomas Sankara Memorial and Mausoleum",
          summary: "The memorial to President Thomas Sankara, on the site where he was assassinated in 1987.",
          description:
            "The memorial stands on the site of the Conseil de l'Entente, where President Thomas Sankara and twelve of his companions were assassinated on 15 October 1987. It includes a large statue of the “father of the revolution”, the room where the killings took place and, since May 2025, a mausoleum designed by the Pritzker Prize-winning Burkinabè architect Francis Kéré, where the thirteen victims are buried. A much-visited place of remembrance, especially around 15 October.",
          tips: "A place of remembrance: dress and behave respectfully; ask on site about photography. " + TIP_SECU_EN,
        },
      },
      {
        slug: "cathedrale-de-ouagadougou",
        category: "RELIGION",
        cover: "/images/voyage/lieu-cathedrale-de-ouagadougou",
        name: "Cathédrale de l'Immaculée-Conception",
        summary: "La grande cathédrale de brique ocre du centre-ville, construite dans les années 1930.",
        description:
          "Construite dans les années 1930 en briques de terre, la cathédrale de l'Immaculée-Conception est l'un des grands édifices religieux du pays et un repère du centre de Ouagadougou. Sa façade massive aux deux tours, ses arcs et ses oculi bleus se détachent sur un vaste parvis. Les grandes messes de Noël et de Pâques y rassemblent une foule considérable.",
        tips: "Tenue correcte ; pas de visite pendant les offices. " + TIP_SECU,
        visitMinutes: 30,
        lat: 12.362,
        lng: -1.527,
        en: {
          name: "Cathedral of the Immaculate Conception",
          summary: "The great ochre-brick cathedral in the city centre, built in the 1930s.",
          description:
            "Built in the 1930s of earth bricks, the Cathedral of the Immaculate Conception is one of the country's great religious buildings and a landmark of central Ouagadougou. Its massive twin-towered façade, arches and blue oculi stand out above a vast forecourt. The great Christmas and Easter masses draw huge crowds.",
          tips: "Dress respectfully; no visits during services. " + TIP_SECU_EN,
        },
      },
      {
        slug: "musee-de-la-musique-ouagadougou",
        category: "MUSEUM",
        cover: "/images/voyage/lieu-musee-de-la-musique-ouagadougou",
        name: "Musée de la Musique Georges-Ouédraogo",
        summary: "Balafons, tambours, harpes-luths et flûtes des traditions musicales du pays.",
        description:
          "Fondé en 1999 dans le centre de Ouagadougou, le musée de la Musique présente environ trois cents instruments traditionnels du Burkina Faso, classés par familles : tambours, balafons, flûtes, harpes-luths, sanzas… Photographies et explications replacent chaque instrument dans son usage social, de la communication villageoise aux cérémonies. La visite est guidée.",
        tips: TIP_SECU,
        visitMinutes: 60,
        lat: 12.3735,
        lng: -1.5168,
        en: {
          name: "Georges Ouédraogo Music Museum",
          summary: "Balafons, drums, harp-lutes and flutes from the country's musical traditions.",
          description:
            "Founded in 1999 in central Ouagadougou, the Music Museum displays some three hundred traditional instruments from Burkina Faso, grouped by family: drums, balafons, flutes, harp-lutes, thumb pianos and more. Photographs and explanations place each instrument in its social use, from village communication to ceremonies. Visits are guided.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "grand-marche-rood-woko",
        category: "MARKET",
        cover: "/images/voyage/lieu-grand-marche-rood-woko",
        name: "Grand marché Rood Woko",
        summary: "Le grand marché central de la capitale, reconstruit après l'incendie de 2003.",
        description:
          "Rood Woko (« grand marché » en mooré) est le cœur commercial de Ouagadougou depuis les années 1960. Détruit par un incendie en 2003, il a été reconstruit et rouvert en 2009 dans un bâtiment de brique aux larges toitures. Tissus et pagnes, épices, quincaillerie, produits du quotidien : une immersion dans l'animation de la capitale.",
        tips: "Grande affluence : surveillez vos affaires et négociez avec le sourire. " + TIP_SECU,
        visitMinutes: 90,
        lat: 12.3667,
        lng: -1.5233,
        en: {
          name: "Rood Woko central market",
          summary: "The capital's great central market, rebuilt after the 2003 fire.",
          description:
            "Rood Woko (“big market” in Mooré) has been the commercial heart of Ouagadougou since the 1960s. Destroyed by fire in 2003, it was rebuilt and reopened in 2009 in a brick building with wide roofs. Fabrics and wax prints, spices, hardware and everyday goods: an immersion in the bustle of the capital.",
          tips: "Very crowded: keep an eye on your belongings and bargain with a smile. " + TIP_SECU_EN,
        },
      },
      {
        slug: "village-artisanal-de-ouagadougou",
        category: "MARKET",
        cover: "/images/voyage/lieu-village-artisanal-de-ouagadougou",
        name: "Village artisanal de Ouagadougou",
        summary: "Des centaines d'artisans au travail : bronze, cuir, tissage, sculpture, bogolan.",
        description:
          "Ouvert en 2000, le Village artisanal de Ouagadougou regroupe autour d'une cour centrale des ateliers et boutiques où travaillent, selon les périodes, 400 à 500 artisans de plus de vingt-cinq métiers : bronziers, maroquiniers, tisserands, potiers, sculpteurs, teinturiers, fabricants d'instruments de musique. On peut voir les objets naître avant de les acheter.",
        tips: TIP_SECU,
        visitMinutes: 90,
        lat: 12.3484,
        lng: -1.4921,
        en: {
          name: "Ouagadougou Craft Village",
          summary: "Hundreds of artisans at work: bronze, leather, weaving, carving, bogolan.",
          description:
            "Opened in 2000, Ouagadougou's Craft Village brings together, around a central courtyard, workshops and shops where 400 to 500 artisans from more than twenty-five trades work, depending on the season: bronze casters, leatherworkers, weavers, potters, carvers, dyers and musical instrument makers. You can watch objects being made before buying them.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "parc-urbain-bangr-weoogo",
        category: "NATURE",
        cover: "/images/voyage/lieu-parc-urbain-bangr-weoogo",
        name: "Parc urbain Bangr-Weoogo",
        summary: "La « forêt du savoir », poumon vert de 240 hectares au cœur de la ville.",
        description:
          "Ancien bois sacré des chefs mossi, le parc Bangr-Weoogo (« forêt du savoir » en mooré) protège 240 hectares de forêt en pleine ville. Pistes de promenade et de sport, mares, oiseaux, quelques animaux et un petit musée de la faune en font le lieu de détente préféré des Ouagalais, surtout tôt le matin et en fin de journée.",
        tips: TIP_SECU,
        visitMinutes: 120,
        lat: 12.3952,
        lng: -1.4908,
        en: {
          name: "Bangr-Weoogo Urban Park",
          summary: "The “forest of knowledge”, a 240-hectare green lung in the heart of the city.",
          description:
            "Once a sacred grove of the Mossi chiefs, Bangr-Weoogo Park (“forest of knowledge” in Mooré) protects 240 hectares of forest within the city. Walking and jogging trails, ponds, birds, a few animals and a small wildlife museum make it Ouagadougou residents' favourite place to relax, especially early in the morning and late in the day.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "site-de-sculpture-de-laongo",
        category: "CULTURE",
        cover: "/images/voyage/lieu-site-de-sculpture-de-laongo",
        name: "Site de sculpture sur granit de Laongo",
        summary: "Un musée à ciel ouvert : des blocs de granit sculptés par des artistes du monde entier.",
        description:
          "À environ 35 km au nord-est de Ouagadougou, près de Ziniaré, un champ de blocs de granit est devenu depuis 1989 un musée de sculpture en plein air. Lors de symposiums successifs lancés par le sculpteur burkinabè Ky Siriki, des artistes venus de nombreux pays ont taillé la pierre sur place, parfois en l'associant au métal. Des dizaines d'œuvres se découvrent au fil d'une promenade parmi les rochers.",
        tips: "Prévoyez chapeau et eau, le site est peu ombragé. " + TIP_SECU,
        visitMinutes: 120,
        lat: 12.5367,
        lng: -1.2844,
        en: {
          name: "Laongo granite sculpture site",
          summary: "An open-air museum of granite boulders carved by artists from around the world.",
          description:
            "About 35 km north-east of Ouagadougou, near Ziniaré, a field of granite boulders has been an open-air sculpture museum since 1989. At successive symposia launched by the Burkinabè sculptor Ky Siriki, artists from many countries carved the stone on site, sometimes combining it with metal. Dozens of works can be discovered on a walk among the rocks.",
          tips: "Bring a hat and water; there is little shade. " + TIP_SECU_EN,
        },
      },
      {
        slug: "crocodiles-sacres-de-bazoule",
        category: "NATURE",
        cover: "/images/voyage/lieu-crocodiles-sacres-de-bazoule",
        name: "Mare aux crocodiles sacrés de Bazoulé",
        summary: "Des crocodiles vénérés et protégés par les villageois, à 30 km de la capitale.",
        description:
          "Selon la tradition orale, un crocodile aurait jadis guidé les habitants de Bazoulé, frappés par la sécheresse, jusqu'à une source : depuis, les crocodiles de la mare du village sont vénérés et protégés. Habitués à la présence humaine, ils se laissent approcher lorsque les gardiens les nourrissent, ce qui a fait de Bazoulé l'une des excursions classiques depuis Ouagadougou.",
        tips: "Ce sont des animaux sauvages : suivez strictement les consignes des gardiens et respectez le caractère sacré du lieu. " + TIP_SECU,
        visitMinutes: 90,
        lat: 12.3209,
        lng: -1.7098,
        en: {
          name: "Sacred crocodile pond of Bazoulé",
          summary: "Crocodiles revered and protected by the villagers, 30 km from the capital.",
          description:
            "According to oral tradition, a crocodile once led the drought-stricken people of Bazoulé to a spring: since then the crocodiles of the village pond have been revered and protected. Used to people, they can be approached when the keepers feed them, which has made Bazoulé one of the classic excursions from Ouagadougou.",
          tips: "These are wild animals: strictly follow the keepers' instructions and respect the sacred nature of the site. " + TIP_SECU_EN,
        },
      },
      {
        slug: "maquis-et-soirees-de-ouagadougou",
        category: "LEISURE",
        name: "Maquis et soirées de Ouagadougou",
        summary: "Le maquis, restaurant populaire en plein air, cœur de la vie sociale et nocturne.",
        description:
          "À Ouagadougou, la vie du soir se passe dans les maquis, ces restaurants-buvettes populaires en plein air que l'on trouve dans tous les quartiers. On y partage poulet grillé ou « poulet bicyclette », poisson braisé, brochettes et boissons fraîches, souvent au son de la musique, et l'on y refait le monde entre amis. Pendant le FESPACO, les Récréâtrales ou les fêtes de fin d'année, la ville vit encore plus tard.",
        tips: "Demandez conseil aux habitants pour choisir un maquis animé et sûr. " + TIP_SECU,
        visitMinutes: 120,
        en: {
          name: "Maquis and evenings in Ouagadougou",
          summary: "The maquis, a popular open-air eatery, is the heart of social and night life.",
          description:
            "In Ouagadougou, evenings are spent in maquis, the popular open-air eateries and bars found in every neighbourhood. People share grilled chicken or “poulet bicyclette” (free-range chicken), grilled fish, skewers and cold drinks, often to music, and put the world to rights with friends. During FESPACO, the Récréâtrales or the end-of-year holidays, the city stays up even later.",
          tips: "Ask locals for advice on choosing a lively, safe maquis. " + TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "bobo-dioulasso",
    name: "Bobo-Dioulasso",
    region: "Guiriko (ex-Hauts-Bassins)",
    summary: "Deuxième ville du pays, célèbre pour sa grande mosquée de terre et sa vie musicale.",
    description:
      "Capitale économique historique de l'ouest, Bobo-Dioulasso a gardé un cœur ancien, le quartier de Dioulassoba, et une grande mosquée de terre devenue l'emblème du pays. Ville de musique (balafon, djembé), de masques et de cabarets où l'on sert le dolo, elle accueille la Semaine nationale de la culture. Zone aujourd'hui formellement déconseillée aux voyageurs, comme tout le pays.",
    lat: 11.1771,
    lng: -4.2979,
    cover: "/images/voyage/bobo-dioulasso",
    en: {
      region: "Guiriko (formerly Hauts-Bassins)",
      summary: "The country's second city, famous for its great earthen mosque and its music.",
      description:
        "The historic economic capital of the west, Bobo-Dioulasso has kept an old heart, the Dioulassoba quarter, and a great earthen mosque that has become the country's emblem. A city of music (balafon, djembe), masks and cabarets serving dolo, it hosts the National Culture Week. Currently advised against for travellers, like the whole country.",
    },
    places: [
      {
        slug: "grande-mosquee-bobo-dioulasso",
        cover: "/images/voyage/lieu-grande-mosquee-bobo-dioulasso",
        category: "RELIGION",
        name: "Grande Mosquée de Bobo-Dioulasso",
        summary: "Chef-d'œuvre d'architecture de terre soudano-sahélienne, hérissé de pieux de bois.",
        description:
          "Construite à la fin du XIXe siècle dans le quartier de Dioulassoba, la Grande Mosquée est l'un des plus beaux exemples d'architecture soudano-sahélienne : murs de banco blanchis par le crépi, contreforts coniques et pièces de bois saillantes qui servent d'échafaudage lors des réfections. Elle figure sur la liste indicative du patrimoine mondial de l'UNESCO.",
        tips: "Tenue couvrante ; visite selon les règles de la communauté, jamais pendant les prières. " + TIP_SECU,
        visitMinutes: 45,
        lat: 11.1778,
        lng: -4.2959,
        en: {
          name: "Great Mosque of Bobo-Dioulasso",
          summary: "Masterpiece of Sudano-Sahelian earthen architecture, bristling with wooden stakes.",
          description:
            "Built in the late 19th century in the Dioulassoba quarter, the Great Mosque is one of the finest examples of Sudano-Sahelian architecture: banco (mud-brick) walls whitened with render, conical buttresses and protruding wooden beams that serve as scaffolding during re-plastering. It is on UNESCO's World Heritage Tentative List.",
          tips: "Wear covering clothes; visit according to the community's rules, never during prayers. " + TIP_SECU_EN,
        },
      },
      {
        slug: "quartier-de-dioulassoba",
        cover: "/images/voyage/lieu-quartier-de-dioulassoba",
        lat: 11.1769,
        lng: -4.2978,
        category: "HISTORY",
        name: "Vieux quartier de Dioulassoba",
        summary: "Le noyau ancien de la ville, ses ruelles de terre et ses quartiers de forgerons et de griots.",
        description:
          "Dioulassoba est le quartier historique de Bobo-Dioulasso, fondé par les Bobo. Ses ruelles de maisons en banco abritent des familles de forgerons, de griots et d'artisans, ainsi que des lieux sacrés ; le marigot du Houet, qui le borde, est connu pour ses silures considérés comme sacrés. La visite se fait traditionnellement avec un guide du quartier.",
        tips: "Respectez les interdits signalés par le guide (photos, lieux sacrés). " + TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "Old Dioulassoba quarter",
          summary: "The city's ancient core, with earthen lanes and quarters of blacksmiths and griots.",
          description:
            "Dioulassoba is Bobo-Dioulasso's historic quarter, founded by the Bobo people. Its lanes of banco houses are home to families of blacksmiths, griots and artisans, as well as sacred sites; the Houet stream that runs alongside is known for its catfish, regarded as sacred. Visits are traditionally made with a guide from the quarter.",
          tips: "Respect the taboos pointed out by your guide (photos, sacred places). " + TIP_SECU_EN,
        },
      },
      {
        slug: "semaine-nationale-de-la-culture",
        cover: "/images/voyage/lieu-semaine-nationale-de-la-culture",
        category: "FESTIVAL",
        name: "Semaine nationale de la culture (SNC)",
        summary: "Grande biennale culturelle : musique, danses, masques, théâtre et concours.",
        description:
          "Tous les deux ans, Bobo-Dioulasso accueille la Semaine nationale de la culture, qui rassemble des troupes et artistes de toutes les régions du pays : musiques et danses traditionnelles, sorties de masques, théâtre, arts plastiques, cuisine, concours et grands concerts. Une occasion unique de découvrir la diversité culturelle burkinabè.",
        tips: "Dates publiées par les organisateurs à chaque édition. " + TIP_SECU,
        visitMinutes: 480,
        en: {
          name: "National Culture Week (SNC)",
          summary: "Major cultural biennial: music, dance, masks, theatre and competitions.",
          description:
            "Every two years, Bobo-Dioulasso hosts the National Culture Week, bringing together troupes and artists from every region of the country: traditional music and dance, mask performances, theatre, visual arts, food, competitions and big concerts. A unique chance to discover Burkinabè cultural diversity.",
          tips: "Dates are published by the organisers for each edition. " + TIP_SECU_EN,
        },
      },
      {
        slug: "dolo-et-cuisine-bobo-dioulasso",
        cover: "/images/voyage/lieu-dolo-et-cuisine-bobo-dioulasso",
        category: "GASTRONOMY",
        name: "Dolo et cuisine burkinabè",
        summary: "Bière de mil des cabarets, tô, riz gras et poulet grillé.",
        description:
          "Le dolo, bière de mil brassée par les femmes (les dolotières) et servie dans des calebasses, se boit dans les cabarets de quartier, véritables lieux de sociabilité. Côté assiette, on découvre le tô (pâte de mil ou de maïs servie avec une sauce), le riz gras, les brochettes et le poulet grillé, sans oublier le jus de bissap ou de gingembre.",
        tips: TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "Dolo and Burkinabè food",
          summary: "Millet beer from the cabarets, tô, riz gras and grilled chicken.",
          description:
            "Dolo, a millet beer brewed by women (the dolotières) and served in calabashes, is drunk in neighbourhood cabarets, true social hubs. On the plate: tô (a millet or maize paste served with sauce), riz gras (rice cooked in a rich sauce), skewers and grilled chicken, along with bissap (hibiscus) or ginger juice.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "gare-de-bobo-dioulasso",
        category: "HISTORY",
        cover: "/images/voyage/lieu-gare-de-bobo-dioulasso",
        name: "Gare de Bobo-Dioulasso",
        summary: "La gare des années 1930 au style néo-soudanais, sur la ligne Abidjan–Ouagadougou.",
        description:
          "Ouverte au trafic en 1933-1934, quand Bobo-Dioulasso devint le terminus provisoire du chemin de fer venu d'Abidjan, la gare est l'un des bâtiments coloniaux les plus photographiés du pays. Sa façade crénelée, hérissée de pièces de bois saillantes, reprend les codes de l'architecture soudanaise des mosquées de terre. Elle se trouve tout près du centre-ville.",
        tips: TIP_SECU,
        visitMinutes: 20,
        lat: 11.1785,
        lng: -4.3069,
        en: {
          name: "Bobo-Dioulasso railway station",
          summary: "A 1930s neo-Sudanese-style station on the Abidjan–Ouagadougou line.",
          description:
            "Opened to traffic in 1933–1934, when Bobo-Dioulasso became the temporary terminus of the railway from Abidjan, the station is one of the country's most photographed colonial buildings. Its crenellated façade, bristling with protruding wooden beams, borrows the codes of the Sudanese architecture of earthen mosques. It stands close to the city centre.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "village-de-koumi",
        category: "CULTURE",
        name: "Village de Koumi",
        summary: "Village bobo aux maisons de terre adossées à un escarpement rocheux.",
        description:
          "À environ 16 km de Bobo-Dioulasso, Koumi est un village bobo dont les habitants se rattachent au noyau originel de la ville, Sya. Ses maisons de terre, construites contre un escarpement rocheux, reflètent l'organisation sociale et les croyances de la communauté, qui a su préserver son architecture face à l'urbanisation. Le Burkina Faso l'a inscrit en 2026 sur sa liste indicative du patrimoine mondial.",
        tips: "Village habité : visite avec un guide local et l'accord des habitants. " + TIP_SECU,
        visitMinutes: 90,
        lat: 11.133,
        lng: -4.4328,
        en: {
          name: "Koumi village",
          summary: "A Bobo village of earthen houses set against a rocky escarpment.",
          description:
            "About 16 km from Bobo-Dioulasso, Koumi is a Bobo village whose people trace their roots to the city's original core, Sya. Its earthen houses, built against a rocky escarpment, reflect the community's social organisation and beliefs, and it has preserved its architecture in the face of urbanisation. In 2026 Burkina Faso added it to its World Heritage Tentative List.",
          tips: "A lived-in village: visit with a local guide and the residents' consent. " + TIP_SECU_EN,
        },
      },
      {
        slug: "village-de-koro",
        category: "CULTURE",
        name: "Village perché de Koro",
        summary: "Un village de terre perché sur une colline, à une douzaine de kilomètres de Bobo.",
        description:
          "À 12 km à l'est de Bobo-Dioulasso, le village de Koro occupe le sommet d'une colline rocheuse, à l'extrémité nord-est de la falaise de Banfora. Selon la tradition, ses habitants s'y sont installés à l'époque des guerres de Samory pour mieux voir venir l'ennemi. Ses maisons de terre accrochées aux rochers offrent une vue étendue sur la plaine.",
        tips: "Village habité : visite avec un guide local, demandez avant de photographier. " + TIP_SECU,
        visitMinutes: 90,
        lat: 11.1444,
        lng: -4.1987,
        en: {
          name: "Hilltop village of Koro",
          summary: "An earthen village perched on a hill, about a dozen kilometres from Bobo.",
          description:
            "12 km east of Bobo-Dioulasso, the village of Koro sits on top of a rocky hill at the north-eastern end of the Banfora escarpment. According to tradition, its inhabitants settled there during Samory's wars so as to see the enemy coming. Its earthen houses clinging to the rocks offer a wide view over the plain.",
          tips: "A lived-in village: visit with a local guide and ask before taking photos. " + TIP_SECU_EN,
        },
      },
      {
        slug: "mare-aux-hippopotames-bala",
        category: "NATURE",
        cover: "/images/voyage/lieu-mare-aux-hippopotames-bala",
        name: "Mare aux hippopotames de Bala",
        summary: "Réserve de biosphère de l'UNESCO où vit une soixantaine d'hippopotames.",
        description:
          "À une soixantaine de kilomètres au nord-est de Bobo-Dioulasso, cette forêt classée depuis 1937 entoure une mare alimentée par le Mouhoun (Volta Noire), où vit une soixantaine d'hippopotames. Réserve de biosphère de l'UNESCO depuis 1986 et site Ramsar, elle est gérée par une association villageoise ; elle figure aussi depuis 2026 sur la liste indicative du patrimoine mondial. Les sorties se faisaient traditionnellement en pirogue avec les pêcheurs.",
        tips: "Gardez une grande distance avec les hippopotames. " + TIP_SECU,
        bestPeriod: "Saison sèche (décembre à avril)",
        visitMinutes: 240,
        lat: 11.6167,
        lng: -4.1333,
        en: {
          name: "Bala Hippo Pond (Mare aux Hippopotames)",
          summary: "A UNESCO biosphere reserve that is home to some sixty hippos.",
          description:
            "About sixty kilometres north-east of Bobo-Dioulasso, this forest, protected since 1937, surrounds a pond fed by the Mouhoun (Black Volta) where some sixty hippos live. A UNESCO biosphere reserve since 1986 and a Ramsar site, it is managed by a village association, and since 2026 it has also been on the World Heritage Tentative List. Outings were traditionally made by pirogue with local fishermen.",
          tips: "Keep a long distance from the hippos. " + TIP_SECU_EN,
          bestPeriod: "Dry season (December to April)",
        },
      },
    ],
  },
  {
    slug: "banfora",
    name: "Banfora et la région des Cascades",
    region: "Tannounyan (ex-Cascades)",
    summary: "Cascades, lac aux hippopotames et formations de grès spectaculaires.",
    description:
      "Au sud-ouest du pays, la région de Banfora est la plus verte du Burkina Faso : champs de canne à sucre, vergers de manguiers, cascades de Karfiguéla, dômes de Fabédougou, lac de Tengréla et, plus à l'ouest, les étonnants pics de Sindou. Un patrimoine naturel remarquable, dans une zone aujourd'hui formellement déconseillée aux voyageurs comme le reste du pays.",
    lat: 10.6333,
    lng: -4.7667,
    cover: "/images/voyage/banfora",
    en: {
      name: "Banfora and the Cascades region",
      region: "Tannounyan (formerly Cascades)",
      summary: "Waterfalls, a hippo lake and spectacular sandstone formations.",
      description:
        "In the south-west of the country, the Banfora area is Burkina Faso's greenest region: sugar-cane fields, mango orchards, the Karfiguéla falls, the Fabédougou domes, Lake Tengréla and, further west, the astonishing Sindou peaks. Remarkable natural heritage, in an area currently advised against for travellers like the rest of the country.",
    },
    places: [
      {
        slug: "cascades-de-karfiguela",
        cover: "/images/voyage/lieu-cascades-de-karfiguela",
        category: "NATURE",
        name: "Cascades de Karfiguéla",
        summary: "Succession de chutes d'eau sur des dalles de grès, au milieu d'une végétation luxuriante.",
        description:
          "À quelques kilomètres au nord-ouest de Banfora, la rivière Comoé dévale une série de marches de grès en cascades et bassins naturels, entourés de grands arbres. Le site, l'un des plus connus du pays, est plus spectaculaire pendant et juste après la saison des pluies.",
        tips: TIP_SECU,
        bestPeriod: "Fin de la saison des pluies (septembre à novembre)",
        visitMinutes: 150,
        lat: 10.7242,
        lng: -4.8233,
        en: {
          name: "Karfiguéla Falls",
          summary: "A succession of waterfalls over sandstone slabs, amid lush vegetation.",
          description:
            "A few kilometres north-west of Banfora, the Comoé river tumbles down a series of sandstone steps in waterfalls and natural pools, surrounded by tall trees. The site, one of the best known in the country, is most spectacular during and just after the rainy season.",
          tips: TIP_SECU_EN,
          bestPeriod: "End of the rainy season (September to November)",
        },
      },
      {
        slug: "domes-de-fabedougou",
        cover: "/images/voyage/lieu-domes-de-fabedougou",
        lat: 10.727,
        lng: -4.8084,
        category: "NATURE",
        name: "Dômes de Fabédougou",
        summary: "Curieuses formations de grès arrondies, sculptées par l'érosion.",
        description:
          "Non loin des cascades de Karfiguéla, les dômes de Fabédougou forment un ensemble de rochers de grès aux formes arrondies, façonnés par l'érosion. Un paysage étonnant, propice à la marche et à la photographie, surtout en fin de journée.",
        tips: TIP_SECU,
        visitMinutes: 90,
        en: {
          name: "Fabédougou Domes",
          summary: "Curious rounded sandstone formations sculpted by erosion.",
          description:
            "Not far from the Karfiguéla falls, the Fabédougou domes are a group of rounded sandstone rocks shaped by erosion. An astonishing landscape, ideal for walking and photography, especially late in the day.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "lac-de-tengrela",
        cover: "/images/voyage/lieu-lac-de-tengrela",
        category: "NATURE",
        name: "Lac de Tengréla",
        summary: "Lac paisible où vivent des hippopotames, à découvrir en pirogue.",
        description:
          "À l'ouest de Banfora, le lac de Tengréla abrite une population d'hippopotames que les pêcheurs du village voisin font découvrir en pirogue. Nénuphars, oiseaux et lumière du soir composent un tableau très paisible.",
        tips: "Gardez toujours une distance respectueuse avec les hippopotames. " + TIP_SECU,
        visitMinutes: 120,
        lat: 10.6463,
        lng: -4.841,
        en: {
          name: "Lake Tengréla",
          summary: "Peaceful lake home to hippos, explored by pirogue.",
          description:
            "West of Banfora, Lake Tengréla is home to a population of hippos, which fishermen from the nearby village show visitors by pirogue. Water lilies, birds and the evening light make for a very peaceful scene.",
          tips: "Always keep a respectful distance from the hippos. " + TIP_SECU_EN,
        },
      },
      {
        slug: "pics-de-sindou",
        cover: "/images/voyage/lieu-pics-de-sindou",
        category: "NATURE",
        name: "Pics de Sindou",
        summary: "Chaîne d'aiguilles de grès ciselées par l'érosion, haut lieu du pays sénoufo.",
        description:
          "À l'ouest de Banfora, près de Sindou, une longue crête de grès a été découpée par l'érosion en aiguilles, cheminées et arches. Ce paysage spectaculaire est aussi un lieu chargé de sens pour les populations sénoufo de la région, qui y possèdent des sites sacrés. La découverte se fait à pied avec un guide local.",
        tips: "Certains sites sont sacrés : suivez les consignes du guide. " + TIP_SECU,
        visitMinutes: 180,
        lat: 10.6542,
        lng: -5.1542,
        en: {
          name: "Sindou Peaks",
          summary: "A range of sandstone needles carved by erosion, a landmark of Senufo country.",
          description:
            "West of Banfora, near Sindou, a long sandstone ridge has been cut by erosion into needles, chimneys and arches. This spectacular landscape is also a meaningful place for the region's Senufo people, who have sacred sites there. It is explored on foot with a local guide.",
          tips: "Some sites are sacred: follow your guide's instructions. " + TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "loropeni",
    name: "Loropéni et le pays lobi",
    region: "Djôrô (ex-Sud-Ouest)",
    summary: "Les ruines de pierre millénaires de Loropéni, premier site UNESCO du pays.",
    description:
      "Au sud-ouest, entre Gaoua et la frontière ivoirienne, le pays lobi conserve les ruines de Loropéni, premier site du Burkina Faso inscrit au patrimoine mondial de l'UNESCO (2009), ainsi qu'une architecture et des traditions singulières. La région est aujourd'hui, comme tout le pays, formellement déconseillée aux voyageurs.",
    lat: 10.3,
    lng: -3.5333,
    cover: "/images/voyage/loropeni",
    en: {
      name: "Loropéni and Lobi country",
      region: "Djôrô (formerly Sud-Ouest)",
      summary: "The ancient stone ruins of Loropéni, the country's first UNESCO site.",
      description:
        "In the south-west, between Gaoua and the Ivorian border, Lobi country preserves the Ruins of Loropéni, Burkina Faso's first UNESCO World Heritage Site (2009), as well as distinctive architecture and traditions. Like the whole country, the region is currently advised against for travellers.",
    },
    places: [
      {
        slug: "ruines-de-loropeni",
        cover: "/images/voyage/lieu-ruines-de-loropeni",
        category: "HISTORY",
        name: "Ruines de Loropéni",
        summary: "Hautes murailles de latérite d'une forteresse vieille d'au moins mille ans.",
        description:
          "Les ruines de Loropéni sont les vestiges les mieux conservés d'un ensemble de fortifications en pierre de la région : une enceinte de murs de latérite pouvant atteindre plusieurs mètres de haut. Vieilles d'au moins mille ans selon l'UNESCO, elles sont associées au commerce de l'or transsaharien ; leurs bâtisseurs et leur fonction exacte font encore l'objet de recherches. Inscrites au patrimoine mondial en 2009.",
        tips: TIP_SECU,
        visitMinutes: 90,
        lat: 10.3103,
        lng: -3.5628,
        en: {
          name: "Ruins of Loropéni",
          summary: "High laterite walls of a fortress at least a thousand years old.",
          description:
            "The Ruins of Loropéni are the best preserved of a group of stone fortifications in the region: an enclosure of laterite walls up to several metres high. At least a thousand years old according to UNESCO, they are linked to the trans-Saharan gold trade; their builders and exact function are still being researched. Listed as a World Heritage Site in 2009.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "musee-de-gaoua",
        cover: "/images/voyage/lieu-musee-de-gaoua",
        lat: 10.3329,
        lng: -3.1785,
        category: "MUSEUM",
        name: "Musée des civilisations du Sud-Ouest (Gaoua)",
        summary: "Les cultures lobi, gan, dagara et voisines : statuaire, objets rituels, habitat.",
        description:
          "À Gaoua, chef-lieu de la région, le musée présente les peuples du sud-ouest du Burkina Faso, notamment les Lobi : statuettes rituelles, objets du quotidien, parures et maquettes d'habitat. Une clé de lecture indispensable pour comprendre la région et ses ruines.",
        tips: TIP_SECU,
        visitMinutes: 75,
        en: {
          name: "Museum of South-West Civilisations (Gaoua)",
          summary: "Lobi, Gan, Dagara and neighbouring cultures: statues, ritual objects, housing.",
          description:
            "In Gaoua, the regional capital, the museum presents the peoples of south-western Burkina Faso, especially the Lobi: ritual statuettes, everyday objects, ornaments and models of traditional homes. An essential key to understanding the region and its ruins.",
          tips: TIP_SECU_EN,
        },
      },
      {
        slug: "habitat-lobi",
        cover: "/images/voyage/lieu-habitat-lobi",
        category: "CULTURE",
        name: "Habitat traditionnel lobi",
        summary: "Concessions fortifiées en terre, aux murs épais et aux rares ouvertures.",
        description:
          "Les Lobi vivent traditionnellement dans des concessions de terre dispersées dans la campagne, aux murs épais et aux ouvertures rares, véritables petites forteresses familiales. Autels et statuettes y témoignent d'une vie religieuse riche. Ces maisons sont habitées : on ne les visite qu'avec l'accord des familles, par l'intermédiaire d'un guide local.",
        tips: TIP_SECU,
        visitMinutes: 120,
        en: {
          name: "Traditional Lobi housing",
          summary: "Fortified earthen compounds with thick walls and few openings.",
          description:
            "The Lobi traditionally live in earthen compounds scattered across the countryside, with thick walls and few openings: true small family fortresses. Altars and statuettes bear witness to a rich religious life. These homes are lived in: they can only be visited with the families' consent, through a local guide.",
          tips: TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "tiebele",
    name: "Tiébélé et le pays kassena",
    region: "Nazinon (ex-Centre-Sud)",
    summary: "La cour royale aux cases peintes des Kassena, près de la frontière ghanéenne.",
    description:
      "Dans le sud du pays, près du Ghana, Tiébélé est réputée pour sa cour royale, dont les cases de terre sont couvertes de peintures géométriques réalisées par les femmes kassena. Non loin, le ranch de gibier de Nazinga protège éléphants et antilopes. Une région au patrimoine exceptionnel, aujourd'hui formellement déconseillée aux voyageurs comme le reste du pays.",
    lat: 11.0956,
    lng: -0.9653,
    cover: "/images/voyage/tiebele",
    en: {
      name: "Tiébélé and Kassena country",
      region: "Nazinon (formerly Centre-Sud)",
      summary: "The royal court of painted Kassena houses, near the Ghanaian border.",
      description:
        "In the south of the country, near Ghana, Tiébélé is famous for its royal court, whose earthen houses are covered in geometric paintings made by Kassena women. Nearby, the Nazinga game ranch protects elephants and antelopes. A region of exceptional heritage, currently advised against for travellers like the rest of the country.",
    },
    places: [
      {
        slug: "cour-royale-de-tiebele",
        cover: "/images/voyage/lieu-cour-royale-de-tiebele",
        lat: 11.0953,
        lng: -0.9636,
        category: "CULTURE",
        name: "Cour royale de Tiébélé",
        summary: "Cases de terre ornées de motifs géométriques peints par les femmes.",
        description:
          "La cour royale de Tiébélé regroupe des habitations kassena en terre, de formes variées selon leurs occupants, dont les murs sont décorés de motifs géométriques et symboliques en noir, blanc et ocre rouge. Ces peintures, réalisées et régulièrement renouvelées par les femmes avec des pigments naturels, font de l'ensemble l'un des joyaux architecturaux d'Afrique de l'Ouest, inscrit au patrimoine mondial de l'UNESCO en 2024.",
        tips: "Lieu habité : visite guidée selon les règles de la cour, demandez avant de photographier les personnes. " + TIP_SECU,
        visitMinutes: 120,
        en: {
          name: "Royal Court of Tiébélé",
          summary: "Earthen houses adorned with geometric patterns painted by the women.",
          description:
            "The royal court of Tiébélé is a group of Kassena earthen dwellings, shaped differently according to who lives in them, whose walls are decorated with geometric and symbolic patterns in black, white and red ochre. These paintings, made and regularly renewed by the women using natural pigments, make the ensemble one of West Africa's architectural gems, inscribed on UNESCO's World Heritage List in 2024.",
          tips: "A lived-in place: guided visit according to the court's rules; ask before photographing people. " + TIP_SECU_EN,
        },
      },
      {
        slug: "ranch-de-nazinga",
        cover: "/images/voyage/lieu-ranch-de-nazinga",
        category: "NATURE",
        name: "Ranch de gibier de Nazinga",
        summary: "Réserve de savane boisée connue pour ses éléphants et ses antilopes.",
        description:
          "Entre Pô et la frontière ghanéenne, le ranch de gibier de Nazinga protège une vaste zone de savane boisée et de mares. On y observait traditionnellement éléphants, antilopes, singes, crocodiles et de nombreux oiseaux, surtout en saison sèche lorsque les animaux se rassemblent autour des points d'eau.",
        tips: TIP_SECU,
        bestPeriod: "Saison sèche (décembre à avril)",
        visitMinutes: 480,
        lat: 11.185,
        lng: -1.4844,
        en: {
          name: "Nazinga Game Ranch",
          summary: "Wooded savannah reserve known for its elephants and antelopes.",
          description:
            "Between Pô and the Ghanaian border, Nazinga Game Ranch protects a vast area of wooded savannah and waterholes. Visitors traditionally saw elephants, antelopes, monkeys, crocodiles and many birds, especially in the dry season when animals gather around the water points.",
          tips: TIP_SECU_EN,
          bestPeriod: "Dry season (December to April)",
        },
      },
      {
        slug: "parc-national-kabore-tambi",
        category: "NATURE",
        cover: "/images/voyage/lieu-parc-national-kabore-tambi",
        name: "Parc national Kaboré-Tambi",
        summary: "Savanes et forêts-galeries le long de la Volta Rouge, entre Pô et Ouagadougou.",
        description:
          "Créé en 1976 sous le nom de parc national du Pô, le parc Kaboré-Tambi porte le nom d'un garde tué par des braconniers en 1991. Ses 2 427 km² de savanes et de forêts-galeries, traversés par la Volta Rouge, abritent éléphants, antilopes, singes, phacochères et de nombreux oiseaux. Il s'étend au nord de Pô, de part et d'autre de la route Ouagadougou–Pô.",
        tips: TIP_SECU,
        bestPeriod: "Saison sèche (décembre à avril)",
        visitMinutes: 480,
        lat: 11.5335,
        lng: -1.3226,
        en: {
          name: "Kaboré Tambi National Park",
          summary: "Savannah and gallery forest along the Red Volta, between Pô and Ouagadougou.",
          description:
            "Created in 1976 as Pô National Park, Kaboré Tambi National Park is named after a ranger killed by poachers in 1991. Its 2,427 km² of savannah and gallery forest, crossed by the Red Volta, are home to elephants, antelopes, monkeys, warthogs and many birds. It lies north of Pô, on either side of the Ouagadougou–Pô road.",
          tips: TIP_SECU_EN,
          bestPeriod: "Dry season (December to April)",
        },
      },
    ],
  },
  {
    slug: "gorom-gorom",
    cover: "/images/voyage/gorom-gorom",
    name: "Gorom-Gorom et le Sahel",
    region: "Liptako (ex-Sahel)",
    summary: "Marché sahélien et dunes de l'Oudalan : un patrimoine aujourd'hui inaccessible.",
    description:
      "Aux confins du Mali et du Niger, le Sahel burkinabè était autrefois réputé pour le grand marché de Gorom-Gorom, carrefour des Touaregs, Peuls, Bellas et Songhaï, et pour les dunes et la mare d'Oursi. Cette région est l'une des plus touchées par les violences armées et fait l'objet des recommandations les plus strictes : elle n'est présentée ici qu'au titre du patrimoine.",
    lat: 14.4446,
    lng: -0.2345,
    en: {
      name: "Gorom-Gorom and the Sahel",
      region: "Liptako (formerly Sahel)",
      summary: "A Sahelian market and the dunes of Oudalan: heritage that is currently out of reach.",
      description:
        "On the borders of Mali and Niger, the Burkinabè Sahel was once famous for the great market of Gorom-Gorom, a meeting point for Tuareg, Fulani, Bella and Songhai peoples, and for the dunes and pool of Oursi. This region is one of the worst affected by armed violence and is subject to the strictest advice: it is presented here as heritage only.",
    },
    places: [
      {
        slug: "marche-de-gorom-gorom",
        cover: "/images/voyage/lieu-marche-de-gorom-gorom",
        lat: 14.4446,
        lng: -0.2345,
        category: "MARKET",
        name: "Marché de Gorom-Gorom",
        summary: "Grand marché hebdomadaire sahélien, rendez-vous des éleveurs et des caravanes.",
        description:
          "Le marché hebdomadaire de Gorom-Gorom était l'un des plus célèbres du Sahel : bétail, chameaux, cuir, bijoux, nattes et produits du désert s'y échangeaient dans un brassage de peuples et de costumes. Il reste un symbole des cultures nomades et pastorales du nord du pays.",
        tips: "Zone parmi les plus dangereuses du pays, formellement déconseillée : présentée uniquement au titre du patrimoine. " + TIP_SECU,
        visitMinutes: 180,
        en: {
          name: "Gorom-Gorom market",
          summary: "Great weekly Sahelian market, a meeting place for herders and caravans.",
          description:
            "The weekly market of Gorom-Gorom was one of the most famous in the Sahel: livestock, camels, leather, jewellery, mats and desert produce changed hands amid a mix of peoples and costumes. It remains a symbol of the nomadic and pastoral cultures of the country's north.",
          tips: "One of the most dangerous areas of the country, formally advised against: presented as heritage only. " + TIP_SECU_EN,
        },
      },
      {
        slug: "mare-et-dunes-d-oursi",
        cover: "/images/voyage/lieu-mare-et-dunes-d-oursi",
        lat: 14.6333,
        lng: -0.5,
        category: "NATURE",
        name: "Mare et dunes d'Oursi",
        summary: "Zone humide sahélienne protégée et cordons de dunes de sable.",
        description:
          "Au nord-ouest de Gorom-Gorom, la mare d'Oursi est une zone humide d'importance internationale (site Ramsar) qui attire de nombreux oiseaux d'eau et les troupeaux des éleveurs. Elle est bordée de dunes de sable orangé, l'un des paysages les plus emblématiques du Sahel burkinabè.",
        tips: "Zone parmi les plus dangereuses du pays, formellement déconseillée : présentée uniquement au titre du patrimoine. " + TIP_SECU,
        visitMinutes: 240,
        en: {
          name: "Oursi pool and dunes",
          summary: "A protected Sahelian wetland and ridges of sand dunes.",
          description:
            "North-west of Gorom-Gorom, the Oursi pool is a wetland of international importance (Ramsar site) that draws many waterbirds and herders' livestock. It is bordered by orange sand dunes, one of the most iconic landscapes of the Burkinabè Sahel.",
          tips: "One of the most dangerous areas of the country, formally advised against: presented as heritage only. " + TIP_SECU_EN,
        },
      },
      {
        slug: "mosquees-de-bani",
        category: "RELIGION",
        cover: "/images/voyage/lieu-mosquees-de-bani",
        name: "Mosquées de Bani",
        summary: "La « ville aux sept mosquées » de terre, chef-d'œuvre de l'architecture sahélienne.",
        description:
          "Au sud de Dori, la petite ville de Bani, surnommée « la ville aux sept mosquées », est réputée pour ses mosquées de terre aux hautes tours effilées, construites sur la colline et en contrebas, dont la grande mosquée peule. Ces édifices comptent parmi les plus beaux exemples d'architecture de terre du Sahel burkinabè.",
        tips: "Zone parmi les plus dangereuses du pays, formellement déconseillée : présentée uniquement au titre du patrimoine. " + TIP_SECU,
        visitMinutes: 120,
        lat: 13.7216,
        lng: -0.1695,
        en: {
          name: "Mosques of Bani",
          summary: "The earthen “town of seven mosques”, a masterpiece of Sahelian architecture.",
          description:
            "South of Dori, the small town of Bani, nicknamed “the town of seven mosques”, is famous for its earthen mosques with tall tapering towers, built on the hill and below it, including the great Fulani mosque. These buildings are among the finest examples of earthen architecture in the Burkinabè Sahel.",
          tips: "One of the most dangerous areas of the country, formally advised against: presented as heritage only. " + TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "koudougou",
    name: "Koudougou et le Centre-Ouest",
    region: "Nando (ex-Centre-Ouest)",
    summary: "Ville des Nuits atypiques, près des crocodiles sacrés de Sabou.",
    description:
      "À une centaine de kilomètres à l'ouest de Ouagadougou, Koudougou est connue pour son festival des Nuits atypiques, l'un des plus anciens festivals de musique du pays. À une vingtaine de kilomètres au sud, sur la route de Bobo-Dioulasso, la mare aux crocodiles sacrés de Sabou était l'une des haltes classiques du pays. Région aujourd'hui formellement déconseillée aux voyageurs, comme tout le Burkina Faso.",
    lat: 12.2512,
    lng: -2.3745,
    cover: "/images/voyage/koudougou",
    en: {
      name: "Koudougou and the Centre-West",
      region: "Nando (formerly Centre-Ouest)",
      summary: "Home of the Nuits Atypiques festival, near the sacred crocodiles of Sabou.",
      description:
        "About a hundred kilometres west of Ouagadougou, Koudougou is known for its Nuits Atypiques festival, one of the country's oldest music festivals. Some twenty kilometres south, on the road to Bobo-Dioulasso, the sacred crocodile pond of Sabou was one of the country's classic stops. The region is currently advised against for travellers, like the whole of Burkina Faso.",
    },
    places: [
      {
        slug: "crocodiles-sacres-de-sabou",
        category: "NATURE",
        cover: "/images/voyage/lieu-crocodiles-sacres-de-sabou",
        name: "Mare aux crocodiles sacrés de Sabou",
        summary: "La plus célèbre mare aux crocodiles sacrés du pays, sur la route de Bobo-Dioulasso.",
        description:
          "À une vingtaine de kilomètres au sud de Koudougou, sur la route nationale 1, Sabou est réputée pour sa mare aux crocodiles sacrés. La famille Kaboré, dépositaire du lieu, considère ces animaux comme des ancêtres ; ils sont protégés et nourris sous le contrôle des gardiens, qui permettent aux visiteurs de les approcher.",
        tips: "Animaux sauvages : suivez strictement les consignes des gardiens. " + TIP_SECU,
        visitMinutes: 60,
        lat: 12.0667,
        lng: -2.2333,
        en: {
          name: "Sacred crocodile pond of Sabou",
          summary: "The country's most famous sacred crocodile pond, on the road to Bobo-Dioulasso.",
          description:
            "Some twenty kilometres south of Koudougou, on National Road 1, Sabou is famous for its sacred crocodile pond. The Kaboré family, custodians of the site, regard the animals as ancestors; they are protected and fed under the supervision of keepers, who let visitors approach them.",
          tips: "Wild animals: strictly follow the keepers' instructions. " + TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "dedougou",
    name: "Dédougou et la Boucle du Mouhoun",
    region: "Bankui (ex-Boucle du Mouhoun)",
    summary: "Le pays des masques bwaba, du FESTIMA et de la métallurgie ancienne du fer.",
    description:
      "Dans l'ouest du pays, dans la grande boucle du fleuve Mouhoun (Volta Noire), Dédougou accueille tous les deux ans le Festival international des masques et des arts (FESTIMA). Non loin, à Douroula, se trouve l'un des cinq sites de métallurgie ancienne du fer inscrits au patrimoine mondial de l'UNESCO en 2019. Région aujourd'hui formellement déconseillée aux voyageurs, comme tout le pays.",
    lat: 12.4631,
    lng: -3.4601,
    cover: "/images/voyage/dedougou",
    en: {
      name: "Dédougou and the Mouhoun Loop",
      region: "Bankui (formerly Boucle du Mouhoun)",
      summary: "Land of Bwaba masks, FESTIMA and ancient iron metallurgy.",
      description:
        "In the west of the country, within the great loop of the Mouhoun (Black Volta) river, Dédougou hosts the International Festival of Masks and Arts (FESTIMA) every two years. Nearby, at Douroula, is one of the five Ancient Ferrous Metallurgy Sites inscribed on UNESCO's World Heritage List in 2019. The region is currently advised against for travellers, like the whole country.",
    },
    places: [
      {
        slug: "festima-dedougou",
        category: "FESTIVAL",
        name: "FESTIMA, Festival international des masques et des arts",
        summary: "Le grand rassemblement des sociétés de masques d'Afrique de l'Ouest, à Dédougou.",
        description:
          "Créé en 1996, le FESTIMA réunit à Dédougou, en principe tous les deux ans, des sociétés de masques venues de toute la région et de pays voisins : masques de feuilles, de fibres ou de bois des Bwaba, Bobo, Marka, Mossi et d'autres peuples, qui dansent au son des tambours et des flûtes. Le festival s'accompagne d'un colloque et d'expositions sur le patrimoine des masques.",
        tips: "Les masques sont sacrés : suivez les consignes des organisateurs et des initiés, notamment pour les photos. " + TIP_SECU,
        bestPeriod: "Années paires, de février à mai selon l'édition",
        visitMinutes: 480,
        lat: 12.4631,
        lng: -3.4601,
        en: {
          name: "FESTIMA, International Festival of Masks and Arts",
          summary: "The great gathering of West African mask societies, in Dédougou.",
          description:
            "Founded in 1996, FESTIMA brings together in Dédougou, normally every two years, mask societies from across the region and neighbouring countries: leaf, fibre and wooden masks of the Bwaba, Bobo, Marka, Mossi and other peoples, dancing to drums and flutes. The festival also includes a symposium and exhibitions on mask heritage.",
          tips: "Masks are sacred: follow the instructions of the organisers and initiates, especially about photos. " + TIP_SECU_EN,
          bestPeriod: "Even-numbered years, from February to May depending on the edition",
        },
      },
      {
        slug: "site-metallurgique-de-douroula",
        category: "HISTORY",
        name: "Site de métallurgie ancienne du fer de Douroula",
        summary: "Les plus anciens vestiges de production de fer du pays, inscrits à l'UNESCO.",
        description:
          "Près du village de Douroula, non loin du Mouhoun, des vestiges de fourneaux et de scories témoignent d'une production de fer très ancienne, que l'UNESCO fait remonter au VIIIe siècle avant notre ère. Douroula est l'une des cinq composantes des « Sites de métallurgie ancienne du fer du Burkina Faso », inscrits au patrimoine mondial en 2019 avec Tiwêga, Yamané, Kindibo et Békuy, où subsistent aussi des fourneaux debout.",
        tips: TIP_SECU,
        visitMinutes: 90,
        lat: 12.5858,
        lng: -3.3004,
        en: {
          name: "Douroula ancient iron metallurgy site",
          summary: "The country's oldest remains of iron production, a UNESCO World Heritage component.",
          description:
            "Near the village of Douroula, not far from the Mouhoun, remains of furnaces and slag bear witness to very ancient iron production, which UNESCO dates back to the 8th century BCE. Douroula is one of the five components of the “Ancient Ferrous Metallurgy Sites of Burkina Faso”, inscribed on the World Heritage List in 2019 together with Tiwêga, Yamané, Kindibo and Békuy, where standing furnaces also survive.",
          tips: TIP_SECU_EN,
        },
      },
    ],
  },
  {
    slug: "parcs-w-arly",
    name: "Parcs du W et d'Arly",
    region: "Est (province de la Tapoa)",
    summary: "Le volet burkinabè du complexe W-Arly-Pendjari, grand site naturel de l'UNESCO.",
    description:
      "À l'extrême est du pays, aux frontières du Niger et du Bénin, les parcs du W et d'Arly forment avec la Pendjari béninoise le complexe W-Arly-Pendjari, inscrit au patrimoine mondial de l'UNESCO (extension de 2017) : le plus vaste ensemble de savanes protégées d'Afrique de l'Ouest, refuge d'éléphants, de lions, de buffles et d'antilopes. Cette région est l'une des plus touchées par les violences armées et fait l'objet des recommandations les plus strictes : elle n'est présentée ici qu'au titre du patrimoine.",
    lat: 12.0734,
    lng: 1.7833,
    cover: "/images/voyage/parcs-w-arly",
    en: {
      name: "W and Arly parks",
      region: "East (Tapoa province)",
      summary: "The Burkinabè part of the W-Arly-Pendjari complex, a major UNESCO natural site.",
      description:
        "In the far east of the country, on the borders of Niger and Benin, the W and Arly parks form, together with Benin's Pendjari, the W-Arly-Pendjari Complex, a UNESCO World Heritage Site (2017 extension): West Africa's largest block of protected savannah, a refuge for elephants, lions, buffalo and antelopes. This region is one of the worst affected by armed violence and is subject to the strictest advice: it is presented here as heritage only.",
    },
    places: [
      {
        slug: "parc-national-d-arly",
        category: "NATURE",
        cover: "/images/voyage/lieu-parc-national-d-arly",
        name: "Parc national d'Arly",
        summary: "Savanes, collines de grès et rivières de la réserve d'Arly, à la frontière du Bénin.",
        description:
          "Créée en 1954, la réserve totale de faune d'Arly, souvent appelée parc national d'Arly, s'étend le long de la rivière Arly, à la frontière de la Pendjari béninoise. Collines de grès, galeries forestières et zones humides (site Ramsar depuis 2009) y abritaient l'une des faunes les plus riches du pays. Elle fait partie du complexe W-Arly-Pendjari inscrit au patrimoine mondial.",
        tips: "Zone parmi les plus dangereuses du pays, formellement déconseillée : présentée uniquement au titre du patrimoine. " + TIP_SECU,
        visitMinutes: 480,
        lat: 11.5836,
        lng: 1.4683,
        en: {
          name: "Arly National Park",
          summary: "Savannah, sandstone hills and rivers of the Arly reserve, on the Benin border.",
          description:
            "Created in 1954, the Arly Total Wildlife Reserve, often called Arly National Park, stretches along the Arly river on the border with Benin's Pendjari. Sandstone hills, gallery forests and wetlands (a Ramsar site since 2009) were home to some of the richest wildlife in the country. It is part of the W-Arly-Pendjari Complex, a World Heritage Site.",
          tips: "One of the most dangerous areas of the country, formally advised against: presented as heritage only. " + TIP_SECU_EN,
        },
      },
    ],
  },
];

/** Aucun circuit : l'ensemble du pays est formellement déconseillé (voir l'en-tête). */
export const BURKINA_CIRCUITS: SeedCircuit[] = [];
