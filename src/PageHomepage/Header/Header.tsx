import { getObjectId } from "@/Utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
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

export default function Header() {
    return (
        <Card className="py-2 px-4 flex items-center justify-between">
            <div className="text-xl font-bold">QuizQuest</div>

            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Tạo</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <Link to="/CreateQuestion">Tạo câu hỏi</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link to="/CreateQuestion">
                                Tạo câu hỏi bằng AI
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link to="/CreateQuiz">Tạo đề</Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link to="/CreateRoom">Tạo phòng</Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Chủ đề</MenubarTrigger>
                    <MenubarContent className="grid grid-cols-3">
                        {smi.map((ele) => (
                            <MenubarItem key={ele.SubjectId}>
                                <a href={`/subject/${ele.UrlName}`}>
                                    {ele.Name}
                                </a>
                            </MenubarItem>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Xuất đề</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Xuất PDF</MenubarItem>
                        <MenubarItem>Chấm đề</MenubarItem>
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
