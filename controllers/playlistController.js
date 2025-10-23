const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @desc    Membuat Playlist baru
 * @route   POST /api/playlists
 * @access  Public
 */
const createPlaylist = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newPlaylist = await prisma.playlist.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Failed to create playlist", details: error.message });
  }
};

/**
 * @desc    Mendapatkan semua playlist
 * @route   GET /api/playlists
 * @access  Public
 */
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve playlists", details: error.message });
  }
};

/**
 * @desc    Mendapatkan satu playlist berdasarkan ID (termasuk kontennya)
 * @route   GET /api/playlists/:id
 * @access  Public
 */
const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await prisma.playlist.findUnique({
      where: { id: parseInt(id) },
      include: {
        PlaylistContent: {
          orderBy: { order: "asc" },
          include: {
            content: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const formattedPlaylist = {
      ...playlist,
      contents: playlist.PlaylistContent.map((pc) => ({
        ...pc.content,
        order: pc.order,
      })),
    };
    delete formattedPlaylist.PlaylistContent;

    res.status(200).json(formattedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve playlist", details: error.message });
  }
};

/**
 * @desc    Memperbarui detail playlist (title, description)
 * @route   PATCH /api/playlists/:id
 * @access  Public
 */
const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedPlaylist = await prisma.playlist.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
      },
    });
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    // Tangani jika playlist tidak ditemukan
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.status(500).json({ error: "Failed to update playlist", details: error.message });
  }
};

/**
 * @desc    Menghapus playlist
 * @route   DELETE /api/playlists/:id
 * @access  Public
 */
const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    // Saat menghapus playlist, Prisma akan otomatis menghapus
    // record 'PlaylistContent' yang terkait (cascading delete)
    await prisma.playlist.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.status(500).json({ error: "Failed to delete playlist", details: error.message });
  }
};

// --- Controller untuk Relasi PlaylistContent ---

/**
 * @desc    Menambahkan konten ke dalam playlist
 * @route   POST /api/playlists/:playlistId/contents
 * @access  Public
 * @body    { "contentId": <id> }
 */
const addContentToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ error: "contentId is required in body" });
    }

    const playlistIdInt = parseInt(playlistId);
    const contentIdInt = parseInt(contentId);

    // Kita perlu 'transaction' untuk mendapatkan urutan (order) terakhir dengan aman
    const newPlaylistItem = await prisma.$transaction(async (tx) => {
      // 1. Cari item dengan 'order' tertinggi di playlist ini
      const lastItem = await tx.playlistContent.findFirst({
        where: { playlistId: playlistIdInt },
        orderBy: { order: "desc" },
      });

      // 2. Tentukan order berikutnya
      const nextOrder = lastItem ? lastItem.order + 1 : 1;

      // 3. Buat record PlaylistContent yang baru
      return tx.playlistContent.create({
        data: {
          playlistId: playlistIdInt,
          contentId: contentIdInt,
          order: nextOrder,
        },
      });
    });

    res.status(201).json(newPlaylistItem);
  } catch (error) {
    // Handle jika contentId atau playlistId tidak ada
    if (error.code === "P2003" || error.code === "P2025") {
      return res.status(404).json({ error: "Playlist or Content not found" });
    }
    // Handle jika konten sudah ada di playlist (unique constraint violation)
    if (error.code === "P2002") {
      return res.status(409).json({ error: "This content is already in the playlist" });
    }
    res.status(500).json({ error: "Failed to add content to playlist", details: error.message });
  }
};

/**
 * @desc    Menghapus konten dari playlist
 * @route   DELETE /api/playlists/:playlistId/contents/:contentId
 * @access  Public
 */
const removeContentFromPlaylist = async (req, res) => {
  try {
    const { playlistId, contentId } = req.params;

    await prisma.playlistContent.delete({
      where: {
        // Hapus berdasarkan composite primary key
        contentId_playlistId: {
          contentId: parseInt(contentId),
          playlistId: parseInt(playlistId),
        },
      },
    });

    // Catatan: Ini tidak akan mengurutkan ulang item lainnya secara otomatis.
    // Item akan tetap pada 'order' aslinya, hanya saja ada 'order' yang hilang.
    // Logika re-ordering lebih kompleks dan biasanya ditangani terpisah.

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Item not found in playlist" });
    }
    res.status(500).json({ error: "Failed to remove content from playlist", details: error.message });
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addContentToPlaylist,
  removeContentFromPlaylist,
};
