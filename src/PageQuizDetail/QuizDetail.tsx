import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

export default function QuizDetail() {
    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <Header />
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
