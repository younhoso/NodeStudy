const express = require('express');
const app = express();

const db = require('./models');
const { Member } = db;

app.use(express.json());

app.get('/api/members', async (req, res) => {
  const { team } = req.query;
  if(team){
    const teamMembers = await Member.findAll({ where: {team} });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({where: { id }});
  if(member){
    console.log(member.toJSON())
    res.send(member);
  } else {
    res.status(404).send({message: 'There is no such member whith the id!!'});
  }
});

app.post('/api/members', async (req, res) => {
  const newMember = req.body;
  const member = Member.build(newMember);
  await member.save();
  res.send(member);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id))
  if(member){
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    res.send(member)
  } else {
    res.status(400).send({message: 'There is no member with the id!'})
  }
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter((member) => member.id !== Number(id));
  if(members.length < membersCount){
    res.send({message: 'Deleted'});
  } else {
    res.status(404).send({message: 'There is no member with the id!'})
  }
})

app.listen(3000 , () => {
  console.log('Server is Listening...')
});