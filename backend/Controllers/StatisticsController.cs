using Microsoft.AspNetCore.Mvc;
using StockBackend.Service;

namespace StockBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly IStatisticsService _statisticsService;

    public StatisticsController(IStatisticsService statisticsService)
    {
        _statisticsService = statisticsService;
    }

    [HttpGet("calculateInventoryItems/{facilityId}")]
    public IActionResult CalculateInventoryItems(long facilityId)
    {
        int result = _statisticsService.CalculateInventoryItems(facilityId);
        return Ok(result);
    }

    [HttpGet("calculateInventoryValue/{facilityId}")]
    public IActionResult CalculateInventoryValue(long facilityId)
    {
        double result = _statisticsService.CalculateInventoryValue(facilityId);
        return Ok(result);
    }

    [HttpGet("calculateOrdersLinked/{facilityId}")]
    public IActionResult CalculateOrdersLinked(long facilityId)
    {
        int result = _statisticsService.CalculateOrdersLinked(facilityId);
        return Ok(result);
    }
}
