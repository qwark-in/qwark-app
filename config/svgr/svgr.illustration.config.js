module.exports = {
  native: true,
  typescript: true,
  jsxRuntime: "automatic",
  icon: false,

  // Keep original SVG exactly as-is
  expandProps: false,

  svgo: true,
  svgoConfig: {
    plugins: [
      { name: "removeXMLNS", active: true },
      { name: "removeXlink", active: true },
    ],
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
