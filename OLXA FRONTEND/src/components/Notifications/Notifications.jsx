import { IoIosNotifications } from "react-icons/io";
import Modals from "../Modal/Modal";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";



const Notifications = () => {
  const { user } = useSelector((state) => state.user); 
 
  return (
    <Modals>
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color="secondary"
        badgeContent={user?.noOfNotifications}
      >
        <IoIosNotifications size={30} />
      </Badge>
    </Modals>
  );
};

export default Notifications;
