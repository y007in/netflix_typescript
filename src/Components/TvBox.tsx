// tvBox.tsx

import React from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlay,
  faThumbsUp,
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { makeImagePath } from "../utill";
import { IGenre, IMovieTv } from "../api";

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  font-size: 66px;
  position: relative;
  top: 10px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  h4 {
    position: absolute;
    top: 40%;
    left: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .info_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 8px 10px;
    background-color: ${(props) => props.theme.black.lighter};
    .genre {
      font-size: 12px;
      &::after {
        content: "•";
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
    }
  }
`;
const InfoBox = styled.div`
  display: flex;
  padding: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  .hd {
    color: ${(props) => props.theme.white.lighter};
    border: 1px solid ${(props) => props.theme.white.lighter};
    border-radius: 5px;
    padding: 1px 3px;
    font-size: 8px;
    font-weight: bold;
    margin-left: 5px;
  }
`;
const InfoBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 50%;
  background-color: ${(props) => props.theme.black.lighter};
  font-size: 10px;
  color: #000;
  cursor: pointer;
  &:first-child {
    background-color: ${(props) => props.theme.white.lighter};
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.5,
    y: -50,
    transition: {
      // delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      // delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface TvBoxProps {
  tv: IMovieTv;
  genreData: { genres: IGenre[] } | undefined;
  plus: boolean;
  thumb: boolean;
  onPlusClick: () => void;
  onThumbClick: () => void;
  onBoxClicked: (tvId: number) => void;
}

const TvBox = ({
  tv,
  genreData,
  plus,
  thumb,
  onPlusClick,
  onThumbClick,
  onBoxClicked,
}: TvBoxProps) => {
  return (
    <Box
      layoutId={`box-${tv.id}`}
      key={tv.id}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(tv.id)}
      bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
    >
      <Info variants={infoVariants}>
        <h4>{tv.name}</h4>
        <div className="info_content">
          <InfoBox>
            <InfoBtn>
              <FontAwesomeIcon color="black" icon={faPlay} />
            </InfoBtn>
            <InfoBtn onClick={onPlusClick}>
              {plus ? (
                <FontAwesomeIcon color="white" icon={faCheck} />
              ) : (
                <FontAwesomeIcon color="white" icon={faPlus} />
              )}
            </InfoBtn>
            <InfoBtn onClick={onThumbClick}>
              {thumb ? (
                <FontAwesomeIcon color="white" icon={faThumbsUp} />
              ) : (
                <FontAwesomeIcon
                  color="rgba(255,255,255,0.5)"
                  icon={faThumbsUp}
                />
              )}
            </InfoBtn>
          </InfoBox>
          <InfoBox>
            {tv.adult ? "18+" : "15+"}
            <div className="hd">HD</div>
          </InfoBox>
          <InfoBox>
            {tv.genre_ids?.map((id) => (
              <span className="genre" key={id}>
                {genreData?.genres.find((item) => item.id === id)?.name}
              </span>
            ))}
          </InfoBox>
        </div>
      </Info>
    </Box>
  );
};

export default TvBox;
