import { ModalSizeClass, getRandomWallpaper } from "@/Utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function ModalMedia() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-400">
                        <Upload />
                    </Button>
                </DialogTrigger>
                <DialogContent className={ModalSizeClass}>
                    <DialogHeader>
                        <DialogTitle>Thêm phương tiện</DialogTitle>
                        <DialogDescription>
                            Thêm ảnh và âm thanh cho câu hỏi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2">
                        <div className="border rounded-lg w-2/3 flex justify-center">
                            <img className="object-contain h-[350px]" src={getRandomWallpaper()}></img>
                        </div>

                        <div className="w-1/3 flex flex-col gap-3">
                            <Label htmlFor="picture">Ảnh</Label>
                            <Input id="picture" type="file" />

                            <Label htmlFor="audio">Âm thanh</Label>
                            <Input id="audio" type="file" />

                            <audio className="w-full" controls>
                                <source
                                    src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
                                    type="audio/ogg"
                                ></source>
                            </audio>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
