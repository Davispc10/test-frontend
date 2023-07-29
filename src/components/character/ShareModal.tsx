import BaseModal from '../ui/BaseModal';
import { BsFillClipboard2HeartFill } from 'react-icons/bs';
import { FaWindowClose } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import Button from '../ui/Button';
import * as U from '@/utils';
import { useState } from 'react';

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
      <div className="bg-white w-full max-w-[600px] py-3">
        <div className="flex justify-between items-center w-full px-3">
          <h1 className="text-xl font-bold">Share character</h1>
          <FaWindowClose
            className="text-3xl cursor-pointer hover:text-red-600"
            onClick={() => onClose?.(false)}
          />
        </div>
        <div className="w-full h-[200px]">
          <Image
            src={image}
            alt="hero-bg"
            className="w-full h-full object-cover mt-3"
            width={600}
            height={200}
          />
        </div>
        <div className="flex gap-x-3 px-3 mt-5 max-[380px]:flex-col max-[380px]:gap-y-3">
          <Button onClick={share}>
            Twitter
            <AiOutlineClose className="text-2xl ml-2" />
          </Button>
          <Button onClick={clipboard}>
            {isCopied ? 'Copiado!' : 'Copiar link'}
            <BsFillClipboard2HeartFill className="text-2xl ml-2" />
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
