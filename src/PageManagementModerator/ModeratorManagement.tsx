import { MenuClickTarget, MenuItem } from "@/Interfaces";
import { findMenuItemByName } from "@/Utils";
import { Navbar } from "@/components/navbar/Navbar";
import { useState } from "react";
import { General } from "./General/General";
import { VertifyQuiz } from "./VertifyQuiz/VertifyQuiz";
import { ProcessReport } from "./ProcessReport/ProcessReport";

export const menu_names: MenuItem[] = [
    { name: "Tổng quan", element: <General /> },
    { name: "Báo cáo", element: <ProcessReport /> },
    { name: "Kiểm duyệt", element: <VertifyQuiz /> },
];

export function ModeratorManagement() {
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
            <div className="bg-gray-200 pl-2 w-full">{curMenuItem.element}</div>
        </div>
    );
}
