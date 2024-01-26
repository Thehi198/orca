import { assignmentData } from "./canvasUtils";
import { coreDB } from "./dbUtils";
import { classes, classId, databaseId } from "./orcaConfig";
import { createPage } from "./notionUtils";


export async function sync(){
    let syncedAssignments = 0
    for (let i = 0; i < classes.length; i++) {
        const data = await assignmentData(classId[i]);
        console.log(classId[i])
        for (let j = 0; j < data.length; j++) {
            const assignment = data[j];
            const state = await coreDB(assignment);
            console.log(state)
            console.log(assignment)
            if (state == "no objects found") {
                const response = await createPage(databaseId, assignment.name, assignment.dueDate, assignment.url, classes[i]);
                console.log(response)
                syncedAssignments = syncedAssignments + data.length
             }
        }
    }
    console.log("synced " + syncedAssignments + " assignments")
    return "synced " + syncedAssignments + " assignments";
}
