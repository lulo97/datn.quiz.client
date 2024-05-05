import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModalSettingContentRight() {
    return (
        <div className="w-1/2">
            <Label>Ảnh bìa</Label>
            <img
                className="object-contain w-full"
                src="https://c4.wallpaperflare.com/wallpaper/198/347/689/fish-underwater-coral-reef-ecosystem-wallpaper-preview.jpg"
            ></img>
            <Input className="mt-1" type="file" />
        </div>
    );
}