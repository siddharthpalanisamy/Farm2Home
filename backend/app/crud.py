from sqlmodel import Session, select
from .models import Farmer, Product
from datetime import datetime

# ------------------ FARMERS ------------------

def create_farmer(session: Session, farmer: Farmer):
    session.add(farmer)
    session.commit()
    session.refresh(farmer)
    return farmer

def get_farmers(session: Session):
    return session.exec(select(Farmer)).all()


# ------------------ PRODUCTS ------------------

def create_product(session: Session, product: Product):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

def get_products(session: Session):
    return session.exec(select(Product)).all()

def get_product(session: Session, product_id: int):
    return session.get(Product, product_id)

def update_product(session: Session, product_id: int, data: dict):
    product = session.get(Product, product_id)
    if not product:
        return None

    for key, value in data.items():
        if hasattr(product, key):
            setattr(product, key, value)

    product.updated_at = datetime.utcnow()

    session.add(product)
    session.commit()
    session.refresh(product)
    return product

def delete_product(session: Session, product_id: int):
    product = session.get(Product, product_id)
    if not product:
        return False

    session.delete(product)
    session.commit()
    return True
