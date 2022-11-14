import React from "react";

import { Header } from "@/presentation/components";
import { Router } from "@/main/routes";
import { ReactQueryClientProvider } from "@/infra/externals";

function App() {
  return (
    <div className="App">
      <Header />
      <ReactQueryClientProvider>
        <Router />
      </ReactQueryClientProvider>
    </div>
  );
}

export default App;
