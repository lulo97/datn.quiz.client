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
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { toast } from "react-toastify";
import { deleteOne } from "@/api/Question";

interface DeleteModalProps {
    record: QuestionDetail;
    fetchData: () => Promise<void>;
}

const ErrorQuestionInQuiz = "Question in Quiz";

export function DeleteModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);

    async function handleClick() {
        if (record.QuestionId == "") return;
        try {
            const result = await deleteOne(record.QuestionId);
            if (!result) {
                toast.error("Có lỗi!");
                console.error(result);
                return;
            }
            if ("error" in result) {
                if (result.error == ErrorQuestionInQuiz) {
                    toast.warning("Câu hỏi nằm trong đề thi!");
                } else {
                    toast.error("Có lỗi!");
                    console.error(result);
                }
            } else {
                toast.success("Xóa thành công!");
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
                        <Label>Id: </Label> {record.QuestionId}
                    </div>
                    <div>
                        <Label>Câu hỏi: </Label>{" "}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: record.Content || "",
                            }}
                        ></div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleClick}>Xác nhận xóa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
