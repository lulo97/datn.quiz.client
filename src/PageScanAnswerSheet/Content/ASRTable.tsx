import { TableColumnsType } from "antd";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { useState, useEffect, useMemo } from "react";
import { Eye, X } from "lucide-react";
import {
    PropsScanAnswerSheet,
    UserResponseDetail,
    getScore,
} from "../Utils/Utils";

export const mock_data: UserResponseDetail = {
    STT: "123",
    Response: [
        {
            Content: "<p>Số Pi là số?</p>",
            Answers: [
                {
                    Content: "Thập phân",
                    AnswerId: "07163155-ae91-4b59-90e3-57766e91c860",
                    IsCorrect: false,
                    QuestionId: "18ee42da-9df2-4041-a0c5-f13350b312a4",
                    UserChoice: false,
                },
                {
                    Content: "Hữu tỉ",
                    AnswerId: "26e8a8c6-1f89-4a2d-b629-6e49d9d50b90",
                    IsCorrect: false,
                    QuestionId: "18ee42da-9df2-4041-a0c5-f13350b312a4",
                    UserChoice: false,
                },
                {
                    Content: "Vô tỉ",
                    AnswerId: "ce71a34c-1f0e-4d2c-adca-9be0276dd8ef",
                    IsCorrect: true,
                    QuestionId: "18ee42da-9df2-4041-a0c5-f13350b312a4",
                    UserChoice: true,
                },
                {
                    Content: "Số phức",
                    AnswerId: "f7c7a965-0845-4924-b342-1dc1aef9c851",
                    IsCorrect: false,
                    QuestionId: "18ee42da-9df2-4041-a0c5-f13350b312a4",
                    UserChoice: false,
                },
            ],
        },
        {
            Content:
                '<p>Giải phương trình&nbsp;<span class="__se__katex katex" data-exp="x^2 - 1= 0" data-font-size="1em" style="font-size: 16px"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo>=</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">x^2 - 1= 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9474em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>​​</p>',
            Answers: [
                {
                    Content: "x = 1",
                    AnswerId: "0549ea8f-ded7-4546-b7a8-b4ca869116e5",
                    IsCorrect: true,
                    QuestionId: "e7322eb9-ca57-4bf4-8e4b-691cf75fbecc",
                    UserChoice: true,
                },
                {
                    Content: "x = -1",
                    AnswerId: "1895b629-6895-419f-8806-f2936c6f32e1",
                    IsCorrect: true,
                    QuestionId: "e7322eb9-ca57-4bf4-8e4b-691cf75fbecc",
                    UserChoice: true,
                },
                {
                    Content: "x = 0",
                    AnswerId: "cd81d496-7578-4680-a985-25e4f1e10725",
                    IsCorrect: false,
                    QuestionId: "e7322eb9-ca57-4bf4-8e4b-691cf75fbecc",
                    UserChoice: false,
                },
                {
                    Content: "x = 2",
                    AnswerId: "f50fee5f-7b3d-4dc6-a432-82a080a20c16",
                    IsCorrect: false,
                    QuestionId: "e7322eb9-ca57-4bf4-8e4b-691cf75fbecc",
                    UserChoice: false,
                },
            ],
        },
        {
            Content: "<p>Nhà toán học trong hình là ai?</p>",
            Answers: [
                {
                    Content: "Leonhard Euler",
                    AnswerId: "97e3bc4c-12e9-4a96-866f-d829a0cba94a",
                    IsCorrect: true,
                    QuestionId: "b9f63ae5-4da6-4f9f-ad15-2f83cb8766f7",
                    UserChoice: true,
                },
                {
                    Content: "Euclid ",
                    AnswerId: "e81646dd-7c30-4408-b56d-1d08cb05806e",
                    IsCorrect: false,
                    QuestionId: "b9f63ae5-4da6-4f9f-ad15-2f83cb8766f7",
                    UserChoice: false,
                },
                {
                    Content: "Hypatia ",
                    AnswerId: "ec38b405-9737-4ff4-a4d5-0d880231a281",
                    IsCorrect: false,
                    QuestionId: "b9f63ae5-4da6-4f9f-ad15-2f83cb8766f7",
                    UserChoice: false,
                },
                {
                    Content: "Pythagoras ",
                    AnswerId: "fd760981-7969-4a4e-8573-0c22017c6d33",
                    IsCorrect: false,
                    QuestionId: "b9f63ae5-4da6-4f9f-ad15-2f83cb8766f7",
                    UserChoice: false,
                },
            ],
        },
        {
            Content: "<p>Tính biểu thức 1 + 1 = ?</p>",
            Answers: [
                {
                    Content: "3",
                    AnswerId: "bdb88557-eb06-4912-a5c1-683f689746c8",
                    IsCorrect: false,
                    QuestionId: "645595ce-b7f7-4375-97f0-c60d36b5e8db",
                    UserChoice: true,
                },
                {
                    Content: "5",
                    AnswerId: "bfd06b35-6026-45ba-b4e6-d9bcee9513e5",
                    IsCorrect: false,
                    QuestionId: "645595ce-b7f7-4375-97f0-c60d36b5e8db",
                    UserChoice: false,
                },
                {
                    Content: "4",
                    AnswerId: "d5eaed0d-724c-41f5-bbbd-63b01ca687d9",
                    IsCorrect: false,
                    QuestionId: "645595ce-b7f7-4375-97f0-c60d36b5e8db",
                    UserChoice: false,
                },
                {
                    Content: "2",
                    AnswerId: "fccd98d2-2b75-40dd-aca8-d89d50f46194",
                    IsCorrect: true,
                    QuestionId: "645595ce-b7f7-4375-97f0-c60d36b5e8db",
                    UserChoice: false,
                },
            ],
        },
    ],
};

export function ASRTable(props: PropsScanAnswerSheet) {
    const { dataASR, setDataASR } = props;

    async function fetchData() {
        //const data_fetched = await getAll();
        //setData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(dataASR.length);
    }, [dataASR]);

    const columns: TableColumnsType<UserResponseDetail> = useMemo(
        () => [
            {
                title: "Mã người thi",
                dataIndex: "STT",
                sorter: true,
            },
            {
                title: "Số câu đúng",
                sorter: true,
                render: (_item, record, _index) => getScore(record),
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, _record, _index) => (
                    <div className="flex gap-2 justify-end">
                        <Eye className="text-yellow-500 hover:text-yellow-600" />
                        <X className="text-red-500 hover:text-red-600" />
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
            data={dataASR}
            defaultPageSize={5}
        />
    );
}
