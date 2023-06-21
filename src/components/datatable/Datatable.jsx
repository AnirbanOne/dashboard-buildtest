import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, fetchData } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const userRows = await fetchData();
        setData(userRows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAsync();
  }, []);


  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
