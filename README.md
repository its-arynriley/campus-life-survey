# Web App Starter

This repository contains a reusable M0 web-app foundation. Consuming applications add their own domain models, authentication, workflows, integrations, and user experience; none of those product concerns belong here.

## Local development

Requirements: Node.js 20+, npm, and a Docker-compatible runtime such as Docker Desktop, Colima, or Rancher Desktop.

On macOS with Homebrew, the recommended lightweight setup is:

```sh
./scripts/setup-macos.sh

# Configure nvm once in your shell. Add these two lines to ~/.zshrc
# manually; do not append them every time you set up the project.
mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"
source ~/.zshrc

nvm install
nvm use
colima start
```

`Brewfile` installs shared tools. The setup script automatically selects Rancher Desktop for older Intel Macs running macOS 12 or earlier, and Colima for newer Intel Macs and Apple silicon. Rancher Desktop supplies the Docker CLI and Compose directly; the Colima path installs the Docker CLI and standalone Compose through Homebrew. The `.nvmrc` file keeps local development and CI on the same Node.js major version. Docker Desktop is not required.

For Rancher Desktop, set **Application → Environment → PATH management** to **Automatic**. Restart the terminal afterward so the Rancher utilities and Compose plugin are available.

To choose a runtime explicitly:

```sh
WEB_APP_STARTER_RUNTIME=rancher ./scripts/setup-macos.sh
WEB_APP_STARTER_RUNTIME=colima ./scripts/setup-macos.sh
```

```sh
cp .env.example .env.local
./scripts/compose.sh up -d postgres
npm install
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`. The demo survey is available at `http://localhost:3000/survey`.
The survey prototype is intentionally in-memory only: it does not call the database, API, or any persistence layer, and it is meant to demonstrate the UX before production submission work is connected.
The operational health endpoint is `http://localhost:3000/api/health`.

## Stop the local environment

In the terminal running `npm run dev`, press `Ctrl+C` to stop the Next.js development server.

Stop the PostgreSQL container and remove the project network with:

```sh
./scripts/compose.sh down
```

When you are finished with all container-based projects, stop the Colima runtime with:

```sh
colima stop
```

Stopping Colima is optional if you plan to keep using containers.

### If Homebrew installation was interrupted

Pressing `Ctrl+C` normally stops the active Homebrew command safely. Check for an active Homebrew process with:

```sh
ps aux | grep '[b]rew'
```

If no install process is listed, rerun `./scripts/setup-macos.sh`. An existing Homebrew `node` installation can remain on the machine; nvm takes precedence after `nvm use` and does not require removing it.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Pull requests run the same checks against an isolated PostgreSQL service in GitHub Actions. Configure Preview and Production with separate `DATABASE_URL` values; production credentials belong only in approved secret stores.
