import { AnswerProps } from "@/Interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

export default function Answer(props: AnswerProps) {
    const { answer, deleteAnswer, updateAnswerContent, updateAnswerCorrect } = props;
    return (
        <div className="flex gap-5 justify-between items-center">
            <Switch 
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
                onClick={() => updateAnswerCorrect(answer.id)}
            />
            <Input
                type="text"
                id="option"
                placeholder={answer.id}
                value={answer.content}
                onChange={(event) => updateAnswerContent(answer.id, event.target.value)}
            />
            <Button
                onClick={() => deleteAnswer(answer.id)}
                className="bg-red-500"
            >
                <X />
            </Button>
        </div>
    );
}