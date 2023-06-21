import axios from 'axios';
// import { useState } from 'react';


export const userColumns = [
  { field: "id", headerName: "Sr. No.", width: 90 },
  { field: "nameOfSociety", headerName: "Name of Society", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "state", headerName: "State", width: 120 },
  { field: "district", headerName: "District", width: 120 },
  { field: "registrationDate", headerName: "Date of Registration", width: 200 },
  { field: "areaOfOperation", headerName: "Area of Operation", width: 200 },
  { field: "sectorType", headerName: "Sector Type", width: 150 },
];


export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/dashboard/datatable");
    const sampleData = response.data;

    const userRows = sampleData.map((dataItem) => ({
      id: dataItem["Sr. No."],
      nameOfSociety: dataItem["Name of Society"],
      address: dataItem.Address,
      state: dataItem.State,
      district: dataItem.District,
      registrationDate: dataItem["Date of Registration"],
      areaOfOperation: dataItem["Area of Operation"],
      sectorType: dataItem["Sector Type"]
    }));

    return userRows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// // Call fetchData within an async function to retrieve the userRows and export it
// export const getUserRows = async () => {
//   try {
//     const userRows = await fetchData();
//     return userRows;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

