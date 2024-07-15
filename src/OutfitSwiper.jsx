import React, { useEffect, useState } from 'react';
// import './styles.css';

const outfits = [
  {
    id: 'VGT119',
    image: 'images/outfit6.jpg',
    description: 'Square-neck Top',
    hashtags: '#croptop  #casual  #blue  #🫐',
    price: '₹899',
    rating: 4
  },
  {
    id: 'OYRW780',
    image: 'images/outfit7.jpg',
    description: 'Long Satin Skirt',
    hashtags: '#longskirt  #peach  #night  #elegant  #✨🎀🥂',
    price: '₹1499',
    rating: 5
  },
  {
    id: 'PIU630',
    image: 'images/outfit3.jpg',
    description: 'Corset Olive Skort',
    hashtags: '#corset  #skort  #skirt  #olive',
    price: '₹1999',
    rating: 3
  },
  {
    id: 'OOT343',
    image: 'images/outfit4.jpg',
    description: 'Cottagecore Short-frock',
    hashtags: '#spring  #frock  #white  #cottagecore  #🤍🪻',
    price: '₹2999',
    rating: 4
  },
  {
    id: 'AO2223',
    image: 'images/outfit5.jpg',
    description: 'Frilled Casual Summer Top',
    hashtags: '#casual  #frilled  #summer',
    price: '₹999',
    rating: 5
  }
];

const OutfitSwiper = () => {
  const [startX, setStartX] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const threshold = 100;

  useEffect(() => {
    const app = document.getElementById('app');

    const handleMouseMove = (e) => {
      if (!currentCard) return;
      const diffX = e.clientX - startX;
      currentCard.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.05}deg)`;

      if (diffX > 0) {
        document.getElementById('like-button').style.transform = 'scale(1.5)';
        document.getElementById('dislike-button').style.transform = 'scale(1)';
      } else {
        document.getElementById('dislike-button').style.transform = 'scale(1.5)';
        document.getElementById('like-button').style.transform = 'scale(1)';
      }
    };

    const handleMouseUp = (e) => {
      if (!currentCard) return;
      const diffX = e.clientX - startX;
      const outfitId = currentCard.querySelector('.item-id').textContent.split(': ')[1];

      if (Math.abs(diffX) > threshold) {
        const outfitData = {
          id: outfitId,
          description: currentCard.querySelector('.description').textContent,
        };

        if (diffX > 0) {
          sendOutfitStatus(outfitData, 'like');
          storeOutfitStatus(outfitData, 'likedOutfits');
        } else {
          sendOutfitStatus(outfitData, 'dislike');
          storeOutfitStatus(outfitData, 'dislikedOutfits');
        }

        currentCard.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        currentCard.style.transform = `translateX(${diffX > 0 ? '500px' : '-500px'}) rotate(${diffX * 0.05}deg)`;
        currentCard.style.opacity = '0';
        setTimeout(() => {
          currentCard.remove();
        }, 1000);
      } else {
        currentCard.style.transform = 'translateX(0) rotate(0)';
      }

      currentCard.classList.remove('dragging');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setCurrentCard(null);

      document.getElementById('like-button').style.transform = 'scale(1)';
      document.getElementById('dislike-button').style.transform = 'scale(1)';
    };

    const handleMouseDown = (e) => {
      const card = e.target.closest('.card');
      if (card) {
        setStartX(e.clientX);
        setCurrentCard(card);
        card.classList.add('dragging');
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    };

    app.addEventListener('mousedown', handleMouseDown);

    return () => {
      app.removeEventListener('mousedown', handleMouseDown);
    };
  }, [startX, currentCard]);

  const sendOutfitStatus = async (outfit, status) => {
    // const url = `http://localhost:3000/api/${status}`;
    // await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(outfit),
    // });
  };

  const storeOutfitStatus = (outfit, status) => {
    const storedOutfits = JSON.parse(localStorage.getItem(status)) || [];
    storedOutfits.push(outfit);
    localStorage.setItem(status, JSON.stringify(storedOutfits));
  };

  return (
    <div id="app">
      {outfits.map((outfit, index) => (
        <div className="card" key={index}>
          <img src={outfit.image} alt="Outfit Image" className="outfit-image" />
          <div className="details">
            <p className="description">{outfit.description}</p>
            <p className="item-id">ID: {outfit.id}</p>
            <p className="hashtags">{outfit.hashtags}</p>
            <p className="price">{outfit.price}</p>
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < outfit.rating ? '★' : '☆'}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button id="like-button" className="like-button">❤️</button>
      <button id="dislike-button" className="dislike-button">❌</button>
    </div>
  );
};

export default OutfitSwiper;
