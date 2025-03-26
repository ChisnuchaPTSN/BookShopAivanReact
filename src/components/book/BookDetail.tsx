import { ShoppingBasket } from 'lucide-react';
import Book from '../../types/Book';
import { Link } from 'react-router';
import { useCart } from '../../context/CartContext';

interface BookDetailProps {
  book: Book;
}


function BookDetail({ book }: BookDetailProps) {

  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 m-2 shadow-md hover:shadow-xl transition-shadow w-64 flex flex-col">
      <Link to={`/book/${book.bookid}`}>
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="w-full h-80 object-cover rounded-t-lg mb-4"
        />
      </Link>
      <h2 className="font-semibold mb-2">{book.title.length > 25 ? `${book.title.substring(0, 25)}...` : book.title}</h2>

      <p className="text-gray-700 mb-1">โดย {book.author.length > 15 ? `${book.author.substring(0, 15)}...` : book.author}</p>

      <div className="flex justify-between items-center mt-auto">

        <span className="text-blue-600 font-medium">฿{book.price.toFixed(2)}</span>

        <span className="text-gray-500 text-sm">{book.pageCount} หน้า</span>
      </div>

      <button
        onClick={() => addToCart(book)}
        className="w-full font-semibold flex items-center justify-center gap-2 bg-blue-500 hover:text-red-600 hover:bg-sky-300 text-white rounded-md py-3 mt-4"
      >
        <ShoppingBasket size={20} />
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}




export default BookDetail;