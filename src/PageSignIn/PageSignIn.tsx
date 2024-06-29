import { SignIn } from "@clerk/clerk-react";

export function SignInPage() {
    return (
        <div className="mt-3 flex justify-center items-center">
            <SignIn path="/dang-nhap" />
        </div>
    );
}
