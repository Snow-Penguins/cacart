import React from "react";

// temporary data. This data should be fetched (addresses table)
const addresses = [
  {
    id: 1,
    unit_number: "10490",
    address_line1: "72 Street SE",
    address_line2: "",
    city: "Calgary",
    province: "AB",
    postal_code: "T2C 5P6",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    unit_number: "",
    address_line1: "101 9 Ave SW",
    address_line2: "",
    city: "Calgary",
    province: "AB",
    postal_code: "T2P 1J9",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function ShippingAddress() {
  return (
    <div>
      <div className="text-h6">Shipping Address</div>

      {addresses.map((address, index) => (
        <div
          key={index}
          className="mt-2 p-4 border border-gray-300 rounded-md columns-2 flex justify-between"
        >
          <div>
            <div className="font-bold">Shipping Address {index + 1}</div>
            <div className="text-primary_text">{address.address_line1}</div>
            <div className="text-primary_text">
              {address.city}, {address.province} {address.postal_code}
            </div>
          </div>
          <div>
            <button className="mt-2 px-10 py-2 bg-primary text-white rounded-md hover:bg-blue-600">
              Deliver Here
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
