import { styled } from '@mui/material/styles';
import './ApproveTable.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux'
import { MdDeleteOutline } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";





const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const ApproveTable = () => {
    const product = useSelector(state=>state.product)
    const proToApprove = product?.productsData.filter(product =>product.approved === false)
const handleApprove = (id) =>{

    alert(id)
    
}
const handleDelete = (id) =>{
    
    alert(id)
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="right">Id</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Approve</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            proToApprove?.length >0?(

                proToApprove.map(product=>(
                    <StyledTableRow key={product._id}>
                        <StyledTableCell component="th" scope="row">
                        {product?.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{product?._id}</StyledTableCell>
                        <StyledTableCell align="right">{product?.approved===false?"pending":"approved"}</StyledTableCell>
                        <StyledTableCell align="right"><button className='appr-btn' onClick={()=>handleApprove(product?._id)}>Approve <span><MdDoneOutline /></span></button></StyledTableCell>
                        <StyledTableCell align="right"><button className='appr-btn' onClick={()=>handleDelete(product?._id)}><MdDeleteOutline size={25} /></button></StyledTableCell>
                  </StyledTableRow>
                ))
            ):(
                <div>No Products to Approve</div>
            )
          }
      
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ApproveTable