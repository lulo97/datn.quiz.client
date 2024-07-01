import {
    EducationLevel,
    Quiz,
    QuizInformation,
    QuizQuestion,
    Subject,
    Time,
    User,
} from "@/InterfacesDatabase";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { getUUID } from "@/Utils";
import { Action } from "./Action";

export interface QuizDetail {
    CurrentUser: User | null;
    Name: string | null;
    Description: string | null;
    ImageUrl: string | null;
    ImageFile: File | null;
    Time: Time | null;
    IsPublic: boolean;
    EducationLevel: EducationLevel | null;
    Subject: Subject | null;
    UserId: string;
    QuizInformationId: string;
    QuizId: string;
    Questions: QuestionDetail[];
    Attempts: number;
    IsDeleted: boolean;
    UserVertify: string | null;
    VerifiedAt: string | null;
    CreatedAt: string | null;
    UpdatedAt: string | null;
}

export function getErrors(state: QuizDetail) {
    const errors = [];
    if (!state.CurrentUser) errors.push("Thiếu người dùng!");
    if (!state.Name) errors.push("Thiếu tên đề!");
    if (!state.Time) errors.push("Thiếu thời gian làm đề!");
    if (!state.EducationLevel) errors.push("Thiếu trình độ học vấn!");
    if (!state.Subject) errors.push("Thiếu chủ đề môn học!");
    if (state.Questions.length == 0) errors.push("Hãy thêm câu hỏi!");
    if (state.Questions.length <= 1) errors.push("Phải có ít nhất 2 câu hỏi!");
    return errors;
}

export type QIForInsert = Omit<QuizInformation, "CreatedAt" | "UpdatedAt">;

export function getRecords(state: QuizDetail) {
    const QuizRecord: Quiz = {
        QuizId: state.QuizId,
        UserId: state.CurrentUser?.UserId || "",
        QuizInformationId: state.QuizInformationId,
        EducationLevelId: state.EducationLevel?.EducationLevelId || "",
        SubjectId: state.Subject?.SubjectId || "",
        TimeId: state.Time?.TimeId || "",
    };

    const QuizInfoRecord: QIForInsert = {
        QuizInformationId: state.QuizInformationId,
        Name: state.Name || "",
        Description: state.Description || "",
        ImageUrl: state.ImageUrl || "",
        Attempts: 0,
        IsPublic: state.IsPublic,
        IsDeleted: false,
        UserVertify: "",
        VerifiedAt: "",
    };

    const QuizQuestionRecords: QuizQuestion[] = state.Questions.map((q) => ({
        QuizQuestionId: getUUID(),
        QuizId: state.QuizId,
        QuestionId: q.QuestionId,
    }));

    return { QuizRecord, QuizInfoRecord, QuizQuestionRecords };
}

export interface CreateQuizProps {
    state: QuizDetail;
    dispatch: React.Dispatch<Action>;
}

export function getInitalState(): QuizDetail {
    const QuizInformationId = getUUID();
    const QuizId = getUUID();
    return {
        CurrentUser: null,
        Questions: [],
        Name: null,
        Description: null,
        ImageUrl: null,
        ImageFile: null,
        Time: null,
        IsPublic: false,
        EducationLevel: null,
        Subject: null,
        UserId: "",
        QuizInformationId: QuizInformationId,
        QuizId: QuizId,
        Attempts: 0,
        IsDeleted: false,
        UserVertify: null,
        VerifiedAt: null,
        CreatedAt: null,
        UpdatedAt: null,
    };
}