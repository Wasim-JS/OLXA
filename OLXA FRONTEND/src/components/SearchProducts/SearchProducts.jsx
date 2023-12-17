import { Link } from 'react-router-dom'
import './SearchProducts.scss'
import {formatter} from '../../utiles/showMoney'

const SearchProducts = ({product}) => {
  return (
      <div className='search-product'>
          <div className="sproduct-img">
            <img src={product?.pimages?.[0]?.cloudLink} alt="img" />
          </div>
          <div className="sproduct-info">
            <p>
                {product?.name}
            </p>
            <p style={{fontWeight:800}}>
                {formatter.format(product?.price).split(".")[0]}
            </p>
            <p style={{marginTop:15,color:"gray"}}>
                {product?.city} || {product?.street}
            </p>
            <p style={{marginTop:15}}>
                <Link to={`/product/${product._id}`} style={{color:"blue",textDecoration:"underline"}}>Go to This Product</Link>
            </p>
          </div>
      </div>
  )
}

export default SearchProducts