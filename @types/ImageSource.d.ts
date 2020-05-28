type ImageSource = string & { __brand: '@brand/image-source' };

declare module '*.png' {
  const value: ImageSource;
  export default value;
}

declare module '*.jpg' {
  const value: ImageSource;
  export default value;
}

declare module '*.jpeg' {
  const value: ImageSource;
  export default value;
}

declare module '*.gif' {
  const value: ImageSource;
  export default value;
}

declare module '*.bmp' {
  const value: ImageSource;
  export default value;
}
