import { Room, User } from "@/InterfacesDatabase";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

export interface UserResponse {
    QuestionId: string;
    SelectedAnswers: string[];
}

export interface PlayData {
    User: User;
    QuestionIdx: number;
    StartTime: number; //Time user enter room
    EndTime: number; //Time user out room
    Response: UserResponse[];
}

export interface RoomDetail extends Omit<Room, "QuizId" | "UserId"> {
    Quiz: QuizDetail;
    User: User;
}

export interface IRoomSocketData {
    Room: RoomDetail | null;
    PlayDatas: PlayData[];
}

export enum ActionType {
    SetRoom = "SetRoom",
    AddUser = "AddUser",
}