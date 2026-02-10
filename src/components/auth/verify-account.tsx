import { Call, Lock, ShieldTick } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";

export default function VerifyAccount() {
  return (
    <form className="space-y-4">
      <p className="text-muted text-sm text-center">
        Enter the 6 digit code sent to your WhatsApp number to verify your
        account.
      </p>

      <InputWithIcon
        icon={<Call size={20} variant="Bulk" />}
        label="Phone number"
        placeholder="e.g 08000000000"
        type="tel"
        className="bg-secondary"
      />

      <InputWithIcon
        icon={<ShieldTick size={20} variant="Bulk" />}
        label="Verification code"
        placeholder="Enter 6 digit code"
        type="text"
        className="bg-secondary"
      />

      <div className="flex gap-2 bg-secondary border border-line rounded-lg p-2">
        <Lock size={17} variant="Bulk" className="flex-shrink-0 text-primary" />
        <p className="text-xs text-muted">
          This code expires in 5 minutes. Do not share it with anyone.
        </p>
      </div>

      <ButtonWithLoader
        initialText="Verify Account"
        loadingText="Verifying..."
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />
    </form>
  );
}
