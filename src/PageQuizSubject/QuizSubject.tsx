import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { QuizSubjectCard } from "./QuizSubjectCard";

interface SubjectProps {
    SubjectId: string;
}

export function QuizSubject(props: SubjectProps) {
    const { SubjectId } = props;
    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <CardTitle>{SubjectId}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
                        <QuizSubjectCard />
                        <QuizSubjectCard />
                        <QuizSubjectCard />
                        <QuizSubjectCard />
                        <QuizSubjectCard />
                        <QuizSubjectCard />
                    </div>
                </CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        </div>
    );
}
