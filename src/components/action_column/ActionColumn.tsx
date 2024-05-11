import { Eye, PenBox, Send, X } from "lucide-react";

interface ActionColumn {
    isRead: boolean;
    isUpdate: boolean;
    isDelete: boolean;
    isSend: boolean;
}

export function ActionColumn(props: Partial<ActionColumn>) {
    const {
        isRead = false,
        isUpdate = false,
        isDelete = false,
        isSend = false,
    } = props;
    return (
        <>
            {isRead && <Eye className="text-yellow-500" />}
            {isUpdate && <PenBox className="text-green-500" />}
            {isDelete && <X className="text-red-500" />}
            {isSend && <Send className="text-blue-500" />}
        </>
    );
}
