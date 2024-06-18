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
import { PlayTimeProps, getRecords } from "../Utils";
import { Button } from "@/components/ui/button";
import { ModelWidthClass } from "@/Utils";
import { useNavigate } from "react-router-dom";
import { ModalSubmitAnswers } from "./ModalSubmitAnswers";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";
import { createOne as createOnePlay } from "../Api/Play";
import { createOne as createOneSelectedAnswer } from "../Api/SelectedAnswer";
import { toast } from "react-toastify";

export function ModalSubmit(props: PlayTimeProps) {
    const { state, dispatch } = props;
    const navigate = useNavigate();

    const { user } = useUser();

    async function CreatePlay() {
        try {
            const ClerkId = user?.id || "";
            const currentUser = await getOneByClerkId(ClerkId);
            const data = getRecords(currentUser.UserId);

            if (data != undefined) {
                const { pr, sa } = data;
                await createOnePlay(pr);
                for (const answer of sa) {
                    await createOneSelectedAnswer(answer);
                    const SubmitPath = `/QuizResultTime/${pr.PlayId}`;
                    localStorage.clear();
                    toast.success("Nộp bài thành công!");
                    navigate(SubmitPath);
                }
            }
        } catch (error) {
            console.error(error);
            toast.warning("Nộp bài thất bại!");
        }
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
                <ModalSubmitAnswers state={state} dispatch={dispatch} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="w-fit" onClick={CreatePlay}>
                            Xác nhận nộp
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
