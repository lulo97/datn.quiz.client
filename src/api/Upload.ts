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

export function uploadFileXHR(file: File, setProcess?: React.Dispatch<React.SetStateAction<number>>): Promise<string> {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                //setProcess(parseInt(percentComplete.toString));
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    resolve(responseData.path);
                } catch (error) {
                    reject(new Error("Failed to parse response."));
                }
            } else {
                reject(new Error("Failed to upload file."));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error("Error during upload."));
        });

        xhr.addEventListener('abort', () => {
            reject(new Error("Upload aborted."));
        });

        xhr.open('POST', API_URL);
        xhr.send(formData);
    });
}

