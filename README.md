<div align="center">
  <h1 style="margin: 0;">Medi-Connect</h1>
  <p></p>
  <a href="https://www.npmjs.com/package/nest-next"><img src="https://img.shields.io/npm/v/nest-next?style=flat-square" alt="npm"></a> <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"></a> <a href="https://github.com/kyle-mccarthy/nest-next/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="GitHub license"></a></p>

</div>

> A NextJS frontend and NestJS backend. Database is PostgreSql.

<!-- vim-markdown-toc GFM -->

### Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Peer Dependencies](#peer-dependencies)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

<!-- vim-markdown-toc -->

### Installation

```bash
yarn install

# or

npm install
```

### Peer Dependencies

- `react`
- `react-dom`
- `next`

if you are using next.js with typescript which most likely is the case, you will need to also install the typescript types for react and react-dom.

### Usage

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
npm start
```

### Tech Stack
- **Frontend:** Next.js, Tailwind CSS, ShadCN
- **State Management:** Zustand
- **API:** tRPC
- **Authentication:** NextAuth.js (optional)

### Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature-branch`)
5. Create a pull request

### License

This project is licensed under the **MIT License**.

---

⭐ Star this repository if you found it useful!