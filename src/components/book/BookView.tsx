import Book from "../../types/Book";
function BookView(book: Book) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col justify-center items-center md:flex-row md:mt-4">
        <div className="md:w-1/3  p-6 ">
          <img
            src={book.thumbnailUrl}
            className="object-contain  h-full w-full rounded-2xl"
            alt="Book cover"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <div className="container mx-auto mb-6">
            <h2 className="font-bold text-4xl">{book?.title}</h2>
          </div>

          <h4 className="font-bold mb-3 text-red-600 text-2xl">
            {book?.author}
          </h4>
          <p className="whitespace-pre-line">{book?.shortDescription}</p>
          <h5 className="font-bold text-green-600 mt-6 mb-2 text-xl">
            ข้อมูลหนังสือ
          </h5>
          <div>
            <b>ISBN</b> : {book?.isbn}
          </div>
          <div>
            <b>จำนวนหน้า</b> : {book?.pageCount}
          </div>
          <div>
            <b>พิมพ์เมื่อ</b> :{" "}
            {new Date(book.publishedDate).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="text-left text-xl">
              <h5 className="text-blue-600 font-bold">ราคา: {book.price} ฿</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookView;
