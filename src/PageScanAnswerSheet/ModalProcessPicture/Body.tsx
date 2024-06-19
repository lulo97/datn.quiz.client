import Draggable from "react-draggable";
import { useRef, createRef, useEffect, useState } from "react";
import {
    PropsMPP,
    drawPolygonByPositions,
    handleDrag,
    inverseCalculateScaledPoints,
} from "../Utils/Utils";
import { detectPoint } from "../Utils/detectPoint";
import { QuestionCards } from "./QuestionCard";

export function Body(props: PropsMPP) {
    const {
        file,
        parentRef,
        positions,
        setPositions,
        croppedImg,
        imageRefFromFile,
        userResponseDetail,
        canvasPolygonRef,
    } = props;
    const nodeRefs = useRef(positions.map(() => createRef<HTMLDivElement>()));

    useEffect(() => {
        drawPolygonByPositions(canvasPolygonRef, positions);
    }, [positions]);

    function initalPointByParent() {
        if (parentRef.current) {
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

    useEffect(() => {
        console.log(parentRef.current?.getBoundingClientRect());
    }, [parentRef]);

    if (!file) return <div>Đang tải</div>;

    return (
        <div className="flex h-80 w-full border mt-2 border-black">
            {positions.map((point, idx) => (
                <Draggable
                    position={point}
                    positionOffset={{ x: "-50%", y: "-50%" }}
                    key={idx}
                    nodeRef={nodeRefs.current[idx]}
                    onStop={handleDrag(idx, setPositions, parentRef)}
                    // onDrag={handleDrag(idx, setPositions)}
                >
                    <div
                        ref={nodeRefs.current[idx]}
                        className="z-[100] absolute w-4 h-4 bg-green-500 rounded-full"
                    ></div>
                </Draggable>
            ))}
            {JSON.stringify(parentRef.current?.getBoundingClientRect().width)}
            <canvas
                ref={canvasPolygonRef}
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
            {userResponseDetail && (
                <QuestionCards userResponseDetail={userResponseDetail} />
            )}
        </div>
    );
}
