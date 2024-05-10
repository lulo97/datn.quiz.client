import { getRandomWallpaper } from "@/Utils";
import { Label } from "@/components/ui/label";

export default function QuizCardRank() {
    return (
        <div className="border shadow rounded-xl py-1 px-3">
            <Label>Đề toán 12 chương Hàm số</Label>
            <div className="flex gap-2 h-20">
                <img
                    className="object-contain rounded-xl"
                    src={getRandomWallpaper()}
                ></img>
                <ul className="flex flex-col justify-center items-start">
                    <li>
                        <Label>Lượt chơi: </Label> 1234
                    </li>
                    <li>
                        <Label>Đánh giá: </Label> 4.5/5
                    </li>
                    <li>
                        <Label>Người tạo: </Label> luongpysl
                    </li>
                </ul>
            </div>
        </div>
    );
}
