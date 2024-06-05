import { SignUp } from "@clerk/clerk-react";

export function SignUpPage() {
    return (
        <div className="mt-3 flex justify-center items-center">
            <SignUp path="/sign-up" />
        </div>
    );
}
