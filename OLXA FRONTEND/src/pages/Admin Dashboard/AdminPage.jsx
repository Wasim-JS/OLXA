import { useEffect } from 'react'
import ApproveTable from '../../components/Approve Table/ApproveTable'
import Layout from '../../components/Layout/Layout'
import PieCharts from '../../components/pieChart/PieCharts'
import './AdminPage.scss'
import {useSelector} from 'react-redux'


const AdminPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    const product = useSelector(state=>state.product)
    console.log("product from admin ",product?.productsData)
    const category = product?.productsData.map(data=> data.category).reduce((acc,next)=>{
          
        let index = acc?.findIndex(chartData=>chartData?.label === next)
        console.log("index ",index);
        if(index !== -1)
        {
             acc[index].value += 1
        }
        else{
            acc.push({ 
                label:next,
                value:1
            })
        }
        console.log("acc after ",acc)
        return acc;

    },[])
    console.log("cats ",category)
  return (
    <Layout>
         <section className='admin-page-sec'>
            <h2 className='admin-heading'>
                Admin Dashbord
            </h2>

            <div className='pie-charts'>
                <p className='pie-heading'>Categories Chart</p>

                <PieCharts dataToShow={category} />

            </div>
  
          <hr />
            <div className="productToApprove">

                <p className='approve-heading'>Hi Admin,Here are The Product&#39;s To Approve :</p>

                <ApproveTable />

            </div>

         </section>
    </Layout>
  )
}

export default AdminPage