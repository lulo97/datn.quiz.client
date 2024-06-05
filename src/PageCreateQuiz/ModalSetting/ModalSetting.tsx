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
import { ModalSettingContentRight } from "./ModalSettingRight";
import { ModalSettingContentLeft } from "./ModalSettingLeft";
import { useState } from "react";
import { Settings } from "lucide-react";
import { CreateQuizProps } from "../Utils";

export function ModalSetting(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Settings />
                    </Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Cài đặt</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-3">
                        <ModalSettingContentLeft
                            state={state}
                            dispatch={dispatch}
                        />
                        <ModalSettingContentRight
                            state={state}
                            dispatch={dispatch}
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
