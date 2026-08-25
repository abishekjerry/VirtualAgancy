import { useEffect } from 'react';
import './App.css'
import AppRoutes from './navigations/routes';
import {disableBrowserActions } from './utils/commonFunction/common'
function App() {
  useEffect(() => {
      return disableBrowserActions();
  }, []);

  return (
    <AppRoutes />
  );
}
export default App;