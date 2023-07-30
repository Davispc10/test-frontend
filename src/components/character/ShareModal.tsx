import * as U from '@/utils';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillClipboard2HeartFill } from 'react-icons/bs';
import { FaWindowClose } from 'react-icons/fa';

import BaseModal from '../ui/BaseModal';
import Button from '../ui/Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose?: (isOpen: boolean) => void;
  image: string;
  name: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  image,
  name,
}: ShareModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  function clipboard() {
    U.clipboardCopy(window.location.href);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  function share() {
    U.shareOnTwitter(window.location.href, name);
  }

  return (
    <BaseModal isOpen={isOpen}>
      <div className="w-full max-w-[600px] bg-white py-3">
        <div className="flex w-full items-center justify-between px-3">
          <h1 className="text-xl font-bold">Share character</h1>
          <FaWindowClose
            className="cursor-pointer text-3xl hover:text-red-600"
            onClick={() => onClose?.(false)}
          />
        </div>
        <div className="h-[200px] w-full">
          <Image
            src={image}
            alt="hero-bg"
            className="mt-3 h-full w-full object-cover"
            width={600}
            height={200}
          />
        </div>
        <div className="mt-5 flex gap-x-3 px-3 max-[380px]:flex-col max-[380px]:gap-y-3">
          <Button onClick={share}>
            Twitter
            <AiOutlineClose className="ml-2 text-2xl" />
          </Button>
          <Button onClick={clipboard}>
            {isCopied ? 'Copiado!' : 'Copiar link'}
            <BsFillClipboard2HeartFill className="ml-2 text-2xl" />
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
