const express = require('express');
const router = express.Router();
const { createSchool, getSchools, updateSchool, deleteSchool } = require('../../controllers/admin/schoolController');

router.post('/', /* 
  #swagger.tags = ['Admin - School'] 
  #swagger.description = 'Menambahkan sekolah baru ke dalam database.'
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", description: "Nama Sekolah" }
                  },
                  required: ["name"]
              }
          }
      }
  }
*/ createSchool);

router.get('/', /* 
  #swagger.tags = ['Admin - School'] 
  #swagger.description = 'Mendapatkan semua daftar sekolah yang ada.'
*/ getSchools);

router.put('/:id', /* 
  #swagger.tags = ['Admin - School'] 
  #swagger.description = 'Memperbarui nama sekolah berdasarkan ID.'
  #swagger.parameters['id'] = { description: 'ID Sekolah', type: 'integer' }
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", description: "Nama Sekolah Baru" }
                  },
                  required: ["name"]
              }
          }
      }
  }
*/ updateSchool);

router.delete('/:id', /* 
  #swagger.tags = ['Admin - School'] 
  #swagger.description = 'Menghapus sekolah berdasarkan ID.'
  #swagger.parameters['id'] = { description: 'ID Sekolah', type: 'integer' }
*/ deleteSchool);

module.exports = router;
