const express = require("express");
const { createPlaylist, getAllPlaylists, getPlaylistById, updatePlaylist, deletePlaylist, addContentToPlaylist, removeContentFromPlaylist, updateContentOrderInPlaylist } = require("./../controllers/playlistController"); // Sesuaikan path ini

const router = express.Router();

// POST /api/playlists
// GET  /api/playlists
router.route("/").post(createPlaylist).get(getAllPlaylists);

// GET    /api/playlists/1
// PATCH  /api/playlists/1
// DELETE /api/playlists/1
router.route("/:id").get(getPlaylistById).patch(updatePlaylist).delete(deletePlaylist);

// Menambahkan konten ke playlist
// POST /api/playlists/1/contents  (Body: { "contentId": 5 })
router.post("/:playlistId/contents", addContentToPlaylist);

router.patch("/:playlistId/contents/:contentId", updateContentOrderInPlaylist);

// Menghapus konten dari playlist
// DELETE /api/playlists/1/contents/5
router.delete("/:playlistId/contents/:contentId", removeContentFromPlaylist);

module.exports = router;
