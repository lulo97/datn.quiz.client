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

export interface QuestionDetail {
    QuestionId: string;
    QuestionInformationId: string;
    UserId: string;
    Answers: Answer[];
    Content: string | null;
    ImageFile: File | null;
    ImageUrl: string | null;
    AudioFile: File | null;
    AudioUrl: string | null;
    ExplainContent: string | null;
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
}

export interface CreateQuestionProps {
    state: QuestionDetail;
    dispatch: React.Dispatch<Action>;
}

export enum ActionType {
    Reset,
    ChangeUserId,
    ChangeQuestion,
    AddAnswer,
    ChangeAnswer,
    DeleteAnswer,
    ToggleAnswer,
    ToggleExplain,
    ChangeExplain,
    ChangeImageFile,
    ChangeImageUrl,
    ChangeAudioFile,
    ChangeAudioUrl,
    ChangeType,
    ChangeSubject,
    ChangeSubSubject,
    ToggleAllowPenalty,
    ChangePoint,
    ChangePenaltyPoint,
    ChangeLanguage,
    ChangeDifficultLevel,
    ChangeEducationLevel,
}

export interface Action {
    type: ActionType;
    payload: any;
}

export function getNewAnswer(QuestionId: string, IsCorrect: boolean): Answer {
    return {
        AnswerId: getUUID(),
        QuestionId: QuestionId,
        Content: "",
        IsCorrect: IsCorrect,
    };
}

export function getInitalState(): QuestionDetail {
    const QuestionId = getUUID();
    const QuestionInformationId = getUUID();
    const UserId = "";
    return {
        Content: null,
        Answers: [
            getNewAnswer(QuestionId, true),
            getNewAnswer(QuestionId, false),
            getNewAnswer(QuestionId, false),
            getNewAnswer(QuestionId, false),
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

export function getErrors(state: QuestionDetail): string[] {
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

function createQuestionRecord(state: QuestionDetail): IQuestion {
    return {
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
}

function createQuestionInformationRecord(
    state: QuestionDetail
): Omit<IQI, "CreatedAt" | "UpdatedAt"> {
    return {
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
}

export function getRecords(state: QuestionDetail) {
    const qr = createQuestionRecord(state);
    const qir = createQuestionInformationRecord(state);
    const ars = state.Answers;
    return { qr, qir, ars };
}
