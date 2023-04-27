const buttonElement = document.getElementById('procesar')
const paises = [
  'PERU',
  'COLOMBIA',
  'CHILE',
  'ZONA MIXCOAC',
  'MEXICO',
  'ZONA ALVARO COLOMBIA',
]

buttonElement.addEventListener('click', () => {
  let listJobs = {}
  const cards = document.querySelectorAll('div[class*=similarJob-0-2-766]')
  cards.forEach((card) => {
    const dataCard = {
      title: card.querySelector('a').title,
      pais:
        paises.filter((pais) =>
          card
            .querySelector('a[id*=vacante_similar] > p')
            .innerHTML.toUpperCase()
            .includes(pais),
        )[0] ?? 'SIN PAIS',
      salary: card.querySelector('[id*=vacante_similar_salario]').innerText,
    }

    listJobs = {
      ...listJobs,
      [dataCard.pais]: handleJson(listJobs[dataCard.pais], dataCard),
    }
  })
  console.log(listJobs)
})

function handleJson(listSalary = [], card) {
  let nuevoObjeto = [...listSalary]
  const index = listSalary.findIndex((item) => item.salary === card.salary)
  if (index == -1) {
    nuevoObjeto.push({ salary: card.salary, jobs: [card.title] })
  } else {
    nuevoObjeto[index].jobs.push(card.title)
  }
  return nuevoObjeto
}
