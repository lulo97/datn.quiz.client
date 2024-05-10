import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalSetting } from "../ModalSetting/ModalSetting";

export function Header() {
    return (
        <div className="flex flex-row justify-between gap-5">
            <div className="flex-grow">
                <Label>Tên đề</Label>
                <Input placeholder="Tên đề..."></Input>
            </div>
            <ModalSetting />
        </div>
    );
}
