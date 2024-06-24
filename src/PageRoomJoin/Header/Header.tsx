import { CustomCSSProperties } from "@/Utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        RoomId: "",
        Password: "",
    });
    function handleJoin() {
        if (state.RoomId != "") {
            navigate(`/RoomView/${state.RoomId}`);
        }
    }
    return (
        <div className="flex flex-col gap-5">
            <div>
                <Label>Nhập đường dẫn phòng</Label>
                <Input
                    value={state.RoomId}
                    onChange={(e) =>
                        setState({ ...state, RoomId: e.target.value })
                    }
                    placeholder="https://www.example.com"
                />
            </div>
            <div>
                <Label>Nhập mật khẩu phòng</Label>
                <Input
                    value={state.Password}
                    onChange={(e) =>
                        setState({ ...state, Password: e.target.value })
                    }
                    placeholder="Mật khẩu..."
                    type="text"
                    style={
                        {
                            WebkitTextSecurity: "disc",
                        } as CustomCSSProperties
                    }
                />
            </div>
            <Button onClick={handleJoin}>Vào phòng</Button>
        </div>
    );
}
