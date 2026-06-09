const express = require('express');
const router = express.Router();
const { createBranch, getBranches, updateBranch, deleteBranch } = require('../../controllers/admin/branchController');

router.post('/', /* 
  #swagger.tags = ['Admin - Branch'] 
  #swagger.description = 'Menambahkan cabang baru ke dalam database.'
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", description: "Nama Cabang" },
                      zoneId: { type: "integer", description: "ID Zona" }
                  },
                  required: ["name", "zoneId"]
              }
          }
      }
  }
*/ createBranch);

router.get('/', /* 
  #swagger.tags = ['Admin - Branch'] 
  #swagger.description = 'Mendapatkan semua daftar cabang yang ada.'
*/ getBranches);

router.put('/:id', /* 
  #swagger.tags = ['Admin - Branch'] 
  #swagger.description = 'Memperbarui cabang berdasarkan ID.'
  #swagger.parameters['id'] = { description: 'ID Cabang', type: 'integer' }
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", description: "Nama Cabang Baru" },
                      zoneId: { type: "integer", description: "ID Zona" }
                  }
              }
          }
      }
  }
*/ updateBranch);

router.delete('/:id', /* 
  #swagger.tags = ['Admin - Branch'] 
  #swagger.description = 'Menghapus cabang berdasarkan ID.'
  #swagger.parameters['id'] = { description: 'ID Cabang', type: 'integer' }
*/ deleteBranch);

module.exports = router;
