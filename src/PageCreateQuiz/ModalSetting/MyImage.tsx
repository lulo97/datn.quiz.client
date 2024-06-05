import { BACKEND_URL } from "@/Utils";
import { CreateQuizProps } from "../Utils";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

export function MyImage(props: CreateQuizProps) {
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
        <div className="border rounded-lg flex justify-center">
            <img className="object-contain h-[250px]" src={imageSrc}></img>
        </div>
    );
}
