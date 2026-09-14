import { Card } from "@/components/shadcn/card";

/**
 * The card that frames the login and registration forms. The "already signed
 * in" redirect stays in each page: layouts do not re-render on navigation, so a
 * check here would not run on every visit.
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto flex justify-center px-4 py-12">
    <Card className="w-full max-w-md rounded-none border-neutral-700 bg-neutral-800 p-0 shadow-lg">
      {children}
    </Card>
  </div>
);

export default AuthLayout;
