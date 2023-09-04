using Microsoft.AspNetCore.Mvc;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Models;
using StockBackend.Service;

namespace StockBackend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class FacilityController : Controller
{
    private readonly IFacilityService _facilityService;
    private readonly IUserService _userService;

    public FacilityController(IUserService userService, IFacilityService facilityService)
    {
        _userService = userService;
        _facilityService = facilityService;
    }

    [HttpGet("facilities")]
    public async Task<ActionResult<List<Facility>>> GetAll()
    {
        var result = await _facilityService.GetAllFacility();
        if (result is null) return NotFound("No Facilities Found");
        return Ok(result);
    }

    [HttpGet("facilities/{userId}")]
    public async Task<ActionResult<List<Facility>>> GetFacilitiesOfUser(string userId)
    {
        var result = await _facilityService.GetFacilitiesOfUser(userId);
        if (result is null) return NotFound("User doesn't have facilities");
        return Ok(result);
    }

    [HttpPost("addFacility/{userId}/{fId}")]
    public async Task<ActionResult<Facility>> AddFacilityToUser(string userId, int fId)
    {
        var result = await _facilityService.AddFacilityToUser(fId, userId);
        if (result is null) return NotFound("user or Facility not found");
        return Ok(result);
    }
}