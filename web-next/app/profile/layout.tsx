import UserNavbar from "@/components/custom/layout/UserNavbar";
import { requireUser } from "@/lib/auth";

/**
 * One guard for every profile route: the segment cannot render at all without
 * a session, so no protected markup is ever sent to a signed-out visitor.
 */
const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireUser();

  return (
    <div className="flex flex-col md:flex-row md:gap-10">
      <UserNavbar />
      <div className="flex-1 px-4 py-12">{children}</div>
    </div>
  );
};

export default ProfileLayout;
