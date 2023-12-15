import './Home.scss'
import Layout from '../../components/Layout/Layout'
import Carsouel from '../../components/Carosuel/Carsouel'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
const Home = () => {

  const {productsData} = useSelector(state=>state.product)
  return (

    <Layout>
        <section>
            <Carsouel />
        </section>


        <section >
             <h2 style={{textAlign:"center",margin:20}}>Fresh recommendations</h2>
             <div className='show-products'>
              
               {
                    productsData.map(p=>(
                      <ProductCard key={p._id} product={p}/>
                    ))
               }

                 
          
              
             </div>
             
        </section>
    </Layout>
    
  )
}

export default Home