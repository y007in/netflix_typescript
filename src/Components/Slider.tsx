import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

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
  left: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 0;
  border: none;
  outline: none;
  // background-color: transparent;
  font-size: 1.6vw;
  z-index: 999;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 5,
  },
};

interface SliderProps {
  movie: IMovieTv[];
  genreData: { genres: IGenre[] } | undefined;
  movieListType: string;
}

const Slider = ({ movie, genreData, movieListType }: SliderProps) => {
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
  const totalMovies = movie?.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;

  const increaseIndex = () => {
    if (movie) {
      // if (leaving) return;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      // setLeaving(true);
    }
  };

  return (
    <Sliders>
      <AnimatePresence initial={false}>
        <Row
          variants={rowVariants}
          initial="hidden"
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
      <Btn onClick={increaseIndex}>next</Btn>
    </Sliders>
  );
};
export default Slider;
