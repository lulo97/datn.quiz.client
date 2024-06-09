import { Button } from "@/components/ui/button";
import { AIProps } from "../Utils";
import { toast } from "react-toastify";
import { generateQuestion } from "../Api.ts";

export function Footer(props: AIProps) {
    const { state, setState } = props;
    async function handleCreate() {
        if (state.Text.length < 30) {
            toast.warning("Độ dài đoạn văn phải hơn 30 chữ!");
            return;
        }
        if (!state.NumberOfQuestion) {
            toast.warning("Hãy số lượng câu hỏi!");
            return;
        }
        if (!state.DifficultLevel) {
            toast.warning("Hãy chọn độ khó câu hỏi!");
            return;
        }
        if (!state.Language) {
            toast.warning("Hãy chọn ngôn ngữ!");
            return;
        }
        if (!state.Type) {
            toast.warning("Hãy chọn loại trắc nghiệm!");
            return;
        }
        const Output = await generateQuestion(state);
        if (Output) {
            setState({ ...state, Output: Output });
        }
    }
    return (
        <div>
            <Button onClick={handleCreate}>Tạo</Button>
        </div>
    );
}
