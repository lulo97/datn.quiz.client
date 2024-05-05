import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuestionCardContent() {
    return (
        <div>
            <Label>Câu 1:</Label>
            <Input defaultValue={"Động vật nào bơi nhanh nhất?"}></Input>
        </div>
    );
}