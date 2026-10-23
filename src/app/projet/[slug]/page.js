import Image from 'next/image';
import { projectsData } from '@/utlits/data/projectData';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';

// Cette fonction génère les routes statiques
export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}

// Composant serveur
export default async function SingleProjectPage({ params }) {
    const { slug } = await params;
    const project = projectsData.find(p => p.slug === slug);

    if (!project) {
        return notFound();
    }

    return <ProjectClient project={project} />;
}