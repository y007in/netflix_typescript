import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import React from "react";
import { useNavigate, useMatch, PathMatch, useParams } from "react-router-dom";

import { IMovieTv } from "../api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 9;
`;
interface BigMovieProps {
  clickedMovie: IMovieTv | null;
}

const BigMovie = ({ clickedMovie }: BigMovieProps) => {
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  return (
    <AnimatePresence>
      {/* {bigMovieMatch ? (
        <>
          <Overlay
            // onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </>
      ) : null} */}
    </AnimatePresence>
  );
};

export default BigMovie;
