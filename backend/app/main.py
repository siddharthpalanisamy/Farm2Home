from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from typing import Dict, Any

from .database import create_db_and_tables, get_session
from .models import Farmer, Product
from .crud import (
    create_farmer, get_farmers,
    create_product, get_products, get_product,
    update_product, delete_product
)

# IMPORTANT: This line MUST exist
app = FastAPI(title="Farm2Home API")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (you can restrict later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# ------------------ FARMER ROUTES ------------------

@app.post("/farmers")
def api_create_farmer(farmer: Farmer, session: Session = Depends(get_session)):
    return create_farmer(session, farmer)

@app.get("/farmers")
def api_get_farmers(session: Session = Depends(get_session)):
    return get_farmers(session)

# ------------------ PRODUCT ROUTES ------------------

@app.post("/products")
def api_create_product(product: Product, session: Session = Depends(get_session)):
    return create_product(session, product)

@app.get("/products")
def api_get_products(session: Session = Depends(get_session)):
    return get_products(session)

@app.get("/products/{product_id}")
def api_get_product_by_id(product_id: int, session: Session = Depends(get_session)):
    prod = get_product(session, product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod

@app.put("/products/{product_id}")
def api_update_product(product_id: int, data: Dict[Any, Any] = Body(...), session: Session = Depends(get_session)):
    updated = update_product(session, product_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated

@app.delete("/products/{product_id}")
def api_delete_product(product_id: int, session: Session = Depends(get_session)):
    ok = delete_product(session, product_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True}
