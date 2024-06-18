import "./App.css";
import NavBar from "./components/NavBar.tsx";
import Section from "./components/Section";
import heroBanner from "./assets/hero-banner.png";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Section
        color="#C1510E"
        image={heroBanner}
        text="This is a blue section"
        title={"Holi"}
        imagePosition={"left"}
        imageSize={200}
      />
      <Section
        color="#fff"
        image={heroBanner}
        text="This is a red section"
        title={"Holi"}
        imagePosition={"right"}
        imageSize={200}
      />
      <Footer></Footer>
    </>
  );
}

export default App;
