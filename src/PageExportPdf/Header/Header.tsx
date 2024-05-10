import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Header() {
    return (
        <div>
            <div className="flex gap-1">
                <Input placeholder="Tìm kiếm..."></Input>
                <Button>
                    <Search />
                </Button>
            </div>
        </div>
    );
}
