import React from "react";

export const ChatFrom = props => (
    <div>
    {(props.my)? <p className="frmChat">
        {props.children}
      </p>: <p className="toChat">
      {props.children}
    </p>
    }
    </div>
 
);