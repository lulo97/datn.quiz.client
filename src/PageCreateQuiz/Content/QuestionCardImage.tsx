import { Label } from "@/components/ui/label";

export default function QuestionCardImage() {
    return (
        <div>
            <Label>Hình ảnh:</Label>
            <img
                className="object-contain"
                src="https://c4.wallpaperflare.com/wallpaper/198/347/689/fish-underwater-coral-reef-ecosystem-wallpaper-preview.jpg"
            ></img>
        </div>
    );
}