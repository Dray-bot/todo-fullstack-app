import './globals.css';
import ToastProvider from '../components/ToastProvider';


export const metadata = {
  title: 'To-Do App',
  description: 'Built by Dray',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
