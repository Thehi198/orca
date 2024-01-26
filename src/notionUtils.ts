import { ok } from "assert";
import { create } from "domain";

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });


async function getDatabaseObject(databaseId: string) {
    const output = await notion.databases.retrieve({ database_id: databaseId });
    return output;
}

export async function createPage(databaseId: string, pageName: string, dueDate: string | null, URL: string, className: string) {

    if(dueDate === null){
    const response = await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": databaseId
        },
        "properties": {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": pageName
                        }
                    }
                ]
            },
            "Link": {
                "url": URL
            },
            "Class": {
                "select": {
                    "name": className
                }
            }
        }
    });
    return response;
    }
    else{
        const response = await notion.pages.create({
            "parent": {
                "type": "database_id",
                "database_id": databaseId
            },
            "properties": {
                "Name": {
                    "title": [
                        {
                            "text": {
                                "content": pageName
                            }
                        }
                    ]
                },
                "Due Date": {
                    "date": {
                        "start": dueDate
                    }
                },
                "Link": {
                    "url": URL
                },
                "Class": {
                    "select": {
                        "name": className
                    }
                }
            }
        });
        return response;
    }
}

