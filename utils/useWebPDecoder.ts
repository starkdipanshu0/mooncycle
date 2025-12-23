import { useEffect, useState } from 'react';
// @ts-ignore
import libwebp from 'libwebpjs';

export const useWebPDecoder = (url: string) => {
    const [frames, setFrames] = useState<ImageBitmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined" || !("ImageDecoder" in window)) {
            console.warn("ImageDecoder API not supported in this browser.");
            setIsLoading(false);
            return;
        }

        const loadWebP = async () => {
            try {
                const response = await fetch(url);
                if (!response.body) throw new Error("No body in response");

                const imageDecoder = new ImageDecoder({
                    data: response.body,
                    type: "image/webp",
                });

                const decodedFrames: ImageBitmap[] = [];
                // Decode all frames
                // We'll decode tracks.image.frameCount if accessible, or just loop

                // Wait for metadata to get track info
                await imageDecoder.tracks.ready;
                const track = imageDecoder.tracks.selectedTrack;

                if (!track) {
                    throw new Error("No video track found");
                }

                const frameCount = track.frameCount;

                for (let i = 0; i < frameCount; i++) {
                    const result = await imageDecoder.decode({ frameIndex: i });
                    const bitmap = await createImageBitmap(result.image);
                    result.image.close();
                    decodedFrames.push(bitmap);
                }

                setFrames(decodedFrames);
                setIsLoading(false);
            } catch (e) {
                console.error("Failed to decode WebP", e);
                setIsLoading(false);
            }
        };

        loadWebP();
    }, [url]);

    return { frames, isLoading };
};
