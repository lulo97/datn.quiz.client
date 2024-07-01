import { Label } from "@/components/ui/label";
import { Award } from "lucide-react";

export function AchievementCard() {
    return (
        <div className="flex flex-col items-center border shadow rounded-lg w-fit p-1">
            <Award size={50} />
            <Label>Làm 100 đề</Label>
            <p className="text-xs text-gray-500">12/4/2024</p>
        </div>
    );
}
