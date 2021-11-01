import express from 'express'
import { 
  callCanister,
  enQueue,
  deQueue,
  innerEnQueue,
  innerDeQueue
} from './src/js/actor.js'
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

app.post('/', async function (req, res) {
    const name = req.body.name
    return res.send(await callCanister(name))
})

app.post('/enqueue', async function (req, res) {
  const data = req.body
  let a = await enQueue(data)
  console.log(a);
  return res.send(a)
})

app.post('/dequeue', async function (req, res) {
  let a = await deQueue()
  console.log(a);
  return res.send(a)
})

app.post('/inner/enqueue', async function (req, res) {
  const data = req.body
  let a = await innerEnQueue(data)
  console.log(a);
  return res.send(a)
})

app.post('/inner/dequeue', async function (req, res) {
  let a = await innerDeQueue()
  console.log(a);
  return res.send(a)
})