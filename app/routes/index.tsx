import { format } from 'date-fns'
import { LinksFunction, useLoaderData } from 'remix'
import type { LoaderFunction, MetaFunction } from 'remix'

import API from '~/api'
import DateSelector from '~/components/DateSelector'
import { links as dayPickerInputStyles } from '~/components/DayPickerInput'
import GamesList from '~/components/GamesList'
import Layout from '~/components/Layout'

import { DATE_LINK_FORMAT } from '~/constants'
import { getDays } from '~/utils/handleApiDates'
import { getSocialMetas, getUrl } from '~/utils/seo'

export const links: LinksFunction = () => [...dayPickerInputStyles()]

export const meta: MetaFunction = ({ data }) => {
  return getSocialMetas({
    url: getUrl(data.requestInfo),
    origin: data.requestInfo.origin,
    title: 'Games for today | NBA Remix',
    description: 'See NBA game results and standings powered by Remix.run',
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const today = new Date()
  const date = format(today, DATE_LINK_FORMAT)
  const url = new URL(request.url)

  const requestInfo = {
    origin: url.origin,
    pathname: url.pathname,
  }

  const {
    data: { games },
  } = await API.getGamesByDate(date)

  return {
    games,
    requestInfo,
  }
}

export default function Index() {
  const { day, prevDay, nextDay } = getDays()
  const { games } = useLoaderData()

  return (
    <Layout>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />

      <GamesList games={games} />
    </Layout>
  )
}
