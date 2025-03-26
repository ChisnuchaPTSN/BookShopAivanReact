import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import CartItem from "../types/CartItem";
import Book from "../types/Book";


// กำหนด interface สำหรับสถานะของตระกร้า
interface CartState {
    items: CartItem[];  // รายการสินค้าในตระกร้า
    total: number;      // ราคารวมทั้งหมด
}

// กำหนดค่าเริ่มต้นของตระกร้า
const initialState: CartState = {
    items: [],  // เริ่มต้นด้วยตระกร้าว่าง
    total: 0    // ราคารวมเป็น 0
}

// -- สร้าง Reducer
// กำหนด action types ที่สามารถทำกับตระกร้าได้
type CartAction =
    | { type: 'ADD_TO_CART'; payload: Book }  // เพิ่มสินค้าในตระกร้า
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'CLEAR_CART' } // ลบสินค้าทั้งหมด
    | { type: 'UPDATE_QUANTITY'; payload: { bookid: number; quantity: number } } // อัพเดทจำนวนสินค้าในตะกร้า


// กำหนด cartReducer
// สร้าง reducer function เพื่อจัดการการเปลี่ยนแปลงของ state
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {

        // เพิ่มหนังสือในตะกร้า
        case 'ADD_TO_CART': {
            // ค้นหาว่าสินค้านี้มีในตะกร้าอยู่แล้วหรือไม่
            const existingItemIndex = state.items.findIndex(
                item => item.bookid === action.payload.bookid
            );

            let updatedItems: CartItem[];

            if (existingItemIndex >= 0) {
                // ถ้ามีอยู่แล้ว เพิ่มจำนวน
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
            } else {
                // ถ้ายังไม่มี เพิ่มรายการใหม่ด้วยจำนวน 1
                updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            // คำนวณราคารวมใหม่
            const total = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return {
                items: updatedItems,
                total
            };
        }

        // ส่วนของ action type อื่นๆ...
        case 'REMOVE_FROM_CART': {
            // กรองเอาสินค้าที่ต้องการลบออก
            const updatedItems = state.items.filter(
                item => item.bookid !== action.payload
            );

            // คำนวณราคารวมใหม่
            const total = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return {
                items: updatedItems,
                total
            };
        }

        case 'CLEAR_CART':
            return initialState;  // กลับไปที่สถานะเริ่มต้น (ตระกร้าว่าง)

        case 'UPDATE_QUANTITY': {
            const { bookid, quantity } = action.payload;

            // ถ้าจำนวนสินค้า < 0 ให้ลบสินค้านั้นออกจากตะกร้า
            if (quantity < 1) {
            const updatedItems = state.items.filter(item => item.bookid !== bookid);

            // คำนวณราคารวมใหม่
            const total = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return {
                items: updatedItems,
                total
            };
            }

            // อัปเดตจำนวนสินค้าในตะกร้า
            const updatedItems = state.items.map(item =>
            item.bookid === bookid ? { ...item, quantity } : item
            );

            // คำนวณราคารวมใหม่
            const total = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
            );

            return {
            items: updatedItems,
            total
            };
        }

        default:
            return state;  // กรณีไม่มี action ที่ตรงกัน ให้คืนค่า state เดิม

    }
};

// สร้าง context
interface CartContextType {
    state: CartState; //แก้ไขเป็น state ในภายหลัง
    addToCart: (book: Book) => void;           // function เพิ่มสินค้า
    removeFromCart: (bookid: number) => void;     // function ลบสินค้า
    clearCart: () => void;                     // function ลบสินค้าทั้งหมด
    updateQuantity: (bookid: number, quantity: number) => void; // function อัพเดทจำนวนสินค้าในตะกร้า
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// กำหนด props สำหรับ Provider
interface CartProviderProps {
    children: ReactNode;
}

// สร้าง Provider component
export function CartProvider({ children }: CartProviderProps) {
    const loadInitialState = (): CartState => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return initialState;
    };

    const [state, dispatch] = useReducer(cartReducer, loadInitialState());

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (book: Book) => {
        dispatch({ type: 'ADD_TO_CART', payload: book });
    };

    const removeFromCart = (bookid: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: bookid });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const updateQuantity = (bookid: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { bookid, quantity } });
    };

    // ส่งค่าและ function ผ่าน Provider
    return (
        <CartContext.Provider
            value={{
                state,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// สร้าง custom hook เพื่อใช้งาน context ได้ง่าย
export const useCart = () => {
    const context = useContext(CartContext);

    // ตรวจสอบว่ามีการใช้ hook นอก Provider หรือไม่
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};