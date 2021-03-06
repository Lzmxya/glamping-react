import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as HollowStar } from "../star_border.svg";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import EventReviewCardUserName from "./EventReviewCardUserName";
import StarRanker from "./StarRanker";
import $ from "jquery";
const axios = require("axios").default;

function EventDetailReview(props) {
  const i_id = +props.match.params.i_id;
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewByPage, setReviewByPage] = useState([]);
  const [RWD, setRWD] = useState(false);
  const limit = 6;
  const totalPages = Math.ceil(totalReviews / limit);
  const isDay = props.isDay;

  //算頁數
  async function countReview() {
    let result = await axios.get("http://localhost:8080/api/event/review", {
      params: {
        i_id: i_id,
      },
    });
    result = result.data[0];
    let reviewCount = result.length;
    setTotalReviews(reviewCount);
  }
  //將資料全抓下來,轉換成HTML,存成陣列
  async function loadReview() {
    let result = await axios.get("http://localhost:8080/api/event/review", {
      params: {
        i_id: i_id,
      },
    });
    result = result.data[0];
    let reviewCards = result.map((review, index) => {
      const url = `http://localhost:8080/images/avatar/${review.u_id}.jpeg`;
      return (
        <div className="col-md-6 col-12 my-2 review-card" key={index}>
          <div className="d-flex align-items-center">
            <div className="review-avatar ">
              <img src={url} alt="" className="w-100 h-100 cover-fit" />
            </div>
            <StarRanker star={review.score} isDay={isDay} />
          </div>
          <div className="bg-mid row review-content">
            <div className="col-12 review-title h2">{review.title}</div>
            <div className="col-12 review-innertext h4">{review.article}</div>
            <div className="col-12 review-timestamp text-end h5">
              {review.created}&nbsp;由&nbsp;
              <EventReviewCardUserName u_id={review.u_id} />
              &nbsp;評價
            </div>
          </div>
        </div>
      );
    });
    setReviews(reviewCards);
    setCurrentPage(1);
  }
  //評價分頁捲動
  function changePageScroll() {
    $(".review-page-number").on("click", function () {
      let location = $("#review").offset();
      window.scrollTo(location);
    });
  }
  //改動currentPage時,利用參數切割資料陣列render
  function changePage() {
    changePageScroll();
    const offset = (currentPage - 1) * limit;
    const display = reviews.slice(offset, currentPage * limit);
    setReviewByPage(display);
  }

  useEffect(() => {
    countReview();
    loadReview();
    changePage();
    //手機板時render所有reviews內容不分頁-RWD切換
    $(window).on("load resize", function () {
      if ($("body").width() <= 1043) {
        setRWD(true);
      } else {
        setRWD(false);
      }
    });
  }, []);
  useEffect(() => {
    changePage();
    // console.log(currentPage);
  }, [currentPage]);
  useEffect(() => {
    countReview();
    // console.log(reviews);
    changePage();
  }, [reviews]);
  useEffect(() => {
    countReview();
    loadReview();
    // console.log(currentPage);
  }, [i_id, props.parentStar, isDay]);
  return (
    <>
      <div className="container rwd-review" id="review">
        <section className="row consumer-review">
          <div className="col d-flex align-items-center review-title-wrapper">
            <div className="h1 description-title">旅客評價</div>
            <div className="h1 description-title review-grade ms-5">
              {props.parentStar}
            </div>
            <div className="h4 review-quantity">
              {totalReviews}&nbsp;&nbsp;則旅客評價
            </div>
          </div>
          <div
            className="row m-0 review-card-wrapper rwd-height"
            id="review-card-wrapper"
          >
            {/* 手機板時render所有reviews內容不分頁 */}
            {RWD ? reviews : reviewByPage}
          </div>
          {/* 評論頁碼 */}
          {parseInt(totalReviews) === 0 ? (
            <div className="col-12 no-review-text h1 text-center my-5">
              快來參加吧!!
            </div>
          ) : (
            <div className="col-12 review-page-wrapper justify-content-center d-flex">
              <div className="col-auto review-page d-flex">
                <div
                  className="review-page-number fw-bolder h3 m-0 py-2 px-3 mx-1 d-flex align-items-center"
                  onClick={() => {
                    let newCurrentPage = currentPage - 1;
                    if (newCurrentPage === 0) newCurrentPage = 1;
                    setCurrentPage(newCurrentPage);
                    changePage();
                  }}
                >
                  <BiCaretLeft />
                </div>
                {currentPage - 1 > 0 && (
                  <div
                    className="review-page-number fw-bolder h3 m-0 py-2 px-4 mx-1 d-flex align-items-center"
                    onClick={() => {
                      let newCurrentPage = currentPage - 1;
                      if (newCurrentPage === 0) {
                        newCurrentPage = 1;
                      }
                      setCurrentPage(newCurrentPage);
                      changePage();
                    }}
                  >
                    {currentPage - 1}
                  </div>
                )}
                <div className="review-page-number fw-bolder h3 m-0 py-2 px-4 mx-1 d-flex align-items-center active">
                  {currentPage}
                </div>
                {currentPage + 1 <= totalPages && (
                  <div
                    className="review-page-number fw-bolder h3 m-0 py-2 px-4 mx-1 d-flex align-items-center"
                    onClick={() => {
                      let newCurrentPage = currentPage + 1;
                      if (newCurrentPage >= totalPages)
                        newCurrentPage = totalPages;
                      setCurrentPage(newCurrentPage);
                      changePage();
                    }}
                  >
                    {currentPage + 1}
                  </div>
                )}
                <div
                  className="review-page-number fw-bolder h3 m-0 py-2 px-3 mx-1 d-flex align-items-center"
                  onClick={() => {
                    let newCurrentPage = currentPage + 1;
                    if (newCurrentPage >= totalPages)
                      newCurrentPage = totalPages;
                    setCurrentPage(newCurrentPage);
                    changePage();
                  }}
                >
                  <BiCaretRight />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default withRouter(EventDetailReview);
