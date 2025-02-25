const prisma = require("../prisma/client");
const midtransClient = require("midtrans-client");
const { sendNotificationToUser } = require("../utils/notificationService");
const { sendHtmlToEmail } = require("../utils/sendHtmlToEmail");
// const serverKey = process.env.SERVER_KEY_SANDBOX;
// const clientKey = process.env.CLIENT_KEY_SANDBOX;
const serverKey = process.env.SERVER_KEY;
const clientKey = process.env.CLIENT_KEY;

// Midtrans configuration
const snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: serverKey,
  clientKey: clientKey,
});

// Create infaq transaction
const createInfaq = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount, phoneNumber, email, allocationTypeCode } = req.body;

    const minAmount = 10000;
    const maxAmount = 10000000;

    if (!amount || !phoneNumber || !email || !allocationTypeCode) {
      return res.status(400).json({
        error: "Amount, phone number, email, and allocation type are required",
      });
    }

    validAllocationTypes = await prisma.allocationType.findUnique({
      where: { code: allocationTypeCode },
    });

    if (!validAllocationTypes)
      return res.status(400).json({ error: "Invalid allocation type" });

    if (amount < minAmount || amount > maxAmount) {
      return res.status(400).json({
        error: `Amount harus antara Rp. ${minAmount.toLocaleString()} dan Rp. ${maxAmount.toLocaleString()}`,
      });
    }

    // Generate order ID
    const orderId = `${allocationTypeCode}-${Date.now()}`;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Midtrans transaction parameters
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: user.username, // Replace with dynamic data
        email: email, // Replace with dynamic data
        phone: parseInt(phoneNumber), // Replace with dynamic data
      },
    };

    // Get Midtrans transaction token
    const transaction = await snap.createTransaction(parameter);

    // Save infaq data to the database
    const infaq = await prisma.infaq.create({
      data: {
        userId,
        amount,
        orderId,
        allocationTypeCode,
        status: "pending",
        redirectUrl: transaction.redirect_url,
      },
    });

    res.status(200).json({
      message: "Berhasil membuat infaq",
      data: {
        infaq,
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      },
    });
  } catch (error) {
    console.error("Error creating infaq:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const notification = req.body;
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    let status = "pending";
    let title = "Infaq Pending";
    let body =
      "Kami telah menerima permintaan infaq Anda. Mohon segera lakukan pembayaran untuk menyelesaikan transaksi.";

    console.log(notification);

    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        status = "challenge";
        title = "Infaq dalam Tinjauan";
        body =
          "Transaksi infaq Anda sedang dalam proses verifikasi. Kami akan menginformasikan hasilnya secepatnya.";
      } else {
        status = "success";
        title = "Infaq Berhasil";
        body =
          "Terima kasih atas infaq yang telah Anda berikan. Semoga bermanfaat bagi yang membutuhkan.";
      }
    } else if (transactionStatus === "settlement") {
      status = "success";
      title = "Infaq Berhasil";
      body =
        "Infaq Anda telah diterima. Terima kasih atas kebaikan Anda. Semoga menjadi amal yang bermanfaat.";
    } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
      status = "failed";
      title = "Infaq Gagal";
      body =
        "Maaf, transaksi infaq Anda tidak berhasil. Silakan coba kembali atau hubungi kami jika ada kendala.";
    }

    // Update infaq status in the database
    const infaqUpdated = await prisma.infaq.update({
      where: { orderId },
      data: {
        status,
        paymentType: notification.payment_type,
      },
    });

    console.log("Infaq updated:", infaqUpdated);

    // Send notification to the user
    const userId = infaqUpdated.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userFcmToken = user?.fcmToken;
    const userEmail = user.email;

    if (!userFcmToken) {
      return res.status(200).json({
        error: "Webhook successful but user FCM token not found",
      });
    }

    const allocationType = await prisma.allocationType.findUnique({
      where: { code: infaqUpdated.allocationTypeCode },
      select: {
        name: true,
      },
    });

    const imageUrl = null;
    const data = {
      ...Object.fromEntries(
        Object.entries(infaqUpdated).map(([key, value]) => [key, String(value)])
      ),
      title: title,
      username: user.username,
      body: body,
      notificationType: "infaqNotification",
      allocationType: allocationType.name,
    };

    console.log("data ", data);

    await sendNotificationToUser(userFcmToken, title, body, imageUrl, data);

    if (status === "success" || status === "failed")
      await sendHtmlToEmail(userEmail, data);

    res.status(200).json({ message: "Webhook success", status, title, body });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user infaq history
const getInfaqHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const history = await prisma.infaq.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        orderId: true,
        amount: true,
        status: true,
        // redirectUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalItems = await prisma.infaq.count({
      where: { userId },
    });

    const totalPage = Math.ceil(totalItems / Number(limit));

    res.status(200).json({
      message: "Berhasil mengambil history infaq",
      data: history,
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItems,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTotalAmountInfaqUser = async (req, res) => {
  try {
    const userId = req.userId;

    const totalAmount = await prisma.infaq.aggregate({
      where: {
        userId,
        status: "success",
      },
      _sum: { amount: true },
    });

    res.status(200).json({
      message: "Berhasil mengambil total amount infaq",
      data: totalAmount._sum.amount || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllInfaq = async (req, res) => {
  try {
    const { allocationTypeCode, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const whereClause = {
      ...(allocationTypeCode && { allocationTypeCode }),
    };

    const allInfaq = await prisma.infaq.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalAmount = await prisma.infaq.aggregate({
      where: {
        ...whereClause,
        status: "success",
      },
      _sum: { amount: true },
    });

    const totalItems = await prisma.infaq.count({
      where: whereClause,
    });

    const totalPage = Math.ceil(totalItems / Number(limit));

    return res.status(200).json({
      message: "Berhasil mengambil semua infaq",
      data: { totalAmount: totalAmount._sum.amount || 0, infaqs: allInfaq },
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItems,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInfaqById = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const infaq = await prisma.infaq.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        amount: true,
        status: true,
        orderId: true,
        paymentType: true,
        redirectUrl: true,
        createdAt: true,
        updatedAt: true,
        allocationTypeCode: true,
      },
    });

    if (!infaq) return res.status(404).json({ error: "Infaq not found" });

    const infaqType = await prisma.allocationType.findUnique({
      where: {
        code: infaq.allocationTypeCode,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (infaq.userId !== userId)
      return res.status(403).json({ error: "Forbidden" });

    const { userId: _, allocationTypeCode: __, ...filteredInfaq } = infaq;

    return res.status(200).json({
      message: "Berhasil mengambil infaq",
      data: {
        ...filteredInfaq,
        infaqType,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createInfaq,
  handleWebhook,
  getInfaqHistory,
  getTotalAmountInfaqUser,
  getInfaqById,
  getAllInfaq,
};
