import { getObjectId } from "@/Utils";

export interface CreateQuestionProps {
    state: ICreateQuestion,
    dispatch: React.Dispatch<Action>
}

export enum ActionType {
    ChangeQuestion,
    AddAnswer,
    ChangeAnswer,
    DeleteAnswer,
    ToggleAnswer,
    ToggleExplain,
    ChangeExplain,
    UploadImage,
    UrlImageChange,
    UploadAudio,
    UrlAudioChange,
    TypeChange,
    DifficultyChange,
    SubjectChange,
    SubSubjectChange,
    PenaltyScoreChange,
    TogglePenaltyScore,
    ScoreChange,
    DifficultyLevelChange,
    EducationLevelChange,
    PostCreate,
    Create,
}

export interface Action {
    type: ActionType;
    payload: any;
}

export interface ICQ_Answer {
    Id: string;
    Content: string;
    IsCorrect: boolean;
}

export interface ICQ_Explain {
    IsVisible: boolean;
    Content: string;
}

export interface ICQ_Image {
    File: File | null;
    Url: string;
}

export interface ICQ_Audio {
    File: File | null;
    Url: string;
}

export interface ICQ_Type {
    Id: string;
    Name: string;
}

export interface ICQ_DifficultLevel {
    Id: string;
    Name: string;
}

export interface ICQ_EducationLevel {
    Id: string;
    Name: string;
}

export interface ICQ_Subject {
    Id: string;
    Name: string;
}

export interface ICQ_SubSubject {
    Id: string;
    Name: string;
}

export interface ICQ_PenaltyScore {
    Value: number;
    IsAllow: boolean;
}

export interface ICreateQuestion {
    Content: string;
    Answers: ICQ_Answer[];
    Explain: ICQ_Explain;
    Image: ICQ_Image;
    Audio: ICQ_Audio;
    Type: ICQ_Type;
    DifficultLevel: ICQ_DifficultLevel;
    EducationLevel: ICQ_EducationLevel;
    Subject: ICQ_Subject;
    SubSubject: ICQ_SubSubject;
    PenaltyScore: ICQ_PenaltyScore;
    Score: number;
}

export function spawnAnswer(): ICQ_Answer {
    return {
        Id: getObjectId(),
        Content: "",
        IsCorrect: false
    }
}

export const inital_state: ICreateQuestion = {
    Content: "",
    Answers: [spawnAnswer(), spawnAnswer(), spawnAnswer(), spawnAnswer()],
    Explain: { IsVisible: true, Content: "" },
    Image: { File: null, Url: "" },
    Audio: { File: null, Url: "" },
    Type: { Id: "", Name: "" },
    DifficultLevel: { Id: "", Name: "" },
    EducationLevel: { Id: "", Name: "" },
    Subject: { Id: "", Name: "" },
    SubSubject: { Id: "", Name: "" },
    PenaltyScore: { Value: 0, IsAllow: false },
    Score: 10,
};