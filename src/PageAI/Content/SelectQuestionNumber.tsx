import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AIProps } from "../Utils";

export function SelectQuestionNumber(props: AIProps) {
    const { state, setState } = props;
    return (
        <div>
            <Label>Số câu</Label>
            <Select
                onValueChange={(value) =>
                    setState({ ...state, NumberOfQuestion: parseInt(value) })
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Số câu..." />
                </SelectTrigger>
                <SelectContent className="overflow-y-auto max-h-[300px]">
                    <SelectItem value="1">1 câu</SelectItem>
                    <SelectItem value="2">2 câu</SelectItem>
                    <SelectItem value="3">3 câu</SelectItem>
                    <SelectItem value="4">4 câu</SelectItem>
                    <SelectItem value="5">5 câu</SelectItem>
                    <SelectItem value="6">6 câu</SelectItem>
                    <SelectItem value="7">7 câu</SelectItem>
                    <SelectItem value="8">8 câu</SelectItem>
                    <SelectItem value="9">9 câu</SelectItem>
                    <SelectItem value="10">10 câu</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
