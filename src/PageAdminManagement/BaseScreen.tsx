import { MyTableFactoryProps } from "@/Interfaces";
import MyTableFactory from "@/components/table/MyTableFactory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BaseScreenProps {
    screen_title: string,
    mtf_props: MyTableFactoryProps
}

export default function BaseScreen(props: BaseScreenProps) {
    const { screen_title, mtf_props } = props
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="h-1/6">
                <div className="flex justify-between">
                    <CardTitle>{screen_title}</CardTitle>
                    <Button>Thêm</Button>
                </div>
            </CardHeader>
            <CardContent className="h-5/6">
                {MyTableFactory(mtf_props)}
            </CardContent>
        </Card>
    );
}
