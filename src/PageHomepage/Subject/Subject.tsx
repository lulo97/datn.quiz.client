import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import SubjectCard from "./SubjectCard";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";

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
                    <Content />
                </CardContent>
                <CardFooter>
                    <Footer />
                </CardFooter>
            </Card>
        </div>
    );
}
