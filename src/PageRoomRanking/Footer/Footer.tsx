import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Footer() {
    const navigate = useNavigate()
    return (
        <div className="w-full flex justify-between">
            <Button>Xuất dữ liệu</Button>
            <Button onClick={() => navigate("/")}>Thoát</Button>
        </div>
    );
}
