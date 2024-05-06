import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";

export default function QuizResultTime() {
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