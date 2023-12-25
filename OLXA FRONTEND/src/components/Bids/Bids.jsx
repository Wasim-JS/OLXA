import { useState } from 'react'
import './Bids.scss'
import BidReplies from '../BidReplies/BidReplies'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import useAlert from '../../Custom Hooks/alert';
import { BsSendFill } from "react-icons/bs";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { PiChatsCircleFill } from "react-icons/pi";
import {useSelector} from 'react-redux'



const Bids = ({bid,productId,fetchProduct,productOwner}) => {
    const {user} = useSelector(state=>state.user)
    const[showReply,setShowReply]=useState(false)
    const[showReples,setShowReples]=useState(false)
    const[postBidRply,setPostBidRply]=useState("")
    console.log('bidder ',bid)
    const [alertFun] = useAlert()

    const handleBidReply = async (bidId,productOwner) =>{
        let toSendNoti = ''
     
        if( user._id === productOwner?._id)
        {
            toSendNoti = bid.bidder?._id
        }else{
            toSendNoti = productOwner?._id

        }

        const det = {
            toSendNoti,
            productId,
            message:postBidRply,
            bidId

        }
        try {
            const addBidReplies = await axios.post("/api/v1/product/bid-replies",det);
            const res = await addBidReplies.data;
            setPostBidRply('')
            alertFun('success',res.message)
            fetchProduct(productId)
          } catch (error) {
            console.log(error);
            alertFun('error while clearing notifications ',error.message)
          }
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
            <img src={bid?.bidder?.avatar?.[0].cloudLink} alt="" />
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
                <IoChatbubbleEllipsesSharp /> Chat
                </button>

                <button onClick={()=>setShowReples(prev=>!prev)} className='see-replies'><PiChatsCircleFill />See Chats</button>
            </div>

        </div>

        {/* ------------Show Reply section------------ */}

        <div className={`replayToBid ${showReply?"show-reply":""}`}>

            <div className='replaytothebid'>
                Message
            </div>

            <textarea value={postBidRply} onChange={(e)=>setPostBidRply(e.target.value)} name="" id="" cols="30" placeholder='Write Your Message Here...' rows="10"></textarea>

            <button className='reply-btn' onClick={()=>handleBidReply(bid._id,productOwner,bid?.bidder)}><BsSendFill />send</button>

        </div>

         {/* ------------Show Replies section------------ */}
        <div className={`showReplies ${showReples?"show-replies":""}`}>

            <p style={{textAlign:"center",fontWeight:800,textDecoration:"underline"}}>Replies</p>

            <div className='replies'>
                {
                    bid?.replies.length>0?(
                    bid?.replies?.map(b=>(
                        <BidReplies key={b._id} replies={b}  />
                    ))
                    ):(
                        <div>No Chats Yet..</div>
                    )
                }
                
            </div>


        </div>

    </div>
  )
}

export default Bids