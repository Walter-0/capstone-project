from src.database import (
    fetch_all_stocks,
    fetch_one_stock,
    fetch_stocks_by_industry,
    create_stock,
    update_stock,
    remove_stock
)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.models.stock import Stock

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {'Jimmy': 'Jammy'}


@app.get('/api/stocks')
async def get_stocks():
    response = await fetch_all_stocks()
    return response


@app.get('/api/stock/{ticker}', response_model=Stock)
async def get_stock_by_ticker(ticker: str):
    response = await fetch_one_stock(ticker)
    if response:
        return response
    raise HTTPException(404, f"No stock found with ticker symbol {ticker}")


@app.get('/api/industry/{industry}')
async def get_stocks_by_industry(industry: str):
    response = await fetch_stocks_by_industry(industry)
    if response:
        return response
    raise HTTPException(404, f"No stocks found in industry {industry}")


@app.post('/api/stock', response_model=Stock)
async def post_stock(stock: Stock):
    response = await create_stock(stock.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@app.put('/api/stock/{ticker}', response_model=Stock)
async def put_stock(stock: Stock):
    response = await update_stock(stock.dict())
    if response:
        return response
    raise HTTPException(
        404, f"No stock found with ticker symbol {stock.ticker}")


@app.delete('/api/stock/{ticker}')
async def delete_stock(ticker: str):
    response = await remove_stock(ticker)
    if response:
        return f"Successfully deleted stock {ticker}"
    raise HTTPException(404, f"No stock found with ticker symbol {ticker}")
