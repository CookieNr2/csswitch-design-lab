import UserNavbar from "./_components/UserNavbar";

/**
 * Shared chrome only. The session check lives in each profile page instead: a
 * layout does not re-render on navigation and does not stop its pages from
 * rendering, so it cannot act as the guard. Leaving the session read out of
 * here also lets this shell be prerendered.
 */
const ProfileLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:gap-10">
    <UserNavbar />
    <div className="flex-1 px-4 py-12">{children}</div>
  </div>
);

export default ProfileLayout;
