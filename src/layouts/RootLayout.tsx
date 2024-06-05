import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/clerk-react";
import { Header } from "@/PageHomepage/Header/Header";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

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