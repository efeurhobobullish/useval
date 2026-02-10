import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Call, User, LockSlash } from "iconsax-reactjs";
import { toast } from "sonner";

import axios from "@/config/api";
import { ButtonWithLoader, InputWithIcon } from "../ui";

export default function NewAccount() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/v1/auth/register", {
        fullName,
        phone,
      });

      await axios.post("/v1/auth/request-otp", {
        phone,
      });

      toast.success("Verification code sent to WhatsApp");

      navigate(`/verify?phone=${encodeURIComponent(phone)}`);
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
        Create your account with your phone number.
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
        initialText="Continue"
        loadingText="Sending code..."
        loading={loading}
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />
    </form>
  );
}
