import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@/components/ui/menubar";
import { Search } from "lucide-react";

export default function Header() {
    return (
        <Card className="py-2 px-4 flex items-center justify-between">
            <div className="text-xl font-bold">QuizQuest</div>

            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Tạo</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Tạo câu hỏi</MenubarItem>
                        <MenubarItem>Tạo câu hỏi bằng AI</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Tạo đề</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Tạo phòng</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Chủ đề</MenubarTrigger>
                    <MenubarContent className="grid grid-cols-3">
                        <MenubarItem>Toán</MenubarItem>
                        <MenubarItem>Văn</MenubarItem>
                        <MenubarItem>Anh</MenubarItem>
                        <MenubarItem>Lịch sử</MenubarItem>
                        <MenubarItem>Địa lý</MenubarItem>
                        <MenubarItem>Vật lí</MenubarItem>
                        <MenubarItem>Hóa học</MenubarItem>
                        <MenubarItem>Sinh học</MenubarItem>
                        <MenubarItem>Tin học</MenubarItem>
                        <MenubarItem>Giáo dục công dân</MenubarItem>
                        <MenubarItem>Giáo dục thể chất</MenubarItem>
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
