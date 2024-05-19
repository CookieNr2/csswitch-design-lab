import ConfigsList from "../components/configurator/configs-list/ConfigsList";

function Home() {
  return (
    <>
      <div className="banner d-flex justify-content-around align-items-center flex-wrap p-5 mb-5">
        <div className="text-left text-white">
          <h1 className="mb-3">Tailor Your Experience</h1>
          <h4 className="mb-3">
            Customize and Optimize Your CSSwitch Settings with Ease
          </h4>
          <a
            data-mdb-ripple-init
            className="btn btn-lg btn-primary rounded-0"
            href="/configurator"
            role="button"
          >
            Create Your Design
          </a>
        </div>
        <div>
          <img
            className="img-banner"
            src="/csswitch-banner.png"
            alt="CSSwitch Design Lab"
          />
        </div>
      </div>
      <div className="container-fluid d-flex flex-column">
        <ConfigsList />
        <button
          type="button"
          className="btn btn-lg btn-outline-light align-self-center rounded-0 my-5"
        >
          Find more inspiration
        </button>
      </div>
    </>
  );
}
export default Home;
