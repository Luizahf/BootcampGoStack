const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => { 
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const likes = 0;
  var newRepo = { id: uuid(), title, url, techs, likes};
  
  repositories.push(newRepo);

  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  }
  
  const likes = repositories[repoIndex].likes;
  const newRepo = {
    id, title, url, techs, likes
  }

  repositories[repoIndex] = newRepo;
  return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  }
  
  repositories.splice(repoIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  }
  
  repositories[repoIndex].likes++;
  
  return response.status(200).json();
});

module.exports = app;
app.listen(5090, () => {});