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
import ModalSettingContentRight from "./ModalSettingRight";
import ModalSettingContentLeft from "./ModalSettingLeft";

export default function ModalSetting() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Cài đặt</Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Cài đặt</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-3">
                        <ModalSettingContentLeft />
                        <ModalSettingContentRight />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
