'use client';

import { useRouter } from 'next/navigation';

const Title = ({ title, backHref = '/' }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(backHref); // only use backHref
  };

  return (
    <div className="flex flex-col">
      <img
        src="/images/icons/back.svg"
        alt="back"
        className="w-4 my-5 lg:my-6 cursor-pointer"
        onClick={handleBack}
      />
      <h2 className="font-semibold lg:text-[82px] text-4xl mb-12 text-site-dark-font uppercase">
        {title}
      </h2>
    </div>
  );
};

export default Title;
