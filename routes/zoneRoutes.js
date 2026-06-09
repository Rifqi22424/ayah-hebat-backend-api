const express = require('express');
const router = express.Router();
const { getZones } = require('../controllers/zoneController');

router.get('/', /* 
  #swagger.tags = ['Zone'] 
  #swagger.description = 'Mendapatkan semua daftar zona beserta cabang.'
  #swagger.responses[200] = {
      description: 'Daftar zona berhasil diambil.',
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
                                  branches: {
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
          }
      }
  }
*/ getZones);

module.exports = router;
