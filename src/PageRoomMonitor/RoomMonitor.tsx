import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Content } from "./Content/Content";

export function RoomMonitor() {
    return (
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
    );
}
