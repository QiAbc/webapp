"use client";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

import { Movie } from "@/components/MovieCard/index";
import StarRating from "@/components/StarRating";

type Reviews = {
  id: number;
  review_content: string;
  user_name: string;
  description: string;
  rating: string;
  review_time: string;
};

export default function Detail({ params }: { params: { id: string } }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [data, setData] = useState<Movie | any>();
  const [subRatingVal, setSubRatingVal] = useState<number>(1);
  const [textareaonVal, setTextareaonVal] = useState<string>("");
  const [subLoading, setSubLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState([]);

  /**
   * Create a virtual user to submit comments and store them in localstorage
   */
  const createVirtualUser = () => {
    localStorage.setItem("virtualUser", Math.random().toString(36).slice(-6));
  };

  const init = () => {
    createVirtualUser();
    setSubRatingVal(1);
    fetch(`/api/movies?id=${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]));

    fetch(`/api/movie_reviews?id=${params.id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  };

  useEffect(() => {
    init();
  }, []);

  const onRatingChange = (val: any) => {
    setSubRatingVal(val);
  };
  const textareaonChange = (e: any) => {
    setTextareaonVal(e.target.value);
  };
  const sub = async () => {
    setSubLoading(true);
    createVirtualUser();
    const virtualUser = localStorage.getItem("virtualUser");
    const reqData = {
      rating: subRatingVal,
      review_content: textareaonVal,
      user_name: virtualUser,
      movie_id: params.id,
    };

    await fetch("/api/submit_reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    setSubLoading(false);
    onClose();
    init();
  };

  const date = (time: string) => {
    const formattedDate = dayjs(time).format("YYYY-MM-DD HH:mm:ss");

    return formattedDate;
  };

  return (
    data && (
      <main className="flex flex-col items-center">
        <div className="text-2xl">{data.title}</div>
        <div className="flex gap-x-4 pt-8 text-sm">
          <Image
            alt={""}
            className="w-full object-cover h-[200px]"
            radius="lg"
            shadow="sm"
            src={data.poster_url}
            width="100%"
          />
          <div>
            <div>
              <span className="opacity-80">Genre: </span>
              {data.genre}
            </div>
            <div>
              <span className="opacity-80">Year: </span>
              {data.year}
            </div>
            <div className="flex items-center">
              <span className="opacity-80">Rating: </span>&nbsp;{" "}
              <StarRating disabled rating={data.rating} />{" "}
            </div>
            <div>
              <span className="opacity-80">Classification: </span>
              {data.classification}
            </div>
            <div>
              <span className="opacity-80">Cast: </span>
              {data.cast}
            </div>
            <div>
              <span className="opacity-80">Director: </span>
              {data.director}
            </div>
          </div>
        </div>
        <div className="max-w-3xl">
          <div>
            <div className="pt-8 text-lg">
              {data.title} description · · · · · ·
            </div>
            <div className="text-xs pt-2">{data.description}</div>
          </div>

          <div className="pt-8 ">
            <Divider orientation="horizontal" />
            <div className="pt-8 text-lg flex justify-between items-center">
              <span>User reviews · · · · · ·</span>
              <Button onPress={onOpen}>
                <svg
                  fill="currentColor"
                  height="20"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
                Review
              </Button>
            </div>
            {reviews.map((item: Reviews, i) => (
              <div key={i} className="pt-3">
                <Divider className="opacity-40" orientation="horizontal" />
                <div className="flex items-center text-sm pt-3">
                  <div>user_{item.user_name}</div>
                  <div className="pl-1">
                    {" "}
                    <StarRating rating={Number(item.rating)} />
                  </div>
                  <div className="pl-1 text-xs">{date(item.review_time)}</div>
                </div>
                <div className="text-xs pt-2">{item.review_content}</div>
              </div>
            ))}
          </div>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Review
                </ModalHeader>
                <ModalBody>
                  <StarRating
                    rating={subRatingVal}
                    onRatingChange={onRatingChange}
                  />
                  <div>
                    <Textarea
                      label="Description"
                      placeholder="Enter your description"
                      onChange={textareaonChange}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    isLoading={subLoading}
                    onPress={() => sub()}
                  >
                    OK
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    )
  );
}
