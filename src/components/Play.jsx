import classNames from "classnames"
import { useEffect, useState } from "react";

export default function Play(gameData) {
  const [url, setUrl] = useState('');
  const [clickLocation, setClickLocation] = useState(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    console.log(x, y);
  }

  return (
    <div className={classNames('fullscreen')} onClick={handleClick}>
      {/* <img src={url} alt="where's waldo puzzle" /> */}
    </div>
  )
}
