# portfolio-template

`portfolio-template` is a lightweight Vite + React starter for independent portfolio sites hosted under `showcasing.fi/<username>/`.

This repository is a starting point, not a permanent constraint. Each generated portfolio should remain its own frontend repository and can later change its design, structure, and content freely.

## Real deployment contract

The actual contract for repositories created from this template is small:

- independent frontend repository
- static build output
- deployable to a user-specific subpath such as `/niko/`
- compatible with GitHub Actions -> FTPS -> Plesk

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
2. Update `portfolio.manifest.json`: set `username`, `deployPath`, and `siteTitle`.
3. Replace the placeholder content in `src/data/siteContent.js`.
4. Adjust styles and components as needed.
5. Ensure the required FTP secrets are available through organization or repository configuration.
6. Trigger deployment manually from the GitHub Actions tab when a maintainer is ready to publish.

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

- `username` is the source of truth for the deploy target
- `deployPath` must exactly match `/${username}/`
- the FTP user is assumed to be jailed directly into `httpdocs`
- the workflow computes the FTP-visible server directory as `/${username}/`
- `/` is always forbidden for portfolio repos
- placeholder values are allowed in the template, but deployment intentionally fails until the default deployment placeholders are replaced

Update this file before the first real deployment. The Vite build uses `deployPath` for the production base path, and the GitHub Actions workflow reads `username`, `deployPath`, and `outputDir` from the same manifest when deploying. `siteTitle` should also be updated so the generated portfolio does not keep the template title.

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
- FTP-visible target path: `/${username}/`

Because the FTP account is rooted directly to `httpdocs`, portfolio repos must not prepend `/httpdocs` in the workflow target. For example:

- `username: "niko"` -> public subpath `/niko/`
- computed FTP-visible target -> `/niko/`

From that jailed FTP session, deploying to `/niko/` lands in `httpdocs/niko/` on the server.

## GitHub Actions deployment

Workflow file:

- `.github/workflows/deploy-plesk.yml`

Deployment is manual by default for repositories created from this template. Pushes do not publish automatically. A maintainer must open the GitHub Actions tab and start the deploy workflow intentionally.

Triggers:

- `workflow_dispatch`

The real upload runs in the `deploy` job, which uses the GitHub Actions `production` environment. If that environment has required reviewers, GitHub pauses after manifest validation and build, then waits for approval before the FTPS deployment proceeds.

Expected organization or repository secrets:

- `FTP_HOST`
- `FTP_USERNAME`
- `FTP_PASSWORD`

These secrets are consumed only by the `deploy` job. The validation and build job does not reference FTP credentials.


The workflow computes the FTP target automatically from `portfolio.manifest.json`, assuming the FTP user already starts inside `httpdocs`:

- `username: "niko"` -> `/niko/`

The workflow intentionally fails before deployment if:

- `username` is missing
- `username` is still `your-username`
- `username` does not match `^(?=.{3,30}$)[a-z0-9]+(?:-[a-z0-9]+)*$`
- `deployPath` does not exactly match `/${username}/`
- the computed FTP target would be malformed
- the computed FTP target resolves to `/`

The workflow:

- validates the manifest
- installs dependencies with npm
- builds the static site
- computes the jailed FTP-visible directory from `username`
- passes the built output to the approval-gated deploy job
- deploys only the built output folder over FTPS after the `production` environment gate

This manual-only behavior is intentional. It keeps portfolio publishing moderated so maintainers can decide when a repository is ready to go live.

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
- keep deployment compatible with GitHub Actions -> FTPS -> Plesk

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
