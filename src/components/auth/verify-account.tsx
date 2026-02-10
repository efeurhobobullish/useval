import type React from "react";
import { useEffect, useState } from "react";
import { Call, ShieldTick, LockSlash } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("phone");

    if (!value) {
      toast.error("Missing phone number");
      navigate("/");
      return;
    }

    setPhone(value);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Enter the verification code");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp({ phone, code });

      toast.success("Account verified successfully");
      navigate("/home");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(phone);
      toast.success("New verification code sent");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to resend code"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-muted text-sm text-center">
        Enter the 6 digit code sent to your WhatsApp number to verify your
        account.
      </p>

      <InputWithIcon
        icon={<Call size={20} variant="Bulk" />}
        label="Phone number"
        type="tel"
        value={phone}
        disabled
        className="bg-secondary"
      />

      <InputWithIcon
        icon={<ShieldTick size={20} variant="Bulk" />}
        label="Verification code"
        placeholder="Enter 6 digit code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="bg-secondary"
      />

      <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
        <LockSlash
          size={17}
          variant="Bulk"
          className="flex-shrink-0 text-yellow-700"
        />
        <p className="text-xs text-yellow-700">
          This code expires in 5 minutes. Do not share it with anyone.
        </p>
      </div>

      <ButtonWithLoader
        type="submit"
        initialText="Verify Account"
        loadingText="Verifying..."
        loading={loading}
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />

      <button
        type="button"
        onClick={handleResend}
        className="w-full text-sm text-primary font-medium"
      >
        Resend code
      </button>
    </form>
  );
}