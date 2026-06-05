const express = require('express');
const router = express.Router();
const { getSchools } = require('../controllers/schoolController');

router.get('/', /* 
  #swagger.tags = ['School'] 
  #swagger.description = 'Mendapatkan semua daftar sekolah untuk digunakan di dropdown profil.'
  #swagger.responses[200] = {
      description: 'Daftar sekolah berhasil diambil.',
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      data: {
                          type: "array",
                          items: {
                              type: "object",
                              properties: {
                                  id: { type: "integer" },
                                  name: { type: "string" }
                              }
                          }
                      }
                  }
              }
          }
      }
  }
*/ getSchools);

module.exports = router;
