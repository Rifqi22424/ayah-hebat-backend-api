const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const parseId = (id) => {
  try {
    return parseInt(id, 10);
  } catch (e) {
    throw new Error("Invalid ID format");
  }
};

exports.createWatch = async (req, res) => {
  const uploaderId = req.userId;
  const { title, description, thumbnailUrl, videoUrl, duration } = req.body;

  if (!title || !videoUrl || !thumbnailUrl || !duration) {
    return res.status(400).json({
      message:
        "Title, Video URL, Thumbnail URL, and Duration are required fields.",
    });
  }

  try {
    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        thumbnailUrl,
        videoUrl,
        duration: parseId(duration), // Pastikan duration adalah integer
        uploaderId: parseId(uploaderId),
      },
    });

    res.status(201).json({
      message: "Video content created successfully",
      video: newContent,
    });
  } catch (error) {
    console.error("Error creating video content:", error);
    // Tangani error jika ID uploader tidak ditemukan atau format ID salah
    if (error.code === "P2003" || error.message.includes("Invalid ID format")) {
      return res
        .status(400)
        .json({ message: "Invalid Admin ID or data format." });
    }
    res.status(500).json({
      message: "Failed to create video content",
      error: error.message,
    });
  }
};

exports.updateWatch = async (req, res) => {
  const videoId = req.params.id;

  try {
    const idInt = parseId(videoId);

    // 1. Cek keberadaan (opsional, tetapi memberikan status 404 yang lebih baik)
    const existingContent = await prisma.content.findUnique({
      where: { id: idInt },
    });

    if (!existingContent) {
      return res.status(404).json({ message: "Video content not found" });
    }

    // 2. Update konten
    const updatedData = { ...req.body };
    // Pastikan duration di-parse jika ada
    if (updatedData.duration) {
      updatedData.duration = parseId(updatedData.duration);
    }

    const updatedContent = await prisma.content.update({
      where: { id: idInt },
      data: updatedData,
    });

    res.status(200).json({
      message: "Video content updated successfully",
      video: updatedContent,
    });
  } catch (error) {
    console.error("Error updating video content:", error);
    if (error.message.includes("Invalid ID format")) {
      return res.status(400).json({ message: "Invalid video ID format." });
    }
    res.status(500).json({
      message: "Failed to update video content",
      error: error.message,
    });
  }
};

exports.deleteWatch = async (req, res) => {
  const videoId = req.params.id;

  try {
    const idInt = parseId(videoId);

    // Hapus konten, menggunakan `delete` yang akan melempar P2025 jika tidak ditemukan
    const deletedContent = await prisma.content.delete({
      where: { id: idInt },
    });

    res.status(200).json({
      message: "Video content deleted successfully",
      video: deletedContent,
    });
  } catch (error) {
    console.error("Error deleting video content:", error);
    // P2025: Record to delete does not exist.
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Video content not found" });
    }
    if (error.message.includes("Invalid ID format")) {
      return res.status(400).json({ message: "Invalid video ID format." });
    }
    res.status(500).json({
      message: "Failed to delete video content",
      error: error.message,
    });
  }
};

exports.getAllWatches = async (req, res) => {
  const { search, limit = 10, page = 1 } = req.query;

  try {
    const limitInt = parseId(limit);
    const pageInt = parseId(page);

    const currentPage = pageInt > 0 ? pageInt : 1;

    const offsetInt = (currentPage - 1) * limitInt;

    const whereClause = {
      OR: [
        { title: { contains: search || "" } },
        { description: { contains: search || "" } },
      ],
    };

    // 2. Query untuk mendapatkan total data KESELURUHAN
    const totalCount = await prisma.content.count({
      where: whereClause, // Gunakan klausa WHERE yang sama
    });

    // 3. Query untuk mendapatkan data halaman saat ini
    const videos = await prisma.content.findMany({
      skip: offsetInt,
      take: limitInt,
      where: whereClause,
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        uploader: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    const totalPages = Math.ceil(totalCount / limitInt);

    res.status(200).json({
      message: "Video list retrieved successfully",
      metadata: {
        currentPage: currentPage,
        pageSize: limitInt,
        totalPages: totalPages,
        totalItems: totalCount,
        currentItemCount: videos.length,
      },
      videos: videos,
    });
  } catch (error) {
    console.error("Error retrieving videos:", error);
    if (error.message.includes("Invalid ID format")) {
      return res.status(400).json({ message: "Invalid limit or page format" });
    }
    res.status(500).json({
      message: "Failed to retrieve videos",
      error: error.message,
    });
  }
};

exports.getWatchById = async (req, res) => {
  const videoId = req.params.id;

  try {
    const idInt = parseId(videoId);

    // 1. Tambahkan view count secara atomik dan ambil datanya
    const updatedVideo = await prisma.content.update({
      where: { id: idInt },
      data: {
        views: { increment: 1 }, // Menambah 1 ke kolom views
      },
      include: {
        uploader: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Video retrieved successfully (View incremented)",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("Error retrieving video by ID:", error);
    // P2025: Record to update does not exist.
    if (error.code === "P2025" || error.message.includes("Invalid ID format")) {
      return res
        .status(404)
        .json({ message: "Video content not found or invalid ID" });
    }
    res.status(500).json({
      message: "Failed to retrieve video",
      error: error.message,
    });
  }
};
