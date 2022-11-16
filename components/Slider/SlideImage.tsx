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
      className="rounded-lg transition-transform w-full object-cover object-center"
      loading="lazy"
      fill
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    />
  );
};

export default SlideImage;
