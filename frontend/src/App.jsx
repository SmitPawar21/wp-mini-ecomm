import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import IntroPage from "./pages/IntroPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import ProductDetail from "./pages/ProductDetail";

// Color palette - #040D12 #183D3D #5C8374 #93B1A6 #ffffff #A27B5C

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function ProductDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return <ProductDetail productId={id} onBack={() => navigate(-1)} />;
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={<ProtectedRoute> <HomePage /> </ProtectedRoute>}
        />
        <Route
          path="/cart"
          element={<ProtectedRoute> <CartPage /> </ProtectedRoute>}
        />
        <Route
          path="/my-orders"
          element={<ProtectedRoute> <MyOrdersPage /> </ProtectedRoute>}
        />
        <Route
          path="/product/:id"
          element={<ProtectedRoute> <ProductDetailWrapper /> </ProtectedRoute>}
        />
      </Routes>
    </Router>
  )
}

export default App
