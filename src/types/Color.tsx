type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

//TODO : specify color list
type COLOR_NAME = `${string}`;

export type Color = RGB | RGBA | HEX | COLOR_NAME;
