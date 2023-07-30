import ErrorInfo from "@/components/ErrorInfo";
import MyContainer from "@/components/MyContainer";
import { APP_PAGES } from "@/utils/appPages";
import { useRouter } from "next/router";
import React from "react";
import { tv } from "tailwind-variants";

const buttonStyle = tv({
  base: `
     px-8 py-4 border-2 border-red-500 hover:bg-red-600
    text-xl text-red-500 font-bold hover:text-white transition-all
  `,
});

export default function ErrorPage() {
  const router = useRouter();
  const isHome = router.pathname === APP_PAGES.home;

  function handleReturnHome() {
    router.push(APP_PAGES.home);
  }

  return (
    <MyContainer className="h-screen">
      <div className="h-full w-full gap-8 flex flex-col justify-center items-center">
        <ErrorInfo />
        {!isHome && (
          <button className={buttonStyle()} onClick={handleReturnHome}>
            return to home page.
          </button>
        )}
      </div>
    </MyContainer>
  );
}
