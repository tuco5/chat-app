export function avatarFallback(str: string | null | undefined) {
  if (!str) return "";
  const initials = str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return initials.length > 2 ? initials.slice(0, 2) : initials;
}
