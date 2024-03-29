import { useEffect, useState } from 'react'
import SoldProductInfo from '../SoldProductInfo/SoldProductInfo'
import './SellDetails.scss'
import { reletedProducts } from '../../utiles/FetchReletedRecords'

const SellDetails = () => {
  const [reletedProduct,setReletedproducts] = useState([])

    useEffect(()=>{
      fetchReletedProducts()
      
    },[])

    const fetchReletedProducts = async () =>{
      const res = await reletedProducts()
      const products = res.products;
      setReletedproducts(products)
    }

  return (
    <section className='sellSec'>
      {
        reletedProduct.length>0?(
          reletedProduct.map(product=>(
            <SoldProductInfo fetchReletedProducts={fetchReletedProducts} key={product?._id} product={product?._id} sold={product?.sold} img={product?.pimages[0]?.cloudLink} name={product?.name} year={product?.year} price={product?.price} desc={product?.desc} approved={product?.approved} />
  
          ))
        ):(
          <div style={{fontFamily:'sans-serif',fontSize:20}}>
            No Products Sold Yet...
          </div>
        )
        
      }
    </section>
  )
}

export default SellDetails