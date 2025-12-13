/**
 * Web Font Loader for Expo Web
 *
 * Dynamically injects @font-face rules at runtime to work around Expo Web's
 * CSS bundler limitation that prevents importing local resources in CSS.
 *
 * This solution uses require() to bundle fonts and inject them into the DOM
 * at runtime, allowing custom fonts to render on web while maintaining
 * compatibility with native platforms (which use expo-font).
 */

export function injectWebFonts() {
  if (typeof document === "undefined") {
    return; // Server-side rendering or non-browser environment
  }

  const style = document.createElement("style");

  // Import font files using require() - Expo's webpack bundler will resolve these
  const barlowRegular = require("../assets/fonts/barlow/Barlow-Regular.ttf");
  const barlowMedium = require("../assets/fonts/barlow/Barlow-Medium.ttf");
  const barlowSemibold = require("../assets/fonts/barlow/Barlow-SemiBold.ttf");
  const robotoSerifRegular = require("../assets/fonts/roboto-serif/RobotoSerif-Regular.ttf");
  const robotoSerifMedium = require("../assets/fonts/roboto-serif/RobotoSerif-Medium.ttf");
  const robotoSerifSemibold = require("../assets/fonts/roboto-serif/RobotoSerif-SemiBold.ttf");

  // Inject @font-face rules into the style element
  style.innerHTML = `
    @font-face {
      font-family: "Barlow";
      src: url("${barlowRegular}") ;
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: "Barlow";
      src: url("${barlowMedium}") ;
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: "Barlow";
      src: url("${barlowSemibold}") ;
      font-weight: 600;
      font-style: normal;
    }
    @font-face {
      font-family: "RobotoSerif";
      src: url("${robotoSerifRegular}") ;
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: "RobotoSerif";
      src: url("${robotoSerifMedium}") ;
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: "RobotoSerif";
      src: url("${robotoSerifSemibold}") ;
      font-weight: 600;
      font-style: normal;
    }
  `;

  document.head.appendChild(style);
  // Normalize any font-weight CSS variables that were generated with a trailing
  // "px" (e.g. "400px") — those are invalid for `font-weight` and prevent
  // emphasized variants from selecting the next weight. We compute the
  // computed value for each typography class and re-inject corrected numeric
  // variables without units.
  try {
    const selectors = [
      ".font_body",
      ".font_label",
      ".font_title",
      ".font_headline",
      ".font_display",
    ];

    const vars = [
      "--f-weight-4",
      "--f-weight-xsmall",
      "--f-weight-small",
      "--f-weight-medium",
      "--f-weight-large",
      "--f-weight-primary",
      "--f-weight-emphasized",
    ];

    const temp = document.createElement("div");
    document.body.appendChild(temp);

    let normalizedRules = "";

    selectors.forEach((sel) => {
      temp.className = sel.slice(1);
      const comp = getComputedStyle(temp);
      let props = "";
      vars.forEach((v) => {
        const raw = comp.getPropertyValue(v).trim();
        if (!raw) return;
        let normalized = raw;
        if (normalized.endsWith("px")) {
          normalized = normalized.slice(0, -2).trim();
        }
        if (normalized) {
          props += `${v}: ${normalized}; `;
        }
      });
      if (props) {
        normalizedRules += `:root ${sel} { ${props} }\n`;
      }
    });

    temp.remove();

    if (normalizedRules) {
      const normStyle = document.createElement("style");
      normStyle.innerHTML = normalizedRules;
      document.head.appendChild(normStyle);
    }
  } catch (e) {
    // Non-fatal — fail gracefully if the DOM inspection isn't possible.
    // eslint-disable-next-line no-console
    console.warn("normalizeFontWeights failed:", e);
  }
}
