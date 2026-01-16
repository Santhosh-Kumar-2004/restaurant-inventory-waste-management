from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from schemas.order import OrderCreate, OrderItemCreate, InvoiceResponse
from core import crud

router = APIRouter(prefix="/orders", tags=["Orders"])
