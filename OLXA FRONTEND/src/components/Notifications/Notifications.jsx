import { IoIosNotifications } from "react-icons/io";
import Modals from "../Modal/Modal";
import Badge from "@mui/material/Badge";

const Notifications = () => {
  return (
    <Modals>
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color="secondary"
        badgeContent={100}
      >
        <IoIosNotifications size={30} />
      </Badge>
    </Modals>
  );
};

export default Notifications;
