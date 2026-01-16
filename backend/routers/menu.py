from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from core import crud
from schemas.menu import MenuItemCreate, MenuItemResponse

router = APIRouter(prefix="/menu", tags=["Menu"])

@router.post("/", response_model=MenuItemResponse)
def create_menu(
    data: MenuItemCreate,
    db: Session = Depends(get_db)
):
    return crud.create_menu_item(db, data)

@router.get("/", response_model=list[MenuItemResponse])
def get_menu(db: Session = Depends(get_db)):
    return crud.get_menu_items(db)

@router.put("/{item_id}/toggle")
def toggle_menu(item_id: int, db: Session = Depends(get_db)):
    item = crud.toggle_menu_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return {"message": "Menu availability updated"}
