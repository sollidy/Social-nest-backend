export const escapeRegex = (s: string) => {
  return s.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
};
