import { useEffect, useState } from "react";
import UserNavbar from "../../components/ui/user-navbar/UserNavbar";
import { useAuth } from "../../contexts/auth.context";
import { useAlert } from "../../contexts/alert.context";

function UserConfigsList() {
  return <UserNavbar activeTab="My Configurations" />;
}
export default UserConfigsList;
