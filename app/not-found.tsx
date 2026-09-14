import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { Card } from "@/components/shadcn/card";

const NotFound = () => (
  <div className="container mx-auto px-4 py-12">
    <Card className="mx-auto max-w-xl rounded-none border-neutral-700 bg-neutral-800 p-8 shadow-lg">
      <h1 className="mb-3 text-3xl font-semibold">Page not found</h1>
      <p className="text-neutral-400">
        That page does not exist. The configurator is a good place to start.
      </p>
      <Button asChild className="mt-6 h-11 w-fit rounded-none px-6 text-base">
        <Link href="/configurator">Create Your Design</Link>
      </Button>
    </Card>
  </div>
);

export default NotFound;
