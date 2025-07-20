import { useState } from 'react';
import {
  Container, Box, Tabs, Tab, TextField, Button, Typography, Paper
} from '@mui/material';

export default function LoginPage() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userType = tab === 0 ? "vendor" : "client";
    console.log(`Logging in as ${userType}`);
    // TODO: call /api/vendor/login or /api/client/login based on `userType`
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Vendor" />
          <Tab label="Client" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            {tab === 0 ? "Login as Vendor" : "Login as Client"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
