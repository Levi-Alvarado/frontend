const MoneyCLPFormat = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value)
}
export const toPascalCase = (str) => {
  const lower = str.toLowerCase()
  return lower.replace(/(^| )(\w)/g, (x) => x.toUpperCase())
}

export const toMoneyFormat = (number) => {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  })
  return formatter.format(number)
}

export default MoneyCLPFormat
