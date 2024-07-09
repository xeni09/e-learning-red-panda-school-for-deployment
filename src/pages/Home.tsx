import React from "react";
import Section from "../components/Section";
import heroBanner from "../assets/hero-banner.png";


const Home: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default Home;