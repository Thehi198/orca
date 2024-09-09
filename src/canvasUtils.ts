import { Assignment } from './orcaConfig';

async function getAssignmentData(courseId:string){
    const options = {
        headers: {
          'Authorization': `Bearer ${process.env.CANVAS_API_KEY}`,
        },
      };
      const params = new URLSearchParams({bucket: 'unsubmitted'}).toString();
      const response = await fetch(`https://canvas.olin.edu/api/v1/courses/${courseId}/assignments`+ '?' + params, options);
      const data = await response.json();
      return data
}

async function getFutureAssignmentData(courseId:string){
    const options = {
        headers: {
          'Authorization': `Bearer ${process.env.CANVAS_API_KEY}`,
        },
      };
      const params = new URLSearchParams({bucket: 'future'}).toString();
      const response = await fetch(`https://canvas.olin.edu/api/v1/courses/${courseId}/assignments`+ '?' + params, options);
      const data = await response.json();
      return data
}

async function getUpcomingAssignmentData(courseId:string){
    const options = {
        headers: {
          'Authorization': `Bearer ${process.env.CANVAS_API_KEY}`,
        },
      };
      const params = new URLSearchParams({bucket: 'upcoming'}).toString();
      const response = await fetch(`https://canvas.olin.edu/api/v1/courses/${courseId}/assignments`+ '?' + params, options);
      const data = await response.json();
      return data
}


export async function assignmentData(courseId: string): Promise<Assignment[]> {
    const unsubmitted_data = await getAssignmentData(courseId) as any[];
    const future_data = await getFutureAssignmentData(courseId);
    const upcoming_data = await getUpcomingAssignmentData(courseId);

    const data = [...unsubmitted_data, ...future_data, ...upcoming_data];
    const assignment = data.map((assignment: any) => {
        const date = assignment.due_at
        const assignmentId = assignment.id.toString();
        if (date === null) {
            return {
                name: assignment.name,
                dueDate: null,
                id: assignmentId,
                url: assignment.html_url,
                className: assignment.course_id,
            };
        }
        return {
            name: assignment.name,
            dueDate: assignment.due_at.substring(0, 10),
            id: assignmentId,
            url: assignment.html_url,
            className: assignment.course_id,
        };
    });
    return assignment;
}

