using Microsoft.AspNetCore.Mvc;
using StockBackend.Areas.Identity.Data.Models;
using StockBackend.Models;
using StockBackend.Service;

namespace StockBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FacilityController : ControllerBase
{
    private readonly IFacilityService _facilityService;

    public FacilityController(IFacilityService facilityService)
    {
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

    [HttpGet("getFacility/{fId}")]
    public async Task<ActionResult<Facility>> GetFacility(int fId)
    {
        var result = await _facilityService.GetFacility(fId)!;
        if (result is null) return NotFound("Facility is not found!");
        return Ok(result);
    }

    [HttpPost("addFacility/{userId}/{fId}")]
    public async Task<ActionResult<Facility>> AddFacilityToUser(string userId, int fId)
    {
        var result = await _facilityService.AddFacilityToUser(fId, userId);
        if (result is null) return NotFound("user or Facility not found");
        return Ok(result);
    }

    [HttpDelete("removeFacility/{userId}/{fId}")]
    public async Task<ActionResult> RemoveFacilityFromUser(string userId, int fId)
    {
        var result = await _facilityService.RemoveFacilityFromUser(fId, userId);
        if (result is null)
            return NotFound("User or Facility not found");

        return Ok(result);
    }
}