import { ModalSizeClass } from "@/Utils";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalFindQuizContent } from "./ModalFindQuizContent";

export function ModalFindQuiz() {
    return (
        <div>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Tìm đề</Button>
                    </DialogTrigger>
                    <DialogContent className={ModalSizeClass}>
                        <div>
                            <DialogTitle className="mb-2">Thêm đề</DialogTitle>
                            <ModalFindQuizContent />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
