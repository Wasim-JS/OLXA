import { useSnackbar } from 'notistack';

 const useAlert = () =>{
     const { enqueueSnackbar } = useSnackbar();

     function alertFun(variant,message)
     {
        enqueueSnackbar(message, { variant } );
     }
    
  return [alertFun]
}

  export default useAlert