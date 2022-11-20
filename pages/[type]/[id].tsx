import { Suspense } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import MetaHeader from "../../lib/seo/MetaHeader";
import MovieLayout from "../../components/Layouts/MovieLayout";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import {
  CastCredit,
  Keywords,
  ProductionCredit,
} from "../../lib/types/credits";
import Link from "next/link";
import { getDetail } from "../../lib/api/getDetails";
import { Intersect } from "../../lib/types";
import { parseMeta } from "../../lib/util";

enum DType {
  "tv",
  "movie",
}
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

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {details ? (
          <>
            <MetaHeader
              title={`${title} (${
                date ? date : "NA"
              }) — WhatsNext: Platform for the lazy`}
              description="Your No. 1 source of movies"
            />
            <TitleHeader {...details} />

            <MovieLayout>
              <Tabs.Root
                defaultValue="overview"
                orientation="horizontal"
                className="space-y-2"
              >
                <Tabs.List className="fixed bottom-8 left-0 grid place-items-center w-full grid-cols-1 z-50">
                  <div className=" bg-neutral-900/60 backdrop-blur  py-1 px-1 ring ring-neutral-900 w-auto gap-1 rounded-full flex justify-between items-center drop-shadow-[0_2px_10px_rgba(255,255,255,0.09)]">
                    {tabs.map((tab, index) =>
                      tab.isShowing ? (
                        <Trigger value={tab.value} key={tab.value + `${index}`}>
                          {tab.withPing ? (
                            <div className="rounded-full top-2 right-2 absolute bg-green-500/20 ">
                              <p className="p-[0.2rem] bg-green-500 rounded-full animate-ping"></p>
                            </div>
                          ) : null}
                          {tab.name}
                        </Trigger>
                      ) : null
                    )}
                  </div>
                </Tabs.List>
                <Tabs.Content value="overview">
                  <div className="min-h-[450px] gap-12 flex  2xl:flex-nowrap xl:flex-nowrap lg:flex-nowrap md:flex-nowrap flex-wrap">
                    <div className=" w-fit ">
                      <div className="w-[300px] h-[450px] bg-neutral-900 relative ">
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
                          {/* {details.name ?? details.title} */}
                        </h2>
                        <p className="text-lg font-extralight leading-loose text-neutral-300">
                          {details.overview}
                        </p>
                      </div>
                    </div>
                    <div className=" h-auto text-neutral-500">
                      {/* <div>
                        <h4 className="text-sm font-bold text-neutral-400">
                          Production
                        </h4>
                      </div> */}
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
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="cast">
                  <div className=" min-h-[400px]">
                    <h2 className="text-4xl font-black 2xl:leading-loose xl:leading-loose lg:leading-loose leading-relaxed break-words">
                      Current Season
                    </h2>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </MovieLayout>
          </>
        ) : null}
      </Suspense>
    </div>
  );
};

const Trigger: React.FC<React.PropsWithChildren<Tabs.TabsTriggerProps>> = (
  props
) => {
  return (
    <Tabs.Trigger
      className="data-[state='active']:bg-neutral-800 px-4 py-2 rounded-full text-xs transition-colors"
      {...props}
    >
      {props.children}
    </Tabs.Trigger>
  );
};

const TitleHeader = <T extends DetailsProps>(details: T) => {
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
              {details.name ?? details.title}
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
