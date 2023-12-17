import Pagination from '@mui/material/Pagination';
import './PaginationComp.scss'


const PaginationComp = ({perPage,getPageNumber}) => {
  return (
    <Pagination count={perPage} onClick={({target})=>getPageNumber(target.innerText)} color="primary"/>
  )
}

export default PaginationComp