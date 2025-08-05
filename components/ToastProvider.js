'use client';

import { SnackbarProvider } from 'notistack';

export default function ToastProvider({ children }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
