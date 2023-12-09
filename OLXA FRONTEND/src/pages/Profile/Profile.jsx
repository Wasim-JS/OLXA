import Layout from "../../components/Layout/Layout";
import "./Profile.scss";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useState } from "react";

const Profile = () => {
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

  const handleUpload = (e) => {
    console.log(e.target.value);
  };
  return (
    <Layout>
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
              src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
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
              <span>Name: </span> <span className="data">Jhon</span>
            </p>
            <p>
              <span>Email: </span> <span className="data">j@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;