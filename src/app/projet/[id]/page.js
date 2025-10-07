import Image from 'next/image';
import { projectsData } from '@/utlits/data/projectData';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';

// Cette fonction génère les routes statiques
export async function generateStaticParams() {
    return projectsData.map((project) => ({
        id: project.id.toString(),
    }));
}

// Composant serveur
export default function SingleProjectPage({ params }) {
    const id = parseInt(params.id);
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        return notFound();
    }

    return <ProjectClient project={project} />;
}