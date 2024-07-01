import { getObjectId } from "@/Utils"

interface RecycleBin {
    ItemId: string
}

export const data: RecycleBin[] = [
    {ItemId: getObjectId()},
    {ItemId: getObjectId()},
    {ItemId: getObjectId()},
    {ItemId: getObjectId()},
    {ItemId: getObjectId()},
    {ItemId: getObjectId()}
]