# 🐋 ORCA - Object Relational Course Admin
A synchronization service between the Canvas LMS REST API and the Notion REST API.

## Architecture
![Alt text](diagram.png)

### Dependancies
```
@libsql/client@0.4.0-pre.5
@notionhq/client@2.2.14
bun-types@1.0.15
drizzle-kit@0.20.6
drizzle-orm@0.29.1
elysia@0.7.29
```


### Stack
- Buntime
- Elysia
- Notion SDK
- Drizzle
- Turso & libSQL

## Devolepment
To start the development server run:
```bash
bun run dev
```
Open http://localhost:3000/.

Configure course information in the `orcaConfig.ts` file.

**Admin Objects:**  - Make sure the classes and Class ID arrays are mapped

    `classes`: array of Notion database tags
    `classId`: array of Canvas LMS course IDs
    `databaseId`: string of the Notion database id

**Environment Variables:**

    `TURSO_AUTH_URL` : database URL for Turso
    `TURSO_AUTH_TOKEN`: authentication token generated for Turso 
    `NOTION_API_KEY`: authentication token generated by Notion
    `CANVAS_API_KEY`: authentication token generated by Canvas LMS

## Deployment
Use the `dockerfile` to build a docker container for deployment.

Reccomended Fly.io spec: `shared-cpu-1x-1GB`

## Limitations & Future
- One way sync
- Does not support assignment updates (planned)
- Provides minimal API interface