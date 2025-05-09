export default function getRandomColor() {
  const colors = ["#c0392b", "#e74c3c", "#9b59b6", "#8e44ad", "#2980b9", "#3498db", "#1abc9c", "#16a085", "#27ae60", "#2ecc71", "#f1c40f", "#f39c12", "#e67e22", "#d35400"]
  
  return colors[Math.floor(Math.random() * colors.length)]
}