import { TableColumnsType } from "antd";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { useEffect, useMemo, useState } from "react";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { getAllByUser } from "@/api/QuestionDetail";
import { getOneByClerkId } from "@/api/User";
import { User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";
import { ModalCreateQuestion } from "@/components/modal_create_question/ModalCreateQuestion";
import { DeleteModal } from "./DeleteModal";
import { ReadModal } from "./ReadModal";
import { UpdateModal } from "./UpdateModal";

export function CreatedQuestion() {
    const [data, setData] = useState<QuestionDetail[]>([]);
    const { user } = useUser();

    async function fetchData() {
        const ClerkId = user?.id;
        if (ClerkId) {
            const currentUser: User = await getOneByClerkId(ClerkId);
            const data_fetched = await getAllByUser(currentUser.UserId);
            setData(data_fetched);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.length);
    }, [data]);

    const columns: TableColumnsType<QuestionDetail> = useMemo(
        () => [
            {
                title: "Nội dung",
                sorter: true,
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: record.Content || "",
                            }}
                        ></div>
                    </div>
                ),
            },
            {
                title: "Trắc nghiệm",
                sorter: true,
                width: "13%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.Type?.Name}</p>
                ),
            },
            {
                title: "Chủ đề",
                sorter: true,
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.SubSubject?.Name}</p>
                ),
            },
            {
                title: "Trình độ",
                sorter: true,
                width: "11%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">
                        {record.EducationLevel?.Name}
                    </p>
                ),
            },
            {
                title: "Độ khó",
                sorter: true,
                width: "12%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">
                        {record.DifficultLevel?.Name}
                    </p>
                ),
            },
            {
                title: "Ngôn ngữ",
                sorter: true,
                width: "12%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.Language?.Name}</p>
                ),
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, _record, _index) => (
                    <div className="flex gap-2 justify-end">
                        <DeleteModal record={_record} fetchData={fetchData} />
                        <ReadModal record={_record} />
                        <UpdateModal record={_record} fetchData={fetchData} />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );

    return (
        <BaseScreen
            screen_title="Câu hỏi"
            columns={columns}
            data={data}
            defaultPageSize={6}
            addModal={<ModalCreateQuestion />}
        />
    );
}
