// svgr.static.config.js
module.exports = {
  native: true,
  typescript: true,
  jsxRuntime: "automatic",

  // Important: do NOT treat as icons
  icon: false,

  // Keep original SVG exactly as-is
  expandProps: false,

  svgo: true,
  svgoConfig: {
    plugins: [{ name: "removeXMLNS", active: true }],
  },

  template({ imports, componentName, jsx }, { tpl }) {
    // Optional: remove Svg prefix
    const cleanName = componentName.replace(/^Svg/, "");

    return tpl`
${imports}

export const ${cleanName} = () => (
  ${jsx}
)

export default ${cleanName}
`;
  },
};
