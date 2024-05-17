import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserInformation } from "./UserInformation";
import { ModerationInformation } from "./ModerationInformation";
import { Permission } from "./Permission";

export function General() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="h-1/6">
                <div className="flex justify-between">
                    <CardTitle>Tổng quan</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="h-5/6 flex flex-col gap-3">
                <UserInformation />
                <div className="flex flex-row gap-5">
                    <ModerationInformation />
                    <Permission />
                </div>
            </CardContent>
        </Card>
    );
}
