import { Role, User } from "@/InterfacesDatabase";
import { getOneByClerkId as getOneUserByClerkId } from "@/api/User";
import { getOneByClerkId as getOneRoleByClerkId } from "@/api/Role";
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
import { toast } from "react-toastify";

export function HeaderUserButton() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [openPopover, setOpenPopover] = useState(false);
    const clerk = useClerk();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                if (!user) return;
                const ClerkId = user.id;
                const result = await getOneUserByClerkId(ClerkId);
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setCurrentUser(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.log(error);
            }
        }
        fetchUser();
    }, [isSignedIn]);

    useEffect(() => {
        async function fetchRole() {
            try {
                if (!user) return;
                const ClerkId = user.id;
                const result = await getOneRoleByClerkId(ClerkId);
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setRole(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.log(error);
            }
        }
        fetchRole();
    }, [isSignedIn]);

    function handleLogOut() {
        setOpenPopover(false);
        clerk.signOut();
        setCurrentUser(null);
        setRole(null);
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
                <Link to="/dang-nhap">Đăng nhập</Link>
            </Button>
        );

    const isAdmin = role && role.Name == "Quản trị viên";
    const isModerator = role && role.Name == "Người kiểm duyệt";

    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src={currentUser?.ImageUrl} />
                    <AvatarFallback>...</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-5 w-fit flex flex-col gap-2 text-sm font-semibold">
                {isAdmin && (
                    <Link
                        className="w-full"
                        to="/trang-quan-tri"
                        onClick={() => setOpenPopover(false)}
                    >
                        Trang quản trị
                    </Link>
                )}
                {isModerator && (
                    <Link
                        className="w-full"
                        to="/trang-kiem-duyet"
                        onClick={() => setOpenPopover(false)}
                    >
                        Trang kiểm duyệt
                    </Link>
                )}
                <Link
                    className="w-full"
                    to="/trang-ca-nhan"
                    onClick={() => setOpenPopover(false)}
                >
                    Trang cá nhân
                </Link>
                <Link className="w-full" to="" onClick={handleLogOut}>
                    Đăng xuất
                </Link>
            </PopoverContent>
        </Popover>
    );
}
