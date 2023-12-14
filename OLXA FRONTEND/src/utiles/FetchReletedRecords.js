import axios from "axios"


export async function reletedProducts ()
{
  try {
    const reletedProducts = await axios.get('/api/v1/product/reletedProducts')
    return reletedProducts.data
    
  } catch (error) {
   console.log(error)
  }
}