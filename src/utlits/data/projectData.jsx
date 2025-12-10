import { color } from "framer-motion";

export const projectsData = [
  {
    id: 1,
    src: "/images/projects/breitling_league/mockup.jpg",
    images: [
      "/images/projects/breitling_league/dc.jpg",
      "/images/projects/breitling_league/repo.jpg",
      "/images/projects/breitling_league/figma.jpg",
      "/images/projects/breitling_league/animation.jpg",
    ],
    category: ["Développement", "UI/UX", "Stratégie Digitale"],
    title: "Breitling League",
    description:
      "Dans le cadre de notre cours d'articulation à la HEIG-VD, nous avons eu la chance de travailler sur une problématique réelle proposée par Breitling. La marque souhaitait améliorer son système de formation destiné aux revendeurs de ses montres, afin qu'ils soient mieux préparés pour valoriser leurs produits. Nous avons proposé une solution innovante basée sur la gamification, qui a séduit Breitling. Notre équipe a conçu et développé un POC (Proof of Concept) ainsi qu'une identité visuelle complète autour de cette Breitling League. Ce travail nous a valu la distinction de la meilleure note du cours. Pour en savoir plus sur ce projet, n'hésitez pas à me contacter.",
    year: 2025,
    client: "Breitling",
    projectType: "Projet académique",
    color: "#007bff",
    links: [
      {
        type: "github",
        url: "https://github.com/d-vale/breitling-league",
        label: "Code source",
      },
      {
        type: "figma",
        url: "https://www.figma.com/design/V2P2A2RyDCqwVYSGSuEgFm/BreitlingLeague?node-id=19-62&t=AtHpn1iGtheqr6v8-1",
        label: "Design Figma",
      },
      {
        type: "video",
        url: "/video/breitlingleague-teaser.mp4",
        label: "Vidéo teaser",
      },
    ],
  },
  {
    id: 2,
    src: "/images/projects/cs50_cs/course_logo.jpg",
    images: [
      "/images/projects/cs50_cs/homepage.jpg",
      "/images/projects/cs50_cs/repo.jpg",
    ],
    category: ["Développement"],
    title: "CS50's Introduction to CS",
    description:
      "Ma curiosité d'approfondir mes connaissances et de découvrir de nouvelles approches pédagogiques m'a poussé à suivre le célèbre cours CS50 de Harvard. J'ai documenté l'intégralité de mon parcours dans un dépôt GitHub où vous pourrez suivre ma progression et découvrir les compétences acquises. Cette formation solide me prépare idéalement pour mon futur Master HEC en systèmes d'information.",
    year: 2025,
    client: "EDX HarvardX",
    projectType: "Self Learning",
    color: "#FBDB32",
    links: [
      {
        type: "github",
        url: "https://github.com/d-vale/harvard_cs50",
        label: "Repository GitHub",
      },
      {
        type: "site",
        url: "https://cs50.harvard.edu/x/",
        label: "Site de CS50",
      },
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=3oFAJtFE8YU&t=1s",
        label: "Présentation CS50",
      },

      /*       {
        type: "certificate",
        url: "https://edx.org/certificate/abc123",
        label: "Certificat",
      }, */
    ],
  },
  {
    id: 3,
    src: "/images/projects/hackdays_rts/mockup.jpg",
    images: [
      "/images/projects/hackdays_rts/repo.jpg",
      "/images/projects/hackdays_rts/photos.jpg",
      "/images/projects/hackdays_rts/video.jpg",
    ],
    category: ["Développement", "UI/UX"],
    title: "Hackdays RTS",
    description:
      "Ce projet a marqué ma première participation à un hackathon. Sans attente particulière, j'ai découvert l'univers passionnant des hackathons. En équipe, nous avons relevé un défi concret : faciliter l'accès aux informations de diffusion des matchs pour les fans de sport. Aujourd'hui, il n'est pas toujours simple de savoir sur quelle plateforme un match sera diffusé. Bien que les applications sportives de la SRG (RTS Sport, SRF Sport, etc.) permettent aux fans de suivre leur équipe et de recevoir des alertes, il manquait une centralisation des informations de diffusion. Pendant ces deux jours intenses, je me suis chargé du développement front-end, de la réalisation d'une partie de l'API ainsi que de la création de la vidéo de présentation du projet, avec pour objectif d'offrir une solution fluide et accessible à tous les passionnés de sport. Et quel résultat ! Nous avons remporté la 2ᵉ place ainsi que le prix du public !",
    year: 2025,
    client: "Radio Télévision Suisse",
    projectType: "Hackathon",
    links: [
      {
        type: "github",
        url: "https://github.com/RobinChappalley/favorites-teams-rtssport",
        label: "Code source",
      },
      {
        type: "figma",
        url: "https://www.figma.com/design/uAt0xTiGT9gfKIgzLyKhFi/Hackdays-RTS?node-id=1-3&t=2pmczHeLXn7etUvx-1",
        label: "Design Figma",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/posts/srg-ssr_throwbackvideo-teamsrgssr-aboutsrgssr-ugcPost-7311335357516541955-AhBp?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACz2UFcBoqWxXvrLkiQXNXnbKY0-VIU4dgg",
        label: "Publication SRG SSR",
      },
    ],
  },
  {
    id: 4,
    src: "/images/projects/cyclab/mockup.jpg",
    images: [
      "/images/projects/cyclab/instagram.jpg",
      "/images/projects/cyclab/tiktok.jpg",
    ],
    category: ["Développement", "Branding", "Marketing"],
    title: "Cyclab",
    description:
      "Dans le cadre du cours e-commerce à la HEIG-VD, nous avons développé Cyclab, un projet e-commerce complet spécialisé dans le vélo avec une identité minimaliste et professionnelle. Ce projet nous a permis d'aborder tous les aspects du commerce en ligne : organisation méthodologique avec Asana, stratégie marketing approfondie (segmentation, positionnement premium, objectifs court/moyen/long terme), création de personas ciblant les cyclistes suisses, et analyse concurrentielle détaillée. Nous avons conçu le site sur WordPress avec Elementor Pro en intégrant une optimisation SEO avancée (RankMath, IA), un système complet de gestion des paiements et des stocks, ainsi qu'une logistique optimisée avec emballages écoresponsables. Notre approche inclusive et durable se reflète dans chaque aspect du projet, de la conception aux campagnes publicitaires ciblées sur les réseaux sociaux. Je vous invite à consulter la documentation complète de ce projet.",
    year: 2024,
    client: "Cyclab",
    projectType: "Projet académique",
    color: "#646464",
    links: [
      {
        type: "file",
        url: "https://acrobat.adobe.com/id/urn:aaid:sc:EU:60efcad1-8826-4dbf-b9fe-080527a606de",
        label: "Rapport complet",
      },
    ],
  },
  {
    id: 5,
    src: "/images/projects/naturaquest/homepage.jpg",
    images: [
      "/images/projects/naturaquest/mockup1.png",
      "/images/projects/naturaquest/mockup2.png",
      "/images/projects/naturaquest/mockup3.png",
      "/images/projects/naturaquest/mockup4.png",
    ],
    category: ["UI/UX"],
    title: "NaturaQuest",
    description:
      "Dans le cadre d’un cours de UI à la HEIG-VD, nous avons eu pour mission de concevoir une application intégrant des éléments de gamification pour la collecte d’informations sur la nature. L’objectif est d’inciter les utilisateurs lorsqu’ils se promènent à s’investir dans des missions, permettant ainsi aux scientifiques de recueillir des données fiables.",
    year: 2024,
    client: "HEIG-VD",
    projectType: "Projet fictif",
    color: "#1A453C",
    links: [
      {
        type: "figma",
        url: "https://www.figma.com/design/QmEa3V24yyQRibTl12QCn0/NaturaQuest?node-id=0-1&t=JW8QXnUDlRJLJ3bG-1",
        label: "Design Figma",
      },
    ],
  },
  {
    id: 6,
    src: "/images/projects/propics_swisscom/landing.jpg",
    /*     images: [
      "/images/projects/single-project1.jpg",
      "/images/projects/single-project2.jpg",
    ], */
    category: ["Photographie", "Branding"],
    title: "ProPics Swisscom",
    description:
      "Lors de mon apprentissage chez Swisscom, j'ai eu l'opportunité de créer une nouvelle équipe : ProPics. Cette équipe était dédiée à la réalisation de photos corporate respectant le branding Swisscom pour les Swisscom Shops. J'ai eu la chance de m'occuper de la prise de vue et de la retouche photo, tout en assurant la gestion de l'équipe et l'ensemble des tâches administratives. Aujourd'hui, ProPics continue de se développer et de s'agrandir au sein de Swisscom.",
    year: 2020,
    client: "Swisscom",
    projectType: "Professionnel",
    color: "#007bff",
  },
];
