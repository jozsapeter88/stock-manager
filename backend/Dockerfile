# Stage 1: Base image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://*:5286

# Stage 2: Build stage with SDK
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy .csproj file first to utilize layer caching
COPY ["StockBackend.csproj", "./"]

# Copy the NuGet configuration file
COPY NuGet.Config /root/.nuget/NuGet/NuGet.Config

# List files for verification and run dotnet restore
RUN ls -la /src && dotnet restore --verbosity detailed

# Copy the remaining project files
COPY . .

# Build the project in Release mode
RUN dotnet build "StockBackend.csproj" -c Release -o /app/build

# Stage 3: Publish stage
FROM build AS publish
RUN dotnet publish "StockBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 4: Final stage for running the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Start the application
ENTRYPOINT ["dotnet", "StockBackend.dll"]
