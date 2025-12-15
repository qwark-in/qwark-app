module.exports = {
  native: true,
  icon: true,
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
      { name: "removeXlink", active: true },
    ],
  },

  svgProps: {
    height: "{size}",
    width: "{size}",
    fill: "none",
    focusable: "{false}",
  },

  template({ imports, componentName, jsx }, { tpl }) {
    const cleanName = componentName.replace(/^Svg/, "");
    return tpl`
${imports}

export type BankIconProps =  {
  size?: number
}

export const ${cleanName} = ({
  size = 24,
}: BankIconProps) => (
  ${jsx}
)

export default ${cleanName}
`;
  },
};
