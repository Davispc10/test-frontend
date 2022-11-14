import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeHomeComponent, makeCharacterDetailsComponent } from "@/main/factories/presentation/views";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={makeHomeComponent()} />
        <Route path="/characters/details/:id" element={makeCharacterDetailsComponent()} />
        <Route path="*" element={makeHomeComponent()} />
      </Routes>
    </BrowserRouter>
  );
};
