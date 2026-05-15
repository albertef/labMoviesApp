import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

interface WriteReviewProps {
  movie: DiscoverMovieOverviewProps;
}

const WriteReview = ({ movie }: WriteReviewProps) => {
  return (
    <Link to={`/reviews/${movie.id}`} style={{ textDecoration: "none" }}>
      <Button variant="contained" size="small" color="primary">
        Write Review
      </Button>
    </Link>
  );
};

export default WriteReview;
