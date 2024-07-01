import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getRandomAvatar } from "@/Utils";
import { PlayDetail, getTotalCorrectCount } from "../Utils";

export function HeaderRight(data: PlayDetail) {
    const count = getTotalCorrectCount(data);
    const StartT = new Date(data.StartTime);
    const SubmitT = new Date(data.SubmitTime);
    const TimeTaken = SubmitT.getTime() - StartT.getTime();
    return (
        <div className="w-1/3 flex flex-col gap-3">
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin chơi</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>
                            <Label>Số câu đúng: </Label>
                            {count}/{data.Quiz.Questions.length}
                        </li>
                        <li>
                            <Label>Số điểm: </Label>
                            {data.Score}
                        </li>
                        <li>
                            <Label>Thời gian: </Label>
                            {TimeTaken / 1000}/300s
                        </li>
                        <li>
                            <Label>Hạng 111 trên 120 người thi </Label>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Bảng xếp hạng</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-between">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hạng</TableHead>
                                <TableHead>Điểm</TableHead>
                                <TableHead>Người dùng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>1200</TableCell>
                                <TableCell>
                                    <Avatar className="border">
                                        <AvatarImage
                                            src={getRandomAvatar()}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell>
                                <TableCell>1000</TableCell>
                                <TableCell>
                                    <Avatar className="border">
                                        <AvatarImage
                                            src={getRandomAvatar()}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3</TableCell>
                                <TableCell>800</TableCell>
                                <TableCell>
                                    <Avatar className="border">
                                        <AvatarImage
                                            src={getRandomAvatar()}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button className="w-full" variant="link" size="sm">
                        Xem thêm
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
