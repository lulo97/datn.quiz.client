import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { CommentCardProps } from "../Utils";
import { ModalDelete } from "./ModalDelete";
import { ModalEdit } from "./ModalEdit";

export function EditDeletePopover(props: CommentCardProps) {
    const { comment, currentUser, QuizId, fetchData } = props;
    return (
        <Popover>
            <PopoverTrigger>
                <Ellipsis className="hover:bg-gray-300 rounded-full" />
            </PopoverTrigger>
            <PopoverContent className="w-fit flex flex-col gap-3">
                <ModalDelete
                    fetchData={fetchData}
                    QuizId={QuizId}
                    comment={comment}
                    currentUser={currentUser}
                />

                <ModalEdit
                    fetchData={fetchData}
                    QuizId={QuizId}
                    comment={comment}
                    currentUser={currentUser}
                />
            </PopoverContent>
        </Popover>
    );
}
