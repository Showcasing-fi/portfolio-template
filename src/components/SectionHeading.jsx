function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="section-heading">
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}

export default SectionHeading;
