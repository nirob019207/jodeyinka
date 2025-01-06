import React from "react";
import Image from "next/image";
import book1 from "@/asset/resource/book1.png";
import book2 from "@/asset/resource/book2.png";
import book3 from "@/asset/resource/book3.png";
import book4 from "@/asset/resource/book4.png";

const Books = () => {
  const books = [
    { id: 1, title: "Cybersecurity For Beginners", author: "John Smith", image: book1 },
    { id: 2, title: "Computer Networking and Cybersecurity", author: "John Smith", image: book2 },
    { id: 3, title: "Cybersecurity Essentials", author: "John Smith", image: book3 },
    { id: 4, title: "Information Security", author: "John Smith", image: book4 },
  ];

  return (
    <section className="bg-[#F6F6F6] pt-[30px] md:pt-[60px pb-[60px] font-inter px-6 md:px-0">
     <div className="container mx-auto px-0">
     <h2 className="text-2xl font-semibold mb-6 text-default text-center md:text-start">Related Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border-[#DDDDDD]"
          >
            <Image
              src={book.image}
              alt={book.title}
              className="w-[120px] h-[178px] mx-auto pt-4"
              width={120}
              height={178}
            //   layout="responsive"
            />
            <div className="p-4">
              <h3 className="text-lg md:text-[20px] font-medium text-[#10375C] truncate mb-2">{book.title}</h3>
              <p className="text-[12px] text-[#10375C] mb-4">By: {book.author}</p>
              <button className="px-4 py-3 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-full">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
     </div>
    </section>
  );
};

export default Books;
