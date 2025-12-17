import React from "react";
import { Typography, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const HeaderSection = React.memo(({ user, stateReducer, setField, resetForm }) => {
  const handleClick = () => {
    window.open("/file/upload_destination_number.csv", "_blank");
  };

  const handleOpen = () => setField('open', true);
  const handleOpenImport = () => setField('openimport', true);

  return (
    <div className="cntnt_title" style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
      <div>
        <h3>Destination</h3>
      </div>
      <div style={{ display: "flex", alignItems: "center", position: "relative", top: "0" }}>
        {user.user_role !== "Reseller" && (
          <>
            <Typography onClick={handleClick} className="hover-content" style={{ cursor: "pointer" }}>
              <IconButton><FileDownloadIcon /></IconButton>
            </Typography>
            <div className="n-ppost" style={{ paddingRight: "20px" }}>Sample</div>
            <img className="n-ppost-name" src="https://i.ibb.co/rMkhnrd/sample2.png" alt="Sample" />
            <div>
              <IconButton className="all_button_clr" onClick={handleOpenImport}>
                Import <ImportExportIcon />
              </IconButton>
            </div>
            <div>
              <IconButton className="all_button_clr" onClick={handleOpen}>
                Add <AddOutlinedIcon />
              </IconButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default HeaderSection;