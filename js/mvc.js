  // 参考 http://www.cyokodog.net/blog/backbone-js/
  // 参考 https://tnakamura.hatenablog.com/entry/20111024/backbone
const EVENT_SUBMITTED = 'event_submitted'
const EVENT_TOGGLEALL = 'event_toggleAll'

const ParentView = Backbone.View.extend({
  el: $('#wholeform'),
  initialize: function() {
    this.todoCollection = new TodoCollection()
    // 入力欄と全ToDoのトグルボタン
    this.topView = new TopView()
    // ToDo表示を行う表
    this.todoTableView = new TodoTableView({collection: this.todoCollection})
    // 画面下部のボタン群
    this.bottomView = new BottomView()

    this.topView.on(EVENT_SUBMITTED, (val) => {
      console.log(val)
      const todo = new TodoModel({
        name: val,
        isCompleted: false
      })
      this.todoCollection.add(todo)
      console.log(this.todoCollection)
    })
    this.topView.on(EVENT_TOGGLEALL, (val) => {
      console.log(val)
    })
  },

})

const TopView = Backbone.View.extend({
  el: '#top',
  initialize: function() {
    this.$input = this.$('#maintext')
    this.$toggleAll = this.$('#toggleAll')
    console.log(this)
  },
  events: {
    'keydown #maintext': 'onSubmitted',
    'click #toggleAll': 'onClicked'
  },
  onSubmitted: function(e) {
    if(e.keyCode === 13 && this.$input.val() !== ''){
      this.trigger(EVENT_SUBMITTED, e.target.value)
      e.target.value = ''
    }
  },
  onClicked: function(e) {
    this.trigger(EVENT_TOGGLEALL, e.target.checked)
  }
})

const TodoTableView = Backbone.View.extend({
  el: 'table#todoList',
  initialize: function() {
    this.collection.bind("add", this.render, this)
    this.collection.bind("remove", this.render, this)
  },
  render: function() {
    this.$el.empty()
    this.collection.each((todo) => {
      const todoView = new TodoView({model: todo})
      this.el.append(todoView.el)
    })
  }
})

const TodoView = Backbone.View.extend({
  tagName: 'tr',
  template: _.template($("#todo_template").html()),
  model: '',
  initialize:function() {
    this.model.bind('change', this.render, this)
    this.render()
  },
  render:function() {
    this.$el.append(this.template(this.model.toJSON()))
  },
  events: {
    'click td.checkbox': 'onClickCheckbox',
    'dblclick ': 'onDblClick',
    'click td.remove': 'onClickRemove'
  },
  onClickCheckbox: function(e) {
    this.model.isCompleted = e.target.checked
  },
  onDblClick: function() {

  },
  onClickRemove: function() {
    this.model.destroy()
  }

})

const BottomView = Backbone.View.extend({
})

const TodoModel = Backbone.Model.extend({
  initialize: function() {
    const isCompleted = false
  }
})

const TodoCollection = Backbone.Collection.extend({
  model: TodoModel,
  initialize: function() {
    this.bind("add", this.onAdd, this);
  },
  onAdd: function(task) {
    task.bind("destroy", this.onDestroy, this);
  },
  onDestroy: function(task) {
    this.remove(task);
  }

})

const parentView = new ParentView()