from pydantic import BaseModel
from typing import List


class OrderCreate(BaseModel):
    table_number: int
    created_by: int


class OrderItemCreate(BaseModel):
    item_name: str
    quantity: int
    price_per_unit: float


class InvoiceResponse(BaseModel):
    order_id: int
    subtotal: float
    gst_rate: float
    gst_amount: float
    total_amount: float
