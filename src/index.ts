import { Elysia } from "elysia";
import { getAssignment, deleteAssignment, getlenAssignments } from "./dbUtils";
import { assignmentData } from "./canvasUtils";
import { sync } from "./syncCore";



const app = new Elysia()

console.log(
  "🐋 Welcome to Orca!"
);

app.get("/", async() =>{
  return "🐋 Welcome to Orca!"
});


app.get("/api/assignment/:assignmentid", async (context) => {
  const assignmentid = context.params.assignmentid;
  const state = await getAssignment(assignmentid);
  return state;
});

app.get("/api/course/:courseid", async (context) => {
  const courseid = context.params.courseid;
  try {
    const data = await assignmentData(courseid);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

app.get("/api/sync", async() =>{
  const status = await sync();
  const len = await getlenAssignments();
  return "🐋 Welcome to Orca!\n # synced in this session: " + status + "\n# of synced all time: " + len 
});

app.get("/api/deleteAssignment/:assignmentId", async (context) => {
  const assignmentId = context.params.assignmentId;
  if (assignmentId === "all") {
    const status = await deleteAssignment("all", "");
    return status;
  } else if (assignmentId !== "all") {
    const status = await deleteAssignment("single", assignmentId);
    return status;
  }
});

app.get("/api/lenAssignments", async (context) => {
  const len = await getlenAssignments();
  return len;
});

app.listen(3000);
