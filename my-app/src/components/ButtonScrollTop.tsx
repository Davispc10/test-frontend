import React from "react";

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-10 right-10 p-3 bg-zinc-600 text-white rounded"
    >
      Voltar ao Topo
    </button>
  );
};

export default ScrollToTopButton;
