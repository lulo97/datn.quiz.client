import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

import { ModalSizeClass } from "@/Utils";
import { ModalSettingContent } from "./ModalSettingContent";

export function ModalSetting() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Settings />
                    </Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Cài đặt</DialogTitle>
                    </DialogHeader>

                    <ModalSettingContent />

                    <DialogFooter>
                        <div className="w-full flex justify-end">
                            <Button>Đóng</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
