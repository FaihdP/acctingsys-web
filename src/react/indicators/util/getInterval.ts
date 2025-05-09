export default function getInterval(dataLenght: number) {
  const maxTicks = 10
  return Math.floor(dataLenght / maxTicks)
}
