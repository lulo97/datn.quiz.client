import { BACKEND_URL, MY_HEADER } from "@/Utils";

const BACKEND_PAGE = "QuestionDetail";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getOne(QuestionId: string) {
    try {
        const response = await fetch(API_URL + `/${QuestionId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function deleteOne(QuestionId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: MY_HEADER,
            body: JSON.stringify({ QuestionId: QuestionId }),
        });
        console.log(response)
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export async function getAllByUser(UserId: string) {
    try {
        const response = await fetch(API_URL + `/ReadAllByUser/${UserId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function getAllBySubject(SubjectId: string) {
    try {
        const response = await fetch(API_URL + `/ReadAllBySubject/${SubjectId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}