import "./Home.scss";
import Layout from "../../components/Layout/Layout";

const Home = () => {
  // const { productsData } = useSelector((state) => state.product);
  // const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Layout>
      <section className="home-sec1">
        <div className="header-main">
          <div className="logo">OLXA</div>
        </div>

        <div className="main-heading">
                <div className="one">Set Up Your Online Store <br />in Minutes</div>
                <div className="two">
                      Buy anything or Sell Anything,<br />

                </div>
        </div>

        <div className="cards-home">

          <div className="card-home">
            <img src="https://i1.wp.com/www.keetria.com/wp-content/uploads/2015/03/digitalgoods.jpg" alt="" />
          </div>
          <div className="card-home">
            <img src="https://www.techprevue.com/wp-content/uploads/2016/04/how-to-sell-online.jpg" alt="" />
          </div>
          <div className="card-home">
            <img src="https://tigerpink.co.uk/wp-content/uploads/2018/08/bigstock-Online-Store-Add-To-Cart-Onlin-164703704-1080x675.jpg" alt="" />
          </div>

        </div>

       
          <img src="https://www.pngkey.com/png/full/19-198414_sale-bag-png.png" alt="" />
  

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f3f4f5"
            fillOpacity="1"
            d="M0,288L26.7,266.7C53.3,245,107,203,160,186.7C213.3,171,267,181,320,192C373.3,203,427,213,480,202.7C533.3,192,587,160,640,149.3C693.3,139,747,149,800,176C853.3,203,907,245,960,250.7C1013.3,256,1067,224,1120,192C1173.3,160,1227,128,1280,122.7C1333.3,117,1387,139,1413,149.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </section>
    </Layout>
  );
};

export default Home;
