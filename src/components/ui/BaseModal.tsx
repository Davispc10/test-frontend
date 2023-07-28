import { Dialog } from '@headlessui/react';

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function BaseModal({
  isOpen,
  setIsOpen,
  children,
}: BaseModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen?.(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
        {children}
      </div>
    </Dialog>
  );
}
