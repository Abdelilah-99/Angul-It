# MyAngularApp

A modern Angular application featuring a multi-component architecture with captcha validation, toast notifications, and server-side rendering support.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

## Project Overview

This application includes the following key features:
- **Home Component**: Main landing page of the application
- **Captcha Component**: Integrated captcha validation for security
- **Result Component**: Displays results based on user interactions
- **Toast Service**: Notification system for user feedback
- **Server-Side Rendering**: Support for SSR with Angular Universal

## Project Structure

```
src/
├── app/
│   ├── captcha-component/      # Captcha validation component
│   ├── home-component/         # Home/landing page component
│   ├── result-component/       # Results display component
│   ├── toast/
│   │   ├── component/          # Toast notification UI component
│   │   └── service/            # Toast notification service
│   ├── app.routes.ts           # Application routing configuration
│   └── app.ts                  # Main application component
├── index.html                  # Main HTML entry point
├── main.ts                     # Bootstrap application
├── main.server.ts              # Server-side rendering bootstrap
└── server.ts                   # Express server configuration
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
## Components

### Home Component
The main landing page component that serves as the entry point for users. Located in `src/app/home-component/`.

### Captcha Component
Provides CAPTCHA validation functionality to enhance application security. Located in `src/app/captcha-component/`.

### Result Component
Displays results and feedback to users based on their interactions. Located in `src/app/result-component/`.

### Toast Service & Component
A notification system with:
- **Toast Service** (`src/app/toast/service/`): Manages toast notifications
- **Toast Component** (`src/app/toast/component/`): Renders toast UI elements

## Scripts

```bash
# Development server
npm start

# Build for production
npm run build
```

## Contributing

When adding new features:
1. Create a new component using Angular CLI: `ng generate component component-name`
2. Update routing in `app.routes.ts` if needed
3. Write unit tests for new components
4. Update this README with new features and components

## License

This project is licensed under the MIT License.