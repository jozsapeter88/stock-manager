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

        public async Task<Supplier> AddSupplier(Supplier newSupplier)
        {
            // Add the new supplier to the database
            _dbContext.Suppliers.Add(newSupplier);
            await _dbContext.SaveChangesAsync();

            return newSupplier;
        }
    }
}