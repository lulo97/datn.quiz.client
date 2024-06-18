import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropsMPP } from "./ModalProcessPicture";
import { wrapImageByPoints } from "../Utils/wrapImageByPoints";
import { Point } from "../Utils/Utils";

export const inverseCalculateScaledPoints = (
    points: Point[],
    image: HTMLImageElement,
    parentCurrent: HTMLImageElement
) => {
    const { offsetWidth: width, offsetHeight: height } = parentCurrent;

    const scaleX = image.width / width;
    //console.log("Scale X:", scaleX);

    const scaleY = image.height / height;
    //console.log("Scale Y:", scaleY);

    const scaledPoints = points.map((point) => {
        //console.log("Original point:", point);
        const scaledPoint = {
            x: Math.round(point.x / scaleX),
            y: Math.round(point.y / scaleY),
        };
        return scaledPoint;
    });
    return [scaledPoints[0], scaledPoints[1], scaledPoints[3], scaledPoints[2]];
};

export const calculateScaledPoints = (
    points: Point[],
    image: HTMLImageElement,
    parentCurrent: HTMLImageElement
) => {
    const { offsetWidth: width, offsetHeight: height } = parentCurrent;

    const scaleX = image.width / width;
    //console.log("Scale X:", scaleX);

    const scaleY = image.height / height;
    //console.log("Scale Y:", scaleY);

    const scaledPoints = points.map((point) => {
        //console.log("Original point:", point);
        const scaledPoint = {
            x: point.x * scaleX,
            y: point.y * scaleY,
        };
        //console.log("Scaled point:", scaledPoint);
        return scaledPoint;
    });
    return scaledPoints;
};

export function Header(props: PropsMPP) {
    const {
        file,
        setFile,
        parentRef,
        positions,
        setCroppedImg,
        imageRefFromFile,
    } = props;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
            const reader = new FileReader();
            reader.onload = function (e) {
                imageRefFromFile.current.src = reader.result as string;
            };
            reader.readAsDataURL(files[0]);
        }
    }

    function handleProcessImage() {
        if (!parentRef.current) return;
        const scaled_points = calculateScaledPoints(
            positions,
            imageRefFromFile.current,
            parentRef.current
        );
        wrapImageByPoints(
            imageRefFromFile.current,
            scaled_points.map((ele) => [ele.x, ele.y])
        ).then((dataUrl) => {
            setCroppedImg(dataUrl);
        });
    }

    return (
        <div className="flex justify-between h-fit">
            <div className="flex gap-5">
                <Button>Chụp</Button>
                <Input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleChange(e)}
                />
                <Button onClick={handleProcessImage}>Xử lý ảnh</Button>
            </div>
        </div>
    );
}
