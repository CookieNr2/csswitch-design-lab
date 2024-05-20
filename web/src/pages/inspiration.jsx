import ConfigsList from "../components/configurator/configs-list/ConfigsList";

function Inspiration() {
  return (
    <>
      <div className="container">
        <h1 className="text-light my-4">Inspiration Gallery</h1>
      </div>
      <div className="container-fluid d-flex flex-column my-5">
        <ConfigsList />
      </div>
    </>
  );
}
export default Inspiration;
