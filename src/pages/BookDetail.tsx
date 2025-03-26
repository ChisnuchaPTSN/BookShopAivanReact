import { Link, useParams } from 'react-router';
import { ShoppingBasket } from 'lucide-react';
import { useBooks } from '../services/BookService';
import BookView from '../components/book/BookView';
import Book from '../types/Book';

function BookDetail() {

    const { id } = useParams<{ id: string }>();
    const bookId = id ? Number(id) : null;

    const { books, loading, error } = useBooks();

    const book = books.find((book) => book.bookid === bookId);



    if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
    if (error) return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
    if (!book) return <div className="container mx-auto px-4 py-8">Book not found</div>;


    return (
        <div className='container mx-auto px-4 py-0'>


            <div className="flex flex-col md:flex-row p-4 m-4 w-full">
                
                <div className="w-full md:p-6">
                    <div className="flex justify-end items-end">

                       
                            <Link to="/book" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
                                <span className="inline-block mr-1">&#9664;</span> กลับหน้ารายการหนังสือ
                            </Link>
                        
                    </div>

                    {BookView(book as Book)}

                    <div className="flex flex-col md:flex-row justify-end mt-4">
                        
                        <div className="text-right mt-8">

                            <button
                                className="w-full font-semibold flex items-center justify-center gap-2 bg-blue-500 hover:text-red-600 hover:bg-sky-300 text-white py-2 px-4 rounded"
                            >
                                <ShoppingBasket size={20} />
                                เพิ่มลงตะกร้า
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default BookDetail