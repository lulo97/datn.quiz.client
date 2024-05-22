import {
    Answer,
    DifficultLevel,
    EducationLevel,
    Language,
    Point,
    SubSubject,
    Subject,
    Type,
} from "@/InterfacesDatabase";
import { getUUID } from "@/Utils";

import {
    Question as IQuestion,
    QuestionInformation as IQI,
} from "@/InterfacesDatabase";

export interface CreateQuestionProps {
    state: ICreateQuestion;
    dispatch: React.Dispatch<Action>;
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
    SubjectChange,
    SubSubjectChange,
    TogglePenaltyPoint,
    PointChange,
    PenaltyPointChange,
    LanguageChange,
    DifficultLevelChange,
    EducationLevelChange,
    PostCreate,
    Create,
    AssignQuestionIdToAnswer,
}

export interface Action {
    type: ActionType;
    payload: any;
}

export interface ICreateQuestion {
    Content: string | null;
    Answers: Answer[];
    ExplainContent: string | null;
    ExplainAllow: boolean;
    ImageFile: File | null;
    ImageUrl: string | null;
    AudioFile: File | null;
    AudioUrl: string | null;
    Type: Type | null;
    DifficultLevel: DifficultLevel | null;
    EducationLevel: EducationLevel | null;
    Subject: Subject | null;
    Language: Language | null;
    SubSubject: SubSubject | null;
    PenaltyPoint: Point | null;
    PenaltyAllow: boolean;
    Point: Point | null;
    QuestionId: string;
    QuestionInformationId: string;
    UserId: string;
}

export function spawnAnswer(
    QuestionId: string,
    IsCorrect: boolean
): Answer {
    return {
        AnswerId: getUUID(),
        QuestionId: QuestionId,
        Content: "",
        IsCorrect: IsCorrect,
    };
}

export function getInitalState(): ICreateQuestion {
    const QuestionId = getUUID();
    const QuestionInformationId = getUUID();
    const UserId = getUUID();
    return {
        Content: null,
        Answers: [
            spawnAnswer(QuestionId, true),
            spawnAnswer(QuestionId, false),
            spawnAnswer(QuestionId, false),
            spawnAnswer(QuestionId, false),
        ],
        ExplainContent: null,
        ExplainAllow: true,
        ImageFile: null,
        ImageUrl: null,
        AudioFile: null,
        AudioUrl: null,
        Type: null,
        DifficultLevel: null,
        EducationLevel: null,
        Language: null,
        Subject: null,
        SubSubject: null,
        PenaltyPoint: null,
        PenaltyAllow: false,
        Point: null,
        QuestionId: QuestionId,
        QuestionInformationId: QuestionInformationId,
        UserId: UserId,
    };
}

export function getErrors(state: ICreateQuestion): string[] {
    const errors = [];
    if (!state.Content) errors.push("Thiếu trường câu hỏi!");
    if (!state.Answers) errors.push("Thiếu trường đáp án!");
    if (state.Answers.length < 2) errors.push("Cần ít nhất 2 lựa chọn!");
    if (!state.Answers.some((answer) => answer.IsCorrect))
        errors.push("Cần ít nhất 1 đáp án!");
    if (state.ExplainAllow && !state.ExplainContent)
        errors.push("Thiếu trường giải thích!");
    if (!state.Type) errors.push("Thiếu trường kiểu trắc nghiệm!");
    if (!state.DifficultLevel) errors.push("Thiếu trường độ khó!");
    if (!state.EducationLevel) errors.push("Thiếu trường trình độ câu hỏi!");
    if (!state.Language) errors.push("Thiếu trường ngôn ngữ!");
    if (!state.Subject) errors.push("Thiếu trường chủ đề!");
    if (!state.SubSubject) errors.push("Thiếu trường chủ đề phụ!");
    if (state.PenaltyAllow && state.PenaltyPoint === null)
        errors.push("Thiếu trường điểm phạt!");
    if (!state.Point) errors.push("Thiếu trường điểm!");
    return errors;
}

export function getRecords(state: ICreateQuestion) {
    const qr: IQuestion = {
        QuestionId: state.QuestionId,
        QuestionInformationId: state.QuestionInformationId,
        UserId: state.UserId,
        TypeId: state.Type?.TypeId || "",
        SubSubjectId: state.SubSubject?.SubSubjectId || "",
        EducationLevelId: state.EducationLevel?.EducationLevelId || "",
        DifficultLevelId: state.DifficultLevel?.DifficultLevelId || "",
        LanguageId: state.Language?.LanguageId || "",
        PointId: state.Point?.PointId || "",
        PenaltyPointId: state.PenaltyPoint?.PointId || "",
    };
    const qir: Omit<IQI, "CreatedAt" | "UpdateAt"> = {
        QuestionInformationId: state.QuestionInformationId,
        Content: state.Content || "",
        ImageUrl: state.ImageUrl || "",
        AudioUrl: state.AudioUrl || "",
        Explanation: state.ExplainContent || "",
        CorrectUserCount: 0,
        IncorrectUserCount: 0,
        IsDeleted: false,
        IsAllowPenalty: state.PenaltyAllow,
    };
    const ars = state.Answers;
    return { qr, qir, ars };
}