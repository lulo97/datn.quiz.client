import { useEffect, useState } from "react";
import { MenuClickTarget, MenuItem } from "@/Interfaces";
import Navbar from "@/components/navbar/Navbar";
import CreatedQuiz from "./CreatedQuiz/CreatedQuiz";
import General from "./General/General";
import CreatedQuestion from "./CreatedQuestion/CreatedQuestion";
import Like from "./Interact/Like";
import Comment from "./Interact/Comment";
import Follow from "./Interact/Follow";
import Announcement from "./Interact/Announcement";
import RecycleBin from "./RecycleBin/RecycleBin";

export const menu_names: MenuItem[] = [
    { name: "Tổng quan", element: <General /> },
    { name: "Đề đã làm", element: <CreatedQuiz /> },
    { name: "Đề đã tạo", element: <General /> },
    { name: "Câu hỏi", element: <CreatedQuestion /> },
    { name: "Tương tác", child: [
        { name: "Lượt thích", element: <Like /> },
        { name: "Bình luận", element: <Comment /> },
        { name: "Theo dõi", element: <Follow /> },
        { name: "Thông báo", element: <Announcement /> },
    ] },
    { name: "Thùng rác", element: <RecycleBin /> },
];

// Recursive function to find an element by name
function findMenuItemByName(
    menu: MenuItem[],
    name: string
): MenuItem | null {
    for (const item of menu) {
        if (item.name === name) {
            return item;
        }
        if (item.child) {
            const found = findMenuItemByName(item.child, name);
            if (found) {
                return found;
            }
        }
    }
    return null; // Return null if not found
}

export default function UserManagement() {
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
            <Navbar menu_names={menu_names} handleMenubarClick={handleMenubarClick} />
            <div className="bg-gray-200 py-2 pr-2 w-full">
                {/*curMenuItem.element*/}
                <CreatedQuestion />
            </div>
        </div>
    );
}