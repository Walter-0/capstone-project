from pydantic import BaseModel

class Stock(BaseModel):
    change: float
    company: str
    country: str
    industry: str
    price: float
    sector: str
    ticker: str
    volume: int
