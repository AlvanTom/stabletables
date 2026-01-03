"use client";

import { Button, Container, Loader, Select, Text } from "@mantine/core";
import styles from "./styles.module.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { DropzoneButton } from "@/src/components/DropzoneButton";
import { type FileWithPath } from "@mantine/dropzone";
import {
    IMAGE_MIME_TYPES,
    VIDEO_MIME_TYPES,
    AUDIO_MIME_TYPES,
} from "@/src/components/DropzoneButton";

interface CurrentConvertedFile {
    name: string;
    url: string;
}
async function convert(
    ffmpeg: FFmpeg,
    file: FileWithPath,
    setConvertedFile: React.Dispatch<
        React.SetStateAction<CurrentConvertedFile | null>
    >,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    outputType: string
) {
    setLoaded(false);
    try {
        if (!ffmpeg || !file.path || !outputType) {
            return;
        }
        await ffmpeg.writeFile(file.name, await fetchFile(file));
        // TODO: give users the option to add additional arguments to the ffmpeg command
        await ffmpeg.exec([
            "-i",
            file.name,
            `output.${outputType.split("/").pop()}`,
        ]);
        const data = await ffmpeg.readFile(
            `output.${outputType.split("/").pop()}`
        );

        if (typeof data === "string") {
            throw new Error("Expected binary data but got string");
        }
        const url = URL.createObjectURL(
            new Blob([new Uint8Array(data)], { type: outputType })
        );

        setConvertedFile({
            name: `${file.name.split(".")[0]}.${outputType.split("/").pop()}`,
            url,
        });
    } catch (error) {
        console.error(error);
    } finally {
        setLoaded(true);
    }
}

export default function Convert() {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef<FFmpeg | null>(null);
    const messageRef = useRef(null);
    const [convertedFile, setConvertedFile] =
        useState<CurrentConvertedFile | null>(null);
    const [outputType, setOutputType] = useState<string>("image/png");
    const [droppedFile, setDroppedFile] = useState<FileWithPath | null>(null);

    const handleDrop = (files: FileWithPath[]) => {
        if (!ffmpegRef.current) {
            return;
        }
        // only supports 1 file at a time
        setDroppedFile(files[0]);
    };

    useEffect(() => {
        (async () => {
            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpeg();
            }
            const baseURL =
                "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
            const ffmpeg = ffmpegRef.current;
            // Debug FFMPEG logs
            // ffmpeg.on("log", ({ message }) => {
            //     if (messageRef.current) {
            //         (messageRef.current as HTMLElement).innerHTML = message;
            //     }
            //     console.log(message);
            // });
            await ffmpeg.load({
                coreURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.js`,
                    "text/javascript"
                ),
                wasmURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.wasm`,
                    "application/wasm"
                ),
            });
            setLoaded(true);
        })();
    }, [ffmpegRef]);

    if (!loaded) {
        return (
            <Container className={styles.container}>
                <Loader />
            </Container>
        );
    }

    if (convertedFile) {
        return (
            <Container className={styles.container}>
                <a href={convertedFile.url} download={convertedFile.name}>
                    Download {convertedFile.name}
                </a>
                <Button
                    size="md"
                    radius="xl"
                    onClick={() => {
                        setConvertedFile(null);
                        setDroppedFile(null);
                    }}
                >
                    Convert again
                </Button>
            </Container>
        );
    }

    return (
        <Container className={styles.container}>
            <Text className={styles.title}>Convert</Text>
            <Text ref={messageRef} />
            {droppedFile && (
                <>
                    <Text mt="md">Dropped file: {droppedFile.name}</Text>
                    <Button
                        size="md"
                        radius="xl"
                        onClick={() => {
                            setDroppedFile(null);
                        }}
                    >
                        Change file
                    </Button>
                </>
            )}
            {!droppedFile && <DropzoneButton handleDrop={handleDrop} />}
            <Select
                label="Choose an output type"
                value={outputType}
                onChange={(value) => setOutputType(value ?? "")}
                data={[
                    ...IMAGE_MIME_TYPES,
                    ...VIDEO_MIME_TYPES,
                    ...AUDIO_MIME_TYPES,
                ]}
                my="md"
            />
            <Button
                size="md"
                radius="xl"
                onClick={() => {
                    if (!ffmpegRef.current || !droppedFile) {
                        return;
                    }
                    convert(
                        ffmpegRef.current,
                        droppedFile,
                        setConvertedFile,
                        setLoaded,
                        outputType
                    );
                }}
                disabled={!droppedFile}
            >
                Convert
            </Button>
        </Container>
    );
}
