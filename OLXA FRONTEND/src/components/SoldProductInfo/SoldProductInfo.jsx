import './SoldProductInfo.scss'
import PropTypes from 'prop-types';


const SoldProductInfo = ({name,year,price,img,desc}) => {
  return (
    <div className='product'>
        <div className='product-img'>
            <img src={img} alt="product-image" />
        </div>
        <div className='product-info'>
             <p><span className="heading">Name:</span><span> {name}</span></p>
             <p><span className="heading">Year:</span><span> {year}</span></p>
             <p><span className="heading">Price:</span><span> &#x20B9;{price}</span></p>
             <div className='desc'>

             <div className="heading">Description:</div><div className='info'> {desc}</div>
             </div>
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

};

export default SoldProductInfo
