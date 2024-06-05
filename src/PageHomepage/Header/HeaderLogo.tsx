import { useNavigate } from "react-router-dom";

export function HeaderLogo() {
    const navigate = useNavigate();

    return (
        <div className="text-xl font-bold" onClick={() => navigate("/")}>
            QuizQuest
        </div>
    );
}
