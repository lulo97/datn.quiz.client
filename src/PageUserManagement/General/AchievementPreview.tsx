import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { AchievementCard } from "./AchievementCard";

export function AchievementPreview() {
    return (
        <Card>
            <CardHeader>
                <Label>Thành tựu</Label>
            </CardHeader>
            <CardContent className="flex">
                <div className="w-full justify-between flex">
                    <AchievementCard />
                    <AchievementCard />
                    <AchievementCard />
                    <AchievementCard />
                    <AchievementCard />
                    <AchievementCard />
                    <AchievementCard />
                </div>
                <div className="w-fit flex items-center">
                    <ChevronRight size={80} />
                </div>
            </CardContent>
        </Card>
    );
}
