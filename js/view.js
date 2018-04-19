
events: {
  submit: onsubmit()
}


const onClickCheckbox = function(index = -1) {
  if (index !== -1) {
    const checkbox = document.getElementById('checkbox' + index)
    todoList.filter(todo => todo.id === index)[0].isCompleted = checkbox.checked
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
