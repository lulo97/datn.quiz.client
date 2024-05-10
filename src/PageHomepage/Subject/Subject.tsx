import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import SubjectCard from "./SubjectCard";

interface SubjectProps {
    SubjectId: string;
}

export default function Subject(props: SubjectProps) {
    const { SubjectId } = props;
    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <CardTitle>{SubjectId}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                    </div>
                </CardContent>
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
        </div>
    );
}
