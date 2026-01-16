from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(Integer)
    status = Column(String, default="placed")
    created_by = Column(Integer, ForeignKey("users.id"))


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price_per_unit = Column(Numeric(10, 2), nullable=False)


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"), unique=True)
    subtotal = Column(Numeric(10, 2), nullable=False)
    gst_rate = Column(Numeric(5, 2), nullable=False)
    gst_amount = Column(Numeric(10, 2), nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
