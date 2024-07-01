import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { UserCardRank } from "./UserCardRank";

export function UserRankCollection() {
    return (
        <Card className="w-1/2 flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Xếp hạng người dùng</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <UserCardRank />
                <UserCardRank />
                <UserCardRank />
                <UserCardRank />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="link">Xem thêm</Button>
            </CardFooter>
        </Card>
    );
}
