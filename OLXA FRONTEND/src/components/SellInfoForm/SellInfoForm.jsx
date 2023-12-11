import "./SellInfoForm.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormControlLabel } from "@mui/material";
import Stepper from "../../components/Stepper/Stepper";
import CircularProgress from '@mui/material/CircularProgress';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const SellInfoForm = () => {
  const [category, setCategory] = useState("");
  const [done, setDone] = useState(0);
  const [imgs, setImgs] = useState(["https://betanews.com/wp-content/uploads/2014/11/front.jpg","https://betanews.com/wp-content/uploads/2014/11/front.jpg","https://betanews.com/wp-content/uploads/2014/11/front.jpg"]);
  const [imgLoading, setImgLoading] = useState(false);

  const [ch, setCh] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStepper = (num) => {
    setDone(num);
  };
 

  const style = {
    clip: "rect(0 0 0 0)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    width: 1,
    
  };
  return (
    <form>
      <h2 style={{ textDecoration: "underline" }}>Sell Your Product</h2>
      <Stepper done={done} />
      {done === 0 ? (
        <>
          <input type="text" placeholder="Product Name" />
          <input type="text" placeholder="Model in Years" />
          <input type="text" placeholder="Price" />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Catrgory"
              onChange={handleChange}
            >
              <MenuItem value={category}></MenuItem>
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"mobile"}>Mobiles</MenuItem>
              <MenuItem value={"car"}>Cars</MenuItem>
              <MenuItem value={"bike"}>Bikes</MenuItem>
            </Select>
          </FormControl>

          <div className="checkboxes">
            <FormControlLabel
              control={
                <Checkbox
                  checked={ch}
                  onClick={() => setCh((prev) => !prev)}
                  name="warranty?"
                />
              }
              label="Warranty Available?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ch}
                  onClick={() => setCh((prev) => !prev)}
                  name="warranty?"
                />
              }
              label="Bill & Box Available?"
            />
          </div>

          <textarea
            className="textarea"
            placeholder="Write A Breif Description about your Product..."
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <Button
            className="reg-btn"
            onClick={()=>handleStepper(1)}
            sx={{ color: "white" }}
            variant="contained"
            color="main"
          >
            Upload Images
          </Button>
        </>
      ) : (
          done===1?(<>
            <div>
              <Button
                component="label"
                variant="contained"
                className="inpFile"
                
              >
                Upload file
                <input style={style} className="inpFile" type="file" multiple={true} />
              </Button>
  
              <div className="images">
                  {
                      imgs.map((img,i)=>(
                          <img key={i} src={img} alt="img" />
                      ))
                  }
                  
                 
              </div>
            </div>
           
  
            <Button
              className="reg-btn"
              sx={{ color: "white" }}
              onClick={()=>handleStepper(3)}
              variant="contained"
              color="main"
            >
              Sell
            </Button>
            <Button
              className="reg-btn"
              onClick={()=>handleStepper(0)}
              sx={{ color: "white" }}
              variant="contained"
              color="main"
            >
              Go Back
            </Button>
            
          </>):(
            <div className="finished">
              
              {
                imgLoading?(
                    <div className="loading">
                      <CircularProgress size={100} />
                    </div>
                ):(
                <div className="loadingDone">
                   
                   <div className="done-icon">
                   <IoCheckmarkDoneCircleSharp color="skyblue" size={120}/>


                   </div>
                   <p>Your Product Will be Listed Once It Approves</p>
              
                   <Button
              className="reg-btn"
              onClick={()=>handleStepper(0)}
              sx={{ color: "white" }}
              variant="contained"
              color="main"
            >
              Done
            </Button>
                </div>
                    )
              }

             
            </div>
          )
      )}
    </form>
  );
};

export default SellInfoForm;
