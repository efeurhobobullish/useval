import type React from "react";
import { Call, LockSlash } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

export default function ExistingAccount() {
  const navigate = useNavigate();
  const { requestOtp } = useAuth();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    try {
      setLoading(true);

      await requestOtp(phone);

      toast.success("Verification code sent");
      navigate(`/verify?phone=${encodeURIComponent(phone)}`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to send verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-muted text-sm">
        Sign in using your phone number. A verification code will be sent to your
        WhatsApp.
      </p>

      <InputWithIcon
        icon={<Call size={20} variant="Bulk" />}
        label="Your number"
        placeholder="e.g 08000000000"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="bg-secondary"
      />

      <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
        <LockSlash
          size={17}
          variant="Bulk"
          className="flex-shrink-0 text-yellow-700"
        />
        <p className="text-xs text-yellow-700">
          A 6 digit verification code will be sent to your WhatsApp number.
        </p>
      </div>

      <ButtonWithLoader
        type="submit"
        loading={loading}
        initialText="Send Code"
        loadingText="Sending Code..."
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />
    </form>
  );
}