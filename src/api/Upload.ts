import { BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "Upload";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function uploadFile(file: File): Promise<string> {
    const formData  = new FormData();
    formData.append("file", file);
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Failed to upload file.");
        }

        const responseData = await response.json();
        return responseData.path;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
