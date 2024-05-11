import { CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { Label } from "@/components/ui/label";
import { QuizCardSimple } from "@/components/quiz_card/QuizCardSimple";

interface QuizCardCollectionProps {
    label: string;
}

export function QuizCardCollection(props: QuizCardCollectionProps) {
    const { label } = props;

    return (
        <div>
            <Label>{label}</Label>
            <CardHeader className="border rounded-lg flex flex-row">
                <div className="flex flex-row items-center justify-between gap-2 w-11/12">
                    <QuizCardSimple />
                    <QuizCardSimple />
                    <QuizCardSimple />
                </div>
                <div className="w-1/12 flex items-center justify-end">
                    <ChevronRight size={64} />
                </div>
            </CardHeader>
        </div>
    );
}
