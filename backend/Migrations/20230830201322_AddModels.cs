using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StockBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FacilityId",
                table: "AspNetUsers",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Facilities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Sport = table.Column<int>(type: "integer", nullable: false),
                    CountryCode = table.Column<string>(type: "text", nullable: false),
                    PostCode = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShippedItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippedItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statistics",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FacilityName = table.Column<string>(type: "text", nullable: false),
                    OverallItems = table.Column<int>(type: "integer", nullable: false),
                    OverallValue = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FacilityId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Facilities_FacilityId",
                        column: x => x.FacilityId,
                        principalTable: "Facilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Sport = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    FacilityId = table.Column<long>(type: "bigint", nullable: true),
                    OrderId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Facilities_FacilityId",
                        column: x => x.FacilityId,
                        principalTable: "Facilities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Items_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Facilities",
                columns: new[] { "Id", "Address", "City", "CountryCode", "Name", "PostCode", "Sport" },
                values: new object[,]
                {
                    { 1L, "123 Main Street", "Reactville", "US", "Thunderdome Arena", "12345", 1 },
                    { 2L, "456 High Street", "Reactville", "UK", "Stormwatch Stadium", "67890", 0 },
                    { 3L, "789 Elm Avenue", "Reactville", "US", "Gridiron Grounds", "54321", 5 },
                    { 4L, "321 Oak Lane", "Reactville", "US", "Mystic Court", "13579", 2 },
                    { 5L, "987 Pine Road", "Reactville", "UK", "Celestial Tennis Courts", "24680", 6 },
                    { 6L, "654 Maple Avenue", "Reactville", "US", "Aquatic Arena", "97531", 4 }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "FacilityId", "Name", "OrderId", "Price", "Quantity", "Sport" },
                values: new object[,]
                {
                    { 1L, null, "Boxing Gloves", null, 79.989999999999995, 10, 1 },
                    { 2L, null, "Mouthguard", null, 9.9900000000000002, 20, 1 },
                    { 3L, null, "Headgear", null, 49.990000000000002, 5, 1 },
                    { 4L, null, "Shin Guards", null, 39.990000000000002, 12, 1 },
                    { 5L, null, "MMA Shorts", null, 29.989999999999998, 15, 1 },
                    { 6L, null, "Soccer Ball", null, 24.989999999999998, 20, 0 },
                    { 7L, null, "Soccer Shoes", null, 89.989999999999995, 8, 0 },
                    { 8L, null, "Soccer Jersey", null, 49.990000000000002, 12, 0 },
                    { 9L, null, "Soccer Goal", null, 149.99000000000001, 5, 0 },
                    { 10L, null, "Soccer Training Cones", null, 9.9900000000000002, 30, 0 },
                    { 11L, null, "Football - Wilson", null, 29.989999999999998, 15, 5 },
                    { 12L, null, "Football Helmet", null, 159.99000000000001, 8, 5 },
                    { 13L, null, "Football Gloves", null, 39.990000000000002, 20, 5 },
                    { 14L, null, "Football Shoulder Pads", null, 89.989999999999995, 12, 5 },
                    { 15L, null, "Football Cones", null, 9.9900000000000002, 30, 5 },
                    { 16L, null, "Basketball - Spalding", null, 24.989999999999998, 20, 2 },
                    { 17L, null, "Basketball Shoes", null, 99.989999999999995, 8, 2 },
                    { 18L, null, "Basketball Jersey", null, 49.990000000000002, 12, 2 },
                    { 19L, null, "Basketball Hoop", null, 199.99000000000001, 5, 2 },
                    { 20L, null, "Basketball Training Cones", null, 9.9900000000000002, 30, 2 },
                    { 21L, null, "Tennis Racket - Wilson", null, 59.990000000000002, 10, 6 },
                    { 22L, null, "Tennis Balls", null, 14.99, 50, 6 },
                    { 23L, null, "Tennis Shoes", null, 79.989999999999995, 8, 6 },
                    { 24L, null, "Tennis Bag", null, 39.990000000000002, 15, 6 },
                    { 25L, null, "Tennis Training Cones", null, 9.9900000000000002, 30, 6 },
                    { 26L, null, "Swimming Goggles", null, 14.99, 20, 4 },
                    { 27L, null, "Swimming Cap", null, 9.9900000000000002, 30, 4 },
                    { 28L, null, "Swimming Fins", null, 29.989999999999998, 15, 4 },
                    { 29L, null, "Swimming Kickboard", null, 19.989999999999998, 20, 4 },
                    { 30L, null, "Swimming Training Cones", null, 9.9900000000000002, 30, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_FacilityId",
                table: "AspNetUsers",
                column: "FacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_FacilityId",
                table: "Items",
                column: "FacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_OrderId",
                table: "Items",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_FacilityId",
                table: "Orders",
                column: "FacilityId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Facilities_FacilityId",
                table: "AspNetUsers",
                column: "FacilityId",
                principalTable: "Facilities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Facilities_FacilityId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "ShippedItems");

            migrationBuilder.DropTable(
                name: "Statistics");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Facilities");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_FacilityId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FacilityId",
                table: "AspNetUsers");
        }
    }
}
