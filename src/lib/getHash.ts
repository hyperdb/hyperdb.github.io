import Sqids from "sqids";

const getHash = (str: string): string => {
  const codePoints = [];

  for (const char of str) {
    const codePoint = char.codePointAt(0);
    if (codePoint !== undefined) {
      codePoints.push(codePoint);
    }
  }

  if (codePoints.length === 0) {
    return "";
  }
  const sqids = new Sqids();
  const sqid = sqids.encode(codePoints);

  return sqid;
};
export default getHash;
