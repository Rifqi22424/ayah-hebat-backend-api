const express = require("express");
const { createPlaylist, getAllPlaylists, getPlaylistById, updatePlaylist, deletePlaylist, addContentToPlaylist, removeContentFromPlaylist, updateContentOrderInPlaylist } = require("./../controllers/playlistController"); // Sesuaikan path ini

const router = express.Router();

router.route("/").post(createPlaylist).get(getAllPlaylists);
router.route("/:id").get(getPlaylistById).patch(updatePlaylist).delete(deletePlaylist);
router.post("/:playlistId/contents", addContentToPlaylist);
router.delete("/:playlistId/contents/:contentId", removeContentFromPlaylist);

module.exports = router;
