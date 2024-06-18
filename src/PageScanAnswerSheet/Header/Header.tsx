import { Button } from "@/components/ui/button";
import { ModalProcessPicture } from "../ModalProcessPicture/ModalProcessPicture";

export function Header() {
    return (
        <div className="w-full flex justify-between">
            <div className="flex justify-between gap-5">
                <ModalProcessPicture />
                <Button>Tải tệp</Button>
            </div>
            <Button>Xuất dữ liệu</Button>
        </div>
    );
}
