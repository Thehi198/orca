import { Elysia } from "elysia";
import { getAssignment, deleteAssignment } from "./dbUtils";
import { assignmentData } from "./canvasUtils";
import { sync } from "./syncCore";

const status = await sync();
console.log(status);

const app = new Elysia()

app.get("/", () => "🐋 Welcome to Orca!");

console.log(
  "🐋 Welcome to Orca!"
);

app.get("/api/assignment/:assignmentid", async (context) => {
  const assignmentid = context.params.assignmentid;
  const state = await getAssignment(assignmentid);
  return state;
});

app.get("/api/course/:courseid", async (context) => {
  const courseid = context.params.courseid;
  try {
    const data = await assignmentData("499");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

app.get("/api/sync", async (context) => {
  const status = await sync();
  return status;
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

app.listen(3000);