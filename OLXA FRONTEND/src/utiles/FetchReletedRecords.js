import axios from "axios";




export async function reletedProducts() {
  try {
    const reletedProducts = await axios.get("/api/v1/product/reletedProducts");
    return reletedProducts.data;
  } catch (error) {
    console.log(error);
  }
}
export async function allProducts() {
  try {
    const reletedProducts = await axios.get("/api/v1/product/all-products"
    );
    return reletedProducts.data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchProductBasedOnId(id) {
  try {
    const reletedProducts = await axios.get(`/api/v1/product/single/${id}`);
    return reletedProducts.data;
  } catch (error) {
    console.log(error);
  }
}
export async function clearAllNotifications() {

 
  try {
    const clearNotifications = await axios.get("/api/v1/product/clear-notifications");
      return clearNotifications.data;

  } catch (error) {
    console.log('error while clearing the notifications',error);
  }
}

