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
import { useState } from "react";
import { CreateRoomProps } from "../Utils";

export function ModalSetting(props: CreateRoomProps) {
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

                    <ModalSettingContent state={state} dispatch={dispatch} />

                    <DialogFooter>
                        <div className="w-full flex justify-end">
                            <Button onClick={() => setOpen(false)}>Đóng</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
