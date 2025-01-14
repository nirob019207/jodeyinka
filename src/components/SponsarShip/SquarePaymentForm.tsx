import { useSquareMutation } from "@/redux/Api/squareApi";
import { useParams } from "next/navigation";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { useRouter } from "next/navigation";

export default function SquarePaymentForm({ price, type }) {
  const appId = "sandbox-sq0idb-fTR5BZkbFI-9otiV37IVwQ";
  const locationId = "LVYJA27247NQF";
  const [square] = useSquareMutation();
  const { id } = useParams();
  const router = useRouter(); // Use the useRouter hook for navigation

  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token: any) => {
        const response = await square({
          data: { sourceId: token.token, amount: price, tier: type, id: id },
        });

        // If the response is successful, redirect to the home page
        if (response?.success) {
          router.push("/"); // Redirect to the home page
        } else {
          // Handle error or failure
          console.error("Payment failed", response?.error);
        }
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}
