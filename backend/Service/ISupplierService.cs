﻿using StockBackend.Models;

namespace StockBackend.Service;

public interface ISupplierService
{
    Task<List<Supplier>> GetAllSuppliers();
    Task<Supplier> GetSupplierById(int supplierId);
    Task<Supplier> AddSupplier(Supplier newSupplier);
    Task<Supplier> EditSupplier(int supplierId, Supplier updatedSupplier);
    Task DeleteSupplierById(int supplierId);
}