import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";

const menu_names = [
    "Tổng quan",
    "Câu hỏi",
    "Thành tựu",
    "Báo cáo",
    "Vai trò",
    "Quyền",
];

export default function AdminManagement() {
    return (
        <div className="flex">
            <Menubar className="w-1/12 flex flex-col h-fit">
                {menu_names.map((menuName, index) => (
                    <MenubarMenu key={index}>
                        <MenubarTrigger>{menuName}</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>{menuName}</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                ))}
                <MenubarMenu>
                    <MenubarTrigger>Đăng xuất</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Đăng xuất</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <div className={`${CardParentClass} w-11/12`}>
                <Card>123</Card>
                <Card>
                    <CardHeader>
                        <Header />
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
