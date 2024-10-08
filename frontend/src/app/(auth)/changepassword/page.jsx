import Password from "@/components/auth/Password";
import ProtectedRoutes from "@/components/auth/ProtectedRoutes";

export default function Page() {
  return (
    <ProtectedRoutes>
      <div className="min-h-[80vh] flex items-center w-screen flex-col gap-7 justify-center">
        <Password />
      </div>
    </ProtectedRoutes>
  );
}
