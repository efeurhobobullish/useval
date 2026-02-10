import { Call, LockSlash } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";

export default function ExistingAccount() {
  return (
    <form className="space-y-4">
      <p className="text-muted text-sm">
        Sign in to your account with your unique ID (Phone Number)
      </p>

      <InputWithIcon
        icon={<Call size={20} variant="Bulk" />}
        label="Your number"
        placeholder="e.g 08000000000"
        type="tel"
        className="bg-secondary"
      />
      <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
        <LockSlash size={17} variant="Bulk" className="flex-shrink-0 text-yellow-700"/> <p className="text-xs text-yellow-700">If this phone number is not yours, you will not be able to sign in. No verification code will be sent because the developer is on low budget.</p>
      </div>
      <ButtonWithLoader
        initialText="Sign In"
        loadingText="Signing In..."
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />
    </form>
  );
}
