using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI1.Migrations
{
    public partial class AdditionalFieldsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Employees",
                newName: "lastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Employees",
                newName: "firstName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Employees",
                newName: "id");

            migrationBuilder.AddColumn<DateTime>(
                name: "birthDate",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "gender",
                table: "Employees",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "phoneNumber",
                table: "Employees",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "birthDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "email",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "gender",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "lastName",
                table: "Employees",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "firstName",
                table: "Employees",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Employees",
                newName: "Id");
        }
    }
}
