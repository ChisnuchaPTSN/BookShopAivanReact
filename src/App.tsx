import { Route, Routes, BrowserRouter } from 'react-router';
import MainLayout from './layouts/MainLayout';
import BookPage from './pages/Book';
import Home from './pages/Home';
import About from './pages/About';
import New from './pages/New';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import ManageOrder from './pages/admin/ManageOrder';
import BookDetail from './pages/BookDetail';
import ManageBook from './pages/admin/ManageBook';
import AddBook from './pages/admin/AddBook';
import EditBook from './pages/admin/EditBook';
import { CartProvider } from './context/CartContext';


export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Frontend Page */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/new" element={<New />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Admin Page */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/order" element={<ManageOrder />} />
            <Route path="/admin/addbook" element={<AddBook />} />
            <Route path="/admin/editbook/:bookid" element={<EditBook />} />
            <Route path="/admin/book" element={<ManageBook />} />
          </Route>

          {/* Auth Page */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<div className="flex m-20 justify-center">
            <h1 className="text-6xl text-red-500">404 Not Found</h1>
          </div>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
