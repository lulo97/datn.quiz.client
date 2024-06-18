import { BACKEND_URL } from "@/Utils";
import { PropsMPP } from "./ModalProcessPicture";
import Draggable, { DraggableData } from "react-draggable";
import { useRef, createRef, useEffect, useState } from "react";
import { Point, intialPoints } from "../Utils/Utils";
import { detectPoint } from "../Utils/detectPoint";
import { calculateScaledPoints, inverseCalculateScaledPoints } from "./Header";
const DummyImage = BACKEND_URL + "public/Image/DummyImage.png";

type SetPositionsFunction = React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[]>
>;

export const handleDrag =
    (idx: number, setPositions: SetPositionsFunction) =>
    (e: any, data: DraggableData) => {
        setPositions((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions[idx] = { x: data.x, y: data.y };
            return newPositions;
        });
    };

export const drawPolygon = (
    ctx: CanvasRenderingContext2D,
    positions: Point[],
    width: number,
    height: number
) => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);
    ctx.lineTo(positions[1].x, positions[1].y);
    ctx.lineTo(positions[3].x, positions[3].y);
    ctx.lineTo(positions[2].x, positions[2].y);
    ctx.fillStyle = "green";
    ctx.fill();
};

export function Body(props: PropsMPP) {
    const {
        file,
        parentRef,
        positions,
        setPositions,
        croppedImg,
        imageRefFromFile,
    } = props;
    const nodeRefs = useRef(positions.map(() => createRef<HTMLDivElement>()));
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function drawPolygonByPositions() {
        const ctx = canvasRef.current?.getContext("2d");
        if (canvasRef.current && ctx) {
            drawPolygon(
                ctx,
                positions,
                canvasRef.current.width,
                canvasRef.current.height
            );
        }
    }

    useEffect(() => {
        drawPolygonByPositions();
    }, [positions]);

    function initalPointByParent() {
        if (parentRef.current) {
            // const { offsetWidth: width, offsetHeight: height } =
            //     parentRef.current;
            // setPositions([
            //     { x: 0, y: 0 },
            //     { x: width, y: 0 },
            //     { x: 0, y: height },
            //     { x: width, y: height },
            // ]);
            detectPoint(imageRefFromFile.current).then((points) => {
                if (!parentRef.current) return;
                const detected_point = inverseCalculateScaledPoints(
                    points,
                    imageRefFromFile.current,
                    parentRef.current
                );
                setPositions(detected_point);   
            });
        }
    }

    useEffect(() => {
        initalPointByParent();
    }, [parentRef.current, file]);

    if (!file) return <div>Đang tải</div>;

    return (
        <div className="flex h-80 w-fit border mt-2 border-black">
            {positions.map((point, idx) => (
                <Draggable
                    position={point}
                    positionOffset={{ x: "-50%", y: "-50%" }}
                    key={idx}
                    nodeRef={nodeRefs.current[idx]}
                    onDrag={handleDrag(idx, setPositions)}
                >
                    <div
                        ref={nodeRefs.current[idx]}
                        className="z-[100] absolute w-4 h-4 bg-green-500 rounded-full select-none"
                    >
                        {point.x},{point.y}
                    </div>
                </Draggable>
            ))}
            <canvas
                ref={canvasRef}
                width={parentRef.current ? parentRef.current.offsetWidth : 0}
                height={parentRef.current ? parentRef.current.offsetHeight : 0}
                className="absolute opacity-30"
            />
            <img
                ref={(ele) => {
                    parentRef.current = ele;
                }}
                src={URL.createObjectURL(file)}
                className="h-full border border-black"
                alt="Ảnh"
            />
            {croppedImg != "" && (
                <img
                    src={croppedImg}
                    className="h-full border border-black"
                    alt="Ảnh2"
                />
            )}
        </div>
    );
}
