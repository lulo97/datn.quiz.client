import { useState } from "react";
import { MenuClickTarget, MenuItem } from "@/Interfaces";
import { Navbar } from "@/components/navbar/Navbar";
import { CreatedQuiz } from "./CreatedQuiz/CreatedQuiz";
import { General } from "./General/General";
import { CreatedQuestion } from "./CreatedQuestion/CreatedQuestion";
import { Like } from "./Interact/Like";
import { Comment } from "./Interact/Comment";
import { Followee } from "./Follow/Followee";
import { RecycleBin } from "./RecycleBin/RecycleBin";
import { Notification } from "./Interact/Notification";
import { Follower } from "./Follow/Follower";
import { Rating } from "./Interact/Rating";
import { PlayedQuiz } from "./PlayedQuiz/PlayedQuiz";
import { findMenuItemByName } from "@/Utils";

export const menu_names: MenuItem[] = [
    { name: "Tổng quan", element: <General /> },
    { name: "Đề đã thi", element: <PlayedQuiz /> },
    { name: "Đề đã tạo", element: <CreatedQuiz /> },
    { name: "Câu hỏi", element: <CreatedQuestion /> },
    {
        name: "Tương tác",
        child: [
            { name: "Lượt thích", element: <Like /> },
            { name: "Bình luận", element: <Comment /> },
            { name: "Thông báo", element: <Notification /> },
            { name: "Đánh giá", element: <Rating /> },
        ],
    },
    {
        name: "Theo dõi",
        child: [
            { name: "Người bạn theo dõi", element: <Followee /> },
            { name: "Người theo dõi bạn", element: <Follower /> },
        ],
    },
    { name: "Thùng rác", element: <RecycleBin /> },
];

export function UserManagement() {
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
            <div className="bg-gray-200 pl-2 w-full">
                {curMenuItem.element}
            </div>
        </div>
    );
}
