import { BACKEND_URL } from "@/Utils";
import { CreateQuestionProps } from "../Utils";
import { useState, useEffect } from "react";

export function MyImage(props: CreateQuestionProps) {
    const { state } = props;
    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    const [imageSrc, setImageSrc] = useState<string>(API_URL);

    useEffect(() => {
        if (state.ImageFile) {
            const objectUrl = URL.createObjectURL(state.ImageFile);
            setImageSrc(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImageSrc(API_URL);
        }
    }, [state.ImageFile]);

    return (
        <div className="border rounded-lg w-2/3 flex justify-center">
            <img className="object-contain h-[350px]" src={imageSrc}></img>
        </div>
    );
}
