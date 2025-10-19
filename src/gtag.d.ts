// This declares the gtag function on the global window object
// to make it available to TypeScript throughout the project.
interface Window {
    gtag: (command: 'config', targetId: string, config?: { page_path?: string }) => void;
  }
  