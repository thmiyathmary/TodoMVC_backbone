const EVENT_SUBMITTED = 'event_submitted'

const ParentView = Backbone.View.extend({
  initialize: () => {
    this.todoCollection = new TodoCollection()
    // ToDo表示を行う表
    this.todoTableView = new TodoTableView({collection: todoCollection})
    // ToDoを追加するためのView
    this.todoAddView = new TodoAddView()
    // 一括でisCompletedを操作するcheckbox
    this.toggleAllIsCompletedView = new ToggleAllIsCompletedView()
    // 画面下部のボタン群
    this.bottomView = new TodoBottomView()

    console.log("test")

    this.todoAddView.on(EVENT_SUBMITTED, (val) => {
      console.log(val)
      const todo = new TodoModel({
        name: val.name,
        isCompleted: false
      })
    })
  },

})

const TodoAddView = Backbone.View.extend({

  initialize:() => {
    this.$el = $('#wholeform')
    console.log(this.$el)
    console.log($('#wholeform'))
  },
  events: {
    'submit #maintext': 'onSubmitted',
    'onclick #toggleAll': 'onClicked'
  },
  onSubmitted: (e) => {
    console.log(this.$el)
    this.trigger(EVENT_SUBMITTED,this.val())
  },
  onClicked: (e) => {
    console.log(this.$el)
    console.log(this.val())
    // this.trigger(EVENT_SUBMITTED,this.val())
  }
})

const TodoTableView = Backbone.View.extend({
})

const ToggleAllIsCompletedView = Backbone.View.extend({
  initialize:() => {
    this.$el = $('#toggleAll')
    console.log(this.$el)
    console.log($('#toggleAll'))
    console.log(this.$el.val())
  },
  events: {
    'onclick': 'onClicked'
  },
  onClicked: (e) => {
    console.log(this.$el)
    console.log(this.val())
    // this.trigger(EVENT_SUBMITTED,this.val())
  }

})

const TodoModel = Backbone.Model.extend({

})

const TodoBottomView = Backbone.View.extend({
})

const TodoCollection = Backbone.Collection.extend({
  model: TodoModel
})

const tmp = new ParentView()
