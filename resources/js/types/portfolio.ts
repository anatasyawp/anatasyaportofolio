export interface ProjectLayerImage {
    url: string;
    alt: string;
    depth: number; // 1 to 4 (scale & parallax multiplier)
    caption?: string;
    className?: string;
}

export interface Project {
    id: string;
    slug: string;
    number: string;
    title: string;
    category: 'Government & Enterprise' | 'Web Engineering' | 'UI/UX & Frontend';
    badge: string;
    period: string;
    client: string;
    summary: string;
    role: string;
    contributions: string[];
    metrics?: {
        label: string;
        value: string;
        description: string;
    }[];
    technologies: string[];
    features: string[];
    testingMethodology?: string;
    testingResults?: string[];
    starMethod?: {
        situation: string;
        task: string;
        action: string[];
        result: string[];
    };
    layerImages: ProjectLayerImage[];
    githubUrl?: string;
    liveUrl?: string;
    figmaUrl?: string;
    docUrl?: string;
    featured: boolean;
}

export interface Experience {
    period: string;
    role: string;
    organization: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
    logoUrl?: string;
}

export interface Education {
    period: string;
    institution: string;
    degree: string;
    major: string;
    gpa: string;
    highlights: string[];
    logoUrl?: string;
}

export interface License {
    id: string | number;
    title: string;
    issuer: string;
    issueDate: string;
    credentialId?: string;
    credentialUrl?: string;
    association?: string;
    category: string;
    description?: string;
    skills: string[];
    badge?: string;
    image?: string;
    order?: number;
}

export interface Certificate {
    id: string | number;
    title: string;
    issuer: string;
    issueDate: string;
    credentialId?: string;
    credentialUrl?: string;
    association?: string;
    category: string;
    description?: string;
    skills: string[];
    type?: 'license' | 'achievement' | 'certification';
    badge?: string;
    image?: string;
}

export interface Achievement {
    id: string | number;
    title: string;
    event: string;
    year: string;
    description: string;
    badge: string;
    association?: string;
    credentialUrl?: string;
    category?: string;
    skills?: string[];
    image?: string;
    order?: number;
}

export interface SkillCategory {
    name: string;
    description: string;
    skills: {
        name: string;
        level?: 'Proficient' | 'Advanced' | 'Practicing' | 'Learning' | string;
        icon?: string;
        color?: string;
    }[];
}
