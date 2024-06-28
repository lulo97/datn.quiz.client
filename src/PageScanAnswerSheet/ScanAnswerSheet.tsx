import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { useRef, useState } from "react";
import { Point, UserResponseDetail, intialPoints } from "./Utils/Utils";

export function ScanAnswerSheet() {
    const imageRefFromFile = useRef<HTMLImageElement>(new Image());
    const [parentRef, setParentRef] = useState<HTMLImageElement | null>(null);
    const canvasPolygonRef = useRef<HTMLCanvasElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [croppedImg, setCroppedImg] = useState("");
    const [positions, setPositions] = useState<Point[]>(intialPoints);
    const [userResponseDetail, setUserResponseDetail] =
        useState<UserResponseDetail | null>(null);

    const [dataASR, setDataASR] = useState<UserResponseDetail[]>([]);

    const props = {
        file: file,
        setFile: setFile,
        parentRef: parentRef,
        setParentRef: setParentRef,
        positions,
        setPositions,
        croppedImg,
        setCroppedImg,
        imageRefFromFile,
        userResponseDetail,
        setUserResponseDetail,
        canvasPolygonRef,
        dataASR,
        setDataASR,
    };

    return (
        <Card>
            <CardHeader>
                <Header {...props} />
            </CardHeader>
            <CardContent>
                <Content {...props} />
            </CardContent>
        </Card>
    );
}
