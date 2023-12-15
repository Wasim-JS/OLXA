import "./Profile.scss";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { uplaodProfileImage } from "../../utiles/uploadImage";
import useAlert from "../../Custom Hooks/alert";
import { sendToken } from "../../utiles/userFetch";
import {useDispatch} from 'react-redux'
import { updateUserDataOnLogin } from "../../redux-store/userSlice";

const Profile = () => {
  const {user} = useSelector(state=>state.user)
  const [file, setFile] = useState(null);
  const [alertFun] = useAlert()
  const dispatch = useDispatch()

  const[isLoading,setIsLoading]=useState(false)
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "2px",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: "2px",
  });

  useEffect(()=>{
    if(file){
    console.log("file is ",file)
    const formData = new FormData();
    formData.append('profilePic', file);
    uplaodProfileImage(formData).then(data=>{
       alertFun('success',data.message)
       
       sendToken().then(data=>{
        dispatch(updateUserDataOnLogin(data))

      }).catch(error=>console.log(error))
      setIsLoading(false)
    })
  }
  },[file])

  const handleUpload = (e) => {

    setFile(e.target.files[0]);
    setIsLoading(true)
    
  };
  return (

      <div className="profile">
        <div className="left">
          <div className="left-img">
            {
              isLoading && <div className="img-loading">
              <Box sx={{ display: "flex", width: 100, height: 100 }}>
                <CircularProgress size={100} thickness={2} />
              </Box>
            </div>
            }
            <img
              className="img"
              src={user?.avatar[0]?.cloudLink || "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"}
              alt=""
            />
            <Button
              component="label"
              className="file-upload"
              variant="contained"
              startIcon={<RiEdit2Fill />}
            >
              <VisuallyHiddenInput type="file" onChange={handleUpload} />
            </Button>
          </div>
        </div>
        <div className="right">
          <div className="right-info">
            <p>
              <span>Name: </span> <span className="data">{user?.name}</span>
            </p>
            <p>
              <span>Email: </span> <span className="data">{user?.email}</span>
            </p>
            <p>
              <span>Phone: </span> <span className="data">{user?.phone}</span>
            </p>
            <p>
              <span>Country: </span> <span className="data">{user?.country}</span>
            </p>
            <p>
              <span>State: </span> <span className="data">{user?.state}</span>
            </p>
            <p>
              <span>City: </span> <span className="data">{user?.city}</span>
            </p>
           
          </div>
        </div>
      </div>

  );
};

export default Profile;
