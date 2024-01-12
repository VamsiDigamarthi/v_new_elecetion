import React, { useState } from "react";
import "./EditUserDetails.css";
const EditUserDetails = () => {
  const [opened, setOpened] = useState(false);
  //   console.log(opened);
  return (
    <div className="editmodal__main__card">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />

      <button>Submit</button>
    </div>
  );
};

export default EditUserDetails;
