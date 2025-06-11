import {
    Box,
    Button,
    Fade,
    IconButton,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useMemo, useState } from "react";
  import Backdrop from "@mui/material/Backdrop";
  import { Close } from "@mui/icons-material";
  import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../mockData";
import { getManagePayment } from "../../redux/actions/managePortal/managePortal_paymentAction";
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // backgroundColor: "rgb(9, 56, 134)",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const convertedStyle = {
    "input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: "0"
    },
    "input[type=number]": { MozAppearance: "textfield" }
  }
  
  function ManageAccounts() {
    const current_user = localStorage.getItem("current_user");
    const email = JSON.parse(localStorage.getItem(`user_${current_user}`));
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = useState(0); // State to store the amount
    const [selectedProduct, setSelectedProduct] = useState("Select");
    const [product, setProduct] = useState([])
    const [mnumber, setMnumber] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [sgst, setSgst] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {
      if (selectedProduct) {
        const product = state?.getManagePayment?.Payment?.find(item => item.id === parseInt(selectedProduct));
        setPrice(product ? product.price : '');
        calculateAmount(quantity, product ? product.price : 0);
      }
    }, [selectedProduct]);
  
    useEffect(() => {
      if (price && quantity) {
        calculateAmount(quantity, price);
      }
    }, [quantity, price]);
  
    const handleProductChange = (event) => {
      setSelectedProduct(event.target.value);
    };
  
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };
  
    const calculateAmount = (qty, price) => {
      const subtotal = qty * price;
      const sgst = subtotal * 0.09;
      const cgst = subtotal * 0.09;
      const total = subtotal + sgst + cgst;
  
      setAmount(subtotal);
      setSgst(sgst);
      setCgst(cgst);
      setTotal(total);
    };
   
  
    const handleClose = () => {
      setOpen(false);
      // setExtensionNumber("");
      // setPassword("");
      // setUserId("");
    };

    useEffect(()=>{
      dispatch(getManagePayment());
      
    },[dispatch])
    useMemo(()=>{
      setProduct(state?.getManagePayment?.Payment)
    },[state?.getManagePayment?.Payment])
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
  
    const displayRazorpay = async (amount) => {
      const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
    
      // Create order on your backend
      // const orderResponse = await fetch('http://dev.tellipsis.com:5005/payment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //      Authorization: `Bearer ${token.access_token} `
      //   },
      //   body: JSON.stringify({
      //     order_id: "order_12345", // If your backend generates the order_id, you can remove this line
      //     user_id: "4",
      //     amount: amount,
      //     email: "pramod.kumar@spinonweb.net",
      //     contact: "9911242150",
      //     status: "created" // Initial status
      //   })
      // });
    
      // const orderData = await orderResponse.json();
      // if (!orderData || !orderData.order_id) {
      //   alert("Failed to create order. Please try again.");
      //   return;
      // }
    
      const options = {
        key: "rzp_test_59TASixs1zLUyh",
        amount: amount * 100,
        currency: "INR",
        name: "Tellipsis",
        description: "Test Transaction",
        image: "http://localhost:3000/img/logo-4-edit-1.png",
        order_id: "",
        handler: async function (response) {
          console.log("response", response);
          alert("Payment Successful");
    
        
          // Post success data to your backend
          await fetch(`${api.dev}/api/payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token.access_token} `
            },
            body: JSON.stringify({
              order_id: selectedProduct,
              user_id: email.uid,
              amount: amount,
              email: email.user_email,
              contact:mnumber,
              quantity:quantity,
              status: "success",
              payment_id: response.razorpay_payment_id,
              minutes: 3100 * quantity
            })
          });
          setAmount(0)
          setSelectedProduct("Select"); // Reset dropdown to "Select"
          setMnumber('')
          setQuantity('')
          setPrice('')
          setSgst(0)
          setCgst(0)
          setTotal(0)
        },
        prefill: {
          email: email.user_email,
          contact: mnumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: function () {
            console.log("Popup closed");
          },
        },
      };
    
      const paymentObject = new window.Razorpay(options);
    
      paymentObject.on('payment.failed', async function (response) {
        alert("Payment Failed");
    
        // Post failure data to your backend
        await fetch(`${api.dev}/api/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token.access_token} `
          },
          body: JSON.stringify({
            order_id: selectedProduct,
            user_id: email.uid,
            amount: amount,
            email: email.user_email,
            contact: mnumber,
            quantity:quantity,
            minutes:"0",
            status: "failed",
            payment_id: response.error.metadata.payment_id
          })
          
        });

        setAmount(0)
        setSelectedProduct("Select"); // Reset dropdown to "Select"
        setMnumber('')
        setQuantity('')
        setPrice('')
        setSgst(0)
        setCgst(0)
        setTotal(0)
      });
    
      paymentObject.open();
    
      paymentObject.on('modal.show', function() {
        const razorpayModal = document.querySelector('.razorpay-container');
        if (razorpayModal) {
          razorpayModal.style.height = '60%';
        }
      });
    };
    
  
    return (
      <section className="sidebar-sec" style={{ background: "aliceblue" }}>
        <div className="container-fluid">
          <div className="row">
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
                    <div className="tab_cntnt_box">
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          //justifyContent: "space-between",
                          justifyContent: "center",
                          alignItems: "end",
                        }}
                      >
                        <div>
                          <h3>Accounts</h3>
                        </div>
  
                        {/* <IconButton
                          className="all_button_clr"
                          onClick={handleOpen}
                        >
                          Add
                          <AddOutlinedIcon />
                        </IconButton> */}
  
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
                                Add Extension
                              </Typography>
                              <form
                                style={{
                                  textAlign: "center",
                                  // height: "400px",
                                  overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                }}
                              >
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Range"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  name="extensionNumber"
                                  //   value={extensionNumber}
                                  //   onChange={(e) => {
                                  //     setExtensionNumber(e.target.value);
                                  //   }}
                                />
                                <br />
  
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
                              </form>
                            </Box>
                          </Fade>
                        </Modal>
                      </div>
  
                      <Box className="my-0 mt-3">
                        <div className="row">
                          <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 d-flex align-items-stretch m-auto">
                            <div className="account_box w-100">
                           <div className="account_inner_box">
                           <ul className="p-0 w-50">
                            <li className="w-100 px-1 mb-2">
                                <Form.Label className="accnt_label w-25">
                                Mobile No.
                                </Form.Label>
                                <Form.Control
                                  className="accnt_select"
                                  type="number"
                                  placeholder="Mobile Number"
                                  style={{convertedStyle}}
                                  value={mnumber}
                                  onChange={(e)=>{setMnumber(e.target.value)}}
                                />
                              </li>
                              <li className="w-100 px-1 mb-2">
        <Form.Label className="accnt_label">
          Item name
        </Form.Label>
        <Form.Select size="md" className="accnt_select" value={selectedProduct} onChange={handleProductChange}>
          <option value="Select">Select</option>
          {product?.map(
            (item, item_value) => (
              <option
                key={item_value}
                value={item.id}
              >
                {item.name}
              </option>
            )
          )}
        </Form.Select>
      </li>
      </ul>
      <ul className="w-50">
      <li className="w-100 px-1 mb-2">
        <Form.Label className="accnt_label w-25">
          Quantity
        </Form.Label>
        <Form.Control
          className="accnt_select"
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </li>
      <li className="w-100 px-1 mb-2">
        <Form.Label className="accnt_label w-25">
          Price
        </Form.Label>
        <Form.Control
          className="accnt_select"
          type="text"
          name="Price"
          placeholder="Price"
          value={price}
          readOnly
        />
      </li>
        </ul>
                           </div>
                           <div>
     <ul>
      <li className="w-100 px-1 mb-2 text-end">
        <Form.Label className="accnt_label w-25 mb-0">
          Amount
        </Form.Label>
        <p className="mb-0">{amount.toFixed(2)}</p>
        <ul className="accnt_totale_box p-0">
          <li>
            <span>Subtotal</span>
            <b>{amount.toFixed(2)}</b>
          </li>
          <li>
            <span>SGST&nbsp;9%</span>
            <b>{sgst.toFixed(2)}</b>
          </li>
          <li>
            <span>CGST &nbsp;9%</span>
            <b>{cgst.toFixed(2)}</b>
          </li>
          <li
            style={{ background: "rgb(14 57 127)", padding: "5px" }}
            className="my-2"
          >
            <span className="text-white">Total&nbsp;</span>
            <b className="text-white">{total.toFixed(2)}</b>
          </li>
        </ul>
      </li>
                              <button
                              className="m-auto w-100 border-0"
                              onClick={() => displayRazorpay(total.toFixed(2))} // Pass the amount here
                              style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", background:'#f5751d', color:'white' }}
                            >
                              Pay Now
                            </button>
                            </ul>
     </div>
                            </div>
                            
                          </div>
                        </div>
                      </Box>
                    </div>
                    {/* <!--role-content--> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default ManageAccounts;
  