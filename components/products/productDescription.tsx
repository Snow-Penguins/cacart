"use client";
import React from "react";
import { useEffect, useState } from "react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  const [selectedContent, setSelectedContent] = useState<string>("description");

  useEffect(() => {
    const savedContent = localStorage.getItem("selectedContent");
    if (savedContent) {
      setSelectedContent(savedContent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedContent", selectedContent);
  }, [selectedContent]);

  return (
    <div className="flex w-[1440px] p-36">
      <div className="w-1/4">
        <ul>
          <li
            onClick={() => setSelectedContent("description")}
            className={
              selectedContent === "description"
                ? "text-lg font-semibold text-primary mb-5 cursor-pointer"
                : "text-lg font-semibold text-primary_text mb-5 cursor-pointer"
            }
          >
            Description
          </li>
          <li
            onClick={() => setSelectedContent("shipping")}
            className={
              selectedContent === "shipping"
                ? "text-lg font-semibold text-primary mb-5 cursor-pointer"
                : "text-lg font-semibold text-primary_text mb-5 cursor-pointer"
            }
          >
            Shipping & Return Information
          </li>
        </ul>
      </div>
      <div className="w-3/4 border-l-4 pl-10 border-gray-400">
        {selectedContent === "description" && (
          <div>
            <p>{description}</p>
          </div>
        )}
        {selectedContent === "shipping" && (
          <div>
            <p>Shipping & Return Information</p>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
