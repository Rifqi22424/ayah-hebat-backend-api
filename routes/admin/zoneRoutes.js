const express = require('express');
const router = express.Router();
const { createZone, getZones, updateZone, deleteZone } = require('../../controllers/admin/zoneController');

router.post('/', /* 
  #swagger.tags = ['Admin - Zone'] 
  #swagger.description = 'Menambahkan zona baru ke dalam database.'
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", description: "Nama Zona" }
                  },
                  required: ["name"]
              }
          }
      }
  }
*/ createZone);

router.get('/', /* 
  #swagger.tags = ['Admin - Zone'] 
  #swagger.description = 'Mendapatkan semua daftar zona yang ada.'
*/ getZones);

router.put('/:id', /* 
  #swagger.tags = ['Admin - Zone'] 
  #swagger.description = 'Memperbarui nama zona berdasarkan ID.'
  #swagger.parameters['id'] = { description: 'ID Zona', type: 'integer' }
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", description: "Nama Zona Baru" }
                  },
                  required: ["name"]
              }
          }
      }
  }
*/ updateZone);

router.delete('/:id', /* 
  #swagger.tags = ['Admin - Zone'] 
  #swagger.description = 'Menghapus zona berdasarkan ID.'
  #swagger.parameters['id'] = { description: 'ID Zona', type: 'integer' }
*/ deleteZone);

module.exports = router;
