FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://*:5286

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["StockBackend.csproj", "./"]
RUN dotnet restore "StockBackend.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "StockBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StockBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StockBackend.dll"]
