import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateQuizProps } from "../Utils";
import { useRef } from "react";
import { ActionType } from "../Action";

export function InputImage(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const InputRef = useRef<HTMLInputElement>(null);
    function handleImageChange(file: File | undefined) {
        dispatch({ type: ActionType.ChangeImageFile, payload: file });
    }
    function handleChangeImageUrl(url: string) {
        dispatch({ type: ActionType.ChangeImageUrl, payload: url });
    }
    return (
        <div className="flex flex-col gap-1">
            <div
                className={`${
                    state.ImageUrl ? "pointer-events-none opacity-30" : ""
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
                    {state.ImageFile?.name || "Chưa chọn file"}
                </p>
            </div>
            <Input
                className="hidden"
                ref={InputRef}
                type="file"
                accept={"Image/*"}
                onChange={(e) => {
                    handleImageChange(e.currentTarget.files?.[0]);
                }}
            />
            <Input
                value={state.ImageUrl ? state.ImageUrl : ""}
                placeholder="Đường dẫn file"
                onChange={(e) => handleChangeImageUrl(e.currentTarget.value)}
            />
        </div>
    );
}
