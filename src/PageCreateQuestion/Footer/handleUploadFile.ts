import { uploadFile } from "@/api/Upload";
import { toast } from "react-toastify";

export const handleUploadFile = async (file: File | null, url: string | null) => {
    //If user using url then do nothing
    if (url) return;
    //If don't have file then do nothing
    if (!file) return;
    try {
        const path = await uploadFile(file);
        return path;
    } catch (error) {
        toast.error("Lỗi tải lên tệp!");
    }
};