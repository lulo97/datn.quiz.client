import { ModalSizeClass } from "@/Utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { ModalModeContent } from "./ModalModeContent";
import { useState } from "react";
import { QuizDetailProps } from "../QuizDetail";

export function ModalMode(props: QuizDetailProps) {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-2/3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">Làm đề</Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Chọn chế độ làm đề</DialogTitle>
                    </DialogHeader>
                    <ModalModeContent {...props} />
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
