namespace StockBackend.Service;

public interface IStatisticsService
{
    int CalculateInventoryItems(long facilityId);
    double CalculateInventoryValue(long facilityId);
    int CalculateOrdersLinked(long facilityId);
}