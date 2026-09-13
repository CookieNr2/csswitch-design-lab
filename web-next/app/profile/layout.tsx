import UserNavbar from "@/components/ui/UserNavbar";
import { requireUser } from "@/lib/auth";

/**
 * One guard for every profile route: the segment cannot render at all without
 * a session, so no protected markup is ever sent to a signed-out visitor.
 */
const ProfileLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requireUser();

  return (
    <div className="container-fluid">
      <div className="row d-flex align-self-stretch">
        <UserNavbar />
        <div className="col-sm-8 col-md-8 col-lg-8 mt-5">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
