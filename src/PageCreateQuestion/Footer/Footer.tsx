import { CreateQuestionData } from "@/Interfaces";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export function Footer(props: CreateQuestionData) {
    const { addAnswer } = props;
    return (
        <div className="flex flex-col justify-between w-full gap-5">
            <div>
                <Label>Giải thích</Label>
                <Textarea placeholder="Giải thích cho các đáp án đúng..."></Textarea>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-5">
                    <Button onClick={addAnswer}>Thêm Phương Án</Button>
                    <div className="flex items-center gap-1">
                        <Label>Giải thích</Label>
                        <Switch className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200" />
                    </div>
                </div>
                <Button>Xác nhận tạo</Button>
            </div>
        </div>
    );
}
