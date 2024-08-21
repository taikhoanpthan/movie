import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";
import { Movie } from "../../models/movie";
import { useParams } from "react-router-dom";
import { Card, Button, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string | undefined) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="detail-container">
      <Card
        cover={<img alt="example" src={movie?.avatar} />}
      >
        <p>
          <strong>Id: </strong>
          {movie?.id}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {movie?.dateofbirth
            ? moment(movie.dateofbirth).format("DD/MM/YYYY")
            : "N/A"}
        </p>

        <Meta
          title={
            <>
              <p>Tên: {movie?.name}</p>
              <p>Thể loại: {movie?.category ? "Học sinh" : "Người lớn"}</p>
            </>
          }
        />
        <p>
          <strong>Description: </strong>
          {movie?.description}
        </p>

        {/* Button to open modal */}
        <Button
          type="primary"
          onClick={showModal}
        >
          Xem Phim
        </Button>

        {/* Modal for playing video */}
        <Modal
          title={movie?.name}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          {movie?.videoUrl && (
            <iframe
              width="100%"
              height="450px"
              src={getYouTubeEmbedUrl(movie.videoUrl)}
              title={movie.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Modal>
      </Card>
    </div>
  );
}

export default Detail;
