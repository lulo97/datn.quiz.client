import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserInformation from "./UserInformation";
import AchievementPreview from "./AchievementPreview";

export default function General() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="h-1/6">
                <div className="flex justify-between">
                    <CardTitle>Tổng quan</CardTitle>
                    <Button>Thêm</Button>
                </div>
            </CardHeader>
            <CardContent className="h-5/6 flex flex-col gap-3">
                <UserInformation />
                <AchievementPreview />
            </CardContent>
        </Card>
    );
}
