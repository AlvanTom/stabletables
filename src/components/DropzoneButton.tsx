import { useRef } from "react";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import classes from "./DropzoneButton.module.css";

export const VIDEO_MIME_TYPES = [
    "video/mp4",
    "video/webm",
    "video/x-matroska",
    "video/x-msvideo",
    "video/quicktime",
    "video/x-flv",
    "video/ogg",
];

export const IMAGE_MIME_TYPES = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/avif",
    "image/heic",
    "image/heif",
];

export const AUDIO_MIME_TYPES = [
    "audio/mpeg",
    "audio/mp4",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
];

const ACCEPTED_FILE_TYPES = [
    ...IMAGE_MIME_TYPES,
    ...VIDEO_MIME_TYPES,
    ...AUDIO_MIME_TYPES,
];

export function DropzoneButton({
    handleDrop,
}: {
    handleDrop: (files: FileWithPath[]) => void;
}) {
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={handleDrop}
                className={classes.dropzone}
                radius="md"
                accept={ACCEPTED_FILE_TYPES}
                maxSize={30 * 1024 ** 2}
                maxFiles={1}
            >
                <div style={{ pointerEvents: "none" }}>
                    <Group justify="center">
                        <Dropzone.Accept>
                            <IconDownload
                                size={50}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                size={50}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={50}
                                stroke={1.5}
                                className={classes.icon}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop a file here</Dropzone.Accept>
                        <Dropzone.Reject>Not a valid file</Dropzone.Reject>
                        <Dropzone.Idle>Upload files</Dropzone.Idle>
                    </Text>

                    <Text className={classes.description}>
                        Drag and drop a file here to upload. Then select file
                        type you want to convert to.
                    </Text>
                </div>
            </Dropzone>

            <Button
                className={classes.control}
                size="md"
                radius="xl"
                onClick={() => openRef.current?.()}
            >
                Select files
            </Button>
        </div>
    );
}
