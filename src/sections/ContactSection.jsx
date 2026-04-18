import SectionHeading from '../components/SectionHeading.jsx';

function ContactSection({ links }) {
  return (
    <section className="section layout-shell" id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Replace these placeholders with real contact details"
        description="Keep the structure if it helps, or swap this section for your own CTA, form embed, or booking link."
      />

      <div className="contact-grid">
        {links.map((link) => {
          const isExternal = link.href.startsWith('http');

          return (
            <a
              className="surface-card contact-card"
              href={link.href}
              key={link.label}
              rel={isExternal ? 'noreferrer' : undefined}
              target={isExternal ? '_blank' : undefined}
            >
              <span className="contact-card__label">{link.label}</span>
              <strong>{link.value}</strong>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default ContactSection;
