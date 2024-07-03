import { uploadFile } from "@/api/Upload";

export const handleUploadFile = async (
    file: File | null,
    url: string | null
) => {
    if (url) return; //Using direct url for file
    if (!file) return; //Don't have file to upload
    try {
        const ImageUrl = await uploadFile(file);
        return ImageUrl;
    } catch (error) {
        console.error(error);
    }
};
