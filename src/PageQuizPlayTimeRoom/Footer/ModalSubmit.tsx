import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { QuizPlayTimeRoomProps } from "../Utils";
import { Button } from "@/components/ui/button";
import { ModelWidthClass } from "@/Utils";
import { useNavigate } from "react-router-dom";
import { ModalSubmitAnswers } from "./ModalSubmitAnswers";
import { useUser } from "@clerk/clerk-react";

export function ModalSubmit(props: QuizPlayTimeRoomProps) {
    const { state, setState, quiz } = props;
    const { user } = useUser();

    async function CreatePlayByButton() {
        setState({
            ...state,
            EndTimePlay: Date.now(),
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Nộp bài</Button>
            </DialogTrigger>
            <DialogContent
                className={`${ModelWidthClass} max-h-[90%] overflow-y-auto`}
            >
                <DialogHeader>
                    <DialogTitle>Bạn có xác nhận nộp bài không?</DialogTitle>
                    <DialogDescription>
                        Hãy kiểm tra lại các lựa chọn và không bỏ lỡ câu hỏi
                        nào, các câu hỏi không trả lời sẽ tính là sai!
                    </DialogDescription>
                </DialogHeader>
                <ModalSubmitAnswers {...props} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="w-fit" onClick={CreatePlayByButton}>
                            Xác nhận nộp
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
