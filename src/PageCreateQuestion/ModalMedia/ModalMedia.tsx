import { ModalSizeClass } from "@/Utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { CreateQuestionProps } from "../Utils";
import { MyAudio } from "./MyAudio";
import { MyImage } from "./MyImage";
import { InputAudio } from "./InputAudio";
import { InputImage } from "./InputImage";

export function ModalMedia(props: CreateQuestionProps) {
    const { state, dispatch } = props;

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-400">
                        <Upload />
                    </Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Thêm phương tiện</DialogTitle>
                        <DialogDescription>
                            Thêm ảnh và âm thanh cho câu hỏi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2">
                        <MyImage state={state} dispatch={dispatch} />
                        <div className="w-1/3 flex flex-col justify-between">
                            <InputImage state={state} dispatch={dispatch} />
                            <InputAudio state={state} dispatch={dispatch} />
                            <MyAudio state={state} dispatch={dispatch} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
