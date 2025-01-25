"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useCreateEventMutation } from "@/redux/Api/eventApi";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Country, City } from "country-state-city";

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

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Fetch coordinates when address is updated
    if (name === "address" && selectedCountry) {
      fetchCoordinates(value, selectedCountry);
    }
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

  const fetchCoordinates = async (
    city: string,
    country: string
  ): Promise<void> => {
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

  const countries = Country.getAllCountries();

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);

    // Filter cities based on the selected country
    const countryCities = City.getAllCities()
      .filter((city) => city.countryCode === countryName)
      .map((city) => city.name);

    setCities(countryCities); // Update the city list
    setFormData((prevData) => ({
      ...prevData,
      address: "", // Reset city when the country changes
    }));
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
        date: startDate, // Converted to ISO string with timezone
        venue: formData.address,
        endTime: endDate, // Converted to ISO string with timezone
        silverSponsorFee: parseFloat(formData.silverSponsorFee),
        goldSponsorFee: parseFloat(formData.goldSponsorFee),
        platinumSponsorFee: parseFloat(formData.platinumSponsorFee),
        latitude: formData.latitude ?? 0,
        longitude: formData.longitude ?? 0,
      };

      formDataToSend.append("body", JSON.stringify(bodyData));
      if (formData.eventImage)
        formDataToSend.append("eventImage", formData.eventImage);

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
      if (!isLoading) {
        router.push("/admin/event-history");
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
    <div className="lg:px-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 border-b border-[#E0E0E0] pb-3">
        Create Event
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
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
            onChange={handleImageUpload}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                height={100}
                width={100}
                className="max-w-xs h-auto"
              />
            </div>
          )}
        </div>
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
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full mt-2 px-4 py-2 border rounded"
            disabled={!cities.length}
          >
            <option value="">Select a City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
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
          {loadingLocation && (
            <span className="text-sm text-gray-500">
              Fetching location coordinates...
            </span>
          )}
        </div>

        <div className="flex gap-6 md:flex-row flex-col">
  <div className="w-full">
    <label className="block font-medium text-darkGray">
      Start Date & Time
    </label>
    <input
      type="datetime-local"
      name="startDate"
      min={new Date().toISOString().slice(0, 16)} // Disable dates before the current date and time
      value={formData.startDate}
      onChange={(e) => {
        handleChange(e);

        // Reset endDate if it is less than the new startDate
        if (
          formData.endDate &&
          new Date(e.target.value) > new Date(formData.endDate)
        ) {
          setFormData((prevData) => ({
            ...prevData,
            endDate: "", // Clear the invalid endDate
          }));
        }
      }}
      className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
    />
  </div>
  <div className="w-full">
    <label className="block font-medium text-darkGray">
      End Date & Time
    </label>
    <input
      type="datetime-local"
      name="endDate"
      min={formData.startDate || new Date().toISOString().slice(0, 16)} // End date must be after the selected start date
      value={formData.endDate}
      onChange={handleChange}
      className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
      disabled={!formData.startDate} // Disable if startDate is not selected
    />
    {/* Show message when endDate is disabled */}
    {!formData.startDate && (
      <small className="text-red-500 mt-1 block">
        Please select a start date first.
      </small>
    )}
    {/* Show message when endDate is invalid */}
    {formData.startDate && formData.endDate && 
      new Date(formData.endDate) < new Date(formData.startDate) && (
      <small className="text-red-500 mt-1 block">
        End date cannot be earlier than the start date.
      </small>
    )}
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
        <div className="flex gap-6 md:flex-row flex-col">
          <div className="w-full">
            <label className="block font-medium text-darkGray">
              Silver Sponsor Fee
            </label>
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
            <label className="block font-medium text-darkGray">
              Gold Sponsor Fee
            </label>
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
            <label className="block font-medium text-darkGray">
              Platinum Sponsor Fee
            </label>
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
