import BaseScreen from "../BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        NotificationId: "663b3ba6d0c420b734178fb7",
        DestinationId: "663b3ba6abf3b4eb4f20eae7",
        SourceId: "663b3ba6f0421f2fed81e8fe",
        Name: "Thông báo mới",
        Content: "Hãy làm bài trắc nghiệm mới nhất.",
        Date: "18/04/2024",
        IsRead: true,
        IsVisible: true,
    },
    {
        NotificationId: "663b3ba6da935d8a22e1b3a5",
        DestinationId: "663b3ba6911732ca7fd91e89",
        SourceId: "663b3ba6a45a9d5b4b98f450",
        Name: "Thông báo quan trọng",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "07/05/2022",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba62a8f9b6192674fa3",
        DestinationId: "663b3ba6c286ac8c8d187061",
        SourceId: "663b3ba6dc168032f8234ece",
        Name: "Thông báo quan trọng",
        Content: "Bạn đã nhận được một tin nhắn mới.",
        Date: "15/01/2024",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba65079e133c31dfdb2",
        DestinationId: "663b3ba66be2f51d6201b1d0",
        SourceId: "663b3ba61a21ede0625b0bf8",
        Name: "Thông báo sự kiện",
        Content: "Hãy làm bài trắc nghiệm mới nhất.",
        Date: "02/04/2023",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba6615a764d19818836",
        DestinationId: "663b3ba66cd2085d3c6e1d11",
        SourceId: "663b3ba67eaf720824a31caa",
        Name: "Thông báo cập nhật",
        Content: "Đã có sự cố trong hệ thống, hãy kiểm tra lại.",
        Date: "13/12/2024",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba6fcb305c0de56c3ca",
        DestinationId: "663b3ba68e1e7c5663747dd3",
        SourceId: "663b3ba66192686d11b6877b",
        Name: "Thông báo sự kiện",
        Content: "Đã có sự cố trong hệ thống, hãy kiểm tra lại.",
        Date: "13/02/2022",
        IsRead: false,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba67e9a085b7bac1b8f",
        DestinationId: "663b3ba637c76416783e1e89",
        SourceId: "663b3ba612ad1a38388313f1",
        Name: "Thông báo cập nhật",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "17/09/2023",
        IsRead: false,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba677a9f50e950c7b62",
        DestinationId: "663b3ba67d0a73d89777a15f",
        SourceId: "663b3ba67a49b365e5462ac3",
        Name: "Thông báo sự kiện",
        Content: "Hãy làm bài trắc nghiệm mới nhất.",
        Date: "20/01/2022",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba668cb4c830e9e7973",
        DestinationId: "663b3ba6e23574724c416618",
        SourceId: "663b3ba64f2deaac6e25a881",
        Name: "Thông báo mới",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "04/10/2023",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba6b0c8c9734882ccfb",
        DestinationId: "663b3ba6119110eb14c4414f",
        SourceId: "663b3ba6efddccb3b5dc5433",
        Name: "Thông báo cập nhật",
        Content: "Bạn đã nhận được một tin nhắn mới.",
        Date: "29/08/2022",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba61b3503ef67804510",
        DestinationId: "663b3ba62297f7dce7376fe9",
        SourceId: "663b3ba6b255b30414c52ab5",
        Name: "Thông báo quan trọng",
        Content: "Đã có sự cố trong hệ thống, hãy kiểm tra lại.",
        Date: "14/01/2023",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba6dd9eedbf25534de7",
        DestinationId: "663b3ba68e9841fb637d02c9",
        SourceId: "663b3ba6a1cb81147a620560",
        Name: "Thông báo sự kiện",
        Content: "Hãy làm bài trắc nghiệm mới nhất.",
        Date: "27/01/2024",
        IsRead: false,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba6d23779eca52da392",
        DestinationId: "663b3ba6e7f3dcbd18081a77",
        SourceId: "663b3ba6213b11cf83a761b8",
        Name: "Thông báo sự kiện",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "12/11/2023",
        IsRead: false,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba6e03251c79ec0ac40",
        DestinationId: "663b3ba6db06678d0a89a7fc",
        SourceId: "663b3ba68d2608acd359467b",
        Name: "Thông báo cập nhật",
        Content: "Bạn đã nhận được một tin nhắn mới.",
        Date: "17/07/2023",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba602b9b961d97e7210",
        DestinationId: "663b3ba6f82d4c49dc1e049f",
        SourceId: "663b3ba6da421758d052ae89",
        Name: "Thông báo mới",
        Content: "Bạn đã nhận được một tin nhắn mới.",
        Date: "15/07/2022",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba64f457b65a0bdd982",
        DestinationId: "663b3ba62cb52dfaa914809d",
        SourceId: "663b3ba6e89585f3251dd139",
        Name: "Thông báo cập nhật",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "29/10/2024",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba62ccdfb2207a0c3b6",
        DestinationId: "663b3ba6a7b8b43548ba8d96",
        SourceId: "663b3ba6b76a9e087507372c",
        Name: "Thông báo quan trọng",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "08/10/2024",
        IsRead: false,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba68615fc6df1e635ff",
        DestinationId: "663b3ba696f2787e56d99665",
        SourceId: "663b3ba6d1503d63e84e4820",
        Name: "Thông báo sự kiện",
        Content: "Hãy kiểm tra kết quả của bạn.",
        Date: "23/08/2022",
        IsRead: false,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba625d6fc3be65a2183",
        DestinationId: "663b3ba6cfb3864a42ca55ca",
        SourceId: "663b3ba690bff5b064e4e921",
        Name: "Thông báo sự kiện",
        Content: "Bạn đã nhận được một tin nhắn mới.",
        Date: "28/06/2024",
        IsRead: true,
        IsVisible: true,
    },

    {
        NotificationId: "663b3ba62e451e1a9e2c87be",
        DestinationId: "663b3ba6f7d044a678b4ca8a",
        SourceId: "663b3ba6682bfd2ee5a1bb55",
        Name: "Thông báo quan trọng",
        Content: "Đã có sự cố trong hệ thống, hãy kiểm tra lại.",
        Date: "24/09/2024",
        IsRead: false,
        IsVisible: true,
    },
];

const columns_data = [
    { accessor: "SourceId", header: "Người gửi" },
    { accessor: "Name", header: "Tựa đề" },
    { accessor: "Content", header: "Nội dung" },
    { accessor: "Date", header: "Ngày" },
    { accessor: "IsRead", header: "Đã đọc" },
];

const action_col = <ActionColumn isDelete={true} isRead={true} isUpdate={false} />

const header_class_condition = [{}];

export default function Notification() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Thông báo" mtf_props={mtf_props} />;
}
