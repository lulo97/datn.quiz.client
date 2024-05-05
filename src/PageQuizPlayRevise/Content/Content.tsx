import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Content() {
    return (
        <div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <Label>Câu 1: Con gì bơi nhanh nhất?</Label>
                    <div className="h-64 overflow-y-auto border rounded-sm p-2 mt-5 flex flex-col gap-3">
                        <Button className="bg-green-300" variant="outline">
                            Con cá
                        </Button>
                        <Button className="bg-green-300" variant="outline">
                            Con gà
                        </Button>
                        <Button variant="outline">Con chó</Button>
                        <Button variant="outline">Con chim</Button>
                        <Button className="bg-red-300" variant="outline">
                            Con thỏ
                        </Button>
                        <Button variant="outline">Con hổ</Button>
                        <Button variant="outline">Con lợn</Button>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                    <img
                        className="object-contain rounded-xl"
                        src="https://mcdn.wallpapersafari.com/medium/46/30/S7zpL2.png"
                    ></img>
                    <audio className="w-full" controls>
                        <source
                            src="https://www.w3schools.com/tags/horse.ogg"
                            type="audio/ogg"
                        />
                    </audio>
                </div>
            </div>
            <div>
                <Label>Lời giải thích</Label>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Rem voluptatum illum aperiam recusandae nostrum, placeat
                    possimus, quasi voluptatem optio quod perspiciatis aliquid
                    ducimus eius fugit earum deleniti tenetur quas cum.
                </p>
            </div>
        </div>
    );
}
