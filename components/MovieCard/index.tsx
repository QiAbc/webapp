import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import StarRating from "../StarRating";

export type Movie = {
  id: number;
  title: string;
  director: string;
  poster_url: string;
  description: string;
  rating: string | number;
  year: number;
};

export default function MovieCard(prop: any) {
  const data: Movie = prop.data;
  const onPress = (id: number) => {
    location.href = `/detail/${id}`;
  };

  return (
    <Card isPressable shadow="sm" onPress={() => onPress(data.id)}>
      <CardBody className="overflow-visible p-0">
        <Image
          alt={data.title}
          className="w-full object-cover h-[140px]"
          radius="lg"
          shadow="sm"
          src={data.poster_url}
          width="100%"
        />
      </CardBody>
      <div className="text-center w-full pt-3">{data.title}</div>
      <CardFooter className="text-small justify-between items-center">
        <StarRating rating={Number(data.rating)} />
        <p className="text-default-500">{Number(data.rating)}</p>
      </CardFooter>
    </Card>
  );
}
