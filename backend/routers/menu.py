from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from core import crud
from schemas.menu import MenuItemCreate, MenuItemResponse

router = APIRouter(prefix="/menu", tags=["Menu"])
