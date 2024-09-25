import SignupForm from "@/Components/auth/SignupForm";

export default function Page() {
    return (
        <div className="min-h-[80vh] flex items-center w-screen flex-col gap-7 justify-center">
            <div >
                <h1 className="text-white tracking-widest text-lg">SIGNUP</h1>
            </div>
            <div className="w-full">
                <SignupForm/>
            </div>
        </div>
    );
}