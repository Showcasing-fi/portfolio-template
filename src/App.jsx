import { useEffect } from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import HeroSection from './sections/HeroSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import {
  aboutPoints,
  contactLinks,
  navItems,
  projects,
  siteConfig,
} from './data/siteContent.js';

function App() {
  useEffect(() => {
    document.title = siteConfig.siteTitle;
  }, []);

  return (
    <div className="site-shell">
      <SiteHeader navItems={navItems} siteTitle={siteConfig.siteTitle} />

      <main className="site-main">
        <HeroSection hero={siteConfig.hero} deployPath={siteConfig.deployPath} />
        <AboutSection points={aboutPoints} />
        <ProjectsSection projects={projects} />
        <ContactSection links={contactLinks} />
      </main>

      <footer className="site-footer">
        <div className="layout-shell footer__inner">
          <p>{siteConfig.siteTitle}</p>
          <p>Configured deploy path: {siteConfig.deployPath}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
