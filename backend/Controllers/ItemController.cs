using Microsoft.AspNetCore.Mvc;
using StockBackend.Models;
using StockBackend.Models.DTO;
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

    public async Task<ActionResult<List<Item>>> GetItems()
    {
        var result = await _itemService.GetItems();
        if (result is null) return NotFound("No items available");
        return Ok(result);
    }
    
    [HttpPost("addItem")]
    public async Task<ActionResult<Item>> AddItem([FromBody] Item itemDto)
    {
        var result = await _itemService.AddItem(itemDto);
        if (result is null) return BadRequest("Failed to add the item");
        return Ok(result);
    }


    [HttpPost("addDispatch/{userId}")]
    public async Task<ActionResult<Dispatch>> AddDispatch([FromBody] DispatchDto dispatchDto, string userId)
    {
        var result = await _itemService.AddDispatch(dispatchDto, userId);
        if (result is null) return NotFound("User is not Found");
        return Ok(result);
    }

    [HttpGet("getDispatches/{userId}")]

    public async Task<ActionResult<List<Dispatch>>> GetDispatches(string userId)
    {
        var result = await _itemService.GetAllDispatch(userId);
        if (result is null) return NotFound("User is not Found");
        return Ok(result);
    }
}