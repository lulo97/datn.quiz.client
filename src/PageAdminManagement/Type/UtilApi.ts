import { Type } from "@/InterfacesDatabase";
import { BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "Type"
const API_URL = BACKEND_URL + BACKEND_PAGE

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

export async function deleteOne(TypeId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ TypeId: TypeId }),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function updateOne(data: Type) {
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
    data: Omit<Type, "TypeId" | "CreatedAt" | "UpdateAt">
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
