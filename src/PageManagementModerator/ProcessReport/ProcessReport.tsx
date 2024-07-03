import { strToDate, toDDMMYYY } from "@/Utils";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { ReportDetail } from "./Utils";
import { getAll } from "@/api/ReportDetail";
import { toast } from "react-toastify";
import { Send } from "lucide-react";
import { ModalRead } from "./ModalRead";

export function ProcessReport() {
    const [data, setData] = useState<ReportDetail[]>();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAll();
                if (!result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                    return;
                }
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setData(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const columns: TableColumnsType<ReportDetail> = [
        {
            title: "Lý do",
            sorter: true,
            render: (_value, record, _item) => (
                <div>{record.ReportReason.Name}</div>
            ),
        },
        {
            title: "Đối tượng",
            sorter: true,
            render: (_value, record, _item) => (
                <div>{record.ReportTarget.Name}</div>
            ),
        },
        {
            title: "Người báo cáo",
            sorter: true,
            render: (_value, record, _item) => (
                <div>{record.User.Username}</div>
            ),
        },
        {
            title: "Ngày báo cáo",
            dataIndex: "CreatedAt",
            render: (_value, record, _item) => (
                <div>{toDDMMYYY(record.CreatedAt)}</div>
            ),
            sorter: (a, b) =>
                strToDate(a.CreatedAt).getTime() -
                strToDate(b.CreatedAt).getTime(),
        },
        {
            title: "Xem",
            key: "action",
            render: (_item, record, _index) => <ModalRead {...record} />,
        },
        {
            title: "Xử lý",
            key: "action",
            render: (_item, _record, _index) => (
                <Send className="text-blue-500 hover:text-blue-600 cursor-pointer" />
            ),
        },
    ];

    if (!data) return <div>Đang tải!</div>;

    return (
        <BaseScreen
            screen_title="Xử lý báo cáo"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
