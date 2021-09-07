import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import useInput from "../../components/hooks/useInput";

import Product from "../../components/store/product";

function ProdHookAdd(props) {
  debugger;
  const [{ data, loading, error }, refetch] = useAxios(
    "http://localhost:5000/products"
  );

  console.log(data);
  //   let filteredProducts = [];

  //   filteredProducts = this.state.products.filter((product) => {
  //     return (
  //       product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
  //     );
  //   });
  return (
    <div className="">
      <h3 className="padding">Shop Inventory</h3>
      <div className="tableContainer">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Dept.</th>
              <th>Category</th>
              <th>MSRP/Retail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((currentproduct) => {
              return (
                <Product product={currentproduct} key={currentproduct._id} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProdHookAdd;
