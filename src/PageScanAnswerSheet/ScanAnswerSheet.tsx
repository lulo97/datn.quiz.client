import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";

export function ScanAnswerSheet() {

    return (
        <Card>
            <CardHeader>
                <Header />
            </CardHeader>
            <CardContent>
                <Content />
            </CardContent>
        </Card>
    );
}
