import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { menu_names } from "../AdminManagement";

export type MenuClickTarget = React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>

interface NavbarMenuProps {
    handleMenubarClick: (event: MenuClickTarget) => void
}

export default function NavbarMenu(props:
    NavbarMenuProps
) {
    const {handleMenubarClick} = props
    return (
        <Menubar className="w-fit h-full flex flex-col justify-start shadow">
            {menu_names.map((ele) => (
                <MenubarMenu key={ele.name}>
                    <MenubarTrigger
                        onClick={(event) => handleMenubarClick(event)}
                        className="w-full"
                    >
                        {ele.name}
                    </MenubarTrigger>
                    {ele.child && (
                        <MenubarContent alignOffset={400} sideOffset={-60}>
                            {ele.child.map((child) => (
                                <MenubarItem onClick={(event) => handleMenubarClick(event)} key={child.name}>
                                    {child.name}
                                </MenubarItem>
                            ))}
                        </MenubarContent>
                    )}
                </MenubarMenu>
            ))}
        </Menubar>
    );
}
