import { motion } from "motion/react";
import styles from "./GridBackground.module.css";

export function GridBackground() {
    return (
        <>
            <svg
                width="100%"
                height="100dvh"
                xmlns="http://www.w3.org/2000/svg"
                className={styles["background-svg"]}
            >
                <defs>
                    <motion.linearGradient
                        id="linGrad"
                        gradientTransform="rotate(45)"
                    >
                        <motion.stop
                            animate={{
                                offset: ["0%", null, "80%"],
                            }}
                            transition={{
                                duration: 5,
                                ease: "linear",
                                times: [0, 0.2, 1],
                                repeat: Infinity,
                            }}
                            stopColor="black"
                        />
                        <motion.stop
                            animate={{
                                offset: ["0%", null, "90%"],
                            }}
                            transition={{
                                duration: 5,
                                ease: "linear",
                                times: [0, 0.1, 1],
                                repeat: Infinity,
                            }}
                            stopColor="white"
                        />
                        <motion.stop
                            animate={{
                                offset: ["0%", "100%"],
                            }}
                            transition={{
                                duration: 5,
                                ease: "linear",
                                times: [0, 1],
                                repeat: Infinity,
                            }}
                            stopColor="black"
                        />
                    </motion.linearGradient>

                    <mask id="linGradMask">
                        <rect width="200%" height="200%" fill="url(#linGrad)" />
                    </mask>
                </defs>
            </svg>
            <div className={styles.gridWrapper}>
                <motion.div
                    className={styles.grid}
                    animate={{ opacity: [0.2, 0.4] }}
                    transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        times: [0, 1],
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            </div>
        </>
    );
}
