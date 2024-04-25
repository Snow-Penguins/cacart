import React from "react";
import { ProductItemTest } from "../../entities/Product";
import Image from "next/image";

interface ProductDetailProps {
  product: ProductItemTest;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="product-container flex bg-gray-200 p-20 w-[1440px] h-[840px] items-center">
      <div className="product-info flex-1">
        <h2 className="text-secondary_text text-lg mb-5 font-medium">
          {product.category}
        </h2>
        <div className="flex mb-10">
          <h3 className="text-h5 mr-10 font-bold">{product.name}</h3>
          <p className="text-h5">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-md text-primary_text font-light mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="flex flex-col space-y-3">
          <label className="text-md font-light">Colors</label>
          <select className="select select-bordered w-[421px]">
            <option disabled selected>
              Choose your Color
            </option>
            <option>RED</option>
            <option>ORANGE</option>
            <option>YELLOW</option>
            <option>GREEN</option>
            <option>BLUE</option>
            <option>PURPLE</option>
          </select>
          <label className="text-md font-light">Size</label>
          <select className="select select-bordered w-[421px]">
            <option disabled selected>
              Choose your size
            </option>
            <option>RED</option>
            <option>ORANGE</option>
            <option>YELLOW</option>
            <option>GREEN</option>
            <option>BLUE</option>
            <option>PURPLE</option>
          </select>
        </div>
        <div className="mt-10">
          <button className="btn btn-outline text-primary rounded-full w-[190px] mr-10 text-md">
            Buy it Now
          </button>
          <button className="btn btn-outline text-primary rounded-full w-[190px]">
            Add to Basket
          </button>
        </div>
      </div>
      <div className="product-image flex-2 ml-32">
        <Image
          src="/images/product3.jpg"
          alt="Product Image"
          width={600}
          height={450}
          className="w-[600px] h-[450px]"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
