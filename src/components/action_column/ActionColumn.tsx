import { Eye, PenBox, X } from "lucide-react";

interface ActionColumn {
    isRead: boolean;
    isUpdate: boolean;
    isDelete: boolean;
}

export function ActionColumn(props: ActionColumn) {
    const { isRead, isUpdate, isDelete } = props;
    return (
        <>
            {isRead && <Eye className="text-yellow-500" />}
            {isUpdate && <PenBox className="text-blue-500" />}
            {isDelete && <X className="text-red-500" />}
        </>
    );
}
