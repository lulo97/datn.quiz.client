import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import UserCardRank from "./UserCardRank";

export default function UserRankCollection() {
    return (
        <div className="w-1/2">
            <Card>
                <CardHeader>
                    <CardTitle>Xếp hạng người dùng</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <UserCardRank />
                    <UserCardRank />
                    <UserCardRank />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="link">Xem thêm</Button>
                </CardFooter>
            </Card>
        </div>
    );
}