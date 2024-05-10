import { ModalAddQuestionContent } from "@/PageCreateQuiz/ModalAddQuestion/ModalAddQuestionContent";
import { ModalSizeClass } from "@/Utils";
import { DialogHeader } from "@/components/ui/dialog";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ModalFindQuiz() {
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
