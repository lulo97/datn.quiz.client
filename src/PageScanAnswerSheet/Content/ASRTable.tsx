import { TableColumnsType } from "antd";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { useState, useEffect, useMemo } from "react";
import { Language as ILanguage } from "@/InterfacesDatabase";
import { Eye } from "lucide-react";

interface ASR {
    QuizId: string;
    UserNumber: string;
    Responses: {
        QuestionIdx: string;
        SelectedAnswers: number[];
        CorrectAnswers: number[];
    }[];
}

const mock_data = {
    QuizId: "123",
    UserNumber: "002",
    Responses: [
        {
            QuestionIdx: "1",
            SelectedAnswers: [0, 1, 2],
            CorrectAnswers: [0, 2],
        },
        { QuestionIdx: "2", SelectedAnswers: [0, 2], CorrectAnswers: [1] },
        { QuestionIdx: "3", SelectedAnswers: [1, 3], CorrectAnswers: [1, 2] },
        {
            QuestionIdx: "4",
            SelectedAnswers: [0, 2, 3],
            CorrectAnswers: [0, 1, 3],
        },
        { QuestionIdx: "5", SelectedAnswers: [1, 2], CorrectAnswers: [2, 3] },
        {
            QuestionIdx: "6",
            SelectedAnswers: [0, 1, 3],
            CorrectAnswers: [0, 1, 2],
        },
        {
            QuestionIdx: "7",
            SelectedAnswers: [2, 3],
            CorrectAnswers: [1, 2, 3],
        },
        {
            QuestionIdx: "8",
            SelectedAnswers: [0, 2],
            CorrectAnswers: [0, 2, 3],
        },
        {
            QuestionIdx: "9",
            SelectedAnswers: [1, 2, 3],
            CorrectAnswers: [1, 2],
        },
        {
            QuestionIdx: "10",
            SelectedAnswers: [0, 3],
            CorrectAnswers: [0, 1, 3],
        },
        { QuestionIdx: "11", SelectedAnswers: [1, 3], CorrectAnswers: [2, 3] },
        {
            QuestionIdx: "12",
            SelectedAnswers: [0, 2, 3],
            CorrectAnswers: [0, 2],
        },
    ],
};

export function ASRTable() {
    const [data, setData] = useState<ASR[]>([
        mock_data,
        mock_data,
        mock_data,
        mock_data,
        mock_data,
    ]);

    async function fetchData() {
        //const data_fetched = await getAll();
        //setData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.length);
    }, [data]);

    const columns: TableColumnsType<ILanguage> = useMemo(
        () => [
            {
                title: "Mã người thi",
                dataIndex: "UserNumber",
                sorter: true,
            },
            {
                title: "Số câu đúng",
                sorter: true,
                render: (_item, record, _index) => <div>5</div>,
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, _record, _index) => (
                    <div className="flex gap-2 justify-end">
                        <Eye className="text-yellow-500 hover:text-yellow-600" />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );
    return (
        <BaseScreen
            screen_title="Kết quả thi"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
