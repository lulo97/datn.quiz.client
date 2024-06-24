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
    //Above is need for create, below fields is need for view
    Attempts: number;
    IsDeleted: boolean;
    IsVerified: boolean;
    UserVerify: string | null;
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
        IsVerified: false,
        UserVerify: "",
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
        IsVerified: false,
        UserVerify: null,
        VerifiedAt: null,
        CreatedAt: null,
        UpdatedAt: null,
    };
}

// return {
//     "Questions": [
//         {
//             "Type": {
//                 "Name": SCQ,
//                 "TypeId": "41d51bb6-12cd-11ef-9b8a-02509c489bec",
//                 "CreatedAt": "2024-05-15 22:10:25.000000",
//                 "UpdatedAt": "2024-05-15 22:10:25.000000",
//                 "Description": ""
//             },
//             "Point": {
//                 "Value": 10,
//                 "PointId": "9f219133-15cc-11ef-9e8e-02509c489bec",
//                 "CreatedAt": "2024-05-19 17:43:25.000000",
//                 "IsPenalty": false,
//                 "UpdatedAt": "2024-05-19 17:43:25.000000"
//             },
//             "UserId": "050d09dd-1996-11ef-9e8e-02509c489bec",
//             "Answers": [
//                 {
//                     "Content": "3",
//                     "AnswerId": "45636655-b59e-4cbe-899f-7b18b4dfb4c4",
//                     "IsCorrect": false,
//                     "QuestionId": "496b22ca-57e9-4d9e-920a-42ee3f06caf6"
//                 },
//                 {
//                     "Content": "5",
//                     "AnswerId": "64808894-c5a7-4c56-9347-927b0c324040",
//                     "IsCorrect": false,
//                     "QuestionId": "496b22ca-57e9-4d9e-920a-42ee3f06caf6"
//                 },
//                 {
//                     "Content": "2",
//                     "AnswerId": "8b01eda3-1917-4d3b-a3dd-4af9ce5cabf7",
//                     "IsCorrect": true,
//                     "QuestionId": "496b22ca-57e9-4d9e-920a-42ee3f06caf6"
//                 },
//                 {
//                     "Content": "1",
//                     "AnswerId": "d7e3012a-efc8-466e-b453-e5c4c54ad296",
//                     "IsCorrect": false,
//                     "QuestionId": "496b22ca-57e9-4d9e-920a-42ee3f06caf6"
//                 }
//             ],
//             "Content": "<p>1+1=?</p>",
//             "Subject": {
//                 "Name": "Toán Học",
//                 "CreatedAt": "2024-05-15 22:09:38.000000",
//                 "SubjectId": "25ef10f9-12cd-11ef-9b8a-02509c489bec",
//                 "UpdatedAt": "2024-05-15 22:09:38.000000",
//                 "Description": ""
//             },
//             "AudioUrl": "",
//             "ImageUrl": "",
//             "Language": {
//                 "Name": "Tiếng Việt",
//                 "CreatedAt": "2024-05-15 21:53:50.000000",
//                 "UpdatedAt": "2024-05-15 21:53:50.000000",
//                 "LanguageId": "f0e933ee-12ca-11ef-9b8a-02509c489bec",
//                 "Description": ""
//             },
//             "AudioFile": null,
//             "ImageFile": null,
//             "QuestionId": "496b22ca-57e9-4d9e-920a-42ee3f06caf6",
//             "SubSubject": {
//                 "Name": "Số tự nhiên",
//                 "CreatedAt": "2024-05-15 22:36:49.000000",
//                 "SubjectId": "25ef10f9-12cd-11ef-9b8a-02509c489bec",
//                 "UpdatedAt": "2024-05-15 22:36:49.000000",
//                 "Description": "",
//                 "SubSubjectId": "f234abe7-12d0-11ef-9b8a-02509c489bec"
//             },
//             "ExplainAllow": true,
//             "PenaltyPoint": {
//                 "Value": 0,
//                 "PointId": "",
//                 "CreatedAt": "",
//                 "IsPenalty": true,
//                 "UpdatedAt": ""
//             },
//             "DifficultLevel": {
//                 "Name": "Nhận biết",
//                 "CreatedAt": "2024-05-15 22:11:42.000000",
//                 "UpdatedAt": "2024-05-18 01:32:42.000000",
//                 "Description": "Nhận biết, nhắc lại được kiến thức, kĩ năng đã học.",
//                 "DifficultLevelId": "6fce122d-12cd-11ef-9b8a-02509c489bec"
//             },
//             "EducationLevel": {
//                 "Name": "Lớp 1",
//                 "CreatedAt": "2024-05-15 22:12:24.000000",
//                 "UpdatedAt": "2024-05-15 22:12:24.000000",
//                 "Description": "",
//                 "EducationLevelId": "88a72dba-12cd-11ef-9b8a-02509c489bec"
//             },
//             "Explanation": "<p>1+1=2</p>",
//             "QuestionInformationId": "d4cd9e4f-cb81-488f-b49f-b8ae60bb3216",
//             "PenaltyAllow": false
//         }
//     ],
//     "Name": null,
//     "Description": null,
//     "ImageUrl": null,
//     "ImageFile": null,
//     "Time": null,
//     "IsPublic": false,
//     "EducationLevel": null,
//     "Subject": {
//         "SubjectId": "25ef10f9-12cd-11ef-9b8a-02509c489bec",
//         "Name": "Toán Học",
//         "Description": "",
//         "CreatedAt": "2024-05-15T15:09:38.000Z",
//         "UpdatedAt": "2024-05-15T15:09:38.000Z"
//     },
//     "UserId": "",
//     "QuizInformationId": "741a62f5-2246-411f-9330-2597333c0aa8"
// }
