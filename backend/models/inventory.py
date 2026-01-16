from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, Enum
from sqlalchemy.orm import relationship
from core.database import Base
import enum


class InventoryUnit(enum.Enum):
    kg = "kg"
    liter = "liter"
    piece = "piece"


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    unit = Column(Enum(InventoryUnit), nullable=False)
    minimum_stock = Column(Numeric(10, 2), default=0)


class InventoryInflow(Base):
    __tablename__ = "inventory_inflow"

    id = Column(Integer, primary_key=True)
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    quantity = Column(Numeric(10, 2), nullable=False)
    unit = Column(Enum(InventoryUnit), nullable=False)
    received_by = Column(Integer, ForeignKey("users.id"))


class InventoryOutflow(Base):
    __tablename__ = "inventory_outflow"

    id = Column(Integer, primary_key=True)
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    quantity = Column(Numeric(10, 2), nullable=False)
    unit = Column(Enum(InventoryUnit), nullable=False)
    reason = Column(String)
    used_by = Column(Integer, ForeignKey("users.id"))


class WasteLog(Base):
    __tablename__ = "waste_logs"

    id = Column(Integer, primary_key=True)
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    quantity = Column(Numeric(10, 2), nullable=False)
    unit = Column(Enum(InventoryUnit), nullable=False)
    reason = Column(String)
    reported_by = Column(Integer, ForeignKey("users.id"))
