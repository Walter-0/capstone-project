from typing import (
    Optional
)
from pydantic import BaseModel

class Stock(BaseModel):
    change: Optional[float] = None
    company: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    price: Optional[float] = None
    sector: Optional[str] = None
    ticker: Optional[str] = None
    volume: Optional[int] = None
