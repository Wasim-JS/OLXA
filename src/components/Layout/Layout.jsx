import './Layout.scss'
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
const Layout = ({children}) => {
  return (
    <>
    <Navbar />
    <main className='main-container'>
      {children}
    </main>

    <Footer />
    </>
  )
}

export default Layout