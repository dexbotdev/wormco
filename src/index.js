import React from 'react';
import * as ReactDOM from "react-dom/client";
 
import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';  

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

// 4️⃣ RouterProvider added
export default function AppX() {
  return <RouterProvider router={router} />;
}

function Root() { 
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <AppX />
    </MantineProvider>
  </React.StrictMode>
);
 
