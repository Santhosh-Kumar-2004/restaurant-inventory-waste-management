from schemas.schema import UserCreate, UserLogin, UserResponse, RoleUpdate
import models
from core.crud import create_user
from sqlalchemy.orm import Session

@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(
        db,
        user.full_name,
        user.email,
        user.password
    )
