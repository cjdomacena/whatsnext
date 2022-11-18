import { Suspense } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import MetaHeader from "../../lib/seo/MetaHeader";
import { ExtractedResult, MovieInterface, TVInterface } from "../../lib/types";
import { getYear } from "../../lib/util";
import MovieLayout from "../../components/Layouts/MovieLayout";
import { MOVIE } from "../../lib/constants/testData";
import Image from "next/image";
const getDetail = async (
  type: string | string[] | undefined,
  id: number | string | undefined | string[]
) => {
  try {
    const req = await fetch(`/api/${type}/${id}`);
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
    await queryClient.prefetchQuery([query.type, query.id], () =>
      getDetail(query.type, query.id)
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

const DetailPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // const router = useRouter();
  // const {
  //   data: details,
  //   status,
  //   error,
  // } = useQuery<ExtractedResult<TVInterface & MovieInterface>, Error>(
  //   [router.query.type, router.query.id],
  //   () => getDetail(router.query.type, router.query.id),
  //   {
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //     retry: 1,
  //     enabled: false,
  //     staleTime: 5000,
  //   }
  // );

  // if (error) {
  //   throw error;
  // }
  const details = MOVIE;
  return (
    <div>
      <MetaHeader
        title={`${details?.name} (${getYear(
          details?.first_air_date
        )}) — WhatsNext: Platform for the lazy`}
        description="Your No. 1 source of movies"
      />
      <MovieLayout>
        <div className="overflow-hidden absolute left-0 top-0">
          <div className="w-screen h-[500px] ">
            <Image
              src="https://image.tmdb.org/t/p/w300/xHkOKPUe3ioXyPIe5odyL6o6cp4.jpg"
              fill
              alt=""
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
              className="blur-[500px]"
            />
          </div>
        </div>

        <h1 className="text-6xl font-bold">{details.name}</h1>
      </MovieLayout>
    </div>
  );

  // return (
  //   <div>
  //     <Suspense
  //       fallback={
  //         <div className="text-white">
  //           <h1>Loading...</h1>
  //         </div>
  //       }
  //     >
  //       {details ? (
  //         <div>
  //           <MetaHeader
  //             title={`${details?.title ?? details?.name} (${getYear(
  //               details?.first_air_date ?? details?.release_date
  //             )}) — WhatsNext: Platform for the lazy`}
  //             description="Your No. 1 source of movies"
  //           />
  //           <MovieLayout>
  //             <h1 className="text-6xl font-bold">
  //               {details.title ?? details.name}
  //             </h1>
  //           </MovieLayout>
  //         </div>
  //       ) : null}
  //     </Suspense>
  //   </div>
  // );
};

export default DetailPage;
