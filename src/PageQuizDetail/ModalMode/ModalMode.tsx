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

import ModalModeContent from "./ModalModeContent";

export default function ModalMode() {
    return (
        <div className="w-2/3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full">Làm đề</Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Chọn chế độ làm đề</DialogTitle>
                    </DialogHeader>
                    <ModalModeContent />
                    <DialogFooter>
                        <Button>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
