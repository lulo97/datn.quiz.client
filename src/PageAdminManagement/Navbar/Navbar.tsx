import { CardParentClass } from "@/Utils";
import NavbarAvatar from "./NavbarAvatar";
import NavbarLogoutBtn from "./NavbarLogoutBtn";
import NavbarMenu, { MenuClickTarget } from "./NavbarMenu";

interface NavbarProps {
    handleMenubarClick: (event: MenuClickTarget) => void
}

export default function Navbar(props: NavbarProps) {
    const {handleMenubarClick} = props
    return (
        <div
            className={`${CardParentClass} gap-2 min-h-[100%] flex flex-col justify-between items-center`}
        >
            <NavbarAvatar />
            <NavbarMenu handleMenubarClick={handleMenubarClick} />
            <NavbarLogoutBtn />
        </div>
    );
}
