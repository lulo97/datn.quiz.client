import Draggable from "react-draggable";
import { useRef, createRef, useEffect } from "react";
import {
    PropsScanAnswerSheet,
    drawPolygonByPositions,
    handleDrag,
    inverseCalculateScaledPoints,
} from "../Utils/Utils";
import { detectPoint } from "../Utils/detectPoint";
import { QuestionCards } from "./QuestionCard";

export function Body(props: PropsScanAnswerSheet) {
    const {
        file,
        parentRef,
        positions,
        setPositions,
        imageRefFromFile,
        setParentRef,
        userResponseDetail,
        canvasPolygonRef,
    } = props;
    const nodeRefs = useRef(positions.map(() => createRef<HTMLDivElement>()));

    useEffect(() => {
        drawPolygonByPositions(canvasPolygonRef, positions);
    }, [positions]);

    function initalPointByParent() {
        if (parentRef) {
            detectPoint(imageRefFromFile.current).then((points) => {
                if (!parentRef) return;
                const detected_point = inverseCalculateScaledPoints(
                    points,
                    imageRefFromFile.current,
                    parentRef
                );
                setPositions(detected_point);
            });
        }
    }

    useEffect(() => {
        initalPointByParent();
    }, [parentRef, file]);

    if (!file) return <div className="mt-5">Hãy thêm ảnh!</div>;

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

            <canvas
                ref={canvasPolygonRef}
                width={parentRef?.width}
                height={parentRef?.height}
                className="absolute opacity-30"
            />

            <img
                ref={setParentRef}
                src={URL.createObjectURL(file)}
                className="h-full border border-black"
                alt="Ảnh"
            />

            {userResponseDetail && (
                <div className="w-full ml-10 my-1 overflow-y-scroll">
                    <div className="flex gap-1 mb-3">
                        <div className="font-semibold">Số thứ tự:</div>
                        <div>{userResponseDetail.STT}</div>
                    </div>
                    <QuestionCards userResponseDetail={userResponseDetail} />
                </div>
            )}
        </div>
    );
}
