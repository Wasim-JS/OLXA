import './SearchPage.scss'
import Layout from '../../components/Layout/Layout'
import { useLocation } from 'react-router-dom';
import { CgMenuRight } from "react-icons/cg";
import { useEffect, useState } from 'react';
import SearchProducts from '../../components/SearchProducts/SearchProducts';
import  Pagination from '../../components/Pagination/PaginationComp'
import { useRef } from 'react';
import { fetchFiltredProducts } from '../../utiles/FiltredProducts';

const SearchPage = () => {
  const location = useLocation();
  const[searchResult,setSearchResult]=useState([])
  const[perPage,setPerPage]=useState(1)
  const[searchLoading,setSearchLoading]=useState(false)
  console.log("searchResult is ",searchResult)

  const min = useRef(null)
  const max = useRef(null)

  const city = useRef(null)
  const street = useRef(null)

  const [showSideBar,setShowSideBar] = useState(false)
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get('keyword');
  console.log("paramValue ",paramValue)
 
          useEffect(()=>{
            fetchFiltredProducts(paramValue,0,0,1).then(data=>{
              setSearchLoading(true)
              setAllData(data)
            }).catch(err=>console("error in fetching filtred records ",err))

            return ()=>{
              setShowSideBar(false)
              setSearchResult([])
              setPerPage(1)
            }
              
          },[location.search,paramValue])
    
  const sideBarShow = () =>{
    setShowSideBar(prev=>!prev)
  }

  function setAllData(data){

    setTimeout(()=>{
        setSearchResult(data.products)
        setPerPage((data.total/data.totalProductsFetched))
        setSearchLoading(false)

    },1500)
  }

  const handleLocationSearch = (e) =>{

    if(e.key === "Enter")
    {
      console.log(city.current.value)
      console.log(street.current.value)
    }

  }
  const handleLocationSearchBtn = () =>{
    
      console.log(city.current.value)
      console.log(street.current.value)
  }

  const getPageNumber = (num) =>{
    setSearchLoading(true)
        fetchFiltredProducts(paramValue,0,0,num).then(data=>{
          setAllData(data)
        }).catch(err=>console("error in fetching filtred records ",err))
  }

  
  return (
    <Layout>

        <section className='search'>
            <div className={`serach-left ${showSideBar&&"showSide"}`}>
              
                 <h4 style={{margin:5}}>Give Your Range</h4>
                  <div className='inps'>
                      <input ref={min} placeholder='Min' type="text" name="" id="" />
                      <span>To</span>
                      <input ref={max} placeholder='Max' type="text" name="" id="" />
                 </div>

              <div className='sortBy'>
                <h4>Sort</h4>
                <div>

                  <select name="" id="">
                    <option value="" disabled hidden>Sort Options</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="L-H">Lower To Higer</option>
                    <option value="H-L">Lower To Higer</option>
                  </select>

                </div>
              </div>

              <div className='slocation' onKeyDown={handleLocationSearch}>
                <h4>Search In Your City and Street</h4>
                     <input ref={city} type="text" placeholder='Enter City'/>
                     <input ref={street} type="text" placeholder='Enter Street' />
                     <button onClick={handleLocationSearchBtn}>Search</button>
              </div>
            </div>
            <div className="search-right">
               <div className='searchBtn' onClick={sideBarShow}>
                 <CgMenuRight />
               </div>
               {/* products */}

               <div className='showProducts'>

                {
                  !searchLoading?(

                    searchResult?.length>0?(
                      searchResult.map(product=>(
                        <SearchProducts key={product._id} product={product} />
                   
                      ))
                    ):(
                      <div>No Products Found</div>
                    )
                   
                    
                  ):(
                   
                    <>
                    <div className="sproducts">
                        <div className='sproduct-left'>

                        </div>
                        <div className='sproduct-right'>

                        </div>
                    </div>
                    <div className="sproducts">
                        <div className='sproduct-left'>

                        </div>
                        <div className='sproduct-right'>

                        </div>
                    </div>
                    <div className="sproducts">
                        <div className='sproduct-left'>

                        </div>
                        <div className='sproduct-right'>

                        </div>
                    </div>
                    <div className="sproducts">
                        <div className='sproduct-left'>

                        </div>
                        <div className='sproduct-right'>

                        </div>
                    </div>
                    <div className="sproducts">
                        <div className='sproduct-left'>

                        </div>
                        <div className='sproduct-right'>

                        </div>
                    </div>
                    </>
                  )
                }
              
                
               </div>
               <div className='pag'>
                 <Pagination perPage={perPage} getPageNumber={getPageNumber}/>
               </div>

               

            </div>
        </section>
    </Layout>
  )
}

export default SearchPage