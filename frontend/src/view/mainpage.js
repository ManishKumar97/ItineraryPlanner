import React from "react";
import { useState, useEffect } from "react";
import ItineraryService from "../services/itineraryService";
import Itinerary from "./itinerary";
const MainPage = () => {
  const [placeName, setplaceName] = useState("");
  // const [place, setplace] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [routes, setroutes] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    ItineraryService.getItinerary(placeName, startDate, endDate)
      .then((data) => {
        setroutes(data);
        console.log(routes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setisLoading(false);
    setisLoaded(true);
  }, [routes]);
  useEffect(() => {
    setisLoading(false);
    setisLoaded(false);
  }, []);
  return (
    <div>
      {!isLoaded && !isLoading && (
        <section className="h-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className="row g-0">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase text-center ">
                        Itinerary Planner
                      </h3>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="placeName"
                          className="form-control form-control-lg"
                          placeholder="Please enter the destination name"
                          value={placeName}
                          onChange={(e) => setplaceName(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="form-outline mb-4">
                            <input
                              type="date"
                              id="startDate"
                              className="form-control form-control-lg"
                              placeholder="Start Date"
                              value={startDate}
                              onChange={(e) => setstartDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="form-outline mb-4">
                            <input
                              type="date"
                              id="endDate"
                              className="form-control form-control-lg"
                              placeholder="End Date"
                              value={endDate}
                              onChange={(e) => setendDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center pt-3">
                        <button
                          type="button"
                          className="btn btn-warning btn-lg ms-2"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Get Itinerary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* {console.log(isLoaded)}
      {console.log("test")}
      {console.log(routes)} */}
      {isLoading && !isLoaded && (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase text-center ">
                      Loading....
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoaded && !isLoading && <Itinerary routes={routes}></Itinerary>}
    </div>
  );
};
export default MainPage;
