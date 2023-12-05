import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { createClient } from '@libsql/client';
import { assignments } from '../db/schema'; 
import { Assignment } from './types';

// define constants
const client = createClient({
  url: 'libsql://orca-thehi198.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

export async function getAssignment(assignmentid:string){
  const assignmentList = await db.select().from(assignments).where(eq(assignments.id, assignmentid)).execute();
  return assignmentList;
}

// define the function
async function checkAssignmentState(assignmentid:string) {
  const assignmentList = await db.select().from(assignments).where(eq(assignments.id, assignmentid)).execute();
  if (assignmentList.length === 0) {
    const state: string = "null";
    return state;
  }
  return assignmentList;
}

async function writeAssignment(assignment:Assignment) {
  const date = new Date().toUTCString(); // notiible bug 
  await db.insert(assignments).values([{ id: assignment.id, name: assignment.name, dateCreated: date }]).execute();
}

export async function deleteAssignment(status:string, assignmentid:string) {
  if (status === "all") {
    return await db.delete(assignments).execute();
  }
  else{
    return db.delete(assignments).where(eq(assignments.id, assignmentid)).execute();
  }
}

export async function coreDB(assignment:Assignment){
    const id = assignment.id
    const state = await checkAssignmentState(id);
    if (state === "null") {
        await writeAssignment(assignment);
        return "no objects found";
    }
    else {
        return "state exists";
    }
}
