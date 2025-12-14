import React, { useState } from "react"; // comment: react
import { Box, Button, Divider, Stack } from "@mui/material"; // comment: MUI
import UserForm from "../components/UserForm"; // comment: import form component
import UsersTable from "../components/UsersTable"; // comment: import table component

const Forms: React.FC = () => { // comment: forms page
  const [refreshFlag, setRefreshFlag] = useState<number>(0); // comment: trigger refresh by key change

  const handleSaved = (): void => { // comment: called after save
    setRefreshFlag((x) => x + 1); // comment: update flag
  }; // comment: end handler

  return ( // comment: render
    <Box sx={{ p: 2 }}> {/* comment: wrapper */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}> {/* comment: top buttons */}
        <Button variant="contained" href="#form">Go to Form</Button> {/* comment: jump to form */}
        <Button variant="outlined" href="#table">Go to Table</Button> {/* comment: jump to table */}
      </Stack>

      <Box id="form"> {/* comment: anchor for form */}
        <UserForm onSaved={handleSaved} /> {/* comment: show form */}
      </Box>

      <Divider sx={{ my: 3 }} /> {/* comment: separator */}

      <Box id="table"> {/* comment: anchor for table */}
        {/* key forces re-mount to re-load data after save */}
        <UsersTable key={refreshFlag} /> {/* comment: show table */}
      </Box>
    </Box> // comment: end wrapper
  ); // comment: end return
}; // comment: end component

export default Forms; // comment: export
