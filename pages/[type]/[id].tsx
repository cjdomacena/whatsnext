import { Suspense } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import MetaHeader from "../../lib/seo/MetaHeader";
import {
  CastCredit,
  Keywords,
  ProductionCredit,
} from "../../lib/types/credits";
import Image from "next/image";
import Link from "next/link";
import { getDetail } from "../../lib/api/getDetails";
import { Intersect } from "../../lib/types";
import { getDuration, getRating, getYear, parseMeta } from "../../lib/util";
import {
  TabLayout,
  TabMenu,
  TabContent,
} from "../../components/elements/tabs/DetailPage";
import Ratings from "../../components/Utils/Ratings";

export type DetailsProps = Intersect<"movie"> &
  Intersect<"tv"> & {
    credits: { cast: CastCredit[]; crew: ProductionCredit[] };
    keywords: Keywords;
  };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  if (
    (query.hasOwnProperty("type") &&
      query.hasOwnProperty("id") &&
      query.type === "movie") ||
    query.type === "tv"
  ) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: [query.type, query.id],
      queryFn: () => getDetail(query.type, query.id),
    });
    return {
      props: {
        hasError: false,
        dehydratedState: dehydrate(queryClient), // dehydrated state stores prefetched query
      },
    };
  }

  return {
    props: {
      hasError: true,
    },
    redirect: {
      destination: "/404",
    },
  };
};

const tabs: {
  value: string;
  name: string;
  withPing: boolean;
  isShowing: boolean;
}[] = [
  { value: "overview", name: "Overview", withPing: false, isShowing: true },
  { value: "cast", name: "Cast", withPing: false, isShowing: true },
  {
    value: "currentSeason",
    name: "Current Season",
    withPing: false,
    isShowing: true,
  },
  {
    value: "discussion",
    name: "Discussion",
    withPing: true,
    isShowing: true,
  },
];

const DetailPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { id, type } = router.query;
  const { data: details, error } = useQuery<DetailsProps, Error>(
    [type, id],
    () => getDetail(type, id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: router.isReady,
      staleTime: 5000,
      suspense: true,
    }
  );

  if (error) {
    throw error;
  }

  const keywords = details?.keywords.results
    ? details.keywords.results
    : details?.keywords.keywords;

  const { title, date } = parseMeta({ details: details, type: type });
  const score = getRating(details?.vote_average);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {details ? (
          <>
            <MetaHeader
              title={`${title} (${
                date ? getYear(date) : "NA"
              }) — WhatsNext: Platform for the lazy`}
              description="Your No. 1 source of movies"
            />
            <TitleHeader details={details} title={title} />

            <div className="my-24 container mx-auto w-full px-6 relative">
              <TabLayout>
                <TabMenu tabs={tabs} />
                <TabContent value="overview">
                  <div className="min-h-[450px] gap-12 flex  2xl:flex-nowrap xl:flex-nowrap lg:flex-nowrap md:flex-nowrap flex-wrap ">
                    <div className=" w-auto self-center mx-auto">
                      <div className="w-[300px] h-[450px] bg-neutral-900 relative">
                        <Image
                          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${details.poster_path}`}
                          alt=""
                          fill
                          loading="lazy"
                          className="object-contain  drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                        />
                      </div>
                    </div>
                    <div className="flex-grow max-w-[1000px] space-y-4">
                      <div>
                        <h2 className="text-4xl font-black 2xl:leading-loose xl:leading-loose lg:leading-loose leading-relaxed break-words">
                          Overview
                        </h2>
                        <p className="text-lg font-extralight leading-loose text-neutral-300">
                          {details.overview}
                        </p>
                      </div>
                    </div>
                    <div className=" h-auto text-neutral-500 space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-400">
                          Keywords
                        </h4>
                        <ul className=" mt-2 flex flex-wrap gap-2">
                          {keywords?.map((keyword) => (
                            <li
                              className="text-xs  text-neutral-500 w-fit rounded-full hover:text-neutral-400 "
                              key={keyword.id}
                            >
                              <Link href="/">{keyword.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-400">
                          Duration
                        </h4>
                        <p className="text-xs  text-neutral-500">
                          {details.runtime
                            ? getDuration(230)
                            : getDuration(details.episode_run_time[0])}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-400">
                          Rating
                        </h4>
                        <div className="pt-1">
                          <Ratings score={String(score).split(".")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabContent>
                <TabContent value="cast" />
              </TabLayout>
            </div>
          </>
        ) : null}
      </Suspense>
    </div>
  );
};

const TitleHeader = ({
  details,
  title,
}: {
  details: DetailsProps;
  title: string;
}) => {
  return (
    <div
      className={`w-full min-h-[600px] bg-cover bg-no-repeat bg-center  relative z-10 grid place-items-center`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.backdrop_path})`,
      }}
    >
      <div className="absolute w-full h-full top-0 left-0 z-20 bg-neutral-900/80 backdrop-blur"></div>
      <div className="container mx-auto z-30 ">
        <div className="w-fit mx-auto rounded space-y-8 text-center">
          <div>
            <h1 className="2xl:text-8xl xl:text-8xl lg:text-8xl text-4xl font-black">
              {title}
            </h1>
            <p className="2xl:text-2xl xl:text-2xl lg:text-2xl text-lg">
              {details?.tagline ?? null}
            </p>
          </div>
          <ul className="flex gap-4 text-xs justify-center flex-wrap">
            {details?.genres?.map((genre: { id: number; name: string }) => (
              <li
                key={genre.id}
                className=" text-neutral-300 px-6 py-2 rounded font-bold"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
