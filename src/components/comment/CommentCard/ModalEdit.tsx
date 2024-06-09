import { AutosizeTextarea } from "@/components/ui/AutoSizeTexarea/AutosizeTextarea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PenBox, X } from "lucide-react";
import { useState } from "react";
import { CommentCardProps } from "../Utils";
import { toast } from "react-toastify";
import { updateOne } from "../API/updateOne";

export function ModalEdit(props: CommentCardProps) {
    const { comment, fetchData } = props;
    const [content, setContent] = useState(comment.Content);
    async function handleUpdate() {
        try {
            await updateOne({ CommentId: comment.CommentId, Content: content });
            toast.warning("Sửa thành công!");
            fetchData();
            setOpen(false)
        } catch (error) {
            toast.warning("Sửa thất bại!");
        }
    }

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <PenBox className="text-green-500 hover:text-green-600 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sửa bình luận</DialogTitle>
                    <DialogDescription>Nhập bình luận</DialogDescription>

                    <div>
                        <AutosizeTextarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            maxHeight={200}
                            className="bg-gray-50"
                        />
                    </div>
                    <div className="w-full flex justify-between">
                        <Button onClick={() => setOpen(false)} >Hủy</Button>
                        <Button onClick={handleUpdate}>Sửa</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
