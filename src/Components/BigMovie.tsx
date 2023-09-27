import React from "react";

const BigMovie = () => {
  return (
    <div>
      {/* <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              layoutId={bigMovieMatch.params.movieId}
              style={{ top: scrollY.get() + 100 }}
            >
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
                  {characterData?.cast &&
                    characterData.cast.map((character) => (
                      <span key={character.id}>{character.original_name}</span>
                    ))}
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence> */}
    </div>
  );
};

export default BigMovie;
