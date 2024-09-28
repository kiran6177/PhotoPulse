import LoginForm from "@/components/auth/LoginForm";

export default function Page() {
    return (
        <div className="min-h-[80vh] pt-[8rem] flex items-center w-screen flex-col gap-7 justify-center">
            <div className="">
                <h1 className="text-white tracking-widest text-lg">LOGIN</h1>
            </div>
            <div className="w-full">
                <LoginForm/>
            </div>
        </div>
    );
}