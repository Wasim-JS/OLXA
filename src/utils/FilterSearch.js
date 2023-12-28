class FilterSearch {

    
    constructor(ProductModel)
    {
        this.ProductModel = ProductModel;
        this.query = ""
        this.queryString = ""
         
    }

    keywordSearch(keyword)
    {
         
        this.queryString = {
            $or: [
              { name: { $regex: new RegExp(keyword, 'ig') } },
              { category: { $regex: new RegExp(keyword, 'ig') } }
            ]
          }
          this.query = this.ProductModel.find(this.queryString)
          return this
    }



    priceSearch(greater=0,lesser=0)
    {
        greater = Number(greater)
        lesser = Number(lesser)
        let priceRange = {}
        if(greater!==0 && lesser!==0 )
        {   console.log("we entred")
             priceRange = {price: {$gte: greater,$lte: lesser}}
        }
        this.queryString = {...this.queryString,...(Object.keys(priceRange).length > 0) && priceRange}
        this.query = this.ProductModel.find(this.queryString)
        return this
    
    }

    cityAndSteetSearch(city,street)
    {
         
        let citySearch ={}
        if(city !=="",street!="")
        {

             citySearch = {city: { $regex: new RegExp(city, 'ig')},street:{ $regex: new RegExp(street, 'ig')}}
        }
        
        this.queryString = {...this.queryString,...(Object.keys(citySearch).length > 0) && citySearch}
        this.query = this.ProductModel.find(this.queryString)
        return this

    }

    setLimit(noOfrecords,pageNo =1)
    {
        console.log("limit");
     let pageNumber = pageNo || 1
     let skipRecords = noOfrecords * (pageNumber-1)
     this.query = this.ProductModel.find(this.queryString).skip(skipRecords).limit(noOfrecords);
     return this
    }



}

export default FilterSearch