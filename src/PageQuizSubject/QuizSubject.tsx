import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { QuizCardDetail } from "@/components/quiz_card/QuizCardDetailed";

interface SubjectProps {
    SubjectId: string;
}

export function QuizSubject(props: SubjectProps) {
    const { SubjectId } = props;
    return (
            <Card>
                <CardHeader>
                    <CardTitle>{SubjectId}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
                        <QuizCardDetail />
                        <QuizCardDetail />
                        <QuizCardDetail />
                        <QuizCardDetail />
                        <QuizCardDetail />
                        <QuizCardDetail />
                    </div>
                </CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
    );
}
