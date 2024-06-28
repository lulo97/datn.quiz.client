import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ranking } from "../Utils";

export function Header(rankingData: Ranking) {
    return (
        <div className="flex flex-row justify-between gap-5">
            <div className="w-1/2">
                <Label>Tên phòng</Label>
                <Input defaultValue={rankingData.Room.Name} readOnly />
            </div>
            <div className="w-1/2">
                <Label>Tên đề</Label>
                <Input defaultValue={rankingData.Quiz.Name || ""} readOnly />
            </div>
        </div>
    );
}
