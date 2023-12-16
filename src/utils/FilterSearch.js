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
              { name: { $regex: new RegExp(keyword, 'i') } },
              { category: { $regex: new RegExp(keyword, 'i') } }
            ]
          }
          this.query = this.ProductModel.find(this.queryString)
          return this
    }



    priceSearch(greater=0,lesser=0)
    {
        let priceRange = {}
        if(greater && lesser )
        {
             priceRange = {price: {$gt: greater,$lt: lesser}}
        }
        this.queryString = {...this.queryString,...(Object.keys(priceRange).length > 0) && priceRange}
        this.query = this.ProductModel.find(this.queryString)
        return this
    
    }

    setLimit(noOfrecords,pageNo =1)
    {
     let pageNumber = pageNo || 1
     let skipRecords = noOfrecords * (pageNumber-1)
     this.query = this.ProductModel.find(this.queryString).skip(skipRecords).limit(noOfrecords);
     return this
    }



}

export default FilterSearch