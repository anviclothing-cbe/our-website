import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getAdminToken, clearAdminToken } from "@/lib/adminApi";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import DashboardTab from "./admin/DashboardTab";
import ProductsTab from "./admin/ProductsTab";
import CategoriesTab from "./admin/CategoriesTab";
import OrdersTab from "./admin/OrdersTab";
import LeadsTab from "./admin/LeadsTab";
import CmsTab from "./admin/CmsTab";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = getAdminToken();
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />;
      case "products": return <ProductsTab />;
      case "categories": return <CategoriesTab />;
      case "orders": return <OrdersTab />;
      case "leads": return <LeadsTab />;
      case "cms": return <CmsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <AdminLayout active={activeTab} setActive={setActiveTab} onLogout={handleLogout}>
      {renderTab()}
    </AdminLayout>
  );
}
