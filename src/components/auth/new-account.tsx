import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Call, User, Sms, LockSlash } from "iconsax-reactjs";
import { toast } from "sonner";

import { useAuth } from "@/hooks";
import { ButtonWithLoader, InputWithIcon } from "../ui";

export default function NewAccount() {
  const navigate = useNavigate();
  const { register, requestOtp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      toast.error("Please enter your name, phone and email");
      return;
    }

    setLoading(true);

    try {
      await register({ fullName, phone, email });

      await requestOtp(email);

      toast.success("Verification code sent to your email");

      navigate(`/verify?email=${encodeURIComponent(email)}`);

    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-muted text-sm">
        Create your account with your details.
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
        icon={<Sms size={20} variant="Bulk" />}
        label="Your email"
        placeholder="e.g you@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        <LockSlash
          size={17}
          variant="Bulk"
          className="flex-shrink-0 text-primary"
        />
        <p className="text-xs text-muted">
          A 6 digit verification code will be sent to your email address.
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
