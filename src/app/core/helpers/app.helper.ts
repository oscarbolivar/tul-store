export function getUniqueId(): number {
  return Math.floor(Math.random() * new Date().valueOf());
}
