import { SORT } from "@/Utils";
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
    setSort: React.Dispatch<React.SetStateAction<string>>;
}

export function SortEasyHard(props: Props) {
    const { setSort } = props;
    return (
        <div className="w-full">
            <Label>Lọc độ khó</Label>
            <Select onValueChange={value => setSort(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Mặc định" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={SORT.REVISE_DEFAULT}>Mặc định</SelectItem>
                        <SelectItem value={SORT.REVISE_EASY}>Dễ nhất trước</SelectItem>
                        <SelectItem value={SORT.REVISE_HARD}>
                            Khó nhất trước
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
