interface Window {
  gtag: (
    command: "config",
    trackingId: string,
    config?: { page_path?: string }
  ) => void;
}
