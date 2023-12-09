import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import './Carsouel.scss'
const Carsouel = () => {
  return (
    <div className="carousel">

    <Carousel 
    autoPlay={true}
    infiniteLoop={true}
    showIndicators={false}
    showArrows={false}
    showThumbs={false}
     >
      <div className="cor-container">
        <img src="https://www.lg.com/levant_en/images/plp-b2c/levanten-mobilephones-hero-1-d.jpg" />
        
      </div>
      <div className="cor-container">
        <img src="https://www.lg.com/ae/images/MC/features/V30_Hero-Banner-D_new1_DR.jpg" />
        
      </div>
      <div className="cor-container">
        <img src="https://tvishacdn.tvisha.com/data/category_images/buy-sell-classified-mobile-app.jpg" />
       
      </div>
    </Carousel>
    </div>
  );
};

export default Carsouel;
