import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { CardParentClass } from "@/Utils";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";

export function CreateQuiz() {
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
