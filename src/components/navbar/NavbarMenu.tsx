import { NavbarProps } from "@/Interfaces";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

export function NavbarMenu(props: NavbarProps) {
    const { handleMenubarClick, menu_names } = props;
    return (
        <Menubar className="w-fit h-full flex flex-col justify-start gap-4 shadow">
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
                                <MenubarItem
                                    onClick={(event) =>
                                        handleMenubarClick(event)
                                    }
                                    key={child.name}
                                >
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
