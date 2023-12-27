import { postedTime } from '../../utiles/PostedTime'
import './BidReplies.scss'

const BidReplies = ({replies}) => {
 
  console.log('sender ',replies?.sender?.avatar?.[0].cloudLink)
  return (
    <div className='bid-rples'>
        <div className='bid-rples-img'>
            <img src={replies?.sender?.avatar?.[0].cloudLink} alt="" />
        </div>
        <div className='bid-rples-info'>
            <p className='rely-name'>{replies?.sender?.name}</p>
            <p className='reply-time'>{postedTime(replies?.postedOn || "")}</p>
            <p className='rply-desc'>
              {replies.message}
            </p>
        </div>
    </div>
  )
}

export default BidReplies