import { Button } from "@/components/ui/button";
import { ModalProcessPicture } from "../ModalProcessPicture/ModalProcessPicture";
import { PropsScanAnswerSheet } from "../Utils/Utils";

export function Header(props: PropsScanAnswerSheet) {
    return (
        <div className="w-full flex justify-between">
            <div className="flex justify-between gap-5">
                <ModalProcessPicture {...props} />
                <Button>Tải tệp</Button>
            </div>
            <Button>Xuất dữ liệu</Button>
        </div>
    );
}
