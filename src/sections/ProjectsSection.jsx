import SectionHeading from '../components/SectionHeading.jsx';

function ProjectsSection({ projects }) {
  return (
    <section className="section layout-shell" id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Starter cards for real case studies"
        description="Use these placeholders to define the structure of your future project pages, writeups, or external links."
      />

      <div className="project-grid">
        {projects.map((project) => (
          <article className="surface-card project-card" key={project.title}>
            <div className="project-card__content">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>

            <ul className="tag-list" aria-label={`${project.title} technologies`}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <a className="project-card__link" href={project.href}>
              {project.linkLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
