import { getRandomWallpaper } from "@/Utils";
import { Label } from "@/components/ui/label";

export function QuestionCardImage() {
    return (
        <div>
            <Label>Hình ảnh:</Label>
            <img className="object-contain" src={getRandomWallpaper()}></img>
        </div>
    );
}
