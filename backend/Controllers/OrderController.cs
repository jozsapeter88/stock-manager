using Microsoft.AspNetCore.Mvc;
using StockBackend.Models;
using StockBackend.Models.DTO;
using StockBackend.Service;

namespace StockBackend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class OrderController: ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet("getAllOrders")]
    public async Task<ActionResult<List<Order>>> GetAllOrders()
    {
        var result = await _orderService.GetAllOrders();
        return Ok(result);
    }
    
    [HttpGet("getOrders/{userId}")]
    public async Task<ActionResult<List<Order>>> GetOrdersOfUser(string userId)
    {
        var result = await _orderService.GetOrdersOfUser(userId);
        if (result is null) return NotFound("No orders for the User");
        return Ok(result);
    }

    [HttpPost("addOrder/{userId}")]
    public async Task<ActionResult<Order>> AddOrder([FromBody] OrderDto order, string userId)
    {
        var result = await _orderService.AddOrder(order, userId);
        if (result is null) return NotFound("User is not found!");
        return Ok(result);
    }
    
    [HttpDelete("deleteOrder/{userId}/{orderId}")]
    public async Task<ActionResult<List<Order>>> DeleteOrder(long orderId, string userId)
    {
        var result = await _orderService.DeleteOrder(orderId);
        if (!result)
        {
            return NotFound("Order not found");
        }

        var orders = await _orderService.GetOrdersOfUser(userId)!;

        return Ok(orders);
    }

    [HttpPut("confirmOrder/{orderId}")]
    public async Task<ActionResult<List<Order>>> ConfirmOrder(long orderId)
    {
        var result = await _orderService.ConfirmOrder(orderId);
        if (!result)
        {
            return NotFound("Order not found");
        }

        return Ok(true);
    }
}