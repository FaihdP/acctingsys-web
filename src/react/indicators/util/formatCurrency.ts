export default function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO').format(value);
}