import React, { useEffect } from "react";
import Hero from "./../Components/Hero/Hero";
import Recommend from "../Components/Recommend";
import ScrollToTop from "../Components/ScrollToTop.jsx";
import Services from "../Components/Services";
import Testimonials from "../Components/Testimonials";
import scrollreveal from "scrollreveal";
export default function App() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "50px",
      duration: 1000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        #hero,
        #services,
        #recommend,
        #testimonials,
        footer
        `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  return (
    <div>
      <ScrollToTop />
      <Hero />
      <Services />
      <Recommend />
      <Testimonials />
    </div>
  );
}
