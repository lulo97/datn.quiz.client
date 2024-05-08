import { CardParentClass } from "@/Utils";
import NavbarAvatar from "./NavbarAvatar";
import NavbarLogoutBtn from "./NavbarLogoutBtn";
import NavbarMenu from "./NavbarMenu";
import { NavbarProps } from "@/Interfaces";

export default function Navbar(props: NavbarProps) {
    const {handleMenubarClick, menu_names} = props
    return (
        <div
            className={`${CardParentClass} gap-2 min-h-[100%] flex flex-col justify-between items-center`}
        >
            <NavbarAvatar />
            <NavbarMenu menu_names={menu_names} handleMenubarClick={handleMenubarClick} />
            <NavbarLogoutBtn />
        </div>
    );
}
