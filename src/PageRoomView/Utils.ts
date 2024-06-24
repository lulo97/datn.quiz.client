import { Room, User } from "@/InterfacesDatabase";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

export interface RoomDetail extends Omit<Room, "QuizId" | "UserId"> {
    Quiz: QuizDetail;
    User: User;
}