// svgr.config.js
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
      {
        name: "convertColors",
        params: {
          currentColor: true,
        },
      },
    ],
  },

  svgProps: {
    height: "{size}",
    width: "{size}",
    color: "{color}",
    fill: "none",
    focusable: "{false}",
  },

  template({ imports, componentName, jsx }, { tpl }) {
    const cleanName = componentName.replace(/^Svg/, "");

    return tpl`
${imports}

export type IconProps =  {
  size?: number
  color?: string
}

export const ${cleanName} = ({
  size = 24,
  color = 'currentColor',
}: IconProps) => (
  ${jsx}
)

export default ${cleanName}
`;
  },
};
