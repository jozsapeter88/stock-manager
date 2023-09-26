using Microsoft.EntityFrameworkCore;
using StockBackend.Areas.Identity.Enums;
using StockBackend.Models;
using StockBackend.Models.DBContext;
using StockBackend.Service;
using StockBackendTest.Fixtures;

namespace StockBackendTest.ServiceTests;
[Collection("ServiceCollection")]
public class FacilityServiceTest
{
    private readonly ServiceFixture _serviceFixture;

    public FacilityServiceTest(ServiceFixture serviceFixture)
    {
        _serviceFixture = serviceFixture;
    }
    
    // Using CollectionFixture
    [Fact]
    public async Task AddFacilityToUser_ToUserWithoutFacilities()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDBForTesting")
            .Options;
        //Seed InMemoryDb with a user and a facility
        await _serviceFixture.AddUserAndFacilityToInMemoryDb(options);
       
        await using var context = new ApplicationDbContext(options);
        //Act
        var facilityService = new FacilityService(context);
        await facilityService.AddFacilityToUser(1, "test-Id");
        await context.SaveChangesAsync();
        //Assert
        var user = await context.Users
            .Include(user => user.FacilitiesOfUser)
            .FirstOrDefaultAsync(u => u.UserName == "testUser");
        Assert.Equal(1, 
            user!.FacilitiesOfUser!
                .First(facility => facility.Name == "TestFacility").Id);
        Assert.Equal(1, user!.FacilitiesOfUser!.Count);
    }
    
    [Fact]
    public async Task AddFacilityToUser_ToUserWithFacility()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"StockDBForTesting")
            .Options;
        //Seed InMemoryDb with a user and a facility and items
        await _serviceFixture.AddUserAndFacilityToInMemoryDb(options);

        await using var context = new ApplicationDbContext(options);
        //Act
        var facilityService = new FacilityService(context);
        await facilityService.AddFacilityToUser(1, "test-Id2");
        await context.SaveChangesAsync();
        //Assert
        var user = await context.Users
            .Include(user => user.FacilitiesOfUser)
            .FirstOrDefaultAsync(u => u.UserName == "testUserAlreadyHasFacility");
        Assert.Equal(2, user!.FacilitiesOfUser!.Count);
    }

}