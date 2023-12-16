import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {formatter} from '../../utiles/showMoney'

const ProductTable = ({product}) => {
    

    const {name,year,price,hasWarranty,hasBill,desc,owner} = product;
    console.log("product is ", product)

  return (
    <TableContainer component={Paper}>
        <h2 style={{margin:30}}>Product Information</h2>
      <Table sx={{ width: "100%" ,backgroundColor:"white"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product info</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            <TableRow
          
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Name
              </TableCell>
              <TableCell align="right">{name}</TableCell>
              
            </TableRow>
            
            <TableRow
            
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Year
              </TableCell>
              <TableCell align="right">{year}</TableCell>
              
            </TableRow>


            <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Price
              </TableCell>
              <TableCell align="right">{formatter?.format(price)?.split('.')[0]}</TableCell>
              
            </TableRow>

            
            <TableRow
           
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Warranty Avaliable
              </TableCell>
              <TableCell align="right">{String(hasWarranty)=="true"?"Yes":"No"}</TableCell>
              
            </TableRow>

            
            <TableRow
           
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Bill Avaliable
              </TableCell>
              <TableCell align="right">{String(hasBill)=="true"?"Yes":"No"}</TableCell>
              
            </TableRow>

            <TableRow
           
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Description
              </TableCell>
              <TableCell align="right">{desc}</TableCell>
              
            </TableRow>

            <h3 style={{margin:20,backgroundColor:"white",padding:25,width:"100%",textAlign:'center'}}>Owner Information</h3>

            <TableRow
           
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell component="th" scope="row">
            Owner Name
           </TableCell>
           <TableCell align="right">{owner?.name}</TableCell>
           
         </TableRow>


         
         <TableRow
           
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell component="th" scope="row">
            Owner Phone
           </TableCell>
           <TableCell align="right">{owner?.phone}</TableCell>
           
         </TableRow>

         <TableRow
           
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell component="th" scope="row">
            Owner Email
           </TableCell>
           <TableCell align="right">{owner?.email}</TableCell>
           
         </TableRow>




        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable



