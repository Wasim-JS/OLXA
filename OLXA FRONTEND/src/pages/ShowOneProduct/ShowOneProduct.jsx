import { useParams } from "react-router-dom";
import "./ShowOneProduct.scss";
import Layout from "../../components/Layout/Layout";
import { fetchProductBasedOnId } from "../../utiles/FetchReletedRecords";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { uploadImage } from "../../redux-store/ShowImageSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowImageModol from "../../components/ShowImageModal/ShowImageModol";
import CircularProgress from "@mui/material/CircularProgress";
import ProductTable from "../../components/ProductTable/ProductTable";
import { TbHammer } from "react-icons/tb";
import ShowBid from "../../components/ShowBidModol/ShowBid";
import Bids from "../../components/Bids/Bids";

const ShowOneProduct = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.image);
  console.log(imageUrl);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const handleClick = (imgData) => {
    dispatch(uploadImage(imgData));
  };

  async function fetchProduct(id) {
    fetchProductBasedOnId(id).then((data) => {
      console.log("one data ", data?.product);
      if (data?.product) {
        setProduct(data.product);
      }
      setLoading(false);
    });
  }
  return (
    <Layout>
      {!loading ? (
        <section>
          <ShowImageModol />
          <div>
            <Carousel
              className="courosel"
              infiniteLoop={true}
              showIndicators={false}
              showThumbs={false}
            >
              {product?.pimages?.map((p) => (
                <div
                  key={p?.cloudLink}
                  className="inner-div"
                  onClick={() => handleClick(p?.cloudLink)}
                >
                  <img style={{ objectFit: "contain" }} src={p?.cloudLink} />
                </div>
              ))}
            </Carousel>
            <p style={{ textAlign: "center", fontWeight: 800 }}>
              Click on Images For Better Views
            </p>
          </div>
        </section>
      ) : (
        <div className="cImageLoading">
          <CircularProgress size={120} />
        </div>
      )}

      <section className="product-info">
        <ProductTable product={product} />

        <div className="bit-sec">
          <ShowBid productId={product._id} fetchProduct={fetchProduct}>
            <button className="raise-bid-btn" style={{ margin: 20 }}>
              <TbHammer /> Raise a Bid
            </button>
          </ShowBid>

          <div className="bidsHeading">Bids</div>
          <div className="showAllBids">
            {product?.bids?.length >0 ?(
                product?.bids.map((bid) => (
                    <Bids
                      key={bid?._id}
                      bid={bid}
                      productId={product?._id}
                      fetchProduct={fetchProduct}
                    />
                  ))
            ):(
                <div>No Bids Raised Yet....</div>
            )
              }
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShowOneProduct;
