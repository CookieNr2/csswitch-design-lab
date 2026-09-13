import Image from "next/image";
import Link from "next/link";
import ConfigsList from "@/components/configurator/ConfigsList";
import { getPopularConfigs } from "@/lib/queries";

const HomePage = async () => {
  const popular = await getPopularConfigs(6);

  return (
    <>
      <div className="banner d-flex justify-content-around align-items-center flex-wrap p-5 mb-5">
        <div className="text-left text-white">
          <h1 className="mb-3">Tailor Your Experience</h1>
          <h4 className="mb-3">
            Customize and Optimize Your CSSwitch Settings with Ease
          </h4>
          <Link className="btn btn-lg btn-primary rounded-0" href="/configurator">
            Create Your Design
          </Link>
        </div>
        <div>
          <Image
            className="img-banner"
            src="/csswitch-banner.png"
            alt="CSSwitch Design Lab"
            width={700}
            height={394}
            // .img-banner sets width in CSS; height must follow to keep the ratio.
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      <div className="container-fluid d-flex flex-column">
        <ConfigsList
          configs={popular.map((colors, index) => ({ id: `popular-${index}`, colors }))}
          emptyMessage="No designs have been saved yet — be the first."
        />
        <Link
          href="/inspiration"
          className="btn btn-lg btn-outline-light align-self-center rounded-0 my-5"
        >
          Find more inspiration
        </Link>
      </div>
    </>
  );
};

export default HomePage;
