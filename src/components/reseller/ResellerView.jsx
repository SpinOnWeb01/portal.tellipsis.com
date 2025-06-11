import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import packageJson from "pdfjs-dist/package.json";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Close } from "@mui/icons-material";
import GetAppIcon from "@mui/icons-material/GetApp";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { api } from "../../mockData";
import { CircularProgress, Container } from "@mui/material";
import { getAllUsers, getRoleUsers } from "../../redux/actions/adminPortal/userAction";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import { Nav } from "react-bootstrap";
import { getAllUsersReseller, getRoleUsersReseller } from "../../redux/actions/resellerPortal/resellerPortal_usersAction";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${packageJson.version}/pdf.worker.min.js`;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  img: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    position: "relative",
    outline: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundcolor: "red",
    },
  },
  // img: {
  //     outline: "none"
  // }
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// =======modal-popup---->
const style = {
  padding: "20px !Important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
};

function ResellerView({ colorThem }) {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem("reseller"));
  const user = JSON.parse(localStorage.getItem("reseller"));
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [values, setValues] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [img, setImage] = useState("false");
  const [response, setResponse] = useState("false");

  const [numPages, setNumPages] = useState(null);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ===========>
  const [activeKey, setActiveKey] = useState("/home");

  const isImage = (fileName) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const fileExtension = fileName
      .slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1)
      .toLowerCase();
    return imageExtensions.includes(`.${fileExtension}`);
  };

  const isPdf = (fileName) => {
    const pdfExtensions = [".pdf"];
    const fileExtension = fileName
      .slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1)
      .toLowerCase();
    return pdfExtensions.includes(`.${fileExtension}`);
  };

  const renderContent = () => {
    switch (activeKey) {
      case "/home":
        return (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Display thumbnails of PDF files */}
            {imgs?.data?.map((pdf, index) => (
              <div
                className="list-pdf-file"
                key={index}
                style={{
                  margin: "10px",
                  cursor: isImage(pdf.file_name) ? "pointer" : "default",
                  display: isImage(pdf.file_name) ? "block" : "none",
                }}
                onClick={() => handlePDFClick(pdf.src)}
              >
                <Box className="gallery_image_box">
                  {isImage(pdf.file_name) ? (
                    <>
                      {" "}
                      <img
                        src={pdf.file_data}
                        alt="gallery image"
                        style={{
                          width: "100%",
                          height: "300px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleImage(pdf.file_data);
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Box>

                {/* </Grid> */}
              </div>
            ))}

            <Modal
              className={classes.modal}
              open={openImg}
              onClose={handleImgClose}
              //closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 1000,
              }}
            >
              <Fade in={openImg} timeout={500} className={classes.img}>
                <Box>
                  <IconButton
                    onClick={handleImgClose}
                    sx={{ position: "absolute", right: "0px" }}
                  >
                    <Close className="profile_modal_clss_btn" />
                  </IconButton>
                  <img
                    src={img}
                    alt="asd"
                    style={{
                      maxHeight: "900px",
                      maxWidth: "900px",
                    }}
                  />
                  {/* <Document
              file={`data:application/pdf;base64,${img.replace(
                "data:image/png;base64,",
                ""
              )}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                )
              )}
            </Document> */}
                </Box>
              </Fade>
            </Modal>
          </div>
        );
      case "link-1":
        return (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Display thumbnails of PDF files */}
            {imgs?.data?.map((pdf, index) => (
              <div
                className="list-pdf-file"
                key={index}
                style={{
                  margin: "10px",
                  cursor: isPdf(pdf.file_name) ? "pointer" : "default",
                  display: isPdf(pdf.file_name) ? "block" : "none",
                }}
                onClick={() => handlePDFClick(pdf.src)}
              >
                <Box className="gallery_image_box">
                  {isPdf(pdf.file_name) ? (
                    <>
                      <iframe
                        id="myIframe"
                        src="data:application/pdf;base64,JVBERi0xLjQNCiX5+prnDQolIDEyMTA5DQoxMyAwIG9iag0KPDwKL0UgMjA5NzIKL0ggWzEzMDMgMTY3XQovTCA4NTg5MgovTGluZWFyaXplZCAxCi9OIDIKL08gMTYKL1QgODU1ODMKPj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgDQplbmRvYmoNCg0KeHJlZg0KMTMgMTMNCjAwMDAwMDAwMzIgMDAwMDAgbg0KMDAwMDAwMTIxMSAwMDAwMCBuDQowMDAwMDAxMzAzIDAwMDAwIG4NCjAwMDAwMDE0NzAgMDAwMDAgbg0KMDAwMDAwMTY3MSAwMDAwMCBuDQowMDAwMDAxOTE4IDAwMDAwIG4NCjAwMDAwMDMxMzMgMDAwMDAgbg0KMDAwMDAwNDE3OSAwMDAwMCBuDQowMDAwMDA0MzQ1IDAwMDAwIG4NCjAwMDAwMDQ0MDUgMDAwMDAgbg0KMDAwMDAwNDUyNyAwMDAwMCBuDQowMDAwMDA0NjE3IDAwMDAwIG4NCjAwMDAwMTAxNzYgMDAwMDAgbg0KdHJhaWxlcg0KPDwKL0lEIFs8RDM3QTgwOTNCNkI0QjVCQ0ZGRjhDRUE0ODAyMzc5NkQ+Cjw3Mzg4MzA0RjdCOUI5M0M2RkI1NTNGNURDRTUyRDVERj5dCi9JbmZvIDEyIDAgUgovUHJldiA4NTU3MgovUm9vdCAxNCAwIFIKL1NpemUgMjYKL1NvdXJjZSAoV2VKWEZ4Tk80ZkpkdXlVTWV0VGNQOStvYU9OZklOTjQrZDZ3N2ZEbFhWd054V2lhUGxyOVpaTS9ERjFEM1ExcEI5a2hnbThWdENGbXlkOGdJcndPalFSQUlqUHNXaE00dmdNQ1ZcDQo4S3ZWRi9LOGxlVjBzZ3RZTVBnT1ZpYlVHSjRkNlZMY2Z4RHdGWW5HRWc9KQo+PiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0Kc3RhcnR4cmVmDQowDQolJUVPRg0KDQoxNCAwIG9iag0KPDwKL091dGxpbmVzIDEwIDAgUgovUGFnZU1vZGUgL1VzZU5vbmUKL1BhZ2VzIDExIDAgUgovVHlwZSAvQ2F0YWxvZwo+Pg0KZW5kb2JqDQoNCjE1IDAgb2JqDQo8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDgxCi9TIDY4Cj4+DQpzdHJlYW0NCnicY2Bg4GRgYBVnUGBg8NEDkXCgAIUpQDYjQji7lAEFwPisYkCCC4oZGGzAZvUC8W4GBpZmBgbmW0B2FlSTHRDLMTCIVjMwaH6AmQQACLUJKw0KZW5kc3RyZWFtDQplbmRvYmoNCg0KMTYgMCBvYmoNCjw8Ci9Db250ZW50cyBbMjIgMCBSXQovR3JvdXAgPDwKL0NTIC9EZXZpY2VSR0IKL1MgL1RyYW5zcGFyZW5jeQovVHlwZSAvR3JvdXAKPj4KL01lZGlhQm94IFswIDAgNTk1IDg0Ml0KL1BhcmVudCAxMSAwIFIKL1Jlc291cmNlcyA8PAovWE9iamVjdCA8PAovSWFiYzQgMjQgMCBSCj4+Cj4+Ci9UeXBlIC9QYWdlCj4+DQplbmRvYmoNCg0KMTcgMCBvYmoNCjw8Ci9Bc2NlbnQgMTEzNQovQ0lEU2V0IDIzIDAgUgovQ2FwSGVpZ2h0IDY4OAovRGVzY2VudCAtNDM5Ci9GbGFncyAzMgovRm9udEJCb3ggWy01NDggLTM1OSAxMDc2IDEwOTVdCi9Gb250RmlsZTIgMjUgMCBSCi9Gb250TmFtZSAvSkJaRlNNK1NhaXJhU2VtaUNvbmRlbnNlZC1SZWd1bGFyCi9JdGFsaWNBbmdsZSAwCi9MZWFkaW5nIDAKL1N0ZW1WIDgwCi9UeXBlIC9Gb250RGVzY3JpcHRvcgo+Pg0KZW5kb2JqDQoNCjE4IDAgb2JqDQo8PAovQmFzZUZvbnQgL0pCWkZTTStTYWlyYVNlbWlDb25kZW5zZWQtUmVndWxhcgovQ0lEU3lzdGVtSW5mbyA8PAovT3JkZXJpbmcgKElkZW50aXR5KQovUmVnaXN0cnkgKEFkb2JlKQovU3VwcGxlbWVudCAwCj4+Ci9DSURUb0dJRE1hcCAvSWRlbnRpdHkKL0RXIDIxMgovRm9udERlc2NyaXB0b3IgMTcgMCBSCi9TdWJ0eXBlIC9DSURGb250VHlwZTIKL1R5cGUgL0ZvbnQKL1cgWzAKWzUwMCAwXQo0CjEwCjU5MwoxMQpbODIxIDU5MSA0OTEgNDkxIDU5NyA1OTddCjE3CjIxCjUxOQoyMgpbNDg3IDU4NSA2MzRdCjI1CjI5CjI1NAozMApbMzA1IDU4MCA0NjEgNDYxIDc5NSA2MzQgNjM0XQozNwo0MQo2MjEKNDIKWzYyMCA2MjEgOTAwIDU2NCA1NjQgNjIxIDU5MSA1NDAgNTAxXQo1MQo1NQo2MTYKNTYKWzU2OSA4NTEgNTg0IDUyNiA1MjYgNTE5IDU1OSA1ODUgNTI3IDUyNwo2MjFdCjY3CjczCjUwMAo3NApbNzkwIDUyMyA0MDYgNDA2IDUyMyA1MTNdCjgwCjg0CjQ5Ngo4NQpbMzI3IDUyMiA1MjldCjg4Cjk2CjIyNwo5NwpbNDc1IDIyNyAyNjggNzg4IDUyOSA1MjldCjEwMwoxMDkKNTEwCjExMApbODE5IDUyMyA1MjMgNTIzIDMyNyA0NDAgNTM4IDMxN10KMTE4CjEyMgo1MjkKMTIzCls0NzAgNzIwIDQ4MSA1MjkgNTI5IDUyOSA0NDQgNDU0IDUyMiA0NzAKNDcwIDQ3MCA1MTAgNjU0IDU1NCA1NTQgMzY5IDM4MSA1MzAgNTgxCjMzMCA1MjggNTE3IDU1OCA1MzQgNTY5IDQ4OCA1OTAgNTY5IDM0MwoyMDQgMzE2IDMwOSAzMjggMzIwIDMzNiAyOTIgMzUwIDMzNiAzNDMKMjA0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L0ZvbnQKL1cgWzAKWzc1MCAwIDI3NyAyNzcgMzMzIDQ3NCA1NTYgNTU2IDg4OSA3MjIKMjM3IDMzMyAzMzMgMzg5IDU4MyAyNzcgMzMzIDI3NyAyNzddCjE5CjI4CjU1NgoyOQpbMzMzIDMzMyA1ODMgNTgzIDU4MyA2MTAgOTc1IDcyMiA3MjIgNzIyCjcyMiA2NjYgNjEwIDc3NyA3MjIgMjc3IDU1NiA3MjIgNjEwIDgzMwo3MjIgNzc3IDY2NiA3NzcgNzIyIDY2NiA2MTAgNzIyIDY2NiA5NDMKNjY2IDY2NiA2MTAgMzMzIDI3NyAzMzMgNTgzIDU1NiAzMzMgNTU2CjYxMCA1NTYgNjEwIDU1NiAzMzMgNjEwIDYxMCAyNzcgMjc3IDU1NgoyNzcgODg5IDYxMCA2MTAgNjEwIDYxMCAzODkgNTU2IDMzMyA2MTAKNTU2IDc3NyA1NTYgNTU2IDUwMCAzODkgMjc5IDM4OSA1ODMgNzIyCjcyMiA3MjIgNjY2IDcyMiA3NzcgNzIyXQoxMDUKMTE1CjU1NgoxMTYKMTE5CjI3NwoxMjAKMTI5CjYxMAoxMzAKWzU1NiAzOTkgNTU2IDU1NiA1NTYgMzUwIDU1NiA2MTAgNzM2IDczNgoxMDAwIDMzMyAzMzMgNTQ4IDEwMDAgNzc3IDcxMiA1NDggNTQ4IDU0OAo1NTYgNTc2IDQ5NCA3MTIgODIzIDU0OCAyNzMgMzcwIDM2NSA3NjgKODg5IDYxMCA2MTAgMzMzIDU4MyA1NDggNTU2IDU0OCA2MTEgNTU2CjU1NiAxMDAwIDcyMiA3MjIgNzc3IDEwMDAgOTQzIDU1NiAxMDAwIDUwMAo1MDAgMjc3IDI3NyA1NDggNDk0IDU1NiA2NjYgMTY2IDU1NiAzMzMKMzMzIDYxMCA2MTAgNTU2IDI3NyAyNzcgNTAwIDEwMDAgNzIyIDY2Ngo3MjIgNjY2IDY2NiAyNzcgMjc3IDI3NyAyNzcgNzc3IDc3NyA3NzcKNzIyIDcyMiA3MjIgMjc3XQoyMTQKMjIzCjMzMwoyMjQKWzYxMCAyNzcgNjY2IDU1NiA2MTAgNTAwIDI3OSA3MjIgNjEwIDY2Ngo1NTYgNjY2IDYxMCA1ODMgNTgzIDMzMyAzMzMgMzMzIDgzMyA4MzMKODMzIDU1NiA3NzcgNjEwIDI3NyA2NjYgNTU2IDcyMiA1NTYgNzIyCjU1NiA2MTAgNTUyIDMzMyA3MjIgNTU2IDcyMiA1NTYgNzIyIDcxOAo3MjIgNjY2IDU1NiA2NjYgNTU2IDYxMCAyNzcgNjEwIDM4NSA2MTAKNDc5IDcyMiA2MTAgNzIyIDYxMCA3NzcgNjEwIDcyMiAzODkgNzIyCjM4OSA2NjYgNTU2IDYxMCAzMzMgNjEwIDQ3OSA3MjIgNjEwIDcyMgo2MTAgNjEwIDUwMCA2MTAgNTAwIDYwMSA3NzcgODIwIDYxNCA2MDYKNDc0IDY4NCA0NDYgNzE1IDU1MiA2MDQgMzk1IDEwOTMgMTAwMCA1MDAKMTAwMCA1MDAgMTAwMCA1MDAgNTAwIDk3OSA3MjIgNTgzIDYwNCA1ODMKNjA0IDYwNCA3MDggNjI1XQozMjgKMzcyCjcwOAozNzMKWzcyOSA2MDQgMTAwMCA5ODkgOTg5IDk4OSA5ODkgNjA0IDYwNCA2MDQKMTAyMCAxMDUyIDkxNiA3NTAgNzUwIDUzMSA2NTYgNTkzIDUxMCA1MDAKNzUwIDc4NCA1NTYgNzA4IDIzOSA0NzkgODg1IDQ4OCA2MDQgMzU0CjM1NCA2MDQgMzU0IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDY2Ngo1NTYgNjY2IDU1NiA2NjYgNTU2IDc3NyA2MTAgNzc3IDYxMCA3NzcKNjEwIDcyMiA2MTAgNzIyIDYxMF0KNDI4CjQzNQoyNzcKNDM2Cls1NTYgMjc3IDcyMiA1NTYgNTU2IDYxMCAyNzcgNzIyIDYxMCA3MjMKNjEwIDc3NyA2MTAgNzc3IDYxMCA3MjIgMzg5IDY2NiA1NTYgNjEwCjMzMyA3MjIgNjEwIDcyMiA2MTAgNzIyIDYxMCA3MjIgNjEwIDk0Mwo3NzcgNjY2IDU1NiAyNzcgNzIyIDU1NiAxMDAwIDg4OSA3NzcgNjEwCjMzMyA5NDMgNzc3IDk0MyA3NzcgOTQzIDc3NyA2NjYgNTU2IDI3NwozMzMgNTU2IDYwMCA4MzMgODMzIDgzMyA4MzMgMzMzIDMzMyAzMzMKNDY0IDcyMiA4NTMgOTA1IDQ3MyA4MjQgOTI3IDgzNyAyNzcgNzIyCjcyMiA3MTggNjY2IDYxMCA3MjIgMjc3IDcyMiA2NjYgODMzIDcyMgo2NDMgNzc3IDcyMiA2NjYgNjAwIDYxMCA2NjYgNjY2IDgwOSA4MDEKMjc3IDY2NiA2MTQgNDUxIDYxMCAyNzcgNTgyIDYxMCA1NTYgNDYwCjYxMCA1NDAgMjc3IDU1NyA1NTYgNjExIDU1NiA0NDUgNjEwIDYxOAo1MjAgNTgyIDU3NSA3NTMgODQ0IDI3NyA1ODIgNjEwIDU4MiA4NDQKNjY4IDg4NSA1NjYgNzExIDY2NiAyNzcgMjc1IDU1NiAxMDkzIDEwNjIKODc1IDYxMCA2MjIgNzE4IDcyMiA3MTggNzIyIDU2NiA3MTIgNjY2CjkwMyA2MjYgNzE4IDcxOCA2MTAgNzAxIDgzMyA3MjIgNzc3IDcxOAo2NjYgNzIyIDYxMCA2MjIgODUzIDY2NiA3MzAgNzAyIDEwMDQgMTAxOQo4NjkgOTc5IDcxOCA3MTEgMTAzMSA3MTggNTU2IDYxNyA2MTQgNDE2CjYzNCA1NTYgNzA4IDQ5NyA2MTQgNjE0IDUwMCA2MzUgNzM5IDYwNAo2MTAgNjA0IDYxMCA1NTYgNDg5IDU1NiA4NzUgNTU2IDYxNCA1ODAKODMzIDg0MyA3MjkgODU0IDYxNCA1NTIgODU0IDU4MyA1NTYgNjEwCjQxNiA1NTIgNTU2IDI3NyAyODEgMjc3IDk2OCA5MDYgNjEwIDUwMAo1NTYgNjA0IDQ4NiA0NDYgMTAwMCAxMTE0IDc2NV0KNjUzCjY2NQowCjY2NgpbNDQ2IDAgMjk5IDAgMCAzMzMgNTgyIDU3NSA0NTYgNTQ5CjYxNCAyNzIgNDEzIDYxNSA2MjYgMjcyIDUyMSA0OTAgNDk2IDYxMAo2MjkgMjcyIDM4NSA2MTMgNTQzIDU5MyA1ODYgNDk5IDUxMSA1NzIKNTIxIDcxNCA2NzMgNTQ1IDU0NSA1NDUgMjc2IDUwNCA4MTcgMjcyCjUyMSA1MjEgNDk2IDQ5NiA1NTkgNzE0IDcxNCA3MTQgNzE0IDU4Mgo1ODIgNTgyIDU3NSA0NTQgNTQ5IDYxNCAzMjIgNDM3IDYyNiAzMjIKNTIxIDQ5MCA0OTYgNjI5IDM4NSA2MTMgNTkzIDU4NiA1MTEgNTcyCjUyMSA3MTQgNjczIDI3MiA1NzUgNDkwIDU4NiA2MDYgMCAwCjAgMCAzMTggMzE4IDM1NiA0NjggMTk4XQo3NTMKNzYwCjAKNzYxCjc3MAo1NjEKNzcxCls1MjUgMzE4IDUyNSA3NTAgNzUwIDM0MiA3NTAgNTYxIDU2MSA1NjFdCjc4MQo3ODUKNzUwCjc4Ngo3ODYKMAo3ODcKNzk0Cjc1MAo3OTUKWzYxMiA3NTAgNzUwIDc1MCA2NDkgNjQ5IDI3MSAyNzEgNzUwIDc1MAo3NTAgNzUwIDU3NyA1NTggNTIzIDUyMyA0MzIgNDMyIDc1NiA4NzgKMzYwIDU0MSA3NTYgODc4IDM2MCA1NDEgNjQ0IDU1NCA0MTVdCjgyNAo4MzgKNzUwCjgzOQo4NDMKMAo4NDQKODQ1Cjc1MAo4NDYKODYxCjAKODYyCls1NTYgMTAwMF0KODY0Cjg5MQo3NTAKODkyClszMTggMzE4IDc1MCA3MDMgNDY4IDIzOCAyNTMgMjE2IDIzNCA0NTEKNDUxIDIxNiAyMzQgNjQ0IDU3NyAyNzEgMjcxIDIxNiAyMzQgNjQ5CjY0OSAyNzEgMjcxIDM0MiA0MTUgNjQ5IDY0OSAyNzEgMjcxIDY0OQo2NDkgMjcxIDI3MSA1NzcgNTU4IDUyMyA1MjMgNTc3IDU1OCA1MjMKNTIzIDU3NyA1NTggNTIzIDUyMyAzNDIgMzQyIDM0MiAzNDIgNDMyCjQzMiA0MzIgNDMyIDg5OSA4OTkgNjA4IDYwOCA4OTkgODk5IDYwOAo2MDggMTA2MiAxMDYyIDc3MSA3NzEgMTA2MiAxMDYyIDc3MSA3NzFdCjk2MQo5NjgKNTIzCjk2OQpbNTQxIDQ2OCA1NDEgMzYwIDU0MSA0NjggNTQxIDM2MCA3NTcgNzU3CjMwNCAzMjQgNjEyIDYxMiAzMDQgMzI0IDU0MSA1NDEgMzYwIDM2MAo0NTEgNDUxIDIzNCAyMzQgMzYwIDM2MCA0MTUgNDE1IDU0MSA1NDEKMjcxIDI3MSAzNDIgNDE1IDQ2OCA0NTEgNDUxIDQ1MSA2NDQgNTU0CjY0NCA1NzcgMjcxIDI3MSA1NDEgNTk1IDQ4NiA1NDEgNDg2IDU0MQo0ODYgNTQxIDc1MCA3NTAgMCAwIDc1MCA3NTAgNzUwIDAKMCA3NTAgNzUwIDAgMCA3NTAgNzUwIDc1MF0KMTAzNwoxMDQyCjAKMTA0MwpbNzUwIDAgMF0KMTA0NgoxMDk5Cjc1MAoxMTAwCjExMDIKMzE4CjExMDMKMTEyNQo3NTAKMTEyNgpbMzQyIDEyNSAxMDAwIDIwMDAgODUzIDcxMCA4MjkgNzI0XQoxMTM0CjExNDkKMAoxMTUwCls1MTMgODMzIDgzM10KMTE1MwoxMTg2CjAKMTE4NwpbMjc3IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyCjU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMgo1NTYgNzIyIDU1NiA3MjIgNTU2IDY2NiA1NTYgNjY2IDU1NiA2NjYKNTU2IDY2NiA1NTYgNjY2IDU1NiA2NjYgNTU2IDY2NiA1NTYgNjY2CjU1NiAyNzcgMjc3IDI3NyAyNzcgNzc3IDYxMCA3NzcgNjEwIDc3Nwo2MTAgNzc3IDYxMCA3NzcgNjEwIDc3NyA2MTAgNzc3IDYxMCA4NTMKNzEwIDg1MyA3MTAgODUzIDcxMCA4NTMgNzEwIDg1MyA3MTAgNzIyCjYxMCA3MjIgNjEwIDgyOSA3MjQgODI5IDcyNCA4MjkgNzI0IDgyOQo3MjQgODI5IDcyNCA2NjYgNTU2IDY2NiA1NTYgNjY2IDU1NiA3MjIKNTU2IDI3NyAyNzcgNzc3IDYxMCA3MjIgNjEwIDcyMiA2MTAgNzIyCjYxMCA3MjIgNjEwIDcyMiA2MTAgMCAwIDAgMCA1NjYKNDE2IDkwMyA3MDggNjEwIDUwMCA2MTAgNTAwIDcyMiA2MDQgNTU2CjU1NiA1NTYgNTU2IDY2NiA1NTYgNzAyIDU4MCA3MDIgNjEwIDcyNgo1NTYgNzc3IDYxMCA2NDkgMjcxIDMwNCAzMjQgNjEyXQoxMzI1CjEzMzAKMjcxCjEzMzEKWzAgMCAwIDMzMyAzMzMgMCAwIDAgMCAyMTYKMjM0IDIxNiAyMzQgMjE2IDIzNCAyMTYgMjM0IDQ1MSA0NTEgNDUxCjQ1MSA2NDQgNTU0IDY0OSA2NDkgMjcxIDI3MSA2NDkgNjQ5IDI3MQoyNzEgNjQ5IDY0OSAyNzEgMjcxIDY0OSA2NDkgMjcxIDI3MSA2NDkKNjQ5IDI3MSAyNzEgNjQ5IDY0OSAyNzEgMjcxIDY0OSA2NDkgMjcxCjI3MSA1NzcgNTU4IDUyMyA1MjMgNTc3IDU1OCA1MjMgNTIzIDU3Nwo1NTggNTIzIDUyMyA1NzcgNTU4IDUyMyA1MjMgNTc3IDU1OCA1MjMKNTIzIDU3NyA1NTggNTIzIDUyM10KMTQwNgoxNDIzCjM0MgoxNDI0CjE0MzkKNDMyCjE0NDAKWzg5OSA4OTkgNjA4IDYwOCA4OTkgODk5IDYwOCA2MDggODk5IDg5OQo2MDggNjA4IDEwNjIgMTA2MiA3NzEgNzcxIDEwNjIgMTA2MiA3NzEgNzcxCjUyMyA1MjMgNTQxIDQ2OCA1NDEgMzYwIDc1NyA3NTcgNzU3IDMwNAozMjQgNzU3IDc1NyAzMDQgMzI0IDc1NyA3NTcgMzA0IDMyNCA3NTcKNzU3IDMwNCAzMjQgNzU3IDc1NyAzMDQgMzI0IDYxMiA2MTIgNjEyCjYxMiAxMTU1IDExNTUgOTA2IDkwNiA3NTYgODc4IDM2MCA1NDEgNTQxCjU0MSAzNjAgMzYwIDU0MSA1NDEgMzYwIDM2MCA1NDEgNTQxIDM2MAozNjAgNzU2IDg3OCAzNjAgNTQxIDc1NiA4NzggMzYwIDU0MSA3NTYKODc4IDM2MCA1NDEgNzU2IDg3OCAzNjAgNTQxIDc1NiA4NzggMzYwCjU0MSA0NTEgNDUxIDIzNCAyMzQgNDUxIDQ1MSAyMzQgMjM0IDQ1MQo0NTEgMjM0IDIzNCA0NTEgNDUxIDIzNCAyMzQgNTQxIDU0MSAyNzEKMjcxXQoxNTUxCjE1NTYKNTQxCjE1NTcKWzI3MSAyNzEgNTQxIDU0MSA1NzcgNTU4IDUyMyA1MjMgMzQyIDQxNQozODcgMzg3IDM4N10KMTU3MAoxNTg1CjQ1MQoxNTg2Cls2NDQgNTU0IDY0NCA1NTQgMjcxIDI3MSA0NTEgNDUxIDY0NCA1NTQKMjcxIDI3MSA2NDQgNTU0IDgxMiA4MTIgODEyIDgxMiAyMDddCjE2MDUKMTYxMQowCjE2MTIKWzExMjMgMTA4NF0KMTYxNAoxNjE5CjAKMTYyMApbMjEyIDM3MCAwIDAgNjAwIDAgMCAwIDg5OSA4OTkKNjA4IDYwOCAxMDYyIDEwNjIgNzcxIDc3MSA1NDEgNDY4IDU0MSAzNjAKNDY4IDM2MCAzNDIgMjcxIDMyMF0KMTY0NQoxNjQ5CjI0NAoxNjUwCls3NTYgODc4IDI3MiAwIDQxNCA1NDUgNDg2IDU0MSA0ODYgNTQxCjQ4NiA1NDEgNDg2IDU0MSA0ODYgNTQxIDQ4NiA1NDEgNDg2IDU0MQo1NjEgNTYxIDQ4NiA1NDEgNjEwIDgzNiA3MTggNjEwIDcxOCA2MTAKNzIyIDcyMiA1NTYgNzIyIDgzNyA3MTggNjEwIDYwNiA2NjYgNjI2CjYxMCA3NzcgNjM2IDkzMCAyNzcgMjc3IDcyMiA1NTYgMjc3IDU1Ngo5OTEgNzIyIDYxMCA3NzcgODg2IDc0MyA3ODEgNjEwIDY2NiA2NjYKNTU2IDYwMCAzNTkgMzMzIDYxMCAzMzMgNjEwIDgwMSA3MjIgNzcwCjU1NiA2MTAgNTAwIDYxMCA2MTAgNTI2IDUyNiA1NTYgNTU2IDQ5Nwo1NzkgNjEwIDI3OSA0OTcgNTg0IDMzMyAxMzMzIDEyMjIgMTExMCAxMTY2Cjg4OCA1NTUgMTI3OCAxMDAwIDg4OCA1NTYgNzIyIDU1NiAwIDcyMgo1NTYgMTAwMCA4ODkgNzc3IDYxMCA3NzcgNjEwIDcyMiA1NTYgNzc3CjYxMCA3NzcgNjEwIDYxMCA1MjYgMjc3IDEzMzMgMTIyMiAxMTEwIDc3Nwo2MTAgMTAzMiA2NjUgNzIyIDYxMCA3MjIgNTU2IDcyMiA1NTYgNjY2CjU1NiA2NjYgNTU2IDI3NyAyNzcgMjc3IDI3NyA3NzcgNjEwIDc3Nwo2MTAgNzIyIDM4OSA3MjIgMzg5IDcyMiA2MTAgNzIyIDYxMCA2NjYKNTU2IDYxMCAzMzMgNTc3IDUyMCA3MjIgNjEwIDcwMiA2MzAgNjMwCjYxMCA1MDAgNzIyIDU1NiA2NjYgNTU2IDc3NyA2MTAgMCA3NzcKNjEwIDc3NyA2MTAgNzc3IDYxMCA2NjYgNTU2IDU1NiA2MTAgNjEwCjYxMCA1NTYgNTU2IDYxMCA2MTAgNTU2IDc4MSA0OTcgNDk3IDY5MAo1NjcgMzMzIDYxMCA2MTAgNTg1IDU1NiA2MDAgNjEwIDYxMCA2MTAKMjc3IDI3NyA0MDUgMzMyIDM1NSAyNzcgNjAzIDg4OSA4ODkgODg5CjYxMCA2MTAgNjE0IDYxMCA4MzMgODQ0IDc0OV0KMTg2NwoxODczCjM4OQoxODc0Cls1ODMgNTgzIDU1NiAzMzMgMzMzIDMzMyA1MzkgMzMzIDMzMyA2MTAKNjIxIDU4MiA1NTYgNzc3IDU1NiA1NzAgNTAwIDY3OSA1MjYgNTI2CjU1NiA1NTYgNTU2IDU1NiA3NzcgNjE0IDU2NyA1ODUgNjA0IDQ1OAo1NTYgNDUyIDYxMCA1NTYgNTU2IDEwMzAgOTQxIDEyMTAgODEzIDUzNAo4MjQgODY5IDc3NSA2OTIgNTMzIDU2MyAzNjcgMzY3IDE5NCAyNTEKMjUxIDI1MSAzNzUgNTIyIDM2MCAyMzcgNDc0IDI3NyAyNzcgMjc3CjMzMyAzMzMgMzc1IDM3NSA1ODMgNTgzIDU4MyA1ODNdCjE5NDIKMTk1OAozMzMKMTk1OQpbMzY1IDE0MSAzNzUgMzY2IDM3NV0KMTk2NAoxOTY4CjM4MgoxOTY5ClszMzMgMzMzIDMzMyAzMzMgNTAwXQoxOTc0CjE5ODIKNTQyCjE5ODMKMTk4MwozODIKMTk4NAoxOTg4CjU0MgoxOTg5CjE5ODkKMzgyCjE5OTAKMTk5NAo1NDIKMTk5NQoxOTk1CjM4MgoxOTk2CjIwMDAKNTQyCjIwMDEKMjAwMQozODIKMjAwMgoyMDA2CjU0MgoyMDA3CjIwMDcKMzgyCjIwMDgKMjAxNgo1NDIKMjAxNwoyMDE3CjM4MgoyMDE4CjIwMjIKNTQyCjIwMjMKMjAyMwozODIKMjAyNAoyMDI4CjU0MgoyMDI5CjIwMjkKMzgyCjIwMzAKMjAzNAo1NDIKMjAzNQoyMDM1CjM4MgoyMDM2CjIwNDAKNTQyCjIwNDEKMjA0MQozODIKMjA0MgoyMDUwCjU0MgoyMDUxCjIwNTEKMzgyCjIwNTIKMjA1Ngo1NDIKMjA1NwoyMDU3CjM4MgoyMDU4CjIwNjIKNTQyCjIwNjMKMjA2MwozODIKMjA2NAoyMDY4CjU0MgoyMDY5CjIwNjkKMzgyCjIwNzAKMjA3NAo1NDIKMjA3NQoyMDc1CjM4MgoyMDc2CjIwODQKNTQyCjIwODUKMjA4NQozODIKMjA4NgoyMDkwCjU0MgoyMDkxCjIwOTEKMzgyCjIwOTIKMjA5Ngo1NDIKMjA5NwoyMDk3CjM4MgoyMDk4CjIxMDIKNTQyCjIxMDMKMjEwMwozODIKMjEwNAoyMTA4CjU0MgoyMTA5ClszODIgNTQyIDU0MiA1NDIgNTQyXQoyMTE0CjIyMDQKMAoyMjA1ClszMzMgMzMzIDMzMyA2MTAgNTgyIDc3MCAxMDAwIDc3MCA3NDkgODQ0CjY3NiA3NzcgNjEwIDcyMiA1NTYgNjEwIDQ1MiA3NTEgNTI5IDgwNAo2MTAgOTkxIDg4OSA3MDIgNjEwIDcwMiA2MDQgNjY2IDY2NiA2NDIKNjAzIDczNCA1NzggNTA2IDQzOSA2NzYgNjE3IDU1NiAyNzcgNzc3CjQ3OCA0NzggNjY2IDcxOCA1NTYgNjE0IDEyNzkgNzc4IDg2OSA3MDIKOTc1IDc5NSA2NjYgNTU2IDkyNSA4MDAgODA5IDc1MyAxMDc3IDk4MAo2MjYgNDk3IDgwOSA3NTMgNzc3IDYxMCA4MTQgNjQ2IDgxNCA2NDYKMTEyMCA5NzQgODE0IDYzNyAxMjc5IDkwMCAwIDEyNzkgNzc4IDcyMgo1NTYgNTgzXQoyMjg3CjIyOTIKMAoyMjkzCls3MTggNjE0IDcxOCA2MTQgNjY2IDYxMCA3MDIgNTk4IDYyNiA0OTcKNjEwIDUwMCA3NjEgNjIzIDg3OSA3MTMgMTEyNSA5MjEgNzIyIDU3Nwo3MjIgNTU2IDYxMCA0ODkgODUyIDY4OCA3MDIgNTgwIDg1NiA2NzgKODU2IDY3OCAyNzcgOTAzIDcwOCA3MDEgNTk3IDcwMSA2MzUgNzIyCjYwNCA3MjIgNjA0IDcwMiA1ODAgODMzIDczOSAzMzMgNzIyIDU1Ngo3MjIgNTU2IDEwMDAgODg5IDY2NiA1NTYgNzI2IDU1NiA5MDMgNzA4CjYyNiA0OTcgNjI2IDUyNiA3MTggNjE0IDcxOCA2MTQgNzc3IDYxMAo3NzcgNjEwIDcxMSA1NTIgNjIyIDU1NiA2MjIgNTU2IDYyMiA1NTYKNzAyIDU4MCA5NzkgODU0IDcxOCA2MTAgMTAzMCA5MzQgOTU5IDg0NQo2NTcgNTM2IDEwMTIgOTU1IDEwMzIgOTI0IDc3NyA1ODUgNzY1IDcwMF0KMjM5MwoyNDMwCjAKMjQzMQpbNzIyIDU1NiA3MjIgNjEwIDcyMiA2MTAgNzIyIDYxMCA3MjIgNTU2CjcyMiA2MTAgNzIyIDYxMCA3MjIgNjEwIDcyMiA2MTAgNzIyIDYxMAo2NjYgNTU2IDY2NiA1NTYgNjY2IDU1NiA2NjYgNTU2IDY2NiA1NTYKNjEwIDMzMyA3NzcgNjEwIDcyMiA2MTAgNzIyIDYxMCA3MjIgNjEwCjcyMiA2MTAgNzIyIDYxMCAyNzcgMjc3IDI3NyAyNzcgNzIyIDU1Ngo3MjIgNTU2IDcyMiA1NTYgNjEwIDI3NyA2MTAgMjc3IDYxMCAyNzcKNjEwIDI3NyA4MzMgODg5IDgzMyA4ODkgODMzIDg4OSA3MjIgNjEwCjcyMiA2MTAgNzIyIDYxMCA3MjIgNjEwIDc3NyA2MTAgNzc3IDYxMAo3NzcgNjEwIDc3NyA2MTAgNjY2IDYxMCA2NjYgNjEwIDcyMiAzODkKNzIyIDM4OSA3MjIgMzg5IDcyMiAzODkgNjY2IDU1NiA2NjYgNTU2CjY2NiA1NTYgNjY2IDU1NiA2NjYgNTU2IDYxMCAzMzMgNjEwIDMzMwo2MTAgMzMzIDYxMCAzMzMgNzIyIDYxMCA3MjIgNjEwIDcyMiA2MTAKNzIyIDYxMCA3MjIgNjEwIDY2NiA1NTYgNjY2IDU1NiA5NDMgNzc3Cjk0MyA3NzcgNjY2IDU1NiA2NjYgNTU2IDY2NiA1NTYgNjEwIDUwMAo2MTAgNTAwIDYxMCA1MDAgNjEwIDMzMyA3NzcgNTU2IDU1NiAyNzddCjI1ODEKMjU4OAo2MTQKMjU4OQoyNTkwCjcyMgoyNTkxCjI1OTYKODY4CjI1OTcKMjYwMgo0NzQKMjYwMwpbNzY0IDc2NCA5NTkgOTU5IDk1OSA5NTldCjI2MDkKMjYxNgo2MTAKMjYxNwoyNjE4CjgxOQoyNjE5CjI2MjQKMTAxNQoyNjI1CjI2MzIKMjc3CjI2MzMKMjYzNAozNzUKMjYzNQoyNjQwCjU3MAoyNjQxCjI2NDYKNjEwCjI2NDcKWzgyNiA4MjYgMTA0MSAxMDQxIDk3MyA5NzNdCjI2NTMKMjY2MAo1ODIKMjY2MQpbODEzIDk5OSAxMDQ3IDk1OV0KMjY2NQoyNjcyCjg0NAoyNjczCls4NTAgODUwIDEwNjUgMTA2NSA5OTcgOTk3IDk5NyA5OTcgNjE0IDYxNAo0NzQgNDc0IDYxMCA2MTAgMjc3IDI3NyA2MTAgNjEwIDU4MiA1ODIKODQ0IDg0NF0KMjY5NQoyNzAyCjYxNAoyNzAzCjI3MDQKNzIyCjI3MDUKMjcxMAo4NjgKMjcxMQoyNzE4CjYxMAoyNzE5CjI3MjAKODE5CjI3MjEKMjcyNgoxMDE1CjI3MjcKMjczNAo4NDQKMjczNQpbODUwIDg1MCAxMDY1IDEwNjUgOTk3IDk5NyA5OTcgOTk3XQoyNzQzCjI3NDkKNjE0CjI3NTAKMjc1NAo3MjIKMjc1NQoyNzU5CjMzMwoyNzYwCjI3NjQKNjEwCjI3NjUKWzg2MiA4NjIgOTE3IDkxNyA3MjIgMzMzIDMzMyAzMzNdCjI3NzMKMjc4MAoyNzcKMjc4MQpbNDczIDQ3MyAzMzMgMzMzIDMzMyA1ODIgNTgyIDU4MiA1ODIgNjE4CjYxOCA1ODIgNTgyIDY2NiA2NjYgODYyIDkxMSA3NjQgNDY0IDQ2NAozMzNdCjI4MDIKMjgwNgo4NDQKMjgwNwpbOTI0IDgyNiA5NDggODUwIDgwMSAzMzMgMzMzIDU1NiA3MjIgNzIyCjg4OSA3MjIgMTIyNSA5NDMgNzIyIDYxMCAxMDg1IDUwMCA1OTQgMAowIDAgMCAyNzcgMjc3IDU1NiA2NjYgODM3IDQ5OSA4MzMKNTA1IDcyOSA3MjldCjI4NDAKMjg1MwozMzMKMjg1NApbMzk3IDM5NyAzMzNdCjI4NTcKMjg2NwowCjI4NjgKWzY2NiA2MTAgNTg4IDc3NSA4ODkgNjE0IDU1NiA1NzQgNTc0IDUwMAo0OTcgMjc3IDUwNyA1NTcgNDUyIDczOSA2MTQgNjEwIDU1NiA2MTcKNjE3IDYxNyA5NDMgNTcxIDYxMCA2MTAgNjEzIDU4MyA1ODMgNDg5CjU4MiA2MTAgNzY3IDYwOSA1NTYgNzc3IDUwMCA0ODMgNDkzIDYxNQo0MTYgNTU2IDYwNCA2MTMgNzUzIDYzNSA0ODUgNjk1IDQ1NCA0NTQKNDU0IDQxNiA0MTYgNTAxIDQzNSAxODAgMzU4IDQ2MCAzODkgNTE2CjQzMyA0MzMgNTE4IDQzNCA0MTkgNDU4IDQzMyA0MzUgNjM0IDM3NwozNzcgMzkxIDU4OCAzOTEgMzkxIDM3NSAzNzUgMzUxIDM1MSAzOTAKMTQxIDM0OCA1NjQgMzY4IDQxMCAzNzkgNDEwIDQxMCAzOTAgMjE2CjM2OCA0MDcgNTY0IDM2MyA0MTIgMzg4IDM2MyA0MDcgNDgxIDM3OAoxNDEgMjUxIDM2OCAzNjMgMzg4IDM2MyA0MDcgNDgxIDM3OCA5MzYKMTMyNCAzMzEgMTMwOCA2NTYgMjM4IDU0MV0KMjk4NAoyOTkyCjAKMjk5MwpbMzQyIDM0MiA0MzIgNDMyIDQ2OCA0NTEgNDY4IDQ1MSA3MjIgNjk2Cjc2MCA2MzcgNjQyIDc1NyA2NjcgODE5IDU4MyAwIDAgMAo1NTYgNTAwIDQ3OSAyMzQgMjM0IDIzNCAyMzQgODUxIDExODkgNTAwCjEwMDAgNTAwIDEwMDAgMzMzIDI1MCAxNjYgNTU2IDI3NyAyMDAgODMKMCA3MzYgNzIyIDgzMyA3MzkgOTIxIDk1MyA5NTMgNzIyIDcyMgo1NTYgNjEwIDYxMCA1NTYgNTAwIDY0NV0KMzA0OQozMDUzCjAKMzA1NApbNjE4IDcyMiA3MjIgNzIyIDU2NiA0MTYgMCAwIDAgMzg1CjAgMzI0IDQwNF0KMzA2NwozMDczCjAKMzA3NApbNjQ5IDY0OSAyNzEgMjcxIDY0OSA2NDkgMjcxIDI3MSA2NDkgNjQ5CjI3MSAyNzEgNjQ5IDY0OSAyNzEgMjcxIDY0OSA2NDkgMjcxIDI3MQo2NDkgNjQ5IDI3MSAyNzEgNjQ5IDY0OSAyNzEgMjcxIDU3NyA1NTgKNTIzIDUyMyA1NzcgNTU4IDUyMyA1MjMgMzQyIDM0MiAzNDIgMzQyCjQzMiA0MzIgODk5IDg5OSA2MDggNjA4IDU0MSA0NjggNTQxIDM2MAo1NDEgNDY4IDU0MSAzNjAgNTQxIDQ2OCA1NDEgMzYwIDc1NyA3NTcKMzA0IDMyNCA3NTcgNzU3IDMwNCAzMjQgNzU2IDg3OCAzNjAgNTQxCjc1NiA4NzggMzYwIDU0MSA3NTYgODc4IDM2MCA1NDEgMzYwIDM2MAo0MTUgNDE1IDM2MCAzNjAgNDE1IDQxNSA1NDEgNTQxIDI3MSAyNzEKNTQxIDU0MSAyNzEgMjcxIDU0MSA1NDEgMjcxIDI3MSA0NTEgNDUxCjIzNCAyMzQgNDMyIDQzMiA0MzIgNDMyIDg5OSA4OTkgNjA4IDYwOAo2MTAgNjEwIDMzMyA4ODkgNjEwIDYxMCAzODkgMzg5IDU1NiAzMzMKNTAwIDYxMCAzNjcgNjA3IDg3MiAyNzcgMjc3IDYxMCA1ODIgNjIxCjYxMCA2MTAgMzMzIDc2OCA1NTYgMjc3IDg4OSA2MTAgNjEwIDM4OQo1NTYgNDY1IDU1NiA1NTYgNTAwIDU1NiA2MTAgNjEwIDU1NiA0OTcKNDk3IDY1NSAyNzcgNTU2IDMzMyA2MTAgNTI2IDM5MSAzNzkgMzc5CjQxMCAzNTEgMjQyIDI0MiAzOTAgMzY3IDE4MSAxNDEgMTQxIDE4MQozMDcgMTk0IDE2NCAyODUgNTY0IDU2NCA0MjEgNDIxIDM3MiA0MTAKNTAxIDM3NSAyNzcgMjE2IDQwNiA0MjAgMzY0IDM2NCAzNjMgMzYxCjM2MSA0NjcgMzc5IDM2MyAwIDAgMCAwIDMzMyAzNzcKMzc1IDQxMCAzNjYgMzc1IDc3NyA3MjIgNjY2IDcyMiAzMzNdCjMyODMKMzI5MAo2MTQKMzI5MQozMjk4CjI3NwozMjk5CjMzMDYKNTgyCjMzMDcKWzI3NyAyNzcgMjc3IDI3NyA1ODIgNTgyIDU4MiA1ODIgNDg2IDU0MQo0ODMgNzIyIDcyMiA2NjYgNjY2IDU1NiA1NTYgMjc3IDc3NCA2MTAKNzIyIDM4OSA2NjYgNTU2IDU1NiA1NTYgNTU2IDI3NyA1NjYgNDE2CjY2NiA1NTYgNjY2IDU1NiA2MjYgNDk3IDcwMSA2MzVdCjMzNDUKMzM1MwowCjMzNTQKWzEwMDAgNTAwIDU1NiA2MTAgMjc3IDYxMCA2NjYgNzIyIDU1NiAzMzMKNzIyIDYxMCA3MjIgNTU2IDYxMCA1MDAgNTU2IDU0MSA0MzUgNzE1XQozMzc0CjMzNzkKMAozMzgwClsyNzcgNzIzIDcyMiA3MjNdCjMzODQKMzM5NAowCjMzOTUKWzc3NyA2MTAgOTQzIDc3NyA3MTUgMCA3NjMgNjA1IDEwNDQgODU4CjMzMyAzODggMjM3IDIzNyA1MDAgNTAwIDMzMyAzMzMgMzMzIDMzM10KMzQxNQozNDIyCjAKMzQyMwpbNjEwIDU1NiA1NzkgNDM0IDU2NiA1NDAgNTY1IDU0NiA1NjcgNTI0CjU1NiA1NjkgNTU0IDQzNyA1NjIgNTYyIDU3NSA1NjIgNTY2IDUyOAo1NTYgNTY3IDcwNCA3MjggNzMwIDExNDUgNzMwIDM4NSA2OTkgNzc3CjYxMCAyNjQgNTU0IDMwOCA2MTAgMjg5IDYxMCA1NTYgNTU2IDM4NQozMDggMjc3IDYwMSA2MTYgNTk3IDYxNyA1NjUgNTIwIDY1NCA2MzMKMjg5IDQ3NiA2MTkgNTIxIDc2OSA2MzAgNjYxIDU2OCA2NjUgNjIwCjU2MCA1MTIgNjE0IDU3MSA3ODkgNTc5IDU4MSA1MjAgODQ5IDg0MAo1MjEgNjYwIDU2OCA2MTcgNjMyXQozNDk4CjM1MDMKNjAxCjM1MDQKWzU5NyA1NjUgNTY1IDU2NSA1NjUgMjg5IDI4OSAyODkgMjg5IDYzMF0KMzUxNAozNTE4CjY2MQozNTE5Cls2MTQgNjE0IDYxNCA2MTQgNTgxIDYwMSA2MDEgNjAxIDU5NyA1OTcKNjU0IDYxNyA2MTddCjM1MzIKMzUzNgo1NjUKMzUzNwpbNjU0IDY1NCA1OTcgNjMzIDYzM10KMzU0MgozNTQ2CjI4OQozNTQ3Cls3MzAgNDc2IDYxOSA1MjEgNTIxIDUyMSA1MjEgNjMwIDYzMCA2MzAKNjI1IDY2MSA2NjEgNjYxIDYyMCA2MjAgNjIwIDU2MCA1NjAgNTYwCjU2MCA1MTIgNTEyIDUxMiA1MTJdCjM1NzIKMzU3Nwo2MTQKMzU3OApbNzg5IDc4OSA3ODkgNzg5IDU4MSA1ODEgNTgxIDUyMCA1MjAgNTIwCjYwMSA4NDkgNjYwIDYwMSA2MTYgNTExIDYwMSA1NjUgNTIwIDYzMwo2NjAgMjg5IDYxOSA1NTkgNzY5IDYzMCA1MjggNjYxIDYyNSA1NjgKNTE0IDUxMiA1ODEgNjg4IDU3OSA2NzkgNjY5IDYwMSA1NjUgNjMzCjI4OSA2NjEgNTgxIDY2OSAyODkgNTgxIDU2NSA3MjkgNTExIDU5OAo1NjAgMjg5IDI4OSA0NzYgODk2IDkxMSA2OTIgNTYwIDU0MSA2MjMKNjAxIDYxNSA2MTYgNTExIDYwOSA1NjUgODI0IDU0MSA2MzAgNjMwCjU2MCA1ODggNzY5IDYzMyA2NjEgNjI1IDU2OCA1OTcgNTEyIDU0MQo3MDIgNTc5IDYyOCA1OTMgODQ0IDg1NCA3MTggODM2IDU5MSA1OTkKODU5IDYyMCA0MjNdCjM2NzEKMzY4MwozMzMKMzY4NAozNjk0CjcwNAozNjk1CjM3MDUKNzI4CjM3MDYKMzcxOAo3MzAKMzcxOQozNzI3CjM4NQozNzI4Cls1MzcgMzg1IDM4NSAzODUgMzA4IDMwOCAzNzggMzkzIDMwOF0KMzczNwozNzQ0CjM4NQozNzQ1CjM3NDUKNjk5CjM3NDYKMzc1NAo2MTAKMzc1NQpbMjY0IDU1NCAzMDggMzA4IDM3OCAzOTMgMzA4IDI4OSAyODkgNDM0CjI4OSA2MTAgNjEwIDYxMCA2MTAgNjA0IDU2MCA1OTcgNjU0IDMzMwozMzMgMzMzIDMzMyA3MDMgNjE1IDYxNSA4MjUgNjA0IDczNV0KMzc4NAozNzk4CjI3NAozNzk5ClsxNjc0IDE3NzQgMCAxOTIyIDAgMCAwIDAgNTc3IDU1OAo1MjMgNTIzIDU3NyA1NTggNTIzIDUyMyA4OTkgODk5IDYwOCA2MDgKNDMyIDQzMiA1NzcgNTU4IDUyMyA1MjMgMjE2IDIzNCAyMTYgMjM0CjY0NCA1NTQgMjcxIDI3MSA2NDQgNTU0IDI3MSAyNzEgNjQ0IDU1NAoyNzEgMjcxIDQ1MSA0NTEgNDUxIDQ1MSA4MTIgODEyIDgxMiA4MTIKNTc3IDU1OCA1MjMgNTIzIDg5OSA4OTkgNjA4IDYwOCA4OTkgODk5CjYwOCA2MDggNTQxIDU0MSAzNjAgMzYwIDUzNyA1ODAgNTMwIDU3OQo5NjUgNzQxIDg5MiA2MzYgMTQ4M10KMzg3NAozODc4CjAKMzg3OQpbNjQ0IDU1NCAyNzEgMjcxIDc1NiA4NzggMzYwIDU0MSA3NTYgODc4CjM2MCA1NDEgNjQ0IDU1NCAyNzEgMjcxIDY0NCA1NTQgMjcxIDI3MQo2NDQgNTU0IDI3MSAyNzEgMCA1NDEgNDYyIDYxMCA1ODQgNzE4CjYzNCA3MjIgNjEwIDEyOTkgNTU3IDY2NiAxMDE4IDg2MyA4MDggODAyCjk5NiA4NjMgNzIyIDU1NyAxMTA3IDk0NyAxMTI3IDkxNSA3MTggNjA0CjcwMiA2MTAgMzMzIDMzMyA2MDYgODQwIDUxMiA2MzQgNjA2IDcwNAo2NTIgODMzIDcyMiA3NjMgNzAwIDM4OSA2MTAgNTAwIDE5NCAzNjMKNjY2IDYxMCAyNzcgOTQ2IDE0MDQgMTEwMiAxNDA5IDE5MjIgMTk4IDE5OAoxOTggMjM0IDIwNyAyMDcgMTk4IDIwNyAyODkgMjA3IDIwNyAxOTgKMjA3IDE5OCAyMDcgMTk4IDIwNyAxOTggMjA3IDE5OF0KMzk3NwozOTgxCjI0NAozOTgyClsyNzIgMjQ0IDE5OSAzNDMgMzQzIDU5NSAzNzEgMzcxIDU0OCA1NDhdCjM5OTIKMzk5OQo2NzIKNDAwMApbNTUyIDU1MiA1MjggNTUyIDU1MiA1MjggNjQ5IDY0OSAyNzEgMjcxCjU3NyA1NThdCjQwMTIKNDAxNwo1MjMKNDAxOApbNzU3IDc1NyAzMDQgMzI0IDYxMiA2MTIgMzA0IDMyNCA0NTEgNDUxCjIzNCAyMzQgMzYwIDM2MCA0MTUgNDE1IDY0NCA1NzcgMjcxIDI3MQo2NDQgNTc3IDI3MSAyNzEgNDAyIDQwMiA0NTEgNDUxIDQyNyA0MjddCjQwNDgKNDA3NAowCjQwNzUKWzQ4NiA1NDEgMCA0NTYgNTQ5IDYxNCA2NzMgMCAwIDMxOAozMThdCjQwODYKNDA5NAo1NTkKNDA5NQpbNjEyIDMxOCAzOTQgMjczIDE4NCAwIDg1MSA3MzcgNzE3IDc0Mwo3MzcgNzE3IDcyOSA2ODQgNzE3IDkwOSA3NDMgNjkzIDU4MiA5NDEKNzcxIDcwOCA2NDcgNzE4IDczNyA3MzcgNzY2IDc0NiA3MzYgNzA2CjcxNyA3MDAgODQ5IDc2OSA3NjYgNzE3IDczNyA2NzkgNjg4IDc0Ngo1MzEgODY0IDc2MiA3OTEgODI0IDI3NyAyNzcgMjI0IDI1MCAyOTkKMjczIDUxMyA5MDAgNjExIDY3NCA2NzAgNjE0IDYxOCA1ODkgNjMyCjc3NyA2NzQgNjExIDI3OCA5MDAgNjA2IDYxNCA2MTEgNTY5IDYxNAo2MDggNjExIDI3OCA2MTQgNTE4IDYxMSAzODYgOTAwIDU3MSA2MDEKNjExIDYxMSA4OTcgNjExIDYyMCA0NDUgODk3IDYxMyA2MjIgODI5Cjc4MCAzMzMgMzkyIDEwMDEgMTAwMSA3NDYgMTIyNiAxMjI2IDEyMjYgMTIyNgoxNTEyIDU1NiAxMDAwIDAgMCA2NDkgNjQ5IDI3MSAyNzEgMTY2CjM0MiAzNDIgMTA2MiAxMDYyIDc3MSA3NzEgNzU2IDg3OCAzNjAgNTQxCjMzNCAyMzggNDMyIDQzMiAwIDU1NiA3MjIgNjA0IDE0NTEgMTIwMAo3NjYgNjI3IDcwMSA2MzUgOTI1IDkwMiA2NDEgOTE2IDkxMiA2NTAKODU5IDgyMyA1NDEgNDY4IDU0MSAzNjAgNTQxIDU0MSAzNjAgMzYwCjAgMzAyIDIzMSAyOTkgMjM4IDcyMiA2MTAgODUzIDcyMSA1NjIKNTYyIDUzNSA1MzUgNjMyIDYzMiA1MjAgNTYwIDEyMTAgODc0IDExOTEKOTI2IDExMDMgODk5IDk3NCA3OTQgOTc0IDc5NCA5NzQgNzk0IDcyMgo1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzU1IDQxOCA2MTAKMjc3IDg5OCA2NjkgODc5IDY5MiAxMzIyIDEwMDcgNjY2IDYxMCA4NTcKNzY4IDk1MCA4NTYgODA3IDYxMCA5ODYgNzcxIDYxMCA0NjYgNjQ1CjY0NSA2NjYgNTU2IDk0MyA3NzcgNTg0IDU0NSA2NjYgNjEwIDY2Ngo2MTAgNTc5IDQ4MyA0NjQgNDY0IDU1NiA1NTYgNTczIDU3MyAzMzQKNzg0IDQ0NyAxMDYyIDc4NCAzODkgNzc5IDc1MSA1MTQgNzc3IDYxMAo1MDAgMzg5IDU4OSA2MTEgNjExIDYxMCAyNzcgODE1IDY1MCA1MDAKMzg5IDY3MyA1NTUgNzIyIDU0MiA3NTkgNjIzIDcyMiA1NTYgNTU2CjYxMCA5MTIgODExIDY2MiAzMzMgNzA2IDU5MCA3MzQgNTg5IDcwNgo1OTAgNzc3IDYxMCA3MjIgNTU2IDcyMiA2MTAgNzIyIDM4OSA2NjYKNTU2IDgzNyA2MDQgNzYzIDc3MiA3MjIgNjEwIDUyMyA3NzggNzIyCjYxMCAxMDEyIDg0NCA3MzUgNDUwIDY0MSA4ODkgNjEwIDY2NiA4MzMKMjc3IDExNzUgNjE0IDg3NyA1MDEgNTU2IDY3OCAzMzMgNjEwIDQ4NgozOTYgMzcyIDkyMSA2MjEgNjEwIDU3NSA1NzUgNjEwIDk0MyA5NDMKOTQzIDEwMDcgMTAwNyA1ODYgNjI4IDM3MSA1NTggNTEwIDY3OSA1MjQKNzg0IDMzMyA2MTAgNjEwIDg4OSA4ODkgNjQ1IDU3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UWc2SUZVZHBzeTUxckRsenlCZTkzdGJLRGtwRkh2TmV3cWRsdTNQMmw2ZTZrL1NqS2c5VDJtVGtNTXd6cVZnc2NoNWRZRjZVT2N6OFwNCkFScjMzOU5OR0FZTDlzV21XeDZqaWUyUGtsYk9BNGdGekhoa2lwYWVENS9KbDJDUkZJQTJMK21nM0ZhN0dKZFRva2Iyc0FuOUR4eXc5U3ZTdS9WYXIrZklHQVhTTG5uVmgvOHU2XA0KMXVGSzNxbTh5Q01xSHJsdWdZNXZZZTdrSzdmZkZWTitUSm9sWlNvZnJmNWNid2hBNWFiL2FIMlJqd0ZNczFpeHUyMDllalFuR014RWlWL2t1UlJOR0pWS3BPdmZKYklRVElvWFRcDQpPVlo0ZUZnR1lDd0gvMWUvZFFRNEVCMHQ4eGRHdlI0alBBUExLZG85NDl4aWtmRXlIVE54c1M1SVJtUGtvNzJvVDMyREw4bTBydk5kSDJHbHZBQm1RNEUwWVUwbVRoeWJDTjNIN1wNCjRyYm5wT1orelBTQk5XMi9pTzlrN2FVdmY1RjNpaVg5YU1pMnh5WFhDV0tyUkRkTlN3R0lna3NsU3ZxOUpaUzVRbjFXYU9JV1lKdlpoakd4ZlRTNlBGRDMxU2oyd2RNTGxtdDVxXA0KeHQvUElRTXRWWERXUzRKRjRDcUlZYy93N1RyUE83RVY5TjdobElMSm9vck1ZRU43d3I1NkNFS2o1dTVkZ1QwZDdZVnNrTzl3dS9PWGw1VGNFcU05QjBCRW16aW1CdUJ2RjM5eXRcDQo5RXl5N0hNODJGeU1aYUUzS1NLYngwQnNDWUZMVHREQU0rckN5dVN2bzc3MldNWmF3SXdGMTJKd0tDR01qMU5xQWc3TUZDb2lsMTZvcU03bUNhZ0d0TGhaWEdndkVYbys0VVd4VVwNCkxiYWdnVGQyeHlYSE9peXRISzBaMzM4L040SUdleDVZa0pTaXN0UmNqRHB6OXl3blhxaHE5Q3NlV1g5Q1FDVWhmbFBGU2tMOFZIODBrNmk1bUM0bEdiektBQllWT2c0Ty9jVVYrXA0KQmpoYUFxcmVCV0RoVXllYkhtc3NCczRuYkxiaHRXQjZBVTY5VEpGY1VpamNyQnVEZ2gyRjVURy9uOW91ekxLT2VYYzhHWVBjWDF3WWlwNkFGd3VPRlJTb0FUVzI1R29EUjY1ZXJcDQo0V3F4OGlVdEE0S05WMnpVZW1sOExNQlVFbUlKSHQ4cDJYVHdIczIyUE40WkF5a2lPM1E4MU9ONkNTcHdCZUFrWVdVK0swUGpFSXZLYVhJTGJTNGREVnkvclNzd3RpbFZNby9uZVwNCnhIODlCdDJ0WFBJNGR6WFFiRVQ5aWFBNnAzYzdSRExaSmhpVEg4dm1Sby9qeFZmTTc4Y2QzaVp5VDgveDlmb25WYzNaMC9TUDZrY2E0a1FIeG5OK0QxVVByMWdxcGFlc2h5eGhlXA0KeWJjVjZXcUNOVFlWanNsaEpLZVF2WnFwUVgxbUVRZGUrdDJoK0s0aURPR3JydTNMQW9ZZ05iOUZ3YU41a0ZidUQyR3hlcVJkVVFqRzYxZlNrQ1R3V2NSd1o2cVFKYmh2clhqWnBcDQo5TnJXUEw4WjY5eDF3RnBiY3ovL082WGxELzBobWVXbGxWTkpBUGRxSUVuMlpsd3pvakdGd1gxZHBVbTNXSGtodnpWTkEwaXpneUJvQ0pySG5keU03cExVS1Z1TlhmWDZpNmFTYVwNCnZjMWJORHFtQ21NZVZYclhibks2M0RmTHE2MS9MeFp2NjZQZ3BZa2JZY1VpbEY0NDZLUjMzcmc2QlgzbHlMM3FyOU1kdDQ4TlUzb1IzazBsdFdNb3ZZaVBwR3pJRmpTejBOMGE0XA0KakdJVmY3dTBEU3EyRGthUjVxYjdwbW9LTGFidVhiL3hnWUNLWC9lWmp6N0xubDh3QzUrUkRCODlXVFdSb1AzRmVPa2pCK01JOEpIc1RsM1oyUGFycDUrTmduYnRlVDhKNGpoMXdcDQpmRTNBMmxlRjBVNEhoQld3ZkZxOVVpMVpOZkdrbHFwNDZKMDhrOTBTWGFxdVhSRE1GdTBIdlNiTmd3Kzc5R1lTZUY2QVFLTlRIeTNFQlFrQWNqaDJPZytSMTBXV2NQdTRpR3FGelwNCmlDZGJxaGw4eCtmcUFFaFhkZ3BZd0FuOVJCR1VsOUVUMHBWZk9FRXU0ZVBONW9MUXlYcWdNbzBJR3BzbVJNMCtJam8yTldhSlpHZm15Nk45M0gxOEhRV0R3YUE1Mkp1OW9BZ3J2XA0KRHVvcUZCbEp6a1c0M0lCZ1BPVUZXdThDQWRCaWt3ZUFzUzdrdFkrbnNRS3U3SkM4Nkw4Z0RUQ1dIMnJpbDNCeHlTNHVhS2kxS3laRmFDTVVnaVVHQVRvY0piRkorK0ZtbTVkYUdcDQplL0ZDQWwrSjdkZkN4SmI0MWxpTkFmdjluN3ZudFNCUDltQmRPZEpCcms2cEU1bzlKUVFZQlYyUmswcnFrckhMSkh5aGRDYml5Ui9rNFpUa09SNFB6N0VDZHJzNG4yeDZtOVpsTFwNClRFSS9RQU85Wlp4dDFJQjA4d1JhRjBUTFdJT1pRbSt3RkhOcFIySHlyRFlycVRTU1pwMHM3bk1BS0xFVk5RdVAzSWpyOVRuYnhibmtWdXNrQllKKzZ3WExFanBoMlkySGpybmNIXA0Kam5pclZnVnh6OThaTFY1Uyt6QnZHb3A4NzJOamY3a2xIMzkybVA0ajlCaTRPbkg5Y0JsSjRWd0svb2NaOGVkOHV0VG1QTW1wNEJGc3F5cnYreWc1ajNnV3EraFVVSXoyNkFobFRcDQpjMFc2cHlOS3RRamVWQjBXbFRDVWE2MzVPVlBsTC9vVFRCRmdWMjA3NytPSFhabC9TTXN3SStWWFduK1VmUXR3d0dRNVIwN3BsOXJjd040dksrWTVlNGxBNVQ5VUlhN1R3aHF6SFwNCmlwbGRTQWZqZDNzMk81NDlQcCtMK0pMcU00c2V2ejVlaHJvT0s5MGN6ZTgwL1BJMWFQOXB5MmdIN1hQOU0yemFqK0hUbll3b2pFUlYyc3kvSWcwYlBKMlR6WVFHSUw2a2I5RmRmXA0KSUtCYkpQZWFwbWxTbnh1cHpDSUg4YTRlbzY4WS9EWDhIRkRYYUs4KzNySXlncnFCTUhRbW1obWU2U0hubXhWYWk0SHdMRWlyYk41L3pYbG9CNDNGYVBWaFVaS2tFakhlZHFFNEZcDQo0VWw1UmhCdUJMUENrcmpmcWFjTUtEb0t2cUQ1WElVU085am5vSmJVenYvakpMaWZWU3phUmpoa2lXL1lkNEt4d3NBSER1ZTUzVzFiT0liYXZ2MlVQNmI3US9ISll2MFBEajZiK1wNCktsbGYwVnUvUWwyeVYzTFEvY0ZDTk8zVGJLNlFBK01OQlRjMUFIVUhkbnZvOVJXcWZzcUdhb01Kb3RrWDk1aEU4RUNudldlQUd0UWJkbGZ3aEY2M0pTRkhWc1dmaEpuckNRRXJ2XA0KVU00VEtobkVPTDNvaFVsbzZnbkdpak50SFYwcldoQmV5YlU1MW9ORHZMZmFJenZrYjJUK2k2cThtdXI4cjU0WHFjZWRMOHUxRXNUKzlyOWhZeHdkMXZXbm82RTU2UHNSS0dDbFJcDQpSUDB6WW9sNXV0cHRJcnlNZkJnTWhCc3ExL2hoVTI4Z1pLSU5HdWk4NmY0OGdYTHRoTzVwMXhmcXR6N3g1SWVMR0RpdTRHVXRZTnhXdmRscXErUkxmSkIzVnQzOEtGZFBuZXdjZFwNCjZEMXAzNngwVlllVjZuL2xZbzlRVGx5SzdDWFZkeUtMSFo5Q1daVVBBZ2FYanhYNEV3UllMa1pBSmc4RGR3dzlqd2o2MnFMRzZzbk5iKzlFMGd1NnlHTS9mTjhPNWl6dk5wMUJIXA0KRUFsRGYzZ0E2V044ZXpVSFRYcU81WHhmKzNkd1JBanpvR3dBM2FHcjVXckx4V2piM29iOWs0bW13b2k1SW1Oa0NlQkhLcXdTK2Zta2NkSXJvL3RtUC9pc29uRElKb1FxRTV6ZG9cDQpUaGY0alhvZE1xeEdoTWFXU0M0cUNHbUVMM2dBSGxTNnlvN0F5eHFRQ05kUWNlbC9Rd2puYURxUitRejRBS3pNRUFLV3pYWStFRkw0Y1U2YTRiVG9xamhOL05vbGhmZjNKR2VrM1wNCnNKNDd2YWlmUjFnQkZLMDFCSjhpN1haVC9JbkRFaUZrQ0R1aGNERW5uV01VTGgyRk9OQVBQa3Vjc2s1TFVWOVZRMmVLV2hQZ285c1ZGWDVtQ0YrVG5YbElnU2tnZFBmRlNOdmZsXA0Kb2ZzNjJPeWFWRFpSc3BrdEsvZ2svSktyRkdkd1ZlYTdTcnZ0RXUvYmMvbGNlNTNuYXFkWjRwSkROUUFCMUo4Ujh3SzRlMlIrd2t3MnVOaGNSVlZvd3NNc1UxZ1ROcC9IV0o3aEpcDQpFOTRqZWpQV1l1Zm50ejVWN0pCRzl5dk9HYXhHZUVlTGhkMFdLRlNseHc0R2xxdWFrTWNTWUl2TWNoYzBnLytWQ0htU1V3NC9MaUpUYjNGd05rSFlZT3NZMVFMV1dQWEhPanY1alwNCkVPb1ZqM2paVGkxQVhZK2k0eW5haWxZYklZNG5tYkpmYTlhZE9RSG5oUE9vU2N4M1ZzUmt2MWVSMzhkamdBWVlvcytadWQ3cEFSU0Z3UEJCNUprcVNYVDhiRVc0TUFqU2dybDVpXA0KckRhWVNpUXQ2RlV6bUtpc1FqL3NmeWZBK3pJYkhZVUFjZXQ4MjRvWXVTbXRiWUdybytUQXFIYWlXY1lQczNreXowOHFzWWcvZnpWMmx6UzJEWUo2a1daZTNpZGY1eWRVc29PTU5cDQp5SnpKVk1PL1RUNzZDb3QxdGdQbElmU3hHL0Z2WnpCSGYybzdmSjVKR0ltbmJnVVhGOSs0Vlo1OHJwRWxmQUJGRkRKcEh3YjY0Y055SVZLeGJ0bXQ5WGVCTnRHQmRpZllEWkFLcVwNClZBc1Y2bVZDcTBiNkhkdUdMa1llTlB3N0xudTBpTzBFYXp4dytmWUZOR2puTEFLL2lzUmd1UnE2Y3YrTWd2a2l1RFJxMGpqQzdsRFFLeFRyKzAvcVhIZCtYT1JCb2JaWEl1VGxYXA0Kc0FvK2dzMXZVcW9FTFZvOHJHSHk3ektNMW5kMDRuNEFGaGI4bDBYWEdNbGdqYVhNT2FVcytySDZWN3JpS3V1dnIwLyt3TTViYVJXbi9XaEk0Q0dMUU9kcTM5VGlwSkxQTW5IOUdcDQorUjBzdWJ2ajljWXdUUXVPMUNyMmxyZlN3eWkvK1hXRi9TNzFoU0ZaWVVUUnRRWTRKMlhnMnJZVHR3ZHlFV0NNaVhJRUNzWWNHVXE4aWlLRTdHV2RJRkNjT2xPTVNSVU1OMHRRdlwNClorc0dBUHVqczRlQ2FVYmFLeVU3ZHNQTTV0TUdVVlkyaWIxQy9LbjdBRVIxcS94UWpVNEYvOVF5TGZ4MDNyejZKWGthT2o0SzhMRlRrWXJMNXFBOHdwQTZaeWpqM2xyTkVZZnQzXA0KY3kyaW1ORTZqZElTL00xcS9lS0RDeWtMYTJzSDlra3hyRFlaaThReURCYlQrOXh4NnFSbXNqcTk3VE1ua21McjczRE1iME13amRYZ2VYN25jWnMwWTZWcDUyZ0hDN0JoZlRVbldcDQpTRFVtQVl4V2xSOG9FM00zZkhGTEl2bFdRRThHZEZNRGFrVnMzLzFGOHRJVExlWFVseHptTXRsWkpqUGVmNXlRYWh2MWJJZE81My84Z2ovUFQrVjNJTUgwZTA3Q2dFRHJIODdLVlwNClVHelhOQkF0YTdTNGJHK2NHS25hUnlTa2UxeTdUZWFydi9SMHM3aDdnZTlRbWVIYzE0YlM4Mld5bERVZVp6dGw3c2owdHcvQkdLMThKMTZRMGpsL1pjUGZ6U3dlUVdsYWlhbjdjXA0KYStZdHdJWDFtYjJBeVJsU2hnNDZwK2tmcktyWS80TyswYzJaSVc5ZXQ0MlMzZU0rNHVyTGRmVzF3dDNRTjdOanJHRm9TeCtnUmhGaGR3SFBTbElXTVRSZGdiQW9GT2lxZkcwUFZcDQo3K1pZb1RTUTFDTTYvS3ppZU52Q1dUMEtKNWNFbi9adWJ1UUI4Sm5uYm0rQVlzWGVJMVJPaUM0MjlMUGoxTXJOSVNoTmRZd09aUkYrOWdtTmt3amdjSyt2bUdaZU4weXMrZ3c0SFwNCmlYb2tVOE9zY1J1bXhCeml4NTZKazNhZytwWnMwMTdOM0ZxOHdGMUY3UExYRzFUYktuODgvQzBCZFAyNXNFZ29FZ3pXZkc3TExlTVl2NXpLSHBTb3JsNW9FYzBHRTBsZW1GZ3NIXA0KT3B2NUgvaWJFS0pyN2JTNVB4ZTN0Uks4aW4rbXBSeW5kVlZCRld6bHpKZzY3RUt5SjdNbjh2dG9pTDc2L1pPRlE1SUpWeDN6aDh4TmdjZktJREdPYW5HUHZ3VDJjTGdOOURGRWFcDQpETkNVMkRsc2RCS29QeTJ6c0IzZFdNWXhlbXk2c0dQaUFlT2l1VHNvZk5Kb3U2M25qaG9GazA3RGhHOXpyczY0RDBad0hsQ2dQY2ZQdzQ5eHFXaVpWeGdVMi9vdmhMZlEzKzRUbVwNCnVJb2tWRnpUMGM2VkdKQmYzdE42OHhDa2w5Y3NGSXI5SllGa0ZRWHZXMEtPMUZnY05IbWFQWm13cXdZQnArVWJZQXdSWldRMkt4MmxOc2lpdlBnYWhWKysvcnh6N3hDa283MHV3XA0KaW5icU9aelp2d2YyZHk0RUF5NktDYkhlSUhIKzYvNlUxRlBrK3VPRDZzVFFQUlIvUm1NVS9CMXZVTWJuckYxb3UvUENISU44N1lmRGk0TlZzMG91TWxETlJzelZrdS91WUZubGRcDQpzQWZwNjlURHo5NHNnWHZZRVRQYmR1R0xxSWQ0L3JVNVl0RThocSt1SE5XSWZHMGc2Mjk5Wi8vaXJiSEhoajMxd2xNWUg5NHlxYzFST2t1UHpQdWs2dkYzaVpBeU9HUnpNQWpTZVwNClB3Ui9OVEd5emNtTExGRVlwTllJNm9ReVk4WVFKUW1LVDI1eXBtY1RGTUY3aWNYYnpISEFyQllUV2RKM1ZyZlRDbi90TnY4S1A2b3ZNRGNRQzYzSDJRSVhHNVFTY2ZUc2I1NUM4XA0KUmgxczZoYnBrZHk0SzYzbW0xRC9PRXQzZlQ1VG05N3RTQlZjNUtzQVVnOVA2RHpSUForWXBzOVl3OHpSUTZBQVg2eWVFZ3g4NG1UeEhUWGhFM1VJMHhiMUYxZWcxcGNkKzhidHRcDQppeU8yaWlwNFJIQVVrSmg4S083UTdsUDFRNitFaS8vd0ZOSnRsNmZERitnUEp4Z1J5ZGsxNmxzMVhNZWRkMFZURjkycDRSbW5TbGlKZUFRYm9TMkpMRHZYVmpDSzN3N0VLbWZsR1wNCjRFU1BxS294ZmhNSmtjbGtZaTNCaFdFQ1YrVHFEOFlDRGpucWhYNFdXMUE0RnVnNisvZ3pkZ092YWRENjBJNmtyMG9hWURLVEpTOUp4RjlVdnNnbFFMNDgvOXU5b0VOcXpkMElKXA0KdzdpcmU1WDVBYlU2a3V2VG45dUxldGdqWng3cVRncFFJSnBGSU1rTE15bGIrR0ptWlp2ZWgyakloZXVNMzM0MURpSlNjOWJvNVM3clhUdUk3Zk50YnpXN1Q5MysrUHBrbWpqRzJcDQpsOXRtdHV0ZkhuTXlPejF5US8wMDNDUkxSNFJUQ25hV1FIazFQZTFaV05JcXo1cy92NG5yNCtxeTlHRDlWaWExNzIzQW9wUWlQUFRDVnNNUmNHZlkzbFdNbWlGbVhySXNZajFrMlwNCllVbXZKUVFVOXU1SXQrYm5OczBUa0ZnQlg2K2g0ZVVrOWU4Ymo4U0JvK0tZMHJVd2I3SnU0VzBGWWFuaDRVWGtPZkdXRlZWT0JYWDZBMytNSU5UM1ZabjFOYUVVMHNyblFHYUIwXA0KM0oyZFlta1VXQnNabTF0L2w3VmpNcjBLM1RaRGY1VnFLS0IwQXE0WDVQMXBEZEpPQldUQWY4b2F3TEFrUDdWTkp1dlI0RkJuWUVMRzROUDl3aXJDYlA2Tm1qU3RuQ2xVNWF2MmVcDQoraGtJVHc1ZEZFc2tzc3RCVEdKVTN6bTVjSDRCdmh3cnNMVW9ydFQrZ1BwelF6cDU0YjlZNGJ2Qy9iSTY1M3lmVXJacXpQUFFSWG54V2tpektFRFVPR1dZMlliNUprMWFYbDk1dVwNCmtwZjB4UVRXNnBpNlRJU3ptVm5pNEprTmpneXZ0Ym9vdllWYVV2TXgxVDRIejdIaGZWK3lFaUhrR09MT0JyVkFVd3pXOU1IWVdIS1YvZ1htbnFHVTN2dXlacFRoS1lINnZjOTYzXA0KZjFIRFBTUGdMOXZ0STBiUWt6YkVvN3NRc08vdnQ2L0QvdEZwRGY2ZXZLUGEzVGtFZXc4bXdoaGo3QzlwRHJ1OHFzTER0MTl3N2k0bHZUSDhBWm5QejU1bFRvTEFQeWxNV2JLYU1cDQpYaC9TREgvWndsQ24rOEtOYWhpbEN4cVlsSWRGTWsrRWNYMlg5a1dhRjl0OFk5YzQwbkV6QTY5M3ltSGlsR1NvWVkxMHdSSWp2TGdIRDk0QlhMVnRtOUc5cTE1Y2toK1podGlQSFwNCjhjMG14QlNLallZcU5xbVFiTjlQRXhsS0dxSlJiemZheW1NTTc2MmJDWXN1Z21ONURVZ25zUVI1UWUvc2hqUnlIbFc1QUUvS1BnSlM4bVBINkQ4aW5GL1AwVkY0eEErKzdNeGtlXA0KeGhXU1FFVjQ4NzdMTVpBaXRWZU56Y3VPVHFrb1h3STU1Qm5MMWtYelhvRHZyOXM3VVhHSVRacWw4a3c3VkszRkEyVU9QcUVZZjVPclYvRm9CZk1xTnBJWG8vTjFnTGR1OHpocGtcDQo3b3AvanlTT2dtc1dJTXBJZFBWRlJ2YXlubXlzbnN1SWpxSDg5ejJVU0VsUEZwNVRDaStKRE9HWHUrR0Z3RjQ3SXArSXkrNXRUZk8rRVk0Nk9ZS3ExSEZwdXlUaVRGV1dQMUptd1wNCkE2T3VUTjRISS9vWHAvQ0x6U3Q1c3JlTkFTK3p4SEVjL1M5dU9rU0NCWkF2WEVwRzdkclJiV1pTT0RINHcrOXdQSkN4NGZSVEQ0S1hONm9CR1NNZ0ZXSC8xWW9oN1g2NDNoNnNnXA0KZDd1SmtFT1l1TWxyTjJETjVqRlhYeCtOY3gzRi92cDNxaEpYVzdiTFlsUVd2UW5oY1F5ZGN5TDNGTWp1MDcvNUxwUHZWb2JuN0tOUzB4K0h5SVRFOGpEWVZHR2ZSUnRHS1N1NElcDQoxSFhHMjYrMm5zZ2VQTjVzQ0pyc2V5U3FZbXR3c3NSYzJVVytKK3dvTGl5R2NVVjJVempIcnp4cFdZd0dVcm1UOFpNZUJmYysvYm4wUE1TcHBwT2h2TmpYaldlYVYwRWp2SnFUd1wNCm1UNWlJZDBaSXphZGJOdWRhVkdRZWhacDVoTkd1VXBSU0ZTSGF2bzRyVUZ2RnEyUkdzTG43aW1ySi9RSC9SUHkralNoWHI1VkxCM00rb3hmd2poVHl6bVJVc0IrK0lreE1xTFBHXA0KaTU4NFFON1llQ3BPUDZKRjVwTEtNSGI0Vm95OVcybUkwaFlkaVoxMzRsTjdYQmwrNXBobFN3L1RZczNkTE8rTHdLK3Rid3p1eFAzTCtxV3RGNm1FNXI5RHJBN3BXTFM4QVZLbUNcDQpRVk52MHhNanBtbkxSMUJKWit1b3pGOVhpQnNHMTg1WWx3ektSd3F1cVo3L3RWemVEdkR4TlRqMG9FV1FnL2pFZ2g0TG82Q1doYk1mejdQU0JkbkU2UUppeEltcmp6K0xJS3c4U1wNCnh4MThsQzVpRHBhR05IK3lyNlhESnBpRENlK2NBWExteXRsQkJ5dG1zRWdhZjZXdDA3WDk0RGFYa2xVL3NkSmQyMjNzMHFlSHhjdk5UMEJPNS9pZnlwZDNzMVRHM0swUUFTb3VUXA0KR2hRTzlFbFlEYTBUK2FaTHBTMWkxY2ViaTRMZGhNMktIVWNIM1poQU96ZkRDZlpNM01weTFMalZ0SDc4eFNHUEN3NzBvYXdsVDcrcGRMVlAyTCtSKzkzU3M1WnR6a0xTQjl0UGtcDQpIQm5YTCt4UDkvanJTOE5POXNWdkdObk1vQ3FuY0ZubHZXVEw1cE5wTHNUYjlDa1FHam5qRW13QXYyOCswdFRBUzRpNEFOWjNCMlVoa2JQWllmaFlSdzFtSmlzTjJEQmkxZ3ovSVwNClhEVEpwL0VqNlNmaXhLWGljR29JS2pUbVVRTlFxOWY3ejJwdEI4MmNVSitUYmV2OGdCamdzUHprdGc0enVlV3U3alVlZDVSK0Vpc2ZVZjB2M0ZSNS9DM0VYaFZ6bGNPOFhLVGlqXA0KRDBoOGR4ekphZ1pNdEFzamFpTGJPcEpTenNHSXI2akpjdVJTRWcyRDJYWnVXMkJwTG1MZ0hVcGRWVStGbUU5Z202dWVUUWV0dmhiU29na0M3TG0rYzZwU1lpUkR2UXFoc0J5ZjlcDQpFOEZPVWY3aU90aFZ1RU84UHNaNnBXRFRweVVmMXJCZ3VYZGs0b2hlNFhJMm5hZVlCdFpXY3NPMjNzTVg4bWV4czZ1WjhMR3NWWVgrYldJa2R6bmZGejY4RFBrRzU4SnZGMkVGNlwNClFmRTNLcmR6ZlVBZTNvbVNnT3FqaU9IOE9qdllVWkRmQk81NVVYSE14WkEzMjNOWVBnVVRONUZtU2VhVnptbmN4WVFYdEpkNEtFZVMrYXUvcHBLYzYvTjZ1VlVVNTFNaC9XdmxyXA0KcEM5d2dhZG13WlBBWUlqVk55Wm83NW5tV3FsZ2VSd1U4V1RUTU1KTVFsb21pamZUNjdiRnVLT0F5TWhDQjNYNlZXMWpsaGZDN3RYVFBxbVYyMzg4TVNJZFlUYWR0Zy9VQ2xiZDBcDQpRYlE3WXZ6VTc2aVBhNFdPOWRwVDlZeDg1bnVEVHlNcENHTTAxVzVaeVJ5dDd5Y0htSTVYVnNDYm9qVkdLQUJ2azZVeGNZeDNLMUNNK0s2cnh6N2ZURGwvTkpLMjlWdVplYk9JV1wNCm1sTjZ6Z3dtK2MvaVBBb1A0K2h1SXExM1dzWGVISUNKeXB4bllCT29xZnRuMS92ekdXOFJvc084dmRSdGpBTFN3Q29NWGordTFzYXk3UDh3bzh4T0hINFp2S2puM1lVV1NNekVTXA0KNlRyb1pzMzBRdDRBdzJkcUEvTnVKNzRqbzZpN1FkQmRmWmMvRzVTWnk2ZUNBZFlyVVlvMGFuWHlJTVlKc2lYdnFScWtGVkVmeXQvamxCQnIzTmRRL29SemFRTXBhcGgyR0JOL0tcDQpXUDZjajZScEUvVWR3YXd2V0Erb3VCK3FpNzFkb3hvUUJXYm1UcVVrejVkS0Fkd0dHQi9yeG84aXVYSXhtdDBLSk43N1lrSDg2ZzBhTDJHSjNoZmFvRkVjMnVJUWRKWFQ1U0lHRVwNClYveXV2aW5jOXg4cE4xYXRSMnNTcXRtcXVhMFBIem01UHdQMXBYOElEWG9RSkpKQ3lBSDY3d1JzV0ZTNkZiYmFjOTQ4WVVPRVpGZXBZLzQ1OU9YaW5TNnVyWWd2UUpEU1BET1k1XA0KbGVuZ3ZpWkxOM2hpTk1JZkNKeUV3MTlzdzZtWnhNbzc4Wmkyb2F3aE93YU9MUUEwWGZjczVmajZkeU5RNDVjTzVNcC9RMThrMmtNeC9sbzQ3d3N0ZkV0Ykl1a1hrY2JkSThqMkhcDQpZbFJQV2loQzRqaEZmcnhlcE8wUTB4TGlqSTFRYmZucUZURWFDd0hBd2JPc3Y3TllzbTBHaGg0bnM4NEJJUWVwUzBNOGlEZjN0K2I3V3lHdHN5TUpkcldCMTdOL0ZSb0dRZUpnVVwNCndFSzYzYU1uQzdCd1V2MXFRQkV0OVk2dElHblJxYTBrVFNaZkwrWXpnT3V6OTFYa0hNM01MRCtXS0xwblZjTkhpS2xLeU1lV0dDSGJIZHpKM1RjOEZCQ3NQQ2UzN1ZLbEw5WDc5XA0Kekt4NXd3V01KSkVhUXpIWXpWbGc1NXRYM1hSVXltaUdtVk1IcnlCNDVkNVVmSUFIOGpKNWx3Zk9FUm41YzBJaDdQWndkTU4xQjRUOW1NM0RwYWhJaHZMNHNxZGhucFV4TStjTWdcDQplQ2R4SWoyQ0xTK0RZQjlxSWJ6RjR6NHIyVy81ZGdUdDVnalAwOStpUjZoR2Yzdmh1L3J5SnUwd1puREh5RVAybTZqRFRKRkJhWnFMWjg4clI0QkcyWUpPbHJhRHFrRTR0V0ZtN1wNCnc5c0RWMWVmM0VQd2lvdVhxZlIwcGRuZGFhVmdQZW1FWG5qdWJ0bVB6cWZPSytlZjI4cnd6WGtZQzBzVU5KM09zVUpCT0dHYTVTd1duZnA2azRtYkc1ME1XS0NrVUtyN1RhdFpNXA0KdmJ5clZQWldsQVhLUytsVjBiY2ozZWt3TWo2K0FJTDRwVXc5dW4vSVphVTV1VGpKcmwxN2poTmV0OTUzU2Y0eitrNXpCbERzaG5pdnZzNHA0OGN5dWJVeHhtczZ3bERmdVZKbXVcDQpCL2FNeHI2dms0SThadVI2am9CV1UvZVNQMkxsRUlRNjNTWElTaFBBbU1jenhiNUNyTTJnSVQvODVpUnZmdmJkOEc3Y2dGR1ZYUUFDVW9aeHJZckFVWnAyZUlKQUMzMklwbXc4d1wNCnZvcEpqOXRmRVI0UFA0QWJ2YWtyNW9xTWRUdHhLc3p1T1NZdTVGYlJuQnlZV3BOOS8vTDJ2aUFSaS8yTisyWkFUSjdqWnY2eU9TS2xtUjkvWVBJdURpbk1NNUVHaHZLeHNKN0pQXA0KUHMxNHdraVgzVVhEMUl4QkQxOHFDQUl5VGJaZFJlQnhCR3EvYzgwajY3MDlncUZlKzd2QmhYTkgrNWJmQWt5cHZ1TXE5WUNiTTVENWZ0cjRVOXFxVEQwR3pFR0tXT0hDZmdmTkxcDQpJeW56VXhUNGwvUmpNempkVm1VTWpZL0NobnJOVlc3cU1ZekFGc0lCZEZ4ZEFxcnhaOWtxbjhZQ2pncmJhTXM1dVcrTjFpeDZFMUdNVk1oY2VIUHBXUFdXekFmdkRDWEh5S3NjclwNCk5BTFdWWEZUQlNXNms3aXlxSFV2eE0veUJPWGVwOWZQM0svKy9HcGl2YnJFcFJLUW1QZFRWZVQycmlhMUdFVDc2djgwSWZaVjBDa2lGOTdSamFDSmtIWnRBeUhiQldBRzVMd1NwXA0KMVdNdS83alNFbkEzQURPUExDbHVGSDRTVUVZMHVPV0ovbWR5WHRaclpoODUzZm9wVFVBT2d2cUphQUlLZjRCdGlsTVp0N1gyaC81RmVyTmZtRm9FU09odkMvcHpaSnNVSVdYQVdcDQpRU1l5Zk1HV256T1ByQ2k1YzNwek1uSDJyZFlwRTFZN0NMTytXcldFS2hPdnNtSmZOR2dxVG1NUjhKN1M1Ni9OQ3pwdTI3OG5vRjl3WENkVUdMcDN5UDV0cEx6ZWN6UVA1L0w5cFwNCm0wZmdTWXArOFJON2FRRzBKWFBxaVJTY3UzZ0IvZnl1Rkg4Ym8zUFpIMmh2ajZZOEMvZUwya0kydzM0c1lzaFhERGc4clRyMFordmEwWGhLK2JrWW9YNCt5NDdtNC90SGQzbW8xXA0Kam1lUTZHMU9MYUJnazJkNWJVMnVuMklQU0F3bzhaNkhMTjl3MUo2c1Y4NHZSMkJiWWdmcEE2MGh5M1g3STl3Ri9BSGVFZ09hR25GOEFYK0lFTjRaUWNPUjY2b0dLR1pnYjE2TnpcDQptdTJ0dTVYamYrQWxqci90V241Tnhya1dmR0wyL2REbCtFNlFzNElmenByWUp3WGp4aks0YXNRZlhibEY0NHVjaVNmQVZRQ0lKcFpDeG42RlpqcDVYNXEwQ21tSWIrd0RGeHZGNVwNCnYxaFNyTHlBQXY5bmhKcU40QlZXWERhQ2Z4emhGVGtQTHo4YUl6L0k2VzdhZUdaclFNRmwxWmU5b0t4RnkyeFFwWnFQdVFzajlwcklpdEkxR1Nub2haTldTQTgvREpBL21zOXNNXA0KWHRzdGxTK2xZelBZeTZQSkpKWUlCZC9aRGQvR1lCZ08weTR1Q25icllOdERwaFYvMUZwR2xtN0VndXE0elpuRmhVSUFlbmxWc09mLzVzU0JYZmhmT1p1S3Q0VlVubHBaU0E1cHJcDQo4bmp6eXFhMUh0ekFmNnI1ZmJnK3lacnlSaVBXTTJ6QUxwbnp1bjhaU1psemZEUXVTcTJtT2srZVBrTFdaK1Z2UWM1TUNzeWcxKzhkVWhIVEFTejc5bWZaaXJQVFFtUTBoTjhYOVwNCmhwcThzK2RzODRyN1dXdnVLMDczNlJzZ2pSQ1pvNWRkM3hGWjMreTlYY3hBTjMrNGpWZFNNaTQvZG5vVjM0UEJlckMzZEZIZUNuekJra3BCejhGRTNZN0dPZGdnTVMyczdQcmJqXA0Kejl6bmNMMVdQMW9sditnNEhNQWVlbTJrUGFYUzRSYWRQc1J5WU5Da0FYTmJjRHVHRk4xUmRrTUgvMXNzT25DOGIzZ1pQeDN5Wlg1MDlObjhSRjBnbmRHZ1dYVG9ya3paUnVqQThcDQpIbUtObUtMemVFTG92bkw4YUI2Q3lOc0kzMjM2OXJhV0o5d3I1Vm0vdGh4VXhUelNPMkJjN0ZPc1hFVEY0UE5HOWtWTmhBTkJiVTV5TEpJUXJGVkxkRFRMWVN4SStjeVZMQzN5YlwNClZoc2RRUHJhdnhXSzVGMWorL1FKSmV3a0FvZjZ5cW04ZlVmVGdPTDkrQ2ZhV1JxdjFMZHNydjYrK0poZFdWQ0VTZ1FScm5GVyt5VDVQbXhicW5JdHk5L3oydWxnWUlNYUp4MS9mXA0KZ2VTUE4xVnFYSHViZ0JvNEpxc3JmSXVqam16NncvcEorcE56M0RxQTh3Yngza3o3N0lWR0JpVkdXV3FHRkZkOE1SVWFvZUZpcEdBVUhqUlRIMHRlZ3lCQUo2UDc4cGtJZ0k1TUNcDQpYcWQ5Q2VRNFkzRmUrQW10dDhSY3Yvd2NoejlvZVR3L3BaelI2ajdUK0hMWDhscjZBMnZtZVZLZG1KRDJWOWQ4R0o3SmJ1WjVIUUhKQ0lQRW51a3hINUtQbkd2ek5ERnJZdXlVYlwNCjhMU0t6Wkg0ZEV1aFZ6WU5LVG5RSTIwMzhFRGQ1dzJEZVZRQlFDZWxhWE1XaUQ0V3dZcGRENElOcWlFRDdZcm5FYXVNVmdMNzdWTDZhVHVRRk1JRUJoSy8rWnBNcklkNXRNUkZ0XA0Kc0ZuSVE2NmtqZnhVUzN6NzVVMlFBYnpQZC91WEljOFhrS3p3STRXWTJzeSs3YkVhMjYwdjhzSmEranBhaXE2YU84MzROYWo4b1NqeUxBSHZPOUJsQTFtaU9sMTJRbm4rQlhuVXdcDQp6ZUJQb0Vsa1ptQ0E2a3J0Mlc0dEtLLytScWk1OEtudmlISmVKR2pkUkVMWVBnbHdQdFRZZCtpRExuYlAramJOZ0t2NFlaL05ZVmgvQ09SWXU2RFhmWnY5TXBDQlpaM3ZldjF3TFwNClp4WHlFVXpiUmNOdHBLU3VOWlExMStGSnVJTWIzNmpHbjlXZ2VvdEpKN3E2MmRIUnFuOVFNMUdUUDdOY3FaUFVONzhxRWhIc281TmlENWs1czV6aHJCTnVLRFZTRUJ2c08rQ1pjXA0KNHhjWHJVdGtZR0M0SFV1eG5HOHQ5MW9xbjBuVTBrczlQNWUyMytlUEhWR2p0WXlTeG50ZXhkNW94ZUVxODUvbFRiWEY3RHJWK0NUbGlLVWpuRGNHUEZXU3RBTzRUOVQ3enhZS1lcDQpKRFdOSFgzVUV4ZnBSWUptc3ovcmswWm4yQ0V3anF5QXgvTHZvV3prOFhKdVc3MWhHWXQyTzZOdXRTb3dtZnU4WjMvdXRueHB1UGQzZUNsQ1RyS1hlRldwejJwWEhjMjdIRnlGeFwNCldCRVFEYjh0VlY0amNRY1hQL3d5S29sTUN6V0RZejl6bGRTODlZUE12OURKbExzZnBUbnpPc0NyL0RvZEJ3ZTQvTDNkS2dJZGhyOEdtUEgzVE9sT2ltSUF4RW5OcXRQeU5tMGdHXA0KaUZYdzg2NzZGbndKNG5HbjFNb3JJVitWN1VaL1FoNVRCRGMwb1BYdTUxamRzVHIrTFVxRStQeHZpNlNiRXo5WWlFenpCaldZZTM5V3k0L29zbS9jRkRYZlhINVNmdTdRRnFqT3JcDQp1YUJHQitGMnJsTDhqczdhOVlVdEFkajBwbi9vZ2NTUnF2RmRaQWxnNE1KbWNPaDlGU24vODgrU1ZDVjlnQUlzcnY0bHVkQ1dWeTdVU2Z6TXlUTUlRMjJnT1A4S210b1kzblFMSVwNCjFSZnY2Mi81dW9YVXJkTVVBeVdnNXpIWnAraENVRVZ1OXk1NjUwVWpuREYyVlJHRjgraXBST3VFTDJHZnR1U0pvN3VVUWFVOEZoR1phYWpvRXRHKy8zYmF0a3V3cmtpZmJVOGJuXA0KSjNMc0hMRmZpcHNqVm9telI4Z0tmWExuYnJ4eHdQY0I4cmNKajNjQUhWZkc0b2YwSy9sdEZhQ2lEcWsyRFlBcXNYV0FGME4ydEdrTExFRUdHQzAyTmZLWHduV2VtQmxDNS9ISmJcDQpBSWEzZUp6c29XVVFTNmFkQUxXWVBhMDhFRlhLZmNMY3dXNEpIdEdmS3lycDZmWTlTNDUySkNHaWdiQ3hYYlRJQ3RBa0c3NTRmS1RoYXVBMzRGNEx2QmVZbVJqSkNIenhWSGF0NlwNCkR5Mndtcm9Md2ovaGtPZ3FUM2ZyRmRDTmIzVmN0dWx4ZTJzbllidGUrTVptM1JpZFhyRk0veHBCSjh3dElYQncxVGk5UkJGQWk1NzhkWGVDelJ3eWgwMnB2RkV0SUV0Y1ByWWNUXA0KK3R5eEQ1Ly9KSjkzTUk4R0xWYXo5SlRnQWgyeXE4c0pmejlOeWlLZVNKT1AzSysweldXaE52TGpTTGo1UkZaYjVJR3Zyai9Pcm9EeWhOMTlMUndiMnAreUtQeGNWMWRUTGtuUjNcDQpnSTBIdEZYRSsxeXRXMnRmQ2p1bjlwN0ZCNTJKS2hTclVOVUhPWDBhYjdFdzVwS25rTGpoUUQydU1XbDRHRk1ad05XSDJvU0pRL0h2dTVkSzRGV3JnbHd6c0FtVFlmZWYrNTZ4WlwNCm5XM0pJbjRIRnFpcDhkYmMrV1JzdjNGbC85cy9nOVdrMVhiYS9sRmkyWUEvUjRYVjlWVVBaYTRRQzREajdlTGYvVjZaVy9HNENzc1JydnBmWnUwak9EYTdEeGRTdGhNZEFqMG5hXA0KU1ZxQ2ZkZVdUcVJ3ekRuRkFTWlo3NG1ScjQzQU9WaDNCdlhnakI5Tk9mejZRdW5vVHBmVi9aMktoL29uZUppYTFVK0NOUlRSSmFkMnBkZDEzWHZYMDVXVXUwMzNLeFd6c0djbVpcDQpRM0F0MXZ5WG1tcGpTcG92ZXVKRzJuU2tCdDlyV29iTzdlRjBsZjJWdnV0Q1BoRm9acEFSZW9icVV5bHFSTjZieFZXeWwwUEZmNHBnMUZnekY2ZWdvTHYyMXdQbXhpejFjenBhZFwNCndOOFI4QVd6Q3BwSUdEV2ZFV2Y3eHo3SFRDOWVtVzV0aStYMk9VQVVkeC9GWGFUN1Y4TzNBZzNYWHhRNTVsK2pwaSt4TEVNN0hEV0JpNVVUd0VjbS9sVjBSb3UwR1M0bjZhbGhaXA0KQTZ2ek5YUW5ZZ0Yvdm15RHV3MzVjMlBPWnZpSmQ0V0dJMWNhWC9jb3hmei9vdmkwQndYUXVyc3hmcWl3VGx2NmxzM0ZzbkoxYWZvd0lVWkljcWNyb1JxcnhmSUxxaWdqem14eUNcDQpneXZqdTg5Skg0WDdwNjIwMFFrQVR1NkJjN0puUmxrMXBMaTZQMkZWaXJTQ01sOWd0Q3ZiVlBvSWRVdnZMdlAwVElyVnREOTZyak96cnk5aStiOGxmTVU0aUR3dlBZam5UbGxtMVwNCmQ1ZEpFM0M4MnkvSmRSYkx4TGVsSEFoNTFLeEk1ZEpxeEdTUERIOHBXamljb0NhZnFpWktEZ2U4RjI0TWdCWnFteFJuUVZCYi8xbjhqZG00MmhWL0VDUUJlL0NLU1BhRkZ6amR6XA0KandleFpmNm9SZmFnY3BwTnRqd3AxaTY2alJoUXVEeGZ5WnVQa2FSVTJrR2ZGNVVLcHF2REV5T0hTYkxSZFFybWdzd09keHNoNUl6RXhnbnM2MGYxWW9zZWRKTXJXWE9ZVDlUenNcDQpxQkU4R1NmZGZiRTlscWJZK3hMcGFRUURhM2Q4UG1NQ3I0cXhJL01ZcTlwaC8xeXF5STZpbXNZNm5MaXdXSEJmYVJaZityNW9DQVlWcHJWZnJTT2JEOWNzamhDaWRmN0dLNW9YQ1wNCmFmQ1FOQ25GcXZVTDNmVC85SkdnQXFsQ1RHUisvZy9KNWl0clAyN1FGVFVJRmVjWjVGdHFoY2pYTnMyWmNuWkZ5ek4vb3pxUno2cTFNSXdscDkwMG1RMWVreDhZdVJSZFAxRnVaXA0KTUorc1RGY1lEQThQcytaSXpZWSt3T25vbXRBeG93R3hMQlp2dVprUVZwS3BGRC9UU3E2UVlkd3ExRDRYV1BoY3lOZmcrS3NERGpkNVp1NkJ4TkNjTnp0RjFvY2NWUitDRyt6WWpcDQorRDFTdTd0WWhwOWxZeWk1MnZ1b20xT3FhaHB3NVNaL1llak0xU0dzN25nK0xuUnd1eW4yeFJlOHN6cW54K0RuTE43bTlIZ0Y2QkpjUTF5SW8zT3dvaFZVbVBRWHNIMTNrdXpzcVwNCjVISmhPWExtRFBnWXk4Zmx5VEFHN1BzWE1tam5GdFBwdUFaaXp3cW9ZWklaMS9kRnY5K1JRRlBOQ2plM1BxNXJRTDRqd0VjTjRKQlYwVC9aVWdnWnFSSlMyQ2h1YlZMTWsrV1FUXA0KMnpLVTNkdlZVenVUbWt1dUx4SnlTbzJyMzRxRU9HNkJ2ajdxbkZCRExRZ2JsMWJyTW5YYitaaGlRK3FhRGU3L01vbWhSWEZvemhxVHhXMVFybjl4ZDFoQ0Z0eFVHVmgrMXB6SjlcDQpxK3V2d3RiN3MwMFRxcnVBVXhhOGtobXJqbjBsWUJ6Z05iOEk1ZVdjVWxUc3pJdnVMOGx3Z2tVajUvRkgxV0FFeXd5dU5FWDFLSHVzZXBoS2ViajNrMW1EK1BGQml5Q2pZUU5ZRlwNCkZtTko4UWRiT0FQbFJ3MEhWbnBSMjVwcGRrWTBnY01SV2hMR28yL3RLbjFJRTVRRW9GM25SNmZRYW84SWVST200ZGZxMFZ2T0VaMmFkZVBJanhiYzhuRjRMbGV1WWZQQnVlVnFJXA0KYlVKVGpGajR6Z3c0QTZUQjdxUkJpUkltWVVLT1kxRlhIeVNIRVVNQmN2RUNQVmQrY0Nsb04xVGZxZitFamRRS3ZqS2F4cklQa1k4VWUvYUEvYVh6OEFPVDZpcC8vNVlyVmM3VXhcDQpMZmFBNnlXcjc2a2MzaFNUemVoMjFDSThyblR0ejhtaUlzSEZmU042VytHQVYyZ1dtSkg2RG8ybVZJd1d0b3NDazdTck5uR1RQc1RJZ2xCampFQ01nTWJqbzNleWkrZXZIeU9SMlwNClNGYWJnRTZHQ0RGbk9Fb3B3dFlMbmRaUVIzQWxzUXlNWlFJWFF4MzFQdndsdUVKeHVpS3FBdHVpU0hnUmExMCtpVk5Hb1ZUZkdwdzFPcEtPYXJFUnZod1JRb0VPbnJaUDFWczBjXA0KSHBaUVRkRnduTXNINUVFS0VtMnVNUmtKNWZsblJBKzAxL0c4cVdpSEVvczVDbUhFZk4yL0hxV2dNZHNwMnBhQnAzZmg1WFZZUlg1Vkt5TWtzVWU3cG5FTm9RUW1lKzNRdkJUeEVcDQpuSEs2SCszeE5JZHc2aVI3aE9MSytvYVFlU1Jaa3Izcjg1bWtmZGFQalVEMmZnVlVadzZiZFVHZjEvTTVYeTZ0MGhCb1lJNWdqQlMyL3h6d1dZNjFtVy9LUkxlS0VmV21yb2JKOFwNCjgzVzR5aFJja0d2SDZEbXp4U0xQRXMvamIwaE1nS2JWQjZZY3Z0RUlJZ0Z6eldrZkVWVURrcEdPU1NWZjNzaml6blJEWGVkTzlZUXdvblVleDU4ZWhYY2w4RFpleWZPcTdkOHprXA0KdWE2WGhLZVF6YVhvcWdXVE9YNHBNR3FIL3hmWklhUENQT1N3Qm1WTUI1QnhMRGNyMDdienBaM2wvQlFWcmhzTDNaQkcvNkl6SzU3SkQvcWNBeFJyOWxjTUMzbWdFSCswZnVDeFdcDQpzbk92SVcrMk9lUWdKT21RZStFWFZybGpEb3BtZHdzdVk2TiszTmpqNzBmWkdHMlV6cWhqUEFWd2JnTFk5WDRvb0lVTWxjS1lETXl3TmNIWCtKQjVEekxiT2E1N2xablZOdmw2ZFwNCklMQm1BS0NWcXdWNlR6SE04S1FRRnVQTnoxY2xETXhmOVYwQk4vWnpYK0lIaTNDRXk0bDBWMzdxTU41d09RV1RWR0E0QWZqUUIwelcwU1JJbG9LTGtUc3FSbEh2TUV4MUpXTWFHXA0KRGVXbVBINUZQam9uR05VS3hCanJrc0FhN21naVl1RXo1L2wzbkNSdUVPN2h6WDFGOU11blpFL0Z4Z2NsYzg2TUNBRlFMcTFWOVgxY2tFMHpLYXVFMk1GTDZUTzYyZkNDOE1lVHVcDQpYUE5RZlovL0tmV3JtWmVmaE1qRFd6ZnhoWnlRNUg0TklnaEtpTHdnZ2ZjS3pMajVtY0hLb256RkNpaTFnRWlOMHV4RGFKWGZKM0VhOTJXWnEwOUk3em1kUmw0NklGUE5JWXFlTVwNCkkvdnhyNzU1MzRNRDdhWHkxQ05iV3UrSHlRSXJUZjVzd0NtUG5UcTNXRnJINmNYeGsyMjhxb0l1VkZsYUlzK1FyZjRtZGY5dWp5L0phS3pIc3JIelhMVGQ5SkZoNEEvTkJPYmw2XA0KS2cxdTJrSTZqT3ZrQzBmVDRDSDhDWERQdlBmRVpRRnRBV08ycC9zWHdQdGc0cWxTUXhFancxdVUySFZvR0NaZVZQbWtpUTFCdGdLMUd4Zi9TQUhSYnQ3b1ZtVFpnWHpjV3BUKzBcDQpBM0dQUWx6THdFbm5CUmpQaStSOWxXbklMMUxmU0hiVTE2blhBWitLTTFmZzJ6OVRVUTBEZ3ZKWnhPRzhQdFVaS1FjNzFFaExqRkRwdnNWVUxMVCt4eFA2TmkyNUlxYU5CbkZSYVwNCmtoRFVMYkw1amxxbnhaallyNlRQY1ZaVHZ3TElnN2ZDWjVUUnd5L0VqZ3A0bUxoRmd0dm1lL2FaWHZHd0ltTVhEd1cya0VMMGpoTWEwcWxQQ2krRUNIWVBjR2YxRzJqR0dpUi9YXA0KY3lIOTdjYWVXc0ZYR0E1WENmWnorTVNmSDFJUWJ6b2pmTFlPZW5seHFHRVF1M3ZmZG1lTjc4eXYxQlltMm1xTDhRbFNFdnc5SytQcmZ3ckRGRVc1SmZ5aHo2ZVhkd1YyMTAxcnJcDQpMd2p5eFd1cVgwUHRCK0FmdldiRmtSd3ZLYjNkcHZ4T0tsNUZsbmg5MzVqV1RVZDJyMDFGb094QzREd3VSWE9PYlFkRXgxK1gvcW5ZTzBmajBmd3ZONE1lcGFwbHVkeTg4TGV4UlwNCm9OSFYvYXNzWlRXYzNGRnZEQU5CdGNMN2pvSktMcklGK1NId2VVUFVSTjA2ZjFzaldMWG1TaGJLTDNtRnh0aE93WVE3Qk5veU1CVW5pZ0hYdldWb09ialBpTExQalN4dGsvT0N3XA0KSmoraEhkMjBRb2VqN3NSVU90Wi9DT0Z2eFFmNmVWdndJYW0wRTArZVAxM0RJbTU1NmN2TGRHUks3eldUdmZhOUJMaktQZjdOQ2l5QzBKUHFzV0hIWUJRc1ZQUzBVUFNxY1QzVThcDQpCSUVrbHRLUHYvMUwrU1ArV0pEditUZlUvWHZnOFBvNGZYOTlVTk00WGVDekNCTWlUcVlKaDEvSmZoOFVxQXE5eWNaVEFNNHMrbXZzUVhhQ3hPcUpiYkdYNmFZUlBuT2lWWDg2eVwNCnpBUDZJOUdYZjZHNXJIUUVQTW54SWEvSkJPaGZIQ2oyRUVvTjRJN2FuSENodC9mME9ZWDFKeDIzU0FaNjg4TnlCV056OXVTalVxbUxRYWc4bFRYRVExb3dSR1VDejJyRWVLNHRaXA0KTmFEeTBjdGlOcklLU2VaUGRTZjF5SW5YOS8xK1VzdEpnYzJWKzY0c25aMkR1aGdNc1VGVjYvVzBkcEE2ZjRQdUJNT1JISC9QZmYveGsyTzJ3WVFRQUEpCj4+DQplbmRvYmoNCg0KeHJlZg0KMCAxMw0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDIwOTcyIDAwMDAwIG4NCjAwMDAwMjExNzEgMDAwMDAgbg0KMDAwMDAyMTQwNiAwMDAwMCBuDQowMDAwMDM3MTUwIDAwMDAwIG4NCjAwMDAwMzcyOTkgMDAwMDAgbg0KMDAwMDAzNzQyMSAwMDAwMCBuDQowMDAwMDM3NDgyIDAwMDAwIG4NCjAwMDAwMzg4NzggMDAwMDAgbg0KMDAwMDA0NjI3NCAwMDAwMCBuDQowMDAwMDY3OTgzIDAwMDAwIG4NCjAwMDAwNjgwMjYgMDAwMDAgbg0KMDAwMDA2ODA5NiAwMDAwMCBuDQp0cmFpbGVyDQo8PAovU2l6ZSAxMwo+Pg0Kc3RhcnR4cmVmDQoyMDQNCiUlRU9GDQo="
                      />
                      <button onClick={openIframeInNewTab} className="all_button_clr" style={{border:'0px', marginTop:'10px'}}>submit</button>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>

                {/* </Grid> */}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  //=============>

  const openIframeInNewTab = () => {
    const iframe = document.getElementById("myIframe");
    const url = iframe.src;
    window.open(url, "_blank");
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleImgClose = () => {
    setOpenImg(false);
  };

  const handleImage = (valu) => {
    setImage(valu);
    setOpenImg(true);
    console.log(img);
  };
  // console.log('values', values.data)
  // console.log("selectedPDF", selectedPDF);

  // ==============pdf-API===============>

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSelectedFiles = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file); // Use "files" if the server expects this key
    });
    const token = JSON.parse(localStorage.getItem("reseller"));
    try {
      const response = await axios.post(
        `${api.dev}/api/docupload?user_id=${location?.state?.data}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.access_token} `,
          },
        }
      );
      if (response.data.status === 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
setResponse(true);
setOpen(false);
        //handleCloseImport();
        //   navigate("/"})
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error.response.data.message);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      setOpen(false);
    }
  };
  useEffect(() => {
    dispatch(getAllUsersReseller(""));
    dispatch(getRoleUsersReseller());
    //   if(state?.allUsers?.error === 401){
    //  localStorage.removeItem("admin");
    //       navigate("/");
    //   }
  }, []);

  // =============End=pdf-API===============>

  // Array of PDF files
  const pdfFiles = [
    {
      name: "Sample 1 pdf",
      src: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
    {
      name: "Sample 2 pdf",
      src: "/",
    },
    {
      name: "Sample 3 pdf",
      src: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
    // Add more PDF files as needed
  ];

  const handlePDFClick = (src) => {
    setSelectedPDF(src); //selectedPDF === src ? null : Toggle selected PDF
  };

  const handleClosePDF = () => {
    setSelectedPDF(null); // Close selected PDF
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFiles([]);
  };
  const handleBack = () => {
    navigate("/reseller_portal/user");
  };
  //http://api.dev.ringoncore.com:5014/userprofile?id=${location?.state?.data}`
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/userprofile?id=${location?.state?.data}`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        // console.log('response', response)
        setValues(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
    if (location?.state?.data) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/docupload?user_id=${location?.state?.data}`,

        headers: {
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setImgs(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [location?.state?.data, response]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box">
          <Box
            className="right_sidebox  user_profile_page mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <div className="container-fluid">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-12">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="cntnt_title"
                      style={{
                        textAlign: "left",
                        paddingBottom: "0",
                      }}
                    ></div>

                    <div
                      className="cntnt_title"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        paddingBottom: "0px",
                      }}
                    >
                      <IconButton
                        className="all_button_clr m-0"
                        onClick={handleBack}
                      >
                        <ArrowBackIcon />
                        Back
                      </IconButton>
                    </div>
                  </div>

                  <div
                    className="cntnt_title"
                    style={{
                      textAlign: "center",
                      paddingTop: "20px",
                    }}
                  >
                    <h3 style={{ fontSize: "22px", fontWeight: "600" }}>
                      User Form Details
                    </h3>
                  </div>
                </div>

                <Grid container spacing={2}>
                  <Grid item md={4} sm={12} xs={12}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent className="card_box">
                        {values?.data?.map((item, index) => {
                          return (
                            <>
                              <Typography gutterBottom key={index}>
                                {user.user_role === "Reseller" ? <> </> : <></>}
                                <img
                                  className="profile_image"
                                  src="/img/nav_author.jpg"
                                  alt="Profile image"
                                />
                              </Typography>
                              <Typography
                                variant="h5"
                                component="div"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {item.username}
                              </Typography>
                              <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                              >
                                {item.role}
                              </Typography>
                              <Typography variant="body2">
                                {item.emailid}
                              </Typography>
                            </>
                          );
                        })}
                      </CardContent>
                      <CardActions className="card_button_box">
                        <Button variant="contained">Edit</Button>
                        <Button variant="outlined">Message</Button>
                      </CardActions>
                    </Card>

                    <Card
                      sx={{ minWidth: 275 }}
                      style={{ marginTop: "17px", paddingBottom: "0px" }}
                    >
                      <CardContent className="card_box">
                        <IconButton
                          className="all_button_clr"
                          onClick={handleOpen}
                          style={{
                            marginLeft: "0px !important",
                            textAlign: "left",
                            marginTop: "10px",
                            marginBottom: "0",
                          }}
                        >
                          Upload Documents
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item md={8} sm={12} xs={12}>
                    <Card sx={{ minWidth: 275 }} className="form_profile_box">
                      {values?.data?.map((item, index) => {
                        const date = new Date(item.created_date);
                        const formattedDate = `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`;
                        return (
                          <>
                            <FormControl className="profile_form_input">
                              <Grid container spacing={2}>
                                <Grid
                                  md={2}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {" "}
                                  <FormLabel
                                    className="brk_label"
                                    htmlFor="my-input"
                                  >
                                    User Name
                                  </FormLabel>
                                </Grid>

                                <Grid md={10}>
                                  {" "}
                                  <TextField
                                    className="input_fields"
                                    style={{ border: "0px important" }}
                                    value={item.username}
                                  />
                                </Grid>
                              </Grid>

                              <Grid container spacing={2}>
                                <Grid
                                  md={2}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {" "}
                                  <FormLabel
                                    className="brk_label"
                                    htmlFor="my-input"
                                  >
                                    Email
                                  </FormLabel>
                                </Grid>

                                <Grid md={10}>
                                  {" "}
                                  <TextField
                                    className="input_fields"
                                    style={{ border: "0px important" }}
                                    value={item.emailid}
                                  />
                                </Grid>
                              </Grid>

                              {state?.allUsers?.users?.map((name, index) => {
                                if (name?.role === "Reseller") {
                                  return (
                                    <div key={index}>
                                      <span>
                                        {name.id === item.reseller_id ? (
                                          <>
                                            {" "}
                                            <Grid container spacing={2}>
                                              <Grid
                                                md={2}
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                {" "}
                                                <FormLabel
                                                  className="brk_label"
                                                  htmlFor="my-input"
                                                >
                                                  Reseller Name
                                                </FormLabel>
                                              </Grid>
                                              <Grid md={10}>
                                                {" "}
                                                <TextField
                                                  className="input_fields"
                                                  style={{
                                                    border: "0px important",
                                                  }}
                                                  value={name.username}
                                                />{" "}
                                              </Grid>
                                            </Grid>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </span>
                                    </div>
                                  );
                                }
                              })}
                              {state?.roles?.users?.map((name, index) => {
                                return (
                                  <>
                                    <div key={index}>
                                      <span>
                                        {name.id === item.role_id ? (
                                          <>
                                            <Grid container spacing={2}>
                                              <Grid
                                                md={2}
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                {" "}
                                                <FormLabel
                                                  className="brk_label"
                                                  htmlFor="my-input"
                                                >
                                                  Role
                                                </FormLabel>
                                              </Grid>

                                              <Grid md={10}>
                                                {" "}
                                                <TextField
                                                  className="input_fields"
                                                  style={{
                                                    border: "0px important",
                                                  }}
                                                  value={name.name}
                                                />
                                              </Grid>
                                            </Grid>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </span>
                                    </div>
                                  </>
                                );
                              })}

                              <Grid container spacing={2}>
                                <Grid
                                  md={2}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {" "}
                                  <FormLabel
                                    className="brk_label"
                                    htmlFor="my-input"
                                  >
                                    Service
                                  </FormLabel>
                                </Grid>

                                <Grid md={10}>
                                  {" "}
                                  <TextField
                                    className="input_fields"
                                    style={{ border: "0px important" }}
                                    value={item.service_type}
                                  />
                                </Grid>
                              </Grid>

                              <Grid container spacing={2}>
                                <Grid
                                  md={2}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {" "}
                                  <FormLabel
                                    className="brk_label"
                                    htmlFor="my-input"
                                  >
                                    Extension Limit
                                  </FormLabel>
                                </Grid>

                                <Grid md={10}>
                                  {" "}
                                  <TextField
                                    className="input_fields"
                                    style={{ border: "0px important" }}
                                    value={item.extensions_limit}
                                  />
                                </Grid>
                              </Grid>

                              <Grid container spacing={2}>
                                <Grid
                                  md={2}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {" "}
                                  <FormLabel
                                    className="brk_label"
                                    htmlFor="my-input"
                                  >
                                    Date
                                  </FormLabel>
                                </Grid>
                                <Grid md={10}>
                                  {" "}
                                  <TextField
                                    className="input_fields"
                                    style={{
                                      border: "0px important",
                                      paddingBottom: "0px !important",
                                    }}
                                    value={formattedDate}
                                  />
                                </Grid>
                              </Grid>
                            </FormControl>
                          </>
                        );
                      })}
                    </Card>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid md={12} xs={12}>
                    <Card
                      className="pdf_div_box"
                      style={{ margin: "8px", marginTop: "17px" }}
                    >
                      <div>
                        <Nav
                        style={{display:'flex',justifyContent:'center',margin:'20px 0'}}
                          variant="pills"
                          activeKey={activeKey}
                          onSelect={(selectedKey) => setActiveKey(selectedKey)}
                        >
                          <Nav.Item>
                            <Nav.Link className="profile_tabs" eventKey="/home">Images</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className="profile_tabs" eventKey="link-1">Pdf</Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <div style={{ marginTop: "20px" }}>
                          {renderContent()}
                        </div>
                      </div>

                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                        style={{ flexWrap: "wrap", textAlign: "left" }}
                      >
                        <div className="upload-btn-user mb-3 mt-2">
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
                                borderRadius={"10px"}
                                textAlign={"center"}
                              >
                                <IconButton
                                  onClick={handleClose}
                                  sx={{ float: "inline-end" }}
                                >
                                  <Close className="profile_modal_clss_btn" />
                                </IconButton>
                                <br />
                                <br />
                                <img
                                  src="/img/import-icon.png"
                                  alt="import"
                                  style={{ borderRadius: "30px" }}
                                />
                                <Typography
                                  id="transition-modal-title"
                                  variant="h6"
                                  component="h2"
                                  color={"#092b5f"}
                                  fontSize={"18px"}
                                  fontWeight={"600"}
                                >
                                  Upload Documents
                                </Typography>
                                <Typography
                                  id="transition-modal-description"
                                  sx={{ mt: 2 }}
                                  fontSize={"16px"}
                                  color={"#000"}
                                  paddingBottom={"10px"}
                                ></Typography>

                                <form>
                                  {/* <SelectComponent handleClose={handleClose} /> */}
                                  <Typography variant="body1">
                                    <form
                                      style={{
                                        textAlign: "center",
                                        height: "300px",
                                        overflow: "auto",
                                        paddingTop: "10px",
                                        padding: "5px",
                                      }}
                                    >
                                      <br />
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="file"
                                          name="files"
                                          id="file-upload"
                                          onChange={handleSelectedFiles}
                                          style={{ display: "none" }}
                                          multiple // Add this attribute for multiple file selection
                                        />
                                        <label htmlFor="file-upload">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                            style={{ fontSize: "13px" }}
                                            endIcon={<GetAppIcon />}
                                          >
                                            Upload Documents
                                          </Button>
                                        </label>

                                        <div
                                          style={{
                                            marginTop: "10px",
                                            textAlign: "center",
                                          }}
                                        >
                                          {selectedFiles.length > 0 && (
                                            <ul style={{ padding: 0 }}>
                                              {Array.from(selectedFiles).map(
                                                (file, index) => (
                                                  <li
                                                    key={index}
                                                    style={{
                                                      listStyle: "none",
                                                    }}
                                                  >
                                                    {file.name}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      </div>
                                      <br></br>
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
                                          textTransform:
                                            "capitalize !important",
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
                                          textTransform:
                                            "capitalize !important",
                                        }}
                                        onClick={handleSubmit}
                                      >
                                        save
                                      </Button>
                                    </form>
                                  </Typography>
                                </form>
                              </Box>
                            </Fade>
                          </Modal>
                        </div>

                        <div>
                          {/* Display selected PDF */}
                          {selectedPDF && (
                            <div style={{ position: "relative" }}>
                              <embed
                                src={selectedPDF}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              />
                              <button
                                onClick={handleClosePDF}
                                style={{
                                  position: "absolute",
                                  top: "-31px",
                                  right: "10px",
                                  background: "#f1f1f1",
                                  border: "none",
                                  cursor: "pointer",
                                  borderRadius: "25px",
                                  padding: "3px",
                                  width: "30px",
                                  height: "28px",
                                }}
                              >
                                X
                              </button>
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <IconButton
                            className="all_button_clr"
                            // onClick={handleOpen}
                          >
                            Verify
                          </IconButton>
                        </div>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ResellerView;
