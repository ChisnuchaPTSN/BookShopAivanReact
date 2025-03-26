import { Link } from "react-router";
import { House, LibraryBig, Book, Store } from "lucide-react";
import { useState } from "react";
import Cart from "./cart/Cart";
import CartButton from "./cart/CartButton";

function Header() {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <header className="bg-black text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex-shrink-0  cursor-pointer flex items-center">
            <span className="text-cyan-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#4FDAF6"
              >
                <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
              </svg>
            </span>
            {/* ถ้าหน้าจอเล็กกว่า (md) ไม่แสดงชื่อร้าน */}
            <span className="text-xl md:text-2xl font-semibold text-cyan-300 ml-2 hidden md:block">
              ComSci Book Shop
            </span>
          </div>
          {/* หน้าจอขนาดใหญ่ (sm) ขึ้นไป ให้แสดงเมนูเป็นข้อความ */}
          <nav className="font-semibold hidden sm:flex text-lg">
            <ul className="flex space-x-4 items-center">
              <li className="mr-6 p-1">
                <Link to="/" className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <House size={24} className="hidden lg:block" />
                    <span>หน้าแรก</span>
                  </div>
                </Link>
              </li>
              <li className="mr-6 p-1">
                <Link to="/book" className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <LibraryBig size={24} className="hidden lg:block" />
                    <span>หนังสือ</span>
                  </div>
                </Link>
              </li>
              <li className="mr-6 p-1">
                <Link to="/new" className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <Book size={24} className="hidden lg:block" />
                    <span>หนังสือใหม่</span>
                  </div>
                </Link>
              </li>
              <li className="mr-6 p-1">
                <Link to="/about" className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <Store size={24} className="hidden lg:block" />
                    <span>ข้อมูลร้านหนังสือ</span>
                  </div>
                </Link>
              </li>
              <li>
                <CartButton setShowCart={() => setShowCart(!showCart)} />
              </li>
            </ul>
          </nav>
          {/* ถ้าหน้าจอเล็กมาก (sm) ให้แสดงเมนูเป็น icon เมนู (hamburger menu) */}
          <div className="mr-6 sm:hidden">
            <span className="text-cyan-300 focus:outline-none text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </span>
          </div>
        </div>
      </header>
      {/* Cart */}
      {showCart ? <Cart setShowCart={setShowCart} /> : null}
      {/* End: Cart */}
    </>
  );
}

export default Header;
