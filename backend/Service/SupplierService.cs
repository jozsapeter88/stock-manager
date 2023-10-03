using Microsoft.EntityFrameworkCore;
using StockBackend.Models.DBContext;
using System.Collections.Generic;
using System.Threading.Tasks;
using StockBackend.Models;

namespace StockBackend.Service
{
    public class SupplierService : ISupplierService
    {
        private readonly ApplicationDbContext _dbContext;

        public SupplierService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Supplier>> GetAllSuppliers()
        {
            var suppliers = await _dbContext.Suppliers.ToListAsync();
            return suppliers;
        }
        
        public async Task<Supplier> GetSupplierById(int supplierId)
        {
            var supplier = await _dbContext.Suppliers.FirstOrDefaultAsync(s => s.Id == supplierId);
            return supplier;
        }

        public async Task<Supplier> AddSupplier(Supplier newSupplier)
        {
            _dbContext.Suppliers.Add(newSupplier);
            await _dbContext.SaveChangesAsync();

            return newSupplier;
        }
        
        public async Task<Supplier> EditSupplier(int supplierId, Supplier updatedSupplier)
        {
            var existingSupplier = await _dbContext.Suppliers.FirstOrDefaultAsync(s => s.Id == supplierId);

            if (existingSupplier == null)
            {
                throw new InvalidOperationException("Supplier not found.");
            }

            existingSupplier.Name = updatedSupplier.Name;
            existingSupplier.Category = updatedSupplier.Category;
            existingSupplier.Location = updatedSupplier.Location;
            existingSupplier.Comment = updatedSupplier.Comment;

            await _dbContext.SaveChangesAsync();

            return existingSupplier;
        }
    }
}