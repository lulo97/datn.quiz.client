import { Link } from "react-router-dom";
import { components } from "@/main";
import { Card } from "@/components/ui/card";

export function App() {
    return (
        <div>
            <Card className="p-2">
                <ul>
                    {components.map((ele) => (
                        <li key={ele.name}>
                            <Link to={ele.name}>{ele.name}</Link>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}
