const express = require('express');
const router = express.Router();
const { getBranches, getBranchesByZoneId } = require('../controllers/branchController');


router.get('/:zoneId', /*
  #swagger.tags = ['Branch']
  #swagger.description = 'Mendapatkan daftar cabang berdasarkan Zone ID.'

  #swagger.parameters['zoneId'] = {
      in: 'path',
      description: 'ID Zone',
      required: true,
      type: 'integer',
      example: 1
  }

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
                                  id: {
                                      type: "integer",
                                      example: 1
                                  },
                                  name: {
                                      type: "string",
                                      example: "Cabang Subang"
                                  },
                                  zone: {
                                      type: "object",
                                      properties: {
                                          id: {
                                              type: "integer",
                                              example: 1
                                          },
                                          name: {
                                              type: "string",
                                              example: "Zona Jawa Barat"
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

  #swagger.responses[500] = {
      description: 'Internal Server Error'
  }
*/ getBranchesByZoneId);

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
