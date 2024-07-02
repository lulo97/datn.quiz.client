import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IModalReport } from "./ModalReport";

export function ModalReportContent(props: IModalReport) {
    const {
        reportReasons,
        setSelectReason,
        content,
        setContent,
    } = props;

    return (
        <div className="flex-1 flex justify-between">
            <div className="w-1/3">
                <div className="font-semibold text-sm">Lý do báo cáo</div>
                <RadioGroup
                    className="flex flex-col justify-evenly h-full"
                    defaultValue="option-violent"
                >
                    {reportReasons &&
                        reportReasons.map((ele) => (
                            <div
                                key={ele.ReportReasonId}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={ele.Name}
                                    onClick={() => setSelectReason(ele)}
                                />
                                <Label htmlFor="option-violent">
                                    {ele.Name}
                                </Label>
                            </div>
                        ))}
                </RadioGroup>
            </div>
            <div className="w-full flex flex-col gap-5">
                <div className="font-semibold text-sm">Nội dung báo cáo</div>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="h-full resize-none"
                />
            </div>
        </div>
    );
}
