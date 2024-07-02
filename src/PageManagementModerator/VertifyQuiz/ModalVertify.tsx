import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import { updateOne } from "../API/VertifyQuiz";
import {
    CheckList,
    QuizForVertify,
    QuizVertifyUpdate,
    initialCheckList,
} from "./Utils";
import { User } from "@/InterfacesDatabase";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Props {
    currentUser: User;
    record: QuizForVertify;
    fetchDataQuizForVertify: () => Promise<void>;
}

export function ModalVertify(props: Props) {
    const { currentUser, fetchDataQuizForVertify, record } = props;
    const [open, setOpen] = useState(false);
    const [checkList, setCheckList] = useState<CheckList[]>(initialCheckList);

    useEffect(() => {
        if (!open) return;
        setCheckList(initialCheckList);
    }, [open]);

    async function handleVertify() {
        if (!currentUser) return;

        const allChecked = checkList.every((ele) => ele.Checked == true);
        if (!allChecked) {
            toast.error("Vui lòng kiểm tra tất cả các tiêu chí.");
            return;
        }

        const QVU_Record: QuizVertifyUpdate = {
            QuizInformationId: record.QuizInformationId,
            UserVertify: currentUser.UserId,
            VerifiedAt: Date.now(),
        };

        try {
            const result = await updateOne(QVU_Record);
            if (!result || "error" in result) {
                toast.error("Có lỗi");
                console.error(result);
            } else {
                if (!record.UserVertify) {
                    toast.success("Kiểm duyệt thành công!");
                } else {
                    toast.success("Cập nhật kiểm duyệt!");
                }
                setOpen(false);
                fetchDataQuizForVertify();
            }
        } catch (error) {
            toast.error("Có lỗi");
            console.error(error);
        }
    }

    const handleCheckboxChange = (Name: string) => {
        const newCheckList = checkList.map((ele) => {
            if (ele.Name == Name) {
                return { ...ele, Checked: !ele.Checked };
            }
            return ele;
        });
        setCheckList(newCheckList);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Eye className="text-yellow-500 hover:text-yellow-600" />
            </DialogTrigger>
            <DialogContent className="h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Bảng kiểm duyệt đề thi?</DialogTitle>
                    <DialogDescription>
                        Hãy kiểm tra chất lượng đề thi dựa trên các tiêu chí
                        sau.
                    </DialogDescription>
                    <div className="h-full flex flex-col justify-evenly">
                        {checkList.map((ele) => (
                            <div
                                key={ele.Name}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    onCheckedChange={() =>
                                        handleCheckboxChange(ele.Name)
                                    }
                                />
                                <div>{ele.Label}</div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleVertify}>
                            {!record.UserVertify ? "Kiểm duyệt" : "Cập nhật"}
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
