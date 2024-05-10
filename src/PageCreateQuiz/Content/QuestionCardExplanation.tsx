import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function QuestionCardExplanation() {
    return (
        <div>
            <Label>Giải thích:</Label>
            <Textarea
                className="mt-1"
                defaultValue={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }
            ></Textarea>
        </div>
    );
}
