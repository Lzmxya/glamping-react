import React from "react";
import $ from "jquery";

function EventDetailQuickListRWD() {
  function handleHashLink(id) {
    $("#" + id).on("click", function () {
      let location = $("#" + id.replace("Go", "")).offset();
      location.top = location.top - 90;
      window.scrollTo(location);
    });
  }

  return (
    <>
      <div className="rwd-menu row p-0 m-0 fixed-bottom">
        <ul className="d-flex m-0 p-0 justify-content-center">
          <li>
            <div id="GocheckDate" onClick={handleHashLink("GocheckDate")}>
              選擇日期
            </div>
          </li>
          <li>
            <div id="GoitemInfo" onClick={handleHashLink("GoitemInfo")}>
              商品資訊
            </div>
          </li>
          <li>
            <div id="GocanclePolicy" onClick={handleHashLink("GocanclePolicy")}>
              取消政策
            </div>
          </li>
          <li>
            <div id="Gowarning" onClick={handleHashLink("Gowarning")}>
              注意事項
            </div>
          </li>
          <li>
            <div id="Goreview" onClick={handleHashLink("Goreview")}>
              旅客評價
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default EventDetailQuickListRWD;
