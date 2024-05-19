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
import { ActionType, CreateQuestionProps } from "../Utils";

export function ModalMedia(props: CreateQuestionProps) {
    const { state, dispatch } = props;

    function handleUploadImage(file: File | undefined) {
        dispatch({ type: ActionType.UploadImage, payload: file });
    }
    function handleUrlImageChange(url: string) {
        dispatch({ type: ActionType.UrlImageChange, payload: url });
    }
    function handleUploadAudio(file: File | undefined) {
        dispatch({ type: ActionType.UploadAudio, payload: file });
    }
    function handleUrlAudioChange(url: string) {
        dispatch({ type: ActionType.UrlAudioChange, payload: url });
    }

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
                            <img
                                className="object-contain h-[350px]"
                                src={getRandomWallpaper()}
                            ></img>
                        </div>

                        <div className="w-1/3 flex flex-col gap-3">
                            <Label>Ảnh</Label>
                            <Input
                                type="file"
                                onChange={(e) =>
                                    handleUploadImage(
                                        e.currentTarget.files?.[0]
                                    )
                                }
                            />
                            <Input
                                placeholder="Đường dẫn ảnh..."
                                onChange={(e) =>
                                    handleUrlImageChange(e.currentTarget.value)
                                }
                            />

                            <Label>Âm thanh</Label>
                            <Input
                                type="file"
                                onChange={(e) =>
                                    handleUploadAudio(
                                        e.currentTarget.files?.[0]
                                    )
                                }
                            />
                            <Input
                                placeholder="Đường dẫn âm thanh..."
                                onChange={(e) =>
                                    handleUrlAudioChange(e.currentTarget.value)
                                }
                            />

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
