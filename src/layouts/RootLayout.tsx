import { Outlet, useNavigate } from "react-router-dom";
import {
    ClerkProvider,
} from "@clerk/clerk-react";
import { PUBLISHABLE_KEY } from "@/Utils";

export function RootLayout() {
    const navigate = useNavigate();
    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    );
}
