import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { CommentCardProps } from "../Utils";
import { deleteOne } from "../API/deleteOne";
import { toast } from "react-toastify";
import { useState } from "react";

export function ModalDelete(props: CommentCardProps) {
    const { comment, fetchData } = props;

    async function handleDelete() {
        try {
            await deleteOne(comment.CommentId);
            toast.success("Xóa thành công");
            fetchData();
            setOpen(false);
        } catch (error) {
            toast.success("Xóa thất bại");
            console.error(error);
        }
    }
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <X className="text-red-500 hover:text-red-600 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xác nhận xóa bình luận</DialogTitle>
                    <DialogDescription>
                        Bình luận đã xóa sẽ không thể khôi phục!
                    </DialogDescription>
                    <div className="w-full flex justify-between">
                        <Button onClick={() => setOpen(false)}>Hủy</Button>
                        <Button onClick={handleDelete}>Xóa</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
