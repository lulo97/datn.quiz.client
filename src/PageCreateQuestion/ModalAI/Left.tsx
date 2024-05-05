import { Card, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SelectQuestionNumber } from "./SelectQuestionNumber";
import SelectDifficult from "../ModalSetting/SelectDifficult";
import SelectLanguage from "../ModalSetting/SelectLanguge";

export function Left() {
    return (
        <div className="w-1/2">
            <Card>
                <CardHeader className="h-[350px]">
                    <Label htmlFor="content">Văn bản</Label>
                    <Textarea
                        className="resize-none min-h-[200px]"
                        id="content"
                        placeholder="Văn bản..."
                    />

                    <div className="flex justify-evenly gap-1">
                        <div className="flex-grow">
                            <SelectQuestionNumber />
                        </div>
                        <div className="flex-grow">
                            <SelectDifficult />
                        </div>
                        <div className="flex-grow">
                            <SelectLanguage />
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
