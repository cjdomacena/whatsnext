import {
  dehydrate,
  QueryClient,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import MetaHeader from "../../lib/seo/MetaHeader";
import {
  ExtractedResult,
  MediaType,
  MovieInterface,
  TVInterface,
} from "../../lib/types";
import { getYear } from "../../lib/util";

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
  const router = useRouter();
  const {
    data: details,
    status,
    error,
  } = useQuery<ExtractedResult<TVInterface & MovieInterface>, Error>(
    [router.query.type, router.query.id],
    () => getDetail(router.query.type, router.query.id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: router.isReady,
      staleTime: 5000,
    }
  );

  if (error) {
    throw error;
  }

  switch (status) {
    case "success": {
      const title = `${details.title ?? details.name} (${getYear(
        details.first_air_date ?? details.release_date
      )}) — WhatsNext: Platform for the lazy`;
      return (
        <div>
          <MetaHeader title={title} description="Your No. 1 source of movies" />
          <h1>{details.title ?? details.name}</h1>
        </div>
      );
    }
    case "loading": {
      return (
        <div>
          <MetaHeader title={"What's Next"} description={"Something"} />
          <h1>Loading...</h1>
        </div>
      );
    }
  }
};

export default DetailPage;
