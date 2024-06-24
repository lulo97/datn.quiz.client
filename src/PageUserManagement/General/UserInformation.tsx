import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { getRandomAvatar } from "@/Utils";
import { User } from "@/InterfacesDatabase";

export function UserInformation(currentUser: User) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <Label>Thông tin cá nhân</Label>
                    <Button>Sửa</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-5 mb-3">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={currentUser.ImageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <ul>
                            <li>
                                <Label>Họ tên: </Label>{currentUser.Fullname}
                            </li>
                            <li>
                                <Label>Tên tài khoản: </Label>{currentUser.Username}
                            </li>
                            <li>
                                <Label>Email: </Label>
                                {currentUser.Email}
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Label>Giới thiệu:</Label> {currentUser.Biography? currentUser.Biography : "Hãy thêm giới thiệu!"}
                </div>
            </CardContent>
        </Card>
    );
}
