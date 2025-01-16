"use client";

import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";
import { useCreateEventMutation } from "@/redux/Api/eventApi";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

});

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    silverSponsorFee: "",
    goldSponsorFee: "",
    platinumSponsorFee: "",
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    address: "",
    eventImage: null as File | null,
    latitude: null as number | null,
    longitude: null as number | null,
  });
  const [countries, setCountries] = useState<{ name: string; regions: string[] }[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const router=useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      setFormData((prevData) => ({
        ...prevData,
        eventImage: file,
      }));
      reader.readAsDataURL(file);
    }
  };

  const fetchCoordinates = async (city: string, country: string): Promise<void> => {
    try {
      setLoadingLocation(true);
      const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;
      const response = await fetch(apiUrl, {
        headers: { "X-Api-Key": "b/Ido8GzW6vvUiyCtQHQ6A==DhBMq0HZlI8UBlxJ" },
      });
      if (!response.ok) throw new Error("Error fetching coordinates");

      const data = await response.json();
      if (data.length > 0) {
        const { latitude, longitude } = data[0];
        setFormData((prevData) => ({
          ...prevData,
          latitude,
          longitude,
        }));
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Error fetching countries");

        const data = await response.json();
        const countryData = data.map((country: any) => ({
          name: country.name.common,
          regions: country.subregion ? [country.subregion] : [],
        }));
        setCountries(countryData.sort((a:any, b:any) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);

    const selected = countries.find((country) => country.name === countryName);
    setStates(selected?.regions || []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      eventSchema.parse(formData);

      // Convert start and end dates to ISO format with time zone (Z for UTC)
      const startDate = new Date(formData.startDate).toISOString();
      const endDate = new Date(formData.endDate).toISOString();

      const formDataToSend = new FormData();
      const bodyData = {
        title: formData.title,
        description: formData.description,
        date: startDate,  // Converted to ISO string with timezone
        venue: formData.address,
        endTime: endDate,  // Converted to ISO string with timezone
        silverSponsorFee: parseFloat(formData.silverSponsorFee),
        goldSponsorFee: parseFloat(formData.goldSponsorFee),
        platinumSponsorFee: parseFloat(formData.platinumSponsorFee),
        latitude: formData.latitude ?? 0,
        longitude: formData.longitude ?? 0,
      };

      formDataToSend.append("body", JSON.stringify(bodyData));
      if (formData.eventImage) formDataToSend.append("eventImage", formData.eventImage);

      await createEvent(formDataToSend);

      setFormData({
        silverSponsorFee: "",
        goldSponsorFee: "",
        platinumSponsorFee: "",
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        address: "",
        eventImage: null,
        latitude: null,
        longitude: null,
      });
      setImagePreview(null);
      if(!isLoading){
        router.push('/admin/event-history');
      }
      toast.success("Event created successfully!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) =>
          toast.error(`${error.path[0]}: ${error.message}`)
        );
      }
    }
  };

  return (
    <div className="px-16">
      <h1 className="text-3xl font-semibold mb-6 border-b border-[#E0E0E0] pb-3">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="block w-full mt-2 px-4 py-2 border rounded"
          >
            <option value="">Select a Country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state">State/Region</label>
          <select
            id="state"
            name="state"
            className="block w-full mt-2 px-4 py-2 border rounded"
            disabled={!states.length}
          >
            <option value="">Select a State/Region</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {/* Rest of your form components */}
        <div>
            <label className="block font-medium text-darkGray">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              placeholder="Event Title"
            />
          </div>

          <div>
            <label className="block font-medium text-darkGray">Venue</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              placeholder="Address"
            />
          </div>

          <div className="flex gap-6">
  <div className="w-full">
    <label className="block font-medium text-darkGray">Start Date & Time</label>
    <input
      type="datetime-local"
      name="startDate"
      min={new Date().toISOString().slice(0, 16)} // Disable dates before current date and time

      value={formData.startDate}
      onChange={handleChange}
      className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
    />
  </div>
  <div className="w-full">
    <label className="block font-medium text-darkGray">End Date & Time</label>
    <input
      type="datetime-local"
      name="endDate"
      value={formData.endDate}
      onChange={handleChange}
      className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
    />
  </div>
</div>


          <div>
            <label className="block font-medium text-darkGray">Description</label>
            <Editor
              apiKey="g68nc1d1w7r6ws2cu6q6c6trlsejbpqf5dylpj1b8hjeoc7d"
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

          {/* Sponsorship Fees */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className="block font-medium text-darkGray">Silver Sponsor Fee</label>
              <input
                type="text"
                name="silverSponsorFee"
                value={formData.silverSponsorFee}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
                placeholder="Silver Sponsor Fee"
              />
            </div>
            <div className="w-full">
              <label className="block font-medium text-darkGray">Gold Sponsor Fee</label>
              <input
                type="text"
                name="goldSponsorFee"
                value={formData.goldSponsorFee}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
                placeholder="Gold Sponsor Fee"
              />
            </div>
            <div className="w-full">
              <label className="block font-medium text-darkGray">Platinum Sponsor Fee</label>
              <input
                type="text"
                name="platinumSponsorFee"
                value={formData.platinumSponsorFee}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
                placeholder="Platinum Sponsor Fee"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0061FF] text-white px-6 py-2 rounded mt-6"
            >
              Create Event
            </button>
          </div>
      </form>
    </div>
  );
};

export default CreateEvent;
