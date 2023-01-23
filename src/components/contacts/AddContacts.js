import * as React from 'react';

import { Button, CardMedia } from '@mui/material';
import NewContactForm from './NewContactForm';

export default function AddContacts({ contactsList, setContactsList, requestSent, setRequestSent }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ margin: "0 5%" }}
      >
        Add New Contact
      </Button>
      <CardMedia
        component="img"
        height="200px"
        sx={{
          height: '200px',
          width: '200px',
          borderRadius: '50%',
        }}
        image="https://cdn-icons-png.flaticon.com/512/6570/6570292.png"
        alt="add new contact" />

      <NewContactForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        contactsList={contactsList}
        setContactsList={setContactsList}
        requestSent={requestSent}
        setRequestSent={setRequestSent}
      />
    </div>
  );
}