import { ModalSizeClass } from "@/Utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { Body } from "./Body";
import { useEffect, useRef, useState } from "react";
import { Point } from "jspdf";
import { intialPoints } from "../Utils/Utils";

export interface PropsMPP {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    parentRef: React.MutableRefObject<HTMLImageElement  | null>;
    positions: Point[];
    setPositions: React.Dispatch<React.SetStateAction<Point[]>>;
    croppedImg: string;
    setCroppedImg: React.Dispatch<React.SetStateAction<string>>;
    imageRefFromFile: React.MutableRefObject<HTMLImageElement>;
}

export function ModalProcessPicture() {
    const [file, setFile] = useState<File | null>(null);
    const imageRefFromFile = useRef<HTMLImageElement>(new Image());
    const parentRef = useRef<HTMLImageElement | null>(null);
    const [croppedImg, setCroppedImg] = useState("");
    const [positions, setPositions] = useState<Point[]>(intialPoints);

    const props = {
        file: file,
        setFile: setFile,
        parentRef: parentRef,
        positions,
        setPositions,
        croppedImg,
        setCroppedImg,
        imageRefFromFile,
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Chụp ảnh</Button>
                </DialogTrigger>
                <DialogContent className={`${ModalSizeClass}`}>
                    <div>
                        <Header {...props} />
                        <Body {...props} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
