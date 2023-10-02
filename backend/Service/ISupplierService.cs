using StockBackend.Models;

namespace StockBackend.Service;

public interface ISupplierService
{
    Task<List<Supplier>> GetAllSuppliers();
    Task<Supplier> AddSupplier(Supplier newSupplier);
}