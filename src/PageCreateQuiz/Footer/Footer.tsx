import { Button } from "@/components/ui/button";
import ModalAddQuestion from "../ModalAddQuestion/ModalAddQuestion";

export default function Footer() {
    return (
        <div className="w-full flex justify-between">
            <div className="flex gap-5">
                <Button>Tạo câu hỏi</Button>
                <ModalAddQuestion />
            </div>

            <Button>Tạo đề</Button>
        </div>
    );
}
