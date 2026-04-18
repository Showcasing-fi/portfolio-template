function HeroSection({ hero, deployPath }) {
  return (
    <section className="hero layout-shell" id="top">
      <div className="hero__content">
        <p className="section-heading__eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="hero__description">{hero.description}</p>

        <div className="hero__actions">
          <a className="button button--primary" href={hero.primaryAction.href}>
            {hero.primaryAction.label}
          </a>
          <a className="button button--secondary" href={hero.secondaryAction.href}>
            {hero.secondaryAction.label}
          </a>
        </div>
      </div>

      <aside className="surface-card hero__panel">
        <p className="hero__panel-label">Deployment contract</p>

        <ul className="hero__facts" aria-label="Starter qualities">
          {hero.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>

        <div className="hero__deploy-path">
          <span>Configured subpath</span>
          <strong>{deployPath}</strong>
        </div>
      </aside>
    </section>
  );
}

export default HeroSection;
