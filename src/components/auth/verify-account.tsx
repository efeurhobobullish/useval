import type React from "react";
import { useEffect, useRef, useState } from "react";
import { LockSlash } from "iconsax-reactjs";
import { ButtonWithLoader } from "../ui";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useAuth();

  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

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

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...digits];
    updated[index] = value;
    setDigits(updated);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!/^\d{4}$/.test(text)) return;

      setDigits(text.split(""));
      inputsRef.current[3]?.focus();
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = digits.join("");

    if (code.length !== 4) {
      toast.error("Enter complete 4 digit code");
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">
          Enter Verification Code
        </h2>
        <p className="text-sm text-muted">
          Code sent to {phone} on WhatsApp
        </p>
      </div>

      <div
        className="flex justify-center gap-3"
        onClick={handlePaste}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            className="h-14 w-14 text-center text-xl font-bold rounded-xl border border-line focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-secondary"
          />
        ))}
      </div>

      <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <LockSlash
          size={18}
          variant="Bulk"
          className="flex-shrink-0 text-yellow-700"
        />
        <p className="text-xs text-yellow-700">
          This code expires in 5 minutes. Do not share it.
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