from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from core import crud

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/inventory")
def inventory_report(db: Session = Depends(get_db)):
    data = crud.get_current_stock(db)

    return [
        {
            "inventory_item_id": row[0],
            "item_name": row[1],
            "unit": row[2],
            "current_stock": float(row[3])
        }
        for row in data
    ]

@router.get("/orders")
def orders_report(db: Session = Depends(get_db)):
    orders = crud.get_orders_summary(db)

    return [
        {
            "order_id": o.id,
            "table_number": o.table_number,
            "status": o.status
        }
        for o in orders
    ]

@router.get("/invoices")
def invoices_report(db: Session = Depends(get_db)):
    invoices = crud.get_invoices_summary(db)

    return [
        {
            "order_id": i.order_id,
            "subtotal": float(i.subtotal),
            "gst": float(i.gst_amount),
            "total": float(i.total_amount)
        }
        for i in invoices
    ]
