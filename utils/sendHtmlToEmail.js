const nodemailer = require("nodemailer");

let data = {
  id: "01835885-7ca3-4036-a9f3-01e399a26728",
  userId: "67",
  amount: "10000",
  status: "success",
  orderId: "AT3-1739855157553",
  redirectUrl:
    "https://app.sandbox.midtrans.com/snap/v4/redirection/2194de44-c9f4-4570-bb14-0f53367687ae",
  allocationTypeCode: "AT3",
  paymentType: "shopeepay",
  createdAt: "Tue Feb 18 2025 12:05:58 GMT+0700 (Western Indonesia Time)",
  updatedAt: "Tue Feb 18 2025 12:06:13 GMT+0700 (Western Indonesia Time)",
  title: "Infaq Berhasil",
  body: "Infaq Anda telah diterima. Terima kasih atas kebaikan Anda. Semoga menjadi amal yang bermanfaat.",
  notificationType: "infaqNotification",
  username: "user2",
  allocationType: "Allocation Type 3",
};

let email = "rifqimuzakki45@gmail.com";

const sendHtmlToEmail = async (email, data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ayahhebatmangcoding@gmail.com",
      pass: "citl rjsa irmx tpcx",
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const statusColor = data.status === "failed" ? "red" : "green";
  const statusText = data.status === "failed" ? "Gagal" : "Berhasil";
  const formattedAmount = Number(data.amount).toLocaleString();

  const mailOptions = {
    from: "ayahhebatmangcoding@gmail.com",
    to: email,
    subject: data.title,
    html: `
      <table
        role="presentation"
        width="100%"
        style="background-color: #eef4f8; padding: 20px;"
        align="center"
      >
        <tr>
          <td align="center">
            <table
              role="presentation"
              width="300px"
              style="background-color: white; padding: 12px; border-radius: 12px;"
            >
              <tr>
                <td
                  align="center"
                  style="font-size: 24px; font-weight: bold; color: black;"
                >
                  Mangcoding
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 12px;">
                  <p style="color: black; margin: 0;">
                    <span style="color: grey;">Tanggal</span>
                    <b>${data.createdAt}</b>
                  </p>
                  <p style="color: grey; margin: 8px 0;">Total Iuran</p>
                  <h2 style="color: black; margin: 0;">IDR ${formattedAmount}</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px;">
                  <table role="presentation" width="100%">
                    <tr>
                      <td style="color: grey;">Status transaksi</td>
                      <td
                        align="right"
                        style="font-weight: bold; background-color: ${statusColor}; padding: 4px 8px; border-radius: 4px; color: white;"
                      >
                        ${statusText}
                      </td>
                    </tr>
                    <tr>
                      <td style="color: grey;">ID Pesanan</td>
                      <td
                        align="right"
                        style="font-weight: bold; color: black;"
                      >
                        ${data.orderId}
                      </td>
                    </tr>
                    <tr>
                      <td style="color: grey;">Metode Bayar</td>
                      <td
                        align="right"
                        style="font-weight: bold; color: black;"
                      >
                        ${data.paymentType}
                      </td>
                    </tr>
                    <tr>
                      <td style="color: grey;">Alokasi Iuran</td>
                      <td
                        align="right"
                        style="font-weight: bold; color: black;"
                      >
                        ${data.allocationType}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              role="presentation"
              width="300px"
              style="background-color: white; padding: 12px; margin-top: 12px; border-radius: 12px;"
            >
              <tr>
                <td>
                  <p style="color: black;">
                    Kepada <b>${data.username}</b>
                  </p>
                  <p style="color: black;">
                    Terima kasih! Iuran wadaah sudah diterima. Silakan lihat
                    detail pesanan Anda di bawah ini:
                  </p>
                  <table role="presentation" width="100%">
                    <tr>
                      <td style="font-weight: bold; color: black;">
                        Waktu Iuran
                      </td>
                      <td align="right" style="color: black;">
                        ${data.updatedAt}
                      </td>
                    </tr>
                  </table>
                  <p style="font-weight: bold; color: black;">
                    Rincian pesanan
                  </p>
                  <hr />
                  <table role="presentation" width="100%">
                    <tr>
                      <td style="font-weight: bold; color: black;">
                        Total Iuran
                      </td>
                      <td
                        align="right"
                        style="font-weight: bold; color: black;"
                      >
                        ${formattedAmount}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    )`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

// sendHtmlToEmail(email, data);

module.exports = { sendHtmlToEmail };
