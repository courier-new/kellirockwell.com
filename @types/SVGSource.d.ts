type SVGSource = string & { __brand: '@brand/svg-source' };

declare module '*.svg' {
  const value: SVGSource;
  export default value;
}
