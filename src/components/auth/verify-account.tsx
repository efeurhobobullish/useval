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
  const [otp, setOtp] = useState(["", "", "", ""]);
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

  const submitCode = async (finalCode: string) => {
    try {
      setLoading(true);
      await verifyOtp({ phone, code: finalCode });
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

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    if (value.length === 4) {
      const split = value.split("").slice(0, 4);
      setOtp(split);
      submitCode(split.join(""));
      return;
    }

    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    const finalCode = newOtp.join("");
    if (finalCode.length === 4 && !newOtp.includes("")) {
      submitCode(finalCode);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d{4}$/.test(pasted)) return;

    const split = pasted.split("");
    setOtp(split);
    submitCode(pasted);
  };

  const handleManualPasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (/^\d{4}$/.test(text)) {
        const split = text.split("");
        setOtp(split);
        submitCode(text);
      } else {
        toast.error("Clipboard does not contain a valid 4 digit code");
      }
    } catch {
      toast.error("Unable to access clipboard");
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
    <form className="space-y-6 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          Enter Verification Code
        </h3>
        <p className="text-sm text-muted">
          A 4 digit code has been sent to
        </p>
        <p className="text-primary font-semibold text-sm">
          {phone}
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="tel"
            inputMode="numeric"
            maxLength={4}
            value={digit}
            onChange={(e) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="h-14 w-14 text-center text-xl font-bold rounded-xl border border-line bg-secondary focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleManualPasteFromClipboard}
        className="text-xs text-primary font-medium"
      >
        Paste code from clipboard
      </button>

      <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-left">
        <LockSlash
          size={17}
          variant="Bulk"
          className="flex-shrink-0 text-yellow-700 mt-0.5"
        />
        <p className="text-xs text-yellow-700">
          This code expires in 5 minutes. Do not share it.
        </p>
      </div>

      <ButtonWithLoader
        initialText="Verify Account"
        loadingText="Verifying..."
        loading={loading}
        className="w-full btn-primary h-11 rounded-xl text-sm font-semibold"
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