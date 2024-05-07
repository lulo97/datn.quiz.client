import General from "./General/General";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react";
import { Type } from "lucide-react";
import Achievement from "./Achivement/Achivement";
import Permission from "./Permission/Permission";
import Difficult from "./Question/Difficult";
import EducationLevel from "./Question/EducationLevel";
import Language from "./Question/Language";
import SubSubject from "./Question/SubSubject";
import Subject from "./Question/Subject";
import ReportReason from "./Report/ReportReason";
import ReportTarget from "./Report/ReportTarget";
import Role from "./Role/Role";
import { MenuClickTarget } from "./Navbar/NavbarMenu";

interface MenuItem {
    name: string;
    element?: JSX.Element | string;
    child?: MenuItem[];
}

export const menu_names: MenuItem[] = [
    { name: "Tổng quan", element: <General /> },
    {
        name: "Câu hỏi",
        child: [
            { name: "Trình độ", element: <EducationLevel /> },
            { name: "Chủ đề", element: <Subject /> },
            { name: "Chủ đề phụ", element: <SubSubject /> },
            { name: "Loại câu hỏi", element: <Type /> },
            { name: "Ngôn ngữ", element: <Language /> },
            { name: "Độ khó", element: <Difficult /> },
        ],
    },
    { name: "Thành tựu", element: <Achievement /> },
    {
        name: "Báo cáo",
        child: [
            { name: "Lý do", element: <ReportReason /> },
            { name: "Đối tượng", element: <ReportTarget /> },
        ],
    },
    { name: "Vai trò", element: <Role /> },
    { name: "Quyền", element: <Permission /> },
];

// Recursive function to find an element by name
function findElementByName(
    menu: typeof menu_names,
    name: string
): MenuItem | null {
    for (const item of menu) {
        if (item.name === name) {
            return item;
        }
        if (item.child) {
            const found = findElementByName(item.child, name);
            if (found) {
                return found;
            }
        }
    }
    return null; // Return null if not found
}

export default function AdminManagement() {
    const [curMenuItem, setCurMenuItem] = useState<MenuItem>(menu_names[0]);

    function handleMenubarClick(event: MenuClickTarget) {
        const menu_name = event.currentTarget.innerHTML;
        const found_menu_name = findElementByName(menu_names, menu_name);

        if (found_menu_name?.child) return;

        if (found_menu_name) {
            setCurMenuItem(found_menu_name);
        }
    }

    useEffect(
        function () {
            console.log(curMenuItem);
        },
        [curMenuItem]
    );

    return (
        <div className="flex bg-gray-200 h-screen">
            <Navbar handleMenubarClick={handleMenubarClick} />
            {/*curMenuItem.element*/}
            <div className="bg-gray-200 py-2 pr-2 w-full">
                <Difficult />
            </div>
        </div>
    );
}