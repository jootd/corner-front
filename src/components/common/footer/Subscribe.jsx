"use client";

import { useSubscribe } from "@/hooks/api/useSubscribe";

const Subscribe = () => {
  const { email, setEmail, handleSubmit, isPending, message } = useSubscribe();

  const isEnglish = (text) => /^[\u0000-\u007F]*$/.test(text.trim());
  const getFontClass = (text) => (isEnglish(text) ? "!font-clash" : "");

  return (
    <div className="max-w-md mx-auto px-4 mt-12 !font-clash text-site-dark-font uppercase">
      <h2 className="text-xl font-semibold mb-4">Never miss what's next</h2>

      <div className="border-b border-[#CDCDCD] flex items-center justify-between">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 bg-transparent border-none outline-none py text-lg font-semibold text-site-dark-font ${getFontClass(
            email
          )}`}
        />
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-4 font-semibold disabled:opacity-50 cursor-pointer"
        >
          <h2>{isPending ? "Sending..." : "Subscribe"}</h2>
          <img src="/images/icons/arrow-right.svg" alt="arrow" />
        </button>
      </div>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default Subscribe;
