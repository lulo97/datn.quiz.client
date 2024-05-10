import { getRandomWallpaper } from "@/Utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Content() {
    return (
        <div className="flex gap-5">
            <div className="w-1/2">
                <Label>Câu 1: Con gì bơi nhanh nhất?</Label>
                <div className="h-64 overflow-y-auto border rounded-sm p-2 mt-5 flex flex-col gap-3">
                    <Button variant="outline">Con cá</Button>
                    <Button variant="outline">Con gà</Button>
                    <Button variant="outline">Con chó</Button>
                    <Button variant="outline">Con chim</Button>
                    <Button variant="outline">Con thỏ</Button>
                    <Button variant="outline">Con hổ</Button>
                    <Button variant="outline">Con lợn</Button>
                </div>
            </div>
            <div className="w-1/2 flex flex-col gap-3">
                <img
                    className="object-contain rounded-xl"
                    src={getRandomWallpaper()}
                ></img>
                <audio className="w-full" controls>
                    <source
                        src="https://www.w3schools.com/tags/horse.ogg"
                        type="audio/ogg"
                    />
                </audio>
            </div>
        </div>
    );
}
