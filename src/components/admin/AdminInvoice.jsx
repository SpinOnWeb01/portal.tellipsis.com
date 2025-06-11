import {
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../Switcher.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import { getAdminProducts } from "../../redux/actions/adminPortal/adminPortal_productsAction";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Close, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { getAdminUsersList } from "../../redux/actions/adminPortal/adminPortal_listAction";
import {
  createAdminInvoice,
  getAdminInvoice,
} from "../../redux/actions/adminPortal/adminPortal_invoiceAction";
import { api } from "../../mockData";
import axios from "axios";
const drawerWidth = 240;

const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  formControl: {
    "& .MuiInputBase-root": {
      color: "#666",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      height: "45px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px !important",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
});

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row": {
            minHeight: "auto", // Adjust row height to make it more compact
          },
        },
      },
      defaultProps: {
        density: "compact", // Set default density to compact
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function AdminInvoice({ colorThem }) {
  const state = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("admin"));
  const [inputFields, setInputFields] = useState([
    { name: "", quantity: 0, price: "", amount: 0 },
  ]);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState("");
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [response, setResponse] = useState("");
  const [users, setUsers] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOrder({ user_id: "" });
    setValue("");
    setUserId("");
    setInputFields([{ name: "", quantity: 0, price: "", amount: 0 }]);
    setIsChecked(false);

    setOpen(false);
  };
  const [order, setOrder] = useState({
    user_id: "",
    sub_total: 0.0,
    cgst: 0.0,
    sgst: 0.0,
    total_amount: 0.0,
    paid_amount: 0.0,
    is_paid: false,
  });

  // ==========>

  const [selectedNumber, setSelectedNumber] = useState("");

  const handleChangeGst = (event) => {
    setSelectedNumber(event.target.value);
  };

  const [selectedNumberTwo, setSelectedNumberTwo] = useState("");

  const handleChangeGstTwo = (event) => {
    setSelectedNumberTwo(event.target.value);
  };
  // ============>

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Only update state if the new value is numeric and within the max length
    if (/^\d*$/.test(newValue) && newValue.length <= 10) {
      // adjust max length as needed
      setValue(newValue);
    }
  };

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleButtonClick = useCallback((row) => {}, []); // Memoize event handler

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAdminUsersList());
    dispatch(getAdminInvoice());
  }, [dispatch, response]);

  useMemo(() => {
    if (state?.getAdminUsersList?.userList) {
      const usersArray = Object.keys(state?.getAdminUsersList?.userList)?.map(
        (key) => ({
          user_id: key,
          username: state?.getAdminUsersList?.userList[key],
        })
      );
      setUsers(usersArray);
    }
  }, [state?.getAdminUsersList?.userList]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    const { name, value } = event.target;

    if (name === "name") {
      // Find the selected product price
      const selectedProduct = state?.getAdminProducts?.products?.find(
        (product) => product.id === parseInt(value)
      );
      if (selectedProduct) {
        data[index].price = selectedProduct.price;
      }
    }

    data[index][name] = value;

    // Recalculate the amount
    const quantity = data[index].quantity
      ? parseFloat(data[index].quantity)
      : 0;
    const price = data[index].price ? parseFloat(data[index].price) : 0;
    data[index].amount = quantity * price;

    setInputFields(data);
  };

  const addFields = () => {
    let newField = { name: "", quantity: 0, price: "", amount: 0 };
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputFields([{ name: "", quantity: 0, price: "", amount: 0 }]);
  };

  useEffect(() => {
    const newSubTotal = inputFields.reduce((acc, item) => acc + item.amount, 0);
    const sgst = parseFloat((newSubTotal * (selectedNumber / 100)).toFixed(2));
    const cgst = parseFloat(
      (newSubTotal * (selectedNumberTwo / 100)).toFixed(2)
    );
    const newTotalAmount = parseFloat((newSubTotal + sgst + cgst).toFixed(2));

    setOrder((prevOrder) => ({
      ...prevOrder,
      sub_total: formatCurrency(newSubTotal),
      sgst: formatCurrency(sgst),
      cgst: formatCurrency(cgst),
      total_amount: formatCurrency(newTotalAmount),
    }));
  }, [inputFields, selectedNumber, selectedNumberTwo]);

  const handleOpenViewPdf = (invoiceId) => {
    const url = `${api.dev}/api/generateinvoicepdf?invoice_id=${invoiceId.invoice_id}`;

    // Open in a new tab
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      window.location.href = url;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
        responseType: "blob", // Important for handling binary data like PDFs
      },
    };

    axios
      .request(config)
      .then((response) => {
        const blobUrl = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );

        // Trigger download
        // const link = document.createElement('a');
        // link.href = blobUrl;
        // link.setAttribute('download', `invoice_${4}.pdf`);
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
      })
      .catch((error) => {
        console.error("Error downloading the PDF:", error);
      });
  };

  //  const subTotalAmount =  inputFields?.reduce((acc, field) => acc + field.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      user_id: userId,
      sub_total: order.sub_total,

      tax: parseFloat(order.cgst) + parseFloat(order.sgst),

      total_amount: order.total_amount,
      paid_amount: value,
      is_paid: isChecked,
      items: inputFields.map((field) => ({
        product_id: field.name,
        quantity: field.quantity,
        unitprice: field.price,
        amount: field.amount,
      })),
    });
    dispatch(createAdminInvoice(payload, setResponse, handleClose));
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit">
              <IconButton onClick={() => handleButtonClick(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{ cursor: "pointer", color: "#0e397f" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="download" disableInteractive interactive>
              <Button>
                <FileDownloadIcon
                  className="pl-2"
                  onClick={() => handleOpenViewPdf(params.row)}
                />
              </Button>
            </Tooltip>
            {/* <Button className="invoice_download" ></Button> */}
          </div>
        );
      },
    },
    {
      field: "invoice_id",
      headerName: "Invoice Id",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user_id",
      headerName: "User Id",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      width: 100,
    },

    {
      field: "tax",
      headerName: "Tax",
      width: 130,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "is_paid",
      headerName: "Is Paid",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "sub_total",
      headerName: "Sub Total",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paid_amount",
      headerName: "Paid Amount",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();
          var hours = date.getUTCHours();
          var minutes = date.getUTCMinutes();
          var seconds = date.getUTCSeconds();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
          hours = (hours < 10 ? "0" : "") + hours;
          minutes = (minutes < 10 ? "0" : "") + minutes;
          seconds = (seconds < 10 ? "0" : "") + seconds;
          var formattedDate =
            day +
            "/" +
            month +
            "/" +
            year +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
          return (
            <>
              <span style={{ color: "blue" }}>
                {day}/{month}/{year}
              </span>
              &nbsp;
              <span style={{ color: "green" }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
        }
      },
    },
  ];

  // ============>

  const rows = [];
  state?.getAdminInvoice?.invoice &&
    state?.getAdminInvoice?.invoice?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        user_id: item.user_id,
        invoice_id: item.invoice_id,
        username: item.username,
        tax: item.tax,
        is_paid: item?.is_paid,
        sub_total: item?.sub_total,
        paid_amount: item?.paid_amount,
        total_amount: item?.total_amount,
        created_at: item?.created_at,
      });
    });

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box">
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <div className="col-lg-12">
              <div className="">
                {/* <!----> */}
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    {/* <!--role-contet--> */}
                    <div>
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div className="">
                          <h3>Invoice</h3>
                        </div>
                        <IconButton
                          className="all_button_clr"
                          onClick={handleOpen}
                        >
                          Add
                          <AddOutlinedIcon />
                        </IconButton>

                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={open}
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                        >
                          <Fade in={open} className="bg_imagess">
                            <Box
                              sx={style}
                              borderRadius="10px"
                              textAlign="center"
                            >
                              <IconButton
                                onClick={handleClose}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>
                              <br />
                              <br />
                              <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                color={"#092b5f"}
                                fontSize={"18px"}
                                fontWeight={"600"}
                                marginBottom={"16px"}
                              >
                                Add Invoice
                              </Typography>
                              <form
                                style={{
                                  textAlign: "center",
                                  textAlign: "center",
                                  // height: "400px",
                                  // overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                }}
                              >
                                <div className="row">
                                  <div>
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                      fullWidth
                                      style={{ width: "30%", margin: "7px 0" }}
                                      className={classes.formControl}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        UserName
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="UserName"
                                        style={{ textAlign: "left" }}
                                        value={userId}
                                        onChange={(e) => {
                                          setUserId(e.target.value);
                                        }}
                                      >
                                        {users?.map((item, index) => {
                                          return (
                                            <MenuItem
                                              key={index}
                                              value={item?.user_id}
                                            >
                                              {item.username}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div className="col-12">
                                    <div
                                      className="table_box mt-1"
                                      style={{
                                        overflow: "auto",
                                        height: "250px",
                                      }}
                                    >
                                      <table className="table table-responsive table-bordered border rounded table-sm">
                                        <thead>
                                          <tr>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                              }}
                                            >
                                              S.no.
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                                width: "150px",
                                                display: "block",
                                              }}
                                            >
                                              Item Name
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                                width: "20%",
                                              }}
                                            >
                                              Quantity
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                                width: "50%",
                                              }}
                                            >
                                              Price
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                              }}
                                            >
                                              Amount
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                              }}
                                            >
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {inputFields?.map((input, index) => (
                                            <tr key={index}>
                                              <td style={{ width: "5%" }}>
                                                {index + 1}
                                              </td>
                                              <td>
                                                <select
                                                  className="form-select border-0"
                                                  style={{
                                                    width: "150px !important",
                                                  }}
                                                  name="name"
                                                  value={input.name}
                                                  onChange={(event) =>
                                                    handleFormChange(
                                                      index,
                                                      event
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Select Item
                                                  </option>
                                                  {state?.getAdminProducts?.products?.map(
                                                    (item, idx) => (
                                                      <option
                                                        key={idx}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </td>
                                              <td>
                                                <input
                                                  className="border-0"
                                                  style={{
                                                    width: "100px !important",
                                                  }}
                                                  type="number"
                                                  name="quantity"
                                                  placeholder="Quantity"
                                                  value={input.quantity}
                                                  onChange={(event) =>
                                                    handleFormChange(
                                                      index,
                                                      event
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  className="border-0"
                                                  style={{
                                                    width: "100px !important",
                                                  }}
                                                  type="text"
                                                  name="price"
                                                  placeholder="Price"
                                                  value={input.price}
                                                  readOnly
                                                />
                                              </td>
                                              <td>
                                                {(
                                                  input.quantity * input.price
                                                ).toLocaleString("en-IN", {
                                                  style: "currency",
                                                  currency: "INR",
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2,
                                                })}
                                              </td>
                                              <td className="text-end">
                                                <button
                                                  className="btn btn-danger ml-2 table_remove_btn"
                                                  onClick={() =>
                                                    removeFields(index)
                                                  }
                                                >
                                                  Remove
                                                </button>
                                              </td>
                                            </tr>
                                          ))}

                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="table_bottom_row text-start"
                                            >
                                              <button
                                                type="button"
                                                onClick={addFields}
                                                className="btn btn-secondary table_add_btn ms-auto "
                                              >
                                                Add More..
                                              </button>
                                            </td>

                                            <td
                                              colSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b>Subtotal</b>
                                            </td>

                                            <td
                                              rowSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b className="d-flex align-items-center">
                                                SGST{" "}
                                                <span
                                                  style={{
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  <select
                                                    class="form-select gst_select "
                                                    aria-label="Default select example"
                                                    id="number-select"
                                                    value={selectedNumber}
                                                    label="Select Number"
                                                    onChange={handleChangeGst}
                                                  >
                                                    {/* <option selected>select</option> */}
                                                    {Array.from(
                                                      { length: 18 },
                                                      (_, index) => index + 1
                                                    ).map((number) => (
                                                      <option
                                                        value={number}
                                                        key={number}
                                                      >
                                                        {number}%
                                                      </option>
                                                    ))}
                                                  </select>
                                                </span>
                                              </b>
                                            </td>

                                            <td
                                              rowSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b className="d-flex align-items-center">
                                                CGST{" "}
                                                <span
                                                  style={{
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  <select
                                                    class="form-select gst_select "
                                                    aria-label="Default select example"
                                                    id="number-select"
                                                    value={selectedNumberTwo}
                                                    label="Select Number"
                                                    onChange={
                                                      handleChangeGstTwo
                                                    }
                                                  >
                                                    {/* <option selected>select</option> */}
                                                    {Array.from(
                                                      { length: 18 },
                                                      (_, index) => index + 1
                                                    ).map((number) => (
                                                      <option
                                                        value={number}
                                                        key={number}
                                                      >
                                                        {number}%
                                                      </option>
                                                    ))}
                                                  </select>
                                                </span>
                                              </b>
                                            </td>

                                            <td
                                              rowSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b>Total</b>
                                            </td>

                                            <td colSpan="3">
                                              <span
                                                className="total_bill_price d-block"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.sub_total}
                                              </span>

                                              <span
                                                className="total_bill_price d-block pt-2"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.sgst}
                                              </span>

                                              <span
                                                className="total_bill_price d-block pt-2"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.cgst}
                                              </span>

                                              <span
                                                className="total_bill_price d-block pt-2"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.total_amount}
                                              </span>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-end"
                                            ></td>
                                            <td
                                              colSpan="1"
                                              className="text-start"
                                            >
                                              <b className="total_bill_price d-block pt-2 text-left">
                                                Paid amount
                                              </b>
                                            </td>
                                            <td
                                              colSpan="2"
                                              className="text-end"
                                            >
                                              <Form>
                                                <Form.Group>
                                                  <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={handleChange}
                                                    maxLength={10} // adjust max length as needed
                                                    placeholder="Enter a number"
                                                  />
                                                </Form.Group>
                                              </Form>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-end"
                                            ></td>
                                            <td
                                              colSpan="1"
                                              className="text-start"
                                            >
                                              <b className="total_bill_price d-block pt-2 text-left">
                                                Is Paid{" "}
                                              </b>
                                            </td>
                                            <td
                                              colSpan="2"
                                              className="text-start"
                                            >
                                              <input
                                                type="checkbox"
                                                className="paid_checkbox form-check-input custom-checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="6"
                                              className="text-end"
                                            >
                                              <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={handleReset}
                                              >
                                                Reset
                                              </button>
                                              {/* <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button> */}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                color="primary"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background:
                                    "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                color="primary"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background: "#092b5f",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleSubmit}
                              >
                                save
                              </Button>
                            </Box>
                          </Fade>
                        </Modal>
                      </div>

                      <div className="row">
                        <ThemeProvider theme={theme}>
                          <div style={{ height: "100%", width: "100%" }}>
                            <DataGrid
                              // checkboxSelection
                              rows={rows}
                              columns={columns}
                              headerClassName="custom-header"
                              // getRowClassName={(params) =>
                              //   isRowBordered(params)
                              //     ? classes.borderedGreen
                              //     : classes.borderedRed
                              // }
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                              }}
                              autoHeight
                            />
                          </div>
                        </ThemeProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminInvoice;
