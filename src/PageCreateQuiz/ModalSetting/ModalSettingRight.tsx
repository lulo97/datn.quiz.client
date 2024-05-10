import { getRandomWallpaper } from "@/Utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModalSettingContentRight() {
    return (
        <div className="w-1/2">
            <Label>Ảnh bìa</Label>
            <img
                className="object-contain w-full"
                src={getRandomWallpaper()}
            ></img>
            <Input className="mt-1" type="file" />
        </div>
    );
}