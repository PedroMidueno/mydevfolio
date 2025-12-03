const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

export const extractDateString = (dateString: string) => {
  const [date] = dateString.split('T')

  return date
}

export const parseDateToMonthAndYear = (dateString: string) => {
  const [date] = dateString.split('T')
  const [year, month] = date.split('-')

  return `${MONTHS[+month - 1]} ${year}`
}
