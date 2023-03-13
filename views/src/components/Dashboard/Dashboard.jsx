import { useState } from "react";
import axios from "../utility/axios";
import React, { useMemo, useEffect } from "react";
import MaterialReactTable from "material-react-table";

//mock data - strongly typed if you are using TypeScript (optional, but recommended)
// const data = [
//   {
//     name: "John",
//     age: 30,
//   },
//   {
//     name: "Sara",
//     age: 25,
//   },
// ];

function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchUser = async () => {
      try {
        let response = await axios.get("/manage/users");
        console.log(response.data.allUser);
        setTableData(response.data.allUser);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    tableData[row.index] = values;
    let id = row._valuesCache._id;
    // console.log(row._valuesCache._id);
    // manage/users/640f6ffbdca30381a36f55ac
    axios
      .patch("/manage/users/640f6ffbdca30381a36f55ac", values)
      .then((res) => {
        console.log(res);
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode
      })
      .catch((err) => {});
    console.log(values);
    //send/receive api updates here
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "firstName", //simple recommended way to define a column
        header: "FirstName",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "lastName", //simple recommended way to define a column
        header: "LastName",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "email", //simple recommended way to define a column
        header: "Email",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "gender", //simple recommended way to define a column
        header: "gender",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "phone", //simple recommended way to define a column
        header: "Phone",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "batch", //simple recommended way to define a column
        header: "Batch",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      // {
      //   accessorFn: (originalRow) => originalRow.age, //alternate way
      //   id: 'age', //id required if you use accessorFn instead of accessorKey
      //   header: 'Age',
      //   Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
      // },
    ],
    []
  );

  return (
    <>
      {!loading ? (
        <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowSelection //enable some features
          enableColumnOrdering
          enableGlobalFilter={false} //turn off a feature
          editingMode="modal"
          enableEditing
          enableClickToCopy={true}
          onEditingRowSave={handleSaveRow}
        />
      ) : (
        <h1>Loading...</h1>
      )}

      {/* <MaterialReactTable
      columns={columns}
      data={tableData}
      enableRowSelection //enable some features
      enableColumnOrdering
      enableGlobalFilter={false} //turn off a feature
      editingMode="modal"
      enableEditing
      enableClickToCopy={true}
      onEditingRowSave={handleSaveRow}
      /> */}
    </>
  );

  // return (
  //   loading && (
  //     <MaterialReactTable
  //       columns={columns}
  //       data={tableData}
  //       enableRowSelection //enable some features
  //       enableColumnOrdering
  //       enableGlobalFilter={false} //turn off a feature
  //       editingMode="modal"
  //       enableEditing
  //       enableClickToCopy={true}
  //       onEditingRowSave={handleSaveRow}
  //     />
  //   )
  // );
}

export default App;
