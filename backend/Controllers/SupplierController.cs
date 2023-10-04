using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("getSupplier/{supplierId}")]
        public async Task<IActionResult> GetSupplierById(int supplierId)
        {
            var supplier = await _supplierService.GetSupplierById(supplierId);

            if (supplier == null)
            {
                return NotFound("Supplier not found.");
            }

            return Ok(supplier);
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

        [HttpPut("editSupplier/{supplierId}")]
        public async Task<IActionResult> EditSupplier(int supplierId, [FromBody] Supplier updatedSupplier)
        {
            try
            {
                var existingSupplier = await _supplierService.EditSupplier(supplierId, updatedSupplier);

                if (existingSupplier == null)
                {
                    return NotFound("Supplier not found.");
                }

                return Ok(existingSupplier);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("deleteSupplier/{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            try
            {
                await _supplierService.DeleteSupplierById(id);
                return Ok("Supplier deleted successfully");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}