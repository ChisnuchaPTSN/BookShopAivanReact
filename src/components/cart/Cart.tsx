import { CircleX, CopyX, CircleDollarSign } from "lucide-react";
import CartItem from "../../types/CartItem";
import CartDetail from "./CartDetail";
import { useCart } from "../../context/CartContext";

function Cart({ setShowCart }: { setShowCart: (show: boolean) => void }) {

  const { state, clearCart } = useCart();
  const { items, total } = state;

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
      <div className="bg-white p-4 rounded-lg w-full mx-auto flex flex-col items-center max-h-screen md:w-200 lg:w-300 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-8 ">
          รายการหนังสือในตระกร้า
        </h1>
        <div className="w-full  flex flex-wrap justify-center items-start">
          <div className="mt-4  w-full md:w-250">
            {items.length === 0
              ? EmptyCart()
              : BooksInCart(items, total, clearCart)}
          </div>
        </div>

        <button
          onClick={() => {
            setShowCart(false);
          }}
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mb-2 rounded-lg gap-1 mt-3 flex flex-row justify-center"
        >
          <CircleX /> <span>ปิดหน้าต่าง</span>
        </button>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center text-center justify-center">
      <img
        src="/images/emptycart.png"
        width={200}
        alt="Empty Cart"
        className="mx-auto mb-4"
      />
      <p className="text-red-500 text-2xl font-semibold">ไม่มีสินค้าในตะกร้า</p>
    </div>
  );
}

function BooksInCart(items: CartItem[], total: number, clearCart: () => void) {
  return (
    <>
      <div className="flex flex-col">
        <div>
          {items.map((item) => (
            <CartDetail key={item.bookid} cartItem={item} />
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">
              รวมทั้งหมด: {new Intl.NumberFormat("en-US").format(total)} บาท
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2 my-4">
          <button className="gap-2 flex flex-row bg-sky-500 font-semibold text-white px-4 py-2 rounded hover:bg-sky-600 transition">
            <CircleDollarSign />
            <span>ดำเนินการชำระเงิน</span>
          </button>
          <button
            onClick={clearCart}
            className="gap-2 flex flex-row bg-orange-500 font-semibold text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            <CopyX />
            <span>ล้างตะกร้าลินค้า</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
