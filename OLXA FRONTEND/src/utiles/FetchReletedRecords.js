import axios from "axios";

export async function reletedProducts() {
  try {
    const reletedProducts = await axios.get("/api/v1/product/reletedProducts");
    return reletedProducts.data;
  } catch (error) {
    console.log(error);
  }
}
export async function relatedCityProducts() {
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

