// From https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
type AnyJson = boolean | number | string | null | JsonArray | JsonMap | {};
type JsonMap = { [key: string]: AnyJson };
type JsonArray = AnyJson[];
