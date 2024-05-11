import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { getRandomAvatar } from "@/Utils";

export function UserInformation() {
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
                        <AvatarImage src={getRandomAvatar()} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <ul>
                            <li>
                                <Label>Họ tên: </Label>Hoàng Lê Lương
                            </li>
                            <li>
                                <Label>Tên tài khoản: </Label>luongpysl
                            </li>
                            <li>
                                <Label>Email: </Label>
                                luongpysl@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Label>Giới thiệu:</Label> Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Autem quo consectetur mollitia
                    magni? Odit tenetur numquam porro tempore ipsum adipisci
                    praesentium, aspernatur sequi, error labore eaque?
                    Temporibus quisquam ad veritatis.
                </div>
            </CardContent>
        </Card>
    );
}
