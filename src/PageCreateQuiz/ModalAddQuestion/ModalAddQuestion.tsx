import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalSizeClass } from "@/Utils";
import ModalAddQuestionContent from "./ModalAddQuestionContent";

export default function ModalAddQuestion() {
    return (
        <div>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Thêm câu hỏi</Button>
                    </DialogTrigger>
                    <DialogContent className={ModalSizeClass}>
                        <DialogHeader>
                            <DialogTitle>Thêm câu hỏi</DialogTitle>
                        </DialogHeader>
                        <ModalAddQuestionContent />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
