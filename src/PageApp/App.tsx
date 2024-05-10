import { Link } from "react-router-dom";
import { components } from "@/main";

export function App() {
    return (
        <div>
            <ul>
                {components.map((ele) => (
                    <li key={ele.name}>
                        <Link to={ele.name}>{ele.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
