import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
} from "@/components/ui/card";
import { Header } from "./Header/Header";

export function CreateRoom() {
    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <Header />
                </CardHeader>
            </Card>
        </div>
    );
}
