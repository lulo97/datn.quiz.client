import { ModelWidthClass } from "@/Utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { useState } from "react";
import { CreateQuestion } from "@/PageCreateQuestion/CreateQuestion";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { PenBox } from "lucide-react";

interface UpdateModalProps {
    record: QuestionDetail;
}

export function UpdateModal(props: UpdateModalProps) {
    const { record } = props;
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
                    <CreateQuestion
                        IsUpdate={true}
                        DataFromUpdate={record}
                        IsInModal={true}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
