const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

// user
// TODO: buat request pinjam buku
const pinjamBuku = async (req, res) => {
    try {
        const { bookId, endDate } = req.body;
        const userId = req.userId;

        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(bookId)
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

        if(new Date(endDate) < new Date()){
            return res.status(400).json({
                message: "end date must be greater than today"
            })
        }

        const peminjaman = await prisma.peminjaman.create({
            data: {
                bookId: bookId,
                userId: userId,
                status: "PENDING",
                startDate: new Date(),
                endDate: new Date(endDate)
            }
        });

        if(!peminjaman){
            return res.status(500).json({
                message: "failed lend book"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return res.status(202).json({
            message: "success",
            data: {
                idPeminjaman: peminjaman.id,
                bookName: book.name,
                endDate: peminjaman.endDate,
                from: "KUTAB ALFATIH",
                to: user.username
            }
        })
    } catch (e) {
        return res.status(500).json({
            error: e.message
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
        
        let book = null;
        if(status === "SUDAH_DIAMBIL"){
            book = await prisma.peminjaman.update({
                where: {
                    id: idPeminjaman
                },
                data: {
                    status: "SUDAH_DIAMBIL",
                    book: {
                        update: {
                            stock: {
                                decrement: 1
                            }
                        }
                    }
                }
            });
        }

        else if(status === "DITERIMA"){
            book = await prisma.peminjaman.update({
                where: {
                    id: idPeminjaman
                },
                data: {
                    status: "DITERIMA"
                }
            });
        }

        else if(status === "SUDAH_DIKEMBALIKAN"){
            book = await prisma.peminjaman.update({
                where: {
                    id: idPeminjaman
                },
                data: {
                    status: "SUDAH_DIKEMBALIKAN",
                    book: {
                        update: {
                            stock: {
                                increment: 1
                            }
                        }
                    }
                }
            });
        }
        else {
            return res.status(400).json({
                message: "status not on the list"
            })
        }

        return res.status(200).json({
            message: "update success",
            data: book
        })
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            error: "failed update status"
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