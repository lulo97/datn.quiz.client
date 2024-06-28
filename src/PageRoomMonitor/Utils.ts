import {
    Answer,
    DifficultLevel,
    EducationLevel,
    Language,
    Point,
    Room,
    SubSubject,
    Subject,
    Time,
    Type,
    User,
} from "@/InterfacesDatabase";
import { Message } from "@/PageQuizPlayTimeRoom/Utils";
import dayjs from "dayjs";

interface QuestionDetail {
    QuestionId: string;
    QuestionInformationId: string;
    UserId: string;
    Answers: Answer[];
    Content: string | null;
    ImageFile: File | null;
    ImageUrl: string | null;
    AudioFile: File | null;
    AudioUrl: string | null;
    Explanation: string | null;
    ExplainAllow: boolean;
    Type: Type | null;
    DifficultLevel: DifficultLevel | null;
    EducationLevel: EducationLevel | null;
    Subject: Subject | null;
    Language: Language | null;
    SubSubject: SubSubject | null;
    PenaltyPoint: Point | null;
    PenaltyAllow: boolean;
    Point: Point | null;
    //
    CorrectUserCount: number;
    IncorrectUserCount: number;
    IsDeleted: boolean;
    CreatedAt: string | null;
    UpdatedAt: string | null;
}

export interface QuizDetail {
    QuizId: string;
    UserId: string;
    QuizInformationId: string;
    Questions: QuestionDetail[];
    Name: string | null;
    Description: string | null;
    ImageUrl: string | null;
    ImageFile: File | null;
    Time: Time | null;
    IsPublic: boolean;
    EducationLevel: EducationLevel | null;
    Subject: Subject | null;
    //
    Attempts: number;
    IsDeleted: boolean;
    IsVerified: boolean;
    UserVerify: string | null;
    VerifiedAt: string | null;
    CreatedAt: string | null;
    UpdatedAt: string | null;
}

export interface RoomDetail extends Omit<Room, "QuizId" | "UserId"> {
    Quiz: QuizDetail;
    User: User;
}

export interface UserData {
    User: User;
    StartTimeJoin: number;
    EndTimeJoin: number;
}

export interface RoomSocketData {
    Room: RoomDetail;
    UserDatas: UserData[];
    Messages: Message[];
}

export function getRemainingTime(endTime: string) {
    const endTimeObject = dayjs(endTime);
    const currentTime = dayjs();
    const diffMilliseconds = endTimeObject.diff(currentTime);
    const remainingSeconds = Math.floor(diffMilliseconds / 1000);
    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;
    return `${minute} phút ${second} giây`;
}

export function isRoomTimeout(endTime: string) {
    const endTimeObject = dayjs(endTime);
    const currentTime = dayjs();
    const diffMilliseconds = endTimeObject.diff(currentTime);
    const remainingSeconds = Math.floor(diffMilliseconds);
    if (remainingSeconds < 0) return true;
    return false;
}
