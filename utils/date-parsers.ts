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

export const parseDateString = (dateString: string) => {
  const [date] = dateString.split('T')

  return date
}

export const parseDateTimeString = (dateString: string) => {
  const [date] = dateString.split('T')
  const [year, month] = date.split('-')

  return `${MONTHS[+month - 1]} ${year}`
}
