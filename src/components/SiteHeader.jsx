function SiteHeader({ navItems, siteTitle }) {
  return (
    <header className="site-header">
      <div className="layout-shell site-header__inner">
        <a className="site-header__brand" href="#top">
          <span className="site-header__brand-mark">SF</span>
          <span>{siteTitle}</span>
        </a>

        <nav aria-label="Primary navigation">
          <ul className="site-header__nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
