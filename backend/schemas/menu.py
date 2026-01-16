from pydantic import BaseModel


class MenuItemCreate(BaseModel):
    name: str
    category: str
    price: float


class MenuItemResponse(BaseModel):
    id: int
    name: str
    category: str
    price: float
    is_available: bool

    class Config:
        from_attributes = True
