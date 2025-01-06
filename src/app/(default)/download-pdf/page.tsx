import BookDetails from "@/components/BookDetails/BookDetails";
import Books from "@/components/Books/Books";
import RecentPost from "@/components/RecentPost/RecentPost";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import React from "react";

const DownloadPdfPage = () => {
  return (
    <div>
      <SearchFilter />
      <BookDetails />
      <Books />
      <RecentPost />
    </div>
  );
};

export default DownloadPdfPage;
