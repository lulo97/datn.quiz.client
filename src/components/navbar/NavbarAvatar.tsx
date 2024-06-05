import { User } from "@/InterfacesDatabase";
import { getRandomAvatar } from "@/Utils";
import { getOneByClerkId } from "@/api/User";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export function NavbarAvatar() {
    const { isSignedIn, user } = useUser();
    const [userImage, setUserImage] = useState<string>("")

    useEffect(() => {
        async function fetchData() {
            const ClerkId = user?.id || "";
            if (ClerkId != "") {
                const currentUser: User = await getOneByClerkId(ClerkId)
                setUserImage(currentUser.ImageUrl)
            }
        }
        fetchData();
    }, [isSignedIn])

    return (
        <div className="bg-white w-full h-fit border shadow rounded-lg flex justify-center py-2">
            <Avatar>
                <AvatarImage src={userImage != "" ? userImage : getRandomAvatar()} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    );
}
