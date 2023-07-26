//Работа с JSON

// const car = {
//     model: 'Tesla',
//     year: 2023,
// }

// const jsonObject = JSON.stringify(car)

// console.log(jsonObject)

// const parsedJsonToObject = JSON.parse(jsonObject)

// console.log(parsedJsonToObject)

const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []


filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase()
    // const { value } = event.target //деструктуризация
    const filteredUsers = USERS.filter((user) => 
        user.name.toLowerCase().includes(value)
    )
    render(filteredUsers) // почему render вызывается здесь?
})

async function start() {
    list.innerHTML = '⟳ Loading...'
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users') //возвращает promise
        // console.log(resp)
        const data = await resp.json() //resp.json() тоже promise
        //искусственная задержка
        setTimeout(() => {
            USERS = data
            render(data)
        }, 2000)
    } catch (err) {
        list.style.color = 'red' //почему red работает только здесь?
        list.innerHTML = err.message

    }
}

function render(users = []) {
    if (users.length === 0) {
        list.innerHTML = 'No matches' //почему не перекрывает loading?
    } else {
        const html = users.map(toHTML).join('')
        list.innerHTML = html
    }
    }
    

function toHTML(user) {
    return `
        <li class="list-group-item">${user.name}</li>
    `
}

start()

