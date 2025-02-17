"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import { useResourceCreateMutation } from "@/redux/Api/resourceApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

// Zod validation schema
const resourceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(1, "Description is required"),
  resourceFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      "Invalid file type"
    ),
});

export default function Resource() {
  const [createresource] = useResourceCreateMutation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    resourceFile: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleEditorChange = (content: string) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        resourceFile: selectedFile,
      }));
      console.log("Selected file:", selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data
      resourceSchema.parse(formData);

      // Set loading state to true while submitting
      setIsLoading(true);

      // Prepare the FormData to send the request
      const formDataToSend = new FormData();

      // Prepare the body data as a JSON object
      const bodyData = {
        title: formData.title,
        description: formData.description,
      };

      // Append the body data as a JSON string
      formDataToSend.append("body", JSON.stringify(bodyData));

      if (formData.resourceFile) {
        formDataToSend.append("resourceFile", formData.resourceFile);
      }

      // Make the API request using the mutation
      const response = await createresource(formDataToSend).unwrap();

      if (response.success) {
        setFormData({
          title: "",
          description: "",
          resourceFile: null as File | null,
        });
        toast.success("Resource created successfully!");
        router.push("/admin/resource-list");
        console.log("Resource created successfully:", response);
      }

      // Reset loading state after completion
      setIsLoading(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        err.errors.forEach((error) => {
          console.log(`Error in field ${error.path[0]}: ${error.message}`);
          toast.error(`Error in field ${error.path[0]}: ${error.message}`);
        });
      } else {
        // Handle API errors
        console.error("API Error:", err);
        toast.error("Failed to create resource. Please try again.");
      }
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="lg:px-10 px-4">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-6 border-b border-[#E0E0E0] pb-3">
        Create Resource
      </h1>

      {/* Main Container */}
      <div className="flex md:space-x-6 space-x-0 md:flex-row flex-col">
        {/* Product Image Section */}
        <div className="col-span-2">
          <label
            htmlFor="resourceFile"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="resourceFile"
            onChange={handleFileChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Form Section */}
        <form className="flex-1" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4 mt-4 md:mt-0">
            {/* Title Field */}
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description Editor */}
            <div className="col-span-2">
              <label className="block font-medium text-darkGray">
                Description
              </label>
              <Editor
                apiKey="4kjrncewwa4057zz04om0mle4q3to49bypq57bh6qgq5f0n3"
                initialValue="<p>Product description</p>"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  content_style:
                    "body { font-family:Arial, Helvetica, sans-serif; font-size:14px }",
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center col-span-full mt-11">
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? "Creating Resource..." : "Create Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
