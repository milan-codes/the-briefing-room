import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { GrandPrix, Season } from "../../model/Season";
import { slugify } from "../../utils/slugify";
import Navbar from "../../components/landing/Navbar/Navbar";
import GrandPrixInfoHeader from "../../components/season-hub/GrandPrixInfoHeader/GrandPrixInfoHeader";
import Footer from "../../components/landing/Footer/Footer";

interface EventPreviewProps {
  grandprix: GrandPrix;
}

const EventPreview: React.FC<EventPreviewProps> = ({ grandprix }) => {
  const eventType =
    grandprix.EventFormat === "conventional" ? "Conventional weekend" : "Sprint weekend";

  const sessions = [
    {
      name: grandprix.Session1,
      date: new Date(grandprix.Session1Date),
    },
    {
      name: grandprix.Session2,
      date: new Date(grandprix.Session2Date),
    },
    {
      name: grandprix.Session3,
      date: new Date(grandprix.Session3Date),
    },
    {
      name: grandprix.Session4,
      date: new Date(grandprix.Session4Date),
    },
    {
      name: grandprix.Session5,
      date: new Date(grandprix.Session5Date),
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-lg">
        <Navbar />
        <GrandPrixInfoHeader
          eventName={grandprix.OfficialEventName}
          location={grandprix.Location}
          country={grandprix.Country}
          startDate={grandprix.Session1Date}
          endDate={grandprix.Session5Date}
          eventType={eventType}
        />
        <div className="px-4 mt-8">
          <div className="mt-4">
            <div className="flex justify-between flex-col md:flex-row">
              {sessions.map((session) => (
                <div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {session.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {session.date.toLocaleDateString([], {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {session.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
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
  if (params?.event) {
    // replace - with space
    event = params.event.toString().replace(/-/g, " ");
  }
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
