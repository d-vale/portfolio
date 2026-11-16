import { projectsData } from '@/utlits/data/projectData';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';

// Cette fonction génère les routes statiques
export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = projectsData.find(p => p.slug === slug);
    return project ? { title: `${project.title} — Daniel Vale` } : {};
}

// Composant serveur
export default async function SingleProjectPage({ params }) {
    const { slug } = await params;
    const index = projectsData.findIndex(p => p.slug === slug);

    if (index === -1) {
        return notFound();
    }

    const project = projectsData[index];
    // Même ordre que la grille (du plus récent au plus ancien), en boucle
    const next = projectsData[(index - 1 + projectsData.length) % projectsData.length];

    return (
        <ProjectClient
            project={project}
            next={{ slug: next.slug, title: next.title }}
        />
    );
}
