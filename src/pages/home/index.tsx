import React, { useEffect, useState } from "react";
import "./index.scss";
import { Movie } from "../../models/movie";
import api from "../../config/axios";
import Cardcomponent from "../../components/card";
function Home() {
  const [movies, setMovies] = useState<Movie[]>();
  const fetchMovie = async () => {
    try {
      const res = await api.get("vlxx");
      console.log(res.data);
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <div
      className="hii"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
    >
      {movies?.map((movieItem: Movie) => (
        <Cardcomponent key={movieItem.id} movie={movieItem} />
      ))}
    </div>
  );
}

export default Home;
