import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardLayout } from "@/layouts";
import { InputWithIcon, SelectWithIcon } from "@/components/ui";
import { CallAdd, Wifi } from "iconsax-reactjs";

export default function Gift() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = network && phone.length >= 10;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setIsLoading(true);

      // simulate API call
      await new Promise((res) => setTimeout(res, 1500));

      // on success
      navigate(`/card/${id}/success`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardLayout>
      <form className="max-w-md mx-auto bg-secondary text-left p-6 rounded-xl border border-line space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">
            Collect your <span className="text-primary font-bold">&#8358;500</span> airtime gift 🎁
          </h2>
          <p className="text-sm text-muted">
            Select your network and enter your phone number.
          </p>
        </div>

        {/* Network */}
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
        {/* <div className="space-y-1">
          <label className="text-sm text-muted">Network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full bg-background border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select network</option>
            <option value="mtn">MTN</option>
            <option value="airtel">Airtel</option>
            <option value="glo">Glo</option>
            <option value="9mobile">9mobile</option>
          </select>
        </div> */}

        {/* Phone */}
        <InputWithIcon
          icon={<CallAdd variant="Bulk" size={20} />}
          type="tel"
          label="Phone number"
          placeholder="08012345678"
          value={phone}
          className="bg-white"
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending gift..." : "I accept your gift 💖"}
        </button>

        <p className="text-xs text-muted text-center">
          Airtime will be credited instantly.
        </p>
      </form>
    </CardLayout>
  );
}
