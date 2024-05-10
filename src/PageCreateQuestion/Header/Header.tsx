import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateQuestionData } from "@/Interfaces";
import { ModalAI } from "@/PageCreateQuestion/ModalAI/ModalAI";
import { ModalSetting } from "@/PageCreateQuestion/ModalSetting/ModalSetting";
import { ModalMedia } from "@/PageCreateQuestion/ModalMedia/ModalMedia";
import { SelectType } from "../ModalSetting/SelectType";

export function Header(props: CreateQuestionData) {
    const { setQuestion } = props;
    return (
        <div className="flex gap-5 justify-between">
            <div className="w-3/4 flex gap-5 justify-between">
                <div className="w-3/4">
                    <Label htmlFor="content">Câu hỏi</Label>
                    <Input
                        type="text"
                        id="content"
                        placeholder="Nội dung câu hỏi..."
                        onChange={(event) => setQuestion(event.target.value)}
                    />
                </div>

                <SelectType />
            </div>

            <ModalMedia />
            <ModalSetting />
            <ModalAI />
        </div>
    );
}
