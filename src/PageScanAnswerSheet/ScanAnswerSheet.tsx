import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { useRef, useState } from "react";
import { Point, UserResponseDetail, intialPoints } from "./Utils/Utils";

export function ScanAnswerSheet() {

    const imageRefFromFile = useRef<HTMLImageElement>(new Image());
    const parentRef = useRef<HTMLImageElement | null>(null);
    const canvasPolygonRef = useRef<HTMLCanvasElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [croppedImg, setCroppedImg] = useState("");
    const [positions, setPositions] = useState<Point[]>(intialPoints);
    const [QuizId, setQuizId] = useState("");
    const [userResponseDetail, setUserResponseDetail] = useState<UserResponseDetail | null>(null);
    
    const props = {
        QuizId,
        setQuizId,
        file: file,
        setFile: setFile,
        parentRef: parentRef,
        positions,
        setPositions,
        croppedImg,
        setCroppedImg,
        imageRefFromFile,
        userResponseDetail,
        setUserResponseDetail,canvasPolygonRef
    };

    return (
        <Card>
            <CardHeader>
                <Header {...props} />
            </CardHeader>
            <CardContent>
                <Content />
            </CardContent>
        </Card>
    );
}
