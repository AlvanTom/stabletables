import type { Metadata } from "next";
import { Mada } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import {
    ColorSchemeScript,
    mantineHtmlProps,
    MantineProvider,
} from "@mantine/core";
import Shell from "../src/shell";
import { theme } from "../src/theme";

const mada = Mada({
    variable: "--font-mada",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Alvan Tom",
    description: "Alvan Tom's personal website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`${mada.className} antialiased`}>
                <MantineProvider theme={theme}>
                    <Shell> {children}</Shell>
                </MantineProvider>
            </body>
        </html>
    );
}
