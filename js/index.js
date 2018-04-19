let todoList = []
let radioState = "All"
let counter = 0
const addTodo = (function() {
  const inputArea = document.form.inputArea
  return function() {
    if (inputArea.value !== "") {
      const todo = {
        id: counter++,
        name: inputArea.value,
        isCompleted: false
      }
      todoList.push(todo)
      inputArea.value = ""

      const rowContents = `
      <tr id="row${todo.id}">
        <td class="checkbox">
          <div class="center">
            <input id="checkbox${todo.id}" type="checkbox" onclick="onClickCheckbox(${todo.id})">
          </div>
        </td>
        <td>
          ${todo.name}
        </td>
        <td class="remove">
          <input type="button" value="X" onclick="onClickRemove(${todo.id})">
        </td>
      </tr>
      `
      $('table#todoList').append(rowContents)
      showTodoList()
    }
  }
})()

const showTodoList = function() {
  todoList.forEach(todo => {
    const todoTr = $('table#todoList tr#row' + todo.id)
    if(todo.isCompleted){
      todoTr.css('text-decoration', 'line-through')
    } else {
      todoTr.css('text-decoration', '')
    }
    if(isDisplayable(todo.isCompleted)){
      todoTr.show()
    } else {
      todoTr.hide()
    }
  })
  if (todoList.length > 0) {
    const itemNum = todoList.filter(todo => !todo.isCompleted).length
    const itemLabel = itemNum + ' item' + (itemNum > 1 ? 's' : '') + ' left'
    $('table#bottom').show()
    $('td#bottom_left').html(itemLabel)
  } else {
    $('table#bottom').hide()
  }
  checkAllIsCompleted()
}

const isDisplayable = function(isCompleted = false) {
  return radioState === 'All' || radioState === 'Active' && !isCompleted || radioState === 'Completed' && isCompleted
}

const onClickCheckbox = function(index = -1) {
  if (index !== -1) {
    const checkbox = document.getElementById('checkbox' + index)
    const todo = todoList.filter(todo => todo.id === index)[0].isCompleted = checkbox.checked
    showTodoList()
  }
}

const onClickRemove = function(index = -1) {
  if (index !== -1) {
    todoList = todoList.filter(todo => todo.id !== index)
    $('table#todoList tr#row' + index).remove()
    showTodoList()
  }
}

const onClickClear = function() {
  todoList.filter(todo => todo.isCompleted).forEach(completed => {
    $('table#todoList tr#row' + completed.id).remove()
  })
  todoList = todoList.filter(todo => !todo.isCompleted)
  showTodoList()
}

const onClickToggleAll = (function() {
  const toggleCheckbox = document.getElementById('toggleAll')
  return function() {
    todoList.forEach(todo => {
      todo.isCompleted = toggleCheckbox.checked
      document.getElementById('checkbox' + todo.id).checked = todo.isCompleted
    })
    toggleCheckbox.checked = !toggleCheckbox.checked
    showTodoList()
  }
})()

const checkAllIsCompleted = (function() {
  const toggleCheckbox = document.getElementById('toggleAll')
  return function() {
    if (todoList.length !== 0 && todoList.length === todoList.filter(todo => todo.isCompleted).length){
      toggleCheckbox.checked = true
    } else {
      toggleCheckbox.checked = false
    }
  }
})()

const changeRadioState = function(newState = 'All') {
  radioState = newState
  showTodoList()
}
