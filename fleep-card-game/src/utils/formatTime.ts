export function formatTime(time: number) {
  return time <= 60
    ? `${time} seg`
    : `${Math.floor(time / 60)} m ${Math.floor(time % 60)} s`;
}
