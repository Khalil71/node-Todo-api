const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

const todos = [{
  _id: new ObjectID(),
  text:'first text todo'
}, {
  _id: new ObjectID(),
  text:'Second test todo',
  completed: true,
  completedAt: 333
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with bad data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) =>{
        if (err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return a 400 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(400)
      .end(done);
  });

  it('should return 404 for non object id', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id ', () => {

  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if ObjectID is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(400)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'first text code done';
    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: true})
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toEqual(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    var text = 'second text code not done';
    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: false})
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toEqual(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
