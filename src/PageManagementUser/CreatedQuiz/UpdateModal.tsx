import { ModelWidthClass } from "@/Utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { useState } from "react";
import { PenBox } from "lucide-react";
import { QuizDetail } from "@/PageRoomMonitor/Utils";
import { CreateQuiz } from "@/PageCreateQuiz/CreateQuiz";

interface UpdateModalProps {
    record: QuizDetail;
    fetchData: () => Promise<void>;
}

export function UpdateModal(props: UpdateModalProps) {
    const { record, fetchData } = props;
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <PenBox className="text-green-500 hover:text-green-600" />
                </DialogTrigger>
                <DialogContent
                    className={`${ModelWidthClass} bg-gray-200 overflow-y-auto max-h-[95%]`}
                >
                    <CreateQuiz
                        IsUpdate={true}
                        FetchDataAfterUpdate={fetchData}
                        DataFromUpdate={record}
                        IsInModal={true}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
