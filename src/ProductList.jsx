import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './CartSlice';
import plantsArray from './plantsData';
import { styleObj, styleObjUl, styleA } from './ProductListStyles';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        const isInCart = cartItems.some((item) => item.name === product.name);
        if (!isInCart) {
            dispatch(addItem(product));
        } else {
            dispatch(removeItem(product.name));
        }
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div className="navbar-plants-title">
                        <a href="#" onClick={handlePlantsClick} className="navbar-plants-link">
                            🌿 PLANTS
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <div className="cart-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                                    <rect width="256" height="256" fill="none" />
                                    <circle cx="80" cy="216" r="12" />
                                    <circle cx="184" cy="216" r="12" />
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                                {cartItems.length > 0 && (
                                    <span className="cart-counter">{cartItems.length}</span>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 className="category-title">{category.category}</h1>
                            <div className="product-list">
                                {category.plants.map((plant, idx) => {
                                    const isInCart = cartItems.some((item) => item.name === plant.name);
                                    return (
                                        <div className="product-card" key={idx}>
                                            <img className="product-image" src={plant.image} alt={plant.name} />
                                            <div className="product-title">{plant.name}</div>
                                            <div className="product-cost">{plant.cost}</div>
                                            <div className="product-description">{plant.description}</div>
                                            <button
                                                className="add-to-cart-button"
                                                onClick={() => handleAddToCart(plant)}
                                                style={{
                                                    backgroundColor: isInCart ? "gray" : "green",
                                                    color: "white",
                                                }}
                                            >
                                                {isInCart ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
