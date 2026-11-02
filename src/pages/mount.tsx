import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import "../App.css";
import { SiteLayout } from "../site/Layout";

/** Renders a content page inside the shared header and footer. */
export const mount = (page: ReactNode) =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <SiteLayout>{page}</SiteLayout>
    </StrictMode>,
  );
