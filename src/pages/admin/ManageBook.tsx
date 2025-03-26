import Book from "../../types/Book";
import { useBooks } from "../../services/BookService";
import { ZoomIn, Pencil, Trash2, CircleX, PlusCircle, } from "lucide-react";
import { useState } from "react";
import BookView from "../../components/book/BookView";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageBook = () => {
    // 📌 1) เรียกใช้ custom hook useBooks เพื่อดึงข้อมูลและฟังก์ชันที่เกี่ยวข้องกับการจัดการหนังสือ
    const { books, loading, error, deleteBook } = useBooks();

    // 📌 2) สร้าง state สำหรับการจัดการการแสดงรายละเอียดหนังสือ
    const [isView, setIsView] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    // 2. เพิ่มฟังก์ชันสำหรับจัดการการลบหนังสือ
const handleDeleteBook = (bookId: number, bookTitle: string) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการลบหนังสือ "${bookTitle}" หรือไม่`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // เรียกใช้ฟังก์ชันลบหนังสือ
        const response = await deleteBook(bookId);
        
        if (response && response.success) {
          Swal.fire(
            'ลบแล้ว!',
            `หนังสือ "${bookTitle}" ถูกลบเรียบร้อยแล้ว`,
            'success'
          );
        } else {
          Swal.fire(
            'เกิดข้อผิดพลาด!',
            response ? response.message : 'ไม่สามารถลบหนังสือได้',
            'error'
          );
        }
      }
    });
  };
  


    // 📌 3) สร้างฟังก์ชันสำหรับการแสดงรายละเอียดหนังสือ
    const handleViewDetail = (book: Book) => {
        setSelectedBook(book);
        setIsView(true);
    };

    // 📌 4) สร้างเงื่อนไขสำหรับการแสดงข้อผิดพลาด

    if (error) {
        //Code
        return (
            <div className="flex justify-center items-center flex-col  m-10 h-[80vh]">
                <h1 className="text-2xl text-red-500 font-semibold">พบข้อผิดพลาด</h1>
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }



    // 📌 5) สร้างเงื่อนไขสำหรับการแสดงสถานะ loading

    else if (loading) {
        //Code
        return (
            <div className="flex flex-row justify-center items-center container mx-auto px-4 py-8 font-semibold text-2xl text-blue-500 h-[80vh]">
                <svg
                    aria-hidden="true"
                    className="w-15 h-15 me-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span>กำลังโหลดข้อมูลรายการหนังสือ...</span>
            </div>
        );
    }
    // 📌 6) สร้างเงื่อนไขสำหรับกรณีที่ไม่มีข้อมูลหนังสือ
    else if (!books) {
        //Code
        return (
            <div className="flex justify-center container mx-auto px-4 py-8 font-semibold text-2xl text-red-500 h-[80vh]">
                ไม่มีข้อมูลรายการหนังสือ
            </div>
        );
    }

    // 📌 กรณีที่มีข้อมูลหนังสือ ให้แสดงรายการหนังสือ
    else {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        จัดการข้อมูลหนังสือ
                    </h1>

                    {/* 📌 7) สร้างลิงก์ไปยังหน้าเพิ่มหนังสือใหม่ */}
                    <Link
                        to="/admin/addbook"
                        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1 font-medium"
                    >
                        <PlusCircle size={20} />
                        <span>เพิ่มหนังสือใหม่</span>
                    </Link>

                </div>

                {/* Table for medium screens and above */}
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                        <thead className="text-md font-semibold bg-gray-50">
                            <tr>
                                <th className="px-4 py-3  text-center text-gray-500 uppercase tracking-wider">
                                    รหัสหนังสือ
                                </th>
                                <th className="px-4 py-3  text-center  text-gray-500 uppercase tracking-wider">
                                    ภาพปก
                                </th>
                                <th className="px-4 py-3 text-left  text-gray-500 uppercase tracking-wider">
                                    ชื่อหนังสือ
                                </th>
                                <th className="px-4 py-3  text-center  text-gray-500 uppercase tracking-wider">
                                    ราคา
                                </th>
                                <th className="px-4 py-3  text-left  text-gray-500 uppercase tracking-wider">
                                    วันที่ตีพิมพ์
                                </th>
                                <th className="px-4 py-3 text-left  text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">

                            {/* 📌 8) สร้าง loop เพื่อแสดงรายการหนังสือ */}

                            {books.map((book: Book) => (
                                <tr key={book.bookid} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900  text-center">
                                        {book.bookid}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <img
                                            src={book.thumbnailUrl}
                                            alt={book.title}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-4 whitespace-wrap text-sm text-gray-900">
                                        {book.title}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900  text-center">
                                        {book.price}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900  text-left">
                                        {new Date(book.publishedDate).toLocaleDateString("th-TH", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="flex flex-col lg:flex-row px-4 py-4 whitespace-nowrap space-x-2">

                                        {/* // 📌 9) สร้างปุ่มสำหรับแสดงรายละเอียดหนังสือ */}
                                        <button
                                            onClick={() => handleViewDetail(book)}
                                            className="gap-1 mt-3 flex flex-row bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                        >
                                            <ZoomIn /> <span>ดูรายละเอียด</span>
                                        </button>


                                        {/* // 📌 10) สร้างปุ่มสำหรับแก้ไขหนังสือ */}
                                        <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                                            <Link
                                                className="gap-1  flex flex-row"
                                                to={`/admin/editbook/${book.bookid}`}
                                            >
                                                <Pencil />
                                                <span>แก้ไข</span>
                                            </Link>
                                        </button>


                                        {/* // 📌 Homework) สร้างปุ่มสำหรับลบหนังสือพร้อมแสดง dialog ยืนยัน */}
                                        <button
                                            onClick={() => handleDeleteBook(book.bookid, book.title)}
                                            className="flex flex-row mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">

                                            <Trash2 />
                                            <span>ลบหนังสือ</span>

                                        </button>


                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>

                {/* 📌 11) สร้าง Modal สำหรับแสดงรายละเอียดหนังสือเมื่อคลิกที่ปุ่ม "ดูรายละเอียด" */}
                {isView ? (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white p-4 rounded-lg w-full mx-auto flex flex-col items-center max-h-screen overflow-y-auto">
                            <div className="w-full overflow-x-hidden">
                                {BookView(selectedBook as Book)}
                            </div>
                            <button
                                onClick={() => {
                                    setIsView(false);
                                }}
                                className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mb-2 rounded-lg gap-1 mt-3 flex flex-row justify-center"
                            >
                                <CircleX /> <span>ปิดหน้าต่าง</span>
                            </button>
                        </div>
                    </div>
                ) : null}


            </div>
        );
    };
}

export default ManageBook;
