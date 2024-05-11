import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalFindQuiz } from "../ModalFindQuiz/ModalFindQuiz";

export function Header() {
    return (
        <div>
            <div className="flex gap-1">
                <Input placeholder="Tìm kiếm..."></Input>
                <Button>
                    <ModalFindQuiz />
                </Button>
            </div>
        </div>
    );
}
