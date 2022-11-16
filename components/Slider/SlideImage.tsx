import Image from "next/image";

type Props = {
  width: number;
  path: string;
};

const SlideImage: React.FC<Props> = ({ width, path }) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w${width}${path}`}
      alt=""
      className="rounded-lg group-hover:scale-125 transition-transform w-full object-fill"
      loading="lazy"
      fill
    />
  );
};

export default SlideImage;
