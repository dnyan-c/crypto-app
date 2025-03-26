import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import BackToTop from '../components/Common/BackToTop';
import Loader from '../components/Common/Loader';


function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    
  };


  const onSearchChange = (e) => {
    //console.log(search);
    setSearch(e.target.value);
  };

  var filteredCoins = coins.filter(
    (item) => item.name.toLowerCase().includes(search.toLowerCase())
      || item.symbol.toLowerCase().includes(search.toLowerCase()
      )
  );

  useEffect(() => {
    axios.get("http://localhost:5000/api/crypto")
      .then((response) => {
       // console.log("RESPONSE>>>", response.data);
        setCoins(response.data.data);
        setPaginatedCoins(response.data.data.slice(0, 10));
        setisLoading(false);
      })
      .catch((error) => {
        console.log("ERROR>>>", error.message);
      });

  }, []);

  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>

          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
          {!search && (<PaginationComponent page={page} handlePageChange={handlePageChange} />)}

        </div>
      )}
    </>
  )
}

export default DashboardPage