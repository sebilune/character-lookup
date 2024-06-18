import React, { useEffect } from "react";

const FaviconUpdate: React.FC = () => {
  useEffect(() => {
    const prefersLightMode: MediaQueryList = window.matchMedia(
      "(prefers-color-scheme: light)"
    );
    const faviconLink: HTMLLinkElement | null =
      document.querySelector('link[rel="icon"]');

    const updateIcon = (): void => {
      if (faviconLink) {
        faviconLink.href = prefersLightMode.matches
          ? "./src/assets/search-light.svg"
          : "./src/assets/search.svg";
      }
    };

    updateIcon();

    // Listen for changes to the user's system color scheme
    prefersLightMode.addEventListener("change", updateIcon);

    return () => {
      prefersLightMode.removeEventListener("change", updateIcon);
    };
  }, []);

  return null;
};

export default FaviconUpdate;
