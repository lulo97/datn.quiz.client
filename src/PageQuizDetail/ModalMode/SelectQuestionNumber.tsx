import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";

interface Props {
    setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
    TotalQuestionNumber: number;
}

export function SelectQuestionNumber(props: Props) {
    const { setQuestionNumber, TotalQuestionNumber } = props;
    const Total = Array.from({ length: TotalQuestionNumber }, (_, i) => i + 1);
    return (
        <div className="w-full">
            <Label>Số câu</Label>
            <Select
                onValueChange={(value) => setQuestionNumber(parseInt(value))}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Số câu" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Total.map((ele) => (
                            <SelectItem key={ele} value={ele.toString()}>
                                {ele}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
