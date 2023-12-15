import './ProductCard.scss'
import { formatter } from '../../utiles/showMoney'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Link to={`/product/${product._id}`}>
    <div className='card'>
     <div className='img'>
         <img src={product?.pimages[0]?.cloudLink} alt="product-img" />
     </div>

     <div className="pInfo">
        <p>{product.name}</p>
        <p className='price'>{formatter.format(product.price)}</p>
        <p className='address'>{product.street} | {product.city}</p>

     </div>
    </div>
    </Link>
  )
}

export default ProductCard