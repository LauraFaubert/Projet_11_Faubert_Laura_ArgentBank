import featureJson from "../../data/feature.json";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";

function HomePage() {
  return (
    <>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featureJson.features.map((feature, index) => (
          <Features
            key={"feature" + index}
            image={feature.image}
            alt={feature.alt}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </>
  );
}

export default HomePage;
