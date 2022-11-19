import { Suspense } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import MetaHeader from "../../lib/seo/MetaHeader";
import MovieLayout from "../../components/Layouts/MovieLayout";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import { Intersect } from "../../lib/types/movies";
import * as Tabs from "@radix-ui/react-tabs";
const getDetail = async (
  type: string | string[] | undefined,
  id: number | string | undefined | string[]
) => {
  try {
    const url = `/api/${type}/${id}`;
    const req = await fetch(url);
    const res = await req.json();
    if (res.hasOwnProperty("error")) {
      throw new Error(res.error);
    }
    if (res.status === 500) {
      throw new Error("Something went wrong");
    }
    return res;
  } catch (e) {
    throw e;
  }
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
    await queryClient.prefetchQuery(
      {
        queryKey: [query.type, query.id],
        queryFn: () => getDetail(query.type, query.id),
      }
      // }, () =>
      //   getDetail(query.type, query_id)
    );
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
enum DType {
  "tv",
  "movie",
}
const DetailPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { id, type } = router.query;
  const { data: details, error } = useQuery<
    Intersect<"movie"> & Intersect<"tv">,
    Error
  >([type, id], () => getDetail(type, id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: router.isReady,
    staleTime: 5000,
    suspense: true,
  });

  if (error) {
    throw error;
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {details ? (
          <>
            <MetaHeader
              title={`${
                details?.name ?? details.title
              } — WhatsNext: Platform for the lazy`}
              description="Your No. 1 source of movies"
            />
            <TitleHeader {...details} />

            <MovieLayout>
              <div className=" flex 2xl:flex-nowrap xl:flex-nowrap lg:flex-nowrap flex-wrap">
                <div className="min-w-[300px] mt-0 text-neutral-400">
                  <Link href="/">
                    <p className="flex items-center gap-4 group w-fit ">
                      <IoArrowBackOutline className="group-hover:-translate-x-4 transition-transform" />
                      Back
                    </p>
                  </Link>
                </div>
                <div>
                  <div>
                    <Tabs.Root defaultValue="overview" orientation="horizontal">
                      <Tabs.List>
                        <Tabs.Trigger
                          value="overview"
                          className=" data-[state='active']:bg-amber-500 data-[state='inactive']:bg-transparent p-2 rounded transition-colors"
                        >
                          Overview
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          value="cast"
                          className=" p-2 rounded data-[state='active']:bg-amber-500 data-[state='inactive']:bg-transparent transition-colors"
                        >
                          Casts
                        </Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.Content value="overview">
                        <div className=" min-h-[400px]">
                          <h2 className="text-6xl font-black 2xl:leading-loose xl:leading-loose lg:leading-loose leading-relaxed break-words">
                            Overview
                            {/* {details.name ?? details.title} */}
                          </h2>
                          <p className="text-2xl font-extralight leading-loose text-neutral-300">
                            {details.overview}
                          </p>
                        </div>
                      </Tabs.Content>
                      <Tabs.Content value="cast">
                        <div className=" min-h-[400px]">
                          <h2 className="text-6xl font-black 2xl:leading-loose xl:leading-loose lg:leading-loose leading-relaxed break-words">
                            Casts
                          </h2>
                        </div>
                      </Tabs.Content>
                    </Tabs.Root>
                  </div>
                </div>
              </div>
            </MovieLayout>
          </>
        ) : null}
      </Suspense>
    </div>
  );
};

const TitleHeader: React.FC<Intersect<"movie"> & Intersect<"tv">> = (
  details
) => {
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
            <h1 className="text-8xl font-black">
              {details.name ?? details.title}
            </h1>
            <p className="text-2xl">{details?.tagline ?? null}</p>
          </div>
          <ul className="flex gap-4 text-xs justify-center">
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
