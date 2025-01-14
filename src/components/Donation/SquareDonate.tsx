import { useSquareDoanteMutation } from "@/redux/Api/squareApi";
import { useGetMeQuery } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { toast } from "sonner"; // Import the toast library

export default function SquareDonate({ price, type ,handleCloseModal}) {
  const appId = "sandbox-sq0idb-fTR5BZkbFI-9otiV37IVwQ";
  const locationId = "LVYJA27247NQF";
  const [squareDonate] = useSquareDoanteMutation();
  const {data}=useGetMeQuery(undefined)
  const id=data?.data?.id
  const router = useRouter()
  

  // const handlePayment = async (token) => {
  //   try {
  //     // Display loading toast
  //     toast.loading("Processing payment...");

  //     // Send payment request
  //     const response = await squareDonate({
  //       data: { sourceId: token.token,  purpose: 'DONATION', amount: price, userId: id },
  //     });

      
  //     if (response?.success) {
  //       toast.dismiss(); 
  //       handleCloseModal()
  //       router.push("/donation-compelete")
  //       toast.success("Payment successful!"); 
      
  //     } else {
  //       toast.dismiss(); 
  //       handleCloseModal()
      
  //     }
  //   } catch (err) {
  //     toast.dismiss(); // Dismiss loading toast
  //     console.error("Error during payment:", err);

  //     // Show error toast with generic message
  //     toast.error(
  //       err?.message || "An unexpected error occurred. Please try again."
  //     );
  //   }
  // };


  const handlePayment = async (token) => {
    try {
      // Display loading toast
      toast.loading("Processing payment...");
  
      // Send payment request
      const response = await squareDonate({
        data: { sourceId: token.token, purpose: "DONATION", amount: price, userId: id },
      });
       console.log(response)
  
      if (response) {
        toast.dismiss();
        toast.success("Donation successful!");
  
        // Close the modal (if needed)
        if (handleCloseModal) handleCloseModal();
  
        router.push("/donation-compelete");
      } else {
        toast.dismiss();
        toast.error("Payment failed. Please try again.");
      }
    } catch (err) {
      toast.dismiss(); // Dismiss loading toast
      console.error("Error during payment:", err);
  
      // Show error toast with generic message
      toast.error(
        err?.message || "An unexpected error occurred. Please try again."
      );
    }
  };
  


  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={handlePayment} // Call handlePayment when token is received
    >
      <CreditCard />
    </PaymentForm>
  );
}
