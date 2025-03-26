import { useState, useEffect } from "react";
import { api } from "./configAxios";
import Book from "../types/Book";
import { AxiosError } from "axios";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 📌 ดึงข้อมูลหนังสือเมื่อ Component โหลด
  useEffect(() => {
    fetchBooks();
  }, []);

  // 📌 ดึงข้อมูลหนังสือ
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/books");
      setBooks(response.data.data);

      // Test : สำหรับทดสอบการแสดง Loading  - Add timer 5 sec then continue
      // await new Promise(resolve => setTimeout(resolve, 5000));

      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
      } else {
        setError(`Error : ${String(error)}`);
      }
      setLoading(false);
    }
  };

   // ✅ เพิ่มหนังสือใหม่
   const addBook = async (book: Omit<Book, "bookid">) => {
    try {
      const response = await api.post('/books', book);
      const newBook = response.data;
      setBooks([...books, newBook]);
      return newBook;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
      } else {
        setError(`Error : ${String(error)}`);
      }
    }
  };


  // ✅ อัปเดตหนังสือ
  const updateBook = async (id: number, updates: Partial<Book>) => {
    try {
      const response = await api.put(`/books/${id}`, updates);
      const updatedBook = response.data;
      setBooks(books.map(book => book.bookid === id ? updatedBook : book));
      return updatedBook;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
      } else {
        setError(`Error : ${String(error)}`);
      }
    }
  };

   // ✅ อัปโหลดปกหนังสือ
   const uploadBookCover = async (bookid: number, coverFile: File) => {
    try {
      const formData = new FormData();
      formData.append('book_cover', coverFile);
      
      const response = await api.post(`/books/cover/${bookid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
      } else {
        setError(`Error : ${String(error)}`);
      }
    }
  }

  // ✅ อัปเดต url ปกหนังสือ
  const updateThumbnailUrl = async (bookid: number, updates: Partial<Book>) => {
    try {
      const response = await api.put(`/books/cover/${bookid}`, updates);
      const updatedBook = response.data;
      setBooks(books.map(book => book.bookid === bookid ? updatedBook : book));
      return updatedBook;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
      } else {
        setError(`Error : ${String(error)}`);
      }
    }
  };

  // ✅ ลบหนังสือ
const deleteBook = async (id: number) => {
  try {
    await api.delete(`/books/${id}`);
    
    // อัพเดทสถานะโดยลบหนังสือที่มี id ตรงกันออกจาก state
    setBooks(books.filter(book => book.bookid !== id));
    
    return { success: true, message: `ลบหนังสือรหัส ${id} สำเร็จ` };
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = `Error : ${err.response?.status} ${err.response?.statusText}`;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } else {
      const errorMessage = `Error : ${String(err)}`;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }
};



  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    uploadBookCover,
    updateThumbnailUrl,
    deleteBook
  };
};
