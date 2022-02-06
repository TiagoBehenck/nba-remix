import { addDays, format, subDays } from "date-fns";
import { Link, useLoaderData, useParams } from "remix";

export const loader = async () => {
  const today = new Date();
  const date = format(today, "yyyyMMdd");

  const response = await fetch(
    `http://data.nba.net/prod/v2/${date}/scoreboard.json`
  );

  return response.json();
};

export default function Index() {
  const { params } = useParams();
  const date = new Date(params || Date.now());
  const prevDate = subDays(date, 1);
  const nextDate = addDays(date, 1);

  const { games } = useLoaderData();

  return (
    <div>
      <h1>NBA Games</h1>

      <div>
        <Link to={`/${format(prevDate, "yyyyMMdd")}`}>&laquo;</Link>
        <p>{format(date, "dd MMMM yyyy")}</p>
        <Link to={`/${format(nextDate, "yyyyMMdd")}`}>&raquo;</Link>
      </div>

      <div>
        {games.map((game) => {
          return (
            <Link
              to={`/game/${game.seasonYear}/${game.gameId}`}
              key={game.gameId}>
              <div style={{ display: "flex" }}>
                <p>
                  {game.vTeam.score} {game.vTeam.triCode}
                </p>
                <p>{game.clock || "x"}</p>
                <p>
                  {game.hTeam.triCode} {game.hTeam.score}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
