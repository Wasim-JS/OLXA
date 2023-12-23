import "./SellInfoForm.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormControlLabel } from "@mui/material";
import Stepper from "../../components/Stepper/Stepper";
import CircularProgress from '@mui/material/CircularProgress';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import useAlert from "../../Custom Hooks/alert";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import { allProducts } from "../../utiles/FetchReletedRecords";
import { addProducts } from "../../redux-store/productsSlice";

const SellInfoForm = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  const [done, setDone] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const [approveProduct, setApproveProduct] = useState(false);
  const [showsimage, setShowSImage] = useState(false);
  const [pimages, setPimages] = useState([]);
  const [showData, setShowData] = useState(false);
  const [formData,setFormData] = useState({name:"",year:"",price:"",category:"",hasWarranty:false,hasBill:false,desc:"",pimages:[]})
  const [alertFun] = useAlert()
 
 useEffect(()=>{
   console.log(formData);
 },[showData])
  const handleStepper = (num) => {
    setDone(num);
  };

  const handleFormData = () =>{
    
    const {name,year,price,category,desc,street,city,state,country} = formData;
    if([name,year,price,category,desc,street,city,state,country].some(feild => feild === ""))
    {
      alertFun('error',"All Fields are requried")
      console.log(formData)
      return
    }

    if(isNaN(year) )
    {
      alertFun('error',"Enter the Valid year")
      return
    }
    if(year < 1800 )
    {
      alertFun('error',"Enter the Valid year")
      return
    }
    if(Number(year) > new Date().getFullYear())
    {
      alertFun('error',"Year you have mentioned is greater than the current year")
      return
    }
    if(isNaN(price))
    {
      alertFun('error',"Enter the Valid Price")
      return
    }
    handleStepper(1)
  }

  const handleImageUploads = ({target}) =>{
  
    const productFiles = Array.from(target.files)

    if (productFiles.length > 3 || productFiles.length < 3 || productFiles.length===0) {
      alertFun('error',"Select Excatly 3 Images")
      return;
    }

    setImgLoading(true)
    setShowSImage(true)
     
    const imageUrls = productFiles.map(imgs=>(
       URL.createObjectURL(imgs)
    ))
    setTimeout(()=>{

      setPimages(imageUrls)
      setShowSImage(false)
      setFormData(prev=>({...prev,pimages:productFiles}))
      setShowData(true)
       
    },2000)
  }

  const handelSell = async () =>{
   
    console.log("sell from data" ,formData)
    const {name,year,price,category,hasWarranty,hasBill,desc,street,city,state,country,pimages} = formData;
    if(pimages.length !== 3)
    {
      alertFun('error',"Select Excatly 3 Images")
      return;
    }
    const sendFormData =  new FormData();
    sendFormData.append('name', name); 
    sendFormData.append('year', year); 
    sendFormData.append('price', price); 
    sendFormData.append('category', category); 
    sendFormData.append('hasWarranty', hasWarranty); 
    sendFormData.append('hasBill', hasBill); 
    sendFormData.append('street', street); 
    sendFormData.append('city', city); 
    sendFormData.append('state', state); 
    sendFormData.append('country', country); 
    sendFormData.append('desc', desc); 
    sendFormData.append("pimages", pimages[0]); // Assuming images is an array of File objects
    sendFormData.append("pimages", pimages[1]);
    sendFormData.append("pimages", pimages[2]);
    sendFormData.append('owner',user._id ); 
    handleStepper(3)

    try {
      console.log("from front",sendFormData);
      setApproveProduct(true)
      const productData = await axios.post('/api/v1/product/create-product',sendFormData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const res = productData.data;
      setApproveProduct(false)
      alertFun('success',res.message)
      allProducts().then(data => dispatch(addProducts(data?.products)))
      .catch(error=>console.log(error))
      
    } catch (error) {
     console.log(error)
     setApproveProduct(false)
      alertFun('error',error?.response?.data.message)
    }

  }

  const handleDone = () =>{
    handleStepper(0)
    setPimages([])
    setFormData({name:"",year:"",price:0,category:"",hasWarranty:false,hasBill:false,desc:"",country:"",state:"",city:"",street:"",pimages:[]})
  }
 

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
          <input name="name" value={formData.name} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="Product Name" />
          <input name="year" value={formData.year} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="Model in Years" />
          <input name="price" value={formData.price} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="Price" />
          <input name="country" value={formData.country} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="Country" />
          <input name="state" value={formData.state} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="State" />
          <input name="city" value={formData.city} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="City" />
          <input name="street" value={formData.street} type="text" onChange={({target})=>setFormData({...formData,[target.name]:target.value})} placeholder="Street" />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formData.category}
              label="Catrgory"
              name="category"
              onChange={({target})=>setFormData({...formData,[target.name]:target.value})}
            >
              <MenuItem value={formData.category}></MenuItem>
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
                  checked={formData.hasWarranty}
                  onClick={({target})=>setFormData({...formData,[target.name]:!formData.hasWarranty})}
                  name="hasWarranty"
                />
              }
              label="Warranty Available?"
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={formData.hasBill}
                onClick={({target})=>setFormData({...formData,[target.name]:!formData.hasBill})}
                  name="hasBill"
                />
              }
              label="Bill & Box Available?"
            />
          </div>

          <textarea
            className="textarea"
            placeholder="Write A Breif Description about your Product..."
            name="desc"
            id=""
            cols="30"
            rows="10"
            value={formData.desc}
            onChange={({target})=>setFormData({...formData,[target.name]:target.value})}
          ></textarea>
          <Button
            className="reg-btn"
            onClick={handleFormData}
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
                Upload file(3 Images)
                <input style={style} name="productImages" className="inpFile" type="file" multiple={true} onChange={handleImageUploads} />
              </Button>
  
              <div className="images">

                {
                imgLoading && showsimage && <div className="pimgLoading">
                   <div>
                    <div className="sdiv"></div>
                   </div>

                   <div>
                    <div className="sdiv"></div>
                   </div>
                   <div>
                    <div className="sdiv"></div>
                   </div>
                   
               </div>
                }
                  {
                    imgLoading && !showsimage && pimages.map((img,i)=>(
                          <img key={i} src={img} alt="img" />
                      ))
                  }
                  
                 
              </div>
            </div>
           
  
            <Button
              className="reg-btn"
              sx={{ color: "white" }}
              onClick={handelSell}
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
                approveProduct?(
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
              onClick={handleDone}
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
