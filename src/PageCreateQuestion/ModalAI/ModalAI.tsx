import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ChatGPT_SVG } from "@/PageCreateQuestion/ModalAI/ChatGPT_SVG";
import { Left } from "./Left";
import { Right } from "./Right";
import { Plus } from "lucide-react";
import { ModalSizeClass } from "@/Utils";

export function ModalAI() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-green-400">
                        <ChatGPT_SVG />
                    </Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Tạo câu hỏi bằng GPT 3.5</DialogTitle>
                        <DialogDescription>
                            Thêm văn bản vào và chọn số lượng câu hỏi, độ khó và
                            ngôn ngữ đầu ra của câu hỏi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between gap-2">
                        <Left />
                        <Right />
                    </div>
                    <DialogFooter>
                        <div className="w-full flex justify-between">
                            <Button className="bg-green-500">
                                <Plus />
                            </Button>
                            <Button>Đóng</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
