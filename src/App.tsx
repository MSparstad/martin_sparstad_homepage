import React from "react";
import ListGroup from "./Components/listGroup";
import Header from "./Components/header";
import HeroSection from "./Components/heroSection";
import Footer from "./Components/footer";


function App() {
  return (
    <div className="body-wrapper">
      <Header />
      <main>
        <div>
          <HeroSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;