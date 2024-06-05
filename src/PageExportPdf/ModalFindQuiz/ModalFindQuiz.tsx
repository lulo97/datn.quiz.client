import { ModalSizeClass } from "@/Utils";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalFindQuizContent } from "./ModalFindQuizContent";
import { useState } from "react";

export function ModalFindQuiz() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
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
