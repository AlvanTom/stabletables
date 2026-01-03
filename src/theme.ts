import { createTheme, MantineColorsTuple } from "@mantine/core";

const purple: MantineColorsTuple = [
    "#f5f3ff",
    "#ede9fe",
    "#ddd6fe",
    "#c4b5fd",
    "#a78bfa",
    "#8878b9",
    "#8b5cf6",
    "#7c3aed",
    "#69369f",
    "#5b21b6",
];

export const theme = createTheme({
    primaryColor: "purple",
    colors: {
        purple,
    },
});
