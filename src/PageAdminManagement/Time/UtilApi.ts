import { Time } from "@/InterfacesDatabase";
import { MY_HEADER, BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "Time";
const API_URL = BACKEND_URL + BACKEND_PAGE;

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

export async function deleteOne(TimeId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: MY_HEADER,
            body: JSON.stringify({ TimeId: TimeId }),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function updateOne(data: Time) {
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: MY_HEADER,
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
    data: Omit<Time, "TimeId" | "CreatedAt" | "UpdatedAt">
) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: MY_HEADER,
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
