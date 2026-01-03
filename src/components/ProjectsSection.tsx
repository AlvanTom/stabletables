import { Container, Text, Group, Badge } from "@mantine/core";
import { IconWorld, IconBrandGithub } from "@tabler/icons-react";
import styles from "./ProjectSection.module.css";

const projects = [
    // {
    //     title: "Manga Reader",
    //     description: "Manga reader for desktop and mobile",
    // },
    {
        title: "Convert",
        description: "A web app to convert media formats locally",
        web: "/convert",
        github: "https://github.com/AlvanTom/stabletables",
        keywords: ["Next.js", "FFmpeg", "WASM"],
    },
    {
        title: "BookBuds",
        description: "A book club app to track reading progress among friends",
        github: "https://github.com/AlvanTom/BookBuds",
        keywords: ["Flask", "AWS"],
    },
    {
        title: "Climbr",
        description: "Android app to track climbing sessions",
        github: "https://github.com/AlvanTom/Climbr",
        keywords: ["Android", "Kotlin", "Firebase"],
    },
    {
        title: "BytePusher",
        description: "An Emulator to run bytepusher programs",
        github: "https://github.com/Fionon/BytePusherVM",
        keywords: ["C++", "SDL2"],
    },
];

export function ProjectsSection() {
    return (
        <Container className={styles["projects-container"]}>
            <Text className={styles.header}>Projects</Text>
            <Container className={styles["projects-stack"]}>
                {projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </Container>
        </Container>
    );
}

function ProjectCard({
    title,
    description,
    link,
    web,
    github,
    keywords,
}: {
    title: string;
    description: string;
    link?: string;
    web?: string;
    github?: string;
    keywords?: string[];
}) {
    return (
        <Container className={styles["project-card"]} w="32rem">
            <Group gap="xs" align="center">
                <Text component="a" href={link} className={styles.title}>
                    {title}
                </Text>
                {(web || github) && (
                    <Group gap="xs" className={styles["icon-group"]}>
                        {web && (
                            <a
                                href={web}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.icon}
                            >
                                <IconWorld size={20} stroke={1.5} />
                            </a>
                        )}
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.icon} ${styles["github-icon"]}`}
                            >
                                <IconBrandGithub size={20} stroke={1.5} />
                            </a>
                        )}
                    </Group>
                )}
            </Group>
            <Text className={styles.description}>{description}</Text>
            {keywords && keywords.length > 0 && (
                <Group gap="xs" className={styles["keywords-group"]}>
                    {keywords.map((keyword) => (
                        <Badge key={keyword} variant="light" size="sm">
                            {keyword}
                        </Badge>
                    ))}
                </Group>
            )}
        </Container>
    );
}
