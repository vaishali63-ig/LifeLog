import Dexie from "dexie";

const db = new Dexie("Lifelogdb");

db.version(1).stores({
    users:"id",
    blogs:"++id, status, createdAt"
})

export default db;