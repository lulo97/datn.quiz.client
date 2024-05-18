import { SubSubject } from "@/InterfacesDatabase";
import { BACKEND_URL } from "@/Utils";
import { FilterValue } from "antd/es/table/interface";

const BACKEND_PAGE = "SubSubject"
const API_URL = BACKEND_URL + BACKEND_PAGE

export interface SubSubjectDetail extends SubSubject {
    SubjectName: string;
    SubjectDescription: string | null;
    SubjectCreatedAt: string;
    SubjectUpdatedAt: string;
}

export function toSubSubject(detail: SubSubjectDetail): SubSubject {
    const { SubSubjectId, SubjectId, Name, Description, CreatedAt, UpdateAt } = detail;
    return { SubSubjectId, SubjectId, Name, Description, CreatedAt, UpdateAt };
}

export interface GetAllOptions {
    filterFields?: FilterValue | string[]; // Array of filter fields
    sortField?: string; // Field to sort by
    sortDirection?: 'asc' | 'desc'; // Sorting direction
}

function buildFilterQueryParams(filterFields: FilterValue | string[]): string[] {
    return filterFields.map(field => `fields=${encodeURIComponent(field.toString())}`);
}

function buildSortQueryParams(sortField: string, sortDirection: string): string[] {
    return [`sortField=${encodeURIComponent(sortField)}`, `sortDirection=${sortDirection}`];
}


export async function getAll(options?: GetAllOptions) {
    let url = API_URL;

    if (options) {
        const { filterFields, sortField, sortDirection } = options;
        const queryParams = [];
        if (filterFields && filterFields.length > 0) {
            queryParams.push(...buildFilterQueryParams(filterFields));
        }
        if (sortField && sortDirection) {
            queryParams.push(...buildSortQueryParams(sortField, sortDirection));
        }
        const joinedQuery = queryParams.join('&');
        url += (joinedQuery.length > 0) ? `?${joinedQuery}` : '';
    }

    try {
        const response = await fetch(url);
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
