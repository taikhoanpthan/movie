import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../models/movie";
import "./index.scss";
const { Meta } = Card;
interface CardcomponentProps {
  movie: Movie;
}
function Cardcomponent({ movie }: CardcomponentProps) {
  const navigate = useNavigate();
  return (
    <div className="huhu">
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={movie.avatar} />}
        actions={[
          <span onClick={() => navigate(`detail/${movie.id}`)}>
            Xem chi tiết
          </span>,
        ]}
      >
        <Meta title={<p>{movie.name}</p>} />
      </Card>
    </div>
  );
}

export default Cardcomponent;
