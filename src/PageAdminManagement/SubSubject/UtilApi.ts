import { SubSubject } from "@/InterfacesDatabase";
import { BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "SubSubject"
const API_URL = BACKEND_URL + BACKEND_PAGE

export interface SubSubjectDetail extends SubSubject {
    SubjectName: string;
    SubjectDescription: string | null;
    SubjectCreatedAt: string; // Assuming it's a string representing a date in ISO 8601 format
    SubjectUpdatedAt: string; // Assuming it's a string representing a date in ISO 8601 format
}

export function toSubSubject(detail: SubSubjectDetail): SubSubject {
    const { SubSubjectId, SubjectId, Name, Description, CreatedAt, UpdateAt } = detail;
    return { SubSubjectId, SubjectId, Name, Description, CreatedAt, UpdateAt };
}

export async function getAll() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function deleteOne(SubSubjectId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ SubSubjectId: SubSubjectId }),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function updateOne(data: SubSubject) {
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function createOne(
    data: Omit<SubSubject, "SubSubjectId" | "CreatedAt" | "UpdateAt">
) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
