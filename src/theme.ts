import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
    "#fff4e1",
    "#ffe8cc",
    "#fed09b",
    "#fdb766",
    "#fca13a",
    "#fc931d",
    "#fc8a08",
    "#e17800",
    "#c86a00",
    "#af5a00",
];

export const theme = createTheme({
    colors: {
        myColor,
    },
});
