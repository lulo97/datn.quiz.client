import { getDummyImage } from "@/Utils";
import { Label } from "@/components/ui/label";

export function QuizCardCompact() {
    return (
        <div className="flex">
            <img
                className="w-1/2 p-1 object-contain rounded-lg"
                src={getDummyImage()}
            ></img>
            <div className="flex flex-col justify-between">
                <div className="font-bold text-sm">
                    Đề toán 12 chương Hàm số
                </div>
                <div className="text-gray-500">
                    <Label>Chủ đề: </Label>Toán học
                </div>
                <div className="text-[12.5px]">
                    Lượt chơi: 12 | ★★★★☆ | 12/06/2024
                </div>
            </div>
        </div>
    );
}
