using Microsoft.AspNetCore.Mvc;
using StockBackend.Service;

namespace StockBackend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ItemController: ControllerBase
{
    private readonly IItemService _itemService;

    public ItemController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet("getItems")]

    public async Task<ActionResult> GetItems()
    {
        var result = await _itemService.GetItems();
        if (result is null) return NotFound("No items available");
        return Ok(result);
    }
}