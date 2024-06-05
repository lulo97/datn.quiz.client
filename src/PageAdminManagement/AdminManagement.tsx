import { General } from "./General/General";
import { useState } from "react";
import { Achievement } from "./Achivement/Achivement";
import { Permission } from "./Permission/Permission";
import { DifficultLevel } from "./DifficultLevel/DifficultLevel";
import { EducationLevel } from "./EducationLevel/EducationLevel";
import { Language } from "./Language/Language";
import { SubSubject } from "./SubSubject/SubSubject";
import { Subject } from "./Subject/Subject";
import { ReportReason } from "./ReportReason/ReportReason";
import { ReportTarget } from "./ReportTarget/ReportTarget";
import { Role } from "./Role/Role";
import { Type } from "./Type/Type";
import { MenuClickTarget, MenuItem } from "@/Interfaces";
import { Navbar } from "@/components/navbar/Navbar";
import { findMenuItemByName } from "@/Utils";
import { Point } from "./Point/Point";

export const menu_names: MenuItem[] = [
    { name: "Tổng quan", element: <General /> },
    {
        name: "Câu hỏi",
        child: [
            { name: "Trình độ học vấn", element: <EducationLevel /> },
            { name: "Chủ đề", element: <Subject /> },
            { name: "Chủ đề phụ", element: <SubSubject /> },
            { name: "Loại trắc nghiệm", element: <Type /> },
            { name: "Ngôn ngữ", element: <Language /> },
            { name: "Độ khó", element: <DifficultLevel /> },
            { name: "Điểm số", element: <Point /> },
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

    return (
        <div className="flex bg-gray-200 h-fit min-h-screen">
            <Navbar
                menu_names={menu_names}
                handleMenubarClick={handleMenubarClick}
            />
            <div className="bg-gray-200 pl-1 w-full">
                {curMenuItem.element}
            </div>
        </div>
    );
}
