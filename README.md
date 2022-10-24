Streamframe Project Manager
--- Streamframe is a project management api ---

=== PROJECT MANAGEMENT API ===

QUERY ALL PROJECTS ===
GET http://localhost:5000/api/projects 

QUERY SINGLE PROJECT ===
GET http://localhost:5000/api/projects/:id

CREATE A SINGLE PROJECT ===
POST http://localhost:5000/api/projects/project, {name: "sample name", description: "sample description"}

EDIT A SINGLE PROJECT ===
PUT http://localhost:5000/api/projects/:id, {name: "sample name", description: "sample description"}

REMOVE A PROJECT ===
DELETE http://localhost:5000/api/projects/:id

=== SUBTASKS MANAGEMENT API ===

QUERY ALL SUB TASKS ===
GET http://localhost:5000/api/subtasks 

QUERY PARENT's SUB TASKS ===
GET http://localhost:5000/api/subtasks/:id

CREATE A SINGLE SUB TASK ===
POST http://localhost:5000/api/subtasks, {name: "sample name", description: "sample description"}

EDIT A SINGLE SUB TASK ===
PUT http://localhost:5000/api/subtasks/:id, {name: "sample name", description: "sample description"}

REMOVE A SUB TASK ===
DELETE http://localhost:5000/api/subtasks/:id, {projectID: "parent ID"}