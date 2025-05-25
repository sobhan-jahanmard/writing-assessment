export function generateRandomAssessingTime(): string {
  const now = Date.now();
  const minHours = 6;
  const maxHours = 20;
  const minMs = minHours * 60 * 60 * 1000;
  const maxMs = maxHours * 60 * 60 * 1000;
  const randomMs = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  return new Date(now + randomMs).toISOString();
}
