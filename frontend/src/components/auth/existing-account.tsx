import type React from "react";
import { Sms, LockSlash } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/hooks";

export default function ExistingAccount() {
  const navigate = useNavigate();
  const { requestOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      await requestOtp(email);

      toast.success("Verification code sent to your email");

      navigate(`/verify?email=${encodeURIComponent(email)}`);
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
        Sign in using your email address. A verification code will be sent to your email.
      </p>

      <InputWithIcon
        icon={<Sms size={20} variant="Bulk" />}
        label="Your email"
        placeholder="e.g you@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-secondary"
      />

      <div className="flex gap-2 bg-secondary border border-line rounded-lg p-2">
        <LockSlash
          size={17}
          variant="Bulk"
          className="flex-shrink-0 text-primary"
        />
        <p className="text-xs text-muted">
          A 4 digit verification code will be sent to your email.
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
