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
import { SelectDifficultLevel } from "./SelectDifficultLevel";
import { SelectEducationLevel } from "./SelectEducationLevel";
import { SelectLanguage } from "./SelectLanguge";
import { SelectPenaltyPoint } from "./SelectPenatyPoint";
import { SelectPoint } from "./SelectPoint";
import { SelectSubSubject } from "./SelectSubSubject";
import { SelectSubject } from "./SelectSubject";
import { SelectType } from "./SelectType";
import { SwitchPenaltyAllow } from "./SwitchPenaltyAllow";
import { CreateQuestionProps } from "../Utils";

export function ModalSetting(props: CreateQuestionProps) {
    const { state, dispatch } = props;
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
                        <SelectType state={state} dispatch={dispatch} />
                        <SelectDifficultLevel
                            state={state}
                            dispatch={dispatch}
                        />
                        <SelectLanguage state={state} dispatch={dispatch} />
                        <SelectEducationLevel
                            state={state}
                            dispatch={dispatch}
                        />
                        <SelectSubject state={state} dispatch={dispatch} />
                        <SelectSubSubject state={state} dispatch={dispatch} />
                        <SelectPoint state={state} dispatch={dispatch} />
                        <SelectPenaltyPoint state={state} dispatch={dispatch} />
                    </div>

                    <DialogFooter>
                        <div className="flex justify-between w-full">
                            <SwitchPenaltyAllow
                                state={state}
                                dispatch={dispatch}
                            />
                            <Button>Đóng</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
