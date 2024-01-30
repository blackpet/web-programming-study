let todos = []

async function loadTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  // 너무 많으니까 20개만 자르자!
  todos = (await res.json()).slice(0, 20)
  console.log('todos', todos)

  renderTodos()
}



function renderTodos() {
  const todoUl = document.getElementById('todoList')
  const completedUl = document.getElementById('completedList')

  appendTodos(todoUl, todos.filter(t => !t.completed))
  appendTodos(completedUl, todos.filter(t => t.completed))
}

function appendTodos(ul, list) {
  // 일단 다 지우고!
  ul.innerHTML = ''

  // 항목 추가하자!
  list.forEach(item => {
    const li = document.createElement('li')

    // [완료] checkbox
    const chk = document.createElement('input')
    chk.type = 'checkbox'
    chk.checked = item.completed
    // event 달아주고~
    handleToggleCompleted(item, chk)

    li.appendChild(chk)

    // 내용 text
    const text = document.createElement('span')
    text.innerText = item.title
    li.appendChild(text)

    ul.appendChild(li)
  })
}

function appendTodos2(ul, list) {// 일단 다 지우고!
  ul.innerHTML = ''

  // 항목 추가하자!
  list.forEach(item => {
    const li = document.createElement('li')
    li.innerHTML = `
      <input type="checkbox" ${item.completed ? 'checked' : ''}>
      <span>${item.title}</span>
    `

    // event 달아주고~
    const chk = li.querySelector('INPUT')
    handleToggleCompleted(item, chk)
    ul.appendChild(li)
  })
}

function handleToggleCompleted(item, chk) {
  chk.addEventListener('click', e => {
    item.completed = chk.checked
    // 다시 그려야지?
    renderTodos()
  })
}

loadTodos()
