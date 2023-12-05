import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
 
export const assignments = sqliteTable('assignments', {
    id: text('id').primaryKey(),
    name: text('name'),
    dateCreated: text('dateCreated'),
  }
);

