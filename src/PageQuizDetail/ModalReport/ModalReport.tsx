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
import { ModalReportContent } from "./ModalReportContent";

export function ModalReport() {
    return (
        <div className="w-1/3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">Báo cáo</Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Báo cáo đề</DialogTitle>
                    </DialogHeader>
                    <ModalReportContent />
                    <DialogFooter>
                        <Button>Gửi báo cáo</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
