"use client";

import React, { useEffect, useState } from "react";
import { Address } from "@/entities/OrderItem";

interface ShippingAddressProps {
  onSetShippingAddress: (address: Partial<Address>) => void;
  address: Partial<Address>;
}

const isBrowser = () => typeof window !== "undefined";

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  onSetShippingAddress,
  address,
}) => {
  const [savedAddress, setSavedAddress] = useState<Partial<Address>>({});
  const [selectedAddressType, setSelectedAddressType] = useState<
    "saved" | "new"
  >("saved");
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});

  const userId = isBrowser()
    ? JSON.parse(localStorage.getItem("cacartUser") || "{}").user_id
    : "";
  console.log(userId);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/addresses/${userId}`,
        );
        const data = await response.json();

        if (data && data[0] && data[0].address) {
          setSavedAddress(data[0].address);
          setSelectedAddressType("saved");
        }
      } catch (error) {
        console.error("Failed to fetch address", error);
      }
    };
    fetchAddress();
  }, [userId]);

  const formatAddress = (address: any): string => {
    let formattedParts = [];
    if (address) {
      const {
        unit_number,
        address_line1,
        address_line2,
        city,
        province,
        postal_code,
      } = address;

      formattedParts = [
        unit_number && `${unit_number},`,
        address_line1 && `${address_line1},`,
        address_line2 && `${address_line2},`,
        city && `${city},`,
        province && `${province}`,
        postal_code && ` ${postal_code}`,
      ].filter(Boolean);
    }

    return formattedParts.join(" ").trim();
  };

  const handleAddressSelection = (type: "saved" | "new") => {
    setSelectedAddressType(type);
    if (type === "saved" && savedAddress) {
      onSetShippingAddress(savedAddress);
    } else {
      onSetShippingAddress(newAddress);
    }
  };

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  useEffect(() => {
    if (selectedAddressType === "new") {
      onSetShippingAddress(newAddress);
    } else {
      onSetShippingAddress(savedAddress);
    }
  }, [savedAddress, newAddress, selectedAddressType, onSetShippingAddress]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
      {savedAddress && (
        <div className="mt-2 p-4 border rounded-md border-gray-300 flex items-center">
          <input
            type="radio"
            id="saved-address"
            name="addressSelection"
            value="saved"
            checked={selectedAddressType === "saved"}
            onChange={() => handleAddressSelection("saved")}
            className="mr-4"
          />
          <div>
            <label htmlFor="saved-address" className="font-bold">
              Saved Address
            </label>
            <div className="text-gray-600">{formatAddress(savedAddress)}</div>
          </div>
        </div>
      )}

      <div className="mt-2 p-4 border rounded-md border-gray-300 flex items-center">
        <input
          type="radio"
          id="new-address"
          name="addressSelection"
          value="new"
          checked={selectedAddressType === "new"}
          onChange={() => handleAddressSelection("new")}
          className="mr-4"
        />
        <label htmlFor="new-address" className="font-bold">
          Ship to other address
        </label>
      </div>

      {selectedAddressType === "new" && (
        <div className="mt-4 space-y-4">
          <input
            type="text"
            name="unit_number"
            placeholder="Unit Number"
            onChange={handleNewAddressChange}
            value={newAddress.unit_number || ""}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address_line1"
            placeholder="Address Line 1"
            onChange={handleNewAddressChange}
            value={newAddress.address_line1 || ""}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address_line2"
            placeholder="Address Line 2"
            onChange={handleNewAddressChange}
            value={newAddress.address_line2 || ""}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleNewAddressChange}
            value={newAddress.city || ""}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            onChange={handleNewAddressChange}
            value={newAddress.province || ""}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            onChange={handleNewAddressChange}
            value={newAddress.postal_code || ""}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold">Selected Shipping Address:</h3>
        {formatAddress(address)}
      </div>
    </div>
  );
};

export default ShippingAddress;
