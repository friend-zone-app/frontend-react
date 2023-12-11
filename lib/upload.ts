export default async function UploadImage(
    imageData: Blob,
    accessToken: string
): Promise<string | null> {
    try {
        const res = await fetch("https://cdn-worker.txzje.workers.dev/upload", {
            headers: {
                "Content-Type": imageData.type,
                Authorization: "Bearer " + accessToken,
            },
            method: "POST",
            body: imageData,
        });

        const filename = await res.text();

        return filename;
    } catch (e) {
        return null;
    }
}
