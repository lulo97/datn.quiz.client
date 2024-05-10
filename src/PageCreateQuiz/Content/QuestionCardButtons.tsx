import { Button } from "@/components/ui/button";
import { SquarePen, X } from "lucide-react";

export function QuestionCardButtons() {
    return (
        <div className="w-full flex justify-between">
            <Button className="bg-blue-500">
                <SquarePen />
            </Button>
            <Button className="bg-red-500">
                <X />
            </Button>
        </div>
    );
}
