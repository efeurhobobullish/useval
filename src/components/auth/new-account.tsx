import { Call, LockSlash, User } from "iconsax-reactjs";
import { ButtonWithLoader, InputWithIcon } from "../ui";

export default function NewAccount() {
  return (
    <form className="space-y-4">
      <p className="text-muted text-sm">
        Set up a unique account with your phone number only. No verification
        code needed.
      </p>

      <InputWithIcon
        icon={<User size={20} variant="Bulk" />}
        label="Your name"
        placeholder="e.g Scorpion"
        type="text"
        className="bg-secondary"
      />

      <InputWithIcon
        icon={<Call size={20} variant="Bulk" />}
        label="Your number"
        placeholder="e.g 08000000000"
        type="tel"
        className="bg-secondary"
      />
      <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
        <LockSlash size={17} variant="Bulk" className="flex-shrink-0 text-yellow-700"/> <p className="text-xs text-yellow-700">This phone number will serve as a unique key to your account. No verification code will be sent because the developer is on low budget.</p>
      </div>
      <ButtonWithLoader
        initialText="Create Account"
        loadingText="Creating Account..."
        className="w-full btn-primary h-11 rounded-lg text-sm font-semibold"
      />
    </form>
  );
}
