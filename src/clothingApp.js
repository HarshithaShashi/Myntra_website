import React, { useState, useEffect } from 'react';
import './clothingApp.css'; // Ensure this file is correctly imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const outfits = [
    { id: 1, style: 'fairycore', image: 'images/outfit1.jpg', creator: 'User1' },
    { id: 2, style: 'fairycore', image: 'images/outfit2.jpg', creator: 'User2' },
    { id: 3, style: 'fairycore', image: 'images/outfit3.jpg', creator: 'User3' },
    { id: 4, style: 'fairycore', image: 'images/outfit4.jpg', creator: 'User4' },
    { id: 5, style: 'acubi', image: 'images/outfit5.jpg', creator: 'User5' },
    { id: 6, style: 'acubi', image: 'images/outfit6.jpg', creator: 'User6' },
    { id: 7, style: 'acubi', image: 'images/outfit7.jpg', creator: 'User7' },
    { id: 8, style: 'acubi', image: 'images/outfit8.jpg', creator: 'User8' },
    { id: 9, style: 'beaches', image: 'images/outfit9.jpg', creator: 'User9' },
    { id: 10, style: 'beaches', image: 'images/outfit10.jpg', creator: 'User10' },
    { id: 11, style: 'beaches', image: 'images/outfit11.jpg', creator: 'User11' },
    { id: 12, style: 'beaches', image: 'images/outfit12.jpg', creator: 'User12' },
    { id: 13, style: 'casuals', image: 'images/outfit13.jpg', creator: 'User13' },
    { id: 14, style: 'casuals', image: 'images/outfitsp.jpg', creator: 'User14' },
    { id: 15, style: 'casuals', image: 'images/outfit15.jpg', creator: 'User15' },
    { id: 16, style: 'casuals', image: 'images/outfit16.jpg', creator: 'User16' }
];

function ClothingApp() {
    const [filteredOutfits, setFilteredOutfits] = useState([]);

    useEffect(() => {
        filterByStyle('fairycore'); // Initial display
    }, []);

    const filterByStyle = (style) => {
        const filtered = outfits.filter(outfit => outfit.style === style);
        setFilteredOutfits(filtered);
    };

    const openModal = (imageUrl) => {
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('modalImg');
        modal.style.display = "block";
        modalImg.src = imageUrl;

        const span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
    };

    const likeOutfit = (id) => {
        alert(`Liked outfit with id: ${id}`);
    };

    const saveOutfit = (id) => {
        alert(`Saved outfit with id: ${id}`);
    };

    const addToCart = (id) => {
        alert(`Added outfit with id: ${id} to cart`);
    };

    return (
        <div>
            <header>
                <div className="top-nav">
                    <div className="logo">
                        <h1>MYNTRA COMMUNITY</h1>
                    </div>
                    <div className="style-buttons">
                        <button onClick={() => filterByStyle('fairycore')}>Fairycore</button>
                        <button onClick={() => filterByStyle('acubi')}>Acubi</button>
                        <button onClick={() => filterByStyle('beaches')}>Beaches</button>
                        <button onClick={() => filterByStyle('casuals')}>Casuals</button>
                    </div>
                </div>
            </header>

            <main className="outfit-grid">
                {filteredOutfits.map(outfit => (
                    <div key={outfit.id} className="outfit-card">
                        <div className="outfit-username">{outfit.creator}</div>
                        <img src={outfit.image} alt="Outfit" onClick={() => openModal(outfit.image)} />
                        <div className="outfit-card-footer">
                            <button onClick={() => likeOutfit(outfit.id)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button className="save-btn" onClick={() => saveOutfit(outfit.id)}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </button>
                            <button onClick={() => addToCart(outfit.id)}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            <div id="myModal" className="modal">
                <span className="close">&times;</span>
                <img className="modal-content" id="modalImg" />
            </div>
        </div>
    );
}

export default ClothingApp;
