import { getObjectId } from "@/Utils";
import { MyMenubarItem } from "@/components/menubar_item/MyMenubarItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const smi = [
    { SubjectId: getObjectId(), Name: "Toán", UrlName: "toan" },
    { SubjectId: getObjectId(), Name: "Văn", UrlName: "van" },
    { SubjectId: getObjectId(), Name: "Anh", UrlName: "anh" },
    { SubjectId: getObjectId(), Name: "Lịch sử", UrlName: "lich_su" },
    { SubjectId: getObjectId(), Name: "Địa lý", UrlName: "dia_ly" },
    { SubjectId: getObjectId(), Name: "Vật lí", UrlName: "vat_li" },
    { SubjectId: getObjectId(), Name: "Hóa học", UrlName: "hoa_hoc" },
    { SubjectId: getObjectId(), Name: "Sinh học", UrlName: "sinh_hoc" },
    { SubjectId: getObjectId(), Name: "Tin học", UrlName: "tin_hoc" },
    {
        SubjectId: getObjectId(),
        Name: "Giáo dục công dân",
        UrlName: "giao_duc_cong_dan",
    },
    {
        SubjectId: getObjectId(),
        Name: "Giáo dục thể chất",
        UrlName: "giao_duc_the_chat",
    },
];

export function Header() {
    return (
        <Card className="py-2 px-4 flex items-center justify-between">
            <div className="text-xl font-bold">QuizQuest</div>

            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Tạo</MenubarTrigger>
                    <MenubarContent>
                        <MyMenubarItem>
                            <Link className="w-full" to="/CreateQuestion">
                                Tạo câu hỏi
                            </Link>
                        </MyMenubarItem>
                        <MyMenubarItem>
                            <Link className="w-full" to="/CreateQuestion">
                                Tạo câu hỏi bằng AI
                            </Link>
                        </MyMenubarItem>
                        <MenubarSeparator />
                        <MyMenubarItem>
                            <Link className="w-full" to="/CreateQuiz">
                                Tạo đề
                            </Link>
                        </MyMenubarItem>
                        <MenubarSeparator />
                        <MyMenubarItem>
                            <Link className="w-full" to="/CreateRoom">
                                Tạo phòng
                            </Link>
                        </MyMenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Chủ đề</MenubarTrigger>
                    <MenubarContent className="grid grid-cols-3">
                        {smi.map((ele) => (
                            <MyMenubarItem key={ele.SubjectId}>
                                <Link
                                    className="w-full"
                                    to={`/subject/${ele.UrlName}`}
                                >
                                    {ele.Name}
                                </Link>
                            </MyMenubarItem>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Xuất đề</MenubarTrigger>
                    <MenubarContent>
                        <MyMenubarItem>
                            <Link to="#">Xuất PDF</Link>
                        </MyMenubarItem>
                        <MyMenubarItem>
                            <Link to="#">Chấm đề</Link>
                        </MyMenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <div className="flex gap-1">
                <Input placeholder="Tìm kiếm..."></Input>
                <Button>
                    <Search />
                </Button>
            </div>

            <div className="flex gap-1">
                <Button>Đăng ký</Button>
                <Button>Đăng nhập</Button>
            </div>
        </Card>
    );
}
