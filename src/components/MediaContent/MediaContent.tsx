"use client";

import React, { useState } from "react";
import Image from "next/image";
import comment from "@/asset/media/comment.svg";
import dots from "@/asset/media/dots.svg";
import profile from "@/asset/profilavater.webp";
import { useAddComentMutation, useGetResourceSingleQuery } from "@/redux/Api/resourceApi";
import { useParams } from "next/navigation";
import defult from "@/asset/default.png";
import { toast } from "sonner";
import CardSkeleton from "../CardSkelaton/CardSkeleton";

const MediaContent: React.FC = () => {
  const path = useParams();
  const { data, isLoading } = useGetResourceSingleQuery({
    id: Array.isArray(path?.id) ? path.id[0] : path?.id || "",
  });
  const [addComment, { isLoading: addLoading }] =
    useAddComentMutation();
  const singleDetails = data?.data;

  const [showAddComment, setShowAddComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  function formatMonthAndTime(isoDate: string) {
    const eventDate = new Date(isoDate);

    // Format month and day
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    const formattedDate = eventDate.toLocaleDateString("en-US", options);

    // Format time
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

    return `${formattedDate} @ ${formattedTime}`;
  }

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      try {
        await addComment({ content: commentText, id: Array.isArray(path?.id) ? path.id[0] : path?.id || "" });
        toast.success("Comment added successfully!");
        setCommentText(""); // Clear the input field after successful submission
      } catch  {
        toast.error("Failed to add comment. Please try again.");
      }
    } else {
      toast.error("Comment cannot be empty.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[130px] md:pb-[250px]">
      <div className="container mx-auto px-0 md:px-6 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-[740px]">
          {/* Media */}
          <div className="relative w-full h-64 lg:h-96">
            {singleDetails?.fileUrl && (
              <Image
                src={singleDetails?.fileUrl}
                alt="Media Content"
                className="rounded-t-lg object-cover"
                layout="fill"
              />
            )}
          </div>

          {/* Content */}
          <div className="">
            <h1 className="text-2xl font-bold text-default mb-4 mt-6">
              {singleDetails?.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-[52px] h-[52px] rounded-full border border-[#FFFFFF] bg-[#D9D9D9]">
                  <Image
                    src={singleDetails?.Author?.avatarUrl?.src || profile}
                    height={100}
                    width={100}
                    alt="Author Avatar"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="mt-2">
                  <h2>
                    {singleDetails?.Author?.firstName +
                      " " +
                      singleDetails?.Author?.lastName || "Kamran Hasan"}
                  </h2>
                  <div className="text-gray-500 mb-6">
                    {singleDetails?.Author?.userName || "@username"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div
                  className="flex items-center gap-2 bg-[#FFFFFF] rounded-[4px] p-2 cursor-pointer"
                  onClick={() => setShowAddComment(!showAddComment)} 
                >
                  <Image src={comment} alt="comment" />
                  <p>Comments</p>
                </div>
                <div className="bg-[#FFFFFF] rounded-[4px]">
                  <Image src={dots} alt="dots" />
                </div>
              </div>
            </div>
            <p className="text-[#090043] mb-6">
              {formatMonthAndTime(singleDetails?.createdAt)}
            </p>
            <div
              className="text-[#090043]"
              dangerouslySetInnerHTML={{ __html: singleDetails?.description || "" }}
            />
          </div>
        </div>

        <div className="lg:w-[360px]">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Comments</h2>
            <div className="space-y-6 max-h-[500px] overflow-y-auto slim-scroll">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                singleDetails?.Comments?.map((comment:any, index:any) => (
                  <div key={index} className="flex items-start gap-4">
                    {/* Display avatar or placeholder */}
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {comment.Author?.avatarUrl?.src ? (
                        <Image
                          src={comment.Author.avatarUrl.src || profile}
                          alt="Author Avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          src={defult}
                          alt="Author Avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                    </div>
                    {/* Comment content */}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {comment.Author?.username || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                      <p className="text-xs text-gray-400">
                        {formatMonthAndTime(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Comment */}
          {showAddComment && ( // Render Add Comment section conditionally
            <div className="mt-6">
              <input
                placeholder="Add Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border-b border-gray-300 rounded-md p-3 focus:outline-none bg-transparent"
              />
              <div className="flex justify-end mt-4 gap-2">
                <button
                  className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setShowAddComment(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#C5C5C5] text-[#090043] px-4 py-2 rounded-md"
                  onClick={handleCommentSubmit}
                  disabled={addLoading}
                >
                  {addLoading ? "Comment.." : "Comment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaContent;
