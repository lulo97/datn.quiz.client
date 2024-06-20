import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { useRef, useState } from "react";
import { Point, UserResponseDetail, intialPoints } from "./Utils/Utils";
import { mock_data } from "./Content/ASRTable";

export function ScanAnswerSheet() {
    const imageRefFromFile = useRef<HTMLImageElement>(new Image());
    //const parentRef = useRef<HTMLImageElement | null>(null);
    const [parentRef, setParentRef] = useState<HTMLImageElement | null>(null);
    const canvasPolygonRef = useRef<HTMLCanvasElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [croppedImg, setCroppedImg] = useState("");
    const [positions, setPositions] = useState<Point[]>(intialPoints);
    const [userResponseDetail, setUserResponseDetail] =
        useState<UserResponseDetail | null>(null);

    const [dataASR, setDataASR] = useState<UserResponseDetail[]>([
        // mock_data,
        // mock_data,
        // mock_data,
        // mock_data,
        // mock_data,
    ]);

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
