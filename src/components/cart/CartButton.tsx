import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CartButton({ setShowCart }: { setShowCart: (show: boolean) => void }) {

  const { state } = useCart();
  const { items } = state;

  return (
    <button
      onClick={(showCart) => setShowCart(!showCart)}
      className="px-4 py-2 cursor-pointer  hover:text-black text-white  rounded-md transition-colors duration-200 relative"
    >
      <ShoppingCart size={27} color="#38bdf8" strokeWidth={2} />
      <span className="absolute -top-1 -right-1 bg-sky-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {items.length}
      </span>
    </button>
  );
}

export default CartButton;
