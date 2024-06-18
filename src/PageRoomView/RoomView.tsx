import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
} from "@/components/ui/card";
import { Header } from "./Header/Header";

export function RoomView() {
    return (
            <Card>
                <CardHeader>
                    <Header />
                </CardHeader>
            </Card>
    );
}
