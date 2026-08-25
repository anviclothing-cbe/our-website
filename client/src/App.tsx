import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";

// Providers
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

// Layout
import { GlobalLayout } from "@/components/layout/GlobalLayout";
import { LeadPopup } from "@/components/shared/LeadPopup";

import { AccountLayout } from "@/components/account/AccountLayout";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";

// Public Pages
const Home = lazy(() => import("@/pages/Home"));
const Collection = lazy(() => import("@/pages/Collection"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"));
const StorePage = lazy(() => import("@/pages/StorePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostDetail = lazy(() => import("@/pages/BlogPostDetail"));

// Help Pages
const HelpCenterPage = lazy(() => import("@/pages/help/HelpCenterPage"));
const ShippingPage = lazy(() => import("@/pages/help/ShippingPage"));
const ReturnsPage = lazy(() => import("@/pages/help/ReturnsPage"));
const SizeGuidePage = lazy(() => import("@/pages/help/SizeGuidePage"));
const PaymentsPage = lazy(() => import("@/pages/help/PaymentsPage"));
const PrivacyPage = lazy(() => import("@/pages/help/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/help/TermsPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Auth Pages
const Login = lazy(() => import("@/pages/account/Login"));
const Register = lazy(() => import("@/pages/account/Register"));
const ForgotPassword = lazy(() => import("@/pages/account/ForgotPassword"));

// Admin Page
const AdminPage = lazy(() => import("@/pages/AdminPage"));

// Protected Account Pages
const Dashboard = lazy(() => import("@/pages/account/Dashboard"));
const Orders = lazy(() => import("@/pages/account/Orders"));
const OrderDetail = lazy(() => import("@/pages/account/OrderDetail"));
const Wishlist = lazy(() => import("@/pages/account/Wishlist"));
const Addresses = lazy(() => import("@/pages/account/Addresses"));
const Profile = lazy(() => import("@/pages/account/Profile"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AccountRoutes = () => {
  return (
    <AccountLayout>
      <Switch>
        <Route path="/account" component={Dashboard} />
        <Route path="/account/orders" component={Orders} />
        <Route path="/account/orders/:id" component={OrderDetail} />
        <Route path="/account/wishlist" component={Wishlist} />
        <Route path="/account/addresses" component={Addresses} />
        <Route path="/account/profile" component={Profile} />
      </Switch>
    </AccountLayout>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <PersonalizationProvider>
          <CurrencyProvider>
            <AuthProvider>
              <WishlistProvider>
                <CartProvider>
                  <Switch>
                    {/* Standalone Layouts */}
                    <Route path="/checkout">
                      <Suspense fallback={<PageSkeleton />}>
                        <CheckoutLayout>
                          <CheckoutPage />
                        </CheckoutLayout>
                      </Suspense>
                    </Route>
                    <Route path="/admin" nest>
                      <Suspense fallback={<PageSkeleton />}>
                        <AdminPage />
                      </Suspense>
                    </Route>

                    {/* Everything else gets the GlobalLayout (Header + Footer) */}
                    <Route>
                      <GlobalLayout>
                        <LeadPopup />
                        <Suspense fallback={<PageSkeleton />}>
                          <Switch>
                            {/* Public Shopping Routes */}
                            <Route path="/" component={Home} />
                            <Route path="/product/:slug" component={ProductDetail} />
                            <Route path="/category/:id" component={Collection} />
                            <Route path="/collections" component={Collection} />
                            <Route path="/collections/:id" component={Collection} />
                            <Route path="/discover/:id" component={Collection} />
                            <Route path="/search" component={Collection} />
                            <Route path="/cart" component={CartPage} />
                            <Route path="/order-confirmation/:id" component={OrderConfirmation} />
                            <Route path="/design-system" component={DesignSystem} />
                            <Route path="/visit-store" component={StorePage} />
                            <Route path="/our-story" component={AboutPage} />
                            <Route path="/contact" component={ContactPage} />
                            <Route path="/journal" component={BlogPage} />
                            <Route path="/journal/:slug" component={BlogPostDetail} />
                            
                            {/* Help Routes */}
                            <Route path="/help" component={HelpCenterPage} />
                            <Route path="/help/shipping" component={ShippingPage} />
                            <Route path="/help/returns" component={ReturnsPage} />
                            <Route path="/help/size-guide" component={SizeGuidePage} />
                            <Route path="/help/payments" component={PaymentsPage} />
                            <Route path="/privacy" component={PrivacyPage} />
                            <Route path="/terms" component={TermsPage} />
                            
                            {/* Auth Routes */}
                            <Route path="/account/login" component={Login} />
                            <Route path="/account/register" component={Register} />
                            <Route path="/account/forgot-password" component={ForgotPassword} />
                            
                            {/* Protected Account Routes */}
                            <Route path="/account/*" component={AccountRoutes} />
                            <Route path="/account" component={AccountRoutes} />
                            
                            {/* 404 Catch All */}
                            <Route component={NotFound} />
                          </Switch>
                        </Suspense>
                      </GlobalLayout>
                    </Route>
                  </Switch>
                </CartProvider>
              </WishlistProvider>
            </AuthProvider>
          </CurrencyProvider>
        </PersonalizationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
