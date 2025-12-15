// svgr.config.js
module.exports = {
  native: true,
  icon: false,
  typescript: true,
  expandProps: false,
  jsxRuntime: "automatic",

  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "removeXMLNS",
        active: true,
      },
    ],
  },

  svgProps: {
    height: "{height}",
    fill: "none",
    focusable: "{false}",
  },

  template({ imports, componentName, jsx }, { tpl }) {
    const cleanName = componentName.replace(/^Svg/, "");
    return tpl`
${imports}

export type BankIconProps =  {
  height?: number
}

export const ${cleanName} = ({
  height = 24,
}: BankIconProps) => (
  ${jsx}
)

export default ${cleanName}
`;
  },
};
