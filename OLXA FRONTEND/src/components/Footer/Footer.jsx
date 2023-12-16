import './Footer.scss'
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-logo'>
        OLXA
      </div>

<div className='footer-info'>

      All Right Reserved &copy; {new Date().getFullYear()}
</div>


    </footer>
  )
}

export default Footer