"use client";

import React, { useState, useEffect } from "react";

const ProfileSetting = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    unit_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    province: "",
    postal_code: "",
    id: null,
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("cacartUser") || "{}",
        );
        const userId = storedUser.user_id;

        if (userId) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUser({
            email: data.email_address,
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            phone: data.phone_number || "",
          });

          if (data.user_addresses.length > 0) {
            const addr = data.user_addresses[0].address;
            setAddress({
              unit_number: addr.unit_number || "",
              address_line1: addr.address_line1 || "",
              address_line2: addr.address_line2 || "",
              city: addr.city || "",
              province: addr.province || "",
              postal_code: addr.postal_code || "",
              id: addr.id || null,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    console.log(`Field change: ${id}, Value: ${value}`);
    setAddress((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem("cacartUser") || "{}");
      const userId = storedUser.user_id;

      if (userId) {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: user.firstName,
              last_name: user.lastName,
              phone_number: user.phone,
            }),
          },
        );

        if (!userResponse.ok) {
          throw new Error("Failed to update user data");
        }

        const addressMethod = address.id ? "PUT" : "POST";
        const addressUrl = address.id
          ? `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses/${address.id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`;

        const addressData = {
          unit_number: address.unit_number,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          province: address.province,
          postal_code: address.postal_code,
        };

        const addressResponse = await fetch(addressUrl, {
          method: addressMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        });

        if (!addressResponse.ok) {
          throw new Error("Failed to update address");
        }

        const updatedUser = await userResponse.json();
        const updatedAddress = await addressResponse.json();

        localStorage.setItem(
          "cacartUser",
          JSON.stringify({
            ...storedUser,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            phone_number: updatedUser.phone_number,
          }),
        );

        setAddress({
          ...address,
          ...updatedAddress,
          id: updatedAddress.id || null,
        });

        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-2">Settings Page</h1>

        <hr className="my-8 border-gray-300" />

        <div className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Account Information</h2>
          <p className="text-gray-600 mb-6">Edit your profile quickly</p>

          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4a4 4 0 110 8 4 4 0 010-8zM6.343 17.657A9.004 9.004 0 0112 15c2.386 0 4.596.936 6.343 2.657M15 21H9"
                />
              </svg>
            </div>
            <div>
              <label className="ml-5 text-lg">{user.email}</label>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="firstName"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-2 border rounded w-full"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="lastName"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-2 border rounded w-full"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-10">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                className="px-4 py-2 border rounded w-full"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            <h3 className="text-xl font-bold mb-2">Shipping Address</h3>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="unit_number"
                >
                  Unit Number
                </label>
                <input
                  id="unit_number"
                  type="text"
                  placeholder="101"
                  className="px-4 py-2 border rounded w-full"
                  value={address.unit_number || ""}
                  maxLength={25}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="address_line1"
                >
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  id="address_line1"
                  type="text"
                  placeholder="789 Pitfield Blvd"
                  className="px-4 py-2 border rounded w-full"
                  value={address.address_line1 || ""}
                  maxLength={50}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="address_line2"
                >
                  Address Line 2
                </label>
                <input
                  id="address_line2"
                  type="text"
                  placeholder="Apt 85"
                  className="px-4 py-2 border rounded w-full"
                  value={address.address_line2 || ""}
                  maxLength={50}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="city"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Calgary"
                  className="px-4 py-2 border rounded w-full"
                  value={address.city || ""}
                  maxLength={25}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="province"
                >
                  Province <span className="text-red-500">*</span>
                </label>
                <select
                  name="province"
                  id="province"
                  onChange={handleChange}
                  value={address.province || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select a Province
                  </option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="postal_code"
                >
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="postal_code"
                  type="text"
                  placeholder="A2B9Q2"
                  className="px-4 py-2 border rounded w-full"
                  value={address.postal_code || ""}
                  maxLength={6}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white px-16 py-2 rounded"
              >
                Update Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
