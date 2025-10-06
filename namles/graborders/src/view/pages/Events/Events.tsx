import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { i18n } from "../../../i18n";

function Events() {
  return (
    <div>
      <SubHeader title={i18n('pages.actions.event')} path="/" />
      <div className="images__events"> 
        <img src="/images/events/event1.png" alt="" />
        <img src="/images/events/event.png" alt="" />

        <img src="/images/events/event3.png" alt="" />

      </div>
    </div>
  );
}

export default Events;