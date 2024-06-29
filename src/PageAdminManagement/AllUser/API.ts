import { BACKEND_URL, MY_HEADER } from "@/Utils";

const BACKEND_PAGE_Permission = "Permission";
const API_URL_Permission = BACKEND_URL + BACKEND_PAGE_Permission;

const BACKEND_PAGE_UserRole = "UserRole";
const API_URL_UserRole = BACKEND_URL + BACKEND_PAGE_UserRole;

export async function getAllByRole(RoleId: string) {
    try {
        const response = await fetch(API_URL_Permission + `/ReadAllByRole/${RoleId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function getOne(UserId: string) {
    try {
        const response = await fetch(API_URL_UserRole + `/${UserId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function updateOneUserRole(data: {
    UserId: string;
    RoleId: string;
}) {
    try {
        const response = await fetch(API_URL_UserRole, {
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