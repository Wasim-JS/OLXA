import Layout from '../../components/Layout/Layout'
import './Home2.scss'
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
const Home2 = () => {

     const { productsData } = useSelector((state) => state.product);
     const { user } = useSelector((state) => state.user);
     console.log(user)
  return (
   <Layout>
    <section className='home2'>
        {<>
             <h2 style={{textAlign:"center",margin:20}}>{user?.role==='admin'?(`Hi Admin(${user?.name}) Checkout What's New `):(`Hi ${user?.name}, Here is The Fresh recommendations for you`)}</h2>
             <div className='show-products'>
              
               {
                    productsData?.length>0 && productsData.map(p=>(
                      <ProductCard key={p?._id} product={p}/>
                    ))
               }

          
              
             </div>

             </>
             
       }

    </section>

   </Layout>
  )
}

export default Home2