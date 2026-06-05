const express = require('express');
const router = express.Router();
const { getBranches } = require('../controllers/branchController');

router.get('/', /* 
  #swagger.tags = ['Branch'] 
  #swagger.description = 'Mendapatkan semua daftar cabang untuk digunakan di dropdown profil.'
  #swagger.responses[200] = {
      description: 'Daftar cabang berhasil diambil.',
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
                                  name: { type: "string" },
                                  zone: {
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
      }
  }
*/ getBranches);

module.exports = router;
