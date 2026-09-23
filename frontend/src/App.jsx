import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <>
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
      <Toaster />
      <Analytics />
    </>
  );
}
