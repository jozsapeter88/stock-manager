# Stage 1: Base image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://*:5286

# Stage 2: Build stage with SDK
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy only the .csproj file first to optimize Docker layer caching
COPY ["StockBackend.csproj", "./"]

# Restore dependencies with verbose logging to help identify issues
RUN dotnet restore --verbosity detailed

# Copy the remaining project files
COPY . .

# Build the project in Release mode and output to the /app/build directory
RUN dotnet build "StockBackend.csproj" -c Release -o /app/build

# Stage 3: Publish stage
FROM build AS publish
RUN dotnet publish "StockBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 4: Final stage - use the base image to run the app
FROM base AS final
WORKDIR /app

# Copy the published files from the previous stage
COPY --from=publish /app/publish .

# Run the application
ENTRYPOINT ["dotnet", "StockBackend.dll"]
