import { getRandomWallpaper } from "@/Utils";

export function QuizCardOverSimple() {
    return (
        <div className="w-48">
            <img
                className="object-contain rounded-lg"
                src={getRandomWallpaper()}
            ></img>
            <div className="font-bold text-sm">Đề toán 12 chương Hàm số</div>
        </div>
    );
}
