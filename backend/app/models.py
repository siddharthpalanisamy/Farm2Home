from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class Farmer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    phone: Optional[str] = None

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    farmer_id: Optional[int] = Field(default=None, foreign_key="farmer.id")

    name: str
    category: str
    price: float
    quantity: int
    image_url: Optional[str] = None

    updated_at: datetime = Field(default_factory=datetime.utcnow)
