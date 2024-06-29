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
            <MenubarMenuCreate />
            <MenubarMenuSubject />
            <MenubarMenuExamSheet />
            <MenubarMenuRoom />
        </Menubar>
    );
}

function MenubarMenuCreate() {
    return (
        <MenubarMenu>
            <MenubarTrigger>Tạo</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    <Link className="w-full" to="/tao-cau-hoi">
                        Tạo câu hỏi
                    </Link>
                </MenubarItem>
                <MenubarItem>
                    <Link className="w-full" to="/tao-cau-hoi-chatgpt">
                        Tạo câu hỏi bằng AI
                    </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                    <Link className="w-full" to="/tao-de-thi">
                        Tạo đề
                    </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                    <Link className="w-full" to="/tao-phong">
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
                        <Link className="w-full" to={`/chu-de/${ele.UrlName}`}>
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
                    <Link className="w-full" to="/xuat-de-thi">
                        Xuất PDF
                    </Link>
                </MenubarItem>
                <MenubarItem>
                    <Link className="w-full" to="/quet-to-dap-an">
                        Chấm đề
                    </Link>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
}

function MenubarMenuRoom() {
    return (
        <MenubarMenu>
            <MenubarTrigger>Phòng thi</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    <Link className="w-full" to="/tao-phong">
                        Tạo phòng
                    </Link>
                </MenubarItem>
                <MenubarItem>
                    <Link className="w-full" to="/vao-phong">
                        Vào phòng
                    </Link>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
}
