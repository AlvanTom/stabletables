"use client";

import { motion } from "motion/react";
import styles from "./styles.module.css";
import { Center, Container } from "@mantine/core";
import LinkedInIcon from "@/src/components/icons/LinkedInIcon";
import GithubIcon from "@/src/components/icons/GithubIcon";
import EmailIcon from "@/src/components/icons/EmailIcon";
import InstagramIcon from "@/src/components/icons/InstagramIcon";
import { ProjectsSection } from "@/src/components/ProjectsSection";
import { GridBackground } from "@/src/components/GridBackground";

export default function Home() {
    return (
        <>
            {/* <GridBackground /> */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Center
                    className={styles["primary-content"]}
                    w="100%"
                    h="100dvh"
                >
                    <div className={styles.header}>
                        <h1 className={styles.name}>Alvan Tom</h1>
                        <h2 className={styles.subtitle}>
                            <span className={styles.highlight}>
                                Fullstack Developer{" "}
                            </span>
                            based in 🇨🇦
                        </h2>
                        <div className={styles["icon-list"]}>
                            <LinkedInIcon />
                            <GithubIcon />
                            <EmailIcon />
                            <InstagramIcon />
                        </div>
                    </div>
                    <img
                        className={styles.pfp}
                        src="/pfp.jpg"
                        alt="alvan-profile"
                    />
                </Center>

                <Container w="100%" h="100dvh">
                    <ProjectsSection />
                </Container>
            </motion.div>
        </>
    );
}
