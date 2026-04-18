# portfolio-template

`portfolio-template` is a lightweight Vite + React starter for independent portfolio sites hosted under `showcasing.fi/<username>/`.

This repository is a starting point, not a permanent constraint. Each generated portfolio should remain its own frontend repository and can later change its design, structure, and content freely.

## Real deployment contract

The actual contract for repositories created from this template is small:

- independent frontend repository
- static build output
- deployable to a user-specific subpath such as `/niko/`
- compatible with GitHub Actions -> FTP -> Plesk

Everything else in this repo is just a practical default starter.

## Stack

- JavaScript
- React + Vite
- npm
- static single-page portfolio sections
- no backend
- no database
- no authentication

## Create the first real repo

1. Create a new repository from this template, for example `portfolio-niko`.
2. Update `portfolio.manifest.json`, especially `username` and `deployPath`.
3. Replace the placeholder content in `src/data/siteContent.js`.
4. Adjust styles and components as needed.
5. Add the required GitHub secrets so the deployment workflow can publish the build output.

## `portfolio.manifest.json`

This file is the small deployment and build contract for the template.

```json
{
  "username": "your-username",
  "deployPath": "/your-username/",
  "siteTitle": "Your Portfolio",
  "outputDir": "dist"
}
```

What each field means:

- `username`: descriptive identifier for the portfolio owner
- `deployPath`: the public subpath where the site will live, such as `/niko/`
- `siteTitle`: default site title used by the app
- `outputDir`: static build output folder used by Vite and the deployment workflow

Deployment safety rules:

- `username` is the source of truth for the FTP target directory
- `deployPath` must exactly match `/${username}/`
- the workflow computes the FTP server directory as `/httpdocs/${username}/`
- placeholder values are allowed in the template, but deployment intentionally fails until they are replaced

Update this file before the first real deployment. The Vite build uses `deployPath` for the production base path, and the GitHub Actions workflow reads `username`, `deployPath`, and `outputDir` from the same manifest when deploying.

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Notes:

- local development runs from `/` for convenience
- production builds use the manifest `deployPath`
- `npm run preview` is the cleanest local way to verify the built site under production-like asset paths

## Build for production

```bash
npm run build
```

By default, the build output goes to `dist/`. If you change `outputDir` in `portfolio.manifest.json`, both Vite and the deploy workflow will follow it.

## Subpath deployment

The template is designed to work under a user-specific subpath such as `https://showcasing.fi/niko/`.

How it is handled:

- Vite reads `deployPath` from `portfolio.manifest.json` during production builds
- the generated asset URLs are prefixed for the configured subpath
- internal page navigation uses section anchors instead of a heavy router
- `public/.htaccess` is included so future client-side routes can still fall back to `index.html` inside a subdirectory deployment

The intended alignment is:

- frontend deploy path: `/${username}/`
- FTP target path: `/httpdocs/${username}/`

If the site is deployed to `/httpdocs/niko/`, then `deployPath` must be `/niko/`.

## GitHub Actions deployment

Workflow file:

- `.github/workflows/deploy-plesk.yml`

Triggers:

- push to `main`
- `workflow_dispatch`

Expected repository secrets:

- `FTP_HOST`
- `FTP_USERNAME`
- `FTP_PASSWORD`

Portfolio repos do not use `FTP_REMOTE_DIR`.

Instead, the workflow computes the FTP target automatically from `portfolio.manifest.json`:

- `username: "niko"` -> `/httpdocs/niko/`

The workflow intentionally fails before deployment if:

- `username` is missing
- `username` is still `your-username`
- `username` does not match `^(?=.{3,30}$)[a-z0-9]+(?:-[a-z0-9]+)*$`
- the computed FTP target would be malformed
- `deployPath` does not exactly match `/${username}/`

The workflow:

- validates the manifest
- installs dependencies with npm
- builds the static site
- computes the remote FTP directory from `username`
- deploys only the built output folder over FTP

No credentials are hardcoded in the repository.

## Starter defaults vs contract

Starter defaults in this repo:

- one-page section layout
- placeholder copy
- example project cards
- simple shared styling and component structure

Actual long-term requirements:

- keep the repository independent
- keep the output static
- keep deployment compatible with a user-specific subpath
- keep deployment compatible with GitHub Actions -> FTP -> Plesk

## Default project structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- deploy-plesk.yml
|-- public/
|   `-- .htaccess
|-- scripts/
|   `-- portfolio-manifest.mjs
|-- src/
|   |-- components/
|   |-- data/
|   |-- sections/
|   `-- styles/
|-- index.html
|-- package.json
|-- portfolio.manifest.json
`-- vite.config.js
```

## Customization

After creating a real portfolio repository, the user can customize the frontend however they want. They can add new pages, replace the starter sections, change the visual design, or reorganize the source tree.

The important part is not preserving this exact layout. The important part is keeping the final repository as an independently deployable static frontend that works at its assigned subpath on `showcasing.fi`.
