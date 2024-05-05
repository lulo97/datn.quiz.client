import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SelectQuestionNumber() {
    return (
        <div>
            <Label>Số câu</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Số câu" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3">3 câu</SelectItem>
                    <SelectItem value="5">5 câu</SelectItem>
                    <SelectItem value="10">10 câu</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
