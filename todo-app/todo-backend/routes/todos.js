const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const storedTodoCount = await redis.getAsync('todoCount')
  const todoCountAsNumber = parseInt(storedTodoCount)
  if(!todoCountAsNumber || isNaN(todoCountAsNumber)) {
    redis.setAsync('todoCount', 0)
  } else {
    redis.setAsync('todoCount', todoCountAsNumber + 1)
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const wantedTodo = req.todo
  res.send(wantedTodo)
  //res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log('**', req.body)
  const updatedTodo = await Todo.updateOne({
    _id: req.body._id
  }, {
    $set: {
      'text': req.body.text,
      'done': req.body.done
    }
  })
  res.send(updatedTodo)
  //res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
