import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardLayout } from "@/layouts";
import {
  InputWithIcon,
  SelectWithIcon,
  ButtonWithLoader,
} from "@/components/ui";
import { CallAdd, Wifi } from "iconsax-reactjs";
import { toast } from "sonner";
import { useValentines } from "@/hooks";

export default function Gift() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    getByReference,
    acceptValentine,
    accepting,
  } = useValentines();

  const [valentine, setValentine] = useState<any>(null);
  const [loadingCard, setLoadingCard] = useState(true);

  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = network && phone.length >= 10;

  /* FETCH PUBLIC CARD */
  useEffect(() => {
    if (!id) return;

    const fetchCard = async () => {
      try {
        const data = await getByReference(id);
        setValentine(data);
      } catch {
        setValentine(null);
      } finally {
        setLoadingCard(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !isValid) return;

    try {
      await acceptValentine(id, { network, phone });

      toast.success("Airtime sent successfully");

      navigate(`/card/${id}/success`);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to send airtime"
      );
    }
  };

  if (loadingCard) {
    return (
      <CardLayout>
        <p className="text-center text-muted">Loading...</p>
      </CardLayout>
    );
  }

  if (!valentine) {
    return (
      <CardLayout>
        <p className="text-center text-muted">
          Valentine not available
        </p>
      </CardLayout>
    );
  }

  return (
    <CardLayout>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-secondary text-left p-6 rounded-xl border border-line space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">
            Collect your{" "}
            <span className="text-primary font-bold">
              ₦{valentine.airtimeAmount}
            </span>{" "}
            airtime gift
          </h2>

          <p className="text-sm text-muted">
            Select your network and enter your phone number.
          </p>
        </div>

        <SelectWithIcon
          icon={<Wifi size={20} />}
          label="Network"
          value={network}
          className="bg-white"
          onChange={(e) => setNetwork(e.target.value)}
          options={[
            { value: "mtn", label: "MTN" },
            { value: "airtel", label: "Airtel" },
            { value: "glo", label: "Glo" },
            { value: "9mobile", label: "9mobile" },
          ]}
        />

        <InputWithIcon
          icon={<CallAdd variant="Bulk" size={20} />}
          type="tel"
          label="Phone number"
          placeholder="08012345678"
          value={phone}
          className="bg-white"
          onChange={(e) => setPhone(e.target.value)}
        />

        <ButtonWithLoader
          initialText="I accept your gift"
          loadingText="Sending gift..."
          loading={accepting}
          disabled={!isValid}
          className="w-full btn-primary h-11 rounded-lg font-semibold"
        />

        <p className="text-xs text-muted text-center">
          Airtime will be credited instantly.
        </p>
      </form>
    </CardLayout>
  );
}