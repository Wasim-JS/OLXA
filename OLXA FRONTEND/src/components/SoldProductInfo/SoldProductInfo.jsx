import ProcessBar from '../ProcessBar/ProcessBar';
import './SoldProductInfo.scss'
import PropTypes from 'prop-types';
import {formatter} from '../../utiles/showMoney'


const SoldProductInfo = ({name,year,price,img,desc,approved}) => {
  return (
    <div className='product'>
      <div className='process-bar'>
        <ProcessBar approved={approved} />
      </div>
        <div className='product-img'>
            <img src={img} alt="product-image" />
        </div>
        <div className='product-info'>
             <p><span className="heading">Name:</span><span> {name}</span></p>
             <p><span className="heading">Year:</span><span> {year}</span></p>
             <p><span className="heading">Price:</span><span>{String(formatter.format(price))?.split(".")[0]}</span></p>
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
  approved: PropTypes.string,

};

export default SoldProductInfo
