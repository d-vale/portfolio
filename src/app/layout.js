import "./global.css";
import Preloader from "@/components/ui/preloader";
import Header from "@/components/sections/header";
import CallToAction from "@/components/sections/callToAction";
import Footer from "@/components/sections/footer";
import MotionProvider from "@/components/motion/MotionProvider";
import PageTransition from "@/components/motion/PageTransition";
import Cursor from "@/components/motion/Cursor";
import Ambient from "@/components/motion/Ambient";
import ScrollProgress from "@/components/motion/ScrollProgress";

export const metadata = {
  title: "Daniel Vale",
  description: "Portfolio de Daniel Vale",
};

// Pose le thème avant le premier rendu pour éviter le flash sombre → clair
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.pl{display:none!important}`}</style>
        </noscript>
      </head>
      <body suppressHydrationWarning>
        <MotionProvider>
          <Ambient />
          <ScrollProgress />
          <Preloader />
          <Header />
          <main id="main">{children}</main>
          <CallToAction />
          <Footer />
          <PageTransition />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
