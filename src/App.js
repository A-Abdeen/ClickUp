import React, { useState } from "react";
import "./App.css";

/*
=======================================
To do list:
=======================================
when 2 scrolls are available, make upgrade button available for sword
when 4 scrolls are available, make upgrade button available for star
add third weapon
layout, styling, animations and enemies
enable assitive attack upgrade
enable full auto attack upgrades
=======================================
*/

function App() {
  // Start Game
  const startGame = () => setEnemyHp(enemyHp + 20);

  // Hitpoints structure
  const [sword, setSword] = useState(-2);
  const upgradeSword = () => {
    setSword(sword * 2);
    setScroll(scroll - 2); /* useEffect setInterval if condition */
  };

  const [star, setStar] = useState(-1);
  const upgradeStar = () => {
    setStar(star * 2);
    setScroll(scroll - 4); /* useEffect setInterval if condition */
  };

  // Secondary weapon deployment
  const starButton = () => {
    if (enemyKills > 4)
      return (
        <button
          onClick={attackEnemy2}
          type="button"
          className="btn btn-primary"
        >
          Ninja Stars
        </button>
      );
    else
      return (
        <button type="button" className="btn btn-secondary" disabled>
          Kill 5 enemies!
        </button>
      );
  };

  // Scrolls
  const [scroll, setScroll] = useState(0); /* kill spree dependent */
  const [scLedger, setScLedger] = useState(0); /* Ledger to help transaction  */

  const impScrolls = () => {
    if (scLedger > 3) {
      setScLedger(0); /* add button that can be disabled for upgrade function*/
      setScroll(scroll + 1);
    }
  };

  // Current kill spree
  const [enemyKills, setEnemyKills] = useState(0); /* Based on respawning */
  const killedOne = () => {
    setEnemyKills(enemyKills + 1);
    setScLedger(scLedger + 1);
  };

  // Enemy HP and respawning
  const [counter, setCounter] = useState(30);
  const [enemyHp, setEnemyHp] = useState(0);

  const attackEnemy1 = () => {
    if (enemyHp > 2) {
      setEnemyHp(Math.ceil(enemyHp + sword));
    } else {
      enemyRespawn();
      impScrolls();
    }
  };
  const attackEnemy2 = () => {
    if (enemyHp > 2) {
      setEnemyHp(Math.ceil(enemyHp + star));
    } else {
      enemyRespawn();
      impScrolls();
    }
  };

  const enemyRespawn = () => {
    setCounter(Math.ceil(counter * 1.1));
    setEnemyHp(counter);
    killedOne();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={startGame}
          type="button"
          class="btn btn-primary btn-lg btn-block"
        >
          Start Game
        </button>

        <img
          src="http://pixelartmaker.com/art/ab46bfd33661598.png"
          className="Items"
          alt="Sword - Primary Weapon"
        />

        <button
          onClick={attackEnemy1}
          type="button"
          className="btn btn-primary"
          disabled={false}
        >
          Ninja Sword
        </button>

        <img
          src="http://pixelartmaker.com/art/fb575e0da47165a.png"
          className="Items"
          alt="Star - Secondary Weapon"
        />
        {starButton()}

        <img
          src="http://pixelartmaker.com/art/00a104b9b988a8e.png"
          className="Items"
          alt="Ancient Scroll"
        />

        <h6> Enemy HP {enemyHp}</h6>
        <h6> Death Count: {enemyKills}</h6>
        <h6> {scLedger}/5 Scroll Pieces</h6>
        <h6> Complete Scrolls: {scroll}</h6>
      </header>
    </div>
  );
}

export default App;
