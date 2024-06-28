import { Answer } from "@/InterfacesDatabase";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { DraggableData } from "react-draggable";

export interface Point {
    x: number;
    y: number;
}

export const intialPoints = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
];

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

type SetPositionsFunction = React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[]>
>;

export const handleDrag =
    (
        idx: number,
        setPositions: SetPositionsFunction,
        parentRef: HTMLImageElement | null
    ) =>
    (_e: any, data: DraggableData) => {
        if (parentRef) {
            const { width, height } = parentRef.getBoundingClientRect();

            let newX = data.x;
            let newY = data.y;

            // Adjust position if it goes out of bounds
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX > width) newX = width;
            if (newY > height) newY = height;

            // Snap to the nearest corner if out of bounds
            if (data.x < 0 || data.y < 0 || data.x > width || data.y > height) {
                newX = data.x < width / 2 ? 0 : width;
                newY = data.y < height / 2 ? 0 : height;
            }

            setPositions((prevPositions) => {
                const newPositions = [...prevPositions];
                newPositions[idx] = { x: newX, y: newY };
                return newPositions;
            });
        }
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

export interface AnswerWithUserChoice extends Answer {
    UserChoice: boolean;
}

export interface UserResponse {
    STT: string;
    Answers: boolean[][];
}

export interface UserResponseDetail {
    STT: string;
    Response: {
        Content: string;
        Answers: AnswerWithUserChoice[];
    }[];
}

export function getUserResponseDetail(
    Questions: QuestionDetail[],
    userResponse: UserResponse
) {
    const userResponseDetail: UserResponseDetail = {
        STT: userResponse.STT,
        Response: [],
    };
    Questions.forEach((q, q_idx) => {
        const newAnswers: AnswerWithUserChoice[] = q.Answers.map(
            (ele, a_idx) => ({
                ...ele,
                IsCorrect: ele.IsCorrect.toString() == "1" ? true : false,
                UserChoice: userResponse.Answers[q_idx][a_idx],
            })
        );

        userResponseDetail.Response.push({
            Content: q.Content || "",
            Answers: newAnswers,
        });
    });

    return userResponseDetail;
}

export interface PropsScanAnswerSheet {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    parentRef: HTMLImageElement | null;
    setParentRef: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
    positions: Point[];
    setPositions: React.Dispatch<React.SetStateAction<Point[]>>;
    croppedImg: string;
    setCroppedImg: React.Dispatch<React.SetStateAction<string>>;
    imageRefFromFile: React.MutableRefObject<HTMLImageElement>;
    userResponseDetail: UserResponseDetail | null;
    setUserResponseDetail: React.Dispatch<
        React.SetStateAction<UserResponseDetail | null>
    >;
    canvasPolygonRef: React.MutableRefObject<HTMLCanvasElement | null>;
    dataASR: UserResponseDetail[];
    setDataASR: React.Dispatch<React.SetStateAction<UserResponseDetail[]>>;
}

export function drawPolygonByPositions(
    canvasPolygonRef: React.MutableRefObject<HTMLCanvasElement | null>,
    positions: Point[]
) {
    if (canvasPolygonRef.current) {
        const ctx = canvasPolygonRef.current.getContext("2d");
        if (ctx) {
            drawPolygon(
                ctx,
                positions,
                canvasPolygonRef.current.width,
                canvasPolygonRef.current.height
            );
        }
    }
}

export function getScore(userResponseDetail: UserResponseDetail) {
    let score = 0;
    userResponseDetail.Response.forEach((q, _q_idx) => {
        let isCurrentCorrect = true;
        q.Answers.map((ans, _ans_idx) => {
            if (ans.IsCorrect != ans.UserChoice) {
                isCurrentCorrect = false;
            }
        });
        if (isCurrentCorrect) {
            score += 1;
        }
    });
    return score;
}
