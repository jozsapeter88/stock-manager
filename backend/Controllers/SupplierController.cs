﻿using Microsoft.AspNetCore.Mvc;
using StockBackend.Models;
using StockBackend.Service;

namespace StockBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet("getAllSuppliers")]
        public async Task<IActionResult> GetAllSuppliers()
        {
            var suppliers = await _supplierService.GetAllSuppliers();
            return Ok(suppliers);
        }

        [HttpPost("addSupplier")]
        public async Task<IActionResult> AddSupplier([FromBody] Supplier newSupplier)
        {
            if (newSupplier == null)
            {
                return BadRequest("Supplier data is invalid.");
            }

            var addedSupplier = await _supplierService.AddSupplier(newSupplier);
            return Ok(addedSupplier);
        }
    }
}