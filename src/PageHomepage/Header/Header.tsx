import { getObjectId } from "@/Utils";
import { Card } from "@/components/ui/card";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderMenubar } from "./HeaderMenubar";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderUserButton } from "./HeaderUserButton";

export const smi = [
    { SubjectId: getObjectId(), Name: "Toán", UrlName: "toan" },
    { SubjectId: getObjectId(), Name: "Văn", UrlName: "van" },
    { SubjectId: getObjectId(), Name: "Anh", UrlName: "anh" },
    { SubjectId: getObjectId(), Name: "Lịch sử", UrlName: "lich_su" },
    { SubjectId: getObjectId(), Name: "Địa lý", UrlName: "dia_ly" },
    { SubjectId: getObjectId(), Name: "Vật lí", UrlName: "vat_li" },
    { SubjectId: getObjectId(), Name: "Hóa học", UrlName: "hoa_hoc" },
    { SubjectId: getObjectId(), Name: "Sinh học", UrlName: "sinh_hoc" },
    { SubjectId: getObjectId(), Name: "Tin học", UrlName: "tin_hoc" },
    {
        SubjectId: getObjectId(),
        Name: "Giáo dục công dân",
        UrlName: "giao_duc_cong_dan",
    },
    {
        SubjectId: getObjectId(),
        Name: "Giáo dục thể chất",
        UrlName: "giao_duc_the_chat",
    },
];

export function Header() {
    return (
        <Card className="py-2 px-4 flex items-center justify-between bg-white">
            <HeaderLogo />
            <HeaderMenubar />
            <HeaderSearch />
            <HeaderUserButton />
        </Card>
    );
}
