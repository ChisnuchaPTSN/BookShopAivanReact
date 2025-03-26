import { Plus, Minus, Trash2 } from "lucide-react";
import CartItem from "../../types/CartItem";
import { useCart } from "../../context/CartContext";


type CartDetailProps = {
  cartItem: CartItem;
}

function CartDetail({
  cartItem,
}: CartDetailProps) {

  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex  justify-between items-start gap-4 py-2 border-b" >
      <div className="flex-col items-end gap-2 hidden md:flex">
        <img
          src={cartItem.thumbnailUrl}
          alt={cartItem.title}
          className="h-20 object-cover rounded-t-lg mb-4 "
        />
      </div>
      <div className="flex-1">
        <p className="text-lg font-bold">{cartItem.title}</p>
        <p className="text-md text-gray-600">
          ราคาต่อเล่ม: {new Intl.NumberFormat('en-US').format(cartItem.price)} บาท
        </p>

      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 ms-6 border-orange-600 bg-white border-2 text-orange-600 rounded-lg  flex items-center justify-center "
              onClick={() => updateQuantity(cartItem.bookid, cartItem.quantity-1)}
            >
              <Minus size={20} />
            </button>

            <span className="w-8 text-center">{cartItem.quantity}</span>

            <button
              className="w-8 h-8  border-green-600 bg-white border-2 text-green-600 rounded-lg  flex items-center justify-center "
              onClick={() => updateQuantity(cartItem.bookid, cartItem.quantity+1)}
            >
              <Plus size={20} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(cartItem.bookid)}
            className="w-8 h-8 bg-red-500 text-white rounded-lg  flex items-center justify-center "
            title="ลบสินค้า"
          >
            <Trash2 size={20} />
          </button>
        </div>
        <p className="text-sm font-bold">
          {new Intl.NumberFormat('en-US').format(cartItem.price * cartItem.quantity)} บาท
        </p>
      </div>
    </div>
  );
}

export default CartDetail;
