import { useParams } from "react-router-dom";
import TvDetails from "../components/TvDetails";
import { useTvDetails, useTvCredits } from "../hooks/useMovie";
import PageTemplate from "../components/TemplateMoviePage";

const TvDetailsPage = () => {
  const { id } = useParams();
  const { data: tv, isLoading, isError, error } = useTvDetails(id ?? "");
  const { data: credits } = useTvCredits(id ?? "");

  if (isLoading) {
    return <p>Loading TV details...</p>;
  }

  if (isError) {
    return <p>Error loading TV: {error?.message ?? "Unknown error"}</p>;
  }

  return (
    <>
      {tv ? (
        <PageTemplate
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          movie={tv as any}
        >
          <TvDetails {...tv} cast={credits?.cast || []} />
        </PageTemplate>
      ) : (
        <p>Waiting for TV details</p>
      )}
    </>
  );
};

export default TvDetailsPage;
