import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../models/movie";
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
            View Details
          </span>,
        ]}
      >
        <Meta
          title={
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{movie.name}</span>
              
            </p>
          }
        />
      </Card>
    </div>
  );
}

export default Cardcomponent;
