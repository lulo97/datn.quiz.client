import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
            <CardContent className="h-full flex flex-col gap-3">
                <ModerationInformation />
                <Permission />
            </CardContent>
        </Card>
    );
}
