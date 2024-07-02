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
import { toast } from "react-toastify";
import { createOne } from "../API";

export function ModalSubmit(props: PlayTimeProps) {
    const { state } = props;
    const navigate = useNavigate();

    const { user } = useUser();

    async function CreatePlayByButton() {
        try {
            const ClerkId = user?.id || "";
            const currentUser = await getOneByClerkId(ClerkId);
            const data = getRecords(state, currentUser.UserId);
            if (!data) return;
            const result = await createOne(data);
            if (!result || "error" in result) {
                toast.error("Nộp bài thất bại!");
                console.log(result);
            } else {
                toast.success("Nộp bài thành công!");
                const SubmitPath = `/lam-de-tinh-gio-ket-qua/${data.PlayRecordInsert.PlayId}`;
                localStorage.clear();
                navigate(SubmitPath);
            }
        } catch (error) {
            console.error(error);
            toast.error("Nộp bài thất bại!");
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
