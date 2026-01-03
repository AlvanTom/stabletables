"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./styles.module.css";
import { Center, Container } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import LinkedInIcon from "@/src/components/icons/LinkedInIcon";
import GithubIcon from "@/src/components/icons/GithubIcon";
import EmailIcon from "@/src/components/icons/EmailIcon";
import InstagramIcon from "@/src/components/icons/InstagramIcon";
import { ProjectsSection } from "@/src/components/ProjectsSection";

export default function Home() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY * 2 > window.innerHeight);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
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
                    <motion.div
                        className={styles["scroll-indicator"]}
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <IconChevronDown size={32} />
                    </motion.div>
                </Center>

                <Container w="100%" h="100dvh">
                    <ProjectsSection />
                </Container>
            </motion.div>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        className={styles["scroll-to-top"]}
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        aria-label="Scroll to top"
                    >
                        <IconChevronUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
