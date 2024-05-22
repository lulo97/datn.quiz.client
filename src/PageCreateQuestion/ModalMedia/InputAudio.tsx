import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionType, CreateQuestionProps } from "../Utils";
import { useRef } from "react";

export function InputAudio(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    const InputRef = useRef<HTMLInputElement>(null);
    function handleAudioChange(file: File | undefined) {
        dispatch({ type: ActionType.UploadAudio, payload: file });
    }
    function handleUrlAudioChange(url: string) {
        dispatch({ type: ActionType.UrlAudioChange, payload: url });
    }
    return (
        <div className="flex flex-col gap-1">
            <Label>Âm thanh</Label>
            <div
                className={`${
                    state.AudioUrl ? "pointer-events-none opacity-30" : ""
                } flex rounded-md border gap-2 items-center`}
            >
                <Button
                    onClick={() => {
                        if (InputRef.current) InputRef.current.click();
                    }}
                >
                    Chọn File
                </Button>
                <p className="line-clamp-1 w-full">
                    {state.AudioFile?.name || "Chưa chọn file"}
                </p>
            </div>
            <Input
                className="hidden"
                ref={InputRef}
                type="file"
                accept={"audio/*"}
                onChange={(e) => {
                    handleAudioChange(e.currentTarget.files?.[0]);
                }}
            />
            <Input
                value={state.AudioUrl ? state.AudioUrl : ""}
                placeholder="Đường dẫn file"
                onChange={(e) => handleUrlAudioChange(e.currentTarget.value)}
            />
        </div>
    );
}
