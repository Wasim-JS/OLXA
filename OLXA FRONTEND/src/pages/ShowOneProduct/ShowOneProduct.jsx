import { useParams } from 'react-router-dom'
import './ShowOneProduct.scss'
import Layout from '../../components/Layout/Layout'
import { fetchProductBasedOnId } from '../../utiles/FetchReletedRecords'
import { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { uploadImage } from '../../redux-store/ShowImageSlice'
import { useDispatch, useSelector } from 'react-redux'
import ShowImageModol from '../../components/ShowImageModal/ShowImageModol'
import CircularProgress from '@mui/material/CircularProgress';

const ShowOneProduct = () => {
    const dispatch = useDispatch()
    const  imageUrl = useSelector(state=> state.image)
    console.log(imageUrl)
    const {id} = useParams()
    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(true)


    useEffect(()=>{
        setLoading(true)
        if(id)
        {
            fetchProductBasedOnId(id).then(data=>{
                console.log("one data ",data.product)
                if(data.product)
                {
                    setProduct(data.product)
                }
                setLoading(false)
            })
        }
    },[id])

    const handleClick = (imgData)=>{
        dispatch(uploadImage(imgData))
    }
  return (
    <Layout>
        {
            !loading?(
      <section>
            <ShowImageModol />
            <div>
            
               
             
                    <Carousel
                    className="courosel"
                    infiniteLoop={true}
                    showIndicators={false}
                    showThumbs={false}
                    >
                        
                        <div className='inner-div' onClick={()=> handleClick(product?.pimages?.[0].cloudLink)}>
                            <img style={{objectFit:"contain"}} src={product?.pimages?.[0].cloudLink} />
                        </div>


                        <div onClick={()=>handleClick(product?.pimages?.[1].cloudLink)}>
                            <img src={product?.pimages?.[1].cloudLink} />
                        </div>
                        

                        <div onClick={()=>handleClick(product?.pimages?.[2].cloudLink)}>
                            <img src={product?.pimages?.[2].cloudLink} />
                        </div>
                      
                    </Carousel>
                    <p style={{textAlign:"center",fontWeight:800}}>Click on Images For Better Views</p>
            </div>


       </section>
            ):(
                <div className='cImageLoading'>
                    <CircularProgress size={120}/>
                </div>
            )
        }

     
       
    </Layout>
  )
}

export default ShowOneProduct