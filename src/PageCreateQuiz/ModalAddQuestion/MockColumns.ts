import { QuestionTableDataType } from "@/Interfaces";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<QuestionTableDataType>();

export const columns = [
    columnHelper.accessor("STT", {
        header: "STT",
    }),
    columnHelper.accessor("Content", {
        header: "Câu hỏi",
    }),
    columnHelper.accessor("Type", {
        header: "Loại câu hỏi",
    }),
    columnHelper.accessor("Difficult", {
        header: "Độ khó",
    }),
    columnHelper.accessor("Subject", {
        header: "Chủ đề",
    }),
    columnHelper.accessor("EducationLevel", {
        header: "Trình độ",
    }),
];