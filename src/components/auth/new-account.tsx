import { Call, User, ShieldTick } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/config/api";

export default function NewAccount() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !phone) return;

    setLoading(true);

    try {
      await axios.post("/v1/auth/register", {
        fullName,
        phone,
      });

      await axios.post("/v1/auth/request-otp", {
        phone,
      });

      navigate(`/verify?phone=${encodeURIComponent(phone)}`);
    } catch (error) {
      // handle error toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-muted text-sm">
        Create your account with your phone number. A verification code will be
        sent to WhatsApp.
      </p>

      <InputWithIcon
        icon={<User size={20} variant="Bulk" />}
        label="Your name"
        placeholder="e.g Scorpion"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="bg-secondary"
      />

      <InputWithIcon
        icon={<Call size={20} variant="Bulk" />}
        label="Your number"
        placeholder="e.g 08000000000"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="bg-secondary"
      />

      <div className="flex gap-2 bg-secondary border border-line rounded-lg p-2">
        <ShieldTick
          size={17}
          variant="Bulk"
          className="flex-shrink-0 text-primary"
        />
        <p className="text-xs text-muted">
          A 6 digit verification code will be sent to your WhatsApp number.
        </p>
      </div>

      <ButtonWithLoader
        type="submit"
        initialText="Continue"
        loadingText="Sending code..."
        loading={loading}
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />
    </form>
  );
}
