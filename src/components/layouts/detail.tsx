import React from "react";

export default function Detail({ children }: { children: React.ReactNode }) {
  const handleBack = () => {
    localStorage.removeItem('detail')

    window.history.back();
  }

  return (
    <main className="lg:py-12">
      <div className="back">
        <button onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>

      <div className="detail-container">
        {children}
      </div>
    </main>
  )
}
