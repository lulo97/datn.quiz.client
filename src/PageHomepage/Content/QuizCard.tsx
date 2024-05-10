import { getRandomWallpaper } from "@/Utils";

export function QuizCard() {
    return (
        <div className=" w-1/6 h-24 flex flex-col items-center border shadow rounded-sm mt-0">
            <img
                className="object-contain h-3/4"
                src={getRandomWallpaper()}
            ></img>
            <div className="h-1/4">Đề toán 12</div>
        </div>
    );
}
