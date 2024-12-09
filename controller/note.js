const { query } = require("../database/db");
const express = require('express');
const app = express();

//POST Data
const tambahNote = async (req, res) => {
  const { title, datetime, note } = req.body;

   // Validasi jika ada data yang kosong
   if (!title || !datetime || !note ) {
    return res.status(400).json({ msg: "Semua field harus diisi!" });
  }

  try {
    await query(
      `INSERT INTO notes (title, datetime, note) VALUES(?, ?, ?)`,
      [title, datetime, note]
    );

    return res.status(201).json({
      msg: "Penambahan notes berhasil",
      data: { title, datetime, note },
    });
  } catch (error) {
    console.log("Penambahan notes gagal", error);
    return res.status(500).json({ msg: "Terjadi kesalahan", error: error.message });
  }
};


//Get Data
const ambilDataNote = async (req, res) => {
  try {
    const result = await query(`SELECT * FROM notes`);

   
    return res.status(200).json({ msg: "Ambil notes berhasil", data: result });
  } catch (error) {
    
    console.error("Gagal mengambil data notes:", error);

    
    return res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data", error: error.message });
  }
};

//UPDATE DATA
const rubahNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  const { id } = req.params;

  // Validasi jika ada data kosong
  if (!title || !datetime || !note) {
    return res.status(400).json({ msg: "Semua field harus diisi!" });
  }

  try {
    // Query dengan format yang benar
    await query(
      `UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?`,
      [title, datetime, note, id]
    );

    return res.status(200).json({
      msg: "Perubahan data notes berhasil",
      data: { title, datetime, note },
    });
  } catch (error) {
    console.log("Perubahan notes gagal", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};


//DELETE Data
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
      return res.status(400).json({ msg: "ID tidak valid" });
  }
  next(); // Lanjutkan ke handler berikutnya jika validasi berhasil
};

const hapusNote = async (req, res) => {
  const { id } = req.params;
  try {
      
      const result = await query(`DELETE FROM notes WHERE id = ?`, [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Note dengan ID tersebut tidak ditemukan" });
      }

      return res.status(200).json({ msg: "Hapus note berhasil" });
  } catch (error) {
      console.error("Hapus note gagal", error);
      return res.status(500).json({ msg: "Terjadi kesalahan saat menghapus note" });
  }
};


//GET Data ID
const ambilNoteId = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari params
  try {
    const result = await query(`SELECT * FROM notes WHERE id = ?`, [id]); // Mengambil data note  berdasarkan ID
    
    if (result.length === 0) { // Memeriksa jika tidak ada data ditemukan
      return res.status(404).json({ msg: "Notes dengan ID tersebut tidak ditemukan" }); // Memberikan response 404 jika data tidak ditemukan
    }
    
    return res.status(200).json({ msg: "Pengambilan data ID berhasil", data: result[0] }); // Mengembalikan data NOtes jika ditemukan
  } catch (error) {
    console.log("Ambil data gagal", error); // Log error jika terjadi masalah
    return res.status(500).json({ msg: "Terjadi kesalahan server" }); // Mengembalikan error server jika terjadi masalah
  }
};


module.exports = {
  tambahNote,
  ambilDataNote,
  rubahNote,
  hapusNote,
  ambilNoteId,
};
