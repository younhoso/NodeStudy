const express = require('express');

const app = express();

let members = require('./members');

app.use(express.json());

app.get('/api/members', (req, res) => {
  const { name, team } = req.query;
  if(team){
    const teamMembers = members.filter((m) => m.team === team && m.name === name);
    res.send(teamMembers)
  } else {
    res.send(members);
  }
});

app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if(member){
    res.send(member);
  } else {
    res.status(404).send({ message : 'There is no such member' });
  }
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember)
});

app.listen(3000, () => {
  console.log('Server is listening...');
});