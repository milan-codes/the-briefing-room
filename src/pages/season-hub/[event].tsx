import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { GrandPrix, Season } from "../../model/Season";
import { slugify } from "../../utils/slugify";
import Navbar from "../../components/landing/Navbar/Navbar";
import { getCountryFlagByCode } from "../../utils/getCountryFlagCode";

interface EventPreviewProps {
  grandprix: GrandPrix;
}

const EventPreview: React.FC<EventPreviewProps> = ({ grandprix }) => {
  const eventType =
    grandprix.EventFormat === "conventional" ? "Conventional weekend" : "Sprint weekend";
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-lg">
        <Navbar />
        <div className="px-4 mt-8">
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
            {grandprix.OfficialEventName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            <span className="font-extrabold">Location: </span> {grandprix.Location},{" "}
            {grandprix.Country} {getCountryFlagByCode(grandprix.Country)}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            <span className="font-extrabold">Date: </span>{" "}
            {new Date(grandprix.Session1Date).toLocaleDateString()} -{" "}
            {new Date(grandprix.Session5Date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            <span className="font-extrabold">Format: </span>
            {eventType}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`);
  const season = (await res.json()) as Season[];

  const paths = season[0].events.map((event) => ({
    params: { event: slugify(event.EventName) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let event = "";
  if (params?.event) event = params.event.toString().split("-")[0];
  const res = await fetch(
    `${process.env.SERVER}/grandprix?year=${new Date().getFullYear()}&name=${event}`
  );
  const grandprix = (await res.json()) as GrandPrix[];

  return {
    props: {
      grandprix,
    },
  };
};

export default EventPreview;
