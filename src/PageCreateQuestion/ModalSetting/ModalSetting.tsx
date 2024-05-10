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
import { SelectDifficult } from "./SelectDifficult";
import { SelectEducationLevel } from "./SelectEducation";
import { SelectLanguage } from "./SelectLanguge";
import { SelectPenaltyPoint } from "./SelectPenatyPoint";
import { SelectPoint } from "./SelectPoint";
import { SelectSubSubject } from "./SelectSubSubject";
import { SelectSubject } from "./SelectSubject";
import { SelectType } from "./SelectType";
import { SwitchPenaltyAllow } from "./SwitchPenaltyAllow";

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

                    <div className="grid grid-cols-2 gap-2">
                        <SelectType />
                        <SelectDifficult />
                        <SelectLanguage />
                        <SelectEducationLevel />
                        <SelectSubject />
                        <SelectSubSubject />
                        <SelectPenaltyPoint />
                        <SelectPoint />
                        <SwitchPenaltyAllow />
                    </div>

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
