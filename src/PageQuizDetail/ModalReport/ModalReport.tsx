import { ModalSizeClass, REPORT_TARGET } from "@/Utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ModalReportContent } from "./ModalReportContent";
import { useEffect, useState } from "react";
import { ReportReason } from "@/InterfacesDatabase";
import { getAll } from "@/api/ReportReason";
import { toast } from "react-toastify";
import { QuizDetailProps } from "../QuizDetail";
import { createOne } from "@/api/Report";

export interface IModalReport {
    reportReasons: ReportReason[];
    setSelectReason: React.Dispatch<
        React.SetStateAction<ReportReason | undefined>
    >;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export function ModalReport(props: QuizDetailProps) {
    const { quiz, currentUser } = props;
    const [open, setOpen] = useState(false);
    const [reportReasons, setReportReason] = useState<ReportReason[]>([]);
    const [selectReason, setSelectReason] = useState<ReportReason>();
    const [content, setContent] = useState("");

    const child_props: IModalReport = {
        reportReasons,
        setSelectReason,
        content,
        setContent,
    };

    useEffect(() => {
        async function fetchReportReason() {
            try {
                const result = await getAll();
                if ("error" in result) {
                    toast.error("Có lỗi");
                    console.log(result);
                } else {
                    setReportReason(result);
                }
            } catch (error) {
                toast.error("Có lỗi");
                console.log(error);
            }
        }
        fetchReportReason();
    });

    async function handleSubmit() {
        if (!selectReason) {
            toast.warning("Lý do báo cáo rỗng!");
            return;
        }
        const record = {
            ReportReasonId: selectReason.ReportReasonId,
            ReportTarget: REPORT_TARGET.QUIZ,
            UserId: currentUser.UserId,
            ParentId: quiz.QuizId,
            Content: content,
        };
        try {
            const result = await createOne(record);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                toast.success("Báo cáo thành công!");
                setOpen(false);
                setSelectReason(undefined);
                setContent("");
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.log(error);
        }
    }

    return (
        <div className="w-1/3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">Báo cáo</Button>
                </DialogTrigger>
                <DialogContent
                    className={`${ModalSizeClass} flex flex-col justify-between`}
                >
                    <DialogHeader>
                        <DialogTitle>Báo cáo đề</DialogTitle>
                    </DialogHeader>
                    <ModalReportContent {...child_props} />
                    <DialogFooter>
                        <Button onClick={handleSubmit}>Gửi báo cáo</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
