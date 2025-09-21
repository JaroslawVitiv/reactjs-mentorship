import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import Hamburger from "../Hamburger/Hamburger";
import "./MovieTile.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Reuse the Movie type from a shared types file if possible
interface Movie {
  id: number | string;
  title: string;
  poster_path: string;
  release_date: string;
  genres: string[];
  [key: string]: unknown;
}

interface MovieTileProps {
  item: Movie;
}

const MovieTile: React.FC<MovieTileProps> = ({ item }) => {
  const [opacity, setOpacity] = useState<number>(1);
  const [isHamburgerVisibile, setIsHamburgerVisibile] = useState<boolean>(false);
  const [isEditDeleteMenueVisible, setIsEditDeleteMenueVisible] =
    useState<boolean>(false);

  const getYear = (date?: string): string => {
    return date ? date.slice(0, 4) : "0";
  };

  const handleMouseOver = () => {
    setOpacity(0.5);
    if (!isEditDeleteMenueVisible) {
      setIsHamburgerVisibile(true);
    }
  };

  const handleMouseOut = () => {
    setOpacity(1);
    setIsHamburgerVisibile(false);
  };

  const hambugerClick = () => {
    setIsHamburgerVisibile(false);
    setIsEditDeleteMenueVisible(true);
  };

  const closeEditDeleteMenu = (isEditDeleteMenuClosed: boolean) => {
    setIsEditDeleteMenueVisible(!isEditDeleteMenuClosed);
  };

  return (
    <div
      className="movie-tile"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link
        to={`/movie/${item.id}`}
        className="movie-tile-link"
        aria-label={item.title}
      >
        <div
          style={{
            opacity: opacity,
            backgroundImage: `url(${item.poster_path})`,
            backgroundSize: "cover",
            width: "250px",
            height: "350px",
          }}
        >
          {isHamburgerVisibile && (
            <Hamburger handleHamburger={hambugerClick} />
          )}
          {isEditDeleteMenueVisible && (
            <EditDeleteMenu
              item={item}
              handleCloseEditDeleteMenu={closeEditDeleteMenu}
            />
          )}
        </div>
      </Link>
      <div className="title">
        <div>{item.title}</div>
        <div className="year">{getYear(item.release_date)}</div>
      </div>
      <div className="genres">{item.genres.join(", ")}</div>
    </div>
  );
};

export default MovieTile;
