import Footer from "./Components/footer";
import Header from "./Components/header";

function Music() {
  return (
    <div className="body-wrapper">
      <Header />
      <main>
        <div className="container">
          <audio src="src\assets\Audio\HawaH.wav" preload="" controls>
            Hawah
          </audio>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Music;
