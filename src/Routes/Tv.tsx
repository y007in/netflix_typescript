import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlay,
  faThumbsUp,
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  getTv,
  getPopularTv,
  getAirTv,
  getGenreMovies,
  IGetTvResult,
  IGetGenre,
} from "../api";
import { makeImagePath } from "../utill";
import styled from "styled-components";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import TvBox from "../Components/TvBox";

const Wrapper = styled.div`
  background: #000;
  height: 200vh;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h1`
  font-size: 55px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const OverView = styled.p`
  font-size: 20px;
  width: 50%;
  line-height: 140%;
  margin-bottom: 20px;
`;

const SliderBox = styled.div`
  position: relative;
  top: -100px;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
`;

const SliderTitle = styled.h1`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  font-weight: bold;
`;
const Slider = styled.div`
  margin-bottom: 250px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigTv = styled(motion.div)`
  position: absolute;
  width: 80vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 30px;
  overflow: hidden;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
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

const BigOverview = styled.p`
  width: 60%;
  padding: 5px 25px;
  color: ${(props) => props.theme.white.lighter};
`;
// Animation
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

type SectionType = "popular" | "nowPlaying" | "topRated";

// 한번에 보여주고 싶은 영화의 수 = 6
const offset = 6;

const Tv = () => {
  const history = useNavigate();
  const bigTvMatch: PathMatch<string> | null = useMatch("/tv/:tvId");
  const { scrollY } = useScroll();
  const { data: topRatedData, isLoading: isTopRatedLoading } =
    useQuery<IGetTvResult>(["tv", "topRated"], getTv);
  const { data: popularData, isLoading: isPopularLoading } =
    useQuery<IGetTvResult>(["tv", "popular"], getPopularTv);
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useQuery<IGetTvResult>(["tv", "nowPlaying"], getAirTv);
  const { data: genreData } = useQuery<IGetGenre>(
    ["tvs", "Genre"],
    getGenreMovies
  );

  const [popularIndex, setPopularIndex] = useState(0);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const [plus, setPlus] = useState(false);
  const onPlusClick = () => {
    setPlus(!plus);
  };
  const [thumb, setThumb] = useState(false);
  const onThumbClick = () => {
    setThumb(!thumb);
  };

  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * (popularData?.results.length || 0)
    );
    setRandomIndex(randomIndex);
  }, [popularData]);

  const increaseIndex = (section: SectionType) => {
    if (section === "popular" && nowPlayingData) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = nowPlayingData.results.length - 1;
      const maxIndex = Math.floor(totaltvs / offset) - 1;
      setPopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else if (section === "nowPlaying" && nowPlayingData) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = nowPlayingData.results.length - 1;
      const maxIndex = Math.floor(totaltvs / offset) - 1;
      setNowPlayingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else if (section === "topRated" && topRatedData) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = topRatedData.results.length - 1;
      const maxIndex = Math.floor(totaltvs / offset) - 1;
      setTopRatedIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history(`/tvs/${tvId}`);
  };

  let clickedTv = null;

  let clickedId: number | null = null;

  const onOverlayClick = () => history(`/`);
  if (bigTvMatch) {
    const tvId = bigTvMatch.params.tvId;
    if (popularData) {
      clickedTv = popularData.results.find((tv) => tv.id.toString() === tvId);
    } else if (nowPlayingData) {
      clickedTv = nowPlayingData.results.find(
        (tv) => tv.id.toString() === tvId
      );
    } else if (topRatedData) {
      clickedTv = topRatedData.results.find((tv) => tv.id.toString() === tvId);
    }
  }
  console.log(clickedTv);

  return (
    <Wrapper>
      {isPopularLoading || isNowPlayingLoading || isTopRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              popularData?.results[randomIndex]?.backdrop_path || ""
            )}
          >
            <Title>{popularData?.results[randomIndex]?.name}</Title>
            <OverView>{popularData?.results[randomIndex]?.overview}</OverView>
            <div style={{ display: "flex", gap: "10px" }}>
              <BigPlayBtn>
                <FontAwesomeIcon icon={faPlay} className="icon" />
                재생
              </BigPlayBtn>
              <BigPlayBtn>
                <FontAwesomeIcon
                  className="icon"
                  color="black"
                  icon={faCircleExclamation}
                />
                상세보기
              </BigPlayBtn>
            </div>
          </Banner>
          <SliderBox>
            <SliderTitle onClick={() => increaseIndex("popular")}>
              인기있는 영화
            </SliderTitle>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={popularIndex}
                >
                  {popularData?.results
                    .slice(1)
                    .slice(
                      offset * popularIndex,
                      offset * popularIndex + offset
                    )
                    .map((tv) => (
                      <TvBox
                        key={tv.id}
                        tv={tv}
                        genreData={genreData}
                        plus={plus}
                        thumb={thumb}
                        onPlusClick={onPlusClick}
                        onThumbClick={onThumbClick}
                        onBoxClicked={onBoxClicked}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderBox>
          <SliderBox>
            <SliderTitle onClick={() => increaseIndex("nowPlaying")}>
              현재 상영작
            </SliderTitle>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={nowPlayingIndex}
                >
                  {nowPlayingData?.results
                    .slice(1)
                    .slice(
                      offset * nowPlayingIndex,
                      offset * nowPlayingIndex + offset
                    )
                    .map((tv) => (
                      <TvBox
                        key={tv.id}
                        tv={tv}
                        genreData={genreData}
                        plus={plus}
                        thumb={thumb}
                        onPlusClick={onPlusClick}
                        onThumbClick={onThumbClick}
                        onBoxClicked={onBoxClicked}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderBox>
          <SliderBox>
            <SliderTitle onClick={() => increaseIndex("topRated")}>
              Top 10
            </SliderTitle>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={topRatedIndex}
                >
                  {topRatedData?.results
                    .slice(1)
                    .slice(
                      offset * topRatedIndex,
                      offset * topRatedIndex + offset
                    )
                    .map((tv) => (
                      <TvBox
                        key={tv.id}
                        tv={tv}
                        genreData={genreData}
                        plus={plus}
                        thumb={thumb}
                        onPlusClick={onPlusClick}
                        onThumbClick={onThumbClick}
                        onBoxClicked={onBoxClicked}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderBox>

          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigTv
                  layoutId={bigTvMatch.params.tvId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />

                      <BigTitle>{clickedTv.title}</BigTitle>
                      <BigBox style={{ position: "absolute", top: "300px" }}>
                        <BigPlayBtn style={{ margin: "0 10px 0 0" }}>
                          ▶️ 재생
                        </BigPlayBtn>
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
                          {clickedTv.adult ? "18세" : "15세 이상"}
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                          {clickedTv.release_date?.slice(0, 4)}
                        </p>
                        <div className="hd">HD</div>
                      </BigBox>
                      <BigBox>
                        {clickedTv.genre_ids?.map((id) => (
                          <span className="genre" key={id}>
                            {
                              genreData?.genres.find((item) => item.id === id)
                                ?.name
                            }
                          </span>
                        ))}
                      </BigBox>

                      <BigOverview>{clickedTv.overview}</BigOverview>
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
                </BigTv>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
