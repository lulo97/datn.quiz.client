import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { Dispatch, SetStateAction } from "react";

export interface Message {
    UserId: string;
    RoomId: string;
    QuestionIdx: number;
    Response: {
        QuestionId: string;
        SelectedAnswers: string[];
    }[];
    StartTimePlay: number;
    EndTimePlay: number;
}

export interface QuizPlayTimeRoomProps {
    state: Message;
    setState: Dispatch<SetStateAction<Message | undefined>>;
    props: QuizDetailProps;
}
