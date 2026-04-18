import manifest from '../../portfolio.manifest.json';

const username = manifest.username || 'your-username';
const deployPath = manifest.deployPath || '/your-username/';
const siteTitle = manifest.siteTitle || 'Your Portfolio';

export const siteConfig = {
  siteTitle,
  username,
  deployPath,
  hero: {
    eyebrow: 'showcasing.fi starter',
    title: siteTitle,
    description:
      'A clean base for an independent portfolio frontend that builds to static files and deploys under a user-specific subpath.',
    primaryAction: {
      label: 'View projects',
      href: '#projects',
    },
    secondaryAction: {
      label: 'Contact',
      href: '#contact',
    },
    facts: ['Static output', 'Subpath aware', 'FTP deployable'],
  },
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const aboutPoints = [
  'Use this template as a practical starting point and replace the placeholder copy with real portfolio content.',
  'Keep the final repository independent so the frontend can evolve without being constrained by this starter.',
  'Update the manifest before the first real deployment so production assets point to the correct subpath.',
];

export const projects = [
  {
    title: 'Project One',
    summary:
      'Describe the problem, your role, the stack, and the outcome in two or three concise sentences.',
    tags: ['React', 'Static site', 'Case study'],
    href: '#contact',
    linkLabel: 'Add project link',
  },
  {
    title: 'Project Two',
    summary:
      'Use this card for a product build, redesign, freelance case, or personal experiment that shows range.',
    tags: ['UI system', 'Frontend', 'Performance'],
    href: '#contact',
    linkLabel: 'Add project link',
  },
  {
    title: 'Project Three',
    summary:
      'Keep the starter generic now, then swap in real screenshots, metrics, and links when creating a real portfolio repo.',
    tags: ['Portfolio', 'Content', 'Deployment'],
    href: '#contact',
    linkLabel: 'Add project link',
  },
];

export const contactLinks = [
  {
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },
  {
    label: 'GitHub',
    value: `github.com/${username}`,
    href: `https://github.com/${username}`,
  },
  {
    label: 'LinkedIn',
    value: `linkedin.com/in/${username}`,
    href: `https://www.linkedin.com/in/${username}/`,
  },
];
