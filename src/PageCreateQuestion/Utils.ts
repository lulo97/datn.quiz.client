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
import { IQuestionFromAI } from "@/PageAI/Content/RightQuestion";

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

export interface InterfaceFromOutside {
    IsInModal?: boolean;
    QuestionFromAI?: IQuestionFromAI;
    IsUpdate?: boolean;
    DataFromUpdate?: QuestionDetail;
    FetchDataAfterUpdate?: () => Promise<void>;
}

export interface CreateQuestionProps extends InterfaceFromOutside {
    state: QuestionDetail;
    dispatch: React.Dispatch<Action>;
}

export enum ActionType {
    Reset,
    ChangeUserId,
    ChangeQuestion,
    AddAnswer,
    ChangeAnswer,
    ReorderAnswers,
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
    return {
        Content: null,
        Answers: [
            getNewAnswer(QuestionId, true),
            getNewAnswer(QuestionId, false),
            getNewAnswer(QuestionId, false),
            getNewAnswer(QuestionId, false),
        ],
        Explanation: null,
        ExplainAllow: false,
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
        UserId: "",
        //
        CorrectUserCount: 0,
        IncorrectUserCount: 0,
        IsDeleted: false,
        CreatedAt: null,
        UpdatedAt: null,
    };
}

export function getErrors(state: QuestionDetail) {
    const errors = [];

    //Check if have duplicate answer
    const AnswerContents: string[] = state.Answers.map((ele) => ele.Content);
    const IsAnswerContentsDuplicate =
        new Set(AnswerContents).size !== AnswerContents.length;
    if (IsAnswerContentsDuplicate) {
        errors.push("Hai lựa chọn giống nhau");
    }

    if (!state.UserId) errors.push("Thiếu người tạo!");
    if (!state.Content) errors.push("Thiếu trường câu hỏi!");
    if (!state.Answers) errors.push("Thiếu trường đáp án!");
    if (state.Answers.length < 2) errors.push("Cần ít nhất 2 lựa chọn!");
    if (!state.Answers.some((answer) => answer.IsCorrect))
        errors.push("Cần ít nhất 1 đáp án!");
    if (state.ExplainAllow && !state.Explanation)
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
        Explanation: state.Explanation || "",
        CorrectUserCount: 0,
        IncorrectUserCount: 0,
        IsDeleted: false,
        AllowPenalty: state.PenaltyAllow,
    };
}

export function getRecords(state: QuestionDetail) {
    const QuestionRecord = createQuestionRecord(state);
    const QuestionInfoRecord = createQuestionInformationRecord(state);
    const AnswerRecords = state.Answers;
    return { QuestionRecord, QuestionInfoRecord, AnswerRecords };
}
