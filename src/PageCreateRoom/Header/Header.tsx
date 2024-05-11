import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalSetting } from "../ModalSetting/ModalSetting";
import { ModalFindQuiz } from "@/PageExportPdf/ModalFindQuiz/ModalFindQuiz";
import { QuizCardDetail } from "@/components/quiz_card/QuizCardDetailed";

export function Header() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="w-2/3">
                    <Label>Tên phòng</Label>
                    <Input placeholder="Phòng ABC..." />
                </div>
                <div>
                    <div>
                        <Label>Thời gian bắt đầu: </Label>12:00:00 11/05/2024
                    </div>
                    <div>
                        <Label>Thời gian kết thúc: </Label>13:00:00 11/05/2024
                    </div>
                    <div>
                        <Label>Số người tối đa: </Label>10
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <Label>Đề thi</Label>
                    <ModalFindQuiz />
                </div>

                <QuizCardDetail />
            </div>
            <div className="flex justify-between items-center">
                <ModalSetting />
                <Button>Tạo phòng</Button>
            </div>
        </div>
    );
}
