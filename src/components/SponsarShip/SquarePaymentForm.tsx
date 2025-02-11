import { useSquareMutation } from "@/redux/Api/squareApi";
import { useParams } from "next/navigation";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { toast } from "sonner"; // Import the toast library

export default function SquarePaymentForm({
  price,
  type,
  handleCloseModal,
}: any) {
  const appId = "sandbox-sq0idb-fTR5BZkbFI-9otiV37IVwQ";
  const locationId = "LVYJA27247NQF";
  const [square] = useSquareMutation();
  const { id } = useParams();

  const handlePayment = async (token: any) => {
    try {
      toast.loading("Processing payment...");
  
      const response: any = await square({
        data: { sourceId: token.token, amount: price, tier: type, id: id },
      });
  
      if (response?.data?.success) {
        // Save the paid plan to localStorage
        localStorage.setItem("paidPlan", type); 
  
        toast.dismiss();
        handleCloseModal();
        toast.success("Payment successful!");
        onPaymentSuccess()
      } else {
        toast.dismiss();
        handleCloseModal();
        const errorMessage =
          response?.error?.message || "Payment failed! Please try again.";
        toast.error(errorMessage);
      }
    } catch (err: any) {
      toast.dismiss();
      console.error("Error during payment:", err);
      toast.error(
        err?.message || "An unexpected error occurred. Please try again."
      );
    }
  };
  

  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={handlePayment}
    >
      <CreditCard />
    </PaymentForm>
  );
}

function onPaymentSuccess() {
  throw new Error("");
}

