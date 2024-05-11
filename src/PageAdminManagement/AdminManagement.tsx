import { General } from "./General/General";
import { useEffect, useState } from "react";
import { Achievement } from "./Achivement/Achivement";
import { Permission } from "./Permission/Permission";
import { Difficult } from "./Question/Difficult";
import { EducationLevel } from "./Question/EducationLevel";
import { Language } from "./Question/Language";
import { SubSubject } from "./Question/SubSubject";
import { Subject } from "./Question/Subject";
import { ReportReason } from "./Report/ReportReason";
import { ReportTarget } from "./Report/ReportTarget";
import { Role } from "./Role/Role";
import { Type } from "./Question/Type";
import { MenuClickTarget, MenuItem } from "@/Interfaces";
import { Navbar } from "@/components/navbar/Navbar";
import { findMenuItemByName } from "@/Utils";

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

export function AdminManagement() {
    const [curMenuItem, setCurMenuItem] = useState<MenuItem>(menu_names[0]);

    function handleMenubarClick(event: MenuClickTarget) {
        const menu_name = event.currentTarget.innerHTML;
        const found_menu_name = findMenuItemByName(menu_names, menu_name);

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
        <div className="flex bg-gray-200 h-fit min-h-screen">
            <Navbar
                menu_names={menu_names}
                handleMenubarClick={handleMenubarClick}
            />
            <div className="bg-gray-200 py-2 pr-2 w-full">
                {curMenuItem.element}
            </div>
        </div>
    );
}
