import React, { useState, useEffect } from "react";
import Axios from "axios";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Card() {
  const navigate = useNavigate();
  const [concerts, SetConcerts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/concert", {
      credentials: "include",
    }).then((response) => {
      console.log(response.data);
      SetConcerts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="kanit-medium mx-auto max-w-screen-xl pb-7 text-2xl">
        คอนเสิร์ต
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-8">
        {concerts.map((concert, index) => (
          <div
            key={index}
            className="card bg-base-100 flex h-full cursor-pointer flex-col rounded-lg shadow-md transition hover:shadow-lg"
            onClick={() => navigate(`/Detail/${concert.Concert_id}`)}
          >
            <figure className="h-[250px] duration-150 ease-in-out hover:scale-105">
              <img
                src={concert.Poster}
                alt="Poster"
                className="h-full object-contain"
              />
            </figure>
            <div className="card-body flex flex-grow flex-col p-4">
              <h2 className="card-title kanit-medium link link-hover text-base">
                {concert.ConcertName}
              </h2>
              <div className="mt-auto">
                <p className="kanit-medium">12 ส.ค. 2568</p>
                <div className="kanit-medium flex items-center text-gray-400">
                  <MapPin size={15} className="mr-1" />
                  <span>อิมแพค อารีน่า</span>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn kanit-medium rounded-full bg-red-500">
                  ซื้อบัตร
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
