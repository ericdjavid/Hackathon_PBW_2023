import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import PaymentButton from './payment_button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalBox(props: any) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("")

  let submitForm = async (e:any) => {
    // setLoading(true);
  //   e.preventDefault();
  //   let res = await fetch("/api/postReviews", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: title,
  //       description: content,
  //       validated: false,
  //     }),
  //   });
  //   res = await res.json();
  //   if (res.status === 200) setMsg(true);
  //   setTitle("");
  //   setContent("");
  //   setLoading(false);
  console.log(email)
  if (email != "")
    setSubmitted(true)
  };

  return (
    <div>
      <Button className='text-center' onClick={handleOpen}>Pay with crypto (XRP)</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Order 
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            Please put your email so we can send the order update.
            <br/>
            You can either do it on the testet for test purpose or in the mainnet for real order
          </Typography>
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder='email'
              // defaultValue="Hello World"
            />
            {
               submitted ? ( 
              <PaymentButton amount={props?.amount} email={email}/>) : 

        <button className="bg-pink-500 hover:bg-pink-700 w-1/2 text-white font-bold py-2 px-4 rounded"
              onClick={submitForm}
              type='submit'
              >Submit</button>
            }
        </Box>
      </Modal>
    </div>
  )
}
