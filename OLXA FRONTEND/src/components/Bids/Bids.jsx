import { useState } from 'react'
import './Bids.scss'
import BidReplies from '../BidReplies/BidReplies'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import useAlert from '../../Custom Hooks/alert';

const Bids = ({bid,productId,fetchProduct}) => {
    const[showReply,setShowReply]=useState(false)
    const[showReples,setShowReples]=useState(false)
    const[postBidRply,setPostBidRply]=useState("")
    console.log(bid?.bidder?.avatar?.[0])
    const [alertFun] = useAlert()

    const handleBidReply = () =>{
        console.log(postBidRply)
    }

    const handelDeleteBid =async(id) =>{
          console.log(id);
          const deleteBidData =  {
            bidId:id,
            productId:productId
        }
        console.log(deleteBidData);
          try {
            const deleteBid = await axios.post("/api/v1/product/deletebid",deleteBidData);
            const res =  deleteBid.data;
            fetchProduct(productId)
            alertFun('success',res.message)

          } catch (error) {
            console.log(error);
          }
    }
  return (
    <div className='singleBid'>
        <div className='del-bid'><MdDelete onClick={()=>handelDeleteBid(bid?._id)} size={20} /></div>
        <div className="bidder-img">
            <img src={bid?.bidder?.avatar?.[0]?.cloudLink} alt="" />
        </div>
        <div className="bidder-info">

            <p className='name'>{bid?.bidder?.name}</p>
            <p className='date'>3 min Ago</p>


            <p style={{margin:"10px 0px"}}><span>Bid Price :</span><span style={{fontWeight:800}}>{bid?.bidPrice}</span></p>
            
            <p className="desc">
                {bid?.bidDesc}

            </p>

            <div className='replayBtn'>
                <button onClick={()=>setShowReply(prev=>!prev)} className='replay'>
                    reply
                </button>

                <button onClick={()=>setShowReples(prev=>!prev)} className='see-replies'>See replies</button>
            </div>

        </div>

        {/* ------------Show Reply section------------ */}

        <div className={`replayToBid ${showReply?"show-reply":""}`}>

            <div className='replaytothebid'>
                Reply
            </div>

            <textarea value={postBidRply} onChange={(e)=>setPostBidRply(e.target.value)} name="" id="" cols="30" placeholder='Reply' rows="10"></textarea>

            <button className='reply-btn' onClick={handleBidReply}>Reply</button>

        </div>

         {/* ------------Show Replies section------------ */}
        <div className={`showReplies ${showReples?"show-replies":""}`}>

            <p style={{textAlign:"center",fontWeight:800,textDecoration:"underline"}}>Replies</p>

            <div className='replies'>
                <BidReplies />
            </div>


        </div>

    </div>
  )
}

export default Bids