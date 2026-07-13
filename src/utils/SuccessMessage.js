import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage({message}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="success">
        {message}
      </Alert>
    </Stack>
  );
}