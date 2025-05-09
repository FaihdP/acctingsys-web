const getInitalDateRange = () => {
  const now = new Date()
  const start = new Date()
  start.setUTCFullYear(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate())
  return {
    start: start.toISOString().split("T")[0],
    end: now.toISOString().split("T")[0],
  }
}

export default getInitalDateRange