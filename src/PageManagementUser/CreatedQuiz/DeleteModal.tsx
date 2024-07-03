import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { toast } from "react-toastify";
import { deleteOne } from "@/api/Quiz";

interface DeleteModalProps {
    record: QuizDetail;
    fetchData: () => Promise<void>;
}

export function DeleteModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);

    async function handleClick() {
        try {
            if (record.QuizId == "") return;
            const result = await deleteOne(record.QuizId);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.error(result);
            } else {
                toast.success("Xóa thành công!")
                await fetchData();
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.error(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <X className="text-red-500 hover:text-red-600" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xóa</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <Label>Id: </Label> {record.QuizId}
                    </div>
                    <div>
                        <Label>Tên đề: </Label> {record.Name}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleClick}>Xác nhận xóa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
