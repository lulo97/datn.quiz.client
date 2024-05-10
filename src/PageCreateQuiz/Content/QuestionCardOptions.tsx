import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function QuestionCardOptions() {
    return (
        <div>
            <Label>Các lựa chọn:</Label>
            <div className="p-1 flex flex-col gap-1 overflow-y-scroll h-[200px]">
                <Input className="bg-green-300" defaultValue={"Chó"}></Input>
                <Input className="" defaultValue={"Mèo"}></Input>
                <Input className="bg-green-300" defaultValue={"Cá"}></Input>
                <Input className="" defaultValue={"Hổ"}></Input>
            </div>
        </div>
    );
}
