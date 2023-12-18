import './Footer.scss'
const Footer = () => {
  return (
    <footer className='footer'>
      {/* <div className='footer-logo'>
        OLXA
      </div> */}

<div className='footer-info'>

     <span style={{fontFamily:'Pacifico, cursive',margin:"0 10px"}}>OLXA</span> All Right Reserved &copy; {new Date().getFullYear()}
</div>


    </footer>
  )
}

export default Footer