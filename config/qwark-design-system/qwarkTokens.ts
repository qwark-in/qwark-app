import figmaTokens from "./qwarkDesignTokens.json";

const SPACING_INDEX = 0;
const BASE_COLOR_PALETTE_INDEX = 1;
const SEMANTIC_COLOR_PALETTE_INDEX = 2;

const getSpaceTokens = (tokens: typeof figmaTokens) => {
  const spaceEntries =
    tokens[SPACING_INDEX]["Spacing Universal"]?.modes["Mode 1"];
  const result: { [key: string]: number } = {};
  for (const key in spaceEntries) {
    result[key] = spaceEntries[key]["$value"];
  }
  result["true"] = result["1"];
  return result;
};

export const space = getSpaceTokens(figmaTokens);

const getBaseColorTokens = (tokens: typeof figmaTokens) => {
  const colorEntries =
    tokens[BASE_COLOR_PALETTE_INDEX]["Base Palette"]?.modes["Mode 1"];
  const result: { [key: string]: string } = {};
  for (const colorKey in colorEntries) {
    const colorValues = colorEntries[colorKey];

    for (const valueKey in colorValues) {
      result[
        `${colorKey.replace(" ", "").toLowerCase()}/${valueKey.toLowerCase()}`
      ] = colorValues[valueKey]["$value"];
    }
  }

  return result;
};

export const baseColor = getBaseColorTokens(figmaTokens);

const _extractBaseColorToken = (semanticTokenString: string): string => {
  const sts = semanticTokenString;

  // sanity check
  if (sts[0] === "{" && sts[sts.length - 1] === "}") {
    const stsTokens = sts.substring(1, sts.length - 1).split(".");
    const [colorName, colorValue] = stsTokens;
    return `${colorName
      .replace(" ", "")
      .toLowerCase()}/${colorValue.toLowerCase()}`;
  }

  // Default return
  return "system/temp";
};

const getSemanticColorTokens = (tokens: typeof figmaTokens) => {
  const semanticLightColorEntries =
    tokens[SEMANTIC_COLOR_PALETTE_INDEX]["Semantic Palette"]?.modes[
      "Light Mode"
    ];
  // For future use
  const semanticDarkColorEntries =
    tokens[SEMANTIC_COLOR_PALETTE_INDEX]["Semantic Palette"]?.modes[
      "Dark Mode"
    ];
  const lightResult: { [key: string]: string } = {};
  const darkResult: { [key: string]: string } = {};

  for (const entryKey in semanticLightColorEntries) {
    const entryValue = semanticLightColorEntries[entryKey];
    for (const internalKey in entryValue) {
      const internalValue = entryValue[internalKey];
      lightResult[`${entryKey}/${internalKey}`] =
        baseColor[_extractBaseColorToken(internalValue["$value"])];
    }
  }

  return [lightResult, darkResult];
};

export const semanticColor = getSemanticColorTokens(figmaTokens);
