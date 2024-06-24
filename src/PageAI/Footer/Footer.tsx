import { Button } from "@/components/ui/button";
import { AIProps, getErrors } from "../Utils";
import { toast } from "react-toastify";
import { generateQuestion } from "../Api.ts";

export function Footer(props: AIProps) {
    const { state, setState } = props;
    async function handleCreate() {
        try {
            const id = toast.loading("Đang tạo câu hỏi...");
            const errors = getErrors(state);
            for (let i = 0; i < errors.length; i++) {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        toast.warning(errors[i]);
                        resolve();
                    }, 100 * i);
                });
            }
            if (errors.length > 0) return;
            const Output = await generateQuestion(state);
            if (Output) {
                setState({ ...state, Output: Output });
                toast.update(id, {
                    render: "Tạo thành công!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                });
            }
        } catch (error) {
            toast.error("Lỗi tạo câu hỏi?");
            console.log(error);
        }
    }
    return (
        <div>
            <Button onClick={handleCreate}>Tạo</Button>
        </div>
    );
}
