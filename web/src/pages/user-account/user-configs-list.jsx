import { useEffect, useState } from "react";
import UserNavbar from "../../components/ui/user-navbar/UserNavbar";
import ConfigsList from "../../components/configurator/configs-list/ConfigsList";
import { useAuth } from "../../contexts/auth.context";

function UserConfigsList() {
  return (
    <div className="container-fluid">
      <div className="row d-flex align-self-stretch">
        <UserNavbar activeTab="My Configurations" />
        <div className="col-sm-8 col-md-8 col-lg-8 mt-5">
          <h1 className="text-light mb-5">Saved Configurations</h1>
          <ConfigsList />
        </div>
      </div>
    </div>
  );
}
export default UserConfigsList;
