import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ModalReportContent() {
    return (
        <div className="flex flex-col gap-5 justify-start">
            <Label>Lý do báo cáo</Label>
            <RadioGroup defaultValue="option-violent">
                <div className="min-h-[100%] flex items-center space-x-2">
                    <RadioGroupItem
                        value="option-violent"
                        id="option-violent"
                    />
                    <Label htmlFor="option-violent">Nội dung bạo lực</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="option-hateful"
                        id="option-hateful"
                    />
                    <Label htmlFor="option-hateful">
                        Nội dung công kích thù ghét
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="option-harmful"
                        id="option-harmful"
                    />
                    <Label htmlFor="option-harmful">
                        Nội dung có thông tin nguy hiểm
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-spam" id="option-spam" />
                    <Label htmlFor="option-spam">Nội dung spam</Label>
                </div>
            </RadioGroup>
            <Label>Nội dung báo cáo</Label>
            <Textarea />
        </div>
    );
}
