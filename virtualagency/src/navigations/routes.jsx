import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "../container/layout/pageLayout";
import { labelRoutes } from "./labelRoutes";
import PageNotFound from "../container/pageNotFound/pageNotFound";

const UserRoute = () => {
  const verifiedUser = useSelector((state) => state.userDetails.user);
  //return verifiedUser?.UserName ? <Outlet /> : <Navigate to={labelRoutes.dashboard} replace />;
  return <Navigate to={labelRoutes.home} replace />; 
};

const LoginPage = lazy(() => import("../container/login/login"));
const Dashboard = lazy(() => import("../container/dashboard/dashboard"));
const EqDashboard = lazy(() => import("../container/eqDashboard/eqDashboard"));


function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* Login */}
        <Route path={labelRoutes.home} element={<LoginPage />} />

        {/* Layout Pages */}
        <Route element={<PageLayout />}>
          <Route path={labelRoutes.dashboard} element={<Dashboard />} />
          <Route path={labelRoutes.eqDashboard} element={<EqDashboard />} />
        </Route>

        {/* Page Not Found */}
        <Route path= {labelRoutes.PageNotFound} element={<PageNotFound />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={labelRoutes.home} replace />} />

      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
