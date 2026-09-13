import Image from "next/image";
import Link from "next/link";
import ConfigsList from "@/components/custom/configurator/ConfigsList";
import { Button } from "@/components/shadcn/button";
import { getPopularConfigs } from "@/lib/queries";

const HomePage = async () => {
  const popular = await getPopularConfigs(6);

  return (
    <>
      <div className="mb-12 flex min-h-[35vw] flex-wrap items-center justify-around gap-6 bg-linear-144 from-teal-500 to-yellow-800 p-10">
        <div className="text-white">
          <h1 className="mb-3 text-4xl font-semibold md:text-5xl">
            Tailor Your Experience
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Customize and Optimize Your CSSwitch Settings with Ease
          </p>
          <Button asChild className="h-11 rounded-none px-6 text-base">
            <Link href="/configurator">Create Your Design</Link>
          </Button>
        </div>
        <div>
          <Image
            className="w-full max-w-2xl"
            src="/csswitch-banner.png"
            alt="CSSwitch Design Lab"
            width={700}
            height={394}
            // The width is set in CSS; height must follow to keep the ratio.
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      <div className="flex flex-col px-2">
        <ConfigsList
          configs={popular.map((colors, index) => ({ id: `popular-${index}`, colors }))}
          emptyMessage="No designs have been saved yet — be the first."
        />
        <Button
          asChild
          variant="outline"
          className="my-12 h-11 self-center rounded-none px-6 text-base"
        >
          <Link href="/inspiration">Find more inspiration</Link>
        </Button>
      </div>
    </>
  );
};

export default HomePage;
