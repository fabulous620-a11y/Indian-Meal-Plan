import "./globals.css";

export const metadata = {
  title: "Weekly Family Meal Plan",
  description: "A week of nutritious Indian meals with step-by-step recipes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
