"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../entities/Product";

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // @TODO: change the number of product per page
  const productsPerPage = 4;

  const pageCount = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex flex-wrap justify-start gap-4 pt-10">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="join flex justify-center">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index + 1}
            className={`join-item btn ${currentPage === index + 1 ? "btn-active" : ""}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCardList;
