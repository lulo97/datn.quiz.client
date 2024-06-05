import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { MyMenubarItem } from "@/components/menubar_item/MyMenubarItem";
import { Link } from "react-router-dom";
import { smi } from "./Header";

export function HeaderMenubar() {
    return (
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
                        <Link className="w-full" to="/ExportPdf">Xuất PDF</Link>
                    </MyMenubarItem>
                    <MyMenubarItem>
                        <Link className="w-full" to="/ScanAnswerSheet">Chấm đề</Link>
                    </MyMenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
