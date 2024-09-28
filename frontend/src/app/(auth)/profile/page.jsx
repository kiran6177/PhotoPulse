import ProfileComponent from "@/Components/auth/ProfileComponent";
import ProtectedRoutes from "@/Components/auth/ProtectedRoutes";

export default function Page() {

  return (
    <ProtectedRoutes>
    <div className="min-h-[80vh] flex items-center w-full flex-col gap-7 justify-start pt-[5rem]">
      <ProfileComponent/>
    </div>
    </ProtectedRoutes>
  );
}
