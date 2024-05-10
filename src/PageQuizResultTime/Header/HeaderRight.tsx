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

export default function HeaderRight() {
    return (
        <div className="w-1/3 flex flex-col gap-3">
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin chơi</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>
                            <Label>Số câu đúng: </Label>8/10
                        </li>
                        <li>
                            <Label>Số điểm: </Label>1200
                        </li>
                        <li>
                            <Label>Thời gian: </Label>270/300s
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bảng xếp hạng</CardTitle>
                </CardHeader>
                <CardContent>
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
