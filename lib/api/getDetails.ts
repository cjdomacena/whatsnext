export const getDetail = async (
  type: string | string[] | undefined,
  id: number | string | undefined | string[]
) => {
  let baseUrl = "http://localhost:3000";
  if (process.env.VERCEL_URL) {
    baseUrl =
      process.env.VERCEL_URL === "whatsnext-m1c83kenv-cjdomacena.vercel.app"
        ? "whatsnext-psi.vercel.app"
        : process.env.VERCEL_URL;
  }
  try {
    const url = `${baseUrl}/api/${type}/${id}?withCredits=credits,keywords`;
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
