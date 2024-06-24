import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarSeparator,
    MenubarItem,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";
import { smi } from "./Header";

export function HeaderMenubar() {
    return (
        <Menubar>
            {/* <MenubarMenuCreate /> */}
            <MenubarMenu>
                <MenubarTrigger>Tạo</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link className="w-full" to="/CreateQuestion">
                            Tạo câu hỏi
                        </Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link className="w-full" to="/AI">
                            Tạo câu hỏi bằng AI
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <Link className="w-full" to="/CreateQuiz">
                            Tạo đề
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <Link className="w-full" to="/CreateRoom">
                            Tạo phòng
                        </Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenuSubject />
            <MenubarMenuExamSheet />
        </Menubar>
    );
}

function MenubarMenuCreate() {
    return (
        <MenubarMenu>
            <MenubarTrigger>Tạo</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    <Link className="w-full" to="/CreateQuestion">
                        Tạo câu hỏi
                    </Link>
                </MenubarItem>
                <MenubarItem>
                    <Link className="w-full" to="/AI">
                        Tạo câu hỏi bằng AI
                    </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                    <Link className="w-full" to="/CreateQuiz">
                        Tạo đề
                    </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                    <Link className="w-full" to="/CreateRoom">
                        Tạo phòng
                    </Link>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
}

function MenubarMenuSubject() {
    return (
        <MenubarMenu>
            <MenubarTrigger>Chủ đề</MenubarTrigger>
            <MenubarContent className="grid grid-cols-3">
                {smi.map((ele) => (
                    <MenubarItem key={ele.SubjectId}>
                        <Link className="w-full" to={`/subject/${ele.UrlName}`}>
                            {ele.Name}
                        </Link>
                    </MenubarItem>
                ))}
            </MenubarContent>{" "}
        </MenubarMenu>
    );
}

function MenubarMenuExamSheet() {
    return (
        <MenubarMenu>
            <MenubarTrigger>Xuất đề</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    <Link className="w-full" to="/ExportPdf">
                        Xuất PDF
                    </Link>
                </MenubarItem>
                <MenubarItem>
                    <Link className="w-full" to="/ScanAnswerSheet">
                        Chấm đề
                    </Link>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
}
