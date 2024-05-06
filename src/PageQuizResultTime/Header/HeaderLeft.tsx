import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function HeaderLeft() {
    return (
        <div className="w-2/3">
            <Card className="min-h-full">
                <CardHeader>
                    <CardTitle>Đề toán lớp 12 chương Hàm Số</CardTitle>
                    <CardDescription>
                        Khảo sát sự biến thiên và vẽ đồ thị hàm số lớp 12
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img
                        className="object-contain rounded-lg"
                        src="https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp"
                    ></img>
                </CardContent>
                <CardFooter className="flex gap-5 justify-between">
                        <Button className="w-full">Lịch sử chơi</Button>
                        <Button className="w-full">Chia sẻ</Button>
                        <Button className="w-full">Báo cáo</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
