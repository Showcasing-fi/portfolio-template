import SectionHeading from '../components/SectionHeading.jsx';

function AboutSection({ points }) {
  return (
    <section className="section layout-shell" id="about">
      <SectionHeading
        eyebrow="About"
        title="A maintainable base to customize"
        description="This starter keeps the first version simple while leaving room for the frontend to evolve."
      />

      <div className="about-grid">
        {points.map((point) => (
          <article className="surface-card" key={point}>
            <p>{point}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;
