import { BACKEND_URL, VITE_SERVER_PATH, getRandomWallpaper } from "@/Utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PlayDetail } from "../Utils";
import { useState, useEffect } from "react";

export function HeaderLeft(data: PlayDetail) {
    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    const [imageSrc, setImageSrc] = useState<string>(API_URL);

    useEffect(() => {
        if (data.Quiz.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + data.Quiz.ImageUrl);
        } else {
            setImageSrc(API_URL);
        }
    }, [data.Quiz.ImageUrl]);

    return (
        <div className="w-2/3">
            <Card className="min-h-full">
                <CardHeader>
                    <CardTitle>{data.Quiz.Name}</CardTitle>
                    <CardDescription>
                        {data.Quiz.Description || data.Quiz.Name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img
                        className="object-contain rounded-lg"
                        src={imageSrc}
                    ></img>
                </CardContent>
                <CardFooter className="flex gap-5 justify-between">
                    <Button className="w-full">Lịch sử chơi</Button>
                    <Button className="w-full">Chia sẻ</Button>
                    <Button className="w-full">Báo cáo</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
