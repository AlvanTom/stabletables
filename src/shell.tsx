"use client";

import { AppShell } from "@mantine/core";
import { GridBackground } from "@/src/components/GridBackground";

export default function Shell({ children }: { children: React.ReactNode }) {
    return (
        <AppShell>
            <GridBackground />
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
