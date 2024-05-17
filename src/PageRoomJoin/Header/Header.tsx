import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Header() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <Label>Nhập đường dẫn phòng</Label>
                <Input placeholder="https://www.example.com" />
            </div>
            <div>
                <Label>Nhập mật khẩu phòng</Label>
                <Input placeholder="Mật khẩu..." type="password" />
            </div>
            <Button>Vào phòng</Button>
        </div>
    );
}
