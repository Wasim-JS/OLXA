import './ProductCard.scss'
import { formatter } from '../../utiles/showMoney'
import { Link } from 'react-router-dom'
import { postedTime } from '../../utiles/PostedTime'

const ProductCard = ({product}) => {
  return (
    <Link to={`/product/${product._id}`}>
    <div className='card'>
     <div className='img'>
         <img src={product?.pimages[0]?.cloudLink} alt="product-img" />
     </div>

     <div className="pInfo">
        <p>{product.name}</p>
        <p className='price'>{formatter.format(product?.price)?.split('.')[0]}</p>
        <p className='address'>{product.street} | {product.city}</p>
        <p className='address'>{postedTime(product?.time)|| ''}</p>

     </div>
    </div>
    </Link>
  )
}

export default ProductCard