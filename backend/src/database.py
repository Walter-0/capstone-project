from src.models.stock import Stock

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
database = client.market
collection = database.stocks


async def fetch_all_stocks():
    stocks = []
    cursor = collection.find({})
    async for document in cursor:
        stocks.append(Stock(**document))
    return stocks


async def search_all_stocks(query):
    stocks = []
    cursor = collection.find(
        {"$text": {"$search": query}},
        {"score": {"$meta": "textScore"}}
    ).sort("score", {"$meta": "textScore"}).limit(5)

    async for document in cursor:
        stocks.append(Stock(**document))
    return stocks


async def fetch_one_stock(ticker):
    document = await collection.find_one({"ticker": ticker})
    return document


async def fetch_all_industries():
    industries = await collection.distinct("industry")
    return industries


async def fetch_stocks_by_industry(industry):
    stocks = []
    cursor = collection.find({"industry": industry})
    async for document in cursor:
        stocks.append(Stock(**document))
    return stocks


async def create_stock(stock):
    document = stock
    result = await collection.insert_one(document)
    return document


async def update_stock(stock: Stock):
    await collection.update_one({"ticker": stock["ticker"]}, {"$set": {
        "change": stock["change"],
        "company": stock["company"],
        "country": stock["country"],
        "industry": stock["industry"],
        "price": stock["price"],
        "sector": stock["sector"],
        "ticker": stock["ticker"],
        "volume": stock["volume"]
    }})

    document = await collection.find_one({"ticker": stock["ticker"]})
    return document


async def remove_stock(ticker):
    await collection.delete_one({"ticker": ticker})
    return True
