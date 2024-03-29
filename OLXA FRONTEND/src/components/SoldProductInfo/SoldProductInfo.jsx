import ProcessBar from '../ProcessBar/ProcessBar';
import './SoldProductInfo.scss'
import PropTypes from 'prop-types';
import {formatter} from '../../utiles/showMoney'
import axios from 'axios';
import useAlert from '../../Custom Hooks/alert';
import { RxCross1 } from "react-icons/rx";
import { MdFileDownloadDone } from "react-icons/md";


const SoldProductInfo = ({fetchReletedProducts,name,sold,product,year,price,img,desc,approved}) => {
  const [alertFun] = useAlert();
  console.log(product)

  const handleSold = async () =>{

    try {
      const soldProduct = await axios.get(`/api/v1/product/sold-product/${product}`);
      const res = soldProduct.data
      fetchReletedProducts()
      alertFun('success',res.message)
    } catch (error) {
      console.log(error);
      alertFun('error','something went wrong while solding')
    }
  }
   
  
  return (
    <div className='product'>
      <div className={`${sold !== "yes"?"soldBtn":"aSoldBtn"}`}>
        {
         approved && <button disabled={sold === "yes"} onClick={()=>handleSold()}>Sold</button>

        }
      </div>
      <div className='process-bar'>
        <ProcessBar approved={approved} />
      </div>
        <div className='product-img'>
            <img src={img} alt="product-image" />
        </div>
        <div className='product-info'>
             <p><span className="heading">Name:</span><span> {name}</span></p>
             <p><span className="heading">Year:</span><span> {year}</span></p>
             <p><span className="heading">Price:</span><span>{String(formatter.format(price))?.split(".")[0]}</span></p>
             <p className='desc'><span className="heading">Description:</span><span>{desc}</span></p>
             {
              approved?(
                <p style={{fontSize:13,color:"gray",display:'flex',alignItems:"center",gap:5}}>This is a approved product <MdFileDownloadDone size={20} color='black' /></p>
              ):(
                <p style={{fontSize:13,color:"gray",display:'flex',alignItems:"center",gap:5}}>This product is not yet Approved <RxCross1 size={20} color='black' /></p>
              )
          
             }
        </div>
    </div>
  )
}


SoldProductInfo.propTypes = {
  name: PropTypes.string,
  year: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
  desc: PropTypes.string,
  approved: PropTypes.string,

};

export default SoldProductInfo
