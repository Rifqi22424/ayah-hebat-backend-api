const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

// user
// TODO: buat request pinjam buku
const pinjamBuku = async (req, res) => {
    try {
        const { bookId, startDate, endDate } = req.body;
        const userId = req.userId;

        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }
        })

        if(book.stock == 0){
            return res.status(404).json({
                message: "stock kosong"
            })
        }

        // const borrowedBook = await prisma.peminjaman.findMany({
        //     where: {
        //         userId: userId,
        //         status: {
        //             in: ['SUDAH_DIAMBIL']
        //         }
        //     }
        // })

        // if(borrowedBook.length > 0){
        //     return res.status(400).json({
        //         message: "anda masih memiliki buku yang dipinjam"
        //     })
        // }        

        if(new Date(startDate) >= new Date(endDate)){
            return res.status(400).json({
                message: "startDate must ealier than endDate",
            })
        }

        const peminjaman = await prisma.peminjaman.create({
            data: {
                bookId: bookId,
                userId: userId,
                startDate: new Date(startDate + "T00:00:00.000Z"),
                endDate: new Date(endDate + "T00:00:00.000Z")
            }
        });

        if(!peminjaman){
            return res.status(500).json({
                message: "failed borrow book"
            });
        }

        return res.status(202).json({
            message: "success",
            data: peminjaman
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }

}

const getMyPeminjamanBuku = async (req, res) => {
    const userId = parseInt(req.userId);

    try{
        const peminjaman = await prisma.peminjaman.findMany({
            where: {
                userId
            }
        });

        return res.status(200).json({
            message: "success get data",
            data: peminjaman,
        })
    } catch (e){
        return res.status(500).json({
            message: e.message,
        })
    }


}


// admin
// TODO: Update status pinjam buku
const updateStatusBuku = async (req, res) => {
    try {
        const idPeminjaman = parseInt(req.params.id);
        const status = req.body.status;
        
        const book = null;
        if(status != "SUDAH_DIAMBIL"){
            book = await prisma.peminjaman.update({
                where: {
                    id: idPeminjaman
                },
                data: {
                    status: status,
                    stock: {
                        decrement: 1
                    }
                }
            });
        }

        if(status === "DITERIMA"){
            book = await prisma.peminjaman.update({
                where: {
                    id: idPeminjaman
                },
                data: {
                    status: status
                }
            });
        }

        if(status === "SUDAH_DIKEMBALIKAN"){
            book = await prisma.peminjaman.update({
                where: {
                    id: idPeminjaman
                },
                data: {
                    status: status,
                    stock: {
                        increment: 1
                    }
                }
            });
        }

        return res.status(200).json({
            message: "update success",
            data: book
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }

}

const getPeminjamanBuku = async (req, res) => {
    const { status } = req.query;

    try {
        const peminjaman = await prisma.peminjaman.findMany({
            where: {
                status
            }
        });

        return res.status(200).json({
            message: "success get data",
            data: peminjaman
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

module.exports = { pinjamBuku, updateStatusBuku, getPeminjamanBuku, getMyPeminjamanBuku };