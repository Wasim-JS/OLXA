import { createSlice } from "@reduxjs/toolkit";


const imageSlice = createSlice({
 
    name: "modolImage",
    initialState: {
        imageUrl:"",
        show:false
      },

      reducers:{
        uploadImage(state,action){
            state.imageUrl = action.payload
            state.show = true
            return state
        },
        closeImage(state){
            state.imageUrl = ""
            state.show = false
            return state
        }
      }


})

export const { uploadImage, closeImage } = imageSlice.actions;
export default imageSlice.reducer;