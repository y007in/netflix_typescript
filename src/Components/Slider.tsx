import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { IMovieTv, IGenre } from "../api";
import MovieBox from "./MovieBox";

const Sliders = styled.div`
  margin-bottom: 250px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Btn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 1);
  font-size: 1.6vw;
  cursor: pointer;
  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
  svg {
    opacity: 0.3;
    transition: 0.3s;
    &:hover {
      opacity: 1;
    }
  }
`;

const rowVariants = {
  entry: (back: boolean) => ({
    x: back ? -window.innerWidth - 5 : window.innerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
};

interface SliderProps {
  movie: IMovieTv[];
  genreData: { genres: IGenre[] } | undefined;
  movieListType: string;
}

const Slider = ({ movie, genreData, movieListType }: SliderProps) => {
  const [back, setBack] = useState(false);
  const history = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const [plus, setPlus] = useState(false);
  const onPlusClick = () => {
    setPlus(!plus);
  };
  const [thumb, setThumb] = useState(false);
  const onThumbClick = () => {
    setThumb(!thumb);
  };

  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  const offset = 6;
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const totalMovies = movie?.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const decreaseIndex = () => {
    if (movie) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseIndex = () => {
    if (movie) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <>
      <Sliders>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            custom={back}
            variants={rowVariants}
            initial="entry"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {movie
              .slice(1)
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <MovieBox
                  key={movie.id}
                  movie={movie}
                  genreData={genreData}
                  movieListType={movieListType}
                  plus={plus}
                  thumb={thumb}
                  onPlusClick={onPlusClick}
                  onThumbClick={onThumbClick}
                  onBoxClicked={() => onBoxClicked(movie.id)}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Sliders>
      <Btn onClick={decreaseIndex}>
        <FontAwesomeIcon color={"white"} icon={faChevronLeft} />
      </Btn>
      <Btn onClick={increaseIndex}>
        <FontAwesomeIcon color={"white"} icon={faChevronRight} />
      </Btn>
    </>
  );
};
export default Slider;
