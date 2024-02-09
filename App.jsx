import { useState, useRef } from "react";
import treatyoubetter from "/treatyoubetter.mp3"; // Import your MP3 file

var localCounter = 0;
if (localStorage.getItem('myHearts')) {
  localCounter = parseInt(localStorage.getItem('myHearts'));
}

function App() {
  let screenWidth = screen.width;
  const [hearts, setHearts] = useState([]);
  const [isButtonHeld, setIsButtonHeld] = useState(false);
  const [counter, setCounter] = useState(localCounter);
  const audioRef = useRef(new Audio(treatyoubetter)); // Create a ref for the audio element
  const intervalRef = useRef(null); // Ref to hold the interval ID

  const genHeart = () => {
    const newHeart = {
      id: Math.random().toString(36).substr(2, 9),
      left: Math.random() * 100 + 'vw',
    };

    setHearts(prevHearts => [...prevHearts, newHeart]);
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
    }, 1500);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const genLoopHeart = () => {
    audioRef.current.play();
    const newHeart = {
      id: Math.random().toString(36).substr(2, 9),
      left: Math.random() * 100 + 'vw',
    };

    setHearts(prevHearts => [...prevHearts, newHeart]);
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
    }, 1500);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleMouseDown = () => {
    if (!isButtonHeld) genHeart();
    intervalRef.current = setInterval(() => {
      setIsButtonHeld(true);
      genLoopHeart();
    }, 1000); // Adjust this time interval as needed

  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
    localStorage.setItem('myHearts', counter);
    setIsButtonHeld(false);
    audioRef.current.pause();
  };

  const handleTouchStart = () => {
    if (!isButtonHeld) genHeart();
    intervalRef.current = setInterval(() => {
      setIsButtonHeld(true);
      genLoopHeart();
    }, 1000); // Adjust this time interval as needed
  }
  const handleTouchEnd = () => {
    clearInterval(intervalRef.current);
    localStorage.setItem('myHearts', counter);
    setIsButtonHeld(false);
    audioRef.current.pause();
  };

  const secretMsg = "I LIKE YOU(with rizz) T IGER's Mommy";
  const secretMsg1 = "Daymm you still goin, rizz ++";
  return (
    <>
      <div className="container">
        <div style={{ color: 'white', marginTop: '2px', fontSize: '20px' }}>
          Press the heart {!isButtonHeld && (<>🥺</>)} {isButtonHeld && (<>😏</>)}
        </div>
        {counter > 500 && counter <= 1000 && (
          <>
            <div className="hiddenMsg">
              {secretMsg}
            </div>
          </>
        )}

        {counter > 1000 && (
          <>
            <div className="hiddenMsg">
              {secretMsg1}
            </div>
          </>
        )}

        <div className="btn-container">
          <div
            className={`heartBtnBg${isButtonHeld ? " animated" : ""}`}
          // onAnimationEnd={() => setIsButtonHeld(false)}
          ></div>
          <div className="heartBtn"></div>
          {screenWidth < 1000 && (
            <button
              className="overlayBtn"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            ></button>
          )}
          {screenWidth >= 1000 && (
            <button
              className="overlayBtn"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            ></button>
          )}

        </div>

        <div id="heartContainer">
          {hearts.map(heart => (
            <div key={heart.id} className="heart" style={{ left: heart.left }}></div>
          ))}
        </div>
        <div id="counter">
          <span>Shawty got</span>
          <span style={{ width: '100px', textAlign: 'center' }}>{counter}</span>
          <span>hearts??!</span>
        </div>
        <div style={{ color: 'white' }}>From Jai</div>
      </div>
      {/* Audio element */}
      <audio ref={audioRef} src={treatyoubetter} />
    </>
  )
}

export default App
