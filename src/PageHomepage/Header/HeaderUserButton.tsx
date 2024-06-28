import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeaderUserButton() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [openPopover, setOpenPopover] = useState(false);
    const clerk = useClerk();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const ClerkId = user?.id || "";
            if (ClerkId != "") {
                setCurrentUser(await getOneByClerkId(ClerkId));
            }
        }
        fetchUser();
    }, [isSignedIn]);

    function handleLogOut() {
        setOpenPopover(false);
        clerk.signOut();
        setCurrentUser(null);
    }

    if (!isLoaded)
        return (
            <div>
                <Avatar>
                    <AvatarFallback>...</AvatarFallback>
                </Avatar>
            </div>
        );

    if (!isSignedIn)
        return (
            <Button>
                <Link to="/sign-in">Đăng nhập</Link>
            </Button>
        );

    const isAdmin =
        currentUser && currentUser.Username.toLowerCase() == "admin";

    return (
        <div>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarImage src={currentUser?.ImageUrl} />
                        <AvatarFallback>...</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mr-5 w-fit flex flex-col gap-2 text-sm font-semibold">
                    {" "}
                    {isAdmin && (
                        <Link
                            className="w-full"
                            to="/AdminManagement"
                            onClick={() => setOpenPopover(false)}
                        >
                            Trang quản trị
                        </Link>
                    )}
                    <Link
                        className="w-full"
                        to="/UserManagement"
                        onClick={() => setOpenPopover(false)}
                    >
                        Trang cá nhân
                    </Link>
                    <Link className="w-full" to="" onClick={handleLogOut}>
                        Đăng xuất
                    </Link>
                </PopoverContent>
            </Popover>
        </div>
    );
}
