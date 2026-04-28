const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { parseId } = require("./contentController");

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
    res
      .status(500)
      .json({ error: "Failed to create playlist", details: error.message });
  }
};

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.status(200).json(playlists);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve playlists", details: error.message });
  }
};

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
    res
      .status(500)
      .json({ error: "Failed to retrieve playlist", details: error.message });
  }
};

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
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res
      .status(500)
      .json({ error: "Failed to update playlist", details: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.playlist.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res
      .status(500)
      .json({ error: "Failed to delete playlist", details: error.message });
  }
};

const addContentToPlaylist = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Playlist ID (params):", req.params.playlistId);

  try {
    const { playlistId } = req.params;
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ error: "contentId is required in body" });
    }

    const playlistIdInt = parseInt(playlistId);
    const contentIdInt = parseInt(contentId);

    const newPlaylistItem = await prisma.$transaction(async (tx) => {
      const lastItem = await tx.playlistContent.findFirst({
        where: { playlistId: playlistIdInt },
        orderBy: { order: "desc" },
      });

      const nextOrder = lastItem ? lastItem.order + 1 : 1;

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
    if (error.code === "P2003" || error.code === "P2025") {
      return res.status(404).json({ error: "Playlist or Content not found" });
    }
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "This content is already in the playlist" });
    }
    res.status(500).json({
      error: "Failed to add content to playlist",
      details: error.message,
    });
  }
};

const removeContentFromPlaylist = async (req, res) => {
  try {
    const { playlistId, contentId } = req.params;

    await prisma.playlistContent.delete({
      where: {
        contentId_playlistId: {
          contentId: parseInt(contentId),
          playlistId: parseInt(playlistId),
        },
      },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Item not found in playlist" });
    }
    res.status(500).json({
      error: "Failed to remove content from playlist",
      details: error.message,
    });
  }
};

/**
 * @desc    Memperbarui urutan (order) konten dalam playlist (Re-order/Shuffling)
 * @route   PATCH /api/playlists/:playlistId/contents/:contentId
 * @body    { "newOrder": <nomor_urutan_baru> }
 */
const updateContentOrderInPlaylist = async (req, res) => {
  try {
    const { playlistId, contentId } = req.params;
    const { newOrder } = req.body;

    if (newOrder === undefined) {
      return res.status(400).json({ error: "newOrder is required in body" });
    }

    // --- Validasi ID dan Order Awal ---
    let playlistIdInt, contentIdInt, newOrderInt;
    try {
      playlistIdInt = parseId(playlistId);
      contentIdInt = parseId(contentId);
      newOrderInt = parseId(newOrder);
    } catch (error) {
      // Menangkap error dari parseId jika format tidak valid
      return res.status(400).json({ error: error.message });
    }

    // Pastikan order tidak pernah kurang dari 1
    if (newOrderInt < 1) {
      newOrderInt = 1;
    }
    // --- Akhir Validasi Awal ---

    const updatedItem = await prisma.$transaction(async (tx) => {
      console.log(`--- Starting Transaction ---`);
      console.log(
        `PlaylistID: ${playlistIdInt}, ContentID: ${contentIdInt}, NewOrder (Request): ${newOrderInt}`
      );

      // A. Dapatkan item yang akan dipindah
      const itemToMove = await tx.playlistContent.findUnique({
        where: {
          contentId_playlistId: {
            contentId: contentIdInt,
            playlistId: playlistIdInt,
          },
        },
      });

      if (!itemToMove) throw new Error("P404"); // Item tidak ditemukan

      const oldOrder = itemToMove.order;
      console.log(`A. Item to move found. Old Order: ${oldOrder}`);

      // B. Hitung order maksimum saat ini di playlist
      const maxOrderAggregate = await tx.playlistContent.aggregate({
        _max: { order: true },
        where: { playlistId: playlistIdInt },
      });
      const maxOrder = maxOrderAggregate._max.order || 0;
      console.log(`B. Max order in playlist: ${maxOrder}`);

      // --- [PENYEMPURNAAN KUNCI] Validasi & Clamping newOrder ---
      // Jika newOrder yang diminta > maxOrder, kita "kunci" (clamp) ke maxOrder.
      // Ini membuat fungsi fleksibel, bahkan jika client mengirim angka terlalu besar.
      if (newOrderInt > maxOrder) {
        newOrderInt = maxOrder;
      }
      console.log(`   NewOrder (Clamped/Final): ${newOrderInt}`);

      // Jika order tidak berubah, tidak perlu lakukan apa-apa
      if (oldOrder === newOrderInt) {
        console.log("   Order is the same. No changes needed.");
        console.log(`--- Transaction Finished (No-op) ---`);
        return itemToMove;
      }

      // C. Pindahkan item ke "Tempat Parkir" (Nilai sementara yang aman)
      const parkingSpot = maxOrder + 1; // Dijamin unik dan di luar jangkauan
      console.log(
        `C. Moving item ${contentIdInt} to parking spot ${parkingSpot}...`
      );
      await tx.playlistContent.update({
        where: {
          contentId_playlistId: {
            contentId: contentIdInt,
            playlistId: playlistIdInt,
          },
        },
        data: { order: parkingSpot },
      });
      console.log(`   ... Moved to parking spot.`);

      // D. Geser item lain untuk membuat "ruang"
      console.log("D. Shifting other items...");
      if (oldOrder > newOrderInt) {
        // Item bergerak NAIK (misal: 5 -> 2)
        // Semua item dari [newOrder] sampai [oldOrder - 1] perlu NAIK 1 (increment)
        console.log(
          `   Shifting UP: items >= ${newOrderInt} and < ${oldOrder} will be incremented.`
        );
        const itemsToShift = await tx.playlistContent.findMany({
          where: {
            playlistId: playlistIdInt,
            order: { gte: newOrderInt, lt: oldOrder },
          },
          orderBy: {
            order: "desc", // -> Ini kuncinya! (misal: ambil order 2, baru order 1)
          },
        });

        console.log(`   ... found ${itemsToShift.length} items to shift.`);
        for (const item of itemsToShift) {
          await tx.playlistContent.update({
            where: {
              // Gunakan unique key untuk update
              contentId_playlistId: {
                contentId: item.contentId,
                playlistId: item.playlistId,
              },
            },
            data: {
              order: { increment: 1 },
            },
          });
          console.log(
            `       ... shifted item contentId ${item.contentId} from order ${
              item.order
            } to ${item.order + 1}`
          );
        }
        console.log(`   ... Shift UP finished.`);
      } else if (oldOrder < newOrderInt) {
        // Item bergerak TURUN (misal: 2 -> 5)
        // Semua item dari [oldOrder + 1] sampai [newOrder] perlu TURUN 1 (decrement)
        console.log(
          `   Shifting DOWN: items > ${oldOrder} and <= ${newOrderInt} will be decremented.`
        );
        const shiftDownResult = await tx.playlistContent.updateMany({
          where: {
            playlistId: playlistIdInt,
            order: { gt: oldOrder, lte: newOrderInt },
            // 'NOT: { order: parkingSpot }' juga tidak diperlukan di sini
            // karena parkingSpot (maxOrder + 1) di luar jangkauan (lte: newOrderInt)
          },
          data: { order: { decrement: 1 } },
        });
        console.log(
          `   ... Shift DOWN affected ${shiftDownResult.count} items.`
        );
      }

      // E. Kembalikan item dari "Tempat Parkir" ke posisi barunya
      console.log(
        `E. Moving item ${contentIdInt} from parking spot to final order ${newOrderInt}...`
      );
      const finalUpdate = await tx.playlistContent.update({
        where: {
          contentId_playlistId: {
            contentId: contentIdInt,
            playlistId: playlistIdInt,
          },
          // Pastikan kita HANYA update item yang ada di parkingSpot
          order: parkingSpot,
        },
        data: { order: newOrderInt }, // Pindahkan ke newOrder
      });
      console.log(`   ... Moved to final order.`);

      console.log(`--- Transaction Finished Successfully ---`);
      return finalUpdate; // Kembalikan item yang sudah diupdate
    }); // Akhir dari $transaction

    res.status(200).json({
      message: "Content order updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    if (error.message === "P404") {
      return res.status(404).json({ error: "Item not found in playlist" });
    }
    if (error.message.includes("Invalid ID format")) {
      // Menangkap error dari helper parseId
      return res.status(400).json({ error: error.message });
    }
    // P2025: Gagal menemukan record untuk di-update (bisa terjadi di langkah E)
    if (error.code === "P2025") {
      console.error(
        "Transaction rolled back. Item not found in parking spot during step E.",
        error
      );
      return res.status(404).json({
        error: "Failed to find item in parking spot. Transaction rolled back.",
      });
    }
    if (error.code === "P2002") {
      console.error(
        "Transaction rolled back. Unique constraint failed.",
        error
      );
      return res
        .status(409)
        .json({ error: "Order update failed due to unexpected conflict" });
    }
    console.error("Failed to update content order:", error);
    res.status(500).json({
      error: "Failed to update content order",
      details: error.message,
    });
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
  updateContentOrderInPlaylist,
};
