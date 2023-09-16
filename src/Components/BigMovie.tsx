import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMoviebox = styled(motion.div)`
  position: absolute;
  width: 80vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 30px;
  overflow: hidden;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 99999;
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 350px;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 0 25px;
  font-size: 36px;
  position: relative;
  top: -100px;
`;
const BigBox = styled.div`
  display: flex;
  align-items : center;
  margin-left : 25px;
  margin-bottom : 10px;
  .hd {
    color: ${(props) => props.theme.white.lighter};
    border: 0.8px solid ${(props) => props.theme.white.lighter};
    border-radius: 5px;
    padding: 2px 5px ;
    font-size: 8px;
    font-weight: 500;
    margin-left: 5px;
  }
  .genre {
      &::after {
        content: "•";
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
`;

const BigPlayBtn = styled.button`
  border-radius: 5px;
  border: none;
  padding: 8px 20px 5px 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  .icon {
    margin-right: 5px;
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

const BigOverview = styled.p`
  width: 60%;
  padding: 5px 25px;
  color: ${(props) => props.theme.white.lighter};
`;

interface BigMovieProps {
  clickedMovie: IMovieTv | null;
  onPlusClick: () => void;
  onThumbClick: () => void;
  genreData: { genres: IGenre[] } | undefined;
  plus: boolean;
  thumb: boolean;
}

const BigMovie = ({
  clickedMovie,
  onPlusClick,
  onThumbClick,
  genreData,
  plus,
  thumb,
}: BigMovieProps) => {
  const history = useNavigate();
  const onOverlayClick = () => history(`/`);

  return (
    <>
      <BigMoviebox>
        {clickedMovie && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedMovie.backdrop_path,
                  "w500"
                )})`,
              }}
            />

            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigBox style={{ position: "absolute", top: "300px" }}>
              <BigPlayBtn style={{ margin: "0 10px 0 0" }}>▶️ 재생</BigPlayBtn>
              <InfoBtn
                onClick={onPlusClick}
                style={{
                  width: "30px",
                  height: "30px",
                  fontSize: "14px",
                }}
              >
                {plus ? (
                  <FontAwesomeIcon color="white" icon={faCheck} />
                ) : (
                  <FontAwesomeIcon color="white" icon={faPlus} />
                )}
              </InfoBtn>
              <InfoBtn
                onClick={onThumbClick}
                style={{
                  width: "30px",
                  height: "30px",
                  fontSize: "14px",
                }}
              >
                {thumb ? (
                  <FontAwesomeIcon color="white" icon={faThumbsUp} />
                ) : (
                  <FontAwesomeIcon
                    color="rgba(255,255,255,0.5)"
                    icon={faThumbsUp}
                  />
                )}
              </InfoBtn>
            </BigBox>
            <BigBox>
              <p style={{ margin: "0 5px 0 0" }}>
                {clickedMovie.adult ? "18세" : "15세 이상"}
              </p>
              <p style={{ fontWeight: "bold" }}>
                {clickedMovie.release_date?.slice(0, 4)}
              </p>
              <div className="hd">HD</div>
            </BigBox>
            <BigBox>
              {clickedMovie.genre_ids?.map((id) => (
                <span className="genre" key={id}>
                  {genreData?.genres.find((item) => item.id === id)?.name}
                </span>
              ))}
            </BigBox>

            <BigOverview>{clickedMovie.overview}</BigOverview>
            {/* <BigBox>
                        {characterData?.cast &&
                          clickedId !== null &&
                          characterData.cast
                            .filter((character) => character.id === clickedId)
                            .map((character) => (
                              <span key={character.id}>
                                {character.original_name}
                              </span>
                            ))}
                      </BigBox> */}
          </>
        )}
      </BigMoviebox>
    </>
  );
};

export default BigMovie;
