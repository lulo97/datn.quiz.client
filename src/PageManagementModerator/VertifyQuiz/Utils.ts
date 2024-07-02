import { User } from "@/InterfacesDatabase";

export interface QuizForVertify {
    QuizId: string;
    QuizInformationId: string;
    Name: string;
    UserVertify: User | null;
    VerifiedAt: string | null;
}

export interface QuizVertifyUpdate {
    QuizInformationId: string;
    UserVertify: string;
    VerifiedAt: number;
}

const RawCheckList = [
    {
        Name: "ClearContent",
        Label: "Nội dung câu hỏi rõ ràng",
    },
    {
        Name: "ReasonableChoices",
        Label: "Số lượng lựa chọn hợp lý",
    },
    {
        Name: "NonPredictableAnswers",
        Label: "Đáp án không quá dễ đoán",
    },
    {
        Name: "ClearExplanations",
        Label: "Giải thích rõ ràng cho từng câu hỏi",
    },
    {
        Name: "AppropriateDifficulty",
        Label: "Độ khó đề thi hợp lý",
    },
    {
        Name: "ReasonableTime",
        Label: "Thời gian làm đề hợp lý",
    },
    {
        Name: "NoTypos",
        Label: "Không có lỗi chính tả",
    },
];

export const initialCheckList = RawCheckList.map((ele) => ({
    ...ele,
    Checked: false,
}));

export type CheckList = (typeof initialCheckList)[0];
