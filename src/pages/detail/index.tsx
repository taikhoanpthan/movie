import { useEffect, useState, useRef } from "react";
import "./index.scss";
import api from "../../config/axios";
import { Movie } from "../../models/movie";
import { useParams } from "react-router-dom";
import { Card, Button, Modal, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // Tạo ref để tham chiếu đến phần tử video

  const fetchMovie = async () => {
    try {
      const res = await api.get<Movie>(`vlxx/${id}`);
      setMovie(res.data);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Dừng phát video
      videoRef.current.currentTime = 0; // Reset lại thời gian phát về 0 (tuỳ chọn)
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Dừng phát video khi modal bị tắt
      videoRef.current.currentTime = 0; // Reset lại thời gian phát về 0 (tuỳ chọn)
    }
  };

  return (
    <div className="detail-container">
      <Card
        className="movie-card"
        cover={<img alt={movie?.name} src={movie?.avatar} />}
      >
        {/* Movie Info Section */}
        <h1 className="movie-title">{movie?.name}</h1>
        <div className="movie-details">
          <p><strong>Year:</strong> {movie?.dateofbirth ? moment(movie.dateofbirth).format("YYYY") : "N/A"}</p>
        </div>

        {/* Rating */}
        <div className="rating">
          <Rate disabled defaultValue={4.5} style={{ fontSize: 20 }} />
          <span>{` ${movie?.rating || "4.5"}/5`}</span>
        </div>

        {/* Description */}
        <p className="movie-description">
          <strong>Description:</strong> {movie?.description}
        </p>

        {/* Watch Buttons */}
        <div className="button-group">
          <Button type="primary" className="watch-btn" onClick={showModal}>
            Watch Movie
          </Button>
          <Button type="default" className="watch-btn">
            Watch Trailer
          </Button>
        </div>

        {/* Modal for video */}
        <Modal
          title={movie?.name}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          {movie?.videoUrl && (
            <video ref={videoRef} width="100%" height="450px" controls>
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Modal>
      </Card>
    </div>
  );
}

export default Detail;
