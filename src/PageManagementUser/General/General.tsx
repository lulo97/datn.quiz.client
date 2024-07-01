import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserInformation } from "./UserInformation";
import { AchievementPreview } from "./AchievementPreview";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getOneByClerkId } from "@/api/User";
import { User } from "@/InterfacesDatabase";

export function General() {
    const { user } = useUser();
    const [currentUser, setCurrentUser] = useState<User>();
    useEffect(() => {
        async function fetchData() {
            const ClerkId = user?.id;
            if (ClerkId) {
                setCurrentUser(await getOneByClerkId(ClerkId));
            }
        }
        fetchData();
    }, []);
    if (!currentUser) return <div>Đang tải!</div>;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="h-1/6">
                <div className="flex justify-between">
                    <CardTitle>Tổng quan</CardTitle>
                    <Button>Thêm</Button>
                </div>
            </CardHeader>
            <CardContent className="h-5/6 flex flex-col gap-3">
                <UserInformation {...currentUser} />
                <AchievementPreview {...currentUser} />
            </CardContent>
        </Card>
    );
}
