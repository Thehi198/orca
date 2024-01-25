export const classes = [
    "🪙 History",
    "📕 English",
    "➗ Math",
    "📈 Physics"]

export const classId = [
    "484",
    "477",
    "494",
    "499"
]

export type Assignment = {
    name: string,
    id: string,
    dueDate: string | null,
    url: string,
    className: string,
  }

export const databaseId: string = '59ddcc0de9f64ae4a9e03504a7aedeff';
