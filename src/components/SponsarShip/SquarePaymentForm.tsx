import { useSquareMutation } from "@/redux/Api/squareApi";
import { useParams } from "next/navigation";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { toast } from "sonner"; // Import the toast library

export default function SquarePaymentForm({ price, type ,handleCloseModal} : any) {
  const appId = "sandbox-sq0idb-fTR5BZkbFI-9otiV37IVwQ";
  const locationId = "LVYJA27247NQF";
  const [square] = useSquareMutation();
  const { id } = useParams();

  const handlePayment = async (token: any) => {
    try {
      // Display loading toast
      toast.loading("Processing payment...");

      // Send payment request
      const response : any = await square({
        data: { sourceId: token.token, amount: price, tier: type, id: id },
      });

      
      if (response?.success) {
        toast.dismiss(); 
        handleCloseModal()
        toast.success("Payment successful!"); 
      
      } else {
        toast.dismiss(); 
        handleCloseModal()
        const errorMessage =
          response?.error?.message || "Payment failed! Please try again.";
        toast.error(errorMessage); // Show error toast
      }
    } catch (err :any) {
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
