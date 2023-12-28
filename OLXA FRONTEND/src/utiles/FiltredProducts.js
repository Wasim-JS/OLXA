import axios from "axios";

export async function fetchFiltredProducts(keyword,gt=0,lt=0,page=1,city="",street="") {
    try {
      const filtredProducts = await axios.get(`/api/v1/product/filter-products?keyword=${keyword}&gt=${gt}&lt=${lt}&page=${page}&city=${city}&street=${street}`);
      return filtredProducts.data;
    } catch (error) {
      console.log(error);
    }
  }