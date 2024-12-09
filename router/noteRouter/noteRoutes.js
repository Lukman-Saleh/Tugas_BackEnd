const express = require("express");
const { tambahNote, ambilNoteId, ambilDataNote, rubahNote, hapusNote } = require("../../controller/note");

const noteRoutes = express();

noteRoutes.post("/note", tambahNote);
noteRoutes.get("/note", ambilDataNote);
noteRoutes.get("/note/:id", ambilNoteId);
noteRoutes.put("/note/:id", rubahNote);
noteRoutes.delete("/note/:id", hapusNote);
module.exports = noteRoutes;
