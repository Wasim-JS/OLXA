import Pagination from '@mui/material/Pagination';
import './PaginationComp.scss'


const PaginationComp = ({perPage,getPageNumber,page}) => {


  const handlePage = ({target}) =>{
    getPageNumber(target.innerText)
    
  }
  
  console.log("page data ",typeof page)

  return (
    <Pagination page={Number(page)} count={perPage} onClick={handlePage} color="primary"/>
  )
}

export default PaginationComp